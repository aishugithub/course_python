import{j as e}from"./index-BsB65IVi.js";import{C as i}from"./Crucible-DIvkmO_M.js";import"./Lesson-M2Z85AvF.js";const t={spark1:{id:"spark1",kind:"predict",title:"Name tags and operators",code:`a = 7
b = a
a = a + 3
print(a, b)
print(a // b, a % b, a / 2)
print("7" * 3, "7" + "3")`,task:e.jsxs(e.Fragment,{children:["Six lines, three outputs. Watch what ",e.jsx("code",{children:"b = a"})," really does, and what each operator gives back."]}),hints:["b = a puts a second tag on the value 7. Moving a's tag to 10 later doesn't move b's.","/ always gives a decimal (float); // gives the whole part and % the remainder.","With text, * repeats and + glues."],solution:`10 7
1 3 5.0
777 73`},spark2:{id:"spark2",kind:"predict",title:"Input, end= and rounding",code:`qty = input("Qty: ")
price = float(input("Price: "))
print(qty * 2)
total = int(qty) * price
print(f"Total: {total:.2f}", end=" | ")
print(round(total), round(2.5), 2 + 3 * 4 ** 2 // 8)`,inputs:["4","2.5"],task:e.jsxs(e.Fragment,{children:["The user types ",e.jsx("code",{children:"4"})," and then ",e.jsx("code",{children:"2.5"}),". When someone types, the prompt and what they typed appear on one line — like ",e.jsx("code",{children:"Qty: 4"})," — so include those lines too."]}),hints:['input() always gives text. What is "4" * 2?','end=" | " means the next print continues on the same line.',"round(2.5) rounds to the nearest even number. Precedence: ** first, then * and // left to right, then +."],solution:`Qty: 4
Price: 2.5
44
Total: 10.00 | 10 2 8`},average:{id:"average",kind:"fix",title:"The average that's far too high",task:e.jsx(e.Fragment,{children:"This runs without an error — and gives a wildly wrong average. Find out why and fix it. Keep the output format."}),starter:`m1 = int(input("Mark 1: "))
m2 = int(input("Mark 2: "))
m3 = int(input("Mark 3: "))
average = m1 + m2 + m3 / 3
print("Average:", round(average, 1))`,tests:[{inputs:["70","80","90"],expect:`Mark 1: 70
Mark 2: 80
Mark 3: 90
Average: 80.0`},{inputs:["55","60","62"],expect:`Mark 1: 55
Mark 2: 60
Mark 3: 62
Average: 59.0`,hidden:!0}],hints:["Which operation does Python do first: + or /?","Only m3 is being divided by 3. Brackets change the order."],solution:`m1 = int(input("Mark 1: "))
m2 = int(input("Mark 2: "))
m3 = int(input("Mark 3: "))
average = (m1 + m2 + m3) / 3
print("Average:", round(average, 1))`},change:{id:"change",kind:"fix",title:"The change calculator",task:e.jsxs(e.Fragment,{children:["A shop's change calculator: it should print the change, how many ₹100 notes to give, and the rest. It has ",e.jsx("strong",{children:"three"})," bugs — the first two crash, the third gives a wrong number of notes. Fix all three."]}),starter:`price = input("Price: ")
paid = input("Paid: ")
change = paid - price
print("Change: Rs " + change)
print("Notes of 100:", change / 100)
print("Rest:", change % 100)`,tests:[{inputs:["230","500"],expect:`Price: 230
Paid: 500
Change: Rs 270
Notes of 100: 2
Rest: 70`},{inputs:["99","1000"],expect:`Price: 99
Paid: 1000
Change: Rs 901
Notes of 100: 9
Rest: 1`,hidden:!0}],hints:["input() gives text, and you can't subtract text.",'"Change: Rs " + 270 mixes text and a number — use an f-string or str().',"You can't hand over 2.7 notes: which operator gives the whole part?"],solution:`price = int(input("Price: "))
paid = int(input("Paid: "))
change = paid - price
print(f"Change: Rs {change}")
print("Notes of 100:", change // 100)
print("Rest:", change % 100)`},clock:{id:"clock",kind:"complete",title:"Seconds to a clock",task:e.jsxs(e.Fragment,{children:["Turn a number of seconds into ",e.jsx("code",{children:"hh:mm:ss"}),". Fill the blanks with operators, and finish the f-string: ",e.jsx("code",{children:":02d"})," prints a whole number in at least 2 digits, padding with a 0 (so 5 → ",e.jsx("code",{children:"05"}),")."]}),starter:`total = int(input("Seconds: "))
hours = total ___ 3600
minutes = (total % 3600) ___ 60
seconds = total ___ 60
print(f"{hours:02d}:{minutes:___}:{seconds:___}")`,tests:[{inputs:["7509"],expect:`Seconds: 7509
02:05:09`},{inputs:["59"],expect:`Seconds: 59
00:00:59`,hidden:!0},{inputs:["86399"],expect:`Seconds: 86399
23:59:59`,hidden:!0}],hints:["// gives whole hours; % gives what's left over.","seconds = total % 60","{minutes:02d} and {seconds:02d}"],solution:`total = int(input("Seconds: "))
hours = total // 3600
minutes = (total % 3600) // 60
seconds = total % 60
print(f"{hours:02d}:{minutes:02d}:{seconds:02d}")`},trip:{id:"trip",kind:"make",title:"Road-trip fuel split",task:e.jsxs(e.Fragment,{children:["Friends share the petrol for a trip. Ask ",e.jsx("code",{children:"Distance (km): "}),", ",e.jsx("code",{children:"Mileage (km/l): "}),", ",e.jsx("code",{children:"Petrol price: "})," and ",e.jsx("code",{children:"People: "})," (decimals allowed except for people). Print ",e.jsx("code",{children:"Litres needed: 12.50"}),", ",e.jsx("code",{children:"Fuel cost: Rs 1275.00"}),", ",e.jsx("code",{children:"Each pays: Rs 318.75"}),", and — because nobody carries paise — ",e.jsx("code",{children:"Rounded up: Rs 319"})," using ",e.jsx("code",{children:"math.ceil"}),"."]}),minLines:10,tests:[{inputs:["250","20","102","4"],expect:`Distance (km): 250
Mileage (km/l): 20
Petrol price: 102
People: 4
Litres needed: 12.50
Fuel cost: Rs 1275.00
Each pays: Rs 318.75
Rounded up: Rs 319`},{inputs:["130","15","105.5","3"],expect:`Distance (km): 130
Mileage (km/l): 15
Petrol price: 105.5
People: 3
Litres needed: 8.67
Fuel cost: Rs 914.33
Each pays: Rs 304.78
Rounded up: Rs 305`,hidden:!0},{inputs:["100","25","100","1"],expect:`Distance (km): 100
Mileage (km/l): 25
Petrol price: 100
People: 1
Litres needed: 4.00
Fuel cost: Rs 400.00
Each pays: Rs 400.00
Rounded up: Rs 400`,hidden:!0,why:"When the share is already whole, ceil leaves it alone — don't just add 1."}],requires:[{call:"ceil"},{node:"JoinedStr"}],forbids:[{text:"1275",msg:"Let Python calculate it."}],hints:["litres = distance / mileage; cost = litres * price; share = cost / people","import math at the top; math.ceil(share) rounds UP to a whole number.",'print(f"Each pays: Rs {share:.2f}")'],solution:`import math

distance = float(input("Distance (km): "))
mileage = float(input("Mileage (km/l): "))
price = float(input("Petrol price: "))
people = int(input("People: "))
litres = distance / mileage
cost = litres * price
share = cost / people
print(f"Litres needed: {litres:.2f}")
print(f"Fuel cost: Rs {cost:.2f}")
print(f"Each pays: Rs {share:.2f}")
print(f"Rounded up: Rs {math.ceil(share)}")`}},d=t,s=[{q:"After x = 5; y = x; x = 9 — what is y?",options:["9","5","14","Error"],answer:1,explain:"y = x tags the value 5. Re-tagging x doesn't touch y."},{q:'What does int("3.5") do?',options:["Gives 3","Gives 4","Crashes with ValueError","Gives 3.5"],answer:2,explain:'int() accepts whole-number text only; use int(float("3.5")).'},{q:'f"{7:03d}" gives…',options:["7","007","7.000","  7"],answer:1,explain:"03d: at least 3 digits, padded with zeros."}];function c(n){return e.jsx(i,{...n,unitId:"Unit4_C",module:"Module 4",title:"The Crucible: Python Basics",spark:[t.spark1,t.spark2],flame:[t.average,t.change],forge:[t.clock],temper:[t.trip],quiz:s})}export{d as EXERCISES,c as default};
