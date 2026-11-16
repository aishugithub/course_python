import{j as e,r as p}from"./index-B7nVsXSH.js";import{P as d,K as m,L as f,T as t,a as c,t as h}from"./Lesson-TE-z-zj8.js";const x={margin:0,fontFamily:c,fontSize:14.5,lineHeight:1.7,background:t.codeBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",whiteSpace:"pre"},g=["def cheer():",'    print("Go, team!")','    print("Score!")','print("Match starts")',"cheer()","cheer()",'print("Full time")'],l=[{l:0,out:[],mem:!1,d:"def: Python reads the recipe and remembers it under the name cheer. Lines 2–3 do NOT run now."},{l:3,out:["Match starts"],mem:!0,d:"Skips past the body to the first statement outside it."},{l:4,out:["Match starts"],mem:!0,d:"A call! Python jumps into cheer's body…"},{l:1,out:["Match starts","Go, team!"],mem:!0,d:"…runs it line by line…",inside:!0},{l:2,out:["Match starts","Go, team!","Score!"],mem:!0,d:"…and at the end of the body, returns to where it was called.",inside:!0},{l:5,out:["Match starts","Go, team!","Score!"],mem:!0,d:"The second call: the same body runs again."},{l:2,out:["Match starts","Go, team!","Score!","Go, team!","Score!"],mem:!0,d:"Body finished, back to the caller.",inside:!0},{l:6,out:["Match starts","Go, team!","Score!","Go, team!","Score!","Full time"],mem:!0,d:"Written once, run twice. Change the body and both calls change."}];function b(){const[n,s]=p.useState(0),i=l[n];return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsx("div",{style:{...x,padding:6},children:g.map((u,a)=>e.jsx("div",{style:{padding:"1px 8px",borderRadius:5,background:i.l===a?h(i.inside?t.purple:t.blue,"22"):"transparent",fontWeight:i.l===a?700:400},children:u},a))}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:8,alignItems:"center"},children:[e.jsx("button",{onClick:()=>s(Math.max(0,n-1)),style:{padding:"8px 12px",borderRadius:8,border:`1px solid ${t.border}`,background:t.card,cursor:"pointer"},children:"◀"}),e.jsx("button",{onClick:()=>s(Math.min(l.length-1,n+1)),style:{padding:"8px 14px",borderRadius:8,border:"none",background:t.navy,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"Next step ▶"}),e.jsxs("span",{style:{fontSize:13,color:t.muted},children:[n+1," / ",l.length]})]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"inline-block",border:`1.5px solid ${i.mem?t.teal:t.border}`,borderRadius:10,padding:"6px 12px",background:i.mem?h(t.teal,"12"):t.card,fontFamily:c,fontSize:13.5},children:["🏷 cheer → ",i.mem?"the recipe (2 lines)":"…being stored"]}),e.jsx("pre",{style:{margin:"10px 0 0",fontFamily:c,fontSize:14,background:t.termBg,color:t.termText,borderRadius:10,padding:"10px 14px",minHeight:120},children:i.out.join(`
`)||" "}),e.jsx("div",{style:{fontSize:14.5,color:t.slate,marginTop:8},children:i.d})]})]})}const o="=".repeat(30),r={first:{id:"first",kind:"type",title:"Define, then call",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"def name():"})," plus an indented body defines a function. Writing ",e.jsx("code",{children:"name()"})," calls it."]}),show:`def welcome():
    print("Welcome to Foothold!")
    print("Let's write some Python.")

welcome()
welcome()`,tests:[{expect:`Welcome to Foothold!
Let's write some Python.
Welcome to Foothold!
Let's write some Python.`}],requires:[{node:"FunctionDef"}],hints:["The two calls are NOT indented — they're outside the function."],solution:`def welcome():
    print("Welcome to Foothold!")
    print("Let's write some Python.")

welcome()
welcome()`},order:{id:"order",kind:"type",title:"Predict the order",task:e.jsx(e.Fragment,{children:"The program from the stepper. Before running: which line prints first?"}),show:`def cheer():
    print("Go, team!")
    print("Score!")

print("Match starts")
cheer()
cheer()
print("Full time")`,tests:[{expect:`Match starts
Go, team!
Score!
Go, team!
Score!
Full time`}],hints:["def doesn't print anything — only the calls do."],solution:`def cheer():
    print("Go, team!")
    print("Score!")

print("Match starts")
cheer()
cheer()
print("Full time")`},silent:{id:"silent",kind:"fix",title:"Why is nothing printed?",task:e.jsx(e.Fragment,{children:"This should print the menu. It runs without errors… and prints nothing. Fix it."}),starter:`def show_menu():
    print("1. Add  2. Report  3. Exit")

show_menu`,tests:[{expect:"1. Add  2. Report  3. Exit"}],hints:["A function name on its own just refers to the function. The brackets () are what call it."],solution:`def show_menu():
    print("1. Add  2. Report  3. Exit")

show_menu()`},early:{id:"early",kind:"fix",title:"Called before it exists",task:e.jsx(e.Fragment,{children:"Run it and read the coach. Fix the order."}),starter:`banner()

def banner():
    print("*** FOOTHOLD FEST ***")`,tests:[{expect:"*** FOOTHOLD FEST ***"}],hints:["Python reads top to bottom: the def must run before the call."],solution:`def banner():
    print("*** FOOTHOLD FEST ***")

banner()`},card:{id:"card",kind:"write",title:"A framed card",task:e.jsxs(e.Fragment,{children:["Write a function ",e.jsx("code",{children:"line()"})," that prints 30 ",e.jsx("code",{children:"="})," signs (use ",e.jsx("code",{children:'"=" * 30'}),"). Use it to print this card — the function is called three times:"]}),tests:[{expect:`${o}
FOOTHOLD PYTHON CLUB
${o}
Meets every Friday, Lab 3
${o}`}],requires:[{node:"FunctionDef"},{call:"line",min:3,msg:"Call line() three times."}],forbids:[{text:"=====",msg:'Let "=" * 30 make the line.'},{text:'"=" * 30',max:1,msg:'Write "=" * 30 once — inside the function.'}],hints:[`def line():
    print("=" * 30)`,"Then: line(), the title, line(), the meeting line, line()."],solution:`def line():
    print("=" * 30)

line()
print("FOOTHOLD PYTHON CLUB")
line()
print("Meets every Friday, Lab 3")
line()`},calls:{id:"calls",kind:"write",title:"Functions calling functions",task:e.jsxs(e.Fragment,{children:["Keep your ",e.jsx("code",{children:"line()"})," function. Write a second function ",e.jsx("code",{children:"header()"})," that calls ",e.jsx("code",{children:"line()"}),", prints ",e.jsx("code",{children:"MARKS REPORT"}),", then calls ",e.jsx("code",{children:"line()"})," again. Call ",e.jsx("code",{children:"header()"})," once, then print ",e.jsx("code",{children:"Priya: 87"}),"."]}),tests:[{expect:`${o}
MARKS REPORT
${o}
Priya: 87`}],requires:[{node:"FunctionDef",min:2,msg:"Define two functions: line() and header()."}],hints:[`def header():
    line()
    print("MARKS REPORT")
    line()`,"The order of the two defs doesn't matter — only that both are defined before header() is called."],solution:`def line():
    print("=" * 30)

def header():
    line()
    print("MARKS REPORT")
    line()

header()
print("Priya: 87")`},refactor:{id:"refactor",kind:"make",title:"Refactor the repeated block",task:e.jsxs(e.Fragment,{children:["The same three-line block appears three times. Move it into a function ",e.jsx("code",{children:"show_rules()"})," and call it three times. The output must not change — and the rules text should now appear only once in your code."]}),starter:`print("Round 1")
print("- Answer in 30 seconds")
print("- No phones")
print("- One attempt each")
print("Round 2")
print("- Answer in 30 seconds")
print("- No phones")
print("- One attempt each")
print("Round 3")
print("- Answer in 30 seconds")
print("- No phones")
print("- One attempt each")`,minLines:13,tests:[{expect:[1,2,3].map(n=>`Round ${n}
- Answer in 30 seconds
- No phones
- One attempt each`).join(`
`)}],requires:[{node:"FunctionDef"},{call:"show_rules",min:1,msg:"Call show_rules()."}],forbids:[{text:"No phones",max:1,msg:"The rules should be written once, inside show_rules()."}],hints:["Bonus thought: a for loop over range(1, 4) could print the Round lines too."],solution:`def show_rules():
    print("- Answer in 30 seconds")
    print("- No phones")
    print("- One attempt each")

for r in range(1, 4):
    print(f"Round {r}")
    show_rules()`}},j=r,y=[{q:"When does the body of a function run?",options:["When Python reads def","Each time the function is called","Once, at the end","Never"],answer:1,explain:"def only stores it; every call runs it."},{q:"What does this print?",code:`def hi():
    print("hi")
print("start")`,options:["hi start","start","start hi","Nothing"],answer:1,explain:"hi is defined but never called."},{q:"What's wrong with writing just show_menu (no brackets)?",options:["SyntaxError","Nothing runs — it only names the function","It calls it twice","It deletes it"],answer:1,explain:"The brackets make the call."},{q:"Why use functions?",options:["Programs run faster","Write a job once, reuse it, and change it in one place","Python requires them","To avoid variables"],answer:1,explain:"Reuse and a single place to fix bugs."},{q:"A function is called on line 1 and defined on line 5. What happens?",options:["Works","NameError","SyntaxError","It runs twice"],answer:1,explain:"Python runs top to bottom; on line 1 the name doesn't exist yet."}];function T(n){const s=[{label:"Why?",kicker:"THE NEED",title:"Name a job once, use it anywhere",blocks:[e.jsxs(d,{children:["Your programs are growing. The Marks Manager printed its report inside one long ",e.jsx("code",{children:"elif"}),"; the quiz rules got copy-pasted three times. When you copy code, every bug gets copied too, and fixing it means finding every copy. A ",e.jsx("strong",{children:"function"})," gives a block of code a name, so you write it once and run it by name."]}),r.first]},{label:"def vs call",kicker:"STORE, THEN RUN",title:"def stores the recipe; a call cooks it",blocks:[e.jsxs(d,{children:["The single most surprising fact about functions: reading ",e.jsx("code",{children:"def"})," runs ",e.jsx("em",{children:"nothing"}),". Step through:"]}),e.jsx(b,{}),r.order]},{label:"Nothing Happened?",kicker:"THREE CLASSIC BUGS",title:"When a function doesn't run",blocks:[r.silent,r.early,e.jsxs(m,{children:["A function runs only when it is ",e.jsx("strong",{children:"called"})," — with brackets — and only if its ",e.jsx("code",{children:"def"})," has already been read."]})]},{label:"Build With Them",kicker:"FUNCTIONS USING FUNCTIONS",title:"Small functions, combined",blocks:[r.card,r.calls]},{label:"Make It",kicker:"REFACTOR",title:"Your program: kill the copy-paste",blocks:[e.jsxs(d,{children:["Changing code so it works the same but is better organised is called ",e.jsx("strong",{children:"refactoring"}),". Professionals do it constantly."]}),r.refactor]}];return e.jsx(f,{...n,unitId:"Unit8_1",crumb:"MODULE 8 › UNIT 8.1",title:"Why Functions?",sections:s,quiz:y,next:{title:"Unit 8.2 — Parameters & Return Values",text:"Send values in, get answers back — plus default and keyword arguments."}})}export{j as EXERCISES,T as default};
