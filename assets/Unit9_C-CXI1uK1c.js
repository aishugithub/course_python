import{j as e}from"./index-BQ9ta_BJ.js";import{C as w}from"./Crucible-BqvSDfX2.js";import{f as o,a as n}from"./project-DnDQJvom.js";import"./Lesson-DNKKUv9k.js";const m=`45
78
absent
90

63
`;function c(i){if(i===null)return{out:"No transactions file",lines:null};const r=[];let t=0;return i.split(`
`).forEach((l,p)=>{const u=l.trim();if(!u)return;const a=u.split(/\s+/);if(a.length!==2||!["deposit","withdraw"].includes(a[0])||!/^\d+$/.test(a[1])||+a[1]<=0){r.push(`Line ${p+1}: bad entry`);return}const d=+a[1];a[0]==="deposit"?t+=d:d>t?r.push(`Line ${p+1}: refused withdraw of ${d}`):t-=d}),r.push(`Balance: ${t}`),{out:r.join(`
`),lines:[`Final balance: ${t}`]}}const h=`deposit 500
withdraw 200
withdraw 1000
deposit abc
transfer 50

deposit 150
`,f=`withdraw 10
deposit -5
deposit 0
withdraw 0
`,x=`deposit 1000
withdraw 1000
withdraw 1
`,s={spark1:{id:"spark1",kind:"predict",title:"try, except, else, finally",code:`def check(x):
    try:
        print("start", x)
        r = 10 / x
        n = int("7" if x > 0 else "seven")
    except ZeroDivisionError:
        print("zero!")
        return "Z"
    except ValueError:
        print("bad number")
        return "V"
    else:
        print("ok", r + n)
        return "OK"
    finally:
        print("end", x)

print(check(2))
print(check(0))
print(check(-5))`,task:e.jsxs(e.Fragment,{children:["Three calls, three different paths. Remember: ",e.jsx("code",{children:"finally"})," runs even when the block before it says ",e.jsx("code",{children:"return"}),"."]}),hints:["else runs only if the try block raised nothing.","finally prints BEFORE the returned value reaches the outer print.",'For -5: 10 / -5 works fine (-2.0); int("seven") is what fails.'],solution:`start 2
ok 12.0
end 2
OK
start 0
zero!
end 0
Z
start -5
bad number
end -5
V`},spark2:{id:"spark2",kind:"predict",title:"Write, append, read",code:`with open("log.txt", "w") as f:
    f.write("one\\n")
    f.write("two")
with open("log.txt", "a") as f:
    f.write("three\\n")
with open("log.txt") as f:
    lines = f.readlines()
print(len(lines))
print(lines)
with open("log.txt") as f:
    for line in f:
        print(line.strip().upper())`,task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"write"})," adds no newline of its own. Printing a list shows each line's ",e.jsx("code",{children:"\\n"})," as the two characters ",e.jsx("code",{children:"\\"})," and ",e.jsx("code",{children:"n"}),"."]}),hints:["After the first block the file holds one⏎two (no newline after two).","Appending three⏎ joins it onto the end of two.","readlines() keeps the \\n at the end of each line; strip() removes it."],solution:`2
['one\\n', 'twothree\\n']
ONE
TWOTHREE`},scores:{id:"scores",kind:"fix",title:"The except that hides everything",task:e.jsxs(e.Fragment,{children:["Average the numbers in ",e.jsx("code",{children:"scores.txt"}),". A bare ",e.jsx("code",{children:"except:"})," around the whole loop means one bad line (",e.jsx("code",{children:"absent"}),") throws away everything after it. Instead: skip blank lines silently, skip lines that aren't numbers and count them (",e.jsx("code",{children:"Skipped 1 bad line(s)"}),", only if any), print ",e.jsx("code",{children:"Average of 4 scores: 69.0"})," — or ",e.jsx("code",{children:"No valid scores"})," — and if the file is missing print ",e.jsx("code",{children:"No scores file"})," and nothing else. Catch only the exceptions you expect."]}),starter:`total = 0
count = 0
try:
    with open("scores.txt") as f:
        for line in f:
            total += int(line)
            count += 1
except:
    print("Something went wrong")
print(f"Average of {count} scores: {total / count:.1f}")`,tests:[{setup:n({"scores.txt":m}),expect:`Skipped 1 bad line(s)
Average of 4 scores: 69.0`},{setup:n({"scores.txt":null}),expect:"No scores file",hidden:!0,why:"A missing file: catch FileNotFoundError and stop."},{setup:n({"scores.txt":`10
20
`}),expect:"Average of 2 scores: 15.0",hidden:!0},{setup:n({"scores.txt":`x
`}),expect:`Skipped 1 bad line(s)
No valid scores`,hidden:!0,why:"No numbers at all — don't divide by zero."}],forbids:[{text:"except:",msg:"No bare except: name the exceptions you expect (ValueError, FileNotFoundError)."}],requires:[{node:"Try",min:2}],hints:["Put a small try / except ValueError around int(line) inside the loop.","if not line.strip(): continue — skips blank lines.","Wrap the file part in try / except FileNotFoundError; do the printing in else."],solution:`total = 0
count = 0
bad = 0
try:
    with open("scores.txt") as f:
        for line in f:
            if not line.strip():
                continue
            try:
                total += int(line)
                count += 1
            except ValueError:
                bad += 1
except FileNotFoundError:
    print("No scores file")
else:
    if bad:
        print(f"Skipped {bad} bad line(s)")
    if count == 0:
        print("No valid scores")
    else:
        print(f"Average of {count} scores: {total / count:.1f}")`},withdraw:{id:"withdraw",kind:"fix",title:"return is not raise",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"withdraw"})," should ",e.jsx("strong",{children:"raise"})," InsufficientFunds when there isn't enough money, so the ",e.jsx("code",{children:"except"})," can refuse it. Run it: the error object sneaks into ",e.jsx("code",{children:"balance"})," instead, and the next round crashes."]}),starter:`class InsufficientFunds(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        return InsufficientFunds("Not enough money")
    return balance - amount

balance = 500
for amount in [200, 400, 100]:
    try:
        balance = withdraw(balance, amount)
        print("Withdrew", amount, "- balance", balance)
    except InsufficientFunds as e:
        print("Refused", amount, "-", e)`,tests:[{expect:`Withdrew 200 - balance 300
Refused 400 - Not enough money
Withdrew 100 - balance 200`}],post:`try:
    withdraw(10, 20)
    raise AssertionError('withdraw(10, 20) should raise InsufficientFunds.')
except InsufficientFunds:
    pass`,hints:["Returning an exception just hands back an object. Which keyword makes it fly?"],solution:`class InsufficientFunds(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds("Not enough money")
    return balance - amount

balance = 500
for amount in [200, 400, 100]:
    try:
        balance = withdraw(balance, amount)
        print("Withdrew", amount, "- balance", balance)
    except InsufficientFunds as e:
        print("Refused", amount, "-", e)`},report:{id:"report",kind:"complete",title:"Read one file, write another",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"marks.txt"})," holds ",e.jsx("code",{children:"name,mark"})," lines. Fill the blanks to write ",e.jsx("code",{children:"report.txt"}),": the number passed (40+), the number failed, and each failed name on its own line after ",e.jsx("code",{children:"- "}),". The checker opens your report.txt."]}),starter:`passed = []
failed = []
with open("marks.txt") as f:
    for line in f:
        name, mark = line.strip().split(___)
        if int(mark) >= 40:
            passed.append(name)
        else:
            failed.append(name)

with open("report.txt", ___) as out:
    out.write(f"Passed: {len(passed)}\\n")
    out.write(f"Failed: {___}\\n")
    for name in failed:
        out.write(f"- {name}\\n")
print("Report written")`,tests:[{setup:n({"marks.txt":`Asha,82
Ben,35
Chen,91
`,"report.txt":null}),expect:"Report written",post:o("report.txt",["Passed: 2","Failed: 1","- Ben"])},{setup:n({"marks.txt":`Dev,12
Ela,39
`,"report.txt":`old report
`}),expect:"Report written",post:o("report.txt",["Passed: 0","Failed: 2","- Dev","- Ela"],'report.txt should be replaced, not added to — open it with "w".'),hidden:!0}],hints:['split(",")','open("report.txt", "w")',"len(failed)"],solution:`passed = []
failed = []
with open("marks.txt") as f:
    for line in f:
        name, mark = line.strip().split(",")
        if int(mark) >= 40:
            passed.append(name)
        else:
            failed.append(name)

with open("report.txt", "w") as out:
    out.write(f"Passed: {len(passed)}\\n")
    out.write(f"Failed: {len(failed)}\\n")
    for name in failed:
        out.write(f"- {name}\\n")
print("Report written")`},bank:(()=>{const i=c(h),r=c(null),t=c(f),l=c(x);return{id:"bank",kind:"make",title:"Bank statement",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"transactions.txt"})," has one ",e.jsx("code",{children:"deposit 500"})," or ",e.jsx("code",{children:"withdraw 200"})," per line; the balance starts at 0. Write your own ",e.jsx("code",{children:"InsufficientFunds"})," exception and an ",e.jsx("code",{children:"apply(balance, kind, amount)"})," function that returns the new balance and raises it for a withdrawal larger than the balance. Process the file line by line (number the lines from 1, counting blank ones, but skip blanks): a line that isn't exactly ",e.jsx("code",{children:"deposit"}),"/",e.jsx("code",{children:"withdraw"})," plus a whole amount above 0 → ",e.jsx("code",{children:"Line 4: bad entry"}),"; a refused withdrawal → ",e.jsx("code",{children:"Line 3: refused withdraw of 1000"}),". Print ",e.jsx("code",{children:"Balance: 450"})," and write ",e.jsx("code",{children:"Final balance: 450"})," to ",e.jsx("code",{children:"statement.txt"}),". No file → just ",e.jsx("code",{children:"No transactions file"}),"."]}),minLines:30,tests:[{setup:n({"transactions.txt":h,"statement.txt":null}),expect:i.out,post:o("statement.txt",i.lines)},{setup:n({"transactions.txt":null}),expect:r.out,hidden:!0},{setup:n({"transactions.txt":f,"statement.txt":null}),expect:t.out,post:o("statement.txt",t.lines),hidden:!0,why:"Amounts of 0 or below are bad entries; a withdrawal from 0 is refused."},{setup:n({"transactions.txt":x,"statement.txt":null}),expect:l.out,post:o("statement.txt",l.lines),hidden:!0,why:"Withdrawing exactly the balance is allowed."}],post:`try:
    apply(10, 'withdraw', 20)
    raise AssertionError('apply(10, "withdraw", 20) should raise InsufficientFunds.')
except InsufficientFunds:
    pass
assert apply(10, 'deposit', 5) == 15 and apply(10, 'withdraw', 10) == 0, 'apply() should return the new balance.'`,requires:[{node:"ClassDef"},{node:"Raise"},{node:"Try",min:2},{node:"With",min:2}],hints:["for number, line in enumerate(f, start=1): — then skip blank lines with continue",'Validate: parts = line.split(); len(parts) == 2, parts[0] in ("deposit", "withdraw"), parts[1].isdigit() and int(parts[1]) > 0',"try: balance = apply(balance, kind, amount) except InsufficientFunds: print the refusal"],solution:`class InsufficientFunds(Exception):
    pass

def apply(balance, kind, amount):
    if kind == "deposit":
        return balance + amount
    if amount > balance:
        raise InsufficientFunds(amount)
    return balance - amount

try:
    with open("transactions.txt") as f:
        lines = f.readlines()
except FileNotFoundError:
    print("No transactions file")
else:
    balance = 0
    for number, line in enumerate(lines, start=1):
        if not line.strip():
            continue
        parts = line.split()
        if len(parts) != 2 or parts[0] not in ("deposit", "withdraw") or not parts[1].isdigit() or int(parts[1]) <= 0:
            print(f"Line {number}: bad entry")
            continue
        try:
            balance = apply(balance, parts[0], int(parts[1]))
        except InsufficientFunds:
            print(f"Line {number}: refused withdraw of {parts[1]}")
    print(f"Balance: {balance}")
    with open("statement.txt", "w") as out:
        out.write(f"Final balance: {balance}\\n")`}})()},F=s,b=[{q:"When does an else block after try run?",options:["Always","Only if the try block raised no exception","Only after an exception","Never with finally"],answer:1,explain:"else is the 'it worked' path."},{q:"Why avoid a bare except:?",options:["It's slower","It also hides bugs you never expected, like typos (NameError)","It's not valid Python","It only catches one error"],answer:1,explain:"Catch the exceptions you expect, by name."},{q:'open("log.txt", "w") on an existing file…',options:["Adds to the end","Empties it first","Crashes","Reads it"],answer:1,explain:'"w" replaces, "a" appends.'}];function E(i){return e.jsx(w,{...i,unitId:"Unit9_C",module:"Module 9",title:"The Crucible: Errors & Files",spark:[s.spark1,s.spark2],flame:[s.scores,s.withdraw],forge:[s.report],temper:[s.bank],quiz:b})}export{F as EXERCISES,E as default};
