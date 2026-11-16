import{j as e}from"./index-B7nVsXSH.js";import{P as C,T as A,K as S,N as B,L as T}from"./Lesson-TE-z-zj8.js";import{R as M,a as p,f as b,p as O,c as $,s as j,F as D,t as N,d as F,C as k}from"./project-CVPaOm-M.js";function m(c){const n=k(c),s=n.ask("Show: "),r=+n.ask("Seats: ");n.say("1 Book  2 Cancel  3 Status  4 Quit");let a=0,i=0;for(;;){const d=n.ask("Choice: ");if(d==="1"){const t=+n.ask("Tickets: "),o=r-a;t<=0?n.say("Tickets must be positive"):t<=o?(a+=t,n.say(`Booked ${t}. ${r-a} seats left`)):(n.say(`Only ${o} seats left`),n.ask("Join waitlist? (y/n): ").toLowerCase()==="y"&&(i+=t,n.say(`Added ${t} to the waitlist`)))}else if(d==="2"){const t=+n.ask("Tickets: ");if(t<=0)n.say("Tickets must be positive");else if(t>a)n.say(`Only ${a} seats are booked`);else if(a-=t,n.say(`Cancelled ${t}`),i>0){const o=Math.min(i,r-a);a+=o,i-=o,n.say(`${o} moved from the waitlist`)}}else if(d==="3")n.say(`${s}: ${a}/${r} booked, waitlist ${i}`);else if(d==="4"){n.say(`Final: ${a} booked, ${i} still waiting`);break}else n.say("Unknown choice")}return n.text()}const y="ABCD",u=6,f=c=>{var r;const n=y.indexOf((r=c[0])==null?void 0:r.toUpperCase()),s=/^\d+$/.test(c.slice(1))?+c.slice(1):0;return c.length>=2&&n>=0&&s>=1&&s<=u?[n,s-1]:null},X="Commands: book A1, cancel A1, map, done";function I(c){return["  "+Array.from({length:u},(n,s)=>s+1).join(" "),...c.map((n,s)=>y[s]+" "+n.join(" "))]}function w(c){const n=k(c),s=Array.from({length:4},()=>Array(u).fill("."));for(;;){const a=n.ask("Command: ").split(/\s+/).filter(Boolean);if(a.length===1&&a[0]==="done")break;if(a.length===1&&a[0]==="map"){n.say(...I(s));continue}if(a.length!==2||!["book","cancel"].includes(a[0])){n.say(X);continue}const i=a[1].toUpperCase(),d=f(a[1]);if(!d){n.say(`Invalid seat ${i}`);continue}const[t,o]=d;a[0]==="book"?s[t][o]==="X"?n.say(`${i} is already taken`):(s[t][o]="X",n.say(`Booked ${i}`)):s[t][o]!=="X"?n.say(`${i} is not booked`):(s[t][o]=".",n.say(`Cancelled ${i}`))}return n.say(`Booked: ${s.flat().filter(r=>r==="X").length}/24`),n.text()}function g(c,n){const s=k(n),r=Array.from({length:4},()=>Array(u).fill("."));if(c===null)s.say("No bookings yet");else{let i=0,d=0;c.split(`
`).filter(t=>t.trim()).forEach(t=>{const o=f(t.trim());!o||r[o[0]][o[1]]==="X"?d++:(r[o[0]][o[1]]="X",i++)}),s.say(`Loaded ${i} booking(s)`),d&&s.say(`Skipped ${d} bad line(s)`)}for(;;){const i=s.ask("Command: ").split(/\s+/).filter(Boolean);if(i.length===1&&i[0]==="done")break;if(i.length!==2||!["book","cancel"].includes(i[0])){s.say("Commands: book A1, cancel A1, done");continue}const d=i[1].toUpperCase(),t=f(i[1]);if(!t){s.say(`Invalid seat ${d}`);continue}const[o,l]=t;i[0]==="book"?r[o][l]==="X"?s.say(`${d} is already taken`):(r[o][l]="X",s.say(`Booked ${d}`)):r[o][l]!=="X"?s.say(`${d} is not booked`):(r[o][l]=".",s.say(`Cancelled ${d}`))}const a=[];return r.forEach((i,d)=>i.forEach((t,o)=>{t==="X"&&a.push(y[d]+(o+1))})),s.say(`Saved ${a.length} booking(s)`),{out:s.text(),lines:a}}function E(c){const n=k(c),s={Morning:new Set,Evening:new Set};for(;;){const r=n.ask("Command: ").split(/\s+/).filter(Boolean);if(r.length===1&&r[0]==="done")break;if(r.length!==3||!["book","cancel"].includes(r[0])){n.say("Commands: book Morning A1, cancel Morning A1, done");continue}const[a,i,d]=r,t=d.toUpperCase();if(!(i in s)){n.say(`No show called ${i}`);continue}if(!f(d)){n.say(`Invalid seat ${t}`);continue}const o=s[i];a==="book"?o.has(t)?n.say(`${t} is already taken`):(o.add(t),n.say(`Booked ${t} for ${i}`)):o.has(t)?(o.delete(t),n.say(`Cancelled ${t} for ${i}`)):n.say(`${t} is not booked`)}return Object.entries(s).forEach(([r,a])=>n.say(`${r}: ${a.size}/24 booked`)),n.text()}const R=`_s = Show("Test")
assert str(_s) == "Test: 0/24 booked", "str(Show) should look like Test: 0/24 booked — got " + str(_s)
_s.book("b4")
_s.book("A1")
assert _s.free_count() == 22, "free_count() should be 22 after two bookings."
assert _s.booked_seats() == ["A1", "B4"], "booked_seats() lists codes row by row: ['A1', 'B4'] — got " + str(_s.booked_seats())
try:
    _s.book("A1")
    raise AssertionError("Booking a taken seat should raise SeatTakenError.")
except SeatTakenError:
    pass
for _bad in ["E1", "A0", "A7", "1A", "A"]:
    try:
        _s.book(_bad)
        raise AssertionError(f"book('{_bad}') should raise ValueError.")
    except ValueError:
        pass
assert _s.cancel("A1") is True and _s.cancel("A1") is False, "cancel() returns True if it freed the seat, False if it wasn't booked."
_o = BookingOffice()
_o.add_show(Show("X"))
_o.book("X", "C3")
assert _o.shows["X"].booked_seats() == ["C3"], "BookingOffice.book(show, code) books on that show."
try:
    _o.book("Nope", "A1")
    raise AssertionError("An unknown show should raise KeyError.")
except KeyError:
    pass`,x=`Show,Seat,Type,Price
Morning,A1,student,100
Morning,A2,student,100
Morning,B4,regular,150
Evening,A1,regular,150
Evening,A2,regular,150
Evening,A3,student,100
Evening,B1,regular,150
Evening,B2,regular,150
Evening,C5,student,100
Matinee,D6,regular,150
`,v=`Show,Seat,Type,Price
Day1,A1,regular,200
Day1,A2,student,120
Day2,B1,regular,200
Day2,B2,regular,200
Day2,B3,regular,200
Day2,C1,student,120
Day2,C2,student,120
`;function _(c){const n=O(c),s=$(j(n,"Show",()=>1)),r=new Map(j(n,"Show",o=>o.Price)),a=s.reduce((o,l)=>l[1]>o[1]?l:o),i=n.filter(o=>o.Type==="student").length,d=[...s.map(([o,l])=>`${o}: ${l} sold, ${(l/24*100).toFixed(1)}% full, revenue ${r.get(o)}`),`Most popular: ${a[0]}`,`Student tickets: ${(i/n.length*100).toFixed(1)}%`].join(`
`),t=s.map(([o,l])=>[o,Math.round(l/24*100*100)/100]);return{out:d,post:D()+N("Occupancy by show")+F(t,"_ax","bars (shows in groupby order, height = % full)")}}const h={cp1:{id:"cp1",kind:"make",title:"Checkpoint 1 — the booking desk",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Show: "})," and ",e.jsx("code",{children:"Seats: "}),", print ",e.jsx("code",{children:"1 Book  2 Cancel  3 Status  4 Quit"})," once, then loop on ",e.jsx("code",{children:"Choice: "}),". ",e.jsx("strong",{children:"1 Book"}),": ask ",e.jsx("code",{children:"Tickets: "}),"; 0 or less → ",e.jsx("code",{children:"Tickets must be positive"}),"; if they fit, ",e.jsx("code",{children:"Booked 8. 2 seats left"}),"; if not, ",e.jsx("code",{children:"Only 2 seats left"})," and ask ",e.jsx("code",{children:"Join waitlist? (y/n): "})," — ",e.jsx("code",{children:"y"})," or ",e.jsx("code",{children:"Y"})," adds them: ",e.jsx("code",{children:"Added 4 to the waitlist"}),". ",e.jsx("strong",{children:"2 Cancel"}),": ask ",e.jsx("code",{children:"Tickets: "}),"; refuse 0 or less, or more than are booked (",e.jsx("code",{children:"Only 5 seats are booked"}),"); otherwise ",e.jsx("code",{children:"Cancelled 3"}),", then move as many waiting people as now fit: ",e.jsx("code",{children:"4 moved from the waitlist"})," (only if someone was waiting). ",e.jsx("strong",{children:"3"}),": ",e.jsx("code",{children:"Fest Night: 9/10 booked, waitlist 0"}),". ",e.jsx("strong",{children:"4"}),": ",e.jsx("code",{children:"Final: 9 booked, 0 still waiting"})," and stop. Otherwise ",e.jsx("code",{children:"Unknown choice"}),"."]}),minLines:30,tests:[{inputs:["Fest Night","10","1","8","1","4","y","3","2","3","3","4"],expect:m(["Fest Night","10","1","8","1","4","y","3","2","3","3","4"])},{inputs:["Bus","4","1","4","1","1","n","2","5","2","1","4"],expect:m(["Bus","4","1","4","1","1","n","2","5","2","1","4"]),hidden:!0,why:"A full show, a 'no' to the waitlist, and cancelling more than are booked."},{inputs:["Cinema","5","0","1","-2","1","6","Y","2","1","4"],expect:m(["Cinema","5","0","1","-2","1","6","Y","2","1","4"]),hidden:!0,why:"Unknown choice, negative tickets, a capital Y, and cancelling when nothing is booked."}],requires:[{node:"While"},{node:"If"},{call:"min"}],hints:["free = seats - booked, worked out when you need it","After a cancel: moved = min(waitlist, seats - booked)",'answer = input("Join waitlist? (y/n): ").lower()'],solution:`show = input("Show: ")
seats = int(input("Seats: "))
print("1 Book  2 Cancel  3 Status  4 Quit")
booked = 0
waitlist = 0
while True:
    choice = input("Choice: ")
    if choice == "1":
        n = int(input("Tickets: "))
        free = seats - booked
        if n <= 0:
            print("Tickets must be positive")
        elif n <= free:
            booked += n
            print(f"Booked {n}. {seats - booked} seats left")
        else:
            print(f"Only {free} seats left")
            if input("Join waitlist? (y/n): ").lower() == "y":
                waitlist += n
                print(f"Added {n} to the waitlist")
    elif choice == "2":
        n = int(input("Tickets: "))
        if n <= 0:
            print("Tickets must be positive")
        elif n > booked:
            print(f"Only {booked} seats are booked")
        else:
            booked -= n
            print(f"Cancelled {n}")
            if waitlist > 0:
                moved = min(waitlist, seats - booked)
                booked += moved
                waitlist -= moved
                print(f"{moved} moved from the waitlist")
    elif choice == "3":
        print(f"{show}: {booked}/{seats} booked, waitlist {waitlist}")
    elif choice == "4":
        print(f"Final: {booked} booked, {waitlist} still waiting")
        break
    else:
        print("Unknown choice")`},cp2:{id:"cp2",kind:"make",title:"Checkpoint 2 — the seat map",task:e.jsxs(e.Fragment,{children:["Now every seat is real: rows A–D, seats 1–6, a ",e.jsx("strong",{children:"2-D list"})," of ",e.jsx("code",{children:'"."'})," (free) and ",e.jsx("code",{children:'"X"'})," (booked). Write ",e.jsx("code",{children:"parse_seat(code)"})," returning a ",e.jsx("code",{children:"(row, col)"})," tuple of indexes — ",e.jsx("code",{children:'"C5"'})," → ",e.jsx("code",{children:"(2, 4)"}),", lowercase allowed — or ",e.jsx("code",{children:"None"})," for anything invalid. Loop on ",e.jsx("code",{children:"Command: "}),": ",e.jsx("code",{children:"book B4"})," → ",e.jsx("code",{children:"Booked B4"})," / ",e.jsx("code",{children:"B4 is already taken"}),"; ",e.jsx("code",{children:"cancel B4"})," → ",e.jsx("code",{children:"Cancelled B4"})," / ",e.jsx("code",{children:"B4 is not booked"}),"; an invalid seat → ",e.jsx("code",{children:"Invalid seat E1"}),"; ",e.jsx("code",{children:"map"})," prints the map (below); ",e.jsx("code",{children:"done"})," ends with ",e.jsx("code",{children:"Booked: 1/24"}),"; anything else → ",e.jsx("code",{children:"Commands: book A1, cancel A1, map, done"}),". Seat codes are shown in capitals."]}),minLines:34,tests:[{inputs:["book B4","book b4","book A1","map","cancel A1","done"],expect:w(["book B4","book b4","book A1","map","cancel A1","done"])},{inputs:["book E1","book A0","book A10","cancel C3","sing","book D6","map","done"],expect:w(["book E1","book A0","book A10","cancel C3","sing","book D6","map","done"]),hidden:!0,why:"Row E, seat 0 and seat 10 don't exist — parse_seat returns None for them."},{inputs:["done"],expect:w(["done"]),hidden:!0}],post:`assert parse_seat("C5") == (2, 4) and parse_seat("a1") == (0, 0), "parse_seat should return (row index, column index) — C5 is (2, 4)."
for _bad in ["E1", "A0", "A7", "A10", "1A", "A", ""]:
    assert parse_seat(_bad) is None, f"parse_seat('{_bad}') should be None."`,requires:[{node:"FunctionDef",min:2},{node:"ListComp",msg:'Build the 2-D list with a comprehension: [["."] * 6 for _ in range(4)]'}],hints:['seats = [["."] * 6 for _ in range(4)] — not [["."] * 6] * 4 (that is one row, four times!)','parse_seat: row = "ABCD".find(code[0].upper()); number = code[1:] must be digits, 1–6','Map: print("  1 2 3 4 5 6"), then for i, row in enumerate(seats): print("ABCD"[i], " ".join(row))'],solution:`ROWS = "ABCD"

def parse_seat(code):
    if len(code) < 2 or not code[1:].isdigit():
        return None
    row = ROWS.find(code[0].upper())
    col = int(code[1:]) - 1
    if row == -1 or not 0 <= col < 6:
        return None
    return (row, col)

def show_map(seats):
    print("  1 2 3 4 5 6")
    for i, row in enumerate(seats):
        print(ROWS[i], " ".join(row))

seats = [["."] * 6 for _ in range(4)]
while True:
    parts = input("Command: ").split()
    if parts == ["done"]:
        break
    if parts == ["map"]:
        show_map(seats)
        continue
    if len(parts) != 2 or parts[0] not in ("book", "cancel"):
        print("Commands: book A1, cancel A1, map, done")
        continue
    command, code = parts[0], parts[1].upper()
    seat = parse_seat(code)
    if seat is None:
        print(f"Invalid seat {code}")
        continue
    r, c = seat
    if command == "book":
        if seats[r][c] == "X":
            print(f"{code} is already taken")
        else:
            seats[r][c] = "X"
            print(f"Booked {code}")
    elif seats[r][c] != "X":
        print(f"{code} is not booked")
    else:
        seats[r][c] = "."
        print(f"Cancelled {code}")

total = sum(row.count("X") for row in seats)
print(f"Booked: {total}/24")`},cp3:(()=>{const c=g(`A1
B4
`,["book A1","book C2","cancel B4","done"]),n=g(null,["book D6","done"]),s=g(`A1
Z9
A1
b2

`,["book x","cancel A2","hello","done"]);return{id:"cp3",kind:"make",title:"Checkpoint 3 — bookings that survive",task:e.jsxs(e.Fragment,{children:["Bookings are kept in ",e.jsx("code",{children:"bookings.txt"}),", one seat code per line. At the start load them: ",e.jsx("code",{children:"Loaded 2 booking(s)"})," — or ",e.jsx("code",{children:"No bookings yet"})," if the file is missing; invalid codes and repeats count as ",e.jsx("code",{children:"Skipped 2 bad line(s)"}),". Change ",e.jsx("code",{children:"parse_seat"})," to ",e.jsx("strong",{children:"raise"})," ",e.jsx("code",{children:"ValueError"})," for an invalid code, and write your own ",e.jsx("code",{children:"SeatTakenError"}),", raised by ",e.jsx("code",{children:"book(seats, code)"}),". Commands as in checkpoint 2, without ",e.jsx("code",{children:"map"})," (the help line becomes ",e.jsx("code",{children:"Commands: book A1, cancel A1, done"}),"). At ",e.jsx("code",{children:"done"}),", save every booked seat, row by row (A1, A2 … D6), and print ",e.jsx("code",{children:"Saved 2 booking(s)"}),"."]}),minLines:40,tests:[{setup:p({"bookings.txt":`A1
B4
`}),inputs:["book A1","book C2","cancel B4","done"],expect:c.out,post:b("bookings.txt",c.lines,"bookings.txt should list every booked seat, row by row.")},{setup:p({"bookings.txt":null}),inputs:["book D6","done"],expect:n.out,post:b("bookings.txt",n.lines),hidden:!0,why:"No bookings.txt yet: print No bookings yet and start with an empty hall."},{setup:p({"bookings.txt":`A1
Z9
A1
b2

`}),inputs:["book x","cancel A2","hello","done"],expect:s.out,post:b("bookings.txt",s.lines),hidden:!0,why:"An invalid code and a repeated seat in the file are both bad lines; b2 is fine (save it as B2)."}],requires:[{node:"ClassDef",msg:"Define class SeatTakenError(Exception)."},{node:"Raise",min:2},{node:"Try",min:2},{node:"With",min:2}],hints:["parse_seat: … raise ValueError(code) instead of return None",'def book(seats, code): r, c = parse_seat(code); if seats[r][c] == "X": raise SeatTakenError(code)',"Loading: for each line, try: book(seats, line.strip()) except (ValueError, SeatTakenError): bad += 1"],solution:`ROWS = "ABCD"

class SeatTakenError(Exception):
    pass

def parse_seat(code):
    if len(code) < 2 or not code[1:].isdigit():
        raise ValueError(code)
    row = ROWS.find(code[0].upper())
    col = int(code[1:]) - 1
    if row == -1 or not 0 <= col < 6:
        raise ValueError(code)
    return (row, col)

def book(seats, code):
    r, c = parse_seat(code)
    if seats[r][c] == "X":
        raise SeatTakenError(code)
    seats[r][c] = "X"

seats = [["."] * 6 for _ in range(4)]
try:
    with open("bookings.txt") as f:
        loaded, bad = 0, 0
        for line in f:
            if not line.strip():
                continue
            try:
                book(seats, line.strip())
                loaded += 1
            except (ValueError, SeatTakenError):
                bad += 1
    print(f"Loaded {loaded} booking(s)")
    if bad:
        print(f"Skipped {bad} bad line(s)")
except FileNotFoundError:
    print("No bookings yet")

while True:
    parts = input("Command: ").split()
    if parts == ["done"]:
        break
    if len(parts) != 2 or parts[0] not in ("book", "cancel"):
        print("Commands: book A1, cancel A1, done")
        continue
    command, code = parts[0], parts[1].upper()
    try:
        if command == "book":
            book(seats, code)
            print(f"Booked {code}")
        else:
            r, c = parse_seat(code)
            if seats[r][c] != "X":
                print(f"{code} is not booked")
            else:
                seats[r][c] = "."
                print(f"Cancelled {code}")
    except ValueError:
        print(f"Invalid seat {code}")
    except SeatTakenError:
        print(f"{code} is already taken")

saved = []
for r in range(4):
    for c in range(6):
        if seats[r][c] == "X":
            saved.append(f"{ROWS[r]}{c + 1}")
with open("bookings.txt", "w") as f:
    for code in saved:
        f.write(code + "\\n")
print(f"Saved {len(saved)} booking(s)")`}})(),cp4:{id:"cp4",kind:"make",title:"Checkpoint 4 — Show and BookingOffice classes",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"SeatTakenError"})," and two classes. ",e.jsx("code",{children:"Show(name)"})," holds its own 4 × 6 seat grid: ",e.jsx("code",{children:"book(code)"})," (raises ",e.jsx("code",{children:"ValueError"})," for an invalid code, ",e.jsx("code",{children:"SeatTakenError"})," if taken), ",e.jsx("code",{children:"cancel(code)"})," (returns True if it freed the seat, False if it wasn't booked; ValueError if invalid), ",e.jsx("code",{children:"free_count()"}),", ",e.jsx("code",{children:"booked_seats()"})," (codes row by row) and ",e.jsx("code",{children:"__str__"})," → ",e.jsx("code",{children:"Morning: 2/24 booked"}),". ",e.jsx("code",{children:"BookingOffice()"})," keeps a dict ",e.jsx("code",{children:"self.shows"}),": ",e.jsx("code",{children:"add_show(show)"}),", and ",e.jsx("code",{children:"book(show_name, code)"})," / ",e.jsx("code",{children:"cancel(show_name, code)"})," that raise ",e.jsx("code",{children:"KeyError"})," for an unknown show. Main: an office with shows ",e.jsx("code",{children:"Morning"})," and ",e.jsx("code",{children:"Evening"}),"; commands like ",e.jsx("code",{children:"book Morning B4"})," and ",e.jsx("code",{children:"cancel Evening A1"})," → ",e.jsx("code",{children:"Booked B4 for Morning"}),", ",e.jsx("code",{children:"Cancelled A1 for Evening"}),", ",e.jsx("code",{children:"No show called Night"}),", ",e.jsx("code",{children:"Invalid seat E9"}),", ",e.jsx("code",{children:"B4 is already taken"}),", ",e.jsx("code",{children:"A1 is not booked"}),"; anything else → ",e.jsx("code",{children:"Commands: book Morning A1, cancel Morning A1, done"}),". At ",e.jsx("code",{children:"done"}),", print every show. Hidden checks use your classes directly."]}),minLines:50,tests:[{inputs:["book Morning B4","book Morning b4","book Evening A1","cancel Evening A1","cancel Evening A1","done"],expect:E(["book Morning B4","book Morning b4","book Evening A1","cancel Evening A1","cancel Evening A1","done"])},{inputs:["book Night A1","book Morning E9","hello","book Evening D6","done"],expect:E(["book Night A1","book Morning E9","hello","book Evening D6","done"]),hidden:!0}],post:R,requires:[{node:"ClassDef",min:3}],hints:['Show.__init__: self.name = name; self.seats = [["."] * 6 for _ in range(4)] — reuse parse_seat as a method','booked_seats(): loop rows then columns, collect f"{ROWS[r]}{c + 1}" where the seat is X',"BookingOffice.book(name, code): self.shows[name].book(code) — a missing name raises KeyError by itself"],solution:`ROWS = "ABCD"

class SeatTakenError(Exception):
    pass

class Show:
    def __init__(self, name):
        self.name = name
        self.seats = [["."] * 6 for _ in range(4)]

    def _parse(self, code):
        if len(code) < 2 or not code[1:].isdigit():
            raise ValueError(code)
        row = ROWS.find(code[0].upper())
        col = int(code[1:]) - 1
        if row == -1 or not 0 <= col < 6:
            raise ValueError(code)
        return row, col

    def book(self, code):
        r, c = self._parse(code)
        if self.seats[r][c] == "X":
            raise SeatTakenError(code)
        self.seats[r][c] = "X"

    def cancel(self, code):
        r, c = self._parse(code)
        if self.seats[r][c] != "X":
            return False
        self.seats[r][c] = "."
        return True

    def booked_seats(self):
        return [f"{ROWS[r]}{c + 1}" for r in range(4) for c in range(6) if self.seats[r][c] == "X"]

    def free_count(self):
        return 24 - len(self.booked_seats())

    def __str__(self):
        return f"{self.name}: {len(self.booked_seats())}/24 booked"

class BookingOffice:
    def __init__(self):
        self.shows = {}

    def add_show(self, show):
        self.shows[show.name] = show

    def book(self, name, code):
        self.shows[name].book(code)

    def cancel(self, name, code):
        return self.shows[name].cancel(code)

office = BookingOffice()
office.add_show(Show("Morning"))
office.add_show(Show("Evening"))

while True:
    parts = input("Command: ").split()
    if parts == ["done"]:
        break
    if len(parts) != 3 or parts[0] not in ("book", "cancel"):
        print("Commands: book Morning A1, cancel Morning A1, done")
        continue
    command, name, code = parts[0], parts[1], parts[2].upper()
    try:
        if command == "book":
            office.book(name, code)
            print(f"Booked {code} for {name}")
        elif office.cancel(name, code):
            print(f"Cancelled {code} for {name}")
        else:
            print(f"{code} is not booked")
    except KeyError:
        print(f"No show called {name}")
    except ValueError:
        print(f"Invalid seat {code}")
    except SeatTakenError:
        print(f"{code} is already taken")

for show in office.shows.values():
    print(show)`},cp5:(()=>{const c=_(x),n=_(v);return{id:"cp5",kind:"make",title:"Checkpoint 5 — how full were the shows?",timeoutMs:3e4,task:e.jsxs(e.Fragment,{children:["The festival's ",e.jsx("code",{children:"bookings.csv"})," has one row per ticket: Show, Seat, Type (student / regular) and Price. Every show has 24 seats. With pandas, for each show (in groupby order) print ",e.jsx("code",{children:"Evening: 6 sold, 25.0% full, revenue 800"}),"; then ",e.jsx("code",{children:"Most popular: Evening"})," and ",e.jsx("code",{children:"Student tickets: 40.0%"})," (share of all tickets). Draw each show's occupancy (sold ÷ 24 × 100) as a bar chart in the same order, titled ",e.jsx("code",{children:"Occupancy by show"}),". Hidden tests use another festival."]}),show:x,showLabel:"bookings.csv — ALREADY IN THE FOLDER",minLines:14,tests:[{setup:p({"bookings.csv":x}),expect:c.out,post:c.post},{setup:p({"bookings.csv":v}),expect:n.out,post:n.post,hidden:!0,why:"Another festival: compute everything from the DataFrame."}],requires:[{call:"read_csv"},{call:"groupby"},{call:"bar"}],hints:['sold = df.groupby("Show")["Seat"].count(); revenue = df.groupby("Show")["Price"].sum()',"occupancy = sold / 24 * 100 — a whole Series at once",'share = (df["Type"] == "student").mean() * 100'],solution:`import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("bookings.csv")
sold = df.groupby("Show")["Seat"].count()
revenue = df.groupby("Show")["Price"].sum()
occupancy = sold / 24 * 100
for show in sold.index:
    print(f"{show}: {sold[show]} sold, {occupancy[show]:.1f}% full, revenue {revenue[show]}")
print(f"Most popular: {sold.idxmax()}")
share = (df["Type"] == "student").mean() * 100
print(f"Student tickets: {share:.1f}%")

plt.bar(occupancy.index, occupancy.values, color="teal")
plt.title("Occupancy by show")
plt.ylabel("% full")
plt.show()`}})()},V=h,L=[{q:'Why is [["."] * 6] * 4 a bad seat map?',options:["It's too small","It's the same row list four times — booking A1 also 'books' B1, C1 and D1","Strings can't be in lists","It is fine"],answer:1,explain:"Four name tags on one list (Unit 4.2's model). Use a comprehension."},{q:'parse_seat("C5") returns (2, 4) because…',options:["C is the 3rd letter, seat 5 is index 4 — both counted from 0","It's random","Rows start at 1","C = 2 in hex"],answer:0,explain:"Humans count from 1, list indexes from 0."},{q:"Booking a taken seat raises SeatTakenError. Who prints the message?",options:["book() itself","The code that called book(), in its except block","Python","Nobody"],answer:1,explain:"Detect in the function, handle in the caller."},{q:"Occupancy for 6 tickets out of 24 seats is…",options:["6%","24%","25%","40%"],answer:2,explain:"6 / 24 × 100 = 25.0"}];function U(c){const n=[{label:"1 · Core",kicker:"CHECKPOINT 1 · AFTER M4–M6",title:"The booking desk",blocks:[e.jsx(C,{children:"A college fest, a cinema, a bus: seats, bookings, cancellations — and never two people in one seat. You'll build the booking system in five checkpoints, each a complete program."}),e.jsx(M,{color:A.purple,rows:[["1 · Core logic","M4–M6","seat counts, bookings, cancellations, a waitlist"],["2 · Organise it","M7–M8","a real seat map as a 2-D list; seat codes → tuples"],["3 · Make it survive","M9","bookings file; SeatTakenError; bad codes handled"],["4 · Model it","M10","Show and BookingOffice classes"],["5 · Analyse & chart","M12–M13","occupancy and revenue per show; chart"]]}),h.cp1]},{label:"2 · Organise",kicker:"CHECKPOINT 2 · AFTER M7–M8",title:"The seat map",blocks:[h.cp2]},{label:"3 · Survive",kicker:"CHECKPOINT 3 · AFTER M9",title:"Bookings that survive",blocks:[h.cp3,e.jsx(S,{children:"Loading the file reuses book() — so a duplicate in the file is caught by the very same SeatTakenError as a duplicate typed at the desk."})]},{label:"4 · Model",kicker:"CHECKPOINT 4 · AFTER M10",title:"Show and BookingOffice classes",blocks:[h.cp4]},{label:"5 · Analyse",kicker:"CHECKPOINT 5 · AFTER M12–M13",title:"How full were the shows?",blocks:[h.cp5,e.jsx(B,{color:A.blue,icon:"🎨",children:"Make it yours: lab-slot booking, a badminton-court timetable or hostel room allotment follow the same five steps. Or bring your own idea of similar size to your teacher."})]}];return e.jsx(T,{...c,unitId:"UnitMP_SEAT",crumb:"MINI-PROJECT › TRACK C",title:"Event Seat Booking",sections:n,quiz:L,next:{title:"Track complete!",text:"Counts, a seat map, a file, classes and a chart. Try another track, or head to the Finish Line."}})}export{V as EXERCISES,U as default};
