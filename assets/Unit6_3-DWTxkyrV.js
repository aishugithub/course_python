import{j as e,r as g}from"./index-rTKCO5Yp.js";import{P as h,N as y,T as t,K as j,L as v,a as p,t as m}from"./Lesson-o3jU_D0N.js";const x={margin:0,fontFamily:p,fontSize:14.5,lineHeight:1.7,background:t.codeBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",whiteSpace:"pre-wrap"},u=(n,r=t.navy)=>({padding:"8px 14px",borderRadius:8,border:`1.5px solid ${n?r:t.border}`,background:n?r:t.card,color:n?"#fff":t.text,fontWeight:700,cursor:"pointer",fontFamily:p});function T(){const[n,r]=g.useState("break"),o=[1,2,3,4,5,6].map(i=>i===3?{i,s:n==="break"?"stop":"skip"}:n==="break"&&i>3?{i,s:"never"}:{i,s:"print"});return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:8},children:[e.jsx("button",{onClick:()=>r("break"),style:u(n==="break",t.red),children:"break"}),e.jsx("button",{onClick:()=>r("continue"),style:u(n==="continue",t.orange),children:"continue"})]}),e.jsx("pre",{style:x,children:`for i in range(1, 7):
    if i == 3:
        ${n}
    print(i)
print("after the loop")`})]}),e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:o.map(({i,s})=>{const d=s==="print"?t.green:s==="skip"?t.orange:s==="stop"?t.red:t.muted;return e.jsxs("div",{style:{width:92,textAlign:"center",borderRadius:10,padding:"8px 4px",border:`1.5px solid ${d}`,background:s==="never"?t.deep:m(d,"12"),opacity:s==="never"?.55:1},children:[e.jsxs("div",{style:{fontFamily:p,fontWeight:700},children:["i = ",i]}),e.jsx("div",{style:{fontSize:12.5,color:d,fontWeight:700},children:s==="print"?`prints ${i}`:s==="skip"?"skipped":s==="stop"?"loop ends":"never runs"})]},i)})}),e.jsx("div",{style:{fontSize:14.5,color:t.slate,marginTop:10,lineHeight:1.6},children:n==="break"?e.jsxs(e.Fragment,{children:[e.jsx("strong",{style:{color:t.red},children:"break"})," ends the whole loop at once. Output: 1 2, then “after the loop”."]}):e.jsxs(e.Fragment,{children:[e.jsx("strong",{style:{color:t.orange},children:"continue"})," skips the rest of this round only; the loop carries on. Output: 1 2 4 5 6, then “after the loop”."]})})]})]})}function A(){const[o,i]=g.useState(0),s=Math.floor(o/4)+1,d=o%4+1;return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("pre",{style:x,children:`for row in range(1, 4):
    for col in range(1, 5):
        print(row * col, end=" ")
    print()`}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:8,alignItems:"center"},children:[e.jsx("button",{onClick:()=>i(Math.max(0,o-1)),style:u(!1),children:"◀"}),e.jsx("button",{onClick:()=>i(Math.min(3*4-1,o+1)),style:u(!0),children:"Next round ▶"}),e.jsxs("span",{style:{fontFamily:p},children:["row = ",s,", col = ",d]})]}),e.jsx("div",{style:{fontSize:14,color:t.slate,marginTop:8,lineHeight:1.6},children:d===4?"The inner loop just finished its 4 rounds — print() ends the line, then the outer loop moves to the next row.":"The inner loop moves along the row; row stays the same until the inner loop is done."})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 56px)",gap:6,alignContent:"start"},children:[Array.from({length:3*4},(S,l)=>{const w=Math.floor(l/4)+1,b=l%4+1,f=l<=o;return e.jsx("div",{style:{height:46,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:p,fontWeight:700,border:`1.5px solid ${l===o?t.blue:t.border}`,background:l===o?m(t.blue,"22"):f?m(t.teal,"12"):t.card,color:f?t.text:t.muted},children:f?w*b:"·"},l)}),e.jsxs("div",{style:{gridColumn:"1 / span 4",fontSize:13.5,color:t.muted},children:[3," rows × ",4," columns = ",3*4," rounds of the inner body."]})]})]})}const c=(n,r)=>Array.from({length:n},(o,i)=>r(i+1)).join(`
`),k=n=>{if(n<2)return!1;for(let r=2;r<n;r++)if(n%r===0)return!1;return!0},a={firstmult:{id:"firstmult",kind:"type",title:"while True … break",task:e.jsxs(e.Fragment,{children:["A loop whose condition is always True can only end with ",e.jsx("code",{children:"break"}),". This finds the first multiple of 7 after the number typed."]}),show:`n = int(input("Start after: "))
while True:
    n += 1
    if n % 7 == 0:
        break
print("First multiple of 7:", n)`,tests:[{inputs:["30"],expect:`Start after: 30
First multiple of 7: 35`},{inputs:["35"],expect:`Start after: 35
First multiple of 7: 42`,hidden:!0}],requires:[{node:"Break"}],hints:["break is indented under the if — it only fires when the condition is True."],solution:`n = int(input("Start after: "))
while True:
    n += 1
    if n % 7 == 0:
        break
print("First multiple of 7:", n)`},password:{id:"password",kind:"write",title:"Three attempts (break + a flag)",task:e.jsxs(e.Fragment,{children:["The password is ",e.jsx("code",{children:"python123"}),". Give the user ",e.jsx("strong",{children:"at most 3"})," tries with a for loop. Each try asks ",e.jsx("code",{children:"Password: "}),"; a wrong one prints ",e.jsx("code",{children:"Wrong password"}),"; the right one stops the loop. After the loop print ",e.jsx("code",{children:"Welcome!"})," or, if all 3 failed, ",e.jsx("code",{children:"Account locked"}),"."]}),minLines:12,tests:[{inputs:["abc","python123"],expect:`Password: abc
Wrong password
Password: python123
Welcome!`},{inputs:["python123"],expect:`Password: python123
Welcome!`,hidden:!0},{inputs:["a","b","c"],expect:`Password: a
Wrong password
Password: b
Wrong password
Password: c
Wrong password
Account locked`,hidden:!0}],requires:[{node:"For",msg:"Use a for loop with range(3) — at most 3 tries."},{node:"Break",msg:"Stop the loop with break as soon as the password is right."}],hints:["After the loop you need to know WHY it ended. Use a flag: found = False before the loop, found = True just before break.",'for attempt in range(3): … if pw == secret: found = True; break … print("Wrong password")','After the loop (no indent): if found: print("Welcome!") else: print("Account locked")'],solution:`secret = "python123"
found = False
for attempt in range(3):
    pw = input("Password: ")
    if pw == secret:
        found = True
        break
    print("Wrong password")
if found:
    print("Welcome!")
else:
    print("Account locked")`},skip3:{id:"skip3",kind:"type",title:"continue: skip a round",task:e.jsx(e.Fragment,{children:"Print 1 to 10 on one line, skipping multiples of 3."}),show:`for i in range(1, 11):
    if i % 3 == 0:
        continue
    print(i, end=" ")`,tests:[{expect:"1 2 4 5 7 8 10"}],requires:[{node:"Continue"}],hints:["continue jumps straight to the next round — the print below it is skipped for that i."],solution:`for i in range(1, 11):
    if i % 3 == 0:
        continue
    print(i, end=" ")`},absent:{id:"absent",kind:"write",title:"Average, skipping absentees",task:e.jsxs(e.Fragment,{children:["Read 5 marks with a for loop, asking ",e.jsx("code",{children:"Mark: "})," each time. A mark of ",e.jsx("code",{children:"-1"})," means absent: use ",e.jsx("code",{children:"continue"})," to skip it. Then print ",e.jsx("code",{children:"Present: 4"})," and ",e.jsx("code",{children:"Average: 72.5"})," (one decimal place)."]}),minLines:10,tests:[{inputs:["70","-1","80","65","75"],expect:`Mark: 70
Mark: -1
Mark: 80
Mark: 65
Mark: 75
Present: 4
Average: 72.5`},{inputs:["50","-1","-1","100","60"],expect:`Mark: 50
Mark: -1
Mark: -1
Mark: 100
Mark: 60
Present: 3
Average: 70.0`,hidden:!0}],requires:[{node:"Continue"}],hints:["Two accumulators: total and present, both 0 before the loop.","if mark == -1: continue — everything after it in the body is skipped for that round.",'print(f"Average: {total / present:.1f}")'],solution:`total = 0
present = 0
for i in range(5):
    mark = int(input("Mark: "))
    if mark == -1:
        continue
    total += mark
    present += 1
print(f"Present: {present}")
print(f"Average: {total / present:.1f}")`},grid:{id:"grid",kind:"type",title:"A loop inside a loop",task:e.jsx(e.Fragment,{children:"The program from the stepper above. Type it and check the shape of the output."}),show:`for row in range(1, 4):
    for col in range(1, 5):
        print(row * col, end=" ")
    print()`,tests:[{expect:`1 2 3 4
2 4 6 8
3 6 9 12`}],requires:[{node:"For",min:2}],hints:["The last print() belongs to the OUTER loop: 4 spaces in, not 8."],solution:`for row in range(1, 4):
    for col in range(1, 5):
        print(row * col, end=" ")
    print()`},stars:{id:"stars",kind:"write",title:"Star triangle",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Rows: "})," and print a triangle: row 1 has one ",e.jsx("code",{children:"*"}),", row 2 has two, and so on. Use a ",e.jsx("strong",{children:"nested"})," loop — the inner loop prints one star at a time with ",e.jsx("code",{children:'end=""'}),"."]}),tests:[{inputs:["4"],expect:`Rows: 4
`+c(4,n=>"*".repeat(n))},{inputs:["1"],expect:`Rows: 1
*`,hidden:!0},{inputs:["6"],expect:`Rows: 6
`+c(6,n=>"*".repeat(n)),hidden:!0}],requires:[{node:"For",min:2,msg:"Use a loop inside a loop."}],forbids:[{text:'"*" *',msg:'"*" * row would work — but this exercise is about nested loops. Print one star at a time.'},{text:'* "*"',msg:"Print one star at a time with an inner loop."}],hints:["The inner loop runs row times: for star in range(row):",'Inside: print("*", end=""). After the inner loop: print() to end the line.'],solution:`rows = int(input("Rows: "))
for row in range(1, rows + 1):
    for star in range(row):
        print("*", end="")
    print()`},numtri:{id:"numtri",kind:"write",title:"Number triangle",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Rows: "})," and print row by row: ",e.jsx("code",{children:"1"}),", then ",e.jsx("code",{children:"1 2"}),", then ",e.jsx("code",{children:"1 2 3"}),"… The inner loop's range depends on the outer loop's variable."]}),tests:[{inputs:["4"],expect:`Rows: 4
`+c(4,n=>Array.from({length:n},(r,o)=>o+1).join(" "))},{inputs:["2"],expect:`Rows: 2
1
1 2`,hidden:!0},{inputs:["5"],expect:`Rows: 5
`+c(5,n=>Array.from({length:n},(r,o)=>o+1).join(" ")),hidden:!0}],requires:[{node:"For",min:2}],hints:["for row in range(1, rows + 1): then for num in range(1, row + 1):",'print(num, end=" ") inside, print() after the inner loop.'],solution:`rows = int(input("Rows: "))
for row in range(1, rows + 1):
    for num in range(1, row + 1):
        print(num, end=" ")
    print()`},prime:{id:"prime",kind:"make",title:"Prime checker",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Number: "}),". A prime is a whole number greater than 1 whose only divisors are 1 and itself. Try every divisor from 2 up to n − 1; the moment one divides n exactly, it's not prime — stop looking. Print ",e.jsx("code",{children:"7 is prime"})," or ",e.jsx("code",{children:"9 is not prime"}),"."]}),minLines:10,tests:[{inputs:["7"],expect:`Number: 7
7 is prime`},{inputs:["9"],expect:`Number: 9
9 is not prime`,hidden:!0},{inputs:["2"],expect:`Number: 2
2 is prime`,hidden:!0},{inputs:["1"],expect:`Number: 1
1 is not prime`,hidden:!0},{inputs:["97"],expect:`Number: 97
97 is ${k(97)?"":"not "}prime`,hidden:!0},{inputs:["91"],expect:`Number: 91
91 is ${k(91)?"":"not "}prime`,hidden:!0}],requires:[{node:"Break",msg:"Stop searching with break as soon as a divisor is found."}],hints:["Use a flag: is_prime = n > 1 (so 1 starts as not prime).","for d in range(2, n): if n % d == 0: is_prime = False; break","91 = 7 × 13 — a good test of your loop."],solution:`n = int(input("Number: "))
is_prime = n > 1
for d in range(2, n):
    if n % d == 0:
        is_prime = False
        break
if is_prime:
    print(f"{n} is prime")
else:
    print(f"{n} is not prime")`}},P=a,F=[{q:"What does break do?",options:["Skips one round","Ends the whole loop immediately","Ends the program","Restarts the loop"],answer:1,explain:"break exits the loop at once; execution continues after it."},{q:"What does continue do?",options:["Ends the loop","Skips the rest of this round; the loop carries on","Pauses the program","Repeats the round"],answer:1,explain:"continue jumps straight to the next round."},{q:"What does this print?",code:`for i in range(1, 6):
    if i == 3:
        break
    print(i, end=" ")`,options:["1 2","1 2 3","1 2 4 5","3"],answer:0,explain:"In round 3 break fires before the print, so only 1 and 2 appear."},{q:"How many times does the inner print run?",code:`for i in range(2):
    for j in range(3):
        print(i, j)`,options:["5","6","3","2"],answer:1,explain:"3 inner rounds for each of 2 outer rounds: 2 × 3 = 6. Multiply, don't add."},{q:"After a loop with break, how do you know whether break happened?",options:["You can't","Set a flag variable before break and check it after the loop","break returns True","Use continue instead"],answer:1,explain:"A flag (found = False → True just before break) records why the loop ended."},{q:"Why does the prime checker stop at the first divisor?",options:["Required by Python","One divisor already proves it isn't prime, so more checking is wasted","To avoid an error","It doesn't need to"],answer:1,explain:"break saves work: the answer is already known."}];function N(n){const r=[{label:"break & continue",kicker:"LEAVING EARLY",title:"Two ways out",blocks:[e.jsx(h,{children:"Sometimes a loop should stop early (found what you were looking for) or skip one round (this item doesn't count). Same loop, two keywords — switch between them:"}),e.jsx(T,{}),a.firstmult]},{label:"The Flag",kicker:"WHY DID IT STOP?",title:"break with a flag",blocks:[e.jsxs(h,{children:["After a loop ends, you often need to know ",e.jsx("em",{children:"how"})," it ended: did ",e.jsx("code",{children:"break"})," fire, or did the loop simply run out? A ",e.jsx("strong",{children:"flag"})," is a bool that starts False before the loop and is set True just before ",e.jsx("code",{children:"break"}),"."]}),a.password,e.jsxs(y,{color:t.blue,icon:"🐍",children:["Python also has a rarely-taught shortcut: a loop can have its own ",e.jsx("code",{children:"else:"}),", which runs only if the loop was ",e.jsx("em",{children:"not"})," ended by break. The flag is clearer, so we use it."]})]},{label:"continue",kicker:"SKIP THIS ONE",title:"continue: ignore one round",blocks:[a.skip3,a.absent]},{label:"Nested Loops",kicker:"LOOPS INSIDE LOOPS",title:"A loop inside a loop",blocks:[e.jsxs(h,{children:["Like a clock: the minute hand goes all the way round for every single tick of the hour hand. The ",e.jsx("strong",{children:"inner"})," loop runs completely for ",e.jsx("em",{children:"each"})," round of the ",e.jsx("strong",{children:"outer"})," loop. Step through:"]}),e.jsx(A,{}),a.grid,a.stars,a.numtri,e.jsx(j,{children:"Total rounds of the inner body = outer rounds × inner rounds. The inner range can depend on the outer variable — that's what makes triangles."})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: prime checker",blocks:[e.jsx(h,{children:"A for loop, a flag, break, and an edge case (1 is not prime). A favourite exam question — and you'll make it faster in Computational Thinking I."}),a.prime]}];return e.jsx(v,{...n,unitId:"Unit6_3",crumb:"MODULE 6 › UNIT 6.3",title:"break, continue & Nested Loops",sections:r,quiz:F,next:{title:"Unit 6.4 — Capstone: Number-Guessing Game",text:"A real game: the computer keeps a secret and you hunt it down."}})}export{P as EXERCISES,N as default};
