// Unit 10.7 — Capstone: Marks Manager 3.0 (Student + Classroom objects)
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

// ── Section 1: The Mission ──
function MissionWidget() {
  const tools = [
    { tool: "class + __init__", from: "Units 10.1-10.2", why: "a Student object bundles name + mark, built in one line" },
    { tool: "methods (self)", from: "Unit 10.3", why: "student.grade() — the student grades itself" },
    { tool: "__str__", from: "Unit 10.3", why: "print(student) shows 'Asha (85, B)', not gibberish" },
    { tool: "a class that OWNS a list", from: "Units 10.1 + 7.2", why: "Classroom holds a list of Student objects and the operations on them" },
    { tool: "files + FileNotFoundError", from: "Units 9.3-9.4", why: "Classroom.save() and .load() persist the roster to CSV" },
    { tool: "menu loop", from: "Module 6", why: "Add / Report / Save & Exit — now calling Classroom methods" },
  ];
  const [checked, setChecked] = useState([]);
  const toggle = (i) => setChecked((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Third and final rebuild of the Marks Manager. In Module 8 it became modular functions; in Module 9,
        robust and persistent. Now it becomes <strong style={{ color: C.text }}>object-oriented</strong>: a
        <code style={{ color: C.teal }}> Student</code> class that grades itself, and a
        <code style={{ color: C.teal }}> Classroom</code> class that owns them all. Tick your toolkit.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 12 }}>📋 THE SPEC — Marks Manager 3.0</div>
        <pre style={mono}>
          {`class Student   → name, mark, grade(), __str__
class Classroom → holds [Student], with:
    add(name, mark)   report()   average()
    save(file)        load(file)
main menu       → Add / Report / Save & Exit`}
        </pre>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tools.map((t, i) => (
          <div key={i} onClick={() => toggle(i)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8,
            background: checked.includes(i) ? C.green + "14" : C.card,
            border: `1.5px solid ${checked.includes(i) ? C.green : C.border}`,
            cursor: "pointer", transition: "all 0.2s",
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              border: `2px solid ${checked.includes(i) ? C.green : C.muted}`,
              background: checked.includes(i) ? C.green : "transparent", color: "#fff", fontSize: 13, fontWeight: 700,
            }}>{checked.includes(i) ? "✓" : ""}</div>
            <div>
              <span style={{ fontFamily: "monospace", fontSize: 12.5, color: checked.includes(i) ? C.green : C.text, fontWeight: 600 }}>{t.tool}</span>
              <span style={{ fontSize: 11.5, color: C.accent, marginLeft: 8 }}>({t.from})</span>
              <div style={{ fontSize: 11.5, color: C.muted, marginTop: 2 }}>{t.why}</div>
            </div>
          </div>
        ))}
      </div>

      {checked.length === tools.length && (
        <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 8, background: C.green + "18", border: `1px solid ${C.green}55`, color: C.green, fontSize: 13, fontWeight: 600, textAlign: "center" }}>
          🎯 Objects all the way down. Let's build it!
        </div>
      )}

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Objects turn "data + functions" into "things that act".</strong> A
        Student isn't a name in one dict and a mark in another anymore — it's one thing that knows its own grade
        and how to describe itself. A Classroom isn't loose variables — it's one thing that manages its students.
      </>)}
    </div>
  );
}

// ── Section 2: Build in Steps ──
function StepsWidget() {
  const [v, setV] = useState(0);
  const versions = [
    {
      label: "v1 — the dict version (9.4)",
      color: C.red,
      note: "Where Module 9 left off: a dict of name→mark, with free functions doing the work.",
      warn: "A 'student' is just a key with a number. The grade logic lives in a separate function you must remember to call with the right value. Data here, behaviour there — they're not connected.",
      code: `marks = {}          # name -> mark

def grade(mark):
    if mark >= 90: return "A"
    ...

marks["Asha"] = 85
print("Asha", grade(marks["Asha"]))`,
    },
    {
      label: "v2 — a Student class",
      color: C.yellow,
      note: "Units 10.1-10.3: bundle each student's data AND behaviour into one object.",
      warn: "Much better — a Student grades and describes itself. But the ROSTER is still a loose list plus separate save/load/report functions floating around. Who owns the collection?",
      code: `class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark
    def grade(self):
        if self.mark >= 90: return "A"
        elif self.mark >= 75: return "B"
        elif self.mark >= 50: return "C"
        else: return "F"
    def __str__(self):
        return (self.name + " (" + str(self.mark)
                + ", " + self.grade() + ")")

students = [Student("Asha", 85), Student("Ravi", 72)]
for s in students:
    print(s)          # __str__ does the formatting`,
    },
    {
      label: "v3 — a Classroom class",
      color: C.green,
      note: "Unit 10.1's idea applied again: make ONE object that owns the list and all the operations on it.",
      warn: null,
      code: `class Classroom:
    def __init__(self):
        self.students = []          # holds Student objects

    def add(self, name, mark):
        self.students.append(Student(name, mark))

    def report(self):
        for s in self.students:
            print(s)                # each Student's __str__

    def average(self):
        if not self.students:
            return 0
        total = 0
        for s in self.students:
            total += s.mark
        return total / len(self.students)

room = Classroom()
room.add("Asha", 85)
room.add("Ravi", 72)
room.report()
print("Average:", room.average())`,
    },
  ];
  const cur = versions[v];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Three passes: loose dict → a Student object → a Classroom that owns everything. Each step pulls related
        data and behaviour into one place.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {versions.map((ver, i) => (
          <button key={i} onClick={() => setV(i)} style={{
            padding: "8px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
            background: v === i ? ver.color + "22" : C.card, color: v === i ? ver.color : C.muted,
            border: `1.5px solid ${v === i ? ver.color : C.border}`,
          }}>{ver.label}</button>
        ))}
      </div>

      <div style={{ background: C.card, border: `1.5px solid ${cur.color}55`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 12.5, color: cur.color, fontWeight: 600, marginBottom: 10, lineHeight: 1.6 }}>{cur.note}</div>
        <pre style={{ ...mono, maxHeight: 360, overflowY: "auto" }}>{cur.code}</pre>
      </div>

      {cur.warn ? (
        <div style={{ background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
          ⛔ <strong style={{ color: C.red }}>Why we keep going:</strong> {cur.warn}
        </div>
      ) : (
        <div style={{ background: C.green + "12", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
          ✅ <strong style={{ color: C.green }}>Now it's fully object-oriented:</strong> the Classroom owns its
          students and every operation on them is a method. Add save()/load() (next tab) and the whole app is two
          tidy classes instead of scattered variables and functions.
        </div>
      )}

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Group data with the code that works on it.</strong> A Student owns
        its grade logic; a Classroom owns its roster and reports. That grouping is what keeps a growing program
        from turning into a pile of loose globals.
      </>)}
    </div>
  );
}

// ── Section 3: Play It — a live Classroom of Student objects ──
function PlayWidget() {
  const [students, setStudents] = useState([{ name: "Asha", mark: 85 }, { name: "Ravi", mark: 72 }]);
  const [disk, setDisk] = useState([{ name: "Asha", mark: 85 }, { name: "Ravi", mark: 72 }]);
  const [name, setName] = useState("");
  const [markText, setMarkText] = useState("");
  const [log, setLog] = useState([{ t: "sys", s: "room.load('marks.csv') → 2 Student objects" }]);

  const push = (lines) => setLog((l) => [...l.slice(-9), ...lines]);

  const add = () => {
    const n = name.trim();
    if (!n) { push([{ t: "err", s: "Name cannot be empty!" }]); return; }
    if (!/^\d+$/.test(markText.trim())) {
      push([{ t: "in", s: `> room.add("${n}", "${markText}")` }, { t: "err", s: "  ✗ mark must be a whole number. Not added." }]);
      return;
    }
    const m = parseInt(markText.trim(), 10);
    if (m < 0 || m > 100) { push([{ t: "in", s: `> room.add("${n}", ${m})` }, { t: "err", s: "  ✗ mark must be 0-100. Not added." }]); return; }
    setStudents((p) => [...p, { name: n, mark: m }]);
    push([{ t: "in", s: `> room.add("${n}", ${m})` }, { t: "ok", s: `  ✓ Student("${n}", ${m}) created → ${n} (${m}, ${gradeOf(m)})` }]);
    setName(""); setMarkText("");
  };
  const report = () => {
    if (students.length === 0) { push([{ t: "in", s: "> room.report()" }, { t: "err", s: "  (no students)" }]); return; }
    const avg = (students.reduce((a, s) => a + s.mark, 0) / students.length).toFixed(1);
    push([{ t: "in", s: "> room.report()" },
      ...students.map((s) => ({ t: "out", s: `  ${s.name} (${s.mark}, ${gradeOf(s.mark)})` })),
      { t: "out", s: `  Average: ${avg}` }]);
  };
  const save = () => { setDisk(students.map((s) => ({ ...s }))); push([{ t: "in", s: "> room.save('marks.csv')" }, { t: "ok", s: `  💾 wrote ${students.length} rows to marks.csv` }]); };
  const reopen = () => { setStudents(disk.map((s) => ({ ...s }))); push([{ t: "sys", s: "— app closed —" }, { t: "sys", s: `Classroom().load() → ${disk.length} Student objects` }]); };

  const colors = { sys: C.muted, in: C.accent, ok: C.green, out: C.text, err: C.red };
  const diskText = disk.length ? disk.map((s) => `${s.name},${s.mark}`).join("\n") + "\n" : "(empty)";
  const unsaved = JSON.stringify(students) !== JSON.stringify(disk);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A live Classroom holding Student objects. Add students (each becomes a <code style={{ color: C.teal }}>Student</code>),
        run <code style={{ color: C.accent }}>report()</code> to see every object's __str__ and grade, then Save
        and reopen to watch them reload as objects.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div>
          <label style={{ color: C.muted, fontSize: 11, display: "block", marginBottom: 4 }}>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Priya" style={{
            padding: "9px 12px", borderRadius: 8, background: C.card, color: C.text, fontSize: 13,
            border: `1.5px solid ${C.border}`, outline: "none", width: 110, fontFamily: "monospace",
          }} />
        </div>
        <div>
          <label style={{ color: C.muted, fontSize: 11, display: "block", marginBottom: 4 }}>Mark</label>
          <input value={markText} onChange={(e) => setMarkText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="90" style={{
            padding: "9px 12px", borderRadius: 8, background: C.card, color: C.text, fontSize: 13,
            border: `1.5px solid ${C.border}`, outline: "none", width: 90, fontFamily: "monospace",
          }} />
        </div>
        <button onClick={add} style={{ padding: "9px 14px", borderRadius: 8, background: C.green + "22", color: C.green, border: `1.5px solid ${C.green}`, fontWeight: 600, fontSize: 12.5, cursor: "pointer" }}>+ add</button>
        <button onClick={report} style={{ padding: "9px 14px", borderRadius: 8, background: C.accentGlow, color: "#fff", border: "none", fontWeight: 600, fontSize: 12.5, cursor: "pointer" }}>📋 report</button>
        <button onClick={save} style={{ padding: "9px 14px", borderRadius: 8, background: unsaved ? C.orange + "22" : C.card, color: unsaved ? C.orange : C.muted, border: `1.5px solid ${unsaved ? C.orange : C.border}`, fontWeight: 600, fontSize: 12.5, cursor: "pointer" }}>💾 save{unsaved ? " *" : ""}</button>
        <button onClick={reopen} style={{ padding: "9px 14px", borderRadius: 8, background: C.card, color: C.text, border: `1.5px solid ${C.border}`, fontWeight: 600, fontSize: 12.5, cursor: "pointer" }}>🔄 reopen</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 12 }}>
        <div style={{ background: "#010409", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, minHeight: 190 }}>
          <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>CONSOLE</div>
          {log.map((e, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 11.5, lineHeight: 1.75, color: colors[e.t], whiteSpace: "pre-wrap" }}>{e.s}</div>
          ))}
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.teal}44`, borderRadius: 10, padding: 14, minHeight: 190 }}>
          <div style={{ color: C.teal, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>📄 marks.csv (on disk)</div>
          <pre style={{ ...mono, color: C.text, fontSize: 12 }}>{diskText}</pre>
          {unsaved && <div style={{ color: C.orange, fontSize: 11, marginTop: 8 }}>⚠ unsaved objects in memory — hit 💾 save.</div>}
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>The Classroom coordinates; each Student does its own bit.</strong> report()
        just loops and lets every Student format and grade itself. Save writes their data; reopen rebuilds them as
        fresh objects. Small objects, cleanly connected — the whole point of OOP.
      </>)}
    </div>
  );
}

// ── Section 4: Full Code ──
function FullCodeWidget() {
  const code = `# Marks Manager 3.0 — Object-Oriented edition
# Foothold Module 10 Capstone

class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def grade(self):
        if self.mark >= 90:
            return "A"
        elif self.mark >= 75:
            return "B"
        elif self.mark >= 50:
            return "C"
        else:
            return "F"

    def __str__(self):
        return self.name + " (" + str(self.mark) + ", " + self.grade() + ")"


class Classroom:
    def __init__(self):
        self.students = []                 # a list of Student objects

    def add(self, name, mark):
        self.students.append(Student(name, mark))

    def report(self):
        if len(self.students) == 0:
            print("No students yet!")
            return
        for s in self.students:
            print(" ", s)                  # uses Student.__str__
        print("Average:", self.average())

    def average(self):
        if len(self.students) == 0:
            return 0
        total = 0
        for s in self.students:
            total = total + s.mark
        return total / len(self.students)

    def save(self, filename):
        with open(filename, "w") as f:
            for s in self.students:
                f.write(s.name + "," + str(s.mark) + "\\n")
        print("Saved", len(self.students), "students.")

    def load(self, filename):
        try:
            with open(filename, "r") as f:
                for line in f:
                    line = line.strip()
                    if line == "":
                        continue
                    name, mark = line.split(",")
                    self.add(name, int(mark))
        except FileNotFoundError:
            print("No saved file yet — starting fresh.")


# ── main program ──
room = Classroom()
room.load("marks.csv")

while True:
    print()
    print("1. Add  2. Report  3. Save & Exit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Name: ")
        mark = int(input("Mark: "))
        room.add(name, mark)
    elif choice == "2":
        room.report()
    elif choice == "3":
        room.save("marks.csv")
        print("Goodbye!")
        break
    else:
        print("Please choose 1, 2 or 3.")`;

  const challenges = [
    { icon: "🥉", text: "Add a topper() method to Classroom that RETURNS the Student with the highest mark (best-so-far pattern, Unit 7.3), then print(room.topper()) — its __str__ does the rest." },
    { icon: "🥈", text: "Reuse the ask_mark() validation loop from Unit 9.4 so room.add can never store an invalid mark — or better, put a set_mark guard method (Unit 10.3) inside Student." },
    { icon: "🥇", text: "Make a Person base class with name, then Student(Person) and Teacher(Person) (Unit 10.4). Give Classroom a mix and let each describe() itself in a report." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The complete two-class program — your Marks Manager, fully object-oriented and still persistent. Run it,
        add students, exit, run again: the Classroom loads them straight back as Student objects.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, maxHeight: 440, overflowY: "auto" }}>
        <pre style={mono}>{code}</pre>
      </div>

      <div style={{ color: C.orange, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>⚡ CHALLENGE UPGRADES</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {challenges.map((ch, i) => (
          <div key={i} style={{ display: "flex", gap: 10, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
            <span style={{ fontSize: 16 }}>{ch.icon}</span><span>{ch.text}</span>
          </div>
        ))}
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Look how far the same app has come:</strong> Module 8 gave it
        functions, Module 9 gave it robustness and files, Module 10 gave it objects. You've now met the full
        toolkit of core Python — the next module makes you fluent in it: comprehensions, modules, pip, and the
        wider ecosystem.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "In Marks Manager 3.0, what does a Classroom object own?",
      options: ["A single student's mark", "A list of Student objects plus the methods that operate on them", "Only the CSV file", "The grade() function"],
      answer: 1,
      explain: "Classroom holds self.students (a list of Student objects) and the operations — add, report, average, save, load — as methods. It owns the collection AND the behaviour.",
    },
    {
      q: "room.report() just does `for s in self.students: print(s)`. How does each line come out nicely formatted?",
      options: ["report() formats each student", "print(s) calls each Student's __str__ method", "It doesn't — it prints gibberish", "The CSV file formats it"],
      answer: 1,
      explain: "print(s) triggers Student.__str__, so each object formats itself as 'Asha (85, B)'. The Classroom doesn't need to know how a student is displayed — the Student decides.",
    },
    {
      q: "Why is `class Student` with a grade() method better than a name→mark dict plus a free grade(mark) function?",
      options: ["It runs faster", "Data and the behaviour that belongs to it are bundled in one self-contained object", "Dicts can't hold numbers", "Functions are not allowed"],
      answer: 1,
      explain: "The object keeps a student's data and its grade logic together. You call asha.grade() with no risk of passing the wrong value — the behaviour travels with the data it needs.",
    },
    {
      q: "Classroom.load() wraps its file reading in try/except FileNotFoundError. Why?",
      options: ["To make it slower", "So the very first run (no file yet) starts with an empty classroom instead of crashing", "To encrypt the file", "It's not needed"],
      answer: 1,
      explain: "On the first run marks.csv doesn't exist, so open() would raise FileNotFoundError. Catching it lets the app start fresh gracefully — the same robustness idea from Unit 9.4, now inside a method.",
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
        <div style={{ fontSize: 52 }}>{score >= 3 ? "🏆" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {score} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {score === 4 ? "Perfect! You can model a whole app as cooperating objects." :
            score >= 2 ? "Good work! Replay 'Build in Steps' — the dict → Student → Classroom journey is the core idea." :
              "Worth a replay: 'Build in Steps' and 'Play It'. Objects bundle data with behaviour; a Classroom owns its Students."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.green}22, ${C.purple}22)`,
          border: `1px solid ${C.green}55`,
        }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏆 Module 10 Complete — You Think in Objects!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Classes, __init__ and self, methods, encapsulation, __str__, and inheritance — and an entire app
            rebuilt as cooperating objects. This is the second great mental model of programming, after functions.<br /><br />
            <strong style={{ color: C.accent }}>Next: Module 11 — Pythonic Python &amp; the Ecosystem.</strong> You
            can build anything now; time to build it the <em>Python</em> way — comprehensions, modules, pip, and
            the huge world of libraries that makes Python, Python.
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
export default function Unit10_5({ student, onUnitComplete }) {
  const sections = [
    { id: "mission", label: "The Mission" },
    { id: "steps", label: "Build in Steps" },
    { id: "play", label: "Play It" },
    { id: "code", label: "Full Code" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Mission: Objects All the Way Down</h3><MissionWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>From Dict to Classroom</h3><StepsWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Play It: A Live Classroom</h3><PlayWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Full Code — Run It For Real</h3><FullCodeWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to close out Module 10.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 10 › UNIT 10.7</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Capstone: Marks Manager 3.0</div>
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
