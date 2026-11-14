// Unit6_C — The Crucible: Module 6 (rebuilt, typing-first)
// Spark: range with a negative step, end=, an accumulator, a while with a
// one-line if/else; nested loops with continue / break, while True. Flame:
// the accumulator reset inside the loop + off-by-one; a validation loop with
// and instead of or that never re-asks. Forge: reverse digits / palindrome.
// Temper: primes in a range and the largest gap between them.

import CrucibleShell from "../kit/Crucible.jsx";

const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
function primes(a, b) {
  const ps = []; for (let n = +a; n <= +b; n++) if (isPrime(n)) ps.push(n);
  const out = [`Start: ${a}`, `End: ${b}`, ps.length ? ps.join(" ") : "No primes", `Primes: ${ps.length}`];
  if (ps.length < 2) out.push("Not enough primes for a gap");
  else { let g = 0, x = 0, y = 0; for (let i = 1; i < ps.length; i++) if (ps[i] - ps[i - 1] > g) { g = ps[i] - ps[i - 1]; x = ps[i - 1]; y = ps[i]; } out.push(`Largest gap: ${g} (between ${x} and ${y})`); }
  return out.join("\n");
}
const primeTest = (a, b, extra = {}) => ({ inputs: [a, b], expect: primes(a, b), ...extra });

const EX = {
  spark1: {
    id: "spark1", kind: "predict", title: "Counting down, adding up",
    code: 'total = 0\nfor i in range(10, 0, -3):\n    total += i\n    print(i, end=" ")\nprint()\nprint(total)\nn = 5\nwhile n > 1:\n    n = n // 2 if n % 2 == 0 else 3 * n + 1\n    print(n, end=",")',
    task: <>A for loop stepping backwards, then a while loop that jumps around before it lands. Trailing spaces at the end of a line don't matter.</>,
    hints: ["range(10, 0, -3) starts at 10 and steps down by 3, stopping before 0.", "print() with nothing in it just ends the line.", "Odd n becomes 3n + 1; even n is halved. Stop once n is 1."],
    solution: "10 7 4 1\n22\n16,8,4,2,1,",
  },
  spark2: {
    id: "spark2", kind: "predict", title: "continue, break, nested",
    code: 'for i in range(1, 4):\n    for j in range(1, 4):\n        if j == i:\n            continue\n        if i + j == 5:\n            break\n        print(i, j)\nprint("done")\nk = 0\nwhile True:\n    k += 1\n    if k % 4 == 0:\n        break\nprint(k)',
    task: <>A <code>break</code> inside the inner loop only leaves the <em>inner</em> loop. Trace all nine (i, j) pairs.</>,
    hints: ["continue skips the rest of this round of the inner loop.", "break ends the inner loop; the outer loop carries on with the next i.", "Pairs where i + j is 5: (2, 3) and (3, 2)."],
    solution: "1 2\n1 3\n2 1\n3 1\ndone\n4",
  },
  squares: {
    id: "squares", kind: "fix", title: "Sum of squares",
    task: <>Should print 1² + 2² + … + n² (for n = 3: 1 + 4 + 9 = 14). It prints 4. There are <strong>two</strong> bugs.</>,
    starter: 'n = int(input("n: "))\nfor i in range(1, n):\n    total = 0\n    total = total + i ** 2\nprint("Sum of squares:", total)',
    tests: [{ inputs: ["3"], expect: "n: 3\nSum of squares: 14" }, { inputs: ["1"], expect: "n: 1\nSum of squares: 1", hidden: true }, { inputs: ["10"], expect: "n: 10\nSum of squares: 385", hidden: true }],
    hints: ["Where should the running total start — once, or every round?", "range(1, n) stops BEFORE n."],
    solution: 'n = int(input("n: "))\ntotal = 0\nfor i in range(1, n + 1):\n    total = total + i ** 2\nprint("Sum of squares:", total)',
  },
  valid: {
    id: "valid", kind: "fix", title: "Ask until it's valid",
    task: <>It should keep asking <code>Mark (0-100): </code> until the mark is between 0 and 100, printing <code>Out of range</code> after each bad one, then <code>Saved 72</code>. Right now it accepts 150. Fix the condition — and then make sure the loop really asks again.</>,
    starter: 'mark = int(input("Mark (0-100): "))\nwhile mark < 0 and mark > 100:\n    print("Out of range")\nprint("Saved", mark)',
    tests: [{ inputs: ["150", "-5", "72"], expect: "Mark (0-100): 150\nOut of range\nMark (0-100): -5\nOut of range\nMark (0-100): 72\nSaved 72" }, { inputs: ["100"], expect: "Mark (0-100): 100\nSaved 100", hidden: true }, { inputs: ["101", "0"], expect: "Mark (0-100): 101\nOut of range\nMark (0-100): 0\nSaved 0", hidden: true }],
    hints: ["Can a mark be below 0 AND above 100 at the same time?", "Inside the loop, ask again — otherwise it loops forever on the same bad mark."],
    solution: 'mark = int(input("Mark (0-100): "))\nwhile mark < 0 or mark > 100:\n    print("Out of range")\n    mark = int(input("Mark (0-100): "))\nprint("Saved", mark)',
  },
  palindrome: {
    id: "palindrome", kind: "complete", title: "Reverse the digits",
    task: <>Peel digits off the end with <code>%</code> and <code>//</code> and build the reversed number. Then say whether the number reads the same both ways. Fill the blanks.</>,
    starter: 'n = int(input("Number: "))\noriginal = n\nreverse = 0\nwhile n > 0:\n    digit = n ___ 10\n    reverse = reverse * 10 + ___\n    n = n ___ 10\nprint("Reversed:", reverse)\nif ___:\n    print("Palindrome!")\nelse:\n    print("Not a palindrome")',
    tests: [{ inputs: ["12321"], expect: "Number: 12321\nReversed: 12321\nPalindrome!" }, { inputs: ["1230"], expect: "Number: 1230\nReversed: 321\nNot a palindrome", hidden: true }, { inputs: ["7"], expect: "Number: 7\nReversed: 7\nPalindrome!", hidden: true }],
    forbids: [{ text: "[::-1]", msg: "Do it with % and //, not text slicing." }, { call: "str" }],
    hints: ["n % 10 is the last digit; n // 10 drops it.", "Compare the reversed number with the original — not with n, which is 0 by now."],
    solution: 'n = int(input("Number: "))\noriginal = n\nreverse = 0\nwhile n > 0:\n    digit = n % 10\n    reverse = reverse * 10 + digit\n    n = n // 10\nprint("Reversed:", reverse)\nif reverse == original:\n    print("Palindrome!")\nelse:\n    print("Not a palindrome")',
  },
  primes: {
    id: "primes", kind: "make", title: "Primes and their gaps",
    task: <>Ask <code>Start: </code> and <code>End: </code>. Print every prime from Start to End (both included) on one line, separated by spaces — or <code>No primes</code>. Then <code>Primes: 6</code>. Then the largest gap between two primes next to each other: <code>Largest gap: 6 (between 23 and 29)</code> — the first one if there's a tie — or <code>Not enough primes for a gap</code> if there are fewer than two. No lists: remember the previous prime in a variable.</>,
    minLines: 22,
    tests: [
      primeTest("10", "30"),
      primeTest("1", "10", { hidden: true, why: "1 is not prime; 2 is." }),
      primeTest("24", "28", { hidden: true }),
      primeTest("13", "16", { hidden: true }),
      primeTest("89", "113", { hidden: true }),
    ],
    requires: [{ node: "For", min: 2 }],
    forbids: [{ node: "List", msg: "No lists yet — keep the previous prime in a variable." }],
    hints: ["For each n: assume prime (a flag), try divisors from 2; any that divides → not prime, break. n < 2 is never prime.", "Print primes with end=\" \" and count them; after the loop, print() to end the line — or No primes if the count is 0.", "Keep prev (the last prime seen). When you find a new prime p and prev exists, gap = p - prev; keep the biggest with > (so the first one wins ties)."],
    solution: 'start = int(input("Start: "))\nend = int(input("End: "))\ncount = 0\nprev = 0\nbest_gap = 0\ngap_from = 0\ngap_to = 0\nfor n in range(start, end + 1):\n    if n < 2:\n        continue\n    is_prime = True\n    for d in range(2, n):\n        if d * d > n:\n            break\n        if n % d == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(n, end=" ")\n        count += 1\n        if prev > 0 and n - prev > best_gap:\n            best_gap = n - prev\n            gap_from = prev\n            gap_to = n\n        prev = n\nif count == 0:\n    print("No primes")\nelse:\n    print()\nprint("Primes:", count)\nif count < 2:\n    print("Not enough primes for a gap")\nelse:\n    print(f"Largest gap: {best_gap} (between {gap_from} and {gap_to})")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "How many times does for i in range(2, 11, 3) run?", options: ["3", "4", "9", "11"], answer: 0, explain: "2, 5, 8 — 11 is excluded." },
  { q: "break inside an inner loop…", options: ["Ends both loops", "Ends only the inner loop", "Skips one round", "Ends the program"], answer: 1, explain: "The outer loop carries on." },
  { q: "Where does total = 0 belong for a running total?", options: ["Inside the loop", "Before the loop", "After the loop", "Anywhere"], answer: 1, explain: "Inside, it resets every round." },
];

export default function Unit6_C(props) {
  return <CrucibleShell {...props} unitId="Unit6_C" module="Module 6" title="The Crucible: Loops" spark={[EX.spark1, EX.spark2]} flame={[EX.squares, EX.valid]} forge={[EX.palindrome]} temper={[EX.primes]} quiz={QUIZ} />;
}
