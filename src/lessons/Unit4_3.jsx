// Unit 4.3 — Input & Type Conversion (rebuilt on the typing-first lesson kit)
// input() always returns text → the crash (TypeError) and the silent bug
// ("40" + "35" = "4035") → int(), float(), str() → when conversion fails.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const btn = (bg = T.navy, fg = "#fff") => ({ padding: "9px 16px", borderRadius: 8, border: "none", background: bg, color: fg, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 14 });
const codeBox = { margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre-wrap" };
const term = { margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.termBg, color: T.termText, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre-wrap" };

// ── Widget: type into input(), see what Python receives ──
function InputBasics() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="fh-two">
      <div>
        <pre style={codeBox}>{'name = input("What\'s your name? ")\nprint(name)\nprint(type(name))'}</pre>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: T.card, border: `1.5px solid ${T.borderStrong}`, borderRadius: 8, padding: "8px 12px" }}>
            <span style={{ fontFamily: CODE_FONT, color: T.teal, fontSize: 14 }}>What's your name?</span>
            <input value={typed} disabled={done} onChange={(e) => setTyped(e.target.value)} onKeyDown={(e) => e.key === "Enter" && typed.trim() && setDone(true)}
              placeholder="type, then Enter" style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: CODE_FONT, fontSize: 14, color: T.text }} />
          </div>
          {done ? <button onClick={() => { setDone(false); setTyped(""); }} style={btn(T.card, T.text)}>↺</button>
            : <button onClick={() => typed.trim() && setDone(true)} style={btn()}>Enter ↵</button>}
        </div>
        <div style={{ fontSize: 13, color: T.muted, marginTop: 6 }}>Try a name — then reset and type a number, like 18.</div>
      </div>
      <div>
        <pre style={term}>{done ? `What's your name? ${typed}\n${typed}\n<class 'str'>` : "What's your name? _"}</pre>
        {done && <div style={{ fontSize: 14, color: T.slate, marginTop: 8, lineHeight: 1.6 }}>
          {/^\s*-?\d+(\.\d+)?\s*$/.test(typed)
            ? <>Even <strong>{typed.trim()}</strong> — digits only — arrives as <code>"{typed.trim()}"</code>, a <strong>str</strong>. input() never gives you a number.</>
            : <>input() handed your program the text <code>"{typed}"</code>. Now try typing a number.</>}
        </div>}
      </div>
    </div>
  );
}

// ── Widget: + on text vs + on numbers ──
function PlusTwoWays() {
  const [conv, setConv] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <button onClick={() => setConv(false)} style={btn(!conv ? T.red : T.card, !conv ? "#fff" : T.text)}>without int()</button>
        <button onClick={() => setConv(true)} style={btn(conv ? T.green : T.card, conv ? "#fff" : T.text)}>with int()</button>
      </div>
      <div className="fh-two">
        <pre style={codeBox}>{conv
          ? 'a = int(input("First mark: "))\nb = int(input("Second mark: "))\nprint("Total:", a + b)'
          : 'a = input("First mark: ")\nb = input("Second mark: ")\nprint("Total:", a + b)'}</pre>
        <div>
          <pre style={term}>{`First mark: 40\nSecond mark: 35\nTotal: ${conv ? "75" : "4035"}`}</pre>
          <div style={{ fontSize: 14, color: conv ? T.green : T.red, marginTop: 8, lineHeight: 1.6 }}>
            {conv ? "Numbers + numbers: Python adds. 40 + 35 = 75. ✓"
              : <>No crash — and completely wrong. <code>"40" + "35"</code> is text + text, so + <strong>joins</strong> them: <code>"4035"</code>.</>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Widget: conversion machines ──
const MACHINES = [
  { f: "int", c: T.blue, d: "text or decimal → whole number", ex: [['"25"', "25", true], ["3.9", "3   (cuts off the decimal — it does NOT round)", true], ['"3.9"', "ValueError", false], ['"hello"', "ValueError", false]] },
  { f: "float", c: T.teal, d: "text or int → decimal number", ex: [['"8.5"', "8.5", true], ['"25"', "25.0", true], ["7", "7.0", true], ['"abc"', "ValueError", false]] },
  { f: "str", c: T.purple, d: "anything → text", ex: [["25", '"25"', true], ["8.5", '"8.5"', true], ["True", '"True"', true]] },
];
function Converters() {
  const [sel, setSel] = useState(0);
  const m = MACHINES[sel];
  return (
    <div className="fh-two">
      <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
        {MACHINES.map((x, i) => (
          <button key={x.f} onClick={() => setSel(i)} style={{ textAlign: "left", padding: "12px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
            border: `1.5px solid ${i === sel ? x.c : T.border}`, background: i === sel ? tint(x.c, "14") : T.card }}>
            <code style={{ fontSize: 16, fontWeight: 700, color: x.c, background: "transparent" }}>{x.f}( )</code>
            <span style={{ color: T.slate, fontSize: 14, marginLeft: 10 }}>{x.d}</span>
          </button>
        ))}
      </div>
      <div style={{ background: T.card, border: `1.5px solid ${tint(m.c, "66")}`, borderRadius: 12, padding: 14 }}>
        {m.ex.map(([inp, out, ok], i) => (
          <div key={i} style={{ fontFamily: CODE_FONT, fontSize: 14.5, padding: "6px 0", borderBottom: i < m.ex.length - 1 ? `1px dashed ${T.border}` : "none" }}>
            <span style={{ color: T.text }}>{m.f}({inp})</span> <span style={{ color: T.muted }}>→</span>{" "}
            <span style={{ color: ok ? T.green : T.red, fontWeight: 700 }}>{out}</span>
          </div>
        ))}
        <div style={{ fontSize: 13.5, color: T.slate, marginTop: 10, lineHeight: 1.6 }}>
          A conversion never changes the original value. It makes a <strong>new</strong> value, and you tie a name to it — the name-tag picture from Unit 4.2: <code>age = int(age)</code>.
        </div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const EX = {
  hello: {
    id: "hello", kind: "type", title: "Ask, then answer",
    task: <>Type it and run. The test types <strong>Priya</strong> for you; the expected output shows the question, the typed answer, and your program's reply — exactly what a real terminal shows.</>,
    show: 'name = input("What\'s your name? ")\nprint("Hello,", name)',
    tests: [{ inputs: ["Priya"], expect: "What's your name? Priya\nHello, Priya" }, { inputs: ["Arun"], expect: "What's your name? Arun\nHello, Arun", hidden: true }],
    hints: ["The prompt text goes inside input( ), in quotes. Note the space after the ? so the answer doesn't stick to it."],
    solution: 'name = input("What\'s your name? ")\nprint("Hello,", name)',
  },
  meet: {
    id: "meet", kind: "write", title: "Where are you from?",
    task: <>Ask two questions with the exact prompts <code>Your name: </code> and <code>Your city: </code> (note the space after each colon). Then print <code>Hi Meena from Chennai</code> — built from the two answers.</>,
    tests: [
      { inputs: ["Meena", "Chennai"], expect: "Your name: Meena\nYour city: Chennai\nHi Meena from Chennai" },
      { inputs: ["Ravi", "Pune"], expect: "Your name: Ravi\nYour city: Pune\nHi Ravi from Pune", hidden: true },
    ],
    requires: [{ call: "input", min: 2, msg: "Ask two questions — two input( ) calls." }],
    forbids: [{ text: '"Meena', msg: "Don't type Meena — use whatever the user answered." }, { text: "Chennai\"", msg: "Don't type Chennai — use the variable." }],
    hints: ["Store each answer: name = input(\"Your name: \")", 'print("Hi", name, "from", city)'],
    solution: 'name = input("Your name: ")\ncity = input("Your city: ")\nprint("Hi", name, "from", city)',
  },
  crash: {
    id: "crash", kind: "fix", title: "The crash",
    task: <>Run it. Read the coach. Fix it so it prints the age next year.</>,
    starter: 'age = input("Age: ")\nprint("Next year you will be", age + 1)',
    tests: [{ inputs: ["18"], expect: "Age: 18\nNext year you will be 19" }, { inputs: ["40"], expect: "Age: 40\nNext year you will be 41", hidden: true }],
    requires: [{ call: "int", msg: "Convert the answer to a whole number with int( )." }],
    hints: ["age holds the text \"18\". Text + 1 makes no sense to Python.", "age = int(input(\"Age: \"))"],
    solution: 'age = int(input("Age: "))\nprint("Next year you will be", age + 1)',
  },
  silent: {
    id: "silent", kind: "fix", title: "The bug that doesn't crash",
    task: <>This program runs without any error. Run it and look at the total. Then fix it.</>,
    starter: 'a = input("First mark: ")\nb = input("Second mark: ")\nprint("Total:", a + b)',
    tests: [{ inputs: ["40", "35"], expect: "First mark: 40\nSecond mark: 35\nTotal: 75" }, { inputs: ["12", "8"], expect: "First mark: 12\nSecond mark: 8\nTotal: 20", hidden: true }],
    requires: [{ call: "int", min: 2, msg: "Convert both marks with int( )." }],
    hints: ["4035 is \"40\" and \"35\" glued together. When does + glue instead of add?", "Wrap each input( ) in int( )."],
    solution: 'a = int(input("First mark: "))\nb = int(input("Second mark: "))\nprint("Total:", a + b)',
  },
  convert: {
    id: "convert", kind: "type", title: "Four conversions",
    task: <>Predict all four lines, then type and run. Line 3 surprises most people.</>,
    show: 'print(int("25") + 5)\nprint(float("2.5") * 2)\nprint(int(3.9))\nprint(str(25) + "5")',
    tests: [{ expect: "30\n5.0\n3\n255" }],
    hints: ["int( ) cuts off the decimal part; str(25) + \"5\" is text + text."],
    solution: 'print(int("25") + 5)\nprint(float("2.5") * 2)\nprint(int(3.9))\nprint(str(25) + "5")',
  },
  seats: {
    id: "seats", kind: "complete", title: "Convert in one line",
    task: <>You can convert the answer the moment it arrives: <code>int(input(...))</code>. Fill in the blank so the bill is right.</>,
    starter: 'seats = ___(input("Seats: "))\nprint("Total:", seats * 150)',
    tests: [{ inputs: ["3"], expect: "Seats: 3\nTotal: 450" }, { inputs: ["5"], expect: "Seats: 5\nTotal: 750", hidden: true }],
    hints: ["Seats are whole numbers. Which converter makes whole numbers?"],
    solution: 'seats = int(input("Seats: "))\nprint("Total:", seats * 150)',
  },
  petrol: {
    id: "petrol", kind: "write", title: "Petrol bill",
    task: <>Petrol costs ₹100 a litre — store that in a variable <code>price</code>. Ask <code>Litres: </code> (people buy 4.5 litres, so allow decimals), then print <code>Total: Rs</code> and the amount.</>,
    tests: [{ inputs: ["4.5"], expect: "Litres: 4.5\nTotal: Rs 450.0" }, { inputs: ["2"], expect: "Litres: 2\nTotal: Rs 200.0", hidden: true }],
    requires: [{ call: "float", msg: "Litres can have a decimal point — convert with float( )." }],
    forbids: [{ text: "450", msg: "Let Python calculate the total." }],
    hints: ["int( ) can't read \"4.5\". Which converter can?", 'litres = float(input("Litres: "))', 'print("Total: Rs", litres * price)'],
    solution: 'price = 100\nlitres = float(input("Litres: "))\nprint("Total: Rs", litres * price)',
  },
  cgpa: {
    id: "cgpa", kind: "fix", title: "When conversion fails",
    task: <>A student types her CGPA, 8.5, and the program crashes. Run it, read the coach, fix it.</>,
    starter: 'cgpa = int(input("CGPA: "))\nprint("Your CGPA is", cgpa)',
    tests: [{ inputs: ["8.5"], expect: "CGPA: 8.5\nYour CGPA is 8.5" }, { inputs: ["9.1"], expect: "CGPA: 9.1\nYour CGPA is 9.1", hidden: true }],
    hints: ["int( ) only reads whole numbers. A CGPA has a decimal point."],
    solution: 'cgpa = float(input("CGPA: "))\nprint("Your CGPA is", cgpa)',
  },
  glue: {
    id: "glue", kind: "fix", title: "Gluing text and a number",
    task: <>This time the conversion is right, but the print line crashes. Fix the print line — either convert the number to text with <code>str( )</code>, or switch to commas.</>,
    starter: 'age = int(input("Age: "))\nprint("Age next year: " + (age + 1))',
    tests: [{ inputs: ["18"], expect: "Age: 18\nAge next year: 19" }, { inputs: ["25"], expect: "Age: 25\nAge next year: 26", hidden: true }],
    hints: ["+ can join text to text, or add numbers — not text + number.", 'print("Age next year: " + str(age + 1))'],
    solution: 'age = int(input("Age: "))\nprint("Age next year: " + str(age + 1))',
  },
  split: {
    id: "split", kind: "make", title: "Split the bill",
    task: <>Friends share a restaurant bill. Ask <code>Total bill: </code> (it can have paise, so allow decimals) and <code>Friends: </code> (a whole number). Print exactly the two lines shown. Blank editor.</>,
    minLines: 8,
    tests: [
      { inputs: ["900", "3"], expect: "Total bill: 900\nFriends: 3\nBill of Rs 900.0 split 3 ways\nEach pays: Rs 300.0" },
      { inputs: ["1000", "4"], expect: "Total bill: 1000\nFriends: 4\nBill of Rs 1000.0 split 4 ways\nEach pays: Rs 250.0", hidden: true },
    ],
    requires: [{ call: "float", msg: "The bill can have decimals — use float( )." }, { call: "int", msg: "Friends is a whole number — use int( )." }],
    forbids: [{ text: "300", msg: "Let Python divide." }],
    hints: ["Two inputs, each converted. Then one division.", "Notice 900.0 in the output — that's what float( ) gives you.", 'share = bill / friends'],
    solution: 'bill = float(input("Total bill: "))\nfriends = int(input("Friends: "))\nshare = bill / friends\nprint("Bill of Rs", bill, "split", friends, "ways")\nprint("Each pays: Rs", share)',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "The user types 18 at an input() prompt. What does input() give your program?", options: ["The number 18", "The text \"18\"", "It depends on what was typed", "18.0"], answer: 1,
    explain: "input() always returns a str — even when every character is a digit." },
  { q: "What does this print if the user types 5 and then 5?", code: 'a = input()\nb = input()\nprint(a + b)', options: ["10", "55", "TypeError", "5 5"], answer: 1,
    explain: "Text + text joins: \"5\" + \"5\" is \"55\". No error — which is what makes it dangerous." },
  { q: "What does int(3.9) give?", options: ["4", "3", "3.9", "ValueError"], answer: 1,
    explain: "int() cuts off the decimal part. It does not round. (Rounding is round(), in Unit 4.4.)" },
  { q: "What does int(\"3.9\") give?", options: ["3", "4", "ValueError", "3.9"], answer: 2,
    explain: "From text, int() only accepts a whole number like \"25\". For \"3.9\" use float()." },
  { q: "Why does this crash?", code: 'age = 18\nprint("Age: " + age)', options: ["age must be in quotes", "+ can't join text and a number", "print can't show numbers", "age is a keyword"], answer: 1,
    explain: "Use str(age) to turn it into text, or use a comma: print(\"Age:\", age)." },
  { q: "What does float(\"25\") give?", options: ["25", "25.0", "\"25.0\"", "ValueError"], answer: 1,
    explain: "float() accepts whole numbers too and returns a decimal: 25.0." },
  { q: "Which is the usual order in an input program?", options: ["print → input → convert → compute", "input → convert → compute → print", "convert → input → print → compute", "compute → input → convert → print"], answer: 1,
    explain: "Get the text, convert it to the right type, compute, then show the result." },
];

export default function Unit4_3(props) {
  const sections = [
    {
      label: "input()", kicker: "YOUR PROGRAM ASKS", title: "input() — let the user type",
      blocks: [
        <P><code>input("question ")</code> shows the question, waits for the user to type and press Enter, then hands the typed text to your program. Type into the prompt below:</P>,
        <InputBasics />,
        <Note color={T.blue} icon="💡">In these exercises the tests do the typing for you. The expected output shows the whole conversation: the question, the typed answer, then what your program prints.</Note>,
        EX.hello,
        EX.meet,
      ],
    },
    {
      label: "Everything Is Text", kicker: "THE TRAP", title: "input() always gives you text",
      blocks: [
        <P>Whatever the user types — even <code>18</code> — arrives as a <code>str</code>. Use it in maths and one of two things happens. Sometimes Python crashes. Worse, sometimes it doesn't:</P>,
        <PlusTwoWays />,
        <P>Now fix both kinds for real — the crash first, then the silent one.</P>,
        EX.crash,
        EX.silent,
        <KeyIdea>Numbers from input() must be converted before maths. The crash is the lucky case; the silent <code>"40" + "35" = "4035"</code> is the bug that reaches your exam.</KeyIdea>,
      ],
    },
    {
      label: "int · float · str", kicker: "CONVERSION", title: "Three converters",
      blocks: [
        <P>Python has a converter for each basic type. Click each one:</P>,
        <Converters />,
        EX.convert,
        EX.seats,
        EX.petrol,
        <KeyIdea>Whole things you count (seats, age, marks) → <code>int()</code>. Things that can have a decimal (money, CGPA, litres) → <code>float()</code>. Turning a number into text → <code>str()</code>.</KeyIdea>,
      ],
    },
    {
      label: "When It Fails", kicker: "ValueError & TypeError", title: "When conversion goes wrong",
      blocks: [
        <P>Converters have rules. <code>int("8.5")</code> fails with <code>ValueError</code>, because the text isn't a whole number. And <code>"text" + number</code> fails with <code>TypeError</code>. Read each error, then fix it.</P>,
        EX.cgpa,
        EX.glue,
        <KeyIdea><code>ValueError</code>: the type is right but the content can't be converted. <code>TypeError</code>: two types that can't be combined. The coach tells you which one you hit.</KeyIdea>,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: split the bill",
      blocks: [
        <P>Two inputs, two different converters, one calculation. The shape of almost every useful program: <strong>input → convert → compute → print</strong>.</P>,
        EX.split,
      ],
    },
  ];
  return (
    <LessonShell
      {...props}
      unitId="Unit4_3"
      crumb="MODULE 4 › UNIT 4.3"
      title="Input & Type Conversion"
      sections={sections}
      quiz={QUIZ}
      next={{ title: "Unit 4.4 — Operators & Expressions", text: "// and % start earning their keep, plus rounding, shortcuts like +=, and your first import." }}
    />
  );
}
