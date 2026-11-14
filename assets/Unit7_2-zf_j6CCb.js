import{j as e,r as k}from"./index-BQ9ta_BJ.js";import{P as h,K as x,N as f,T as s,L as j,a as p,M as y,t as m}from"./Lesson-DNKKUv9k.js";const g=n=>"["+n.map(t=>typeof t=="string"?`'${t}'`:String(t)).join(", ")+"]",v=[{code:"marks.append(50)",f:n=>[[...n,50],null]},{code:"marks.insert(0, 99)",f:n=>[[99,...n],null]},{code:"marks[1] = 77",f:n=>n.length>1?[[n[0],77,...n.slice(2)],null]:[n,"IndexError: list assignment index out of range"]},{code:"marks.remove(85)",f:n=>n.includes(85)?[(()=>{const t=[...n];return t.splice(t.indexOf(85),1),t})(),null]:[n,"ValueError: list.remove(x): x not in list"]},{code:"marks.pop()",f:n=>n.length?[n.slice(0,-1),`→ returns ${n[n.length-1]}`]:[n,"IndexError: pop from empty list"]},{code:"marks.extend([60, 70])",f:n=>[[...n,60,70],null]}];function w(){const n=[72,85,64],[t,o]=k.useState(n),[d,r]=k.useState([]),a=i=>{const[c,b]=i.f(t);o(c),r([...d,{code:i.code,note:b}].slice(-5))};return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:[v.map(i=>e.jsx("button",{onClick:()=>a(i),style:{fontFamily:p,fontSize:13.5,padding:"7px 10px",borderRadius:8,border:`1.5px solid ${s.border}`,background:s.card,cursor:"pointer"},children:i.code},i.code)),e.jsx("button",{onClick:()=>{o(n),r([])},style:{fontSize:13,padding:"7px 10px",borderRadius:8,border:`1px solid ${s.border}`,background:s.surface,cursor:"pointer",fontFamily:"inherit"},children:"↺ reset"})]}),e.jsx("div",{style:{marginTop:10,fontFamily:p,fontSize:13.5,color:s.slate},children:d.map((i,c)=>e.jsxs("div",{children:[">>> ",i.code,i.note&&e.jsxs("span",{style:{color:i.note.startsWith("→")?s.blue:s.red},children:["  ",i.note]})]},c))})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:y,fontSize:11,letterSpacing:1.3,color:s.bronze,marginBottom:6},children:["marks — len ",t.length]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:4},children:t.map((i,c)=>e.jsxs("div",{style:{textAlign:"center",minWidth:50},children:[e.jsx("div",{style:{fontFamily:p,fontSize:11,color:s.blue},children:c}),e.jsx("div",{style:{border:`1.5px solid ${s.teal}`,background:m(s.teal,"12"),borderRadius:8,padding:"10px 4px",fontFamily:p,fontWeight:700,fontSize:17},children:i})]},c))}),e.jsxs("div",{style:{fontFamily:p,fontSize:14,marginTop:8},children:["print(marks) → ",g(t)]})]})]})}function S(){const n=[{code:"a = [1, 2, 3]",lists:{L1:[1,2,3]},tags:{a:"L1"},note:"One list in memory, one tag a on it."},{code:"b = a",lists:{L1:[1,2,3]},tags:{a:"L1",b:"L1"},note:"No copy! b is a second tag on the SAME list (Unit 4.2: = ties a name to a value)."},{code:"b.append(4)",lists:{L1:[1,2,3,4]},tags:{a:"L1",b:"L1"},note:"append changes the list itself. Both tags are on it, so print(a) shows 4 too."},{code:"c = a.copy()",lists:{L1:[1,2,3,4],L2:[1,2,3,4]},tags:{a:"L1",b:"L1",c:"L2"},note:".copy() builds a brand-new list with the same items. c is on the new one."},{code:"c.append(5)",lists:{L1:[1,2,3,4],L2:[1,2,3,4,5]},tags:{a:"L1",b:"L1",c:"L2"},note:"Only the copy changes. a and b are untouched."}],[t,o]=k.useState(0),d=n[t];return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10},children:n.map((r,a)=>e.jsxs("button",{onClick:()=>o(a),style:{fontFamily:p,fontSize:13.5,padding:"6px 10px",borderRadius:7,cursor:"pointer",border:`1.5px solid ${a===t?s.navy:s.border}`,background:a===t?s.navy:s.card,color:a===t?"#fff":s.text},children:[a+1,". ",r.code]},a))}),e.jsx("div",{style:{display:"flex",gap:24,flexWrap:"wrap"},children:Object.entries(d.lists).map(([r,a])=>e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:4,marginBottom:4,minHeight:26},children:Object.entries(d.tags).filter(([,i])=>i===r).map(([i])=>e.jsxs("span",{style:{fontFamily:p,fontWeight:700,color:"#fff",background:i==="c"?s.orange:i==="b"?s.purple:s.blue,borderRadius:6,padding:"2px 8px"},children:["🏷 ",i]},i))}),e.jsx("div",{style:{display:"flex",gap:3,border:`1.5px solid ${s.teal}`,borderRadius:10,padding:6,background:m(s.teal,"0C")},children:a.map((i,c)=>e.jsx("div",{style:{width:36,textAlign:"center",fontFamily:p,fontWeight:700,padding:"6px 0",background:s.card,borderRadius:6},children:i},c))})]},r))}),e.jsx("div",{style:{marginTop:10,background:m(s.purple,"10"),border:`1px solid ${m(s.purple,"44")}`,borderRadius:10,padding:"10px 14px",fontSize:14.5,color:s.slate},children:d.note})]})}const u=n=>{const t=Array(10).fill(!1),o=[];for(const r of n){o.push(`Seat: ${r}`);const a=Number(r);if(a===0)break;a<1||a>10?o.push("No such seat"):t[a-1]?o.push(`Seat ${a} is taken`):(t[a-1]=!0,o.push(`Booked ${a}`))}const d=t.map((r,a)=>r?a+1:null).filter(r=>r!==null);return o.push(`Booked seats: ${g(d)}`,`Free: ${10-d.length}`),o.join(`
`)},l={make:{id:"make",kind:"type",title:"Your first list",task:e.jsxs(e.Fragment,{children:["Square brackets, items separated by commas. Indexing and ",e.jsx("code",{children:"len"})," work just as with strings."]}),show:`marks = [72, 85, 64, 90]
print(marks)
print(marks[0], marks[-1])
print(len(marks))
print(marks[1:3])`,tests:[{expect:`[72, 85, 64, 90]
72 90
4
[85, 64]`}],hints:["A slice of a list is a list."],solution:`marks = [72, 85, 64, 90]
print(marks)
print(marks[0], marks[-1])
print(len(marks))
print(marks[1:3])`},methods:{id:"methods",kind:"type",title:"Changing a list",task:e.jsx(e.Fragment,{children:"Trace each line on paper first — the list changes after every line. The last line has a surprise."}),show:`marks = [72, 85, 64]
marks.append(90)
marks.insert(0, 55)
marks[2] = 88
marks.remove(64)
last = marks.pop()
print(marks)
print("Popped:", last)
print(85 in marks, marks.index(88), marks.count(72))`,minLines:10,tests:[{expect:`[55, 72, 88]
Popped: 90
False 2 1`}],hints:["After insert(0, 55) the list is [55, 72, 85, 64, 90] — so marks[2] = 88 replaces 85."],solution:`marks = [72, 85, 64]
marks.append(90)
marks.insert(0, 55)
marks[2] = 88
marks.remove(64)
last = marks.pop()
print(marks)
print("Popped:", last)
print(85 in marks, marks.index(88), marks.count(72))`},shopping:{id:"shopping",kind:"write",title:"Shopping list",task:e.jsxs(e.Fragment,{children:["Start with an empty list ",e.jsx("code",{children:"items = []"}),". Keep asking ",e.jsx("code",{children:"Item: "})," and append each answer, until the user types ",e.jsx("code",{children:"done"}),". Then print ",e.jsx("code",{children:"You need 3 items: ['milk', 'bread', 'eggs']"}),"."]}),tests:[{inputs:["milk","bread","eggs","done"],expect:`Item: milk
Item: bread
Item: eggs
Item: done
You need 3 items: ['milk', 'bread', 'eggs']`},{inputs:["done"],expect:`Item: done
You need 0 items: []`,hidden:!0},{inputs:["rice","done"],expect:`Item: rice
Item: done
You need 1 items: ['rice']`,hidden:!0}],requires:[{call:"append"},{node:"While"}],hints:["A sentinel loop, like Unit 6.1's “add until 0”.",'while item != "done": items.append(item); item = input("Item: ")','print(f"You need {len(items)} items: {items}")'],solution:`items = []
item = input("Item: ")
while item != "done":
    items.append(item)
    item = input("Item: ")
print(f"You need {len(items)} items: {items}")`},none:{id:"none",kind:"fix",title:"Where did my list go?",task:e.jsxs(e.Fragment,{children:["Run it. The list vanished and turned into ",e.jsx("code",{children:"None"}),". Fix line 2."]}),starter:`marks = [70, 80]
marks = marks.append(90)
print(marks)`,tests:[{expect:"[70, 80, 90]"}],hints:["append changes the list in place and returns None. Storing its result replaces your list with None.","Just write marks.append(90) on its own."],solution:`marks = [70, 80]
marks.append(90)
print(marks)`},loop:{id:"loop",kind:"write",title:"Loop over a list",task:e.jsxs(e.Fragment,{children:["Given ",e.jsx("code",{children:"marks = [72, 85, 64, 90]"}),", use ",e.jsx("code",{children:"for m in marks:"})," to work out the average and how many marks are above 75. Print ",e.jsx("code",{children:"Average: 77.75"})," and ",e.jsx("code",{children:"Above 75: 2"}),". (No sum( ) yet — that's next unit.)"]}),tests:[{expect:`Average: 77.75
Above 75: 2`}],requires:[{node:"For"}],forbids:[{call:"sum",msg:"Add them up with the loop — sum( ) comes in Unit 7.3."},{text:"77.75",msg:"Let Python calculate it."}],hints:["total = 0 and count = 0 before the loop.","Average: total / len(marks)"],solution:`marks = [72, 85, 64, 90]
total = 0
above = 0
for m in marks:
    total += m
    if m > 75:
        above += 1
print(f"Average: {total / len(marks)}")
print(f"Above 75: {above}")`},alias:{id:"alias",kind:"type",title:"Two tags, one list",task:e.jsx(e.Fragment,{children:"The stepper above, as real code. Predict all three lines before running."}),show:`a = [1, 2, 3]
b = a
b.append(4)
c = a.copy()
c.append(5)
print(a)
print(b)
print(c)`,tests:[{expect:`[1, 2, 3, 4]
[1, 2, 3, 4]
[1, 2, 3, 4, 5]`}],hints:["b = a does NOT copy; .copy() does."],solution:`a = [1, 2, 3]
b = a
b.append(4)
c = a.copy()
c.append(5)
print(a)
print(b)
print(c)`},backup:{id:"backup",kind:"fix",title:"The backup that wasn't",task:e.jsx(e.Fragment,{children:"The teacher keeps a backup before correcting a mark. Run it: the backup changed too. Fix it so the backup keeps the original marks."}),starter:`marks = [70, 80, 90]
backup = marks
marks[0] = 0
print("Marks:", marks)
print("Backup:", backup)`,tests:[{expect:`Marks: [0, 80, 90]
Backup: [70, 80, 90]`}],hints:["backup = marks puts a second tag on the same list.","backup = marks.copy()"],solution:`marks = [70, 80, 90]
backup = marks.copy()
marks[0] = 0
print("Marks:", marks)
print("Backup:", backup)`},same:{id:"same",kind:"predict",title:"Equal, or the very same list?",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"=="})," asks ",e.jsx("em",{children:'"do these hold equal values?"'}),". ",e.jsx("code",{children:"is"})," asks ",e.jsx("em",{children:'"are these two names on the very same object?"'}),". Trace the program and type its four lines of output."]}),code:`a = [1, 2, 3]
b = a
c = a.copy()
print(a == c)
print(a is c)
print(a is b)
c.append(4)
print(a == c)`,hints:["c is a copy: equal contents, but a different list.","b = a put a second name on the same list, so a is b.","After c.append(4) the two lists no longer hold the same values."],solution:`True
False
True
False`},grid:{id:"grid",kind:"write",title:"A list of lists",task:e.jsxs(e.Fragment,{children:["Each inner list is one student's marks in two subjects: ",e.jsx("code",{children:"marks = [[70, 80], [65, 90], [88, 72]]"}),". ",e.jsx("code",{children:"marks[1][0]"})," is student 2's first subject. Loop over the students and print ",e.jsx("code",{children:"Student 1: 150"}),", ",e.jsx("code",{children:"Student 2: 155"}),", ",e.jsx("code",{children:"Student 3: 160"}),"."]}),tests:[{expect:`Student 1: 150
Student 2: 155
Student 3: 160`}],requires:[{node:"For"}],forbids:[{text:"150",msg:"Let Python add them."}],hints:["for i in range(len(marks)): — then marks[i][0] + marks[i][1]","Student numbers are i + 1."],solution:`marks = [[70, 80], [65, 90], [88, 72]]
for i in range(len(marks)):
    total = marks[i][0] + marks[i][1]
    print(f"Student {i + 1}: {total}")`},seats:{id:"seats",kind:"make",title:"Seat booking",task:e.jsxs(e.Fragment,{children:["A small hall has 10 seats. ",e.jsx("code",{children:"seats = [False] * 10"})," makes a list of ten False values (False = free). Keep asking ",e.jsx("code",{children:"Seat: "})," until 0. For 1–10: if free, mark it True and print ",e.jsx("code",{children:"Booked 3"}),"; if taken print ",e.jsx("code",{children:"Seat 3 is taken"}),"; anything else prints ",e.jsx("code",{children:"No such seat"}),". Finally print ",e.jsx("code",{children:"Booked seats: [3, 5]"})," (seat numbers, in order) and ",e.jsx("code",{children:"Free: 8"}),". Seat 1 is at index 0!"]}),minLines:18,tests:[{inputs:["3","5","3","0"],expect:u(["3","5","3","0"])},{inputs:["10","1","11","0"],expect:u(["10","1","11","0"]),hidden:!0},{inputs:["0"],expect:u(["0"]),hidden:!0}],requires:[{node:"While"}],hints:["Seat n lives at index n - 1.","Build the booked list at the end: for i in range(10): if seats[i]: booked.append(i + 1)","Free = 10 - len(booked)."],solution:`seats = [False] * 10
n = int(input("Seat: "))
while n != 0:
    if n < 1 or n > 10:
        print("No such seat")
    elif seats[n - 1]:
        print(f"Seat {n} is taken")
    else:
        seats[n - 1] = True
        print(f"Booked {n}")
    n = int(input("Seat: "))
booked = []
for i in range(10):
    if seats[i]:
        booked.append(i + 1)
print(f"Booked seats: {booked}")
print(f"Free: {10 - len(booked)}")`}},T=l,L=[{q:"marks = [10, 20, 30]. After marks[0] = 99, what is marks?",options:["[10, 20, 30]","[99, 20, 30]","TypeError","[99]"],answer:1,explain:"Lists are mutable: you can replace an item in place. (Strings can't — Unit 7.1.)"},{q:"What does [10, 15, 20, 25][1:3] give?",options:["[10, 15]","[15, 20]","[15, 20, 25]","[20]"],answer:1,explain:"Index 1 included, 3 excluded."},{q:"What is printed?",code:`a = [1, 2]
b = a
b.append(3)
print(a)`,options:["[1, 2]","[1, 2, 3]","[3]","Error"],answer:1,explain:"b = a is a second tag on the same list, so a sees the change."},{q:"How do you make an independent copy of list x?",options:["y = x","y = x.copy()","y == x","copy(y, x)"],answer:1,explain:".copy() (or x[:]) makes a new list with the same items."},{q:"What does marks = marks.append(5) leave in marks?",options:["The list with 5 added","None","5","Error"],answer:1,explain:"append returns None. Call it on its own line."},{q:"grid = [[1, 2], [3, 4]]. What is grid[1][0]?",options:["1","2","3","4"],answer:2,explain:"grid[1] is [3, 4]; its index 0 is 3."}];function I(n){const t=[{label:"Why Lists?",kicker:"ONE NAME, MANY VALUES",title:"A list holds many values under one name",blocks:[e.jsxs(h,{children:["Sixty students' marks in sixty variables — ",e.jsx("code",{children:"m1"}),", ",e.jsx("code",{children:"m2"}),", … ",e.jsx("code",{children:"m60"})," — and no loop could walk through them. A ",e.jsx("strong",{children:"list"})," keeps them all in one row of slots, under one name."]}),l.make]},{label:"Change It",kicker:"MUTABLE",title:"Lists can change",blocks:[e.jsxs(h,{children:["Unlike strings, lists are ",e.jsx("strong",{children:"mutable"}),": you can replace, add and remove items in place. Click the operations and watch the slots:"]}),e.jsx(w,{}),l.methods,l.shopping,l.none,e.jsxs(x,{children:["Methods that change a list (",e.jsx("code",{children:"append"}),", ",e.jsx("code",{children:"insert"}),", ",e.jsx("code",{children:"remove"}),", ",e.jsx("code",{children:"sort"}),"…) change it in place and return ",e.jsx("code",{children:"None"}),". ",e.jsx("code",{children:"pop()"})," is the exception: it also hands back the removed item."]})]},{label:"Loop a List",kicker:"for item in list",title:"Walking through a list",blocks:[e.jsxs(h,{children:[e.jsx("code",{children:"for m in marks:"})," gives you each item in turn — no index needed. Use ",e.jsx("code",{children:"for i in range(len(marks))"})," only when you also need the position."]}),l.loop]},{label:"Copy or Alias?",kicker:"NAME TAGS AGAIN",title:"b = a doesn't copy",blocks:[e.jsxs(h,{children:["Remember Unit 4.2: ",e.jsx("code",{children:"="})," ties a name to a value. With a list, two names can end up on the ",e.jsx("em",{children:"same"})," list — and since lists can change, a change through one name shows up through the other. Step through:"]}),e.jsx(S,{}),l.alias,l.backup,e.jsxs(h,{children:["Two lists can be ",e.jsx("strong",{children:"equal"})," without being ",e.jsx("strong",{children:"the same list"}),". Python has a separate question for each: ",e.jsx("code",{children:"=="})," compares the values, ",e.jsx("code",{children:"is"})," checks whether both names sit on one object."]}),l.same,e.jsxs(f,{color:s.blue,icon:"📌",children:["In everyday code, compare values with ",e.jsx("code",{children:"=="}),". Keep ",e.jsx("code",{children:"is"})," for one job: checking for ",e.jsx("code",{children:"None"})," (",e.jsx("code",{children:"if result is None:"}),")."]}),e.jsxs(x,{children:[e.jsx("code",{children:"x = 5"})," moves a tag. ",e.jsx("code",{children:"a.append(4)"})," or ",e.jsx("code",{children:"a[0] = 9"})," changes the list itself — every tag on that list sees it. Need an independent list? ",e.jsx("code",{children:"a.copy()"}),"."]})]},{label:"2-D Lists",kicker:"TABLES",title:"Lists inside lists",blocks:[e.jsxs(h,{children:["A list can hold lists: a table of rows. ",e.jsx("code",{children:"table[row][col]"})," picks one cell — you'll use this a lot in Computational Thinking II (matrices)."]}),l.grid]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: seat booking",blocks:[e.jsx(h,{children:"A list that changes as people book, a while loop, if/elif/else, and index arithmetic. (This is the heart of mini-project Track C, Event Seat Booking.)"}),l.seats]}];return e.jsx(j,{...n,unitId:"Unit7_2",crumb:"MODULE 7 › UNIT 7.2",title:"Lists",sections:t,quiz:L,next:{title:"Unit 7.3 — List Methods & Loop Patterns",text:"sum, min, max, sorted, split and join — and the classic best-so-far pattern."}})}export{T as EXERCISES,I as default};
