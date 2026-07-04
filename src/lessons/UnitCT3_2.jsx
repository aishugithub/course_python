import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: The Need ──────────────────────────────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Unit 1 gave you the recursive skeleton on factorial. The same skeleton — a{" "}
        <span style={{ color: C.green }}>base case</span> plus a{" "}
        <span style={{ color: C.teal }}>smaller call</span> — solves a whole family of the number problems you met
        in CT Set 1: sum of digits, power, countdowns.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>The shape you keep reusing:</div>
        <pre style={{ fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.9, whiteSpace: "pre" }}>
{`def solve(problem):
    if `}<span style={{ color: C.green }}>problem is smallest</span>{`:
        return `}<span style={{ color: C.green }}>direct answer</span>{`
    return `}<span style={{ color: C.teal }}>combine(a bit, solve(smaller))</span></pre>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Ask two questions for any recursion:</strong> "what's the smallest
        case I can answer outright?" and "how do I shrink the input by one step?" Answer both and the function
        writes itself.
      </div>
    </div>
  );
}

// ── Section 2: Same skeleton, three problems ─────────────────────────────────
function SameSkeleton() {
  const [mode, setMode] = useState("digits");
  const modes = {
    digits: {
      label: "Sum of digits", color: C.teal,
      code: "def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n // 10)",
      base: "n == 0 → 0 (no digits left)",
      step: "peel the last digit (n % 10) and add the sum of the rest (n // 10)",
      demo: "digit_sum(253) → 3 + digit_sum(25) → 3+5+digit_sum(2) → 3+5+2 = 10",
    },
    power: {
      label: "Power", color: C.orange,
      code: "def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)",
      base: "exp == 0 → 1 (anything to the 0 is 1)",
      step: "one factor of base × the power with exp reduced by 1",
      demo: "power(2, 3) → 2 × power(2, 2) → 2×2×power(2,1) → 2×2×2×1 = 8",
    },
    count: {
      label: "Countdown", color: C.green,
      code: 'def countdown(n):\n    if n == 0:\n        print("liftoff")\n        return\n    print(n)\n    countdown(n - 1)',
      base: 'n == 0 → print "liftoff" and stop',
      step: "print n, then count down from n − 1",
      demo: "countdown(3) → 3, 2, 1, liftoff",
    },
  };
  const m = modes[mode];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Three problems, one skeleton. Notice how each just fills in "smallest case" and "shrink step" differently.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(modes).map(([k, mv]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, minWidth: 100, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
            background: mode === k ? mv.color + "22" : C.card,
            border: `1.5px solid ${mode === k ? mv.color : C.border}`, color: mode === k ? mv.color : C.muted,
          }}>{mv.label}</button>
        ))}
      </div>

      <pre style={{ background: "#0A0E14", border: `1px solid ${m.color}44`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.8, margin: "0 0 14px", whiteSpace: "pre" }}>{m.code}</pre>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div style={{ background: C.card, border: `1px solid ${C.green}44`, borderRadius: 8, padding: 12 }}>
          <div style={{ color: C.green, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>BASE CASE</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>{m.base}</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${m.color}44`, borderRadius: 8, padding: 12 }}>
          <div style={{ color: m.color, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SHRINK STEP</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>{m.step}</div>
        </div>
      </div>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 11.5, color: m.color, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
        {m.demo}
      </div>
    </div>
  );
}

// ── Section 3: Fibonacci call tree ───────────────────────────────────────────
function fibCalls(n) { return n <= 1 ? 1 : 1 + fibCalls(n - 1) + fibCalls(n - 2); }
function fibVal(n) { return n <= 1 ? n : fibVal(n - 1) + fibVal(n - 2); }

function FibNode({ n, depth }) {
  const leaf = n <= 1;
  const color = leaf ? C.green : C.accent;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{
        fontFamily: "monospace", fontSize: 11.5, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
        background: color + "18", border: `1.5px solid ${color}`, color, whiteSpace: "nowrap",
      }}>fib({n}){leaf ? `=${n}` : ""}</div>
      {!leaf && (
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <FibNode n={n - 1} depth={depth + 1} />
          <FibNode n={n - 2} depth={depth + 1} />
        </div>
      )}
    </div>
  );
}

function Fibonacci() {
  const [n, setN] = useState(6);
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        <strong style={{ color: C.text }}>Fibonacci</strong> makes <em>two</em> recursive calls, so it branches into
        a tree. Each number is the sum of the previous two — base case: fib(0)=0, fib(1)=1.
      </p>

      <pre style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.8, margin: "0 0 14px", whiteSpace: "pre" }}>{`def fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)`}</pre>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14, overflowX: "auto" }}>
        <div style={{ color: C.muted, fontSize: 11, marginBottom: 10 }}>Call tree for fib(4):</div>
        <div style={{ display: "flex", justifyContent: "center", minWidth: 320 }}>
          <FibNode n={4} depth={0} />
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>n = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={2} max={15} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: C.card, border: `2px solid ${C.green}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
          <div style={{ color: C.green, fontSize: 10, letterSpacing: 1 }}>fib({n}) =</div>
          <div style={{ color: C.text, fontSize: 24, fontWeight: 700, fontFamily: "monospace" }}>{fibVal(n)}</div>
        </div>
        <div style={{ background: C.card, border: `2px solid ${C.red}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
          <div style={{ color: C.red, fontSize: 10, letterSpacing: 1 }}>calls made</div>
          <div style={{ color: C.text, fontSize: 24, fontWeight: 700, fontFamily: "monospace" }}>{fibCalls(n)}</div>
        </div>
      </div>

      <div style={{ marginTop: 14, background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        ⚠️ <strong style={{ color: C.red }}>The call count explodes.</strong> fib(6) already needs 25 calls; the same
        sub-problems (like fib(2)) are recomputed again and again. Beautiful code, but wasteful.
      </div>
    </div>
  );
}

// ── Section 4: Recursion vs iteration ────────────────────────────────────────
function VsIteration() {
  const [mode, setMode] = useState("rec");
  const modes = {
    rec: {
      label: "Recursive", color: C.teal,
      code: "def fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)",
      note: "Mirrors the definition perfectly — but recomputes the same values exponentially. fib(40) would take ages.",
    },
    loop: {
      label: "Iterative (loop)", color: C.orange,
      code: "def fib(n):\n    a = 0\n    b = 1\n    for i in range(n):\n        temp = a + b\n        a = b\n        b = temp\n    return a",
      note: "Two running values sweep forward once — linear time, no repeated work. fib(40) is instant.",
    },
  };
  const m = modes[mode];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Recursion isn't always the right tool. For Fibonacci, a loop is dramatically faster — same answer, no
        exploding tree. It just keeps the last two values as it marches forward.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {Object.entries(modes).map(([k, mv]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
            background: mode === k ? mv.color + "22" : C.card,
            border: `1.5px solid ${mode === k ? mv.color : C.border}`, color: mode === k ? mv.color : C.muted,
          }}>{mv.label}</button>
        ))}
      </div>

      <pre style={{ background: "#0A0E14", border: `1px solid ${m.color}44`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.8, margin: 0, whiteSpace: "pre" }}>{m.code}</pre>

      <div style={{ marginTop: 14, background: m.color + "14", border: `1px solid ${m.color}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
        {m.note}
      </div>

      <div style={{ marginTop: 16, background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Recursion buys clarity, sometimes at a cost.</strong> Use it when the
        problem is genuinely branching (trees, Hanoi — next unit). For a straight march like Fibonacci or factorial,
        a loop is often the smarter engineering choice.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "In  digit_sum(n),  what is the base case?",
      options: ["n == 1 → 1", "n == 0 → 0 (no digits left)", "n > 10", "There is none"],
      answer: 1,
      explain: "Peeling n // 10 eventually reaches 0, which has no digits to add — so digit_sum(0) returns 0 directly and stops the recursion.",
    },
    {
      q: "Why does Fibonacci form a TREE of calls, not a single chain like factorial?",
      options: [
        "It uses a loop",
        "Each fib(n) makes TWO recursive calls — fib(n-1) and fib(n-2) — so the calls branch",
        "It has no base case",
        "It only calls itself once",
      ],
      answer: 1,
      explain: "Two recursive calls per step means the call graph splits in two at every node, forming a branching tree that grows fast.",
    },
    {
      q: "Naïve recursive Fibonacci is slow mainly because…",
      options: [
        "Python is slow",
        "It recomputes the same sub-problems (like fib(2)) many times over",
        "It uses too much disk",
        "The base case is wrong",
      ],
      answer: 1,
      explain: "The same fib(k) values are calculated repeatedly across the branches, so the work grows exponentially even though there are only n distinct answers.",
    },
    {
      q: "For computing Fibonacci fast, which is the better choice?",
      options: [
        "Recursion — it's always best",
        "An iterative loop with two running values — linear time, no repeated work",
        "Neither works",
        "Recursion, because loops can't add",
      ],
      answer: 1,
      explain: "A loop sweeps forward once keeping the last two values, so it's linear and instant even for large n. Recursion here is elegant but exponential.",
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
          {score === 4 ? "You can turn number problems recursive — and know when not to." :
            score >= 2 ? "Good — replay the Fibonacci tree to see the repeated work." :
              "Revisit Same Skeleton and Fibonacci, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 CT III · Unit 2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Sum-of-digits, power, and the branching cost of Fibonacci.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 3 — Tower of Hanoi.</strong> The showcase where
            recursion shines and a loop would be a nightmare: move a tower three disks at a time.
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
export default function UnitCT3_2({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "skeleton", label: "Same Skeleton" },
    { id: "fib", label: "Fibonacci Tree" },
    { id: "vs", label: "Recursion vs Loop" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>One Skeleton, Many Programs</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Same Skeleton, Three Problems</h3><SameSkeleton /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Fibonacci: When Recursion Branches</h3><Fibonacci /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Recursion vs a Loop</h3><VsIteration /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on recursion in action.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING III › UNIT 2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Recursion in Action</div>
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
