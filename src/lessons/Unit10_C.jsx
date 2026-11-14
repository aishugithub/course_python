// Unit10_C — The Crucible: Module 10 (rebuilt, typing-first)
// Spark: objects as name tags, __str__, is vs ==; inheritance, overriding,
// super() and polymorphism. Flame: a class-level list shared by every
// student; a child class that forgets super().__init__. Forge: abstract
// Shape with Circle / Rectangle / Square. Temper: a parking lot with Vehicle
// subclasses, ParkingLot and LotFullError (post checks use the classes).

import CrucibleShell from "../kit/Crucible.jsx";

function parking(cmds) {
  const out = [], lot = new Map(); let earned = 0;
  const fee = (v, h) => (v.t === "car" ? 20 * h : v.t === "bike" ? 10 * h : 50 * h + 25 * v.axles);
  for (const line of cmds) {
    out.push(`Command: ${line}`);
    const p = line.split(/\s+/).filter(Boolean);
    if (p.length === 1 && p[0] === "done") break;
    if (p.length === 1 && p[0] === "status") { out.push(`${lot.size}/3 spaces used`); continue; }
    const parkOk = p[0] === "park" && ((p.length === 3 && (p[1] === "car" || p[1] === "bike")) || (p.length === 4 && p[1] === "truck" && /^\d+$/.test(p[3])));
    const leaveOk = p[0] === "leave" && p.length === 3 && /^\d+$/.test(p[2]);
    if (parkOk) {
      const plate = p[2];
      if (lot.has(plate)) out.push(`${plate} is already parked`);
      else if (lot.size >= 3) out.push("Lot full");
      else { lot.set(plate, { t: p[1], axles: +(p[3] || 0) }); out.push(`Parked ${p[1]} ${plate}`); }
    } else if (leaveOk) {
      const plate = p[1];
      if (!lot.has(plate)) out.push(`No vehicle ${plate}`);
      else { const f = fee(lot.get(plate), +p[2]); lot.delete(plate); earned += f; out.push(`${plate} paid Rs ${f}`); }
    } else out.push("Unknown command");
  }
  out.push(`Earned: Rs ${earned}`);
  return out.join("\n");
}
const parkTest = (cmds, extra = {}) => ({ inputs: cmds, expect: parking(cmds), ...extra });

const EX = {
  spark1: {
    id: "spark1", kind: "predict", title: "Objects and name tags",
    code: 'class Box:\n    def __init__(self, label, items=0):\n        self.label = label\n        self.items = items\n\n    def add(self, n):\n        self.items += n\n\n    def __str__(self):\n        return f"{self.label}[{self.items}]"\n\na = Box("A")\nb = Box("B", 3)\nc = a\nc.add(2)\na.add(1)\nboxes = [a, b, c]\nprint(a, b, c)\nprint(len(boxes), a is c, a == b)\nb = Box("B", 3)\nprint(b.items + boxes[1].items)',
    task: <>How many Box objects exist by the end — and which names point at which?</>,
    hints: ["c = a makes no new box: c and a are two names for the same object.", "print uses __str__ for each object.", "The last b = Box(\"B\", 3) is a brand-new box; boxes[1] still points at the old one."],
    solution: "A[3] B[3] A[3]\n3 True False\n6",
  },
  spark2: {
    id: "spark2", kind: "predict", title: "Inheritance and super()",
    code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."\n\n    def intro(self):\n        return f"{self.name} says {self.speak()}"\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"\n\nclass Puppy(Dog):\n    def __init__(self, name, age):\n        super().__init__(name)\n        self.age = age\n\n    def speak(self):\n        return super().speak() + "!" * self.age\n\nfor pet in [Animal("Cat"), Dog("Rex"), Puppy("Bit", 2)]:\n    print(pet.intro())\nprint(isinstance(Puppy("x", 1), Animal))',
    task: <><code>intro</code> is written once, in Animal. Which <code>speak</code> does it call for each pet?</>,
    hints: ["self.speak() calls the speak of the object's own class — the most specific one.", "Puppy's speak takes Dog's \"Woof\" and adds age exclamation marks.", "A Puppy is a Dog, and a Dog is an Animal."],
    solution: "Cat says ...\nRex says Woof\nBit says Woof!!\nTrue",
  },
  marks: {
    id: "marks", kind: "fix", title: "Everyone shares one list",
    task: <>Asha should average 85.0 and Ben 40.0 — but both get 70.0. A list written directly in the class body belongs to the <em>class</em>, shared by every student. Give each student their own list.</>,
    starter: 'class Student:\n    marks = []\n\n    def __init__(self, name):\n        self.name = name\n\n    def add_mark(self, m):\n        self.marks.append(m)\n\n    def average(self):\n        return sum(self.marks) / len(self.marks)\n\nasha = Student("Asha")\nben = Student("Ben")\nasha.add_mark(90)\nasha.add_mark(80)\nben.add_mark(40)\nprint(f"{asha.name}: {asha.average():.1f}")\nprint(f"{ben.name}: {ben.average():.1f}")',
    tests: [{ expect: "Asha: 85.0\nBen: 40.0" }],
    post: "_s = Student('x')\nassert _s.marks == [], 'A new Student must start with an empty list of marks.'",
    hints: ["Where should a value that belongs to ONE object be created?", "In __init__: self.marks = [] — and delete the class-level line."],
    solution: 'class Student:\n    def __init__(self, name):\n        self.name = name\n        self.marks = []\n\n    def add_mark(self, m):\n        self.marks.append(m)\n\n    def average(self):\n        return sum(self.marks) / len(self.marks)\n\nasha = Student("Asha")\nben = Student("Ben")\nasha.add_mark(90)\nasha.add_mark(80)\nben.add_mark(40)\nprint(f"{asha.name}: {asha.average():.1f}")\nprint(f"{ben.name}: {ben.average():.1f}")',
  },
  savings: {
    id: "savings", kind: "fix", title: "The savings account that won't open",
    task: <>A Savings account is an Account that must keep a minimum balance. Run it: it crashes the moment it touches <code>self.balance</code>. Read the coach, fix it, and check the three withdrawals come out as shown.</>,
    starter: 'class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            raise ValueError("Insufficient funds")\n        self.balance -= amount\n\nclass Savings(Account):\n    def __init__(self, owner, balance=0, minimum=1000):\n        self.minimum = minimum\n\n    def withdraw(self, amount):\n        if self.balance - amount < self.minimum:\n            raise ValueError("Below minimum balance")\n        self.balance -= amount\n\ns = Savings("Asha", 5000)\nfor amount in [3000, 1500, 500]:\n    try:\n        s.withdraw(amount)\n        print("Withdrew", amount, "- left", s.balance)\n    except ValueError as e:\n        print("Refused", amount, "-", e)',
    tests: [{ expect: "Withdrew 3000 - left 2000\nRefused 1500 - Below minimum balance\nWithdrew 500 - left 1500" }],
    post: "_x = Savings('x', 100, 50)\nassert _x.owner == 'x' and _x.balance == 100, 'Savings must set owner and balance through the parent.'\ntry:\n    _x.withdraw(60)\n    raise AssertionError('Going below the minimum must raise ValueError.')\nexcept ValueError:\n    pass",
    hints: ["Savings.__init__ replaces Account.__init__ — so owner and balance are never set.", "First line of Savings.__init__: super().__init__(owner, balance)"],
    solution: 'class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            raise ValueError("Insufficient funds")\n        self.balance -= amount\n\nclass Savings(Account):\n    def __init__(self, owner, balance=0, minimum=1000):\n        super().__init__(owner, balance)\n        self.minimum = minimum\n\n    def withdraw(self, amount):\n        if self.balance - amount < self.minimum:\n            raise ValueError("Below minimum balance")\n        self.balance -= amount\n\ns = Savings("Asha", 5000)\nfor amount in [3000, 1500, 500]:\n    try:\n        s.withdraw(amount)\n        print("Withdrew", amount, "- left", s.balance)\n    except ValueError as e:\n        print("Refused", amount, "-", e)',
  },
  shapes: {
    id: "shapes", kind: "complete", title: "Shapes that know their area",
    task: <>Shape is an abstract parent: its <code>area</code> refuses to work, so every child must override it. Fill the blanks — a Square is a Rectangle with equal sides, so it only needs to call the parent's <code>__init__</code>.</>,
    starter: 'import math\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError("Each shape must define area()")\n\n    def __str__(self):\n        return f"{type(self).__name__} with area {self.area():.2f}"\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n\n    def area(self):\n        return ___\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n\n    def ___(self):\n        return self.w * self.h\n\nclass Square(___):\n    def __init__(self, side):\n        super().__init__(___, ___)\n\nshapes = [Circle(1), Rectangle(2, 3.5), Square(4)]\ntotal = 0\nfor s in shapes:\n    print(s)\n    total += s.area()\nprint(f"Total area: {total:.2f}")',
    tests: [{ expect: "Circle with area 3.14\nRectangle with area 7.00\nSquare with area 16.00\nTotal area: 26.14" }],
    post: "assert isinstance(Square(2), Rectangle), 'Square should inherit from Rectangle.'\ntry:\n    Shape().area()\n    raise AssertionError('Shape().area() should still raise NotImplementedError.')\nexcept NotImplementedError:\n    pass",
    hints: ["math.pi * self.r ** 2", "def area(self): in Rectangle", "class Square(Rectangle): … super().__init__(side, side)"],
    solution: 'import math\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError("Each shape must define area()")\n\n    def __str__(self):\n        return f"{type(self).__name__} with area {self.area():.2f}"\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n\n    def area(self):\n        return math.pi * self.r ** 2\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n\n    def area(self):\n        return self.w * self.h\n\nclass Square(Rectangle):\n    def __init__(self, side):\n        super().__init__(side, side)\n\nshapes = [Circle(1), Rectangle(2, 3.5), Square(4)]\ntotal = 0\nfor s in shapes:\n    print(s)\n    total += s.area()\nprint(f"Total area: {total:.2f}")',
  },
  parking: {
    id: "parking", kind: "make", title: "Parking lot",
    task: <>Build it with classes. <code>Vehicle(plate)</code> has <code>fee(hours)</code> that raises <code>NotImplementedError</code>; <code>Car</code> (Rs 20 per hour) and <code>Bike</code> (Rs 10 per hour) override it; <code>Truck(plate, axles)</code> pays 50 per hour + 25 per axle. Write <code>LotFullError</code>, and <code>ParkingLot(capacity)</code> with <code>park(vehicle)</code> (raises ValueError if that plate is already parked, then LotFullError if full) and <code>leave(plate, hours)</code> (returns the fee and frees the space; KeyError for an unknown plate). Main: a lot of 3; read <code>Command: </code> lines until <code>done</code> — <code>park car KA01</code>, <code>park truck MH12 3</code>, <code>leave KA01 2</code>, <code>status</code> — with the messages below; anything else → <code>Unknown command</code>; finally <code>Earned: Rs 315</code>.</>,
    minLines: 50,
    tests: [
      parkTest(["park car KA01", "park bike TN22", "park truck MH12 3", "park car DL05", "status", "leave KA01 2", "leave XX99 1", "park car DL05", "park bike TN22", "leave MH12 4", "fly away", "done"]),
      parkTest(["leave A1 1", "park bus Z1", "park truck T1 x", "status", "done"], { hidden: true, why: "Unknown vehicle types and a non-number axle count are Unknown command." }),
      parkTest(["park bike B1", "leave B1 3", "park bike B1", "leave B1 1", "done"], { hidden: true, why: "A vehicle that has left can park again." }),
    ],
    post: "assert Car('A').fee(3) == 60 and Bike('B').fee(3) == 30 and Truck('T', 2).fee(1) == 100, 'fee() is wrong for Car, Bike or Truck.'\nassert isinstance(Truck('T', 1), Vehicle), 'Truck should be a Vehicle.'\ntry:\n    Vehicle('V').fee(1)\n    raise AssertionError('Vehicle.fee should raise NotImplementedError.')\nexcept NotImplementedError:\n    pass\n_lot = ParkingLot(1)\n_lot.park(Car('P1'))\ntry:\n    _lot.park(Car('P2'))\n    raise AssertionError('A full lot should raise LotFullError.')\nexcept LotFullError:\n    pass\nassert _lot.leave('P1', 2) == 40, 'leave() returns the fee.'\ntry:\n    _lot.leave('P1', 1)\n    raise AssertionError('Leaving twice should raise KeyError.')\nexcept KeyError:\n    pass",
    requires: [{ node: "ClassDef", min: 6 }, { node: "Raise", min: 2 }],
    hints: ["ParkingLot keeps self.parked = {} (plate → vehicle) and self.capacity.", "park: if vehicle.plate in self.parked: raise ValueError; if len(self.parked) >= self.capacity: raise LotFullError", "Main: parts = line.split(); build Car(parts[2]) / Bike(...) / Truck(parts[2], int(parts[3])) only when the shape is right, else Unknown command."],
    solution: 'class LotFullError(Exception):\n    pass\n\nclass Vehicle:\n    def __init__(self, plate):\n        self.plate = plate\n\n    def fee(self, hours):\n        raise NotImplementedError("each vehicle sets its own fee")\n\nclass Car(Vehicle):\n    def fee(self, hours):\n        return 20 * hours\n\nclass Bike(Vehicle):\n    def fee(self, hours):\n        return 10 * hours\n\nclass Truck(Vehicle):\n    def __init__(self, plate, axles):\n        super().__init__(plate)\n        self.axles = axles\n\n    def fee(self, hours):\n        return 50 * hours + 25 * self.axles\n\nclass ParkingLot:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.parked = {}\n\n    def park(self, vehicle):\n        if vehicle.plate in self.parked:\n            raise ValueError(vehicle.plate)\n        if len(self.parked) >= self.capacity:\n            raise LotFullError()\n        self.parked[vehicle.plate] = vehicle\n\n    def leave(self, plate, hours):\n        vehicle = self.parked.pop(plate)\n        return vehicle.fee(hours)\n\nlot = ParkingLot(3)\nearned = 0\nwhile True:\n    parts = input("Command: ").split()\n    if parts == ["done"]:\n        break\n    if parts == ["status"]:\n        print(f"{len(lot.parked)}/{lot.capacity} spaces used")\n        continue\n    vehicle = None\n    if len(parts) == 3 and parts[0] == "park" and parts[1] == "car":\n        vehicle = Car(parts[2])\n    elif len(parts) == 3 and parts[0] == "park" and parts[1] == "bike":\n        vehicle = Bike(parts[2])\n    elif len(parts) == 4 and parts[0] == "park" and parts[1] == "truck" and parts[3].isdigit():\n        vehicle = Truck(parts[2], int(parts[3]))\n    if vehicle is not None:\n        try:\n            lot.park(vehicle)\n            print(f"Parked {parts[1]} {vehicle.plate}")\n        except ValueError:\n            print(f"{vehicle.plate} is already parked")\n        except LotFullError:\n            print("Lot full")\n    elif len(parts) == 3 and parts[0] == "leave" and parts[2].isdigit():\n        try:\n            paid = lot.leave(parts[1], int(parts[2]))\n            earned += paid\n            print(f"{parts[1]} paid Rs {paid}")\n        except KeyError:\n            print(f"No vehicle {parts[1]}")\n    else:\n        print("Unknown command")\nprint(f"Earned: Rs {earned}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "b = a for an object, then b.x = 5. What is a.x?", options: ["Unchanged", "5 — same object", "Error", "None"], answer: 1, explain: "Assignment never copies objects; both names point at one." },
  { q: "A child class defines its own __init__. When does the parent's __init__ run?", options: ["Always, automatically", "Only if the child calls super().__init__(…)", "Never", "After the child's"], answer: 1, explain: "Forgetting super().__init__ leaves the parent's attributes unset." },
  { q: "A list written in the class body (not in __init__)…", options: ["Belongs to each object", "Is shared by every object of the class", "Is copied per object", "Is an error"], answer: 1, explain: "Create per-object data in __init__ with self." },
];

export default function Unit10_C(props) {
  return <CrucibleShell {...props} unitId="Unit10_C" module="Module 10" title="The Crucible: Objects" spark={[EX.spark1, EX.spark2]} flame={[EX.marks, EX.savings]} forge={[EX.shapes]} temper={[EX.parking]} quiz={QUIZ} />;
}
