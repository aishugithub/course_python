import{j as e}from"./index-B7nVsXSH.js";import{P as E,T as g,K as $,N as C,L as T}from"./Lesson-TE-z-zj8.js";import{R as P,a as h,f as v,p as L,b as R,s as Q,F as I,t as F,d as M,C as u}from"./project-CVPaOm-M.js";function y(a){const t=u(a),s=t.ask("Item: ");let i=+t.ask("Stock: ");const l=+t.ask("Price: ");t.say("1 Sell  2 Restock  3 Stock  4 Quit");let o=0,n=0;for(;;){const r=t.ask("Choice: ");if(r==="1"){const c=+t.ask("Quantity: ");c<=0?t.say("Quantity must be positive"):c>i?t.say(`Only ${i} ${s} left`):(i-=c,o+=c,n+=c*l,t.say(`Sold ${c} ${s} for ${c*l}`),i<5&&t.say(`Low stock: ${i} left`))}else if(r==="2"){const c=+t.ask("Quantity: ");c<=0?t.say("Quantity must be positive"):(i+=c,t.say(`Stock: ${i}`))}else if(r==="3")t.say(`${s}: ${i} in stock`);else if(r==="4"){t.say(`Sold ${o} items, revenue ${n}`);break}else t.say("Unknown choice")}return t.text()}const N={pen:40,notebook:12,eraser:6,marker:3},A={pen:10,notebook:45,eraser:5,marker:30},q="Order (item qty, or done): ",V=(a,t)=>String(a).padEnd(t),m=(a,t)=>String(a).padStart(t),K=(a,t,s)=>`${V(a,10)}${m(t,3)} x ${m(s,3)} = ${m(t*s,5)}`;function w(a){const t=u(a),s={...N},i=[];for(;;){const o=t.ask(q);if(o.trim().toLowerCase()==="done")break;const n=o.split(/\s+/).filter(Boolean);if(n.length!==2||!/^\d+$/.test(n[1])){t.say("Format: item qty");continue}const r=n[0].toLowerCase(),c=+n[1];r in s?c>s[r]?t.say(`Only ${s[r]} ${r} left`):(s[r]-=c,i.push([r,c,A[r]])):t.say(`Sorry, we don't sell ${r}`)}i.length?t.say("BILL",...i.map(([o,n,r])=>K(o,n,r)),`Total: ${i.reduce((o,[,n,r])=>o+n*r,0)}`):t.say("Nothing bought");const l=Object.keys(s).filter(o=>s[o]<5).sort();return l.length&&t.say(`Low stock: ${l.map(o=>`${o} (${s[o]})`).join(", ")}`),t.text()}const S=`stock = {"pen": 40, "notebook": 12, "eraser": 6, "marker": 3}
prices = {"pen": 10, "notebook": 45, "eraser": 5, "marker": 30}

`;function b(a,t){const s=u(t);if(a===null)return s.say("No stock file"),{out:s.text(),lines:null};const i=new Map;let l=0;a.split(`
`).filter(n=>n.trim()).forEach(n=>{const r=n.trim().split(",");r.length===3&&/^\d+$/.test(r[1])&&/^\d+$/.test(r[2])?i.set(r[0],[+r[1],+r[2]]):l++}),s.say(`Loaded ${i.size} products`),l&&s.say(`Skipped ${l} bad line(s)`);let o=0;for(;;){const n=s.ask(q);if(n.trim().toLowerCase()==="done")break;const r=n.split(/\s+/).filter(Boolean);if(r.length!==2||!/^\d+$/.test(r[1])){s.say("Format: item qty");continue}const c=r[0].toLowerCase(),p=+r[1];if(!i.has(c)){s.say(`Sorry, we don't sell ${c}`);continue}const[f,k]=i.get(c);if(p>f){s.say(`Only ${f} ${c} left`);continue}i.set(c,[f-p,k]),o+=p*k,s.say(`Sold ${p} ${c} for ${p*k}`)}return s.say(`Total sales: ${o}`,"Stock saved"),{out:s.text(),lines:[...i].map(([n,[r,c]])=>`${n},${r},${c}`)}}const D=[["pen",10,40],["notebook",45,12],["eraser",5,6],["marker",30,3]];function j(a){const t=u(a),s=D.map(([l,o,n])=>({n:l,p:o,q:n}));for(;;){const l=t.ask(q);if(l.trim().toLowerCase()==="done")break;const o=l.split(/\s+/).filter(Boolean);if(o.length!==2||!/^\d+$/.test(o[1])){t.say("Format: item qty");continue}const n=s.find(c=>c.n===o[0].toLowerCase()),r=+o[1];n?r<=0?t.say("Quantity must be positive"):r>n.q?t.say(`Only ${n.q} ${n.n} left`):(n.q-=r,t.say(`Sold ${r} ${n.n} for ${r*n.p}`)):t.say(`Sorry, we don't sell ${o[0].toLowerCase()}`)}const i=s.filter(l=>l.q<5).map(l=>l.n).sort();return t.say(...s.map(l=>`${l.n}: ${l.q} @ ${l.p}`),`Stock value: ${s.reduce((l,o)=>l+o.q*o.p,0)}`,`Low stock: ${i.length?i.join(", "):"none"}`),t.text()}const H=`_p = Product("cap", 100, 6)
assert str(_p) == "cap: 6 @ 100", "str(Product) should look like cap: 6 @ 100 — got " + str(_p)
assert _p.sell(2) == 200 and _p.qty == 4, "sell(n) should reduce qty and return the cost."
assert _p.is_low() is True, "is_low() is True below 5."
try:
    _p.sell(10)
    raise AssertionError("sell() should raise OutOfStockError when there isn't enough.")
except OutOfStockError:
    pass
assert _p.qty == 4, "A refused sale must not change the stock."
try:
    _p.sell(0)
    raise AssertionError("sell(0) should raise ValueError.")
except ValueError:
    pass
_p.restock(10)
assert _p.qty == 14 and _p.is_low() is False, "restock(n) adds n."
_s = Shop()
_s.add(Product("a", 10, 2))
_s.add(Product("b", 5, 20))
assert _s.value() == 120, "value() = the sum of qty x price."
assert _s.low_stock() == ["a"], "low_stock() returns the names below 5, sorted."
assert _s.sell("b", 4) == 20, "Shop.sell(name, n) returns the cost."
try:
    _s.sell("zzz", 1)
    raise AssertionError("Shop.sell should raise KeyError for an unknown product.")
except KeyError:
    pass`,x=`Item,Category,Qty,Price,Reorder
pen,stationery,120,10,50
notebook,stationery,30,45,40
eraser,stationery,8,5,20
cola,drinks,48,40,24
juice,drinks,10,35,12
chips,snacks,60,20,30
biscuit,snacks,14,25,20
`,O=`Item,Category,Qty,Price,Reorder
ball,sports,5,350,6
racket,sports,9,1800,3
soap,home,40,30,20
towel,home,6,250,10
`;function _(a){const t=L(a),s=R(Q(t,"Category",o=>o.Qty*o.Price)),i=t.filter(o=>o.Qty<o.Reorder);return{out:[`Stock value: ${t.reduce((o,n)=>o+n.Qty*n.Price,0)}`,"Value by category:",...s.map(([o,n])=>`${o}: ${n}`),"Reorder now:",...i.map(o=>`${o.Item} (${o.Qty} left, reorder at ${o.Reorder})`)].join(`
`),post:I()+F("Stock value by category")+M(s,"_ax","bars (categories, most valuable first)")}}const d={cp1:{id:"cp1",kind:"make",title:"Checkpoint 1 — one item on the counter",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Item: "}),", ",e.jsx("code",{children:"Stock: "})," and ",e.jsx("code",{children:"Price: "}),", print the menu line ",e.jsx("code",{children:"1 Sell  2 Restock  3 Stock  4 Quit"})," once, then loop on ",e.jsx("code",{children:"Choice: "}),". ",e.jsx("strong",{children:"1 Sell"}),": ask ",e.jsx("code",{children:"Quantity: "}),"; refuse 0 or less (",e.jsx("code",{children:"Quantity must be positive"}),") or more than the stock (",e.jsx("code",{children:"Only 4 notebook left"}),"); otherwise print ",e.jsx("code",{children:"Sold 5 notebook for 200"}),", and ",e.jsx("code",{children:"Low stock: 4 left"})," if fewer than 5 remain. ",e.jsx("strong",{children:"2 Restock"}),": ask ",e.jsx("code",{children:"Quantity: "})," (positive) and print ",e.jsx("code",{children:"Stock: 14"}),". ",e.jsx("strong",{children:"3"}),": ",e.jsx("code",{children:"notebook: 14 in stock"}),". ",e.jsx("strong",{children:"4"}),": ",e.jsx("code",{children:"Sold 8 items, revenue 320"})," and stop. Otherwise ",e.jsx("code",{children:"Unknown choice"}),"."]}),minLines:26,tests:[{inputs:["notebook","12","40","1","5","1","3","3","2","10","3","4"],expect:y(["notebook","12","40","1","5","1","3","3","2","10","3","4"])},{inputs:["pen","3","10","1","5","1","3","1","1","4"],expect:y(["pen","3","10","1","5","1","3","1","1","4"]),hidden:!0,why:"Selling more than the stock is refused — and selling the last ones leaves 0, which is low stock."},{inputs:["cap","20","100","9","1","0","2","-4","4"],expect:y(["cap","20","100","9","1","0","2","-4","4"]),hidden:!0,why:"Unknown choices, and quantities of 0 or less for both sell and restock."}],requires:[{node:"While"},{node:"If"}],hints:["Keep stock, sold and revenue in variables; while True: … break on 4","Sell: if qty <= 0 … elif qty > stock … else …",'if stock < 5: print(f"Low stock: {stock} left")'],solution:`item = input("Item: ")
stock = int(input("Stock: "))
price = int(input("Price: "))
print("1 Sell  2 Restock  3 Stock  4 Quit")
sold = 0
revenue = 0
while True:
    choice = input("Choice: ")
    if choice == "1":
        qty = int(input("Quantity: "))
        if qty <= 0:
            print("Quantity must be positive")
        elif qty > stock:
            print(f"Only {stock} {item} left")
        else:
            stock -= qty
            sold += qty
            revenue += qty * price
            print(f"Sold {qty} {item} for {qty * price}")
            if stock < 5:
                print(f"Low stock: {stock} left")
    elif choice == "2":
        qty = int(input("Quantity: "))
        if qty <= 0:
            print("Quantity must be positive")
        else:
            stock += qty
            print(f"Stock: {stock}")
    elif choice == "3":
        print(f"{item}: {stock} in stock")
    elif choice == "4":
        print(f"Sold {sold} items, revenue {revenue}")
        break
    else:
        print("Unknown choice")`},cp2:{id:"cp2",kind:"make",title:"Checkpoint 2 — the whole shop and a bill",task:e.jsxs(e.Fragment,{children:["The shop's stock and prices are two dictionaries (already typed for you). Read orders like ",e.jsx("code",{children:"pen 3"})," with ",e.jsx("code",{children:"Order (item qty, or done): "})," until ",e.jsx("code",{children:"done"}),": bad format → ",e.jsx("code",{children:"Format: item qty"}),"; unknown item → ",e.jsx("code",{children:"Sorry, we don't sell pencil"}),"; too many → ",e.jsx("code",{children:"Only 3 marker left"}),"; otherwise reduce the stock and add an ",e.jsx("code",{children:"(item, qty, price)"})," tuple to the bill. Then print ",e.jsx("code",{children:"BILL"})," and one aligned line per purchase from your function ",e.jsx("code",{children:"bill_line(item, qty, price)"})," — item left in 10, qty right in 3, price right in 3, cost right in 5: ",e.jsx("code",{children:"pen         3 x  10 =    30"})," — and ",e.jsx("code",{children:"Total: 145"})," (or ",e.jsx("code",{children:"Nothing bought"}),"). Last, if any item has fewer than 5 left: ",e.jsx("code",{children:"Low stock: eraser (1), marker (3)"}),", alphabetical."]}),starter:S,minLines:26,tests:[{inputs:["pen 3","notebook 2","eraser 5","done"],expect:w(["pen 3","notebook 2","eraser 5","done"])},{inputs:["pencil 2","marker 4","Marker 2","pen x","done"],expect:w(["pencil 2","marker 4","Marker 2","pen x","done"]),hidden:!0,why:"Unknown items, too many, a capitalised item name and a bad quantity — all handled."},{inputs:["done"],expect:w(["done"]),hidden:!0,why:"No purchases: Nothing bought — but the low-stock line still appears."}],post:'assert bill_line("pen", 3, 10) == "pen         3 x  10 =    30", "bill_line should return the aligned line: f\\"{item:<10}{qty:>3} x {price:>3} = {qty * price:>5}\\""',requires:[{node:"FunctionDef"},{node:"JoinedStr"}],hints:['def bill_line(item, qty, price): return f"{item:<10}{qty:>3} x {price:>3} = {qty * price:>5}"',"if item not in stock: … elif qty > stock[item]: … else: …",'low = sorted(k for k in stock if stock[k] < 5) — then ", ".join(f"{k} ({stock[k]})" for k in low)'],solution:S+`def bill_line(item, qty, price):
    return f"{item:<10}{qty:>3} x {price:>3} = {qty * price:>5}"

bill = []
while True:
    line = input("Order (item qty, or done): ")
    if line.strip().lower() == "done":
        break
    parts = line.split()
    if len(parts) != 2 or not parts[1].isdigit():
        print("Format: item qty")
        continue
    item, qty = parts[0].lower(), int(parts[1])
    if item not in stock:
        print(f"Sorry, we don't sell {item}")
    elif qty > stock[item]:
        print(f"Only {stock[item]} {item} left")
    else:
        stock[item] -= qty
        bill.append((item, qty, prices[item]))

if not bill:
    print("Nothing bought")
else:
    print("BILL")
    for item, qty, price in bill:
        print(bill_line(item, qty, price))
    print(f"Total: {sum(q * p for _, q, p in bill)}")

low = sorted(k for k in stock if stock[k] < 5)
if low:
    print("Low stock: " + ", ".join(f"{k} ({stock[k]})" for k in low))`},cp3:(()=>{const a=b(`pen,40,10
notebook,12,45
eraser,6,5
`,["pen 3","eraser 7","eraser 6","done"]),t=b(null,[]),s=b(`pen,40,10
bad
bag,x,200
mug,5,120
`,["mug 2","cup 1","mug two","done"]);return{id:"cp3",kind:"make",title:"Checkpoint 3 — the stock file",task:e.jsxs(e.Fragment,{children:["The stock now lives in ",e.jsx("code",{children:"stock.csv"}),": ",e.jsx("code",{children:"item,qty,price"})," per line. Load it into dictionaries: print ",e.jsx("code",{children:"Loaded 3 products"})," and, if any lines were broken, ",e.jsx("code",{children:"Skipped 2 bad line(s)"}),". If the file is missing, print ",e.jsx("code",{children:"No stock file"})," and do nothing else. Take orders like checkpoint 2, printing ",e.jsx("code",{children:"Sold 3 pen for 30"})," for each sale. Write your own ",e.jsx("code",{children:"OutOfStockError"}),", raised by a ",e.jsx("code",{children:"sell(stock, item, qty)"})," function and caught → ",e.jsx("code",{children:"Only 6 eraser left"}),". At ",e.jsx("code",{children:"done"}),", print ",e.jsx("code",{children:"Total sales: 60"}),", save the updated stock back to stock.csv (same format, same order) and print ",e.jsx("code",{children:"Stock saved"}),"."]}),minLines:34,tests:[{setup:h({"stock.csv":`pen,40,10
notebook,12,45
eraser,6,5
`}),inputs:["pen 3","eraser 7","eraser 6","done"],expect:a.out,post:v("stock.csv",a.lines,"stock.csv should hold the updated quantities, one item,qty,price per line.")},{setup:h({"stock.csv":null}),inputs:[],expect:t.out,hidden:!0,why:"With no stock.csv there is nothing to sell: print No stock file and stop (don't ask for orders)."},{setup:h({"stock.csv":`pen,40,10
bad
bag,x,200
mug,5,120
`}),inputs:["mug 2","cup 1","mug two","done"],expect:s.out,post:v("stock.csv",s.lines),hidden:!0,why:"Skip the file's broken lines (and don't save them back)."}],requires:[{node:"ClassDef",msg:"Define class OutOfStockError(Exception)."},{node:"Raise"},{node:"Try",min:2},{node:"With",min:2}],hints:["Two dicts: stock[item] = qty and prices[item] = price, filled while reading the file","def sell(stock, item, qty): if qty > stock[item]: raise OutOfStockError(item) …",'Wrap the whole shop in: try: … load … except FileNotFoundError: print("No stock file") — or load first and only continue if it worked'],solution:`class OutOfStockError(Exception):
    pass

def load(path):
    stock, prices, bad = {}, {}, 0
    with open(path) as f:
        for line in f:
            if not line.strip():
                continue
            try:
                item, qty, price = line.strip().split(",")
                stock[item] = int(qty)
                prices[item] = int(price)
            except ValueError:
                bad += 1
    print(f"Loaded {len(stock)} products")
    if bad:
        print(f"Skipped {bad} bad line(s)")
    return stock, prices

def sell(stock, item, qty):
    if qty > stock[item]:
        raise OutOfStockError(item)
    stock[item] -= qty

try:
    stock, prices = load("stock.csv")
except FileNotFoundError:
    print("No stock file")
else:
    sales = 0
    while True:
        line = input("Order (item qty, or done): ")
        if line.strip().lower() == "done":
            break
        parts = line.split()
        if len(parts) != 2 or not parts[1].isdigit():
            print("Format: item qty")
            continue
        item, qty = parts[0].lower(), int(parts[1])
        if item not in stock:
            print(f"Sorry, we don't sell {item}")
            continue
        try:
            sell(stock, item, qty)
        except OutOfStockError:
            print(f"Only {stock[item]} {item} left")
        else:
            sales += qty * prices[item]
            print(f"Sold {qty} {item} for {qty * prices[item]}")
    print(f"Total sales: {sales}")
    with open("stock.csv", "w") as f:
        for item in stock:
            f.write(f"{item},{stock[item]},{prices[item]}\\n")
    print("Stock saved")`}})(),cp4:{id:"cp4",kind:"make",title:"Checkpoint 4 — Product and Shop classes",task:e.jsxs(e.Fragment,{children:["Write ",e.jsx("code",{children:"OutOfStockError"})," and two classes. ",e.jsx("code",{children:"Product(name, price, qty)"}),": ",e.jsx("code",{children:"sell(n)"})," returns the cost, raising ",e.jsx("code",{children:"ValueError"})," for n ≤ 0 and ",e.jsx("code",{children:"OutOfStockError"})," if there aren't enough (stock unchanged); ",e.jsx("code",{children:"restock(n)"}),"; ",e.jsx("code",{children:"is_low()"})," (below 5); ",e.jsx("code",{children:"__str__"})," → ",e.jsx("code",{children:"pen: 37 @ 10"}),". ",e.jsx("code",{children:"Shop()"}),": ",e.jsx("code",{children:"add(product)"}),", ",e.jsx("code",{children:"sell(name, n)"})," (raises ",e.jsx("code",{children:"KeyError"})," for an unknown name), ",e.jsx("code",{children:"value()"}),", ",e.jsx("code",{children:"low_stock()"})," (sorted names below 5). Main: a shop with pen 10/40, notebook 45/12, eraser 5/6, marker 30/3 (price/qty); orders like checkpoint 2 with the same messages; then every product, ",e.jsx("code",{children:"Stock value: 1020"})," and ",e.jsx("code",{children:"Low stock: eraser, marker"})," (or ",e.jsx("code",{children:"none"}),"). Hidden checks test your classes directly."]}),minLines:44,tests:[{inputs:["pen 3","eraser 7","eraser 2","done"],expect:j(["pen 3","eraser 7","eraser 2","done"])},{inputs:["mug 1","marker 0","notebook x","notebook 12","done"],expect:j(["mug 1","marker 0","notebook x","notebook 12","done"]),hidden:!0,why:"Unknown product (KeyError), a quantity of 0 (ValueError) and selling a whole stock."}],post:H,requires:[{node:"ClassDef",min:3}],hints:["Product.sell: if n <= 0: raise ValueError(...); if n > self.qty: raise OutOfStockError(self.name)","Shop keeps self.products = {} keyed by name; sell(name, n) does self.products[name].sell(n) — a missing name raises KeyError by itself",'Main: try: cost = shop.sell(item, qty) except KeyError: … except ValueError: print("Quantity must be positive") except OutOfStockError: …'],solution:`class OutOfStockError(Exception):
    pass

class Product:
    def __init__(self, name, price, qty):
        self.name = name
        self.price = price
        self.qty = qty

    def sell(self, n):
        if n <= 0:
            raise ValueError("quantity must be positive")
        if n > self.qty:
            raise OutOfStockError(self.name)
        self.qty -= n
        return n * self.price

    def restock(self, n):
        self.qty += n

    def is_low(self):
        return self.qty < 5

    def __str__(self):
        return f"{self.name}: {self.qty} @ {self.price}"

class Shop:
    def __init__(self):
        self.products = {}

    def add(self, product):
        self.products[product.name] = product

    def sell(self, name, n):
        return self.products[name].sell(n)

    def value(self):
        return sum(p.qty * p.price for p in self.products.values())

    def low_stock(self):
        return sorted(p.name for p in self.products.values() if p.is_low())

shop = Shop()
for name, price, qty in [("pen", 10, 40), ("notebook", 45, 12), ("eraser", 5, 6), ("marker", 30, 3)]:
    shop.add(Product(name, price, qty))

while True:
    line = input("Order (item qty, or done): ")
    if line.strip().lower() == "done":
        break
    parts = line.split()
    if len(parts) != 2 or not parts[1].isdigit():
        print("Format: item qty")
        continue
    item, qty = parts[0].lower(), int(parts[1])
    try:
        cost = shop.sell(item, qty)
    except KeyError:
        print(f"Sorry, we don't sell {item}")
    except ValueError:
        print("Quantity must be positive")
    except OutOfStockError:
        print(f"Only {shop.products[item].qty} {item} left")
    else:
        print(f"Sold {qty} {item} for {cost}")

for p in shop.products.values():
    print(p)
print(f"Stock value: {shop.value()}")
low = shop.low_stock()
print(f"Low stock: {', '.join(low) if low else 'none'}")`},cp5:(()=>{const a=_(x),t=_(O);return{id:"cp5",kind:"make",title:"Checkpoint 5 — what's on the shelves?",timeoutMs:3e4,task:e.jsxs(e.Fragment,{children:["The shop's ",e.jsx("code",{children:"inventory.csv"})," has Item, Category, Qty, Price and a Reorder level. With pandas, add a ",e.jsx("code",{children:"Value"})," column (Qty × Price) and print ",e.jsx("code",{children:"Stock value: 6410"}),"; then ",e.jsx("code",{children:"Value by category:"})," with each category's value, most valuable first; then ",e.jsx("code",{children:"Reorder now:"})," and every item whose Qty is below its Reorder level, in file order, as ",e.jsx("code",{children:"eraser (8 left, reorder at 20)"}),". Draw value by category as a bar chart, most valuable first, titled ",e.jsx("code",{children:"Stock value by category"}),". Hidden tests use another shop."]}),show:x,showLabel:"inventory.csv — ALREADY IN THE FOLDER",minLines:14,tests:[{setup:h({"inventory.csv":x}),expect:a.out,post:a.post},{setup:h({"inventory.csv":O}),expect:t.out,post:t.post,hidden:!0,why:"Another shop: compute everything from the DataFrame."}],requires:[{call:"read_csv"},{call:"groupby"},{call:"bar"}],hints:['df["Value"] = df["Qty"] * df["Price"]','low = df[df["Qty"] < df["Reorder"]] — then loop with low.iterrows() or zip the columns',`for _, r in low.iterrows(): print(f"{r['Item']} ({r['Qty']} left, reorder at {r['Reorder']})")`],solution:`import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("inventory.csv")
df["Value"] = df["Qty"] * df["Price"]
print(f"Stock value: {df['Value'].sum()}")

cats = df.groupby("Category")["Value"].sum().sort_values(ascending=False)
print("Value by category:")
for cat, value in cats.items():
    print(f"{cat}: {value}")

print("Reorder now:")
low = df[df["Qty"] < df["Reorder"]]
for _, r in low.iterrows():
    print(f"{r['Item']} ({r['Qty']} left, reorder at {r['Reorder']})")

plt.bar(cats.index, cats.values, color="teal")
plt.title("Stock value by category")
plt.ylabel("Value")
plt.show()`}})()},J=d,U=[{q:"Why keep stock in a dictionary rather than separate variables?",options:["It's faster to type","One lookup by name works for any item — even ones added later","Variables can't hold numbers","Dictionaries sort themselves"],answer:1,explain:"stock[item] replaces a long if/elif over every product."},{q:'f"{qty:>3}" means…',options:["qty times 3","qty right-aligned in 3 characters","the first 3 digits","qty plus 3 spaces"],answer:1,explain:"< left, > right, ^ centre (Unit 4.5)."},{q:"A sale of 7 erasers when 6 are left should…",options:["Sell 6","Raise OutOfStockError and leave the stock unchanged","Set the stock to -1","Crash"],answer:1,explain:"Check before changing anything."},{q:"Which items need reordering?",options:["Qty above the reorder level","Qty below the reorder level","The most valuable","All of them"],answer:1,explain:'df[df["Qty"] < df["Reorder"]]'}];function X(a){const t=[{label:"1 · Core",kicker:"CHECKPOINT 1 · AFTER M4–M6",title:"One item on the counter",blocks:[e.jsxs(E,{children:["A canteen or a stationery shop runs on one question: ",e.jsx("em",{children:"what have we got, and what did we sell?"})," You'll build its manager in five checkpoints — each a complete program."]}),e.jsx(P,{color:g.orange,rows:[["1 · Core logic","M4–M6","one item: sell, restock, low-stock warning"],["2 · Organise it","M7–M8","the whole shop in dicts; an aligned bill from a function"],["3 · Make it survive","M9","stock file loaded and saved; OutOfStockError"],["4 · Model it","M10","Product and Shop classes"],["5 · Analyse & chart","M12–M13","stock value by category; reorder list; chart"]]}),d.cp1]},{label:"2 · Organise",kicker:"CHECKPOINT 2 · AFTER M7–M8",title:"The whole shop and a bill",blocks:[d.cp2]},{label:"3 · Survive",kicker:"CHECKPOINT 3 · AFTER M9",title:"The stock file",blocks:[d.cp3]},{label:"4 · Model",kicker:"CHECKPOINT 4 · AFTER M10",title:"Product and Shop classes",blocks:[d.cp4,e.jsx($,{children:"The checkpoint 3 program and this one do the same job — but now each product guards its own stock, and the main program just asks."})]},{label:"5 · Analyse",kicker:"CHECKPOINT 5 · AFTER M12–M13",title:"What's on the shelves?",blocks:[d.cp5,e.jsx(C,{color:g.blue,icon:"🎨",children:"Make it yours: a library lending desk, a lab equipment store or the sports-room kit register follow the same five steps. Or bring your own idea of similar size to your teacher."})]}];return e.jsx(T,{...a,unitId:"UnitMP_SHOP",crumb:"MINI-PROJECT › TRACK B",title:"Shop Inventory Manager",sections:t,quiz:U,next:{title:"Track complete!",text:"From one item on a counter to a whole shop's analysis. Try another track, or head to the Finish Line."}})}export{J as EXERCISES,X as default};
