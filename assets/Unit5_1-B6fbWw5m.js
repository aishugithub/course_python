import{j as e,r as p}from"./index-CD7nmDt6.js";import{P as d,K as x,N as b,L as j,a as c,T as s,t as v}from"./Lesson-MmSVdMEX.js";const f={width:90,padding:"8px 10px",borderRadius:8,border:`1.5px solid ${s.borderStrong}`,background:s.card,fontFamily:c,fontSize:15,color:s.text},m=(t,n=s.navy)=>({padding:"8px 14px",borderRadius:8,border:`1.5px solid ${t?n:s.border}`,background:t?n:s.card,color:t?"#fff":s.text,fontWeight:700,cursor:"pointer",fontFamily:c,fontSize:15}),k=[{s:"==",n:"equal to",f:(t,n)=>t===n},{s:"!=",n:"not equal to",f:(t,n)=>t!==n},{s:"<",n:"less than",f:(t,n)=>t<n},{s:">",n:"greater than",f:(t,n)=>t>n},{s:"<=",n:"less than or equal to",f:(t,n)=>t<=n},{s:">=",n:"greater than or equal to",f:(t,n)=>t>=n}];function w(){const[t,n]=p.useState(40),[o,l]=p.useState(40),[i,h]=p.useState(">="),y=k.find(r=>r.s===i),u=y.f(t,o),g=r=>r===""?0:Number(r);return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:10},children:[e.jsxs("label",{style:{fontFamily:c},children:["marks = ",e.jsx("input",{type:"number",value:t,onChange:r=>n(g(r.target.value)),style:f})]}),e.jsxs("label",{style:{fontFamily:c},children:["pass_mark = ",e.jsx("input",{type:"number",value:o,onChange:r=>l(g(r.target.value)),style:f})]})]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:k.map(r=>e.jsx("button",{onClick:()=>h(r.s),style:m(i===r.s),children:r.s},r.s))}),e.jsx("div",{style:{fontSize:13,color:s.muted,marginTop:8},children:"Set both to 40 and compare > with >=."})]}),e.jsxs("div",{style:{background:s.card,border:`1.5px solid ${v(u?s.green:s.red,"66")}`,borderRadius:12,padding:16},children:[e.jsxs("div",{style:{fontFamily:c,fontSize:15,color:s.muted},children:[">>> marks ",i," pass_mark"]}),e.jsx("div",{style:{fontFamily:c,fontSize:26,fontWeight:700,color:u?s.green:s.red,margin:"4px 0"},children:u?"True":"False"}),e.jsxs("div",{style:{color:s.slate,fontSize:14.5},children:["Is ",t," ",e.jsx("strong",{children:y.n})," ",o,"? The answer is a value of type ",e.jsx("code",{children:"bool"}),"."]})]})]})}const T=[{v:"0",f:!0,why:"Zero is the only falsy number (0 or 0.0)."},{v:"-5",f:!1,why:"Any non-zero number is truthy — negatives too."},{v:"0.0",f:!0,why:"Zero as a float is still zero: falsy."},{v:'""',f:!0,why:"The EMPTY string is the only falsy string."},{v:'"0"',f:!1,why:"Not empty — it has one character. Truthy, even though it looks like 0."},{v:'" "',f:!1,why:"A single space is a character, so the string isn't empty: truthy."},{v:'"False"',f:!1,why:"Five characters of text. Only the real value False is falsy."},{v:"None",f:!0,why:"None means “no value at all” (Python's version of C's NULL). Always falsy."},{v:"False",f:!0,why:"False itself, of course."}];function F(){const[t,n]=p.useState({});return e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:8},children:T.map((o,l)=>{const i=t[l],h=i!==void 0&&i===o.f;return e.jsxs("div",{style:{background:s.card,border:`1.5px solid ${i===void 0?s.border:h?s.green:s.red}`,borderRadius:10,padding:"10px 12px"},children:[e.jsxs("code",{style:{fontSize:15},children:["bool(",o.v,")"]}),i===void 0?e.jsxs("div",{style:{display:"flex",gap:6,marginTop:8},children:[e.jsx("button",{onClick:()=>n({...t,[l]:!1}),style:{...m(!1),fontSize:13,padding:"5px 10px"},children:"True"}),e.jsx("button",{onClick:()=>n({...t,[l]:!0}),style:{...m(!1),fontSize:13,padding:"5px 10px"},children:"False"})]}):e.jsxs("div",{style:{fontSize:13.5,marginTop:6,color:h?s.green:s.red},children:["→ ",e.jsx("strong",{children:o.f?"False":"True"})," ",h?"✓":"✗"," ",e.jsx("span",{style:{color:s.slate},children:o.why})]})]},l)})})}const a={compare:{id:"compare",kind:"type",title:"Six questions with yes/no answers",task:e.jsx(e.Fragment,{children:"Predict each line, then type and run."}),show:`marks = 72
print(marks >= 40)
print(marks == 100)
print(marks != 0)
print(marks < 50)
print(type(marks > 50))`,tests:[{expect:`True
False
True
False
<class 'bool'>`}],hints:["Each comparison is a question; Python answers True or False."],solution:`marks = 72
print(marks >= 40)
print(marks == 100)
print(marks != 0)
print(marks < 50)
print(type(marks > 50))`},pass:{id:"pass",kind:"write",title:"Did I pass?",task:e.jsxs(e.Fragment,{children:["The pass mark is 40 — and exactly 40 passes. Ask ",e.jsx("code",{children:"Mark: "})," and print ",e.jsx("code",{children:"Passed: True"})," or ",e.jsx("code",{children:"Passed: False"})," by putting a comparison inside the print."]}),tests:[{inputs:["72"],expect:`Mark: 72
Passed: True`},{inputs:["39"],expect:`Mark: 39
Passed: False`,hidden:!0},{inputs:["40"],expect:`Mark: 40
Passed: True`,hidden:!0}],requires:[{node:"Compare",msg:"Use a comparison like mark >= 40."}],hints:["print can show the result of a comparison directly.","Does 40 pass? Then > isn't enough — you need >=.",'print("Passed:", mark >= 40)'],solution:`mark = int(input("Mark: "))
print("Passed:", mark >= 40)`},vote:{id:"vote",kind:"fix",title:"= is not ==",task:e.jsx(e.Fragment,{children:"This should say whether someone can vote (age 18 or more). It runs without an error — run it with the test input and look at what it prints. Fix line 2."}),starter:`age = int(input("Age: "))
can_vote = age = 18
print("Can vote:", can_vote)`,tests:[{inputs:["20"],expect:`Age: 20
Can vote: True`},{inputs:["16"],expect:`Age: 16
Can vote: False`,hidden:!0},{inputs:["18"],expect:`Age: 18
Can vote: True`,hidden:!0}],hints:["One = means “store”. So age = 18 stores 18 in age — it doesn't ask anything.","You want: is age at least 18? → age >= 18"],solution:`age = int(input("Age: "))
can_vote = age >= 18
print("Can vote:", can_vote)`},text:{id:"text",kind:"type",title:"Comparing text",task:e.jsx(e.Fragment,{children:"Text is compared character by character, using each character's code. Capitals come before small letters, and digits before both. Predict, then run — the last line connects straight back to input() in Unit 4.3."}),show:`print("cat" == "cat")
print("Cat" == "cat")
print("apple" < "banana")
print("Zebra" < "apple")
print("10" < "9")`,tests:[{expect:`True
False
True
True
True`}],hints:['"10" < "9" compares the first characters: "1" comes before "9".'],solution:`print("cat" == "cat")
print("Cat" == "cat")
print("apple" < "banana")
print("Zebra" < "apple")
print("10" < "9")`},password:{id:"password",kind:"write",title:"Password check",task:e.jsxs(e.Fragment,{children:["Store the correct password ",e.jsx("code",{children:'"python123"'})," in a variable. Ask ",e.jsx("code",{children:"Password: "})," and print ",e.jsx("code",{children:"Correct: True"})," or ",e.jsx("code",{children:"Correct: False"}),". Capitals matter."]}),tests:[{inputs:["python123"],expect:`Password: python123
Correct: True`},{inputs:["Python123"],expect:`Password: Python123
Correct: False`,hidden:!0},{inputs:["python"],expect:`Password: python
Correct: False`,hidden:!0}],requires:[{node:"Compare",msg:"Compare what was typed with the stored password using ==."}],hints:['secret = "python123"','print("Correct:", typed == secret)'],solution:`secret = "python123"
typed = input("Password: ")
print("Correct:", typed == secret)`},truthy:{id:"truthy",kind:"type",title:"bool() on any value",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"bool( )"})," converts any value to True or False — the same test Python uses when you put a value after ",e.jsx("code",{children:"if"})," in the next unit."]}),show:`print(bool(0))
print(bool(-5))
print(bool(""))
print(bool("0"))
print(bool(" "))
print(bool(None))`,tests:[{expect:`False
True
False
True
True
False`}],hints:["Only zero, empty text, None and False are falsy."],solution:`print(bool(0))
print(bool(-5))
print(bool(""))
print(bool("0"))
print(bool(" "))
print(bool(None))`},floaty:{id:"floaty",kind:"fix",title:"When 0.1 + 0.2 isn't 0.3",task:e.jsxs(e.Fragment,{children:["Run it. Computers store most decimals as tiny approximations, so ",e.jsx("code",{children:"0.1 + 0.2"})," is really ",e.jsx("code",{children:"0.30000000000000004"}),". Make the comparison print ",e.jsx("code",{children:"True"})," by comparing ",e.jsx("strong",{children:"rounded"})," values — the safe way to compare floats."]}),starter:`total = 0.1 + 0.2
print(total)
print("Equal to 0.3?", total == 0.3)`,tests:[{expect:`0.30000000000000004
Equal to 0.3? True`}],requires:[{call:"round",msg:"Compare round(total, 2) with 0.3."}],hints:["Keep line 2 as it is — it shows the real stored value.",'print("Equal to 0.3?", round(total, 2) == 0.3)'],solution:`total = 0.1 + 0.2
print(total)
print("Equal to 0.3?", round(total, 2) == 0.3)`},report:{id:"report",kind:"make",title:"Eligibility report",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Age: "})," (whole number), ",e.jsx("code",{children:"Marks: "})," (decimal) and ",e.jsx("code",{children:"Attendance: "})," (whole-number %). Print three lines with f-strings: adult if age is at least 18, passed if marks are at least 40, attendance OK if it is at least 75."]}),minLines:8,tests:[{inputs:["19","56.5","72"],expect:`Age: 19
Marks: 56.5
Attendance: 72
Adult: True
Passed: True
Attendance OK: False`},{inputs:["17","40","75"],expect:`Age: 17
Marks: 40
Attendance: 75
Adult: False
Passed: True
Attendance OK: True`,hidden:!0},{inputs:["18","39.5","90"],expect:`Age: 18
Marks: 39.5
Attendance: 90
Adult: True
Passed: False
Attendance OK: True`,hidden:!0}],requires:[{node:"Compare",min:3,msg:"Three comparisons, one per line."},{node:"JoinedStr",min:1,msg:"Use f-strings (Unit 4.5)."}],hints:['print(f"Adult: {age >= 18}")',"Exactly 40 marks and exactly 75% attendance both count — >= not >."],solution:`age = int(input("Age: "))
marks = float(input("Marks: "))
attendance = int(input("Attendance: "))
print(f"Adult: {age >= 18}")
print(f"Passed: {marks >= 40}")
print(f"Attendance OK: {attendance >= 75}")`}},P=a,C=[{q:"What does 7 >= 7 give?",options:["True","False","7","Error"],answer:0,explain:">= means greater than OR equal. 7 is equal to 7."},{q:"What is the difference between = and ==?",options:["None","= stores a value; == asks whether two values are equal","== stores; = compares","= is for numbers, == for text"],answer:1,explain:"x = 5 stores 5 in x. x == 5 asks “is x equal to 5?” and gives True or False."},{q:'What does "10" < "9" give?',options:["False — 10 is bigger",'True — text is compared character by character, and "1" comes before "9"',"Error","None"],answer:1,explain:"As text, the first characters decide. Convert with int() first if you want numeric comparison — another reason to convert input()."},{q:"Which value is truthy?",options:["0",'""','"0"',"None"],answer:2,explain:`"0" is a non-empty string, so it's truthy. 0, "" and None are all falsy.`},{q:"What does 0.1 + 0.2 == 0.3 give?",options:["True","False","Error","0.3"],answer:1,explain:"0.1 + 0.2 is stored as 0.30000000000000004. Compare floats with round() (or abs(a - b) < a tiny number), never with == directly."},{q:"What is type(3 > 2)?",options:["<class 'int'>","<class 'bool'>","<class 'str'>","<class 'True'>"],answer:1,explain:"Every comparison produces a bool: True or False."}];function S(t){const n=[{label:"Comparisons",kicker:"THE NEED",title:"Questions with yes/no answers",blocks:[e.jsxs(d,{children:["Every decision a program makes starts with a question: ",e.jsx("em",{children:"Did the student pass? Is the user old enough? Is the password right?"})," Python asks these with ",e.jsx("strong",{children:"comparison operators"}),", and the answer is always ",e.jsx("code",{children:"True"})," or ",e.jsx("code",{children:"False"})," — values of the type ",e.jsx("code",{children:"bool"}),"."]}),e.jsx(w,{}),a.compare,a.pass,e.jsxs(x,{children:["Six comparisons: ",e.jsx("code",{children:"== != < > <= >="}),". Each answers with a ",e.jsx("code",{children:"bool"}),". Watch the boundary: “40 and above” is ",e.jsx("code",{children:">= 40"}),", not ",e.jsx("code",{children:"> 40"}),"."]})]},{label:"= vs ==",kicker:"THE CLASSIC MIX-UP",title:"Storing is not asking",blocks:[e.jsxs(d,{children:[e.jsx("code",{children:"="})," ",e.jsx("strong",{children:"stores"})," a value (the name-tag move from Unit 4.2). ",e.jsx("code",{children:"=="})," ",e.jsx("strong",{children:"asks"})," whether two values are equal. Mixing them up is one of the most common beginner bugs — and sometimes Python doesn't even complain."]}),a.vote]},{label:"Comparing Text",kicker:"STRINGS",title:"== and < work on text too",blocks:[e.jsxs(d,{children:["Text equality is exact: one different capital makes it unequal. ",e.jsx("code",{children:"<"})," and ",e.jsx("code",{children:">"})," compare text like a dictionary does — mostly. The surprises are worth seeing once:"]}),a.text,a.password,e.jsxs(b,{icon:"⚠️",children:["Because ",e.jsx("code",{children:"input()"})," gives text, ",e.jsx("code",{children:'input() < "9"'})," compares characters, not numbers. Convert first, as in Unit 4.3."]})]},{label:"Truthy & Falsy",kicker:"EVERY VALUE HAS A TRUTH VALUE",title:"Truthy and falsy",blocks:[e.jsxs(d,{children:["Python can treat ",e.jsx("em",{children:"any"})," value as True or False. The rule: ",e.jsxs("strong",{children:["zero, empty text, ",e.jsx("code",{children:"None"})," and ",e.jsx("code",{children:"False"})," are falsy"]}),"; everything else is truthy. Guess each one:"]}),e.jsx(F,{}),a.truthy,e.jsxs(x,{children:[e.jsx("code",{children:"None"})," is a special value meaning “nothing here”. It's falsy, it isn't 0, and it isn't ",e.jsx("code",{children:'""'}),". You'll meet it again when functions return nothing (Module 8)."]})]},{label:"Float Trap",kicker:"DON'T == DECIMALS",title:"Comparing decimal numbers safely",blocks:[e.jsxs(d,{children:["Most decimals can't be stored exactly in binary, just as 1/3 can't be written exactly in decimal. Tiny errors appear, and ",e.jsx("code",{children:"=="})," notices them."]}),a.floaty,e.jsxs(x,{children:["Never use ",e.jsx("code",{children:"=="})," on results of float arithmetic. Compare rounded values, or check that the difference is tiny: ",e.jsx("code",{children:"abs(a - b) < 0.000001"}),"."]})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: eligibility report",blocks:[e.jsxs(d,{children:["Three inputs, three comparisons, f-strings. In the next unit, the same comparisons will make your program ",e.jsx("em",{children:"choose"})," what to do."]}),a.report]}];return e.jsx(j,{...t,unitId:"Unit5_1",crumb:"MODULE 5 › UNIT 5.1",title:"Comparisons & Booleans",sections:n,quiz:C,next:{title:"Unit 5.2 — if / elif / else",text:"Your True/False answers start steering the program: one question, many paths."}})}export{P as EXERCISES,S as default};
