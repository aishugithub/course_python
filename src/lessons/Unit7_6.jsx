// Unit 7.6 — Capstone: Student Marks Manager (rebuilt on the typing-first lesson
// kit; shown as 7.7). v1 report from two input lines → v2 menu loop (Add /
// Report / Exit) → v3 Search + merit list via sorted (mark, name) tuples →
// Make It: top-3 words. Pass mark is 40, consistent with the rest of the course.

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT } from "../kit/theme.js";

// ── Reference simulators (they produce the expected outputs for the tests) ──
function report(pairs, merit) {
  if (!pairs.length) return ["No students yet"];
  let total = 0, passed = 0, top = pairs[0][0], best = pairs[0][1];
  for (const [n, m] of pairs) { total += m; if (m >= 40) passed++; if (m > best) { best = m; top = n; } }
  const out = [`Students: ${pairs.length}`, `Average: ${(total / pairs.length).toFixed(2)}`, `Topper: ${top} (${best})`, `Passed: ${passed}/${pairs.length}`];
  if (merit) {
    const ranked = pairs.map(([n, m]) => [m, n]).sort((a, b) => b[0] - a[0] || (a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0));
    out.push("Merit list:");
    ranked.slice(0, 3).forEach(([m, n], i) => out.push(`${i + 1}. ${n} - ${m}`));
  }
  return out;
}
function v1(names, marks) {
  const n = names.split(" "), m = marks.split(" ").map(Number);
  return [`Names: ${names}`, `Marks: ${marks}`, ...report(n.map((x, i) => [x, m[i]]), false)].join("\n");
}
function menu(version, inputs) {
  const q = [...inputs], out = [], data = [];
  const ask = (p) => { const v = q.shift(); out.push(p + v); return v; };
  const MENU = version === 3 ? "1. Add  2. Report  3. Search  4. Exit" : "1. Add  2. Report  3. Exit";
  for (;;) {
    out.push(MENU);
    const c = ask("Choose: ");
    if (c === "1") {
      const name = ask("Name: ").trim().toUpperCase();
      const mark = Number(ask("Mark: "));
      const at = data.findIndex(([k]) => k === name);
      if (at >= 0) { data[at][1] = mark; out.push(`Updated ${name}`); } else { data.push([name, mark]); out.push(`Added ${name}`); }
    } else if (c === "2") out.push(...report(data, version === 3));
    else if (version === 3 && c === "3") {
      const name = ask("Search: ").trim().toUpperCase();
      const hit = data.find(([k]) => k === name);
      out.push(hit ? `${name}: ${hit[1]}` : "Not found");
    } else if (c === (version === 3 ? "4" : "3")) { out.push("Bye!"); break; }
    else out.push("Invalid choice");
  }
  return out.join("\n");
}
function topWords(sentence) {
  const c = new Map();
  sentence.toLowerCase().split(/\s+/).filter(Boolean).forEach((w) => c.set(w, (c.get(w) || 0) + 1));
  const ranked = [...c.entries()].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  return [`Text: ${sentence}`, ...ranked.slice(0, 3).map(([w, n], i) => `${i + 1}. ${w} (${n})`)].join("\n");
}

// ── Mission table ──
function Mission() {
  const rows = [
    ["Store each student's mark by name", "dictionary", "7.5"],
    ["Read names and marks from one line each", "split, zip", "7.3, 7.4"],
    ["Average, topper, pass count", "sum/len, best-so-far, count", "6.2, 7.3"],
    ["Keep the program running with a menu", "while True + break", "6.3"],
    ["Search without crashing", "in / .get", "7.5"],
    ["Merit list, highest first", "sorted list of (mark, name) tuples", "7.3, 7.4"],
  ];
  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", maxWidth: 940 }}>
      {rows.map(([need, tool, unit], i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1.7fr 1.7fr 0.8fr", gap: 10, padding: "10px 14px", background: i % 2 ? T.surface : T.card, fontSize: 14.5 }}>
          <span>{need}</span><code style={{ justifySelf: "start" }}>{tool}</code><span style={{ color: T.bronze, fontWeight: 700 }}>{unit}</span>
        </div>
      ))}
    </div>
  );
}

// ── Exercise specs ──
const REPORT_V1 = 'if marks:\n    total = 0\n    passed = 0\n    top = ""\n    best = -1\n    for name, mark in marks.items():\n        total += mark\n        if mark >= 40:\n            passed += 1\n        if mark > best:\n            best = mark\n            top = name\n    print(f"Students: {len(marks)}")\n    print(f"Average: {total / len(marks):.2f}")\n    print(f"Topper: {top} ({best})")\n    print(f"Passed: {passed}/{len(marks)}")\nelse:\n    print("No students yet")';
const indent = (code, n) => code.split("\n").map((l) => " ".repeat(n) + l).join("\n");
const V1 = 'names = input("Names: ").split()\nmarks_line = input("Marks: ").split()\nmarks = {}\nfor name, m in zip(names, marks_line):\n    marks[name] = int(m)\n' + REPORT_V1;
const ADD = '        name = input("Name: ").strip().upper()\n        mark = int(input("Mark: "))\n        if name in marks:\n            print(f"Updated {name}")\n        else:\n            print(f"Added {name}")\n        marks[name] = mark';
const V2 = 'marks = {}\nwhile True:\n    print("1. Add  2. Report  3. Exit")\n    choice = input("Choose: ")\n    if choice == "1":\n' + ADD + '\n    elif choice == "2":\n' + indent(REPORT_V1, 8) + '\n    elif choice == "3":\n        print("Bye!")\n        break\n    else:\n        print("Invalid choice")';
const MERIT = '    ranked = []\n    for name, mark in marks.items():\n        ranked.append((mark, name))\n    ranked = sorted(ranked, reverse=True)\n    print("Merit list:")\n    for i, (mark, name) in enumerate(ranked[:3], start=1):\n        print(f"{i}. {name} - {mark}")';
const REPORT_V3 = REPORT_V1.replace('    print(f"Passed: {passed}/{len(marks)}")', '    print(f"Passed: {passed}/{len(marks)}")\n' + MERIT);
const V3 = 'marks = {}\nwhile True:\n    print("1. Add  2. Report  3. Search  4. Exit")\n    choice = input("Choose: ")\n    if choice == "1":\n' + ADD + '\n    elif choice == "2":\n' + indent(REPORT_V3, 8) + '\n    elif choice == "3":\n        name = input("Search: ").strip().upper()\n        if name in marks:\n            print(f"{name}: {marks[name]}")\n        else:\n            print("Not found")\n    elif choice == "4":\n        print("Bye!")\n        break\n    else:\n        print("Invalid choice")';

const S2a = ["2", "1", "priya", "87", "1", "Arun", "35", "1", "PRIYA", "90", "2", "9", "3"];
const S2b = ["1", "meena", "91", "1", "ravi", "64", "2", "3"];
const S3a = ["1", "priya", "87", "1", "arun", "35", "1", "meena", "91", "1", "ravi", "87", "2", "3", "Arun", "3", "kavya", "4"];
const S3b = ["2", "3", "x", "1", "divya", "77", "2", "4"];

const EX = {
  v1: {
    id: "v1", kind: "write", title: "Version 1 — the report",
    task: <>Ask <code>Names: </code> and <code>Marks: </code> (one line each). Build a dictionary <code>marks</code> (name → int mark) with zip. Print <code>Students: 4</code>, <code>Average: 69.50</code>, <code>Topper: MEENA (91)</code> (the first highest wins ties) and <code>Passed: 3/4</code> (pass mark 40). If there are no students print <code>No students yet</code> — you'll need it in Version 2.</>,
    minLines: 20,
    tests: [
      { inputs: ["PRIYA ARUN MEENA RAVI", "87 62 91 38"], expect: v1("PRIYA ARUN MEENA RAVI", "87 62 91 38") },
      { inputs: ["A B", "40 39"], expect: v1("A B", "40 39"), hidden: true },
      { inputs: ["X Y Z", "70 99 99"], expect: v1("X Y Z", "70 99 99"), hidden: true },
    ],
    requires: [{ call: "zip" }, { call: "items" }],
    hints: ["for name, m in zip(names, marks_line): marks[name] = int(m)", "One loop over marks.items() can do the total, the pass count and the best-so-far.", "Put the whole report under if marks: … else: print(\"No students yet\")"],
    solution: V1,
  },
  v2: {
    id: "v2", kind: "modify", title: "Version 2 — a menu that keeps running",
    task: <>Replace the two input lines with a menu: start with <code>marks = {"{}"}</code>; loop forever printing <code>1. Add  2. Report  3. Exit</code> (two spaces between options) and asking <code>Choose: </code>. <strong>1</strong>: ask <code>Name: </code> (strip + upper) and <code>Mark: </code>; print <code>Added PRIYA</code>, or <code>Updated PRIYA</code> if the name already exists. <strong>2</strong>: the report. <strong>3</strong>: print <code>Bye!</code> and stop. Anything else: <code>Invalid choice</code>.</>,
    starter: V1,
    minLines: 34,
    tests: [
      { inputs: S2a, expect: menu(2, S2a) },
      { inputs: S2b, expect: menu(2, S2b), hidden: true },
    ],
    requires: [{ node: "While" }, { node: "Break" }],
    hints: ["Select the report lines and press Tab twice — they go under elif choice == \"2\":", "if name in marks: print(f\"Updated {name}\") else: print(f\"Added {name}\") — then marks[name] = mark either way."],
    solution: V2,
  },
  v3: {
    id: "v3", kind: "modify", title: "Version 3 — search and a merit list",
    task: <>Two upgrades. A new option <strong>3</strong> asks <code>Search: </code> (strip + upper) and prints <code>ARUN: 35</code> or <code>Not found</code>; Exit becomes <strong>4</strong> (the menu line is now <code>1. Add  2. Report  3. Search  4. Exit</code>). And the report ends with <code>Merit list:</code> and the top 3 as <code>1. MEENA - 91</code>. Trick: put <code>(mark, name)</code> tuples in a list — <code>sorted(…, reverse=True)</code> sorts by mark first.</>,
    starter: V2,
    minLines: 44,
    tests: [
      { inputs: S3a, expect: menu(3, S3a) },
      { inputs: S3b, expect: menu(3, S3b), hidden: true },
    ],
    requires: [{ call: "sorted" }, { call: "enumerate" }],
    hints: ["Tuples compare item by item: (91, 'MEENA') > (87, 'RAVI'). Equal marks are then ordered by name.", "for i, (mark, name) in enumerate(ranked[:3], start=1):", "ranked[:3] is safe even with fewer than 3 students."],
    solution: V3,
  },
  words: {
    id: "words", kind: "make", title: "Top 3 words",
    task: <>Ask <code>Text: </code>. Count each word (lowercase) with a dictionary, then print the three most frequent as <code>1. the (3)</code> — most frequent first, ties in alphabetical order. Trick: sort <code>(-count, word)</code> tuples in normal order.</>,
    minLines: 9,
    tests: [
      { inputs: ["the cat and the dog and the bird"], expect: topWords("the cat and the dog and the bird") },
      { inputs: ["b a b a c"], expect: topWords("b a b a c"), hidden: true },
      { inputs: ["One"], expect: topWords("One"), hidden: true },
    ],
    requires: [{ call: "get" }, { call: "sorted" }],
    hints: ["counts[w] = counts.get(w, 0) + 1", "ranked = sorted of (-n, w) tuples — negative counts make the biggest count come first.", "for i, (neg, w) in enumerate(ranked[:3], start=1): print(f\"{i}. {w} ({-neg})\")"],
    solution: 'counts = {}\nfor w in input("Text: ").lower().split():\n    counts[w] = counts.get(w, 0) + 1\nranked = []\nfor w, n in counts.items():\n    ranked.append((-n, w))\nranked = sorted(ranked)\nfor i, (neg, w) in enumerate(ranked[:3], start=1):\n    print(f"{i}. {w} ({-neg})")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why does the Marks Manager use a dictionary instead of two lists?", options: ["It's faster to type", "Each mark stays attached to its name; lookup by name needs no searching", "Lists can't hold names", "Dictionaries are sorted"], answer: 1, explain: "Parallel lists can drift out of line; a dict keeps the pair together." },
  { q: "Adding PRIYA a second time…", options: ["Creates a second PRIYA", "Overwrites her mark (keys are unique)", "Crashes", "Is ignored"], answer: 1, explain: "That's why the program prints Updated." },
  { q: "sorted([(87, 'RAVI'), (91, 'MEENA'), (87, 'PRIYA')], reverse=True) starts with…", options: ["(87, 'RAVI')", "(91, 'MEENA')", "(87, 'PRIYA')", "Error"], answer: 1, explain: "Tuples compare the first item first: 91 is biggest." },
  { q: "What stops the menu loop?", options: ["The condition becoming False", "break after printing Bye!", "Ctrl+C only", "Report"], answer: 1, explain: "while True only ends with break." },
  { q: "Why ranked[:3] rather than ranked[0], ranked[1], ranked[2]?", options: ["Style only", "A slice never crashes, even with fewer than 3 students", "It's faster", "It sorts"], answer: 1, explain: "Indexing past the end is an IndexError; slicing just returns what's there." },
];

export default function Unit7_6(props) {
  const sections = [
    {
      label: "The Mission", kicker: "CAPSTONE", title: "Student Marks Manager",
      blocks: [
        <P>A teacher wants a small program to enter marks and get a class report. You'll build it in three versions — each one working before the next begins. Everything you need:</P>,
        <Mission />,
        <Note color={T.blue} icon="🧱">The pass mark is 40 throughout the course. Names are stored in capitals so “priya” and “PRIYA” are the same student.</Note>,
      ],
    },
    { label: "Version 1", kicker: "BUILD IN STEPS", title: "Version 1: the report", blocks: [EX.v1] },
    { label: "Version 2", kicker: "ADD ONE IDEA", title: "Version 2: a menu loop", blocks: [EX.v2] },
    {
      label: "Version 3", kicker: "ADD ONE MORE", title: "Version 3: search and merit list",
      blocks: [EX.v3, <KeyIdea>This program already has the shape of real software: data in a dictionary, a loop that waits for commands, and separate jobs for each choice. Module 8 will split those jobs into functions; Module 9 will save the data to a file.</KeyIdea>],
    },
    {
      label: "Make It", kicker: "ON YOUR OWN", title: "Your program: top 3 words",
      blocks: [<P>Counting with a dict, then ranking with sorted tuples — the same two ideas, a new problem.</P>, EX.words],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit7_6" crumb="MODULE 7 › UNIT 7.7" title="Capstone: Student Marks Manager" sections={sections} quiz={QUIZ}
      next={{ title: "Computational Thinking II", text: "Module 7 complete! Next: the classic algorithms on data — searching, sorting, matrices. (Optional first: Module 7's Crucible.)" }} />
  );
}
