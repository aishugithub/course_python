import{j as e}from"./index-B7nVsXSH.js";import{C as h}from"./Crucible-Cy-LDRpo.js";import"./Lesson-TE-z-zj8.js";const u=t=>{if(t<2)return!1;for(let i=2;i*i<=t;i++)if(t%i===0)return!1;return!0};function m(t,i){const n=[];for(let r=+t;r<=+i;r++)u(r)&&n.push(r);const d=[`Start: ${t}`,`End: ${i}`,n.length?n.join(" "):"No primes",`Primes: ${n.length}`];if(n.length<2)d.push("Not enough primes for a gap");else{let r=0,p=0,l=0;for(let s=1;s<n.length;s++)n[s]-n[s-1]>r&&(r=n[s]-n[s-1],p=n[s-1],l=n[s]);d.push(`Largest gap: ${r} (between ${p} and ${l})`)}return d.join(`
`)}const a=(t,i,n={})=>({inputs:[t,i],expect:m(t,i),...n}),o={spark1:{id:"spark1",kind:"predict",title:"Counting down, adding up",code:`total = 0
for i in range(10, 0, -3):
    total += i
    print(i, end=" ")
print()
print(total)
n = 5
while n > 1:
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    print(n, end=",")`,task:e.jsx(e.Fragment,{children:"A for loop stepping backwards, then a while loop that jumps around before it lands. Trailing spaces at the end of a line don't matter."}),hints:["range(10, 0, -3) starts at 10 and steps down by 3, stopping before 0.","print() with nothing in it just ends the line.","Odd n becomes 3n + 1; even n is halved. Stop once n is 1."],solution:`10 7 4 1
22
16,8,4,2,1,`},spark2:{id:"spark2",kind:"predict",title:"continue, break, nested",code:`for i in range(1, 4):
    for j in range(1, 4):
        if j == i:
            continue
        if i + j == 5:
            break
        print(i, j)
print("done")
k = 0
while True:
    k += 1
    if k % 4 == 0:
        break
print(k)`,task:e.jsxs(e.Fragment,{children:["A ",e.jsx("code",{children:"break"})," inside the inner loop only leaves the ",e.jsx("em",{children:"inner"})," loop. Trace all nine (i, j) pairs."]}),hints:["continue skips the rest of this round of the inner loop.","break ends the inner loop; the outer loop carries on with the next i.","Pairs where i + j is 5: (2, 3) and (3, 2)."],solution:`1 2
1 3
2 1
3 1
done
4`},squares:{id:"squares",kind:"fix",title:"Sum of squares",task:e.jsxs(e.Fragment,{children:["Should print 1² + 2² + … + n² (for n = 3: 1 + 4 + 9 = 14). It prints 4. There are ",e.jsx("strong",{children:"two"})," bugs."]}),starter:`n = int(input("n: "))
for i in range(1, n):
    total = 0
    total = total + i ** 2
print("Sum of squares:", total)`,tests:[{inputs:["3"],expect:`n: 3
Sum of squares: 14`},{inputs:["1"],expect:`n: 1
Sum of squares: 1`,hidden:!0},{inputs:["10"],expect:`n: 10
Sum of squares: 385`,hidden:!0}],hints:["Where should the running total start — once, or every round?","range(1, n) stops BEFORE n."],solution:`n = int(input("n: "))
total = 0
for i in range(1, n + 1):
    total = total + i ** 2
print("Sum of squares:", total)`},valid:{id:"valid",kind:"fix",title:"Ask until it's valid",task:e.jsxs(e.Fragment,{children:["It should keep asking ",e.jsx("code",{children:"Mark (0-100): "})," until the mark is between 0 and 100, printing ",e.jsx("code",{children:"Out of range"})," after each bad one, then ",e.jsx("code",{children:"Saved 72"}),". Right now it accepts 150. Fix the condition — and then make sure the loop really asks again."]}),starter:`mark = int(input("Mark (0-100): "))
while mark < 0 and mark > 100:
    print("Out of range")
print("Saved", mark)`,tests:[{inputs:["150","-5","72"],expect:`Mark (0-100): 150
Out of range
Mark (0-100): -5
Out of range
Mark (0-100): 72
Saved 72`},{inputs:["100"],expect:`Mark (0-100): 100
Saved 100`,hidden:!0},{inputs:["101","0"],expect:`Mark (0-100): 101
Out of range
Mark (0-100): 0
Saved 0`,hidden:!0}],hints:["Can a mark be below 0 AND above 100 at the same time?","Inside the loop, ask again — otherwise it loops forever on the same bad mark."],solution:`mark = int(input("Mark (0-100): "))
while mark < 0 or mark > 100:
    print("Out of range")
    mark = int(input("Mark (0-100): "))
print("Saved", mark)`},palindrome:{id:"palindrome",kind:"complete",title:"Reverse the digits",task:e.jsxs(e.Fragment,{children:["Peel digits off the end with ",e.jsx("code",{children:"%"})," and ",e.jsx("code",{children:"//"})," and build the reversed number. Then say whether the number reads the same both ways. Fill the blanks."]}),starter:`n = int(input("Number: "))
original = n
reverse = 0
while n > 0:
    digit = n ___ 10
    reverse = reverse * 10 + ___
    n = n ___ 10
print("Reversed:", reverse)
if ___:
    print("Palindrome!")
else:
    print("Not a palindrome")`,tests:[{inputs:["12321"],expect:`Number: 12321
Reversed: 12321
Palindrome!`},{inputs:["1230"],expect:`Number: 1230
Reversed: 321
Not a palindrome`,hidden:!0},{inputs:["7"],expect:`Number: 7
Reversed: 7
Palindrome!`,hidden:!0}],forbids:[{text:"[::-1]",msg:"Do it with % and //, not text slicing."},{call:"str"}],hints:["n % 10 is the last digit; n // 10 drops it.","Compare the reversed number with the original — not with n, which is 0 by now."],solution:`n = int(input("Number: "))
original = n
reverse = 0
while n > 0:
    digit = n % 10
    reverse = reverse * 10 + digit
    n = n // 10
print("Reversed:", reverse)
if reverse == original:
    print("Palindrome!")
else:
    print("Not a palindrome")`},primes:{id:"primes",kind:"make",title:"Primes and their gaps",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Start: "})," and ",e.jsx("code",{children:"End: "}),". Print every prime from Start to End (both included) on one line, separated by spaces — or ",e.jsx("code",{children:"No primes"}),". Then ",e.jsx("code",{children:"Primes: 6"}),". Then the largest gap between two primes next to each other: ",e.jsx("code",{children:"Largest gap: 6 (between 23 and 29)"})," — the first one if there's a tie — or ",e.jsx("code",{children:"Not enough primes for a gap"})," if there are fewer than two. No lists: remember the previous prime in a variable."]}),minLines:22,tests:[a("10","30"),a("1","10",{hidden:!0,why:"1 is not prime; 2 is."}),a("24","28",{hidden:!0}),a("13","16",{hidden:!0}),a("89","113",{hidden:!0})],requires:[{node:"For",min:2}],forbids:[{node:"List",msg:"No lists yet — keep the previous prime in a variable."}],hints:["For each n: assume prime (a flag), try divisors from 2; any that divides → not prime, break. n < 2 is never prime.",'Print primes with end=" " and count them; after the loop, print() to end the line — or No primes if the count is 0.',"Keep prev (the last prime seen). When you find a new prime p and prev exists, gap = p - prev; keep the biggest with > (so the first one wins ties)."],solution:`start = int(input("Start: "))
end = int(input("End: "))
count = 0
prev = 0
best_gap = 0
gap_from = 0
gap_to = 0
for n in range(start, end + 1):
    if n < 2:
        continue
    is_prime = True
    for d in range(2, n):
        if d * d > n:
            break
        if n % d == 0:
            is_prime = False
            break
    if is_prime:
        print(n, end=" ")
        count += 1
        if prev > 0 and n - prev > best_gap:
            best_gap = n - prev
            gap_from = prev
            gap_to = n
        prev = n
if count == 0:
    print("No primes")
else:
    print()
print("Primes:", count)
if count < 2:
    print("Not enough primes for a gap")
else:
    print(f"Largest gap: {best_gap} (between {gap_from} and {gap_to})")`}},b=o,c=[{q:"How many times does for i in range(2, 11, 3) run?",options:["3","4","9","11"],answer:0,explain:"2, 5, 8 — 11 is excluded."},{q:"break inside an inner loop…",options:["Ends both loops","Ends only the inner loop","Skips one round","Ends the program"],answer:1,explain:"The outer loop carries on."},{q:"Where does total = 0 belong for a running total?",options:["Inside the loop","Before the loop","After the loop","Anywhere"],answer:1,explain:"Inside, it resets every round."}];function v(t){return e.jsx(h,{...t,unitId:"Unit6_C",module:"Module 6",title:"The Crucible: Loops",spark:[o.spark1,o.spark2],flame:[o.squares,o.valid],forge:[o.palindrome],temper:[o.primes],quiz:c})}export{b as EXERCISES,v as default};
