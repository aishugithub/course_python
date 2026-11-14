// Unit 5.3 — Combining Conditions (rebuilt on the typing-first lesson kit)
// and → or / not (truth table, the `== "Sat" or "Sun"` bug) → ranges
// (0 <= m <= 100) and the conditional expression → nested if → short-circuit.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const codeBox = { margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre-wrap" };
const slider = { width: "100%", accentColor: T.navy };
const chip = (v) => ({ flex: 1, textAlign: "center", padding: "8px 10px", borderRadius: 8, fontFamily: CODE_FONT, fontWeight: 700, background: tint(v ? T.green : T.red, "14"), border: `1.5px solid ${v ? T.green : T.red}`, color: v ? T.green : T.red });

// ── Widget: and — both must hold ──
function LoanCheck() {
  const [age, setAge] = useState(23);
  const [income, setIncome] = useState(20000);
  const a = age >= 21, b = income >= 25000;
  return (
    <div className="fh-two">
      <div>
        <label style={{ fontFamily: CODE_FONT }}>age = <strong>{age}</strong></label>
        <input type="range" min={15} max={70} value={age} onChange={(e) => setAge(Number(e.target.value))} style={slider} />
        <label style={{ fontFamily: CODE_FONT }}>income = <strong>{income}</strong></label>
        <input type="range" min={0} max={60000} step={1000} value={income} onChange={(e) => setIncome(Number(e.target.value))} style={slider} />
      </div>
      <div>
        <pre style={codeBox}>{"if age >= 21 and income >= 25000:\n    print(\"Approved\")\nelse:\n    print(\"Rejected\")"}</pre>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
          <div style={chip(a)}>age &gt;= 21<br />{String(a ? "True" : "False")}</div>
          <strong style={{ fontFamily: CODE_FONT }}>and</strong>
          <div style={chip(b)}>income &gt;= 25000<br />{b ? "True" : "False"}</div>
          <strong>→</strong>
          <div style={chip(a && b)}>{a && b ? "Approved" : "Rejected"}</div>
        </div>
      </div>
    </div>
  );
}

// ── Widget: the and / or / not truth table ──
function TruthTable() {
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);
  const tog = (v, set, name) => (
    <button onClick={() => set(!v)} style={{ ...chip(v), cursor: "pointer", flex: "0 0 auto", minWidth: 120 }}>{name} = {v ? "True" : "False"}</button>
  );
  const rows = [
    ["p and q", p && q, "True only when BOTH are True"],
    ["p or q", p || q, "True when AT LEAST ONE is True"],
    ["not p", !p, "Flips True ↔ False"],
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>{tog(p, setP, "p")}{tog(q, setQ, "q")}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
        {rows.map(([e, v, n]) => (
          <div key={e} style={{ background: T.card, border: `1.5px solid ${tint(v ? T.green : T.red, "66")}`, borderRadius: 10, padding: 12 }}>
            <code style={{ fontSize: 15 }}>{e}</code> → <strong style={{ color: v ? T.green : T.red, fontFamily: CODE_FONT }}>{v ? "True" : "False"}</strong>
            <div style={{ fontSize: 13.5, color: T.slate, marginTop: 4 }}>{n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Widget: the "or" trap ──
function OrTrap() {
  const [day, setDay] = useState("Monday");
  return (
    <div className="fh-two">
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {["Monday", "Saturday", "Sunday"].map((d) => (
            <button key={d} onClick={() => setDay(d)} style={{ padding: "7px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, border: `1.5px solid ${day === d ? T.navy : T.border}`, background: day === d ? T.navy : T.card, color: day === d ? "#fff" : T.text }}>{d}</button>
          ))}
        </div>
        <pre style={codeBox}>{'if day == "Saturday" or "Sunday":\n    print("Weekend!")'}</pre>
      </div>
      <div style={{ background: tint(T.red, "0E"), border: `1px solid ${tint(T.red, "44")}`, borderRadius: 10, padding: 12, fontSize: 14.5, color: T.slate, lineHeight: 1.65 }}>
        Prints <strong style={{ color: T.red }}>Weekend!</strong> — even for {day}. Python reads it as
        <code>(day == "Saturday") or ("Sunday")</code>. The right side is just the text <code>"Sunday"</code>, which is non-empty, so truthy (Unit 5.1). <strong>Each side of or must be a full comparison</strong>: <code>day == "Saturday" or day == "Sunday"</code>.
      </div>
    </div>
  );
}

// ── Widget: nested if — the hall-ticket rule ──
function HallTicket() {
  const [att, setAtt] = useState(82);
  const [inn, setInn] = useState(18);
  const outer = att >= 75, inner = inn >= 20;
  const msg = outer ? (inner ? "Hall ticket issued" : "Eligible - meet your mentor about internals") : (inner ? "Attendance shortage - apply for condonation" : "Not eligible - repeat the course");
  const line = (cond, txt, on) => <div style={{ background: on ? tint(T.green, "22") : "transparent", color: on ? T.green : cond ? T.text : T.muted, fontWeight: on ? 700 : 400, borderRadius: 4 }}>{txt}</div>;
  return (
    <div className="fh-two">
      <div>
        <label style={{ fontFamily: CODE_FONT }}>attendance = <strong>{att}</strong>%  (need 75)</label>
        <input type="range" min={40} max={100} value={att} onChange={(e) => setAtt(Number(e.target.value))} style={slider} />
        <label style={{ fontFamily: CODE_FONT }}>internal = <strong>{inn}</strong> / 40  (need 20)</label>
        <input type="range" min={0} max={40} value={inn} onChange={(e) => setInn(Number(e.target.value))} style={slider} />
        <div style={{ marginTop: 10, fontFamily: CODE_FONT, fontWeight: 700, color: T.green }}>&gt; {msg}</div>
      </div>
      <div style={{ ...codeBox, whiteSpace: "pre" }}>
        {line(true, "if attendance >= 75:", false)}
        {line(outer, "    if internal >= 20:", false)}
        {line(outer, '        print("Hall ticket issued")', outer && inner)}
        {line(outer, "    else:", false)}
        {line(outer, '        print("Eligible - meet your mentor ...")', outer && !inner)}
        {line(true, "else:", false)}
        {line(!outer, "    if internal >= 20:", false)}
        {line(!outer, '        print("Attendance shortage - ...")', !outer && inner)}
        {line(!outer, "    else:", false)}
        {line(!outer, '        print("Not eligible - ...")', !outer && !inner)}
      </div>
    </div>
  );
}

// ── Exercise specs ──
const EX = {
  loan: {
    id: "loan", kind: "write", title: "Loan check with and",
    task: <>Ask <code>Age: </code> and <code>Income: </code> (whole numbers). Print <code>Approved</code> if the age is at least 21 <strong>and</strong> the income is at least 25000; otherwise <code>Rejected</code>.</>,
    tests: [
      { inputs: ["30", "40000"], expect: "Age: 30\nIncome: 40000\nApproved" },
      { inputs: ["20", "90000"], expect: "Age: 20\nIncome: 90000\nRejected", hidden: true },
      { inputs: ["45", "24999"], expect: "Age: 45\nIncome: 24999\nRejected", hidden: true },
      { inputs: ["21", "25000"], expect: "Age: 21\nIncome: 25000\nApproved", hidden: true },
    ],
    requires: [{ node: "BoolOp", msg: "Combine both conditions in one if with and." }],
    hints: ["if age >= 21 and income >= 25000:"],
    solution: 'age = int(input("Age: "))\nincome = int(input("Income: "))\nif age >= 21 and income >= 25000:\n    print("Approved")\nelse:\n    print("Rejected")',
  },
  weekend: {
    id: "weekend", kind: "write", title: "Weekend or weekday (or)",
    task: <>Ask <code>Day: </code>. Print <code>Weekend</code> if it is <code>Saturday</code> or <code>Sunday</code>, otherwise <code>Weekday</code>.</>,
    tests: [
      { inputs: ["Sunday"], expect: "Day: Sunday\nWeekend" },
      { inputs: ["Saturday"], expect: "Day: Saturday\nWeekend", hidden: true },
      { inputs: ["Monday"], expect: "Day: Monday\nWeekday", hidden: true },
    ],
    requires: [{ text: " or ", msg: "Use or." }],
    hints: ['Each side of or must be a complete comparison: day == "Saturday" or day == "Sunday"'],
    solution: 'day = input("Day: ")\nif day == "Saturday" or day == "Sunday":\n    print("Weekend")\nelse:\n    print("Weekday")',
  },
  orbug: {
    id: "orbug", kind: "fix", title: "Every day is a holiday?",
    task: <>Exams are on weekdays, holidays are Saturday and Sunday. Run it with the test input — a Monday — and fix the condition.</>,
    starter: 'day = input("Day: ")\nif day == "Saturday" or "Sunday":\n    print("Holiday!")\nelse:\n    print("Exam day")',
    tests: [{ inputs: ["Monday"], expect: "Day: Monday\nExam day" }, { inputs: ["Sunday"], expect: "Day: Sunday\nHoliday!", hidden: true }, { inputs: ["Saturday"], expect: "Day: Saturday\nHoliday!", hidden: true }],
    hints: ['"Sunday" on its own is non-empty text — always truthy.', 'day == "Saturday" or day == "Sunday"'],
    solution: 'day = input("Day: ")\nif day == "Saturday" or day == "Sunday":\n    print("Holiday!")\nelse:\n    print("Exam day")',
  },
  fees: {
    id: "fees", kind: "write", title: "not",
    task: <>Ask <code>Fees paid (yes/no): </code> and store <code>paid = answer == "yes"</code> — a bool. Then use <code>if not paid:</code> to print <code>Pay your fees first</code>; otherwise print <code>Hall ticket ready</code>.</>,
    tests: [
      { inputs: ["no"], expect: "Fees paid (yes/no): no\nPay your fees first" },
      { inputs: ["yes"], expect: "Fees paid (yes/no): yes\nHall ticket ready", hidden: true },
    ],
    requires: [{ text: "not ", msg: "Use if not paid:" }],
    hints: ['answer = input("Fees paid (yes/no): ")', 'paid = answer == "yes"   # True or False'],
    solution: 'answer = input("Fees paid (yes/no): ")\npaid = answer == "yes"\nif not paid:\n    print("Pay your fees first")\nelse:\n    print("Hall ticket ready")',
  },
  range: {
    id: "range", kind: "write", title: "Is it a valid mark?",
    task: <>A mark must be between 0 and 100, both included. Ask <code>Mark: </code> and print <code>Valid</code> or <code>Invalid mark</code>. Python lets you write a range the maths way: <code>0 &lt;= mark &lt;= 100</code>.</>,
    tests: [
      { inputs: ["67"], expect: "Mark: 67\nValid" },
      { inputs: ["101"], expect: "Mark: 101\nInvalid mark", hidden: true }, { inputs: ["-1"], expect: "Mark: -1\nInvalid mark", hidden: true },
      { inputs: ["0"], expect: "Mark: 0\nValid", hidden: true }, { inputs: ["100"], expect: "Mark: 100\nValid", hidden: true },
    ],
    requires: [{ node: "If" }],
    hints: ["if 0 <= mark <= 100: — or the long way: mark >= 0 and mark <= 100"],
    solution: 'mark = int(input("Mark: "))\nif 0 <= mark <= 100:\n    print("Valid")\nelse:\n    print("Invalid mark")',
  },
  oneline: {
    id: "oneline", kind: "complete", title: "Choose a value in one line",
    task: <>When an if / else only picks between two values, Python has a one-line form: <code>value_if_true if condition else value_if_false</code>. Fill the blanks.</>,
    starter: 'marks = int(input("Marks: "))\nresult = ___ if marks >= 40 else ___\nprint(f"Result: {result}")',
    tests: [{ inputs: ["55"], expect: "Marks: 55\nResult: Pass" }, { inputs: ["12"], expect: "Marks: 12\nResult: Fail", hidden: true }],
    requires: [{ node: "IfExp", msg: "Use the one-line form: \"Pass\" if marks >= 40 else \"Fail\"" }],
    hints: ['result = "Pass" if marks >= 40 else "Fail"'],
    solution: 'marks = int(input("Marks: "))\nresult = "Pass" if marks >= 40 else "Fail"\nprint(f"Result: {result}")',
  },
  hall: {
    id: "hall", kind: "write", title: "Hall-ticket rule (nested if)",
    task: <>Ask <code>Attendance: </code> and <code>Internal: </code>. Write the nested rule from the widget, printing exactly one of: <code>Hall ticket issued</code> · <code>Eligible - meet your mentor about internals</code> · <code>Attendance shortage - apply for condonation</code> · <code>Not eligible - repeat the course</code>.</>,
    minLines: 12,
    tests: [
      { inputs: ["82", "25"], expect: "Attendance: 82\nInternal: 25\nHall ticket issued" },
      { inputs: ["90", "12"], expect: "Attendance: 90\nInternal: 12\nEligible - meet your mentor about internals", hidden: true },
      { inputs: ["70", "30"], expect: "Attendance: 70\nInternal: 30\nAttendance shortage - apply for condonation", hidden: true },
      { inputs: ["60", "10"], expect: "Attendance: 60\nInternal: 10\nNot eligible - repeat the course", hidden: true },
      { inputs: ["75", "20"], expect: "Attendance: 75\nInternal: 20\nHall ticket issued", hidden: true },
    ],
    requires: [{ node: "If", min: 3, msg: "One outer if, and an inner if inside each branch." }],
    hints: ["The inner if/else is indented 4 more spaces than the outer one.", "Outer: attendance >= 75. Inner (on both sides): internal >= 20."],
    solution: 'attendance = int(input("Attendance: "))\ninternal = int(input("Internal: "))\nif attendance >= 75:\n    if internal >= 20:\n        print("Hall ticket issued")\n    else:\n        print("Eligible - meet your mentor about internals")\nelse:\n    if internal >= 20:\n        print("Attendance shortage - apply for condonation")\n    else:\n        print("Not eligible - repeat the course")',
  },
  safe: {
    id: "safe", kind: "fix", title: "Order saves you from a crash",
    task: <>The average is only meaningful when at least one test was taken. With 0 tests this crashes. Run it, then fix it by <strong>swapping the two sides of and</strong> — so the safe check runs first.</>,
    starter: 'total = int(input("Total marks: "))\ncount = int(input("Tests taken: "))\nif total / count >= 50 and count > 0:\n    print("Good average")\nelse:\n    print("Not enough data or low average")',
    tests: [
      { inputs: ["0", "0"], expect: "Total marks: 0\nTests taken: 0\nNot enough data or low average" },
      { inputs: ["240", "4"], expect: "Total marks: 240\nTests taken: 4\nGood average", hidden: true },
      { inputs: ["90", "3"], expect: "Total marks: 90\nTests taken: 3\nNot enough data or low average", hidden: true },
    ],
    hints: ["and stops as soon as the left side is False — the right side never runs.", "if count > 0 and total / count >= 50:"],
    solution: 'total = int(input("Total marks: "))\ncount = int(input("Tests taken: "))\nif count > 0 and total / count >= 50:\n    print("Good average")\nelse:\n    print("Not enough data or low average")',
  },
  scholarship: {
    id: "scholarship", kind: "make", title: "Scholarship decider",
    task: <>Ask <code>Marks: </code> (decimal), <code>Family income: </code> (whole number) and <code>Sports quota (yes/no): </code>. A student gets the scholarship if <strong>(marks ≥ 85 and income &lt; 300000)</strong> <strong>or</strong> <strong>(sports quota and marks ≥ 60)</strong>. Print <code>Scholarship: Yes</code> or <code>Scholarship: No</code>.</>,
    minLines: 10,
    tests: [
      { inputs: ["90", "250000", "no"], expect: "Marks: 90\nFamily income: 250000\nSports quota (yes/no): no\nScholarship: Yes" },
      { inputs: ["90", "500000", "no"], expect: "Marks: 90\nFamily income: 500000\nSports quota (yes/no): no\nScholarship: No", hidden: true },
      { inputs: ["65", "900000", "yes"], expect: "Marks: 65\nFamily income: 900000\nSports quota (yes/no): yes\nScholarship: Yes", hidden: true },
      { inputs: ["55", "100000", "yes"], expect: "Marks: 55\nFamily income: 100000\nSports quota (yes/no): yes\nScholarship: No", hidden: true },
      { inputs: ["85", "299999", "no"], expect: "Marks: 85\nFamily income: 299999\nSports quota (yes/no): no\nScholarship: Yes", hidden: true },
    ],
    requires: [{ node: "BoolOp", min: 2, msg: "Combine conditions with and / or." }],
    hints: ['sports = input("Sports quota (yes/no): ") == "yes"', "Use brackets to group each and-pair, then join the two groups with or."],
    solution: 'marks = float(input("Marks: "))\nincome = int(input("Family income: "))\nsports = input("Sports quota (yes/no): ") == "yes"\nif (marks >= 85 and income < 300000) or (sports and marks >= 60):\n    print("Scholarship: Yes")\nelse:\n    print("Scholarship: No")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "True and False gives…", options: ["True", "False"], answer: 1, explain: "and needs both sides True." },
  { q: "True or False gives…", options: ["True", "False"], answer: 0, explain: "or needs at least one side True." },
  { q: "For day = \"Monday\", what does day == \"Saturday\" or \"Sunday\" give?", options: ["False", "True — the bare text \"Sunday\" is truthy", "An error", "\"Monday\""], answer: 1, explain: "Python reads it as (day == \"Saturday\") or \"Sunday\". Write both comparisons in full." },
  { q: "Which checks that m is between 1 and 10, inclusive?", options: ["1 < m < 10", "1 <= m <= 10", "m >= 1 or m <= 10", "1 <= m or m <= 10"], answer: 1, explain: "<= includes the ends. or would accept every number." },
  { q: "What is result?", code: 'temp = 38\nresult = "Hot" if temp > 35 else "Fine"', options: ["\"Fine\"", "\"Hot\"", "True", "Error"], answer: 1, explain: "The condition is True, so the value before if is chosen." },
  { q: "Why does count > 0 and total / count > 5 never crash when count is 0?", options: ["Python fixes division by zero", "and stops at the first False, so the division never runs", "Because > is checked first", "It does crash"], answer: 1, explain: "Short-circuit: once the left side is False the answer is already False. Put the safety check first." },
  { q: "What does not (5 > 3) give?", options: ["True", "False"], answer: 1, explain: "5 > 3 is True; not flips it." },
];

export default function Unit5_3(props) {
  const sections = [
    {
      label: "and", kicker: "BOTH MUST HOLD", title: "and: two conditions at once",
      blocks: [
        <P>Real rules have more than one condition. A bank lends only if the applicant is <strong>old enough and</strong> earns enough. <code>and</code> is True only when both sides are True.</P>,
        <LoanCheck />,
        EX.loan,
      ],
    },
    {
      label: "or & not", kicker: "EITHER / FLIP", title: "or, not, and the truth table",
      blocks: [
        <P><code>or</code> is True when <em>at least one</em> side is True. <code>not</code> flips True and False. Toggle p and q:</P>,
        <TruthTable />,
        EX.weekend,
        <P>The most famous <code>or</code> bug in every first-year lab:</P>,
        <OrTrap />,
        EX.orbug,
        EX.fees,
        <KeyIdea>Each side of <code>and</code>/<code>or</code> must be a complete condition. When you mix them, use brackets: <code>and</code> binds tighter than <code>or</code>, which binds tighter than … nothing you want to guess.</KeyIdea>,
      ],
    },
    {
      label: "Ranges & One-liners", kicker: "PYTHON SHORTCUTS", title: "0 <= m <= 100, and choosing in one line",
      blocks: [
        <P>Python lets you chain comparisons like in maths: <code>0 &lt;= mark &lt;= 100</code> means <code>mark &gt;= 0 and mark &lt;= 100</code>. (Most languages, including C, don't allow this.)</P>,
        EX.range,
        EX.oneline,
      ],
    },
    {
      label: "Nested if", kicker: "DECISIONS INSIDE DECISIONS", title: "An if inside an if",
      blocks: [
        <P>Sometimes the second question only matters in one situation. The college checks attendance first; what low internals <em>mean</em> depends on which side of the attendance rule you are. Move the sliders:</P>,
        <HallTicket />,
        EX.hall,
        <Note color={T.blue} icon="🤔">Could this be one chain with <code>and</code>? Yes — but nesting mirrors how the rule is actually decided: attendance first, then internals.</Note>,
      ],
    },
    {
      label: "Short-circuit", kicker: "ORDER MATTERS", title: "Python stops as soon as it knows",
      blocks: [
        <P><code>and</code> stops at the first False; <code>or</code> stops at the first True. The rest is never even evaluated. That turns the order of conditions into a safety tool.</P>,
        EX.safe,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: scholarship decider",
      blocks: [
        <P>Two groups joined with <code>or</code>, each group an <code>and</code>, brackets to make the meaning obvious.</P>,
        EX.scholarship,
      ],
    },
  ];
  return (
    <LessonShell
      {...props}
      unitId="Unit5_3"
      crumb="MODULE 5 › UNIT 5.3"
      title="Combining Conditions"
      sections={sections}
      quiz={QUIZ}
      next={{ title: "Unit 5.4 — Capstone: Decision Maker", text: "Everything from Module 5 in one program that decides for real." }}
    />
  );
}
