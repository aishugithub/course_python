// Unit 9.4 — Capstone: The Persistent Marks Manager (rebuilt, typing-first)
// Starts from the Module 8 function-based Marks Manager. v1 load at start /
// save on exit (first run: no file) → v2 crash-proof mark input with
// try/except → v3 survive a corrupted save file → Make It: merge two files.
// Hidden checks also inspect the saved file.

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const files = (map) => "import os\n" + Object.entries(map).map(([n, c]) => (c === null ? `if os.path.exists(${JSON.stringify(n)}): os.remove(${JSON.stringify(n)})` : `with open(${JSON.stringify(n)}, "w") as _f: _f.write(${JSON.stringify(c)})`)).join("\n");

// ── Reference simulator ──
const gradeOf = (m) => (m >= 90 ? "A" : m >= 75 ? "B" : m >= 60 ? "C" : m >= 40 ? "D" : "F");
function report(pairs) {
  if (!pairs.length) return ["No students yet"];
  let total = 0, passed = 0, top = pairs[0][0], best = pairs[0][1]; const out = [];
  for (const [n, m] of pairs) { out.push(`${n}: ${m} (${gradeOf(m)})`); total += m; if (m >= 40) passed++; if (m > best) { best = m; top = n; } }
  out.push(`Average: ${(total / pairs.length).toFixed(2)}`, `Topper: ${top} (${best})`, `Passed: ${passed}/${pairs.length}`);
  return out;
}
function sim(fileText, inputs, version) {
  const out = [], data = []; let skipped = 0;
  if (fileText !== null) {
    for (const raw of fileText.split("\n")) {
      if (raw === "" ) continue;
      const parts = raw.trim().split(",");
      if (version === 3) {
        if (parts.length !== 2 || !/^-?\d+$/.test(parts[1].trim())) { skipped++; continue; }
      }
      data.push([parts[0], Number(parts[1])]);
    }
  }
  out.push(skipped ? `Loaded ${data.length} students (${skipped} bad lines skipped)` : `Loaded ${data.length} students`);
  const q = [...inputs]; const ask = (p) => { const v = q.shift(); out.push(p + v); return v; };
  for (;;) {
    out.push("1. Add  2. Report  3. Exit");
    const c = ask("Choose: ");
    if (c === "1") {
      const name = ask("Name: ").trim().toUpperCase();
      let mark;
      if (version >= 2) { for (;;) { const t = ask("Mark: "); if (/^-?\d+$/.test(t.trim()) && Number(t) >= 0 && Number(t) <= 100) { mark = Number(t); break; } out.push("Enter a whole number from 0 to 100"); } }
      else mark = Number(ask("Mark: "));
      const at = data.findIndex(([k]) => k === name);
      if (at >= 0) { data[at][1] = mark; out.push(`Updated ${name}`); } else { data.push([name, mark]); out.push(`Added ${name}`); }
    } else if (c === "2") out.push(...report(data));
    else if (c === "3") { out.push(`Saved ${data.length} students`, "Bye!"); break; }
    else out.push("Invalid choice");
  }
  return { out: out.join("\n"), file: data.map(([n, m]) => `${n},${m}\n`).join("") };
}

// ── Code pieces ──
const GRADE = 'def grade(mark):\n    if mark >= 90:\n        return "A"\n    elif mark >= 75:\n        return "B"\n    elif mark >= 60:\n        return "C"\n    elif mark >= 40:\n        return "D"\n    return "F"';
const STATS = 'def class_stats(marks):\n    total = 0\n    passed = 0\n    topper = ""\n    best = -1\n    for name, mark in marks.items():\n        total += mark\n        if mark >= 40:\n            passed += 1\n        if mark > best:\n            best = mark\n            topper = name\n    return total / len(marks), topper, best, passed';
const REPORT = 'def print_report(marks):\n    if not marks:\n        print("No students yet")\n        return\n    for name, mark in marks.items():\n        print(f"{name}: {mark} ({grade(mark)})")\n    avg, topper, best, passed = class_stats(marks)\n    print(f"Average: {avg:.2f}")\n    print(f"Topper: {topper} ({best})")\n    print(f"Passed: {passed}/{len(marks)}")';
const ADD = 'def add_student(marks, name, mark):\n    if name in marks:\n        message = f"Updated {name}"\n    else:\n        message = f"Added {name}"\n    marks[name] = mark\n    return message';
const LOAD1 = 'def load_marks(filename):\n    marks = {}\n    try:\n        with open(filename) as f:\n            for line in f:\n                name, mark = line.strip().split(",")\n                marks[name] = int(mark)\n    except FileNotFoundError:\n        pass\n    return marks';
const SAVE = 'def save_marks(marks, filename):\n    with open(filename, "w") as f:\n        for name, mark in marks.items():\n            f.write(f"{name},{mark}\\n")';
const READ_MARK = 'def read_mark():\n    while True:\n        try:\n            mark = int(input("Mark: "))\n            if 0 <= mark <= 100:\n                return mark\n        except ValueError:\n            pass\n        print("Enter a whole number from 0 to 100")';
const LOAD3 = 'def load_marks(filename):\n    marks = {}\n    skipped = 0\n    try:\n        with open(filename) as f:\n            for line in f:\n                parts = line.strip().split(",")\n                if len(parts) != 2:\n                    skipped += 1\n                    continue\n                try:\n                    marks[parts[0]] = int(parts[1])\n                except ValueError:\n                    skipped += 1\n    except FileNotFoundError:\n        pass\n    return marks, skipped';
const MAIN = (load, markExpr) => `\n\n${load}\nwhile True:\n    print("1. Add  2. Report  3. Exit")\n    choice = input("Choose: ")\n    if choice == "1":\n        name = input("Name: ").strip().upper()\n        mark = ${markExpr}\n        print(add_student(marks, name, mark))\n    elif choice == "2":\n        print_report(marks)\n    elif choice == "3":\n        save_marks(marks, "marks.txt")\n        print(f"Saved {len(marks)} students")\n        print("Bye!")\n        break\n    else:\n        print("Invalid choice")`;
const START = [GRADE, STATS, REPORT, ADD].join("\n\n") + '\n\nmarks = {}\nwhile True:\n    print("1. Add  2. Report  3. Exit")\n    choice = input("Choose: ")\n    if choice == "1":\n        name = input("Name: ").strip().upper()\n        mark = int(input("Mark: "))\n        print(add_student(marks, name, mark))\n    elif choice == "2":\n        print_report(marks)\n    elif choice == "3":\n        print("Bye!")\n        break\n    else:\n        print("Invalid choice")';
const LOADMSG1 = 'marks = load_marks("marks.txt")\nprint(f"Loaded {len(marks)} students")';
const V1 = [GRADE, STATS, REPORT, ADD, LOAD1, SAVE].join("\n\n") + MAIN(LOADMSG1, 'int(input("Mark: "))');
const V2 = [GRADE, STATS, REPORT, ADD, LOAD1, SAVE, READ_MARK].join("\n\n") + MAIN(LOADMSG1, "read_mark()");
const LOADMSG3 = 'marks, skipped = load_marks("marks.txt")\nif skipped:\n    print(f"Loaded {len(marks)} students ({skipped} bad lines skipped)")\nelse:\n    print(f"Loaded {len(marks)} students")';
const V3 = [GRADE, STATS, REPORT, ADD, LOAD3, SAVE, READ_MARK].join("\n\n") + MAIN(LOADMSG3, "read_mark()");

const F1 = "PRIYA,87\nARUN,62\n";
const fileCheck = (expected) => `with open("marks.txt") as _f:\n    _got = _f.read()\nassert _got == ${JSON.stringify(expected)}, "marks.txt should hold one NAME,MARK line per student. It holds: " + repr(_got)`;
const T1a = ["1", "meena", "91", "1", "arun", "70", "2", "3"];
const T1b = ["2", "1", "ravi", "64", "3"];
const T2a = ["1", "divya", "ninety", "150", "95", "3"];
const T3a = ["2", "3"];
const mk = (fileText, inputs, version, hidden) => {
  const s = sim(fileText, inputs, version);
  return { setup: files({ "marks.txt": fileText }), inputs, expect: s.out, hidden, post: fileCheck(s.file) };
};

const EX = {
  v1: {
    id: "v1", kind: "modify", title: "Version 1 — load at start, save on exit",
    task: <>Your Module 8 manager is below, but it forgets everything on exit. Add <code>load_marks(filename)</code>, which returns a dict read from <code>marks.txt</code> (an <strong>empty dict if the file doesn't exist</strong>), and <code>save_marks(marks, filename)</code>, which writes one <code>NAME,MARK</code> line per student. Load at the start and print <code>Loaded 2 students</code>; on Exit, save, then print <code>Saved 3 students</code> and <code>Bye!</code>.</>,
    starter: START,
    minLines: 70,
    tests: [mk(F1, T1a, 1, false), mk(null, T1b, 1, true)],
    requires: [{ node: "With", min: 2 }, { node: "Try" }],
    hints: ["load_marks: try: with open(...) as f: for line in f: … except FileNotFoundError: pass — then return marks.", 'save_marks: with open(filename, "w") as f: f.write(f"{name},{mark}\\n") for each student.', "Each test also reads marks.txt after your program ends."],
    solution: V1,
  },
  v2: {
    id: "v2", kind: "modify", title: "Version 2 — marks that can't crash it",
    task: <>Typing <code>ninety</code> still crashes the program — and loses this session's changes, because saving only happens on Exit. Write <code>read_mark()</code>: it loops with try/except until the input is a whole number from 0 to 100, printing <code>Enter a whole number from 0 to 100</code> after each bad try, and returns it.</>,
    starter: V1,
    minLines: 80,
    tests: [mk(F1, T2a, 2, false), mk(null, ["1", "x", "y", "0", "3"], 2, true)],
    requires: [{ node: "Try", min: 2 }],
    hints: ["while True: try: mark = int(input(\"Mark: \")); if 0 <= mark <= 100: return mark — except ValueError: pass — then print the message.", "Notice: the message prints for both bad text and out-of-range numbers."],
    solution: V2,
  },
  v3: {
    id: "v3", kind: "modify", title: "Version 3 — survive a corrupted file",
    task: <>Someone edited <code>marks.txt</code> by hand and broke a line (<code>RAVI;64</code>, or <code>MEENA,ninety</code>). Loading now crashes. Make <code>load_marks</code> skip bad lines and <strong>return a tuple</strong> <code>(marks, skipped)</code>; print <code>Loaded 2 students (2 bad lines skipped)</code> — or just <code>Loaded 2 students</code> when nothing was skipped. Saving rewrites a clean file.</>,
    starter: V2,
    minLines: 90,
    tests: [mk("PRIYA,87\nRAVI;64\nARUN,62\nMEENA,ninety\n", T3a, 3, false), mk(F1, ["3"], 3, true)],
    requires: [{ node: "Continue" }],
    hints: ["parts = line.strip().split(\",\"); if len(parts) != 2: skipped += 1; continue", "Wrap int(parts[1]) in its own try: a ValueError means skipped += 1.", "Unpack at the call: marks, skipped = load_marks(\"marks.txt\")"],
    solution: V3,
  },
  merge: {
    id: "merge", kind: "make", title: "Merge two mark files",
    task: <>Two teachers kept separate files: <code>teacher_a.txt</code> and <code>teacher_b.txt</code> (lines <code>NAME,MARK</code>). Write a program that reads both into one dictionary — if a student appears in both, keep the <strong>higher</strong> mark — writes <code>merged.txt</code> with the names in alphabetical order, and prints <code>Merged 4 students</code>. Use a function <code>read_file(filename)</code> that returns a dict.</>,
    minLines: 18,
    tests: [
      { setup: files({ "teacher_a.txt": "PRIYA,87\nARUN,62\n", "teacher_b.txt": "ARUN,70\nMEENA,91\nKAVYA,55\n", "merged.txt": null }), expect: "Merged 4 students",
        post: 'with open("merged.txt") as _f:\n    _g = _f.read()\nassert _g == "ARUN,70\\nKAVYA,55\\nMEENA,91\\nPRIYA,87\\n", "merged.txt should be sorted by name, keeping the higher mark: " + repr(_g)' },
      { setup: files({ "teacher_a.txt": "Z,10\n", "teacher_b.txt": "Z,5\n", "merged.txt": null }), expect: "Merged 1 students", hidden: true,
        post: 'with open("merged.txt") as _f:\n    assert _f.read() == "Z,10\\n", "keep the higher mark"' },
    ],
    requires: [{ node: "FunctionDef" }, { call: "sorted" }],
    hints: ["merged = read_file(\"teacher_a.txt\"); then for each (name, mark) of file B: if name not in merged or mark > merged[name]: merged[name] = mark", "for name in sorted(merged): write the line."],
    solution: 'def read_file(filename):\n    data = {}\n    with open(filename) as f:\n        for line in f:\n            name, mark = line.strip().split(",")\n            data[name] = int(mark)\n    return data\n\nmerged = read_file("teacher_a.txt")\nfor name, mark in read_file("teacher_b.txt").items():\n    if name not in merged or mark > merged[name]:\n        merged[name] = mark\nwith open("merged.txt", "w") as f:\n    for name in sorted(merged):\n        f.write(f"{name},{merged[name]}\\n")\nprint(f"Merged {len(merged)} students")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why does load_marks catch FileNotFoundError?", options: ["Files are unreliable", "On the very first run there is no save file yet", "To speed up loading", "Python requires it"], answer: 1, explain: "Start with an empty dict instead of crashing." },
  { q: "Why save with \"w\" rather than \"a\" on exit?", options: ["Faster", "The dict holds the full, updated data — rewrite the file from it so updates don't create duplicate lines", "\"a\" can't write", "No reason"], answer: 1, explain: "Append would add PRIYA a second time after an update." },
  { q: "What does continue do inside the loading loop?", options: ["Stops loading", "Skips the bad line and moves to the next one", "Retries the line", "Saves the file"], answer: 1, explain: "One bad line shouldn't lose all the good ones." },
  { q: "load_marks returns marks, skipped. How do you receive both?", options: ["marks = load_marks(...)", "marks, skipped = load_marks(...)", "load_marks(...)[marks]", "You can't"], answer: 1, explain: "It's a tuple; unpack it (Unit 7.4)." },
];

export default function Unit9_4(props) {
  const sections = [
    {
      label: "The Mission", kicker: "CAPSTONE", title: "The Persistent Marks Manager",
      blocks: [
        <P>Module 8's Marks Manager has two fatal flaws: type <code>ninety</code> and it crashes; close it and every mark is gone. Fix both with Module 9's tools, one version at a time:</P>,
        <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", maxWidth: 900 }}>
          {[["Remember marks between runs", "load_marks / save_marks with files", "9.3"], ["First run: no file yet", "except FileNotFoundError", "9.3"], ["Never crash on a bad mark", "read_mark with try/except + range check", "9.1, 9.2"], ["Survive a damaged file", "skip bad lines, return (marks, skipped)", "9.1, 7.4"]].map(([a, b, c], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 0.6fr", gap: 10, padding: "10px 14px", background: i % 2 ? T.surface : T.card, fontSize: 14.5 }}>
              <span>{a}</span><code style={{ justifySelf: "start" }}>{b}</code><span style={{ color: T.bronze, fontWeight: 700 }}>{c}</span>
            </div>
          ))}
        </div>,
        <Note color={T.blue} icon="🧪">Each test starts with a prepared <code>marks.txt</code> (or none), runs your program, then opens the file your program saved and checks every line.</Note>,
      ],
    },
    { label: "Version 1", kicker: "REMEMBER", title: "Version 1: load and save", blocks: [EX.v1] },
    { label: "Version 2", kicker: "NEVER CRASH", title: "Version 2: crash-proof input", blocks: [EX.v2] },
    { label: "Version 3", kicker: "SURVIVE", title: "Version 3: a damaged save file", blocks: [EX.v3, <KeyIdea>Real programs assume the outside world is messy: missing files, bad input, damaged data. Handling each case gracefully is what makes software trustworthy.</KeyIdea>] },
    { label: "Make It", kicker: "ON YOUR OWN", title: "Your program: merge two files", blocks: [EX.merge] },
  ];
  return (
    <LessonShell {...props} unitId="Unit9_4" crumb="MODULE 9 › UNIT 9.4" title="Capstone: The Persistent Marks Manager" sections={sections} quiz={QUIZ}
      next={{ title: "Module 10 — Object-Oriented Programming", text: "Module 9 complete! Next: data and behaviour, living together in classes. (Optional first: Module 9's Crucible.)" }} />
  );
}
