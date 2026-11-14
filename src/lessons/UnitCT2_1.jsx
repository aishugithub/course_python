// Unit CT2.1 — Scanning a List (rebuilt, typing-first)
// One pass over the data: min/max without built-ins (and where), second
// largest, values in a range, the streak pattern, rainfall report.
// Scaffolding: Modules 4–7 (lists, tuples, dicts) — no functions yet.

import LessonShell, { P, KeyIdea } from "../kit/Lesson.jsx";
import FourMoves from "../kit/FourMoves.jsx";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });
const second = (a) => { let f = -Infinity, s = -Infinity; for (const x of a) { if (x > f) { s = f; f = x; } else if (x > s && x !== f) s = x; } return s; };
const streak = (a) => { let best = 0, cur = 0; for (const x of a) { cur = x === 0 ? cur + 1 : 0; best = Math.max(best, cur); } return best; };
const rain = (line) => {
  const r = line.split(" ").map(Number); const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let w = 0; r.forEach((x, i) => { if (x > r[w]) w = i; });
  return [`Rainfall: ${line}`, `Wettest: ${M[w]} (${r[w]} mm)`, `Dry months: ${r.filter((x) => x === 0).length}`, `Longest dry spell: ${streak(r)} months`, `Total: ${r.reduce((a, b) => a + b, 0)} mm`].join("\n");
};

const EX = {
  minpos: {
    id: "minpos", kind: "write", title: "Lowest mark, and where",
    task: <>Ask <code>Marks: </code> (one line). <strong>Without min()</strong>, find the lowest mark and its position (from 1) in one pass: <code>Lowest: 38 at position 4</code>.</>,
    tests: [{ inputs: ["72 85 64 38 90"], expect: "Marks: 72 85 64 38 90\nLowest: 38 at position 4" }, { inputs: ["5"], expect: "Marks: 5\nLowest: 5 at position 1", hidden: true }, { inputs: ["9 1 1"], expect: "Marks: 9 1 1\nLowest: 1 at position 2", hidden: true }],
    requires: [comments(3)],
    forbids: [{ call: "min" }, { call: "sorted" }, { call: "sort" }],
    hints: ["Seed with the first item: low = marks[0], pos = 0, then scan from index 1 with a strict <."],
    solution: '# 1. seed low and pos with the first item\n# 2. scan the rest\n# 3.     a smaller item replaces low and pos\n# 4. print (positions start at 1)\nmarks = [int(x) for x in input("Marks: ").split()]\nlow = marks[0]\npos = 0\nfor i in range(1, len(marks)):\n    if marks[i] < low:\n        low = marks[i]\n        pos = i\nprint(f"Lowest: {low} at position {pos + 1}")',
  },
  secondbest: {
    id: "secondbest", kind: "write", title: "Second highest (one pass)",
    task: <>Ask <code>Scores: </code> and print the second-highest <em>different</em> score, without sorting: <code>Second highest: 85</code>. Keep two champions as you scan. If every score is the same, print <code>Second highest: none</code>.</>,
    tests: [
      { inputs: ["72 85 64 91 85"], expect: "Scores: 72 85 64 91 85\nSecond highest: 85" },
      { inputs: ["91 72 91"], expect: `Scores: 91 72 91\nSecond highest: ${second([91, 72, 91])}`, hidden: true },
      { inputs: ["50 50"], expect: "Scores: 50 50\nSecond highest: none", hidden: true },
    ],
    requires: [comments(3)],
    forbids: [{ call: "sorted" }, { call: "sort" }, { call: "max" }],
    hints: ["first = second = None. For each x: if x beats first, the old first becomes second.", "Otherwise, if x is between them (and not equal to first), it becomes the new second."],
    solution: '# 1. two champions, none yet\n# 2. for each score\n# 3.     beats first -> old first slides to second; else beats second (and differs) -> new second\n# 4. print second, or none\nscores = [int(x) for x in input("Scores: ").split()]\nfirst = None\nsecond = None\nfor x in scores:\n    if first is None or x > first:\n        second = first\n        first = x\n    elif x != first and (second is None or x > second):\n        second = x\nif second is None:\n    print("Second highest: none")\nelse:\n    print(f"Second highest: {second}")',
  },
  band: {
    id: "band", kind: "write", title: "How many in the band?",
    task: <>Ask <code>Marks: </code> and <code>Band (low high): </code>. Print how many marks are inside the band (inclusive) and the list of them: <code>In band: 3 [72, 64, 75]</code>.</>,
    tests: [
      { inputs: ["72 85 64 38 90 75", "60 80"], expect: "Marks: 72 85 64 38 90 75\nBand (low high): 60 80\nIn band: 3 [72, 64, 75]" },
      { inputs: ["10 20", "50 60"], expect: "Marks: 10 20\nBand (low high): 50 60\nIn band: 0 []", hidden: true },
    ],
    requires: [comments(3)],
    hints: ["low, high = [int(x) for x in input(...).split()] — or split then unpack and convert.", "if low <= m <= high: inside.append(m)"],
    solution: '# 1. read marks and the band\n# 2. scan the marks\n# 3.     keep the ones with low <= m <= high\n# 4. print count and list\nmarks = [int(x) for x in input("Marks: ").split()]\nlow, high = [int(x) for x in input("Band (low high): ").split()]\ninside = []\nfor m in marks:\n    if low <= m <= high:\n        inside.append(m)\nprint(f"In band: {len(inside)} {inside}")',
  },
  streak: {
    id: "streak", kind: "write", title: "The longest streak",
    task: <>A new scanning pattern: the <strong>current streak</strong> grows while a condition holds and resets to 0 when it breaks; a <strong>best streak</strong> remembers the longest. Ask <code>Results (W/L): </code> like <code>W W L W W W L</code> and print <code>Longest winning streak: 3</code>.</>,
    tests: [
      { inputs: ["W W L W W W L"], expect: "Results (W/L): W W L W W W L\nLongest winning streak: 3" },
      { inputs: ["L L"], expect: "Results (W/L): L L\nLongest winning streak: 0", hidden: true },
      { inputs: ["W W W W"], expect: "Results (W/L): W W W W\nLongest winning streak: 4", hidden: true },
    ],
    requires: [comments(3)],
    hints: ["current = 0, best = 0. On W: current += 1, then if current > best: best = current. On L: current = 0."],
    solution: '# 1. current and best streaks start at 0\n# 2. for each result\n# 3.     W extends current (and maybe best); L resets current\n# 4. print best\nresults = input("Results (W/L): ").split()\ncurrent = 0\nbest = 0\nfor r in results:\n    if r == "W":\n        current += 1\n        if current > best:\n            best = current\n    else:\n        current = 0\nprint(f"Longest winning streak: {best}")',
  },
  rainfall: {
    id: "rainfall", kind: "make", title: "Rainfall report",
    task: <>Ask <code>Rainfall: </code> — 12 monthly values in mm, January to December. In <strong>one pass</strong>, find: the wettest month (by name; first wins ties), the number of dry months (0 mm), the longest run of consecutive dry months, and the total. Print exactly like <code>Wettest: Oct (320 mm)</code>, <code>Dry months: 4</code>, <code>Longest dry spell: 3 months</code>, <code>Total: 1450 mm</code>.</>,
    minLines: 22,
    tests: [
      { inputs: ["12 0 0 0 40 90 110 120 200 320 210 0"], expect: rain("12 0 0 0 40 90 110 120 200 320 210 0") },
      { inputs: ["5 5 5 5 5 5 5 5 5 5 5 5"], expect: rain("5 5 5 5 5 5 5 5 5 5 5 5"), hidden: true },
      { inputs: ["0 0 30 0 0 0 0 80 0 0 0 0"], expect: rain("0 0 30 0 0 0 0 80 0 0 0 0"), hidden: true },
    ],
    requires: [comments(4), { node: "For" }],
    forbids: [{ call: "max" }],
    hints: ["months = [\"Jan\", \"Feb\", …] — the wettest index picks the name.", "Four things updated in the same loop: wettest index, dry count, current/best dry streak, total."],
    solution: '# 1. month names; seeds for wettest, dry count, streaks, total\n# 2. one pass over the 12 values\n# 3.     update wettest, count dry, extend or reset the dry streak, add to total\n# 4. print the four results\nmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]\nrain = [int(x) for x in input("Rainfall: ").split()]\nwet = 0\ndry = 0\ncurrent = 0\nbest = 0\ntotal = 0\nfor i in range(len(rain)):\n    if rain[i] > rain[wet]:\n        wet = i\n    if rain[i] == 0:\n        dry += 1\n        current += 1\n        if current > best:\n            best = current\n    else:\n        current = 0\n    total += rain[i]\nprint(f"Wettest: {months[wet]} ({rain[wet]} mm)")\nprint(f"Dry months: {dry}")\nprint(f"Longest dry spell: {best} months")\nprint(f"Total: {total} mm")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why seed best-so-far with the first item, not 0?", options: ["Faster", "0 would be wrong for lists of negative numbers (or for finding a minimum)", "Required", "No reason"], answer: 1, explain: "The first item is always a real candidate." },
  { q: "In the streak pattern, what happens when the condition breaks?", options: ["best resets", "current resets to 0; best keeps its record", "The loop stops", "Both reset"], answer: 1, explain: "current is “this run”; best is “the record”." },
  { q: "Why find several results in ONE pass?", options: ["Required", "Each pass over big data costs time; one loop can update several accumulators", "It's shorter", "Python can't loop twice"], answer: 1, explain: "Same answers, less work." },
  { q: "For “second highest different score”, why check x != first?", options: ["Style", "So a repeat of the top score isn't counted as second", "To avoid errors", "No reason"], answer: 1, explain: "91 72 91 → second is 72, not 91." },
];

export default function UnitCT2_1(props) {
  const sections = [
    {
      label: "One Pass", kicker: "SCANNING", title: "Answer questions in one sweep",
      blocks: [
        <FourMoves problem="Find the lowest mark and its position."
          answers={{ decompose: "Keep the best candidate so far and where it was · visit every mark · replace the candidate when a smaller one appears.", pattern: "Compare-and-maybe-replace for every item → a loop.", abstract: "Best-so-far (Unit 7.3) with < instead of >, plus remembering the index.", algorithm: "low = marks[0], pos = 0\nfor i from 1 to len - 1:\n    if marks[i] < low: low = marks[i], pos = i\nprint low and pos + 1" }} />,
        EX.minpos, EX.secondbest,
      ],
    },
    { label: "Filter & Streak", kicker: "MORE SCANS", title: "Bands and streaks", blocks: [EX.band, EX.streak, <KeyIdea>A scan keeps a few variables up to date as it walks: a champion, a count, a total — or a current run and a record run.</KeyIdea>] },
    { label: "Make It", kicker: "FOUR RESULTS, ONE LOOP", title: "Your program: rainfall report", blocks: [EX.rainfall] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT2_1" crumb="COMPUTATIONAL THINKING II › 1" title="Scanning a List" sections={sections} quiz={QUIZ}
      next={{ title: "CT II · 2 — Searching: Linear & Binary", text: "Find it in n steps — or log n if the list is sorted." }} />
  );
}
