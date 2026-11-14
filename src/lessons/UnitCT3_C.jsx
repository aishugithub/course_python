// UnitCT3_C — The Crucible: Computational Thinking III (rebuilt, typing-first)
// Recursion. Spark: trace calls on the way down and up; a doubling pattern and
// counting the calls of plain fib. Flame: digit sum with / (never reaches the
// base case cleanly); a palindrome check that shrinks from one end only.
// Forge: flatten a nested list and measure its depth. Temper: all
// permutations of a word, recursively, base and recursive case as comments.

import CrucibleShell from "../kit/Crucible.jsx";

const comments = (min) => ({ text: "#", min, msg: `Name the base case and the recursive case in at least ${min} # comment lines.` });
const perms = (s) => (s.length <= 1 ? [s] : [...new Set(s.split("").flatMap((ch, i) => perms(s.slice(0, i) + s.slice(i + 1)).map((p) => ch + p)))]).sort();
const permTest = (w, extra = {}) => { const p = perms(w); return { inputs: [w], expect: [`Word: ${w}`, ...p, `Count: ${p.length}`].join("\n"), ...extra }; };

const EX = {
  spark1: {
    id: "spark1", kind: "predict", title: "Down and back up",
    code: 'def mystery(n):\n    if n <= 0:\n        return 0\n    print("in", n)\n    result = n + mystery(n - 2)\n    print("out", n, result)\n    return result\n\nprint(mystery(5))',
    task: <>Lines before the recursive call print on the way <em>down</em>; lines after it print on the way back <em>up</em>, deepest call first.</>,
    hints: ["mystery(5) calls mystery(3), which calls mystery(1), which calls mystery(-1) — the base case, returning 0.", "Then each call finishes: mystery(1) is 1 + 0, mystery(3) is 3 + 1 …"],
    solution: "in 5\nin 3\nin 1\nout 1 1\nout 3 4\nout 5 9\n9",
  },
  spark2: {
    id: "spark2", kind: "predict", title: "Patterns and call counts",
    code: 'def pattern(n):\n    if n == 0:\n        return ""\n    return pattern(n - 1) + str(n) + pattern(n - 1)\n\nprint(pattern(3))\nprint(len(pattern(5)))\n\ndef fib(n, calls):\n    calls[0] += 1\n    if n < 2:\n        return n\n    return fib(n - 1, calls) + fib(n - 2, calls)\n\nc = [0]\nprint(fib(6, c), c[0])',
    task: <>Build <code>pattern</code> up from the smallest case. For the call count, the list <code>c</code> is shared by every call.</>,
    hints: ["pattern(1) is \"1\", pattern(2) is \"121\". Each step doubles the length and adds 1.", "fib(6) is 8.", "calls(n) = 1 + calls(n − 1) + calls(n − 2), with calls(0) = calls(1) = 1."],
    solution: "1213121\n31\n8 25",
  },
  digits: {
    id: "digits", kind: "fix", title: "A digit sum that goes wrong",
    task: <>It should add the digits: 1234 → 10. It prints a long decimal instead. Find why the recursion doesn't shrink the number the way it should, and fix it.</>,
    starter: 'def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n / 10)\n\nprint(digit_sum(int(input("Number: "))))',
    tests: [{ inputs: ["1234"], expect: "Number: 1234\n10" }, { inputs: ["0"], expect: "Number: 0\n0", hidden: true }, { inputs: ["99999"], expect: "Number: 99999\n45", hidden: true }],
    post: "assert digit_sum(505) == 10",
    hints: ["1234 / 10 is 123.4 — not 123.", "Which operator drops the last digit and keeps a whole number?"],
    solution: 'def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(int(input("Number: "))))',
  },
  palindrome: {
    id: "palindrome", kind: "fix", title: "Palindromes, recursively",
    task: <>A word is a palindrome if its first and last letters match <em>and</em> the middle is a palindrome. This version says <code>level</code> isn't one. Fix the recursive call.</>,
    starter: 'def is_pal(s):\n    if len(s) <= 1:\n        return True\n    if s[0] != s[-1]:\n        return False\n    return is_pal(s[1:])\n\nfor w in input("Words: ").split():\n    print(w, is_pal(w))',
    tests: [{ inputs: ["level abca noon x"], expect: "Words: level abca noon x\nlevel True\nabca False\nnoon True\nx True" }, { inputs: ["aba racecar ab"], expect: "Words: aba racecar ab\naba True\nracecar True\nab False", hidden: true }],
    post: "assert is_pal('') and is_pal('abba') and not is_pal('abcab')",
    forbids: [{ text: "[::-1]", msg: "Solve it recursively, without reversing." }],
    hints: ["Once the outer letters match, which part is left to check?", "Drop BOTH ends: s[1:-1]"],
    solution: 'def is_pal(s):\n    if len(s) <= 1:\n        return True\n    if s[0] != s[-1]:\n        return False\n    return is_pal(s[1:-1])\n\nfor w in input("Words: ").split():\n    print(w, is_pal(w))',
  },
  nested: {
    id: "nested", kind: "complete", title: "Lists inside lists",
    task: <>A list can hold lists, which can hold lists… Recursion handles any depth. Fill the blanks: <code>flatten</code> gives every number in one flat list; <code>depth</code> counts how deep the nesting goes (a plain list is 1 deep).</>,
    starter: 'def flatten(items):\n    result = []\n    for x in items:\n        if isinstance(x, list):\n            result += ___\n        else:\n            result.___(x)\n    return result\n\ndef depth(items):\n    if not isinstance(items, list):\n        return 0\n    deepest = 0\n    for x in items:\n        d = ___\n        if d > deepest:\n            deepest = d\n    return ___\n\ndata = [1, [2, [3, 4], 5], [[6]], 7]\nprint(flatten(data))\nprint("Depth:", depth(data))',
    tests: [{ expect: "[1, 2, 3, 4, 5, 6, 7]\nDepth: 3" }],
    post: "assert flatten([[[[1]]], 2]) == [1, 2] and depth([]) == 1 and depth([[[[1]]], 2]) == 4 and depth(5) == 0",
    hints: ["flatten(x) — trust the recursive call to flatten the inner list.", "result.append(x)", "d = depth(x), and the list itself adds one level: return deepest + 1"],
    solution: 'def flatten(items):\n    result = []\n    for x in items:\n        if isinstance(x, list):\n            result += flatten(x)\n        else:\n            result.append(x)\n    return result\n\ndef depth(items):\n    if not isinstance(items, list):\n        return 0\n    deepest = 0\n    for x in items:\n        d = depth(x)\n        if d > deepest:\n            deepest = d\n    return deepest + 1\n\ndata = [1, [2, [3, 4], 5], [[6]], 7]\nprint(flatten(data))\nprint("Depth:", depth(data))',
  },
  permutations: {
    id: "permutations", kind: "make", title: "Every arrangement",
    task: <>Write <code>permutations(s)</code> that returns a list of every ordering of the letters of <code>s</code>, recursively: a word of 0 or 1 letters has one ordering (itself); otherwise, for each position, take that letter out, find all orderings of the rest, and put the letter in front of each. Ask <code>Word: </code>, print the <strong>distinct</strong> orderings in alphabetical order, one per line, then <code>Count: 6</code>. Name the base and recursive case in comments. No imports.</>,
    minLines: 14,
    tests: [permTest("abc"), permTest("aab", { hidden: true, why: "Repeated letters make repeated orderings — print each distinct one once (a set helps)." }), permTest("z", { hidden: true }), permTest("dcba", { hidden: true })],
    post: "assert sorted(set(permutations('ab'))) == ['ab', 'ba'], 'permutations(\"ab\") should give [\"ab\", \"ba\"] in some order.'\nassert len(permutations('abcd')) == 24, 'permutations() should return every ordering, repeats included (de-duplicate when printing).'",
    requires: [comments(2), { node: "FunctionDef" }],
    forbids: [{ node: "Import", msg: "No itertools — build it with recursion." }, { node: "ImportFrom", msg: "No itertools — build it with recursion." }],
    hints: ["if len(s) <= 1: return [s]", "for i in range(len(s)): rest = s[:i] + s[i + 1:] — then for p in permutations(rest): result.append(s[i] + p)", "sorted(set(permutations(word))) gives the distinct ones in order."],
    solution: '# base case: 0 or 1 letters -> the only ordering is the word itself\n# recursive case: each letter in turn goes first, followed by every ordering of the rest\ndef permutations(s):\n    if len(s) <= 1:\n        return [s]\n    result = []\n    for i in range(len(s)):\n        rest = s[:i] + s[i + 1:]\n        for p in permutations(rest):\n            result.append(s[i] + p)\n    return result\n\nword = input("Word: ")\nunique = sorted(set(permutations(word)))\nfor p in unique:\n    print(p)\nprint("Count:", len(unique))',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "In a recursive function, code AFTER the recursive call runs…", options: ["Before the call", "On the way back up, deepest call first", "Only once", "Never"], answer: 1, explain: "Each call waits for the deeper one to return, then finishes." },
  { q: "A word with 4 different letters has how many orderings?", options: ["4", "8", "16", "24"], answer: 3, explain: "4 × 3 × 2 × 1 = 24." },
  { q: "digit_sum(n / 10) never stops cleanly because…", options: ["/ makes decimals, so n never lands exactly on 0 quickly", "Recursion can't use /", "n gets bigger", "% is wrong"], answer: 0, explain: "// keeps whole numbers and reaches 0 in a few steps." },
];

export default function UnitCT3_C(props) {
  return <CrucibleShell {...props} unitId="UnitCT3_C" module="Computational Thinking III" title="The Crucible: Recursion" spark={[EX.spark1, EX.spark2]} flame={[EX.digits, EX.palindrome]} forge={[EX.nested]} temper={[EX.permutations]} quiz={QUIZ} />;
}
