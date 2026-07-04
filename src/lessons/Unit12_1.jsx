import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const DATA = [
  { Name: "Asha", Marks: 88, Subject: "Math" },
  { Name: "Ravi", Marks: 45, Subject: "CS" },
  { Name: "Meera", Marks: 72, Subject: "Math" },
  { Name: "Karan", Marks: 91, Subject: "CS" },
];

// generic table renderer
function Table({ cols, rows, highlightCol }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "monospace", fontSize: 12.5 }}>
        <thead>
          <tr>
            <th style={{ padding: "6px 10px", color: C.muted, borderBottom: `1px solid ${C.border}`, textAlign: "left", fontWeight: 400 }}></th>
            {cols.map((c) => (
              <th key={c} style={{ padding: "6px 12px", textAlign: "left", borderBottom: `2px solid ${C.border}`, color: c === highlightCol ? C.accent : C.text, background: c === highlightCol ? C.accent + "14" : "transparent" }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ padding: "6px 10px", color: C.muted, borderBottom: `1px solid ${C.border}22` }}>{r.__idx !== undefined ? r.__idx : i}</td>
              {cols.map((c) => (
                <td key={c} style={{ padding: "6px 12px", borderBottom: `1px solid ${C.border}22`, color: c === highlightCol ? C.accent : C.text, background: c === highlightCol ? C.accent + "10" : "transparent" }}>{r[c]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Section 1: The Need ──────────────────────────────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Real-world data is <strong style={{ color: C.text }}>tables</strong>: a CSV of marks, a hospital's patient
        records, a spreadsheet. You <em>could</em> juggle it with lists of dicts — but filtering, averaging and
        grouping quickly get painful. <strong style={{ color: C.teal }}>Pandas</strong> gives you a{" "}
        <strong style={{ color: C.text }}>DataFrame</strong>: a labelled table with a superpower toolkit.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ color: C.muted, fontSize: 11, marginBottom: 10 }}>a DataFrame — rows, labelled columns, an index:</div>
        <Table cols={["Name", "Marks", "Subject"]} rows={DATA} />
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Pandas is the workhorse of data science.</strong> It's the bridge
        from "I can loop over a list" to "I can analyse a real dataset." It builds on everything you know —
        dicts, lists, and the CSV files from Module 9.
      </div>
    </div>
  );
}

// ── Section 2: Series & DataFrame ────────────────────────────────────────────
function SeriesDataFrame() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Two core objects. A <strong style={{ color: C.teal }}>Series</strong> is a single labelled column. A{" "}
        <strong style={{ color: C.orange }}>DataFrame</strong> is a whole table — columns of Series sharing one
        index. You'll usually build one from a dictionary.
      </p>

      <pre style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.8, margin: "0 0 14px", whiteSpace: "pre" }}>{`import pandas as pd

data = {
    "Name": ["Asha", "Ravi", "Meera", "Karan"],
    "Marks": [88, 45, 72, 91],
    "Subject": ["Math", "CS", "Math", "CS"],
}
df = pd.DataFrame(data)
print(df)`}</pre>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: C.card, border: `1px solid ${C.teal}44`, borderRadius: 8, padding: 12 }}>
          <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>Series</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>One column with an index — like a labelled list. df["Marks"] is a Series.</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.orange}44`, borderRadius: 8, padding: 12 }}>
          <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>DataFrame</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>The full table — many Series columns aligned on one shared row index.</div>
        </div>
      </div>

      <div style={{ marginTop: 14, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>import pandas as pd</strong> is the universal convention (Unit 11.2's
        "import … as"). Everyone writes <code style={{ color: C.teal }}>pd</code>.
      </div>
    </div>
  );
}

// ── Section 3: Exploring a DataFrame ─────────────────────────────────────────
function Exploring() {
  const [op, setOp] = useState("head");
  const marks = DATA.map((d) => d.Marks);
  const mean = (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1);
  const ops = {
    head: {
      label: "df.head(2)", color: C.teal, code: "df.head(2)",
      render: <Table cols={["Name", "Marks", "Subject"]} rows={DATA.slice(0, 2)} />,
      note: "The first rows — a quick peek at a big table without printing all of it.",
    },
    col: {
      label: 'df["Marks"]', color: C.accent, code: 'df["Marks"]',
      render: <Table cols={["Marks"]} rows={DATA.map((d, i) => ({ Marks: d.Marks, __idx: i }))} highlightCol="Marks" />,
      note: "Select one column — a Series. You can then average it, plot it, or filter on it.",
    },
    filter: {
      label: "df[df.Marks >= 50]", color: C.green, code: 'df[df["Marks"] >= 50]',
      render: <Table cols={["Name", "Marks", "Subject"]} rows={DATA.filter((d) => d.Marks >= 50).map((d) => ({ ...d, __idx: DATA.indexOf(d) }))} />,
      note: "Boolean filtering — keep only rows where the condition is True. No loop, no if. This is the big one.",
    },
    describe: {
      label: "df.describe()", color: C.purple, code: 'df["Marks"].describe()',
      render: (
        <Table cols={["stat", "Marks"]} rows={[
          { stat: "count", Marks: 4 }, { stat: "mean", Marks: mean }, { stat: "min", Marks: Math.min(...marks) }, { stat: "max", Marks: Math.max(...marks) },
        ]} />
      ),
      note: "Instant summary statistics — count, mean, min, max (and more) in one call.",
    },
  };
  const o = ops[op];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A DataFrame answers questions in one line each. Tap an operation and see the result on our marks table.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(ops).map(([k, ov]) => (
          <button key={k} onClick={() => setOp(k)} style={{
            flex: 1, minWidth: 110, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 11.5, fontWeight: 600, fontFamily: "monospace",
            background: op === k ? ov.color + "22" : C.card,
            border: `1.5px solid ${op === k ? ov.color : C.border}`, color: op === k ? ov.color : C.muted,
          }}>{ov.label}</button>
        ))}
      </div>

      <div style={{ background: "#0A0E14", border: `1.5px solid ${o.color}44`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
        <div style={{ color: o.color, fontFamily: "monospace", fontSize: 12, marginBottom: 12 }}>{">>> "}{o.code}</div>
        {o.render}
      </div>

      <div style={{ background: o.color + "14", border: `1px solid ${o.color}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
        {o.note}
      </div>
    </div>
  );
}

// ── Section 4: Reading real files ────────────────────────────────────────────
function ReadCSV() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The real payoff: in Module 9 you split CSV lines by hand. Pandas reads a whole CSV into a DataFrame in{" "}
        <strong style={{ color: C.text }}>one line</strong> — then all the tools above just work.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Module 9 way</div>
          <pre style={{ fontFamily: "monospace", fontSize: 10.5, color: C.text, margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>{`rows = []\nwith open("marks.csv") as f:\n    for line in f:\n        rows.append(line.split(","))\n# ...now parse numbers by hand`}</pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Pandas way</div>
          <pre style={{ fontFamily: "monospace", fontSize: 10.5, color: C.text, margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>{`import pandas as pd\ndf = pd.read_csv("marks.csv")\n\nprint(df["Marks"].mean())\nprint(df[df["Marks"] >= 50])`}</pre>
        </div>
      </div>

      <div style={{ background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>read_csv handles the parsing, types, and headers for you.</strong>{" "}
        This is the doorway to real analysis — and the exact skill your data-handling lab needs. Next you'll turn
        these tables into charts.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What is a Pandas DataFrame?",
      options: [
        "A single number",
        "A labelled 2-D table — rows and named columns with an index",
        "A type of loop",
        "A plain Python list",
      ],
      answer: 1,
      explain: "A DataFrame is a table: named columns (each a Series) aligned on a shared row index. It's built for real, tabular data.",
    },
    {
      q: "What does  df[df[\"Marks\"] >= 50]  return?",
      options: [
        "The average mark",
        "Only the rows where Marks is at least 50 — boolean filtering, no loop needed",
        "An error",
        "The Marks column sorted",
      ],
      answer: 1,
      explain: "Boolean filtering keeps rows where the condition is True. It replaces a whole for-loop-with-if in a single, readable expression.",
    },
    {
      q: "Why is  import pandas as pd  written that way?",
      options: [
        "pd is required syntax",
        "It's the universal convention for a short alias (from Unit 11.2's 'import ... as')",
        "pandas won't work otherwise",
        "pd is a different library",
      ],
      answer: 1,
      explain: "Aliasing pandas to pd is a near-universal convention, so code everywhere reads pd.DataFrame, pd.read_csv, etc.",
    },
    {
      q: "How does Pandas improve on the Module 9 way of reading a CSV?",
      options: [
        "It doesn't — it's the same",
        "pd.read_csv loads the whole file into a DataFrame in one line, handling headers and types automatically",
        "It can't read CSVs",
        "It only reads one row",
      ],
      answer: 1,
      explain: "Instead of opening the file and splitting each line by hand, pd.read_csv parses the entire table for you — then all the DataFrame tools apply.",
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
          {score === 4 ? "You can load and interrogate a real dataset." :
            score >= 2 ? "Good — replay Exploring to lock in filtering and describe()." :
              "Revisit Series & DataFrame and Exploring, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 12.1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            DataFrames, column selection, boolean filtering, describe(), and read_csv.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Module 13 — Data Visualization.</strong> Turn these tables
            into charts with Matplotlib, Seaborn and Plotly.
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
export default function Unit12_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "sdf", label: "Series & DataFrame" },
    { id: "explore", label: "Exploring" },
    { id: "csv", label: "Reading CSVs" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Real Data Is a Table</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Series &amp; DataFrame</h3><SeriesDataFrame /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Exploring a DataFrame</h3><Exploring /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Reading Real CSV Files</h3><ReadCSV /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on Pandas DataFrames.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐼</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 12 › UNIT 12.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Meet Pandas: DataFrames</div>
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
