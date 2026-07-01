import { useState, Suspense } from 'react';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import { getProgress, saveProgress } from './api.js';
import { getGuestProgress, saveGuestProgress } from './guestProgress.js';
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

  // "Explore the Dashboard" from Landing, or "continue without an account"
  // from Login -- both land here. Guest progress comes from this browser's
  // localStorage, not the Sheets backend.
  function handleExploreGuest() {
    setStudent(null);
    setCompletedUnits(getGuestProgress(COURSE_CONFIG.courseId));
    setView('dashboard');
  }

  function handleGoToLogin() { setView('login'); }

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
    return (
      <div>
        <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
          <button onClick={handleBackToDashboard} style={{ background: '#1C2333', border: '1px solid #30363D', color: '#8B949E', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13 }}>← Dashboard</button>
        </div>
        <Suspense fallback={<LoadingScreen message="Preparing lesson…" />}>
          <LessonComponent student={student} onUnitComplete={handleUnitComplete} />
        </Suspense>
      </div>
    );
  }

  return (
    <Dashboard
      student={student}
      completedUnits={completedUnits}
      onSelectUnit={handleSelectUnit}
      onRequestLogin={handleGoToLogin}
    />
  );
}
