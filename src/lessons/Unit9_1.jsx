// Unit 9.1 — Errors Aren't Failures (rebuilt, typing-first)
// Read a traceback bottom-up → the error zoo (fix each) → try/except
// ValueError → retry until valid → why a bare except hides real bugs.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

// ── Widget: read a traceback ──
const TB = [
  { t: "Traceback (most recent call last):", n: "Just a heading. The useful part is at the BOTTOM — read a traceback from the last line up." },
  { t: '  File "marks.py", line 3, in <module>', n: "Which file and which line. Go straight to line 3." },
  { t: "    total = total + int(raw)", n: "The exact line that failed, reprinted for you." },
  { t: "ValueError: invalid literal for int() with base 10: 'eighty'", n: "The most important line: the error TYPE (ValueError) and the reason ('eighty' isn't a whole number). Read this first." },
];
function Traceback() {
  const [i, setI] = useState(3);
  return (
    <div className="fh-two">
      <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 14, lineHeight: 1.7, background: T.termBg, color: T.termText, borderRadius: 10, padding: 8 }}>
        {TB.map((l, k) => <div key={k} onClick={() => setI(k)} style={{ cursor: "pointer", padding: "2px 8px", borderRadius: 5, color: k === 3 ? T.termErr : T.termText, background: i === k ? "rgba(240,184,96,.25)" : "transparent" }}>{l.t}</div>)}
      </pre>
      <div style={{ background: tint(T.purple, "0E"), border: `1px solid ${tint(T.purple, "44")}`, borderRadius: 12, padding: 14, fontSize: 14.5, color: T.slate, lineHeight: 1.65 }}>
        <div style={{ fontSize: 12.5, color: T.muted, marginBottom: 4 }}>Click any line of the traceback.</div>
        {TB[i].n}
      </div>
    </div>
  );
}

const EX = {
  zoo1: {
    id: "zoo1", kind: "fix", title: "Error zoo: ZeroDivisionError",
    task: <>Every exception type has a name that says what went wrong. Run, read the last line, fix: a class with 0 students should print <code>No students</code> instead of crashing.</>,
    starter: 'total = int(input("Total marks: "))\nstudents = int(input("Students: "))\nprint("Average:", total / students)',
    tests: [{ inputs: ["0", "0"], expect: "Total marks: 0\nStudents: 0\nNo students" }, { inputs: ["300", "4"], expect: "Total marks: 300\nStudents: 4\nAverage: 75.0", hidden: true }],
    hints: ["You don't need try for this one — an if can check before dividing.", "if students == 0: print(\"No students\") else: …"],
    solution: 'total = int(input("Total marks: "))\nstudents = int(input("Students: "))\nif students == 0:\n    print("No students")\nelse:\n    print("Average:", total / students)',
  },
  zoo2: {
    id: "zoo2", kind: "fix", title: "Error zoo: IndexError",
    task: <>This should print the last mark in the list. Run it, read the error, fix the index — so it works for a list of any length.</>,
    starter: 'marks = [72, 85, 64]\nprint("Last:", marks[len(marks)])',
    tests: [{ expect: "Last: 64" }],
    hints: ["The last index is len(marks) - 1 — or simply -1."],
    solution: 'marks = [72, 85, 64]\nprint("Last:", marks[-1])',
  },
  silent: {
    id: "silent", kind: "fix", title: "No error, wrong answer",
    task: <>This program runs without any error, yet for <code>70 80 90</code> it prints <code>Total: 90</code>. Don't guess. Add <code>print(m, total)</code> as the last line inside the loop, run it, and watch the two values change. Fix the bug, then delete your extra print.</>,
    starter: 'line = input("Marks: ")\ntotal = 0\nfor m in line.split():\n    total = int(m)\nprint("Total:", total)',
    tests: [{ inputs: ["70 80 90"], expect: "Marks: 70 80 90\nTotal: 240" }, { inputs: ["5 5"], expect: "Marks: 5 5\nTotal: 10", hidden: true }],
    hints: ["Your debug print shows total is replaced each time round, never added to.", "total = int(m) throws the old total away. Which operator keeps it?"],
    solution: 'line = input("Marks: ")\ntotal = 0\nfor m in line.split():\n    total += int(m)\nprint("Total:", total)',
  },
  first: {
    id: "first", kind: "type", title: "try / except",
    task: <>Some errors can't be checked in advance with an if — you only find out when <code>int()</code> tries. Put the risky line inside <code>try:</code>; if a <code>ValueError</code> happens, Python jumps to <code>except ValueError:</code> instead of crashing.</>,
    show: 'raw = input("Mark: ")\ntry:\n    mark = int(raw)\n    print("Saved:", mark)\nexcept ValueError:\n    print("That\'s not a whole number")\nprint("Program still running")',
    tests: [{ inputs: ["eighty"], expect: "Mark: eighty\nThat's not a whole number\nProgram still running" }, { inputs: ["75"], expect: "Mark: 75\nSaved: 75\nProgram still running", hidden: true }],
    requires: [{ node: "Try" }],
    hints: ["When int(raw) fails, the print(\"Saved:\") line is skipped — Python jumps straight to except."],
    solution: 'raw = input("Mark: ")\ntry:\n    mark = int(raw)\n    print("Saved:", mark)\nexcept ValueError:\n    print("That\'s not a whole number")\nprint("Program still running")',
  },
  price: {
    id: "price", kind: "write", title: "Catch a bad price",
    task: <>Ask <code>Price: </code> and <code>Qty: </code>. If both convert (price as float, qty as int), print <code>Total: Rs 450.00</code>; if either fails, print <code>Please type numbers only</code>.</>,
    tests: [
      { inputs: ["150", "3"], expect: "Price: 150\nQty: 3\nTotal: Rs 450.00" },
      { inputs: ["abc", "3"], expect: "Price: abc\nQty: 3\nPlease type numbers only", hidden: true },
      { inputs: ["99.5", "two"], expect: "Price: 99.5\nQty: two\nPlease type numbers only", hidden: true },
    ],
    requires: [{ node: "Try" }],
    hints: ["Read both inputs first, then convert both inside one try.", 'except ValueError: print("Please type numbers only")'],
    solution: 'price_text = input("Price: ")\nqty_text = input("Qty: ")\ntry:\n    price = float(price_text)\n    qty = int(qty_text)\n    print(f"Total: Rs {price * qty:.2f}")\nexcept ValueError:\n    print("Please type numbers only")',
  },
  retry: {
    id: "retry", kind: "write", title: "Ask again until it works",
    task: <>Combine <code>while True</code> with try/except: keep asking <code>Age: </code> until the answer converts to an int. After each bad answer print <code>Numbers only, please</code>. Finally print <code>Next year you will be 19</code>.</>,
    tests: [
      { inputs: ["eighteen", "18.5", "18"], expect: "Age: eighteen\nNumbers only, please\nAge: 18.5\nNumbers only, please\nAge: 18\nNext year you will be 19" },
      { inputs: ["40"], expect: "Age: 40\nNext year you will be 41", hidden: true },
    ],
    requires: [{ node: "Try" }, { node: "While" }],
    hints: ["while True: try: age = int(input(\"Age: \")); break — except ValueError: print(...)", "The break only runs if int() succeeded."],
    solution: 'while True:\n    try:\n        age = int(input("Age: "))\n        break\n    except ValueError:\n        print("Numbers only, please")\nprint(f"Next year you will be {age + 1}")',
  },
  bare: {
    id: "bare", kind: "fix", title: "The except that hides bugs",
    task: <>Every input, even <code>75</code>, prints <code>Invalid mark</code>. A bare <code>except:</code> catches <em>everything</em> — including a typo in the code. Change it to catch only <code>ValueError</code>, run again to reveal the real bug, and fix that too.</>,
    starter: 'raw = input("Mark: ")\ntry:\n    mark = int(raw)\n    prnt("Saved:", mark)\nexcept:\n    print("Invalid mark")',
    tests: [{ inputs: ["75"], expect: "Mark: 75\nSaved: 75" }, { inputs: ["x"], expect: "Mark: x\nInvalid mark", hidden: true }],
    validate: (code) => (/except\s*:/.test(code) ? "Name the exception: except ValueError:" : null),
    hints: ["except ValueError: lets the NameError show itself.", "prnt → print"],
    solution: 'raw = input("Mark: ")\ntry:\n    mark = int(raw)\n    print("Saved:", mark)\nexcept ValueError:\n    print("Invalid mark")',
  },
  survey: {
    id: "survey", kind: "make", title: "A crash-proof survey",
    task: <>Ask <code>How many responses: </code> (retry until it's a whole number, printing <code>Numbers only, please</code>). Then read that many ratings with <code>Rating: </code>; a rating that isn't a whole number from 1 to 5 prints <code>Skipped</code> and doesn't count. Finally print <code>Valid: 3</code> and <code>Average: 4.00</code> (or <code>Average: none</code> if no valid ratings).</>,
    minLines: 18,
    tests: [
      { inputs: ["x", "4", "5", "abc", "3", "9"], expect: "How many responses: x\nNumbers only, please\nHow many responses: 4\nRating: 5\nRating: abc\nSkipped\nRating: 3\nRating: 9\nSkipped\nValid: 2\nAverage: 4.00" },
      { inputs: ["2", "z", "0"], expect: "How many responses: 2\nRating: z\nSkipped\nRating: 0\nSkipped\nValid: 0\nAverage: none", hidden: true },
      { inputs: ["3", "4", "4", "5"], expect: "How many responses: 3\nRating: 4\nRating: 4\nRating: 5\nValid: 3\nAverage: 4.33", hidden: true },
    ],
    requires: [{ node: "Try", min: 2 }],
    hints: ["Two try blocks: one in the retry loop, one per rating.", "Inside the rating try: r = int(...); if 1 <= r <= 5: count it, else print Skipped. except ValueError: print Skipped.", "Guard the average: if valid == 0."],
    solution: 'while True:\n    try:\n        n = int(input("How many responses: "))\n        break\n    except ValueError:\n        print("Numbers only, please")\nvalid = 0\ntotal = 0\nfor i in range(n):\n    try:\n        r = int(input("Rating: "))\n        if 1 <= r <= 5:\n            valid += 1\n            total += r\n        else:\n            print("Skipped")\n    except ValueError:\n        print("Skipped")\nprint(f"Valid: {valid}")\nif valid == 0:\n    print("Average: none")\nelse:\n    print(f"Average: {total / valid:.2f}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Which line of a traceback should you read first?", options: ["The first", "The last — error type and reason", "The middle", "None"], answer: 1, explain: "Bottom-up: the last line names the problem; the line above shows where." },
  { q: "What happens to the rest of a try block after an exception?", options: ["It runs anyway", "It's skipped — Python jumps to the matching except", "The program stops", "It repeats"], answer: 1, explain: "That's why print(\"Saved\") didn't run for bad input." },
  { q: "Why is a bare except: dangerous?", options: ["Slow", "It also catches bugs like NameError, hiding them", "Not allowed", "It never runs"], answer: 1, explain: "Catch only the exception you expect." },
  { q: "Divide by a count that could be 0. Best approach?", options: ["Always try/except", "An if check before dividing is clearest when you can test in advance", "Ignore it", "Use a bare except"], answer: 1, explain: "Use if when you can check first; try when you can only find out by trying (like int())." },
];

export default function Unit9_1(props) {
  const sections = [
    {
      label: "Tracebacks", kicker: "READ IT BOTTOM-UP", title: "An error message is a bug report",
      blocks: [<P>That red wall of text is Python telling you exactly what went wrong and where. The coach has been translating it for you; now learn to read it yourself:</P>, <Traceback />, EX.zoo1, EX.zoo2],
    },
    {
      label: "Silent Bugs", kicker: "A METHOD, NOT A GUESS", title: "When there is no error message",
      blocks: [
        <P>The hardest bugs don't crash: the program runs and quietly prints the wrong answer. There is no traceback to read, so you make the program show you what it is doing:</P>,
        <P><strong>1.</strong> Use the smallest input that still goes wrong. <strong>2.</strong> Work out by hand what the answer should be. <strong>3.</strong> Put a <code>print( )</code> just before the line you suspect, showing the variables it uses. <strong>4.</strong> Run it and find the first line of output that differs from what you expected: the bug is just above it. <strong>5.</strong> Change one thing, run again, then remove your extra prints.</P>,
        EX.silent,
        <KeyIdea>A traceback tells you where a program stopped. A debug <code>print</code> tells you what it was thinking. Never change code at random: look first, then fix.</KeyIdea>,
      ],
    },
    {
      label: "try / except", kicker: "SURVIVE BAD INPUT", title: "Catching an exception",
      blocks: [EX.first, EX.price, EX.retry, <KeyIdea>Use <code>if</code> when you can check before acting (is the count 0?). Use <code>try</code> when the only way to know is to try (can this text become an int?).</KeyIdea>],
    },
    { label: "Catch Narrowly", kicker: "THE TRAP", title: "Catch only what you expect", blocks: [EX.bare, <Note icon="⚠️">A bare <code>except:</code> turns every bug into “invalid input”. Always name the exception type.</Note>] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: a crash-proof survey", blocks: [EX.survey] },
  ];
  return (
    <LessonShell {...props} unitId="Unit9_1" crumb="MODULE 9 › UNIT 9.1" title="Errors Aren't Failures" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 9.2 — Catching & Raising", text: "Several excepts, else, finally — and raising your own errors on purpose." }} />
  );
}
