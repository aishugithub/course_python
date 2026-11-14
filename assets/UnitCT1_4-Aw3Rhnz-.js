import{j as e,r as p}from"./index-CD7nmDt6.js";import{P as x,N as g,T as s,K as j,L as y,a as h,t as u}from"./Lesson-MmSVdMEX.js";const d=n=>({text:"#",min:n,msg:`Write the row rule first, as at least ${n} # comment lines.`}),c={inverted:{rule:"row i (1…n): n − i + 1 stars",f:n=>Array.from({length:n},(t,r)=>"*".repeat(n-r))},right:{rule:"row i: n − i spaces, then i stars",f:n=>Array.from({length:n},(t,r)=>" ".repeat(n-r-1)+"*".repeat(r+1))},floyd:{rule:"row i: the next i numbers of a counter that never resets",f:n=>{let t=1;return Array.from({length:n},(r,i)=>Array.from({length:i+1},()=>t++).join(" "))}},hollow:{rule:"border cell → *, inside → space",f:n=>Array.from({length:n},(t,r)=>Array.from({length:n},(i,o)=>r===0||r===n-1||o===0||o===n-1?"*":" ").join(""))}};function b(){const[n,t]=p.useState("right"),[r,i]=p.useState(5);return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:Object.keys(c).map(o=>e.jsx("button",{onClick:()=>t(o),style:{padding:"7px 12px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",fontWeight:700,border:`1.5px solid ${n===o?s.navy:s.border}`,background:n===o?s.navy:s.card,color:n===o?"#fff":s.text},children:o},o))}),e.jsxs("label",{style:{display:"block",fontFamily:h,marginTop:10},children:["n = ",e.jsx("strong",{children:r}),e.jsx("input",{type:"range",min:2,max:8,value:r,onChange:o=>i(Number(o.target.value)),style:{width:"100%",accentColor:s.navy}})]}),e.jsxs("div",{style:{background:u(s.purple,"0E"),border:`1px solid ${u(s.purple,"44")}`,borderRadius:10,padding:"10px 12px",fontSize:14.5,color:s.slate},children:[e.jsx("strong",{children:"Row rule:"})," ",c[n].rule]})]}),e.jsx("pre",{style:{margin:0,fontFamily:h,fontSize:16,lineHeight:1.45,background:s.termBg,color:s.termText,borderRadius:10,padding:"12px 16px",minHeight:170},children:c[n].f(r).join(`
`)})]})}const l=(n,t)=>Array.from({length:n},(r,i)=>t(i+1)).join(`
`),w=n=>{let t=1;return l(n,r=>Array.from({length:r},()=>t++).join(" "))},f=n=>l(n,t=>" ".repeat(n-t)+Array.from({length:t},(r,i)=>i+1).join("")+Array.from({length:t-1},(r,i)=>t-1-i).join("")),m=n=>l(n,t=>Array.from({length:n},(r,i)=>String(t*(i+1)).padStart(4)).join("")),a={inverted:{id:"inverted",kind:"write",title:"Inverted triangle",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Rows: "}),". Row 1 has n stars, row 2 has n − 1, … the last row has 1. Write the row rule as comments first. (",e.jsx("code",{children:'"*" * k'})," is allowed now.)"]}),tests:[{inputs:["4"],expect:`Rows: 4
`+l(4,n=>"*".repeat(5-n))},{inputs:["1"],expect:`Rows: 1
*`,hidden:!0},{inputs:["6"],expect:`Rows: 6
`+l(6,n=>"*".repeat(7-n)),hidden:!0}],requires:[d(2),{node:"For"}],hints:['for i in range(n, 0, -1): print("*" * i)'],solution:`# row rule: start with n stars and go down to 1
# so loop i from n down to 1 and print i stars
n = int(input("Rows: "))
for i in range(n, 0, -1):
    print("*" * i)`},right:{id:"right",kind:"write",title:"Right-aligned triangle",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Rows: "}),". Row i has ",e.jsx("strong",{children:"n − i spaces, then i stars"}),", so the triangle leans right."]}),tests:[{inputs:["4"],expect:`Rows: 4
`+l(4,n=>" ".repeat(4-n)+"*".repeat(n))},{inputs:["2"],expect:`Rows: 2
 *
**`,hidden:!0}],requires:[d(2),{node:"For"}],hints:['print(" " * (n - i) + "*" * i)'],solution:`# row i (1..n): n - i spaces then i stars
# loop i from 1 to n
n = int(input("Rows: "))
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * i)`},floyd:{id:"floyd",kind:"write",title:"Floyd's triangle",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Rows: "}),". Row i prints the next i numbers of a counter that ",e.jsx("strong",{children:"never resets"}),": 1 / 2 3 / 4 5 6 / 7 8 9 10. The key decision: where is the counter created?"]}),tests:[{inputs:["4"],expect:`Rows: 4
`+w(4)},{inputs:["5"],expect:`Rows: 5
`+w(5),hidden:!0}],requires:[d(3),{node:"For",min:2}],hints:["num = 1 BEFORE both loops — inside the outer loop it would restart every row.",'Inner: print(num, end=" "); num += 1. After inner loop: print().'],solution:`# counter starts at 1, before the loops (never resets)
# row i prints the next i numbers
# end each row with print()
n = int(input("Rows: "))
num = 1
for i in range(1, n + 1):
    for j in range(i):
        print(num, end=" ")
        num += 1
    print()`},table:{id:"table",kind:"write",title:"A neat multiplication table",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Size: "})," and print a size × size table. To line the columns up, give every number a fixed width: ",e.jsxs("code",{children:['f"',"{value:4}",'"']})," right-aligns it in 4 characters. Print each row on one line with ",e.jsx("code",{children:'end=""'}),"."]}),tests:[{inputs:["4"],expect:`Size: 4
`+m(4)},{inputs:["10"],expect:`Size: 10
`+m(10),hidden:!0}],requires:[{node:"For",min:2}],hints:['print(f"{r * c:4}", end="")',"After each row: print()"],solution:`n = int(input("Size: "))
for r in range(1, n + 1):
    for c in range(1, n + 1):
        print(f"{r * c:4}", end="")
    print()`},hollow:{id:"hollow",kind:"write",title:"Hollow square",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Size: "}),". Print an n × n square of ",e.jsx("code",{children:"*"})," that is empty inside: a cell gets a star only if it's in the first/last row or first/last column. Decide ",e.jsx("strong",{children:"per cell"}),"."]}),tests:[{inputs:["4"],expect:`Size: 4
****
*  *
*  *
****`},{inputs:["2"],expect:`Size: 2
**
**`,hidden:!0},{inputs:["5"],expect:`Size: 5
*****
*   *
*   *
*   *
*****`,hidden:!0}],requires:[d(2),{node:"For",min:2},{node:"If"}],hints:["if r == 0 or r == n - 1 or c == 0 or c == n - 1: star else space",'print("*", end="") / print(" ", end="")'],solution:`# cell (r, c) is a star if it is on the border
# otherwise a space; end each row with print()
n = int(input("Size: "))
for r in range(n):
    for c in range(n):
        if r == 0 or r == n - 1 or c == 0 or c == n - 1:
            print("*", end="")
        else:
            print(" ", end="")
    print()`},pyramid:{id:"pyramid",kind:"make",title:"Number pyramid",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Rows: "})," and print a centred palindrome pyramid: row i has n − i spaces, then 1 up to i, then back down to 1 — for 4 rows: ",e.jsx("code",{children:"   1"}),", ",e.jsx("code",{children:"  121"}),", ",e.jsx("code",{children:" 12321"}),", ",e.jsx("code",{children:"1234321"}),". Decompose the row into three parts first."]}),minLines:12,tests:[{inputs:["4"],expect:`Rows: 4
`+f(4)},{inputs:["1"],expect:`Rows: 1
1`,hidden:!0},{inputs:["6"],expect:`Rows: 6
`+f(6),hidden:!0}],requires:[d(3),{node:"For",min:3}],hints:['Part 1: print(" " * (n - i), end="")','Part 2: for j in range(1, i + 1): print(j, end="")','Part 3: for j in range(i - 1, 0, -1): print(j, end="") — then print()'],solution:`# row i has three parts:
# 1) n - i spaces  2) 1 up to i  3) i - 1 down to 1
# then end the row
n = int(input("Rows: "))
for i in range(1, n + 1):
    print(" " * (n - i), end="")
    for j in range(1, i + 1):
        print(j, end="")
    for j in range(i - 1, 0, -1):
        print(j, end="")
    print()`}},v=a,k=[{q:"What's the first question to ask about any pattern?",options:["How many lines of code?","What does row i contain, in terms of i?","Which characters?","Is it a triangle?"],answer:1,explain:"Once you can describe row i, the loops write themselves."},{q:"In Floyd's triangle, why is num = 1 placed before both loops?",options:["Style","So the counter continues across rows instead of restarting","Python requires it","To make it faster"],answer:1,explain:"Where a variable is created decides how long it lives."},{q:'What does f"{7:4}" produce?',options:['"7   "','"   7"','"0007"','"7.00"'],answer:1,explain:"A width of 4, numbers right-aligned by default."},{q:"How many characters does row 3 of a 5-row right-aligned triangle have?",options:["3","5","2","8"],answer:1,explain:"2 spaces + 3 stars: every row is n characters wide."}];function E(n){const t=[{label:"Row Rules",kicker:"DESCRIBE ROW i",title:"Every pattern is a rule for row i",blocks:[e.jsxs(x,{children:["Patterns look like art, but each is just a rule: ",e.jsx("em",{children:"what does row i contain?"})," Pick a pattern and a size, and read its row rule:"]}),e.jsx(b,{}),a.inverted,a.right]},{label:"Counters & Tables",kicker:"WHERE DOES IT LIVE?",title:"A counter across rows, and neat columns",blocks:[a.floyd,a.table,e.jsxs(g,{color:s.blue,icon:"📏",children:[e.jsx("code",{children:"{x:4}"})," pads to width 4; ",e.jsx("code",{children:"{x:<4}"})," left-aligns; ",e.jsx("code",{children:"{x:^4}"})," centres. Combine with decimals: ",e.jsx("code",{children:"{price:8.2f}"}),"."]})]},{label:"Per Cell",kicker:"DECIDE EACH CELL",title:"An if inside a nested loop",blocks:[a.hollow,e.jsxs(j,{children:["Outer loop = rows, inner loop = cells in the row, ",e.jsx("code",{children:"print()"})," after the inner loop = end of row. An if inside decides each cell."]})]},{label:"Make It",kicker:"THREE PARTS PER ROW",title:"Your program: number pyramid",blocks:[a.pyramid]}];return e.jsx(y,{...n,unitId:"UnitCT1_4",crumb:"COMPUTATIONAL THINKING I › 4",title:"Patterns & Nested Loops",sections:t,quiz:k,next:{title:"CT I · 5 — Capstone: Crack It Yourself",text:"A raw problem, your four moves, and a faster algorithm at the end."}})}export{v as EXERCISES,E as default};
