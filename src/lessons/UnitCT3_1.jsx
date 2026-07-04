import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: The Need — self-similar problems ──────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Some problems contain a <strong style={{ color: C.text }}>smaller copy of themselves</strong>. Factorial is
        the classic: <code style={{ color: C.accent }}>5! = 5 × 4!</code>, and <code style={{ color: C.accent }}>4! = 4 × 3!</code>,
        and so on. Each answer is built from a slightly smaller version of the same question.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <pre style={{ fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.9, whiteSpace: "pre" }}>
{`5! = 5 × `}<span style={{ color: C.teal }}>4!</span>{`
4! = 4 × `}<span style={{ color: C.teal }}>3!</span>{`
3! = 3 × `}<span style={{ color: C.teal }}>2!</span>{`
2! = 2 × `}<span style={{ color: C.teal }}>1!</span>{`
1! = 1 × `}<span style={{ color: C.teal }}>0!</span>{`
0! = `}<span style={{ color: C.green }}>1</span>{`   ← the buck stops here`}</pre>
      </div>

      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        A function that solves a problem by <strong style={{ color: C.purple }}>calling itself</strong> on a smaller
        input is called <strong style={{ color: C.text }}>recursive</strong>. You met the call stack in Unit 8.3 —
        recursion just calls the <em>same</em> function again, stacking a new frame each time.
      </p>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Recursion needs two things:</strong> a way to shrink toward an
        answer (the recursive step), and a smallest case that answers directly without shrinking further (the base
        case). Miss the base case and it never stops.
      </div>
    </div>
  );
}

// ── Section 2: Base case + recursive case ────────────────────────────────────
function Anatomy() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Every recursive function has the same skeleton: check the <span style={{ color: C.green }}>base case</span>{" "}
        first, otherwise do a little work and <span style={{ color: C.teal }}>call yourself on a smaller input</span>.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, fontFamily: "monospace", fontSize: 12.5, lineHeight: 2, whiteSpace: "pre" }}>
        def factorial(n):{"\n"}
        {"    "}<span style={{ color: C.green }}>if n == 0:</span>{"            # BASE CASE — stop here\n"}
        {"        "}<span style={{ color: C.green }}>return 1</span>{"\n"}
        {"    "}<span style={{ color: C.teal }}>return n * factorial(n - 1)</span>{"  # RECURSIVE CASE — smaller n"}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>✅ Base case</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>The smallest input, answered directly. factorial(0) is just 1 — no more calls.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.teal}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>🔁 Recursive case</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>Do a bit of work (× n) and hand the rest to a smaller call, factorial(n − 1).</div>
        </div>
      </div>

      <div style={{ background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "12px 16px", fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
        ⚠️ <strong style={{ color: C.red }}>Forget the base case</strong> (or never shrink toward it) and Python
        stacks frames forever until it crashes with <code style={{ color: C.red }}>RecursionError</code>. The base
        case is the brake.
      </div>
    </div>
  );
}

// ── Section 3: Call-stack stepper for factorial(4) ───────────────────────────
const STACK_STEPS = (() => {
  const steps = [];
  // winding: push frames 4..0
  for (let n = 4; n >= 1; n--) {
    steps.push({ frames: rangeFrames(4, n), active: n, phase: "call", ret: null,
      desc: `factorial(${n}) is called. It needs factorial(${n - 1}) before it can multiply, so it pauses and calls down.` });
  }
  steps.push({ frames: rangeFrames(4, 0), active: 0, phase: "base", ret: 1,
    desc: `factorial(0) hits the base case → returns 1 immediately. The stack stops growing.` });
  // unwinding: pop with returns
  let ret = 1;
  for (let n = 1; n <= 4; n++) {
    ret = n * ret;
    steps.push({ frames: rangeFrames(4, n), active: n, phase: "return", ret,
      desc: `factorial(${n}) resumes: ${n} * ${ret / n} = ${ret}. It returns ${ret} up to its caller.` });
  }
  steps.push({ frames: [], active: null, phase: "done", ret: 24,
    desc: `All frames returned. factorial(4) = 24. Notice: the work happened on the way BACK UP.` });
  return steps;

  function rangeFrames(top, downTo) {
    const f = [];
    for (let n = top; n >= downTo; n--) f.push(n);
    return f;
  }
})();

function StackStepper() {
  const [step, setStep] = useState(0);
  const s = STACK_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Watch <code style={{ color: C.accent }}>factorial(4)</code>. Frames pile up as it calls down (winding),
        the base case returns 1, then each frame multiplies and returns on the way back up (unwinding).
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(STACK_STEPS.length - 1, x + 1))} disabled={step === STACK_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === STACK_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === STACK_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === STACK_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {STACK_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, minHeight: 200, display: "flex", flexDirection: "column-reverse", gap: 6 }}>
          {s.frames.length === 0 && <div style={{ color: C.muted, fontSize: 12, textAlign: "center", margin: "auto" }}>(stack empty — all returned)</div>}
          {s.frames.map((n) => {
            const isActive = n === s.active;
            const isBase = n === 0;
            let border = C.border, bg = C.card, col = C.text;
            if (isActive && s.phase === "return") { border = C.green; bg = C.green + "18"; col = C.green; }
            else if (isActive && s.phase === "base") { border = C.yellow; bg = C.yellow + "18"; col = C.yellow; }
            else if (isActive) { border = C.accent; bg = C.accent + "14"; col = C.accent; }
            return (
              <div key={n} style={{ borderRadius: 8, padding: "8px 12px", background: bg, border: `1.5px solid ${border}`, fontFamily: "monospace", fontSize: 13, color: col, display: "flex", justifyContent: "space-between" }}>
                <span>factorial({n}){isBase ? "  ← base" : ""}</span>
                {isActive && s.phase === "return" && <span style={{ fontWeight: 700 }}>→ {s.ret}</span>}
                {isActive && s.phase === "base" && <span style={{ fontWeight: 700 }}>→ 1</span>}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `2px solid ${s.phase === "call" ? C.accent : s.phase === "base" ? C.yellow : C.green}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: s.phase === "call" ? C.accent : s.phase === "base" ? C.yellow : C.green, fontSize: 10, letterSpacing: 1 }}>PHASE</div>
            <div style={{ color: C.text, fontSize: 16, fontWeight: 700 }}>
              {s.phase === "call" ? "⬇ winding" : s.phase === "base" ? "🛑 base case" : s.phase === "return" ? "⬆ unwinding" : "✅ done"}
            </div>
          </div>
          <div style={{ background: C.card, border: `2px solid ${C.purple}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.purple, fontSize: 10, letterSpacing: 1 }}>value returning</div>
            <div style={{ color: C.text, fontSize: 24, fontWeight: 700, fontFamily: "monospace" }}>{s.ret === null ? "—" : s.ret}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Calls go down; answers come back up.</strong> Nothing multiplies until
        the base case is hit — then the paused frames finish, deepest first. The stack IS the recursion.
      </div>
    </div>
  );
}

// ── Section 4: Recursion vs loop ─────────────────────────────────────────────
function VsLoop() {
  const [mode, setMode] = useState("rec");
  const modes = {
    rec: {
      label: "Recursive", color: C.teal,
      code: "def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)",
      note: "Reads like the maths: n! = n × (n−1)!. No explicit loop or accumulator — the call stack does the remembering.",
    },
    loop: {
      label: "Iterative (loop)", color: C.orange,
      code: "def factorial(n):\n    fact = 1\n    for i in range(1, n + 1):\n        fact = fact * i\n    return fact",
      note: "The accumulator version from CT-I. Uses no extra stack frames, so it's cheaper for very large n.",
    },
  };
  const m = modes[mode];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The same factorial two ways. Both correct — they trade readability against memory.
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
        🔑 <strong style={{ color: C.purple }}>Reach for recursion when a problem is naturally self-similar</strong>{" "}
        — trees, nested folders, Tower of Hanoi. Reach for a loop when a simple accumulator does the job. Anything
        recursive can be written as a loop, and vice versa.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What are the TWO essential parts of every recursive function?",
      options: [
        "A loop and an accumulator",
        "A base case (stops) and a recursive case (calls itself on a smaller input)",
        "Two return statements",
        "An import and a print",
      ],
      answer: 1,
      explain: "The base case answers the smallest input directly; the recursive case shrinks the problem and calls itself. Without a base case, it never stops.",
    },
    {
      q: "In factorial(4), when does any multiplication actually happen?",
      options: [
        "On the way down, as calls are made",
        "On the way back up, after the base case returns 1 and paused frames resume",
        "Never",
        "All at once at the start",
      ],
      answer: 1,
      explain: "Each frame pauses at  n * factorial(n-1)  until the inner call returns. Multiplication happens during unwinding, deepest frame first.",
    },
    {
      q: "What happens if a recursive function has no reachable base case?",
      options: [
        "It returns 0",
        "It keeps stacking frames until Python raises RecursionError",
        "It runs faster",
        "Python fixes it automatically",
      ],
      answer: 1,
      explain: "With nothing to stop it, frames pile up without bound until the interpreter's limit is hit — RecursionError. The base case is the brake.",
    },
    {
      q: "Which is a fair reason to choose recursion over a loop?",
      options: [
        "It's always faster",
        "The problem is naturally self-similar (e.g. Tower of Hanoi), so recursion reads far more clearly",
        "Loops don't work on numbers",
        "Recursion uses less memory",
      ],
      answer: 1,
      explain: "For self-similar problems, recursion mirrors the structure and is clearer. But it uses stack frames, so a loop can be cheaper for huge inputs.",
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
          {score === 4 ? "You can read a recursive function as a stack of paused frames." :
            score >= 2 ? "Good — replay the Stack Stepper to feel winding vs unwinding." :
              "Revisit the Anatomy and Stack Stepper, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 CT III · Unit 1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Base case + recursive case, and the call stack that winds down then unwinds up.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 2 — Recursion in Action.</strong> Sum of digits and
            power recursively, then Fibonacci — and why naïve Fibonacci is surprisingly slow.
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
export default function UnitCT3_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "anatomy", label: "Base & Recursive" },
    { id: "stack", label: "Stack Stepper" },
    { id: "vs", label: "Recursion vs Loop" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Problems That Contain Themselves</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Base Case &amp; Recursive Case</h3><Anatomy /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>See It: The Call Stack</h3><StackStepper /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Recursion vs a Loop</h3><VsLoop /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on the recursive idea.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING III › UNIT 1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>The Recursive Idea</div>
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
