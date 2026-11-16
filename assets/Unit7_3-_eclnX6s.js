import{j as e,r as k}from"./index-5ju0ARcj.js";import{P as p,K as x,L as u,T as i,a as c,t as f}from"./Lesson-B4adq15Q.js";const g={margin:0,fontFamily:c,fontSize:14.5,lineHeight:1.7,background:i.codeBg,border:`1px solid ${i.border}`,borderRadius:10,padding:"12px 14px",whiteSpace:"pre"},b=r=>"["+r.map(n=>typeof n=="string"?`'${n}'`:String(n)).join(", ")+"]";function j(){const r=[72,85,64,91,78],n=[{i:0,best:72,pos:0,note:"Assume the first mark is the best — until something beats it."}];for(let s=1;s<r.length;s++){const o=n[n.length-1],h=r[s]>o.best;n.push({i:s,best:h?r[s]:o.best,pos:h?s:o.pos,note:`Is ${r[s]} > ${o.best}? ${h?"Yes — new champion.":"No — champion stays."}`})}const[l,d]=k.useState(0),t=n[l];return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("pre",{style:g,children:`best = marks[0]
pos = 0
for i in range(1, len(marks)):
    if marks[i] > best:
        best = marks[i]
        pos = i`}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:8,alignItems:"center"},children:[e.jsx("button",{onClick:()=>d(Math.max(0,l-1)),style:{padding:"8px 12px",borderRadius:8,border:`1px solid ${i.border}`,background:i.card,cursor:"pointer"},children:"◀"}),e.jsx("button",{onClick:()=>d(Math.min(n.length-1,l+1)),style:{padding:"8px 14px",borderRadius:8,border:"none",background:i.navy,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"Next mark ▶"})]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:4},children:r.map((s,o)=>e.jsxs("div",{style:{textAlign:"center",width:54},children:[e.jsx("div",{style:{fontFamily:c,fontSize:11,color:i.blue},children:o}),e.jsx("div",{style:{padding:"10px 0",borderRadius:8,fontFamily:c,fontWeight:700,fontSize:17,border:`1.5px solid ${o===t.pos?i.amber:o===t.i?i.blue:i.border}`,background:o===t.pos?f(i.amber,"22"):o<=t.i?i.card:i.deep},children:s}),e.jsx("div",{style:{fontSize:16},children:o===t.pos?"👑":""})]},o))}),e.jsxs("div",{style:{fontFamily:c,marginTop:4},children:["best = ",e.jsx("strong",{children:t.best}),", pos = ",e.jsx("strong",{children:t.pos})]}),e.jsx("div",{style:{fontSize:14.5,color:i.slate,marginTop:6},children:t.note})]})]})}const m=r=>{const n=r.split(/\s+/).filter(Boolean).map(Number),l=n.reduce((t,s)=>t+s,0)/n.length,d=n.filter(t=>t>l).length;return[`Marks: ${r}`,`Count: ${n.length}`,`Average: ${l.toFixed(1)}`,`Highest: ${Math.max(...n)}`,`Lowest: ${Math.min(...n)}`,`Ranked: ${b([...n].sort((t,s)=>s-t))}`,`Above average: ${d}`].join(`
`)},a={builtins:{id:"builtins",kind:"type",title:"The list toolbox",task:e.jsxs(e.Fragment,{children:["Predict every line. Lines 3 and 4 show the difference between ",e.jsx("code",{children:"sorted()"})," and ",e.jsx("code",{children:".sort()"}),"."]}),show:`marks = [72, 85, 64, 90, 58]
print(sum(marks), min(marks), max(marks), len(marks))
print(sorted(marks))
print(marks)
marks.sort(reverse=True)
print(marks)`,tests:[{expect:`369 58 90 5
[58, 64, 72, 85, 90]
[72, 85, 64, 90, 58]
[90, 85, 72, 64, 58]`}],hints:["sorted(x) gives a NEW sorted list and leaves x alone. x.sort() rearranges x itself."],solution:`marks = [72, 85, 64, 90, 58]
print(sum(marks), min(marks), max(marks), len(marks))
print(sorted(marks))
print(marks)
marks.sort(reverse=True)
print(marks)`},sortnone:{id:"sortnone",kind:"fix",title:"Sorted into nothing",task:e.jsx(e.Fragment,{children:"The teacher wants a ranked copy and the original order kept. Run it — two problems. Fix it so it prints the sorted list, then the untouched original."}),starter:`marks = [3, 1, 2]
ranked = marks.sort()
print(ranked)
print(marks)`,tests:[{expect:`[1, 2, 3]
[3, 1, 2]`}],hints:[".sort() returns None (like append) AND changes marks.","ranked = sorted(marks) makes a new list and leaves marks alone."],solution:`marks = [3, 1, 2]
ranked = sorted(marks)
print(ranked)
print(marks)`},topper:{id:"topper",kind:"write",title:"Find the topper (no max!)",task:e.jsxs(e.Fragment,{children:["Read 5 marks into a list with a loop (prompt ",e.jsx("code",{children:"Mark: "}),"). Then, ",e.jsx("strong",{children:"without max()"}),", use best-so-far to find the highest mark and its position, and print ",e.jsx("code",{children:"Highest: 91 (student 4)"})," — students are numbered from 1."]}),minLines:12,tests:[{inputs:["72","85","64","91","78"],expect:`Mark: 72
Mark: 85
Mark: 64
Mark: 91
Mark: 78
Highest: 91 (student 4)`},{inputs:["99","10","20","30","40"],expect:`Mark: 99
Mark: 10
Mark: 20
Mark: 30
Mark: 40
Highest: 99 (student 1)`,hidden:!0},{inputs:["1","2","3","4","5"],expect:`Mark: 1
Mark: 2
Mark: 3
Mark: 4
Mark: 5
Highest: 5 (student 5)`,hidden:!0}],forbids:[{call:"max",msg:"Do it with the best-so-far pattern — no max( )."},{call:"sort"},{call:"sorted"}],hints:['Fill the list: for i in range(5): marks.append(int(input("Mark: ")))',"best = marks[0], pos = 0, then loop from index 1.",'print(f"Highest: {best} (student {pos + 1})")'],solution:`marks = []
for i in range(5):
    marks.append(int(input("Mark: ")))
best = marks[0]
pos = 0
for i in range(1, len(marks)):
    if marks[i] > best:
        best = marks[i]
        pos = i
print(f"Highest: {best} (student {pos + 1})")`},splitjoin:{id:"splitjoin",kind:"type",title:"split() and join()",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"split()"})," cuts text into a list of words (at spaces, or at any separator you give). ",e.jsx("code",{children:"join()"})," glues a list of strings back into one. Remember: split gives ",e.jsx("strong",{children:"strings"})," — convert before maths."]}),show:`line = "72 85 64 90"
parts = line.split()
print(parts)
marks = []
for p in parts:
    marks.append(int(p))
print(sum(marks))
print("-".join(parts))
print("Priya,Arun,Meena".split(","))`,minLines:10,tests:[{expect:`['72', '85', '64', '90']
311
72-85-64-90
['Priya', 'Arun', 'Meena']`}],hints:['join is called on the separator: "-".join(parts).'],solution:`line = "72 85 64 90"
parts = line.split()
print(parts)
marks = []
for p in parts:
    marks.append(int(p))
print(sum(marks))
print("-".join(parts))
print("Priya,Arun,Meena".split(","))`},oneline:{id:"oneline",kind:"write",title:"All the marks on one line",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Marks: "})," once — the user types all marks separated by spaces. Split, convert each to int, and print ",e.jsx("code",{children:"Count: 5"}),", ",e.jsx("code",{children:"Average: 69.80"})," (2 decimals) and ",e.jsx("code",{children:"Highest: 90"}),"."]}),tests:[{inputs:["72 85 64 90 38"],expect:`Marks: 72 85 64 90 38
Count: 5
Average: 69.80
Highest: 90`},{inputs:["100 50"],expect:`Marks: 100 50
Count: 2
Average: 75.00
Highest: 100`,hidden:!0}],requires:[{call:"split"}],hints:["for p in line.split(): marks.append(int(p))","Now sum, len and max do the rest."],solution:`line = input("Marks: ")
marks = []
for p in line.split():
    marks.append(int(p))
print(f"Count: {len(marks)}")
print(f"Average: {sum(marks) / len(marks):.2f}")
print(f"Highest: {max(marks)}")`},words:{id:"words",kind:"write",title:"Longest word",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Sentence: "}),". Print the number of words and the longest word (the first one, if there's a tie) — best-so-far on ",e.jsx("code",{children:"len"}),": ",e.jsx("code",{children:"Words: 6"}),", ",e.jsx("code",{children:"Longest: education"}),"."]}),tests:[{inputs:["python makes education fun and fast"],expect:`Sentence: python makes education fun and fast
Words: 6
Longest: education`},{inputs:["a bb cc d"],expect:`Sentence: a bb cc d
Words: 4
Longest: bb`,hidden:!0}],requires:[{call:"split"}],hints:["words = sentence.split()","longest = words[0]; for w in words: if len(w) > len(longest): longest = w"],solution:`sentence = input("Sentence: ")
words = sentence.split()
longest = words[0]
for w in words:
    if len(w) > len(longest):
        longest = w
print(f"Words: {len(words)}")
print(f"Longest: {longest}")`},filter:{id:"filter",kind:"write",title:"Filter into a new list",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Marks: "})," (one line). Build a new list ",e.jsx("code",{children:"passed"})," with the marks of 40 and above, and count the rest. Print ",e.jsx("code",{children:"Passed: [72, 85, 64, 90]"})," and ",e.jsx("code",{children:"Failed: 1"}),"."]}),tests:[{inputs:["72 85 64 90 38"],expect:`Marks: 72 85 64 90 38
Passed: [72, 85, 64, 90]
Failed: 1`},{inputs:["10 40 39"],expect:`Marks: 10 40 39
Passed: [40]
Failed: 2`,hidden:!0}],requires:[{call:"append"}],hints:["passed = [] and failed = 0 before the loop.","Inside: if m >= 40: passed.append(m) else: failed += 1"],solution:`line = input("Marks: ")
passed = []
failed = 0
for p in line.split():
    m = int(p)
    if m >= 40:
        passed.append(m)
    else:
        failed += 1
print(f"Passed: {passed}")
print(f"Failed: {failed}")`},comp:{id:"comp",kind:"complete",optional:!0,title:"Bonus: list comprehension",task:e.jsxs(e.Fragment,{children:["Python can build a list in one line: ",e.jsx("code",{children:"[expression for item in collection]"}),", with an optional ",e.jsx("code",{children:"if"})," filter. Fill the blanks so ",e.jsx("code",{children:"marks"})," holds ints and ",e.jsx("code",{children:"passed"})," holds only marks ≥ 40. (Optional — the loops you wrote do the same job.)"]}),starter:`line = "72 85 38 64 21"
marks = [___ for p in line.split()]
passed = [m for m in marks if ___]
print(marks)
print(passed)`,tests:[{expect:`[72, 85, 38, 64, 21]
[72, 85, 64]`}],hints:["int(p) converts each piece.","if m >= 40"],solution:`line = "72 85 38 64 21"
marks = [int(p) for p in line.split()]
passed = [m for m in marks if m >= 40]
print(marks)
print(passed)`},report:{id:"report",kind:"make",title:"Class report",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Marks: "})," on one line. Print, in this order: ",e.jsx("code",{children:"Count"}),", ",e.jsx("code",{children:"Average"})," (1 decimal), ",e.jsx("code",{children:"Highest"}),", ",e.jsx("code",{children:"Lowest"}),", ",e.jsx("code",{children:"Ranked"})," (highest first, as a list), and ",e.jsx("code",{children:"Above average"})," (how many marks are strictly above the average)."]}),minLines:12,tests:[{inputs:["72 85 64 90 38"],expect:m("72 85 64 90 38")},{inputs:["50 50 50"],expect:m("50 50 50"),hidden:!0},{inputs:["99 1"],expect:m("99 1"),hidden:!0}],requires:[{call:"split"}],hints:["sorted(marks, reverse=True) gives the ranked list.","Work out avg first, then count marks with m > avg in a loop.",'f"Average: {avg:.1f}"'],solution:`line = input("Marks: ")
marks = []
for p in line.split():
    marks.append(int(p))
avg = sum(marks) / len(marks)
above = 0
for m in marks:
    if m > avg:
        above += 1
print(f"Count: {len(marks)}")
print(f"Average: {avg:.1f}")
print(f"Highest: {max(marks)}")
print(f"Lowest: {min(marks)}")
print(f"Ranked: {sorted(marks, reverse=True)}")
print(f"Above average: {above}")`}},M=a,w=[{q:"What's the difference between sorted(x) and x.sort()?",options:["None","sorted returns a new list; x.sort() changes x and returns None","sort is faster only","sorted changes x"],answer:1,explain:"Use sorted() when you want to keep the original order."},{q:'What does "a,b,,c".split(",") give?',options:["['a', 'b', 'c']","['a', 'b', '', 'c']","['a,b,,c']","Error"],answer:1,explain:"With an explicit separator, an empty piece appears between two commas."},{q:'What does " ".join(["I", "love", "Python"]) give?',options:['"I love Python"','["I love Python"]','"ILovePython"',"Error"],answer:0,explain:"join glues the strings with the separator between them."},{q:"In best-so-far, where does best start?",options:["At 0","At the first item","At the last item","At max()"],answer:1,explain:"Starting at 0 breaks for all-negative lists; the first item is always a fair starting champion."},{q:`"72 85".split() gives ['72', '85']. What is sum(['72', '85'])?`,options:["157",'"7285"',"TypeError","0"],answer:2,explain:"split gives strings. Convert each to int first."},{q:"What does [n * 2 for n in [1, 2, 3]] give?",options:["[1, 2, 3, 1, 2, 3]","[2, 4, 6]","6","Error"],answer:1,explain:"A comprehension builds a new list from an expression for each item."}];function T(r){const n=[{label:"Toolbox",kicker:"BUILT-INS",title:"sum, min, max, sorted",blocks:[e.jsxs(p,{children:["Python has built-in tools for the most common list questions. One important pair: ",e.jsx("code",{children:"sorted(x)"})," gives a new sorted list; ",e.jsx("code",{children:"x.sort()"})," sorts x itself."]}),a.builtins,a.sortnone]},{label:"Best So Far",kicker:"THE TOURNAMENT",title:"Finding the topper yourself",blocks:[e.jsxs(p,{children:[e.jsx("code",{children:"max()"})," is handy — but exams (and real problems like “which student, not just which mark?”) need the pattern behind it: ",e.jsx("strong",{children:"best-so-far"}),". The current champion faces each mark in turn:"]}),e.jsx(j,{}),a.topper]},{label:"split & join",kicker:"TEXT ↔ LIST",title:"From one line of text to a list",blocks:[e.jsxs(p,{children:["Users type a whole line; your program wants a list. ",e.jsx("code",{children:"split()"})," turns text into a list of pieces; ",e.jsx("code",{children:"join()"})," turns a list of strings back into text."]}),a.splitjoin,a.oneline,a.words,e.jsxs(x,{children:["The everyday recipe: ",e.jsx("code",{children:"line = input()"})," → ",e.jsx("code",{children:"line.split()"})," → convert each piece with ",e.jsx("code",{children:"int()"})," → use the list."]})]},{label:"Filter",kicker:"BUILD A NEW LIST",title:"Keep only what you need",blocks:[a.filter,a.comp]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: class report",blocks:[e.jsx(p,{children:"split, convert, sum/len, max/min, sorted, and a count pattern — one input line, six results."}),a.report]}];return e.jsx(u,{...r,unitId:"Unit7_3",crumb:"MODULE 7 › UNIT 7.3",title:"List Methods & Loop Patterns",sections:n,quiz:w,next:{title:"Unit 7.4 — Tuples",text:"Fixed records, unpacking, a, b = b, a, and the enumerate / zip loop helpers."}})}export{M as EXERCISES,T as default};
