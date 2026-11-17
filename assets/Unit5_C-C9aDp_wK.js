import{j as e}from"./index-BsB65IVi.js";import{C as o}from"./Crucible-DIvkmO_M.js";import"./Lesson-M2Z85AvF.js";const d=(n,a,i)=>{const s=`Age: ${n}
Distance (km): ${a}
Class (sleeper/ac): ${i}
`;if(i!=="sleeper"&&i!=="ac")return s+"Unknown class";if(+a<=0)return s+"Invalid distance";if(+n<5)return s+"Free ticket";let l=(i==="sleeper"?.5:1.5)*+a;return l<50&&(l=50),+n<=11?l/=2:+n>=60&&(l*=.6),s+`Fare: Rs ${l.toFixed(2)}`},t=(n,a,i,s={})=>({inputs:[n,a,i],expect:d(n,a,i),...s}),r={spark1:{id:"spark1",kind:"predict",title:"Which branches run?",code:`x = 15
if x > 10:
    print("A")
if x > 12:
    print("B")
elif x > 14:
    print("C")
else:
    print("D")
print(x > 10 and x < 20, not x == 15, "apple" < "Apple")`,task:e.jsxs(e.Fragment,{children:["Two separate ",e.jsx("code",{children:"if"})," statements, then an ",e.jsx("code",{children:"elif"})," chain. Careful: how many of them can print?"]}),hints:["The first if stands alone. The second if starts a new chain.","In an if/elif/else chain only the FIRST true branch runs.","Text is compared letter by letter by code number: every capital letter comes before every small letter."],solution:`A
B
True False False`},spark2:{id:"spark2",kind:"predict",title:"Truthy, falsy, short-circuit",code:`n = int(input("n: "))
print(bool(n), bool("0"), bool(""))
if n:
    print("non-zero")
else:
    print("zero")
label = "even" if n % 2 == 0 else "odd"
print(label)
print(n != 0 and 10 / n > 1)
print(0.1 + 0.2 == 0.3, abs(0.1 + 0.2 - 0.3) < 1e-9)`,inputs:["0"],task:e.jsxs(e.Fragment,{children:["The user types ",e.jsx("code",{children:"0"}),". One line here would crash if Python didn't stop early — does it?"]}),hints:['0 and empty text are falsy; any non-empty text — even "0" — is truthy.',"and stops at the first False: 10 / n is never worked out.","0.1 + 0.2 is stored as 0.30000000000000004."],solution:`n: 0
False True False
zero
even
False
False True`},ladder:{id:"ladder",kind:"fix",title:"Everyone gets a D",task:e.jsx(e.Fragment,{children:"A grade calculator: A for 90+, B for 75+, C for 60+, D for 40+, else F. A student with 95 gets D. Fix the logic (not by adding more conditions — think about order)."}),starter:`m = int(input("Marks: "))
if m >= 40:
    print("D")
elif m >= 60:
    print("C")
elif m >= 75:
    print("B")
elif m >= 90:
    print("A")
else:
    print("F")`,tests:[{inputs:["95"],expect:`Marks: 95
A`},{inputs:["75"],expect:`Marks: 75
B`,hidden:!0},{inputs:["60"],expect:`Marks: 60
C`,hidden:!0},{inputs:["40"],expect:`Marks: 40
D`,hidden:!0},{inputs:["39"],expect:`Marks: 39
F`,hidden:!0}],forbids:[{node:"BoolOp",msg:"No and/or needed — just put the checks in the right order."}],hints:["Python stops at the first true condition. Is 95 >= 40?","Check the highest grade first."],solution:`m = int(input("Marks: "))
if m >= 90:
    print("A")
elif m >= 75:
    print("B")
elif m >= 60:
    print("C")
elif m >= 40:
    print("D")
else:
    print("F")`},leap:{id:"leap",kind:"fix",title:"The leap-year rule",task:e.jsxs(e.Fragment,{children:["The rule: a year is a leap year if it is divisible by 4 ",e.jsx("strong",{children:"and not"})," by 100 — ",e.jsx("strong",{children:"or"})," if it is divisible by 400. So 2024 and 2000 are leap years; 1900 and 2023 are not. This program says 1900 is a leap year. Fix the condition."]}),starter:`year = int(input("Year: "))
if year % 4 == 0 or year % 100 != 0 and year % 400 == 0:
    print("Leap year")
else:
    print("Not a leap year")`,tests:[{inputs:["1900"],expect:`Year: 1900
Not a leap year`},{inputs:["2024"],expect:`Year: 2024
Leap year`,hidden:!0},{inputs:["2000"],expect:`Year: 2000
Leap year`,hidden:!0,why:"Divisible by 400 → leap, even though it's also divisible by 100."},{inputs:["2023"],expect:`Year: 2023
Not a leap year`,hidden:!0},{inputs:["2100"],expect:`Year: 2100
Not a leap year`,hidden:!0}],hints:["and binds tighter than or — Python reads the condition as a or (b and c).","Write the two halves of the rule with brackets: (div by 4 and not div by 100) or (div by 400)."],solution:`year = int(input("Year: "))
if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
    print("Leap year")
else:
    print("Not a leap year")`},bmi:{id:"bmi",kind:"complete",title:"BMI category",task:e.jsxs(e.Fragment,{children:["Fill the blanks: refuse a weight or height of 0 or less, then use ",e.jsx("strong",{children:"chained comparisons"})," (like ",e.jsx("code",{children:"18.5 <= bmi < 25"}),") for the middle categories: Underweight below 18.5, Normal up to 25, Overweight up to 30, Obese from 30."]}),starter:`weight = float(input("Weight (kg): "))
height = float(input("Height (m): "))
if weight <= 0 ___ height <= 0:
    print("Invalid input")
else:
    bmi = weight / height ** 2
    if bmi < 18.5:
        category = "Underweight"
    elif ___ <= bmi < 25:
        category = "Normal"
    elif ___:
        category = "Overweight"
    else:
        category = "Obese"
    print(f"BMI: {bmi:.1f} ({category})")`,tests:[{inputs:["70","1.75"],expect:`Weight (kg): 70
Height (m): 1.75
BMI: 22.9 (Normal)`},{inputs:["0","1.7"],expect:`Weight (kg): 0
Height (m): 1.7
Invalid input`,hidden:!0},{inputs:["85","1.7"],expect:`Weight (kg): 85
Height (m): 1.7
BMI: 29.4 (Overweight)`,hidden:!0},{inputs:["50","1.8"],expect:`Weight (kg): 50
Height (m): 1.8
BMI: 15.4 (Underweight)`,hidden:!0},{inputs:["100","1.6"],expect:`Weight (kg): 100
Height (m): 1.6
BMI: 39.1 (Obese)`,hidden:!0},{inputs:["60","-1.6"],expect:`Weight (kg): 60
Height (m): -1.6
Invalid input`,hidden:!0,why:"Either value being 0 or less is invalid — or, not and."}],hints:["Invalid if EITHER value is bad.","18.5 <= bmi < 25","25 <= bmi < 30"],solution:`weight = float(input("Weight (kg): "))
height = float(input("Height (m): "))
if weight <= 0 or height <= 0:
    print("Invalid input")
else:
    bmi = weight / height ** 2
    if bmi < 18.5:
        category = "Underweight"
    elif 18.5 <= bmi < 25:
        category = "Normal"
    elif 25 <= bmi < 30:
        category = "Overweight"
    else:
        category = "Obese"
    print(f"BMI: {bmi:.1f} ({category})")`},fare:{id:"fare",kind:"make",title:"Train fare calculator",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Age: "}),", ",e.jsx("code",{children:"Distance (km): "})," and ",e.jsx("code",{children:"Class (sleeper/ac): "}),". Then, in this order: a class other than ",e.jsx("code",{children:"sleeper"})," or ",e.jsx("code",{children:"ac"})," → ",e.jsx("code",{children:"Unknown class"}),"; a distance of 0 or less → ",e.jsx("code",{children:"Invalid distance"}),"; under 5 → ",e.jsx("code",{children:"Free ticket"}),". Otherwise the fare is Rs 0.50 per km (sleeper) or Rs 1.50 per km (ac), at least Rs 50; ages 5–11 pay half, 60 and over get 40% off. Print ",e.jsx("code",{children:"Fare: Rs 300.00"}),"."]}),minLines:18,tests:[t("30","600","sleeper"),t("8","600","ac",{hidden:!0}),t("65","50","sleeper",{hidden:!0,why:"The Rs 50 minimum applies first, then the senior discount."}),t("3","100","ac",{hidden:!0}),t("20","100","first",{hidden:!0}),t("20","0","ac",{hidden:!0}),t("5","100","sleeper",{hidden:!0,why:"Age 5 already pays (half fare) — only under 5 travels free."}),t("60","200","ac",{hidden:!0,why:"60 counts as a senior: 60 and over."})],requires:[{node:"If",min:4}],hints:["Read all three inputs first, then decide.",'if cls != "sleeper" and cls != "ac": … elif distance <= 0: … elif age < 5: … else: work out the fare',"fare = rate * distance; if fare < 50: fare = 50 — then the age discounts with if / elif."],solution:`age = int(input("Age: "))
distance = float(input("Distance (km): "))
cls = input("Class (sleeper/ac): ")
if cls != "sleeper" and cls != "ac":
    print("Unknown class")
elif distance <= 0:
    print("Invalid distance")
elif age < 5:
    print("Free ticket")
else:
    rate = 0.5 if cls == "sleeper" else 1.5
    fare = rate * distance
    if fare < 50:
        fare = 50
    if age <= 11:
        fare = fare / 2
    elif age >= 60:
        fare = fare * 0.6
    print(f"Fare: Rs {fare:.2f}")`}},u=r,h=[{q:"x = 50. if x > 10: … elif x > 40: … — which runs?",options:["Both","Only the first","Only the elif","Neither"],answer:1,explain:"A chain stops at the first true condition."},{q:"a or b and c means…",options:["(a or b) and c","a or (b and c)","Error","Depends on the values"],answer:1,explain:"and binds tighter than or — use brackets to be clear."},{q:'bool("False") is…',options:["False","True","Error","None"],answer:1,explain:"Any non-empty text is truthy, whatever it says."}];function g(n){return e.jsx(o,{...n,unitId:"Unit5_C",module:"Module 5",title:"The Crucible: Decisions",spark:[r.spark1,r.spark2],flame:[r.ladder,r.leap],forge:[r.bmi],temper:[r.fare],quiz:h})}export{u as EXERCISES,g as default};
