// Unit4_C — The Crucible: Module 4 (rebuilt, typing-first)
// Spark: trace name tags, // % /, string * and +, input echo, end=, round,
// precedence. Flame: the missing-brackets average; the change calculator
// (text from input, + with text, / vs //). Forge: seconds → hh:mm:ss.
// Temper: fuel cost of a trip, split and rounded up with math.ceil.

import CrucibleShell from "../kit/Crucible.jsx";

const EX = {
  spark1: {
    id: "spark1", kind: "predict", title: "Name tags and operators",
    code: 'a = 7\nb = a\na = a + 3\nprint(a, b)\nprint(a // b, a % b, a / 2)\nprint("7" * 3, "7" + "3")',
    task: <>Six lines, three outputs. Watch what <code>b = a</code> really does, and what each operator gives back.</>,
    hints: ["b = a puts a second tag on the value 7. Moving a's tag to 10 later doesn't move b's.", "/ always gives a decimal (float); // gives the whole part and % the remainder.", "With text, * repeats and + glues."],
    solution: "10 7\n1 3 5.0\n777 73",
  },
  spark2: {
    id: "spark2", kind: "predict", title: "Input, end= and rounding",
    code: 'qty = input("Qty: ")\nprice = float(input("Price: "))\nprint(qty * 2)\ntotal = int(qty) * price\nprint(f"Total: {total:.2f}", end=" | ")\nprint(round(total), round(2.5), 2 + 3 * 4 ** 2 // 8)',
    inputs: ["4", "2.5"],
    task: <>The user types <code>4</code> and then <code>2.5</code>. When someone types, the prompt and what they typed appear on one line — like <code>Qty: 4</code> — so include those lines too.</>,
    hints: ["input() always gives text. What is \"4\" * 2?", "end=\" | \" means the next print continues on the same line.", "round(2.5) rounds to the nearest even number. Precedence: ** first, then * and // left to right, then +."],
    solution: "Qty: 4\nPrice: 2.5\n44\nTotal: 10.00 | 10 2 8",
  },
  average: {
    id: "average", kind: "fix", title: "The average that's far too high",
    task: <>This runs without an error — and gives a wildly wrong average. Find out why and fix it. Keep the output format.</>,
    starter: 'm1 = int(input("Mark 1: "))\nm2 = int(input("Mark 2: "))\nm3 = int(input("Mark 3: "))\naverage = m1 + m2 + m3 / 3\nprint("Average:", round(average, 1))',
    tests: [{ inputs: ["70", "80", "90"], expect: "Mark 1: 70\nMark 2: 80\nMark 3: 90\nAverage: 80.0" }, { inputs: ["55", "60", "62"], expect: "Mark 1: 55\nMark 2: 60\nMark 3: 62\nAverage: 59.0", hidden: true }],
    hints: ["Which operation does Python do first: + or /?", "Only m3 is being divided by 3. Brackets change the order."],
    solution: 'm1 = int(input("Mark 1: "))\nm2 = int(input("Mark 2: "))\nm3 = int(input("Mark 3: "))\naverage = (m1 + m2 + m3) / 3\nprint("Average:", round(average, 1))',
  },
  change: {
    id: "change", kind: "fix", title: "The change calculator",
    task: <>A shop's change calculator: it should print the change, how many ₹100 notes to give, and the rest. It has <strong>three</strong> bugs — the first two crash, the third gives a wrong number of notes. Fix all three.</>,
    starter: 'price = input("Price: ")\npaid = input("Paid: ")\nchange = paid - price\nprint("Change: Rs " + change)\nprint("Notes of 100:", change / 100)\nprint("Rest:", change % 100)',
    tests: [{ inputs: ["230", "500"], expect: "Price: 230\nPaid: 500\nChange: Rs 270\nNotes of 100: 2\nRest: 70" }, { inputs: ["99", "1000"], expect: "Price: 99\nPaid: 1000\nChange: Rs 901\nNotes of 100: 9\nRest: 1", hidden: true }],
    hints: ["input() gives text, and you can't subtract text.", "\"Change: Rs \" + 270 mixes text and a number — use an f-string or str().", "You can't hand over 2.7 notes: which operator gives the whole part?"],
    solution: 'price = int(input("Price: "))\npaid = int(input("Paid: "))\nchange = paid - price\nprint(f"Change: Rs {change}")\nprint("Notes of 100:", change // 100)\nprint("Rest:", change % 100)',
  },
  clock: {
    id: "clock", kind: "complete", title: "Seconds to a clock",
    task: <>Turn a number of seconds into <code>hh:mm:ss</code>. Fill the blanks with operators, and finish the f-string: <code>:02d</code> prints a whole number in at least 2 digits, padding with a 0 (so 5 → <code>05</code>).</>,
    starter: 'total = int(input("Seconds: "))\nhours = total ___ 3600\nminutes = (total % 3600) ___ 60\nseconds = total ___ 60\nprint(f"{hours:02d}:{minutes:___}:{seconds:___}")',
    tests: [{ inputs: ["7509"], expect: "Seconds: 7509\n02:05:09" }, { inputs: ["59"], expect: "Seconds: 59\n00:00:59", hidden: true }, { inputs: ["86399"], expect: "Seconds: 86399\n23:59:59", hidden: true }],
    hints: ["// gives whole hours; % gives what's left over.", "seconds = total % 60", "{minutes:02d} and {seconds:02d}"],
    solution: 'total = int(input("Seconds: "))\nhours = total // 3600\nminutes = (total % 3600) // 60\nseconds = total % 60\nprint(f"{hours:02d}:{minutes:02d}:{seconds:02d}")',
  },
  trip: {
    id: "trip", kind: "make", title: "Road-trip fuel split",
    task: <>Friends share the petrol for a trip. Ask <code>Distance (km): </code>, <code>Mileage (km/l): </code>, <code>Petrol price: </code> and <code>People: </code> (decimals allowed except for people). Print <code>Litres needed: 12.50</code>, <code>Fuel cost: Rs 1275.00</code>, <code>Each pays: Rs 318.75</code>, and — because nobody carries paise — <code>Rounded up: Rs 319</code> using <code>math.ceil</code>.</>,
    minLines: 10,
    tests: [
      { inputs: ["250", "20", "102", "4"], expect: "Distance (km): 250\nMileage (km/l): 20\nPetrol price: 102\nPeople: 4\nLitres needed: 12.50\nFuel cost: Rs 1275.00\nEach pays: Rs 318.75\nRounded up: Rs 319" },
      { inputs: ["130", "15", "105.5", "3"], expect: "Distance (km): 130\nMileage (km/l): 15\nPetrol price: 105.5\nPeople: 3\nLitres needed: 8.67\nFuel cost: Rs 914.33\nEach pays: Rs 304.78\nRounded up: Rs 305", hidden: true },
      { inputs: ["100", "25", "100", "1"], expect: "Distance (km): 100\nMileage (km/l): 25\nPetrol price: 100\nPeople: 1\nLitres needed: 4.00\nFuel cost: Rs 400.00\nEach pays: Rs 400.00\nRounded up: Rs 400", hidden: true, why: "When the share is already whole, ceil leaves it alone — don't just add 1." },
    ],
    requires: [{ call: "ceil" }, { node: "JoinedStr" }],
    forbids: [{ text: "1275", msg: "Let Python calculate it." }],
    hints: ["litres = distance / mileage; cost = litres * price; share = cost / people", "import math at the top; math.ceil(share) rounds UP to a whole number.", 'print(f"Each pays: Rs {share:.2f}")'],
    solution: 'import math\n\ndistance = float(input("Distance (km): "))\nmileage = float(input("Mileage (km/l): "))\nprice = float(input("Petrol price: "))\npeople = int(input("People: "))\nlitres = distance / mileage\ncost = litres * price\nshare = cost / people\nprint(f"Litres needed: {litres:.2f}")\nprint(f"Fuel cost: Rs {cost:.2f}")\nprint(f"Each pays: Rs {share:.2f}")\nprint(f"Rounded up: Rs {math.ceil(share)}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "After x = 5; y = x; x = 9 — what is y?", options: ["9", "5", "14", "Error"], answer: 1, explain: "y = x tags the value 5. Re-tagging x doesn't touch y." },
  { q: "What does int(\"3.5\") do?", options: ["Gives 3", "Gives 4", "Crashes with ValueError", "Gives 3.5"], answer: 2, explain: "int() accepts whole-number text only; use int(float(\"3.5\"))." },
  { q: "f\"{7:03d}\" gives…", options: ["7", "007", "7.000", "  7"], answer: 1, explain: "03d: at least 3 digits, padded with zeros." },
];

export default function Unit4_C(props) {
  return <CrucibleShell {...props} unitId="Unit4_C" module="Module 4" title="The Crucible: Python Basics" spark={[EX.spark1, EX.spark2]} flame={[EX.average, EX.change]} forge={[EX.clock]} temper={[EX.trip]} quiz={QUIZ} />;
}
