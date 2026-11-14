// Unit CT2.3 — Sorting: Bubble, Selection & Insertion (rebuilt, typing-first)
// Each algorithm written by the learner and printed pass by pass; the checker
// simulates the same algorithm independently. Bubble with swap count and early
// exit → off-by-one IndexError fix → selection → insertion → rank records.

import { useState } from "react";
import LessonShell, { P, KeyIdea } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });
const L = (a) => "[" + a.join(", ") + "]";

// ── Reference simulations ──
function bubble(arr) {
  const a = [...arr], out = []; let swaps = 0, passes = 0;
  for (let i = 0; i < a.length; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++) if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; swaps++; swapped = true; }
    passes++; out.push(`Pass ${passes}: ${L(a)}`);
    if (!swapped) break;
  }
  out.push(`Swaps: ${swaps}`); return out;
}
function selection(arr) {
  const a = [...arr], out = [];
  for (let i = 0; i < a.length - 1; i++) {
    let m = i; for (let j = i + 1; j < a.length; j++) if (a[j] < a[m]) m = j;
    [a[i], a[m]] = [a[m], a[i]]; out.push(`Pass ${i + 1}: ${L(a)}`);
  }
  return out;
}
function insertion(arr) {
  const a = [...arr], out = [];
  for (let i = 1; i < a.length; i++) {
    const key = a[i]; let j = i - 1;
    while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
    a[j + 1] = key; out.push(`Insert ${key}: ${L(a)}`);
  }
  return out;
}
const run = (label, line, f) => [`${label}: ${line}`, ...f(line.split(" ").map(Number))].join("\n");

// ── Widget: bubble sort, comparison by comparison ──
function BubbleStepper() {
  const start = [5, 2, 8, 1, 4];
  const steps = []; const a = [...start];
  for (let i = 0; i < a.length; i++) for (let j = 0; j < a.length - 1 - i; j++) { const sw = a[j] > a[j + 1]; if (sw) [a[j], a[j + 1]] = [a[j + 1], a[j]]; steps.push({ a: [...a], j, sw, done: a.length - i }); }
  const [k, setK] = useState(0);
  const s = steps[k];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        {s.a.map((v, i) => (
          <div key={i} style={{ width: 52, textAlign: "center", padding: "10px 0", borderRadius: 8, fontFamily: CODE_FONT, fontWeight: 700, fontSize: 18,
            border: `1.5px solid ${i === s.j || i === s.j + 1 ? (s.sw ? T.orange : T.teal) : i >= s.done ? T.green : T.border}`, background: i >= s.done ? tint(T.green, "14") : i === s.j || i === s.j + 1 ? tint(s.sw ? T.orange : T.teal, "18") : T.card }}>{v}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => setK(Math.max(0, k - 1))} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, cursor: "pointer" }}>◀</button>
        <button onClick={() => setK(Math.min(steps.length - 1, k + 1))} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: T.navy, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Next comparison ▶</button>
        <span style={{ fontSize: 14, color: T.slate }}>Compared positions {s.j} and {s.j + 1}: {s.sw ? "out of order → swapped" : "in order → left alone"}. Green = settled at the end.</span>
      </div>
    </div>
  );
}

const EX = {
  bubble: {
    id: "bubble", kind: "write", title: "Bubble sort, with an early exit",
    task: <>Ask <code>Numbers: </code>. Bubble sort: in each pass compare neighbours <code>a[j]</code> and <code>a[j+1]</code> and swap if out of order. After each pass print <code>Pass 1: [2, 5, 1, 4, 8]</code>. If a pass makes <strong>no</strong> swaps, the list is sorted — stop. Finally <code>Swaps: 6</code>. No sort() or sorted().</>,
    minLines: 16,
    tests: [
      { inputs: ["5 2 8 1 4"], expect: run("Numbers", "5 2 8 1 4", bubble) },
      { inputs: ["1 2 3 4"], expect: run("Numbers", "1 2 3 4", bubble), hidden: true },
      { inputs: ["9 7 5 3 1"], expect: run("Numbers", "9 7 5 3 1", bubble), hidden: true },
    ],
    requires: [comments(4), { node: "For", min: 2 }],
    forbids: [{ call: "sort" }, { call: "sorted" }],
    hints: ["for i in range(n): swapped = False; for j in range(n - 1 - i): …", "Swap in one line: a[j], a[j + 1] = a[j + 1], a[j] (Unit 7.4).", "After the inner loop: passes += 1, print, then if not swapped: break."],
    solution: '# 1. repeat passes over the list\n# 2.     compare each neighbouring pair; swap if out of order (count swaps)\n# 3.     print the list after the pass\n# 4.     a pass with no swaps means sorted: stop\na = [int(x) for x in input("Numbers: ").split()]\nn = len(a)\nswaps = 0\npasses = 0\nfor i in range(n):\n    swapped = False\n    for j in range(n - 1 - i):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\n            swaps += 1\n            swapped = True\n    passes += 1\n    print(f"Pass {passes}: {a}")\n    if not swapped:\n        break\nprint(f"Swaps: {swaps}")',
  },
  offbyone: {
    id: "offbyone", kind: "fix", title: "One step too far",
    task: <>This bubble sort crashes. Run it, read the coach, and fix the inner range — think about what <code>j + 1</code> reaches on the last round.</>,
    starter: 'a = [4, 1, 3, 2]\nn = len(a)\nfor i in range(n):\n    for j in range(n - i):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\nprint(a)',
    tests: [{ expect: "[1, 2, 3, 4]" }],
    hints: ["When j is the last index, a[j + 1] is past the end. Stop one earlier: range(n - 1 - i)."],
    solution: 'a = [4, 1, 3, 2]\nn = len(a)\nfor i in range(n):\n    for j in range(n - 1 - i):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]\nprint(a)',
  },
  selection: {
    id: "selection", kind: "write", title: "Selection sort",
    task: <>Ask <code>Numbers: </code>. For each position i (except the last), find the index of the smallest value from i to the end, and swap it into position i. Print the list after each pass: <code>Pass 1: [1, 2, 8, 5, 4]</code>.</>,
    minLines: 12,
    tests: [
      { inputs: ["5 2 8 1 4"], expect: run("Numbers", "5 2 8 1 4", selection) },
      { inputs: ["3 3 1"], expect: run("Numbers", "3 3 1", selection), hidden: true },
    ],
    requires: [comments(3), { node: "For", min: 2 }],
    forbids: [{ call: "sort" }, { call: "sorted" }, { call: "min" }],
    hints: ["for i in range(n - 1): smallest = i; for j in range(i + 1, n): if a[j] < a[smallest]: smallest = j", "Then swap a[i] and a[smallest] and print."],
    solution: '# 1. for each position i (but the last)\n# 2.     find the smallest item from i onwards\n# 3.     swap it into position i, print\nnums = [int(x) for x in input("Numbers: ").split()]\nn = len(nums)\nfor i in range(n - 1):\n    smallest = i\n    for j in range(i + 1, n):\n        if nums[j] < nums[smallest]:\n            smallest = j\n    nums[i], nums[smallest] = nums[smallest], nums[i]\n    print(f"Pass {i + 1}: {nums}")',
  },
  insertion: {
    id: "insertion", kind: "write", title: "Insertion sort",
    task: <>The card-player's sort. Ask <code>Numbers: </code>. Take each item from index 1 onwards (the <em>key</em>), shift the bigger items before it one place right, and drop the key into the gap. Print <code>Insert 2: [2, 5, 8, 1, 4]</code> after each.</>,
    minLines: 12,
    tests: [
      { inputs: ["5 2 8 1 4"], expect: run("Numbers", "5 2 8 1 4", insertion) },
      { inputs: ["4 3 2 1"], expect: run("Numbers", "4 3 2 1", insertion), hidden: true },
    ],
    requires: [comments(3), { node: "While" }],
    forbids: [{ call: "sort" }, { call: "sorted" }],
    hints: ["key = a[i]; j = i - 1; while j >= 0 and a[j] > key: a[j + 1] = a[j]; j -= 1", "Then a[j + 1] = key."],
    solution: '# 1. take each item from index 1 as the key\n# 2.     shift bigger items before it one place right\n# 3.     put the key in the gap, print\na = [int(x) for x in input("Numbers: ").split()]\nfor i in range(1, len(a)):\n    key = a[i]\n    j = i - 1\n    while j >= 0 and a[j] > key:\n        a[j + 1] = a[j]\n        j -= 1\n    a[j + 1] = key\n    print(f"Insert {key}: {a}")',
  },
  rank: {
    id: "rank", kind: "make", title: "Rank the class",
    task: <>Ask <code>Names: </code> and <code>Marks: </code>. Build a list of <code>(name, mark)</code> tuples and sort it by mark, <strong>highest first</strong>, with your own selection sort (compare <code>rec[1]</code>). Print <code>1. Meena 91</code> and so on. No sort/sorted.</>,
    minLines: 16,
    tests: [
      { inputs: ["Priya Arun Meena Ravi", "87 62 91 74"], expect: "Names: Priya Arun Meena Ravi\nMarks: 87 62 91 74\n1. Meena 91\n2. Priya 87\n3. Ravi 74\n4. Arun 62" },
      { inputs: ["A B", "10 20"], expect: "Names: A B\nMarks: 10 20\n1. B 20\n2. A 10", hidden: true },
    ],
    requires: [comments(3)],
    forbids: [{ call: "sort" }, { call: "sorted" }],
    hints: ["records = list(zip(names, marks)) — convert marks to int first.", "Selection sort, but look for the LARGEST mark: if records[j][1] > records[best][1]"],
    solution: '# 1. pair names and marks into (name, mark) tuples\n# 2. selection sort by mark, largest first\n# 3. print the ranking\nnames = input("Names: ").split()\nmarks = [int(x) for x in input("Marks: ").split()]\nrecords = list(zip(names, marks))\nn = len(records)\nfor i in range(n - 1):\n    best = i\n    for j in range(i + 1, n):\n        if records[j][1] > records[best][1]:\n            best = j\n    records[i], records[best] = records[best], records[i]\nfor rank, (name, mark) in enumerate(records, start=1):\n    print(f"{rank}. {name} {mark}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "After the first bubble-sort pass, what is guaranteed?", options: ["The list is sorted", "The largest item is at the end", "The smallest is at the start", "Nothing"], answer: 1, explain: "The biggest value bubbles all the way to the right." },
  { q: "Why stop when a pass makes no swaps?", options: ["Required", "No swaps means every neighbour is in order — the list is already sorted", "To save memory", "To avoid errors"], answer: 1, explain: "An already-sorted list takes just one pass." },
  { q: "Selection sort's inner loop looks for…", options: ["Any out-of-order pair", "The smallest remaining item", "The middle", "Duplicates"], answer: 1, explain: "Then one swap puts it in place." },
  { q: "How many comparisons do these simple sorts need for n items, roughly?", options: ["n", "About n²/2", "log n", "1"], answer: 1, explain: "That's why Python's built-in sorted() uses a much cleverer algorithm (Timsort) for big data." },
];

export default function UnitCT2_3(props) {
  const sections = [
    { label: "Bubble", kicker: "NEIGHBOURS SWAP", title: "Bubble sort", blocks: [<P>sorted() hides the work. Here you do it yourself. Bubble sort compares neighbours and swaps them when out of order — big values bubble to the end:</P>, <BubbleStepper />, EX.bubble, EX.offbyone] },
    { label: "Selection", kicker: "PICK THE SMALLEST", title: "Selection sort", blocks: [EX.selection] },
    { label: "Insertion", kicker: "LIKE SORTING CARDS", title: "Insertion sort", blocks: [EX.insertion, <KeyIdea>Three different algorithms, same result. They differ in how much work they do — and that difference matters for big data.</KeyIdea>] },
    { label: "Make It", kicker: "SORT RECORDS", title: "Your program: rank the class", blocks: [EX.rank] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT2_3" crumb="COMPUTATIONAL THINKING II › 3" title="Sorting: Bubble, Selection & Insertion" sections={sections} quiz={QUIZ}
      next={{ title: "CT II · 4 — Matrices", text: "Rows and columns: the shape behind images, games and spreadsheets." }} />
  );
}
