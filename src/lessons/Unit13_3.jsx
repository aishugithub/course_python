// Unit 13.3 — Interactive Charts with Plotly (rebuilt, typing-first)
// px.bar (hover, zoom) → px.line from grouped sales → px.scatter with color /
// hover_data → px.pie donut → styling with update_layout / update_traces →
// Make It: an interactive class explorer (two figures).
// fig.show() is captured by the runner and rendered as a live chart; post
// checks inspect the figure objects (fig.data, fig.layout). Hidden tests swap the CSV.

import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const csvFile = (name, text) => `with open(${JSON.stringify(name)}, "w") as _f:\n    _f.write(${JSON.stringify(text)})`;
const PX = { timeoutMs: 30000 };
const py = (v) => JSON.stringify(v);
const figVar = (name) => `assert ${py(name)} in globals(), "Store the chart in a variable called ${name}."\n_f = ${name}\n`;
const nums = (expr) => `[round(float(v), 2) for v in ${expr}]`;
const titled = (t) => `assert (_f.layout.title.text or "").strip().lower() == ${py(t.toLowerCase())}, "Give the chart the title ${t} (title=...)."\n`;
const shown = `assert _fh_shown(), "Call fig.show() to display the chart."\n`;

const SALES = "Date,Item,Category,Qty,Price\n2026-01-05,Pen,Stationery,10,15\n2026-01-07,Notebook,Stationery,5,60\n2026-01-12,Headphones,Electronics,2,1200\n2026-01-20,Mouse,Electronics,3,450\n2026-02-02,Pen,Stationery,20,15\n2026-02-14,Mug,Kitchen,6,250\n2026-02-18,Notebook,Stationery,8,60\n2026-02-25,Mouse,Electronics,1,450\n2026-03-03,Mug,Kitchen,4,250\n2026-03-10,Headphones,Electronics,1,1200\n2026-03-15,Pen,Stationery,15,15\n2026-03-28,Bottle,Kitchen,5,300\n";
const SALES2 = "Date,Item,Category,Qty,Price\n2026-04-02,Ball,Sports,4,350\n2026-04-09,Racket,Sports,2,1800\n2026-04-15,Pen,Stationery,30,15\n2026-05-01,Lamp,Home,2,950\n2026-05-11,Ball,Sports,6,350\n2026-05-20,Cushion,Home,5,400\n2026-06-03,Racket,Sports,1,1800\n2026-06-17,Lamp,Home,2,950\n2026-06-25,Pen,Stationery,12,15\n";
const STUDY = "Name,Dept,Hours,Sleep,Phone,Score\nAsha,CSE,5,7,4,82\nBen,ECE,1,5,6,35\nChen,CSE,3,6,2,67\nDev,MECH,6,8,1,91\nEsha,ECE,2,6,5,58\nFarah,CSE,4,7,3,74\nGopal,MECH,1,6,7,38\nHari,ECE,5,8,2,88\nIsha,CSE,6,7,1,95\nJay,MECH,3,5,3,61\nKavi,ECE,2,7,6,49\nLina,CSE,4,6,5,70\n";
const STUDY2 = "Name,Dept,Hours,Sleep,Phone,Score\nArun,CIVIL,2,7,7,30\nBala,CSE,4,6,2,85\nCara,CIVIL,3,8,6,45\nDina,CSE,5,5,3,90\nEli,ECE,1,7,5,40\nFay,ECE,6,6,4,70\n";

// ── Reference values ──
const parse = (csv) => { const [head, ...rows] = csv.trim().split("\n"); const k = head.split(","); return rows.map((r) => Object.fromEntries(r.split(",").map((v, i) => [k[i], isNaN(+v) ? v : +v]))); };
const sumBy = (rows, key) => { const m = new Map(); rows.forEach((r) => m.set(r[key], (m.get(r[key]) || 0) + r.Qty * r.Price)); return [...m].sort((a, b) => (a[0] < b[0] ? -1 : 1)); };
const months = (csv) => sumBy(parse(csv).map((r) => ({ ...r, Month: r.Date.slice(0, 7) })), "Month");
const cats = (csv) => sumBy(parse(csv), "Category");
const depts = (csv) => [...new Set(parse(csv).map((r) => r.Dept))];
const lineCheck = (csv) => figVar("fig") + titled("Revenue by month") + `assert _f.data and _f.data[0].type == "scatter" and "lines" in (_f.data[0].mode or "lines"), "Use px.line."\nassert "markers" in (_f.data[0].mode or ""), "Show a dot on each month: markers=True"\nassert [str(x) for x in _f.data[0].x] == ${py(months(csv).map((m) => m[0]))}, "x should be the months, in date order."\nassert ${nums("_f.data[0].y")} == ${py(months(csv).map((m) => m[1]))}, "y should be the total revenue of each month."\n` + shown;
const pieCheck = (csv) => figVar("fig") + `assert _f.data and _f.data[0].type == "pie", "Use px.pie."\nassert sorted([[str(a), round(float(b), 2)] for a, b in zip(_f.data[0].labels, _f.data[0].values)]) == ${py(cats(csv))}, "One slice per category, sized by its total revenue."\nassert _f.data[0].hole == 0.4, "Make it a donut: hole=0.4"\n` + shown;
const scatterCheck = (csv) => figVar("fig") + titled("Hours vs score") + `assert [t.type for t in _f.data] == ["scatter"] * ${depts(csv).length} and [t.name for t in _f.data] == ${py(depts(csv))}, "Colour the points by department: color=\\"Dept\\""\nassert sum(len(t.x) for t in _f.data) == ${parse(csv).length}, "Plot every student."\nassert _f.layout.xaxis.title.text == "Hours" and _f.layout.yaxis.title.text == "Score", "x = Hours, y = Score"\nassert "Name" in (_f.data[0].hovertemplate or ""), "Show the student's name on hover: hover_data=[\\"Name\\"]"\n` + shown;
const explorer = (csv) => { const rows = parse(csv); const top = rows.reduce((a, b) => (b.Score > a.Score ? b : a)); return `Students: ${rows.length}\nTop student: ${top.Name} (${top.Score})`; };
const explorerCheck = (csv) => figVar("fig1") + `assert _f.data and _f.data[0].type == "histogram", "fig1: use px.histogram."\nassert [t.name for t in _f.data] == ${py(depts(csv))}, "fig1: colour the bars by department: color=\\"Dept\\""\nassert _f.data[0].nbinsx == 5, "fig1: nbins=5"\n` + titled("Score distribution") + figVar("fig2") + `assert [t.name for t in _f.data] == ${py(depts(csv))}, "fig2: px.scatter coloured by department."\nassert _f.layout.xaxis.title.text == "Hours" and _f.layout.yaxis.title.text == "Score", "fig2: x = Hours, y = Score"\nassert _f.data[0].marker.size is not None and len(_f.data[0].marker.size) == len(_f.data[0].x), "fig2: size the dots by sleep: size=\\"Sleep\\""\nassert _f.data[0].hovertext is not None, "fig2: hover_name=\\"Name\\" puts the name at the top of the hover box."\nassert _fh_shown() >= 2, "Show both figures: fig1.show() and fig2.show()."\n`;

const EX = {
  first: {
    ...PX, id: "first", kind: "type", title: "A chart you can touch",
    task: <><code>plotly.express</code> (as <code>px</code>) makes charts that live in a web page: hover a bar to see its value, drag to zoom, double-click to reset. One call builds the figure; <code>fig.show()</code> displays it.</>,
    show: 'import pandas as pd\nimport plotly.express as px\n\ndf = pd.DataFrame({\n    "Name": ["Asha", "Ben", "Chen", "Dev", "Esha"],\n    "Marks": [82, 35, 67, 91, 58],\n})\nfig = px.bar(df, x="Name", y="Marks", title="Marks by student")\nfig.show()',
    tests: [{ post: figVar("fig") + titled("Marks by student") + `assert _f.data[0].type == "bar", "Use px.bar."\nassert ${nums("_f.data[0].y")} == [82, 35, 67, 91, 58], "y should be the Marks column."\n` + shown }],
    hints: ["Hover the bars once the chart appears below — it's a live web chart."],
    solution: 'import pandas as pd\nimport plotly.express as px\n\ndf = pd.DataFrame({\n    "Name": ["Asha", "Ben", "Chen", "Dev", "Esha"],\n    "Marks": [82, 35, 67, 91, 58],\n})\nfig = px.bar(df, x="Name", y="Marks", title="Marks by student")\nfig.show()',
  },
  line: {
    ...PX, id: "line", kind: "write", title: "Revenue over time",
    task: <>Load the shop's <code>sales.csv</code> (12.2), add Revenue and Month (<code>Date.str[:7]</code>), and total Revenue per Month. plotly wants a DataFrame, so finish with <code>.reset_index()</code>. Draw <code>fig = px.line(monthly, x="Month", y="Revenue", markers=True, title="Revenue by month")</code> and show it. Hidden tests use another shop.</>,
    tests: [{ setup: csvFile("sales.csv", SALES), post: lineCheck(SALES) }, { setup: csvFile("sales.csv", SALES2), post: lineCheck(SALES2), hidden: true }],
    requires: [{ call: "line" }, { call: "groupby" }],
    hints: ['monthly = df.groupby("Month")["Revenue"].sum().reset_index()', "reset_index turns the grouped Series back into a table with Month and Revenue columns."],
    solution: 'import pandas as pd\nimport plotly.express as px\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\ndf["Month"] = df["Date"].str[:7]\nmonthly = df.groupby("Month")["Revenue"].sum().reset_index()\nfig = px.line(monthly, x="Month", y="Revenue", markers=True, title="Revenue by month")\nfig.show()',
  },
  scatter: {
    ...PX, id: "scatter", kind: "write", title: "Hover to see who",
    task: <>Load <code>study.csv</code> (13.2). Draw <code>fig = px.scatter(…)</code> of Hours (x) against Score (y), coloured by Dept, with <code>hover_data=["Name"]</code> so hovering a dot shows whose it is. Title it <code>Hours vs score</code>. Click a department in the legend to hide it — interactivity for free.</>,
    tests: [{ setup: csvFile("study.csv", STUDY), post: scatterCheck(STUDY) }, { setup: csvFile("study.csv", STUDY2), post: scatterCheck(STUDY2), hidden: true }],
    requires: [{ call: "scatter" }, { call: "read_csv" }],
    hints: ['px.scatter(df, x="Hours", y="Score", color="Dept", hover_data=["Name"], title="Hours vs score")'],
    solution: 'import pandas as pd\nimport plotly.express as px\n\ndf = pd.read_csv("study.csv")\nfig = px.scatter(df, x="Hours", y="Score", color="Dept", hover_data=["Name"], title="Hours vs score")\nfig.show()',
  },
  pie: {
    ...PX, id: "pie", kind: "complete", title: "A donut chart",
    task: <>Fill the blanks: total Revenue per Category from sales.csv, then <code>px.pie</code> with <code>values</code> = the Revenue column, <code>names</code> = the Category column, and <code>hole=0.4</code> to make a donut.</>,
    starter: 'import pandas as pd\nimport plotly.express as px\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\nby_cat = df.groupby("Category")["Revenue"].sum().reset_index()\nfig = px.pie(by_cat, values=___, names=___, hole=___, title="Where the money comes from")\nfig.show()',
    tests: [{ setup: csvFile("sales.csv", SALES), post: pieCheck(SALES) }, { setup: csvFile("sales.csv", SALES2), post: pieCheck(SALES2), hidden: true }],
    requires: [{ call: "pie" }],
    hints: ['values="Revenue", names="Category", hole=0.4'],
    solution: 'import pandas as pd\nimport plotly.express as px\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\nby_cat = df.groupby("Category")["Revenue"].sum().reset_index()\nfig = px.pie(by_cat, values="Revenue", names="Category", hole=0.4, title="Where the money comes from")\nfig.show()',
  },
  style: {
    ...PX, id: "style", kind: "type", title: "Polish the figure",
    task: <>Once a figure exists, change it: <code>update_layout</code> for the whole chart (titles, theme), <code>update_traces</code> for the marks themselves (colour, text).</>,
    show: 'import pandas as pd\nimport plotly.express as px\n\ndf = pd.DataFrame({"Name": ["Asha", "Ben", "Chen"], "Marks": [82, 35, 67]})\nfig = px.bar(df, x="Name", y="Marks", text="Marks")\nfig.update_layout(title="Marks", xaxis_title="Student", template="plotly_white")\nfig.update_traces(marker_color="teal", textposition="outside")\nfig.show()',
    tests: [{ post: figVar("fig") + `assert _f.layout.xaxis.title.text == "Student", "update_layout(xaxis_title=\\"Student\\")"\nassert _f.data[0].marker.color == "teal", "update_traces(marker_color=\\"teal\\")"\nassert _f.data[0].textposition == "outside", "update_traces(textposition=\\"outside\\")"\nassert _f.layout.template.layout.paper_bgcolor == "white", "template=\\"plotly_white\\""\n` + shown }],
    hints: ["text=\"Marks\" writes each value on its bar; textposition moves it above."],
    solution: 'import pandas as pd\nimport plotly.express as px\n\ndf = pd.DataFrame({"Name": ["Asha", "Ben", "Chen"], "Marks": [82, 35, 67]})\nfig = px.bar(df, x="Name", y="Marks", text="Marks")\nfig.update_layout(title="Marks", xaxis_title="Student", template="plotly_white")\nfig.update_traces(marker_color="teal", textposition="outside")\nfig.show()',
  },
  explorer: {
    ...PX, id: "explorer", kind: "make", title: "Interactive class explorer",
    task: <>Load study.csv. Print <code>Students: 12</code> and <code>Top student: Isha (95)</code> (the highest Score). Then build two figures and show both: <code>fig1</code> — <code>px.histogram</code> of Score coloured by Dept, <code>nbins=5</code>, titled <code>Score distribution</code>; <code>fig2</code> — <code>px.scatter</code> of Hours vs Score coloured by Dept, dot <code>size="Sleep"</code> and <code>hover_name="Name"</code>. Hidden tests use another class.</>,
    minLines: 10,
    tests: [{ setup: csvFile("study.csv", STUDY), expect: explorer(STUDY), post: explorerCheck(STUDY) }, { setup: csvFile("study.csv", STUDY2), expect: explorer(STUDY2), post: explorerCheck(STUDY2), hidden: true, why: "Another class: count and find the top student from the DataFrame." }],
    requires: [{ call: "histogram" }, { call: "scatter" }],
    hints: ['top = df.loc[df["Score"].idxmax()] — a whole row; top["Name"], top["Score"]', 'fig1 = px.histogram(df, x="Score", color="Dept", nbins=5, title="Score distribution")', 'fig2 = px.scatter(df, x="Hours", y="Score", color="Dept", size="Sleep", hover_name="Name")'],
    solution: 'import pandas as pd\nimport plotly.express as px\n\ndf = pd.read_csv("study.csv")\ntop = df.loc[df["Score"].idxmax()]\nprint(f"Students: {len(df)}")\nprint(f"Top student: {top[\'Name\']} ({top[\'Score\']})")\n\nfig1 = px.histogram(df, x="Score", color="Dept", nbins=5, title="Score distribution")\nfig1.show()\nfig2 = px.scatter(df, x="Hours", y="Score", color="Dept", size="Sleep", hover_name="Name", title="Hours vs score (dot size = sleep)")\nfig2.show()',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What makes a plotly chart different from a matplotlib one?", options: ["It's prettier", "It's interactive: hover, zoom, hide series — it lives in a web page", "It's faster", "It doesn't need data"], answer: 1, explain: "plotly draws with JavaScript in the browser." },
  { q: "px.scatter(df, x=\"Hours\", y=\"Score\", color=\"Dept\") creates…", options: ["One trace", "One trace per department, each its own colour", "A bar chart", "A legend only"], answer: 1, explain: "color splits the data into groups, like seaborn's hue." },
  { q: "hover_data=[\"Name\"] …", options: ["Hides names", "Adds the Name column to the hover box", "Sorts by Name", "Colours by Name"], answer: 1, explain: "Extra columns appear when you hover a point." },
  { q: "Why .reset_index() before px.line?", options: ["To delete data", "plotly wants columns in a DataFrame — reset_index turns the grouped Series into a table", "To sort", "It's required by pandas"], answer: 1, explain: "Then x=\"Month\" and y=\"Revenue\" are real columns." },
  { q: "update_traces vs update_layout?", options: ["Same thing", "traces = the marks (bars, dots, colours); layout = the chart around them (titles, axes, theme)", "layout = colours", "traces = titles"], answer: 1, explain: "fig.update_traces(marker_color=…), fig.update_layout(title=…)." },
];

export default function Unit13_3(props) {
  const sections = [
    { label: "The Recipe", kicker: "import plotly.express as px", title: "A chart you can touch", blocks: [
      <P>matplotlib and seaborn make pictures. <strong>plotly</strong> makes small web apps: every chart can be hovered, zoomed, panned and saved, and shared as a web page. <code>plotly.express</code> builds a whole figure from a DataFrame in one call.</P>,
      EX.first,
    ] },
    { label: "Lines & Dots", kicker: "px.line · px.scatter", title: "Trends and links", blocks: [EX.line, EX.scatter] },
    { label: "Parts", kicker: "px.pie", title: "Parts of a whole", blocks: [EX.pie] },
    { label: "Polish", kicker: "update_layout · update_traces", title: "Styling a figure", blocks: [
      EX.style,
      <CodeBlock title="share it" code={'fig.write_html("chart.html")   # a web page anyone can open — still interactive'} />,
    ] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: class explorer", blocks: [
      EX.explorer,
      <KeyIdea>Pick the tool for the job: matplotlib for full control and print, seaborn for quick statistical pictures, plotly when people will explore the data themselves.</KeyIdea>,
      <Note color={T.blue} icon="🏁">That's the whole journey: from print("Hello") to interactive dashboards. Next: the Finish Line.</Note>,
    ] },
  ];
  return (
    <LessonShell {...props} unitId="Unit13_3" crumb="MODULE 13 › 3" title="Interactive Charts with Plotly" sections={sections} quiz={QUIZ}
      next={{ title: "The Finish Line", text: "Module 13 complete! Give your feedback and claim your course certificate." }} />
  );
}
