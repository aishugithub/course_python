import{j as e}from"./index-BsB65IVi.js";import{P as l,K as d,C as h,L as p}from"./Lesson-M2Z85AvF.js";const a=r=>({text:"#",min:r,msg:`Write your algorithm first, as at least ${r} # comment lines.`}),i=(r,n)=>[...r].map(t=>t>="a"&&t<="z"?String.fromCharCode((t.charCodeAt(0)-97+n+26*10)%26+97):t>="A"&&t<="Z"?String.fromCharCode((t.charCodeAt(0)-65+n+26*10)%26+65):t).join(""),o=r=>{const n=new Map;for(const t of r)n.set(t,(n.get(t)||0)+1);return[...n].map(([t,c])=>`${t}: ${c}`).join(`
`)},s={palindrome:{id:"palindrome",kind:"write",title:"Two-pointer palindrome",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Phrase: "}),". Ignoring spaces and capitals, is it a palindrome? First clean it (lowercase, remove spaces). Then use ",e.jsx("strong",{children:"two pointers"}),": ",e.jsx("code",{children:"left"})," from the start, ",e.jsx("code",{children:"right"})," from the end, moving inwards; any mismatch → not a palindrome. No ",e.jsx("code",{children:"[::-1]"}),". Print ",e.jsx("code",{children:"Palindrome: True"}),"."]}),tests:[{inputs:["Never odd or even"],expect:`Phrase: Never odd or even
Palindrome: True`},{inputs:["Python"],expect:`Phrase: Python
Palindrome: False`,hidden:!0},{inputs:["Malayalam"],expect:`Phrase: Malayalam
Palindrome: True`,hidden:!0}],requires:[a(3),{node:"While"}],forbids:[{text:"::-1",msg:"Use the two-pointer method, not slicing."},{call:"reversed"}],hints:['clean = phrase.lower().replace(" ", "")',"left = 0, right = len(clean) - 1; while left < right: compare, then left += 1, right -= 1"],solution:`# 1. clean: lowercase, no spaces
# 2. pointers at both ends, assume palindrome
# 3. move inwards; a mismatch disproves it
phrase = input("Phrase: ")
clean = phrase.lower().replace(" ", "")
left = 0
right = len(clean) - 1
is_pal = True
while left < right:
    if clean[left] != clean[right]:
        is_pal = False
        break
    left += 1
    right -= 1
print(f"Palindrome: {is_pal}")`},words:{id:"words",kind:"write",title:"Reverse the word order",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Sentence: "})," and print the words in reverse order (not the letters): ",e.jsx("code",{children:"Python love I"}),". Build the result with a loop that walks backwards, then join."]}),tests:[{inputs:["I love Python"],expect:`Sentence: I love Python
Python love I`},{inputs:["one"],expect:`Sentence: one
one`,hidden:!0}],requires:[a(2),{call:"join"}],forbids:[{text:"::-1"},{call:"reverse"},{call:"reversed"}],hints:["words = sentence.split(); for i in range(len(words) - 1, -1, -1): out.append(words[i])",'" ".join(out)'],solution:`# 1. split into words
# 2. walk backwards, collecting them; join with spaces
words = input("Sentence: ").split()
out = []
for i in range(len(words) - 1, -1, -1):
    out.append(words[i])
print(" ".join(out))`},freq:{id:"freq",kind:"write",title:"Letter frequencies",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Word: "})," and print each letter's count, in the order first seen, one per line: ",e.jsx("code",{children:"b: 1"}),", ",e.jsx("code",{children:"a: 3"}),", ",e.jsx("code",{children:"n: 2"})," for banana. The counting pattern from Unit 7.5, applied to characters."]}),tests:[{inputs:["banana"],expect:`Word: banana
`+o("banana")},{inputs:["mississippi"],expect:`Word: mississippi
`+o("mississippi"),hidden:!0}],requires:[a(2),{call:"get"}],hints:["counts[ch] = counts.get(ch, 0) + 1 for each ch in the word."],solution:`# 1. count each character with a dict
# 2. print counts in first-seen order
word = input("Word: ")
counts = {}
for ch in word:
    counts[ch] = counts.get(ch, 0) + 1
for ch, n in counts.items():
    print(f"{ch}: {n}")`},anagram:{id:"anagram",kind:"write",title:"Anagrams",task:e.jsxs(e.Fragment,{children:["Two words are anagrams if they use exactly the same letters the same number of times (listen / silent). Ask ",e.jsx("code",{children:"First: "})," and ",e.jsx("code",{children:"Second: "})," (ignore capitals). Build a count dictionary for each and compare them: ",e.jsx("code",{children:"Anagrams: True"}),". No sorted()."]}),tests:[{inputs:["Listen","Silent"],expect:`First: Listen
Second: Silent
Anagrams: True`},{inputs:["apple","paper"],expect:`First: apple
Second: paper
Anagrams: False`,hidden:!0},{inputs:["aab","abb"],expect:`First: aab
Second: abb
Anagrams: False`,hidden:!0}],requires:[a(3)],forbids:[{call:"sorted"},{call:"sort"}],hints:["Two dicts built the same way; dictionaries compare equal with == if they have the same keys and values."],solution:`# 1. lowercase both words
# 2. count the letters of each into its own dict
# 3. equal dicts means anagrams
a = input("First: ").lower()
b = input("Second: ").lower()
ca = {}
for ch in a:
    ca[ch] = ca.get(ch, 0) + 1
cb = {}
for ch in b:
    cb[ch] = cb.get(ch, 0) + 1
print(f"Anagrams: {ca == cb}")`},ordchr:{id:"ordchr",kind:"type",title:"Characters are numbers inside",task:e.jsxs(e.Fragment,{children:["Every character has a code number. ",e.jsx("code",{children:"ord(ch)"})," gives the number; ",e.jsx("code",{children:"chr(n)"})," turns a number back into a character. Letters are consecutive: a is 97, b is 98…"]}),show:`print(ord("a"), ord("b"), ord("z"))
print(ord("A"), chr(66))
shift = (ord("y") - ord("a") + 3) % 26
print(chr(ord("a") + shift))`,tests:[{expect:`97 98 122
65 B
b`}],hints:["% 26 wraps past z back to a: y + 3 → b."],solution:`print(ord("a"), ord("b"), ord("z"))
print(ord("A"), chr(66))
shift = (ord("y") - ord("a") + 3) % 26
print(chr(ord("a") + shift))`},caesar:{id:"caesar",kind:"make",title:"Caesar cipher",task:e.jsxs(e.Fragment,{children:["Julius Caesar's secret code shifts every letter by a fixed amount: with shift 3, a → d, z → c. Ask ",e.jsx("code",{children:"Message: "})," and ",e.jsx("code",{children:"Shift: "})," (can be negative, to decode). Shift lowercase and uppercase letters, wrapping around; keep everything else (spaces, digits, punctuation) unchanged. Print ",e.jsx("code",{children:"Result: Khoor, Zruog!"}),"."]}),minLines:16,tests:[{inputs:["Hello, World!","3"],expect:`Message: Hello, World!
Shift: 3
Result: ${i("Hello, World!",3)}`},{inputs:["Khoor, Zruog!","-3"],expect:`Message: Khoor, Zruog!
Shift: -3
Result: Hello, World!`,hidden:!0},{inputs:["xyz ABC 2026","5"],expect:`Message: xyz ABC 2026
Shift: 5
Result: ${i("xyz ABC 2026",5)}`,hidden:!0}],requires:[a(4),{call:"ord"},{call:"chr"}],hints:['For a lowercase ch: chr((ord(ch) - ord("a") + k) % 26 + ord("a")). Uppercase: same with "A".',"Python's % always gives a non-negative result for % 26, so negative shifts wrap correctly.","Build the result string: result += new_ch"],solution:`# 1. read message and shift
# 2. for each character
# 3.     lowercase / uppercase letter: shift within its alphabet, wrapping with % 26
# 4.     anything else: keep it; build and print the result
text = input("Message: ")
k = int(input("Shift: "))
result = ""
for ch in text:
    if "a" <= ch <= "z":
        result += chr((ord(ch) - ord("a") + k) % 26 + ord("a"))
    elif "A" <= ch <= "Z":
        result += chr((ord(ch) - ord("A") + k) % 26 + ord("A"))
    else:
        result += ch
print(f"Result: {result}")`}},g=s,u=[{q:"Why use two pointers for a palindrome?",options:["Required","Compare from both ends inward and stop at the first mismatch — no reversed copy needed","Faster to type","Python can't reverse"],answer:1,explain:"Half the comparisons, and it can stop early."},{q:"Two words are anagrams when…",options:["They have the same length","Their letter-count dictionaries are equal","They start with the same letter","They rhyme"],answer:1,explain:"Same letters, same numbers of each."},{q:'What does chr(ord("c") + 1) give?',options:['"c1"','"d"',"100","Error"],answer:1,explain:"ord gives 99; 100 back to a character is d."},{q:"In the cipher, why % 26?",options:["To round","To wrap past z back to the start of the alphabet","To make it secret","No reason"],answer:1,explain:"Position 25 (z) + 3 = 28 → 28 % 26 = 2 → c."}];function w(r){const n=[{label:"Two Pointers",kicker:"FROM BOTH ENDS",title:"Palindromes and word order",blocks:[e.jsx(l,{children:"Strings are sequences, so every list algorithm works on them — plus a few classics of their own."}),s.palindrome,s.words]},{label:"Counting",kicker:"FREQUENCIES",title:"Counting characters",blocks:[s.freq,s.anagram,e.jsx(d,{children:"Many string questions reduce to counting: a frequency dictionary answers anagrams, most-common letters, missing letters and more."})]},{label:"Codes",kicker:"ORD · CHR",title:"Characters as numbers",blocks:[e.jsx("div",{style:{maxWidth:560},children:e.jsx(h,{title:"the shift formula",code:`pos = ord(ch) - ord("a")        # 0..25
new = (pos + k) % 26            # shift and wrap
chr(new + ord("a"))             # back to a letter`})}),s.ordchr]},{label:"Make It",kicker:"PUT IT TOGETHER",title:"Your program: Caesar cipher",blocks:[s.caesar]}];return e.jsx(p,{...r,unitId:"UnitCT2_5",crumb:"COMPUTATIONAL THINKING II › 5",title:"String Algorithms",sections:n,quiz:u,next:{title:"Module 8 — Functions",text:"CT II complete! Next: package your algorithms as reusable functions. (Optional first: CT II's Crucible.)"}})}export{g as EXERCISES,w as default};
