// Unit 10.7 — Capstone: Marks Manager 3.0 (rebuilt, typing-first)
// v1 Student class (validated mark, grade(), __str__) → v2 Classroom class
// + menu, InvalidMarkError caught → v3 Classroom.save / load (files, M9)
// → Make It: a report card with several subjects.

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const files = (map) => "import os\n" + Object.entries(map).map(([n, c]) => (c === null ? `if os.path.exists(${JSON.stringify(n)}): os.remove(${JSON.stringify(n)})` : `with open(${JSON.stringify(n)}, "w") as _f: _f.write(${JSON.stringify(c)})`)).join("\n");

// ── Reference simulator ──
const gradeOf = (m) => (m >= 90 ? "A" : m >= 75 ? "B" : m >= 60 ? "C" : m >= 40 ? "D" : "F");
function report(pairs) {
  if (!pairs.length) return ["No students yet"];
  let total = 0, passed = 0, top = pairs[0][0], best = pairs[0][1]; const out = [];
  for (const [n, m] of pairs) { out.push(`${n}: ${m} (${gradeOf(m)})`); total += m; if (m >= 40) passed++; if (m > best) { best = m; top = n; } }
  out.push(`Average: ${(total / pairs.length).toFixed(2)}`, `Topper: ${top} (${best})`, `Passed: ${passed}/${pairs.length}`);
  return out;
}
const sim1 = (names, marks) => {
  const n = names.split(" "), m = marks.split(" ").map(Number);
  return [`Names: ${names}`, `Marks: ${marks}`, ...report(n.map((x, i) => [x, m[i]]))].join("\n");
};
function simMenu(fileText, inputs, persist) {
  const out = [], data = [];
  if (persist) {
    if (fileText) for (const l of fileText.split("\n")) { if (!l) continue; const [a, b] = l.split(","); data.push([a, Number(b)]); }
    out.push(`Loaded ${data.length} students`);
  }
  const q = [...inputs]; const ask = (p) => { const v = q.shift(); out.push(p + v); return v; };
  for (;;) {
    out.push("1. Add  2. Report  3. Exit");
    const c = ask("Choose: ");
    if (c === "1") {
      const name = ask("Name: ").trim().toUpperCase(); const mark = Number(ask("Mark: "));
      if (mark < 0 || mark > 100) { out.push(`Rejected: ${mark} is not between 0 and 100`); continue; }
      const at = data.findIndex(([k]) => k === name);
      if (at >= 0) { data[at][1] = mark; out.push(`Updated ${name}`); } else { data.push([name, mark]); out.push(`Added ${name}`); }
    } else if (c === "2") out.push(...report(data));
    else if (c === "3") { if (persist) out.push(`Saved ${data.length} students`); out.push("Bye!"); break; }
    else out.push("Invalid choice");
  }
  return { out: out.join("\n"), file: data.map(([n, m]) => `${n},${m}\n`).join("") };
}

// ── Code pieces ──
const ERR = 'class InvalidMarkError(Exception):\n    pass';
const STUDENT = 'class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.set_mark(mark)\n\n    def set_mark(self, mark):\n        if not 0 <= mark <= 100:\n            raise InvalidMarkError(f"{mark} is not between 0 and 100")\n        self.mark = mark\n\n    def grade(self):\n        if self.mark >= 90:\n            return "A"\n        elif self.mark >= 75:\n            return "B"\n        elif self.mark >= 60:\n            return "C"\n        elif self.mark >= 40:\n            return "D"\n        return "F"\n\n    def __str__(self):\n        return f"{self.name}: {self.mark} ({self.grade()})"';
const STATS = (list) => `    total = 0\n    passed = 0\n    top = ${list}[0]\n    for s in ${list}:\n        print(s)\n        total += s.mark\n        if s.mark >= 40:\n            passed += 1\n        if s.mark > top.mark:\n            top = s\n    print(f"Average: {total / len(${list}):.2f}")\n    print(f"Topper: {top.name} ({top.mark})")\n    print(f"Passed: {passed}/{len(${list})}")`;
const V1 = `${ERR}\n\n${STUDENT}\n\nnames = input("Names: ").split()\nmarks = input("Marks: ").split()\nstudents = []\nfor n, m in zip(names, marks):\n    students.append(Student(n, int(m)))\nif students:\n${STATS("students")}`;
const CLASSROOM = (persist) => `class Classroom:\n    def __init__(self):\n        self.students = {}\n\n    def add(self, name, mark):\n        if name in self.students:\n            self.students[name].set_mark(mark)\n            return f"Updated {name}"\n        self.students[name] = Student(name, mark)\n        return f"Added {name}"\n\n    def report(self):\n        if not self.students:\n            print("No students yet")\n            return\n        roster = list(self.students.values())\n    ${STATS("roster").split("\n").join("\n    ")}` + (persist ? `\n\n    def save(self, filename):\n        with open(filename, "w") as f:\n            for s in self.students.values():\n                f.write(f"{s.name},{s.mark}\\n")\n\n    def load(self, filename):\n        try:\n            with open(filename) as f:\n                for line in f:\n                    name, mark = line.strip().split(",")\n                    self.add(name, int(mark))\n        except FileNotFoundError:\n            pass` : "");
const MENU = (persist) => `\n\nroom = Classroom()\n${persist ? 'room.load("marks.txt")\nprint(f"Loaded {len(room.students)} students")\n' : ""}while True:\n    print("1. Add  2. Report  3. Exit")\n    choice = input("Choose: ")\n    if choice == "1":\n        name = input("Name: ").strip().upper()\n        mark = int(input("Mark: "))\n        try:\n            print(room.add(name, mark))\n        except InvalidMarkError as e:\n            print(f"Rejected: {e}")\n    elif choice == "2":\n        room.report()\n    elif choice == "3":\n${persist ? '        room.save("marks.txt")\n        print(f"Saved {len(room.students)} students")\n' : ""}        print("Bye!")\n        break\n    else:\n        print("Invalid choice")`;
const V2 = `${ERR}\n\n${STUDENT}\n\n${CLASSROOM(false)}${MENU(false)}`;
const V3 = `${ERR}\n\n${STUDENT}\n\n${CLASSROOM(true)}${MENU(true)}`;

const S2a = ["2", "1", "priya", "87", "1", "arun", "150", "1", "arun", "35", "1", "PRIYA", "91", "2", "3"];
const S2b = ["1", "meena", "40", "2", "3"];
const S3a = ["1", "meena", "91", "2", "3"];
const mk3 = (fileText, inputs, hidden) => {
  const s = simMenu(fileText, inputs, true);
  return { setup: files({ "marks.txt": fileText }), inputs, expect: s.out, hidden,
    post: `with open("marks.txt") as _f:\n    _g = _f.read()\nassert _g == ${JSON.stringify(s.file)}, "marks.txt should hold NAME,MARK per student: " + repr(_g)` };
};
const card = (name, line) => {
  const pairs = line.split(" ").map((p) => p.split(":")).map(([s, m]) => [s, Number(m)]);
  const avg = pairs.reduce((a, [, m]) => a + m, 0) / pairs.length;
  let best = pairs[0], worst = pairs[0];
  for (const p of pairs) { if (p[1] > best[1]) best = p; if (p[1] < worst[1]) worst = p; }
  return [`Name: ${name}`, `Subjects: ${line}`, `${name} - average ${avg.toFixed(1)} (${gradeOf(avg)})`, `Best: ${best[0]} (${best[1]})`, `Weakest: ${worst[0]} (${worst[1]})`].join("\n");
};

const EX = {
  v1: {
    id: "v1", kind: "write", title: "Version 1 — a Student class",
    task: <>Write <code>InvalidMarkError</code> and a <code>Student(name, mark)</code> class: <code>set_mark</code> validates 0–100 (also used by <code>__init__</code>), <code>grade()</code> returns A–F (pass mark 40), and <code>__str__</code> returns <code>PRIYA: 87 (B)</code>. Read <code>Names: </code> and <code>Marks: </code>, build a list of Students, print each, then <code>Average: 69.50</code>, <code>Topper: MEENA (91)</code>, <code>Passed: 3/4</code>.</>,
    minLines: 40,
    tests: [
      { inputs: ["PRIYA ARUN MEENA RAVI", "87 62 91 38"], expect: sim1("PRIYA ARUN MEENA RAVI", "87 62 91 38") },
      { inputs: ["A B", "40 39"], expect: sim1("A B", "40 39"), hidden: true },
    ],
    post: "assert str(Student('Z', 75)) == 'Z: 75 (B)'\ntry:\n    Student('Q', 101)\n    raise AssertionError('Student(..., 101) should raise InvalidMarkError')\nexcept InvalidMarkError:\n    pass",
    requires: [{ node: "ClassDef", min: 2 }],
    hints: ["Reuse your 10.3 set_mark and 10.6 InvalidMarkError.", "The topper is now a Student object: top = students[0]; if s.mark > top.mark: top = s"],
    solution: V1,
  },
  v2: {
    id: "v2", kind: "modify", title: "Version 2 — a Classroom class",
    task: <>The loose list becomes a <code>Classroom</code> class holding a dict of name → Student, with <code>add(name, mark)</code> (returns <code>Added PRIYA</code> or <code>Updated PRIYA</code> — updating uses <code>set_mark</code>, so it's validated too) and <code>report()</code> (prints the report, or <code>No students yet</code>). Replace the input lines with the familiar menu (<code>1. Add  2. Report  3. Exit</code>); an out-of-range mark prints <code>Rejected: 150 is not between 0 and 100</code>.</>,
    starter: V1,
    minLines: 64,
    tests: [{ inputs: S2a, expect: simMenu(null, S2a, false).out }, { inputs: S2b, expect: simMenu(null, S2b, false).out, hidden: true }],
    post: "_r = Classroom()\nassert _r.add('X', 50) == 'Added X' and _r.add('X', 60) == 'Updated X' and _r.students['X'].mark == 60",
    requires: [{ node: "ClassDef", min: 3 }, { node: "While" }],
    hints: ["self.students = {} in Classroom.__init__.", "report(): roster = list(self.students.values()), then the Version 1 report loop over roster.", "Menu: try: print(room.add(name, mark)) except InvalidMarkError as e: print(f\"Rejected: {e}\")"],
    solution: V2,
  },
  v3: {
    id: "v3", kind: "modify", title: "Version 3 — the classroom remembers",
    task: <>Give <code>Classroom</code> two more methods: <code>save(filename)</code> (one <code>NAME,MARK</code> line per student) and <code>load(filename)</code> (reads the lines back through <code>self.add</code>; a missing file means an empty class). Load <code>marks.txt</code> at start and print <code>Loaded 2 students</code>; on Exit save, print <code>Saved 3 students</code> and <code>Bye!</code>. The tests check the saved file.</>,
    starter: V2,
    minLines: 80,
    tests: [mk3("PRIYA,87\nARUN,62\n", S3a, false), mk3(null, ["1", "ravi", "64", "3"], true)],
    requires: [{ node: "With", min: 2 }, { node: "Try", min: 2 }],
    hints: ["load reuses add — so loaded marks are validated too.", "FileNotFoundError → pass (Unit 9.3)."],
    solution: V3,
  },
  card: {
    id: "card", kind: "make", title: "Report card",
    task: <>Write <code>ReportCard(name)</code> holding a dict of subject → mark, with <code>add(subject, mark)</code>, <code>average()</code>, <code>best()</code> and <code>weakest()</code> (each returns a <code>(subject, mark)</code> tuple; first wins ties). Ask <code>Name: </code> and <code>Subjects: </code> (like <code>maths:91 physics:78 chemistry:66</code>). Print <code>Priya - average 78.3 (B)</code> (grade by average, using the A–F rule), <code>Best: maths (91)</code> and <code>Weakest: chemistry (66)</code>.</>,
    minLines: 28,
    tests: [
      { inputs: ["Priya", "maths:91 physics:78 chemistry:66"], expect: card("Priya", "maths:91 physics:78 chemistry:66") },
      { inputs: ["Arun", "tamil:40 english:40"], expect: card("Arun", "tamil:40 english:40"), hidden: true },
    ],
    post: "_c = ReportCard('Z')\n_c.add('a', 10)\n_c.add('b', 30)\nassert _c.average() == 20 and _c.best() == ('b', 30) and _c.weakest() == ('a', 10)",
    requires: [{ node: "ClassDef" }, { node: "FunctionDef", min: 5 }],
    hints: ['for part in line.split(): subject, mark = part.split(":"); card.add(subject, int(mark))', "best(): best-so-far over self.marks.items(), returning the (subject, mark) tuple.", "A grade function (or method) for the average — reuse your A–F rule."],
    solution: 'def grade(mark):\n    if mark >= 90:\n        return "A"\n    elif mark >= 75:\n        return "B"\n    elif mark >= 60:\n        return "C"\n    elif mark >= 40:\n        return "D"\n    return "F"\n\nclass ReportCard:\n    def __init__(self, name):\n        self.name = name\n        self.marks = {}\n\n    def add(self, subject, mark):\n        self.marks[subject] = mark\n\n    def average(self):\n        return sum(self.marks.values()) / len(self.marks)\n\n    def best(self):\n        top = None\n        for subject, mark in self.marks.items():\n            if top is None or mark > top[1]:\n                top = (subject, mark)\n        return top\n\n    def weakest(self):\n        low = None\n        for subject, mark in self.marks.items():\n            if low is None or mark < low[1]:\n                low = (subject, mark)\n        return low\n\ncard = ReportCard(input("Name: "))\nfor part in input("Subjects: ").split():\n    subject, mark = part.split(":")\n    card.add(subject, int(mark))\navg = card.average()\nprint(f"{card.name} - average {avg:.1f} ({grade(avg)})")\nb_subject, b_mark = card.best()\nw_subject, w_mark = card.weakest()\nprint(f"Best: {b_subject} ({b_mark})")\nprint(f"Weakest: {w_subject} ({w_mark})")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why does Classroom.add update with set_mark instead of assigning .mark directly?", options: ["Shorter", "So every change — even an update — passes the same validation", "Faster", "Required by Python"], answer: 1, explain: "One checkpoint for all changes: encapsulation." },
  { q: "Why does load() call self.add for each line?", options: ["Style", "Loaded data gets the same validation and object-building as typed data", "To print messages", "It must"], answer: 1, explain: "Reuse the method instead of duplicating the logic." },
  { q: "What did moving from dicts (Module 7–9) to classes give the Marks Manager?", options: ["Speed", "Data and the rules about it live together; each piece has a clear home", "Fewer lines", "Nothing"], answer: 1, explain: "Student knows how to grade itself; Classroom knows how to save itself." },
  { q: "Which part is polymorphic-ready: print(s) works because…", options: ["print knows Student", "Student defines __str__, which print calls", "Students are strings", "Magic"], answer: 1, explain: "Special methods let your objects plug into Python's built-ins." },
];

export default function Unit10_7(props) {
  const sections = [
    {
      label: "The Mission", kicker: "CAPSTONE", title: "Marks Manager 3.0",
      blocks: [
        <P>The Marks Manager's final form. In Module 7 it was a dictionary and a loop; Module 8 split it into functions; Module 9 made it robust and persistent. Now each piece of data gets a class that knows its own rules: a <strong>Student</strong> validates and grades itself; a <strong>Classroom</strong> manages, reports, saves and loads its students.</P>,
        <Note color={T.blue} icon="🧪">Hidden checks call your classes directly (for example <code>Student('Q', 101)</code> must raise InvalidMarkError) and read the file your program saves.</Note>,
      ],
    },
    { label: "Version 1", kicker: "BUILD IN STEPS", title: "Version 1: Student objects", blocks: [EX.v1] },
    { label: "Version 2", kicker: "ADD ONE IDEA", title: "Version 2: a Classroom", blocks: [EX.v2] },
    { label: "Version 3", kicker: "ADD ONE MORE", title: "Version 3: save and load", blocks: [EX.v3, <KeyIdea>Every module added one idea to the same program — containers, functions, robustness, objects. That's how real software grows: in working steps.</KeyIdea>] },
    { label: "Make It", kicker: "ON YOUR OWN", title: "Your program: report card", blocks: [EX.card] },
  ];
  return (
    <LessonShell {...props} unitId="Unit10_7" crumb="MODULE 10 › UNIT 10.7" title="Capstone: Marks Manager 3.0" sections={sections} quiz={QUIZ}
      next={{ title: "Computational Thinking II / Module 11", text: "Module 10 complete! The four pillars and OOP are yours. (Optional first: Module 10's Crucible.)" }} />
  );
}
