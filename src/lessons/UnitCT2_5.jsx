// Unit CT2.5 — String Algorithms (rebuilt, typing-first)
// Two-pointer palindrome (ignoring case/spaces) → reverse word order →
// character frequencies → anagram check by counting → ord/chr and the
// Caesar cipher (make-task). No functions yet.

import LessonShell, { P, KeyIdea, CodeBlock } from "../kit/Lesson.jsx";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });
const shift = (text, k) => [...text].map((ch) => { if (ch >= "a" && ch <= "z") return String.fromCharCode((ch.charCodeAt(0) - 97 + k + 26 * 10) % 26 + 97); if (ch >= "A" && ch <= "Z") return String.fromCharCode((ch.charCodeAt(0) - 65 + k + 26 * 10) % 26 + 65); return ch; }).join("");
const freq = (w) => { const m = new Map(); for (const c of w) m.set(c, (m.get(c) || 0) + 1); return [...m].map(([c, n]) => `${c}: ${n}`).join("\n"); };

const EX = {
  palindrome: {
    id: "palindrome", kind: "write", title: "Two-pointer palindrome",
    task: <>Ask <code>Phrase: </code>. Ignoring spaces and capitals, is it a palindrome? First clean it (lowercase, remove spaces). Then use <strong>two pointers</strong>: <code>left</code> from the start, <code>right</code> from the end, moving inwards; any mismatch → not a palindrome. No <code>[::-1]</code>. Print <code>Palindrome: True</code>.</>,
    tests: [
      { inputs: ["Never odd or even"], expect: "Phrase: Never odd or even\nPalindrome: True" },
      { inputs: ["Python"], expect: "Phrase: Python\nPalindrome: False", hidden: true },
      { inputs: ["Malayalam"], expect: "Phrase: Malayalam\nPalindrome: True", hidden: true },
    ],
    requires: [comments(3), { node: "While" }],
    forbids: [{ text: "::-1", msg: "Use the two-pointer method, not slicing." }, { call: "reversed" }],
    hints: ['clean = phrase.lower().replace(" ", "")', "left = 0, right = len(clean) - 1; while left < right: compare, then left += 1, right -= 1"],
    solution: '# 1. clean: lowercase, no spaces\n# 2. pointers at both ends, assume palindrome\n# 3. move inwards; a mismatch disproves it\nphrase = input("Phrase: ")\nclean = phrase.lower().replace(" ", "")\nleft = 0\nright = len(clean) - 1\nis_pal = True\nwhile left < right:\n    if clean[left] != clean[right]:\n        is_pal = False\n        break\n    left += 1\n    right -= 1\nprint(f"Palindrome: {is_pal}")',
  },
  words: {
    id: "words", kind: "write", title: "Reverse the word order",
    task: <>Ask <code>Sentence: </code> and print the words in reverse order (not the letters): <code>Python love I</code>. Build the result with a loop that walks backwards, then join.</>,
    tests: [{ inputs: ["I love Python"], expect: "Sentence: I love Python\nPython love I" }, { inputs: ["one"], expect: "Sentence: one\none", hidden: true }],
    requires: [comments(2), { call: "join" }],
    forbids: [{ text: "::-1" }, { call: "reverse" }, { call: "reversed" }],
    hints: ["words = sentence.split(); for i in range(len(words) - 1, -1, -1): out.append(words[i])", '" ".join(out)'],
    solution: '# 1. split into words\n# 2. walk backwards, collecting them; join with spaces\nwords = input("Sentence: ").split()\nout = []\nfor i in range(len(words) - 1, -1, -1):\n    out.append(words[i])\nprint(" ".join(out))',
  },
  freq: {
    id: "freq", kind: "write", title: "Letter frequencies",
    task: <>Ask <code>Word: </code> and print each letter's count, in the order first seen, one per line: <code>b: 1</code>, <code>a: 3</code>, <code>n: 2</code> for banana. The counting pattern from Unit 7.5, applied to characters.</>,
    tests: [{ inputs: ["banana"], expect: "Word: banana\n" + freq("banana") }, { inputs: ["mississippi"], expect: "Word: mississippi\n" + freq("mississippi"), hidden: true }],
    requires: [comments(2), { call: "get" }],
    hints: ["counts[ch] = counts.get(ch, 0) + 1 for each ch in the word."],
    solution: '# 1. count each character with a dict\n# 2. print counts in first-seen order\nword = input("Word: ")\ncounts = {}\nfor ch in word:\n    counts[ch] = counts.get(ch, 0) + 1\nfor ch, n in counts.items():\n    print(f"{ch}: {n}")',
  },
  anagram: {
    id: "anagram", kind: "write", title: "Anagrams",
    task: <>Two words are anagrams if they use exactly the same letters the same number of times (listen / silent). Ask <code>First: </code> and <code>Second: </code> (ignore capitals). Build a count dictionary for each and compare them: <code>Anagrams: True</code>. No sorted().</>,
    tests: [
      { inputs: ["Listen", "Silent"], expect: "First: Listen\nSecond: Silent\nAnagrams: True" },
      { inputs: ["apple", "paper"], expect: "First: apple\nSecond: paper\nAnagrams: False", hidden: true },
      { inputs: ["aab", "abb"], expect: "First: aab\nSecond: abb\nAnagrams: False", hidden: true },
    ],
    requires: [comments(3)],
    forbids: [{ call: "sorted" }, { call: "sort" }],
    hints: ["Two dicts built the same way; dictionaries compare equal with == if they have the same keys and values."],
    solution: '# 1. lowercase both words\n# 2. count the letters of each into its own dict\n# 3. equal dicts means anagrams\na = input("First: ").lower()\nb = input("Second: ").lower()\nca = {}\nfor ch in a:\n    ca[ch] = ca.get(ch, 0) + 1\ncb = {}\nfor ch in b:\n    cb[ch] = cb.get(ch, 0) + 1\nprint(f"Anagrams: {ca == cb}")',
  },
  ordchr: {
    id: "ordchr", kind: "type", title: "Characters are numbers inside",
    task: <>Every character has a code number. <code>ord(ch)</code> gives the number; <code>chr(n)</code> turns a number back into a character. Letters are consecutive: a is 97, b is 98…</>,
    show: 'print(ord("a"), ord("b"), ord("z"))\nprint(ord("A"), chr(66))\nshift = (ord("y") - ord("a") + 3) % 26\nprint(chr(ord("a") + shift))',
    tests: [{ expect: "97 98 122\n65 B\nb" }],
    hints: ["% 26 wraps past z back to a: y + 3 → b."],
    solution: 'print(ord("a"), ord("b"), ord("z"))\nprint(ord("A"), chr(66))\nshift = (ord("y") - ord("a") + 3) % 26\nprint(chr(ord("a") + shift))',
  },
  caesar: {
    id: "caesar", kind: "make", title: "Caesar cipher",
    task: <>Julius Caesar's secret code shifts every letter by a fixed amount: with shift 3, a → d, z → c. Ask <code>Message: </code> and <code>Shift: </code> (can be negative, to decode). Shift lowercase and uppercase letters, wrapping around; keep everything else (spaces, digits, punctuation) unchanged. Print <code>Result: Khoor, Zruog!</code>.</>,
    minLines: 16,
    tests: [
      { inputs: ["Hello, World!", "3"], expect: `Message: Hello, World!\nShift: 3\nResult: ${shift("Hello, World!", 3)}` },
      { inputs: ["Khoor, Zruog!", "-3"], expect: "Message: Khoor, Zruog!\nShift: -3\nResult: Hello, World!", hidden: true },
      { inputs: ["xyz ABC 2026", "5"], expect: `Message: xyz ABC 2026\nShift: 5\nResult: ${shift("xyz ABC 2026", 5)}`, hidden: true },
    ],
    requires: [comments(4), { call: "ord" }, { call: "chr" }],
    hints: ["For a lowercase ch: chr((ord(ch) - ord(\"a\") + k) % 26 + ord(\"a\")). Uppercase: same with \"A\".", "Python's % always gives a non-negative result for % 26, so negative shifts wrap correctly.", "Build the result string: result += new_ch"],
    solution: '# 1. read message and shift\n# 2. for each character\n# 3.     lowercase / uppercase letter: shift within its alphabet, wrapping with % 26\n# 4.     anything else: keep it; build and print the result\ntext = input("Message: ")\nk = int(input("Shift: "))\nresult = ""\nfor ch in text:\n    if "a" <= ch <= "z":\n        result += chr((ord(ch) - ord("a") + k) % 26 + ord("a"))\n    elif "A" <= ch <= "Z":\n        result += chr((ord(ch) - ord("A") + k) % 26 + ord("A"))\n    else:\n        result += ch\nprint(f"Result: {result}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why use two pointers for a palindrome?", options: ["Required", "Compare from both ends inward and stop at the first mismatch — no reversed copy needed", "Faster to type", "Python can't reverse"], answer: 1, explain: "Half the comparisons, and it can stop early." },
  { q: "Two words are anagrams when…", options: ["They have the same length", "Their letter-count dictionaries are equal", "They start with the same letter", "They rhyme"], answer: 1, explain: "Same letters, same numbers of each." },
  { q: "What does chr(ord(\"c\") + 1) give?", options: ["\"c1\"", "\"d\"", "100", "Error"], answer: 1, explain: "ord gives 99; 100 back to a character is d." },
  { q: "In the cipher, why % 26?", options: ["To round", "To wrap past z back to the start of the alphabet", "To make it secret", "No reason"], answer: 1, explain: "Position 25 (z) + 3 = 28 → 28 % 26 = 2 → c." },
];

export default function UnitCT2_5(props) {
  const sections = [
    { label: "Two Pointers", kicker: "FROM BOTH ENDS", title: "Palindromes and word order", blocks: [<P>Strings are sequences, so every list algorithm works on them — plus a few classics of their own.</P>, EX.palindrome, EX.words] },
    { label: "Counting", kicker: "FREQUENCIES", title: "Counting characters", blocks: [EX.freq, EX.anagram, <KeyIdea>Many string questions reduce to counting: a frequency dictionary answers anagrams, most-common letters, missing letters and more.</KeyIdea>] },
    { label: "Codes", kicker: "ORD · CHR", title: "Characters as numbers", blocks: [<div style={{ maxWidth: 560 }}><CodeBlock title="the shift formula" code={'pos = ord(ch) - ord("a")        # 0..25\nnew = (pos + k) % 26            # shift and wrap\nchr(new + ord("a"))             # back to a letter'} /></div>, EX.ordchr] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: Caesar cipher", blocks: [EX.caesar] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT2_5" crumb="COMPUTATIONAL THINKING II › 5" title="String Algorithms" sections={sections} quiz={QUIZ}
      next={{ title: "Module 8 — Functions", text: "CT II complete! Next: package your algorithms as reusable functions. (Optional first: CT II's Crucible.)" }} />
  );
}
