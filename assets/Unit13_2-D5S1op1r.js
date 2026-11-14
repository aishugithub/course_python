import{j as e}from"./index-BQ9ta_BJ.js";import{P as C,C as E,K as H,N as D,T,L as F}from"./Lesson-DNKKUv9k.js";const P={heatmap:`       Hours  Sleep  Phone  Score
Hours   1.00   0.71  -0.83   0.98
Sleep   0.71   1.00  -0.51   0.72
Phone  -0.83  -0.51   1.00  -0.87
Score   0.98   0.72  -0.87   1.00`},c=(t,s)=>`with open(${JSON.stringify(t)}, "w") as _f:
    _f.write(${JSON.stringify(s)})`,m={timeoutMs:3e4},h=t=>JSON.stringify(t),u=`import matplotlib.pyplot as _plt
assert _plt.get_fignums(), "No chart was drawn."
_fig = _plt.gcf()
_fig.canvas.draw()
_ax = _fig.axes[0]
_ticks = lambda a: [t.get_text() for t in a.get_xticklabels()]
`,b=t=>`assert _ax.get_title().strip().lower() == ${h(t.toLowerCase())}, "The title should be ${t} — it is '" + _ax.get_title() + "'."
`,a=`Name,Dept,Hours,Sleep,Phone,Score
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
`,d=`Name,Dept,Hours,Sleep,Phone,Score
Arun,CIVIL,2,7,7,30
Bala,CSE,4,6,2,85
Cara,CIVIL,3,8,6,45
Dina,CSE,5,5,3,90
Eli,ECE,1,7,5,40
Fay,ECE,6,6,4,70
`,x=t=>{const[s,...o]=t.trim().split(`
`),r=s.split(",");return o.map(l=>Object.fromEntries(l.split(",").map((n,i)=>[r[i],isNaN(+n)?n:+n])))},f=t=>[...new Set(x(t).map(s=>s.Dept))],j=t=>{const s=x(t);return f(t).map(o=>[o,s.filter(r=>r.Dept===o).map(r=>r.Score)])},g=t=>t.reduce((s,o)=>s+o,0)/t.length,$=t=>{const s=[...t].sort((r,l)=>r-l),o=s.length;return o%2?s[(o-1)/2]:(s[o/2-1]+s[o/2])/2},N=(t,s)=>{const o=g(t),r=g(s);let l=0,n=0,i=0;return t.forEach((_,w)=>{l+=(_-o)*(s[w]-r),n+=(_-o)**2,i+=(s[w]-r)**2}),l/Math.sqrt(n*i)},I=t=>{const s=t.toFixed(2);return s==="-0.00"?"0.00":s},S=t=>[...j(t)].sort((s,o)=>s[0]<o[0]?-1:1).map(([s,o])=>`${s}: ${$(o).toFixed(1)}`).join(`
`),y=t=>{const s=x(t),o=s.map(n=>n.Score),r=["Hours","Sleep","Phone"].map(n=>[n,N(s.map(i=>i[n]),o)]),l=r.reduce((n,i)=>Math.abs(i[1])>Math.abs(n[1])?i:n);return{text:[...r.map(([n,i])=>`${n}: ${I(i)}`),`Strongest link: ${l[0]} (${l[1]>0?"positive":"negative"})`].join(`
`),best:l[0]}},M=t=>u+b("Average score by department")+`assert _ticks(_ax) == ${h(f(t))}, "One bar per department."
assert [round(p.get_height(), 2) for p in _ax.patches] == ${h(j(t).map(([,s])=>Math.round(g(s)*100)/100))}, "Bar heights should be the mean Score per department: sns.barplot(data=df, x=\\"Dept\\", y=\\"Score\\")"
`,v=t=>u+b("Hours vs score")+`assert _ax.collections and len(_ax.collections[0].get_offsets()) == ${x(t).length}, "Plot every student: sns.scatterplot(data=df, x=\\"Hours\\", y=\\"Score\\", ...)"
assert _ax.get_xlabel() == "Hours" and _ax.get_ylabel() == "Score", "x should be Hours and y Score."
_L = _ax.get_legend()
assert _L is not None and [t.get_text() for t in _L.get_texts()] == ${h(f(t))}, "Colour the points by department: hue=\\"Dept\\""
`,k=t=>{const s=y(t).best;return u+`assert _ax.get_xlabel() == ${h(s)} and _ax.get_ylabel() == "Score", "Plot the strongest factor (${s}) on x against Score on y."
assert _ax.get_title() == ${h(s+" vs Score")}, "Title the chart: ${s} vs Score"
assert len(_ax.collections) >= 1, "Use sns.regplot to draw the points and the trend line."
assert len(_ax.get_lines()) >= 1, "sns.regplot also draws the trend line — use regplot."
`},p={barplot:{...m,id:"barplot",kind:"type",title:"One line, one statistical chart",task:e.jsxs(e.Fragment,{children:["seaborn works directly with DataFrames: name the ",e.jsx("code",{children:"data"}),", the ",e.jsx("code",{children:"x"})," column and the ",e.jsx("code",{children:"y"})," column. ",e.jsx("code",{children:"sns.barplot"})," works out each group's ",e.jsx("strong",{children:"mean"})," by itself, and the black line on each bar shows how uncertain that mean is."]}),show:`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme()
df = pd.read_csv("study.csv")
sns.barplot(data=df, x="Dept", y="Score")
plt.title("Average score by department")
plt.show()`,tests:[{setup:c("study.csv",a),post:M(a)}],hints:["No groupby needed — barplot averages each department itself."],solution:`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme()
df = pd.read_csv("study.csv")
sns.barplot(data=df, x="Dept", y="Score")
plt.title("Average score by department")
plt.show()`},hist:{...m,id:"hist",kind:"complete",title:"How are the scores spread?",task:e.jsxs(e.Fragment,{children:["A ",e.jsx("strong",{children:"histogram"})," shows a distribution: it cuts the range of scores into ",e.jsx("em",{children:"bins"})," and draws how many students fall in each. Fill the blanks: a histplot of ",e.jsx("code",{children:"Score"})," with 5 bins, titled ",e.jsx("code",{children:"Score distribution"}),"."]}),starter:`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("study.csv")
sns.histplot(data=df, x=___, bins=___)
plt.title(___)
plt.show()`,tests:[{setup:c("study.csv",a),post:u+b("Score distribution")+`assert len(_ax.patches) == 5, "Use bins=5."
assert sum(p.get_height() for p in _ax.patches) == 12, "Every student should be counted once — x=\\"Score\\""
assert _ax.get_xlabel() == "Score", "Put Score on the x-axis."
`}],hints:['x="Score", bins=5','plt.title("Score distribution")'],solution:`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("study.csv")
sns.histplot(data=df, x="Score", bins=5)
plt.title("Score distribution")
plt.show()`},box:{...m,id:"box",kind:"write",title:"Box plots: spread per group",task:e.jsxs(e.Fragment,{children:["A ",e.jsx("strong",{children:"box plot"})," summarises a group in one shape: the line inside the box is the ",e.jsx("em",{children:"median"}),", the box holds the middle half of the values, and the whiskers reach the rest. Draw ",e.jsx("code",{children:'sns.boxplot(data=df, x="Dept", y="Score")'})," titled ",e.jsx("code",{children:"Scores by department"}),". Then print each department's median with pandas (alphabetical, 1 decimal place): ",e.jsx("code",{children:"CSE: 74.0"}),"."]}),tests:[{setup:c("study.csv",a),expect:S(a),post:u+b("Scores by department")+`assert _ticks(_ax) == ${h(f(a))}, "One box per department: x=\\"Dept\\", y=\\"Score\\""
`},{setup:c("study.csv",d),expect:S(d),hidden:!0}],requires:[{call:"boxplot"},{call:"median"}],hints:['meds = df.groupby("Dept")["Score"].median()','for dept, m in meds.items(): print(f"{dept}: {m:.1f}")'],solution:`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("study.csv")
sns.boxplot(data=df, x="Dept", y="Score")
plt.title("Scores by department")
plt.show()

meds = df.groupby("Dept")["Score"].median()
for dept, m in meds.items():
    print(f"{dept}: {m:.1f}")`},hue:{...m,id:"hue",kind:"write",title:"The hue superpower",task:e.jsxs(e.Fragment,{children:["Add ",e.jsx("code",{children:'hue="Dept"'})," and seaborn colours every point by department and adds the legend itself. Draw a scatterplot of ",e.jsx("code",{children:"Hours"})," (x) against ",e.jsx("code",{children:"Score"})," (y), coloured by Dept, titled ",e.jsx("code",{children:"Hours vs score"}),"."]}),tests:[{setup:c("study.csv",a),post:v(a)},{setup:c("study.csv",d),post:v(d),hidden:!0}],requires:[{call:"scatterplot"},{call:"read_csv"}],hints:['sns.scatterplot(data=df, x="Hours", y="Score", hue="Dept")','plt.title("Hours vs score")'],solution:`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("study.csv")
sns.scatterplot(data=df, x="Hours", y="Score", hue="Dept")
plt.title("Hours vs score")
plt.show()`},heatmap:{...m,id:"heatmap",kind:"complete",title:"Correlation heatmap",task:e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:"Correlation"})," (r) measures how strongly two columns move together: +1 = rise together, −1 = one rises as the other falls, 0 = no link. ",e.jsx("code",{children:"df[cols].corr()"})," computes every pair; a heatmap colours them. Fill the blanks: print the table rounded to 2 places, then draw it with ",e.jsx("code",{children:"annot=True"})," (numbers in the cells) and ",e.jsx("code",{children:'cmap="coolwarm"'}),"."]}),starter:`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("study.csv")
corr = df[["Hours", "Sleep", "Phone", "Score"]].___()
print(corr.round(___))
sns.heatmap(corr, annot=___, cmap=___)
plt.title("What goes with a good score?")
plt.show()`,tests:[{setup:c("study.csv",a),expect:P.heatmap,post:u+`assert len(_ax.texts) == 16, "Write the numbers in the cells: annot=True"
assert _ax.collections and _ax.collections[0].get_cmap().name == "coolwarm", "Use cmap=\\"coolwarm\\""
`}],requires:[{call:"corr"},{call:"heatmap"}],hints:[".corr()","corr.round(2)",'annot=True, cmap="coolwarm"'],solution:`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("study.csv")
corr = df[["Hours", "Sleep", "Phone", "Score"]].corr()
print(corr.round(2))
sns.heatmap(corr, annot=True, cmap="coolwarm")
plt.title("What goes with a good score?")
plt.show()`},link:{...m,id:"link",kind:"make",title:"Find the strongest link",task:e.jsxs(e.Fragment,{children:["Load study.csv. For each of ",e.jsx("code",{children:"Hours"}),", ",e.jsx("code",{children:"Sleep"}),", ",e.jsx("code",{children:"Phone"}),", print its correlation with Score (2 places): ",e.jsx("code",{children:"Hours: 0.98"})," (tip: ",e.jsx("code",{children:'df["Hours"].corr(df["Score"])'}),"). Find the factor with the ",e.jsx("strong",{children:"largest absolute"})," correlation and print ",e.jsx("code",{children:"Strongest link: Hours (positive)"})," — or ",e.jsx("code",{children:"(negative)"}),". Then plot that factor against Score with ",e.jsx("code",{children:"sns.regplot"})," (points plus a trend line), titled ",e.jsx("code",{children:"Hours vs Score"})," (the factor's name). Hidden tests use another class — whose strongest link may be different."]}),minLines:14,tests:[{setup:c("study.csv",a),expect:y(a).text,post:k(a)},{setup:c("study.csv",d),expect:y(d).text,post:k(d),hidden:!0,why:"In this class a different factor matters most — pick it with abs(), don't assume Hours."}],requires:[{call:"regplot"},{call:"corr"},{call:"abs"}],hints:['for f in ["Hours", "Sleep", "Phone"]: r = df[f].corr(df["Score"])',"Keep track of the best: if abs(r) > abs(best_r): …",'sns.regplot(data=df, x=best, y="Score"); plt.title(f"{best} vs Score")'],solution:`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("study.csv")
best, best_r = None, 0
for f in ["Hours", "Sleep", "Phone"]:
    r = df[f].corr(df["Score"])
    print(f"{f}: {r:.2f}")
    if abs(r) > abs(best_r):
        best, best_r = f, r

direction = "positive" if best_r > 0 else "negative"
print(f"Strongest link: {best} ({direction})")
sns.regplot(data=df, x=best, y="Score")
plt.title(f"{best} vs Score")
plt.show()`}},A=p,O=[{q:"What does sns.barplot show on each bar by default?",options:["The total","The mean, with an error bar for its uncertainty","The median","The count"],answer:1,explain:'Use estimator="sum" if you want totals instead.'},{q:"A histogram shows…",options:["Categories compared","How values are distributed across ranges (bins)","A trend over time","Parts of a whole"],answer:1,explain:"Each bar = how many values fall in that range."},{q:"In a box plot, the line inside the box is the…",options:["Mean","Median","Maximum","Mode"],answer:1,explain:"The box itself covers the middle 50% of values."},{q:"Correlation r = −0.9 between phone time and score means…",options:["No link","More phone time goes with lower scores, strongly","Phone time causes low scores","Higher scores go with more phone time"],answer:1,explain:"Strong negative link. Correlation alone doesn't prove one causes the other!"},{q:'What does hue="Dept" do?',options:["Sorts by Dept","Colours each point by its department and adds a legend","Filters to one department","Nothing"],answer:1,explain:"hue splits the data into coloured groups."}];function q(t){const s=[{label:"The One-Liner",kicker:"import seaborn as sns",title:"Statistical charts in one line",blocks:[e.jsxs(C,{children:[e.jsx("strong",{children:"seaborn"})," is built on matplotlib, but it thinks in DataFrames and statistics: give it the table and the column names, and it averages, counts and colours for you. Our data: twelve students' study hours, sleep, phone time and exam score."]}),e.jsx(E,{title:"study.csv (first rows)",code:a.split(`
`).slice(0,5).join(`
`)+`
…`}),p.barplot]},{label:"Distributions",kicker:"histplot · boxplot",title:"How are values spread?",blocks:[p.hist,p.box,e.jsx(H,{children:"An average hides a lot. Two departments with the same mean can be very different — one tightly bunched, one spread from 30 to 95. Always look at the distribution."})]},{label:"hue",kicker:"COLOUR BY GROUP",title:"The hue superpower",blocks:[p.hue]},{label:"Correlation",kicker:"−1 … 0 … +1",title:"What goes with what?",blocks:[p.heatmap,e.jsx(D,{color:T.orange,icon:"⚠️",children:"Correlation is not causation. Students who study more may also sleep more and sit at the front — the chart shows a link, not the reason."})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: find the strongest link",blocks:[p.link]}];return e.jsx(F,{...t,unitId:"Unit13_2",crumb:"MODULE 13 › 2",title:"Statistical Charts with Seaborn",sections:s,quiz:O,next:{title:"13.3 — Interactive Charts with Plotly",text:"Charts you can hover, zoom and share."}})}export{A as EXERCISES,q as default};
