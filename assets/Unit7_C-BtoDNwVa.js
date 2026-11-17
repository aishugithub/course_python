import{j as e}from"./index-BsB65IVi.js";import{C as b}from"./Crucible-DIvkmO_M.js";import"./Lesson-M2Z85AvF.js";function y(t,i){const r=n=>{const a=new Map;return n.split(/\s+/).filter(Boolean).forEach(m=>{const[k,f]=m.split(":");a.set(k,(a.get(k)||0)+ +f)}),a},p=r(t),d=r(i),s=new Map;[p,d].forEach(n=>n.forEach((a,m)=>s.set(m,(s.get(m)||0)+a)));const c=[...s.keys()].sort(),u=n=>n.length?n.sort().join(", "):"none";let h=c[0];return c.forEach(n=>{s.get(n)>s.get(h)&&(h=n)}),[`Shop 1: ${t}`,`Shop 2: ${i}`,...c.map(n=>`${n}: ${s.get(n)}`),`Only in shop 1: ${u([...p.keys()].filter(n=>!d.has(n)))}`,`Only in shop 2: ${u([...d.keys()].filter(n=>!p.has(n)))}`,`In both: ${u([...p.keys()].filter(n=>d.has(n)))}`,`Most stocked: ${h} (${s.get(h)})`].join(`
`)}const l=(t,i,r={})=>({inputs:[t,i],expect:y(t,i),...r}),o={spark1:{id:"spark1",kind:"predict",title:"Two tags, one list",code:`a = [3, 1, 2]
b = a
c = a[:]
b.append(4)
c.sort()
print(a, b, c)
x = a.sort()
print(x, a)
nums = [5, 8, 2, 8]
print(nums.index(8), nums.count(8), nums[-1], nums[1:3])`,task:e.jsxs(e.Fragment,{children:["Which names point at the ",e.jsx("em",{children:"same"})," list, and which at a copy? And what does ",e.jsx("code",{children:".sort()"})," hand back?"]}),hints:["b = a is a second name tag on the same list. a[:] makes a new list.",".sort() changes the list in place and returns None.","index finds the FIRST position; a slice [1:3] stops before position 3."],solution:`[3, 1, 2, 4] [3, 1, 2, 4] [1, 2, 3]
None [1, 2, 3, 4]
1 2 8 [8, 2]`},spark2:{id:"spark2",kind:"predict",title:"Dicts, tuples, sets",code:`stock = {"pen": 10, "pad": 4}
stock["pen"] -= 3
stock["ink"] = stock.get("ink", 0) + 5
for item, qty in stock.items():
    print(item, qty)
point = (3, 4)
x, y = point
print(x * y, len(stock), "pad" in stock, 4 in stock)
s = set([1, 2, 2, 3]) | {3, 4}
print(len(s), sorted(s & {2, 4, 6}))
words = "the cat the hat".split()
print(" ".join(sorted(set(words))))`,task:e.jsx(e.Fragment,{children:"Every structure from Module 7 in one program. Dictionaries keep the order keys were added."}),hints:[`.get("ink", 0) gives 0 because ink isn't there yet.`,"in on a dictionary checks the KEYS, not the values.",'| is union, & is intersection; a set drops the repeated "the".'],solution:`pen 7
pad 4
ink 5
12 3 True False
4 [2, 4]
cat hat the`},remove:{id:"remove",kind:"fix",title:"Some failures survive",task:e.jsxs(e.Fragment,{children:["It should drop every mark below 40 and print the rest. Run it with the sample: one failing mark slips through. Removing from a list while you loop over it makes the loop skip items — build a ",e.jsx("strong",{children:"new"})," list instead."]}),starter:`marks = []
for x in input("Marks: ").split():
    marks.append(int(x))
for m in marks:
    if m < 40:
        marks.remove(m)
print("Passed:", marks)`,tests:[{inputs:["35 20 70 10 90"],expect:`Marks: 35 20 70 10 90
Passed: [70, 90]`},{inputs:["50 60"],expect:`Marks: 50 60
Passed: [50, 60]`,hidden:!0},{inputs:["1 2 3"],expect:`Marks: 1 2 3
Passed: []`,hidden:!0}],forbids:[{call:"remove",msg:"Don't remove while looping — append the good marks to a new list."}],hints:["After 35 is removed, 20 slides into its place — and the loop has already moved on.","passed = [] then append every mark >= 40."],solution:`marks = []
for x in input("Marks: ").split():
    marks.append(int(x))
passed = []
for m in marks:
    if m >= 40:
        passed.append(m)
print("Passed:", passed)`},votes:{id:"votes",kind:"fix",title:"Count the votes",task:e.jsxs(e.Fragment,{children:["Count the votes and announce the winner — on a tie, the name that was voted for ",e.jsx("em",{children:"first"})," wins. It crashes; and once it stops crashing, the winner's count is still wrong. Fix both."]}),starter:`text = input("Votes: ")
counts = {}
for name in text.split():
    counts[name] += 1
winner = ""
best = 0
for name in counts:
    if counts[name] > best:
        winner = name
print(f"Winner: {winner} with {best} votes")`,tests:[{inputs:["asha ben asha chen ben asha"],expect:`Votes: asha ben asha chen ben asha
Winner: asha with 3 votes`},{inputs:["zed"],expect:`Votes: zed
Winner: zed with 1 votes`,hidden:!0},{inputs:["b a a b"],expect:`Votes: b a a b
Winner: b with 2 votes`,hidden:!0,why:"A tie: b was voted for first, so keep > (not >=)."}],hints:["counts[name] += 1 needs counts[name] to exist already: counts.get(name, 0) + 1.","When you find a new winner, remember their count too: best = counts[name]."],solution:`text = input("Votes: ")
counts = {}
for name in text.split():
    counts[name] = counts.get(name, 0) + 1
winner = ""
best = 0
for name in counts:
    if counts[name] > best:
        winner = name
        best = counts[name]
print(f"Winner: {winner} with {best} votes")`},records:{id:"records",kind:"complete",title:"Records as tuples",task:e.jsxs(e.Fragment,{children:["Each student is a ",e.jsx("code",{children:"(name, mark)"})," tuple. Fill the blanks to find the topper, the average and the passed names (alphabetical)."]}),starter:`records = []
for entry in input("Students (name:mark): ").split():
    name, mark = entry.split(___)
    records.append((name, int(mark)))

best = records[0]
total = 0
for name, mark in records:
    total += ___
    if mark > best[1]:
        best = (name, mark)
print(f"Topper: {best[0]} ({best[1]})")
print(f"Average: {total / ___:.1f}")

passed = []
for name, mark in records:
    if mark >= 40:
        passed.___(name)
print("Passed:", ", ".join(sorted(passed)))`,tests:[{inputs:["Dev:58 Asha:82 Ben:35 Chen:91"],expect:`Students (name:mark): Dev:58 Asha:82 Ben:35 Chen:91
Topper: Chen (91)
Average: 66.5
Passed: Asha, Chen, Dev`},{inputs:["Zoe:40"],expect:`Students (name:mark): Zoe:40
Topper: Zoe (40)
Average: 40.0
Passed: Zoe`,hidden:!0}],hints:['entry.split(":")',"total += mark; divide by len(records)","passed.append(name)"],solution:`records = []
for entry in input("Students (name:mark): ").split():
    name, mark = entry.split(":")
    records.append((name, int(mark)))

best = records[0]
total = 0
for name, mark in records:
    total += mark
    if mark > best[1]:
        best = (name, mark)
print(f"Topper: {best[0]} ({best[1]})")
print(f"Average: {total / len(records):.1f}")

passed = []
for name, mark in records:
    if mark >= 40:
        passed.append(name)
print("Passed:", ", ".join(sorted(passed)))`},merge:{id:"merge",kind:"make",title:"Merge two shops",task:e.jsxs(e.Fragment,{children:["Two branches of a shop send their stock as ",e.jsx("code",{children:"item:qty"})," pairs. Ask ",e.jsx("code",{children:"Shop 1: "})," and ",e.jsx("code",{children:"Shop 2: "}),". Combine them in a dictionary (an item listed twice is added up) and print every item alphabetically as ",e.jsx("code",{children:"pad: 8"}),". Then, using ",e.jsx("strong",{children:"sets"})," of item names, print ",e.jsx("code",{children:"Only in shop 1: pen"}),", ",e.jsx("code",{children:"Only in shop 2: bag"})," and ",e.jsx("code",{children:"In both: ink, pad"})," (alphabetical, comma-separated, or ",e.jsx("code",{children:"none"}),"). Last, ",e.jsx("code",{children:"Most stocked: pen (10)"})," — alphabetically first on a tie."]}),minLines:20,tests:[l("pen:10 pad:5 ink:2","pad:3 ink:4 bag:1"),l("a:1","a:2",{hidden:!0,why:"Nothing is only in one shop: print none."}),l("x:5 y:5","z:1",{hidden:!0,why:"x and y tie for most stocked — the alphabetically first wins."}),l("cap:2 cap:3 mug:1","mug:9",{hidden:!0,why:"cap appears twice in shop 1 — add both."})],requires:[{node:"Dict"},{node:"BinOp",min:2}],hints:["Read each shop into its own dict with .get(item, 0) + qty — then build the combined one the same way.","set(shop1) - set(shop2), set(shop2) - set(shop1), set(shop1) & set(shop2)",'", ".join(sorted(s)) or "none" — an empty string is falsy.'],solution:`s1 = input("Shop 1: ")
s2 = input("Shop 2: ")
shop1 = {}
for pair in s1.split():
    item, qty = pair.split(":")
    shop1[item] = shop1.get(item, 0) + int(qty)
shop2 = {}
for pair in s2.split():
    item, qty = pair.split(":")
    shop2[item] = shop2.get(item, 0) + int(qty)

total = {}
for shop in (shop1, shop2):
    for item, qty in shop.items():
        total[item] = total.get(item, 0) + qty
for item in sorted(total):
    print(f"{item}: {total[item]}")

only1 = set(shop1) - set(shop2)
only2 = set(shop2) - set(shop1)
both = set(shop1) & set(shop2)
print("Only in shop 1:", ", ".join(sorted(only1)) or "none")
print("Only in shop 2:", ", ".join(sorted(only2)) or "none")
print("In both:", ", ".join(sorted(both)) or "none")

best = sorted(total)[0]
for item in sorted(total):
    if total[item] > total[best]:
        best = item
print(f"Most stocked: {best} ({total[best]})")`}},j=o,g=[{q:"b = a for a list, then b.append(1). What happens to a?",options:["Nothing","a gets the 1 too — same list","Error","a becomes a copy"],answer:1,explain:"Two name tags, one list. Use a[:] or a.copy() for a separate list."},{q:"nums = nums.sort() leaves nums as…",options:["The sorted list","None","The original list","An error"],answer:1,explain:".sort() returns None. Use nums.sort() alone, or nums = sorted(nums)."},{q:"Which needs .get(key, 0) to avoid a crash?",options:["d[key] = 5","d[key] += 1 for a new key","key in d","len(d)"],answer:1,explain:"+= reads the old value first — and a new key has none."}];function S(t){return e.jsx(b,{...t,unitId:"Unit7_C",module:"Module 7",title:"The Crucible: Data Structures",spark:[o.spark1,o.spark2],flame:[o.remove,o.votes],forge:[o.records],temper:[o.merge],quiz:g})}export{j as EXERCISES,S as default};
