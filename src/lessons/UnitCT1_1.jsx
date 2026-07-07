import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: Syntax Isn't a Solution ───────────────────────────────────────
function TheGap() {
  const [n, setN] = useState(5);
  const nums = Array.from({ length: n }, (_, i) => i + 1);
  const sum = (n * (n + 1)) / 2;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        For six modules you've collected Python's words: <code style={{ color: C.accent }}>if</code>,{" "}
        <code style={{ color: C.accent }}>for</code>, <code style={{ color: C.accent }}>while</code>,{" "}
        <code style={{ color: C.accent }}>+</code>. But knowing the words isn't the same as solving a problem —
        just like knowing English words isn't the same as writing an essay. Here's the gap. Task:{" "}
        <strong style={{ color: C.text }}>add up 1 + 2 + 3 + … + {n}</strong>.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>n = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={3} max={10} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ SYNTAX ALONE</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8 }}>{`for i in range(1, ${n + 1}):\n    print(i)`}</pre>
          <div style={{ marginTop: 10, fontFamily: "monospace", fontSize: 11, color: C.muted }}>
            output: {nums.join(" ")}
          </div>
          <div style={{ color: C.red, fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>
            A perfectly valid loop… that just <em>lists</em> the numbers. Where does the ANSWER get built up?
            Nothing is adding them together.
          </div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ WITH A PLAN</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8 }}>{`total = 0\nfor i in range(1, ${n + 1}):\n    total = total + i\nprint(total)`}</pre>
          <div style={{ marginTop: 10, fontFamily: "monospace", fontSize: 11, color: C.green }}>
            output: {sum}
          </div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>
            One extra idea — a box called <code style={{ color: C.green }}>total</code> that carries the running
            sum from one round to the next — turns a loop that lists into a loop that solves.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>This module is a pause on new syntax.</strong> Instead we learn{" "}
        <strong style={{ color: C.text }}>computational thinking</strong> — how to break a problem down and see the
        plan BEFORE you type. That difference between the two boxes above is exactly what we'll train.
      </div>
    </div>
  );
}

// ── Section 2: The Four Moves ────────────────────────────────────────────────
const MOVES = [
  {
    key: "Decompose",
    icon: "🧩",
    color: C.accent,
    title: "Decomposition — break it into smaller pieces",
    body: "\"Add 1 to n\" is really: (a) somewhere to keep the answer, (b) visit each number, (c) add it in, (d) show the result. A big scary task becomes four tiny ones you can each do.",
  },
  {
    key: "Pattern",
    icon: "🔁",
    color: C.teal,
    title: "Pattern recognition — spot what repeats",
    body: "\"Add THIS number, then the next, then the next…\" The same action over and over is a flashing sign that says: this is a loop.",
  },
  {
    key: "Abstract",
    icon: "🎯",
    color: C.purple,
    title: "Abstraction — keep only what matters",
    body: "Whether it's marks, ages, or rupees, the numbers themselves don't matter. Strip the story away and the essential rule is the same: start at 0, add each value, report the total.",
  },
  {
    key: "Algorithm",
    icon: "📝",
    color: C.green,
    title: "Algorithm design — write the ordered steps first",
    body: "In plain words, before any Python: 1) total = 0  2) for each number i from 1 to n  3) total = total + i  4) print total. Now translating to code is the easy part.",
  },
];

function FourMoves() {
  const [open, setOpen] = useState(0);
  const m = MOVES[open];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Computer scientists have a name for the mental toolkit behind that "plan" — Jeannette Wing called it{" "}
        <strong style={{ color: C.text }}>computational thinking</strong> (2006). It has four moves. Click each
        one to see it applied to our <em>sum 1…n</em> problem.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {MOVES.map((mv, i) => (
          <button key={mv.key} onClick={() => setOpen(i)} style={{
            textAlign: "left", padding: "12px 14px", borderRadius: 10, cursor: "pointer",
            background: open === i ? mv.color + "22" : C.card,
            border: `1.5px solid ${open === i ? mv.color : C.border}`,
            color: open === i ? mv.color : C.text, transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 18, marginRight: 8 }}>{mv.icon}</span>
            <strong style={{ fontSize: 13 }}>{mv.key}</strong>
          </button>
        ))}
      </div>

      <div style={{ background: C.card, border: `1.5px solid ${m.color}`, borderRadius: 10, padding: 16 }}>
        <div style={{ color: m.color, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{m.icon} {m.title}</div>
        <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7 }}>{m.body}</div>
      </div>

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.accent }}>Decompose → spot the pattern → abstract → write the steps.</strong>{" "}
        Do these four in your head (or on paper) BEFORE touching the keyboard, and the code almost writes itself.
        We'll run this loop on every program in this module.
      </div>
    </div>
  );
}

// ── Section 3: The Accumulator + Trace ───────────────────────────────────────
const TRACE_CODE = ["total = 0", "for i in range(1, 6):", "    total = total + i", "print(total)"];

const N = 5; // our target: we add the numbers 1 up to n = 5. n is fixed — it never changes while the loop runs.
const TRACE_STEPS = (() => {
  const steps = [{ line: 0, i: null, total: 0, out: [], desc: "Create the accumulator. total starts at 0 — the running sum before we've added anything. Our target is n = 5, and n stays 5 the whole time." }];
  let total = 0;
  for (let v = 1; v <= N; v++) {
    steps.push({ line: 1, i: v, total, out: [], desc: `Loop check: is the counter i (= ${v}) still within 1…n? Yes → step into the body with i = ${v}.` });
    total = total + v;
    steps.push({ line: 2, i: v, total, out: [], desc: `Add i to the box: total = ${total - v} + ${v} = ${total}. The answer grows one step at a time.` });
  }
  steps.push({ line: 1, i: N + 1, total, out: [], desc: `Loop check: the counter tries to step up to i = ${N + 1}. But ${N + 1} is past n (= ${N}) — range(1, 6) counts up to 6 but stops before it, so there is no round for ${N + 1}. Because i has moved beyond n, THIS is the exact moment the loop ends — the loop stops because the counter ran past the target, not by magic.` });
  steps.push({ line: 3, i: N + 1, total, out: [total], desc: `The loop is finished. Now print the completed accumulator: ${total}.` });
  return steps;
})();

function Accumulator() {
  const [step, setStep] = useState(0);
  const s = TRACE_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The idea powering that plan has a name: the <strong style={{ color: C.teal }}>accumulator</strong> — a
        variable that starts at a base value and gets <em>updated every round</em> so it carries a result across
        the whole loop. It always has the same three-part shape:
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 16, fontFamily: "monospace", fontSize: 12.5, lineHeight: 2, whiteSpace: "pre" }}>
        <span style={{ color: C.teal }}>total = 0</span>{"          "}<span style={{ color: C.muted }}># ① initialise — the box before the loop</span>{"\n"}
        for i in range(1, 6):{"\n"}
        {"    "}<span style={{ color: C.green }}>total = total + i</span>{"  "}<span style={{ color: C.muted }}># ② update — grow it each round</span>{"\n"}
        <span style={{ color: C.accent }}>print(total)</span>{"       "}<span style={{ color: C.muted }}># ③ use — read it after the loop</span>
      </div>

      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Step through it and keep your eye on the <span style={{ color: C.teal }}>ACCUMULATOR</span> panel — that
        single box is the whole trick.
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
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 13 }}>
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
          <div style={{ background: C.card, border: `1px solid ${s.i === N + 1 ? C.red : C.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>i · THE COUNTER</div>
            <div style={{ color: s.i === N + 1 ? C.red : C.accent, fontSize: 18, fontWeight: 700, fontFamily: "monospace" }}>{s.i === null ? "—" : s.i}{s.i === N + 1 ? " ✕ past n" : ""}</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.purple}55`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.purple, fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>n · TARGET (never changes)</div>
            <div style={{ color: C.purple, fontSize: 18, fontWeight: 700, fontFamily: "monospace" }}>{N}</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 15, color: C.green, minHeight: 20 }}>{s.out.map((o, i) => <div key={i}>&gt; {o}</div>)}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>Initialise → update each round → use after.</strong> Miss the{" "}
        <code style={{ color: C.teal }}>total = 0</code> and Python has no box to add into (a{" "}
        <code style={{ color: C.red }}>NameError</code>). Put it <em>inside</em> the loop and it resets to 0 every
        round, wiping your answer. The accumulator lives OUTSIDE, the update lives INSIDE.
      </div>
    </div>
  );
}

// ── Section 4: The Accumulator Family ────────────────────────────────────────
function AccumulatorFamily() {
  const [n, setN] = useState(5);
  const [mode, setMode] = useState("sum");

  const factorial = (k) => { let r = 1; for (let x = 1; x <= k; x++) r *= x; return r; };
  const multiples = (k) => { let c = 0; for (let x = 1; x <= k; x++) if (x % 3 === 0) c++; return c; };

  const modes = {
    sum: {
      label: "Sum 1…n", color: C.accent, init: "total = 0", op: "add",
      code: `total = 0\nfor i in range(1, ${n + 1}):\n    total = total + i\nprint(total)`,
      result: (n * (n + 1)) / 2,
      note: "Start at 0, ADD each number.",
    },
    fact: {
      label: "Factorial n!", color: C.purple, init: "result = 1", op: "multiply",
      code: `result = 1\nfor i in range(1, ${n + 1}):\n    result = result * i\nprint(result)`,
      result: factorial(n),
      note: "Start at 1 (not 0 — you'd multiply everything to zero!), MULTIPLY each number.",
    },
    count: {
      label: "Count of ÷3", color: C.green, init: "count = 0", op: "count",
      code: `count = 0\nfor i in range(1, ${n + 1}):\n    if i % 3 == 0:\n        count = count + 1\nprint(count)`,
      result: multiples(n),
      note: "Start at 0, add 1 ONLY when a condition is true — a counting accumulator.",
    },
  };
  const m = modes[mode];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Here's the payoff: once you see the accumulator skeleton, a whole family of "classic" programs are the
        <em> same three lines</em> with a different starting value and a different update. Switch between them and
        watch how little actually changes.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(modes).map(([k, mv]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, minWidth: 110, padding: "9px 8px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
            background: mode === k ? mv.color + "22" : C.card,
            border: `1.5px solid ${mode === k ? mv.color : C.border}`,
            color: mode === k ? mv.color : C.muted, transition: "all 0.2s",
          }}>{mv.label}</button>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>n = <strong style={{ color: m.color }}>{n}</strong></label>
        <input type="range" min={1} max={10} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: m.color }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }}>
        <pre style={{ background: C.card, border: `1px solid ${m.color}55`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.85, margin: 0 }}>{m.code}</pre>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 700, color: m.color }}>{m.result}</div>
          </div>
          <div style={{ background: m.color + "14", border: `1px solid ${m.color}44`, borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>
            {m.note}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>One pattern, many programs.</strong> Sum, factorial and counting look
        like three different assignments in a lab manual — but they're one idea (init a box → update it in a loop →
        use it). Learn the <em>pattern</em>, not 50 separate programs.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What are the four moves of computational thinking?",
      options: [
        "Copy, paste, run, debug",
        "Decomposition, pattern recognition, abstraction, algorithm design",
        "Variables, loops, conditions, functions",
        "Read, write, test, deploy",
      ],
      answer: 1,
      explain: "Break it down (decomposition), spot what repeats (pattern recognition), keep only what matters (abstraction), and write the ordered steps (algorithm design) — the plan you make before coding.",
    },
    {
      q: "In an accumulator loop, where must total = 0 go?",
      options: [
        "Inside the loop, so it's fresh each round",
        "Before the loop, so the running total survives across rounds",
        "After the loop, just before printing",
        "It doesn't matter where it goes",
      ],
      answer: 1,
      explain: "The accumulator must be initialised OUTSIDE the loop. Put total = 0 inside and it resets to 0 every round, throwing away everything you added.",
    },
    {
      q: "To compute a factorial (5! = 1×2×3×4×5), what should the accumulator start at?",
      options: ["0", "1", "5", "It doesn't matter"],
      answer: 1,
      explain: "A multiplying accumulator starts at 1. Start at 0 and every multiplication gives 0 — the whole product collapses. Adding starts at 0; multiplying starts at 1.",
    },
    {
      q: "Why does this module teach patterns like the accumulator instead of memorising each program?",
      options: [
        "Because memorising is against the rules",
        "Because one pattern (init → update in a loop → use) solves a whole family of problems",
        "Because patterns are only for advanced students",
        "Because Python has no built-in sum",
      ],
      answer: 1,
      explain: "Sum, factorial, and counting are the same skeleton with a different start value and update. Learn the pattern once and you can write dozens of 'lab manual' programs — that's computational thinking.",
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
          {score === 4 ? "You've got the mindset — decompose first, code second." :
            score >= 2 ? "Nice — replay the Accumulator trace to lock in init-outside / update-inside." :
              "Revisit The Four Moves and the Accumulator trace, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now turn a problem into a plan, and you own your first reusable pattern — the accumulator.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 2 — Counting &amp; Building with Loops.</strong>{" "}
            Factorials, digit sums, reversing a number, and powers — all built from the same accumulator idea.
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
export default function UnitCT1_1({ student, onUnitComplete }) {
  const sections = [
    { id: "gap", label: "The Gap" },
    { id: "moves", label: "The Four Moves" },
    { id: "acc", label: "The Accumulator" },
    { id: "family", label: "Pattern Family" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Syntax Isn't a Solution</h3><TheGap /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Four Moves of Computational Thinking</h3><FourMoves /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Accumulator — Your First Pattern</h3><Accumulator /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>One Pattern, a Whole Family</h3><AccumulatorFamily /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your grip on the four moves and the accumulator.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING I › UNIT 1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>The Four Moves &amp; the Accumulator</div>
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
