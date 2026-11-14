// Unit 7.3 — List Methods & Loop Patterns (rebuilt on the typing-first lesson kit)
// Built-ins (sum min max len sorted / .sort .reverse) → best-so-far (topper,
// without max) → text ↔ list with split() and join() → filtering into a new
// list → list comprehension (bonus) → class report make-task.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const codeBox = { margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre" };
const pyList = (a) => "[" + a.map((x) => (typeof x === "string" ? `'${x}'` : String(x))).join(", ") + "]";

// ── Widget: the best-so-far tournament ──
function Topper() {
  const marks = [72, 85, 64, 91, 78];
  const steps = [{ i: 0, best: 72, pos: 0, note: "Assume the first mark is the best — until something beats it." }];
  for (let i = 1; i < marks.length; i++) {
    const prev = steps[steps.length - 1];
    const win = marks[i] > prev.best;
    steps.push({ i, best: win ? marks[i] : prev.best, pos: win ? i : prev.pos, note: `Is ${marks[i]} > ${prev.best}? ${win ? "Yes — new champion." : "No — champion stays."}` });
  }
  const [k, setK] = useState(0);
  const s = steps[k];
  return (
    <div className="fh-two">
      <div>
        <pre style={codeBox}>{"best = marks[0]\npos = 0\nfor i in range(1, len(marks)):\n    if marks[i] > best:\n        best = marks[i]\n        pos = i"}</pre>
        <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
          <button onClick={() => setK(Math.max(0, k - 1))} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, cursor: "pointer" }}>◀</button>
          <button onClick={() => setK(Math.min(steps.length - 1, k + 1))} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: T.navy, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Next mark ▶</button>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", gap: 4 }}>
          {marks.map((m, i) => (
            <div key={i} style={{ textAlign: "center", width: 54 }}>
              <div style={{ fontFamily: CODE_FONT, fontSize: 11, color: T.blue }}>{i}</div>
              <div style={{ padding: "10px 0", borderRadius: 8, fontFamily: CODE_FONT, fontWeight: 700, fontSize: 17, border: `1.5px solid ${i === s.pos ? T.amber : i === s.i ? T.blue : T.border}`, background: i === s.pos ? tint(T.amber, "22") : i <= s.i ? T.card : T.deep }}>{m}</div>
              <div style={{ fontSize: 16 }}>{i === s.pos ? "👑" : ""}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: CODE_FONT, marginTop: 4 }}>best = <strong>{s.best}</strong>, pos = <strong>{s.pos}</strong></div>
        <div style={{ fontSize: 14.5, color: T.slate, marginTop: 6 }}>{s.note}</div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const report = (line) => {
  const m = line.split(/\s+/).filter(Boolean).map(Number);
  const avg = m.reduce((a, b) => a + b, 0) / m.length;
  const above = m.filter((x) => x > avg).length;
  return [`Marks: ${line}`, `Count: ${m.length}`, `Average: ${avg.toFixed(1)}`, `Highest: ${Math.max(...m)}`, `Lowest: ${Math.min(...m)}`,
    `Ranked: ${pyList([...m].sort((a, b) => b - a))}`, `Above average: ${above}`].join("\n");
};
const EX = {
  builtins: {
    id: "builtins", kind: "type", title: "The list toolbox",
    task: <>Predict every line. Lines 3 and 4 show the difference between <code>sorted()</code> and <code>.sort()</code>.</>,
    show: "marks = [72, 85, 64, 90, 58]\nprint(sum(marks), min(marks), max(marks), len(marks))\nprint(sorted(marks))\nprint(marks)\nmarks.sort(reverse=True)\nprint(marks)",
    tests: [{ expect: "369 58 90 5\n[58, 64, 72, 85, 90]\n[72, 85, 64, 90, 58]\n[90, 85, 72, 64, 58]" }],
    hints: ["sorted(x) gives a NEW sorted list and leaves x alone. x.sort() rearranges x itself."],
    solution: "marks = [72, 85, 64, 90, 58]\nprint(sum(marks), min(marks), max(marks), len(marks))\nprint(sorted(marks))\nprint(marks)\nmarks.sort(reverse=True)\nprint(marks)",
  },
  sortnone: {
    id: "sortnone", kind: "fix", title: "Sorted into nothing",
    task: <>The teacher wants a ranked copy and the original order kept. Run it — two problems. Fix it so it prints the sorted list, then the untouched original.</>,
    starter: "marks = [3, 1, 2]\nranked = marks.sort()\nprint(ranked)\nprint(marks)",
    tests: [{ expect: "[1, 2, 3]\n[3, 1, 2]" }],
    hints: [".sort() returns None (like append) AND changes marks.", "ranked = sorted(marks) makes a new list and leaves marks alone."],
    solution: "marks = [3, 1, 2]\nranked = sorted(marks)\nprint(ranked)\nprint(marks)",
  },
  topper: {
    id: "topper", kind: "write", title: "Find the topper (no max!)",
    task: <>Read 5 marks into a list with a loop (prompt <code>Mark: </code>). Then, <strong>without max()</strong>, use best-so-far to find the highest mark and its position, and print <code>Highest: 91 (student 4)</code> — students are numbered from 1.</>,
    minLines: 12,
    tests: [
      { inputs: ["72", "85", "64", "91", "78"], expect: "Mark: 72\nMark: 85\nMark: 64\nMark: 91\nMark: 78\nHighest: 91 (student 4)" },
      { inputs: ["99", "10", "20", "30", "40"], expect: "Mark: 99\nMark: 10\nMark: 20\nMark: 30\nMark: 40\nHighest: 99 (student 1)", hidden: true },
      { inputs: ["1", "2", "3", "4", "5"], expect: "Mark: 1\nMark: 2\nMark: 3\nMark: 4\nMark: 5\nHighest: 5 (student 5)", hidden: true },
    ],
    forbids: [{ call: "max", msg: "Do it with the best-so-far pattern — no max( )." }, { call: "sort" }, { call: "sorted" }],
    hints: ["Fill the list: for i in range(5): marks.append(int(input(\"Mark: \")))", "best = marks[0], pos = 0, then loop from index 1.", 'print(f"Highest: {best} (student {pos + 1})")'],
    solution: 'marks = []\nfor i in range(5):\n    marks.append(int(input("Mark: ")))\nbest = marks[0]\npos = 0\nfor i in range(1, len(marks)):\n    if marks[i] > best:\n        best = marks[i]\n        pos = i\nprint(f"Highest: {best} (student {pos + 1})")',
  },
  splitjoin: {
    id: "splitjoin", kind: "type", title: "split() and join()",
    task: <><code>split()</code> cuts text into a list of words (at spaces, or at any separator you give). <code>join()</code> glues a list of strings back into one. Remember: split gives <strong>strings</strong> — convert before maths.</>,
    show: 'line = "72 85 64 90"\nparts = line.split()\nprint(parts)\nmarks = []\nfor p in parts:\n    marks.append(int(p))\nprint(sum(marks))\nprint("-".join(parts))\nprint("Priya,Arun,Meena".split(","))',
    minLines: 10,
    tests: [{ expect: "['72', '85', '64', '90']\n311\n72-85-64-90\n['Priya', 'Arun', 'Meena']" }],
    hints: ["join is called on the separator: \"-\".join(parts)."],
    solution: 'line = "72 85 64 90"\nparts = line.split()\nprint(parts)\nmarks = []\nfor p in parts:\n    marks.append(int(p))\nprint(sum(marks))\nprint("-".join(parts))\nprint("Priya,Arun,Meena".split(","))',
  },
  oneline: {
    id: "oneline", kind: "write", title: "All the marks on one line",
    task: <>Ask <code>Marks: </code> once — the user types all marks separated by spaces. Split, convert each to int, and print <code>Count: 5</code>, <code>Average: 69.80</code> (2 decimals) and <code>Highest: 90</code>.</>,
    tests: [
      { inputs: ["72 85 64 90 38"], expect: "Marks: 72 85 64 90 38\nCount: 5\nAverage: 69.80\nHighest: 90" },
      { inputs: ["100 50"], expect: "Marks: 100 50\nCount: 2\nAverage: 75.00\nHighest: 100", hidden: true },
    ],
    requires: [{ call: "split" }],
    hints: ["for p in line.split(): marks.append(int(p))", "Now sum, len and max do the rest."],
    solution: 'line = input("Marks: ")\nmarks = []\nfor p in line.split():\n    marks.append(int(p))\nprint(f"Count: {len(marks)}")\nprint(f"Average: {sum(marks) / len(marks):.2f}")\nprint(f"Highest: {max(marks)}")',
  },
  words: {
    id: "words", kind: "write", title: "Longest word",
    task: <>Ask <code>Sentence: </code>. Print the number of words and the longest word (the first one, if there's a tie) — best-so-far on <code>len</code>: <code>Words: 6</code>, <code>Longest: education</code>.</>,
    tests: [
      { inputs: ["python makes education fun and fast"], expect: "Sentence: python makes education fun and fast\nWords: 6\nLongest: education" },
      { inputs: ["a bb cc d"], expect: "Sentence: a bb cc d\nWords: 4\nLongest: bb", hidden: true },
    ],
    requires: [{ call: "split" }],
    hints: ["words = sentence.split()", "longest = words[0]; for w in words: if len(w) > len(longest): longest = w"],
    solution: 'sentence = input("Sentence: ")\nwords = sentence.split()\nlongest = words[0]\nfor w in words:\n    if len(w) > len(longest):\n        longest = w\nprint(f"Words: {len(words)}")\nprint(f"Longest: {longest}")',
  },
  filter: {
    id: "filter", kind: "write", title: "Filter into a new list",
    task: <>Ask <code>Marks: </code> (one line). Build a new list <code>passed</code> with the marks of 40 and above, and count the rest. Print <code>Passed: [72, 85, 64, 90]</code> and <code>Failed: 1</code>.</>,
    tests: [
      { inputs: ["72 85 64 90 38"], expect: "Marks: 72 85 64 90 38\nPassed: [72, 85, 64, 90]\nFailed: 1" },
      { inputs: ["10 40 39"], expect: "Marks: 10 40 39\nPassed: [40]\nFailed: 2", hidden: true },
    ],
    requires: [{ call: "append" }],
    hints: ["passed = [] and failed = 0 before the loop.", "Inside: if m >= 40: passed.append(m) else: failed += 1"],
    solution: 'line = input("Marks: ")\npassed = []\nfailed = 0\nfor p in line.split():\n    m = int(p)\n    if m >= 40:\n        passed.append(m)\n    else:\n        failed += 1\nprint(f"Passed: {passed}")\nprint(f"Failed: {failed}")',
  },
  comp: {
    id: "comp", kind: "complete", optional: true, title: "Bonus: list comprehension",
    task: <>Python can build a list in one line: <code>[expression for item in collection]</code>, with an optional <code>if</code> filter. Fill the blanks so <code>marks</code> holds ints and <code>passed</code> holds only marks ≥ 40. (Optional — the loops you wrote do the same job.)</>,
    starter: 'line = "72 85 38 64 21"\nmarks = [___ for p in line.split()]\npassed = [m for m in marks if ___]\nprint(marks)\nprint(passed)',
    tests: [{ expect: "[72, 85, 38, 64, 21]\n[72, 85, 64]" }],
    hints: ["int(p) converts each piece.", "if m >= 40"],
    solution: 'line = "72 85 38 64 21"\nmarks = [int(p) for p in line.split()]\npassed = [m for m in marks if m >= 40]\nprint(marks)\nprint(passed)',
  },
  report: {
    id: "report", kind: "make", title: "Class report",
    task: <>Ask <code>Marks: </code> on one line. Print, in this order: <code>Count</code>, <code>Average</code> (1 decimal), <code>Highest</code>, <code>Lowest</code>, <code>Ranked</code> (highest first, as a list), and <code>Above average</code> (how many marks are strictly above the average).</>,
    minLines: 12,
    tests: [
      { inputs: ["72 85 64 90 38"], expect: report("72 85 64 90 38") },
      { inputs: ["50 50 50"], expect: report("50 50 50"), hidden: true },
      { inputs: ["99 1"], expect: report("99 1"), hidden: true },
    ],
    requires: [{ call: "split" }],
    hints: ["sorted(marks, reverse=True) gives the ranked list.", "Work out avg first, then count marks with m > avg in a loop.", 'f"Average: {avg:.1f}"'],
    solution: 'line = input("Marks: ")\nmarks = []\nfor p in line.split():\n    marks.append(int(p))\navg = sum(marks) / len(marks)\nabove = 0\nfor m in marks:\n    if m > avg:\n        above += 1\nprint(f"Count: {len(marks)}")\nprint(f"Average: {avg:.1f}")\nprint(f"Highest: {max(marks)}")\nprint(f"Lowest: {min(marks)}")\nprint(f"Ranked: {sorted(marks, reverse=True)}")\nprint(f"Above average: {above}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What's the difference between sorted(x) and x.sort()?", options: ["None", "sorted returns a new list; x.sort() changes x and returns None", "sort is faster only", "sorted changes x"], answer: 1, explain: "Use sorted() when you want to keep the original order." },
  { q: "What does \"a,b,,c\".split(\",\") give?", options: ["['a', 'b', 'c']", "['a', 'b', '', 'c']", "['a,b,,c']", "Error"], answer: 1, explain: "With an explicit separator, an empty piece appears between two commas." },
  { q: "What does \" \".join([\"I\", \"love\", \"Python\"]) give?", options: ["\"I love Python\"", "[\"I love Python\"]", "\"ILovePython\"", "Error"], answer: 0, explain: "join glues the strings with the separator between them." },
  { q: "In best-so-far, where does best start?", options: ["At 0", "At the first item", "At the last item", "At max()"], answer: 1, explain: "Starting at 0 breaks for all-negative lists; the first item is always a fair starting champion." },
  { q: "\"72 85\".split() gives ['72', '85']. What is sum(['72', '85'])?", options: ["157", "\"7285\"", "TypeError", "0"], answer: 2, explain: "split gives strings. Convert each to int first." },
  { q: "What does [n * 2 for n in [1, 2, 3]] give?", options: ["[1, 2, 3, 1, 2, 3]", "[2, 4, 6]", "6", "Error"], answer: 1, explain: "A comprehension builds a new list from an expression for each item." },
];

export default function Unit7_3(props) {
  const sections = [
    {
      label: "Toolbox", kicker: "BUILT-INS", title: "sum, min, max, sorted",
      blocks: [
        <P>Python has built-in tools for the most common list questions. One important pair: <code>sorted(x)</code> gives a new sorted list; <code>x.sort()</code> sorts x itself.</P>,
        EX.builtins,
        EX.sortnone,
      ],
    },
    {
      label: "Best So Far", kicker: "THE TOURNAMENT", title: "Finding the topper yourself",
      blocks: [
        <P><code>max()</code> is handy — but exams (and real problems like “which student, not just which mark?”) need the pattern behind it: <strong>best-so-far</strong>. The current champion faces each mark in turn:</P>,
        <Topper />,
        EX.topper,
      ],
    },
    {
      label: "split & join", kicker: "TEXT ↔ LIST", title: "From one line of text to a list",
      blocks: [
        <P>Users type a whole line; your program wants a list. <code>split()</code> turns text into a list of pieces; <code>join()</code> turns a list of strings back into text.</P>,
        EX.splitjoin,
        EX.oneline,
        EX.words,
        <KeyIdea>The everyday recipe: <code>line = input()</code> → <code>line.split()</code> → convert each piece with <code>int()</code> → use the list.</KeyIdea>,
      ],
    },
    {
      label: "Filter", kicker: "BUILD A NEW LIST", title: "Keep only what you need",
      blocks: [EX.filter, EX.comp],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: class report",
      blocks: [<P>split, convert, sum/len, max/min, sorted, and a count pattern — one input line, six results.</P>, EX.report],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit7_3" crumb="MODULE 7 › UNIT 7.3" title="List Methods & Loop Patterns" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 7.4 — Tuples", text: "Fixed records, unpacking, a, b = b, a, and the enumerate / zip loop helpers." }} />
  );
}
