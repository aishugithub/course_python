// Unit 5.1 — Comparisons & Booleans (rebuilt on the typing-first lesson kit)
// Comparison operators → = vs == → comparing text → truthy/falsy via bool()
// → the float equality gotcha. No `if` yet (that's 5.2) and no lists (M7).

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const numIn = { width: 90, padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${T.borderStrong}`, background: T.card, fontFamily: CODE_FONT, fontSize: 15, color: T.text };
const pill = (on, c = T.navy) => ({ padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${on ? c : T.border}`, background: on ? c : T.card, color: on ? "#fff" : T.text, fontWeight: 700, cursor: "pointer", fontFamily: CODE_FONT, fontSize: 15 });

// ── Widget: six comparison operators ──
const CMP = [
  { s: "==", n: "equal to", f: (a, b) => a === b },
  { s: "!=", n: "not equal to", f: (a, b) => a !== b },
  { s: "<", n: "less than", f: (a, b) => a < b },
  { s: ">", n: "greater than", f: (a, b) => a > b },
  { s: "<=", n: "less than or equal to", f: (a, b) => a <= b },
  { s: ">=", n: "greater than or equal to", f: (a, b) => a >= b },
];
function Comparator() {
  const [a, setA] = useState(40);
  const [b, setB] = useState(40);
  const [op, setOp] = useState(">=");
  const cur = CMP.find((c) => c.s === op);
  const r = cur.f(a, b);
  const num = (v) => (v === "" ? 0 : Number(v));
  return (
    <div className="fh-two">
      <div>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <label style={{ fontFamily: CODE_FONT }}>marks = <input type="number" value={a} onChange={(e) => setA(num(e.target.value))} style={numIn} /></label>
          <label style={{ fontFamily: CODE_FONT }}>pass_mark = <input type="number" value={b} onChange={(e) => setB(num(e.target.value))} style={numIn} /></label>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{CMP.map((c) => <button key={c.s} onClick={() => setOp(c.s)} style={pill(op === c.s)}>{c.s}</button>)}</div>
        <div style={{ fontSize: 13, color: T.muted, marginTop: 8 }}>Set both to 40 and compare &gt; with &gt;=.</div>
      </div>
      <div style={{ background: T.card, border: `1.5px solid ${tint(r ? T.green : T.red, "66")}`, borderRadius: 12, padding: 16 }}>
        <div style={{ fontFamily: CODE_FONT, fontSize: 15, color: T.muted }}>&gt;&gt;&gt; marks {op} pass_mark</div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 26, fontWeight: 700, color: r ? T.green : T.red, margin: "4px 0" }}>{r ? "True" : "False"}</div>
        <div style={{ color: T.slate, fontSize: 14.5 }}>Is {a} <strong>{cur.n}</strong> {b}? The answer is a value of type <code>bool</code>.</div>
      </div>
    </div>
  );
}

// ── Widget: truthy or falsy? ──
const VALS = [
  { v: "0", f: true, why: "Zero is the only falsy number (0 or 0.0)." },
  { v: "-5", f: false, why: "Any non-zero number is truthy — negatives too." },
  { v: "0.0", f: true, why: "Zero as a float is still zero: falsy." },
  { v: '""', f: true, why: "The EMPTY string is the only falsy string." },
  { v: '"0"', f: false, why: "Not empty — it has one character. Truthy, even though it looks like 0." },
  { v: '" "', f: false, why: "A single space is a character, so the string isn't empty: truthy." },
  { v: '"False"', f: false, why: "Five characters of text. Only the real value False is falsy." },
  { v: "None", f: true, why: "None means “no value at all” (Python's version of C's NULL). Always falsy." },
  { v: "False", f: true, why: "False itself, of course." },
];
function Truthiness() {
  const [ans, setAns] = useState({});
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
      {VALS.map((x, i) => {
        const a = ans[i];
        const right = a !== undefined && a === x.f;
        return (
          <div key={i} style={{ background: T.card, border: `1.5px solid ${a === undefined ? T.border : right ? T.green : T.red}`, borderRadius: 10, padding: "10px 12px" }}>
            <code style={{ fontSize: 15 }}>bool({x.v})</code>
            {a === undefined ? (
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <button onClick={() => setAns({ ...ans, [i]: false })} style={{ ...pill(false), fontSize: 13, padding: "5px 10px" }}>True</button>
                <button onClick={() => setAns({ ...ans, [i]: true })} style={{ ...pill(false), fontSize: 13, padding: "5px 10px" }}>False</button>
              </div>
            ) : (
              <div style={{ fontSize: 13.5, marginTop: 6, color: right ? T.green : T.red }}>
                → <strong>{x.f ? "False" : "True"}</strong> {right ? "✓" : "✗"} <span style={{ color: T.slate }}>{x.why}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Exercise specs ──
const EX = {
  compare: {
    id: "compare", kind: "type", title: "Six questions with yes/no answers",
    task: <>Predict each line, then type and run.</>,
    show: "marks = 72\nprint(marks >= 40)\nprint(marks == 100)\nprint(marks != 0)\nprint(marks < 50)\nprint(type(marks > 50))",
    tests: [{ expect: "True\nFalse\nTrue\nFalse\n<class 'bool'>" }],
    hints: ["Each comparison is a question; Python answers True or False."],
    solution: "marks = 72\nprint(marks >= 40)\nprint(marks == 100)\nprint(marks != 0)\nprint(marks < 50)\nprint(type(marks > 50))",
  },
  pass: {
    id: "pass", kind: "write", title: "Did I pass?",
    task: <>The pass mark is 40 — and exactly 40 passes. Ask <code>Mark: </code> and print <code>Passed: True</code> or <code>Passed: False</code> by putting a comparison inside the print.</>,
    tests: [
      { inputs: ["72"], expect: "Mark: 72\nPassed: True" },
      { inputs: ["39"], expect: "Mark: 39\nPassed: False", hidden: true },
      { inputs: ["40"], expect: "Mark: 40\nPassed: True", hidden: true },
    ],
    requires: [{ node: "Compare", msg: "Use a comparison like mark >= 40." }],
    hints: ["print can show the result of a comparison directly.", "Does 40 pass? Then > isn't enough — you need >=.", 'print("Passed:", mark >= 40)'],
    solution: 'mark = int(input("Mark: "))\nprint("Passed:", mark >= 40)',
  },
  vote: {
    id: "vote", kind: "fix", title: "= is not ==",
    task: <>This should say whether someone can vote (age 18 or more). It runs without an error — run it with the test input and look at what it prints. Fix line 2.</>,
    starter: 'age = int(input("Age: "))\ncan_vote = age = 18\nprint("Can vote:", can_vote)',
    tests: [
      { inputs: ["20"], expect: "Age: 20\nCan vote: True" },
      { inputs: ["16"], expect: "Age: 16\nCan vote: False", hidden: true },
      { inputs: ["18"], expect: "Age: 18\nCan vote: True", hidden: true },
    ],
    hints: ["One = means “store”. So age = 18 stores 18 in age — it doesn't ask anything.", "You want: is age at least 18? → age >= 18"],
    solution: 'age = int(input("Age: "))\ncan_vote = age >= 18\nprint("Can vote:", can_vote)',
  },
  text: {
    id: "text", kind: "type", title: "Comparing text",
    task: <>Text is compared character by character, using each character's code. Capitals come before small letters, and digits before both. Predict, then run — the last line connects straight back to input() in Unit 4.3.</>,
    show: 'print("cat" == "cat")\nprint("Cat" == "cat")\nprint("apple" < "banana")\nprint("Zebra" < "apple")\nprint("10" < "9")',
    tests: [{ expect: "True\nFalse\nTrue\nTrue\nTrue" }],
    hints: ['"10" < "9" compares the first characters: "1" comes before "9".'],
    solution: 'print("cat" == "cat")\nprint("Cat" == "cat")\nprint("apple" < "banana")\nprint("Zebra" < "apple")\nprint("10" < "9")',
  },
  password: {
    id: "password", kind: "write", title: "Password check",
    task: <>Store the correct password <code>"python123"</code> in a variable. Ask <code>Password: </code> and print <code>Correct: True</code> or <code>Correct: False</code>. Capitals matter.</>,
    tests: [
      { inputs: ["python123"], expect: "Password: python123\nCorrect: True" },
      { inputs: ["Python123"], expect: "Password: Python123\nCorrect: False", hidden: true },
      { inputs: ["python"], expect: "Password: python\nCorrect: False", hidden: true },
    ],
    requires: [{ node: "Compare", msg: "Compare what was typed with the stored password using ==." }],
    hints: ['secret = "python123"', 'print("Correct:", typed == secret)'],
    solution: 'secret = "python123"\ntyped = input("Password: ")\nprint("Correct:", typed == secret)',
  },
  truthy: {
    id: "truthy", kind: "type", title: "bool() on any value",
    task: <><code>bool( )</code> converts any value to True or False — the same test Python uses when you put a value after <code>if</code> in the next unit.</>,
    show: 'print(bool(0))\nprint(bool(-5))\nprint(bool(""))\nprint(bool("0"))\nprint(bool(" "))\nprint(bool(None))',
    tests: [{ expect: "False\nTrue\nFalse\nTrue\nTrue\nFalse" }],
    hints: ["Only zero, empty text, None and False are falsy."],
    solution: 'print(bool(0))\nprint(bool(-5))\nprint(bool(""))\nprint(bool("0"))\nprint(bool(" "))\nprint(bool(None))',
  },
  floaty: {
    id: "floaty", kind: "fix", title: "When 0.1 + 0.2 isn't 0.3",
    task: <>Run it. Computers store most decimals as tiny approximations, so <code>0.1 + 0.2</code> is really <code>0.30000000000000004</code>. Make the comparison print <code>True</code> by comparing <strong>rounded</strong> values — the safe way to compare floats.</>,
    starter: 'total = 0.1 + 0.2\nprint(total)\nprint("Equal to 0.3?", total == 0.3)',
    tests: [{ expect: "0.30000000000000004\nEqual to 0.3? True" }],
    requires: [{ call: "round", msg: "Compare round(total, 2) with 0.3." }],
    hints: ["Keep line 2 as it is — it shows the real stored value.", 'print("Equal to 0.3?", round(total, 2) == 0.3)'],
    solution: 'total = 0.1 + 0.2\nprint(total)\nprint("Equal to 0.3?", round(total, 2) == 0.3)',
  },
  report: {
    id: "report", kind: "make", title: "Eligibility report",
    task: <>Ask <code>Age: </code> (whole number), <code>Marks: </code> (decimal) and <code>Attendance: </code> (whole-number %). Print three lines with f-strings: adult if age is at least 18, passed if marks are at least 40, attendance OK if it is at least 75.</>,
    minLines: 8,
    tests: [
      { inputs: ["19", "56.5", "72"], expect: "Age: 19\nMarks: 56.5\nAttendance: 72\nAdult: True\nPassed: True\nAttendance OK: False" },
      { inputs: ["17", "40", "75"], expect: "Age: 17\nMarks: 40\nAttendance: 75\nAdult: False\nPassed: True\nAttendance OK: True", hidden: true },
      { inputs: ["18", "39.5", "90"], expect: "Age: 18\nMarks: 39.5\nAttendance: 90\nAdult: True\nPassed: False\nAttendance OK: True", hidden: true },
    ],
    requires: [{ node: "Compare", min: 3, msg: "Three comparisons, one per line." }, { node: "JoinedStr", min: 1, msg: "Use f-strings (Unit 4.5)." }],
    hints: ['print(f"Adult: {age >= 18}")', "Exactly 40 marks and exactly 75% attendance both count — >= not >."],
    solution: 'age = int(input("Age: "))\nmarks = float(input("Marks: "))\nattendance = int(input("Attendance: "))\nprint(f"Adult: {age >= 18}")\nprint(f"Passed: {marks >= 40}")\nprint(f"Attendance OK: {attendance >= 75}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What does 7 >= 7 give?", options: ["True", "False", "7", "Error"], answer: 0, explain: ">= means greater than OR equal. 7 is equal to 7." },
  { q: "What is the difference between = and ==?", options: ["None", "= stores a value; == asks whether two values are equal", "== stores; = compares", "= is for numbers, == for text"], answer: 1,
    explain: "x = 5 stores 5 in x. x == 5 asks “is x equal to 5?” and gives True or False." },
  { q: "What does \"10\" < \"9\" give?", options: ["False — 10 is bigger", "True — text is compared character by character, and \"1\" comes before \"9\"", "Error", "None"], answer: 1,
    explain: "As text, the first characters decide. Convert with int() first if you want numeric comparison — another reason to convert input()." },
  { q: "Which value is truthy?", options: ["0", "\"\"", "\"0\"", "None"], answer: 2, explain: "\"0\" is a non-empty string, so it's truthy. 0, \"\" and None are all falsy." },
  { q: "What does 0.1 + 0.2 == 0.3 give?", options: ["True", "False", "Error", "0.3"], answer: 1,
    explain: "0.1 + 0.2 is stored as 0.30000000000000004. Compare floats with round() (or abs(a - b) < a tiny number), never with == directly." },
  { q: "What is type(3 > 2)?", options: ["<class 'int'>", "<class 'bool'>", "<class 'str'>", "<class 'True'>"], answer: 1, explain: "Every comparison produces a bool: True or False." },
];

export default function Unit5_1(props) {
  const sections = [
    {
      label: "Comparisons", kicker: "THE NEED", title: "Questions with yes/no answers",
      blocks: [
        <P>Every decision a program makes starts with a question: <em>Did the student pass? Is the user old enough? Is the password right?</em> Python asks these with <strong>comparison operators</strong>, and the answer is always <code>True</code> or <code>False</code> — values of the type <code>bool</code>.</P>,
        <Comparator />,
        EX.compare,
        EX.pass,
        <KeyIdea>Six comparisons: <code>== != &lt; &gt; &lt;= &gt;=</code>. Each answers with a <code>bool</code>. Watch the boundary: “40 and above” is <code>&gt;= 40</code>, not <code>&gt; 40</code>.</KeyIdea>,
      ],
    },
    {
      label: "= vs ==", kicker: "THE CLASSIC MIX-UP", title: "Storing is not asking",
      blocks: [
        <P><code>=</code> <strong>stores</strong> a value (the name-tag move from Unit 4.2). <code>==</code> <strong>asks</strong> whether two values are equal. Mixing them up is one of the most common beginner bugs — and sometimes Python doesn't even complain.</P>,
        EX.vote,
      ],
    },
    {
      label: "Comparing Text", kicker: "STRINGS", title: "== and < work on text too",
      blocks: [
        <P>Text equality is exact: one different capital makes it unequal. <code>&lt;</code> and <code>&gt;</code> compare text like a dictionary does — mostly. The surprises are worth seeing once:</P>,
        EX.text,
        EX.password,
        <Note icon="⚠️">Because <code>input()</code> gives text, <code>input() &lt; "9"</code> compares characters, not numbers. Convert first, as in Unit 4.3.</Note>,
      ],
    },
    {
      label: "Truthy & Falsy", kicker: "EVERY VALUE HAS A TRUTH VALUE", title: "Truthy and falsy",
      blocks: [
        <P>Python can treat <em>any</em> value as True or False. The rule: <strong>zero, empty text, <code>None</code> and <code>False</code> are falsy</strong>; everything else is truthy. Guess each one:</P>,
        <Truthiness />,
        EX.truthy,
        <KeyIdea><code>None</code> is a special value meaning “nothing here”. It's falsy, it isn't 0, and it isn't <code>""</code>. You'll meet it again when functions return nothing (Module 8).</KeyIdea>,
      ],
    },
    {
      label: "Float Trap", kicker: "DON'T == DECIMALS", title: "Comparing decimal numbers safely",
      blocks: [
        <P>Most decimals can't be stored exactly in binary, just as 1/3 can't be written exactly in decimal. Tiny errors appear, and <code>==</code> notices them.</P>,
        EX.floaty,
        <KeyIdea>Never use <code>==</code> on results of float arithmetic. Compare rounded values, or check that the difference is tiny: <code>abs(a - b) &lt; 0.000001</code>.</KeyIdea>,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: eligibility report",
      blocks: [
        <P>Three inputs, three comparisons, f-strings. In the next unit, the same comparisons will make your program <em>choose</em> what to do.</P>,
        EX.report,
      ],
    },
  ];
  return (
    <LessonShell
      {...props}
      unitId="Unit5_1"
      crumb="MODULE 5 › UNIT 5.1"
      title="Comparisons & Booleans"
      sections={sections}
      quiz={QUIZ}
      next={{ title: "Unit 5.2 — if / elif / else", text: "Your True/False answers start steering the program: one question, many paths." }}
    />
  );
}
