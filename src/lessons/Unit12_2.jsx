// Unit 12.2 — Analysing Real Data (new, typing-first)
// A shop's sales.csv: computed columns → groupby (split–apply–combine) and
// value_counts → named aggregation → missing values (isna / dropna / fillna)
// → saving results with to_csv (post checks read the saved file) →
// Make It: a monthly sales report. Hidden tests swap in a different shop.

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";
// Real pandas output, captured from the model solutions and checked by hand.
const OUT = {
  revenue: "         Date        Item     Category  Qty  Price  Revenue\n0  2026-01-05         Pen   Stationery   10     15      150\n1  2026-01-07    Notebook   Stationery    5     60      300\n2  2026-01-12  Headphones  Electronics    2   1200     2400\n3  2026-01-20       Mouse  Electronics    3    450     1350\n4  2026-02-02         Pen   Stationery   20     15      300\nOrders: 12\nTotal revenue: 10855",
  groupby: "Category\nElectronics    5400\nKitchen        4000\nStationery     1455\nName: Revenue, dtype: int64\nCategory\nStationery     1455\nKitchen        4000\nElectronics    5400\nName: Revenue, dtype: int64\nItem\nPen           3\nNotebook      2\nHeadphones    2\nMouse         2\nMug           2\nBottle        1\nName: count, dtype: int64",
  units: "Group by: Item\nItem\nPen           45\nNotebook      13\nMug           10\nBottle         5\nMouse          4\nHeadphones     3\nName: Qty, dtype: int64\nBest: Pen (45)",
  units2: "Group by: Category\nCategory\nStationery     58\nKitchen        15\nElectronics     7\nName: Qty, dtype: int64\nBest: Stationery (58)",
  units3: "Group by: Item\nItem\nPen        42\nBall       10\nCushion     5\nLamp        4\nRacket      3\nName: Qty, dtype: int64\nBest: Pen (42)",
  agg: "             Orders  Units  Revenue  Average\nCategory                                    \nElectronics       4      7     5400   1350.0\nKitchen           3     15     4000   1333.3\nStationery        5     58     1455    291.0",
  agg2: "            Orders  Units  Revenue  Average\nCategory                                   \nHome             3      9     5800   1933.3\nSports           4     13     8900   2225.0\nStationery       2     42      630    315.0",
  missing: "Missing values:\nDate        0\nItem        2\nCategory    0\nQty         2\nPrice       0\ndtype: int64\nRows kept: 8\nUnits: 44",
  missing2: "Missing values:\nDate        0\nItem        1\nCategory    0\nQty         1\nPrice       0\ndtype: int64\nRows kept: 4\nUnits: 10",
};

const csvFile = (name, text) => `import os\nfor _n in ["summary.csv"]:\n    if os.path.exists(_n): os.remove(_n)\nwith open(${JSON.stringify(name)}, "w") as _f:\n    _f.write(${JSON.stringify(text)})`;
const SALES = `Date,Item,Category,Qty,Price
2026-01-05,Pen,Stationery,10,15
2026-01-07,Notebook,Stationery,5,60
2026-01-12,Headphones,Electronics,2,1200
2026-01-20,Mouse,Electronics,3,450
2026-02-02,Pen,Stationery,20,15
2026-02-14,Mug,Kitchen,6,250
2026-02-18,Notebook,Stationery,8,60
2026-02-25,Mouse,Electronics,1,450
2026-03-03,Mug,Kitchen,4,250
2026-03-10,Headphones,Electronics,1,1200
2026-03-15,Pen,Stationery,15,15
2026-03-28,Bottle,Kitchen,5,300
`;
const SALES2 = `Date,Item,Category,Qty,Price
2026-04-02,Ball,Sports,4,350
2026-04-09,Racket,Sports,2,1800
2026-04-15,Pen,Stationery,30,15
2026-05-01,Lamp,Home,2,950
2026-05-11,Ball,Sports,6,350
2026-05-20,Cushion,Home,5,400
2026-06-03,Racket,Sports,1,1800
2026-06-17,Lamp,Home,2,950
2026-06-25,Pen,Stationery,12,15
`;
const RAW = `Date,Item,Category,Qty,Price
2026-01-05,Pen,Stationery,10,15
2026-01-07,,Stationery,5,60
2026-01-12,Headphones,Electronics,,1200
2026-01-20,Mouse,Electronics,3,450
2026-02-02,Pen,Stationery,20,15
2026-02-14,Mug,Kitchen,6,250
2026-02-18,Notebook,Stationery,,60
2026-02-25,,Electronics,1,450
2026-03-03,Mug,Kitchen,4,250
2026-03-10,Headphones,Electronics,1,1200
`;
const RAW2 = `Date,Item,Category,Qty,Price
2026-04-02,Ball,Sports,,350
2026-04-09,Racket,Sports,2,1800
2026-04-15,,Stationery,30,15
2026-05-01,Lamp,Home,2,950
2026-05-11,Ball,Sports,6,350
`;
const PD = { timeoutMs: 20000 };
const pdCalls = (...names) => names.map((n) => ({ call: n }));

// ── Reference simulator for the monthly report (plain lines, no pandas tables) ──
const parse = (csv) => { const [head, ...rows] = csv.trim().split("\n"); const k = head.split(","); return rows.map((r) => Object.fromEntries(r.split(",").map((v, i) => [k[i], v]))); };
const sumBy = (rows, key) => { const m = new Map(); rows.forEach((r) => m.set(key(r), (m.get(key(r)) || 0) + r.Qty * r.Price)); return m; };
function monthly(csv) {
  const rows = parse(csv);
  const months = [...sumBy(rows, (r) => r.Date.slice(0, 7))].sort((a, b) => (a[0] < b[0] ? -1 : 1));
  const best = months.reduce((a, b) => (b[1] > a[1] ? b : a));
  const items = [...sumBy(rows, (r) => r.Item)].reduce((a, b) => (b[1] > a[1] ? b : a));
  const total = rows.reduce((s, r) => s + r.Qty * r.Price, 0);
  return [...months.map(([m, v]) => `${m}: ${v}`), `Best month: ${best[0]}`, `Top item: ${items[0]} (${items[1]})`, `Total: ${total}`, `Average order: ${(total / rows.length).toFixed(2)}`].join("\n");
}
const catRevenue = (csv) => [...sumBy(parse(csv), (r) => r.Category)].sort((a, b) => b[1] - a[1]);
const savedCheck = (csv) => {
  const rows = catRevenue(csv);
  return `import pandas as _pd, os as _os\nassert _os.path.exists("summary.csv"), "summary.csv was not saved — use to_csv."\n_s = _pd.read_csv("summary.csv")\nassert list(_s.columns) == ["Category", "Revenue"], f"summary.csv should have the columns Category, Revenue (and no index column) — it has {list(_s.columns)}"\nassert _s["Category"].tolist() == ${JSON.stringify(rows.map((r) => r[0]))}, "Categories should be sorted by revenue, highest first."\nassert _s["Revenue"].tolist() == ${JSON.stringify(rows.map((r) => r[1]))}, "The revenue totals in summary.csv are not right."`;
};

// ── Widget: split → apply → combine ──
function SplitApplyCombine() {
  const rows = [["Stationery", 150], ["Electronics", 2400], ["Stationery", 300], ["Kitchen", 1500], ["Electronics", 1350], ["Kitchen", 1000]];
  const cats = ["Electronics", "Kitchen", "Stationery"];
  const col = { Electronics: T.blue, Kitchen: T.orange, Stationery: T.teal };
  const box = { border: `1px solid ${T.border}`, borderRadius: 10, padding: 10, background: T.card, fontFamily: CODE_FONT, fontSize: 13.5 };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, alignItems: "start" }}>
      <div style={box}><div style={{ color: T.muted, marginBottom: 6 }}>table</div>{rows.map(([c, v], i) => <div key={i} style={{ color: col[c] }}>{c} {v}</div>)}</div>
      <div style={box}><div style={{ color: T.muted, marginBottom: 6 }}>1 · split by Category</div>{cats.map((c) => <div key={c} style={{ background: tint(col[c], "14"), borderRadius: 6, padding: "4px 6px", marginBottom: 4, color: col[c] }}>{rows.filter((r) => r[0] === c).map((r) => r[1]).join(", ")}</div>)}</div>
      <div style={box}><div style={{ color: T.muted, marginBottom: 6 }}>2 · apply sum()  3 · combine</div>{cats.map((c) => <div key={c} style={{ color: col[c] }}>{c.padEnd(12, " ")}{rows.filter((r) => r[0] === c).reduce((s, r) => s + r[1], 0)}</div>)}</div>
    </div>
  );
}

const EX = {
  revenue: {
    ...PD, id: "revenue", kind: "type", title: "A computed column",
    task: <>A shop exported its sales as <code>sales.csv</code> (one row per order). Revenue isn't in the file — compute it for every row at once.</>,
    show: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\nprint(df.head())\nprint(f"Orders: {len(df)}")\nprint(f"Total revenue: {df[\'Revenue\'].sum()}")',
    tests: [{ setup: csvFile("sales.csv", SALES), expect: OUT.revenue }],
    requires: pdCalls("read_csv"),
    hints: ["head() with no number shows the first five rows."],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\nprint(df.head())\nprint(f"Orders: {len(df)}")\nprint(f"Total revenue: {df[\'Revenue\'].sum()}")',
  },
  groupby: {
    ...PD, id: "groupby", kind: "type", title: "groupby and value_counts",
    task: <><code>df.groupby("Category")["Revenue"].sum()</code> reads: split the rows by Category, take Revenue, sum each group. <code>value_counts()</code> counts how often each value appears — most common first.</>,
    show: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\nby_cat = df.groupby("Category")["Revenue"].sum()\nprint(by_cat)\nprint(by_cat.sort_values())\nprint(df["Item"].value_counts())',
    tests: [{ setup: csvFile("sales.csv", SALES), expect: OUT.groupby }],
    requires: pdCalls("groupby", "value_counts"),
    hints: ["groupby sorts the group names alphabetically; sort_values() re-orders by the totals, smallest first."],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\nby_cat = df.groupby("Category")["Revenue"].sum()\nprint(by_cat)\nprint(by_cat.sort_values())\nprint(df["Item"].value_counts())',
  },
  units: {
    ...PD, id: "units", kind: "write", title: "Units sold by…",
    task: <>Load sales.csv. Ask <code>Group by: </code> (a column name such as <code>Item</code> or <code>Category</code>). Print the total <code>Qty</code> for each group, highest first (a Series — just print it), then <code>Best: Pen (45)</code> using the first entry: <code>.index[0]</code> and <code>.iloc[0]</code>.</>,
    tests: [
      { setup: csvFile("sales.csv", SALES), inputs: ["Item"], expect: OUT.units },
      { setup: csvFile("sales.csv", SALES), inputs: ["Category"], expect: OUT.units2, hidden: true, why: "Use the typed column name inside groupby( ) — don't write Item yourself." },
      { setup: csvFile("sales.csv", SALES2), inputs: ["Item"], expect: OUT.units3, hidden: true },
    ],
    requires: pdCalls("groupby", "sort_values"),
    hints: ['totals = df.groupby(col)["Qty"].sum().sort_values(ascending=False)', 'print(f"Best: {totals.index[0]} ({totals.iloc[0]})")'],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\ncol = input("Group by: ")\ntotals = df.groupby(col)["Qty"].sum().sort_values(ascending=False)\nprint(totals)\nprint(f"Best: {totals.index[0]} ({totals.iloc[0]})")',
  },
  agg: {
    ...PD, id: "agg", kind: "complete", title: "Several summaries at once",
    task: <><code>.agg(…)</code> computes several summaries per group, each named <code>NewName=("column", "function")</code>. Fill the blanks: for each category, the number of orders (<code>"count"</code>), the units sold, and the total and average revenue.</>,
    starter: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\nsummary = df.groupby("Category").agg(\n    Orders=("Item", "count"),\n    Units=("Qty", ___),\n    Revenue=(___, "sum"),\n    Average=("Revenue", ___),\n)\nprint(summary.round(1))',
    tests: [{ setup: csvFile("sales.csv", SALES), expect: OUT.agg }, { setup: csvFile("sales.csv", SALES2), expect: OUT.agg2, hidden: true }],
    requires: pdCalls("agg"),
    hints: ['"sum"', '"Revenue"', '"mean"'],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\nsummary = df.groupby("Category").agg(\n    Orders=("Item", "count"),\n    Units=("Qty", "sum"),\n    Revenue=("Revenue", "sum"),\n    Average=("Revenue", "mean"),\n)\nprint(summary.round(1))',
  },
  missing: {
    ...PD, id: "missing", kind: "fix", title: "Messy data",
    task: <>Real files have gaps. In <code>sales_raw.csv</code> some orders have no Item and some no Qty — pandas reads an empty cell as <code>NaN</code> (“not a number”), and this program crashes. Run it. Then fix it: first print <code>Missing values:</code> and <code>df.isna().sum()</code>; drop the rows with no Item (<code>dropna(subset=["Item"])</code>); fill a missing Qty with 0 (<code>fillna(0)</code>); then convert and print <code>Rows kept: 8</code> and <code>Units: 44</code>.</>,
    starter: 'import pandas as pd\n\ndf = pd.read_csv("sales_raw.csv")\ndf["Qty"] = df["Qty"].astype(int)\nprint(f"Units: {df[\'Qty\'].sum()}")',
    tests: [{ setup: csvFile("sales_raw.csv", RAW), expect: OUT.missing }, { setup: csvFile("sales_raw.csv", RAW2), expect: OUT.missing2, hidden: true, why: "A different file — every count must come from the DataFrame." }],
    requires: pdCalls("isna", "dropna", "fillna"),
    hints: ['df = df.dropna(subset=["Item"])', 'df["Qty"] = df["Qty"].fillna(0).astype(int)', 'print(f"Rows kept: {len(df)}")'],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("sales_raw.csv")\nprint("Missing values:")\nprint(df.isna().sum())\ndf = df.dropna(subset=["Item"])\ndf["Qty"] = df["Qty"].fillna(0).astype(int)\nprint(f"Rows kept: {len(df)}")\nprint(f"Units: {df[\'Qty\'].sum()}")',
  },
  save: {
    ...PD, id: "save", kind: "write", title: "Save your results",
    task: <>Load sales.csv, add Revenue, and total it per Category, highest first. Turn that Series back into a two-column table with <code>.reset_index()</code> and save it with <code>to_csv("summary.csv", index=False)</code> (no index column). Print <code>Saved 3 categories</code>. The checker opens your summary.csv.</>,
    tests: [
      { setup: csvFile("sales.csv", SALES), expect: "Saved 3 categories", post: savedCheck(SALES) },
      { setup: csvFile("sales.csv", SALES2), expect: "Saved 3 categories", post: savedCheck(SALES2), hidden: true },
    ],
    requires: pdCalls("to_csv", "reset_index"),
    hints: ['summary = df.groupby("Category")["Revenue"].sum().sort_values(ascending=False).reset_index()', 'summary.to_csv("summary.csv", index=False)', 'print(f"Saved {len(summary)} categories")'],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\nsummary = df.groupby("Category")["Revenue"].sum().sort_values(ascending=False).reset_index()\nsummary.to_csv("summary.csv", index=False)\nprint(f"Saved {len(summary)} categories")',
  },
  report: {
    ...PD, id: "report", kind: "make", title: "Monthly sales report",
    task: <>Load sales.csv and add Revenue. Make a <code>Month</code> column from the first 7 characters of Date (<code>df["Date"].str[:7]</code>). Print revenue per month in date order as <code>2026-01: 4200</code> (loop over the grouped Series' <code>.items()</code>), then <code>Best month: 2026-01</code>, <code>Top item: Headphones (3600)</code> (by revenue), <code>Total: 10855</code> and <code>Average order: 904.58</code>.</>,
    minLines: 14,
    tests: [{ setup: csvFile("sales.csv", SALES), expect: monthly(SALES) }, { setup: csvFile("sales.csv", SALES2), expect: monthly(SALES2), hidden: true, why: "A different shop and different months — compute everything from the DataFrame." }],
    requires: pdCalls("groupby", "items"),
    hints: ['monthly = df.groupby("Month")["Revenue"].sum()', "monthly.idxmax() is the label of the biggest value; .max() is the value.", 'items = df.groupby("Item")["Revenue"].sum() — then idxmax / max again', 'df["Revenue"].mean() is the average order'],
    solution: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\ndf["Revenue"] = df["Qty"] * df["Price"]\ndf["Month"] = df["Date"].str[:7]\n\nmonthly = df.groupby("Month")["Revenue"].sum()\nfor month, total in monthly.items():\n    print(f"{month}: {total}")\nprint(f"Best month: {monthly.idxmax()}")\n\nitems = df.groupby("Item")["Revenue"].sum()\nprint(f"Top item: {items.idxmax()} ({items.max()})")\nprint(f"Total: {df[\'Revenue\'].sum()}")\nprint(f"Average order: {df[\'Revenue\'].mean():.2f}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "df.groupby(\"Category\")[\"Revenue\"].sum() gives…", options: ["One total for the whole table", "One total per category", "The rows sorted by category", "A new CSV file"], answer: 1, explain: "Split by category, sum each group, combine the results." },
  { q: "What does value_counts() return?", options: ["The number of columns", "How often each value appears, most common first", "The sum of the values", "Missing values"], answer: 1, explain: "Perfect for “which item was ordered most often?”" },
  { q: "An empty cell in a CSV becomes…", options: ["0", "\"\"", "NaN", "An error"], answer: 2, explain: "NaN = Not a Number: pandas' marker for missing." },
  { q: "dropna(subset=[\"Item\"]) …", options: ["Deletes the Item column", "Removes rows whose Item is missing", "Fills Item with 0", "Counts missing items"], answer: 1, explain: "fillna fills gaps; dropna drops rows with gaps." },
  { q: "Why to_csv(\"out.csv\", index=False)?", options: ["It's faster", "So the 0, 1, 2 row labels aren't saved as an extra column", "It hides the file", "It's required"], answer: 1, explain: "Without it, the file starts with an unnamed index column." },
];

export default function Unit12_2(props) {
  const sections = [
    { label: "The Data", kicker: "sales.csv", title: "A shop's sales", blocks: [
      <P>Twelve orders from a small shop — the kind of file every business has thousands of. The question is always the same: <em>what is this data telling us?</em></P>,
      EX.revenue,
    ] },
    { label: "Group By", kicker: "SPLIT · APPLY · COMBINE", title: "Totals per group", blocks: [<SplitApplyCombine />, EX.groupby, EX.units] },
    { label: "Aggregate", kicker: ".agg", title: "Several summaries at once", blocks: [EX.agg, <KeyIdea>Most data questions are “for each X, what is the total / average / count of Y?” — that's groupby(X)[Y] plus one function.</KeyIdea>] },
    { label: "Missing Data", kicker: "NaN", title: "Cleaning messy data", blocks: [
      EX.missing,
      <Note color={T.blue} icon="🧹">Data scientists say 80% of the work is cleaning. Always check df.isna().sum() before trusting an average.</Note>,
    ] },
    { label: "Save", kicker: "to_csv", title: "Save your results", blocks: [EX.save] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: monthly sales report", blocks: [EX.report] },
  ];
  return (
    <LessonShell {...props} unitId="Unit12_2" crumb="MODULE 12 › 2" title="Analysing Real Data" sections={sections} quiz={QUIZ}
      next={{ title: "Module 13 — Charts with Matplotlib", text: "A number tells. A chart convinces." }} />
  );
}
