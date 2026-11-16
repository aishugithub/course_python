import{j as e}from"./index-5ju0ARcj.js";import{P as f,N as k,T as w,K as g,L as b}from"./Lesson-B4adq15Q.js";import{F as x}from"./FourMoves-DwIIPbTo.js";const m=n=>({text:"#",min:n,msg:`Write your algorithm first, as at least ${n} # comment lines.`});function u(n,t){const r=[];let i=0;for(let s=2;s<=n;s++){let p=!0;if(t){for(let o=2;o*o<=s;o++)if(i++,s%o===0){p=!1;break}}else for(let o=2;o<s;o++)if(i++,s%o===0){p=!1;break}p&&r.push(s)}return{list:r,checks:i}}const a=(n,t)=>{const{list:r,checks:i}=u(n,t==="fast"),s=[`N: ${n}`,`Primes: ${r.join(" ")}`,`Count: ${r.length}`,`Sum: ${r.reduce((p,o)=>p+o,0)}`];return t&&s.push(`Checks: ${i}`),s.join(`
`)},c=n=>{const{list:t}=u(n,!0),r=[];for(let i=1;i<t.length;i++)t[i]-t[i-1]===2&&r.push(`${t[i-1]} & ${t[i]}`);return[`N: ${n}`,...r,`Twin pairs: ${r.length}`].join(`
`)},h=`# 1. count = 0, total = 0
# 2. for every n from 2 to N (the walk)
# 3.     assume n is prime; try divisors 2..n-1; one hit -> not prime, stop
# 4.     if prime: print it on the line, count it, add it
N = int(input("N: "))
count = 0
total = 0
print("Primes:", end=" ")
for n in range(2, N + 1):
    is_prime = True
    for d in range(2, n):
        if n % d == 0:
            is_prime = False
            break
    if is_prime:
        print(n, end=" ")
        count += 1
        total += n
print()
print(f"Count: {count}")
print(f"Sum: {total}")`,d=h.replace(`total = 0
`,`total = 0
checks = 0
`).replace(`    for d in range(2, n):
`,`    for d in range(2, n):
        checks += 1
`)+`
print(f"Checks: {checks}")`,v=d.replace(`    for d in range(2, n):
        checks += 1
        if n % d == 0:
            is_prime = False
            break
`,`    d = 2
    while d * d <= n:
        checks += 1
        if n % d == 0:
            is_prime = False
            break
        d += 1
`),l={v1:{id:"v1",kind:"write",title:"Version 1 — list, count and sum the primes",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"N: "}),". Print every prime from 2 to N on one line after ",e.jsx("code",{children:"Primes:"}),", then ",e.jsx("code",{children:"Count: 10"})," and ",e.jsx("code",{children:"Sum: 129"})," (for N = 30). Write the four-move plan as comments first."]}),minLines:20,tests:[{inputs:["30"],expect:a(30)},{inputs:["2"],expect:a(2),hidden:!0},{inputs:["100"],expect:a(100),hidden:!0}],requires:[m(4),{node:"For",min:2},{node:"Break"}],hints:['print("Primes:", end=" ") before the loop; print(n, end=" ") for each prime; print() after.',"Inner loop: for d in range(2, n) with the flag pattern from CT1.3."],solution:h},v2:{id:"v2",kind:"modify",title:"Version 2 — measure the work",task:e.jsxs(e.Fragment,{children:["How hard is the computer working? Add a counter ",e.jsx("code",{children:"checks"})," that goes up by 1 every time a ",e.jsx("code",{children:"n % d"})," test runs, and print ",e.jsx("code",{children:"Checks: …"})," at the end. Try N = 1000 and look at the number."]}),starter:h,minLines:22,tests:[{inputs:["30"],expect:a(30,"slow")},{inputs:["100"],expect:a(100,"slow"),hidden:!0}],requires:[{node:"AugAssign",min:3,msg:"Add checks += 1 inside the inner loop."}],hints:["checks = 0 before both loops; checks += 1 as the first line of the inner loop."],solution:d},v3:{id:"v3",kind:"modify",title:"Version 3 — a smarter algorithm",task:e.jsxs(e.Fragment,{children:["If n has a divisor bigger than √n, it also has one smaller than √n (36 = 4 × 9: you meet 4 first). So you only need to test ",e.jsx("code",{children:"d"})," while ",e.jsx("code",{children:"d * d <= n"}),". Replace the inner for loop with a while loop that stops there. Same primes — compare the Checks number with Version 2."]}),starter:d,minLines:24,tests:[{inputs:["30"],expect:a(30,"fast")},{inputs:["100"],expect:a(100,"fast"),hidden:!0}],requires:[{node:"While"},{text:"d * d",msg:"Stop testing when d * d is bigger than n."}],hints:[`d = 2
while d * d <= n:
    checks += 1
    …
    d += 1`,"Don't forget d += 1 at the end of the while body — or it never ends (Unit 6.1)."],solution:v},twins:{id:"twins",kind:"make",title:"Twin primes",task:e.jsxs(e.Fragment,{children:["Twin primes are primes two apart: 3 & 5, 5 & 7, 11 & 13. Ask ",e.jsx("code",{children:"N: "})," and print every twin pair up to N, one per line as ",e.jsx("code",{children:"11 & 13"}),", then ",e.jsx("code",{children:"Twin pairs: 4"}),". Hint for decomposition: remember the ",e.jsx("em",{children:"previous"})," prime as you walk."]}),minLines:18,tests:[{inputs:["30"],expect:c(30)},{inputs:["4"],expect:c(4),hidden:!0},{inputs:["200"],expect:c(200),hidden:!0}],requires:[m(4),{node:"While"}],hints:["prev = 0 before the walk (meaning: no prime yet). When n is prime: if prev > 0 and n - prev == 2: it's a pair. Then prev = n.","Use the fast d * d <= n check for each n."],solution:`# 1. prev = 0 (no prime yet), pairs = 0
# 2. walk n from 2 to N, testing each with the fast check
# 3.     if n is prime and a previous prime exists and n - prev == 2: print the pair
# 4.     if n is prime: prev = n
N = int(input("N: "))
prev = 0
pairs = 0
for n in range(2, N + 1):
    is_prime = True
    d = 2
    while d * d <= n:
        if n % d == 0:
            is_prime = False
            break
        d += 1
    if is_prime:
        if prev > 0 and n - prev == 2:
            print(f"{prev} & {n}")
            pairs += 1
        prev = n
print(f"Twin pairs: {pairs}")`}},C=l,T=[{q:"Which part of the primes program is a nested loop?",options:["The walk 2..N","The divisor test inside the walk","The final prints","None"],answer:1,explain:"For each candidate n (outer), try divisors (inner)."},{q:"Why is testing up to √n enough?",options:["It isn't","Divisors come in pairs; the smaller one of each pair is ≤ √n","Primes are small","Python's rule"],answer:1,explain:"If n = a × b with a ≤ b, then a ≤ √n — so you'd have found a."},{q:"Why count the checks?",options:["Required","To measure how much work an algorithm does — and compare two algorithms","To find primes","To print them"],answer:1,explain:"Same answer, far less work: that's what a better algorithm means."},{q:"Which is the abstraction in “count and sum the primes”?",options:["The number 30","Two accumulators updated only when a test passes","print","range"],answer:1,explain:"Strip the story: filter + two accumulators."}];function I(n){const t=[{label:"The Challenge",kicker:"CAPSTONE",title:"Crack it yourself",blocks:[e.jsxs(f,{children:["No new syntax — just a raw problem: ",e.jsx("strong",{children:"list, count and add up all the prime numbers up to N."})," Work through the four moves before you type a single line:"]}),e.jsx(x,{problem:"List, count and sum the primes from 2 to N.",answers:{decompose:"(a) walk every number from 2 to N · (b) decide whether each one is prime · (c) for primes: print, count, add.",pattern:"Job (a) repeats for every n → outer loop. Job (b) itself repeats for every possible divisor → inner loop. A loop inside a loop.",abstract:"Job (b) is the flag pattern (CT1.3): assume prime, one divisor proves otherwise. Job (c) is two accumulators (CT1.1).",algorithm:`count = 0, total = 0
for n from 2 to N:
    is_prime = True
    for d from 2 to n - 1:
        if d divides n: is_prime = False, stop
    if is_prime: print n, count += 1, total += n
print count and total`}}),e.jsx(k,{color:w.blue,icon:"🧱",children:"Three versions again: get it right, measure it, make it faster."})]},{label:"Version 1",kicker:"GET IT RIGHT",title:"Version 1: the primes",blocks:[l.v1]},{label:"Version 2",kicker:"MEASURE IT",title:"Version 2: count the work",blocks:[l.v2]},{label:"Version 3",kicker:"MAKE IT FASTER",title:"Version 3: stop at √n",blocks:[l.v3,e.jsx(g,{children:"Two correct programs can do wildly different amounts of work. Choosing the algorithm, not typing faster, is what makes programs fast. (Computer scientists call this complexity.)"})]},{label:"Make It",kicker:"ON YOUR OWN",title:"Your program: twin primes",blocks:[l.twins]}];return e.jsx(b,{...n,unitId:"UnitCT1_5",crumb:"COMPUTATIONAL THINKING I › 5",title:"Capstone: Crack It Yourself",sections:t,quiz:T,next:{title:"Module 7 — Organizing Data",text:"CT I complete! Next: strings, lists, tuples, dictionaries and sets. (Optional first: CT I's Crucible.)"}})}export{C as EXERCISES,I as default};
