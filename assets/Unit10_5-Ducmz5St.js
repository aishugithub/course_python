import{r as m,j as t}from"./index-cyK8cdeM.js";const e={bg:"#0D1117",surface:"#161B22",card:"#1C2333",accent:"#58A6FF",accentGlow:"#1F6FEB",green:"#3FB950",yellow:"#D29922",purple:"#BC8CFF",red:"#F85149",orange:"#F0883E",teal:"#39D0D8",text:"#E6EDF3",muted:"#8B949E",border:"#30363D"},S={fontFamily:"monospace",fontSize:12.5,color:e.text,margin:0,lineHeight:1.8,whiteSpace:"pre-wrap"},w=(n,i)=>t.jsxs("div",{style:{marginTop:16,background:n+"18",border:`1px solid ${n}44`,borderRadius:8,padding:"12px 16px",fontSize:13,color:e.muted,lineHeight:1.7},children:["🔑 ",i]}),C=n=>n>=90?"A":n>=75?"B":n>=50?"C":"F";function z(){const n=[{tool:"class + __init__",from:"Units 10.1-10.2",why:"a Student object bundles name + mark, built in one line"},{tool:"methods (self)",from:"Unit 10.3",why:"student.grade() — the student grades itself"},{tool:"__str__",from:"Unit 10.3",why:"print(student) shows 'Asha (85, B)', not gibberish"},{tool:"a class that OWNS a list",from:"Units 10.1 + 7.2",why:"Classroom holds a list of Student objects and the operations on them"},{tool:"files + FileNotFoundError",from:"Units 9.3-9.4",why:"Classroom.save() and .load() persist the roster to CSV"},{tool:"menu loop",from:"Module 6",why:"Add / Report / Save & Exit — now calling Classroom methods"}],[i,a]=m.useState([]),d=s=>a(o=>o.includes(s)?o.filter(u=>u!==s):[...o,s]);return t.jsxs("div",{children:[t.jsxs("p",{style:{color:e.muted,fontSize:13,marginBottom:16,lineHeight:1.7},children:["Third and final rebuild of the Marks Manager. In Module 8 it became modular functions; in Module 9, robust and persistent. Now it becomes ",t.jsx("strong",{style:{color:e.text},children:"object-oriented"}),": a",t.jsx("code",{style:{color:e.teal},children:" Student"})," class that grades itself, and a",t.jsx("code",{style:{color:e.teal},children:" Classroom"})," class that owns them all. Tick your toolkit."]}),t.jsxs("div",{style:{background:e.card,border:`1px solid ${e.border}`,borderRadius:10,padding:16,marginBottom:14},children:[t.jsx("div",{style:{color:e.orange,fontWeight:700,fontSize:12,marginBottom:12},children:"📋 THE SPEC — Marks Manager 3.0"}),t.jsx("pre",{style:S,children:`class Student   → name, mark, grade(), __str__
class Classroom → holds [Student], with:
    add(name, mark)   report()   average()
    save(file)        load(file)
main menu       → Add / Report / Save & Exit`})]}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:n.map((s,o)=>t.jsxs("div",{onClick:()=>d(o),style:{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:8,background:i.includes(o)?e.green+"14":e.card,border:`1.5px solid ${i.includes(o)?e.green:e.border}`,cursor:"pointer",transition:"all 0.2s"},children:[t.jsx("div",{style:{width:22,height:22,borderRadius:6,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${i.includes(o)?e.green:e.muted}`,background:i.includes(o)?e.green:"transparent",color:"#fff",fontSize:13,fontWeight:700},children:i.includes(o)?"✓":""}),t.jsxs("div",{children:[t.jsx("span",{style:{fontFamily:"monospace",fontSize:12.5,color:i.includes(o)?e.green:e.text,fontWeight:600},children:s.tool}),t.jsxs("span",{style:{fontSize:11.5,color:e.accent,marginLeft:8},children:["(",s.from,")"]}),t.jsx("div",{style:{fontSize:11.5,color:e.muted,marginTop:2},children:s.why})]})]},o))}),i.length===n.length&&t.jsx("div",{style:{marginTop:14,padding:"12px 16px",borderRadius:8,background:e.green+"18",border:`1px solid ${e.green}55`,color:e.green,fontSize:13,fontWeight:600,textAlign:"center"},children:"🎯 Objects all the way down. Let's build it!"}),w(e.purple,t.jsxs(t.Fragment,{children:[t.jsx("strong",{style:{color:e.purple},children:'Objects turn "data + functions" into "things that act".'})," A Student isn't a name in one dict and a mark in another anymore — it's one thing that knows its own grade and how to describe itself. A Classroom isn't loose variables — it's one thing that manages its students."]}))]})}function R(){const[n,i]=m.useState(0),a=[{label:"v1 — the dict version (9.4)",color:e.red,note:"Where Module 9 left off: a dict of name→mark, with free functions doing the work.",warn:"A 'student' is just a key with a number. The grade logic lives in a separate function you must remember to call with the right value. Data here, behaviour there — they're not connected.",code:`marks = {}          # name -> mark

def grade(mark):
    if mark >= 90: return "A"
    ...

marks["Asha"] = 85
print("Asha", grade(marks["Asha"]))`},{label:"v2 — a Student class",color:e.yellow,note:"Units 10.1-10.3: bundle each student's data AND behaviour into one object.",warn:"Much better — a Student grades and describes itself. But the ROSTER is still a loose list plus separate save/load/report functions floating around. Who owns the collection?",code:`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark
    def grade(self):
        if self.mark >= 90: return "A"
        elif self.mark >= 75: return "B"
        elif self.mark >= 50: return "C"
        else: return "F"
    def __str__(self):
        return (self.name + " (" + str(self.mark)
                + ", " + self.grade() + ")")

students = [Student("Asha", 85), Student("Ravi", 72)]
for s in students:
    print(s)          # __str__ does the formatting`},{label:"v3 — a Classroom class",color:e.green,note:"Unit 10.1's idea applied again: make ONE object that owns the list and all the operations on it.",warn:null,code:`class Classroom:
    def __init__(self):
        self.students = []          # holds Student objects

    def add(self, name, mark):
        self.students.append(Student(name, mark))

    def report(self):
        for s in self.students:
            print(s)                # each Student's __str__

    def average(self):
        if not self.students:
            return 0
        total = 0
        for s in self.students:
            total += s.mark
        return total / len(self.students)

room = Classroom()
room.add("Asha", 85)
room.add("Ravi", 72)
room.report()
print("Average:", room.average())`}],d=a[n];return t.jsxs("div",{children:[t.jsx("p",{style:{color:e.muted,fontSize:13,marginBottom:16,lineHeight:1.7},children:"Three passes: loose dict → a Student object → a Classroom that owns everything. Each step pulls related data and behaviour into one place."}),t.jsx("div",{style:{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"},children:a.map((s,o)=>t.jsx("button",{onClick:()=>i(o),style:{padding:"8px 14px",borderRadius:8,fontSize:12.5,fontWeight:600,cursor:"pointer",background:n===o?s.color+"22":e.card,color:n===o?s.color:e.muted,border:`1.5px solid ${n===o?s.color:e.border}`},children:s.label},o))}),t.jsxs("div",{style:{background:e.card,border:`1.5px solid ${d.color}55`,borderRadius:10,padding:16,marginBottom:12},children:[t.jsx("div",{style:{fontSize:12.5,color:d.color,fontWeight:600,marginBottom:10,lineHeight:1.6},children:d.note}),t.jsx("pre",{style:{...S,maxHeight:360,overflowY:"auto"},children:d.code})]}),d.warn?t.jsxs("div",{style:{background:e.red+"12",border:`1px solid ${e.red}44`,borderRadius:8,padding:"10px 14px",fontSize:12.5,color:e.muted,lineHeight:1.6},children:["⛔ ",t.jsx("strong",{style:{color:e.red},children:"Why we keep going:"})," ",d.warn]}):t.jsxs("div",{style:{background:e.green+"12",border:`1px solid ${e.green}44`,borderRadius:8,padding:"10px 14px",fontSize:12.5,color:e.muted,lineHeight:1.6},children:["✅ ",t.jsx("strong",{style:{color:e.green},children:"Now it's fully object-oriented:"})," the Classroom owns its students and every operation on them is a method. Add save()/load() (next tab) and the whole app is two tidy classes instead of scattered variables and functions."]}),w(e.accent,t.jsxs(t.Fragment,{children:[t.jsx("strong",{style:{color:e.accent},children:"Group data with the code that works on it."})," A Student owns its grade logic; a Classroom owns its roster and reports. That grouping is what keeps a growing program from turning into a pile of loose globals."]}))]})}function $(){const[n,i]=m.useState([{name:"Asha",mark:85},{name:"Ravi",mark:72}]),[a,d]=m.useState([{name:"Asha",mark:85},{name:"Ravi",mark:72}]),[s,o]=m.useState(""),[u,b]=m.useState(""),[y,j]=m.useState([{t:"sys",s:"room.load('marks.csv') → 2 Student objects"}]),c=r=>j(l=>[...l.slice(-9),...r]),h=()=>{const r=s.trim();if(!r){c([{t:"err",s:"Name cannot be empty!"}]);return}if(!/^\d+$/.test(u.trim())){c([{t:"in",s:`> room.add("${r}", "${u}")`},{t:"err",s:"  ✗ mark must be a whole number. Not added."}]);return}const l=parseInt(u.trim(),10);if(l<0||l>100){c([{t:"in",s:`> room.add("${r}", ${l})`},{t:"err",s:"  ✗ mark must be 0-100. Not added."}]);return}i(_=>[..._,{name:r,mark:l}]),c([{t:"in",s:`> room.add("${r}", ${l})`},{t:"ok",s:`  ✓ Student("${r}", ${l}) created → ${r} (${l}, ${C(l)})`}]),o(""),b("")},p=()=>{if(n.length===0){c([{t:"in",s:"> room.report()"},{t:"err",s:"  (no students)"}]);return}const r=(n.reduce((l,_)=>l+_.mark,0)/n.length).toFixed(1);c([{t:"in",s:"> room.report()"},...n.map(l=>({t:"out",s:`  ${l.name} (${l.mark}, ${C(l.mark)})`})),{t:"out",s:`  Average: ${r}`}])},x=()=>{d(n.map(r=>({...r}))),c([{t:"in",s:"> room.save('marks.csv')"},{t:"ok",s:`  💾 wrote ${n.length} rows to marks.csv`}])},g=()=>{i(a.map(r=>({...r}))),c([{t:"sys",s:"— app closed —"},{t:"sys",s:`Classroom().load() → ${a.length} Student objects`}])},k={sys:e.muted,in:e.accent,ok:e.green,out:e.text,err:e.red},v=a.length?a.map(r=>`${r.name},${r.mark}`).join(`
`)+`
`:"(empty)",f=JSON.stringify(n)!==JSON.stringify(a);return t.jsxs("div",{children:[t.jsxs("p",{style:{color:e.muted,fontSize:13,marginBottom:16,lineHeight:1.7},children:["A live Classroom holding Student objects. Add students (each becomes a ",t.jsx("code",{style:{color:e.teal},children:"Student"}),"), run ",t.jsx("code",{style:{color:e.accent},children:"report()"})," to see every object's __str__ and grade, then Save and reopen to watch them reload as objects."]}),t.jsxs("div",{style:{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"flex-end"},children:[t.jsxs("div",{children:[t.jsx("label",{style:{color:e.muted,fontSize:11,display:"block",marginBottom:4},children:"Name"}),t.jsx("input",{value:s,onChange:r=>o(r.target.value),placeholder:"Priya",style:{padding:"9px 12px",borderRadius:8,background:e.card,color:e.text,fontSize:13,border:`1.5px solid ${e.border}`,outline:"none",width:110,fontFamily:"monospace"}})]}),t.jsxs("div",{children:[t.jsx("label",{style:{color:e.muted,fontSize:11,display:"block",marginBottom:4},children:"Mark"}),t.jsx("input",{value:u,onChange:r=>b(r.target.value),onKeyDown:r=>r.key==="Enter"&&h(),placeholder:"90",style:{padding:"9px 12px",borderRadius:8,background:e.card,color:e.text,fontSize:13,border:`1.5px solid ${e.border}`,outline:"none",width:90,fontFamily:"monospace"}})]}),t.jsx("button",{onClick:h,style:{padding:"9px 14px",borderRadius:8,background:e.green+"22",color:e.green,border:`1.5px solid ${e.green}`,fontWeight:600,fontSize:12.5,cursor:"pointer"},children:"+ add"}),t.jsx("button",{onClick:p,style:{padding:"9px 14px",borderRadius:8,background:e.accentGlow,color:"#fff",border:"none",fontWeight:600,fontSize:12.5,cursor:"pointer"},children:"📋 report"}),t.jsxs("button",{onClick:x,style:{padding:"9px 14px",borderRadius:8,background:f?e.orange+"22":e.card,color:f?e.orange:e.muted,border:`1.5px solid ${f?e.orange:e.border}`,fontWeight:600,fontSize:12.5,cursor:"pointer"},children:["💾 save",f?" *":""]}),t.jsx("button",{onClick:g,style:{padding:"9px 14px",borderRadius:8,background:e.card,color:e.text,border:`1.5px solid ${e.border}`,fontWeight:600,fontSize:12.5,cursor:"pointer"},children:"🔄 reopen"})]}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1.25fr 1fr",gap:12},children:[t.jsxs("div",{style:{background:"#010409",border:`1px solid ${e.border}`,borderRadius:10,padding:14,minHeight:190},children:[t.jsx("div",{style:{color:e.muted,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:8},children:"CONSOLE"}),y.map((r,l)=>t.jsx("div",{style:{fontFamily:"monospace",fontSize:11.5,lineHeight:1.75,color:k[r.t],whiteSpace:"pre-wrap"},children:r.s},l))]}),t.jsxs("div",{style:{background:e.card,border:`1px solid ${e.teal}44`,borderRadius:10,padding:14,minHeight:190},children:[t.jsx("div",{style:{color:e.teal,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:8},children:"📄 marks.csv (on disk)"}),t.jsx("pre",{style:{...S,color:e.text,fontSize:12},children:v}),f&&t.jsx("div",{style:{color:e.orange,fontSize:11,marginTop:8},children:"⚠ unsaved objects in memory — hit 💾 save."})]})]}),w(e.green,t.jsxs(t.Fragment,{children:[t.jsx("strong",{style:{color:e.green},children:"The Classroom coordinates; each Student does its own bit."})," report() just loops and lets every Student format and grade itself. Save writes their data; reopen rebuilds them as fresh objects. Small objects, cleanly connected — the whole point of OOP."]}))]})}function B(){const n=`# Marks Manager 3.0 — Object-Oriented edition
# Foothold Module 10 Capstone

class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def grade(self):
        if self.mark >= 90:
            return "A"
        elif self.mark >= 75:
            return "B"
        elif self.mark >= 50:
            return "C"
        else:
            return "F"

    def __str__(self):
        return self.name + " (" + str(self.mark) + ", " + self.grade() + ")"


class Classroom:
    def __init__(self):
        self.students = []                 # a list of Student objects

    def add(self, name, mark):
        self.students.append(Student(name, mark))

    def report(self):
        if len(self.students) == 0:
            print("No students yet!")
            return
        for s in self.students:
            print(" ", s)                  # uses Student.__str__
        print("Average:", self.average())

    def average(self):
        if len(self.students) == 0:
            return 0
        total = 0
        for s in self.students:
            total = total + s.mark
        return total / len(self.students)

    def save(self, filename):
        with open(filename, "w") as f:
            for s in self.students:
                f.write(s.name + "," + str(s.mark) + "\\n")
        print("Saved", len(self.students), "students.")

    def load(self, filename):
        try:
            with open(filename, "r") as f:
                for line in f:
                    line = line.strip()
                    if line == "":
                        continue
                    name, mark = line.split(",")
                    self.add(name, int(mark))
        except FileNotFoundError:
            print("No saved file yet — starting fresh.")


# ── main program ──
room = Classroom()
room.load("marks.csv")

while True:
    print()
    print("1. Add  2. Report  3. Save & Exit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Name: ")
        mark = int(input("Mark: "))
        room.add(name, mark)
    elif choice == "2":
        room.report()
    elif choice == "3":
        room.save("marks.csv")
        print("Goodbye!")
        break
    else:
        print("Please choose 1, 2 or 3.")`,i=[{icon:"🥉",text:"Add a topper() method to Classroom that RETURNS the Student with the highest mark (best-so-far pattern, Unit 7.3), then print(room.topper()) — its __str__ does the rest."},{icon:"🥈",text:"Reuse the ask_mark() validation loop from Unit 9.4 so room.add can never store an invalid mark — or better, put a set_mark guard method (Unit 10.3) inside Student."},{icon:"🥇",text:"Make a Person base class with name, then Student(Person) and Teacher(Person) (Unit 10.4). Give Classroom a mix and let each describe() itself in a report."}];return t.jsxs("div",{children:[t.jsx("p",{style:{color:e.muted,fontSize:13,marginBottom:16,lineHeight:1.7},children:"The complete two-class program — your Marks Manager, fully object-oriented and still persistent. Run it, add students, exit, run again: the Classroom loads them straight back as Student objects."}),t.jsx("div",{style:{background:e.card,border:`1px solid ${e.border}`,borderRadius:10,padding:16,marginBottom:16,maxHeight:440,overflowY:"auto"},children:t.jsx("pre",{style:S,children:n})}),t.jsx("div",{style:{color:e.orange,fontWeight:700,fontSize:13,marginBottom:10},children:"⚡ CHALLENGE UPGRADES"}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:i.map((a,d)=>t.jsxs("div",{style:{display:"flex",gap:10,background:e.card,border:`1px solid ${e.border}`,borderRadius:8,padding:"10px 14px",fontSize:12.5,color:e.muted,lineHeight:1.6},children:[t.jsx("span",{style:{fontSize:16},children:a.icon}),t.jsx("span",{children:a.text})]},d))}),w(e.purple,t.jsxs(t.Fragment,{children:[t.jsx("strong",{style:{color:e.purple},children:"Look how far the same app has come:"})," Module 8 gave it functions, Module 9 gave it robustness and files, Module 10 gave it objects. You've now met the full toolkit of core Python — the next module makes you fluent in it: comprehensions, modules, pip, and the wider ecosystem."]}))]})}function A({onComplete:n}){const i=[{q:"In Marks Manager 3.0, what does a Classroom object own?",options:["A single student's mark","A list of Student objects plus the methods that operate on them","Only the CSV file","The grade() function"],answer:1,explain:"Classroom holds self.students (a list of Student objects) and the operations — add, report, average, save, load — as methods. It owns the collection AND the behaviour."},{q:"room.report() just does `for s in self.students: print(s)`. How does each line come out nicely formatted?",options:["report() formats each student","print(s) calls each Student's __str__ method","It doesn't — it prints gibberish","The CSV file formats it"],answer:1,explain:"print(s) triggers Student.__str__, so each object formats itself as 'Asha (85, B)'. The Classroom doesn't need to know how a student is displayed — the Student decides."},{q:"Why is `class Student` with a grade() method better than a name→mark dict plus a free grade(mark) function?",options:["It runs faster","Data and the behaviour that belongs to it are bundled in one self-contained object","Dicts can't hold numbers","Functions are not allowed"],answer:1,explain:"The object keeps a student's data and its grade logic together. You call asha.grade() with no risk of passing the wrong value — the behaviour travels with the data it needs."},{q:"Classroom.load() wraps its file reading in try/except FileNotFoundError. Why?",options:["To make it slower","So the very first run (no file yet) starts with an empty classroom instead of crashing","To encrypt the file","It's not needed"],answer:1,explain:"On the first run marks.csv doesn't exist, so open() would raise FileNotFoundError. Catching it lets the app start fresh gracefully — the same robustness idea from Unit 9.4, now inside a method."}],[a,d]=m.useState(0),[s,o]=m.useState(null),[u,b]=m.useState(0),[y,j]=m.useState(!1),c=x=>{s===null&&(o(x),x===i[a].answer&&b(g=>g+1))},h=()=>{a<i.length-1?(d(x=>x+1),o(null)):(j(!0),n&&n())};if(y)return t.jsxs("div",{style:{textAlign:"center",padding:20},children:[t.jsx("div",{style:{fontSize:52},children:u>=3?"🏆":"👍"}),t.jsxs("div",{style:{fontSize:24,fontWeight:700,color:e.text,marginTop:10},children:["You scored ",u," / ",i.length]}),t.jsx("div",{style:{color:e.muted,marginTop:8,marginBottom:20},children:u===4?"Perfect! You can model a whole app as cooperating objects.":u>=2?"Good work! Replay 'Build in Steps' — the dict → Student → Classroom journey is the core idea.":"Worth a replay: 'Build in Steps' and 'Play It'. Objects bundle data with behaviour; a Classroom owns its Students."}),t.jsxs("div",{style:{padding:"20px",borderRadius:12,background:`linear-gradient(135deg, ${e.green}22, ${e.purple}22)`,border:`1px solid ${e.green}55`},children:[t.jsx("div",{style:{color:e.green,fontWeight:700,fontSize:16,marginBottom:8},children:"🏆 Module 10 Complete — You Think in Objects!"}),t.jsxs("div",{style:{color:e.muted,fontSize:13,lineHeight:1.7},children:["Classes, __init__ and self, methods, encapsulation, __str__, and inheritance — and an entire app rebuilt as cooperating objects. This is the second great mental model of programming, after functions.",t.jsx("br",{}),t.jsx("br",{}),t.jsx("strong",{style:{color:e.accent},children:"Next: Module 11 — Pythonic Python & the Ecosystem."})," You can build anything now; time to build it the ",t.jsx("em",{children:"Python"})," way — comprehensions, modules, pip, and the huge world of libraries that makes Python, Python."]})]})]});const p=i[a];return t.jsxs("div",{children:[t.jsxs("div",{style:{color:e.muted,fontSize:12,marginBottom:8},children:["Question ",a+1," of ",i.length]}),t.jsx("div",{style:{color:e.text,fontWeight:600,fontSize:14,marginBottom:16,whiteSpace:"pre-wrap",fontFamily:p.q.includes("`")||p.q.includes("(")?"monospace":"inherit"},children:p.q}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:p.options.map((x,g)=>{let k=e.card,v=e.border,f=e.text;return s!==null&&(g===p.answer?(k=e.green+"22",v=e.green,f=e.green):g===s&&(k=e.red+"22",v=e.red,f=e.red)),t.jsxs("button",{onClick:()=>c(g),style:{textAlign:"left",padding:"10px 14px",borderRadius:8,background:k,border:`1.5px solid ${v}`,color:f,cursor:s!==null?"default":"pointer",fontSize:13,transition:"all 0.25s"},children:[g===p.answer&&s!==null?"✓ ":g===s&&s!==p.answer?"✗ ":"",x]},g)})}),s!==null&&t.jsxs("div",{style:{marginTop:12,padding:"10px 14px",borderRadius:8,background:e.purple+"18",border:`1px solid ${e.purple}44`,color:e.muted,fontSize:13,lineHeight:1.6},children:["💡 ",p.explain]}),s!==null&&t.jsx("button",{onClick:h,style:{marginTop:14,padding:"10px 24px",borderRadius:8,background:e.accentGlow,border:"none",color:"#fff",fontWeight:600,cursor:"pointer",fontSize:14},children:a<i.length-1?"Next Question →":"See Results"})]})}function W({student:n,onUnitComplete:i}){const a=[{id:"mission",label:"The Mission"},{id:"steps",label:"Build in Steps"},{id:"play",label:"Play It"},{id:"code",label:"Full Code"},{id:"quiz",label:"Quiz & Wrap-up"}],[d,s]=m.useState(0),[o,u]=m.useState([]),b=c=>{o.includes(c)||u(h=>[...h,c])},y=()=>{b(d),s(c=>Math.min(a.length-1,c+1))},j=[t.jsxs("div",{children:[t.jsx("h3",{style:{color:e.text,marginBottom:6},children:"The Mission: Objects All the Way Down"}),t.jsx(z,{})]}),t.jsxs("div",{children:[t.jsx("h3",{style:{color:e.text,marginBottom:6},children:"From Dict to Classroom"}),t.jsx(R,{})]}),t.jsxs("div",{children:[t.jsx("h3",{style:{color:e.text,marginBottom:6},children:"Play It: A Live Classroom"}),t.jsx($,{})]}),t.jsxs("div",{children:[t.jsx("h3",{style:{color:e.text,marginBottom:6},children:"The Full Code — Run It For Real"}),t.jsx(B,{})]}),t.jsxs("div",{children:[t.jsx("h3",{style:{color:e.text,marginBottom:6},children:"Quick Quiz"}),t.jsx("p",{style:{color:e.muted,fontSize:13,marginBottom:20},children:"4 questions to close out Module 10."}),t.jsx(A,{onComplete:()=>{b(4),i&&i()}})]})];return t.jsxs("div",{style:{background:e.bg,minHeight:"100vh",fontFamily:"'Segoe UI', system-ui, sans-serif",color:e.text,paddingBottom:40},children:[t.jsxs("div",{style:{background:e.surface,borderBottom:`1px solid ${e.border}`,padding:"14px 24px",display:"flex",alignItems:"center",gap:12},children:[t.jsx("div",{style:{width:32,height:32,borderRadius:8,background:e.accentGlow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:"🐍"}),t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:12,color:e.muted,letterSpacing:1},children:"MODULE 10 › UNIT 10.5"}),t.jsx("div",{style:{fontSize:15,fontWeight:600},children:"Capstone: Marks Manager 3.0"})]}),t.jsxs("div",{style:{marginLeft:"auto",fontSize:12,color:e.muted},children:[o.length," / ",a.length," done"]})]}),t.jsx("div",{style:{height:3,background:e.border},children:t.jsx("div",{style:{height:"100%",width:`${o.length/a.length*100}%`,background:e.green,transition:"width 0.4s ease"}})}),t.jsxs("div",{style:{maxWidth:780,margin:"0 auto",padding:"24px 16px"},children:[t.jsx("div",{style:{display:"flex",gap:4,marginBottom:24,background:e.surface,borderRadius:10,padding:4,border:`1px solid ${e.border}`,flexWrap:"wrap"},children:a.map((c,h)=>t.jsxs("button",{onClick:()=>s(h),style:{flex:1,minWidth:80,padding:"8px 6px",borderRadius:7,background:d===h?e.accentGlow:"transparent",border:"none",color:d===h?"#fff":e.muted,cursor:"pointer",fontSize:11,fontWeight:d===h?600:400,display:"flex",alignItems:"center",justifyContent:"center",gap:4,transition:"all 0.2s"},children:[o.includes(h)&&t.jsx("span",{style:{color:e.green},children:"✓"}),c.label]},h))}),t.jsx("div",{style:{background:e.surface,borderRadius:12,padding:"24px 20px",border:`1px solid ${e.border}`,minHeight:300},children:j[d]}),d<a.length-1&&t.jsx("button",{onClick:y,style:{marginTop:16,width:"100%",padding:"12px",borderRadius:8,background:e.accentGlow,border:"none",color:"#fff",fontWeight:600,fontSize:14,cursor:"pointer"},children:"Mark Complete & Continue →"})]})]})}export{W as default};
