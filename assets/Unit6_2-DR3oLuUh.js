import{j as n,r as u}from"./index-cCwWvTed.js";import{P as c,K as S,L as F,T as i,a as p,t as y}from"./Lesson-BzQti5aW.js";const b={margin:0,fontFamily:p,fontSize:14.5,lineHeight:1.7,background:i.codeBg,border:`1px solid ${i.border}`,borderRadius:10,padding:"12px 14px",whiteSpace:"pre-wrap"};function T(){const[t,l]=u.useState(null),r=[{k:"create",c:i.blue,w:"i = 1",f:"for i in",d:"Create the counter"},{k:"check",c:i.purple,w:"while i <= 5:",f:"range(1, 6)",d:"Check when to stop"},{k:"change",c:i.orange,w:"i += 1",f:"(automatic)",d:"Move to the next value"}],o=(e,f)=>n.jsx("span",{style:{background:t===e?y(r.find(d=>d.k===e).c,"33"):"transparent",borderRadius:4,fontWeight:t===e?700:400},children:f});return n.jsxs("div",{children:[n.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10},children:r.map(e=>n.jsx("button",{onMouseEnter:()=>l(e.k),onClick:()=>l(e.k),style:{padding:"7px 12px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",fontWeight:700,border:`1.5px solid ${e.c}`,background:t===e.k?e.c:i.card,color:t===e.k?"#fff":e.c},children:e.d},e.k))}),n.jsxs("div",{className:"fh-two",children:[n.jsxs("div",{children:[n.jsx("div",{style:{fontWeight:700,color:i.slate,marginBottom:4},children:"while — you do all three jobs"}),n.jsxs("pre",{style:b,children:[o("create","i = 1"),`
`,o("check","while i <= 5:"),`
    print(i)
    `,o("change","i += 1")]})]}),n.jsxs("div",{children:[n.jsx("div",{style:{fontWeight:700,color:i.green,marginBottom:4},children:"for — Python does them"}),n.jsxs("pre",{style:b,children:[o("create","for i in")," ",o("check","range(1, 6)"),":",`
    print(i)`,t==="change"?n.jsx("span",{style:{color:i.orange},children:`
    # i moves on by itself`}):""]})]})]})]})}function E(){const[t,l]=u.useState(0),[r,o]=u.useState(10),[e,f]=u.useState(2),d=[];if(e!==0)for(let s=t;(e>0?s<r:s>r)&&(d.push(s),!(d.length>60));s+=e);const g=(s,x,k,j,z)=>n.jsxs("label",{style:{display:"block",fontFamily:p,fontSize:14},children:[s," = ",n.jsx("strong",{children:x}),n.jsx("input",{type:"range",min:j,max:z,value:x,onChange:v=>{const w=Number(v.target.value);k(s==="step"&&w===0?x>0?-1:1:w)},style:{width:"100%",accentColor:i.navy}})]});return n.jsxs("div",{className:"fh-two",children:[n.jsxs("div",{children:[g("start",t,l,-5,15),g("stop",r,o,-5,15),g("step",e,f,-3,4)]}),n.jsxs("div",{children:[n.jsxs("div",{style:{fontFamily:p,fontSize:18,marginBottom:8},children:["range(",t,", ",r,", ",e,")"]}),n.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:d.length?d.map(s=>n.jsx("span",{style:{fontFamily:p,padding:"4px 9px",borderRadius:6,background:y(i.teal,"18"),border:`1px solid ${i.teal}`,fontWeight:700},children:s},s)):n.jsxs("span",{style:{color:i.red,fontSize:14.5},children:["Nothing at all — the loop body would run 0 times. ",e>0?"Counting up, but start isn't below stop.":"Counting down, but start isn't above stop."]})}),n.jsxs("div",{style:{fontSize:14,color:i.slate,marginTop:10,lineHeight:1.6},children:["Starts ",n.jsx("strong",{children:"at"})," start, stops ",n.jsx("strong",{children:"before"})," stop. A negative step counts down. ",n.jsx("code",{children:r})," itself is never produced."]})]})]})}const h=t=>t.join(`
`),m=t=>Array.from({length:t},(l,r)=>{const o=r+1;return o%15===0?"FizzBuzz":o%3===0?"Fizz":o%5===0?"Buzz":String(o)}),a={first:{id:"first",kind:"type",title:"Your first for loop",task:n.jsx(n.Fragment,{children:"Same output as your first while loop in Unit 6.1 — in two lines."}),show:`for i in range(1, 6):
    print(i)
print("Done")`,tests:[{expect:`1
2
3
4
5
Done`}],requires:[{node:"For"}],hints:["range(1, 6) gives 1, 2, 3, 4, 5 — it stops BEFORE 6."],solution:`for i in range(1, 6):
    print(i)
print("Done")`},ranges:{id:"ranges",kind:"type",title:"Three ranges",task:n.jsxs(n.Fragment,{children:["Each loop prints its numbers on one line, using ",n.jsx("code",{children:'end=" "'})," from Unit 4.5. The empty ",n.jsx("code",{children:"print()"})," then ends the line. Predict all three lines first."]}),show:`for i in range(5):
    print(i, end=" ")
print()
for i in range(2, 11, 2):
    print(i, end=" ")
print()
for i in range(10, 0, -1):
    print(i, end=" ")`,minLines:9,tests:[{expect:`0 1 2 3 4
2 4 6 8 10
10 9 8 7 6 5 4 3 2 1`}],hints:["range(5) starts at 0. A negative step counts down."],solution:`for i in range(5):
    print(i, end=" ")
print()
for i in range(2, 11, 2):
    print(i, end=" ")
print()
for i in range(10, 0, -1):
    print(i, end=" ")`},week:{id:"week",kind:"fix",title:"Where did Sunday go?",task:n.jsx(n.Fragment,{children:"The timetable should list all seven days, Day 1 to Day 7. Run it and fix the range."}),starter:`for day in range(1, 7):
    print("Day", day)`,tests:[{expect:h([1,2,3,4,5,6,7].map(t=>`Day ${t}`))}],hints:["The stop value is never produced. To include 7, stop at…?"],solution:`for day in range(1, 8):
    print("Day", day)`},evens:{id:"evens",kind:"write",title:"Sum of the even numbers",task:n.jsxs(n.Fragment,{children:["Ask ",n.jsx("code",{children:"n: "})," and add up every even number from 2 to n (inclusive) using a for loop with a ",n.jsx("strong",{children:"step of 2"}),". Print ",n.jsx("code",{children:"Sum of evens: 30"})," for n = 10."]}),tests:[{inputs:["10"],expect:`n: 10
Sum of evens: 30`},{inputs:["1"],expect:`n: 1
Sum of evens: 0`,hidden:!0},{inputs:["7"],expect:`n: 7
Sum of evens: 12`,hidden:!0}],requires:[{node:"For"}],forbids:[{node:"While",msg:"Use a for loop here."}],hints:["range(2, n + 1, 2) — the + 1 makes n itself included.","total = 0 before the loop, total += i inside."],solution:`n = int(input("n: "))
total = 0
for i in range(2, n + 1, 2):
    total += i
print(f"Sum of evens: {total}")`},count35:{id:"count35",kind:"write",title:"Count with a condition inside",task:n.jsxs(n.Fragment,{children:["Ask ",n.jsx("code",{children:"n: "})," and count how many numbers from 1 to n are divisible by 3 ",n.jsx("strong",{children:"or"})," 5. For n = 15 that's 3, 5, 6, 9, 10, 12, 15 → ",n.jsx("code",{children:"Count: 7"}),"."]}),tests:[{inputs:["15"],expect:`n: 15
Count: 7`},{inputs:["10"],expect:`n: 10
Count: 5`,hidden:!0},{inputs:["2"],expect:`n: 2
Count: 0`,hidden:!0}],requires:[{node:"For"},{node:"If"}],hints:["A counter starts at 0; add 1 only when the if is True.","if i % 3 == 0 or i % 5 == 0:"],solution:`n = int(input("n: "))
count = 0
for i in range(1, n + 1):
    if i % 3 == 0 or i % 5 == 0:
        count += 1
print(f"Count: {count}")`},factorial:{id:"factorial",kind:"write",title:"Factorial",task:n.jsxs(n.Fragment,{children:["n! = 1 × 2 × 3 × … × n, and by definition 0! = 1. Ask ",n.jsx("code",{children:"n: "})," and print ",n.jsx("code",{children:"5! = 120"}),". This time the accumulator ",n.jsx("strong",{children:"multiplies"})," — so what must it start at?"]}),tests:[{inputs:["5"],expect:`n: 5
5! = 120`},{inputs:["0"],expect:`n: 0
0! = 1`,hidden:!0},{inputs:["10"],expect:`n: 10
10! = 3628800`,hidden:!0}],requires:[{node:"For"}],forbids:[{text:"math.factorial",msg:"Build it with a loop."},{text:"import math",msg:"Build it with a loop."}],hints:["Starting at 0 would make every product 0. Start at 1.","for i in range(1, n + 1): result *= i"],solution:`n = int(input("n: "))
result = 1
for i in range(1, n + 1):
    result *= i
print(f"{n}! = {result}")`},rewrite:{id:"rewrite",kind:"modify",title:"Countdown, the for way",task:n.jsxs(n.Fragment,{children:["Your countdown from Unit 6.1 is below, written with while. Rewrite it with a ",n.jsx("strong",{children:"for"})," loop and a counting-down range. The output must not change."]}),starter:`n = int(input("Start from: "))
while n >= 1:
    print(n)
    n -= 1
print("Lift off!")`,tests:[{inputs:["5"],expect:`Start from: 5
5
4
3
2
1
Lift off!`},{inputs:["0"],expect:`Start from: 0
Lift off!`,hidden:!0}],requires:[{node:"For"}],forbids:[{node:"While",msg:"Replace the while loop with a for loop."}],hints:["range(n, 0, -1) gives n, n-1, …, 1."],solution:`n = int(input("Start from: "))
for i in range(n, 0, -1):
    print(i)
print("Lift off!")`},fizzbuzz:{id:"fizzbuzz",kind:"make",title:"FizzBuzz",task:n.jsxs(n.Fragment,{children:["The most famous programming interview question. Ask ",n.jsx("code",{children:"n: "})," and print the numbers 1 to n, one per line — but print ",n.jsx("code",{children:"Fizz"})," for multiples of 3, ",n.jsx("code",{children:"Buzz"})," for multiples of 5, and ",n.jsx("code",{children:"FizzBuzz"})," for multiples of both."]}),minLines:10,tests:[{inputs:["15"],expect:`n: 15
`+h(m(15))},{inputs:["5"],expect:`n: 5
`+h(m(5)),hidden:!0},{inputs:["31"],expect:`n: 31
`+h(m(31)),hidden:!0}],requires:[{node:"For"},{text:"elif"}],hints:["Check FizzBuzz (divisible by 15, or by 3 and 5) FIRST — Unit 5.2: the first True branch wins.","if i % 15 == 0: … elif i % 3 == 0: … elif i % 5 == 0: … else: print(i)"],solution:`n = int(input("n: "))
for i in range(1, n + 1):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`}},q=a,B=[{q:"What does range(5) produce?",options:["1 2 3 4 5","0 1 2 3 4","0 1 2 3 4 5","5"],answer:1,explain:"Start defaults to 0, and the stop value 5 is never produced."},{q:"What does range(2, 10, 3) produce?",options:["2 5 8","2 5 8 11","3 6 9","2 4 6 8"],answer:0,explain:"2, then +3 → 5, → 8. 11 would pass the stop of 10."},{q:"Which range counts 10 down to 1?",options:["range(10, 1)","range(10, 0, -1)","range(1, 10, -1)","range(10, 1, -1)"],answer:1,explain:"Stop is excluded, so to reach 1 you stop at 0. range(10, 1, -1) would stop at 2."},{q:"What does this print?",code:`total = 1
for i in range(1, 4):
    total *= i
print(total)`,options:["6","0","10","24"],answer:0,explain:"1 × 1 × 2 × 3 = 6. A product accumulator starts at 1."},{q:"Keep asking for a password until it's right. Which loop?",options:["for i in range(10)","while","Either is equally natural","No loop needed"],answer:1,explain:"You can't know the number of attempts in advance — that's while's job. for is for a known count."},{q:"What does range(5, 5) produce?",options:["5","Nothing","0 1 2 3 4","Error"],answer:1,explain:"Start isn't below stop, so the range is empty and the loop body runs 0 times."}];function A(t){const l=[{label:"Why for?",kicker:"THE NEED",title:"for counts for you",blocks:[n.jsxs(c,{children:["Every counting while loop repeats the same three jobs, and forgetting one causes the bugs you fixed in Unit 6.1. ",n.jsx("code",{children:"for"})," does all three for you. Click each job:"]}),n.jsx(T,{}),a.first]},{label:"range()",kicker:"START, STOP, STEP",title:"range(start, stop, step)",blocks:[n.jsxs(c,{children:[n.jsx("code",{children:"range"})," produces the numbers the loop walks through. Play with all three parts — including a negative step:"]}),n.jsx(E,{}),a.ranges,a.week,n.jsxs(S,{children:["Start is included, stop is ",n.jsx("strong",{children:"not"}),". To go from 1 to n inclusive: ",n.jsx("code",{children:"range(1, n + 1)"}),". To count down to 1: ",n.jsx("code",{children:"range(n, 0, -1)"}),"."]})]},{label:"Loop Patterns",kicker:"ADD · COUNT · MULTIPLY",title:"Three patterns you'll use forever",blocks:[n.jsxs(c,{children:["Almost every loop question is one of these: ",n.jsx("strong",{children:"add"})," things up (start at 0), ",n.jsx("strong",{children:"count"})," things that pass a test (start at 0, add 1 inside an if), or ",n.jsx("strong",{children:"multiply"})," things together (start at 1)."]}),a.evens,a.count35,a.factorial]},{label:"while or for?",kicker:"CHOOSING",title:"Which loop when?",blocks:[n.jsxs(c,{children:["Rule of thumb: you know how many rounds (or the range of values) → ",n.jsx("code",{children:"for"}),". You're waiting for something to happen → ",n.jsx("code",{children:"while"}),". A countdown has a known range, so it reads better as a for:"]}),a.rewrite]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: FizzBuzz",blocks:[n.jsx(c,{children:"A for loop with an if / elif / else chain inside — and a check on the order of conditions."}),a.fizzbuzz]}];return n.jsx(F,{...t,unitId:"Unit6_2",crumb:"MODULE 6 › UNIT 6.2",title:"The for Loop & range()",sections:l,quiz:B,next:{title:"Unit 6.3 — break, continue & Nested Loops",text:"Escape early, skip a round, and put loops inside loops."}})}export{q as EXERCISES,A as default};
