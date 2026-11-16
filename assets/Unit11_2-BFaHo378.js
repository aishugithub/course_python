import{j as e}from"./index-5ju0ARcj.js";import{P as m,C as k,K as w,N as x,T as g,L as y}from"./Lesson-B4adq15Q.js";const h=s=>"["+s.map(t=>typeof t=="string"?`'${t}'`:String(t)).join(", ")+"]",b=s=>"{"+s.map(([t,i])=>`'${t}': ${i}`).join(", ")+"}",u=s=>{const t=s.split(" "),i=new Map;return t.forEach(n=>i.set(n,n.length)),`Words: ${s}
${b([...i])}
Lengths seen: ${h([...new Set(t.map(n=>n.length))].sort((n,a)=>n-a))}`},l=s=>{const i=s.split(" ").map(n=>{const[a,o]=n.split(":");return[a,+o]}).map((n,a)=>[...n,a]).sort((n,a)=>a[1]-n[1]||n[2]-a[2]);return`Scores: ${s}
`+i.map(([n,a],o)=>`${o+1}. ${n} ${a}`).join(`
`)},p=s=>{const t=s.split(" ").map(Number).sort((i,n)=>i-n).slice(1,-1);return`Scores: ${s}
Kept: ${h(t)}
Average: ${(t.reduce((i,n)=>i+n,0)/t.length).toFixed(2)}`},c=s=>{const t=s.split(" "),i=new Map;t.forEach(o=>i.set(o,(i.get(o)||0)+1));const n=[...i].sort((o,d)=>d[1]-o[1]||(o[0]<d[0]?-1:1)).slice(0,3),a=[...new Set(t)].filter(o=>o.length>=4).sort();return[`Text: ${s}`,...n.map(([o,d],f)=>`${f+1}. ${o} (${d})`),`Long words: ${h(a)}`].join(`
`)},r={listcomp:{id:"listcomp",kind:"type",title:"Lists in one line",task:e.jsxs(e.Fragment,{children:["A ",e.jsx("strong",{children:"list comprehension"})," builds a list from a loop in one expression: ",e.jsx("code",{children:"[what for item in things if condition]"}),". Read each one aloud: “n times n, for n in 1 to 5”."]}),show:`squares = [n * n for n in range(1, 6)]
evens = [n for n in range(1, 11) if n % 2 == 0]
shout = [w.upper() for w in ["hi", "there"]]

print(squares)
print(evens)
print(shout)`,tests:[{expect:`[1, 4, 9, 16, 25]
[2, 4, 6, 8, 10]
['HI', 'THERE']`}],requires:[{node:"ListComp",min:3}],hints:["The if at the end filters; the expression at the front transforms."],solution:`squares = [n * n for n in range(1, 6)]
evens = [n for n in range(1, 11) if n % 2 == 0]
shout = [w.upper() for w in ["hi", "there"]]

print(squares)
print(evens)
print(shout)`},rewrite:{id:"rewrite",kind:"modify",title:"Loop → comprehension",task:e.jsxs(e.Fragment,{children:["This works, but takes five lines to say “the long names, in capitals”. Replace the loop and the empty list with ",e.jsx("strong",{children:"one"})," list comprehension. Same output."]}),starter:`names = input("Names: ").split()
long_names = []
for name in names:
    if len(name) > 3:
        long_names.append(name.upper())
print(long_names)`,tests:[{inputs:["Asha Ben Chen Divya"],expect:`Names: Asha Ben Chen Divya
['ASHA', 'CHEN', 'DIVYA']`},{inputs:["Al Bo"],expect:`Names: Al Bo
[]`,hidden:!0}],requires:[{node:"ListComp"}],forbids:[{node:"For",msg:"No for statement — put the loop inside the brackets."},{call:"append"}],hints:["[ what  for name in names  if condition ]","long_names = [name.upper() for name in names if len(name) > 3]"],solution:`names = input("Names: ").split()
long_names = [name.upper() for name in names if len(name) > 3]
print(long_names)`},passfail:{id:"passfail",kind:"write",title:"if/else inside",task:e.jsxs(e.Fragment,{children:["To ",e.jsx("em",{children:"choose"})," a value for every item (not filter), put a one-line if/else at the ",e.jsx("strong",{children:"front"}),": ",e.jsx("code",{children:'["pass" if m >= 40 else "fail" for m in marks]'}),". Ask ",e.jsx("code",{children:"Marks: "})," and print the list of results, then ",e.jsx("code",{children:"Passed: 2/3"})," (count with another comprehension and ",e.jsx("code",{children:"len"}),")."]}),tests:[{inputs:["55 32 78"],expect:`Marks: 55 32 78
['pass', 'fail', 'pass']
Passed: 2/3`},{inputs:["40 39"],expect:`Marks: 40 39
['pass', 'fail']
Passed: 1/2`,hidden:!0}],requires:[{node:"ListComp",min:2},{node:"IfExp"}],forbids:[{node:"For",msg:"Use comprehensions, not a for statement."}],hints:['marks = [int(x) for x in input("Marks: ").split()]',"passed = [m for m in marks if m >= 40]  — then len(passed)"],solution:`marks = [int(x) for x in input("Marks: ").split()]
results = ["pass" if m >= 40 else "fail" for m in marks]
print(results)
passed = [m for m in marks if m >= 40]
print(f"Passed: {len(passed)}/{len(marks)}")`},dictcomp:{id:"dictcomp",kind:"write",title:"Dict and set comprehensions",task:e.jsxs(e.Fragment,{children:["Curly brackets work too: ",e.jsxs("code",{children:["{","w: len(w) for w in words","}"]})," builds a ",e.jsx("strong",{children:"dictionary"}),"; ",e.jsxs("code",{children:["{","len(w) for w in words","}"]})," builds a ",e.jsx("strong",{children:"set"})," (no repeats). Ask ",e.jsx("code",{children:"Words: "}),"; print the word → length dictionary, then ",e.jsx("code",{children:"Lengths seen: [3, 4]"})," — the set, sorted into a list."]}),tests:[{inputs:["sun moon star"],expect:u("sun moon star")},{inputs:["a bb a"],expect:u("a bb a"),hidden:!0,why:"A repeated word is just one key in the dictionary."}],requires:[{node:"DictComp"},{node:"SetComp"}],forbids:[{node:"For",msg:"Use comprehensions, not a for statement."}],hints:["sizes = {w: len(w) for w in words}",'seen = {len(w) for w in words}; print("Lengths seen:", sorted(seen))'],solution:`words = input("Words: ").split()
sizes = {w: len(w) for w in words}
print(sizes)
seen = {len(w) for w in words}
print(f"Lengths seen: {sorted(seen)}")`},prices:{id:"prices",kind:"complete",title:"Transform a dictionary",task:e.jsxs(e.Fragment,{children:["Loop over ",e.jsx("code",{children:".items()"})," inside a dict comprehension to build a new dictionary from an old one. Fill in the blanks: a 10% sale on everything, and a dictionary of only the items under 100 after the sale."]}),starter:`prices = {"pen": 10, "book": 60, "bag": 450, "lamp": 110}

sale = {item: ___ for item, p in prices.items()}
cheap = {item: p for item, p in sale.items() if ___}

print(sale)
print(cheap)`,tests:[{expect:`{'pen': 9.0, 'book': 54.0, 'bag': 405.0, 'lamp': 99.0}
{'pen': 9.0, 'book': 54.0, 'lamp': 99.0}`}],requires:[{node:"DictComp",min:2}],hints:["p * 0.9 — then round(…, 2) keeps it tidy","if p < 100"],solution:`prices = {"pen": 10, "book": 60, "bag": 450, "lamp": 110}

sale = {item: round(p * 0.9, 2) for item, p in prices.items()}
cheap = {item: p for item, p in sale.items() if p < 100}

print(sale)
print(cheap)`},sortkey:{id:"sortkey",kind:"type",title:"sorted(key=…)",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"sorted"})," can sort by anything: ",e.jsx("code",{children:"key="})," takes a function that turns each item into the value to compare. ",e.jsx("code",{children:"key=len"})," sorts by length. A ",e.jsx("strong",{children:"lambda"})," is a tiny nameless function written inline: ",e.jsx("code",{children:"lambda s: s[1]"})," means “given s, give back s[1]”."]}),show:`words = ["banana", "fig", "apple", "kiwi"]
print(sorted(words))
print(sorted(words, key=len))
print(sorted(words, key=len, reverse=True))

students = [("Asha", 82), ("Ben", 45), ("Chen", 91)]
print(sorted(students, key=lambda s: s[1]))
print(max(students, key=lambda s: s[1]))`,tests:[{expect:`['apple', 'banana', 'fig', 'kiwi']
['fig', 'kiwi', 'apple', 'banana']
['banana', 'apple', 'kiwi', 'fig']
[('Ben', 45), ('Asha', 82), ('Chen', 91)]
('Chen', 91)`}],requires:[{node:"Lambda",min:2}],hints:["Without a key, tuples sort by their first item — the name. The lambda says: compare by the mark instead."],solution:`words = ["banana", "fig", "apple", "kiwi"]
print(sorted(words))
print(sorted(words, key=len))
print(sorted(words, key=len, reverse=True))

students = [("Asha", 82), ("Ben", 45), ("Chen", 91)]
print(sorted(students, key=lambda s: s[1]))
print(max(students, key=lambda s: s[1]))`},leader:{id:"leader",kind:"write",title:"Leaderboard",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Scores: "})," as ",e.jsx("code",{children:"name:score"})," pairs (e.g. ",e.jsx("code",{children:"Asha:82 Ben:45"}),"). Build a list of (name, score) tuples, sort it highest first with a ",e.jsx("code",{children:"lambda"})," key, and print ranks with ",e.jsx("code",{children:"enumerate(…, start=1)"}),": ",e.jsx("code",{children:"1. Chen 91"}),". Equal scores keep the order they were typed (sorted is ",e.jsx("em",{children:"stable"}),")."]}),tests:[{inputs:["Asha:82 Ben:45 Chen:91 Dev:82"],expect:l("Asha:82 Ben:45 Chen:91 Dev:82")},{inputs:["Zed:10"],expect:l("Zed:10"),hidden:!0},{inputs:["Bo:5 Al:5 Cy:7"],expect:l("Bo:5 Al:5 Cy:7"),hidden:!0,why:"Ties keep their typed order — sort by the score only (reverse=True), not by name too."}],requires:[{node:"Lambda"},{call:"sorted"},{call:"enumerate"}],hints:['pairs = [p.split(":") for p in input("Scores: ").split()] — then make (name, int(score)) tuples',"ranked = sorted(rows, key=lambda r: r[1], reverse=True)",'for i, (name, score) in enumerate(ranked, start=1): print(f"{i}. {name} {score}")'],solution:`rows = []
for pair in input("Scores: ").split():
    name, score = pair.split(":")
    rows.append((name, int(score)))

ranked = sorted(rows, key=lambda r: r[1], reverse=True)
for i, (name, score) in enumerate(ranked, start=1):
    print(f"{i}. {name} {score}")`},anyall:{id:"anyall",kind:"write",title:"any() and all()",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"all(…)"})," is True if ",e.jsx("em",{children:"every"})," item is true; ",e.jsx("code",{children:"any(…)"})," if ",e.jsx("em",{children:"at least one"})," is. Feed them a comprehension without the brackets: ",e.jsx("code",{children:"all(m >= 40 for m in marks)"}),". Ask ",e.jsx("code",{children:"Marks: "}),"; print ",e.jsx("code",{children:"All passed: False"})," and ",e.jsx("code",{children:"Any distinction: True"})," (distinction is 75 or more). No for statements, no if."]}),tests:[{inputs:["55 32 78"],expect:`Marks: 55 32 78
All passed: False
Any distinction: True`},{inputs:["90 80"],expect:`Marks: 90 80
All passed: True
Any distinction: True`,hidden:!0},{inputs:["10 20"],expect:`Marks: 10 20
All passed: False
Any distinction: False`,hidden:!0}],requires:[{call:"any"},{call:"all"}],forbids:[{node:"For",msg:"Let any() and all() do the looping."},{node:"If"}],hints:['print(f"All passed: {all(m >= 40 for m in marks)}")'],solution:`marks = [int(x) for x in input("Marks: ").split()]
print(f"All passed: {all(m >= 40 for m in marks)}")
print(f"Any distinction: {any(m >= 75 for m in marks)}")`},unpack:{id:"unpack",kind:"type",title:"Star unpacking and swaps",task:e.jsxs(e.Fragment,{children:["Unpacking (7.4) gets a ",e.jsx("code",{children:"*"}),": the starred name collects ",e.jsx("em",{children:"everything left over"})," into a list. And swapping two variables needs no temporary."]}),show:`scores = [7, 9, 4, 8, 10]
first, *rest = scores
*others, last = scores
low, *middle, high = sorted(scores)
print(first, rest)
print(last)
print(low, middle, high)

a, b = 1, 2
a, b = b, a
print(a, b)`,tests:[{expect:`7 [9, 4, 8, 10]
10
4 [7, 8, 9] 10
2 1`}],requires:[{node:"Starred",min:3}],hints:["Only one name per unpacking can have the star."],solution:`scores = [7, 9, 4, 8, 10]
first, *rest = scores
*others, last = scores
low, *middle, high = sorted(scores)
print(first, rest)
print(last)
print(low, middle, high)

a, b = 1, 2
a, b = b, a
print(a, b)`},args:{id:"args",kind:"type",optional:!0,title:"*args: any number of arguments",task:e.jsxs(e.Fragment,{children:["A star in front of a parameter collects all the extra arguments into one tuple. That is how ",e.jsx("code",{children:"print"})," and ",e.jsx("code",{children:"max"})," accept as many values as you give them."]}),show:`def total(*nums):
    print(nums)
    return sum(nums)

print(total(5, 10))
print(total(1, 2, 3, 4))`,tests:[{expect:`(5, 10)
15
(1, 2, 3, 4)
10`}],requires:[{text:"*nums"}],hints:["Inside the function, nums is an ordinary tuple."],solution:`def total(*nums):
    print(nums)
    return sum(nums)

print(total(5, 10))
print(total(1, 2, 3, 4))`},hintsdemo:{id:"hintsdemo",kind:"type",optional:!0,title:"Type hints: notes for the reader",task:e.jsxs(e.Fragment,{children:["Type hints say what a function expects and returns. Editors and other programmers read them. Python itself does ",e.jsx("strong",{children:"not"})," enforce them: watch the second call."]}),show:`def area(length: float, width: float) -> float:
    return length * width

print(area(4, 2.5))
print(area("ab", 2))`,tests:[{expect:`10.0
abab`}],requires:[{text:"->"}],hints:["The hint goes after a colon; the return type after ->."],solution:`def area(length: float, width: float) -> float:
    return length * width

print(area(4, 2.5))
print(area("ab", 2))`},jsondemo:{id:"jsondemo",kind:"type",optional:!0,title:"JSON: data as text",task:e.jsxs(e.Fragment,{children:["JSON is how programs send dictionaries and lists to each other as text (every web API uses it). ",e.jsx("code",{children:"json.dumps"})," turns Python data into text; ",e.jsx("code",{children:"json.loads"})," turns the text back."]}),show:`import json

student = {"name": "Priya", "marks": [87, 91]}
text = json.dumps(student)
print(text)
back = json.loads(text)
print(back["marks"][1])`,tests:[{expect:`{"name": "Priya", "marks": [87, 91]}
91`}],requires:[{call:"dumps"},{call:"loads"}],hints:["dumps = dump to a string; loads = load from a string."],solution:`import json

student = {"name": "Priya", "marks": [87, 91]}
text = json.dumps(student)
print(text)
back = json.loads(text)
print(back["marks"][1])`},judges:{id:"judges",kind:"write",title:"The judges' score",task:e.jsxs(e.Fragment,{children:["In diving, the highest and lowest judges' scores are dropped and the rest averaged. Ask ",e.jsx("code",{children:"Scores: "})," (at least three), sort them, and use star unpacking to drop the ends: print ",e.jsx("code",{children:"Kept: [7, 8, 9]"})," and ",e.jsx("code",{children:"Average: 8.00"}),"."]}),tests:[{inputs:["7 9 4 8 10"],expect:p("7 9 4 8 10")},{inputs:["5 5 5"],expect:p("5 5 5"),hidden:!0},{inputs:["6 1 9 2"],expect:p("6 1 9 2"),hidden:!0}],requires:[{node:"Starred"}],forbids:[{call:"remove",msg:"Use star unpacking, not remove()."}],hints:["low, *kept, high = sorted(scores)","sum(kept) / len(kept)"],solution:`scores = [int(x) for x in input("Scores: ").split()]
low, *kept, high = sorted(scores)
print(f"Kept: {kept}")
print(f"Average: {sum(kept) / len(kept):.2f}")`},wordfreq:{id:"wordfreq",kind:"make",title:"Word-frequency report",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Text: "})," (lowercase words). Count each word with a ",e.jsx("strong",{children:"dict comprehension"})," (hint: over ",e.jsx("code",{children:"set(words)"}),", using ",e.jsx("code",{children:"words.count(w)"}),"). Print the top three, most frequent first and ties in alphabetical order — one ",e.jsx("code",{children:"sorted"})," with ",e.jsx("code",{children:"key=lambda item: (-item[1], item[0])"})," does both — as ",e.jsx("code",{children:"1. the (3)"}),". Last, print ",e.jsx("code",{children:"Long words: […]"}),": the distinct words of 4+ letters, sorted, from a comprehension."]}),minLines:8,tests:[{inputs:["the quick fox and the lazy dog and the end"],expect:c("the quick fox and the lazy dog and the end")},{inputs:["b a b a c"],expect:c("b a b a c"),hidden:!0,why:"a and b both appear twice — ties go alphabetically: (-count, word)."},{inputs:["data data science"],expect:c("data data science"),hidden:!0,why:"Fewer than three distinct words — slice the sorted list with [:3]."}],requires:[{node:"DictComp"},{node:"Lambda"},{call:"sorted",min:2}],hints:["counts = {w: words.count(w) for w in set(words)}","top = sorted(counts.items(), key=lambda item: (-item[1], item[0]))[:3]","long = sorted({w for w in words if len(w) >= 4})"],solution:`words = input("Text: ").split()
counts = {w: words.count(w) for w in set(words)}
top = sorted(counts.items(), key=lambda item: (-item[1], item[0]))[:3]
for i, (word, n) in enumerate(top, start=1):
    print(f"{i}. {word} ({n})")
long = sorted({w for w in words if len(w) >= 4})
print(f"Long words: {long}")`}},T=r,j=[{q:"What does [x * 2 for x in [1, 2, 3] if x > 1] give?",options:["[2, 4, 6]","[4, 6]","[1, 2, 3]","[2, 3]"],answer:1,explain:"Filter first (2 and 3), then transform (×2)."},{q:"Which builds a dictionary?",options:["[k: v for k, v in d.items()]","{k: v for k, v in d.items()}","(k, v for k, v in d)","{k for k in d}"],answer:1,explain:"Curly brackets with key: value. {k for k in d} is a set."},{q:"sorted(words, key=len) sorts by…",options:["Alphabet","Length of each word","Reverse order","Nothing — error"],answer:1,explain:"key turns each item into the value used for comparing."},{q:"lambda x: x * x is…",options:["A list","A small nameless function that returns x * x","A loop","A variable"],answer:1,explain:"Same as def f(x): return x * x — written inline."},{q:"a, *b = [1, 2, 3] makes b equal to…",options:["2","[2, 3]","(2, 3)","3"],answer:1,explain:"The starred name collects the rest, always as a list."}];function q(s){const t=[{label:"Comprehensions",kicker:"LOOPS IN ONE LINE",title:"List comprehensions, properly",blocks:[e.jsx(m,{children:"You met the comprehension as a bonus in 7.3. Pythonistas use it everywhere — when it reads like a sentence. Three shapes:"}),e.jsx(k,{title:"three shapes",code:`[f(x) for x in items]                 # transform every item
[x for x in items if test(x)]         # keep only some
[a if test(x) else b for x in items]  # choose for every item`}),r.listcomp,r.rewrite,r.passfail]},{label:"Dict & Set",kicker:"CURLY BRACKETS",title:"Dict and set comprehensions",blocks:[r.dictcomp,r.prices]},{label:"Sort by Key",kicker:"key= AND lambda",title:"Sorting by anything",blocks:[r.sortkey,r.leader,e.jsx(w,{children:"key= works with sorted, .sort, min and max. Use lambda for one small expression; anything longer deserves a proper def with a name."})]},{label:"any · all · *",kicker:"SMALL TOOLS",title:"any, all and star unpacking",blocks:[r.anyall,r.unpack,r.judges]},{label:"Extras",kicker:"OPTIONAL · GOOD TO HAVE SEEN",title:"Three things you will meet in other people's code",blocks:[e.jsx(m,{children:"None of these is needed to finish the course, and none counts towards the unit. Each takes two minutes to type, and you will recognise them when you read real projects."}),r.args,r.hintsdemo,r.jsondemo]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: word-frequency report",blocks:[r.wordfreq,e.jsx(x,{color:g.blue,icon:"💡",children:"Pythonic doesn't mean shortest. If a comprehension needs two ifs and a nested loop, a plain for loop is kinder to the next reader."})]}];return e.jsx(y,{...s,unitId:"Unit11_2",crumb:"MODULE 11 › 2",title:"Pythonic Python",sections:t,quiz:j,next:{title:"Module 12 — Meet Pandas",text:"Tables of real data: the DataFrame."}})}export{T as EXERCISES,q as default};
