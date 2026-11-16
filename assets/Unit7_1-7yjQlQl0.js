import{j as e,r as p}from"./index-5ju0ARcj.js";import{P as h,K as f,N as S,T as n,L as v,a,t as g}from"./Lesson-B4adq15Q.js";const C={width:"100%",accentColor:n.navy};function T(){const t="22CS1042",[o,u]=p.useState(2),[i,m]=p.useState(4),[d,w]=p.useState(1),c=[];if(d>0)for(let r=o;r<i;r+=d)c.push(r);const x=(r,l,y,b,j)=>e.jsxs("label",{style:{display:"block",fontFamily:a,fontSize:14},children:[r," = ",e.jsx("strong",{children:l}),e.jsx("input",{type:"range",min:b,max:j,value:l,onChange:k=>y(Number(k.target.value)),style:C})]});return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:4,overflowX:"auto",paddingBottom:4},children:[...t].map((r,l)=>e.jsxs("div",{style:{textAlign:"center",minWidth:52},children:[e.jsx("div",{style:{fontFamily:a,fontSize:11.5,color:n.blue},children:l}),e.jsx("div",{style:{height:50,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:a,fontSize:22,fontWeight:700,border:`1.5px solid ${c.includes(l)?n.teal:n.border}`,background:c.includes(l)?g(n.teal,"22"):n.card},children:r}),e.jsx("div",{style:{fontFamily:a,fontSize:11.5,color:n.orange},children:l-t.length})]},l))}),e.jsx("div",{style:{fontSize:13,color:n.muted,margin:"2px 0 10px"},children:"Blue: index from the front (starts at 0). Orange: index from the back (−1 is the last)."}),e.jsxs("div",{className:"fh-two",children:[e.jsxs("div",{children:[x("start",o,u,0,8),x("stop",i,m,0,8),x("step",d,w,1,3)]}),e.jsxs("div",{style:{background:n.card,border:`1.5px solid ${g(n.teal,"66")}`,borderRadius:12,padding:14},children:[e.jsxs("div",{style:{fontFamily:a,fontSize:16},children:["roll[",o,":",i,d!==1?`:${d}`:"","]"]}),e.jsxs("div",{style:{fontFamily:a,fontSize:24,fontWeight:700,color:n.teal,margin:"4px 0"},children:['"',c.map(r=>t[r]).join(""),'"']}),e.jsxs("div",{style:{fontSize:13.5,color:n.slate},children:["Start is included, stop is not — exactly like range(). ",o>=i&&"Start isn't before stop, so the slice is empty."]})]})]})]})}function A(){const[t,o]=p.useState("  Priya Sharma  "),u=[["s.strip()",JSON.stringify(t.trim())],["s.lower()",JSON.stringify(t.toLowerCase())],["s.upper()",JSON.stringify(t.toUpperCase())],["s.title()",JSON.stringify(t.replace(/\w\S*/g,i=>i[0].toUpperCase()+i.slice(1).toLowerCase()))],['s.replace("a", "@")',JSON.stringify(t.split("a").join("@"))],['s.count("a")',String(t.split("a").length-1)],['s.find("Sharma")',String(t.indexOf("Sharma"))],['s.startswith("Pr")',t.startsWith("Pr")?"True":"False"],["s.isdigit()",/^\d+$/.test(t)?"True":"False"],["len(s)",String(t.length)]];return e.jsxs("div",{children:[e.jsxs("label",{style:{fontFamily:a,fontSize:15},children:['s = "',e.jsx("input",{value:t,onChange:i=>o(i.target.value),style:{fontFamily:a,fontSize:15,padding:"6px 8px",borderRadius:6,border:`1.5px solid ${n.borderStrong}`,width:260}}),'"']}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:6,marginTop:10},children:u.map(([i,m])=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",gap:8,background:n.card,border:`1px solid ${n.border}`,borderRadius:8,padding:"7px 10px",fontFamily:a,fontSize:14},children:[e.jsx("span",{children:i}),e.jsx("strong",{style:{color:n.blue,whiteSpace:"pre"},children:m})]},i))}),e.jsxs("div",{style:{fontSize:13.5,color:n.slate,marginTop:8},children:["Try typing digits only, or leading spaces. ",e.jsx("code",{children:"find"})," gives −1 when the text isn't there."]})]})}const s={index:{id:"index",kind:"type",title:"Index into a string",task:e.jsx(e.Fragment,{children:"Predict each line. Remember: the first character is at index 0."}),show:`roll = "22CS1042"
print(roll[0])
print(roll[2])
print(roll[-1])
print(len(roll))`,tests:[{expect:`2
C
2
8`}],hints:["len counts characters (8); the last index is len - 1 (7), which is also -1."],solution:`roll = "22CS1042"
print(roll[0])
print(roll[2])
print(roll[-1])
print(len(roll))`},outofrange:{id:"outofrange",kind:"fix",title:"One past the end",task:e.jsx(e.Fragment,{children:"This should print the last letter of the name. Run it, read the coach, fix it so it works for a name of any length."}),starter:`name = input("Name: ")
print("Last letter:", name[len(name)])`,tests:[{inputs:["PRIYA"],expect:`Name: PRIYA
Last letter: A`},{inputs:["ARUN"],expect:`Name: ARUN
Last letter: N`,hidden:!0}],hints:["A 5-letter name has indexes 0 to 4. len(name) is 5.","name[len(name) - 1] — or simply name[-1]."],solution:`name = input("Name: ")
print("Last letter:", name[-1])`},roll:{id:"roll",kind:"write",title:"Read a roll number",task:e.jsxs(e.Fragment,{children:["Roll numbers look like ",e.jsx("code",{children:"22CS1042"}),": 2 digits of year, 2 letters of branch, then the number. Ask ",e.jsx("code",{children:"Roll: "})," and print three lines using slices: ",e.jsx("code",{children:"Year: 22"}),", ",e.jsx("code",{children:"Branch: CS"}),", ",e.jsx("code",{children:"Number: 1042"}),"."]}),tests:[{inputs:["22CS1042"],expect:`Roll: 22CS1042
Year: 22
Branch: CS
Number: 1042`},{inputs:["23EC0007"],expect:`Roll: 23EC0007
Year: 23
Branch: EC
Number: 0007`,hidden:!0}],requires:[{node:"Slice",min:3,msg:"Use three slices like roll[0:2]."}],hints:["Year is indexes 0 and 1 → roll[0:2] (or roll[:2]).","The number is everything from index 4 → roll[4:]"],solution:`roll = input("Roll: ")
print("Year:", roll[0:2])
print("Branch:", roll[2:4])
print("Number:", roll[4:])`},steps:{id:"steps",kind:"type",title:"Slices with a step",task:e.jsx(e.Fragment,{children:"A third number in a slice is the step — like range(). A step of −1 walks backwards: the classic way to reverse a string."}),show:`word = "PYTHON"
print(word[1:4])
print(word[:3])
print(word[::2])
print(word[::-1])`,tests:[{expect:`YTH
PYT
PTO
NOHTYP`}],hints:["Leaving out start means “from the beginning”; leaving out stop means “to the end”."],solution:`word = "PYTHON"
print(word[1:4])
print(word[:3])
print(word[::2])
print(word[::-1])`},vowels:{id:"vowels",kind:"write",title:"Count the vowels",task:e.jsxs(e.Fragment,{children:["A for loop can walk through a string, one character at a time: ",e.jsx("code",{children:"for ch in word:"}),". And ",e.jsx("code",{children:"in"})," asks whether one piece of text is inside another: ",e.jsx("code",{children:'"a" in "aeiou"'})," is True. Ask ",e.jsx("code",{children:"Word: "})," (lowercase) and print ",e.jsx("code",{children:"Vowels: 3"}),"."]}),tests:[{inputs:["programming"],expect:`Word: programming
Vowels: 3`},{inputs:["sky"],expect:`Word: sky
Vowels: 0`,hidden:!0},{inputs:["education"],expect:`Word: education
Vowels: 5`,hidden:!0}],requires:[{node:"For"}],hints:["count = 0 before the loop.",'if ch in "aeiou": count += 1'],solution:`word = input("Word: ")
count = 0
for ch in word:
    if ch in "aeiou":
        count += 1
print(f"Vowels: {count}")`},methods:{id:"methods",kind:"type",title:"Seven useful methods",task:e.jsxs(e.Fragment,{children:["A method is a function that belongs to a value; you call it with a dot: ",e.jsx("code",{children:"name.upper()"}),". Predict, then run."]}),show:`name = "  priya sharma  "
clean = name.strip()
print(clean.title())
print(clean.upper())
print(clean.count("a"))
print(clean.find("sharma"))
print(clean.replace("sharma", "s."))
print(clean.startswith("pri"))`,minLines:9,tests:[{expect:`Priya Sharma
PRIYA SHARMA
3
6
priya s.
True`}],hints:["strip removes spaces from both ends only. find gives the index where the text starts."],solution:`name = "  priya sharma  "
clean = name.strip()
print(clean.title())
print(clean.upper())
print(clean.count("a"))
print(clean.find("sharma"))
print(clean.replace("sharma", "s."))
print(clean.startswith("pri"))`},shout:{id:"shout",kind:"fix",title:"Why didn't it change?",task:e.jsx(e.Fragment,{children:"This should print the name in capitals. No error — run it and look. Fix it."}),starter:`name = input("Name: ")
name.upper()
print(name)`,tests:[{inputs:["meena"],expect:`Name: meena
MEENA`},{inputs:["Arun Kumar"],expect:`Name: Arun Kumar
ARUN KUMAR`,hidden:!0}],hints:["Strings can't be changed. upper() makes a NEW string — and line 2 throws it away.","name = name.upper()"],solution:`name = input("Name: ")
name = name.upper()
print(name)`},yesno:{id:"yesno",kind:"write",title:"Forgiving yes/no",task:e.jsxs(e.Fragment,{children:["Users type ",e.jsx("code",{children:"YES"}),", ",e.jsx("code",{children:"yes "}),", ",e.jsx("code",{children:" Yes"}),"… Ask ",e.jsx("code",{children:"Confirm booking? "})," and print ",e.jsx("code",{children:"Confirmed"})," if the answer is yes in any capitals and with any surrounding spaces; otherwise ",e.jsx("code",{children:"Cancelled"}),"."]}),tests:[{inputs:["YES "],expect:`Confirm booking? YES
Confirmed`},{inputs:[" yes"],expect:`Confirm booking?  yes
Confirmed`,hidden:!0},{inputs:["no"],expect:`Confirm booking? no
Cancelled`,hidden:!0},{inputs:["yess"],expect:`Confirm booking? yess
Cancelled`,hidden:!0}],requires:[{call:"strip"},{call:"lower"}],hints:['Clean first, then compare: answer.strip().lower() == "yes"',"Methods can be chained: each one works on the result of the previous one."],solution:`answer = input("Confirm booking? ")
if answer.strip().lower() == "yes":
    print("Confirmed")
else:
    print("Cancelled")`},phone:{id:"phone",kind:"write",title:"Is it a valid mobile number?",task:e.jsxs(e.Fragment,{children:["An Indian mobile number has exactly 10 characters, all digits, and starts with 6, 7, 8 or 9. Ask ",e.jsx("code",{children:"Mobile: "})," and print ",e.jsx("code",{children:"Valid"})," or ",e.jsx("code",{children:"Invalid"}),"."]}),tests:[{inputs:["9876543210"],expect:`Mobile: 9876543210
Valid`},{inputs:["98765"],expect:`Mobile: 98765
Invalid`,hidden:!0},{inputs:["98765abcde"],expect:`Mobile: 98765abcde
Invalid`,hidden:!0},{inputs:["1234567890"],expect:`Mobile: 1234567890
Invalid`,hidden:!0},{inputs:["6000000000"],expect:`Mobile: 6000000000
Valid`,hidden:!0}],requires:[{call:"isdigit"},{call:"len"}],hints:["Three checks joined with and: len(m) == 10, m.isdigit(), and the first character.",'m[0] in "6789"'],solution:`m = input("Mobile: ")
if len(m) == 10 and m.isdigit() and m[0] in "6789":
    print("Valid")
else:
    print("Invalid")`},gold:{id:"gold",kind:"fix",title:"COLD to GOLD",task:e.jsxs(e.Fragment,{children:["Strings are ",e.jsx("strong",{children:"immutable"}),": you can read one character, but you can't replace it in place. Run this and read the coach. Then build the new word from a new first letter plus a slice."]}),starter:`word = "COLD"
word[0] = "G"
print(word)`,tests:[{expect:"GOLD"}],forbids:[{text:'"GOLD"',msg:"Build it from word — don't type GOLD."}],hints:['word = "G" + word[1:]'],solution:`word = "COLD"
word = "G" + word[1:]
print(word)`},username:{id:"username",kind:"make",title:"Username generator",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Full name: "})," (first and last name, maybe with extra spaces and capitals) and ",e.jsx("code",{children:"Birth year: "}),". Print the username — first 3 letters of the first name + the whole last name + the last 2 digits of the year, all lowercase — and the initials. For ",e.jsx("code",{children:"Priya Sharma"}),", ",e.jsx("code",{children:"2006"}),": ",e.jsx("code",{children:"Username: prisharma06"})," and ",e.jsx("code",{children:"Initials: P.S."})]}),minLines:10,tests:[{inputs:["Priya Sharma","2006"],expect:`Full name: Priya Sharma
Birth year: 2006
Username: prisharma06
Initials: P.S.`},{inputs:["  arun KUMAR ","1999"],expect:`Full name:   arun KUMAR
Birth year: 1999
Username: arukumar99
Initials: A.K.`,hidden:!0},{inputs:["Meena Iyer","2005"],expect:`Full name: Meena Iyer
Birth year: 2005
Username: meeiyer05
Initials: M.I.`,hidden:!0}],requires:[{call:"find",msg:'Use find(" ") to locate the space between the names.'}],forbids:[{call:"split",msg:"split() comes in Unit 7.3 — here, find the space and slice."}],hints:["Clean first: name = name.strip().lower()",'space = name.find(" "), then first = name[:space] and last = name[space + 1:]','Initials: first[0].upper() + "." + last[0].upper() + "."'],solution:`name = input("Full name: ").strip().lower()
year = input("Birth year: ")
space = name.find(" ")
first = name[:space]
last = name[space + 1:]
print(f"Username: {first[:3]}{last}{year[-2:]}")
print(f"Initials: {first[0].upper()}.{last[0].upper()}.")`}},E=s,N=[{q:'s = "MATHS". What is s[1]?',options:["M","A","T","S"],answer:1,explain:"Index 0 is M, index 1 is A."},{q:'s = "BOTHERED". What is s[2:5]?',options:["THE","OTH","THER","OTHE"],answer:0,explain:"Indexes 2, 3, 4: T, H, E. Stop (5) is excluded."},{q:'What is "PYTHON"[::-1]?',options:["PYTHON","NOHTYP","N","Error"],answer:1,explain:"A step of −1 walks backwards through the whole string."},{q:'After name = "ravi" and name.upper(), what is name?',options:['"RAVI"','"ravi"','"Ravi"',"None"],answer:1,explain:"Strings are immutable. upper() returns a new string; without name = …, it's thrown away."},{q:'What does "banana".count("a") give?',options:["1","2","3","6"],answer:2,explain:"There are three a's."},{q:'What does "hello".find("z") give?',options:["0","None","-1","Error"],answer:2,explain:"find returns −1 when the text isn't found (index() would raise an error instead)."},{q:"Which expression is True?",options:['"ana" in "banana"','"Ban" in "banana"','"x" in "banana"','"bananas" in "banana"'],answer:0,explain:"in checks for a substring, and it's case-sensitive."}];function F(t){const o=[{label:"Index",kicker:"EVERY CHARACTER HAS A NUMBER",title:"A string is a row of numbered slots",blocks:[e.jsxs(h,{children:["Back in Unit 4.2, a variable was a name tag on one value. A string is one value made of many characters, each in a numbered slot — the memory-slot row you know, applied to text. Indexing starts at ",e.jsx("strong",{children:"0"}),"; negative indexes count from the end."]}),e.jsx(T,{}),s.index,s.outofrange]},{label:"Slice",kicker:"start : stop : step",title:"Slicing out a piece",blocks:[e.jsxs(h,{children:[e.jsx("code",{children:"s[start:stop]"})," copies a piece of the string — start included, stop excluded, just like range. Move the sliders above to see it; then use it for real."]}),s.roll,s.steps,e.jsxs(f,{children:[e.jsx("code",{children:"s[:3]"})," first three · ",e.jsx("code",{children:"s[3:]"})," everything from index 3 · ",e.jsx("code",{children:"s[-2:]"})," last two · ",e.jsx("code",{children:"s[::-1]"})," reversed. A slice never crashes, even past the end."]})]},{label:"Loop & in",kicker:"CHARACTER BY CHARACTER",title:"Looping over text, and in",blocks:[s.vowels]},{label:"Methods",kicker:"BUILT-IN TOOLS",title:"String methods",blocks:[e.jsxs(h,{children:["Strings come with dozens of built-in tools called ",e.jsx("strong",{children:"methods"}),", written after a dot. Type your own text and watch the results:"]}),e.jsx(A,{}),s.methods,s.shout,s.yesno,s.phone,e.jsxs(f,{children:["Methods never change the original string — they return a new one. To keep the result, store it: ",e.jsx("code",{children:"name = name.strip().title()"}),"."]})]},{label:"Immutable",kicker:"THE GOTCHA",title:"You can't change a character in place",blocks:[s.gold,e.jsxs(S,{color:n.blue,icon:"🔜",children:["Lists (next unit) are different: you ",e.jsx("em",{children:"can"})," change their items in place. That difference — mutable vs immutable — matters a lot."]})]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: username generator",blocks:[e.jsx(h,{children:"strip, lower, find, slicing, upper and an f-string — everything from this unit in one program."}),s.username]}];return e.jsx(v,{...t,unitId:"Unit7_1",crumb:"MODULE 7 › UNIT 7.1",title:"Strings in Depth",sections:o,quiz:N,next:{title:"Unit 7.2 — Lists",text:"Your first container: one name, many values — and values you can change."}})}export{E as EXERCISES,F as default};
