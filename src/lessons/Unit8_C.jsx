// Unit8_C — The Crucible: Module 8 (rebuilt, typing-first)
// Spark: a parameter shadowing a global, defaults + keyword arguments; call
// order, print vs return, the None a function gives back. Flame: a helper
// that prints instead of returning; the shared default list. Forge: defaults,
// keyword calls and a docstring. Temper: password strength from small
// helper functions (post checks call them directly).

import CrucibleShell from "../kit/Crucible.jsx";

const strength = (pw) => {
  const kinds = [/\d/, /[A-Z]/, /[a-z]/].filter((r) => r.test(pw)).length;
  if (pw.length >= 8 && kinds === 3) return "strong";
  if (pw.length >= 6 && kinds >= 2) return "medium";
  return "weak";
};
const pwRun = (words) => [...words.flatMap((w) => [`Password: ${w}`, `${w}: ${strength(w)}`]), "Password: quit"].join("\n");
const pwTest = (words, extra = {}) => ({ inputs: [...words, "quit"], expect: pwRun(words), ...extra });

const EX = {
  spark1: {
    id: "spark1", kind: "predict", title: "Scope and defaults",
    code: 'count = 10\n\ndef bump(count):\n    count = count + 1\n    return count\n\ndef show():\n    print("inside:", count)\n\nresult = bump(count)\nprint(count, result)\nshow()\n\ndef total(a, b=2, c=3):\n    return a + b * c\n\nprint(total(1), total(1, c=10), total(b=0, a=5))',
    task: <>The parameter <code>count</code> and the global <code>count</code> share a name. Do they share a value?</>,
    hints: ["Inside bump, count is a local copy of the argument — changing it doesn't touch the global.", "show() has no local count, so it reads the global one.", "Keyword arguments can come in any order; the others use their defaults."],
    solution: "10 11\ninside: 10\n7 21 5",
  },
  spark2: {
    id: "spark2", kind: "predict", title: "print is not return",
    code: 'def square(n):\n    print("sq", n)\n    return n * n\n\ndef describe(n):\n    if n > 10:\n        return "big"\n    print("checked", n)\n\nx = square(3) + square(2)\nprint(x)\nprint(describe(square(4)))\nprint(describe(2))',
    task: <>Watch the <em>order</em> things print in — and what a function gives back when it never reaches a <code>return</code>.</>,
    hints: ["Python works out square(3) before square(2), and each call prints first.", "describe(square(4)): square runs first, then describe gets 16.", "A function that ends without return gives back None — and print shows it."],
    solution: "sq 3\nsq 2\n13\nsq 4\nbig\nchecked 2\nNone",
  },
  average: {
    id: "average", kind: "fix", title: "The function that only shows",
    task: <>It crashes on the f-string. <code>average()</code> shows the answer but doesn't give it back. Fix the function (and only the function); the output should be exactly the two lines below.</>,
    starter: 'def average(marks):\n    total = 0\n    for m in marks:\n        total += m\n    print(total / len(marks))\n\ndef grade(avg):\n    if avg >= 75:\n        return "Distinction"\n    elif avg >= 40:\n        return "Pass"\n    return "Fail"\n\nmarks = []\nfor x in input("Marks: ").split():\n    marks.append(int(x))\navg = average(marks)\nprint(f"Average: {avg:.1f}")\nprint("Result:", grade(avg))',
    tests: [{ inputs: ["80 70 90"], expect: "Marks: 80 70 90\nAverage: 80.0\nResult: Distinction" }, { inputs: ["40 39"], expect: "Marks: 40 39\nAverage: 39.5\nResult: Fail", hidden: true }, { inputs: ["40"], expect: "Marks: 40\nAverage: 40.0\nResult: Pass", hidden: true }],
    post: "assert average([1, 2]) == 1.5, 'average() should RETURN the average.'",
    hints: ["What does average() give back? Look for a return.", "Replace the print inside average with return."],
    solution: 'def average(marks):\n    total = 0\n    for m in marks:\n        total += m\n    return total / len(marks)\n\ndef grade(avg):\n    if avg >= 75:\n        return "Distinction"\n    elif avg >= 40:\n        return "Pass"\n    return "Fail"\n\nmarks = []\nfor x in input("Marks: ").split():\n    marks.append(int(x))\navg = average(marks)\nprint(f"Average: {avg:.1f}")\nprint("Result:", grade(avg))',
  },
  cart: {
    id: "cart", kind: "fix", title: "Two customers, one cart",
    task: <>Each call should start a fresh cart unless a cart is passed in. But order 2 contains the pen from order 1! A default value is created <strong>once</strong>, when <code>def</code> runs — so every call without a cart shares the same list. Use <code>cart=None</code> and make a new list inside the function when needed.</>,
    starter: 'def add_item(item, cart=[]):\n    cart.append(item)\n    return cart\n\norder1 = add_item("pen")\norder2 = add_item("book")\nprint("Order 1:", order1)\nprint("Order 2:", order2)\nprint("Gift:", add_item("card", ["ribbon"]))',
    tests: [{ expect: "Order 1: ['pen']\nOrder 2: ['book']\nGift: ['ribbon', 'card']" }],
    post: "assert add_item('x') == ['x'] and add_item('y') == ['y'], 'Every call without a cart must start with an empty list.'",
    hints: ["Print order1 and order2 — are they the same list?", "def add_item(item, cart=None): then if cart is None: cart = []"],
    solution: 'def add_item(item, cart=None):\n    if cart is None:\n        cart = []\n    cart.append(item)\n    return cart\n\norder1 = add_item("pen")\norder2 = add_item("book")\nprint("Order 1:", order1)\nprint("Order 2:", order2)\nprint("Gift:", add_item("card", ["ribbon"]))',
  },
  bill: {
    id: "bill", kind: "complete", title: "Defaults, keywords, a docstring",
    task: <>Fill the blanks: the tip defaults to 10 percent and the bill to 1 person. The four prints should give the lines below — the last one prints the function's docstring.</>,
    starter: 'def bill(amount, tip=___, people=___):\n    """Return each person\'s share: amount plus tip percent, split evenly."""\n    total = amount + amount * ___ / 100\n    return round(total / ___, 2)\n\nprint(bill(1000))\nprint(bill(1000, people=4))\nprint(bill(1000, tip=0, people=3))\nprint(bill.__doc__)',
    tests: [{ expect: "1100.0\n275.0\n333.33\nReturn each person's share: amount plus tip percent, split evenly." }],
    post: "assert bill(200, 50, 2) == 150.0",
    hints: ["tip=10, people=1", "amount * tip / 100", "total / people"],
    solution: 'def bill(amount, tip=10, people=1):\n    """Return each person\'s share: amount plus tip percent, split evenly."""\n    total = amount + amount * tip / 100\n    return round(total / people, 2)\n\nprint(bill(1000))\nprint(bill(1000, people=4))\nprint(bill(1000, tip=0, people=3))\nprint(bill.__doc__)',
  },
  password: {
    id: "password", kind: "make", title: "Password strength",
    task: <>Write <code>has_digit(s)</code>, <code>has_upper(s)</code> and <code>has_lower(s)</code> (each returns True/False — <code>ch.isdigit()</code>, <code>ch.isupper()</code>, <code>ch.islower()</code> test one character), and <code>strength(pw)</code>: <code>"strong"</code> if it is at least 8 long with all three kinds; <code>"medium"</code> if at least 6 long with at least two kinds; otherwise <code>"weak"</code>. Main program: keep asking <code>Password: </code> until <code>quit</code>, printing <code>Abcdefg1: strong</code>. Hidden checks call your functions directly.</>,
    minLines: 24,
    tests: [
      pwTest(["abc", "Abcdef1", "Abcdefg1", "abcdefgh", "ABCdef"]),
      pwTest(["12345678"], { hidden: true, why: "Only digits is one kind: weak, however long." }),
      pwTest(["Ab1", "aB3456"], { hidden: true }),
    ],
    post: "assert has_digit('a1') and not has_digit('ab'), 'has_digit'\nassert has_upper('aB') and not has_upper('ab'), 'has_upper'\nassert has_lower('Ab') and not has_lower('AB'), 'has_lower'\nassert strength('Aa1aaaaa') == 'strong' and strength('Aa1aa') == 'weak' and strength('aaaaaa1') == 'medium', 'strength() gives the wrong rating'",
    requires: [{ node: "FunctionDef", min: 4 }, { node: "Return", min: 4 }],
    hints: ["def has_digit(s): for ch in s: if ch.isdigit(): return True — and return False after the loop.", "kinds = has_digit(pw) + has_upper(pw) + has_lower(pw) — True counts as 1.", "Check strong first, then medium, else weak."],
    solution: 'def has_digit(s):\n    for ch in s:\n        if ch.isdigit():\n            return True\n    return False\n\ndef has_upper(s):\n    for ch in s:\n        if ch.isupper():\n            return True\n    return False\n\ndef has_lower(s):\n    for ch in s:\n        if ch.islower():\n            return True\n    return False\n\ndef strength(pw):\n    kinds = has_digit(pw) + has_upper(pw) + has_lower(pw)\n    if len(pw) >= 8 and kinds == 3:\n        return "strong"\n    if len(pw) >= 6 and kinds >= 2:\n        return "medium"\n    return "weak"\n\nwhile True:\n    pw = input("Password: ")\n    if pw == "quit":\n        break\n    print(f"{pw}: {strength(pw)}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "A function with no return statement gives back…", options: ["0", "\"\"", "None", "An error"], answer: 2, explain: "That's why print(f(x)) can show None." },
  { q: "def f(x): x = 5 — after a = 1; f(a), a is…", options: ["5", "1", "None", "Error"], answer: 1, explain: "x is a local name; re-tagging it doesn't touch a." },
  { q: "Why is def f(items=[]) risky?", options: ["Lists can't be defaults", "The same list is shared by every call that uses the default", "It's slower", "It isn't"], answer: 1, explain: "Defaults are made once, at def time. Use None and create the list inside." },
];

export default function Unit8_C(props) {
  return <CrucibleShell {...props} unitId="Unit8_C" module="Module 8" title="The Crucible: Functions" spark={[EX.spark1, EX.spark2]} flame={[EX.average, EX.cart]} forge={[EX.bill]} temper={[EX.password]} quiz={QUIZ} />;
}
