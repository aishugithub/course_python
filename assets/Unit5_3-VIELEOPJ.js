import{j as e,r as p}from"./index-B7nVsXSH.js";import{P as u,K as b,N as S,T as n,L as w,a as h,t as x}from"./Lesson-TE-z-zj8.js";const k={margin:0,fontFamily:h,fontSize:14.5,lineHeight:1.7,background:n.codeBg,border:`1px solid ${n.border}`,borderRadius:10,padding:"12px 14px",whiteSpace:"pre-wrap"},g={width:"100%",accentColor:n.navy},m=t=>({flex:1,textAlign:"center",padding:"8px 10px",borderRadius:8,fontFamily:h,fontWeight:700,background:x(t?n.green:n.red,"14"),border:`1.5px solid ${t?n.green:n.red}`,color:t?n.green:n.red});function T(){const[t,l]=p.useState(23),[i,y]=p.useState(2e4),s=t>=21,r=i>=25e3;return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("label",{style:{fontFamily:h},children:["age = ",e.jsx("strong",{children:t})]}),e.jsx("input",{type:"range",min:15,max:70,value:t,onChange:o=>l(Number(o.target.value)),style:g}),e.jsxs("label",{style:{fontFamily:h},children:["income = ",e.jsx("strong",{children:i})]}),e.jsx("input",{type:"range",min:0,max:6e4,step:1e3,value:i,onChange:o=>y(Number(o.target.value)),style:g})]}),e.jsxs("div",{children:[e.jsx("pre",{style:k,children:`if age >= 21 and income >= 25000:
    print("Approved")
else:
    print("Rejected")`}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",marginTop:8},children:[e.jsxs("div",{style:m(s),children:["age >= 21",e.jsx("br",{}),s?"True":"False"]}),e.jsx("strong",{style:{fontFamily:h},children:"and"}),e.jsxs("div",{style:m(r),children:["income >= 25000",e.jsx("br",{}),r?"True":"False"]}),e.jsx("strong",{children:"→"}),e.jsx("div",{style:m(s&&r),children:s&&r?"Approved":"Rejected"})]})]})]})}function v(){const[t,l]=p.useState(!0),[i,y]=p.useState(!1),s=(o,a,c)=>e.jsxs("button",{onClick:()=>a(!o),style:{...m(o),cursor:"pointer",flex:"0 0 auto",minWidth:120},children:[c," = ",o?"True":"False"]}),r=[["p and q",t&&i,"True only when BOTH are True"],["p or q",t||i,"True when AT LEAST ONE is True"],["not p",!t,"Flips True ↔ False"]];return e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:10},children:[s(t,l,"p"),s(i,y,"q")]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:8},children:r.map(([o,a,c])=>e.jsxs("div",{style:{background:n.card,border:`1.5px solid ${x(a?n.green:n.red,"66")}`,borderRadius:10,padding:12},children:[e.jsx("code",{style:{fontSize:15},children:o})," → ",e.jsx("strong",{style:{color:a?n.green:n.red,fontFamily:h},children:a?"True":"False"}),e.jsx("div",{style:{fontSize:13.5,color:n.slate,marginTop:4},children:c})]},o))})]})}function F(){const[t,l]=p.useState("Monday");return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8},children:["Monday","Saturday","Sunday"].map(i=>e.jsx("button",{onClick:()=>l(i),style:{padding:"7px 12px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",fontWeight:700,border:`1.5px solid ${t===i?n.navy:n.border}`,background:t===i?n.navy:n.card,color:t===i?"#fff":n.text},children:i},i))}),e.jsx("pre",{style:k,children:`if day == "Saturday" or "Sunday":
    print("Weekend!")`})]}),e.jsxs("div",{style:{background:x(n.red,"0E"),border:`1px solid ${x(n.red,"44")}`,borderRadius:10,padding:12,fontSize:14.5,color:n.slate,lineHeight:1.65},children:["Prints ",e.jsx("strong",{style:{color:n.red},children:"Weekend!"})," — even for ",t,". Python reads it as",e.jsx("code",{children:'(day == "Saturday") or ("Sunday")'}),". The right side is just the text ",e.jsx("code",{children:'"Sunday"'}),", which is non-empty, so truthy (Unit 5.1). ",e.jsx("strong",{children:"Each side of or must be a full comparison"}),": ",e.jsx("code",{children:'day == "Saturday" or day == "Sunday"'}),"."]})]})}function A(){const[t,l]=p.useState(82),[i,y]=p.useState(18),s=t>=75,r=i>=20,o=s?r?"Hall ticket issued":"Eligible - meet your mentor about internals":r?"Attendance shortage - apply for condonation":"Not eligible - repeat the course",a=(c,j,f)=>e.jsx("div",{style:{background:f?x(n.green,"22"):"transparent",color:f?n.green:c?n.text:n.muted,fontWeight:f?700:400,borderRadius:4},children:j});return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("label",{style:{fontFamily:h},children:["attendance = ",e.jsx("strong",{children:t}),"%  (need 75)"]}),e.jsx("input",{type:"range",min:40,max:100,value:t,onChange:c=>l(Number(c.target.value)),style:g}),e.jsxs("label",{style:{fontFamily:h},children:["internal = ",e.jsx("strong",{children:i})," / 40  (need 20)"]}),e.jsx("input",{type:"range",min:0,max:40,value:i,onChange:c=>y(Number(c.target.value)),style:g}),e.jsxs("div",{style:{marginTop:10,fontFamily:h,fontWeight:700,color:n.green},children:["> ",o]})]}),e.jsxs("div",{style:{...k,whiteSpace:"pre"},children:[a(!0,"if attendance >= 75:",!1),a(s,"    if internal >= 20:",!1),a(s,'        print("Hall ticket issued")',s&&r),a(s,"    else:",!1),a(s,'        print("Eligible - meet your mentor ...")',s&&!r),a(!0,"else:",!1),a(!s,"    if internal >= 20:",!1),a(!s,'        print("Attendance shortage - ...")',!s&&r),a(!s,"    else:",!1),a(!s,'        print("Not eligible - ...")',!s&&!r)]})]})}const d={loan:{id:"loan",kind:"write",title:"Loan check with and",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Age: "})," and ",e.jsx("code",{children:"Income: "})," (whole numbers). Print ",e.jsx("code",{children:"Approved"})," if the age is at least 21 ",e.jsx("strong",{children:"and"})," the income is at least 25000; otherwise ",e.jsx("code",{children:"Rejected"}),"."]}),tests:[{inputs:["30","40000"],expect:`Age: 30
Income: 40000
Approved`},{inputs:["20","90000"],expect:`Age: 20
Income: 90000
Rejected`,hidden:!0},{inputs:["45","24999"],expect:`Age: 45
Income: 24999
Rejected`,hidden:!0},{inputs:["21","25000"],expect:`Age: 21
Income: 25000
Approved`,hidden:!0}],requires:[{node:"BoolOp",msg:"Combine both conditions in one if with and."}],hints:["if age >= 21 and income >= 25000:"],solution:`age = int(input("Age: "))
income = int(input("Income: "))
if age >= 21 and income >= 25000:
    print("Approved")
else:
    print("Rejected")`},weekend:{id:"weekend",kind:"write",title:"Weekend or weekday (or)",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Day: "}),". Print ",e.jsx("code",{children:"Weekend"})," if it is ",e.jsx("code",{children:"Saturday"})," or ",e.jsx("code",{children:"Sunday"}),", otherwise ",e.jsx("code",{children:"Weekday"}),"."]}),tests:[{inputs:["Sunday"],expect:`Day: Sunday
Weekend`},{inputs:["Saturday"],expect:`Day: Saturday
Weekend`,hidden:!0},{inputs:["Monday"],expect:`Day: Monday
Weekday`,hidden:!0}],requires:[{text:" or ",msg:"Use or."}],hints:['Each side of or must be a complete comparison: day == "Saturday" or day == "Sunday"'],solution:`day = input("Day: ")
if day == "Saturday" or day == "Sunday":
    print("Weekend")
else:
    print("Weekday")`},orbug:{id:"orbug",kind:"fix",title:"Every day is a holiday?",task:e.jsx(e.Fragment,{children:"Exams are on weekdays, holidays are Saturday and Sunday. Run it with the test input — a Monday — and fix the condition."}),starter:`day = input("Day: ")
if day == "Saturday" or "Sunday":
    print("Holiday!")
else:
    print("Exam day")`,tests:[{inputs:["Monday"],expect:`Day: Monday
Exam day`},{inputs:["Sunday"],expect:`Day: Sunday
Holiday!`,hidden:!0},{inputs:["Saturday"],expect:`Day: Saturday
Holiday!`,hidden:!0}],hints:['"Sunday" on its own is non-empty text — always truthy.','day == "Saturday" or day == "Sunday"'],solution:`day = input("Day: ")
if day == "Saturday" or day == "Sunday":
    print("Holiday!")
else:
    print("Exam day")`},fees:{id:"fees",kind:"write",title:"not",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Fees paid (yes/no): "})," and store ",e.jsx("code",{children:'paid = answer == "yes"'})," — a bool. Then use ",e.jsx("code",{children:"if not paid:"})," to print ",e.jsx("code",{children:"Pay your fees first"}),"; otherwise print ",e.jsx("code",{children:"Hall ticket ready"}),"."]}),tests:[{inputs:["no"],expect:`Fees paid (yes/no): no
Pay your fees first`},{inputs:["yes"],expect:`Fees paid (yes/no): yes
Hall ticket ready`,hidden:!0}],requires:[{text:"not ",msg:"Use if not paid:"}],hints:['answer = input("Fees paid (yes/no): ")','paid = answer == "yes"   # True or False'],solution:`answer = input("Fees paid (yes/no): ")
paid = answer == "yes"
if not paid:
    print("Pay your fees first")
else:
    print("Hall ticket ready")`},range:{id:"range",kind:"write",title:"Is it a valid mark?",task:e.jsxs(e.Fragment,{children:["A mark must be between 0 and 100, both included. Ask ",e.jsx("code",{children:"Mark: "})," and print ",e.jsx("code",{children:"Valid"})," or ",e.jsx("code",{children:"Invalid mark"}),". Python lets you write a range the maths way: ",e.jsx("code",{children:"0 <= mark <= 100"}),"."]}),tests:[{inputs:["67"],expect:`Mark: 67
Valid`},{inputs:["101"],expect:`Mark: 101
Invalid mark`,hidden:!0},{inputs:["-1"],expect:`Mark: -1
Invalid mark`,hidden:!0},{inputs:["0"],expect:`Mark: 0
Valid`,hidden:!0},{inputs:["100"],expect:`Mark: 100
Valid`,hidden:!0}],requires:[{node:"If"}],hints:["if 0 <= mark <= 100: — or the long way: mark >= 0 and mark <= 100"],solution:`mark = int(input("Mark: "))
if 0 <= mark <= 100:
    print("Valid")
else:
    print("Invalid mark")`},oneline:{id:"oneline",kind:"complete",title:"Choose a value in one line",task:e.jsxs(e.Fragment,{children:["When an if / else only picks between two values, Python has a one-line form: ",e.jsx("code",{children:"value_if_true if condition else value_if_false"}),". Fill the blanks."]}),starter:`marks = int(input("Marks: "))
result = ___ if marks >= 40 else ___
print(f"Result: {result}")`,tests:[{inputs:["55"],expect:`Marks: 55
Result: Pass`},{inputs:["12"],expect:`Marks: 12
Result: Fail`,hidden:!0}],requires:[{node:"IfExp",msg:'Use the one-line form: "Pass" if marks >= 40 else "Fail"'}],hints:['result = "Pass" if marks >= 40 else "Fail"'],solution:`marks = int(input("Marks: "))
result = "Pass" if marks >= 40 else "Fail"
print(f"Result: {result}")`},hall:{id:"hall",kind:"write",title:"Hall-ticket rule (nested if)",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Attendance: "})," and ",e.jsx("code",{children:"Internal: "}),". Write the nested rule from the widget, printing exactly one of: ",e.jsx("code",{children:"Hall ticket issued"})," · ",e.jsx("code",{children:"Eligible - meet your mentor about internals"})," · ",e.jsx("code",{children:"Attendance shortage - apply for condonation"})," · ",e.jsx("code",{children:"Not eligible - repeat the course"}),"."]}),minLines:12,tests:[{inputs:["82","25"],expect:`Attendance: 82
Internal: 25
Hall ticket issued`},{inputs:["90","12"],expect:`Attendance: 90
Internal: 12
Eligible - meet your mentor about internals`,hidden:!0},{inputs:["70","30"],expect:`Attendance: 70
Internal: 30
Attendance shortage - apply for condonation`,hidden:!0},{inputs:["60","10"],expect:`Attendance: 60
Internal: 10
Not eligible - repeat the course`,hidden:!0},{inputs:["75","20"],expect:`Attendance: 75
Internal: 20
Hall ticket issued`,hidden:!0}],requires:[{node:"If",min:3,msg:"One outer if, and an inner if inside each branch."}],hints:["The inner if/else is indented 4 more spaces than the outer one.","Outer: attendance >= 75. Inner (on both sides): internal >= 20."],solution:`attendance = int(input("Attendance: "))
internal = int(input("Internal: "))
if attendance >= 75:
    if internal >= 20:
        print("Hall ticket issued")
    else:
        print("Eligible - meet your mentor about internals")
else:
    if internal >= 20:
        print("Attendance shortage - apply for condonation")
    else:
        print("Not eligible - repeat the course")`},safe:{id:"safe",kind:"fix",title:"Order saves you from a crash",task:e.jsxs(e.Fragment,{children:["The average is only meaningful when at least one test was taken. With 0 tests this crashes. Run it, then fix it by ",e.jsx("strong",{children:"swapping the two sides of and"})," — so the safe check runs first."]}),starter:`total = int(input("Total marks: "))
count = int(input("Tests taken: "))
if total / count >= 50 and count > 0:
    print("Good average")
else:
    print("Not enough data or low average")`,tests:[{inputs:["0","0"],expect:`Total marks: 0
Tests taken: 0
Not enough data or low average`},{inputs:["240","4"],expect:`Total marks: 240
Tests taken: 4
Good average`,hidden:!0},{inputs:["90","3"],expect:`Total marks: 90
Tests taken: 3
Not enough data or low average`,hidden:!0}],hints:["and stops as soon as the left side is False — the right side never runs.","if count > 0 and total / count >= 50:"],solution:`total = int(input("Total marks: "))
count = int(input("Tests taken: "))
if count > 0 and total / count >= 50:
    print("Good average")
else:
    print("Not enough data or low average")`},scholarship:{id:"scholarship",kind:"make",title:"Scholarship decider",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Marks: "})," (decimal), ",e.jsx("code",{children:"Family income: "})," (whole number) and ",e.jsx("code",{children:"Sports quota (yes/no): "}),". A student gets the scholarship if ",e.jsx("strong",{children:"(marks ≥ 85 and income < 300000)"})," ",e.jsx("strong",{children:"or"})," ",e.jsx("strong",{children:"(sports quota and marks ≥ 60)"}),". Print ",e.jsx("code",{children:"Scholarship: Yes"})," or ",e.jsx("code",{children:"Scholarship: No"}),"."]}),minLines:10,tests:[{inputs:["90","250000","no"],expect:`Marks: 90
Family income: 250000
Sports quota (yes/no): no
Scholarship: Yes`},{inputs:["90","500000","no"],expect:`Marks: 90
Family income: 500000
Sports quota (yes/no): no
Scholarship: No`,hidden:!0},{inputs:["65","900000","yes"],expect:`Marks: 65
Family income: 900000
Sports quota (yes/no): yes
Scholarship: Yes`,hidden:!0},{inputs:["55","100000","yes"],expect:`Marks: 55
Family income: 100000
Sports quota (yes/no): yes
Scholarship: No`,hidden:!0},{inputs:["85","299999","no"],expect:`Marks: 85
Family income: 299999
Sports quota (yes/no): no
Scholarship: Yes`,hidden:!0}],requires:[{node:"BoolOp",min:2,msg:"Combine conditions with and / or."}],hints:['sports = input("Sports quota (yes/no): ") == "yes"',"Use brackets to group each and-pair, then join the two groups with or."],solution:`marks = float(input("Marks: "))
income = int(input("Family income: "))
sports = input("Sports quota (yes/no): ") == "yes"
if (marks >= 85 and income < 300000) or (sports and marks >= 60):
    print("Scholarship: Yes")
else:
    print("Scholarship: No")`}},q=d,I=[{q:"True and False gives…",options:["True","False"],answer:1,explain:"and needs both sides True."},{q:"True or False gives…",options:["True","False"],answer:0,explain:"or needs at least one side True."},{q:'For day = "Monday", what does day == "Saturday" or "Sunday" give?',options:["False",'True — the bare text "Sunday" is truthy',"An error",'"Monday"'],answer:1,explain:'Python reads it as (day == "Saturday") or "Sunday". Write both comparisons in full.'},{q:"Which checks that m is between 1 and 10, inclusive?",options:["1 < m < 10","1 <= m <= 10","m >= 1 or m <= 10","1 <= m or m <= 10"],answer:1,explain:"<= includes the ends. or would accept every number."},{q:"What is result?",code:`temp = 38
result = "Hot" if temp > 35 else "Fine"`,options:['"Fine"','"Hot"',"True","Error"],answer:1,explain:"The condition is True, so the value before if is chosen."},{q:"Why does count > 0 and total / count > 5 never crash when count is 0?",options:["Python fixes division by zero","and stops at the first False, so the division never runs","Because > is checked first","It does crash"],answer:1,explain:"Short-circuit: once the left side is False the answer is already False. Put the safety check first."},{q:"What does not (5 > 3) give?",options:["True","False"],answer:1,explain:"5 > 3 is True; not flips it."}];function N(t){const l=[{label:"and",kicker:"BOTH MUST HOLD",title:"and: two conditions at once",blocks:[e.jsxs(u,{children:["Real rules have more than one condition. A bank lends only if the applicant is ",e.jsx("strong",{children:"old enough and"})," earns enough. ",e.jsx("code",{children:"and"})," is True only when both sides are True."]}),e.jsx(T,{}),d.loan]},{label:"or & not",kicker:"EITHER / FLIP",title:"or, not, and the truth table",blocks:[e.jsxs(u,{children:[e.jsx("code",{children:"or"})," is True when ",e.jsx("em",{children:"at least one"})," side is True. ",e.jsx("code",{children:"not"})," flips True and False. Toggle p and q:"]}),e.jsx(v,{}),d.weekend,e.jsxs(u,{children:["The most famous ",e.jsx("code",{children:"or"})," bug in every first-year lab:"]}),e.jsx(F,{}),d.orbug,d.fees,e.jsxs(b,{children:["Each side of ",e.jsx("code",{children:"and"}),"/",e.jsx("code",{children:"or"})," must be a complete condition. When you mix them, use brackets: ",e.jsx("code",{children:"and"})," binds tighter than ",e.jsx("code",{children:"or"}),", which binds tighter than … nothing you want to guess."]})]},{label:"Ranges & One-liners",kicker:"PYTHON SHORTCUTS",title:"0 <= m <= 100, and choosing in one line",blocks:[e.jsxs(u,{children:["Python lets you chain comparisons like in maths: ",e.jsx("code",{children:"0 <= mark <= 100"})," means ",e.jsx("code",{children:"mark >= 0 and mark <= 100"}),". (Most languages, including C, don't allow this.)"]}),d.range,d.oneline]},{label:"Nested if",kicker:"DECISIONS INSIDE DECISIONS",title:"An if inside an if",blocks:[e.jsxs(u,{children:["Sometimes the second question only matters in one situation. The college checks attendance first; what low internals ",e.jsx("em",{children:"mean"})," depends on which side of the attendance rule you are. Move the sliders:"]}),e.jsx(A,{}),d.hall,e.jsxs(S,{color:n.blue,icon:"🤔",children:["Could this be one chain with ",e.jsx("code",{children:"and"}),"? Yes — but nesting mirrors how the rule is actually decided: attendance first, then internals."]})]},{label:"Short-circuit",kicker:"ORDER MATTERS",title:"Python stops as soon as it knows",blocks:[e.jsxs(u,{children:[e.jsx("code",{children:"and"})," stops at the first False; ",e.jsx("code",{children:"or"})," stops at the first True. The rest is never even evaluated. That turns the order of conditions into a safety tool."]}),d.safe]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: scholarship decider",blocks:[e.jsxs(u,{children:["Two groups joined with ",e.jsx("code",{children:"or"}),", each group an ",e.jsx("code",{children:"and"}),", brackets to make the meaning obvious."]}),d.scholarship]}];return e.jsx(w,{...t,unitId:"Unit5_3",crumb:"MODULE 5 › UNIT 5.3",title:"Combining Conditions",sections:l,quiz:I,next:{title:"Unit 5.4 — Capstone: Decision Maker",text:"Everything from Module 5 in one program that decides for real."}})}export{q as EXERCISES,N as default};
