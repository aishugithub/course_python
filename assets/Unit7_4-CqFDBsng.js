import{j as e,r as b}from"./index-BQ9ta_BJ.js";import{P as p,K as x,T as t,L as k,a as f}from"./Lesson-DNKKUv9k.js";const u={margin:0,fontFamily:f,fontSize:14.5,lineHeight:1.7,background:t.codeBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",whiteSpace:"pre-wrap"};function g(){const[i,r]=b.useState("list"),s=i==="list";return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:8,marginBottom:8},children:["list","tuple"].map(n=>e.jsxs("button",{onClick:()=>r(n),style:{padding:"8px 14px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",fontWeight:700,border:`1.5px solid ${i===n?t.navy:t.border}`,background:i===n?t.navy:t.card,color:i===n?"#fff":t.text},children:["as a ",n," ",n==="list"?"[ ]":"( )"]},n))}),e.jsx("pre",{style:u,children:s?`dob = [14, 11, 2006]   # birthday
...
dob[0] = 25            # a bug, 300 lines later
print(dob)`:`dob = (14, 11, 2006)   # birthday
...
dob[0] = 25            # the same bug
print(dob)`})]}),e.jsxs("div",{children:[e.jsx("pre",{style:{...u,background:t.termBg,color:s?t.termText:t.termErr},children:s?"[25, 11, 2006]":`TypeError: 'tuple' object does not
support item assignment`}),e.jsx("div",{style:{fontSize:14.5,color:s?t.red:t.green,marginTop:8,lineHeight:1.6},children:s?"No error. Someone's birthday silently changed — and you'll find out weeks later.":"The tuple refuses, loudly, at the exact line. For data that must never change, that lock is a feature."})]})]})}const m=(i,r)=>i.map((s,n)=>`${s}: ${r[n]}`).join(`
`),h=(i,r)=>{const s=i.split(" "),n=r.split(" ").map(Number),o=[`Names: ${i}`,`Marks: ${r}`];s.forEach((c,l)=>o.push(`${l+1}. ${c} - ${n[l]}`));let d=0;return n.forEach((c,l)=>{c>n[d]&&(d=l)}),o.push(`Topper: ${s[d]} (${n[d]})`),o.push(`Class average: ${(n.reduce((c,l)=>c+l,0)/n.length).toFixed(1)}`),o.join(`
`)},a={basics:{id:"basics",kind:"type",title:"Making tuples",task:e.jsxs(e.Fragment,{children:["Round brackets, commas between items. A tuple with ",e.jsx("strong",{children:"one"})," item needs a trailing comma — brackets alone are just maths brackets."]}),show:`dob = (14, 11, 2006)
print(dob[0], dob[-1], len(dob))
one = (5,)
not_tuple = (5)
print(type(one))
print(type(not_tuple))
print(dob.count(11), dob.index(2006))`,minLines:8,tests:[{expect:`14 2006 3
<class 'tuple'>
<class 'int'>
1 2`}],hints:["(5) is just 5 in brackets. (5,) is a tuple holding 5."],solution:`dob = (14, 11, 2006)
print(dob[0], dob[-1], len(dob))
one = (5,)
not_tuple = (5)
print(type(one))
print(type(not_tuple))
print(dob.count(11), dob.index(2006))`},locked:{id:"locked",kind:"fix",title:"Correcting a locked record",task:e.jsxs(e.Fragment,{children:["The year in this record is wrong; it should be 2007. You can't change a tuple in place — run it and see. Make a ",e.jsx("strong",{children:"new"})," tuple with the corrected year (keep the variable name ",e.jsx("code",{children:"dob"}),")."]}),starter:`dob = (14, 11, 2006)
dob[2] = 2007
print(dob)`,tests:[{expect:"(14, 11, 2007)"}],hints:["Build a new tuple from the old one: (dob[0], dob[1], 2007)","Or join tuples: dob[:2] + (2007,) — note the comma."],solution:`dob = (14, 11, 2006)
dob = (dob[0], dob[1], 2007)
print(dob)`},unpack:{id:"unpack",kind:"type",title:"Packing and unpacking",task:e.jsxs(e.Fragment,{children:["Commas pack values into a tuple; names on the left of ",e.jsx("code",{children:"="})," unpack it, one name per item. The last two lines are Python's famous one-line swap."]}),show:`student = ("Priya", "22CS1042", 8.7)
name, roll, cgpa = student
print(name)
print(f"{roll}: {cgpa}")
a, b = 1, 2
a, b = b, a
print(a, b)`,tests:[{expect:`Priya
22CS1042: 8.7
2 1`}],hints:["a, b = b, a: the right side is packed into a tuple FIRST, then unpacked into a and b."],solution:`student = ("Priya", "22CS1042", 8.7)
name, roll, cgpa = student
print(name)
print(f"{roll}: {cgpa}")
a, b = 1, 2
a, b = b, a
print(a, b)`},swap:{id:"swap",kind:"modify",title:"The cups, in one line",task:e.jsx(e.Fragment,{children:"In Unit 4.2 you swapped the cups with a third variable. Now replace the three swap lines with one tuple swap."}),starter:`cup1 = "tea"
cup2 = "coffee"
temp = cup1
cup1 = cup2
cup2 = temp
print("cup1 has", cup1)
print("cup2 has", cup2)`,tests:[{expect:`cup1 has coffee
cup2 has tea`}],forbids:[{name:"temp",msg:"No temp needed any more — swap with cup1, cup2 = cup2, cup1."}],hints:["cup1, cup2 = cup2, cup1"],solution:`cup1 = "tea"
cup2 = "coffee"
cup1, cup2 = cup2, cup1
print("cup1 has", cup1)
print("cup2 has", cup2)`},toomany:{id:"toomany",kind:"fix",title:"Not enough names",task:e.jsx(e.Fragment,{children:"Run it and read the coach. Unpack all three items and print them on one line."}),starter:`student = ("Priya", "22CS1042", 8.7)
name, roll = student
print(name, roll)`,tests:[{expect:"Priya 22CS1042 8.7"}],hints:["Three items need three names on the left."],solution:`student = ("Priya", "22CS1042", 8.7)
name, roll, cgpa = student
print(name, roll, cgpa)`},divmod:{id:"divmod",kind:"write",title:"divmod returns a tuple",task:e.jsxs(e.Fragment,{children:["The built-in ",e.jsx("code",{children:"divmod(a, b)"})," returns the tuple ",e.jsx("code",{children:"(a // b, a % b)"}),". Redo Unit 4.4's minutes-to-hours: ask ",e.jsx("code",{children:"Minutes: "}),", unpack ",e.jsx("code",{children:"divmod(total, 60)"})," into two names in one line, and print ",e.jsx("code",{children:"2 hours 5 minutes"}),"."]}),tests:[{inputs:["125"],expect:`Minutes: 125
2 hours 5 minutes`},{inputs:["59"],expect:`Minutes: 59
0 hours 59 minutes`,hidden:!0}],requires:[{call:"divmod"}],hints:["hours, mins = divmod(total, 60)"],solution:`total = int(input("Minutes: "))
hours, mins = divmod(total, 60)
print(hours, "hours", mins, "minutes")`},records:{id:"records",kind:"type",title:"A list of tuples",task:e.jsxs(e.Fragment,{children:["The classic shape for a table of records: a ",e.jsx("strong",{children:"list"})," (it can grow) of ",e.jsx("strong",{children:"tuples"})," (each record is fixed). Unpack right in the for line."]}),show:`students = [("Priya", 87), ("Arun", 72), ("Meena", 95)]
students.append(("Ravi", 64))
for name, mark in students:
    print(f"{name}: {mark}")`,tests:[{expect:`Priya: 87
Arun: 72
Meena: 95
Ravi: 64`}],hints:['append gets ONE argument: the tuple ("Ravi", 64) — mind the double brackets.'],solution:`students = [("Priya", 87), ("Arun", 72), ("Meena", 95)]
students.append(("Ravi", 64))
for name, mark in students:
    print(f"{name}: {mark}")`},enum:{id:"enum",kind:"write",title:"enumerate: number the items",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"enumerate(items, start=1)"})," hands you ",e.jsx("code",{children:"(position, item)"})," tuples. Ask ",e.jsx("code",{children:"Names: "})," (one line, separated by spaces) and print a numbered list: ",e.jsx("code",{children:"1. Priya"}),", ",e.jsx("code",{children:"2. Arun"}),"…"]}),tests:[{inputs:["Priya Arun Meena"],expect:`Names: Priya Arun Meena
1. Priya
2. Arun
3. Meena`},{inputs:["Ravi"],expect:`Names: Ravi
1. Ravi`,hidden:!0}],requires:[{call:"enumerate"}],hints:['for i, name in enumerate(names, start=1): print(f"{i}. {name}")'],solution:`names = input("Names: ").split()
for i, name in enumerate(names, start=1):
    print(f"{i}. {name}")`},zip:{id:"zip",kind:"write",title:"zip: walk two lists together",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"zip(a, b)"})," pairs items up: ",e.jsx("code",{children:"(a[0], b[0]), (a[1], b[1])"}),"… Ask ",e.jsx("code",{children:"Names: "})," and ",e.jsx("code",{children:"Marks: "})," (both one line) and print ",e.jsx("code",{children:"Priya: 87"})," for each pair."]}),tests:[{inputs:["Priya Arun Meena","87 72 95"],expect:`Names: Priya Arun Meena
Marks: 87 72 95
`+m(["Priya","Arun","Meena"],[87,72,95])},{inputs:["Ravi Divya","64 99"],expect:`Names: Ravi Divya
Marks: 64 99
`+m(["Ravi","Divya"],[64,99]),hidden:!0}],requires:[{call:"zip"}],hints:['for name, mark in zip(names, marks): print(f"{name}: {mark}")'],solution:`names = input("Names: ").split()
marks = input("Marks: ").split()
for name, mark in zip(names, marks):
    print(f"{name}: {mark}")`},merit:{id:"merit",kind:"make",title:"Merit list",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Names: "})," and ",e.jsx("code",{children:"Marks: "})," (one line each). Build a list of ",e.jsx("code",{children:"(name, mark)"})," tuples with zip (marks as ints). Print a numbered list ",e.jsx("code",{children:"1. Priya - 87"}),", then ",e.jsx("code",{children:"Topper: Meena (95)"})," (best-so-far over the tuples) and ",e.jsx("code",{children:"Class average: 84.7"})," (1 decimal)."]}),minLines:14,tests:[{inputs:["Priya Arun Meena","87 72 95"],expect:h("Priya Arun Meena","87 72 95")},{inputs:["Ravi Divya Arun Kavya","99 64 70 99"],expect:h("Ravi Divya Arun Kavya","99 64 70 99"),hidden:!0}],requires:[{call:"zip"},{call:"enumerate"}],hints:["records = [] then for n, m in zip(names, marks): records.append((n, int(m)))","best = records[0]; for rec in records: if rec[1] > best[1]: best = rec","top_name, top_mark = best"],solution:`names = input("Names: ").split()
marks = input("Marks: ").split()
records = []
for n, m in zip(names, marks):
    records.append((n, int(m)))
for i, (name, mark) in enumerate(records, start=1):
    print(f"{i}. {name} - {mark}")
best = records[0]
total = 0
for rec in records:
    total += rec[1]
    if rec[1] > best[1]:
        best = rec
top_name, top_mark = best
print(f"Topper: {top_name} ({top_mark})")
print(f"Class average: {total / len(records):.1f}")`}},v=a,y=[{q:"Which of these is a tuple?",options:["(5)","(5,)","[5]","{5}"],answer:1,explain:"The comma makes the tuple. (5) is just the number 5."},{q:"t = (10, 20, 30). What does t[0] = 99 do?",options:["t becomes (99, 20, 30)","TypeError","Nothing","t becomes (99,)"],answer:1,explain:"Tuples are immutable. Make a new tuple instead."},{q:"After a, b = 3, 7 and then a, b = b, a, what is a?",options:["3","7","(7, 3)","Error"],answer:1,explain:"The right side (7, 3) is built first, then unpacked."},{q:"x, y = (1, 2, 3) gives…",options:["x=1, y=2","x=1, y=(2, 3)","ValueError: too many values to unpack","x=(1,2,3)"],answer:2,explain:"The number of names must match the number of items."},{q:'What does list(enumerate(["a", "b"], start=1)) contain?',options:["[1, 2]","[(1, 'a'), (2, 'b')]","['a', 'b']","[(0, 'a'), (1, 'b')]"],answer:1,explain:"enumerate yields (position, item) tuples, starting from start."},{q:"When should you choose a tuple over a list?",options:["Always","For a fixed record that shouldn't change (a date, coordinates, one student's details)","For data that grows","Never"],answer:1,explain:"Lists for collections that change; tuples for fixed records — often a list of tuples."}];function M(i){const r=[{label:"Locked Records",kicker:"WHY TUPLES?",title:"A list with a lock",blocks:[e.jsxs(p,{children:["A birthday, a coordinate, a student's roll number and name — some data must never change once created. A ",e.jsx("strong",{children:"tuple"})," is like a list that cannot be changed. Run the same bug on both:"]}),e.jsx(g,{}),a.basics,a.locked]},{label:"Unpacking",kicker:"ONE LINE, MANY NAMES",title:"Packing and unpacking",blocks:[e.jsxs(p,{children:["Write values with commas and Python ",e.jsx("strong",{children:"packs"})," them into a tuple. Put several names on the left of ",e.jsx("code",{children:"="})," and Python ",e.jsx("strong",{children:"unpacks"})," the tuple into them, item by item."]}),a.unpack,a.swap,a.toomany,a.divmod,e.jsxs(x,{children:["Unpacking needs exactly one name per item. It's how Python returns several answers at once — ",e.jsx("code",{children:"divmod"})," now, and your own functions in Module 8."]})]},{label:"Records & Loops",kicker:"enumerate · zip",title:"Lists of tuples, enumerate and zip",blocks:[a.records,e.jsxs(p,{children:["Two built-ins hand you tuples to unpack in a loop: ",e.jsx("code",{children:"enumerate"})," adds a position to each item; ",e.jsx("code",{children:"zip"})," walks two lists side by side."]}),a.enum,a.zip,e.jsx(p,{children:e.jsx("strong",{children:"Tuple or list?"})}),e.jsx("div",{style:{border:`1px solid ${t.border}`,borderRadius:12,overflow:"hidden",maxWidth:820},children:[["","list [ ]","tuple ( )"],["Can change?","Yes — append, remove, replace","No — make a new one"],["Typical use","A collection that grows: all the marks","One fixed record: (name, roll, cgpa)"],["Mistake it prevents","—","Accidental changes to fixed data"],["Together","A list of tuples: the whole class, one record each",""]].map((s,n)=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1.4fr 1.4fr",gap:10,padding:"9px 14px",background:n===0?t.deep:n%2?t.surface:t.card,fontWeight:n===0?700:400,fontSize:14.5},children:s.map((o,d)=>e.jsx("span",{children:o},d))},n))})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: merit list",blocks:[e.jsx(p,{children:"split, zip into a list of tuples, enumerate for numbering, best-so-far over records, and unpacking the winner."}),a.merit]}];return e.jsx(k,{...i,unitId:"Unit7_4",crumb:"MODULE 7 › UNIT 7.4",title:"Tuples",sections:r,quiz:y,next:{title:"Unit 7.5 — Dictionaries",text:"Look things up by name, not position — and count anything with a dict."}})}export{v as EXERCISES,M as default};
