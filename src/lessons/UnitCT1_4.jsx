import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: The Need — one loop can't draw a shape ────────────────────────
function TheNeed() {
  const [rows, setRows] = useState(4);
  const tri = Array.from({ length: rows }, (_, i) => "★".repeat(i + 1));

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A single loop draws a straight line — one thing per round. But a{" "}
        <strong style={{ color: C.text }}>shape</strong> has two directions: which <em>row</em> you're on, and how
        many <em>stars</em> that row needs. Two directions → a loop <strong style={{ color: C.teal }}>inside</strong>{" "}
        a loop (you met nested loops in Unit 6.3). Drag to see the triangle grow.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>rows = <strong style={{ color: C.accent }}>{rows}</strong></label>
        <input type="range" min={1} max={8} value={rows} onChange={(e) => setRows(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ ONE LOOP</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`for i in range(${rows}):\n    print("★")`}</pre>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: C.red, marginTop: 10, lineHeight: 1.5 }}>
            {Array.from({ length: rows }, (_, i) => <div key={i}>★</div>)}
          </div>
          <div style={{ color: C.red, fontSize: 11, marginTop: 8 }}>Same width every row — a column, not a triangle.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ LOOP INSIDE A LOOP</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`for i in range(1, ${rows + 1}):\n    for j in range(i):\n        print("★", end="")\n    print()`}</pre>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: C.green, marginTop: 10, lineHeight: 1.5 }}>
            {tri.map((t, i) => <div key={i}>{t}</div>)}
          </div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>Row i gets i stars — the width follows the row.</div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Outer loop = rows, inner loop = what's in each row.</strong> The
        inner loop's length depends on the outer variable (<code style={{ color: C.purple }}>range(i)</code>) — that
        link is what makes shapes possible.
      </div>
    </div>
  );
}

// ── Section 2: Anatomy — the nested structure + end="" ───────────────────────
function NestedAnatomy() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Think of a clock. The <span style={{ color: C.teal }}>outer</span> loop is the hour hand; for each of its
        ticks, the <span style={{ color: C.purple }}>inner</span> loop (the minute hand) runs a full round. One new
        tool here: <code style={{ color: C.orange }}>end=""</code>.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, fontFamily: "monospace", fontSize: 12.5, lineHeight: 2, whiteSpace: "pre" }}>
        for i in range(1, rows + 1):{"     "}<span style={{ color: C.teal }}># OUTER: one row at a time</span>{"\n"}
        {"    "}for j in range(i):{"        "}<span style={{ color: C.purple }}># INNER: i stars for this row</span>{"\n"}
        {"        "}print("★", <span style={{ color: C.orange }}>end=""</span>){"   "}<span style={{ color: C.muted }}># stay on the same line</span>{"\n"}
        {"    "}print(){"                "}<span style={{ color: C.muted }}># end the row → new line</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>print("★")  — the default</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>Adds a newline after each ★, so they stack vertically. Not what we want inside a row.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>print("★", end="")</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>Ends with nothing instead of a newline → stars sit side by side. A bare print() then breaks to the next row.</div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>The inner loop finishes completely for every single outer step.</strong>{" "}
        Row 1: inner runs once. Row 2: inner runs twice. That's why row i has exactly i stars.
      </div>
    </div>
  );
}

// ── Section 3: See It — build the triangle row by row ────────────────────────
const STAR_STEPS = (() => {
  const rows = 4;
  const steps = [];
  const lines = Array.from({ length: rows }, () => "");
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= i; j++) {
      lines[i - 1] += "★";
      steps.push({ i, j, snap: [...lines], newline: false, desc: `Row ${i}, inner star ${j} of ${i}. print("★", end="") keeps it on the line.` });
    }
    steps.push({ i, j: "—", snap: [...lines], newline: true, desc: i < rows ? `Row ${i} full → print() breaks to row ${i + 1}. The outer loop ticks.` : `Row ${i} full → the triangle is complete.` });
  }
  return steps;
})();

function StarStepper() {
  const [step, setStep] = useState(0);
  const s = STAR_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Step through and watch the two counters. <span style={{ color: C.teal }}>i</span> (the row) only moves when
        the <span style={{ color: C.purple }}>inner</span> loop has finished a whole row.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(STAR_STEPS.length - 1, x + 1))} disabled={step === STAR_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === STAR_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === STAR_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === STAR_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {STAR_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 12 }}>
        <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 18, minHeight: 150 }}>
          {s.snap.map((line, i) => (
            <div key={i} style={{
              color: i === s.i - 1 ? C.accent : C.green,
              background: i === s.i - 1 && !s.newline ? C.accent + "14" : "transparent",
              borderRadius: 4, minHeight: 24, letterSpacing: 3,
            }}>{line || " "}</div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `2px solid ${C.teal}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.teal, fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>OUTER · i (row)</div>
            <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{s.i}</div>
          </div>
          <div style={{ background: C.card, border: `2px solid ${C.purple}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.purple, fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>INNER · star #</div>
            <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{s.j}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Inner finishes, then outer ticks.</strong> Like a clock: the minute
        hand sweeps a full circle for every single hour tick. Every nested-loop pattern is this rhythm.
      </div>
    </div>
  );
}

// ── Section 4: Build It — the Pattern Toolkit ────────────────────────────────
function PatternToolkit() {
  const [rows, setRows] = useState(5);
  const [mode, setMode] = useState("star");

  const starOut = Array.from({ length: rows }, (_, i) => "★".repeat(i + 1)).join("\n");
  const numOut = Array.from({ length: rows }, (_, i) => Array.from({ length: i + 1 }, (_, j) => j + 1).join(" ")).join("\n");
  const floydOut = (() => {
    let num = 1; const lines = [];
    for (let i = 1; i <= rows; i++) { const r = []; for (let j = 0; j < i; j++) { r.push(num); num++; } lines.push(r.join(" ")); }
    return lines.join("\n");
  })();
  const primesOut = (() => {
    const limit = rows * 4;
    const out = [];
    for (let n = 2; n <= limit; n++) { let p = true; for (let i = 2; i < n; i++) if (n % i === 0) { p = false; break; } if (p) out.push(n); }
    return out.join(" ");
  })();

  const modes = {
    star: {
      label: "★ Triangle", color: C.green, out: starOut,
      code: `for i in range(1, ${rows + 1}):\n    for j in range(i):\n        print("★", end="")\n    print()`,
      note: "Row i → i stars. The classic nested-loop shape.",
    },
    number: {
      label: "1 2 3", color: C.teal, out: numOut,
      code: `for i in range(1, ${rows + 1}):\n    for j in range(1, i + 1):\n        print(j, end=" ")\n    print()`,
      note: "Same skeleton — just print the inner counter j instead of a star.",
    },
    floyd: {
      label: "Floyd's", color: C.purple, out: floydOut,
      code: `num = 1\nfor i in range(1, ${rows + 1}):\n    for j in range(i):\n        print(num, end=" ")\n        num = num + 1\n    print()`,
      note: "An accumulator (num) that keeps counting ACROSS rows — never resets.",
    },
    primes: {
      label: "Primes", color: C.orange, out: primesOut,
      code: `for n in range(2, ${rows * 4 + 1}):\n    is_prime = True\n    for i in range(2, n):\n        if n % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(n, end=" ")`,
      note: "Nested loops aren't only for shapes! Outer picks a number, inner runs Unit 3's prime flag.",
    },
  };
  const m = modes[mode];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Four classics, one skeleton. Notice how little changes between the triangles — and how the very same nested
        loop, with a flag inside, hunts for primes instead of drawing shapes.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(modes).map(([k, mv]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, minWidth: 90, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: mode === k ? mv.color + "22" : C.card,
            border: `1.5px solid ${mode === k ? mv.color : C.border}`, color: mode === k ? mv.color : C.muted,
          }}>{mv.label}</button>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>rows = <strong style={{ color: m.color }}>{rows}</strong></label>
        <input type="range" min={2} max={8} value={rows} onChange={(e) => setRows(Number(e.target.value))} style={{ width: "100%", accentColor: m.color }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }}>
        <pre style={{ background: C.card, border: `1px solid ${m.color}55`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 11.5, color: C.text, lineHeight: 1.75, margin: 0, whiteSpace: "pre" }}>{m.code}</pre>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, minHeight: 90 }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 8 }}>OUTPUT</div>
            <pre style={{ fontFamily: "monospace", fontSize: mode === "star" ? 15 : 13, color: m.color, margin: 0, lineHeight: 1.5, whiteSpace: "pre-wrap", letterSpacing: mode === "star" ? 2 : 0 }}>{m.out}</pre>
          </div>
          <div style={{ background: m.color + "14", border: `1px solid ${m.color}44`, borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>
            {m.note}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>One nesting, endless programs.</strong> Change what the inner loop
        prints and you've changed the whole program. Pascal's triangle, diamonds, hollow squares — all just
        variations on "outer row, inner content."
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "In a nested loop drawing a triangle, what does the OUTER loop control?",
      options: ["The stars in a row", "Which row you're on", "The end=\"\" setting", "Nothing — only the inner loop matters"],
      answer: 1,
      explain: "Outer = rows, inner = what fills each row. The inner loop runs completely for every single tick of the outer loop.",
    },
    {
      q: "Why use print(\"★\", end=\"\") instead of print(\"★\") inside the inner loop?",
      options: [
        "It makes the stars bigger",
        "end=\"\" stops print adding a newline, so the stars stay on the same line side by side",
        "It's required for nested loops",
        "It counts the stars",
      ],
      answer: 1,
      explain: "By default print jumps to a new line. end=\"\" replaces that newline with nothing, so a row builds across. A bare print() afterwards ends the row.",
    },
    {
      q: "For row i, how many stars does  for j in range(i)  print?",
      options: ["Always 1", "i stars", "i + 1 stars", "rows stars"],
      answer: 1,
      explain: "range(i) produces i values (0..i-1), so the inner loop runs i times → i stars. Row 1 gets 1, row 2 gets 2, and so on.",
    },
    {
      q: "How is 'print all primes up to n' also a nested-loop program?",
      options: [
        "It isn't — it uses one loop",
        "Outer loop picks each number; inner loop checks its divisors with a flag (Unit 3)",
        "It draws a triangle of primes",
        "It reverses each number",
      ],
      answer: 1,
      explain: "The outer loop walks the range; for each number the inner loop runs the prime flag-check. Same nested structure as the triangles — the inner loop just decides instead of drawing.",
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
          {score === 4 ? "Nested loops are yours — shapes, tables, and prime hunts all fall out of one idea." :
            score >= 2 ? "Good — replay the Star Stepper to feel 'inner finishes, then outer ticks'." :
              "Revisit The Need and the Star Stepper, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 4 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can nest loops to draw shapes, print tables, and scan ranges.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 5 — Crack It Yourself.</strong>{" "}
            A capstone: take a brand-new problem and walk the four moves from blank page to working code.
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
export default function UnitCT1_4({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "anatomy", label: "Nested Loops" },
    { id: "see", label: "Star Stepper" },
    { id: "build", label: "Pattern Toolkit" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Drawing a Shape Needs Two Loops</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Nested Structure &amp; end=""</h3><NestedAnatomy /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>See It: Build the Triangle</h3><StarStepper /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build It: The Pattern Toolkit</h3><PatternToolkit /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on nested loops and patterns.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING I › UNIT 4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Patterns &amp; Nested Loops</div>
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
