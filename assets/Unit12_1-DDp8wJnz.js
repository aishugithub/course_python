import{j as e}from"./index-CD7nmDt6.js";import{P as c,K as p,N as m,T as h,L as u}from"./Lesson-MmSVdMEX.js";const s={series:`Asha    82
Ben     45
Chen    67
Dev     91
dtype: int64
67
71.25
Asha    82
Chen    67
Dev     91
dtype: int64`,frame:`   Name Dept  Marks
0  Asha  CSE     82
1   Ben  ECE     45
2  Chen  CSE     67
(3, 3)
['Name', 'Dept', 'Marks']`,readcsv:`Rows: 5, Columns: 3
   Name Dept  Marks
0  Asha  CSE     82
1   Ben  ECE     35
2  Chen  CSE     67`,readcsv2:`Rows: 7, Columns: 3
    Name  Dept  Marks
0  Farah   CSE     73
1  Gopal  MECH     38
2   Hari   ECE     88`,stats:`Students: 5
Average: 66.60
Highest: 91
Lowest: 35`,stats2:`Students: 7
Average: 67.71
Highest: 95
Lowest: 38`,select:`   Name  Marks
0  Asha     82
1   Ben     35
2  Chen     67
3   Dev     91
4  Esha     58
   Name  Dept  Marks
0  Asha   CSE     82
2  Chen   CSE     67
3   Dev  MECH     91
   Name Dept  Marks
0  Asha  CSE     82`,filter:`Department: CSE
   Name  Marks
0  Asha     82
2  Chen     67
Count: 2`,filter2:`Department: MECH
    Name  Marks
1  Gopal     38
4    Jay     61
Count: 2`,newcol:`   Name  Dept  Marks  Percent Result
3   Dev  MECH     91     75.8   Pass
0  Asha   CSE     82     68.3   Pass
2  Chen   CSE     67     55.8   Pass
4  Esha   ECE     58     48.3   Pass
1   Ben   ECE     35     29.2   Fail`,newcol2:`    Name  Dept  Marks  Percent Result
3   Isha   CSE     95     79.2   Pass
2   Hari   ECE     88     73.3   Pass
0  Farah   CSE     73     60.8   Pass
6   Lina   CSE     70     58.3   Pass
4    Jay  MECH     61     50.8   Pass
5   Kavi   ECE     49     40.8   Pass
1  Gopal  MECH     38     31.7   Fail`,top:`Name  Marks Grade
 Dev     91     A
Asha     82     B
Chen     67     C
Pass rate: 80.0%`,top2:` Name  Marks Grade
 Isha     95     A
 Hari     88     B
Farah     73     C
Pass rate: 85.7%`},n=(d,o)=>`with open(${JSON.stringify(d)}, "w") as _f:
    _f.write(${JSON.stringify(o)})`,r=`Name,Dept,Marks
Asha,CSE,82
Ben,ECE,35
Chen,CSE,67
Dev,MECH,91
Esha,ECE,58
`,l=`Name,Dept,Marks
Farah,CSE,73
Gopal,MECH,38
Hari,ECE,88
Isha,CSE,95
Jay,MECH,61
Kavi,ECE,49
Lina,CSE,70
`,t={timeoutMs:2e4},i=(...d)=>d.map(o=>({call:o})),a={series:{...t,id:"series",kind:"type",title:"A Series: one labelled column",task:e.jsxs(e.Fragment,{children:["pandas is the most-used data tool in Python. Its simplest object is a ",e.jsx("strong",{children:"Series"}),": a list of values with a label (the ",e.jsx("em",{children:"index"}),") on each one. Maths and comparisons work on the whole Series at once — no loop."]}),show:`import pandas as pd

marks = pd.Series([82, 45, 67, 91], index=["Asha", "Ben", "Chen", "Dev"])
print(marks)
print(marks["Chen"])
print(marks.mean())
print(marks[marks >= 60])`,tests:[{expect:s.series}],requires:i("Series"),hints:["marks >= 60 gives True/False for every student; marks[…] keeps the True ones."],solution:`import pandas as pd

marks = pd.Series([82, 45, 67, 91], index=["Asha", "Ben", "Chen", "Dev"])
print(marks)
print(marks["Chen"])
print(marks.mean())
print(marks[marks >= 60])`},frame:{...t,id:"frame",kind:"type",title:"A DataFrame: a whole table",task:e.jsxs(e.Fragment,{children:["A ",e.jsx("strong",{children:"DataFrame"})," is a table: named columns (each one a Series) sharing one row index. Build one from a dictionary of lists — each key becomes a column."]}),show:`import pandas as pd

data = {
    "Name": ["Asha", "Ben", "Chen"],
    "Dept": ["CSE", "ECE", "CSE"],
    "Marks": [82, 45, 67],
}
df = pd.DataFrame(data)
print(df)
print(df.shape)
print(list(df.columns))`,tests:[{expect:s.frame}],requires:i("DataFrame"),hints:["shape is (rows, columns). The 0, 1, 2 on the left is the index pandas adds."],solution:`import pandas as pd

data = {
    "Name": ["Asha", "Ben", "Chen"],
    "Dept": ["CSE", "ECE", "CSE"],
    "Marks": [82, 45, 67],
}
df = pd.DataFrame(data)
print(df)
print(df.shape)
print(list(df.columns))`},readcsv:{...t,id:"readcsv",kind:"write",title:"Load a CSV file",task:e.jsxs(e.Fragment,{children:["Real data arrives as files. ",e.jsx("code",{children:"marks.csv"})," is in the folder (below). Load it with ",e.jsx("code",{children:'pd.read_csv("marks.csv")'}),", then print ",e.jsx("code",{children:"Rows: 5, Columns: 3"})," (from ",e.jsx("code",{children:"df.shape"}),") and the first three rows with ",e.jsx("code",{children:"df.head(3)"}),". Hidden tests use a different marks.csv."]}),show:r,showLabel:"marks.csv — ALREADY IN THE FOLDER",tests:[{setup:n("marks.csv",r),expect:s.readcsv},{setup:n("marks.csv",l),expect:s.readcsv2,hidden:!0,why:"This marks.csv has 7 rows — read the numbers from df.shape."}],requires:i("read_csv","head"),hints:['df = pd.read_csv("marks.csv")',"rows, cols = df.shape","print(df.head(3))"],solution:`import pandas as pd

df = pd.read_csv("marks.csv")
rows, cols = df.shape
print(f"Rows: {rows}, Columns: {cols}")
print(df.head(3))`},stats:{...t,id:"stats",kind:"write",title:"Ask a column a question",task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:'df["Marks"]'})," picks one column (a Series), which knows ",e.jsx("code",{children:".mean()"}),", ",e.jsx("code",{children:".max()"}),", ",e.jsx("code",{children:".min()"}),", ",e.jsx("code",{children:".sum()"}),", ",e.jsx("code",{children:".count()"}),". Load marks.csv and print ",e.jsx("code",{children:"Students: 5"}),", ",e.jsx("code",{children:"Average: 66.60"}),", ",e.jsx("code",{children:"Highest: 91"}),", ",e.jsx("code",{children:"Lowest: 35"}),"."]}),tests:[{setup:n("marks.csv",r),expect:s.stats},{setup:n("marks.csv",l),expect:s.stats2,hidden:!0,why:"A different marks.csv — every number must come from the DataFrame."}],requires:i("read_csv","mean","max","min"),hints:['m = df["Marks"]','print(f"Average: {m.mean():.2f}")'],solution:`import pandas as pd

df = pd.read_csv("marks.csv")
m = df["Marks"]
print(f"Students: {m.count()}")
print(f"Average: {m.mean():.2f}")
print(f"Highest: {m.max()}")
print(f"Lowest: {m.min()}")`},select:{...t,id:"select",kind:"type",title:"Pick columns, filter rows",task:e.jsxs(e.Fragment,{children:["Two square-bracket moves. A ",e.jsx("strong",{children:"list of names"})," picks columns. A ",e.jsx("strong",{children:"True/False Series"})," picks rows (a ",e.jsx("em",{children:"mask"}),"). Combine masks with ",e.jsx("code",{children:"&"})," (and) and ",e.jsx("code",{children:"|"})," (or) — each condition in brackets."]}),show:`import pandas as pd

df = pd.read_csv("marks.csv")
print(df[["Name", "Marks"]])
print(df[df["Marks"] >= 60])
print(df[(df["Dept"] == "CSE") & (df["Marks"] > 70)])`,tests:[{setup:n("marks.csv",r),expect:s.select}],requires:i("read_csv"),hints:["Python's and / or don't work on whole columns — use & and |, with brackets around each condition."],solution:`import pandas as pd

df = pd.read_csv("marks.csv")
print(df[["Name", "Marks"]])
print(df[df["Marks"] >= 60])
print(df[(df["Dept"] == "CSE") & (df["Marks"] > 70)])`},filter:{...t,id:"filter",kind:"write",title:"Students of one department",task:e.jsxs(e.Fragment,{children:["Load marks.csv. Ask ",e.jsx("code",{children:"Department: "}),", keep only that department's rows, and print their ",e.jsx("code",{children:"Name"})," and ",e.jsx("code",{children:"Marks"})," columns, then ",e.jsx("code",{children:"Count: 2"}),". If nobody is in that department (",e.jsx("code",{children:"rows.empty"}),"), print ",e.jsx("code",{children:"No students in BIO"})," instead."]}),tests:[{setup:n("marks.csv",r),inputs:["CSE"],expect:s.filter},{setup:n("marks.csv",l),inputs:["MECH"],expect:s.filter2,hidden:!0},{setup:n("marks.csv",r),inputs:["BIO"],expect:`Department: BIO
No students in BIO`,hidden:!0,why:"When the filtered DataFrame is empty, print the No students message."}],requires:i("read_csv"),hints:['rows = df[df["Dept"] == dept]','if rows.empty: … else: print(rows[["Name", "Marks"]]) and len(rows)'],solution:`import pandas as pd

df = pd.read_csv("marks.csv")
dept = input("Department: ")
rows = df[df["Dept"] == dept]
if rows.empty:
    print(f"No students in {dept}")
else:
    print(rows[["Name", "Marks"]])
    print(f"Count: {len(rows)}")`},newcol:{...t,id:"newcol",kind:"complete",title:"New columns and sorting",task:e.jsxs(e.Fragment,{children:["Assigning to a new column name creates it, row by row: arithmetic works on the whole column, and ",e.jsx("code",{children:".apply(function)"})," runs your function on every value (a ",e.jsx("code",{children:"lambda"})," from 11.2 is perfect). The exam was out of 120. Fill the blanks: ",e.jsx("code",{children:"Percent"})," is Marks out of 120 as a percentage (rounded to 1 place), ",e.jsx("code",{children:"Result"}),' is "Pass" for 40 or more, and sort by Marks, highest first.']}),starter:`import pandas as pd

df = pd.read_csv("marks.csv")
df["Percent"] = (___).round(1)
df["Result"] = df["Marks"].apply(lambda m: ___)
df = df.sort_values("Marks", ascending=___)
print(df)`,tests:[{setup:n("marks.csv",r),expect:s.newcol},{setup:n("marks.csv",l),expect:s.newcol2,hidden:!0}],requires:i("apply","sort_values"),hints:['df["Marks"] / 120 * 100','"Pass" if m >= 40 else "Fail"',"ascending=False"],solution:`import pandas as pd

df = pd.read_csv("marks.csv")
df["Percent"] = (df["Marks"] / 120 * 100).round(1)
df["Result"] = df["Marks"].apply(lambda m: "Pass" if m >= 40 else "Fail")
df = df.sort_values("Marks", ascending=False)
print(df)`},top:{...t,id:"top",kind:"make",title:"Top performers",task:e.jsxs(e.Fragment,{children:["Load marks.csv. Write ",e.jsx("code",{children:"grade(m)"})," (A ≥ 90, B ≥ 75, C ≥ 60, D ≥ 40, else F) and add a ",e.jsx("code",{children:"Grade"})," column with ",e.jsx("code",{children:".apply(grade)"}),". Print the top three by marks — just ",e.jsx("code",{children:"Name"}),", ",e.jsx("code",{children:"Marks"}),", ",e.jsx("code",{children:"Grade"})," — using ",e.jsx("code",{children:"sort_values"})," and ",e.jsx("code",{children:".head(3)"}),", but with ",e.jsx("code",{children:"index=False"}),": ",e.jsx("code",{children:"print(top.to_string(index=False))"}),". Last, print ",e.jsx("code",{children:"Pass rate: 80.0%"})," (marks ≥ 40, one decimal)."]}),minLines:14,tests:[{setup:n("marks.csv",r),expect:s.top},{setup:n("marks.csv",l),expect:s.top2,hidden:!0,why:"A different marks.csv: compute everything from the DataFrame."}],requires:[...i("read_csv","apply","sort_values","head","to_string"),{node:"FunctionDef"}],hints:['df["Grade"] = df["Marks"].apply(grade)','top = df.sort_values("Marks", ascending=False).head(3)[["Name", "Marks", "Grade"]]','rate = (df["Marks"] >= 40).mean() * 100 — True counts as 1'],solution:`import pandas as pd

def grade(m):
    if m >= 90:
        return "A"
    elif m >= 75:
        return "B"
    elif m >= 60:
        return "C"
    elif m >= 40:
        return "D"
    return "F"

df = pd.read_csv("marks.csv")
df["Grade"] = df["Marks"].apply(grade)
top = df.sort_values("Marks", ascending=False).head(3)[["Name", "Marks", "Grade"]]
print(top.to_string(index=False))
rate = (df["Marks"] >= 40).mean() * 100
print(f"Pass rate: {rate:.1f}%")`}},w=a,f=[{q:"What is a DataFrame?",options:["A chart","A table: named columns sharing one row index","A single list","A CSV file"],answer:1,explain:"Each column of a DataFrame is a Series."},{q:"df.shape is (7, 3). That means…",options:["7 columns, 3 rows","7 rows, 3 columns","21 values missing","7 files"],answer:1,explain:"Always (rows, columns)."},{q:"Which keeps only rows with Marks of 60 or more?",options:['df["Marks" >= 60]','df[df["Marks"] >= 60]',"df.Marks(60)","df.filter(60)"],answer:1,explain:"The inside makes a True/False mask; the outside keeps the True rows."},{q:"Two conditions on columns are combined with…",options:["and","&, with brackets around each condition","+",","],answer:1,explain:'(df.A > 1) & (df.B == "x")'},{q:'df["Grade"] = df["Marks"].apply(grade) …',options:["Prints grades","Runs grade on every mark and stores the results as a new column","Sorts by grade","Deletes Marks"],answer:1,explain:"apply calls your function once per value."}];function v(d){const o=[{label:"Series",kicker:"import pandas as pd",title:"A labelled column",blocks:[e.jsxs(c,{children:["Lists and dictionaries got you far. But real data is tables: thousands of rows, many columns. ",e.jsx("strong",{children:"pandas"})," handles tables the way a spreadsheet does — except every step is code you can rerun."]}),a.series]},{label:"DataFrame",kicker:"ROWS × COLUMNS",title:"A whole table",blocks:[a.frame]},{label:"Read a CSV",kicker:"REAL FILES",title:"Load data from a file",blocks:[e.jsxs(c,{children:["A ",e.jsx("strong",{children:"CSV"})," file is a table in plain text: one line per row, commas between values, the first line holds the column names. Excel and Google Sheets can save as CSV."]}),a.readcsv,a.stats]},{label:"Select & Filter",kicker:"[ ] TWO WAYS",title:"Pick columns, keep rows",blocks:[a.select,a.filter]},{label:"New Columns",kicker:"apply · sort_values",title:"Add columns, sort rows",blocks:[a.newcol,e.jsx(p,{children:'Think in whole columns, not loops: df["Marks"] / 120 is 5 divisions in one step — or 5 million.'})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: top performers",blocks:[a.top,e.jsx(m,{color:h.blue,icon:"💡",children:"In Colab or Jupyter, typing just df on the last line of a cell shows a nicely formatted table. In a script, use print(df)."})]}];return e.jsx(u,{...d,unitId:"Unit12_1",crumb:"MODULE 12 › 1",title:"Meet Pandas: DataFrames",sections:o,quiz:f,next:{title:"12.2 — Analysing Real Data",text:"Group, aggregate, clean missing values, and save your results."}})}export{w as EXERCISES,v as default};
