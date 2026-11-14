// Unit5_C — The Crucible: Module 5 (rebuilt, typing-first)
// Spark: separate ifs vs an elif chain, and/not, text comparison; truthiness,
// one-line if/else, short-circuit, 0.1 + 0.2. Flame: the grade ladder in the
// wrong order; the leap-year rule with and/or precedence. Forge: BMI category
// with a chained comparison. Temper: train fare with several rules.

import CrucibleShell from "../kit/Crucible.jsx";

const fare = (age, dist, cls) => {
  const head = `Age: ${age}\nDistance (km): ${dist}\nClass (sleeper/ac): ${cls}\n`;
  if (cls !== "sleeper" && cls !== "ac") return head + "Unknown class";
  if (+dist <= 0) return head + "Invalid distance";
  if (+age < 5) return head + "Free ticket";
  let f = (cls === "sleeper" ? 0.5 : 1.5) * +dist;
  if (f < 50) f = 50;
  if (+age <= 11) f /= 2; else if (+age >= 60) f *= 0.6;
  return head + `Fare: Rs ${f.toFixed(2)}`;
};
const fareTest = (age, dist, cls, extra = {}) => ({ inputs: [age, dist, cls], expect: fare(age, dist, cls), ...extra });

const EX = {
  spark1: {
    id: "spark1", kind: "predict", title: "Which branches run?",
    code: 'x = 15\nif x > 10:\n    print("A")\nif x > 12:\n    print("B")\nelif x > 14:\n    print("C")\nelse:\n    print("D")\nprint(x > 10 and x < 20, not x == 15, "apple" < "Apple")',
    task: <>Two separate <code>if</code> statements, then an <code>elif</code> chain. Careful: how many of them can print?</>,
    hints: ["The first if stands alone. The second if starts a new chain.", "In an if/elif/else chain only the FIRST true branch runs.", "Text is compared letter by letter by code number: every capital letter comes before every small letter."],
    solution: "A\nB\nTrue False False",
  },
  spark2: {
    id: "spark2", kind: "predict", title: "Truthy, falsy, short-circuit",
    code: 'n = int(input("n: "))\nprint(bool(n), bool("0"), bool(""))\nif n:\n    print("non-zero")\nelse:\n    print("zero")\nlabel = "even" if n % 2 == 0 else "odd"\nprint(label)\nprint(n != 0 and 10 / n > 1)\nprint(0.1 + 0.2 == 0.3, abs(0.1 + 0.2 - 0.3) < 1e-9)',
    inputs: ["0"],
    task: <>The user types <code>0</code>. One line here would crash if Python didn't stop early — does it?</>,
    hints: ["0 and empty text are falsy; any non-empty text — even \"0\" — is truthy.", "and stops at the first False: 10 / n is never worked out.", "0.1 + 0.2 is stored as 0.30000000000000004."],
    solution: "n: 0\nFalse True False\nzero\neven\nFalse\nFalse True",
  },
  ladder: {
    id: "ladder", kind: "fix", title: "Everyone gets a D",
    task: <>A grade calculator: A for 90+, B for 75+, C for 60+, D for 40+, else F. A student with 95 gets D. Fix the logic (not by adding more conditions — think about order).</>,
    starter: 'm = int(input("Marks: "))\nif m >= 40:\n    print("D")\nelif m >= 60:\n    print("C")\nelif m >= 75:\n    print("B")\nelif m >= 90:\n    print("A")\nelse:\n    print("F")',
    tests: [{ inputs: ["95"], expect: "Marks: 95\nA" }, { inputs: ["75"], expect: "Marks: 75\nB", hidden: true }, { inputs: ["60"], expect: "Marks: 60\nC", hidden: true }, { inputs: ["40"], expect: "Marks: 40\nD", hidden: true }, { inputs: ["39"], expect: "Marks: 39\nF", hidden: true }],
    forbids: [{ node: "BoolOp", msg: "No and/or needed — just put the checks in the right order." }],
    hints: ["Python stops at the first true condition. Is 95 >= 40?", "Check the highest grade first."],
    solution: 'm = int(input("Marks: "))\nif m >= 90:\n    print("A")\nelif m >= 75:\n    print("B")\nelif m >= 60:\n    print("C")\nelif m >= 40:\n    print("D")\nelse:\n    print("F")',
  },
  leap: {
    id: "leap", kind: "fix", title: "The leap-year rule",
    task: <>The rule: a year is a leap year if it is divisible by 4 <strong>and not</strong> by 100 — <strong>or</strong> if it is divisible by 400. So 2024 and 2000 are leap years; 1900 and 2023 are not. This program says 1900 is a leap year. Fix the condition.</>,
    starter: 'year = int(input("Year: "))\nif year % 4 == 0 or year % 100 != 0 and year % 400 == 0:\n    print("Leap year")\nelse:\n    print("Not a leap year")',
    tests: [{ inputs: ["1900"], expect: "Year: 1900\nNot a leap year" }, { inputs: ["2024"], expect: "Year: 2024\nLeap year", hidden: true }, { inputs: ["2000"], expect: "Year: 2000\nLeap year", hidden: true, why: "Divisible by 400 → leap, even though it's also divisible by 100." }, { inputs: ["2023"], expect: "Year: 2023\nNot a leap year", hidden: true }, { inputs: ["2100"], expect: "Year: 2100\nNot a leap year", hidden: true }],
    hints: ["and binds tighter than or — Python reads the condition as a or (b and c).", "Write the two halves of the rule with brackets: (div by 4 and not div by 100) or (div by 400)."],
    solution: 'year = int(input("Year: "))\nif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n    print("Leap year")\nelse:\n    print("Not a leap year")',
  },
  bmi: {
    id: "bmi", kind: "complete", title: "BMI category",
    task: <>Fill the blanks: refuse a weight or height of 0 or less, then use <strong>chained comparisons</strong> (like <code>18.5 &lt;= bmi &lt; 25</code>) for the middle categories: Underweight below 18.5, Normal up to 25, Overweight up to 30, Obese from 30.</>,
    starter: 'weight = float(input("Weight (kg): "))\nheight = float(input("Height (m): "))\nif weight <= 0 ___ height <= 0:\n    print("Invalid input")\nelse:\n    bmi = weight / height ** 2\n    if bmi < 18.5:\n        category = "Underweight"\n    elif ___ <= bmi < 25:\n        category = "Normal"\n    elif ___:\n        category = "Overweight"\n    else:\n        category = "Obese"\n    print(f"BMI: {bmi:.1f} ({category})")',
    tests: [
      { inputs: ["70", "1.75"], expect: "Weight (kg): 70\nHeight (m): 1.75\nBMI: 22.9 (Normal)" },
      { inputs: ["0", "1.7"], expect: "Weight (kg): 0\nHeight (m): 1.7\nInvalid input", hidden: true },
      { inputs: ["85", "1.7"], expect: "Weight (kg): 85\nHeight (m): 1.7\nBMI: 29.4 (Overweight)", hidden: true },
      { inputs: ["50", "1.8"], expect: "Weight (kg): 50\nHeight (m): 1.8\nBMI: 15.4 (Underweight)", hidden: true },
      { inputs: ["100", "1.6"], expect: "Weight (kg): 100\nHeight (m): 1.6\nBMI: 39.1 (Obese)", hidden: true },
      { inputs: ["60", "-1.6"], expect: "Weight (kg): 60\nHeight (m): -1.6\nInvalid input", hidden: true, why: "Either value being 0 or less is invalid — or, not and." },
    ],
    hints: ["Invalid if EITHER value is bad.", "18.5 <= bmi < 25", "25 <= bmi < 30"],
    solution: 'weight = float(input("Weight (kg): "))\nheight = float(input("Height (m): "))\nif weight <= 0 or height <= 0:\n    print("Invalid input")\nelse:\n    bmi = weight / height ** 2\n    if bmi < 18.5:\n        category = "Underweight"\n    elif 18.5 <= bmi < 25:\n        category = "Normal"\n    elif 25 <= bmi < 30:\n        category = "Overweight"\n    else:\n        category = "Obese"\n    print(f"BMI: {bmi:.1f} ({category})")',
  },
  fare: {
    id: "fare", kind: "make", title: "Train fare calculator",
    task: <>Ask <code>Age: </code>, <code>Distance (km): </code> and <code>Class (sleeper/ac): </code>. Then, in this order: a class other than <code>sleeper</code> or <code>ac</code> → <code>Unknown class</code>; a distance of 0 or less → <code>Invalid distance</code>; under 5 → <code>Free ticket</code>. Otherwise the fare is Rs 0.50 per km (sleeper) or Rs 1.50 per km (ac), at least Rs 50; ages 5–11 pay half, 60 and over get 40% off. Print <code>Fare: Rs 300.00</code>.</>,
    minLines: 18,
    tests: [
      fareTest("30", "600", "sleeper"),
      fareTest("8", "600", "ac", { hidden: true }),
      fareTest("65", "50", "sleeper", { hidden: true, why: "The Rs 50 minimum applies first, then the senior discount." }),
      fareTest("3", "100", "ac", { hidden: true }),
      fareTest("20", "100", "first", { hidden: true }),
      fareTest("20", "0", "ac", { hidden: true }),
      fareTest("5", "100", "sleeper", { hidden: true, why: "Age 5 already pays (half fare) — only under 5 travels free." }),
      fareTest("60", "200", "ac", { hidden: true, why: "60 counts as a senior: 60 and over." }),
    ],
    requires: [{ node: "If", min: 4 }],
    hints: ["Read all three inputs first, then decide.", "if cls != \"sleeper\" and cls != \"ac\": … elif distance <= 0: … elif age < 5: … else: work out the fare", "fare = rate * distance; if fare < 50: fare = 50 — then the age discounts with if / elif."],
    solution: 'age = int(input("Age: "))\ndistance = float(input("Distance (km): "))\ncls = input("Class (sleeper/ac): ")\nif cls != "sleeper" and cls != "ac":\n    print("Unknown class")\nelif distance <= 0:\n    print("Invalid distance")\nelif age < 5:\n    print("Free ticket")\nelse:\n    rate = 0.5 if cls == "sleeper" else 1.5\n    fare = rate * distance\n    if fare < 50:\n        fare = 50\n    if age <= 11:\n        fare = fare / 2\n    elif age >= 60:\n        fare = fare * 0.6\n    print(f"Fare: Rs {fare:.2f}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "x = 50. if x > 10: … elif x > 40: … — which runs?", options: ["Both", "Only the first", "Only the elif", "Neither"], answer: 1, explain: "A chain stops at the first true condition." },
  { q: "a or b and c means…", options: ["(a or b) and c", "a or (b and c)", "Error", "Depends on the values"], answer: 1, explain: "and binds tighter than or — use brackets to be clear." },
  { q: "bool(\"False\") is…", options: ["False", "True", "Error", "None"], answer: 1, explain: "Any non-empty text is truthy, whatever it says." },
];

export default function Unit5_C(props) {
  return <CrucibleShell {...props} unitId="Unit5_C" module="Module 5" title="The Crucible: Decisions" spark={[EX.spark1, EX.spark2]} flame={[EX.ladder, EX.leap]} forge={[EX.bmi]} temper={[EX.fare]} quiz={QUIZ} />;
}
