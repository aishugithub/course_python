import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const NAMES = ["Asha", "Ravi", "Meera", "Karan"];
const MARKS = [88, 45, 72, 91];
const PIE_COLORS = [C.teal, C.orange, C.purple, C.green];

// ── Section 1: The Need ──────────────────────────────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A DataFrame full of numbers is precise but hard to <em>feel</em>. Which student is struggling? Is the class
        improving? A <strong style={{ color: C.text }}>chart</strong> answers at a glance.{" "}
        <strong style={{ color: C.teal }}>Matplotlib</strong> is Python's foundational plotting library — a few
        lines turn a column into a picture.
      </p>

      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center", background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
          88, 45,<br />72, 91
        </div>
        <div style={{ color: C.accent, fontSize: 22 }}>→</div>
        <svg width="200" height="90" role="img">
          {MARKS.map((m, i) => (
            <rect key={i} x={10 + i * 48} y={90 - (m / 100) * 80} width={34} height={(m / 100) * 80} fill={C.accent} rx="2" />
          ))}
        </svg>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>import matplotlib.pyplot as plt.</strong> Almost every chart follows
        one recipe: give plt some data, label it, and call plt.show(). Learn the recipe once, vary the chart type.
      </div>
    </div>
  );
}

// ── Section 2: Anatomy of a plot ─────────────────────────────────────────────
function Anatomy() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The universal Matplotlib recipe — five lines that cover most charts you'll ever make:
      </p>

      <pre style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.9, margin: "0 0 14px", whiteSpace: "pre" }}>{`import matplotlib.pyplot as plt

names = ["Asha", "Ravi", "Meera", "Karan"]
marks = [88, 45, 72, 91]

plt.bar(names, marks)      # 1. the data + chart type
plt.title("Class Marks")   # 2. a title
plt.xlabel("Student")      # 3. label the x-axis
plt.ylabel("Marks")        # 4. label the y-axis
plt.show()                 # 5. render it`}</pre>

      <div style={{ background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>Swap line 1 to change the chart:</strong>{" "}
        <code style={{ color: C.teal }}>plt.plot</code> (line), <code style={{ color: C.teal }}>plt.bar</code> (bars),{" "}
        <code style={{ color: C.teal }}>plt.scatter</code> (dots), <code style={{ color: C.teal }}>plt.pie</code> (pie).
        The labels and show() stay the same.
      </div>
    </div>
  );
}

// ── Section 3: Chart types ───────────────────────────────────────────────────
function ChartTypes() {
  const [type, setType] = useState("bar");

  const bar = (
    <svg width="260" height="150" role="img">
      {MARKS.map((m, i) => (
        <g key={i}>
          <rect x={20 + i * 60} y={130 - (m / 100) * 110} width={40} height={(m / 100) * 110} fill={C.teal} rx="2" />
          <text x={40 + i * 60} y={145} fontSize="9" fill={C.muted} textAnchor="middle">{NAMES[i].slice(0, 4)}</text>
        </g>
      ))}
    </svg>
  );
  const line = (
    <svg width="260" height="150" role="img">
      <polyline fill="none" stroke={C.orange} strokeWidth="2.5"
        points={MARKS.map((m, i) => `${25 + i * 70},${130 - (m / 100) * 110}`).join(" ")} />
      {MARKS.map((m, i) => <circle key={i} cx={25 + i * 70} cy={130 - (m / 100) * 110} r="4" fill={C.orange} />)}
    </svg>
  );
  const scatter = (
    <svg width="260" height="150" role="img">
      {[[30, 90], [80, 45], [140, 72], [200, 91], [110, 60], [170, 30]].map(([x, m], i) => (
        <circle key={i} cx={x} cy={130 - (m / 100) * 110} r="5" fill={C.purple} opacity="0.8" />
      ))}
    </svg>
  );
  const pie = (() => {
    // Math=2, CS=2 → simple halves; show 4 slices by student for variety
    const total = MARKS.reduce((a, b) => a + b, 0);
    let start = 0;
    const cx = 75, cy = 75, r = 60;
    return (
      <svg width="260" height="150" role="img">
        {MARKS.map((m, i) => {
          const frac = m / total;
          const end = start + frac * 2 * Math.PI;
          const x1 = cx + r * Math.sin(start), y1 = cy - r * Math.cos(start);
          const x2 = cx + r * Math.sin(end), y2 = cy - r * Math.cos(end);
          const large = frac > 0.5 ? 1 : 0;
          const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
          const s = start; start = end;
          return <path key={i} d={path} fill={PIE_COLORS[i]} stroke={C.bg} strokeWidth="1.5" />;
        })}
        {NAMES.map((n, i) => (
          <g key={i}>
            <rect x={160} y={20 + i * 24} width={12} height={12} fill={PIE_COLORS[i]} rx="2" />
            <text x={178} y={30 + i * 24} fontSize="11" fill={C.muted}>{n}</text>
          </g>
        ))}
      </svg>
    );
  })();

  const types = {
    bar: { label: "Bar", color: C.teal, code: "plt.bar(names, marks)", svg: bar, note: "Compare quantities across categories — the go-to for marks per student." },
    line: { label: "Line", color: C.orange, code: "plt.plot(names, marks)", svg: line, note: "Show a trend or change over a sequence — great for progress over time." },
    scatter: { label: "Scatter", color: C.purple, code: "plt.scatter(hours, marks)", svg: scatter, note: "Reveal a relationship between two numbers — e.g. study hours vs marks." },
    pie: { label: "Pie", color: C.green, code: "plt.pie(marks, labels=names)", svg: pie, note: "Show parts of a whole — each slice's share of the total. Use sparingly." },
  };
  const t = types[type];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Same recipe, four pictures. Pick the chart that matches your question. Tap to preview.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(types).map(([k, tv]) => (
          <button key={k} onClick={() => setType(k)} style={{
            flex: 1, minWidth: 80, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
            background: type === k ? tv.color + "22" : C.card,
            border: `1.5px solid ${type === k ? tv.color : C.border}`, color: type === k ? tv.color : C.muted,
          }}>{tv.label}</button>
        ))}
      </div>

      <div style={{ background: "#0A0E14", border: `1.5px solid ${t.color}44`, borderRadius: 10, padding: 16, marginBottom: 12, display: "flex", justifyContent: "center" }}>
        {t.svg}
      </div>

      <pre style={{ background: C.card, border: `1px solid ${t.color}44`, borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 12, color: C.text, margin: "0 0 10px" }}>{t.code}</pre>

      <div style={{ background: t.color + "14", border: `1px solid ${t.color}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
        {t.note}
      </div>
    </div>
  );
}

// ── Section 4: From DataFrame to chart ───────────────────────────────────────
function FromDataFrame() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The real workflow ties it all together: read data with Pandas (Module 12), then plot a column directly.
      </p>

      <pre style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.85, margin: "0 0 14px", whiteSpace: "pre" }}>{`import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("marks.csv")

df.plot(x="Name", y="Marks", kind="bar")
plt.title("Class Marks")
plt.show()`}</pre>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.7 }}>
          Pandas even has plotting built in: <code style={{ color: C.teal }}>df.plot(kind="bar")</code> calls
          Matplotlib for you. And <strong style={{ color: C.text }}>Seaborn</strong> and{" "}
          <strong style={{ color: C.text }}>Plotly</strong> (coming next) build on this same foundation to make
          prettier and interactive charts with even less code.
        </div>
      </div>

      <div style={{ background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Data in, picture out.</strong> read_csv → filter/summarise → plot.
        That three-step pipeline is the heartbeat of data analysis — and exactly what your visualization lab builds.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What is the standard import line for Matplotlib?",
      options: [
        "import matplotlib",
        "import matplotlib.pyplot as plt",
        "from matplotlib import *",
        "import plt",
      ],
      answer: 1,
      explain: "import matplotlib.pyplot as plt is the near-universal convention — everyone writes plt.bar, plt.plot, plt.show.",
    },
    {
      q: "To change from a bar chart to a line chart, what do you change?",
      options: [
        "Everything",
        "Just the plotting call — plt.bar(...) becomes plt.plot(...); labels and show() stay",
        "The import line",
        "You must use a different library",
      ],
      answer: 1,
      explain: "The recipe is stable: swap plt.bar for plt.plot (or scatter, pie) and keep the title, labels, and plt.show().",
    },
    {
      q: "Which chart best shows the RELATIONSHIP between study hours and marks?",
      options: ["Pie", "Scatter", "A single bar", "None"],
      answer: 1,
      explain: "A scatter plot places each (hours, marks) pair as a dot, revealing whether more hours tends to mean higher marks.",
    },
    {
      q: "What does  plt.show()  do?",
      options: [
        "Loads the data",
        "Renders and displays the figure you've built up",
        "Saves the file",
        "Imports matplotlib",
      ],
      answer: 1,
      explain: "You build a figure with plt calls, then plt.show() actually draws it on screen. Without it, nothing appears.",
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
          {score === 4 ? "You can turn any dataset into a picture." :
            score >= 2 ? "Good — replay Chart Types to match the chart to the question." :
              "Revisit the Anatomy and Chart Types, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 13.1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            The Matplotlib recipe, four chart types, and the read → analyse → plot pipeline.<br /><br />
            Next in this module: Seaborn for statistical charts and Plotly for interactive ones — both build on
            what you just learned.
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
export default function Unit13_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "anatomy", label: "The Recipe" },
    { id: "types", label: "Chart Types" },
    { id: "df", label: "From Data to Chart" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Numbers into Pictures</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Matplotlib Recipe</h3><Anatomy /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Four Chart Types</h3><ChartTypes /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>From DataFrame to Chart</h3><FromDataFrame /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on plotting with Matplotlib.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📊</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 13 › UNIT 13.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Charts with Matplotlib</div>
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
