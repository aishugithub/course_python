// Unit CT1.4 — Patterns & Nested Loops (rebuilt, typing-first)
// Row-by-row thinking: what does row i contain? Inverted triangle, right-
// aligned triangle (spaces + stars), Floyd's triangle (a counter that survives
// rows), aligned tables with {x:4}, hollow square, number pyramid.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const comments = (min) => ({ text: "#", min, msg: `Write the row rule first, as at least ${min} # comment lines.` });

// ── Widget: describe row i, see the pattern ──
const PATTERNS = {
  "inverted": { rule: "row i (1…n): n − i + 1 stars", f: (n) => Array.from({ length: n }, (_, k) => "*".repeat(n - k)) },
  "right": { rule: "row i: n − i spaces, then i stars", f: (n) => Array.from({ length: n }, (_, k) => " ".repeat(n - k - 1) + "*".repeat(k + 1)) },
  "floyd": { rule: "row i: the next i numbers of a counter that never resets", f: (n) => { let c = 1; return Array.from({ length: n }, (_, k) => Array.from({ length: k + 1 }, () => c++).join(" ")); } },
  "hollow": { rule: "border cell → *, inside → space", f: (n) => Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => (r === 0 || r === n - 1 || c === 0 || c === n - 1 ? "*" : " ")).join("")) },
};
function PatternLab() {
  const [p, setP] = useState("right");
  const [n, setN] = useState(5);
  return (
    <div className="fh-two">
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Object.keys(PATTERNS).map((k) => <button key={k} onClick={() => setP(k)} style={{ padding: "7px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, border: `1.5px solid ${p === k ? T.navy : T.border}`, background: p === k ? T.navy : T.card, color: p === k ? "#fff" : T.text }}>{k}</button>)}
        </div>
        <label style={{ display: "block", fontFamily: CODE_FONT, marginTop: 10 }}>n = <strong>{n}</strong><input type="range" min={2} max={8} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: T.navy }} /></label>
        <div style={{ background: tint(T.purple, "0E"), border: `1px solid ${tint(T.purple, "44")}`, borderRadius: 10, padding: "10px 12px", fontSize: 14.5, color: T.slate }}><strong>Row rule:</strong> {PATTERNS[p].rule}</div>
      </div>
      <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 16, lineHeight: 1.45, background: T.termBg, color: T.termText, borderRadius: 10, padding: "12px 16px", minHeight: 170 }}>{PATTERNS[p].f(n).join("\n")}</pre>
    </div>
  );
}

const rows = (n, f) => Array.from({ length: n }, (_, k) => f(k + 1)).join("\n");
const floyd = (n) => { let c = 1; return rows(n, (i) => Array.from({ length: i }, () => c++).join(" ")); };
const pyramid = (n) => rows(n, (i) => " ".repeat(n - i) + Array.from({ length: i }, (_, k) => k + 1).join("") + Array.from({ length: i - 1 }, (_, k) => i - 1 - k).join(""));
const table = (n) => rows(n, (r) => Array.from({ length: n }, (_, c) => String(r * (c + 1)).padStart(4)).join(""));

const EX = {
  inverted: {
    id: "inverted", kind: "write", title: "Inverted triangle",
    task: <>Ask <code>Rows: </code>. Row 1 has n stars, row 2 has n − 1, … the last row has 1. Write the row rule as comments first. (<code>"*" * k</code> is allowed now.)</>,
    tests: [{ inputs: ["4"], expect: "Rows: 4\n" + rows(4, (i) => "*".repeat(5 - i)) }, { inputs: ["1"], expect: "Rows: 1\n*", hidden: true }, { inputs: ["6"], expect: "Rows: 6\n" + rows(6, (i) => "*".repeat(7 - i)), hidden: true }],
    requires: [comments(2), { node: "For" }],
    hints: ["for i in range(n, 0, -1): print(\"*\" * i)"],
    solution: '# row rule: start with n stars and go down to 1\n# so loop i from n down to 1 and print i stars\nn = int(input("Rows: "))\nfor i in range(n, 0, -1):\n    print("*" * i)',
  },
  right: {
    id: "right", kind: "write", title: "Right-aligned triangle",
    task: <>Ask <code>Rows: </code>. Row i has <strong>n − i spaces, then i stars</strong>, so the triangle leans right.</>,
    tests: [{ inputs: ["4"], expect: "Rows: 4\n" + rows(4, (i) => " ".repeat(4 - i) + "*".repeat(i)) }, { inputs: ["2"], expect: "Rows: 2\n *\n**", hidden: true }],
    requires: [comments(2), { node: "For" }],
    hints: ['print(" " * (n - i) + "*" * i)'],
    solution: '# row i (1..n): n - i spaces then i stars\n# loop i from 1 to n\nn = int(input("Rows: "))\nfor i in range(1, n + 1):\n    print(" " * (n - i) + "*" * i)',
  },
  floyd: {
    id: "floyd", kind: "write", title: "Floyd's triangle",
    task: <>Ask <code>Rows: </code>. Row i prints the next i numbers of a counter that <strong>never resets</strong>: 1 / 2 3 / 4 5 6 / 7 8 9 10. The key decision: where is the counter created?</>,
    tests: [{ inputs: ["4"], expect: "Rows: 4\n" + floyd(4) }, { inputs: ["5"], expect: "Rows: 5\n" + floyd(5), hidden: true }],
    requires: [comments(3), { node: "For", min: 2 }],
    hints: ["num = 1 BEFORE both loops — inside the outer loop it would restart every row.", 'Inner: print(num, end=" "); num += 1. After inner loop: print().'],
    solution: '# counter starts at 1, before the loops (never resets)\n# row i prints the next i numbers\n# end each row with print()\nn = int(input("Rows: "))\nnum = 1\nfor i in range(1, n + 1):\n    for j in range(i):\n        print(num, end=" ")\n        num += 1\n    print()',
  },
  table: {
    id: "table", kind: "write", title: "A neat multiplication table",
    task: <>Ask <code>Size: </code> and print a size × size table. To line the columns up, give every number a fixed width: <code>f"{"{value:4}"}"</code> right-aligns it in 4 characters. Print each row on one line with <code>end=""</code>.</>,
    tests: [{ inputs: ["4"], expect: "Size: 4\n" + table(4) }, { inputs: ["10"], expect: "Size: 10\n" + table(10), hidden: true }],
    requires: [{ node: "For", min: 2 }],
    hints: ['print(f"{r * c:4}", end="")', "After each row: print()"],
    solution: 'n = int(input("Size: "))\nfor r in range(1, n + 1):\n    for c in range(1, n + 1):\n        print(f"{r * c:4}", end="")\n    print()',
  },
  hollow: {
    id: "hollow", kind: "write", title: "Hollow square",
    task: <>Ask <code>Size: </code>. Print an n × n square of <code>*</code> that is empty inside: a cell gets a star only if it's in the first/last row or first/last column. Decide <strong>per cell</strong>.</>,
    tests: [{ inputs: ["4"], expect: "Size: 4\n****\n*  *\n*  *\n****" }, { inputs: ["2"], expect: "Size: 2\n**\n**", hidden: true }, { inputs: ["5"], expect: "Size: 5\n*****\n*   *\n*   *\n*   *\n*****", hidden: true }],
    requires: [comments(2), { node: "For", min: 2 }, { node: "If" }],
    hints: ["if r == 0 or r == n - 1 or c == 0 or c == n - 1: star else space", 'print("*", end="") / print(" ", end="")'],
    solution: '# cell (r, c) is a star if it is on the border\n# otherwise a space; end each row with print()\nn = int(input("Size: "))\nfor r in range(n):\n    for c in range(n):\n        if r == 0 or r == n - 1 or c == 0 or c == n - 1:\n            print("*", end="")\n        else:\n            print(" ", end="")\n    print()',
  },
  pyramid: {
    id: "pyramid", kind: "make", title: "Number pyramid",
    task: <>Ask <code>Rows: </code> and print a centred palindrome pyramid: row i has n − i spaces, then 1 up to i, then back down to 1 — for 4 rows: <code>   1</code>, <code>  121</code>, <code> 12321</code>, <code>1234321</code>. Decompose the row into three parts first.</>,
    minLines: 12,
    tests: [{ inputs: ["4"], expect: "Rows: 4\n" + pyramid(4) }, { inputs: ["1"], expect: "Rows: 1\n1", hidden: true }, { inputs: ["6"], expect: "Rows: 6\n" + pyramid(6), hidden: true }],
    requires: [comments(3), { node: "For", min: 3 }],
    hints: ["Part 1: print(\" \" * (n - i), end=\"\")", "Part 2: for j in range(1, i + 1): print(j, end=\"\")", "Part 3: for j in range(i - 1, 0, -1): print(j, end=\"\") — then print()"],
    solution: '# row i has three parts:\n# 1) n - i spaces  2) 1 up to i  3) i - 1 down to 1\n# then end the row\nn = int(input("Rows: "))\nfor i in range(1, n + 1):\n    print(" " * (n - i), end="")\n    for j in range(1, i + 1):\n        print(j, end="")\n    for j in range(i - 1, 0, -1):\n        print(j, end="")\n    print()',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What's the first question to ask about any pattern?", options: ["How many lines of code?", "What does row i contain, in terms of i?", "Which characters?", "Is it a triangle?"], answer: 1, explain: "Once you can describe row i, the loops write themselves." },
  { q: "In Floyd's triangle, why is num = 1 placed before both loops?", options: ["Style", "So the counter continues across rows instead of restarting", "Python requires it", "To make it faster"], answer: 1, explain: "Where a variable is created decides how long it lives." },
  { q: "What does f\"{7:4}\" produce?", options: ["\"7   \"", "\"   7\"", "\"0007\"", "\"7.00\""], answer: 1, explain: "A width of 4, numbers right-aligned by default." },
  { q: "How many characters does row 3 of a 5-row right-aligned triangle have?", options: ["3", "5", "2", "8"], answer: 1, explain: "2 spaces + 3 stars: every row is n characters wide." },
];

export default function UnitCT1_4(props) {
  const sections = [
    {
      label: "Row Rules", kicker: "DESCRIBE ROW i", title: "Every pattern is a rule for row i",
      blocks: [<P>Patterns look like art, but each is just a rule: <em>what does row i contain?</em> Pick a pattern and a size, and read its row rule:</P>, <PatternLab />, EX.inverted, EX.right],
    },
    {
      label: "Counters & Tables", kicker: "WHERE DOES IT LIVE?", title: "A counter across rows, and neat columns",
      blocks: [EX.floyd, EX.table, <Note color={T.blue} icon="📏"><code>{"{x:4}"}</code> pads to width 4; <code>{"{x:<4}"}</code> left-aligns; <code>{"{x:^4}"}</code> centres. Combine with decimals: <code>{"{price:8.2f}"}</code>.</Note>],
    },
    { label: "Per Cell", kicker: "DECIDE EACH CELL", title: "An if inside a nested loop", blocks: [EX.hollow, <KeyIdea>Outer loop = rows, inner loop = cells in the row, <code>print()</code> after the inner loop = end of row. An if inside decides each cell.</KeyIdea>] },
    { label: "Make It", kicker: "THREE PARTS PER ROW", title: "Your program: number pyramid", blocks: [EX.pyramid] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT1_4" crumb="COMPUTATIONAL THINKING I › 4" title="Patterns & Nested Loops" sections={sections} quiz={QUIZ}
      next={{ title: "CT I · 5 — Capstone: Crack It Yourself", text: "A raw problem, your four moves, and a faster algorithm at the end." }} />
  );
}
