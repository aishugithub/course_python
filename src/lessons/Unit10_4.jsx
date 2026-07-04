// Unit 10.4 — Inheritance (base/subclass, super(), overriding, is-a)
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

// ── Widget 1: Need — duplicated classes vs a shared base ──
function NeedWidget() {
  const [shared, setShared] = useState(false);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A Student and a Teacher both have a name and an email and can introduce themselves — only the extras
        differ. Written separately, the shared parts are <strong style={{ color: C.text }}>copy-pasted</strong> —
        the same trap functions solved in Unit 8.1. Toggle the fix.
      </p>

      <button onClick={() => setShared((b) => !b)} style={{
        padding: "9px 16px", borderRadius: 8, marginBottom: 14, cursor: "pointer", fontWeight: 600, fontSize: 13,
        background: shared ? C.green + "22" : C.card, border: `1.5px solid ${shared ? C.green : C.border}`,
        color: shared ? C.green : C.text,
      }}>{shared ? "◀ Back to copy-paste" : "▶ Share a base class"}</button>

      {!shared ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
            <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ Student</div>
            <pre style={{ ...mono, fontSize: 11.5 }}>{`class Student:
    def __init__(self, name, email):
        self.name = name    # dup
        self.email = email  # dup
        self.mark = 0
    def hello(self):        # dup
        return "Hi, " + self.name`}</pre>
          </div>
          <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
            <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ Teacher</div>
            <pre style={{ ...mono, fontSize: 11.5 }}>{`class Teacher:
    def __init__(self, name, email):
        self.name = name    # dup
        self.email = email  # dup
        self.salary = 0
    def hello(self):        # dup
        return "Hi, " + self.name`}</pre>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ background: C.card, border: `1.5px solid ${C.purple}55`, borderRadius: 10, padding: 16 }}>
            <div style={{ color: C.purple, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>👑 Person (the base)</div>
            <pre style={{ ...mono, fontSize: 11.5 }}>{`class Person:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    def hello(self):
        return "Hi, " + self.name`}</pre>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 6 }}>Shared parts, written ONCE.</div>
          </div>
          <div style={{ background: C.card, border: `1.5px solid ${C.green}55`, borderRadius: 10, padding: 16 }}>
            <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🧬 the two children</div>
            <pre style={{ ...mono, fontSize: 11.5 }}>{`class Student(Person):
    ...adds self.mark

class Teacher(Person):
    ...adds self.salary

# both INHERIT name, email,
# and hello() from Person`}</pre>
          </div>
        </div>
      )}

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Inheritance lets one class build ON another.</strong> Put the shared
        parts in a base class (Person); each child class (Student, Teacher) automatically gets them and adds only
        what's different. Fix hello() once in Person and both children are fixed — the copy-paste trap, gone again.
      </>)}
    </div>
  );
}

// ── Widget 2: Anatomy — subclass + super() ──
function AnatomyWidget() {
  const [sel, setSel] = useState(0);
  const parts = [
    { text: "class Student(Person):", color: C.accent, title: "class Child(Parent)", body: "The (Person) in the brackets means 'Student INHERITS from Person'. A Student instantly has everything Person has — name, email, hello() — for free." },
    { text: "\n    def __init__(self, name, email, mark):", color: C.teal, title: "the child's own __init__", body: "Student needs an extra piece (mark), so it defines its own constructor with one more parameter than Person's." },
    { text: "\n        super().__init__(name, email)", color: C.purple, title: "super() — call the parent", body: "super() means 'the parent class'. This line runs Person's __init__ to set name and email, so you don't repeat those lines. Reuse, don't copy." },
    { text: "\n        self.mark = mark", color: C.green, title: "add the new part", body: "After the parent has done its setup, the child adds what's unique to it. Now a Student has name, email AND mark." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Two new pieces of syntax: <code style={{ color: C.accent }}>(Person)</code> to inherit, and
        <code style={{ color: C.purple }}> super()</code> to reuse the parent's constructor. Click each.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
        <pre style={{ ...mono, fontSize: 13 }}>
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
        <strong style={{ color: C.purple }}>super().__init__(...) runs the parent's setup first, then you add the extras.</strong> It's
        the difference between "a Student IS-A Person, plus a mark" and copy-pasting Person's code into Student.
        Inheritance models real "is-a" relationships: a Student is a Person; a Circle is a Shape.
      </>)}
    </div>
  );
}

// ── Widget 3: See It — method lookup + override ──
function LookupWidget() {
  const [overridden, setOverridden] = useState(false);
  const foundIn = overridden ? "Student" : "Person";

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        When you call <code style={{ color: C.accent }}>asha.hello()</code>, Python looks in the child class
        FIRST, then walks up to the parent. If Student <em>overrides</em> hello(), its version wins. Toggle the
        override and watch where Python finds the method.
      </p>

      <button onClick={() => setOverridden((b) => !b)} style={{
        padding: "9px 16px", borderRadius: 8, marginBottom: 16, cursor: "pointer", fontWeight: 600, fontSize: 13,
        background: overridden ? C.teal + "22" : C.card, border: `1.5px solid ${overridden ? C.teal : C.border}`,
        color: overridden ? C.teal : C.text,
      }}>{overridden ? "◀ Remove Student's own hello()" : "▶ Override hello() in Student"}</button>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `2px solid ${foundIn === "Student" ? C.green : C.border}`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>class Student(Person) {foundIn === "Student" ? "  ← found here! ✓" : ""}</div>
          <pre style={{ ...mono, fontSize: 11.5, color: overridden ? C.text : C.muted }}>{overridden ? `    def hello(self):\n        return "Hey! I'm " + self.name + " (student)"` : "    # no hello() here — look in the parent ↓"}</pre>
        </div>
        <div style={{ textAlign: "center", color: C.muted, fontSize: 18 }}>⬆ inherits from</div>
        <div style={{ background: C.card, border: `2px solid ${foundIn === "Person" ? C.green : C.border}`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.purple, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>class Person {foundIn === "Person" ? "  ← found here! ✓" : ""}</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`    def hello(self):\n        return "Hi, " + self.name`}</pre>
        </div>
      </div>

      <div style={{ background: "#010409", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
        <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>asha = Student("Asha", ...) ; print(asha.hello())</div>
        <pre style={{ ...mono, color: C.green }}>{overridden ? "Hey! I'm Asha (student)" : "Hi, Asha"}</pre>
      </div>

      {insight(C.teal, <>
        <strong style={{ color: C.teal }}>Child first, then parent.</strong> Python searches the object's own
        class before the base class, so a method defined in Student <em>overrides</em> the same-named one in
        Person. Don't override it, and the inherited version is used automatically. That's how children reuse OR
        customise behaviour.
      </>)}
    </div>
  );
}

// ── Widget 4: Build It — Person → Student & Teacher ──
function BuildWidget() {
  const [who, setWho] = useState("student");
  const isS = who === "student";
  const output = isS ? 'Hi, I am Asha. I study, my mark is 85.' : 'Hi, I am Mr Rao. I teach Physics.';

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        One base, two children, each overriding <code style={{ color: C.accent }}>describe()</code> its own way
        while sharing Person's setup. Flip between them and read the output.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setWho("student")} style={{
          flex: 1, padding: "8px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13,
          background: isS ? C.green + "22" : C.card, border: `1.5px solid ${isS ? C.green : C.border}`, color: isS ? C.green : C.muted,
        }}>a Student</button>
        <button onClick={() => setWho("teacher")} style={{
          flex: 1, padding: "8px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13,
          background: !isS ? C.teal + "22" : C.card, border: `1.5px solid ${!isS ? C.teal : C.border}`, color: !isS ? C.teal : C.muted,
        }}>a Teacher</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE PROGRAM</div>
          <pre style={{ ...mono, fontSize: 11 }}>{`class Person:
    def __init__(self, name):
        self.name = name

class Student(Person):
    def __init__(self, name, mark):
        super().__init__(name)
        self.mark = mark
    def describe(self):
        return ("Hi, I am " + self.name +
          ". I study, my mark is " + str(self.mark) + ".")

class Teacher(Person):
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject
    def describe(self):
        return ("Hi, I am " + self.name +
          ". I teach " + self.subject + ".")

${isS ? 'p = Student("Asha", 85)' : 'p = Teacher("Mr Rao", "Physics")'}
print(p.describe())`}</pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${(isS ? C.green : C.teal)}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.muted, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          <pre style={{ ...mono, color: isS ? C.green : C.teal, fontSize: 11.5 }}>{output}</pre>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 10, lineHeight: 1.6 }}>
            Both share Person's name setup via super(), but each describe() is its own. Same call
            (p.describe()), different behaviour — that's the power of overriding.
          </div>
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>Write once in the parent, specialise in each child.</strong> Person
        handles the common ground; Student and Teacher each add their own data and their own describe(). This is
        how big programs stay organised: a family tree of classes instead of one giant pile of code.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "class Student(Person): — what does the (Person) part do?",
      options: ["Passes Person as an argument", "Makes Student inherit all of Person's attributes and methods", "Deletes Person", "Renames Student to Person"],
      answer: 1,
      explain: "(Person) makes Student a subclass of Person: it automatically gets Person's __init__, attributes and methods, and can add or override its own.",
    },
    {
      q: "Inside Student's __init__, what does super().__init__(name, email) do?",
      options: ["Creates a second student", "Runs the PARENT (Person) constructor so you don't repeat its setup", "Calls Student's own __init__ again (infinite loop)", "Nothing"],
      answer: 1,
      explain: "super() refers to the parent class. super().__init__(name, email) runs Person's setup for name and email, then the child adds its extras — reuse instead of copy-paste.",
    },
    {
      q: "Student defines its own hello(), and Person also has hello(). Which runs for a Student object?",
      options: ["Person's — the parent always wins", "Student's — Python checks the child class first", "Both run", "Neither; it's an error"],
      answer: 1,
      explain: "Python looks in the object's own class first. Student's hello() OVERRIDES Person's. If Student had no hello(), it would fall back to Person's inherited version.",
    },
    {
      q: "Inheritance models which kind of relationship best?",
      options: ['"has-a" (a car has an engine)', '"is-a" (a Student is a Person)', '"next-to" ordering', "no relationship"],
      answer: 1,
      explain: 'Inheritance is for "is-a": a Student IS-A Person, a Circle IS-A Shape. The child is a more specific kind of the parent, reusing and extending it.',
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
          {score === 4 ? "Perfect! You can build class family trees." :
            score >= 2 ? "Good work! If super() is fuzzy, replay 'Anatomy' — it runs the parent's setup for you." :
              "Worth a replay: 'See It' (child-first lookup) and 'Build It'. Inheritance = is-a, reuse, override."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 10.4 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can build a base class and specialise it with subclasses, reuse the parent via super(), and
            override methods to customise behaviour.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 10.5 — Capstone: Marks Manager 3.0.</strong> Time to
            rebuild the whole app around a Student class and a Classroom class — objects all the way down, with
            everything Module 10 gave you.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 16, whiteSpace: "pre-wrap", fontFamily: q.q.includes("(") ? "monospace" : "inherit" }}>{q.q}</div>
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
export default function Unit10_4({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Why Inherit?" },
    { id: "anatomy", label: "subclass & super()" },
    { id: "lookup", label: "See It" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Stop Copy-Pasting Classes</h3><NeedWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Anatomy of a Subclass</h3><AnatomyWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>See It: Method Lookup</h3><LookupWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build It: One Family, Two Roles</h3><BuildWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 10.4.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 10 › UNIT 10.4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Inheritance</div>
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
