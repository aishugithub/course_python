import{j as e}from"./index-BsB65IVi.js";import{P as b,C as R,K as q,L as y}from"./Lesson-M2Z85AvF.js";const g=i=>({text:"#",min:i,msg:`Write your algorithm first, as at least ${i} # comment lines.`}),m=i=>[`Rows: ${i.length}`,...i.map(r=>`Row: ${r}`)],u=i=>i.map(r=>r.split(" ").map(Number)),f=i=>"["+i.join(", ")+"]",x=i=>{const r=u(i);return[...m(i),`Row sums: ${f(r.map(a=>a.reduce((n,s)=>n+s,0)))}`,`Column sums: ${f(r[0].map((a,n)=>r.reduce((s,o)=>s+o[n],0)))}`].join(`
`)},j=i=>{const r=u(i);return[...m(i),...r[0].map((a,n)=>r.map(s=>s[n]).join(" "))].join(`
`)},k=i=>{const r=u(i),a=r.length;let n=0,s=0;for(let o=0;o<a;o++)n+=r[o][o],s+=r[o][a-1-o];return[...m(i),`Main diagonal: ${n}`,`Other diagonal: ${s}`].join(`
`)},p=i=>{const r=u(i),a=r.length,n=r[0].reduce((t,d)=>t+d,0);let s=!0;for(let t=0;t<a;t++)r[t].reduce((d,h)=>d+h,0)!==n&&(s=!1),r.reduce((d,h)=>d+h[t],0)!==n&&(s=!1);let o=0,w=0;for(let t=0;t<a;t++)o+=r[t][t],w+=r[t][a-1-t];return(o!==n||w!==n)&&(s=!1),[...m(i),s?`Magic square! Every line sums to ${n}`:"Not a magic square"].join(`
`)},c=`n = int(input("Rows: "))
grid = []
for r in range(n):
    row = []
    for x in input("Row: ").split():
        row.append(int(x))
    grid.append(row)`,l={sums:{id:"sums",kind:"write",title:"Row and column sums",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Rows: "}),", then read each row with ",e.jsx("code",{children:"Row: "})," (numbers separated by spaces) into a list of lists. Print ",e.jsx("code",{children:"Row sums: [6, 15, 24]"})," and ",e.jsx("code",{children:"Column sums: [12, 15, 18]"}),". Column sums need ",e.jsx("code",{children:"grid[r][c]"})," with the loops the other way round."]}),minLines:16,tests:[{inputs:["3","1 2 3","4 5 6","7 8 9"],expect:x(["1 2 3","4 5 6","7 8 9"])},{inputs:["2","10 0 5 1","1 1 1 1"],expect:x(["10 0 5 1","1 1 1 1"]),hidden:!0}],requires:[g(3),{node:"For",min:3}],hints:["Rows: for row in grid: row_sums.append(sum(row))","Columns: for c in range(len(grid[0])): total = 0; for r in range(len(grid)): total += grid[r][c]"],solution:`# 1. read the grid row by row into a list of lists
# 2. row sums: add along each row
# 3. column sums: for each column, add down the rows
${c}
row_sums = []
for row in grid:
    row_sums.append(sum(row))
col_sums = []
for c in range(len(grid[0])):
    total = 0
    for r in range(len(grid)):
        total += grid[r][c]
    col_sums.append(total)
print(f"Row sums: {row_sums}")
print(f"Column sums: {col_sums}")`},transpose:{id:"transpose",kind:"write",title:"Transpose",task:e.jsxs(e.Fragment,{children:["Read a grid as before. Print its ",e.jsx("strong",{children:"transpose"})," — rows become columns — one row per line, numbers separated by spaces. A 2 × 3 grid becomes 3 × 2."]}),minLines:14,tests:[{inputs:["2","1 2 3","4 5 6"],expect:j(["1 2 3","4 5 6"])},{inputs:["3","1 2","3 4","5 6"],expect:j(["1 2","3 4","5 6"]),hidden:!0}],requires:[g(2),{node:"For",min:3}],hints:['Outer loop over columns c, inner over rows r: print(grid[r][c], end=" "); print() after each.'],solution:`# 1. read the grid
# 2. new row c = old column c: walk columns outside, rows inside
${c}
for c in range(len(grid[0])):
    for r in range(len(grid)):
        print(grid[r][c], end=" ")
    print()`},diagonals:{id:"diagonals",kind:"write",title:"The two diagonals",task:e.jsxs(e.Fragment,{children:["Read a ",e.jsx("strong",{children:"square"})," grid. The main diagonal is ",e.jsx("code",{children:"grid[i][i]"}),"; the other runs from top-right to bottom-left: ",e.jsx("code",{children:"grid[i][n - 1 - i]"}),". Print ",e.jsx("code",{children:"Main diagonal: 15"})," and ",e.jsx("code",{children:"Other diagonal: 15"}),". One loop is enough."]}),minLines:12,tests:[{inputs:["3","1 2 3","4 5 6","7 8 9"],expect:k(["1 2 3","4 5 6","7 8 9"])},{inputs:["2","5 1","2 9"],expect:k(["5 1","2 9"]),hidden:!0}],requires:[g(2)],hints:["for i in range(n): main += grid[i][i]; other += grid[i][n - 1 - i]"],solution:`# 1. read the square grid
# 2. one loop: add grid[i][i] and grid[i][n-1-i]
${c}
main = 0
other = 0
for i in range(n):
    main += grid[i][i]
    other += grid[i][n - 1 - i]
print(f"Main diagonal: {main}")
print(f"Other diagonal: {other}")`},magic:{id:"magic",kind:"make",title:"Magic square checker",task:e.jsxs(e.Fragment,{children:["A magic square has every row, every column and both diagonals adding to the same number. Read a square grid and print ",e.jsx("code",{children:"Magic square! Every line sums to 15"})," or ",e.jsx("code",{children:"Not a magic square"}),". Use a flag (CT1.3): assume magic, and any line with a different sum disproves it."]}),minLines:24,tests:[{inputs:["3","2 7 6","9 5 1","4 3 8"],expect:p(["2 7 6","9 5 1","4 3 8"])},{inputs:["3","1 2 3","4 5 6","7 8 9"],expect:p(["1 2 3","4 5 6","7 8 9"]),hidden:!0},{inputs:["3","2 7 6","9 5 1","4 8 3"],expect:p(["2 7 6","9 5 1","4 8 3"]),hidden:!0}],requires:[g(4)],hints:["target = sum(grid[0]); is_magic = True","Check every row, every column, then both diagonals; any mismatch → is_magic = False.","The third hidden test has correct rows but a wrong column."],solution:`# 1. read the square grid; target = first row's sum
# 2. assume magic
# 3. any row, column or diagonal with another sum disproves it
# 4. print the verdict
${c}
target = sum(grid[0])
is_magic = True
for i in range(n):
    if sum(grid[i]) != target:
        is_magic = False
    col = 0
    for r in range(n):
        col += grid[r][i]
    if col != target:
        is_magic = False
d1 = 0
d2 = 0
for i in range(n):
    d1 += grid[i][i]
    d2 += grid[i][n - 1 - i]
if d1 != target or d2 != target:
    is_magic = False
if is_magic:
    print(f"Magic square! Every line sums to {target}")
else:
    print("Not a magic square")`}},v=l,T=[{q:"grid = [[1, 2, 3], [4, 5, 6]]. What is grid[1][2]?",options:["2","5","6","4"],answer:2,explain:"Row 1 is [4, 5, 6]; its index 2 is 6."},{q:"To sum a column, which loop is on the outside?",options:["Rows","Columns — then walk down the rows inside","Either; it doesn't matter for the order of output","Neither"],answer:1,explain:"For each column c, add grid[r][c] for every row r."},{q:"The transpose of a 2 × 3 grid has shape…",options:["2 × 3","3 × 2","3 × 3","2 × 2"],answer:1,explain:"Rows become columns."},{q:"Which index pattern is the top-right to bottom-left diagonal?",options:["grid[i][i]","grid[i][n - 1 - i]","grid[n][i]","grid[i][0]"],answer:1,explain:"As the row goes down, the column goes left."}];function C(i){const r=[{label:"Grids",kicker:"LISTS OF LISTS",title:"A matrix is a list of rows",blocks:[e.jsxs(b,{children:["Images, spreadsheets, game boards and seating plans are all grids. In Python, a grid is a list of lists: ",e.jsx("code",{children:"grid[r][c]"})," is row r, column c (Unit 7.2). Every grid algorithm is a double loop with a different line in the middle."]}),e.jsx("div",{style:{maxWidth:640},children:e.jsx(R,{title:"reading a grid",code:c})}),l.sums]},{label:"Reshape",kicker:"TRANSPOSE · DIAGONALS",title:"Walking a grid in other orders",blocks:[l.transpose,l.diagonals,e.jsxs(q,{children:["Rows: ",e.jsx("code",{children:"grid[r]"}),". Column c: ",e.jsx("code",{children:"grid[r][c]"})," for every r. Diagonals: ",e.jsx("code",{children:"grid[i][i]"})," and ",e.jsx("code",{children:"grid[i][n-1-i]"}),"."]})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: magic square checker",blocks:[l.magic]}];return e.jsx(y,{...i,unitId:"UnitCT2_4",crumb:"COMPUTATIONAL THINKING II › 4",title:"Matrices: Grids of Data",sections:r,quiz:T,next:{title:"CT II · 5 — String Algorithms",text:"Palindromes, anagrams, frequency counts and a secret-code cipher."}})}export{v as EXERCISES,C as default};
