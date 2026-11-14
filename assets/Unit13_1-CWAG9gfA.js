import{j as e}from"./index-CD7nmDt6.js";import{P as E,C as M,K as C,N as R,T as L,L as T}from"./Lesson-MmSVdMEX.js";const m=(t,a)=>`with open(${JSON.stringify(t)}, "w") as _f:
    _f.write(${JSON.stringify(a)})`,p={timeoutMs:2e4},d=t=>JSON.stringify(t),h=(t=1)=>`import matplotlib.pyplot as _plt
assert _plt.get_fignums(), "No chart was drawn — call plt.plot(...), plt.bar(...) etc."
_fig = _plt.gcf()
_fig.canvas.draw()
assert len(_fig.axes) >= ${t}, "Expected ${t} chart${t>1?"s":""} in the figure — found " + str(len(_fig.axes)) + "."
_ax = _fig.axes[0]
_ticks = lambda a: [t.get_text() for t in a.get_xticklabels()]
_heights = lambda a: [round(p.get_height(), 2) for p in a.patches]
`,c=(t,a="_ax")=>`assert ${a}.get_title().strip().lower() == ${d(t.toLowerCase())}, "The title should be ${t.replace(/"/g,"'")} — it is '" + ${a}.get_title() + "'."
`,g=(t,a)=>`assert _ax.get_xlabel().strip().lower() == ${d(t.toLowerCase())}, "Label the x-axis: ${t}"
assert _ax.get_ylabel().strip().lower() == ${d(a.toLowerCase())}, "Label the y-axis: ${a}"
`,y=`Name,Dept,Marks
Asha,CSE,82
Ben,ECE,35
Chen,CSE,67
Dev,MECH,91
Esha,ECE,58
`,k=`Name,Dept,Marks
Farah,CSE,73
Gopal,MECH,38
Hari,ECE,88
Isha,CSE,95
Jay,MECH,61
Kavi,ECE,49
Lina,CSE,70
`,_=`Date,Item,Category,Qty,Price
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
`,f=`Date,Item,Category,Qty,Price
2026-04-02,Ball,Sports,4,350
2026-04-09,Racket,Sports,2,1800
2026-04-15,Pen,Stationery,30,15
2026-05-01,Lamp,Home,2,950
2026-05-11,Ball,Sports,6,350
2026-05-20,Cushion,Home,5,400
2026-06-03,Racket,Sports,1,1800
2026-06-17,Lamp,Home,2,950
2026-06-25,Pen,Stationery,12,15
`,w=t=>{const[a,...n]=t.trim().split(`
`),r=a.split(",");return n.map(s=>Object.fromEntries(s.split(",").map((l,o)=>[r[o],isNaN(+l)?l:+l])))},u=(t,a,n,r="sum")=>{const s=new Map;return t.forEach(l=>{const o=s.get(l[a])||[];o.push(n(l)),s.set(l[a],o)}),[...s].map(([l,o])=>[l,Math.round((r==="mean"?o.reduce((b,x)=>b+x,0)/o.length:o.reduce((b,x)=>b+x,0))*100)/100]).sort((l,o)=>l[0]<o[0]?-1:1)},v=t=>{const a=u(w(t),"Dept",n=>n.Marks,"mean");return h()+c("Average marks by department")+`assert _ticks(_ax) == ${d(a.map(n=>n[0]))}, "One bar per department, in groupby's order: " + str(_ticks(_ax))
assert _heights(_ax) == ${d(a.map(n=>n[1]))}, "The bar heights should be each department's average mark."
`},S=t=>{const a=w(t).map(s=>({...s,Rev:s.Qty*s.Price,Month:s.Date.slice(0,7)})),n=u(a,"Category",s=>s.Rev).sort((s,l)=>l[1]-s[1]),r=u(a,"Month",s=>s.Rev);return h(2)+`_a1, _a2 = _fig.axes[0], _fig.axes[1]
assert _ticks(_a1) == ${d(n.map(s=>s[0]))}, "Left chart: one bar per category, highest revenue first — got " + str(_ticks(_a1))
assert _heights(_a1) == ${d(n.map(s=>s[1]))}, "Left chart: bar heights should be the revenue per category."
assert len(_a2.get_lines()) == 1, "Right chart: draw one line (ax2.plot)."
assert [round(float(v), 2) for v in _a2.get_lines()[0].get_ydata()] == ${d(r.map(s=>s[1]))}, "Right chart: the line should be the revenue per month, in date order."
assert "category" in _a1.get_title().lower(), "Give the left chart a title with the word category."
assert "month" in _a2.get_title().lower(), "Give the right chart a title with the word month."
`},j=t=>{const a=w(t);return`Best category: ${u(a,"Category",r=>r.Qty*r.Price).sort((r,s)=>s[1]-r[1])[0][0]}`},i={line:{...p,id:"line",kind:"type",title:"Your first chart",task:e.jsxs(e.Fragment,{children:["Every matplotlib chart follows one recipe: ",e.jsx("strong",{children:"data → plot → label → show"}),". ",e.jsx("code",{children:"plt.plot(x, y)"})," draws a line; ",e.jsx("code",{children:'marker="o"'})," puts a dot on each point."]}),show:`import matplotlib.pyplot as plt

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
steps = [4200, 6800, 5100, 9000, 7300]

plt.plot(days, steps, marker="o")
plt.title("Steps this week")
plt.xlabel("Day")
plt.ylabel("Steps")
plt.show()`,tests:[{post:h()+c("Steps this week")+g("Day","Steps")+`assert len(_ax.get_lines()) == 1, "Draw one line with plt.plot."
assert list(_ax.get_lines()[0].get_ydata()) == [4200, 6800, 5100, 9000, 7300], "Plot the steps list as y."
`}],hints:["The chart appears under the output. plt.show() displays it (in a script it opens a window)."],solution:`import matplotlib.pyplot as plt

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
steps = [4200, 6800, 5100, 9000, 7300]

plt.plot(days, steps, marker="o")
plt.title("Steps this week")
plt.xlabel("Day")
plt.ylabel("Steps")
plt.show()`},bar:{...p,id:"bar",kind:"complete",title:"A bar chart",task:e.jsxs(e.Fragment,{children:["Bars compare amounts between categories. Fill the blanks: draw the bars with ",e.jsx("code",{children:"plt.bar"}),", title the chart ",e.jsx("code",{children:"Rainfall by month"}),", and label the axes ",e.jsx("code",{children:"Month"})," and ",e.jsx("code",{children:"Rainfall (mm)"}),". Then change the bar colour with ",e.jsx("code",{children:'color="teal"'}),"."]}),starter:`import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr"]
rain = [12, 30, 55, 80]

plt.___(months, rain)
plt.title(___)
plt.xlabel(___)
plt.ylabel(___)
plt.show()`,tests:[{post:h()+c("Rainfall by month")+g("Month","Rainfall (mm)")+`assert _ticks(_ax) == ["Jan", "Feb", "Mar", "Apr"], "One bar per month."
assert _heights(_ax) == [12, 30, 55, 80], "Bar heights should be the rain list."
import matplotlib.colors as _mc
assert _mc.to_hex(_ax.patches[0].get_facecolor()) == _mc.to_hex("teal"), "Make the bars teal: plt.bar(months, rain, color=\\"teal\\")"
`}],hints:['plt.bar(months, rain, color="teal")','plt.title("Rainfall by month")'],solution:`import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr"]
rain = [12, 30, 55, 80]

plt.bar(months, rain, color="teal")
plt.title("Rainfall by month")
plt.xlabel("Month")
plt.ylabel("Rainfall (mm)")
plt.show()`},scatter:{...p,id:"scatter",kind:"write",title:"Is there a link?",task:e.jsxs(e.Fragment,{children:["A ",e.jsx("strong",{children:"scatter"})," plot shows whether two measurements move together. Six students: hours studied ",e.jsx("code",{children:"[1, 2, 3, 4, 5, 6]"}),", scores ",e.jsx("code",{children:"[35, 48, 52, 63, 71, 80]"}),". Draw them with ",e.jsx("code",{children:"plt.scatter"}),", title ",e.jsx("code",{children:"Study vs score"}),", x label ",e.jsx("code",{children:"Hours"}),", y label ",e.jsx("code",{children:"Score"}),". Then print ",e.jsx("code",{children:"Each extra hour: about 9.0 marks"})," — the average rise per hour, (last score − first score) / (last hour − first hour), 1 decimal place."]}),tests:[{expect:"Each extra hour: about 9.0 marks",post:h()+c("Study vs score")+g("Hours","Score")+`assert len(_ax.collections) == 1, "Use plt.scatter for the points."
assert len(_ax.collections[0].get_offsets()) == 6, "Plot all six students."
`}],requires:[{call:"scatter"}],hints:["plt.scatter(hours, scores)","rise = (scores[-1] - scores[0]) / (hours[-1] - hours[0])"],solution:`import matplotlib.pyplot as plt

hours = [1, 2, 3, 4, 5, 6]
scores = [35, 48, 52, 63, 71, 80]

plt.scatter(hours, scores)
plt.title("Study vs score")
plt.xlabel("Hours")
plt.ylabel("Score")
plt.show()

rise = (scores[-1] - scores[0]) / (hours[-1] - hours[0])
print(f"Each extra hour: about {rise:.1f} marks")`},pie:{...p,id:"pie",kind:"write",title:"Parts of a whole",task:e.jsxs(e.Fragment,{children:["A ",e.jsx("strong",{children:"pie"})," shows how a whole splits into parts. A day: Sleep 8 hours, Class 6, Study 3, Phone 4, Other 3. Draw ",e.jsx("code",{children:'plt.pie(hours, labels=activities, autopct="%1.0f%%")'})," (autopct writes each slice's percentage) and title it ",e.jsx("code",{children:"My day"}),"."]}),tests:[{post:h()+c("My day")+`from matplotlib.patches import Wedge as _W
_w = [p for p in _ax.patches if isinstance(p, _W)]
assert len(_w) == 5, "Five slices: Sleep, Class, Study, Phone, Other."
_t = [t.get_text() for t in _ax.texts]
assert "Sleep" in _t and "Phone" in _t, "Label the slices: labels=activities"
assert any(x.endswith("%") for x in _t), "Show percentages with autopct=\\"%1.0f%%\\""
`}],requires:[{call:"pie"}],hints:['activities = ["Sleep", "Class", "Study", "Phone", "Other"]',"hours = [8, 6, 3, 4, 3]"],solution:`import matplotlib.pyplot as plt

activities = ["Sleep", "Class", "Study", "Phone", "Other"]
hours = [8, 6, 3, 4, 3]

plt.pie(hours, labels=activities, autopct="%1.0f%%")
plt.title("My day")
plt.show()`},legend:{...p,id:"legend",kind:"type",title:"Two lines and a legend",task:e.jsxs(e.Fragment,{children:["Call ",e.jsx("code",{children:"plt.plot"})," twice to draw two lines on the same axes. Give each a ",e.jsx("code",{children:"label="}),", and ",e.jsx("code",{children:"plt.legend()"})," shows which is which."]}),show:`import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May"]
last_year = [120, 135, 150, 140, 160]
this_year = [130, 150, 170, 175, 190]

plt.plot(months, last_year, marker="o", label="2025")
plt.plot(months, this_year, marker="o", label="2026")
plt.title("Sales: this year vs last")
plt.legend()
plt.show()`,tests:[{post:h()+c("Sales: this year vs last")+`assert len(_ax.get_lines()) == 2, "Draw two lines."
assert _ax.get_legend() is not None, "Call plt.legend()."
assert [t.get_text() for t in _ax.get_legend().get_texts()] == ["2025", "2026"], "Label the lines 2025 and 2026."
`}],hints:["The legend uses the label= of each line."],solution:`import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May"]
last_year = [120, 135, 150, 140, 160]
this_year = [130, 150, 170, 175, 190]

plt.plot(months, last_year, marker="o", label="2025")
plt.plot(months, this_year, marker="o", label="2026")
plt.title("Sales: this year vs last")
plt.legend()
plt.show()`},fromcsv:{...p,id:"fromcsv",kind:"write",title:"From a CSV to a chart",task:e.jsxs(e.Fragment,{children:["Pandas (M12) + matplotlib together. Load ",e.jsx("code",{children:"marks.csv"}),", compute each department's average mark with ",e.jsx("code",{children:"groupby"}),", and draw it as a bar chart: ",e.jsx("code",{children:"plt.bar(avg.index, avg.values)"}),", titled ",e.jsx("code",{children:"Average marks by department"}),". Hidden tests use a different marks.csv."]}),show:y,showLabel:"marks.csv — ALREADY IN THE FOLDER",tests:[{setup:m("marks.csv",y),post:v(y)},{setup:m("marks.csv",k),post:v(k),hidden:!0}],requires:[{call:"read_csv"},{call:"groupby"},{call:"bar"}],hints:['avg = df.groupby("Dept")["Marks"].mean()',"plt.bar(avg.index, avg.values)"],solution:`import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("marks.csv")
avg = df.groupby("Dept")["Marks"].mean()
plt.bar(avg.index, avg.values)
plt.title("Average marks by department")
plt.ylabel("Average mark")
plt.show()`},subplots:{...p,id:"subplots",kind:"complete",title:"Side by side: subplots",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"fig, (ax1, ax2) = plt.subplots(1, 2)"})," makes a figure with 1 row and 2 charts, each with its own ",e.jsx("em",{children:"axes"})," object. On an axes, the methods are the same except titles and labels gain ",e.jsx("code",{children:"set_"}),": ",e.jsx("code",{children:"ax1.set_title(…)"}),". Fill the blanks: bars on the left, a line on the right."]}),starter:`import matplotlib.pyplot as plt

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
cups = [3, 2, 4, 1, 2]
sleep = [6, 7, 5, 8, 7]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
ax1.___(days, cups)
ax1.___("Coffee")
ax2.___(days, sleep, marker="o")
ax2.___("Sleep")
plt.show()`,tests:[{post:h(2)+`_a1, _a2 = _fig.axes[0], _fig.axes[1]
assert _heights(_a1) == [3, 2, 4, 1, 2], "Left: ax1.bar(days, cups)"
assert len(_a2.get_lines()) == 1, "Right: ax2.plot(days, sleep, marker=\\"o\\")"
`+c("Coffee","_a1")+c("Sleep","_a2")}],hints:["ax1.bar(days, cups)",'ax1.set_title("Coffee")','ax2.plot(...) and ax2.set_title("Sleep")'],solution:`import matplotlib.pyplot as plt

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
cups = [3, 2, 4, 1, 2]
sleep = [6, 7, 5, 8, 7]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
ax1.bar(days, cups)
ax1.set_title("Coffee")
ax2.plot(days, sleep, marker="o")
ax2.set_title("Sleep")
plt.show()`},dashboard:{...p,id:"dashboard",kind:"make",title:"Sales dashboard",task:e.jsxs(e.Fragment,{children:["Load the shop's ",e.jsx("code",{children:"sales.csv"})," (12.2) and add Revenue (Qty × Price) and Month (",e.jsx("code",{children:"Date.str[:7]"}),"). Make ",e.jsx("code",{children:"plt.subplots(1, 2, figsize=(11, 4))"}),": on the left, revenue per Category as bars, ",e.jsx("strong",{children:"highest first"}),", titled ",e.jsx("code",{children:"Revenue by category"}),"; on the right, revenue per Month as a line with markers, titled ",e.jsx("code",{children:"Revenue by month"}),". Print ",e.jsx("code",{children:"Best category: Electronics"}),". Hidden tests use another shop's file."]}),minLines:16,tests:[{setup:m("sales.csv",_),expect:j(_),post:S(_)},{setup:m("sales.csv",f),expect:j(f),post:S(f),hidden:!0}],requires:[{call:"subplots"},{call:"groupby",min:2}],hints:['by_cat = df.groupby("Category")["Revenue"].sum().sort_values(ascending=False)','monthly = df.groupby("Month")["Revenue"].sum()','ax1.bar(by_cat.index, by_cat.values); ax2.plot(monthly.index, monthly.values, marker="o")',"by_cat.index[0] is the best category"],solution:`import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
df["Month"] = df["Date"].str[:7]
by_cat = df.groupby("Category")["Revenue"].sum().sort_values(ascending=False)
monthly = df.groupby("Month")["Revenue"].sum()

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4))
ax1.bar(by_cat.index, by_cat.values, color="teal")
ax1.set_title("Revenue by category")
ax2.plot(monthly.index, monthly.values, marker="o")
ax2.set_title("Revenue by month")
plt.show()

print(f"Best category: {by_cat.index[0]}")`}},D=i,A=[{q:"Which chart compares amounts between categories?",options:["Line","Bar","Scatter","Pie"],answer:1,explain:"Bars for categories; lines for change over time."},{q:"Which chart shows whether two measurements move together?",options:["Pie","Bar","Scatter","Histogram"],answer:2,explain:"Each point is one student: x = hours, y = score."},{q:"What does plt.legend() need to show names?",options:["Nothing","A label= on each plot call","A title","Two charts"],answer:1,explain:'plt.plot(x, y, label="2026")'},{q:"On an axes object (ax), the title is set with…",options:['ax.title("…")','ax.set_title("…")','plt.ax("…")','ax.name = "…"'],answer:1,explain:"plt.title becomes ax.set_title, plt.xlabel becomes ax.set_xlabel."},{q:"plt.subplots(2, 3) makes…",options:["2 charts","6 charts in 2 rows and 3 columns","3 charts","A 2×3 inch figure"],answer:1,explain:"Rows first, then columns."}];function H(t){const a=[{label:"The Recipe",kicker:"DATA → PLOT → LABEL → SHOW",title:"Your first chart",blocks:[e.jsxs(E,{children:["A table of numbers tells; a chart convinces. ",e.jsx("strong",{children:"matplotlib"})," is Python's original charting library — almost every other one (seaborn, pandas' .plot) is built on it."]}),i.line]},{label:"Chart Types",kicker:"PICK THE RIGHT ONE",title:"Bar, scatter, pie",blocks:[e.jsx(M,{title:"which chart?",code:`plt.plot(x, y)        # line    — change over time
plt.bar(names, values) # bar     — compare categories
plt.scatter(x, y)      # scatter — is there a link?
plt.pie(values)        # pie     — parts of a whole (few parts!)`}),i.bar,i.scatter,i.pie]},{label:"Legends",kicker:"SEVERAL SERIES",title:"Two lines, one chart",blocks:[i.legend]},{label:"From Data",kicker:"PANDAS + MATPLOTLIB",title:"Charts from a CSV",blocks:[i.fromcsv,e.jsx(C,{children:"The usual flow: load (read_csv) → summarise (groupby) → plot the summary (index on x, values on y)."})]},{label:"Subplots",kicker:"fig, ax",title:"Several charts in one figure",blocks:[i.subplots]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: sales dashboard",blocks:[i.dashboard,e.jsx(R,{color:L.blue,icon:"💾",children:'On your own computer, plt.savefig("dashboard.png", dpi=150) saves the figure as an image for a report — call it before plt.show().'})]}];return e.jsx(T,{...t,unitId:"Unit13_1",crumb:"MODULE 13 › 1",title:"Charts with Matplotlib",sections:a,quiz:A,next:{title:"13.2 — Statistical Charts with Seaborn",text:"Distributions, comparisons and correlations — one line each."}})}export{D as EXERCISES,H as default};
