import { useState, useEffect, Suspense } from 'react';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import { getProgress, saveProgress } from './api.js';
import { getGuestProgress, saveGuestProgress } from './guestProgress.js';
import { logEvent } from './analytics.js';
import COURSE_CONFIG from '../../config/course.config.js';

const C = { bg: '#0D1117', muted: '#8B949E' };

function LoadingScreen({ message = 'Loading…' }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', gap: 16 }}>
      <div style={{ fontSize: 40 }}>⚡</div>
      <div style={{ color: C.muted, fontSize: 15 }}>{message}</div>
    </div>
  );
}

const LESSONS = import.meta.glob('../lessons/*.jsx');

// view walks: 'landing' -> 'dashboard' (guest or signed-in) -> 'lesson'.
// 'login' is reachable from either 'landing' or 'dashboard' (guest wanting
// to save progress), and always returns to 'dashboard' one way or another.
export default function App() {
  const [view, setView]                       = useState('landing');
  const [student, setStudent]                 = useState(null); // null = guest
  const [completedUnits, setCompletedUnits]   = useState([]);
  const [activeUnit, setActiveUnit]           = useState(null);
  const [LessonComponent, setLessonComponent] = useState(null);
  const [loadingLesson, setLoadingLesson]     = useState(false);
  const [savingProgress, setSavingProgress]   = useState(false);

  // One 'session_start' event per app load -- fires the moment
  // anyone lands here, guest or not, before they've made any choice.
  useEffect(() => { logEvent('session_start'); }, []);

  // "Explore the Dashboard" from Landing, or "continue without an account"
  // from Login -- both land here. Guest progress comes from this browser's
  // localStorage, not the Sheets backend.
  function handleExploreGuest() {
    setStudent(null);
    setCompletedUnits(getGuestProgress(COURSE_CONFIG.courseId));
    setView('dashboard');
  }

  function handleGoToLogin() { setView('login'); }

  // Signing off just clears who's logged in and sends them back to the
  // Landing screen -- it doesn't touch anything already saved in Sheets,
  // and if they were exploring as a guest before, that local progress is
  // untouched too (it lives under a different key in localStorage).
  function handleSignOff() {
    setStudent(null);
    setCompletedUnits([]);
    setView('landing');
  }

  // Called by Login.jsx after either a successful sign-in OR a successful
  // registration -- both return the same { rollNo, name, batch, email } shape.
  async function handleLoginSuccess(studentData) {
    setStudent(studentData);
    const completed = await getProgress(studentData.rollNo, COURSE_CONFIG.courseId);
    setCompletedUnits(completed);
    setView('dashboard');
  }

  async function handleSelectUnit(unitId) {
    setLoadingLesson(true);
    setActiveUnit(unitId);
    try {
      const path = `../lessons/${unitId}.jsx`;
      const loader = LESSONS[path];
      if (!loader) throw new Error('No lesson file found: ' + unitId);
      const mod = await loader();
      setLessonComponent(() => mod.default);
      logEvent('lesson_open', { unitId, userId: student?.rollNo || '' });
    } catch (err) {
      console.error('Could not load lesson:', unitId, err);
      setLessonComponent(null);
      setActiveUnit(null);
    }
    setLoadingLesson(false);
  }

  async function handleUnitComplete() {
    if (!activeUnit) return;
    if (student) {
      // Signed-in: persist to Sheets. This can be slow (free Apps Script
      // backend), so show a brief "saving" state rather than freezing
      // with no feedback.
      setSavingProgress(true);
      await saveProgress(student.rollNo, COURSE_CONFIG.courseId, activeUnit);
      setSavingProgress(false);
    } else {
      // Guest: instant, local, no network round-trip.
      saveGuestProgress(COURSE_CONFIG.courseId, activeUnit);
    }
    logEvent('lesson_complete', { unitId: activeUnit, userId: student?.rollNo || '' });
    setCompletedUnits(prev => [...new Set([...prev, activeUnit])]);
    setActiveUnit(null); setLessonComponent(null);
  }

  function handleBackToDashboard() { setActiveUnit(null); setLessonComponent(null); }

  if (view === 'landing') {
    return <Landing onExploreGuest={handleExploreGuest} onGoToLogin={handleGoToLogin} />;
  }

  if (view === 'login') {
    return <Login onLogin={handleLoginSuccess} onBack={handleExploreGuest} />;
  }

  if (loadingLesson) return <LoadingScreen message="Loading lesson…" />;
  if (savingProgress) return <LoadingScreen message="Saving your progress… this can take a few seconds." />;

  if (activeUnit && LessonComponent) {
    // The back button is a fixed overlay, so it never affects layout on its
    // own -- without this left padding it sits directly on top of whatever
    // the lesson renders in its own top-left corner (the "MODULE X > UNIT
    // X.Y" breadcrumb), hiding it. Reserving a left gutter and shifting the
    // whole lesson right clears that, without touching any lesson file.
    return (
      <div style={{ minHeight: '100vh', background: '#0D1117' }}>
        <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
          <button onClick={handleBackToDashboard} style={{ background: '#1C2333', border: '1px solid #30363D', color: '#8B949E', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13 }}>← Dashboard</button>
        </div>
        <div style={{ paddingLeft: 150 }}>
          <Suspense fallback={<LoadingScreen message="Preparing lesson…" />}>
            <LessonComponent student={student} onUnitComplete={handleUnitComplete} />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <Dashboard
      student={student}
      completedUnits={completedUnits}
      onSelectUnit={handleSelectUnit}
      onRequestLogin={handleGoToLogin}
      onSignOff={handleSignOff}
    />
  );
}
