// Unit 10.2 — __init__ & self (rebuilt, typing-first)
// Step through object creation → __init__ with parameters → self.x = x →
// the two classic bugs (forgetting self as a parameter; name = name instead of
// self.name = name) → defaults in __init__ → derived attributes → movies.

import { useState } from "react";
import LessonShell, { P, KeyIdea } from "../kit/Lesson.jsx";
import { T, CODE_FONT, MONO, tint } from "../kit/theme.js";

// ── Widget: how Student("Priya", 87) is built ──
const SRC = ["class Student:", "    def __init__(self, name, mark):", "        self.name = name", "        self.mark = mark", "", 's = Student("Priya", 87)'];
const STEPS = [
  { l: 5, obj: null, d: 'Student("Priya", 87) is called. Python first builds a blank object…' },
  { l: 1, obj: {}, d: "…then calls __init__ with that blank object as self, and the arguments as name and mark. You pass 2; Python passes self." },
  { l: 2, obj: { name: '"Priya"' }, d: "self.name = name: store the parameter ON the object." },
  { l: 3, obj: { name: '"Priya"', mark: "87" }, d: "self.mark = mark. The object is complete." },
  { l: 5, obj: { name: '"Priya"', mark: "87" }, tag: true, d: "__init__ ends; the finished object is tied to the name s." },
];
function Build() {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  return (
    <div className="fh-two">
      <div>
        <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: 6 }}>
          {SRC.map((l, k) => <div key={k} style={{ padding: "1px 8px", borderRadius: 5, minHeight: 20, background: s.l === k ? tint(T.blue, "22") : "transparent", fontWeight: s.l === k ? 700 : 400 }}>{l}</div>)}
        </pre>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={() => setI(Math.max(0, i - 1))} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, cursor: "pointer" }}>◀</button>
          <button onClick={() => setI(Math.min(STEPS.length - 1, i + 1))} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: T.navy, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Next ▶</button>
        </div>
      </div>
      <div>
        {s.obj && (
          <div style={{ display: "inline-block", border: `2px solid ${T.teal}`, borderRadius: 12, padding: "10px 14px", background: tint(T.teal, "0C"), minWidth: 200 }}>
            <div style={{ fontFamily: MONO, fontSize: 11, color: T.teal, letterSpacing: 1.2 }}>{s.tag ? "🏷 s → " : "self → "}Student object</div>
            {Object.entries(s.obj).map(([k, v]) => <div key={k} style={{ fontFamily: CODE_FONT, fontSize: 15 }}>.{k} = {v}</div>)}
            {!Object.keys(s.obj).length && <div style={{ fontSize: 13, color: T.muted }}>(blank)</div>}
          </div>
        )}
        <div style={{ fontSize: 14.5, color: T.slate, marginTop: 10 }}>{s.d}</div>
      </div>
    </div>
  );
}

const best = (rows) => { let b = rows[0]; for (const r of rows) if (r[2] > b[2]) b = r; return b; };
const movieOut = (lines) => {
  const rows = lines.map((l) => { const [t, y, r] = l.split(","); return [t, Number(y), Number(r)]; });
  const b = best(rows);
  return [...lines.map((l) => `Movie: ${l}`), ...rows.map(([t, y, r]) => `${t} (${y}) - ${r}`), `Best: ${b[0]}`].join("\n");
};

const EX = {
  init: {
    id: "init", kind: "type", title: "Build a complete object in one line",
    task: <><code>__init__</code> (two underscores each side) runs automatically every time an object is built. <code>self</code> is the object being built.</>,
    show: 'class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.mark = mark\n\ns1 = Student("Priya", 87)\ns2 = Student("Arun", 62)\nprint(s1.name, s1.mark)\nprint(s2.name, s2.mark)',
    tests: [{ expect: "Priya 87\nArun 62" }],
    post: "assert Student('X', 1).mark == 1",
    requires: [{ node: "FunctionDef" }],
    hints: ["Two underscores before and after init."],
    solution: 'class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.mark = mark\n\ns1 = Student("Priya", 87)\ns2 = Student("Arun", 62)\nprint(s1.name, s1.mark)\nprint(s2.name, s2.mark)',
  },
  noself: {
    id: "noself", kind: "fix", title: "Forgot self (1)",
    task: <>Run it and read the coach.</>,
    starter: 'class Student:\n    def __init__(name, mark):\n        self.name = name\n        self.mark = mark\n\ns = Student("Priya", 87)\nprint(s.name)',
    tests: [{ expect: "Priya" }],
    hints: ["Every method's first parameter receives the object: def __init__(self, name, mark):"],
    solution: 'class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.mark = mark\n\ns = Student("Priya", 87)\nprint(s.name)',
  },
  noprefix: {
    id: "noprefix", kind: "fix", title: "Forgot self (2)",
    task: <>Run it and read the coach. This is the most common class bug of all.</>,
    starter: 'class Student:\n    def __init__(self, name, mark):\n        name = name\n        mark = mark\n\ns = Student("Priya", 87)\nprint(s.name, s.mark)',
    tests: [{ expect: "Priya 87" }],
    hints: ["name = name just reassigns the local parameter. To store it on the object: self.name = name"],
    solution: 'class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.mark = mark\n\ns = Student("Priya", 87)\nprint(s.name, s.mark)',
  },
  rect: {
    id: "rect", kind: "write", title: "Attributes worked out in __init__",
    task: <>Write <code>Rectangle(length, width)</code> whose <code>__init__</code> also stores <code>self.area</code> and <code>self.perimeter</code>. Ask <code>Length: </code> and <code>Width: </code> (whole numbers) and print <code>Area: 15</code> and <code>Perimeter: 16</code> from the object's attributes.</>,
    tests: [{ inputs: ["5", "3"], expect: "Length: 5\nWidth: 3\nArea: 15\nPerimeter: 16" }, { inputs: ["10", "10"], expect: "Length: 10\nWidth: 10\nArea: 100\nPerimeter: 40", hidden: true }],
    post: "_r = Rectangle(2, 7)\nassert _r.area == 14 and _r.perimeter == 18, 'Rectangle should set .area and .perimeter in __init__'",
    requires: [{ node: "ClassDef" }],
    hints: ["self.area = length * width", "r = Rectangle(l, w); print(f\"Area: {r.area}\")"],
    solution: 'class Rectangle:\n    def __init__(self, length, width):\n        self.length = length\n        self.width = width\n        self.area = length * width\n        self.perimeter = 2 * (length + width)\n\nl = int(input("Length: "))\nw = int(input("Width: "))\nr = Rectangle(l, w)\nprint(f"Area: {r.area}")\nprint(f"Perimeter: {r.perimeter}")',
  },
  account: {
    id: "account", kind: "write", title: "A default in __init__",
    task: <>Write <code>Account(owner, balance=0)</code> — the same default-parameter rule as Unit 8.2. Create <code>Account("Priya", 500)</code> and <code>Account("Arun")</code> and print <code>Priya: Rs 500</code> and <code>Arun: Rs 0</code>.</>,
    tests: [{ expect: "Priya: Rs 500\nArun: Rs 0" }],
    post: "assert Account('Z').balance == 0 and Account('Y', 5).balance == 5",
    requires: [{ node: "ClassDef" }],
    hints: ["def __init__(self, owner, balance=0):"],
    solution: 'class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\na = Account("Priya", 500)\nb = Account("Arun")\nfor acc in [a, b]:\n    print(f"{acc.owner}: Rs {acc.balance}")',
  },
  movies: {
    id: "movies", kind: "make", title: "Movie list",
    task: <>Write <code>Movie(title, year, rating)</code>. Read 3 lines with <code>Movie: </code>, each like <code>Jailer,2023,7.1</code>; split, convert (year int, rating float) and build a Movie. Print each as <code>Jailer (2023) - 7.1</code>, then <code>Best: Vikram</code> (highest rating, first wins ties).</>,
    minLines: 14,
    tests: [
      { inputs: ["Jailer,2023,7.1", "Vikram,2022,8.3", "Leo,2023,7.2"], expect: movieOut(["Jailer,2023,7.1", "Vikram,2022,8.3", "Leo,2023,7.2"]) },
      { inputs: ["A,2000,5.5", "B,2001,9.9", "C,2002,9.9"], expect: movieOut(["A,2000,5.5", "B,2001,9.9", "C,2002,9.9"]), hidden: true },
    ],
    post: "_m = Movie('T', 2001, 7.5)\nassert _m.title == 'T' and _m.year == 2001 and _m.rating == 7.5",
    requires: [{ node: "ClassDef" }],
    hints: ['title, year, rating = line.split(",")', "best-so-far over the list of Movie objects, comparing .rating"],
    solution: 'class Movie:\n    def __init__(self, title, year, rating):\n        self.title = title\n        self.year = year\n        self.rating = rating\n\nmovies = []\nfor i in range(3):\n    title, year, rating = input("Movie: ").split(",")\n    movies.append(Movie(title, int(year), float(rating)))\nbest = movies[0]\nfor m in movies:\n    print(f"{m.title} ({m.year}) - {m.rating}")\n    if m.rating > best.rating:\n        best = m\nprint(f"Best: {best.title}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "When does __init__ run?", options: ["When the class is defined", "Every time an object is created", "Only when called by name", "At the end of the program"], answer: 1, explain: "Student(...) builds an object and runs __init__ on it." },
  { q: "In Student(\"Priya\", 87), what is self?", options: ["\"Priya\"", "The new object being built", "The class", "87"], answer: 1, explain: "Python passes the new object automatically as the first argument." },
  { q: "Inside __init__, what does name = name do?", options: ["Stores name on the object", "Nothing useful — it only reassigns the local parameter", "Error", "Deletes name"], answer: 1, explain: "Use self.name = name to store it on the object." },
  { q: "def __init__(name, mark) (no self). Student(\"A\", 1) gives…", options: ["Works", "TypeError: takes 2 positional arguments but 3 were given", "NameError", "A blank object"], answer: 1, explain: "Python passes 3 values (the object + 2 arguments) but the method only takes 2." },
];

export default function Unit10_2(props) {
  const sections = [
    {
      label: "__init__", kicker: "THE CONSTRUCTOR", title: "Building an object in one line",
      blocks: [<P>Setting every attribute by hand after <code>Student()</code> is slow and easy to forget. <code>__init__</code> is a special method Python runs automatically when an object is built. Step through:</P>, <Build />, EX.init],
    },
    { label: "Forgetting self", kicker: "THE TWO CLASSIC BUGS", title: "Two ways to forget self", blocks: [EX.noself, EX.noprefix, <KeyIdea>Every method takes <code>self</code> first. Anything the object should remember is written <code>self.something = …</code>.</KeyIdea>] },
    { label: "Richer __init__", kicker: "DEFAULTS · DERIVED VALUES", title: "More than copying parameters", blocks: [EX.rect, EX.account] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: movie list", blocks: [EX.movies] },
  ];
  return (
    <LessonShell {...props} unitId="Unit10_2" crumb="MODULE 10 › UNIT 10.2" title="__init__ & self" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 10.3 — Methods & Encapsulation", text: "Objects that can DO things — and guard their own data." }} />
  );
}
