// Unit 5.2 — if / elif / else (rebuilt on the typing-first lesson kit)
// Why branch → if + the indented block → else → elif chains (order matters,
// elif vs separate ifs) → truthy checks → cinema ticket make-task.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const codeBox = { margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre-wrap" };
const slider = { width: "100%", accentColor: T.navy };

// ── Widget: one program, two paths ──
function NeedForBranching() {
  const [n, setN] = useState(7);
  const even = n % 2 === 0;
  return (
    <div>
      <label style={{ fontFamily: CODE_FONT, fontSize: 15 }}>number = <strong>{n}</strong></label>
      <input type="range" min={-10} max={20} value={n} onChange={(e) => setN(Number(e.target.value))} style={slider} />
      <div className="fh-two" style={{ marginTop: 10 }}>
        <div style={{ background: T.card, border: `1.5px solid ${tint(T.red, "55")}`, borderRadius: 12, padding: 14 }}>
          <div style={{ color: T.red, fontWeight: 700, fontSize: 13 }}>❌ WITHOUT if</div>
          <pre style={{ ...codeBox, margin: "8px 0" }}>print("Even")</pre>
          <div style={{ fontSize: 14, color: T.slate }}>Always says Even. {!even && <strong style={{ color: T.red }}>Wrong right now — {n} is odd.</strong>}</div>
        </div>
        <div style={{ background: T.card, border: `1.5px solid ${tint(T.green, "55")}`, borderRadius: 12, padding: 14 }}>
          <div style={{ color: T.green, fontWeight: 700, fontSize: 13 }}>✅ WITH if / else</div>
          <pre style={{ ...codeBox, margin: "8px 0" }}>
            {"if number % 2 == 0:\n"}<span style={{ background: even ? tint(T.green, "22") : "transparent" }}>{'    print("Even")'}</span>{"\nelse:\n"}<span style={{ background: !even ? tint(T.green, "22") : "transparent" }}>{'    print("Odd")'}</span>
          </pre>
          <div style={{ fontSize: 14, color: T.green }}>Prints <strong>{even ? "Even" : "Odd"}</strong> — the highlighted line is the one that runs.</div>
        </div>
      </div>
    </div>
  );
}

// ── Widget: C braces vs Python colon + indent ──
function BlockShape() {
  const [broken, setBroken] = useState(false);
  return (
    <div className="fh-two">
      <div>
        <div style={{ color: T.orange, fontWeight: 700, marginBottom: 6 }}>⚙️ C — braces mark the block</div>
        <pre style={codeBox}>{'if (temp >= 100.4) {\n    printf("Fever\\n");\n}\nprintf("Thank you\\n");'}</pre>
      </div>
      <div>
        <div style={{ color: T.blue, fontWeight: 700, marginBottom: 6 }}>🐍 Python — colon + indentation</div>
        <pre style={{ ...codeBox, borderColor: broken ? T.red : T.border }}>
          {broken ? 'if temp >= 100.4:\nprint("Fever")\nprint("Thank you")' : 'if temp >= 100.4:\n    print("Fever")     # inside the if\nprint("Thank you")     # after the if: always runs'}
        </pre>
        <button onClick={() => setBroken(!broken)} style={{ marginTop: 8, padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${broken ? T.red : T.border}`, background: broken ? tint(T.red, "12") : T.card, color: broken ? T.red : T.text, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          {broken ? "IndentationError: expected an indented block — fix it ◀" : "What if I forget to indent? ▶"}
        </button>
      </div>
    </div>
  );
}

// ── Widget: which branch lights up? ──
const GRADES = [{ c: ">= 90", t: 90, g: "A", col: T.green }, { c: ">= 75", t: 75, g: "B", col: T.blue }, { c: ">= 60", t: 60, g: "C", col: T.yellow }, { c: null, t: -Infinity, g: "F", col: T.red }];
function GradeFlow() {
  const [s, setS] = useState(78);
  const hit = GRADES.findIndex((x) => s >= x.t);
  return (
    <div className="fh-two">
      <div>
        <label style={{ fontFamily: CODE_FONT, fontSize: 15 }}>score = <strong>{s}</strong></label>
        <input type="range" min={0} max={100} value={s} onChange={(e) => setS(Number(e.target.value))} style={slider} />
        <div style={{ fontSize: 14, color: T.slate, marginTop: 8, lineHeight: 1.6 }}>Python checks top to bottom and runs <strong>only the first</strong> true branch. Everything below it is skipped — not even checked.</div>
      </div>
      <div style={{ ...codeBox, padding: 8 }}>
        {GRADES.map((x, i) => (
          <div key={i} style={{ padding: "4px 8px", borderRadius: 6, background: i === hit ? tint(x.col, "22") : "transparent", color: i < hit ? T.muted : i === hit ? x.col : T.muted, fontWeight: i === hit ? 700 : 400, textDecoration: i > hit ? "line-through" : "none" }}>
            {x.c ? `${i === 0 ? "if" : "elif"} score ${x.c}:` : "else:"}<br />{`    print("${x.g}")`}{i < hit ? "   # checked: False" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Exercise specs ──
const EX = {
  evenodd: {
    id: "evenodd", kind: "type", title: "Even or odd",
    task: <>Your first branching program. Type it carefully: the colons, and 4 spaces before each print (press Tab).</>,
    show: 'number = int(input("Number: "))\nif number % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")',
    tests: [{ inputs: ["7"], expect: "Number: 7\nOdd" }, { inputs: ["10"], expect: "Number: 10\nEven", hidden: true }, { inputs: ["0"], expect: "Number: 0\nEven", hidden: true }],
    requires: [{ node: "If", msg: "Use if / else." }],
    hints: ["After a line ending in :, the editor indents for you when you press Enter."],
    solution: 'number = int(input("Number: "))\nif number % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")',
  },
  fever: {
    id: "fever", kind: "write", title: "Fever check (if without else)",
    task: <>Ask <code>Temperature: </code> (decimal, °F). If it is 100.4 or more, print <code>Fever - please see a doctor</code>. Then — for everyone — print <code>Thank you</code>. That last line must <strong>not</strong> be inside the if.</>,
    tests: [
      { inputs: ["101.2"], expect: "Temperature: 101.2\nFever - please see a doctor\nThank you" },
      { inputs: ["98.6"], expect: "Temperature: 98.6\nThank you", hidden: true },
      { inputs: ["100.4"], expect: "Temperature: 100.4\nFever - please see a doctor\nThank you", hidden: true },
    ],
    requires: [{ node: "If" }],
    hints: ["An if doesn't need an else — if the condition is False, Python just skips the block.", "Thank you goes back to the left edge (no indent), so it runs either way."],
    solution: 'temp = float(input("Temperature: "))\nif temp >= 100.4:\n    print("Fever - please see a doctor")\nprint("Thank you")',
  },
  colon: {
    id: "colon", kind: "fix", title: "Two missing pieces",
    task: <>Run it. Fix the first error, run again, fix the next.</>,
    starter: 'marks = int(input("Marks: "))\nif marks >= 40\nprint("Pass")',
    tests: [{ inputs: ["55"], expect: "Marks: 55\nPass" }, { inputs: ["30"], expect: "Marks: 30", hidden: true }],
    hints: ["A line starting with if must end with a colon.", "The print belongs inside the if, so it needs 4 spaces in front."],
    solution: 'marks = int(input("Marks: "))\nif marks >= 40:\n    print("Pass")',
  },
  eqeq: {
    id: "eqeq", kind: "fix", title: "= inside an if",
    task: <>Run it, read the coach, fix it.</>,
    starter: 'marks = int(input("Marks: "))\nif marks = 100:\n    print("Perfect score!")',
    tests: [{ inputs: ["100"], expect: "Marks: 100\nPerfect score!" }, { inputs: ["99"], expect: "Marks: 99", hidden: true }],
    hints: ["Unit 5.1: = stores, == compares."],
    solution: 'marks = int(input("Marks: "))\nif marks == 100:\n    print("Perfect score!")',
  },
  passfail: {
    id: "passfail", kind: "write", title: "Pass or fail",
    task: <>Ask <code>Marks: </code>. Print <code>Pass</code> if the marks are 40 or more, otherwise <code>Fail</code>. Use if / else.</>,
    tests: [{ inputs: ["67"], expect: "Marks: 67\nPass" }, { inputs: ["40"], expect: "Marks: 40\nPass", hidden: true }, { inputs: ["39"], expect: "Marks: 39\nFail", hidden: true }],
    requires: [{ node: "If" }],
    hints: ["else: on its own line, at the same indent as the if."],
    solution: 'marks = int(input("Marks: "))\nif marks >= 40:\n    print("Pass")\nelse:\n    print("Fail")',
  },
  grade: {
    id: "grade", kind: "write", title: "Grade calculator",
    task: <>Ask <code>Score: </code> and print the grade: <code>A</code> for 90 and above, <code>B</code> for 75 and above, <code>C</code> for 60 and above, otherwise <code>F</code>. Use if / elif / else.</>,
    tests: [
      { inputs: ["95"], expect: "Score: 95\nA" },
      { inputs: ["90"], expect: "Score: 90\nA", hidden: true }, { inputs: ["75"], expect: "Score: 75\nB", hidden: true },
      { inputs: ["60"], expect: "Score: 60\nC", hidden: true }, { inputs: ["59"], expect: "Score: 59\nF", hidden: true },
    ],
    requires: [{ text: "elif", msg: "Use elif for the middle grades." }],
    hints: ["Check the highest grade first.", "if score >= 90: … elif score >= 75: … elif score >= 60: … else: …"],
    solution: 'score = int(input("Score: "))\nif score >= 90:\n    print("A")\nelif score >= 75:\n    print("B")\nelif score >= 60:\n    print("C")\nelse:\n    print("F")',
  },
  chain: {
    id: "chain", kind: "fix", title: "Three grades at once",
    task: <>A student scoring 95 gets told A, B <em>and</em> C. Run it and see. Fix it so only one grade prints.</>,
    starter: 'score = int(input("Score: "))\nif score >= 90:\n    print("A")\nif score >= 75:\n    print("B")\nif score >= 60:\n    print("C")',
    tests: [{ inputs: ["95"], expect: "Score: 95\nA" }, { inputs: ["70"], expect: "Score: 70\nC", hidden: true }, { inputs: ["80"], expect: "Score: 80\nB", hidden: true }],
    requires: [{ text: "elif", msg: "Join the checks into one chain with elif." }],
    hints: ["Separate ifs are each checked on their own. A chain stops at the first True.", "Change the 2nd and 3rd if to elif."],
    solution: 'score = int(input("Score: "))\nif score >= 90:\n    print("A")\nelif score >= 75:\n    print("B")\nelif score >= 60:\n    print("C")',
  },
  name: {
    id: "name", kind: "write", title: "Did they type anything?",
    task: <>Ask <code>Name: </code>. If the user typed something, print <code>Welcome, Priya!</code> (with their name). If they just pressed Enter, print <code>You didn't type a name.</code> Use truthiness from Unit 5.1: an empty string is falsy, so <code>if name:</code> works.</>,
    tests: [{ inputs: ["Priya"], expect: "Name: Priya\nWelcome, Priya!" }, { inputs: [""], expect: "Name: \nYou didn't type a name.", hidden: true }, { inputs: ["Arun"], expect: "Name: Arun\nWelcome, Arun!", hidden: true }],
    requires: [{ node: "If" }],
    hints: ["if name: is True whenever name isn't empty.", 'print(f"Welcome, {name}!")'],
    solution: 'name = input("Name: ")\nif name:\n    print(f"Welcome, {name}!")\nelse:\n    print("You didn\'t type a name.")',
  },
  ticket: {
    id: "ticket", kind: "make", title: "Cinema ticket price",
    task: <>Ask <code>Age: </code>. Under 5: <code>Infant</code>, free (Rs 0). Under 18: <code>Child</code>, Rs 100. Under 60: <code>Adult</code>, Rs 250. Otherwise <code>Senior</code>, Rs 120. Store the category and price in variables inside the branches, then print once at the end, e.g. <code>Adult: Rs 250</code>.</>,
    minLines: 14,
    tests: [
      { inputs: ["25"], expect: "Age: 25\nAdult: Rs 250" },
      { inputs: ["4"], expect: "Age: 4\nInfant: Rs 0", hidden: true }, { inputs: ["5"], expect: "Age: 5\nChild: Rs 100", hidden: true },
      { inputs: ["17"], expect: "Age: 17\nChild: Rs 100", hidden: true }, { inputs: ["18"], expect: "Age: 18\nAdult: Rs 250", hidden: true },
      { inputs: ["60"], expect: "Age: 60\nSenior: Rs 120", hidden: true },
    ],
    requires: [{ text: "elif", min: 2, msg: "Four categories → if, two elifs, else." }],
    forbids: [{ call: "print", max: 1, msg: "Set category and price in the branches; print only once, at the end." }],
    hints: ["Inside each branch: category = \"Child\" and price = 100 (two lines).", 'After the chain, at the left edge: print(f"{category}: Rs {price}")'],
    solution: 'age = int(input("Age: "))\nif age < 5:\n    category = "Infant"\n    price = 0\nelif age < 18:\n    category = "Child"\n    price = 100\nelif age < 60:\n    category = "Adult"\n    price = 250\nelse:\n    category = "Senior"\n    price = 120\nprint(f"{category}: Rs {price}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What marks the lines that belong inside an if?", options: ["Curly braces", "A colon after the condition, then indentation", "Semicolons", "Brackets"], answer: 1, explain: "The colon opens the block; every indented line after it belongs to it." },
  { q: "In an if / elif / else chain, how many branches run?", options: ["Every one whose condition is True", "Only the first one whose condition is True", "Always the else", "All of them"], answer: 1, explain: "Python stops at the first True condition and skips the rest." },
  { q: "What does this print for score = 95?", code: 'if score >= 60:\n    print("C")\nelif score >= 90:\n    print("A")', options: ["A", "C", "C then A", "Nothing"], answer: 1, explain: "95 >= 60 is True first, so the chain stops at C. Check the strictest condition first." },
  { q: "What does this print for score = 95?", code: 'if score >= 90:\n    print("A")\nif score >= 60:\n    print("C")', options: ["A", "C", "A then C", "Nothing"], answer: 2, explain: "Two separate ifs are two separate questions. Both are True, so both print. Use elif to make one chain." },
  { q: "Which line is wrong?", code: 'if marks >= 40:\n    print("Pass")\nelse marks < 40:\n    print("Fail")', options: ["Line 1", "Line 2", "Line 3 — else never takes a condition", "Line 4"], answer: 2, explain: "else means “in every other case”: just else:. Use elif if you need a condition." },
  { q: "When does the block under if name: run?", options: ["Always", "When name is not empty", "When name is empty", "When name is \"True\""], answer: 1, explain: "Non-empty text is truthy; the empty string is falsy." },
];

export default function Unit5_2(props) {
  const sections = [
    {
      label: "Why Branch?", kicker: "THE NEED", title: "One program, different paths",
      blocks: [
        <P>Until now every program ran the same lines in the same order, whatever the input. Real programs <em>choose</em>. Drag the slider:</P>,
        <NeedForBranching />,
        EX.evenodd,
      ],
    },
    {
      label: "if & Blocks", kicker: "COLON + INDENT", title: "if, and the indented block",
      blocks: [
        <P>The condition goes after <code>if</code>, then a colon. The lines to run when it's True are <strong>indented 4 spaces</strong>. The first line back at the left edge is outside the if, and always runs. This is the rule from Unit 4.1, now doing real work:</P>,
        <BlockShape />,
        EX.fever,
        EX.colon,
        EX.eqeq,
      ],
    },
    {
      label: "else", kicker: "THE OTHER PATH", title: "if / else: exactly one of two",
      blocks: [
        <P><code>else:</code> catches every case the if didn't. It never has a condition of its own, and it lines up with its if.</P>,
        EX.passfail,
      ],
    },
    {
      label: "elif Chains", kicker: "MANY PATHS", title: "elif: check in order, stop at the first True",
      blocks: [
        <GradeFlow />,
        EX.grade,
        EX.chain,
        <KeyIdea>A chain (<code>if … elif … else</code>) runs <strong>exactly one</strong> branch: the first True one. Separate <code>if</code>s are separate questions, and several can run. Put the strictest condition first.</KeyIdea>,
      ],
    },
    {
      label: "Truthy if", kicker: "UNIT 5.1 AT WORK", title: "if with any value",
      blocks: [
        <P>The condition doesn't have to be a comparison. <code>if name:</code> asks “is name truthy?” — for text, “is it non-empty?”.</P>,
        EX.name,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: cinema ticket price",
      blocks: [
        <P>Four categories, set inside the branches, printed once after the chain. Boundaries matter: a 5-year-old is a Child, a 60-year-old a Senior.</P>,
        EX.ticket,
      ],
    },
  ];
  return (
    <LessonShell
      {...props}
      unitId="Unit5_2"
      crumb="MODULE 5 › UNIT 5.2"
      title="if / elif / else"
      sections={sections}
      quiz={QUIZ}
      next={{ title: "Unit 5.3 — Combining Conditions", text: "and, or, not — plus 0 <= marks <= 100 in one line, and ifs inside ifs." }}
    />
  );
}
