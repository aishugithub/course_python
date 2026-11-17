import{j as e}from"./index-BsB65IVi.js";import{P as d,C as l,K as x,N as y,T as g,L as j}from"./Lesson-M2Z85AvF.js";const h=(t,n)=>`import sys, importlib
sys.modules.pop(${JSON.stringify(t)}, None)
with open(${JSON.stringify(t+".py")}, "w") as _f:
    _f.write(${JSON.stringify(n)})
importlib.invalidate_caches()`,c=t=>`TAX = ${t}

def with_tax(price):
    return price * (1 + TAX)

def discount(price, percent):
    return price - price * percent / 100

if __name__ == "__main__":
    print("shop.py self-test:", with_tax(100))
`,_=t=>(Number.isInteger(t),String(t)),w=t=>{const n=[...t].sort((i,o)=>i-o),s=n.length;return s%2?_(n[(s-1)/2]):(()=>{const i=(n[s/2-1]+n[s/2])/2;return Number.isInteger(i)?i.toFixed(1):String(i)})()},k=t=>{const n=new Map;t.forEach(i=>n.set(i,(n.get(i)||0)+1));let s=t[0];return n.forEach((i,o)=>{i>n.get(s)&&(s=o)}),s},b=t=>(t.reduce((n,s)=>n+s,0)/t.length).toFixed(2),u=t=>t>=90?"A":t>=75?"B":t>=60?"C":t>=40?"D":"F",m=t=>{const n=t.split(" ").map(Number),s={};return n.forEach(i=>{s[u(i)]=(s[u(i)]||0)+1}),[`Marks: ${t}`,`Mean: ${b(n)}`,`Median: ${w(n)}`,`Most common: ${k(n)}`,`Grades: ${"ABCDF".split("").map(i=>`${i}=${s[i]||0}`).join(" ")}`].join(`
`)},M=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],p=(t,n)=>{const s=i=>Date.UTC(+i.slice(0,4),+i.slice(5,7)-1,+i.slice(8,10));return`From (YYYY-MM-DD): ${t}
To (YYYY-MM-DD): ${n}
Days: ${(s(n)-s(t))/864e5}
That day is a ${M[new Date(s(n)).getUTCDay()]}`},f=t=>{const n=t.trim().split(`
`);if(n.length!==7)return`Expected 7 lines (faces 1–6, then Total), got ${n.length}.`;let s=0;for(let i=1;i<=6;i++){const o=n[i-1].match(/^(\d): (\d+)$/);if(!o||+o[1]!==i)return`Line ${i} should look like "${i}: 97".`;const a=+o[2];if(a<50||a>150)return`Face ${i} came up ${a} times out of 600 — that's not a fair die. Are you rolling inside the loop?`;s+=a}return n[6]!==`Total: ${s}`||s!==600?`The last line should be "Total: 600" — the counts add up to ${s}.`:null},r={tour:{id:"tour",kind:"type",title:"Borrow some maths",task:e.jsxs(e.Fragment,{children:["Python ships with hundreds of ",e.jsx("strong",{children:"modules"})," — files of ready-made code. ",e.jsx("code",{children:"import math"})," loads one; then ",e.jsx("code",{children:"math."})," reaches inside it."]}),show:`import math

print(math.sqrt(49))
print(math.pi)
print(math.ceil(4.2), math.floor(4.8))
print(math.gcd(18, 24))`,tests:[{expect:`7.0
3.141592653589793
5 4
6`}],requires:[{node:"Import"}],hints:["The dot means “inside”: math.sqrt is the sqrt that lives in the math module."],solution:`import math

print(math.sqrt(49))
print(math.pi)
print(math.ceil(4.2), math.floor(4.8))
print(math.gcd(18, 24))`},fromfix:{id:"fromfix",kind:"fix",title:"Bring a name in directly",task:e.jsxs(e.Fragment,{children:["This program imports ",e.jsx("code",{children:"math"})," but then writes plain ",e.jsx("code",{children:"pi"}),", so Python can't find it. Fix it with the other form: ",e.jsx("code",{children:"from math import pi"})," brings the name ",e.jsx("code",{children:"pi"})," straight into your program (no ",e.jsx("code",{children:"math."})," needed). Use that form, not ",e.jsx("code",{children:"math.pi"}),"."]}),starter:`import math

r = float(input("Radius: "))
print(f"Area: {pi * r ** 2:.2f}")`,tests:[{inputs:["2"],expect:`Radius: 2
Area: 12.57`},{inputs:["0.5"],expect:`Radius: 0.5
Area: 0.79`,hidden:!0}],requires:[{node:"ImportFrom",msg:"Use the form: from math import pi"}],forbids:[{text:"math.pi",msg:"Use from math import pi, then plain pi."}],hints:["Replace the first line with: from math import pi"],solution:`from math import pi

r = float(input("Radius: "))
print(f"Area: {pi * r ** 2:.2f}")`},alias:{id:"alias",kind:"write",title:"A short nickname",task:e.jsxs(e.Fragment,{children:["The third form gives a module a nickname: ",e.jsx("code",{children:"import math as m"}),", then ",e.jsx("code",{children:"m.sqrt(…)"}),". (You'll see ",e.jsx("code",{children:"import pandas as pd"})," everywhere in Module 12.) Ask ",e.jsx("code",{children:"Side a: "})," and ",e.jsx("code",{children:"Side b: "})," and print the hypotenuse √(a² + b²) as ",e.jsx("code",{children:"Hypotenuse: 5.00"}),", using the nickname."]}),tests:[{inputs:["3","4"],expect:`Side a: 3
Side b: 4
Hypotenuse: 5.00`},{inputs:["5","12"],expect:`Side a: 5
Side b: 12
Hypotenuse: 13.00`,hidden:!0},{inputs:["1","1"],expect:`Side a: 1
Side b: 1
Hypotenuse: 1.41`,hidden:!0}],validate:t=>/^\s*import\s+math\s+as\s+\w+/m.test(t)?null:"Import math with a nickname: import math as m",hints:["import math as m",'print(f"Hypotenuse: {m.sqrt(a ** 2 + b ** 2):.2f}")'],solution:`import math as m

a = float(input("Side a: "))
b = float(input("Side b: "))
print(f"Hypotenuse: {m.sqrt(a ** 2 + b ** 2):.2f}")`},dice:{id:"dice",kind:"write",title:"600 dice rolls",task:e.jsxs(e.Fragment,{children:["You met ",e.jsx("code",{children:"random"})," in the guessing game (6.4). Roll a die 600 times with ",e.jsx("code",{children:"random.randint(1, 6)"}),", count how often each face comes up (a dictionary or a list of counts), then print ",e.jsx("code",{children:"1: 97"})," … ",e.jsx("code",{children:"6: 104"})," and ",e.jsx("code",{children:"Total: 600"}),". Each face should come up roughly 100 times — run it twice and watch the numbers change."]}),tests:[{check:f},{check:f,hidden:!0}],requires:[{call:"randint",msg:"Roll with random.randint(1, 6)."},{node:"For"}],hints:["counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}","for _ in range(600): counts[random.randint(1, 6)] += 1",'for face in range(1, 7): print(f"{face}: {counts[face]}")'],solution:`import random

counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
for _ in range(600):
    counts[random.randint(1, 6)] += 1

for face in range(1, 7):
    print(f"{face}: {counts[face]}")
print(f"Total: {sum(counts.values())}")`},stats:{id:"stats",kind:"write",title:"The statistics module",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"import statistics"})," gives you ",e.jsx("code",{children:"statistics.mean"}),", ",e.jsx("code",{children:"median"})," and ",e.jsx("code",{children:"mode"})," (most common value). Ask ",e.jsx("code",{children:"Marks: "})," (numbers on one line), then print ",e.jsx("code",{children:"Mean: 78.00"}),", ",e.jsx("code",{children:"Median: 85"}),", ",e.jsx("code",{children:"Mode: 85"}),". Notice what median does with an even number of marks."]}),tests:[{inputs:["70 85 85 60 90"],expect:`Marks: 70 85 85 60 90
Mean: 78.00
Median: 85
Mode: 85`},{inputs:["40 50 60 70"],expect:`Marks: 40 50 60 70
Mean: 55.00
Median: 55.0
Mode: 40`,hidden:!0,why:"With an even count, the median is the average of the middle two — and with no repeats, mode returns the first value."}],requires:[{call:"mean"},{call:"median"},{call:"mode"}],forbids:[{call:"sum",msg:"Let the statistics module do the work."}],hints:['marks = [int(x) for x in input("Marks: ").split()]','print(f"Mean: {statistics.mean(marks):.2f}")',"Print median and mode as they come — no formatting."],solution:`import statistics

marks = [int(x) for x in input("Marks: ").split()]
print(f"Mean: {statistics.mean(marks):.2f}")
print(f"Median: {statistics.median(marks)}")
print(f"Mode: {statistics.mode(marks)}")`},counter:{id:"counter",kind:"write",title:"Counting made easy",task:e.jsxs(e.Fragment,{children:["Back in 7.4 you counted words with a dictionary loop. ",e.jsx("code",{children:"from collections import Counter"})," does it in one call: ",e.jsx("code",{children:"Counter(words)"})," counts everything, and ",e.jsx("code",{children:".most_common(3)"})," gives the top three as (word, count) pairs. Ask ",e.jsx("code",{children:"Text: "})," and print the top three as ",e.jsx("code",{children:"the: 3"}),"."]}),tests:[{inputs:["the cat and the dog and the bird"],expect:`Text: the cat and the dog and the bird
the: 3
and: 2
cat: 1`},{inputs:["a b a c b a"],expect:`Text: a b a c b a
a: 3
b: 2
c: 1`,hidden:!0},{inputs:["hi hi"],expect:`Text: hi hi
hi: 2`,hidden:!0,why:"most_common(3) gives fewer than three when there are fewer words — loop over what it returns."}],requires:[{call:"Counter"},{call:"most_common"}],hints:["counts = Counter(text.split())",'for word, n in counts.most_common(3): print(f"{word}: {n}")'],solution:`from collections import Counter

text = input("Text: ")
counts = Counter(text.split())
for word, n in counts.most_common(3):
    print(f"{word}: {n}")`},dates:{id:"dates",kind:"write",title:"Days until…",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"from datetime import date"}),". ",e.jsx("code",{children:'date.fromisoformat("2026-12-25")'})," turns text into a date; subtracting two dates gives a gap whose ",e.jsx("code",{children:".days"})," is a number; ",e.jsx("code",{children:'d.strftime("%A")'})," is the day's name. Ask ",e.jsx("code",{children:"From (YYYY-MM-DD): "})," and ",e.jsx("code",{children:"To (YYYY-MM-DD): "}),", then print ",e.jsx("code",{children:"Days: 42"})," and ",e.jsx("code",{children:"That day is a Friday"})," (the weekday of the second date)."]}),tests:[{inputs:["2026-11-13","2026-12-25"],expect:p("2026-11-13","2026-12-25")},{inputs:["2026-01-01","2026-03-01"],expect:p("2026-01-01","2026-03-01"),hidden:!0},{inputs:["2024-02-28","2024-03-01"],expect:p("2024-02-28","2024-03-01"),hidden:!0,why:"2024 is a leap year — let datetime count the days, don't do it yourself."}],requires:[{call:"fromisoformat",min:2},{call:"strftime"}],hints:['start = date.fromisoformat(input("From (YYYY-MM-DD): "))',"gap = end - start, then gap.days",'end.strftime("%A")'],solution:`from datetime import date

start = date.fromisoformat(input("From (YYYY-MM-DD): "))
end = date.fromisoformat(input("To (YYYY-MM-DD): "))
print(f"Days: {(end - start).days}")
print(f"That day is a {end.strftime('%A')}")`},usemod:{id:"usemod",kind:"write",title:"Import your own module",task:e.jsxs(e.Fragment,{children:["Any ",e.jsx("code",{children:".py"})," file is a module. A file ",e.jsx("code",{children:"shop.py"})," sits next to your program (shown below). Import it and use its ",e.jsx("code",{children:"TAX"}),", ",e.jsx("code",{children:"discount()"})," and ",e.jsx("code",{children:"with_tax()"}),". Ask ",e.jsx("code",{children:"Price: "})," and ",e.jsx("code",{children:"Discount %: "}),", then print ",e.jsx("code",{children:"Tax rate: 18%"}),", ",e.jsx("code",{children:"After discount: 90.00"}),", ",e.jsx("code",{children:"With tax: 106.20"}),". Don't copy the numbers in — the shop may change its tax rate. Notice that shop.py's self-test line does not print."]}),show:c(.18),showLabel:"shop.py — ALREADY IN THE FOLDER",tests:[{setup:h("shop",c(.18)),inputs:["100","10"],expect:`Price: 100
Discount %: 10
Tax rate: 18%
After discount: 90.00
With tax: 106.20`},{setup:h("shop",c(.05)),inputs:["100","10"],expect:`Price: 100
Discount %: 10
Tax rate: 5%
After discount: 90.00
With tax: 94.50`,hidden:!0,why:"Here shop.py has TAX = 0.05 — use shop.TAX and shop.with_tax, don't type 0.18 yourself."},{setup:h("shop",c(.18)),inputs:["250","0"],expect:`Price: 250
Discount %: 0
Tax rate: 18%
After discount: 250.00
With tax: 295.00`,hidden:!0}],validate:t=>/^\s*(import\s+shop|from\s+shop\s+import)/m.test(t)?/0\.18|\b18\b/.test(t)?"Don't type the tax rate — read it from the module (shop.TAX).":null:"Import the module: import shop",hints:["import shop — then shop.TAX, shop.discount(price, pct), shop.with_tax(p)",'print(f"Tax rate: {shop.TAX * 100:.0f}%")'],solution:`import shop

price = float(input("Price: "))
pct = float(input("Discount %: "))
after = shop.discount(price, pct)
print(f"Tax rate: {shop.TAX * 100:.0f}%")
print(f"After discount: {after:.2f}")
print(f"With tax: {shop.with_tax(after):.2f}")`},guard:{id:"guard",kind:"fix",title:"The __name__ guard",task:e.jsxs(e.Fragment,{children:["This is ",e.jsx("code",{children:"temperature.py"}),". Its last three lines test the functions — useful while writing it, but when another program does ",e.jsx("code",{children:"import temperature"}),", they'd print every time. Python sets ",e.jsx("code",{children:"__name__"})," to ",e.jsx("code",{children:'"__main__"'})," only when a file is run directly. Move the test lines under ",e.jsx("code",{children:'if __name__ == "__main__":'})," so they run only then (here, they still print)."]}),starter:`def c_to_f(c):
    return c * 9 / 5 + 32

def f_to_c(f):
    return (f - 32) * 5 / 9

print("Testing...")
print(c_to_f(100))
print(f_to_c(32))`,tests:[{expect:`Testing...
212.0
0.0`}],post:"assert c_to_f(0) == 32 and f_to_c(212) == 100",validate:t=>/^if\s+__name__\s*==\s*["']__main__["']\s*:/m.test(t)?/^print\(/m.test(t)?"Every test print must be indented under the guard.":null:'Add the guard line: if __name__ == "__main__":',hints:['if __name__ == "__main__":',"Indent the three print lines under it."],solution:`def c_to_f(c):
    return c * 9 / 5 + 32

def f_to_c(f):
    return (f - 32) * 5 / 9

if __name__ == "__main__":
    print("Testing...")
    print(c_to_f(100))
    print(f_to_c(32))`},installed:{id:"installed",kind:"write",title:"Is it installed?",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"import importlib"}),"; ",e.jsx("code",{children:"importlib.import_module(name)"})," imports a module whose name is in a variable. If it isn't installed, Python raises ",e.jsx("code",{children:"ModuleNotFoundError"})," (Module 9: catch it!). Ask ",e.jsx("code",{children:"Module: "})," and print ",e.jsx("code",{children:"math is installed"})," — or ",e.jsx("code",{children:"fancytables is missing - run: pip install fancytables"}),"."]}),tests:[{inputs:["math"],expect:`Module: math
math is installed`},{inputs:["fancytables"],expect:`Module: fancytables
fancytables is missing - run: pip install fancytables`},{inputs:["statistics"],expect:`Module: statistics
statistics is installed`,hidden:!0}],requires:[{node:"Try"},{call:"import_module"}],hints:["try: importlib.import_module(name) … except ModuleNotFoundError: …","Print the success message inside try, after the import line."],solution:`import importlib

name = input("Module: ")
try:
    importlib.import_module(name)
    print(f"{name} is installed")
except ModuleNotFoundError:
    print(f"{name} is missing - run: pip install {name}")`},report:{id:"report",kind:"make",title:"Class report, batteries included",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Marks: "})," (one line). Using ",e.jsx("code",{children:"statistics"})," and ",e.jsx("code",{children:"Counter"}),", print ",e.jsx("code",{children:"Mean: 64.00"}),", ",e.jsx("code",{children:"Median: 69.5"}),", ",e.jsx("code",{children:"Most common: 78"}),", and a grade count for ",e.jsx("strong",{children:"every"})," grade A–F (A ≥ 90, B ≥ 75, C ≥ 60, D ≥ 40, else F): ",e.jsx("code",{children:"Grades: A=1 B=2 C=1 D=1 F=1"}),". Tip: a Counter says 0 for a key it has never seen."]}),minLines:14,tests:[{inputs:["92 78 45 78 30 61"],expect:m("92 78 45 78 30 61")},{inputs:["95 95 88"],expect:m("95 95 88"),hidden:!0,why:"Grades nobody got must still appear, as =0."},{inputs:["40 39"],expect:m("40 39"),hidden:!0,why:"Exactly 40 is a D, 39 is an F."}],requires:[{call:"mean"},{call:"median"},{call:"Counter"},{node:"FunctionDef",msg:"Write a grade(mark) function."}],hints:["def grade(m): with if/elif returning letters (5.2)","grades = Counter(grade(m) for m in marks)",'print("Grades:", " ".join(f"{g}={grades[g]}" for g in "ABCDF"))'],solution:`import statistics
from collections import Counter

def grade(m):
    if m >= 90:
        return "A"
    elif m >= 75:
        return "B"
    elif m >= 60:
        return "C"
    elif m >= 40:
        return "D"
    return "F"

marks = [int(x) for x in input("Marks: ").split()]
print(f"Mean: {statistics.mean(marks):.2f}")
print(f"Median: {statistics.median(marks)}")
print(f"Most common: {statistics.mode(marks)}")
grades = Counter(grade(m) for m in marks)
print("Grades:", " ".join(f"{g}={grades[g]}" for g in "ABCDF"))`}},D=r,T=[{q:"After from math import sqrt, how do you call it?",options:["math.sqrt(9)","sqrt(9)","import.sqrt(9)","math(sqrt, 9)"],answer:1,explain:"from … import brings the name itself into your program."},{q:"What does import pandas as pd do?",options:["Renames the file","Imports pandas and lets you call it pd","Installs pandas","Imports only pd"],answer:1,explain:"A nickname: pd.DataFrame instead of pandas.DataFrame."},{q:'When is __name__ equal to "__main__"?',options:["Always","When the file is run directly, not imported","When it's imported","Inside functions"],answer:1,explain:"Imported, __name__ is the module's own name — so guarded test code stays quiet."},{q:"What does pip do?",options:["Runs Python","Downloads and installs packages from PyPI","Creates variables","Checks syntax"],answer:1,explain:"pip install pandas fetches pandas from the Python Package Index."},{q:"Why use a virtual environment (venv)?",options:["It's faster","Each project gets its own packages and versions, without clashing","It's required to run Python","It hides code"],answer:1,explain:"Project A can use pandas 1.x and project B pandas 2.x side by side."}];function F(t){const n=[{label:"import",kicker:"THREE FORMS",title:"Borrowing code: import",blocks:[e.jsxs(d,{children:["Nobody writes everything from scratch. A ",e.jsx("strong",{children:"module"})," is a file of Python code you can borrow; a ",e.jsx("strong",{children:"package"})," is a folder of modules. There are three ways to import:"]}),e.jsx(l,{title:"three forms",code:`import math              # use as math.sqrt(2)
from math import sqrt    # use as sqrt(2)
import math as m         # use as m.sqrt(2)`}),r.tour,r.fromfix,r.alias]},{label:"Batteries",kicker:"THE STANDARD LIBRARY",title:"Batteries included",blocks:[e.jsxs(d,{children:["Python's ",e.jsx("strong",{children:"standard library"})," comes with every installation — no downloads. Four you'll use constantly: ",e.jsx("code",{children:"random"}),", ",e.jsx("code",{children:"statistics"}),", ",e.jsx("code",{children:"collections"})," and ",e.jsx("code",{children:"datetime"}),"."]}),r.dice,r.stats,r.counter,r.dates,e.jsx(x,{children:"Before writing a tricky loop, ask: is this already in the standard library? Counting, averages, dates, random choices — almost always, yes."})]},{label:"Your Modules",kicker:"ANY .py FILE",title:"Your own modules",blocks:[e.jsxs(d,{children:["Split a big program into files: put related functions in ",e.jsx("code",{children:"shop.py"}),", then ",e.jsx("code",{children:"import shop"})," from any program in the same folder. Python runs the module once, the first time it's imported."]}),r.usemod,r.guard]},{label:"pip & venv",kicker:"THE ECOSYSTEM",title:"pip, PyPI and virtual environments",blocks:[e.jsxs(d,{children:["Beyond the standard library are over 500,000 packages on ",e.jsx("strong",{children:"PyPI"})," (the Python Package Index) — pandas, matplotlib, Django… On your own computer, ",e.jsx("code",{children:"pip"})," downloads them. Each project should get its own ",e.jsx("strong",{children:"virtual environment"}),", so its packages don't clash with another project's."]}),e.jsxs("div",{className:"fh-two",children:[e.jsx(l,{title:"Windows (cmd / PowerShell)",code:`python -m venv env
env\\Scripts\\activate
pip install pandas matplotlib
pip list
deactivate`}),e.jsx(l,{title:"macOS / Linux",code:`python3 -m venv env
source env/bin/activate
pip install pandas matplotlib
pip list
deactivate`})]}),e.jsx(y,{color:g.blue,icon:"💡",children:"In this course, Python runs inside your browser, and packages like pandas load automatically the first time you import them. Google Colab works the same way. On your own laptop, use the commands above."}),r.installed]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: class report",blocks:[r.report]}];return e.jsx(j,{...t,unitId:"Unit11_1",crumb:"MODULE 11 › 1",title:"Modules & the Ecosystem",sections:n,quiz:T,next:{title:"11.2 — Pythonic Python",text:"Comprehensions, lambda and sorted(key=…): say more with less code."}})}export{D as EXERCISES,F as default};
