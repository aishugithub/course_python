import { useRef } from 'react';
import { DARK as D, FONT, MONO } from '../brand.js';
import { codeStats, newFile } from './reportModel.js';

// ── Shared form pieces ──────────────────────────────────────────────────────

export function Question({ children, hint }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ color: D.ink, fontSize: 15.5, fontWeight: 600 }}>{children}</div>
      {hint && <div style={{ color: D.inkMuted, fontSize: 13, marginTop: 3, lineHeight: 1.55 }}>{hint}</div>}
    </div>
  );
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box', background: D.bgDeep, color: D.ink,
  border: `1px solid ${D.border}`, borderRadius: 8, padding: '10px 12px',
  fontSize: 14.5, fontFamily: FONT, lineHeight: 1.5, outline: 'none',
};

// A text box that also counts typed vs pasted characters (for the viva sheet).
export function TextField({ value, onValue, track, multiline = false, rows = 3, placeholder, maxLength = 2000, ariaLabel }) {
  const pendingPaste = useRef(0);
  function handleChange(e) {
    const next = e.target.value;
    const grew = Math.max(0, next.length - (value || '').length);
    const pasted = Math.min(grew, pendingPaste.current);
    pendingPaste.current = 0;
    if (track && grew) track(grew - pasted, pasted);
    onValue(next);
  }
  const common = {
    value: value || '', onChange: handleChange, placeholder, maxLength, 'aria-label': ariaLabel,
    onPaste: (e) => { pendingPaste.current = (e.clipboardData?.getData('text') || '').length; },
    className: 'rb-input', style: inputStyle,
  };
  return multiline ? <textarea rows={rows} {...common} style={{ ...inputStyle, resize: 'vertical' }} /> : <input type="text" {...common} />;
}

export function Chips({ options, value, onPick }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '6px 0 8px' }}>
      {options.map(o => {
        const on = String(value || '').toLowerCase() === o.toLowerCase();
        return (
          <button key={o} type="button" onClick={() => onPick(o)} className="rb-chip" style={{
            background: on ? 'rgba(231,161,62,0.16)' : 'transparent', color: on ? D.amberSoft : D.inkSoft,
            border: `1px solid ${on ? D.amber : D.border}`, borderRadius: 999, padding: '5px 12px',
            fontSize: 13, cursor: 'pointer', fontFamily: FONT,
          }}>{o}</button>
        );
      })}
    </div>
  );
}

export function SmallButton({ onClick, children, danger, disabled, title }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title} className="rb-small" style={{
      background: 'transparent', color: danger ? D.red : D.inkSoft, border: `1px solid ${D.border}`,
      borderRadius: 8, padding: '6px 12px', fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: FONT, opacity: disabled ? 0.5 : 1,
    }}>{children}</button>
  );
}

const Block = ({ children }) => <div style={{ marginBottom: 26 }}>{children}</div>;

// ── Step 1: title ───────────────────────────────────────────────────────────

export function TitleStep({ draft, edit, track, student, details }) {
  const rows = [
    ['Name', student.name],
    ['Register number', student.rollNo],
    ['Batch', student.batch],
    ['Academic year', details.academicYear],
    ['Faculty in-charge', details.faculty],
  ];
  return (
    <>
      <Block>
        <Question hint="Give it a short name and say what it does, e.g. “VitalCheck: a ward vitals monitor that flags abnormal readings”.">
          What is your project called?
        </Question>
        <TextField value={draft.title} onValue={v => edit(d => ({ ...d, title: v }))} track={track} maxLength={140}
          placeholder="Project title" ariaLabel="Project title" />
      </Block>
      <Block>
        <Question hint="These come from your Foothold account and the course settings, so you don’t type them.">
          On your cover page
        </Question>
        <div style={{ background: D.bgDeep, border: `1px solid ${D.borderSoft}`, borderRadius: 10, padding: '6px 14px' }}>
          {rows.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: 12, padding: '7px 0', borderBottom: `1px solid ${D.borderSoft}`, fontSize: 14 }}>
              <div style={{ color: D.inkMuted, width: 150, flexShrink: 0 }}>{k}</div>
              <div style={{ color: v ? D.ink : D.inkMuted }}>{v || 'set by your faculty'}</div>
            </div>
          ))}
        </div>
      </Block>
    </>
  );
}

// ── Step 2: the problem ─────────────────────────────────────────────────────

const USERS = ['Nurse', 'Doctor', 'Pharmacist', 'Lab technician', 'Patient', 'Receptionist', 'Health-camp volunteer'];
const PLACES = ['Hospital ward', 'OPD', 'Pharmacy', 'Laboratory', 'Health camp', 'Home'];

export function ProblemStep({ draft, edit, track }) {
  const p = draft.problem;
  const setP = (patch) => edit(d => ({ ...d, problem: { ...d.problem, ...patch } }));
  const setItem = (i, patch) => setP({ items: p.items.map((it, j) => (j === i ? { ...it, ...patch } : it)) });
  return (
    <>
      <Block>
        <Question hint="Pick one or type your own.">Who will use your program?</Question>
        <Chips options={USERS} value={p.users} onPick={v => setP({ users: v })} />
        <TextField value={p.users} onValue={v => setP({ users: v })} track={track} maxLength={120} placeholder="e.g. Ward nurse" ariaLabel="Who will use it" />
      </Block>
      <Block>
        <Question hint="Pick one or type your own.">Where will they use it?</Question>
        <Chips options={PLACES} value={p.place} onPick={v => setP({ place: v })} />
        <TextField value={p.place} onValue={v => setP({ place: v })} track={track} maxLength={120} placeholder="e.g. Hospital ward" ariaLabel="Where" />
      </Block>
      <Block>
        <Question hint="One is enough; add up to three. Say what goes wrong today, then how your program helps.">
          What problem does your program solve?
        </Question>
        {p.items.map((it, i) => (
          <div key={i} style={{ border: `1px solid ${D.borderSoft}`, borderRadius: 10, padding: 12, marginBottom: 10, background: D.bgDeep }}>
            <div style={{ color: D.inkMuted, fontSize: 12.5, marginBottom: 6, fontFamily: MONO }}>PROBLEM {i + 1}</div>
            <TextField value={it.problem} onValue={v => setItem(i, { problem: v })} track={track} multiline rows={2} maxLength={500}
              placeholder="What goes wrong today? e.g. Readings are written on paper, so a high temperature is noticed late."
              ariaLabel={`Problem ${i + 1}`} />
            <div style={{ height: 8 }} />
            <TextField value={it.fix} onValue={v => setItem(i, { fix: v })} track={track} multiline rows={2} maxLength={500}
              placeholder="How does your program help? e.g. It flags any temperature above 100.4 °F as soon as it is entered."
              ariaLabel={`How your program helps with problem ${i + 1}`} />
            {p.items.length > 1 && (
              <div style={{ marginTop: 8, textAlign: 'right' }}>
                <SmallButton danger onClick={() => setP({ items: p.items.filter((_, j) => j !== i) })}>Remove</SmallButton>
              </div>
            )}
          </div>
        ))}
        {p.items.length < 3 && <SmallButton onClick={() => setP({ items: [...p.items, { problem: '', fix: '' }] })}>+ Add another problem</SmallButton>}
      </Block>
      <Block>
        <Question hint="This becomes the opening of your report.">In one or two sentences, what does your program do?</Question>
        <TextField value={p.summary} onValue={v => setP({ summary: v })} track={track} multiline rows={3} maxLength={600}
          placeholder="e.g. VitalCheck lets a nurse record each patient's temperature and pulse, flags abnormal readings, and keeps every reading in a file."
          ariaLabel="What your program does" />
      </Block>
    </>
  );
}

// ── Step 3: objectives ──────────────────────────────────────────────────────

const OBJ_EXAMPLES = [
  'To store each patient’s readings using a class',
  'To save the readings in a file so they are not lost',
  'To show a friendly message instead of crashing on wrong input',
  'To show a chart of the readings',
];

export function ObjectivesStep({ draft, edit, track }) {
  const obj = draft.objectives;
  const setObj = (list) => edit(d => ({ ...d, objectives: list }));
  return (
    <Block>
      <Question hint="Two to five short lines. Each one should be something you can show working in your demo.">
        What are your project’s objectives?
      </Question>
      {obj.map((o, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <div style={{ color: D.inkMuted, fontFamily: MONO, fontSize: 13, width: 18, textAlign: 'right' }}>{i + 1}.</div>
          <div style={{ flex: 1 }}>
            <TextField value={o} onValue={v => setObj(obj.map((x, j) => (j === i ? v : x)))} track={track} maxLength={240}
              placeholder={OBJ_EXAMPLES[i % OBJ_EXAMPLES.length]} ariaLabel={`Objective ${i + 1}`} />
          </div>
          {obj.length > 2 && <SmallButton danger onClick={() => setObj(obj.filter((_, j) => j !== i))} title="Remove this objective">✕</SmallButton>}
        </div>
      ))}
      {obj.length < 5 && <SmallButton onClick={() => setObj([...obj, ''])}>+ Add an objective</SmallButton>}
    </Block>
  );
}

// ── Step 4: code ────────────────────────────────────────────────────────────

// A code box with line numbers that scroll with the text.
function CodeArea({ value, onValue, ariaLabel }) {
  const gutter = useRef(null);
  const lines = Math.max(1, (value || '').split('\n').length);
  return (
    <div style={{ display: 'flex', border: `1px solid ${D.border}`, borderRadius: 8, background: D.bgDeep, overflow: 'hidden' }}>
      <pre ref={gutter} aria-hidden="true" style={{
        margin: 0, padding: '10px 8px', minWidth: 34, textAlign: 'right', color: D.inkMuted, fontFamily: MONO,
        fontSize: 13, lineHeight: '20px', overflow: 'hidden', userSelect: 'none', background: D.surface,
        borderRight: `1px solid ${D.borderSoft}`, height: 320, boxSizing: 'border-box',
      }}>{Array.from({ length: lines }, (_, i) => i + 1).join('\n')}</pre>
      <textarea
        value={value || ''} onChange={e => onValue(e.target.value)} aria-label={ariaLabel}
        onScroll={e => { if (gutter.current) gutter.current.scrollTop = e.target.scrollTop; }}
        onKeyDown={e => {
          if (e.key !== 'Tab') return;
          e.preventDefault();
          const t = e.target, s = t.selectionStart, end = t.selectionEnd;
          const next = t.value.slice(0, s) + '    ' + t.value.slice(end);
          onValue(next);
          requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 4; });
        }}
        spellCheck={false} wrap="off" placeholder="# paste your code here"
        style={{
          flex: 1, margin: 0, padding: 10, border: 'none', outline: 'none', resize: 'none', height: 320,
          boxSizing: 'border-box', background: 'transparent', color: D.ink, fontFamily: MONO, fontSize: 13,
          lineHeight: '20px', whiteSpace: 'pre', overflow: 'auto',
        }}
      />
    </div>
  );
}

export function CodeStep({ draft, edit }) {
  const files = draft.files;
  const setFiles = (list) => edit(d => ({ ...d, files: list }));
  const setFile = (i, patch) => setFiles(files.map((f, j) => (j === i ? { ...f, ...patch } : f)));
  const stats = codeStats(files);
  function remove(i) {
    if (files[i].code.trim() && !window.confirm(`Remove “${files[i].name || 'this file'}” and its code?`)) return;
    setFiles(files.filter((_, j) => j !== i));
  }
  return (
    <>
      <Block>
        <Question hint="Paste every part of your program: each .py file, or each Colab code cell, in its own box. In the next step you will point out where each Python concept is in this code, so paste your final, working version.">
          Paste your program
        </Question>
        <div style={{ color: D.inkMuted, fontSize: 13, lineHeight: 1.6, background: D.bgDeep, border: `1px solid ${D.borderSoft}`, borderRadius: 8, padding: '8px 12px' }}>
          Colab lines that start with <code style={{ color: D.amberSoft }}>!</code> or <code style={{ color: D.amberSoft }}>%</code> (like <code style={{ color: D.amberSoft }}>!pip install</code>) are fine to include.
          If you change your code after the next step, re-check your highlighted lines.
        </div>
      </Block>
      {files.map((f, i) => (
        <Block key={i}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
            <div style={{ color: D.inkMuted, fontFamily: MONO, fontSize: 12.5 }}>FILE {i + 1}</div>
            <input value={f.name} onChange={e => setFile(i, { name: e.target.value.slice(0, 60) })} aria-label={`Name of file ${i + 1}`}
              className="rb-input" placeholder="main.py or Cell 1"
              style={{ ...inputStyle, width: 220, padding: '6px 10px', fontFamily: MONO, fontSize: 13 }} />
            <div style={{ flex: 1 }} />
            {files.length > 1 && <SmallButton danger onClick={() => remove(i)}>Remove</SmallButton>}
          </div>
          <CodeArea value={f.code} onValue={v => setFile(i, { code: v })} ariaLabel={`Code of ${f.name || `file ${i + 1}`}`} />
        </Block>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        {files.length < 12 && (
          <SmallButton onClick={() => setFiles([...files, newFile(`file${files.length + 1}.py`)])}>+ Add another file or cell</SmallButton>
        )}
        <div style={{ color: D.inkMuted, fontSize: 13 }}>
          {stats.lines} line{stats.lines === 1 ? '' : 's'} in {stats.files} file{stats.files === 1 ? '' : 's'}
        </div>
      </div>
    </>
  );
}
