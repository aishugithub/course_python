import{j as e,r as p}from"./index-CD7nmDt6.js";import{P as c,N as f,T as r,K as v,L as m,a as h}from"./Lesson-MmSVdMEX.js";const g={width:"100%",accentColor:r.navy};function b(n,s){if(!(n>=0&&n<=100&&s>=0&&s<=100))return["Invalid input"];const i=[`Result: ${n>=40?"Pass":"Fail"}`];return i.push(`Grade: ${n>=90?"A":n>=75?"B":n>=60?"C":n>=40?"D":"F"}`),n>=85&&s>=75?(i.push("Scholarship: Yes"),s>=90&&i.push("Honor Roll: Yes")):i.push("Scholarship: No"),i}function j(){const n=[["Read two numbers (average, attendance)","input + float/int","4.3"],["Pass or fail","comparison, if / else","5.1, 5.2"],["Letter grade A–F","if / elif / else chain","5.2"],["Scholarship: two conditions at once","and","5.3"],["Honor Roll: only asked for scholars","nested if","5.3"],["Reject impossible numbers","0 <= x <= 100, not","5.3"]];return e.jsx("div",{style:{border:`1px solid ${r.border}`,borderRadius:12,overflow:"hidden",maxWidth:900},children:n.map(([s,i,l],o)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1.4fr 70px",gap:10,padding:"10px 14px",background:o%2?r.surface:r.card,fontSize:14.5,alignItems:"center"},children:[e.jsx("span",{children:s}),e.jsx("code",{style:{justifySelf:"start"},children:i}),e.jsx("span",{style:{color:r.bronze,fontWeight:700},children:l})]},o))})}function y(){const[n,s]=p.useState(88),[i,l]=p.useState(92),o=b(n,i);return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("label",{style:{fontFamily:h},children:["average = ",e.jsx("strong",{children:n})]}),e.jsx("input",{type:"range",min:-5,max:105,value:n,onChange:d=>s(Number(d.target.value)),style:g}),e.jsxs("label",{style:{fontFamily:h},children:["attendance = ",e.jsx("strong",{children:i})]}),e.jsx("input",{type:"range",min:-5,max:105,value:i,onChange:d=>l(Number(d.target.value)),style:g}),e.jsx("div",{style:{fontSize:13.5,color:r.slate,marginTop:8},children:"Find inputs that give each possible output. Can you get Honor Roll without Grade A? (Yes — how?)"})]}),e.jsx("pre",{style:{margin:0,fontFamily:h,fontSize:15,lineHeight:1.7,background:r.termBg,color:r.termText,borderRadius:10,padding:"12px 14px",minHeight:140},children:o.join(`
`)})]})}const t=(n,s)=>`Average marks: ${n}
Attendance %: ${s}
`,u=`average = float(input("Average marks: "))
attendance = int(input("Attendance %: "))
if average >= 40:
    print("Result: Pass")
else:
    print("Result: Fail")
if average >= 90:
    grade = "A"
elif average >= 75:
    grade = "B"
elif average >= 60:
    grade = "C"
elif average >= 40:
    grade = "D"
else:
    grade = "F"
print(f"Grade: {grade}")`,x=u+`
if average >= 85 and attendance >= 75:
    print("Scholarship: Yes")
else:
    print("Scholarship: No")`,R=`average = float(input("Average marks: "))
attendance = int(input("Attendance %: "))
if not (0 <= average <= 100 and 0 <= attendance <= 100):
    print("Invalid input")
else:
    if average >= 40:
        print("Result: Pass")
    else:
        print("Result: Fail")
    if average >= 90:
        grade = "A"
    elif average >= 75:
        grade = "B"
    elif average >= 60:
        grade = "C"
    elif average >= 40:
        grade = "D"
    else:
        grade = "F"
    print(f"Grade: {grade}")
    if average >= 85 and attendance >= 75:
        print("Scholarship: Yes")
        if attendance >= 90:
            print("Honor Roll: Yes")
    else:
        print("Scholarship: No")`,a={v1:{id:"v1",kind:"write",title:"Version 1 — Pass and grade",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Average marks: "})," (decimal) and ",e.jsx("code",{children:"Attendance %: "})," (whole number). Print ",e.jsx("code",{children:"Result: Pass"})," (40 or more) or ",e.jsx("code",{children:"Result: Fail"}),", then the grade: ",e.jsx("code",{children:"A"})," ≥ 90, ",e.jsx("code",{children:"B"})," ≥ 75, ",e.jsx("code",{children:"C"})," ≥ 60, ",e.jsx("code",{children:"D"})," ≥ 40, else ",e.jsx("code",{children:"F"}),", as ",e.jsx("code",{children:"Grade: B"}),". Attendance isn't used yet — Version 2 needs it."]}),minLines:18,tests:[{inputs:["88","92"],expect:t(88,92)+`Result: Pass
Grade: B`},{inputs:["39.5","80"],expect:t(39.5,80)+`Result: Fail
Grade: F`,hidden:!0},{inputs:["40","50"],expect:t(40,50)+`Result: Pass
Grade: D`,hidden:!0},{inputs:["90","10"],expect:t(90,10)+`Result: Pass
Grade: A`,hidden:!0},{inputs:["60","60"],expect:t(60,60)+`Result: Pass
Grade: C`,hidden:!0}],requires:[{text:"elif",min:3,msg:"Five grades → if, three elifs, else."}],hints:["Two separate decisions: first pass/fail (if/else), then the grade (a chain).","Store the grade in a variable inside the chain and print it once afterwards with an f-string."],solution:u},v2:{id:"v2",kind:"modify",title:"Version 2 — Add the scholarship",task:e.jsxs(e.Fragment,{children:["Your Version 1 is loaded below. Add one more decision at the end: a scholarship needs an average of ",e.jsx("strong",{children:"85 or more and"})," attendance of ",e.jsx("strong",{children:"75 or more"}),". Print ",e.jsx("code",{children:"Scholarship: Yes"})," or ",e.jsx("code",{children:"Scholarship: No"}),"."]}),starter:u,minLines:22,tests:[{inputs:["88","92"],expect:t(88,92)+`Result: Pass
Grade: B
Scholarship: Yes`},{inputs:["88","70"],expect:t(88,70)+`Result: Pass
Grade: B
Scholarship: No`,hidden:!0},{inputs:["85","75"],expect:t(85,75)+`Result: Pass
Grade: B
Scholarship: Yes`,hidden:!0},{inputs:["84.9","99"],expect:t(84.9,99)+`Result: Pass
Grade: B
Scholarship: No`,hidden:!0}],requires:[{text:" and ",msg:"Both conditions in one if with and."}],hints:["Add the new if/else at the very end, at the left edge.","if average >= 85 and attendance >= 75:"],solution:x},v3:{id:"v3",kind:"modify",title:"Version 3 — Honor Roll and bad input",task:e.jsxs(e.Fragment,{children:["Two upgrades. (1) A scholarship winner with attendance of ",e.jsx("strong",{children:"90 or more"})," also gets ",e.jsx("code",{children:"Honor Roll: Yes"}),", printed right after ",e.jsx("code",{children:"Scholarship: Yes"})," — a nested if, asked only for scholars. (2) If the average or the attendance is outside 0–100, print only ",e.jsx("code",{children:"Invalid input"}),". Hint: wrap the whole report in an else, and indent it one level."]}),starter:x,minLines:28,tests:[{inputs:["95","92"],expect:t(95,92)+`Result: Pass
Grade: A
Scholarship: Yes
Honor Roll: Yes`},{inputs:["88","80"],expect:t(88,80)+`Result: Pass
Grade: B
Scholarship: Yes`,hidden:!0},{inputs:["101","90"],expect:t(101,90)+"Invalid input",hidden:!0},{inputs:["50","-5"],expect:t(50,-5)+"Invalid input",hidden:!0},{inputs:["60","95"],expect:t(60,95)+`Result: Pass
Grade: C
Scholarship: No`,hidden:!0}],requires:[{node:"If",min:5}],hints:["Select every report line and press Tab to indent them all at once.",'if not (0 <= average <= 100 and 0 <= attendance <= 100): print("Invalid input"), else: … the whole report …','Inside the scholarship branch, add: if attendance >= 90: print("Honor Roll: Yes")'],solution:R},ebill:{id:"ebill",kind:"make",title:"Electricity bill (slab rates)",task:e.jsxs(e.Fragment,{children:["A favourite exam problem. Ask ",e.jsx("code",{children:"Units used: "}),". The first 100 units cost ",e.jsx("strong",{children:"Rs 1.50"})," each; units 101–200 cost ",e.jsx("strong",{children:"Rs 2.50"})," each; every unit above 200 costs ",e.jsx("strong",{children:"Rs 4.00"}),". Add a fixed charge of ",e.jsx("strong",{children:"Rs 50"}),". Print ",e.jsx("code",{children:"Bill: Rs 325.00"})," (2 decimals). 150 units → 100 × 1.50 + 50 × 2.50 + 50 = 325.00."]}),minLines:12,tests:[{inputs:["150"],expect:`Units used: 150
Bill: Rs 325.00`},{inputs:["80"],expect:`Units used: 80
Bill: Rs 170.00`,hidden:!0},{inputs:["100"],expect:`Units used: 100
Bill: Rs 200.00`,hidden:!0},{inputs:["200"],expect:`Units used: 200
Bill: Rs 450.00`,hidden:!0},{inputs:["250"],expect:`Units used: 250
Bill: Rs 650.00`,hidden:!0},{inputs:["0"],expect:`Units used: 0
Bill: Rs 50.00`,hidden:!0}],requires:[{node:"If"}],hints:["Work out the energy charge in three cases: up to 100, up to 200, above 200.","Up to 200: 100 * 1.5 + (units - 100) * 2.5","Above 200: 100 * 1.5 + 100 * 2.5 + (units - 200) * 4"],solution:`units = int(input("Units used: "))
if units <= 100:
    charge = units * 1.5
elif units <= 200:
    charge = 100 * 1.5 + (units - 100) * 2.5
else:
    charge = 100 * 1.5 + 100 * 2.5 + (units - 200) * 4
bill = charge + 50
print(f"Bill: Rs {bill:.2f}")`}},S=a,k=[{q:"In Version 3, when is “Honor Roll” even checked?",options:["Always","Only when the scholarship condition was True","Only for grade A","Only when input is invalid"],answer:1,explain:"It's nested inside the scholarship branch, so Python never reaches it otherwise."},{q:"average = 92, attendance = 70. What prints after the grade?",options:["Scholarship: Yes","Scholarship: No","Honor Roll: Yes","Invalid input"],answer:1,explain:"and needs both: 92 ≥ 85 is True but 70 ≥ 75 is False."},{q:"Which condition catches bad input?",options:["average > 0 or average < 100","not (0 <= average <= 100)","average != 100","0 < average or average < 100"],answer:1,explain:"A valid mark is 0 <= average <= 100; not flips it to catch everything else."},{q:"For the electricity bill, what is the energy charge for 200 units?",options:["Rs 400.00","Rs 300.00","Rs 500.00","Rs 800.00"],answer:0,explain:"100 × 1.50 + 100 × 2.50 = 150 + 250 = 400 (plus Rs 50 fixed = 450)."},{q:"Why does the grade chain start with average >= 90?",options:["Alphabetical order","Only the first True branch runs, so the strictest test must come first","It's faster","No reason"],answer:1,explain:"Starting with >= 40 would give a 95 the grade D."}];function P(n){const s=[{label:"The Mission",kicker:"CAPSTONE",title:"Exam Result Analyzer",blocks:[e.jsxs(c,{children:["A college works out four decisions about every student from just two numbers: ",e.jsx("strong",{children:"average marks"})," and ",e.jsx("strong",{children:"attendance %"}),". You'll build it in three versions, adding one idea each time — the way real programs are written. Here is every tool you need, and where you learnt it:"]}),e.jsx(j,{}),e.jsx(f,{color:r.blue,icon:"🧱",children:"Each version starts from your previous one. Get Version 1 working before you add anything."})]},{label:"Version 1",kicker:"BUILD IN STEPS",title:"Version 1: pass/fail and the grade",blocks:[a.v1]},{label:"Version 2",kicker:"ADD ONE IDEA",title:"Version 2: two conditions at once",blocks:[a.v2]},{label:"Version 3",kicker:"ADD ONE MORE",title:"Version 3: a nested decision, and bad input",blocks:[a.v3,e.jsxs(v,{children:["Checking for impossible input ",e.jsx("em",{children:"first"})," and only then doing the real work is called ",e.jsx("strong",{children:"validation"}),". Every program that reads input should do it."]})]},{label:"Play It",kicker:"EXPLORE",title:"The finished analyzer",blocks:[e.jsx(c,{children:"This is your Version 3, live. Try the boundaries: 85 and 75, 90 attendance, 101."}),e.jsx(y,{})]},{label:"Make It",kicker:"ON YOUR OWN",title:"Your program: the electricity bill",blocks:[e.jsx(c,{children:"No versions this time: a blank editor and a slab-rate rule, exactly as it appears in exams."}),a.ebill]}];return e.jsx(m,{...n,unitId:"Unit5_4",crumb:"MODULE 5 › UNIT 5.4",title:"Capstone: Decision Maker",sections:s,quiz:k,next:{title:"Module 6 — Repetition",text:"Module 5 complete! Next: loops — make the computer do it a thousand times while you say it once. (Optional first: Module 5's Crucible.)"}})}export{S as EXERCISES,P as default};
