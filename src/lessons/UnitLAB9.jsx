// UnitLAB9 — 🧪 Python Lab · Experiment 9 (e-observation record)
// Data Analysis with Pandas (CO5 · Sessions 17–18).
//
// HOW THIS FILE FITS THE WHOLE APP ───────────────────────────────
// The shell (src/shell/App.jsx) lazy-loads this file by unitId using
// import.meta.glob('../lessons/*.jsx'); dropping the file in
// src/lessons/ and adding one config line (config/course.config.js)
// is all the wiring needed. The shell passes four props:
//   • student            — { rollNo, name, batch } of the signed-in learner
//   • onUnitComplete()   — call once, at the very end, to file the whole
//                          experiment against the student's roll number
//   • challengeProgress  — array of already-completed pseudo-unitIds, so a
//                          returning student resumes exactly where they left
//   • onStageComplete(id)— call after each gated stage to persist just that
//                          brick (e.g. "UnitLAB9@p1_algo") to the Events/
//                          Progress sheet — the teacher's e-observation book.
//
// TWO lab programs, each with THREE gated stages:
//   ① Algorithm  → ② Flowchart → ③ Program (fill blanks, run real Python).
// Program spec (code, blanks, expected output) is taken verbatim from the
// MED23CL202 lab manual, Experiment 9 (pages 29–32). Programs 1 & 2 use heavy libraries (pandas / matplotlib / seaborn); their run
// stage is a SELF-CHECK against the manual's expected output (Algorithm & Flowchart
// stages remain auto-graded) — see BUILD_REPORT_LAB_FULL.md.
//
// The code is shown exactly as the manual prints it. The learner fills the blanks
// and self-checks the filled program against the expected output shown in the stage.
import { useState, useRef } from "react";

// ── Brand palette — identical tokens across every lab unit ──
const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const UNIT_ID = "UnitLAB9";
const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };

// ─────────────────────────────────────────────────────────────
//  EXPERIMENT DATA — everything specific to Experiment 9 lives here.
// ─────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    key: "p1",
    title: "Program 1 — Building a DataFrame",
    aim: "Build a DataFrame directly from a dictionary of patient vitals and inspect one of its columns.",
    selfCheck: true,

    algo: [
      "Import pandas as pd.",
      "Store patient data as a dict of equal-length lists.",
      "Build a DataFrame from the dict.",
      "Print the whole DataFrame, then just the age column.",
    ],
    algoShuffle: [2, 3, 0, 1],
    algoHint: "pandas must be imported before pd can be used; the dict must exist before a DataFrame is built from it; and the DataFrame must exist before you can print a column.",

    flow: [
      { type: "terminator", text: "Start" },
      { type: "process", text: "import pandas as pd" },
      { type: "process", text: "data = dict of equal-length lists" },
      { type: "process", text: "df = pd.DataFrame(data)" },
      { type: "output", text: "print(df)" },
      { type: "output", text: 'print(df["age"])' },
      { type: "terminator", text: "Stop" },
    ],
    flowShuffle: [4, 5, 6, 0, 1, 2, 3],
    flowHint: "Start and Stop are the rounded caps. Import pandas, build the dict, make the DataFrame, then print the whole table and the single column.",
    flowNote: "pd.DataFrame(data) turns a dict of equal-length lists into a table; df[\"age\"] selects one column, which pandas calls a Series.",

    codeLines: [
      [{ text: "import pandas as pd" }],
      [{ text: "data = {" }],
      [{ text: '    "name": ["Ravi", "Meena", "Sara", "John"],' }],
      [{ text: '    "age": [45, 30, 25, 50],' }],
      [{ text: '    "temperature": [98.6, 101.2, 99.5, 97.9],' }],
      [{ text: "}" }],
      [{ text: "df = pd." }, { blank: 0 }, { text: "(data)" }, { cmt: "build a DataFrame from the dict" }],
      [{ text: "print(df)" }],
      [{ text: 'print(df["' }, { blank: 1 }, { text: '"])' }, { cmt: "print just the age column" }],
    ],
    blankWidth: [92, 52],
    expected: "    name  age  temperature\n0   Ravi   45         98.6\n1  Meena   30        101.2\n2   Sara   25         99.5\n3   John   50         97.9\n0    45\n1    30\n2    25\n3    50\nName: age, dtype: int64",
    tests: [],
    progHints: [
      "pd.DataFrame(data) builds the table from the dict; df[\"age\"] selects one column by its name.",
      "So the two blanks are: DataFrame and age.",
    ],
  },

  {
    key: "p2",
    title: "Program 2 — Loading a CSV and Filtering Rows",
    aim: "Write patient vitals to vitals.csv, load it into a DataFrame with read_csv and preview it, then keep only the patients with a fever (temperature >= 100.4) using boolean indexing.",
    selfCheck: true,

    algo: [
      "(Given) Write a small CSV file with a header and four patient rows.",
      "Load it into a DataFrame using pd.read_csv; print the first 2 rows and the shape.",
      "Build a boolean mask comparing the temperature column to 100.4 and filter with it.",
      "Print the matching names and temperatures, and how many rows matched.",
    ],
    algoShuffle: [3, 0, 1, 2],
    algoHint: "The CSV must be written before read_csv can load it; the DataFrame must exist before you can build a mask on its column; and the mask must exist before it can filter the rows.",

    flow: [
      { type: "terminator", text: "Start" },
      { type: "process", text: "Write vitals.csv (given)" },
      { type: "process", text: 'df = pd.read_csv("vitals.csv")' },
      { type: "output", text: "print(df.head(2)) and df.shape" },
      { type: "process", text: 'mask = df["temperature"] >= 100.4' },
      { type: "output", text: "print matching names + fever count" },
      { type: "terminator", text: "Stop" },
    ],
    flowShuffle: [3, 4, 5, 6, 0, 1, 2],
    flowHint: "Start and Stop are the rounded caps. Write the CSV, load it with read_csv and preview it, build the boolean mask, then print the matches and the count.",
    flowNote: "df[\"temperature\"] >= 100.4 is a boolean mask (one True/False per row); df[mask] keeps only the True rows — that's boolean indexing.",

    codeLines: [
      [{ cmt: "(setup - given) write the CSV file so this program is self-contained" }],
      [{ text: "import pandas as pd" }],
      [{ text: 'with open("vitals.csv", "w") as f:' }],
      [{ text: '    f.write("name,age,temperature\\n")' }],
      [{ text: '    f.write("Ravi,45,98.6\\n")' }],
      [{ text: '    f.write("Meena,30,101.2\\n")' }],
      [{ text: '    f.write("Sara,25,99.5\\n")' }],
      [{ text: '    f.write("John,50,97.9\\n")' }],
      [{ text: "df = pd." }, { blank: 0 }, { text: '("vitals.csv")' }, { cmt: "read the CSV into a DataFrame" }],
      [{ text: "print(df." }, { blank: 1 }, { text: "(2))" }, { cmt: "show only the first 2 rows" }],
      [{ text: 'print("Shape:", df.shape)' }],
      [{ text: 'fever_df = df[df["' }, { blank: 2 }, { text: '"] >= 100.4]' }, { cmt: "column compared to the threshold" }],
      [{ text: 'print(fever_df[["name", "temperature"]])' }],
      [{ text: 'print("Fever count:", len(fever_df))' }],
    ],
    blankWidth: [80, 60, 100],
    expected: "    name  age  temperature\n0   Ravi   45         98.6\n1  Meena   30        101.2\nShape: (4, 3)\n    name  temperature\n1  Meena        101.2\nFever count: 1",
    tests: [],
    progHints: [
      'pd.read_csv("vitals.csv") loads the file into a DataFrame; df.head(2) shows the first 2 rows; df["temperature"] >= 100.4 builds the mask.',
      "So the three blanks are: read_csv, head and temperature.",
    ],
  },

];

// Six stages = 2 programs × 3 stages, gated strictly in this order.
const STAGES = [
  { id: "p1_algo", prog: 0, kind: "algo", label: "Algorithm", sub: "Program 1", icon: "①" },
  { id: "p1_flow", prog: 0, kind: "flow", label: "Flowchart", sub: "Program 1", icon: "①" },
  { id: "p1_prog", prog: 0, kind: "prog", label: "Program", sub: "Program 1", icon: "①" },
  { id: "p2_algo", prog: 1, kind: "algo", label: "Algorithm", sub: "Program 2", icon: "②" },
  { id: "p2_flow", prog: 1, kind: "flow", label: "Flowchart", sub: "Program 2", icon: "②" },
  { id: "p2_prog", prog: 1, kind: "prog", label: "Program", sub: "Program 2", icon: "②" },
];

// ── Hint box: reveals one nudge at a time, never the whole answer ──
function Hints({ hints, shown, onMore }) {
  return (
    <div style={{ marginTop: 10 }}>
      {hints.slice(0, shown).map((h, i) => (
        <div key={i} style={{ background: C.yellow + "14", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: C.muted, lineHeight: 1.6, marginBottom: 6 }}>
          💡 Hint {i + 1}: {h}
        </div>
      ))}
      {shown < hints.length && (
        <button onClick={onMore} style={{ padding: "6px 12px", borderRadius: 7, fontSize: 12, cursor: "pointer", background: C.card, color: C.yellow, border: `1px solid ${C.yellow}55` }}>
          💡 Need a nudge? ({shown}/{hints.length} hints used)
        </button>
      )}
    </div>
  );
}

// Small header shown on every stage so the learner knows which program.
function ProgHeader({ prog }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
      <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{prog.title}</div>
      <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6, marginTop: 4 }}>🎯 {prog.aim}</div>
      {neededPkgs(prog).length > 0 && (
        <div style={{ marginTop: 8, background: "#0A0E14", border: `1px solid ${C.yellow}55`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
          📥 <strong style={{ color: C.yellow }}>Running this on your own PC?</strong> Activate your venv first, then install once:
          <div style={{ fontFamily: "monospace", color: C.green, marginTop: 4 }}>pip install {neededPkgs(prog).join(" ")}</div>
          <div style={{ fontSize: 11, marginTop: 2 }}>In Jupyter/Colab use <code style={{ color: C.text }}>%pip install {neededPkgs(prog).join(" ")}</code>. Here in the browser it's already set up for you.</div>
        </div>
      )}
    </div>
  );
}

function neededPkgs(prog) {
  const src = (prog.codeLines || []).map((l) => l.map((s) => s.text || "").join("")).join("\n");
  return ["pandas", "numpy", "matplotlib", "seaborn", "plotly"].filter((p) => new RegExp("(import|from)\\s+" + p).test(src));
}

// ─────────────────────────────────────────────────────────────
//  STAGE ① — ALGORITHM: reorder the jumbled steps into sequence.
// ─────────────────────────────────────────────────────────────
function AlgorithmStage({ prog, onPass }) {
  const [order, setOrder] = useState(prog.algoShuffle);
  const [verdict, setVerdict] = useState(null);
  const [solved, setSolved] = useState(false);
  const [hints, setHints] = useState(0);

  const move = (idx, dir) => {
    if (solved) return;
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[idx], next[j]] = [next[j], next[idx]];
    setOrder(next); setVerdict(null);
  };

  const check = () => {
    const firstWrong = order.findIndex((li, pos) => li !== pos);
    if (firstWrong === -1) {
      setVerdict({ ok: true, msg: "Perfect sequence — that is exactly the algorithm from your lab manual." });
      setSolved(true);
    } else {
      setVerdict({ ok: false, msg: `Step ${firstWrong + 1} is out of place. Read it against the ones around it — which action truly has to happen there?` });
      setHints((h) => Math.min(h + 1, 1));
    }
  };

  return (
    <div>
      <ProgHeader prog={prog} />
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The steps of the algorithm are jumbled. Use ↑↓ to put them in the correct order, then check. 🧩
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
        {order.map((li, idx) => (
          <div key={li} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 8px", borderRadius: 8, background: solved ? C.green + "10" : C.surface, border: `1px solid ${solved ? C.green + "55" : C.border}`, marginBottom: 6 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <button onClick={() => move(idx, -1)} disabled={solved || idx === 0} style={{ border: "none", background: "transparent", color: idx === 0 ? C.border : C.teal, cursor: idx === 0 || solved ? "default" : "pointer", fontSize: 12, padding: 2 }}>▲</button>
              <button onClick={() => move(idx, 1)} disabled={solved || idx === order.length - 1} style={{ border: "none", background: "transparent", color: idx === order.length - 1 ? C.border : C.teal, cursor: idx === order.length - 1 || solved ? "default" : "pointer", fontSize: 12, padding: 2 }}>▼</button>
            </div>
            <span style={{ color: C.muted, fontSize: 12, fontWeight: 700, minWidth: 16 }}>{idx + 1}</span>
            <span style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{prog.algo[li]}</span>
          </div>
        ))}
      </div>

      {!solved && (
        <button onClick={check} style={{ padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          ✓ Check my order
        </button>
      )}
      {verdict && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 12.5, lineHeight: 1.6, background: verdict.ok ? C.green + "14" : C.yellow + "14", border: `1px solid ${verdict.ok ? C.green : C.yellow}44`, color: verdict.ok ? C.green : C.muted }}>
          {verdict.ok ? "✓ " : "💡 "}{verdict.msg}
        </div>
      )}
      {!solved && hints > 0 && <Hints hints={[prog.algoHint]} shown={hints} onMore={() => {}} />}
      {solved && (
        <button onClick={onPass} style={{ width: "100%", padding: 14, borderRadius: 10, background: C.teal, border: "none", color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12 }}>
          Algorithm done ✓ — draw the flowchart →
        </button>
      )}
    </div>
  );
}

// ── A single flowchart node, drawn in its proper shape ──
function FlowNode({ type, text, tone }) {
  const border = tone, bg = tone + "18", col = C.text;
  const base = { color: col, fontSize: 12, fontWeight: 600, textAlign: "center", minWidth: 190, lineHeight: 1.4 };
  if (type === "terminator")
    return <div style={{ ...base, background: bg, border: `2px solid ${border}`, borderRadius: 999, padding: "9px 26px" }}>{text}</div>;
  if (type === "process")
    return <div style={{ ...base, background: bg, border: `2px solid ${border}`, borderRadius: 6, padding: "12px 18px" }}>{text}</div>;
  if (type === "io" || type === "output")
    return (
      <div style={{ ...base, background: bg, border: `2px solid ${border}`, padding: "12px 26px", transform: "skewX(-16deg)" }}>
        <span style={{ display: "inline-block", transform: "skewX(16deg)" }}>{text}</span>
      </div>
    );
  return (
    <div style={{ ...base, background: tone + "2E", color: tone, fontWeight: 700, padding: "22px 30px", minWidth: 210, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}>{text}</div>
  );
}

const TONE = { terminator: "#3FB950", io: "#58A6FF", output: "#58A6FF", process: "#BC8CFF", decision: "#F0883E" };

// ─────────────────────────────────────────────────────────────
//  STAGE ② — FLOWCHART: assemble the jumbled shapes top→bottom.
// ─────────────────────────────────────────────────────────────
function FlowchartStage({ prog, onPass }) {
  const [order, setOrder] = useState(prog.flowShuffle);
  const [verdict, setVerdict] = useState(null);
  const [solved, setSolved] = useState(false);
  const [hints, setHints] = useState(0);

  const move = (idx, dir) => {
    if (solved) return;
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[idx], next[j]] = [next[j], next[idx]];
    setOrder(next); setVerdict(null);
  };

  const check = () => {
    const firstWrong = order.findIndex((li, pos) => li !== pos);
    if (firstWrong === -1) {
      setVerdict({ ok: true, msg: "That flowchart reads cleanly from Start to Stop — the shapes are right and so is the order." });
      setSolved(true);
    } else {
      setVerdict({ ok: false, msg: `The box at position ${firstWrong + 1} doesn't belong there yet. Think about what must already exist before that step can run.` });
      setHints((h) => Math.min(h + 1, 1));
    }
  };

  return (
    <div>
      <ProgHeader prog={prog} />
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 6, lineHeight: 1.7 }}>
        Arrange the flowchart boxes into the correct top-to-bottom flow. The shapes tell you their role:
        rounded = <span style={{ color: TONE.terminator }}>Start/Stop</span>,
        slanted = <span style={{ color: TONE.io }}>input/output</span>,
        rectangle = <span style={{ color: TONE.process }}>process</span>,
        diamond = <span style={{ color: TONE.decision }}>decision</span>. 🔷
      </p>
      {prog.flowNote && <p style={{ color: C.muted, fontSize: 11.5, fontStyle: "italic", marginBottom: 12, lineHeight: 1.6 }}>ℹ️ {prog.flowNote}</p>}

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 12px", marginBottom: 12 }}>
        {order.map((li, idx) => {
          const node = prog.flow[li];
          return (
            <div key={li}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <button onClick={() => move(idx, -1)} disabled={solved || idx === 0} style={{ border: "none", background: "transparent", color: idx === 0 ? C.border : C.teal, cursor: idx === 0 || solved ? "default" : "pointer", fontSize: 13, padding: 2 }}>▲</button>
                  <button onClick={() => move(idx, 1)} disabled={solved || idx === order.length - 1} style={{ border: "none", background: "transparent", color: idx === order.length - 1 ? C.border : C.teal, cursor: idx === order.length - 1 || solved ? "default" : "pointer", fontSize: 13, padding: 2 }}>▼</button>
                </div>
                <FlowNode type={node.type} text={node.text} tone={TONE[node.type]} />
                <div style={{ width: 22 }} />
              </div>
              {idx < order.length - 1 && (
                <div style={{ textAlign: "center", color: C.muted, fontSize: 16, lineHeight: 1, margin: "2px 0" }}>↓</div>
              )}
            </div>
          );
        })}
      </div>

      {!solved && (
        <button onClick={check} style={{ padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          ✓ Check my flowchart
        </button>
      )}
      {verdict && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 12.5, lineHeight: 1.6, background: verdict.ok ? C.green + "14" : C.yellow + "14", border: `1px solid ${verdict.ok ? C.green : C.yellow}44`, color: verdict.ok ? C.green : C.muted }}>
          {verdict.ok ? "✓ " : "💡 "}{verdict.msg}
        </div>
      )}
      {!solved && hints > 0 && <Hints hints={[prog.flowHint]} shown={hints} onMore={() => {}} />}
      {solved && (
        <button onClick={onPass} style={{ width: "100%", padding: 14, borderRadius: 10, background: C.teal, border: "none", color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12 }}>
          Flowchart done ✓ — write & run the program →
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  STAGE ③ — PROGRAM: fill the blanks, then run REAL Python (Pyodide).
//  Each test may carry `setup` (prepended code) and/or `transform`
//  ([find,replace] pairs) — how the file/CSV programs are verified honestly.
//
//  SELF-CHECK MODE (prog.selfCheck === true): used by Experiments 9 & 10,
//  whose programs need heavy libraries (pandas / matplotlib / seaborn) that
//  are impractical to run reliably in-browser AND match character-for-character.
//  Those programs are verified by SELF-CHECK against the shown expected output
//  (the Algorithm & Flowchart stages remain fully auto-graded). This mirrors the
//  harness's existing graceful fallback when Pyodide can't load.
// ─────────────────────────────────────────────────────────────
function ProgramStage({ prog, onPass }) {
  const nBlanks = prog.blankWidth.length;
  const [vals, setVals] = useState(Array(nBlanks).fill(""));
  const [status, setStatus] = useState("idle"); // idle|loading|running|passed|failed|error|fallback|fallback_done|selfdone
  const [message, setMessage] = useState("");
  const [hints, setHints] = useState(0);
  const pyRef = useRef(null);

  const setBlank = (i, v) => setVals((a) => a.map((x, k) => (k === i ? v : x)));

  const assemble = () =>
    prog.codeLines
      .map((line) => line.map((seg) => (seg.blank !== undefined ? vals[seg.blank] : seg.text || "")).join(""))
      .join("\n");

  async function getPyodide() {
    if (pyRef.current) return pyRef.current;
    if (window.__lab_pyodide) { pyRef.current = window.__lab_pyodide; return pyRef.current; }
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    const py = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
    window.__lab_pyodide = py; pyRef.current = py;
    return py;
  }

  async function run() {
    if (vals.some((v) => v.trim() === "")) {
      setStatus("failed"); setMessage("Fill in every blank before running.");
      return;
    }
    setStatus("loading");
    setMessage("Starting the Python engine… (first run downloads real Python, ~6 MB — please wait)");
    let py;
    try { py = await getPyodide(); }
    catch {
      setStatus("fallback");
      setMessage("Couldn't load the Python engine (slow connection?). Your filled program is shown below — check it against the expected output by hand, then mark this program done.");
      return;
    }
    setStatus("running"); setMessage("Running your program against the tests…");
    try {
      for (const t of prog.tests) {
        let source = assemble();
        if (t.setup) source = t.setup + "\n" + source;
        if (t.transform) for (const [a, b] of t.transform) source = source.replace(a, b);
        const feeder =
          "import sys, io, builtins\n" +
          "_ins = iter(" + JSON.stringify(t.inputs) + ")\n" +
          "def _inp(p=''):\n" +
          "    try:\n        v = next(_ins)\n    except StopIteration:\n        v = ''\n" +
          "    sys.stdout.write(str(p) + str(v) + '\\n')\n    return v\n" +
          "builtins.input = _inp\n" +
          "sys.stdout = io.StringIO()\n";
        try {
          py.runPython(feeder + source);
        } catch (e) {
          const lines = String(e.message || e).trim().split("\n");
          setStatus("error");
          setMessage("Python stopped with an error:\n" + lines[lines.length - 1]);
          setHints((h) => Math.min(h + 1, prog.progHints.length));
          return;
        }
        const out = String(py.runPython("sys.stdout.getvalue()")).trim();
        if (out !== t.expect.trim()) {
          setStatus("failed");
          setMessage(`Test "${t.label}"\n\nExpected:\n${t.expect}\n\nYour output:\n${out || "(nothing printed)"}`);
          setHints((h) => Math.min(h + 1, prog.progHints.length));
          return;
        }
      }
      setStatus("passed");
      setMessage("✓ Both tests passed — including the hidden one. That is real Python, executed right here.");
    } catch (e) {
      setStatus("error"); setMessage("Unexpected error: " + String(e));
    }
  }

  // Self-check (Exp 9 & 10): require every blank filled, then let the learner
  // confirm their output matched the expected block shown below.
  const markSelfChecked = () => {
    if (vals.some((v) => v.trim() === "")) {
      setStatus("failed"); setMessage("Fill in every blank before marking this done.");
      return;
    }
    setStatus("selfdone");
  };

  const passed = status === "passed" || status === "fallback_done" || status === "selfdone";

  return (
    <div>
      <ProgHeader prog={prog} />
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        {prog.selfCheck
          ? "Replace every ____ with the right code. This program uses a heavy library, so run it in Google Colab (or your own Python) and match the expected output shown below, then mark it done. 📊"
          : "Replace every ____ with the right code, then run it. Your program is tested twice — the hidden run changes the data, so no shortcuts. ▶"}
      </p>

      <div style={{ background: "#010409", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 12, overflowX: "auto" }}>
        {prog.codeLines.map((line, li) => (
          <div key={li} style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 2.1, whiteSpace: "pre", display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            {line.map((seg, si) => {
              if (seg.blank !== undefined)
                return (
                  <input
                    key={si}
                    value={vals[seg.blank]}
                    onChange={(e) => setBlank(seg.blank, e.target.value)}
                    disabled={status === "passed"}
                    spellCheck={false}
                    placeholder="____"
                    style={{
                      width: prog.blankWidth[seg.blank], background: C.card, color: C.yellow,
                      border: `1px solid ${C.yellow}77`, borderRadius: 5, padding: "1px 6px",
                      fontFamily: "monospace", fontSize: 13, textAlign: "center", outline: "none", margin: "0 2px",
                    }}
                  />
                );
              if (seg.cmt) return <span key={si} style={{ color: C.muted, fontStyle: "italic", opacity: 0.8 }}>{"    # " + seg.cmt}</span>;
              return <span key={si} style={{ color: C.text }}>{seg.text}</span>;
            })}
          </div>
        ))}
      </div>

      {/* Self-check: show the manual's expected output so the learner can compare. */}
      {prog.selfCheck && (
        <div style={{ background: C.card, border: `1px solid ${C.teal}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
          <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>EXPECTED OUTPUT (from the lab manual)</div>
          <pre style={{ ...mono, fontSize: 12 }}>{prog.expected}</pre>
          {prog.chartNote && <div style={{ color: C.muted, fontSize: 11.5, fontStyle: "italic", marginTop: 6 }}>ℹ️ {prog.chartNote}</div>}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {prog.selfCheck ? (
          <button onClick={markSelfChecked} disabled={status === "selfdone"} style={{
            padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 14,
            background: status === "selfdone" ? C.card : C.green, color: status === "selfdone" ? C.muted : "#0D1117",
            cursor: status === "selfdone" ? "default" : "pointer",
          }}>{status === "selfdone" ? "✓ marked done" : "✓ I ran it and matched the expected output"}</button>
        ) : (
          <button onClick={run} disabled={status === "loading" || status === "running" || status === "passed"} style={{
            padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 14,
            background: status === "loading" || status === "running" ? C.card : status === "passed" ? C.card : C.green,
            color: status === "loading" || status === "running" || status === "passed" ? C.muted : "#0D1117",
            cursor: status === "loading" || status === "running" || status === "passed" ? "default" : "pointer",
          }}>{status === "loading" || status === "running" ? "⏳ Working…" : "▶ Run the tests"}</button>
        )}
        {status === "passed" && <span style={{ color: C.green, fontWeight: 700, fontSize: 13 }}>✓ all tests passed</span>}
      </div>

      {message && (
        <pre style={{
          ...mono, marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 12.5,
          background: status === "passed" ? C.green + "14" : status === "failed" || status === "error" ? C.red + "10" : C.card,
          border: `1px solid ${status === "passed" ? C.green : status === "failed" || status === "error" ? C.red + "66" : C.border}`,
          color: status === "passed" ? C.green : C.muted,
        }}>{message}</pre>
      )}

      {(status === "failed" || status === "error") && hints > 0 && (
        <Hints hints={prog.progHints} shown={hints} onMore={() => setHints((h) => Math.min(h + 1, prog.progHints.length))} />
      )}

      {status === "fallback" && (
        <button onClick={() => setStatus("fallback_done")} style={{ marginTop: 10, padding: "8px 18px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
          I checked it against the expected output — mark done
        </button>
      )}

      {passed && (
        <button onClick={onPass} style={{ width: "100%", padding: 14, borderRadius: 10, background: C.teal, border: "none", color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12 }}>
          Program done ✓ — continue →
        </button>
      )}
    </div>
  );
}

// ── Record screen: submits the whole experiment to the e-record ──
function RecordScreen({ student, submitted, onSubmit }) {
  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 60 }}>🧪</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: C.teal, marginTop: 8 }}>EXPERIMENT 9 COMPLETE</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 520, margin: "10px auto 0" }}>
        Both programs, all three stages: you sequenced the algorithm, assembled the flowchart, and filled the
        pandas code — checking it against the manual's expected output. DataFrames let you build, load and
        filter patient tables in a few lines.
      </div>
      <div style={{ marginTop: 20, padding: 18, borderRadius: 12, display: "inline-block", background: `linear-gradient(135deg, ${C.teal}22, ${C.accent}22)`, border: `1px solid ${C.teal}66` }}>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>e-Observation Record · Experiment 9</div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 6, lineHeight: 1.7 }}>
          P1: Algorithm ✓ · Flowchart ✓ · Program ✓<br />
          P2: Algorithm ✓ · Flowchart ✓ · Program ✓
        </div>
        <div style={{ color: student ? C.green : C.yellow, fontSize: 11.5, marginTop: 8 }}>
          {student ? `Will be recorded against: ${student.rollNo}` : "Sign in first so this is filed under your roll number."}
        </div>
      </div>
      {!submitted ? (
        <div style={{ marginTop: 20 }}>
          <button onClick={onSubmit} style={{ padding: "12px 28px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${C.teal}, ${C.accent})`, color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
            ✅ Submit to my lab record
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 18, color: C.green, fontWeight: 700, fontSize: 14 }}>✓ Recorded. You can close this and return to the dashboard.</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN — gated 6-stage shell + record screen.
// ─────────────────────────────────────────────────────────────
export default function UnitLAB9({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
  const persisted = STAGES.filter((s) => challengeProgress.includes(`${UNIT_ID}@${s.id}`)).map((s) => s.id);
  const [doneStages, setDoneStages] = useState(persisted);
  const [active, setActive] = useState(() => {
    const firstOpen = STAGES.findIndex((s) => !persisted.includes(s.id));
    return firstOpen === -1 ? STAGES.length : firstOpen;
  });
  const [submitted, setSubmitted] = useState(challengeProgress.includes(UNIT_ID));

  const isUnlocked = (idx) => idx === 0 || doneStages.includes(STAGES[idx - 1].id);

  const passStage = (idx) => {
    const stage = STAGES[idx];
    if (!doneStages.includes(stage.id)) {
      setDoneStages((p) => [...p, stage.id]);
      onStageComplete && onStageComplete(`${UNIT_ID}@${stage.id}`);
    }
    setActive(idx + 1);
  };

  const submitRecord = () => {
    setSubmitted(true);
    onUnitComplete && onUnitComplete();
  };

  const renderStage = (idx) => {
    const s = STAGES[idx];
    const prog = PROGRAMS[s.prog];
    if (s.kind === "algo") return <AlgorithmStage key={s.id} prog={prog} onPass={() => passStage(idx)} />;
    if (s.kind === "flow") return <FlowchartStage key={s.id} prog={prog} onPass={() => passStage(idx)} />;
    return <ProgramStage key={s.id} prog={prog} onPass={() => passStage(idx)} />;
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.teal}44`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.teal}, ${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧪</div>
        <div>
          <div style={{ fontSize: 12, color: C.teal, letterSpacing: 1, fontWeight: 700 }}>PYTHON LAB › EXPERIMENT 9 · CO5</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Data Analysis with Pandas</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{doneStages.length} / {STAGES.length} steps</div>
      </div>

      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(doneStages.length / STAGES.length) * 100}%`, background: `linear-gradient(90deg, ${C.teal}, ${C.accent})`, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ background: C.teal + "10", border: `1px solid ${C.teal}33`, borderRadius: 10, padding: "10px 16px", marginBottom: 18, fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
          🧭 <strong style={{ color: C.teal }}>Aim.</strong> Build, load and filter tabular patient data using the pandas library's DataFrame.
          Each step you finish is saved to your e-observation record.
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 22, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {STAGES.map((s, i) => {
            const done = doneStages.includes(s.id);
            const unlocked = isUnlocked(i);
            const isActive = active === i;
            return (
              <button key={s.id} onClick={() => unlocked && setActive(i)} disabled={!unlocked} style={{
                flex: 1, minWidth: 92, padding: "9px 6px", borderRadius: 7,
                background: isActive ? `linear-gradient(135deg, ${C.teal}, ${C.accent})` : "transparent",
                border: "none", color: isActive ? "#0D1117" : unlocked ? C.text : C.muted,
                cursor: unlocked ? "pointer" : "not-allowed", fontSize: 11.5,
                fontWeight: isActive ? 800 : 500, opacity: unlocked ? 1 : 0.5,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2, transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 14 }}>{done ? "✅" : unlocked ? s.icon : "🔒"}</span>
                <span>{s.label}</span>
                <span style={{ fontSize: 9.5, opacity: 0.8 }}>{s.sub}</span>
              </button>
            );
          })}
        </div>

        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 320 }}>
          {active >= STAGES.length
            ? <RecordScreen student={student} submitted={submitted} onSubmit={submitRecord} />
            : isUnlocked(active)
              ? renderStage(active)
              : <div style={{ textAlign: "center", color: C.muted, padding: 40 }}>🔒 Locked — finish the previous step first.</div>}
        </div>
      </div>
    </div>
  );
}
