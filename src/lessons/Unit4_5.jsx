// Unit 4.5 — Formatted Output (NEW in the typing-first redesign)
// f-strings, expressions inside { }, :.2f decimals, print(sep=, end=),
// escape sequences \n \t, and a formatted canteen receipt.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note, CodeBlock } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const term = { margin: 0, fontFamily: CODE_FONT, fontSize: 15, lineHeight: 1.7, background: T.termBg, color: T.termText, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre" };
const code = { margin: 0, fontFamily: CODE_FONT, fontSize: 15, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", whiteSpace: "pre-wrap" };

// ── Widget: three ways to print the same line ──
const WAYS = [
  { k: "commas", label: "commas", c: T.red, src: 'print("Hi", name, "!")\nprint("Each pays: Rs", share)', out: "Hi Meena !\nEach pays: Rs 333.3333333333333",
    note: "Commas always add a space (Hi Meena !) and print every decimal Python has." },
  { k: "plus", label: "+ and str()", c: T.orange, src: 'print("Hi " + name + "!")\nprint("Each pays: Rs " + str(share))', out: "Hi Meena!\nEach pays: Rs 333.3333333333333",
    note: "No extra space now — but str( ) everywhere, and the decimals are still a mess." },
  { k: "f", label: "f-string", c: T.green, src: 'print(f"Hi {name}!")\nprint(f"Each pays: Rs {share:.2f}")', out: "Hi Meena!\nEach pays: Rs 333.33",
    note: "Write the sentence you want; put each value in { }. :.2f means 2 decimal places." },
];
function ThreeWays() {
  const [k, setK] = useState("commas");
  const w = WAYS.find((x) => x.k === k);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {WAYS.map((x) => (
          <button key={x.k} onClick={() => setK(x.k)} style={{ padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 700,
            border: `1.5px solid ${k === x.k ? x.c : T.border}`, background: k === x.k ? x.c : T.card, color: k === x.k ? "#fff" : T.text }}>{x.label}</button>
        ))}
      </div>
      <div className="fh-two">
        <pre style={code}>{'name = "Meena"\nshare = 1000 / 3\n' + w.src}</pre>
        <div>
          <pre style={term}>{w.out}</pre>
          <div style={{ fontSize: 14.5, color: w.c, marginTop: 8, lineHeight: 1.6 }}>{w.note}</div>
        </div>
      </div>
    </div>
  );
}

// ── Widget: format codes ──
const FMT = [
  { spec: "", v: "1000 / 3", out: "333.3333333333333" },
  { spec: ":.2f", v: "1000 / 3", out: "333.33" },
  { spec: ":.1f", v: "1000 / 3", out: "333.3" },
  { spec: ":.0f", v: "1000 / 3", out: "333" },
  { spec: ":.2f", v: "450", out: "450.00" },
];
function FormatCodes() {
  const [i, setI] = useState(1);
  const f = FMT[i];
  return (
    <div className="fh-two">
      <div style={{ display: "grid", gap: 6, alignContent: "start" }}>
        {FMT.map((x, j) => (
          <button key={j} onClick={() => setI(j)} style={{ textAlign: "left", padding: "9px 12px", borderRadius: 8, cursor: "pointer", fontFamily: CODE_FONT, fontSize: 14.5,
            border: `1.5px solid ${j === i ? T.navy : T.border}`, background: j === i ? T.navy : T.card, color: j === i ? "#fff" : T.text }}>
            f"{"{"}{x.v}{x.spec}{"}"}"
          </button>
        ))}
      </div>
      <div>
        <pre style={term}>{f.out}</pre>
        <div style={{ fontSize: 14.5, color: T.slate, marginTop: 8, lineHeight: 1.6 }}>
          {f.spec ? <><code>{f.spec}</code> — after the colon: <code>.2</code> is how many decimal places, <code>f</code> means “show as a decimal number”. It rounds for display; the variable itself is unchanged.</> : "No format code: every digit Python has."}
        </div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const LINE = "=".repeat(25);
const EX = {
  hi: {
    id: "hi", kind: "type", title: "Your first f-string",
    task: <>The <code>f</code> goes <strong>before</strong> the opening quote. Values go inside <code>{"{ }"}</code>.</>,
    show: 'name = "Meena"\nage = 18\nprint(f"Hi {name}! Next year you will be {age + 1}.")',
    tests: [{ expect: "Hi Meena! Next year you will be 19." }],
    hints: ["Check the f right before the quote, and the curly brackets { } (not round ones)."],
    solution: 'name = "Meena"\nage = 18\nprint(f"Hi {name}! Next year you will be {age + 1}.")',
  },
  noF: {
    id: "noF", kind: "fix", title: "The missing f",
    task: <>No error — but run it and look at the output. Fix it.</>,
    starter: 'total = 3 * 150\nprint("Total: {total}")',
    tests: [{ expect: "Total: 450" }],
    hints: ["Without the f, Python treats { } as ordinary characters.", 'print(f"Total: {total}")'],
    solution: 'total = 3 * 150\nprint(f"Total: {total}")',
  },
  sentence: {
    id: "sentence", kind: "write", title: "A proper sentence",
    task: <>Ask <code>Name: </code> and <code>City: </code>, then print a sentence with the full stop right after the city, e.g. <code>Meena lives in Chennai.</code> Commas can't do this (they'd add a space before the full stop) — use an f-string.</>,
    tests: [{ inputs: ["Meena", "Chennai"], expect: "Name: Meena\nCity: Chennai\nMeena lives in Chennai." }, { inputs: ["Arun", "Madurai"], expect: "Name: Arun\nCity: Madurai\nArun lives in Madurai.", hidden: true }],
    requires: [{ node: "JoinedStr", msg: "Use an f-string: f\"...{name}...\"" }],
    hints: ['print(f"{name} lives in {city}.")'],
    solution: 'name = input("Name: ")\ncity = input("City: ")\nprint(f"{name} lives in {city}.")',
  },
  times: {
    id: "times", kind: "write", title: "A times-table line",
    task: <>Ask for two whole numbers, <code>a: </code> and <code>b: </code>, and print one line like <code>7 x 8 = 56</code>. Calculate inside the braces: <code>{"{a * b}"}</code>.</>,
    tests: [{ inputs: ["7", "8"], expect: "a: 7\nb: 8\n7 x 8 = 56" }, { inputs: ["12", "12"], expect: "a: 12\nb: 12\n12 x 12 = 144", hidden: true }],
    requires: [{ node: "JoinedStr", msg: "Use an f-string." }],
    hints: ["Convert both inputs with int( ).", 'print(f"{a} x {b} = {a * b}")'],
    solution: 'a = int(input("a: "))\nb = int(input("b: "))\nprint(f"{a} x {b} = {a * b}")',
  },
  decimals: {
    id: "decimals", kind: "type", title: "Decimal places",
    task: <>Predict, type, run. Notice the last line: <code>:.2f</code> adds zeros too.</>,
    show: 'pi = 3.14159265\nprint(f"{pi:.2f}")\nprint(f"{pi:.4f}")\nprint(f"{10 / 3:.1f}")\nprint(f"Rs {450:.2f}")',
    tests: [{ expect: "3.14\n3.1416\n3.3\nRs 450.00" }],
    hints: ["The colon goes inside the braces, after the value: {pi:.2f}"],
    solution: 'pi = 3.14159265\nprint(f"{pi:.2f}")\nprint(f"{pi:.4f}")\nprint(f"{10 / 3:.1f}")\nprint(f"Rs {450:.2f}")',
  },
  split: {
    id: "split", kind: "modify", title: "Split the bill, in rupees and paise",
    task: <>Your bill-splitter from Unit 4.3, with <code>1000</code> and <code>3</code>, printed <code>Rs 333.3333333333333</code>. Change the last line to an f-string so money always shows exactly 2 decimal places.</>,
    starter: 'bill = float(input("Total bill: "))\nfriends = int(input("Friends: "))\nshare = bill / friends\nprint("Each pays: Rs", share)',
    tests: [{ inputs: ["1000", "3"], expect: "Total bill: 1000\nFriends: 3\nEach pays: Rs 333.33" }, { inputs: ["900", "3"], expect: "Total bill: 900\nFriends: 3\nEach pays: Rs 300.00", hidden: true }],
    requires: [{ text: ".2f", msg: "Use :.2f inside the braces." }],
    hints: ['print(f"Each pays: Rs {share:.2f}")'],
    solution: 'bill = float(input("Total bill: "))\nfriends = int(input("Friends: "))\nshare = bill / friends\nprint(f"Each pays: Rs {share:.2f}")',
  },
  date: {
    id: "date", kind: "write", title: "sep= : choose the separator",
    task: <>Commas in print put a space between items. <code>sep=</code> changes that: <code>print(1, 2, 3, sep="-")</code> shows <code>1-2-3</code>. With <code>day = 12</code>, <code>month = 11</code>, <code>year = 2026</code>, print <code>12/11/2026</code> using one print with commas and <code>sep</code>.</>,
    tests: [{ expect: "12/11/2026" }],
    requires: [{ text: "sep", msg: "Use sep=\"/\" inside print( )." }],
    forbids: [{ text: '"12/', msg: "Don't type the date — print the three variables with sep." }],
    hints: ['print(day, month, year, sep="/")'],
    solution: 'day = 12\nmonth = 11\nyear = 2026\nprint(day, month, year, sep="/")',
  },
  loading: {
    id: "loading", kind: "complete", title: "end= : stay on the same line",
    task: <>Every print normally ends with a new line. <code>end=""</code> replaces that. Fill the blank so the output is one line: <code>Loading...done</code>.</>,
    starter: 'print("Loading", ___)\nprint("...", end="")\nprint("done")',
    tests: [{ expect: "Loading...done" }],
    hints: ['end="" means: end with nothing instead of a new line.'],
    solution: 'print("Loading", end="")\nprint("...", end="")\nprint("done")',
  },
  address: {
    id: "address", kind: "write", title: "\\n and \\t inside text",
    task: <>Inside quotes, <code>\n</code> starts a new line and <code>\t</code> jumps to the next tab stop. Print this address using <strong>one</strong> print and <code>\n</code>:</>,
    tests: [{ expect: "Foothold Canteen\nNo. 1, College Road\nChennai 600116" }],
    requires: [{ call: "print", min: 1 }],
    forbids: [{ call: "print", max: 1, msg: "Use one print( ) with \\n inside the text." }],
    hints: ['print("Foothold Canteen\\nNo. 1, College Road\\nChennai 600116")'],
    solution: 'print("Foothold Canteen\\nNo. 1, College Road\\nChennai 600116")',
  },
  receipt: {
    id: "receipt", kind: "make", title: "The canteen receipt",
    task: <>Ask <code>Item: </code>, <code>Qty: </code> (whole number) and <code>Price: </code> (decimal). Total = qty × price; GST is 5% of the total; To pay = total + GST. Print the receipt exactly — money always with 2 decimals, lines made with <code>"=" * 25</code>.</>,
    minLines: 14,
    tests: [
      { inputs: ["Samosa", "4", "15"], expect: `Item: Samosa\nQty: 4\nPrice: 15\n${LINE}\n     FOOTHOLD CANTEEN\n${LINE}\nItem   : Samosa\nQty    : 4\nTotal  : Rs 60.00\nGST 5% : Rs 3.00\nTo pay : Rs 63.00\n${LINE}` },
      { inputs: ["Masala Dosa", "2", "45.5"], expect: `Item: Masala Dosa\nQty: 2\nPrice: 45.5\n${LINE}\n     FOOTHOLD CANTEEN\n${LINE}\nItem   : Masala Dosa\nQty    : 2\nTotal  : Rs 91.00\nGST 5% : Rs 4.55\nTo pay : Rs 95.55\n${LINE}`, hidden: true },
    ],
    requires: [{ node: "JoinedStr", min: 3, msg: "Use f-strings for the receipt lines." }, { text: ".2f", msg: "Money needs :.2f." }],
    forbids: [{ text: "=====", msg: "Draw the lines with \"=\" * 25." }],
    hints: ["Three inputs, three calculations: total, gst = total * 0.05, pay = total + gst.", 'print(f"Total  : Rs {total:.2f}")', "Count the spaces after Item, Qty, Total… so the colons line up."],
    solution: 'item = input("Item: ")\nqty = int(input("Qty: "))\nprice = float(input("Price: "))\ntotal = qty * price\ngst = total * 0.05\npay = total + gst\nprint("=" * 25)\nprint("     FOOTHOLD CANTEEN")\nprint("=" * 25)\nprint(f"Item   : {item}")\nprint(f"Qty    : {qty}")\nprint(f"Total  : Rs {total:.2f}")\nprint(f"GST 5% : Rs {gst:.2f}")\nprint(f"To pay : Rs {pay:.2f}")\nprint("=" * 25)',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What does this print?", code: 'name = "Arun"\nprint(f"Hi {name}!")', options: ["Hi {name}!", "Hi Arun!", "Hi Arun !", "f\"Hi Arun!\""], answer: 1, explain: "The f makes Python replace {name} with the value." },
  { q: "What does this print?", code: 'x = 5\nprint("x is {x}")', options: ["x is 5", "x is {x}", "Error", "x is x"], answer: 1, explain: "No f before the quote, so the braces are just characters. No error — a silent bug." },
  { q: "What does f\"{2 / 3:.2f}\" give?", options: ["0.66", "0.67", "0.6666", "0.7"], answer: 1, explain: ":.2f rounds to 2 decimal places for display: 0.67." },
  { q: "What does print(\"a\", \"b\", \"c\", sep=\"\") show?", options: ["a b c", "abc", "a,b,c", "\"abc\""], answer: 1, explain: "sep is what goes between items. An empty sep joins them directly." },
  { q: "What is the output?", code: 'print("Hello", end=" ")\nprint("World")', options: ["Hello\\nWorld", "Hello World (one line)", "HelloWorld", "Hello  World"], answer: 1, explain: "end=\" \" ends the first print with a space instead of a new line." },
  { q: "What does \\n inside a string do?", options: ["Prints the letter n", "Starts a new line", "Adds a tab", "Ends the program"], answer: 1, explain: "\\n is the newline escape. \\t is a tab." },
];

export default function Unit4_5(props) {
  const sections = [
    {
      label: "Why f-strings?", kicker: "THE NEED", title: "Printing exactly what you mean",
      blocks: [
        <P>Commas in print are easy but clumsy: they add a space you didn't want, and money comes out as <code>333.3333333333333</code>. Compare three ways of printing the same two lines:</P>,
        <ThreeWays />,
        EX.hi,
        EX.noF,
        <KeyIdea>An <strong>f-string</strong> is text with an <code>f</code> before the quote. Anything inside <code>{"{ }"}</code> is worked out and dropped into the text — spacing and punctuation are exactly as you typed them.</KeyIdea>,
      ],
    },
    {
      label: "Inside { }", kicker: "VALUES AND EXPRESSIONS", title: "Any expression can go in the braces",
      blocks: [
        <P>Not just names: <code>{"{age + 1}"}</code>, <code>{"{a * b}"}</code>, even <code>{"{name.upper()}"}</code> later on. Python works it out, then prints the result in place.</P>,
        EX.sentence,
        EX.times,
      ],
    },
    {
      label: "Decimal Places", kicker: ":.2f", title: "Money with exactly two decimals",
      blocks: [
        <P>Add a colon and a <strong>format code</strong> after the value. Click each:</P>,
        <FormatCodes />,
        EX.decimals,
        EX.split,
        <Note icon="💡"><code>:.2f</code> only changes how the number is <em>shown</em>. To change the stored value, use <code>round(x, 2)</code> from Unit 4.4.</Note>,
      ],
    },
    {
      label: "sep · end · \\n", kicker: "CONTROLLING PRINT", title: "sep, end, and escape characters",
      blocks: [
        <div className="fh-two" style={{ maxWidth: 880 }}>
          <CodeBlock title="print's defaults" code={'print("a", "b")      # a b   (sep=" ")\nprint("x")           # ends with a new line (end="\\n")'} />
          <CodeBlock title="escapes inside text" code={'"\\n"   new line\n"\\t"   tab\n"\\\\"   a real backslash\n"\\""   a quote inside quotes'} />
        </div>,
        EX.date,
        EX.loading,
        EX.address,
        <Note color={T.blue} icon="📜">Long text over several lines can also use triple quotes: <code>"""line one{"\n"}line two"""</code> keeps the line breaks exactly as typed.</Note>,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: the canteen receipt",
      blocks: [
        <P>Input, conversion, calculation, <code>"=" * 25</code>, and f-strings with <code>:.2f</code> — all of Module 4 in one receipt.</P>,
        EX.receipt,
      ],
    },
  ];
  return (
    <LessonShell
      {...props}
      unitId="Unit4_5"
      crumb="MODULE 4 › UNIT 4.5"
      title="Formatted Output"
      sections={sections}
      quiz={QUIZ}
      next={{ title: "Module 5 — Making Decisions", text: "Module 4 is complete! Next your programs start choosing: if, elif, else. (Optional first: Module 4's Crucible.)" }}
    />
  );
}
