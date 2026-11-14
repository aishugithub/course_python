// UnitCT2_C — The Crucible: Computational Thinking II (rebuilt, typing-first)
// Lists, no functions (CT II comes before Module 8). Spark: trace bubble sort
// pass by pass; trace binary search. Flame: selection sort comparing with the
// wrong item; duplicates reported more than once. Forge: merge two sorted
// lists. Temper: run-length encoding, algorithm first as # comments.

import CrucibleShell from "../kit/Crucible.jsx";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });
function rle(text) {
  let enc = "", best = "", bestN = 0, i = 0;
  while (i < text.length) { let j = i; while (j < text.length && text[j] === text[i]) j++; enc += text[i] + (j - i); if (j - i > bestN) { bestN = j - i; best = text[i]; } i = j; }
  return `Text: ${text}\nEncoded: ${enc}\nLongest run: ${best} (${bestN})`;
}
const rleTest = (t, extra = {}) => ({ inputs: [t], expect: rle(t), ...extra });
const readNums = 'nums = []\nfor x in input("Numbers: ").split():\n    nums.append(int(x))\n';

const EX = {
  spark1: {
    id: "spark1", kind: "predict", title: "Bubble sort, pass by pass",
    code: 'data = [5, 1, 4, 2]\nfor p in range(len(data) - 1):\n    swapped = False\n    for i in range(len(data) - 1 - p):\n        if data[i] > data[i + 1]:\n            data[i], data[i + 1] = data[i + 1], data[i]\n            swapped = True\n    print(p + 1, data)\n    if not swapped:\n        break',
    task: <>Each pass walks along the list swapping neighbours that are out of order. Print the list after every pass.</>,
    hints: ["Pass 1 carries the 5 all the way to the end.", "Each pass looks at one fewer pair (len - 1 - p).", "Pass 3 makes no swap — it still prints, then breaks."],
    solution: "1 [1, 4, 2, 5]\n2 [1, 2, 4, 5]\n3 [1, 2, 4, 5]",
  },
  spark2: {
    id: "spark2", kind: "predict", title: "Binary search, step by step",
    code: 'data = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\ntarget = 23\nlow = 0\nhigh = len(data) - 1\nwhile low <= high:\n    mid = (low + high) // 2\n    print(low, high, mid, data[mid])\n    if data[mid] == target:\n        print("found at", mid)\n        break\n    elif data[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1',
    task: <>Track <code>low</code>, <code>high</code> and <code>mid</code>. Positions count from 0.</>,
    hints: ["mid = (0 + 9) // 2 = 4, and data[4] is 16.", "16 < 23, so the answer is to the right: low = mid + 1."],
    solution: "0 9 4 16\n5 9 7 56\n5 6 5 23\nfound at 5",
  },
  selection: {
    id: "selection", kind: "fix", title: "Selection sort that doesn't select",
    task: <>Selection sort: for each position, find the smallest of the remaining items and swap it in. This version compares with the wrong item. Fix it (no <code>sort</code> / <code>sorted</code>).</>,
    starter: readNums + 'for i in range(len(nums)):\n    smallest = i\n    for j in range(i + 1, len(nums)):\n        if nums[j] < nums[i]:\n            smallest = j\n    nums[i], nums[smallest] = nums[smallest], nums[i]\nprint(nums)',
    tests: [{ inputs: ["4 3 1 2"], expect: "Numbers: 4 3 1 2\n[1, 2, 3, 4]" }, { inputs: ["9 7 8 1 5"], expect: "Numbers: 9 7 8 1 5\n[1, 5, 7, 8, 9]", hidden: true }, { inputs: ["3"], expect: "Numbers: 3\n[3]", hidden: true }],
    forbids: [{ call: "sort" }, { call: "sorted" }, { call: "min" }],
    hints: ["smallest is the position of the best so far. Compare each new item with THAT item.", "if nums[j] < nums[smallest]:"],
    solution: readNums + 'for i in range(len(nums)):\n    smallest = i\n    for j in range(i + 1, len(nums)):\n        if nums[j] < nums[smallest]:\n            smallest = j\n    nums[i], nums[smallest] = nums[smallest], nums[i]\nprint(nums)',
  },
  dups: {
    id: "dups", kind: "fix", title: "Duplicates, once each",
    task: <>Report each repeated value <strong>once</strong>, in the order it first repeats. For <code>4 7 4 9 4 7</code> that's <code>[4, 7]</code> — this prints 4 twice. Fix it; a set makes the "have I seen it?" check fast.</>,
    starter: readNums + 'seen = []\ndups = []\nfor n in nums:\n    if n in seen:\n        dups.append(n)\n    seen.append(n)\nprint("Duplicates:", dups)',
    tests: [{ inputs: ["4 7 4 9 4 7"], expect: "Numbers: 4 7 4 9 4 7\nDuplicates: [4, 7]" }, { inputs: ["1 2 3"], expect: "Numbers: 1 2 3\nDuplicates: []", hidden: true }, { inputs: ["5 5 5 5"], expect: "Numbers: 5 5 5 5\nDuplicates: [5]", hidden: true }],
    hints: ["Before appending to dups, check it isn't already there.", "if n in seen and n not in dups:"],
    solution: readNums + 'seen = set()\ndups = []\nfor n in nums:\n    if n in seen and n not in dups:\n        dups.append(n)\n    seen.add(n)\nprint("Duplicates:", dups)',
  },
  merge: {
    id: "merge", kind: "complete", title: "Merge two sorted lists",
    task: <>Two lists, each already sorted. Walk both with two positions <code>i</code> and <code>j</code>, always taking the smaller front item; when one runs out, add what's left of the other. This is the heart of merge sort. Fill the blanks.</>,
    starter: 'a = []\nfor x in input("List A: ").split():\n    a.append(int(x))\nb = []\nfor x in input("List B: ").split():\n    b.append(int(x))\nmerged = []\ni = 0\nj = 0\nwhile i < len(a) and j < len(b):\n    if a[i] <= b[j]:\n        merged.append(a[i])\n        i += 1\n    else:\n        merged.append(___)\n        j += ___\nmerged += a[___:]\nmerged += b[___:]\nprint(merged)',
    tests: [{ inputs: ["1 4 9", "2 3 10 12"], expect: "List A: 1 4 9\nList B: 2 3 10 12\n[1, 2, 3, 4, 9, 10, 12]" }, { inputs: ["5", "1 2 3"], expect: "List A: 5\nList B: 1 2 3\n[1, 2, 3, 5]", hidden: true }, { inputs: ["2 2", "2"], expect: "List A: 2 2\nList B: 2\n[2, 2, 2]", hidden: true }],
    forbids: [{ call: "sort" }, { call: "sorted" }],
    hints: ["merged.append(b[j]) and j += 1", "What's left of a starts at position i: a[i:]"],
    solution: 'a = []\nfor x in input("List A: ").split():\n    a.append(int(x))\nb = []\nfor x in input("List B: ").split():\n    b.append(int(x))\nmerged = []\ni = 0\nj = 0\nwhile i < len(a) and j < len(b):\n    if a[i] <= b[j]:\n        merged.append(a[i])\n        i += 1\n    else:\n        merged.append(b[j])\n        j += 1\nmerged += a[i:]\nmerged += b[j:]\nprint(merged)',
  },
  rle: {
    id: "rle", kind: "make", title: "Run-length encoding",
    task: <>Compress text by writing each run of the same letter as the letter and its length: <code>aaabccdddd</code> → <code>a3b1c2d4</code>. Ask <code>Text: </code>, print <code>Encoded: a3b1c2d4</code> and <code>Longest run: d (4)</code> (the first one if there's a tie). Write the algorithm first as <code>#</code> comments.</>,
    minLines: 14,
    tests: [rleTest("aaabccdddd"), rleTest("x", { hidden: true }), rleTest("aabbb", { hidden: true }), rleTest("abab", { hidden: true, why: "A letter can come back later as a new run: a1b1a1b1." }), rleTest("zzzzyyyy", { hidden: true, why: "A tie: the first longest run wins — use >, not >=." })],
    requires: [comments(3), { node: "While" }],
    hints: ["Keep a position i. From i, move j forward while text[j] is the same letter; the run length is j - i.", "Add text[i] + str(j - i) to the result, then jump: i = j.", "Track the longest run with > so the first one wins ties."],
    solution: '# start at the first letter\n# move forward while the letter repeats; the run length is how far we moved\n# write the letter and the length, then continue from the next new letter\n# remember the longest run seen so far\ntext = input("Text: ")\nencoded = ""\nbest_letter = ""\nbest_len = 0\ni = 0\nwhile i < len(text):\n    j = i\n    while j < len(text) and text[j] == text[i]:\n        j += 1\n    encoded += text[i] + str(j - i)\n    if j - i > best_len:\n        best_len = j - i\n        best_letter = text[i]\n    i = j\nprint("Encoded:", encoded)\nprint(f"Longest run: {best_letter} ({best_len})")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Binary search on 1,000,000 sorted items needs at most about…", options: ["1,000,000 checks", "500,000 checks", "20 checks", "1 check"], answer: 2, explain: "Halving each time: 2²⁰ ≈ 1,000,000." },
  { q: "Bubble sort can stop early when…", options: ["The first item is smallest", "A whole pass makes no swaps", "Half the passes are done", "Never"], answer: 1, explain: "No swaps means everything is already in order." },
  { q: "Why use a set for 'have I seen this?'", options: ["Sets keep order", "Checking x in a set is fast however big it gets", "Sets allow repeats", "Lists can't use in"], answer: 1, explain: "in on a list checks item by item; a set jumps straight there." },
];

export default function UnitCT2_C(props) {
  return <CrucibleShell {...props} unitId="UnitCT2_C" module="Computational Thinking II" title="The Crucible: Classic Algorithms" spark={[EX.spark1, EX.spark2]} flame={[EX.selection, EX.dups]} forge={[EX.merge]} temper={[EX.rle]} quiz={QUIZ} />;
}
