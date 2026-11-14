// Unit 8.2 — Parameters & Return Values (rebuilt on the typing-first lesson kit)
// Parameters vs arguments → return hands a value back → print vs return (None)
// → returning a bool, early return → default parameters, keyword arguments,
// missing-argument TypeError → docstrings → bill-splitter make-task.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

// ── Widget: arguments fill parameters, return sends a value back ──
function CallFlow() {
  const [l, setL] = useState(5);
  const [w, setW] = useState(3);
  return (
    <div className="fh-two">
      <div>
        <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 15, lineHeight: 1.8, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px" }}>
          {"def area("}<span style={{ color: T.teal, fontWeight: 700 }}>length</span>{", "}<span style={{ color: T.teal, fontWeight: 700 }}>width</span>{"):\n    "}<span style={{ color: T.purple, fontWeight: 700 }}>return</span>{" length * width\n\nresult = area("}<span style={{ color: T.orange, fontWeight: 700 }}>{l}</span>{", "}<span style={{ color: T.orange, fontWeight: 700 }}>{w}</span>{")\nprint(result)"}
        </pre>
        <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
          {[["length", l, setL], ["width", w, setW]].map(([n, v, set]) => (
            <label key={n} style={{ fontFamily: CODE_FONT, fontSize: 14 }}>{n} = <strong>{v}</strong><input type="range" min={1} max={12} value={v} onChange={(e) => set(Number(e.target.value))} style={{ width: 130, accentColor: T.navy, display: "block" }} /></label>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.75 }}>
        <div>1. The <strong style={{ color: T.orange }}>arguments</strong> {l} and {w} travel into the <strong style={{ color: T.teal }}>parameters</strong>: <code>length = {l}</code>, <code>width = {w}</code> (in order).</div>
        <div>2. The body computes <code>{l} * {w}</code>.</div>
        <div>3. <strong style={{ color: T.purple }}>return</strong> sends <strong>{l * w}</strong> back to the call, which is replaced by that value: <code>result = {l * w}</code>.</div>
        <div style={{ marginTop: 8, fontFamily: CODE_FONT, background: T.termBg, color: T.termText, borderRadius: 8, padding: "8px 12px", display: "inline-block" }}>{l * w}</div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const share = (total, people, tip) => (total * (1 + tip / 100)) / people;
const EX = {
  area: {
    id: "area", kind: "type", title: "Data in, answer out",
    task: <>A function with two parameters and a return value. The call is replaced by whatever the function returns, so it can be used anywhere a value can.</>,
    show: 'def area(length, width):\n    return length * width\n\nprint(area(5, 3))\nroom = area(4, 4)\nprint(room + area(2, 3))',
    tests: [{ expect: "15\n22" }],
    requires: [{ node: "Return" }],
    hints: ["area(4, 4) is 16, area(2, 3) is 6."],
    solution: 'def area(length, width):\n    return length * width\n\nprint(area(5, 3))\nroom = area(4, 4)\nprint(room + area(2, 3))',
  },
  grade: {
    id: "grade", kind: "write", title: "grade(mark)",
    task: <>Write <code>grade(mark)</code> that <strong>returns</strong> (not prints) the letter: <code>A</code> ≥ 90, <code>B</code> ≥ 75, <code>C</code> ≥ 60, <code>D</code> ≥ 40, else <code>F</code>. Then, for <code>marks = [95, 72, 40, 39]</code>, print <code>95 -&gt; A</code> and so on.</>,
    tests: [{ expect: "95 -> A\n72 -> C\n40 -> D\n39 -> F" }],
    post: "assert grade(75) == 'B', 'grade(75) should return \"B\"'\nassert grade(60) == 'C', 'grade(60) should return \"C\"'\nassert grade(0) == 'F'\nassert grade(90) == 'A'",
    requires: [{ node: "FunctionDef" }, { node: "Return" }],
    hints: ["Each branch can return straight away: if mark >= 90: return \"A\"", 'for m in marks: print(f"{m} -> {grade(m)}")'],
    solution: 'def grade(mark):\n    if mark >= 90:\n        return "A"\n    elif mark >= 75:\n        return "B"\n    elif mark >= 60:\n        return "C"\n    elif mark >= 40:\n        return "D"\n    else:\n        return "F"\n\nmarks = [95, 72, 40, 39]\nfor m in marks:\n    print(f"{m} -> {grade(m)}")',
  },
  printret: {
    id: "printret", kind: "fix", title: "The None trap",
    task: <>Run it: the total is printed, and then <code>Grand total: None</code>. Fix the function so the caller gets the number back.</>,
    starter: 'def bill(price, qty):\n    print(price * qty)\n\ntotal = bill(150, 3)\nprint("Grand total:", total)',
    tests: [{ expect: "Grand total: 450" }],
    requires: [{ node: "Return" }],
    hints: ["A function with no return gives back None.", "Replace print with return inside the function."],
    solution: 'def bill(price, qty):\n    return price * qty\n\ntotal = bill(150, 3)\nprint("Grand total:", total)',
  },
  iseven: {
    id: "iseven", kind: "write", title: "A function that answers yes/no",
    task: <>Write <code>is_even(n)</code> returning <code>True</code> or <code>False</code>. Then ask <code>Numbers: </code> (one line) and use it to print <code>Even count: 3</code>.</>,
    tests: [{ inputs: ["4 7 10 13 22"], expect: "Numbers: 4 7 10 13 22\nEven count: 3" }, { inputs: ["1 3"], expect: "Numbers: 1 3\nEven count: 0", hidden: true }],
    post: "assert is_even(0) is True and is_even(5) is False, 'is_even should return True or False'",
    requires: [{ node: "FunctionDef" }],
    hints: ["return n % 2 == 0 — the comparison already IS True or False.", "if is_even(int(p)): count += 1"],
    solution: 'def is_even(n):\n    return n % 2 == 0\n\ncount = 0\nfor p in input("Numbers: ").split():\n    if is_even(int(p)):\n        count += 1\nprint(f"Even count: {count}")',
  },
  firstfail: {
    id: "firstfail", kind: "write", title: "return stops the function",
    task: <><code>return</code> ends the function immediately — even inside a loop. Write <code>first_fail(marks)</code> that returns the first mark below 40, or <code>None</code> if there isn't one. For <code>[72, 38, 25]</code> print <code>First fail: 38</code>; for <code>[72, 85]</code> print <code>First fail: None</code>.</>,
    tests: [{ expect: "First fail: 38\nFirst fail: None" }],
    post: "assert first_fail([10]) == 10\nassert first_fail([]) is None",
    requires: [{ node: "Return", min: 2 }],
    hints: ["for m in marks: if m < 40: return m", "After the loop (only reached if nothing failed): return None"],
    solution: 'def first_fail(marks):\n    for m in marks:\n        if m < 40:\n            return m\n    return None\n\nprint("First fail:", first_fail([72, 38, 25]))\nprint("First fail:", first_fail([72, 85]))',
  },
  defaults: {
    id: "defaults", kind: "type", title: "Default values",
    task: <>A parameter can have a <strong>default</strong>, used when the call leaves it out. Parameters with defaults come last.</>,
    show: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Priya"))\nprint(greet("Arun", "Vanakkam"))',
    tests: [{ expect: "Hello, Priya!\nVanakkam, Arun!" }],
    hints: ["The first call doesn't pass a greeting, so the default is used."],
    solution: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Priya"))\nprint(greet("Arun", "Vanakkam"))',
  },
  keywords: {
    id: "keywords", kind: "write", title: "Keyword arguments",
    task: <>Write <code>ticket(movie, seats=1, price=150)</code> returning <code>f"{"{movie}"}: {"{seats}"} x Rs {"{price}"} = Rs {"{seats * price}"}"</code>. Call it three ways: just <code>"Leo"</code>; <code>"Jailer"</code> with <code>seats=3</code>; and <code>"Kalki"</code> with <code>price=200</code> only — using <strong>keyword arguments</strong> (<code>name=value</code> in the call).</>,
    tests: [{ expect: "Leo: 1 x Rs 150 = Rs 150\nJailer: 3 x Rs 150 = Rs 450\nKalki: 1 x Rs 200 = Rs 200" }],
    post: "assert ticket('X', price=10, seats=2) == 'X: 2 x Rs 10 = Rs 20', 'ticket should return the text, using both keyword arguments'",
    requires: [{ node: "keyword", msg: "Use keyword arguments in your calls, like seats=3." }],
    hints: ['def ticket(movie, seats=1, price=150):\n    return f"{movie}: {seats} x Rs {price} = Rs {seats * price}"', 'print(ticket("Kalki", price=200)) — the keyword lets you skip seats.'],
    solution: 'def ticket(movie, seats=1, price=150):\n    return f"{movie}: {seats} x Rs {price} = Rs {seats * price}"\n\nprint(ticket("Leo"))\nprint(ticket("Jailer", seats=3))\nprint(ticket("Kalki", price=200))',
  },
  missing: {
    id: "missing", kind: "fix", title: "One argument short",
    task: <>Run it and read the coach. Fix the <strong>call</strong> so it prints <code>Area: 12</code>.</>,
    starter: 'def area(length, width):\n    return length * width\n\nprint("Area:", area(4))',
    tests: [{ expect: "Area: 12" }],
    hints: ["area needs two values: length and width. 4 × 3 = 12."],
    solution: 'def area(length, width):\n    return length * width\n\nprint("Area:", area(4, 3))',
  },
  docstring: {
    id: "docstring", kind: "type", title: "Docstrings",
    task: <>A string right under the <code>def</code> line documents the function. Python stores it, and <code>help()</code> and code editors show it to anyone using your function.</>,
    show: 'def celsius(f):\n    """Convert Fahrenheit to Celsius, rounded to 1 decimal."""\n    return round((f - 32) * 5 / 9, 1)\n\nprint(celsius(98.6))\nprint(celsius.__doc__)',
    tests: [{ expect: "37.0\nConvert Fahrenheit to Celsius, rounded to 1 decimal." }],
    hints: ["Triple quotes, indented like the body."],
    solution: 'def celsius(f):\n    """Convert Fahrenheit to Celsius, rounded to 1 decimal."""\n    return round((f - 32) * 5 / 9, 1)\n\nprint(celsius(98.6))\nprint(celsius.__doc__)',
  },
  splitter: {
    id: "splitter", kind: "make", title: "Bill splitter",
    task: <>Write <code>per_person(total, people=2, tip=0)</code> with a docstring, returning each person's share: the total plus <code>tip</code> percent, divided by <code>people</code>. Ask <code>Bill: </code> (decimal) and <code>People: </code>, and print three lines with 2 decimals: <code>Split: Rs 450.00</code>, <code>With 10% tip: Rs 495.00</code> (use <code>tip=10</code> as a keyword argument), and <code>Just you: Rs 900.00</code> (<code>people=1</code>).</>,
    minLines: 9,
    tests: [
      { inputs: ["900", "2"], expect: `Bill: 900\nPeople: 2\nSplit: Rs ${share(900, 2, 0).toFixed(2)}\nWith 10% tip: Rs ${share(900, 2, 10).toFixed(2)}\nJust you: Rs ${share(900, 1, 0).toFixed(2)}` },
      { inputs: ["1200", "3"], expect: `Bill: 1200\nPeople: 3\nSplit: Rs ${share(1200, 3, 0).toFixed(2)}\nWith 10% tip: Rs ${share(1200, 3, 10).toFixed(2)}\nJust you: Rs ${share(1200, 1, 0).toFixed(2)}`, hidden: true },
    ],
    post: "assert per_person(100) == 50, 'per_person(100) should use people=2 by default'\nassert per_person.__doc__, 'Add a docstring'",
    requires: [{ node: "FunctionDef" }, { node: "keyword", min: 2, msg: "Call with keyword arguments: tip=10 and people=1." }],
    hints: ["return total * (1 + tip / 100) / people", 'print(f"With 10% tip: Rs {per_person(bill, people, tip=10):.2f}")'],
    solution: 'def per_person(total, people=2, tip=0):\n    """Each person\'s share of a bill, including a tip percentage."""\n    return total * (1 + tip / 100) / people\n\nbill = float(input("Bill: "))\npeople = int(input("People: "))\nprint(f"Split: Rs {per_person(bill, people):.2f}")\nprint(f"With 10% tip: Rs {per_person(bill, people, tip=10):.2f}")\nprint(f"Just you: Rs {per_person(bill, people=1):.2f}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "In def add(a, b) and the call add(2, 3), what are 2 and 3?", options: ["Parameters", "Arguments", "Returns", "Defaults"], answer: 1, explain: "Arguments are the values in the call; parameters are the names in the def." },
  { q: "What does a function return if it has no return statement?", options: ["0", "\"\"", "None", "Error"], answer: 2, explain: "That's why result = show_total() gives None." },
  { q: "What does this print?", code: "def f(x):\n    return x * 2\n    print(\"done\")\n\nprint(f(4))", options: ["8 then done", "8", "done", "None"], answer: 1, explain: "return ends the function; the print after it never runs." },
  { q: "def greet(name, msg=\"Hi\"). Which call is valid?", options: ["greet()", "greet(\"Ravi\")", "greet(msg=\"Yo\")", "greet(\"Ravi\", \"Yo\", \"!\")"], answer: 1, explain: "name has no default, so it must be given; msg can be left out." },
  { q: "Why are keyword arguments useful?", options: ["They're faster", "You can skip defaults and say which value is which, in any order", "They make variables global", "They avoid return"], answer: 1, explain: "ticket(\"Kalki\", price=200) skips seats and is self-explaining." },
  { q: "Where does a docstring go?", options: ["Above the def", "First line inside the function body", "At the end of the file", "In a comment"], answer: 1, explain: "The first string in the body becomes the function's __doc__." },
];

export default function Unit8_2(props) {
  const sections = [
    {
      label: "In & Out", kicker: "PARAMETERS · RETURN", title: "Send values in, get an answer back",
      blocks: [
        <P>Functions in 8.1 did the same thing every time. Real functions take <strong>inputs</strong> (parameters) and give back an <strong>output</strong> (the return value) — like a function in maths: f(x) = 2x.</P>,
        <CallFlow />,
        EX.area,
        EX.grade,
      ],
    },
    {
      label: "print vs return", kicker: "THE NONE TRAP", title: "Showing a value is not giving it back",
      blocks: [
        <P><code>print</code> shows a value on the screen, for a human. <code>return</code> hands it to the code that called the function, for further use. A function without <code>return</code> gives back <code>None</code>.</P>,
        EX.printret,
        EX.iseven,
        EX.firstfail,
        <KeyIdea>Let functions <strong>return</strong> results and let the caller decide whether to print them. A function that returns can be reused in calculations, conditions and other functions; one that prints can't.</KeyIdea>,
      ],
    },
    {
      label: "Defaults & Keywords", kicker: "FLEXIBLE CALLS", title: "Default values and keyword arguments",
      blocks: [
        EX.defaults,
        EX.keywords,
        EX.missing,
        <div className="fh-two" style={{ maxWidth: 840, marginTop: 14 }}>
          <CodeBlock title="you've used these already" code={'print("a", "b", sep="-")   # keyword argument\nprint("x", end="")          # end has a default: "\\n"\nround(3.14159, 2)           # ndigits has a default: none'} />
          <CodeBlock title="rules" code={"def f(a, b=2): ...   # defaults go last\nf(1)          # b = 2\nf(1, 5)       # b = 5\nf(b=5, a=1)   # keywords: any order"} />
        </div>,
      ],
    },
    {
      label: "Docstrings", kicker: "DOCUMENT IT", title: "Tell people what your function does",
      blocks: [EX.docstring],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: bill splitter",
      blocks: [<P>One function with two defaults and a docstring, called three different ways.</P>, EX.splitter],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit8_2" crumb="MODULE 8 › UNIT 8.2" title="Parameters & Return Values" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 8.3 — Scope & the Call Stack", text: "Where do a function's variables live — and where do they go when it returns?" }} />
  );
}
