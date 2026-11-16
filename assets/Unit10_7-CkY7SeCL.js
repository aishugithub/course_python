import{j as e}from"./index-B7nVsXSH.js";import{P as M,N as E,T as R,K as I,L as C}from"./Lesson-TE-z-zj8.js";const O=s=>`import os
`+Object.entries(s).map(([r,i])=>i===null?`if os.path.exists(${JSON.stringify(r)}): os.remove(${JSON.stringify(r)})`:`with open(${JSON.stringify(r)}, "w") as _f: _f.write(${JSON.stringify(i)})`).join(`
`),w=s=>s>=90?"A":s>=75?"B":s>=60?"C":s>=40?"D":"F";function y(s){if(!s.length)return["No students yet"];let r=0,i=0,t=s[0][0],a=s[0][1];const d=[];for(const[o,n]of s)d.push(`${o}: ${n} (${w(n)})`),r+=n,n>=40&&i++,n>a&&(a=n,t=o);return d.push(`Average: ${(r/s.length).toFixed(2)}`,`Topper: ${t} (${a})`,`Passed: ${i}/${s.length}`),d}const k=(s,r)=>{const i=s.split(" "),t=r.split(" ").map(Number);return[`Names: ${s}`,`Marks: ${r}`,...y(i.map((a,d)=>[a,t[d]]))].join(`
`)};function m(s,r,i){const t=[],a=[];if(i){if(s)for(const n of s.split(`
`)){if(!n)continue;const[l,c]=n.split(",");a.push([l,Number(c)])}t.push(`Loaded ${a.length} students`)}const d=[...r],o=n=>{const l=d.shift();return t.push(n+l),l};for(;;){t.push("1. Add  2. Report  3. Exit");const n=o("Choose: ");if(n==="1"){const l=o("Name: ").trim().toUpperCase(),c=Number(o("Mark: "));if(c<0||c>100){t.push(`Rejected: ${c} is not between 0 and 100`);continue}const h=a.findIndex(([N])=>N===l);h>=0?(a[h][1]=c,t.push(`Updated ${l}`)):(a.push([l,c]),t.push(`Added ${l}`))}else if(n==="2")t.push(...y(a));else if(n==="3"){i&&t.push(`Saved ${a.length} students`),t.push("Bye!");break}else t.push("Invalid choice")}return{out:t.join(`
`),file:a.map(([n,l])=>`${n},${l}
`).join("")}}const p=`class InvalidMarkError(Exception):
    pass`,f=`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.set_mark(mark)

    def set_mark(self, mark):
        if not 0 <= mark <= 100:
            raise InvalidMarkError(f"{mark} is not between 0 and 100")
        self.mark = mark

    def grade(self):
        if self.mark >= 90:
            return "A"
        elif self.mark >= 75:
            return "B"
        elif self.mark >= 60:
            return "C"
        elif self.mark >= 40:
            return "D"
        return "F"

    def __str__(self):
        return f"{self.name}: {self.mark} ({self.grade()})"`,$=s=>`    total = 0
    passed = 0
    top = ${s}[0]
    for s in ${s}:
        print(s)
        total += s.mark
        if s.mark >= 40:
            passed += 1
        if s.mark > top.mark:
            top = s
    print(f"Average: {total / len(${s}):.2f}")
    print(f"Topper: {top.name} ({top.mark})")
    print(f"Passed: {passed}/{len(${s})}")`,j=`${p}

${f}

names = input("Names: ").split()
marks = input("Marks: ").split()
students = []
for n, m in zip(names, marks):
    students.append(Student(n, int(m)))
if students:
${$("students")}`,A=s=>`class Classroom:
    def __init__(self):
        self.students = {}

    def add(self, name, mark):
        if name in self.students:
            self.students[name].set_mark(mark)
            return f"Updated {name}"
        self.students[name] = Student(name, mark)
        return f"Added {name}"

    def report(self):
        if not self.students:
            print("No students yet")
            return
        roster = list(self.students.values())
    ${$("roster").split(`
`).join(`
    `)}`+(s?`

    def save(self, filename):
        with open(filename, "w") as f:
            for s in self.students.values():
                f.write(f"{s.name},{s.mark}\\n")

    def load(self, filename):
        try:
            with open(filename) as f:
                for line in f:
                    name, mark = line.strip().split(",")
                    self.add(name, int(mark))
        except FileNotFoundError:
            pass`:""),S=s=>`

room = Classroom()
${s?`room.load("marks.txt")
print(f"Loaded {len(room.students)} students")
`:""}while True:
    print("1. Add  2. Report  3. Exit")
    choice = input("Choose: ")
    if choice == "1":
        name = input("Name: ").strip().upper()
        mark = int(input("Mark: "))
        try:
            print(room.add(name, mark))
        except InvalidMarkError as e:
            print(f"Rejected: {e}")
    elif choice == "2":
        room.report()
    elif choice == "3":
${s?`        room.save("marks.txt")
        print(f"Saved {len(room.students)} students")
`:""}        print("Bye!")
        break
    else:
        print("Invalid choice")`,x=`${p}

${f}

${A(!1)}${S(!1)}`,P=`${p}

${f}

${A(!0)}${S(!0)}`,g=["2","1","priya","87","1","arun","150","1","arun","35","1","PRIYA","91","2","3"],b=["1","meena","40","2","3"],T=["1","meena","91","2","3"],v=(s,r,i)=>{const t=m(s,r,!0);return{setup:O({"marks.txt":s}),inputs:r,expect:t.out,hidden:i,post:`with open("marks.txt") as _f:
    _g = _f.read()
assert _g == ${JSON.stringify(t.file)}, "marks.txt should hold NAME,MARK per student: " + repr(_g)`}},_=(s,r)=>{const i=r.split(" ").map(o=>o.split(":")).map(([o,n])=>[o,Number(n)]),t=i.reduce((o,[,n])=>o+n,0)/i.length;let a=i[0],d=i[0];for(const o of i)o[1]>a[1]&&(a=o),o[1]<d[1]&&(d=o);return[`Name: ${s}`,`Subjects: ${r}`,`${s} - average ${t.toFixed(1)} (${w(t)})`,`Best: ${a[0]} (${a[1]})`,`Weakest: ${d[0]} (${d[1]})`].join(`
`)},u={v1:{id:"v1",kind:"write",title:"Version 1 — a Student class",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"InvalidMarkError"})," and a ",e.jsx("code",{children:"Student(name, mark)"})," class: ",e.jsx("code",{children:"set_mark"})," validates 0–100 (also used by ",e.jsx("code",{children:"__init__"}),"), ",e.jsx("code",{children:"grade()"})," returns A–F (pass mark 40), and ",e.jsx("code",{children:"__str__"})," returns ",e.jsx("code",{children:"PRIYA: 87 (B)"}),". Read ",e.jsx("code",{children:"Names: "})," and ",e.jsx("code",{children:"Marks: "}),", build a list of Students, print each, then ",e.jsx("code",{children:"Average: 69.50"}),", ",e.jsx("code",{children:"Topper: MEENA (91)"}),", ",e.jsx("code",{children:"Passed: 3/4"}),"."]}),minLines:40,tests:[{inputs:["PRIYA ARUN MEENA RAVI","87 62 91 38"],expect:k("PRIYA ARUN MEENA RAVI","87 62 91 38")},{inputs:["A B","40 39"],expect:k("A B","40 39"),hidden:!0}],post:`assert str(Student('Z', 75)) == 'Z: 75 (B)'
try:
    Student('Q', 101)
    raise AssertionError('Student(..., 101) should raise InvalidMarkError')
except InvalidMarkError:
    pass`,requires:[{node:"ClassDef",min:2}],hints:["Reuse your 10.3 set_mark and 10.6 InvalidMarkError.","The topper is now a Student object: top = students[0]; if s.mark > top.mark: top = s"],solution:j},v2:{id:"v2",kind:"modify",title:"Version 2 — a Classroom class",task:e.jsxs(e.Fragment,{children:["The loose list becomes a ",e.jsx("code",{children:"Classroom"})," class holding a dict of name → Student, with ",e.jsx("code",{children:"add(name, mark)"})," (returns ",e.jsx("code",{children:"Added PRIYA"})," or ",e.jsx("code",{children:"Updated PRIYA"})," — updating uses ",e.jsx("code",{children:"set_mark"}),", so it's validated too) and ",e.jsx("code",{children:"report()"})," (prints the report, or ",e.jsx("code",{children:"No students yet"}),"). Replace the input lines with the familiar menu (",e.jsx("code",{children:"1. Add  2. Report  3. Exit"}),"); an out-of-range mark prints ",e.jsx("code",{children:"Rejected: 150 is not between 0 and 100"}),"."]}),starter:j,minLines:64,tests:[{inputs:g,expect:m(null,g,!1).out},{inputs:b,expect:m(null,b,!1).out,hidden:!0}],post:`_r = Classroom()
assert _r.add('X', 50) == 'Added X' and _r.add('X', 60) == 'Updated X' and _r.students['X'].mark == 60`,requires:[{node:"ClassDef",min:3},{node:"While"}],hints:["self.students = {} in Classroom.__init__.","report(): roster = list(self.students.values()), then the Version 1 report loop over roster.",'Menu: try: print(room.add(name, mark)) except InvalidMarkError as e: print(f"Rejected: {e}")'],solution:x},v3:{id:"v3",kind:"modify",title:"Version 3 — the classroom remembers",task:e.jsxs(e.Fragment,{children:["Give ",e.jsx("code",{children:"Classroom"})," two more methods: ",e.jsx("code",{children:"save(filename)"})," (one ",e.jsx("code",{children:"NAME,MARK"})," line per student) and ",e.jsx("code",{children:"load(filename)"})," (reads the lines back through ",e.jsx("code",{children:"self.add"}),"; a missing file means an empty class). Load ",e.jsx("code",{children:"marks.txt"})," at start and print ",e.jsx("code",{children:"Loaded 2 students"}),"; on Exit save, print ",e.jsx("code",{children:"Saved 3 students"})," and ",e.jsx("code",{children:"Bye!"}),". The tests check the saved file."]}),starter:x,minLines:80,tests:[v(`PRIYA,87
ARUN,62
`,T,!1),v(null,["1","ravi","64","3"],!0)],requires:[{node:"With",min:2},{node:"Try",min:2}],hints:["load reuses add — so loaded marks are validated too.","FileNotFoundError → pass (Unit 9.3)."],solution:P},card:{id:"card",kind:"make",title:"Report card",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"ReportCard(name)"})," holding a dict of subject → mark, with ",e.jsx("code",{children:"add(subject, mark)"}),", ",e.jsx("code",{children:"average()"}),", ",e.jsx("code",{children:"best()"})," and ",e.jsx("code",{children:"weakest()"})," (each returns a ",e.jsx("code",{children:"(subject, mark)"})," tuple; first wins ties). Ask ",e.jsx("code",{children:"Name: "})," and ",e.jsx("code",{children:"Subjects: "})," (like ",e.jsx("code",{children:"maths:91 physics:78 chemistry:66"}),"). Print ",e.jsx("code",{children:"Priya - average 78.3 (B)"})," (grade by average, using the A–F rule), ",e.jsx("code",{children:"Best: maths (91)"})," and ",e.jsx("code",{children:"Weakest: chemistry (66)"}),"."]}),minLines:28,tests:[{inputs:["Priya","maths:91 physics:78 chemistry:66"],expect:_("Priya","maths:91 physics:78 chemistry:66")},{inputs:["Arun","tamil:40 english:40"],expect:_("Arun","tamil:40 english:40"),hidden:!0}],post:`_c = ReportCard('Z')
_c.add('a', 10)
_c.add('b', 30)
assert _c.average() == 20 and _c.best() == ('b', 30) and _c.weakest() == ('a', 10)`,requires:[{node:"ClassDef"},{node:"FunctionDef",min:5}],hints:['for part in line.split(): subject, mark = part.split(":"); card.add(subject, int(mark))',"best(): best-so-far over self.marks.items(), returning the (subject, mark) tuple.","A grade function (or method) for the average — reuse your A–F rule."],solution:`def grade(mark):
    if mark >= 90:
        return "A"
    elif mark >= 75:
        return "B"
    elif mark >= 60:
        return "C"
    elif mark >= 40:
        return "D"
    return "F"

class ReportCard:
    def __init__(self, name):
        self.name = name
        self.marks = {}

    def add(self, subject, mark):
        self.marks[subject] = mark

    def average(self):
        return sum(self.marks.values()) / len(self.marks)

    def best(self):
        top = None
        for subject, mark in self.marks.items():
            if top is None or mark > top[1]:
                top = (subject, mark)
        return top

    def weakest(self):
        low = None
        for subject, mark in self.marks.items():
            if low is None or mark < low[1]:
                low = (subject, mark)
        return low

card = ReportCard(input("Name: "))
for part in input("Subjects: ").split():
    subject, mark = part.split(":")
    card.add(subject, int(mark))
avg = card.average()
print(f"{card.name} - average {avg:.1f} ({grade(avg)})")
b_subject, b_mark = card.best()
w_subject, w_mark = card.weakest()
print(f"Best: {b_subject} ({b_mark})")
print(f"Weakest: {w_subject} ({w_mark})")`}},B=u,F=[{q:"Why does Classroom.add update with set_mark instead of assigning .mark directly?",options:["Shorter","So every change — even an update — passes the same validation","Faster","Required by Python"],answer:1,explain:"One checkpoint for all changes: encapsulation."},{q:"Why does load() call self.add for each line?",options:["Style","Loaded data gets the same validation and object-building as typed data","To print messages","It must"],answer:1,explain:"Reuse the method instead of duplicating the logic."},{q:"What did moving from dicts (Module 7–9) to classes give the Marks Manager?",options:["Speed","Data and the rules about it live together; each piece has a clear home","Fewer lines","Nothing"],answer:1,explain:"Student knows how to grade itself; Classroom knows how to save itself."},{q:"Which part is polymorphic-ready: print(s) works because…",options:["print knows Student","Student defines __str__, which print calls","Students are strings","Magic"],answer:1,explain:"Special methods let your objects plug into Python's built-ins."}];function V(s){const r=[{label:"The Mission",kicker:"CAPSTONE",title:"Marks Manager 3.0",blocks:[e.jsxs(M,{children:["The Marks Manager's final form. In Module 7 it was a dictionary and a loop; Module 8 split it into functions; Module 9 made it robust and persistent. Now each piece of data gets a class that knows its own rules: a ",e.jsx("strong",{children:"Student"})," validates and grades itself; a ",e.jsx("strong",{children:"Classroom"})," manages, reports, saves and loads its students."]}),e.jsxs(E,{color:R.blue,icon:"🧪",children:["Hidden checks call your classes directly (for example ",e.jsx("code",{children:"Student('Q', 101)"})," must raise InvalidMarkError) and read the file your program saves."]})]},{label:"Version 1",kicker:"BUILD IN STEPS",title:"Version 1: Student objects",blocks:[u.v1]},{label:"Version 2",kicker:"ADD ONE IDEA",title:"Version 2: a Classroom",blocks:[u.v2]},{label:"Version 3",kicker:"ADD ONE MORE",title:"Version 3: save and load",blocks:[u.v3,e.jsx(I,{children:"Every module added one idea to the same program — containers, functions, robustness, objects. That's how real software grows: in working steps."})]},{label:"Make It",kicker:"ON YOUR OWN",title:"Your program: report card",blocks:[u.card]}];return e.jsx(C,{...s,unitId:"Unit10_7",crumb:"MODULE 10 › UNIT 10.7",title:"Capstone: Marks Manager 3.0",sections:r,quiz:F,next:{title:"Computational Thinking II / Module 11",text:"Module 10 complete! The four pillars and OOP are yours. (Optional first: Module 10's Crucible.)"}})}export{B as EXERCISES,V as default};
