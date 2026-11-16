import{j as e,r as p}from"./index-5ju0ARcj.js";import{P as f,K as m,L as b,T as t,a as h,t as x}from"./Lesson-B4adq15Q.js";const d=s=>({text:"#",min:s,msg:`Name the base case and the recursive case in at least ${s} # comment lines.`});function w(){const s=[];for(let n=4;n>=0;n--)s.push({frames:Array.from({length:5-n},(o,c)=>4-c),phase:n===0?"base":"down",d:n===0?"factorial(0) is the base case: it returns 1 straight away. The stack stops growing.":`factorial(${n}) needs factorial(${n-1}) first, so it waits and calls down.`});let i=1;for(let n=1;n<=4;n++)i*=n,s.push({frames:Array.from({length:5-n},(o,c)=>4-c),phase:"up",ret:i,d:`factorial(${n}) gets its answer back and returns ${n} × ${i/n} = ${i}.`});const[l,u]=p.useState(0),r=s[l];return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("pre",{style:{margin:0,fontFamily:h,fontSize:14.5,lineHeight:1.7,background:t.codeBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px"},children:`def factorial(n):
    if n == 0:            # base case
        return 1
    return n * factorial(n - 1)   # smaller problem

print(factorial(4))`}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:8},children:[e.jsx("button",{onClick:()=>u(Math.max(0,l-1)),style:{padding:"8px 12px",borderRadius:8,border:`1px solid ${t.border}`,background:t.card,cursor:"pointer"},children:"◀"}),e.jsx("button",{onClick:()=>u(Math.min(s.length-1,l+1)),style:{padding:"8px 14px",borderRadius:8,border:"none",background:t.navy,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"Next ▶"})]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",flexDirection:"column-reverse",gap:4},children:r.frames.map((n,o)=>e.jsxs("div",{style:{fontFamily:h,padding:"6px 12px",borderRadius:8,border:`1.5px solid ${o===r.frames.length-1?r.phase==="base"?t.green:t.blue:t.border}`,background:o===r.frames.length-1?x(r.phase==="base"?t.green:t.blue,"12"):t.card},children:["factorial(",n,")",o===r.frames.length-1&&r.ret?`  → returns ${r.ret}`:""]},o))}),e.jsx("div",{style:{fontSize:14.5,color:t.slate,marginTop:8},children:r.d})]})]})}const a={countdown:{id:"countdown",kind:"type",title:"A function that calls itself",task:e.jsxs(e.Fragment,{children:["Every recursive function has two parts: a ",e.jsx("strong",{children:"base case"})," that stops, and a ",e.jsx("strong",{children:"recursive case"})," that calls itself on a ",e.jsx("em",{children:"smaller"})," problem."]}),show:`def countdown(n):
    if n == 0:
        print("Lift off!")
        return
    print(n)
    countdown(n - 1)

countdown(3)`,tests:[{expect:`3
2
1
Lift off!`}],requires:[{node:"FunctionDef"}],hints:["Each call handles one number and hands the rest (n - 1) to another call."],solution:`def countdown(n):
    if n == 0:
        print("Lift off!")
        return
    print(n)
    countdown(n - 1)

countdown(3)`},factorial:{id:"factorial",kind:"write",title:"Recursive factorial",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"factorial(n)"})," recursively: 0! = 1 (base case); n! = n × (n − 1)! (recursive case). No loops. Ask ",e.jsx("code",{children:"n: "})," and print ",e.jsx("code",{children:"5! = 120"}),"."]}),tests:[{inputs:["5"],expect:`n: 5
5! = 120`},{inputs:["0"],expect:`n: 0
0! = 1`,hidden:!0}],post:"assert factorial(10) == 3628800 and factorial(1) == 1",requires:[d(2),{node:"FunctionDef"}],forbids:[{node:"For",msg:"No loops — let the function call itself."},{node:"While",msg:"No loops — let the function call itself."}],hints:["if n == 0: return 1","return n * factorial(n - 1)"],solution:`# base case: 0! = 1
# recursive case: n! = n * (n-1)!
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

n = int(input("n: "))
print(f"{n}! = {factorial(n)}")`},nobase:{id:"nobase",kind:"fix",title:"No way to stop",task:e.jsxs(e.Fragment,{children:["Run it and read the coach. Add the missing base case so ",e.jsx("code",{children:"total(4)"})," gives 1 + 2 + 3 + 4 = 10."]}),starter:`def total(n):
    return n + total(n - 1)

print(total(4))`,tests:[{expect:"10"}],post:"assert total(1) == 1 and total(100) == 5050",hints:["What's the smallest problem whose answer you know without recursion? total(0) is 0."],solution:`def total(n):
    if n == 0:
        return 0
    return n + total(n - 1)

print(total(4))`},listsum:{id:"listsum",kind:"write",title:"Sum of a list, recursively",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"list_sum(nums)"})," without loops: the sum of an empty list is 0; otherwise it's the first item plus the sum of the rest (",e.jsx("code",{children:"nums[1:]"}),"). Ask ",e.jsx("code",{children:"Numbers: "})," and print ",e.jsx("code",{children:"Sum: 15"}),"."]}),tests:[{inputs:["1 2 3 4 5"],expect:`Numbers: 1 2 3 4 5
Sum: 15`},{inputs:["7"],expect:`Numbers: 7
Sum: 7`,hidden:!0}],post:"assert list_sum([]) == 0 and list_sum([10, -3]) == 7",requires:[d(2),{node:"FunctionDef"}],forbids:[{call:"sum",msg:"Do it recursively — no sum( )."},{node:"For",msg:"No loops inside the function."}],hints:["if not nums: return 0","return nums[0] + list_sum(nums[1:])"],solution:`# base case: empty list sums to 0
# recursive case: first item + sum of the rest
def list_sum(nums):
    if not nums:
        return 0
    return nums[0] + list_sum(nums[1:])

nums = [int(x) for x in input("Numbers: ").split()]
print(f"Sum: {list_sum(nums)}")`},power:{id:"power",kind:"make",title:"Power, two ways",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"power(b, e)"})," recursively (b",e.jsx("sup",{children:"0"})," = 1; b",e.jsx("sup",{children:"e"})," = b × b",e.jsx("sup",{children:"e−1"}),"), and ",e.jsx("code",{children:"fast_power(b, e)"})," which halves the work: if e is even, b",e.jsx("sup",{children:"e"})," = (b",e.jsx("sup",{children:"e/2"}),")²; if odd, b × b",e.jsx("sup",{children:"e−1"}),". Ask ",e.jsx("code",{children:"Base: "})," and ",e.jsx("code",{children:"Exponent: "})," and print ",e.jsx("code",{children:"2 ^ 10 = 1024"})," using fast_power. Hidden checks compare both functions."]}),minLines:16,tests:[{inputs:["2","10"],expect:`Base: 2
Exponent: 10
2 ^ 10 = 1024`},{inputs:["3","0"],expect:`Base: 3
Exponent: 0
3 ^ 0 = 1`,hidden:!0}],post:`for b, e in [(2, 0), (2, 1), (5, 3), (3, 13), (7, 20)]:
    assert power(b, e) == b ** e, f'power({b}, {e}) is wrong'
    assert fast_power(b, e) == b ** e, f'fast_power({b}, {e}) is wrong'`,requires:[d(3),{node:"FunctionDef",min:2}],forbids:[{text:"**",msg:"No ** — build it from multiplication."},{call:"pow"}],hints:["fast_power: half = fast_power(b, e // 2); return half * half when e is even.","Odd e: return b * fast_power(b, e - 1)."],solution:`# power: base e == 0 -> 1; otherwise b * power(b, e - 1)
# fast_power: even e -> square of b^(e/2); odd e -> b * b^(e-1)
# fast_power needs about log2(e) calls instead of e
def power(b, e):
    if e == 0:
        return 1
    return b * power(b, e - 1)

def fast_power(b, e):
    if e == 0:
        return 1
    if e % 2 == 0:
        half = fast_power(b, e // 2)
        return half * half
    return b * fast_power(b, e - 1)

b = int(input("Base: "))
e = int(input("Exponent: "))
print(f"{b} ^ {e} = {fast_power(b, e)}")`}},y=a,g=[{q:"What are the two parts of every recursive function?",options:["A loop and a counter","A base case that stops, and a recursive case on a smaller problem","Two functions","print and return"],answer:1,explain:"Without the base case it never stops; without shrinking, it never reaches the base."},{q:"What happens with no base case?",options:["It returns None","It calls itself until Python stops it with RecursionError","It loops once","Nothing"],answer:1,explain:"Python allows about 1000 nested calls by default."},{q:"In factorial(4), which call finishes first?",options:["factorial(4)","factorial(0)","They finish together","factorial(2)"],answer:1,explain:"The deepest call (the base case) returns first; the stack unwinds upwards (Unit 8.3)."},{q:"Why is fast_power faster?",options:["It uses **","Halving the exponent means about log₂(e) calls instead of e","It loops","It's not"],answer:1,explain:"2^1000 needs about 14 calls instead of 1000."}];function v(s){const i=[{label:"The Idea",kicker:"BASE · SMALLER · TRUST",title:"A function that calls itself",blocks:[e.jsxs(f,{children:["Some problems contain a smaller copy of themselves: 5! is 5 × 4!. A ",e.jsx("strong",{children:"recursive"})," function solves the small, obvious case directly and hands everything else to a call of itself on a smaller problem — trusting that call to work."]}),a.countdown]},{label:"The Stack",kicker:"UNIT 8.3, AGAIN",title:"Watch the stack grow and shrink",blocks:[e.jsx(w,{}),a.factorial,a.nobase]},{label:"Lists",kicker:"FIRST + REST",title:"Recursion on a list",blocks:[a.listsum,e.jsx(m,{children:"Recipe: (1) What's the smallest input I can answer directly? (2) How do I shrink the problem? (3) How do I combine the smaller answer into mine?"})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: power, two ways",blocks:[a.power]}];return e.jsx(b,{...s,unitId:"UnitCT3_1",crumb:"COMPUTATIONAL THINKING III › 1",title:"The Recursive Idea",sections:i,quiz:g,next:{title:"CT III · 2 — Recursion in Action",text:"Fibonacci, the call tree that explodes — and memoisation, the fix."}})}export{y as EXERCISES,v as default};
