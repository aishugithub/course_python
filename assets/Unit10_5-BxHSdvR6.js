import{j as e}from"./index-B7nVsXSH.js";import{C as p,K as f,L as u}from"./Lesson-TE-z-zj8.js";const c=i=>{const n=[],d=[];let h=0;for(const r of i){if(n.push(`Staff: ${r}`),r==="done")break;const a=r.split(" ");let t;if(a[0]==="salaried")t=Number(a[2]);else{const l=Number(a[2]),o=Number(a[3]);t=o<=160?l*o:l*160+l*1.5*(o-160)}h+=t,d.push(`${a[1]}: Rs ${t.toFixed(2)}`)}return n.push(...d),n.push(`Total payroll: Rs ${h.toFixed(2)}`),n.join(`
`)},s={shapes:{id:"shapes",kind:"type",title:"One loop, many shapes",task:e.jsxs(e.Fragment,{children:["Each class has its own ",e.jsx("code",{children:"area()"}),". The loop doesn't know or care which kind of shape it has — it just calls ",e.jsx("code",{children:"s.area()"}),", and each object answers its own way. That's ",e.jsx("strong",{children:"polymorphism"})," (“many forms”)."]}),show:`class Circle:
    def __init__(self, r):
        self.r = r
    def area(self):
        return round(3.14159 * self.r ** 2, 2)

class Square:
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

shapes = [Circle(1), Square(3), Circle(2)]
for s in shapes:
    print(type(s).__name__, s.area())`,minLines:16,tests:[{expect:`Circle 3.14
Square 9
Circle 12.57`}],requires:[{node:"ClassDef",min:2}],hints:["No if/elif on the shape's kind anywhere — that's the point."],solution:`class Circle:
    def __init__(self, r):
        self.r = r
    def area(self):
        return round(3.14159 * self.r ** 2, 2)

class Square:
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

shapes = [Circle(1), Square(3), Circle(2)]
for s in shapes:
    print(type(s).__name__, s.area())`},builtin:{id:"builtin",kind:"type",title:"You've used polymorphism all along",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"len"})," and ",e.jsx("code",{children:"+"})," already behave differently depending on the type of value — the same idea, built in."]}),show:`print(len("Priya"), len([1, 2, 3]), len({"a": 1}))
print(2 + 3, "ab" + "cd", [1] + [2])
print(3 * 2, "ha" * 3)`,tests:[{expect:`5 3 1
5 abcd [1, 2]
6 hahaha`}],hints:["Each type decides what len, + and * mean for it."],solution:`print(len("Priya"), len([1, 2, 3]), len({"a": 1}))
print(2 + 3, "ab" + "cd", [1] + [2])
print(3 * 2, "ha" * 3)`},payments:{id:"payments",kind:"write",title:"Three ways to pay",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"UPI(upi_id)"}),", ",e.jsx("code",{children:"Card(last4)"})," and ",e.jsx("code",{children:"Cash()"}),", each with a ",e.jsx("code",{children:"pay(amount)"})," method that ",e.jsx("strong",{children:"returns"})," a string: ",e.jsx("code",{children:"Paid Rs 250 via UPI priya@okaxis"}),", ",e.jsx("code",{children:"Paid Rs 900 by card ending 4421"}),", ",e.jsx("code",{children:"Paid Rs 60 in cash"}),". Then loop over ",e.jsx("code",{children:'[(UPI("priya@okaxis"), 250), (Card("4421"), 900), (Cash(), 60)]'})," and print each result."]}),minLines:18,tests:[{expect:`Paid Rs 250 via UPI priya@okaxis
Paid Rs 900 by card ending 4421
Paid Rs 60 in cash`}],post:`assert Cash().pay(5) == 'Paid Rs 5 in cash'
assert Card('1111').pay(1) == 'Paid Rs 1 by card ending 1111'`,requires:[{node:"ClassDef",min:3}],hints:["for method, amount in payments: print(method.pay(amount)) — unpacking the tuples (7.4)."],solution:`class UPI:
    def __init__(self, upi_id):
        self.upi_id = upi_id
    def pay(self, amount):
        return f"Paid Rs {amount} via UPI {self.upi_id}"

class Card:
    def __init__(self, last4):
        self.last4 = last4
    def pay(self, amount):
        return f"Paid Rs {amount} by card ending {self.last4}"

class Cash:
    def pay(self, amount):
        return f"Paid Rs {amount} in cash"

payments = [(UPI("priya@okaxis"), 250), (Card("4421"), 900), (Cash(), 60)]
for method, amount in payments:
    print(method.pay(amount))`},abstract:{id:"abstract",kind:"fix",title:"The promise that wasn't kept",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"Shape"})," is ",e.jsx("strong",{children:"abstract"}),": it promises every shape has an ",e.jsx("code",{children:"area()"}),", but refuses to guess one (it raises ",e.jsx("code",{children:"NotImplementedError"}),"). Run it and read the coach. Give ",e.jsx("code",{children:"Triangle"})," its own ",e.jsx("code",{children:"area()"})," (½ × base × height)."]}),starter:`class Shape:
    def area(self):
        raise NotImplementedError("every shape must define area()")

class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

for s in [Square(4), Triangle(6, 5)]:
    print(s.area())`,tests:[{expect:`16
15.0`}],hints:["def area(self): return 0.5 * self.base * self.height — inside Triangle."],solution:`class Shape:
    def area(self):
        raise NotImplementedError("every shape must define area()")

class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height

for s in [Square(4), Triangle(6, 5)]:
    print(s.area())`},payroll:{id:"payroll",kind:"make",title:"Payroll",task:e.jsxs(e.Fragment,{children:["Write an abstract ",e.jsx("code",{children:"Employee(name)"})," whose ",e.jsx("code",{children:"pay()"})," raises ",e.jsx("code",{children:"NotImplementedError"}),", and two children: ",e.jsx("code",{children:"Salaried(name, monthly)"})," and ",e.jsx("code",{children:"Hourly(name, rate, hours)"})," — hourly staff get 1.5× the rate for every hour above 160. Read ",e.jsx("code",{children:"Staff: "})," lines like ",e.jsx("code",{children:"salaried Priya 50000"})," or ",e.jsx("code",{children:"hourly Arun 300 170"})," until ",e.jsx("code",{children:"done"}),". Print each as ",e.jsx("code",{children:"Arun: Rs 52500.00"})," and finally ",e.jsx("code",{children:"Total payroll: Rs 102500.00"}),". The printing loop must not check which kind of employee it has."]}),minLines:28,tests:[{inputs:["salaried Priya 50000","hourly Arun 300 170","done"],expect:c(["salaried Priya 50000","hourly Arun 300 170","done"])},{inputs:["hourly Kavya 250 100","done"],expect:c(["hourly Kavya 250 100","done"]),hidden:!0}],post:`assert Hourly('h', 100, 170).pay() == 17500
try:
    Employee('x').pay()
    raise AssertionError('Employee.pay() should raise NotImplementedError')
except NotImplementedError:
    pass`,requires:[{node:"ClassDef",min:3},{node:"Raise"}],hints:["Build the right object when reading the line (an if is fine there), store all of them in one list.",'The print loop: for e in staff: print(f"{e.name}: Rs {e.pay():.2f}")',"Overtime: if hours <= 160: rate * hours, else rate * 160 + rate * 1.5 * (hours - 160)"],solution:`class Employee:
    def __init__(self, name):
        self.name = name
    def pay(self):
        raise NotImplementedError("pay() must be defined")

class Salaried(Employee):
    def __init__(self, name, monthly):
        super().__init__(name)
        self.monthly = monthly
    def pay(self):
        return self.monthly

class Hourly(Employee):
    def __init__(self, name, rate, hours):
        super().__init__(name)
        self.rate = rate
        self.hours = hours
    def pay(self):
        if self.hours <= 160:
            return self.rate * self.hours
        return self.rate * 160 + self.rate * 1.5 * (self.hours - 160)

staff = []
line = input("Staff: ")
while line != "done":
    parts = line.split()
    if parts[0] == "salaried":
        staff.append(Salaried(parts[1], float(parts[2])))
    else:
        staff.append(Hourly(parts[1], float(parts[2]), float(parts[3])))
    line = input("Staff: ")
total = 0
for e in staff:
    print(f"{e.name}: Rs {e.pay():.2f}")
    total += e.pay()
print(f"Total payroll: Rs {total:.2f}")`}},x=s,m=[{q:"What is polymorphism?",options:["A class with many attributes","The same method call doing different things depending on the object's type","Copying objects","A kind of loop"],answer:1,explain:"s.area() runs Circle.area or Square.area depending on s."},{q:"Why is a loop calling e.pay() better than if/elif on the employee type?",options:["Shorter only","Adding a new kind of employee needs no change to the loop","Faster","Required"],answer:1,explain:"New classes plug in without touching existing code."},{q:"What is an abstract class here?",options:["A class with no methods","A parent that defines what children must provide, raising NotImplementedError instead of guessing","A hidden class","A finished class"],answer:1,explain:"Python's abc module can enforce this more strictly; NotImplementedError is the plain-Python version."},{q:`"ha" * 3 and 3 * 2 both use *. That's…`,options:["A bug","Built-in polymorphism: each type defines what * means","Inheritance","Encapsulation"],answer:1,explain:"Operators are polymorphic too."}];function b(i){const n=[{label:"Many Forms",kicker:"ONE CALL, MANY BEHAVIOURS",title:"Polymorphism",blocks:[e.jsxs("div",{className:"fh-two",style:{maxWidth:900},children:[e.jsx(p,{title:"without polymorphism",code:`for s in shapes:
    if s.kind == "circle":
        a = 3.14 * s.r ** 2
    elif s.kind == "square":
        a = s.side ** 2
    # a new shape? edit this loop again…`}),e.jsx(p,{title:"with polymorphism",code:`for s in shapes:
    a = s.area()   # each shape knows its own formula`})]}),s.shapes,s.builtin]},{label:"Interchangeable",kicker:"SAME INTERFACE",title:"Objects you can swap",blocks:[s.payments,e.jsx(f,{children:"If several classes offer the same method name with the same meaning, code that uses them never needs to know which one it has."})]},{label:"Abstraction",kicker:"PROMISE, DON'T GUESS",title:"Abstract parents",blocks:[s.abstract]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: payroll",blocks:[s.payroll]}];return e.jsx(u,{...i,unitId:"Unit10_5",crumb:"MODULE 10 › UNIT 10.5",title:"Polymorphism & Abstraction",sections:n,quiz:m,next:{title:"Unit 10.6 — User-Defined Exceptions",text:"Raise InvalidMarkError, not a mystery — exceptions as classes."}})}export{x as EXERCISES,b as default};
