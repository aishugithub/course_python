// Mini-Project Track B — Shop Inventory Manager (new, typing-first)
// A canteen / stationery shop, five checkpoints: 1 one item, sell / restock
// menu (M4–6) → 2 a whole shop in dicts, an aligned bill (M7–8) → 3 stock
// file + OutOfStockError (M9) → 4 Product and Shop classes (M10) →
// 5 inventory analysis + chart (M12–13). Simulators produce expected output.

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";
import { files, fileIs, FIG, titleIs, barsAre, Console, parseCsv, sumBy, byValueDesc, Roadmap } from "../kit/project.jsx";

// ── CP1: one item ──
function cp1(inputs) {
  const c = Console(inputs);
  const item = c.ask("Item: "); let stock = +c.ask("Stock: "); const price = +c.ask("Price: ");
  c.say("1 Sell  2 Restock  3 Stock  4 Quit");
  let sold = 0, revenue = 0;
  for (;;) {
    const ch = c.ask("Choice: ");
    if (ch === "1") {
      const q = +c.ask("Quantity: ");
      if (q <= 0) c.say("Quantity must be positive");
      else if (q > stock) c.say(`Only ${stock} ${item} left`);
      else { stock -= q; sold += q; revenue += q * price; c.say(`Sold ${q} ${item} for ${q * price}`); if (stock < 5) c.say(`Low stock: ${stock} left`); }
    } else if (ch === "2") {
      const q = +c.ask("Quantity: ");
      if (q <= 0) c.say("Quantity must be positive"); else { stock += q; c.say(`Stock: ${stock}`); }
    } else if (ch === "3") c.say(`${item}: ${stock} in stock`);
    else if (ch === "4") { c.say(`Sold ${sold} items, revenue ${revenue}`); break; }
    else c.say("Unknown choice");
  }
  return c.text();
}

// ── CP2: the whole shop, a bill ──
const SHOP_STOCK = { pen: 40, notebook: 12, eraser: 6, marker: 3 };
const SHOP_PRICE = { pen: 10, notebook: 45, eraser: 5, marker: 30 };
const ORDER = "Order (item qty, or done): ";
const pad = (s, n) => String(s).padEnd(n), lpad = (s, n) => String(s).padStart(n);
const billLine = (item, q, p) => `${pad(item, 10)}${lpad(q, 3)} x ${lpad(p, 3)} = ${lpad(q * p, 5)}`;
function cp2(inputs) {
  const c = Console(inputs);
  const stock = { ...SHOP_STOCK }, bill = [];
  for (;;) {
    const line = c.ask(ORDER);
    if (line.trim().toLowerCase() === "done") break;
    const p = line.split(/\s+/).filter(Boolean);
    if (p.length !== 2 || !/^\d+$/.test(p[1])) { c.say("Format: item qty"); continue; }
    const item = p[0].toLowerCase(), q = +p[1];
    if (!(item in stock)) c.say(`Sorry, we don't sell ${item}`);
    else if (q > stock[item]) c.say(`Only ${stock[item]} ${item} left`);
    else { stock[item] -= q; bill.push([item, q, SHOP_PRICE[item]]); }
  }
  if (!bill.length) c.say("Nothing bought");
  else { c.say("BILL", ...bill.map(([i, q, pr]) => billLine(i, q, pr)), `Total: ${bill.reduce((s, [, q, pr]) => s + q * pr, 0)}`); }
  const low = Object.keys(stock).filter((k) => stock[k] < 5).sort();
  if (low.length) c.say(`Low stock: ${low.map((k) => `${k} (${stock[k]})`).join(", ")}`);
  return c.text();
}
const CP2_STARTER = 'stock = {"pen": 40, "notebook": 12, "eraser": 6, "marker": 3}\nprices = {"pen": 10, "notebook": 45, "eraser": 5, "marker": 30}\n\n';

// ── CP3: the stock file ──
function cp3(fileText, inputs) {
  const c = Console(inputs);
  if (fileText === null) { c.say("No stock file"); return { out: c.text(), lines: null }; }
  const stock = new Map(); let bad = 0;
  fileText.split("\n").filter((l) => l.trim()).forEach((l) => { const p = l.trim().split(","); if (p.length === 3 && /^\d+$/.test(p[1]) && /^\d+$/.test(p[2])) stock.set(p[0], [+p[1], +p[2]]); else bad++; });
  c.say(`Loaded ${stock.size} products`); if (bad) c.say(`Skipped ${bad} bad line(s)`);
  let sales = 0;
  for (;;) {
    const line = c.ask(ORDER);
    if (line.trim().toLowerCase() === "done") break;
    const p = line.split(/\s+/).filter(Boolean);
    if (p.length !== 2 || !/^\d+$/.test(p[1])) { c.say("Format: item qty"); continue; }
    const item = p[0].toLowerCase(), q = +p[1];
    if (!stock.has(item)) { c.say(`Sorry, we don't sell ${item}`); continue; }
    const [have, pr] = stock.get(item);
    if (q > have) { c.say(`Only ${have} ${item} left`); continue; }
    stock.set(item, [have - q, pr]); sales += q * pr; c.say(`Sold ${q} ${item} for ${q * pr}`);
  }
  c.say(`Total sales: ${sales}`, "Stock saved");
  return { out: c.text(), lines: [...stock].map(([k, [q, pr]]) => `${k},${q},${pr}`) };
}

// ── CP4: classes ──
const CP4_PRODUCTS = [["pen", 10, 40], ["notebook", 45, 12], ["eraser", 5, 6], ["marker", 30, 3]];
function cp4(inputs) {
  const c = Console(inputs);
  const prods = CP4_PRODUCTS.map(([n, p, q]) => ({ n, p, q }));
  for (;;) {
    const line = c.ask(ORDER);
    if (line.trim().toLowerCase() === "done") break;
    const parts = line.split(/\s+/).filter(Boolean);
    if (parts.length !== 2 || !/^\d+$/.test(parts[1])) { c.say("Format: item qty"); continue; }
    const pr = prods.find((x) => x.n === parts[0].toLowerCase()), q = +parts[1];
    if (!pr) c.say(`Sorry, we don't sell ${parts[0].toLowerCase()}`);
    else if (q <= 0) c.say("Quantity must be positive");
    else if (q > pr.q) c.say(`Only ${pr.q} ${pr.n} left`);
    else { pr.q -= q; c.say(`Sold ${q} ${pr.n} for ${q * pr.p}`); }
  }
  const low = prods.filter((x) => x.q < 5).map((x) => x.n).sort();
  c.say(...prods.map((x) => `${x.n}: ${x.q} @ ${x.p}`), `Stock value: ${prods.reduce((s, x) => s + x.q * x.p, 0)}`, `Low stock: ${low.length ? low.join(", ") : "none"}`);
  return c.text();
}
const CP4_POST = `_p = Product("cap", 100, 6)
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
    pass`;

// ── CP5: inventory analysis ──
const INV = "Item,Category,Qty,Price,Reorder\npen,stationery,120,10,50\nnotebook,stationery,30,45,40\neraser,stationery,8,5,20\ncola,drinks,48,40,24\njuice,drinks,10,35,12\nchips,snacks,60,20,30\nbiscuit,snacks,14,25,20\n";
const INV2 = "Item,Category,Qty,Price,Reorder\nball,sports,5,350,6\nracket,sports,9,1800,3\nsoap,home,40,30,20\ntowel,home,6,250,10\n";
function cp5(csv) {
  const rows = parseCsv(csv);
  const cats = byValueDesc(sumBy(rows, "Category", (r) => r.Qty * r.Price));
  const re = rows.filter((r) => r.Qty < r.Reorder);
  const out = [`Stock value: ${rows.reduce((s, r) => s + r.Qty * r.Price, 0)}`, "Value by category:", ...cats.map(([k, v]) => `${k}: ${v}`), "Reorder now:", ...re.map((r) => `${r.Item} (${r.Qty} left, reorder at ${r.Reorder})`)].join("\n");
  return { out, post: FIG() + titleIs("Stock value by category") + barsAre(cats, "_ax", "bars (categories, most valuable first)") };
}

const EX = {
  cp1: {
    id: "cp1", kind: "make", title: "Checkpoint 1 — one item on the counter",
    task: <>Ask <code>Item: </code>, <code>Stock: </code> and <code>Price: </code>, print the menu line <code>1 Sell  2 Restock  3 Stock  4 Quit</code> once, then loop on <code>Choice: </code>. <strong>1 Sell</strong>: ask <code>Quantity: </code>; refuse 0 or less (<code>Quantity must be positive</code>) or more than the stock (<code>Only 4 notebook left</code>); otherwise print <code>Sold 5 notebook for 200</code>, and <code>Low stock: 4 left</code> if fewer than 5 remain. <strong>2 Restock</strong>: ask <code>Quantity: </code> (positive) and print <code>Stock: 14</code>. <strong>3</strong>: <code>notebook: 14 in stock</code>. <strong>4</strong>: <code>Sold 8 items, revenue 320</code> and stop. Otherwise <code>Unknown choice</code>.</>,
    minLines: 26,
    tests: [
      { inputs: ["notebook", "12", "40", "1", "5", "1", "3", "3", "2", "10", "3", "4"], expect: cp1(["notebook", "12", "40", "1", "5", "1", "3", "3", "2", "10", "3", "4"]) },
      { inputs: ["pen", "3", "10", "1", "5", "1", "3", "1", "1", "4"], expect: cp1(["pen", "3", "10", "1", "5", "1", "3", "1", "1", "4"]), hidden: true, why: "Selling more than the stock is refused — and selling the last ones leaves 0, which is low stock." },
      { inputs: ["cap", "20", "100", "9", "1", "0", "2", "-4", "4"], expect: cp1(["cap", "20", "100", "9", "1", "0", "2", "-4", "4"]), hidden: true, why: "Unknown choices, and quantities of 0 or less for both sell and restock." },
    ],
    requires: [{ node: "While" }, { node: "If" }],
    hints: ["Keep stock, sold and revenue in variables; while True: … break on 4", "Sell: if qty <= 0 … elif qty > stock … else …", 'if stock < 5: print(f"Low stock: {stock} left")'],
    solution: 'item = input("Item: ")\nstock = int(input("Stock: "))\nprice = int(input("Price: "))\nprint("1 Sell  2 Restock  3 Stock  4 Quit")\nsold = 0\nrevenue = 0\nwhile True:\n    choice = input("Choice: ")\n    if choice == "1":\n        qty = int(input("Quantity: "))\n        if qty <= 0:\n            print("Quantity must be positive")\n        elif qty > stock:\n            print(f"Only {stock} {item} left")\n        else:\n            stock -= qty\n            sold += qty\n            revenue += qty * price\n            print(f"Sold {qty} {item} for {qty * price}")\n            if stock < 5:\n                print(f"Low stock: {stock} left")\n    elif choice == "2":\n        qty = int(input("Quantity: "))\n        if qty <= 0:\n            print("Quantity must be positive")\n        else:\n            stock += qty\n            print(f"Stock: {stock}")\n    elif choice == "3":\n        print(f"{item}: {stock} in stock")\n    elif choice == "4":\n        print(f"Sold {sold} items, revenue {revenue}")\n        break\n    else:\n        print("Unknown choice")',
  },
  cp2: {
    id: "cp2", kind: "make", title: "Checkpoint 2 — the whole shop and a bill",
    task: <>The shop's stock and prices are two dictionaries (already typed for you). Read orders like <code>pen 3</code> with <code>Order (item qty, or done): </code> until <code>done</code>: bad format → <code>Format: item qty</code>; unknown item → <code>Sorry, we don't sell pencil</code>; too many → <code>Only 3 marker left</code>; otherwise reduce the stock and add an <code>(item, qty, price)</code> tuple to the bill. Then print <code>BILL</code> and one aligned line per purchase from your function <code>bill_line(item, qty, price)</code> — item left in 10, qty right in 3, price right in 3, cost right in 5: <code>pen         3 x  10 =    30</code> — and <code>Total: 145</code> (or <code>Nothing bought</code>). Last, if any item has fewer than 5 left: <code>Low stock: eraser (1), marker (3)</code>, alphabetical.</>,
    starter: CP2_STARTER,
    minLines: 26,
    tests: [
      { inputs: ["pen 3", "notebook 2", "eraser 5", "done"], expect: cp2(["pen 3", "notebook 2", "eraser 5", "done"]) },
      { inputs: ["pencil 2", "marker 4", "Marker 2", "pen x", "done"], expect: cp2(["pencil 2", "marker 4", "Marker 2", "pen x", "done"]), hidden: true, why: "Unknown items, too many, a capitalised item name and a bad quantity — all handled." },
      { inputs: ["done"], expect: cp2(["done"]), hidden: true, why: "No purchases: Nothing bought — but the low-stock line still appears." },
    ],
    post: 'assert bill_line("pen", 3, 10) == "pen         3 x  10 =    30", "bill_line should return the aligned line: f\\"{item:<10}{qty:>3} x {price:>3} = {qty * price:>5}\\""',
    requires: [{ node: "FunctionDef" }, { node: "JoinedStr" }],
    hints: ['def bill_line(item, qty, price): return f"{item:<10}{qty:>3} x {price:>3} = {qty * price:>5}"', "if item not in stock: … elif qty > stock[item]: … else: …", 'low = sorted(k for k in stock if stock[k] < 5) — then ", ".join(f"{k} ({stock[k]})" for k in low)'],
    solution: CP2_STARTER + 'def bill_line(item, qty, price):\n    return f"{item:<10}{qty:>3} x {price:>3} = {qty * price:>5}"\n\nbill = []\nwhile True:\n    line = input("Order (item qty, or done): ")\n    if line.strip().lower() == "done":\n        break\n    parts = line.split()\n    if len(parts) != 2 or not parts[1].isdigit():\n        print("Format: item qty")\n        continue\n    item, qty = parts[0].lower(), int(parts[1])\n    if item not in stock:\n        print(f"Sorry, we don\'t sell {item}")\n    elif qty > stock[item]:\n        print(f"Only {stock[item]} {item} left")\n    else:\n        stock[item] -= qty\n        bill.append((item, qty, prices[item]))\n\nif not bill:\n    print("Nothing bought")\nelse:\n    print("BILL")\n    for item, qty, price in bill:\n        print(bill_line(item, qty, price))\n    print(f"Total: {sum(q * p for _, q, p in bill)}")\n\nlow = sorted(k for k in stock if stock[k] < 5)\nif low:\n    print("Low stock: " + ", ".join(f"{k} ({stock[k]})" for k in low))',
  },
  cp3: (() => {
    const v = cp3("pen,40,10\nnotebook,12,45\neraser,6,5\n", ["pen 3", "eraser 7", "eraser 6", "done"]);
    const h1 = cp3(null, []);
    const h2 = cp3("pen,40,10\nbad\nbag,x,200\nmug,5,120\n", ["mug 2", "cup 1", "mug two", "done"]);
    return {
      id: "cp3", kind: "make", title: "Checkpoint 3 — the stock file",
      task: <>The stock now lives in <code>stock.csv</code>: <code>item,qty,price</code> per line. Load it into dictionaries: print <code>Loaded 3 products</code> and, if any lines were broken, <code>Skipped 2 bad line(s)</code>. If the file is missing, print <code>No stock file</code> and do nothing else. Take orders like checkpoint 2, printing <code>Sold 3 pen for 30</code> for each sale. Write your own <code>OutOfStockError</code>, raised by a <code>sell(stock, item, qty)</code> function and caught → <code>Only 6 eraser left</code>. At <code>done</code>, print <code>Total sales: 60</code>, save the updated stock back to stock.csv (same format, same order) and print <code>Stock saved</code>.</>,
      minLines: 34,
      tests: [
        { setup: files({ "stock.csv": "pen,40,10\nnotebook,12,45\neraser,6,5\n" }), inputs: ["pen 3", "eraser 7", "eraser 6", "done"], expect: v.out, post: fileIs("stock.csv", v.lines, "stock.csv should hold the updated quantities, one item,qty,price per line.") },
        { setup: files({ "stock.csv": null }), inputs: [], expect: h1.out, hidden: true, why: "With no stock.csv there is nothing to sell: print No stock file and stop (don't ask for orders)." },
        { setup: files({ "stock.csv": "pen,40,10\nbad\nbag,x,200\nmug,5,120\n" }), inputs: ["mug 2", "cup 1", "mug two", "done"], expect: h2.out, post: fileIs("stock.csv", h2.lines), hidden: true, why: "Skip the file's broken lines (and don't save them back)." },
      ],
      requires: [{ node: "ClassDef", msg: "Define class OutOfStockError(Exception)." }, { node: "Raise" }, { node: "Try", min: 2 }, { node: "With", min: 2 }],
      hints: ["Two dicts: stock[item] = qty and prices[item] = price, filled while reading the file", "def sell(stock, item, qty): if qty > stock[item]: raise OutOfStockError(item) …", "Wrap the whole shop in: try: … load … except FileNotFoundError: print(\"No stock file\") — or load first and only continue if it worked"],
      solution: 'class OutOfStockError(Exception):\n    pass\n\ndef load(path):\n    stock, prices, bad = {}, {}, 0\n    with open(path) as f:\n        for line in f:\n            if not line.strip():\n                continue\n            try:\n                item, qty, price = line.strip().split(",")\n                stock[item] = int(qty)\n                prices[item] = int(price)\n            except ValueError:\n                bad += 1\n    print(f"Loaded {len(stock)} products")\n    if bad:\n        print(f"Skipped {bad} bad line(s)")\n    return stock, prices\n\ndef sell(stock, item, qty):\n    if qty > stock[item]:\n        raise OutOfStockError(item)\n    stock[item] -= qty\n\ntry:\n    stock, prices = load("stock.csv")\nexcept FileNotFoundError:\n    print("No stock file")\nelse:\n    sales = 0\n    while True:\n        line = input("Order (item qty, or done): ")\n        if line.strip().lower() == "done":\n            break\n        parts = line.split()\n        if len(parts) != 2 or not parts[1].isdigit():\n            print("Format: item qty")\n            continue\n        item, qty = parts[0].lower(), int(parts[1])\n        if item not in stock:\n            print(f"Sorry, we don\'t sell {item}")\n            continue\n        try:\n            sell(stock, item, qty)\n        except OutOfStockError:\n            print(f"Only {stock[item]} {item} left")\n        else:\n            sales += qty * prices[item]\n            print(f"Sold {qty} {item} for {qty * prices[item]}")\n    print(f"Total sales: {sales}")\n    with open("stock.csv", "w") as f:\n        for item in stock:\n            f.write(f"{item},{stock[item]},{prices[item]}\\n")\n    print("Stock saved")',
    };
  })(),
  cp4: {
    id: "cp4", kind: "make", title: "Checkpoint 4 — Product and Shop classes",
    task: <>Write <code>OutOfStockError</code> and two classes. <code>Product(name, price, qty)</code>: <code>sell(n)</code> returns the cost, raising <code>ValueError</code> for n ≤ 0 and <code>OutOfStockError</code> if there aren't enough (stock unchanged); <code>restock(n)</code>; <code>is_low()</code> (below 5); <code>__str__</code> → <code>pen: 37 @ 10</code>. <code>Shop()</code>: <code>add(product)</code>, <code>sell(name, n)</code> (raises <code>KeyError</code> for an unknown name), <code>value()</code>, <code>low_stock()</code> (sorted names below 5). Main: a shop with pen 10/40, notebook 45/12, eraser 5/6, marker 30/3 (price/qty); orders like checkpoint 2 with the same messages; then every product, <code>Stock value: 1020</code> and <code>Low stock: eraser, marker</code> (or <code>none</code>). Hidden checks test your classes directly.</>,
    minLines: 44,
    tests: [
      { inputs: ["pen 3", "eraser 7", "eraser 2", "done"], expect: cp4(["pen 3", "eraser 7", "eraser 2", "done"]) },
      { inputs: ["mug 1", "marker 0", "notebook x", "notebook 12", "done"], expect: cp4(["mug 1", "marker 0", "notebook x", "notebook 12", "done"]), hidden: true, why: "Unknown product (KeyError), a quantity of 0 (ValueError) and selling a whole stock." },
    ],
    post: CP4_POST,
    requires: [{ node: "ClassDef", min: 3 }],
    hints: ["Product.sell: if n <= 0: raise ValueError(...); if n > self.qty: raise OutOfStockError(self.name)", "Shop keeps self.products = {} keyed by name; sell(name, n) does self.products[name].sell(n) — a missing name raises KeyError by itself", 'Main: try: cost = shop.sell(item, qty) except KeyError: … except ValueError: print("Quantity must be positive") except OutOfStockError: …'],
    solution: 'class OutOfStockError(Exception):\n    pass\n\nclass Product:\n    def __init__(self, name, price, qty):\n        self.name = name\n        self.price = price\n        self.qty = qty\n\n    def sell(self, n):\n        if n <= 0:\n            raise ValueError("quantity must be positive")\n        if n > self.qty:\n            raise OutOfStockError(self.name)\n        self.qty -= n\n        return n * self.price\n\n    def restock(self, n):\n        self.qty += n\n\n    def is_low(self):\n        return self.qty < 5\n\n    def __str__(self):\n        return f"{self.name}: {self.qty} @ {self.price}"\n\nclass Shop:\n    def __init__(self):\n        self.products = {}\n\n    def add(self, product):\n        self.products[product.name] = product\n\n    def sell(self, name, n):\n        return self.products[name].sell(n)\n\n    def value(self):\n        return sum(p.qty * p.price for p in self.products.values())\n\n    def low_stock(self):\n        return sorted(p.name for p in self.products.values() if p.is_low())\n\nshop = Shop()\nfor name, price, qty in [("pen", 10, 40), ("notebook", 45, 12), ("eraser", 5, 6), ("marker", 30, 3)]:\n    shop.add(Product(name, price, qty))\n\nwhile True:\n    line = input("Order (item qty, or done): ")\n    if line.strip().lower() == "done":\n        break\n    parts = line.split()\n    if len(parts) != 2 or not parts[1].isdigit():\n        print("Format: item qty")\n        continue\n    item, qty = parts[0].lower(), int(parts[1])\n    try:\n        cost = shop.sell(item, qty)\n    except KeyError:\n        print(f"Sorry, we don\'t sell {item}")\n    except ValueError:\n        print("Quantity must be positive")\n    except OutOfStockError:\n        print(f"Only {shop.products[item].qty} {item} left")\n    else:\n        print(f"Sold {qty} {item} for {cost}")\n\nfor p in shop.products.values():\n    print(p)\nprint(f"Stock value: {shop.value()}")\nlow = shop.low_stock()\nprint(f"Low stock: {\', \'.join(low) if low else \'none\'}")',
  },
  cp5: (() => {
    const a = cp5(INV), b = cp5(INV2);
    return {
      id: "cp5", kind: "make", title: "Checkpoint 5 — what's on the shelves?",
      timeoutMs: 30000,
      task: <>The shop's <code>inventory.csv</code> has Item, Category, Qty, Price and a Reorder level. With pandas, add a <code>Value</code> column (Qty × Price) and print <code>Stock value: 6410</code>; then <code>Value by category:</code> with each category's value, most valuable first; then <code>Reorder now:</code> and every item whose Qty is below its Reorder level, in file order, as <code>eraser (8 left, reorder at 20)</code>. Draw value by category as a bar chart, most valuable first, titled <code>Stock value by category</code>. Hidden tests use another shop.</>,
      show: INV, showLabel: "inventory.csv — ALREADY IN THE FOLDER",
      minLines: 14,
      tests: [
        { setup: files({ "inventory.csv": INV }), expect: a.out, post: a.post },
        { setup: files({ "inventory.csv": INV2 }), expect: b.out, post: b.post, hidden: true, why: "Another shop: compute everything from the DataFrame." },
      ],
      requires: [{ call: "read_csv" }, { call: "groupby" }, { call: "bar" }],
      hints: ['df["Value"] = df["Qty"] * df["Price"]', 'low = df[df["Qty"] < df["Reorder"]] — then loop with low.iterrows() or zip the columns', 'for _, r in low.iterrows(): print(f"{r[\'Item\']} ({r[\'Qty\']} left, reorder at {r[\'Reorder\']})")'],
      solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("inventory.csv")\ndf["Value"] = df["Qty"] * df["Price"]\nprint(f"Stock value: {df[\'Value\'].sum()}")\n\ncats = df.groupby("Category")["Value"].sum().sort_values(ascending=False)\nprint("Value by category:")\nfor cat, value in cats.items():\n    print(f"{cat}: {value}")\n\nprint("Reorder now:")\nlow = df[df["Qty"] < df["Reorder"]]\nfor _, r in low.iterrows():\n    print(f"{r[\'Item\']} ({r[\'Qty\']} left, reorder at {r[\'Reorder\']})")\n\nplt.bar(cats.index, cats.values, color="teal")\nplt.title("Stock value by category")\nplt.ylabel("Value")\nplt.show()',
    };
  })(),
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why keep stock in a dictionary rather than separate variables?", options: ["It's faster to type", "One lookup by name works for any item — even ones added later", "Variables can't hold numbers", "Dictionaries sort themselves"], answer: 1, explain: "stock[item] replaces a long if/elif over every product." },
  { q: "f\"{qty:>3}\" means…", options: ["qty times 3", "qty right-aligned in 3 characters", "the first 3 digits", "qty plus 3 spaces"], answer: 1, explain: "< left, > right, ^ centre (Unit 4.5)." },
  { q: "A sale of 7 erasers when 6 are left should…", options: ["Sell 6", "Raise OutOfStockError and leave the stock unchanged", "Set the stock to -1", "Crash"], answer: 1, explain: "Check before changing anything." },
  { q: "Which items need reordering?", options: ["Qty above the reorder level", "Qty below the reorder level", "The most valuable", "All of them"], answer: 1, explain: "df[df[\"Qty\"] < df[\"Reorder\"]]" },
];

export default function UnitMP_SHOP(props) {
  const sections = [
    { label: "1 · Core", kicker: "CHECKPOINT 1 · AFTER M4–M6", title: "One item on the counter", blocks: [
      <P>A canteen or a stationery shop runs on one question: <em>what have we got, and what did we sell?</em> You'll build its manager in five checkpoints — each a complete program.</P>,
      <Roadmap color={T.orange} rows={[["1 · Core logic", "M4–M6", "one item: sell, restock, low-stock warning"], ["2 · Organise it", "M7–M8", "the whole shop in dicts; an aligned bill from a function"], ["3 · Make it survive", "M9", "stock file loaded and saved; OutOfStockError"], ["4 · Model it", "M10", "Product and Shop classes"], ["5 · Analyse & chart", "M12–M13", "stock value by category; reorder list; chart"]]} />,
      EX.cp1,
    ] },
    { label: "2 · Organise", kicker: "CHECKPOINT 2 · AFTER M7–M8", title: "The whole shop and a bill", blocks: [EX.cp2] },
    { label: "3 · Survive", kicker: "CHECKPOINT 3 · AFTER M9", title: "The stock file", blocks: [EX.cp3] },
    { label: "4 · Model", kicker: "CHECKPOINT 4 · AFTER M10", title: "Product and Shop classes", blocks: [EX.cp4, <KeyIdea>The checkpoint 3 program and this one do the same job — but now each product guards its own stock, and the main program just asks.</KeyIdea>] },
    { label: "5 · Analyse", kicker: "CHECKPOINT 5 · AFTER M12–M13", title: "What's on the shelves?", blocks: [
      EX.cp5,
      <Note color={T.blue} icon="🎨">Make it yours: a library lending desk, a lab equipment store or the sports-room kit register follow the same five steps. Or bring your own idea of similar size to your teacher.</Note>,
    ] },
  ];
  return (
    <LessonShell {...props} unitId="UnitMP_SHOP" crumb="MINI-PROJECT › TRACK B" title="Shop Inventory Manager" sections={sections} quiz={QUIZ}
      next={{ title: "Track complete!", text: "From one item on a counter to a whole shop's analysis. Try another track, or head to the Finish Line." }} />
  );
}
