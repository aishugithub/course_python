import{j as e}from"./index-CD7nmDt6.js";import{P as d,C as h,K as p,L as f}from"./Lesson-MmSVdMEX.js";const c=t=>{const s={python101:!0,"wings-of-fire":!0,godan:!1},i={},r=[];for(const l of t){if(r.push(`Borrow (member book): ${l}`),l==="done")break;const[a,n]=l.split(" ");n in s?s[n]?(i[a]||0)>=2?r.push(`Refused: ${a} already has 2 books`):(s[n]=!1,i[a]=(i[a]||0)+1,r.push(`${a} borrowed ${n}`)):r.push(`Refused: ${n} is already lent out`):r.push(`Refused: no book called ${n}`)}return r.join(`
`)},o={define:{id:"define",kind:"type",title:"Your own exception type",task:e.jsxs(e.Fragment,{children:["An exception is a class. Inherit from ",e.jsx("code",{children:"Exception"})," and you have a new error type with a name that explains your problem. ",e.jsx("code",{children:"pass"})," is enough — the parent does the rest."]}),show:`class InvalidMarkError(Exception):
    pass

def set_mark(mark):
    if not 0 <= mark <= 100:
        raise InvalidMarkError(f"{mark} is not between 0 and 100")
    return mark

for m in [87, 150]:
    try:
        print("Saved", set_mark(m))
    except InvalidMarkError as e:
        print("Rejected:", e)`,minLines:14,tests:[{expect:`Saved 87
Rejected: 150 is not between 0 and 100`}],requires:[{node:"ClassDef"},{node:"Raise"}],hints:["The message you pass when raising is what print(e) shows."],solution:`class InvalidMarkError(Exception):
    pass

def set_mark(mark):
    if not 0 <= mark <= 100:
        raise InvalidMarkError(f"{mark} is not between 0 and 100")
    return mark

for m in [87, 150]:
    try:
        print("Saved", set_mark(m))
    except InvalidMarkError as e:
        print("Rejected:", e)`},precise:{id:"precise",kind:"fix",title:"Catching the wrong problem",task:e.jsxs(e.Fragment,{children:["Typing ",e.jsx("code",{children:"eighty"})," should say ",e.jsx("code",{children:"Not a number"}),", but it says ",e.jsx("code",{children:"Mark out of range"})," — both problems raise ValueError, so one except can't tell them apart. Define ",e.jsx("code",{children:"InvalidMarkError(Exception)"}),", raise ",e.jsx("em",{children:"it"})," for the range check, and give each problem its own except."]}),starter:`def read_mark(text):
    mark = int(text)
    if not 0 <= mark <= 100:
        raise ValueError("out of range")
    return mark

try:
    print("Saved", read_mark(input("Mark: ")))
except ValueError:
    print("Mark out of range")`,tests:[{inputs:["eighty"],expect:`Mark: eighty
Not a number`},{inputs:["150"],expect:`Mark: 150
Mark out of range`,hidden:!0},{inputs:["75"],expect:`Mark: 75
Saved 75`,hidden:!0}],requires:[{node:"ClassDef"},{node:"ExceptHandler",min:2}],hints:['except InvalidMarkError: print("Mark out of range") — then except ValueError: print("Not a number")',"InvalidMarkError inherits from Exception, not from ValueError, so the two never get confused."],solution:`class InvalidMarkError(Exception):
    pass

def read_mark(text):
    mark = int(text)
    if not 0 <= mark <= 100:
        raise InvalidMarkError("out of range")
    return mark

try:
    print("Saved", read_mark(input("Mark: ")))
except InvalidMarkError:
    print("Mark out of range")
except ValueError:
    print("Not a number")`},funds:{id:"funds",kind:"write",title:"InsufficientFundsError",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"InsufficientFundsError(Exception)"})," and a ",e.jsx("code",{children:"Wallet(balance)"})," class whose ",e.jsx("code",{children:"spend(amount)"})," raises it with the message ",e.jsx("code",{children:"need Rs 500, have Rs 300"})," when there isn't enough. Main code: a wallet with 300, try to spend 120 and print ",e.jsx("code",{children:"Left: Rs 180"}),"; then try to spend 500 and print ",e.jsx("code",{children:"Declined: need Rs 500, have Rs 180"}),"."]}),minLines:16,tests:[{expect:`Left: Rs 180
Declined: need Rs 500, have Rs 180`}],post:`_w = Wallet(10)
try:
    _w.spend(11)
    raise AssertionError('spend should raise InsufficientFundsError')
except InsufficientFundsError:
    pass
assert _w.balance == 10`,requires:[{node:"ClassDef",min:2},{node:"Raise"}],hints:['raise InsufficientFundsError(f"need Rs {amount}, have Rs {self.balance}")',"Only subtract after the check passes."],solution:`class InsufficientFundsError(Exception):
    pass

class Wallet:
    def __init__(self, balance):
        self.balance = balance
    def spend(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(f"need Rs {amount}, have Rs {self.balance}")
        self.balance -= amount

w = Wallet(300)
for amount in [120, 500]:
    try:
        w.spend(amount)
        print(f"Left: Rs {w.balance}")
    except InsufficientFundsError as e:
        print(f"Declined: {e}")`},family:{id:"family",kind:"write",title:"A family of errors",task:e.jsxs(e.Fragment,{children:["Make a parent ",e.jsx("code",{children:"BookingError(Exception)"})," and two children: ",e.jsx("code",{children:"SeatTakenError(BookingError)"})," and ",e.jsx("code",{children:"NoSuchSeatError(BookingError)"}),". Write ",e.jsx("code",{children:"book(seats, n)"})," (seats is a list of 10 bools) raising the right one. Book seats 3, 3 and 12 — each in its own try with a ",e.jsx("strong",{children:"single"})," ",e.jsx("code",{children:"except BookingError as e"})," — printing ",e.jsx("code",{children:"Booked 3"}),", ",e.jsx("code",{children:"Problem: seat 3 is taken"}),", ",e.jsx("code",{children:"Problem: there is no seat 12"}),"."]}),minLines:20,tests:[{expect:`Booked 3
Problem: seat 3 is taken
Problem: there is no seat 12`}],post:"assert issubclass(SeatTakenError, BookingError) and issubclass(NoSuchSeatError, BookingError)",requires:[{node:"ClassDef",min:3}],hints:["class SeatTakenError(BookingError): pass","One except BookingError catches both children — that's what the shared parent is for."],solution:`class BookingError(Exception):
    pass

class SeatTakenError(BookingError):
    pass

class NoSuchSeatError(BookingError):
    pass

def book(seats, n):
    if n < 1 or n > len(seats):
        raise NoSuchSeatError(f"there is no seat {n}")
    if seats[n - 1]:
        raise SeatTakenError(f"seat {n} is taken")
    seats[n - 1] = True

seats = [False] * 10
for n in [3, 3, 12]:
    try:
        book(seats, n)
        print(f"Booked {n}")
    except BookingError as e:
        print(f"Problem: {e}")`},library:{id:"library",kind:"make",title:"Library lending",task:e.jsxs(e.Fragment,{children:["Books: ",e.jsx("code",{children:"python101"})," and ",e.jsx("code",{children:"wings-of-fire"})," are available, ",e.jsx("code",{children:"godan"})," is already lent out. A member may hold at most 2 books. Define ",e.jsx("code",{children:"LibraryError"})," and three children — ",e.jsx("code",{children:"NoSuchBookError"}),", ",e.jsx("code",{children:"NotAvailableError"}),", ",e.jsx("code",{children:"LimitReachedError"})," — and a ",e.jsx("code",{children:"Library"})," class with ",e.jsx("code",{children:"borrow(member, book)"})," that raises them with messages ",e.jsx("code",{children:"no book called X"}),", ",e.jsx("code",{children:"X is already lent out"}),", ",e.jsx("code",{children:"M already has 2 books"}),". Read ",e.jsx("code",{children:"Borrow (member book): "})," lines until ",e.jsx("code",{children:"done"}),"; print ",e.jsx("code",{children:"Priya borrowed python101"})," or ",e.jsx("code",{children:"Refused: …"}),"."]}),minLines:32,tests:[{inputs:["Priya python101","Arun godan","Arun gita","Priya wings-of-fire","Priya python101","done"],expect:c(["Priya python101","Arun godan","Arun gita","Priya wings-of-fire","Priya python101","done"])},{inputs:["Ravi python101","Meena python101","done"],expect:c(["Ravi python101","Meena python101","done"]),hidden:!0}],requires:[{node:"ClassDef",min:5},{node:"Raise",min:3}],hints:['self.available = {"python101": True, "wings-of-fire": True, "godan": False}; self.loans = {} (member → count).',"Check in order: unknown book, not available, member limit.",'The main loop catches LibraryError as e and prints f"Refused: {e}".'],solution:`class LibraryError(Exception):
    pass

class NoSuchBookError(LibraryError):
    pass

class NotAvailableError(LibraryError):
    pass

class LimitReachedError(LibraryError):
    pass

class Library:
    def __init__(self):
        self.available = {"python101": True, "wings-of-fire": True, "godan": False}
        self.loans = {}

    def borrow(self, member, book):
        if book not in self.available:
            raise NoSuchBookError(f"no book called {book}")
        if not self.available[book]:
            raise NotAvailableError(f"{book} is already lent out")
        if self.loans.get(member, 0) >= 2:
            raise LimitReachedError(f"{member} already has 2 books")
        self.available[book] = False
        self.loans[member] = self.loans.get(member, 0) + 1

lib = Library()
line = input("Borrow (member book): ")
while line != "done":
    member, book = line.split()
    try:
        lib.borrow(member, book)
        print(f"{member} borrowed {book}")
    except LibraryError as e:
        print(f"Refused: {e}")
    line = input("Borrow (member book): ")`}},b=o,u=[{q:"How do you create your own exception type?",options:["def MyError():","class MyError(Exception): pass","raise MyError","import MyError"],answer:1,explain:"Exceptions are classes; inherit from Exception."},{q:"Why is InvalidMarkError better than reusing ValueError?",options:["It's shorter","Its name explains the problem, and you can catch it without accidentally catching unrelated ValueErrors","It's faster","No difference"],answer:1,explain:"Precise catches, readable tracebacks."},{q:"except BookingError catches…",options:["Only BookingError itself","BookingError and every class that inherits from it","All exceptions","Nothing"],answer:1,explain:"One handler for the whole family."},{q:'What does print(e) show for raise MyError("seat 3 is taken")?',options:["MyError","seat 3 is taken","Nothing","e"],answer:1,explain:"The message you passed when raising."}];function E(t){const s=[{label:"Your Own Errors",kicker:"EXCEPTIONS × CLASSES",title:"An exception is just a class",blocks:[e.jsx(d,{children:"Module 9 raised built-in errors like ValueError. Module 10 taught classes. Put them together: your own error types, named after your own problems."}),o.define]},{label:"Precise Catches",kicker:"WHY BOTHER",title:"Catch exactly what you mean",blocks:[o.precise,o.funds]},{label:"Families",kicker:"INHERITANCE AGAIN",title:"A family of related errors",blocks:[e.jsx("div",{style:{maxWidth:640},children:e.jsx(h,{title:"the shape",code:`class BookingError(Exception): pass         # the family
class SeatTakenError(BookingError): pass    # one member
class NoSuchSeatError(BookingError): pass   # another

except BookingError:     # catches any of them`})}),o.family,e.jsx(p,{children:"A shared parent lets callers choose: catch one specific error, or the whole family at once."})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: library lending",blocks:[o.library]}];return e.jsx(f,{...t,unitId:"Unit10_6",crumb:"MODULE 10 › UNIT 10.6",title:"User-Defined Exceptions",sections:s,quiz:u,next:{title:"Unit 10.7 — Capstone: Marks Manager 3.0",text:"Student and Classroom classes — the Marks Manager's final form."}})}export{b as EXERCISES,E as default};
