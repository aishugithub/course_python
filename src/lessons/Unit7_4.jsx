// Unit 7.4 — Tuples (rebuilt as its own unit in the typing-first redesign;
// dictionaries moved to Unit7_4D). Locked records, (5,), packing/unpacking,
// a, b = b, a, divmod, lists of tuples, enumerate(), zip(), merit list.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const codeBox = { margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre-wrap" };

// ── Widget: the same bug on a list and on a tuple ──
function LockedRecord() {
  const [kind, setKind] = useState("list");
  const isList = kind === "list";
  return (
    <div className="fh-two">
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          {["list", "tuple"].map((k) => <button key={k} onClick={() => setKind(k)} style={{ padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, border: `1.5px solid ${kind === k ? T.navy : T.border}`, background: kind === k ? T.navy : T.card, color: kind === k ? "#fff" : T.text }}>as a {k} {k === "list" ? "[ ]" : "( )"}</button>)}
        </div>
        <pre style={codeBox}>{isList ? "dob = [14, 11, 2006]   # birthday\n...\ndob[0] = 25            # a bug, 300 lines later\nprint(dob)" : "dob = (14, 11, 2006)   # birthday\n...\ndob[0] = 25            # the same bug\nprint(dob)"}</pre>
      </div>
      <div>
        <pre style={{ ...codeBox, background: T.termBg, color: isList ? T.termText : T.termErr }}>{isList ? "[25, 11, 2006]" : "TypeError: 'tuple' object does not\nsupport item assignment"}</pre>
        <div style={{ fontSize: 14.5, color: isList ? T.red : T.green, marginTop: 8, lineHeight: 1.6 }}>
          {isList ? "No error. Someone's birthday silently changed — and you'll find out weeks later." : "The tuple refuses, loudly, at the exact line. For data that must never change, that lock is a feature."}
        </div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const pairs = (names, marks) => names.map((n, i) => `${n}: ${marks[i]}`).join("\n");
const merit = (nl, ml) => {
  const n = nl.split(" "), m = ml.split(" ").map(Number);
  const out = [`Names: ${nl}`, `Marks: ${ml}`];
  n.forEach((x, i) => out.push(`${i + 1}. ${x} - ${m[i]}`));
  let b = 0; m.forEach((v, i) => { if (v > m[b]) b = i; });
  out.push(`Topper: ${n[b]} (${m[b]})`);
  out.push(`Class average: ${(m.reduce((a, c) => a + c, 0) / m.length).toFixed(1)}`);
  return out.join("\n");
};
const EX = {
  basics: {
    id: "basics", kind: "type", title: "Making tuples",
    task: <>Round brackets, commas between items. A tuple with <strong>one</strong> item needs a trailing comma — brackets alone are just maths brackets.</>,
    show: "dob = (14, 11, 2006)\nprint(dob[0], dob[-1], len(dob))\none = (5,)\nnot_tuple = (5)\nprint(type(one))\nprint(type(not_tuple))\nprint(dob.count(11), dob.index(2006))",
    minLines: 8,
    tests: [{ expect: "14 2006 3\n<class 'tuple'>\n<class 'int'>\n1 2" }],
    hints: ["(5) is just 5 in brackets. (5,) is a tuple holding 5."],
    solution: "dob = (14, 11, 2006)\nprint(dob[0], dob[-1], len(dob))\none = (5,)\nnot_tuple = (5)\nprint(type(one))\nprint(type(not_tuple))\nprint(dob.count(11), dob.index(2006))",
  },
  locked: {
    id: "locked", kind: "fix", title: "Correcting a locked record",
    task: <>The year in this record is wrong; it should be 2007. You can't change a tuple in place — run it and see. Make a <strong>new</strong> tuple with the corrected year (keep the variable name <code>dob</code>).</>,
    starter: "dob = (14, 11, 2006)\ndob[2] = 2007\nprint(dob)",
    tests: [{ expect: "(14, 11, 2007)" }],
    hints: ["Build a new tuple from the old one: (dob[0], dob[1], 2007)", "Or join tuples: dob[:2] + (2007,) — note the comma."],
    solution: "dob = (14, 11, 2006)\ndob = (dob[0], dob[1], 2007)\nprint(dob)",
  },
  unpack: {
    id: "unpack", kind: "type", title: "Packing and unpacking",
    task: <>Commas pack values into a tuple; names on the left of <code>=</code> unpack it, one name per item. The last two lines are Python's famous one-line swap.</>,
    show: 'student = ("Priya", "22CS1042", 8.7)\nname, roll, cgpa = student\nprint(name)\nprint(f"{roll}: {cgpa}")\na, b = 1, 2\na, b = b, a\nprint(a, b)',
    tests: [{ expect: "Priya\n22CS1042: 8.7\n2 1" }],
    hints: ["a, b = b, a: the right side is packed into a tuple FIRST, then unpacked into a and b."],
    solution: 'student = ("Priya", "22CS1042", 8.7)\nname, roll, cgpa = student\nprint(name)\nprint(f"{roll}: {cgpa}")\na, b = 1, 2\na, b = b, a\nprint(a, b)',
  },
  swap: {
    id: "swap", kind: "modify", title: "The cups, in one line",
    task: <>In Unit 4.2 you swapped the cups with a third variable. Now replace the three swap lines with one tuple swap.</>,
    starter: 'cup1 = "tea"\ncup2 = "coffee"\ntemp = cup1\ncup1 = cup2\ncup2 = temp\nprint("cup1 has", cup1)\nprint("cup2 has", cup2)',
    tests: [{ expect: "cup1 has coffee\ncup2 has tea" }],
    forbids: [{ name: "temp", msg: "No temp needed any more — swap with cup1, cup2 = cup2, cup1." }],
    hints: ["cup1, cup2 = cup2, cup1"],
    solution: 'cup1 = "tea"\ncup2 = "coffee"\ncup1, cup2 = cup2, cup1\nprint("cup1 has", cup1)\nprint("cup2 has", cup2)',
  },
  toomany: {
    id: "toomany", kind: "fix", title: "Not enough names",
    task: <>Run it and read the coach. Unpack all three items and print them on one line.</>,
    starter: 'student = ("Priya", "22CS1042", 8.7)\nname, roll = student\nprint(name, roll)',
    tests: [{ expect: "Priya 22CS1042 8.7" }],
    hints: ["Three items need three names on the left."],
    solution: 'student = ("Priya", "22CS1042", 8.7)\nname, roll, cgpa = student\nprint(name, roll, cgpa)',
  },
  divmod: {
    id: "divmod", kind: "write", title: "divmod returns a tuple",
    task: <>The built-in <code>divmod(a, b)</code> returns the tuple <code>(a // b, a % b)</code>. Redo Unit 4.4's minutes-to-hours: ask <code>Minutes: </code>, unpack <code>divmod(total, 60)</code> into two names in one line, and print <code>2 hours 5 minutes</code>.</>,
    tests: [{ inputs: ["125"], expect: "Minutes: 125\n2 hours 5 minutes" }, { inputs: ["59"], expect: "Minutes: 59\n0 hours 59 minutes", hidden: true }],
    requires: [{ call: "divmod" }],
    hints: ["hours, mins = divmod(total, 60)"],
    solution: 'total = int(input("Minutes: "))\nhours, mins = divmod(total, 60)\nprint(hours, "hours", mins, "minutes")',
  },
  records: {
    id: "records", kind: "type", title: "A list of tuples",
    task: <>The classic shape for a table of records: a <strong>list</strong> (it can grow) of <strong>tuples</strong> (each record is fixed). Unpack right in the for line.</>,
    show: 'students = [("Priya", 87), ("Arun", 72), ("Meena", 95)]\nstudents.append(("Ravi", 64))\nfor name, mark in students:\n    print(f"{name}: {mark}")',
    tests: [{ expect: "Priya: 87\nArun: 72\nMeena: 95\nRavi: 64" }],
    hints: ["append gets ONE argument: the tuple (\"Ravi\", 64) — mind the double brackets."],
    solution: 'students = [("Priya", 87), ("Arun", 72), ("Meena", 95)]\nstudents.append(("Ravi", 64))\nfor name, mark in students:\n    print(f"{name}: {mark}")',
  },
  enum: {
    id: "enum", kind: "write", title: "enumerate: number the items",
    task: <><code>enumerate(items, start=1)</code> hands you <code>(position, item)</code> tuples. Ask <code>Names: </code> (one line, separated by spaces) and print a numbered list: <code>1. Priya</code>, <code>2. Arun</code>…</>,
    tests: [{ inputs: ["Priya Arun Meena"], expect: "Names: Priya Arun Meena\n1. Priya\n2. Arun\n3. Meena" }, { inputs: ["Ravi"], expect: "Names: Ravi\n1. Ravi", hidden: true }],
    requires: [{ call: "enumerate" }],
    hints: ['for i, name in enumerate(names, start=1): print(f"{i}. {name}")'],
    solution: 'names = input("Names: ").split()\nfor i, name in enumerate(names, start=1):\n    print(f"{i}. {name}")',
  },
  zip: {
    id: "zip", kind: "write", title: "zip: walk two lists together",
    task: <><code>zip(a, b)</code> pairs items up: <code>(a[0], b[0]), (a[1], b[1])</code>… Ask <code>Names: </code> and <code>Marks: </code> (both one line) and print <code>Priya: 87</code> for each pair.</>,
    tests: [
      { inputs: ["Priya Arun Meena", "87 72 95"], expect: "Names: Priya Arun Meena\nMarks: 87 72 95\n" + pairs(["Priya", "Arun", "Meena"], [87, 72, 95]) },
      { inputs: ["Ravi Divya", "64 99"], expect: "Names: Ravi Divya\nMarks: 64 99\n" + pairs(["Ravi", "Divya"], [64, 99]), hidden: true },
    ],
    requires: [{ call: "zip" }],
    hints: ['for name, mark in zip(names, marks): print(f"{name}: {mark}")'],
    solution: 'names = input("Names: ").split()\nmarks = input("Marks: ").split()\nfor name, mark in zip(names, marks):\n    print(f"{name}: {mark}")',
  },
  merit: {
    id: "merit", kind: "make", title: "Merit list",
    task: <>Ask <code>Names: </code> and <code>Marks: </code> (one line each). Build a list of <code>(name, mark)</code> tuples with zip (marks as ints). Print a numbered list <code>1. Priya - 87</code>, then <code>Topper: Meena (95)</code> (best-so-far over the tuples) and <code>Class average: 84.7</code> (1 decimal).</>,
    minLines: 14,
    tests: [
      { inputs: ["Priya Arun Meena", "87 72 95"], expect: merit("Priya Arun Meena", "87 72 95") },
      { inputs: ["Ravi Divya Arun Kavya", "99 64 70 99"], expect: merit("Ravi Divya Arun Kavya", "99 64 70 99"), hidden: true },
    ],
    requires: [{ call: "zip" }, { call: "enumerate" }],
    hints: ["records = [] then for n, m in zip(names, marks): records.append((n, int(m)))", "best = records[0]; for rec in records: if rec[1] > best[1]: best = rec", 'top_name, top_mark = best'],
    solution: 'names = input("Names: ").split()\nmarks = input("Marks: ").split()\nrecords = []\nfor n, m in zip(names, marks):\n    records.append((n, int(m)))\nfor i, (name, mark) in enumerate(records, start=1):\n    print(f"{i}. {name} - {mark}")\nbest = records[0]\ntotal = 0\nfor rec in records:\n    total += rec[1]\n    if rec[1] > best[1]:\n        best = rec\ntop_name, top_mark = best\nprint(f"Topper: {top_name} ({top_mark})")\nprint(f"Class average: {total / len(records):.1f}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Which of these is a tuple?", options: ["(5)", "(5,)", "[5]", "{5}"], answer: 1, explain: "The comma makes the tuple. (5) is just the number 5." },
  { q: "t = (10, 20, 30). What does t[0] = 99 do?", options: ["t becomes (99, 20, 30)", "TypeError", "Nothing", "t becomes (99,)"], answer: 1, explain: "Tuples are immutable. Make a new tuple instead." },
  { q: "After a, b = 3, 7 and then a, b = b, a, what is a?", options: ["3", "7", "(7, 3)", "Error"], answer: 1, explain: "The right side (7, 3) is built first, then unpacked." },
  { q: "x, y = (1, 2, 3) gives…", options: ["x=1, y=2", "x=1, y=(2, 3)", "ValueError: too many values to unpack", "x=(1,2,3)"], answer: 2, explain: "The number of names must match the number of items." },
  { q: "What does list(enumerate([\"a\", \"b\"], start=1)) contain?", options: ["[1, 2]", "[(1, 'a'), (2, 'b')]", "['a', 'b']", "[(0, 'a'), (1, 'b')]"], answer: 1, explain: "enumerate yields (position, item) tuples, starting from start." },
  { q: "When should you choose a tuple over a list?", options: ["Always", "For a fixed record that shouldn't change (a date, coordinates, one student's details)", "For data that grows", "Never"], answer: 1, explain: "Lists for collections that change; tuples for fixed records — often a list of tuples." },
];

export default function Unit7_4(props) {
  const sections = [
    {
      label: "Locked Records", kicker: "WHY TUPLES?", title: "A list with a lock",
      blocks: [
        <P>A birthday, a coordinate, a student's roll number and name — some data must never change once created. A <strong>tuple</strong> is like a list that cannot be changed. Run the same bug on both:</P>,
        <LockedRecord />,
        EX.basics,
        EX.locked,
      ],
    },
    {
      label: "Unpacking", kicker: "ONE LINE, MANY NAMES", title: "Packing and unpacking",
      blocks: [
        <P>Write values with commas and Python <strong>packs</strong> them into a tuple. Put several names on the left of <code>=</code> and Python <strong>unpacks</strong> the tuple into them, item by item.</P>,
        EX.unpack,
        EX.swap,
        EX.toomany,
        EX.divmod,
        <KeyIdea>Unpacking needs exactly one name per item. It's how Python returns several answers at once — <code>divmod</code> now, and your own functions in Module 8.</KeyIdea>,
      ],
    },
    {
      label: "Records & Loops", kicker: "enumerate · zip", title: "Lists of tuples, enumerate and zip",
      blocks: [
        EX.records,
        <P>Two built-ins hand you tuples to unpack in a loop: <code>enumerate</code> adds a position to each item; <code>zip</code> walks two lists side by side.</P>,
        EX.enum,
        EX.zip,
        <P><strong>Tuple or list?</strong></P>,
        <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", maxWidth: 820 }}>
          {[["", "list [ ]", "tuple ( )"], ["Can change?", "Yes — append, remove, replace", "No — make a new one"], ["Typical use", "A collection that grows: all the marks", "One fixed record: (name, roll, cgpa)"], ["Mistake it prevents", "—", "Accidental changes to fixed data"], ["Together", "A list of tuples: the whole class, one record each", ""]].map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr", gap: 10, padding: "9px 14px", background: i === 0 ? T.deep : i % 2 ? T.surface : T.card, fontWeight: i === 0 ? 700 : 400, fontSize: 14.5 }}>
              {r.map((c, j) => <span key={j}>{c}</span>)}
            </div>
          ))}
        </div>,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: merit list",
      blocks: [<P>split, zip into a list of tuples, enumerate for numbering, best-so-far over records, and unpacking the winner.</P>, EX.merit],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit7_4" crumb="MODULE 7 › UNIT 7.4" title="Tuples" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 7.5 — Dictionaries", text: "Look things up by name, not position — and count anything with a dict." }} />
  );
}
