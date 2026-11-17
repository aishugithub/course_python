import{j as e,r as m}from"./index-BsB65IVi.js";import{P as a,K as g,C as j,N as M,L as R,a as d,T as s,t as x}from"./Lesson-M2Z85AvF.js";const f=(t,n=s.navy)=>({padding:"9px 14px",borderRadius:8,border:`1.5px solid ${t?n:s.border}`,background:t?n:s.card,color:t?"#fff":s.text,fontWeight:700,cursor:"pointer",fontFamily:d,fontSize:15}),y={width:90,padding:"8px 10px",borderRadius:8,border:`1.5px solid ${s.borderStrong}`,background:s.card,fontFamily:d,fontSize:15,color:s.text},l=t=>(Number.isInteger(t),String(t)),k=t=>Number.isInteger(t)?`${t}.0`:String(t),v=[{s:"+",n:"add",f:(t,n)=>l(t+n),note:"Plain addition."},{s:"-",n:"subtract",f:(t,n)=>l(t-n),note:"Plain subtraction."},{s:"*",n:"multiply",f:(t,n)=>l(t*n),note:"Multiplication is * — there is no × key."},{s:"/",n:"divide",f:(t,n)=>n===0?"ZeroDivisionError":k(t/n),note:"Always gives a float, even 10 / 2 → 5.0."},{s:"//",n:"floor divide",f:(t,n)=>n===0?"ZeroDivisionError":l(Math.floor(t/n)),note:"Divides, then rounds DOWN to a whole number. “How many whole times does b fit in a?” For negatives, down means towards minus infinity: -17 // 5 is -4."},{s:"%",n:"remainder (mod)",f:(t,n)=>n===0?"ZeroDivisionError":l(t-n*Math.floor(t/n)),note:"What's left over after //. Always true: (a // b) * b + a % b == a. Even/odd test: n % 2. Last digit: n % 10."},{s:"**",n:"power",f:(t,n)=>{const i=Math.pow(t,n);return Math.abs(i)>1e15?"(a very big number)":n<0?k(i):l(i)},note:"a to the power b. 2 ** 10 is 1024."}];function A(){const[t,n]=m.useState(17),[i,h]=m.useState(5),[b,S]=m.useState("//"),c=v.find(r=>r.s===b),w=r=>r===""||r==="-"?0:Math.trunc(Number(r));return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center",marginBottom:10},children:[e.jsxs("label",{style:{fontFamily:d},children:["a = ",e.jsx("input",{type:"number",value:t,onChange:r=>n(w(r.target.value)),style:y})]}),e.jsxs("label",{style:{fontFamily:d},children:["b = ",e.jsx("input",{type:"number",value:i,onChange:r=>h(w(r.target.value)),style:y})]})]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:v.map(r=>e.jsx("button",{onClick:()=>S(r.s),style:f(b===r.s),children:r.s},r.s))}),e.jsx("div",{style:{fontSize:13,color:s.muted,marginTop:8},children:"Try a = -17 with // and %. Try b = 0."})]}),e.jsxs("div",{style:{background:s.card,border:`1.5px solid ${x(s.blue,"55")}`,borderRadius:12,padding:16},children:[e.jsxs("div",{style:{fontFamily:d,fontSize:20},children:[t," ",b," ",i," ",e.jsx("span",{style:{color:s.muted},children:"→"})," ",e.jsx("strong",{style:{color:c.f(t,i).includes("Error")?s.red:s.blue},children:c.f(t,i)})]}),e.jsxs("div",{style:{color:s.slate,fontSize:14.5,marginTop:8,lineHeight:1.6},children:[e.jsxs("strong",{children:[c.n,":"]})," ",c.note]})]})]})}const u=[{e:"2 + 3 * 4 - 6 / 2",h:"3 * 4",n:"* and / come before + and -. Python finds 3 * 4 first."},{e:"2 + 12 - 6 / 2",h:"6 / 2",n:"Then the other division: 6 / 2 → 3.0 (a float, because of /)."},{e:"2 + 12 - 3.0",h:"2 + 12",n:"Only + and - are left: left to right."},{e:"14 - 3.0",h:"14 - 3.0",n:"The last subtraction."},{e:"11.0",h:null,n:"Brackets first, then **, then * / // %, then + -. Same level: left to right."}];function T(){const[t,n]=m.useState(0),i=u[t],h=i.h?i.e.split(i.h):[i.e];return e.jsxs("div",{children:[e.jsx("div",{style:{background:s.codeBg,border:`1px solid ${s.border}`,borderRadius:12,padding:"18px 14px",textAlign:"center",fontFamily:d,fontSize:24},children:i.h?e.jsxs(e.Fragment,{children:[h[0],e.jsx("span",{style:{background:x(s.blue,"22"),color:s.blue,borderRadius:6,padding:"2px 8px",fontWeight:700},children:i.h}),h[1]]}):e.jsx("strong",{style:{color:s.green},children:i.e})}),e.jsx("div",{style:{marginTop:10,background:x(s.purple,"10"),border:`1px solid ${x(s.purple,"44")}`,borderRadius:10,padding:"10px 14px",fontSize:14.5,color:s.slate},children:i.n}),e.jsxs("div",{style:{display:"flex",gap:10,marginTop:10,alignItems:"center"},children:[e.jsx("button",{onClick:()=>n(Math.max(0,t-1)),disabled:t===0,style:f(!1),children:"◀"}),e.jsx("button",{onClick:()=>n(Math.min(u.length-1,t+1)),disabled:t===u.length-1,style:f(!0),children:"Next step ▶"}),e.jsxs("span",{style:{color:s.muted,fontSize:13},children:["Step ",t+1," / ",u.length]})]})]})}const p="=".repeat(26),o={ops:{id:"ops",kind:"type",title:"All seven operators",task:e.jsx(e.Fragment,{children:"Type it and predict each line before running. Watch lines 4, 5 and 6."}),show:`a = 17
b = 5
print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)`,minLines:10,tests:[{expect:`22
12
85
3.4
3
2
1419857`}],hints:["17 // 5 is how many whole 5s fit in 17; 17 % 5 is what's left over."],solution:`a = 17
b = 5
print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)`},clock:{id:"clock",kind:"write",title:"Minutes into hours",task:e.jsxs(e.Fragment,{children:["A film runs for some minutes. Ask ",e.jsx("code",{children:"Minutes: "})," (a whole number) and print it as hours and minutes, e.g. 125 → ",e.jsx("code",{children:"2 hours 5 minutes"}),". Use ",e.jsx("code",{children:"//"})," and ",e.jsx("code",{children:"%"}),"."]}),tests:[{inputs:["125"],expect:`Minutes: 125
2 hours 5 minutes`},{inputs:["59"],expect:`Minutes: 59
0 hours 59 minutes`,hidden:!0},{inputs:["180"],expect:`Minutes: 180
3 hours 0 minutes`,hidden:!0}],requires:[{text:"//",msg:"Use // to get the whole hours."},{text:"%",msg:"Use % to get the minutes left over."}],hints:["Hours = how many whole 60s fit: total // 60","Minutes left = total % 60",'print(hours, "hours", mins, "minutes")'],solution:`total = int(input("Minutes: "))
hours = total // 60
mins = total % 60
print(hours, "hours", mins, "minutes")`},digits:{id:"digits",kind:"complete",title:"Peel off the last digit",task:e.jsxs(e.Fragment,{children:["Two tricks you'll use all through Computational Thinking: ",e.jsx("code",{children:"n % 10"})," is the ",e.jsx("strong",{children:"last digit"}),"; ",e.jsx("code",{children:"n // 10"})," ",e.jsx("strong",{children:"drops"})," the last digit. Fill in both blanks."]}),starter:`n = int(input("Number: "))
last = n ___ 10
rest = n ___ 10
print("Last digit:", last)
print("Without it:", rest)`,tests:[{inputs:["4729"],expect:`Number: 4729
Last digit: 9
Without it: 472`},{inputs:["1042"],expect:`Number: 1042
Last digit: 2
Without it: 104`,hidden:!0}],hints:["Remainder after dividing by 10 → the last digit.","last = n % 10, rest = n // 10"],solution:`n = int(input("Number: "))
last = n % 10
rest = n // 10
print("Last digit:", last)
print("Without it:", rest)`},average:{id:"average",kind:"fix",title:"The wrong average",task:e.jsx(e.Fragment,{children:"Three marks: 60, 70, 80. The average should be 70.0 — run it and see what you get. No error, wrong answer. Fix it."}),starter:`m1 = int(input("Mark 1: "))
m2 = int(input("Mark 2: "))
m3 = int(input("Mark 3: "))
avg = m1 + m2 + m3 / 3
print("Average:", avg)`,tests:[{inputs:["60","70","80"],expect:`Mark 1: 60
Mark 2: 70
Mark 3: 80
Average: 70.0`},{inputs:["90","45","30"],expect:`Mark 1: 90
Mark 2: 45
Mark 3: 30
Average: 55.0`,hidden:!0}],hints:["Which happens first: the + or the /?","Only m3 is being divided by 3. Brackets make the addition happen first."],solution:`m1 = int(input("Mark 1: "))
m2 = int(input("Mark 2: "))
m3 = int(input("Mark 3: "))
avg = (m1 + m2 + m3) / 3
print("Average:", avg)`},shortcut:{id:"shortcut",kind:"modify",title:"Priya's wallet, the short way",task:e.jsxs(e.Fragment,{children:["Remember Priya's wallet from Unit 4.2? Rewrite the three updates with ",e.jsx("code",{children:"-="})," and ",e.jsx("code",{children:"+="}),". The output must stay exactly the same."]}),starter:`wallet = 500
print("Start:", wallet)
wallet = wallet - 120
print("After snacks:", wallet)
wallet = wallet - 250
print("After book:", wallet)
wallet = wallet + 100
print("After pocket money:", wallet)`,minLines:9,tests:[{expect:`Start: 500
After snacks: 380
After book: 130
After pocket money: 230`}],requires:[{node:"AugAssign",min:3,msg:"Use -= or += for all three updates."}],validate:t=>/wallet\s*=\s*wallet/.test(t)?"Some updates still use wallet = wallet ... — switch them to -= or +=.":null,hints:["wallet = wallet - 120 becomes wallet -= 120"],solution:`wallet = 500
print("Start:", wallet)
wallet -= 120
print("After snacks:", wallet)
wallet -= 250
print("After book:", wallet)
wallet += 100
print("After pocket money:", wallet)`},banner:{id:"banner",kind:"modify",title:"Let * draw the line",task:e.jsxs(e.Fragment,{children:["On text, ",e.jsx("code",{children:"*"})," repeats: ",e.jsx("code",{children:'"ab" * 3'})," is ",e.jsx("code",{children:'"ababab"'}),". Your cinema ticket from Unit 4.1 typed 26 ",e.jsx("code",{children:"="})," signs by hand, twice. Replace both lines with ",e.jsx("code",{children:'"=" * 26'}),"."]}),starter:`print("${p}")
print("     FOOTHOLD CINEMAS")
print("${p}")`,tests:[{expect:`${p}
     FOOTHOLD CINEMAS
${p}`}],forbids:[{text:"=====",msg:`Don't type the = signs — let "=" * 26 make them.`}],hints:['print("=" * 26)'],solution:`print("=" * 26)
print("     FOOTHOLD CINEMAS")
print("=" * 26)`},rounding:{id:"rounding",kind:"type",title:"round() and abs()",task:e.jsx(e.Fragment,{children:"Predict, type, run. Line 3 surprises almost everyone — read the note below after you run it."}),show:`print(round(3.14159, 2))
print(round(7.6))
print(round(2.5))
print(abs(-12))
print(abs(4 - 10))`,tests:[{expect:`3.14
8
2
12
6`}],hints:["round(x, 2) keeps 2 decimal places; round(x) gives a whole number."],solution:`print(round(3.14159, 2))
print(round(7.6))
print(round(2.5))
print(abs(-12))
print(abs(4 - 10))`},temp:{id:"temp",kind:"write",title:"How much warmer?",task:e.jsxs(e.Fragment,{children:["Ask for two temperatures, ",e.jsx("code",{children:"Morning: "})," and ",e.jsx("code",{children:"Afternoon: "})," (decimals allowed). Print the difference as a positive number rounded to 1 decimal place, like ",e.jsx("code",{children:"Difference: 4.9"}),". It must work whichever reading is bigger."]}),tests:[{inputs:["31.4","36.27"],expect:`Morning: 31.4
Afternoon: 36.27
Difference: 4.9`},{inputs:["20","12.3"],expect:`Morning: 20
Afternoon: 12.3
Difference: 7.7`,hidden:!0}],requires:[{call:"abs",msg:"Use abs( ) so the difference is never negative."},{call:"round",msg:"Use round(x, 1) for one decimal place."}],hints:["Subtract one from the other, then abs( ) removes the minus sign.",'print("Difference:", round(abs(b - a), 1))'],solution:`a = float(input("Morning: "))
b = float(input("Afternoon: "))
print("Difference:", round(abs(b - a), 1))`},mathmod:{id:"mathmod",kind:"type",title:"Your first import",task:e.jsxs(e.Fragment,{children:["Python ships with extra toolboxes called ",e.jsx("strong",{children:"modules"}),". ",e.jsx("code",{children:"import math"})," opens the maths toolbox; you then use its tools as ",e.jsx("code",{children:"math.something"}),". Type it and run."]}),show:`import math
print(math.sqrt(144))
print(math.pi)
print(math.ceil(4.1))
print(math.floor(4.9))`,tests:[{expect:`12.0
3.141592653589793
5
4`}],hints:["import goes on the first line; every tool is written math. followed by its name."],solution:`import math
print(math.sqrt(144))
print(math.pi)
print(math.ceil(4.1))
print(math.floor(4.9))`},buses:{id:"buses",kind:"write",title:"How many buses?",task:e.jsxs(e.Fragment,{children:["Students are going on a trip; each bus seats 40. Ask ",e.jsx("code",{children:"Students: "})," and print how many buses are needed, e.g. 130 → ",e.jsx("code",{children:"Buses needed: 4"}),". (3.25 buses isn't an answer — and 3 buses leaves 10 students behind.)"]}),tests:[{inputs:["130"],expect:`Students: 130
Buses needed: 4`},{inputs:["80"],expect:`Students: 80
Buses needed: 2`,hidden:!0},{inputs:["41"],expect:`Students: 41
Buses needed: 2`,hidden:!0}],requires:[{call:"ceil",msg:"Round UP with math.ceil( )."}],hints:["130 / 40 is 3.25. You need to round UP.","import math, then math.ceil(students / 40)"],solution:`import math
students = int(input("Students: "))
print("Buses needed:", math.ceil(students / 40))`},interest:{id:"interest",kind:"make",title:"Simple Interest calculator",task:e.jsxs(e.Fragment,{children:["The Module 4 classic. Ask ",e.jsx("code",{children:"Principal: "}),", ",e.jsx("code",{children:"Rate: "})," and ",e.jsx("code",{children:"Years: "})," (all can have decimals). Simple Interest = P × R × T ÷ 100. Print the interest and the total amount, both rounded to 2 decimal places. Blank editor."]}),minLines:9,tests:[{inputs:["10000","8","3"],expect:`Principal: 10000
Rate: 8
Years: 3
Interest: Rs 2400.0
Total: Rs 12400.0`},{inputs:["5500","7.5","2"],expect:`Principal: 5500
Rate: 7.5
Years: 2
Interest: Rs 825.0
Total: Rs 6325.0`,hidden:!0},{inputs:["1234","6.25","1.5"],expect:`Principal: 1234
Rate: 6.25
Years: 1.5
Interest: Rs 115.69
Total: Rs 1349.69`,hidden:!0}],requires:[{call:"float",min:3,msg:"All three inputs can have decimals — float( ) each one."},{call:"round",msg:"Round the results to 2 decimal places."}],forbids:[{text:"2400",msg:"Let Python calculate the interest."}],hints:["si = p * r * t / 100","total = p + si",'print("Interest: Rs", round(si, 2))'],solution:`p = float(input("Principal: "))
r = float(input("Rate: "))
t = float(input("Years: "))
si = p * r * t / 100
total = p + si
print("Interest: Rs", round(si, 2))
print("Total: Rs", round(total, 2))`}},I=o,P=[{q:"What is 17 // 5?",options:["3.4","3","2","4"],answer:1,explain:"// gives how many WHOLE 5s fit in 17: three."},{q:"What is 17 % 5?",options:["3","3.4","2","0"],answer:2,explain:"17 = 3 × 5 + 2. The remainder is 2."},{q:"What does 10 / 2 give?",options:["5","5.0",'"5"',"2"],answer:1,explain:"/ always produces a float, even when it divides exactly."},{q:"What does this print?",code:"print(2 + 3 * 4)",options:["20","14","24","9"],answer:1,explain:"* before +: 3 * 4 = 12, then 2 + 12 = 14."},{q:"After x = 10 and then x -= 3, what is x?",options:["13","7","-3","30"],answer:1,explain:"x -= 3 is short for x = x - 3."},{q:"What does print(round(2.5)) show?",options:["3","2","2.5","2.0"],answer:1,explain:"Python rounds an exact .5 to the nearest EVEN number (banker's rounding): round(2.5) is 2, round(3.5) is 4. It avoids always pushing totals upward."},{q:"60 students, 25 per bus. Which gives the number of buses needed?",options:["60 // 25","round(60 / 25)","math.ceil(60 / 25)","60 % 25"],answer:2,explain:"60 / 25 = 2.4 buses — you need 3. Only ceil always rounds up; round(2.4) gives 2 and leaves students behind."}];function F(t){const n=[{label:"Arithmetic",kicker:"SEVEN OPERATORS",title:"Python as a calculator",blocks:[e.jsxs(a,{children:["You've used ",e.jsx("code",{children:"+ - * /"})," already. Python has three more: ",e.jsx("code",{children:"//"})," (whole-number division), ",e.jsx("code",{children:"%"})," (remainder) and ",e.jsx("code",{children:"**"})," (power). Pick numbers and an operator:"]}),e.jsx(A,{}),o.ops,e.jsxs(a,{children:[e.jsx("code",{children:"//"})," and ",e.jsx("code",{children:"%"})," are a pair: one answers “how many whole times?”, the other “what's left over?”. Real uses:"]}),o.clock,o.digits,e.jsxs(g,{children:[e.jsx("code",{children:"/"})," always gives a float. ",e.jsx("code",{children:"//"})," gives the whole-number part, ",e.jsx("code",{children:"%"})," the remainder. Last digit: ",e.jsx("code",{children:"n % 10"}),". Even number: ",e.jsx("code",{children:"n % 2 == 0"})," (you'll use this in Module 5)."]})]},{label:"Order",kicker:"PRECEDENCE",title:"Which part goes first?",blocks:[e.jsxs(a,{children:["Python follows the order you learnt in maths (BODMAS): ",e.jsx("strong",{children:"brackets"}),", then ",e.jsx("code",{children:"**"}),", then ",e.jsx("code",{children:"* / // %"}),", then ",e.jsx("code",{children:"+ -"}),". Same level: left to right. Step through:"]}),e.jsx(T,{}),o.average,e.jsxs(g,{children:["When in doubt, add brackets. ",e.jsx("code",{children:"(m1 + m2 + m3) / 3"})," is both correct and obvious to anyone reading it."]})]},{label:"Shortcuts",kicker:'+=  AND  "=" * 26',title:"Two shortcuts you'll use every day",blocks:[e.jsx(a,{children:"Updating a variable with its old value is so common that Python has a shortcut. These pairs do exactly the same thing:"}),e.jsxs("div",{className:"fh-two",style:{maxWidth:760},children:[e.jsx(j,{title:"long way",code:`score = score + 1
wallet = wallet - 120
price = price * 2`}),e.jsx(j,{title:"shortcut",code:`score += 1
wallet -= 120
price *= 2`})]}),o.shortcut,e.jsxs(a,{children:["Operators work on text too: ",e.jsx("code",{children:"+"})," joins text (Unit 4.3) and ",e.jsx("code",{children:"*"})," repeats it."]}),o.banner]},{label:"round & abs",kicker:"TIDY NUMBERS",title:"round() and abs()",blocks:[e.jsxs(a,{children:[e.jsx("code",{children:"round(x, 2)"})," keeps two decimal places; ",e.jsx("code",{children:"round(x)"})," rounds to a whole number. ",e.jsx("code",{children:"abs(x)"})," drops the minus sign — “how far apart?”, whichever way."]}),o.rounding,e.jsxs(M,{icon:"🎯",children:["Python's ",e.jsx("code",{children:"round()"})," sends an exact ",e.jsx("code",{children:".5"})," to the nearest ",e.jsx("strong",{children:"even"})," number: ",e.jsx("code",{children:"round(2.5)"})," is 2, ",e.jsx("code",{children:"round(3.5)"})," is 4. It's on purpose (it stops totals drifting upward), and it surprises almost everyone the first time."]}),o.temp]},{label:"import math",kicker:"YOUR FIRST MODULE",title:"Opening Python's maths toolbox",blocks:[e.jsxs(a,{children:["Not everything is built in. Square roots, π, and rounding ",e.jsx("em",{children:"up"})," live in the ",e.jsx("code",{children:"math"})," module. ",e.jsx("code",{children:"import math"})," at the top of your program, then call its tools with ",e.jsx("code",{children:"math."})," in front. (You can also write ",e.jsx("code",{children:"from math import sqrt"})," and then just ",e.jsx("code",{children:"sqrt(…)"}),".)"]}),o.mathmod,o.buses,e.jsxs(g,{children:[e.jsx("code",{children:"math.ceil"})," always rounds up, ",e.jsx("code",{children:"math.floor"})," always down, ",e.jsx("code",{children:"round"})," to the nearest. Pick by the question: buses and boxes need ",e.jsx("code",{children:"ceil"}),"."]})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: Simple Interest",blocks:[e.jsxs(a,{children:["Input with ",e.jsx("code",{children:"float()"}),", a formula, and ",e.jsx("code",{children:"round()"})," — everything from Units 4.2 to 4.4 in one program."]}),o.interest]}];return e.jsx(R,{...t,unitId:"Unit4_4",crumb:"MODULE 4 › UNIT 4.4",title:"Operators & Expressions",sections:n,quiz:P,next:{title:"Unit 4.5 — Formatted Output",text:"f-strings: print Rs 450.00 instead of Rs 450.0, line things up, and stop fighting commas."}})}export{I as EXERCISES,F as default};
