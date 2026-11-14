// Unit CT2.4 — Matrices: Grids of Data (rebuilt, typing-first)
// Read a grid row by row → row and column sums → transpose → diagonals →
// add two matrices → magic-square checker. Pattern: grid[r][c] inside a
// double loop. No functions yet.

import LessonShell, { P, KeyIdea, CodeBlock } from "../kit/Lesson.jsx";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });
const readIn = (rows) => [`Rows: ${rows.length}`, ...rows.map((r) => `Row: ${r}`)];
const parse = (rows) => rows.map((r) => r.split(" ").map(Number));
const L = (a) => "[" + a.join(", ") + "]";
const sums = (rows) => { const g = parse(rows); return [...readIn(rows), `Row sums: ${L(g.map((r) => r.reduce((a, b) => a + b, 0)))}`, `Column sums: ${L(g[0].map((_, c) => g.reduce((a, r) => a + r[c], 0)))}`].join("\n"); };
const trans = (rows) => { const g = parse(rows); return [...readIn(rows), ...g[0].map((_, c) => g.map((r) => r[c]).join(" "))].join("\n"); };
const diag = (rows) => { const g = parse(rows), n = g.length; let m = 0, a = 0; for (let i = 0; i < n; i++) { m += g[i][i]; a += g[i][n - 1 - i]; } return [...readIn(rows), `Main diagonal: ${m}`, `Other diagonal: ${a}`].join("\n"); };
const magic = (rows) => {
  const g = parse(rows), n = g.length; const target = g[0].reduce((a, b) => a + b, 0); let ok = true;
  for (let i = 0; i < n; i++) { if (g[i].reduce((a, b) => a + b, 0) !== target) ok = false; if (g.reduce((a, r) => a + r[i], 0) !== target) ok = false; }
  let d1 = 0, d2 = 0; for (let i = 0; i < n; i++) { d1 += g[i][i]; d2 += g[i][n - 1 - i]; } if (d1 !== target || d2 !== target) ok = false;
  return [...readIn(rows), ok ? `Magic square! Every line sums to ${target}` : "Not a magic square"].join("\n");
};
const READ = 'n = int(input("Rows: "))\ngrid = []\nfor r in range(n):\n    row = []\n    for x in input("Row: ").split():\n        row.append(int(x))\n    grid.append(row)';

const EX = {
  sums: {
    id: "sums", kind: "write", title: "Row and column sums",
    task: <>Ask <code>Rows: </code>, then read each row with <code>Row: </code> (numbers separated by spaces) into a list of lists. Print <code>Row sums: [6, 15, 24]</code> and <code>Column sums: [12, 15, 18]</code>. Column sums need <code>grid[r][c]</code> with the loops the other way round.</>,
    minLines: 16,
    tests: [{ inputs: ["3", "1 2 3", "4 5 6", "7 8 9"], expect: sums(["1 2 3", "4 5 6", "7 8 9"]) }, { inputs: ["2", "10 0 5 1", "1 1 1 1"], expect: sums(["10 0 5 1", "1 1 1 1"]), hidden: true }],
    requires: [comments(3), { node: "For", min: 3 }],
    hints: ["Rows: for row in grid: row_sums.append(sum(row))", "Columns: for c in range(len(grid[0])): total = 0; for r in range(len(grid)): total += grid[r][c]"],
    solution: `# 1. read the grid row by row into a list of lists\n# 2. row sums: add along each row\n# 3. column sums: for each column, add down the rows\n${READ}\nrow_sums = []\nfor row in grid:\n    row_sums.append(sum(row))\ncol_sums = []\nfor c in range(len(grid[0])):\n    total = 0\n    for r in range(len(grid)):\n        total += grid[r][c]\n    col_sums.append(total)\nprint(f"Row sums: {row_sums}")\nprint(f"Column sums: {col_sums}")`,
  },
  transpose: {
    id: "transpose", kind: "write", title: "Transpose",
    task: <>Read a grid as before. Print its <strong>transpose</strong> — rows become columns — one row per line, numbers separated by spaces. A 2 × 3 grid becomes 3 × 2.</>,
    minLines: 14,
    tests: [{ inputs: ["2", "1 2 3", "4 5 6"], expect: trans(["1 2 3", "4 5 6"]) }, { inputs: ["3", "1 2", "3 4", "5 6"], expect: trans(["1 2", "3 4", "5 6"]), hidden: true }],
    requires: [comments(2), { node: "For", min: 3 }],
    hints: ["Outer loop over columns c, inner over rows r: print(grid[r][c], end=\" \"); print() after each."],
    solution: `# 1. read the grid\n# 2. new row c = old column c: walk columns outside, rows inside\n${READ}\nfor c in range(len(grid[0])):\n    for r in range(len(grid)):\n        print(grid[r][c], end=" ")\n    print()`,
  },
  diagonals: {
    id: "diagonals", kind: "write", title: "The two diagonals",
    task: <>Read a <strong>square</strong> grid. The main diagonal is <code>grid[i][i]</code>; the other runs from top-right to bottom-left: <code>grid[i][n - 1 - i]</code>. Print <code>Main diagonal: 15</code> and <code>Other diagonal: 15</code>. One loop is enough.</>,
    minLines: 12,
    tests: [{ inputs: ["3", "1 2 3", "4 5 6", "7 8 9"], expect: diag(["1 2 3", "4 5 6", "7 8 9"]) }, { inputs: ["2", "5 1", "2 9"], expect: diag(["5 1", "2 9"]), hidden: true }],
    requires: [comments(2)],
    hints: ["for i in range(n): main += grid[i][i]; other += grid[i][n - 1 - i]"],
    solution: `# 1. read the square grid\n# 2. one loop: add grid[i][i] and grid[i][n-1-i]\n${READ}\nmain = 0\nother = 0\nfor i in range(n):\n    main += grid[i][i]\n    other += grid[i][n - 1 - i]\nprint(f"Main diagonal: {main}")\nprint(f"Other diagonal: {other}")`,
  },
  magic: {
    id: "magic", kind: "make", title: "Magic square checker",
    task: <>A magic square has every row, every column and both diagonals adding to the same number. Read a square grid and print <code>Magic square! Every line sums to 15</code> or <code>Not a magic square</code>. Use a flag (CT1.3): assume magic, and any line with a different sum disproves it.</>,
    minLines: 24,
    tests: [
      { inputs: ["3", "2 7 6", "9 5 1", "4 3 8"], expect: magic(["2 7 6", "9 5 1", "4 3 8"]) },
      { inputs: ["3", "1 2 3", "4 5 6", "7 8 9"], expect: magic(["1 2 3", "4 5 6", "7 8 9"]), hidden: true },
      { inputs: ["3", "2 7 6", "9 5 1", "4 8 3"], expect: magic(["2 7 6", "9 5 1", "4 8 3"]), hidden: true },
    ],
    requires: [comments(4)],
    hints: ["target = sum(grid[0]); is_magic = True", "Check every row, every column, then both diagonals; any mismatch → is_magic = False.", "The third hidden test has correct rows but a wrong column."],
    solution: `# 1. read the square grid; target = first row's sum\n# 2. assume magic\n# 3. any row, column or diagonal with another sum disproves it\n# 4. print the verdict\n${READ}\ntarget = sum(grid[0])\nis_magic = True\nfor i in range(n):\n    if sum(grid[i]) != target:\n        is_magic = False\n    col = 0\n    for r in range(n):\n        col += grid[r][i]\n    if col != target:\n        is_magic = False\nd1 = 0\nd2 = 0\nfor i in range(n):\n    d1 += grid[i][i]\n    d2 += grid[i][n - 1 - i]\nif d1 != target or d2 != target:\n    is_magic = False\nif is_magic:\n    print(f"Magic square! Every line sums to {target}")\nelse:\n    print("Not a magic square")`,
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "grid = [[1, 2, 3], [4, 5, 6]]. What is grid[1][2]?", options: ["2", "5", "6", "4"], answer: 2, explain: "Row 1 is [4, 5, 6]; its index 2 is 6." },
  { q: "To sum a column, which loop is on the outside?", options: ["Rows", "Columns — then walk down the rows inside", "Either; it doesn't matter for the order of output", "Neither"], answer: 1, explain: "For each column c, add grid[r][c] for every row r." },
  { q: "The transpose of a 2 × 3 grid has shape…", options: ["2 × 3", "3 × 2", "3 × 3", "2 × 2"], answer: 1, explain: "Rows become columns." },
  { q: "Which index pattern is the top-right to bottom-left diagonal?", options: ["grid[i][i]", "grid[i][n - 1 - i]", "grid[n][i]", "grid[i][0]"], answer: 1, explain: "As the row goes down, the column goes left." },
];

export default function UnitCT2_4(props) {
  const sections = [
    {
      label: "Grids", kicker: "LISTS OF LISTS", title: "A matrix is a list of rows",
      blocks: [<P>Images, spreadsheets, game boards and seating plans are all grids. In Python, a grid is a list of lists: <code>grid[r][c]</code> is row r, column c (Unit 7.2). Every grid algorithm is a double loop with a different line in the middle.</P>, <div style={{ maxWidth: 640 }}><CodeBlock title="reading a grid" code={READ} /></div>, EX.sums],
    },
    { label: "Reshape", kicker: "TRANSPOSE · DIAGONALS", title: "Walking a grid in other orders", blocks: [EX.transpose, EX.diagonals, <KeyIdea>Rows: <code>grid[r]</code>. Column c: <code>grid[r][c]</code> for every r. Diagonals: <code>grid[i][i]</code> and <code>grid[i][n-1-i]</code>.</KeyIdea>] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: magic square checker", blocks: [EX.magic] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT2_4" crumb="COMPUTATIONAL THINKING II › 4" title="Matrices: Grids of Data" sections={sections} quiz={QUIZ}
      next={{ title: "CT II · 5 — String Algorithms", text: "Palindromes, anagrams, frequency counts and a secret-code cipher." }} />
  );
}
