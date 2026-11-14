// Unit CT1.5 — Capstone: Crack It Yourself (rebuilt, typing-first)
// One raw problem through the four moves: list, count and sum the primes up
// to N (v1) → measure the work: count the divisibility checks (v2) → a faster
// algorithm: only test divisors while d * d <= n (v3) → twin primes (make).

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import FourMoves from "../kit/FourMoves.jsx";
import { T } from "../kit/theme.js";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });

// reference simulations — they mirror the exact loops in the solutions
function primes(N, fast) {
  const list = []; let checks = 0;
  for (let n = 2; n <= N; n++) {
    let ok = true;
    if (fast) { for (let d = 2; d * d <= n; d++) { checks++; if (n % d === 0) { ok = false; break; } } }
    else { for (let d = 2; d < n; d++) { checks++; if (n % d === 0) { ok = false; break; } } }
    if (ok) list.push(n);
  }
  return { list, checks };
}
const out = (N, mode) => {
  const { list, checks } = primes(N, mode === "fast");
  const lines = [`N: ${N}`, `Primes: ${list.join(" ")}`, `Count: ${list.length}`, `Sum: ${list.reduce((a, b) => a + b, 0)}`];
  if (mode) lines.push(`Checks: ${checks}`);
  return lines.join("\n");
};
const twins = (N) => {
  const { list } = primes(N, true); const res = [];
  for (let i = 1; i < list.length; i++) if (list[i] - list[i - 1] === 2) res.push(`${list[i - 1]} & ${list[i]}`);
  return [`N: ${N}`, ...res, `Twin pairs: ${res.length}`].join("\n");
};

const V1 = '# 1. count = 0, total = 0\n# 2. for every n from 2 to N (the walk)\n# 3.     assume n is prime; try divisors 2..n-1; one hit -> not prime, stop\n# 4.     if prime: print it on the line, count it, add it\nN = int(input("N: "))\ncount = 0\ntotal = 0\nprint("Primes:", end=" ")\nfor n in range(2, N + 1):\n    is_prime = True\n    for d in range(2, n):\n        if n % d == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(n, end=" ")\n        count += 1\n        total += n\nprint()\nprint(f"Count: {count}")\nprint(f"Sum: {total}")';
const V2 = V1.replace("total = 0\n", "total = 0\nchecks = 0\n").replace("    for d in range(2, n):\n", "    for d in range(2, n):\n        checks += 1\n") + '\nprint(f"Checks: {checks}")';
const V3 = V2.replace("    for d in range(2, n):\n        checks += 1\n        if n % d == 0:\n            is_prime = False\n            break\n", "    d = 2\n    while d * d <= n:\n        checks += 1\n        if n % d == 0:\n            is_prime = False\n            break\n        d += 1\n");

const EX = {
  v1: {
    id: "v1", kind: "write", title: "Version 1 — list, count and sum the primes",
    task: <>Ask <code>N: </code>. Print every prime from 2 to N on one line after <code>Primes:</code>, then <code>Count: 10</code> and <code>Sum: 129</code> (for N = 30). Write the four-move plan as comments first.</>,
    minLines: 20,
    tests: [{ inputs: ["30"], expect: out(30) }, { inputs: ["2"], expect: out(2), hidden: true }, { inputs: ["100"], expect: out(100), hidden: true }],
    requires: [comments(4), { node: "For", min: 2 }, { node: "Break" }],
    hints: ['print("Primes:", end=" ") before the loop; print(n, end=" ") for each prime; print() after.', "Inner loop: for d in range(2, n) with the flag pattern from CT1.3."],
    solution: V1,
  },
  v2: {
    id: "v2", kind: "modify", title: "Version 2 — measure the work",
    task: <>How hard is the computer working? Add a counter <code>checks</code> that goes up by 1 every time a <code>n % d</code> test runs, and print <code>Checks: …</code> at the end. Try N = 1000 and look at the number.</>,
    starter: V1,
    minLines: 22,
    tests: [{ inputs: ["30"], expect: out(30, "slow") }, { inputs: ["100"], expect: out(100, "slow"), hidden: true }],
    requires: [{ node: "AugAssign", min: 3, msg: "Add checks += 1 inside the inner loop." }],
    hints: ["checks = 0 before both loops; checks += 1 as the first line of the inner loop."],
    solution: V2,
  },
  v3: {
    id: "v3", kind: "modify", title: "Version 3 — a smarter algorithm",
    task: <>If n has a divisor bigger than √n, it also has one smaller than √n (36 = 4 × 9: you meet 4 first). So you only need to test <code>d</code> while <code>d * d &lt;= n</code>. Replace the inner for loop with a while loop that stops there. Same primes — compare the Checks number with Version 2.</>,
    starter: V2,
    minLines: 24,
    tests: [{ inputs: ["30"], expect: out(30, "fast") }, { inputs: ["100"], expect: out(100, "fast"), hidden: true }],
    requires: [{ node: "While" }, { text: "d * d", msg: "Stop testing when d * d is bigger than n." }],
    hints: ["d = 2\nwhile d * d <= n:\n    checks += 1\n    …\n    d += 1", "Don't forget d += 1 at the end of the while body — or it never ends (Unit 6.1)."],
    solution: V3,
  },
  twins: {
    id: "twins", kind: "make", title: "Twin primes",
    task: <>Twin primes are primes two apart: 3 & 5, 5 & 7, 11 & 13. Ask <code>N: </code> and print every twin pair up to N, one per line as <code>11 &amp; 13</code>, then <code>Twin pairs: 4</code>. Hint for decomposition: remember the <em>previous</em> prime as you walk.</>,
    minLines: 18,
    tests: [{ inputs: ["30"], expect: twins(30) }, { inputs: ["4"], expect: twins(4), hidden: true }, { inputs: ["200"], expect: twins(200), hidden: true }],
    requires: [comments(4), { node: "While" }],
    hints: ["prev = 0 before the walk (meaning: no prime yet). When n is prime: if prev > 0 and n - prev == 2: it's a pair. Then prev = n.", "Use the fast d * d <= n check for each n."],
    solution: '# 1. prev = 0 (no prime yet), pairs = 0\n# 2. walk n from 2 to N, testing each with the fast check\n# 3.     if n is prime and a previous prime exists and n - prev == 2: print the pair\n# 4.     if n is prime: prev = n\nN = int(input("N: "))\nprev = 0\npairs = 0\nfor n in range(2, N + 1):\n    is_prime = True\n    d = 2\n    while d * d <= n:\n        if n % d == 0:\n            is_prime = False\n            break\n        d += 1\n    if is_prime:\n        if prev > 0 and n - prev == 2:\n            print(f"{prev} & {n}")\n            pairs += 1\n        prev = n\nprint(f"Twin pairs: {pairs}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Which part of the primes program is a nested loop?", options: ["The walk 2..N", "The divisor test inside the walk", "The final prints", "None"], answer: 1, explain: "For each candidate n (outer), try divisors (inner)." },
  { q: "Why is testing up to √n enough?", options: ["It isn't", "Divisors come in pairs; the smaller one of each pair is ≤ √n", "Primes are small", "Python's rule"], answer: 1, explain: "If n = a × b with a ≤ b, then a ≤ √n — so you'd have found a." },
  { q: "Why count the checks?", options: ["Required", "To measure how much work an algorithm does — and compare two algorithms", "To find primes", "To print them"], answer: 1, explain: "Same answer, far less work: that's what a better algorithm means." },
  { q: "Which is the abstraction in “count and sum the primes”?", options: ["The number 30", "Two accumulators updated only when a test passes", "print", "range"], answer: 1, explain: "Strip the story: filter + two accumulators." },
];

export default function UnitCT1_5(props) {
  const sections = [
    {
      label: "The Challenge", kicker: "CAPSTONE", title: "Crack it yourself",
      blocks: [
        <P>No new syntax — just a raw problem: <strong>list, count and add up all the prime numbers up to N.</strong> Work through the four moves before you type a single line:</P>,
        <FourMoves problem="List, count and sum the primes from 2 to N."
          answers={{ decompose: "(a) walk every number from 2 to N · (b) decide whether each one is prime · (c) for primes: print, count, add.", pattern: "Job (a) repeats for every n → outer loop. Job (b) itself repeats for every possible divisor → inner loop. A loop inside a loop.", abstract: "Job (b) is the flag pattern (CT1.3): assume prime, one divisor proves otherwise. Job (c) is two accumulators (CT1.1).", algorithm: "count = 0, total = 0\nfor n from 2 to N:\n    is_prime = True\n    for d from 2 to n - 1:\n        if d divides n: is_prime = False, stop\n    if is_prime: print n, count += 1, total += n\nprint count and total" }} />,
        <Note color={T.blue} icon="🧱">Three versions again: get it right, measure it, make it faster.</Note>,
      ],
    },
    { label: "Version 1", kicker: "GET IT RIGHT", title: "Version 1: the primes", blocks: [EX.v1] },
    { label: "Version 2", kicker: "MEASURE IT", title: "Version 2: count the work", blocks: [EX.v2] },
    { label: "Version 3", kicker: "MAKE IT FASTER", title: "Version 3: stop at √n", blocks: [EX.v3, <KeyIdea>Two correct programs can do wildly different amounts of work. Choosing the algorithm, not typing faster, is what makes programs fast. (Computer scientists call this complexity.)</KeyIdea>] },
    { label: "Make It", kicker: "ON YOUR OWN", title: "Your program: twin primes", blocks: [EX.twins] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT1_5" crumb="COMPUTATIONAL THINKING I › 5" title="Capstone: Crack It Yourself" sections={sections} quiz={QUIZ}
      next={{ title: "Module 7 — Organizing Data", text: "CT I complete! Next: strings, lists, tuples, dictionaries and sets. (Optional first: CT I's Crucible.)" }} />
  );
}
