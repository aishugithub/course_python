import{j as e}from"./index-CD7nmDt6.js";import{C as l,P as c,K as d,N as u,T as h,L as p}from"./Lesson-MmSVdMEX.js";const o=i=>{let r=5e3;const t=[];for(const a of i){if(t.push(`Withdraw: ${a}`),a==="0")break;const s=Number(a);/^-?\d+$/.test(a)?s<=0?t.push("Error: amount must be positive"):s%100!==0?t.push("Error: notes are Rs 100 only"):s>r?t.push(`Error: balance is only Rs ${r}`):(r-=s,t.push(`Dispensed Rs ${s}`)):t.push("Error: amount must be a whole number"),t.push(`Balance: Rs ${r}`)}return t.push("Thank you for banking with Foothold"),t.join(`
`)},n={several:{id:"several",kind:"write",title:"Two things can go wrong",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Total marks: "})," and ",e.jsx("code",{children:"Students: "}),". Bad text → ",e.jsx("code",{children:"Please type numbers"}),"; zero students → ",e.jsx("code",{children:"No students"}),"; otherwise ",e.jsx("code",{children:"Average: 75.00"}),". Use one try with ",e.jsx("strong",{children:"two"})," except blocks — no if this time."]}),tests:[{inputs:["300","4"],expect:`Total marks: 300
Students: 4
Average: 75.00`},{inputs:["abc","4"],expect:`Total marks: abc
Students: 4
Please type numbers`,hidden:!0},{inputs:["300","0"],expect:`Total marks: 300
Students: 0
No students`,hidden:!0}],requires:[{node:"ExceptHandler",min:2,msg:"Use two except blocks: ValueError and ZeroDivisionError."}],hints:["except ValueError: … then except ZeroDivisionError: …","Python runs the FIRST except whose type matches."],solution:`a = input("Total marks: ")
b = input("Students: ")
try:
    avg = int(a) / int(b)
    print(f"Average: {avg:.2f}")
except ValueError:
    print("Please type numbers")
except ZeroDivisionError:
    print("No students")`},ase:{id:"ase",kind:"type",title:"except … as e",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"as e"})," gives you the exception itself; printing it shows Python's message. Useful for logs."]}),show:`for text in ["42", "4.2", "forty"]:
    try:
        print(int(text))
    except ValueError as e:
        print("Problem:", e)`,tests:[{expect:`42
Problem: invalid literal for int() with base 10: '4.2'
Problem: invalid literal for int() with base 10: 'forty'`}],hints:["e holds the error; print(e) shows its message."],solution:`for text in ["42", "4.2", "forty"]:
    try:
        print(int(text))
    except ValueError as e:
        print("Problem:", e)`},elsefinally:{id:"elsefinally",kind:"type",title:"else and finally",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"else"})," runs only if the try succeeded; ",e.jsx("code",{children:"finally"})," runs ",e.jsx("strong",{children:"always"})," — success, failure, even after a return. Predict both runs before you check."]}),show:`raw = input("Seats: ")
try:
    seats = int(raw)
except ValueError:
    print("Not a number")
else:
    print("Booked", seats, "seats")
finally:
    print("Counter closed")`,tests:[{inputs:["3"],expect:`Seats: 3
Booked 3 seats
Counter closed`},{inputs:["three"],expect:`Seats: three
Not a number
Counter closed`,hidden:!0}],hints:["Order: try → (except OR else) → finally."],solution:`raw = input("Seats: ")
try:
    seats = int(raw)
except ValueError:
    print("Not a number")
else:
    print("Booked", seats, "seats")
finally:
    print("Counter closed")`},raise:{id:"raise",kind:"write",title:"Raise your own error",task:e.jsxs(e.Fragment,{children:["Python doesn't know a mark must be 0–100 — so tell it. Write ",e.jsx("code",{children:"check_mark(mark)"})," that ",e.jsx("code",{children:"raise"}),"s ",e.jsx("code",{children:'ValueError("Mark must be between 0 and 100")'})," for out-of-range marks and otherwise returns the mark. Main code: read ",e.jsx("code",{children:"Mark: "}),", call it inside try, and print ",e.jsx("code",{children:"Saved 87"})," or ",e.jsx("code",{children:"Rejected: Mark must be between 0 and 100"})," (using ",e.jsx("code",{children:"as e"}),"). Bad text should be rejected the same way — int() raises its own ValueError."]}),tests:[{inputs:["87"],expect:`Mark: 87
Saved 87`},{inputs:["150"],expect:`Mark: 150
Rejected: Mark must be between 0 and 100`,hidden:!0},{inputs:["abc"],expect:`Mark: abc
Rejected: invalid literal for int() with base 10: 'abc'`,hidden:!0}],post:`try:
    check_mark(-1)
    raise AssertionError('check_mark(-1) should raise ValueError')
except ValueError:
    pass
assert check_mark(0) == 0`,requires:[{node:"Raise"},{node:"FunctionDef"}],hints:['if mark < 0 or mark > 100: raise ValueError("Mark must be between 0 and 100")','try: m = check_mark(int(input("Mark: "))) … except ValueError as e: print(f"Rejected: {e}")'],solution:`def check_mark(mark):
    if mark < 0 or mark > 100:
        raise ValueError("Mark must be between 0 and 100")
    return mark

try:
    m = check_mark(int(input("Mark: ")))
    print(f"Saved {m}")
except ValueError as e:
    print(f"Rejected: {e}")`},order:{id:"order",kind:"fix",title:"The except that never runs",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"Exception"})," is the parent of almost all errors, so ",e.jsx("code",{children:"except Exception"})," catches a ValueError too. Here it comes first, so the friendly ValueError message never shows. Run with the test input and fix the order."]}),starter:`try:
    n = int(input("Number: "))
    print(100 / n)
except Exception:
    print("Something went wrong")
except ValueError:
    print("Please type a whole number")`,tests:[{inputs:["ten"],expect:`Number: ten
Please type a whole number`},{inputs:["0"],expect:`Number: 0
Something went wrong`,hidden:!0}],hints:["Python uses the first matching except. Put the specific one first, the general one last."],solution:`try:
    n = int(input("Number: "))
    print(100 / n)
except ValueError:
    print("Please type a whole number")
except Exception:
    print("Something went wrong")`},atm:{id:"atm",kind:"make",title:"ATM withdrawals",task:e.jsxs(e.Fragment,{children:["Balance starts at Rs 5000. Keep asking ",e.jsx("code",{children:"Withdraw: "})," until ",e.jsx("code",{children:"0"}),". Write ",e.jsx("code",{children:"withdraw(balance, amount)"})," that ",e.jsx("strong",{children:"raises ValueError"})," with the messages ",e.jsx("code",{children:"amount must be positive"}),", ",e.jsx("code",{children:"notes are Rs 100 only"})," (not a multiple of 100) or ",e.jsx("code",{children:"balance is only Rs 5000"}),", and otherwise returns the new balance. The loop prints ",e.jsx("code",{children:"Dispensed Rs 500"})," or ",e.jsx("code",{children:"Error: …"})," (text that isn't a whole number: ",e.jsx("code",{children:"Error: amount must be a whole number"}),"), then ",e.jsx("code",{children:"Balance: Rs 4500"})," every round — use ",e.jsx("code",{children:"finally"})," for that line. At the end: ",e.jsx("code",{children:"Thank you for banking with Foothold"}),"."]}),minLines:26,tests:[{inputs:["500","250","abc","-100","9000","0"],expect:o(["500","250","abc","-100","9000","0"])},{inputs:["5000","100","0"],expect:o(["5000","100","0"]),hidden:!0}],requires:[{node:"Raise",min:3},{node:"Try"}],hints:['Convert first: try: amount = int(text) … except ValueError: print("Error: amount must be a whole number")',"Two layers are fine: one try for the int(), one around withdraw() — or one try catching ValueError from both, but then the messages must differ.",'finally: print(f"Balance: Rs {balance}")'],solution:`def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("amount must be positive")
    if amount % 100 != 0:
        raise ValueError("notes are Rs 100 only")
    if amount > balance:
        raise ValueError(f"balance is only Rs {balance}")
    return balance - amount

balance = 5000
while True:
    text = input("Withdraw: ")
    if text == "0":
        break
    try:
        try:
            amount = int(text)
        except ValueError:
            raise ValueError("amount must be a whole number")
        balance = withdraw(balance, amount)
        print(f"Dispensed Rs {amount}")
    except ValueError as e:
        print(f"Error: {e}")
    finally:
        print(f"Balance: Rs {balance}")
print("Thank you for banking with Foothold")`}},b=n,m=[{q:"When does an else block after try/except run?",options:["Always","Only if the try raised no exception","Only after an exception","Never"],answer:1,explain:"else = the success path."},{q:"When does finally run?",options:["Only on success","Only on error","Always","Only with return"],answer:2,explain:"It's for cleanup that must happen no matter what."},{q:"Why raise an error in check_mark instead of printing a message?",options:["Shorter","The caller decides what to do; the function just reports the problem","print is broken","Required"],answer:1,explain:"Functions report problems; callers handle them."},{q:"except Exception before except ValueError means…",options:["Both run","The ValueError block is never reached","A SyntaxError","ValueError runs first"],answer:1,explain:"The first matching except wins; specific first, general last."}];function k(i){const r=[{label:"Several excepts",kicker:"DIFFERENT PROBLEMS, DIFFERENT ANSWERS",title:"One try, several excepts",blocks:[n.several,n.ase]},{label:"else & finally",kicker:"THE FULL SHAPE",title:"try · except · else · finally",blocks:[e.jsx("div",{style:{maxWidth:620},children:e.jsx(l,{title:"the full shape",code:`try:
    risky()          # might raise
except ValueError:
    handle_it()      # only if it raised ValueError
else:
    on_success()     # only if NOTHING was raised
finally:
    clean_up()       # always, no matter what`})}),n.elsefinally]},{label:"raise",kicker:"REPORT IT YOURSELF",title:"Raising your own exceptions",blocks:[e.jsxs(c,{children:["Your own rules (a mark must be 0–100, a withdrawal must be positive) aren't known to Python. A function can enforce them with ",e.jsx("code",{children:"raise"})," — and let its caller decide what to do."]}),n.raise,n.order,e.jsxs(d,{children:["Functions ",e.jsx("strong",{children:"raise"})," problems; callers ",e.jsx("strong",{children:"handle"})," them. Order excepts from most specific to most general."]})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: ATM",blocks:[e.jsxs(u,{color:h.blue,icon:"🏧",children:["You'll build your own exception ",e.jsx("em",{children:"classes"})," (like ",e.jsx("code",{children:"InsufficientFundsError"}),") in Module 10."]}),n.atm]}];return e.jsx(p,{...i,unitId:"Unit9_2",crumb:"MODULE 9 › UNIT 9.2",title:"Catching & Raising",sections:r,quiz:m,next:{title:"Unit 9.3 — Files",text:"RAM forgets when the program ends. Files remember."}})}export{b as EXERCISES,k as default};
