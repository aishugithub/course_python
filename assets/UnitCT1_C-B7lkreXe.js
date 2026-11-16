import{j as n}from"./index-rTKCO5Yp.js";import{C as a}from"./Crucible-BpUvwW9y.js";import"./Lesson-o3jU_D0N.js";const d=t=>({text:"#",min:t,msg:`Write your algorithm first, as at least ${t} # comment lines.`}),l=t=>{const e=String(t).split("").map(Number);return e.reduce((i,s)=>i+s**e.length,0)===t};function u(t,e){const i=[];for(let s=+t;s<=+e;s++)l(s)&&i.push(s);return[`Start: ${t}`,`End: ${e}`,...i.length?i.map(String):["None found"],`Found: ${i.length}`].join(`
`)}const o=(t,e,i={})=>({inputs:[t,e],expect:u(t,e),...i}),r={spark1:{id:"spark1",kind:"predict",title:"Digital root",code:`n = 9875
steps = 0
while n >= 10:
    s = 0
    while n > 0:
        s += n % 10
        n //= 10
    n = s
    steps += 1
    print(n)
print("steps:", steps)`,task:n.jsx(n.Fragment,{children:"The inner loop adds up the digits; the outer loop repeats until one digit is left. Trace it with a table: n, s, steps."}),hints:["First pass: 9 + 8 + 7 + 5.","Then repeat with the new n while it still has two or more digits."],solution:`29
11
2
steps: 3`},spark2:{id:"spark2",kind:"predict",title:"GCD by subtraction",code:`a = 48
b = 18
while a != b:
    if a > b:
        a = a - b
    else:
        b = b - a
    print(a, b)
print("gcd", a)`,task:n.jsx(n.Fragment,{children:"An older version of Euclid's idea: keep subtracting the smaller from the larger. Print the pair after every step."}),hints:["48 > 18, so a becomes 30. Keep going.","Stop when the two are equal — that's the GCD."],solution:`30 18
12 18
12 6
6 6
gcd 6`},prime:{id:"prime",kind:"fix",title:"A prime test that forgets",task:n.jsx(n.Fragment,{children:"It says 9 is prime. The flag is set to False when a divisor is found… and then set back. There's a second bug too: 1 is not a prime number. Fix both."}),starter:`n = int(input("n: "))
is_prime = True
for d in range(2, n):
    if n % d == 0:
        is_prime = False
    else:
        is_prime = True
print(n, "is prime" if is_prime else "is not prime")`,tests:[{inputs:["9"],expect:`n: 9
9 is not prime`},{inputs:["1"],expect:`n: 1
1 is not prime`,hidden:!0,why:"1 is not prime: primes have exactly two divisors."},{inputs:["2"],expect:`n: 2
2 is prime`,hidden:!0},{inputs:["97"],expect:`n: 97
97 is prime`,hidden:!0}],hints:["Once one divisor is found, the answer is settled — nothing should switch it back.","Delete the else; break once a divisor is found. Start with is_prime = n > 1."],solution:`n = int(input("n: "))
is_prime = n > 1
for d in range(2, n):
    if n % d == 0:
        is_prime = False
        break
print(n, "is prime" if is_prime else "is not prime")`},threefive:{id:"threefive",kind:"fix",title:"Multiples of 3 or 5",task:n.jsxs(n.Fragment,{children:["Count and add every number from 1 to n (including n) that is divisible by 3 ",n.jsx("strong",{children:"or"})," 5. For 10: 3, 5, 6, 9, 10 → ",n.jsx("code",{children:"Count: 5"}),", ",n.jsx("code",{children:"Sum: 33"}),". Two bugs."]}),starter:`n = int(input("n: "))
count = 0
total = 0
for i in range(1, n):
    if i % 3 == 0 and i % 5 == 0:
        count += 1
        total += i
print("Count:", count)
print("Sum:", total)`,tests:[{inputs:["10"],expect:`n: 10
Count: 5
Sum: 33`},{inputs:["15"],expect:`n: 15
Count: 7
Sum: 60`,hidden:!0},{inputs:["2"],expect:`n: 2
Count: 0
Sum: 0`,hidden:!0}],hints:["and needs both — that's only multiples of 15.","range(1, n) stops before n."],solution:`n = int(input("n: "))
count = 0
total = 0
for i in range(1, n + 1):
    if i % 3 == 0 or i % 5 == 0:
        count += 1
        total += i
print("Count:", count)
print("Sum:", total)`},binary:{id:"binary",kind:"complete",title:"Decimal to binary",task:n.jsxs(n.Fragment,{children:["The algorithm: divide by 2 again and again; the remainders, read from last to first, are the bits. Building the text by putting each new bit in ",n.jsx("em",{children:"front"})," does the reversing for you. Fill the blanks."]}),starter:`n = int(input("Decimal: "))
# repeated division: the remainders, read backwards, are the bits
if n == 0:
    bits = "0"
else:
    bits = ""
    while n ___ 0:
        bits = str(n ___ 2) + ___
        n = n ___ 2
print("Binary:", bits)`,tests:[{inputs:["13"],expect:`Decimal: 13
Binary: 1101`},{inputs:["0"],expect:`Decimal: 0
Binary: 0`,hidden:!0},{inputs:["64"],expect:`Decimal: 64
Binary: 1000000`,hidden:!0}],forbids:[{call:"bin",msg:"Build it yourself — no bin()."},{call:"format"}],hints:["Loop while n > 0.","The remainder is n % 2; put it in front: str(n % 2) + bits","n = n // 2"],solution:`n = int(input("Decimal: "))
# repeated division: the remainders, read backwards, are the bits
if n == 0:
    bits = "0"
else:
    bits = ""
    while n > 0:
        bits = str(n % 2) + bits
        n = n // 2
print("Binary:", bits)`},armstrong:{id:"armstrong",kind:"make",title:"Armstrong numbers",task:n.jsxs(n.Fragment,{children:["A number is an ",n.jsx("strong",{children:"Armstrong number"})," if it equals the sum of its digits, each raised to the power of the number of digits: 153 = 1³ + 5³ + 3³. Ask ",n.jsx("code",{children:"Start: "})," and ",n.jsx("code",{children:"End: "}),", print every Armstrong number in that range (both ends included), one per line — or ",n.jsx("code",{children:"None found"})," — then ",n.jsx("code",{children:"Found: 4"}),". Write your algorithm first as ",n.jsx("code",{children:"#"})," comments. Use arithmetic only: no ",n.jsx("code",{children:"str()"})," or ",n.jsx("code",{children:"len()"})," — count the digits with a loop."]}),minLines:20,tests:[o("100","500"),o("1","10",{hidden:!0,why:"Every single-digit number is an Armstrong number (5¹ = 5)."}),o("1000","1600",{hidden:!0}),o("9000","9500",{hidden:!0,why:"Four digits → fourth powers: 9⁴ + 4⁴ + 7⁴ + 4⁴ = 9474."})],requires:[d(3),{node:"While",min:2}],forbids:[{call:"str",msg:"Use % and // to take the number apart."},{call:"len",msg:"Count the digits with a loop."}],hints:["For each n: first count its digits (copy n, keep doing // 10, count the steps).","Then take a fresh copy and add up (digit ** count) for each digit.","Keep a found counter; after the loop print None found if it's still 0."],solution:`# for each number n from start to end:
#   count its digits by dividing a copy by 10 until it is 0
#   add up each digit raised to that count
#   if the sum equals n, print it and count it
start = int(input("Start: "))
end = int(input("End: "))
found = 0
for n in range(start, end + 1):
    digits = 0
    m = n
    while m > 0:
        digits += 1
        m //= 10
    total = 0
    m = n
    while m > 0:
        total += (m % 10) ** digits
        m //= 10
    if total == n:
        print(n)
        found += 1
if found == 0:
    print("None found")
print("Found:", found)`}},f=r,p=[{q:"A flag that answers 'is there ANY divisor?' should…",options:["Flip every round","Change once, when a divisor is found — then stay","Start as False and become True on every non-divisor","Be printed in the loop"],answer:1,explain:"One counter-example settles it; break saves the rest of the work."},{q:"i % 3 == 0 and i % 5 == 0 is true for…",options:["Multiples of 3 or 5","Multiples of 15 only","Every number","No number"],answer:1,explain:"Both at once = divisible by 15."},{q:"13 → repeated ÷2 remainders 1, 0, 1, 1 → binary is…",options:["1011","1101","0111","1110"],answer:1,explain:"Read the remainders from last to first."}];function g(t){return n.jsx(a,{...t,unitId:"UnitCT1_C",module:"Computational Thinking I",title:"The Crucible: Algorithms",spark:[r.spark1,r.spark2],flame:[r.prime,r.threefive],forge:[r.binary],temper:[r.armstrong],quiz:p})}export{f as EXERCISES,g as default};
