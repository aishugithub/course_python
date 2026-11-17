import{j as e}from"./index-BsB65IVi.js";import{C as h}from"./Crucible-DIvkmO_M.js";import"./Lesson-M2Z85AvF.js";const p=n=>({text:"#",min:n,msg:`Write your algorithm first, as at least ${n} # comment lines.`});function c(n){let r="",o="",l=0,t=0;for(;t<n.length;){let s=t;for(;s<n.length&&n[s]===n[t];)s++;r+=n[t]+(s-t),s-t>l&&(l=s-t,o=n[t]),t=s}return`Text: ${n}
Encoded: ${r}
Longest run: ${o} (${l})`}const a=(n,r={})=>({inputs:[n],expect:c(n),...r}),d=`nums = []
for x in input("Numbers: ").split():
    nums.append(int(x))
`,i={spark1:{id:"spark1",kind:"predict",title:"Bubble sort, pass by pass",code:`data = [5, 1, 4, 2]
for p in range(len(data) - 1):
    swapped = False
    for i in range(len(data) - 1 - p):
        if data[i] > data[i + 1]:
            data[i], data[i + 1] = data[i + 1], data[i]
            swapped = True
    print(p + 1, data)
    if not swapped:
        break`,task:e.jsx(e.Fragment,{children:"Each pass walks along the list swapping neighbours that are out of order. Print the list after every pass."}),hints:["Pass 1 carries the 5 all the way to the end.","Each pass looks at one fewer pair (len - 1 - p).","Pass 3 makes no swap — it still prints, then breaks."],solution:`1 [1, 4, 2, 5]
2 [1, 2, 4, 5]
3 [1, 2, 4, 5]`},spark2:{id:"spark2",kind:"predict",title:"Binary search, step by step",code:`data = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23
low = 0
high = len(data) - 1
while low <= high:
    mid = (low + high) // 2
    print(low, high, mid, data[mid])
    if data[mid] == target:
        print("found at", mid)
        break
    elif data[mid] < target:
        low = mid + 1
    else:
        high = mid - 1`,task:e.jsxs(e.Fragment,{children:["Track ",e.jsx("code",{children:"low"}),", ",e.jsx("code",{children:"high"})," and ",e.jsx("code",{children:"mid"}),". Positions count from 0."]}),hints:["mid = (0 + 9) // 2 = 4, and data[4] is 16.","16 < 23, so the answer is to the right: low = mid + 1."],solution:`0 9 4 16
5 9 7 56
5 6 5 23
found at 5`},selection:{id:"selection",kind:"fix",title:"Selection sort that doesn't select",task:e.jsxs(e.Fragment,{children:["Selection sort: for each position, find the smallest of the remaining items and swap it in. This version compares with the wrong item. Fix it (no ",e.jsx("code",{children:"sort"})," / ",e.jsx("code",{children:"sorted"}),")."]}),starter:d+`for i in range(len(nums)):
    smallest = i
    for j in range(i + 1, len(nums)):
        if nums[j] < nums[i]:
            smallest = j
    nums[i], nums[smallest] = nums[smallest], nums[i]
print(nums)`,tests:[{inputs:["4 3 1 2"],expect:`Numbers: 4 3 1 2
[1, 2, 3, 4]`},{inputs:["9 7 8 1 5"],expect:`Numbers: 9 7 8 1 5
[1, 5, 7, 8, 9]`,hidden:!0},{inputs:["3"],expect:`Numbers: 3
[3]`,hidden:!0}],forbids:[{call:"sort"},{call:"sorted"},{call:"min"}],hints:["smallest is the position of the best so far. Compare each new item with THAT item.","if nums[j] < nums[smallest]:"],solution:d+`for i in range(len(nums)):
    smallest = i
    for j in range(i + 1, len(nums)):
        if nums[j] < nums[smallest]:
            smallest = j
    nums[i], nums[smallest] = nums[smallest], nums[i]
print(nums)`},dups:{id:"dups",kind:"fix",title:"Duplicates, once each",task:e.jsxs(e.Fragment,{children:["Report each repeated value ",e.jsx("strong",{children:"once"}),", in the order it first repeats. For ",e.jsx("code",{children:"4 7 4 9 4 7"})," that's ",e.jsx("code",{children:"[4, 7]"}),' — this prints 4 twice. Fix it; a set makes the "have I seen it?" check fast.']}),starter:d+`seen = []
dups = []
for n in nums:
    if n in seen:
        dups.append(n)
    seen.append(n)
print("Duplicates:", dups)`,tests:[{inputs:["4 7 4 9 4 7"],expect:`Numbers: 4 7 4 9 4 7
Duplicates: [4, 7]`},{inputs:["1 2 3"],expect:`Numbers: 1 2 3
Duplicates: []`,hidden:!0},{inputs:["5 5 5 5"],expect:`Numbers: 5 5 5 5
Duplicates: [5]`,hidden:!0}],hints:["Before appending to dups, check it isn't already there.","if n in seen and n not in dups:"],solution:d+`seen = set()
dups = []
for n in nums:
    if n in seen and n not in dups:
        dups.append(n)
    seen.add(n)
print("Duplicates:", dups)`},merge:{id:"merge",kind:"complete",title:"Merge two sorted lists",task:e.jsxs(e.Fragment,{children:["Two lists, each already sorted. Walk both with two positions ",e.jsx("code",{children:"i"})," and ",e.jsx("code",{children:"j"}),", always taking the smaller front item; when one runs out, add what's left of the other. This is the heart of merge sort. Fill the blanks."]}),starter:`a = []
for x in input("List A: ").split():
    a.append(int(x))
b = []
for x in input("List B: ").split():
    b.append(int(x))
merged = []
i = 0
j = 0
while i < len(a) and j < len(b):
    if a[i] <= b[j]:
        merged.append(a[i])
        i += 1
    else:
        merged.append(___)
        j += ___
merged += a[___:]
merged += b[___:]
print(merged)`,tests:[{inputs:["1 4 9","2 3 10 12"],expect:`List A: 1 4 9
List B: 2 3 10 12
[1, 2, 3, 4, 9, 10, 12]`},{inputs:["5","1 2 3"],expect:`List A: 5
List B: 1 2 3
[1, 2, 3, 5]`,hidden:!0},{inputs:["2 2","2"],expect:`List A: 2 2
List B: 2
[2, 2, 2]`,hidden:!0}],forbids:[{call:"sort"},{call:"sorted"}],hints:["merged.append(b[j]) and j += 1","What's left of a starts at position i: a[i:]"],solution:`a = []
for x in input("List A: ").split():
    a.append(int(x))
b = []
for x in input("List B: ").split():
    b.append(int(x))
merged = []
i = 0
j = 0
while i < len(a) and j < len(b):
    if a[i] <= b[j]:
        merged.append(a[i])
        i += 1
    else:
        merged.append(b[j])
        j += 1
merged += a[i:]
merged += b[j:]
print(merged)`},rle:{id:"rle",kind:"make",title:"Run-length encoding",task:e.jsxs(e.Fragment,{children:["Compress text by writing each run of the same letter as the letter and its length: ",e.jsx("code",{children:"aaabccdddd"})," → ",e.jsx("code",{children:"a3b1c2d4"}),". Ask ",e.jsx("code",{children:"Text: "}),", print ",e.jsx("code",{children:"Encoded: a3b1c2d4"})," and ",e.jsx("code",{children:"Longest run: d (4)"})," (the first one if there's a tie). Write the algorithm first as ",e.jsx("code",{children:"#"})," comments."]}),minLines:14,tests:[a("aaabccdddd"),a("x",{hidden:!0}),a("aabbb",{hidden:!0}),a("abab",{hidden:!0,why:"A letter can come back later as a new run: a1b1a1b1."}),a("zzzzyyyy",{hidden:!0,why:"A tie: the first longest run wins — use >, not >=."})],requires:[p(3),{node:"While"}],hints:["Keep a position i. From i, move j forward while text[j] is the same letter; the run length is j - i.","Add text[i] + str(j - i) to the result, then jump: i = j.","Track the longest run with > so the first one wins ties."],solution:`# start at the first letter
# move forward while the letter repeats; the run length is how far we moved
# write the letter and the length, then continue from the next new letter
# remember the longest run seen so far
text = input("Text: ")
encoded = ""
best_letter = ""
best_len = 0
i = 0
while i < len(text):
    j = i
    while j < len(text) and text[j] == text[i]:
        j += 1
    encoded += text[i] + str(j - i)
    if j - i > best_len:
        best_len = j - i
        best_letter = text[i]
    i = j
print("Encoded:", encoded)
print(f"Longest run: {best_letter} ({best_len})")`}},x=i,m=[{q:"Binary search on 1,000,000 sorted items needs at most about…",options:["1,000,000 checks","500,000 checks","20 checks","1 check"],answer:2,explain:"Halving each time: 2²⁰ ≈ 1,000,000."},{q:"Bubble sort can stop early when…",options:["The first item is smallest","A whole pass makes no swaps","Half the passes are done","Never"],answer:1,explain:"No swaps means everything is already in order."},{q:"Why use a set for 'have I seen this?'",options:["Sets keep order","Checking x in a set is fast however big it gets","Sets allow repeats","Lists can't use in"],answer:1,explain:"in on a list checks item by item; a set jumps straight there."}];function b(n){return e.jsx(h,{...n,unitId:"UnitCT2_C",module:"Computational Thinking II",title:"The Crucible: Classic Algorithms",spark:[i.spark1,i.spark2],flame:[i.selection,i.dups],forge:[i.merge],temper:[i.rle],quiz:m})}export{x as EXERCISES,b as default};
