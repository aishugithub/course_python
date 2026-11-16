import{j as e,r as u}from"./index-5ju0ARcj.js";import{P as b,K as w,L as j,T as a,a as C}from"./Lesson-B4adq15Q.js";const h=s=>({text:"#",min:s,msg:`Name the base case and the recursive case in at least ${s} # comment lines.`}),m=(s,n="A",i="C",r="B",o=[])=>(s===0||(m(s-1,n,r,i,o),o.push(`Move disk ${s} from ${n} to ${i}`),m(s-1,r,i,n,o)),o),k=s=>{const n=[1,1];for(let i=2;i<=s;i++)n.push(n[i-1]+n[i-2]);return n[s]},T=s=>Array.from({length:2**s},(n,i)=>i.toString(2).padStart(s,"0"));function I(){const s={A:[3,2,1],B:[],C:[]},[n,i]=u.useState(s),[r,o]=u.useState(null),[p,g]=u.useState(0),[v,c]=u.useState("Click a peg to pick up its top disk, then another peg to drop it."),y=t=>{if(r===null){if(!n[t].length)return;o(t),c(`Picked disk ${n[t][n[t].length-1]} from ${t}.`);return}if(t===r){o(null),c("Put it back.");return}const l=n[r][n[r].length-1],f=n[t][n[t].length-1];if(f!==void 0&&f<l){c(`Not allowed: disk ${l} can't go on the smaller disk ${f}.`),o(null);return}const x={...n,[r]:n[r].slice(0,-1),[t]:[...n[t],l]};i(x),o(null),g(p+1),c(x.C.length===3?`Solved in ${p+1} moves${p+1===7?" — the minimum!":" (the minimum is 7)."}`:`Moved disk ${l} from ${r} to ${t}.`)};return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:14},children:["A","B","C"].map(t=>e.jsxs("button",{onClick:()=>y(t),style:{flex:1,minHeight:150,borderRadius:12,cursor:"pointer",border:`2px solid ${r===t?a.amber:a.border}`,background:a.card,display:"flex",flexDirection:"column-reverse",alignItems:"center",gap:4,padding:10,fontFamily:"inherit"},children:[e.jsx("div",{style:{fontFamily:C,fontWeight:700,color:a.slate},children:t}),n[t].map(l=>e.jsx("div",{style:{height:22,width:30+l*26,borderRadius:6,background:[a.teal,a.blue,a.purple][l-1],color:"#fff",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"},children:l},l))]},t))}),e.jsxs("div",{style:{marginTop:8,fontSize:14.5,color:a.slate},children:[v," ",e.jsx("button",{onClick:()=>{i(s),o(null),g(0),c("Reset.")},style:{marginLeft:8,padding:"4px 10px",borderRadius:6,border:`1px solid ${a.border}`,background:a.surface,cursor:"pointer"},children:"↺ reset"})]})]})}const d={moves:{id:"moves",kind:"write",title:"Print the moves",task:e.jsxs(e.Fragment,{children:["The insight: to move n disks from A to C, (1) move n − 1 disks out of the way to B, (2) move disk n to C, (3) move the n − 1 disks from B onto it. Write ",e.jsx("code",{children:"hanoi(n, source, target, spare)"})," that prints ",e.jsx("code",{children:"Move disk 1 from A to C"})," for every move. Ask ",e.jsx("code",{children:"Disks: "})," and call ",e.jsx("code",{children:'hanoi(n, "A", "C", "B")'}),"."]}),minLines:10,tests:[{inputs:["2"],expect:`Disks: 2
`+m(2).join(`
`)},{inputs:["3"],expect:`Disks: 3
`+m(3).join(`
`),hidden:!0}],requires:[h(3),{node:"FunctionDef"}],hints:["Base case: n == 0 → nothing to move, just return.","hanoi(n - 1, source, spare, target); print the move of disk n; hanoi(n - 1, spare, target, source)"],solution:`# base case: 0 disks -> nothing to do
# recursive case: move n-1 to the spare, move disk n, move n-1 onto it
# trust the smaller calls to do their job
def hanoi(n, source, target, spare):
    if n == 0:
        return
    hanoi(n - 1, source, spare, target)
    print(f"Move disk {n} from {source} to {target}")
    hanoi(n - 1, spare, target, source)

n = int(input("Disks: "))
hanoi(n, "A", "C", "B")`},count:{id:"count",kind:"write",title:"How many moves?",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"count_moves(n)"})," — recursively, without printing: 0 disks need 0 moves; n disks need count_moves(n − 1) + 1 + count_moves(n − 1). Print a table for n = 1 to 10: ",e.jsx("code",{children:"1 disks: 1 moves"}),"… Then look at the numbers: each is 2",e.jsx("sup",{children:"n"})," − 1."]}),tests:[{expect:Array.from({length:10},(s,n)=>`${n+1} disks: ${2**(n+1)-1} moves`).join(`
`)}],post:"assert count_moves(20) == 2 ** 20 - 1",requires:[h(2),{node:"FunctionDef"}],forbids:[{text:"**",msg:"Count recursively — don't use the formula."}],hints:["return 2 * count_moves(n - 1) + 1 is the same thing, written shorter."],solution:`# base case: 0 disks -> 0 moves
# recursive case: two moves of n-1 disks, plus one
def count_moves(n):
    if n == 0:
        return 0
    return 2 * count_moves(n - 1) + 1

for n in range(1, 11):
    print(f"{n} disks: {count_moves(n)} moves")`},stairs:{id:"stairs",kind:"write",title:"Climbing stairs",task:e.jsxs(e.Fragment,{children:["You climb a staircase 1 or 2 steps at a time. In how many different ways can you reach step n? To be on step n, your last move came from step n − 1 or step n − 2: ways(n) = ways(n − 1) + ways(n − 2), with ways(0) = ways(1) = 1. Ask ",e.jsx("code",{children:"Steps: "})," and print ",e.jsx("code",{children:"Ways: 8"}),". (Look familiar?)"]}),tests:[{inputs:["5"],expect:`Steps: 5
Ways: ${k(5)}`},{inputs:["1"],expect:`Steps: 1
Ways: 1`,hidden:!0},{inputs:["20"],expect:`Steps: 20
Ways: ${k(20)}`,hidden:!0}],post:"assert ways(10) == 89",requires:[h(2),{node:"FunctionDef"}],hints:["if n < 2: return 1","return ways(n - 1) + ways(n - 2) — it's Fibonacci in disguise."],solution:`# base cases: 0 or 1 steps -> 1 way
# recursive case: ways(n-1) + ways(n-2)
def ways(n):
    if n < 2:
        return 1
    return ways(n - 1) + ways(n - 2)

n = int(input("Steps: "))
print(f"Ways: {ways(n)}")`},binary:{id:"binary",kind:"make",title:"All binary strings",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"generate(prefix, n)"})," that prints every string of 0s and 1s of length n, in order: if the prefix is already n long, print it (base case); otherwise call itself twice — once with ",e.jsx("code",{children:'prefix + "0"'}),", once with ",e.jsx("code",{children:'prefix + "1"'}),". Ask ",e.jsx("code",{children:"Length: "})," and call ",e.jsx("code",{children:'generate("", n)'}),", then print ",e.jsx("code",{children:"Total: 8"}),". This branching shape — try every choice — is called ",e.jsx("strong",{children:"backtracking"}),"."]}),minLines:12,tests:[{inputs:["3"],expect:`Length: 3
`+T(3).join(`
`)+`
Total: 8`},{inputs:["1"],expect:`Length: 1
0
1
Total: 2`,hidden:!0}],requires:[h(3),{node:"FunctionDef"}],forbids:[{call:"bin"},{call:"format"}],hints:["if len(prefix) == n: print(prefix); return",'generate(prefix + "0", n) then generate(prefix + "1", n)',"Total is 2 ** n — or count with a returned number."],solution:`# base case: prefix has length n -> print it
# recursive case: extend with "0", then with "1"
# total strings = 2 ** n
def generate(prefix, n):
    if len(prefix) == n:
        print(prefix)
        return
    generate(prefix + "0", n)
    generate(prefix + "1", n)

n = int(input("Length: "))
generate("", n)
print(f"Total: {2 ** n}")`}},F=d,S=[{q:"To move 4 disks, Hanoi first…",options:["Moves disk 4","Moves 3 disks to the spare peg","Moves disk 1 to the target","Moves all to B"],answer:1,explain:"Clear the way for the biggest disk using a smaller Hanoi."},{q:"How many moves for 10 disks?",options:["10","100","1023","512"],answer:2,explain:"2¹⁰ − 1 = 1023."},{q:"The stairs problem is the same recursion as…",options:["Factorial","Fibonacci","GCD","Binary search"],answer:1,explain:"ways(n) = ways(n−1) + ways(n−2)."},{q:'generate("", 4) prints how many strings?',options:["4","8","16","32"],answer:2,explain:"Two choices per position: 2⁴ = 16."}];function M(s){const n=[{label:"The Puzzle",kicker:"TRY IT",title:"Tower of Hanoi",blocks:[e.jsx(b,{children:"Move all three disks from A to C. Rules: one disk at a time, and never a bigger disk on a smaller one. Try it:"}),e.jsx(I,{}),d.moves]},{label:"The Cost",kicker:"2ⁿ − 1",title:"How many moves?",blocks:[d.count,e.jsx(w,{children:"Each extra disk doubles the work. Legend says monks are moving 64 disks — 2⁶⁴ − 1 moves, about 585 billion years at one move per second."})]},{label:"Same Shape",kicker:"COUNTING CHOICES",title:"Recursion counts possibilities",blocks:[d.stairs]},{label:"Make It",kicker:"BACKTRACKING",title:"Your program: all binary strings",blocks:[d.binary]}];return e.jsx(j,{...s,unitId:"UnitCT3_3",crumb:"COMPUTATIONAL THINKING III › 3",title:"Tower of Hanoi",sections:n,quiz:S,next:{title:"Module 9 — When Things Go Wrong",text:"CT III complete! Next: errors and files. (Optional first: CT III's Crucible.)"}})}export{F as EXERCISES,M as default};
