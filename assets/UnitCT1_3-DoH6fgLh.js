import{j as e,r as p}from"./index-CD7nmDt6.js";import{P as g,K as f,L as m,T as s,a as b,t as c}from"./Lesson-MmSVdMEX.js";const d=n=>({text:"#",min:n,msg:`Write your algorithm first, as at least ${n} # comment lines.`});function x(){const[n,r]=p.useState("all"),t=n==="all";return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:8,marginBottom:8},children:[["all","Are ALL digits odd?"],["any","Is ANY digit 0?"]].map(([i,u])=>e.jsx("button",{onClick:()=>r(i),style:{padding:"8px 12px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",fontWeight:700,border:`1.5px solid ${n===i?s.navy:s.border}`,background:n===i?s.navy:s.card,color:n===i?"#fff":s.text},children:u},i))}),e.jsx("pre",{style:{margin:0,fontFamily:b,fontSize:14.5,lineHeight:1.7,background:s.codeBg,border:`1px solid ${s.border}`,borderRadius:10,padding:"12px 14px"},children:t?`all_odd = True            # innocent until proven guilty
while n > 0:
    if n % 10 % 2 == 0:
        all_odd = False   # one even digit is enough
        break
    n //= 10`:`has_zero = False          # nothing found yet
while n > 0:
    if n % 10 == 0:
        has_zero = True   # one zero is enough
        break
    n //= 10`})]}),e.jsx("div",{style:{background:c(s.purple,"0E"),border:`1px solid ${c(s.purple,"44")}`,borderRadius:12,padding:14,fontSize:14.5,color:s.slate,lineHeight:1.7},children:t?e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"“All” questions"})," start the flag at ",e.jsx("code",{children:"True"}),". A single counter-example flips it to False — and then there's no point looking further, so ",e.jsx("code",{children:"break"}),". You can only say “yes” after checking everything."]}):e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"“Any” questions"})," start the flag at ",e.jsx("code",{children:"False"}),". A single example flips it to True and you can stop. You can only say “no” after checking everything."]})})]})}const l=n=>{let r=0;for(let t=1;t<n;t++)n%t===0&&(r+=t);return r},h=(n,r)=>{for(let t=Math.min(n,r);t>=1;t--)if(n%t===0&&r%t===0)return t;return 1},o=(n,r)=>{const t=[];for(let i=n;i<=r;i++)(i%4===0&&i%100!==0||i%400===0)&&t.push(i);return t},a={allodd:{id:"allodd",kind:"write",title:"Are all the digits odd?",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Number: "})," and print ",e.jsx("code",{children:"All odd: True"})," or ",e.jsx("code",{children:"All odd: False"}),". Use an “all” flag with ",e.jsx("code",{children:"break"}),"."]}),tests:[{inputs:["13579"],expect:`Number: 13579
All odd: True`},{inputs:["13574"],expect:`Number: 13574
All odd: False`,hidden:!0},{inputs:["2"],expect:`Number: 2
All odd: False`,hidden:!0}],requires:[d(3),{node:"Break"}],hints:["all_odd = True before the loop; set False and break on the first even digit."],solution:`# 1. assume all digits are odd
# 2. peel each digit
# 3.     an even one disproves it: flag False, stop
# 4. print the flag
n = int(input("Number: "))
all_odd = True
while n > 0:
    if n % 10 % 2 == 0:
        all_odd = False
        break
    n //= 10
print(f"All odd: {all_odd}")`},anyzero:{id:"anyzero",kind:"write",title:"Is there a zero?",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Number: "})," (positive) and print ",e.jsx("code",{children:"Has zero: True"})," or ",e.jsx("code",{children:"Has zero: False"}),". Now the flag starts the other way round."]}),tests:[{inputs:["1042"],expect:`Number: 1042
Has zero: True`},{inputs:["1234"],expect:`Number: 1234
Has zero: False`,hidden:!0},{inputs:["50"],expect:`Number: 50
Has zero: True`,hidden:!0}],requires:[d(3),{node:"Break"}],hints:["has_zero = False; on the first 0 digit: True and break."],solution:`# 1. assume no zero
# 2. peel each digit
# 3.     a zero proves it: flag True, stop
# 4. print the flag
n = int(input("Number: "))
has_zero = False
while n > 0:
    if n % 10 == 0:
        has_zero = True
        break
    n //= 10
print(f"Has zero: {has_zero}")`},perfect:{id:"perfect",kind:"write",title:"Perfect numbers",task:e.jsxs(e.Fragment,{children:["A perfect number equals the sum of its divisors below itself: 6 = 1 + 2 + 3; 28 = 1 + 2 + 4 + 7 + 14. Ask ",e.jsx("code",{children:"Number: "})," and print ",e.jsx("code",{children:"Divisor sum: 28"})," then ",e.jsx("code",{children:"28 is perfect"})," or ",e.jsx("code",{children:"12 is not perfect"}),"."]}),tests:[{inputs:["28"],expect:`Number: 28
Divisor sum: ${l(28)}
28 is perfect`},{inputs:["12"],expect:`Number: 12
Divisor sum: ${l(12)}
12 is not perfect`,hidden:!0},{inputs:["496"],expect:`Number: 496
Divisor sum: ${l(496)}
496 is ${l(496)===496?"":"not "}perfect`,hidden:!0}],requires:[d(3),{node:"For"}],hints:["for d in range(1, n): if n % d == 0: total += d"],solution:`# 1. total = 0
# 2. try every d from 1 to n - 1
# 3.     if d divides n, add it
# 4. compare total with n
n = int(input("Number: "))
total = 0
for d in range(1, n):
    if n % d == 0:
        total += d
print(f"Divisor sum: {total}")
if total == n:
    print(f"{n} is perfect")
else:
    print(f"{n} is not perfect")`},gcd:{id:"gcd",kind:"write",title:"GCD and LCM",task:e.jsxs(e.Fragment,{children:["The greatest common divisor is the largest number dividing both. Search ",e.jsx("strong",{children:"downwards"})," from the smaller number and stop at the first one that divides both. Then LCM = a × b ÷ GCD. Ask ",e.jsx("code",{children:"a: "})," and ",e.jsx("code",{children:"b: "}),"; print ",e.jsx("code",{children:"GCD: 6"})," and ",e.jsx("code",{children:"LCM: 72"})," for 18 and 24."]}),tests:[{inputs:["18","24"],expect:`a: 18
b: 24
GCD: ${h(18,24)}
LCM: ${18*24/h(18,24)}`},{inputs:["7","13"],expect:`a: 7
b: 13
GCD: 1
LCM: 91`,hidden:!0},{inputs:["50","10"],expect:`a: 50
b: 10
GCD: 10
LCM: 50`,hidden:!0}],requires:[d(3),{node:"Break"}],forbids:[{text:"math.gcd",msg:"Find it with your own loop."},{text:"import math",msg:"Find it with your own loop."}],hints:["for d in range(min(a, b), 0, -1): — a countdown range (6.2).","The first d with a % d == 0 and b % d == 0 is the GCD: save it and break.","LCM: a * b // g (whole-number division keeps it an int)."],solution:`# 1. start at the smaller number, count down
# 2. first d dividing both is the GCD: save it, stop
# 3. LCM = a * b // GCD
# 4. print both
a = int(input("a: "))
b = int(input("b: "))
g = 1
for d in range(min(a, b), 0, -1):
    if a % d == 0 and b % d == 0:
        g = d
        break
print(f"GCD: {g}")
print(f"LCM: {a * b // g}")`},leap:{id:"leap",kind:"make",title:"Leap years in a range",task:e.jsxs(e.Fragment,{children:["A year is a leap year if it's divisible by 4 ",e.jsx("strong",{children:"and not"})," by 100 — ",e.jsx("strong",{children:"or"})," divisible by 400 (so 2000 was, 1900 wasn't). Ask ",e.jsx("code",{children:"From: "})," and ",e.jsx("code",{children:"To: "}),". Print the leap years on one line separated by spaces, then ",e.jsx("code",{children:"Count: 6"}),"."]}),minLines:10,tests:[{inputs:["1996","2020"],expect:`From: 1996
To: 2020
${o(1996,2020).join(" ")}
Count: ${o(1996,2020).length}`},{inputs:["1890","1910"],expect:`From: 1890
To: 1910
${o(1890,1910).join(" ")}
Count: ${o(1890,1910).length}`,hidden:!0},{inputs:["1999","2004"],expect:`From: 1999
To: 2004
${o(1999,2004).join(" ")}
Count: ${o(1999,2004).length}`,hidden:!0}],requires:[d(4),{node:"For"},{node:"BoolOp"}],hints:["(y % 4 == 0 and y % 100 != 0) or y % 400 == 0",'print(y, end=" ") inside the if, then print() after the loop to end the line.'],solution:`# 1. count = 0
# 2. for each year in the range
# 3.     if it is a leap year: print it on the same line, count it
# 4. end the line, print the count
start = int(input("From: "))
end = int(input("To: "))
count = 0
for y in range(start, end + 1):
    if (y % 4 == 0 and y % 100 != 0) or y % 400 == 0:
        print(y, end=" ")
        count += 1
print()
print(f"Count: {count}")`}},v=a,y=[{q:"“Is every mark above 40?” — the flag should start as…",options:["False","True","0","None"],answer:1,explain:"All-questions start True; one counter-example makes it False."},{q:"“Did anyone score 100?” — the flag should start as…",options:["False","True"],answer:0,explain:"Any-questions start False; one example makes it True."},{q:"Why break as soon as the flag flips?",options:["Required","The answer can't change any more, so further checks are wasted","To avoid an error","To reset the flag"],answer:1,explain:"One counter-example settles an all-question for good."},{q:"Was 1900 a leap year?",options:["Yes — divisible by 4","No — divisible by 100 but not 400","Yes — divisible by 100","Depends"],answer:1,explain:"The century rule: only centuries divisible by 400 are leap years."}];function T(n){const r=[{label:"All or Any?",kicker:"THE FLAG",title:"A question about every item",blocks:[e.jsxs(g,{children:["Some answers need the whole loop: ",e.jsx("em",{children:"are all digits odd?"})," ",e.jsx("em",{children:"is any digit zero?"})," A ",e.jsx("strong",{children:"flag"})," holds the answer so far; the loop can only change it in one direction."]}),e.jsx(x,{}),a.allodd,a.anyzero]},{label:"Divisors",kicker:"TRY EVERY CANDIDATE",title:"Testing every possible divisor",blocks:[a.perfect,a.gcd,e.jsxs(f,{children:["Searching downwards and stopping at the first hit finds the ",e.jsx("em",{children:"largest"})," answer without checking the rest."]})]},{label:"Make It",kicker:"A DECISION PER ROUND",title:"Your program: leap years",blocks:[a.leap]}];return e.jsx(m,{...n,unitId:"UnitCT1_3",crumb:"COMPUTATIONAL THINKING I › 3",title:"Deciding Inside a Loop",sections:r,quiz:y,next:{title:"CT I · 4 — Patterns & Nested Loops",text:"Pyramids, Floyd's triangle and neat tables — every exam favourite."}})}export{v as EXERCISES,T as default};
