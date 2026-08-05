import { useState, useEffect, Suspense } from 'react';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import { getProgress, saveProgress } from './api.js';
import { getGuestProgress, saveGuestProgress } from './guestProgress.js';
import { logEvent } from './analytics.js';
import COURSE_CONFIG from '../../config/course.config.js';
import { DARK, FONT } from './brand.js';

// Loading screens now use the DARK shell palette (see brand.js): landing,
// dashboard and login are all dark-and-on-brand, and the lessons are dark too,
// so a dark loading screen sits seamlessly between any two views — no flash.
function LoadingScreen({ message = 'Loading…' }) {
  return (
    <div style={{ minHeight: '100vh', background: DARK.bgDeep, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, gap: 16 }}>
      {/* The brand mark doubles as the loading glyph — steps to climb. On dark,
          the two lower steps go light and the summit stays amber. */}
      <svg width="48" height="48" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="8" y="60" width="26" height="26" rx="7" fill={DARK.inkSoft} />
        <rect x="37" y="37" width="26" height="26" rx="7" fill={DARK.inkSoft} />
        <rect x="66" y="14" width="26" height="26" rx="7" fill={DARK.amber} />
      </svg>
      <div style={{ color: DARK.inkSoft, fontSize: 15 }}>{message}</div>
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
  // When a lesson fails to open we now SHOW this instead of silently dropping
  // the learner back on the dashboard (which used to look exactly like an
  // access gate). Holds a human-readable reason + the raw error for debugging.
  const [lessonError, setLessonError]         = useState(null);

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

  // sessionStorage key that guards the "reload once on a stale chunk" logic
  // below, so a genuinely broken lesson can never put us in a reload loop.
  const CHUNK_RELOAD_KEY = 'foothold_chunk_reload';

  async function handleSelectUnit(unitId) {
    setLoadingLesson(true);
    setLessonError(null);
    setActiveUnit(unitId);
    try {
      const path = `../lessons/${unitId}.jsx`;
      const loader = LESSONS[path];
      if (!loader) throw new Error('No lesson file found: ' + unitId);
      const mod = await loader();
      // A resolved import with no default export would leave LessonComponent
      // falsy and — before this guard — silently render the dashboard again.
      if (!mod || !mod.default) throw new Error('Lesson has no default export: ' + unitId);
      setLessonComponent(() => mod.default);
      // Opened cleanly, so clear any earlier "we already reloaded" marker: a
      // future stale-chunk failure is then allowed to self-heal with a reload.
      try { sessionStorage.removeItem(CHUNK_RELOAD_KEY); } catch { /* ignore */ }
      logEvent('lesson_open', { unitId, userId: student?.rollNo || '' });
    } catch (err) {
      console.error('Could not load lesson:', unitId, err);

      // A failed *dynamic import* almost always means this browser tab is
      // holding a STALE build: the site was redeployed, the chunk hashes
      // changed, and the file this old tab is asking for (e.g. Unit11_1-<oldhash>.js)
      // no longer exists on the server → 404 → import rejects. This is the
      // real reason "logged-in can't open the newest lessons but a fresh guest
      // tab can" — it's old-tab vs fresh-tab, not a login gate.
      // Fix: force ONE reload to pull the fresh index.html + chunk map. The
      // sessionStorage guard means if it fails a second time we stop and show
      // the error rather than looping forever.
      const msg = String((err && err.message) || err);
      const isChunkError = /dynamically imported module|Failed to fetch|module script failed|error loading dynamically|No lesson file found/i.test(msg);
      let alreadyReloaded = false;
      try { alreadyReloaded = !!sessionStorage.getItem(CHUNK_RELOAD_KEY); } catch { /* ignore */ }

      if (isChunkError && !alreadyReloaded) {
        try { sessionStorage.setItem(CHUNK_RELOAD_KEY, unitId); } catch { /* ignore */ }
        window.location.reload(); // hard-reloads with the current deployed assets
        return;                    // component unmounts on reload; stop here
      }

      // Not a stale-chunk case, or the reload already happened once and it still
      // fails: surface a real message + a retry, never a silent bounce.
      setLessonComponent(null);
      setActiveUnit(null);
      setLessonError({
        reason: isChunkError
          ? 'This lesson couldn’t be loaded. Your browser may be caching an old version — please refresh with Ctrl+F5 (Cmd+Shift+R on Mac) and try again.'
          : 'Something went wrong opening this lesson. Please try again.',
        detail: msg,
        unitId,
      });
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

  // Crucible (challenge unit) stage completions. Stages persist as
  // pseudo-unitIds like "Unit4_C@spark" in the SAME stores as lessons
  // (Progress sheet / guest localStorage) -- no backend change needed.
  // The Dashboard filters these out of counts via the "@" marker.
  // Deliberately not awaited: stage progress is also held in state, and
  // a slow save must never stall the game feel of the Crucible.
  function handleStageComplete(stageId) {
    if (student) {
      saveProgress(student.rollNo, COURSE_CONFIG.courseId, stageId);
    } else {
      saveGuestProgress(COURSE_CONFIG.courseId, stageId);
    }
    logEvent('challenge_stage_complete', { unitId: stageId, userId: student?.rollNo || '' });
    setCompletedUnits(prev => [...new Set([...prev, stageId])]);
  }

  function handleBackToDashboard() { setActiveUnit(null); setLessonComponent(null); setLessonError(null); }

  // A visible failure screen for when a lesson can't be opened. This replaces
  // the old silent "just show the dashboard again" behaviour that looked like a
  // locked lesson. It offers a hard reload (fixes the stale-cache case) and a
  // way back, and prints the raw error so problems are diagnosable in future.
  if (lessonError) {
    return (
      <div style={{ minHeight: '100vh', background: DARK.bgDeep, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, gap: 16, padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>⚠️</div>
        <div style={{ color: DARK.ink, fontSize: 18, fontWeight: 700, maxWidth: 460 }}>Couldn’t open this lesson</div>
        <div style={{ color: DARK.inkSoft, fontSize: 14.5, maxWidth: 460, lineHeight: 1.6 }}>{lessonError.reason}</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button onClick={() => window.location.reload()} style={{ background: DARK.amber, border: 'none', color: '#111A2E', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
            Refresh &amp; retry
          </button>
          <button onClick={handleBackToDashboard} style={{ background: 'transparent', border: `1px solid ${DARK.border}`, color: DARK.ink, borderRadius: 8, padding: '10px 18px', fontSize: 14, cursor: 'pointer', fontFamily: FONT }}>
            Back to Dashboard
          </button>
        </div>
        {/* Small, muted technical detail — invisible-ish to learners, gold to us. */}
        <div style={{ color: DARK.inkMuted, fontSize: 11, marginTop: 10, fontFamily: 'monospace', maxWidth: 460, wordBreak: 'break-word' }}>
          {lessonError.unitId}: {lessonError.detail}
        </div>
      </div>
    );
  }

  if (view === 'landing') {
    return <Landing onExploreGuest={handleExploreGuest} onGoToLogin={handleGoToLogin} />;
  }

  if (view === 'login') {
    return <Login onLogin={handleLoginSuccess} onBack={handleExploreGuest} />;
  }

  if (loadingLesson) return <LoadingScreen message="Loading lesson…" />;
  if (savingProgress) return <LoadingScreen message="Saving your progress… this can take a few seconds." />;

  if (activeUnit && LessonComponent) {
    // A small icon-only button instead of a text pill: on a phone screen,
    // reserving a fixed margin to dodge the lesson's own header would waste
    // a big chunk of a very small viewport. A compact circular button covers
    // only a tiny corner, and the arrow is a self-explanatory "back" icon on
    // its own -- the title/aria-label add a hover tooltip for desktop users
    // without needing any permanent on-screen text or layout shift.
    return (
      <div className="lesson-viewport">
        {/* Desktop-only upscale: lessons hardcode maxWidth:780, which leaves
            ~25% of a wide monitor empty. zoom scales fonts, widgets and
            spacing together (780px column → ~975px effective at 1.25).
            Phones/tablets never match the media query, so mobile rendering
            is untouched byte-for-byte. Tune 1.25 here if it feels off. */}
        <style>{`
          @media (min-width: 1200px) {
            .lesson-viewport { zoom: 1.25; }
          }
        `}</style>
        <div style={{ position: 'fixed', top: 12, left: 12, zIndex: 1000 }}>
          <button
            onClick={handleBackToDashboard}
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(28,35,51,0.9)', border: '1px solid #30363D',
              color: '#C9D1D9', fontSize: 18, lineHeight: 1, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ←
          </button>
        </div>
        <Suspense fallback={<LoadingScreen message="Preparing lesson…" />}>
          {/* Regular lessons use only the first two props; Crucible units
              also read challengeProgress + onStageComplete for gating. */}
          <LessonComponent
            student={student}
            onUnitComplete={handleUnitComplete}
            challengeProgress={completedUnits}
            onStageComplete={handleStageComplete}
          />
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
      onSignOff={handleSignOff}
    />
  );
}
