import{j as e,r as l}from"./index-BsB65IVi.js";import{P as d,K as p,L as m,C as h,T as t,t as u,M as b,a as k}from"./Lesson-M2Z85AvF.js";function g(){const[n,i]=l.useState(!1),o=n?["PRIYA","MEENA"]:["PRIYA","ARUN","MEENA"],r=[87,62,91];return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx(h,{title:"three parallel lists",code:`names = ["PRIYA", "ARUN", "MEENA"]
marks = [87, 62, 91]
`+(n?'names.remove("ARUN")   # forgot marks!':"")}),e.jsx("button",{onClick:()=>i(!n),style:{marginTop:8,padding:"8px 14px",borderRadius:8,border:`1.5px solid ${n?t.red:t.border}`,background:n?u(t.red,"12"):t.card,cursor:"pointer",fontFamily:"inherit",fontWeight:700,color:n?t.red:t.text},children:n?"↺ undo":"Remove ARUN from names only ▶"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:b,fontSize:11,letterSpacing:1.2,color:t.bronze,marginBottom:6},children:"WHO HAS WHICH MARK?"}),r.map((c,a)=>e.jsxs("div",{style:{fontFamily:k,fontSize:15,padding:"4px 0",color:n&&a>=1?t.red:t.text},children:[o[a]??"???"," → ",c," ",n&&a===1&&"  ← MEENA now has ARUN's mark!"]},a)),e.jsxs("div",{style:{fontSize:14,color:t.slate,marginTop:8},children:["Separate lists only stay correct if every change hits every list. An ",e.jsx("strong",{children:"object"})," keeps a student's name and mark together, so they can't drift apart."]})]})]})}const s={first:{id:"first",kind:"type",title:"A class and two objects",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"class Student:"})," defines a new type — a blueprint. ",e.jsx("code",{children:"Student()"})," builds one object from it. ",e.jsx("code",{children:"s1.name = …"})," gives that object an attribute (its own variable)."]}),show:`class Student:
    pass

s1 = Student()
s1.name = "Priya"
s1.mark = 87
s2 = Student()
s2.name = "Arun"
s2.mark = 62
print(s1.name, s1.mark)
print(s2.name, s2.mark)
print(type(s1))`,minLines:12,tests:[{expect:`Priya 87
Arun 62
<class '__main__.Student'>`}],requires:[{node:"ClassDef"}],hints:["pass means “empty for now”. Next unit, __init__ fills the attributes in automatically."],solution:`class Student:
    pass

s1 = Student()
s1.name = "Priya"
s1.mark = 87
s2 = Student()
s2.name = "Arun"
s2.mark = 62
print(s1.name, s1.mark)
print(s2.name, s2.mark)
print(type(s1))`},books:{id:"books",kind:"write",title:"A list of objects",task:e.jsxs(e.Fragment,{children:["Define an empty class ",e.jsx("code",{children:"Book"}),". Ask ",e.jsx("code",{children:"Books: "})," (how many), then for each ask ",e.jsx("code",{children:"Title: "})," and ",e.jsx("code",{children:"Pages: "}),", make a Book object with ",e.jsx("code",{children:".title"})," and ",e.jsx("code",{children:".pages"}),", and append it to a list. Print each as ",e.jsx("code",{children:"Wings of Fire (180 pages)"}),", then ",e.jsx("code",{children:"Total pages: 560"}),"."]}),tests:[{inputs:["2","Wings of Fire","180","Ignited Minds","380"],expect:`Books: 2
Title: Wings of Fire
Pages: 180
Title: Ignited Minds
Pages: 380
Wings of Fire (180 pages)
Ignited Minds (380 pages)
Total pages: 560`},{inputs:["1","Godan","312"],expect:`Books: 1
Title: Godan
Pages: 312
Godan (312 pages)
Total pages: 312`,hidden:!0}],requires:[{node:"ClassDef"}],hints:['b = Book(); b.title = input("Title: "); b.pages = int(input("Pages: ")); books.append(b)','for b in books: print(f"{b.title} ({b.pages} pages)")'],solution:`class Book:
    pass

books = []
n = int(input("Books: "))
for i in range(n):
    b = Book()
    b.title = input("Title: ")
    b.pages = int(input("Pages: "))
    books.append(b)
total = 0
for b in books:
    print(f"{b.title} ({b.pages} pages)")
    total += b.pages
print(f"Total pages: {total}")`},alias:{id:"alias",kind:"type",title:"Two names, one object",task:e.jsxs(e.Fragment,{children:["Objects follow the name-tag rules of Unit 4.2 and 7.2: ",e.jsx("code",{children:"b = a"})," doesn't copy an object, it adds a second tag. Predict before running."]}),show:`class Student:
    pass

a = Student()
a.name = "Priya"
b = a
b.name = "Arun"
c = Student()
c.name = "Meena"
print(a.name, b.name, c.name)`,tests:[{expect:"Arun Arun Meena"}],hints:["a and b are the same object; c is a separate one."],solution:`class Student:
    pass

a = Student()
a.name = "Priya"
b = a
b.name = "Arun"
c = Student()
c.name = "Meena"
print(a.name, b.name, c.name)`},typo:{id:"typo",kind:"fix",title:"The mark that didn't change",task:e.jsx(e.Fragment,{children:"Priya's re-evaluated mark is 91, but the report still says 87. No error — run it and look closely at line 7."}),starter:`class Student:
    pass

s = Student()
s.name = "Priya"
s.mark = 87
s.mrak = 91
print(s.name, s.mark)`,tests:[{expect:"Priya 91"}],hints:["Assigning to a misspelt attribute silently creates a NEW attribute. Python can't know you meant mark."],solution:`class Student:
    pass

s = Student()
s.name = "Priya"
s.mark = 87
s.mark = 91
print(s.name, s.mark)`},contacts:{id:"contacts",kind:"make",title:"Contacts book",task:e.jsxs(e.Fragment,{children:["Make an empty class ",e.jsx("code",{children:"Contact"}),". Keep asking ",e.jsx("code",{children:"Add (name phone): "})," until ",e.jsx("code",{children:"done"}),"; each line becomes a Contact with ",e.jsx("code",{children:".name"})," and ",e.jsx("code",{children:".phone"})," in a list. Then ask ",e.jsx("code",{children:"Search: "})," and print ",e.jsx("code",{children:"Arun: 91234 56789"})," or ",e.jsx("code",{children:"Not found"})," (match names ignoring capitals). Finally ",e.jsx("code",{children:"Contacts: 3"}),"."]}),minLines:16,tests:[{inputs:["Priya 98765","Arun 91234","Meena 99887","done","arun"],expect:`Add (name phone): Priya 98765
Add (name phone): Arun 91234
Add (name phone): Meena 99887
Add (name phone): done
Search: arun
Arun: 91234
Contacts: 3`},{inputs:["Ravi 1","done","kavya"],expect:`Add (name phone): Ravi 1
Add (name phone): done
Search: kavya
Not found
Contacts: 1`,hidden:!0}],requires:[{node:"ClassDef"}],hints:["c = Contact(); c.name, c.phone = line.split()","Search with a flag: compare c.name.lower() == wanted.lower()."],solution:`class Contact:
    pass

contacts = []
line = input("Add (name phone): ")
while line != "done":
    c = Contact()
    c.name, c.phone = line.split()
    contacts.append(c)
    line = input("Add (name phone): ")
wanted = input("Search: ")
found = False
for c in contacts:
    if c.name.lower() == wanted.lower():
        print(f"{c.name}: {c.phone}")
        found = True
        break
if not found:
    print("Not found")
print(f"Contacts: {len(contacts)}")`}},y=s,f=[{q:"What's the difference between a class and an object?",options:["None","A class is the blueprint; an object is one thing built from it","An object is the blueprint","Classes hold numbers, objects hold text"],answer:1,explain:"Student is the class; s1 and s2 are objects (instances)."},{q:"Why are objects better than parallel lists for records?",options:["Faster","Each object keeps its own data together, so fields can't drift out of line","Less typing","They sort themselves"],answer:1,explain:"One change can't accidentally break the pairing."},{q:'After b = a and b.name = "Arun", what is a.name?',options:["Unchanged",'"Arun" — a and b are the same object',"Error","None"],answer:1,explain:"= adds a tag; it doesn't copy the object."},{q:"s.mrak = 91 (a typo) does what?",options:["Raises AttributeError","Silently creates a new attribute called mrak","Updates mark","Nothing"],answer:1,explain:"Assignment always works; it's reading a missing attribute that errors."}];function A(n){const i=[{label:"Why Objects?",kicker:"THE NEED",title:"Keep each record's data together",blocks:[e.jsx(d,{children:"Since Module 7 you've stored students as parallel lists or dictionaries. Watch what happens when one change misses one list:"}),e.jsx(g,{}),s.first]},{label:"Many Objects",kicker:"A LIST OF OBJECTS",title:"Objects in a list",blocks:[s.books]},{label:"Tags Again",kicker:"SAME OBJECT OR NEW?",title:"Objects follow the name-tag rules",blocks:[s.alias,s.typo,e.jsxs(p,{children:["Every object is its own value in memory. Names are tags on objects; ",e.jsx("code",{children:"b = a"})," shares one. A misspelt attribute name silently creates a new attribute."]})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: contacts book",blocks:[s.contacts]}];return e.jsx(m,{...n,unitId:"Unit10_1",crumb:"MODULE 10 › UNIT 10.1",title:"Why Objects?",sections:i,quiz:f,next:{title:"Unit 10.2 — __init__ & self",text:"Build complete objects in one line — and meet self."}})}export{y as EXERCISES,A as default};
