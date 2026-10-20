import { useState, useMemo, useEffect, useRef } from 'react';
import { DARK as D, FONT, MONO } from '../brand.js';
import { CONCEPTS, CONCEPT, SCREENS, colorOf, conceptState, taggedLines, usedCount, toRanges, rangeText, questionFor, FILE_PLACES } from './concepts.js';
import { checkConcept, untaggedFound, foundHint } from './analyzer.js';
import { codeHash, filled } from './reportModel.js';
import { TextField, SmallButton, Chips } from './ReportSteps.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// ConceptsStep — one screen per experiment. The student picks a concept, then
// clicks the lines of their own code where it appears (shift-click for a
// range), or marks it "I didn't use this". Python's parser (analyzer.js)
// confirms tags or warns; it never tags for them. One light question per screen.
// ─────────────────────────────────────────────────────────────────────────────

export default function ConceptsStep({ draft, edit, track, analysis, analysisState }) {
  const screen = SCREENS.find(s => s.id === draft.conceptScreen) || SCREENS[0];
  const screenIdx = SCREENS.indexOf(screen);
  const [active, setActive] = useState(screen.concepts[0]);
  const [fileId, setFileId] = useState(() => (draft.files.find(f => f.code.trim()) || draft.files[0]).id);
  const anchor = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => { setActive(screen.concepts[0]); anchor.current = null; }, [screen.id]);

  const checks = useMemo(() => Object.fromEntries(CONCEPTS.map(c => [c.id, checkConcept(draft, c.id, analysis)])), [draft, analysis]);

  // Remember which way Exp 4 was shown (overriding or polymorphism) for the question wording.
  useEffect(() => {
    const v = checks.override_poly?.variant;
    if (v && draft.concepts.override_poly?.variant !== v) {
      edit(d => ({ ...d, concepts: { ...d.concepts, override_poly: { ...d.concepts.override_poly, variant: v } } }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checks.override_poly?.variant]);

  const setConcept = (id, patch) => edit(d => ({ ...d, concepts: { ...d.concepts, [id]: { ...(d.concepts[id] || {}), ...patch } } }));
  const setScreen = (id) => { edit(d => ({ ...d, conceptScreen: id })); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  function clickLine(line, shift) {
    if (!active) return;
    // The file the viewer is showing (falls back to the first file with code, as CodeViewer does).
    const file = draft.files.find(f => f.id === fileId && f.code.trim()) || draft.files.find(f => f.code.trim());
    if (!file) return;
    const fid = file.id;
    const current = new Set(taggedLines(draft, active)[fid] || []);
    if (shift && anchor.current && anchor.current.fileId === fid) {
      const [a, b] = [Math.min(anchor.current.line, line), Math.max(anchor.current.line, line)];
      for (let n = a; n <= b; n++) current.add(n);
    } else if (current.has(line)) {
      current.delete(line);
    } else {
      current.add(line);
    }
    anchor.current = { fileId: fid, line };
    const c = draft.concepts[active] || {};
    setConcept(active, {
      lines: { ...(c.lines || {}), [fid]: [...current].sort((x, y) => x - y) },
      notUsed: false, keep: false,
      sig: { ...(c.sig || {}), [fid]: codeHash(file.code) },
    });
  }

  function removeRange(conceptId, fid, [a, b]) {
    const c = draft.concepts[conceptId] || {};
    const lines = (c.lines?.[fid] || []).filter(n => n < a || n > b);
    setConcept(conceptId, { lines: { ...c.lines, [fid]: lines }, keep: false });
  }

  function pickConcept(id) {
    setActive(id);
    anchor.current = null;
    const tl = taggedLines(draft, id);
    const withTags = draft.files.find(f => tl[f.id]?.length);
    if (withTags) setFileId(withTags.id);
    if (window.innerWidth < 980) viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const used = usedCount(draft);
  const answer = draft.answers[screen.id] || {};
  const screenUsed = screen.concepts.some(id => conceptState(draft, id) === 'used');
  const setAnswer = (patch) => edit(d => ({ ...d, answers: { ...d.answers, [screen.id]: { ...(d.answers[screen.id] || {}), ...patch } } }));
  const hasCode = draft.files.some(f => f.code.trim());

  if (!hasCode) {
    return <div style={{ color: D.inkSoft, fontSize: 14.5 }}>Paste your code in step 4 first. Then come back here to point out where each concept is.</div>;
  }

  return (
    <div>
      <style>{`
        .cs-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); gap: 18px; align-items: start; }
        .cs-viewer { position: sticky; top: 76px; }
        .cs-line:hover { background: ${D.surfaceRaised}; }
        @media (max-width: 980px) { .cs-grid { grid-template-columns: minmax(0, 1fr); } .cs-viewer { position: static; } }
      `}</style>

      {/* Meter + experiment tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ color: D.ink, fontWeight: 700, fontSize: 14.5 }}>Concepts used: {used} of {CONCEPTS.length}</div>
        <div style={{ flex: 1, minWidth: 120, height: 6, background: D.bgDeep, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${(used / CONCEPTS.length) * 100}%`, height: '100%', background: D.green }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }} role="tablist" aria-label="Experiments">
        {SCREENS.map(s => {
          const decided = s.concepts.filter(id => conceptState(draft, id) !== 'pending').length;
          const on = s.id === screen.id;
          const done = decided === s.concepts.length;
          return (
            <button key={s.id} role="tab" aria-selected={on} onClick={() => setScreen(s.id)} title={`${s.exp}: ${s.title}`} style={{
              background: on ? D.surfaceRaised : 'transparent', color: on ? D.ink : D.inkSoft, fontFamily: FONT, fontSize: 12.5,
              border: `1px solid ${on ? D.inkMuted : D.border}`, borderRadius: 999, padding: '5px 11px', cursor: 'pointer',
            }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: done ? D.green : decided ? D.amber : D.border, marginRight: 6 }} />
              {s.exp.replace('Experiments', 'Exp').replace('Experiment', 'Exp').replace(' and ', '–')}
            </button>
          );
        })}
      </div>

      <AnalysisNote state={analysisState} analysis={analysis} files={draft.files} />

      <div style={{ color: D.bronze, fontFamily: MONO, fontSize: 11.5, letterSpacing: 1, marginTop: 14 }}>{screen.exp.toUpperCase()}</div>
      <div style={{ color: D.ink, fontSize: 18, fontWeight: 700, margin: '2px 0 4px' }}>{screen.title}</div>
      <div style={{ color: D.inkMuted, fontSize: 13, marginBottom: 14, lineHeight: 1.55 }}>
        Pick a concept, then click its lines in your code on the right (shift-click to select a range; click a line again to remove it).
        If you didn’t use something, that’s fine: mark it and your report will say so.
      </div>

      <div className="cs-grid">
        <div>
          {screen.concepts.map(id => (
            <ConceptCard key={id} id={id} draft={draft} active={active === id} check={checks[id]} analysis={analysis} checking={analysisState === 'loading'}
              onPick={() => pickConcept(id)} setConcept={setConcept} removeRange={removeRange} track={track} />
          ))}

          {screenUsed && (
            <div style={{ border: `1px solid ${D.border}`, borderRadius: 10, padding: 14, background: D.bgDeep, marginTop: 6 }}>
              <div style={{ color: D.inkMuted, fontSize: 12.5, marginBottom: 6 }}>One short line about your own code:</div>
              {screen.id === 'e56' && (
                <>
                  <div style={{ color: D.ink, fontSize: 14, marginBottom: 2 }}>My program saves its file in:</div>
                  <Chips options={FILE_PLACES} value={answer.place} onPick={v => setAnswer({ place: v })} />
                  {answer.place === FILE_PLACES[0] && (
                    <div style={{ color: D.amberSoft, fontSize: 12.5, lineHeight: 1.55, marginBottom: 8 }}>
                      Files in Colab’s own folder are deleted when the runtime disconnects. That’s fine for a test, but your data will be gone next time. See “Files in Google Colab” to save in Google Drive instead.
                    </div>
                  )}
                </>
              )}
              <div style={{ color: D.ink, fontSize: 14.5, marginBottom: 6 }}>{questionFor(screen.id, draft)} …</div>
              <TextField value={answer.text} onValue={v => setAnswer({ text: v })} track={track} maxLength={300} placeholder="finish the sentence" ariaLabel="Finish the sentence" />
              {filled(answer.text) && answer.text.trim().split(/\s+/).length < 3 && (
                <div style={{ color: D.inkMuted, fontSize: 12.5, marginTop: 4 }}>A few more words would help.</div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, gap: 10 }}>
            {screenIdx > 0 ? <SmallButton onClick={() => setScreen(SCREENS[screenIdx - 1].id)}>← {SCREENS[screenIdx - 1].exp}</SmallButton> : <span />}
            {screenIdx < SCREENS.length - 1 && <SmallButton onClick={() => setScreen(SCREENS[screenIdx + 1].id)}>{SCREENS[screenIdx + 1].exp} →</SmallButton>}
          </div>
        </div>

        <div className="cs-viewer" ref={viewerRef}>
          <CodeViewer draft={draft} fileId={fileId} setFileId={(id) => { setFileId(id); anchor.current = null; }} active={active} onLine={clickLine} />
        </div>
      </div>
    </div>
  );
}

function AnalysisNote({ state, analysis, files }) {
  let text = '', color = D.inkMuted;
  if (state === 'loading') text = 'Checking your code with Python… (the first time, this downloads a few MB)';
  else if (state === 'failed') { text = 'Couldn’t load the Python checker (slow or no connection?). Simple checks are used instead; you can still tag everything.'; color = D.amberSoft; }
  else if (analysis?.errors?.length) {
    const e = analysis.errors[0];
    const name = files.find(f => f.id === e.file)?.name || 'a file';
    text = `Python couldn’t read ${name} (line ${e.line}: ${e.msg}). Simple checks are used for that file. If this is a mistake in your code, fix it in step 4.`;
    color = D.amberSoft;
  }
  if (!text) return null;
  return <div style={{ color, fontSize: 12.5, lineHeight: 1.55, background: D.bgDeep, border: `1px solid ${D.borderSoft}`, borderRadius: 8, padding: '7px 11px' }}>{text}</div>;
}

function ConceptCard({ id, draft, active, check, analysis, checking, onPick, setConcept, removeRange, track }) {
  const concept = CONCEPT[id];
  const c = draft.concepts[id] || {};
  const state = conceptState(draft, id);
  const color = colorOf(id);
  const [showEx, setShowEx] = useState(false);
  const tl = taggedLines(draft, id);
  const stale = draft.files.filter(f => tl[f.id]?.length && c.sig?.[f.id] && c.sig[f.id] !== codeHash(f.code));
  const missed = state === 'used' ? untaggedFound(draft, id, analysis) : [];
  const hint = state === 'notused' ? foundHint(draft, id, analysis) : '';

  return (
    <div style={{
      borderTop: `1px solid ${active ? color : D.border}`, borderRight: `1px solid ${active ? color : D.border}`,
      borderBottom: `1px solid ${active ? color : D.border}`, borderLeft: `4px solid ${color}`, borderRadius: 10,
      padding: '12px 14px', marginBottom: 10, background: active ? D.surfaceRaised : D.bgDeep,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, color, border: `1px solid ${color}`, borderRadius: 4, padding: '1px 5px', marginTop: 2 }}>{concept.code}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: D.ink, fontWeight: 600, fontSize: 14.5 }}>
            {concept.label}
            {state === 'used' && <span style={{ color: D.green, fontWeight: 400, fontSize: 12.5 }}> · tagged</span>}
            {state === 'notused' && <span style={{ color: D.inkMuted, fontWeight: 400, fontSize: 12.5 }}> · not used</span>}
          </div>
          <div style={{ color: D.inkMuted, fontSize: 12.5, lineHeight: 1.5, marginTop: 2 }}>
            {concept.what}{' '}
            <button type="button" onClick={() => setShowEx(v => !v)} style={{ background: 'none', border: 'none', color: D.blue, cursor: 'pointer', fontSize: 12.5, padding: 0, fontFamily: FONT }}>
              {showEx ? 'Hide example' : 'Show example'}
            </button>
          </div>
          {showEx && <pre style={{ margin: '6px 0 0', padding: '8px 10px', background: D.surface, borderRadius: 6, color: D.inkSoft, fontFamily: MONO, fontSize: 12, whiteSpace: 'pre-wrap' }}>{concept.example}</pre>}
        </div>
      </div>

      {state === 'used' && (
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {draft.files.filter(f => tl[f.id]?.length).flatMap(f => toRanges(tl[f.id]).map(r => (
            <span key={f.id + r[0]} style={{ fontFamily: MONO, fontSize: 12, color: D.ink, background: D.surface, border: `1px solid ${D.border}`, borderRadius: 6, padding: '2px 4px 2px 8px' }}>
              {f.name} {rangeText(r)}
              <button type="button" aria-label={`Remove ${f.name} ${rangeText(r)}`} onClick={() => removeRange(id, f.id, r)} style={{ background: 'none', border: 'none', color: D.inkMuted, cursor: 'pointer', marginLeft: 2 }}>✕</button>
            </span>
          )))}
        </div>
      )}

      {state === 'used' && check?.state === 'ok' && <div style={{ color: D.green, fontSize: 12.5, marginTop: 6, lineHeight: 1.5 }}>✓ {check.message}</div>}
      {state === 'used' && checking && check?.state === 'warn' && <div style={{ color: D.inkMuted, fontSize: 12.5, marginTop: 6 }}>Checking…</div>}
      {state === 'used' && !checking && check?.state === 'warn' && (
        <div style={{ color: c.keep ? D.inkMuted : D.amberSoft, fontSize: 12.5, marginTop: 6, lineHeight: 1.5 }}>
          {c.keep ? 'Kept. Your report will say this was not confirmed by Foothold.' : <>{check.message} Check the lines, or <button type="button" onClick={() => setConcept(id, { keep: true })} style={{ background: 'none', border: 'none', color: D.blue, cursor: 'pointer', padding: 0, fontSize: 12.5, fontFamily: FONT }}>keep my tag</button>.</>}
        </div>
      )}
      {id === 'override_poly' && state === 'used' && check?.variant === 'override' && !check.both && (
        <div style={{ color: D.inkMuted, fontSize: 12.5, marginTop: 6, lineHeight: 1.5 }}>
          Tip: your overridden method becomes polymorphism when one line calls it on different kinds of objects, e.g. <code style={{ color: D.amberSoft }}>for p in patients: print(p.status(t))</code>. Nothing to do; just good to know.
        </div>
      )}
      {stale.length > 0 && (
        <div style={{ color: D.amberSoft, fontSize: 12.5, marginTop: 6, lineHeight: 1.5 }}>
          Your code in {stale.map(f => f.name).join(', ')} changed after you tagged this. Check the highlighted lines still point to the right place.{' '}
          <button type="button" onClick={() => setConcept(id, { sig: { ...c.sig, ...Object.fromEntries(stale.map(f => [f.id, codeHash(f.code)])) } })} style={{ background: 'none', border: 'none', color: D.blue, cursor: 'pointer', padding: 0, fontSize: 12.5, fontFamily: FONT }}>They look right</button>
        </div>
      )}
      {missed.length > 0 && ['class', 'subclass', 'custom_exc', 'function'].includes(id) && (
        <div style={{ color: D.inkMuted, fontSize: 12.5, marginTop: 6, lineHeight: 1.5 }}>
          We found {missed.length} more in your code that you haven’t tagged ({missed.slice(0, 2).map(m => `${draft.files.find(f => f.id === m.fileId)?.name} line ${m.line}`).join(', ')}). Tag it too if you like.
        </div>
      )}

      {state === 'notused' && (
        <div style={{ marginTop: 8 }}>
          <div style={{ color: D.inkSoft, fontSize: 12.5, marginBottom: 6 }}>That’s fine. Your report will list this as not used.</div>
          {hint && (
            <div style={{ color: D.amberSoft, fontSize: 12.5, marginBottom: 6, lineHeight: 1.5 }}>
              We found it in {hint}. Did you mean to tag it?{' '}
              <button type="button" onClick={() => { setConcept(id, { notUsed: false }); onPick(); }} style={{ background: 'none', border: 'none', color: D.blue, cursor: 'pointer', padding: 0, fontSize: 12.5, fontFamily: FONT }}>Tag it</button>
            </div>
          )}
          <TextField value={c.note} onValue={v => setConcept(id, { note: v })} track={track} maxLength={200}
            placeholder="Optional: where could it have fitted in your project?" ariaLabel={`Where could ${concept.label} have fitted`} />
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        <button type="button" onClick={onPick} aria-pressed={active} style={{
          background: active ? color : 'transparent', color: active ? '#0D1117' : D.ink, border: `1px solid ${color}`,
          borderRadius: 8, padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
        }}>{active ? 'Tagging: click lines →' : state === 'used' ? 'Change lines' : 'Tag lines'}</button>
        {state !== 'used' && (
          <SmallButton onClick={() => setConcept(id, { notUsed: state !== 'notused' })}>
            {state === 'notused' ? 'Undo “not used”' : 'I didn’t use this'}
          </SmallButton>
        )}
      </div>
    </div>
  );
}

function CodeViewer({ draft, fileId, setFileId, active, onLine }) {
  const files = draft.files.filter(f => f.code.trim());
  const file = files.find(f => f.id === fileId) || files[0];
  const lines = (file?.code || '').replace(/\n+$/, '').split('\n');
  const activeLines = new Set(taggedLines(draft, active)[file?.id] || []);
  const color = colorOf(active);
  // Other concepts tagged on each line, as small codes in the margin.
  const others = useMemo(() => {
    const m = {};
    for (const c of CONCEPTS) {
      if (c.id === active) continue;
      for (const n of taggedLines(draft, c.id)[file?.id] || []) (m[n] = m[n] || []).push(c);
    }
    return m;
  }, [draft, file?.id, active]);

  return (
    <div style={{ border: `1px solid ${D.border}`, borderRadius: 10, background: D.bgDeep, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 4, padding: 6, borderBottom: `1px solid ${D.border}`, background: D.surface, flexWrap: 'wrap' }}>
        {files.map(f => (
          <button key={f.id} type="button" onClick={() => setFileId(f.id)} style={{
            fontFamily: MONO, fontSize: 12, padding: '4px 10px', borderRadius: 6, cursor: 'pointer',
            background: f.id === file?.id ? D.surfaceRaised : 'transparent', color: f.id === file?.id ? D.ink : D.inkMuted,
            border: `1px solid ${f.id === file?.id ? D.border : 'transparent'}`,
          }}>{f.name || 'file'}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ color: active ? color : D.inkMuted, fontSize: 12, alignSelf: 'center', paddingRight: 6 }}>
          {active ? `Tagging: ${CONCEPT[active].label}` : 'Pick a concept on the left'}
        </div>
      </div>
      <div style={{ maxHeight: '70vh', overflow: 'auto', padding: '6px 0' }}>
        {lines.map((text, i) => {
          const n = i + 1;
          const on = activeLines.has(n);
          const marks = others[n] || [];
          return (
            <div key={n} className="cs-line" role="button" tabIndex={0} aria-pressed={on}
              aria-label={`Line ${n}${on ? ', tagged' : ''}`}
              onClick={(e) => onLine(n, e.shiftKey)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onLine(n, e.shiftKey); } }}
              style={{
                display: 'flex', cursor: active ? 'pointer' : 'default', fontFamily: MONO, fontSize: 12.5, lineHeight: '20px',
                background: on ? color + '33' : undefined, borderLeft: `3px solid ${on ? color : 'transparent'}`, userSelect: 'none',
              }}>
              <span style={{ width: 38, flexShrink: 0, textAlign: 'right', paddingRight: 10, color: on ? color : D.inkMuted }}>{n}</span>
              <span style={{ flex: 1, whiteSpace: 'pre', color: D.ink, overflow: 'hidden', textOverflow: 'ellipsis' }}>{text || ' '}</span>
              <span style={{ flexShrink: 0, paddingRight: 8, display: 'flex', gap: 2 }}>
                {marks.slice(0, 4).map(c => (
                  <span key={c.id} title={c.label} style={{ fontSize: 9.5, color: colorOf(c.id), border: `1px solid ${colorOf(c.id)}88`, borderRadius: 3, padding: '0 3px', lineHeight: '14px', marginTop: 3 }}>{c.code}</span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
