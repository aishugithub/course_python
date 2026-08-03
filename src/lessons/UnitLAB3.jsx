// UnitLAB3 — 🧪 Python Lab · Experiment 3 (e-observation record)
// Classes, Objects & Encapsulation (CO2 · Sessions 5–6).
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
//                          brick (e.g. "UnitLAB3@p1_algo") to the Events/
//                          Progress sheet — the teacher's e-observation book.
//
// The unit contains TWO lab programs, and each program is broken into
// THREE gated stages the student must clear in order:
//   ① Algorithm  — reorder the jumbled steps into the correct sequence
//   ② Flowchart  — reorder typed shape-nodes into a valid top→bottom chart
//   ③ Program    — fill the blanks, then RUN real Python (Pyodide) against a
//                  VISIBLE test and a HIDDEN anti-hard-coding test
// So there are 2 × 3 = 6 stages total, plus a final "record" screen.
//
// EXPERIMENT-3 NOTE. Both programs here are class-based and driven by
// literal values (no input()), so a hidden test cannot differ by
// keystrokes. Instead each program's hidden test carries a `transform`
// (an array of [find, replace] pairs) applied to the assembled source
// before it runs — swapping the literals so any hard-coded print fails
// while genuine object logic still passes. See ProgramStage.run below.
// Program spec (code, blanks, expected output) is taken verbatim from
// the MED23CL202 lab manual, Experiment 3 (pages 10–12).
import { useState, useRef } from "react";

// ── Brand palette — identical tokens across every lab unit ──
const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// UNIT_ID prefixes every persisted pseudo-unitId for this experiment.
const UNIT_ID = "UnitLAB3";
// Shared monospace style for code/console blocks.
const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };

// ─────────────────────────────────────────────────────────────
//  EXPERIMENT DATA — everything specific to Experiment 3 lives here.
//  Each program object carries the data all three stages consume:
//    algo[]/algoShuffle[]/algoHint      → Stage ① Algorithm
//    flow[]/flowShuffle[]/flowHint/flowNote → Stage ② Flowchart
//    codeLines[]/blankWidth[]/tests[]/progHints[] → Stage ③ Program
// ─────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    key: "p1",
    title: "Program 1 — A Simple Patient Class",
    aim: "Model a patient as a class with name and age attributes plus a show() method, then build one object and display it.",

    // Stage ① — the algorithm, in correct order, with a fixed scramble
    // (indices INTO algo[]). Wording follows the manual's numbered steps.
    algo: [
      "Define a class Patient with __init__(self, name, age).",
      "Inside __init__, store name and age on self.",
      "Add a show() method that prints the name and age.",
      'Create p1 = Patient("Ravi", 45) and call p1.show().',
    ],
    algoShuffle: [2, 0, 3, 1],
    algoHint: "A class must be defined before an object of it can be built; the attributes must be stored inside the constructor before show() can print them.",

    // Stage ② — the flowchart, as typed shape-nodes. Object creation is a
    // 'process' box; the actual printing is the 'output' parallelogram.
    flow: [
      { type: "terminator", text: "Start" },
      { type: "process", text: "Define class Patient — __init__ stores name, age on self" },
      { type: "process", text: "Define method show() to print the details" },
      { type: "process", text: 'Create object  p1 = Patient("Ravi", 45)' },
      { type: "process", text: "Call  p1.show()" },
      { type: "output", text: "Print:  Name: Ravi | Age: 45" },
      { type: "terminator", text: "Stop" },
    ],
    flowShuffle: [1, 3, 0, 5, 2, 6, 4],
    flowHint: "Start and Stop are the rounded caps. The class (with its constructor) must be defined first, then the method, THEN an object can be created and its show() called; printing is the very last real step before Stop.",
    flowNote: "A class definition has no diamond here — creating the object and calling show() are ordinary process boxes. The single 'Print' parallelogram is what show() itself does when it runs.",

    // Stage ③ — fill-in-the-blanks. Segments are {text} (fixed), {blank:i}
    // (an input box), or {cmt} (an italic trailing comment). Validation is by
    // RUNNING real Python, so any correct fill passes; the hidden transform
    // then swaps the patient so a hard-coded print is caught.
    codeLines: [
      [{ text: "class Patient:" }],
      [{ text: "    def __init__(self, name, age):" }],
      [{ text: "        self.name = name" }, { cmt: "store the name on the object" }],
      [{ text: "        self." }, { blank: 0 }, { text: " = age" }, { cmt: "store the age on the object" }],
      [{ text: "    def show(self):" }],
      [{ text: '        print("Name:", self.name, "| Age:", self.age)' }],
      [{ text: "p1 = " }, { blank: 1 }, { text: '("Ravi", 45)' }, { cmt: "create a Patient object" }],
      [{ text: "p1.show()" }],
    ],
    blankWidth: [40, 74],
    tests: [
      { inputs: [], expect: "Name: Ravi | Age: 45", label: 'Patient("Ravi", 45) → Name: Ravi | Age: 45' },
      // Hidden: swap the patient's literals so hard-coding the printed line
      // fails, while a program that truly reads self.name/self.age passes.
      { inputs: [], transform: [["Ravi", "Meena"], ["45", "30"]], expect: "Name: Meena | Age: 30", label: "hidden patient → their details", hidden: true },
    ],
    progHints: [
      "The second attribute is stored exactly like the first: self.<name> = <value>. Here the attribute is age.",
      'You build an object by calling the class like a function. So the two blanks are: age and Patient.',
    ],
  },

  {
    key: "p2",
    title: "Program 2 — A Validating Setter",
    aim: "Protect a private __temp so it is stored only when the value is a realistic human temperature (30–45 °C), using a setter and a getter.",

    algo: [
      "Define VitalRecord whose __init__ sets a private __temp = 0.0.",
      "Write set_temp(value): store it only if 30.0 ≤ value ≤ 45.0, else print 'Rejected'.",
      "Write get_temp() that returns the stored __temp.",
      "Build an object, try a valid value then an invalid one, then read it back.",
    ],
    algoShuffle: [3, 1, 0, 2],
    algoHint: "The class and its methods must exist before an object can use them; and you can only read a value back after the setter has had a chance to store it.",

    // The range check lives INSIDE set_temp; we surface it as one decision
    // diamond, then a Yes/No process box — honest but simplified (flowNote).
    flow: [
      { type: "terminator", text: "Start" },
      { type: "process", text: "Define VitalRecord — __init__ sets private __temp = 0.0" },
      { type: "process", text: "Define set_temp(value) and get_temp()" },
      { type: "process", text: "v = VitalRecord(); call set_temp(37.5), then set_temp(99)" },
      { type: "decision", text: "30.0 ≤ value ≤ 45.0 ?" },
      { type: "process", text: "Yes → store value    No → print 'Rejected'" },
      { type: "output", text: "Print:  Stored temperature: 37.5" },
      { type: "terminator", text: "Stop" },
    ],
    flowShuffle: [3, 0, 5, 1, 7, 2, 6, 4],
    flowHint: "Define the class and its two methods first, then create the object and make the two calls; the diamond is the setter's guard, and only after both calls does get_temp() feed the final print.",
    flowNote: "The diamond and the Yes/No box live INSIDE set_temp — they run once per call. On the valid call (37.5) the value is stored; on the invalid call (99) the No branch prints 'Rejected'. The final print reads the stored value through get_temp().",

    codeLines: [
      [{ text: "class VitalRecord:" }],
      [{ text: "    def __init__(self):" }],
      [{ text: "        self.__temp = 0.0" }, { cmt: "private temperature store" }],
      [{ text: "    def set_temp(self, value):" }],
      [{ text: "        if 30.0 <= value <= 45.0:" }],
      [{ text: "            self.__temp = value" }],
      [{ text: "        else:" }],
      [{ text: '            print("Rejected: unrealistic temperature")' }],
      [{ text: "    def get_temp(self):" }],
      [{ text: "        return self.__temp" }, { cmt: "controlled read access" }],
      [{ text: "v = VitalRecord()" }],
      [{ text: "v.set_temp(37.5)" }, { cmt: "valid -> stored" }],
      [{ text: "v.set_temp(" }, { blank: 0 }, { text: ")" }, { cmt: "invalid (e.g. 99) -> rejected" }],
      [{ text: 'print("Stored temperature:", v.' }, { blank: 1 }, { text: "())" }, { cmt: "call the getter" }],
    ],
    blankWidth: [46, 82],
    tests: [
      { inputs: [], expect: "Rejected: unrealistic temperature\nStored temperature: 37.5", label: "37.5 stored, 99 rejected" },
      // Hidden: change BOTH the valid and invalid literals. 40.0 is still
      // valid (stored), 20 is still invalid (rejected) — proving the guard
      // truly runs rather than a hard-coded 37.5 being echoed back.
      { inputs: [], transform: [["37.5", "40.0"], ["99", "20"]], expect: "Rejected: unrealistic temperature\nStored temperature: 40.0", label: "hidden values → guard still runs", hidden: true },
    ],
    progHints: [
      "Any value outside 30–45 must be rejected — 99 is a good invalid test. Read the stored value back through the getter.",
      "The getter is named get_temp. So the two blanks are: 99 and get_temp.",
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

// Small header shown on every stage so the learner always knows which
// program they are on and what its aim is.
function ProgHeader({ prog }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
      <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{prog.title}</div>
      <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6, marginTop: 4 }}>🎯 {prog.aim}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  STAGE ① — ALGORITHM: reorder the jumbled steps into sequence.
//  The steps are strictly sequential, so the check is an exact-order
//  match, reporting the first misplaced step for guidance.
// ─────────────────────────────────────────────────────────────
function AlgorithmStage({ prog, onPass }) {
  const [order, setOrder] = useState(prog.algoShuffle);
  const [verdict, setVerdict] = useState(null);
  const [solved, setSolved] = useState(false);
  const [hints, setHints] = useState(0);

  // Swap the item at idx with its neighbour in direction dir (-1 up, +1 down).
  const move = (idx, dir) => {
    if (solved) return;
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[idx], next[j]] = [next[j], next[idx]];
    setOrder(next); setVerdict(null);
  };

  const check = () => {
    // Correct == indices back in their natural 0,1,2,… order.
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
  // decision: a diamond via clip-path, tinted fill + coloured text.
  return (
    <div style={{ ...base, background: tone + "2E", color: tone, fontWeight: 700, padding: "22px 30px", minWidth: 210, clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}>{text}</div>
  );
}

const TONE = { terminator: "#3FB950", io: "#58A6FF", output: "#58A6FF", process: "#BC8CFF", decision: "#F0883E" };

// ─────────────────────────────────────────────────────────────
//  STAGE ② — FLOWCHART: assemble the jumbled shapes top→bottom.
//  The current order renders LIVE as a real flowchart (shapes + ↓
//  connectors); ↑↓ reorder; exact-order validation.
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
//  STAGE ③ — PROGRAM: fill the blanks, then run REAL Python (Pyodide)
//  against a visible test and a hidden one. For class programs the
//  hidden test uses a `transform` to swap literals (see run()). A
//  `setup` string, if present on a test, is prepended before running
//  (used by later experiments that need a file on disk first).
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

  // Load Pyodide once, caching it on window so every lab stage shares it.
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
        // Rebuild the student's source per test.
        let source = assemble();
        // `setup` (optional): code that must run BEFORE the program — e.g. to
        // create a file on Pyodide's in-memory disk, making a read program
        // self-contained. Prepended verbatim.
        if (t.setup) source = t.setup + "\n" + source;
        // `transform` (optional): [find, replace] pairs applied to the source.
        // Class programs use literal values (not blanks) for their data, so
        // this is how a hidden test genuinely differs — swapping the literals
        // defeats hard-coded prints while real object logic still passes.
        if (t.transform) for (const [a, b] of t.transform) source = source.replace(a, b);
        // Feed the test's inputs to input(), echoing prompt+value like a real
        // terminal so the captured console matches the manual exactly.
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
        program is tested twice — the second run swaps the values, so no shortcuts. ▶
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
// onUnitComplete unloads the lesson back to the Dashboard, so it must be
// SEEN first and confirmed with a button (never auto-fired).
function RecordScreen({ student, submitted, onSubmit }) {
  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 60 }}>🧪</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: C.teal, marginTop: 8 }}>EXPERIMENT 3 COMPLETE</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 520, margin: "10px auto 0" }}>
        Both programs, all three stages: you sequenced the algorithm, assembled the flowchart, and ran real
        Python that passed the hidden test. Classes, objects and encapsulation — modelled on real medical data.
      </div>
      <div style={{ marginTop: 20, padding: 18, borderRadius: 12, display: "inline-block", background: `linear-gradient(135deg, ${C.teal}22, ${C.accent}22)`, border: `1px solid ${C.teal}66` }}>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>e-Observation Record · Experiment 3</div>
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
export default function UnitLAB3({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
  // Which stages are already done (from a previous visit)?
  const persisted = STAGES.filter((s) => challengeProgress.includes(`${UNIT_ID}@${s.id}`)).map((s) => s.id);
  const [doneStages, setDoneStages] = useState(persisted);
  // Open the first not-yet-done stage; if all are done, jump to the record.
  const [active, setActive] = useState(() => {
    const firstOpen = STAGES.findIndex((s) => !persisted.includes(s.id));
    return firstOpen === -1 ? STAGES.length : firstOpen; // length = record screen
  });
  const [submitted, setSubmitted] = useState(challengeProgress.includes(UNIT_ID));

  // A stage is unlocked when it's the first, or the previous one is done.
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
          <div style={{ fontSize: 12, color: C.teal, letterSpacing: 1, fontWeight: 700 }}>PYTHON LAB › EXPERIMENT 3 · CO2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Classes, Objects & Encapsulation</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{doneStages.length} / {STAGES.length} steps</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(doneStages.length / STAGES.length) * 100}%`, background: `linear-gradient(90deg, ${C.teal}, ${C.accent})`, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ background: C.teal + "10", border: `1px solid ${C.teal}33`, borderRadius: 10, padding: "10px 16px", marginBottom: 18, fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
          🧭 <strong style={{ color: C.teal }}>Aim.</strong> Model real-world entities as classes, create objects with their
          own attributes and methods, and protect data with encapsulation — private attributes changed only through
          validating methods. Each step you finish is saved to your e-observation record.
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
