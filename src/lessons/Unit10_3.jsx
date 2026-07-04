// Unit 10.3 — Methods & Encapsulation (behaviour with data, __str__, self-validation)
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
const gradeOf = (m) => (m >= 90 ? "A" : m >= 75 ? "B" : m >= 50 ? "C" : "F");

// ── Widget 1: Need — free function vs method (behaviour with data) ──
function NeedWidget() {
  const [mark, setMark] = useState(85);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Your objects hold data — but to compute a grade you still reach for a <em>separate</em> function and
        hand it the mark (Unit 8.2 style). What if the student could grade <strong style={{ color: C.text }}>itself</strong>?
        Drag the mark: both give the same grade, but notice where the behaviour lives.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>asha.mark = <strong style={{ color: C.accent }}>{mark}</strong> → grade <strong style={{ color: C.green }}>{gradeOf(mark)}</strong></label>
        <input type="range" min={0} max={100} value={mark} onChange={(e) => setMark(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🔧 SEPARATE FUNCTION</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`def grade(mark):\n    ...\n\nprint(grade(asha.mark))\n# reach outside, pass the field\n# → ${gradeOf(mark)}`}</pre>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 8 }}>Behaviour lives apart from the data it needs.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🧩 A METHOD (inside the class)</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`class Student:\n    def grade(self):\n        ...uses self.mark...\n\nprint(asha.grade())\n# the student grades itself → ${gradeOf(mark)}`}</pre>
          <div style={{ color: C.green, fontSize: 11.5, marginTop: 8 }}>Behaviour travels WITH the data.</div>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>A method is a function that lives inside a class</strong> and works
        on the object's own data through self. <code style={{ color: C.teal }}>asha.grade()</code> reads like a
        sentence: "Asha, grade yourself." Data and the behaviour that belongs to it, finally together.
      </>)}
    </div>
  );
}

// ── Widget 2: Anatomy of a method ──
function AnatomyWidget() {
  const [sel, setSel] = useState(0);
  const parts = [
    { text: "    def grade(self):", color: C.accent, title: "def ...(self)", body: "A method is just a def written INSIDE the class, and its first parameter is always self — the object it will work on. Same as __init__." },
    { text: "\n        if self.mark >= 90:", color: C.teal, title: "self.mark — the object's own data", body: "Inside the method, self.mark reads THIS object's mark slot. No parameter needed — the data is already part of the object." },
    { text: '\n            return "A"\n        return "F"', color: C.green, title: "return the result", body: "A method returns a value like any function (Unit 8.2). grade() hands back a letter the caller can use." },
    { text: "\n\nasha.grade()", color: C.purple, title: "calling it", body: "asha.grade() — no argument in the brackets, yet self gets filled. Python turns asha.grade() into grade(asha): the object before the dot becomes self." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A method is a function with one magic parameter. Click each part — especially the call, where self
        quietly gets filled again.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
        <pre style={{ ...mono, fontSize: 13.5 }}>
          <span style={{ color: C.muted }}>class Student:{"\n"}    ...__init__...</span>
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

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>obj.method() becomes method(obj).</strong> The object before the dot
        is handed in as self. That's why every method lists self first but you never pass it — it's the same rule
        you learned for __init__, now for every method.
      </>)}
    </div>
  );
}

// ── Widget 3: __str__ — nice printing ──
function StrWidget() {
  const [nice, setNice] = useState(false);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Try to <code style={{ color: C.accent }}>print()</code> an object and Python shows unreadable gibberish —
        unless you teach the class how to describe itself with the special method
        <code style={{ color: C.accent }}> __str__</code>. Toggle it.
      </p>

      <button onClick={() => setNice((b) => !b)} style={{
        padding: "9px 16px", borderRadius: 8, marginBottom: 14, cursor: "pointer", fontWeight: 600, fontSize: 13,
        background: nice ? C.green + "22" : C.card, border: `1.5px solid ${nice ? C.green : C.border}`,
        color: nice ? C.green : C.text,
      }}>{nice ? "◀ Remove __str__" : "▶ Add a __str__ method"}</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE CLASS</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark${nice ? `\n\n    def __str__(self):\n        return self.name + ": " + str(self.mark)` : ""}

asha = Student("Asha", 85)
print(asha)`}</pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${nice ? C.green : C.red}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: nice ? C.green : C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          {nice ? (
            <pre style={{ ...mono, color: C.green }}>{`Asha: 85`}</pre>
          ) : (
            <pre style={{ ...mono, color: C.red, fontSize: 11.5 }}>{`<__main__.Student object\n at 0x7f3a9c1e2050>`}</pre>
          )}
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 8, lineHeight: 1.6 }}>
            {nice
              ? "print() calls __str__ behind the scenes and shows your friendly string."
              : "With no __str__, print falls back to the object's type and memory address — useless to a human."}
          </div>
        </div>
      </div>

      {insight(C.teal, <>
        <strong style={{ color: C.teal }}>__str__ defines what print() shows.</strong> Like __init__, the double
        underscores mark it as special — Python calls it automatically whenever your object needs to become text.
        A tiny method, a huge readability win.
      </>)}
    </div>
  );
}

// ── Widget 4: Encapsulation — the object guards its own data ──
function EncapsulationWidget() {
  const [mark, setMark] = useState(85);
  const [stored, setStored] = useState(85);
  const [msg, setMsg] = useState({ ok: true, text: "Stored mark: 85" });

  const trySet = () => {
    if (mark < 0 || mark > 100) {
      setMsg({ ok: false, text: `ValueError: mark must be 0-100  →  rejected. Stored stays ${stored}.` });
    } else {
      setStored(mark);
      setMsg({ ok: true, text: `Accepted. Stored mark is now ${mark}.` });
    }
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Anyone can do <code style={{ color: C.red }}>asha.mark = 999</code> and corrupt the data. Encapsulation
        means the object guards its own state: outsiders change it only through a method that enforces the rules
        (your Unit 9.2 <code style={{ color: C.accent }}>raise</code>!). Pick a value and try to set it.
      </p>

      <div style={{ marginBottom: 12 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>value to set = <strong style={{ color: (mark < 0 || mark > 100) ? C.red : C.green }}>{mark}</strong></label>
        <input type="range" min={-20} max={120} value={mark} onChange={(e) => setMark(Number(e.target.value))} style={{ width: "100%", accentColor: (mark < 0 || mark > 100) ? C.red : C.green }} />
      </div>
      <button onClick={trySet} style={{
        padding: "9px 18px", borderRadius: 8, marginBottom: 14, cursor: "pointer", fontWeight: 600, fontSize: 13,
        background: C.accentGlow, border: "none", color: "#fff",
      }}>asha.set_mark({mark})</button>

      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE GUARD METHOD</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`class Student:
    def set_mark(self, m):
        if m < 0 or m > 100:
            raise ValueError(
                "mark must be 0-100")
        self.mark = m`}</pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${msg.ok ? C.green : C.red}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>OBJECT STATE</div>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: C.muted }}>asha.mark</div>
            <div style={{ border: `2px solid ${C.teal}`, borderRadius: 8, padding: "8px", fontFamily: "monospace", fontSize: 16, background: C.surface, color: C.text, fontWeight: 700 }}>{stored}</div>
          </div>
          <div style={{ color: msg.ok ? C.green : C.red, fontSize: 11.5, lineHeight: 1.6 }}>{msg.ok ? "✓ " : "✗ "}{msg.text}</div>
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Encapsulation = the object controls how its data changes.</strong> By
        funnelling every change through <code style={{ color: C.teal }}>set_mark</code>, the class can guarantee a
        mark is always 0-100. The rules live with the data they protect — impossible in C's plain struct.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What makes a method different from a plain function?",
      options: ["Methods can't return values", "A method is defined inside a class and takes self as its first parameter", "Methods are always faster", "Methods don't need def"],
      answer: 1,
      explain: "A method is a function that lives in a class and receives the object as self. That's how it can work on the object's own data without being handed it separately.",
    },
    {
      q: "asha.grade() has empty brackets, yet the method is def grade(self). How does self get a value?",
      options: ["self stays empty", "Python turns asha.grade() into grade(asha) — the object before the dot becomes self", "You must write asha.grade(asha)", "self is always the class"],
      answer: 1,
      explain: "obj.method() is shorthand for method(obj). The object before the dot is passed in as self automatically — so you call grade() with no visible argument.",
    },
    {
      q: "You print(asha) and see `<__main__.Student object at 0x7f...>`. How do you get a friendly output like `Asha: 85`?",
      options: ["Use a bigger print()", "Define a __str__(self) method that returns the string you want", "Rename the class", "It's impossible"],
      answer: 1,
      explain: "print() calls __str__ if you've defined one. Return self.name + \": \" + str(self.mark) and print(asha) shows Asha: 85 instead of the default gibberish.",
    },
    {
      q: "Why funnel every mark change through a set_mark method that can raise ValueError?",
      options: ["It's shorter to type", "So the object enforces its own rules — the mark can never become invalid", "Methods are required for all attributes", "To make the program slower"],
      answer: 1,
      explain: "That's encapsulation: the object guards its data. If the only way in is set_mark, and set_mark rejects out-of-range values, the object's mark is always valid — no outsider can corrupt it.",
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
          {score === 4 ? "Perfect! Your objects can act and protect themselves." :
            score >= 2 ? "Good work! If self-in-methods is fuzzy, replay 'Anatomy' — obj.method() becomes method(obj)." :
              "Worth a replay: 'Anatomy' and 'Encapsulation'. Methods act on self; guard methods keep data valid."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 10.3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Your objects now have behaviour: methods that act on their own data, __str__ for readable printing,
            and guard methods that protect their state.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 10.4 — Inheritance.</strong> A Student and a Teacher
            share a name and email but differ in the rest. Inheritance lets one class build ON another instead of
            copy-pasting the shared parts.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 16, whiteSpace: "pre-wrap", fontFamily: q.q.includes("`") || q.q.includes("(") ? "monospace" : "inherit" }}>{q.q}</div>
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
export default function Unit10_3({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Data + Behaviour" },
    { id: "anatomy", label: "Method Anatomy" },
    { id: "str", label: "__str__" },
    { id: "encap", label: "Encapsulation" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Let Objects Act</h3><NeedWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Anatomy of a Method</h3><AnatomyWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>__str__: Teach It to Print</h3><StrWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Encapsulation: Guard the Data</h3><EncapsulationWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 10.3.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 10 › UNIT 10.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Methods &amp; Encapsulation</div>
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
