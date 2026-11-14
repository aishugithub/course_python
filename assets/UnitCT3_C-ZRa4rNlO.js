import{j as e}from"./index-CD7nmDt6.js";import{C as o}from"./Crucible-CXcOifgr.js";import"./Lesson-MmSVdMEX.js";const d=n=>({text:"#",min:n,msg:`Name the base case and the recursive case in at least ${n} # comment lines.`}),a=n=>(n.length<=1?[n]:[...new Set(n.split("").flatMap((i,s)=>a(n.slice(0,s)+n.slice(s+1)).map(l=>i+l)))]).sort(),r=(n,i={})=>{const s=a(n);return{inputs:[n],expect:[`Word: ${n}`,...s,`Count: ${s.length}`].join(`
`),...i}},t={spark1:{id:"spark1",kind:"predict",title:"Down and back up",code:`def mystery(n):
    if n <= 0:
        return 0
    print("in", n)
    result = n + mystery(n - 2)
    print("out", n, result)
    return result

print(mystery(5))`,task:e.jsxs(e.Fragment,{children:["Lines before the recursive call print on the way ",e.jsx("em",{children:"down"}),"; lines after it print on the way back ",e.jsx("em",{children:"up"}),", deepest call first."]}),hints:["mystery(5) calls mystery(3), which calls mystery(1), which calls mystery(-1) — the base case, returning 0.","Then each call finishes: mystery(1) is 1 + 0, mystery(3) is 3 + 1 …"],solution:`in 5
in 3
in 1
out 1 1
out 3 4
out 5 9
9`},spark2:{id:"spark2",kind:"predict",title:"Patterns and call counts",code:`def pattern(n):
    if n == 0:
        return ""
    return pattern(n - 1) + str(n) + pattern(n - 1)

print(pattern(3))
print(len(pattern(5)))

def fib(n, calls):
    calls[0] += 1
    if n < 2:
        return n
    return fib(n - 1, calls) + fib(n - 2, calls)

c = [0]
print(fib(6, c), c[0])`,task:e.jsxs(e.Fragment,{children:["Build ",e.jsx("code",{children:"pattern"})," up from the smallest case. For the call count, the list ",e.jsx("code",{children:"c"})," is shared by every call."]}),hints:['pattern(1) is "1", pattern(2) is "121". Each step doubles the length and adds 1.',"fib(6) is 8.","calls(n) = 1 + calls(n − 1) + calls(n − 2), with calls(0) = calls(1) = 1."],solution:`1213121
31
8 25`},digits:{id:"digits",kind:"fix",title:"A digit sum that goes wrong",task:e.jsx(e.Fragment,{children:"It should add the digits: 1234 → 10. It prints a long decimal instead. Find why the recursion doesn't shrink the number the way it should, and fix it."}),starter:`def digit_sum(n):
    if n == 0:
        return 0
    return n % 10 + digit_sum(n / 10)

print(digit_sum(int(input("Number: "))))`,tests:[{inputs:["1234"],expect:`Number: 1234
10`},{inputs:["0"],expect:`Number: 0
0`,hidden:!0},{inputs:["99999"],expect:`Number: 99999
45`,hidden:!0}],post:"assert digit_sum(505) == 10",hints:["1234 / 10 is 123.4 — not 123.","Which operator drops the last digit and keeps a whole number?"],solution:`def digit_sum(n):
    if n == 0:
        return 0
    return n % 10 + digit_sum(n // 10)

print(digit_sum(int(input("Number: "))))`},palindrome:{id:"palindrome",kind:"fix",title:"Palindromes, recursively",task:e.jsxs(e.Fragment,{children:["A word is a palindrome if its first and last letters match ",e.jsx("em",{children:"and"})," the middle is a palindrome. This version says ",e.jsx("code",{children:"level"})," isn't one. Fix the recursive call."]}),starter:`def is_pal(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_pal(s[1:])

for w in input("Words: ").split():
    print(w, is_pal(w))`,tests:[{inputs:["level abca noon x"],expect:`Words: level abca noon x
level True
abca False
noon True
x True`},{inputs:["aba racecar ab"],expect:`Words: aba racecar ab
aba True
racecar True
ab False`,hidden:!0}],post:"assert is_pal('') and is_pal('abba') and not is_pal('abcab')",forbids:[{text:"[::-1]",msg:"Solve it recursively, without reversing."}],hints:["Once the outer letters match, which part is left to check?","Drop BOTH ends: s[1:-1]"],solution:`def is_pal(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_pal(s[1:-1])

for w in input("Words: ").split():
    print(w, is_pal(w))`},nested:{id:"nested",kind:"complete",title:"Lists inside lists",task:e.jsxs(e.Fragment,{children:["A list can hold lists, which can hold lists… Recursion handles any depth. Fill the blanks: ",e.jsx("code",{children:"flatten"})," gives every number in one flat list; ",e.jsx("code",{children:"depth"})," counts how deep the nesting goes (a plain list is 1 deep)."]}),starter:`def flatten(items):
    result = []
    for x in items:
        if isinstance(x, list):
            result += ___
        else:
            result.___(x)
    return result

def depth(items):
    if not isinstance(items, list):
        return 0
    deepest = 0
    for x in items:
        d = ___
        if d > deepest:
            deepest = d
    return ___

data = [1, [2, [3, 4], 5], [[6]], 7]
print(flatten(data))
print("Depth:", depth(data))`,tests:[{expect:`[1, 2, 3, 4, 5, 6, 7]
Depth: 3`}],post:"assert flatten([[[[1]]], 2]) == [1, 2] and depth([]) == 1 and depth([[[[1]]], 2]) == 4 and depth(5) == 0",hints:["flatten(x) — trust the recursive call to flatten the inner list.","result.append(x)","d = depth(x), and the list itself adds one level: return deepest + 1"],solution:`def flatten(items):
    result = []
    for x in items:
        if isinstance(x, list):
            result += flatten(x)
        else:
            result.append(x)
    return result

def depth(items):
    if not isinstance(items, list):
        return 0
    deepest = 0
    for x in items:
        d = depth(x)
        if d > deepest:
            deepest = d
    return deepest + 1

data = [1, [2, [3, 4], 5], [[6]], 7]
print(flatten(data))
print("Depth:", depth(data))`},permutations:{id:"permutations",kind:"make",title:"Every arrangement",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"permutations(s)"})," that returns a list of every ordering of the letters of ",e.jsx("code",{children:"s"}),", recursively: a word of 0 or 1 letters has one ordering (itself); otherwise, for each position, take that letter out, find all orderings of the rest, and put the letter in front of each. Ask ",e.jsx("code",{children:"Word: "}),", print the ",e.jsx("strong",{children:"distinct"})," orderings in alphabetical order, one per line, then ",e.jsx("code",{children:"Count: 6"}),". Name the base and recursive case in comments. No imports."]}),minLines:14,tests:[r("abc"),r("aab",{hidden:!0,why:"Repeated letters make repeated orderings — print each distinct one once (a set helps)."}),r("z",{hidden:!0}),r("dcba",{hidden:!0})],post:`assert sorted(set(permutations('ab'))) == ['ab', 'ba'], 'permutations("ab") should give ["ab", "ba"] in some order.'
assert len(permutations('abcd')) == 24, 'permutations() should return every ordering, repeats included (de-duplicate when printing).'`,requires:[d(2),{node:"FunctionDef"}],forbids:[{node:"Import",msg:"No itertools — build it with recursion."},{node:"ImportFrom",msg:"No itertools — build it with recursion."}],hints:["if len(s) <= 1: return [s]","for i in range(len(s)): rest = s[:i] + s[i + 1:] — then for p in permutations(rest): result.append(s[i] + p)","sorted(set(permutations(word))) gives the distinct ones in order."],solution:`# base case: 0 or 1 letters -> the only ordering is the word itself
# recursive case: each letter in turn goes first, followed by every ordering of the rest
def permutations(s):
    if len(s) <= 1:
        return [s]
    result = []
    for i in range(len(s)):
        rest = s[:i] + s[i + 1:]
        for p in permutations(rest):
            result.append(s[i] + p)
    return result

word = input("Word: ")
unique = sorted(set(permutations(word)))
for p in unique:
    print(p)
print("Count:", len(unique))`}},m=t,u=[{q:"In a recursive function, code AFTER the recursive call runs…",options:["Before the call","On the way back up, deepest call first","Only once","Never"],answer:1,explain:"Each call waits for the deeper one to return, then finishes."},{q:"A word with 4 different letters has how many orderings?",options:["4","8","16","24"],answer:3,explain:"4 × 3 × 2 × 1 = 24."},{q:"digit_sum(n / 10) never stops cleanly because…",options:["/ makes decimals, so n never lands exactly on 0 quickly","Recursion can't use /","n gets bigger","% is wrong"],answer:0,explain:"// keeps whole numbers and reaches 0 in a few steps."}];function f(n){return e.jsx(o,{...n,unitId:"UnitCT3_C",module:"Computational Thinking III",title:"The Crucible: Recursion",spark:[t.spark1,t.spark2],flame:[t.digits,t.palindrome],forge:[t.nested],temper:[t.permutations],quiz:u})}export{m as EXERCISES,f as default};
