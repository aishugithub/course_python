// Unit 7.2 — Lists (rebuilt on the typing-first lesson kit)
// Why lists → index/len → changing lists (append insert remove pop extend
// index count in) → loops over lists → ALIASING vs copy (name tags, Unit 4.2)
// → 2-D lists → seat-booking make-task (a preview of mini-project track C).

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, MONO, tint } from "../kit/theme.js";

const pyList = (a) => "[" + a.map((x) => (typeof x === "string" ? `'${x}'` : String(x))).join(", ") + "]";

// ── Widget: a live list you can change ──
const OPS = [
  { code: "marks.append(50)", f: (m) => [[...m, 50], null] },
  { code: "marks.insert(0, 99)", f: (m) => [[99, ...m], null] },
  { code: "marks[1] = 77", f: (m) => (m.length > 1 ? [[m[0], 77, ...m.slice(2)], null] : [m, "IndexError: list assignment index out of range"]) },
  { code: "marks.remove(85)", f: (m) => (m.includes(85) ? [(() => { const c = [...m]; c.splice(c.indexOf(85), 1); return c; })(), null] : [m, "ValueError: list.remove(x): x not in list"]) },
  { code: "marks.pop()", f: (m) => (m.length ? [m.slice(0, -1), `→ returns ${m[m.length - 1]}`] : [m, "IndexError: pop from empty list"]) },
  { code: "marks.extend([60, 70])", f: (m) => [[...m, 60, 70], null] },
];
function ListLab() {
  const start = [72, 85, 64];
  const [m, setM] = useState(start);
  const [log, setLog] = useState([]);
  const run = (op) => { const [next, note] = op.f(m); setM(next); setLog([...log, { code: op.code, note }].slice(-5)); };
  return (
    <div className="fh-two">
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {OPS.map((op) => <button key={op.code} onClick={() => run(op)} style={{ fontFamily: CODE_FONT, fontSize: 13.5, padding: "7px 10px", borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.card, cursor: "pointer" }}>{op.code}</button>)}
          <button onClick={() => { setM(start); setLog([]); }} style={{ fontSize: 13, padding: "7px 10px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.surface, cursor: "pointer", fontFamily: "inherit" }}>↺ reset</button>
        </div>
        <div style={{ marginTop: 10, fontFamily: CODE_FONT, fontSize: 13.5, color: T.slate }}>
          {log.map((l, i) => <div key={i}>&gt;&gt;&gt; {l.code}{l.note && <span style={{ color: l.note.startsWith("→") ? T.blue : T.red }}>  {l.note}</span>}</div>)}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.3, color: T.bronze, marginBottom: 6 }}>marks — len {m.length}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {m.map((v, i) => (
            <div key={i} style={{ textAlign: "center", minWidth: 50 }}>
              <div style={{ fontFamily: CODE_FONT, fontSize: 11, color: T.blue }}>{i}</div>
              <div style={{ border: `1.5px solid ${T.teal}`, background: tint(T.teal, "12"), borderRadius: 8, padding: "10px 4px", fontFamily: CODE_FONT, fontWeight: 700, fontSize: 17 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 14, marginTop: 8 }}>print(marks) → {pyList(m)}</div>
      </div>
    </div>
  );
}

// ── Widget: two tags on one list ──
function AliasDemo() {
  const STEPS = [
    { code: "a = [1, 2, 3]", lists: { L1: [1, 2, 3] }, tags: { a: "L1" }, note: "One list in memory, one tag a on it." },
    { code: "b = a", lists: { L1: [1, 2, 3] }, tags: { a: "L1", b: "L1" }, note: "No copy! b is a second tag on the SAME list (Unit 4.2: = ties a name to a value)." },
    { code: "b.append(4)", lists: { L1: [1, 2, 3, 4] }, tags: { a: "L1", b: "L1" }, note: "append changes the list itself. Both tags are on it, so print(a) shows 4 too." },
    { code: "c = a.copy()", lists: { L1: [1, 2, 3, 4], L2: [1, 2, 3, 4] }, tags: { a: "L1", b: "L1", c: "L2" }, note: ".copy() builds a brand-new list with the same items. c is on the new one." },
    { code: "c.append(5)", lists: { L1: [1, 2, 3, 4], L2: [1, 2, 3, 4, 5] }, tags: { a: "L1", b: "L1", c: "L2" }, note: "Only the copy changes. a and b are untouched." },
  ];
  const [i, setI] = useState(0);
  const s = STEPS[i];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {STEPS.map((st, k) => <button key={k} onClick={() => setI(k)} style={{ fontFamily: CODE_FONT, fontSize: 13.5, padding: "6px 10px", borderRadius: 7, cursor: "pointer", border: `1.5px solid ${k === i ? T.navy : T.border}`, background: k === i ? T.navy : T.card, color: k === i ? "#fff" : T.text }}>{k + 1}. {st.code}</button>)}
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {Object.entries(s.lists).map(([id, arr]) => (
          <div key={id}>
            <div style={{ display: "flex", gap: 4, marginBottom: 4, minHeight: 26 }}>
              {Object.entries(s.tags).filter(([, l]) => l === id).map(([n]) => <span key={n} style={{ fontFamily: CODE_FONT, fontWeight: 700, color: "#fff", background: n === "c" ? T.orange : n === "b" ? T.purple : T.blue, borderRadius: 6, padding: "2px 8px" }}>🏷 {n}</span>)}
            </div>
            <div style={{ display: "flex", gap: 3, border: `1.5px solid ${T.teal}`, borderRadius: 10, padding: 6, background: tint(T.teal, "0C") }}>
              {arr.map((v, k) => <div key={k} style={{ width: 36, textAlign: "center", fontFamily: CODE_FONT, fontWeight: 700, padding: "6px 0", background: T.card, borderRadius: 6 }}>{v}</div>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, background: tint(T.purple, "10"), border: `1px solid ${tint(T.purple, "44")}`, borderRadius: 10, padding: "10px 14px", fontSize: 14.5, color: T.slate }}>{s.note}</div>
    </div>
  );
}

// ── Exercise specs ──
const seatsRun = (inputs) => {
  const seats = Array(10).fill(false); const out = [];
  for (const s of inputs) {
    out.push(`Seat: ${s}`); const n = Number(s);
    if (n === 0) break;
    if (n < 1 || n > 10) out.push("No such seat");
    else if (seats[n - 1]) out.push(`Seat ${n} is taken`);
    else { seats[n - 1] = true; out.push(`Booked ${n}`); }
  }
  const booked = seats.map((b, i) => (b ? i + 1 : null)).filter((x) => x !== null);
  out.push(`Booked seats: ${pyList(booked)}`, `Free: ${10 - booked.length}`);
  return out.join("\n");
};
const EX = {
  make: {
    id: "make", kind: "type", title: "Your first list",
    task: <>Square brackets, items separated by commas. Indexing and <code>len</code> work just as with strings.</>,
    show: "marks = [72, 85, 64, 90]\nprint(marks)\nprint(marks[0], marks[-1])\nprint(len(marks))\nprint(marks[1:3])",
    tests: [{ expect: "[72, 85, 64, 90]\n72 90\n4\n[85, 64]" }],
    hints: ["A slice of a list is a list."],
    solution: "marks = [72, 85, 64, 90]\nprint(marks)\nprint(marks[0], marks[-1])\nprint(len(marks))\nprint(marks[1:3])",
  },
  methods: {
    id: "methods", kind: "type", title: "Changing a list",
    task: <>Trace each line on paper first — the list changes after every line. The last line has a surprise.</>,
    show: 'marks = [72, 85, 64]\nmarks.append(90)\nmarks.insert(0, 55)\nmarks[2] = 88\nmarks.remove(64)\nlast = marks.pop()\nprint(marks)\nprint("Popped:", last)\nprint(85 in marks, marks.index(88), marks.count(72))',
    minLines: 10,
    tests: [{ expect: "[55, 72, 88]\nPopped: 90\nFalse 2 1" }],
    hints: ["After insert(0, 55) the list is [55, 72, 85, 64, 90] — so marks[2] = 88 replaces 85."],
    solution: 'marks = [72, 85, 64]\nmarks.append(90)\nmarks.insert(0, 55)\nmarks[2] = 88\nmarks.remove(64)\nlast = marks.pop()\nprint(marks)\nprint("Popped:", last)\nprint(85 in marks, marks.index(88), marks.count(72))',
  },
  shopping: {
    id: "shopping", kind: "write", title: "Shopping list",
    task: <>Start with an empty list <code>items = []</code>. Keep asking <code>Item: </code> and append each answer, until the user types <code>done</code>. Then print <code>You need 3 items: ['milk', 'bread', 'eggs']</code>.</>,
    tests: [
      { inputs: ["milk", "bread", "eggs", "done"], expect: "Item: milk\nItem: bread\nItem: eggs\nItem: done\nYou need 3 items: ['milk', 'bread', 'eggs']" },
      { inputs: ["done"], expect: "Item: done\nYou need 0 items: []", hidden: true },
      { inputs: ["rice", "done"], expect: "Item: rice\nItem: done\nYou need 1 items: ['rice']", hidden: true },
    ],
    requires: [{ call: "append" }, { node: "While" }],
    hints: ["A sentinel loop, like Unit 6.1's “add until 0”.", 'while item != "done": items.append(item); item = input("Item: ")', 'print(f"You need {len(items)} items: {items}")'],
    solution: 'items = []\nitem = input("Item: ")\nwhile item != "done":\n    items.append(item)\n    item = input("Item: ")\nprint(f"You need {len(items)} items: {items}")',
  },
  none: {
    id: "none", kind: "fix", title: "Where did my list go?",
    task: <>Run it. The list vanished and turned into <code>None</code>. Fix line 2.</>,
    starter: "marks = [70, 80]\nmarks = marks.append(90)\nprint(marks)",
    tests: [{ expect: "[70, 80, 90]" }],
    hints: ["append changes the list in place and returns None. Storing its result replaces your list with None.", "Just write marks.append(90) on its own."],
    solution: "marks = [70, 80]\nmarks.append(90)\nprint(marks)",
  },
  loop: {
    id: "loop", kind: "write", title: "Loop over a list",
    task: <>Given <code>marks = [72, 85, 64, 90]</code>, use <code>for m in marks:</code> to work out the average and how many marks are above 75. Print <code>Average: 77.75</code> and <code>Above 75: 2</code>. (No sum( ) yet — that's next unit.)</>,
    tests: [{ expect: "Average: 77.75\nAbove 75: 2" }],
    requires: [{ node: "For" }],
    forbids: [{ call: "sum", msg: "Add them up with the loop — sum( ) comes in Unit 7.3." }, { text: "77.75", msg: "Let Python calculate it." }],
    hints: ["total = 0 and count = 0 before the loop.", "Average: total / len(marks)"],
    solution: 'marks = [72, 85, 64, 90]\ntotal = 0\nabove = 0\nfor m in marks:\n    total += m\n    if m > 75:\n        above += 1\nprint(f"Average: {total / len(marks)}")\nprint(f"Above 75: {above}")',
  },
  alias: {
    id: "alias", kind: "type", title: "Two tags, one list",
    task: <>The stepper above, as real code. Predict all three lines before running.</>,
    show: "a = [1, 2, 3]\nb = a\nb.append(4)\nc = a.copy()\nc.append(5)\nprint(a)\nprint(b)\nprint(c)",
    tests: [{ expect: "[1, 2, 3, 4]\n[1, 2, 3, 4]\n[1, 2, 3, 4, 5]" }],
    hints: ["b = a does NOT copy; .copy() does."],
    solution: "a = [1, 2, 3]\nb = a\nb.append(4)\nc = a.copy()\nc.append(5)\nprint(a)\nprint(b)\nprint(c)",
  },
  backup: {
    id: "backup", kind: "fix", title: "The backup that wasn't",
    task: <>The teacher keeps a backup before correcting a mark. Run it: the backup changed too. Fix it so the backup keeps the original marks.</>,
    starter: 'marks = [70, 80, 90]\nbackup = marks\nmarks[0] = 0\nprint("Marks:", marks)\nprint("Backup:", backup)',
    tests: [{ expect: "Marks: [0, 80, 90]\nBackup: [70, 80, 90]" }],
    hints: ["backup = marks puts a second tag on the same list.", "backup = marks.copy()"],
    solution: 'marks = [70, 80, 90]\nbackup = marks.copy()\nmarks[0] = 0\nprint("Marks:", marks)\nprint("Backup:", backup)',
  },
  grid: {
    id: "grid", kind: "write", title: "A list of lists",
    task: <>Each inner list is one student's marks in two subjects: <code>marks = [[70, 80], [65, 90], [88, 72]]</code>. <code>marks[1][0]</code> is student 2's first subject. Loop over the students and print <code>Student 1: 150</code>, <code>Student 2: 155</code>, <code>Student 3: 160</code>.</>,
    tests: [{ expect: "Student 1: 150\nStudent 2: 155\nStudent 3: 160" }],
    requires: [{ node: "For" }],
    forbids: [{ text: "150", msg: "Let Python add them." }],
    hints: ["for i in range(len(marks)): — then marks[i][0] + marks[i][1]", "Student numbers are i + 1."],
    solution: 'marks = [[70, 80], [65, 90], [88, 72]]\nfor i in range(len(marks)):\n    total = marks[i][0] + marks[i][1]\n    print(f"Student {i + 1}: {total}")',
  },
  seats: {
    id: "seats", kind: "make", title: "Seat booking",
    task: <>A small hall has 10 seats. <code>seats = [False] * 10</code> makes a list of ten False values (False = free). Keep asking <code>Seat: </code> until 0. For 1–10: if free, mark it True and print <code>Booked 3</code>; if taken print <code>Seat 3 is taken</code>; anything else prints <code>No such seat</code>. Finally print <code>Booked seats: [3, 5]</code> (seat numbers, in order) and <code>Free: 8</code>. Seat 1 is at index 0!</>,
    minLines: 18,
    tests: [
      { inputs: ["3", "5", "3", "0"], expect: seatsRun(["3", "5", "3", "0"]) },
      { inputs: ["10", "1", "11", "0"], expect: seatsRun(["10", "1", "11", "0"]), hidden: true },
      { inputs: ["0"], expect: seatsRun(["0"]), hidden: true },
    ],
    requires: [{ node: "While" }],
    hints: ["Seat n lives at index n - 1.", "Build the booked list at the end: for i in range(10): if seats[i]: booked.append(i + 1)", "Free = 10 - len(booked)."],
    solution: 'seats = [False] * 10\nn = int(input("Seat: "))\nwhile n != 0:\n    if n < 1 or n > 10:\n        print("No such seat")\n    elif seats[n - 1]:\n        print(f"Seat {n} is taken")\n    else:\n        seats[n - 1] = True\n        print(f"Booked {n}")\n    n = int(input("Seat: "))\nbooked = []\nfor i in range(10):\n    if seats[i]:\n        booked.append(i + 1)\nprint(f"Booked seats: {booked}")\nprint(f"Free: {10 - len(booked)}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "marks = [10, 20, 30]. After marks[0] = 99, what is marks?", options: ["[10, 20, 30]", "[99, 20, 30]", "TypeError", "[99]"], answer: 1, explain: "Lists are mutable: you can replace an item in place. (Strings can't — Unit 7.1.)" },
  { q: "What does [10, 15, 20, 25][1:3] give?", options: ["[10, 15]", "[15, 20]", "[15, 20, 25]", "[20]"], answer: 1, explain: "Index 1 included, 3 excluded." },
  { q: "What is printed?", code: "a = [1, 2]\nb = a\nb.append(3)\nprint(a)", options: ["[1, 2]", "[1, 2, 3]", "[3]", "Error"], answer: 1, explain: "b = a is a second tag on the same list, so a sees the change." },
  { q: "How do you make an independent copy of list x?", options: ["y = x", "y = x.copy()", "y == x", "copy(y, x)"], answer: 1, explain: ".copy() (or x[:]) makes a new list with the same items." },
  { q: "What does marks = marks.append(5) leave in marks?", options: ["The list with 5 added", "None", "5", "Error"], answer: 1, explain: "append returns None. Call it on its own line." },
  { q: "grid = [[1, 2], [3, 4]]. What is grid[1][0]?", options: ["1", "2", "3", "4"], answer: 2, explain: "grid[1] is [3, 4]; its index 0 is 3." },
];

export default function Unit7_2(props) {
  const sections = [
    {
      label: "Why Lists?", kicker: "ONE NAME, MANY VALUES", title: "A list holds many values under one name",
      blocks: [
        <P>Sixty students' marks in sixty variables — <code>m1</code>, <code>m2</code>, … <code>m60</code> — and no loop could walk through them. A <strong>list</strong> keeps them all in one row of slots, under one name.</P>,
        EX.make,
      ],
    },
    {
      label: "Change It", kicker: "MUTABLE", title: "Lists can change",
      blocks: [
        <P>Unlike strings, lists are <strong>mutable</strong>: you can replace, add and remove items in place. Click the operations and watch the slots:</P>,
        <ListLab />,
        EX.methods,
        EX.shopping,
        EX.none,
        <KeyIdea>Methods that change a list (<code>append</code>, <code>insert</code>, <code>remove</code>, <code>sort</code>…) change it in place and return <code>None</code>. <code>pop()</code> is the exception: it also hands back the removed item.</KeyIdea>,
      ],
    },
    {
      label: "Loop a List", kicker: "for item in list", title: "Walking through a list",
      blocks: [<P><code>for m in marks:</code> gives you each item in turn — no index needed. Use <code>for i in range(len(marks))</code> only when you also need the position.</P>, EX.loop],
    },
    {
      label: "Copy or Alias?", kicker: "NAME TAGS AGAIN", title: "b = a doesn't copy",
      blocks: [
        <P>Remember Unit 4.2: <code>=</code> ties a name to a value. With a list, two names can end up on the <em>same</em> list — and since lists can change, a change through one name shows up through the other. Step through:</P>,
        <AliasDemo />,
        EX.alias,
        EX.backup,
        <KeyIdea><code>x = 5</code> moves a tag. <code>a.append(4)</code> or <code>a[0] = 9</code> changes the list itself — every tag on that list sees it. Need an independent list? <code>a.copy()</code>.</KeyIdea>,
      ],
    },
    {
      label: "2-D Lists", kicker: "TABLES", title: "Lists inside lists",
      blocks: [<P>A list can hold lists: a table of rows. <code>table[row][col]</code> picks one cell — you'll use this a lot in Computational Thinking II (matrices).</P>, EX.grid],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: seat booking",
      blocks: [
        <P>A list that changes as people book, a while loop, if/elif/else, and index arithmetic. (This is the heart of mini-project Track C, Event Seat Booking.)</P>,
        EX.seats,
      ],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit7_2" crumb="MODULE 7 › UNIT 7.2" title="Lists" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 7.3 — List Methods & Loop Patterns", text: "sum, min, max, sorted, split and join — and the classic best-so-far pattern." }} />
  );
}
