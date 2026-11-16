import{j as e,r as k}from"./index-B7nVsXSH.js";import{P as x,K as w,L as y,T as l,a as T,t as b}from"./Lesson-TE-z-zj8.js";const h=a=>({text:"#",min:a,msg:`Write your algorithm first, as at least ${a} # comment lines.`}),m=a=>"["+a.join(", ")+"]";function u(a){const n=[...a],r=[];let i=0,o=0;for(let s=0;s<n.length;s++){let d=!1;for(let t=0;t<n.length-1-s;t++)n[t]>n[t+1]&&([n[t],n[t+1]]=[n[t+1],n[t]],i++,d=!0);if(o++,r.push(`Pass ${o}: ${m(n)}`),!d)break}return r.push(`Swaps: ${i}`),r}function j(a){const n=[...a],r=[];for(let i=0;i<n.length-1;i++){let o=i;for(let s=i+1;s<n.length;s++)n[s]<n[o]&&(o=s);[n[i],n[o]]=[n[o],n[i]],r.push(`Pass ${i+1}: ${m(n)}`)}return r}function g(a){const n=[...a],r=[];for(let i=1;i<n.length;i++){const o=n[i];let s=i-1;for(;s>=0&&n[s]>o;)n[s+1]=n[s],s--;n[s+1]=o,r.push(`Insert ${o}: ${m(n)}`)}return r}const p=(a,n,r)=>[`${a}: ${n}`,...r(n.split(" ").map(Number))].join(`
`);function N(){const a=[5,2,8,1,4],n=[],r=[...a];for(let d=0;d<r.length;d++)for(let t=0;t<r.length-1-d;t++){const f=r[t]>r[t+1];f&&([r[t],r[t+1]]=[r[t+1],r[t]]),n.push({a:[...r],j:t,sw:f,done:r.length-d})}const[i,o]=k.useState(0),s=n[i];return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:8},children:s.a.map((d,t)=>e.jsx("div",{style:{width:52,textAlign:"center",padding:"10px 0",borderRadius:8,fontFamily:T,fontWeight:700,fontSize:18,border:`1.5px solid ${t===s.j||t===s.j+1?s.sw?l.orange:l.teal:t>=s.done?l.green:l.border}`,background:t>=s.done?b(l.green,"14"):t===s.j||t===s.j+1?b(s.sw?l.orange:l.teal,"18"):l.card},children:d},t))}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{onClick:()=>o(Math.max(0,i-1)),style:{padding:"6px 12px",borderRadius:8,border:`1px solid ${l.border}`,background:l.card,cursor:"pointer"},children:"◀"}),e.jsx("button",{onClick:()=>o(Math.min(n.length-1,i+1)),style:{padding:"6px 14px",borderRadius:8,border:"none",background:l.navy,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"Next comparison ▶"}),e.jsxs("span",{style:{fontSize:14,color:l.slate},children:["Compared positions ",s.j," and ",s.j+1,": ",s.sw?"out of order → swapped":"in order → left alone",". Green = settled at the end."]})]})]})}const c={bubble:{id:"bubble",kind:"write",title:"Bubble sort, with an early exit",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Numbers: "}),". Bubble sort: in each pass compare neighbours ",e.jsx("code",{children:"a[j]"})," and ",e.jsx("code",{children:"a[j+1]"})," and swap if out of order. After each pass print ",e.jsx("code",{children:"Pass 1: [2, 5, 1, 4, 8]"}),". If a pass makes ",e.jsx("strong",{children:"no"})," swaps, the list is sorted — stop. Finally ",e.jsx("code",{children:"Swaps: 6"}),". No sort() or sorted()."]}),minLines:16,tests:[{inputs:["5 2 8 1 4"],expect:p("Numbers","5 2 8 1 4",u)},{inputs:["1 2 3 4"],expect:p("Numbers","1 2 3 4",u),hidden:!0},{inputs:["9 7 5 3 1"],expect:p("Numbers","9 7 5 3 1",u),hidden:!0}],requires:[h(4),{node:"For",min:2}],forbids:[{call:"sort"},{call:"sorted"}],hints:["for i in range(n): swapped = False; for j in range(n - 1 - i): …","Swap in one line: a[j], a[j + 1] = a[j + 1], a[j] (Unit 7.4).","After the inner loop: passes += 1, print, then if not swapped: break."],solution:`# 1. repeat passes over the list
# 2.     compare each neighbouring pair; swap if out of order (count swaps)
# 3.     print the list after the pass
# 4.     a pass with no swaps means sorted: stop
a = [int(x) for x in input("Numbers: ").split()]
n = len(a)
swaps = 0
passes = 0
for i in range(n):
    swapped = False
    for j in range(n - 1 - i):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]
            swaps += 1
            swapped = True
    passes += 1
    print(f"Pass {passes}: {a}")
    if not swapped:
        break
print(f"Swaps: {swaps}")`},offbyone:{id:"offbyone",kind:"fix",title:"One step too far",task:e.jsxs(e.Fragment,{children:["This bubble sort crashes. Run it, read the coach, and fix the inner range — think about what ",e.jsx("code",{children:"j + 1"})," reaches on the last round."]}),starter:`a = [4, 1, 3, 2]
n = len(a)
for i in range(n):
    for j in range(n - i):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]
print(a)`,tests:[{expect:"[1, 2, 3, 4]"}],hints:["When j is the last index, a[j + 1] is past the end. Stop one earlier: range(n - 1 - i)."],solution:`a = [4, 1, 3, 2]
n = len(a)
for i in range(n):
    for j in range(n - 1 - i):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]
print(a)`},selection:{id:"selection",kind:"write",title:"Selection sort",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Numbers: "}),". For each position i (except the last), find the index of the smallest value from i to the end, and swap it into position i. Print the list after each pass: ",e.jsx("code",{children:"Pass 1: [1, 2, 8, 5, 4]"}),"."]}),minLines:12,tests:[{inputs:["5 2 8 1 4"],expect:p("Numbers","5 2 8 1 4",j)},{inputs:["3 3 1"],expect:p("Numbers","3 3 1",j),hidden:!0}],requires:[h(3),{node:"For",min:2}],forbids:[{call:"sort"},{call:"sorted"},{call:"min"}],hints:["for i in range(n - 1): smallest = i; for j in range(i + 1, n): if a[j] < a[smallest]: smallest = j","Then swap a[i] and a[smallest] and print."],solution:`# 1. for each position i (but the last)
# 2.     find the smallest item from i onwards
# 3.     swap it into position i, print
nums = [int(x) for x in input("Numbers: ").split()]
n = len(nums)
for i in range(n - 1):
    smallest = i
    for j in range(i + 1, n):
        if nums[j] < nums[smallest]:
            smallest = j
    nums[i], nums[smallest] = nums[smallest], nums[i]
    print(f"Pass {i + 1}: {nums}")`},insertion:{id:"insertion",kind:"write",title:"Insertion sort",task:e.jsxs(e.Fragment,{children:["The card-player's sort. Ask ",e.jsx("code",{children:"Numbers: "}),". Take each item from index 1 onwards (the ",e.jsx("em",{children:"key"}),"), shift the bigger items before it one place right, and drop the key into the gap. Print ",e.jsx("code",{children:"Insert 2: [2, 5, 8, 1, 4]"})," after each."]}),minLines:12,tests:[{inputs:["5 2 8 1 4"],expect:p("Numbers","5 2 8 1 4",g)},{inputs:["4 3 2 1"],expect:p("Numbers","4 3 2 1",g),hidden:!0}],requires:[h(3),{node:"While"}],forbids:[{call:"sort"},{call:"sorted"}],hints:["key = a[i]; j = i - 1; while j >= 0 and a[j] > key: a[j + 1] = a[j]; j -= 1","Then a[j + 1] = key."],solution:`# 1. take each item from index 1 as the key
# 2.     shift bigger items before it one place right
# 3.     put the key in the gap, print
a = [int(x) for x in input("Numbers: ").split()]
for i in range(1, len(a)):
    key = a[i]
    j = i - 1
    while j >= 0 and a[j] > key:
        a[j + 1] = a[j]
        j -= 1
    a[j + 1] = key
    print(f"Insert {key}: {a}")`},rank:{id:"rank",kind:"make",title:"Rank the class",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Names: "})," and ",e.jsx("code",{children:"Marks: "}),". Build a list of ",e.jsx("code",{children:"(name, mark)"})," tuples and sort it by mark, ",e.jsx("strong",{children:"highest first"}),", with your own selection sort (compare ",e.jsx("code",{children:"rec[1]"}),"). Print ",e.jsx("code",{children:"1. Meena 91"})," and so on. No sort/sorted."]}),minLines:16,tests:[{inputs:["Priya Arun Meena Ravi","87 62 91 74"],expect:`Names: Priya Arun Meena Ravi
Marks: 87 62 91 74
1. Meena 91
2. Priya 87
3. Ravi 74
4. Arun 62`},{inputs:["A B","10 20"],expect:`Names: A B
Marks: 10 20
1. B 20
2. A 10`,hidden:!0}],requires:[h(3)],forbids:[{call:"sort"},{call:"sorted"}],hints:["records = list(zip(names, marks)) — convert marks to int first.","Selection sort, but look for the LARGEST mark: if records[j][1] > records[best][1]"],solution:`# 1. pair names and marks into (name, mark) tuples
# 2. selection sort by mark, largest first
# 3. print the ranking
names = input("Names: ").split()
marks = [int(x) for x in input("Marks: ").split()]
records = list(zip(names, marks))
n = len(records)
for i in range(n - 1):
    best = i
    for j in range(i + 1, n):
        if records[j][1] > records[best][1]:
            best = j
    records[i], records[best] = records[best], records[i]
for rank, (name, mark) in enumerate(records, start=1):
    print(f"{rank}. {name} {mark}")`}},R=c,S=[{q:"After the first bubble-sort pass, what is guaranteed?",options:["The list is sorted","The largest item is at the end","The smallest is at the start","Nothing"],answer:1,explain:"The biggest value bubbles all the way to the right."},{q:"Why stop when a pass makes no swaps?",options:["Required","No swaps means every neighbour is in order — the list is already sorted","To save memory","To avoid errors"],answer:1,explain:"An already-sorted list takes just one pass."},{q:"Selection sort's inner loop looks for…",options:["Any out-of-order pair","The smallest remaining item","The middle","Duplicates"],answer:1,explain:"Then one swap puts it in place."},{q:"How many comparisons do these simple sorts need for n items, roughly?",options:["n","About n²/2","log n","1"],answer:1,explain:"That's why Python's built-in sorted() uses a much cleverer algorithm (Timsort) for big data."}];function v(a){const n=[{label:"Bubble",kicker:"NEIGHBOURS SWAP",title:"Bubble sort",blocks:[e.jsx(x,{children:"sorted() hides the work. Here you do it yourself. Bubble sort compares neighbours and swaps them when out of order — big values bubble to the end:"}),e.jsx(N,{}),c.bubble,c.offbyone]},{label:"Selection",kicker:"PICK THE SMALLEST",title:"Selection sort",blocks:[c.selection]},{label:"Insertion",kicker:"LIKE SORTING CARDS",title:"Insertion sort",blocks:[c.insertion,e.jsx(w,{children:"Three different algorithms, same result. They differ in how much work they do — and that difference matters for big data."})]},{label:"Make It",kicker:"SORT RECORDS",title:"Your program: rank the class",blocks:[c.rank]}];return e.jsx(y,{...a,unitId:"UnitCT2_3",crumb:"COMPUTATIONAL THINKING II › 3",title:"Sorting: Bubble, Selection & Insertion",sections:n,quiz:S,next:{title:"CT II · 4 — Matrices",text:"Rows and columns: the shape behind images, games and spreadsheets."}})}export{R as EXERCISES,v as default};
