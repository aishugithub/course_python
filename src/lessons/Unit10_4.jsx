// Unit 10.4 — Inheritance (rebuilt, typing-first)
// class Child(Parent) inherits attributes and methods → super().__init__ →
// forgetting super() → overriding (and extending with super().method()) →
// isinstance → Vehicle/Car/Bike toll calculator.

import LessonShell, { P, KeyIdea, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const tolls = (lines) => {
  const rate = { car: 60, bike: 20, bus: 200 };
  const out = []; let total = 0;
  for (const l of lines) { out.push(`Vehicle: ${l}`); if (l === "done") break; const [kind, reg] = l.split(" "); const t = rate[kind]; total += t; out.push(`${kind.charAt(0).toUpperCase() + kind.slice(1)} ${reg}: ${kind === "car" ? 4 : kind === "bike" ? 2 : 6} wheels, toll Rs ${t}`); }
  out.push(`Total toll: Rs ${total}`);
  return out.join("\n");
};

const EX = {
  inherit: {
    id: "inherit", kind: "type", title: "Children inherit everything",
    task: <><code>class Student(Person):</code> means a Student <em>is a</em> Person: it gets Person's <code>__init__</code> and methods for free, and can add its own.</>,
    show: 'class Person:\n    def __init__(self, name, email):\n        self.name = name\n        self.email = email\n\n    def describe(self):\n        return f"{self.name} <{self.email}>"\n\nclass Student(Person):\n    def study(self):\n        return f"{self.name} is studying"\n\ns = Student("Priya", "priya@sret.in")\nprint(s.describe())\nprint(s.study())\nprint(isinstance(s, Person), isinstance(s, Student))',
    minLines: 17,
    tests: [{ expect: "Priya <priya@sret.in>\nPriya is studying\nTrue True" }],
    requires: [{ node: "ClassDef", min: 2 }],
    hints: ["Student has no __init__ of its own, so Person's is used."],
    solution: 'class Person:\n    def __init__(self, name, email):\n        self.name = name\n        self.email = email\n\n    def describe(self):\n        return f"{self.name} <{self.email}>"\n\nclass Student(Person):\n    def study(self):\n        return f"{self.name} is studying"\n\ns = Student("Priya", "priya@sret.in")\nprint(s.describe())\nprint(s.study())\nprint(isinstance(s, Person), isinstance(s, Student))',
  },
  superinit: {
    id: "superinit", kind: "write", title: "super().__init__ — add your own attributes",
    task: <>A Manager is an Employee with a team. Write <code>Employee(name, salary)</code> and <code>Manager(Employee)</code> whose <code>__init__(self, name, salary, team)</code> first calls <code>super().__init__(name, salary)</code>, then stores <code>self.team</code>. Print <code>Meena earns Rs 90000 and leads 6 people</code> for <code>Manager("Meena", 90000, 6)</code>.</>,
    tests: [{ expect: "Meena earns Rs 90000 and leads 6 people" }],
    post: "_m = Manager('Z', 1, 2)\nassert (_m.name, _m.salary, _m.team) == ('Z', 1, 2) and isinstance(_m, Employee)",
    requires: [{ call: "super", msg: "Call super().__init__(name, salary) in Manager's __init__." }],
    hints: ["class Manager(Employee):\n    def __init__(self, name, salary, team):\n        super().__init__(name, salary)\n        self.team = team"],
    solution: 'class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\nclass Manager(Employee):\n    def __init__(self, name, salary, team):\n        super().__init__(name, salary)\n        self.team = team\n\nm = Manager("Meena", 90000, 6)\nprint(f"{m.name} earns Rs {m.salary} and leads {m.team} people")',
  },
  nosuper: {
    id: "nosuper", kind: "fix", title: "The parent never got to run",
    task: <>Run it and read the coach.</>,
    starter: 'class Person:\n    def __init__(self, name):\n        self.name = name\n\nclass Teacher(Person):\n    def __init__(self, name, subject):\n        self.subject = subject\n\nt = Teacher("Rao", "Physics")\nprint(t.name, "teaches", t.subject)',
    tests: [{ expect: "Rao teaches Physics" }],
    hints: ["Teacher's own __init__ replaces Person's — so Person's never runs unless you call it: super().__init__(name)"],
    solution: 'class Person:\n    def __init__(self, name):\n        self.name = name\n\nclass Teacher(Person):\n    def __init__(self, name, subject):\n        super().__init__(name)\n        self.subject = subject\n\nt = Teacher("Rao", "Physics")\nprint(t.name, "teaches", t.subject)',
  },
  override: {
    id: "override", kind: "write", title: "Override, and extend",
    task: <>Give <code>Person</code> a method <code>describe()</code> returning the name. In <code>Student(Person)</code>, <strong>override</strong> it to return <code>Priya (roll 22CS1042)</code> — reuse the parent's version with <code>super().describe()</code>. Print both <code>Person("Rao").describe()</code> and the student's.</>,
    tests: [{ expect: "Rao\nPriya (roll 22CS1042)" }],
    post: "assert Student('A', 'R1').describe() == 'A (roll R1)'",
    requires: [{ call: "super" }, { node: "ClassDef", min: 2 }],
    hints: ['In Student: def describe(self): return f"{super().describe()} (roll {self.roll})"'],
    solution: 'class Person:\n    def __init__(self, name):\n        self.name = name\n\n    def describe(self):\n        return self.name\n\nclass Student(Person):\n    def __init__(self, name, roll):\n        super().__init__(name)\n        self.roll = roll\n\n    def describe(self):\n        return f"{super().describe()} (roll {self.roll})"\n\nprint(Person("Rao").describe())\nprint(Student("Priya", "22CS1042").describe())',
  },
  toll: {
    id: "toll", kind: "make", title: "Toll plaza",
    task: <>Write <code>Vehicle(reg)</code> with <code>wheels = 0</code> and <code>toll()</code> returning 0, plus three children that override them: <code>Car</code> (4 wheels, Rs 60), <code>Bike</code> (2, Rs 20), <code>Bus</code> (6, Rs 200). Each has a <code>__str__</code> like <code>Car TN01AB1234: 4 wheels, toll Rs 60</code> — write it <strong>once</strong>, in Vehicle, using <code>type(self).__name__</code> for the class name. Read <code>Vehicle: </code> lines like <code>car TN01AB1234</code> until <code>done</code>, print each vehicle and finally <code>Total toll: Rs 280</code>.</>,
    minLines: 30,
    tests: [
      { inputs: ["car TN01AB1234", "bike TN09X77", "bus KA05F1", "car TN22Q9", "done"], expect: tolls(["car TN01AB1234", "bike TN09X77", "bus KA05F1", "car TN22Q9", "done"]).replace("Total toll: Rs 340", "Total toll: Rs 340") },
      { inputs: ["done"], expect: tolls(["done"]), hidden: true },
    ],
    post: "assert Bus('X').toll() == 200 and Bike('Y').wheels == 2 and str(Car('Z')) == 'Car Z: 4 wheels, toll Rs 60'",
    requires: [{ node: "ClassDef", min: 4 }],
    forbids: [{ text: "def __str__", max: 1, msg: "Write __str__ once, in Vehicle — the children inherit it." }],
    hints: ["Class attribute: class Car(Vehicle): wheels = 4 — then def toll(self): return 60", 'Vehicle.__str__: return f"{type(self).__name__} {self.reg}: {self.wheels} wheels, toll Rs {self.toll()}"', "Pick the class with a dict: kinds = {\"car\": Car, \"bike\": Bike, \"bus\": Bus}; v = kinds[kind](reg)"],
    solution: 'class Vehicle:\n    wheels = 0\n\n    def __init__(self, reg):\n        self.reg = reg\n\n    def toll(self):\n        return 0\n\n    def __str__(self):\n        return f"{type(self).__name__} {self.reg}: {self.wheels} wheels, toll Rs {self.toll()}"\n\nclass Car(Vehicle):\n    wheels = 4\n    def toll(self):\n        return 60\n\nclass Bike(Vehicle):\n    wheels = 2\n    def toll(self):\n        return 20\n\nclass Bus(Vehicle):\n    wheels = 6\n    def toll(self):\n        return 200\n\nkinds = {"car": Car, "bike": Bike, "bus": Bus}\ntotal = 0\nline = input("Vehicle: ")\nwhile line != "done":\n    kind, reg = line.split()\n    v = kinds[kind](reg)\n    print(v)\n    total += v.toll()\n    line = input("Vehicle: ")\nprint(f"Total toll: Rs {total}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "class Dog(Animal): means…", options: ["Dog contains an Animal", "Dog is a kind of Animal and inherits its attributes and methods", "Animal inherits from Dog", "Nothing"], answer: 1, explain: "The child gets everything the parent has, and can add or override." },
  { q: "A child defines its own __init__. When does the parent's __init__ run?", options: ["Automatically", "Only if the child calls super().__init__(...)", "Never", "After the child's"], answer: 1, explain: "That's why Teacher had no .name." },
  { q: "What is overriding?", options: ["Deleting a parent method", "A child defining a method with the same name, replacing the parent's version for that child", "Calling super()", "Renaming a class"], answer: 1, explain: "And super().method() reuses the parent's version inside the new one." },
  { q: "isinstance(Student(...), Person) gives…", options: ["False", "True — a Student is a Person", "Error", "None"], answer: 1, explain: "An object is an instance of its class and of every ancestor." },
];

export default function Unit10_4(props) {
  const sections = [
    { label: "Inherit", kicker: "IS-A", title: "A child class gets everything its parent has", blocks: [<P>Students, teachers and staff all have a name and an email. Write that once in a parent class; each child inherits it and adds what's special.</P>, EX.inherit] },
    {
      label: "super()", kicker: "EXTEND THE PARENT", title: "Adding attributes with super().__init__",
      blocks: [<div style={{ maxWidth: 680 }}><CodeBlock title="the shape" code={"class Child(Parent):\n    def __init__(self, parent_args, extra):\n        super().__init__(parent_args)   # let the parent set its part\n        self.extra = extra              # then add yours"} /></div>, EX.superinit, EX.nosuper],
    },
    { label: "Override", kicker: "SAME NAME, NEW BEHAVIOUR", title: "Overriding methods", blocks: [EX.override, <KeyIdea>A child can <strong>add</strong> methods, <strong>override</strong> them (same name, new body), and <strong>extend</strong> them by calling <code>super().method()</code> inside the override.</KeyIdea>] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: toll plaza", blocks: [EX.toll] },
  ];
  return (
    <LessonShell {...props} unitId="Unit10_4" crumb="MODULE 10 › UNIT 10.4" title="Inheritance" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 10.5 — Polymorphism & Abstraction", text: "One method name, many behaviours — and classes that refuse to be used unfinished." }} />
  );
}
