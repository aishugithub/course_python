// Unit 12.1 — Meet Pandas: DataFrames (rebuilt, typing-first)
// Series → DataFrame from a dict → read_csv (each test's setup writes the
// CSV, hidden tests use a different file) → shape / head / column stats →
// selecting and filtering rows → new columns with apply + sort_values →
// Make It: top performers.

import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";
// Real pandas output, captured from the model solutions and checked by hand.
const OUT = {
  series: "Asha    82\nBen     45\nChen    67\nDev     91\ndtype: int64\n67\n71.25\nAsha    82\nChen    67\nDev     91\ndtype: int64",
  frame: "   Name Dept  Marks\n0  Asha  CSE     82\n1   Ben  ECE     45\n2  Chen  CSE     67\n(3, 3)\n['Name', 'Dept', 'Marks']",
  readcsv: "Rows: 5, Columns: 3\n   Name Dept  Marks\n0  Asha  CSE     82\n1   Ben  ECE     35\n2  Chen  CSE     67",
  readcsv2: "Rows: 7, Columns: 3\n    Name  Dept  Marks\n0  Farah   CSE     73\n1  Gopal  MECH     38\n2   Hari   ECE     88",
  stats: "Students: 5\nAverage: 66.60\nHighest: 91\nLowest: 35",
  stats2: "Students: 7\nAverage: 67.71\nHighest: 95\nLowest: 38",
  select: "   Name  Marks\n0  Asha     82\n1   Ben     35\n2  Chen     67\n3   Dev     91\n4  Esha     58\n   Name  Dept  Marks\n0  Asha   CSE     82\n2  Chen   CSE     67\n3   Dev  MECH     91\n   Name Dept  Marks\n0  Asha  CSE     82",
  filter: "Department: CSE\n   Name  Marks\n0  Asha     82\n2  Chen     67\nCount: 2",
  filter2: "Department: MECH\n    Name  Marks\n1  Gopal     38\n4    Jay     61\nCount: 2",
  newcol: "   Name  Dept  Marks  Percent Result\n3   Dev  MECH     91     75.8   Pass\n0  Asha   CSE     82     68.3   Pass\n2  Chen   CSE     67     55.8   Pass\n4  Esha   ECE     58     48.3   Pass\n1   Ben   ECE     35     29.2   Fail",
  newcol2: "    Name  Dept  Marks  Percent Result\n3   Isha   CSE     95     79.2   Pass\n2   Hari   ECE     88     73.3   Pass\n0  Farah   CSE     73     60.8   Pass\n6   Lina   CSE     70     58.3   Pass\n4    Jay  MECH     61     50.8   Pass\n5   Kavi   ECE     49     40.8   Pass\n1  Gopal  MECH     38     31.7   Fail",
  top: "Name  Marks Grade\n Dev     91     A\nAsha     82     B\nChen     67     C\nPass rate: 80.0%",
  top2: " Name  Marks Grade\n Isha     95     A\n Hari     88     B\nFarah     73     C\nPass rate: 85.7%",
};

const csvFile = (name, text) => `with open(${JSON.stringify(name)}, "w") as _f:\n    _f.write(${JSON.stringify(text)})`;
const MARKS = "Name,Dept,Marks\nAsha,CSE,82\nBen,ECE,35\nChen,CSE,67\nDev,MECH,91\nEsha,ECE,58\n";
const MARKS2 = "Name,Dept,Marks\nFarah,CSE,73\nGopal,MECH,38\nHari,ECE,88\nIsha,CSE,95\nJay,MECH,61\nKavi,ECE,49\nLina,CSE,70\n";
const PD = { timeoutMs: 20000 }; // the first `import pandas` takes a few seconds
const pdCalls = (...names) => names.map((n) => ({ call: n }));

const EX = {
  series: {
    ...PD, id: "series", kind: "type", title: "A Series: one labelled column",
    task: <>pandas is the most-used data tool in Python. Its simplest object is a <strong>Series</strong>: a list of values with a label (the <em>index</em>) on each one. Maths and comparisons work on the whole Series at once — no loop.</>,
    show: 'import pandas as pd\n\nmarks = pd.Series([82, 45, 67, 91], index=["Asha", "Ben", "Chen", "Dev"])\nprint(marks)\nprint(marks["Chen"])\nprint(marks.mean())\nprint(marks[marks >= 60])',
    tests: [{ expect: OUT.series }],
    requires: pdCalls("Series"),
    hints: ["marks >= 60 gives True/False for every student; marks[…] keeps the True ones."],
    solution: 'import pandas as pd\n\nmarks = pd.Series([82, 45, 67, 91], index=["Asha", "Ben", "Chen", "Dev"])\nprint(marks)\nprint(marks["Chen"])\nprint(marks.mean())\nprint(marks[marks >= 60])',
  },
  frame: {
    ...PD, id: "frame", kind: "type", title: "A DataFrame: a whole table",
    task: <>A <strong>DataFrame</strong> is a table: named columns (each one a Series) sharing one row index. Build one from a dictionary of lists — each key becomes a column.</>,
    show: 'import pandas as pd\n\ndata = {\n    "Name": ["Asha", "Ben", "Chen"],\n    "Dept": ["CSE", "ECE", "CSE"],\n    "Marks": [82, 45, 67],\n}\ndf = pd.DataFrame(data)\nprint(df)\nprint(df.shape)\nprint(list(df.columns))',
    tests: [{ expect: OUT.frame }],
    requires: pdCalls("DataFrame"),
    hints: ["shape is (rows, columns). The 0, 1, 2 on the left is the index pandas adds."],
    solution: 'import pandas as pd\n\ndata = {\n    "Name": ["Asha", "Ben", "Chen"],\n    "Dept": ["CSE", "ECE", "CSE"],\n    "Marks": [82, 45, 67],\n}\ndf = pd.DataFrame(data)\nprint(df)\nprint(df.shape)\nprint(list(df.columns))',
  },
  readcsv: {
    ...PD, id: "readcsv", kind: "write", title: "Load a CSV file",
    task: <>Real data arrives as files. <code>marks.csv</code> is in the folder (below). Load it with <code>pd.read_csv("marks.csv")</code>, then print <code>Rows: 5, Columns: 3</code> (from <code>df.shape</code>) and the first three rows with <code>df.head(3)</code>. Hidden tests use a different marks.csv.</>,
    show: MARKS, showLabel: "marks.csv — ALREADY IN THE FOLDER",
    tests: [{ setup: csvFile("marks.csv", MARKS), expect: OUT.readcsv }, { setup: csvFile("marks.csv", MARKS2), expect: OUT.readcsv2, hidden: true, why: "This marks.csv has 7 rows — read the numbers from df.shape." }],
    requires: pdCalls("read_csv", "head"),
    hints: ['df = pd.read_csv("marks.csv")', "rows, cols = df.shape", "print(df.head(3))"],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("marks.csv")\nrows, cols = df.shape\nprint(f"Rows: {rows}, Columns: {cols}")\nprint(df.head(3))',
  },
  stats: {
    ...PD, id: "stats", kind: "write", title: "Ask a column a question",
    task: <><code>df["Marks"]</code> picks one column (a Series), which knows <code>.mean()</code>, <code>.max()</code>, <code>.min()</code>, <code>.sum()</code>, <code>.count()</code>. Load marks.csv and print <code>Students: 5</code>, <code>Average: 66.60</code>, <code>Highest: 91</code>, <code>Lowest: 35</code>.</>,
    tests: [{ setup: csvFile("marks.csv", MARKS), expect: OUT.stats }, { setup: csvFile("marks.csv", MARKS2), expect: OUT.stats2, hidden: true, why: "A different marks.csv — every number must come from the DataFrame." }],
    requires: pdCalls("read_csv", "mean", "max", "min"),
    hints: ['m = df["Marks"]', 'print(f"Average: {m.mean():.2f}")'],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("marks.csv")\nm = df["Marks"]\nprint(f"Students: {m.count()}")\nprint(f"Average: {m.mean():.2f}")\nprint(f"Highest: {m.max()}")\nprint(f"Lowest: {m.min()}")',
  },
  select: {
    ...PD, id: "select", kind: "type", title: "Pick columns, filter rows",
    task: <>Two square-bracket moves. A <strong>list of names</strong> picks columns. A <strong>True/False Series</strong> picks rows (a <em>mask</em>). Combine masks with <code>&amp;</code> (and) and <code>|</code> (or) — each condition in brackets.</>,
    show: 'import pandas as pd\n\ndf = pd.read_csv("marks.csv")\nprint(df[["Name", "Marks"]])\nprint(df[df["Marks"] >= 60])\nprint(df[(df["Dept"] == "CSE") & (df["Marks"] > 70)])',
    tests: [{ setup: csvFile("marks.csv", MARKS), expect: OUT.select }],
    requires: pdCalls("read_csv"),
    hints: ["Python's and / or don't work on whole columns — use & and |, with brackets around each condition."],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("marks.csv")\nprint(df[["Name", "Marks"]])\nprint(df[df["Marks"] >= 60])\nprint(df[(df["Dept"] == "CSE") & (df["Marks"] > 70)])',
  },
  filter: {
    ...PD, id: "filter", kind: "write", title: "Students of one department",
    task: <>Load marks.csv. Ask <code>Department: </code>, keep only that department's rows, and print their <code>Name</code> and <code>Marks</code> columns, then <code>Count: 2</code>. If nobody is in that department (<code>rows.empty</code>), print <code>No students in BIO</code> instead.</>,
    tests: [
      { setup: csvFile("marks.csv", MARKS), inputs: ["CSE"], expect: OUT.filter },
      { setup: csvFile("marks.csv", MARKS2), inputs: ["MECH"], expect: OUT.filter2, hidden: true },
      { setup: csvFile("marks.csv", MARKS), inputs: ["BIO"], expect: "Department: BIO\nNo students in BIO", hidden: true, why: "When the filtered DataFrame is empty, print the No students message." },
    ],
    requires: pdCalls("read_csv"),
    hints: ['rows = df[df["Dept"] == dept]', 'if rows.empty: … else: print(rows[["Name", "Marks"]]) and len(rows)'],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("marks.csv")\ndept = input("Department: ")\nrows = df[df["Dept"] == dept]\nif rows.empty:\n    print(f"No students in {dept}")\nelse:\n    print(rows[["Name", "Marks"]])\n    print(f"Count: {len(rows)}")',
  },
  newcol: {
    ...PD, id: "newcol", kind: "complete", title: "New columns and sorting",
    task: <>Assigning to a new column name creates it, row by row: arithmetic works on the whole column, and <code>.apply(function)</code> runs your function on every value (a <code>lambda</code> from 11.2 is perfect). The exam was out of 120. Fill the blanks: <code>Percent</code> is Marks out of 120 as a percentage (rounded to 1 place), <code>Result</code> is "Pass" for 40 or more, and sort by Marks, highest first.</>,
    starter: 'import pandas as pd\n\ndf = pd.read_csv("marks.csv")\ndf["Percent"] = (___).round(1)\ndf["Result"] = df["Marks"].apply(lambda m: ___)\ndf = df.sort_values("Marks", ascending=___)\nprint(df)',
    tests: [{ setup: csvFile("marks.csv", MARKS), expect: OUT.newcol }, { setup: csvFile("marks.csv", MARKS2), expect: OUT.newcol2, hidden: true }],
    requires: pdCalls("apply", "sort_values"),
    hints: ['df["Marks"] / 120 * 100', '"Pass" if m >= 40 else "Fail"', "ascending=False"],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("marks.csv")\ndf["Percent"] = (df["Marks"] / 120 * 100).round(1)\ndf["Result"] = df["Marks"].apply(lambda m: "Pass" if m >= 40 else "Fail")\ndf = df.sort_values("Marks", ascending=False)\nprint(df)',
  },
  top: {
    ...PD, id: "top", kind: "make", title: "Top performers",
    task: <>Load marks.csv. Write <code>grade(m)</code> (A ≥ 90, B ≥ 75, C ≥ 60, D ≥ 40, else F) and add a <code>Grade</code> column with <code>.apply(grade)</code>. Print the top three by marks — just <code>Name</code>, <code>Marks</code>, <code>Grade</code> — using <code>sort_values</code> and <code>.head(3)</code>, but with <code>index=False</code>: <code>print(top.to_string(index=False))</code>. Last, print <code>Pass rate: 80.0%</code> (marks ≥ 40, one decimal).</>,
    minLines: 14,
    tests: [{ setup: csvFile("marks.csv", MARKS), expect: OUT.top }, { setup: csvFile("marks.csv", MARKS2), expect: OUT.top2, hidden: true, why: "A different marks.csv: compute everything from the DataFrame." }],
    requires: [...pdCalls("read_csv", "apply", "sort_values", "head", "to_string"), { node: "FunctionDef" }],
    hints: ['df["Grade"] = df["Marks"].apply(grade)', 'top = df.sort_values("Marks", ascending=False).head(3)[["Name", "Marks", "Grade"]]', 'rate = (df["Marks"] >= 40).mean() * 100 — True counts as 1'],
    solution: 'import pandas as pd\n\ndef grade(m):\n    if m >= 90:\n        return "A"\n    elif m >= 75:\n        return "B"\n    elif m >= 60:\n        return "C"\n    elif m >= 40:\n        return "D"\n    return "F"\n\ndf = pd.read_csv("marks.csv")\ndf["Grade"] = df["Marks"].apply(grade)\ntop = df.sort_values("Marks", ascending=False).head(3)[["Name", "Marks", "Grade"]]\nprint(top.to_string(index=False))\nrate = (df["Marks"] >= 40).mean() * 100\nprint(f"Pass rate: {rate:.1f}%")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What is a DataFrame?", options: ["A chart", "A table: named columns sharing one row index", "A single list", "A CSV file"], answer: 1, explain: "Each column of a DataFrame is a Series." },
  { q: "df.shape is (7, 3). That means…", options: ["7 columns, 3 rows", "7 rows, 3 columns", "21 values missing", "7 files"], answer: 1, explain: "Always (rows, columns)." },
  { q: "Which keeps only rows with Marks of 60 or more?", options: ["df[\"Marks\" >= 60]", "df[df[\"Marks\"] >= 60]", "df.Marks(60)", "df.filter(60)"], answer: 1, explain: "The inside makes a True/False mask; the outside keeps the True rows." },
  { q: "Two conditions on columns are combined with…", options: ["and", "&, with brackets around each condition", "+", ","], answer: 1, explain: "(df.A > 1) & (df.B == \"x\")" },
  { q: "df[\"Grade\"] = df[\"Marks\"].apply(grade) …", options: ["Prints grades", "Runs grade on every mark and stores the results as a new column", "Sorts by grade", "Deletes Marks"], answer: 1, explain: "apply calls your function once per value." },
];

export default function Unit12_1(props) {
  const sections = [
    { label: "Series", kicker: "import pandas as pd", title: "A labelled column", blocks: [
      <P>Lists and dictionaries got you far. But real data is tables: thousands of rows, many columns. <strong>pandas</strong> handles tables the way a spreadsheet does — except every step is code you can rerun.</P>,
      EX.series,
    ] },
    { label: "DataFrame", kicker: "ROWS × COLUMNS", title: "A whole table", blocks: [EX.frame] },
    { label: "Read a CSV", kicker: "REAL FILES", title: "Load data from a file", blocks: [
      <P>A <strong>CSV</strong> file is a table in plain text: one line per row, commas between values, the first line holds the column names. Excel and Google Sheets can save as CSV.</P>,
      EX.readcsv, EX.stats,
    ] },
    { label: "Select & Filter", kicker: "[ ] TWO WAYS", title: "Pick columns, keep rows", blocks: [EX.select, EX.filter] },
    { label: "New Columns", kicker: "apply · sort_values", title: "Add columns, sort rows", blocks: [EX.newcol, <KeyIdea>Think in whole columns, not loops: df["Marks"] / 120 is 5 divisions in one step — or 5 million.</KeyIdea>] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: top performers", blocks: [
      EX.top,
      <Note color={T.blue} icon="💡">In Colab or Jupyter, typing just df on the last line of a cell shows a nicely formatted table. In a script, use print(df).</Note>,
    ] },
  ];
  return (
    <LessonShell {...props} unitId="Unit12_1" crumb="MODULE 12 › 1" title="Meet Pandas: DataFrames" sections={sections} quiz={QUIZ}
      next={{ title: "12.2 — Analysing Real Data", text: "Group, aggregate, clean missing values, and save your results." }} />
  );
}
