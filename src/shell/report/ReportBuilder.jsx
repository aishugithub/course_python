import { useState, useEffect, useRef, useCallback } from 'react';
import { DARK as D, FONT, MONO } from '../brand.js';
import COURSE_CONFIG from '../../../config/course.config.js';
import { loadReport, saveReport, submitReportSummary } from './reportApi.js';
import { STEPS, newDraft, upgradeDraft, missingFor, stepStatus, codeHash } from './reportModel.js';
import { TitleStep, ProblemStep, ObjectivesStep, CodeStep } from './ReportSteps.jsx';
import ConceptsStep from './ConceptsStep.jsx';
import { RunningStep, TestingStep, ReflectStep, FinishStep } from './MoreSteps.jsx';
import { analyseCode } from './analyzer.js';
import { loadLabProgress } from './progress.js';

// ─────────────────────────────────────────────────────────────────────────────
// ReportBuilder — the MED23CL202 mini-project report, built step by step.
//
// Saving: every change is kept in this browser at once (localStorage) and sent
// to the server a moment after the student stops typing. The server keeps a
// version number; a save only succeeds from the latest version, so a second
// device can't silently overwrite newer work (Code.gs handleReportSave). When
// that happens the student chooses which version to keep.
// ─────────────────────────────────────────────────────────────────────────────

const SAVE_DELAY_MS = 1500;
const RETRY_MS = 15000;
const cacheKey = (rollNo) => `foothold_report_v1_${rollNo}`;

function readCache(rollNo) {
  try { return JSON.parse(localStorage.getItem(cacheKey(rollNo)) || 'null'); } catch { return null; }
}
function writeCache(rollNo, value) {
  try { localStorage.setItem(cacheKey(rollNo), JSON.stringify(value)); } catch { /* storage full or blocked: the server copy still works */ }
}

const timeOf = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

export default function ReportBuilder({ student, onBack, onSignInAgain }) {
  const details = COURSE_CONFIG.miniProjectReport || {};
  const [phase, setPhase] = useState('loading');      // loading | choose | ready | error
  const [draft, setDraft] = useState(null);
  const [save, setSave] = useState({ state: 'saved', at: null, message: '' }); // saved | pending | saving | offline | conflict | session
  const [choice, setChoice] = useState(null);           // { local, server } when both have changes
  const [loadError, setLoadError] = useState('');

  const baseVersion = useRef(0);
  const dirty = useRef(false);
  const latest = useRef(null);
  const timer = useRef(null);
  const saving = useRef(false);
  const stepStart = useRef(Date.now());

  // Python's check of the student's code (concepts step, and the PDF).
  const [analysis, setAnalysis] = useState(null);
  const [analysisState, setAnalysisState] = useState('idle'); // idle | loading | ready | failed
  const analysedHash = useRef(null);
  // The e-Lab Record: certificate status + experiment dates.
  const [lab, setLab] = useState({ state: 'idle' });
  const [downloading, setDownloading] = useState('');
  const [downloadError, setDownloadError] = useState('');

  // ── Load: server copy, unless this device has unsaved changes on top of it ──
  useEffect(() => {
    let cancelled = false;
    (async () => {
      // A fresh sign-in always carries a token once the report's Code.gs is deployed,
      // so a missing token (or "Unknown action") means the backend is still the old one.
      if (!student?.token) { setPhase('error'); setLoadError('server'); return; }
      const r = await loadReport(student.token);
      if (cancelled) return;
      const cache = readCache(student.rollNo);
      if (!r.success) {
        if (r.code === 'SESSION') { setPhase('error'); setLoadError('session'); return; }
        if (r.message === 'Unknown action') { setPhase('error'); setLoadError('server'); return; }
        if (cache?.draft) {        // offline: carry on from this device's copy
          start(upgradeDraft(cache.draft), cache.baseVersion || 0, !!cache.dirty);
          setSave({ state: 'offline', at: null, message: r.message });
          return;
        }
        setPhase('error'); setLoadError(r.message || 'Could not load your report.');
        return;
      }
      const serverVersion = r.version || 0;
      if (cache?.dirty && cache.draft) {
        if ((cache.baseVersion || 0) === serverVersion) { start(upgradeDraft(cache.draft), serverVersion, true); return; }
        setChoice({ local: cache, server: { draft: r.draft, version: serverVersion, savedAt: r.savedAt } });
        setPhase('choose');
        return;
      }
      start(upgradeDraft(r.draft), serverVersion, false, r.savedAt);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function start(d, version, isDirty, savedAt) {
    baseVersion.current = version;
    dirty.current = isDirty;
    latest.current = d;
    setDraft(d);
    setSave({ state: isDirty ? 'pending' : 'saved', at: savedAt || null, message: '' });
    setPhase('ready');
    stepStart.current = Date.now();
    if (isDirty) schedule();
  }

  // ── Save ──
  const flush = useCallback(async (force = false) => {
    clearTimeout(timer.current);
    if (saving.current || !latest.current || (!dirty.current && !force)) return;
    saving.current = true;
    const sent = latest.current;
    setSave(s => ({ ...s, state: 'saving' }));
    const r = await saveReport(student.token, sent, baseVersion.current, force);
    saving.current = false;
    if (r.success) {
      baseVersion.current = r.version;
      if (latest.current === sent) dirty.current = false;
      writeCache(student.rollNo, { draft: latest.current, baseVersion: r.version, dirty: dirty.current, at: new Date().toISOString() });
      setSave({ state: dirty.current ? 'pending' : 'saved', at: r.savedAt, message: '' });
      if (dirty.current) schedule();
    } else if (r.conflict) {
      setSave({ state: 'conflict', at: r.savedAt, message: '' });
    } else if (r.code === 'SESSION') {
      setSave({ state: 'session', at: null, message: r.message });
    } else {
      setSave({ state: 'offline', at: null, message: r.message || 'Not saved yet.' });
      timer.current = setTimeout(() => flush(), RETRY_MS);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  function schedule() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => flush(), SAVE_DELAY_MS);
  }

  // Every change goes through here.
  const edit = useCallback((updater) => {
    setDraft(prev => {
      const next = updater(prev);
      latest.current = next;
      dirty.current = true;
      writeCache(student.rollNo, { draft: next, baseVersion: baseVersion.current, dirty: true, at: new Date().toISOString() });
      return next;
    });
    setSave(s => (s.state === 'conflict' || s.state === 'session' ? s : { ...s, state: 'pending' }));
    schedule();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  // Typed vs pasted characters in written answers, per step (viva sheet only).
  const track = useCallback((typed, pasted) => {
    setDraft(prev => {
      const id = prev.step;
      const m = prev.meta;
      const next = {
        ...prev,
        meta: {
          ...m,
          typed: { ...m.typed, [id]: (m.typed[id] || 0) + typed },
          pasted: { ...m.pasted, [id]: (m.pasted[id] || 0) + pasted },
        },
      };
      latest.current = next;
      return next;
    });
  }, []);

  // Warn before closing the tab with unsaved work; save when the tab is hidden.
  useEffect(() => {
    const beforeUnload = (e) => { if (dirty.current) { e.preventDefault(); e.returnValue = ''; } };
    const hidden = () => { if (document.visibilityState === 'hidden') flush(); };
    window.addEventListener('beforeunload', beforeUnload);
    document.addEventListener('visibilitychange', hidden);
    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
      document.removeEventListener('visibilitychange', hidden);
      clearTimeout(timer.current);
    };
  }, [flush]);

  function goTo(stepId) {
    const secs = Math.round((Date.now() - stepStart.current) / 1000);
    stepStart.current = Date.now();
    edit(d => ({
      ...d,
      step: stepId,
      meta: { ...d.meta, seconds: { ...d.meta.seconds, [d.step]: (d.meta.seconds[d.step] || 0) + Math.min(secs, 3600) } },
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function backToDashboard() {
    await flush();
    onBack();
  }

  // Conflict: keep the other device's newer copy, or overwrite it with this one.
  async function useServerCopy() {
    setSave(s => ({ ...s, state: 'saving' }));
    const r = await loadReport(student.token);
    if (r.success) {
      writeCache(student.rollNo, { draft: r.draft, baseVersion: r.version, dirty: false, at: new Date().toISOString() });
      start(upgradeDraft(r.draft), r.version || 0, false, r.savedAt);
    } else {
      setSave({ state: 'offline', at: null, message: r.message });
    }
  }
  function keepThisCopy() { dirty.current = true; flush(true); }

  const codeKey = draft ? codeHash(draft.files.map(f => f.id + '\u0000' + f.code).join('\u0001')) : '';
  const needsAnalysis = draft && (draft.step === 'concepts' || draft.step === 'finish');
  useEffect(() => {
    if (!needsAnalysis || analysedHash.current === codeKey) return;
    analysedHash.current = codeKey;
    let live = true;
    setAnalysisState(s => (s === 'ready' ? 'ready' : 'loading'));
    analyseCode(latest.current.files)
      .then(r => { if (live) { setAnalysis(r); setAnalysisState('ready'); } })
      .catch(() => { if (live) { setAnalysis(null); setAnalysisState('failed'); analysedHash.current = null; } });
    return () => { live = false; };
  }, [needsAnalysis, codeKey]);

  const needsLab = draft && draft.step === 'finish';
  async function fetchLab() {
    setLab(l => ({ ...l, state: l.status ? 'ready' : 'loading' }));
    try {
      const r = await loadLabProgress(student.token);
      setLab({ state: 'ready', ...r });
      return r;
    } catch {
      setLab(l => ({ ...l, state: l.status ? 'ready' : 'failed' }));
      return null;
    }
  }
  useEffect(() => {
    if (needsLab && lab.state === 'idle') fetchLab();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsLab]);

  async function download(hasMissing) {
    if (hasMissing && !window.confirm('Some parts of your report are not filled in yet (listed above). Download anyway?')) return;
    setDownloadError('');
    setDownloading('Saving your latest work…');
    try {
      await flush();
      const freshLab = (await fetchLab()) || (lab.status ? lab : null);
      let freshAnalysis = analysis;
      if (!freshAnalysis) { try { freshAnalysis = await analyseCode(latest.current.files); } catch { freshAnalysis = null; } }
      const { buildReportPdf, vivaSummary } = await import('./pdf.js');
      const { blob, filename } = await buildReportPdf({ draft: latest.current, student, analysis: freshAnalysis, lab: freshLab, token: student.token, onProgress: setDownloading });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      submitReportSummary(student.token, vivaSummary(latest.current, student, freshAnalysis, freshLab));
    } catch (e) {
      setDownloadError('Couldn’t make the PDF: ' + (e?.message || 'unknown error') + '. Check your connection and try again.');
    } finally {
      setDownloading('');
    }
  }

  // ── Screens ──
  if (phase === 'loading') return <Centered><div style={{ color: D.inkSoft }}>Opening your report…</div></Centered>;

  if (phase === 'error') {
    return (
      <Centered>
        <div style={{ color: D.ink, fontSize: 17, fontWeight: 700 }}>{loadError === 'session' ? 'Please sign in again' : loadError === 'server' ? 'The report isn’t ready on the server yet' : 'Couldn’t open your report'}</div>
        <div style={{ color: D.inkSoft, fontSize: 14, maxWidth: 420, lineHeight: 1.6 }}>
          {loadError === 'session' ? 'Your report is saved with your Foothold account. Sign in again to open it.'
            : loadError === 'server' ? 'Foothold’s server hasn’t been updated for the mini-project report yet. Please tell your faculty; nothing is wrong with your account.'
            : loadError}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {loadError === 'session'
            ? <Primary onClick={onSignInAgain}>Sign in</Primary>
            : <Primary onClick={() => window.location.reload()}>Try again</Primary>}
          <Secondary onClick={onBack}>Back to dashboard</Secondary>
        </div>
      </Centered>
    );
  }

  if (phase === 'choose') {
    return (
      <Centered>
        <div style={{ color: D.ink, fontSize: 17, fontWeight: 700 }}>Which version should we keep?</div>
        <div style={{ color: D.inkSoft, fontSize: 14, maxWidth: 460, lineHeight: 1.65 }}>
          This device has changes from <b>{timeOf(choice.local.at)}</b> that were never saved, and your report was also saved from another device at <b>{timeOf(choice.server.savedAt)}</b>.
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Primary onClick={() => { writeCache(student.rollNo, null); start(upgradeDraft(choice.server.draft), choice.server.version, false, choice.server.savedAt); }}>
            Use the other device’s version
          </Primary>
          <Secondary onClick={() => { baseVersion.current = choice.server.version; start(upgradeDraft(choice.local.draft), choice.server.version, true); }}>
            Keep this device’s version
          </Secondary>
        </div>
      </Centered>
    );
  }

  const stepIdx = STEPS.findIndex(s => s.id === draft.step);
  const step = STEPS[stepIdx] || STEPS[0];
  const missing = missingFor(step.id, draft);
  const props = { draft, edit, track, student, details, analysis, analysisState };

  return (
    <div style={{ minHeight: '100vh', background: D.bgDeep, color: D.ink, fontFamily: FONT }}>
      <style>{`
        .rb-input:focus { border-color: ${D.amber} !important; }
        .rb-chip:hover, .rb-small:hover:not(:disabled) { border-color: ${D.inkMuted} !important; }
        .rb-step:hover { background: ${D.surfaceRaised} !important; }
        .rb-layout { display: grid; grid-template-columns: 230px minmax(0, 1fr); gap: 24px; }
        .rb-steps { position: sticky; top: 76px; align-self: start; }
        @media (max-width: 820px) {
          .rb-layout { grid-template-columns: minmax(0, 1fr); gap: 14px; }
          .rb-steps { position: static; display: flex; overflow-x: auto; gap: 6px; padding-bottom: 4px; }
          .rb-steps .rb-step { flex: 0 0 auto; width: auto !important; margin-bottom: 0 !important; padding: 6px !important; }
          .rb-steps .rb-steplabel { display: none; }
        }
      `}</style>

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: D.surface, borderBottom: `1px solid ${D.border}` }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={backToDashboard} aria-label="Back to dashboard" title="Back to dashboard" style={{
            width: 34, height: 34, borderRadius: '50%', background: 'transparent', border: `1px solid ${D.border}`,
            color: D.inkSoft, cursor: 'pointer', fontSize: 16,
          }}>←</button>
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ color: D.bronze, fontFamily: MONO, fontSize: 11, letterSpacing: 1 }}>MED23CL202 · MINI-PROJECT REPORT</div>
            <div style={{ fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {draft.title.trim() || 'Untitled project'}
            </div>
          </div>
          <SaveBadge save={save} />
        </div>
        {(save.state === 'conflict' || save.state === 'session') && (
          <div style={{ background: 'rgba(231,161,62,0.12)', borderTop: `1px solid ${D.amber}55` }}>
            <div style={{ maxWidth: 1060, margin: '0 auto', padding: '10px 16px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', fontSize: 13.5 }}>
              {save.state === 'conflict' ? (
                <>
                  <div style={{ flex: 1, minWidth: 220, color: D.ink }}>Your report was changed on another device{save.at ? ` at ${timeOf(save.at)}` : ''}. Your changes here are not saved yet.</div>
                  <Secondary onClick={useServerCopy}>Load the newer version</Secondary>
                  <Primary onClick={keepThisCopy}>Keep this version</Primary>
                </>
              ) : (
                <>
                  <div style={{ flex: 1, minWidth: 220, color: D.ink }}>Your sign-in has expired. Your work is kept on this device; sign in again to save it.</div>
                  <Primary onClick={onSignInAgain}>Sign in again</Primary>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '22px 16px 60px' }} className="rb-layout">
        {/* Step list */}
        <nav className="rb-steps" aria-label="Report steps">
          {STEPS.map((s, i) => {
            const st = stepStatus(s.id, draft);
            const active = s.id === step.id;
            const dot = st === 'done' ? D.green : st === 'partial' ? D.amber : D.border;
            return (
              <button key={s.id} onClick={() => goTo(s.id)} className="rb-step" aria-current={active ? 'step' : undefined}
                aria-label={`Step ${i + 1}: ${s.label}${st === 'done' ? ' (done)' : st === 'partial' ? ' (started)' : ''}`} title={s.label} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', marginBottom: 4,
                background: active ? D.surfaceRaised : 'transparent', border: `1px solid ${active ? D.border : 'transparent'}`,
                borderRadius: 8, padding: '8px 10px', cursor: 'pointer', color: D.ink, fontFamily: FONT, fontSize: 13.5,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11.5, fontFamily: MONO, border: `1.5px solid ${dot}`, color: st === 'done' ? D.green : D.inkSoft,
                }}>{st === 'done' ? '✓' : i + 1}</span>
                <span className="rb-steplabel">{s.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Current step */}
        <main>
          <div style={{ color: D.inkMuted, fontFamily: MONO, fontSize: 12, marginBottom: 4 }}>STEP {stepIdx + 1} OF {STEPS.length}</div>
          <h1 style={{ margin: '0 0 18px', fontSize: 24, fontWeight: 700 }}>{step.label}</h1>
          <div style={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 12, padding: '22px 20px' }}>
            {step.id === 'title' && <TitleStep {...props} />}
            {step.id === 'problem' && <ProblemStep {...props} />}
            {step.id === 'objectives' && <ObjectivesStep {...props} />}
            {step.id === 'code' && <CodeStep {...props} />}
            {step.id === 'concepts' && <ConceptsStep {...props} />}
            {step.id === 'running' && <RunningStep {...props} />}
            {step.id === 'testing' && <TestingStep {...props} />}
            {step.id === 'reflect' && <ReflectStep {...props} />}
            {step.id === 'finish' && <FinishStep {...props} cert={lab} onDownload={download} downloading={downloading} downloadError={downloadError} goTo={goTo} />}
          </div>

          {step.id !== 'finish' && missing.length > 0 && (
            <div style={{ marginTop: 12, color: D.amberSoft, fontSize: 13.5, lineHeight: 1.6 }}>
              Still to do here: {missing.join(' ')} <span style={{ color: D.inkMuted }}>You can move on and come back later.</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, gap: 10 }}>
            {stepIdx > 0 ? <Secondary onClick={() => goTo(STEPS[stepIdx - 1].id)}>← {STEPS[stepIdx - 1].label}</Secondary> : <span />}
            {stepIdx < STEPS.length - 1 && <Primary onClick={() => goTo(STEPS[stepIdx + 1].id)}>{STEPS[stepIdx + 1].label} →</Primary>}
          </div>
        </main>
      </div>
    </div>
  );
}

function SaveBadge({ save }) {
  const map = {
    saved: { text: save.at ? `Saved · ${timeOf(save.at)}` : 'Saved', color: D.green },
    pending: { text: 'Unsaved changes…', color: D.inkMuted },
    saving: { text: 'Saving…', color: D.inkSoft },
    offline: { text: 'Offline · kept on this device', color: D.amber },
    conflict: { text: 'Not saved', color: D.amber },
    session: { text: 'Not saved', color: D.amber },
  };
  const m = map[save.state] || map.saved;
  return (
    <div role="status" title={save.message || ''} style={{ color: m.color, fontSize: 12.5, fontFamily: MONO, whiteSpace: 'nowrap' }}>
      ● {m.text}
    </div>
  );
}

function Centered({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: D.bgDeep, fontFamily: FONT, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, textAlign: 'center' }}>
      {children}
    </div>
  );
}

function Primary({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ background: D.amber, border: 'none', color: '#111A2E', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
      {children}
    </button>
  );
}

function Secondary({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ background: 'transparent', border: `1px solid ${D.border}`, color: D.ink, borderRadius: 8, padding: '10px 18px', fontSize: 14, cursor: 'pointer', fontFamily: FONT }}>
      {children}
    </button>
  );
}
