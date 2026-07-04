import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: The Need — remembering a verdict ──────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        So far our loops <em>built</em> things — a sum, a reversed number. Now a different job:{" "}
        <strong style={{ color: C.text }}>answering a yes/no question about a whole number</strong>, like "is 15
        prime?" You can't decide from one round — you have to check every possible divisor and{" "}
        <em>remember the verdict</em> across the loop. That memory is a <code style={{ color: C.teal }}>True</code>/
        <code style={{ color: C.teal }}>False</code> <strong style={{ color: C.teal }}>flag</strong>.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ DECIDING TOO EARLY</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`for i in range(2, 15):\n    if 15 % i == 0:\n        print("not prime")\n    else:\n        print("prime")`}</pre>
          <div style={{ color: C.red, fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>
            Prints a verdict EVERY round — "prime, prime, not prime…". One number, many contradicting answers.
          </div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ ONE FLAG, ONE VERDICT</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`is_prime = True\nfor i in range(2, 15):\n    if 15 % i == 0:\n        is_prime = False\nprint(is_prime)`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>
            Assume the best, let the loop find counter-evidence, decide ONCE at the end.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>The flag pattern:</strong> start with an assumption (usually{" "}
        <code style={{ color: C.purple }}>True</code>), let the loop hunt for proof it's wrong, and read the verdict
        after the loop. It's how you check primes, palindromes, Armstrong numbers — a huge family of "is this
        number special?" programs.
      </div>
    </div>
  );
}

// ── Section 2: Anatomy of the Flag (+ early exit) ────────────────────────────
function FlagAnatomy() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The flag has the same three-part rhythm as the accumulator — just holding a verdict instead of a total.
        And once you've found proof, there's no point checking further: <code style={{ color: C.orange }}>break</code>{" "}
        (from Unit 6.3) jumps straight out.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, fontFamily: "monospace", fontSize: 12.5, lineHeight: 2, whiteSpace: "pre" }}>
        <span style={{ color: C.teal }}>is_prime = True</span>{"        "}<span style={{ color: C.muted }}># ① assume True before the loop</span>{"\n"}
        for i in range(2, n):{"\n"}
        {"    "}if n % i == 0:{"\n"}
        {"        "}<span style={{ color: C.red }}>is_prime = False</span>{"   "}<span style={{ color: C.muted }}># ② flip it on counter-evidence</span>{"\n"}
        {"        "}<span style={{ color: C.orange }}>break</span>{"              "}<span style={{ color: C.muted }}># stop — one divisor is enough</span>{"\n"}
        <span style={{ color: C.accent }}>print(is_prime)</span>{"        "}<span style={{ color: C.muted }}># ③ read the verdict after</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Prime (e.g. 7)</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>No <code style={{ color: C.green }}>i</code> divides it. The flag is never flipped → stays <code style={{ color: C.green }}>True</code>.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Not prime (e.g. 15)</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>3 divides it → flag flips to <code style={{ color: C.red }}>False</code>, <code style={{ color: C.orange }}>break</code> exits. Verdict sealed.</div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.orange + "15", border: `1px solid ${C.orange}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.orange }}>break is an optimisation, not a requirement.</strong> Without it you'd
        get the right answer, just slower (you'd keep checking after the verdict is already decided). With it, you
        stop the instant you're sure.
      </div>
    </div>
  );
}

// ── Section 3: Trace It — is 15 prime? ───────────────────────────────────────
const TRACE_CODE = ["n = 15", "is_prime = True", "for i in range(2, n):", "    if n % i == 0:", "        is_prime = False", "        break", "print(is_prime)"];

const TRACE_STEPS = (() => {
  const N = 15;
  const steps = [];
  let flag = true;
  steps.push({ line: 0, i: null, rem: null, flag, desc: "The number under test: n = 15." });
  steps.push({ line: 1, i: null, rem: null, flag, desc: "Assume it's prime until proven otherwise: is_prime = True." });
  for (let i = 2; i < N; i++) {
    steps.push({ line: 2, i, rem: null, flag, desc: `Try divisor i = ${i}.` });
    const rem = N % i;
    steps.push({ line: 3, i, rem, flag, desc: `Does ${i} divide 15? 15 % ${i} = ${rem}. ${rem === 0 ? "Yes — counter-evidence!" : "No, keep looking."}` });
    if (rem === 0) {
      flag = false;
      steps.push({ line: 4, i, rem, flag, desc: "Flip the flag: is_prime = False." });
      steps.push({ line: 5, i, rem, flag, desc: "break — one divisor is proof enough, leave the loop now." });
      break;
    }
  }
  steps.push({ line: 6, i: null, rem: null, flag, desc: `Read the verdict: is_prime = ${flag ? "True" : "False"}. 15 = 3 × 5, so: not prime.` });
  return steps;
})();

function PrimeTrace() {
  const [step, setStep] = useState(0);
  const s = TRACE_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Step through "is 15 prime?" Watch the <span style={{ color: C.teal }}>FLAG</span> panel — it starts True and
        flips the moment a divisor is found.
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

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 12 }}>
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
          <div style={{ background: C.card, border: `2px solid ${s.flag ? C.green : C.red}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: s.flag ? C.green : C.red, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>FLAG · is_prime</div>
            <div style={{ color: s.flag ? C.green : C.red, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{s.flag ? "True" : "False"}</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>divisor i</div>
            <div style={{ color: C.accent, fontSize: 18, fontWeight: 700, fontFamily: "monospace" }}>{s.i === null ? "—" : s.i}</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>15 % i</div>
            <div style={{ color: s.rem === 0 ? C.red : C.yellow, fontSize: 18, fontWeight: 700, fontFamily: "monospace" }}>{s.rem === null ? "—" : s.rem}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>Assume → hunt → decide once.</strong> A prime number would run the whole
        loop without ever flipping the flag. That "survived the whole loop untouched" is exactly what makes it prime.
      </div>
    </div>
  );
}

// ── Section 4: Build It — the Verdict Toolkit ────────────────────────────────
function VerdictToolkit() {
  const [n, setN] = useState(153);
  const [mode, setMode] = useState("prime");

  const isPrime = (x) => { if (x < 2) return false; for (let i = 2; i < x; i++) if (x % i === 0) return false; return true; };
  const isPalindrome = (x) => String(x) === String(x).split("").reverse().join("");
  const isArmstrong = (x) => {
    const digits = String(x).split("").map(Number);
    const p = digits.length;
    const sum = digits.reduce((a, d) => a + Math.pow(d, p), 0);
    return sum === x;
  };

  const modes = {
    prime: {
      label: "Prime?", color: C.green, verdict: isPrime(n),
      code: `n = ${n}\nis_prime = True\nfor i in range(2, n):\n    if n % i == 0:\n        is_prime = False\n        break\nprint(is_prime)`,
      note: "Flag pattern: no divisor found → still True → prime.",
    },
    palindrome: {
      label: "Palindrome?", color: C.teal, verdict: isPalindrome(n),
      code: `n = ${n}\nrev = 0\ntemp = n\nwhile temp > 0:\n    rev = rev * 10 + temp % 10\n    temp = temp // 10\nprint(rev == n)`,
      note: "Reuses Unit 2's reverse. Reads the same backwards? Compare rev to the original.",
    },
    armstrong: {
      label: "Armstrong?", color: C.purple, verdict: isArmstrong(n),
      code: `n = ${n}\np = 0\ntemp = n\nwhile temp > 0:      # count the digits\n    p = p + 1\n    temp = temp // 10\ntemp = n\ntotal = 0\nwhile temp > 0:      # sum each digit ** p\n    d = temp % 10\n    total = total + d ** p\n    temp = temp // 10\nprint(total == n)`,
      note: "All digit-peel: first count the digits (p), then sum each digit ** p. 153 = 1³+5³+3³.",
    },
  };
  const m = modes[mode];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Three "is this number special?" classics. Prime uses a flag; palindrome and Armstrong build a value then
        <em> compare</em> it back to the original (a one-shot verdict). Move the slider and switch modes.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {Object.entries(modes).map(([k, mv]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
            background: mode === k ? mv.color + "22" : C.card,
            border: `1.5px solid ${mode === k ? mv.color : C.border}`, color: mode === k ? mv.color : C.muted,
          }}>{mv.label}</button>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>n = <strong style={{ color: m.color }}>{n}</strong></label>
        <input type="range" min={1} max={999} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: m.color }} />
        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Try 153, 370, 371, 407 (Armstrong) · 121, 232 (palindrome) · 97 (prime)</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14 }}>
        <pre style={{ background: C.card, border: `1px solid ${m.color}55`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 11.5, color: C.text, lineHeight: 1.75, margin: 0, whiteSpace: "pre" }}>{m.code}</pre>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.bg, border: `2px solid ${m.verdict ? m.color : C.border}`, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, color: m.verdict ? m.color : C.muted }}>{m.verdict ? "True" : "False"}</div>
            <div style={{ fontSize: 11, color: m.verdict ? m.color : C.muted, marginTop: 4 }}>{n} {m.verdict ? "IS" : "is NOT"} {mode === "prime" ? "prime" : mode}</div>
          </div>
          <div style={{ background: m.color + "14", border: `1px solid ${m.color}44`, borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>
            {m.note}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Two verdict shapes.</strong> Either watch for counter-evidence with a{" "}
        <em>flag</em> (prime), or <em>build a value and compare</em> it to the original (palindrome, Armstrong).
        Perfect numbers and "strong" numbers are just more of the same — you already have the tools.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "In the prime-check flag pattern, what value does is_prime START at?",
      options: ["False — assume not prime", "True — assume prime until a divisor proves otherwise", "0", "The number itself"],
      answer: 1,
      explain: "You assume the best (True) and let the loop hunt for counter-evidence. If a divisor is found, you flip to False. No divisor found → it stays True → prime.",
    },
    {
      q: "Why add break after flipping is_prime = False?",
      options: [
        "It's required or the code crashes",
        "Once one divisor is found the verdict is settled — break just stops wasting time checking more",
        "break resets the flag",
        "To make the number prime",
      ],
      answer: 1,
      explain: "break is an optimisation. The answer is already 'not prime' the instant one divisor appears; checking further can't change it, so you leave the loop early.",
    },
    {
      q: "How do you check if a number is a palindrome (like 121)?",
      options: [
        "Count its digits",
        "Reverse it (Unit 2's trick) and compare the reverse to the original",
        "Check if it's even",
        "Add its digits",
      ],
      answer: 1,
      explain: "Build the reversed number with rev = rev*10 + digit, then test rev == n. If they're equal, it reads the same both ways — a palindrome.",
    },
    {
      q: "153 is an Armstrong number because…",
      options: [
        "It's prime",
        "1³ + 5³ + 3³ = 153 — each digit raised to the digit-count, summed, equals the number",
        "It reads the same backwards",
        "It has no divisors",
      ],
      answer: 1,
      explain: "Armstrong = sum of each digit raised to the number of digits. 153 has 3 digits: 1³+5³+3³ = 1+125+27 = 153. Built from the digit peel plus power — tools you already have.",
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
          {score === 4 ? "You can now answer 'is this number special?' for a whole family of problems." :
            score >= 2 ? "Good — replay the prime Trace to lock in assume → hunt → decide." :
              "Revisit The Need and the prime Trace, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You own the flag pattern: assume, hunt for counter-evidence, decide once.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 4 — Patterns &amp; Nested Loops.</strong>{" "}
            Star and number triangles, Floyd's &amp; Pascal's — a loop inside a loop, drawing shapes row by row.
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
export default function UnitCT1_3({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "anatomy", label: "The Flag" },
    { id: "trace", label: "Trace It" },
    { id: "build", label: "Verdict Toolkit" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Answering a Yes/No Question</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Flag — Assume, Hunt, Decide</h3><FlagAnatomy /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Trace It: Is 15 Prime?</h3><PrimeTrace /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build It: The Verdict Toolkit</h3><VerdictToolkit /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on the flag pattern and number verdicts.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING I › UNIT 3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Deciding Inside a Loop</div>
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
