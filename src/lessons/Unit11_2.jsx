// Unit 11.2 — Pythonic Python (new, typing-first)
// List comprehensions in depth (filter, transform, if/else inside) → dict and
// set comprehensions → sorted(key=…) and lambda → any / all and star
// unpacking → Make It: a word-frequency report.

import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

// ── Reference simulators ──
const pyList = (xs) => "[" + xs.map((x) => (typeof x === "string" ? `'${x}'` : String(x))).join(", ") + "]";
const pyDict = (pairs) => "{" + pairs.map(([k, v]) => `'${k}': ${v}`).join(", ") + "}";
const lengths = (line) => {
  const words = line.split(" "), d = new Map();
  words.forEach((w) => d.set(w, w.length));
  return `Words: ${line}\n${pyDict([...d])}\nLengths seen: ${pyList([...new Set(words.map((w) => w.length))].sort((a, b) => a - b))}`;
};
const leader = (line) => {
  const rows = line.split(" ").map((p) => { const [n, s] = p.split(":"); return [n, +s]; });
  const sorted = rows.map((r, i) => [...r, i]).sort((a, b) => b[1] - a[1] || a[2] - b[2]);
  return `Scores: ${line}\n` + sorted.map(([n, s], i) => `${i + 1}. ${n} ${s}`).join("\n");
};
const judges = (line) => { const s = line.split(" ").map(Number).sort((a, b) => a - b).slice(1, -1); return `Scores: ${line}\nKept: ${pyList(s)}\nAverage: ${(s.reduce((a, b) => a + b, 0) / s.length).toFixed(2)}`; };
const wordfreq = (text) => {
  const words = text.split(" "), c = new Map();
  words.forEach((w) => c.set(w, (c.get(w) || 0) + 1));
  const top = [...c].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).slice(0, 3);
  const long = [...new Set(words)].filter((w) => w.length >= 4).sort();
  return [`Text: ${text}`, ...top.map(([w, n], i) => `${i + 1}. ${w} (${n})`), `Long words: ${pyList(long)}`].join("\n");
};

const EX = {
  listcomp: {
    id: "listcomp", kind: "type", title: "Lists in one line",
    task: <>A <strong>list comprehension</strong> builds a list from a loop in one expression: <code>[what for item in things if condition]</code>. Read each one aloud: “n times n, for n in 1 to 5”.</>,
    show: 'squares = [n * n for n in range(1, 6)]\nevens = [n for n in range(1, 11) if n % 2 == 0]\nshout = [w.upper() for w in ["hi", "there"]]\n\nprint(squares)\nprint(evens)\nprint(shout)',
    tests: [{ expect: "[1, 4, 9, 16, 25]\n[2, 4, 6, 8, 10]\n['HI', 'THERE']" }],
    requires: [{ node: "ListComp", min: 3 }],
    hints: ["The if at the end filters; the expression at the front transforms."],
    solution: 'squares = [n * n for n in range(1, 6)]\nevens = [n for n in range(1, 11) if n % 2 == 0]\nshout = [w.upper() for w in ["hi", "there"]]\n\nprint(squares)\nprint(evens)\nprint(shout)',
  },
  rewrite: {
    id: "rewrite", kind: "modify", title: "Loop → comprehension",
    task: <>This works, but takes five lines to say “the long names, in capitals”. Replace the loop and the empty list with <strong>one</strong> list comprehension. Same output.</>,
    starter: 'names = input("Names: ").split()\nlong_names = []\nfor name in names:\n    if len(name) > 3:\n        long_names.append(name.upper())\nprint(long_names)',
    tests: [{ inputs: ["Asha Ben Chen Divya"], expect: "Names: Asha Ben Chen Divya\n['ASHA', 'CHEN', 'DIVYA']" }, { inputs: ["Al Bo"], expect: "Names: Al Bo\n[]", hidden: true }],
    requires: [{ node: "ListComp" }],
    forbids: [{ node: "For", msg: "No for statement — put the loop inside the brackets." }, { call: "append" }],
    hints: ["[ what  for name in names  if condition ]", "long_names = [name.upper() for name in names if len(name) > 3]"],
    solution: 'names = input("Names: ").split()\nlong_names = [name.upper() for name in names if len(name) > 3]\nprint(long_names)',
  },
  passfail: {
    id: "passfail", kind: "write", title: "if/else inside",
    task: <>To <em>choose</em> a value for every item (not filter), put a one-line if/else at the <strong>front</strong>: <code>["pass" if m &gt;= 40 else "fail" for m in marks]</code>. Ask <code>Marks: </code> and print the list of results, then <code>Passed: 2/3</code> (count with another comprehension and <code>len</code>).</>,
    tests: [{ inputs: ["55 32 78"], expect: "Marks: 55 32 78\n['pass', 'fail', 'pass']\nPassed: 2/3" }, { inputs: ["40 39"], expect: "Marks: 40 39\n['pass', 'fail']\nPassed: 1/2", hidden: true }],
    requires: [{ node: "ListComp", min: 2 }, { node: "IfExp" }],
    forbids: [{ node: "For", msg: "Use comprehensions, not a for statement." }],
    hints: ["marks = [int(x) for x in input(\"Marks: \").split()]", "passed = [m for m in marks if m >= 40]  — then len(passed)"],
    solution: 'marks = [int(x) for x in input("Marks: ").split()]\nresults = ["pass" if m >= 40 else "fail" for m in marks]\nprint(results)\npassed = [m for m in marks if m >= 40]\nprint(f"Passed: {len(passed)}/{len(marks)}")',
  },
  dictcomp: {
    id: "dictcomp", kind: "write", title: "Dict and set comprehensions",
    task: <>Curly brackets work too: <code>{"{"}w: len(w) for w in words{"}"}</code> builds a <strong>dictionary</strong>; <code>{"{"}len(w) for w in words{"}"}</code> builds a <strong>set</strong> (no repeats). Ask <code>Words: </code>; print the word → length dictionary, then <code>Lengths seen: [3, 4]</code> — the set, sorted into a list.</>,
    tests: [{ inputs: ["sun moon star"], expect: lengths("sun moon star") }, { inputs: ["a bb a"], expect: lengths("a bb a"), hidden: true, why: "A repeated word is just one key in the dictionary." }],
    requires: [{ node: "DictComp" }, { node: "SetComp" }],
    forbids: [{ node: "For", msg: "Use comprehensions, not a for statement." }],
    hints: ["sizes = {w: len(w) for w in words}", "seen = {len(w) for w in words}; print(\"Lengths seen:\", sorted(seen))"],
    solution: 'words = input("Words: ").split()\nsizes = {w: len(w) for w in words}\nprint(sizes)\nseen = {len(w) for w in words}\nprint(f"Lengths seen: {sorted(seen)}")',
  },
  prices: {
    id: "prices", kind: "complete", title: "Transform a dictionary",
    task: <>Loop over <code>.items()</code> inside a dict comprehension to build a new dictionary from an old one. Fill in the blanks: a 10% sale on everything, and a dictionary of only the items under 100 after the sale.</>,
    starter: 'prices = {"pen": 10, "book": 60, "bag": 450, "lamp": 110}\n\nsale = {item: ___ for item, p in prices.items()}\ncheap = {item: p for item, p in sale.items() if ___}\n\nprint(sale)\nprint(cheap)',
    tests: [{ expect: "{'pen': 9.0, 'book': 54.0, 'bag': 405.0, 'lamp': 99.0}\n{'pen': 9.0, 'book': 54.0, 'lamp': 99.0}" }],
    requires: [{ node: "DictComp", min: 2 }],
    hints: ["p * 0.9 — then round(…, 2) keeps it tidy", "if p < 100"],
    solution: 'prices = {"pen": 10, "book": 60, "bag": 450, "lamp": 110}\n\nsale = {item: round(p * 0.9, 2) for item, p in prices.items()}\ncheap = {item: p for item, p in sale.items() if p < 100}\n\nprint(sale)\nprint(cheap)',
  },
  sortkey: {
    id: "sortkey", kind: "type", title: "sorted(key=…)",
    task: <><code>sorted</code> can sort by anything: <code>key=</code> takes a function that turns each item into the value to compare. <code>key=len</code> sorts by length. A <strong>lambda</strong> is a tiny nameless function written inline: <code>lambda s: s[1]</code> means “given s, give back s[1]”.</>,
    show: 'words = ["banana", "fig", "apple", "kiwi"]\nprint(sorted(words))\nprint(sorted(words, key=len))\nprint(sorted(words, key=len, reverse=True))\n\nstudents = [("Asha", 82), ("Ben", 45), ("Chen", 91)]\nprint(sorted(students, key=lambda s: s[1]))\nprint(max(students, key=lambda s: s[1]))',
    tests: [{ expect: "['apple', 'banana', 'fig', 'kiwi']\n['fig', 'kiwi', 'apple', 'banana']\n['banana', 'apple', 'kiwi', 'fig']\n[('Ben', 45), ('Asha', 82), ('Chen', 91)]\n('Chen', 91)" }],
    requires: [{ node: "Lambda", min: 2 }],
    hints: ["Without a key, tuples sort by their first item — the name. The lambda says: compare by the mark instead."],
    solution: 'words = ["banana", "fig", "apple", "kiwi"]\nprint(sorted(words))\nprint(sorted(words, key=len))\nprint(sorted(words, key=len, reverse=True))\n\nstudents = [("Asha", 82), ("Ben", 45), ("Chen", 91)]\nprint(sorted(students, key=lambda s: s[1]))\nprint(max(students, key=lambda s: s[1]))',
  },
  leader: {
    id: "leader", kind: "write", title: "Leaderboard",
    task: <>Ask <code>Scores: </code> as <code>name:score</code> pairs (e.g. <code>Asha:82 Ben:45</code>). Build a list of (name, score) tuples, sort it highest first with a <code>lambda</code> key, and print ranks with <code>enumerate(…, start=1)</code>: <code>1. Chen 91</code>. Equal scores keep the order they were typed (sorted is <em>stable</em>).</>,
    tests: [
      { inputs: ["Asha:82 Ben:45 Chen:91 Dev:82"], expect: leader("Asha:82 Ben:45 Chen:91 Dev:82") },
      { inputs: ["Zed:10"], expect: leader("Zed:10"), hidden: true },
      { inputs: ["Bo:5 Al:5 Cy:7"], expect: leader("Bo:5 Al:5 Cy:7"), hidden: true, why: "Ties keep their typed order — sort by the score only (reverse=True), not by name too." },
    ],
    requires: [{ node: "Lambda" }, { call: "sorted" }, { call: "enumerate" }],
    hints: ['pairs = [p.split(":") for p in input("Scores: ").split()] — then make (name, int(score)) tuples', "ranked = sorted(rows, key=lambda r: r[1], reverse=True)", 'for i, (name, score) in enumerate(ranked, start=1): print(f"{i}. {name} {score}")'],
    solution: 'rows = []\nfor pair in input("Scores: ").split():\n    name, score = pair.split(":")\n    rows.append((name, int(score)))\n\nranked = sorted(rows, key=lambda r: r[1], reverse=True)\nfor i, (name, score) in enumerate(ranked, start=1):\n    print(f"{i}. {name} {score}")',
  },
  anyall: {
    id: "anyall", kind: "write", title: "any() and all()",
    task: <><code>all(…)</code> is True if <em>every</em> item is true; <code>any(…)</code> if <em>at least one</em> is. Feed them a comprehension without the brackets: <code>all(m &gt;= 40 for m in marks)</code>. Ask <code>Marks: </code>; print <code>All passed: False</code> and <code>Any distinction: True</code> (distinction is 75 or more). No for statements, no if.</>,
    tests: [{ inputs: ["55 32 78"], expect: "Marks: 55 32 78\nAll passed: False\nAny distinction: True" }, { inputs: ["90 80"], expect: "Marks: 90 80\nAll passed: True\nAny distinction: True", hidden: true }, { inputs: ["10 20"], expect: "Marks: 10 20\nAll passed: False\nAny distinction: False", hidden: true }],
    requires: [{ call: "any" }, { call: "all" }],
    forbids: [{ node: "For", msg: "Let any() and all() do the looping." }, { node: "If" }],
    hints: ['print(f"All passed: {all(m >= 40 for m in marks)}")'],
    solution: 'marks = [int(x) for x in input("Marks: ").split()]\nprint(f"All passed: {all(m >= 40 for m in marks)}")\nprint(f"Any distinction: {any(m >= 75 for m in marks)}")',
  },
  unpack: {
    id: "unpack", kind: "type", title: "Star unpacking and swaps",
    task: <>Unpacking (7.4) gets a <code>*</code>: the starred name collects <em>everything left over</em> into a list. And swapping two variables needs no temporary.</>,
    show: 'scores = [7, 9, 4, 8, 10]\nfirst, *rest = scores\n*others, last = scores\nlow, *middle, high = sorted(scores)\nprint(first, rest)\nprint(last)\nprint(low, middle, high)\n\na, b = 1, 2\na, b = b, a\nprint(a, b)',
    tests: [{ expect: "7 [9, 4, 8, 10]\n10\n4 [7, 8, 9] 10\n2 1" }],
    requires: [{ node: "Starred", min: 3 }],
    hints: ["Only one name per unpacking can have the star."],
    solution: 'scores = [7, 9, 4, 8, 10]\nfirst, *rest = scores\n*others, last = scores\nlow, *middle, high = sorted(scores)\nprint(first, rest)\nprint(last)\nprint(low, middle, high)\n\na, b = 1, 2\na, b = b, a\nprint(a, b)',
  },
  judges: {
    id: "judges", kind: "write", title: "The judges' score",
    task: <>In diving, the highest and lowest judges' scores are dropped and the rest averaged. Ask <code>Scores: </code> (at least three), sort them, and use star unpacking to drop the ends: print <code>Kept: [7, 8, 9]</code> and <code>Average: 8.00</code>.</>,
    tests: [{ inputs: ["7 9 4 8 10"], expect: judges("7 9 4 8 10") }, { inputs: ["5 5 5"], expect: judges("5 5 5"), hidden: true }, { inputs: ["6 1 9 2"], expect: judges("6 1 9 2"), hidden: true }],
    requires: [{ node: "Starred" }],
    forbids: [{ call: "remove", msg: "Use star unpacking, not remove()." }],
    hints: ["low, *kept, high = sorted(scores)", "sum(kept) / len(kept)"],
    solution: 'scores = [int(x) for x in input("Scores: ").split()]\nlow, *kept, high = sorted(scores)\nprint(f"Kept: {kept}")\nprint(f"Average: {sum(kept) / len(kept):.2f}")',
  },
  wordfreq: {
    id: "wordfreq", kind: "make", title: "Word-frequency report",
    task: <>Ask <code>Text: </code> (lowercase words). Count each word with a <strong>dict comprehension</strong> (hint: over <code>set(words)</code>, using <code>words.count(w)</code>). Print the top three, most frequent first and ties in alphabetical order — one <code>sorted</code> with <code>key=lambda item: (-item[1], item[0])</code> does both — as <code>1. the (3)</code>. Last, print <code>Long words: […]</code>: the distinct words of 4+ letters, sorted, from a comprehension.</>,
    minLines: 8,
    tests: [
      { inputs: ["the quick fox and the lazy dog and the end"], expect: wordfreq("the quick fox and the lazy dog and the end") },
      { inputs: ["b a b a c"], expect: wordfreq("b a b a c"), hidden: true, why: "a and b both appear twice — ties go alphabetically: (-count, word)." },
      { inputs: ["data data science"], expect: wordfreq("data data science"), hidden: true, why: "Fewer than three distinct words — slice the sorted list with [:3]." },
    ],
    requires: [{ node: "DictComp" }, { node: "Lambda" }, { call: "sorted", min: 2 }],
    hints: ["counts = {w: words.count(w) for w in set(words)}", "top = sorted(counts.items(), key=lambda item: (-item[1], item[0]))[:3]", "long = sorted({w for w in words if len(w) >= 4})"],
    solution: 'words = input("Text: ").split()\ncounts = {w: words.count(w) for w in set(words)}\ntop = sorted(counts.items(), key=lambda item: (-item[1], item[0]))[:3]\nfor i, (word, n) in enumerate(top, start=1):\n    print(f"{i}. {word} ({n})")\nlong = sorted({w for w in words if len(w) >= 4})\nprint(f"Long words: {long}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What does [x * 2 for x in [1, 2, 3] if x > 1] give?", options: ["[2, 4, 6]", "[4, 6]", "[1, 2, 3]", "[2, 3]"], answer: 1, explain: "Filter first (2 and 3), then transform (×2)." },
  { q: "Which builds a dictionary?", options: ["[k: v for k, v in d.items()]", "{k: v for k, v in d.items()}", "(k, v for k, v in d)", "{k for k in d}"], answer: 1, explain: "Curly brackets with key: value. {k for k in d} is a set." },
  { q: "sorted(words, key=len) sorts by…", options: ["Alphabet", "Length of each word", "Reverse order", "Nothing — error"], answer: 1, explain: "key turns each item into the value used for comparing." },
  { q: "lambda x: x * x is…", options: ["A list", "A small nameless function that returns x * x", "A loop", "A variable"], answer: 1, explain: "Same as def f(x): return x * x — written inline." },
  { q: "a, *b = [1, 2, 3] makes b equal to…", options: ["2", "[2, 3]", "(2, 3)", "3"], answer: 1, explain: "The starred name collects the rest, always as a list." },
];

export default function Unit11_2(props) {
  const sections = [
    { label: "Comprehensions", kicker: "LOOPS IN ONE LINE", title: "List comprehensions, properly", blocks: [
      <P>You met the comprehension as a bonus in 7.3. Pythonistas use it everywhere — when it reads like a sentence. Three shapes:</P>,
      <CodeBlock title="three shapes" code={'[f(x) for x in items]                 # transform every item\n[x for x in items if test(x)]         # keep only some\n[a if test(x) else b for x in items]  # choose for every item'} />,
      EX.listcomp, EX.rewrite, EX.passfail,
    ] },
    { label: "Dict & Set", kicker: "CURLY BRACKETS", title: "Dict and set comprehensions", blocks: [EX.dictcomp, EX.prices] },
    { label: "Sort by Key", kicker: "key= AND lambda", title: "Sorting by anything", blocks: [EX.sortkey, EX.leader, <KeyIdea>key= works with sorted, .sort, min and max. Use lambda for one small expression; anything longer deserves a proper def with a name.</KeyIdea>] },
    { label: "any · all · *", kicker: "SMALL TOOLS", title: "any, all and star unpacking", blocks: [EX.anyall, EX.unpack, EX.judges] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: word-frequency report", blocks: [
      EX.wordfreq,
      <Note color={T.blue} icon="💡">Pythonic doesn't mean shortest. If a comprehension needs two ifs and a nested loop, a plain for loop is kinder to the next reader.</Note>,
    ] },
  ];
  return (
    <LessonShell {...props} unitId="Unit11_2" crumb="MODULE 11 › 2" title="Pythonic Python" sections={sections} quiz={QUIZ}
      next={{ title: "Module 12 — Meet Pandas", text: "Tables of real data: the DataFrame." }} />
  );
}
