import{j as e,r as h}from"./index-BsB65IVi.js";import{P as d,K as m,L as x,a as p,T as n,t as c}from"./Lesson-M2Z85AvF.js";const l={margin:0,fontFamily:p,fontSize:14.5,lineHeight:1.7,background:n.codeBg,border:`1px solid ${n.border}`,borderRadius:10,padding:"12px 14px",whiteSpace:"pre-wrap"},f={width:"100%",accentColor:n.navy};function g(){const[t,a]=h.useState(7),i=t%2===0;return e.jsxs("div",{children:[e.jsxs("label",{style:{fontFamily:p,fontSize:15},children:["number = ",e.jsx("strong",{children:t})]}),e.jsx("input",{type:"range",min:-10,max:20,value:t,onChange:s=>a(Number(s.target.value)),style:f}),e.jsxs("div",{className:"fh-two",style:{marginTop:10},children:[e.jsxs("div",{style:{background:n.card,border:`1.5px solid ${c(n.red,"55")}`,borderRadius:12,padding:14},children:[e.jsx("div",{style:{color:n.red,fontWeight:700,fontSize:13},children:"❌ WITHOUT if"}),e.jsx("pre",{style:{...l,margin:"8px 0"},children:'print("Even")'}),e.jsxs("div",{style:{fontSize:14,color:n.slate},children:["Always says Even. ",!i&&e.jsxs("strong",{style:{color:n.red},children:["Wrong right now — ",t," is odd."]})]})]}),e.jsxs("div",{style:{background:n.card,border:`1.5px solid ${c(n.green,"55")}`,borderRadius:12,padding:14},children:[e.jsx("div",{style:{color:n.green,fontWeight:700,fontSize:13},children:"✅ WITH if / else"}),e.jsxs("pre",{style:{...l,margin:"8px 0"},children:[`if number % 2 == 0:
`,e.jsx("span",{style:{background:i?c(n.green,"22"):"transparent"},children:'    print("Even")'}),`
else:
`,e.jsx("span",{style:{background:i?"transparent":c(n.green,"22")},children:'    print("Odd")'})]}),e.jsxs("div",{style:{fontSize:14,color:n.green},children:["Prints ",e.jsx("strong",{children:i?"Even":"Odd"})," — the highlighted line is the one that runs."]})]})]})]})}function k(){const[t,a]=h.useState(!1);return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:n.orange,fontWeight:700,marginBottom:6},children:"⚙️ If you know C — braces mark the block"}),e.jsx("pre",{style:l,children:`if (temp >= 100.4) {
    printf("Fever\\n");
}
printf("Thank you\\n");`})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:n.blue,fontWeight:700,marginBottom:6},children:"🐍 Python — colon + indentation"}),e.jsx("pre",{style:{...l,borderColor:t?n.red:n.border},children:t?`if temp >= 100.4:
print("Fever")
print("Thank you")`:`if temp >= 100.4:
    print("Fever")     # inside the if
print("Thank you")     # after the if: always runs`}),e.jsx("button",{onClick:()=>a(!t),style:{marginTop:8,padding:"8px 14px",borderRadius:8,border:`1.5px solid ${t?n.red:n.border}`,background:t?c(n.red,"12"):n.card,color:t?n.red:n.text,fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:t?"IndentationError: expected an indented block — fix it ◀":"What if I forget to indent? ▶"})]})]})}const u=[{c:">= 90",t:90,g:"A",col:n.green},{c:">= 75",t:75,g:"B",col:n.blue},{c:">= 60",t:60,g:"C",col:n.yellow},{c:null,t:-1/0,g:"F",col:n.red}];function y(){const[t,a]=h.useState(78),i=u.findIndex(s=>t>=s.t);return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("label",{style:{fontFamily:p,fontSize:15},children:["score = ",e.jsx("strong",{children:t})]}),e.jsx("input",{type:"range",min:0,max:100,value:t,onChange:s=>a(Number(s.target.value)),style:f}),e.jsxs("div",{style:{fontSize:14,color:n.slate,marginTop:8,lineHeight:1.6},children:["Python checks top to bottom and runs ",e.jsx("strong",{children:"only the first"})," true branch. Everything below it is skipped — not even checked."]})]}),e.jsx("div",{style:{...l,padding:8},children:u.map((s,o)=>e.jsxs("div",{style:{padding:"4px 8px",borderRadius:6,background:o===i?c(s.col,"22"):"transparent",color:o<i?n.muted:o===i?s.col:n.muted,fontWeight:o===i?700:400,textDecoration:o>i?"line-through":"none"},children:[s.c?`${o===0?"if":"elif"} score ${s.c}:`:"else:",e.jsx("br",{}),`    print("${s.g}")`,o<i?"   # checked: False":""]},o))})]})}const r={evenodd:{id:"evenodd",kind:"type",title:"Even or odd",task:e.jsx(e.Fragment,{children:"Your first branching program. Type it carefully: the colons, and 4 spaces before each print (press Tab)."}),show:`number = int(input("Number: "))
if number % 2 == 0:
    print("Even")
else:
    print("Odd")`,tests:[{inputs:["7"],expect:`Number: 7
Odd`},{inputs:["10"],expect:`Number: 10
Even`,hidden:!0},{inputs:["0"],expect:`Number: 0
Even`,hidden:!0}],requires:[{node:"If",msg:"Use if / else."}],hints:["After a line ending in :, the editor indents for you when you press Enter."],solution:`number = int(input("Number: "))
if number % 2 == 0:
    print("Even")
else:
    print("Odd")`},fever:{id:"fever",kind:"write",title:"Fever check (if without else)",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Temperature: "})," (decimal, °F). If it is 100.4 or more, print ",e.jsx("code",{children:"Fever - please see a doctor"}),". Then — for everyone — print ",e.jsx("code",{children:"Thank you"}),". That last line must ",e.jsx("strong",{children:"not"})," be inside the if."]}),tests:[{inputs:["101.2"],expect:`Temperature: 101.2
Fever - please see a doctor
Thank you`},{inputs:["98.6"],expect:`Temperature: 98.6
Thank you`,hidden:!0},{inputs:["100.4"],expect:`Temperature: 100.4
Fever - please see a doctor
Thank you`,hidden:!0}],requires:[{node:"If"}],hints:["An if doesn't need an else — if the condition is False, Python just skips the block.","Thank you goes back to the left edge (no indent), so it runs either way."],solution:`temp = float(input("Temperature: "))
if temp >= 100.4:
    print("Fever - please see a doctor")
print("Thank you")`},colon:{id:"colon",kind:"fix",title:"Two missing pieces",task:e.jsx(e.Fragment,{children:"Run it. Fix the first error, run again, fix the next."}),starter:`marks = int(input("Marks: "))
if marks >= 40
print("Pass")`,tests:[{inputs:["55"],expect:`Marks: 55
Pass`},{inputs:["30"],expect:"Marks: 30",hidden:!0}],hints:["A line starting with if must end with a colon.","The print belongs inside the if, so it needs 4 spaces in front."],solution:`marks = int(input("Marks: "))
if marks >= 40:
    print("Pass")`},eqeq:{id:"eqeq",kind:"fix",title:"= inside an if",task:e.jsx(e.Fragment,{children:"Run it, read the coach, fix it."}),starter:`marks = int(input("Marks: "))
if marks = 100:
    print("Perfect score!")`,tests:[{inputs:["100"],expect:`Marks: 100
Perfect score!`},{inputs:["99"],expect:"Marks: 99",hidden:!0}],hints:["Unit 5.1: = stores, == compares."],solution:`marks = int(input("Marks: "))
if marks == 100:
    print("Perfect score!")`},passfail:{id:"passfail",kind:"write",title:"Pass or fail",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Marks: "}),". Print ",e.jsx("code",{children:"Pass"})," if the marks are 40 or more, otherwise ",e.jsx("code",{children:"Fail"}),". Use if / else."]}),tests:[{inputs:["67"],expect:`Marks: 67
Pass`},{inputs:["40"],expect:`Marks: 40
Pass`,hidden:!0},{inputs:["39"],expect:`Marks: 39
Fail`,hidden:!0}],requires:[{node:"If"}],hints:["else: on its own line, at the same indent as the if."],solution:`marks = int(input("Marks: "))
if marks >= 40:
    print("Pass")
else:
    print("Fail")`},later:{id:"later",kind:"fix",title:"A branch with nothing in it (yet)",task:e.jsxs(e.Fragment,{children:["The plan: students with 40 or more get a prize, but nobody has decided the prize yet, so that branch should do ",e.jsx("strong",{children:"nothing"})," for now. Run it: Python refuses a block that holds only a comment. Put ",e.jsx("code",{children:"pass"})," in the empty branch. For 72 the program should print just ",e.jsx("code",{children:"Checked"}),"."]}),starter:`marks = int(input("Marks: "))
if marks >= 40:
    # decide the prize later
else:
    print("Needs support")
print("Checked")`,tests:[{inputs:["72"],expect:`Marks: 72
Checked`},{inputs:["25"],expect:`Marks: 25
Needs support
Checked`,hidden:!0}],requires:[{node:"Pass",msg:"Use pass as the one line inside the empty branch."}],hints:["A comment is not a statement: every block needs at least one real line.","Under the comment, at the same indent, write: pass"],solution:`marks = int(input("Marks: "))
if marks >= 40:
    # decide the prize later
    pass
else:
    print("Needs support")
print("Checked")`},grade:{id:"grade",kind:"write",title:"Grade calculator",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Score: "})," and print the grade: ",e.jsx("code",{children:"A"})," for 90 and above, ",e.jsx("code",{children:"B"})," for 75 and above, ",e.jsx("code",{children:"C"})," for 60 and above, otherwise ",e.jsx("code",{children:"F"}),". Use if / elif / else."]}),tests:[{inputs:["95"],expect:`Score: 95
A`},{inputs:["90"],expect:`Score: 90
A`,hidden:!0},{inputs:["75"],expect:`Score: 75
B`,hidden:!0},{inputs:["60"],expect:`Score: 60
C`,hidden:!0},{inputs:["59"],expect:`Score: 59
F`,hidden:!0}],requires:[{text:"elif",msg:"Use elif for the middle grades."}],hints:["Check the highest grade first.","if score >= 90: … elif score >= 75: … elif score >= 60: … else: …"],solution:`score = int(input("Score: "))
if score >= 90:
    print("A")
elif score >= 75:
    print("B")
elif score >= 60:
    print("C")
else:
    print("F")`},chain:{id:"chain",kind:"fix",title:"Three grades at once",task:e.jsxs(e.Fragment,{children:["A student scoring 95 gets told A, B ",e.jsx("em",{children:"and"})," C. Run it and see. Fix it so only one grade prints."]}),starter:`score = int(input("Score: "))
if score >= 90:
    print("A")
if score >= 75:
    print("B")
if score >= 60:
    print("C")`,tests:[{inputs:["95"],expect:`Score: 95
A`},{inputs:["70"],expect:`Score: 70
C`,hidden:!0},{inputs:["80"],expect:`Score: 80
B`,hidden:!0}],requires:[{text:"elif",msg:"Join the checks into one chain with elif."}],hints:["Separate ifs are each checked on their own. A chain stops at the first True.","Change the 2nd and 3rd if to elif."],solution:`score = int(input("Score: "))
if score >= 90:
    print("A")
elif score >= 75:
    print("B")
elif score >= 60:
    print("C")`},name:{id:"name",kind:"write",title:"Did they type anything?",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Name: "}),". If the user typed something, print ",e.jsx("code",{children:"Welcome, Priya!"})," (with their name). If they just pressed Enter, print ",e.jsx("code",{children:"You didn't type a name."})," Use truthiness from Unit 5.1: an empty string is falsy, so ",e.jsx("code",{children:"if name:"})," works."]}),tests:[{inputs:["Priya"],expect:`Name: Priya
Welcome, Priya!`},{inputs:[""],expect:`Name: 
You didn't type a name.`,hidden:!0},{inputs:["Arun"],expect:`Name: Arun
Welcome, Arun!`,hidden:!0}],requires:[{node:"If"}],hints:["if name: is True whenever name isn't empty.",'print(f"Welcome, {name}!")'],solution:`name = input("Name: ")
if name:
    print(f"Welcome, {name}!")
else:
    print("You didn't type a name.")`},ticket:{id:"ticket",kind:"make",title:"Cinema ticket price",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Age: "}),". Under 5: ",e.jsx("code",{children:"Infant"}),", free (Rs 0). Under 18: ",e.jsx("code",{children:"Child"}),", Rs 100. Under 60: ",e.jsx("code",{children:"Adult"}),", Rs 250. Otherwise ",e.jsx("code",{children:"Senior"}),", Rs 120. Store the category and price in variables inside the branches, then print once at the end, e.g. ",e.jsx("code",{children:"Adult: Rs 250"}),"."]}),minLines:14,tests:[{inputs:["25"],expect:`Age: 25
Adult: Rs 250`},{inputs:["4"],expect:`Age: 4
Infant: Rs 0`,hidden:!0},{inputs:["5"],expect:`Age: 5
Child: Rs 100`,hidden:!0},{inputs:["17"],expect:`Age: 17
Child: Rs 100`,hidden:!0},{inputs:["18"],expect:`Age: 18
Adult: Rs 250`,hidden:!0},{inputs:["60"],expect:`Age: 60
Senior: Rs 120`,hidden:!0}],requires:[{text:"elif",min:2,msg:"Four categories → if, two elifs, else."}],forbids:[{call:"print",max:1,msg:"Set category and price in the branches; print only once, at the end."}],hints:['Inside each branch: category = "Child" and price = 100 (two lines).','After the chain, at the left edge: print(f"{category}: Rs {price}")'],solution:`age = int(input("Age: "))
if age < 5:
    category = "Infant"
    price = 0
elif age < 18:
    category = "Child"
    price = 100
elif age < 60:
    category = "Adult"
    price = 250
else:
    category = "Senior"
    price = 120
print(f"{category}: Rs {price}")`}},w=r,b=[{q:"What marks the lines that belong inside an if?",options:["Curly braces","A colon after the condition, then indentation","Semicolons","Brackets"],answer:1,explain:"The colon opens the block; every indented line after it belongs to it."},{q:"In an if / elif / else chain, how many branches run?",options:["Every one whose condition is True","Only the first one whose condition is True","Always the else","All of them"],answer:1,explain:"Python stops at the first True condition and skips the rest."},{q:"What does this print for score = 95?",code:`if score >= 60:
    print("C")
elif score >= 90:
    print("A")`,options:["A","C","C then A","Nothing"],answer:1,explain:"95 >= 60 is True first, so the chain stops at C. Check the strictest condition first."},{q:"What does this print for score = 95?",code:`if score >= 90:
    print("A")
if score >= 60:
    print("C")`,options:["A","C","A then C","Nothing"],answer:2,explain:"Two separate ifs are two separate questions. Both are True, so both print. Use elif to make one chain."},{q:"Which line is wrong?",code:`if marks >= 40:
    print("Pass")
else marks < 40:
    print("Fail")`,options:["Line 1","Line 2","Line 3 — else never takes a condition","Line 4"],answer:2,explain:"else means “in every other case”: just else:. Use elif if you need a condition."},{q:"When does the block under if name: run?",options:["Always","When name is not empty","When name is empty",'When name is "True"'],answer:1,explain:"Non-empty text is truthy; the empty string is falsy."}];function T(t){const a=[{label:"Why Branch?",kicker:"THE NEED",title:"One program, different paths",blocks:[e.jsxs(d,{children:["Until now every program ran the same lines in the same order, whatever the input. Real programs ",e.jsx("em",{children:"choose"}),". Drag the slider:"]}),e.jsx(g,{}),r.evenodd]},{label:"if & Blocks",kicker:"COLON + INDENT",title:"if, and the indented block",blocks:[e.jsxs(d,{children:["The condition goes after ",e.jsx("code",{children:"if"}),", then a colon. The lines to run when it's True are ",e.jsx("strong",{children:"indented 4 spaces"}),". The first line back at the left edge is outside the if, and always runs. This is the rule from Unit 4.1, now doing real work:"]}),e.jsx(k,{}),r.fever,r.colon,r.eqeq]},{label:"else",kicker:"THE OTHER PATH",title:"if / else: exactly one of two",blocks:[e.jsxs(d,{children:[e.jsx("code",{children:"else:"})," catches every case the if didn't. It never has a condition of its own, and it lines up with its if."]}),r.passfail,e.jsxs(d,{children:["Sometimes a branch has nothing to do ",e.jsx("em",{children:"yet"}),". A block can't be empty, so Python gives you a line that does nothing at all: ",e.jsx("code",{children:"pass"}),". You'll see it as a placeholder while a program is still being built."]}),r.later]},{label:"elif Chains",kicker:"MANY PATHS",title:"elif: check in order, stop at the first True",blocks:[e.jsx(y,{}),r.grade,r.chain,e.jsxs(m,{children:["A chain (",e.jsx("code",{children:"if … elif … else"}),") runs ",e.jsx("strong",{children:"exactly one"})," branch: the first True one. Separate ",e.jsx("code",{children:"if"}),"s are separate questions, and several can run. Put the strictest condition first."]})]},{label:"Truthy if",kicker:"UNIT 5.1 AT WORK",title:"if with any value",blocks:[e.jsxs(d,{children:["The condition doesn't have to be a comparison. ",e.jsx("code",{children:"if name:"})," asks “is name truthy?” — for text, “is it non-empty?”."]}),r.name]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: cinema ticket price",blocks:[e.jsx(d,{children:"Four categories, set inside the branches, printed once after the chain. Boundaries matter: a 5-year-old is a Child, a 60-year-old a Senior."}),r.ticket]}];return e.jsx(x,{...t,unitId:"Unit5_2",crumb:"MODULE 5 › UNIT 5.2",title:"if / elif / else",sections:a,quiz:b,next:{title:"Unit 5.3 — Combining Conditions",text:"and, or, not — plus 0 <= marks <= 100 in one line, and ifs inside ifs."}})}export{w as EXERCISES,T as default};
