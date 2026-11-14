import{j as e,r as x}from"./index-BQ9ta_BJ.js";import{P as d,K as y,N as p,C as h,T as t,L as g,a as c}from"./Lesson-DNKKUv9k.js";const f={margin:0,fontFamily:c,fontSize:15,lineHeight:1.7,background:t.termBg,color:t.termText,borderRadius:10,padding:"12px 14px",whiteSpace:"pre"},b={margin:0,fontFamily:c,fontSize:15,lineHeight:1.7,background:t.codeBg,border:`1px solid ${t.border}`,borderRadius:10,padding:"12px 14px",whiteSpace:"pre-wrap"},u=[{k:"commas",label:"commas",c:t.red,src:`print("Hi", name, "!")
print("Each pays: Rs", share)`,out:`Hi Meena !
Each pays: Rs 333.3333333333333`,note:"Commas always add a space (Hi Meena !) and print every decimal Python has."},{k:"plus",label:"+ and str()",c:t.orange,src:`print("Hi " + name + "!")
print("Each pays: Rs " + str(share))`,out:`Hi Meena!
Each pays: Rs 333.3333333333333`,note:"No extra space now — but str( ) everywhere, and the decimals are still a mess."},{k:"f",label:"f-string",c:t.green,src:`print(f"Hi {name}!")
print(f"Each pays: Rs {share:.2f}")`,out:`Hi Meena!
Each pays: Rs 333.33`,note:"Write the sentence you want; put each value in { }. :.2f means 2 decimal places."}];function j(){const[i,o]=x.useState("commas"),a=u.find(n=>n.k===i);return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10},children:u.map(n=>e.jsx("button",{onClick:()=>o(n.k),style:{padding:"8px 14px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",fontWeight:700,border:`1.5px solid ${i===n.k?n.c:t.border}`,background:i===n.k?n.c:t.card,color:i===n.k?"#fff":t.text},children:n.label},n.k))}),e.jsxs("div",{className:"fh-two",children:[e.jsx("pre",{style:b,children:`name = "Meena"
share = 1000 / 3
`+a.src}),e.jsxs("div",{children:[e.jsx("pre",{style:f,children:a.out}),e.jsx("div",{style:{fontSize:14.5,color:a.c,marginTop:8,lineHeight:1.6},children:a.note})]})]})]})}const m=[{spec:"",v:"1000 / 3",out:"333.3333333333333"},{spec:":.2f",v:"1000 / 3",out:"333.33"},{spec:":.1f",v:"1000 / 3",out:"333.3"},{spec:":.0f",v:"1000 / 3",out:"333"},{spec:":.2f",v:"450",out:"450.00"}];function w(){const[i,o]=x.useState(1),a=m[i];return e.jsxs("div",{className:"fh-two",children:[e.jsx("div",{style:{display:"grid",gap:6,alignContent:"start"},children:m.map((n,l)=>e.jsxs("button",{onClick:()=>o(l),style:{textAlign:"left",padding:"9px 12px",borderRadius:8,cursor:"pointer",fontFamily:c,fontSize:14.5,border:`1.5px solid ${l===i?t.navy:t.border}`,background:l===i?t.navy:t.card,color:l===i?"#fff":t.text},children:['f"',"{",n.v,n.spec,"}",'"']},l))}),e.jsxs("div",{children:[e.jsx("pre",{style:f,children:a.out}),e.jsx("div",{style:{fontSize:14.5,color:t.slate,marginTop:8,lineHeight:1.6},children:a.spec?e.jsxs(e.Fragment,{children:[e.jsx("code",{children:a.spec})," — after the colon: ",e.jsx("code",{children:".2"})," is how many decimal places, ",e.jsx("code",{children:"f"})," means “show as a decimal number”. It rounds for display; the variable itself is unchanged."]}):"No format code: every digit Python has."})]})]})}const r="=".repeat(25),s={hi:{id:"hi",kind:"type",title:"Your first f-string",task:e.jsxs(e.Fragment,{children:["The ",e.jsx("code",{children:"f"})," goes ",e.jsx("strong",{children:"before"})," the opening quote. Values go inside ",e.jsx("code",{children:"{ }"}),"."]}),show:`name = "Meena"
age = 18
print(f"Hi {name}! Next year you will be {age + 1}.")`,tests:[{expect:"Hi Meena! Next year you will be 19."}],hints:["Check the f right before the quote, and the curly brackets { } (not round ones)."],solution:`name = "Meena"
age = 18
print(f"Hi {name}! Next year you will be {age + 1}.")`},noF:{id:"noF",kind:"fix",title:"The missing f",task:e.jsx(e.Fragment,{children:"No error — but run it and look at the output. Fix it."}),starter:`total = 3 * 150
print("Total: {total}")`,tests:[{expect:"Total: 450"}],hints:["Without the f, Python treats { } as ordinary characters.",'print(f"Total: {total}")'],solution:`total = 3 * 150
print(f"Total: {total}")`},sentence:{id:"sentence",kind:"write",title:"A proper sentence",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Name: "})," and ",e.jsx("code",{children:"City: "}),", then print a sentence with the full stop right after the city, e.g. ",e.jsx("code",{children:"Meena lives in Chennai."})," Commas can't do this (they'd add a space before the full stop) — use an f-string."]}),tests:[{inputs:["Meena","Chennai"],expect:`Name: Meena
City: Chennai
Meena lives in Chennai.`},{inputs:["Arun","Madurai"],expect:`Name: Arun
City: Madurai
Arun lives in Madurai.`,hidden:!0}],requires:[{node:"JoinedStr",msg:'Use an f-string: f"...{name}..."'}],hints:['print(f"{name} lives in {city}.")'],solution:`name = input("Name: ")
city = input("City: ")
print(f"{name} lives in {city}.")`},times:{id:"times",kind:"write",title:"A times-table line",task:e.jsxs(e.Fragment,{children:["Ask for two whole numbers, ",e.jsx("code",{children:"a: "})," and ",e.jsx("code",{children:"b: "}),", and print one line like ",e.jsx("code",{children:"7 x 8 = 56"}),". Calculate inside the braces: ",e.jsx("code",{children:"{a * b}"}),"."]}),tests:[{inputs:["7","8"],expect:`a: 7
b: 8
7 x 8 = 56`},{inputs:["12","12"],expect:`a: 12
b: 12
12 x 12 = 144`,hidden:!0}],requires:[{node:"JoinedStr",msg:"Use an f-string."}],hints:["Convert both inputs with int( ).",'print(f"{a} x {b} = {a * b}")'],solution:`a = int(input("a: "))
b = int(input("b: "))
print(f"{a} x {b} = {a * b}")`},decimals:{id:"decimals",kind:"type",title:"Decimal places",task:e.jsxs(e.Fragment,{children:["Predict, type, run. Notice the last line: ",e.jsx("code",{children:":.2f"})," adds zeros too."]}),show:`pi = 3.14159265
print(f"{pi:.2f}")
print(f"{pi:.4f}")
print(f"{10 / 3:.1f}")
print(f"Rs {450:.2f}")`,tests:[{expect:`3.14
3.1416
3.3
Rs 450.00`}],hints:["The colon goes inside the braces, after the value: {pi:.2f}"],solution:`pi = 3.14159265
print(f"{pi:.2f}")
print(f"{pi:.4f}")
print(f"{10 / 3:.1f}")
print(f"Rs {450:.2f}")`},split:{id:"split",kind:"modify",title:"Split the bill, in rupees and paise",task:e.jsxs(e.Fragment,{children:["Your bill-splitter from Unit 4.3, with ",e.jsx("code",{children:"1000"})," and ",e.jsx("code",{children:"3"}),", printed ",e.jsx("code",{children:"Rs 333.3333333333333"}),". Change the last line to an f-string so money always shows exactly 2 decimal places."]}),starter:`bill = float(input("Total bill: "))
friends = int(input("Friends: "))
share = bill / friends
print("Each pays: Rs", share)`,tests:[{inputs:["1000","3"],expect:`Total bill: 1000
Friends: 3
Each pays: Rs 333.33`},{inputs:["900","3"],expect:`Total bill: 900
Friends: 3
Each pays: Rs 300.00`,hidden:!0}],requires:[{text:".2f",msg:"Use :.2f inside the braces."}],hints:['print(f"Each pays: Rs {share:.2f}")'],solution:`bill = float(input("Total bill: "))
friends = int(input("Friends: "))
share = bill / friends
print(f"Each pays: Rs {share:.2f}")`},date:{id:"date",kind:"write",title:"sep= : choose the separator",task:e.jsxs(e.Fragment,{children:["Commas in print put a space between items. ",e.jsx("code",{children:"sep="})," changes that: ",e.jsx("code",{children:'print(1, 2, 3, sep="-")'})," shows ",e.jsx("code",{children:"1-2-3"}),". With ",e.jsx("code",{children:"day = 12"}),", ",e.jsx("code",{children:"month = 11"}),", ",e.jsx("code",{children:"year = 2026"}),", print ",e.jsx("code",{children:"12/11/2026"})," using one print with commas and ",e.jsx("code",{children:"sep"}),"."]}),tests:[{expect:"12/11/2026"}],requires:[{text:"sep",msg:'Use sep="/" inside print( ).'}],forbids:[{text:'"12/',msg:"Don't type the date — print the three variables with sep."}],hints:['print(day, month, year, sep="/")'],solution:`day = 12
month = 11
year = 2026
print(day, month, year, sep="/")`},loading:{id:"loading",kind:"complete",title:"end= : stay on the same line",task:e.jsxs(e.Fragment,{children:["Every print normally ends with a new line. ",e.jsx("code",{children:'end=""'})," replaces that. Fill the blank so the output is one line: ",e.jsx("code",{children:"Loading...done"}),"."]}),starter:`print("Loading", ___)
print("...", end="")
print("done")`,tests:[{expect:"Loading...done"}],hints:['end="" means: end with nothing instead of a new line.'],solution:`print("Loading", end="")
print("...", end="")
print("done")`},address:{id:"address",kind:"write",title:"\\n and \\t inside text",task:e.jsxs(e.Fragment,{children:["Inside quotes, ",e.jsx("code",{children:"\\n"})," starts a new line and ",e.jsx("code",{children:"\\t"})," jumps to the next tab stop. Print this address using ",e.jsx("strong",{children:"one"})," print and ",e.jsx("code",{children:"\\n"}),":"]}),tests:[{expect:`Foothold Canteen
No. 1, College Road
Chennai 600116`}],requires:[{call:"print",min:1}],forbids:[{call:"print",max:1,msg:"Use one print( ) with \\n inside the text."}],hints:['print("Foothold Canteen\\nNo. 1, College Road\\nChennai 600116")'],solution:'print("Foothold Canteen\\nNo. 1, College Road\\nChennai 600116")'},receipt:{id:"receipt",kind:"make",title:"The canteen receipt",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Item: "}),", ",e.jsx("code",{children:"Qty: "})," (whole number) and ",e.jsx("code",{children:"Price: "})," (decimal). Total = qty × price; GST is 5% of the total; To pay = total + GST. Print the receipt exactly — money always with 2 decimals, lines made with ",e.jsx("code",{children:'"=" * 25'}),"."]}),minLines:14,tests:[{inputs:["Samosa","4","15"],expect:`Item: Samosa
Qty: 4
Price: 15
${r}
     FOOTHOLD CANTEEN
${r}
Item   : Samosa
Qty    : 4
Total  : Rs 60.00
GST 5% : Rs 3.00
To pay : Rs 63.00
${r}`},{inputs:["Masala Dosa","2","45.5"],expect:`Item: Masala Dosa
Qty: 2
Price: 45.5
${r}
     FOOTHOLD CANTEEN
${r}
Item   : Masala Dosa
Qty    : 2
Total  : Rs 91.00
GST 5% : Rs 4.55
To pay : Rs 95.55
${r}`,hidden:!0}],requires:[{node:"JoinedStr",min:3,msg:"Use f-strings for the receipt lines."},{text:".2f",msg:"Money needs :.2f."}],forbids:[{text:"=====",msg:'Draw the lines with "=" * 25.'}],hints:["Three inputs, three calculations: total, gst = total * 0.05, pay = total + gst.",'print(f"Total  : Rs {total:.2f}")',"Count the spaces after Item, Qty, Total… so the colons line up."],solution:`item = input("Item: ")
qty = int(input("Qty: "))
price = float(input("Price: "))
total = qty * price
gst = total * 0.05
pay = total + gst
print("=" * 25)
print("     FOOTHOLD CANTEEN")
print("=" * 25)
print(f"Item   : {item}")
print(f"Qty    : {qty}")
print(f"Total  : Rs {total:.2f}")
print(f"GST 5% : Rs {gst:.2f}")
print(f"To pay : Rs {pay:.2f}")
print("=" * 25)`}},v=s,k=[{q:"What does this print?",code:`name = "Arun"
print(f"Hi {name}!")`,options:["Hi {name}!","Hi Arun!","Hi Arun !",'f"Hi Arun!"'],answer:1,explain:"The f makes Python replace {name} with the value."},{q:"What does this print?",code:`x = 5
print("x is {x}")`,options:["x is 5","x is {x}","Error","x is x"],answer:1,explain:"No f before the quote, so the braces are just characters. No error — a silent bug."},{q:'What does f"{2 / 3:.2f}" give?',options:["0.66","0.67","0.6666","0.7"],answer:1,explain:":.2f rounds to 2 decimal places for display: 0.67."},{q:'What does print("a", "b", "c", sep="") show?',options:["a b c","abc","a,b,c",'"abc"'],answer:1,explain:"sep is what goes between items. An empty sep joins them directly."},{q:"What is the output?",code:`print("Hello", end=" ")
print("World")`,options:["Hello\\nWorld","Hello World (one line)","HelloWorld","Hello  World"],answer:1,explain:'end=" " ends the first print with a space instead of a new line.'},{q:"What does \\n inside a string do?",options:["Prints the letter n","Starts a new line","Adds a tab","Ends the program"],answer:1,explain:"\\n is the newline escape. \\t is a tab."}];function N(i){const o=[{label:"Why f-strings?",kicker:"THE NEED",title:"Printing exactly what you mean",blocks:[e.jsxs(d,{children:["Commas in print are easy but clumsy: they add a space you didn't want, and money comes out as ",e.jsx("code",{children:"333.3333333333333"}),". Compare three ways of printing the same two lines:"]}),e.jsx(j,{}),s.hi,s.noF,e.jsxs(y,{children:["An ",e.jsx("strong",{children:"f-string"})," is text with an ",e.jsx("code",{children:"f"})," before the quote. Anything inside ",e.jsx("code",{children:"{ }"})," is worked out and dropped into the text — spacing and punctuation are exactly as you typed them."]})]},{label:"Inside { }",kicker:"VALUES AND EXPRESSIONS",title:"Any expression can go in the braces",blocks:[e.jsxs(d,{children:["Not just names: ",e.jsx("code",{children:"{age + 1}"}),", ",e.jsx("code",{children:"{a * b}"}),", even ",e.jsx("code",{children:"{name.upper()}"})," later on. Python works it out, then prints the result in place."]}),s.sentence,s.times]},{label:"Decimal Places",kicker:":.2f",title:"Money with exactly two decimals",blocks:[e.jsxs(d,{children:["Add a colon and a ",e.jsx("strong",{children:"format code"})," after the value. Click each:"]}),e.jsx(w,{}),s.decimals,s.split,e.jsxs(p,{icon:"💡",children:[e.jsx("code",{children:":.2f"})," only changes how the number is ",e.jsx("em",{children:"shown"}),". To change the stored value, use ",e.jsx("code",{children:"round(x, 2)"})," from Unit 4.4."]})]},{label:"sep · end · \\n",kicker:"CONTROLLING PRINT",title:"sep, end, and escape characters",blocks:[e.jsxs("div",{className:"fh-two",style:{maxWidth:880},children:[e.jsx(h,{title:"print's defaults",code:`print("a", "b")      # a b   (sep=" ")
print("x")           # ends with a new line (end="\\n")`}),e.jsx(h,{title:"escapes inside text",code:`"\\n"   new line
"\\t"   tab
"\\\\"   a real backslash
"\\""   a quote inside quotes`})]}),s.date,s.loading,s.address,e.jsxs(p,{color:t.blue,icon:"📜",children:["Long text over several lines can also use triple quotes: ",e.jsxs("code",{children:['"""line one',`
`,'line two"""']})," keeps the line breaks exactly as typed."]})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: the canteen receipt",blocks:[e.jsxs(d,{children:["Input, conversion, calculation, ",e.jsx("code",{children:'"=" * 25'}),", and f-strings with ",e.jsx("code",{children:":.2f"})," — all of Module 4 in one receipt."]}),s.receipt]}];return e.jsx(g,{...i,unitId:"Unit4_5",crumb:"MODULE 4 › UNIT 4.5",title:"Formatted Output",sections:o,quiz:k,next:{title:"Module 5 — Making Decisions",text:"Module 4 is complete! Next your programs start choosing: if, elif, else. (Optional first: Module 4's Crucible.)"}})}export{v as EXERCISES,N as default};
