import{j as e}from"./index-BQ9ta_BJ.js";import{K as l,L as h}from"./Lesson-DNKKUv9k.js";import{F as p}from"./FourMoves-uzVMLc2e.js";const a=s=>({text:"#",min:s,msg:`Write your algorithm first, as at least ${s} # comment lines.`}),u=s=>{let n=-1/0,r=-1/0;for(const t of s)t>n?(r=n,n=t):t>r&&t!==n&&(r=t);return r},m=s=>{let n=0,r=0;for(const t of s)r=t===0?r+1:0,n=Math.max(n,r);return n},c=s=>{const n=s.split(" ").map(Number),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];let t=0;return n.forEach((o,d)=>{o>n[t]&&(t=d)}),[`Rainfall: ${s}`,`Wettest: ${r[t]} (${n[t]} mm)`,`Dry months: ${n.filter(o=>o===0).length}`,`Longest dry spell: ${m(n)} months`,`Total: ${n.reduce((o,d)=>o+d,0)} mm`].join(`
`)},i={minpos:{id:"minpos",kind:"write",title:"Lowest mark, and where",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Marks: "})," (one line). ",e.jsx("strong",{children:"Without min()"}),", find the lowest mark and its position (from 1) in one pass: ",e.jsx("code",{children:"Lowest: 38 at position 4"}),"."]}),tests:[{inputs:["72 85 64 38 90"],expect:`Marks: 72 85 64 38 90
Lowest: 38 at position 4`},{inputs:["5"],expect:`Marks: 5
Lowest: 5 at position 1`,hidden:!0},{inputs:["9 1 1"],expect:`Marks: 9 1 1
Lowest: 1 at position 2`,hidden:!0}],requires:[a(3)],forbids:[{call:"min"},{call:"sorted"},{call:"sort"}],hints:["Seed with the first item: low = marks[0], pos = 0, then scan from index 1 with a strict <."],solution:`# 1. seed low and pos with the first item
# 2. scan the rest
# 3.     a smaller item replaces low and pos
# 4. print (positions start at 1)
marks = [int(x) for x in input("Marks: ").split()]
low = marks[0]
pos = 0
for i in range(1, len(marks)):
    if marks[i] < low:
        low = marks[i]
        pos = i
print(f"Lowest: {low} at position {pos + 1}")`},secondbest:{id:"secondbest",kind:"write",title:"Second highest (one pass)",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Scores: "})," and print the second-highest ",e.jsx("em",{children:"different"})," score, without sorting: ",e.jsx("code",{children:"Second highest: 85"}),". Keep two champions as you scan. If every score is the same, print ",e.jsx("code",{children:"Second highest: none"}),"."]}),tests:[{inputs:["72 85 64 91 85"],expect:`Scores: 72 85 64 91 85
Second highest: 85`},{inputs:["91 72 91"],expect:`Scores: 91 72 91
Second highest: ${u([91,72,91])}`,hidden:!0},{inputs:["50 50"],expect:`Scores: 50 50
Second highest: none`,hidden:!0}],requires:[a(3)],forbids:[{call:"sorted"},{call:"sort"},{call:"max"}],hints:["first = second = None. For each x: if x beats first, the old first becomes second.","Otherwise, if x is between them (and not equal to first), it becomes the new second."],solution:`# 1. two champions, none yet
# 2. for each score
# 3.     beats first -> old first slides to second; else beats second (and differs) -> new second
# 4. print second, or none
scores = [int(x) for x in input("Scores: ").split()]
first = None
second = None
for x in scores:
    if first is None or x > first:
        second = first
        first = x
    elif x != first and (second is None or x > second):
        second = x
if second is None:
    print("Second highest: none")
else:
    print(f"Second highest: {second}")`},band:{id:"band",kind:"write",title:"How many in the band?",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Marks: "})," and ",e.jsx("code",{children:"Band (low high): "}),". Print how many marks are inside the band (inclusive) and the list of them: ",e.jsx("code",{children:"In band: 3 [72, 64, 75]"}),"."]}),tests:[{inputs:["72 85 64 38 90 75","60 80"],expect:`Marks: 72 85 64 38 90 75
Band (low high): 60 80
In band: 3 [72, 64, 75]`},{inputs:["10 20","50 60"],expect:`Marks: 10 20
Band (low high): 50 60
In band: 0 []`,hidden:!0}],requires:[a(3)],hints:["low, high = [int(x) for x in input(...).split()] — or split then unpack and convert.","if low <= m <= high: inside.append(m)"],solution:`# 1. read marks and the band
# 2. scan the marks
# 3.     keep the ones with low <= m <= high
# 4. print count and list
marks = [int(x) for x in input("Marks: ").split()]
low, high = [int(x) for x in input("Band (low high): ").split()]
inside = []
for m in marks:
    if low <= m <= high:
        inside.append(m)
print(f"In band: {len(inside)} {inside}")`},streak:{id:"streak",kind:"write",title:"The longest streak",task:e.jsxs(e.Fragment,{children:["A new scanning pattern: the ",e.jsx("strong",{children:"current streak"})," grows while a condition holds and resets to 0 when it breaks; a ",e.jsx("strong",{children:"best streak"})," remembers the longest. Ask ",e.jsx("code",{children:"Results (W/L): "})," like ",e.jsx("code",{children:"W W L W W W L"})," and print ",e.jsx("code",{children:"Longest winning streak: 3"}),"."]}),tests:[{inputs:["W W L W W W L"],expect:`Results (W/L): W W L W W W L
Longest winning streak: 3`},{inputs:["L L"],expect:`Results (W/L): L L
Longest winning streak: 0`,hidden:!0},{inputs:["W W W W"],expect:`Results (W/L): W W W W
Longest winning streak: 4`,hidden:!0}],requires:[a(3)],hints:["current = 0, best = 0. On W: current += 1, then if current > best: best = current. On L: current = 0."],solution:`# 1. current and best streaks start at 0
# 2. for each result
# 3.     W extends current (and maybe best); L resets current
# 4. print best
results = input("Results (W/L): ").split()
current = 0
best = 0
for r in results:
    if r == "W":
        current += 1
        if current > best:
            best = current
    else:
        current = 0
print(f"Longest winning streak: {best}")`},rainfall:{id:"rainfall",kind:"make",title:"Rainfall report",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Rainfall: "})," — 12 monthly values in mm, January to December. In ",e.jsx("strong",{children:"one pass"}),", find: the wettest month (by name; first wins ties), the number of dry months (0 mm), the longest run of consecutive dry months, and the total. Print exactly like ",e.jsx("code",{children:"Wettest: Oct (320 mm)"}),", ",e.jsx("code",{children:"Dry months: 4"}),", ",e.jsx("code",{children:"Longest dry spell: 3 months"}),", ",e.jsx("code",{children:"Total: 1450 mm"}),"."]}),minLines:22,tests:[{inputs:["12 0 0 0 40 90 110 120 200 320 210 0"],expect:c("12 0 0 0 40 90 110 120 200 320 210 0")},{inputs:["5 5 5 5 5 5 5 5 5 5 5 5"],expect:c("5 5 5 5 5 5 5 5 5 5 5 5"),hidden:!0},{inputs:["0 0 30 0 0 0 0 80 0 0 0 0"],expect:c("0 0 30 0 0 0 0 80 0 0 0 0"),hidden:!0}],requires:[a(4),{node:"For"}],forbids:[{call:"max"}],hints:['months = ["Jan", "Feb", …] — the wettest index picks the name.',"Four things updated in the same loop: wettest index, dry count, current/best dry streak, total."],solution:`# 1. month names; seeds for wettest, dry count, streaks, total
# 2. one pass over the 12 values
# 3.     update wettest, count dry, extend or reset the dry streak, add to total
# 4. print the four results
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
rain = [int(x) for x in input("Rainfall: ").split()]
wet = 0
dry = 0
current = 0
best = 0
total = 0
for i in range(len(rain)):
    if rain[i] > rain[wet]:
        wet = i
    if rain[i] == 0:
        dry += 1
        current += 1
        if current > best:
            best = current
    else:
        current = 0
    total += rain[i]
print(f"Wettest: {months[wet]} ({rain[wet]} mm)")
print(f"Dry months: {dry}")
print(f"Longest dry spell: {best} months")
print(f"Total: {total} mm")`}},b=i,f=[{q:"Why seed best-so-far with the first item, not 0?",options:["Faster","0 would be wrong for lists of negative numbers (or for finding a minimum)","Required","No reason"],answer:1,explain:"The first item is always a real candidate."},{q:"In the streak pattern, what happens when the condition breaks?",options:["best resets","current resets to 0; best keeps its record","The loop stops","Both reset"],answer:1,explain:"current is “this run”; best is “the record”."},{q:"Why find several results in ONE pass?",options:["Required","Each pass over big data costs time; one loop can update several accumulators","It's shorter","Python can't loop twice"],answer:1,explain:"Same answers, less work."},{q:"For “second highest different score”, why check x != first?",options:["Style","So a repeat of the top score isn't counted as second","To avoid errors","No reason"],answer:1,explain:"91 72 91 → second is 72, not 91."}];function g(s){const n=[{label:"One Pass",kicker:"SCANNING",title:"Answer questions in one sweep",blocks:[e.jsx(p,{problem:"Find the lowest mark and its position.",answers:{decompose:"Keep the best candidate so far and where it was · visit every mark · replace the candidate when a smaller one appears.",pattern:"Compare-and-maybe-replace for every item → a loop.",abstract:"Best-so-far (Unit 7.3) with < instead of >, plus remembering the index.",algorithm:`low = marks[0], pos = 0
for i from 1 to len - 1:
    if marks[i] < low: low = marks[i], pos = i
print low and pos + 1`}}),i.minpos,i.secondbest]},{label:"Filter & Streak",kicker:"MORE SCANS",title:"Bands and streaks",blocks:[i.band,i.streak,e.jsx(l,{children:"A scan keeps a few variables up to date as it walks: a champion, a count, a total — or a current run and a record run."})]},{label:"Make It",kicker:"FOUR RESULTS, ONE LOOP",title:"Your program: rainfall report",blocks:[i.rainfall]}];return e.jsx(h,{...s,unitId:"UnitCT2_1",crumb:"COMPUTATIONAL THINKING II › 1",title:"Scanning a List",sections:n,quiz:f,next:{title:"CT II · 2 — Searching: Linear & Binary",text:"Find it in n steps — or log n if the list is sorted."}})}export{b as EXERCISES,g as default};
