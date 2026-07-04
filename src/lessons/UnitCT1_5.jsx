import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── prime helpers (JS mirror of the Python we teach) ─────────────────────────
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i < n; i++) if (n % i === 0) return false;
  return true;
}
function primesUpTo(N) {
  const out = [];
  for (let n = 2; n <= N; n++) if (isPrime(n)) out.push(n);
  return out;
}

// ── Section 1: The Challenge — a fresh problem you've never written ──────────
function TheChallenge() {
  const [N, setN] = useState(10);
  const primes = primesUpTo(N);
  const sum = primes.reduce((a, b) => a + b, 0);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Here is a problem you have <strong style={{ color: C.text }}>never written before</strong>:
      </p>

      <div style={{ background: C.card, border: `1.5px solid ${C.accent}55`, borderRadius: 10, padding: "16px 18px", marginBottom: 18 }}>
        <div style={{ color: C.accent, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>📜 THE MISSION</div>
        <div style={{ color: C.text, fontSize: 14, lineHeight: 1.7 }}>
          Given a number <strong style={{ color: C.accent }}>N</strong>, find <strong>how many</strong> prime
          numbers there are up to N, and <strong>add them all up</strong>.
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>N = <strong style={{ color: C.accent }}>{N}</strong></label>
        <input type="range" min={2} max={40} value={N} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ color: C.muted, fontSize: 11, letterSpacing: 1, marginBottom: 8 }}>PRIMES UP TO {N}</div>
        <div style={{ fontFamily: "monospace", fontSize: 15, color: C.green, lineHeight: 1.6, marginBottom: 12, minHeight: 22 }}>
          {primes.join("  ") || "(none yet)"}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: C.card, border: `2px solid ${C.teal}`, borderRadius: 8, padding: 10, textAlign: "center" }}>
            <div style={{ color: C.teal, fontSize: 10, letterSpacing: 1 }}>HOW MANY (count)</div>
            <div style={{ color: C.text, fontSize: 24, fontWeight: 700, fontFamily: "monospace" }}>{primes.length}</div>
          </div>
          <div style={{ background: C.card, border: `2px solid ${C.purple}`, borderRadius: 8, padding: 10, textAlign: "center" }}>
            <div style={{ color: C.purple, fontSize: 10, letterSpacing: 1 }}>ADDED UP (total)</div>
            <div style={{ color: C.text, fontSize: 24, fontWeight: 700, fontFamily: "monospace" }}>{sum}</div>
          </div>
        </div>
      </div>

      <div style={{ background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>You already own every piece.</strong> Don't reach for code yet.
        First we'll walk the <strong style={{ color: C.text }}>four moves</strong> from Unit 1 — decompose,
        spot the pattern, abstract, design — and the program will almost write itself.
      </div>
    </div>
  );
}

// ── Section 2: Decompose & Recognise (Moves 1 & 2) ───────────────────────────
function Decompose() {
  const [open, setOpen] = useState([]);
  const toggle = (i) => setOpen((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const parts = [
    {
      task: "Walk through every number from 2 up to N",
      pattern: "A count-controlled loop",
      from: "Unit 1 · the four moves / for n in range(2, N+1)",
      color: C.teal,
    },
    {
      task: "For each number, decide: is it prime?",
      pattern: "The flag / verdict pattern — assume prime, hunt for a divisor, break",
      from: "Unit 3 · Deciding Inside a Loop",
      color: C.orange,
    },
    {
      task: "Keep a running count AND a running total of the primes found",
      pattern: "Two accumulators — init before the loop, update when a prime appears",
      from: "Unit 1 · the accumulator",
      color: C.purple,
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        <strong style={{ color: C.text }}>Move 1 — Decompose:</strong> break the big mission into small jobs.
        <strong style={{ color: C.text }}> Move 2 — Recognise the pattern:</strong> each small job is something
        you've already met. Click each job to reveal the pattern behind it.
      </p>

      {parts.map((p, i) => (
        <div key={i} onClick={() => toggle(i)} style={{
          background: C.card, border: `1.5px solid ${open.includes(i) ? p.color : C.border}`,
          borderRadius: 10, padding: 14, marginBottom: 10, cursor: "pointer", transition: "all 0.2s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: p.color + "22", color: p.color, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
            <div style={{ color: C.text, fontSize: 13.5, fontWeight: 600 }}>{p.task}</div>
            <div style={{ marginLeft: "auto", color: p.color, fontSize: 12 }}>{open.includes(i) ? "▾" : "▸"}</div>
          </div>
          {open.includes(i) && (
            <div style={{ marginTop: 10, paddingLeft: 34 }}>
              <div style={{ color: p.color, fontSize: 12.5, fontWeight: 600, marginBottom: 4 }}>Pattern: {p.pattern}</div>
              <div style={{ color: C.muted, fontSize: 12 }}>↳ from {p.from}</div>
            </div>
          )}
        </div>
      ))}

      <div style={{ marginTop: 14, background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>A hard problem is just easy problems you already solved, stacked.</strong>{" "}
        Notice job 2 (a whole prime check) sits <em>inside</em> job 1 (the walk) — that's a nested loop, Unit 4.
      </div>
    </div>
  );
}

// ── Section 3: Design the Algorithm (Moves 3 & 4) ────────────────────────────
const CODE_LINES = [
  { t: "count = 0", tag: "acc" },
  { t: "total = 0", tag: "acc" },
  { t: "for n in range(2, N + 1):", tag: "outer" },
  { t: "    is_prime = True", tag: "flag" },
  { t: "    for i in range(2, n):", tag: "flag" },
  { t: "        if n % i == 0:", tag: "flag" },
  { t: "            is_prime = False", tag: "flag" },
  { t: "            break", tag: "flag" },
  { t: "    if is_prime:", tag: "decide" },
  { t: "        count = count + 1", tag: "decide" },
  { t: "        total = total + n", tag: "decide" },
  { t: "print(count)", tag: "acc" },
  { t: "print(total)", tag: "acc" },
];

function DesignAlgo() {
  const [hi, setHi] = useState("outer");
  const groups = {
    acc: { label: "Accumulators", color: C.purple, note: "Two boxes created BEFORE the loop and printed AFTER it. count tallies, total sums. (Unit 1)" },
    outer: { label: "The walk", color: C.teal, note: "The outer loop visits every candidate number 2…N. Decomposition move 1. (Unit 1 & 4)" },
    flag: { label: "Prime check", color: C.orange, note: "Assume prime; the inner loop hunts for any divisor and flips the flag, then break. (Unit 3, nested — Unit 4)" },
    decide: { label: "The payoff", color: C.green, note: "Only when the verdict is prime do BOTH accumulators update. This is where the two ideas meet." },
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        <strong style={{ color: C.text }}>Move 3 — Abstract:</strong> ignore <em>which</em> numbers; keep the
        shape. <strong style={{ color: C.text }}>Move 4 — Design:</strong> arrange the pieces in order. Tap a
        piece to see how it maps back to what you learned.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {Object.entries(groups).map(([k, g]) => (
          <button key={k} onClick={() => setHi(k)} style={{
            flex: 1, minWidth: 90, padding: "8px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: hi === k ? g.color + "22" : C.card,
            border: `1.5px solid ${hi === k ? g.color : C.border}`, color: hi === k ? g.color : C.muted,
          }}>{g.label}</button>
        ))}
      </div>

      <pre style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, margin: 0, fontFamily: "monospace", fontSize: 12.5, lineHeight: 1.85, whiteSpace: "pre" }}>
        {CODE_LINES.map((ln, i) => (
          <div key={i} style={{
            background: ln.tag === hi ? groups[hi].color + "22" : "transparent",
            color: ln.tag === hi ? C.text : C.muted,
            borderLeft: `3px solid ${ln.tag === hi ? groups[hi].color : "transparent"}`,
            borderRadius: 4, paddingLeft: 8,
          }}>{ln.t || " "}</div>
        ))}
      </pre>

      <div style={{ marginTop: 12, background: groups[hi].color + "14", border: `1px solid ${groups[hi].color}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        <strong style={{ color: groups[hi].color }}>{groups[hi].label}:</strong> {groups[hi].note}
      </div>
    </div>
  );
}

// ── Section 4: See It Run — step through the whole algorithm ──────────────────
const RUN_STEPS = (() => {
  const N = 10;
  const steps = [];
  let count = 0, total = 0;
  for (let n = 2; n <= N; n++) {
    const prime = isPrime(n);
    if (prime) { count += 1; total += n; }
    const divisor = prime ? null : (() => { for (let i = 2; i < n; i++) if (n % i === 0) return i; })();
    steps.push({
      n, prime, count, total, divisor,
      desc: prime
        ? `n = ${n}: no divisor found → PRIME. count → ${count}, total → ${total}.`
        : `n = ${n}: ${n} % ${divisor} == 0 → NOT prime. Accumulators unchanged.`,
    });
  }
  steps.push({ n: "done", prime: null, count, total, divisor: null, desc: `Loop finished. print(count) → ${count}, print(total) → ${total}.` });
  return steps;
})();

function RunIt() {
  const [step, setStep] = useState(0);
  const s = RUN_STEPS[step];
  const done = s.n === "done";

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Run the finished algorithm on <strong style={{ color: C.text }}>N = 10</strong>. Watch the verdict flip
        each number, and watch both accumulators climb only on primes.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(RUN_STEPS.length - 1, x + 1))} disabled={step === RUN_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === RUN_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === RUN_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === RUN_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {RUN_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
        <div style={{ background: C.card, border: `2px solid ${C.accent}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
          <div style={{ color: C.accent, fontSize: 10, letterSpacing: 1 }}>n</div>
          <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{done ? "—" : s.n}</div>
        </div>
        <div style={{ background: C.card, border: `2px solid ${C.teal}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
          <div style={{ color: C.teal, fontSize: 10, letterSpacing: 1 }}>count</div>
          <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{s.count}</div>
        </div>
        <div style={{ background: C.card, border: `2px solid ${C.purple}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
          <div style={{ color: C.purple, fontSize: 10, letterSpacing: 1 }}>total</div>
          <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{s.total}</div>
        </div>
      </div>

      {!done && (
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{
            display: "inline-block", padding: "6px 18px", borderRadius: 20, fontWeight: 700, fontSize: 13,
            background: s.prime ? C.green + "22" : C.red + "22", color: s.prime ? C.green : C.red,
            border: `1.5px solid ${s.prime ? C.green : C.red}`,
          }}>{s.prime ? "✓ is_prime = True" : "✗ is_prime = False"}</span>
        </div>
      )}

      <div style={{ background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Four units, one program.</strong> Accumulator (U1) + loop over a
        range + flag verdict (U3) + nesting (U4). That is computational thinking: assemble the moves you know into
        something you've never written.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "In the prime-counter, WHY are count = 0 and total = 0 written before the loop, not inside it?",
      options: [
        "Style — it doesn't matter where they go",
        "So they're created once and survive across every round; inside the loop they'd reset to 0 each time",
        "Because primes start at 0",
        "To make the loop run faster",
      ],
      answer: 1,
      explain: "An accumulator must be initialised OUTSIDE the loop. Inside, it would be wiped back to 0 on every iteration and could never build up — the Unit 1 gotcha.",
    },
    {
      q: "The prime test sits inside the number walk. What structure is that?",
      options: ["A single loop", "A nested loop — a loop inside a loop", "A function call", "An if without a loop"],
      answer: 1,
      explain: "The outer loop picks each number; the inner loop checks its divisors. Loop-inside-a-loop = Unit 4's nested loops.",
    },
    {
      q: "Which of the 'four moves' is happening when you say 'the prime check is just Unit 3's flag pattern'?",
      options: ["Decomposition", "Pattern recognition", "Abstraction", "None — that's just coding"],
      answer: 1,
      explain: "Recognising that a new sub-problem is really an old, already-solved pattern is Move 2: pattern recognition (Wing, 2006).",
    },
    {
      q: "You now meet a brand-new task: 'sum every number from 1 to N that is a palindrome.' What's the smartest first step?",
      options: [
        "Start typing code immediately",
        "Decompose it: walk 1..N (loop), test each for palindrome (Unit 2's reverse), keep a running sum (accumulator)",
        "Give up — you were never taught this exact program",
        "Look for a built-in palindrome function",
      ],
      answer: 1,
      explain: "Same recipe as the prime-counter: decompose into a walk + a per-item test + an accumulator, then map each part to a pattern you already own. That's the whole point of CT Set 1.",
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
          {score === 4 ? "You can now attack an unseen problem the way a computer scientist does." :
            score >= 2 ? "Solid — replay Decompose to lock in 'old patterns, new problem'." :
              "Revisit The Challenge and Decompose, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Computational Thinking I — Content Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            The accumulator, the digit-peel, the flag verdict, nested loops — and now the four moves that turn a
            blank page into a working program.<br /><br />
            <strong style={{ color: C.orange }}>Next up (optional): 🔥 The Crucible.</strong> Predict, hunt bugs,
            assemble, and write real Python that drills every number/loop program from this set.
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
export default function UnitCT1_5({ student, onUnitComplete }) {
  const sections = [
    { id: "challenge", label: "The Challenge" },
    { id: "decompose", label: "Decompose" },
    { id: "design", label: "Design It" },
    { id: "run", label: "See It Run" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>A Fresh Problem, Only Old Tools</h3><TheChallenge /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Break It Down &amp; Spot the Patterns</h3><Decompose /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Design the Algorithm</h3><DesignAlgo /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>See the Whole Thing Run</h3><RunIt /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on thinking your way from problem to code.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING I › UNIT 5</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Capstone: Crack It Yourself</div>
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
