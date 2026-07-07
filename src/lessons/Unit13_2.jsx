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

// ── Section 1: The Need ──────────────────────────────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Matplotlib (Unit 13.1) draws anything — but you assemble it piece by piece, and it doesn't know about
        your DataFrame. <strong style={{ color: C.teal }}>Seaborn</strong> sits on top of Matplotlib: hand it a whole
        DataFrame and a column name, and it returns a <em>polished, statistical</em> chart in one line.
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "stretch", justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 210, background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 11, color: C.yellow, letterSpacing: 1, marginBottom: 8 }}>MATPLOTLIB · plain + manual</div>
          <svg width="100%" height="90" viewBox="0 0 200 90" role="img">
            {MARKS.map((m, i) => (
              <rect key={i} x={12 + i * 46} y={82 - (m / 100) * 72} width={32} height={(m / 100) * 72} fill={C.muted} rx="1" />
            ))}
          </svg>
        </div>
        <div style={{ display: "flex", alignItems: "center", color: C.accent, fontSize: 22 }}>→</div>
        <div style={{ flex: 1, minWidth: 210, background: "#0A0E14", border: `1px solid ${C.teal}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 11, color: C.teal, letterSpacing: 1, marginBottom: 8 }}>SEABORN · styled + statistical</div>
          <svg width="100%" height="90" viewBox="0 0 200 90" role="img">
            <line x1="8" y1="82" x2="192" y2="82" stroke={C.border} strokeWidth="1" />
            {[20, 40, 60, 80].map((g) => (
              <line key={g} x1="8" y1={82 - (g / 100) * 72} x2="192" y2={82 - (g / 100) * 72} stroke={C.border} strokeWidth="0.5" opacity="0.5" />
            ))}
            {MARKS.map((m, i) => (
              <rect key={i} x={12 + i * 46} y={82 - (m / 100) * 72} width={32} height={(m / 100) * 72} fill={C.teal} opacity="0.85" rx="2" />
            ))}
          </svg>
        </div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>import seaborn as sns.</strong> Seaborn doesn't replace Matplotlib — it
        wraps it. You still call <code style={{ color: C.teal }}>plt.show()</code>; Seaborn just does the heavy styling
        and the statistics for you.
      </div>
    </div>
  );
}

// ── Section 2: The one-liner (Seaborn sits on Matplotlib) ────────────────────
function OneLiner() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Same picture, two amounts of work. Watch how a DataFrame goes straight into Seaborn — no pulling out lists first.
      </p>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: C.yellow, letterSpacing: 1, marginBottom: 6 }}>THE MATPLOTLIB WAY — pull columns out yourself</div>
        <pre style={{ background: "#0A0E14", border: `1px solid ${C.yellow}33`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.8, margin: 0, whiteSpace: "pre" }}>{`plt.bar(df["Name"], df["Marks"])
plt.xticks(rotation=45)
plt.ylabel("Marks")
plt.show()`}</pre>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: C.teal, letterSpacing: 1, marginBottom: 6 }}>THE SEABORN WAY — pass the DataFrame + column NAMES</div>
        <pre style={{ background: "#0A0E14", border: `1px solid ${C.teal}44`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.8, margin: 0, whiteSpace: "pre" }}>{`import seaborn as sns

sns.barplot(data=df, x="Name", y="Marks")
plt.show()`}</pre>
      </div>

      <div style={{ background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>data=df, x="col", y="col".</strong> You pass column <em>names as strings</em>,
        not the values — Seaborn reaches into the DataFrame for you, adds axis labels from the column names, and
        applies a clean theme automatically.
      </div>
    </div>
  );
}

// ── Section 3: Statistical chart types ───────────────────────────────────────
function ChartTypes() {
  const [type, setType] = useState("bar");

  const bar = (
    <svg width="260" height="150" viewBox="0 0 260 150" role="img">
      <line x1="20" y1="130" x2="250" y2="130" stroke={C.border} />
      {MARKS.map((m, i) => (
        <g key={i}>
          <rect x={30 + i * 55} y={130 - (m / 100) * 110} width={38} height={(m / 100) * 110} fill={C.teal} opacity="0.85" rx="2" />
          <text x={49 + i * 55} y={144} fontSize="9" fill={C.muted} textAnchor="middle">{NAMES[i].slice(0, 4)}</text>
        </g>
      ))}
    </svg>
  );

  const hist = (() => {
    const bins = [6, 14, 26, 34, 22, 12, 5]; // a distribution shape (counts per mark-band)
    const max = Math.max(...bins);
    return (
      <svg width="260" height="150" viewBox="0 0 260 150" role="img">
        <line x1="20" y1="130" x2="250" y2="130" stroke={C.border} />
        {bins.map((b, i) => (
          <rect key={i} x={22 + i * 32} y={130 - (b / max) * 110} width={30} height={(b / max) * 110} fill={C.purple} opacity="0.8" stroke={C.bg} strokeWidth="1" />
        ))}
        <text x="135" y="146" fontSize="9" fill={C.muted} textAnchor="middle">marks → (low to high)</text>
      </svg>
    );
  })();

  const box = (
    <svg width="260" height="150" viewBox="0 0 260 150" role="img">
      {/* whiskers */}
      <line x1="130" y1="18" x2="130" y2="118" stroke={C.orange} strokeWidth="1.5" />
      <line x1="105" y1="18" x2="155" y2="18" stroke={C.orange} strokeWidth="1.5" />
      <line x1="105" y1="118" x2="155" y2="118" stroke={C.orange} strokeWidth="1.5" />
      {/* the box: Q1..Q3 */}
      <rect x="95" y="45" width="70" height="55" fill={C.orange} opacity="0.25" stroke={C.orange} strokeWidth="1.5" />
      {/* median */}
      <line x1="95" y1="72" x2="165" y2="72" stroke={C.orange} strokeWidth="2.5" />
      {/* outlier */}
      <circle cx="130" cy="138" r="4" fill={C.red} />
      <text x="180" y="24" fontSize="9" fill={C.muted}>max</text>
      <text x="180" y="50" fontSize="9" fill={C.muted}>Q3</text>
      <text x="180" y="76" fontSize="9" fill={C.orange}>median</text>
      <text x="180" y="104" fontSize="9" fill={C.muted}>Q1</text>
      <text x="180" y="142" fontSize="9" fill={C.red}>outlier</text>
    </svg>
  );

  const heat = (() => {
    // a 3x3 correlation matrix; value in [-1,1] → colour from red(-) to teal(+)
    const cells = [[1, 0.8, -0.3], [0.8, 1, -0.1], [-0.3, -0.1, 1]];
    const labels = ["Hrs", "Marks", "Absent"];
    const col = (v) => v >= 0 ? `rgba(57,208,216,${0.15 + v * 0.7})` : `rgba(248,81,73,${0.15 + -v * 0.7})`;
    return (
      <svg width="260" height="150" viewBox="0 0 260 150" role="img">
        {cells.map((row, r) => row.map((v, c) => (
          <g key={`${r}-${c}`}>
            <rect x={70 + c * 44} y={20 + r * 38} width={42} height={36} fill={col(v)} stroke={C.bg} strokeWidth="1.5" />
            <text x={91 + c * 44} y={42 + r * 38} fontSize="10" fill={C.text} textAnchor="middle">{v.toFixed(1)}</text>
          </g>
        )))}
        {labels.map((l, i) => (
          <text key={l} x={91 + i * 44} y={14} fontSize="8.5" fill={C.muted} textAnchor="middle">{l}</text>
        ))}
        {labels.map((l, i) => (
          <text key={l + "r"} x={64} y={42 + i * 38} fontSize="8.5" fill={C.muted} textAnchor="end">{l}</text>
        ))}
      </svg>
    );
  })();

  const types = {
    bar: { label: "barplot", color: C.teal, code: 'sns.barplot(data=df, x="Name", y="Marks")', svg: bar, note: "Compare a value across categories — and if a category repeats, Seaborn averages it AND draws an error bar for free." },
    hist: { label: "histplot", color: C.purple, code: 'sns.histplot(data=df, x="Marks", bins=7)', svg: hist, note: "The shape of ONE column: how many marks fall in each band. Instantly shows whether the class clusters, spreads, or is skewed." },
    box: { label: "boxplot", color: C.orange, code: 'sns.boxplot(data=df, y="Marks")', svg: box, note: "Five numbers at a glance: min, Q1, median, Q3, max — plus dots for outliers. The box holds the middle 50% of students." },
    heat: { label: "heatmap", color: C.green, code: "sns.heatmap(df.corr(), annot=True)", svg: heat, note: "Colour a whole table of numbers. On df.corr() it shows which columns move together — e.g. study hours vs marks glow teal (positive)." },
  };
  const t = types[type];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Matplotlib gives you shapes; Seaborn gives you <em>statistics as pictures</em>. Tap each one.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(types).map(([k, tv]) => (
          <button key={k} onClick={() => setType(k)} style={{
            flex: 1, minWidth: 76, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: type === k ? tv.color + "22" : C.card,
            border: `1.5px solid ${type === k ? tv.color : C.border}`, color: type === k ? tv.color : C.muted,
          }}>{tv.label}</button>
        ))}
      </div>

      <div style={{ background: "#0A0E14", border: `1.5px solid ${t.color}44`, borderRadius: 10, padding: 16, marginBottom: 12, display: "flex", justifyContent: "center" }}>
        {t.svg}
      </div>

      <pre style={{ background: C.card, border: `1px solid ${t.color}44`, borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 11.5, color: C.text, margin: "0 0 10px", whiteSpace: "pre-wrap" }}>{t.code}</pre>

      <div style={{ background: t.color + "14", border: `1px solid ${t.color}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
        {t.note}
      </div>
    </div>
  );
}

// ── Section 4: The hue superpower ────────────────────────────────────────────
function HueSuperpower() {
  const [split, setSplit] = useState(false);
  // marks split into two subjects per student
  const math = [82, 40, 78, 95];
  const cs = [94, 50, 66, 87];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The move that makes Seaborn worth it: add <code style={{ color: C.teal }}>hue="Subject"</code> and one chart
        splits into groups — no manual filtering, no second loop. Toggle it.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setSplit(false)} style={{
          flex: 1, padding: "9px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
          background: !split ? C.teal + "22" : C.card, border: `1.5px solid ${!split ? C.teal : C.border}`, color: !split ? C.teal : C.muted,
        }}>No hue</button>
        <button onClick={() => setSplit(true)} style={{
          flex: 1, padding: "9px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
          background: split ? C.orange + "22" : C.card, border: `1.5px solid ${split ? C.orange : C.border}`, color: split ? C.orange : C.muted,
        }}>hue="Subject"</button>
      </div>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 12, display: "flex", justifyContent: "center" }}>
        <svg width="280" height="160" viewBox="0 0 280 160" role="img">
          <line x1="20" y1="135" x2="270" y2="135" stroke={C.border} />
          {NAMES.map((n, i) => {
            const avg = Math.round((math[i] + cs[i]) / 2);
            if (!split) {
              return (
                <g key={i}>
                  <rect x={35 + i * 58} y={135 - (avg / 100) * 115} width={40} height={(avg / 100) * 115} fill={C.teal} opacity="0.85" rx="2" />
                  <text x={55 + i * 58} y={149} fontSize="9" fill={C.muted} textAnchor="middle">{n.slice(0, 4)}</text>
                </g>
              );
            }
            return (
              <g key={i}>
                <rect x={32 + i * 58} y={135 - (math[i] / 100) * 115} width={19} height={(math[i] / 100) * 115} fill={C.teal} rx="1.5" />
                <rect x={53 + i * 58} y={135 - (cs[i] / 100) * 115} width={19} height={(cs[i] / 100) * 115} fill={C.orange} rx="1.5" />
                <text x={53 + i * 58} y={149} fontSize="9" fill={C.muted} textAnchor="middle">{n.slice(0, 4)}</text>
              </g>
            );
          })}
          {split && (
            <g>
              <rect x="200" y="12" width="11" height="11" fill={C.teal} rx="2" /><text x="216" y="21" fontSize="9" fill={C.muted}>Math</text>
              <rect x="200" y="27" width="11" height="11" fill={C.orange} rx="2" /><text x="216" y="36" fontSize="9" fill={C.muted}>CS</text>
            </g>
          )}
        </svg>
      </div>

      <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 11.5, color: C.text, margin: "0 0 12px", whiteSpace: "pre-wrap" }}>
        {split ? 'sns.barplot(data=df, x="Name", y="Score", hue="Subject")' : 'sns.barplot(data=df, x="Name", y="Score")'}
      </pre>

      <div style={{ background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>One keyword, a whole new dimension.</strong> In Matplotlib you'd filter
        the data yourself and draw each group in a separate loop. <code style={{ color: C.teal }}>hue=</code> does the
        grouping, colouring, and legend in a single argument.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "How does Seaborn relate to Matplotlib?",
      options: [
        "It replaces Matplotlib completely",
        "It's built on top of Matplotlib — you still call plt.show()",
        "It has nothing to do with Matplotlib",
        "It only works without Matplotlib installed",
      ],
      answer: 1,
      explain: "Seaborn is a higher-level layer over Matplotlib. It does the styling and statistics; Matplotlib still does the actual drawing, so plt.show() and plt.title() still work.",
    },
    {
      q: 'In  sns.barplot(data=df, x="Name", y="Marks")  what are "Name" and "Marks"?',
      options: [
        "The actual lists of values",
        "Column NAMES (strings) — Seaborn reads them from df",
        "File names",
        "Chart titles",
      ],
      answer: 1,
      explain: 'You pass column names as strings plus data=df. Seaborn reaches into the DataFrame for the values itself — you don\'t pull the lists out first.',
    },
    {
      q: "Which Seaborn chart best shows the SPREAD and outliers of one column?",
      options: ["barplot", "boxplot", "heatmap", "a title"],
      answer: 1,
      explain: "A boxplot shows min, Q1, median, Q3, max in one box-and-whisker, and marks outliers as separate dots — exactly a column's spread.",
    },
    {
      q: "What does adding  hue=\"Subject\"  to a Seaborn plot do?",
      options: [
        "Changes the background colour",
        "Splits the chart into coloured groups by that column, with a legend",
        "Deletes a column",
        "Nothing visible",
      ],
      answer: 1,
      explain: "hue groups the data by that column and draws each group in its own colour with an automatic legend — grouping that would take manual filtering in plain Matplotlib.",
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
          {score === 4 ? "You can turn a DataFrame into a statistical picture in one line." :
            score >= 2 ? "Good — replay Statistical Charts to match each plot to its question." :
              "Revisit The One-Liner and Statistical Charts, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 13.2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Seaborn = Matplotlib + statistics + style, all from a DataFrame: barplot, histplot, boxplot, heatmap, and the hue superpower.<br /><br />
            Next: <strong style={{ color: C.text }}>Unit 13.3 — Interactive Charts with Plotly</strong>, where the chart
            responds to your mouse and lives in a webpage.
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
export default function Unit13_2({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "oneliner", label: "The One-Liner" },
    { id: "types", label: "Statistical Charts" },
    { id: "hue", label: "The hue Superpower" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Prettier Charts, Less Code</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>One Line, Straight from the DataFrame</h3><OneLiner /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Statistics as Pictures</h3><ChartTypes /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Grouping with hue</h3><HueSuperpower /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on statistical plotting with Seaborn.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌊</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 13 › UNIT 13.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Statistical Charts with Seaborn</div>
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
