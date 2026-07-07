import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: The Need — treat different objects the same way ───────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        In Unit 10.4 you built a <code style={{ color: C.accent }}>Student</code> and a{" "}
        <code style={{ color: C.accent }}>Teacher</code>. Now imagine a mixed list of shapes — circles, squares —
        and you want the area of each. You'd like to just say <code style={{ color: C.teal }}>shape.area()</code> and
        let each object do the right thing.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>❌ Without polymorphism</div>
          <pre style={{ fontFamily: "monospace", fontSize: 11, color: C.text, margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>{`for s in shapes:\n    if s.kind == "circle":\n        a = 3.14*s.r*s.r\n    elif s.kind == "square":\n        a = s.side*s.side\n    print(a)`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>A new shape means editing this if-ladder. Fragile.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>✅ With polymorphism</div>
          <pre style={{ fontFamily: "monospace", fontSize: 11, color: C.text, margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>{`for s in shapes:\n    print(s.area())`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>Each object knows its own area(). New shapes just work.</div>
        </div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Polymorphism = "many forms".</strong> The same call,{" "}
        <code style={{ color: C.purple }}>s.area()</code>, runs different code depending on which object s actually is.
        The caller doesn't need to know or care.
      </div>
    </div>
  );
}

// ── Section 2: Polymorphism via overriding + duck typing ─────────────────────
function Polymorphism() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Each class defines its <em>own</em> <code style={{ color: C.teal }}>area()</code>. When you call{" "}
        <code style={{ color: C.teal }}>s.area()</code>, Python looks up the method on the actual object — so a
        Circle runs Circle.area, a Square runs Square.area.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14, fontFamily: "monospace", fontSize: 11.5, lineHeight: 1.8, whiteSpace: "pre" }}>
        <span style={{ color: C.teal }}>class Circle:</span>{"\n"}
        {"    "}def __init__(self, r):{"\n"}
        {"        "}self.r = r{"\n"}
        {"    "}def area(self):{"\n"}
        {"        "}return 3.14 * self.r * self.r{"\n\n"}
        <span style={{ color: C.orange }}>class Square:</span>{"\n"}
        {"    "}def __init__(self, side):{"\n"}
        {"        "}self.side = side{"\n"}
        {"    "}def area(self):{"\n"}
        {"        "}return self.side * self.side{"\n\n"}
        shapes = [Circle(2), Square(3)]{"\n"}
        for s in shapes:{"\n"}
        {"    "}print(s.area()){"   "}<span style={{ color: C.muted }}># 12.56, then 9</span>
      </div>

      <div style={{ background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🦆 <strong style={{ color: C.teal }}>Duck typing:</strong> "If it walks like a duck and quacks like a duck…"
        Python doesn't check the type — it just calls <code style={{ color: C.teal }}>area()</code>. Any object with
        an <code>area()</code> method fits the loop, related by inheritance or not.
      </div>
    </div>
  );
}

// ── Section 3: Dispatch stepper ──────────────────────────────────────────────
const SHAPES = [
  { name: "Circle", detail: "r=2", cls: "Circle", area: 12.56, expr: "3.14 * 2 * 2" },
  { name: "Square", detail: "side=3", cls: "Square", area: 9, expr: "3 * 3" },
  { name: "Circle", detail: "r=1", cls: "Circle", area: 3.14, expr: "3.14 * 1 * 1" },
];
const DISPATCH_STEPS = (() => {
  const steps = [];
  let total = 0;
  for (let i = 0; i < SHAPES.length; i++) {
    total = Math.round((total + SHAPES[i].area) * 100) / 100;
    steps.push({ i, total, desc: `s is a ${SHAPES[i].name} → Python runs ${SHAPES[i].cls}.area() = ${SHAPES[i].expr} = ${SHAPES[i].area}.` });
  }
  steps.push({ i: SHAPES.length, total, done: true, desc: `Loop done. One line, print(s.area()), dispatched to two different methods. Total area = ${total}.` });
  return steps;
})();

function DispatchStepper() {
  const [step, setStep] = useState(0);
  const s = DISPATCH_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Step through <code style={{ color: C.accent }}>for s in shapes: print(s.area())</code>. Watch the SAME call
        land on a different class's method each time — that's dynamic dispatch.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(DISPATCH_STEPS.length - 1, x + 1))} disabled={step === DISPATCH_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === DISPATCH_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === DISPATCH_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === DISPATCH_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {DISPATCH_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {SHAPES.map((sh, i) => {
          const active = !s.done && i === s.i;
          const color = sh.cls === "Circle" ? C.teal : C.orange;
          return (
            <div key={i} style={{
              flex: 1, minWidth: 90, borderRadius: 8, padding: "10px 8px", textAlign: "center",
              background: active ? color + "22" : C.card, border: `1.5px solid ${active ? color : C.border}`,
            }}>
              <div style={{ color: active ? color : C.text, fontWeight: 700, fontSize: 13 }}>{sh.name}</div>
              <div style={{ color: C.muted, fontSize: 10, fontFamily: "monospace" }}>{sh.detail}</div>
            </div>
          );
        })}
        <div style={{ marginLeft: "auto", background: C.card, border: `2px solid ${C.green}`, borderRadius: 10, padding: "8px 16px", textAlign: "center" }}>
          <div style={{ color: C.green, fontSize: 10, letterSpacing: 1 }}>total area</div>
          <div style={{ color: C.text, fontSize: 20, fontWeight: 700, fontFamily: "monospace" }}>{s.total}</div>
        </div>
      </div>

      <div style={{ background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.done ? "✅ " : ""}{s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>One interface, many implementations.</strong> The loop is written
        once and never changes — even if you add Triangle, Hexagon, or Star later. That's the power of polymorphism.
      </div>
    </div>
  );
}

// ── Section 4: Abstraction — the base-class contract ─────────────────────────
function Abstraction() {
  const [impl, setImpl] = useState(false);
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        <strong style={{ color: C.text }}>Abstraction</strong> is defining <em>what</em> without <em>how</em>. A base
        class <code style={{ color: C.accent }}>Shape</code> promises every shape has an{" "}
        <code style={{ color: C.teal }}>area()</code> — but leaves the formula to each subclass, forcing them to
        provide it with <code style={{ color: C.red }}>NotImplementedError</code>.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14, fontFamily: "monospace", fontSize: 11.5, lineHeight: 1.8, whiteSpace: "pre" }}>
        <span style={{ color: C.accent }}>class Shape:</span>{"                       "}<span style={{ color: C.muted }}># the abstract contract</span>{"\n"}
        {"    "}def area(self):{"\n"}
        {"        "}<span style={{ color: C.red }}>raise NotImplementedError</span>({'"subclass must define area()"'}){"\n\n"}
        <span style={{ color: C.teal }}>class Circle(Shape):</span>{"              "}<span style={{ color: C.muted }}># fulfils the contract</span>{"\n"}
        {"    "}def __init__(self, r):{"\n"}
        {"        "}self.r = r{"\n"}
        {"    "}def area(self):{"\n"}
        {"        "}return 3.14 * self.r * self.r
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setImpl(false)} style={{ flex: 1, padding: "9px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600, background: !impl ? C.red + "22" : C.card, border: `1.5px solid ${!impl ? C.red : C.border}`, color: !impl ? C.red : C.muted }}>Shape().area()</button>
        <button onClick={() => setImpl(true)} style={{ flex: 1, padding: "9px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600, background: impl ? C.green + "22" : C.card, border: `1.5px solid ${impl ? C.green : C.border}`, color: impl ? C.green : C.muted }}>Circle(2).area()</button>
      </div>

      <div style={{ background: (impl ? C.green : C.red) + "12", border: `1px solid ${(impl ? C.green : C.red)}44`, borderRadius: 8, padding: "12px 16px", fontFamily: "monospace", fontSize: 12.5, color: impl ? C.green : C.red, lineHeight: 1.6 }}>
        {impl
          ? "→ 12.56   ✓ Circle implemented area(), so it works."
          : "→ NotImplementedError: subclass must define area()   ✗ Shape is abstract — it refuses to guess."}
      </div>

      <div style={{ marginTop: 14, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>Abstraction sets the rules; polymorphism plays by them.</strong> The
        base class guarantees every shape HAS an area(); each subclass decides HOW. Together they let one loop
        handle any shape safely. (Python also has a stricter tool, the <code style={{ color: C.text }}>abc</code>{" "}
        module, for enforcing this — the NotImplementedError pattern is the plain-Python version.)
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What does polymorphism let you do?",
      options: [
        "Store many values in one variable",
        "Call the same method name on different objects and have each respond in its own way",
        "Make classes run faster",
        "Avoid writing __init__",
      ],
      answer: 1,
      explain: "Polymorphism ('many forms') means s.area() runs Circle.area or Square.area depending on what s actually is — one call, many behaviours.",
    },
    {
      q: "In  for s in shapes: print(s.area()),  how does Python know which area() to run?",
      options: [
        "It always runs the first class's method",
        "It looks up area() on the actual object s refers to at that moment (dynamic dispatch)",
        "You must write if-checks for each type",
        "It picks randomly",
      ],
      answer: 1,
      explain: "Method lookup happens on the real object. A Circle object finds Circle.area; a Square finds Square.area. No type-checking if-ladder needed.",
    },
    {
      q: "Why does the abstract  Shape.area()  raise NotImplementedError?",
      options: [
        "It's a bug",
        "To force every subclass to provide its own area() — the base class defines the contract, not the formula",
        "Because circles have no area",
        "To make the program crash",
      ],
      answer: 1,
      explain: "Abstraction defines WHAT (there must be an area()) without HOW. Raising NotImplementedError makes it a loud error if a subclass forgets to implement it.",
    },
    {
      q: "What is 'duck typing'?",
      options: [
        "A type of inheritance",
        "Python cares that an object HAS the needed method, not what class it belongs to",
        "A way to sort ducks",
        "Requiring all objects share a base class",
      ],
      answer: 1,
      explain: "If an object has an area() method, it works in the loop — regardless of its class. Behaviour matters, not the label. 'If it quacks like a duck…'",
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
          {score === 4 ? "You can design with interfaces, not just classes." :
            score >= 2 ? "Good — replay the Dispatch Stepper to see one call hit two methods." :
              "Revisit Polymorphism and Abstraction, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 10.5 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            The four OOP pillars are complete: encapsulation, inheritance, <strong style={{ color: C.accent }}>polymorphism and abstraction</strong>.<br /><br />
            Next: continue to the Module 10 capstone and Crucible, then Module 11.
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
export default function Unit10_6({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "poly", label: "Polymorphism" },
    { id: "dispatch", label: "Dispatch Stepper" },
    { id: "abstract", label: "Abstraction" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Many Shapes, One Call</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Polymorphism &amp; Duck Typing</h3><Polymorphism /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>See It: Dynamic Dispatch</h3><DispatchStepper /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Abstraction: The Contract</h3><Abstraction /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on polymorphism and abstraction.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧬</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 10 › UNIT 10.5</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Polymorphism &amp; Abstraction</div>
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
