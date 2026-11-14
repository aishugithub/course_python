// Unit 8.4 — Grand Capstone: Marks Manager 2.0 (rebuilt on the typing-first kit)
// v1 grade() + class_stats() returning a tuple → v2 menu with add_student()
// and print_report() → v3 read_int() validation helper → Make It: a number
// toolkit (is_prime, digit_sum, reverse_number) turning Module 6 into functions.
// Pass mark 40 (the legacy unit used 50).

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT } from "../kit/theme.js";

// ── Reference simulators ──
const gradeOf = (m) => (m >= 90 ? "A" : m >= 75 ? "B" : m >= 60 ? "C" : m >= 40 ? "D" : "F");
function reportLines(pairs) {
  if (!pairs.length) return ["No students yet"];
  let total = 0, passed = 0, top = pairs[0][0], best = pairs[0][1];
  const out = [];
  for (const [n, m] of pairs) { out.push(`${n}: ${m} (${gradeOf(m)})`); total += m; if (m >= 40) passed++; if (m > best) { best = m; top = n; } }
  out.push(`Average: ${(total / pairs.length).toFixed(2)}`, `Topper: ${top} (${best})`, `Passed: ${passed}/${pairs.length}`);
  return out;
}
const sim1 = (names, marks) => {
  const n = names.split(" "), m = marks.split(" ").map(Number);
  return [`Names: ${names}`, `Marks: ${marks}`, ...reportLines(n.map((x, i) => [x, m[i]]))].join("\n");
};
function simMenu(inputs, validate) {
  const q = [...inputs], out = [], data = [];
  const ask = (p) => { const v = q.shift(); out.push(p + v); return v; };
  for (;;) {
    out.push("1. Add  2. Report  3. Exit");
    const c = ask("Choose: ");
    if (c === "1") {
      const name = ask("Name: ").trim().toUpperCase();
      let mark;
      if (validate) {
        for (;;) { const t = ask("Mark: "); if (/^\d+$/.test(t) && Number(t) <= 100) { mark = Number(t); break; } out.push("Enter a number from 0 to 100"); }
      } else mark = Number(ask("Mark: "));
      const at = data.findIndex(([k]) => k === name);
      if (at >= 0) { data[at][1] = mark; out.push(`Updated ${name}`); } else { data.push([name, mark]); out.push(`Added ${name}`); }
    } else if (c === "2") out.push(...reportLines(data));
    else if (c === "3") { out.push("Bye!"); break; }
    else out.push("Invalid choice");
  }
  return out.join("\n");
}
const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
const tool = (n) => `Number: ${n}\nPrime: ${isPrime(n) ? "True" : "False"}\nDigit sum: ${String(n).split("").reduce((a, c) => a + Number(c), 0)}\nReversed: ${Number(String(n).split("").reverse().join(""))}`;

// ── Mission table ──
function Mission() {
  const rows = [
    ["grade(mark)", "returns a letter", "8.2"],
    ["class_stats(marks)", "returns a TUPLE (avg, topper, best, passed) — unpack it", "7.4, 8.2"],
    ["add_student(marks, name, mark)", "changes the dict passed in, returns a message", "8.3 (lists/dicts passed in)"],
    ["print_report(marks)", "only displays — uses the two functions above", "8.1"],
    ["read_int(prompt, low, high)", "keeps asking until the input is valid", "6.1, 7.1 isdigit"],
  ];
  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", maxWidth: 980 }}>
      {rows.map(([fn, job, unit], i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 2.4fr 1fr", gap: 10, padding: "10px 14px", background: i % 2 ? T.surface : T.card, fontSize: 14.5 }}>
          <code style={{ justifySelf: "start" }}>{fn}</code><span>{job}</span><span style={{ color: T.bronze, fontWeight: 700 }}>{unit}</span>
        </div>
      ))}
    </div>
  );
}

// ── Solutions (each version builds on the previous) ──
const GRADE = 'def grade(mark):\n    """Letter grade for a mark (pass mark 40)."""\n    if mark >= 90:\n        return "A"\n    elif mark >= 75:\n        return "B"\n    elif mark >= 60:\n        return "C"\n    elif mark >= 40:\n        return "D"\n    return "F"';
const STATS = 'def class_stats(marks):\n    """Return (average, topper, best, passed) for a dict of name -> mark."""\n    total = 0\n    passed = 0\n    topper = ""\n    best = -1\n    for name, mark in marks.items():\n        total += mark\n        if mark >= 40:\n            passed += 1\n        if mark > best:\n            best = mark\n            topper = name\n    return total / len(marks), topper, best, passed';
const PRINT_BODY = 'for name, mark in marks.items():\n    print(f"{name}: {mark} ({grade(mark)})")\navg, topper, best, passed = class_stats(marks)\nprint(f"Average: {avg:.2f}")\nprint(f"Topper: {topper} ({best})")\nprint(f"Passed: {passed}/{len(marks)}")';
const ind = (s, n) => s.split("\n").map((l) => " ".repeat(n) + l).join("\n");
const V1 = `${GRADE}\n\n${STATS}\n\nnames = input("Names: ").split()\nvalues = input("Marks: ").split()\nmarks = {}\nfor name, m in zip(names, values):\n    marks[name] = int(m)\n${PRINT_BODY}`;
const FUNCS2 = `${GRADE}\n\n${STATS}\n\ndef print_report(marks):\n    if not marks:\n        print("No students yet")\n        return\n${ind(PRINT_BODY, 4)}\n\ndef add_student(marks, name, mark):\n    if name in marks:\n        message = f"Updated {name}"\n    else:\n        message = f"Added {name}"\n    marks[name] = mark\n    return message`;
const MENU = (markLine) => `\n\nmarks = {}\nwhile True:\n    print("1. Add  2. Report  3. Exit")\n    choice = input("Choose: ")\n    if choice == "1":\n        name = input("Name: ").strip().upper()\n        mark = ${markLine}\n        print(add_student(marks, name, mark))\n    elif choice == "2":\n        print_report(marks)\n    elif choice == "3":\n        print("Bye!")\n        break\n    else:\n        print("Invalid choice")`;
const V2 = FUNCS2 + MENU('int(input("Mark: "))');
const READ_INT = '\n\ndef read_int(prompt, low, high):\n    """Ask until the user types a whole number from low to high."""\n    while True:\n        text = input(prompt)\n        if text.isdigit() and low <= int(text) <= high:\n            return int(text)\n        print(f"Enter a number from {low} to {high}")';
const V3 = FUNCS2 + READ_INT + MENU('read_int("Mark: ", 0, 100)');

const S2a = ["2", "1", "priya", "87", "1", "arun", "35", "1", "Priya", "91", "2", "5", "3"];
const S2b = ["1", "meena", "40", "2", "3"];
const S3a = ["1", "ravi", "abc", "150", "-5", "64", "1", "divya", "100", "2", "3"];
const S3b = ["1", "x", "101", "0", "2", "3"];

const EX = {
  v1: {
    id: "v1", kind: "write", title: "Version 1 — functions that return",
    task: <>Write <code>grade(mark)</code> (A ≥ 90, B ≥ 75, C ≥ 60, D ≥ 40, else F) and <code>class_stats(marks)</code>, which takes the dictionary and <strong>returns a tuple</strong> <code>(average, topper, best, passed)</code> — no printing inside either. Main code: read <code>Names: </code> and <code>Marks: </code>, build the dict, print each student as <code>PRIYA: 87 (B)</code>, then unpack <code>class_stats</code> and print <code>Average: 69.50</code>, <code>Topper: MEENA (91)</code>, <code>Passed: 3/4</code>.</>,
    minLines: 30,
    tests: [
      { inputs: ["PRIYA ARUN MEENA RAVI", "87 62 91 38"], expect: sim1("PRIYA ARUN MEENA RAVI", "87 62 91 38") },
      { inputs: ["A B C", "40 39 99"], expect: sim1("A B C", "40 39 99"), hidden: true },
    ],
    post: "assert grade(75) == 'B' and grade(39) == 'F', 'check grade()'\nassert class_stats({'A': 50, 'B': 30}) == (40.0, 'A', 50, 1), 'class_stats should RETURN (average, topper, best, passed)'",
    requires: [{ node: "FunctionDef", min: 2 }, { node: "Return", min: 2 }],
    hints: ["The topper loop from 7.6 moves into class_stats; end it with return total / len(marks), topper, best, passed", "avg, topper, best, passed = class_stats(marks) — unpacking (7.4)."],
    solution: V1,
  },
  v2: {
    id: "v2", kind: "modify", title: "Version 2 — the menu, made of functions",
    task: <>Add two functions: <code>print_report(marks)</code> (prints <code>No students yet</code> for an empty dict, otherwise the report) and <code>add_student(marks, name, mark)</code>, which adds or updates the dict and <strong>returns</strong> <code>Added PRIYA</code> or <code>Updated PRIYA</code>. Then replace the input lines with the menu loop from Unit 7.7 (<code>1. Add  2. Report  3. Exit</code>) — each branch now just calls a function.</>,
    starter: V1,
    minLines: 50,
    tests: [{ inputs: S2a, expect: simMenu(S2a, false) }, { inputs: S2b, expect: simMenu(S2b, false), hidden: true }],
    post: "d = {}\nassert add_student(d, 'Z', 1) == 'Added Z' and d == {'Z': 1}, 'add_student should change the dict passed in and return the message'",
    requires: [{ node: "FunctionDef", min: 4 }, { node: "While" }],
    hints: ["add_student changes the dict passed in — the caller sees it (Unit 8.3).", "print_report: if not marks: print(...) and return early.", "The menu: print(add_student(marks, name, mark)) and print_report(marks)."],
    solution: V2,
  },
  v3: {
    id: "v3", kind: "modify", title: "Version 3 — never crash on bad marks",
    task: <>Typing <code>abc</code> for a mark crashes the program, and <code>150</code> gets saved. Write <code>read_int(prompt, low, high)</code>: it keeps asking until the input is all digits and between low and high, printing <code>Enter a number from 0 to 100</code> after each bad try, and returns the int. Use it for the mark.</>,
    starter: V2,
    minLines: 58,
    tests: [{ inputs: S3a, expect: simMenu(S3a, true) }, { inputs: S3b, expect: simMenu(S3b, true), hidden: true }],
    requires: [{ call: "isdigit" }],
    hints: ["while True: text = input(prompt) — then if text.isdigit() and low <= int(text) <= high: return int(text)", "isdigit() is False for \"-5\" and \"abc\", so int() is never called on them."],
    solution: V3,
  },
  toolkit: {
    id: "toolkit", kind: "make", title: "Number toolkit",
    task: <>Turn three Module 6 algorithms into functions that <strong>return</strong>: <code>is_prime(n)</code> (True/False; 0 and 1 aren't prime), <code>digit_sum(n)</code> and <code>reverse_number(n)</code> (1042 → 2401, as an int — use <code>% 10</code> and <code>// 10</code>, not strings). Ask <code>Number: </code> and print <code>Prime: False</code>, <code>Digit sum: 7</code>, <code>Reversed: 2401</code>. Hidden checks test your functions on other numbers too.</>,
    minLines: 22,
    tests: [{ inputs: ["1042"], expect: tool(1042) }, { inputs: ["97"], expect: tool(97), hidden: true }, { inputs: ["1"], expect: tool(1), hidden: true }],
    post: "assert is_prime(2) and is_prime(13) and not is_prime(0) and not is_prime(91), 'check is_prime'\nassert digit_sum(999) == 27 and digit_sum(5) == 5, 'check digit_sum'\nassert reverse_number(120) == 21 and reverse_number(7) == 7, 'check reverse_number'",
    requires: [{ node: "FunctionDef", min: 3 }],
    forbids: [{ call: "str", msg: "Use % 10 and // 10, not text." }, { node: "Slice", msg: "Use % 10 and // 10, not slicing." }],
    hints: ["reverse: rev = 0; while n > 0: rev = rev * 10 + n % 10; n //= 10", "is_prime: if n < 2: return False — then try divisors; return False at the first one.", "Each function returns; the main code prints."],
    solution: 'def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\ndef digit_sum(n):\n    total = 0\n    while n > 0:\n        total += n % 10\n        n //= 10\n    return total\n\ndef reverse_number(n):\n    rev = 0\n    while n > 0:\n        rev = rev * 10 + n % 10\n        n //= 10\n    return rev\n\nn = int(input("Number: "))\nprint(f"Prime: {is_prime(n)}")\nprint(f"Digit sum: {digit_sum(n)}")\nprint(f"Reversed: {reverse_number(n)}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why should class_stats RETURN its results instead of printing them?", options: ["It's shorter", "The caller can reuse the numbers (compare classes, save them, test them)", "print is slow", "Python requires it"], answer: 1, explain: "Computing and displaying are separate jobs." },
  { q: "class_stats returns total / n, topper, best, passed. What type is that?", options: ["list", "tuple", "dict", "str"], answer: 1, explain: "Comma-separated values are packed into a tuple; the caller unpacks them." },
  { q: "Why does add_student's change to marks show up in the main program?", options: ["marks is global", "The parameter and the caller's variable are tags on the same dict", "return copies it back", "It doesn't"], answer: 1, explain: "Changing a dict passed in changes the caller's dict (Unit 8.3)." },
  { q: "Why check text.isdigit() BEFORE int(text)?", options: ["Style", "int(\"abc\") would crash; and short-circuits so int() never sees bad text", "isdigit converts it", "No reason"], answer: 1, explain: "and stops at the first False (Unit 5.3)." },
  { q: "Which is the main benefit of splitting the program into functions?", options: ["Fewer lines always", "Each piece can be read, tested and fixed on its own", "Faster execution", "No need for loops"], answer: 1, explain: "Small named pieces are easier to understand and trust." },
];

export default function Unit8_4(props) {
  const sections = [
    {
      label: "The Mission", kicker: "GRAND CAPSTONE", title: "Marks Manager 2.0",
      blocks: [
        <P>Your Unit 7.7 Marks Manager works — but everything lives in one long loop. Professionals split programs into small functions, each with one job, that take parameters and return results. You'll refactor it in three versions; the behaviour stays the same while the structure gets better.</P>,
        <Mission />,
        <Note color={T.blue} icon="🧪">Hidden checks call your functions directly (for example <code>class_stats({"{"}'A': 50, 'B': 30{"}"})</code>) — so they must return values, not print them.</Note>,
      ],
    },
    { label: "Version 1", kicker: "BUILD IN STEPS", title: "Version 1: compute in functions", blocks: [EX.v1] },
    { label: "Version 2", kicker: "ADD ONE IDEA", title: "Version 2: a menu of function calls", blocks: [EX.v2] },
    {
      label: "Version 3", kicker: "ADD ONE MORE", title: "Version 3: a reusable input helper",
      blocks: [EX.v3, <KeyIdea>read_int is useful in every program that reads numbers. Write a helper once, test it once, and reuse it everywhere — that's the real payoff of functions. In Module 9 you'll meet try/except, another way to survive bad input.</KeyIdea>],
    },
    {
      label: "Make It", kicker: "ON YOUR OWN", title: "Your program: number toolkit",
      blocks: [<P>Three classic algorithms from Module 6, now as reusable functions that return answers.</P>, EX.toolkit],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit8_4" crumb="MODULE 8 › UNIT 8.4" title="Grand Capstone: Marks Manager 2.0" sections={sections} quiz={QUIZ}
      next={{ title: "Computational Thinking III — Thinking Recursively", text: "Module 8 complete! A function that calls itself… (Optional first: Module 8's Crucible.)" }} />
  );
}
