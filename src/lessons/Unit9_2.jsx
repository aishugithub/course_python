// Unit 9.2 — Catching & Raising (rebuilt, typing-first)
// Several excepts → except … as e → else and finally (order of execution) →
// raise your own ValueError in a function, catch it in the caller → ATM.

import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const atm = (inputs) => {
  let bal = 5000; const out = [];
  for (const a of inputs) {
    out.push(`Withdraw: ${a}`);
    if (a === "0") break;
    const n = Number(a);
    if (!/^-?\d+$/.test(a)) out.push("Error: amount must be a whole number");
    else if (n <= 0) out.push("Error: amount must be positive");
    else if (n % 100 !== 0) out.push("Error: notes are Rs 100 only");
    else if (n > bal) out.push(`Error: balance is only Rs ${bal}`);
    else { bal -= n; out.push(`Dispensed Rs ${n}`); }
    out.push(`Balance: Rs ${bal}`);
  }
  out.push("Thank you for banking with Foothold");
  return out.join("\n");
};

const EX = {
  several: {
    id: "several", kind: "write", title: "Two things can go wrong",
    task: <>Ask <code>Total marks: </code> and <code>Students: </code>. Bad text → <code>Please type numbers</code>; zero students → <code>No students</code>; otherwise <code>Average: 75.00</code>. Use one try with <strong>two</strong> except blocks — no if this time.</>,
    tests: [
      { inputs: ["300", "4"], expect: "Total marks: 300\nStudents: 4\nAverage: 75.00" },
      { inputs: ["abc", "4"], expect: "Total marks: abc\nStudents: 4\nPlease type numbers", hidden: true },
      { inputs: ["300", "0"], expect: "Total marks: 300\nStudents: 0\nNo students", hidden: true },
    ],
    requires: [{ node: "ExceptHandler", min: 2, msg: "Use two except blocks: ValueError and ZeroDivisionError." }],
    hints: ["except ValueError: … then except ZeroDivisionError: …", "Python runs the FIRST except whose type matches."],
    solution: 'a = input("Total marks: ")\nb = input("Students: ")\ntry:\n    avg = int(a) / int(b)\n    print(f"Average: {avg:.2f}")\nexcept ValueError:\n    print("Please type numbers")\nexcept ZeroDivisionError:\n    print("No students")',
  },
  ase: {
    id: "ase", kind: "type", title: "except … as e",
    task: <><code>as e</code> gives you the exception itself; printing it shows Python's message. Useful for logs.</>,
    show: 'for text in ["42", "4.2", "forty"]:\n    try:\n        print(int(text))\n    except ValueError as e:\n        print("Problem:", e)',
    tests: [{ expect: "42\nProblem: invalid literal for int() with base 10: '4.2'\nProblem: invalid literal for int() with base 10: 'forty'" }],
    hints: ["e holds the error; print(e) shows its message."],
    solution: 'for text in ["42", "4.2", "forty"]:\n    try:\n        print(int(text))\n    except ValueError as e:\n        print("Problem:", e)',
  },
  elsefinally: {
    id: "elsefinally", kind: "type", title: "else and finally",
    task: <><code>else</code> runs only if the try succeeded; <code>finally</code> runs <strong>always</strong> — success, failure, even after a return. Predict both runs before you check.</>,
    show: 'raw = input("Seats: ")\ntry:\n    seats = int(raw)\nexcept ValueError:\n    print("Not a number")\nelse:\n    print("Booked", seats, "seats")\nfinally:\n    print("Counter closed")',
    tests: [{ inputs: ["3"], expect: "Seats: 3\nBooked 3 seats\nCounter closed" }, { inputs: ["three"], expect: "Seats: three\nNot a number\nCounter closed", hidden: true }],
    hints: ["Order: try → (except OR else) → finally."],
    solution: 'raw = input("Seats: ")\ntry:\n    seats = int(raw)\nexcept ValueError:\n    print("Not a number")\nelse:\n    print("Booked", seats, "seats")\nfinally:\n    print("Counter closed")',
  },
  raise: {
    id: "raise", kind: "write", title: "Raise your own error",
    task: <>Python doesn't know a mark must be 0–100 — so tell it. Write <code>check_mark(mark)</code> that <code>raise</code>s <code>ValueError("Mark must be between 0 and 100")</code> for out-of-range marks and otherwise returns the mark. Main code: read <code>Mark: </code>, call it inside try, and print <code>Saved 87</code> or <code>Rejected: Mark must be between 0 and 100</code> (using <code>as e</code>). Bad text should be rejected the same way — int() raises its own ValueError.</>,
    tests: [
      { inputs: ["87"], expect: "Mark: 87\nSaved 87" },
      { inputs: ["150"], expect: "Mark: 150\nRejected: Mark must be between 0 and 100", hidden: true },
      { inputs: ["abc"], expect: "Mark: abc\nRejected: invalid literal for int() with base 10: 'abc'", hidden: true },
    ],
    post: "try:\n    check_mark(-1)\n    raise AssertionError('check_mark(-1) should raise ValueError')\nexcept ValueError:\n    pass\nassert check_mark(0) == 0",
    requires: [{ node: "Raise" }, { node: "FunctionDef" }],
    hints: ['if mark < 0 or mark > 100: raise ValueError("Mark must be between 0 and 100")', 'try: m = check_mark(int(input("Mark: "))) … except ValueError as e: print(f"Rejected: {e}")'],
    solution: 'def check_mark(mark):\n    if mark < 0 or mark > 100:\n        raise ValueError("Mark must be between 0 and 100")\n    return mark\n\ntry:\n    m = check_mark(int(input("Mark: ")))\n    print(f"Saved {m}")\nexcept ValueError as e:\n    print(f"Rejected: {e}")',
  },
  order: {
    id: "order", kind: "fix", title: "The except that never runs",
    task: <><code>Exception</code> is the parent of almost all errors, so <code>except Exception</code> catches a ValueError too. Here it comes first, so the friendly ValueError message never shows. Run with the test input and fix the order.</>,
    starter: 'try:\n    n = int(input("Number: "))\n    print(100 / n)\nexcept Exception:\n    print("Something went wrong")\nexcept ValueError:\n    print("Please type a whole number")',
    tests: [{ inputs: ["ten"], expect: "Number: ten\nPlease type a whole number" }, { inputs: ["0"], expect: "Number: 0\nSomething went wrong", hidden: true }],
    hints: ["Python uses the first matching except. Put the specific one first, the general one last."],
    solution: 'try:\n    n = int(input("Number: "))\n    print(100 / n)\nexcept ValueError:\n    print("Please type a whole number")\nexcept Exception:\n    print("Something went wrong")',
  },
  atm: {
    id: "atm", kind: "make", title: "ATM withdrawals",
    task: <>Balance starts at Rs 5000. Keep asking <code>Withdraw: </code> until <code>0</code>. Write <code>withdraw(balance, amount)</code> that <strong>raises ValueError</strong> with the messages <code>amount must be positive</code>, <code>notes are Rs 100 only</code> (not a multiple of 100) or <code>balance is only Rs 5000</code>, and otherwise returns the new balance. The loop prints <code>Dispensed Rs 500</code> or <code>Error: …</code> (text that isn't a whole number: <code>Error: amount must be a whole number</code>), then <code>Balance: Rs 4500</code> every round — use <code>finally</code> for that line. At the end: <code>Thank you for banking with Foothold</code>.</>,
    minLines: 26,
    tests: [
      { inputs: ["500", "250", "abc", "-100", "9000", "0"], expect: atm(["500", "250", "abc", "-100", "9000", "0"]) },
      { inputs: ["5000", "100", "0"], expect: atm(["5000", "100", "0"]), hidden: true },
    ],
    requires: [{ node: "Raise", min: 3 }, { node: "Try" }],
    hints: ["Convert first: try: amount = int(text) … except ValueError: print(\"Error: amount must be a whole number\")", "Two layers are fine: one try for the int(), one around withdraw() — or one try catching ValueError from both, but then the messages must differ.", "finally: print(f\"Balance: Rs {balance}\")"],
    solution: 'def withdraw(balance, amount):\n    if amount <= 0:\n        raise ValueError("amount must be positive")\n    if amount % 100 != 0:\n        raise ValueError("notes are Rs 100 only")\n    if amount > balance:\n        raise ValueError(f"balance is only Rs {balance}")\n    return balance - amount\n\nbalance = 5000\nwhile True:\n    text = input("Withdraw: ")\n    if text == "0":\n        break\n    try:\n        try:\n            amount = int(text)\n        except ValueError:\n            raise ValueError("amount must be a whole number")\n        balance = withdraw(balance, amount)\n        print(f"Dispensed Rs {amount}")\n    except ValueError as e:\n        print(f"Error: {e}")\n    finally:\n        print(f"Balance: Rs {balance}")\nprint("Thank you for banking with Foothold")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "When does an else block after try/except run?", options: ["Always", "Only if the try raised no exception", "Only after an exception", "Never"], answer: 1, explain: "else = the success path." },
  { q: "When does finally run?", options: ["Only on success", "Only on error", "Always", "Only with return"], answer: 2, explain: "It's for cleanup that must happen no matter what." },
  { q: "Why raise an error in check_mark instead of printing a message?", options: ["Shorter", "The caller decides what to do; the function just reports the problem", "print is broken", "Required"], answer: 1, explain: "Functions report problems; callers handle them." },
  { q: "except Exception before except ValueError means…", options: ["Both run", "The ValueError block is never reached", "A SyntaxError", "ValueError runs first"], answer: 1, explain: "The first matching except wins; specific first, general last." },
];

export default function Unit9_2(props) {
  const sections = [
    { label: "Several excepts", kicker: "DIFFERENT PROBLEMS, DIFFERENT ANSWERS", title: "One try, several excepts", blocks: [EX.several, EX.ase] },
    {
      label: "else & finally", kicker: "THE FULL SHAPE", title: "try · except · else · finally",
      blocks: [
        <div style={{ maxWidth: 620 }}><CodeBlock title="the full shape" code={"try:\n    risky()          # might raise\nexcept ValueError:\n    handle_it()      # only if it raised ValueError\nelse:\n    on_success()     # only if NOTHING was raised\nfinally:\n    clean_up()       # always, no matter what"} /></div>,
        EX.elsefinally,
      ],
    },
    {
      label: "raise", kicker: "REPORT IT YOURSELF", title: "Raising your own exceptions",
      blocks: [<P>Your own rules (a mark must be 0–100, a withdrawal must be positive) aren't known to Python. A function can enforce them with <code>raise</code> — and let its caller decide what to do.</P>, EX.raise, EX.order, <KeyIdea>Functions <strong>raise</strong> problems; callers <strong>handle</strong> them. Order excepts from most specific to most general.</KeyIdea>],
    },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: ATM", blocks: [<Note color={T.blue} icon="🏧">You'll build your own exception <em>classes</em> (like <code>InsufficientFundsError</code>) in Module 10.</Note>, EX.atm] },
  ];
  return (
    <LessonShell {...props} unitId="Unit9_2" crumb="MODULE 9 › UNIT 9.2" title="Catching & Raising" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 9.3 — Files", text: "RAM forgets when the program ends. Files remember." }} />
  );
}
