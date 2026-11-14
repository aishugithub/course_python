// Unit CT1.1 — The Four Moves & the Accumulator (rebuilt, typing-first)
// Plan in # comments first, then code. New problems (Module 6 already did
// sum 1..n and factorial): sum of squares, average of N inputs, harmonic
// series, product of odds, year-by-year savings, fuel log.
// Scaffolding: only Modules 4–6 (no lists, no functions yet).

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import FourMoves from "../kit/FourMoves.jsx";
import { T } from "../kit/theme.js";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });
const harm = (n) => { let s = 0; for (let i = 1; i <= n; i++) s += 1 / i; return s.toFixed(2); };
const oddProd = (n) => { let p = 1; for (let i = 1; i <= n; i += 2) p *= i; return p; };
const grow = (p, r, y) => { const out = []; let b = p; for (let k = 1; k <= y; k++) { b *= 1 + r / 100; out.push(`Year ${k}: Rs ${b.toFixed(2)}`); } return out.join("\n"); };

const EX = {
  squares: {
    id: "squares", kind: "complete", title: "Plan, then code: sum of squares",
    task: <>The plan is written as comments. Fill the blanks so the code follows it: 1² + 2² + … + n². For n = 4: 1 + 4 + 9 + 16 = 30.</>,
    starter: '# Algorithm\n# 1. total starts at 0\n# 2. for every i from 1 to n\n# 3.     add i squared to total\n# 4. print total\nn = int(input("n: "))\ntotal = ___\nfor i in range(1, ___):\n    total += ___\nprint(f"Sum of squares: {total}")',
    minLines: 10,
    tests: [{ inputs: ["4"], expect: "n: 4\nSum of squares: 30" }, { inputs: ["10"], expect: "n: 10\nSum of squares: 385", hidden: true }, { inputs: ["1"], expect: "n: 1\nSum of squares: 1", hidden: true }],
    hints: ["range must reach n, so stop at n + 1.", "i * i (or i ** 2)."],
    solution: '# Algorithm\n# 1. total starts at 0\n# 2. for every i from 1 to n\n# 3.     add i squared to total\n# 4. print total\nn = int(input("n: "))\ntotal = 0\nfor i in range(1, n + 1):\n    total += i * i\nprint(f"Sum of squares: {total}")',
  },
  average: {
    id: "average", kind: "write", title: "Average of N marks",
    task: <>Ask <code>How many students: </code>, then ask <code>Mark: </code> that many times. Print <code>Average: 72.50</code> (2 decimals). Start with your 4-line algorithm as comments.</>,
    tests: [
      { inputs: ["4", "70", "85", "60", "75"], expect: "How many students: 4\nMark: 70\nMark: 85\nMark: 60\nMark: 75\nAverage: 72.50" },
      { inputs: ["1", "33"], expect: "How many students: 1\nMark: 33\nAverage: 33.00", hidden: true },
    ],
    requires: [comments(3), { node: "For" }],
    hints: ["The loop runs n times: for i in range(n): — read a mark inside and add it to total.", "Average = total / n, printed with :.2f"],
    solution: '# 1. read how many students\n# 2. total = 0, then read each mark and add it\n# 3. average = total / count\n# 4. print it\nn = int(input("How many students: "))\ntotal = 0\nfor i in range(n):\n    total += int(input("Mark: "))\nprint(f"Average: {total / n:.2f}")',
  },
  harmonic: {
    id: "harmonic", kind: "write", title: "A series that keeps growing",
    task: <>Ask <code>n: </code> and print the sum 1 + 1/2 + 1/3 + … + 1/n, to 2 decimals: <code>Sum: 2.28</code> for n = 5. Same accumulator, a different thing added each round.</>,
    tests: [{ inputs: ["5"], expect: `n: 5\nSum: ${harm(5)}` }, { inputs: ["1"], expect: `n: 1\nSum: ${harm(1)}`, hidden: true }, { inputs: ["10"], expect: `n: 10\nSum: ${harm(10)}`, hidden: true }],
    requires: [comments(3), { node: "For" }],
    hints: ["total += 1 / i"],
    solution: '# 1. total = 0\n# 2. for i from 1 to n\n# 3.     add 1 / i\n# 4. print total to 2 decimals\nn = int(input("n: "))\ntotal = 0\nfor i in range(1, n + 1):\n    total += 1 / i\nprint(f"Sum: {total:.2f}")',
  },
  odds: {
    id: "odds", kind: "write", title: "Product of the odd numbers",
    task: <>Ask <code>n: </code> and multiply every odd number from 1 to n: for 9, 1 × 3 × 5 × 7 × 9 = <code>Product: 945</code>. Which number must a product accumulator start at?</>,
    tests: [{ inputs: ["9"], expect: `n: 9\nProduct: ${oddProd(9)}` }, { inputs: ["1"], expect: "n: 1\nProduct: 1", hidden: true }, { inputs: ["4"], expect: `n: 4\nProduct: ${oddProd(4)}`, hidden: true }],
    requires: [comments(3)],
    hints: ["range(1, n + 1, 2) visits only the odd numbers.", "Start at 1 — starting at 0 makes every product 0."],
    solution: '# 1. product = 1\n# 2. for each odd i from 1 to n\n# 3.     product *= i\n# 4. print it\nn = int(input("n: "))\nproduct = 1\nfor i in range(1, n + 1, 2):\n    product *= i\nprint(f"Product: {product}")',
  },
  savings: {
    id: "savings", kind: "write", title: "Savings, year by year",
    task: <>Ask <code>Deposit: </code>, <code>Rate %: </code> and <code>Years: </code>. Each year the balance grows by the rate (compound interest). Print the balance after every year: <code>Year 1: Rs 10500.00</code>. The accumulator is the balance itself — updated, then printed, each round.</>,
    tests: [
      { inputs: ["10000", "5", "3"], expect: "Deposit: 10000\nRate %: 5\nYears: 3\n" + grow(10000, 5, 3) },
      { inputs: ["5000", "8", "2"], expect: "Deposit: 5000\nRate %: 8\nYears: 2\n" + grow(5000, 8, 2), hidden: true },
    ],
    requires: [comments(3), { node: "For" }],
    hints: ["balance *= 1 + rate / 100", "Print inside the loop, so every year appears."],
    solution: '# 1. balance starts at the deposit\n# 2. for each year 1..years\n# 3.     grow balance by rate %, then print it\n# 4. (no print after the loop needed)\nbalance = float(input("Deposit: "))\nrate = float(input("Rate %: "))\nyears = int(input("Years: "))\nfor year in range(1, years + 1):\n    balance *= 1 + rate / 100\n    print(f"Year {year}: Rs {balance:.2f}")',
  },
  fuel: {
    id: "fuel", kind: "make", title: "Fuel log",
    task: <>Ask <code>Trips: </code>, then for each trip ask <code>Km: </code> and <code>Litres: </code> (decimals). Print <code>Total km: 420.0</code>, <code>Total litres: 28.0</code> and <code>Mileage: 15.0 km/l</code> (1 decimal each). Plan first, in comments — this one needs <strong>two</strong> accumulators.</>,
    minLines: 12,
    tests: [
      { inputs: ["3", "120", "8", "200", "13", "100", "7"], expect: "Trips: 3\nKm: 120\nLitres: 8\nKm: 200\nLitres: 13\nKm: 100\nLitres: 7\nTotal km: 420.0\nTotal litres: 28.0\nMileage: 15.0 km/l" },
      { inputs: ["1", "55.5", "3.7"], expect: "Trips: 1\nKm: 55.5\nLitres: 3.7\nTotal km: 55.5\nTotal litres: 3.7\nMileage: 15.0 km/l", hidden: true },
    ],
    requires: [comments(4), { node: "For" }],
    hints: ["km_total = 0 and litre_total = 0 before the loop.", "Mileage = km_total / litre_total."],
    solution: '# 1. two totals start at 0\n# 2. for each trip: read km and litres\n# 3.     add each to its own total\n# 4. print totals and km_total / litre_total\ntrips = int(input("Trips: "))\nkm_total = 0\nlitre_total = 0\nfor t in range(trips):\n    km_total += float(input("Km: "))\n    litre_total += float(input("Litres: "))\nprint(f"Total km: {km_total:.1f}")\nprint(f"Total litres: {litre_total:.1f}")\nprint(f"Mileage: {km_total / litre_total:.1f} km/l")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Which move is “strip away the story and keep the bare rule”?", options: ["Decompose", "Pattern", "Abstraction", "Algorithm"], answer: 2, explain: "Marks, rupees or km — abstraction keeps only the rule: start at 0, add each value." },
  { q: "Where must an accumulator be created?", options: ["Inside the loop", "Before the loop", "After the loop", "Anywhere"], answer: 1, explain: "Inside the loop it would reset every round." },
  { q: "A product accumulator starts at…", options: ["0", "1", "n", "None"], answer: 1, explain: "1 is the multiplying identity; 0 would wipe everything out." },
  { q: "What's the value of writing the algorithm as comments before coding?", options: ["Python needs it", "You solve the problem in plain words first; translating to code becomes the easy part", "It runs faster", "No value"], answer: 1, explain: "Separate thinking from typing — the core habit of computational thinking." },
];

export default function UnitCT1_1(props) {
  const sections = [
    {
      label: "Four Moves", kicker: "THINK BEFORE YOU TYPE", title: "The four moves behind every program",
      blocks: [
        <P>You now know the syntax of Modules 4–6. The hard part is turning a problem into steps. Programmers use four moves — click through them on a small problem:</P>,
        <FourMoves problem="Add up the squares 1² + 2² + … + n²."
          answers={{ decompose: "Somewhere to keep the answer · visit each number · square it · add it in · show the result.", pattern: "“Square it and add it” happens once for every number from 1 to n — repetition, so a loop.", abstract: "It's the accumulator: start at 0, add one value per round. Only WHAT is added changes (i × i).", algorithm: "total = 0\nfor i from 1 to n:\n    total = total + i * i\nprint total" }} />,
        <Note color={T.blue} icon="✍️">In this strand every program starts with its algorithm written as <code>#</code> comments. The checker looks for them.</Note>,
        EX.squares,
      ],
    },
    {
      label: "Accumulators", kicker: "ONE PATTERN, MANY PROBLEMS", title: "The accumulator, re-skinned",
      blocks: [EX.average, EX.harmonic, EX.odds, <KeyIdea>Add → start at 0. Multiply → start at 1. Each round, change only <em>what</em> you add or multiply.</KeyIdea>],
    },
    { label: "Over Time", kicker: "ACCUMULATE AND REPORT", title: "An accumulator you print every round", blocks: [EX.savings] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: fuel log", blocks: [EX.fuel] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT1_1" crumb="COMPUTATIONAL THINKING I › 1" title="The Four Moves & the Accumulator" sections={sections} quiz={QUIZ}
      next={{ title: "CT I · 2 — Counting & Building with Loops", text: "Peel numbers apart digit by digit, and build new numbers from the pieces." }} />
  );
}
