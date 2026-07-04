// Unit 10.1 — Why Objects? (classes, instances, attributes)
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

// ── Widget 1: The Need — parallel lists desync vs bundled objects ──
function NeedWidget() {
  const [deleted, setDeleted] = useState(false);
  const base = [["Asha", 85], ["Ravi", 72], ["Meena", 91]];
  const names = deleted ? ["Asha", "Meena"] : base.map((s) => s[0]);
  const marks = deleted ? [85, 72, 91] : base.map((s) => s[1]);   // buggy: marks NOT updated
  const objs = deleted ? [["Asha", 85], ["Meena", 91]] : base;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A student is really <em>one</em> thing — a name AND a mark that belong together. But so far you'd store
        them in <strong style={{ color: C.text }}>separate lists</strong> (Unit 7.2). Watch what happens when
        you delete "Ravi" from the names but forget the marks.
      </p>

      <button onClick={() => setDeleted((d) => !d)} style={{
        padding: "9px 16px", borderRadius: 8, marginBottom: 16, cursor: "pointer", fontWeight: 600, fontSize: 13,
        background: C.accentGlow, border: "none", color: "#fff",
      }}>{deleted ? "↺ Reset" : "🗑 Delete Ravi (index 1)"}</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${deleted ? C.red : C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ TWO PARALLEL LISTS</div>
          <pre style={mono}>{`names = [${names.map((n) => `"${n}"`).join(", ")}]\nmarks = [${marks.join(", ")}]`}</pre>
          <div style={{ marginTop: 10 }}>
            {names.map((n, i) => (
              <div key={i} style={{ fontFamily: "monospace", fontSize: 12.5, color: deleted && n === "Meena" ? C.red : C.text }}>
                {n} → {marks[i]}{deleted && n === "Meena" ? "  ⚠ wrong!" : ""}
              </div>
            ))}
          </div>
          {deleted && <div style={{ color: C.red, fontSize: 11.5, marginTop: 8, lineHeight: 1.6 }}>Meena now shows 72 (Ravi's mark), and 91 is orphaned. The lists drifted out of sync.</div>}
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ ONE OBJECT PER STUDENT</div>
          <pre style={mono}>{`students = [\n${objs.map(([n, m]) => `  Student(${n}, ${m})`).join(",\n")}\n]`}</pre>
          <div style={{ marginTop: 10 }}>
            {objs.map(([n, m], i) => (
              <div key={i} style={{ fontFamily: "monospace", fontSize: 12.5, color: C.text }}>{n} → {m} ✓</div>
            ))}
          </div>
          {deleted && <div style={{ color: C.green, fontSize: 11.5, marginTop: 8, lineHeight: 1.6 }}>Deleting Ravi removed his name AND mark together. Meena keeps her 91. Nothing can drift.</div>}
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>An object bundles data that belongs together.</strong> Instead of a
        name here and a mark there, one <code style={{ color: C.teal }}>Student</code> object carries both — so
        they can never fall out of step. This unit builds your own kind of thing: a class.
      </>)}
    </div>
  );
}

// ── Widget 2: Anatomy — class + instance + attributes, C contrast ──
function AnatomyWidget() {
  const [sel, setSel] = useState(0);
  const parts = [
    { text: "class ", color: C.accent, title: "class — the keyword", body: "Announces you're defining a brand-new KIND of thing — a blueprint. Like def creates a function, class creates a type." },
    { text: "Student", color: C.teal, title: "the class name", body: "You choose it. Convention: start with a Capital letter (Student, BankAccount) so classes stand out from variables and functions." },
    { text: ":\n    pass", color: C.purple, title: "the body", body: "The indented block, same colon-and-indent rule as always. pass means 'empty for now' — soon this holds __init__ and methods." },
    { text: "\n\ns1 = Student()", color: C.green, title: "making an instance", body: "Student() BUILDS one object from the blueprint — an 'instance'. s1 is now a real student object, ready to carry data." },
    { text: '\ns1.name = "Asha"\ns1.mark = 85', color: C.orange, title: "attaching attributes", body: "s1.name creates an attribute on THIS object. Attributes are the object's own variables — its slots. (Next unit, __init__ sets these automatically.)" },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Meet the <code style={{ color: C.accent }}>class</code>. Think blueprint vs building: the class is the
        blueprint for a house; each <code style={{ color: C.green }}>Student()</code> builds one actual house
        you can furnish. Click each part.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
        <pre style={{ ...mono, fontSize: 14 }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>⚙️ IN C — a struct</div>
          <pre style={mono}>{`struct Student {\n    char name[20];\n    int mark;\n};\n/* holds DATA only.\n   the functions that work\n   on it live SEPARATELY */`}</pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.accent}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 IN PYTHON — a class</div>
          <pre style={mono}>{`class Student:\n    pass\n\n# holds data too —\n# and soon, the behaviour\n# that belongs WITH it`}</pre>
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>A class is a blueprint; an instance is a thing built from it.</strong> C's
        struct bundles data; Python's class will bundle data <em>and</em> behaviour together (Unit 10.3). One
        blueprint, as many independent instances as you like.
      </>)}
    </div>
  );
}

// ── Widget 3: See It — instances are independent ──
function IndependenceWidget() {
  const [ashaMark, setAshaMark] = useState(85);
  const raviMark = 72;

  const objCard = (name, mark, editable) => (
    <div style={{ background: C.card, border: `1.5px solid ${C.teal}55`, borderRadius: 10, padding: 14, flex: 1 }}>
      <div style={{ color: C.teal, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>OBJECT: {name.toLowerCase()}</div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 10, color: C.muted }}>.name</div>
          <div style={{ border: `2px solid ${C.teal}`, borderRadius: 8, padding: "6px 4px", fontFamily: "monospace", fontSize: 12.5, background: C.surface }}>{name}</div>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 10, color: C.muted }}>.mark</div>
          <div style={{ border: `2px solid ${editable ? C.accent : C.teal}`, borderRadius: 8, padding: "6px 4px", fontFamily: "monospace", fontSize: 12.5, background: C.surface, color: editable ? C.accent : C.text, fontWeight: 700 }}>{mark}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        One blueprint, but every instance gets its <strong style={{ color: C.text }}>own set of slots</strong> —
        just like the memory slots from Unit 4.2, one cluster per object. Drag Asha's mark and watch: Ravi
        doesn't budge.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>asha.mark = <strong style={{ color: C.accent }}>{ashaMark}</strong></label>
        <input type="range" min={0} max={100} value={ashaMark} onChange={(e) => setAshaMark(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
        {objCard("Asha", ashaMark, true)}
        {objCard("Ravi", raviMark, false)}
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
        <pre style={mono}>{`asha = Student()\nasha.name = "Asha"\nasha.mark = ${ashaMark}\n\nravi = Student()\nravi.name = "Ravi"\nravi.mark = 72   # untouched by changes to asha`}</pre>
      </div>

      {insight(C.teal, <>
        <strong style={{ color: C.teal }}>Each instance has its own attribute slots.</strong> asha.mark and
        ravi.mark are separate boxes in memory. Change one and the other is unaffected — that independence is
        exactly why objects don't drift the way parallel lists do.
      </>)}
    </div>
  );
}

// ── Widget 4: Build It — a roster of objects ──
function BuildWidget() {
  const roster = [["Asha", 85], ["Ravi", 72], ["Meena", 91], ["Karthik", 68], ["Priya", 77]];
  const [n, setN] = useState(3);
  const shown = roster.slice(0, n);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A real mini-program: turn raw pairs into a list of Student objects (your Module 6 loop + Module 7 tuple
        unpacking, now building objects). Drag to change how many students.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>students = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={1} max={5} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE PROGRAM</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`raw = [${shown.map(([nm, m]) => `("${nm}", ${m})`).join(", ")}]\nstudents = []\nfor name, mark in raw:\n    s = Student()\n    s.name = name\n    s.mark = mark\n    students.append(s)\n\nfor s in students:\n    print(s.name, "->", s.mark)`}</pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          <pre style={{ ...mono, color: C.green }}>{shown.map(([nm, m]) => `${nm} -> ${m}`).join("\n")}</pre>
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>It works — but look how clunky that is:</strong> three lines
        (<code>s.name=... s.mark=...</code>) to furnish every single student, and it's easy to forget one. There
        has to be a way to build a fully-formed student in ONE line: <code style={{ color: C.teal }}>Student("Asha", 85)</code>.
        That's <code style={{ color: C.accent }}>__init__</code> — the next unit.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What is the difference between a class and an instance?",
      options: ["They're two words for the same thing", "A class is a blueprint; an instance is one actual object built from it", "A class is faster; an instance is slower", "An instance is a blueprint; a class is the object"],
      answer: 1,
      explain: "class Student is the blueprint (the KIND of thing). Each Student() call builds one instance — an actual object with its own attribute slots.",
    },
    {
      q: 'asha = Student()\nasha.mark = 85\nravi = Student()\nravi.mark = 72\nasha.mark = 100\n\nWhat is ravi.mark now?',
      options: ["100", "72", "85", "Error"],
      answer: 1,
      explain: "Each instance has its own slots. Changing asha.mark touches only asha's box — ravi.mark stays 72. Independent objects don't share attributes.",
    },
    {
      q: "Why is one Student object better than two parallel lists (names and marks)?",
      options: ["Objects use less memory", "The name and mark are bundled, so they can't drift out of sync", "Lists are not allowed in OOP", "Objects run faster"],
      answer: 1,
      explain: "Parallel lists can desync (delete from one, forget the other). An object keeps related data glued together, so deleting a student removes name and mark as one unit.",
    },
    {
      q: "What does Student() do (with the parentheses)?",
      options: ["Defines the class", "Deletes an object", "Builds a new instance of the class", "Prints all students"],
      answer: 2,
      explain: "class Student: defines the blueprint; Student() (called like a function) builds and hands back a new instance. You can call it as many times as you want.",
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
          {score === 4 ? "Perfect! You get the blueprint-vs-instance idea." :
            score >= 2 ? "Good work! If independence tripped you, replay 'See It' — each object has its own slots." :
              "Worth a replay: the Need widget and 'See It'. A class is a blueprint; each instance is its own bundle."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 10.1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can define a class, build instances with Student(), and attach attributes that stay bundled and
            independent.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 10.2 — __init__ &amp; self.</strong> Furnishing each
            object by hand is clunky. __init__ is a special method that builds a fully-formed object in one line:
            Student("Asha", 85). Time to meet self.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 16, whiteSpace: "pre-wrap", fontFamily: q.q.includes("\n") ? "monospace" : "inherit" }}>{q.q}</div>
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
export default function Unit10_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Why Objects?" },
    { id: "anatomy", label: "class Anatomy" },
    { id: "independence", label: "See It" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>When Data Belongs Together</h3><NeedWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Anatomy of a class</h3><AnatomyWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Each Object, Its Own Slots</h3><IndependenceWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build It: A Roster of Objects</h3><BuildWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 10.1.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 10 › UNIT 10.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Why Objects?</div>
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
