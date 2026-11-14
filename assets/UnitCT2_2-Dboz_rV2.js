import{j as e,r as k}from"./index-cCwWvTed.js";import{P as w,K as v,L as F,a as f,T as n,t as j}from"./Lesson-BzQti5aW.js";const y=t=>({text:"#",min:t,msg:`Write your algorithm first, as at least ${t} # comment lines.`}),r=[3,8,12,19,23,31,45,52,67,74,88,91,103];function S(){const[t,l]=k.useState(67),i=[];let d=0,h=r.length-1;for(;d<=h;){const o=Math.floor((d+h)/2);if(i.push({lo:d,hi:h,mid:o}),r[o]===t)break;r[o]<t?d=o+1:h=o-1}const[a,g]=k.useState(0),s=i[Math.min(a,i.length-1)],m=r[s.mid]===t;return e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:10},children:[e.jsxs("label",{style:{fontFamily:f},children:["target = ",e.jsx("select",{value:t,onChange:o=>{l(Number(o.target.value)),g(0)},style:{fontFamily:f,fontSize:15,padding:4},children:[...r,50].map(o=>e.jsx("option",{value:o,children:o},o))})]}),e.jsx("button",{onClick:()=>g(Math.max(0,a-1)),style:{padding:"6px 12px",borderRadius:8,border:`1px solid ${n.border}`,background:n.card,cursor:"pointer"},children:"◀"}),e.jsx("button",{onClick:()=>g(Math.min(i.length-1,a+1)),style:{padding:"6px 14px",borderRadius:8,border:"none",background:n.navy,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"Next step ▶"}),e.jsxs("span",{style:{fontSize:13.5,color:n.slate},children:["Step ",Math.min(a,i.length-1)+1," of ",i.length]})]}),e.jsx("div",{style:{display:"flex",gap:3,overflowX:"auto"},children:r.map((o,c)=>{const x=c>=s.lo&&c<=s.hi;return e.jsxs("div",{style:{textAlign:"center",minWidth:46},children:[e.jsx("div",{style:{fontFamily:f,fontSize:11,color:n.blue},children:c}),e.jsx("div",{style:{padding:"9px 0",borderRadius:7,fontFamily:f,fontWeight:700,border:`1.5px solid ${c===s.mid?m?n.green:n.amber:x?n.teal:n.border}`,background:c===s.mid?j(m?n.green:n.amber,"22"):x?j(n.teal,"10"):n.deep,color:x?n.text:n.muted},children:o}),e.jsxs("div",{style:{fontSize:11,color:n.muted},children:[c===s.lo?"low":"",c===s.hi?" high":""]})]},c)})}),e.jsxs("div",{style:{fontSize:14.5,color:n.slate,marginTop:8},children:["mid = (",s.lo," + ",s.hi,") // 2 = ",s.mid," → data[",s.mid,"] is ",r[s.mid],". ",m?"Found it!":r[s.mid]<t?"Too small: throw away the left half (low = mid + 1).":"Too big: throw away the right half (high = mid - 1).",!m&&a>=i.length-1&&" low passed high — it isn't in the list."]})]})}const p=(t,l)=>{let i=0,d=t.length-1,h=0;for(;i<=d;){h++;const a=Math.floor((i+d)/2);if(t[a]===l)return[a,h];t[a]<l?i=a+1:d=a-1}return[-1,h]},T=["Arun","Divya","Kavya","Meena","Priya","Ravi","Sanjay","Uma","Vikram","Zoya"],b=t=>{const[l,i]=p(T,t);return`Search: ${t}
${l>=0?`${t} is at position ${l+1}`:`${t} is not in the directory`}
Steps: ${i}`},u={linear:{id:"linear",kind:"write",title:"Linear search",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Rolls: "})," (one line) and ",e.jsx("code",{children:"Find: "}),". Check each roll in turn; print ",e.jsx("code",{children:"Found at position 3"})," (from 1), or ",e.jsx("code",{children:"Not found"}),". Use a ",e.jsx("strong",{children:"sentinel"}),": ",e.jsx("code",{children:"pos = -1"})," before the loop means “not found yet” — -1 can never be a real index. No ",e.jsx("code",{children:".index()"})," or ",e.jsx("code",{children:"in"}),"."]}),tests:[{inputs:["1001 1042 1003 1050","1003"],expect:`Rolls: 1001 1042 1003 1050
Find: 1003
Found at position 3`},{inputs:["1 2 3","9"],expect:`Rolls: 1 2 3
Find: 9
Not found`,hidden:!0},{inputs:["5 5 5","5"],expect:`Rolls: 5 5 5
Find: 5
Found at position 1`,hidden:!0}],requires:[y(3),{node:"Break"}],forbids:[{call:"index",msg:"Write the search yourself."},{text:" in rolls",msg:"Write the search yourself with a loop and indexes."}],hints:["for i in range(len(rolls)): if rolls[i] == target: pos = i; break","After the loop: if pos == -1: Not found"],solution:`# 1. pos = -1 (not found yet)
# 2. check each position in order
# 3.     a match: remember it, stop
# 4. print the result
rolls = input("Rolls: ").split()
target = input("Find: ")
pos = -1
for i in range(len(rolls)):
    if rolls[i] == target:
        pos = i
        break
if pos == -1:
    print("Not found")
else:
    print(f"Found at position {pos + 1}")`},allpos:{id:"allpos",kind:"write",title:"Every position",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Marks: "})," and ",e.jsx("code",{children:"Find: "}),". Print every position (from 1) where the mark appears, as a list, and how many: ",e.jsx("code",{children:"Positions: [2, 5] (2 times)"}),"."]}),tests:[{inputs:["72 91 64 38 91","91"],expect:`Marks: 72 91 64 38 91
Find: 91
Positions: [2, 5] (2 times)`},{inputs:["1 2","3"],expect:`Marks: 1 2
Find: 3
Positions: [] (0 times)`,hidden:!0}],requires:[y(2)],hints:["No break this time — you need every match.","enumerate(marks, start=1) gives positions from 1 (Unit 7.4)."],solution:`# 1. an empty list of positions
# 2. scan everything, collecting every match (no break)
marks = input("Marks: ").split()
target = input("Find: ")
found = []
for i, m in enumerate(marks, start=1):
    if m == target:
        found.append(i)
print(f"Positions: {found} ({len(found)} times)")`},binary:{id:"binary",kind:"write",title:"Binary search",task:e.jsxs(e.Fragment,{children:["The list is ",e.jsx("strong",{children:"sorted"}),": ",e.jsx("code",{children:"data = [3, 8, 12, 19, 23, 31, 45, 52, 67, 74, 88, 91, 103]"}),". Ask ",e.jsx("code",{children:"Find: "})," and run the halving search from the stepper, counting the steps. Print ",e.jsx("code",{children:"Found at index 8"})," (or ",e.jsx("code",{children:"Not found"}),") and ",e.jsx("code",{children:"Steps: 3"}),"."]}),tests:[{inputs:["67"],expect:`Find: 67
Found at index ${p(r,67)[0]}
Steps: ${p(r,67)[1]}`},{inputs:["3"],expect:`Find: 3
Found at index 0
Steps: ${p(r,3)[1]}`,hidden:!0},{inputs:["50"],expect:`Find: 50
Not found
Steps: ${p(r,50)[1]}`,hidden:!0}],requires:[y(4),{node:"While"},{text:"// 2"}],hints:["low = 0, high = len(data) - 1; while low <= high: mid = (low + high) // 2","Count a step at the top of each round.","data[mid] < target → low = mid + 1; bigger → high = mid - 1; equal → pos = mid, break"],solution:`# 1. low and high bracket the part still possible
# 2. while something is left: look at the middle (count a step)
# 3.     equal -> found; too small -> drop the left half; too big -> drop the right half
# 4. print result and steps
data = [3, 8, 12, 19, 23, 31, 45, 52, 67, 74, 88, 91, 103]
target = int(input("Find: "))
low = 0
high = len(data) - 1
pos = -1
steps = 0
while low <= high:
    steps += 1
    mid = (low + high) // 2
    if data[mid] == target:
        pos = mid
        break
    elif data[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
if pos == -1:
    print("Not found")
else:
    print(f"Found at index {pos}")
print(f"Steps: {steps}")`},directory:{id:"directory",kind:"make",title:"Directory lookup",task:e.jsxs(e.Fragment,{children:["The class directory is sorted alphabetically: ",e.jsx("code",{children:"Arun Divya Kavya Meena Priya Ravi Sanjay Uma Vikram Zoya"}),". Ask ",e.jsx("code",{children:"Search: "})," and binary-search it (strings compare alphabetically, Unit 5.1). Print ",e.jsx("code",{children:"Priya is at position 5"})," or ",e.jsx("code",{children:"Gopal is not in the directory"}),", then ",e.jsx("code",{children:"Steps: 3"}),". A linear search would need up to 10 steps; binary never needs more than 4."]}),minLines:18,tests:[{inputs:["Priya"],expect:b("Priya")},{inputs:["Gopal"],expect:b("Gopal"),hidden:!0},{inputs:["Zoya"],expect:b("Zoya"),hidden:!0}],requires:[y(4),{node:"While"}],forbids:[{call:"index"}],hints:["Exactly the binary search from before — < and > work on strings too."],solution:`# 1. low/high bracket the sorted names
# 2. look at the middle name, counting steps
# 3.     match -> done; earlier in the alphabet -> go right; later -> go left
# 4. print result and steps
names = "Arun Divya Kavya Meena Priya Ravi Sanjay Uma Vikram Zoya".split()
wanted = input("Search: ")
low = 0
high = len(names) - 1
pos = -1
steps = 0
while low <= high:
    steps += 1
    mid = (low + high) // 2
    if names[mid] == wanted:
        pos = mid
        break
    elif names[mid] < wanted:
        low = mid + 1
    else:
        high = mid - 1
if pos == -1:
    print(f"{wanted} is not in the directory")
else:
    print(f"{wanted} is at position {pos + 1}")
print(f"Steps: {steps}")`}},P=u,I=[{q:"Why is -1 a good “not found” sentinel?",options:["It's negative","It can never be a real index, so it clearly means absent","Python requires it","It's small"],answer:1,explain:"Real positions are 0 or more."},{q:"What must be true before binary search works?",options:["The list is short","The list is sorted","No duplicates","Only numbers"],answer:1,explain:"Throwing away half only makes sense if the order tells you which half."},{q:"About how many steps does binary search need for 1,000,000 sorted items?",options:["1,000,000","500,000","About 20","1"],answer:2,explain:"Halving 20 times: 2²⁰ ≈ 1,000,000."},{q:"Why no break when collecting every position?",options:["Style","break would stop at the first match","Error otherwise","To save time"],answer:1,explain:"First match → break; all matches → full scan."}];function E(t){const l=[{label:"Linear",kicker:"ONE BY ONE",title:"Linear search",blocks:[e.jsx(w,{children:"The simplest search: check every item until you find it. Works on any list, but a list of n items can take n checks."}),u.linear,u.allpos]},{label:"Binary",kicker:"HALVE IT",title:"Binary search",blocks:[e.jsxs(w,{children:["If the list is ",e.jsx("strong",{children:"sorted"}),", look at the middle: one comparison tells you which half to throw away. Pick a target and step through:"]}),e.jsx(S,{}),u.binary,e.jsx(v,{children:"Linear search: up to n steps. Binary search: about log₂ n steps — 13 items need at most 4; a million need about 20. But the data must be sorted first."})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: directory lookup",blocks:[u.directory]}];return e.jsx(F,{...t,unitId:"UnitCT2_2",crumb:"COMPUTATIONAL THINKING II › 2",title:"Searching: Linear & Binary",sections:l,quiz:I,next:{title:"CT II · 3 — Sorting",text:"Bubble, selection and insertion: watch chaos become order, swap by swap."}})}export{P as EXERCISES,E as default};
