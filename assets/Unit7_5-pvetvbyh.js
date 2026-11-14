import{j as e,r as b}from"./index-cCwWvTed.js";import{P as u,K as j,L as A,a as h,T as s,t as k}from"./Lesson-BzQti5aW.js";const x=n=>"["+n.map(i=>`'${i}'`).join(", ")+"]",d=["Math","Physics","CS"],l=["Physics","CS","Bio"],m={"A | B":{n:"union — in either",f:()=>[...new Set([...d,...l])]},"A & B":{n:"intersection — in both",f:()=>d.filter(n=>l.includes(n))},"A - B":{n:"difference — in A but not B",f:()=>d.filter(n=>!l.includes(n))},"A ^ B":{n:"symmetric difference — in exactly one",f:()=>[...d.filter(n=>!l.includes(n)),...l.filter(n=>!d.includes(n))]}};function g(){const[n,i]=b.useState("A & B"),r=m[n].f(),o=(t,c)=>e.jsx("span",{style:{fontFamily:h,padding:"4px 10px",borderRadius:999,margin:3,display:"inline-block",border:`1.5px solid ${c?s.teal:s.border}`,background:c?k(s.teal,"22"):s.card,fontWeight:c?700:400},children:t},t);return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:h,fontSize:14},children:["A = Priya's subjects",e.jsx("br",{}),d.map(t=>o(t,r.includes(t)))]}),e.jsxs("div",{style:{fontFamily:h,fontSize:14,marginTop:8},children:["B = Arun's subjects",e.jsx("br",{}),l.map(t=>o(t,r.includes(t)))]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:Object.keys(m).map(t=>e.jsx("button",{onClick:()=>i(t),style:{fontFamily:h,fontSize:15,padding:"7px 12px",borderRadius:8,cursor:"pointer",border:`1.5px solid ${n===t?s.navy:s.border}`,background:n===t?s.navy:s.card,color:n===t?"#fff":s.text},children:t},t))}),e.jsx("div",{style:{marginTop:10,fontSize:14.5,color:s.slate},children:e.jsx("strong",{children:m[n].n})}),e.jsxs("div",{style:{fontFamily:h,fontSize:16,marginTop:4},children:["→ ","{",r.map(t=>`'${t}'`).join(", "),"}"]})]})]})}const y=(n,i)=>{const r=n.split(" "),o=i.split(" "),t=r.filter(p=>!o.includes(p)).sort(),c=[...new Set(o.filter(p=>!r.includes(p)))].sort(),f=new Set(o.filter(p=>r.includes(p))).size;return[`Class: ${n}`,`Present: ${i}`,`Absent: ${x(t)}`,`Not in class: ${x(c)}`,`Attendance: ${(f/r.length*100).toFixed(1)}%`].join(`
`)},a={dedupe:{id:"dedupe",kind:"type",title:"Duplicates vanish",task:e.jsxs(e.Fragment,{children:["A set keeps each value at most once. Sets have no fixed order, so we print them through ",e.jsx("code",{children:"sorted()"}),". Note the last line: ",e.jsx("code",{children:"{}"})," is an empty ",e.jsx("em",{children:"dictionary"}),"."]}),show:`names = ["Priya", "Arun", "Priya", "Meena", "Arun"]
unique = set(names)
print(len(names), len(unique))
print(sorted(unique))
s = {3, 1, 2}
s.add(2)
s.add(5)
print(sorted(s))
print(type({}), type(set()))`,minLines:10,tests:[{expect:`5 3
['Arun', 'Meena', 'Priya']
[1, 2, 3, 5]
<class 'dict'> <class 'set'>`}],hints:["Adding 2 again changes nothing — it's already in the set."],solution:`names = ["Priya", "Arun", "Priya", "Meena", "Arun"]
unique = set(names)
print(len(names), len(unique))
print(sorted(unique))
s = {3, 1, 2}
s.add(2)
s.add(5)
print(sorted(s))
print(type({}), type(set()))`},distinct:{id:"distinct",kind:"write",title:"How many different words?",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Sentence: "}),". Treat capitals as the same word (lower everything). For ",e.jsx("code",{children:"The cat and the dog and THE bird"})," print ",e.jsx("code",{children:"Words: 8"})," and ",e.jsx("code",{children:"Distinct: 5"}),"."]}),tests:[{inputs:["The cat and the dog and THE bird"],expect:`Sentence: The cat and the dog and THE bird
Words: 8
Distinct: 5`},{inputs:["one one one"],expect:`Sentence: one one one
Words: 3
Distinct: 1`,hidden:!0}],requires:[{call:"set"}],hints:["words = sentence.lower().split()","len(set(words))"],solution:`words = input("Sentence: ").lower().split()
print(f"Words: {len(words)}")
print(f"Distinct: {len(set(words))}")`},emptyset:{id:"emptyset",kind:"fix",title:"{} is not an empty set",task:e.jsxs(e.Fragment,{children:["Run it and read the coach. Make ",e.jsx("code",{children:"seen"})," a real empty set."]}),starter:`seen = {}
seen.add("Priya")
print(seen)`,tests:[{expect:"{'Priya'}"}],hints:["{} makes an empty dictionary — dictionaries have no .add(). Use set()."],solution:`seen = set()
seen.add("Priya")
print(seen)`},ops:{id:"ops",kind:"type",title:"Union, intersection, difference",task:e.jsx(e.Fragment,{children:"The widget above, as code."}),show:`a = {"Math", "Physics", "CS"}
b = {"Physics", "CS", "Bio"}
print(sorted(a | b))
print(sorted(a & b))
print(sorted(a - b))
print(sorted(a ^ b))`,tests:[{expect:`['Bio', 'CS', 'Math', 'Physics']
['CS', 'Physics']
['Math']
['Bio', 'Math']`}],hints:["sorted turns each set into an alphabetical list."],solution:`a = {"Math", "Physics", "CS"}
b = {"Physics", "CS", "Bio"}
print(sorted(a | b))
print(sorted(a & b))
print(sorted(a - b))
print(sorted(a ^ b))`},common:{id:"common",kind:"write",title:"Shared electives",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Priya: "})," and ",e.jsx("code",{children:"Arun: "})," (each a line of elective names). Print ",e.jsx("code",{children:"Common: [...]"})," and ",e.jsx("code",{children:"Only Priya: [...]"}),", both sorted."]}),tests:[{inputs:["AI IoT Web Cyber","Web AI Robotics"],expect:`Priya: AI IoT Web Cyber
Arun: Web AI Robotics
Common: ['AI', 'Web']
Only Priya: ['Cyber', 'IoT']`},{inputs:["AI","Web"],expect:`Priya: AI
Arun: Web
Common: []
Only Priya: ['AI']`,hidden:!0}],hints:['p = set(input("Priya: ").split())',"p & a for common, p - a for only Priya."],solution:`p = set(input("Priya: ").split())
a = set(input("Arun: ").split())
print(f"Common: {sorted(p & a)}")
print(f"Only Priya: {sorted(p - a)}")`},firstdup:{id:"firstdup",kind:"write",title:"The first repeated roll number",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Rolls: "})," (one line). Walk through them with a ",e.jsx("code",{children:"seen"})," set; the first roll already in ",e.jsx("code",{children:"seen"})," is a duplicate entry — print ",e.jsx("code",{children:"First duplicate: 1042"})," and stop. If there's none, print ",e.jsx("code",{children:"No duplicates"}),"."]}),tests:[{inputs:["1001 1042 1003 1042 1001"],expect:`Rolls: 1001 1042 1003 1042 1001
First duplicate: 1042`},{inputs:["1 2 3"],expect:`Rolls: 1 2 3
No duplicates`,hidden:!0},{inputs:["7 7"],expect:`Rolls: 7 7
First duplicate: 7`,hidden:!0}],requires:[{call:"add"},{node:"Break"}],hints:["seen = set(); found = False before the loop.","if r in seen: … break — otherwise seen.add(r)."],solution:`seen = set()
found = False
for r in input("Rolls: ").split():
    if r in seen:
        print(f"First duplicate: {r}")
        found = True
        break
    seen.add(r)
if not found:
    print("No duplicates")`},attendance:{id:"attendance",kind:"make",title:"Attendance checker",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Class: "})," (all names) and ",e.jsx("code",{children:"Present: "})," (names marked present — may include mistakes and repeats). Print ",e.jsx("code",{children:"Absent: [...]"})," (sorted), ",e.jsx("code",{children:"Not in class: [...]"})," (sorted names marked present who aren't in the class), and ",e.jsx("code",{children:"Attendance: 75.0%"})," (real present students ÷ class size, 1 decimal)."]}),minLines:8,tests:[{inputs:["Priya Arun Meena Ravi","Arun Priya Ravi Priya Karan"],expect:y("Priya Arun Meena Ravi","Arun Priya Ravi Priya Karan")},{inputs:["A B C","A B C"],expect:y("A B C","A B C"),hidden:!0},{inputs:["A B C D","Z"],expect:y("A B C D","Z"),hidden:!0}],hints:["cls = set(...), pres = set(...)","Absent: cls - pres. Not in class: pres - cls. Really present: cls & pres.",'f"Attendance: {len(cls & pres) / len(cls) * 100:.1f}%"'],solution:`cls = set(input("Class: ").split())
pres = set(input("Present: ").split())
print(f"Absent: {sorted(cls - pres)}")
print(f"Not in class: {sorted(pres - cls)}")
print(f"Attendance: {len(cls & pres) / len(cls) * 100:.1f}%")`}},C=a,P=[{q:"What is len(set([1, 1, 2, 2, 3]))?",options:["5","3","2","1"],answer:1,explain:"Duplicates vanish: {1, 2, 3}."},{q:"How do you make an empty set?",options:["{}","set()","[]","()"],answer:1,explain:"{} is an empty dictionary."},{q:"Which gives the items in both a and b?",options:["a | b","a & b","a - b","a ^ b"],answer:1,explain:"& is intersection."},{q:"Why is x in big_set faster than x in big_list?",options:["It isn't","A set jumps straight to where x would be (hashing); a list checks item by item","Sets are sorted","Lists are slower to create"],answer:1,explain:"That's why the seen-set pattern scales to millions of items."},{q:"Can you write my_set[0]?",options:["Yes, the first item","No — sets have no order, so no indexes","Only for numbers","Yes, the smallest item"],answer:1,explain:"Use sorted(my_set) if you need an order."}];function v(n){const i=[{label:"Unique",kicker:"NO DUPLICATES",title:"A set keeps each value once",blocks:[e.jsxs(u,{children:["A ",e.jsx("strong",{children:"set"})," is a bag of unique values: no duplicates, no order, and lightning-fast ",e.jsx("code",{children:"in"})," checks. Making a set from a list is a one-step way to remove repeats."]}),a.dedupe,a.distinct,a.emptyset]},{label:"Set Maths",kicker:"| & - ^",title:"Union, intersection, difference",blocks:[e.jsx(u,{children:"Compare two groups in one operator instead of a nested loop. Click each:"}),e.jsx(g,{}),a.ops,a.common]},{label:"Seen Set",kicker:"A CLASSIC PATTERN",title:"Have I seen this before?",blocks:[a.firstdup,e.jsx(j,{children:"Choose by the question: order and repeats matter → list; a fixed record → tuple; look up by key → dict; uniqueness and fast “is it in?” → set."})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: attendance checker",blocks:[e.jsx(u,{children:"Three set operations answer three questions about the same two lists."}),a.attendance]}];return e.jsx(A,{...n,unitId:"Unit7_5",crumb:"MODULE 7 › UNIT 7.6",title:"Sets",sections:i,quiz:P,next:{title:"Unit 7.7 — Capstone: Student Marks Manager",text:"Lists, tuples, dicts and loops in one real records program."}})}export{C as EXERCISES,v as default};
