// Unit 10.3 — Methods & Encapsulation (rebuilt, typing-first)
// Methods use self → __str__ → calling without () prints a bound method →
// guarding data: a method that validates and raises → the _private convention
// → BankAccount → ShoppingCart make-task (mini-project Track B seed).

import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const cart = (lines) => {
  const items = []; const out = [];
  for (const l of lines) { out.push(`Add: ${l}`); if (l === "done") break; const [n, p, q] = l.split(" "); items.push([n, Number(p), Number(q)]); }
  items.forEach(([n, p, q]) => out.push(`${n} x${q} = Rs ${(p * q).toFixed(2)}`));
  const total = items.reduce((a, [, p, q]) => a + p * q, 0);
  out.push(`Cart: ${items.length} items, Rs ${total.toFixed(2)}`);
  return out.join("\n");
};

const EX = {
  method: {
    id: "method", kind: "type", title: "An object that can do things",
    task: <>A method is a function inside a class. It gets the object as <code>self</code>, so it can use the object's own data. Call it with a dot: <code>s.grade()</code>.</>,
    show: 'class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.mark = mark\n\n    def grade(self):\n        if self.mark >= 75:\n            return "B or better"\n        return "below B"\n\n    def passed(self):\n        return self.mark >= 40\n\ns = Student("Priya", 87)\nprint(s.grade(), s.passed())\nt = Student("Arun", 35)\nprint(t.grade(), t.passed())',
    minLines: 18,
    tests: [{ expect: "B or better True\nbelow B False" }],
    requires: [{ node: "FunctionDef", min: 3 }],
    hints: ["self.mark is THIS object's mark — Priya's in the first call, Arun's in the second."],
    solution: 'class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.mark = mark\n\n    def grade(self):\n        if self.mark >= 75:\n            return "B or better"\n        return "below B"\n\n    def passed(self):\n        return self.mark >= 40\n\ns = Student("Priya", 87)\nprint(s.grade(), s.passed())\nt = Student("Arun", 35)\nprint(t.grade(), t.passed())',
  },
  str: {
    id: "str", kind: "fix", title: "Printing an object",
    task: <>Run it: <code>print(s)</code> shows something like <code>&lt;__main__.Student object at 0x…&gt;</code>. Add a <code>__str__</code> method that returns <code>Priya (87)</code> — print uses it automatically.</>,
    starter: 'class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.mark = mark\n\ns = Student("Priya", 87)\nprint(s)',
    tests: [{ expect: "Priya (87)" }],
    post: "assert str(Student('X', 5)) == 'X (5)'",
    hints: ['def __str__(self):\n    return f"{self.name} ({self.mark})"'],
    solution: 'class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.mark = mark\n\n    def __str__(self):\n        return f"{self.name} ({self.mark})"\n\ns = Student("Priya", 87)\nprint(s)',
  },
  brackets: {
    id: "brackets", kind: "fix", title: "A method without brackets",
    task: <>This should print <code>Area: 12</code>. No error — but run it and look. Fix the call.</>,
    starter: 'class Rectangle:\n    def __init__(self, l, w):\n        self.l = l\n        self.w = w\n\n    def area(self):\n        return self.l * self.w\n\nr = Rectangle(4, 3)\nprint("Area:", r.area)',
    tests: [{ expect: "Area: 12" }],
    hints: ["r.area is the method itself; r.area() calls it (same as functions in Unit 8.1)."],
    solution: 'class Rectangle:\n    def __init__(self, l, w):\n        self.l = l\n        self.w = w\n\n    def area(self):\n        return self.l * self.w\n\nr = Rectangle(4, 3)\nprint("Area:", r.area())',
  },
  guard: {
    id: "guard", kind: "write", title: "Guard the data",
    task: <>Anyone can write <code>s.mark = 500</code>. <strong>Encapsulation</strong> means the object protects its own data: store the mark as <code>self._mark</code> (the underscore says “internal — don't touch directly”), and change it only through <code>set_mark(mark)</code>, which raises <code>ValueError("mark must be 0-100")</code> for bad values, and read it with <code>get_mark()</code>. The test calls <code>set_mark(150)</code> inside try and expects <code>Rejected: mark must be 0-100</code>, then <code>Mark: 91</code>.</>,
    minLines: 16,
    tests: [{ expect: "Rejected: mark must be 0-100\nMark: 91" }],
    post: "_s = Student('Z', 50)\ntry:\n    _s.set_mark(-1)\n    raise AssertionError('set_mark(-1) should raise ValueError')\nexcept ValueError:\n    pass\n_s.set_mark(0)\nassert _s.get_mark() == 0",
    requires: [{ node: "Raise" }, { text: "self._mark" }],
    hints: ["__init__ can call self.set_mark(mark) so even the first value is checked.", "Main: s = Student(\"Priya\", 87); try: s.set_mark(150) except ValueError as e: print(f\"Rejected: {e}\"); s.set_mark(91); print(\"Mark:\", s.get_mark())"],
    solution: 'class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.set_mark(mark)\n\n    def set_mark(self, mark):\n        if not 0 <= mark <= 100:\n            raise ValueError("mark must be 0-100")\n        self._mark = mark\n\n    def get_mark(self):\n        return self._mark\n\ns = Student("Priya", 87)\ntry:\n    s.set_mark(150)\nexcept ValueError as e:\n    print(f"Rejected: {e}")\ns.set_mark(91)\nprint("Mark:", s.get_mark())',
  },
  bank: {
    id: "bank", kind: "write", title: "Bank account",
    task: <>Write <code>BankAccount(owner, balance=0)</code> with <code>deposit(amount)</code> and <code>withdraw(amount)</code>; withdraw raises <code>ValueError("insufficient funds")</code> if the amount is more than the balance; both refuse amounts ≤ 0 with <code>ValueError("amount must be positive")</code>. Add <code>__str__</code> returning <code>Priya: Rs 700</code>. The main program: deposit 500, withdraw 300, print it; then try to withdraw 5000 and print <code>Error: insufficient funds</code>.</>,
    minLines: 22,
    tests: [{ expect: "Priya: Rs 200\nError: insufficient funds" }],
    post: "_a = BankAccount('Z', 100)\n_a.deposit(50)\nassert _a.balance == 150\nfor bad in (0, -5):\n    try:\n        _a.deposit(bad)\n        raise AssertionError('deposit should refuse amounts <= 0')\n    except ValueError:\n        pass\ntry:\n    _a.withdraw(1000)\n    raise AssertionError('withdraw should refuse more than the balance')\nexcept ValueError:\n    pass\nassert str(_a) == 'Z: Rs 150'",
    requires: [{ node: "ClassDef" }, { node: "Raise", min: 2 }],
    hints: ["The test program: a = BankAccount(\"Priya\"); a.deposit(500); a.withdraw(300); print(a) — then a try around a.withdraw(5000).", "Check amount <= 0 first, then the balance."],
    solution: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("amount must be positive")\n        self.balance += amount\n\n    def withdraw(self, amount):\n        if amount <= 0:\n            raise ValueError("amount must be positive")\n        if amount > self.balance:\n            raise ValueError("insufficient funds")\n        self.balance -= amount\n\n    def __str__(self):\n        return f"{self.owner}: Rs {self.balance}"\n\na = BankAccount("Priya")\na.deposit(500)\na.withdraw(300)\nprint(a)\ntry:\n    a.withdraw(5000)\nexcept ValueError as e:\n    print(f"Error: {e}")',
  },
  cart: {
    id: "cart", kind: "make", title: "Shopping cart",
    task: <>Write <code>Cart</code> with a list of items, <code>add(name, price, qty=1)</code> (each item stored as a tuple), <code>total()</code> and <code>count()</code>. Keep asking <code>Add: </code> (like <code>pen 10 3</code>) until <code>done</code>. Then print each item as <code>pen x3 = Rs 30.00</code> and finally <code>Cart: 2 items, Rs 75.00</code>. (Mini-project Track B builds on exactly this.)</>,
    minLines: 24,
    tests: [
      { inputs: ["pen 10 3", "notebook 45 1", "done"], expect: cart(["pen 10 3", "notebook 45 1", "done"]) },
      { inputs: ["done"], expect: cart(["done"]), hidden: true },
      { inputs: ["chai 12.5 4", "done"], expect: cart(["chai 12.5 4", "done"]), hidden: true },
    ],
    post: "_c = Cart()\n_c.add('x', 2.5)\n_c.add('y', 1, 4)\nassert _c.count() == 2 and _c.total() == 6.5, 'check add() default qty, count() and total()'",
    requires: [{ node: "ClassDef" }, { node: "FunctionDef", min: 4 }],
    hints: ["self.items = [] in __init__; add appends (name, price, qty).", "total(): sum price * qty over self.items — unpack each tuple.", "Main: name, price, qty = line.split(); cart.add(name, float(price), int(qty))"],
    solution: 'class Cart:\n    def __init__(self):\n        self.items = []\n\n    def add(self, name, price, qty=1):\n        self.items.append((name, price, qty))\n\n    def total(self):\n        t = 0\n        for name, price, qty in self.items:\n            t += price * qty\n        return t\n\n    def count(self):\n        return len(self.items)\n\ncart = Cart()\nline = input("Add: ")\nwhile line != "done":\n    name, price, qty = line.split()\n    cart.add(name, float(price), int(qty))\n    line = input("Add: ")\nfor name, price, qty in cart.items:\n    print(f"{name} x{qty} = Rs {price * qty:.2f}")\nprint(f"Cart: {cart.count()} items, Rs {cart.total():.2f}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Inside a method, what is self?", options: ["The class", "The object the method was called on", "The first argument you typed", "A global variable"], answer: 1, explain: "s.grade() runs grade with self = s." },
  { q: "What does __str__ control?", options: ["How an object is compared", "What print(obj) and str(obj) show", "Object creation", "Deletion"], answer: 1, explain: "Return a readable string; print calls it for you." },
  { q: "What does print(r.area) (no brackets) show?", options: ["The area", "Something like <bound method Rectangle.area …>", "Error", "None"], answer: 1, explain: "Without () you refer to the method instead of calling it." },
  { q: "What does the underscore in self._mark mean?", options: ["Python makes it impossible to access", "A convention: internal — use the methods instead", "It's a constant", "Nothing at all"], answer: 1, explain: "Python trusts programmers; the underscore is a clear “hands off” sign." },
  { q: "Why validate inside set_mark rather than in the main program?", options: ["Shorter", "Every change goes through one checkpoint, so bad data can't get in anywhere", "Faster", "Required"], answer: 1, explain: "That's encapsulation: the object protects its own data." },
];

export default function Unit10_3(props) {
  const sections = [
    { label: "Methods", kicker: "OBJECTS THAT DO THINGS", title: "Methods: functions that belong to an object", blocks: [<P>So far objects only <em>held</em> data. Methods let them <em>do</em> things with it — <code>s.grade()</code> instead of <code>grade(s.mark)</code>.</P>, EX.method] },
    { label: "__str__", kicker: "SPECIAL METHODS", title: "Describe yourself", blocks: [EX.str, EX.brackets, <Note color={T.blue} icon="✨">Methods with double underscores (<code>__init__</code>, <code>__str__</code>) are special: Python calls them for you at the right moment.</Note>] },
    {
      label: "Encapsulation", kicker: "GUARD THE DATA", title: "Let the object protect its own data",
      blocks: [
        <div className="fh-two" style={{ maxWidth: 880 }}>
          <CodeBlock title="unguarded" code={"s.mark = 500      # nothing stops this"} />
          <CodeBlock title="guarded" code={"s.set_mark(500)   # ValueError: mark must be 0-100"} />
        </div>,
        EX.guard, EX.bank,
        <KeyIdea>Encapsulation: keep the data and the rules about it together in the class, and change the data only through methods that enforce the rules.</KeyIdea>,
      ],
    },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: shopping cart", blocks: [EX.cart] },
  ];
  return (
    <LessonShell {...props} unitId="Unit10_3" crumb="MODULE 10 › UNIT 10.3" title="Methods & Encapsulation" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 10.4 — Inheritance", text: "Write the parent once; children inherit everything and override what they must." }} />
  );
}
