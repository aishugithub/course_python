import{j as e}from"./index-B7nVsXSH.js";import{P as S,T as c,N as T,K as $,L as V}from"./Lesson-TE-z-zj8.js";const y=n=>`import os
`+Object.entries(n).map(([s,i])=>i===null?`if os.path.exists(${JSON.stringify(s)}): os.remove(${JSON.stringify(s)})`:`with open(${JSON.stringify(s)}, "w") as _f: _f.write(${JSON.stringify(i)})`).join(`
`),F=n=>n>=90?"A":n>=75?"B":n>=60?"C":n>=40?"D":"F";function O(n){if(!n.length)return["No students yet"];let s=0,i=0,r=n[0][0],t=n[0][1];const d=[];for(const[k,o]of n)d.push(`${k}: ${o} (${F(o)})`),s+=o,o>=40&&i++,o>t&&(t=o,r=k);return d.push(`Average: ${(s/n.length).toFixed(2)}`,`Topper: ${r} (${t})`,`Passed: ${i}/${n.length}`),d}function I(n,s,i){const r=[],t=[];let d=0;if(n!==null)for(const l of n.split(`
`)){if(l==="")continue;const a=l.trim().split(",");if(i===3&&(a.length!==2||!/^-?\d+$/.test(a[1].trim()))){d++;continue}t.push([a[0],Number(a[1])])}r.push(d?`Loaded ${t.length} students (${d} bad lines skipped)`:`Loaded ${t.length} students`);const k=[...s],o=l=>{const a=k.shift();return r.push(l+a),a};for(;;){r.push("1. Add  2. Report  3. Exit");const l=o("Choose: ");if(l==="1"){const a=o("Name: ").trim().toUpperCase();let u;if(i>=2)for(;;){const m=o("Mark: ");if(/^-?\d+$/.test(m.trim())&&Number(m)>=0&&Number(m)<=100){u=Number(m);break}r.push("Enter a whole number from 0 to 100")}else u=Number(o("Mark: "));const v=t.findIndex(([m])=>m===a);v>=0?(t[v][1]=u,r.push(`Updated ${a}`)):(t.push([a,u]),r.push(`Added ${a}`))}else if(l==="2")r.push(...O(t));else if(l==="3"){r.push(`Saved ${t.length} students`,"Bye!");break}else r.push("Invalid choice")}return{out:r.join(`
`),file:t.map(([l,a])=>`${l},${a}
`).join("")}}const f=`def grade(mark):
    if mark >= 90:
        return "A"
    elif mark >= 75:
        return "B"
    elif mark >= 60:
        return "C"
    elif mark >= 40:
        return "D"
    return "F"`,g=`def class_stats(marks):
    total = 0
    passed = 0
    topper = ""
    best = -1
    for name, mark in marks.items():
        total += mark
        if mark >= 40:
            passed += 1
        if mark > best:
            best = mark
            topper = name
    return total / len(marks), topper, best, passed`,x=`def print_report(marks):
    if not marks:
        print("No students yet")
        return
    for name, mark in marks.items():
        print(f"{name}: {mark} ({grade(mark)})")
    avg, topper, best, passed = class_stats(marks)
    print(f"Average: {avg:.2f}")
    print(f"Topper: {topper} ({best})")
    print(f"Passed: {passed}/{len(marks)}")`,b=`def add_student(marks, name, mark):
    if name in marks:
        message = f"Updated {name}"
    else:
        message = f"Added {name}"
    marks[name] = mark
    return message`,N=`def load_marks(filename):
    marks = {}
    try:
        with open(filename) as f:
            for line in f:
                name, mark = line.strip().split(",")
                marks[name] = int(mark)
    except FileNotFoundError:
        pass
    return marks`,_=`def save_marks(marks, filename):
    with open(filename, "w") as f:
        for name, mark in marks.items():
            f.write(f"{name},{mark}\\n")`,M=`def read_mark():
    while True:
        try:
            mark = int(input("Mark: "))
            if 0 <= mark <= 100:
                return mark
        except ValueError:
            pass
        print("Enter a whole number from 0 to 100")`,L=`def load_marks(filename):
    marks = {}
    skipped = 0
    try:
        with open(filename) as f:
            for line in f:
                parts = line.strip().split(",")
                if len(parts) != 2:
                    skipped += 1
                    continue
                try:
                    marks[parts[0]] = int(parts[1])
                except ValueError:
                    skipped += 1
    except FileNotFoundError:
        pass
    return marks, skipped`,j=(n,s)=>`

${n}
while True:
    print("1. Add  2. Report  3. Exit")
    choice = input("Choose: ")
    if choice == "1":
        name = input("Name: ").strip().upper()
        mark = ${s}
        print(add_student(marks, name, mark))
    elif choice == "2":
        print_report(marks)
    elif choice == "3":
        save_marks(marks, "marks.txt")
        print(f"Saved {len(marks)} students")
        print("Bye!")
        break
    else:
        print("Invalid choice")`,U=[f,g,x,b].join(`

`)+`

marks = {}
while True:
    print("1. Add  2. Report  3. Exit")
    choice = input("Choose: ")
    if choice == "1":
        name = input("Name: ").strip().upper()
        mark = int(input("Mark: "))
        print(add_student(marks, name, mark))
    elif choice == "2":
        print_report(marks)
    elif choice == "3":
        print("Bye!")
        break
    else:
        print("Invalid choice")`,R=`marks = load_marks("marks.txt")
print(f"Loaded {len(marks)} students")`,A=[f,g,x,b,N,_].join(`

`)+j(R,'int(input("Mark: "))'),E=[f,g,x,b,N,_,M].join(`

`)+j(R,"read_mark()"),C=`marks, skipped = load_marks("marks.txt")
if skipped:
    print(f"Loaded {len(marks)} students ({skipped} bad lines skipped)")
else:
    print(f"Loaded {len(marks)} students")`,P=[f,g,x,b,L,_,M].join(`

`)+j(C,"read_mark()"),w=`PRIYA,87
ARUN,62
`,D=n=>`with open("marks.txt") as _f:
    _got = _f.read()
assert _got == ${JSON.stringify(n)}, "marks.txt should hold one NAME,MARK line per student. It holds: " + repr(_got)`,q=["1","meena","91","1","arun","70","2","3"],Y=["2","1","ravi","64","3"],W=["1","divya","ninety","150","95","3"],B=["2","3"],p=(n,s,i,r)=>{const t=I(n,s,i);return{setup:y({"marks.txt":n}),inputs:s,expect:t.out,hidden:r,post:D(t.file)}},h={v1:{id:"v1",kind:"modify",title:"Version 1 — load at start, save on exit",task:e.jsxs(e.Fragment,{children:["Your Module 8 manager is below, but it forgets everything on exit. Add ",e.jsx("code",{children:"load_marks(filename)"}),", which returns a dict read from ",e.jsx("code",{children:"marks.txt"})," (an ",e.jsx("strong",{children:"empty dict if the file doesn't exist"}),"), and ",e.jsx("code",{children:"save_marks(marks, filename)"}),", which writes one ",e.jsx("code",{children:"NAME,MARK"})," line per student. Load at the start and print ",e.jsx("code",{children:"Loaded 2 students"}),"; on Exit, save, then print ",e.jsx("code",{children:"Saved 3 students"})," and ",e.jsx("code",{children:"Bye!"}),"."]}),starter:U,minLines:70,tests:[p(w,q,1,!1),p(null,Y,1,!0)],requires:[{node:"With",min:2},{node:"Try"}],hints:["load_marks: try: with open(...) as f: for line in f: … except FileNotFoundError: pass — then return marks.",'save_marks: with open(filename, "w") as f: f.write(f"{name},{mark}\\n") for each student.',"Each test also reads marks.txt after your program ends."],solution:A},v2:{id:"v2",kind:"modify",title:"Version 2 — marks that can't crash it",task:e.jsxs(e.Fragment,{children:["Typing ",e.jsx("code",{children:"ninety"})," still crashes the program — and loses this session's changes, because saving only happens on Exit. Write ",e.jsx("code",{children:"read_mark()"}),": it loops with try/except until the input is a whole number from 0 to 100, printing ",e.jsx("code",{children:"Enter a whole number from 0 to 100"})," after each bad try, and returns it."]}),starter:A,minLines:80,tests:[p(w,W,2,!1),p(null,["1","x","y","0","3"],2,!0)],requires:[{node:"Try",min:2}],hints:['while True: try: mark = int(input("Mark: ")); if 0 <= mark <= 100: return mark — except ValueError: pass — then print the message.',"Notice: the message prints for both bad text and out-of-range numbers."],solution:E},v3:{id:"v3",kind:"modify",title:"Version 3 — survive a corrupted file",task:e.jsxs(e.Fragment,{children:["Someone edited ",e.jsx("code",{children:"marks.txt"})," by hand and broke a line (",e.jsx("code",{children:"RAVI;64"}),", or ",e.jsx("code",{children:"MEENA,ninety"}),"). Loading now crashes. Make ",e.jsx("code",{children:"load_marks"})," skip bad lines and ",e.jsx("strong",{children:"return a tuple"})," ",e.jsx("code",{children:"(marks, skipped)"}),"; print ",e.jsx("code",{children:"Loaded 2 students (2 bad lines skipped)"})," — or just ",e.jsx("code",{children:"Loaded 2 students"})," when nothing was skipped. Saving rewrites a clean file."]}),starter:E,minLines:90,tests:[p(`PRIYA,87
RAVI;64
ARUN,62
MEENA,ninety
`,B,3,!1),p(w,["3"],3,!0)],requires:[{node:"Continue"}],hints:['parts = line.strip().split(","); if len(parts) != 2: skipped += 1; continue',"Wrap int(parts[1]) in its own try: a ValueError means skipped += 1.",'Unpack at the call: marks, skipped = load_marks("marks.txt")'],solution:P},merge:{id:"merge",kind:"make",title:"Merge two mark files",task:e.jsxs(e.Fragment,{children:["Two teachers kept separate files: ",e.jsx("code",{children:"teacher_a.txt"})," and ",e.jsx("code",{children:"teacher_b.txt"})," (lines ",e.jsx("code",{children:"NAME,MARK"}),"). Write a program that reads both into one dictionary — if a student appears in both, keep the ",e.jsx("strong",{children:"higher"})," mark — writes ",e.jsx("code",{children:"merged.txt"})," with the names in alphabetical order, and prints ",e.jsx("code",{children:"Merged 4 students"}),". Use a function ",e.jsx("code",{children:"read_file(filename)"})," that returns a dict."]}),minLines:18,tests:[{setup:y({"teacher_a.txt":`PRIYA,87
ARUN,62
`,"teacher_b.txt":`ARUN,70
MEENA,91
KAVYA,55
`,"merged.txt":null}),expect:"Merged 4 students",post:`with open("merged.txt") as _f:
    _g = _f.read()
assert _g == "ARUN,70\\nKAVYA,55\\nMEENA,91\\nPRIYA,87\\n", "merged.txt should be sorted by name, keeping the higher mark: " + repr(_g)`},{setup:y({"teacher_a.txt":`Z,10
`,"teacher_b.txt":`Z,5
`,"merged.txt":null}),expect:"Merged 1 students",hidden:!0,post:`with open("merged.txt") as _f:
    assert _f.read() == "Z,10\\n", "keep the higher mark"`}],requires:[{node:"FunctionDef"},{call:"sorted"}],hints:['merged = read_file("teacher_a.txt"); then for each (name, mark) of file B: if name not in merged or mark > merged[name]: merged[name] = mark',"for name in sorted(merged): write the line."],solution:`def read_file(filename):
    data = {}
    with open(filename) as f:
        for line in f:
            name, mark = line.strip().split(",")
            data[name] = int(mark)
    return data

merged = read_file("teacher_a.txt")
for name, mark in read_file("teacher_b.txt").items():
    if name not in merged or mark > merged[name]:
        merged[name] = mark
with open("merged.txt", "w") as f:
    for name in sorted(merged):
        f.write(f"{name},{merged[name]}\\n")
print(f"Merged {len(merged)} students")`}},z=h,K=[{q:"Why does load_marks catch FileNotFoundError?",options:["Files are unreliable","On the very first run there is no save file yet","To speed up loading","Python requires it"],answer:1,explain:"Start with an empty dict instead of crashing."},{q:'Why save with "w" rather than "a" on exit?',options:["Faster","The dict holds the full, updated data — rewrite the file from it so updates don't create duplicate lines",`"a" can't write`,"No reason"],answer:1,explain:"Append would add PRIYA a second time after an update."},{q:"What does continue do inside the loading loop?",options:["Stops loading","Skips the bad line and moves to the next one","Retries the line","Saves the file"],answer:1,explain:"One bad line shouldn't lose all the good ones."},{q:"load_marks returns marks, skipped. How do you receive both?",options:["marks = load_marks(...)","marks, skipped = load_marks(...)","load_marks(...)[marks]","You can't"],answer:1,explain:"It's a tuple; unpack it (Unit 7.4)."}];function G(n){const s=[{label:"The Mission",kicker:"CAPSTONE",title:"The Persistent Marks Manager",blocks:[e.jsxs(S,{children:["Module 8's Marks Manager has two fatal flaws: type ",e.jsx("code",{children:"ninety"})," and it crashes; close it and every mark is gone. Fix both with Module 9's tools, one version at a time:"]}),e.jsx("div",{style:{border:`1px solid ${c.border}`,borderRadius:12,overflow:"hidden",maxWidth:900},children:[["Remember marks between runs","load_marks / save_marks with files","9.3"],["First run: no file yet","except FileNotFoundError","9.3"],["Never crash on a bad mark","read_mark with try/except + range check","9.1, 9.2"],["Survive a damaged file","skip bad lines, return (marks, skipped)","9.1, 7.4"]].map(([i,r,t],d)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1.5fr 2fr 0.6fr",gap:10,padding:"10px 14px",background:d%2?c.surface:c.card,fontSize:14.5},children:[e.jsx("span",{children:i}),e.jsx("code",{style:{justifySelf:"start"},children:r}),e.jsx("span",{style:{color:c.bronze,fontWeight:700},children:t})]},d))}),e.jsxs(T,{color:c.blue,icon:"🧪",children:["Each test starts with a prepared ",e.jsx("code",{children:"marks.txt"})," (or none), runs your program, then opens the file your program saved and checks every line."]})]},{label:"Version 1",kicker:"REMEMBER",title:"Version 1: load and save",blocks:[h.v1]},{label:"Version 2",kicker:"NEVER CRASH",title:"Version 2: crash-proof input",blocks:[h.v2]},{label:"Version 3",kicker:"SURVIVE",title:"Version 3: a damaged save file",blocks:[h.v3,e.jsx($,{children:"Real programs assume the outside world is messy: missing files, bad input, damaged data. Handling each case gracefully is what makes software trustworthy."})]},{label:"Make It",kicker:"ON YOUR OWN",title:"Your program: merge two files",blocks:[h.merge]}];return e.jsx(V,{...n,unitId:"Unit9_4",crumb:"MODULE 9 › UNIT 9.4",title:"Capstone: The Persistent Marks Manager",sections:s,quiz:K,next:{title:"Module 10 — Object-Oriented Programming",text:"Module 9 complete! Next: data and behaviour, living together in classes. (Optional first: Module 9's Crucible.)"}})}export{z as EXERCISES,G as default};
