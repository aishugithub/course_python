// Unit 10.5 — Polymorphism & Abstraction (rebuilt, typing-first)
// Same method name, many behaviours → you've used polymorphism already
// (len, +) → payment methods → an abstract parent that raises
// NotImplementedError → a payroll of salaried and hourly staff.

import LessonShell, { P, KeyIdea, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const payroll = (lines) => {
  const out = [], res = []; let total = 0;
  for (const l of lines) {
    out.push(`Staff: ${l}`); if (l === "done") break;
    const p = l.split(" "); let pay;
    if (p[0] === "salaried") pay = Number(p[2]);
    else { const rate = Number(p[2]), hrs = Number(p[3]); pay = hrs <= 160 ? rate * hrs : rate * 160 + rate * 1.5 * (hrs - 160); }
    total += pay; res.push(`${p[1]}: Rs ${pay.toFixed(2)}`);
  }
  out.push(...res);
  out.push(`Total payroll: Rs ${total.toFixed(2)}`);
  return out.join("\n");
};

const EX = {
  shapes: {
    id: "shapes", kind: "type", title: "One loop, many shapes",
    task: <>Each class has its own <code>area()</code>. The loop doesn't know or care which kind of shape it has — it just calls <code>s.area()</code>, and each object answers its own way. That's <strong>polymorphism</strong> (“many forms”).</>,
    show: 'class Circle:\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return round(3.14159 * self.r ** 2, 2)\n\nclass Square:\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nshapes = [Circle(1), Square(3), Circle(2)]\nfor s in shapes:\n    print(type(s).__name__, s.area())',
    minLines: 16,
    tests: [{ expect: "Circle 3.14\nSquare 9\nCircle 12.57" }],
    requires: [{ node: "ClassDef", min: 2 }],
    hints: ["No if/elif on the shape's kind anywhere — that's the point."],
    solution: 'class Circle:\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return round(3.14159 * self.r ** 2, 2)\n\nclass Square:\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nshapes = [Circle(1), Square(3), Circle(2)]\nfor s in shapes:\n    print(type(s).__name__, s.area())',
  },
  builtin: {
    id: "builtin", kind: "type", title: "You've used polymorphism all along",
    task: <><code>len</code> and <code>+</code> already behave differently depending on the type of value — the same idea, built in.</>,
    show: 'print(len("Priya"), len([1, 2, 3]), len({"a": 1}))\nprint(2 + 3, "ab" + "cd", [1] + [2])\nprint(3 * 2, "ha" * 3)',
    tests: [{ expect: "5 3 1\n5 abcd [1, 2]\n6 hahaha" }],
    hints: ["Each type decides what len, + and * mean for it."],
    solution: 'print(len("Priya"), len([1, 2, 3]), len({"a": 1}))\nprint(2 + 3, "ab" + "cd", [1] + [2])\nprint(3 * 2, "ha" * 3)',
  },
  payments: {
    id: "payments", kind: "write", title: "Three ways to pay",
    task: <>Write <code>UPI(upi_id)</code>, <code>Card(last4)</code> and <code>Cash()</code>, each with a <code>pay(amount)</code> method that <strong>returns</strong> a string: <code>Paid Rs 250 via UPI priya@okaxis</code>, <code>Paid Rs 900 by card ending 4421</code>, <code>Paid Rs 60 in cash</code>. Then loop over <code>[(UPI("priya@okaxis"), 250), (Card("4421"), 900), (Cash(), 60)]</code> and print each result.</>,
    minLines: 18,
    tests: [{ expect: "Paid Rs 250 via UPI priya@okaxis\nPaid Rs 900 by card ending 4421\nPaid Rs 60 in cash" }],
    post: "assert Cash().pay(5) == 'Paid Rs 5 in cash'\nassert Card('1111').pay(1) == 'Paid Rs 1 by card ending 1111'",
    requires: [{ node: "ClassDef", min: 3 }],
    hints: ["for method, amount in payments: print(method.pay(amount)) — unpacking the tuples (7.4)."],
    solution: 'class UPI:\n    def __init__(self, upi_id):\n        self.upi_id = upi_id\n    def pay(self, amount):\n        return f"Paid Rs {amount} via UPI {self.upi_id}"\n\nclass Card:\n    def __init__(self, last4):\n        self.last4 = last4\n    def pay(self, amount):\n        return f"Paid Rs {amount} by card ending {self.last4}"\n\nclass Cash:\n    def pay(self, amount):\n        return f"Paid Rs {amount} in cash"\n\npayments = [(UPI("priya@okaxis"), 250), (Card("4421"), 900), (Cash(), 60)]\nfor method, amount in payments:\n    print(method.pay(amount))',
  },
  abstract: {
    id: "abstract", kind: "fix", title: "The promise that wasn't kept",
    task: <><code>Shape</code> is <strong>abstract</strong>: it promises every shape has an <code>area()</code>, but refuses to guess one (it raises <code>NotImplementedError</code>). Run it and read the coach. Give <code>Triangle</code> its own <code>area()</code> (½ × base × height).</>,
    starter: 'class Shape:\n    def area(self):\n        raise NotImplementedError("every shape must define area()")\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nclass Triangle(Shape):\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n\nfor s in [Square(4), Triangle(6, 5)]:\n    print(s.area())',
    tests: [{ expect: "16\n15.0" }],
    hints: ["def area(self): return 0.5 * self.base * self.height — inside Triangle."],
    solution: 'class Shape:\n    def area(self):\n        raise NotImplementedError("every shape must define area()")\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nclass Triangle(Shape):\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n    def area(self):\n        return 0.5 * self.base * self.height\n\nfor s in [Square(4), Triangle(6, 5)]:\n    print(s.area())',
  },
  payroll: {
    id: "payroll", kind: "make", title: "Payroll",
    task: <>Write an abstract <code>Employee(name)</code> whose <code>pay()</code> raises <code>NotImplementedError</code>, and two children: <code>Salaried(name, monthly)</code> and <code>Hourly(name, rate, hours)</code> — hourly staff get 1.5× the rate for every hour above 160. Read <code>Staff: </code> lines like <code>salaried Priya 50000</code> or <code>hourly Arun 300 170</code> until <code>done</code>. Print each as <code>Arun: Rs 52500.00</code> and finally <code>Total payroll: Rs 102500.00</code>. The printing loop must not check which kind of employee it has.</>,
    minLines: 28,
    tests: [
      { inputs: ["salaried Priya 50000", "hourly Arun 300 170", "done"], expect: payroll(["salaried Priya 50000", "hourly Arun 300 170", "done"]) },
      { inputs: ["hourly Kavya 250 100", "done"], expect: payroll(["hourly Kavya 250 100", "done"]), hidden: true },
    ],
    post: "assert Hourly('h', 100, 170).pay() == 17500\ntry:\n    Employee('x').pay()\n    raise AssertionError('Employee.pay() should raise NotImplementedError')\nexcept NotImplementedError:\n    pass",
    requires: [{ node: "ClassDef", min: 3 }, { node: "Raise" }],
    hints: ["Build the right object when reading the line (an if is fine there), store all of them in one list.", "The print loop: for e in staff: print(f\"{e.name}: Rs {e.pay():.2f}\")", "Overtime: if hours <= 160: rate * hours, else rate * 160 + rate * 1.5 * (hours - 160)"],
    solution: 'class Employee:\n    def __init__(self, name):\n        self.name = name\n    def pay(self):\n        raise NotImplementedError("pay() must be defined")\n\nclass Salaried(Employee):\n    def __init__(self, name, monthly):\n        super().__init__(name)\n        self.monthly = monthly\n    def pay(self):\n        return self.monthly\n\nclass Hourly(Employee):\n    def __init__(self, name, rate, hours):\n        super().__init__(name)\n        self.rate = rate\n        self.hours = hours\n    def pay(self):\n        if self.hours <= 160:\n            return self.rate * self.hours\n        return self.rate * 160 + self.rate * 1.5 * (self.hours - 160)\n\nstaff = []\nline = input("Staff: ")\nwhile line != "done":\n    parts = line.split()\n    if parts[0] == "salaried":\n        staff.append(Salaried(parts[1], float(parts[2])))\n    else:\n        staff.append(Hourly(parts[1], float(parts[2]), float(parts[3])))\n    line = input("Staff: ")\ntotal = 0\nfor e in staff:\n    print(f"{e.name}: Rs {e.pay():.2f}")\n    total += e.pay()\nprint(f"Total payroll: Rs {total:.2f}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What is polymorphism?", options: ["A class with many attributes", "The same method call doing different things depending on the object's type", "Copying objects", "A kind of loop"], answer: 1, explain: "s.area() runs Circle.area or Square.area depending on s." },
  { q: "Why is a loop calling e.pay() better than if/elif on the employee type?", options: ["Shorter only", "Adding a new kind of employee needs no change to the loop", "Faster", "Required"], answer: 1, explain: "New classes plug in without touching existing code." },
  { q: "What is an abstract class here?", options: ["A class with no methods", "A parent that defines what children must provide, raising NotImplementedError instead of guessing", "A hidden class", "A finished class"], answer: 1, explain: "Python's abc module can enforce this more strictly; NotImplementedError is the plain-Python version." },
  { q: "\"ha\" * 3 and 3 * 2 both use *. That's…", options: ["A bug", "Built-in polymorphism: each type defines what * means", "Inheritance", "Encapsulation"], answer: 1, explain: "Operators are polymorphic too." },
];

export default function Unit10_5(props) {
  const sections = [
    {
      label: "Many Forms", kicker: "ONE CALL, MANY BEHAVIOURS", title: "Polymorphism",
      blocks: [
        <div className="fh-two" style={{ maxWidth: 900 }}>
          <CodeBlock title="without polymorphism" code={'for s in shapes:\n    if s.kind == "circle":\n        a = 3.14 * s.r ** 2\n    elif s.kind == "square":\n        a = s.side ** 2\n    # a new shape? edit this loop again…'} />
          <CodeBlock title="with polymorphism" code={"for s in shapes:\n    a = s.area()   # each shape knows its own formula"} />
        </div>,
        EX.shapes, EX.builtin,
      ],
    },
    { label: "Interchangeable", kicker: "SAME INTERFACE", title: "Objects you can swap", blocks: [EX.payments, <KeyIdea>If several classes offer the same method name with the same meaning, code that uses them never needs to know which one it has.</KeyIdea>] },
    { label: "Abstraction", kicker: "PROMISE, DON'T GUESS", title: "Abstract parents", blocks: [EX.abstract] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: payroll", blocks: [EX.payroll] },
  ];
  return (
    <LessonShell {...props} unitId="Unit10_5" crumb="MODULE 10 › UNIT 10.5" title="Polymorphism & Abstraction" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 10.6 — User-Defined Exceptions", text: "Raise InvalidMarkError, not a mystery — exceptions as classes." }} />
  );
}
