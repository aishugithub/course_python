// Unit CT2.2 — Searching: Linear & Binary (rebuilt, typing-first)
// Linear search with a -1 sentinel → all positions → binary search on a
// sorted list, counting steps → compare the two → directory lookup make-task.
// No functions yet (CT II sits before Module 8).

import { useState } from "react";
import LessonShell, { P, KeyIdea } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });

// ── Widget: binary search, step by step ──
const DATA = [3, 8, 12, 19, 23, 31, 45, 52, 67, 74, 88, 91, 103];
function BinaryStepper() {
  const [target, setTarget] = useState(67);
  const steps = []; let lo = 0, hi = DATA.length - 1;
  while (lo <= hi) { const mid = Math.floor((lo + hi) / 2); steps.push({ lo, hi, mid }); if (DATA[mid] === target) break; if (DATA[mid] < target) lo = mid + 1; else hi = mid - 1; }
  const [k, setK] = useState(0);
  const s = steps[Math.min(k, steps.length - 1)];
  const found = DATA[s.mid] === target;
  return (
    <div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
        <label style={{ fontFamily: CODE_FONT }}>target = <select value={target} onChange={(e) => { setTarget(Number(e.target.value)); setK(0); }} style={{ fontFamily: CODE_FONT, fontSize: 15, padding: 4 }}>{[...DATA, 50].map((v) => <option key={v} value={v}>{v}</option>)}</select></label>
        <button onClick={() => setK(Math.max(0, k - 1))} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, cursor: "pointer" }}>◀</button>
        <button onClick={() => setK(Math.min(steps.length - 1, k + 1))} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: T.navy, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Next step ▶</button>
        <span style={{ fontSize: 13.5, color: T.slate }}>Step {Math.min(k, steps.length - 1) + 1} of {steps.length}</span>
      </div>
      <div style={{ display: "flex", gap: 3, overflowX: "auto" }}>
        {DATA.map((v, i) => {
          const inRange = i >= s.lo && i <= s.hi;
          return (
            <div key={i} style={{ textAlign: "center", minWidth: 46 }}>
              <div style={{ fontFamily: CODE_FONT, fontSize: 11, color: T.blue }}>{i}</div>
              <div style={{ padding: "9px 0", borderRadius: 7, fontFamily: CODE_FONT, fontWeight: 700, border: `1.5px solid ${i === s.mid ? (found ? T.green : T.amber) : inRange ? T.teal : T.border}`, background: i === s.mid ? tint(found ? T.green : T.amber, "22") : inRange ? tint(T.teal, "10") : T.deep, color: inRange ? T.text : T.muted }}>{v}</div>
              <div style={{ fontSize: 11, color: T.muted }}>{i === s.lo ? "low" : ""}{i === s.hi ? " high" : ""}</div>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 14.5, color: T.slate, marginTop: 8 }}>
        mid = ({s.lo} + {s.hi}) // 2 = {s.mid} → data[{s.mid}] is {DATA[s.mid]}. {found ? "Found it!" : DATA[s.mid] < target ? "Too small: throw away the left half (low = mid + 1)." : "Too big: throw away the right half (high = mid - 1)."}
        {!found && k >= steps.length - 1 && " low passed high — it isn't in the list."}
      </div>
    </div>
  );
}

const binSteps = (arr, t) => { let lo = 0, hi = arr.length - 1, st = 0; while (lo <= hi) { st++; const m = Math.floor((lo + hi) / 2); if (arr[m] === t) return [m, st]; if (arr[m] < t) lo = m + 1; else hi = m - 1; } return [-1, st]; };
const NAMES = ["Arun", "Divya", "Kavya", "Meena", "Priya", "Ravi", "Sanjay", "Uma", "Vikram", "Zoya"];
const dir = (name) => { const [i, st] = binSteps(NAMES, name); return `Search: ${name}\n${i >= 0 ? `${name} is at position ${i + 1}` : `${name} is not in the directory`}\nSteps: ${st}`; };

const EX = {
  linear: {
    id: "linear", kind: "write", title: "Linear search",
    task: <>Ask <code>Rolls: </code> (one line) and <code>Find: </code>. Check each roll in turn; print <code>Found at position 3</code> (from 1), or <code>Not found</code>. Use a <strong>sentinel</strong>: <code>pos = -1</code> before the loop means “not found yet” — -1 can never be a real index. No <code>.index()</code> or <code>in</code>.</>,
    tests: [
      { inputs: ["1001 1042 1003 1050", "1003"], expect: "Rolls: 1001 1042 1003 1050\nFind: 1003\nFound at position 3" },
      { inputs: ["1 2 3", "9"], expect: "Rolls: 1 2 3\nFind: 9\nNot found", hidden: true },
      { inputs: ["5 5 5", "5"], expect: "Rolls: 5 5 5\nFind: 5\nFound at position 1", hidden: true },
    ],
    requires: [comments(3), { node: "Break" }],
    forbids: [{ call: "index", msg: "Write the search yourself." }, { text: " in rolls", msg: "Write the search yourself with a loop and indexes." }],
    hints: ["for i in range(len(rolls)): if rolls[i] == target: pos = i; break", "After the loop: if pos == -1: Not found"],
    solution: '# 1. pos = -1 (not found yet)\n# 2. check each position in order\n# 3.     a match: remember it, stop\n# 4. print the result\nrolls = input("Rolls: ").split()\ntarget = input("Find: ")\npos = -1\nfor i in range(len(rolls)):\n    if rolls[i] == target:\n        pos = i\n        break\nif pos == -1:\n    print("Not found")\nelse:\n    print(f"Found at position {pos + 1}")',
  },
  allpos: {
    id: "allpos", kind: "write", title: "Every position",
    task: <>Ask <code>Marks: </code> and <code>Find: </code>. Print every position (from 1) where the mark appears, as a list, and how many: <code>Positions: [2, 5] (2 times)</code>.</>,
    tests: [{ inputs: ["72 91 64 38 91", "91"], expect: "Marks: 72 91 64 38 91\nFind: 91\nPositions: [2, 5] (2 times)" }, { inputs: ["1 2", "3"], expect: "Marks: 1 2\nFind: 3\nPositions: [] (0 times)", hidden: true }],
    requires: [comments(2)],
    hints: ["No break this time — you need every match.", "enumerate(marks, start=1) gives positions from 1 (Unit 7.4)."],
    solution: '# 1. an empty list of positions\n# 2. scan everything, collecting every match (no break)\nmarks = input("Marks: ").split()\ntarget = input("Find: ")\nfound = []\nfor i, m in enumerate(marks, start=1):\n    if m == target:\n        found.append(i)\nprint(f"Positions: {found} ({len(found)} times)")',
  },
  binary: {
    id: "binary", kind: "write", title: "Binary search",
    task: <>The list is <strong>sorted</strong>: <code>data = [3, 8, 12, 19, 23, 31, 45, 52, 67, 74, 88, 91, 103]</code>. Ask <code>Find: </code> and run the halving search from the stepper, counting the steps. Print <code>Found at index 8</code> (or <code>Not found</code>) and <code>Steps: 3</code>.</>,
    tests: [
      { inputs: ["67"], expect: `Find: 67\nFound at index ${binSteps(DATA, 67)[0]}\nSteps: ${binSteps(DATA, 67)[1]}` },
      { inputs: ["3"], expect: `Find: 3\nFound at index 0\nSteps: ${binSteps(DATA, 3)[1]}`, hidden: true },
      { inputs: ["50"], expect: `Find: 50\nNot found\nSteps: ${binSteps(DATA, 50)[1]}`, hidden: true },
    ],
    requires: [comments(4), { node: "While" }, { text: "// 2" }],
    hints: ["low = 0, high = len(data) - 1; while low <= high: mid = (low + high) // 2", "Count a step at the top of each round.", "data[mid] < target → low = mid + 1; bigger → high = mid - 1; equal → pos = mid, break"],
    solution: '# 1. low and high bracket the part still possible\n# 2. while something is left: look at the middle (count a step)\n# 3.     equal -> found; too small -> drop the left half; too big -> drop the right half\n# 4. print result and steps\ndata = [3, 8, 12, 19, 23, 31, 45, 52, 67, 74, 88, 91, 103]\ntarget = int(input("Find: "))\nlow = 0\nhigh = len(data) - 1\npos = -1\nsteps = 0\nwhile low <= high:\n    steps += 1\n    mid = (low + high) // 2\n    if data[mid] == target:\n        pos = mid\n        break\n    elif data[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\nif pos == -1:\n    print("Not found")\nelse:\n    print(f"Found at index {pos}")\nprint(f"Steps: {steps}")',
  },
  directory: {
    id: "directory", kind: "make", title: "Directory lookup",
    task: <>The class directory is sorted alphabetically: <code>Arun Divya Kavya Meena Priya Ravi Sanjay Uma Vikram Zoya</code>. Ask <code>Search: </code> and binary-search it (strings compare alphabetically, Unit 5.1). Print <code>Priya is at position 5</code> or <code>Gopal is not in the directory</code>, then <code>Steps: 3</code>. A linear search would need up to 10 steps; binary never needs more than 4.</>,
    minLines: 18,
    tests: [{ inputs: ["Priya"], expect: dir("Priya") }, { inputs: ["Gopal"], expect: dir("Gopal"), hidden: true }, { inputs: ["Zoya"], expect: dir("Zoya"), hidden: true }],
    requires: [comments(4), { node: "While" }],
    forbids: [{ call: "index" }],
    hints: ["Exactly the binary search from before — < and > work on strings too."],
    solution: '# 1. low/high bracket the sorted names\n# 2. look at the middle name, counting steps\n# 3.     match -> done; earlier in the alphabet -> go right; later -> go left\n# 4. print result and steps\nnames = "Arun Divya Kavya Meena Priya Ravi Sanjay Uma Vikram Zoya".split()\nwanted = input("Search: ")\nlow = 0\nhigh = len(names) - 1\npos = -1\nsteps = 0\nwhile low <= high:\n    steps += 1\n    mid = (low + high) // 2\n    if names[mid] == wanted:\n        pos = mid\n        break\n    elif names[mid] < wanted:\n        low = mid + 1\n    else:\n        high = mid - 1\nif pos == -1:\n    print(f"{wanted} is not in the directory")\nelse:\n    print(f"{wanted} is at position {pos + 1}")\nprint(f"Steps: {steps}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why is -1 a good “not found” sentinel?", options: ["It's negative", "It can never be a real index, so it clearly means absent", "Python requires it", "It's small"], answer: 1, explain: "Real positions are 0 or more." },
  { q: "What must be true before binary search works?", options: ["The list is short", "The list is sorted", "No duplicates", "Only numbers"], answer: 1, explain: "Throwing away half only makes sense if the order tells you which half." },
  { q: "About how many steps does binary search need for 1,000,000 sorted items?", options: ["1,000,000", "500,000", "About 20", "1"], answer: 2, explain: "Halving 20 times: 2²⁰ ≈ 1,000,000." },
  { q: "Why no break when collecting every position?", options: ["Style", "break would stop at the first match", "Error otherwise", "To save time"], answer: 1, explain: "First match → break; all matches → full scan." },
];

export default function UnitCT2_2(props) {
  const sections = [
    { label: "Linear", kicker: "ONE BY ONE", title: "Linear search", blocks: [<P>The simplest search: check every item until you find it. Works on any list, but a list of n items can take n checks.</P>, EX.linear, EX.allpos] },
    { label: "Binary", kicker: "HALVE IT", title: "Binary search", blocks: [<P>If the list is <strong>sorted</strong>, look at the middle: one comparison tells you which half to throw away. Pick a target and step through:</P>, <BinaryStepper />, EX.binary, <KeyIdea>Linear search: up to n steps. Binary search: about log₂ n steps — 13 items need at most 4; a million need about 20. But the data must be sorted first.</KeyIdea>] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: directory lookup", blocks: [EX.directory] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT2_2" crumb="COMPUTATIONAL THINKING II › 2" title="Searching: Linear & Binary" sections={sections} quiz={QUIZ}
      next={{ title: "CT II · 3 — Sorting", text: "Bubble, selection and insertion: watch chaos become order, swap by swap." }} />
  );
}
