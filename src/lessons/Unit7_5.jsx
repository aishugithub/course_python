// Unit 7.5 — Sets (rebuilt on the typing-first lesson kit; shown as 7.6 now
// that Dictionaries is 7.5). Dedup with set(), add, {} vs set(), the four set
// operations, seen-set pattern, attendance checker.

import { useState } from "react";
import LessonShell, { P, KeyIdea } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const pyList = (a) => "[" + a.map((x) => `'${x}'`).join(", ") + "]";

// ── Widget: the four set operations ──
const A = ["Math", "Physics", "CS"], B = ["Physics", "CS", "Bio"];
const OPS = {
  "A | B": { n: "union — in either", f: () => [...new Set([...A, ...B])] },
  "A & B": { n: "intersection — in both", f: () => A.filter((x) => B.includes(x)) },
  "A - B": { n: "difference — in A but not B", f: () => A.filter((x) => !B.includes(x)) },
  "A ^ B": { n: "symmetric difference — in exactly one", f: () => [...A.filter((x) => !B.includes(x)), ...B.filter((x) => !A.includes(x))] },
};
function SetOps() {
  const [op, setOp] = useState("A & B");
  const res = OPS[op].f();
  const chip = (x, on) => <span key={x} style={{ fontFamily: CODE_FONT, padding: "4px 10px", borderRadius: 999, margin: 3, display: "inline-block", border: `1.5px solid ${on ? T.teal : T.border}`, background: on ? tint(T.teal, "22") : T.card, fontWeight: on ? 700 : 400 }}>{x}</span>;
  return (
    <div className="fh-two">
      <div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 14 }}>A = Priya's subjects<br />{A.map((x) => chip(x, res.includes(x)))}</div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 14, marginTop: 8 }}>B = Arun's subjects<br />{B.map((x) => chip(x, res.includes(x)))}</div>
      </div>
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Object.keys(OPS).map((k) => <button key={k} onClick={() => setOp(k)} style={{ fontFamily: CODE_FONT, fontSize: 15, padding: "7px 12px", borderRadius: 8, cursor: "pointer", border: `1.5px solid ${op === k ? T.navy : T.border}`, background: op === k ? T.navy : T.card, color: op === k ? "#fff" : T.text }}>{k}</button>)}
        </div>
        <div style={{ marginTop: 10, fontSize: 14.5, color: T.slate }}><strong>{OPS[op].n}</strong></div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 16, marginTop: 4 }}>→ {"{"}{res.map((x) => `'${x}'`).join(", ")}{"}"}</div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const attendance = (cls, pres) => {
  const c = cls.split(" "), p = pres.split(" ");
  const absent = c.filter((x) => !p.includes(x)).sort();
  const extra = [...new Set(p.filter((x) => !c.includes(x)))].sort();
  const present = new Set(p.filter((x) => c.includes(x))).size;
  return [`Class: ${cls}`, `Present: ${pres}`, `Absent: ${pyList(absent)}`, `Not in class: ${pyList(extra)}`, `Attendance: ${(present / c.length * 100).toFixed(1)}%`].join("\n");
};
const EX = {
  dedupe: {
    id: "dedupe", kind: "type", title: "Duplicates vanish",
    task: <>A set keeps each value at most once. Sets have no fixed order, so we print them through <code>sorted()</code>. Note the last line: <code>{"{}"}</code> is an empty <em>dictionary</em>.</>,
    show: 'names = ["Priya", "Arun", "Priya", "Meena", "Arun"]\nunique = set(names)\nprint(len(names), len(unique))\nprint(sorted(unique))\ns = {3, 1, 2}\ns.add(2)\ns.add(5)\nprint(sorted(s))\nprint(type({}), type(set()))',
    minLines: 10,
    tests: [{ expect: "5 3\n['Arun', 'Meena', 'Priya']\n[1, 2, 3, 5]\n<class 'dict'> <class 'set'>" }],
    hints: ["Adding 2 again changes nothing — it's already in the set."],
    solution: 'names = ["Priya", "Arun", "Priya", "Meena", "Arun"]\nunique = set(names)\nprint(len(names), len(unique))\nprint(sorted(unique))\ns = {3, 1, 2}\ns.add(2)\ns.add(5)\nprint(sorted(s))\nprint(type({}), type(set()))',
  },
  distinct: {
    id: "distinct", kind: "write", title: "How many different words?",
    task: <>Ask <code>Sentence: </code>. Treat capitals as the same word (lower everything). For <code>The cat and the dog and THE bird</code> print <code>Words: 8</code> and <code>Distinct: 5</code>.</>,
    tests: [
      { inputs: ["The cat and the dog and THE bird"], expect: "Sentence: The cat and the dog and THE bird\nWords: 8\nDistinct: 5" },
      { inputs: ["one one one"], expect: "Sentence: one one one\nWords: 3\nDistinct: 1", hidden: true },
    ],
    requires: [{ call: "set" }],
    hints: ["words = sentence.lower().split()", "len(set(words))"],
    solution: 'words = input("Sentence: ").lower().split()\nprint(f"Words: {len(words)}")\nprint(f"Distinct: {len(set(words))}")',
  },
  emptyset: {
    id: "emptyset", kind: "fix", title: "{} is not an empty set",
    task: <>Run it and read the coach. Make <code>seen</code> a real empty set.</>,
    starter: 'seen = {}\nseen.add("Priya")\nprint(seen)',
    tests: [{ expect: "{'Priya'}" }],
    hints: ["{} makes an empty dictionary — dictionaries have no .add(). Use set()."],
    solution: 'seen = set()\nseen.add("Priya")\nprint(seen)',
  },
  ops: {
    id: "ops", kind: "type", title: "Union, intersection, difference",
    task: <>The widget above, as code.</>,
    show: 'a = {"Math", "Physics", "CS"}\nb = {"Physics", "CS", "Bio"}\nprint(sorted(a | b))\nprint(sorted(a & b))\nprint(sorted(a - b))\nprint(sorted(a ^ b))',
    tests: [{ expect: "['Bio', 'CS', 'Math', 'Physics']\n['CS', 'Physics']\n['Math']\n['Bio', 'Math']" }],
    hints: ["sorted turns each set into an alphabetical list."],
    solution: 'a = {"Math", "Physics", "CS"}\nb = {"Physics", "CS", "Bio"}\nprint(sorted(a | b))\nprint(sorted(a & b))\nprint(sorted(a - b))\nprint(sorted(a ^ b))',
  },
  common: {
    id: "common", kind: "write", title: "Shared electives",
    task: <>Ask <code>Priya: </code> and <code>Arun: </code> (each a line of elective names). Print <code>Common: [...]</code> and <code>Only Priya: [...]</code>, both sorted.</>,
    tests: [
      { inputs: ["AI IoT Web Cyber", "Web AI Robotics"], expect: "Priya: AI IoT Web Cyber\nArun: Web AI Robotics\nCommon: ['AI', 'Web']\nOnly Priya: ['Cyber', 'IoT']" },
      { inputs: ["AI", "Web"], expect: "Priya: AI\nArun: Web\nCommon: []\nOnly Priya: ['AI']", hidden: true },
    ],
    hints: ["p = set(input(\"Priya: \").split())", "p & a for common, p - a for only Priya."],
    solution: 'p = set(input("Priya: ").split())\na = set(input("Arun: ").split())\nprint(f"Common: {sorted(p & a)}")\nprint(f"Only Priya: {sorted(p - a)}")',
  },
  firstdup: {
    id: "firstdup", kind: "write", title: "The first repeated roll number",
    task: <>Ask <code>Rolls: </code> (one line). Walk through them with a <code>seen</code> set; the first roll already in <code>seen</code> is a duplicate entry — print <code>First duplicate: 1042</code> and stop. If there's none, print <code>No duplicates</code>.</>,
    tests: [
      { inputs: ["1001 1042 1003 1042 1001"], expect: "Rolls: 1001 1042 1003 1042 1001\nFirst duplicate: 1042" },
      { inputs: ["1 2 3"], expect: "Rolls: 1 2 3\nNo duplicates", hidden: true },
      { inputs: ["7 7"], expect: "Rolls: 7 7\nFirst duplicate: 7", hidden: true },
    ],
    requires: [{ call: "add" }, { node: "Break" }],
    hints: ["seen = set(); found = False before the loop.", "if r in seen: … break — otherwise seen.add(r)."],
    solution: 'seen = set()\nfound = False\nfor r in input("Rolls: ").split():\n    if r in seen:\n        print(f"First duplicate: {r}")\n        found = True\n        break\n    seen.add(r)\nif not found:\n    print("No duplicates")',
  },
  attendance: {
    id: "attendance", kind: "make", title: "Attendance checker",
    task: <>Ask <code>Class: </code> (all names) and <code>Present: </code> (names marked present — may include mistakes and repeats). Print <code>Absent: [...]</code> (sorted), <code>Not in class: [...]</code> (sorted names marked present who aren't in the class), and <code>Attendance: 75.0%</code> (real present students ÷ class size, 1 decimal).</>,
    minLines: 8,
    tests: [
      { inputs: ["Priya Arun Meena Ravi", "Arun Priya Ravi Priya Karan"], expect: attendance("Priya Arun Meena Ravi", "Arun Priya Ravi Priya Karan") },
      { inputs: ["A B C", "A B C"], expect: attendance("A B C", "A B C"), hidden: true },
      { inputs: ["A B C D", "Z"], expect: attendance("A B C D", "Z"), hidden: true },
    ],
    hints: ["cls = set(...), pres = set(...)", "Absent: cls - pres. Not in class: pres - cls. Really present: cls & pres.", 'f"Attendance: {len(cls & pres) / len(cls) * 100:.1f}%"'],
    solution: 'cls = set(input("Class: ").split())\npres = set(input("Present: ").split())\nprint(f"Absent: {sorted(cls - pres)}")\nprint(f"Not in class: {sorted(pres - cls)}")\nprint(f"Attendance: {len(cls & pres) / len(cls) * 100:.1f}%")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What is len(set([1, 1, 2, 2, 3]))?", options: ["5", "3", "2", "1"], answer: 1, explain: "Duplicates vanish: {1, 2, 3}." },
  { q: "How do you make an empty set?", options: ["{}", "set()", "[]", "()"], answer: 1, explain: "{} is an empty dictionary." },
  { q: "Which gives the items in both a and b?", options: ["a | b", "a & b", "a - b", "a ^ b"], answer: 1, explain: "& is intersection." },
  { q: "Why is x in big_set faster than x in big_list?", options: ["It isn't", "A set jumps straight to where x would be (hashing); a list checks item by item", "Sets are sorted", "Lists are slower to create"], answer: 1, explain: "That's why the seen-set pattern scales to millions of items." },
  { q: "Can you write my_set[0]?", options: ["Yes, the first item", "No — sets have no order, so no indexes", "Only for numbers", "Yes, the smallest item"], answer: 1, explain: "Use sorted(my_set) if you need an order." },
];

export default function Unit7_5(props) {
  const sections = [
    {
      label: "Unique", kicker: "NO DUPLICATES", title: "A set keeps each value once",
      blocks: [
        <P>A <strong>set</strong> is a bag of unique values: no duplicates, no order, and lightning-fast <code>in</code> checks. Making a set from a list is a one-step way to remove repeats.</P>,
        EX.dedupe,
        EX.distinct,
        EX.emptyset,
      ],
    },
    {
      label: "Set Maths", kicker: "| & - ^", title: "Union, intersection, difference",
      blocks: [<P>Compare two groups in one operator instead of a nested loop. Click each:</P>, <SetOps />, EX.ops, EX.common],
    },
    {
      label: "Seen Set", kicker: "A CLASSIC PATTERN", title: "Have I seen this before?",
      blocks: [EX.firstdup, <KeyIdea>Choose by the question: order and repeats matter → list; a fixed record → tuple; look up by key → dict; uniqueness and fast “is it in?” → set.</KeyIdea>],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: attendance checker",
      blocks: [<P>Three set operations answer three questions about the same two lists.</P>, EX.attendance],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit7_5" crumb="MODULE 7 › UNIT 7.6" title="Sets" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 7.7 — Capstone: Student Marks Manager", text: "Lists, tuples, dicts and loops in one real records program." }} />
  );
}
