// Unit 13.1 — Charts with Matplotlib (rebuilt, typing-first)
// The recipe (data → plot → label → show) with a line chart → bar (complete)
// → scatter and pie → several lines + legend → a chart straight from a CSV via
// pandas → subplots → Make It: a two-chart sales dashboard.
// Charts are checked by inspecting the figure the learner drew (post checks
// read bar heights, tick labels, line data, titles) — hidden tests swap the CSV.

import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const csvFile = (name, text) => `with open(${JSON.stringify(name)}, "w") as _f:\n    _f.write(${JSON.stringify(text)})`;
const PLT = { timeoutMs: 20000 };
const py = (v) => JSON.stringify(v);

// Post-check preamble: grab the drawn figure (and draw it, so tick labels exist)
const FIG = (n = 1) => `import matplotlib.pyplot as _plt
assert _plt.get_fignums(), "No chart was drawn — call plt.plot(...), plt.bar(...) etc."
_fig = _plt.gcf()
_fig.canvas.draw()
assert len(_fig.axes) >= ${n}, "Expected ${n} chart${n > 1 ? "s" : ""} in the figure — found " + str(len(_fig.axes)) + "."
_ax = _fig.axes[0]
_ticks = lambda a: [t.get_text() for t in a.get_xticklabels()]
_heights = lambda a: [round(p.get_height(), 2) for p in a.patches]
`;
const title = (t, ax = "_ax") => `assert ${ax}.get_title().strip().lower() == ${py(t.toLowerCase())}, "The title should be ${t.replace(/"/g, "'")} — it is '" + ${ax}.get_title() + "'."\n`;
const labels = (x, y) => `assert _ax.get_xlabel().strip().lower() == ${py(x.toLowerCase())}, "Label the x-axis: ${x}"\nassert _ax.get_ylabel().strip().lower() == ${py(y.toLowerCase())}, "Label the y-axis: ${y}"\n`;

// ── data & reference values ──
const MARKS = "Name,Dept,Marks\nAsha,CSE,82\nBen,ECE,35\nChen,CSE,67\nDev,MECH,91\nEsha,ECE,58\n";
const MARKS2 = "Name,Dept,Marks\nFarah,CSE,73\nGopal,MECH,38\nHari,ECE,88\nIsha,CSE,95\nJay,MECH,61\nKavi,ECE,49\nLina,CSE,70\n";
const SALES = "Date,Item,Category,Qty,Price\n2026-01-05,Pen,Stationery,10,15\n2026-01-07,Notebook,Stationery,5,60\n2026-01-12,Headphones,Electronics,2,1200\n2026-01-20,Mouse,Electronics,3,450\n2026-02-02,Pen,Stationery,20,15\n2026-02-14,Mug,Kitchen,6,250\n2026-02-18,Notebook,Stationery,8,60\n2026-02-25,Mouse,Electronics,1,450\n2026-03-03,Mug,Kitchen,4,250\n2026-03-10,Headphones,Electronics,1,1200\n2026-03-15,Pen,Stationery,15,15\n2026-03-28,Bottle,Kitchen,5,300\n";
const SALES2 = "Date,Item,Category,Qty,Price\n2026-04-02,Ball,Sports,4,350\n2026-04-09,Racket,Sports,2,1800\n2026-04-15,Pen,Stationery,30,15\n2026-05-01,Lamp,Home,2,950\n2026-05-11,Ball,Sports,6,350\n2026-05-20,Cushion,Home,5,400\n2026-06-03,Racket,Sports,1,1800\n2026-06-17,Lamp,Home,2,950\n2026-06-25,Pen,Stationery,12,15\n";
const parse = (csv) => { const [head, ...rows] = csv.trim().split("\n"); const k = head.split(","); return rows.map((r) => Object.fromEntries(r.split(",").map((v, i) => [k[i], isNaN(+v) ? v : +v]))); };
const groupBy = (rows, key, val, agg = "sum") => { const m = new Map(); rows.forEach((r) => { const g = m.get(r[key]) || []; g.push(val(r)); m.set(r[key], g); }); return [...m].map(([k, xs]) => [k, Math.round((agg === "mean" ? xs.reduce((a, b) => a + b, 0) / xs.length : xs.reduce((a, b) => a + b, 0)) * 100) / 100]).sort((a, b) => (a[0] < b[0] ? -1 : 1)); };
const deptCheck = (csv) => { const g = groupBy(parse(csv), "Dept", (r) => r.Marks, "mean"); return FIG() + title("Average marks by department") + `assert _ticks(_ax) == ${py(g.map((x) => x[0]))}, "One bar per department, in groupby's order: " + str(_ticks(_ax))\nassert _heights(_ax) == ${py(g.map((x) => x[1]))}, "The bar heights should be each department's average mark."\n`; };
const dashCheck = (csv) => {
  const rows = parse(csv).map((r) => ({ ...r, Rev: r.Qty * r.Price, Month: r.Date.slice(0, 7) }));
  const cat = groupBy(rows, "Category", (r) => r.Rev).sort((a, b) => b[1] - a[1]);
  const mon = groupBy(rows, "Month", (r) => r.Rev);
  return FIG(2) + `_a1, _a2 = _fig.axes[0], _fig.axes[1]
assert _ticks(_a1) == ${py(cat.map((x) => x[0]))}, "Left chart: one bar per category, highest revenue first — got " + str(_ticks(_a1))
assert _heights(_a1) == ${py(cat.map((x) => x[1]))}, "Left chart: bar heights should be the revenue per category."
assert len(_a2.get_lines()) == 1, "Right chart: draw one line (ax2.plot)."
assert [round(float(v), 2) for v in _a2.get_lines()[0].get_ydata()] == ${py(mon.map((x) => x[1]))}, "Right chart: the line should be the revenue per month, in date order."
assert "category" in _a1.get_title().lower(), "Give the left chart a title with the word category."
assert "month" in _a2.get_title().lower(), "Give the right chart a title with the word month."
`;
};
const bestCat = (csv) => { const rows = parse(csv); const c = groupBy(rows, "Category", (r) => r.Qty * r.Price).sort((a, b) => b[1] - a[1]); return `Best category: ${c[0][0]}`; };

const EX = {
  line: {
    ...PLT, id: "line", kind: "type", title: "Your first chart",
    task: <>Every matplotlib chart follows one recipe: <strong>data → plot → label → show</strong>. <code>plt.plot(x, y)</code> draws a line; <code>marker="o"</code> puts a dot on each point.</>,
    show: 'import matplotlib.pyplot as plt\n\ndays = ["Mon", "Tue", "Wed", "Thu", "Fri"]\nsteps = [4200, 6800, 5100, 9000, 7300]\n\nplt.plot(days, steps, marker="o")\nplt.title("Steps this week")\nplt.xlabel("Day")\nplt.ylabel("Steps")\nplt.show()',
    tests: [{ post: FIG() + title("Steps this week") + labels("Day", "Steps") + `assert len(_ax.get_lines()) == 1, "Draw one line with plt.plot."\nassert list(_ax.get_lines()[0].get_ydata()) == [4200, 6800, 5100, 9000, 7300], "Plot the steps list as y."\n` }],
    hints: ["The chart appears under the output. plt.show() displays it (in a script it opens a window)."],
    solution: 'import matplotlib.pyplot as plt\n\ndays = ["Mon", "Tue", "Wed", "Thu", "Fri"]\nsteps = [4200, 6800, 5100, 9000, 7300]\n\nplt.plot(days, steps, marker="o")\nplt.title("Steps this week")\nplt.xlabel("Day")\nplt.ylabel("Steps")\nplt.show()',
  },
  bar: {
    ...PLT, id: "bar", kind: "complete", title: "A bar chart",
    task: <>Bars compare amounts between categories. Fill the blanks: draw the bars with <code>plt.bar</code>, title the chart <code>Rainfall by month</code>, and label the axes <code>Month</code> and <code>Rainfall (mm)</code>. Then change the bar colour with <code>color="teal"</code>.</>,
    starter: 'import matplotlib.pyplot as plt\n\nmonths = ["Jan", "Feb", "Mar", "Apr"]\nrain = [12, 30, 55, 80]\n\nplt.___(months, rain)\nplt.title(___)\nplt.xlabel(___)\nplt.ylabel(___)\nplt.show()',
    tests: [{ post: FIG() + title("Rainfall by month") + labels("Month", "Rainfall (mm)") + `assert _ticks(_ax) == ["Jan", "Feb", "Mar", "Apr"], "One bar per month."\nassert _heights(_ax) == [12, 30, 55, 80], "Bar heights should be the rain list."\nimport matplotlib.colors as _mc\nassert _mc.to_hex(_ax.patches[0].get_facecolor()) == _mc.to_hex("teal"), "Make the bars teal: plt.bar(months, rain, color=\\"teal\\")"\n` }],
    hints: ['plt.bar(months, rain, color="teal")', 'plt.title("Rainfall by month")'],
    solution: 'import matplotlib.pyplot as plt\n\nmonths = ["Jan", "Feb", "Mar", "Apr"]\nrain = [12, 30, 55, 80]\n\nplt.bar(months, rain, color="teal")\nplt.title("Rainfall by month")\nplt.xlabel("Month")\nplt.ylabel("Rainfall (mm)")\nplt.show()',
  },
  scatter: {
    ...PLT, id: "scatter", kind: "write", title: "Is there a link?",
    task: <>A <strong>scatter</strong> plot shows whether two measurements move together. Six students: hours studied <code>[1, 2, 3, 4, 5, 6]</code>, scores <code>[35, 48, 52, 63, 71, 80]</code>. Draw them with <code>plt.scatter</code>, title <code>Study vs score</code>, x label <code>Hours</code>, y label <code>Score</code>. Then print <code>Each extra hour: about 9.0 marks</code> — the average rise per hour, (last score − first score) / (last hour − first hour), 1 decimal place.</>,
    tests: [{ expect: "Each extra hour: about 9.0 marks", post: FIG() + title("Study vs score") + labels("Hours", "Score") + `assert len(_ax.collections) == 1, "Use plt.scatter for the points."\nassert len(_ax.collections[0].get_offsets()) == 6, "Plot all six students."\n` }],
    requires: [{ call: "scatter" }],
    hints: ["plt.scatter(hours, scores)", "rise = (scores[-1] - scores[0]) / (hours[-1] - hours[0])"],
    solution: 'import matplotlib.pyplot as plt\n\nhours = [1, 2, 3, 4, 5, 6]\nscores = [35, 48, 52, 63, 71, 80]\n\nplt.scatter(hours, scores)\nplt.title("Study vs score")\nplt.xlabel("Hours")\nplt.ylabel("Score")\nplt.show()\n\nrise = (scores[-1] - scores[0]) / (hours[-1] - hours[0])\nprint(f"Each extra hour: about {rise:.1f} marks")',
  },
  pie: {
    ...PLT, id: "pie", kind: "write", title: "Parts of a whole",
    task: <>A <strong>pie</strong> shows how a whole splits into parts. A day: Sleep 8 hours, Class 6, Study 3, Phone 4, Other 3. Draw <code>plt.pie(hours, labels=activities, autopct="%1.0f%%")</code> (autopct writes each slice's percentage) and title it <code>My day</code>.</>,
    tests: [{ post: FIG() + title("My day") + `from matplotlib.patches import Wedge as _W\n_w = [p for p in _ax.patches if isinstance(p, _W)]\nassert len(_w) == 5, "Five slices: Sleep, Class, Study, Phone, Other."\n_t = [t.get_text() for t in _ax.texts]\nassert "Sleep" in _t and "Phone" in _t, "Label the slices: labels=activities"\nassert any(x.endswith("%") for x in _t), "Show percentages with autopct=\\"%1.0f%%\\""\n` }],
    requires: [{ call: "pie" }],
    hints: ['activities = ["Sleep", "Class", "Study", "Phone", "Other"]', "hours = [8, 6, 3, 4, 3]"],
    solution: 'import matplotlib.pyplot as plt\n\nactivities = ["Sleep", "Class", "Study", "Phone", "Other"]\nhours = [8, 6, 3, 4, 3]\n\nplt.pie(hours, labels=activities, autopct="%1.0f%%")\nplt.title("My day")\nplt.show()',
  },
  legend: {
    ...PLT, id: "legend", kind: "type", title: "Two lines and a legend",
    task: <>Call <code>plt.plot</code> twice to draw two lines on the same axes. Give each a <code>label=</code>, and <code>plt.legend()</code> shows which is which.</>,
    show: 'import matplotlib.pyplot as plt\n\nmonths = ["Jan", "Feb", "Mar", "Apr", "May"]\nlast_year = [120, 135, 150, 140, 160]\nthis_year = [130, 150, 170, 175, 190]\n\nplt.plot(months, last_year, marker="o", label="2025")\nplt.plot(months, this_year, marker="o", label="2026")\nplt.title("Sales: this year vs last")\nplt.legend()\nplt.show()',
    tests: [{ post: FIG() + title("Sales: this year vs last") + `assert len(_ax.get_lines()) == 2, "Draw two lines."\nassert _ax.get_legend() is not None, "Call plt.legend()."\nassert [t.get_text() for t in _ax.get_legend().get_texts()] == ["2025", "2026"], "Label the lines 2025 and 2026."\n` }],
    hints: ["The legend uses the label= of each line."],
    solution: 'import matplotlib.pyplot as plt\n\nmonths = ["Jan", "Feb", "Mar", "Apr", "May"]\nlast_year = [120, 135, 150, 140, 160]\nthis_year = [130, 150, 170, 175, 190]\n\nplt.plot(months, last_year, marker="o", label="2025")\nplt.plot(months, this_year, marker="o", label="2026")\nplt.title("Sales: this year vs last")\nplt.legend()\nplt.show()',
  },
  fromcsv: {
    ...PLT, id: "fromcsv", kind: "write", title: "From a CSV to a chart",
    task: <>Pandas (M12) + matplotlib together. Load <code>marks.csv</code>, compute each department's average mark with <code>groupby</code>, and draw it as a bar chart: <code>plt.bar(avg.index, avg.values)</code>, titled <code>Average marks by department</code>. Hidden tests use a different marks.csv.</>,
    show: MARKS, showLabel: "marks.csv — ALREADY IN THE FOLDER",
    tests: [{ setup: csvFile("marks.csv", MARKS), post: deptCheck(MARKS) }, { setup: csvFile("marks.csv", MARKS2), post: deptCheck(MARKS2), hidden: true }],
    requires: [{ call: "read_csv" }, { call: "groupby" }, { call: "bar" }],
    hints: ['avg = df.groupby("Dept")["Marks"].mean()', "plt.bar(avg.index, avg.values)"],
    solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("marks.csv")\navg = df.groupby("Dept")["Marks"].mean()\nplt.bar(avg.index, avg.values)\nplt.title("Average marks by department")\nplt.ylabel("Average mark")\nplt.show()',
  },
  subplots: {
    ...PLT, id: "subplots", kind: "complete", title: "Side by side: subplots",
    task: <><code>fig, (ax1, ax2) = plt.subplots(1, 2)</code> makes a figure with 1 row and 2 charts, each with its own <em>axes</em> object. On an axes, the methods are the same except titles and labels gain <code>set_</code>: <code>ax1.set_title(…)</code>. Fill the blanks: bars on the left, a line on the right.</>,
    starter: 'import matplotlib.pyplot as plt\n\ndays = ["Mon", "Tue", "Wed", "Thu", "Fri"]\ncups = [3, 2, 4, 1, 2]\nsleep = [6, 7, 5, 8, 7]\n\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))\nax1.___(days, cups)\nax1.___("Coffee")\nax2.___(days, sleep, marker="o")\nax2.___("Sleep")\nplt.show()',
    tests: [{ post: FIG(2) + `_a1, _a2 = _fig.axes[0], _fig.axes[1]\nassert _heights(_a1) == [3, 2, 4, 1, 2], "Left: ax1.bar(days, cups)"\nassert len(_a2.get_lines()) == 1, "Right: ax2.plot(days, sleep, marker=\\"o\\")"\n` + title("Coffee", "_a1") + title("Sleep", "_a2") }],
    hints: ["ax1.bar(days, cups)", 'ax1.set_title("Coffee")', 'ax2.plot(...) and ax2.set_title("Sleep")'],
    solution: 'import matplotlib.pyplot as plt\n\ndays = ["Mon", "Tue", "Wed", "Thu", "Fri"]\ncups = [3, 2, 4, 1, 2]\nsleep = [6, 7, 5, 8, 7]\n\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))\nax1.bar(days, cups)\nax1.set_title("Coffee")\nax2.plot(days, sleep, marker="o")\nax2.set_title("Sleep")\nplt.show()',
  },
  dashboard: {
    ...PLT, id: "dashboard", kind: "make", title: "Sales dashboard",
    task: <>Load the shop's <code>sales.csv</code> (12.2) and add Revenue (Qty × Price) and Month (<code>Date.str[:7]</code>). Make <code>plt.subplots(1, 2, figsize=(11, 4))</code>: on the left, revenue per Category as bars, <strong>highest first</strong>, titled <code>Revenue by category</code>; on the right, revenue per Month as a line with markers, titled <code>Revenue by month</code>. Print <code>Best category: Electronics</code>. Hidden tests use another shop's file.</>,
    minLines: 16,
    tests: [{ setup: csvFile("sales.csv", SALES), expect: bestCat(SALES), post: dashCheck(SALES) }, { setup: csvFile("sales.csv", SALES2), expect: bestCat(SALES2), post: dashCheck(SALES2), hidden: true }],
    requires: [{ call: "subplots" }, { call: "groupby", min: 2 }],
    hints: ['by_cat = df.groupby("Category")["Revenue"].sum().sort_values(ascending=False)', 'monthly = df.groupby("Month")["Revenue"].sum()', "ax1.bar(by_cat.index, by_cat.values); ax2.plot(monthly.index, monthly.values, marker=\"o\")", "by_cat.index[0] is the best category"],
    solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\ndf["Month"] = df["Date"].str[:7]\nby_cat = df.groupby("Category")["Revenue"].sum().sort_values(ascending=False)\nmonthly = df.groupby("Month")["Revenue"].sum()\n\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4))\nax1.bar(by_cat.index, by_cat.values, color="teal")\nax1.set_title("Revenue by category")\nax2.plot(monthly.index, monthly.values, marker="o")\nax2.set_title("Revenue by month")\nplt.show()\n\nprint(f"Best category: {by_cat.index[0]}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Which chart compares amounts between categories?", options: ["Line", "Bar", "Scatter", "Pie"], answer: 1, explain: "Bars for categories; lines for change over time." },
  { q: "Which chart shows whether two measurements move together?", options: ["Pie", "Bar", "Scatter", "Histogram"], answer: 2, explain: "Each point is one student: x = hours, y = score." },
  { q: "What does plt.legend() need to show names?", options: ["Nothing", "A label= on each plot call", "A title", "Two charts"], answer: 1, explain: "plt.plot(x, y, label=\"2026\")" },
  { q: "On an axes object (ax), the title is set with…", options: ["ax.title(\"…\")", "ax.set_title(\"…\")", "plt.ax(\"…\")", "ax.name = \"…\""], answer: 1, explain: "plt.title becomes ax.set_title, plt.xlabel becomes ax.set_xlabel." },
  { q: "plt.subplots(2, 3) makes…", options: ["2 charts", "6 charts in 2 rows and 3 columns", "3 charts", "A 2×3 inch figure"], answer: 1, explain: "Rows first, then columns." },
];

export default function Unit13_1(props) {
  const sections = [
    { label: "The Recipe", kicker: "DATA → PLOT → LABEL → SHOW", title: "Your first chart", blocks: [
      <P>A table of numbers tells; a chart convinces. <strong>matplotlib</strong> is Python's original charting library — almost every other one (seaborn, pandas' .plot) is built on it.</P>,
      EX.line,
    ] },
    { label: "Chart Types", kicker: "PICK THE RIGHT ONE", title: "Bar, scatter, pie", blocks: [
      <CodeBlock title="which chart?" code={'plt.plot(x, y)        # line    — change over time\nplt.bar(names, values) # bar     — compare categories\nplt.scatter(x, y)      # scatter — is there a link?\nplt.pie(values)        # pie     — parts of a whole (few parts!)'} />,
      EX.bar, EX.scatter, EX.pie,
    ] },
    { label: "Legends", kicker: "SEVERAL SERIES", title: "Two lines, one chart", blocks: [EX.legend] },
    { label: "From Data", kicker: "PANDAS + MATPLOTLIB", title: "Charts from a CSV", blocks: [EX.fromcsv, <KeyIdea>The usual flow: load (read_csv) → summarise (groupby) → plot the summary (index on x, values on y).</KeyIdea>] },
    { label: "Subplots", kicker: "fig, ax", title: "Several charts in one figure", blocks: [EX.subplots] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: sales dashboard", blocks: [
      EX.dashboard,
      <Note color={T.blue} icon="💾">On your own computer, plt.savefig("dashboard.png", dpi=150) saves the figure as an image for a report — call it before plt.show().</Note>,
    ] },
  ];
  return (
    <LessonShell {...props} unitId="Unit13_1" crumb="MODULE 13 › 1" title="Charts with Matplotlib" sections={sections} quiz={QUIZ}
      next={{ title: "13.2 — Statistical Charts with Seaborn", text: "Distributions, comparisons and correlations — one line each." }} />
  );
}
