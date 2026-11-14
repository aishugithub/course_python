// Unit 4.1 — Your First Program (rebuilt on the typing-first lesson kit)
// Every section: see the idea → type/write/fix a real program → checked by tests.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

// ── Widget: C → Python, the punctuation disappears ──
function ShapeOfPython() {
  const [step, setStep] = useState(0);
  const stages = [
    { title: "1 · C, as you know it", lines: [["#include <stdio.h>"], ["int main() ", "{p"], ["    int marks = 72", ";p"], ['    printf("Hello!\\n")', ";p"], ["    if (marks > 40) ", "{p"], ['        printf("Pass\\n")', ";p"], ["    ", "}p"], ["}p"]],
      caption: "Look at the amber characters. ; says “this statement ended”. { } say “these lines belong together”. The C compiler needs them because, to C, newlines mean nothing." },
    { title: "2 · Python deletes every ;", lines: [["#include <stdio.h>d"], ["int main() ", "{p"], ["    int marks = 72", ";d"], ['    printf("Hello!\\n")', ";d"], ["    if (marks > 40) ", "{p"], ['        printf("Pass\\n")', ";d"], ["    ", "}p"], ["}p"]],
      caption: "In Python, pressing Enter ends the statement. One line = one instruction." },
    { title: "3 · Python deletes every { }", lines: [["int main() ", "{d"], ["    int marks = 72"], ['    printf("Hello!\\n")'], ["    if (marks > 40) ", "{d"], ["        g", 'printf("Pass\\n")'], ["    ", "}d"], ["}d"]],
      caption: "The spaces on the left were always there — in C you indented to be polite. Python makes that indentation the real rule: the green space now means “inside the if”." },
    { title: "4 · What's left is Python", lines: [["marks = 72"], ['print("Hello!")'], ["if marks > 40", ":g"], ["    g", 'print("Pass")']],
      caption: "Eight lines became four. A colon : opens a block; indentation holds it. (if comes in Module 5 — today just notice the shape.)" },
  ];
  const s = stages[step];
  const seg = (t, i) => {
    const k = /[pdg]$/.test(t) && t.length > 1 && (t.endsWith("p") || t.endsWith("d") || t.endsWith("g")) && /^[;{}:#\s]/.test(t) ? t.slice(-1) : "";
    const txt = k ? t.slice(0, -1) : t;
    const color = k === "d" ? T.red : k === "p" ? T.amber : k === "g" ? T.green : T.text;
    return <span key={i} style={{ color, textDecoration: k === "d" ? "line-through" : "none", fontWeight: k ? 700 : 400, background: k === "g" ? tint(T.green, "22") : "transparent" }}>{txt}</span>;
  };
  return (
    <div className="fh-two" style={{ alignItems: "start" }}>
      <div>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          {stages.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? T.blue : T.border }} />)}
        </div>
        <div style={{ color: T.blue, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{s.title}</div>
        <pre style={{ margin: 0, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", fontFamily: CODE_FONT, fontSize: 14, lineHeight: 1.65, minHeight: 210 }}>
          {s.lines.map((l, i) => <div key={i}><span style={{ color: T.muted, marginRight: 12 }}>{i + 1}</span>{l.map(seg)}</div>)}
        </pre>
      </div>
      <div>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px", fontSize: 14.5, color: T.slate, lineHeight: 1.7, minHeight: 120, marginTop: 30 }}>{s.caption}</div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, color: step ? T.text : T.muted, fontWeight: 600, cursor: step ? "pointer" : "default", fontFamily: "inherit" }}>◀ Back</button>
          <button onClick={() => setStep(Math.min(3, step + 1))} disabled={step === 3} style={{ flex: 2, padding: 10, borderRadius: 8, border: "none", background: step === 3 ? T.green : T.navy, color: "#fff", fontWeight: 700, cursor: step === 3 ? "default" : "pointer", fontFamily: "inherit" }}>{step === 3 ? "That's the whole idea ✓" : "Next step ▶"}</button>
        </div>
      </div>
    </div>
  );
}

// ── Widget: quotes or no quotes? ──
function QuoteToggle() {
  const [quoted, setQuoted] = useState(true);
  return (
    <div className="fh-two" style={{ marginBottom: 6 }}>
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          {[true, false].map((q) => (
            <button key={String(q)} onClick={() => setQuoted(q)} style={{ padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${quoted === q ? T.navy : T.border}`, background: quoted === q ? T.navy : T.card, color: quoted === q ? "#fff" : T.slate, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              {q ? 'with quotes "…"' : "without quotes"}
            </button>
          ))}
        </div>
        <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 16, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px" }}>
          <span style={{ color: T.fn }}>print</span>({quoted ? <span style={{ color: T.str }}>"7 * 6"</span> : <span style={{ color: T.num }}>7 * 6</span>})
        </pre>
      </div>
      <div>
        <div style={{ fontSize: 12, color: T.muted, margin: "10px 0 6px" }}>OUTPUT</div>
        <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 16, background: T.termBg, color: T.termText, borderRadius: 10, padding: "14px 16px" }}>{quoted ? "7 * 6" : "42"}</pre>
        <div style={{ fontSize: 14, color: T.slate, marginTop: 8, lineHeight: 1.6 }}>
          {quoted ? "Inside quotes it's text: Python shows it exactly, character by character." : "Without quotes it's an expression: Python calculates it first, then prints the answer."}
        </div>
      </div>
    </div>
  );
}

// ── Widget: will it run? (predict before you fix) ──
function WillItRun() {
  const items = [
    { code: 'print("Good morning")', ok: true, why: "Quotes around the text, brackets matched. Runs." },
    { code: 'Print("Good morning")', ok: false, why: "Capital P. Python is case-sensitive — Print doesn't exist. NameError." },
    { code: 'print("Good morning"', ok: false, why: "The closing ) is missing. SyntaxError." },
    { code: "print(Good morning)", ok: false, why: "No quotes, so Python reads Good and morning as names. SyntaxError." },
    { code: "print(10 + 5)", ok: true, why: "A calculation, no quotes needed. Prints 15." },
  ];
  const [ans, setAns] = useState({});
  const score = Object.entries(ans).filter(([i, v]) => items[i].ok === v).length;
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 900 }}>
      {items.map((it, i) => {
        const a = ans[i];
        const right = a !== undefined && a === it.ok;
        return (
          <div key={i} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, background: T.card, border: `1.5px solid ${a === undefined ? T.border : right ? T.green : T.red}`, borderRadius: 10, padding: "10px 12px" }}>
            <code style={{ fontSize: 15, minWidth: 240 }}>{it.code}</code>
            {a === undefined ? (
              <span style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
                <button onClick={() => setAns({ ...ans, [i]: true })} style={{ padding: "6px 12px", borderRadius: 7, border: `1px solid ${T.border}`, background: T.surface, cursor: "pointer", fontFamily: "inherit", color: T.text }}>✅ runs</button>
                <button onClick={() => setAns({ ...ans, [i]: false })} style={{ padding: "6px 12px", borderRadius: 7, border: `1px solid ${T.border}`, background: T.surface, cursor: "pointer", fontFamily: "inherit", color: T.text }}>❌ error</button>
              </span>
            ) : (
              <span style={{ fontSize: 13.5, color: right ? T.green : T.red, marginLeft: "auto", maxWidth: 520 }}>{right ? "✓" : "✗"} <span style={{ color: T.slate }}>{it.why}</span></span>
            )}
          </div>
        );
      })}
      {Object.keys(ans).length === items.length && <div style={{ fontWeight: 700, color: T.green }}>You predicted {score} / {items.length}. Now fix the broken ones for real ↓</div>}
    </div>
  );
}

// ── Widget: what Python sees ──
function CommentView() {
  const [py, setPy] = useState(false);
  const lines = [
    { c: "# This program says hello", com: true },
    { c: 'print("Hello!")', tail: "   # greets the user" },
    { c: '# print("This never runs")', com: true },
    { c: 'print("Goodbye!")' },
  ];
  return (
    <div style={{ maxWidth: 760 }}>
      <pre style={{ margin: "0 0 10px", fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.8, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 16px" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.com ? T.com : T.text, opacity: py && l.com ? 0.25 : 1, textDecoration: py && l.com ? "line-through" : "none" }}>
            {l.c}{l.tail && <span style={{ color: T.com, opacity: py ? 0.25 : 1, textDecoration: py ? "line-through" : "none" }}>{l.tail}</span>}
          </div>
        ))}
      </pre>
      <button onClick={() => setPy(!py)} style={{ padding: "9px 16px", borderRadius: 8, border: `1.5px solid ${T.purple}`, background: py ? tint(T.purple, "18") : T.card, color: T.purple, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
        {py ? "◀ Show my view" : "▶ Show what Python actually sees"}
      </button>
    </div>
  );
}

// ── Exercise specs ──
const lines = (s) => s.replace(/\r/g, "").split("\n").map((l) => l.trimEnd()).filter((l, i, a) => !(i === a.length - 1 && l === ""));

const EX = {
  c2py: {
    id: "c2py", kind: "fix", title: "Translate C into Python",
    task: <>This is a line of C. Turn it into Python so it prints <code>Hello!</code>. Run it first and read what Python says.</>,
    starter: 'printf("Hello!\\n");',
    tests: [{ expect: "Hello!" }],
    forbids: [{ text: ";", msg: "Python lines don't end with ; — remove it." }, { text: "\\n", msg: "print already moves to a new line by itself; \\n isn't needed." }],
    hints: ["Python's function is called print, not printf.", "Delete the ; at the end and the \\n inside the text."],
    solution: 'print("Hello!")',
  },
  hello: {
    id: "hello", kind: "type", title: "Hello, World!",
    task: <>The traditional first program. Type it exactly — capital H, comma, capital W, exclamation mark.</>,
    show: 'print("Hello, World!")',
    tests: [{ expect: "Hello, World!" }],
    hints: ["Check the quotes: the text must start and end with \".", "Capitals and punctuation count: Hello, World!"],
    solution: 'print("Hello, World!")',
  },
  intro: {
    id: "intro", kind: "write", title: "Introduce yourself",
    task: <>Write a program that prints <strong>two lines</strong>:<br />line 1 starts with <code>My name is</code> followed by your name,<br />line 2 starts with <code>I study</code> followed by your branch or college.</>,
    starter: "",
    tests: [{
      check: (out) => {
        const l = lines(out);
        if (l.length !== 2) return `Expected exactly 2 lines, your program printed ${l.length}. Use one print( ) per line.`;
        if (!l[0].startsWith("My name is ")) return 'Line 1 should start with "My name is " followed by your name.';
        if (!l[1].startsWith("I study ")) return 'Line 2 should start with "I study " followed by your branch.';
        return null;
      },
    }],
    requires: [{ call: "print", min: 2, msg: "Use two print( ) lines." }],
    hints: ["Two lines of output means two print( ) statements, one under the other.", 'print("My name is Priya")'],
    solution: 'print("My name is Priya")\nprint("I study CSE at SRET")',
  },
  textnum: {
    id: "textnum", kind: "type", title: "Text vs calculation",
    task: <>Type both lines and run. Predict the output <em>before</em> you press Run.</>,
    show: 'print("12 + 8")\nprint(12 + 8)',
    tests: [{ expect: "12 + 8\n20" }],
    hints: ["Line 1 has quotes, line 2 doesn't."],
    solution: 'print("12 + 8")\nprint(12 + 8)',
  },
  hours: {
    id: "hours", kind: "write", title: "Hours in a year",
    task: <>A year has 365 days and each day has 24 hours. Print the number of hours in a year — but <strong>let Python do the multiplication</strong>. In Python, × is written <code>*</code>.</>,
    tests: [{ expect: "8760" }],
    requires: [{ node: "BinOp", msg: "Put the calculation inside print( ) — e.g. print(365 * 24)." }],
    forbids: [{ constant: "8760", msg: "Don't type 8760 yourself — let Python calculate it." }, { constant: "'8760'", msg: "\"8760\" in quotes is text, not a calculation." }],
    hints: ["No quotes — you want Python to calculate, not to copy text.", "print(365 * 24)"],
    solution: "print(365 * 24)",
  },
  bill: {
    id: "bill", kind: "write", title: "The cinema bill",
    task: <>Three friends buy tickets at ₹150 each. Print exactly <code>Total: 450</code>.<br />print can take <strong>several items separated by commas</strong> — it puts one space between them: <code>print("Age:", 18)</code> shows <code>Age: 18</code>. Use one text item and one calculation.</>,
    tests: [{ expect: "Total: 450" }],
    requires: [{ node: "BinOp", msg: "Let Python calculate 3 * 150." }],
    forbids: [{ text: "450", msg: "Let Python calculate the total — don't type 450." }],
    hints: ['Item 1 is the text "Total:" and item 2 is the calculation.', 'print("Total:", 3 * 150)'],
    solution: 'print("Total:", 3 * 150)',
  },
  fixCase: { id: "fixCase", kind: "fix", title: "Bug 1: the capital letter", task: <>Run it, read the coach, fix it.</>, starter: 'Print("Good morning")', tests: [{ expect: "Good morning" }], hints: ["Python is case-sensitive."], solution: 'print("Good morning")' },
  fixParen: { id: "fixParen", kind: "fix", title: "Bug 2: the missing bracket", task: <>Run it, read the coach, fix it.</>, starter: 'print("Good morning"', tests: [{ expect: "Good morning" }], hints: ["Every ( needs a )."], solution: 'print("Good morning")' },
  fixQuotes: { id: "fixQuotes", kind: "fix", title: "Bug 3: text without quotes", task: <>Run it, read the coach, fix it.</>, starter: "print(Good morning)", tests: [{ expect: "Good morning" }], hints: ["Text must be inside quotes."], solution: 'print("Good morning")' },
  fixIndent: {
    id: "fixIndent", kind: "fix", title: "Bug 4: the sneaky spaces",
    task: <>Remember the C → Python section: indentation is part of the grammar. Fix this program.</>,
    starter: 'print("Roll no: 22CS1042")\n  print("Branch: CSE")',
    tests: [{ expect: "Roll no: 22CS1042\nBranch: CSE" }],
    hints: ["Line 2 starts with two spaces. Why would Python object?", "Both lines are at the top level — neither should be indented."],
    solution: 'print("Roll no: 22CS1042")\nprint("Branch: CSE")',
  },
  tea: {
    id: "tea", kind: "modify", title: "Tea without sugar",
    task: <>Your friend doesn't take sugar. <strong>Without deleting any line</strong>: (1) turn the step-3 line into a comment so it doesn't run, and (2) add a comment as a new first line saying what the program is.</>,
    starter: 'print("Step 1: Boil water")\nprint("Step 2: Add tea leaves")\nprint("Step 3: Add sugar")\nprint("Step 4: Pour and enjoy")',
    tests: [{ expect: "Step 1: Boil water\nStep 2: Add tea leaves\nStep 4: Pour and enjoy" }],
    validate: (code) => {
      const ls = code.split("\n").filter((l) => l.trim());
      if (!ls[0]?.trim().startsWith("#")) return "Add a comment (a line starting with #) as the very first line.";
      if (!ls.some((l) => l.trim().startsWith("#") && l.includes("Step 3"))) return "Keep the step-3 line, but put # in front of it.";
      return null;
    },
    hints: ["A # at the start of a line makes Python skip the whole line.", "# My tea recipe — as line 1. Then put # in front of print(\"Step 3: Add sugar\")."],
    solution: '# Tea recipe\nprint("Step 1: Boil water")\nprint("Step 2: Add tea leaves")\n# print("Step 3: Add sugar")\nprint("Step 4: Pour and enjoy")',
  },
  ticket: {
    id: "ticket", kind: "make", title: "Print a cinema ticket",
    task: <>Recreate this ticket exactly. Two new tricks: <code>print()</code> with nothing inside prints an <strong>empty line</strong>, and the total must be <strong>calculated</strong> (3 seats × ₹150) using a comma, as in the cinema-bill exercise. Start with a comment.</>,
    minLines: 10,
    tests: [{ expect: "==========================\n     FOOTHOLD CINEMAS\n==========================\nMovie: Python Returns\nSeats: 3\nTotal: Rs 450\n\nEnjoy the show!" }],
    requires: [{ node: "BinOp", msg: "Calculate the total with 3 * 150." }, { text: "#", msg: "Start your program with a comment describing it." }],
    forbids: [{ text: "450", msg: "Let Python calculate 450." }],
    hints: ["Count the spaces before FOOTHOLD CINEMAS — there are five.", 'The total line: print("Total: Rs", 3 * 150)', "The empty line before Enjoy the show! is just print()."],
    solution: '# My cinema ticket\nprint("==========================")\nprint("     FOOTHOLD CINEMAS")\nprint("==========================")\nprint("Movie: Python Returns")\nprint("Seats: 3")\nprint("Total: Rs", 3 * 150)\nprint()\nprint("Enjoy the show!")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "In Python, what marks the END of a statement?", options: ["A semicolon ;", "A closing brace }", "The end of the line", "A full stop ."], answer: 2,
    explain: "Python uses the newline itself as the delimiter: one line, one statement. C needs ; because to the compiler newlines carry no meaning." },
  { q: "What decides which lines belong together as a block?", options: ["Curly braces { }", "How far the lines are indented", "BEGIN and END", "Nothing"], answer: 1,
    explain: "Indentation is the syntax in Python. That's why the stray spaces in Bug 4 caused an IndentationError." },
  { q: "What does this print?", code: 'print("5 + 5")\nprint(5 + 5)', options: ["10 then 10", "5 + 5 then 10", "5 + 5 then 5 + 5", "An error"], answer: 1,
    explain: "Quotes make text, shown exactly. Without quotes Python evaluates the expression first." },
  { q: "What does this print?", code: 'print("Total:", 4 * 25)', options: ["Total:100", "Total: 100", "Total: 4 * 25", "Total:, 100"], answer: 1,
    explain: "print separates its comma-separated items with one space, and calculates 4 * 25 first." },
  { q: "Why does print(Hello) usually cause an error?", options: ["Python reads Hello as a variable name, and none exists", "print only accepts numbers", "Hello is a keyword", "print must be in capitals"], answer: 0,
    explain: "Without quotes Python looks for something already named Hello — a NameError when there isn't one." },
  { q: "What happens to a line starting with # ?", options: ["It's printed", "It runs twice", "Python skips it — it's a comment", "SyntaxError"], answer: 2,
    explain: "Comments are notes for humans. That's how you switched off the sugar step without deleting it." },
  { q: "Is Print(\"Hi\") valid?", options: ["Yes", "No — Python is case-sensitive; it's print", "Only in comments", "No — Hi shouldn't have quotes"], answer: 1,
    explain: "print and Print are different names, and only lowercase print exists." },
];

export default function Unit4_1(props) {
  const sections = [
    {
      label: "No ; No { }", kicker: "FROM C TO PYTHON", title: "No semicolons. No braces.",
      blocks: [
        <Note color={T.blue} icon="✍️"><strong>How every lesson works now:</strong> you'll write real Python in every section. It runs right here in your browser. Paste is switched off — type everything yourself. Errors are normal; the coach explains each one.</Note>,
        <div style={{ height: 14 }} />,
        <P>In C, structure is made of punctuation. In Python, it's made of <strong>layout</strong>. Step through one program and watch the punctuation disappear.</P>,
        <ShapeOfPython />,
        <KeyIdea>Python ends a statement with a <strong>new line</strong> (not <code>;</code>) and groups lines with <strong>indentation</strong> (not <code>{"{ }"}</code>). Indentation is grammar, not decoration.</KeyIdea>,
        EX.c2py,
      ],
    },
    {
      label: "print()", kicker: "YOUR FIRST INSTRUCTION", title: "print() — make the computer talk",
      blocks: [
        <P><code>print( )</code> is a built-in <em>function</em>: a ready-made instruction that shows whatever you put inside the brackets. Text goes inside quotes. Lines run top to bottom, one after another.</P>,
        EX.hello,
        EX.intro,
      ],
    },
    {
      label: "Text vs Numbers", kicker: "QUOTES MATTER", title: "Text or calculation?",
      blocks: [
        <P>Quotes are a switch. With them, Python treats what's inside as text and shows it exactly. Without them, Python treats it as an <em>expression</em> and calculates it. Flip the switch:</P>,
        <QuoteToggle />,
        EX.textnum,
        EX.hours,
        EX.bill,
        <KeyIdea>Quotes = text, shown exactly. No quotes = Python works it out. Commas inside print( ) separate items, and Python puts one space between them.</KeyIdea>,
      ],
    },
    {
      label: "Fix the Bugs", kicker: "ERRORS ARE CLUES", title: "Spot it, then fix it",
      blocks: [
        <P>First predict: will each line run, or crash? Then fix the broken ones for real. Run each one <em>before</em> fixing it — learning to read Python's error message is the skill.</P>,
        <WillItRun />,
        EX.fixCase, EX.fixParen, EX.fixQuotes, EX.fixIndent,
        <KeyIdea>An error message says <em>what</em> went wrong and <em>which line</em>. Read the last line first. Every programmer sees dozens a day — the skill is fixing them calmly.</KeyIdea>,
      ],
    },
    {
      label: "Comments", kicker: "NOTES FOR HUMANS", title: "Comments — notes Python ignores",
      blocks: [
        <P>Anything after a <code>#</code> is a <strong>comment</strong>. Python skips it completely. Comments explain your code to other people — and they let you switch a line off without deleting it.</P>,
        <CommentView />,
        EX.tea,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your first real program",
      blocks: [
        <P>Everything from this unit in one program: print, text, a calculation with commas, an empty line, and a comment. No starter code — a blank editor, like a real exam.</P>,
        EX.ticket,
      ],
    },
  ];
  return (
    <LessonShell
      {...props}
      unitId="Unit4_1"
      crumb="MODULE 4 › UNIT 4.1"
      title="Your First Program"
      sections={sections}
      quiz={QUIZ}
      next={{ title: "Unit 4.2 — Variables & Memory", text: "Your programs start remembering things — and you'll see exactly where they live in memory." }}
    />
  );
}
