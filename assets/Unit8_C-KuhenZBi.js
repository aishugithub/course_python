import{j as e}from"./index-BsB65IVi.js";import{C as i}from"./Crucible-DIvkmO_M.js";import"./Lesson-M2Z85AvF.js";const o=n=>{const t=[/\d/,/[A-Z]/,/[a-z]/].filter(a=>a.test(n)).length;return n.length>=8&&t===3?"strong":n.length>=6&&t>=2?"medium":"weak"},d=n=>[...n.flatMap(t=>[`Password: ${t}`,`${t}: ${o(t)}`]),"Password: quit"].join(`
`),s=(n,t={})=>({inputs:[...n,"quit"],expect:d(n),...t}),r={spark1:{id:"spark1",kind:"predict",title:"Scope and defaults",code:`count = 10

def bump(count):
    count = count + 1
    return count

def show():
    print("inside:", count)

result = bump(count)
print(count, result)
show()

def total(a, b=2, c=3):
    return a + b * c

print(total(1), total(1, c=10), total(b=0, a=5))`,task:e.jsxs(e.Fragment,{children:["The parameter ",e.jsx("code",{children:"count"})," and the global ",e.jsx("code",{children:"count"})," share a name. Do they share a value?"]}),hints:["Inside bump, count is a local copy of the argument — changing it doesn't touch the global.","show() has no local count, so it reads the global one.","Keyword arguments can come in any order; the others use their defaults."],solution:`10 11
inside: 10
7 21 5`},spark2:{id:"spark2",kind:"predict",title:"print is not return",code:`def square(n):
    print("sq", n)
    return n * n

def describe(n):
    if n > 10:
        return "big"
    print("checked", n)

x = square(3) + square(2)
print(x)
print(describe(square(4)))
print(describe(2))`,task:e.jsxs(e.Fragment,{children:["Watch the ",e.jsx("em",{children:"order"})," things print in — and what a function gives back when it never reaches a ",e.jsx("code",{children:"return"}),"."]}),hints:["Python works out square(3) before square(2), and each call prints first.","describe(square(4)): square runs first, then describe gets 16.","A function that ends without return gives back None — and print shows it."],solution:`sq 3
sq 2
13
sq 4
big
checked 2
None`},average:{id:"average",kind:"fix",title:"The function that only shows",task:e.jsxs(e.Fragment,{children:["It crashes on the f-string. ",e.jsx("code",{children:"average()"})," shows the answer but doesn't give it back. Fix the function (and only the function); the output should be exactly the two lines below."]}),starter:`def average(marks):
    total = 0
    for m in marks:
        total += m
    print(total / len(marks))

def grade(avg):
    if avg >= 75:
        return "Distinction"
    elif avg >= 40:
        return "Pass"
    return "Fail"

marks = []
for x in input("Marks: ").split():
    marks.append(int(x))
avg = average(marks)
print(f"Average: {avg:.1f}")
print("Result:", grade(avg))`,tests:[{inputs:["80 70 90"],expect:`Marks: 80 70 90
Average: 80.0
Result: Distinction`},{inputs:["40 39"],expect:`Marks: 40 39
Average: 39.5
Result: Fail`,hidden:!0},{inputs:["40"],expect:`Marks: 40
Average: 40.0
Result: Pass`,hidden:!0}],post:"assert average([1, 2]) == 1.5, 'average() should RETURN the average.'",hints:["What does average() give back? Look for a return.","Replace the print inside average with return."],solution:`def average(marks):
    total = 0
    for m in marks:
        total += m
    return total / len(marks)

def grade(avg):
    if avg >= 75:
        return "Distinction"
    elif avg >= 40:
        return "Pass"
    return "Fail"

marks = []
for x in input("Marks: ").split():
    marks.append(int(x))
avg = average(marks)
print(f"Average: {avg:.1f}")
print("Result:", grade(avg))`},cart:{id:"cart",kind:"fix",title:"Two customers, one cart",task:e.jsxs(e.Fragment,{children:["Each call should start a fresh cart unless a cart is passed in. But order 2 contains the pen from order 1! A default value is created ",e.jsx("strong",{children:"once"}),", when ",e.jsx("code",{children:"def"})," runs — so every call without a cart shares the same list. Use ",e.jsx("code",{children:"cart=None"})," and make a new list inside the function when needed."]}),starter:`def add_item(item, cart=[]):
    cart.append(item)
    return cart

order1 = add_item("pen")
order2 = add_item("book")
print("Order 1:", order1)
print("Order 2:", order2)
print("Gift:", add_item("card", ["ribbon"]))`,tests:[{expect:`Order 1: ['pen']
Order 2: ['book']
Gift: ['ribbon', 'card']`}],post:"assert add_item('x') == ['x'] and add_item('y') == ['y'], 'Every call without a cart must start with an empty list.'",hints:["Print order1 and order2 — are they the same list?","def add_item(item, cart=None): then if cart is None: cart = []"],solution:`def add_item(item, cart=None):
    if cart is None:
        cart = []
    cart.append(item)
    return cart

order1 = add_item("pen")
order2 = add_item("book")
print("Order 1:", order1)
print("Order 2:", order2)
print("Gift:", add_item("card", ["ribbon"]))`},bill:{id:"bill",kind:"complete",title:"Defaults, keywords, a docstring",task:e.jsx(e.Fragment,{children:"Fill the blanks: the tip defaults to 10 percent and the bill to 1 person. The four prints should give the lines below — the last one prints the function's docstring."}),starter:`def bill(amount, tip=___, people=___):
    """Return each person's share: amount plus tip percent, split evenly."""
    total = amount + amount * ___ / 100
    return round(total / ___, 2)

print(bill(1000))
print(bill(1000, people=4))
print(bill(1000, tip=0, people=3))
print(bill.__doc__)`,tests:[{expect:`1100.0
275.0
333.33
Return each person's share: amount plus tip percent, split evenly.`}],post:"assert bill(200, 50, 2) == 150.0",hints:["tip=10, people=1","amount * tip / 100","total / people"],solution:`def bill(amount, tip=10, people=1):
    """Return each person's share: amount plus tip percent, split evenly."""
    total = amount + amount * tip / 100
    return round(total / people, 2)

print(bill(1000))
print(bill(1000, people=4))
print(bill(1000, tip=0, people=3))
print(bill.__doc__)`},password:{id:"password",kind:"make",title:"Password strength",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"has_digit(s)"}),", ",e.jsx("code",{children:"has_upper(s)"})," and ",e.jsx("code",{children:"has_lower(s)"})," (each returns True/False — ",e.jsx("code",{children:"ch.isdigit()"}),", ",e.jsx("code",{children:"ch.isupper()"}),", ",e.jsx("code",{children:"ch.islower()"})," test one character), and ",e.jsx("code",{children:"strength(pw)"}),": ",e.jsx("code",{children:'"strong"'})," if it is at least 8 long with all three kinds; ",e.jsx("code",{children:'"medium"'})," if at least 6 long with at least two kinds; otherwise ",e.jsx("code",{children:'"weak"'}),". Main program: keep asking ",e.jsx("code",{children:"Password: "})," until ",e.jsx("code",{children:"quit"}),", printing ",e.jsx("code",{children:"Abcdefg1: strong"}),". Hidden checks call your functions directly."]}),minLines:24,tests:[s(["abc","Abcdef1","Abcdefg1","abcdefgh","ABCdef"]),s(["12345678"],{hidden:!0,why:"Only digits is one kind: weak, however long."}),s(["Ab1","aB3456"],{hidden:!0})],post:`assert has_digit('a1') and not has_digit('ab'), 'has_digit'
assert has_upper('aB') and not has_upper('ab'), 'has_upper'
assert has_lower('Ab') and not has_lower('AB'), 'has_lower'
assert strength('Aa1aaaaa') == 'strong' and strength('Aa1aa') == 'weak' and strength('aaaaaa1') == 'medium', 'strength() gives the wrong rating'`,requires:[{node:"FunctionDef",min:4},{node:"Return",min:4}],hints:["def has_digit(s): for ch in s: if ch.isdigit(): return True — and return False after the loop.","kinds = has_digit(pw) + has_upper(pw) + has_lower(pw) — True counts as 1.","Check strong first, then medium, else weak."],solution:`def has_digit(s):
    for ch in s:
        if ch.isdigit():
            return True
    return False

def has_upper(s):
    for ch in s:
        if ch.isupper():
            return True
    return False

def has_lower(s):
    for ch in s:
        if ch.islower():
            return True
    return False

def strength(pw):
    kinds = has_digit(pw) + has_upper(pw) + has_lower(pw)
    if len(pw) >= 8 and kinds == 3:
        return "strong"
    if len(pw) >= 6 and kinds >= 2:
        return "medium"
    return "weak"

while True:
    pw = input("Password: ")
    if pw == "quit":
        break
    print(f"{pw}: {strength(pw)}")`}},p=r,l=[{q:"A function with no return statement gives back…",options:["0",'""',"None","An error"],answer:2,explain:"That's why print(f(x)) can show None."},{q:"def f(x): x = 5 — after a = 1; f(a), a is…",options:["5","1","None","Error"],answer:1,explain:"x is a local name; re-tagging it doesn't touch a."},{q:"Why is def f(items=[]) risky?",options:["Lists can't be defaults","The same list is shared by every call that uses the default","It's slower","It isn't"],answer:1,explain:"Defaults are made once, at def time. Use None and create the list inside."}];function g(n){return e.jsx(i,{...n,unitId:"Unit8_C",module:"Module 8",title:"The Crucible: Functions",spark:[r.spark1,r.spark2],flame:[r.average,r.cart],forge:[r.bill],temper:[r.password],quiz:l})}export{p as EXERCISES,g as default};
