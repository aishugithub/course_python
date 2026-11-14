// Unit 9.3 — Files: Making Data Survive (rebuilt, typing-first)
// Write and read with `with open`, "w" vs "a", the missing "\n" bug,
// appending records, reading CSV-style lines with strip/split,
// FileNotFoundError, and an expense log (mini-project Track A seed).
// Every test's `setup` creates or deletes the files it needs (Pyodide's
// file system persists between runs).

import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const files = (map) => "import os\n" + Object.entries(map).map(([n, c]) => (c === null ? `if os.path.exists(${JSON.stringify(n)}): os.remove(${JSON.stringify(n)})` : `with open(${JSON.stringify(n)}, "w") as _f: _f.write(${JSON.stringify(c)})`)).join("\n");
const MARKS = "PRIYA,87\nARUN,62\nMEENA,91\n";
const expense = (start, cat, amt) => {
  const rows = (start + `${cat},${amt}\n`).trim().split("\n").map((l) => l.split(","));
  const tot = new Map(); let all = 0;
  rows.forEach(([c, a]) => { tot.set(c, (tot.get(c) || 0) + Number(a)); all += Number(a); });
  return [`Category: ${cat}`, `Amount: ${amt}`, ...[...tot].map(([c, v]) => `${c}: Rs ${v}`), `Total: Rs ${all}`].join("\n");
};

const EX = {
  roundtrip: {
    id: "roundtrip", kind: "type", title: "Write a file, read it back",
    task: <><code>with open(name, mode) as f:</code> opens a file and closes it automatically at the end of the block. Mode <code>"w"</code> writes; no mode means read. <code>write</code> does <strong>not</strong> add a newline — you do.</>,
    show: 'with open("names.txt", "w") as f:\n    f.write("Priya\\n")\n    f.write("Arun\\n")\n\nwith open("names.txt") as f:\n    text = f.read()\nprint(text)',
    tests: [{ setup: files({ "names.txt": null }), expect: "Priya\nArun" }],
    hints: ["Inside quotes, \\n is the newline character (Unit 4.5)."],
    solution: 'with open("names.txt", "w") as f:\n    f.write("Priya\\n")\n    f.write("Arun\\n")\n\nwith open("names.txt") as f:\n    text = f.read()\nprint(text)',
  },
  modes: {
    id: "modes", kind: "type", title: '"w" erases, "a" appends',
    task: <>Predict the final file before running. Opening with <code>"w"</code> empties the file first — a classic way to lose data.</>,
    show: 'with open("log.txt", "w") as f:\n    f.write("first\\n")\nwith open("log.txt", "w") as f:\n    f.write("second\\n")\nwith open("log.txt", "a") as f:\n    f.write("third\\n")\n\nwith open("log.txt") as f:\n    print(f.read())',
    tests: [{ setup: files({ "log.txt": null }), expect: "second\nthird" }],
    hints: ["The second \"w\" wiped out \"first\"."],
    solution: 'with open("log.txt", "w") as f:\n    f.write("first\\n")\nwith open("log.txt", "w") as f:\n    f.write("second\\n")\nwith open("log.txt", "a") as f:\n    f.write("third\\n")\n\nwith open("log.txt") as f:\n    print(f.read())',
  },
  newline: {
    id: "newline", kind: "fix", title: "Everything on one line",
    task: <>This saves three names, then counts the lines in the file. Run it: one line, not three. Fix the write.</>,
    starter: 'names = ["Priya", "Arun", "Meena"]\nwith open("class.txt", "w") as f:\n    for name in names:\n        f.write(name)\n\ncount = 0\nwith open("class.txt") as f:\n    for line in f:\n        count += 1\nprint("Lines:", count)',
    tests: [{ setup: files({ "class.txt": null }), expect: "Lines: 3" }],
    hints: ['f.write(name + "\\n")'],
    solution: 'names = ["Priya", "Arun", "Meena"]\nwith open("class.txt", "w") as f:\n    for name in names:\n        f.write(name + "\\n")\n\ncount = 0\nwith open("class.txt") as f:\n    for line in f:\n        count += 1\nprint("Lines:", count)',
  },
  append: {
    id: "append", kind: "write", title: "Add a record",
    task: <><code>marks.txt</code> already holds lines like <code>PRIYA,87</code>. Ask <code>Name: </code> (store in capitals) and <code>Mark: </code> and <strong>append</strong> <code>NAME,MARK</code> as a new line. Then read the whole file and print every record as <code>PRIYA - 87</code>, then <code>Records: 4</code>. (<code>for line in f</code> gives each line with its <code>\n</code> — use <code>.strip()</code>, then <code>.split(",")</code>.)</>,
    minLines: 10,
    tests: [
      { setup: files({ "marks.txt": MARKS }), inputs: ["ravi", "64"], expect: "Name: ravi\nMark: 64\nPRIYA - 87\nARUN - 62\nMEENA - 91\nRAVI - 64\nRecords: 4" },
      { setup: files({ "marks.txt": "A,1\n" }), inputs: ["b", "2"], expect: "Name: b\nMark: 2\nA - 1\nB - 2\nRecords: 2", hidden: true },
    ],
    post: 'with open("marks.txt") as _f:\n    assert _f.read().endswith("\\n"), "Every record should end with a newline"',
    requires: [{ text: '"a"', msg: 'Open the file with mode "a" so the old records stay.' }],
    hints: ['with open("marks.txt", "a") as f: f.write(f"{name},{mark}\\n")', 'name, mark = line.strip().split(",") — unpacking from Unit 7.4.'],
    solution: 'name = input("Name: ").upper()\nmark = input("Mark: ")\nwith open("marks.txt", "a") as f:\n    f.write(f"{name},{mark}\\n")\n\ncount = 0\nwith open("marks.txt") as f:\n    for line in f:\n        n, m = line.strip().split(",")\n        print(f"{n} - {m}")\n        count += 1\nprint(f"Records: {count}")',
  },
  analyse: {
    id: "analyse", kind: "write", title: "Read a data file",
    task: <>Read <code>marks.txt</code> (lines like <code>PRIYA,87</code>) into a dictionary and print <code>Students: 3</code>, <code>Average: 80.00</code> and <code>Topper: MEENA (91)</code>. The data comes from the file now, not from input().</>,
    tests: [
      { setup: files({ "marks.txt": MARKS }), expect: "Students: 3\nAverage: 80.00\nTopper: MEENA (91)" },
      { setup: files({ "marks.txt": "X,10\nY,30\n" }), expect: "Students: 2\nAverage: 20.00\nTopper: Y (30)", hidden: true },
    ],
    hints: ["for line in f: name, mark = line.strip().split(\",\"); marks[name] = int(mark)", "Then the best-so-far loop from Unit 7.3."],
    solution: 'marks = {}\nwith open("marks.txt") as f:\n    for line in f:\n        name, mark = line.strip().split(",")\n        marks[name] = int(mark)\ntop = ""\nbest = -1\nfor name, mark in marks.items():\n    if mark > best:\n        best = mark\n        top = name\nprint(f"Students: {len(marks)}")\nprint(f"Average: {sum(marks.values()) / len(marks):.2f}")\nprint(f"Topper: {top} ({best})")',
  },
  csvmod: {
    id: "csvmod", kind: "type", title: "Let the csv module split the line",
    task: <><code>marks.csv</code> starts with a heading line <code>name,mark</code>, and one name is written as <code>"KUMAR, ARUN"</code>, with a comma inside the quotes. <code>split(",")</code> would cut that name in two. Python's <code>csv</code> module knows the rules of such files. <code>next(rows)</code> skips the heading line.</>,
    show: 'import csv\n\ntotal = 0\nwith open("marks.csv", newline="") as f:\n    rows = csv.reader(f)\n    next(rows)\n    for name, mark in rows:\n        print(name, "->", mark)\n        total += int(mark)\nprint("Total:", total)',
    tests: [
      { setup: files({ "marks.csv": 'name,mark\nPRIYA,87\n"KUMAR, ARUN",62\nMEENA,91\n' }), expect: "PRIYA -> 87\nKUMAR, ARUN -> 62\nMEENA -> 91\nTotal: 240" },
      { setup: files({ "marks.csv": 'name,mark\n"D, RAVI",10\nSITA,30\n' }), expect: "D, RAVI -> 10\nSITA -> 30\nTotal: 40", hidden: true },
    ],
    requires: [{ call: "reader", msg: "Read the rows with csv.reader(f)." }],
    hints: ["Each row arrives as a list of text items: ['PRIYA', '87'].", "mark is still text; int(mark) before adding."],
    solution: 'import csv\n\ntotal = 0\nwith open("marks.csv", newline="") as f:\n    rows = csv.reader(f)\n    next(rows)\n    for name, mark in rows:\n        print(name, "->", mark)\n        total += int(mark)\nprint("Total:", total)',
  },
  missing: {
    id: "missing", kind: "fix", title: "The first run has no file",
    task: <>The very first time a program runs, its save file doesn't exist yet. Run it (the test deletes the file first) and read the coach. Catch <code>FileNotFoundError</code> and print <code>No saved data yet</code>; when the file exists, print its contents as before.</>,
    starter: 'with open("save.txt") as f:\n    print(f.read())',
    tests: [
      { setup: files({ "save.txt": null }), expect: "No saved data yet" },
      { setup: files({ "save.txt": "level 3\n" }), expect: "level 3", hidden: true },
    ],
    requires: [{ node: "Try" }],
    hints: ["try: … the with block … except FileNotFoundError: print(\"No saved data yet\")"],
    solution: 'try:\n    with open("save.txt") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print("No saved data yet")',
  },
  expenses: {
    id: "expenses", kind: "make", title: "Expense log",
    task: <><code>expenses.txt</code> holds lines like <code>food,120</code>. Ask <code>Category: </code> and <code>Amount: </code>, append the new expense, then read the whole file and print the total per category (in the order first seen) as <code>food: Rs 210</code>, then <code>Total: Rs 520</code>. If the file doesn't exist yet, appending creates it. (This is the core of mini-project Track A.)</>,
    minLines: 14,
    tests: [
      { setup: files({ "expenses.txt": "food,120\ntravel,200\nfood,90\n" }), inputs: ["books", "110"], expect: expense("food,120\ntravel,200\nfood,90\n", "books", 110) },
      { setup: files({ "expenses.txt": null }), inputs: ["tea", "15"], expect: expense("", "tea", 15), hidden: true },
    ],
    requires: [{ text: '"a"' }, { call: "get", msg: "Total per category with totals.get(cat, 0) + amount (Unit 7.5)." }],
    hints: ["Append first, then read — so the new expense is included.", "totals[cat] = totals.get(cat, 0) + int(amount)"],
    solution: 'cat = input("Category: ")\namount = input("Amount: ")\nwith open("expenses.txt", "a") as f:\n    f.write(f"{cat},{amount}\\n")\n\ntotals = {}\nwith open("expenses.txt") as f:\n    for line in f:\n        c, a = line.strip().split(",")\n        totals[c] = totals.get(c, 0) + int(a)\nfor c, t in totals.items():\n    print(f"{c}: Rs {t}")\nprint(f"Total: Rs {sum(totals.values())}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Where do variables live, and what happens when the program ends?", options: ["On disk; kept", "In RAM; gone", "In the file; kept", "In RAM; kept"], answer: 1, explain: "RAM is cleared when the program stops. Files on disk survive." },
  { q: "What does opening an existing file with \"w\" do?", options: ["Adds to the end", "Erases it first", "Reads it", "Error"], answer: 1, explain: "\"w\" starts fresh; use \"a\" to keep existing content." },
  { q: "Why use with open(...) as f:?", options: ["Faster", "The file is closed automatically, even if an error happens", "Required for reading", "It creates a backup"], answer: 1, explain: "It's try/finally built in." },
  { q: "line is \"ARUN,62\\n\". What does line.strip().split(\",\") give?", options: ["['ARUN', '62\\n']", "['ARUN', '62']", "['ARUN,62']", "('ARUN', 62)"], answer: 1, explain: "strip removes the newline; split cuts at the comma. Both pieces are still text." },
  { q: "Reading a file that doesn't exist raises…", options: ["ValueError", "KeyError", "FileNotFoundError", "Nothing"], answer: 2, explain: "Catch it to handle the first run gracefully." },
];

export default function Unit9_3(props) {
  const sections = [
    {
      label: "Write & Read", kicker: "MAKING DATA SURVIVE", title: "Files remember",
      blocks: [
        <P>Every program so far forgot everything when it ended: variables live in RAM, which is cleared. A <strong>file</strong> lives on disk and survives. Three modes cover most needs:</P>,
        <div style={{ maxWidth: 760 }}><CodeBlock title="modes" code={'open("data.txt", "w")   # write: create or ERASE, then write\nopen("data.txt", "a")   # append: add to the end\nopen("data.txt")        # read (mode "r" is the default)'} /></div>,
        EX.roundtrip, EX.modes, EX.newline,
      ],
    },
    { label: "Records", kicker: "ONE LINE PER RECORD", title: "Saving and reading records", blocks: [EX.append, EX.analyse, <P>Files of comma-separated values are so common they have a name, <strong>CSV</strong>, and spreadsheets save them. Splitting on commas yourself works until a value contains a comma. The standard library's <code>csv</code> module handles that for you:</P>, EX.csvmod, <KeyIdea>Write: <code>f"{"{name}"},{"{mark}"}\n"</code>. Read: <code>line.strip().split(",")</code>, then convert. The file only holds text.</KeyIdea>] },
    { label: "Missing Files", kicker: "THE FIRST RUN", title: "When the file isn't there yet", blocks: [EX.missing, <Note color={T.blue} icon="🗂️">Real CSV data can contain commas inside values. Python's <code>csv</code> module handles that — you'll meet it with Pandas in Module 12.</Note>] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: expense log", blocks: [EX.expenses] },
  ];
  return (
    <LessonShell {...props} unitId="Unit9_3" crumb="MODULE 9 › UNIT 9.3" title="Files: Making Data Survive" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 9.4 — Capstone: The Persistent Marks Manager", text: "Close the program, open it again — the marks are still there." }} />
  );
}
