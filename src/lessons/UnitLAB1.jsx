// UnitLAB1 — 🧪 Python Lab · Experiment 1 (e-observation record)
// Data Types, Operators & Conditional Statements (CO1).
// TWO programs, each with THREE gated stages: Algorithm (reorder) →
// Flowchart (assemble the shapes) → Program (fill the blanks & run real
// Python via Pyodide). Each stage completion persists as a pseudo-unitId
// (e.g. "UnitLAB1@p1_algo") through the SAME onStageComplete plumbing the
// Crucible uses — so for a signed-in student every stage is logged to the
// Events/Progress sheet against their roll number. That sheet IS the
// teacher's e-observation notebook. The final "Submit to record" calls
// onUnitComplete, marking the whole experiment done.
import { useState, useRef } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const UNIT_ID = "UnitLAB1";
const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };

// ─────────────────────────────────────────────────────────────
//  EXPERIMENT DATA — everything specific to Experiment 1 lives here.
//  Both programs come straight from the MED23CL202 lab manual.
// ─────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    key: "p1",
    title: "Program 1 — Arithmetic on Patient Vitals (BMI)",
    aim: "Read a patient's weight (kg) and height (m) and compute BMI = weight / (height²).",

    // Algorithm: correct order + a fixed scramble (indices into algo[]).
    algo: [
      "Read weight as a float.",
      "Read height as a float.",
      "Compute bmi = weight / (height squared).",
      "Print the BMI rounded to 2 decimals.",
    ],
    algoShuffle: [2, 0, 3, 1],
    algoHint: "Nothing can be computed before its inputs are read; nothing printed before it is computed.",

    // Flowchart: correct top→bottom order of typed shapes + a scramble.
    flow: [
      { type: "terminator", text: "Start" },
      { type: "io", text: "Read weight, height" },
      { type: "process", text: "bmi = weight / (height²)" },
      { type: "output", text: "Print BMI (2 dp)" },
      { type: "terminator", text: "Stop" },
    ],
    flowShuffle: [2, 4, 0, 3, 1],
    flowHint: "A flowchart always begins and ends with a rounded terminator; input comes before processing, processing before output.",

    // Program: fill-in-the-blanks. Lines are token arrays; a {blank:i}
    // becomes an input box. Validation is by RUNNING, never by string match,
    // so any correct fill passes and a hidden test defeats hard-coding.
    codeLines: [
      [{ text: 'weight = float(input("Enter weight in kg: "))' }],
      [{ text: "height = " }, { blank: 0 }, { text: '(input("Enter height in m: "))' }, { cmt: "text → decimal" }],
      [{ text: "bmi = weight / (height " }, { blank: 1 }, { text: " 2)" }, { cmt: "raise to the power" }],
      [{ text: 'print("Patient BMI =", ' }, { blank: 2 }, { text: "(bmi, 2))" }, { cmt: "rounds to 2 dp" }],
    ],
    blankWidth: [58, 34, 58],
    tests: [
      { inputs: ["60", "1.6"], expect: "Enter weight in kg: 60\nEnter height in m: 1.6\nPatient BMI = 23.44", label: "weight 60, height 1.6 → 23.44" },
      { inputs: ["72", "1.8"], expect: "Enter weight in kg: 72\nEnter height in m: 1.8\nPatient BMI = 22.22", label: "hidden vitals → their BMI", hidden: true },
    ],
    progHints: [
      "float(...) converts the typed text into a decimal number.",
      "** raises to a power, and round(x, 2) keeps two decimals. So the three blanks are: float, **, round.",
    ],
  },

  {
    key: "p2",
    title: "Program 2 — Body-Temperature Unit Converter",
    aim: "Offer a menu — (1) C→F, (2) F→C — read the choice and a temperature, and convert it using if / elif / else.",

    algo: [
      "Print the menu and read choice (int) and temp (float).",
      "If choice is 1 → convert Celsius to Fahrenheit.",
      "Else if choice is 2 → convert Fahrenheit to Celsius.",
      "Else → print 'Invalid choice'.",
      "Print the converted temperature.",
    ],
    algoShuffle: [3, 1, 4, 0, 2],
    algoHint: "Read the input first; then the if / elif / else ladder is checked top-to-bottom; the 'else' fallback is always last.",

    flow: [
      { type: "terminator", text: "Start" },
      { type: "output", text: "Print menu" },
      { type: "io", text: "Read choice, temp" },
      { type: "decision", text: "choice == 1 ?" },
      { type: "process", text: "Convert & print temperature" },
      { type: "terminator", text: "Stop" },
    ],
    flowShuffle: [3, 0, 5, 1, 4, 2],
    flowHint: "Menu is shown (output) before the values are read (input); the diamond decision comes after we have the values; terminators cap both ends.",
    flowNote: "This is a simplified single-decision view. Drawing the full Yes/No branches of the if/elif/else ladder is the enrichment step your faculty may add next.",

    codeLines: [
      [{ text: 'print("1. Celsius to Fahrenheit")' }],
      [{ text: 'print("2. Fahrenheit to Celsius")' }],
      [{ text: 'choice = int(input("Enter choice: "))' }],
      [{ text: 'temp = float(input("Enter temperature: "))' }],
      [{ text: "if choice " }, { blank: 0 }, { text: " 1:" }, { cmt: "is equal to" }],
      [{ text: '    print("Converted temperature =", temp * 9/5 + 32)' }],
      [{ blank: 1 }, { text: " choice == 2:" }, { cmt: "otherwise-if" }],
      [{ text: '    print("Converted temperature =", round((temp - 32) * 5/9, 2))' }],
      [{ blank: 2 }, { text: ":" }, { cmt: "none of the above" }],
      [{ text: '    print("Invalid choice")' }],
    ],
    blankWidth: [34, 46, 46],
    tests: [
      { inputs: ["1", "37"], expect: "1. Celsius to Fahrenheit\n2. Fahrenheit to Celsius\nEnter choice: 1\nEnter temperature: 37\nConverted temperature = 98.6", label: "choice 1, temp 37 → 98.6" },
      { inputs: ["2", "98.6"], expect: "1. Celsius to Fahrenheit\n2. Fahrenheit to Celsius\nEnter choice: 2\nEnter temperature: 98.6\nConverted temperature = 37.0", label: "hidden choice → its conversion", hidden: true },
    ],
    progHints: [
      "== tests equality; elif is the 'otherwise-if' branch; else is the catch-all.",
      "Fill the three blanks with: ==, elif, else.",
    ],
  },
];

// Six stages = 2 programs × 3 stages, gated in this exact order.
const STAGES = [
  { id: "p1_algo", prog: 0, kind: "algo", label: "Algorithm", sub: "Program 1", icon: "①" },
  { id: "p1_flow", prog: 0, kind: "flow", label: "Flowchart", sub: "Program 1", icon: "①" },
  { id: "p1_prog", prog: 0, kind: "prog", label: "Program", sub: "Program 1", icon: "①" },
  { id: "p2_algo", prog: 1, kind: "algo", label: "Algorithm", sub: "Program 2", icon: "②" },
  { id: "p2_flow", prog: 1, kind: "flow", label: "Flowchart", sub: "Program 2", icon: "②" },
  { id: "p2_prog", prog: 1, kind: "prog", label: "Program", sub: "Program 2", icon: "②" },
];

// ── Hint box: reveals one nudge at a time, never the answer ──
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

// Small header shown on every stage so the learner always knows which
// program and what its aim is.
function ProgHeader({ prog }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
      <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{prog.title}</div>
      <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6, marginTop: 4 }}>🎯 {prog.aim}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  STAGE 1 — ALGORITHM: reorder the jumbled steps into sequence.
//  Algorithm steps here are strictly sequential, so the check is
//  an exact-order match, with feedback on the first misplaced step.
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
    // Correct == the steps in their natural 0,1,2,… index order.
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
    // Parallelogram: skew the box, un-skew the label so text stays upright.
    return (
      <div style={{ ...base, background: bg, border: `2px solid ${border}`, padding: "12px 26px", transform: "skewX(-16deg)" }}>
        <span style={{ display: "inline-block", transform: "skewX(16deg)" }}>{text}</span>
      </div>
    );
  // decision: a diamond via clip-path, tinted fill (clip-path can't show a
  // border, so we rely on the fill + coloured text to read as a diamond).
  return (
    <div style={{ ...base, background: tone + "2E", color: tone, fontWeight: 700, padding: "22px 30px", minWidth: 210, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}>{text}</div>
  );
}

const TONE = { terminator: "#3FB950", io: "#58A6FF", output: "#58A6FF", process: "#BC8CFF", decision: "#F0883E" };

// ─────────────────────────────────────────────────────────────
//  STAGE 2 — FLOWCHART: assemble the jumbled shapes top→bottom.
//  The current order renders LIVE as a real flowchart (shapes +
//  ↓ connectors); ↑↓ reorder; exact-order validation.
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
      setVerdict({ ok: false, msg: `The box at position ${firstWrong + 1} doesn't belong there yet. Think about what a computer must know before it can do that step.` });
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

      {/* Live flowchart: shapes with reorder controls and ↓ connectors. */}
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
//  STAGE 3 — PROGRAM: fill the blanks, then run REAL Python
//  (Pyodide) against two tests — one visible, one hidden — with
//  input() echoed to stdout so the console matches the manual's
//  "Expected output" exactly.
// ─────────────────────────────────────────────────────────────
function ProgramStage({ prog, onPass }) {
  const nBlanks = prog.blankWidth.length;
  const [vals, setVals] = useState(Array(nBlanks).fill(""));
  const [status, setStatus] = useState("idle"); // idle|loading|running|passed|failed|error|fallback
  const [message, setMessage] = useState("");
  const [hints, setHints] = useState(0);
  const pyRef = useRef(null);

  const setBlank = (i, v) => setVals((a) => a.map((x, k) => (k === i ? v : x)));

  // Rebuild the full source by dropping the student's text into each blank.
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
    const source = assemble();
    try {
      for (const t of prog.tests) {
        // Feed the test's inputs to input(), echoing prompt+value like a
        // real terminal so the captured console matches the manual exactly.
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

  const passed = status === "passed" || status === "fallback_done";

  return (
    <div>
      <ProgHeader prog={prog} />
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Replace every <code style={{ color: C.teal }}>____</code> with the right code, then run it. Your
        program is tested twice — the second run uses hidden values, so no shortcuts. ▶
      </p>

      {/* The fill-in program, rendered line by line with input boxes. */}
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

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={run} disabled={status === "loading" || status === "running" || status === "passed"} style={{
          padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 14,
          background: status === "loading" || status === "running" ? C.card : status === "passed" ? C.card : C.green,
          color: status === "loading" || status === "running" || status === "passed" ? C.muted : "#0D1117",
          cursor: status === "loading" || status === "running" || status === "passed" ? "default" : "pointer",
        }}>{status === "loading" || status === "running" ? "⏳ Working…" : "▶ Run the tests"}</button>
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

      {/* Offline fallback: let the learner self-confirm and move on. */}
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
// onUnitComplete unloads the lesson back to the Dashboard, so (as with the
// Crucible badge) it must be SEEN first and confirmed with a button.
function RecordScreen({ student, submitted, onSubmit }) {
  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 60 }}>🧪</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: C.teal, marginTop: 8 }}>EXPERIMENT 1 COMPLETE</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 520, margin: "10px auto 0" }}>
        Both programs, all three stages: you sequenced the algorithm, assembled the flowchart, and ran real
        Python that passed the hidden test. Data types, operators and conditional statements — done.
      </div>
      <div style={{ marginTop: 20, padding: 18, borderRadius: 12, display: "inline-block", background: `linear-gradient(135deg, ${C.teal}22, ${C.accent}22)`, border: `1px solid ${C.teal}66` }}>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>e-Observation Record · Experiment 1</div>
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
//  MAIN — gated 6-stage shell + record screen. Mirrors the
//  Crucible's persistence: each stage saved as UNIT_ID@stageId,
//  the finale via onUnitComplete.
// ─────────────────────────────────────────────────────────────
export default function UnitLAB1({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
  const persisted = STAGES.filter((s) => challengeProgress.includes(`${UNIT_ID}@${s.id}`)).map((s) => s.id);
  const [doneStages, setDoneStages] = useState(persisted);
  const [active, setActive] = useState(() => {
    const firstOpen = STAGES.findIndex((s) => !persisted.includes(s.id));
    return firstOpen === -1 ? STAGES.length : firstOpen; // length = record screen
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
      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.teal}44`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.teal}, ${C.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧪</div>
        <div>
          <div style={{ fontSize: 12, color: C.teal, letterSpacing: 1, fontWeight: 700 }}>PYTHON LAB › EXPERIMENT 1 · CO1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Data Types, Operators & Conditional Statements</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{doneStages.length} / {STAGES.length} steps</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(doneStages.length / STAGES.length) * 100}%`, background: `linear-gradient(90deg, ${C.teal}, ${C.accent})`, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ background: C.teal + "10", border: `1px solid ${C.teal}33`, borderRadius: 10, padding: "10px 16px", marginBottom: 18, fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
          🧭 <strong style={{ color: C.teal }}>Aim.</strong> Store and manipulate different data types, apply arithmetic,
          relational and logical operators, and take decisions using conditional statements — on patient-health data.
          Each step you finish is saved to your e-observation record.
        </div>

        {/* Stage strip: 6 chips grouped by program, sequentially gated. */}
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
