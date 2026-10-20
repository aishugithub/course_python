import { useState, useEffect, useRef } from 'react';
import { DARK as D, FONT, MONO } from '../brand.js';
import { Question, TextField, SmallButton, Chips } from './ReportSteps.jsx';
import { CONCEPT, CONCEPTS, conceptState, usedCount } from './concepts.js';
import { STEPS, MIN_TESTS, TEST_KINDS, newTest, testDone, missingFor, filled } from './reportModel.js';
import { shrinkImage, rememberImage, imageData } from './images.js';
import { uploadReportImage, deleteReportImage } from './reportApi.js';

const Block = ({ children }) => <div style={{ marginBottom: 26 }}>{children}</div>;
const MAX_SHOTS = 15;

// ── Step 6: program running (screenshots) ──────────────────────────────────

export function RunningStep({ draft, edit, track, student }) {
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const input = useRef(null);
  const usedConcepts = CONCEPTS.filter(c => conceptState(draft, c.id) === 'used');

  async function addFiles(fileList) {
    setError('');
    const files = [...fileList].slice(0, MAX_SHOTS - draft.shots.length);
    for (let i = 0; i < files.length; i++) {
      setBusy(`Uploading ${i + 1} of ${files.length}…`);
      try {
        const { dataUrl } = await shrinkImage(files[i]);
        const r = await uploadReportImage(student.token, dataUrl, files[i].name);
        if (!r.success) { setError(r.message || 'Upload failed.'); break; }
        rememberImage(r.fileId, dataUrl);
        edit(d => ({ ...d, shots: [...d.shots, { fileId: r.fileId, caption: '', concepts: [] }] }));
      } catch (e) {
        setError(e.message || 'Upload failed.');
        break;
      }
    }
    setBusy('');
    if (input.current) input.current.value = '';
  }

  async function remove(i) {
    if (!window.confirm('Remove this screenshot?')) return;
    const shot = draft.shots[i];
    edit(d => ({ ...d, shots: d.shots.filter((_, j) => j !== i) }));
    deleteReportImage(student.token, shot.fileId);
  }

  const setShot = (i, patch) => edit(d => ({ ...d, shots: d.shots.map((s, j) => (j === i ? { ...s, ...patch } : s)) }));
  const move = (i, dir) => edit(d => {
    const s = [...d.shots];
    const j = i + dir;
    if (j < 0 || j >= s.length) return d;
    [s[i], s[j]] = [s[j], s[i]];
    return { ...d, shots: s };
  });

  return (
    <>
      <Block>
        <Question hint="Run your program in Colab and take screenshots of it working: some output, an error message your program handles, the file it saves, a chart. Keep Colab’s title bar (your notebook named with your register number) in each screenshot.">
          Show your program running
        </Question>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <input ref={input} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
          <button type="button" disabled={!!busy || draft.shots.length >= MAX_SHOTS} onClick={() => input.current?.click()} style={{
            background: D.amber, color: '#111A2E', border: 'none', borderRadius: 8, padding: '9px 16px', fontSize: 13.5, fontWeight: 700,
            cursor: busy ? 'wait' : 'pointer', fontFamily: FONT, opacity: draft.shots.length >= MAX_SHOTS ? 0.5 : 1,
          }}>+ Add screenshots</button>
          <div style={{ color: D.inkMuted, fontSize: 12.5 }}>{busy || `${draft.shots.length} of up to ${MAX_SHOTS}. Images are shrunk before upload.`}</div>
        </div>
        {error && <div style={{ color: D.red, fontSize: 13, marginTop: 8 }}>{error}</div>}
      </Block>

      {draft.shots.map((s, i) => (
        <div key={s.fileId} style={{ border: `1px solid ${D.borderSoft}`, borderRadius: 10, padding: 12, marginBottom: 12, background: D.bgDeep }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Thumb token={student.token} fileId={s.fileId} />
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ color: D.inkMuted, fontFamily: MONO, fontSize: 12, marginBottom: 6 }}>SCREENSHOT {i + 1}</div>
              <TextField value={s.caption} onValue={v => setShot(i, { caption: v })} track={track} maxLength={160}
                placeholder="Caption, e.g. Entering 150 °F shows my error message instead of crashing" ariaLabel={`Caption for screenshot ${i + 1}`} />
              {usedConcepts.length > 0 && (
                <>
                  <div style={{ color: D.inkMuted, fontSize: 12.5, margin: '8px 0 2px' }}>What does it show? (optional; it then appears beside that concept in your report)</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {usedConcepts.map(c => {
                      const on = s.concepts.includes(c.id);
                      return (
                        <button key={c.id} type="button" aria-pressed={on} onClick={() => setShot(i, { concepts: on ? s.concepts.filter(x => x !== c.id) : [...s.concepts, c.id] })} style={{
                          fontSize: 12, padding: '3px 9px', borderRadius: 999, cursor: 'pointer', fontFamily: FONT,
                          background: on ? 'rgba(231,161,62,0.16)' : 'transparent', color: on ? D.amberSoft : D.inkSoft,
                          border: `1px solid ${on ? D.amber : D.border}`,
                        }}>{c.label}</button>
                      );
                    })}
                  </div>
                </>
              )}
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                <SmallButton onClick={() => move(i, -1)} disabled={i === 0} title="Move up">↑</SmallButton>
                <SmallButton onClick={() => move(i, 1)} disabled={i === draft.shots.length - 1} title="Move down">↓</SmallButton>
                <SmallButton danger onClick={() => remove(i)}>Remove</SmallButton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function Thumb({ token, fileId }) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    imageData(token, fileId).then(u => live && setSrc(u)).catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [token, fileId]);
  return (
    <div style={{ width: 200, height: 125, borderRadius: 6, border: `1px solid ${D.border}`, background: D.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
      {src ? <img src={src} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : <span style={{ color: D.inkMuted, fontSize: 12 }}>{failed ? 'Couldn’t load' : 'Loading…'}</span>}
    </div>
  );
}

// ── Step 7: testing ─────────────────────────────────────────────────────────

export function TestingStep({ draft, edit, track }) {
  const tests = draft.tests;
  const setTest = (i, patch) => edit(d => ({ ...d, tests: d.tests.map((t, j) => (j === i ? { ...t, ...patch } : t)) }));
  const done = tests.filter(testDone).length;
  return (
    <>
      <Block>
        <Question hint={`At least ${MIN_TESTS} tests. Try a normal value, a value exactly on a limit, text where a number is expected, an impossible value, and anything else your program should handle. Fill in “What happened” only after you run it.`}>
          How did you test your program?
        </Question>
        <div style={{ color: D.inkMuted, fontSize: 12.5 }}>{done} of {tests.length} filled in.</div>
      </Block>
      {tests.map((t, i) => (
        <div key={i} style={{ border: `1px solid ${D.borderSoft}`, borderRadius: 10, padding: 12, marginBottom: 12, background: D.bgDeep }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
            <div style={{ color: D.inkMuted, fontFamily: MONO, fontSize: 12 }}>TEST {i + 1}</div>
            <select value={t.kind} onChange={e => setTest(i, { kind: e.target.value })} aria-label={`Type of test ${i + 1}`} className="rb-input" style={{
              background: D.bgDeep, color: t.kind ? D.ink : D.inkMuted, border: `1px solid ${D.border}`, borderRadius: 8, padding: '6px 8px', fontSize: 13, fontFamily: FONT,
            }}>
              <option value="">Type of test (optional)</option>
              {TEST_KINDS.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <div style={{ flex: 1 }} />
            {tests.length > MIN_TESTS && <SmallButton danger onClick={() => edit(d => ({ ...d, tests: d.tests.filter((_, j) => j !== i) }))}>Remove</SmallButton>}
          </div>
          <div className="rb-test-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 8 }}>
            <TextField value={t.input} onValue={v => setTest(i, { input: v })} track={track} maxLength={200} placeholder="Input or action, e.g. temperature “abc”" ariaLabel={`Test ${i + 1} input`} />
            <TextField value={t.expected} onValue={v => setTest(i, { expected: v })} track={track} maxLength={200} placeholder="What should happen" ariaLabel={`Test ${i + 1} expected result`} />
            <TextField value={t.actual} onValue={v => setTest(i, { actual: v })} track={track} maxLength={200} placeholder="What happened" ariaLabel={`Test ${i + 1} actual result`} />
          </div>
          <div style={{ marginTop: 6 }}>
            <Chips options={['Pass', 'Fail']} value={t.result} onPick={v => setTest(i, { result: t.result === v ? '' : v })} />
          </div>
        </div>
      ))}
      {tests.length < 15 && <SmallButton onClick={() => edit(d => ({ ...d, tests: [...d.tests, newTest()] }))}>+ Add a test</SmallButton>}
    </>
  );
}

// ── Step 8: how it grew ─────────────────────────────────────────────────────

const EXP_TITLES = [
  'Data types, operators and decisions', 'Loops, collections and functions', 'Classes, objects and encapsulation',
  'Inheritance and polymorphism', 'Reading and writing text files', 'File operations and CSV records',
  'Exception handling: try / except', 'raise, finally and user-defined exceptions', 'Data analysis with pandas', 'Charts with Matplotlib and Seaborn',
];

export function GrewStep({ draft, edit, track, progress }) {
  return (
    <>
      <Block>
        <Question hint="Your project grew a little after each experiment. In one line each, say what you added to YOUR project that week. Leave a row empty if you added nothing then. Completion dates come from your Foothold e-Lab Record.">
          How did your project grow?
        </Question>
        {progress.state === 'loading' && <div style={{ color: D.inkMuted, fontSize: 12.5 }}>Loading your e-Lab dates…</div>}
        {progress.state === 'failed' && <div style={{ color: D.amberSoft, fontSize: 12.5 }}>Couldn’t load your e-Lab dates right now. They will be added when the report is downloaded.</div>}
      </Block>
      {EXP_TITLES.map((title, i) => {
        const n = i + 1;
        const date = progress.expDates?.[n];
        return (
          <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap' }}>
            <div style={{ width: 220, flexShrink: 0 }}>
              <div style={{ color: D.ink, fontSize: 13.5, fontWeight: 600 }}>Exp {n}. {title}</div>
              <div style={{ color: date ? D.green : D.inkMuted, fontSize: 12, fontFamily: MONO, marginTop: 2 }}>{date ? `done ${fmtDate(date)}` : 'not done in Foothold'}</div>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <TextField value={draft.grew[n]} onValue={v => edit(d => ({ ...d, grew: { ...d.grew, [n]: v } }))} track={track} maxLength={220}
                placeholder={n === 1 ? 'e.g. Read one patient’s temperature and printed NORMAL or FEVER' : 'What I added to my project'} ariaLabel={`What you added after experiment ${n}`} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export const fmtDate = (iso) => {
  const d = new Date(iso);
  return isNaN(d) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

// ── Step 9: reflection ──────────────────────────────────────────────────────

export function ReflectStep({ draft, edit, track }) {
  const r = draft.reflect;
  const setR = (patch) => edit(d => ({ ...d, reflect: { ...d.reflect, ...patch } }));
  return (
    <>
      <Block>
        <Question hint="Pick the bug that took you longest. Expect a question about it in your viva.">The hardest bug you met</Question>
        <div style={{ display: 'grid', gap: 8 }}>
          <TextField value={r.saw} onValue={v => setR({ saw: v })} track={track} multiline rows={2} maxLength={400} placeholder="What went wrong? e.g. My chart was empty even though the file had data." ariaLabel="What went wrong" />
          <TextField value={r.found} onValue={v => setR({ found: v })} track={track} multiline rows={2} maxLength={400} placeholder="How did you find the cause? e.g. I printed df.head() and saw the temperatures were text." ariaLabel="How you found the cause" />
          <TextField value={r.fixed} onValue={v => setR({ fixed: v })} track={track} multiline rows={2} maxLength={400} placeholder="How did you fix it? e.g. I converted the column with astype(float)." ariaLabel="How you fixed it" />
        </div>
      </Block>
      <Block>
        <Question hint="What can’t it do? Where are its limits simplified? Your report will also say that this is a student project and not a medical device.">Limitations</Question>
        <TextField value={r.limits} onValue={v => setR({ limits: v })} track={track} multiline rows={3} maxLength={700} placeholder="e.g. It uses one fever limit for all ages, and the data file has no password." ariaLabel="Limitations" />
      </Block>
      <Block>
        <Question hint="Two to four sentences: which objectives you met, and what you learned.">Conclusion</Question>
        <TextField value={r.conclusion} onValue={v => setR({ conclusion: v })} track={track} multiline rows={4} maxLength={900} ariaLabel="Conclusion" />
      </Block>
      <Block>
        <Question hint="One or two ideas.">What could you add next?</Question>
        {r.future.map((f, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <TextField value={f} onValue={v => setR({ future: r.future.map((x, j) => (j === i ? v : x)) })} track={track} maxLength={200}
              placeholder={i === 0 ? 'e.g. A simple window (Tkinter) instead of typing in Colab' : 'Another idea (optional)'} ariaLabel={`Future idea ${i + 1}`} />
          </div>
        ))}
      </Block>
      <Block>
        <Question hint="Using an AI tool is allowed if you say so honestly. Say what it helped with.">Did you use any AI tool (ChatGPT, Gemini, Copilot…)?</Question>
        <Chips options={['No', 'Yes']} value={r.aiUsed === 'yes' ? 'Yes' : r.aiUsed === 'no' ? 'No' : ''} onPick={v => setR({ aiUsed: v.toLowerCase() })} />
        {r.aiUsed === 'yes' && (
          <TextField value={r.aiWhat} onValue={v => setR({ aiWhat: v })} track={track} multiline rows={2} maxLength={400}
            placeholder="Which tool, and what for? e.g. ChatGPT explained a KeyError; I wrote the fix myself." ariaLabel="Which AI tool and what for" />
        )}
      </Block>
    </>
  );
}

// ── Step 10: references, final check and download ───────────────────────────

const SUGGESTED_REFS = [
  'Python Software Foundation, “The Python Tutorial,” docs.python.org/3/tutorial.',
  'Foothold Python course and MED23CL202 e-Lab Record, Sri Ramachandra Faculty of Engineering and Technology.',
  'pandas development team, “pandas documentation,” pandas.pydata.org.',
  'Matplotlib development team, “Matplotlib documentation,” matplotlib.org.',
];

export function FinishStep({ draft, edit, track, cert, onDownload, downloading, downloadError, goTo }) {
  const refs = draft.refs;
  const setRefs = (list) => edit(d => ({ ...d, refs: list }));
  const missing = STEPS.filter(s => s.id !== 'finish').map(s => ({ step: s, items: missingFor(s.id, draft) })).filter(x => x.items.length);
  const ownMissing = missingFor('finish', draft);
  const notUsed = CONCEPTS.filter(c => conceptState(draft, c.id) !== 'used');
  return (
    <>
      <Block>
        <Question hint="Number them in the order you used them: websites, books, documentation, the source of any normal ranges (e.g. a fever limit), and anything else you used.">References</Question>
        {refs.map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <div style={{ color: D.inkMuted, fontFamily: MONO, fontSize: 13, width: 26, textAlign: 'right' }}>[{i + 1}]</div>
            <div style={{ flex: 1 }}><TextField value={r} onValue={v => setRefs(refs.map((x, j) => (j === i ? v : x)))} track={track} maxLength={300} placeholder="Author or organisation, “Title,” website or publisher, year." ariaLabel={`Reference ${i + 1}`} /></div>
            {refs.length > 1 && <SmallButton danger onClick={() => setRefs(refs.filter((_, j) => j !== i))} title="Remove">✕</SmallButton>}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
          {refs.length < 15 && <SmallButton onClick={() => setRefs([...refs, ''])}>+ Add a reference</SmallButton>}
          {SUGGESTED_REFS.filter(s => !refs.includes(s)).slice(0, 2).map(s => (
            <SmallButton key={s} onClick={() => setRefs([...refs.filter(filled), s])}>+ {s.split(',')[0]}</SmallButton>
          ))}
        </div>
      </Block>

      <Block>
        <Question hint="Optional. A few lines thanking the people who helped you.">Acknowledgement</Question>
        <TextField value={draft.ack} onValue={v => edit(d => ({ ...d, ack: v }))} track={track} multiline rows={3} maxLength={700} ariaLabel="Acknowledgement" />
      </Block>

      <Block>
        <Question>Your Foothold e-Lab certificate</Question>
        <div style={{ color: D.inkSoft, fontSize: 13.5, lineHeight: 1.6, background: D.bgDeep, border: `1px solid ${D.borderSoft}`, borderRadius: 8, padding: '10px 14px' }}>
          {cert.state === 'loading' && 'Checking your e-Lab Record…'}
          {cert.state === 'failed' && 'Couldn’t check your e-Lab Record right now. It is checked again when you download.'}
          {cert.state === 'ready' && (cert.status.eligible
            ? 'All ten experiments, all five mini-project checkpoints and your feedback are done. Your report will include your certificate of completion.'
            : `You have completed ${cert.status.itemsDone} of the 15 e-Lab activities (${Math.round((cert.status.itemsDone / cert.status.itemsTotal) * 100)}%)${cert.status.feedbackDone ? '' : ', and the feedback is still pending'}. Your report will include a certificate of progress showing this. Finish more in Foothold before you download if you can.`)}
        </div>
      </Block>

      <Block>
        <Question>Before you download</Question>
        <div style={{ color: D.inkSoft, fontSize: 13.5, lineHeight: 1.6 }}>
          Concepts used: <b style={{ color: D.ink }}>{usedCount(draft)} of {CONCEPTS.length}</b>
          {notUsed.length > 0 && <> · not used: {notUsed.map(c => CONCEPT[c.id].label).join(', ')}. That’s fine; your report lists them.</>}
        </div>
        {missing.length + ownMissing.length === 0 ? (
          <div style={{ color: D.green, fontSize: 13.5, marginTop: 8 }}>✓ Everything is filled in.</div>
        ) : (
          <ul style={{ margin: '8px 0 0', paddingLeft: 20, color: D.amberSoft, fontSize: 13.5, lineHeight: 1.7 }}>
            {missing.map(m => (
              <li key={m.step.id}>
                <button type="button" onClick={() => goTo(m.step.id)} style={{ background: 'none', border: 'none', color: D.blue, cursor: 'pointer', padding: 0, fontSize: 13.5, fontFamily: FONT }}>{m.step.label}</button>: {m.items.join(' ')}
              </li>
            ))}
            {ownMissing.map(t => <li key={t}>{t}</li>)}
          </ul>
        )}
      </Block>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button type="button" onClick={() => onDownload(missing.length + ownMissing.length > 0)} disabled={!!downloading} style={{
          background: D.amber, color: '#111A2E', border: 'none', borderRadius: 8, padding: '12px 22px', fontSize: 15, fontWeight: 700,
          cursor: downloading ? 'wait' : 'pointer', fontFamily: FONT,
        }}>{downloading ? downloading : '⬇ Download report (PDF)'}</button>
        <div style={{ color: D.inkMuted, fontSize: 12.5, maxWidth: 420, lineHeight: 1.5 }}>You can download as often as you like. Each download uses your latest saved work.</div>
      </div>
      {downloadError && <div style={{ color: D.red, fontSize: 13, marginTop: 10 }}>{downloadError}</div>}
    </>
  );
}
