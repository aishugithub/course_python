// Unit7_C — The Crucible: Module 7 (rebuilt, typing-first)
// Spark: aliasing vs a copy, sort() returns None, index/count/slices; dict
// update and .get, tuple unpacking, in on dict keys, set operators, split +
// set + sorted + join. Flame: removing from a list while looping over it;
// counting votes (KeyError, best never updated). Forge: (name, mark) tuples →
// topper, average, passed names. Temper: merge two shops' stock with a dict
// and compare them with sets.

import CrucibleShell from "../kit/Crucible.jsx";

function merge(s1, s2) {
  const parse = (s) => { const m = new Map(); s.split(/\s+/).filter(Boolean).forEach((p) => { const [k, v] = p.split(":"); m.set(k, (m.get(k) || 0) + +v); }); return m; };
  const a = parse(s1), b = parse(s2), all = new Map();
  [a, b].forEach((m) => m.forEach((v, k) => all.set(k, (all.get(k) || 0) + v)));
  const keys = [...all.keys()].sort();
  const list = (xs) => (xs.length ? xs.sort().join(", ") : "none");
  let best = keys[0];
  keys.forEach((k) => { if (all.get(k) > all.get(best)) best = k; });
  return [`Shop 1: ${s1}`, `Shop 2: ${s2}`, ...keys.map((k) => `${k}: ${all.get(k)}`),
    `Only in shop 1: ${list([...a.keys()].filter((k) => !b.has(k)))}`, `Only in shop 2: ${list([...b.keys()].filter((k) => !a.has(k)))}`,
    `In both: ${list([...a.keys()].filter((k) => b.has(k)))}`, `Most stocked: ${best} (${all.get(best)})`].join("\n");
}
const mergeTest = (s1, s2, extra = {}) => ({ inputs: [s1, s2], expect: merge(s1, s2), ...extra });

const EX = {
  spark1: {
    id: "spark1", kind: "predict", title: "Two tags, one list",
    code: 'a = [3, 1, 2]\nb = a\nc = a[:]\nb.append(4)\nc.sort()\nprint(a, b, c)\nx = a.sort()\nprint(x, a)\nnums = [5, 8, 2, 8]\nprint(nums.index(8), nums.count(8), nums[-1], nums[1:3])',
    task: <>Which names point at the <em>same</em> list, and which at a copy? And what does <code>.sort()</code> hand back?</>,
    hints: ["b = a is a second name tag on the same list. a[:] makes a new list.", ".sort() changes the list in place and returns None.", "index finds the FIRST position; a slice [1:3] stops before position 3."],
    solution: "[3, 1, 2, 4] [3, 1, 2, 4] [1, 2, 3]\nNone [1, 2, 3, 4]\n1 2 8 [8, 2]",
  },
  spark2: {
    id: "spark2", kind: "predict", title: "Dicts, tuples, sets",
    code: 'stock = {"pen": 10, "pad": 4}\nstock["pen"] -= 3\nstock["ink"] = stock.get("ink", 0) + 5\nfor item, qty in stock.items():\n    print(item, qty)\npoint = (3, 4)\nx, y = point\nprint(x * y, len(stock), "pad" in stock, 4 in stock)\ns = set([1, 2, 2, 3]) | {3, 4}\nprint(len(s), sorted(s & {2, 4, 6}))\nwords = "the cat the hat".split()\nprint(" ".join(sorted(set(words))))',
    task: <>Every structure from Module 7 in one program. Dictionaries keep the order keys were added.</>,
    hints: [".get(\"ink\", 0) gives 0 because ink isn't there yet.", "in on a dictionary checks the KEYS, not the values.", "| is union, & is intersection; a set drops the repeated \"the\"."],
    solution: "pen 7\npad 4\nink 5\n12 3 True False\n4 [2, 4]\ncat hat the",
  },
  remove: {
    id: "remove", kind: "fix", title: "Some failures survive",
    task: <>It should drop every mark below 40 and print the rest. Run it with the sample: one failing mark slips through. Removing from a list while you loop over it makes the loop skip items — build a <strong>new</strong> list instead.</>,
    starter: 'marks = []\nfor x in input("Marks: ").split():\n    marks.append(int(x))\nfor m in marks:\n    if m < 40:\n        marks.remove(m)\nprint("Passed:", marks)',
    tests: [{ inputs: ["35 20 70 10 90"], expect: "Marks: 35 20 70 10 90\nPassed: [70, 90]" }, { inputs: ["50 60"], expect: "Marks: 50 60\nPassed: [50, 60]", hidden: true }, { inputs: ["1 2 3"], expect: "Marks: 1 2 3\nPassed: []", hidden: true }],
    forbids: [{ call: "remove", msg: "Don't remove while looping — append the good marks to a new list." }],
    hints: ["After 35 is removed, 20 slides into its place — and the loop has already moved on.", "passed = [] then append every mark >= 40."],
    solution: 'marks = []\nfor x in input("Marks: ").split():\n    marks.append(int(x))\npassed = []\nfor m in marks:\n    if m >= 40:\n        passed.append(m)\nprint("Passed:", passed)',
  },
  votes: {
    id: "votes", kind: "fix", title: "Count the votes",
    task: <>Count the votes and announce the winner — on a tie, the name that was voted for <em>first</em> wins. It crashes; and once it stops crashing, the winner's count is still wrong. Fix both.</>,
    starter: 'text = input("Votes: ")\ncounts = {}\nfor name in text.split():\n    counts[name] += 1\nwinner = ""\nbest = 0\nfor name in counts:\n    if counts[name] > best:\n        winner = name\nprint(f"Winner: {winner} with {best} votes")',
    tests: [{ inputs: ["asha ben asha chen ben asha"], expect: "Votes: asha ben asha chen ben asha\nWinner: asha with 3 votes" }, { inputs: ["zed"], expect: "Votes: zed\nWinner: zed with 1 votes", hidden: true }, { inputs: ["b a a b"], expect: "Votes: b a a b\nWinner: b with 2 votes", hidden: true, why: "A tie: b was voted for first, so keep > (not >=)." }],
    hints: ["counts[name] += 1 needs counts[name] to exist already: counts.get(name, 0) + 1.", "When you find a new winner, remember their count too: best = counts[name]."],
    solution: 'text = input("Votes: ")\ncounts = {}\nfor name in text.split():\n    counts[name] = counts.get(name, 0) + 1\nwinner = ""\nbest = 0\nfor name in counts:\n    if counts[name] > best:\n        winner = name\n        best = counts[name]\nprint(f"Winner: {winner} with {best} votes")',
  },
  records: {
    id: "records", kind: "complete", title: "Records as tuples",
    task: <>Each student is a <code>(name, mark)</code> tuple. Fill the blanks to find the topper, the average and the passed names (alphabetical).</>,
    starter: 'records = []\nfor entry in input("Students (name:mark): ").split():\n    name, mark = entry.split(___)\n    records.append((name, int(mark)))\n\nbest = records[0]\ntotal = 0\nfor name, mark in records:\n    total += ___\n    if mark > best[1]:\n        best = (name, mark)\nprint(f"Topper: {best[0]} ({best[1]})")\nprint(f"Average: {total / ___:.1f}")\n\npassed = []\nfor name, mark in records:\n    if mark >= 40:\n        passed.___(name)\nprint("Passed:", ", ".join(sorted(passed)))',
    tests: [{ inputs: ["Dev:58 Asha:82 Ben:35 Chen:91"], expect: "Students (name:mark): Dev:58 Asha:82 Ben:35 Chen:91\nTopper: Chen (91)\nAverage: 66.5\nPassed: Asha, Chen, Dev" }, { inputs: ["Zoe:40"], expect: "Students (name:mark): Zoe:40\nTopper: Zoe (40)\nAverage: 40.0\nPassed: Zoe", hidden: true }],
    hints: ['entry.split(":")', "total += mark; divide by len(records)", "passed.append(name)"],
    solution: 'records = []\nfor entry in input("Students (name:mark): ").split():\n    name, mark = entry.split(":")\n    records.append((name, int(mark)))\n\nbest = records[0]\ntotal = 0\nfor name, mark in records:\n    total += mark\n    if mark > best[1]:\n        best = (name, mark)\nprint(f"Topper: {best[0]} ({best[1]})")\nprint(f"Average: {total / len(records):.1f}")\n\npassed = []\nfor name, mark in records:\n    if mark >= 40:\n        passed.append(name)\nprint("Passed:", ", ".join(sorted(passed)))',
  },
  merge: {
    id: "merge", kind: "make", title: "Merge two shops",
    task: <>Two branches of a shop send their stock as <code>item:qty</code> pairs. Ask <code>Shop 1: </code> and <code>Shop 2: </code>. Combine them in a dictionary (an item listed twice is added up) and print every item alphabetically as <code>pad: 8</code>. Then, using <strong>sets</strong> of item names, print <code>Only in shop 1: pen</code>, <code>Only in shop 2: bag</code> and <code>In both: ink, pad</code> (alphabetical, comma-separated, or <code>none</code>). Last, <code>Most stocked: pen (10)</code> — alphabetically first on a tie.</>,
    minLines: 20,
    tests: [
      mergeTest("pen:10 pad:5 ink:2", "pad:3 ink:4 bag:1"),
      mergeTest("a:1", "a:2", { hidden: true, why: "Nothing is only in one shop: print none." }),
      mergeTest("x:5 y:5", "z:1", { hidden: true, why: "x and y tie for most stocked — the alphabetically first wins." }),
      mergeTest("cap:2 cap:3 mug:1", "mug:9", { hidden: true, why: "cap appears twice in shop 1 — add both." }),
    ],
    requires: [{ node: "Dict" }, { node: "BinOp", min: 2 }],
    hints: ["Read each shop into its own dict with .get(item, 0) + qty — then build the combined one the same way.", "set(shop1) - set(shop2), set(shop2) - set(shop1), set(shop1) & set(shop2)", "\", \".join(sorted(s)) or \"none\" — an empty string is falsy."],
    solution: 's1 = input("Shop 1: ")\ns2 = input("Shop 2: ")\nshop1 = {}\nfor pair in s1.split():\n    item, qty = pair.split(":")\n    shop1[item] = shop1.get(item, 0) + int(qty)\nshop2 = {}\nfor pair in s2.split():\n    item, qty = pair.split(":")\n    shop2[item] = shop2.get(item, 0) + int(qty)\n\ntotal = {}\nfor shop in (shop1, shop2):\n    for item, qty in shop.items():\n        total[item] = total.get(item, 0) + qty\nfor item in sorted(total):\n    print(f"{item}: {total[item]}")\n\nonly1 = set(shop1) - set(shop2)\nonly2 = set(shop2) - set(shop1)\nboth = set(shop1) & set(shop2)\nprint("Only in shop 1:", ", ".join(sorted(only1)) or "none")\nprint("Only in shop 2:", ", ".join(sorted(only2)) or "none")\nprint("In both:", ", ".join(sorted(both)) or "none")\n\nbest = sorted(total)[0]\nfor item in sorted(total):\n    if total[item] > total[best]:\n        best = item\nprint(f"Most stocked: {best} ({total[best]})")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "b = a for a list, then b.append(1). What happens to a?", options: ["Nothing", "a gets the 1 too — same list", "Error", "a becomes a copy"], answer: 1, explain: "Two name tags, one list. Use a[:] or a.copy() for a separate list." },
  { q: "nums = nums.sort() leaves nums as…", options: ["The sorted list", "None", "The original list", "An error"], answer: 1, explain: ".sort() returns None. Use nums.sort() alone, or nums = sorted(nums)." },
  { q: "Which needs .get(key, 0) to avoid a crash?", options: ["d[key] = 5", "d[key] += 1 for a new key", "key in d", "len(d)"], answer: 1, explain: "+= reads the old value first — and a new key has none." },
];

export default function Unit7_C(props) {
  return <CrucibleShell {...props} unitId="Unit7_C" module="Module 7" title="The Crucible: Data Structures" spark={[EX.spark1, EX.spark2]} flame={[EX.remove, EX.votes]} forge={[EX.records]} temper={[EX.merge]} quiz={QUIZ} />;
}
