// Unit10_C — 🔥 The Crucible: Module 10 (Object-Oriented Programming)
// Classes, __init__, self, methods, __str__, inheritance. Temper asks students
// to DEFINE a class with __init__ + a method; hidden tests instantiate & call it.
import { useState, useRef } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const UNIT_ID = "Unit10_C";
const STAGES = [
  { id: "spark", label: "Spark", icon: "✨", tag: "Predict, Trace & Spot" },
  { id: "flame", label: "Flame", icon: "🔥", tag: "Bug Hunt" },
  { id: "forge", label: "Forge", icon: "⚒️", tag: "Assemble the Class" },
  { id: "temper", label: "Temper", icon: "🗡️", tag: "Write Real Python" },
];

const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };

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
        <button onClick={onMore} style={{
          padding: "6px 12px", borderRadius: 7, fontSize: 12, cursor: "pointer",
          background: C.card, color: C.yellow, border: `1px solid ${C.yellow}55`,
        }}>💡 Need a nudge? ({shown}/{hints.length} hints used)</button>
      )}
    </div>
  );
}

// ── Stage 1: Spark — predict / trace-the-state / spot-the-lie ──
function SparkStage({ onPass }) {
  const questions = [
    {
      kind: "mcq",
      code: "class Counter:\n    def __init__(self):\n        self.n = 0\n    def bump(self):\n        self.n = self.n + 1\n\nc = Counter()\nc.bump()\nc.bump()\nprint(c.n)",
      options: ["0", "1", "2", "Error"],
      answer: 2,
      hints: ["__init__ sets self.n to 0 when the object is created.", "Each bump() adds 1 to the SAME object's n. Two bumps..."],
      why: "__init__ starts n at 0; each c.bump() increments this object's own self.n. Two calls → 2. The state lives on the object between calls.",
    },
    {
      kind: "trace",
      code: "class Box:\n    def __init__(self, v):\n        self.v = v\n    def double(self):\n        return self.v * 2\n\nb = Box(5)\nprint(b.double() + b.v)",
      expect: "15",
      prompt: "Trace the method and the attribute: what number is printed? Type it below.",
      hints: ["b.double() returns self.v * 2 — and self.v is 5.", "Add that to b.v (which is still 5)."],
      why: "b.double() returns 5 * 2 = 10; b.v is 5. 10 + 5 = 15. The method reads the object's own v, and so does b.v.",
    },
    {
      kind: "lie",
      code: 'class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"\n\nd = Dog()',
      claims: [
        'd.speak() returns "Woof" — Dog\'s method overrides Animal\'s.',
        "Dog inherits from Animal, so a Dog is-a Animal.",
        "Because Dog defines speak(), Animal's own speak() is deleted from memory.",
      ],
      lieIndex: 2,
      hints: ["Overriding means the child's version is FOUND FIRST — but does that remove the parent's?", "Animal still has its speak(); an Animal() instance would use it. Overriding hides, it doesn't delete."],
      why: "Claims 1 and 2 are true (child-first lookup; is-a). The lie: overriding does NOT delete Animal.speak() — the parent keeps its own method; Dog's just wins for Dog objects.",
    },
  ];
  const [solved, setSolved] = useState([]);
  const [picked, setPicked] = useState({});
  const [typed, setTyped] = useState({});
  const [typedWrong, setTypedWrong] = useState({});
  const [hintCount, setHintCount] = useState({});

  const bumpHint = (qi) =>
    setHintCount((h) => ({ ...h, [qi]: Math.min((h[qi] || 0) + 1, questions[qi].hints.length) }));

  const pick = (qi, oi) => {
    if (solved.includes(qi)) return;
    const q = questions[qi];
    const correct = q.kind === "lie" ? oi === q.lieIndex : oi === q.answer;
    if (correct) {
      setSolved((s) => [...s, qi]);
      setPicked((p) => ({ ...p, [qi]: null }));
    } else {
      setPicked((p) => ({ ...p, [qi]: oi }));
      bumpHint(qi);
    }
  };

  const checkTyped = (qi) => {
    if (solved.includes(qi)) return;
    if ((typed[qi] || "").trim() === questions[qi].expect) {
      setSolved((s) => [...s, qi]);
      setTypedWrong((w) => ({ ...w, [qi]: false }));
    } else {
      setTypedWrong((w) => ({ ...w, [qi]: true }));
      bumpHint(qi);
    }
  };

  const allDone = solved.length === questions.length;
  const tagFor = (q) => (q.kind === "trace" ? " · TRACE IT" : q.kind === "lie" ? " · SPOT THE LIE" : "");

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Warm up: predict an object's state after two method calls, trace a method plus an attribute, and spot
        the false claim about inheritance. ✨
      </p>

      {questions.map((q, qi) => {
        const isSolved = solved.includes(qi);
        return (
          <div key={qi} style={{ background: C.card, border: `1.5px solid ${isSolved ? C.green : C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
                CHALLENGE {qi + 1} OF 3{tagFor(q)}
              </span>
              {isSolved && <span style={{ color: C.green, fontSize: 12, fontWeight: 700 }}>✓ solved</span>}
            </div>
            <pre style={{ ...mono, background: C.surface, borderRadius: 8, padding: 12, border: `1px solid ${C.border}`, marginBottom: 10 }}>{q.code}</pre>

            {q.kind === "mcq" && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {q.options.map((opt, oi) => {
                  let bg = C.surface, border = C.border, col = C.text;
                  if (isSolved && oi === q.answer) { bg = C.green + "22"; border = C.green; col = C.green; }
                  else if (picked[qi] === oi) { bg = C.red + "22"; border = C.red; col = C.red; }
                  return (
                    <button key={oi} onClick={() => pick(qi, oi)} style={{
                      padding: "8px 16px", borderRadius: 8, fontFamily: "monospace", fontSize: 12.5,
                      background: bg, border: `1.5px solid ${border}`, color: col, whiteSpace: "pre-wrap", textAlign: "left",
                      cursor: isSolved ? "default" : "pointer", transition: "all 0.2s",
                    }}>{opt}</button>
                  );
                })}
              </div>
            )}

            {q.kind === "lie" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.claims.map((cl, oi) => {
                  let bg = C.surface, border = C.border, col = C.text;
                  if (isSolved && oi === q.lieIndex) { bg = C.red + "18"; border = C.red; col = C.red; }
                  else if (isSolved) { bg = C.green + "10"; border = C.green + "55"; col = C.muted; }
                  else if (picked[qi] === oi) { bg = C.yellow + "14"; border = C.yellow; col = C.yellow; }
                  return (
                    <button key={oi} onClick={() => pick(qi, oi)} style={{
                      textAlign: "left", padding: "9px 14px", borderRadius: 8, fontSize: 13, lineHeight: 1.5,
                      background: bg, border: `1.5px solid ${border}`, color: col,
                      cursor: isSolved ? "default" : "pointer",
                    }}>{isSolved && oi === q.lieIndex ? "🤥 " : isSolved ? "✓ " : ""}{cl}</button>
                  );
                })}
              </div>
            )}

            {q.kind === "trace" && (
              <div>
                <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 8 }}>{q.prompt}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    value={typed[qi] || ""}
                    onChange={(e) => setTyped((t) => ({ ...t, [qi]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && checkTyped(qi)}
                    disabled={isSolved}
                    spellCheck={false}
                    style={{
                      width: 120, padding: "8px 12px", borderRadius: 8, fontFamily: "monospace", fontSize: 14,
                      background: "#010409", color: isSolved ? C.green : C.text, outline: "none",
                      border: `1.5px solid ${isSolved ? C.green : typedWrong[qi] ? C.red : C.border}`,
                    }} />
                  {!isSolved && (
                    <button onClick={() => checkTyped(qi)} style={{
                      padding: "8px 18px", borderRadius: 8, background: C.accentGlow, border: "none",
                      color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer",
                    }}>Check</button>
                  )}
                </div>
              </div>
            )}

            {isSolved
              ? <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: C.green + "12", border: `1px solid ${C.green}44`, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>✓ {q.why}</div>
              : (hintCount[qi] || 0) > 0 && <Hints hints={q.hints} shown={hintCount[qi] || 0} onMore={() => bumpHint(qi)} />}
          </div>
        );
      })}

      {allDone && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
        }}>✨ Spark caught! Light the Flame →</button>
      )}
    </div>
  );
}

// ── Stage 2: Flame — bug hunts (click the line, pick the fix) ──
function FlameStage({ onPass }) {
  const bugs = [
    {
      intro: "This should print the student's name — instead it crashes with NameError: name 'name' is not defined. Click the buggy line.",
      lines: ["class Student:", "    def __init__(self, name):", "        self.name = name", "    def show(self):", "        print(name)", "", 's = Student("Asha")', "s.show()"],
      buggyLine: 4,
      lineHints: {
        1: "The constructor's parameter list is fine.",
        2: "self.name = name correctly stores the name ON the object.",
        3: "The method header is fine — show(self) has its self.",
        6: "Creating the student is fine.",
        7: "The call is fine — the crash is inside show().",
      },
      fixes: ["        print(self.name)", "        print(Student.name)", "        return name"],
      fixAnswer: 0,
      fixHints: ["Inside a method, a bare `name` is neither a local nor a global here — so Python can't find it.", "The name lives on the object as self.name. Methods reach their object's data through self."],
      why: "Inside show(), `name` doesn't exist — it was a parameter of __init__, not show. The data is stored as self.name, so print(self.name) is the fix.",
    },
    {
      intro: "Calling p.greet() crashes with TypeError: greet() takes 0 positional arguments but 1 was given. Click the buggy line.",
      lines: ["class Person:", "    def __init__(self, name):", "        self.name = name", "    def greet():", '        print("Hi!")', "", 'p = Person("Rao")', "p.greet()"],
      buggyLine: 3,
      lineHints: {
        1: "__init__ has its self — it's fine.",
        2: "Storing the name is correct.",
        4: "The print is fine — the problem is the method header above it.",
        7: "The call p.greet() looks innocent, but Python secretly passes p as an argument...",
      },
      fixes: ["    def greet(self):", "    def greet(p):  # wrong", "call it as Person.greet()"],
      fixAnswer: 0,
      fixHints: ["p.greet() is shorthand for greet(p) — Python passes the object as the first argument automatically.", "The method must have a parameter (self) to RECEIVE that object. Without it, Python sees 1 arg given but 0 expected."],
      why: "p.greet() passes p in as the first argument, but greet() declares no parameter to catch it — hence '0 positional arguments but 1 given'. Every method needs self.",
    },
  ];
  const [cur, setCur] = useState(0);
  const [foundLine, setFoundLine] = useState(false);
  const [wrongLine, setWrongLine] = useState(null);
  const [fixPicked, setFixPicked] = useState(null);
  const [fixedCount, setFixedCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const b = bugs[cur];
  const solvedThis = fixPicked === b.fixAnswer;

  const clickLine = (i) => {
    if (foundLine) return;
    if (i === b.buggyLine) { setFoundLine(true); setWrongLine(null); }
    else setWrongLine(i);
  };
  const pickFix = (i) => {
    if (solvedThis) return;
    setFixPicked(i);
    if (i !== b.fixAnswer) setHintCount((h) => Math.min(h + 1, b.fixHints.length));
  };
  const nextBug = () => {
    setFixedCount((n) => n + 1);
    if (cur < bugs.length - 1) {
      setCur(cur + 1); setFoundLine(false); setWrongLine(null); setFixPicked(null); setHintCount(0);
    }
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Two classic OOP bugs: reaching for data without self, and defining a method without self. Bug
        {" "}{Math.min(fixedCount + 1, bugs.length)} of {bugs.length}. 🔥
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.orange, fontSize: 12, fontWeight: 600, marginBottom: 10, lineHeight: 1.6 }}>{b.intro}</div>
        <div style={{ background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, padding: 8 }}>
          {b.lines.map((l, i) => {
            let border = "transparent", bg = "transparent";
            if (foundLine && i === b.buggyLine) { border = C.green; bg = C.green + "18"; }
            else if (wrongLine === i) { border = C.red; bg = C.red + "12"; }
            return (
              <div key={i} onClick={() => clickLine(i)} style={{
                fontFamily: "monospace", fontSize: 12.5, lineHeight: 2, padding: "2px 10px",
                borderRadius: 6, cursor: foundLine ? "default" : "pointer",
                borderLeft: `3px solid ${border}`, background: bg, color: C.text, whiteSpace: "pre",
                minHeight: l === "" ? 14 : undefined,
              }}>{i + 1}  {l}</div>
            );
          })}
        </div>
        {wrongLine !== null && !foundLine && (
          <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: C.yellow + "14", border: `1px solid ${C.yellow}44`, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
            💡 {b.lineHints[wrongLine] || "Not that one — keep hunting!"}
          </div>
        )}

        {foundLine && (
          <div style={{ marginTop: 14 }}>
            <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>✓ Bug located! Now pick the fix:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {b.fixes.map((f, i) => {
                let bg = C.surface, border = C.border, col = C.text;
                if (solvedThis && i === b.fixAnswer) { bg = C.green + "22"; border = C.green; col = C.green; }
                else if (fixPicked === i && i !== b.fixAnswer) { bg = C.red + "22"; border = C.red; col = C.red; }
                return (
                  <button key={i} onClick={() => pickFix(i)} style={{
                    textAlign: "left", padding: "9px 14px", borderRadius: 8, fontFamily: "monospace", fontSize: 12.5,
                    background: bg, border: `1.5px solid ${border}`, color: col,
                    cursor: solvedThis ? "default" : "pointer",
                  }}>{f}</button>
                );
              })}
            </div>
            {!solvedThis && hintCount > 0 && (
              <Hints hints={b.fixHints} shown={hintCount} onMore={() => setHintCount((h) => Math.min(h + 1, b.fixHints.length))} />
            )}
            {solvedThis && (
              <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: C.green + "12", border: `1px solid ${C.green}44`, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>✓ {b.why}</div>
            )}
          </div>
        )}
      </div>

      {solvedThis && cur < bugs.length - 1 && (
        <button onClick={nextBug} style={{
          padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none",
          color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>Next bug →</button>
      )}
      {solvedThis && cur === bugs.length - 1 && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
        }}>🔥 Both bugs extinguished! To the Forge →</button>
      )}
    </div>
  );
}

// ── Stage 3: Forge — Parsons: assemble a full class + usage ──
function ForgeStage({ onPass }) {
  const target = [
    { code: "class Circle:", defines: "def_open", needs: [] },
    { code: "    def __init__(self, r):", defines: "init", needs: ["def_open"] },
    { code: "        self.r = r", defines: "body", needs: ["init"] },
    { code: "    def area(self):", defines: "area_open", needs: ["body"] },
    { code: "        return 3.14 * self.r * self.r", defines: "def_done", needs: ["area_open"] },
    { code: "print(Circle(10).area())", defines: null, needs: ["def_done"] },
  ];
  const MSG = {
    def_open: "there's no class above it to belong to — indented lines need their class header first",
    init: "self.r = r is __init__'s body — the def __init__ header must come first",
    body: "area() is a method of the class, but the class must open (and __init__ set r) before it",
    area_open: "return 3.14 * self.r * self.r is area's body — it needs its own def area(self): above",
    def_done: "you can't create Circle(10) and call .area() before the class (and its methods) exist",
  };
  const shuffled = [4, 1, 5, 0, 3, 2]; // fixed shuffle so the puzzle is stable
  const [order, setOrder] = useState(shuffled);
  const [verdict, setVerdict] = useState(null);
  const [solved, setSolved] = useState(false);

  const move = (idx, dir) => {
    if (solved) return;
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[idx], next[j]] = [next[j], next[idx]];
    setOrder(next); setVerdict(null);
  };

  const check = () => {
    const defined = new Set();
    for (const li of order) {
      const line = target[li];
      const missing = line.needs.find((n) => !defined.has(n));
      if (missing) {
        setVerdict({ ok: false, msg: `“${line.code.trim()}” can't go there — ${MSG[missing]}.` });
        return;
      }
      if (line.defines) defined.add(line.defines);
    }
    setVerdict({ ok: true, msg: "class → __init__ → attribute → method → create-and-call. Circle(10).area() prints 314.0 — a complete class, forged." });
    setSolved(true);
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Hammer these scrambled lines into a working class: open the class, write __init__ to store the radius,
        add an area() method, then create one and call it. Use ↑↓. The body lines belong to their def, and
        methods belong to their class. ⚒️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
        {order.map((li, idx) => (
          <div key={li} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "4px 6px", borderRadius: 8,
            background: solved ? C.green + "10" : C.surface, border: `1px solid ${solved ? C.green + "55" : C.border}`,
            marginBottom: 6,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <button onClick={() => move(idx, -1)} disabled={solved || idx === 0} style={{
                border: "none", background: "transparent", color: idx === 0 ? C.border : C.orange,
                cursor: idx === 0 || solved ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: 2,
              }}>▲</button>
              <button onClick={() => move(idx, 1)} disabled={solved || idx === order.length - 1} style={{
                border: "none", background: "transparent", color: idx === order.length - 1 ? C.border : C.orange,
                cursor: idx === order.length - 1 || solved ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: 2,
              }}>▼</button>
            </div>
            <pre style={{ ...mono, fontSize: 12.5 }}>{target[li].code}</pre>
          </div>
        ))}
      </div>

      {!solved && (
        <button onClick={check} style={{
          padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none",
          color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>⚒️ Strike! (check my order)</button>
      )}

      {verdict && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 12.5, lineHeight: 1.6, background: verdict.ok ? C.green + "14" : C.yellow + "14", border: `1px solid ${verdict.ok ? C.green : C.yellow}44`, color: verdict.ok ? C.green : C.muted }}>
          {verdict.ok ? "✓ " : "💡 "}{verdict.msg}
        </div>
      )}

      {solved && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12,
        }}>⚒️ Forged! Now temper the blade →</button>
      )}
    </div>
  );
}

// ── Stage 4: Temper — DEFINE a class; tests instantiate & call it ──
function TemperStage({ onPass }) {
  const TESTS = [
    { pre: "", post: "\nr = Rectangle(3, 4)\nprint(r.area())", expect: "12", label: "Rectangle(3, 4).area() → 12" },
    { pre: "", post: "\nprint(Rectangle(5, 5).area())", expect: "25", label: "hidden: a square 5×5 → 25" },
    { pre: "", post: "\nprint(Rectangle(2, 3).area() + 1)", expect: "7", label: "hidden: your RETURN value is used in math" },
  ];
  const [code, setCode] = useState("# define class Rectangle here\n");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const pyRef = useRef(null);
  const hints = [
    "class Rectangle: with def __init__(self, w, h): storing self.w = w and self.h = h.",
    "def area(self): return self.w * self.h — RETURN it, don't print (the third test does math with your return value).",
  ];

  async function getPyodide() {
    if (pyRef.current) return pyRef.current;
    if (window.__crucible_pyodide) { pyRef.current = window.__crucible_pyodide; return pyRef.current; }
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    const py = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
    window.__crucible_pyodide = py; pyRef.current = py;
    return py;
  }

  async function run() {
    setStatus("loading");
    setMessage("Heating the forge… (first run downloads real Python, ~6 MB — be patient!)");
    let py;
    try { py = await getPyodide(); }
    catch {
      setStatus("fallback");
      setMessage("Couldn't load the Python engine (slow connection?). No problem — pass the fallback puzzle below instead.");
      return;
    }
    setStatus("running"); setMessage("Running your code against the tests…");
    try {
      for (const t of TESTS) {
        py.runPython("import sys, io\nsys.stdout = io.StringIO()");
        try {
          py.runPython(t.pre + code + t.post);
        } catch (e) {
          const lines = String(e.message || e).trim().split("\n");
          setStatus("error");
          setMessage(`Test "${t.label}" — Python error:\n` + lines[lines.length - 1]);
          setHintCount((h) => Math.min(h + 1, hints.length));
          return;
        }
        const out = py.runPython("sys.stdout.getvalue()");
        if (String(out).trim() !== t.expect) {
          setStatus("failed");
          setMessage(`Test "${t.label}" — expected exactly:\n${t.expect}\nyour output:\n${String(out).trim() || "(nothing printed)"}`);
          setHintCount((h) => Math.min(h + 1, hints.length));
          return;
        }
      }
      setStatus("passed");
      setMessage("All three tests passed. Unseen code created Rectangle objects and called your area() method — and it held. That's a class doing its job.");
    } catch (e) {
      setStatus("error"); setMessage("Unexpected error: " + String(e));
    }
  }

  // Fallback mini-Parsons (used only if Pyodide can't load)
  const fbTarget = [
    { code: "class Rectangle:", defines: "def_open", needs: [] },
    { code: "    def __init__(self, w, h):", defines: "init", needs: ["def_open"] },
    { code: "        self.w = w", defines: "body1", needs: ["init"] },
    { code: "        self.h = h", defines: "body2", needs: ["body1"] },
    { code: "    def area(self):", defines: "area_open", needs: ["body2"] },
    { code: "        return self.w * self.h", defines: "def_done", needs: ["area_open"] },
    { code: "print(Rectangle(3, 4).area())", defines: null, needs: ["def_done"] },
  ];
  const [fbOrder, setFbOrder] = useState([5, 1, 6, 0, 3, 2, 4]);
  const [fbSolved, setFbSolved] = useState(false);
  const fbMove = (idx, dir) => {
    const j = idx + dir;
    if (j < 0 || j >= fbOrder.length || fbSolved) return;
    const next = [...fbOrder];
    [next[idx], next[j]] = [next[j], next[idx]];
    setFbOrder(next);
  };
  const fbCheck = () => {
    const defined = new Set();
    for (const li of fbOrder) {
      if (fbTarget[li].needs.find((n) => !defined.has(n))) return;
      if (fbTarget[li].defines) defined.add(fbTarget[li].defines);
    }
    setFbSolved(true);
  };

  const passed = status === "passed" || fbSolved;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The final tempering: write a whole <strong style={{ color: C.text }}>class</strong> from scratch. The
        hidden tests will build objects from it and call your method. 🗡️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.orange}55`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>📜 YOUR TASK</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
          Define a class <code style={{ color: C.teal }}>Rectangle</code> whose <code style={{ color: C.teal }}>__init__(self, w, h)</code>{" "}
          stores width and height, and whose method <code style={{ color: C.teal }}>area(self)</code>{" "}
          <strong style={{ color: C.text }}>returns</strong> w × h. The tests create rectangles and call area()
          — and one does math with the result, so return, don't print.
        </div>
      </div>

      {status !== "fallback" && (
        <>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} rows={8} style={{
            width: "100%", boxSizing: "border-box", background: "#010409", color: C.text,
            border: `1.5px solid ${C.border}`, borderRadius: 10, padding: 12,
            fontFamily: "monospace", fontSize: 13.5, lineHeight: 1.7, outline: "none", resize: "vertical",
          }} />
          <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
            <button onClick={run} disabled={status === "loading" || status === "running"} style={{
              padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 14,
              background: status === "loading" || status === "running" ? C.card : C.green,
              color: status === "loading" || status === "running" ? C.muted : "#0D1117",
              cursor: status === "loading" || status === "running" ? "default" : "pointer",
            }}>{status === "loading" || status === "running" ? "⏳ Working…" : "▶ Run the tests"}</button>
            {status === "passed" && <span style={{ color: C.green, fontWeight: 700, fontSize: 13 }}>✓ 3/3 tests passed</span>}
          </div>
        </>
      )}

      {message && (
        <pre style={{
          ...mono, marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 12.5,
          background: status === "passed" ? C.green + "14" : status === "failed" || status === "error" ? C.red + "10" : C.card,
          border: `1px solid ${status === "passed" ? C.green : status === "failed" || status === "error" ? C.red + "66" : C.border}`,
          color: status === "passed" ? C.green : C.muted,
        }}>{message}</pre>
      )}

      {(status === "failed" || status === "error") && hintCount > 0 && (
        <Hints hints={hints} shown={hintCount} onMore={() => setHintCount((h) => Math.min(h + 1, hints.length))} />
      )}

      {status === "fallback" && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginTop: 4 }}>
          {fbOrder.map((li, idx) => (
            <div key={li} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 6px", borderRadius: 8, background: C.surface, border: `1px solid ${fbSolved ? C.green + "55" : C.border}`, marginBottom: 6 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <button onClick={() => fbMove(idx, -1)} style={{ border: "none", background: "transparent", color: C.orange, cursor: "pointer", fontSize: 12, padding: 2 }}>▲</button>
                <button onClick={() => fbMove(idx, 1)} style={{ border: "none", background: "transparent", color: C.orange, cursor: "pointer", fontSize: 12, padding: 2 }}>▼</button>
              </div>
              <pre style={{ ...mono, fontSize: 12.5 }}>{fbTarget[li].code}</pre>
            </div>
          ))}
          {!fbSolved && <button onClick={fbCheck} style={{ padding: "8px 18px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Check order</button>}
          {fbSolved && <div style={{ color: C.green, fontWeight: 700, fontSize: 13, marginTop: 6 }}>✓ Correct order — tempered the old-fashioned way!</div>}
        </div>
      )}

      {passed && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12,
        }}>🗡️ Tempered! Claim your badge →</button>
      )}
    </div>
  );
}

// ── Badge screen ──
function BadgeScreen({ claimed, onClaim }) {
  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 64 }}>🔥</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.orange, marginTop: 8 }}>TEMPERED IN THE M10 CRUCIBLE</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 480, margin: "10px auto 0" }}>
        Predicted an object's state across method calls. Caught the missing-self bug twice over. Assembled a
        full class from scrambled lines. Then wrote a class from scratch that unseen code built objects from and
        called — and it held. Object-oriented thinking, <em>forged into skill</em>.
      </div>
      <div style={{
        marginTop: 20, padding: 20, borderRadius: 12, display: "inline-block",
        background: `linear-gradient(135deg, ${C.orange}22, ${C.red}22)`,
        border: `1px solid ${C.orange}66`,
      }}>
        <div style={{ fontSize: 32 }}>🏅</div>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginTop: 6 }}>Crucible Badge · Module 10</div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Spark ✓ · Flame ✓ · Forge ✓ · Temper ✓</div>
      </div>
      <div style={{ color: C.muted, fontSize: 13, marginTop: 18, lineHeight: 1.7 }}>
        You can build your own kinds of things now — classes with state and behaviour. Next, the forge makes you
        <strong style={{ color: C.orange }}> fluent</strong>: Module 11 — Pythonic Python &amp; the Ecosystem
        (comprehensions, modules, pip, and the world of libraries). 🔥
      </div>
      {!claimed && (
        <button onClick={onClaim} style={{
          marginTop: 20, padding: "12px 28px", borderRadius: 10, border: "none",
          background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
        }}>🏅 Claim the badge (records completion)</button>
      )}
    </div>
  );
}

// ── Main ──
export default function Unit10_C({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
  const persisted = STAGES.filter((s) => challengeProgress.includes(`${UNIT_ID}@${s.id}`)).map((s) => s.id);
  const [doneStages, setDoneStages] = useState(persisted);
  const [active, setActive] = useState(() => {
    const firstOpen = STAGES.findIndex((s) => !persisted.includes(s.id));
    return firstOpen === -1 ? STAGES.length : firstOpen;
  });

  const isUnlocked = (idx) => idx === 0 || doneStages.includes(STAGES[idx - 1].id);

  const [claimed, setClaimed] = useState(challengeProgress.includes(UNIT_ID));

  const passStage = (idx) => {
    const stage = STAGES[idx];
    if (!doneStages.includes(stage.id)) {
      setDoneStages((p) => [...p, stage.id]);
      onStageComplete && onStageComplete(`${UNIT_ID}@${stage.id}`);
    }
    setActive(idx + 1);
  };

  const claimBadge = () => {
    setClaimed(true);
    onUnitComplete && onUnitComplete();
  };

  const stageBody = [
    <SparkStage key="s" onPass={() => passStage(0)} />,
    <FlameStage key="f" onPass={() => passStage(1)} />,
    <ForgeStage key="g" onPass={() => passStage(2)} />,
    <TemperStage key="t" onPass={() => passStage(3)} />,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.orange}44`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.orange}, ${C.red})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔥</div>
        <div>
          <div style={{ fontSize: 12, color: C.orange, letterSpacing: 1, fontWeight: 700 }}>MODULE 10 › THE CRUCIBLE</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Where knowledge is forged into skill</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{doneStages.length} / {STAGES.length} stages</div>
      </div>

      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(doneStages.length / STAGES.length) * 100}%`, background: `linear-gradient(90deg, ${C.orange}, ${C.red})`, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ background: C.orange + "10", border: `1px solid ${C.orange}33`, borderRadius: 10, padding: "10px 16px", marginBottom: 18, fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
          ⚔️ <strong style={{ color: C.orange }}>Bonus challenge — completely optional.</strong> Your lesson
          progress is already safe. But stages unlock one by one, hints replace answers, and only the worthy
          earn the badge. Forge your Module 10 skills. Ready?
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {STAGES.map((s, i) => {
            const done = doneStages.includes(s.id);
            const unlocked = isUnlocked(i);
            const isActive = active === i;
            return (
              <button key={s.id} onClick={() => unlocked && setActive(i)} disabled={!unlocked} style={{
                flex: 1, minWidth: 100, padding: "10px 6px", borderRadius: 7,
                background: isActive ? `linear-gradient(135deg, ${C.orange}, ${C.red})` : "transparent",
                border: "none", color: isActive ? "#0D1117" : unlocked ? C.text : C.muted,
                cursor: unlocked ? "pointer" : "not-allowed", fontSize: 12,
                fontWeight: isActive ? 800 : 500, opacity: unlocked ? 1 : 0.5,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2, transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 15 }}>{done ? "✅" : unlocked ? s.icon : "🔒"}</span>
                <span>{s.label}</span>
                <span style={{ fontSize: 9.5, opacity: 0.8 }}>{s.tag}</span>
              </button>
            );
          })}
        </div>

        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
          {active >= STAGES.length
            ? <BadgeScreen claimed={claimed} onClaim={claimBadge} />
            : isUnlocked(active)
              ? stageBody[active]
              : <div style={{ textAlign: "center", color: C.muted, padding: 40 }}>🔒 Locked — pass the previous stage first.</div>}
        </div>
      </div>
    </div>
  );
}
