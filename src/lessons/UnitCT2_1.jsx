import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const MARKS = [23, 67, 12, 89, 45];

// ── Section 1: The Need — one answer out of many values ──────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        In CT Set 1 you looped over <em>numbers you generated</em> (1, 2, 3…). Now you have a{" "}
        <strong style={{ color: C.text }}>list</strong> of real values — and you often need a single answer out of
        the whole pile: the highest, the total, the average, how many pass.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <pre style={{ fontFamily: "monospace", fontSize: 13, color: C.accent, margin: 0 }}>marks = [23, 67, 12, 89, 45]</pre>
        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          {MARKS.map((m, i) => (
            <div key={i} style={{ minWidth: 44, textAlign: "center", background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 6px" }}>
              <div style={{ color: C.text, fontFamily: "monospace", fontSize: 16, fontWeight: 700 }}>{m}</div>
              <div style={{ color: C.muted, fontSize: 9 }}>[{i}]</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>❌ Eyeballing it</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>Fine for 5 marks. Hopeless for 500. And a computer can't "just look."</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>✅ One pass, one memory box</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>Walk the list once, keeping a single "answer so far" that updates as you go.</div>
        </div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Every question here is the same shape:</strong> keep one box (the
        best-so-far or the accumulator), touch each item once, update the box. Only the update rule changes.
      </div>
    </div>
  );
}

// ── Section 2: The Single Pass — anatomy of best-so-far ──────────────────────
function SinglePass() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Finding the largest is the "best-so-far" pattern from Unit 7.3, made general. Three beats:{" "}
        <strong style={{ color: C.teal }}>seed</strong> before the loop,{" "}
        <strong style={{ color: C.orange }}>challenge</strong> each item,{" "}
        <strong style={{ color: C.green }}>read</strong> after.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, fontFamily: "monospace", fontSize: 12.5, lineHeight: 2, whiteSpace: "pre" }}>
        marks = [23, 67, 12, 89, 45]{"\n"}
        <span style={{ color: C.teal }}>biggest = marks[0]</span>{"        # SEED with a real value, not 0\n"}
        for m in marks:{"\n"}
        {"    "}<span style={{ color: C.orange }}>if m &gt; biggest:</span>{"       # CHALLENGE: does this beat the champ?\n"}
        {"        "}biggest = m{"\n"}
        <span style={{ color: C.green }}>print(biggest)</span>{"           # READ the winner after the pass"}
      </div>

      <div style={{ background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "12px 16px", fontSize: 12.5, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>
        ⚠️ <strong style={{ color: C.red }}>Why seed with marks[0], not 0?</strong> If every mark were negative
        (say a list of temperature drops), starting <code style={{ color: C.red }}>biggest = 0</code> would wrongly
        report 0 as the max — no real value ever beats it. Seeding with the first actual element is always safe.
      </div>

      <div style={{ background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>Smallest is the same code with <code>&lt;</code> instead of <code>&gt;</code>.</strong>{" "}
        Sum and average swap the champion for a running total. One skeleton, four programs.
      </div>
    </div>
  );
}

// ── Section 3: See It — step through finding the largest ─────────────────────
const SCAN_STEPS = (() => {
  const steps = [];
  let biggest = MARKS[0];
  steps.push({ i: 0, biggest, changed: true, desc: `Seed: biggest = marks[0] = ${MARKS[0]}.` });
  for (let i = 0; i < MARKS.length; i++) {
    const m = MARKS[i];
    const beats = m > biggest;
    if (beats) biggest = m;
    steps.push({
      i, biggest, cur: m, changed: beats,
      desc: beats
        ? `m = ${m} beats the champ → biggest becomes ${m}.`
        : `m = ${m} does not beat ${biggest} → biggest stays ${biggest}.`,
    });
  }
  steps.push({ i: MARKS.length, biggest, done: true, desc: `Pass complete. print(biggest) → ${biggest}.` });
  return steps;
})();

function ScanStepper() {
  const [step, setStep] = useState(0);
  const s = SCAN_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Step through the pass over <code style={{ color: C.accent }}>[23, 67, 12, 89, 45]</code>. The highlighted
        cell is the item being challenged; the box on the right is the champion so far.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(SCAN_STEPS.length - 1, x + 1))} disabled={step === SCAN_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === SCAN_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === SCAN_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === SCAN_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {SCAN_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {MARKS.map((m, i) => {
          const active = !s.done && step > 0 && i === s.i;
          return (
            <div key={i} style={{
              minWidth: 46, textAlign: "center", borderRadius: 8, padding: "8px 6px",
              background: active ? C.accent + "22" : C.card,
              border: `1.5px solid ${active ? C.accent : C.border}`,
            }}>
              <div style={{ color: active ? C.accent : C.text, fontFamily: "monospace", fontSize: 16, fontWeight: 700 }}>{m}</div>
              <div style={{ color: C.muted, fontSize: 9 }}>[{i}]</div>
            </div>
          );
        })}
        <div style={{ marginLeft: "auto", background: C.card, border: `2px solid ${s.changed ? C.green : C.teal}`, borderRadius: 10, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ color: s.changed ? C.green : C.teal, fontSize: 10, letterSpacing: 1 }}>biggest</div>
          <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{s.biggest}</div>
        </div>
      </div>

      <div style={{ background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>The champion only changes when it's genuinely beaten.</strong> After
        one full pass, whatever's left in the box is the true maximum — guaranteed.
      </div>
    </div>
  );
}

// ── Section 4: Toolkit — one list, five summaries ────────────────────────────
function ScanToolkit() {
  const [mode, setMode] = useState("max");
  const sum = MARKS.reduce((a, b) => a + b, 0);

  const modes = {
    max: {
      label: "Largest", color: C.green, out: Math.max(...MARKS),
      code: "biggest = marks[0]\nfor m in marks:\n    if m > biggest:\n        biggest = m\nprint(biggest)",
      note: "Seed with the first item, keep the bigger one.",
    },
    min: {
      label: "Smallest", color: C.teal, out: Math.min(...MARKS),
      code: "smallest = marks[0]\nfor m in marks:\n    if m < smallest:\n        smallest = m\nprint(smallest)",
      note: "Exact same shape — just flip > to <.",
    },
    sum: {
      label: "Sum", color: C.purple, out: sum,
      code: "total = 0\nfor m in marks:\n    total = total + m\nprint(total)",
      note: "An accumulator (Unit 1) walking a list instead of a range.",
    },
    avg: {
      label: "Average", color: C.orange, out: (sum / MARKS.length).toFixed(1),
      code: "total = 0\nfor m in marks:\n    total = total + m\nprint(total / len(marks))",
      note: "Sum first, then divide by len(marks) — how many items there are.",
    },
    count: {
      label: "Count > 50", color: C.yellow, out: MARKS.filter((m) => m > 50).length,
      code: "passed = 0\nfor m in marks:\n    if m > 50:\n        passed = passed + 1\nprint(passed)",
      note: "A conditional accumulator: only count up when the test passes.",
    },
  };
  const m = modes[mode];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Same list, same one-pass skeleton — five different questions. Notice how little the code changes.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(modes).map(([k, mv]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, minWidth: 80, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: mode === k ? mv.color + "22" : C.card,
            border: `1.5px solid ${mode === k ? mv.color : C.border}`, color: mode === k ? mv.color : C.muted,
          }}>{mv.label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14 }}>
        <pre style={{ background: C.card, border: `1px solid ${m.color}55`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 11.5, color: C.text, lineHeight: 1.75, margin: 0, whiteSpace: "pre" }}>{m.code}</pre>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 8 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 700, color: m.color }}>{m.out}</div>
          </div>
          <div style={{ background: m.color + "14", border: `1px solid ${m.color}44`, borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>
            {m.note}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Learn the pattern, not five programs.</strong> "Walk once, keep one
        box, update by a rule" solves a huge family of list questions — and it's the backbone of search and sort,
        coming next.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "Why seed  biggest = marks[0]  instead of  biggest = 0  when finding the maximum?",
      options: [
        "It runs faster",
        "If all values are negative, 0 would wrongly win — a real element is always a safe start",
        "marks[0] is always the largest",
        "0 isn't allowed in Python",
      ],
      answer: 1,
      explain: "Seeding with 0 assumes some value beats 0. For an all-negative list nothing does, so 0 is reported falsely. marks[0] is a real member, so it's always beatable-or-correct.",
    },
    {
      q: "To find the SMALLEST instead of the largest, what changes?",
      options: ["Nothing", "Flip the comparison from > to <", "Use range() instead of the list", "Start total at 1"],
      answer: 1,
      explain: "Best-so-far is symmetric: keep the smaller value by testing  if m < smallest. Same seed, same loop, opposite comparison.",
    },
    {
      q: "For the average, why is  total / len(marks)  written AFTER the loop?",
      options: [
        "You must finish summing everything before you can divide",
        "len() only works after a loop",
        "It's a style choice",
        "Averages can't be printed inside loops",
      ],
      answer: 0,
      explain: "The average needs the complete total and the item count. Dividing mid-loop would use a partial sum. Accumulate fully, then compute once.",
    },
    {
      q: "What do largest, sum, and 'count above 50' all have in common?",
      options: [
        "They need two loops",
        "One pass over the list, one box that updates by a rule",
        "They only work on marks",
        "They require sorting first",
      ],
      answer: 1,
      explain: "All three are single-pass reductions: touch each item once and fold it into one running value. Only the update rule differs.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[current].answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (current < questions.length - 1) { setCurrent((c) => c + 1); setSelected(null); }
    else { setDone(true); onComplete && onComplete(); }
  };

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{score >= 3 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {score} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {score === 4 ? "You can reduce any list to a single answer in one pass." :
            score >= 2 ? "Good — replay the Scan Stepper to lock in best-so-far." :
              "Revisit The Single Pass and the Stepper, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 CT II · Unit 1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can scan a list down to one number: max, min, sum, average, count.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 2 — Searching.</strong> When the question isn't "what's
            the biggest?" but "is it in here, and where?" — linear search, then the much faster binary search.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16, whiteSpace: "pre-wrap" }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((opt, i) => {
          let bg = C.card, border = C.border, col = C.text;
          if (selected !== null) {
            if (i === q.answer) { bg = C.green + "22"; border = C.green; col = C.green; }
            else if (i === selected) { bg = C.red + "22"; border = C.red; col = C.red; }
          }
          return (
            <button key={i} onClick={() => choose(i)} style={{
              textAlign: "left", padding: "10px 14px", borderRadius: 8,
              background: bg, border: `1.5px solid ${border}`, color: col,
              cursor: selected !== null ? "default" : "pointer", fontSize: 13, transition: "all 0.25s",
            }}>
              {i === q.answer && selected !== null ? "✓ " : i === selected && selected !== q.answer ? "✗ " : ""}{opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: C.purple + "18", border: `1px solid ${C.purple}44`, color: C.muted, fontSize: 13 }}>
          💡 {q.explain}
        </div>
      )}
      {selected !== null && (
        <button onClick={next} style={{
          marginTop: 14, padding: "10px 24px", borderRadius: 8,
          background: C.accentGlow, border: "none", color: "#fff",
          fontWeight: 600, cursor: "pointer", fontSize: 14,
        }}>{current < questions.length - 1 ? "Next Question →" : "See Results"}</button>
      )}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function UnitCT2_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "pass", label: "Single Pass" },
    { id: "see", label: "Scan Stepper" },
    { id: "toolkit", label: "Scan Toolkit" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>One Answer Out of Many</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Single Pass</h3><SinglePass /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>See It: Find the Largest</h3><ScanStepper /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Scan Toolkit</h3><ScanToolkit /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on scanning a list to one answer.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING II › UNIT 1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Scanning a List</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{completed.length} / {sections.length} done</div>
      </div>

      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(completed.length / sections.length) * 100}%`, background: C.green, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => setActiveSection(i)} style={{
              flex: 1, minWidth: 80, padding: "8px 6px", borderRadius: 7,
              background: activeSection === i ? C.accentGlow : "transparent",
              border: "none", color: activeSection === i ? "#fff" : C.muted,
              cursor: "pointer", fontSize: 11, fontWeight: activeSection === i ? 600 : 400,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              transition: "all 0.2s",
            }}>
              {completed.includes(i) && <span style={{ color: C.green }}>✓</span>}
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
          {content[activeSection]}
        </div>

        {activeSection < sections.length - 1 && (
          <button onClick={goNext} style={{
            marginTop: 16, width: "100%", padding: "12px", borderRadius: 8,
            background: C.accentGlow, border: "none", color: "#fff",
            fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>Mark Complete & Continue →</button>
        )}
      </div>
    </div>
  );
}
