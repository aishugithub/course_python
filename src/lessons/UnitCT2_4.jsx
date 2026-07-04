import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// small grid renderer
function Grid({ m, hi, color = "#58A6FF", label }) {
  return (
    <div>
      {label && <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6, textAlign: "center" }}>{label}</div>}
      <div style={{ display: "inline-block", background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 8, padding: 6 }}>
        {m.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 4, marginBottom: i < m.length - 1 ? 4 : 0 }}>
            {row.map((v, j) => {
              const on = hi && hi[0] === i && hi[1] === j;
              return (
                <div key={j} style={{
                  minWidth: 34, textAlign: "center", borderRadius: 6, padding: "6px 4px", fontFamily: "monospace", fontWeight: 700, fontSize: 14,
                  background: on ? color + "33" : C.card, border: `1.5px solid ${on ? color : C.border}`, color: on ? color : C.text,
                }}>{v}</div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section 1: The Need ──────────────────────────────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Not all data is a flat line. A class × subjects marksheet, a spreadsheet, a digital image, a seating plan —
        these are <strong style={{ color: C.text }}>grids</strong>: rows and columns. Python stores a grid as a{" "}
        <strong style={{ color: C.teal }}>list of lists</strong>.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <pre style={{ fontFamily: "monospace", fontSize: 12.5, color: C.accent, margin: "0 0 12px", lineHeight: 1.7, whiteSpace: "pre" }}>{`M = [[1, 2, 3],\n     [4, 5, 6]]`}</pre>
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <Grid m={[[1, 2, 3], [4, 5, 6]]} />
          <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.8 }}>
            <div><code style={{ color: C.teal }}>M[0]</code> is the first <strong>row</strong> → [1, 2, 3]</div>
            <div><code style={{ color: C.teal }}>M[0][2]</code> is row 0, column 2 → <strong style={{ color: C.text }}>3</strong></div>
            <div><code style={{ color: C.teal }}>M[1][0]</code> is row 1, column 0 → <strong style={{ color: C.text }}>4</strong></div>
          </div>
        </div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Two indices → two nested loops.</strong> A flat list needs one loop.
        A grid needs a loop over rows and, inside it, a loop over columns — exactly the nesting from CT-I.4.
      </div>
    </div>
  );
}

// ── Section 2: Anatomy — walking a grid ──────────────────────────────────────
function GridAnatomy() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        To touch every cell, the <span style={{ color: C.teal }}>outer</span> loop picks a row and the{" "}
        <span style={{ color: C.orange }}>inner</span> loop walks that row's columns. To <em>build</em> a new grid,
        start each row empty, append across, then append the finished row.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, fontFamily: "monospace", fontSize: 12, lineHeight: 1.95, whiteSpace: "pre" }}>
        rows = len(M){"          "}<span style={{ color: C.muted }}># how many rows</span>{"\n"}
        cols = len(M[0]){"       "}<span style={{ color: C.muted }}># width of a row</span>{"\n"}
        <span style={{ color: C.teal }}>for i in range(rows):</span>{"\n"}
        {"    "}<span style={{ color: C.orange }}>for j in range(cols):</span>{"\n"}
        {"        "}print(M[i][j]){"  "}<span style={{ color: C.muted }}># visit every cell once</span>
      </div>

      <div style={{ background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>len(M)</strong> counts rows; <strong style={{ color: C.orange }}>len(M[0])</strong>{" "}
        counts columns. Every grid algorithm — add, transpose, multiply — is this double loop with a different line
        in the middle.
      </div>
    </div>
  );
}

// ── Section 3: Transpose stepper ─────────────────────────────────────────────
const M0 = [[1, 2, 3], [4, 5, 6]];
const TR_STEPS = (() => {
  const rows = M0.length, cols = M0[0].length;
  const steps = [];
  const res = Array.from({ length: cols }, () => Array.from({ length: rows }, () => "·"));
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows; i++) {
      res[j][i] = M0[i][j];
      steps.push({ src: [i, j], dst: [j, i], snap: res.map((r) => [...r]), desc: `Read M[${i}][${j}] = ${M0[i][j]} → place at result[${j}][${i}]. Rows and columns swap.` });
    }
  }
  steps.push({ src: null, dst: null, snap: res.map((r) => [...r]), done: true, desc: "Transpose complete — the 2×3 became a 3×2. Row i, col j is now row j, col i." });
  return steps;
})();

function TransposeStepper() {
  const [step, setStep] = useState(0);
  const s = TR_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        <strong style={{ color: C.text }}>Transpose</strong> flips a grid over its diagonal: rows become columns.
        Watch each cell move from <code style={{ color: C.accent }}>M[i][j]</code> to{" "}
        <code style={{ color: C.green }}>result[j][i]</code>.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(TR_STEPS.length - 1, x + 1))} disabled={step === TR_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === TR_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === TR_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === TR_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {TR_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "flex", gap: 24, justifyContent: "center", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap" }}>
        <Grid m={M0} hi={s.src} color={C.accent} label="M (source)" />
        <div style={{ color: C.accent, fontSize: 22, alignSelf: "center" }}>→</div>
        <Grid m={s.snap} hi={s.dst} color={C.green} label="result (transpose)" />
      </div>

      <div style={{ background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.done ? "✅ " : ""}{s.desc}
      </div>
    </div>
  );
}

// ── Section 4: Matrix toolkit ────────────────────────────────────────────────
function MatrixToolkit() {
  const [mode, setMode] = useState("add");
  const A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]];
  const add = [[6, 8], [10, 12]];
  const trans = [[1, 3], [2, 4]];
  const mul = [[19, 22], [43, 50]];

  const modes = {
    add: {
      label: "Add", color: C.green, res: add,
      code: "result = []\nfor i in range(rows):\n    row = []\n    for j in range(cols):\n        row.append(A[i][j] + B[i][j])\n    result.append(row)",
      note: "Same shape in, same shape out — add matching cells.",
    },
    transpose: {
      label: "Transpose", color: C.teal, res: trans,
      code: "result = []\nfor j in range(cols):\n    newrow = []\n    for i in range(rows):\n        newrow.append(A[i][j])\n    result.append(newrow)",
      note: "Swap the loop order: walk columns outside, rows inside.",
    },
    multiply: {
      label: "Multiply", color: C.orange, res: mul,
      code: "result = []\nfor i in range(rows):\n    row = []\n    for j in range(cols):\n        s = 0\n        for k in range(cols):\n            s = s + A[i][k] * B[k][j]\n        row.append(s)\n    result.append(row)",
      note: "Three loops! For each output cell, an accumulator sums a row × a column.",
    },
  };
  const m = modes[mode];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Three grid operations on <code style={{ color: C.accent }}>A</code> and <code style={{ color: C.accent }}>B</code>.
        Same double-loop skeleton — the middle changes.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(modes).map(([k, mv]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, minWidth: 90, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
            background: mode === k ? mv.color + "22" : C.card,
            border: `1.5px solid ${mode === k ? mv.color : C.border}`, color: mode === k ? mv.color : C.muted,
          }}>{mv.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 14, justifyContent: "center", alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <Grid m={A} label="A" />
        {mode !== "transpose" && <Grid m={B} label="B" />}
        <div style={{ color: m.color, fontSize: 20 }}>=</div>
        <Grid m={m.res} color={m.color} label="result" hi={[-1, -1]} />
      </div>

      <pre style={{ background: "#0A0E14", border: `1px solid ${m.color}44`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 11.5, color: C.text, lineHeight: 1.8, margin: 0, whiteSpace: "pre" }}>{m.code}</pre>

      <div style={{ marginTop: 14, background: m.color + "14", border: `1px solid ${m.color}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
        {m.note}
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "For  M = [[1, 2, 3], [4, 5, 6]],  what is  M[1][2]?",
      options: ["2", "5", "6", "Error"],
      answer: 2,
      explain: "M[1] is the second row [4, 5, 6]; index [2] of that is 6. First index = row, second = column.",
    },
    {
      q: "Why does walking every cell of a grid need TWO nested loops?",
      options: [
        "To make it slower",
        "A cell has two coordinates (row and column), so you loop over rows and, inside, over columns",
        "Because lists need two loops",
        "One loop can't use range()",
      ],
      answer: 1,
      explain: "Each cell is addressed by (i, j). The outer loop fixes a row; the inner loop sweeps that row's columns — every (i, j) pair gets visited.",
    },
    {
      q: "What does transpose do to a 2×3 matrix?",
      options: ["Leaves it 2×3", "Makes it 3×2 — rows become columns", "Doubles every value", "Sorts each row"],
      answer: 1,
      explain: "Transpose sends element (i, j) to (j, i). A 2-row, 3-column grid becomes a 3-row, 2-column grid.",
    },
    {
      q: "Matrix multiplication uses THREE nested loops. What is the innermost one doing?",
      options: [
        "Printing",
        "Accumulating a sum of row×column products for one output cell",
        "Sorting the rows",
        "Transposing B",
      ],
      answer: 1,
      explain: "Each result cell is a dot product: the innermost loop is an accumulator summing A[i][k] * B[k][j] across k — the accumulator pattern, one level deeper.",
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
          {score === 4 ? "You can walk and build grids with nested loops." :
            score >= 2 ? "Good — replay the Transpose Stepper to lock in (i,j) → (j,i)." :
              "Revisit Grid Anatomy and the Transpose Stepper, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 CT II · Unit 4 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Grids are lists of lists, walked with two indices and two loops.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 5 — String Algorithms.</strong> Treat text like a
            list of characters: palindromes, vowel counts, word counts and character frequency.
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
export default function UnitCT2_4({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "anatomy", label: "Walking a Grid" },
    { id: "transpose", label: "Transpose Stepper" },
    { id: "toolkit", label: "Matrix Toolkit" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Data in Two Dimensions</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Walking a Grid</h3><GridAnatomy /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>See It: Transpose</h3><TransposeStepper /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Matrix Toolkit</h3><MatrixToolkit /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on grids and matrices.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING II › UNIT 4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Matrices: Grids of Data</div>
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
