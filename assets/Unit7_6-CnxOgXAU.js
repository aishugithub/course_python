import{j as e}from"./index-rTKCO5Yp.js";import{P as g,N as M,T as h,K as T,L as S}from"./Lesson-o3jU_D0N.js";function I(n,i){if(!n.length)return["No students yet"];let o=0,t=0,r=n[0][0],d=n[0][1];for(const[c,s]of n)o+=s,s>=40&&t++,s>d&&(d=s,r=c);const p=[`Students: ${n.length}`,`Average: ${(o/n.length).toFixed(2)}`,`Topper: ${r} (${d})`,`Passed: ${t}/${n.length}`];if(i){const c=n.map(([s,a])=>[a,s]).sort((s,a)=>a[0]-s[0]||(s[1]<a[1]?1:s[1]>a[1]?-1:0));p.push("Merit list:"),c.slice(0,3).forEach(([s,a],l)=>p.push(`${l+1}. ${a} - ${s}`))}return p}function k(n,i){const o=n.split(" "),t=i.split(" ").map(Number);return[`Names: ${n}`,`Marks: ${i}`,...I(o.map((r,d)=>[r,t[d]]),!1)].join(`
`)}function u(n,i){const o=[...i],t=[],r=[],d=c=>{const s=o.shift();return t.push(c+s),s},p=n===3?"1. Add  2. Report  3. Search  4. Exit":"1. Add  2. Report  3. Exit";for(;;){t.push(p);const c=d("Choose: ");if(c==="1"){const s=d("Name: ").trim().toUpperCase(),a=Number(d("Mark: ")),l=r.findIndex(([v])=>v===s);l>=0?(r[l][1]=a,t.push(`Updated ${s}`)):(r.push([s,a]),t.push(`Added ${s}`))}else if(c==="2")t.push(...I(r,n===3));else if(n===3&&c==="3"){const s=d("Search: ").trim().toUpperCase(),a=r.find(([l])=>l===s);t.push(a?`${s}: ${a[1]}`:"Not found")}else if(c===(n===3?"4":"3")){t.push("Bye!");break}else t.push("Invalid choice")}return t.join(`
`)}function f(n){const i=new Map;n.toLowerCase().split(/\s+/).filter(Boolean).forEach(t=>i.set(t,(i.get(t)||0)+1));const o=[...i.entries()].sort((t,r)=>r[1]-t[1]||(t[0]<r[0]?-1:t[0]>r[0]?1:0));return[`Text: ${n}`,...o.slice(0,3).map(([t,r],d)=>`${d+1}. ${t} (${r})`)].join(`
`)}function P(){const n=[["Store each student's mark by name","dictionary","7.5"],["Read names and marks from one line each","split, zip","7.3, 7.4"],["Average, topper, pass count","sum/len, best-so-far, count","6.2, 7.3"],["Keep the program running with a menu","while True + break","6.3"],["Search without crashing","in / .get","7.5"],["Merit list, highest first","sorted list of (mark, name) tuples","7.3, 7.4"]];return e.jsx("div",{style:{border:`1px solid ${h.border}`,borderRadius:12,overflow:"hidden",maxWidth:940},children:n.map(([i,o,t],r)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1.7fr 1.7fr 0.8fr",gap:10,padding:"10px 14px",background:r%2?h.surface:h.card,fontSize:14.5},children:[e.jsx("span",{children:i}),e.jsx("code",{style:{justifySelf:"start"},children:o}),e.jsx("span",{style:{color:h.bronze,fontWeight:700},children:t})]},r))})}const x=`if marks:
    total = 0
    passed = 0
    top = ""
    best = -1
    for name, mark in marks.items():
        total += mark
        if mark >= 40:
            passed += 1
        if mark > best:
            best = mark
            top = name
    print(f"Students: {len(marks)}")
    print(f"Average: {total / len(marks):.2f}")
    print(f"Topper: {top} ({best})")
    print(f"Passed: {passed}/{len(marks)}")
else:
    print("No students yet")`,N=(n,i)=>n.split(`
`).map(o=>" ".repeat(i)+o).join(`
`),w=`names = input("Names: ").split()
marks_line = input("Marks: ").split()
marks = {}
for name, m in zip(names, marks_line):
    marks[name] = int(m)
`+x,R=`        name = input("Name: ").strip().upper()
        mark = int(input("Mark: "))
        if name in marks:
            print(f"Updated {name}")
        else:
            print(f"Added {name}")
        marks[name] = mark`,j=`marks = {}
while True:
    print("1. Add  2. Report  3. Exit")
    choice = input("Choose: ")
    if choice == "1":
`+R+`
    elif choice == "2":
`+N(x,8)+`
    elif choice == "3":
        print("Bye!")
        break
    else:
        print("Invalid choice")`,V=`    ranked = []
    for name, mark in marks.items():
        ranked.append((mark, name))
    ranked = sorted(ranked, reverse=True)
    print("Merit list:")
    for i, (mark, name) in enumerate(ranked[:3], start=1):
        print(f"{i}. {name} - {mark}")`,$=x.replace('    print(f"Passed: {passed}/{len(marks)}")',`    print(f"Passed: {passed}/{len(marks)}")
`+V),C=`marks = {}
while True:
    print("1. Add  2. Report  3. Search  4. Exit")
    choice = input("Choose: ")
    if choice == "1":
`+R+`
    elif choice == "2":
`+N($,8)+`
    elif choice == "3":
        name = input("Search: ").strip().upper()
        if name in marks:
            print(f"{name}: {marks[name]}")
        else:
            print("Not found")
    elif choice == "4":
        print("Bye!")
        break
    else:
        print("Invalid choice")`,A=["2","1","priya","87","1","Arun","35","1","PRIYA","90","2","9","3"],b=["1","meena","91","1","ravi","64","2","3"],y=["1","priya","87","1","arun","35","1","meena","91","1","ravi","87","2","3","Arun","3","kavya","4"],E=["2","3","x","1","divya","77","2","4"],m={v1:{id:"v1",kind:"write",title:"Version 1 — the report",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Names: "})," and ",e.jsx("code",{children:"Marks: "})," (one line each). Build a dictionary ",e.jsx("code",{children:"marks"})," (name → int mark) with zip. Print ",e.jsx("code",{children:"Students: 4"}),", ",e.jsx("code",{children:"Average: 69.50"}),", ",e.jsx("code",{children:"Topper: MEENA (91)"})," (the first highest wins ties) and ",e.jsx("code",{children:"Passed: 3/4"})," (pass mark 40). If there are no students print ",e.jsx("code",{children:"No students yet"})," — you'll need it in Version 2."]}),minLines:20,tests:[{inputs:["PRIYA ARUN MEENA RAVI","87 62 91 38"],expect:k("PRIYA ARUN MEENA RAVI","87 62 91 38")},{inputs:["A B","40 39"],expect:k("A B","40 39"),hidden:!0},{inputs:["X Y Z","70 99 99"],expect:k("X Y Z","70 99 99"),hidden:!0}],requires:[{call:"zip"},{call:"items"}],hints:["for name, m in zip(names, marks_line): marks[name] = int(m)","One loop over marks.items() can do the total, the pass count and the best-so-far.",'Put the whole report under if marks: … else: print("No students yet")'],solution:w},v2:{id:"v2",kind:"modify",title:"Version 2 — a menu that keeps running",task:e.jsxs(e.Fragment,{children:["Replace the two input lines with a menu: start with ",e.jsxs("code",{children:["marks = ","{}"]}),"; loop forever printing ",e.jsx("code",{children:"1. Add  2. Report  3. Exit"})," (two spaces between options) and asking ",e.jsx("code",{children:"Choose: "}),". ",e.jsx("strong",{children:"1"}),": ask ",e.jsx("code",{children:"Name: "})," (strip + upper) and ",e.jsx("code",{children:"Mark: "}),"; print ",e.jsx("code",{children:"Added PRIYA"}),", or ",e.jsx("code",{children:"Updated PRIYA"})," if the name already exists. ",e.jsx("strong",{children:"2"}),": the report. ",e.jsx("strong",{children:"3"}),": print ",e.jsx("code",{children:"Bye!"})," and stop. Anything else: ",e.jsx("code",{children:"Invalid choice"}),"."]}),starter:w,minLines:34,tests:[{inputs:A,expect:u(2,A)},{inputs:b,expect:u(2,b),hidden:!0}],requires:[{node:"While"},{node:"Break"}],hints:['Select the report lines and press Tab twice — they go under elif choice == "2":','if name in marks: print(f"Updated {name}") else: print(f"Added {name}") — then marks[name] = mark either way.'],solution:j},v3:{id:"v3",kind:"modify",title:"Version 3 — search and a merit list",task:e.jsxs(e.Fragment,{children:["Two upgrades. A new option ",e.jsx("strong",{children:"3"})," asks ",e.jsx("code",{children:"Search: "})," (strip + upper) and prints ",e.jsx("code",{children:"ARUN: 35"})," or ",e.jsx("code",{children:"Not found"}),"; Exit becomes ",e.jsx("strong",{children:"4"})," (the menu line is now ",e.jsx("code",{children:"1. Add  2. Report  3. Search  4. Exit"}),"). And the report ends with ",e.jsx("code",{children:"Merit list:"})," and the top 3 as ",e.jsx("code",{children:"1. MEENA - 91"}),". Trick: put ",e.jsx("code",{children:"(mark, name)"})," tuples in a list — ",e.jsx("code",{children:"sorted(…, reverse=True)"})," sorts by mark first."]}),starter:j,minLines:44,tests:[{inputs:y,expect:u(3,y)},{inputs:E,expect:u(3,E),hidden:!0}],requires:[{call:"sorted"},{call:"enumerate"}],hints:["Tuples compare item by item: (91, 'MEENA') > (87, 'RAVI'). Equal marks are then ordered by name.","for i, (mark, name) in enumerate(ranked[:3], start=1):","ranked[:3] is safe even with fewer than 3 students."],solution:C},words:{id:"words",kind:"make",title:"Top 3 words",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Text: "}),". Count each word (lowercase) with a dictionary, then print the three most frequent as ",e.jsx("code",{children:"1. the (3)"})," — most frequent first, ties in alphabetical order. Trick: sort ",e.jsx("code",{children:"(-count, word)"})," tuples in normal order."]}),minLines:9,tests:[{inputs:["the cat and the dog and the bird"],expect:f("the cat and the dog and the bird")},{inputs:["b a b a c"],expect:f("b a b a c"),hidden:!0},{inputs:["One"],expect:f("One"),hidden:!0}],requires:[{call:"get"},{call:"sorted"}],hints:["counts[w] = counts.get(w, 0) + 1","ranked = sorted of (-n, w) tuples — negative counts make the biggest count come first.",'for i, (neg, w) in enumerate(ranked[:3], start=1): print(f"{i}. {w} ({-neg})")'],solution:`counts = {}
for w in input("Text: ").lower().split():
    counts[w] = counts.get(w, 0) + 1
ranked = []
for w, n in counts.items():
    ranked.append((-n, w))
ranked = sorted(ranked)
for i, (neg, w) in enumerate(ranked[:3], start=1):
    print(f"{i}. {w} ({-neg})")`}},Y=m,U=[{q:"Why does the Marks Manager use a dictionary instead of two lists?",options:["It's faster to type","Each mark stays attached to its name; lookup by name needs no searching","Lists can't hold names","Dictionaries are sorted"],answer:1,explain:"Parallel lists can drift out of line; a dict keeps the pair together."},{q:"Adding PRIYA a second time…",options:["Creates a second PRIYA","Overwrites her mark (keys are unique)","Crashes","Is ignored"],answer:1,explain:"That's why the program prints Updated."},{q:"sorted([(87, 'RAVI'), (91, 'MEENA'), (87, 'PRIYA')], reverse=True) starts with…",options:["(87, 'RAVI')","(91, 'MEENA')","(87, 'PRIYA')","Error"],answer:1,explain:"Tuples compare the first item first: 91 is biggest."},{q:"What stops the menu loop?",options:["The condition becoming False","break after printing Bye!","Ctrl+C only","Report"],answer:1,explain:"while True only ends with break."},{q:"Why ranked[:3] rather than ranked[0], ranked[1], ranked[2]?",options:["Style only","A slice never crashes, even with fewer than 3 students","It's faster","It sorts"],answer:1,explain:"Indexing past the end is an IndexError; slicing just returns what's there."}];function B(n){const i=[{label:"The Mission",kicker:"CAPSTONE",title:"Student Marks Manager",blocks:[e.jsx(g,{children:"A teacher wants a small program to enter marks and get a class report. You'll build it in three versions — each one working before the next begins. Everything you need:"}),e.jsx(P,{}),e.jsx(M,{color:h.blue,icon:"🧱",children:"The pass mark is 40 throughout the course. Names are stored in capitals so “priya” and “PRIYA” are the same student."})]},{label:"Version 1",kicker:"BUILD IN STEPS",title:"Version 1: the report",blocks:[m.v1]},{label:"Version 2",kicker:"ADD ONE IDEA",title:"Version 2: a menu loop",blocks:[m.v2]},{label:"Version 3",kicker:"ADD ONE MORE",title:"Version 3: search and merit list",blocks:[m.v3,e.jsx(T,{children:"This program already has the shape of real software: data in a dictionary, a loop that waits for commands, and separate jobs for each choice. Module 8 will split those jobs into functions; Module 9 will save the data to a file."})]},{label:"Make It",kicker:"ON YOUR OWN",title:"Your program: top 3 words",blocks:[e.jsx(g,{children:"Counting with a dict, then ranking with sorted tuples — the same two ideas, a new problem."}),m.words]}];return e.jsx(S,{...n,unitId:"Unit7_6",crumb:"MODULE 7 › UNIT 7.7",title:"Capstone: Student Marks Manager",sections:i,quiz:U,next:{title:"Computational Thinking II",text:"Module 7 complete! Next: the classic algorithms on data — searching, sorting, matrices. (Optional first: Module 7's Crucible.)"}})}export{Y as EXERCISES,B as default};
