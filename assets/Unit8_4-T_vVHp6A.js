import{j as e}from"./index-rTKCO5Yp.js";import{P as k,N as M,T as c,K as I,L as U}from"./Lesson-o3jU_D0N.js";const F=t=>t>=90?"A":t>=75?"B":t>=60?"C":t>=40?"D":"F";function w(t){if(!t.length)return["No students yet"];let n=0,a=0,s=t[0][0],i=t[0][1];const o=[];for(const[d,r]of t)o.push(`${d}: ${r} (${F(r)})`),n+=r,r>=40&&a++,r>i&&(i=r,s=d);return o.push(`Average: ${(n/t.length).toFixed(2)}`,`Topper: ${s} (${i})`,`Passed: ${a}/${t.length}`),o}const g=(t,n)=>{const a=t.split(" "),s=n.split(" ").map(Number);return[`Names: ${t}`,`Marks: ${n}`,...w(a.map((i,o)=>[i,s[o]]))].join(`
`)};function h(t,n){const a=[...t],s=[],i=[],o=d=>{const r=a.shift();return s.push(d+r),r};for(;;){s.push("1. Add  2. Report  3. Exit");const d=o("Choose: ");if(d==="1"){const r=o("Name: ").trim().toUpperCase();let p;if(n)for(;;){const l=o("Mark: ");if(/^\d+$/.test(l)&&Number(l)<=100){p=Number(l);break}s.push("Enter a number from 0 to 100")}else p=Number(o("Mark: "));const f=i.findIndex(([l])=>l===r);f>=0?(i[f][1]=p,s.push(`Updated ${r}`)):(i.push([r,p]),s.push(`Added ${r}`))}else if(d==="2")s.push(...w(i));else if(d==="3"){s.push("Bye!");break}else s.push("Invalid choice")}return s.join(`
`)}const $=t=>{if(t<2)return!1;for(let n=2;n*n<=t;n++)if(t%n===0)return!1;return!0},m=t=>`Number: ${t}
Prime: ${$(t)?"True":"False"}
Digit sum: ${String(t).split("").reduce((n,a)=>n+Number(a),0)}
Reversed: ${Number(String(t).split("").reverse().join(""))}`;function D(){const t=[["grade(mark)","returns a letter","8.2"],["class_stats(marks)","returns a TUPLE (avg, topper, best, passed) — unpack it","7.4, 8.2"],["add_student(marks, name, mark)","changes the dict passed in, returns a message","8.3 (lists/dicts passed in)"],["print_report(marks)","only displays — uses the two functions above","8.1"],["read_int(prompt, low, high)","keeps asking until the input is valid","6.1, 7.1 isdigit"]];return e.jsx("div",{style:{border:`1px solid ${c.border}`,borderRadius:12,overflow:"hidden",maxWidth:980},children:t.map(([n,a,s],i)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1.5fr 2.4fr 1fr",gap:10,padding:"10px 14px",background:i%2?c.surface:c.card,fontSize:14.5},children:[e.jsx("code",{style:{justifySelf:"start"},children:n}),e.jsx("span",{children:a}),e.jsx("span",{style:{color:c.bronze,fontWeight:700},children:s})]},i))})}const A=`def grade(mark):
    """Letter grade for a mark (pass mark 40)."""
    if mark >= 90:
        return "A"
    elif mark >= 75:
        return "B"
    elif mark >= 60:
        return "C"
    elif mark >= 40:
        return "D"
    return "F"`,N=`def class_stats(marks):
    """Return (average, topper, best, passed) for a dict of name -> mark."""
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
    return total / len(marks), topper, best, passed`,E=`for name, mark in marks.items():
    print(f"{name}: {mark} ({grade(mark)})")
avg, topper, best, passed = class_stats(marks)
print(f"Average: {avg:.2f}")
print(f"Topper: {topper} ({best})")
print(f"Passed: {passed}/{len(marks)}")`,P=(t,n)=>t.split(`
`).map(a=>" ".repeat(n)+a).join(`
`),x=`${A}

${N}

names = input("Names: ").split()
values = input("Marks: ").split()
marks = {}
for name, m in zip(names, values):
    marks[name] = int(m)
${E}`,R=`${A}

${N}

def print_report(marks):
    if not marks:
        print("No students yet")
        return
${P(E,4)}

def add_student(marks, name, mark):
    if name in marks:
        message = f"Updated {name}"
    else:
        message = f"Added {name}"
    marks[name] = mark
    return message`,T=t=>`

marks = {}
while True:
    print("1. Add  2. Report  3. Exit")
    choice = input("Choose: ")
    if choice == "1":
        name = input("Name: ").strip().upper()
        mark = ${t}
        print(add_student(marks, name, mark))
    elif choice == "2":
        print_report(marks)
    elif choice == "3":
        print("Bye!")
        break
    else:
        print("Invalid choice")`,b=R+T('int(input("Mark: "))'),S=`

def read_int(prompt, low, high):
    """Ask until the user types a whole number from low to high."""
    while True:
        text = input(prompt)
        if text.isdigit() and low <= int(text) <= high:
            return int(text)
        print(f"Enter a number from {low} to {high}")`,C=R+S+T('read_int("Mark: ", 0, 100)'),v=["2","1","priya","87","1","arun","35","1","Priya","91","2","5","3"],j=["1","meena","40","2","3"],_=["1","ravi","abc","150","-5","64","1","divya","100","2","3"],y=["1","x","101","0","2","3"],u={v1:{id:"v1",kind:"write",title:"Version 1 — functions that return",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"grade(mark)"})," (A ≥ 90, B ≥ 75, C ≥ 60, D ≥ 40, else F) and ",e.jsx("code",{children:"class_stats(marks)"}),", which takes the dictionary and ",e.jsx("strong",{children:"returns a tuple"})," ",e.jsx("code",{children:"(average, topper, best, passed)"})," — no printing inside either. Main code: read ",e.jsx("code",{children:"Names: "})," and ",e.jsx("code",{children:"Marks: "}),", build the dict, print each student as ",e.jsx("code",{children:"PRIYA: 87 (B)"}),", then unpack ",e.jsx("code",{children:"class_stats"})," and print ",e.jsx("code",{children:"Average: 69.50"}),", ",e.jsx("code",{children:"Topper: MEENA (91)"}),", ",e.jsx("code",{children:"Passed: 3/4"}),"."]}),minLines:30,tests:[{inputs:["PRIYA ARUN MEENA RAVI","87 62 91 38"],expect:g("PRIYA ARUN MEENA RAVI","87 62 91 38")},{inputs:["A B C","40 39 99"],expect:g("A B C","40 39 99"),hidden:!0}],post:`assert grade(75) == 'B' and grade(39) == 'F', 'check grade()'
assert class_stats({'A': 50, 'B': 30}) == (40.0, 'A', 50, 1), 'class_stats should RETURN (average, topper, best, passed)'`,requires:[{node:"FunctionDef",min:2},{node:"Return",min:2}],hints:["The topper loop from 7.6 moves into class_stats; end it with return total / len(marks), topper, best, passed","avg, topper, best, passed = class_stats(marks) — unpacking (7.4)."],solution:x},v2:{id:"v2",kind:"modify",title:"Version 2 — the menu, made of functions",task:e.jsxs(e.Fragment,{children:["Add two functions: ",e.jsx("code",{children:"print_report(marks)"})," (prints ",e.jsx("code",{children:"No students yet"})," for an empty dict, otherwise the report) and ",e.jsx("code",{children:"add_student(marks, name, mark)"}),", which adds or updates the dict and ",e.jsx("strong",{children:"returns"})," ",e.jsx("code",{children:"Added PRIYA"})," or ",e.jsx("code",{children:"Updated PRIYA"}),". Then replace the input lines with the menu loop from Unit 7.7 (",e.jsx("code",{children:"1. Add  2. Report  3. Exit"}),") — each branch now just calls a function."]}),starter:x,minLines:50,tests:[{inputs:v,expect:h(v,!1)},{inputs:j,expect:h(j,!1),hidden:!0}],post:`d = {}
assert add_student(d, 'Z', 1) == 'Added Z' and d == {'Z': 1}, 'add_student should change the dict passed in and return the message'`,requires:[{node:"FunctionDef",min:4},{node:"While"}],hints:["add_student changes the dict passed in — the caller sees it (Unit 8.3).","print_report: if not marks: print(...) and return early.","The menu: print(add_student(marks, name, mark)) and print_report(marks)."],solution:b},v3:{id:"v3",kind:"modify",title:"Version 3 — never crash on bad marks",task:e.jsxs(e.Fragment,{children:["Typing ",e.jsx("code",{children:"abc"})," for a mark crashes the program, and ",e.jsx("code",{children:"150"})," gets saved. Write ",e.jsx("code",{children:"read_int(prompt, low, high)"}),": it keeps asking until the input is all digits and between low and high, printing ",e.jsx("code",{children:"Enter a number from 0 to 100"})," after each bad try, and returns the int. Use it for the mark."]}),starter:b,minLines:58,tests:[{inputs:_,expect:h(_,!0)},{inputs:y,expect:h(y,!0),hidden:!0}],requires:[{call:"isdigit"}],hints:["while True: text = input(prompt) — then if text.isdigit() and low <= int(text) <= high: return int(text)",'isdigit() is False for "-5" and "abc", so int() is never called on them.'],solution:C},toolkit:{id:"toolkit",kind:"make",title:"Number toolkit",task:e.jsxs(e.Fragment,{children:["Turn three Module 6 algorithms into functions that ",e.jsx("strong",{children:"return"}),": ",e.jsx("code",{children:"is_prime(n)"})," (True/False; 0 and 1 aren't prime), ",e.jsx("code",{children:"digit_sum(n)"})," and ",e.jsx("code",{children:"reverse_number(n)"})," (1042 → 2401, as an int — use ",e.jsx("code",{children:"% 10"})," and ",e.jsx("code",{children:"// 10"}),", not strings). Ask ",e.jsx("code",{children:"Number: "})," and print ",e.jsx("code",{children:"Prime: False"}),", ",e.jsx("code",{children:"Digit sum: 7"}),", ",e.jsx("code",{children:"Reversed: 2401"}),". Hidden checks test your functions on other numbers too."]}),minLines:22,tests:[{inputs:["1042"],expect:m(1042)},{inputs:["97"],expect:m(97),hidden:!0},{inputs:["1"],expect:m(1),hidden:!0}],post:`assert is_prime(2) and is_prime(13) and not is_prime(0) and not is_prime(91), 'check is_prime'
assert digit_sum(999) == 27 and digit_sum(5) == 5, 'check digit_sum'
assert reverse_number(120) == 21 and reverse_number(7) == 7, 'check reverse_number'`,requires:[{node:"FunctionDef",min:3}],forbids:[{call:"str",msg:"Use % 10 and // 10, not text."},{node:"Slice",msg:"Use % 10 and // 10, not slicing."}],hints:["reverse: rev = 0; while n > 0: rev = rev * 10 + n % 10; n //= 10","is_prime: if n < 2: return False — then try divisors; return False at the first one.","Each function returns; the main code prints."],solution:`def is_prime(n):
    if n < 2:
        return False
    for d in range(2, n):
        if n % d == 0:
            return False
    return True

def digit_sum(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

def reverse_number(n):
    rev = 0
    while n > 0:
        rev = rev * 10 + n % 10
        n //= 10
    return rev

n = int(input("Number: "))
print(f"Prime: {is_prime(n)}")
print(f"Digit sum: {digit_sum(n)}")
print(f"Reversed: {reverse_number(n)}")`}},O=u,B=[{q:"Why should class_stats RETURN its results instead of printing them?",options:["It's shorter","The caller can reuse the numbers (compare classes, save them, test them)","print is slow","Python requires it"],answer:1,explain:"Computing and displaying are separate jobs."},{q:"class_stats returns total / n, topper, best, passed. What type is that?",options:["list","tuple","dict","str"],answer:1,explain:"Comma-separated values are packed into a tuple; the caller unpacks them."},{q:"Why does add_student's change to marks show up in the main program?",options:["marks is global","The parameter and the caller's variable are tags on the same dict","return copies it back","It doesn't"],answer:1,explain:"Changing a dict passed in changes the caller's dict (Unit 8.3)."},{q:"Why check text.isdigit() BEFORE int(text)?",options:["Style",'int("abc") would crash; and short-circuits so int() never sees bad text',"isdigit converts it","No reason"],answer:1,explain:"and stops at the first False (Unit 5.3)."},{q:"Which is the main benefit of splitting the program into functions?",options:["Fewer lines always","Each piece can be read, tested and fixed on its own","Faster execution","No need for loops"],answer:1,explain:"Small named pieces are easier to understand and trust."}];function W(t){const n=[{label:"The Mission",kicker:"GRAND CAPSTONE",title:"Marks Manager 2.0",blocks:[e.jsx(k,{children:"Your Unit 7.7 Marks Manager works — but everything lives in one long loop. Professionals split programs into small functions, each with one job, that take parameters and return results. You'll refactor it in three versions; the behaviour stays the same while the structure gets better."}),e.jsx(D,{}),e.jsxs(M,{color:c.blue,icon:"🧪",children:["Hidden checks call your functions directly (for example ",e.jsxs("code",{children:["class_stats(","{","'A': 50, 'B': 30","}",")"]}),") — so they must return values, not print them."]})]},{label:"Version 1",kicker:"BUILD IN STEPS",title:"Version 1: compute in functions",blocks:[u.v1]},{label:"Version 2",kicker:"ADD ONE IDEA",title:"Version 2: a menu of function calls",blocks:[u.v2]},{label:"Version 3",kicker:"ADD ONE MORE",title:"Version 3: a reusable input helper",blocks:[u.v3,e.jsx(I,{children:"read_int is useful in every program that reads numbers. Write a helper once, test it once, and reuse it everywhere — that's the real payoff of functions. In Module 9 you'll meet try/except, another way to survive bad input."})]},{label:"Make It",kicker:"ON YOUR OWN",title:"Your program: number toolkit",blocks:[e.jsx(k,{children:"Three classic algorithms from Module 6, now as reusable functions that return answers."}),u.toolkit]}];return e.jsx(U,{...t,unitId:"Unit8_4",crumb:"MODULE 8 › UNIT 8.4",title:"Grand Capstone: Marks Manager 2.0",sections:n,quiz:B,next:{title:"Computational Thinking III — Thinking Recursively",text:"Module 8 complete! A function that calls itself… (Optional first: Module 8's Crucible.)"}})}export{O as EXERCISES,W as default};
