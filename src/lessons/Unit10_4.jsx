// Unit 10.4 — Inheritance
// One Person → Student / Teacher family grows tab by tab (v1 → v5), then the whole
// program is traced, compared with C / C++ / Java, and transferred to bank accounts.
import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };
const lead = { color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 };
const cardBox = (col) => ({ background: C.card, border: `1.5px solid ${col || C.border}`, borderRadius: 10, padding: 16 });
const tag = (col) => ({ color: col, fontWeight: 700, fontSize: 12, marginBottom: 10, letterSpacing: 0.3 });
const twoCol = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 };
const btn = (col, on) => ({
  padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 12.5,
  background: on ? col + "26" : C.card, border: `1.5px solid ${on ? col : C.border}`, color: on ? col : C.text,
  fontFamily: "monospace",
});
const insight = (color, children) => (
  <div style={{ marginTop: 16, background: color + "18", border: `1px solid ${color}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
    🔑 {children}
  </div>
);
const isErrLine = (l) => /^(Traceback|AttributeError|ValueError|TypeError|  \.\.\.)/.test(l);
const OutLines = ({ text }) => (
  <pre style={{ ...mono, fontSize: 12, background: C.surface, borderRadius: 8, padding: 10 }}>
    {text.split("\n").map((l, i) => <div key={i} style={{ color: isErrLine(l) ? C.red : C.green }}>{l || " "}</div>)}
  </pre>
);

// ── The growing family (single source of truth for every tab) ──
// v2 Person + empty children, v3 super().__init__, v4 child-only method, v5 override + super().describe()
const FAMILY = [
  { t: "class Person:", v: 2 },
  { t: "    def __init__(self, name, email):", v: 2 },
  { t: "        self.name = name", v: 2 },
  { t: "        self.email = email", v: 2 },
  { t: "", v: 2 },
  { t: "    def describe(self):", v: 2 },
  { t: '        return "Hi, I am " + self.name + "."', v: 2 },
  { t: "", v: 2 },
  { t: "class Student(Person):", v: 2 },
  { t: "    pass", v: 2, to: 2 },
  { t: "    def __init__(self, name, email, mark):", v: 3 },
  { t: "        super().__init__(name, email)", v: 3 },
  { t: "        self.mark = mark", v: 3 },
  { t: "", v: 4 },
  { t: "    def grade(self):", v: 4 },
  { t: "        if self.mark >= 90:", v: 4 },
  { t: '            return "A"', v: 4 },
  { t: "        elif self.mark >= 75:", v: 4 },
  { t: '            return "B"', v: 4 },
  { t: "        elif self.mark >= 50:", v: 4 },
  { t: '            return "C"', v: 4 },
  { t: '        return "F"', v: 4 },
  { t: "", v: 5 },
  { t: "    def describe(self):", v: 5 },
  { t: '        return super().describe() + " I study, my mark is " + str(self.mark) + "."', v: 5 },
  { t: "", v: 2 },
  { t: "class Teacher(Person):", v: 2 },
  { t: "    pass", v: 2, to: 2 },
  { t: "    def __init__(self, name, email, subject):", v: 3 },
  { t: "        super().__init__(name, email)", v: 3 },
  { t: "        self.subject = subject", v: 3 },
  { t: "", v: 5 },
  { t: "    def describe(self):", v: 5 },
  { t: '        return super().describe() + " I teach " + self.subject + "."', v: 5 },
];

const familyAt = (ver) =>
  FAMILY.filter((l) => l.v <= ver && (!l.to || ver <= l.to)).map((l) => ({ t: l.t, v: l.v, state: l.v === ver ? "new" : "old" }));

const USAGE = {
  2: { code: 'asha = Student("Asha", "asha@uni.edu")\nrao = Teacher("Mr Rao", "rao@uni.edu")\nprint(asha.describe())\nprint(rao.email)', out: "Hi, I am Asha.\nrao@uni.edu" },
  3: { code: 'asha = Student("Asha", "asha@uni.edu", 85)\nrao = Teacher("Mr Rao", "rao@uni.edu", "Physics")\nprint(asha.name, asha.mark)\nprint(rao.name, rao.subject)', out: "Asha 85\nMr Rao Physics" },
  4: { code: "print(asha.grade())\nprint(rao.grade())", out: "B\nTraceback (most recent call last):\n  ...\nAttributeError: 'Teacher' object has no attribute 'grade'" },
  5: { code: "print(asha.describe())\nprint(rao.describe())", out: "Hi, I am Asha. I study, my mark is 85.\nHi, I am Mr Rao. I teach Physics." },
};

const VERSION_NOTE = {
  2: "v2 — Person holds the shared parts. Student and Teacher inherit everything (pass = nothing extra yet).",
  3: "v3 — each child gets its own __init__, calls super().__init__ for the shared part, then adds its extra. (pass is gone.)",
  4: "v4 — Student gains a method only students have: grade() (the one you wrote in 10.3).",
  5: "v5 — both children override describe(), reusing Person's version through super().describe().",
};

function GrowingFamily({ version }) {
  const [open, setOpen] = useState(true);
  const lines = familyAt(version);
  const u = USAGE[version];
  return (
    <div style={{ ...cardBox(C.accent + "55"), marginBottom: 16 }}>
      <div onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <span style={{ background: C.accentGlow, color: "#fff", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>v{version}</span>
        <span style={{ color: C.accent, fontWeight: 700, fontSize: 12.5 }}>📜 Our class family so far</span>
        <span style={{ marginLeft: "auto", color: C.muted, fontSize: 11 }}>{open ? "▲ hide" : "▼ show"}</span>
      </div>
      {open && (
        <>
          <div style={{ color: C.muted, fontSize: 11.5, margin: "8px 0 10px" }}>{VERSION_NOTE[version]}</div>
          <div style={{ overflowX: "auto" }}>
            {lines.map((l, i) => (
              <div key={i} style={{
                display: "flex", fontFamily: "monospace", fontSize: 12, lineHeight: 1.75, whiteSpace: "pre",
                background: l.state === "new" ? C.green + "1c" : "transparent",
                borderLeft: `3px solid ${l.state === "new" ? C.green : "transparent"}`,
              }}>
                <span style={{ width: 18, textAlign: "center", color: C.green, flexShrink: 0 }}>{l.state === "new" ? "+" : ""}</span>
                <span style={{ color: l.state === "old" ? C.muted : C.text }}>{l.t || " "}</span>
              </div>
            ))}
          </div>
          <div style={{ ...twoCol, marginTop: 10 }}>
            <pre style={{ ...mono, fontSize: 12, background: C.surface, borderRadius: 8, padding: 10 }}>{u.code}</pre>
            <OutLines text={u.out} />
          </div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>
            <span style={{ color: C.green }}>+ new line</span> &nbsp; grey = already built
          </div>
        </>
      )}
    </div>
  );
}

// ── Family tree + method lookup (shared by several tabs) ──
const methodsAt = (ver) => ({
  object: ["__str__()"],
  Person: ["__init__()", "describe()"],
  Student: [...(ver >= 3 ? ["__init__()"] : []), ...(ver >= 4 ? ["grade()"] : []), ...(ver >= 5 ? ["describe()"] : [])],
  Teacher: [...(ver >= 3 ? ["__init__()"] : []), ...(ver >= 5 ? ["describe()"] : [])],
});
const attrsOf = { object: [], Person: ["name", "email"], Student: ["mark"], Teacher: ["subject"] };

const lookup = (ver, cls, m) => {
  const chain = cls === "Person" ? ["Person", "object"] : [cls, "Person", "object"];
  const M = methodsAt(ver);
  const path = [];
  for (const c of chain) {
    path.push(c);
    if (M[c].includes(m)) return { path, found: c };
  }
  return { path, found: null };
};

function FamilyTree({ version, call }) {
  const M = methodsAt(version);
  const res = call ? lookup(version, call.cls, call.m) : null;
  const box = (name) => {
    const visited = res && res.path.includes(name);
    const found = res && res.found === name;
    const col = found ? C.green : visited ? C.yellow : C.border;
    return (
      <div style={{ border: `1.5px solid ${col}`, background: found ? C.green + "18" : visited ? C.yellow + "10" : C.surface, borderRadius: 8, padding: "8px 10px", minWidth: 130, flex: 1, maxWidth: 220 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: C.accent }}>
          <span>{name}</span>
          <span style={{ color: col }}>{found ? "✓ found" : visited ? "✗ not here" : ""}</span>
        </div>
        {attrsOf[name].length > 0 && <div style={{ fontFamily: "monospace", fontSize: 11, color: C.teal, marginTop: 4 }}>{attrsOf[name].map((a) => "." + a).join("  ")}</div>}
        <div style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, marginTop: 2 }}>{M[name].join("  ") || "(nothing of its own)"}</div>
      </div>
    );
  };
  return (
    <div style={{ ...cardBox(), padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "center" }}>{box("object")}</div>
      <div style={{ textAlign: "center", color: C.muted, fontSize: 11, margin: "4px 0" }}>▲ every class inherits from object</div>
      <div style={{ display: "flex", justifyContent: "center" }}>{box("Person")}</div>
      <div style={{ textAlign: "center", color: C.muted, fontSize: 11, margin: "4px 0" }}>▲ inherits from ▲</div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>{box("Student")}{box("Teacher")}</div>
      {res && (
        <div style={{ marginTop: 10, fontFamily: "monospace", fontSize: 12, color: res.found ? C.green : C.red }}>
          search: {res.path.join(" → ")} {res.found ? " ✓ runs " + res.found + "." + call.m : " → AttributeError: '" + call.cls + "' object has no attribute '" + call.m.replace("()", "") + "'"}
        </div>
      )}
    </div>
  );
}

// ── Widget 1: Need — copy-paste classes ──
const ROLES = ["Student", "Teacher", "Staff", "Alumni", "Guest"];
function NeedWidget() {
  const [n, setN] = useState(2);
  const [fix, setFix] = useState(false);
  const roles = ROLES.slice(0, n);
  const dupLines = 7 * n;
  const inhLines = 7 + 2 * n;

  return (
    <div>
      <p style={lead}>
        A college app needs Students and Teachers. Both have a name and an email and can describe themselves; only a few
        extras differ. With what you know from 10.3, you'd write a separate class for each. Add more roles, then try
        changing the greeting from "Hi" to "Hello".
      </p>
      <div style={{ marginBottom: 12 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>roles = <strong style={{ color: C.accent }}>{n}</strong> ({roles.join(", ")})</label>
        <input type="range" min={2} max={5} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>
      <button onClick={() => setFix((f) => !f)} style={{ ...btn(C.yellow, fix), marginBottom: 14 }}>
        {fix ? "◀ Undo the change" : '✏️ Change "Hi" to "Hello" (you edit Student only)'}
      </button>

      <div style={twoCol}>
        <div style={cardBox(C.red + "55")}>
          <div style={tag(C.red)}>❌ ONE CLASS PER ROLE — {dupLines} lines</div>
          <pre style={{ ...mono, fontSize: 11 }}>{`class Student:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def describe(self):
        return "${fix ? "Hello" : "Hi"}, I am " + self.name + "."

class Teacher:
    def __init__(self, name, email):     # copy
        self.name = name                 # copy
        self.email = email               # copy

    def describe(self):                  # copy
        return "Hi, I am " + self.name + "."${n > 2 ? `\n\n# ...and ${n - 2} more identical cop${n - 2 === 1 ? "y" : "ies"}` : ""}`}</pre>
          <div style={{ marginTop: 10 }}>
            {roles.map((r, i) => (
              <div key={r} style={{ fontFamily: "monospace", fontSize: 11.5, color: fix && i > 0 ? C.red : C.green }}>
                {r}: {fix && i === 0 ? "Hello" : "Hi"}, I am …{fix && i > 0 ? "   ← forgot this one!" : ""}
              </div>
            ))}
          </div>
        </div>
        <div style={cardBox(C.green + "55")}>
          <div style={tag(C.green)}>✅ ONE PARENT, MANY CHILDREN — {inhLines} lines</div>
          <pre style={{ ...mono, fontSize: 11 }}>{`class Person:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def describe(self):
        return "${fix ? "Hello" : "Hi"}, I am " + self.name + "."

${roles.map((r) => "class " + r + "(Person):\n    pass").join("\n\n")}`}</pre>
          <div style={{ marginTop: 10 }}>
            {roles.map((r) => (
              <div key={r} style={{ fontFamily: "monospace", fontSize: 11.5, color: C.green }}>{r}: {fix ? "Hello" : "Hi"}, I am …</div>
            ))}
          </div>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Copy-paste is a trap you've escaped before</strong> — loops (M6) and functions
        (M8) fixed it for code; inheritance fixes it for classes. Write the shared parts once in a parent class, and every
        child gets them. Change the parent and every child changes with it.
      </>)}
    </div>
  );
}

// ── Widget 2: class Child(Parent) — what you get for free ──
function ChildWidget() {
  const [sel, setSel] = useState(1);
  const [chk, setChk] = useState(null);
  const parts = [
    { text: "class Student", color: C.accent, title: "class Student", body: "An ordinary class definition, exactly as in 10.1." },
    { text: "(Person)", color: C.purple, title: "(Person) — the parent", body: "The class in brackets is the PARENT (also called base class or superclass). Student is the CHILD (subclass). Student automatically gets every attribute and method Person defines." },
    { text: ":\n    pass", color: C.green, title: "pass — nothing extra (yet)", body: "pass means 'no body of my own'. Student adds nothing, yet it is already fully usable: Student(\"Asha\", \"asha@uni.edu\") works, and asha.describe() works — both come from Person." },
  ];
  const checks = [
    { code: "isinstance(asha, Student)", r: "True", why: "asha was built from Student." },
    { code: "isinstance(asha, Person)", r: "True", why: "A Student IS A Person — the child counts as the parent too." },
    { code: "isinstance(asha, Teacher)", r: "False", why: "Siblings are unrelated: a Student is not a Teacher." },
    { code: "isinstance(rao, Person)", r: "True", why: "A Teacher is also a Person." },
  ];

  return (
    <div>
      <GrowingFamily version={2} />
      <p style={lead}>Click each part of the child class, then check the family tree: Student and Teacher have nothing of their own, yet asha.describe() works.</p>

      <div style={{ ...cardBox(), marginBottom: 12 }}>
        <pre style={{ ...mono, fontSize: 14 }}>
          {parts.map((p, i) => (
            <span key={i} onClick={() => setSel(i)} style={{ color: p.color, cursor: "pointer", fontWeight: sel === i ? 800 : 500, background: sel === i ? p.color + "26" : "transparent", borderRadius: 4 }}>{p.text}</span>
          ))}
        </pre>
      </div>
      <div style={{ background: C.surface, border: `1.5px solid ${parts[sel].color}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ color: parts[sel].color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{parts[sel].title}</div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{parts[sel].body}</div>
      </div>

      <FamilyTree version={2} call={{ cls: "Student", m: "describe()" }} />
      <div style={{ color: C.muted, fontSize: 12, margin: "8px 0 16px" }}>
        asha.describe(): Python looks in Student first, finds nothing, climbs to Person — found. And the default __str__ you saw
        in 10.3 (<code>&lt;__main__.Student object at 0x…&gt;</code>)? It came from <code>object</code>, the parent of every class.
      </div>

      <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Is-a check: isinstance(object, Class)</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {checks.map((c, i) => <button key={i} onClick={() => setChk(i)} style={btn(C.teal, chk === i)}>{c.code}</button>)}
      </div>
      {chk !== null && (
        <div style={{ fontFamily: "monospace", fontSize: 12.5, background: C.surface, borderRadius: 8, padding: 10 }}>
          <span style={{ color: checks[chk].r === "True" ? C.green : C.red }}>{checks[chk].r}</span>
          <span style={{ color: C.muted, fontFamily: "inherit" }}>  — {checks[chk].why}</span>
        </div>
      )}

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>class Child(Parent) means "Child IS A Parent, plus extras."</strong> A child object
        can use everything the parent defines. Inheritance only makes sense when that sentence is true: a Student is a
        Person ✓, a Student is a Classroom ✗.
      </>)}
    </div>
  );
}

// ── Widget 3: super().__init__ — building a child object ──
const SUPER_CODE = [
  "class Person:",
  "    def __init__(self, name, email):",
  "        self.name = name",
  "        self.email = email",
  "",
  "class Student(Person):",
  "    def __init__(self, name, email, mark):",
  "        super().__init__(name, email)",
  "        self.mark = mark",
  "",
  'asha = Student("Asha", "asha@uni.edu", 85)',
];
const SUPER_STEPS = [
  { line: 10, slots: {}, say: "Student(...) is called. Python builds a blank object and runs Student's __init__ with self = that object." },
  { line: 6, slots: {}, say: 'Inside Student.__init__: name = "Asha", email = "asha@uni.edu", mark = 85.' },
  { line: 7, slots: {}, say: "super().__init__(name, email) — 'run my parent's __init__ on this same object'. Jump to Person." },
  { line: 2, slots: { name: '"Asha"' }, say: "Person's code, but self is still asha: asha.name is filled." },
  { line: 3, slots: { name: '"Asha"', email: '"asha@uni.edu"' }, say: "asha.email is filled. Person's job is done — return to Student." },
  { line: 8, slots: { name: '"Asha"', email: '"asha@uni.edu"', mark: "85" }, say: "Back in Student: add the child's own extra. asha now has name, email AND mark." },
];

function SuperWidget() {
  const [step, setStep] = useState(-1);
  const [broken, setBroken] = useState(false);
  const cur = step >= 0 ? SUPER_STEPS[step] : null;

  return (
    <div>
      <GrowingFamily version={3} />
      <p style={lead}>
        Student needs one more piece of data (mark), so it writes its own __init__. But name and email are Person's job —
        <code style={{ color: C.purple }}> super().__init__(name, email)</code> hands them to the parent instead of copying
        Person's lines. Step through the birth of asha.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <button onClick={() => setStep((s) => Math.min(SUPER_STEPS.length - 1, s + 1))} style={btn(C.accent, true)}>Step ▶ ({step + 1} / {SUPER_STEPS.length})</button>
        <button onClick={() => setStep(-1)} style={btn(C.muted, false)}>↺ Reset</button>
      </div>
      <div style={twoCol}>
        <div style={{ ...cardBox(), padding: 10, overflowX: "auto" }}>
          {SUPER_CODE.map((t, i) => (
            <div key={i} style={{ display: "flex", fontFamily: "monospace", fontSize: 12, lineHeight: 1.75, whiteSpace: "pre", background: cur && cur.line === i ? C.accent + "26" : "transparent", borderLeft: `3px solid ${cur && cur.line === i ? C.accent : "transparent"}` }}>
              <span style={{ width: 18, color: C.accent, textAlign: "center" }}>{cur && cur.line === i ? "▶" : ""}</span>
              <span style={{ color: i === 7 ? C.purple : C.text }}>{t || " "}</span>
            </div>
          ))}
        </div>
        <div style={cardBox(C.teal + "66")}>
          <div style={tag(C.teal)}>MEMORY — the object asha</div>
          {["name", "email", "mark"].map((f) => (
            <div key={f} style={{ display: "flex", justifyContent: "space-between", border: `1.5px solid ${C.teal}66`, borderRadius: 6, padding: "4px 10px", marginBottom: 6, fontFamily: "monospace", fontSize: 12.5 }}>
              <span style={{ color: C.muted }}>.{f} <span style={{ fontSize: 10, color: f === "mark" ? C.green : C.purple }}>{f === "mark" ? "(set by Student)" : "(set by Person)"}</span></span>
              <span style={{ color: C.text }}>{cur && cur.slots[f] ? cur.slots[f] : "—"}</span>
            </div>
          ))}
          <div style={{ color: C.text, fontSize: 12.5, lineHeight: 1.6, marginTop: 10 }}>{cur ? cur.say : "Press Step ▶."}</div>
        </div>
      </div>

      <button onClick={() => setBroken((b) => !b)} style={{ ...btn(C.red, broken), marginTop: 18 }}>
        {broken ? "◀ Put super() back" : "▶ Gotcha: what if I forget super().__init__?"}
      </button>
      <div style={{ ...twoCol, marginTop: 10 }}>
        <pre style={{ ...mono, fontSize: 11.5, background: C.surface, borderRadius: 8, padding: 10, border: `1px solid ${broken ? C.red : C.green}55` }}>{`class Student(Person):
    def __init__(self, name, email, mark):
${broken ? "        # super().__init__(name, email)   ← forgotten" : "        super().__init__(name, email)"}
        self.mark = mark

asha = Student("Asha", "asha@uni.edu", 85)
print(asha.describe())`}</pre>
        <OutLines text={broken ? "Traceback (most recent call last):\n  ...\nAttributeError: 'Student' object has no attribute 'name'" : "Hi, I am Asha."} />
      </div>
      <div style={{ color: C.muted, fontSize: 12, marginTop: 6 }}>
        {broken ? "Defining __init__ in the child REPLACES Person's. Without super(), Person's __init__ never runs, so name and email never exist." : "Person's __init__ ran through super(), so describe() finds self.name."}
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>super() means "my parent class".</strong> super().__init__(...) runs the parent's
        setup on the same object, then the child adds its extras. Parent does the shared work once; each child adds only
        what makes it different.
      </>)}
    </div>
  );
}

// ── Widget 4: Add a method only the child has ──
function AddWidget() {
  const calls = [
    { label: "asha.grade()", cls: "Student", m: "grade()" },
    { label: "rao.grade()", cls: "Teacher", m: "grade()" },
    { label: "asha.describe()", cls: "Student", m: "describe()" },
    { label: "rao.describe()", cls: "Teacher", m: "describe()" },
  ];
  const [c, setC] = useState(0);

  return (
    <div>
      <GrowingFamily version={4} />
      <p style={lead}>
        A child can add methods of its own. grade() only makes sense for a Student, so it goes in Student — not in Person.
        Try calling methods and watch Python search up the tree. Inheritance flows <strong style={{ color: C.text }}>down</strong>,
        never sideways or up.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {calls.map((x, i) => <button key={i} onClick={() => setC(i)} style={btn(C.accent, c === i)}>{x.label}</button>)}
      </div>
      <FamilyTree version={4} call={calls[c]} />

      {insight(C.green, <>
        <strong style={{ color: C.green }}>Children inherit from parents; parents and siblings get nothing back.</strong> A
        Student has Person's describe() plus its own grade(). A Teacher never sees grade(), and a plain Person doesn't either.
        Put each method at the level where it's true for everyone below.
      </>)}
    </div>
  );
}

// ── Widget 5: Override + super().describe() ──
function OverrideWidget() {
  const calls = [
    { label: "asha.describe()", cls: "Student", m: "describe()", out: "Hi, I am Asha. I study, my mark is 85." },
    { label: "rao.describe()", cls: "Teacher", m: "describe()", out: "Hi, I am Mr Rao. I teach Physics." },
    { label: 'guest.describe()', cls: "Person", m: "describe()", out: "Hi, I am Kiran." },
  ];
  const [c, setC] = useState(0);
  const [style, setStyle] = useState("super");
  const call = calls[c];

  return (
    <div>
      <GrowingFamily version={5} />
      <p style={lead}>
        Person already has describe(). When a child defines a method with the <strong style={{ color: C.text }}>same name</strong>,
        its version is found first — that's <strong style={{ color: C.text }}>overriding</strong>. Inside it,
        <code style={{ color: C.purple }}> super().describe()</code> runs the parent's version so the child can extend it instead of
        rewriting it. (guest = Person("Kiran", "kiran@uni.edu") — a plain Person.)
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {calls.map((x, i) => <button key={i} onClick={() => setC(i)} style={btn(C.accent, c === i)}>{x.label}</button>)}
      </div>
      <FamilyTree version={5} call={call} />
      <div style={{ fontFamily: "monospace", fontSize: 12, background: C.surface, borderRadius: 8, padding: 10, marginTop: 10, lineHeight: 1.8 }}>
        {call.cls !== "Person" ? (
          <>
            <div style={{ color: C.muted }}>1. {call.cls}.describe() runs (the override)</div>
            <div style={{ color: C.purple }}>2. super().describe() → Person.describe() returns "Hi, I am {call.cls === "Student" ? "Asha" : "Mr Rao"}."</div>
            <div style={{ color: C.muted }}>3. {call.cls} adds its own part and returns the whole string</div>
          </>
        ) : <div style={{ color: C.muted }}>No override in Person's own objects — the original describe() runs.</div>}
        <div style={{ color: C.green, marginTop: 4 }}>→ {call.out}</div>
      </div>

      <div style={{ color: C.text, fontWeight: 600, fontSize: 13, margin: "18px 0 10px" }}>Two ways to override — which survives a change?</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        <button onClick={() => setStyle("super")} style={btn(C.green, style === "super")}>extend with super()</button>
        <button onClick={() => setStyle("rewrite")} style={btn(C.orange, style === "rewrite")}>rewrite from scratch</button>
      </div>
      <div style={twoCol}>
        <pre style={{ ...mono, fontSize: 11.5, background: C.surface, borderRadius: 8, padding: 10 }}>{style === "super"
          ? `    def describe(self):
        return super().describe() + " I study, my mark is " + str(self.mark) + "."`
          : `    def describe(self):
        return "Hi, I am " + self.name + ". I study, my mark is " + str(self.mark) + "."`}</pre>
        <div style={{ ...cardBox(style === "super" ? C.green + "55" : C.orange + "55"), fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
          {style === "super"
            ? "Person decides how a greeting starts. If Person's describe() changes to \"Hello, I am…\", every child follows automatically."
            : "Works today — but \"Hi, I am \" is now copied into the child. Change Person's greeting and Student keeps saying \"Hi\". The copy-paste trap, back again."}
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Override = same name in the child; the child's version wins.</strong> The parent's
        method isn't deleted — it's still there for Person objects and reachable from the child through super(). Notice the
        same call, p.describe(), gives different results for different objects. Hold that thought: it has a name, and it's
        next unit's topic.
      </>)}
    </div>
  );
}

// ── Widget 6: The Whole Thing — full program trace ──
const ORIGIN = {
  2: { label: "Person + inherit", color: C.teal },
  3: { label: "super().__init__", color: C.purple },
  4: { label: "child-only method", color: C.accent },
  5: { label: "override + super()", color: C.green },
  6: { label: "using the family", color: C.orange },
  9: { label: "try/except (M9)", color: C.yellow },
};
const FINAL = familyAt(5).map((l) => ({ t: l.t, v: l.v })).concat([
  { t: "", v: 6 },
  { t: 'asha = Student("Asha", "asha@uni.edu", 85)', v: 6 },
  { t: 'rao = Teacher("Mr Rao", "rao@uni.edu", "Physics")', v: 6 },
  { t: "people = [asha, rao]", v: 6 },
  { t: "for p in people:", v: 6 },
  { t: "    print(p.describe())", v: 6 },
  { t: "print(asha.grade())", v: 6 },
  { t: "print(isinstance(rao, Person))", v: 6 },
  { t: "try:", v: 9 },
  { t: "    print(rao.grade())", v: 9 },
  { t: "except AttributeError:", v: 9 },
  { t: '    print("Teachers don\'t have grades")', v: 9 },
]);
const L = (s, nth) => {
  let k = nth || 0;
  for (let i = 0; i < FINAL.length; i++) if (FINAL[i].t.trim() === s) { if (k === 0) return i; k--; }
  return -1;
};

const A0 = { name: "—", email: "—", mark: "—" };
const A1 = { name: '"Asha"', email: "—", mark: "—" };
const A2 = { name: '"Asha"', email: '"asha@uni.edu"', mark: "—" };
const A3 = { name: '"Asha"', email: '"asha@uni.edu"', mark: "85" };
const R3 = { name: '"Mr Rao"', email: '"rao@uni.edu"', subject: '"Physics"' };

const TRACE = [
  { l: ['asha = Student("Asha", "asha@uni.edu", 85)'], self: "asha", a: A0, say: "Build a blank object and run Student.__init__ with self = asha." },
  { l: ["super().__init__(name, email)", 0], self: "asha", a: A0, look: "super() → Person", say: "Student hands the shared part to its parent: run Person.__init__ on this same object." },
  { l: ["self.name = name"], self: "asha", a: A1, say: "Person's line, but self is asha: asha.name is filled." },
  { l: ["self.email = email"], self: "asha", a: A2, say: "asha.email is filled. Back to Student." },
  { l: ["self.mark = mark"], self: "asha", a: A3, say: "Student adds its own extra: asha.mark = 85. asha is complete." },
  { l: ['rao = Teacher("Mr Rao", "rao@uni.edu", "Physics")'], self: "rao", a: A3, r: R3, say: "Same journey for rao (condensed): Teacher.__init__ → super() → Person sets name, email → Teacher adds subject." },
  { l: ["people = [asha, rao]"], self: null, a: A3, r: R3, p: "—", say: "A list holding two different kinds of object (lists, Unit 7.2). Both are Persons." },
  { l: ["for p in people:"], self: null, a: A3, r: R3, p: "asha", say: "First pass: p is asha." },
  { l: ["print(p.describe())"], self: "asha", a: A3, r: R3, p: "asha", look: "Student ✓ (override)", say: "p.describe(): Python searches Student first — found Student's own describe()." },
  { l: ['return "Hi, I am " + self.name + "."'], self: "asha", a: A3, r: R3, p: "asha", look: "super() → Person ✓", say: 'Student\'s describe calls super().describe(); Person\'s version returns "Hi, I am Asha."' },
  { l: ['return super().describe() + " I study, my mark is " + str(self.mark) + "."'], self: "asha", a: A3, r: R3, p: "asha", out: "Hi, I am Asha. I study, my mark is 85.", say: "Student adds its part and returns the whole sentence. print shows it." },
  { l: ["for p in people:"], self: null, a: A3, r: R3, p: "rao", say: "Second pass: p is rao. Same line of code, different object." },
  { l: ['return super().describe() + " I teach " + self.subject + "."'], self: "rao", a: A3, r: R3, p: "rao", look: "Teacher ✓ → super() → Person ✓", out: "Hi, I am Mr Rao. I teach Physics.", say: "This time the search finds Teacher's describe(), which also reuses Person's greeting via super()." },
  { l: ["elif self.mark >= 75:"], self: "asha", a: A3, r: R3, p: "rao", look: "Student ✓", check: true, say: "asha.grade(): found in Student. 85 >= 90? No. 85 >= 75? Yes." },
  { l: ["print(asha.grade())"], self: null, a: A3, r: R3, p: "rao", out: "B", say: 'grade() returns "B".' },
  { l: ["print(isinstance(rao, Person))"], self: null, a: A3, r: R3, p: "rao", out: "True", say: "Is rao a Person? Yes — a Teacher IS A Person." },
  { l: ["print(rao.grade())"], self: "rao", a: A3, r: R3, p: "rao", look: "Teacher ✗ → Person ✗ → object ✗", check: false, say: "rao.grade(): not in Teacher, not in Person, not in object. Python raises AttributeError." },
  { l: ['print("Teachers don\'t have grades")'], self: null, a: A3, r: R3, p: "rao", out: "Teachers don't have grades", say: "except AttributeError catches it (Module 9) and the program carries on." },
];

function WholeWidget() {
  const [step, setStep] = useState(-1);
  const [byOrigin, setByOrigin] = useState(false);
  const cur = step >= 0 ? TRACE[step] : null;
  const curLine = cur ? L(cur.l[0], cur.l[1]) : -1;
  const out = TRACE.slice(0, step + 1).filter((s) => s.out).map((s) => s.out);

  const Obj = ({ name, vals, kind }) => (
    <div style={{ border: `1.5px solid ${cur && cur.self === name ? C.purple : C.teal + "66"}`, borderRadius: 8, padding: 8, marginBottom: 8, background: cur && cur.self === name ? C.purple + "12" : "transparent" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "monospace", marginBottom: 4 }}>
        <span style={{ color: C.teal, fontWeight: 700 }}>{name} <span style={{ color: C.muted, fontWeight: 400 }}>({kind})</span></span>
        {cur && cur.self === name && <span style={{ color: C.purple, fontWeight: 700 }}>◀ self</span>}
      </div>
      {vals ? Object.keys(vals).map((f) => (
        <div key={f} style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 11.5, border: `1px solid ${C.teal}55`, borderRadius: 5, padding: "2px 8px", marginBottom: 4 }}>
          <span style={{ color: C.muted }}>.{f}</span><span style={{ color: C.text }}>{vals[f]}</span>
        </div>
      )) : <div style={{ color: C.muted, fontSize: 11 }}>not created yet</div>}
    </div>
  );

  return (
    <div>
      <p style={lead}>
        The full family (v5) plus code that uses every part of it — in one runnable program. Step through and watch the
        method search climb the tree. Toggle colours to see which tab each line came from.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <button onClick={() => setStep((s) => Math.min(TRACE.length - 1, s + 1))} style={btn(C.accent, true)}>Step ▶ ({step + 1} / {TRACE.length})</button>
        <button onClick={() => setStep(-1)} style={btn(C.muted, false)}>↺ Reset</button>
        <button onClick={() => setByOrigin((b) => !b)} style={btn(C.yellow, byOrigin)}>{byOrigin ? "🎨 Colour by origin: ON" : "🎨 Colour by origin"}</button>
      </div>
      {byOrigin && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          {Object.keys(ORIGIN).map((k) => (
            <span key={k} style={{ fontSize: 11, color: ORIGIN[k].color, border: `1px solid ${ORIGIN[k].color}66`, borderRadius: 5, padding: "1px 7px" }}>■ {ORIGIN[k].label}</span>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
        <div style={{ ...cardBox(), overflowX: "auto", padding: 10 }}>
          {FINAL.map((l, i) => (
            <div key={i} style={{
              display: "flex", fontFamily: "monospace", fontSize: 11.5, lineHeight: 1.7, whiteSpace: "pre",
              background: i === curLine ? C.accent + "26" : "transparent",
              borderLeft: `3px solid ${i === curLine ? C.accent : byOrigin && l.t ? ORIGIN[l.v].color : "transparent"}`,
            }}>
              <span style={{ width: 22, textAlign: "right", color: C.muted, marginRight: 8, flexShrink: 0 }}>{i === curLine ? "▶" : i + 1}</span>
              <span style={{ color: byOrigin && l.t ? ORIGIN[l.v].color : i === curLine ? C.text : C.muted }}>{l.t || " "}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{ ...cardBox(), marginBottom: 10, padding: 12 }}>
            <div style={tag(C.teal)}>MEMORY</div>
            <Obj name="asha" kind="Student" vals={cur ? cur.a : null} />
            <Obj name="rao" kind="Teacher" vals={cur && cur.r ? cur.r : null} />
            <div style={{ fontFamily: "monospace", fontSize: 11.5, color: C.muted }}>p → <span style={{ color: C.text }}>{cur && cur.p ? cur.p : "—"}</span></div>
          </div>
          <div style={{ ...cardBox(), marginBottom: 10, padding: 12 }}>
            <div style={tag(C.yellow)}>METHOD SEARCH</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: cur && cur.look ? (cur.look.includes("✗ → object ✗") ? C.red : C.green) : C.muted }}>{cur && cur.look ? cur.look : "—"}</div>
          </div>
          <div style={{ ...cardBox(), padding: 12 }}>
            <div style={tag(C.green)}>OUTPUT</div>
            <pre style={{ ...mono, color: C.green, fontSize: 12 }}>{out.join("\n") || " "}</pre>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 13, lineHeight: 1.6, minHeight: 44 }}>
        {cur ? cur.say : "Press Step ▶ to run the program line by line."}
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Three classes, zero duplicated lines.</strong> Person owns name, email and the
        greeting; Student and Teacher add only their extras and their own twist on describe(). Every method call is the
        same search: the object's own class first, then up the tree.
      </>)}
    </div>
  );
}

// ── Widget 7: Python vs C vs C++ vs Java ──
const LANG = {
  C: { color: C.orange, code: `struct Person  { char name[20]; char email[40]; };
struct Student { struct Person base;  /* "inherit" by embedding */
                 int mark; };

void person_describe(struct Person *p) {
    printf("Hi, I am %s.", p->name);
}
void student_describe(struct Student *s) {
    person_describe(&s->base);         /* reuse the parent by hand */
    printf(" I study, my mark is %d.", s->mark);
}`, note: "No inheritance in the language. You embed the parent struct and wire everything up yourself." },
  "C++": { color: C.purple, code: `class Person {
protected:
    string name, email;
public:
    Person(string n, string e) : name(n), email(e) {}
    virtual string describe() { return "Hi, I am " + name + "."; }
};

class Student : public Person {
    int mark;
public:
    Student(string n, string e, int m) : Person(n, e), mark(m) {}
    string describe() override {
        return Person::describe() + " I study, my mark is " + to_string(mark) + ".";
    }
};`, note: "': public Person' inherits. The method must be marked virtual in the parent to be overridable at run time." },
  Java: { color: C.red, code: `class Person {
    protected String name, email;
    Person(String name, String email) { this.name = name; this.email = email; }
    String describe() { return "Hi, I am " + name + "."; }
}

class Student extends Person {
    private int mark;
    Student(String name, String email, int mark) {
        super(name, email);            // must be the first line
        this.mark = mark;
    }
    @Override
    String describe() { return super.describe() + " I study, my mark is " + mark + "."; }
}`, note: "'extends' inherits. @Override asks the compiler to check that a parent method with that name really exists." },
  Python: { color: C.accent, code: `class Person:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    def describe(self):
        return "Hi, I am " + self.name + "."

class Student(Person):
    def __init__(self, name, email, mark):
        super().__init__(name, email)
        self.mark = mark
    def describe(self):
        return super().describe() + " I study, my mark is " + str(self.mark) + "."`, note: "Brackets inherit. Every method can be overridden — no virtual keyword needed." },
};

function LanguagesWidget() {
  const [lang, setLang] = useState("C");
  const [diamond, setDiamond] = useState(false);
  const rows = [
    ["Inherit", "embed a struct", ": public Person", "extends Person", "(Person)"],
    ["Call parent constructor", "call it by hand", "Person(n, e) in init list", "super(name, email);", "super().__init__(...)"],
    ["Call parent's method", "person_describe(&s->base)", "Person::describe()", "super.describe()", "super().describe()"],
    ["Override", "function pointers by hand", "virtual + override", "same name (+ @Override)", "same name"],
    ["Several parents?", "✗", "✓ allowed", "✗ one class (+ interfaces)", "✓ allowed (MRO)"],
    ["Root of every class", "—", "none", "Object", "object"],
  ];
  const L2 = LANG[lang];

  return (
    <div>
      <p style={lead}>
        Inheritance arrived with Simula 67 (1967), whose "subclasses" let a ship-simulation reuse a general vehicle class.
        Smalltalk made it central, and C++, Java and Python all kept it. Here is the same Person → Student pair — override
        and all — in four languages.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {Object.keys(LANG).map((k) => <button key={k} onClick={() => setLang(k)} style={btn(LANG[k].color, lang === k)}>{k}</button>)}
      </div>
      <div style={{ ...cardBox(L2.color + "55"), overflowX: "auto" }}>
        <pre style={{ ...mono, fontSize: 11.5, whiteSpace: "pre" }}>{L2.code}</pre>
      </div>
      <div style={{ color: L2.color, fontSize: 12.5, marginTop: 8 }}>{L2.note}</div>

      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 620, fontSize: 12 }}>
          <thead>
            <tr>{["", "C", "C++", "Java", "Python"].map((h, i) => (
              <th key={i} style={{ textAlign: "left", padding: "6px 8px", color: i === 0 ? C.muted : LANG[h].color, borderBottom: `1px solid ${C.border}` }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>{r.map((c, j) => (
                <td key={j} style={{ padding: "6px 8px", borderBottom: `1px solid ${C.border}`, color: j === 0 ? C.text : C.muted, fontFamily: j === 0 ? "inherit" : "monospace", fontWeight: j === 0 ? 600 : 400 }}>{c}</td>
              ))}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => setDiamond((d) => !d)} style={{ ...btn(C.yellow, diamond), marginTop: 16 }}>
        {diamond ? "◀ Hide" : "💎 Bonus: why does Java allow only one parent?"}
      </button>
      {diamond && (
        <div style={{ ...twoCol, marginTop: 12 }}>
          <pre style={{ ...mono, fontSize: 11.5, background: C.surface, borderRadius: 8, padding: 10 }}>{`class Device:
    def power(self): return "device on"

class Camera(Device):
    def power(self): return "camera on"

class Phone(Device):
    def power(self): return "phone on"

class SmartPhone(Camera, Phone):
    pass

print(SmartPhone().power())`}</pre>
          <div style={{ ...cardBox(C.yellow + "55"), fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
            <div style={tag(C.yellow)}>THE DIAMOND PROBLEM</div>
            Device → Camera and Phone → SmartPhone forms a diamond. Both parents have power(): which one wins?
            <div style={{ fontFamily: "monospace", color: C.text, margin: "8px 0" }}>SmartPhone → Camera → Phone → Device → object</div>
            Python fixes a search order (the MRO, method resolution order), so the output is <span style={{ color: C.green, fontFamily: "monospace" }}>camera on</span>.
            C++ reports the call as ambiguous unless you say which parent you mean. Java avoids the question: one parent class
            only, with interfaces for extra roles.
          </div>
        </div>
      )}

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>The idea is identical; only the spelling changes.</strong> (Person) ↔ extends ↔
        : public, super() ↔ super ↔ Person::. Once you can read one language's class family, you can read them all — which
        is exactly what you'll do in a Java or C++ course.
      </>)}
    </div>
  );
}

// ── Widget 8: Real world — bank accounts + is-a / has-a ──
const fmt = (n, flt) => (flt ? (Number.isInteger(n) ? n + ".0" : String(n)) : String(n));

function BankWidget() {
  const [kind, setKind] = useState("SavingsAccount");
  const [bal, setBal] = useState(3000);
  const [flt, setFlt] = useState(false);
  const [amt, setAmt] = useState(2500);
  const [log, setLog] = useState([]);
  const [pair, setPair] = useState({});
  const [area, setArea] = useState(0);

  const push = (code, ran, res, ok) => setLog((l) => [{ code, ran, res, ok }, ...l].slice(0, 4));
  const choose = (k) => { setKind(k); setBal(3000); setFlt(false); setLog([]); };
  const withdraw = () => {
    const code = "acc.withdraw(" + amt + ")";
    if (kind === "Account") {
      if (amt > bal) return push(code, "Account.withdraw", "ValueError: insufficient funds", false);
      setBal(bal - amt); return push(code, "Account.withdraw", "✓ Rs." + fmt(bal - amt, flt), true);
    }
    if (kind === "SavingsAccount") {
      if (bal - amt < 1000) return push(code, "SavingsAccount.withdraw", "ValueError: minimum balance is Rs.1000", false);
      setBal(bal - amt); return push(code, "SavingsAccount.withdraw → super().withdraw (Account)", "✓ Rs." + fmt(bal - amt, flt), true);
    }
    if (amt > bal + 5000) return push(code, "CurrentAccount.withdraw", "ValueError: overdraft limit exceeded", false);
    setBal(bal - amt); return push(code, "CurrentAccount.withdraw", "✓ Rs." + fmt(bal - amt, flt), true);
  };
  const interest = () => {
    if (kind !== "SavingsAccount") return push("acc.add_interest()", kind + " ✗ → Account ✗ → object ✗", "AttributeError: '" + kind + "' object has no attribute 'add_interest'", false);
    const nb = bal + bal * 4 / 100;
    setBal(nb); setFlt(true);
    push("acc.add_interest()", "SavingsAccount.add_interest", "✓ Rs." + fmt(nb, true), true);
  };

  const pairs = [
    ["SavingsAccount", "Account", "is", "class SavingsAccount(Account)"],
    ["Classroom", "Student", "has", "self.students = [asha, ravi]"],
    ["Doctor", "Person", "is", "class Doctor(Person)"],
    ["Car", "Engine", "has", "self.engine = Engine()"],
    ["SmartBulb", "Device", "is", "class SmartBulb(Device)"],
    ["Student", "mark", "has", "self.mark = 85"],
  ];
  const areas = [
    { icon: "⚠️", t: "Python's own exceptions", code: `Exception
 ├── ValueError
 ├── ZeroDivisionError
 ├── KeyError        (via LookupError)
 └── ...

try:
    ...
except Exception:     # catches every child
    ...`, why: "The errors you caught in Module 9 are a class family. except Exception catches all its children — and later in this module you'll add your own child class to it." },
    { icon: "🏥", t: "Hospital staff", code: `class Staff:
    def __init__(self, name, staff_id): ...
    def duty(self): return "on duty"

class Doctor(Staff):
    def duty(self): return "ward rounds"

class Nurse(Staff):
    def duty(self): return "patient care"`, why: "Payroll, ID cards and attendance live once in Staff. Each role overrides only what it does differently." },
    { icon: "🌡️", t: "IoT devices", code: `class Device:
    def __init__(self, device_id): ...
    def status(self): return "online"

class TempSensor(Device):
    def read(self): ...

class SmartBulb(Device):
    def switch(self, on): ...`, why: "Every device connects, reports status and updates firmware the same way. Children add sensing or switching." },
    { icon: "🎮", t: "Game characters", code: `class Character:
    def __init__(self, name): self.health = 100
    def attack(self): return 10

class Warrior(Character):
    def attack(self): return 25

class Mage(Character):
    def attack(self): return super().attack() + 15`, why: "Movement, health and inventory are shared. Each class overrides attack() — one of them extends the parent with super()." },
  ];

  return (
    <div>
      <p style={lead}>
        Banks run on exactly this family shape. Every account can deposit and withdraw; a savings account earns interest
        and must keep a minimum balance; a current account may go into overdraft. Pick an account type — the ATM calls the
        same <code style={{ color: C.accent }}>acc.withdraw()</code>, but a different method runs.
      </p>

      <div style={twoCol}>
        <div style={{ ...cardBox(C.accent + "55"), overflowX: "auto" }}>
          <div style={tag(C.accent)}>🐍 THE ACCOUNT FAMILY</div>
          <pre style={{ ...mono, fontSize: 10.5, whiteSpace: "pre" }}>{`class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self._balance = self._balance + amount

    def withdraw(self, amount):
        if amount > self._balance:
            raise ValueError("insufficient funds")
        self._balance = self._balance - amount

    def __str__(self):
        return self.owner + ": Rs." + str(self._balance)

class SavingsAccount(Account):
    def __init__(self, owner, balance, rate):
        super().__init__(owner, balance)
        self.rate = rate

    def add_interest(self):
        self._balance = self._balance + self._balance * self.rate / 100

    def withdraw(self, amount):                 # override
        if self._balance - amount < 1000:
            raise ValueError("minimum balance is Rs.1000")
        super().withdraw(amount)                # reuse parent

class CurrentAccount(Account):
    def __init__(self, owner, balance, overdraft):
        super().__init__(owner, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):                 # override
        if amount > self._balance + self.overdraft:
            raise ValueError("overdraft limit exceeded")
        self._balance = self._balance - amount`}</pre>
        </div>

        <div style={cardBox(C.green + "55")}>
          <div style={tag(C.green)}>🏧 ATM</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {["Account", "SavingsAccount", "CurrentAccount"].map((k) => (
              <button key={k} onClick={() => choose(k)} style={{ ...btn(C.teal, kind === k), fontSize: 11 }}>{k}</button>
            ))}
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, marginBottom: 8 }}>
            acc = {kind}("Meena", 3000{kind === "SavingsAccount" ? ", 4" : kind === "CurrentAccount" ? ", 5000" : ""})
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: C.muted }}>print(acc)</div>
          <div style={{ fontFamily: "monospace", fontSize: 17, color: bal < 0 ? C.orange : C.green, fontWeight: 700, marginBottom: 10 }}>Meena: Rs.{fmt(bal, flt)}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {[1000, 2500, 5000, 7000].map((a) => (
              <button key={a} onClick={() => setAmt(a)} style={{ ...btn(C.teal, amt === a), fontSize: 11.5, padding: "5px 9px" }}>₹{a}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            <button onClick={withdraw} style={btn(C.orange, true)}>withdraw</button>
            <button onClick={interest} style={btn(C.purple, true)}>add_interest</button>
            <button onClick={() => choose(kind)} style={btn(C.muted, false)}>↺</button>
          </div>
          {log.map((e, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 11, marginTop: 6, opacity: i === 0 ? 1 : 0.5 }}>
              <div style={{ color: C.text }}>{e.code}</div>
              <div style={{ color: C.yellow }}>ran: {e.ran}</div>
              <div style={{ color: e.ok ? C.green : C.red }}>{e.res}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ color: C.text, fontWeight: 600, fontSize: 13, margin: "22px 0 6px" }}>Is-a or has-a?</div>
      <p style={{ ...lead, marginBottom: 10 }}>
        Inheritance is only for <strong style={{ color: C.text }}>is-a</strong>. When one thing merely <em>contains</em> another
        (has-a), store it as an attribute instead — that's called composition. Decide each pair.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {pairs.map(([a, b, ans, hint], i) => {
          const pick = pair[i];
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontFamily: "monospace", fontSize: 12 }}>
              <span style={{ minWidth: 190, color: C.text }}>{a} ? {b}</span>
              {["is", "has"].map((o) => (
                <button key={o} onClick={() => setPair((p) => ({ ...p, [i]: o }))} style={{
                  ...btn(pick === o ? (o === ans ? C.green : C.red) : C.muted, pick === o), padding: "4px 10px", fontSize: 11.5,
                }}>{o}-a</button>
              ))}
              {pick && <span style={{ color: pick === ans ? C.green : C.red, fontFamily: "inherit", fontSize: 11.5 }}>
                {pick === ans ? "✓ " : "✗ "}{ans}-a → {hint}
              </span>}
            </div>
          );
        })}
      </div>

      <div style={{ color: C.text, fontWeight: 600, fontSize: 13, margin: "22px 0 10px" }}>The same shape, everywhere</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {areas.map((a, i) => <button key={i} onClick={() => setArea(i)} style={{ ...btn(C.purple, area === i), fontFamily: "inherit" }}>{a.icon} {a.t}</button>)}
      </div>
      <div style={twoCol}>
        <div style={{ ...cardBox(), overflowX: "auto" }}><pre style={{ ...mono, fontSize: 11.5, whiteSpace: "pre" }}>{areas[area].code}</pre></div>
        <div style={{ ...cardBox(C.purple + "44"), color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
          <div style={tag(C.purple)}>WHY IT MATTERS</div>{areas[area].why}
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>Put shared rules in the parent, special rules in the children.</strong> A new
        account type (a student account, a fixed deposit) is one small child class — the rest of the bank's code doesn't
        change. And when the relationship is has-a, reach for an attribute: the classic design advice "favour composition over
        inheritance" comes from the book <em>Design Patterns</em> (Gamma, Helm, Johnson &amp; Vlissides, 1994).
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "class Student(Person): pass — what can a Student object do?",
      options: ["Nothing — pass means an empty class", "Everything a Person can: same __init__, attributes and methods", "Only the methods, not the attributes", "It can't be created"],
      answer: 1,
      explain: "The child inherits everything the parent defines. Even with pass, Student(\"Asha\", \"asha@uni.edu\") and asha.describe() work — they come from Person.",
    },
    {
      q: "Student defines its own __init__ but forgets super().__init__(name, email). What happens on asha.describe()?",
      options: ["It works normally", "AttributeError: 'Student' object has no attribute 'name'", "SyntaxError", "Python calls Person's __init__ anyway"],
      answer: 1,
      explain: "A child's __init__ replaces the parent's. Without super().__init__, Person's setup never runs, so self.name never exists.",
    },
    {
      q: "Both Person and Student define describe(). Which runs for asha = Student(...)?",
      options: ["Person's — the parent always wins", "Student's — Python searches the object's own class first", "Both, one after the other", "Python raises an error"],
      answer: 1,
      explain: "Method search goes child first, then up the tree. Student's describe() overrides Person's; Person's version still exists for Person objects and via super().",
    },
    {
      q: "grade() is defined only in Student. What does rao.grade() do for rao = Teacher(...)?",
      options: ["Runs Student's grade()", "Returns None", "AttributeError — Teacher, Person and object don't have grade()", "Returns \"F\""],
      answer: 2,
      explain: "Inheritance flows down only. The search goes Teacher → Person → object; grade() is in none of them, so AttributeError.",
    },
    {
      q: "Inside Student's describe(), what does super().describe() do?",
      options: ["Calls Student's describe() again forever", "Runs Person's describe() and gives back its string, which Student then extends", "Deletes Person's describe()", "Creates a new Person"],
      answer: 1,
      explain: "super() is the parent. super().describe() returns \"Hi, I am Asha.\" and Student adds its own part — extending instead of copying.",
    },
    {
      q: "Which relationship should NOT use inheritance?",
      options: ["SavingsAccount / Account", "Doctor / Person", "Classroom / Student", "SmartBulb / Device"],
      answer: 2,
      explain: "A Classroom HAS students — it is not a kind of Student. Has-a means an attribute (self.students = [...]), which is what your capstone will do.",
    },
    {
      q: "In Java, class Student extends Person. How does Java differ from Python on parents?",
      options: ["Java allows several parent classes", "Java allows only one parent class (extra roles come from interfaces)", "Java has no super", "Java can't override methods"],
      answer: 1,
      explain: "Java permits a single parent class to sidestep the diamond problem. Python and C++ allow several; Python settles conflicts with its MRO search order.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const total = questions.length;

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[current].answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (current < total - 1) { setCurrent((c) => c + 1); setSelected(null); }
    else setDone(true);
  };

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{score >= total - 1 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {score} / {total}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {score === total ? "Perfect! You can design a class family and reason about which method runs." :
            score >= total - 2 ? "Good work! Replay 'The Whole Thing' to watch the method search once more." :
              "Worth a replay: 'super()', 'Override' and 'The Whole Thing'."}
        </div>
        <div style={{ padding: 20, borderRadius: 12, background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`, border: `1px solid ${C.accent}55` }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 10.4 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You grew a Person → Student / Teacher family, reused the parent with super(), overrode methods, traced the method
            search, read the same family in C++ and Java, and saw it run a bank.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 10.5 — Polymorphism &amp; Abstraction.</strong> Remember
            <code> for p in people: print(p.describe())</code> — one line, different behaviour for each object? That trick has
            a name, and it's one of the most powerful ideas in OOP.
          </div>
          <button onClick={() => onComplete && onComplete()} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
            Finish Unit →
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {total}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((opt, i) => {
          let bg = C.card, border = C.border, col = C.text;
          if (selected !== null) {
            if (i === q.answer) { bg = C.green + "22"; border = C.green; col = C.green; }
            else if (i === selected) { bg = C.red + "22"; border = C.red; col = C.red; }
          }
          return (
            <button key={i} onClick={() => choose(i)} style={{
              textAlign: "left", padding: "10px 14px", borderRadius: 8, background: bg, border: `1.5px solid ${border}`, color: col,
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
        <button onClick={next} style={{ marginTop: 14, padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
          {current < total - 1 ? "Next Question →" : "See Results"}
        </button>
      )}
    </div>
  );
}

// ── Main ──
export default function Unit10_4({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Copy-Paste Trap", title: "Two Classes, Mostly the Same", el: <NeedWidget /> },
    { id: "child", label: "Child(Parent)", title: "class Child(Parent): Everything for Free", el: <ChildWidget /> },
    { id: "super", label: "super()", title: "super().__init__: Let the Parent Do Its Part", el: <SuperWidget /> },
    { id: "add", label: "Add Methods", title: "Children Can Add Their Own Methods", el: <AddWidget /> },
    { id: "override", label: "Override", title: "Override — and Extend with super()", el: <OverrideWidget /> },
    { id: "whole", label: "The Whole Thing", title: "The Whole Program, Line by Line", el: <WholeWidget /> },
    { id: "langs", label: "vs C++ / Java", title: "Inheritance in C, C++, Java and Python", el: <LanguagesWidget /> },
    { id: "bank", label: "Real World", title: "Where It's Used: Bank Accounts and Beyond", el: <BankWidget /> },
    { id: "quiz", label: "Quiz & Wrap-up", title: "Quick Quiz", el: null },
  ];
  const quizIdx = sections.length - 1;

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(quizIdx, s + 1)); };
  const s = sections[activeSection];

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

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {sections.map((sec, i) => (
            <button key={sec.id} onClick={() => setActiveSection(i)} style={{
              flex: 1, minWidth: 88, padding: "8px 6px", borderRadius: 7,
              background: activeSection === i ? C.accentGlow : "transparent",
              border: "none", color: activeSection === i ? "#fff" : C.muted,
              cursor: "pointer", fontSize: 11, fontWeight: activeSection === i ? 600 : 400,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4, transition: "all 0.2s",
            }}>
              {completed.includes(i) && <span style={{ color: C.green }}>✓</span>}
              {sec.label}
            </button>
          ))}
        </div>

        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
          <h3 style={{ color: C.text, marginTop: 0, marginBottom: 12 }}>{s.title}</h3>
          {activeSection === quizIdx ? (
            <>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>7 questions to check your understanding of Unit 10.4.</p>
              <Quiz onComplete={() => { markComplete(quizIdx); onUnitComplete && onUnitComplete(); }} />
            </>
          ) : s.el}
        </div>

        {activeSection < quizIdx && (
          <button onClick={goNext} style={{
            marginTop: 16, width: "100%", padding: "12px", borderRadius: 8,
            background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>Mark Complete & Continue →</button>
        )}
      </div>
    </div>
  );
}
