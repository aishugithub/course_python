import{r as u,j as t}from"./index-cyK8cdeM.js";const e={bg:"#0D1117",surface:"#161B22",card:"#1C2333",accent:"#58A6FF",accentGlow:"#1F6FEB",green:"#3FB950",yellow:"#D29922",purple:"#BC8CFF",red:"#F85149",orange:"#F0883E",teal:"#39D0D8",text:"#E6EDF3",muted:"#8B949E",border:"#30363D"},B={fontFamily:"monospace",fontSize:12.5,color:e.text,margin:0,lineHeight:1.8,whiteSpace:"pre-wrap"},z=(a,s)=>t.jsxs("div",{style:{marginTop:16,background:a+"18",border:`1px solid ${a}44`,borderRadius:8,padding:"12px 16px",fontSize:13,color:e.muted,lineHeight:1.7},children:["🔑 ",s]}),S=a=>a>=90?"A":a>=75?"B":a>=50?"C":"F";function $(){const a=[{tool:"def + calls",from:"Unit 8.1",why:"each job gets a named function, written once"},{tool:"parameters & return",from:"Unit 8.2",why:"grade(mark) in → letter out; stats handed back, not just printed"},{tool:"clean scope",from:"Unit 8.3",why:"each function keeps its own locals — nothing leaks or clashes"},{tool:"dict of students",from:"Unit 7.4",why:"names → marks, the data heart of the app"},{tool:"accumulate / count / best-so-far",from:"Unit 7.3",why:"average, pass count, topper — inside class_stats()"},{tool:"while True menu + break",from:"Units 6.1 & 6.3",why:"the app runs until Exit"},{tool:"if / elif / else",from:"Unit 5.2",why:"menu routing and the grading scale"}],[s,l]=u.useState([]),i=r=>l(o=>o.includes(r)?o.filter(h=>h!==r):[...o,r]);return t.jsxs("div",{children:[t.jsxs("p",{style:{color:e.muted,fontSize:13,marginBottom:16,lineHeight:1.7},children:["Your final mission: rebuild the Marks Manager ",t.jsx("strong",{style:{color:e.text},children:"the way professional software is written"})," — same features (add students, full report, menu), but organized into named, reusable, testable functions. Plus one upgrade: grades in the report. Tick off your toolkit — it now spans FOUR modules."]}),t.jsxs("div",{style:{background:e.card,border:`1px solid ${e.border}`,borderRadius:10,padding:16,marginBottom:14},children:[t.jsx("div",{style:{color:e.orange,fontWeight:700,fontSize:12,marginBottom:12},children:"📋 THE SPEC — Marks Manager 2.0"}),t.jsx("pre",{style:B,children:`grade(mark)         → returns "A" / "B" / "C" / "F"
class_stats(marks)  → RETURNS (average, topper, best, passed)
print_report(marks) → prints stats + every student's grade
main menu           → add / report / exit, now ~15 clean lines`})]}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:a.map((r,o)=>t.jsxs("div",{onClick:()=>i(o),style:{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:8,background:s.includes(o)?e.green+"14":e.card,border:`1.5px solid ${s.includes(o)?e.green:e.border}`,cursor:"pointer",transition:"all 0.2s"},children:[t.jsx("div",{style:{width:22,height:22,borderRadius:6,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${s.includes(o)?e.green:e.muted}`,background:s.includes(o)?e.green:"transparent",color:"#fff",fontSize:13,fontWeight:700},children:s.includes(o)?"✓":""}),t.jsxs("div",{children:[t.jsx("span",{style:{fontFamily:"monospace",fontSize:12.5,color:s.includes(o)?e.green:e.text,fontWeight:600},children:r.tool}),t.jsxs("span",{style:{fontSize:11.5,color:e.accent,marginLeft:8},children:["(",r.from,")"]}),t.jsx("div",{style:{fontSize:11.5,color:e.muted,marginTop:2},children:r.why})]})]},o))}),s.length===a.length&&t.jsx("div",{style:{marginTop:14,padding:"12px 16px",borderRadius:8,background:e.green+"18",border:`1px solid ${e.green}55`,color:e.green,fontSize:13,fontWeight:600,textAlign:"center"},children:"🎯 Four modules of tools, one program. Let's refactor!"}),z(e.purple,t.jsxs(t.Fragment,{children:[t.jsx("strong",{style:{color:e.purple},children:"Refactoring = same behaviour, better structure."})," The program will do exactly what 7.5's did (plus grades) — but organized so a stranger could read it, test one piece, or fix one bug without touching the rest. That's the skill employers actually pay for."]}))]})}function W(){const[a,s]=u.useState(0),l=[{label:"v1 — the monolith (7.5)",note:"Where we left off: everything works, but ALL the logic is squeezed inside one elif — 25 lines deep in the menu.",warn:"Try explaining this block to a friend, or testing JUST the average without running the whole menu. One bug anywhere means digging through everything. Readable? Barely. Reusable? Not at all.",color:e.red,code:`while True:
    choice = input("Choose: ")
    if choice == "1":
        # ...add student lines...
    elif choice == "2":
        total = 0
        passed = 0
        topper = ""
        best = -1
        for name in marks:
            m = marks[name]
            total = total + m
            if m >= 50:
                passed = passed + 1
            if m > best:
                best = m
                topper = name
        # ...8 more print lines...
    elif choice == "3":
        break`},{label:"v2 — extract functions",note:"Unit 8.1's move: name the blocks. grade() and print_report() move OUT of the menu; the main loop collapses into something you can read aloud.",warn:"Better! But print_report still only PRINTS. What if tomorrow's feature needs the average as a NUMBER — say, to compare two classes? Printed text can't be reused (Unit 8.2's None trap).",color:e.yellow,code:`def grade(mark):
    ...

def print_report(marks):
    ...all the stats logic...

marks = {}
while True:
    print("1. Add  2. Report  3. Exit")
    choice = input("Choose: ")
    if choice == "1":
        name = input("Name: ")
        mark = int(input("Mark: "))
        marks[name] = mark
    elif choice == "2":
        print_report(marks)   # one line!
    elif choice == "3":
        break`},{label:"v3 — compute, then return",note:"The professional split: class_stats() COMPUTES and returns a tuple (Unit 7.4!); print_report() only DISPLAYS. Calculation and presentation, separated.",warn:null,color:e.green,code:`def class_stats(marks):
    total = 0
    passed = 0
    topper = ""
    best = -1
    for name in marks:
        m = marks[name]
        total = total + m
        if m >= 50:
            passed = passed + 1
        if m > best:
            best = m
            topper = name
    average = total / len(marks)
    return (average, topper, best, passed)

def print_report(marks):
    stats = class_stats(marks)
    print("Average:", stats[0])
    print("Topper:", stats[1], "with", stats[2])
    print("Passed:", stats[3], "of", len(marks))
    for name in marks:
        print(" ", name, "→", grade(marks[name]))`}],i=l[a];return t.jsxs("div",{children:[t.jsxs("p",{style:{color:e.muted,fontSize:13,marginBottom:16,lineHeight:1.7},children:["We're not writing from scratch — we're ",t.jsx("em",{children:"improving"})," working code in three passes, each fixing one specific pain."]}),t.jsx("div",{style:{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"},children:l.map((r,o)=>t.jsx("button",{onClick:()=>s(o),style:{padding:"8px 14px",borderRadius:8,fontSize:12.5,fontWeight:600,cursor:"pointer",background:a===o?r.color+"22":e.card,color:a===o?r.color:e.muted,border:`1.5px solid ${a===o?r.color:e.border}`},children:r.label},o))}),t.jsxs("div",{style:{background:e.card,border:`1.5px solid ${i.color}55`,borderRadius:10,padding:16,marginBottom:12},children:[t.jsx("div",{style:{fontSize:12.5,color:i.color,fontWeight:600,marginBottom:10,lineHeight:1.6},children:i.note}),t.jsx("pre",{style:{...B,maxHeight:320,overflowY:"auto"},children:i.code})]}),i.warn&&t.jsxs("div",{style:{background:e.red+"12",border:`1px solid ${e.red}44`,borderRadius:8,padding:"10px 14px",fontSize:12.5,color:e.muted,lineHeight:1.6},children:["⛔ ",t.jsx("strong",{style:{color:e.red},children:"Why we keep going:"})," ",i.warn]}),!i.warn&&t.jsxs("div",{style:{background:e.green+"12",border:`1px solid ${e.green}44`,borderRadius:8,padding:"10px 14px",fontSize:12.5,color:e.muted,lineHeight:1.6},children:["✅ ",t.jsx("strong",{style:{color:e.green},children:"Why this is the pro pattern:"})," class_stats() can now serve the report, a future compare-two-classes feature, a file export — anything. Compute once, reuse everywhere. And note the tuple: one return carrying four answers."]}),z(e.accent,t.jsxs(t.Fragment,{children:[t.jsx("strong",{style:{color:e.accent},children:"Separate computing from displaying."})," Functions that RETURN data can feed anything; functions that only print can feed only eyeballs. When in doubt, return — the caller can always print it."]}))]})}function F(){const[a,s]=u.useState({}),[l,i]=u.useState(""),[r,o]=u.useState(75),[h,x]=u.useState([{t:"sys",s:"Marks Manager 2.0 — watch the CALL LOG show which function does each job!"}]),[y,b]=u.useState([]),p=n=>x(d=>[...d.slice(-12),...n]),c=n=>b(d=>[...d.slice(-5),...n]),g=()=>{const n=l.trim().toUpperCase();if(!n){p([{t:"err",s:"Name cannot be empty!"}]);return}s(d=>({...d,[n]:r})),c([`grade(${r}) → "${S(r)}"`]),p([{t:"in",s:`> add ${n}, ${r}`},{t:"ok",s:`${n} recorded with grade ${S(r)}.`}]),i("")},f=()=>{const n=Object.entries(a);if(p([{t:"in",s:"> report"}]),c(["print_report(marks)"]),n.length===0){p([{t:"err",s:"No students yet!  (early return — Unit 8.2!)"}]);return}let d=0,R=0,w=-1,C="";n.forEach(([k,v])=>{d+=v,v>=50&&(R+=1),v>w&&(w=v,C=k)});const T=(d/n.length).toFixed(1);c([`class_stats(marks) → (${T}, "${C}", ${w}, ${R})`]),p([{t:"out",s:`Average: ${T}   Topper: ${C} (${w})   Passed: ${R}/${n.length}`},...n.map(([k,v])=>({t:"out",s:`  ${k} → ${S(v)}`}))]),c(n.map(([,k])=>`grade(${k}) → "${S(k)}"`).slice(0,3))},m=()=>{s({}),i(""),o(75),b([]),x([{t:"sys",s:"Fresh start."}])},j={sys:e.muted,in:e.accent,ok:e.green,out:e.text,err:e.red};return t.jsxs("div",{children:[t.jsx("p",{style:{color:e.muted,fontSize:13,marginBottom:16,lineHeight:1.7},children:"v3, alive — and this time you can see the machinery. Every button press routes work to a function; the call log shows each call and what it returned."}),t.jsxs("div",{style:{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"flex-end"},children:[t.jsxs("div",{children:[t.jsx("label",{style:{color:e.muted,fontSize:11,display:"block",marginBottom:4},children:"Student name"}),t.jsx("input",{value:l,onChange:n=>i(n.target.value),onKeyDown:n=>n.key==="Enter"&&g(),placeholder:"e.g. PRIYA",style:{padding:"9px 12px",borderRadius:8,background:e.card,color:e.text,fontSize:13,border:`1.5px solid ${e.border}`,outline:"none",width:130,fontFamily:"monospace"}})]}),t.jsxs("div",{style:{minWidth:140},children:[t.jsxs("label",{style:{color:e.muted,fontSize:11,display:"block",marginBottom:4},children:["Mark: ",t.jsx("strong",{style:{color:e.accent},children:r})]}),t.jsx("input",{type:"range",min:0,max:100,value:r,onChange:n=>o(Number(n.target.value)),style:{width:"100%",accentColor:e.accent}})]}),t.jsx("button",{onClick:g,style:{padding:"9px 14px",borderRadius:8,background:e.green+"22",color:e.green,border:`1.5px solid ${e.green}`,fontWeight:600,fontSize:12.5,cursor:"pointer"},children:"+ Add"}),t.jsx("button",{onClick:f,style:{padding:"9px 14px",borderRadius:8,background:e.accentGlow,color:"#fff",border:"none",fontWeight:600,fontSize:12.5,cursor:"pointer"},children:"📋 Report"}),t.jsx("button",{onClick:m,style:{padding:"9px 12px",borderRadius:8,background:e.card,color:e.muted,border:`1.5px solid ${e.border}`,fontWeight:600,fontSize:12.5,cursor:"pointer"},children:"↺"})]}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:12},children:[t.jsxs("div",{style:{background:"#010409",border:`1px solid ${e.border}`,borderRadius:10,padding:14,minHeight:170},children:[t.jsx("div",{style:{color:e.muted,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:8},children:"CONSOLE"}),h.map((n,d)=>t.jsx("div",{style:{fontFamily:"monospace",fontSize:12,lineHeight:1.75,color:j[n.t],whiteSpace:"pre-wrap"},children:n.s},d))]}),t.jsxs("div",{style:{background:e.card,border:`1px solid ${e.purple}44`,borderRadius:10,padding:14,minHeight:170},children:[t.jsx("div",{style:{color:e.purple,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:8},children:"CALL LOG — functions at work"}),y.length===0?t.jsx("div",{style:{color:e.muted,fontSize:12},children:"No calls yet — add a student!"}):y.map((n,d)=>t.jsx("div",{style:{fontFamily:"monospace",fontSize:11.5,lineHeight:1.8,color:e.purple},children:n},d))]})]}),z(e.green,t.jsxs(t.Fragment,{children:[t.jsx("strong",{style:{color:e.green},children:"Each frame opens, works, returns, and vanishes"})," (Unit 8.3) — yet the program feels seamless. That's modular software: small machines, cleanly connected, each doing one job well."]}))]})}function U(){const a=`# Student Marks Manager 2.0 — modular edition
# Foothold Module 8 Grand Capstone (Modules 5-8)

def grade(mark):
    if mark >= 90:
        return "A"
    elif mark >= 75:
        return "B"
    elif mark >= 50:
        return "C"
    else:
        return "F"

def class_stats(marks):
    total = 0
    passed = 0
    topper = ""
    best = -1
    for name in marks:
        m = marks[name]
        total = total + m
        if m >= 50:
            passed = passed + 1
        if m > best:
            best = m
            topper = name
    average = total / len(marks)
    return (average, topper, best, passed)

def print_report(marks):
    if len(marks) == 0:
        print("No students yet!")
        return              # early exit — nothing to report
    stats = class_stats(marks)
    print("Class average:", stats[0])
    print("Topper:", stats[1], "with", stats[2])
    print("Passed:", stats[3], "of", len(marks))
    for name in marks:
        print(" ", name, "→", grade(marks[name]))

# ── main program ──
marks = {}
while True:
    print()
    print("1. Add student  2. Class report  3. Exit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Student name: ")
        mark = int(input("Mark (0-100): "))
        marks[name] = mark
        print(name, "recorded with grade", grade(mark))
    elif choice == "2":
        print_report(marks)
    elif choice == "3":
        print("Goodbye!")
        break
    else:
        print("Please choose 1, 2 or 3.")`,s=[{icon:"🥉",text:"Add remove_student(marks): ask for a name, check it with in first (Unit 7.4), then del marks[name]. Wire it in as menu option 4."},{icon:"🥈",text:"Write merit_list(marks) that RETURNS a list of the top-3 marks (sort + slice, Unit 7.3) — then let print_report call it."},{icon:"🥇",text:"The graduation challenge: go back to Unit 6.4's Number-Guessing Game and rebuild IT with functions — get_guess(), give_hint(guess, secret), play(). You'll feel the difference."}];return t.jsxs("div",{children:[t.jsx("p",{style:{color:e.muted,fontSize:13,marginBottom:16,lineHeight:1.7},children:"The complete program — compare it, line by line, with Unit 7.5's version. Same features, plus grades, and every piece has a name and a home. Type it into real Python and run it."}),t.jsx("div",{style:{background:e.card,border:`1px solid ${e.border}`,borderRadius:10,padding:16,marginBottom:16,maxHeight:420,overflowY:"auto"},children:t.jsx("pre",{style:B,children:a})}),t.jsxs("div",{style:{background:e.card,border:`1px solid ${e.border}`,borderRadius:8,padding:"10px 14px",fontSize:12.5,color:e.muted,lineHeight:1.8,marginBottom:16},children:["Bonus peek: pythonistas often unpack a returned tuple in one line —",t.jsx("code",{style:{color:e.teal},children:" avg, topper, best, passed = class_stats(marks)"}),". Four lockers filled at once. Try it after the challenges!"]}),t.jsx("div",{style:{color:e.orange,fontWeight:700,fontSize:13,marginBottom:10},children:"⚡ CHALLENGE UPGRADES"}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:s.map((l,i)=>t.jsxs("div",{style:{display:"flex",gap:10,background:e.card,border:`1px solid ${e.border}`,borderRadius:8,padding:"10px 14px",fontSize:12.5,color:e.muted,lineHeight:1.6},children:[t.jsx("span",{style:{fontSize:16},children:l.icon}),t.jsx("span",{children:l.text})]},i))}),z(e.purple,t.jsxs(t.Fragment,{children:[t.jsx("strong",{style:{color:e.purple},children:"One thing this program still can't survive:"}),' type "eighty" as a mark and ',t.jsx("code",{style:{color:e.red},children:"int()"})," crashes the whole app. And when it closes, every student is forgotten. Handling bad input and remembering data — that's exactly what comes after Module 8."]}))]})}function M({onComplete:a}){const s=[{q:"v1 (monolith) and v3 (functions) behave identically for the user. Why is v3 still better?",options:["v3 runs measurably faster","Each job is named, testable alone, and fixable in one place","Python limits how long a while block can be","v3 uses less memory"],answer:1,explain:"Refactoring doesn't change behaviour — it changes structure. Named pieces can be read, tested, reused and fixed independently. Speed is not the point."},{q:`stats = class_stats(marks)
# class_stats returns (average, topper, best, passed)

How do you get the topper's name?`,options:["stats[0]","stats[1]","stats[topper]",'stats["topper"]'],answer:1,explain:"The returned tuple is indexed like any sequence (Unit 7.4 + 7.1): position 0 is average, position 1 is topper."},{q:`def print_report(marks):
    if len(marks) == 0:
        print("No students yet!")
        return
    ...20 more lines...

With an empty dict, what runs after the return?`,options:["The 20 lines, but skipping prints","Nothing — return exits the function immediately","Python raises an error","The function restarts"],answer:1,explain:"return — even with no value — ends the function on the spot. The 'early return' guard is a beloved real-world pattern for handling edge cases first."},{q:"While grade(87) is running, where does its mark variable (holding 87) live?",options:["In the global room, next to marks","In grade()'s own stack frame, destroyed when it returns","Inside the marks dict","In the print_report frame"],answer:1,explain:"Unit 8.3's picture: every call gets its own frame; mark = 87 lives there and vanishes when grade returns its letter."}],[l,i]=u.useState(0),[r,o]=u.useState(null),[h,x]=u.useState(0),[y,b]=u.useState(!1),p=f=>{r===null&&(o(f),f===s[l].answer&&x(m=>m+1))},c=()=>{l<s.length-1?(i(f=>f+1),o(null)):(b(!0),a&&a())};if(y)return t.jsxs("div",{style:{textAlign:"center",padding:20},children:[t.jsx("div",{style:{fontSize:52},children:h>=3?"🏆":"👍"}),t.jsxs("div",{style:{fontSize:24,fontWeight:700,color:e.text,marginTop:10},children:["You scored ",h," / ",s.length]}),t.jsx("div",{style:{color:e.muted,marginTop:8,marginBottom:20},children:h===4?"Perfect! You think in functions now.":h>=2?"Good work! Revisit 'Build in Steps' — the v1→v3 journey is the heart of this unit.":"Worth a replay: walk 'Build in Steps' again and ask at each version: what pain does the next one fix?"}),t.jsxs("div",{style:{padding:"20px",borderRadius:12,background:`linear-gradient(135deg, ${e.green}22, ${e.purple}22)`,border:`1px solid ${e.green}55`},children:[t.jsx("div",{style:{color:e.green,fontWeight:700,fontSize:16,marginBottom:8},children:"🏆 Module 8 Complete — ALL FOUR PILLARS! 🎉"}),t.jsxs("div",{style:{color:e.muted,fontSize:13,lineHeight:1.7},children:[t.jsx("strong",{style:{color:e.text},children:"Decide. Repeat. Organize. Modularize."})," From your first print() in Module 4 to a modular application in Module 8 — you now hold the complete foundation of programming, in any language, for life.",t.jsx("br",{}),t.jsx("br",{}),t.jsx("strong",{style:{color:e.accent},children:"Next: making programs tough and permanent."}),' Exceptions — surviving "eighty" typed as a mark — and files, so your data outlives the program. The foundation is done; now we build up.']})]})]});const g=s[l];return t.jsxs("div",{children:[t.jsxs("div",{style:{color:e.muted,fontSize:12,marginBottom:8},children:["Question ",l+1," of ",s.length]}),t.jsx("div",{style:{color:e.text,fontWeight:600,fontSize:14,marginBottom:16,whiteSpace:"pre-wrap",fontFamily:g.q.includes(`
`)?"monospace":"inherit"},children:g.q}),t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:g.options.map((f,m)=>{let j=e.card,n=e.border,d=e.text;return r!==null&&(m===g.answer?(j=e.green+"22",n=e.green,d=e.green):m===r&&(j=e.red+"22",n=e.red,d=e.red)),t.jsxs("button",{onClick:()=>p(m),style:{textAlign:"left",padding:"10px 14px",borderRadius:8,background:j,border:`1.5px solid ${n}`,color:d,cursor:r!==null?"default":"pointer",fontSize:13,transition:"all 0.25s"},children:[m===g.answer&&r!==null?"✓ ":m===r&&r!==g.answer?"✗ ":"",f]},m)})}),r!==null&&t.jsxs("div",{style:{marginTop:12,padding:"10px 14px",borderRadius:8,background:e.purple+"18",border:`1px solid ${e.purple}44`,color:e.muted,fontSize:13,lineHeight:1.6},children:["💡 ",g.explain]}),r!==null&&t.jsx("button",{onClick:c,style:{marginTop:14,padding:"10px 24px",borderRadius:8,background:e.accentGlow,border:"none",color:"#fff",fontWeight:600,cursor:"pointer",fontSize:14},children:l<s.length-1?"Next Question →":"See Results"})]})}function E({student:a,onUnitComplete:s}){const l=[{id:"mission",label:"The Mission"},{id:"steps",label:"Build in Steps"},{id:"play",label:"Play It"},{id:"code",label:"Full Code"},{id:"quiz",label:"Quiz & Wrap-up"}],[i,r]=u.useState(0),[o,h]=u.useState([]),x=p=>{o.includes(p)||h(c=>[...c,p])},y=()=>{x(i),r(p=>Math.min(l.length-1,p+1))},b=[t.jsxs("div",{children:[t.jsx("h3",{style:{color:e.text,marginBottom:6},children:"The Mission: Marks Manager 2.0"}),t.jsx($,{})]}),t.jsxs("div",{children:[t.jsx("h3",{style:{color:e.text,marginBottom:6},children:"Refactor in Three Versions"}),t.jsx(W,{})]}),t.jsxs("div",{children:[t.jsx("h3",{style:{color:e.text,marginBottom:6},children:"Play It: Watch the Functions Work"}),t.jsx(F,{})]}),t.jsxs("div",{children:[t.jsx("h3",{style:{color:e.text,marginBottom:6},children:"The Full Code — Run It For Real"}),t.jsx(U,{})]}),t.jsxs("div",{children:[t.jsx("h3",{style:{color:e.text,marginBottom:6},children:"Quick Quiz"}),t.jsx("p",{style:{color:e.muted,fontSize:13,marginBottom:20},children:"4 questions on modular thinking — your final quiz of the four pillars."}),t.jsx(M,{onComplete:()=>{x(4),s&&s()}})]})];return t.jsxs("div",{style:{background:e.bg,minHeight:"100vh",fontFamily:"'Segoe UI', system-ui, sans-serif",color:e.text,paddingBottom:40},children:[t.jsxs("div",{style:{background:e.surface,borderBottom:`1px solid ${e.border}`,padding:"14px 24px",display:"flex",alignItems:"center",gap:12},children:[t.jsx("div",{style:{width:32,height:32,borderRadius:8,background:e.accentGlow,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16},children:"🐍"}),t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:12,color:e.muted,letterSpacing:1},children:"MODULE 8 › UNIT 8.4"}),t.jsx("div",{style:{fontSize:15,fontWeight:600},children:"Grand Capstone: Marks Manager 2.0"})]}),t.jsxs("div",{style:{marginLeft:"auto",fontSize:12,color:e.muted},children:[o.length," / ",l.length," done"]})]}),t.jsx("div",{style:{height:3,background:e.border},children:t.jsx("div",{style:{height:"100%",width:`${o.length/l.length*100}%`,background:e.green,transition:"width 0.4s ease"}})}),t.jsxs("div",{style:{maxWidth:780,margin:"0 auto",padding:"24px 16px"},children:[t.jsx("div",{style:{display:"flex",gap:4,marginBottom:24,background:e.surface,borderRadius:10,padding:4,border:`1px solid ${e.border}`,flexWrap:"wrap"},children:l.map((p,c)=>t.jsxs("button",{onClick:()=>r(c),style:{flex:1,minWidth:80,padding:"8px 6px",borderRadius:7,background:i===c?e.accentGlow:"transparent",border:"none",color:i===c?"#fff":e.muted,cursor:"pointer",fontSize:11,fontWeight:i===c?600:400,display:"flex",alignItems:"center",justifyContent:"center",gap:4,transition:"all 0.2s"},children:[o.includes(c)&&t.jsx("span",{style:{color:e.green},children:"✓"}),p.label]},c))}),t.jsx("div",{style:{background:e.surface,borderRadius:12,padding:"24px 20px",border:`1px solid ${e.border}`,minHeight:300},children:b[i]}),i<l.length-1&&t.jsx("button",{onClick:y,style:{marginTop:16,width:"100%",padding:"12px",borderRadius:8,background:e.accentGlow,border:"none",color:"#fff",fontWeight:600,fontSize:14,cursor:"pointer"},children:"Mark Complete & Continue →"})]})]})}export{E as default};
