// UnitCT1_C — The Crucible: Computational Thinking I (rebuilt, typing-first)
// Loops only (CT I comes before lists). Spark: trace a digital-root algorithm
// and GCD by subtraction. Flame: a prime test whose flag is reset by an else
// (and 1 counted as prime); a "3 or 5" counter written with and + off-by-one.
// Forge: decimal → binary by repeated division. Temper: Armstrong numbers in
// a range, algorithm first as # comments.

import CrucibleShell from "../kit/Crucible.jsx";

const comments = (min) => ({ text: "#", min, msg: `Write your algorithm first, as at least ${min} # comment lines.` });
const isArm = (n) => { const d = String(n).split("").map(Number); return d.reduce((s, x) => s + x ** d.length, 0) === n; };
function arm(a, b) { const xs = []; for (let n = +a; n <= +b; n++) if (isArm(n)) xs.push(n); return [`Start: ${a}`, `End: ${b}`, ...(xs.length ? xs.map(String) : ["None found"]), `Found: ${xs.length}`].join("\n"); }
const armTest = (a, b, extra = {}) => ({ inputs: [a, b], expect: arm(a, b), ...extra });

const EX = {
  spark1: {
    id: "spark1", kind: "predict", title: "Digital root",
    code: 'n = 9875\nsteps = 0\nwhile n >= 10:\n    s = 0\n    while n > 0:\n        s += n % 10\n        n //= 10\n    n = s\n    steps += 1\n    print(n)\nprint("steps:", steps)',
    task: <>The inner loop adds up the digits; the outer loop repeats until one digit is left. Trace it with a table: n, s, steps.</>,
    hints: ["First pass: 9 + 8 + 7 + 5.", "Then repeat with the new n while it still has two or more digits."],
    solution: "29\n11\n2\nsteps: 3",
  },
  spark2: {
    id: "spark2", kind: "predict", title: "GCD by subtraction",
    code: 'a = 48\nb = 18\nwhile a != b:\n    if a > b:\n        a = a - b\n    else:\n        b = b - a\n    print(a, b)\nprint("gcd", a)',
    task: <>An older version of Euclid's idea: keep subtracting the smaller from the larger. Print the pair after every step.</>,
    hints: ["48 > 18, so a becomes 30. Keep going.", "Stop when the two are equal — that's the GCD."],
    solution: "30 18\n12 18\n12 6\n6 6\ngcd 6",
  },
  prime: {
    id: "prime", kind: "fix", title: "A prime test that forgets",
    task: <>It says 9 is prime. The flag is set to False when a divisor is found… and then set back. There's a second bug too: 1 is not a prime number. Fix both.</>,
    starter: 'n = int(input("n: "))\nis_prime = True\nfor d in range(2, n):\n    if n % d == 0:\n        is_prime = False\n    else:\n        is_prime = True\nprint(n, "is prime" if is_prime else "is not prime")',
    tests: [{ inputs: ["9"], expect: "n: 9\n9 is not prime" }, { inputs: ["1"], expect: "n: 1\n1 is not prime", hidden: true, why: "1 is not prime: primes have exactly two divisors." }, { inputs: ["2"], expect: "n: 2\n2 is prime", hidden: true }, { inputs: ["97"], expect: "n: 97\n97 is prime", hidden: true }],
    hints: ["Once one divisor is found, the answer is settled — nothing should switch it back.", "Delete the else; break once a divisor is found. Start with is_prime = n > 1."],
    solution: 'n = int(input("n: "))\nis_prime = n > 1\nfor d in range(2, n):\n    if n % d == 0:\n        is_prime = False\n        break\nprint(n, "is prime" if is_prime else "is not prime")',
  },
  threefive: {
    id: "threefive", kind: "fix", title: "Multiples of 3 or 5",
    task: <>Count and add every number from 1 to n (including n) that is divisible by 3 <strong>or</strong> 5. For 10: 3, 5, 6, 9, 10 → <code>Count: 5</code>, <code>Sum: 33</code>. Two bugs.</>,
    starter: 'n = int(input("n: "))\ncount = 0\ntotal = 0\nfor i in range(1, n):\n    if i % 3 == 0 and i % 5 == 0:\n        count += 1\n        total += i\nprint("Count:", count)\nprint("Sum:", total)',
    tests: [{ inputs: ["10"], expect: "n: 10\nCount: 5\nSum: 33" }, { inputs: ["15"], expect: "n: 15\nCount: 7\nSum: 60", hidden: true }, { inputs: ["2"], expect: "n: 2\nCount: 0\nSum: 0", hidden: true }],
    hints: ["and needs both — that's only multiples of 15.", "range(1, n) stops before n."],
    solution: 'n = int(input("n: "))\ncount = 0\ntotal = 0\nfor i in range(1, n + 1):\n    if i % 3 == 0 or i % 5 == 0:\n        count += 1\n        total += i\nprint("Count:", count)\nprint("Sum:", total)',
  },
  binary: {
    id: "binary", kind: "complete", title: "Decimal to binary",
    task: <>The algorithm: divide by 2 again and again; the remainders, read from last to first, are the bits. Building the text by putting each new bit in <em>front</em> does the reversing for you. Fill the blanks.</>,
    starter: 'n = int(input("Decimal: "))\n# repeated division: the remainders, read backwards, are the bits\nif n == 0:\n    bits = "0"\nelse:\n    bits = ""\n    while n ___ 0:\n        bits = str(n ___ 2) + ___\n        n = n ___ 2\nprint("Binary:", bits)',
    tests: [{ inputs: ["13"], expect: "Decimal: 13\nBinary: 1101" }, { inputs: ["0"], expect: "Decimal: 0\nBinary: 0", hidden: true }, { inputs: ["64"], expect: "Decimal: 64\nBinary: 1000000", hidden: true }],
    forbids: [{ call: "bin", msg: "Build it yourself — no bin()." }, { call: "format" }],
    hints: ["Loop while n > 0.", "The remainder is n % 2; put it in front: str(n % 2) + bits", "n = n // 2"],
    solution: 'n = int(input("Decimal: "))\n# repeated division: the remainders, read backwards, are the bits\nif n == 0:\n    bits = "0"\nelse:\n    bits = ""\n    while n > 0:\n        bits = str(n % 2) + bits\n        n = n // 2\nprint("Binary:", bits)',
  },
  armstrong: {
    id: "armstrong", kind: "make", title: "Armstrong numbers",
    task: <>A number is an <strong>Armstrong number</strong> if it equals the sum of its digits, each raised to the power of the number of digits: 153 = 1³ + 5³ + 3³. Ask <code>Start: </code> and <code>End: </code>, print every Armstrong number in that range (both ends included), one per line — or <code>None found</code> — then <code>Found: 4</code>. Write your algorithm first as <code>#</code> comments. Use arithmetic only: no <code>str()</code> or <code>len()</code> — count the digits with a loop.</>,
    minLines: 20,
    tests: [
      armTest("100", "500"),
      armTest("1", "10", { hidden: true, why: "Every single-digit number is an Armstrong number (5¹ = 5)." }),
      armTest("1000", "1600", { hidden: true }),
      armTest("9000", "9500", { hidden: true, why: "Four digits → fourth powers: 9⁴ + 4⁴ + 7⁴ + 4⁴ = 9474." }),
    ],
    requires: [comments(3), { node: "While", min: 2 }],
    forbids: [{ call: "str", msg: "Use % and // to take the number apart." }, { call: "len", msg: "Count the digits with a loop." }],
    hints: ["For each n: first count its digits (copy n, keep doing // 10, count the steps).", "Then take a fresh copy and add up (digit ** count) for each digit.", "Keep a found counter; after the loop print None found if it's still 0."],
    solution: '# for each number n from start to end:\n#   count its digits by dividing a copy by 10 until it is 0\n#   add up each digit raised to that count\n#   if the sum equals n, print it and count it\nstart = int(input("Start: "))\nend = int(input("End: "))\nfound = 0\nfor n in range(start, end + 1):\n    digits = 0\n    m = n\n    while m > 0:\n        digits += 1\n        m //= 10\n    total = 0\n    m = n\n    while m > 0:\n        total += (m % 10) ** digits\n        m //= 10\n    if total == n:\n        print(n)\n        found += 1\nif found == 0:\n    print("None found")\nprint("Found:", found)',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "A flag that answers 'is there ANY divisor?' should…", options: ["Flip every round", "Change once, when a divisor is found — then stay", "Start as False and become True on every non-divisor", "Be printed in the loop"], answer: 1, explain: "One counter-example settles it; break saves the rest of the work." },
  { q: "i % 3 == 0 and i % 5 == 0 is true for…", options: ["Multiples of 3 or 5", "Multiples of 15 only", "Every number", "No number"], answer: 1, explain: "Both at once = divisible by 15." },
  { q: "13 → repeated ÷2 remainders 1, 0, 1, 1 → binary is…", options: ["1011", "1101", "0111", "1110"], answer: 1, explain: "Read the remainders from last to first." },
];

export default function UnitCT1_C(props) {
  return <CrucibleShell {...props} unitId="UnitCT1_C" module="Computational Thinking I" title="The Crucible: Algorithms" spark={[EX.spark1, EX.spark2]} flame={[EX.prime, EX.threefive]} forge={[EX.binary]} temper={[EX.armstrong]} quiz={QUIZ} />;
}
