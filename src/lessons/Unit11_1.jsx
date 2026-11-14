// Unit 11.1 — Modules & the Ecosystem (rebuilt, typing-first)
// import / from … import / import … as → the standard library (random,
// statistics, collections.Counter, datetime) → your own module (written into
// the browser's file system by each test's setup) and the __name__ guard →
// pip & venv, and a program that checks whether a module is installed →
// Make It: a class report built from the standard library.

import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

// A test's setup writes a module file next to the learner's program and makes
// sure the next `import` reads the fresh file, not a cached one.
const moduleFile = (name, src) =>
  `import sys, importlib\nsys.modules.pop(${JSON.stringify(name)}, None)\nwith open(${JSON.stringify(name + ".py")}, "w") as _f:\n    _f.write(${JSON.stringify(src)})\nimportlib.invalidate_caches()`;
const SHOP = (tax) => `TAX = ${tax}\n\ndef with_tax(price):\n    return price * (1 + TAX)\n\ndef discount(price, percent):\n    return price - price * percent / 100\n\nif __name__ == "__main__":\n    print("shop.py self-test:", with_tax(100))\n`;

// ── Reference simulators ──
const pyNum = (x) => (Number.isInteger(x) ? String(x) : String(x)); // median of odd list stays an int
const median = (xs) => { const s = [...xs].sort((a, b) => a - b), n = s.length; return n % 2 ? pyNum(s[(n - 1) / 2]) : (() => { const m = (s[n / 2 - 1] + s[n / 2]) / 2; return Number.isInteger(m) ? m.toFixed(1) : String(m); })(); };
const mode = (xs) => { const c = new Map(); xs.forEach((x) => c.set(x, (c.get(x) || 0) + 1)); let best = xs[0]; c.forEach((v, k) => { if (v > c.get(best)) best = k; }); return best; };
const mean2 = (xs) => (xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(2);
const gradeOf = (m) => (m >= 90 ? "A" : m >= 75 ? "B" : m >= 60 ? "C" : m >= 40 ? "D" : "F");
const report = (line) => {
  const xs = line.split(" ").map(Number);
  const g = {}; xs.forEach((m) => { g[gradeOf(m)] = (g[gradeOf(m)] || 0) + 1; });
  return [`Marks: ${line}`, `Mean: ${mean2(xs)}`, `Median: ${median(xs)}`, `Most common: ${mode(xs)}`, `Grades: ${"ABCDF".split("").map((k) => `${k}=${g[k] || 0}`).join(" ")}`].join("\n");
};
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dates = (a, b) => { const t = (s) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)); return `From (YYYY-MM-DD): ${a}\nTo (YYYY-MM-DD): ${b}\nDays: ${(t(b) - t(a)) / 86400000}\nThat day is a ${DAYS[new Date(t(b)).getUTCDay()]}`; };

// Dice: the counts are random, so check the shape, the total and that each face is plausible
const diceCheck = (out) => {
  const lines = out.trim().split("\n");
  if (lines.length !== 7) return `Expected 7 lines (faces 1–6, then Total), got ${lines.length}.`;
  let sum = 0;
  for (let f = 1; f <= 6; f++) {
    const m = lines[f - 1].match(/^(\d): (\d+)$/);
    if (!m || +m[1] !== f) return `Line ${f} should look like "${f}: 97".`;
    const c = +m[2];
    if (c < 50 || c > 150) return `Face ${f} came up ${c} times out of 600 — that's not a fair die. Are you rolling inside the loop?`;
    sum += c;
  }
  if (lines[6] !== `Total: ${sum}` || sum !== 600) return `The last line should be "Total: 600" — the counts add up to ${sum}.`;
  return null;
};

const EX = {
  tour: {
    id: "tour", kind: "type", title: "Borrow some maths",
    task: <>Python ships with hundreds of <strong>modules</strong> — files of ready-made code. <code>import math</code> loads one; then <code>math.</code> reaches inside it.</>,
    show: 'import math\n\nprint(math.sqrt(49))\nprint(math.pi)\nprint(math.ceil(4.2), math.floor(4.8))\nprint(math.gcd(18, 24))',
    tests: [{ expect: "7.0\n3.141592653589793\n5 4\n6" }],
    requires: [{ node: "Import" }],
    hints: ["The dot means “inside”: math.sqrt is the sqrt that lives in the math module."],
    solution: 'import math\n\nprint(math.sqrt(49))\nprint(math.pi)\nprint(math.ceil(4.2), math.floor(4.8))\nprint(math.gcd(18, 24))',
  },
  fromfix: {
    id: "fromfix", kind: "fix", title: "Bring a name in directly",
    task: <>This program imports <code>math</code> but then writes plain <code>pi</code>, so Python can't find it. Fix it with the other form: <code>from math import pi</code> brings the name <code>pi</code> straight into your program (no <code>math.</code> needed). Use that form, not <code>math.pi</code>.</>,
    starter: 'import math\n\nr = float(input("Radius: "))\nprint(f"Area: {pi * r ** 2:.2f}")',
    tests: [{ inputs: ["2"], expect: "Radius: 2\nArea: 12.57" }, { inputs: ["0.5"], expect: "Radius: 0.5\nArea: 0.79", hidden: true }],
    requires: [{ node: "ImportFrom", msg: "Use the form: from math import pi" }],
    forbids: [{ text: "math.pi", msg: "Use from math import pi, then plain pi." }],
    hints: ["Replace the first line with: from math import pi"],
    solution: 'from math import pi\n\nr = float(input("Radius: "))\nprint(f"Area: {pi * r ** 2:.2f}")',
  },
  alias: {
    id: "alias", kind: "write", title: "A short nickname",
    task: <>The third form gives a module a nickname: <code>import math as m</code>, then <code>m.sqrt(…)</code>. (You'll see <code>import pandas as pd</code> everywhere in Module 12.) Ask <code>Side a: </code> and <code>Side b: </code> and print the hypotenuse √(a² + b²) as <code>Hypotenuse: 5.00</code>, using the nickname.</>,
    tests: [{ inputs: ["3", "4"], expect: "Side a: 3\nSide b: 4\nHypotenuse: 5.00" }, { inputs: ["5", "12"], expect: "Side a: 5\nSide b: 12\nHypotenuse: 13.00", hidden: true }, { inputs: ["1", "1"], expect: "Side a: 1\nSide b: 1\nHypotenuse: 1.41", hidden: true }],
    validate: (code) => (/^\s*import\s+math\s+as\s+\w+/m.test(code) ? null : "Import math with a nickname: import math as m"),
    hints: ["import math as m", 'print(f"Hypotenuse: {m.sqrt(a ** 2 + b ** 2):.2f}")'],
    solution: 'import math as m\n\na = float(input("Side a: "))\nb = float(input("Side b: "))\nprint(f"Hypotenuse: {m.sqrt(a ** 2 + b ** 2):.2f}")',
  },
  dice: {
    id: "dice", kind: "write", title: "600 dice rolls",
    task: <>You met <code>random</code> in the guessing game (6.4). Roll a die 600 times with <code>random.randint(1, 6)</code>, count how often each face comes up (a dictionary or a list of counts), then print <code>1: 97</code> … <code>6: 104</code> and <code>Total: 600</code>. Each face should come up roughly 100 times — run it twice and watch the numbers change.</>,
    tests: [{ check: diceCheck }, { check: diceCheck, hidden: true }],
    requires: [{ call: "randint", msg: "Roll with random.randint(1, 6)." }, { node: "For" }],
    hints: ["counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}", "for _ in range(600): counts[random.randint(1, 6)] += 1", 'for face in range(1, 7): print(f"{face}: {counts[face]}")'],
    solution: 'import random\n\ncounts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}\nfor _ in range(600):\n    counts[random.randint(1, 6)] += 1\n\nfor face in range(1, 7):\n    print(f"{face}: {counts[face]}")\nprint(f"Total: {sum(counts.values())}")',
  },
  stats: {
    id: "stats", kind: "write", title: "The statistics module",
    task: <><code>import statistics</code> gives you <code>statistics.mean</code>, <code>median</code> and <code>mode</code> (most common value). Ask <code>Marks: </code> (numbers on one line), then print <code>Mean: 78.00</code>, <code>Median: 85</code>, <code>Mode: 85</code>. Notice what median does with an even number of marks.</>,
    tests: [
      { inputs: ["70 85 85 60 90"], expect: "Marks: 70 85 85 60 90\nMean: 78.00\nMedian: 85\nMode: 85" },
      { inputs: ["40 50 60 70"], expect: "Marks: 40 50 60 70\nMean: 55.00\nMedian: 55.0\nMode: 40", hidden: true, why: "With an even count, the median is the average of the middle two — and with no repeats, mode returns the first value." },
    ],
    requires: [{ call: "mean" }, { call: "median" }, { call: "mode" }],
    forbids: [{ call: "sum", msg: "Let the statistics module do the work." }],
    hints: ['marks = [int(x) for x in input("Marks: ").split()]', 'print(f"Mean: {statistics.mean(marks):.2f}")', "Print median and mode as they come — no formatting."],
    solution: 'import statistics\n\nmarks = [int(x) for x in input("Marks: ").split()]\nprint(f"Mean: {statistics.mean(marks):.2f}")\nprint(f"Median: {statistics.median(marks)}")\nprint(f"Mode: {statistics.mode(marks)}")',
  },
  counter: {
    id: "counter", kind: "write", title: "Counting made easy",
    task: <>Back in 7.4 you counted words with a dictionary loop. <code>from collections import Counter</code> does it in one call: <code>Counter(words)</code> counts everything, and <code>.most_common(3)</code> gives the top three as (word, count) pairs. Ask <code>Text: </code> and print the top three as <code>the: 3</code>.</>,
    tests: [
      { inputs: ["the cat and the dog and the bird"], expect: "Text: the cat and the dog and the bird\nthe: 3\nand: 2\ncat: 1" },
      { inputs: ["a b a c b a"], expect: "Text: a b a c b a\na: 3\nb: 2\nc: 1", hidden: true },
      { inputs: ["hi hi"], expect: "Text: hi hi\nhi: 2", hidden: true, why: "most_common(3) gives fewer than three when there are fewer words — loop over what it returns." },
    ],
    requires: [{ call: "Counter" }, { call: "most_common" }],
    hints: ["counts = Counter(text.split())", 'for word, n in counts.most_common(3): print(f"{word}: {n}")'],
    solution: 'from collections import Counter\n\ntext = input("Text: ")\ncounts = Counter(text.split())\nfor word, n in counts.most_common(3):\n    print(f"{word}: {n}")',
  },
  dates: {
    id: "dates", kind: "write", title: "Days until…",
    task: <><code>from datetime import date</code>. <code>date.fromisoformat("2026-12-25")</code> turns text into a date; subtracting two dates gives a gap whose <code>.days</code> is a number; <code>d.strftime("%A")</code> is the day's name. Ask <code>From (YYYY-MM-DD): </code> and <code>To (YYYY-MM-DD): </code>, then print <code>Days: 42</code> and <code>That day is a Friday</code> (the weekday of the second date).</>,
    tests: [{ inputs: ["2026-11-13", "2026-12-25"], expect: dates("2026-11-13", "2026-12-25") }, { inputs: ["2026-01-01", "2026-03-01"], expect: dates("2026-01-01", "2026-03-01"), hidden: true }, { inputs: ["2024-02-28", "2024-03-01"], expect: dates("2024-02-28", "2024-03-01"), hidden: true, why: "2024 is a leap year — let datetime count the days, don't do it yourself." }],
    requires: [{ call: "fromisoformat", min: 2 }, { call: "strftime" }],
    hints: ['start = date.fromisoformat(input("From (YYYY-MM-DD): "))', "gap = end - start, then gap.days", 'end.strftime("%A")'],
    solution: 'from datetime import date\n\nstart = date.fromisoformat(input("From (YYYY-MM-DD): "))\nend = date.fromisoformat(input("To (YYYY-MM-DD): "))\nprint(f"Days: {(end - start).days}")\nprint(f"That day is a {end.strftime(\'%A\')}")',
  },
  usemod: {
    id: "usemod", kind: "write", title: "Import your own module",
    task: <>Any <code>.py</code> file is a module. A file <code>shop.py</code> sits next to your program (shown below). Import it and use its <code>TAX</code>, <code>discount()</code> and <code>with_tax()</code>. Ask <code>Price: </code> and <code>Discount %: </code>, then print <code>Tax rate: 18%</code>, <code>After discount: 90.00</code>, <code>With tax: 106.20</code>. Don't copy the numbers in — the shop may change its tax rate. Notice that shop.py's self-test line does not print.</>,
    show: SHOP(0.18), showLabel: "shop.py — ALREADY IN THE FOLDER",
    tests: [
      { setup: moduleFile("shop", SHOP(0.18)), inputs: ["100", "10"], expect: "Price: 100\nDiscount %: 10\nTax rate: 18%\nAfter discount: 90.00\nWith tax: 106.20" },
      { setup: moduleFile("shop", SHOP(0.05)), inputs: ["100", "10"], expect: "Price: 100\nDiscount %: 10\nTax rate: 5%\nAfter discount: 90.00\nWith tax: 94.50", hidden: true, why: "Here shop.py has TAX = 0.05 — use shop.TAX and shop.with_tax, don't type 0.18 yourself." },
      { setup: moduleFile("shop", SHOP(0.18)), inputs: ["250", "0"], expect: "Price: 250\nDiscount %: 0\nTax rate: 18%\nAfter discount: 250.00\nWith tax: 295.00", hidden: true },
    ],
    validate: (code) => (/^\s*(import\s+shop|from\s+shop\s+import)/m.test(code) ? (/0\.18|\b18\b/.test(code) ? "Don't type the tax rate — read it from the module (shop.TAX)." : null) : "Import the module: import shop"),
    hints: ["import shop — then shop.TAX, shop.discount(price, pct), shop.with_tax(p)", 'print(f"Tax rate: {shop.TAX * 100:.0f}%")'],
    solution: 'import shop\n\nprice = float(input("Price: "))\npct = float(input("Discount %: "))\nafter = shop.discount(price, pct)\nprint(f"Tax rate: {shop.TAX * 100:.0f}%")\nprint(f"After discount: {after:.2f}")\nprint(f"With tax: {shop.with_tax(after):.2f}")',
  },
  guard: {
    id: "guard", kind: "fix", title: "The __name__ guard",
    task: <>This is <code>temperature.py</code>. Its last three lines test the functions — useful while writing it, but when another program does <code>import temperature</code>, they'd print every time. Python sets <code>__name__</code> to <code>"__main__"</code> only when a file is run directly. Move the test lines under <code>if __name__ == "__main__":</code> so they run only then (here, they still print).</>,
    starter: 'def c_to_f(c):\n    return c * 9 / 5 + 32\n\ndef f_to_c(f):\n    return (f - 32) * 5 / 9\n\nprint("Testing...")\nprint(c_to_f(100))\nprint(f_to_c(32))',
    tests: [{ expect: "Testing...\n212.0\n0.0" }],
    post: "assert c_to_f(0) == 32 and f_to_c(212) == 100",
    validate: (code) => {
      if (!/^if\s+__name__\s*==\s*["']__main__["']\s*:/m.test(code)) return 'Add the guard line: if __name__ == "__main__":';
      if (/^print\(/m.test(code)) return "Every test print must be indented under the guard.";
      return null;
    },
    hints: ['if __name__ == "__main__":', "Indent the three print lines under it."],
    solution: 'def c_to_f(c):\n    return c * 9 / 5 + 32\n\ndef f_to_c(f):\n    return (f - 32) * 5 / 9\n\nif __name__ == "__main__":\n    print("Testing...")\n    print(c_to_f(100))\n    print(f_to_c(32))',
  },
  installed: {
    id: "installed", kind: "write", title: "Is it installed?",
    task: <><code>import importlib</code>; <code>importlib.import_module(name)</code> imports a module whose name is in a variable. If it isn't installed, Python raises <code>ModuleNotFoundError</code> (Module 9: catch it!). Ask <code>Module: </code> and print <code>math is installed</code> — or <code>fancytables is missing - run: pip install fancytables</code>.</>,
    tests: [
      { inputs: ["math"], expect: "Module: math\nmath is installed" },
      { inputs: ["fancytables"], expect: "Module: fancytables\nfancytables is missing - run: pip install fancytables" },
      { inputs: ["statistics"], expect: "Module: statistics\nstatistics is installed", hidden: true },
    ],
    requires: [{ node: "Try" }, { call: "import_module" }],
    hints: ["try: importlib.import_module(name) … except ModuleNotFoundError: …", 'Print the success message inside try, after the import line.'],
    solution: 'import importlib\n\nname = input("Module: ")\ntry:\n    importlib.import_module(name)\n    print(f"{name} is installed")\nexcept ModuleNotFoundError:\n    print(f"{name} is missing - run: pip install {name}")',
  },
  report: {
    id: "report", kind: "make", title: "Class report, batteries included",
    task: <>Ask <code>Marks: </code> (one line). Using <code>statistics</code> and <code>Counter</code>, print <code>Mean: 64.00</code>, <code>Median: 69.5</code>, <code>Most common: 78</code>, and a grade count for <strong>every</strong> grade A–F (A ≥ 90, B ≥ 75, C ≥ 60, D ≥ 40, else F): <code>Grades: A=1 B=2 C=1 D=1 F=1</code>. Tip: a Counter says 0 for a key it has never seen.</>,
    minLines: 14,
    tests: [{ inputs: ["92 78 45 78 30 61"], expect: report("92 78 45 78 30 61") }, { inputs: ["95 95 88"], expect: report("95 95 88"), hidden: true, why: "Grades nobody got must still appear, as =0." }, { inputs: ["40 39"], expect: report("40 39"), hidden: true, why: "Exactly 40 is a D, 39 is an F." }],
    requires: [{ call: "mean" }, { call: "median" }, { call: "Counter" }, { node: "FunctionDef", msg: "Write a grade(mark) function." }],
    hints: ["def grade(m): with if/elif returning letters (5.2)", "grades = Counter(grade(m) for m in marks)", 'print("Grades:", " ".join(f"{g}={grades[g]}" for g in "ABCDF"))'],
    solution: 'import statistics\nfrom collections import Counter\n\ndef grade(m):\n    if m >= 90:\n        return "A"\n    elif m >= 75:\n        return "B"\n    elif m >= 60:\n        return "C"\n    elif m >= 40:\n        return "D"\n    return "F"\n\nmarks = [int(x) for x in input("Marks: ").split()]\nprint(f"Mean: {statistics.mean(marks):.2f}")\nprint(f"Median: {statistics.median(marks)}")\nprint(f"Most common: {statistics.mode(marks)}")\ngrades = Counter(grade(m) for m in marks)\nprint("Grades:", " ".join(f"{g}={grades[g]}" for g in "ABCDF"))',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "After from math import sqrt, how do you call it?", options: ["math.sqrt(9)", "sqrt(9)", "import.sqrt(9)", "math(sqrt, 9)"], answer: 1, explain: "from … import brings the name itself into your program." },
  { q: "What does import pandas as pd do?", options: ["Renames the file", "Imports pandas and lets you call it pd", "Installs pandas", "Imports only pd"], answer: 1, explain: "A nickname: pd.DataFrame instead of pandas.DataFrame." },
  { q: "When is __name__ equal to \"__main__\"?", options: ["Always", "When the file is run directly, not imported", "When it's imported", "Inside functions"], answer: 1, explain: "Imported, __name__ is the module's own name — so guarded test code stays quiet." },
  { q: "What does pip do?", options: ["Runs Python", "Downloads and installs packages from PyPI", "Creates variables", "Checks syntax"], answer: 1, explain: "pip install pandas fetches pandas from the Python Package Index." },
  { q: "Why use a virtual environment (venv)?", options: ["It's faster", "Each project gets its own packages and versions, without clashing", "It's required to run Python", "It hides code"], answer: 1, explain: "Project A can use pandas 1.x and project B pandas 2.x side by side." },
];

export default function Unit11_1(props) {
  const sections = [
    { label: "import", kicker: "THREE FORMS", title: "Borrowing code: import", blocks: [
      <P>Nobody writes everything from scratch. A <strong>module</strong> is a file of Python code you can borrow; a <strong>package</strong> is a folder of modules. There are three ways to import:</P>,
      <CodeBlock title="three forms" code={'import math              # use as math.sqrt(2)\nfrom math import sqrt    # use as sqrt(2)\nimport math as m         # use as m.sqrt(2)'} />,
      EX.tour, EX.fromfix, EX.alias,
    ] },
    { label: "Batteries", kicker: "THE STANDARD LIBRARY", title: "Batteries included", blocks: [
      <P>Python's <strong>standard library</strong> comes with every installation — no downloads. Four you'll use constantly: <code>random</code>, <code>statistics</code>, <code>collections</code> and <code>datetime</code>.</P>,
      EX.dice, EX.stats, EX.counter, EX.dates,
      <KeyIdea>Before writing a tricky loop, ask: is this already in the standard library? Counting, averages, dates, random choices — almost always, yes.</KeyIdea>,
    ] },
    { label: "Your Modules", kicker: "ANY .py FILE", title: "Your own modules", blocks: [
      <P>Split a big program into files: put related functions in <code>shop.py</code>, then <code>import shop</code> from any program in the same folder. Python runs the module once, the first time it's imported.</P>,
      EX.usemod, EX.guard,
    ] },
    { label: "pip & venv", kicker: "THE ECOSYSTEM", title: "pip, PyPI and virtual environments", blocks: [
      <P>Beyond the standard library are over 500,000 packages on <strong>PyPI</strong> (the Python Package Index) — pandas, matplotlib, Django… On your own computer, <code>pip</code> downloads them. Each project should get its own <strong>virtual environment</strong>, so its packages don't clash with another project's.</P>,
      <div className="fh-two">
        <CodeBlock title="Windows (cmd / PowerShell)" code={'python -m venv env\nenv\\Scripts\\activate\npip install pandas matplotlib\npip list\ndeactivate'} />
        <CodeBlock title="macOS / Linux" code={'python3 -m venv env\nsource env/bin/activate\npip install pandas matplotlib\npip list\ndeactivate'} />
      </div>,
      <Note color={T.blue} icon="💡">In this course, Python runs inside your browser, and packages like pandas load automatically the first time you import them. Google Colab works the same way. On your own laptop, use the commands above.</Note>,
      EX.installed,
    ] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: class report", blocks: [EX.report] },
  ];
  return (
    <LessonShell {...props} unitId="Unit11_1" crumb="MODULE 11 › 1" title="Modules & the Ecosystem" sections={sections} quiz={QUIZ}
      next={{ title: "11.2 — Pythonic Python", text: "Comprehensions, lambda and sorted(key=…): say more with less code." }} />
  );
}
