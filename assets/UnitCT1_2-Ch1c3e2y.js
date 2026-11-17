import{j as e,r as g}from"./index-BsB65IVi.js";import{P as b,K as x,L as f,a as l,T as r}from"./Lesson-M2Z85AvF.js";const d=n=>({text:"#",min:n,msg:`Write your algorithm first, as at least ${n} # comment lines.`}),p=[{call:"str",msg:"Work with % 10 and // 10 — no converting to text."},{node:"Slice",msg:"No slicing — peel digits with arithmetic."}];function w(){const[n,t]=g.useState(4729),o=[];let s=n,h=0;for(;s>0;){const i=s%10;h=h*10+i,o.push({n:s,d:i,rest:Math.floor(s/10),rev:h}),s=Math.floor(s/10)}return e.jsxs("div",{children:[e.jsxs("label",{style:{fontFamily:l},children:["n = ",e.jsx("input",{type:"number",value:n,min:1,max:99999999,onChange:i=>t(Math.max(1,Math.min(99999999,Math.trunc(Number(i.target.value)||1)))),style:{width:130,fontFamily:l,fontSize:15,padding:"6px 8px",borderRadius:6,border:`1.5px solid ${r.borderStrong}`}})]}),e.jsxs("div",{style:{marginTop:10,border:`1px solid ${r.border}`,borderRadius:10,overflow:"hidden",maxWidth:640},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",background:r.deep,fontFamily:l,fontSize:13,padding:"6px 10px",fontWeight:700},children:[e.jsx("span",{children:"n"}),e.jsx("span",{children:"n % 10"}),e.jsx("span",{children:"n // 10"}),e.jsx("span",{children:"rev*10 + digit"})]}),o.map((i,c)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",fontFamily:l,fontSize:14.5,padding:"6px 10px",background:c%2?r.surface:r.card},children:[e.jsx("span",{children:i.n}),e.jsx("span",{style:{color:r.teal,fontWeight:700},children:i.d}),e.jsx("span",{children:i.rest}),e.jsx("span",{style:{color:r.purple,fontWeight:700},children:i.rev})]},c))]}),e.jsx("div",{style:{fontSize:14,color:r.slate,marginTop:8},children:"Each round peels the last digit off and pushes it onto a growing number. When n reaches 0, the loop stops — however many digits there were."})]})}const m=n=>{const t=String(n);return[...t].reduce((o,s)=>o+Number(s)**t.length,0)===n},u=n=>{let t=0;for(;n>=10;){let o=0;for(;n>0;)o+=n%10,n=Math.floor(n/10);n=o,t++}return[n,t]},a={evens:{id:"evens",kind:"write",title:"Count the even digits",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Number: "})," (positive). Print how many of its digits are even: 482173 → ",e.jsx("code",{children:"Even digits: 3"}),"."]}),tests:[{inputs:["482173"],expect:`Number: 482173
Even digits: 3`},{inputs:["13579"],expect:`Number: 13579
Even digits: 0`,hidden:!0},{inputs:["2468"],expect:`Number: 2468
Even digits: 4`,hidden:!0}],requires:[d(3),{node:"While"}],forbids:p,hints:["Peel: d = n % 10 — if d % 2 == 0, count it — then n //= 10."],solution:`# 1. count = 0
# 2. while digits remain: look at the last digit
# 3.     if it is even, count it; drop it
# 4. print count
n = int(input("Number: "))
count = 0
while n > 0:
    if n % 10 % 2 == 0:
        count += 1
    n //= 10
print(f"Even digits: {count}")`},palindrome:{id:"palindrome",kind:"write",title:"Palindrome number",task:e.jsxs(e.Fragment,{children:["A palindrome reads the same backwards: 12321. Ask ",e.jsx("code",{children:"Number: "}),", reverse it with the peel (keep the original in another variable!), and print ",e.jsx("code",{children:"12321 is a palindrome"})," or ",e.jsx("code",{children:"1231 is not a palindrome"}),"."]}),tests:[{inputs:["12321"],expect:`Number: 12321
12321 is a palindrome`},{inputs:["1231"],expect:`Number: 1231
1231 is not a palindrome`,hidden:!0},{inputs:["7"],expect:`Number: 7
7 is a palindrome`,hidden:!0}],requires:[d(3),{node:"While"}],forbids:p,hints:["The loop destroys n — copy it first: original = n.","rev = rev * 10 + n % 10, then compare rev == original."],solution:`# 1. keep a copy of the number
# 2. build the reverse digit by digit
# 3. compare reverse with the copy
# 4. print the verdict
n = int(input("Number: "))
original = n
rev = 0
while n > 0:
    rev = rev * 10 + n % 10
    n //= 10
if rev == original:
    print(f"{original} is a palindrome")
else:
    print(f"{original} is not a palindrome")`},armstrong:{id:"armstrong",kind:"write",title:"Armstrong number",task:e.jsxs(e.Fragment,{children:["An Armstrong number equals the sum of its digits, each raised to the power of the number of digits: 153 = 1³ + 5³ + 3³. Ask ",e.jsx("code",{children:"Number: "})," and print ",e.jsx("code",{children:"153 is an Armstrong number"})," or ",e.jsx("code",{children:"154 is not an Armstrong number"}),". Decompose: you need two passes over the digits."]}),tests:[{inputs:["153"],expect:`Number: 153
153 is ${m(153)?"an":"not an"} Armstrong number`},{inputs:["154"],expect:`Number: 154
154 is not an Armstrong number`,hidden:!0},{inputs:["9474"],expect:`Number: 9474
9474 is ${m(9474)?"an":"not an"} Armstrong number`,hidden:!0},{inputs:["5"],expect:`Number: 5
5 is an Armstrong number`,hidden:!0}],requires:[d(4),{node:"While",min:2}],forbids:p,hints:["Pass 1 counts the digits. Pass 2 adds digit ** count. Each pass needs its own fresh copy of n.","temp = n; while temp > 0: digits += 1; temp //= 10"],solution:`# 1. count the digits (first pass)
# 2. add each digit ** count (second pass)
# 3. compare the sum with the number
# 4. print the verdict
n = int(input("Number: "))
digits = 0
temp = n
while temp > 0:
    digits += 1
    temp //= 10
total = 0
temp = n
while temp > 0:
    total += (temp % 10) ** digits
    temp //= 10
if total == n:
    print(f"{n} is an Armstrong number")
else:
    print(f"{n} is not an Armstrong number")`},power:{id:"power",kind:"write",title:"Power without **",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Base: "})," and ",e.jsx("code",{children:"Exponent: "})," (whole numbers, exponent ≥ 0) and compute the power with a multiplying accumulator — no ",e.jsx("code",{children:"**"}),", no ",e.jsx("code",{children:"pow"}),". Print ",e.jsx("code",{children:"2 ^ 10 = 1024"}),"."]}),tests:[{inputs:["2","10"],expect:`Base: 2
Exponent: 10
2 ^ 10 = 1024`},{inputs:["7","0"],expect:`Base: 7
Exponent: 0
7 ^ 0 = 1`,hidden:!0},{inputs:["3","4"],expect:`Base: 3
Exponent: 4
3 ^ 4 = 81`,hidden:!0}],requires:[d(3),{node:"For"}],forbids:[{text:"**",msg:"Multiply in a loop instead of **."},{call:"pow"}],hints:["result = 1; repeat exponent times: result *= base."],solution:`# 1. result = 1
# 2. repeat exponent times
# 3.     multiply result by base
# 4. print
base = int(input("Base: "))
exp = int(input("Exponent: "))
result = 1
for i in range(exp):
    result *= base
print(f"{base} ^ {exp} = {result}")`},binary:{id:"binary",kind:"write",title:"Decimal to binary",task:e.jsxs(e.Fragment,{children:["Same peel, base 2: ",e.jsx("code",{children:"n % 2"})," is the last binary digit, ",e.jsx("code",{children:"n // 2"})," drops it. Build the answer as text, adding each new bit on the ",e.jsx("strong",{children:"left"}),": ",e.jsx("code",{children:"bits = str(n % 2) + bits"}),". Ask ",e.jsx("code",{children:"Number: "})," and print ",e.jsx("code",{children:"13 in binary is 1101"}),". Careful with 0."]}),tests:[{inputs:["13"],expect:`Number: 13
13 in binary is 1101`},{inputs:["0"],expect:`Number: 0
0 in binary is 0`,hidden:!0},{inputs:["64"],expect:`Number: 64
64 in binary is 1000000`,hidden:!0}],requires:[d(3),{node:"While"}],forbids:[{call:"bin",msg:"Build it yourself with % 2 and // 2."},{call:"format"}],hints:["Keep the original for the final message.",'If n is 0 the loop never runs — handle it: bits = "0".'],solution:`# 1. keep the original; bits starts empty
# 2. while n > 0: put n % 2 in front of bits, n //= 2
# 3. if bits is still empty, the number was 0
# 4. print
n = int(input("Number: "))
original = n
bits = ""
while n > 0:
    bits = str(n % 2) + bits
    n //= 2
if bits == "":
    bits = "0"
print(f"{original} in binary is {bits}")`},digitalroot:{id:"digitalroot",kind:"make",title:"Digital root",task:e.jsxs(e.Fragment,{children:["Add up the digits of a number; if the answer has more than one digit, do it again — until one digit is left. 9875 → 29 → 11 → 2. Ask ",e.jsx("code",{children:"Number: "})," and print ",e.jsx("code",{children:"Digital root: 2"})," and ",e.jsx("code",{children:"Rounds: 3"}),". Decompose first: it's a digit-sum loop ",e.jsx("strong",{children:"inside"})," a repeat-until loop."]}),minLines:14,tests:[{inputs:["9875"],expect:`Number: 9875
Digital root: ${u(9875)[0]}
Rounds: ${u(9875)[1]}`},{inputs:["7"],expect:`Number: 7
Digital root: 7
Rounds: 0`,hidden:!0},{inputs:["99999999"],expect:`Number: 99999999
Digital root: ${u(99999999)[0]}
Rounds: ${u(99999999)[1]}`,hidden:!0}],requires:[d(4),{node:"While",min:2}],forbids:p,hints:["Outer: while n >= 10. Inner: total = 0; while n > 0: peel and add. Then n = total; rounds += 1."],solution:`# 1. rounds = 0
# 2. while n has two or more digits:
# 3.     replace n by the sum of its digits (inner peel loop)
# 4.     count the round; finally print n and rounds
n = int(input("Number: "))
rounds = 0
while n >= 10:
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    n = total
    rounds += 1
print(f"Digital root: {n}")
print(f"Rounds: {rounds}")`}},k=a,y=[{q:"Why a while loop (not for) to process digits?",options:["Faster","You don't know in advance how many digits there are","for can't use %","No reason"],answer:1,explain:"Repeat until n becomes 0 — however long that takes."},{q:"Why copy n before reversing it?",options:["Style","The loop reduces n to 0, so the original is gone unless you saved it","Python requires it","To make it faster"],answer:1,explain:"original = n before the loop."},{q:"What does 13 // 2 and 13 % 2 give?",options:["6 and 1","6.5 and 0","7 and 1","6 and 0"],answer:0,explain:"Binary digits come from % 2, collected right to left."},{q:"The Armstrong check needs the number of digits before summing. That's which move?",options:["Pattern","Decomposition — splitting the task into two passes","Abstraction","None"],answer:1,explain:"Two smaller jobs: count, then sum powers."}];function N(n){const t=[{label:"The Peel",kicker:"% 10 AND // 10",title:"Taking a number apart, digit by digit",blocks:[e.jsxs(b,{children:["From Unit 6.1: ",e.jsx("code",{children:"n % 10"})," is the last digit, ",e.jsx("code",{children:"n // 10"})," drops it. In a loop, that peels a whole number. Type any number:"]}),e.jsx(w,{}),a.evens]},{label:"Build Numbers",kicker:"REVERSE · CHECK",title:"Building a new number from the pieces",blocks:[a.palindrome,a.armstrong,e.jsx(x,{children:"Destructive loops (n //= 10) eat their input. If you'll need the number again, copy it first."})]},{label:"Other Bases",kicker:"MULTIPLY · BASE 2",title:"Same patterns, new problems",blocks:[a.power,a.binary]},{label:"Make It",kicker:"LOOP INSIDE A LOOP",title:"Your program: digital root",blocks:[a.digitalroot]}];return e.jsx(f,{...n,unitId:"UnitCT1_2",crumb:"COMPUTATIONAL THINKING I › 2",title:"Counting & Building with Loops",sections:t,quiz:y,next:{title:"CT I · 3 — Deciding Inside a Loop",text:"Flags and verdicts: perfect numbers, GCD and LCM, and “is every digit odd?”."}})}export{k as EXERCISES,N as default};
