// ============================================================================
//  UNIT 4.4 — "Operators & Expressions" (Module 4's closing unit)
// ----------------------------------------------------------------------------
//  WHERE THIS FILE FITS IN THE APP
//  --------------------------------
//  Lives at src/lessons/Unit4_4.jsx. App.jsx dynamically imports this file
//  (via import.meta.glob) when the "Operators & Expressions" card is clicked
//  on the Dashboard — that card exists because config/course.config.js lists
//  { unitId: "Unit4_4", ... }, the LAST unit inside Module 4. Same contract
//  as every other lesson: props are `student` and `onUnitComplete` (called
//  once, from inside the closing Quiz, to persist progress via
//  src/shell/api.js and send the learner back to the Dashboard).
//
//  Because this is the FINAL unit of Module 4, its closing Quiz completion
//  screen says "Module 4 Complete!" (matching how Unit2_4 and Unit3_3, the
//  final units of Modules 2 and 3, each announced their own module's
//  completion) and previews Module 5 — control flow (if/else) — the natural
//  next step once a learner can store data (Module 4) and now combine it
//  with operators to make decisions.
//
//  TEACHING APPROACH FOR THIS UNIT:
//    Units 4.1-4.3 gave the student print(), variables/memory, and
//    input()/casting. This unit gives them the actual VERBS of computation —
//    arithmetic, comparison, and logical operators — then a precedence
//    puzzle so they don't just memorise operators but understand the ORDER
//    Python evaluates them in, and finally a capstone mini-project (a Simple
//    Interest calculator) that exercises everything learned across all of
//    Module 4 in one real, runnable program.
// ============================================================================

import { useState } from "react";

// ----------------------------------------------------------------------------
// COLOUR PALETTE — same convention as every other lesson: local and
// self-contained, no cross-file imports.
// ----------------------------------------------------------------------------
const C = {
  bg: "#0D1117",
  surface: "#161B22",
  card: "#1C2333",
  accent: "#58A6FF",
  accentGlow: "#1F6FEB",
  green: "#3FB950",
  yellow: "#D29922",
  purple: "#BC8CFF",
  red: "#F85149",
  orange: "#F0883E",
  teal: "#39D0D8",
  text: "#E6EDF3",
  muted: "#8B949E",
  border: "#30363D",
};

// ============================================================================
// WIDGET 1 — ArithmeticOperators
// A live two-number calculator: the student picks values for A and B with
// number inputs, then clicks any arithmetic operator to see the real Python
// result AND a one-line explanation — this is where the two operators every
// beginner finds confusing, // (floor division) and % (modulus), get an
// explicit, concrete demonstration rather than just a definition.
// ============================================================================
function ArithmeticOperators() {
  // The two operands the student is experimenting with.
  const [a, setA] = useState(17);
  const [b, setB] = useState(5);
  // Which operator button was last clicked — drives which result/explainer shows.
  const [op, setOp] = useState("+");

  // Every operator Python's arithmetic supports, with a function to compute
  // the result from the current a/b, and a short beginner-friendly note.
  const ops = [
    { symbol: "+", name: "Addition", compute: () => a + b, note: "Simple addition — exactly what you'd expect." },
    { symbol: "-", name: "Subtraction", compute: () => a - b, note: "Simple subtraction." },
    { symbol: "*", name: "Multiplication", compute: () => a * b, note: "Multiplication uses * (a plain asterisk), not ×." },
    { symbol: "/", name: "Division", compute: () => (b === 0 ? "ZeroDivisionError" : (a / b).toFixed(4).replace(/0+$/, "").replace(/\.$/, ".0")), note: "Always returns a float (decimal), even if the answer is a whole number." },
    { symbol: "//", name: "Floor Division", compute: () => (b === 0 ? "ZeroDivisionError" : Math.floor(a / b)), note: "Divides, then throws away everything after the decimal point — 'how many whole times does b fit into a?'" },
    { symbol: "%", name: "Modulus", compute: () => (b === 0 ? "ZeroDivisionError" : a % b), note: "Gives the REMAINDER left over after floor division. Extremely useful for checking even/odd, or 'does X divide evenly into Y?'" },
    { symbol: "**", name: "Exponent", compute: () => Math.pow(a, b), note: "Raises a to the power of b (a*a*...*a, b times)." },
  ];

  const current = ops.find((o) => o.symbol === op);
  const result = current.compute();

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Set two numbers, then tap an operator to see exactly what Python computes — pay special attention to{" "}
        <code style={{ color: C.yellow }}>//</code> and <code style={{ color: C.yellow }}>%</code>, they surprise most beginners.
      </p>

      {/* Two operand inputs, side by side */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <label style={{ color: C.muted, fontSize: 12 }}>a</label>
          <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} style={{ width: "100%", padding: 8, borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.text, fontFamily: "monospace", fontSize: 14 }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ color: C.muted, fontSize: 12 }}>b</label>
          <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} style={{ width: "100%", padding: 8, borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.text, fontFamily: "monospace", fontSize: 14 }} />
        </div>
      </div>

      {/* Operator buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 16 }}>
        {ops.map((o) => (
          <button key={o.symbol} onClick={() => setOp(o.symbol)} style={{
            padding: "10px 2px", borderRadius: 8, fontFamily: "monospace", fontWeight: 700, fontSize: 14,
            background: op === o.symbol ? C.accentGlow : C.card,
            border: `1.5px solid ${op === o.symbol ? C.accent : C.border}`,
            color: op === o.symbol ? "#fff" : C.text, cursor: "pointer", transition: "all 0.2s",
          }}>{o.symbol}</button>
        ))}
      </div>

      {/* Result + explanation for whichever operator is selected */}
      <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 10, padding: 16 }}>
        <div style={{ fontFamily: "monospace", fontSize: 15, color: C.text, marginBottom: 8 }}>
          {a} {op} {b} = <span style={{ color: C.accent, fontWeight: 700 }}>{String(result)}</span>
        </div>
        <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>
          <strong style={{ color: C.accent }}>{current.name}:</strong> {current.note}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 2 — ComparisonAndLogic
// Two linked mini-tools: (a) a comparison-operator tester on the same two
// numbers, producing True/False; (b) a logical-operator tester using two
// toggle switches to build a full and/or/not truth table interactively.
// ============================================================================
function ComparisonAndLogic() {
  // --- comparison sub-widget state ---
  const [a, setA] = useState(8);
  const [b, setB] = useState(12);
  const [cmpOp, setCmpOp] = useState("==");
  const comparisons = {
    "==": { name: "Equal to", compute: () => a === b },
    "!=": { name: "Not equal to", compute: () => a !== b },
    ">": { name: "Greater than", compute: () => a > b },
    "<": { name: "Less than", compute: () => a < b },
    ">=": { name: "Greater than or equal to", compute: () => a >= b },
    "<=": { name: "Less than or equal to", compute: () => a <= b },
  };
  const cmpResult = comparisons[cmpOp].compute();

  // --- logical sub-widget state ---
  // Two independent booleans the student can flip, representing two
  // conditions e.g. "hasTicket" and "isVIP".
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);

  return (
    <div>
      {/* --- Comparison operators --- */}
      <h4 style={{ color: C.text, fontSize: 14, marginBottom: 8 }}>Comparison Operators</h4>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>
        Comparisons always produce a <code style={{ color: C.green }}>bool</code> — either{" "}
        <span style={{ color: C.green }}>True</span> or <span style={{ color: C.red }}>False</span>. They're the
        building block of every decision your programs will make from Module 5 onward.
      </p>
      <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
        <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} style={{ width: 70, padding: 8, borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.text, fontFamily: "monospace" }} />
        <select value={cmpOp} onChange={(e) => setCmpOp(e.target.value)} style={{ padding: 8, borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.text, fontFamily: "monospace" }}>
          {Object.keys(comparisons).map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
        <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} style={{ width: 70, padding: 8, borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.text, fontFamily: "monospace" }} />
      </div>
      <div style={{
        background: (cmpResult ? C.green : C.red) + "18", border: `1px solid ${(cmpResult ? C.green : C.red)}44`,
        borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 14, marginBottom: 20,
        color: cmpResult ? C.green : C.red, fontWeight: 700,
      }}>
        {a} {cmpOp} {b} &nbsp;→&nbsp; {String(cmpResult)}
      </div>

      {/* --- Logical operators --- */}
      <h4 style={{ color: C.text, fontSize: 14, marginBottom: 8 }}>Logical Operators — and / or / not</h4>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>
        Logical operators COMBINE True/False values. Flip the two switches below to explore every combination.
      </p>
      <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
        <button onClick={() => setP((v) => !v)} style={{
          flex: 1, padding: 12, borderRadius: 8, cursor: "pointer",
          background: p ? C.green + "22" : C.red + "22", border: `1.5px solid ${p ? C.green : C.red}`,
          color: p ? C.green : C.red, fontWeight: 700,
        }}>p = {String(p)}</button>
        <button onClick={() => setQ((v) => !v)} style={{
          flex: 1, padding: 12, borderRadius: 8, cursor: "pointer",
          background: q ? C.green + "22" : C.red + "22", border: `1.5px solid ${q ? C.green : C.red}`,
          color: q ? C.green : C.red, fontWeight: 700,
        }}>q = {String(q)}</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {[
          { label: "p and q", value: p && q, hint: "True only if BOTH are True" },
          { label: "p or q", value: p || q, hint: "True if AT LEAST ONE is True" },
          { label: "not p", value: !p, hint: "Flips True ↔ False" },
        ].map((row, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.muted, marginBottom: 6 }}>{row.label}</div>
            <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: row.value ? C.green : C.red, marginBottom: 6 }}>{String(row.value)}</div>
            <div style={{ fontSize: 10, color: C.muted }}>{row.hint}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 3 — PrecedencePuzzle
// Order-of-operations matters just as much in Python as it does in maths
// class. This walks through one expression step by step, highlighting which
// piece Python evaluates FIRST, so the abstract "PEMDAS/BODMAS" rule is seen
// actually happening rather than just recited.
// ============================================================================
function PrecedencePuzzle() {
  // The steps Python actually takes to evaluate 2 + 3 * 4 - 6 / 2, in the
  // TRUE order of evaluation (multiplication/division before
  // addition/subtraction, left to right within the same precedence level).
  const steps = [
    { expr: "2 + 3 * 4 - 6 / 2", highlight: "3 * 4", note: "Multiplication and division are evaluated before addition and subtraction. Python finds 3 * 4 first." },
    { expr: "2 + 12 - 6 / 2", highlight: "6 / 2", note: "Next, the remaining multiplication/division: 6 / 2." },
    { expr: "2 + 12 - 3.0", highlight: "2 + 12", note: "Now only + and - are left. Python works left to right, so 2 + 12 happens before the subtraction." },
    { expr: "14 - 3.0", highlight: "14 - 3.0", note: "Finally, the last subtraction." },
    { expr: "11.0", highlight: null, note: "Final answer: 11.0 (a float, because / always produces a float)." },
  ];

  const [step, setStep] = useState(0);
  const s = steps[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Python follows the same order-of-operations rule you learned in maths class (often remembered as{" "}
        <strong style={{ color: C.accent }}>PEMDAS/BODMAS</strong>): brackets first, then powers, then{" "}
        <strong>*</strong> and <strong>/</strong>, then <strong>+</strong> and <strong>-</strong>, left to right.
        Step through this expression to see it happen.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 16px", textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontFamily: "monospace", fontSize: 20, color: C.text }}>
          {s.highlight ? (
            // Split the expression string so we can colour-highlight just the
            // piece being evaluated in this step (simple string replace since
            // these are short, fixed demo expressions).
            s.expr.split(s.highlight).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span style={{ background: C.accent + "33", color: C.accent, borderRadius: 4, padding: "2px 6px" }}>{s.highlight}</span>
                )}
              </span>
            ))
          ) : (
            <span style={{ color: C.green, fontWeight: 700 }}>{s.expr}</span>
          )}
        </div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>
        💡 {s.note}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => setStep((v) => Math.max(0, v - 1))} disabled={step === 0} style={{
          padding: "8px 18px", borderRadius: 6, background: C.card, border: `1px solid ${C.border}`,
          color: C.text, cursor: step === 0 ? "not-allowed" : "pointer",
        }}>← Back</button>
        <span style={{ color: C.muted, fontSize: 12, alignSelf: "center" }}>Step {step + 1} / {steps.length}</span>
        <button onClick={() => setStep((v) => Math.min(steps.length - 1, v + 1))} disabled={step === steps.length - 1} style={{
          padding: "8px 18px", borderRadius: 6, background: C.accentGlow, border: "none",
          color: "#fff", cursor: step === steps.length - 1 ? "not-allowed" : "pointer",
        }}>Next →</button>
      </div>

      <div style={{ marginTop: 16, background: C.yellow + "18", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.yellow }}>Key idea:</strong> when in doubt, use parentheses{" "}
        <code style={{ color: C.yellow }}>()</code> to force the order you actually want — they always run first
        and make your intention crystal clear to anyone reading the code.
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 4 — CapstoneCalculator
// The Module 4 capstone: a Simple Interest calculator that genuinely
// exercises every idea from this module — variables (Unit 4.2), input +
// casting (Unit 4.3), and arithmetic operators (this unit) — in one small,
// real, runnable program. Sliders stand in for input(); the formula updates
// live exactly like the real program would if you re-ran it with new input.
// ============================================================================
function CapstoneCalculator() {
  // Principal amount, annual rate (%), and time (years) — the three inputs
  // a Simple Interest program would normally gather with input()+casting.
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(3);

  // Simple Interest formula: SI = (P * R * T) / 100
  const simpleInterest = (principal * rate * time) / 100;
  const totalAmount = principal + simpleInterest;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Let's build one real program using EVERYTHING from Module 4: variables to store values, input +
        casting to read them, and operators to compute the result. Adjust the sliders — they stand in for
        what a user would type at the input() prompts.
      </p>

      {[
        { label: "Principal (₹)", value: principal, set: setPrincipal, min: 1000, max: 100000, step: 500 },
        { label: "Annual Rate (%)", value: rate, set: setRate, min: 1, max: 20, step: 0.5 },
        { label: "Time (years)", value: time, set: setTime, min: 1, max: 10, step: 1 },
      ].map((f, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <label style={{ color: C.muted, fontSize: 12 }}>{f.label}: <strong style={{ color: C.accent }}>{f.value}</strong></label>
          <input type="range" min={f.min} max={f.max} step={f.step} value={f.value} onChange={(e) => f.set(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
        </div>
      ))}

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, lineHeight: 2, marginTop: 10 }}>
        <div><span style={{ color: C.muted }}>1</span> &nbsp; principal = float(input("Principal: ")) &nbsp;<span style={{ color: C.muted }}># {principal}</span></div>
        <div><span style={{ color: C.muted }}>2</span> &nbsp; rate = float(input("Rate: ")) &nbsp;<span style={{ color: C.muted }}># {rate}</span></div>
        <div><span style={{ color: C.muted }}>3</span> &nbsp; time = float(input("Time: ")) &nbsp;<span style={{ color: C.muted }}># {time}</span></div>
        <div><span style={{ color: C.muted }}>4</span> &nbsp; simple_interest = <span style={{ color: C.green }}>(principal * rate * time) / 100</span></div>
        <div><span style={{ color: C.muted }}>5</span> &nbsp; total_amount = principal + simple_interest</div>
        <div><span style={{ color: C.muted }}>6</span> &nbsp; print(simple_interest, total_amount)</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
        <div style={{ background: C.green + "18", border: `1.5px solid ${C.green}55`, borderRadius: 10, padding: 14, textAlign: "center" }}>
          <div style={{ color: C.muted, fontSize: 11 }}>Simple Interest</div>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 18, fontFamily: "monospace" }}>₹{simpleInterest.toFixed(2)}</div>
        </div>
        <div style={{ background: C.accent + "18", border: `1.5px solid ${C.accent}55`, borderRadius: 10, padding: 14, textAlign: "center" }}>
          <div style={{ color: C.muted, fontSize: 11 }}>Total Amount</div>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 18, fontFamily: "monospace" }}>₹{totalAmount.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>You just used every piece of Module 4:</strong> variables to hold
        principal/rate/time, float() casting because money and rates need decimals, and the arithmetic
        operators * / + to compute the result. This is exactly what a real, working Python program looks like.
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 5 — Quiz
// Standard closing quiz. Because Unit 4.4 is the LAST unit of Module 4, its
// completion screen (below) announces "Module 4 Complete!" and previews
// Module 5, matching how Unit2_4 and Unit3_3 close out Modules 2 and 3.
// ============================================================================
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What is the result of 17 // 5 in Python?",
      options: ["3.4", "3", "2", "17"],
      answer: 1,
      explain: "// is floor division: it divides then discards everything after the decimal point. 17 / 5 = 3.4, so 17 // 5 = 3.",
    },
    {
      q: "What is the result of 17 % 5 in Python?",
      options: ["3", "2", "0", "3.4"],
      answer: 1,
      explain: "% (modulus) gives the REMAINDER after floor division. 5 fits into 17 three times (15), leaving a remainder of 2.",
    },
    {
      q: "What does a comparison operator like > or == always produce?",
      options: ["A string", "A whole number", "A bool: True or False", "Nothing — it just prints"],
      answer: 2,
      explain: "Comparisons evaluate to a boolean value, True or False — the foundation for every decision-making structure you'll meet in Module 5.",
    },
    {
      q: "For p = True and q = False, what is p and q?",
      options: ["True", "False", "None", "Error"],
      answer: 1,
      explain: "and is only True when BOTH sides are True. Since q is False, p and q is False.",
    },
    {
      q: "In 2 + 3 * 4, which operation does Python perform first?",
      options: ["2 + 3", "3 * 4", "They happen at the same time", "Whichever is written first"],
      answer: 1,
      explain: "Multiplication has higher precedence than addition, so 3 * 4 is computed first, then added to 2 — giving 14, not 20.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[current].answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current < questions.length - 1) { setCurrent((c) => c + 1); setSelected(null); }
    else { setDone(true); onComplete && onComplete(); }
  };

  if (done) {
    const final = score + (selected === questions[current].answer ? 1 : 0);
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{final >= 4 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {final} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {final === 5 ? "Outstanding! You've mastered every operator Module 4 covers." :
            final >= 3 ? "Good work — revisit the precedence puzzle once more to lock it in." :
              "Go back through the arithmetic and comparison sections, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.purple}22, ${C.green}22)`,
          border: `1px solid ${C.green}`,
        }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Module 4 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now write real Python: print output, store data in variables (and know exactly where it
            lives in memory), take input from a user, convert types safely, and compute with every major
            operator.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Module 5 — Making Decisions (if / else).</strong>{" "}
            You'll use the comparison and logical operators from this unit to make your programs choose
            between different actions.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((opt, i) => {
          let bg = C.card, border = C.border, col = C.text;
          if (selected !== null) {
            if (i === q.answer) { bg = C.green + "22"; border = C.green; col = C.green; }
            else if (i === selected) { bg = C.red + "22"; border = C.red; col = C.red; }
          }
          return (
            <button key={i} onClick={() => choose(i)} style={{
              textAlign: "left", padding: "10px 14px", borderRadius: 8,
              background: bg, border: `1.5px solid ${border}`, color: col,
              cursor: selected !== null ? "default" : "pointer", fontSize: 13, transition: "all 0.25s",
            }}>
              {i === q.answer && selected !== null ? "✓ " : i === selected && selected !== q.answer ? "✗ " : ""}{opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: C.purple + "18", border: `1px solid ${C.purple}44`, color: C.muted, fontSize: 13 }}>
          💡 {q.explain}
        </div>
      )}
      {selected !== null && (
        <button onClick={next} style={{
          marginTop: 14, padding: "10px 24px", borderRadius: 8,
          background: C.accentGlow, border: "none", color: "#fff",
          fontWeight: 600, cursor: "pointer", fontSize: 14,
        }}>{current < questions.length - 1 ? "Next Question →" : "See Results"}</button>
      )}
    </div>
  );
}

// ============================================================================
// MAIN EXPORT — Unit4_4
// Shared shell: header, progress bar, section tabs, content card, "Mark
// Complete & Continue" navigation — identical structure to every other unit.
// ============================================================================
export default function Unit4_4({ student, onUnitComplete }) {
  // Tab order here MUST match the order of the `content` array below.
  const sections = [
    { id: "arith", label: "Arithmetic" },
    { id: "cmp", label: "Comparison & Logic" },
    { id: "precedence", label: "Order of Operations" },
    { id: "capstone", label: "Capstone: SI Calculator" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    // 0 — arithmetic operators, including // and % explained concretely
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Arithmetic Operators</h3>
      <ArithmeticOperators />
    </div>,

    // 1 — comparison + logical operators combined
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Comparison & Logical Operators</h3>
      <ComparisonAndLogic />
    </div>,

    // 2 — precedence / order-of-operations walkthrough
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Order of Operations</h3>
      <PrecedencePuzzle />
    </div>,

    // 3 — capstone project tying all of Module 4 together
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Capstone: Simple Interest Calculator</h3>
      <CapstoneCalculator />
    </div>,

    // 4 — Quiz. onComplete marks this section done AND calls
    // onUnitComplete, which is the single line that actually persists Unit
    // 4.4's completion — and since this is Module 4's last unit, the quiz's
    // own completion screen also announces the whole module finishing.
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        5 questions to check your understanding of Unit 4.4 — and Module 4 as a whole.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 4 › UNIT 4.4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Operators & Expressions</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{completed.length} / {sections.length} done</div>
      </div>

      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(completed.length / sections.length) * 100}%`, background: C.green, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => setActiveSection(i)} style={{
              flex: 1, minWidth: 80, padding: "8px 6px", borderRadius: 7,
              background: activeSection === i ? C.accentGlow : "transparent",
              border: "none", color: activeSection === i ? "#fff" : C.muted,
              cursor: "pointer", fontSize: 11, fontWeight: activeSection === i ? 600 : 400,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              transition: "all 0.2s",
            }}>
              {completed.includes(i) && <span style={{ color: C.green }}>✓</span>}
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
          {content[activeSection]}
        </div>

        {activeSection < sections.length - 1 && (
          <button onClick={goNext} style={{
            marginTop: 16, width: "100%", padding: "12px", borderRadius: 8,
            background: C.accentGlow, border: "none", color: "#fff",
            fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>Mark Complete & Continue →</button>
        )}
      </div>
    </div>
  );
}
