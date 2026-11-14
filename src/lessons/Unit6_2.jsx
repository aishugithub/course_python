// Unit 6.2 — The for Loop & range() (rebuilt on the typing-first lesson kit)
// while vs for → range(start, stop, step) incl. counting down → off-by-one →
// accumulate / count / multiply patterns → for-loop rewrite of 6.1 → FizzBuzz.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const codeBox = { margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre-wrap" };

// ── Widget: the three jobs for does for you ──
function WhileVsFor() {
  const [job, setJob] = useState(null);
  const JOBS = [
    { k: "create", c: T.blue, w: "i = 1", f: "for i in", d: "Create the counter" },
    { k: "check", c: T.purple, w: "while i <= 5:", f: "range(1, 6)", d: "Check when to stop" },
    { k: "change", c: T.orange, w: "i += 1", f: "(automatic)", d: "Move to the next value" },
  ];
  const hl = (k, txt) => <span style={{ background: job === k ? tint(JOBS.find((j) => j.k === k).c, "33") : "transparent", borderRadius: 4, fontWeight: job === k ? 700 : 400 }}>{txt}</span>;
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {JOBS.map((j) => (
          <button key={j.k} onMouseEnter={() => setJob(j.k)} onClick={() => setJob(j.k)} style={{ padding: "7px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, border: `1.5px solid ${j.c}`, background: job === j.k ? j.c : T.card, color: job === j.k ? "#fff" : j.c }}>{j.d}</button>
        ))}
      </div>
      <div className="fh-two">
        <div>
          <div style={{ fontWeight: 700, color: T.slate, marginBottom: 4 }}>while — you do all three jobs</div>
          <pre style={codeBox}>{hl("create", "i = 1")}{"\n"}{hl("check", "while i <= 5:")}{"\n    print(i)\n    "}{hl("change", "i += 1")}</pre>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: T.green, marginBottom: 4 }}>for — Python does them</div>
          <pre style={codeBox}>{hl("create", "for i in")} {hl("check", "range(1, 6)")}:{"\n    print(i)"}{job === "change" ? <span style={{ color: T.orange }}>{"\n    # i moves on by itself"}</span> : ""}</pre>
        </div>
      </div>
    </div>
  );
}

// ── Widget: range playground ──
function RangePlay() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(10);
  const [s, setS] = useState(2);
  const vals = [];
  if (s !== 0) for (let i = a; s > 0 ? i < b : i > b; i += s) { vals.push(i); if (vals.length > 60) break; }
  const sl = (label, v, set, min, max) => (
    <label style={{ display: "block", fontFamily: CODE_FONT, fontSize: 14 }}>{label} = <strong>{v}</strong>
      <input type="range" min={min} max={max} value={v} onChange={(e) => { const x = Number(e.target.value); set(label === "step" && x === 0 ? (v > 0 ? -1 : 1) : x); }} style={{ width: "100%", accentColor: T.navy }} />
    </label>
  );
  return (
    <div className="fh-two">
      <div>{sl("start", a, setA, -5, 15)}{sl("stop", b, setB, -5, 15)}{sl("step", s, setS, -3, 4)}</div>
      <div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 18, marginBottom: 8 }}>range({a}, {b}, {s})</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {vals.length ? vals.map((v) => <span key={v} style={{ fontFamily: CODE_FONT, padding: "4px 9px", borderRadius: 6, background: tint(T.teal, "18"), border: `1px solid ${T.teal}`, fontWeight: 700 }}>{v}</span>)
            : <span style={{ color: T.red, fontSize: 14.5 }}>Nothing at all — the loop body would run 0 times. {s > 0 ? "Counting up, but start isn't below stop." : "Counting down, but start isn't above stop."}</span>}
        </div>
        <div style={{ fontSize: 14, color: T.slate, marginTop: 10, lineHeight: 1.6 }}>Starts <strong>at</strong> start, stops <strong>before</strong> stop. A negative step counts down. <code>{b}</code> itself is never produced.</div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const lines = (arr) => arr.join("\n");
const fizz = (n) => Array.from({ length: n }, (_, k) => { const i = k + 1; return i % 15 === 0 ? "FizzBuzz" : i % 3 === 0 ? "Fizz" : i % 5 === 0 ? "Buzz" : String(i); });
const EX = {
  first: {
    id: "first", kind: "type", title: "Your first for loop",
    task: <>Same output as your first while loop in Unit 6.1 — in two lines.</>,
    show: 'for i in range(1, 6):\n    print(i)\nprint("Done")',
    tests: [{ expect: "1\n2\n3\n4\n5\nDone" }],
    requires: [{ node: "For" }],
    hints: ["range(1, 6) gives 1, 2, 3, 4, 5 — it stops BEFORE 6."],
    solution: 'for i in range(1, 6):\n    print(i)\nprint("Done")',
  },
  ranges: {
    id: "ranges", kind: "type", title: "Three ranges",
    task: <>Each loop prints its numbers on one line, using <code>end=" "</code> from Unit 4.5. The empty <code>print()</code> then ends the line. Predict all three lines first.</>,
    show: 'for i in range(5):\n    print(i, end=" ")\nprint()\nfor i in range(2, 11, 2):\n    print(i, end=" ")\nprint()\nfor i in range(10, 0, -1):\n    print(i, end=" ")',
    minLines: 9,
    tests: [{ expect: "0 1 2 3 4\n2 4 6 8 10\n10 9 8 7 6 5 4 3 2 1" }],
    hints: ["range(5) starts at 0. A negative step counts down."],
    solution: 'for i in range(5):\n    print(i, end=" ")\nprint()\nfor i in range(2, 11, 2):\n    print(i, end=" ")\nprint()\nfor i in range(10, 0, -1):\n    print(i, end=" ")',
  },
  week: {
    id: "week", kind: "fix", title: "Where did Sunday go?",
    task: <>The timetable should list all seven days, Day 1 to Day 7. Run it and fix the range.</>,
    starter: 'for day in range(1, 7):\n    print("Day", day)',
    tests: [{ expect: lines([1, 2, 3, 4, 5, 6, 7].map((d) => `Day ${d}`)) }],
    hints: ["The stop value is never produced. To include 7, stop at…?"],
    solution: 'for day in range(1, 8):\n    print("Day", day)',
  },
  evens: {
    id: "evens", kind: "write", title: "Sum of the even numbers",
    task: <>Ask <code>n: </code> and add up every even number from 2 to n (inclusive) using a for loop with a <strong>step of 2</strong>. Print <code>Sum of evens: 30</code> for n = 10.</>,
    tests: [
      { inputs: ["10"], expect: "n: 10\nSum of evens: 30" },
      { inputs: ["1"], expect: "n: 1\nSum of evens: 0", hidden: true },
      { inputs: ["7"], expect: "n: 7\nSum of evens: 12", hidden: true },
    ],
    requires: [{ node: "For" }],
    forbids: [{ node: "While", msg: "Use a for loop here." }],
    hints: ["range(2, n + 1, 2) — the + 1 makes n itself included.", "total = 0 before the loop, total += i inside."],
    solution: 'n = int(input("n: "))\ntotal = 0\nfor i in range(2, n + 1, 2):\n    total += i\nprint(f"Sum of evens: {total}")',
  },
  count35: {
    id: "count35", kind: "write", title: "Count with a condition inside",
    task: <>Ask <code>n: </code> and count how many numbers from 1 to n are divisible by 3 <strong>or</strong> 5. For n = 15 that's 3, 5, 6, 9, 10, 12, 15 → <code>Count: 7</code>.</>,
    tests: [
      { inputs: ["15"], expect: "n: 15\nCount: 7" },
      { inputs: ["10"], expect: "n: 10\nCount: 5", hidden: true },
      { inputs: ["2"], expect: "n: 2\nCount: 0", hidden: true },
    ],
    requires: [{ node: "For" }, { node: "If" }],
    hints: ["A counter starts at 0; add 1 only when the if is True.", "if i % 3 == 0 or i % 5 == 0:"],
    solution: 'n = int(input("n: "))\ncount = 0\nfor i in range(1, n + 1):\n    if i % 3 == 0 or i % 5 == 0:\n        count += 1\nprint(f"Count: {count}")',
  },
  factorial: {
    id: "factorial", kind: "write", title: "Factorial",
    task: <>n! = 1 × 2 × 3 × … × n, and by definition 0! = 1. Ask <code>n: </code> and print <code>5! = 120</code>. This time the accumulator <strong>multiplies</strong> — so what must it start at?</>,
    tests: [
      { inputs: ["5"], expect: "n: 5\n5! = 120" },
      { inputs: ["0"], expect: "n: 0\n0! = 1", hidden: true },
      { inputs: ["10"], expect: "n: 10\n10! = 3628800", hidden: true },
    ],
    requires: [{ node: "For" }],
    forbids: [{ text: "math.factorial", msg: "Build it with a loop." }, { text: "import math", msg: "Build it with a loop." }],
    hints: ["Starting at 0 would make every product 0. Start at 1.", "for i in range(1, n + 1): result *= i"],
    solution: 'n = int(input("n: "))\nresult = 1\nfor i in range(1, n + 1):\n    result *= i\nprint(f"{n}! = {result}")',
  },
  rewrite: {
    id: "rewrite", kind: "modify", title: "Countdown, the for way",
    task: <>Your countdown from Unit 6.1 is below, written with while. Rewrite it with a <strong>for</strong> loop and a counting-down range. The output must not change.</>,
    starter: 'n = int(input("Start from: "))\nwhile n >= 1:\n    print(n)\n    n -= 1\nprint("Lift off!")',
    tests: [
      { inputs: ["5"], expect: "Start from: 5\n5\n4\n3\n2\n1\nLift off!" },
      { inputs: ["0"], expect: "Start from: 0\nLift off!", hidden: true },
    ],
    requires: [{ node: "For" }],
    forbids: [{ node: "While", msg: "Replace the while loop with a for loop." }],
    hints: ["range(n, 0, -1) gives n, n-1, …, 1."],
    solution: 'n = int(input("Start from: "))\nfor i in range(n, 0, -1):\n    print(i)\nprint("Lift off!")',
  },
  fizzbuzz: {
    id: "fizzbuzz", kind: "make", title: "FizzBuzz",
    task: <>The most famous programming interview question. Ask <code>n: </code> and print the numbers 1 to n, one per line — but print <code>Fizz</code> for multiples of 3, <code>Buzz</code> for multiples of 5, and <code>FizzBuzz</code> for multiples of both.</>,
    minLines: 10,
    tests: [
      { inputs: ["15"], expect: "n: 15\n" + lines(fizz(15)) },
      { inputs: ["5"], expect: "n: 5\n" + lines(fizz(5)), hidden: true },
      { inputs: ["31"], expect: "n: 31\n" + lines(fizz(31)), hidden: true },
    ],
    requires: [{ node: "For" }, { text: "elif" }],
    hints: ["Check FizzBuzz (divisible by 15, or by 3 and 5) FIRST — Unit 5.2: the first True branch wins.", "if i % 15 == 0: … elif i % 3 == 0: … elif i % 5 == 0: … else: print(i)"],
    solution: 'n = int(input("n: "))\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What does range(5) produce?", options: ["1 2 3 4 5", "0 1 2 3 4", "0 1 2 3 4 5", "5"], answer: 1, explain: "Start defaults to 0, and the stop value 5 is never produced." },
  { q: "What does range(2, 10, 3) produce?", options: ["2 5 8", "2 5 8 11", "3 6 9", "2 4 6 8"], answer: 0, explain: "2, then +3 → 5, → 8. 11 would pass the stop of 10." },
  { q: "Which range counts 10 down to 1?", options: ["range(10, 1)", "range(10, 0, -1)", "range(1, 10, -1)", "range(10, 1, -1)"], answer: 1, explain: "Stop is excluded, so to reach 1 you stop at 0. range(10, 1, -1) would stop at 2." },
  { q: "What does this print?", code: "total = 1\nfor i in range(1, 4):\n    total *= i\nprint(total)", options: ["6", "0", "10", "24"], answer: 0, explain: "1 × 1 × 2 × 3 = 6. A product accumulator starts at 1." },
  { q: "Keep asking for a password until it's right. Which loop?", options: ["for i in range(10)", "while", "Either is equally natural", "No loop needed"], answer: 1, explain: "You can't know the number of attempts in advance — that's while's job. for is for a known count." },
  { q: "What does range(5, 5) produce?", options: ["5", "Nothing", "0 1 2 3 4", "Error"], answer: 1, explain: "Start isn't below stop, so the range is empty and the loop body runs 0 times." },
];

export default function Unit6_2(props) {
  const sections = [
    {
      label: "Why for?", kicker: "THE NEED", title: "for counts for you",
      blocks: [
        <P>Every counting while loop repeats the same three jobs, and forgetting one causes the bugs you fixed in Unit 6.1. <code>for</code> does all three for you. Click each job:</P>,
        <WhileVsFor />,
        EX.first,
      ],
    },
    {
      label: "range()", kicker: "START, STOP, STEP", title: "range(start, stop, step)",
      blocks: [
        <P><code>range</code> produces the numbers the loop walks through. Play with all three parts — including a negative step:</P>,
        <RangePlay />,
        EX.ranges,
        EX.week,
        <KeyIdea>Start is included, stop is <strong>not</strong>. To go from 1 to n inclusive: <code>range(1, n + 1)</code>. To count down to 1: <code>range(n, 0, -1)</code>.</KeyIdea>,
      ],
    },
    {
      label: "Loop Patterns", kicker: "ADD · COUNT · MULTIPLY", title: "Three patterns you'll use forever",
      blocks: [
        <P>Almost every loop question is one of these: <strong>add</strong> things up (start at 0), <strong>count</strong> things that pass a test (start at 0, add 1 inside an if), or <strong>multiply</strong> things together (start at 1).</P>,
        EX.evens,
        EX.count35,
        EX.factorial,
      ],
    },
    {
      label: "while or for?", kicker: "CHOOSING", title: "Which loop when?",
      blocks: [
        <P>Rule of thumb: you know how many rounds (or the range of values) → <code>for</code>. You're waiting for something to happen → <code>while</code>. A countdown has a known range, so it reads better as a for:</P>,
        EX.rewrite,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: FizzBuzz",
      blocks: [<P>A for loop with an if / elif / else chain inside — and a check on the order of conditions.</P>, EX.fizzbuzz],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit6_2" crumb="MODULE 6 › UNIT 6.2" title="The for Loop & range()" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 6.3 — break, continue & Nested Loops", text: "Escape early, skip a round, and put loops inside loops." }} />
  );
}
