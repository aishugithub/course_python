import{j as e}from"./index-BQ9ta_BJ.js";import{P as _,K as w,N as S,T as m,L as k,a as R,t as j}from"./Lesson-DNKKUv9k.js";const l={revenue:`         Date        Item     Category  Qty  Price  Revenue
0  2026-01-05         Pen   Stationery   10     15      150
1  2026-01-07    Notebook   Stationery    5     60      300
2  2026-01-12  Headphones  Electronics    2   1200     2400
3  2026-01-20       Mouse  Electronics    3    450     1350
4  2026-02-02         Pen   Stationery   20     15      300
Orders: 12
Total revenue: 10855`,groupby:`Category
Electronics    5400
Kitchen        4000
Stationery     1455
Name: Revenue, dtype: int64
Category
Stationery     1455
Kitchen        4000
Electronics    5400
Name: Revenue, dtype: int64
Item
Pen           3
Notebook      2
Headphones    2
Mouse         2
Mug           2
Bottle        1
Name: count, dtype: int64`,units:`Group by: Item
Item
Pen           45
Notebook      13
Mug           10
Bottle         5
Mouse          4
Headphones     3
Name: Qty, dtype: int64
Best: Pen (45)`,units2:`Group by: Category
Category
Stationery     58
Kitchen        15
Electronics     7
Name: Qty, dtype: int64
Best: Stationery (58)`,units3:`Group by: Item
Item
Pen        42
Ball       10
Cushion     5
Lamp        4
Racket      3
Name: Qty, dtype: int64
Best: Pen (42)`,agg:`             Orders  Units  Revenue  Average
Category                                    
Electronics       4      7     5400   1350.0
Kitchen           3     15     4000   1333.3
Stationery        5     58     1455    291.0`,agg2:`            Orders  Units  Revenue  Average
Category                                   
Home             3      9     5800   1933.3
Sports           4     13     8900   2225.0
Stationery       2     42      630    315.0`,missing:`Missing values:
Date        0
Item        2
Category    0
Qty         2
Price       0
dtype: int64
Rows kept: 8
Units: 44`,missing2:`Missing values:
Date        0
Item        1
Category    0
Qty         1
Price       0
dtype: int64
Rows kept: 4
Units: 10`},i=(n,t)=>`import os
for _n in ["summary.csv"]:
    if os.path.exists(_n): os.remove(_n)
with open(${JSON.stringify(n)}, "w") as _f:
    _f.write(${JSON.stringify(t)})`,u=`Date,Item,Category,Qty,Price
2026-01-05,Pen,Stationery,10,15
2026-01-07,Notebook,Stationery,5,60
2026-01-12,Headphones,Electronics,2,1200
2026-01-20,Mouse,Electronics,3,450
2026-02-02,Pen,Stationery,20,15
2026-02-14,Mug,Kitchen,6,250
2026-02-18,Notebook,Stationery,8,60
2026-02-25,Mouse,Electronics,1,450
2026-03-03,Mug,Kitchen,4,250
2026-03-10,Headphones,Electronics,1,1200
2026-03-15,Pen,Stationery,15,15
2026-03-28,Bottle,Kitchen,5,300
`,v=`Date,Item,Category,Qty,Price
2026-04-02,Ball,Sports,4,350
2026-04-09,Racket,Sports,2,1800
2026-04-15,Pen,Stationery,30,15
2026-05-01,Lamp,Home,2,950
2026-05-11,Ball,Sports,6,350
2026-05-20,Cushion,Home,5,400
2026-06-03,Racket,Sports,1,1800
2026-06-17,Lamp,Home,2,950
2026-06-25,Pen,Stationery,12,15
`,C=`Date,Item,Category,Qty,Price
2026-01-05,Pen,Stationery,10,15
2026-01-07,,Stationery,5,60
2026-01-12,Headphones,Electronics,,1200
2026-01-20,Mouse,Electronics,3,450
2026-02-02,Pen,Stationery,20,15
2026-02-14,Mug,Kitchen,6,250
2026-02-18,Notebook,Stationery,,60
2026-02-25,,Electronics,1,450
2026-03-03,Mug,Kitchen,4,250
2026-03-10,Headphones,Electronics,1,1200
`,I=`Date,Item,Category,Qty,Price
2026-04-02,Ball,Sports,,350
2026-04-09,Racket,Sports,2,1800
2026-04-15,,Stationery,30,15
2026-05-01,Lamp,Home,2,950
2026-05-11,Ball,Sports,6,350
`,h={timeoutMs:2e4},y=(...n)=>n.map(t=>({call:t})),b=n=>{const[t,...r]=n.trim().split(`
`),d=t.split(",");return r.map(o=>Object.fromEntries(o.split(",").map((a,s)=>[d[s],a])))},f=(n,t)=>{const r=new Map;return n.forEach(d=>r.set(t(d),(r.get(t(d))||0)+d.Qty*d.Price)),r};function g(n){const t=b(n),r=[...f(t,s=>s.Date.slice(0,7))].sort((s,c)=>s[0]<c[0]?-1:1),d=r.reduce((s,c)=>c[1]>s[1]?c:s),o=[...f(t,s=>s.Item)].reduce((s,c)=>c[1]>s[1]?c:s),a=t.reduce((s,c)=>s+c.Qty*c.Price,0);return[...r.map(([s,c])=>`${s}: ${c}`),`Best month: ${d[0]}`,`Top item: ${o[0]} (${o[1]})`,`Total: ${a}`,`Average order: ${(a/t.length).toFixed(2)}`].join(`
`)}const P=n=>[...f(b(n),t=>t.Category)].sort((t,r)=>r[1]-t[1]),x=n=>{const t=P(n);return`import pandas as _pd, os as _os
assert _os.path.exists("summary.csv"), "summary.csv was not saved — use to_csv."
_s = _pd.read_csv("summary.csv")
assert list(_s.columns) == ["Category", "Revenue"], f"summary.csv should have the columns Category, Revenue (and no index column) — it has {list(_s.columns)}"
assert _s["Category"].tolist() == ${JSON.stringify(t.map(r=>r[0]))}, "Categories should be sorted by revenue, highest first."
assert _s["Revenue"].tolist() == ${JSON.stringify(t.map(r=>r[1]))}, "The revenue totals in summary.csv are not right."`};function Q(){const n=[["Stationery",150],["Electronics",2400],["Stationery",300],["Kitchen",1500],["Electronics",1350],["Kitchen",1e3]],t=["Electronics","Kitchen","Stationery"],r={Electronics:m.blue,Kitchen:m.orange,Stationery:m.teal},d={border:`1px solid ${m.border}`,borderRadius:10,padding:10,background:m.card,fontFamily:R,fontSize:13.5};return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12,alignItems:"start"},children:[e.jsxs("div",{style:d,children:[e.jsx("div",{style:{color:m.muted,marginBottom:6},children:"table"}),n.map(([o,a],s)=>e.jsxs("div",{style:{color:r[o]},children:[o," ",a]},s))]}),e.jsxs("div",{style:d,children:[e.jsx("div",{style:{color:m.muted,marginBottom:6},children:"1 · split by Category"}),t.map(o=>e.jsx("div",{style:{background:j(r[o],"14"),borderRadius:6,padding:"4px 6px",marginBottom:4,color:r[o]},children:n.filter(a=>a[0]===o).map(a=>a[1]).join(", ")},o))]}),e.jsxs("div",{style:d,children:[e.jsx("div",{style:{color:m.muted,marginBottom:6},children:"2 · apply sum()  3 · combine"}),t.map(o=>e.jsxs("div",{style:{color:r[o]},children:[o.padEnd(12," "),n.filter(a=>a[0]===o).reduce((a,s)=>a+s[1],0)]},o))]})]})}const p={revenue:{...h,id:"revenue",kind:"type",title:"A computed column",task:e.jsxs(e.Fragment,{children:["A shop exported its sales as ",e.jsx("code",{children:"sales.csv"})," (one row per order). Revenue isn't in the file — compute it for every row at once."]}),show:`import pandas as pd

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
print(df.head())
print(f"Orders: {len(df)}")
print(f"Total revenue: {df['Revenue'].sum()}")`,tests:[{setup:i("sales.csv",u),expect:l.revenue}],requires:y("read_csv"),hints:["head() with no number shows the first five rows."],solution:`import pandas as pd

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
print(df.head())
print(f"Orders: {len(df)}")
print(f"Total revenue: {df['Revenue'].sum()}")`},groupby:{...h,id:"groupby",kind:"type",title:"groupby and value_counts",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:'df.groupby("Category")["Revenue"].sum()'})," reads: split the rows by Category, take Revenue, sum each group. ",e.jsx("code",{children:"value_counts()"})," counts how often each value appears — most common first."]}),show:`import pandas as pd

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
by_cat = df.groupby("Category")["Revenue"].sum()
print(by_cat)
print(by_cat.sort_values())
print(df["Item"].value_counts())`,tests:[{setup:i("sales.csv",u),expect:l.groupby}],requires:y("groupby","value_counts"),hints:["groupby sorts the group names alphabetically; sort_values() re-orders by the totals, smallest first."],solution:`import pandas as pd

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
by_cat = df.groupby("Category")["Revenue"].sum()
print(by_cat)
print(by_cat.sort_values())
print(df["Item"].value_counts())`},units:{...h,id:"units",kind:"write",title:"Units sold by…",task:e.jsxs(e.Fragment,{children:["Load sales.csv. Ask ",e.jsx("code",{children:"Group by: "})," (a column name such as ",e.jsx("code",{children:"Item"})," or ",e.jsx("code",{children:"Category"}),"). Print the total ",e.jsx("code",{children:"Qty"})," for each group, highest first (a Series — just print it), then ",e.jsx("code",{children:"Best: Pen (45)"})," using the first entry: ",e.jsx("code",{children:".index[0]"})," and ",e.jsx("code",{children:".iloc[0]"}),"."]}),tests:[{setup:i("sales.csv",u),inputs:["Item"],expect:l.units},{setup:i("sales.csv",u),inputs:["Category"],expect:l.units2,hidden:!0,why:"Use the typed column name inside groupby( ) — don't write Item yourself."},{setup:i("sales.csv",v),inputs:["Item"],expect:l.units3,hidden:!0}],requires:y("groupby","sort_values"),hints:['totals = df.groupby(col)["Qty"].sum().sort_values(ascending=False)','print(f"Best: {totals.index[0]} ({totals.iloc[0]})")'],solution:`import pandas as pd

df = pd.read_csv("sales.csv")
col = input("Group by: ")
totals = df.groupby(col)["Qty"].sum().sort_values(ascending=False)
print(totals)
print(f"Best: {totals.index[0]} ({totals.iloc[0]})")`},agg:{...h,id:"agg",kind:"complete",title:"Several summaries at once",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:".agg(…)"})," computes several summaries per group, each named ",e.jsx("code",{children:'NewName=("column", "function")'}),". Fill the blanks: for each category, the number of orders (",e.jsx("code",{children:'"count"'}),"), the units sold, and the total and average revenue."]}),starter:`import pandas as pd

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
summary = df.groupby("Category").agg(
    Orders=("Item", "count"),
    Units=("Qty", ___),
    Revenue=(___, "sum"),
    Average=("Revenue", ___),
)
print(summary.round(1))`,tests:[{setup:i("sales.csv",u),expect:l.agg},{setup:i("sales.csv",v),expect:l.agg2,hidden:!0}],requires:y("agg"),hints:['"sum"','"Revenue"','"mean"'],solution:`import pandas as pd

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
summary = df.groupby("Category").agg(
    Orders=("Item", "count"),
    Units=("Qty", "sum"),
    Revenue=("Revenue", "sum"),
    Average=("Revenue", "mean"),
)
print(summary.round(1))`},missing:{...h,id:"missing",kind:"fix",title:"Messy data",task:e.jsxs(e.Fragment,{children:["Real files have gaps. In ",e.jsx("code",{children:"sales_raw.csv"})," some orders have no Item and some no Qty — pandas reads an empty cell as ",e.jsx("code",{children:"NaN"})," (“not a number”), and this program crashes. Run it. Then fix it: first print ",e.jsx("code",{children:"Missing values:"})," and ",e.jsx("code",{children:"df.isna().sum()"}),"; drop the rows with no Item (",e.jsx("code",{children:'dropna(subset=["Item"])'}),"); fill a missing Qty with 0 (",e.jsx("code",{children:"fillna(0)"}),"); then convert and print ",e.jsx("code",{children:"Rows kept: 8"})," and ",e.jsx("code",{children:"Units: 44"}),"."]}),starter:`import pandas as pd

df = pd.read_csv("sales_raw.csv")
df["Qty"] = df["Qty"].astype(int)
print(f"Units: {df['Qty'].sum()}")`,tests:[{setup:i("sales_raw.csv",C),expect:l.missing},{setup:i("sales_raw.csv",I),expect:l.missing2,hidden:!0,why:"A different file — every count must come from the DataFrame."}],requires:y("isna","dropna","fillna"),hints:['df = df.dropna(subset=["Item"])','df["Qty"] = df["Qty"].fillna(0).astype(int)','print(f"Rows kept: {len(df)}")'],solution:`import pandas as pd

df = pd.read_csv("sales_raw.csv")
print("Missing values:")
print(df.isna().sum())
df = df.dropna(subset=["Item"])
df["Qty"] = df["Qty"].fillna(0).astype(int)
print(f"Rows kept: {len(df)}")
print(f"Units: {df['Qty'].sum()}")`},save:{...h,id:"save",kind:"write",title:"Save your results",task:e.jsxs(e.Fragment,{children:["Load sales.csv, add Revenue, and total it per Category, highest first. Turn that Series back into a two-column table with ",e.jsx("code",{children:".reset_index()"})," and save it with ",e.jsx("code",{children:'to_csv("summary.csv", index=False)'})," (no index column). Print ",e.jsx("code",{children:"Saved 3 categories"}),". The checker opens your summary.csv."]}),tests:[{setup:i("sales.csv",u),expect:"Saved 3 categories",post:x(u)},{setup:i("sales.csv",v),expect:"Saved 3 categories",post:x(v),hidden:!0}],requires:y("to_csv","reset_index"),hints:['summary = df.groupby("Category")["Revenue"].sum().sort_values(ascending=False).reset_index()','summary.to_csv("summary.csv", index=False)','print(f"Saved {len(summary)} categories")'],solution:`import pandas as pd

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
summary = df.groupby("Category")["Revenue"].sum().sort_values(ascending=False).reset_index()
summary.to_csv("summary.csv", index=False)
print(f"Saved {len(summary)} categories")`},report:{...h,id:"report",kind:"make",title:"Monthly sales report",task:e.jsxs(e.Fragment,{children:["Load sales.csv and add Revenue. Make a ",e.jsx("code",{children:"Month"})," column from the first 7 characters of Date (",e.jsx("code",{children:'df["Date"].str[:7]'}),"). Print revenue per month in date order as ",e.jsx("code",{children:"2026-01: 4200"})," (loop over the grouped Series' ",e.jsx("code",{children:".items()"}),"), then ",e.jsx("code",{children:"Best month: 2026-01"}),", ",e.jsx("code",{children:"Top item: Headphones (3600)"})," (by revenue), ",e.jsx("code",{children:"Total: 10855"})," and ",e.jsx("code",{children:"Average order: 904.58"}),"."]}),minLines:14,tests:[{setup:i("sales.csv",u),expect:g(u)},{setup:i("sales.csv",v),expect:g(v),hidden:!0,why:"A different shop and different months — compute everything from the DataFrame."}],requires:y("groupby","items"),hints:['monthly = df.groupby("Month")["Revenue"].sum()',"monthly.idxmax() is the label of the biggest value; .max() is the value.",'items = df.groupby("Item")["Revenue"].sum() — then idxmax / max again','df["Revenue"].mean() is the average order'],solution:`import pandas as pd

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
df["Month"] = df["Date"].str[:7]

monthly = df.groupby("Month")["Revenue"].sum()
for month, total in monthly.items():
    print(f"{month}: {total}")
print(f"Best month: {monthly.idxmax()}")

items = df.groupby("Item")["Revenue"].sum()
print(f"Top item: {items.idxmax()} ({items.max()})")
print(f"Total: {df['Revenue'].sum()}")
print(f"Average order: {df['Revenue'].mean():.2f}")`}},T=p,E=[{q:'df.groupby("Category")["Revenue"].sum() gives…',options:["One total for the whole table","One total per category","The rows sorted by category","A new CSV file"],answer:1,explain:"Split by category, sum each group, combine the results."},{q:"What does value_counts() return?",options:["The number of columns","How often each value appears, most common first","The sum of the values","Missing values"],answer:1,explain:"Perfect for “which item was ordered most often?”"},{q:"An empty cell in a CSV becomes…",options:["0",'""',"NaN","An error"],answer:2,explain:"NaN = Not a Number: pandas' marker for missing."},{q:'dropna(subset=["Item"]) …',options:["Deletes the Item column","Removes rows whose Item is missing","Fills Item with 0","Counts missing items"],answer:1,explain:"fillna fills gaps; dropna drops rows with gaps."},{q:'Why to_csv("out.csv", index=False)?',options:["It's faster","So the 0, 1, 2 row labels aren't saved as an extra column","It hides the file","It's required"],answer:1,explain:"Without it, the file starts with an unnamed index column."}];function A(n){const t=[{label:"The Data",kicker:"sales.csv",title:"A shop's sales",blocks:[e.jsxs(_,{children:["Twelve orders from a small shop — the kind of file every business has thousands of. The question is always the same: ",e.jsx("em",{children:"what is this data telling us?"})]}),p.revenue]},{label:"Group By",kicker:"SPLIT · APPLY · COMBINE",title:"Totals per group",blocks:[e.jsx(Q,{}),p.groupby,p.units]},{label:"Aggregate",kicker:".agg",title:"Several summaries at once",blocks:[p.agg,e.jsx(w,{children:"Most data questions are “for each X, what is the total / average / count of Y?” — that's groupby(X)[Y] plus one function."})]},{label:"Missing Data",kicker:"NaN",title:"Cleaning messy data",blocks:[p.missing,e.jsx(S,{color:m.blue,icon:"🧹",children:"Data scientists say 80% of the work is cleaning. Always check df.isna().sum() before trusting an average."})]},{label:"Save",kicker:"to_csv",title:"Save your results",blocks:[p.save]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: monthly sales report",blocks:[p.report]}];return e.jsx(k,{...n,unitId:"Unit12_2",crumb:"MODULE 12 › 2",title:"Analysing Real Data",sections:t,quiz:E,next:{title:"Module 13 — Charts with Matplotlib",text:"A number tells. A chart convinces."}})}export{T as EXERCISES,A as default};
