// Unit 6.1 — The while Loop (rebuilt on the typing-first lesson kit)
// Why repeat → anatomy + trace (memory slot) → counter & accumulator →
// infinite loops and off-by-one → loops that run until something happens →
// digit sum (n % 10 and n // 10 from Unit 4.4).

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const slider = { width: "100%", accentColor: T.navy };
const codeBox = { margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre-wrap" };

// ── Widget: 5 lines or 500? ──
function WhyRepeat() {
  const [n, setN] = useState(5);
  return (
    <div>
      <label style={{ fontFamily: CODE_FONT }}>print the numbers 1 to <strong>{n}</strong></label>
      <input type="range" min={3} max={500} value={n} onChange={(e) => setN(Number(e.target.value))} style={slider} />
      <div className="fh-two" style={{ marginTop: 8 }}>
        <div>
          <div style={{ color: T.red, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>❌ Copy-paste: {n} lines</div>
          <pre style={{ ...codeBox, maxHeight: 170, overflow: "hidden" }}>{Array.from({ length: Math.min(n, 6) }, (_, i) => `print(${i + 1})`).join("\n") + (n > 6 ? `\n… ${n - 6} more lines …` : "")}</pre>
        </div>
        <div>
          <div style={{ color: T.green, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>✅ while loop: always 4 lines</div>
          <pre style={codeBox}>{`count = 1\nwhile count <= ${n}:\n    print(count)\n    count += 1`}</pre>
        </div>
      </div>
    </div>
  );
}

// ── Widget: be the computer ──
const TRACE = (() => {
  const s = [{ line: 0, c: 1, out: [], d: "count = 1 — create the counter before the loop." }];
  const out = [];
  for (let v = 1; v <= 3; v++) {
    s.push({ line: 1, c: v, out: [...out], cond: true, d: `Check: is ${v} <= 3? True → run the body.` });
    out.push(String(v));
    s.push({ line: 2, c: v, out: [...out], d: `print(count) shows ${v}.` });
    s.push({ line: 3, c: v + 1, out: [...out], d: `count += 1 → count is now ${v + 1}. Back up to the while line.` });
  }
  s.push({ line: 1, c: 4, out: [...out], cond: false, d: "Check: is 4 <= 3? False → skip the body." });
  s.push({ line: 4, c: 4, out: [...out, "Done"], d: "Carry on with the first line after the loop." });
  return s;
})();
const TRACE_SRC = ["count = 1", "while count <= 3:", "    print(count)", "    count += 1", 'print("Done")'];
function Trace() {
  const [i, setI] = useState(0);
  const s = TRACE[i];
  return (
    <div className="fh-two">
      <div>
        <div style={{ ...codeBox, padding: 6 }}>
          {TRACE_SRC.map((l, k) => (
            <div key={k} style={{ padding: "2px 8px", borderRadius: 5, background: s.line === k ? tint(T.blue, "22") : "transparent", fontWeight: s.line === k ? 700 : 400, whiteSpace: "pre" }}>{l}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
          <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, cursor: "pointer", fontFamily: "inherit" }}>◀</button>
          <button onClick={() => setI(Math.min(TRACE.length - 1, i + 1))} disabled={i === TRACE.length - 1} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: T.navy, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Next step ▶</button>
          <span style={{ fontSize: 13, color: T.muted }}>{i + 1} / {TRACE.length}</span>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ border: `1.5px solid ${T.teal}`, borderRadius: 10, padding: "6px 14px", textAlign: "center", background: tint(T.teal, "10") }}>
            <div style={{ fontFamily: CODE_FONT, fontSize: 12, color: T.teal, fontWeight: 700 }}>count</div>
            <div style={{ fontFamily: CODE_FONT, fontSize: 22, fontWeight: 700 }}>{s.c}</div>
          </div>
          {s.cond !== undefined && <div style={{ alignSelf: "center", fontFamily: CODE_FONT, fontWeight: 700, color: s.cond ? T.green : T.red }}>condition: {s.cond ? "True" : "False"}</div>}
        </div>
        <pre style={{ margin: "10px 0 0", fontFamily: CODE_FONT, fontSize: 14.5, background: T.termBg, color: T.termText, borderRadius: 10, padding: "10px 14px", minHeight: 80 }}>{s.out.join("\n") || " "}</pre>
        <div style={{ fontSize: 14.5, color: T.slate, marginTop: 8 }}>{s.d}</div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const nums = (a, b, step = 1) => { const r = []; for (let i = a; step > 0 ? i <= b : i >= b; i += step) r.push(i); return r; };
const EX = {
  count5: {
    id: "count5", kind: "type", title: "Your first loop",
    task: <>Type it. Watch the indentation: both lines of the body are indented.</>,
    show: "count = 1\nwhile count <= 5:\n    print(count)\n    count += 1\nprint(\"Done\")",
    tests: [{ expect: "1\n2\n3\n4\n5\nDone" }],
    requires: [{ node: "While" }],
    hints: ["Done is NOT indented — it runs once, after the loop."],
    solution: "count = 1\nwhile count <= 5:\n    print(count)\n    count += 1\nprint(\"Done\")",
  },
  countdown: {
    id: "countdown", kind: "write", title: "Countdown",
    task: <>Ask <code>Start from: </code>, then count down to 1 with a while loop, one number per line, then print <code>Lift off!</code></>,
    tests: [
      { inputs: ["5"], expect: "Start from: 5\n5\n4\n3\n2\n1\nLift off!" },
      { inputs: ["3"], expect: "Start from: 3\n3\n2\n1\nLift off!", hidden: true },
      { inputs: ["0"], expect: "Start from: 0\nLift off!", hidden: true },
    ],
    requires: [{ node: "While" }],
    hints: ["The counter starts at the input and goes DOWN: n -= 1.", "Keep going while n >= 1 (or n > 0)."],
    solution: 'n = int(input("Start from: "))\nwhile n >= 1:\n    print(n)\n    n -= 1\nprint("Lift off!")',
  },
  sumn: {
    id: "sumn", kind: "write", title: "Add 1 + 2 + … + n",
    task: <>Ask <code>n: </code> and print the sum of all whole numbers from 1 to n, as <code>Sum: 55</code>. You need two variables: a <strong>counter</strong> that walks from 1 to n, and a <strong>total</strong> that starts at 0 and grows.</>,
    tests: [
      { inputs: ["10"], expect: "n: 10\nSum: 55" },
      { inputs: ["1"], expect: "n: 1\nSum: 1", hidden: true },
      { inputs: ["100"], expect: "n: 100\nSum: 5050", hidden: true },
    ],
    requires: [{ node: "While" }],
    forbids: [{ text: "n * (n + 1)", msg: "Nice maths! But this exercise is about the loop — add the numbers one by one." }],
    hints: ["total = 0 and i = 1 go BEFORE the loop.", "Inside: total += i, then i += 1."],
    solution: 'n = int(input("n: "))\ntotal = 0\ni = 1\nwhile i <= n:\n    total += i\n    i += 1\nprint(f"Sum: {total}")',
  },
  table: {
    id: "table", kind: "complete", title: "Multiplication table",
    task: <>Fill in the three blanks so the program prints the table of the number typed, from × 1 to × 10.</>,
    starter: 'n = int(input("Table of: "))\ni = ___\nwhile i <= ___:\n    print(f"{n} x {i} = {n * i}")\n    ___',
    tests: [
      { inputs: ["7"], expect: "Table of: 7\n" + nums(1, 10).map((i) => `7 x ${i} = ${7 * i}`).join("\n") },
      { inputs: ["12"], expect: "Table of: 12\n" + nums(1, 10).map((i) => `12 x ${i} = ${12 * i}`).join("\n"), hidden: true },
    ],
    hints: ["Start at 1, stop after 10, and move i forward each round."],
    solution: 'n = int(input("Table of: "))\ni = 1\nwhile i <= 10:\n    print(f"{n} x {i} = {n * i}")\n    i += 1',
  },
  forever: {
    id: "forever", kind: "fix", title: "The loop that never ends",
    task: <>Run it — it will be stopped automatically after a few seconds. Read the coach, then fix it.</>,
    starter: "count = 1\nwhile count <= 5:\n    print(count)",
    tests: [{ expect: "1\n2\n3\n4\n5" }],
    hints: ["What changes count inside the loop? Nothing — so the condition stays True forever."],
    solution: "count = 1\nwhile count <= 5:\n    print(count)\n    count += 1",
  },
  offby1: {
    id: "offby1", kind: "fix", title: "One short",
    task: <>This should print the roll numbers 1 to 5 for a five-student group. Run it and count the lines.</>,
    starter: 'roll = 1\nwhile roll < 5:\n    print("Roll", roll)\n    roll += 1',
    tests: [{ expect: "Roll 1\nRoll 2\nRoll 3\nRoll 4\nRoll 5" }],
    hints: ["When roll is 5, is 5 < 5 True?"],
    solution: 'roll = 1\nwhile roll <= 5:\n    print("Roll", roll)\n    roll += 1',
  },
  validate: {
    id: "validate", kind: "write", title: "Ask again until it's valid",
    task: <>Here a loop runs an <strong>unknown</strong> number of times. Ask <code>Mark (0-100): </code>. While the mark is outside 0–100, print <code>Invalid, try again</code> and ask again. Finally print <code>Saved: 75</code> (with the valid mark).</>,
    tests: [
      { inputs: ["150", "-3", "75"], expect: "Mark (0-100): 150\nInvalid, try again\nMark (0-100): -3\nInvalid, try again\nMark (0-100): 75\nSaved: 75" },
      { inputs: ["40"], expect: "Mark (0-100): 40\nSaved: 40", hidden: true },
      { inputs: ["101", "100"], expect: "Mark (0-100): 101\nInvalid, try again\nMark (0-100): 100\nSaved: 100", hidden: true },
    ],
    requires: [{ node: "While" }],
    hints: ["Ask once before the loop. The loop condition is “the mark is NOT valid”.", "while mark < 0 or mark > 100:", "Inside the loop: print the message, then ask again (same input line)."],
    solution: 'mark = int(input("Mark (0-100): "))\nwhile mark < 0 or mark > 100:\n    print("Invalid, try again")\n    mark = int(input("Mark (0-100): "))\nprint(f"Saved: {mark}")',
  },
  sentinel: {
    id: "sentinel", kind: "write", title: "Add until 0",
    task: <>A shopkeeper types each item's price; typing <code>0</code> means “done”. Ask <code>Price: </code> again and again, add each price to a total, and when 0 is typed print <code>Total: Rs 135</code>.</>,
    tests: [
      { inputs: ["50", "60", "25", "0"], expect: "Price: 50\nPrice: 60\nPrice: 25\nPrice: 0\nTotal: Rs 135" },
      { inputs: ["0"], expect: "Price: 0\nTotal: Rs 0", hidden: true },
      { inputs: ["99", "1", "0"], expect: "Price: 99\nPrice: 1\nPrice: 0\nTotal: Rs 100", hidden: true },
    ],
    requires: [{ node: "While" }],
    hints: ["total = 0 before the loop; ask for the first price before the loop too.", "while price != 0: add it, then ask for the next."],
    solution: 'total = 0\nprice = int(input("Price: "))\nwhile price != 0:\n    total += price\n    price = int(input("Price: "))\nprint(f"Total: Rs {total}")',
  },
  digits: {
    id: "digits", kind: "make", title: "Count the digits, add the digits",
    task: <>Ask <code>Number: </code> (a positive whole number). Using a while loop with <code>% 10</code> and <code>// 10</code> from Unit 4.4, peel off digits one at a time. Print <code>Digits: 4</code> and <code>Digit sum: 22</code> (for 4729).</>,
    minLines: 10,
    tests: [
      { inputs: ["4729"], expect: "Number: 4729\nDigits: 4\nDigit sum: 22" },
      { inputs: ["7"], expect: "Number: 7\nDigits: 1\nDigit sum: 7", hidden: true },
      { inputs: ["1000"], expect: "Number: 1000\nDigits: 4\nDigit sum: 1", hidden: true },
    ],
    requires: [{ node: "While" }, { text: "% 10", msg: "Get the last digit with n % 10." }, { text: "// 10", msg: "Drop the last digit with n // 10." }],
    forbids: [{ call: "len", msg: "Do it with the loop and arithmetic, not len( )." }, { call: "str", msg: "Do it with % and //, not by converting to text." }],
    hints: ["Loop while n > 0. Each round: add n % 10 to the sum, add 1 to the count, then n = n // 10.", "count = 0 and total = 0 before the loop."],
    solution: 'n = int(input("Number: "))\ncount = 0\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    count += 1\n    n = n // 10\nprint(f"Digits: {count}")\nprint(f"Digit sum: {total}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "When does a while loop check its condition?", options: ["Only once, at the start", "Before every round", "After every round", "Only when the body changes something"], answer: 1, explain: "The condition is re-checked before each repetition; when it's False the loop ends." },
  { q: "What does this print?", code: "i = 1\nwhile i <= 3:\n    print(i)\n    i += 1", options: ["1 2 3", "1 2 3 4", "0 1 2", "Nothing"], answer: 0, explain: "i is 1, 2, 3 inside the loop. When i becomes 4, 4 <= 3 is False and the loop stops." },
  { q: "You forget i += 1. What happens?", options: ["Error", "The loop runs forever", "It runs once", "It never runs"], answer: 1, explain: "Nothing changes i, so the condition never becomes False — an infinite loop." },
  { q: "What if the condition is False the very first time?", options: ["The body runs once anyway", "The body never runs", "Python waits", "Error"], answer: 1, explain: "while checks before running; a loop can run zero times." },
  { q: "Where must total = 0 go when adding numbers in a loop?", options: ["Inside the loop", "Before the loop", "After the loop", "Anywhere"], answer: 1, explain: "Inside the loop it would reset to 0 every round. Create it once, before." },
  { q: "Which loop job is a while loop's natural fit?", options: ["Exactly 10 times", "Until the user types a valid value", "For each letter of a word", "Never"], answer: 1, explain: "while shines when you don't know in advance how many rounds are needed. Counting loops get easier with for (next unit)." },
];

export default function Unit6_1(props) {
  const sections = [
    {
      label: "Why Repeat?", kicker: "THE NEED", title: "Say it once, run it many times",
      blocks: [
        <P>Printing 1 to 5 is five lines. 1 to 500 is five hundred — unless the computer repeats for you. Drag the slider:</P>,
        <WhyRepeat />,
        EX.count5,
      ],
    },
    {
      label: "Trace It", kicker: "BE THE COMPUTER", title: "How while runs, one step at a time",
      blocks: [
        <P><code>while condition:</code> works like <code>if</code>, with one difference: after the body runs, Python goes <strong>back up</strong> and checks again. Step through and watch <code>count</code> change in memory:</P>,
        <Trace />,
        <div className="fh-two" style={{ maxWidth: 820, marginTop: 14 }}>
          <CodeBlock title="If you know C" code={"int count = 1;\nwhile (count <= 3) {\n    printf(\"%d\\n\", count);\n    count++;\n}"} />
          <CodeBlock title="Python" code={"count = 1\nwhile count <= 3:\n    print(count)\n    count += 1"} />
        </div>,
        EX.countdown,
        <KeyIdea>Every counting loop needs three things: <strong>create</strong> the counter before the loop, <strong>check</strong> it in the condition, <strong>change</strong> it inside the body. Forget the third and the loop never ends.</KeyIdea>,
      ],
    },
    {
      label: "Counter & Total", kicker: "TWO VARIABLES", title: "Counting and accumulating",
      blocks: [
        <P>The most useful loop pattern: a counter walks through the numbers while a <strong>total</strong> collects them. The total starts at 0 <em>before</em> the loop and grows <em>inside</em> it.</P>,
        EX.sumn,
        EX.table,
      ],
    },
    {
      label: "Loop Bugs", kicker: "INFINITE & OFF-BY-ONE", title: "The two classic loop bugs",
      blocks: [
        <P>Two mistakes cause most loop bugs: the condition never becomes False (an <strong>infinite loop</strong>), or the loop runs one time too few or too many (<strong>off-by-one</strong>). Meet both, then fix them.</P>,
        EX.forever,
        EX.offby1,
        <Note icon="🛑">In real Python an infinite loop just hangs — press <strong>Ctrl+C</strong> to stop it. Here the runner stops it after 5 seconds.</Note>,
      ],
    },
    {
      label: "Until…", kicker: "UNKNOWN NUMBER OF ROUNDS", title: "Loops that run until something happens",
      blocks: [
        <P>Where <code>while</code> really shines: when you <em>can't</em> know in advance how many rounds are needed — re-asking until the input is valid, or reading values until a stop signal.</P>,
        EX.validate,
        EX.sentinel,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: count and add the digits",
      blocks: [<P>A while loop, a counter, a total, and the two digit tricks from Unit 4.4. This pattern appears in many exam questions (reverse a number, palindrome numbers, Armstrong numbers).</P>, EX.digits],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit6_1" crumb="MODULE 6 › UNIT 6.1" title="The while Loop" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 6.2 — The for Loop & range()", text: "When you know how many rounds, for does the counting for you — no forgotten += 1." }} />
  );
}
