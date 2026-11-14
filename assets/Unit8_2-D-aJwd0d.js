import{j as e,r as h}from"./index-cCwWvTed.js";import{P as o,K as x,C as u,L as m,T as t,a as l}from"./Lesson-BzQti5aW.js";function k(){const[n,a]=h.useState(5),[i,p]=h.useState(3);return e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[e.jsxs("pre",{style:{margin:0,fontFamily:l,fontSize:15,lineHeight:1.8,background:t.codeBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px"},children:["def area(",e.jsx("span",{style:{color:t.teal,fontWeight:700},children:"length"}),", ",e.jsx("span",{style:{color:t.teal,fontWeight:700},children:"width"}),`):
    `,e.jsx("span",{style:{color:t.purple,fontWeight:700},children:"return"}),` length * width

result = area(`,e.jsx("span",{style:{color:t.orange,fontWeight:700},children:n}),", ",e.jsx("span",{style:{color:t.orange,fontWeight:700},children:i}),`)
print(result)`]}),e.jsx("div",{style:{display:"flex",gap:14,marginTop:8},children:[["length",n,a],["width",i,p]].map(([d,c,f])=>e.jsxs("label",{style:{fontFamily:l,fontSize:14},children:[d," = ",e.jsx("strong",{children:c}),e.jsx("input",{type:"range",min:1,max:12,value:c,onChange:g=>f(Number(g.target.value)),style:{width:130,accentColor:t.navy,display:"block"}})]},d))})]}),e.jsxs("div",{style:{fontSize:14.5,color:t.slate,lineHeight:1.75},children:[e.jsxs("div",{children:["1. The ",e.jsx("strong",{style:{color:t.orange},children:"arguments"})," ",n," and ",i," travel into the ",e.jsx("strong",{style:{color:t.teal},children:"parameters"}),": ",e.jsxs("code",{children:["length = ",n]}),", ",e.jsxs("code",{children:["width = ",i]})," (in order)."]}),e.jsxs("div",{children:["2. The body computes ",e.jsxs("code",{children:[n," * ",i]}),"."]}),e.jsxs("div",{children:["3. ",e.jsx("strong",{style:{color:t.purple},children:"return"})," sends ",e.jsx("strong",{children:n*i})," back to the call, which is replaced by that value: ",e.jsxs("code",{children:["result = ",n*i]}),"."]}),e.jsx("div",{style:{marginTop:8,fontFamily:l,background:t.termBg,color:t.termText,borderRadius:8,padding:"8px 12px",display:"inline-block"},children:n*i})]})]})}const s=(n,a,i)=>n*(1+i/100)/a,r={area:{id:"area",kind:"type",title:"Data in, answer out",task:e.jsx(e.Fragment,{children:"A function with two parameters and a return value. The call is replaced by whatever the function returns, so it can be used anywhere a value can."}),show:`def area(length, width):
    return length * width

print(area(5, 3))
room = area(4, 4)
print(room + area(2, 3))`,tests:[{expect:`15
22`}],requires:[{node:"Return"}],hints:["area(4, 4) is 16, area(2, 3) is 6."],solution:`def area(length, width):
    return length * width

print(area(5, 3))
room = area(4, 4)
print(room + area(2, 3))`},grade:{id:"grade",kind:"write",title:"grade(mark)",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"grade(mark)"})," that ",e.jsx("strong",{children:"returns"})," (not prints) the letter: ",e.jsx("code",{children:"A"})," ≥ 90, ",e.jsx("code",{children:"B"})," ≥ 75, ",e.jsx("code",{children:"C"})," ≥ 60, ",e.jsx("code",{children:"D"})," ≥ 40, else ",e.jsx("code",{children:"F"}),". Then, for ",e.jsx("code",{children:"marks = [95, 72, 40, 39]"}),", print ",e.jsx("code",{children:"95 -> A"})," and so on."]}),tests:[{expect:`95 -> A
72 -> C
40 -> D
39 -> F`}],post:`assert grade(75) == 'B', 'grade(75) should return "B"'
assert grade(60) == 'C', 'grade(60) should return "C"'
assert grade(0) == 'F'
assert grade(90) == 'A'`,requires:[{node:"FunctionDef"},{node:"Return"}],hints:['Each branch can return straight away: if mark >= 90: return "A"','for m in marks: print(f"{m} -> {grade(m)}")'],solution:`def grade(mark):
    if mark >= 90:
        return "A"
    elif mark >= 75:
        return "B"
    elif mark >= 60:
        return "C"
    elif mark >= 40:
        return "D"
    else:
        return "F"

marks = [95, 72, 40, 39]
for m in marks:
    print(f"{m} -> {grade(m)}")`},printret:{id:"printret",kind:"fix",title:"The None trap",task:e.jsxs(e.Fragment,{children:["Run it: the total is printed, and then ",e.jsx("code",{children:"Grand total: None"}),". Fix the function so the caller gets the number back."]}),starter:`def bill(price, qty):
    print(price * qty)

total = bill(150, 3)
print("Grand total:", total)`,tests:[{expect:"Grand total: 450"}],requires:[{node:"Return"}],hints:["A function with no return gives back None.","Replace print with return inside the function."],solution:`def bill(price, qty):
    return price * qty

total = bill(150, 3)
print("Grand total:", total)`},iseven:{id:"iseven",kind:"write",title:"A function that answers yes/no",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"is_even(n)"})," returning ",e.jsx("code",{children:"True"})," or ",e.jsx("code",{children:"False"}),". Then ask ",e.jsx("code",{children:"Numbers: "})," (one line) and use it to print ",e.jsx("code",{children:"Even count: 3"}),"."]}),tests:[{inputs:["4 7 10 13 22"],expect:`Numbers: 4 7 10 13 22
Even count: 3`},{inputs:["1 3"],expect:`Numbers: 1 3
Even count: 0`,hidden:!0}],post:"assert is_even(0) is True and is_even(5) is False, 'is_even should return True or False'",requires:[{node:"FunctionDef"}],hints:["return n % 2 == 0 — the comparison already IS True or False.","if is_even(int(p)): count += 1"],solution:`def is_even(n):
    return n % 2 == 0

count = 0
for p in input("Numbers: ").split():
    if is_even(int(p)):
        count += 1
print(f"Even count: {count}")`},firstfail:{id:"firstfail",kind:"write",title:"return stops the function",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"return"})," ends the function immediately — even inside a loop. Write ",e.jsx("code",{children:"first_fail(marks)"})," that returns the first mark below 40, or ",e.jsx("code",{children:"None"})," if there isn't one. For ",e.jsx("code",{children:"[72, 38, 25]"})," print ",e.jsx("code",{children:"First fail: 38"}),"; for ",e.jsx("code",{children:"[72, 85]"})," print ",e.jsx("code",{children:"First fail: None"}),"."]}),tests:[{expect:`First fail: 38
First fail: None`}],post:`assert first_fail([10]) == 10
assert first_fail([]) is None`,requires:[{node:"Return",min:2}],hints:["for m in marks: if m < 40: return m","After the loop (only reached if nothing failed): return None"],solution:`def first_fail(marks):
    for m in marks:
        if m < 40:
            return m
    return None

print("First fail:", first_fail([72, 38, 25]))
print("First fail:", first_fail([72, 85]))`},defaults:{id:"defaults",kind:"type",title:"Default values",task:e.jsxs(e.Fragment,{children:["A parameter can have a ",e.jsx("strong",{children:"default"}),", used when the call leaves it out. Parameters with defaults come last."]}),show:`def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Priya"))
print(greet("Arun", "Vanakkam"))`,tests:[{expect:`Hello, Priya!
Vanakkam, Arun!`}],hints:["The first call doesn't pass a greeting, so the default is used."],solution:`def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Priya"))
print(greet("Arun", "Vanakkam"))`},keywords:{id:"keywords",kind:"write",title:"Keyword arguments",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"ticket(movie, seats=1, price=150)"})," returning ",e.jsxs("code",{children:['f"',"{movie}",": ","{seats}"," x Rs ","{price}"," = Rs ","{seats * price}",'"']}),". Call it three ways: just ",e.jsx("code",{children:'"Leo"'}),"; ",e.jsx("code",{children:'"Jailer"'})," with ",e.jsx("code",{children:"seats=3"}),"; and ",e.jsx("code",{children:'"Kalki"'})," with ",e.jsx("code",{children:"price=200"})," only — using ",e.jsx("strong",{children:"keyword arguments"})," (",e.jsx("code",{children:"name=value"})," in the call)."]}),tests:[{expect:`Leo: 1 x Rs 150 = Rs 150
Jailer: 3 x Rs 150 = Rs 450
Kalki: 1 x Rs 200 = Rs 200`}],post:"assert ticket('X', price=10, seats=2) == 'X: 2 x Rs 10 = Rs 20', 'ticket should return the text, using both keyword arguments'",requires:[{node:"keyword",msg:"Use keyword arguments in your calls, like seats=3."}],hints:[`def ticket(movie, seats=1, price=150):
    return f"{movie}: {seats} x Rs {price} = Rs {seats * price}"`,'print(ticket("Kalki", price=200)) — the keyword lets you skip seats.'],solution:`def ticket(movie, seats=1, price=150):
    return f"{movie}: {seats} x Rs {price} = Rs {seats * price}"

print(ticket("Leo"))
print(ticket("Jailer", seats=3))
print(ticket("Kalki", price=200))`},missing:{id:"missing",kind:"fix",title:"One argument short",task:e.jsxs(e.Fragment,{children:["Run it and read the coach. Fix the ",e.jsx("strong",{children:"call"})," so it prints ",e.jsx("code",{children:"Area: 12"}),"."]}),starter:`def area(length, width):
    return length * width

print("Area:", area(4))`,tests:[{expect:"Area: 12"}],hints:["area needs two values: length and width. 4 × 3 = 12."],solution:`def area(length, width):
    return length * width

print("Area:", area(4, 3))`},docstring:{id:"docstring",kind:"type",title:"Docstrings",task:e.jsxs(e.Fragment,{children:["A string right under the ",e.jsx("code",{children:"def"})," line documents the function. Python stores it, and ",e.jsx("code",{children:"help()"})," and code editors show it to anyone using your function."]}),show:`def celsius(f):
    """Convert Fahrenheit to Celsius, rounded to 1 decimal."""
    return round((f - 32) * 5 / 9, 1)

print(celsius(98.6))
print(celsius.__doc__)`,tests:[{expect:`37.0
Convert Fahrenheit to Celsius, rounded to 1 decimal.`}],hints:["Triple quotes, indented like the body."],solution:`def celsius(f):
    """Convert Fahrenheit to Celsius, rounded to 1 decimal."""
    return round((f - 32) * 5 / 9, 1)

print(celsius(98.6))
print(celsius.__doc__)`},splitter:{id:"splitter",kind:"make",title:"Bill splitter",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"per_person(total, people=2, tip=0)"})," with a docstring, returning each person's share: the total plus ",e.jsx("code",{children:"tip"})," percent, divided by ",e.jsx("code",{children:"people"}),". Ask ",e.jsx("code",{children:"Bill: "})," (decimal) and ",e.jsx("code",{children:"People: "}),", and print three lines with 2 decimals: ",e.jsx("code",{children:"Split: Rs 450.00"}),", ",e.jsx("code",{children:"With 10% tip: Rs 495.00"})," (use ",e.jsx("code",{children:"tip=10"})," as a keyword argument), and ",e.jsx("code",{children:"Just you: Rs 900.00"})," (",e.jsx("code",{children:"people=1"}),")."]}),minLines:9,tests:[{inputs:["900","2"],expect:`Bill: 900
People: 2
Split: Rs ${s(900,2,0).toFixed(2)}
With 10% tip: Rs ${s(900,2,10).toFixed(2)}
Just you: Rs ${s(900,1,0).toFixed(2)}`},{inputs:["1200","3"],expect:`Bill: 1200
People: 3
Split: Rs ${s(1200,3,0).toFixed(2)}
With 10% tip: Rs ${s(1200,3,10).toFixed(2)}
Just you: Rs ${s(1200,1,0).toFixed(2)}`,hidden:!0}],post:`assert per_person(100) == 50, 'per_person(100) should use people=2 by default'
assert per_person.__doc__, 'Add a docstring'`,requires:[{node:"FunctionDef"},{node:"keyword",min:2,msg:"Call with keyword arguments: tip=10 and people=1."}],hints:["return total * (1 + tip / 100) / people",'print(f"With 10% tip: Rs {per_person(bill, people, tip=10):.2f}")'],solution:`def per_person(total, people=2, tip=0):
    """Each person's share of a bill, including a tip percentage."""
    return total * (1 + tip / 100) / people

bill = float(input("Bill: "))
people = int(input("People: "))
print(f"Split: Rs {per_person(bill, people):.2f}")
print(f"With 10% tip: Rs {per_person(bill, people, tip=10):.2f}")
print(f"Just you: Rs {per_person(bill, people=1):.2f}")`}},v=r,j=[{q:"In def add(a, b) and the call add(2, 3), what are 2 and 3?",options:["Parameters","Arguments","Returns","Defaults"],answer:1,explain:"Arguments are the values in the call; parameters are the names in the def."},{q:"What does a function return if it has no return statement?",options:["0",'""',"None","Error"],answer:2,explain:"That's why result = show_total() gives None."},{q:"What does this print?",code:`def f(x):
    return x * 2
    print("done")

print(f(4))`,options:["8 then done","8","done","None"],answer:1,explain:"return ends the function; the print after it never runs."},{q:'def greet(name, msg="Hi"). Which call is valid?',options:["greet()",'greet("Ravi")','greet(msg="Yo")','greet("Ravi", "Yo", "!")'],answer:1,explain:"name has no default, so it must be given; msg can be left out."},{q:"Why are keyword arguments useful?",options:["They're faster","You can skip defaults and say which value is which, in any order","They make variables global","They avoid return"],answer:1,explain:'ticket("Kalki", price=200) skips seats and is self-explaining.'},{q:"Where does a docstring go?",options:["Above the def","First line inside the function body","At the end of the file","In a comment"],answer:1,explain:"The first string in the body becomes the function's __doc__."}];function b(n){const a=[{label:"In & Out",kicker:"PARAMETERS · RETURN",title:"Send values in, get an answer back",blocks:[e.jsxs(o,{children:["Functions in 8.1 did the same thing every time. Real functions take ",e.jsx("strong",{children:"inputs"})," (parameters) and give back an ",e.jsx("strong",{children:"output"})," (the return value) — like a function in maths: f(x) = 2x."]}),e.jsx(k,{}),r.area,r.grade]},{label:"print vs return",kicker:"THE NONE TRAP",title:"Showing a value is not giving it back",blocks:[e.jsxs(o,{children:[e.jsx("code",{children:"print"})," shows a value on the screen, for a human. ",e.jsx("code",{children:"return"})," hands it to the code that called the function, for further use. A function without ",e.jsx("code",{children:"return"})," gives back ",e.jsx("code",{children:"None"}),"."]}),r.printret,r.iseven,r.firstfail,e.jsxs(x,{children:["Let functions ",e.jsx("strong",{children:"return"})," results and let the caller decide whether to print them. A function that returns can be reused in calculations, conditions and other functions; one that prints can't."]})]},{label:"Defaults & Keywords",kicker:"FLEXIBLE CALLS",title:"Default values and keyword arguments",blocks:[r.defaults,r.keywords,r.missing,e.jsxs("div",{className:"fh-two",style:{maxWidth:840,marginTop:14},children:[e.jsx(u,{title:"you've used these already",code:`print("a", "b", sep="-")   # keyword argument
print("x", end="")          # end has a default: "\\n"
round(3.14159, 2)           # ndigits has a default: none`}),e.jsx(u,{title:"rules",code:`def f(a, b=2): ...   # defaults go last
f(1)          # b = 2
f(1, 5)       # b = 5
f(b=5, a=1)   # keywords: any order`})]})]},{label:"Docstrings",kicker:"DOCUMENT IT",title:"Tell people what your function does",blocks:[r.docstring]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: bill splitter",blocks:[e.jsx(o,{children:"One function with two defaults and a docstring, called three different ways."}),r.splitter]}];return e.jsx(m,{...n,unitId:"Unit8_2",crumb:"MODULE 8 › UNIT 8.2",title:"Parameters & Return Values",sections:a,quiz:j,next:{title:"Unit 8.3 — Scope & the Call Stack",text:"Where do a function's variables live — and where do they go when it returns?"}})}export{v as EXERCISES,b as default};
