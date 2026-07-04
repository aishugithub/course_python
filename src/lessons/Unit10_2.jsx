// Unit 10.2 — __init__ & self (the constructor)
import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };
const insight = (color, children) => (
  <div style={{ marginTop: 16, background: color + "18", border: `1px solid ${color}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
    🔑 {children}
  </div>
);

// ── Widget 1: The Need — manual furnishing vs __init__ ──
function NeedWidget() {
  const [n, setN] = useState(3);
  const names = ["Asha", "Ravi", "Meena", "Priya"];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Last unit, furnishing an object took three lines each — and if you forget one, the object is
        half-built. Drag the slider: watch the manual version balloon while the <code style={{ color: C.accent }}>__init__</code> version
        stays one clean line per student.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>students to create = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={1} max={4} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ FURNISH BY HAND</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>
            {names.slice(0, n).map((nm) => `${nm.toLowerCase()} = Student()\n${nm.toLowerCase()}.name = "${nm}"\n${nm.toLowerCase()}.mark = ..`).join("\n")}
          </pre>
          <div style={{ color: C.red, fontSize: 11.5, marginTop: 8 }}>{n * 3} lines — forget one <code>.mark =</code> and that student breaks later.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ BUILT BY __init__</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>
            {names.slice(0, n).map((nm, i) => `${nm.toLowerCase()} = Student("${nm}", ${[85, 72, 91, 77][i]})`).join("\n")}
          </pre>
          <div style={{ color: C.green, fontSize: 11.5, marginTop: 8 }}>{n} line{n > 1 ? "s" : ""} — every student is born complete, no slot forgotten.</div>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>__init__ is the setup recipe that runs the instant an object is born.</strong> Instead
        of furnishing each object by hand, you write the furnishing steps ONCE inside the class, and every
        <code style={{ color: C.teal }}> Student(...)</code> runs them automatically.
      </>)}
    </div>
  );
}

// ── Widget 2: Anatomy of __init__ + self ──
function AnatomyWidget() {
  const [sel, setSel] = useState(0);
  const parts = [
    { text: "    def __init__", color: C.accent, title: "__init__ — the constructor", body: "A special method Python calls AUTOMATICALLY every time you create an instance. The double underscores mean 'Python knows this name'. You never call __init__ yourself." },
    { text: "(self", color: C.teal, title: "self — this particular object", body: "The FIRST parameter of every method. It's the specific object being built right now. When you write Student(\"Asha\", 85), Python passes the new object in as self — you don't." },
    { text: ", name, mark)", color: C.orange, title: "the other parameters", body: "The values you pass in: Student(\"Asha\", 85) sends name=\"Asha\", mark=85. Ordinary parameters, just like any function (Unit 8.2)." },
    { text: ":\n        self.name = name", color: C.green, title: "self.name = name", body: "Store the parameter as an ATTRIBUTE on this object. self.name (the object's slot) ← name (the passed-in value). This is what makes the data stick to the object." },
    { text: "\n        self.mark = mark", color: C.purple, title: "one line per attribute", body: "Repeat for every piece of data the object should carry. After __init__ finishes, the object has .name and .mark filled in and ready." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Here's the class with a constructor. The confusing part is always <code style={{ color: C.teal }}>self</code> —
        click it first. Read <code style={{ color: C.green }}>self.name = name</code> as "this object's name slot
        gets the passed-in name."
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
        <pre style={{ ...mono, fontSize: 13.5 }}>
          <span style={{ color: C.muted }}>class Student:</span>
          {parts.map((p, i) => (
            <span key={i} onClick={() => setSel(i)} style={{
              color: p.color, cursor: "pointer", fontWeight: sel === i ? 800 : 600,
              background: sel === i ? p.color + "26" : "transparent",
              borderRadius: 4, transition: "all 0.2s",
            }}>{p.text}</span>
          ))}
        </pre>
      </div>

      <div style={{ background: C.surface, border: `1.5px solid ${parts[sel].color}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ color: parts[sel].color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{parts[sel].title}</div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{parts[sel].body}</div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
        <div style={{ color: C.muted, fontSize: 11.5, marginBottom: 8 }}>Using it — no <code>self</code> in sight when you call:</div>
        <pre style={mono}>{`asha = Student("Asha", 85)\n# Python: builds a blank object, calls\n# __init__(that_object, "Asha", 85) for you`}</pre>
      </div>

      {insight(C.teal, <>
        <strong style={{ color: C.teal }}>You pass two arguments, the method has three parameters.</strong> The
        gap is <code>self</code> — Python fills it in automatically with the new object. That's the one rule that
        makes all of OOP click: <em>self is the object the method is working on.</em>
      </>)}
    </div>
  );
}

// ── Widget 3: Trace — object being born ──
function TraceWidget() {
  const lines = [
    "class Student:",
    "    def __init__(self, name, mark):",
    "        self.name = name",
    "        self.mark = mark",
    "",
    's = Student("Asha", 85)',
    "print(s.name, s.mark)",
  ];
  // [lineIdx, objName, objMark, params, output, narr]
  const steps = [
    [5, "—", "—", "", "", 'Student("Asha", 85) is called. Python builds a BLANK object and prepares to run __init__.'],
    [1, "—", "—", 'self=obj  name="Asha"  mark=85', "", "Enter __init__. self is the blank object; the arguments fill name and mark. (You passed 2 args; Python supplied self.)"],
    [2, "Asha", "—", 'self=obj  name="Asha"  mark=85', "", 'self.name = name → the object\'s .name slot is filled with "Asha".'],
    [3, "Asha", "85", 'self=obj  name="Asha"  mark=85', "", "self.mark = mark → the object's .mark slot is filled with 85. The object is now complete."],
    [5, "Asha", "85", "", "", "__init__ finishes. The fully-built object is handed back and stored in s."],
    [6, "Asha", "85", "", "Asha 85", "s.name and s.mark read the object's own slots. Output: Asha 85."],
  ];
  const [idx, setIdx] = useState(0);
  const [line, oName, oMark, params, output, narr] = steps[idx];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Step through the birth of an object. Watch the empty slots fill in as __init__ runs — the same
        memory-slot picture from Unit 4.2, now grouped inside one object.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: 12, lineHeight: 1.85, padding: "0px 8px", borderRadius: 6,
              background: i === line ? C.accent + "22" : "transparent",
              borderLeft: `3px solid ${i === line ? C.accent : "transparent"}`,
              color: i === line ? C.text : C.muted, whiteSpace: "pre", minHeight: 22,
            }}>{i === line ? "▶ " : "  "}{l}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `1px solid ${C.teal}55`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: C.teal, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>THE OBJECT (self)</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.muted }}>.name</div>
                <div style={{ border: `2px solid ${oName !== "—" ? C.teal : C.border}`, borderRadius: 8, padding: "6px 2px", fontFamily: "monospace", fontSize: 12, background: C.surface, color: oName !== "—" ? C.text : C.muted }}>{oName}</div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: C.muted }}>.mark</div>
                <div style={{ border: `2px solid ${oMark !== "—" ? C.teal : C.border}`, borderRadius: 8, padding: "6px 2px", fontFamily: "monospace", fontSize: 12, background: C.surface, color: oMark !== "—" ? C.text : C.muted }}>{oMark}</div>
              </div>
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: C.orange, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>__init__ PARAMS</div>
            <pre style={{ ...mono, fontSize: 11, color: params ? C.text : C.muted }}>{params || "(not in __init__)"}</pre>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <pre style={{ ...mono, color: C.green, fontSize: 12.5 }}>{output || " "}</pre>
          </div>
        </div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.6 }}>
        {narr}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setIdx((i) => Math.min(steps.length - 1, i + 1))} disabled={idx === steps.length - 1} style={{
          padding: "10px 20px", borderRadius: 8, background: idx === steps.length - 1 ? C.card : C.accentGlow,
          border: "none", color: idx === steps.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: idx === steps.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({idx + 1} / {steps.length})</button>
        <button onClick={() => setIdx(0)} style={{
          padding: "10px 16px", borderRadius: 8, background: C.card, border: `1px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Create → blank object → __init__ fills it → hand it back.</strong> Every
        <code style={{ color: C.teal }}> Student(...)</code> runs this exact sequence. self is just the name
        __init__ uses for "the object I'm filling in right now."
      </>)}
    </div>
  );
}

// ── Widget 4: Gotcha — forgetting self ──
function GotchaWidget() {
  const [broken, setBroken] = useState(false);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The #1 beginner OOP bug: writing <code style={{ color: C.red }}>name = name</code> instead of
        <code style={{ color: C.green }}> self.name = name</code>. Toggle it and see why the object comes out
        empty.
      </p>

      <button onClick={() => setBroken((b) => !b)} style={{
        padding: "9px 16px", borderRadius: 8, marginBottom: 14, cursor: "pointer", fontWeight: 600, fontSize: 13,
        background: broken ? C.green + "22" : C.red + "22", border: `1.5px solid ${broken ? C.green : C.red}`,
        color: broken ? C.green : C.red,
      }}>{broken ? "◀ Fix it (add self.)" : "▶ What if I forget self?"}</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${broken ? C.red : C.green}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: broken ? C.red : C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>{broken ? "🐛 BROKEN" : "🐍 CORRECT"}</div>
          <pre style={mono}>{`class Student:
    def __init__(self, name):
        ${broken ? "name = name       # ← no self!" : "self.name = name"}

s = Student("Asha")
print(s.name)`}</pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${broken ? C.red : C.green}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: broken ? C.red : C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          {broken ? (
            <>
              <pre style={{ ...mono, color: C.red, fontSize: 11.5 }}>{`AttributeError: 'Student' object\nhas no attribute 'name'`}</pre>
              <div style={{ color: C.red, fontSize: 11.5, marginTop: 8, lineHeight: 1.6 }}>
                <code>name = name</code> just sets a LOCAL variable that vanishes when __init__ ends. Nothing
                was ever stored on the object, so s.name doesn't exist.
              </div>
            </>
          ) : (
            <>
              <pre style={{ ...mono, color: C.green }}>{`Asha`}</pre>
              <div style={{ color: C.green, fontSize: 11.5, marginTop: 8, lineHeight: 1.6 }}>
                <code>self.name = name</code> stores it ON the object, so s.name survives and prints.
              </div>
            </>
          )}
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>No self, no attribute.</strong> Only <code>self.something = ...</code> attaches
        data to the object. A bare <code>name = name</code> is just a throwaway local (Unit 8.3's scope rules) —
        it dies with the method and the object stays empty.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "When is __init__ called?",
      options: ["You must call it yourself with obj.__init__()", "Automatically, every time you create an instance with Student(...)", "Only once per program", "When the object is deleted"],
      answer: 1,
      explain: "__init__ runs automatically the moment you create an instance. Student(\"Asha\", 85) builds a blank object and immediately calls __init__ on it.",
    },
    {
      q: "In def __init__(self, name, mark), what is self?",
      options: ["The class Student itself", "The particular object being built right now", "A keyword you must never write", "The name of the student"],
      answer: 1,
      explain: "self is the specific instance being worked on. Python passes the new object in as self automatically — that's why you call Student(\"Asha\", 85) with only two arguments.",
    },
    {
      q: 'You call Student("Asha", 85) and __init__ is def __init__(self, name, mark). How many arguments did YOU pass, and how many parameters does __init__ have?',
      options: ["3 and 3", "2 and 3 — Python supplies self", "2 and 2", "3 and 2"],
      answer: 1,
      explain: "You pass 2 (\"Asha\", 85); __init__ lists 3 (self, name, mark). Python fills self with the new object, so your count is always one less than the parameter list.",
    },
    {
      q: "Inside __init__ you write `mark = mark` instead of `self.mark = mark`. What happens?",
      options: ["Same thing — both store the mark", "mark is set as a local that vanishes; the object has no .mark attribute", "SyntaxError", "It stores mark on the class, not the object"],
      answer: 1,
      explain: "Without self., you just reassign a local parameter to itself. Nothing attaches to the object, so later obj.mark raises AttributeError. Only self.x = ... sticks.",
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
          {score === 4 ? "Perfect! self and __init__ hold no mystery for you." :
            score >= 2 ? "Good work! If self is still slippery, replay 'Trace It' — watch Python pass the object in as self." :
              "Worth a replay: 'Trace It' and the self gotcha. Remember: self = this object; self.x = ... makes data stick."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 10.2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can write __init__ to build fully-formed objects in one line, and you understand self — the
            object the method is working on.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 10.3 — Methods &amp; Encapsulation.</strong> Right now
            your objects only hold data. Time to give them BEHAVIOUR: methods like grade() that live inside the
            class and act on the object's own data.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 16, whiteSpace: "pre-wrap", fontFamily: q.q.includes('"') || q.q.includes("__") ? "monospace" : "inherit" }}>{q.q}</div>
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
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: C.purple + "18", border: `1px solid ${C.purple}44`, color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
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

// ── Main ──
export default function Unit10_2({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "anatomy", label: "__init__ & self" },
    { id: "trace", label: "Trace It" },
    { id: "gotcha", label: "Forgetting self" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Born Fully Formed</h3><NeedWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Anatomy of __init__</h3><AnatomyWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Trace It: An Object Is Born</h3><TraceWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The self Trap</h3><GotchaWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 10.2.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 10 › UNIT 10.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>__init__ &amp; self</div>
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
