// Unit 7.4D — Dictionaries (NEW in the typing-first redesign: split out of the
// old Unit 7.4 "Tuples & Dictionaries"; unitId keeps old 7.4 progress intact).
// Lookup by key → KeyError, in and .get → .items()/.keys()/.values() →
// counting with a dict → del / pop → list of dicts → canteen billing.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, MONO, tint } from "../kit/theme.js";

const pyDict = (o) => "{" + Object.entries(o).map(([k, v]) => `'${k}': ${typeof v === "string" ? `'${v}'` : v}`).join(", ") + "}";

// ── Widget: lockers with name labels ──
function Lockers() {
  const start = { PRIYA: 87, ARUN: 72, MEENA: 95 };
  const [d, setD] = useState(start);
  const [msg, setMsg] = useState({ code: 'marks["ARUN"]', out: "72", err: false });
  const ops = [
    { code: 'marks["MEENA"]', f: () => ("MEENA" in d ? [d, String(d.MEENA)] : [d, "KeyError: 'MEENA'", true]) },
    { code: 'marks["RAVI"]', f: () => ("RAVI" in d ? [d, String(d.RAVI)] : [d, "KeyError: 'RAVI'", true]) },
    { code: 'marks.get("RAVI", 0)', f: () => [d, String(d.RAVI ?? 0)] },
    { code: 'marks["RAVI"] = 64', f: () => [{ ...d, RAVI: 64 }, "(added a new key)"] },
    { code: 'marks["ARUN"] = 75', f: () => [{ ...d, ARUN: 75 }, "(overwrote ARUN — keys are unique)"] },
    { code: 'del marks["PRIYA"]', f: () => ("PRIYA" in d ? [(() => { const c = { ...d }; delete c.PRIYA; return c; })(), "(removed)"] : [d, "KeyError: 'PRIYA'", true]) },
    { code: '"ARUN" in marks', f: () => [d, "ARUN" in d ? "True" : "False"] },
    { code: "72 in marks", f: () => [d, "False   ← in checks KEYS, not values"] },
  ];
  return (
    <div className="fh-two">
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ops.map((o) => <button key={o.code} onClick={() => { const [nd, out, err] = o.f(); setD(nd); setMsg({ code: o.code, out, err: !!err }); }} style={{ fontFamily: CODE_FONT, fontSize: 13.5, padding: "7px 10px", borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.card, cursor: "pointer" }}>{o.code}</button>)}
          <button onClick={() => { setD(start); setMsg({ code: "", out: "", err: false }); }} style={{ fontSize: 13, padding: "7px 10px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.surface, cursor: "pointer", fontFamily: "inherit" }}>↺ reset</button>
        </div>
        {msg.code && <div style={{ fontFamily: CODE_FONT, fontSize: 14, marginTop: 10 }}>&gt;&gt;&gt; {msg.code}<br /><span style={{ color: msg.err ? T.red : T.blue }}>{msg.out}</span></div>}
      </div>
      <div>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.3, color: T.bronze, marginBottom: 6 }}>marks — {Object.keys(d).length} keys</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Object.entries(d).map(([k, v]) => (
            <div key={k} style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{ fontFamily: CODE_FONT, fontSize: 12.5, fontWeight: 700, color: "#fff", background: T.purple, borderRadius: "8px 8px 0 0", padding: "3px 6px" }}>{k}</div>
              <div style={{ border: `1.5px solid ${T.purple}`, borderTop: "none", borderRadius: "0 0 8px 8px", padding: "10px 0", fontFamily: CODE_FONT, fontWeight: 700, fontSize: 18, background: T.card }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 13.5, marginTop: 8, color: T.slate }}>print(marks) → {pyDict(d)}</div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const MENU = { samosa: 15, tea: 10, dosa: 45, coffee: 20 };
const bill = (orders) => {
  const out = []; let total = 0;
  for (const o of orders) {
    out.push(`Order: ${o}`);
    if (o === "done") break;
    const [item, q] = o.split(" ");
    if (!(item in MENU)) { out.push(`Sorry, no ${item}`); continue; }
    const cost = MENU[item] * Number(q); total += cost;
    out.push(`${item} x ${q} = Rs ${cost.toFixed(2)}`);
  }
  out.push(`Total: Rs ${total.toFixed(2)}`);
  return out.join("\n");
};
const countIn = (line) => { const c = {}; line.split(" ").forEach((g) => { c[g] = (c[g] || 0) + 1; }); return c; };
const EX = {
  basics: {
    id: "basics", kind: "type", title: "Your first dictionary",
    task: <>Curly braces, <code>key: value</code> pairs. Look up with the key in square brackets; assigning to a new key adds it, to an existing key overwrites it.</>,
    show: 'marks = {"PRIYA": 87, "ARUN": 72}\nprint(marks["PRIYA"])\nmarks["MEENA"] = 95\nmarks["ARUN"] = 75\nprint(marks)\nprint(len(marks), "ARUN" in marks, 72 in marks)',
    tests: [{ expect: "87\n{'PRIYA': 87, 'ARUN': 75, 'MEENA': 95}\n3 True False" }],
    hints: ["in looks at the keys only, so 72 in marks is False."],
    solution: 'marks = {"PRIYA": 87, "ARUN": 72}\nprint(marks["PRIYA"])\nmarks["MEENA"] = 95\nmarks["ARUN"] = 75\nprint(marks)\nprint(len(marks), "ARUN" in marks, 72 in marks)',
  },
  phonebook: {
    id: "phonebook", kind: "fix", title: "Looking up someone who isn't there",
    task: <>The test looks up Ravi, who isn't in the phone book. Run it, read the coach, and fix it so a missing name prints <code>Not found</code>. Use <code>.get(key, default)</code> or an <code>in</code> check.</>,
    starter: 'phonebook = {"Priya": "98765 43210", "Arun": "91234 56789"}\nname = input("Name: ")\nprint(phonebook[name])',
    tests: [{ inputs: ["Ravi"], expect: "Name: Ravi\nNot found" }, { inputs: ["Priya"], expect: "Name: Priya\n98765 43210", hidden: true }],
    hints: ['.get returns a default instead of crashing: phonebook.get(name, "Not found")'],
    solution: 'phonebook = {"Priya": "98765 43210", "Arun": "91234 56789"}\nname = input("Name: ")\nprint(phonebook.get(name, "Not found"))',
  },
  loop: {
    id: "loop", kind: "type", title: "Looping over a dictionary",
    task: <><code>.items()</code> gives <code>(key, value)</code> tuples — unpack them, as in Unit 7.4. <code>.values()</code> gives just the values.</>,
    show: 'marks = {"PRIYA": 87, "ARUN": 72, "MEENA": 95}\nfor name, mark in marks.items():\n    print(f"{name}: {mark}")\nprint(sum(marks.values()))\nprint(list(marks.keys()))',
    tests: [{ expect: "PRIYA: 87\nARUN: 72\nMEENA: 95\n254\n['PRIYA', 'ARUN', 'MEENA']" }],
    hints: ["Dictionaries remember the order keys were added."],
    solution: 'marks = {"PRIYA": 87, "ARUN": 72, "MEENA": 95}\nfor name, mark in marks.items():\n    print(f"{name}: {mark}")\nprint(sum(marks.values()))\nprint(list(marks.keys()))',
  },
  above: {
    id: "above", kind: "write", title: "Who scored above 80?",
    task: <>Given <code>marks = {"{"}"PRIYA": 87, "ARUN": 72, "MEENA": 95, "RAVI": 64, "DIVYA": 81{"}"}</code>, print each student scoring above 80 (one line each, as <code>PRIYA 87</code>), then <code>Class average: 79.8</code>.</>,
    tests: [{ expect: "PRIYA 87\nMEENA 95\nDIVYA 81\nClass average: 79.8" }],
    requires: [{ call: "items" }],
    forbids: [{ text: "79.8", msg: "Let Python calculate the average." }],
    hints: ["for name, mark in marks.items(): if mark > 80: print(name, mark)", "Average: sum(marks.values()) / len(marks)"],
    solution: 'marks = {"PRIYA": 87, "ARUN": 72, "MEENA": 95, "RAVI": 64, "DIVYA": 81}\nfor name, mark in marks.items():\n    if mark > 80:\n        print(name, mark)\nprint(f"Class average: {sum(marks.values()) / len(marks):.1f}")',
  },
  grades: {
    id: "grades", kind: "write", title: "Count anything with a dict",
    task: <>The most useful dictionary pattern. Ask <code>Grades: </code> (one line, like <code>A B A C B A</code>) and count each grade: <code>counts[g] = counts.get(g, 0) + 1</code>. Print one line per grade, in the order first seen: <code>A: 3</code>…</>,
    tests: [
      { inputs: ["A B A C B A"], expect: "Grades: A B A C B A\n" + Object.entries(countIn("A B A C B A")).map(([k, v]) => `${k}: ${v}`).join("\n") },
      { inputs: ["F F F"], expect: "Grades: F F F\nF: 3", hidden: true },
      { inputs: ["C A B"], expect: "Grades: C A B\nC: 1\nA: 1\nB: 1", hidden: true },
    ],
    requires: [{ call: "get", msg: "Use counts.get(g, 0) + 1." }],
    hints: ["counts = {} before the loop.", ".get(g, 0) gives 0 the first time a grade appears.", "for g, n in counts.items(): print(f\"{g}: {n}\")"],
    solution: 'counts = {}\nfor g in input("Grades: ").split():\n    counts[g] = counts.get(g, 0) + 1\nfor g, n in counts.items():\n    print(f"{g}: {n}")',
  },
  votes: {
    id: "votes", kind: "write", title: "Class election",
    task: <>Ask <code>Votes: </code> (one line of candidate names). Count the votes in a dictionary, then find the winner with best-so-far over <code>.items()</code> (first to reach the top score wins a tie). Print <code>Winner: Meena with 3 votes</code>.</>,
    tests: [
      { inputs: ["Meena Arun Meena Priya Meena Arun"], expect: "Votes: Meena Arun Meena Priya Meena Arun\nWinner: Meena with 3 votes" },
      { inputs: ["Ravi"], expect: "Votes: Ravi\nWinner: Ravi with 1 votes", hidden: true },
      { inputs: ["Arun Priya Priya Arun"], expect: "Votes: Arun Priya Priya Arun\nWinner: Arun with 2 votes", hidden: true },
    ],
    requires: [{ call: "get" }],
    forbids: [{ call: "max", msg: "Use best-so-far over counts.items()." }],
    hints: ["Count first, exactly like the grades exercise.", 'winner = ""; best = 0; for name, n in counts.items(): if n > best: …'],
    solution: 'counts = {}\nfor name in input("Votes: ").split():\n    counts[name] = counts.get(name, 0) + 1\nwinner = ""\nbest = 0\nfor name, n in counts.items():\n    if n > best:\n        winner = name\n        best = n\nprint(f"Winner: {winner} with {best} votes")',
  },
  remove: {
    id: "remove", kind: "write", title: "Remove a key",
    task: <>A shop's stock: <code>stock = {"{"}"pen": 40, "pencil": 25, "eraser": 0{"}"}</code>. Ask <code>Remove: </code>. If the item exists, delete it with <code>del</code> and print <code>Removed eraser</code>; otherwise <code>No such item</code>. Then print the dictionary.</>,
    tests: [
      { inputs: ["eraser"], expect: "Remove: eraser\nRemoved eraser\n{'pen': 40, 'pencil': 25}" },
      { inputs: ["ruler"], expect: "Remove: ruler\nNo such item\n{'pen': 40, 'pencil': 25, 'eraser': 0}", hidden: true },
    ],
    requires: [{ node: "Delete", msg: "Use del stock[item]." }],
    hints: ["Check with in first — del on a missing key is a KeyError."],
    solution: 'stock = {"pen": 40, "pencil": 25, "eraser": 0}\nitem = input("Remove: ")\nif item in stock:\n    del stock[item]\n    print(f"Removed {item}")\nelse:\n    print("No such item")\nprint(stock)',
  },
  table: {
    id: "table", kind: "type", title: "A list of dictionaries",
    task: <>Real data often looks like this: a list of records where each record is a dictionary with named fields. (It's exactly the shape of a spreadsheet — and of the Pandas tables in Module 12.)</>,
    show: 'students = [\n    {"name": "Priya", "dept": "CSE", "cgpa": 8.7},\n    {"name": "Arun", "dept": "ECE", "cgpa": 7.9},\n]\nfor s in students:\n    print(f"{s[\'name\']} ({s[\'dept\']}): {s[\'cgpa\']}")',
    tests: [{ expect: "Priya (CSE): 8.7\nArun (ECE): 7.9" }],
    hints: ["Inside an f-string with double quotes, use single quotes for the keys."],
    solution: 'students = [\n    {"name": "Priya", "dept": "CSE", "cgpa": 8.7},\n    {"name": "Arun", "dept": "ECE", "cgpa": 7.9},\n]\nfor s in students:\n    print(f"{s[\'name\']} ({s[\'dept\']}): {s[\'cgpa\']}")',
  },
  canteen: {
    id: "canteen", kind: "make", title: "Canteen billing",
    task: <>Menu: <code>menu = {"{"}"samosa": 15, "tea": 10, "dosa": 45, "coffee": 20{"}"}</code>. Keep asking <code>Order: </code> (like <code>tea 2</code>) until <code>done</code>. For a known item print <code>tea x 2 = Rs 20.00</code> and add to the total; for an unknown one print <code>Sorry, no idli</code>. Finally print <code>Total: Rs 65.00</code>.</>,
    minLines: 14,
    tests: [
      { inputs: ["tea 2", "dosa 1", "idli 2", "done"], expect: bill(["tea 2", "dosa 1", "idli 2", "done"]) },
      { inputs: ["done"], expect: bill(["done"]), hidden: true },
      { inputs: ["samosa 4", "coffee 3", "done"], expect: bill(["samosa 4", "coffee 3", "done"]), hidden: true },
    ],
    requires: [{ node: "While" }],
    hints: ["item, qty = order.split() — unpack the two words.", "if item in menu: cost = menu[item] * int(qty) …", 'print(f"{item} x {qty} = Rs {cost:.2f}")'],
    solution: 'menu = {"samosa": 15, "tea": 10, "dosa": 45, "coffee": 20}\ntotal = 0\norder = input("Order: ")\nwhile order != "done":\n    item, qty = order.split()\n    if item in menu:\n        cost = menu[item] * int(qty)\n        total += cost\n        print(f"{item} x {qty} = Rs {cost:.2f}")\n    else:\n        print(f"Sorry, no {item}")\n    order = input("Order: ")\nprint(f"Total: Rs {total:.2f}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "d = {\"a\": 1}. What does d[\"b\"] do?", options: ["Returns None", "Returns 0", "KeyError", "Adds b"], answer: 2, explain: "Reading a missing key raises KeyError. Use d.get(\"b\") or check \"b\" in d first." },
  { q: "d = {\"a\": 1}. After d[\"a\"] = 5, what is d?", options: ["{\"a\": 1, \"a\": 5}", "{\"a\": 5}", "Error", "{\"a\": 6}"], answer: 1, explain: "Keys are unique; assigning to an existing key overwrites its value." },
  { q: "marks = {\"ARUN\": 72}. What does 72 in marks give?", options: ["True", "False"], answer: 1, explain: "in checks keys only. 72 in marks.values() would be True." },
  { q: "What does counts.get(\"x\", 0) + 1 do when \"x\" isn't a key yet?", options: ["KeyError", "Gives 1", "Gives None", "Gives 0"], answer: 1, explain: "get returns the default 0, plus 1 = 1. That's why this line counts anything." },
  { q: "What do you get from looping over d.items()?", options: ["Keys only", "Values only", "(key, value) tuples", "Indexes"], answer: 2, explain: "Unpack them: for key, value in d.items():" },
  { q: "Which is the better data shape for 60 students' name, dept and CGPA?", options: ["Three separate lists", "A list of dictionaries, one per student", "One long string", "60 variables"], answer: 1, explain: "Each record keeps its fields together, so they can't drift out of line." },
];

export default function Unit7_4D(props) {
  const sections = [
    {
      label: "Lookup by Name", kicker: "KEYS, NOT POSITIONS", title: "Lockers with name labels",
      blocks: [
        <P>To find Meena's mark in a list you'd need to know her position. A <strong>dictionary</strong> labels each slot with a <strong>key</strong> — like lockers with names instead of numbers. Try every operation:</P>,
        <Lockers />,
        EX.basics,
      ],
    },
    {
      label: "Missing Keys", kicker: "KeyError · in · get", title: "When the key isn't there",
      blocks: [EX.phonebook, <KeyIdea>Three safe ways to read: check <code>if key in d:</code> first, or use <code>d.get(key)</code> (None if missing), or <code>d.get(key, default)</code>.</KeyIdea>],
    },
    {
      label: "Loop a Dict", kicker: "items · keys · values", title: "Walking through a dictionary",
      blocks: [EX.loop, EX.above],
    },
    {
      label: "Counting", kicker: "THE COUNTING PATTERN", title: "Count anything",
      blocks: [
        <P>How many A grades? Which candidate won? How often does each word appear? One line answers them all: <code>counts[x] = counts.get(x, 0) + 1</code>.</P>,
        EX.grades,
        EX.votes,
      ],
    },
    {
      label: "Remove & Records", kicker: "del · list of dicts", title: "Deleting keys, and tables of records",
      blocks: [EX.remove, EX.table],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: canteen billing",
      blocks: [<P>A menu dictionary, a sentinel loop, split and unpacking, <code>in</code>, and money with <code>:.2f</code>. (This is the heart of mini-project Track B, Shop Inventory Manager.)</P>, EX.canteen],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit7_4D" crumb="MODULE 7 › UNIT 7.5" title="Dictionaries" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 7.6 — Sets", text: "Duplicates vanish and membership checks turn instant." }} />
  );
}
