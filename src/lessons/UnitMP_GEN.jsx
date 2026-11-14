// Mini-Project Track A — Personal Expense Tracker (rebuilt, typing-first)
// One program, five checkpoints, each a new typed and test-checked version:
// 1 core menu (M4–6) → 2 lists, dicts, functions (M7–8) → 3 files and
// exceptions (M9) → 4 classes (M10) → 5 pandas + matplotlib (M12–13).
// Reference simulators below produce the expected output for every test.

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";
import { files, fileIs, FIG, titleIs, barsAre, Console, parseCsv, sumBy, byKey, byValueDesc, Roadmap } from "../kit/project.jsx";

// ── CP1: budget menu ──
function cp1(inputs) {
  const c = Console(inputs);
  const budget = +c.ask("Budget: ");
  c.say("1 Add  2 Total  3 Quit");
  let spent = 0;
  for (;;) {
    const ch = c.ask("Choice: ");
    if (ch === "1") {
      const a = +c.ask("Amount: ");
      if (a <= 0) c.say("Amount must be positive");
      else { spent += a; c.say(`Added. Spent: ${spent} / ${budget}`); if (spent > budget) c.say(`Warning: over budget by ${spent - budget}!`); }
    } else if (ch === "2") c.say(`Spent: ${spent}, Left: ${budget - spent}`);
    else if (ch === "3") { c.say("Bye!"); break; }
    else c.say("Unknown choice");
  }
  return c.text();
}

// ── CP2: categories ──
const PROMPT = "Expense (category amount, or done): ";
function cp2(inputs) {
  const c = Console(inputs);
  const budget = +c.ask("Budget: ");
  const ex = [];
  for (;;) {
    const line = c.ask(PROMPT);
    if (line.trim().toLowerCase() === "done") break;
    const p = line.split(/\s+/).filter(Boolean);
    if (p.length !== 2 || !/^\d+$/.test(p[1])) { c.say("Format: category amount"); continue; }
    ex.push([p[0].toLowerCase(), +p[1]]);
  }
  if (!ex.length) { c.say("No expenses yet"); return c.text(); }
  const totals = byValueDesc(sumBy(ex, (e) => e[0], (e) => e[1]));
  totals.forEach(([k, v]) => c.say(`${k}: ${v}`));
  const total = ex.reduce((s, e) => s + e[1], 0);
  c.say(`Total: ${total} / ${budget}`, `Biggest: ${totals[0][0]} (${totals[0][1]})`);
  if (total > budget) c.say(`Over budget by ${total - budget}!`);
  return c.text();
}

// ── CP3: saved to a file ──
function cp3(fileText, inputs) {
  const c = Console(inputs);
  const ex = [];
  if (fileText === null) c.say("No saved expenses yet");
  else {
    let bad = 0;
    fileText.split("\n").filter((l) => l.trim()).forEach((l) => { const p = l.trim().split(","); if (p.length === 2 && /^-?\d+$/.test(p[1].trim())) ex.push([p[0].trim(), +p[1]]); else bad++; });
    c.say(`Loaded ${ex.length} expenses`);
    if (bad) c.say(`Skipped ${bad} bad line(s)`);
  }
  for (;;) {
    const line = c.ask(PROMPT);
    if (line.trim().toLowerCase() === "done") break;
    const p = line.split(/\s+/).filter(Boolean);
    if (p.length !== 2) { c.say("Format: category amount"); continue; }
    if (!/^-?\d+$/.test(p[1])) { c.say("Amount must be a number"); continue; }
    if (+p[1] <= 0) { c.say("Amount must be positive"); continue; }
    ex.push([p[0].toLowerCase(), +p[1]]);
  }
  c.say(`Saved ${ex.length} expenses`, `Total: ${ex.reduce((s, e) => s + e[1], 0)}`);
  return { out: c.text(), lines: ex.map(([k, v]) => `${k},${v}`) };
}

// ── CP4: classes ──
function cp4(inputs) {
  const c = Console(inputs);
  const budget = +c.ask("Budget: ");
  const ex = [];
  for (;;) {
    const line = c.ask(PROMPT);
    if (line.trim().toLowerCase() === "done") break;
    const p = line.split(/\s+/).filter(Boolean);
    if (p.length !== 2) { c.say("Format: category amount"); continue; }
    if (!/^-?\d+$/.test(p[1]) || +p[1] <= 0) { c.say(`Bad amount: ${p[1]}`); continue; }
    ex.push([p[0].toLowerCase(), +p[1]]);
  }
  const total = ex.reduce((s, e) => s + e[1], 0);
  c.say("Expenses:", ...ex.map(([k, v]) => `  ${k}: ${v}`), `Total: ${total}`, `Left: ${budget - total}`, total > budget ? "Over budget!" : "Within budget");
  return c.text();
}
const CP4_POST = `_t = Tracker(100)
_t.add("a", 60)
_t.add("b", 30)
_t.add("a", 20)
assert len(_t.expenses) == 3 and isinstance(_t.expenses[0], Expense), "Tracker.add should store an Expense object in tracker.expenses."
assert str(_t.expenses[0]) == "a: 60", "str(Expense) should look like a: 60 — got " + str(_t.expenses[0])
assert _t.total() == 110, "total() should add up every expense."
assert _t.left() == -10, "left() is budget minus total."
assert _t.is_over() is True, "is_over() should be True when the total is above the budget."
assert _t.by_category() == {"a": 80, "b": 30}, "by_category() should return a dict of category totals — got " + str(_t.by_category())
try:
    _t.add("c", 0)
    raise AssertionError("add() should raise ValueError for an amount of 0 or less.")
except ValueError:
    pass
assert Tracker(50).is_over() is False, "A new tracker is not over budget."`;

// ── CP5: analyse a year of spending ──
const EXP = "Date,Category,Amount\n2026-10-01,rent,8000\n2026-10-03,food,450\n2026-10-07,travel,300\n2026-10-12,food,620\n2026-10-18,fun,900\n2026-10-25,food,380\n2026-11-01,rent,8000\n2026-11-04,food,510\n2026-11-09,travel,1200\n2026-11-15,fun,350\n2026-11-22,food,700\n";
const EXP2 = "Date,Category,Amount\n2026-09-02,books,600\n2026-09-05,food,300\n2026-09-20,food,450\n2026-10-01,phone,399\n2026-10-08,books,250\n2026-10-15,food,520\n2026-10-28,gym,800\n";
function cp5(csv) {
  const rows = parseCsv(csv);
  const cats = byValueDesc(sumBy(rows, "Category", (r) => r.Amount));
  const months = byKey(sumBy(rows, (r) => r.Date.slice(0, 7), (r) => r.Amount));
  const out = [`Total spent: ${rows.reduce((s, r) => s + r.Amount, 0)}`, "By category:", ...cats.map(([k, v]) => `${k}: ${v}`), "By month:", ...months.map(([k, v]) => `${k}: ${v}`), `Biggest category: ${cats[0][0]}`].join("\n");
  return { out, post: FIG() + titleIs("Spending by category") + barsAre(cats, "_ax", "bars (categories, biggest first)") };
}

const EX = {
  cp1: {
    id: "cp1", kind: "make", title: "Checkpoint 1 — the budget menu",
    task: <>Ask <code>Budget: </code>, print the menu line <code>1 Add  2 Total  3 Quit</code> once, then keep asking <code>Choice: </code>. <strong>1</strong>: ask <code>Amount: </code>; refuse 0 or less (<code>Amount must be positive</code>), otherwise add it and print <code>Added. Spent: 1200 / 5000</code> — plus <code>Warning: over budget by 200!</code> if spending is now <em>above</em> the budget. <strong>2</strong>: <code>Spent: 5200, Left: -200</code>. <strong>3</strong>: <code>Bye!</code> and stop. Anything else: <code>Unknown choice</code>.</>,
    minLines: 20,
    tests: [
      { inputs: ["5000", "1", "1200", "1", "4000", "2", "3"], expect: cp1(["5000", "1", "1200", "1", "4000", "2", "3"]) },
      { inputs: ["1000", "1", "1000", "2", "3"], expect: cp1(["1000", "1", "1000", "2", "3"]), hidden: true, why: "Spending exactly the budget is not over it — use >, not >=." },
      { inputs: ["500", "7", "1", "-5", "1", "0", "1", "600", "3"], expect: cp1(["500", "7", "1", "-5", "1", "0", "1", "600", "3"]), hidden: true, why: "Unknown choices and amounts of 0 or less must be refused." },
    ],
    requires: [{ node: "While" }, { node: "If" }],
    hints: ["spent = 0 before the loop; while True: … break on 3", 'if amount <= 0: print("Amount must be positive")', 'if spent > budget: print(f"Warning: over budget by {spent - budget}!")'],
    solution: 'budget = int(input("Budget: "))\nprint("1 Add  2 Total  3 Quit")\nspent = 0\nwhile True:\n    choice = input("Choice: ")\n    if choice == "1":\n        amount = int(input("Amount: "))\n        if amount <= 0:\n            print("Amount must be positive")\n        else:\n            spent += amount\n            print(f"Added. Spent: {spent} / {budget}")\n            if spent > budget:\n                print(f"Warning: over budget by {spent - budget}!")\n    elif choice == "2":\n        print(f"Spent: {spent}, Left: {budget - spent}")\n    elif choice == "3":\n        print("Bye!")\n        break\n    else:\n        print("Unknown choice")',
  },
  cp2: {
    id: "cp2", kind: "make", title: "Checkpoint 2 — spending by category",
    task: <>Ask <code>Budget: </code>, then read lines like <code>food 250</code> with the prompt <code>Expense (category amount, or done): </code> until <code>done</code>. A line that isn't exactly two words with a whole-number amount prints <code>Format: category amount</code> and is skipped; categories are stored lowercase. Keep the expenses as a <strong>list of (category, amount) tuples</strong> and write at least two functions — including <code>totals_by_category(expenses)</code>, which returns a dict. Print each category total, biggest first (ties alphabetical), then <code>Total: 670 / 3000</code>, <code>Biggest: food (550)</code>, and <code>Over budget by 40!</code> when over. With no expenses, just <code>No expenses yet</code>.</>,
    minLines: 22,
    tests: [
      { inputs: ["3000", "food 250", "travel 120", "Food 300", "done"], expect: cp2(["3000", "food 250", "travel 120", "Food 300", "done"]) },
      { inputs: ["1000", "snacks 40", "bad line here", "rent 900", "fun x", "snacks 100", "done"], expect: cp2(["1000", "snacks 40", "bad line here", "rent 900", "fun x", "snacks 100", "done"]), hidden: true, why: "Bad lines are skipped with the Format message, and the total here is over the budget." },
      { inputs: ["100", "b 10", "a 10", "done"], expect: cp2(["100", "b 10", "a 10", "done"]), hidden: true, why: "Equal totals go in alphabetical order: sort by (-total, category)." },
      { inputs: ["500", "done"], expect: cp2(["500", "done"]), hidden: true, why: "With no expenses, print only: No expenses yet." },
    ],
    post: 'assert totals_by_category([("a", 5), ("b", 2), ("a", 1)]) == {"a": 6, "b": 2}, "totals_by_category should add the amounts per category into a dict."',
    requires: [{ node: "FunctionDef", min: 2 }, { call: "sorted" }, { node: "Tuple" }],
    hints: ['parts = line.split(); if len(parts) != 2 or not parts[1].isdigit(): …', "totals[cat] = totals.get(cat, 0) + amount", "sorted(totals.items(), key=sort_key) with def sort_key(item): return (-item[1], item[0])"],
    solution: 'def totals_by_category(expenses):\n    totals = {}\n    for cat, amount in expenses:\n        totals[cat] = totals.get(cat, 0) + amount\n    return totals\n\ndef sort_key(item):\n    return (-item[1], item[0])\n\nbudget = int(input("Budget: "))\nexpenses = []\nwhile True:\n    line = input("Expense (category amount, or done): ")\n    if line.strip().lower() == "done":\n        break\n    parts = line.split()\n    if len(parts) != 2 or not parts[1].isdigit():\n        print("Format: category amount")\n        continue\n    expenses.append((parts[0].lower(), int(parts[1])))\n\nif not expenses:\n    print("No expenses yet")\nelse:\n    ranked = sorted(totals_by_category(expenses).items(), key=sort_key)\n    for cat, total in ranked:\n        print(f"{cat}: {total}")\n    total = sum(amount for _, amount in expenses)\n    print(f"Total: {total} / {budget}")\n    print(f"Biggest: {ranked[0][0]} ({ranked[0][1]})")\n    if total > budget:\n        print(f"Over budget by {total - budget}!")',
  },
  cp3: (() => {
    const v = cp3("food,250\ntravel,120\n", ["food 300", "done"]);
    const h1 = cp3(null, ["rent 900", "done"]);
    const h2 = cp3("food,250\nbroken\nfun,abc\nbus,30\n", ["gift -50", "gift ten", "gift 50", "done"]);
    return {
      id: "cp3", kind: "make", title: "Checkpoint 3 — remember everything",
      task: <>Expenses now live in <code>expenses.txt</code>, one <code>category,amount</code> per line. At the start, load the file: print <code>Loaded 2 expenses</code> — or <code>No saved expenses yet</code> if the file doesn't exist (catch <code>FileNotFoundError</code>). Skip broken lines and report <code>Skipped 2 bad line(s)</code> (only if there were any). Then read expenses like checkpoint 2 (no budget this time): not two words → <code>Format: category amount</code>; amount not a whole number → <code>Amount must be a number</code>; write your own exception <code>NegativeAmountError</code>, raised by an <code>add_expense</code> function for 0 or less and caught → <code>Amount must be positive</code>. At <code>done</code>, save <em>all</em> expenses back to the file and print <code>Saved 3 expenses</code> and <code>Total: 670</code>.</>,
      minLines: 30,
      tests: [
        { setup: files({ "expenses.txt": "food,250\ntravel,120\n" }), inputs: ["food 300", "done"], expect: v.out, post: fileIs("expenses.txt", v.lines, "expenses.txt should hold the old and the new expenses, one category,amount per line.") },
        { setup: files({ "expenses.txt": null }), inputs: ["rent 900", "done"], expect: h1.out, post: fileIs("expenses.txt", h1.lines), hidden: true, why: "When expenses.txt doesn't exist yet, print No saved expenses yet and start empty." },
        { setup: files({ "expenses.txt": "food,250\nbroken\nfun,abc\nbus,30\n" }), inputs: ["gift -50", "gift ten", "gift 50", "done"], expect: h2.out, post: fileIs("expenses.txt", h2.lines), hidden: true, why: "Skip the file's broken lines (count them), and refuse negative and non-number amounts." },
      ],
      requires: [{ node: "ClassDef", msg: "Define class NegativeAmountError(Exception)." }, { node: "Try", min: 2 }, { node: "With" }, { node: "Raise" }],
      hints: ["class NegativeAmountError(Exception): pass — and add_expense raises it when amount <= 0", "Loading: try: with open(...) as f: … except FileNotFoundError: print(\"No saved expenses yet\")", "Each file line: cat, amt = line.strip().split(\",\") then int(amt) — a ValueError means a bad line", 'Saving: with open("expenses.txt", "w") as f: f.write(f"{cat},{amt}\\n")'],
      solution: 'class NegativeAmountError(Exception):\n    pass\n\ndef add_expense(expenses, cat, amount):\n    if amount <= 0:\n        raise NegativeAmountError(amount)\n    expenses.append((cat, amount))\n\ndef load(path):\n    expenses, bad = [], 0\n    try:\n        with open(path) as f:\n            for line in f:\n                if not line.strip():\n                    continue\n                try:\n                    cat, amt = line.strip().split(",")\n                    expenses.append((cat, int(amt)))\n                except ValueError:\n                    bad += 1\n    except FileNotFoundError:\n        print("No saved expenses yet")\n        return expenses\n    print(f"Loaded {len(expenses)} expenses")\n    if bad:\n        print(f"Skipped {bad} bad line(s)")\n    return expenses\n\nexpenses = load("expenses.txt")\nwhile True:\n    line = input("Expense (category amount, or done): ")\n    if line.strip().lower() == "done":\n        break\n    parts = line.split()\n    if len(parts) != 2:\n        print("Format: category amount")\n        continue\n    try:\n        add_expense(expenses, parts[0].lower(), int(parts[1]))\n    except ValueError:\n        print("Amount must be a number")\n    except NegativeAmountError:\n        print("Amount must be positive")\n\nwith open("expenses.txt", "w") as f:\n    for cat, amt in expenses:\n        f.write(f"{cat},{amt}\\n")\nprint(f"Saved {len(expenses)} expenses")\nprint(f"Total: {sum(a for _, a in expenses)}")',
    };
  })(),
  cp4: {
    id: "cp4", kind: "make", title: "Checkpoint 4 — model it with classes",
    task: <>Write two classes. <code>Expense(category, amount)</code> with <code>__str__</code> giving <code>food: 250</code>. <code>Tracker(budget)</code> keeping a list <code>self.expenses</code> of Expense objects, with methods <code>add(category, amount)</code> (raises <code>ValueError</code> for 0 or less), <code>total()</code>, <code>left()</code>, <code>is_over()</code> and <code>by_category()</code> (a dict of totals). Main program: ask <code>Budget: </code>, read expenses like checkpoint 2 (not two words → <code>Format: category amount</code>; a non-number or non-positive amount → <code>Bad amount: x</code>), then print <code>Expenses:</code>, each expense indented two spaces, <code>Total: …</code>, <code>Left: …</code> and <code>Over budget!</code> or <code>Within budget</code>. Hidden checks use your classes directly.</>,
    minLines: 30,
    tests: [
      { inputs: ["2000", "food 250", "bus 40", "food x", "done"], expect: cp4(["2000", "food 250", "bus 40", "food x", "done"]) },
      { inputs: ["100", "a 0", "a 150", "oops", "done"], expect: cp4(["100", "a 0", "a 150", "oops", "done"]), hidden: true },
    ],
    post: CP4_POST,
    requires: [{ node: "ClassDef", min: 2 }],
    hints: ["Tracker.add: if amount <= 0: raise ValueError(\"amount must be positive\"); self.expenses.append(Expense(category, amount))", "total(): return sum(e.amount for e in self.expenses)", "Main: try: tracker.add(cat, int(amt)) except ValueError: print(f\"Bad amount: {amt}\") — int('x') raises ValueError too"],
    solution: 'class Expense:\n    def __init__(self, category, amount):\n        self.category = category\n        self.amount = amount\n\n    def __str__(self):\n        return f"{self.category}: {self.amount}"\n\nclass Tracker:\n    def __init__(self, budget):\n        self.budget = budget\n        self.expenses = []\n\n    def add(self, category, amount):\n        if amount <= 0:\n            raise ValueError("amount must be positive")\n        self.expenses.append(Expense(category, amount))\n\n    def total(self):\n        return sum(e.amount for e in self.expenses)\n\n    def left(self):\n        return self.budget - self.total()\n\n    def is_over(self):\n        return self.total() > self.budget\n\n    def by_category(self):\n        totals = {}\n        for e in self.expenses:\n            totals[e.category] = totals.get(e.category, 0) + e.amount\n        return totals\n\ntracker = Tracker(int(input("Budget: ")))\nwhile True:\n    line = input("Expense (category amount, or done): ")\n    if line.strip().lower() == "done":\n        break\n    parts = line.split()\n    if len(parts) != 2:\n        print("Format: category amount")\n        continue\n    cat, amt = parts\n    try:\n        tracker.add(cat.lower(), int(amt))\n    except ValueError:\n        print(f"Bad amount: {amt}")\n\nprint("Expenses:")\nfor e in tracker.expenses:\n    print(f"  {e}")\nprint(f"Total: {tracker.total()}")\nprint(f"Left: {tracker.left()}")\nprint("Over budget!" if tracker.is_over() else "Within budget")',
  },
  cp5: (() => {
    const a = cp5(EXP), b = cp5(EXP2);
    return {
      id: "cp5", kind: "make", title: "Checkpoint 5 — analyse and chart",
      timeoutMs: 30000,
      task: <>Two months of spending are in <code>spending.csv</code> (Date, Category, Amount). With pandas, print <code>Total spent: …</code>; then <code>By category:</code> and each category's total, biggest first; then <code>By month:</code> and each month's total (<code>Date.str[:7]</code>) in date order; then <code>Biggest category: rent</code>. Finally draw the category totals as a bar chart, biggest first, titled <code>Spending by category</code>. Hidden tests use someone else's spending.</>,
      show: EXP, showLabel: "spending.csv — ALREADY IN THE FOLDER",
      minLines: 16,
      tests: [
        { setup: files({ "spending.csv": EXP }), expect: a.out, post: a.post },
        { setup: files({ "spending.csv": EXP2 }), expect: b.out, post: b.post, hidden: true, why: "Different spending: every number and the chart must come from the DataFrame." },
      ],
      requires: [{ call: "read_csv" }, { call: "groupby", min: 2 }, { call: "bar" }],
      hints: ['cats = df.groupby("Category")["Amount"].sum().sort_values(ascending=False)', 'for cat, total in cats.items(): print(f"{cat}: {total}")', 'months = df.groupby(df["Date"].str[:7])["Amount"].sum()', "plt.bar(cats.index, cats.values)"],
      solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("spending.csv")\nprint(f"Total spent: {df[\'Amount\'].sum()}")\n\ncats = df.groupby("Category")["Amount"].sum().sort_values(ascending=False)\nprint("By category:")\nfor cat, total in cats.items():\n    print(f"{cat}: {total}")\n\nmonths = df.groupby(df["Date"].str[:7])["Amount"].sum()\nprint("By month:")\nfor month, total in months.items():\n    print(f"{month}: {total}")\nprint(f"Biggest category: {cats.index[0]}")\n\nplt.bar(cats.index, cats.values, color="teal")\nplt.title("Spending by category")\nplt.ylabel("Amount")\nplt.show()',
    };
  })(),
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why store expenses as (category, amount) tuples in a list?", options: ["Tuples are faster to type", "Each expense is one fixed pair of facts; the list keeps them all, in order", "Lists can't hold numbers", "Dicts can't be sorted"], answer: 1, explain: "A record that shouldn't change → tuple; a growing collection → list." },
  { q: "Spent 1000 of a 1000 budget. Over budget?", options: ["Yes", "No — only above the budget", "It depends", "Error"], answer: 1, explain: "spent > budget, not >=." },
  { q: "The expenses file doesn't exist on the first run. The program should…", options: ["Crash", "Catch FileNotFoundError and start with no expenses", "Create a random file", "Ask the user to restart"], answer: 1, explain: "Missing data on a first run is normal, not an error." },
  { q: "Why a NegativeAmountError of your own instead of a print inside add_expense?", options: ["It's shorter", "add_expense just reports the problem; the caller decides what to show", "print doesn't work in functions", "Python requires it"], answer: 1, explain: "Raising separates detecting a problem from handling it (Unit 9.2)." },
];

export default function UnitMP_GEN(props) {
  const sections = [
    { label: "1 · Core", kicker: "CHECKPOINT 1 · AFTER M4–M6", title: "The budget menu", blocks: [
      <P>You'll build one real program — a <strong>personal expense tracker</strong> — and grow it through five checkpoints, each using what the next modules taught you. Every checkpoint is a complete, working program.</P>,
      <Roadmap color={T.teal} rows={[["1 · Core logic", "M4–M6", "a menu, a running total, a budget warning"], ["2 · Organise it", "M7–M8", "categories in a dict, expenses as tuples, functions"], ["3 · Make it survive", "M9", "saved to a file; bad input handled; your own exception"], ["4 · Model it", "M10", "Expense and Tracker classes"], ["5 · Analyse & chart", "M12–M13", "pandas totals and a bar chart"]]} />,
      EX.cp1,
    ] },
    { label: "2 · Organise", kicker: "CHECKPOINT 2 · AFTER M7–M8", title: "Spending by category", blocks: [EX.cp2] },
    { label: "3 · Survive", kicker: "CHECKPOINT 3 · AFTER M9", title: "Remember everything", blocks: [EX.cp3, <KeyIdea>A program people rely on must survive its first run (no file yet), a damaged file and silly input — without crashing.</KeyIdea>] },
    { label: "4 · Model", kicker: "CHECKPOINT 4 · AFTER M10", title: "Model it with classes", blocks: [EX.cp4] },
    { label: "5 · Analyse", kicker: "CHECKPOINT 5 · AFTER M12–M13", title: "Analyse and chart", blocks: [
      EX.cp5,
      <Note color={T.blue} icon="🎨">Make it yours: a mess-bill splitter, a shared trip budget, or a phone-data log follow exactly the same five steps. Or bring your own idea of similar size to your teacher.</Note>,
    ] },
  ];
  return (
    <LessonShell {...props} unitId="UnitMP_GEN" crumb="MINI-PROJECT › TRACK A" title="Personal Expense Tracker" sections={sections} quiz={QUIZ}
      next={{ title: "Track complete!", text: "Five versions of one program — from a menu to a chart. Try another track, or head to the Finish Line." }} />
  );
}
