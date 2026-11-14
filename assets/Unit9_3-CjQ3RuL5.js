import{j as e}from"./index-BQ9ta_BJ.js";import{P as c,C as f,K as x,N as u,T as w,L as k}from"./Lesson-DNKKUv9k.js";const t=a=>`import os
`+Object.entries(a).map(([s,r])=>r===null?`if os.path.exists(${JSON.stringify(s)}): os.remove(${JSON.stringify(s)})`:`with open(${JSON.stringify(s)}, "w") as _f: _f.write(${JSON.stringify(r)})`).join(`
`),h=`PRIYA,87
ARUN,62
MEENA,91
`,p=(a,s,r)=>{const m=(a+`${s},${r}
`).trim().split(`
`).map(i=>i.split(",")),l=new Map;let d=0;return m.forEach(([i,o])=>{l.set(i,(l.get(i)||0)+Number(o)),d+=Number(o)}),[`Category: ${s}`,`Amount: ${r}`,...[...l].map(([i,o])=>`${i}: Rs ${o}`),`Total: Rs ${d}`].join(`
`)},n={roundtrip:{id:"roundtrip",kind:"type",title:"Write a file, read it back",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"with open(name, mode) as f:"})," opens a file and closes it automatically at the end of the block. Mode ",e.jsx("code",{children:'"w"'})," writes; no mode means read. ",e.jsx("code",{children:"write"})," does ",e.jsx("strong",{children:"not"})," add a newline — you do."]}),show:`with open("names.txt", "w") as f:
    f.write("Priya\\n")
    f.write("Arun\\n")

with open("names.txt") as f:
    text = f.read()
print(text)`,tests:[{setup:t({"names.txt":null}),expect:`Priya
Arun`}],hints:["Inside quotes, \\n is the newline character (Unit 4.5)."],solution:`with open("names.txt", "w") as f:
    f.write("Priya\\n")
    f.write("Arun\\n")

with open("names.txt") as f:
    text = f.read()
print(text)`},modes:{id:"modes",kind:"type",title:'"w" erases, "a" appends',task:e.jsxs(e.Fragment,{children:["Predict the final file before running. Opening with ",e.jsx("code",{children:'"w"'})," empties the file first — a classic way to lose data."]}),show:`with open("log.txt", "w") as f:
    f.write("first\\n")
with open("log.txt", "w") as f:
    f.write("second\\n")
with open("log.txt", "a") as f:
    f.write("third\\n")

with open("log.txt") as f:
    print(f.read())`,tests:[{setup:t({"log.txt":null}),expect:`second
third`}],hints:['The second "w" wiped out "first".'],solution:`with open("log.txt", "w") as f:
    f.write("first\\n")
with open("log.txt", "w") as f:
    f.write("second\\n")
with open("log.txt", "a") as f:
    f.write("third\\n")

with open("log.txt") as f:
    print(f.read())`},newline:{id:"newline",kind:"fix",title:"Everything on one line",task:e.jsx(e.Fragment,{children:"This saves three names, then counts the lines in the file. Run it: one line, not three. Fix the write."}),starter:`names = ["Priya", "Arun", "Meena"]
with open("class.txt", "w") as f:
    for name in names:
        f.write(name)

count = 0
with open("class.txt") as f:
    for line in f:
        count += 1
print("Lines:", count)`,tests:[{setup:t({"class.txt":null}),expect:"Lines: 3"}],hints:['f.write(name + "\\n")'],solution:`names = ["Priya", "Arun", "Meena"]
with open("class.txt", "w") as f:
    for name in names:
        f.write(name + "\\n")

count = 0
with open("class.txt") as f:
    for line in f:
        count += 1
print("Lines:", count)`},append:{id:"append",kind:"write",title:"Add a record",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"marks.txt"})," already holds lines like ",e.jsx("code",{children:"PRIYA,87"}),". Ask ",e.jsx("code",{children:"Name: "})," (store in capitals) and ",e.jsx("code",{children:"Mark: "})," and ",e.jsx("strong",{children:"append"})," ",e.jsx("code",{children:"NAME,MARK"})," as a new line. Then read the whole file and print every record as ",e.jsx("code",{children:"PRIYA - 87"}),", then ",e.jsx("code",{children:"Records: 4"}),". (",e.jsx("code",{children:"for line in f"})," gives each line with its ",e.jsx("code",{children:"\\n"})," — use ",e.jsx("code",{children:".strip()"}),", then ",e.jsx("code",{children:'.split(",")'}),".)"]}),minLines:10,tests:[{setup:t({"marks.txt":h}),inputs:["ravi","64"],expect:`Name: ravi
Mark: 64
PRIYA - 87
ARUN - 62
MEENA - 91
RAVI - 64
Records: 4`},{setup:t({"marks.txt":`A,1
`}),inputs:["b","2"],expect:`Name: b
Mark: 2
A - 1
B - 2
Records: 2`,hidden:!0}],post:`with open("marks.txt") as _f:
    assert _f.read().endswith("\\n"), "Every record should end with a newline"`,requires:[{text:'"a"',msg:'Open the file with mode "a" so the old records stay.'}],hints:['with open("marks.txt", "a") as f: f.write(f"{name},{mark}\\n")','name, mark = line.strip().split(",") — unpacking from Unit 7.4.'],solution:`name = input("Name: ").upper()
mark = input("Mark: ")
with open("marks.txt", "a") as f:
    f.write(f"{name},{mark}\\n")

count = 0
with open("marks.txt") as f:
    for line in f:
        n, m = line.strip().split(",")
        print(f"{n} - {m}")
        count += 1
print(f"Records: {count}")`},analyse:{id:"analyse",kind:"write",title:"Read a data file",task:e.jsxs(e.Fragment,{children:["Read ",e.jsx("code",{children:"marks.txt"})," (lines like ",e.jsx("code",{children:"PRIYA,87"}),") into a dictionary and print ",e.jsx("code",{children:"Students: 3"}),", ",e.jsx("code",{children:"Average: 80.00"})," and ",e.jsx("code",{children:"Topper: MEENA (91)"}),". The data comes from the file now, not from input()."]}),tests:[{setup:t({"marks.txt":h}),expect:`Students: 3
Average: 80.00
Topper: MEENA (91)`},{setup:t({"marks.txt":`X,10
Y,30
`}),expect:`Students: 2
Average: 20.00
Topper: Y (30)`,hidden:!0}],hints:['for line in f: name, mark = line.strip().split(","); marks[name] = int(mark)',"Then the best-so-far loop from Unit 7.3."],solution:`marks = {}
with open("marks.txt") as f:
    for line in f:
        name, mark = line.strip().split(",")
        marks[name] = int(mark)
top = ""
best = -1
for name, mark in marks.items():
    if mark > best:
        best = mark
        top = name
print(f"Students: {len(marks)}")
print(f"Average: {sum(marks.values()) / len(marks):.2f}")
print(f"Topper: {top} ({best})")`},csvmod:{id:"csvmod",kind:"type",title:"Let the csv module split the line",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"marks.csv"})," starts with a heading line ",e.jsx("code",{children:"name,mark"}),", and one name is written as ",e.jsx("code",{children:'"KUMAR, ARUN"'}),", with a comma inside the quotes. ",e.jsx("code",{children:'split(",")'})," would cut that name in two. Python's ",e.jsx("code",{children:"csv"})," module knows the rules of such files. ",e.jsx("code",{children:"next(rows)"})," skips the heading line."]}),show:`import csv

total = 0
with open("marks.csv", newline="") as f:
    rows = csv.reader(f)
    next(rows)
    for name, mark in rows:
        print(name, "->", mark)
        total += int(mark)
print("Total:", total)`,tests:[{setup:t({"marks.csv":`name,mark
PRIYA,87
"KUMAR, ARUN",62
MEENA,91
`}),expect:`PRIYA -> 87
KUMAR, ARUN -> 62
MEENA -> 91
Total: 240`},{setup:t({"marks.csv":`name,mark
"D, RAVI",10
SITA,30
`}),expect:`D, RAVI -> 10
SITA -> 30
Total: 40`,hidden:!0}],requires:[{call:"reader",msg:"Read the rows with csv.reader(f)."}],hints:["Each row arrives as a list of text items: ['PRIYA', '87'].","mark is still text; int(mark) before adding."],solution:`import csv

total = 0
with open("marks.csv", newline="") as f:
    rows = csv.reader(f)
    next(rows)
    for name, mark in rows:
        print(name, "->", mark)
        total += int(mark)
print("Total:", total)`},missing:{id:"missing",kind:"fix",title:"The first run has no file",task:e.jsxs(e.Fragment,{children:["The very first time a program runs, its save file doesn't exist yet. Run it (the test deletes the file first) and read the coach. Catch ",e.jsx("code",{children:"FileNotFoundError"})," and print ",e.jsx("code",{children:"No saved data yet"}),"; when the file exists, print its contents as before."]}),starter:`with open("save.txt") as f:
    print(f.read())`,tests:[{setup:t({"save.txt":null}),expect:"No saved data yet"},{setup:t({"save.txt":`level 3
`}),expect:"level 3",hidden:!0}],requires:[{node:"Try"}],hints:['try: … the with block … except FileNotFoundError: print("No saved data yet")'],solution:`try:
    with open("save.txt") as f:
        print(f.read())
except FileNotFoundError:
    print("No saved data yet")`},expenses:{id:"expenses",kind:"make",title:"Expense log",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"expenses.txt"})," holds lines like ",e.jsx("code",{children:"food,120"}),". Ask ",e.jsx("code",{children:"Category: "})," and ",e.jsx("code",{children:"Amount: "}),", append the new expense, then read the whole file and print the total per category (in the order first seen) as ",e.jsx("code",{children:"food: Rs 210"}),", then ",e.jsx("code",{children:"Total: Rs 520"}),". If the file doesn't exist yet, appending creates it. (This is the core of mini-project Track A.)"]}),minLines:14,tests:[{setup:t({"expenses.txt":`food,120
travel,200
food,90
`}),inputs:["books","110"],expect:p(`food,120
travel,200
food,90
`,"books",110)},{setup:t({"expenses.txt":null}),inputs:["tea","15"],expect:p("","tea",15),hidden:!0}],requires:[{text:'"a"'},{call:"get",msg:"Total per category with totals.get(cat, 0) + amount (Unit 7.5)."}],hints:["Append first, then read — so the new expense is included.","totals[cat] = totals.get(cat, 0) + int(amount)"],solution:`cat = input("Category: ")
amount = input("Amount: ")
with open("expenses.txt", "a") as f:
    f.write(f"{cat},{amount}\\n")

totals = {}
with open("expenses.txt") as f:
    for line in f:
        c, a = line.strip().split(",")
        totals[c] = totals.get(c, 0) + int(a)
for c, t in totals.items():
    print(f"{c}: Rs {t}")
print(f"Total: Rs {sum(totals.values())}")`}},j=n,g=[{q:"Where do variables live, and what happens when the program ends?",options:["On disk; kept","In RAM; gone","In the file; kept","In RAM; kept"],answer:1,explain:"RAM is cleared when the program stops. Files on disk survive."},{q:'What does opening an existing file with "w" do?',options:["Adds to the end","Erases it first","Reads it","Error"],answer:1,explain:'"w" starts fresh; use "a" to keep existing content.'},{q:"Why use with open(...) as f:?",options:["Faster","The file is closed automatically, even if an error happens","Required for reading","It creates a backup"],answer:1,explain:"It's try/finally built in."},{q:'line is "ARUN,62\\n". What does line.strip().split(",") give?',options:["['ARUN', '62\\n']","['ARUN', '62']","['ARUN,62']","('ARUN', 62)"],answer:1,explain:"strip removes the newline; split cuts at the comma. Both pieces are still text."},{q:"Reading a file that doesn't exist raises…",options:["ValueError","KeyError","FileNotFoundError","Nothing"],answer:2,explain:"Catch it to handle the first run gracefully."}];function R(a){const s=[{label:"Write & Read",kicker:"MAKING DATA SURVIVE",title:"Files remember",blocks:[e.jsxs(c,{children:["Every program so far forgot everything when it ended: variables live in RAM, which is cleared. A ",e.jsx("strong",{children:"file"})," lives on disk and survives. Three modes cover most needs:"]}),e.jsx("div",{style:{maxWidth:760},children:e.jsx(f,{title:"modes",code:`open("data.txt", "w")   # write: create or ERASE, then write
open("data.txt", "a")   # append: add to the end
open("data.txt")        # read (mode "r" is the default)`})}),n.roundtrip,n.modes,n.newline]},{label:"Records",kicker:"ONE LINE PER RECORD",title:"Saving and reading records",blocks:[n.append,n.analyse,e.jsxs(c,{children:["Files of comma-separated values are so common they have a name, ",e.jsx("strong",{children:"CSV"}),", and spreadsheets save them. Splitting on commas yourself works until a value contains a comma. The standard library's ",e.jsx("code",{children:"csv"})," module handles that for you:"]}),n.csvmod,e.jsxs(x,{children:["Write: ",e.jsxs("code",{children:['f"',"{name}",",","{mark}",'\\n"']}),". Read: ",e.jsx("code",{children:'line.strip().split(",")'}),", then convert. The file only holds text."]})]},{label:"Missing Files",kicker:"THE FIRST RUN",title:"When the file isn't there yet",blocks:[n.missing,e.jsxs(u,{color:w.blue,icon:"🗂️",children:["Real CSV data can contain commas inside values. Python's ",e.jsx("code",{children:"csv"})," module handles that — you'll meet it with Pandas in Module 12."]})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: expense log",blocks:[n.expenses]}];return e.jsx(k,{...a,unitId:"Unit9_3",crumb:"MODULE 9 › UNIT 9.3",title:"Files: Making Data Survive",sections:s,quiz:g,next:{title:"Unit 9.4 — Capstone: The Persistent Marks Manager",text:"Close the program, open it again — the marks are still there."}})}export{j as EXERCISES,R as default};
