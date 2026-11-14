// Unit 5.4 — Capstone: Exam Result Analyzer (rebuilt on the typing-first lesson kit)
// Capstone arc: The Mission → Version 1 → Version 2 → Version 3 → Play It
// → Make It (electricity bill with slab rates, a classic exam problem).

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const slider = { width: "100%", accentColor: T.navy };

function evaluate(avg, att) {
  if (!(avg >= 0 && avg <= 100 && att >= 0 && att <= 100)) return ["Invalid input"];
  const out = [`Result: ${avg >= 40 ? "Pass" : "Fail"}`];
  out.push(`Grade: ${avg >= 90 ? "A" : avg >= 75 ? "B" : avg >= 60 ? "C" : avg >= 40 ? "D" : "F"}`);
  if (avg >= 85 && att >= 75) {
    out.push("Scholarship: Yes");
    if (att >= 90) out.push("Honor Roll: Yes");
  } else out.push("Scholarship: No");
  return out;
}

// ── Widget: the mission checklist ──
function Mission() {
  const rows = [
    ["Read two numbers (average, attendance)", "input + float/int", "4.3"],
    ["Pass or fail", "comparison, if / else", "5.1, 5.2"],
    ["Letter grade A–F", "if / elif / else chain", "5.2"],
    ["Scholarship: two conditions at once", "and", "5.3"],
    ["Honor Roll: only asked for scholars", "nested if", "5.3"],
    ["Reject impossible numbers", "0 <= x <= 100, not", "5.3"],
  ];
  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", maxWidth: 900 }}>
      {rows.map(([need, tool, unit], i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.4fr 70px", gap: 10, padding: "10px 14px", background: i % 2 ? T.surface : T.card, fontSize: 14.5, alignItems: "center" }}>
          <span>{need}</span><code style={{ justifySelf: "start" }}>{tool}</code><span style={{ color: T.bronze, fontWeight: 700 }}>{unit}</span>
        </div>
      ))}
    </div>
  );
}

// ── Widget: play with the finished program ──
function PlayIt() {
  const [avg, setAvg] = useState(88);
  const [att, setAtt] = useState(92);
  const out = evaluate(avg, att);
  return (
    <div className="fh-two">
      <div>
        <label style={{ fontFamily: CODE_FONT }}>average = <strong>{avg}</strong></label>
        <input type="range" min={-5} max={105} value={avg} onChange={(e) => setAvg(Number(e.target.value))} style={slider} />
        <label style={{ fontFamily: CODE_FONT }}>attendance = <strong>{att}</strong></label>
        <input type="range" min={-5} max={105} value={att} onChange={(e) => setAtt(Number(e.target.value))} style={slider} />
        <div style={{ fontSize: 13.5, color: T.slate, marginTop: 8 }}>Find inputs that give each possible output. Can you get Honor Roll without Grade A? (Yes — how?)</div>
      </div>
      <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 15, lineHeight: 1.7, background: T.termBg, color: T.termText, borderRadius: 10, padding: "12px 14px", minHeight: 140 }}>{out.join("\n")}</pre>
    </div>
  );
}

// ── Exercise specs ──
const head = (a, b) => `Average marks: ${a}\nAttendance %: ${b}\n`;
const V1 = 'average = float(input("Average marks: "))\nattendance = int(input("Attendance %: "))\nif average >= 40:\n    print("Result: Pass")\nelse:\n    print("Result: Fail")\nif average >= 90:\n    grade = "A"\nelif average >= 75:\n    grade = "B"\nelif average >= 60:\n    grade = "C"\nelif average >= 40:\n    grade = "D"\nelse:\n    grade = "F"\nprint(f"Grade: {grade}")';
const V2 = V1 + '\nif average >= 85 and attendance >= 75:\n    print("Scholarship: Yes")\nelse:\n    print("Scholarship: No")';
const V3 = 'average = float(input("Average marks: "))\nattendance = int(input("Attendance %: "))\nif not (0 <= average <= 100 and 0 <= attendance <= 100):\n    print("Invalid input")\nelse:\n    if average >= 40:\n        print("Result: Pass")\n    else:\n        print("Result: Fail")\n    if average >= 90:\n        grade = "A"\n    elif average >= 75:\n        grade = "B"\n    elif average >= 60:\n        grade = "C"\n    elif average >= 40:\n        grade = "D"\n    else:\n        grade = "F"\n    print(f"Grade: {grade}")\n    if average >= 85 and attendance >= 75:\n        print("Scholarship: Yes")\n        if attendance >= 90:\n            print("Honor Roll: Yes")\n    else:\n        print("Scholarship: No")';

const EX = {
  v1: {
    id: "v1", kind: "write", title: "Version 1 — Pass and grade",
    task: <>Ask <code>Average marks: </code> (decimal) and <code>Attendance %: </code> (whole number). Print <code>Result: Pass</code> (40 or more) or <code>Result: Fail</code>, then the grade: <code>A</code> ≥ 90, <code>B</code> ≥ 75, <code>C</code> ≥ 60, <code>D</code> ≥ 40, else <code>F</code>, as <code>Grade: B</code>. Attendance isn't used yet — Version 2 needs it.</>,
    minLines: 18,
    tests: [
      { inputs: ["88", "92"], expect: head(88, 92) + "Result: Pass\nGrade: B" },
      { inputs: ["39.5", "80"], expect: head(39.5, 80) + "Result: Fail\nGrade: F", hidden: true },
      { inputs: ["40", "50"], expect: head(40, 50) + "Result: Pass\nGrade: D", hidden: true },
      { inputs: ["90", "10"], expect: head(90, 10) + "Result: Pass\nGrade: A", hidden: true },
      { inputs: ["60", "60"], expect: head(60, 60) + "Result: Pass\nGrade: C", hidden: true },
    ],
    requires: [{ text: "elif", min: 3, msg: "Five grades → if, three elifs, else." }],
    hints: ["Two separate decisions: first pass/fail (if/else), then the grade (a chain).", "Store the grade in a variable inside the chain and print it once afterwards with an f-string."],
    solution: V1,
  },
  v2: {
    id: "v2", kind: "modify", title: "Version 2 — Add the scholarship",
    task: <>Your Version 1 is loaded below. Add one more decision at the end: a scholarship needs an average of <strong>85 or more and</strong> attendance of <strong>75 or more</strong>. Print <code>Scholarship: Yes</code> or <code>Scholarship: No</code>.</>,
    starter: V1,
    minLines: 22,
    tests: [
      { inputs: ["88", "92"], expect: head(88, 92) + "Result: Pass\nGrade: B\nScholarship: Yes" },
      { inputs: ["88", "70"], expect: head(88, 70) + "Result: Pass\nGrade: B\nScholarship: No", hidden: true },
      { inputs: ["85", "75"], expect: head(85, 75) + "Result: Pass\nGrade: B\nScholarship: Yes", hidden: true },
      { inputs: ["84.9", "99"], expect: head(84.9, 99) + "Result: Pass\nGrade: B\nScholarship: No", hidden: true },
    ],
    requires: [{ text: " and ", msg: "Both conditions in one if with and." }],
    hints: ["Add the new if/else at the very end, at the left edge.", "if average >= 85 and attendance >= 75:"],
    solution: V2,
  },
  v3: {
    id: "v3", kind: "modify", title: "Version 3 — Honor Roll and bad input",
    task: <>Two upgrades. (1) A scholarship winner with attendance of <strong>90 or more</strong> also gets <code>Honor Roll: Yes</code>, printed right after <code>Scholarship: Yes</code> — a nested if, asked only for scholars. (2) If the average or the attendance is outside 0–100, print only <code>Invalid input</code>. Hint: wrap the whole report in an else, and indent it one level.</>,
    starter: V2,
    minLines: 28,
    tests: [
      { inputs: ["95", "92"], expect: head(95, 92) + "Result: Pass\nGrade: A\nScholarship: Yes\nHonor Roll: Yes" },
      { inputs: ["88", "80"], expect: head(88, 80) + "Result: Pass\nGrade: B\nScholarship: Yes", hidden: true },
      { inputs: ["101", "90"], expect: head(101, 90) + "Invalid input", hidden: true },
      { inputs: ["50", "-5"], expect: head(50, -5) + "Invalid input", hidden: true },
      { inputs: ["60", "95"], expect: head(60, 95) + "Result: Pass\nGrade: C\nScholarship: No", hidden: true },
    ],
    requires: [{ node: "If", min: 5 }],
    hints: ["Select every report line and press Tab to indent them all at once.", "if not (0 <= average <= 100 and 0 <= attendance <= 100): print(\"Invalid input\"), else: … the whole report …", "Inside the scholarship branch, add: if attendance >= 90: print(\"Honor Roll: Yes\")"],
    solution: V3,
  },
  ebill: {
    id: "ebill", kind: "make", title: "Electricity bill (slab rates)",
    task: <>A favourite exam problem. Ask <code>Units used: </code>. The first 100 units cost <strong>Rs 1.50</strong> each; units 101–200 cost <strong>Rs 2.50</strong> each; every unit above 200 costs <strong>Rs 4.00</strong>. Add a fixed charge of <strong>Rs 50</strong>. Print <code>Bill: Rs 325.00</code> (2 decimals). 150 units → 100 × 1.50 + 50 × 2.50 + 50 = 325.00.</>,
    minLines: 12,
    tests: [
      { inputs: ["150"], expect: "Units used: 150\nBill: Rs 325.00" },
      { inputs: ["80"], expect: "Units used: 80\nBill: Rs 170.00", hidden: true },
      { inputs: ["100"], expect: "Units used: 100\nBill: Rs 200.00", hidden: true },
      { inputs: ["200"], expect: "Units used: 200\nBill: Rs 450.00", hidden: true },
      { inputs: ["250"], expect: "Units used: 250\nBill: Rs 650.00", hidden: true },
      { inputs: ["0"], expect: "Units used: 0\nBill: Rs 50.00", hidden: true },
    ],
    requires: [{ node: "If" }],
    hints: ["Work out the energy charge in three cases: up to 100, up to 200, above 200.", "Up to 200: 100 * 1.5 + (units - 100) * 2.5", "Above 200: 100 * 1.5 + 100 * 2.5 + (units - 200) * 4"],
    solution: 'units = int(input("Units used: "))\nif units <= 100:\n    charge = units * 1.5\nelif units <= 200:\n    charge = 100 * 1.5 + (units - 100) * 2.5\nelse:\n    charge = 100 * 1.5 + 100 * 2.5 + (units - 200) * 4\nbill = charge + 50\nprint(f"Bill: Rs {bill:.2f}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "In Version 3, when is “Honor Roll” even checked?", options: ["Always", "Only when the scholarship condition was True", "Only for grade A", "Only when input is invalid"], answer: 1, explain: "It's nested inside the scholarship branch, so Python never reaches it otherwise." },
  { q: "average = 92, attendance = 70. What prints after the grade?", options: ["Scholarship: Yes", "Scholarship: No", "Honor Roll: Yes", "Invalid input"], answer: 1, explain: "and needs both: 92 ≥ 85 is True but 70 ≥ 75 is False." },
  { q: "Which condition catches bad input?", options: ["average > 0 or average < 100", "not (0 <= average <= 100)", "average != 100", "0 < average or average < 100"], answer: 1, explain: "A valid mark is 0 <= average <= 100; not flips it to catch everything else." },
  { q: "For the electricity bill, what is the energy charge for 200 units?", options: ["Rs 400.00", "Rs 300.00", "Rs 500.00", "Rs 800.00"], answer: 0, explain: "100 × 1.50 + 100 × 2.50 = 150 + 250 = 400 (plus Rs 50 fixed = 450)." },
  { q: "Why does the grade chain start with average >= 90?", options: ["Alphabetical order", "Only the first True branch runs, so the strictest test must come first", "It's faster", "No reason"], answer: 1, explain: "Starting with >= 40 would give a 95 the grade D." },
];

export default function Unit5_4(props) {
  const sections = [
    {
      label: "The Mission", kicker: "CAPSTONE", title: "Exam Result Analyzer",
      blocks: [
        <P>A college works out four decisions about every student from just two numbers: <strong>average marks</strong> and <strong>attendance %</strong>. You'll build it in three versions, adding one idea each time — the way real programs are written. Here is every tool you need, and where you learnt it:</P>,
        <Mission />,
        <Note color={T.blue} icon="🧱">Each version starts from your previous one. Get Version 1 working before you add anything.</Note>,
      ],
    },
    { label: "Version 1", kicker: "BUILD IN STEPS", title: "Version 1: pass/fail and the grade", blocks: [EX.v1] },
    { label: "Version 2", kicker: "ADD ONE IDEA", title: "Version 2: two conditions at once", blocks: [EX.v2] },
    {
      label: "Version 3", kicker: "ADD ONE MORE", title: "Version 3: a nested decision, and bad input",
      blocks: [
        EX.v3,
        <KeyIdea>Checking for impossible input <em>first</em> and only then doing the real work is called <strong>validation</strong>. Every program that reads input should do it.</KeyIdea>,
      ],
    },
    {
      label: "Play It", kicker: "EXPLORE", title: "The finished analyzer",
      blocks: [<P>This is your Version 3, live. Try the boundaries: 85 and 75, 90 attendance, 101.</P>, <PlayIt />],
    },
    {
      label: "Make It", kicker: "ON YOUR OWN", title: "Your program: the electricity bill",
      blocks: [<P>No versions this time: a blank editor and a slab-rate rule, exactly as it appears in exams.</P>, EX.ebill],
    },
  ];
  return (
    <LessonShell
      {...props}
      unitId="Unit5_4"
      crumb="MODULE 5 › UNIT 5.4"
      title="Capstone: Decision Maker"
      sections={sections}
      quiz={QUIZ}
      next={{ title: "Module 6 — Repetition", text: "Module 5 complete! Next: loops — make the computer do it a thousand times while you say it once. (Optional first: Module 5's Crucible.)" }}
    />
  );
}
