import{j as e}from"./index-cCwWvTed.js";import{C as u}from"./Crucible-DxW30wRz.js";import"./Lesson-BzQti5aW.js";function _(i){const a=[],t=new Map;let c=0;const p=(l,n)=>l.t==="car"?20*n:l.t==="bike"?10*n:50*n+25*l.axles;for(const l of i){a.push(`Command: ${l}`);const n=l.split(/\s+/).filter(Boolean);if(n.length===1&&n[0]==="done")break;if(n.length===1&&n[0]==="status"){a.push(`${t.size}/3 spaces used`);continue}const f=n[0]==="park"&&(n.length===3&&(n[1]==="car"||n[1]==="bike")||n.length===4&&n[1]==="truck"&&/^\d+$/.test(n[3])),h=n[0]==="leave"&&n.length===3&&/^\d+$/.test(n[2]);if(f){const s=n[2];t.has(s)?a.push(`${s} is already parked`):t.size>=3?a.push("Lot full"):(t.set(s,{t:n[1],axles:+(n[3]||0)}),a.push(`Parked ${n[1]} ${s}`))}else if(h){const s=n[1];if(!t.has(s))a.push(`No vehicle ${s}`);else{const d=p(t.get(s),+n[2]);t.delete(s),c+=d,a.push(`${s} paid Rs ${d}`)}}else a.push("Unknown command")}return a.push(`Earned: Rs ${c}`),a.join(`
`)}const o=(i,a={})=>({inputs:i,expect:_(i),...a}),r={spark1:{id:"spark1",kind:"predict",title:"Objects and name tags",code:`class Box:
    def __init__(self, label, items=0):
        self.label = label
        self.items = items

    def add(self, n):
        self.items += n

    def __str__(self):
        return f"{self.label}[{self.items}]"

a = Box("A")
b = Box("B", 3)
c = a
c.add(2)
a.add(1)
boxes = [a, b, c]
print(a, b, c)
print(len(boxes), a is c, a == b)
b = Box("B", 3)
print(b.items + boxes[1].items)`,task:e.jsx(e.Fragment,{children:"How many Box objects exist by the end — and which names point at which?"}),hints:["c = a makes no new box: c and a are two names for the same object.","print uses __str__ for each object.",'The last b = Box("B", 3) is a brand-new box; boxes[1] still points at the old one.'],solution:`A[3] B[3] A[3]
3 True False
6`},spark2:{id:"spark2",kind:"predict",title:"Inheritance and super()",code:`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

    def intro(self):
        return f"{self.name} says {self.speak()}"

class Dog(Animal):
    def speak(self):
        return "Woof"

class Puppy(Dog):
    def __init__(self, name, age):
        super().__init__(name)
        self.age = age

    def speak(self):
        return super().speak() + "!" * self.age

for pet in [Animal("Cat"), Dog("Rex"), Puppy("Bit", 2)]:
    print(pet.intro())
print(isinstance(Puppy("x", 1), Animal))`,task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"intro"})," is written once, in Animal. Which ",e.jsx("code",{children:"speak"})," does it call for each pet?"]}),hints:["self.speak() calls the speak of the object's own class — the most specific one.",`Puppy's speak takes Dog's "Woof" and adds age exclamation marks.`,"A Puppy is a Dog, and a Dog is an Animal."],solution:`Cat says ...
Rex says Woof
Bit says Woof!!
True`},marks:{id:"marks",kind:"fix",title:"Everyone shares one list",task:e.jsxs(e.Fragment,{children:["Asha should average 85.0 and Ben 40.0 — but both get 70.0. A list written directly in the class body belongs to the ",e.jsx("em",{children:"class"}),", shared by every student. Give each student their own list."]}),starter:`class Student:
    marks = []

    def __init__(self, name):
        self.name = name

    def add_mark(self, m):
        self.marks.append(m)

    def average(self):
        return sum(self.marks) / len(self.marks)

asha = Student("Asha")
ben = Student("Ben")
asha.add_mark(90)
asha.add_mark(80)
ben.add_mark(40)
print(f"{asha.name}: {asha.average():.1f}")
print(f"{ben.name}: {ben.average():.1f}")`,tests:[{expect:`Asha: 85.0
Ben: 40.0`}],post:`_s = Student('x')
assert _s.marks == [], 'A new Student must start with an empty list of marks.'`,hints:["Where should a value that belongs to ONE object be created?","In __init__: self.marks = [] — and delete the class-level line."],solution:`class Student:
    def __init__(self, name):
        self.name = name
        self.marks = []

    def add_mark(self, m):
        self.marks.append(m)

    def average(self):
        return sum(self.marks) / len(self.marks)

asha = Student("Asha")
ben = Student("Ben")
asha.add_mark(90)
asha.add_mark(80)
ben.add_mark(40)
print(f"{asha.name}: {asha.average():.1f}")
print(f"{ben.name}: {ben.average():.1f}")`},savings:{id:"savings",kind:"fix",title:"The savings account that won't open",task:e.jsxs(e.Fragment,{children:["A Savings account is an Account that must keep a minimum balance. Run it: it crashes the moment it touches ",e.jsx("code",{children:"self.balance"}),". Read the coach, fix it, and check the three withdrawals come out as shown."]}),starter:`class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount

class Savings(Account):
    def __init__(self, owner, balance=0, minimum=1000):
        self.minimum = minimum

    def withdraw(self, amount):
        if self.balance - amount < self.minimum:
            raise ValueError("Below minimum balance")
        self.balance -= amount

s = Savings("Asha", 5000)
for amount in [3000, 1500, 500]:
    try:
        s.withdraw(amount)
        print("Withdrew", amount, "- left", s.balance)
    except ValueError as e:
        print("Refused", amount, "-", e)`,tests:[{expect:`Withdrew 3000 - left 2000
Refused 1500 - Below minimum balance
Withdrew 500 - left 1500`}],post:`_x = Savings('x', 100, 50)
assert _x.owner == 'x' and _x.balance == 100, 'Savings must set owner and balance through the parent.'
try:
    _x.withdraw(60)
    raise AssertionError('Going below the minimum must raise ValueError.')
except ValueError:
    pass`,hints:["Savings.__init__ replaces Account.__init__ — so owner and balance are never set.","First line of Savings.__init__: super().__init__(owner, balance)"],solution:`class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount

class Savings(Account):
    def __init__(self, owner, balance=0, minimum=1000):
        super().__init__(owner, balance)
        self.minimum = minimum

    def withdraw(self, amount):
        if self.balance - amount < self.minimum:
            raise ValueError("Below minimum balance")
        self.balance -= amount

s = Savings("Asha", 5000)
for amount in [3000, 1500, 500]:
    try:
        s.withdraw(amount)
        print("Withdrew", amount, "- left", s.balance)
    except ValueError as e:
        print("Refused", amount, "-", e)`},shapes:{id:"shapes",kind:"complete",title:"Shapes that know their area",task:e.jsxs(e.Fragment,{children:["Shape is an abstract parent: its ",e.jsx("code",{children:"area"})," refuses to work, so every child must override it. Fill the blanks — a Square is a Rectangle with equal sides, so it only needs to call the parent's ",e.jsx("code",{children:"__init__"}),"."]}),starter:`import math

class Shape:
    def area(self):
        raise NotImplementedError("Each shape must define area()")

    def __str__(self):
        return f"{type(self).__name__} with area {self.area():.2f}"

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return ___

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def ___(self):
        return self.w * self.h

class Square(___):
    def __init__(self, side):
        super().__init__(___, ___)

shapes = [Circle(1), Rectangle(2, 3.5), Square(4)]
total = 0
for s in shapes:
    print(s)
    total += s.area()
print(f"Total area: {total:.2f}")`,tests:[{expect:`Circle with area 3.14
Rectangle with area 7.00
Square with area 16.00
Total area: 26.14`}],post:`assert isinstance(Square(2), Rectangle), 'Square should inherit from Rectangle.'
try:
    Shape().area()
    raise AssertionError('Shape().area() should still raise NotImplementedError.')
except NotImplementedError:
    pass`,hints:["math.pi * self.r ** 2","def area(self): in Rectangle","class Square(Rectangle): … super().__init__(side, side)"],solution:`import math

class Shape:
    def area(self):
        raise NotImplementedError("Each shape must define area()")

    def __str__(self):
        return f"{type(self).__name__} with area {self.area():.2f}"

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return math.pi * self.r ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)

shapes = [Circle(1), Rectangle(2, 3.5), Square(4)]
total = 0
for s in shapes:
    print(s)
    total += s.area()
print(f"Total area: {total:.2f}")`},parking:{id:"parking",kind:"make",title:"Parking lot",task:e.jsxs(e.Fragment,{children:["Build it with classes. ",e.jsx("code",{children:"Vehicle(plate)"})," has ",e.jsx("code",{children:"fee(hours)"})," that raises ",e.jsx("code",{children:"NotImplementedError"}),"; ",e.jsx("code",{children:"Car"})," (Rs 20 per hour) and ",e.jsx("code",{children:"Bike"})," (Rs 10 per hour) override it; ",e.jsx("code",{children:"Truck(plate, axles)"})," pays 50 per hour + 25 per axle. Write ",e.jsx("code",{children:"LotFullError"}),", and ",e.jsx("code",{children:"ParkingLot(capacity)"})," with ",e.jsx("code",{children:"park(vehicle)"})," (raises ValueError if that plate is already parked, then LotFullError if full) and ",e.jsx("code",{children:"leave(plate, hours)"})," (returns the fee and frees the space; KeyError for an unknown plate). Main: a lot of 3; read ",e.jsx("code",{children:"Command: "})," lines until ",e.jsx("code",{children:"done"})," — ",e.jsx("code",{children:"park car KA01"}),", ",e.jsx("code",{children:"park truck MH12 3"}),", ",e.jsx("code",{children:"leave KA01 2"}),", ",e.jsx("code",{children:"status"})," — with the messages below; anything else → ",e.jsx("code",{children:"Unknown command"}),"; finally ",e.jsx("code",{children:"Earned: Rs 315"}),"."]}),minLines:50,tests:[o(["park car KA01","park bike TN22","park truck MH12 3","park car DL05","status","leave KA01 2","leave XX99 1","park car DL05","park bike TN22","leave MH12 4","fly away","done"]),o(["leave A1 1","park bus Z1","park truck T1 x","status","done"],{hidden:!0,why:"Unknown vehicle types and a non-number axle count are Unknown command."}),o(["park bike B1","leave B1 3","park bike B1","leave B1 1","done"],{hidden:!0,why:"A vehicle that has left can park again."})],post:`assert Car('A').fee(3) == 60 and Bike('B').fee(3) == 30 and Truck('T', 2).fee(1) == 100, 'fee() is wrong for Car, Bike or Truck.'
assert isinstance(Truck('T', 1), Vehicle), 'Truck should be a Vehicle.'
try:
    Vehicle('V').fee(1)
    raise AssertionError('Vehicle.fee should raise NotImplementedError.')
except NotImplementedError:
    pass
_lot = ParkingLot(1)
_lot.park(Car('P1'))
try:
    _lot.park(Car('P2'))
    raise AssertionError('A full lot should raise LotFullError.')
except LotFullError:
    pass
assert _lot.leave('P1', 2) == 40, 'leave() returns the fee.'
try:
    _lot.leave('P1', 1)
    raise AssertionError('Leaving twice should raise KeyError.')
except KeyError:
    pass`,requires:[{node:"ClassDef",min:6},{node:"Raise",min:2}],hints:["ParkingLot keeps self.parked = {} (plate → vehicle) and self.capacity.","park: if vehicle.plate in self.parked: raise ValueError; if len(self.parked) >= self.capacity: raise LotFullError","Main: parts = line.split(); build Car(parts[2]) / Bike(...) / Truck(parts[2], int(parts[3])) only when the shape is right, else Unknown command."],solution:`class LotFullError(Exception):
    pass

class Vehicle:
    def __init__(self, plate):
        self.plate = plate

    def fee(self, hours):
        raise NotImplementedError("each vehicle sets its own fee")

class Car(Vehicle):
    def fee(self, hours):
        return 20 * hours

class Bike(Vehicle):
    def fee(self, hours):
        return 10 * hours

class Truck(Vehicle):
    def __init__(self, plate, axles):
        super().__init__(plate)
        self.axles = axles

    def fee(self, hours):
        return 50 * hours + 25 * self.axles

class ParkingLot:
    def __init__(self, capacity):
        self.capacity = capacity
        self.parked = {}

    def park(self, vehicle):
        if vehicle.plate in self.parked:
            raise ValueError(vehicle.plate)
        if len(self.parked) >= self.capacity:
            raise LotFullError()
        self.parked[vehicle.plate] = vehicle

    def leave(self, plate, hours):
        vehicle = self.parked.pop(plate)
        return vehicle.fee(hours)

lot = ParkingLot(3)
earned = 0
while True:
    parts = input("Command: ").split()
    if parts == ["done"]:
        break
    if parts == ["status"]:
        print(f"{len(lot.parked)}/{lot.capacity} spaces used")
        continue
    vehicle = None
    if len(parts) == 3 and parts[0] == "park" and parts[1] == "car":
        vehicle = Car(parts[2])
    elif len(parts) == 3 and parts[0] == "park" and parts[1] == "bike":
        vehicle = Bike(parts[2])
    elif len(parts) == 4 and parts[0] == "park" and parts[1] == "truck" and parts[3].isdigit():
        vehicle = Truck(parts[2], int(parts[3]))
    if vehicle is not None:
        try:
            lot.park(vehicle)
            print(f"Parked {parts[1]} {vehicle.plate}")
        except ValueError:
            print(f"{vehicle.plate} is already parked")
        except LotFullError:
            print("Lot full")
    elif len(parts) == 3 and parts[0] == "leave" and parts[2].isdigit():
        try:
            paid = lot.leave(parts[1], int(parts[2]))
            earned += paid
            print(f"{parts[1]} paid Rs {paid}")
        except KeyError:
            print(f"No vehicle {parts[1]}")
    else:
        print("Unknown command")
print(f"Earned: Rs {earned}")`}},x=r,m=[{q:"b = a for an object, then b.x = 5. What is a.x?",options:["Unchanged","5 — same object","Error","None"],answer:1,explain:"Assignment never copies objects; both names point at one."},{q:"A child class defines its own __init__. When does the parent's __init__ run?",options:["Always, automatically","Only if the child calls super().__init__(…)","Never","After the child's"],answer:1,explain:"Forgetting super().__init__ leaves the parent's attributes unset."},{q:"A list written in the class body (not in __init__)…",options:["Belongs to each object","Is shared by every object of the class","Is copied per object","Is an error"],answer:1,explain:"Create per-object data in __init__ with self."}];function g(i){return e.jsx(u,{...i,unitId:"Unit10_C",module:"Module 10",title:"The Crucible: Objects",spark:[r.spark1,r.spark2],flame:[r.marks,r.savings],forge:[r.shapes],temper:[r.parking],quiz:m})}export{x as EXERCISES,g as default};
