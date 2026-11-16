import{j as e}from"./index-rTKCO5Yp.js";import{P as D,C as N,K as H,N as R,T as P,L as T}from"./Lesson-o3jU_D0N.js";const r=(t,s)=>`with open(${JSON.stringify(t)}, "w") as _f:
    _f.write(${JSON.stringify(s)})`,c={timeoutMs:3e4},n=t=>JSON.stringify(t),l=t=>`assert ${n(t)} in globals(), "Store the chart in a variable called ${t}."
_f = ${t}
`,j=t=>`[round(float(v), 2) for v in ${t}]`,g=t=>`assert (_f.layout.title.text or "").strip().lower() == ${n(t.toLowerCase())}, "Give the chart the title ${t} (title=...)."
`,u=`assert _fh_shown(), "Call fig.show() to display the chart."
`,m=`Date,Item,Category,Qty,Price
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
`,x=`Date,Item,Category,Qty,Price
2026-04-02,Ball,Sports,4,350
2026-04-09,Racket,Sports,2,1800
2026-04-15,Pen,Stationery,30,15
2026-05-01,Lamp,Home,2,950
2026-05-11,Ball,Sports,6,350
2026-05-20,Cushion,Home,5,400
2026-06-03,Racket,Sports,1,1800
2026-06-17,Lamp,Home,2,950
2026-06-25,Pen,Stationery,12,15
`,p=`Name,Dept,Hours,Sleep,Phone,Score
Asha,CSE,5,7,4,82
Ben,ECE,1,5,6,35
Chen,CSE,3,6,2,67
Dev,MECH,6,8,1,91
Esha,ECE,2,6,5,58
Farah,CSE,4,7,3,74
Gopal,MECH,1,6,7,38
Hari,ECE,5,8,2,88
Isha,CSE,6,7,1,95
Jay,MECH,3,5,3,61
Kavi,ECE,2,7,6,49
Lina,CSE,4,6,5,70
`,h=`Name,Dept,Hours,Sleep,Phone,Score
Arun,CIVIL,2,7,7,30
Bala,CSE,4,6,2,85
Cara,CIVIL,3,8,6,45
Dina,CSE,5,5,3,90
Eli,ECE,1,7,5,40
Fay,ECE,6,6,4,70
`,f=t=>{const[s,...o]=t.trim().split(`
`),a=s.split(",");return o.map(d=>Object.fromEntries(d.split(",").map((_,M)=>[a[M],isNaN(+_)?_:+_])))},E=(t,s)=>{const o=new Map;return t.forEach(a=>o.set(a[s],(o.get(a[s])||0)+a.Qty*a.Price)),[...o].sort((a,d)=>a[0]<d[0]?-1:1)},v=t=>E(f(t).map(s=>({...s,Month:s.Date.slice(0,7)})),"Month"),I=t=>E(f(t),"Category"),y=t=>[...new Set(f(t).map(s=>s.Dept))],b=t=>l("fig")+g("Revenue by month")+`assert _f.data and _f.data[0].type == "scatter" and "lines" in (_f.data[0].mode or "lines"), "Use px.line."
assert "markers" in (_f.data[0].mode or ""), "Show a dot on each month: markers=True"
assert [str(x) for x in _f.data[0].x] == ${n(v(t).map(s=>s[0]))}, "x should be the months, in date order."
assert ${j("_f.data[0].y")} == ${n(v(t).map(s=>s[1]))}, "y should be the total revenue of each month."
`+u,k=t=>l("fig")+`assert _f.data and _f.data[0].type == "pie", "Use px.pie."
assert sorted([[str(a), round(float(b), 2)] for a, b in zip(_f.data[0].labels, _f.data[0].values)]) == ${n(I(t))}, "One slice per category, sized by its total revenue."
assert _f.data[0].hole == 0.4, "Make it a donut: hole=0.4"
`+u,S=t=>l("fig")+g("Hours vs score")+`assert [t.type for t in _f.data] == ["scatter"] * ${y(t).length} and [t.name for t in _f.data] == ${n(y(t))}, "Colour the points by department: color=\\"Dept\\""
assert sum(len(t.x) for t in _f.data) == ${f(t).length}, "Plot every student."
assert _f.layout.xaxis.title.text == "Hours" and _f.layout.yaxis.title.text == "Score", "x = Hours, y = Score"
assert "Name" in (_f.data[0].hovertemplate or ""), "Show the student's name on hover: hover_data=[\\"Name\\"]"
`+u,w=t=>{const s=f(t),o=s.reduce((a,d)=>d.Score>a.Score?d:a);return`Students: ${s.length}
Top student: ${o.Name} (${o.Score})`},C=t=>l("fig1")+`assert _f.data and _f.data[0].type == "histogram", "fig1: use px.histogram."
assert [t.name for t in _f.data] == ${n(y(t))}, "fig1: colour the bars by department: color=\\"Dept\\""
assert _f.data[0].nbinsx == 5, "fig1: nbins=5"
`+g("Score distribution")+l("fig2")+`assert [t.name for t in _f.data] == ${n(y(t))}, "fig2: px.scatter coloured by department."
assert _f.layout.xaxis.title.text == "Hours" and _f.layout.yaxis.title.text == "Score", "fig2: x = Hours, y = Score"
assert _f.data[0].marker.size is not None and len(_f.data[0].marker.size) == len(_f.data[0].x), "fig2: size the dots by sleep: size=\\"Sleep\\""
assert _f.data[0].hovertext is not None, "fig2: hover_name=\\"Name\\" puts the name at the top of the hover box."
assert _fh_shown() >= 2, "Show both figures: fig1.show() and fig2.show()."
`,i={first:{...c,id:"first",kind:"type",title:"A chart you can touch",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"plotly.express"})," (as ",e.jsx("code",{children:"px"}),") makes charts that live in a web page: hover a bar to see its value, drag to zoom, double-click to reset. One call builds the figure; ",e.jsx("code",{children:"fig.show()"})," displays it."]}),show:`import pandas as pd
import plotly.express as px

df = pd.DataFrame({
    "Name": ["Asha", "Ben", "Chen", "Dev", "Esha"],
    "Marks": [82, 35, 67, 91, 58],
})
fig = px.bar(df, x="Name", y="Marks", title="Marks by student")
fig.show()`,tests:[{post:l("fig")+g("Marks by student")+`assert _f.data[0].type == "bar", "Use px.bar."
assert ${j("_f.data[0].y")} == [82, 35, 67, 91, 58], "y should be the Marks column."
`+u}],hints:["Hover the bars once the chart appears below — it's a live web chart."],solution:`import pandas as pd
import plotly.express as px

df = pd.DataFrame({
    "Name": ["Asha", "Ben", "Chen", "Dev", "Esha"],
    "Marks": [82, 35, 67, 91, 58],
})
fig = px.bar(df, x="Name", y="Marks", title="Marks by student")
fig.show()`},line:{...c,id:"line",kind:"write",title:"Revenue over time",task:e.jsxs(e.Fragment,{children:["Load the shop's ",e.jsx("code",{children:"sales.csv"})," (12.2), add Revenue and Month (",e.jsx("code",{children:"Date.str[:7]"}),"), and total Revenue per Month. plotly wants a DataFrame, so finish with ",e.jsx("code",{children:".reset_index()"}),". Draw ",e.jsx("code",{children:'fig = px.line(monthly, x="Month", y="Revenue", markers=True, title="Revenue by month")'})," and show it. Hidden tests use another shop."]}),tests:[{setup:r("sales.csv",m),post:b(m)},{setup:r("sales.csv",x),post:b(x),hidden:!0}],requires:[{call:"line"},{call:"groupby"}],hints:['monthly = df.groupby("Month")["Revenue"].sum().reset_index()',"reset_index turns the grouped Series back into a table with Month and Revenue columns."],solution:`import pandas as pd
import plotly.express as px

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
df["Month"] = df["Date"].str[:7]
monthly = df.groupby("Month")["Revenue"].sum().reset_index()
fig = px.line(monthly, x="Month", y="Revenue", markers=True, title="Revenue by month")
fig.show()`},scatter:{...c,id:"scatter",kind:"write",title:"Hover to see who",task:e.jsxs(e.Fragment,{children:["Load ",e.jsx("code",{children:"study.csv"})," (13.2). Draw ",e.jsx("code",{children:"fig = px.scatter(…)"})," of Hours (x) against Score (y), coloured by Dept, with ",e.jsx("code",{children:'hover_data=["Name"]'})," so hovering a dot shows whose it is. Title it ",e.jsx("code",{children:"Hours vs score"}),". Click a department in the legend to hide it — interactivity for free."]}),tests:[{setup:r("study.csv",p),post:S(p)},{setup:r("study.csv",h),post:S(h),hidden:!0}],requires:[{call:"scatter"},{call:"read_csv"}],hints:['px.scatter(df, x="Hours", y="Score", color="Dept", hover_data=["Name"], title="Hours vs score")'],solution:`import pandas as pd
import plotly.express as px

df = pd.read_csv("study.csv")
fig = px.scatter(df, x="Hours", y="Score", color="Dept", hover_data=["Name"], title="Hours vs score")
fig.show()`},pie:{...c,id:"pie",kind:"complete",title:"A donut chart",task:e.jsxs(e.Fragment,{children:["Fill the blanks: total Revenue per Category from sales.csv, then ",e.jsx("code",{children:"px.pie"})," with ",e.jsx("code",{children:"values"})," = the Revenue column, ",e.jsx("code",{children:"names"})," = the Category column, and ",e.jsx("code",{children:"hole=0.4"})," to make a donut."]}),starter:`import pandas as pd
import plotly.express as px

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
by_cat = df.groupby("Category")["Revenue"].sum().reset_index()
fig = px.pie(by_cat, values=___, names=___, hole=___, title="Where the money comes from")
fig.show()`,tests:[{setup:r("sales.csv",m),post:k(m)},{setup:r("sales.csv",x),post:k(x),hidden:!0}],requires:[{call:"pie"}],hints:['values="Revenue", names="Category", hole=0.4'],solution:`import pandas as pd
import plotly.express as px

df = pd.read_csv("sales.csv")
df["Revenue"] = df["Qty"] * df["Price"]
by_cat = df.groupby("Category")["Revenue"].sum().reset_index()
fig = px.pie(by_cat, values="Revenue", names="Category", hole=0.4, title="Where the money comes from")
fig.show()`},style:{...c,id:"style",kind:"type",title:"Polish the figure",task:e.jsxs(e.Fragment,{children:["Once a figure exists, change it: ",e.jsx("code",{children:"update_layout"})," for the whole chart (titles, theme), ",e.jsx("code",{children:"update_traces"})," for the marks themselves (colour, text)."]}),show:`import pandas as pd
import plotly.express as px

df = pd.DataFrame({"Name": ["Asha", "Ben", "Chen"], "Marks": [82, 35, 67]})
fig = px.bar(df, x="Name", y="Marks", text="Marks")
fig.update_layout(title="Marks", xaxis_title="Student", template="plotly_white")
fig.update_traces(marker_color="teal", textposition="outside")
fig.show()`,tests:[{post:l("fig")+`assert _f.layout.xaxis.title.text == "Student", "update_layout(xaxis_title=\\"Student\\")"
assert _f.data[0].marker.color == "teal", "update_traces(marker_color=\\"teal\\")"
assert _f.data[0].textposition == "outside", "update_traces(textposition=\\"outside\\")"
assert _f.layout.template.layout.paper_bgcolor == "white", "template=\\"plotly_white\\""
`+u}],hints:['text="Marks" writes each value on its bar; textposition moves it above.'],solution:`import pandas as pd
import plotly.express as px

df = pd.DataFrame({"Name": ["Asha", "Ben", "Chen"], "Marks": [82, 35, 67]})
fig = px.bar(df, x="Name", y="Marks", text="Marks")
fig.update_layout(title="Marks", xaxis_title="Student", template="plotly_white")
fig.update_traces(marker_color="teal", textposition="outside")
fig.show()`},explorer:{...c,id:"explorer",kind:"make",title:"Interactive class explorer",task:e.jsxs(e.Fragment,{children:["Load study.csv. Print ",e.jsx("code",{children:"Students: 12"})," and ",e.jsx("code",{children:"Top student: Isha (95)"})," (the highest Score). Then build two figures and show both: ",e.jsx("code",{children:"fig1"})," — ",e.jsx("code",{children:"px.histogram"})," of Score coloured by Dept, ",e.jsx("code",{children:"nbins=5"}),", titled ",e.jsx("code",{children:"Score distribution"}),"; ",e.jsx("code",{children:"fig2"})," — ",e.jsx("code",{children:"px.scatter"})," of Hours vs Score coloured by Dept, dot ",e.jsx("code",{children:'size="Sleep"'})," and ",e.jsx("code",{children:'hover_name="Name"'}),". Hidden tests use another class."]}),minLines:10,tests:[{setup:r("study.csv",p),expect:w(p),post:C(p)},{setup:r("study.csv",h),expect:w(h),post:C(h),hidden:!0,why:"Another class: count and find the top student from the DataFrame."}],requires:[{call:"histogram"},{call:"scatter"}],hints:['top = df.loc[df["Score"].idxmax()] — a whole row; top["Name"], top["Score"]','fig1 = px.histogram(df, x="Score", color="Dept", nbins=5, title="Score distribution")','fig2 = px.scatter(df, x="Hours", y="Score", color="Dept", size="Sleep", hover_name="Name")'],solution:`import pandas as pd
import plotly.express as px

df = pd.read_csv("study.csv")
top = df.loc[df["Score"].idxmax()]
print(f"Students: {len(df)}")
print(f"Top student: {top['Name']} ({top['Score']})")

fig1 = px.histogram(df, x="Score", color="Dept", nbins=5, title="Score distribution")
fig1.show()
fig2 = px.scatter(df, x="Hours", y="Score", color="Dept", size="Sleep", hover_name="Name", title="Hours vs score (dot size = sleep)")
fig2.show()`}},A=i,$=[{q:"What makes a plotly chart different from a matplotlib one?",options:["It's prettier","It's interactive: hover, zoom, hide series — it lives in a web page","It's faster","It doesn't need data"],answer:1,explain:"plotly draws with JavaScript in the browser."},{q:'px.scatter(df, x="Hours", y="Score", color="Dept") creates…',options:["One trace","One trace per department, each its own colour","A bar chart","A legend only"],answer:1,explain:"color splits the data into groups, like seaborn's hue."},{q:'hover_data=["Name"] …',options:["Hides names","Adds the Name column to the hover box","Sorts by Name","Colours by Name"],answer:1,explain:"Extra columns appear when you hover a point."},{q:"Why .reset_index() before px.line?",options:["To delete data","plotly wants columns in a DataFrame — reset_index turns the grouped Series into a table","To sort","It's required by pandas"],answer:1,explain:'Then x="Month" and y="Revenue" are real columns.'},{q:"update_traces vs update_layout?",options:["Same thing","traces = the marks (bars, dots, colours); layout = the chart around them (titles, axes, theme)","layout = colours","traces = titles"],answer:1,explain:"fig.update_traces(marker_color=…), fig.update_layout(title=…)."}];function z(t){const s=[{label:"The Recipe",kicker:"import plotly.express as px",title:"A chart you can touch",blocks:[e.jsxs(D,{children:["matplotlib and seaborn make pictures. ",e.jsx("strong",{children:"plotly"})," makes small web apps: every chart can be hovered, zoomed, panned and saved, and shared as a web page. ",e.jsx("code",{children:"plotly.express"})," builds a whole figure from a DataFrame in one call."]}),i.first]},{label:"Lines & Dots",kicker:"px.line · px.scatter",title:"Trends and links",blocks:[i.line,i.scatter]},{label:"Parts",kicker:"px.pie",title:"Parts of a whole",blocks:[i.pie]},{label:"Polish",kicker:"update_layout · update_traces",title:"Styling a figure",blocks:[i.style,e.jsx(N,{title:"share it",code:'fig.write_html("chart.html")   # a web page anyone can open — still interactive'})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: class explorer",blocks:[i.explorer,e.jsx(H,{children:"Pick the tool for the job: matplotlib for full control and print, seaborn for quick statistical pictures, plotly when people will explore the data themselves."}),e.jsx(R,{color:P.blue,icon:"🏁",children:`That's the whole journey: from print("Hello") to interactive dashboards. Next: the Finish Line.`})]}];return e.jsx(T,{...t,unitId:"Unit13_3",crumb:"MODULE 13 › 3",title:"Interactive Charts with Plotly",sections:s,quiz:$,next:{title:"The Finish Line",text:"Module 13 complete! Give your feedback and claim your course certificate."}})}export{A as EXERCISES,z as default};
