// Unit 4.2 — Variables & Memory (rebuilt on the typing-first lesson kit)
// Memory model (corrected in the rebuild): a variable is a NAME TAG on a value.
// `=` computes the right side, then ties the tag to that value. Updating makes
// a new value and moves the tag — it does not overwrite the old box.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, MONO, tint } from "../kit/theme.js";

const smallBtn = (on, color = T.navy) => ({
  padding: "9px 16px", borderRadius: 8, border: `1.5px solid ${on ? color : T.border}`, background: on ? color : T.card,
  color: on ? "#fff" : T.text, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 14,
});

// ── Widget: why a variable? (score tracker with and without memory) ──
function NeedForVariable() {
  const [without, setWithout] = useState(0);
  const [score, setScore] = useState(0);
  const card = (ok) => ({ background: T.card, border: `1.5px solid ${tint(ok ? T.green : T.red, "66")}`, borderRadius: 12, padding: 16 });
  return (
    <div className="fh-two">
      <div style={card(false)}>
        <div style={{ color: T.red, fontWeight: 700, fontSize: 13 }}>❌ WITHOUT A VARIABLE</div>
        <div style={{ fontSize: 44, fontWeight: 700, textAlign: "center", margin: "8px 0" }}>{without}</div>
        <button onClick={() => setWithout(1)} style={{ ...smallBtn(false), width: "100%" }}>⚽ Score a goal</button>
        <div style={{ color: T.slate, fontSize: 13.5, marginTop: 10, lineHeight: 1.6 }}>Click five times. It never passes 1: there's nowhere to remember the last score, so every click starts from nothing.</div>
      </div>
      <div style={card(true)}>
        <div style={{ color: T.green, fontWeight: 700, fontSize: 13 }}>✅ WITH A VARIABLE</div>
        <div style={{ fontSize: 44, fontWeight: 700, textAlign: "center", margin: "8px 0", color: T.green }}>{score}</div>
        <button onClick={() => setScore(score + 1)} style={{ ...smallBtn(true, T.green), width: "100%" }}>⚽ Score a goal</button>
        <div style={{ color: T.slate, fontSize: 13.5, marginTop: 10, lineHeight: 1.6 }}>It counts, because a variable called <code>score</code> remembers the total between clicks: <code>score = score + 1</code>.</div>
      </div>
    </div>
  );
}

// ── Widget: name tags on values in memory ──
const MEM = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008];
const STEPS = [
  { code: "score = 0", slots: { 1003: "0" }, tags: { score: 1003 }, hi: 1003,
    note: "Python puts the value 0 somewhere in memory (here, slot 1003) and ties the name tag score to it. You never choose the address — Python does." },
  { code: "score = score + 1", slots: { 1003: "0", 1006: "1" }, tags: { score: 1006 }, hi: 1006, dead: [1003],
    note: "Right side first: Python reads score (0), adds 1, and gets a NEW value 1, stored in slot 1006. Then it moves the tag score onto it. The old 0 has no tag left, so Python frees that space." },
  { code: 'name = "Priya"', slots: { 1006: "1", 1008: '"Priya"' }, tags: { score: 1006, name: 1008 }, hi: 1008,
    note: "A new name gets its own tag on its own value. Nothing that happens to name can touch score." },
  { code: "best = score", slots: { 1006: "1", 1008: '"Priya"' }, tags: { score: 1006, name: 1008, best: 1006 }, hi: 1006,
    note: "No copy is made: best is a second tag on the SAME value 1. One value, two names." },
  { code: "score = 5", slots: { 1001: "5", 1006: "1", 1008: '"Priya"' }, tags: { score: 1001, name: 1008, best: 1006 }, hi: 1001,
    note: "score's tag moves to a new value 5. best's tag doesn't move — so best is still 1. Changing one name never changes another." },
  { code: "print(age)", slots: { 1001: "5", 1006: "1", 1008: '"Priya"' }, tags: { score: 1001, name: 1008, best: 1006 }, err: true,
    note: "There is no tag called age anywhere, so Python can't find a value for it: NameError. A name exists only after a line gives it a value." },
];

function NameTagMemory() {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  const tagsOn = (addr) => Object.entries(s.tags).filter(([, a]) => a === addr).map(([n]) => n);
  const tagColor = { score: T.blue, name: T.purple, best: T.orange };
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {STEPS.map((st, k) => (
          <button key={k} onClick={() => setI(k)} style={{ fontFamily: CODE_FONT, fontSize: 13, padding: "6px 10px", borderRadius: 7, cursor: "pointer",
            border: `1.5px solid ${k === i ? T.navy : T.border}`, background: k === i ? T.navy : k < i ? T.surface : T.card, color: k === i ? "#fff" : T.text }}>
            {k + 1}. {st.code}
          </button>
        ))}
      </div>
      <div style={{ background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 14px 10px", overflowX: "auto" }}>
        <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: 1.3, color: T.bronze, marginBottom: 8 }}>MEMORY (RAM) — NAME TAGS ABOVE, VALUES BELOW</div>
        <div style={{ display: "flex", gap: 6, minWidth: 560 }}>
          {MEM.map((addr) => {
            const val = s.slots[addr];
            const dead = s.dead?.includes(addr);
            const on = s.hi === addr;
            return (
              <div key={addr} style={{ flex: 1, minWidth: 58, textAlign: "center" }}>
                <div style={{ minHeight: 54, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 3, marginBottom: 4 }}>
                  {tagsOn(addr).map((n) => (
                    <div key={n} style={{ fontFamily: CODE_FONT, fontSize: 12, fontWeight: 700, color: "#fff", background: tagColor[n] || T.teal, borderRadius: 6, padding: "2px 4px" }}>🏷 {n}</div>
                  ))}
                </div>
                <div style={{ border: `1.5px solid ${on ? T.teal : val ? tint(T.teal, "77") : T.border}`, background: val ? (dead ? T.deep : tint(T.teal, "14")) : T.card,
                  borderRadius: 8, height: 46, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CODE_FONT, fontSize: 14,
                  color: dead ? T.muted : T.text, textDecoration: dead ? "line-through" : "none", boxShadow: on ? `0 0 0 3px ${tint(T.teal, "33")}` : "none", transition: "all .3s" }}>
                  {val || "·"}
                </div>
                <div style={{ fontFamily: CODE_FONT, fontSize: 10.5, color: T.muted, marginTop: 3 }}>{addr}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: 10, background: tint(s.err ? T.red : T.purple, "10"), border: `1px solid ${tint(s.err ? T.red : T.purple, "44")}`, borderRadius: 10, padding: "12px 16px", fontSize: 14.5, color: T.slate, lineHeight: 1.65 }}>
        <code>{s.code}</code> — {s.note}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={smallBtn(false)}>◀ Back</button>
        <button onClick={() => setI(Math.min(STEPS.length - 1, i + 1))} disabled={i === STEPS.length - 1} style={smallBtn(true)}>Next line ▶</button>
        <span style={{ alignSelf: "center", color: T.muted, fontSize: 13 }}>Line {i + 1} / {STEPS.length}</span>
      </div>
    </div>
  );
}

// ── Widget: legal or illegal name? ──
const NAMES = [
  { n: "total_marks", ok: true, why: "Letters and underscores — perfect. This style (snake_case) is the Python convention." },
  { n: "2nd_place", ok: false, why: "Can't START with a digit. second_place or place_2 work." },
  { n: "first name", ok: false, why: "No spaces allowed — Python sees two words. Use first_name." },
  { n: "class", ok: false, why: "class is a Python keyword (it has a job already). Keywords can't be names." },
  { n: "_temp", ok: true, why: "An underscore at the start is allowed." },
  { n: "roll-no", ok: false, why: "A hyphen means minus: Python reads roll minus no. Use roll_no." },
  { n: "Marks", ok: true, why: "Legal — but Marks and marks are two DIFFERENT names. Python is case-sensitive." },
];
function NameChecker() {
  const [ans, setAns] = useState({});
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 960 }}>
      {NAMES.map((x, i) => {
        const a = ans[i];
        const right = a !== undefined && a === x.ok;
        return (
          <div key={i} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, background: T.card, border: `1.5px solid ${a === undefined ? T.border : right ? T.green : T.red}`, borderRadius: 10, padding: "9px 12px" }}>
            <code style={{ fontSize: 15, minWidth: 130 }}>{x.n}</code>
            {a === undefined ? (
              <span style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
                <button onClick={() => setAns({ ...ans, [i]: true })} style={{ ...smallBtn(false), padding: "5px 12px", fontSize: 13 }}>✅ legal</button>
                <button onClick={() => setAns({ ...ans, [i]: false })} style={{ ...smallBtn(false), padding: "5px 12px", fontSize: 13 }}>❌ illegal</button>
              </span>
            ) : (
              <span style={{ fontSize: 13.5, marginLeft: "auto", maxWidth: 600, color: right ? T.green : T.red }}>{right ? "✓" : "✗"} <span style={{ color: T.slate }}>{x.why}</span></span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Widget: four basic types ──
const TYPES = [
  { v: "18", t: "int", c: T.blue, d: "A whole number — no decimal point. Counting, ages, seats." },
  { v: "8.7", t: "float", c: T.teal, d: "A number with a decimal point. CGPA, prices, averages." },
  { v: '"Priya"', t: "str", c: T.purple, d: "Text, always in quotes. Short for string (of characters)." },
  { v: "True", t: "bool", c: T.green, d: "Only True or False, no quotes, capital T/F. Yes/no answers." },
  { v: '"18"', t: "str", c: T.orange, d: "Careful: in quotes it's TEXT that happens to look like a number. You can't do maths with it (Unit 4.3)." },
];
function TypeExplorer() {
  const [sel, setSel] = useState(0);
  const x = TYPES[sel];
  return (
    <div className="fh-two">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignContent: "flex-start" }}>
        {TYPES.map((y, k) => (
          <button key={k} onClick={() => setSel(k)} style={{ fontFamily: CODE_FONT, fontSize: 16, padding: "12px 16px", borderRadius: 10, cursor: "pointer",
            border: `1.5px solid ${k === sel ? y.c : T.border}`, background: k === sel ? tint(y.c, "18") : T.card, color: k === sel ? y.c : T.text, fontWeight: 700 }}>{y.v}</button>
        ))}
      </div>
      <div style={{ background: T.card, border: `1.5px solid ${tint(x.c, "66")}`, borderRadius: 12, padding: 16 }}>
        <div style={{ fontFamily: CODE_FONT, color: T.muted, fontSize: 14 }}>&gt;&gt;&gt; print(type({x.v}))</div>
        <div style={{ fontFamily: CODE_FONT, fontSize: 20, fontWeight: 700, color: x.c, margin: "6px 0 8px" }}>&lt;class '{x.t}'&gt;</div>
        <div style={{ color: T.slate, fontSize: 14.5, lineHeight: 1.6 }}>{x.d}</div>
      </div>
    </div>
  );
}

// ── Widget: C declares the type, Python reads it from the value ──
function PythonVsC() {
  const [re, setRe] = useState(false);
  const box = (c) => ({ background: T.card, border: `1.5px solid ${tint(c, "66")}`, borderRadius: 12, padding: 14 });
  const pre = { margin: "8px 0", fontFamily: CODE_FONT, fontSize: 14, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 12px" };
  return (
    <div>
      <div className="fh-two">
        <div style={box(T.orange)}>
          <div style={{ color: T.orange, fontWeight: 700 }}>⚙️ C — type declared up front</div>
          <pre style={pre}>{re ? 'int score = 0;\nscore = "high";   /* rejected */' : "int score = 0;"}</pre>
          <div style={{ color: T.slate, fontSize: 14, lineHeight: 1.6 }}>
            <code>int</code> fixes the box's type (and size, usually 4 bytes) before the program runs.
            {re && <span style={{ color: T.red }}> A slot declared int can't hold text — the compiler stops you.</span>}
          </div>
        </div>
        <div style={box(T.blue)}>
          <div style={{ color: T.blue, fontWeight: 700 }}>🐍 Python — type read from the value</div>
          <pre style={pre}>{re ? 'score = 0\nscore = "high"   # fine' : "score = 0"}</pre>
          <div style={{ color: T.slate, fontSize: 14, lineHeight: 1.6 }}>
            The type belongs to the <em>value</em>, not the name.
            {re && <span style={{ color: T.green }}> The tag score just moves to a text value. This is <strong>dynamic typing</strong>.</span>}
          </div>
        </div>
      </div>
      <button onClick={() => setRe(!re)} style={{ ...smallBtn(re, T.purple), marginTop: 10 }}>{re ? "◀ Hide" : '▶ What if we later write score = "high"?'}</button>
    </div>
  );
}

// ── Exercise specs ──
const EX = {
  counter: {
    id: "counter", kind: "type", title: "A score that remembers",
    task: <>Type this program. Predict the three numbers before you run it.</>,
    show: "score = 0\nprint(score)\nscore = score + 1\nprint(score)\nscore = score + 1\nprint(score)",
    tests: [{ expect: "0\n1\n2" }],
    hints: ["score = score + 1 means: take the current score, add 1, store it back under the name score."],
    solution: "score = 0\nprint(score)\nscore = score + 1\nprint(score)\nscore = score + 1\nprint(score)",
  },
  tags: {
    id: "tags", kind: "type", title: "Two tags, one value",
    task: <>The exam trap from the last step of the memory walkthrough. <strong>Before running</strong>, decide: what will <code>best</code> print? Then type it and check.</>,
    show: 'score = 10\nbest = score\nscore = 25\nprint("score:", score)\nprint("best:", best)',
    tests: [{ expect: "score: 25\nbest: 10" }],
    hints: ["best = score ties best to the value 10. Moving score's tag later doesn't move best's tag."],
    solution: 'score = 10\nbest = score\nscore = 25\nprint("score:", score)\nprint("best:", best)',
  },
  seats: {
    id: "seats", kind: "complete", title: "Fill in the seats",
    task: <>Arun's family needs <strong>4</strong> seats. Replace <code>___</code> so the program prints <code>Total: 600</code>. Change nothing else.</>,
    starter: 'price = 150\nseats = ___\ntotal = price * seats\nprint("Total:", total)',
    tests: [{ expect: "Total: 600" }],
    post: "assert seats == 4, 'seats should hold the number 4'",
    hints: ["A number has no quotes: seats = 4"],
    solution: 'price = 150\nseats = 4\ntotal = price * seats\nprint("Total:", total)',
  },
  cinema: {
    id: "cinema", kind: "write", title: "Your own cinema bill",
    task: <>From a blank editor: create <code>price</code> holding 180 and <code>seats</code> holding 3. Make a third variable <code>total</code> that is price × seats. Print <code>Total: 540</code> using the variable.</>,
    tests: [{ expect: "Total: 540" }],
    post: "assert price == 180, 'price should be 180'\nassert seats == 3, 'seats should be 3'\nassert total == price * seats, 'total should be price * seats'",
    requires: [{ name: "total", min: 2, msg: "Create total, then use it inside print( )." }],
    forbids: [{ constant: "540", msg: "Let Python calculate 540 from price and seats." }],
    hints: ["Three assignment lines, then one print.", "total = price * seats", 'print("Total:", total)'],
    solution: 'price = 180\nseats = 3\ntotal = price * seats\nprint("Total:", total)',
  },
  wallet: {
    id: "wallet", kind: "modify", title: "Priya's wallet",
    task: <>This program tracks Priya's money. Extend it: she then buys a book for ₹250, then receives ₹100 pocket money. Update <code>wallet</code> each time <strong>using its old value</strong> and print after each step, so the output matches exactly.</>,
    starter: 'wallet = 500\nprint("Start:", wallet)\nwallet = wallet - 120   # samosa and tea\nprint("After snacks:", wallet)',
    minLines: 8,
    tests: [{ expect: "Start: 500\nAfter snacks: 380\nAfter book: 130\nAfter pocket money: 230" }],
    forbids: [{ constant: "130", msg: "Don't type 130 — update wallet with wallet - 250." }, { constant: "230", msg: "Don't type 230 — update wallet with wallet + 100." }],
    validate: (code) => ((code.match(/wallet\s*=\s*wallet/g) || []).length >= 3 ? null : "Each change should use the old value: wallet = wallet - 250, then wallet = wallet + 100."),
    hints: ["Copy the pattern of line 3: the new value is computed from the old one.", "wallet = wallet - 250, then print(\"After book:\", wallet)"],
    solution: 'wallet = 500\nprint("Start:", wallet)\nwallet = wallet - 120   # samosa and tea\nprint("After snacks:", wallet)\nwallet = wallet - 250\nprint("After book:", wallet)\nwallet = wallet + 100\nprint("After pocket money:", wallet)',
  },
  swap: {
    id: "swap", kind: "write", title: "Swap the cups",
    task: <>The cups got mixed up. Add lines where the comment is so that the two variables <strong>swap</strong> their drinks. Don't retype the words tea or coffee — move the values between variables.</>,
    starter: 'cup1 = "tea"\ncup2 = "coffee"\n# swap the drinks here\n\nprint("cup1 has", cup1)\nprint("cup2 has", cup2)',
    minLines: 8,
    tests: [{ expect: "cup1 has coffee\ncup2 has tea" }],
    forbids: [{ text: '"tea"', max: 1, msg: "Don't retype \"tea\" — move it with variables." }, { text: '"coffee"', max: 1, msg: "Don't retype \"coffee\" — move it with variables." }, { node: "Tuple", msg: "There's a one-line trick for this you'll meet with tuples. Today, do it the way every language can: with a third variable." }],
    hints: ["If you write cup1 = cup2 first, the tea is lost — both cups hold coffee. Save the tea first.", "Use a spare variable: temp = cup1", "temp = cup1, then cup1 = cup2, then cup2 = temp"],
    solution: 'cup1 = "tea"\ncup2 = "coffee"\ntemp = cup1\ncup1 = cup2\ncup2 = temp\nprint("cup1 has", cup1)\nprint("cup2 has", cup2)',
  },
  order: {
    id: "order", kind: "fix", title: "Used before it exists",
    task: <>Run it, read the coach, fix it.</>,
    starter: 'print("Marks:", marks)\nmarks = 87',
    tests: [{ expect: "Marks: 87" }],
    hints: ["Python runs top to bottom. On line 1, has marks been created yet?"],
    solution: 'marks = 87\nprint("Marks:", marks)',
  },
  caps: {
    id: "caps", kind: "fix", title: "One capital letter",
    task: <>Run it, read the coach, fix it.</>,
    starter: "Total = 250\nprint(total)",
    tests: [{ expect: "250" }],
    hints: ["Look very closely at the first letter of the name on each line."],
    solution: "total = 250\nprint(total)",
  },
  names: {
    id: "names", kind: "fix", title: "Two illegal names",
    task: <>Both names break the naming rules. Rename them to legal names (e.g. <code>first_name</code>, <code>second_place</code>). Fix one error, run again, fix the next.</>,
    starter: 'first name = "Meena"\n2nd_place = "Arun"\nprint(first name, 2nd_place)',
    tests: [{ expect: "Meena Arun" }],
    forbids: [{ text: "2nd", msg: "A name can't start with a digit — rename 2nd_place." }],
    validate: (code) => (/first name/.test(code) ? "first name still has a space in it." : null),
    hints: ["Names are one word: join words with _", "A name can't start with a digit."],
    solution: 'first_name = "Meena"\nsecond_place = "Arun"\nprint(first_name, second_place)',
  },
  types: {
    id: "types", kind: "type", title: "Ask Python for the type",
    task: <>Type it and run. Look at the last line carefully.</>,
    show: 'print(type(18))\nprint(type(8.7))\nprint(type("Priya"))\nprint(type(True))\nprint(type("18"))',
    tests: [{ expect: "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>\n<class 'str'>" }],
    hints: ["True has no quotes and a capital T."],
    solution: 'print(type(18))\nprint(type(8.7))\nprint(type("Priya"))\nprint(type(True))\nprint(type("18"))',
  },
  record: {
    id: "record", kind: "write", title: "A student record",
    task: <>Create five variables with the <strong>right types</strong>: <code>name</code> is Priya, <code>roll</code> is 22CS1042, <code>age</code> is 18 (a whole number), <code>cgpa</code> is 8.7, <code>hostel</code> is True (a yes/no value). Then print all five with <strong>one</strong> print, separated by commas.</>,
    minLines: 7,
    tests: [{ expect: "Priya 22CS1042 18 8.7 True" }],
    post: [
      "assert type(name) is str, 'name is text, so it needs quotes'",
      "assert type(roll) is str, 'roll has letters in it, so it is text and needs quotes'",
      "assert type(age) is int, 'age should be a whole number: no quotes, no decimal point'",
      "assert type(cgpa) is float, 'cgpa should be a decimal number: no quotes'",
      "assert type(hostel) is bool, 'hostel should be True with no quotes (a bool)'",
    ].join("\n"),
    requires: ["name", "roll", "age", "cgpa", "hostel"].map((n) => ({ name: n, min: 2, msg: `Use the variable ${n} inside print( ).` })),
    hints: ["Text in quotes; numbers and True without.", 'print(name, roll, age, cgpa, hostel)'],
    solution: 'name = "Priya"\nroll = "22CS1042"\nage = 18\ncgpa = 8.7\nhostel = True\nprint(name, roll, age, cgpa, hostel)',
  },
  canteen: {
    id: "canteen", kind: "make", title: "The canteen bill",
    task: <>Arun buys 4 samosas at ₹15 and 3 teas at ₹10. Store each price and quantity in a variable, calculate both line totals and the grand total with variables, and print exactly this. Blank editor — your program from start to finish.</>,
    minLines: 10,
    tests: [{ expect: "Samosa: 4 x 15 = 60\nTea: 3 x 10 = 30\nTotal: 90" }],
    requires: [{ node: "Assign", min: 7, msg: "Use variables: 4 for prices and quantities, plus the two line totals and the grand total." }, { node: "BinOp", min: 3, msg: "Calculate both line totals and the grand total." }],
    forbids: [{ constant: "60", msg: "Let Python calculate 60." }, { constant: "30", msg: "Let Python calculate 30." }, { constant: "90", msg: "Let Python calculate 90." }],
    hints: ['print can mix text and variables: print("Samosa:", samosa_qty, "x", samosa_price, "=", samosa_total)', "total = samosa_total + tea_total"],
    solution: 'samosa_price = 15\nsamosa_qty = 4\ntea_price = 10\ntea_qty = 3\nsamosa_total = samosa_qty * samosa_price\ntea_total = tea_qty * tea_price\ntotal = samosa_total + tea_total\nprint("Samosa:", samosa_qty, "x", samosa_price, "=", samosa_total)\nprint("Tea:", tea_qty, "x", tea_price, "=", tea_total)\nprint("Total:", total)',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What does score = score + 1 do?", options: ["Creates a second variable called score", "Calculates score + 1, then ties the name score to that new value", "Causes an error: score can't be on both sides", "Prints score + 1"], answer: 1,
    explain: "The right side is worked out first using the current value; then the name is tied to the result. That's why 'score on both sides' is fine." },
  { q: "What does this print?", code: "x = 5\ny = x\nx = 9\nprint(y)", options: ["9", "5", "14", "NameError"], answer: 1,
    explain: "y = x tags y onto the value 5. x = 9 moves only x's tag. y is still 5." },
  { q: "Which is a legal variable name?", options: ["2nd_mark", "total marks", "total_marks", "class"], answer: 2,
    explain: "Names can't start with a digit, can't contain spaces, and can't be keywords. total_marks is fine." },
  { q: "What does print(type(\"18\")) show?", options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "18"], answer: 1,
    explain: "Quotes make it text. \"18\" looks like a number but is a str — exactly what input() gives you in Unit 4.3." },
  { q: "Why does this crash?", code: 'print(age)\nage = 18', options: ["age is a keyword", "Line 1 uses age before line 2 creates it", "18 needs quotes", "print can't show numbers"], answer: 1,
    explain: "Python runs top to bottom. On line 1 the name age doesn't exist yet: NameError." },
  { q: "What does this print?", code: "a = 1\nb = 2\na = b\nb = a\nprint(a, b)", options: ["2 1", "1 2", "2 2", "1 1"], answer: 2,
    explain: "a = b makes a 2; then b = a makes b 2 as well. The 1 was lost — that's why a swap needs a third variable." },
  { q: "What does 'dynamic typing' mean?", options: ["Variables can't change", "The type comes from the value, and a name can later hold a different type", "You must declare types like C", "Python only stores numbers"], answer: 1,
    explain: "In Python the type belongs to the value. score can hold 0 now and \"high\" later." },
];

export default function Unit4_2(props) {
  const sections = [
    {
      label: "Why a Variable?", kicker: "THE NEED", title: "Programs need to remember",
      blocks: [
        <P>Imagine a football score tracker. Every goal, someone clicks a button. Try both trackers — click each one five times.</P>,
        <NeedForVariable />,
        <KeyIdea>A <strong>variable</strong> is a name your program uses to remember a value while it runs — and to update it.</KeyIdea>,
        EX.counter,
      ],
    },
    {
      label: "Inside Memory", kicker: "WHAT = REALLY DOES", title: "A variable is a name tag on a value",
      blocks: [
        <P>Memory (RAM) is a long row of numbered slots. Values live in the slots. A variable is a <strong>name tag</strong> tied to one of those values. <code>=</code> means: <em>work out the right side, then tie the name on the left to it</em>. Step through, one line at a time.</P>,
        <NameTagMemory />,
        <KeyIdea>Read <code>=</code> as “now refers to”, not “equals”. Updating a variable makes a new value and moves the tag. Two names can share one value — and moving one tag never moves the other.</KeyIdea>,
        EX.tags,
      ],
    },
    {
      label: "Using Variables", kicker: "NAMES INSTEAD OF NUMBERS", title: "Calculate with names",
      blocks: [
        <P>Once a value has a name, you calculate with the name. Change the value in one place and every calculation follows. This is why programmers almost never type the same number twice.</P>,
        EX.seats,
        EX.cinema,
      ],
    },
    {
      label: "Update & Swap", kicker: "THE UPDATE PATTERN", title: "Change a value using its old value",
      blocks: [
        <P>The pattern <code>x = x + something</code> (or <code>-</code>, <code>*</code>) is everywhere: scores, wallets, counters, totals. Right side first with the old value, then the name moves to the new one.</P>,
        EX.wallet,
        <Note color={T.blue} icon="🧠">The swap is a classic exam question. Before writing it, think: if <code>cup1 = cup2</code> runs first, where did the tea go?</Note>,
        EX.swap,
      ],
    },
    {
      label: "Names & Errors", kicker: "RULES FOR NAMES", title: "What you can call a variable",
      blocks: [
        <P>Names may use letters, digits and <code>_</code>, but can't start with a digit, can't contain spaces, and can't be a Python keyword. Python is <strong>case-sensitive</strong>. Decide for each name:</P>,
        <NameChecker />,
        <P>Now three real bugs. Run each one first and read what the coach says.</P>,
        EX.order, EX.caps, EX.names,
        <KeyIdea>A <code>NameError</code> means Python has no tag with that name at that moment: misspelt, wrong capital, or used before the line that creates it.</KeyIdea>,
      ],
    },
    {
      label: "Data Types", kicker: "WHAT KIND OF VALUE", title: "Every value has a type",
      blocks: [
        <P>Python works out a value's <strong>type</strong> from how you write it. The type decides what you can do with it. <code>type( )</code> tells you. Click each value:</P>,
        <TypeExplorer />,
        EX.types,
        <P><strong>If you know C:</strong> there you declare the type before using a variable. In Python the type belongs to the value (if C is new to you, read only the Python side):</P>,
        <PythonVsC />,
        EX.record,
        <KeyIdea>The four basic types: <code>int</code> (whole numbers), <code>float</code> (decimals), <code>str</code> (text, in quotes), <code>bool</code> (True / False). <code>"18"</code> in quotes is a str, not a number.</KeyIdea>,
      ],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: the canteen bill",
      blocks: [
        <P>Variables for every price and quantity, calculations with names, results printed with commas. No starter code.</P>,
        EX.canteen,
      ],
    },
  ];
  return (
    <LessonShell
      {...props}
      unitId="Unit4_2"
      crumb="MODULE 4 › UNIT 4.2"
      title="Variables & Memory"
      sections={sections}
      quiz={QUIZ}
      next={{ title: "Unit 4.3 — Input & Type Conversion", text: "Your program asks the user for values — and you'll see why \"18\" from the keyboard isn't a number yet." }}
    />
  );
}
