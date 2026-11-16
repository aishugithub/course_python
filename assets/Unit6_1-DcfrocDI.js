import{j as e,r as x}from"./index-rTKCO5Yp.js";import{P as a,C as u,K as f,N as g,L as w,a as d,T as i,t as p}from"./Lesson-o3jU_D0N.js";const b={width:"100%",accentColor:i.navy},c={margin:0,fontFamily:d,fontSize:14.5,lineHeight:1.7,background:i.codeBg,border:`1px solid ${i.border}`,borderRadius:10,padding:"12px 14px",whiteSpace:"pre-wrap"};function y(){const[n,o]=x.useState(5);return e.jsxs("div",{children:[e.jsxs("label",{style:{fontFamily:d},children:["print the numbers 1 to ",e.jsx("strong",{children:n})]}),e.jsx("input",{type:"range",min:3,max:500,value:n,onChange:t=>o(Number(t.target.value)),style:b}),e.jsxs("div",{className:"fh-two",style:{marginTop:8},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{color:i.red,fontWeight:700,fontSize:13,marginBottom:4},children:["❌ Copy-paste: ",n," lines"]}),e.jsx("pre",{style:{...c,maxHeight:170,overflow:"hidden"},children:Array.from({length:Math.min(n,6)},(t,l)=>`print(${l+1})`).join(`
`)+(n>6?`
… ${n-6} more lines …`:"")})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:i.green,fontWeight:700,fontSize:13,marginBottom:4},children:"✅ while loop: always 4 lines"}),e.jsx("pre",{style:c,children:`count = 1
while count <= ${n}:
    print(count)
    count += 1`})]})]})]})}const h=(()=>{const n=[{line:0,c:1,out:[],d:"count = 1 — create the counter before the loop."}],o=[];for(let t=1;t<=3;t++)n.push({line:1,c:t,out:[...o],cond:!0,d:`Check: is ${t} <= 3? True → run the body.`}),o.push(String(t)),n.push({line:2,c:t,out:[...o],d:`print(count) shows ${t}.`}),n.push({line:3,c:t+1,out:[...o],d:`count += 1 → count is now ${t+1}. Back up to the while line.`});return n.push({line:1,c:4,out:[...o],cond:!1,d:"Check: is 4 <= 3? False → skip the body."}),n.push({line:4,c:4,out:[...o,"Done"],d:"Carry on with the first line after the loop."}),n})(),k=["count = 1","while count <= 3:","    print(count)","    count += 1",'print("Done")'];function j(){const[n,o]=x.useState(0),t=h[n];return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("div",{style:{...c,padding:6},children:k.map((l,s)=>e.jsx("div",{style:{padding:"2px 8px",borderRadius:5,background:t.line===s?p(i.blue,"22"):"transparent",fontWeight:t.line===s?700:400,whiteSpace:"pre"},children:l},s))}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:8,alignItems:"center"},children:[e.jsx("button",{onClick:()=>o(Math.max(0,n-1)),disabled:n===0,style:{padding:"8px 12px",borderRadius:8,border:`1px solid ${i.border}`,background:i.card,cursor:"pointer",fontFamily:"inherit"},children:"◀"}),e.jsx("button",{onClick:()=>o(Math.min(h.length-1,n+1)),disabled:n===h.length-1,style:{padding:"8px 14px",borderRadius:8,border:"none",background:i.navy,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"Next step ▶"}),e.jsxs("span",{style:{fontSize:13,color:i.muted},children:[n+1," / ",h.length]})]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsxs("div",{style:{border:`1.5px solid ${i.teal}`,borderRadius:10,padding:"6px 14px",textAlign:"center",background:p(i.teal,"10")},children:[e.jsx("div",{style:{fontFamily:d,fontSize:12,color:i.teal,fontWeight:700},children:"count"}),e.jsx("div",{style:{fontFamily:d,fontSize:22,fontWeight:700},children:t.c})]}),t.cond!==void 0&&e.jsxs("div",{style:{alignSelf:"center",fontFamily:d,fontWeight:700,color:t.cond?i.green:i.red},children:["condition: ",t.cond?"True":"False"]})]}),e.jsx("pre",{style:{margin:"10px 0 0",fontFamily:d,fontSize:14.5,background:i.termBg,color:i.termText,borderRadius:10,padding:"10px 14px",minHeight:80},children:t.out.join(`
`)||" "}),e.jsx("div",{style:{fontSize:14.5,color:i.slate,marginTop:8},children:t.d})]})]})}const m=(n,o,t=1)=>{const l=[];for(let s=n;t>0?s<=o:s>=o;s+=t)l.push(s);return l},r={count5:{id:"count5",kind:"type",title:"Your first loop",task:e.jsx(e.Fragment,{children:"Type it. Watch the indentation: both lines of the body are indented."}),show:`count = 1
while count <= 5:
    print(count)
    count += 1
print("Done")`,tests:[{expect:`1
2
3
4
5
Done`}],requires:[{node:"While"}],hints:["Done is NOT indented — it runs once, after the loop."],solution:`count = 1
while count <= 5:
    print(count)
    count += 1
print("Done")`},countdown:{id:"countdown",kind:"write",title:"Countdown",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Start from: "}),", then count down to 1 with a while loop, one number per line, then print ",e.jsx("code",{children:"Lift off!"})]}),tests:[{inputs:["5"],expect:`Start from: 5
5
4
3
2
1
Lift off!`},{inputs:["3"],expect:`Start from: 3
3
2
1
Lift off!`,hidden:!0},{inputs:["0"],expect:`Start from: 0
Lift off!`,hidden:!0}],requires:[{node:"While"}],hints:["The counter starts at the input and goes DOWN: n -= 1.","Keep going while n >= 1 (or n > 0)."],solution:`n = int(input("Start from: "))
while n >= 1:
    print(n)
    n -= 1
print("Lift off!")`},sumn:{id:"sumn",kind:"write",title:"Add 1 + 2 + … + n",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"n: "})," and print the sum of all whole numbers from 1 to n, as ",e.jsx("code",{children:"Sum: 55"}),". You need two variables: a ",e.jsx("strong",{children:"counter"})," that walks from 1 to n, and a ",e.jsx("strong",{children:"total"})," that starts at 0 and grows."]}),tests:[{inputs:["10"],expect:`n: 10
Sum: 55`},{inputs:["1"],expect:`n: 1
Sum: 1`,hidden:!0},{inputs:["100"],expect:`n: 100
Sum: 5050`,hidden:!0}],requires:[{node:"While"}],forbids:[{text:"n * (n + 1)",msg:"Nice maths! But this exercise is about the loop — add the numbers one by one."}],hints:["total = 0 and i = 1 go BEFORE the loop.","Inside: total += i, then i += 1."],solution:`n = int(input("n: "))
total = 0
i = 1
while i <= n:
    total += i
    i += 1
print(f"Sum: {total}")`},table:{id:"table",kind:"complete",title:"Multiplication table",task:e.jsx(e.Fragment,{children:"Fill in the three blanks so the program prints the table of the number typed, from × 1 to × 10."}),starter:`n = int(input("Table of: "))
i = ___
while i <= ___:
    print(f"{n} x {i} = {n * i}")
    ___`,tests:[{inputs:["7"],expect:`Table of: 7
`+m(1,10).map(n=>`7 x ${n} = ${7*n}`).join(`
`)},{inputs:["12"],expect:`Table of: 12
`+m(1,10).map(n=>`12 x ${n} = ${12*n}`).join(`
`),hidden:!0}],hints:["Start at 1, stop after 10, and move i forward each round."],solution:`n = int(input("Table of: "))
i = 1
while i <= 10:
    print(f"{n} x {i} = {n * i}")
    i += 1`},forever:{id:"forever",kind:"fix",title:"The loop that never ends",task:e.jsx(e.Fragment,{children:"Run it — it will be stopped automatically after a few seconds. Read the coach, then fix it."}),starter:`count = 1
while count <= 5:
    print(count)`,tests:[{expect:`1
2
3
4
5`}],hints:["What changes count inside the loop? Nothing — so the condition stays True forever."],solution:`count = 1
while count <= 5:
    print(count)
    count += 1`},offby1:{id:"offby1",kind:"fix",title:"One short",task:e.jsx(e.Fragment,{children:"This should print the roll numbers 1 to 5 for a five-student group. Run it and count the lines."}),starter:`roll = 1
while roll < 5:
    print("Roll", roll)
    roll += 1`,tests:[{expect:`Roll 1
Roll 2
Roll 3
Roll 4
Roll 5`}],hints:["When roll is 5, is 5 < 5 True?"],solution:`roll = 1
while roll <= 5:
    print("Roll", roll)
    roll += 1`},validate:{id:"validate",kind:"write",title:"Ask again until it's valid",task:e.jsxs(e.Fragment,{children:["Here a loop runs an ",e.jsx("strong",{children:"unknown"})," number of times. Ask ",e.jsx("code",{children:"Mark (0-100): "}),". While the mark is outside 0–100, print ",e.jsx("code",{children:"Invalid, try again"})," and ask again. Finally print ",e.jsx("code",{children:"Saved: 75"})," (with the valid mark)."]}),tests:[{inputs:["150","-3","75"],expect:`Mark (0-100): 150
Invalid, try again
Mark (0-100): -3
Invalid, try again
Mark (0-100): 75
Saved: 75`},{inputs:["40"],expect:`Mark (0-100): 40
Saved: 40`,hidden:!0},{inputs:["101","100"],expect:`Mark (0-100): 101
Invalid, try again
Mark (0-100): 100
Saved: 100`,hidden:!0}],requires:[{node:"While"}],hints:["Ask once before the loop. The loop condition is “the mark is NOT valid”.","while mark < 0 or mark > 100:","Inside the loop: print the message, then ask again (same input line)."],solution:`mark = int(input("Mark (0-100): "))
while mark < 0 or mark > 100:
    print("Invalid, try again")
    mark = int(input("Mark (0-100): "))
print(f"Saved: {mark}")`},sentinel:{id:"sentinel",kind:"write",title:"Add until 0",task:e.jsxs(e.Fragment,{children:["A shopkeeper types each item's price; typing ",e.jsx("code",{children:"0"})," means “done”. Ask ",e.jsx("code",{children:"Price: "})," again and again, add each price to a total, and when 0 is typed print ",e.jsx("code",{children:"Total: Rs 135"}),"."]}),tests:[{inputs:["50","60","25","0"],expect:`Price: 50
Price: 60
Price: 25
Price: 0
Total: Rs 135`},{inputs:["0"],expect:`Price: 0
Total: Rs 0`,hidden:!0},{inputs:["99","1","0"],expect:`Price: 99
Price: 1
Price: 0
Total: Rs 100`,hidden:!0}],requires:[{node:"While"}],hints:["total = 0 before the loop; ask for the first price before the loop too.","while price != 0: add it, then ask for the next."],solution:`total = 0
price = int(input("Price: "))
while price != 0:
    total += price
    price = int(input("Price: "))
print(f"Total: Rs {total}")`},digits:{id:"digits",kind:"make",title:"Count the digits, add the digits",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Number: "})," (a positive whole number). Using a while loop with ",e.jsx("code",{children:"% 10"})," and ",e.jsx("code",{children:"// 10"})," from Unit 4.4, peel off digits one at a time. Print ",e.jsx("code",{children:"Digits: 4"})," and ",e.jsx("code",{children:"Digit sum: 22"})," (for 4729)."]}),minLines:10,tests:[{inputs:["4729"],expect:`Number: 4729
Digits: 4
Digit sum: 22`},{inputs:["7"],expect:`Number: 7
Digits: 1
Digit sum: 7`,hidden:!0},{inputs:["1000"],expect:`Number: 1000
Digits: 4
Digit sum: 1`,hidden:!0}],requires:[{node:"While"},{text:"% 10",msg:"Get the last digit with n % 10."},{text:"// 10",msg:"Drop the last digit with n // 10."}],forbids:[{call:"len",msg:"Do it with the loop and arithmetic, not len( )."},{call:"str",msg:"Do it with % and //, not by converting to text."}],hints:["Loop while n > 0. Each round: add n % 10 to the sum, add 1 to the count, then n = n // 10.","count = 0 and total = 0 before the loop."],solution:`n = int(input("Number: "))
count = 0
total = 0
while n > 0:
    total += n % 10
    count += 1
    n = n // 10
print(f"Digits: {count}")
print(f"Digit sum: {total}")`}},F=r,v=[{q:"When does a while loop check its condition?",options:["Only once, at the start","Before every round","After every round","Only when the body changes something"],answer:1,explain:"The condition is re-checked before each repetition; when it's False the loop ends."},{q:"What does this print?",code:`i = 1
while i <= 3:
    print(i)
    i += 1`,options:["1 2 3","1 2 3 4","0 1 2","Nothing"],answer:0,explain:"i is 1, 2, 3 inside the loop. When i becomes 4, 4 <= 3 is False and the loop stops."},{q:"You forget i += 1. What happens?",options:["Error","The loop runs forever","It runs once","It never runs"],answer:1,explain:"Nothing changes i, so the condition never becomes False — an infinite loop."},{q:"What if the condition is False the very first time?",options:["The body runs once anyway","The body never runs","Python waits","Error"],answer:1,explain:"while checks before running; a loop can run zero times."},{q:"Where must total = 0 go when adding numbers in a loop?",options:["Inside the loop","Before the loop","After the loop","Anywhere"],answer:1,explain:"Inside the loop it would reset to 0 every round. Create it once, before."},{q:"Which loop job is a while loop's natural fit?",options:["Exactly 10 times","Until the user types a valid value","For each letter of a word","Never"],answer:1,explain:"while shines when you don't know in advance how many rounds are needed. Counting loops get easier with for (next unit)."}];function R(n){const o=[{label:"Why Repeat?",kicker:"THE NEED",title:"Say it once, run it many times",blocks:[e.jsx(a,{children:"Printing 1 to 5 is five lines. 1 to 500 is five hundred — unless the computer repeats for you. Drag the slider:"}),e.jsx(y,{}),r.count5]},{label:"Trace It",kicker:"BE THE COMPUTER",title:"How while runs, one step at a time",blocks:[e.jsxs(a,{children:[e.jsx("code",{children:"while condition:"})," works like ",e.jsx("code",{children:"if"}),", with one difference: after the body runs, Python goes ",e.jsx("strong",{children:"back up"})," and checks again. Step through and watch ",e.jsx("code",{children:"count"})," change in memory:"]}),e.jsx(j,{}),e.jsxs("div",{className:"fh-two",style:{maxWidth:820,marginTop:14},children:[e.jsx(u,{title:"If you know C",code:`int count = 1;
while (count <= 3) {
    printf("%d\\n", count);
    count++;
}`}),e.jsx(u,{title:"Python",code:`count = 1
while count <= 3:
    print(count)
    count += 1`})]}),r.countdown,e.jsxs(f,{children:["Every counting loop needs three things: ",e.jsx("strong",{children:"create"})," the counter before the loop, ",e.jsx("strong",{children:"check"})," it in the condition, ",e.jsx("strong",{children:"change"})," it inside the body. Forget the third and the loop never ends."]})]},{label:"Counter & Total",kicker:"TWO VARIABLES",title:"Counting and accumulating",blocks:[e.jsxs(a,{children:["The most useful loop pattern: a counter walks through the numbers while a ",e.jsx("strong",{children:"total"})," collects them. The total starts at 0 ",e.jsx("em",{children:"before"})," the loop and grows ",e.jsx("em",{children:"inside"})," it."]}),r.sumn,r.table]},{label:"Loop Bugs",kicker:"INFINITE & OFF-BY-ONE",title:"The two classic loop bugs",blocks:[e.jsxs(a,{children:["Two mistakes cause most loop bugs: the condition never becomes False (an ",e.jsx("strong",{children:"infinite loop"}),"), or the loop runs one time too few or too many (",e.jsx("strong",{children:"off-by-one"}),"). Meet both, then fix them."]}),r.forever,r.offby1,e.jsxs(g,{icon:"🛑",children:["In real Python an infinite loop just hangs — press ",e.jsx("strong",{children:"Ctrl+C"})," to stop it. Here the runner stops it after 5 seconds."]})]},{label:"Until…",kicker:"UNKNOWN NUMBER OF ROUNDS",title:"Loops that run until something happens",blocks:[e.jsxs(a,{children:["Where ",e.jsx("code",{children:"while"})," really shines: when you ",e.jsx("em",{children:"can't"})," know in advance how many rounds are needed — re-asking until the input is valid, or reading values until a stop signal."]}),r.validate,r.sentinel]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: count and add the digits",blocks:[e.jsx(a,{children:"A while loop, a counter, a total, and the two digit tricks from Unit 4.4. This pattern appears in many exam questions (reverse a number, palindrome numbers, Armstrong numbers)."}),r.digits]}];return e.jsx(w,{...n,unitId:"Unit6_1",crumb:"MODULE 6 › UNIT 6.1",title:"The while Loop",sections:o,quiz:v,next:{title:"Unit 6.2 — The for Loop & range()",text:"When you know how many rounds, for does the counting for you — no forgotten += 1."}})}export{F as EXERCISES,R as default};
