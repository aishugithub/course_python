import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: Looping Over Digits (the need) ────────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        In Unit 1 you looped over numbers you already knew — <code style={{ color: C.accent }}>range(1, n+1)</code>.
        But what about a task like <strong style={{ color: C.text }}>"add up the digits of 4729"</strong>? You
        can't <code style={{ color: C.accent }}>range()</code> over the digits — you don't even know how many
        there are until you look. This is where a <code style={{ color: C.teal }}>while</code> loop shines
        (remember Unit 6.1: use <code style={{ color: C.teal }}>while</code> when the count is unknown).
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ range() CAN'T HELP</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`n = 4729\nfor d in range(n):\n    ...  # loops 4729 TIMES,\n         # not over 4 digits!`}</pre>
          <div style={{ color: C.red, fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>
            A number isn't a list of its digits. range(4729) just counts 0…4728 — useless here.
          </div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ PEEL DIGITS WITH while</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`n = 4729\nwhile n > 0:\n    digit = n % 10\n    n = n // 10`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>
            Two operators you already met in Unit 4.4 — <code style={{ color: C.green }}>%</code> and{" "}
            <code style={{ color: C.green }}>//</code> — pull the digits off one at a time.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>New pattern incoming: the digit peel.</strong> It unlocks a whole
        row of classic programs — digit sum, digit count, reversing a number, even checking palindromes — all from
        the same two-line trick. Let's see how <code style={{ color: C.purple }}>%</code> and{" "}
        <code style={{ color: C.purple }}>//</code> do it.
      </div>
    </div>
  );
}

// ── Section 2: The Digit Peel (mechanics) ────────────────────────────────────
function DigitPeel() {
  const START = 4729;
  const [n, setN] = useState(START);
  const [pulled, setPulled] = useState([]);

  const peel = () => {
    if (n <= 0) return;
    const digit = n % 10;
    setPulled((p) => [...p, digit]);
    setN(Math.floor(n / 10));
  };
  const reset = () => { setN(START); setPulled([]); };

  const lastDigit = n > 0 ? n % 10 : null;
  const rest = n > 0 ? Math.floor(n / 10) : null;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Two operations, working together. <code style={{ color: C.teal }}>n % 10</code> gives the{" "}
        <strong style={{ color: C.teal }}>last digit</strong> (the remainder after dividing by 10).{" "}
        <code style={{ color: C.accent }}>n // 10</code> throws that last digit away (integer division by 10).
        Press <strong>Peel</strong> and watch 4729 lose a digit each time.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button onClick={peel} disabled={n <= 0} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: n <= 0 ? C.card : C.accentGlow,
          border: "none", color: n <= 0 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: n <= 0 ? "default" : "pointer",
        }}>✂️ Peel a digit</button>
        <button onClick={reset} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 10 }}>REMAINING NUMBER · n</div>
        <div style={{ fontFamily: "monospace", fontSize: 34, fontWeight: 700, color: n > 0 ? C.text : C.green, textAlign: "center" }}>
          {n > 0 ? n : "0 — nothing left, loop stops"}
        </div>
        {n > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
            <div style={{ background: C.bg, border: `1.5px solid ${C.teal}`, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: C.teal }}>n % 10</div>
              <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, color: C.teal }}>{lastDigit}</div>
              <div style={{ fontSize: 10, color: C.muted }}>last digit</div>
            </div>
            <div style={{ background: C.bg, border: `1.5px solid ${C.accent}`, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: C.accent }}>n // 10</div>
              <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, color: C.accent }}>{rest}</div>
              <div style={{ fontSize: 10, color: C.muted }}>the rest</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 10 }}>DIGITS PULLED OFF (last-first)</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", minHeight: 40 }}>
          {pulled.length === 0 && <span style={{ color: C.muted, fontSize: 13 }}>none yet — press Peel</span>}
          {pulled.map((d, i) => (
            <div key={i} style={{
              width: 40, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
              background: C.teal + "22", border: `1.5px solid ${C.teal}`, color: C.teal,
              fontFamily: "monospace", fontSize: 18, fontWeight: 700,
            }}>{d}</div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>% gives the last digit, // removes it.</strong> Repeat until n hits 0
        and you've visited every digit — no matter how long the number is. Notice they come out{" "}
        <em>backwards</em> (9, 2, 7, 4) — that's the secret behind reversing a number, coming up in Build It.
      </div>
    </div>
  );
}

// ── Section 3: Trace It — Sum of Digits ──────────────────────────────────────
const TRACE_CODE = ["n = 4729", "total = 0", "while n > 0:", "    total = total + n % 10", "    n = n // 10", "print(total)"];

const TRACE_STEPS = (() => {
  const steps = [];
  let n = 4729, total = 0;
  steps.push({ line: 0, n, total, digit: null, desc: "Start with the number to process: n = 4729." });
  steps.push({ line: 1, n, total, digit: null, desc: "Initialise the accumulator: total = 0." });
  while (n > 0) {
    steps.push({ line: 2, n, total, digit: null, desc: `while check: is ${n} > 0? Yes → run the body.` });
    const digit = n % 10;
    total = total + digit;
    steps.push({ line: 3, n, total, digit, desc: `Peel the last digit (${digit}) and add it: total is now ${total}.` });
    n = Math.floor(n / 10);
    steps.push({ line: 4, n, total, digit, desc: `Drop that digit with // 10: n shrinks to ${n}.` });
  }
  steps.push({ line: 2, n, total, digit: null, desc: "while check: is 0 > 0? No → the loop ends." });
  steps.push({ line: 5, n, total, digit: null, desc: `Print the accumulated digit sum: ${total}.` });
  return steps;
})();

function SumTrace() {
  const [step, setStep] = useState(0);
  const s = TRACE_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Now combine the peel with the accumulator from Unit 1. Step through and watch two boxes move together:{" "}
        <span style={{ color: C.accent }}>n</span> shrinks digit by digit while the{" "}
        <span style={{ color: C.teal }}>ACCUMULATOR</span> grows.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(TRACE_STEPS.length - 1, x + 1))} disabled={step === TRACE_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === TRACE_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === TRACE_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === TRACE_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {TRACE_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 12 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 12.5 }}>
          {TRACE_CODE.map((line, i) => (
            <div key={i} style={{
              padding: "5px 8px", borderRadius: 6, whiteSpace: "pre",
              background: s.line === i ? C.accent + "26" : "transparent",
              border: `1.5px solid ${s.line === i ? C.accent : "transparent"}`,
              color: s.line === i ? C.accent : C.muted, transition: "all 0.25s",
            }}>{s.line === i ? "▶ " : "  "}{line}</div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `2px solid ${C.teal}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.teal, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>ACCUMULATOR · total</div>
            <div style={{ color: C.text, fontSize: 26, fontWeight: 700, fontFamily: "monospace" }}>{s.total}</div>
          </div>
          <div style={{ background: C.card, border: `1.5px solid ${C.accent}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.accent, fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>n (shrinking)</div>
            <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{s.n}</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>DIGIT PEELED (n % 10)</div>
            <div style={{ color: C.yellow, fontSize: 18, fontWeight: 700, fontFamily: "monospace" }}>{s.digit === null ? "—" : s.digit}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>Peel + accumulate.</strong> Same accumulator shape as Unit 1 (init 0,
        update each round, use after) — only now the loop is a <code style={{ color: C.teal }}>while</code> driven
        by the number shrinking to 0, not a fixed <code style={{ color: C.teal }}>range</code>.
      </div>
    </div>
  );
}

// ── Section 4: Build It — Reverse a Number & Power ───────────────────────────
function BuildIt() {
  const [mode, setMode] = useState("reverse");
  const [num, setNum] = useState(4729);
  const [base, setBase] = useState(2);
  const [exp, setExp] = useState(5);

  const reverseOf = (x) => Number(String(x).split("").reverse().join(""));
  const powOf = (b, e) => { let r = 1; for (let i = 0; i < e; i++) r *= b; return r; };

  const reverseCode = `n = ${num}\nrev = 0\nwhile n > 0:\n    digit = n % 10\n    rev = rev * 10 + digit\n    n = n // 10\nprint(rev)`;
  const powCode = `base = ${base}\nexp = ${exp}\nresult = 1\nfor i in range(exp):\n    result = result * base\nprint(result)`;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Two showcase programs, both accumulators — but notice the loop choice.{" "}
        <strong style={{ color: C.teal }}>Reverse</strong> uses <code style={{ color: C.teal }}>while</code> (digit
        count unknown); <strong style={{ color: C.purple }}>power</strong> uses{" "}
        <code style={{ color: C.purple }}>for</code> (we know exactly how many multiplications). The Unit 6 rule of
        thumb in action.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setMode("reverse")} style={{
          flex: 1, padding: "9px 8px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
          background: mode === "reverse" ? C.teal + "22" : C.card,
          border: `1.5px solid ${mode === "reverse" ? C.teal : C.border}`,
          color: mode === "reverse" ? C.teal : C.muted,
        }}>🔁 Reverse a Number</button>
        <button onClick={() => setMode("power")} style={{
          flex: 1, padding: "9px 8px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
          background: mode === "power" ? C.purple + "22" : C.card,
          border: `1.5px solid ${mode === "power" ? C.purple : C.border}`,
          color: mode === "power" ? C.purple : C.muted,
        }}>⚡ Power (no **)</button>
      </div>

      {mode === "reverse" ? (
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: C.muted, fontSize: 12 }}>number = <strong style={{ color: C.teal }}>{num}</strong></label>
          <input type="range" min={1} max={99999} value={num} onChange={(e) => setNum(Number(e.target.value))} style={{ width: "100%", accentColor: C.teal }} />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ color: C.muted, fontSize: 12 }}>base = <strong style={{ color: C.purple }}>{base}</strong></label>
            <input type="range" min={1} max={9} value={base} onChange={(e) => setBase(Number(e.target.value))} style={{ width: "100%", accentColor: C.purple }} />
          </div>
          <div>
            <label style={{ color: C.muted, fontSize: 12 }}>exp = <strong style={{ color: C.purple }}>{exp}</strong></label>
            <input type="range" min={0} max={10} value={exp} onChange={(e) => setExp(Number(e.target.value))} style={{ width: "100%", accentColor: C.purple }} />
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 14 }}>
        <pre style={{ background: C.card, border: `1px solid ${(mode === "reverse" ? C.teal : C.purple)}55`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.8, margin: 0, whiteSpace: "pre" }}>{mode === "reverse" ? reverseCode : powCode}</pre>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 700, color: mode === "reverse" ? C.teal : C.purple, wordBreak: "break-all" }}>
              {mode === "reverse" ? reverseOf(num) : powOf(base, exp)}
            </div>
          </div>
          <div style={{ background: (mode === "reverse" ? C.teal : C.purple) + "14", border: `1px solid ${(mode === "reverse" ? C.teal : C.purple)}44`, borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>
            {mode === "reverse"
              ? "rev = rev * 10 + digit builds the answer backwards: each new digit pushes the old ones one place left, then slots in."
              : "Same accumulator, multiplying: start at 1, multiply by base exactly exp times. base ** exp done by hand."}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Reversing builds a number, not just a sum.</strong> The trick{" "}
        <code style={{ color: C.green }}>rev * 10 + digit</code> is an accumulator too — it just accumulates place
        value instead of a running total. Same four moves, brand-new program.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "For n = 4729, what is n % 10 and n // 10?",
      options: [
        "n % 10 = 472, n // 10 = 9",
        "n % 10 = 9, n // 10 = 472",
        "n % 10 = 9, n // 10 = 4729",
        "n % 10 = 4, n // 10 = 729",
      ],
      answer: 1,
      explain: "% 10 gives the LAST digit (9); // 10 chops that last digit off (472). Together they peel a number one digit at a time.",
    },
    {
      q: "Why use a while loop (not for) to process a number's digits?",
      options: [
        "for loops can't do division",
        "You don't know how many digits there are in advance — while repeats until n hits 0",
        "while is always faster",
        "for loops can't use % or //",
      ],
      answer: 1,
      explain: "The digit count is unknown, so you loop 'until n becomes 0' — the classic while shape from Unit 6.1. A for/range needs a count you already have.",
    },
    {
      q: "In the reverse program, what does rev = rev * 10 + digit do?",
      options: [
        "Adds all the digits together",
        "Shifts the current result one place left, then drops the new digit into the ones place",
        "Divides rev by 10",
        "Counts the digits",
      ],
      answer: 1,
      explain: "Multiplying by 10 pushes existing digits up a place (12 → 120), and + digit fills the freed ones place. Peel digits back-to-front and this rebuilds the number reversed.",
    },
    {
      q: "To compute base ** exp WITHOUT **, what should the accumulator start at?",
      options: ["0", "1", "base", "exp"],
      answer: 1,
      explain: "A multiplying accumulator starts at 1 (start at 0 and everything becomes 0). Then multiply by base exactly exp times — same lesson as factorial in Unit 1.",
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
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{score >= 3 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {score} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {score === 4 ? "The digit peel is yours — you can now crack a whole row of lab programs." :
            score >= 2 ? "Solid — replay the Digit Peel and the reverse trick to lock it in." :
              "Revisit The Digit Peel and Trace It, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can peel digits with % and //, and build results — sums, reversals, powers — inside a loop.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 3 — Deciding Inside a Loop.</strong>{" "}
            Prime checks, palindromes, Armstrong &amp; perfect numbers — the "flag" pattern, where the loop hunts for an answer.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16, whiteSpace: "pre-wrap" }}>{q.q}</div>
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

// ── Main ─────────────────────────────────────────────────────────────────────
export default function UnitCT1_2({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Looping Digits" },
    { id: "peel", label: "The Digit Peel" },
    { id: "trace", label: "Trace It" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Looping Over a Number's Digits</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Digit Peel — % and //</h3><DigitPeel /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Trace It: Sum of Digits</h3><SumTrace /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build It: Reverse a Number &amp; Power</h3><BuildIt /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on the digit peel and building results in a loop.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING I › UNIT 2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Counting &amp; Building with Loops</div>
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
