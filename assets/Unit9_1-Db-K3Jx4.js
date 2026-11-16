import{j as e,r as h}from"./index-5ju0ARcj.js";import{P as s,K as o,N as p,L as u,T as n,a as x,t as l}from"./Lesson-B4adq15Q.js";const d=[{t:"Traceback (most recent call last):",n:"Just a heading. The useful part is at the BOTTOM — read a traceback from the last line up."},{t:'  File "marks.py", line 3, in <module>',n:"Which file and which line. Go straight to line 3."},{t:"    total = total + int(raw)",n:"The exact line that failed, reprinted for you."},{t:"ValueError: invalid literal for int() with base 10: 'eighty'",n:"The most important line: the error TYPE (ValueError) and the reason ('eighty' isn't a whole number). Read this first."}];function y(){const[r,a]=h.useState(3);return e.jsxs("div",{className:"fh-two",children:[e.jsx("pre",{style:{margin:0,fontFamily:x,fontSize:14,lineHeight:1.7,background:n.termBg,color:n.termText,borderRadius:10,padding:8},children:d.map((c,i)=>e.jsx("div",{onClick:()=>a(i),style:{cursor:"pointer",padding:"2px 8px",borderRadius:5,color:i===3?n.termErr:n.termText,background:r===i?"rgba(240,184,96,.25)":"transparent"},children:c.t},i))}),e.jsxs("div",{style:{background:l(n.purple,"0E"),border:`1px solid ${l(n.purple,"44")}`,borderRadius:12,padding:14,fontSize:14.5,color:n.slate,lineHeight:1.65},children:[e.jsx("div",{style:{fontSize:12.5,color:n.muted,marginBottom:4},children:"Click any line of the traceback."}),d[r].n]})]})}const t={zoo1:{id:"zoo1",kind:"fix",title:"Error zoo: ZeroDivisionError",task:e.jsxs(e.Fragment,{children:["Every exception type has a name that says what went wrong. Run, read the last line, fix: a class with 0 students should print ",e.jsx("code",{children:"No students"})," instead of crashing."]}),starter:`total = int(input("Total marks: "))
students = int(input("Students: "))
print("Average:", total / students)`,tests:[{inputs:["0","0"],expect:`Total marks: 0
Students: 0
No students`},{inputs:["300","4"],expect:`Total marks: 300
Students: 4
Average: 75.0`,hidden:!0}],hints:["You don't need try for this one — an if can check before dividing.",'if students == 0: print("No students") else: …'],solution:`total = int(input("Total marks: "))
students = int(input("Students: "))
if students == 0:
    print("No students")
else:
    print("Average:", total / students)`},zoo2:{id:"zoo2",kind:"fix",title:"Error zoo: IndexError",task:e.jsx(e.Fragment,{children:"This should print the last mark in the list. Run it, read the error, fix the index — so it works for a list of any length."}),starter:`marks = [72, 85, 64]
print("Last:", marks[len(marks)])`,tests:[{expect:"Last: 64"}],hints:["The last index is len(marks) - 1 — or simply -1."],solution:`marks = [72, 85, 64]
print("Last:", marks[-1])`},silent:{id:"silent",kind:"fix",title:"No error, wrong answer",task:e.jsxs(e.Fragment,{children:["This program runs without any error, yet for ",e.jsx("code",{children:"70 80 90"})," it prints ",e.jsx("code",{children:"Total: 90"}),". Don't guess. Add ",e.jsx("code",{children:"print(m, total)"})," as the last line inside the loop, run it, and watch the two values change. Fix the bug, then delete your extra print."]}),starter:`line = input("Marks: ")
total = 0
for m in line.split():
    total = int(m)
print("Total:", total)`,tests:[{inputs:["70 80 90"],expect:`Marks: 70 80 90
Total: 240`},{inputs:["5 5"],expect:`Marks: 5 5
Total: 10`,hidden:!0}],hints:["Your debug print shows total is replaced each time round, never added to.","total = int(m) throws the old total away. Which operator keeps it?"],solution:`line = input("Marks: ")
total = 0
for m in line.split():
    total += int(m)
print("Total:", total)`},first:{id:"first",kind:"type",title:"try / except",task:e.jsxs(e.Fragment,{children:["Some errors can't be checked in advance with an if — you only find out when ",e.jsx("code",{children:"int()"})," tries. Put the risky line inside ",e.jsx("code",{children:"try:"}),"; if a ",e.jsx("code",{children:"ValueError"})," happens, Python jumps to ",e.jsx("code",{children:"except ValueError:"})," instead of crashing."]}),show:`raw = input("Mark: ")
try:
    mark = int(raw)
    print("Saved:", mark)
except ValueError:
    print("That's not a whole number")
print("Program still running")`,tests:[{inputs:["eighty"],expect:`Mark: eighty
That's not a whole number
Program still running`},{inputs:["75"],expect:`Mark: 75
Saved: 75
Program still running`,hidden:!0}],requires:[{node:"Try"}],hints:['When int(raw) fails, the print("Saved:") line is skipped — Python jumps straight to except.'],solution:`raw = input("Mark: ")
try:
    mark = int(raw)
    print("Saved:", mark)
except ValueError:
    print("That's not a whole number")
print("Program still running")`},price:{id:"price",kind:"write",title:"Catch a bad price",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Price: "})," and ",e.jsx("code",{children:"Qty: "}),". If both convert (price as float, qty as int), print ",e.jsx("code",{children:"Total: Rs 450.00"}),"; if either fails, print ",e.jsx("code",{children:"Please type numbers only"}),"."]}),tests:[{inputs:["150","3"],expect:`Price: 150
Qty: 3
Total: Rs 450.00`},{inputs:["abc","3"],expect:`Price: abc
Qty: 3
Please type numbers only`,hidden:!0},{inputs:["99.5","two"],expect:`Price: 99.5
Qty: two
Please type numbers only`,hidden:!0}],requires:[{node:"Try"}],hints:["Read both inputs first, then convert both inside one try.",'except ValueError: print("Please type numbers only")'],solution:`price_text = input("Price: ")
qty_text = input("Qty: ")
try:
    price = float(price_text)
    qty = int(qty_text)
    print(f"Total: Rs {price * qty:.2f}")
except ValueError:
    print("Please type numbers only")`},retry:{id:"retry",kind:"write",title:"Ask again until it works",task:e.jsxs(e.Fragment,{children:["Combine ",e.jsx("code",{children:"while True"})," with try/except: keep asking ",e.jsx("code",{children:"Age: "})," until the answer converts to an int. After each bad answer print ",e.jsx("code",{children:"Numbers only, please"}),". Finally print ",e.jsx("code",{children:"Next year you will be 19"}),"."]}),tests:[{inputs:["eighteen","18.5","18"],expect:`Age: eighteen
Numbers only, please
Age: 18.5
Numbers only, please
Age: 18
Next year you will be 19`},{inputs:["40"],expect:`Age: 40
Next year you will be 41`,hidden:!0}],requires:[{node:"Try"},{node:"While"}],hints:['while True: try: age = int(input("Age: ")); break — except ValueError: print(...)',"The break only runs if int() succeeded."],solution:`while True:
    try:
        age = int(input("Age: "))
        break
    except ValueError:
        print("Numbers only, please")
print(f"Next year you will be {age + 1}")`},bare:{id:"bare",kind:"fix",title:"The except that hides bugs",task:e.jsxs(e.Fragment,{children:["Every input, even ",e.jsx("code",{children:"75"}),", prints ",e.jsx("code",{children:"Invalid mark"}),". A bare ",e.jsx("code",{children:"except:"})," catches ",e.jsx("em",{children:"everything"})," — including a typo in the code. Change it to catch only ",e.jsx("code",{children:"ValueError"}),", run again to reveal the real bug, and fix that too."]}),starter:`raw = input("Mark: ")
try:
    mark = int(raw)
    prnt("Saved:", mark)
except:
    print("Invalid mark")`,tests:[{inputs:["75"],expect:`Mark: 75
Saved: 75`},{inputs:["x"],expect:`Mark: x
Invalid mark`,hidden:!0}],validate:r=>/except\s*:/.test(r)?"Name the exception: except ValueError:":null,hints:["except ValueError: lets the NameError show itself.","prnt → print"],solution:`raw = input("Mark: ")
try:
    mark = int(raw)
    print("Saved:", mark)
except ValueError:
    print("Invalid mark")`},survey:{id:"survey",kind:"make",title:"A crash-proof survey",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"How many responses: "})," (retry until it's a whole number, printing ",e.jsx("code",{children:"Numbers only, please"}),"). Then read that many ratings with ",e.jsx("code",{children:"Rating: "}),"; a rating that isn't a whole number from 1 to 5 prints ",e.jsx("code",{children:"Skipped"})," and doesn't count. Finally print ",e.jsx("code",{children:"Valid: 3"})," and ",e.jsx("code",{children:"Average: 4.00"})," (or ",e.jsx("code",{children:"Average: none"})," if no valid ratings)."]}),minLines:18,tests:[{inputs:["x","4","5","abc","3","9"],expect:`How many responses: x
Numbers only, please
How many responses: 4
Rating: 5
Rating: abc
Skipped
Rating: 3
Rating: 9
Skipped
Valid: 2
Average: 4.00`},{inputs:["2","z","0"],expect:`How many responses: 2
Rating: z
Skipped
Rating: 0
Skipped
Valid: 0
Average: none`,hidden:!0},{inputs:["3","4","4","5"],expect:`How many responses: 3
Rating: 4
Rating: 4
Rating: 5
Valid: 3
Average: 4.33`,hidden:!0}],requires:[{node:"Try",min:2}],hints:["Two try blocks: one in the retry loop, one per rating.","Inside the rating try: r = int(...); if 1 <= r <= 5: count it, else print Skipped. except ValueError: print Skipped.","Guard the average: if valid == 0."],solution:`while True:
    try:
        n = int(input("How many responses: "))
        break
    except ValueError:
        print("Numbers only, please")
valid = 0
total = 0
for i in range(n):
    try:
        r = int(input("Rating: "))
        if 1 <= r <= 5:
            valid += 1
            total += r
        else:
            print("Skipped")
    except ValueError:
        print("Skipped")
print(f"Valid: {valid}")
if valid == 0:
    print("Average: none")
else:
    print(f"Average: {total / valid:.2f}")`}},b=t,g=[{q:"Which line of a traceback should you read first?",options:["The first","The last — error type and reason","The middle","None"],answer:1,explain:"Bottom-up: the last line names the problem; the line above shows where."},{q:"What happens to the rest of a try block after an exception?",options:["It runs anyway","It's skipped — Python jumps to the matching except","The program stops","It repeats"],answer:1,explain:`That's why print("Saved") didn't run for bad input.`},{q:"Why is a bare except: dangerous?",options:["Slow","It also catches bugs like NameError, hiding them","Not allowed","It never runs"],answer:1,explain:"Catch only the exception you expect."},{q:"Divide by a count that could be 0. Best approach?",options:["Always try/except","An if check before dividing is clearest when you can test in advance","Ignore it","Use a bare except"],answer:1,explain:"Use if when you can check first; try when you can only find out by trying (like int())."}];function w(r){const a=[{label:"Tracebacks",kicker:"READ IT BOTTOM-UP",title:"An error message is a bug report",blocks:[e.jsx(s,{children:"That red wall of text is Python telling you exactly what went wrong and where. The coach has been translating it for you; now learn to read it yourself:"}),e.jsx(y,{}),t.zoo1,t.zoo2]},{label:"Silent Bugs",kicker:"A METHOD, NOT A GUESS",title:"When there is no error message",blocks:[e.jsx(s,{children:"The hardest bugs don't crash: the program runs and quietly prints the wrong answer. There is no traceback to read, so you make the program show you what it is doing:"}),e.jsxs(s,{children:[e.jsx("strong",{children:"1."})," Use the smallest input that still goes wrong. ",e.jsx("strong",{children:"2."})," Work out by hand what the answer should be. ",e.jsx("strong",{children:"3."})," Put a ",e.jsx("code",{children:"print( )"})," just before the line you suspect, showing the variables it uses. ",e.jsx("strong",{children:"4."})," Run it and find the first line of output that differs from what you expected: the bug is just above it. ",e.jsx("strong",{children:"5."})," Change one thing, run again, then remove your extra prints."]}),t.silent,e.jsxs(o,{children:["A traceback tells you where a program stopped. A debug ",e.jsx("code",{children:"print"})," tells you what it was thinking. Never change code at random: look first, then fix."]})]},{label:"try / except",kicker:"SURVIVE BAD INPUT",title:"Catching an exception",blocks:[t.first,t.price,t.retry,e.jsxs(o,{children:["Use ",e.jsx("code",{children:"if"})," when you can check before acting (is the count 0?). Use ",e.jsx("code",{children:"try"})," when the only way to know is to try (can this text become an int?)."]})]},{label:"Catch Narrowly",kicker:"THE TRAP",title:"Catch only what you expect",blocks:[t.bare,e.jsxs(p,{icon:"⚠️",children:["A bare ",e.jsx("code",{children:"except:"})," turns every bug into “invalid input”. Always name the exception type."]})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: a crash-proof survey",blocks:[t.survey]}];return e.jsx(u,{...r,unitId:"Unit9_1",crumb:"MODULE 9 › UNIT 9.1",title:"Errors Aren't Failures",sections:a,quiz:g,next:{title:"Unit 9.2 — Catching & Raising",text:"Several excepts, else, finally — and raising your own errors on purpose."}})}export{b as EXERCISES,w as default};
