// Unit 13.2 — Statistical Charts with Seaborn (rebuilt, typing-first)
// study.csv (hours, sleep, phone time, score) → barplot (mean + error bar) →
// histplot (distribution) → boxplot + medians → scatterplot with hue →
// correlation heatmap → Make It: find the strongest link and plot it.
// Post checks inspect the axes seaborn drew; hidden tests swap the CSV.

import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";
// Real pandas output, captured from the model solutions and checked by hand.
const OUT = {
  heatmap: "       Hours  Sleep  Phone  Score\nHours   1.00   0.71  -0.83   0.98\nSleep   0.71   1.00  -0.51   0.72\nPhone  -0.83  -0.51   1.00  -0.87\nScore   0.98   0.72  -0.87   1.00",
};

const csvFile = (name, text) => `with open(${JSON.stringify(name)}, "w") as _f:\n    _f.write(${JSON.stringify(text)})`;
const SNS = { timeoutMs: 30000 };
const py = (v) => JSON.stringify(v);
const FIG = `import matplotlib.pyplot as _plt
assert _plt.get_fignums(), "No chart was drawn."
_fig = _plt.gcf()
_fig.canvas.draw()
_ax = _fig.axes[0]
_ticks = lambda a: [t.get_text() for t in a.get_xticklabels()]
`;
const title = (t) => `assert _ax.get_title().strip().lower() == ${py(t.toLowerCase())}, "The title should be ${t} — it is '" + _ax.get_title() + "'."\n`;

const STUDY = `Name,Dept,Hours,Sleep,Phone,Score
Asha,CSE,5,7,4,82
Ben,ECE,1,5,6,35
Chen,CSE,3,6,2,67
Dev,MECH,6,8,1,91
Esha,ECE,2,6,5,58
Farah,CSE,4,7,3,74
Gopal,MECH,1,6,7,38
Hari,ECE,5,8,2,88
Isha,CSE,6,7,1,95
Jay,MECH,3,5,3,61
Kavi,ECE,2,7,6,49
Lina,CSE,4,6,5,70
`;
const STUDY2 = `Name,Dept,Hours,Sleep,Phone,Score
Arun,CIVIL,2,7,7,30
Bala,CSE,4,6,2,85
Cara,CIVIL,3,8,6,45
Dina,CSE,5,5,3,90
Eli,ECE,1,7,5,40
Fay,ECE,6,6,4,70
`;

// ── Reference simulators ──
const parse = (csv) => { const [head, ...rows] = csv.trim().split("\n"); const k = head.split(","); return rows.map((r) => Object.fromEntries(r.split(",").map((v, i) => [k[i], isNaN(+v) ? v : +v]))); };
const depts = (csv) => [...new Set(parse(csv).map((r) => r.Dept))]; // seaborn: order of first appearance
const byDept = (csv) => { const rows = parse(csv); return depts(csv).map((d) => [d, rows.filter((r) => r.Dept === d).map((r) => r.Score)]); };
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const median = (xs) => { const s = [...xs].sort((a, b) => a - b), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const pearson = (xs, ys) => { const mx = mean(xs), my = mean(ys); let sxy = 0, sxx = 0, syy = 0; xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; syy += (ys[i] - my) ** 2; }); return sxy / Math.sqrt(sxx * syy); };
const fix2 = (x) => { const s = x.toFixed(2); return s === "-0.00" ? "0.00" : s; };
const medians = (csv) => [...byDept(csv)].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([d, xs]) => `${d}: ${median(xs).toFixed(1)}`).join("\n");
const link = (csv) => {
  const rows = parse(csv), score = rows.map((r) => r.Score);
  const rs = ["Hours", "Sleep", "Phone"].map((f) => [f, pearson(rows.map((r) => r[f]), score)]);
  const best = rs.reduce((a, b) => (Math.abs(b[1]) > Math.abs(a[1]) ? b : a));
  return { text: [...rs.map(([f, r]) => `${f}: ${fix2(r)}`), `Strongest link: ${best[0]} (${best[1] > 0 ? "positive" : "negative"})`].join("\n"), best: best[0] };
};
const barCheck = (csv) => FIG + title("Average score by department") + `assert _ticks(_ax) == ${py(depts(csv))}, "One bar per department."\nassert [round(p.get_height(), 2) for p in _ax.patches] == ${py(byDept(csv).map(([, xs]) => Math.round(mean(xs) * 100) / 100))}, "Bar heights should be the mean Score per department: sns.barplot(data=df, x=\\"Dept\\", y=\\"Score\\")"\n`;
const hueCheck = (csv) => FIG + title("Hours vs score") + `assert _ax.collections and len(_ax.collections[0].get_offsets()) == ${parse(csv).length}, "Plot every student: sns.scatterplot(data=df, x=\\"Hours\\", y=\\"Score\\", ...)"\nassert _ax.get_xlabel() == "Hours" and _ax.get_ylabel() == "Score", "x should be Hours and y Score."\n_L = _ax.get_legend()\nassert _L is not None and [t.get_text() for t in _L.get_texts()] == ${py(depts(csv))}, "Colour the points by department: hue=\\"Dept\\""\n`;
const linkCheck = (csv) => { const b = link(csv).best; return FIG + `assert _ax.get_xlabel() == ${py(b)} and _ax.get_ylabel() == "Score", "Plot the strongest factor (${b}) on x against Score on y."\nassert _ax.get_title() == ${py(b + " vs Score")}, "Title the chart: ${b} vs Score"\nassert len(_ax.collections) >= 1, "Use sns.regplot to draw the points and the trend line."\nassert len(_ax.get_lines()) >= 1, "sns.regplot also draws the trend line — use regplot."\n`; };

const EX = {
  barplot: {
    ...SNS, id: "barplot", kind: "type", title: "One line, one statistical chart",
    task: <>seaborn works directly with DataFrames: name the <code>data</code>, the <code>x</code> column and the <code>y</code> column. <code>sns.barplot</code> works out each group's <strong>mean</strong> by itself, and the black line on each bar shows how uncertain that mean is.</>,
    show: 'import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\nsns.set_theme()\ndf = pd.read_csv("study.csv")\nsns.barplot(data=df, x="Dept", y="Score")\nplt.title("Average score by department")\nplt.show()',
    tests: [{ setup: csvFile("study.csv", STUDY), post: barCheck(STUDY) }],
    hints: ["No groupby needed — barplot averages each department itself."],
    solution: 'import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\nsns.set_theme()\ndf = pd.read_csv("study.csv")\nsns.barplot(data=df, x="Dept", y="Score")\nplt.title("Average score by department")\nplt.show()',
  },
  hist: {
    ...SNS, id: "hist", kind: "complete", title: "How are the scores spread?",
    task: <>A <strong>histogram</strong> shows a distribution: it cuts the range of scores into <em>bins</em> and draws how many students fall in each. Fill the blanks: a histplot of <code>Score</code> with 5 bins, titled <code>Score distribution</code>.</>,
    starter: 'import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("study.csv")\nsns.histplot(data=df, x=___, bins=___)\nplt.title(___)\nplt.show()',
    tests: [{ setup: csvFile("study.csv", STUDY), post: FIG + title("Score distribution") + `assert len(_ax.patches) == 5, "Use bins=5."\nassert sum(p.get_height() for p in _ax.patches) == 12, "Every student should be counted once — x=\\"Score\\""\nassert _ax.get_xlabel() == "Score", "Put Score on the x-axis."\n` }],
    hints: ['x="Score", bins=5', 'plt.title("Score distribution")'],
    solution: 'import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("study.csv")\nsns.histplot(data=df, x="Score", bins=5)\nplt.title("Score distribution")\nplt.show()',
  },
  box: {
    ...SNS, id: "box", kind: "write", title: "Box plots: spread per group",
    task: <>A <strong>box plot</strong> summarises a group in one shape: the line inside the box is the <em>median</em>, the box holds the middle half of the values, and the whiskers reach the rest. Draw <code>sns.boxplot(data=df, x="Dept", y="Score")</code> titled <code>Scores by department</code>. Then print each department's median with pandas (alphabetical, 1 decimal place): <code>CSE: 74.0</code>.</>,
    tests: [{ setup: csvFile("study.csv", STUDY), expect: medians(STUDY), post: FIG + title("Scores by department") + `assert _ticks(_ax) == ${py(depts(STUDY))}, "One box per department: x=\\"Dept\\", y=\\"Score\\""\n` }, { setup: csvFile("study.csv", STUDY2), expect: medians(STUDY2), hidden: true }],
    requires: [{ call: "boxplot" }, { call: "median" }],
    hints: ['meds = df.groupby("Dept")["Score"].median()', 'for dept, m in meds.items(): print(f"{dept}: {m:.1f}")'],
    solution: 'import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("study.csv")\nsns.boxplot(data=df, x="Dept", y="Score")\nplt.title("Scores by department")\nplt.show()\n\nmeds = df.groupby("Dept")["Score"].median()\nfor dept, m in meds.items():\n    print(f"{dept}: {m:.1f}")',
  },
  hue: {
    ...SNS, id: "hue", kind: "write", title: "The hue superpower",
    task: <>Add <code>hue="Dept"</code> and seaborn colours every point by department and adds the legend itself. Draw a scatterplot of <code>Hours</code> (x) against <code>Score</code> (y), coloured by Dept, titled <code>Hours vs score</code>.</>,
    tests: [{ setup: csvFile("study.csv", STUDY), post: hueCheck(STUDY) }, { setup: csvFile("study.csv", STUDY2), post: hueCheck(STUDY2), hidden: true }],
    requires: [{ call: "scatterplot" }, { call: "read_csv" }],
    hints: ['sns.scatterplot(data=df, x="Hours", y="Score", hue="Dept")', 'plt.title("Hours vs score")'],
    solution: 'import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("study.csv")\nsns.scatterplot(data=df, x="Hours", y="Score", hue="Dept")\nplt.title("Hours vs score")\nplt.show()',
  },
  heatmap: {
    ...SNS, id: "heatmap", kind: "complete", title: "Correlation heatmap",
    task: <><strong>Correlation</strong> (r) measures how strongly two columns move together: +1 = rise together, −1 = one rises as the other falls, 0 = no link. <code>df[cols].corr()</code> computes every pair; a heatmap colours them. Fill the blanks: print the table rounded to 2 places, then draw it with <code>annot=True</code> (numbers in the cells) and <code>cmap="coolwarm"</code>.</>,
    starter: 'import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("study.csv")\ncorr = df[["Hours", "Sleep", "Phone", "Score"]].___()\nprint(corr.round(___))\nsns.heatmap(corr, annot=___, cmap=___)\nplt.title("What goes with a good score?")\nplt.show()',
    tests: [{ setup: csvFile("study.csv", STUDY), expect: OUT.heatmap, post: FIG + `assert len(_ax.texts) == 16, "Write the numbers in the cells: annot=True"\nassert _ax.collections and _ax.collections[0].get_cmap().name == "coolwarm", "Use cmap=\\"coolwarm\\""\n` }],
    requires: [{ call: "corr" }, { call: "heatmap" }],
    hints: [".corr()", "corr.round(2)", 'annot=True, cmap="coolwarm"'],
    solution: 'import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("study.csv")\ncorr = df[["Hours", "Sleep", "Phone", "Score"]].corr()\nprint(corr.round(2))\nsns.heatmap(corr, annot=True, cmap="coolwarm")\nplt.title("What goes with a good score?")\nplt.show()',
  },
  link: {
    ...SNS, id: "link", kind: "make", title: "Find the strongest link",
    task: <>Load study.csv. For each of <code>Hours</code>, <code>Sleep</code>, <code>Phone</code>, print its correlation with Score (2 places): <code>Hours: 0.98</code> (tip: <code>df["Hours"].corr(df["Score"])</code>). Find the factor with the <strong>largest absolute</strong> correlation and print <code>Strongest link: Hours (positive)</code> — or <code>(negative)</code>. Then plot that factor against Score with <code>sns.regplot</code> (points plus a trend line), titled <code>Hours vs Score</code> (the factor's name). Hidden tests use another class — whose strongest link may be different.</>,
    minLines: 14,
    tests: [{ setup: csvFile("study.csv", STUDY), expect: link(STUDY).text, post: linkCheck(STUDY) }, { setup: csvFile("study.csv", STUDY2), expect: link(STUDY2).text, post: linkCheck(STUDY2), hidden: true, why: "In this class a different factor matters most — pick it with abs(), don't assume Hours." }],
    requires: [{ call: "regplot" }, { call: "corr" }, { call: "abs" }],
    hints: ['for f in ["Hours", "Sleep", "Phone"]: r = df[f].corr(df["Score"])', "Keep track of the best: if abs(r) > abs(best_r): …", 'sns.regplot(data=df, x=best, y="Score"); plt.title(f"{best} vs Score")'],
    solution: 'import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("study.csv")\nbest, best_r = None, 0\nfor f in ["Hours", "Sleep", "Phone"]:\n    r = df[f].corr(df["Score"])\n    print(f"{f}: {r:.2f}")\n    if abs(r) > abs(best_r):\n        best, best_r = f, r\n\ndirection = "positive" if best_r > 0 else "negative"\nprint(f"Strongest link: {best} ({direction})")\nsns.regplot(data=df, x=best, y="Score")\nplt.title(f"{best} vs Score")\nplt.show()',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What does sns.barplot show on each bar by default?", options: ["The total", "The mean, with an error bar for its uncertainty", "The median", "The count"], answer: 1, explain: "Use estimator=\"sum\" if you want totals instead." },
  { q: "A histogram shows…", options: ["Categories compared", "How values are distributed across ranges (bins)", "A trend over time", "Parts of a whole"], answer: 1, explain: "Each bar = how many values fall in that range." },
  { q: "In a box plot, the line inside the box is the…", options: ["Mean", "Median", "Maximum", "Mode"], answer: 1, explain: "The box itself covers the middle 50% of values." },
  { q: "Correlation r = −0.9 between phone time and score means…", options: ["No link", "More phone time goes with lower scores, strongly", "Phone time causes low scores", "Higher scores go with more phone time"], answer: 1, explain: "Strong negative link. Correlation alone doesn't prove one causes the other!" },
  { q: "What does hue=\"Dept\" do?", options: ["Sorts by Dept", "Colours each point by its department and adds a legend", "Filters to one department", "Nothing"], answer: 1, explain: "hue splits the data into coloured groups." },
];

export default function Unit13_2(props) {
  const sections = [
    { label: "The One-Liner", kicker: "import seaborn as sns", title: "Statistical charts in one line", blocks: [
      <P><strong>seaborn</strong> is built on matplotlib, but it thinks in DataFrames and statistics: give it the table and the column names, and it averages, counts and colours for you. Our data: twelve students' study hours, sleep, phone time and exam score.</P>,
      <CodeBlock title="study.csv (first rows)" code={STUDY.split("\n").slice(0, 5).join("\n") + "\n…"} />,
      EX.barplot,
    ] },
    { label: "Distributions", kicker: "histplot · boxplot", title: "How are values spread?", blocks: [EX.hist, EX.box, <KeyIdea>An average hides a lot. Two departments with the same mean can be very different — one tightly bunched, one spread from 30 to 95. Always look at the distribution.</KeyIdea>] },
    { label: "hue", kicker: "COLOUR BY GROUP", title: "The hue superpower", blocks: [EX.hue] },
    { label: "Correlation", kicker: "−1 … 0 … +1", title: "What goes with what?", blocks: [
      EX.heatmap,
      <Note color={T.orange} icon="⚠️">Correlation is not causation. Students who study more may also sleep more and sit at the front — the chart shows a link, not the reason.</Note>,
    ] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: find the strongest link", blocks: [EX.link] },
  ];
  return (
    <LessonShell {...props} unitId="Unit13_2" crumb="MODULE 13 › 2" title="Statistical Charts with Seaborn" sections={sections} quiz={QUIZ}
      next={{ title: "13.3 — Interactive Charts with Plotly", text: "Charts you can hover, zoom and share." }} />
  );
}
