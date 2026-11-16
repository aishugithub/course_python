import{j as t}from"./index-rTKCO5Yp.js";import{P as h,N as m,T as p,K as f,L as k}from"./Lesson-o3jU_D0N.js";import{F as g}from"./FourMoves-y-Jf_gBJ.js";const o=e=>({text:"#",min:e,msg:`Write your algorithm first, as at least ${e} # comment lines.`}),s=e=>{let n=0;for(let r=1;r<=e;r++)n+=1/r;return n.toFixed(2)},u=e=>{let n=1;for(let r=1;r<=e;r+=2)n*=r;return n},c=(e,n,r)=>{const l=[];let d=e;for(let i=1;i<=r;i++)d*=1+n/100,l.push(`Year ${i}: Rs ${d.toFixed(2)}`);return l.join(`
`)},a={squares:{id:"squares",kind:"complete",title:"Plan, then code: sum of squares",task:t.jsx(t.Fragment,{children:"The plan is written as comments. Fill the blanks so the code follows it: 1² + 2² + … + n². For n = 4: 1 + 4 + 9 + 16 = 30."}),starter:`# Algorithm
# 1. total starts at 0
# 2. for every i from 1 to n
# 3.     add i squared to total
# 4. print total
n = int(input("n: "))
total = ___
for i in range(1, ___):
    total += ___
print(f"Sum of squares: {total}")`,minLines:10,tests:[{inputs:["4"],expect:`n: 4
Sum of squares: 30`},{inputs:["10"],expect:`n: 10
Sum of squares: 385`,hidden:!0},{inputs:["1"],expect:`n: 1
Sum of squares: 1`,hidden:!0}],hints:["range must reach n, so stop at n + 1.","i * i (or i ** 2)."],solution:`# Algorithm
# 1. total starts at 0
# 2. for every i from 1 to n
# 3.     add i squared to total
# 4. print total
n = int(input("n: "))
total = 0
for i in range(1, n + 1):
    total += i * i
print(f"Sum of squares: {total}")`},average:{id:"average",kind:"write",title:"Average of N marks",task:t.jsxs(t.Fragment,{children:["Ask ",t.jsx("code",{children:"How many students: "}),", then ask ",t.jsx("code",{children:"Mark: "})," that many times. Print ",t.jsx("code",{children:"Average: 72.50"})," (2 decimals). Start with your 4-line algorithm as comments."]}),tests:[{inputs:["4","70","85","60","75"],expect:`How many students: 4
Mark: 70
Mark: 85
Mark: 60
Mark: 75
Average: 72.50`},{inputs:["1","33"],expect:`How many students: 1
Mark: 33
Average: 33.00`,hidden:!0}],requires:[o(3),{node:"For"}],hints:["The loop runs n times: for i in range(n): — read a mark inside and add it to total.","Average = total / n, printed with :.2f"],solution:`# 1. read how many students
# 2. total = 0, then read each mark and add it
# 3. average = total / count
# 4. print it
n = int(input("How many students: "))
total = 0
for i in range(n):
    total += int(input("Mark: "))
print(f"Average: {total / n:.2f}")`},harmonic:{id:"harmonic",kind:"write",title:"A series that keeps growing",task:t.jsxs(t.Fragment,{children:["Ask ",t.jsx("code",{children:"n: "})," and print the sum 1 + 1/2 + 1/3 + … + 1/n, to 2 decimals: ",t.jsx("code",{children:"Sum: 2.28"})," for n = 5. Same accumulator, a different thing added each round."]}),tests:[{inputs:["5"],expect:`n: 5
Sum: ${s(5)}`},{inputs:["1"],expect:`n: 1
Sum: ${s(1)}`,hidden:!0},{inputs:["10"],expect:`n: 10
Sum: ${s(10)}`,hidden:!0}],requires:[o(3),{node:"For"}],hints:["total += 1 / i"],solution:`# 1. total = 0
# 2. for i from 1 to n
# 3.     add 1 / i
# 4. print total to 2 decimals
n = int(input("n: "))
total = 0
for i in range(1, n + 1):
    total += 1 / i
print(f"Sum: {total:.2f}")`},odds:{id:"odds",kind:"write",title:"Product of the odd numbers",task:t.jsxs(t.Fragment,{children:["Ask ",t.jsx("code",{children:"n: "})," and multiply every odd number from 1 to n: for 9, 1 × 3 × 5 × 7 × 9 = ",t.jsx("code",{children:"Product: 945"}),". Which number must a product accumulator start at?"]}),tests:[{inputs:["9"],expect:`n: 9
Product: ${u(9)}`},{inputs:["1"],expect:`n: 1
Product: 1`,hidden:!0},{inputs:["4"],expect:`n: 4
Product: ${u(4)}`,hidden:!0}],requires:[o(3)],hints:["range(1, n + 1, 2) visits only the odd numbers.","Start at 1 — starting at 0 makes every product 0."],solution:`# 1. product = 1
# 2. for each odd i from 1 to n
# 3.     product *= i
# 4. print it
n = int(input("n: "))
product = 1
for i in range(1, n + 1, 2):
    product *= i
print(f"Product: {product}")`},savings:{id:"savings",kind:"write",title:"Savings, year by year",task:t.jsxs(t.Fragment,{children:["Ask ",t.jsx("code",{children:"Deposit: "}),", ",t.jsx("code",{children:"Rate %: "})," and ",t.jsx("code",{children:"Years: "}),". Each year the balance grows by the rate (compound interest). Print the balance after every year: ",t.jsx("code",{children:"Year 1: Rs 10500.00"}),". The accumulator is the balance itself — updated, then printed, each round."]}),tests:[{inputs:["10000","5","3"],expect:`Deposit: 10000
Rate %: 5
Years: 3
`+c(1e4,5,3)},{inputs:["5000","8","2"],expect:`Deposit: 5000
Rate %: 8
Years: 2
`+c(5e3,8,2),hidden:!0}],requires:[o(3),{node:"For"}],hints:["balance *= 1 + rate / 100","Print inside the loop, so every year appears."],solution:`# 1. balance starts at the deposit
# 2. for each year 1..years
# 3.     grow balance by rate %, then print it
# 4. (no print after the loop needed)
balance = float(input("Deposit: "))
rate = float(input("Rate %: "))
years = int(input("Years: "))
for year in range(1, years + 1):
    balance *= 1 + rate / 100
    print(f"Year {year}: Rs {balance:.2f}")`},fuel:{id:"fuel",kind:"make",title:"Fuel log",task:t.jsxs(t.Fragment,{children:["Ask ",t.jsx("code",{children:"Trips: "}),", then for each trip ask ",t.jsx("code",{children:"Km: "})," and ",t.jsx("code",{children:"Litres: "})," (decimals). Print ",t.jsx("code",{children:"Total km: 420.0"}),", ",t.jsx("code",{children:"Total litres: 28.0"})," and ",t.jsx("code",{children:"Mileage: 15.0 km/l"})," (1 decimal each). Plan first, in comments — this one needs ",t.jsx("strong",{children:"two"})," accumulators."]}),minLines:12,tests:[{inputs:["3","120","8","200","13","100","7"],expect:`Trips: 3
Km: 120
Litres: 8
Km: 200
Litres: 13
Km: 100
Litres: 7
Total km: 420.0
Total litres: 28.0
Mileage: 15.0 km/l`},{inputs:["1","55.5","3.7"],expect:`Trips: 1
Km: 55.5
Litres: 3.7
Total km: 55.5
Total litres: 3.7
Mileage: 15.0 km/l`,hidden:!0}],requires:[o(4),{node:"For"}],hints:["km_total = 0 and litre_total = 0 before the loop.","Mileage = km_total / litre_total."],solution:`# 1. two totals start at 0
# 2. for each trip: read km and litres
# 3.     add each to its own total
# 4. print totals and km_total / litre_total
trips = int(input("Trips: "))
km_total = 0
litre_total = 0
for t in range(trips):
    km_total += float(input("Km: "))
    litre_total += float(input("Litres: "))
print(f"Total km: {km_total:.1f}")
print(f"Total litres: {litre_total:.1f}")
print(f"Mileage: {km_total / litre_total:.1f} km/l")`}},v=a,x=[{q:"Which move is “strip away the story and keep the bare rule”?",options:["Decompose","Pattern","Abstraction","Algorithm"],answer:2,explain:"Marks, rupees or km — abstraction keeps only the rule: start at 0, add each value."},{q:"Where must an accumulator be created?",options:["Inside the loop","Before the loop","After the loop","Anywhere"],answer:1,explain:"Inside the loop it would reset every round."},{q:"A product accumulator starts at…",options:["0","1","n","None"],answer:1,explain:"1 is the multiplying identity; 0 would wipe everything out."},{q:"What's the value of writing the algorithm as comments before coding?",options:["Python needs it","You solve the problem in plain words first; translating to code becomes the easy part","It runs faster","No value"],answer:1,explain:"Separate thinking from typing — the core habit of computational thinking."}];function T(e){const n=[{label:"Four Moves",kicker:"THINK BEFORE YOU TYPE",title:"The four moves behind every program",blocks:[t.jsx(h,{children:"You now know the syntax of Modules 4–6. The hard part is turning a problem into steps. Programmers use four moves — click through them on a small problem:"}),t.jsx(g,{problem:"Add up the squares 1² + 2² + … + n².",answers:{decompose:"Somewhere to keep the answer · visit each number · square it · add it in · show the result.",pattern:"“Square it and add it” happens once for every number from 1 to n — repetition, so a loop.",abstract:"It's the accumulator: start at 0, add one value per round. Only WHAT is added changes (i × i).",algorithm:`total = 0
for i from 1 to n:
    total = total + i * i
print total`}}),t.jsxs(m,{color:p.blue,icon:"✍️",children:["In this strand every program starts with its algorithm written as ",t.jsx("code",{children:"#"})," comments. The checker looks for them."]}),a.squares]},{label:"Accumulators",kicker:"ONE PATTERN, MANY PROBLEMS",title:"The accumulator, re-skinned",blocks:[a.average,a.harmonic,a.odds,t.jsxs(f,{children:["Add → start at 0. Multiply → start at 1. Each round, change only ",t.jsx("em",{children:"what"})," you add or multiply."]})]},{label:"Over Time",kicker:"ACCUMULATE AND REPORT",title:"An accumulator you print every round",blocks:[a.savings]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: fuel log",blocks:[a.fuel]}];return t.jsx(k,{...e,unitId:"UnitCT1_1",crumb:"COMPUTATIONAL THINKING I › 1",title:"The Four Moves & the Accumulator",sections:n,quiz:x,next:{title:"CT I · 2 — Counting & Building with Loops",text:"Peel numbers apart digit by digit, and build new numbers from the pieces."}})}export{v as EXERCISES,T as default};
