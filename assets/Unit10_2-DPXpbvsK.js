import{j as e,r as f}from"./index-5ju0ARcj.js";import{P as _,K as p,L as b,T as s,a as d,t as c,M as g}from"./Lesson-B4adq15Q.js";const j=["class Student:","    def __init__(self, name, mark):","        self.name = name","        self.mark = mark","",'s = Student("Priya", 87)'],m=[{l:5,obj:null,d:'Student("Priya", 87) is called. Python first builds a blank object…'},{l:1,obj:{},d:"…then calls __init__ with that blank object as self, and the arguments as name and mark. You pass 2; Python passes self."},{l:2,obj:{name:'"Priya"'},d:"self.name = name: store the parameter ON the object."},{l:3,obj:{name:'"Priya"',mark:"87"},d:"self.mark = mark. The object is complete."},{l:5,obj:{name:'"Priya"',mark:"87"},tag:!0,d:"__init__ ends; the finished object is tied to the name s."}];function x(){const[n,i]=f.useState(0),t=m[n];return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("pre",{style:{margin:0,fontFamily:d,fontSize:14.5,lineHeight:1.7,background:s.codeBg,border:`1px solid ${s.border}`,borderRadius:10,padding:6},children:j.map((a,r)=>e.jsx("div",{style:{padding:"1px 8px",borderRadius:5,minHeight:20,background:t.l===r?c(s.blue,"22"):"transparent",fontWeight:t.l===r?700:400},children:a},r))}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:8},children:[e.jsx("button",{onClick:()=>i(Math.max(0,n-1)),style:{padding:"8px 12px",borderRadius:8,border:`1px solid ${s.border}`,background:s.card,cursor:"pointer"},children:"◀"}),e.jsx("button",{onClick:()=>i(Math.min(m.length-1,n+1)),style:{padding:"8px 14px",borderRadius:8,border:"none",background:s.navy,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"Next ▶"})]})]}),e.jsxs("div",{children:[t.obj&&e.jsxs("div",{style:{display:"inline-block",border:`2px solid ${s.teal}`,borderRadius:12,padding:"10px 14px",background:c(s.teal,"0C"),minWidth:200},children:[e.jsxs("div",{style:{fontFamily:g,fontSize:11,color:s.teal,letterSpacing:1.2},children:[t.tag?"🏷 s → ":"self → ","Student object"]}),Object.entries(t.obj).map(([a,r])=>e.jsxs("div",{style:{fontFamily:d,fontSize:15},children:[".",a," = ",r]},a)),!Object.keys(t.obj).length&&e.jsx("div",{style:{fontSize:13,color:s.muted},children:"(blank)"})]}),e.jsx("div",{style:{fontSize:14.5,color:s.slate,marginTop:10},children:t.d})]})]})}const k=n=>{let i=n[0];for(const t of n)t[2]>i[2]&&(i=t);return i},h=n=>{const i=n.map(a=>{const[r,l,u]=a.split(",");return[r,Number(l),Number(u)]}),t=k(i);return[...n.map(a=>`Movie: ${a}`),...i.map(([a,r,l])=>`${a} (${r}) - ${l}`),`Best: ${t[0]}`].join(`
`)},o={init:{id:"init",kind:"type",title:"Build a complete object in one line",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"__init__"})," (two underscores each side) runs automatically every time an object is built. ",e.jsx("code",{children:"self"})," is the object being built."]}),show:`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

s1 = Student("Priya", 87)
s2 = Student("Arun", 62)
print(s1.name, s1.mark)
print(s2.name, s2.mark)`,tests:[{expect:`Priya 87
Arun 62`}],post:"assert Student('X', 1).mark == 1",requires:[{node:"FunctionDef"}],hints:["Two underscores before and after init."],solution:`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

s1 = Student("Priya", 87)
s2 = Student("Arun", 62)
print(s1.name, s1.mark)
print(s2.name, s2.mark)`},noself:{id:"noself",kind:"fix",title:"Forgot self (1)",task:e.jsx(e.Fragment,{children:"Run it and read the coach."}),starter:`class Student:
    def __init__(name, mark):
        self.name = name
        self.mark = mark

s = Student("Priya", 87)
print(s.name)`,tests:[{expect:"Priya"}],hints:["Every method's first parameter receives the object: def __init__(self, name, mark):"],solution:`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

s = Student("Priya", 87)
print(s.name)`},noprefix:{id:"noprefix",kind:"fix",title:"Forgot self (2)",task:e.jsx(e.Fragment,{children:"Run it and read the coach. This is the most common class bug of all."}),starter:`class Student:
    def __init__(self, name, mark):
        name = name
        mark = mark

s = Student("Priya", 87)
print(s.name, s.mark)`,tests:[{expect:"Priya 87"}],hints:["name = name just reassigns the local parameter. To store it on the object: self.name = name"],solution:`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

s = Student("Priya", 87)
print(s.name, s.mark)`},rect:{id:"rect",kind:"write",title:"Attributes worked out in __init__",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"Rectangle(length, width)"})," whose ",e.jsx("code",{children:"__init__"})," also stores ",e.jsx("code",{children:"self.area"})," and ",e.jsx("code",{children:"self.perimeter"}),". Ask ",e.jsx("code",{children:"Length: "})," and ",e.jsx("code",{children:"Width: "})," (whole numbers) and print ",e.jsx("code",{children:"Area: 15"})," and ",e.jsx("code",{children:"Perimeter: 16"})," from the object's attributes."]}),tests:[{inputs:["5","3"],expect:`Length: 5
Width: 3
Area: 15
Perimeter: 16`},{inputs:["10","10"],expect:`Length: 10
Width: 10
Area: 100
Perimeter: 40`,hidden:!0}],post:`_r = Rectangle(2, 7)
assert _r.area == 14 and _r.perimeter == 18, 'Rectangle should set .area and .perimeter in __init__'`,requires:[{node:"ClassDef"}],hints:["self.area = length * width",'r = Rectangle(l, w); print(f"Area: {r.area}")'],solution:`class Rectangle:
    def __init__(self, length, width):
        self.length = length
        self.width = width
        self.area = length * width
        self.perimeter = 2 * (length + width)

l = int(input("Length: "))
w = int(input("Width: "))
r = Rectangle(l, w)
print(f"Area: {r.area}")
print(f"Perimeter: {r.perimeter}")`},account:{id:"account",kind:"write",title:"A default in __init__",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"Account(owner, balance=0)"})," — the same default-parameter rule as Unit 8.2. Create ",e.jsx("code",{children:'Account("Priya", 500)'})," and ",e.jsx("code",{children:'Account("Arun")'})," and print ",e.jsx("code",{children:"Priya: Rs 500"})," and ",e.jsx("code",{children:"Arun: Rs 0"}),"."]}),tests:[{expect:`Priya: Rs 500
Arun: Rs 0`}],post:"assert Account('Z').balance == 0 and Account('Y', 5).balance == 5",requires:[{node:"ClassDef"}],hints:["def __init__(self, owner, balance=0):"],solution:`class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

a = Account("Priya", 500)
b = Account("Arun")
for acc in [a, b]:
    print(f"{acc.owner}: Rs {acc.balance}")`},movies:{id:"movies",kind:"make",title:"Movie list",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"Movie(title, year, rating)"}),". Read 3 lines with ",e.jsx("code",{children:"Movie: "}),", each like ",e.jsx("code",{children:"Jailer,2023,7.1"}),"; split, convert (year int, rating float) and build a Movie. Print each as ",e.jsx("code",{children:"Jailer (2023) - 7.1"}),", then ",e.jsx("code",{children:"Best: Vikram"})," (highest rating, first wins ties)."]}),minLines:14,tests:[{inputs:["Jailer,2023,7.1","Vikram,2022,8.3","Leo,2023,7.2"],expect:h(["Jailer,2023,7.1","Vikram,2022,8.3","Leo,2023,7.2"])},{inputs:["A,2000,5.5","B,2001,9.9","C,2002,9.9"],expect:h(["A,2000,5.5","B,2001,9.9","C,2002,9.9"]),hidden:!0}],post:`_m = Movie('T', 2001, 7.5)
assert _m.title == 'T' and _m.year == 2001 and _m.rating == 7.5`,requires:[{node:"ClassDef"}],hints:['title, year, rating = line.split(",")',"best-so-far over the list of Movie objects, comparing .rating"],solution:`class Movie:
    def __init__(self, title, year, rating):
        self.title = title
        self.year = year
        self.rating = rating

movies = []
for i in range(3):
    title, year, rating = input("Movie: ").split(",")
    movies.append(Movie(title, int(year), float(rating)))
best = movies[0]
for m in movies:
    print(f"{m.title} ({m.year}) - {m.rating}")
    if m.rating > best.rating:
        best = m
print(f"Best: {best.title}")`}},v=o,y=[{q:"When does __init__ run?",options:["When the class is defined","Every time an object is created","Only when called by name","At the end of the program"],answer:1,explain:"Student(...) builds an object and runs __init__ on it."},{q:'In Student("Priya", 87), what is self?',options:['"Priya"',"The new object being built","The class","87"],answer:1,explain:"Python passes the new object automatically as the first argument."},{q:"Inside __init__, what does name = name do?",options:["Stores name on the object","Nothing useful — it only reassigns the local parameter","Error","Deletes name"],answer:1,explain:"Use self.name = name to store it on the object."},{q:'def __init__(name, mark) (no self). Student("A", 1) gives…',options:["Works","TypeError: takes 2 positional arguments but 3 were given","NameError","A blank object"],answer:1,explain:"Python passes 3 values (the object + 2 arguments) but the method only takes 2."}];function P(n){const i=[{label:"__init__",kicker:"THE CONSTRUCTOR",title:"Building an object in one line",blocks:[e.jsxs(_,{children:["Setting every attribute by hand after ",e.jsx("code",{children:"Student()"})," is slow and easy to forget. ",e.jsx("code",{children:"__init__"})," is a special method Python runs automatically when an object is built. Step through:"]}),e.jsx(x,{}),o.init]},{label:"Forgetting self",kicker:"THE TWO CLASSIC BUGS",title:"Two ways to forget self",blocks:[o.noself,o.noprefix,e.jsxs(p,{children:["Every method takes ",e.jsx("code",{children:"self"})," first. Anything the object should remember is written ",e.jsx("code",{children:"self.something = …"}),"."]})]},{label:"Richer __init__",kicker:"DEFAULTS · DERIVED VALUES",title:"More than copying parameters",blocks:[o.rect,o.account]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: movie list",blocks:[o.movies]}];return e.jsx(b,{...n,unitId:"Unit10_2",crumb:"MODULE 10 › UNIT 10.2",title:"__init__ & self",sections:i,quiz:y,next:{title:"Unit 10.3 — Methods & Encapsulation",text:"Objects that can DO things — and guard their own data."}})}export{v as EXERCISES,P as default};
