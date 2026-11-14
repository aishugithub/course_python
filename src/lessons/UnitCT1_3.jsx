// Unit CT1.3 — Deciding Inside a Loop (rebuilt, typing-first)
// The flag / verdict pattern: "all" (start True, any failure → False, break)
// vs "any" (start False, any success → True, break); perfect numbers; GCD and
// LCM; leap years in a range. Plan-first comments required.

import { useState } from "react";
import LessonShell, { P, KeyIdea } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });

// ── Widget: "all" vs "any" ──
function AllAny() {
  const [mode, setMode] = useState("all");
  const all = mode === "all";
  return (
    <div className="fh-two">
      <div>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          {[["all", "Are ALL digits odd?"], ["any", "Is ANY digit 0?"]].map(([k, l]) => <button key={k} onClick={() => setMode(k)} style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, border: `1.5px solid ${mode === k ? T.navy : T.border}`, background: mode === k ? T.navy : T.card, color: mode === k ? "#fff" : T.text }}>{l}</button>)}
        </div>
        <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px" }}>
          {all ? "all_odd = True            # innocent until proven guilty\nwhile n > 0:\n    if n % 10 % 2 == 0:\n        all_odd = False   # one even digit is enough\n        break\n    n //= 10"
            : "has_zero = False          # nothing found yet\nwhile n > 0:\n    if n % 10 == 0:\n        has_zero = True   # one zero is enough\n        break\n    n //= 10"}
        </pre>
      </div>
      <div style={{ background: tint(T.purple, "0E"), border: `1px solid ${tint(T.purple, "44")}`, borderRadius: 12, padding: 14, fontSize: 14.5, color: T.slate, lineHeight: 1.7 }}>
        {all ? <><strong>“All” questions</strong> start the flag at <code>True</code>. A single counter-example flips it to False — and then there's no point looking further, so <code>break</code>. You can only say “yes” after checking everything.</>
          : <><strong>“Any” questions</strong> start the flag at <code>False</code>. A single example flips it to True and you can stop. You can only say “no” after checking everything.</>}
      </div>
    </div>
  );
}

const divSum = (n) => { let s = 0; for (let d = 1; d < n; d++) if (n % d === 0) s += d; return s; };
const gcd = (a, b) => { for (let d = Math.min(a, b); d >= 1; d--) if (a % d === 0 && b % d === 0) return d; return 1; };
const leaps = (a, b) => { const out = []; for (let y = a; y <= b; y++) if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) out.push(y); return out; };

const EX = {
  allodd: {
    id: "allodd", kind: "write", title: "Are all the digits odd?",
    task: <>Ask <code>Number: </code> and print <code>All odd: True</code> or <code>All odd: False</code>. Use an “all” flag with <code>break</code>.</>,
    tests: [{ inputs: ["13579"], expect: "Number: 13579\nAll odd: True" }, { inputs: ["13574"], expect: "Number: 13574\nAll odd: False", hidden: true }, { inputs: ["2"], expect: "Number: 2\nAll odd: False", hidden: true }],
    requires: [comments(3), { node: "Break" }],
    hints: ["all_odd = True before the loop; set False and break on the first even digit."],
    solution: '# 1. assume all digits are odd\n# 2. peel each digit\n# 3.     an even one disproves it: flag False, stop\n# 4. print the flag\nn = int(input("Number: "))\nall_odd = True\nwhile n > 0:\n    if n % 10 % 2 == 0:\n        all_odd = False\n        break\n    n //= 10\nprint(f"All odd: {all_odd}")',
  },
  anyzero: {
    id: "anyzero", kind: "write", title: "Is there a zero?",
    task: <>Ask <code>Number: </code> (positive) and print <code>Has zero: True</code> or <code>Has zero: False</code>. Now the flag starts the other way round.</>,
    tests: [{ inputs: ["1042"], expect: "Number: 1042\nHas zero: True" }, { inputs: ["1234"], expect: "Number: 1234\nHas zero: False", hidden: true }, { inputs: ["50"], expect: "Number: 50\nHas zero: True", hidden: true }],
    requires: [comments(3), { node: "Break" }],
    hints: ["has_zero = False; on the first 0 digit: True and break."],
    solution: '# 1. assume no zero\n# 2. peel each digit\n# 3.     a zero proves it: flag True, stop\n# 4. print the flag\nn = int(input("Number: "))\nhas_zero = False\nwhile n > 0:\n    if n % 10 == 0:\n        has_zero = True\n        break\n    n //= 10\nprint(f"Has zero: {has_zero}")',
  },
  perfect: {
    id: "perfect", kind: "write", title: "Perfect numbers",
    task: <>A perfect number equals the sum of its divisors below itself: 6 = 1 + 2 + 3; 28 = 1 + 2 + 4 + 7 + 14. Ask <code>Number: </code> and print <code>Divisor sum: 28</code> then <code>28 is perfect</code> or <code>12 is not perfect</code>.</>,
    tests: [
      { inputs: ["28"], expect: `Number: 28\nDivisor sum: ${divSum(28)}\n28 is perfect` },
      { inputs: ["12"], expect: `Number: 12\nDivisor sum: ${divSum(12)}\n12 is not perfect`, hidden: true },
      { inputs: ["496"], expect: `Number: 496\nDivisor sum: ${divSum(496)}\n496 is ${divSum(496) === 496 ? "" : "not "}perfect`, hidden: true },
    ],
    requires: [comments(3), { node: "For" }],
    hints: ["for d in range(1, n): if n % d == 0: total += d"],
    solution: '# 1. total = 0\n# 2. try every d from 1 to n - 1\n# 3.     if d divides n, add it\n# 4. compare total with n\nn = int(input("Number: "))\ntotal = 0\nfor d in range(1, n):\n    if n % d == 0:\n        total += d\nprint(f"Divisor sum: {total}")\nif total == n:\n    print(f"{n} is perfect")\nelse:\n    print(f"{n} is not perfect")',
  },
  gcd: {
    id: "gcd", kind: "write", title: "GCD and LCM",
    task: <>The greatest common divisor is the largest number dividing both. Search <strong>downwards</strong> from the smaller number and stop at the first one that divides both. Then LCM = a × b ÷ GCD. Ask <code>a: </code> and <code>b: </code>; print <code>GCD: 6</code> and <code>LCM: 72</code> for 18 and 24.</>,
    tests: [
      { inputs: ["18", "24"], expect: `a: 18\nb: 24\nGCD: ${gcd(18, 24)}\nLCM: ${18 * 24 / gcd(18, 24)}` },
      { inputs: ["7", "13"], expect: `a: 7\nb: 13\nGCD: 1\nLCM: 91`, hidden: true },
      { inputs: ["50", "10"], expect: `a: 50\nb: 10\nGCD: 10\nLCM: 50`, hidden: true },
    ],
    requires: [comments(3), { node: "Break" }],
    forbids: [{ text: "math.gcd", msg: "Find it with your own loop." }, { text: "import math", msg: "Find it with your own loop." }],
    hints: ["for d in range(min(a, b), 0, -1): — a countdown range (6.2).", "The first d with a % d == 0 and b % d == 0 is the GCD: save it and break.", "LCM: a * b // g (whole-number division keeps it an int)."],
    solution: '# 1. start at the smaller number, count down\n# 2. first d dividing both is the GCD: save it, stop\n# 3. LCM = a * b // GCD\n# 4. print both\na = int(input("a: "))\nb = int(input("b: "))\ng = 1\nfor d in range(min(a, b), 0, -1):\n    if a % d == 0 and b % d == 0:\n        g = d\n        break\nprint(f"GCD: {g}")\nprint(f"LCM: {a * b // g}")',
  },
  leap: {
    id: "leap", kind: "make", title: "Leap years in a range",
    task: <>A year is a leap year if it's divisible by 4 <strong>and not</strong> by 100 — <strong>or</strong> divisible by 400 (so 2000 was, 1900 wasn't). Ask <code>From: </code> and <code>To: </code>. Print the leap years on one line separated by spaces, then <code>Count: 6</code>.</>,
    minLines: 10,
    tests: [
      { inputs: ["1996", "2020"], expect: `From: 1996\nTo: 2020\n${leaps(1996, 2020).join(" ")}\nCount: ${leaps(1996, 2020).length}` },
      { inputs: ["1890", "1910"], expect: `From: 1890\nTo: 1910\n${leaps(1890, 1910).join(" ")}\nCount: ${leaps(1890, 1910).length}`, hidden: true },
      { inputs: ["1999", "2004"], expect: `From: 1999\nTo: 2004\n${leaps(1999, 2004).join(" ")}\nCount: ${leaps(1999, 2004).length}`, hidden: true },
    ],
    requires: [comments(4), { node: "For" }, { node: "BoolOp" }],
    hints: ["(y % 4 == 0 and y % 100 != 0) or y % 400 == 0", 'print(y, end=" ") inside the if, then print() after the loop to end the line.'],
    solution: '# 1. count = 0\n# 2. for each year in the range\n# 3.     if it is a leap year: print it on the same line, count it\n# 4. end the line, print the count\nstart = int(input("From: "))\nend = int(input("To: "))\ncount = 0\nfor y in range(start, end + 1):\n    if (y % 4 == 0 and y % 100 != 0) or y % 400 == 0:\n        print(y, end=" ")\n        count += 1\nprint()\nprint(f"Count: {count}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "“Is every mark above 40?” — the flag should start as…", options: ["False", "True", "0", "None"], answer: 1, explain: "All-questions start True; one counter-example makes it False." },
  { q: "“Did anyone score 100?” — the flag should start as…", options: ["False", "True"], answer: 0, explain: "Any-questions start False; one example makes it True." },
  { q: "Why break as soon as the flag flips?", options: ["Required", "The answer can't change any more, so further checks are wasted", "To avoid an error", "To reset the flag"], answer: 1, explain: "One counter-example settles an all-question for good." },
  { q: "Was 1900 a leap year?", options: ["Yes — divisible by 4", "No — divisible by 100 but not 400", "Yes — divisible by 100", "Depends"], answer: 1, explain: "The century rule: only centuries divisible by 400 are leap years." },
];

export default function UnitCT1_3(props) {
  const sections = [
    {
      label: "All or Any?", kicker: "THE FLAG", title: "A question about every item",
      blocks: [<P>Some answers need the whole loop: <em>are all digits odd?</em> <em>is any digit zero?</em> A <strong>flag</strong> holds the answer so far; the loop can only change it in one direction.</P>, <AllAny />, EX.allodd, EX.anyzero],
    },
    { label: "Divisors", kicker: "TRY EVERY CANDIDATE", title: "Testing every possible divisor", blocks: [EX.perfect, EX.gcd, <KeyIdea>Searching downwards and stopping at the first hit finds the <em>largest</em> answer without checking the rest.</KeyIdea>] },
    { label: "Make It", kicker: "A DECISION PER ROUND", title: "Your program: leap years", blocks: [EX.leap] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT1_3" crumb="COMPUTATIONAL THINKING I › 3" title="Deciding Inside a Loop" sections={sections} quiz={QUIZ}
      next={{ title: "CT I · 4 — Patterns & Nested Loops", text: "Pyramids, Floyd's triangle and neat tables — every exam favourite." }} />
  );
}
