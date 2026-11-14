// Unit CT3.2 — Recursion in Action (rebuilt, typing-first)
// Fibonacci → the exploding call tree (count the calls) → memoisation with a
// dict fixes a timeout → digit sum and string reverse → recursive binary
// search → Euclid's GCD make-task.

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const comments = (min) => ({ text: "#", min, msg: `Name the base case and the recursive case in at least ${min} # comment lines.` });
const fibs = (n) => { const a = [0, 1]; for (let i = 2; i <= n; i++) a.push(a[i - 1] + a[i - 2]); return a.slice(0, n + 1); };
const calls = (n) => { let c = 0; const f = (k) => { c++; return k < 2 ? k : f(k - 1) + f(k - 2); }; f(n); return c; };
const DATA = [3, 8, 12, 19, 23, 31, 45, 52, 67, 74, 88];

const EX = {
  fib: {
    id: "fib", kind: "write", title: "Fibonacci",
    task: <>The Fibonacci numbers start 0, 1 and each next one is the sum of the previous two. Write <code>fib(n)</code> recursively (two base cases: fib(0) = 0, fib(1) = 1). Ask <code>n: </code> and print fib(0) to fib(n) on one line.</>,
    tests: [{ inputs: ["10"], expect: "n: 10\n" + fibs(10).join(" ") }, { inputs: ["1"], expect: "n: 1\n0 1", hidden: true }],
    post: "assert fib(15) == 610",
    requires: [comments(2), { node: "FunctionDef" }],
    hints: ["if n < 2: return n", "return fib(n - 1) + fib(n - 2)", 'for i in range(n + 1): print(fib(i), end=" ")'],
    solution: '# base cases: fib(0) = 0, fib(1) = 1\n# recursive case: fib(n) = fib(n-1) + fib(n-2)\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nn = int(input("n: "))\nfor i in range(n + 1):\n    print(fib(i), end=" ")',
  },
  count: {
    id: "count", kind: "type", title: "How many calls?",
    task: <>fib calls itself twice, and each of those calls itself twice… Count every call with a dictionary entry the function updates (a dict passed around, so no global). Predict how fast the count grows before you run it.</>,
    show: 'def fib(n, counter):\n    counter["calls"] += 1\n    if n < 2:\n        return n\n    return fib(n - 1, counter) + fib(n - 2, counter)\n\nfor n in [10, 20, 25]:\n    counter = {"calls": 0}\n    fib(n, counter)\n    print(n, counter["calls"])',
    tests: [{ expect: [10, 20, 25].map((n) => `${n} ${calls(n)}`).join("\n") }],
    hints: ["Each step of n roughly multiplies the calls by 1.6 — exponential growth."],
    solution: 'def fib(n, counter):\n    counter["calls"] += 1\n    if n < 2:\n        return n\n    return fib(n - 1, counter) + fib(n - 2, counter)\n\nfor n in [10, 20, 25]:\n    counter = {"calls": 0}\n    fib(n, counter)\n    print(n, counter["calls"])',
  },
  memo: {
    id: "memo", kind: "fix", title: "Memoisation",
    task: <>fib(80) would take years this way — the runner stops it after 5 seconds. Run it. Then fix it by <strong>remembering</strong> answers: before computing, look in a dictionary <code>memo</code>; after computing, store the result there. Same recursion, each fib(k) worked out only once.</>,
    starter: 'def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(80))',
    tests: [{ expect: "23416728348467685" }],
    requires: [{ node: "Dict", msg: "Use a dictionary to remember answers you've already worked out." }],
    hints: ["memo = {} outside the function.", "if n in memo: return memo[n] — then compute, store memo[n] = result, return it."],
    solution: 'memo = {}\n\ndef fib(n):\n    if n < 2:\n        return n\n    if n in memo:\n        return memo[n]\n    result = fib(n - 1) + fib(n - 2)\n    memo[n] = result\n    return result\n\nprint(fib(80))',
  },
  digits: {
    id: "digits", kind: "write", title: "Digits and strings, recursively",
    task: <>Write two recursive functions: <code>digit_sum(n)</code> (0 for 0; otherwise last digit + digit_sum of the rest) and <code>reverse(s)</code> (empty string for empty; otherwise reverse of the rest + first character). Ask <code>Number: </code> and <code>Word: </code>; print <code>Digit sum: 10</code> and <code>Reversed: nohtyp</code>.</>,
    tests: [{ inputs: ["253", "python"], expect: "Number: 253\nWord: python\nDigit sum: 10\nReversed: nohtyp" }, { inputs: ["0", "a"], expect: "Number: 0\nWord: a\nDigit sum: 0\nReversed: a", hidden: true }],
    post: "assert digit_sum(9999) == 36 and reverse('abc') == 'cba' and reverse('') == ''",
    requires: [comments(2), { node: "FunctionDef", min: 2 }],
    forbids: [{ text: "::-1", msg: "Reverse it recursively, not with slicing [::-1]." }, { node: "For" }, { node: "While" }],
    hints: ["digit_sum: return n % 10 + digit_sum(n // 10)", "reverse: return reverse(s[1:]) + s[0]"],
    solution: '# digit_sum: base 0 -> 0; else last digit + digit_sum(rest)\n# reverse: base "" -> ""; else reverse(rest) + first\ndef digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n // 10)\n\ndef reverse(s):\n    if s == "":\n        return ""\n    return reverse(s[1:]) + s[0]\n\nn = int(input("Number: "))\nw = input("Word: ")\nprint(f"Digit sum: {digit_sum(n)}")\nprint(f"Reversed: {reverse(w)}")',
  },
  bsearch: {
    id: "bsearch", kind: "write", title: "Recursive binary search",
    task: <>Write <code>search(data, target, low, high)</code> returning the index or -1, recursively: if low &gt; high, it's not there (base case); otherwise check the middle and search <em>one</em> half. Search <code>data = [3, 8, 12, 19, 23, 31, 45, 52, 67, 74, 88]</code> for the number typed after <code>Find: </code>; print <code>Index: 8</code>.</>,
    tests: [{ inputs: ["67"], expect: `Find: 67\nIndex: ${DATA.indexOf(67)}` }, { inputs: ["50"], expect: "Find: 50\nIndex: -1", hidden: true }, { inputs: ["3"], expect: "Find: 3\nIndex: 0", hidden: true }],
    post: "_d = [1, 3, 5, 7, 9, 11]\nassert [search(_d, x, 0, len(_d) - 1) for x in [1, 9, 11, 4]] == [0, 4, 5, -1]",
    requires: [comments(2), { node: "FunctionDef" }],
    forbids: [{ node: "While", msg: "Recursion replaces the while loop here." }, { call: "index" }],
    hints: ["mid = (low + high) // 2", "Too small → return search(data, target, mid + 1, high); too big → search(data, target, low, mid - 1)."],
    solution: '# base cases: low > high -> -1; middle matches -> mid\n# recursive case: search only the half that can contain target\ndef search(data, target, low, high):\n    if low > high:\n        return -1\n    mid = (low + high) // 2\n    if data[mid] == target:\n        return mid\n    if data[mid] < target:\n        return search(data, target, mid + 1, high)\n    return search(data, target, low, mid - 1)\n\ndata = [3, 8, 12, 19, 23, 31, 45, 52, 67, 74, 88]\nt = int(input("Find: "))\nprint(f"Index: {search(data, t, 0, len(data) - 1)}")',
  },
  gcd: {
    id: "gcd", kind: "make", title: "Euclid's GCD",
    task: <>Euclid's 2,300-year-old algorithm: gcd(a, 0) = a; otherwise gcd(a, b) = gcd(b, a % b). Write it recursively and use it for <code>lcm(a, b) = a * b // gcd(a, b)</code>. Ask <code>a: </code> and <code>b: </code>; print <code>GCD: 6</code> and <code>LCM: 72</code>. Compare: CT1.3 searched every candidate; this takes a handful of steps even for huge numbers.</>,
    minLines: 12,
    tests: [{ inputs: ["18", "24"], expect: "a: 18\nb: 24\nGCD: 6\nLCM: 72" }, { inputs: ["1071", "462"], expect: "a: 1071\nb: 462\nGCD: 21\nLCM: 23562", hidden: true }],
    post: "assert gcd(7, 13) == 1 and gcd(100, 75) == 25 and lcm(4, 6) == 12",
    requires: [comments(2), { node: "FunctionDef", min: 2 }],
    forbids: [{ text: "math.gcd" }, { node: "For" }, { node: "While" }],
    hints: ["if b == 0: return a", "return gcd(b, a % b)"],
    solution: '# base case: gcd(a, 0) = a\n# recursive case: gcd(a, b) = gcd(b, a % b)\ndef gcd(a, b):\n    if b == 0:\n        return a\n    return gcd(b, a % b)\n\ndef lcm(a, b):\n    return a * b // gcd(a, b)\n\na = int(input("a: "))\nb = int(input("b: "))\nprint(f"GCD: {gcd(a, b)}")\nprint(f"LCM: {lcm(a, b)}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why is plain recursive fib so slow?", options: ["Python is slow", "It recomputes the same values again and again — the calls grow exponentially", "Too many base cases", "Recursion is always slow"], answer: 1, explain: "fib(25) makes over 240,000 calls." },
  { q: "What does memoisation do?", options: ["Deletes calls", "Stores each answer the first time, and looks it up afterwards", "Uses a loop", "Prints faster"], answer: 1, explain: "Each fib(k) is computed once: from exponential to linear." },
  { q: "In recursive binary search, what is the base case for “not found”?", options: ["mid == 0", "low > high", "target == 0", "len(data) == 1"], answer: 1, explain: "Nothing left to search." },
  { q: "gcd(18, 24) → gcd(24, 18) → gcd(18, 6) → gcd(6, 0) → ?", options: ["0", "6", "18", "24"], answer: 1, explain: "Base case: gcd(a, 0) = a." },
];

export default function UnitCT3_2(props) {
  const sections = [
    { label: "Fibonacci", kicker: "TWO CALLS EACH", title: "Fibonacci and the exploding call tree", blocks: [EX.fib, EX.count, <Note color={T.blue} icon="🌳">Each fib(n) calls two more; the tree of calls roughly doubles at every level. That's exponential growth — and why fib(80) never finishes.</Note>] },
    { label: "Memoisation", kicker: "REMEMBER ANSWERS", title: "From hopeless to instant", blocks: [EX.memo, <KeyIdea>If a recursive function solves the same sub-problem many times, store each answer in a dictionary the first time. This idea (dynamic programming) powers many famous algorithms.</KeyIdea>] },
    { label: "More Shapes", kicker: "NUMBERS · STRINGS · SEARCH", title: "The same pattern everywhere", blocks: [EX.digits, EX.bsearch] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: Euclid's GCD", blocks: [EX.gcd] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT3_2" crumb="COMPUTATIONAL THINKING III › 2" title="Recursion in Action" sections={sections} quiz={QUIZ}
      next={{ title: "CT III · 3 — Tower of Hanoi", text: "The puzzle that's nearly impossible by hand — and three lines of recursion." }} />
  );
}
