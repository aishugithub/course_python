import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Landing from './Landing.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import Certificate from './Certificate.jsx';
import ActiveTimer from './ActiveTimer.jsx';
import LabCertificate from './LabCertificate.jsx';
import { fetchProgress, saveProgress, saveProgressMany, submitFeedback } from './api.js';
import { getGuestProgress, saveGuestProgress, clearGuestProgress } from './guestProgress.js';
import { loadSession, storeSession, clearSession, cachedProgress, cacheProgress, unsentUnits, addUnsent, clearUnsent } from './session.js';
import { logEvent } from './analytics.js';
import { certificateStatus } from './completion.js';
import { labCertificateStatus } from './labCompletion.js';
import COURSE_CONFIG from '../../config/course.config.js';
import { LIGHT as DARK, FONT } from './brand.js';

// The report builder loads only when opened, so the dashboard stays light.
const ReportBuilder = lazy(() => import('./report/ReportBuilder.jsx'));
// The report card shows when course.config.js says so (or in local testing, see .claude/mock_gas).
const REPORT_OPEN = !!COURSE_CONFIG.miniProjectReport?.open || import.meta.env.VITE_REPORT_OPEN === '1';
// e-Lab (MED23CL202) certificate card + auto-redirect. Off since 2026-11-12;
// set labCertificate.show to true in the config to bring it back.
const LAB_CERT_ON = COURSE_CONFIG.labCertificate?.show !== false;

// Loading screens now use the DARK shell palette (see brand.js): landing,
// dashboard and login are all dark-and-on-brand, and the lessons are dark too,
// so a dark loading screen sits seamlessly between any two views — no flash.
function LoadingScreen({ message = 'Loading…' }) {
  return (
    <div style={{ minHeight: '100vh', background: DARK.bgDeep, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, gap: 16 }}>
      {/* The brand mark doubles as the loading glyph — steps to climb. On dark,
          the two lower steps go light and the summit stays amber. */}
      <svg width="48" height="48" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="8" y="60" width="26" height="26" rx="7" fill={DARK.ink} />
        <rect x="37" y="37" width="26" height="26" rx="7" fill={DARK.ink} />
        <rect x="66" y="14" width="26" height="26" rx="7" fill={DARK.amber} />
      </svg>
      <div style={{ color: DARK.inkSoft, fontSize: 15 }}>{message}</div>
    </div>
  );
}

const LESSONS = import.meta.glob('../lessons/*.jsx');

// ── Web addresses (2026-11-14) ──
// The part after # says where the learner is, so a lesson can be linked to,
// refreshed, and left with the browser's Back button:
//   …/course_python/                  landing page
//   …/course_python/#/dashboard       the dashboard
//   …/course_python/#/unit/Unit6_1    one lesson
// (# addresses need no server support, so they work on GitHub Pages.)
function readAddress() {
  const m = window.location.hash.match(/^#\/unit\/([A-Za-z0-9_.]+)$/);
  if (m) return { unit: m[1] };
  return { dashboard: window.location.hash === '#/dashboard' };
}
function goTo(hash) {
  if (window.location.hash !== hash) window.location.hash = hash;
}
const UNIT_TITLES = Object.fromEntries(COURSE_CONFIG.modules.flatMap(m => m.units.map(u => [u.unitId, u.title])));
const SITE_TITLE = 'Foothold — Learn Python';

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
  // Where to go after signing in: the dashboard, or back to the report when
  // its sign-in expired mid-way.
  const afterLogin = useRef('dashboard');
  const studentRef = useRef(null);      // same, for who is signed in
  const activeUnitRef = useRef(null);   // the address listener needs the current value
  const [notice, setNotice] = useState('');   // one-line message shown on the sign-in page

  // Units the server did not take (no network, expired sign-in) are kept on
  // this device and sent again here, the next time the server answers.
  async function sendUnsent(who) {
    const waiting = unsentUnits(who.rollNo);
    if (!waiting.length) return;
    const r = await saveProgressMany(who, COURSE_CONFIG.courseId, waiting);
    if (r && r.success) clearUnsent(who.rollNo);
  }

  function saveToServer(unitId) {
    return saveProgress(student, COURSE_CONFIG.courseId, unitId).then((r) => {
      if (r && r.success) return r;
      addUnsent(student.rollNo, unitId);
      if (r && r.code === 'SESSION') expireSession();
      return r;
    });
  }

  // The 30-day sign-in ran out: keep what they did on this device, ask them to sign in again.
  function expireSession() {
    clearSession();
    setStudent(null);
    setActiveUnit(null); setLessonComponent(null); activeUnitRef.current = null;
    setNotice('Your sign-in has expired. Please sign in again — nothing you did is lost.');
    goTo('#/dashboard');
    setView('login');
  }

  // On first load: bring back a remembered sign-in, then open whatever the
  // address points at (a shared lesson link opens straight into the lesson).
  useEffect(() => {
    const where = readAddress();
    const saved = loadSession();
    if (saved) {
      setStudent(saved);
      setCompletedUnits([...new Set([...cachedProgress(saved.rollNo), ...unsentUnits(saved.rollNo)])]);
      setView('dashboard');
      fetchProgress(saved, COURSE_CONFIG.courseId).then((r) => {
        if (r.expired) { clearSession(); setStudent(null); setNotice('Your sign-in has expired. Please sign in again — nothing you did is lost.'); setView('login'); return; }
        if (!r.ok) return;   // server unreachable: keep showing the copy from this device
        setCompletedUnits(prev => [...new Set([...r.units, ...prev.filter(u => unsentUnits(saved.rollNo).includes(u))])]);
        sendUnsent(saved);
      });
    } else if (where.unit || where.dashboard) {
      setCompletedUnits(getGuestProgress(COURSE_CONFIG.courseId));
      setView('dashboard');
    }
    if (where.unit) handleSelectUnit(where.unit);
    const onAddress = () => {
      const now = readAddress();
      if (now.unit) {
        if (now.unit !== activeUnitRef.current) {
          setView(v => (v === 'landing' ? 'dashboard' : v));
          handleSelectUnit(now.unit);
        }
      } else if (activeUnitRef.current) {
        activeUnitRef.current = null;
        setActiveUnit(null); setLessonComponent(null); setLessonError(null);
      }
    };
    window.addEventListener('hashchange', onAddress);
    return () => window.removeEventListener('hashchange', onAddress);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep a copy of a signed-in learner's progress on this device.
  useEffect(() => { if (student) cacheProgress(student.rollNo, completedUnits); }, [student, completedUnits]);

  // The browser tab names the lesson that is open.
  useEffect(() => {
    document.title = activeUnit && UNIT_TITLES[activeUnit] ? `${UNIT_TITLES[activeUnit]} — Foothold Python` : SITE_TITLE;
  }, [activeUnit]);

  studentRef.current = student;

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
    goTo('#/dashboard');
  }

  function handleGoToLogin() { setNotice(''); setView('login'); }

  // Signing off just clears who's logged in and sends them back to the
  // Landing screen -- it doesn't touch anything already saved in Sheets,
  // and if they were exploring as a guest before, that local progress is
  // untouched too (it lives under a different key in localStorage).
  function handleSignOff() {
    clearSession();
    goTo('');
    setStudent(null);
    setCompletedUnits([]);
    setView('landing');
  }

  // Called by Login.jsx after either a successful sign-in OR a successful
  // registration -- both return the same { rollNo, name, batch, email } shape.
  // `isNew` (a brand-new account): whatever this learner did as a guest on this
  // device moves into the account, in one request, and the guest copy is cleared
  // so the next person on a shared computer does not inherit it. Signing in to
  // an EXISTING account never pulls guest progress in, for the same reason.
  // `keep`: remember the sign-in after the browser closes.
  async function handleLoginSuccess(studentData, { isNew = false, keep = true } = {}) {
    storeSession(studentData, keep);
    setNotice('');
    setStudent(studentData);
    const r = await fetchProgress(studentData, COURSE_CONFIG.courseId);
    let completed = r.ok ? r.units : cachedProgress(studentData.rollNo);
    if (isNew) {
      const guest = getGuestProgress(COURSE_CONFIG.courseId).filter(u => !completed.includes(u));
      if (guest.length) {
        const saved = await saveProgressMany(studentData, COURSE_CONFIG.courseId, guest);
        if (saved && saved.success) clearGuestProgress(COURSE_CONFIG.courseId);
        else guest.forEach(u => addUnsent(studentData.rollNo, u));
        completed = [...completed, ...guest];
      }
    }
    completed = [...new Set([...completed, ...unsentUnits(studentData.rollNo)])];
    setCompletedUnits(completed);
    sendUnsent(studentData);
    setView(afterLogin.current);
    afterLogin.current = 'dashboard';
    if (!readAddress().unit) goTo('#/dashboard');
  }

  // sessionStorage key that guards the "reload once on a stale chunk" logic
  // below, so a genuinely broken lesson can never put us in a reload loop.
  const CHUNK_RELOAD_KEY = 'foothold_chunk_reload';

  async function handleSelectUnit(unitId) {
    const path = `../lessons/${unitId}.jsx`;
    // A link to a lesson that does not exist (mistyped or removed): show the dashboard.
    if (!LESSONS[path]) { goTo('#/dashboard'); return; }
    setLoadingLesson(true);
    setLessonError(null);
    setActiveUnit(unitId);
    activeUnitRef.current = unitId;
    goTo(`#/unit/${unitId}`);
    try {
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
      logEvent('lesson_open', { unitId, userId: studentRef.current?.rollNo || '' });
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
      activeUnitRef.current = null;
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

  // `payload` (added 2026-09-14): optional extra data a lesson's Quiz can hand
  // back through onUnitComplete -- e.g. UnitFT (the far-transfer assessment)
  // calls onUnitComplete({ score, total, tag }). Every existing lesson file
  // calls onUnitComplete() with no arguments and is completely unaffected:
  // payload is undefined, detail stays '', logEvent behaves exactly as before.
  // This is the shell-level hook that lets a lesson's own quiz score reach
  // the Events sheet -- no other lesson file needs to change to use it later.
  async function handleUnitComplete(payload) {
    if (!activeUnit) return;
    if (student) {
      // Signed-in: persist to Sheets. This can be slow (free Apps Script
      // backend), so show a brief "saving" state rather than freezing
      // with no feedback.
      setSavingProgress(true);
      await saveToServer(activeUnit);
      setSavingProgress(false);
    } else {
      // Guest: instant, local, no network round-trip.
      saveGuestProgress(COURSE_CONFIG.courseId, activeUnit);
    }
    logEvent('lesson_complete', {
      unitId: activeUnit,
      userId: student?.rollNo || '',
      detail: payload ? JSON.stringify(payload) : '',
    });
    const after = [...new Set([...completedUnits, activeUnit])];
    setCompletedUnits(after);
    setActiveUnit(null); setLessonComponent(null);
    activeUnitRef.current = null;
    goTo('#/dashboard');
    // e-Lab Record: when this submission completes the last requirement (all ten
    // experiments + all five mini-project crucibles + the feedback) — or the final
    // crucible is submitted with everything done — go straight to the e-Lab certificate.
    if (LAB_CERT_ON && student && (activeUnit.startsWith('UnitLAB') || activeUnit === 'UnitFB')) {
      const wasEligible = labCertificateStatus(completedUnits).eligible;
      if (labCertificateStatus(after).eligible && (!wasEligible || activeUnit === 'UnitLAB10_5')) {
        setView('labCertificate');
      }
    }
  }

  // Crucible (challenge unit) stage completions. Stages persist as
  // pseudo-unitIds like "Unit4_C@spark" in the SAME stores as lessons
  // (Progress sheet / guest localStorage) -- no backend change needed.
  // The Dashboard filters these out of counts via the "@" marker.
  // Deliberately not awaited: stage progress is also held in state, and
  // a slow save must never stall the game feel of the Crucible.
  // `payload` (added 2026-09-14, same reasoning as handleUnitComplete above):
  // optional { hintsUsed, attempts, ... } a Crucible unit could pass in future
  // without any change here or to Code.gs. No existing Crucible file passes
  // one today, so this is a no-op until a Crucible unit opts in.
  function handleStageComplete(stageId, payload) {
    if (student) {
      saveToServer(stageId);
    } else {
      saveGuestProgress(COURSE_CONFIG.courseId, stageId);
    }
    logEvent('challenge_stage_complete', {
      unitId: stageId,
      userId: student?.rollNo || '',
      detail: payload ? JSON.stringify(payload) : '',
    });
    setCompletedUnits(prev => [...new Set([...prev, stageId])]);
  }

  // End-of-course feedback from UnitFB. The lesson calls this prop with its
  // answers; we stamp on courseId + who submitted, then hand off to api.js
  // (which POSTs to the Feedback sheet). Kept here so lesson files never import
  // the shell's api.js directly -- same boundary as onUnitComplete/onStageComplete.
  function handleSubmitFeedback(answers) {
    return submitFeedback({
      ...answers,
      courseId: COURSE_CONFIG.courseId,
      userId: student?.rollNo || '',
    });
  }

  // Certificate is its own view, opened from the Dashboard banner. The
  // Certificate component re-verifies eligibility against the Sheet itself.
  function handleOpenCertificate() { setView('certificate'); }

  // The LAB certificate is its own view too, opened from the Dashboard's separate
  // lab-certificate banner. LabCertificate re-verifies the lab track against the Sheet.
  // Also reachable from inside the final mini-project crucible, so close any open lesson first.
  function handleOpenLabCertificate() { closeLesson(); setView('labCertificate'); }

  // The mini-project report (MED23CL202) is its own view, opened from the
  // Dashboard's report card. It saves to Drive through Code.gs with the
  // session token from sign-in, so it is for signed-in students only.
  function handleOpenReport() { closeLesson(); setView('report'); }

  function closeLesson() {
    activeUnitRef.current = null;
    setActiveUnit(null); setLessonComponent(null); setLessonError(null);
    goTo('#/dashboard');
  }
  function handleBackToDashboard() { closeLesson(); }

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
    return <Login onLogin={handleLoginSuccess} onBack={handleExploreGuest} notice={notice} />;
  }

  if (view === 'certificate') {
    return <Certificate student={student} onBack={() => setView('dashboard')} />;
  }

  if (view === 'labCertificate') {
    return <LabCertificate student={student} onBack={() => setView('dashboard')} />;
  }

  if (view === 'report' && student) {
    return (
      <Suspense fallback={<LoadingScreen message="Opening your report…" />}>
        <ReportBuilder student={student} onBack={() => setView('dashboard')} onSignInAgain={() => { afterLogin.current = 'report'; setView('login'); }} />
      </Suspense>
    );
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
            .lesson-viewport:not(:has(.fh-lesson)) { zoom: 1.25; }
          }
        `}</style>
        <div style={{ position: 'fixed', top: 12, left: 12, zIndex: 1000 }}>
          <button
            onClick={handleBackToDashboard}
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)', border: '1px solid #D6CCB8',
              color: '#16294A', boxShadow: '0 1px 4px rgba(22,41,74,.12)', fontSize: 18, lineHeight: 1, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ←
          </button>
        </div>
        <ActiveTimer key={activeUnit} unitId={activeUnit} userId={student?.rollNo} />
        <Suspense fallback={<LoadingScreen message="Preparing lesson…" />}>
          {/* Regular lessons use only the first two props; Crucible units
              also read challengeProgress + onStageComplete for gating. */}
          <LessonComponent
            student={student}
            onUnitComplete={handleUnitComplete}
            challengeProgress={completedUnits}
            onStageComplete={handleStageComplete}
            onSubmitFeedback={handleSubmitFeedback}
            labCertStatus={LAB_CERT_ON ? labCertificateStatus(completedUnits) : null}
            onOpenLabCertificate={handleOpenLabCertificate}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <Dashboard
      student={student}
      completedUnits={completedUnits}
      onSelectUnit={(unitId) => goTo(`#/unit/${unitId}`)}
      onRequestLogin={handleGoToLogin}
      onSignOff={handleSignOff}
      certStatus={certificateStatus(completedUnits)}
      onOpenCertificate={handleOpenCertificate}
      labCertStatus={LAB_CERT_ON ? labCertificateStatus(completedUnits) : null}
      onOpenLabCertificate={handleOpenLabCertificate}
      onOpenReport={REPORT_OPEN ? handleOpenReport : undefined}
    />
  );
}
