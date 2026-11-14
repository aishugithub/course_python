// Unit 6.3 — break, continue & Nested Loops (rebuilt on the typing-first lesson kit)
// break vs continue (step-through) → while True + break → the flag pattern →
// continue to skip → nested loops (grid stepper, triangles) → prime checker.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const codeBox = { margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre-wrap" };
const btn = (on, c = T.navy) => ({ padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${on ? c : T.border}`, background: on ? c : T.card, color: on ? "#fff" : T.text, fontWeight: 700, cursor: "pointer", fontFamily: CODE_FONT });

// ── Widget: break vs continue on the same loop ──
function BreakVsContinue() {
  const [kw, setKw] = useState("break");
  const rounds = [1, 2, 3, 4, 5, 6].map((i) => {
    if (i === 3) return { i, s: kw === "break" ? "stop" : "skip" };
    if (kw === "break" && i > 3) return { i, s: "never" };
    return { i, s: "print" };
  });
  return (
    <div className="fh-two">
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <button onClick={() => setKw("break")} style={btn(kw === "break", T.red)}>break</button>
          <button onClick={() => setKw("continue")} style={btn(kw === "continue", T.orange)}>continue</button>
        </div>
        <pre style={codeBox}>{`for i in range(1, 7):\n    if i == 3:\n        ${kw}\n    print(i)\nprint("after the loop")`}</pre>
      </div>
      <div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {rounds.map(({ i, s }) => {
            const c = s === "print" ? T.green : s === "skip" ? T.orange : s === "stop" ? T.red : T.muted;
            return (
              <div key={i} style={{ width: 92, textAlign: "center", borderRadius: 10, padding: "8px 4px", border: `1.5px solid ${c}`, background: s === "never" ? T.deep : tint(c, "12"), opacity: s === "never" ? 0.55 : 1 }}>
                <div style={{ fontFamily: CODE_FONT, fontWeight: 700 }}>i = {i}</div>
                <div style={{ fontSize: 12.5, color: c, fontWeight: 700 }}>{s === "print" ? `prints ${i}` : s === "skip" ? "skipped" : s === "stop" ? "loop ends" : "never runs"}</div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 14.5, color: T.slate, marginTop: 10, lineHeight: 1.6 }}>
          {kw === "break" ? <><strong style={{ color: T.red }}>break</strong> ends the whole loop at once. Output: 1 2, then “after the loop”.</>
            : <><strong style={{ color: T.orange }}>continue</strong> skips the rest of this round only; the loop carries on. Output: 1 2 4 5 6, then “after the loop”.</>}
        </div>
      </div>
    </div>
  );
}

// ── Widget: nested loop grid stepper ──
function NestedGrid() {
  const R = 3, C = 4;
  const [k, setK] = useState(0);
  const row = Math.floor(k / C) + 1, col = (k % C) + 1;
  return (
    <div className="fh-two">
      <div>
        <pre style={codeBox}>{"for row in range(1, 4):\n    for col in range(1, 5):\n        print(row * col, end=\" \")\n    print()"}</pre>
        <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
          <button onClick={() => setK(Math.max(0, k - 1))} style={btn(false)}>◀</button>
          <button onClick={() => setK(Math.min(R * C - 1, k + 1))} style={btn(true)}>Next round ▶</button>
          <span style={{ fontFamily: CODE_FONT }}>row = {row}, col = {col}</span>
        </div>
        <div style={{ fontSize: 14, color: T.slate, marginTop: 8, lineHeight: 1.6 }}>
          {col === C ? "The inner loop just finished its 4 rounds — print() ends the line, then the outer loop moves to the next row." : "The inner loop moves along the row; row stays the same until the inner loop is done."}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${C}, 56px)`, gap: 6, alignContent: "start" }}>
        {Array.from({ length: R * C }, (_, j) => {
          const r = Math.floor(j / C) + 1, c = (j % C) + 1;
          const done = j <= k;
          return <div key={j} style={{ height: 46, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CODE_FONT, fontWeight: 700,
            border: `1.5px solid ${j === k ? T.blue : T.border}`, background: j === k ? tint(T.blue, "22") : done ? tint(T.teal, "12") : T.card, color: done ? T.text : T.muted }}>{done ? r * c : "·"}</div>;
        })}
        <div style={{ gridColumn: `1 / span ${C}`, fontSize: 13.5, color: T.muted }}>{R} rows × {C} columns = {R * C} rounds of the inner body.</div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const tri = (n, f) => Array.from({ length: n }, (_, k) => f(k + 1)).join("\n");
const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d < n; d++) if (n % d === 0) return false; return true; };
const EX = {
  firstmult: {
    id: "firstmult", kind: "type", title: "while True … break",
    task: <>A loop whose condition is always True can only end with <code>break</code>. This finds the first multiple of 7 after the number typed.</>,
    show: 'n = int(input("Start after: "))\nwhile True:\n    n += 1\n    if n % 7 == 0:\n        break\nprint("First multiple of 7:", n)',
    tests: [{ inputs: ["30"], expect: "Start after: 30\nFirst multiple of 7: 35" }, { inputs: ["35"], expect: "Start after: 35\nFirst multiple of 7: 42", hidden: true }],
    requires: [{ node: "Break" }],
    hints: ["break is indented under the if — it only fires when the condition is True."],
    solution: 'n = int(input("Start after: "))\nwhile True:\n    n += 1\n    if n % 7 == 0:\n        break\nprint("First multiple of 7:", n)',
  },
  password: {
    id: "password", kind: "write", title: "Three attempts (break + a flag)",
    task: <>The password is <code>python123</code>. Give the user <strong>at most 3</strong> tries with a for loop. Each try asks <code>Password: </code>; a wrong one prints <code>Wrong password</code>; the right one stops the loop. After the loop print <code>Welcome!</code> or, if all 3 failed, <code>Account locked</code>.</>,
    minLines: 12,
    tests: [
      { inputs: ["abc", "python123"], expect: "Password: abc\nWrong password\nPassword: python123\nWelcome!" },
      { inputs: ["python123"], expect: "Password: python123\nWelcome!", hidden: true },
      { inputs: ["a", "b", "c"], expect: "Password: a\nWrong password\nPassword: b\nWrong password\nPassword: c\nWrong password\nAccount locked", hidden: true },
    ],
    requires: [{ node: "For", msg: "Use a for loop with range(3) — at most 3 tries." }, { node: "Break", msg: "Stop the loop with break as soon as the password is right." }],
    hints: ["After the loop you need to know WHY it ended. Use a flag: found = False before the loop, found = True just before break.", "for attempt in range(3): … if pw == secret: found = True; break … print(\"Wrong password\")", "After the loop (no indent): if found: print(\"Welcome!\") else: print(\"Account locked\")"],
    solution: 'secret = "python123"\nfound = False\nfor attempt in range(3):\n    pw = input("Password: ")\n    if pw == secret:\n        found = True\n        break\n    print("Wrong password")\nif found:\n    print("Welcome!")\nelse:\n    print("Account locked")',
  },
  skip3: {
    id: "skip3", kind: "type", title: "continue: skip a round",
    task: <>Print 1 to 10 on one line, skipping multiples of 3.</>,
    show: 'for i in range(1, 11):\n    if i % 3 == 0:\n        continue\n    print(i, end=" ")',
    tests: [{ expect: "1 2 4 5 7 8 10" }],
    requires: [{ node: "Continue" }],
    hints: ["continue jumps straight to the next round — the print below it is skipped for that i."],
    solution: 'for i in range(1, 11):\n    if i % 3 == 0:\n        continue\n    print(i, end=" ")',
  },
  absent: {
    id: "absent", kind: "write", title: "Average, skipping absentees",
    task: <>Read 5 marks with a for loop, asking <code>Mark: </code> each time. A mark of <code>-1</code> means absent: use <code>continue</code> to skip it. Then print <code>Present: 4</code> and <code>Average: 72.5</code> (one decimal place).</>,
    minLines: 10,
    tests: [
      { inputs: ["70", "-1", "80", "65", "75"], expect: "Mark: 70\nMark: -1\nMark: 80\nMark: 65\nMark: 75\nPresent: 4\nAverage: 72.5" },
      { inputs: ["50", "-1", "-1", "100", "60"], expect: "Mark: 50\nMark: -1\nMark: -1\nMark: 100\nMark: 60\nPresent: 3\nAverage: 70.0", hidden: true },
    ],
    requires: [{ node: "Continue" }],
    hints: ["Two accumulators: total and present, both 0 before the loop.", "if mark == -1: continue — everything after it in the body is skipped for that round.", 'print(f"Average: {total / present:.1f}")'],
    solution: 'total = 0\npresent = 0\nfor i in range(5):\n    mark = int(input("Mark: "))\n    if mark == -1:\n        continue\n    total += mark\n    present += 1\nprint(f"Present: {present}")\nprint(f"Average: {total / present:.1f}")',
  },
  grid: {
    id: "grid", kind: "type", title: "A loop inside a loop",
    task: <>The program from the stepper above. Type it and check the shape of the output.</>,
    show: 'for row in range(1, 4):\n    for col in range(1, 5):\n        print(row * col, end=" ")\n    print()',
    tests: [{ expect: "1 2 3 4\n2 4 6 8\n3 6 9 12" }],
    requires: [{ node: "For", min: 2 }],
    hints: ["The last print() belongs to the OUTER loop: 4 spaces in, not 8."],
    solution: 'for row in range(1, 4):\n    for col in range(1, 5):\n        print(row * col, end=" ")\n    print()',
  },
  stars: {
    id: "stars", kind: "write", title: "Star triangle",
    task: <>Ask <code>Rows: </code> and print a triangle: row 1 has one <code>*</code>, row 2 has two, and so on. Use a <strong>nested</strong> loop — the inner loop prints one star at a time with <code>end=""</code>.</>,
    tests: [
      { inputs: ["4"], expect: "Rows: 4\n" + tri(4, (k) => "*".repeat(k)) },
      { inputs: ["1"], expect: "Rows: 1\n*", hidden: true },
      { inputs: ["6"], expect: "Rows: 6\n" + tri(6, (k) => "*".repeat(k)), hidden: true },
    ],
    requires: [{ node: "For", min: 2, msg: "Use a loop inside a loop." }],
    forbids: [{ text: '"*" *', msg: "\"*\" * row would work — but this exercise is about nested loops. Print one star at a time." }, { text: "* \"*\"", msg: "Print one star at a time with an inner loop." }],
    hints: ["The inner loop runs row times: for star in range(row):", 'Inside: print("*", end=""). After the inner loop: print() to end the line.'],
    solution: 'rows = int(input("Rows: "))\nfor row in range(1, rows + 1):\n    for star in range(row):\n        print("*", end="")\n    print()',
  },
  numtri: {
    id: "numtri", kind: "write", title: "Number triangle",
    task: <>Ask <code>Rows: </code> and print row by row: <code>1</code>, then <code>1 2</code>, then <code>1 2 3</code>… The inner loop's range depends on the outer loop's variable.</>,
    tests: [
      { inputs: ["4"], expect: "Rows: 4\n" + tri(4, (k) => Array.from({ length: k }, (_, j) => j + 1).join(" ")) },
      { inputs: ["2"], expect: "Rows: 2\n1\n1 2", hidden: true },
      { inputs: ["5"], expect: "Rows: 5\n" + tri(5, (k) => Array.from({ length: k }, (_, j) => j + 1).join(" ")), hidden: true },
    ],
    requires: [{ node: "For", min: 2 }],
    hints: ["for row in range(1, rows + 1): then for num in range(1, row + 1):", 'print(num, end=" ") inside, print() after the inner loop.'],
    solution: 'rows = int(input("Rows: "))\nfor row in range(1, rows + 1):\n    for num in range(1, row + 1):\n        print(num, end=" ")\n    print()',
  },
  prime: {
    id: "prime", kind: "make", title: "Prime checker",
    task: <>Ask <code>Number: </code>. A prime is a whole number greater than 1 whose only divisors are 1 and itself. Try every divisor from 2 up to n − 1; the moment one divides n exactly, it's not prime — stop looking. Print <code>7 is prime</code> or <code>9 is not prime</code>.</>,
    minLines: 10,
    tests: [
      { inputs: ["7"], expect: "Number: 7\n7 is prime" },
      { inputs: ["9"], expect: "Number: 9\n9 is not prime", hidden: true },
      { inputs: ["2"], expect: "Number: 2\n2 is prime", hidden: true },
      { inputs: ["1"], expect: "Number: 1\n1 is not prime", hidden: true },
      { inputs: ["97"], expect: `Number: 97\n97 is ${isPrime(97) ? "" : "not "}prime`, hidden: true },
      { inputs: ["91"], expect: `Number: 91\n91 is ${isPrime(91) ? "" : "not "}prime`, hidden: true },
    ],
    requires: [{ node: "Break", msg: "Stop searching with break as soon as a divisor is found." }],
    hints: ["Use a flag: is_prime = n > 1 (so 1 starts as not prime).", "for d in range(2, n): if n % d == 0: is_prime = False; break", "91 = 7 × 13 — a good test of your loop."],
    solution: 'n = int(input("Number: "))\nis_prime = n > 1\nfor d in range(2, n):\n    if n % d == 0:\n        is_prime = False\n        break\nif is_prime:\n    print(f"{n} is prime")\nelse:\n    print(f"{n} is not prime")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What does break do?", options: ["Skips one round", "Ends the whole loop immediately", "Ends the program", "Restarts the loop"], answer: 1, explain: "break exits the loop at once; execution continues after it." },
  { q: "What does continue do?", options: ["Ends the loop", "Skips the rest of this round; the loop carries on", "Pauses the program", "Repeats the round"], answer: 1, explain: "continue jumps straight to the next round." },
  { q: "What does this print?", code: 'for i in range(1, 6):\n    if i == 3:\n        break\n    print(i, end=" ")', options: ["1 2", "1 2 3", "1 2 4 5", "3"], answer: 0, explain: "In round 3 break fires before the print, so only 1 and 2 appear." },
  { q: "How many times does the inner print run?", code: "for i in range(2):\n    for j in range(3):\n        print(i, j)", options: ["5", "6", "3", "2"], answer: 1, explain: "3 inner rounds for each of 2 outer rounds: 2 × 3 = 6. Multiply, don't add." },
  { q: "After a loop with break, how do you know whether break happened?", options: ["You can't", "Set a flag variable before break and check it after the loop", "break returns True", "Use continue instead"], answer: 1, explain: "A flag (found = False → True just before break) records why the loop ended." },
  { q: "Why does the prime checker stop at the first divisor?", options: ["Required by Python", "One divisor already proves it isn't prime, so more checking is wasted", "To avoid an error", "It doesn't need to"], answer: 1, explain: "break saves work: the answer is already known." },
];

export default function Unit6_3(props) {
  const sections = [
    {
      label: "break & continue", kicker: "LEAVING EARLY", title: "Two ways out",
      blocks: [
        <P>Sometimes a loop should stop early (found what you were looking for) or skip one round (this item doesn't count). Same loop, two keywords — switch between them:</P>,
        <BreakVsContinue />,
        EX.firstmult,
      ],
    },
    {
      label: "The Flag", kicker: "WHY DID IT STOP?", title: "break with a flag",
      blocks: [
        <P>After a loop ends, you often need to know <em>how</em> it ended: did <code>break</code> fire, or did the loop simply run out? A <strong>flag</strong> is a bool that starts False before the loop and is set True just before <code>break</code>.</P>,
        EX.password,
        <Note color={T.blue} icon="🐍">Python also has a rarely-taught shortcut: a loop can have its own <code>else:</code>, which runs only if the loop was <em>not</em> ended by break. The flag is clearer, so we use it.</Note>,
      ],
    },
    {
      label: "continue", kicker: "SKIP THIS ONE", title: "continue: ignore one round",
      blocks: [EX.skip3, EX.absent],
    },
    {
      label: "Nested Loops", kicker: "LOOPS INSIDE LOOPS", title: "A loop inside a loop",
      blocks: [
        <P>Like a clock: the minute hand goes all the way round for every single tick of the hour hand. The <strong>inner</strong> loop runs completely for <em>each</em> round of the <strong>outer</strong> loop. Step through:</P>,
        <NestedGrid />,
        EX.grid,
        EX.stars,
        EX.numtri,
        <KeyIdea>Total rounds of the inner body = outer rounds × inner rounds. The inner range can depend on the outer variable — that's what makes triangles.</KeyIdea>,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: prime checker",
      blocks: [<P>A for loop, a flag, break, and an edge case (1 is not prime). A favourite exam question — and you'll make it faster in Computational Thinking I.</P>, EX.prime],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit6_3" crumb="MODULE 6 › UNIT 6.3" title="break, continue & Nested Loops" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 6.4 — Capstone: Number-Guessing Game", text: "A real game: the computer keeps a secret and you hunt it down." }} />
  );
}
