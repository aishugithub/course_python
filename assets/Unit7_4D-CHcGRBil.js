import{j as e,r as h}from"./index-rTKCO5Yp.js";import{P as u,K as g,L as y,T as r,a as c,M as A}from"./Lesson-o3jU_D0N.js";const b=s=>"{"+Object.entries(s).map(([n,i])=>`'${n}': ${typeof i=="string"?`'${i}'`:i}`).join(", ")+"}";function R(){const s={PRIYA:87,ARUN:72,MEENA:95},[n,i]=h.useState(s),[a,d]=h.useState({code:'marks["ARUN"]',out:"72",err:!1}),l=[{code:'marks["MEENA"]',f:()=>"MEENA"in n?[n,String(n.MEENA)]:[n,"KeyError: 'MEENA'",!0]},{code:'marks["RAVI"]',f:()=>"RAVI"in n?[n,String(n.RAVI)]:[n,"KeyError: 'RAVI'",!0]},{code:'marks.get("RAVI", 0)',f:()=>[n,String(n.RAVI??0)]},{code:'marks["RAVI"] = 64',f:()=>[{...n,RAVI:64},"(added a new key)"]},{code:'marks["ARUN"] = 75',f:()=>[{...n,ARUN:75},"(overwrote ARUN — keys are unique)"]},{code:'del marks["PRIYA"]',f:()=>"PRIYA"in n?[(()=>{const t={...n};return delete t.PRIYA,t})(),"(removed)"]:[n,"KeyError: 'PRIYA'",!0]},{code:'"ARUN" in marks',f:()=>[n,"ARUN"in n?"True":"False"]},{code:"72 in marks",f:()=>[n,"False   ← in checks KEYS, not values"]}];return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:[l.map(t=>e.jsx("button",{onClick:()=>{const[p,f,x]=t.f();i(p),d({code:t.code,out:f,err:!!x})},style:{fontFamily:c,fontSize:13.5,padding:"7px 10px",borderRadius:8,border:`1.5px solid ${r.border}`,background:r.card,cursor:"pointer"},children:t.code},t.code)),e.jsx("button",{onClick:()=>{i(s),d({code:"",out:"",err:!1})},style:{fontSize:13,padding:"7px 10px",borderRadius:8,border:`1px solid ${r.border}`,background:r.surface,cursor:"pointer",fontFamily:"inherit"},children:"↺ reset"})]}),a.code&&e.jsxs("div",{style:{fontFamily:c,fontSize:14,marginTop:10},children:[">>> ",a.code,e.jsx("br",{}),e.jsx("span",{style:{color:a.err?r.red:r.blue},children:a.out})]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:A,fontSize:11,letterSpacing:1.3,color:r.bronze,marginBottom:6},children:["marks — ",Object.keys(n).length," keys"]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:Object.entries(n).map(([t,p])=>e.jsxs("div",{style:{textAlign:"center",minWidth:80},children:[e.jsx("div",{style:{fontFamily:c,fontSize:12.5,fontWeight:700,color:"#fff",background:r.purple,borderRadius:"8px 8px 0 0",padding:"3px 6px"},children:t}),e.jsx("div",{style:{border:`1.5px solid ${r.purple}`,borderTop:"none",borderRadius:"0 0 8px 8px",padding:"10px 0",fontFamily:c,fontWeight:700,fontSize:18,background:r.card},children:p})]},t))}),e.jsxs("div",{style:{fontFamily:c,fontSize:13.5,marginTop:8,color:r.slate},children:["print(marks) → ",b(n)]})]})]})}const k={samosa:15,tea:10,dosa:45,coffee:20},m=s=>{const n=[];let i=0;for(const a of s){if(n.push(`Order: ${a}`),a==="done")break;const[d,l]=a.split(" ");if(!(d in k)){n.push(`Sorry, no ${d}`);continue}const t=k[d]*Number(l);i+=t,n.push(`${d} x ${l} = Rs ${t.toFixed(2)}`)}return n.push(`Total: Rs ${i.toFixed(2)}`),n.join(`
`)},v=s=>{const n={};return s.split(" ").forEach(i=>{n[i]=(n[i]||0)+1}),n},o={basics:{id:"basics",kind:"type",title:"Your first dictionary",task:e.jsxs(e.Fragment,{children:["Curly braces, ",e.jsx("code",{children:"key: value"})," pairs. Look up with the key in square brackets; assigning to a new key adds it, to an existing key overwrites it."]}),show:`marks = {"PRIYA": 87, "ARUN": 72}
print(marks["PRIYA"])
marks["MEENA"] = 95
marks["ARUN"] = 75
print(marks)
print(len(marks), "ARUN" in marks, 72 in marks)`,tests:[{expect:`87
{'PRIYA': 87, 'ARUN': 75, 'MEENA': 95}
3 True False`}],hints:["in looks at the keys only, so 72 in marks is False."],solution:`marks = {"PRIYA": 87, "ARUN": 72}
print(marks["PRIYA"])
marks["MEENA"] = 95
marks["ARUN"] = 75
print(marks)
print(len(marks), "ARUN" in marks, 72 in marks)`},phonebook:{id:"phonebook",kind:"fix",title:"Looking up someone who isn't there",task:e.jsxs(e.Fragment,{children:["The test looks up Ravi, who isn't in the phone book. Run it, read the coach, and fix it so a missing name prints ",e.jsx("code",{children:"Not found"}),". Use ",e.jsx("code",{children:".get(key, default)"})," or an ",e.jsx("code",{children:"in"})," check."]}),starter:`phonebook = {"Priya": "98765 43210", "Arun": "91234 56789"}
name = input("Name: ")
print(phonebook[name])`,tests:[{inputs:["Ravi"],expect:`Name: Ravi
Not found`},{inputs:["Priya"],expect:`Name: Priya
98765 43210`,hidden:!0}],hints:['.get returns a default instead of crashing: phonebook.get(name, "Not found")'],solution:`phonebook = {"Priya": "98765 43210", "Arun": "91234 56789"}
name = input("Name: ")
print(phonebook.get(name, "Not found"))`},loop:{id:"loop",kind:"type",title:"Looping over a dictionary",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:".items()"})," gives ",e.jsx("code",{children:"(key, value)"})," tuples — unpack them, as in Unit 7.4. ",e.jsx("code",{children:".values()"})," gives just the values."]}),show:`marks = {"PRIYA": 87, "ARUN": 72, "MEENA": 95}
for name, mark in marks.items():
    print(f"{name}: {mark}")
print(sum(marks.values()))
print(list(marks.keys()))`,tests:[{expect:`PRIYA: 87
ARUN: 72
MEENA: 95
254
['PRIYA', 'ARUN', 'MEENA']`}],hints:["Dictionaries remember the order keys were added."],solution:`marks = {"PRIYA": 87, "ARUN": 72, "MEENA": 95}
for name, mark in marks.items():
    print(f"{name}: {mark}")
print(sum(marks.values()))
print(list(marks.keys()))`},above:{id:"above",kind:"write",title:"Who scored above 80?",task:e.jsxs(e.Fragment,{children:["Given ",e.jsxs("code",{children:["marks = ","{",'"PRIYA": 87, "ARUN": 72, "MEENA": 95, "RAVI": 64, "DIVYA": 81',"}"]}),", print each student scoring above 80 (one line each, as ",e.jsx("code",{children:"PRIYA 87"}),"), then ",e.jsx("code",{children:"Class average: 79.8"}),"."]}),tests:[{expect:`PRIYA 87
MEENA 95
DIVYA 81
Class average: 79.8`}],requires:[{call:"items"}],forbids:[{text:"79.8",msg:"Let Python calculate the average."}],hints:["for name, mark in marks.items(): if mark > 80: print(name, mark)","Average: sum(marks.values()) / len(marks)"],solution:`marks = {"PRIYA": 87, "ARUN": 72, "MEENA": 95, "RAVI": 64, "DIVYA": 81}
for name, mark in marks.items():
    if mark > 80:
        print(name, mark)
print(f"Class average: {sum(marks.values()) / len(marks):.1f}")`},grades:{id:"grades",kind:"write",title:"Count anything with a dict",task:e.jsxs(e.Fragment,{children:["The most useful dictionary pattern. Ask ",e.jsx("code",{children:"Grades: "})," (one line, like ",e.jsx("code",{children:"A B A C B A"}),") and count each grade: ",e.jsx("code",{children:"counts[g] = counts.get(g, 0) + 1"}),". Print one line per grade, in the order first seen: ",e.jsx("code",{children:"A: 3"}),"…"]}),tests:[{inputs:["A B A C B A"],expect:`Grades: A B A C B A
`+Object.entries(v("A B A C B A")).map(([s,n])=>`${s}: ${n}`).join(`
`)},{inputs:["F F F"],expect:`Grades: F F F
F: 3`,hidden:!0},{inputs:["C A B"],expect:`Grades: C A B
C: 1
A: 1
B: 1`,hidden:!0}],requires:[{call:"get",msg:"Use counts.get(g, 0) + 1."}],hints:["counts = {} before the loop.",".get(g, 0) gives 0 the first time a grade appears.",'for g, n in counts.items(): print(f"{g}: {n}")'],solution:`counts = {}
for g in input("Grades: ").split():
    counts[g] = counts.get(g, 0) + 1
for g, n in counts.items():
    print(f"{g}: {n}")`},votes:{id:"votes",kind:"write",title:"Class election",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Votes: "})," (one line of candidate names). Count the votes in a dictionary, then find the winner with best-so-far over ",e.jsx("code",{children:".items()"})," (first to reach the top score wins a tie). Print ",e.jsx("code",{children:"Winner: Meena with 3 votes"}),"."]}),tests:[{inputs:["Meena Arun Meena Priya Meena Arun"],expect:`Votes: Meena Arun Meena Priya Meena Arun
Winner: Meena with 3 votes`},{inputs:["Ravi"],expect:`Votes: Ravi
Winner: Ravi with 1 votes`,hidden:!0},{inputs:["Arun Priya Priya Arun"],expect:`Votes: Arun Priya Priya Arun
Winner: Arun with 2 votes`,hidden:!0}],requires:[{call:"get"}],forbids:[{call:"max",msg:"Use best-so-far over counts.items()."}],hints:["Count first, exactly like the grades exercise.",'winner = ""; best = 0; for name, n in counts.items(): if n > best: …'],solution:`counts = {}
for name in input("Votes: ").split():
    counts[name] = counts.get(name, 0) + 1
winner = ""
best = 0
for name, n in counts.items():
    if n > best:
        winner = name
        best = n
print(f"Winner: {winner} with {best} votes")`},remove:{id:"remove",kind:"write",title:"Remove a key",task:e.jsxs(e.Fragment,{children:["A shop's stock: ",e.jsxs("code",{children:["stock = ","{",'"pen": 40, "pencil": 25, "eraser": 0',"}"]}),". Ask ",e.jsx("code",{children:"Remove: "}),". If the item exists, delete it with ",e.jsx("code",{children:"del"})," and print ",e.jsx("code",{children:"Removed eraser"}),"; otherwise ",e.jsx("code",{children:"No such item"}),". Then print the dictionary."]}),tests:[{inputs:["eraser"],expect:`Remove: eraser
Removed eraser
{'pen': 40, 'pencil': 25}`},{inputs:["ruler"],expect:`Remove: ruler
No such item
{'pen': 40, 'pencil': 25, 'eraser': 0}`,hidden:!0}],requires:[{node:"Delete",msg:"Use del stock[item]."}],hints:["Check with in first — del on a missing key is a KeyError."],solution:`stock = {"pen": 40, "pencil": 25, "eraser": 0}
item = input("Remove: ")
if item in stock:
    del stock[item]
    print(f"Removed {item}")
else:
    print("No such item")
print(stock)`},table:{id:"table",kind:"type",title:"A list of dictionaries",task:e.jsx(e.Fragment,{children:"Real data often looks like this: a list of records where each record is a dictionary with named fields. (It's exactly the shape of a spreadsheet — and of the Pandas tables in Module 12.)"}),show:`students = [
    {"name": "Priya", "dept": "CSE", "cgpa": 8.7},
    {"name": "Arun", "dept": "ECE", "cgpa": 7.9},
]
for s in students:
    print(f"{s['name']} ({s['dept']}): {s['cgpa']}")`,tests:[{expect:`Priya (CSE): 8.7
Arun (ECE): 7.9`}],hints:["Inside an f-string with double quotes, use single quotes for the keys."],solution:`students = [
    {"name": "Priya", "dept": "CSE", "cgpa": 8.7},
    {"name": "Arun", "dept": "ECE", "cgpa": 7.9},
]
for s in students:
    print(f"{s['name']} ({s['dept']}): {s['cgpa']}")`},canteen:{id:"canteen",kind:"make",title:"Canteen billing",task:e.jsxs(e.Fragment,{children:["Menu: ",e.jsxs("code",{children:["menu = ","{",'"samosa": 15, "tea": 10, "dosa": 45, "coffee": 20',"}"]}),". Keep asking ",e.jsx("code",{children:"Order: "})," (like ",e.jsx("code",{children:"tea 2"}),") until ",e.jsx("code",{children:"done"}),". For a known item print ",e.jsx("code",{children:"tea x 2 = Rs 20.00"})," and add to the total; for an unknown one print ",e.jsx("code",{children:"Sorry, no idli"}),". Finally print ",e.jsx("code",{children:"Total: Rs 65.00"}),"."]}),minLines:14,tests:[{inputs:["tea 2","dosa 1","idli 2","done"],expect:m(["tea 2","dosa 1","idli 2","done"])},{inputs:["done"],expect:m(["done"]),hidden:!0},{inputs:["samosa 4","coffee 3","done"],expect:m(["samosa 4","coffee 3","done"]),hidden:!0}],requires:[{node:"While"}],hints:["item, qty = order.split() — unpack the two words.","if item in menu: cost = menu[item] * int(qty) …",'print(f"{item} x {qty} = Rs {cost:.2f}")'],solution:`menu = {"samosa": 15, "tea": 10, "dosa": 45, "coffee": 20}
total = 0
order = input("Order: ")
while order != "done":
    item, qty = order.split()
    if item in menu:
        cost = menu[item] * int(qty)
        total += cost
        print(f"{item} x {qty} = Rs {cost:.2f}")
    else:
        print(f"Sorry, no {item}")
    order = input("Order: ")
print(f"Total: Rs {total:.2f}")`}},N=o,j=[{q:'d = {"a": 1}. What does d["b"] do?',options:["Returns None","Returns 0","KeyError","Adds b"],answer:2,explain:'Reading a missing key raises KeyError. Use d.get("b") or check "b" in d first.'},{q:'d = {"a": 1}. After d["a"] = 5, what is d?',options:['{"a": 1, "a": 5}','{"a": 5}',"Error",'{"a": 6}'],answer:1,explain:"Keys are unique; assigning to an existing key overwrites its value."},{q:'marks = {"ARUN": 72}. What does 72 in marks give?',options:["True","False"],answer:1,explain:"in checks keys only. 72 in marks.values() would be True."},{q:`What does counts.get("x", 0) + 1 do when "x" isn't a key yet?`,options:["KeyError","Gives 1","Gives None","Gives 0"],answer:1,explain:"get returns the default 0, plus 1 = 1. That's why this line counts anything."},{q:"What do you get from looping over d.items()?",options:["Keys only","Values only","(key, value) tuples","Indexes"],answer:2,explain:"Unpack them: for key, value in d.items():"},{q:"Which is the better data shape for 60 students' name, dept and CGPA?",options:["Three separate lists","A list of dictionaries, one per student","One long string","60 variables"],answer:1,explain:"Each record keeps its fields together, so they can't drift out of line."}];function I(s){const n=[{label:"Lookup by Name",kicker:"KEYS, NOT POSITIONS",title:"Lockers with name labels",blocks:[e.jsxs(u,{children:["To find Meena's mark in a list you'd need to know her position. A ",e.jsx("strong",{children:"dictionary"})," labels each slot with a ",e.jsx("strong",{children:"key"})," — like lockers with names instead of numbers. Try every operation:"]}),e.jsx(R,{}),o.basics]},{label:"Missing Keys",kicker:"KeyError · in · get",title:"When the key isn't there",blocks:[o.phonebook,e.jsxs(g,{children:["Three safe ways to read: check ",e.jsx("code",{children:"if key in d:"})," first, or use ",e.jsx("code",{children:"d.get(key)"})," (None if missing), or ",e.jsx("code",{children:"d.get(key, default)"}),"."]})]},{label:"Loop a Dict",kicker:"items · keys · values",title:"Walking through a dictionary",blocks:[o.loop,o.above]},{label:"Counting",kicker:"THE COUNTING PATTERN",title:"Count anything",blocks:[e.jsxs(u,{children:["How many A grades? Which candidate won? How often does each word appear? One line answers them all: ",e.jsx("code",{children:"counts[x] = counts.get(x, 0) + 1"}),"."]}),o.grades,o.votes]},{label:"Remove & Records",kicker:"del · list of dicts",title:"Deleting keys, and tables of records",blocks:[o.remove,o.table]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: canteen billing",blocks:[e.jsxs(u,{children:["A menu dictionary, a sentinel loop, split and unpacking, ",e.jsx("code",{children:"in"}),", and money with ",e.jsx("code",{children:":.2f"}),". (This is the heart of mini-project Track B, Shop Inventory Manager.)"]}),o.canteen]}];return e.jsx(y,{...s,unitId:"Unit7_4D",crumb:"MODULE 7 › UNIT 7.5",title:"Dictionaries",sections:n,quiz:j,next:{title:"Unit 7.6 — Sets",text:"Duplicates vanish and membership checks turn instant."}})}export{N as EXERCISES,I as default};
