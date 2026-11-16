import{j as e}from"./index-rTKCO5Yp.js";import{P as E,T as b,K as _,N as A,L as T}from"./Lesson-o3jU_D0N.js";import{R as C,a as l,f as h,p as F,b as j,s as g,c as B,F as $,t as N,d as M,C as u}from"./project--QvZ3dL_.js";function f(i){const t=u(i),o=+t.ask("Budget: ");t.say("1 Add  2 Total  3 Quit");let r=0;for(;;){const a=t.ask("Choice: ");if(a==="1"){const n=+t.ask("Amount: ");n<=0?t.say("Amount must be positive"):(r+=n,t.say(`Added. Spent: ${r} / ${o}`),r>o&&t.say(`Warning: over budget by ${r-o}!`))}else if(a==="2")t.say(`Spent: ${r}, Left: ${o-r}`);else if(a==="3"){t.say("Bye!");break}else t.say("Unknown choice")}return t.text()}const y="Expense (category amount, or done): ";function p(i){const t=u(i),o=+t.ask("Budget: "),r=[];for(;;){const s=t.ask(y);if(s.trim().toLowerCase()==="done")break;const d=s.split(/\s+/).filter(Boolean);if(d.length!==2||!/^\d+$/.test(d[1])){t.say("Format: category amount");continue}r.push([d[0].toLowerCase(),+d[1]])}if(!r.length)return t.say("No expenses yet"),t.text();const a=j(g(r,s=>s[0],s=>s[1]));a.forEach(([s,d])=>t.say(`${s}: ${d}`));const n=r.reduce((s,d)=>s+d[1],0);return t.say(`Total: ${n} / ${o}`,`Biggest: ${a[0][0]} (${a[0][1]})`),n>o&&t.say(`Over budget by ${n-o}!`),t.text()}function m(i,t){const o=u(t),r=[];if(i===null)o.say("No saved expenses yet");else{let a=0;i.split(`
`).filter(n=>n.trim()).forEach(n=>{const s=n.trim().split(",");s.length===2&&/^-?\d+$/.test(s[1].trim())?r.push([s[0].trim(),+s[1]]):a++}),o.say(`Loaded ${r.length} expenses`),a&&o.say(`Skipped ${a} bad line(s)`)}for(;;){const a=o.ask(y);if(a.trim().toLowerCase()==="done")break;const n=a.split(/\s+/).filter(Boolean);if(n.length!==2){o.say("Format: category amount");continue}if(!/^-?\d+$/.test(n[1])){o.say("Amount must be a number");continue}if(+n[1]<=0){o.say("Amount must be positive");continue}r.push([n[0].toLowerCase(),+n[1]])}return o.say(`Saved ${r.length} expenses`,`Total: ${r.reduce((a,n)=>a+n[1],0)}`),{out:o.text(),lines:r.map(([a,n])=>`${a},${n}`)}}function k(i){const t=u(i),o=+t.ask("Budget: "),r=[];for(;;){const n=t.ask(y);if(n.trim().toLowerCase()==="done")break;const s=n.split(/\s+/).filter(Boolean);if(s.length!==2){t.say("Format: category amount");continue}if(!/^-?\d+$/.test(s[1])||+s[1]<=0){t.say(`Bad amount: ${s[1]}`);continue}r.push([s[0].toLowerCase(),+s[1]])}const a=r.reduce((n,s)=>n+s[1],0);return t.say("Expenses:",...r.map(([n,s])=>`  ${n}: ${s}`),`Total: ${a}`,`Left: ${o-a}`,a>o?"Over budget!":"Within budget"),t.text()}const L=`_t = Tracker(100)
_t.add("a", 60)
_t.add("b", 30)
_t.add("a", 20)
assert len(_t.expenses) == 3 and isinstance(_t.expenses[0], Expense), "Tracker.add should store an Expense object in tracker.expenses."
assert str(_t.expenses[0]) == "a: 60", "str(Expense) should look like a: 60 — got " + str(_t.expenses[0])
assert _t.total() == 110, "total() should add up every expense."
assert _t.left() == -10, "left() is budget minus total."
assert _t.is_over() is True, "is_over() should be True when the total is above the budget."
assert _t.by_category() == {"a": 80, "b": 30}, "by_category() should return a dict of category totals — got " + str(_t.by_category())
try:
    _t.add("c", 0)
    raise AssertionError("add() should raise ValueError for an amount of 0 or less.")
except ValueError:
    pass
assert Tracker(50).is_over() is False, "A new tracker is not over budget."`,x=`Date,Category,Amount
2026-10-01,rent,8000
2026-10-03,food,450
2026-10-07,travel,300
2026-10-12,food,620
2026-10-18,fun,900
2026-10-25,food,380
2026-11-01,rent,8000
2026-11-04,food,510
2026-11-09,travel,1200
2026-11-15,fun,350
2026-11-22,food,700
`,w=`Date,Category,Amount
2026-09-02,books,600
2026-09-05,food,300
2026-09-20,food,450
2026-10-01,phone,399
2026-10-08,books,250
2026-10-15,food,520
2026-10-28,gym,800
`;function v(i){const t=F(i),o=j(g(t,"Category",n=>n.Amount)),r=B(g(t,n=>n.Date.slice(0,7),n=>n.Amount));return{out:[`Total spent: ${t.reduce((n,s)=>n+s.Amount,0)}`,"By category:",...o.map(([n,s])=>`${n}: ${s}`),"By month:",...r.map(([n,s])=>`${n}: ${s}`),`Biggest category: ${o[0][0]}`].join(`
`),post:$()+N("Spending by category")+M(o,"_ax","bars (categories, biggest first)")}}const c={cp1:{id:"cp1",kind:"make",title:"Checkpoint 1 — the budget menu",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Budget: "}),", print the menu line ",e.jsx("code",{children:"1 Add  2 Total  3 Quit"})," once, then keep asking ",e.jsx("code",{children:"Choice: "}),". ",e.jsx("strong",{children:"1"}),": ask ",e.jsx("code",{children:"Amount: "}),"; refuse 0 or less (",e.jsx("code",{children:"Amount must be positive"}),"), otherwise add it and print ",e.jsx("code",{children:"Added. Spent: 1200 / 5000"})," — plus ",e.jsx("code",{children:"Warning: over budget by 200!"})," if spending is now ",e.jsx("em",{children:"above"})," the budget. ",e.jsx("strong",{children:"2"}),": ",e.jsx("code",{children:"Spent: 5200, Left: -200"}),". ",e.jsx("strong",{children:"3"}),": ",e.jsx("code",{children:"Bye!"})," and stop. Anything else: ",e.jsx("code",{children:"Unknown choice"}),"."]}),minLines:20,tests:[{inputs:["5000","1","1200","1","4000","2","3"],expect:f(["5000","1","1200","1","4000","2","3"])},{inputs:["1000","1","1000","2","3"],expect:f(["1000","1","1000","2","3"]),hidden:!0,why:"Spending exactly the budget is not over it — use >, not >=."},{inputs:["500","7","1","-5","1","0","1","600","3"],expect:f(["500","7","1","-5","1","0","1","600","3"]),hidden:!0,why:"Unknown choices and amounts of 0 or less must be refused."}],requires:[{node:"While"},{node:"If"}],hints:["spent = 0 before the loop; while True: … break on 3",'if amount <= 0: print("Amount must be positive")','if spent > budget: print(f"Warning: over budget by {spent - budget}!")'],solution:`budget = int(input("Budget: "))
print("1 Add  2 Total  3 Quit")
spent = 0
while True:
    choice = input("Choice: ")
    if choice == "1":
        amount = int(input("Amount: "))
        if amount <= 0:
            print("Amount must be positive")
        else:
            spent += amount
            print(f"Added. Spent: {spent} / {budget}")
            if spent > budget:
                print(f"Warning: over budget by {spent - budget}!")
    elif choice == "2":
        print(f"Spent: {spent}, Left: {budget - spent}")
    elif choice == "3":
        print("Bye!")
        break
    else:
        print("Unknown choice")`},cp2:{id:"cp2",kind:"make",title:"Checkpoint 2 — spending by category",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Budget: "}),", then read lines like ",e.jsx("code",{children:"food 250"})," with the prompt ",e.jsx("code",{children:"Expense (category amount, or done): "})," until ",e.jsx("code",{children:"done"}),". A line that isn't exactly two words with a whole-number amount prints ",e.jsx("code",{children:"Format: category amount"})," and is skipped; categories are stored lowercase. Keep the expenses as a ",e.jsx("strong",{children:"list of (category, amount) tuples"})," and write at least two functions — including ",e.jsx("code",{children:"totals_by_category(expenses)"}),", which returns a dict. Print each category total, biggest first (ties alphabetical), then ",e.jsx("code",{children:"Total: 670 / 3000"}),", ",e.jsx("code",{children:"Biggest: food (550)"}),", and ",e.jsx("code",{children:"Over budget by 40!"})," when over. With no expenses, just ",e.jsx("code",{children:"No expenses yet"}),"."]}),minLines:22,tests:[{inputs:["3000","food 250","travel 120","Food 300","done"],expect:p(["3000","food 250","travel 120","Food 300","done"])},{inputs:["1000","snacks 40","bad line here","rent 900","fun x","snacks 100","done"],expect:p(["1000","snacks 40","bad line here","rent 900","fun x","snacks 100","done"]),hidden:!0,why:"Bad lines are skipped with the Format message, and the total here is over the budget."},{inputs:["100","b 10","a 10","done"],expect:p(["100","b 10","a 10","done"]),hidden:!0,why:"Equal totals go in alphabetical order: sort by (-total, category)."},{inputs:["500","done"],expect:p(["500","done"]),hidden:!0,why:"With no expenses, print only: No expenses yet."}],post:'assert totals_by_category([("a", 5), ("b", 2), ("a", 1)]) == {"a": 6, "b": 2}, "totals_by_category should add the amounts per category into a dict."',requires:[{node:"FunctionDef",min:2},{call:"sorted"},{node:"Tuple"}],hints:["parts = line.split(); if len(parts) != 2 or not parts[1].isdigit(): …","totals[cat] = totals.get(cat, 0) + amount","sorted(totals.items(), key=sort_key) with def sort_key(item): return (-item[1], item[0])"],solution:`def totals_by_category(expenses):
    totals = {}
    for cat, amount in expenses:
        totals[cat] = totals.get(cat, 0) + amount
    return totals

def sort_key(item):
    return (-item[1], item[0])

budget = int(input("Budget: "))
expenses = []
while True:
    line = input("Expense (category amount, or done): ")
    if line.strip().lower() == "done":
        break
    parts = line.split()
    if len(parts) != 2 or not parts[1].isdigit():
        print("Format: category amount")
        continue
    expenses.append((parts[0].lower(), int(parts[1])))

if not expenses:
    print("No expenses yet")
else:
    ranked = sorted(totals_by_category(expenses).items(), key=sort_key)
    for cat, total in ranked:
        print(f"{cat}: {total}")
    total = sum(amount for _, amount in expenses)
    print(f"Total: {total} / {budget}")
    print(f"Biggest: {ranked[0][0]} ({ranked[0][1]})")
    if total > budget:
        print(f"Over budget by {total - budget}!")`},cp3:(()=>{const i=m(`food,250
travel,120
`,["food 300","done"]),t=m(null,["rent 900","done"]),o=m(`food,250
broken
fun,abc
bus,30
`,["gift -50","gift ten","gift 50","done"]);return{id:"cp3",kind:"make",title:"Checkpoint 3 — remember everything",task:e.jsxs(e.Fragment,{children:["Expenses now live in ",e.jsx("code",{children:"expenses.txt"}),", one ",e.jsx("code",{children:"category,amount"})," per line. At the start, load the file: print ",e.jsx("code",{children:"Loaded 2 expenses"})," — or ",e.jsx("code",{children:"No saved expenses yet"})," if the file doesn't exist (catch ",e.jsx("code",{children:"FileNotFoundError"}),"). Skip broken lines and report ",e.jsx("code",{children:"Skipped 2 bad line(s)"})," (only if there were any). Then read expenses like checkpoint 2 (no budget this time): not two words → ",e.jsx("code",{children:"Format: category amount"}),"; amount not a whole number → ",e.jsx("code",{children:"Amount must be a number"}),"; write your own exception ",e.jsx("code",{children:"NegativeAmountError"}),", raised by an ",e.jsx("code",{children:"add_expense"})," function for 0 or less and caught → ",e.jsx("code",{children:"Amount must be positive"}),". At ",e.jsx("code",{children:"done"}),", save ",e.jsx("em",{children:"all"})," expenses back to the file and print ",e.jsx("code",{children:"Saved 3 expenses"})," and ",e.jsx("code",{children:"Total: 670"}),"."]}),minLines:30,tests:[{setup:l({"expenses.txt":`food,250
travel,120
`}),inputs:["food 300","done"],expect:i.out,post:h("expenses.txt",i.lines,"expenses.txt should hold the old and the new expenses, one category,amount per line.")},{setup:l({"expenses.txt":null}),inputs:["rent 900","done"],expect:t.out,post:h("expenses.txt",t.lines),hidden:!0,why:"When expenses.txt doesn't exist yet, print No saved expenses yet and start empty."},{setup:l({"expenses.txt":`food,250
broken
fun,abc
bus,30
`}),inputs:["gift -50","gift ten","gift 50","done"],expect:o.out,post:h("expenses.txt",o.lines),hidden:!0,why:"Skip the file's broken lines (count them), and refuse negative and non-number amounts."}],requires:[{node:"ClassDef",msg:"Define class NegativeAmountError(Exception)."},{node:"Try",min:2},{node:"With"},{node:"Raise"}],hints:["class NegativeAmountError(Exception): pass — and add_expense raises it when amount <= 0",'Loading: try: with open(...) as f: … except FileNotFoundError: print("No saved expenses yet")','Each file line: cat, amt = line.strip().split(",") then int(amt) — a ValueError means a bad line','Saving: with open("expenses.txt", "w") as f: f.write(f"{cat},{amt}\\n")'],solution:`class NegativeAmountError(Exception):
    pass

def add_expense(expenses, cat, amount):
    if amount <= 0:
        raise NegativeAmountError(amount)
    expenses.append((cat, amount))

def load(path):
    expenses, bad = [], 0
    try:
        with open(path) as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    cat, amt = line.strip().split(",")
                    expenses.append((cat, int(amt)))
                except ValueError:
                    bad += 1
    except FileNotFoundError:
        print("No saved expenses yet")
        return expenses
    print(f"Loaded {len(expenses)} expenses")
    if bad:
        print(f"Skipped {bad} bad line(s)")
    return expenses

expenses = load("expenses.txt")
while True:
    line = input("Expense (category amount, or done): ")
    if line.strip().lower() == "done":
        break
    parts = line.split()
    if len(parts) != 2:
        print("Format: category amount")
        continue
    try:
        add_expense(expenses, parts[0].lower(), int(parts[1]))
    except ValueError:
        print("Amount must be a number")
    except NegativeAmountError:
        print("Amount must be positive")

with open("expenses.txt", "w") as f:
    for cat, amt in expenses:
        f.write(f"{cat},{amt}\\n")
print(f"Saved {len(expenses)} expenses")
print(f"Total: {sum(a for _, a in expenses)}")`}})(),cp4:{id:"cp4",kind:"make",title:"Checkpoint 4 — model it with classes",task:e.jsxs(e.Fragment,{children:["Write two classes. ",e.jsx("code",{children:"Expense(category, amount)"})," with ",e.jsx("code",{children:"__str__"})," giving ",e.jsx("code",{children:"food: 250"}),". ",e.jsx("code",{children:"Tracker(budget)"})," keeping a list ",e.jsx("code",{children:"self.expenses"})," of Expense objects, with methods ",e.jsx("code",{children:"add(category, amount)"})," (raises ",e.jsx("code",{children:"ValueError"})," for 0 or less), ",e.jsx("code",{children:"total()"}),", ",e.jsx("code",{children:"left()"}),", ",e.jsx("code",{children:"is_over()"})," and ",e.jsx("code",{children:"by_category()"})," (a dict of totals). Main program: ask ",e.jsx("code",{children:"Budget: "}),", read expenses like checkpoint 2 (not two words → ",e.jsx("code",{children:"Format: category amount"}),"; a non-number or non-positive amount → ",e.jsx("code",{children:"Bad amount: x"}),"), then print ",e.jsx("code",{children:"Expenses:"}),", each expense indented two spaces, ",e.jsx("code",{children:"Total: …"}),", ",e.jsx("code",{children:"Left: …"})," and ",e.jsx("code",{children:"Over budget!"})," or ",e.jsx("code",{children:"Within budget"}),". Hidden checks use your classes directly."]}),minLines:30,tests:[{inputs:["2000","food 250","bus 40","food x","done"],expect:k(["2000","food 250","bus 40","food x","done"])},{inputs:["100","a 0","a 150","oops","done"],expect:k(["100","a 0","a 150","oops","done"]),hidden:!0}],post:L,requires:[{node:"ClassDef",min:2}],hints:['Tracker.add: if amount <= 0: raise ValueError("amount must be positive"); self.expenses.append(Expense(category, amount))',"total(): return sum(e.amount for e in self.expenses)",`Main: try: tracker.add(cat, int(amt)) except ValueError: print(f"Bad amount: {amt}") — int('x') raises ValueError too`],solution:`class Expense:
    def __init__(self, category, amount):
        self.category = category
        self.amount = amount

    def __str__(self):
        return f"{self.category}: {self.amount}"

class Tracker:
    def __init__(self, budget):
        self.budget = budget
        self.expenses = []

    def add(self, category, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.expenses.append(Expense(category, amount))

    def total(self):
        return sum(e.amount for e in self.expenses)

    def left(self):
        return self.budget - self.total()

    def is_over(self):
        return self.total() > self.budget

    def by_category(self):
        totals = {}
        for e in self.expenses:
            totals[e.category] = totals.get(e.category, 0) + e.amount
        return totals

tracker = Tracker(int(input("Budget: ")))
while True:
    line = input("Expense (category amount, or done): ")
    if line.strip().lower() == "done":
        break
    parts = line.split()
    if len(parts) != 2:
        print("Format: category amount")
        continue
    cat, amt = parts
    try:
        tracker.add(cat.lower(), int(amt))
    except ValueError:
        print(f"Bad amount: {amt}")

print("Expenses:")
for e in tracker.expenses:
    print(f"  {e}")
print(f"Total: {tracker.total()}")
print(f"Left: {tracker.left()}")
print("Over budget!" if tracker.is_over() else "Within budget")`},cp5:(()=>{const i=v(x),t=v(w);return{id:"cp5",kind:"make",title:"Checkpoint 5 — analyse and chart",timeoutMs:3e4,task:e.jsxs(e.Fragment,{children:["Two months of spending are in ",e.jsx("code",{children:"spending.csv"})," (Date, Category, Amount). With pandas, print ",e.jsx("code",{children:"Total spent: …"}),"; then ",e.jsx("code",{children:"By category:"})," and each category's total, biggest first; then ",e.jsx("code",{children:"By month:"})," and each month's total (",e.jsx("code",{children:"Date.str[:7]"}),") in date order; then ",e.jsx("code",{children:"Biggest category: rent"}),". Finally draw the category totals as a bar chart, biggest first, titled ",e.jsx("code",{children:"Spending by category"}),". Hidden tests use someone else's spending."]}),show:x,showLabel:"spending.csv — ALREADY IN THE FOLDER",minLines:16,tests:[{setup:l({"spending.csv":x}),expect:i.out,post:i.post},{setup:l({"spending.csv":w}),expect:t.out,post:t.post,hidden:!0,why:"Different spending: every number and the chart must come from the DataFrame."}],requires:[{call:"read_csv"},{call:"groupby",min:2},{call:"bar"}],hints:['cats = df.groupby("Category")["Amount"].sum().sort_values(ascending=False)','for cat, total in cats.items(): print(f"{cat}: {total}")','months = df.groupby(df["Date"].str[:7])["Amount"].sum()',"plt.bar(cats.index, cats.values)"],solution:`import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("spending.csv")
print(f"Total spent: {df['Amount'].sum()}")

cats = df.groupby("Category")["Amount"].sum().sort_values(ascending=False)
print("By category:")
for cat, total in cats.items():
    print(f"{cat}: {total}")

months = df.groupby(df["Date"].str[:7])["Amount"].sum()
print("By month:")
for month, total in months.items():
    print(f"{month}: {total}")
print(f"Biggest category: {cats.index[0]}")

plt.bar(cats.index, cats.values, color="teal")
plt.title("Spending by category")
plt.ylabel("Amount")
plt.show()`}})()},D=c,S=[{q:"Why store expenses as (category, amount) tuples in a list?",options:["Tuples are faster to type","Each expense is one fixed pair of facts; the list keeps them all, in order","Lists can't hold numbers","Dicts can't be sorted"],answer:1,explain:"A record that shouldn't change → tuple; a growing collection → list."},{q:"Spent 1000 of a 1000 budget. Over budget?",options:["Yes","No — only above the budget","It depends","Error"],answer:1,explain:"spent > budget, not >=."},{q:"The expenses file doesn't exist on the first run. The program should…",options:["Crash","Catch FileNotFoundError and start with no expenses","Create a random file","Ask the user to restart"],answer:1,explain:"Missing data on a first run is normal, not an error."},{q:"Why a NegativeAmountError of your own instead of a print inside add_expense?",options:["It's shorter","add_expense just reports the problem; the caller decides what to show","print doesn't work in functions","Python requires it"],answer:1,explain:"Raising separates detecting a problem from handling it (Unit 9.2)."}];function R(i){const t=[{label:"1 · Core",kicker:"CHECKPOINT 1 · AFTER M4–M6",title:"The budget menu",blocks:[e.jsxs(E,{children:["You'll build one real program — a ",e.jsx("strong",{children:"personal expense tracker"})," — and grow it through five checkpoints, each using what the next modules taught you. Every checkpoint is a complete, working program."]}),e.jsx(C,{color:b.teal,rows:[["1 · Core logic","M4–M6","a menu, a running total, a budget warning"],["2 · Organise it","M7–M8","categories in a dict, expenses as tuples, functions"],["3 · Make it survive","M9","saved to a file; bad input handled; your own exception"],["4 · Model it","M10","Expense and Tracker classes"],["5 · Analyse & chart","M12–M13","pandas totals and a bar chart"]]}),c.cp1]},{label:"2 · Organise",kicker:"CHECKPOINT 2 · AFTER M7–M8",title:"Spending by category",blocks:[c.cp2]},{label:"3 · Survive",kicker:"CHECKPOINT 3 · AFTER M9",title:"Remember everything",blocks:[c.cp3,e.jsx(_,{children:"A program people rely on must survive its first run (no file yet), a damaged file and silly input — without crashing."})]},{label:"4 · Model",kicker:"CHECKPOINT 4 · AFTER M10",title:"Model it with classes",blocks:[c.cp4]},{label:"5 · Analyse",kicker:"CHECKPOINT 5 · AFTER M12–M13",title:"Analyse and chart",blocks:[c.cp5,e.jsx(A,{color:b.blue,icon:"🎨",children:"Make it yours: a mess-bill splitter, a shared trip budget, or a phone-data log follow exactly the same five steps. Or bring your own idea of similar size to your teacher."})]}];return e.jsx(T,{...i,unitId:"UnitMP_GEN",crumb:"MINI-PROJECT › TRACK A",title:"Personal Expense Tracker",sections:t,quiz:S,next:{title:"Track complete!",text:"Five versions of one program — from a menu to a chart. Try another track, or head to the Finish Line."}})}export{D as EXERCISES,R as default};
