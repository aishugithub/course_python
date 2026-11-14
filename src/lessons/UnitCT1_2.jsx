// Unit CT1.2 — Counting & Building with Loops (rebuilt, typing-first)
// The digit peel (n % 10, n // 10) as an algorithm tool: count even digits,
// palindrome number, Armstrong number, power without **, decimal → binary,
// digital root (a loop inside a loop). Plan-first comments required.

import { useState } from "react";
import LessonShell, { P, KeyIdea } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });
const noStr = [{ call: "str", msg: "Work with % 10 and // 10 — no converting to text." }, { node: "Slice", msg: "No slicing — peel digits with arithmetic." }];

// ── Widget: peel and rebuild ──
function Peel() {
  const [n0, setN0] = useState(4729);
  const steps = []; let n = n0, rev = 0;
  while (n > 0) { const d = n % 10; rev = rev * 10 + d; steps.push({ n, d, rest: Math.floor(n / 10), rev }); n = Math.floor(n / 10); }
  return (
    <div>
      <label style={{ fontFamily: CODE_FONT }}>n = <input type="number" value={n0} min={1} max={99999999} onChange={(e) => setN0(Math.max(1, Math.min(99999999, Math.trunc(Number(e.target.value) || 1))))} style={{ width: 130, fontFamily: CODE_FONT, fontSize: 15, padding: "6px 8px", borderRadius: 6, border: `1.5px solid ${T.borderStrong}` }} /></label>
      <div style={{ marginTop: 10, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden", maxWidth: 640 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: T.deep, fontFamily: CODE_FONT, fontSize: 13, padding: "6px 10px", fontWeight: 700 }}><span>n</span><span>n % 10</span><span>n // 10</span><span>rev*10 + digit</span></div>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", fontFamily: CODE_FONT, fontSize: 14.5, padding: "6px 10px", background: i % 2 ? T.surface : T.card }}>
            <span>{s.n}</span><span style={{ color: T.teal, fontWeight: 700 }}>{s.d}</span><span>{s.rest}</span><span style={{ color: T.purple, fontWeight: 700 }}>{s.rev}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 14, color: T.slate, marginTop: 8 }}>Each round peels the last digit off and pushes it onto a growing number. When n reaches 0, the loop stops — however many digits there were.</div>
    </div>
  );
}

const isArm = (n) => { const s = String(n); return [...s].reduce((a, c) => a + Number(c) ** s.length, 0) === n; };
const root = (n) => { let steps = 0; while (n >= 10) { let t = 0; while (n > 0) { t += n % 10; n = Math.floor(n / 10); } n = t; steps++; } return [n, steps]; };

const EX = {
  evens: {
    id: "evens", kind: "write", title: "Count the even digits",
    task: <>Ask <code>Number: </code> (positive). Print how many of its digits are even: 482173 → <code>Even digits: 3</code>.</>,
    tests: [{ inputs: ["482173"], expect: "Number: 482173\nEven digits: 3" }, { inputs: ["13579"], expect: "Number: 13579\nEven digits: 0", hidden: true }, { inputs: ["2468"], expect: "Number: 2468\nEven digits: 4", hidden: true }],
    requires: [comments(3), { node: "While" }],
    forbids: noStr,
    hints: ["Peel: d = n % 10 — if d % 2 == 0, count it — then n //= 10."],
    solution: '# 1. count = 0\n# 2. while digits remain: look at the last digit\n# 3.     if it is even, count it; drop it\n# 4. print count\nn = int(input("Number: "))\ncount = 0\nwhile n > 0:\n    if n % 10 % 2 == 0:\n        count += 1\n    n //= 10\nprint(f"Even digits: {count}")',
  },
  palindrome: {
    id: "palindrome", kind: "write", title: "Palindrome number",
    task: <>A palindrome reads the same backwards: 12321. Ask <code>Number: </code>, reverse it with the peel (keep the original in another variable!), and print <code>12321 is a palindrome</code> or <code>1231 is not a palindrome</code>.</>,
    tests: [
      { inputs: ["12321"], expect: "Number: 12321\n12321 is a palindrome" },
      { inputs: ["1231"], expect: "Number: 1231\n1231 is not a palindrome", hidden: true },
      { inputs: ["7"], expect: "Number: 7\n7 is a palindrome", hidden: true },
    ],
    requires: [comments(3), { node: "While" }],
    forbids: noStr,
    hints: ["The loop destroys n — copy it first: original = n.", "rev = rev * 10 + n % 10, then compare rev == original."],
    solution: '# 1. keep a copy of the number\n# 2. build the reverse digit by digit\n# 3. compare reverse with the copy\n# 4. print the verdict\nn = int(input("Number: "))\noriginal = n\nrev = 0\nwhile n > 0:\n    rev = rev * 10 + n % 10\n    n //= 10\nif rev == original:\n    print(f"{original} is a palindrome")\nelse:\n    print(f"{original} is not a palindrome")',
  },
  armstrong: {
    id: "armstrong", kind: "write", title: "Armstrong number",
    task: <>An Armstrong number equals the sum of its digits, each raised to the power of the number of digits: 153 = 1³ + 5³ + 3³. Ask <code>Number: </code> and print <code>153 is an Armstrong number</code> or <code>154 is not an Armstrong number</code>. Decompose: you need two passes over the digits.</>,
    tests: [
      { inputs: ["153"], expect: `Number: 153\n153 is ${isArm(153) ? "an" : "not an"} Armstrong number` },
      { inputs: ["154"], expect: "Number: 154\n154 is not an Armstrong number", hidden: true },
      { inputs: ["9474"], expect: `Number: 9474\n9474 is ${isArm(9474) ? "an" : "not an"} Armstrong number`, hidden: true },
      { inputs: ["5"], expect: "Number: 5\n5 is an Armstrong number", hidden: true },
    ],
    requires: [comments(4), { node: "While", min: 2 }],
    forbids: noStr,
    hints: ["Pass 1 counts the digits. Pass 2 adds digit ** count. Each pass needs its own fresh copy of n.", "temp = n; while temp > 0: digits += 1; temp //= 10"],
    solution: '# 1. count the digits (first pass)\n# 2. add each digit ** count (second pass)\n# 3. compare the sum with the number\n# 4. print the verdict\nn = int(input("Number: "))\ndigits = 0\ntemp = n\nwhile temp > 0:\n    digits += 1\n    temp //= 10\ntotal = 0\ntemp = n\nwhile temp > 0:\n    total += (temp % 10) ** digits\n    temp //= 10\nif total == n:\n    print(f"{n} is an Armstrong number")\nelse:\n    print(f"{n} is not an Armstrong number")',
  },
  power: {
    id: "power", kind: "write", title: "Power without **",
    task: <>Ask <code>Base: </code> and <code>Exponent: </code> (whole numbers, exponent ≥ 0) and compute the power with a multiplying accumulator — no <code>**</code>, no <code>pow</code>. Print <code>2 ^ 10 = 1024</code>.</>,
    tests: [{ inputs: ["2", "10"], expect: "Base: 2\nExponent: 10\n2 ^ 10 = 1024" }, { inputs: ["7", "0"], expect: "Base: 7\nExponent: 0\n7 ^ 0 = 1", hidden: true }, { inputs: ["3", "4"], expect: "Base: 3\nExponent: 4\n3 ^ 4 = 81", hidden: true }],
    requires: [comments(3), { node: "For" }],
    forbids: [{ text: "**", msg: "Multiply in a loop instead of **." }, { call: "pow" }],
    hints: ["result = 1; repeat exponent times: result *= base."],
    solution: '# 1. result = 1\n# 2. repeat exponent times\n# 3.     multiply result by base\n# 4. print\nbase = int(input("Base: "))\nexp = int(input("Exponent: "))\nresult = 1\nfor i in range(exp):\n    result *= base\nprint(f"{base} ^ {exp} = {result}")',
  },
  binary: {
    id: "binary", kind: "write", title: "Decimal to binary",
    task: <>Same peel, base 2: <code>n % 2</code> is the last binary digit, <code>n // 2</code> drops it. Build the answer as text, adding each new bit on the <strong>left</strong>: <code>bits = str(n % 2) + bits</code>. Ask <code>Number: </code> and print <code>13 in binary is 1101</code>. Careful with 0.</>,
    tests: [
      { inputs: ["13"], expect: "Number: 13\n13 in binary is 1101" },
      { inputs: ["0"], expect: "Number: 0\n0 in binary is 0", hidden: true },
      { inputs: ["64"], expect: "Number: 64\n64 in binary is 1000000", hidden: true },
    ],
    requires: [comments(3), { node: "While" }],
    forbids: [{ call: "bin", msg: "Build it yourself with % 2 and // 2." }, { call: "format" }],
    hints: ["Keep the original for the final message.", 'If n is 0 the loop never runs — handle it: bits = "0".'],
    solution: '# 1. keep the original; bits starts empty\n# 2. while n > 0: put n % 2 in front of bits, n //= 2\n# 3. if bits is still empty, the number was 0\n# 4. print\nn = int(input("Number: "))\noriginal = n\nbits = ""\nwhile n > 0:\n    bits = str(n % 2) + bits\n    n //= 2\nif bits == "":\n    bits = "0"\nprint(f"{original} in binary is {bits}")',
  },
  digitalroot: {
    id: "digitalroot", kind: "make", title: "Digital root",
    task: <>Add up the digits of a number; if the answer has more than one digit, do it again — until one digit is left. 9875 → 29 → 11 → 2. Ask <code>Number: </code> and print <code>Digital root: 2</code> and <code>Rounds: 3</code>. Decompose first: it's a digit-sum loop <strong>inside</strong> a repeat-until loop.</>,
    minLines: 14,
    tests: [
      { inputs: ["9875"], expect: `Number: 9875\nDigital root: ${root(9875)[0]}\nRounds: ${root(9875)[1]}` },
      { inputs: ["7"], expect: "Number: 7\nDigital root: 7\nRounds: 0", hidden: true },
      { inputs: ["99999999"], expect: `Number: 99999999\nDigital root: ${root(99999999)[0]}\nRounds: ${root(99999999)[1]}`, hidden: true },
    ],
    requires: [comments(4), { node: "While", min: 2 }],
    forbids: noStr,
    hints: ["Outer: while n >= 10. Inner: total = 0; while n > 0: peel and add. Then n = total; rounds += 1."],
    solution: '# 1. rounds = 0\n# 2. while n has two or more digits:\n# 3.     replace n by the sum of its digits (inner peel loop)\n# 4.     count the round; finally print n and rounds\nn = int(input("Number: "))\nrounds = 0\nwhile n >= 10:\n    total = 0\n    while n > 0:\n        total += n % 10\n        n //= 10\n    n = total\n    rounds += 1\nprint(f"Digital root: {n}")\nprint(f"Rounds: {rounds}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why a while loop (not for) to process digits?", options: ["Faster", "You don't know in advance how many digits there are", "for can't use %", "No reason"], answer: 1, explain: "Repeat until n becomes 0 — however long that takes." },
  { q: "Why copy n before reversing it?", options: ["Style", "The loop reduces n to 0, so the original is gone unless you saved it", "Python requires it", "To make it faster"], answer: 1, explain: "original = n before the loop." },
  { q: "What does 13 // 2 and 13 % 2 give?", options: ["6 and 1", "6.5 and 0", "7 and 1", "6 and 0"], answer: 0, explain: "Binary digits come from % 2, collected right to left." },
  { q: "The Armstrong check needs the number of digits before summing. That's which move?", options: ["Pattern", "Decomposition — splitting the task into two passes", "Abstraction", "None"], answer: 1, explain: "Two smaller jobs: count, then sum powers." },
];

export default function UnitCT1_2(props) {
  const sections = [
    {
      label: "The Peel", kicker: "% 10 AND // 10", title: "Taking a number apart, digit by digit",
      blocks: [<P>From Unit 6.1: <code>n % 10</code> is the last digit, <code>n // 10</code> drops it. In a loop, that peels a whole number. Type any number:</P>, <Peel />, EX.evens],
    },
    {
      label: "Build Numbers", kicker: "REVERSE · CHECK", title: "Building a new number from the pieces",
      blocks: [EX.palindrome, EX.armstrong, <KeyIdea>Destructive loops (n //= 10) eat their input. If you'll need the number again, copy it first.</KeyIdea>],
    },
    { label: "Other Bases", kicker: "MULTIPLY · BASE 2", title: "Same patterns, new problems", blocks: [EX.power, EX.binary] },
    { label: "Make It", kicker: "LOOP INSIDE A LOOP", title: "Your program: digital root", blocks: [EX.digitalroot] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT1_2" crumb="COMPUTATIONAL THINKING I › 2" title="Counting & Building with Loops" sections={sections} quiz={QUIZ}
      next={{ title: "CT I · 3 — Deciding Inside a Loop", text: "Flags and verdicts: perfect numbers, GCD and LCM, and “is every digit odd?”." }} />
  );
}
