// Unit CT3.1 — The Recursive Idea (rebuilt, typing-first)
// Base case + smaller problem + trust → countdown → factorial (stack stepper)
// → the missing-base-case RecursionError → sum of a list → power make-task.
// Hidden checks call the learner's functions directly.

import { useState } from "react";
import LessonShell, { P, KeyIdea } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const comments = (min) => ({ text: "#", min, msg: `Name the base case and the recursive case in at least ${min} # comment lines.` });

// ── Widget: the call stack of factorial(4) ──
function Stack() {
  const steps = [];
  for (let n = 4; n >= 0; n--) steps.push({ frames: Array.from({ length: 5 - n }, (_, k) => 4 - k), phase: n === 0 ? "base" : "down", d: n === 0 ? "factorial(0) is the base case: it returns 1 straight away. The stack stops growing." : `factorial(${n}) needs factorial(${n - 1}) first, so it waits and calls down.` });
  let r = 1;
  for (let n = 1; n <= 4; n++) { r *= n; steps.push({ frames: Array.from({ length: 5 - n }, (_, k) => 4 - k), phase: "up", ret: r, d: `factorial(${n}) gets its answer back and returns ${n} × ${r / n} = ${r}.` }); }
  const [k, setK] = useState(0);
  const s = steps[k];
  return (
    <div className="fh-two">
      <div>
        <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px" }}>{"def factorial(n):\n    if n == 0:            # base case\n        return 1\n    return n * factorial(n - 1)   # smaller problem\n\nprint(factorial(4))"}</pre>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={() => setK(Math.max(0, k - 1))} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, cursor: "pointer" }}>◀</button>
          <button onClick={() => setK(Math.min(steps.length - 1, k + 1))} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: T.navy, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Next ▶</button>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", flexDirection: "column-reverse", gap: 4 }}>
          {s.frames.map((n, i) => (
            <div key={i} style={{ fontFamily: CODE_FONT, padding: "6px 12px", borderRadius: 8, border: `1.5px solid ${i === s.frames.length - 1 ? (s.phase === "base" ? T.green : T.blue) : T.border}`, background: i === s.frames.length - 1 ? tint(s.phase === "base" ? T.green : T.blue, "12") : T.card }}>
              factorial({n}){i === s.frames.length - 1 && s.ret ? `  → returns ${s.ret}` : ""}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 14.5, color: T.slate, marginTop: 8 }}>{s.d}</div>
      </div>
    </div>
  );
}

const EX = {
  countdown: {
    id: "countdown", kind: "type", title: "A function that calls itself",
    task: <>Every recursive function has two parts: a <strong>base case</strong> that stops, and a <strong>recursive case</strong> that calls itself on a <em>smaller</em> problem.</>,
    show: 'def countdown(n):\n    if n == 0:\n        print("Lift off!")\n        return\n    print(n)\n    countdown(n - 1)\n\ncountdown(3)',
    tests: [{ expect: "3\n2\n1\nLift off!" }],
    requires: [{ node: "FunctionDef" }],
    hints: ["Each call handles one number and hands the rest (n - 1) to another call."],
    solution: 'def countdown(n):\n    if n == 0:\n        print("Lift off!")\n        return\n    print(n)\n    countdown(n - 1)\n\ncountdown(3)',
  },
  factorial: {
    id: "factorial", kind: "write", title: "Recursive factorial",
    task: <>Write <code>factorial(n)</code> recursively: 0! = 1 (base case); n! = n × (n − 1)! (recursive case). No loops. Ask <code>n: </code> and print <code>5! = 120</code>.</>,
    tests: [{ inputs: ["5"], expect: "n: 5\n5! = 120" }, { inputs: ["0"], expect: "n: 0\n0! = 1", hidden: true }],
    post: "assert factorial(10) == 3628800 and factorial(1) == 1",
    requires: [comments(2), { node: "FunctionDef" }],
    forbids: [{ node: "For", msg: "No loops — let the function call itself." }, { node: "While", msg: "No loops — let the function call itself." }],
    hints: ["if n == 0: return 1", "return n * factorial(n - 1)"],
    solution: '# base case: 0! = 1\n# recursive case: n! = n * (n-1)!\ndef factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nn = int(input("n: "))\nprint(f"{n}! = {factorial(n)}")',
  },
  nobase: {
    id: "nobase", kind: "fix", title: "No way to stop",
    task: <>Run it and read the coach. Add the missing base case so <code>total(4)</code> gives 1 + 2 + 3 + 4 = 10.</>,
    starter: 'def total(n):\n    return n + total(n - 1)\n\nprint(total(4))',
    tests: [{ expect: "10" }],
    post: "assert total(1) == 1 and total(100) == 5050",
    hints: ["What's the smallest problem whose answer you know without recursion? total(0) is 0."],
    solution: 'def total(n):\n    if n == 0:\n        return 0\n    return n + total(n - 1)\n\nprint(total(4))',
  },
  listsum: {
    id: "listsum", kind: "write", title: "Sum of a list, recursively",
    task: <>Write <code>list_sum(nums)</code> without loops: the sum of an empty list is 0; otherwise it's the first item plus the sum of the rest (<code>nums[1:]</code>). Ask <code>Numbers: </code> and print <code>Sum: 15</code>.</>,
    tests: [{ inputs: ["1 2 3 4 5"], expect: "Numbers: 1 2 3 4 5\nSum: 15" }, { inputs: ["7"], expect: "Numbers: 7\nSum: 7", hidden: true }],
    post: "assert list_sum([]) == 0 and list_sum([10, -3]) == 7",
    requires: [comments(2), { node: "FunctionDef" }],
    forbids: [{ call: "sum", msg: "Do it recursively — no sum( )." }, { node: "For", msg: "No loops inside the function." }],
    hints: ["if not nums: return 0", "return nums[0] + list_sum(nums[1:])"],
    solution: '# base case: empty list sums to 0\n# recursive case: first item + sum of the rest\ndef list_sum(nums):\n    if not nums:\n        return 0\n    return nums[0] + list_sum(nums[1:])\n\nnums = [int(x) for x in input("Numbers: ").split()]\nprint(f"Sum: {list_sum(nums)}")',
  },
  power: {
    id: "power", kind: "make", title: "Power, two ways",
    task: <>Write <code>power(b, e)</code> recursively (b<sup>0</sup> = 1; b<sup>e</sup> = b × b<sup>e−1</sup>), and <code>fast_power(b, e)</code> which halves the work: if e is even, b<sup>e</sup> = (b<sup>e/2</sup>)²; if odd, b × b<sup>e−1</sup>. Ask <code>Base: </code> and <code>Exponent: </code> and print <code>2 ^ 10 = 1024</code> using fast_power. Hidden checks compare both functions.</>,
    minLines: 16,
    tests: [{ inputs: ["2", "10"], expect: "Base: 2\nExponent: 10\n2 ^ 10 = 1024" }, { inputs: ["3", "0"], expect: "Base: 3\nExponent: 0\n3 ^ 0 = 1", hidden: true }],
    post: "for b, e in [(2, 0), (2, 1), (5, 3), (3, 13), (7, 20)]:\n    assert power(b, e) == b ** e, f'power({b}, {e}) is wrong'\n    assert fast_power(b, e) == b ** e, f'fast_power({b}, {e}) is wrong'",
    requires: [comments(3), { node: "FunctionDef", min: 2 }],
    forbids: [{ text: "**", msg: "No ** — build it from multiplication." }, { call: "pow" }],
    hints: ["fast_power: half = fast_power(b, e // 2); return half * half when e is even.", "Odd e: return b * fast_power(b, e - 1)."],
    solution: '# power: base e == 0 -> 1; otherwise b * power(b, e - 1)\n# fast_power: even e -> square of b^(e/2); odd e -> b * b^(e-1)\n# fast_power needs about log2(e) calls instead of e\ndef power(b, e):\n    if e == 0:\n        return 1\n    return b * power(b, e - 1)\n\ndef fast_power(b, e):\n    if e == 0:\n        return 1\n    if e % 2 == 0:\n        half = fast_power(b, e // 2)\n        return half * half\n    return b * fast_power(b, e - 1)\n\nb = int(input("Base: "))\ne = int(input("Exponent: "))\nprint(f"{b} ^ {e} = {fast_power(b, e)}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What are the two parts of every recursive function?", options: ["A loop and a counter", "A base case that stops, and a recursive case on a smaller problem", "Two functions", "print and return"], answer: 1, explain: "Without the base case it never stops; without shrinking, it never reaches the base." },
  { q: "What happens with no base case?", options: ["It returns None", "It calls itself until Python stops it with RecursionError", "It loops once", "Nothing"], answer: 1, explain: "Python allows about 1000 nested calls by default." },
  { q: "In factorial(4), which call finishes first?", options: ["factorial(4)", "factorial(0)", "They finish together", "factorial(2)"], answer: 1, explain: "The deepest call (the base case) returns first; the stack unwinds upwards (Unit 8.3)." },
  { q: "Why is fast_power faster?", options: ["It uses **", "Halving the exponent means about log₂(e) calls instead of e", "It loops", "It's not"], answer: 1, explain: "2^1000 needs about 14 calls instead of 1000." },
];

export default function UnitCT3_1(props) {
  const sections = [
    { label: "The Idea", kicker: "BASE · SMALLER · TRUST", title: "A function that calls itself", blocks: [<P>Some problems contain a smaller copy of themselves: 5! is 5 × 4!. A <strong>recursive</strong> function solves the small, obvious case directly and hands everything else to a call of itself on a smaller problem — trusting that call to work.</P>, EX.countdown] },
    { label: "The Stack", kicker: "UNIT 8.3, AGAIN", title: "Watch the stack grow and shrink", blocks: [<Stack />, EX.factorial, EX.nobase] },
    { label: "Lists", kicker: "FIRST + REST", title: "Recursion on a list", blocks: [EX.listsum, <KeyIdea>Recipe: (1) What's the smallest input I can answer directly? (2) How do I shrink the problem? (3) How do I combine the smaller answer into mine?</KeyIdea>] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: power, two ways", blocks: [EX.power] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT3_1" crumb="COMPUTATIONAL THINKING III › 1" title="The Recursive Idea" sections={sections} quiz={QUIZ}
      next={{ title: "CT III · 2 — Recursion in Action", text: "Fibonacci, the call tree that explodes — and memoisation, the fix." }} />
  );
}
