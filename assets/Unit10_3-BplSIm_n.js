import{j as e}from"./index-CD7nmDt6.js";import{P as u,N as m,T as f,C as l,K as p,L as _}from"./Lesson-MmSVdMEX.js";const d=o=>{const s=[],i=[];for(const t of o){if(i.push(`Add: ${t}`),t==="done")break;const[a,r,h]=t.split(" ");s.push([a,Number(r),Number(h)])}s.forEach(([t,a,r])=>i.push(`${t} x${r} = Rs ${(a*r).toFixed(2)}`));const c=s.reduce((t,[,a,r])=>t+a*r,0);return i.push(`Cart: ${s.length} items, Rs ${c.toFixed(2)}`),i.join(`
`)},n={method:{id:"method",kind:"type",title:"An object that can do things",task:e.jsxs(e.Fragment,{children:["A method is a function inside a class. It gets the object as ",e.jsx("code",{children:"self"}),", so it can use the object's own data. Call it with a dot: ",e.jsx("code",{children:"s.grade()"}),"."]}),show:`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def grade(self):
        if self.mark >= 75:
            return "B or better"
        return "below B"

    def passed(self):
        return self.mark >= 40

s = Student("Priya", 87)
print(s.grade(), s.passed())
t = Student("Arun", 35)
print(t.grade(), t.passed())`,minLines:18,tests:[{expect:`B or better True
below B False`}],requires:[{node:"FunctionDef",min:3}],hints:["self.mark is THIS object's mark — Priya's in the first call, Arun's in the second."],solution:`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def grade(self):
        if self.mark >= 75:
            return "B or better"
        return "below B"

    def passed(self):
        return self.mark >= 40

s = Student("Priya", 87)
print(s.grade(), s.passed())
t = Student("Arun", 35)
print(t.grade(), t.passed())`},str:{id:"str",kind:"fix",title:"Printing an object",task:e.jsxs(e.Fragment,{children:["Run it: ",e.jsx("code",{children:"print(s)"})," shows something like ",e.jsx("code",{children:"<__main__.Student object at 0x…>"}),". Add a ",e.jsx("code",{children:"__str__"})," method that returns ",e.jsx("code",{children:"Priya (87)"})," — print uses it automatically."]}),starter:`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

s = Student("Priya", 87)
print(s)`,tests:[{expect:"Priya (87)"}],post:"assert str(Student('X', 5)) == 'X (5)'",hints:[`def __str__(self):
    return f"{self.name} ({self.mark})"`],solution:`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def __str__(self):
        return f"{self.name} ({self.mark})"

s = Student("Priya", 87)
print(s)`},brackets:{id:"brackets",kind:"fix",title:"A method without brackets",task:e.jsxs(e.Fragment,{children:["This should print ",e.jsx("code",{children:"Area: 12"}),". No error — but run it and look. Fix the call."]}),starter:`class Rectangle:
    def __init__(self, l, w):
        self.l = l
        self.w = w

    def area(self):
        return self.l * self.w

r = Rectangle(4, 3)
print("Area:", r.area)`,tests:[{expect:"Area: 12"}],hints:["r.area is the method itself; r.area() calls it (same as functions in Unit 8.1)."],solution:`class Rectangle:
    def __init__(self, l, w):
        self.l = l
        self.w = w

    def area(self):
        return self.l * self.w

r = Rectangle(4, 3)
print("Area:", r.area())`},guard:{id:"guard",kind:"write",title:"Guard the data",task:e.jsxs(e.Fragment,{children:["Anyone can write ",e.jsx("code",{children:"s.mark = 500"}),". ",e.jsx("strong",{children:"Encapsulation"})," means the object protects its own data: store the mark as ",e.jsx("code",{children:"self._mark"})," (the underscore says “internal — don't touch directly”), and change it only through ",e.jsx("code",{children:"set_mark(mark)"}),", which raises ",e.jsx("code",{children:'ValueError("mark must be 0-100")'})," for bad values, and read it with ",e.jsx("code",{children:"get_mark()"}),". The test calls ",e.jsx("code",{children:"set_mark(150)"})," inside try and expects ",e.jsx("code",{children:"Rejected: mark must be 0-100"}),", then ",e.jsx("code",{children:"Mark: 91"}),"."]}),minLines:16,tests:[{expect:`Rejected: mark must be 0-100
Mark: 91`}],post:`_s = Student('Z', 50)
try:
    _s.set_mark(-1)
    raise AssertionError('set_mark(-1) should raise ValueError')
except ValueError:
    pass
_s.set_mark(0)
assert _s.get_mark() == 0`,requires:[{node:"Raise"},{text:"self._mark"}],hints:["__init__ can call self.set_mark(mark) so even the first value is checked.",'Main: s = Student("Priya", 87); try: s.set_mark(150) except ValueError as e: print(f"Rejected: {e}"); s.set_mark(91); print("Mark:", s.get_mark())'],solution:`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.set_mark(mark)

    def set_mark(self, mark):
        if not 0 <= mark <= 100:
            raise ValueError("mark must be 0-100")
        self._mark = mark

    def get_mark(self):
        return self._mark

s = Student("Priya", 87)
try:
    s.set_mark(150)
except ValueError as e:
    print(f"Rejected: {e}")
s.set_mark(91)
print("Mark:", s.get_mark())`},bank:{id:"bank",kind:"write",title:"Bank account",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"BankAccount(owner, balance=0)"})," with ",e.jsx("code",{children:"deposit(amount)"})," and ",e.jsx("code",{children:"withdraw(amount)"}),"; withdraw raises ",e.jsx("code",{children:'ValueError("insufficient funds")'})," if the amount is more than the balance; both refuse amounts ≤ 0 with ",e.jsx("code",{children:'ValueError("amount must be positive")'}),". Add ",e.jsx("code",{children:"__str__"})," returning ",e.jsx("code",{children:"Priya: Rs 700"}),". The main program: deposit 500, withdraw 300, print it; then try to withdraw 5000 and print ",e.jsx("code",{children:"Error: insufficient funds"}),"."]}),minLines:22,tests:[{expect:`Priya: Rs 200
Error: insufficient funds`}],post:`_a = BankAccount('Z', 100)
_a.deposit(50)
assert _a.balance == 150
for bad in (0, -5):
    try:
        _a.deposit(bad)
        raise AssertionError('deposit should refuse amounts <= 0')
    except ValueError:
        pass
try:
    _a.withdraw(1000)
    raise AssertionError('withdraw should refuse more than the balance')
except ValueError:
    pass
assert str(_a) == 'Z: Rs 150'`,requires:[{node:"ClassDef"},{node:"Raise",min:2}],hints:['The test program: a = BankAccount("Priya"); a.deposit(500); a.withdraw(300); print(a) — then a try around a.withdraw(5000).',"Check amount <= 0 first, then the balance."],solution:`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        if amount > self.balance:
            raise ValueError("insufficient funds")
        self.balance -= amount

    def __str__(self):
        return f"{self.owner}: Rs {self.balance}"

a = BankAccount("Priya")
a.deposit(500)
a.withdraw(300)
print(a)
try:
    a.withdraw(5000)
except ValueError as e:
    print(f"Error: {e}")`},cart:{id:"cart",kind:"make",title:"Shopping cart",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"Cart"})," with a list of items, ",e.jsx("code",{children:"add(name, price, qty=1)"})," (each item stored as a tuple), ",e.jsx("code",{children:"total()"})," and ",e.jsx("code",{children:"count()"}),". Keep asking ",e.jsx("code",{children:"Add: "})," (like ",e.jsx("code",{children:"pen 10 3"}),") until ",e.jsx("code",{children:"done"}),". Then print each item as ",e.jsx("code",{children:"pen x3 = Rs 30.00"})," and finally ",e.jsx("code",{children:"Cart: 2 items, Rs 75.00"}),". (Mini-project Track B builds on exactly this.)"]}),minLines:24,tests:[{inputs:["pen 10 3","notebook 45 1","done"],expect:d(["pen 10 3","notebook 45 1","done"])},{inputs:["done"],expect:d(["done"]),hidden:!0},{inputs:["chai 12.5 4","done"],expect:d(["chai 12.5 4","done"]),hidden:!0}],post:`_c = Cart()
_c.add('x', 2.5)
_c.add('y', 1, 4)
assert _c.count() == 2 and _c.total() == 6.5, 'check add() default qty, count() and total()'`,requires:[{node:"ClassDef"},{node:"FunctionDef",min:4}],hints:["self.items = [] in __init__; add appends (name, price, qty).","total(): sum price * qty over self.items — unpack each tuple.","Main: name, price, qty = line.split(); cart.add(name, float(price), int(qty))"],solution:`class Cart:
    def __init__(self):
        self.items = []

    def add(self, name, price, qty=1):
        self.items.append((name, price, qty))

    def total(self):
        t = 0
        for name, price, qty in self.items:
            t += price * qty
        return t

    def count(self):
        return len(self.items)

cart = Cart()
line = input("Add: ")
while line != "done":
    name, price, qty = line.split()
    cart.add(name, float(price), int(qty))
    line = input("Add: ")
for name, price, qty in cart.items:
    print(f"{name} x{qty} = Rs {price * qty:.2f}")
print(f"Cart: {cart.count()} items, Rs {cart.total():.2f}")`}},j=n,k=[{q:"Inside a method, what is self?",options:["The class","The object the method was called on","The first argument you typed","A global variable"],answer:1,explain:"s.grade() runs grade with self = s."},{q:"What does __str__ control?",options:["How an object is compared","What print(obj) and str(obj) show","Object creation","Deletion"],answer:1,explain:"Return a readable string; print calls it for you."},{q:"What does print(r.area) (no brackets) show?",options:["The area","Something like <bound method Rectangle.area …>","Error","None"],answer:1,explain:"Without () you refer to the method instead of calling it."},{q:"What does the underscore in self._mark mean?",options:["Python makes it impossible to access","A convention: internal — use the methods instead","It's a constant","Nothing at all"],answer:1,explain:"Python trusts programmers; the underscore is a clear “hands off” sign."},{q:"Why validate inside set_mark rather than in the main program?",options:["Shorter","Every change goes through one checkpoint, so bad data can't get in anywhere","Faster","Required"],answer:1,explain:"That's encapsulation: the object protects its own data."}];function w(o){const s=[{label:"Methods",kicker:"OBJECTS THAT DO THINGS",title:"Methods: functions that belong to an object",blocks:[e.jsxs(u,{children:["So far objects only ",e.jsx("em",{children:"held"})," data. Methods let them ",e.jsx("em",{children:"do"})," things with it — ",e.jsx("code",{children:"s.grade()"})," instead of ",e.jsx("code",{children:"grade(s.mark)"}),"."]}),n.method]},{label:"__str__",kicker:"SPECIAL METHODS",title:"Describe yourself",blocks:[n.str,n.brackets,e.jsxs(m,{color:f.blue,icon:"✨",children:["Methods with double underscores (",e.jsx("code",{children:"__init__"}),", ",e.jsx("code",{children:"__str__"}),") are special: Python calls them for you at the right moment."]})]},{label:"Encapsulation",kicker:"GUARD THE DATA",title:"Let the object protect its own data",blocks:[e.jsxs("div",{className:"fh-two",style:{maxWidth:880},children:[e.jsx(l,{title:"unguarded",code:"s.mark = 500      # nothing stops this"}),e.jsx(l,{title:"guarded",code:"s.set_mark(500)   # ValueError: mark must be 0-100"})]}),n.guard,n.bank,e.jsx(p,{children:"Encapsulation: keep the data and the rules about it together in the class, and change the data only through methods that enforce the rules."})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: shopping cart",blocks:[n.cart]}];return e.jsx(_,{...o,unitId:"Unit10_3",crumb:"MODULE 10 › UNIT 10.3",title:"Methods & Encapsulation",sections:s,quiz:k,next:{title:"Unit 10.4 — Inheritance",text:"Write the parent once; children inherit everything and override what they must."}})}export{j as EXERCISES,w as default};
