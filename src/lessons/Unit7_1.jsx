// Unit 7.1 — Strings in Depth (rebuilt on the typing-first lesson kit)
// Index slots (+ negative, len, IndexError) → slicing incl. step and [::-1] →
// looping over text and `in` → string methods (strip/lower/upper/title/replace/
// find/count/startswith/isdigit) → immutability → username generator.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const slider = { width: "100%", accentColor: T.navy };

// ── Widget: slots, indexes and slices on one string ──
function Slots() {
  const s = "22CS1042";
  const [a, setA] = useState(2);
  const [b, setB] = useState(4);
  const [step, setStep] = useState(1);
  const picked = [];
  if (step > 0) for (let i = a; i < b; i += step) picked.push(i);
  const sl = (label, v, set, min, max) => (
    <label style={{ display: "block", fontFamily: CODE_FONT, fontSize: 14 }}>{label} = <strong>{v}</strong>
      <input type="range" min={min} max={max} value={v} onChange={(e) => set(Number(e.target.value))} style={slider} /></label>
  );
  return (
    <div>
      <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 4 }}>
        {[...s].map((ch, i) => (
          <div key={i} style={{ textAlign: "center", minWidth: 52 }}>
            <div style={{ fontFamily: CODE_FONT, fontSize: 11.5, color: T.blue }}>{i}</div>
            <div style={{ height: 50, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CODE_FONT, fontSize: 22, fontWeight: 700,
              border: `1.5px solid ${picked.includes(i) ? T.teal : T.border}`, background: picked.includes(i) ? tint(T.teal, "22") : T.card }}>{ch}</div>
            <div style={{ fontFamily: CODE_FONT, fontSize: 11.5, color: T.orange }}>{i - s.length}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13, color: T.muted, margin: "2px 0 10px" }}>Blue: index from the front (starts at 0). Orange: index from the back (−1 is the last).</div>
      <div className="fh-two">
        <div>{sl("start", a, setA, 0, 8)}{sl("stop", b, setB, 0, 8)}{sl("step", step, setStep, 1, 3)}</div>
        <div style={{ background: T.card, border: `1.5px solid ${tint(T.teal, "66")}`, borderRadius: 12, padding: 14 }}>
          <div style={{ fontFamily: CODE_FONT, fontSize: 16 }}>roll[{a}:{b}{step !== 1 ? `:${step}` : ""}]</div>
          <div style={{ fontFamily: CODE_FONT, fontSize: 24, fontWeight: 700, color: T.teal, margin: "4px 0" }}>"{picked.map((i) => s[i]).join("")}"</div>
          <div style={{ fontSize: 13.5, color: T.slate }}>Start is included, stop is not — exactly like range(). {a >= b && "Start isn't before stop, so the slice is empty."}</div>
        </div>
      </div>
    </div>
  );
}

// ── Widget: try string methods on your own text ──
function MethodLab() {
  const [s, setS] = useState("  Priya Sharma  ");
  const rows = [
    ["s.strip()", JSON.stringify(s.trim())],
    ["s.lower()", JSON.stringify(s.toLowerCase())],
    ["s.upper()", JSON.stringify(s.toUpperCase())],
    ["s.title()", JSON.stringify(s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()))],
    ['s.replace("a", "@")', JSON.stringify(s.split("a").join("@"))],
    ['s.count("a")', String(s.split("a").length - 1)],
    ['s.find("Sharma")', String(s.indexOf("Sharma"))],
    ['s.startswith("Pr")', s.startsWith("Pr") ? "True" : "False"],
    ["s.isdigit()", /^\d+$/.test(s) ? "True" : "False"],
    ["len(s)", String(s.length)],
  ];
  return (
    <div>
      <label style={{ fontFamily: CODE_FONT, fontSize: 15 }}>s = "<input value={s} onChange={(e) => setS(e.target.value)} style={{ fontFamily: CODE_FONT, fontSize: 15, padding: "6px 8px", borderRadius: 6, border: `1.5px solid ${T.borderStrong}`, width: 260 }} />"</label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 6, marginTop: 10 }}>
        {rows.map(([e, v]) => (
          <div key={e} style={{ display: "flex", justifyContent: "space-between", gap: 8, background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "7px 10px", fontFamily: CODE_FONT, fontSize: 14 }}>
            <span>{e}</span><strong style={{ color: T.blue, whiteSpace: "pre" }}>{v}</strong>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13.5, color: T.slate, marginTop: 8 }}>Try typing digits only, or leading spaces. <code>find</code> gives −1 when the text isn't there.</div>
    </div>
  );
}

// ── Exercise specs ──
const EX = {
  index: {
    id: "index", kind: "type", title: "Index into a string",
    task: <>Predict each line. Remember: the first character is at index 0.</>,
    show: 'roll = "22CS1042"\nprint(roll[0])\nprint(roll[2])\nprint(roll[-1])\nprint(len(roll))',
    tests: [{ expect: "2\nC\n2\n8" }],
    hints: ["len counts characters (8); the last index is len - 1 (7), which is also -1."],
    solution: 'roll = "22CS1042"\nprint(roll[0])\nprint(roll[2])\nprint(roll[-1])\nprint(len(roll))',
  },
  outofrange: {
    id: "outofrange", kind: "fix", title: "One past the end",
    task: <>This should print the last letter of the name. Run it, read the coach, fix it so it works for a name of any length.</>,
    starter: 'name = input("Name: ")\nprint("Last letter:", name[len(name)])',
    tests: [{ inputs: ["PRIYA"], expect: "Name: PRIYA\nLast letter: A" }, { inputs: ["ARUN"], expect: "Name: ARUN\nLast letter: N", hidden: true }],
    hints: ["A 5-letter name has indexes 0 to 4. len(name) is 5.", "name[len(name) - 1] — or simply name[-1]."],
    solution: 'name = input("Name: ")\nprint("Last letter:", name[-1])',
  },
  roll: {
    id: "roll", kind: "write", title: "Read a roll number",
    task: <>Roll numbers look like <code>22CS1042</code>: 2 digits of year, 2 letters of branch, then the number. Ask <code>Roll: </code> and print three lines using slices: <code>Year: 22</code>, <code>Branch: CS</code>, <code>Number: 1042</code>.</>,
    tests: [
      { inputs: ["22CS1042"], expect: "Roll: 22CS1042\nYear: 22\nBranch: CS\nNumber: 1042" },
      { inputs: ["23EC0007"], expect: "Roll: 23EC0007\nYear: 23\nBranch: EC\nNumber: 0007", hidden: true },
    ],
    requires: [{ node: "Slice", min: 3, msg: "Use three slices like roll[0:2]." }],
    hints: ["Year is indexes 0 and 1 → roll[0:2] (or roll[:2]).", "The number is everything from index 4 → roll[4:]"],
    solution: 'roll = input("Roll: ")\nprint("Year:", roll[0:2])\nprint("Branch:", roll[2:4])\nprint("Number:", roll[4:])',
  },
  steps: {
    id: "steps", kind: "type", title: "Slices with a step",
    task: <>A third number in a slice is the step — like range(). A step of −1 walks backwards: the classic way to reverse a string.</>,
    show: 'word = "PYTHON"\nprint(word[1:4])\nprint(word[:3])\nprint(word[::2])\nprint(word[::-1])',
    tests: [{ expect: "YTH\nPYT\nPTO\nNOHTYP" }],
    hints: ["Leaving out start means “from the beginning”; leaving out stop means “to the end”."],
    solution: 'word = "PYTHON"\nprint(word[1:4])\nprint(word[:3])\nprint(word[::2])\nprint(word[::-1])',
  },
  vowels: {
    id: "vowels", kind: "write", title: "Count the vowels",
    task: <>A for loop can walk through a string, one character at a time: <code>for ch in word:</code>. And <code>in</code> asks whether one piece of text is inside another: <code>"a" in "aeiou"</code> is True. Ask <code>Word: </code> (lowercase) and print <code>Vowels: 3</code>.</>,
    tests: [
      { inputs: ["programming"], expect: "Word: programming\nVowels: 3" },
      { inputs: ["sky"], expect: "Word: sky\nVowels: 0", hidden: true },
      { inputs: ["education"], expect: "Word: education\nVowels: 5", hidden: true },
    ],
    requires: [{ node: "For" }],
    hints: ["count = 0 before the loop.", 'if ch in "aeiou": count += 1'],
    solution: 'word = input("Word: ")\ncount = 0\nfor ch in word:\n    if ch in "aeiou":\n        count += 1\nprint(f"Vowels: {count}")',
  },
  methods: {
    id: "methods", kind: "type", title: "Seven useful methods",
    task: <>A method is a function that belongs to a value; you call it with a dot: <code>name.upper()</code>. Predict, then run.</>,
    show: 'name = "  priya sharma  "\nclean = name.strip()\nprint(clean.title())\nprint(clean.upper())\nprint(clean.count("a"))\nprint(clean.find("sharma"))\nprint(clean.replace("sharma", "s."))\nprint(clean.startswith("pri"))',
    minLines: 9,
    tests: [{ expect: "Priya Sharma\nPRIYA SHARMA\n3\n6\npriya s.\nTrue" }],
    hints: ["strip removes spaces from both ends only. find gives the index where the text starts."],
    solution: 'name = "  priya sharma  "\nclean = name.strip()\nprint(clean.title())\nprint(clean.upper())\nprint(clean.count("a"))\nprint(clean.find("sharma"))\nprint(clean.replace("sharma", "s."))\nprint(clean.startswith("pri"))',
  },
  shout: {
    id: "shout", kind: "fix", title: "Why didn't it change?",
    task: <>This should print the name in capitals. No error — run it and look. Fix it.</>,
    starter: 'name = input("Name: ")\nname.upper()\nprint(name)',
    tests: [{ inputs: ["meena"], expect: "Name: meena\nMEENA" }, { inputs: ["Arun Kumar"], expect: "Name: Arun Kumar\nARUN KUMAR", hidden: true }],
    hints: ["Strings can't be changed. upper() makes a NEW string — and line 2 throws it away.", "name = name.upper()"],
    solution: 'name = input("Name: ")\nname = name.upper()\nprint(name)',
  },
  yesno: {
    id: "yesno", kind: "write", title: "Forgiving yes/no",
    task: <>Users type <code>YES</code>, <code>yes </code>, <code> Yes</code>… Ask <code>Confirm booking? </code> and print <code>Confirmed</code> if the answer is yes in any capitals and with any surrounding spaces; otherwise <code>Cancelled</code>.</>,
    tests: [
      { inputs: ["YES "], expect: "Confirm booking? YES\nConfirmed" },
      { inputs: [" yes"], expect: "Confirm booking?  yes\nConfirmed", hidden: true },
      { inputs: ["no"], expect: "Confirm booking? no\nCancelled", hidden: true },
      { inputs: ["yess"], expect: "Confirm booking? yess\nCancelled", hidden: true },
    ],
    requires: [{ call: "strip" }, { call: "lower" }],
    hints: ["Clean first, then compare: answer.strip().lower() == \"yes\"", "Methods can be chained: each one works on the result of the previous one."],
    solution: 'answer = input("Confirm booking? ")\nif answer.strip().lower() == "yes":\n    print("Confirmed")\nelse:\n    print("Cancelled")',
  },
  phone: {
    id: "phone", kind: "write", title: "Is it a valid mobile number?",
    task: <>An Indian mobile number has exactly 10 characters, all digits, and starts with 6, 7, 8 or 9. Ask <code>Mobile: </code> and print <code>Valid</code> or <code>Invalid</code>.</>,
    tests: [
      { inputs: ["9876543210"], expect: "Mobile: 9876543210\nValid" },
      { inputs: ["98765"], expect: "Mobile: 98765\nInvalid", hidden: true },
      { inputs: ["98765abcde"], expect: "Mobile: 98765abcde\nInvalid", hidden: true },
      { inputs: ["1234567890"], expect: "Mobile: 1234567890\nInvalid", hidden: true },
      { inputs: ["6000000000"], expect: "Mobile: 6000000000\nValid", hidden: true },
    ],
    requires: [{ call: "isdigit" }, { call: "len" }],
    hints: ["Three checks joined with and: len(m) == 10, m.isdigit(), and the first character.", 'm[0] in "6789"'],
    solution: 'm = input("Mobile: ")\nif len(m) == 10 and m.isdigit() and m[0] in "6789":\n    print("Valid")\nelse:\n    print("Invalid")',
  },
  gold: {
    id: "gold", kind: "fix", title: "COLD to GOLD",
    task: <>Strings are <strong>immutable</strong>: you can read one character, but you can't replace it in place. Run this and read the coach. Then build the new word from a new first letter plus a slice.</>,
    starter: 'word = "COLD"\nword[0] = "G"\nprint(word)',
    tests: [{ expect: "GOLD" }],
    forbids: [{ text: '"GOLD"', msg: "Build it from word — don't type GOLD." }],
    hints: ['word = "G" + word[1:]'],
    solution: 'word = "COLD"\nword = "G" + word[1:]\nprint(word)',
  },
  username: {
    id: "username", kind: "make", title: "Username generator",
    task: <>Ask <code>Full name: </code> (first and last name, maybe with extra spaces and capitals) and <code>Birth year: </code>. Print the username — first 3 letters of the first name + the whole last name + the last 2 digits of the year, all lowercase — and the initials. For <code>Priya Sharma</code>, <code>2006</code>: <code>Username: prisharma06</code> and <code>Initials: P.S.</code></>,
    minLines: 10,
    tests: [
      { inputs: ["Priya Sharma", "2006"], expect: "Full name: Priya Sharma\nBirth year: 2006\nUsername: prisharma06\nInitials: P.S." },
      { inputs: ["  arun KUMAR ", "1999"], expect: "Full name:   arun KUMAR\nBirth year: 1999\nUsername: arukumar99\nInitials: A.K.", hidden: true },
      { inputs: ["Meena Iyer", "2005"], expect: "Full name: Meena Iyer\nBirth year: 2005\nUsername: meeiyer05\nInitials: M.I.", hidden: true },
    ],
    requires: [{ call: "find", msg: "Use find(\" \") to locate the space between the names." }],
    forbids: [{ call: "split", msg: "split() comes in Unit 7.3 — here, find the space and slice." }],
    hints: ["Clean first: name = name.strip().lower()", 'space = name.find(" "), then first = name[:space] and last = name[space + 1:]', 'Initials: first[0].upper() + "." + last[0].upper() + "."'],
    solution: 'name = input("Full name: ").strip().lower()\nyear = input("Birth year: ")\nspace = name.find(" ")\nfirst = name[:space]\nlast = name[space + 1:]\nprint(f"Username: {first[:3]}{last}{year[-2:]}")\nprint(f"Initials: {first[0].upper()}.{last[0].upper()}.")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "s = \"MATHS\". What is s[1]?", options: ["M", "A", "T", "S"], answer: 1, explain: "Index 0 is M, index 1 is A." },
  { q: "s = \"BOTHERED\". What is s[2:5]?", options: ["THE", "OTH", "THER", "OTHE"], answer: 0, explain: "Indexes 2, 3, 4: T, H, E. Stop (5) is excluded." },
  { q: "What is \"PYTHON\"[::-1]?", options: ["PYTHON", "NOHTYP", "N", "Error"], answer: 1, explain: "A step of −1 walks backwards through the whole string." },
  { q: "After name = \"ravi\" and name.upper(), what is name?", options: ["\"RAVI\"", "\"ravi\"", "\"Ravi\"", "None"], answer: 1, explain: "Strings are immutable. upper() returns a new string; without name = …, it's thrown away." },
  { q: "What does \"banana\".count(\"a\") give?", options: ["1", "2", "3", "6"], answer: 2, explain: "There are three a's." },
  { q: "What does \"hello\".find(\"z\") give?", options: ["0", "None", "-1", "Error"], answer: 2, explain: "find returns −1 when the text isn't found (index() would raise an error instead)." },
  { q: "Which expression is True?", options: ["\"ana\" in \"banana\"", "\"Ban\" in \"banana\"", "\"x\" in \"banana\"", "\"bananas\" in \"banana\""], answer: 0, explain: "in checks for a substring, and it's case-sensitive." },
];

export default function Unit7_1(props) {
  const sections = [
    {
      label: "Index", kicker: "EVERY CHARACTER HAS A NUMBER", title: "A string is a row of numbered slots",
      blocks: [
        <P>Back in Unit 4.2, a variable was a name tag on one value. A string is one value made of many characters, each in a numbered slot — the memory-slot row you know, applied to text. Indexing starts at <strong>0</strong>; negative indexes count from the end.</P>,
        <Slots />,
        EX.index,
        EX.outofrange,
      ],
    },
    {
      label: "Slice", kicker: "start : stop : step", title: "Slicing out a piece",
      blocks: [
        <P><code>s[start:stop]</code> copies a piece of the string — start included, stop excluded, just like range. Move the sliders above to see it; then use it for real.</P>,
        EX.roll,
        EX.steps,
        <KeyIdea><code>s[:3]</code> first three · <code>s[3:]</code> everything from index 3 · <code>s[-2:]</code> last two · <code>s[::-1]</code> reversed. A slice never crashes, even past the end.</KeyIdea>,
      ],
    },
    {
      label: "Loop & in", kicker: "CHARACTER BY CHARACTER", title: "Looping over text, and in",
      blocks: [EX.vowels],
    },
    {
      label: "Methods", kicker: "BUILT-IN TOOLS", title: "String methods",
      blocks: [
        <P>Strings come with dozens of built-in tools called <strong>methods</strong>, written after a dot. Type your own text and watch the results:</P>,
        <MethodLab />,
        EX.methods,
        EX.shout,
        EX.yesno,
        EX.phone,
        <KeyIdea>Methods never change the original string — they return a new one. To keep the result, store it: <code>name = name.strip().title()</code>.</KeyIdea>,
      ],
    },
    {
      label: "Immutable", kicker: "THE GOTCHA", title: "You can't change a character in place",
      blocks: [
        EX.gold,
        <Note color={T.blue} icon="🔜">Lists (next unit) are different: you <em>can</em> change their items in place. That difference — mutable vs immutable — matters a lot.</Note>,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: username generator",
      blocks: [<P>strip, lower, find, slicing, upper and an f-string — everything from this unit in one program.</P>, EX.username],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit7_1" crumb="MODULE 7 › UNIT 7.1" title="Strings in Depth" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 7.2 — Lists", text: "Your first container: one name, many values — and values you can change." }} />
  );
}
