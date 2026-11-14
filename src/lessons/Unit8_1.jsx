// Unit 8.1 — Why Functions? (rebuilt on the typing-first lesson kit)
// Copy-paste pain → def stores, calling runs (trace) → the three "nothing
// happened" bugs (never called, no brackets, called before def) → functions
// calling functions → refactor repeated code into a function.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const codeBox = { margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre" };

// ── Widget: def stores the recipe, calling runs it ──
const SRC = ["def cheer():", '    print("Go, team!")', '    print("Score!")', 'print("Match starts")', "cheer()", "cheer()", 'print("Full time")'];
const STEPS = [
  { l: 0, out: [], mem: false, d: "def: Python reads the recipe and remembers it under the name cheer. Lines 2–3 do NOT run now." },
  { l: 3, out: ["Match starts"], mem: true, d: "Skips past the body to the first statement outside it." },
  { l: 4, out: ["Match starts"], mem: true, d: "A call! Python jumps into cheer's body…" },
  { l: 1, out: ["Match starts", "Go, team!"], mem: true, d: "…runs it line by line…", inside: true },
  { l: 2, out: ["Match starts", "Go, team!", "Score!"], mem: true, d: "…and at the end of the body, returns to where it was called.", inside: true },
  { l: 5, out: ["Match starts", "Go, team!", "Score!"], mem: true, d: "The second call: the same body runs again." },
  { l: 2, out: ["Match starts", "Go, team!", "Score!", "Go, team!", "Score!"], mem: true, d: "Body finished, back to the caller.", inside: true },
  { l: 6, out: ["Match starts", "Go, team!", "Score!", "Go, team!", "Score!", "Full time"], mem: true, d: "Written once, run twice. Change the body and both calls change." },
];
function DefTrace() {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  return (
    <div className="fh-two">
      <div>
        <div style={{ ...codeBox, padding: 6 }}>
          {SRC.map((l, k) => <div key={k} style={{ padding: "1px 8px", borderRadius: 5, background: s.l === k ? tint(s.inside ? T.purple : T.blue, "22") : "transparent", fontWeight: s.l === k ? 700 : 400 }}>{l}</div>)}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
          <button onClick={() => setI(Math.max(0, i - 1))} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, cursor: "pointer" }}>◀</button>
          <button onClick={() => setI(Math.min(STEPS.length - 1, i + 1))} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: T.navy, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Next step ▶</button>
          <span style={{ fontSize: 13, color: T.muted }}>{i + 1} / {STEPS.length}</span>
        </div>
      </div>
      <div>
        <div style={{ display: "inline-block", border: `1.5px solid ${s.mem ? T.teal : T.border}`, borderRadius: 10, padding: "6px 12px", background: s.mem ? tint(T.teal, "12") : T.card, fontFamily: CODE_FONT, fontSize: 13.5 }}>
          🏷 cheer → {s.mem ? "the recipe (2 lines)" : "…being stored"}
        </div>
        <pre style={{ margin: "10px 0 0", fontFamily: CODE_FONT, fontSize: 14, background: T.termBg, color: T.termText, borderRadius: 10, padding: "10px 14px", minHeight: 120 }}>{s.out.join("\n") || " "}</pre>
        <div style={{ fontSize: 14.5, color: T.slate, marginTop: 8 }}>{s.d}</div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const LINE = "=".repeat(30);
const EX = {
  first: {
    id: "first", kind: "type", title: "Define, then call",
    task: <><code>def name():</code> plus an indented body defines a function. Writing <code>name()</code> calls it.</>,
    show: 'def welcome():\n    print("Welcome to Foothold!")\n    print("Let\'s write some Python.")\n\nwelcome()\nwelcome()',
    tests: [{ expect: "Welcome to Foothold!\nLet's write some Python.\nWelcome to Foothold!\nLet's write some Python." }],
    requires: [{ node: "FunctionDef" }],
    hints: ["The two calls are NOT indented — they're outside the function."],
    solution: 'def welcome():\n    print("Welcome to Foothold!")\n    print("Let\'s write some Python.")\n\nwelcome()\nwelcome()',
  },
  order: {
    id: "order", kind: "type", title: "Predict the order",
    task: <>The program from the stepper. Before running: which line prints first?</>,
    show: 'def cheer():\n    print("Go, team!")\n    print("Score!")\n\nprint("Match starts")\ncheer()\ncheer()\nprint("Full time")',
    tests: [{ expect: "Match starts\nGo, team!\nScore!\nGo, team!\nScore!\nFull time" }],
    hints: ["def doesn't print anything — only the calls do."],
    solution: 'def cheer():\n    print("Go, team!")\n    print("Score!")\n\nprint("Match starts")\ncheer()\ncheer()\nprint("Full time")',
  },
  silent: {
    id: "silent", kind: "fix", title: "Why is nothing printed?",
    task: <>This should print the menu. It runs without errors… and prints nothing. Fix it.</>,
    starter: 'def show_menu():\n    print("1. Add  2. Report  3. Exit")\n\nshow_menu',
    tests: [{ expect: "1. Add  2. Report  3. Exit" }],
    hints: ["A function name on its own just refers to the function. The brackets () are what call it."],
    solution: 'def show_menu():\n    print("1. Add  2. Report  3. Exit")\n\nshow_menu()',
  },
  early: {
    id: "early", kind: "fix", title: "Called before it exists",
    task: <>Run it and read the coach. Fix the order.</>,
    starter: 'banner()\n\ndef banner():\n    print("*** FOOTHOLD FEST ***")',
    tests: [{ expect: "*** FOOTHOLD FEST ***" }],
    hints: ["Python reads top to bottom: the def must run before the call."],
    solution: 'def banner():\n    print("*** FOOTHOLD FEST ***")\n\nbanner()',
  },
  card: {
    id: "card", kind: "write", title: "A framed card",
    task: <>Write a function <code>line()</code> that prints 30 <code>=</code> signs (use <code>"=" * 30</code>). Use it to print this card — the function is called three times:</>,
    tests: [{ expect: `${LINE}\nFOOTHOLD PYTHON CLUB\n${LINE}\nMeets every Friday, Lab 3\n${LINE}` }],
    requires: [{ node: "FunctionDef" }, { call: "line", min: 3, msg: "Call line() three times." }],
    forbids: [{ text: "=====", msg: "Let \"=\" * 30 make the line." }, { text: '"=" * 30', max: 1, msg: "Write \"=\" * 30 once — inside the function." }],
    hints: ['def line():\n    print("=" * 30)', "Then: line(), the title, line(), the meeting line, line()."],
    solution: 'def line():\n    print("=" * 30)\n\nline()\nprint("FOOTHOLD PYTHON CLUB")\nline()\nprint("Meets every Friday, Lab 3")\nline()',
  },
  calls: {
    id: "calls", kind: "write", title: "Functions calling functions",
    task: <>Keep your <code>line()</code> function. Write a second function <code>header()</code> that calls <code>line()</code>, prints <code>MARKS REPORT</code>, then calls <code>line()</code> again. Call <code>header()</code> once, then print <code>Priya: 87</code>.</>,
    tests: [{ expect: `${LINE}\nMARKS REPORT\n${LINE}\nPriya: 87` }],
    requires: [{ node: "FunctionDef", min: 2, msg: "Define two functions: line() and header()." }],
    hints: ["def header():\n    line()\n    print(\"MARKS REPORT\")\n    line()", "The order of the two defs doesn't matter — only that both are defined before header() is called."],
    solution: 'def line():\n    print("=" * 30)\n\ndef header():\n    line()\n    print("MARKS REPORT")\n    line()\n\nheader()\nprint("Priya: 87")',
  },
  refactor: {
    id: "refactor", kind: "make", title: "Refactor the repeated block",
    task: <>The same three-line block appears three times. Move it into a function <code>show_rules()</code> and call it three times. The output must not change — and the rules text should now appear only once in your code.</>,
    starter: 'print("Round 1")\nprint("- Answer in 30 seconds")\nprint("- No phones")\nprint("- One attempt each")\nprint("Round 2")\nprint("- Answer in 30 seconds")\nprint("- No phones")\nprint("- One attempt each")\nprint("Round 3")\nprint("- Answer in 30 seconds")\nprint("- No phones")\nprint("- One attempt each")',
    minLines: 13,
    tests: [{ expect: [1, 2, 3].map((r) => `Round ${r}\n- Answer in 30 seconds\n- No phones\n- One attempt each`).join("\n") }],
    requires: [{ node: "FunctionDef" }, { call: "show_rules", min: 1, msg: "Call show_rules()." }],
    forbids: [{ text: "No phones", max: 1, msg: "The rules should be written once, inside show_rules()." }],
    hints: ["Bonus thought: a for loop over range(1, 4) could print the Round lines too."],
    solution: 'def show_rules():\n    print("- Answer in 30 seconds")\n    print("- No phones")\n    print("- One attempt each")\n\nfor r in range(1, 4):\n    print(f"Round {r}")\n    show_rules()',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "When does the body of a function run?", options: ["When Python reads def", "Each time the function is called", "Once, at the end", "Never"], answer: 1, explain: "def only stores it; every call runs it." },
  { q: "What does this print?", code: 'def hi():\n    print("hi")\nprint("start")', options: ["hi start", "start", "start hi", "Nothing"], answer: 1, explain: "hi is defined but never called." },
  { q: "What's wrong with writing just show_menu (no brackets)?", options: ["SyntaxError", "Nothing runs — it only names the function", "It calls it twice", "It deletes it"], answer: 1, explain: "The brackets make the call." },
  { q: "Why use functions?", options: ["Programs run faster", "Write a job once, reuse it, and change it in one place", "Python requires them", "To avoid variables"], answer: 1, explain: "Reuse and a single place to fix bugs." },
  { q: "A function is called on line 1 and defined on line 5. What happens?", options: ["Works", "NameError", "SyntaxError", "It runs twice"], answer: 1, explain: "Python runs top to bottom; on line 1 the name doesn't exist yet." },
];

export default function Unit8_1(props) {
  const sections = [
    {
      label: "Why?", kicker: "THE NEED", title: "Name a job once, use it anywhere",
      blocks: [
        <P>Your programs are growing. The Marks Manager printed its report inside one long <code>elif</code>; the quiz rules got copy-pasted three times. When you copy code, every bug gets copied too, and fixing it means finding every copy. A <strong>function</strong> gives a block of code a name, so you write it once and run it by name.</P>,
        EX.first,
      ],
    },
    {
      label: "def vs call", kicker: "STORE, THEN RUN", title: "def stores the recipe; a call cooks it",
      blocks: [<P>The single most surprising fact about functions: reading <code>def</code> runs <em>nothing</em>. Step through:</P>, <DefTrace />, EX.order],
    },
    {
      label: "Nothing Happened?", kicker: "THREE CLASSIC BUGS", title: "When a function doesn't run",
      blocks: [EX.silent, EX.early, <KeyIdea>A function runs only when it is <strong>called</strong> — with brackets — and only if its <code>def</code> has already been read.</KeyIdea>],
    },
    {
      label: "Build With Them", kicker: "FUNCTIONS USING FUNCTIONS", title: "Small functions, combined",
      blocks: [EX.card, EX.calls],
    },
    {
      label: "Make It", kicker: "REFACTOR", title: "Your program: kill the copy-paste",
      blocks: [<P>Changing code so it works the same but is better organised is called <strong>refactoring</strong>. Professionals do it constantly.</P>, EX.refactor],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit8_1" crumb="MODULE 8 › UNIT 8.1" title="Why Functions?" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 8.2 — Parameters & Return Values", text: "Send values in, get answers back — plus default and keyword arguments." }} />
  );
}
