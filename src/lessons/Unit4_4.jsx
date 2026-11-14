// Unit 4.4 — Operators & Expressions (rebuilt on the typing-first lesson kit)
// Arithmetic (Python-exact, incl. negatives) → order of operations → shortcuts
// (+=, "=" * n) → round / abs → the first import (math) → Simple Interest.
// Comparisons and and/or/not moved to Module 5 (5.1, 5.3), which teach them.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const btn = (on, color = T.navy) => ({ padding: "9px 14px", borderRadius: 8, border: `1.5px solid ${on ? color : T.border}`, background: on ? color : T.card, color: on ? "#fff" : T.text, fontWeight: 700, cursor: "pointer", fontFamily: CODE_FONT, fontSize: 15 });
const numIn = { width: 90, padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${T.borderStrong}`, background: T.card, fontFamily: CODE_FONT, fontSize: 15, color: T.text };

// Python-exact results (JS's % and number printing differ from Python's)
const pyNum = (x) => (Number.isInteger(x) ? String(x) : String(x));
const pyFloat = (x) => (Number.isInteger(x) ? `${x}.0` : String(x));
const OPS = [
  { s: "+", n: "add", f: (a, b) => pyNum(a + b), note: "Plain addition." },
  { s: "-", n: "subtract", f: (a, b) => pyNum(a - b), note: "Plain subtraction." },
  { s: "*", n: "multiply", f: (a, b) => pyNum(a * b), note: "Multiplication is * — there is no × key." },
  { s: "/", n: "divide", f: (a, b) => (b === 0 ? "ZeroDivisionError" : pyFloat(a / b)), note: "Always gives a float, even 10 / 2 → 5.0." },
  { s: "//", n: "floor divide", f: (a, b) => (b === 0 ? "ZeroDivisionError" : pyNum(Math.floor(a / b))), note: "Divides, then rounds DOWN to a whole number. “How many whole times does b fit in a?” For negatives, down means towards minus infinity: -17 // 5 is -4." },
  { s: "%", n: "remainder (mod)", f: (a, b) => (b === 0 ? "ZeroDivisionError" : pyNum(a - b * Math.floor(a / b))), note: "What's left over after //. Always true: (a // b) * b + a % b == a. Even/odd test: n % 2. Last digit: n % 10." },
  { s: "**", n: "power", f: (a, b) => { const r = Math.pow(a, b); return Math.abs(r) > 1e15 ? "(a very big number)" : b < 0 ? pyFloat(r) : pyNum(r); }, note: "a to the power b. 2 ** 10 is 1024." },
];

// ── Widget: the seven arithmetic operators ──
function Calculator() {
  const [a, setA] = useState(17);
  const [b, setB] = useState(5);
  const [op, setOp] = useState("//");
  const cur = OPS.find((o) => o.s === op);
  const num = (v) => (v === "" || v === "-" ? 0 : Math.trunc(Number(v)));
  return (
    <div className="fh-two">
      <div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <label style={{ fontFamily: CODE_FONT }}>a = <input type="number" value={a} onChange={(e) => setA(num(e.target.value))} style={numIn} /></label>
          <label style={{ fontFamily: CODE_FONT }}>b = <input type="number" value={b} onChange={(e) => setB(num(e.target.value))} style={numIn} /></label>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {OPS.map((o) => <button key={o.s} onClick={() => setOp(o.s)} style={btn(op === o.s)}>{o.s}</button>)}
        </div>
        <div style={{ fontSize: 13, color: T.muted, marginTop: 8 }}>Try a = -17 with // and %. Try b = 0.</div>
      </div>
      <div style={{ background: T.card, border: `1.5px solid ${tint(T.blue, "55")}`, borderRadius: 12, padding: 16 }}>
        <div style={{ fontFamily: CODE_FONT, fontSize: 20 }}>
          {a} {op} {b} <span style={{ color: T.muted }}>→</span> <strong style={{ color: cur.f(a, b).includes("Error") ? T.red : T.blue }}>{cur.f(a, b)}</strong>
        </div>
        <div style={{ color: T.slate, fontSize: 14.5, marginTop: 8, lineHeight: 1.6 }}><strong>{cur.n}:</strong> {cur.note}</div>
      </div>
    </div>
  );
}

// ── Widget: order of operations, one step at a time ──
const PREC = [
  { e: "2 + 3 * 4 - 6 / 2", h: "3 * 4", n: "* and / come before + and -. Python finds 3 * 4 first." },
  { e: "2 + 12 - 6 / 2", h: "6 / 2", n: "Then the other division: 6 / 2 → 3.0 (a float, because of /)." },
  { e: "2 + 12 - 3.0", h: "2 + 12", n: "Only + and - are left: left to right." },
  { e: "14 - 3.0", h: "14 - 3.0", n: "The last subtraction." },
  { e: "11.0", h: null, n: "Brackets first, then **, then * / // %, then + -. Same level: left to right." },
];
function Precedence() {
  const [i, setI] = useState(0);
  const s = PREC[i];
  const parts = s.h ? s.e.split(s.h) : [s.e];
  return (
    <div>
      <div style={{ background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 14px", textAlign: "center", fontFamily: CODE_FONT, fontSize: 24 }}>
        {s.h ? <>{parts[0]}<span style={{ background: tint(T.blue, "22"), color: T.blue, borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>{s.h}</span>{parts[1]}</> : <strong style={{ color: T.green }}>{s.e}</strong>}
      </div>
      <div style={{ marginTop: 10, background: tint(T.purple, "10"), border: `1px solid ${tint(T.purple, "44")}`, borderRadius: 10, padding: "10px 14px", fontSize: 14.5, color: T.slate }}>{s.n}</div>
      <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center" }}>
        <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={btn(false)}>◀</button>
        <button onClick={() => setI(Math.min(PREC.length - 1, i + 1))} disabled={i === PREC.length - 1} style={btn(true)}>Next step ▶</button>
        <span style={{ color: T.muted, fontSize: 13 }}>Step {i + 1} / {PREC.length}</span>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const BAR = "=".repeat(26);
const EX = {
  ops: {
    id: "ops", kind: "type", title: "All seven operators",
    task: <>Type it and predict each line before running. Watch lines 4, 5 and 6.</>,
    show: "a = 17\nb = 5\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a / b)\nprint(a // b)\nprint(a % b)\nprint(a ** b)",
    minLines: 10,
    tests: [{ expect: "22\n12\n85\n3.4\n3\n2\n1419857" }],
    hints: ["17 // 5 is how many whole 5s fit in 17; 17 % 5 is what's left over."],
    solution: "a = 17\nb = 5\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a / b)\nprint(a // b)\nprint(a % b)\nprint(a ** b)",
  },
  clock: {
    id: "clock", kind: "write", title: "Minutes into hours",
    task: <>A film runs for some minutes. Ask <code>Minutes: </code> (a whole number) and print it as hours and minutes, e.g. 125 → <code>2 hours 5 minutes</code>. Use <code>//</code> and <code>%</code>.</>,
    tests: [{ inputs: ["125"], expect: "Minutes: 125\n2 hours 5 minutes" }, { inputs: ["59"], expect: "Minutes: 59\n0 hours 59 minutes", hidden: true }, { inputs: ["180"], expect: "Minutes: 180\n3 hours 0 minutes", hidden: true }],
    requires: [{ text: "//", msg: "Use // to get the whole hours." }, { text: "%", msg: "Use % to get the minutes left over." }],
    hints: ["Hours = how many whole 60s fit: total // 60", "Minutes left = total % 60", 'print(hours, "hours", mins, "minutes")'],
    solution: 'total = int(input("Minutes: "))\nhours = total // 60\nmins = total % 60\nprint(hours, "hours", mins, "minutes")',
  },
  digits: {
    id: "digits", kind: "complete", title: "Peel off the last digit",
    task: <>Two tricks you'll use all through Computational Thinking: <code>n % 10</code> is the <strong>last digit</strong>; <code>n // 10</code> <strong>drops</strong> the last digit. Fill in both blanks.</>,
    starter: 'n = int(input("Number: "))\nlast = n ___ 10\nrest = n ___ 10\nprint("Last digit:", last)\nprint("Without it:", rest)',
    tests: [{ inputs: ["4729"], expect: "Number: 4729\nLast digit: 9\nWithout it: 472" }, { inputs: ["1042"], expect: "Number: 1042\nLast digit: 2\nWithout it: 104", hidden: true }],
    hints: ["Remainder after dividing by 10 → the last digit.", "last = n % 10, rest = n // 10"],
    solution: 'n = int(input("Number: "))\nlast = n % 10\nrest = n // 10\nprint("Last digit:", last)\nprint("Without it:", rest)',
  },
  average: {
    id: "average", kind: "fix", title: "The wrong average",
    task: <>Three marks: 60, 70, 80. The average should be 70.0 — run it and see what you get. No error, wrong answer. Fix it.</>,
    starter: 'm1 = int(input("Mark 1: "))\nm2 = int(input("Mark 2: "))\nm3 = int(input("Mark 3: "))\navg = m1 + m2 + m3 / 3\nprint("Average:", avg)',
    tests: [{ inputs: ["60", "70", "80"], expect: "Mark 1: 60\nMark 2: 70\nMark 3: 80\nAverage: 70.0" }, { inputs: ["90", "45", "30"], expect: "Mark 1: 90\nMark 2: 45\nMark 3: 30\nAverage: 55.0", hidden: true }],
    hints: ["Which happens first: the + or the /?", "Only m3 is being divided by 3. Brackets make the addition happen first."],
    solution: 'm1 = int(input("Mark 1: "))\nm2 = int(input("Mark 2: "))\nm3 = int(input("Mark 3: "))\navg = (m1 + m2 + m3) / 3\nprint("Average:", avg)',
  },
  shortcut: {
    id: "shortcut", kind: "modify", title: "Priya's wallet, the short way",
    task: <>Remember Priya's wallet from Unit 4.2? Rewrite the three updates with <code>-=</code> and <code>+=</code>. The output must stay exactly the same.</>,
    starter: 'wallet = 500\nprint("Start:", wallet)\nwallet = wallet - 120\nprint("After snacks:", wallet)\nwallet = wallet - 250\nprint("After book:", wallet)\nwallet = wallet + 100\nprint("After pocket money:", wallet)',
    minLines: 9,
    tests: [{ expect: "Start: 500\nAfter snacks: 380\nAfter book: 130\nAfter pocket money: 230" }],
    requires: [{ node: "AugAssign", min: 3, msg: "Use -= or += for all three updates." }],
    validate: (code) => (/wallet\s*=\s*wallet/.test(code) ? "Some updates still use wallet = wallet ... — switch them to -= or +=." : null),
    hints: ["wallet = wallet - 120 becomes wallet -= 120"],
    solution: 'wallet = 500\nprint("Start:", wallet)\nwallet -= 120\nprint("After snacks:", wallet)\nwallet -= 250\nprint("After book:", wallet)\nwallet += 100\nprint("After pocket money:", wallet)',
  },
  banner: {
    id: "banner", kind: "modify", title: "Let * draw the line",
    task: <>On text, <code>*</code> repeats: <code>"ab" * 3</code> is <code>"ababab"</code>. Your cinema ticket from Unit 4.1 typed 26 <code>=</code> signs by hand, twice. Replace both lines with <code>"=" * 26</code>.</>,
    starter: `print("${BAR}")\nprint("     FOOTHOLD CINEMAS")\nprint("${BAR}")`,
    tests: [{ expect: `${BAR}\n     FOOTHOLD CINEMAS\n${BAR}` }],
    forbids: [{ text: "=====", msg: "Don't type the = signs — let \"=\" * 26 make them." }],
    hints: ['print("=" * 26)'],
    solution: 'print("=" * 26)\nprint("     FOOTHOLD CINEMAS")\nprint("=" * 26)',
  },
  rounding: {
    id: "rounding", kind: "type", title: "round() and abs()",
    task: <>Predict, type, run. Line 3 surprises almost everyone — read the note below after you run it.</>,
    show: "print(round(3.14159, 2))\nprint(round(7.6))\nprint(round(2.5))\nprint(abs(-12))\nprint(abs(4 - 10))",
    tests: [{ expect: "3.14\n8\n2\n12\n6" }],
    hints: ["round(x, 2) keeps 2 decimal places; round(x) gives a whole number."],
    solution: "print(round(3.14159, 2))\nprint(round(7.6))\nprint(round(2.5))\nprint(abs(-12))\nprint(abs(4 - 10))",
  },
  temp: {
    id: "temp", kind: "write", title: "How much warmer?",
    task: <>Ask for two temperatures, <code>Morning: </code> and <code>Afternoon: </code> (decimals allowed). Print the difference as a positive number rounded to 1 decimal place, like <code>Difference: 4.9</code>. It must work whichever reading is bigger.</>,
    tests: [
      { inputs: ["31.4", "36.27"], expect: "Morning: 31.4\nAfternoon: 36.27\nDifference: 4.9" },
      { inputs: ["20", "12.3"], expect: "Morning: 20\nAfternoon: 12.3\nDifference: 7.7", hidden: true },
    ],
    requires: [{ call: "abs", msg: "Use abs( ) so the difference is never negative." }, { call: "round", msg: "Use round(x, 1) for one decimal place." }],
    hints: ["Subtract one from the other, then abs( ) removes the minus sign.", "print(\"Difference:\", round(abs(b - a), 1))"],
    solution: 'a = float(input("Morning: "))\nb = float(input("Afternoon: "))\nprint("Difference:", round(abs(b - a), 1))',
  },
  mathmod: {
    id: "mathmod", kind: "type", title: "Your first import",
    task: <>Python ships with extra toolboxes called <strong>modules</strong>. <code>import math</code> opens the maths toolbox; you then use its tools as <code>math.something</code>. Type it and run.</>,
    show: "import math\nprint(math.sqrt(144))\nprint(math.pi)\nprint(math.ceil(4.1))\nprint(math.floor(4.9))",
    tests: [{ expect: "12.0\n3.141592653589793\n5\n4" }],
    hints: ["import goes on the first line; every tool is written math. followed by its name."],
    solution: "import math\nprint(math.sqrt(144))\nprint(math.pi)\nprint(math.ceil(4.1))\nprint(math.floor(4.9))",
  },
  buses: {
    id: "buses", kind: "write", title: "How many buses?",
    task: <>Students are going on a trip; each bus seats 40. Ask <code>Students: </code> and print how many buses are needed, e.g. 130 → <code>Buses needed: 4</code>. (3.25 buses isn't an answer — and 3 buses leaves 10 students behind.)</>,
    tests: [{ inputs: ["130"], expect: "Students: 130\nBuses needed: 4" }, { inputs: ["80"], expect: "Students: 80\nBuses needed: 2", hidden: true }, { inputs: ["41"], expect: "Students: 41\nBuses needed: 2", hidden: true }],
    requires: [{ call: "ceil", msg: "Round UP with math.ceil( )." }],
    hints: ["130 / 40 is 3.25. You need to round UP.", "import math, then math.ceil(students / 40)"],
    solution: 'import math\nstudents = int(input("Students: "))\nprint("Buses needed:", math.ceil(students / 40))',
  },
  interest: {
    id: "interest", kind: "make", title: "Simple Interest calculator",
    task: <>The Module 4 classic. Ask <code>Principal: </code>, <code>Rate: </code> and <code>Years: </code> (all can have decimals). Simple Interest = P × R × T ÷ 100. Print the interest and the total amount, both rounded to 2 decimal places. Blank editor.</>,
    minLines: 9,
    tests: [
      { inputs: ["10000", "8", "3"], expect: "Principal: 10000\nRate: 8\nYears: 3\nInterest: Rs 2400.0\nTotal: Rs 12400.0" },
      { inputs: ["5500", "7.5", "2"], expect: "Principal: 5500\nRate: 7.5\nYears: 2\nInterest: Rs 825.0\nTotal: Rs 6325.0", hidden: true },
      { inputs: ["1234", "6.25", "1.5"], expect: "Principal: 1234\nRate: 6.25\nYears: 1.5\nInterest: Rs 115.69\nTotal: Rs 1349.69", hidden: true },
    ],
    requires: [{ call: "float", min: 3, msg: "All three inputs can have decimals — float( ) each one." }, { call: "round", msg: "Round the results to 2 decimal places." }],
    forbids: [{ text: "2400", msg: "Let Python calculate the interest." }],
    hints: ["si = p * r * t / 100", "total = p + si", 'print("Interest: Rs", round(si, 2))'],
    solution: 'p = float(input("Principal: "))\nr = float(input("Rate: "))\nt = float(input("Years: "))\nsi = p * r * t / 100\ntotal = p + si\nprint("Interest: Rs", round(si, 2))\nprint("Total: Rs", round(total, 2))',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What is 17 // 5?", options: ["3.4", "3", "2", "4"], answer: 1, explain: "// gives how many WHOLE 5s fit in 17: three." },
  { q: "What is 17 % 5?", options: ["3", "3.4", "2", "0"], answer: 2, explain: "17 = 3 × 5 + 2. The remainder is 2." },
  { q: "What does 10 / 2 give?", options: ["5", "5.0", "\"5\"", "2"], answer: 1, explain: "/ always produces a float, even when it divides exactly." },
  { q: "What does this print?", code: "print(2 + 3 * 4)", options: ["20", "14", "24", "9"], answer: 1, explain: "* before +: 3 * 4 = 12, then 2 + 12 = 14." },
  { q: "After x = 10 and then x -= 3, what is x?", options: ["13", "7", "-3", "30"], answer: 1, explain: "x -= 3 is short for x = x - 3." },
  { q: "What does print(round(2.5)) show?", options: ["3", "2", "2.5", "2.0"], answer: 1,
    explain: "Python rounds an exact .5 to the nearest EVEN number (banker's rounding): round(2.5) is 2, round(3.5) is 4. It avoids always pushing totals upward." },
  { q: "60 students, 25 per bus. Which gives the number of buses needed?", options: ["60 // 25", "round(60 / 25)", "math.ceil(60 / 25)", "60 % 25"], answer: 2,
    explain: "60 / 25 = 2.4 buses — you need 3. Only ceil always rounds up; round(2.4) gives 2 and leaves students behind." },
];

export default function Unit4_4(props) {
  const sections = [
    {
      label: "Arithmetic", kicker: "SEVEN OPERATORS", title: "Python as a calculator",
      blocks: [
        <P>You've used <code>+ - * /</code> already. Python has three more: <code>//</code> (whole-number division), <code>%</code> (remainder) and <code>**</code> (power). Pick numbers and an operator:</P>,
        <Calculator />,
        EX.ops,
        <P><code>//</code> and <code>%</code> are a pair: one answers “how many whole times?”, the other “what's left over?”. Real uses:</P>,
        EX.clock,
        EX.digits,
        <KeyIdea><code>/</code> always gives a float. <code>//</code> gives the whole-number part, <code>%</code> the remainder. Last digit: <code>n % 10</code>. Even number: <code>n % 2 == 0</code> (you'll use this in Module 5).</KeyIdea>,
      ],
    },
    {
      label: "Order", kicker: "PRECEDENCE", title: "Which part goes first?",
      blocks: [
        <P>Python follows the order you learnt in maths (BODMAS): <strong>brackets</strong>, then <code>**</code>, then <code>* / // %</code>, then <code>+ -</code>. Same level: left to right. Step through:</P>,
        <Precedence />,
        EX.average,
        <KeyIdea>When in doubt, add brackets. <code>(m1 + m2 + m3) / 3</code> is both correct and obvious to anyone reading it.</KeyIdea>,
      ],
    },
    {
      label: "Shortcuts", kicker: "+=  AND  \"=\" * 26", title: "Two shortcuts you'll use every day",
      blocks: [
        <P>Updating a variable with its old value is so common that Python has a shortcut. These pairs do exactly the same thing:</P>,
        <div className="fh-two" style={{ maxWidth: 760 }}>
          <CodeBlock title="long way" code={"score = score + 1\nwallet = wallet - 120\nprice = price * 2"} />
          <CodeBlock title="shortcut" code={"score += 1\nwallet -= 120\nprice *= 2"} />
        </div>,
        EX.shortcut,
        <P>Operators work on text too: <code>+</code> joins text (Unit 4.3) and <code>*</code> repeats it.</P>,
        EX.banner,
      ],
    },
    {
      label: "round & abs", kicker: "TIDY NUMBERS", title: "round() and abs()",
      blocks: [
        <P><code>round(x, 2)</code> keeps two decimal places; <code>round(x)</code> rounds to a whole number. <code>abs(x)</code> drops the minus sign — “how far apart?”, whichever way.</P>,
        EX.rounding,
        <Note icon="🎯">Python's <code>round()</code> sends an exact <code>.5</code> to the nearest <strong>even</strong> number: <code>round(2.5)</code> is 2, <code>round(3.5)</code> is 4. It's on purpose (it stops totals drifting upward), and it surprises almost everyone the first time.</Note>,
        EX.temp,
      ],
    },
    {
      label: "import math", kicker: "YOUR FIRST MODULE", title: "Opening Python's maths toolbox",
      blocks: [
        <P>Not everything is built in. Square roots, π, and rounding <em>up</em> live in the <code>math</code> module. <code>import math</code> at the top of your program, then call its tools with <code>math.</code> in front. (You can also write <code>from math import sqrt</code> and then just <code>sqrt(…)</code>.)</P>,
        EX.mathmod,
        EX.buses,
        <KeyIdea><code>math.ceil</code> always rounds up, <code>math.floor</code> always down, <code>round</code> to the nearest. Pick by the question: buses and boxes need <code>ceil</code>.</KeyIdea>,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: Simple Interest",
      blocks: [
        <P>Input with <code>float()</code>, a formula, and <code>round()</code> — everything from Units 4.2 to 4.4 in one program.</P>,
        EX.interest,
      ],
    },
  ];
  return (
    <LessonShell
      {...props}
      unitId="Unit4_4"
      crumb="MODULE 4 › UNIT 4.4"
      title="Operators & Expressions"
      sections={sections}
      quiz={QUIZ}
      next={{ title: "Unit 4.5 — Formatted Output", text: "f-strings: print Rs 450.00 instead of Rs 450.0, line things up, and stop fighting commas." }}
    />
  );
}
