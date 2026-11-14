import{j as e}from"./index-cCwWvTed.js";import{N as o,T as c,K as d,L as l}from"./Lesson-BzQti5aW.js";const a=n=>({text:"#",min:n,msg:`Name the base case and the recursive case in at least ${n} # comment lines.`}),u=n=>{const t=[0,1];for(let i=2;i<=n;i++)t.push(t[i-1]+t[i-2]);return t.slice(0,n+1)},h=n=>{let t=0;const i=s=>(t++,s<2?s:i(s-1)+i(s-2));return i(n),t},f=[3,8,12,19,23,31,45,52,67,74,88],r={fib:{id:"fib",kind:"write",title:"Fibonacci",task:e.jsxs(e.Fragment,{children:["The Fibonacci numbers start 0, 1 and each next one is the sum of the previous two. Write ",e.jsx("code",{children:"fib(n)"})," recursively (two base cases: fib(0) = 0, fib(1) = 1). Ask ",e.jsx("code",{children:"n: "})," and print fib(0) to fib(n) on one line."]}),tests:[{inputs:["10"],expect:`n: 10
`+u(10).join(" ")},{inputs:["1"],expect:`n: 1
0 1`,hidden:!0}],post:"assert fib(15) == 610",requires:[a(2),{node:"FunctionDef"}],hints:["if n < 2: return n","return fib(n - 1) + fib(n - 2)",'for i in range(n + 1): print(fib(i), end=" ")'],solution:`# base cases: fib(0) = 0, fib(1) = 1
# recursive case: fib(n) = fib(n-1) + fib(n-2)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

n = int(input("n: "))
for i in range(n + 1):
    print(fib(i), end=" ")`},count:{id:"count",kind:"type",title:"How many calls?",task:e.jsx(e.Fragment,{children:"fib calls itself twice, and each of those calls itself twice… Count every call with a dictionary entry the function updates (a dict passed around, so no global). Predict how fast the count grows before you run it."}),show:`def fib(n, counter):
    counter["calls"] += 1
    if n < 2:
        return n
    return fib(n - 1, counter) + fib(n - 2, counter)

for n in [10, 20, 25]:
    counter = {"calls": 0}
    fib(n, counter)
    print(n, counter["calls"])`,tests:[{expect:[10,20,25].map(n=>`${n} ${h(n)}`).join(`
`)}],hints:["Each step of n roughly multiplies the calls by 1.6 — exponential growth."],solution:`def fib(n, counter):
    counter["calls"] += 1
    if n < 2:
        return n
    return fib(n - 1, counter) + fib(n - 2, counter)

for n in [10, 20, 25]:
    counter = {"calls": 0}
    fib(n, counter)
    print(n, counter["calls"])`},memo:{id:"memo",kind:"fix",title:"Memoisation",task:e.jsxs(e.Fragment,{children:["fib(80) would take years this way — the runner stops it after 5 seconds. Run it. Then fix it by ",e.jsx("strong",{children:"remembering"})," answers: before computing, look in a dictionary ",e.jsx("code",{children:"memo"}),"; after computing, store the result there. Same recursion, each fib(k) worked out only once."]}),starter:`def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(80))`,tests:[{expect:"23416728348467685"}],requires:[{node:"Dict",msg:"Use a dictionary to remember answers you've already worked out."}],hints:["memo = {} outside the function.","if n in memo: return memo[n] — then compute, store memo[n] = result, return it."],solution:`memo = {}

def fib(n):
    if n < 2:
        return n
    if n in memo:
        return memo[n]
    result = fib(n - 1) + fib(n - 2)
    memo[n] = result
    return result

print(fib(80))`},digits:{id:"digits",kind:"write",title:"Digits and strings, recursively",task:e.jsxs(e.Fragment,{children:["Write two recursive functions: ",e.jsx("code",{children:"digit_sum(n)"})," (0 for 0; otherwise last digit + digit_sum of the rest) and ",e.jsx("code",{children:"reverse(s)"})," (empty string for empty; otherwise reverse of the rest + first character). Ask ",e.jsx("code",{children:"Number: "})," and ",e.jsx("code",{children:"Word: "}),"; print ",e.jsx("code",{children:"Digit sum: 10"})," and ",e.jsx("code",{children:"Reversed: nohtyp"}),"."]}),tests:[{inputs:["253","python"],expect:`Number: 253
Word: python
Digit sum: 10
Reversed: nohtyp`},{inputs:["0","a"],expect:`Number: 0
Word: a
Digit sum: 0
Reversed: a`,hidden:!0}],post:"assert digit_sum(9999) == 36 and reverse('abc') == 'cba' and reverse('') == ''",requires:[a(2),{node:"FunctionDef",min:2}],forbids:[{text:"::-1",msg:"Reverse it recursively, not with slicing [::-1]."},{node:"For"},{node:"While"}],hints:["digit_sum: return n % 10 + digit_sum(n // 10)","reverse: return reverse(s[1:]) + s[0]"],solution:`# digit_sum: base 0 -> 0; else last digit + digit_sum(rest)
# reverse: base "" -> ""; else reverse(rest) + first
def digit_sum(n):
    if n == 0:
        return 0
    return n % 10 + digit_sum(n // 10)

def reverse(s):
    if s == "":
        return ""
    return reverse(s[1:]) + s[0]

n = int(input("Number: "))
w = input("Word: ")
print(f"Digit sum: {digit_sum(n)}")
print(f"Reversed: {reverse(w)}")`},bsearch:{id:"bsearch",kind:"write",title:"Recursive binary search",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"search(data, target, low, high)"})," returning the index or -1, recursively: if low > high, it's not there (base case); otherwise check the middle and search ",e.jsx("em",{children:"one"})," half. Search ",e.jsx("code",{children:"data = [3, 8, 12, 19, 23, 31, 45, 52, 67, 74, 88]"})," for the number typed after ",e.jsx("code",{children:"Find: "}),"; print ",e.jsx("code",{children:"Index: 8"}),"."]}),tests:[{inputs:["67"],expect:`Find: 67
Index: ${f.indexOf(67)}`},{inputs:["50"],expect:`Find: 50
Index: -1`,hidden:!0},{inputs:["3"],expect:`Find: 3
Index: 0`,hidden:!0}],post:`_d = [1, 3, 5, 7, 9, 11]
assert [search(_d, x, 0, len(_d) - 1) for x in [1, 9, 11, 4]] == [0, 4, 5, -1]`,requires:[a(2),{node:"FunctionDef"}],forbids:[{node:"While",msg:"Recursion replaces the while loop here."},{call:"index"}],hints:["mid = (low + high) // 2","Too small → return search(data, target, mid + 1, high); too big → search(data, target, low, mid - 1)."],solution:`# base cases: low > high -> -1; middle matches -> mid
# recursive case: search only the half that can contain target
def search(data, target, low, high):
    if low > high:
        return -1
    mid = (low + high) // 2
    if data[mid] == target:
        return mid
    if data[mid] < target:
        return search(data, target, mid + 1, high)
    return search(data, target, low, mid - 1)

data = [3, 8, 12, 19, 23, 31, 45, 52, 67, 74, 88]
t = int(input("Find: "))
print(f"Index: {search(data, t, 0, len(data) - 1)}")`},gcd:{id:"gcd",kind:"make",title:"Euclid's GCD",task:e.jsxs(e.Fragment,{children:["Euclid's 2,300-year-old algorithm: gcd(a, 0) = a; otherwise gcd(a, b) = gcd(b, a % b). Write it recursively and use it for ",e.jsx("code",{children:"lcm(a, b) = a * b // gcd(a, b)"}),". Ask ",e.jsx("code",{children:"a: "})," and ",e.jsx("code",{children:"b: "}),"; print ",e.jsx("code",{children:"GCD: 6"})," and ",e.jsx("code",{children:"LCM: 72"}),". Compare: CT1.3 searched every candidate; this takes a handful of steps even for huge numbers."]}),minLines:12,tests:[{inputs:["18","24"],expect:`a: 18
b: 24
GCD: 6
LCM: 72`},{inputs:["1071","462"],expect:`a: 1071
b: 462
GCD: 21
LCM: 23562`,hidden:!0}],post:"assert gcd(7, 13) == 1 and gcd(100, 75) == 25 and lcm(4, 6) == 12",requires:[a(2),{node:"FunctionDef",min:2}],forbids:[{text:"math.gcd"},{node:"For"},{node:"While"}],hints:["if b == 0: return a","return gcd(b, a % b)"],solution:`# base case: gcd(a, 0) = a
# recursive case: gcd(a, b) = gcd(b, a % b)
def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

def lcm(a, b):
    return a * b // gcd(a, b)

a = int(input("a: "))
b = int(input("b: "))
print(f"GCD: {gcd(a, b)}")
print(f"LCM: {lcm(a, b)}")`}},p=r,m=[{q:"Why is plain recursive fib so slow?",options:["Python is slow","It recomputes the same values again and again — the calls grow exponentially","Too many base cases","Recursion is always slow"],answer:1,explain:"fib(25) makes over 240,000 calls."},{q:"What does memoisation do?",options:["Deletes calls","Stores each answer the first time, and looks it up afterwards","Uses a loop","Prints faster"],answer:1,explain:"Each fib(k) is computed once: from exponential to linear."},{q:"In recursive binary search, what is the base case for “not found”?",options:["mid == 0","low > high","target == 0","len(data) == 1"],answer:1,explain:"Nothing left to search."},{q:"gcd(18, 24) → gcd(24, 18) → gcd(18, 6) → gcd(6, 0) → ?",options:["0","6","18","24"],answer:1,explain:"Base case: gcd(a, 0) = a."}];function x(n){const t=[{label:"Fibonacci",kicker:"TWO CALLS EACH",title:"Fibonacci and the exploding call tree",blocks:[r.fib,r.count,e.jsx(o,{color:c.blue,icon:"🌳",children:"Each fib(n) calls two more; the tree of calls roughly doubles at every level. That's exponential growth — and why fib(80) never finishes."})]},{label:"Memoisation",kicker:"REMEMBER ANSWERS",title:"From hopeless to instant",blocks:[r.memo,e.jsx(d,{children:"If a recursive function solves the same sub-problem many times, store each answer in a dictionary the first time. This idea (dynamic programming) powers many famous algorithms."})]},{label:"More Shapes",kicker:"NUMBERS · STRINGS · SEARCH",title:"The same pattern everywhere",blocks:[r.digits,r.bsearch]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: Euclid's GCD",blocks:[r.gcd]}];return e.jsx(l,{...n,unitId:"UnitCT3_2",crumb:"COMPUTATIONAL THINKING III › 2",title:"Recursion in Action",sections:t,quiz:m,next:{title:"CT III · 3 — Tower of Hanoi",text:"The puzzle that's nearly impossible by hand — and three lines of recursion."}})}export{p as EXERCISES,x as default};
