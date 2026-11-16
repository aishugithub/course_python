import{j as n,r as b}from"./index-5ju0ARcj.js";import{P as h,N as v,T as t,K as _,L as y,a as u,t as f,M as j}from"./Lesson-B4adq15Q.js";function w(){const s=[{l:0,g:{x:10},f:null,d:"x = 10 lives in the global room (the main program)."},{l:3,g:{x:10},f:{},d:"Calling change() builds a NEW room just for this call."},{l:1,g:{x:10},f:{x:99},d:"Assignment inside a function creates a LOCAL x in the function's room. Same name, different variable."},{l:4,g:{x:10},f:null,d:"The function returned: its room is demolished, local x with it. The global x was never touched."}],a=["x = 10","def change():","    x = 99","change()","print(x)   # 10"],i=[0,3,2,4],[e,l]=b.useState(0),d=s[e],o=(m,c,p)=>n.jsxs("div",{style:{border:`2px solid ${p}`,borderRadius:12,padding:10,minWidth:160,background:f(p,"0C")},children:[n.jsx("div",{style:{fontFamily:j,fontSize:11,letterSpacing:1.2,color:p,marginBottom:6},children:m}),Object.entries(c).map(([x,k])=>n.jsxs("div",{style:{fontFamily:u,fontSize:16},children:["🏷 ",x," → ",n.jsx("strong",{children:k})]},x)),!Object.keys(c).length&&n.jsx("div",{style:{fontSize:13,color:t.muted},children:"(empty)"})]});return n.jsxs("div",{className:"fh-two",children:[n.jsxs("div",{children:[n.jsx("pre",{style:{margin:0,fontFamily:u,fontSize:14.5,lineHeight:1.7,background:t.codeBg,border:`1px solid ${t.border}`,borderRadius:10,padding:6},children:a.map((m,c)=>n.jsx("div",{style:{padding:"1px 8px",borderRadius:5,background:i[e]===c?f(t.blue,"22"):"transparent",fontWeight:i[e]===c?700:400},children:m},c))}),n.jsxs("div",{style:{display:"flex",gap:8,marginTop:8},children:[n.jsx("button",{onClick:()=>l(Math.max(0,e-1)),style:{padding:"8px 12px",borderRadius:8,border:`1px solid ${t.border}`,background:t.card,cursor:"pointer"},children:"◀"}),n.jsx("button",{onClick:()=>l(Math.min(s.length-1,e+1)),style:{padding:"8px 14px",borderRadius:8,border:"none",background:t.navy,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"Next ▶"})]})]}),n.jsxs("div",{children:[n.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[o("GLOBAL ROOM",d.g,t.blue),d.f&&o("change()'s ROOM",d.f,t.purple)]}),n.jsx("div",{style:{fontSize:14.5,color:t.slate,marginTop:10},children:d.d})]})]})}function T(){const s=[{stack:[["main","price = 1000"]],d:"The program starts with one frame: the main program."},{stack:[["main","price = 1000"],["total_bill","amount = 1000"]],d:"main calls total_bill(1000): a new frame is pushed on top."},{stack:[["main","price = 1000"],["total_bill","amount = 1000"],["add_gst","amount = 1000, rate = 0.18"]],d:"total_bill calls add_gst: another frame on top. Only the top frame is running."},{stack:[["main","price = 1000"],["total_bill","amount = 1000, gst = 180.0"]],d:"add_gst returns 180.0 and its frame is popped. total_bill continues where it left off."},{stack:[["main","price = 1000, final = 1180.0"]],d:"total_bill returns 1180.0 and pops. Last in, first out — like a stack of plates."}],[a,i]=b.useState(0),e=s[a];return n.jsxs("div",{className:"fh-two",children:[n.jsxs("div",{children:[n.jsx("pre",{style:{margin:0,fontFamily:u,fontSize:14,lineHeight:1.7,background:t.codeBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"10px 14px"},children:`def add_gst(amount, rate=0.18):
    return amount * rate

def total_bill(amount):
    gst = add_gst(amount)
    return amount + gst

price = 1000
final = total_bill(price)`}),n.jsxs("div",{style:{display:"flex",gap:8,marginTop:8},children:[n.jsx("button",{onClick:()=>i(Math.max(0,a-1)),style:{padding:"8px 12px",borderRadius:8,border:`1px solid ${t.border}`,background:t.card,cursor:"pointer"},children:"◀"}),n.jsx("button",{onClick:()=>i(Math.min(s.length-1,a+1)),style:{padding:"8px 14px",borderRadius:8,border:"none",background:t.navy,color:"#fff",fontWeight:700,cursor:"pointer",fontFamily:"inherit"},children:"Next ▶"})]})]}),n.jsxs("div",{children:[n.jsx("div",{style:{display:"flex",flexDirection:"column-reverse",gap:4,minHeight:170,justifyContent:"flex-start"},children:e.stack.map(([l,d],o)=>n.jsxs("div",{style:{border:`2px solid ${o===e.stack.length-1?t.green:t.border}`,borderRadius:10,padding:"8px 12px",background:o===e.stack.length-1?f(t.green,"10"):t.card},children:[n.jsxs("div",{style:{fontFamily:u,fontWeight:700},children:[l,o===e.stack.length-1?"   ◀ running":""]}),n.jsx("div",{style:{fontFamily:u,fontSize:13,color:t.slate},children:d})]},o))}),n.jsx("div",{style:{fontSize:14.5,color:t.slate,marginTop:8},children:e.d})]})]})}const g=s=>{const a=s.split(" ").map(Number),i=a.reduce((e,l)=>e+l,0)/a.length;return`Temps: ${s}
Average: ${i.toFixed(1)}
Spread: ${(Math.max(...a)-Math.min(...a)).toFixed(1)}
Hot days: ${a.filter(e=>e>i).length}`},r={mystery:{id:"mystery",kind:"type",title:"The mystery",task:n.jsx(n.Fragment,{children:"Predict the last line before running. Then step through the two rooms above."}),show:`x = 10

def change():
    x = 99
    print("inside:", x)

change()
print("outside:", x)`,tests:[{expect:`inside: 99
outside: 10`}],hints:["The x inside change() is a different variable from the global x."],solution:`x = 10

def change():
    x = 99
    print("inside:", x)

change()
print("outside:", x)`},local:{id:"local",kind:"fix",title:"Locals don't escape",task:n.jsxs(n.Fragment,{children:["Run it and read the coach. A local variable disappears when its function returns. Fix it by ",n.jsx("strong",{children:"returning"})," the value and storing the result."]}),starter:`def make_code():
    code = "FH" + "2026"

make_code()
print(code)`,tests:[{expect:"FH2026"}],requires:[{node:"Return"}],hints:["return code inside the function, then code = make_code() outside."],solution:`def make_code():
    code = "FH" + "2026"
    return code

code = make_code()
print(code)`},readglobal:{id:"readglobal",kind:"type",title:"Reading a global is fine",task:n.jsxs(n.Fragment,{children:["A function can ",n.jsx("em",{children:"read"})," a global variable. (It's only ",n.jsx("em",{children:"assigning"})," that makes a new local.)"]}),show:`GST_RATE = 0.18

def with_gst(amount):
    return amount + amount * GST_RATE

print(with_gst(100))
print(with_gst(250))`,tests:[{expect:`118.0
295.0`}],hints:["CAPITAL names are a convention for values that never change (constants)."],solution:`GST_RATE = 0.18

def with_gst(amount):
    return amount + amount * GST_RATE

print(with_gst(100))
print(with_gst(250))`},unbound:{id:"unbound",kind:"fix",title:"Updating an outside variable",task:n.jsxs(n.Fragment,{children:["Run it and read the coach. Fix it the clean way: give the function a parameter, ",n.jsx("strong",{children:"return"})," the new count, and store it — ",n.jsx("code",{children:"count = add_visitor(count)"}),"."]}),starter:`count = 0

def add_visitor():
    count = count + 1

add_visitor()
add_visitor()
print("Visitors:", count)`,tests:[{expect:"Visitors: 2"}],forbids:[{node:"Global",msg:"global works, but it makes code hard to follow. Pass the count in and return it."}],hints:["def add_visitor(count): return count + 1","count = add_visitor(count) — twice."],solution:`count = 0

def add_visitor(count):
    return count + 1

count = add_visitor(count)
count = add_visitor(count)
print("Visitors:", count)`},mutate:{id:"mutate",kind:"type",title:"But lists passed in can change",task:n.jsxs(n.Fragment,{children:["Remember aliasing (Unit 7.2)? The parameter is a second name tag on the ",n.jsx("strong",{children:"same"})," list. Changing the list inside the function changes it for the caller too. Predict, then run."]}),show:`def add_mark(marks, m):
    marks.append(m)

def reset(marks):
    marks = []

class_marks = [70, 80]
add_mark(class_marks, 90)
reset(class_marks)
print(class_marks)`,tests:[{expect:"[70, 80, 90]"}],hints:["append changes the shared list. marks = [] only moves the local tag — the caller's list is untouched."],solution:`def add_mark(marks, m):
    marks.append(m)

def reset(marks):
    marks = []

class_marks = [70, 80]
add_mark(class_marks, 90)
reset(class_marks)
print(class_marks)`},stack:{id:"stack",kind:"type",title:"Watch the stack",task:n.jsx(n.Fragment,{children:"The prints show the order frames are pushed and popped. Predict all six lines first."}),show:`def add_gst(amount):
    print("  start add_gst")
    gst = amount * 0.18
    print("  end add_gst")
    return gst

def total_bill(amount):
    print("start total_bill")
    total = amount + add_gst(amount)
    print("end total_bill")
    return total

print(total_bill(1000))`,minLines:14,tests:[{expect:`start total_bill
  start add_gst
  end add_gst
end total_bill
1180.0`}],hints:["add_gst must finish (pop) before total_bill can carry on."],solution:`def add_gst(amount):
    print("  start add_gst")
    gst = amount * 0.18
    print("  end add_gst")
    return gst

def total_bill(amount):
    print("start total_bill")
    total = amount + add_gst(amount)
    print("end total_bill")
    return total

print(total_bill(1000))`},weather:{id:"weather",kind:"make",title:"Weather report with functions",task:n.jsxs(n.Fragment,{children:["Write three functions that take parameters and ",n.jsx("strong",{children:"return"})," (no globals, no printing inside them): ",n.jsx("code",{children:"average(nums)"}),", ",n.jsx("code",{children:"spread(nums)"})," (max − min) and ",n.jsx("code",{children:"count_above(nums, limit)"}),". Main code: ask ",n.jsx("code",{children:"Temps: "})," (one line of decimals), then print ",n.jsx("code",{children:"Average: 31.5"}),", ",n.jsx("code",{children:"Spread: 6.0"})," (1 decimal each) and ",n.jsx("code",{children:"Hot days: 3"})," (days above the average)."]}),minLines:16,tests:[{inputs:["30 28.5 34.5 33 29 34"],expect:g("30 28.5 34.5 33 29 34")},{inputs:["20 20 20"],expect:g("20 20 20"),hidden:!0},{inputs:["10 40"],expect:g("10 40"),hidden:!0}],post:`assert average([1, 2, 3]) == 2
assert spread([5, 1, 9]) == 8
assert count_above([1, 5, 9], 4) == 2`,requires:[{node:"FunctionDef",min:3},{node:"Return",min:3}],forbids:[{node:"Global",msg:"Pass values in as parameters instead of using global."}],hints:["def average(nums): return sum(nums) / len(nums)","count_above loops and counts n > limit.","Main: nums = [float(x) for x in …] or a loop with append; avg = average(nums); then count_above(nums, avg)."],solution:`def average(nums):
    return sum(nums) / len(nums)

def spread(nums):
    return max(nums) - min(nums)

def count_above(nums, limit):
    count = 0
    for n in nums:
        if n > limit:
            count += 1
    return count

nums = []
for p in input("Temps: ").split():
    nums.append(float(p))
avg = average(nums)
print(f"Average: {avg:.1f}")
print(f"Spread: {spread(nums):.1f}")
print(f"Hot days: {count_above(nums, avg)}")`}},F=r,S=[{q:"A variable created inside a function is…",options:["Global","Local to that call — gone when it returns","Shared by all functions","Saved forever"],answer:1,explain:"Each call gets its own room; it's demolished at return."},{q:"What does this print?",code:`x = 5
def f():
    x = 1
f()
print(x)`,options:["1","5","None","Error"],answer:1,explain:"x = 1 inside f creates a local x; the global x stays 5."},{q:"Why does count = count + 1 inside a function raise UnboundLocalError?",options:["count is a keyword","The assignment makes count local, so the read on the right has no local value yet","Globals are read-only","Missing brackets"],answer:1,explain:"Pass count in and return the new value instead."},{q:"def f(lst): lst.append(1). After nums = []; f(nums), what is nums?",options:["[]","[1]","None","Error"],answer:1,explain:"lst and nums are tags on the same list; append changes that list."},{q:"A calls B, B calls C. Which finishes first?",options:["A","B","C","All at once"],answer:2,explain:"Last in, first out: C's frame is on top and pops first."}];function E(s){const a=[{label:"The Mystery",kicker:"PREDICT FIRST",title:"Same name, different variable",blocks:[n.jsxs(h,{children:["A function sets ",n.jsx("code",{children:"x = 99"}),". Afterwards, the program prints ",n.jsx("code",{children:"x"}),". What appears? Step through, then run it for real:"]}),n.jsx(w,{}),r.mystery]},{label:"Local vs Global",kicker:"TWO ROOMS",title:"What a function can see",blocks:[n.jsxs(h,{children:["Each call gets a private room. It can ",n.jsx("strong",{children:"read"})," names from the global room, but anything it ",n.jsx("strong",{children:"assigns"})," lives in its own room and disappears at return. To get something out: ",n.jsx("code",{children:"return"})," it."]}),r.local,r.readglobal,r.unbound,n.jsxs(v,{color:t.blue,icon:"🐍",children:["Python does have a ",n.jsx("code",{children:"global"})," keyword that lets a function assign to a global variable. Professionals avoid it: functions that take parameters and return results are easier to test, reuse and trust."]})]},{label:"Lists Passed In",kicker:"ALIASING AGAIN",title:"When a function changes your list",blocks:[r.mutate,n.jsxs(_,{children:["Changing a list's contents (",n.jsx("code",{children:"append"}),", ",n.jsx("code",{children:"marks[0] = …"}),") inside a function affects the caller's list. Assigning a new list to the parameter (",n.jsx("code",{children:"marks = []"}),") only moves the local tag."]})]},{label:"Call Stack",kicker:"FRAMES",title:"The call stack",blocks:[n.jsxs(h,{children:["Every call pushes a ",n.jsx("strong",{children:"frame"})," — its room — on top of a stack; every return pops one. Step through a function calling a function:"]}),n.jsx(T,{}),r.stack]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: weather report",blocks:[n.jsx(h,{children:"Three small functions, each taking parameters and returning a result; the main code does the input and printing."}),r.weather]}];return n.jsx(y,{...s,unitId:"Unit8_3",crumb:"MODULE 8 › UNIT 8.3",title:"Scope & the Call Stack",sections:a,quiz:S,next:{title:"Unit 8.4 — Grand Capstone: Marks Manager 2.0",text:"Rebuild the Marks Manager the professional way: small functions that return."}})}export{F as EXERCISES,E as default};
