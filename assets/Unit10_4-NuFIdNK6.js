import{j as e}from"./index-B7nVsXSH.js";import{P as h,C as _,K as u,L as m}from"./Lesson-TE-z-zj8.js";const o=i=>{const r={car:60,bike:20,bus:200},t=[];let l=0;for(const a of i){if(t.push(`Vehicle: ${a}`),a==="done")break;const[s,c]=a.split(" "),d=r[s];l+=d,t.push(`${s.charAt(0).toUpperCase()+s.slice(1)} ${c}: ${s==="car"?4:s==="bike"?2:6} wheels, toll Rs ${d}`)}return t.push(`Total toll: Rs ${l}`),t.join(`
`)},n={inherit:{id:"inherit",kind:"type",title:"Children inherit everything",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"class Student(Person):"})," means a Student ",e.jsx("em",{children:"is a"})," Person: it gets Person's ",e.jsx("code",{children:"__init__"})," and methods for free, and can add its own."]}),show:`class Person:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def describe(self):
        return f"{self.name} <{self.email}>"

class Student(Person):
    def study(self):
        return f"{self.name} is studying"

s = Student("Priya", "priya@sret.in")
print(s.describe())
print(s.study())
print(isinstance(s, Person), isinstance(s, Student))`,minLines:17,tests:[{expect:`Priya <priya@sret.in>
Priya is studying
True True`}],requires:[{node:"ClassDef",min:2}],hints:["Student has no __init__ of its own, so Person's is used."],solution:`class Person:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def describe(self):
        return f"{self.name} <{self.email}>"

class Student(Person):
    def study(self):
        return f"{self.name} is studying"

s = Student("Priya", "priya@sret.in")
print(s.describe())
print(s.study())
print(isinstance(s, Person), isinstance(s, Student))`},superinit:{id:"superinit",kind:"write",title:"super().__init__ — add your own attributes",task:e.jsxs(e.Fragment,{children:["A Manager is an Employee with a team. Write ",e.jsx("code",{children:"Employee(name, salary)"})," and ",e.jsx("code",{children:"Manager(Employee)"})," whose ",e.jsx("code",{children:"__init__(self, name, salary, team)"})," first calls ",e.jsx("code",{children:"super().__init__(name, salary)"}),", then stores ",e.jsx("code",{children:"self.team"}),". Print ",e.jsx("code",{children:"Meena earns Rs 90000 and leads 6 people"})," for ",e.jsx("code",{children:'Manager("Meena", 90000, 6)'}),"."]}),tests:[{expect:"Meena earns Rs 90000 and leads 6 people"}],post:`_m = Manager('Z', 1, 2)
assert (_m.name, _m.salary, _m.team) == ('Z', 1, 2) and isinstance(_m, Employee)`,requires:[{call:"super",msg:"Call super().__init__(name, salary) in Manager's __init__."}],hints:[`class Manager(Employee):
    def __init__(self, name, salary, team):
        super().__init__(name, salary)
        self.team = team`],solution:`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

class Manager(Employee):
    def __init__(self, name, salary, team):
        super().__init__(name, salary)
        self.team = team

m = Manager("Meena", 90000, 6)
print(f"{m.name} earns Rs {m.salary} and leads {m.team} people")`},nosuper:{id:"nosuper",kind:"fix",title:"The parent never got to run",task:e.jsx(e.Fragment,{children:"Run it and read the coach."}),starter:`class Person:
    def __init__(self, name):
        self.name = name

class Teacher(Person):
    def __init__(self, name, subject):
        self.subject = subject

t = Teacher("Rao", "Physics")
print(t.name, "teaches", t.subject)`,tests:[{expect:"Rao teaches Physics"}],hints:["Teacher's own __init__ replaces Person's — so Person's never runs unless you call it: super().__init__(name)"],solution:`class Person:
    def __init__(self, name):
        self.name = name

class Teacher(Person):
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject

t = Teacher("Rao", "Physics")
print(t.name, "teaches", t.subject)`},override:{id:"override",kind:"write",title:"Override, and extend",task:e.jsxs(e.Fragment,{children:["Give ",e.jsx("code",{children:"Person"})," a method ",e.jsx("code",{children:"describe()"})," returning the name. In ",e.jsx("code",{children:"Student(Person)"}),", ",e.jsx("strong",{children:"override"})," it to return ",e.jsx("code",{children:"Priya (roll 22CS1042)"})," — reuse the parent's version with ",e.jsx("code",{children:"super().describe()"}),". Print both ",e.jsx("code",{children:'Person("Rao").describe()'})," and the student's."]}),tests:[{expect:`Rao
Priya (roll 22CS1042)`}],post:"assert Student('A', 'R1').describe() == 'A (roll R1)'",requires:[{call:"super"},{node:"ClassDef",min:2}],hints:['In Student: def describe(self): return f"{super().describe()} (roll {self.roll})"'],solution:`class Person:
    def __init__(self, name):
        self.name = name

    def describe(self):
        return self.name

class Student(Person):
    def __init__(self, name, roll):
        super().__init__(name)
        self.roll = roll

    def describe(self):
        return f"{super().describe()} (roll {self.roll})"

print(Person("Rao").describe())
print(Student("Priya", "22CS1042").describe())`},toll:{id:"toll",kind:"make",title:"Toll plaza",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"Vehicle(reg)"})," with ",e.jsx("code",{children:"wheels = 0"})," and ",e.jsx("code",{children:"toll()"})," returning 0, plus three children that override them: ",e.jsx("code",{children:"Car"})," (4 wheels, Rs 60), ",e.jsx("code",{children:"Bike"})," (2, Rs 20), ",e.jsx("code",{children:"Bus"})," (6, Rs 200). Each has a ",e.jsx("code",{children:"__str__"})," like ",e.jsx("code",{children:"Car TN01AB1234: 4 wheels, toll Rs 60"})," — write it ",e.jsx("strong",{children:"once"}),", in Vehicle, using ",e.jsx("code",{children:"type(self).__name__"})," for the class name. Read ",e.jsx("code",{children:"Vehicle: "})," lines like ",e.jsx("code",{children:"car TN01AB1234"})," until ",e.jsx("code",{children:"done"}),", print each vehicle and finally ",e.jsx("code",{children:"Total toll: Rs 280"}),"."]}),minLines:30,tests:[{inputs:["car TN01AB1234","bike TN09X77","bus KA05F1","car TN22Q9","done"],expect:o(["car TN01AB1234","bike TN09X77","bus KA05F1","car TN22Q9","done"]).replace("Total toll: Rs 340","Total toll: Rs 340")},{inputs:["done"],expect:o(["done"]),hidden:!0}],post:"assert Bus('X').toll() == 200 and Bike('Y').wheels == 2 and str(Car('Z')) == 'Car Z: 4 wheels, toll Rs 60'",requires:[{node:"ClassDef",min:4}],forbids:[{text:"def __str__",max:1,msg:"Write __str__ once, in Vehicle — the children inherit it."}],hints:["Class attribute: class Car(Vehicle): wheels = 4 — then def toll(self): return 60",'Vehicle.__str__: return f"{type(self).__name__} {self.reg}: {self.wheels} wheels, toll Rs {self.toll()}"','Pick the class with a dict: kinds = {"car": Car, "bike": Bike, "bus": Bus}; v = kinds[kind](reg)'],solution:`class Vehicle:
    wheels = 0

    def __init__(self, reg):
        self.reg = reg

    def toll(self):
        return 0

    def __str__(self):
        return f"{type(self).__name__} {self.reg}: {self.wheels} wheels, toll Rs {self.toll()}"

class Car(Vehicle):
    wheels = 4
    def toll(self):
        return 60

class Bike(Vehicle):
    wheels = 2
    def toll(self):
        return 20

class Bus(Vehicle):
    wheels = 6
    def toll(self):
        return 200

kinds = {"car": Car, "bike": Bike, "bus": Bus}
total = 0
line = input("Vehicle: ")
while line != "done":
    kind, reg = line.split()
    v = kinds[kind](reg)
    print(v)
    total += v.toll()
    line = input("Vehicle: ")
print(f"Total toll: Rs {total}")`}},g=n,f=[{q:"class Dog(Animal): means…",options:["Dog contains an Animal","Dog is a kind of Animal and inherits its attributes and methods","Animal inherits from Dog","Nothing"],answer:1,explain:"The child gets everything the parent has, and can add or override."},{q:"A child defines its own __init__. When does the parent's __init__ run?",options:["Automatically","Only if the child calls super().__init__(...)","Never","After the child's"],answer:1,explain:"That's why Teacher had no .name."},{q:"What is overriding?",options:["Deleting a parent method","A child defining a method with the same name, replacing the parent's version for that child","Calling super()","Renaming a class"],answer:1,explain:"And super().method() reuses the parent's version inside the new one."},{q:"isinstance(Student(...), Person) gives…",options:["False","True — a Student is a Person","Error","None"],answer:1,explain:"An object is an instance of its class and of every ancestor."}];function y(i){const r=[{label:"Inherit",kicker:"IS-A",title:"A child class gets everything its parent has",blocks:[e.jsx(h,{children:"Students, teachers and staff all have a name and an email. Write that once in a parent class; each child inherits it and adds what's special."}),n.inherit]},{label:"super()",kicker:"EXTEND THE PARENT",title:"Adding attributes with super().__init__",blocks:[e.jsx("div",{style:{maxWidth:680},children:e.jsx(_,{title:"the shape",code:`class Child(Parent):
    def __init__(self, parent_args, extra):
        super().__init__(parent_args)   # let the parent set its part
        self.extra = extra              # then add yours`})}),n.superinit,n.nosuper]},{label:"Override",kicker:"SAME NAME, NEW BEHAVIOUR",title:"Overriding methods",blocks:[n.override,e.jsxs(u,{children:["A child can ",e.jsx("strong",{children:"add"})," methods, ",e.jsx("strong",{children:"override"})," them (same name, new body), and ",e.jsx("strong",{children:"extend"})," them by calling ",e.jsx("code",{children:"super().method()"})," inside the override."]})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: toll plaza",blocks:[n.toll]}];return e.jsx(m,{...i,unitId:"Unit10_4",crumb:"MODULE 10 › UNIT 10.4",title:"Inheritance",sections:r,quiz:f,next:{title:"Unit 10.5 — Polymorphism & Abstraction",text:"One method name, many behaviours — and classes that refuse to be used unfinished."}})}export{g as EXERCISES,y as default};
