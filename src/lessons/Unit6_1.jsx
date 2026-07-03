import { useState, useEffect } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Need For Repetition ──────────────────────────────────────────────────────
function NeedForRepetition() {
  const [n, setN] = useState(10);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Suppose your program must print "Hello" {n} times. You already know print() — so you COULD just
        copy-paste the line {n} times. Drag the slider and watch what happens to each program.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>times = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={1} max={100} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ COPY-PASTE</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: "0 0 10px 0" }}>
            {Array.from({ length: Math.min(n, 4) }, () => 'print("Hello")').join("\n")}
            {n > 4 ? `\n... ${n - 4} more lines ...` : ""}
          </pre>
          <div style={{ color: C.red, fontSize: 12, fontWeight: 600 }}>{n} line{n > 1 ? "s" : ""} of code</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>
            Want "Hi" instead of "Hello"? You now edit {n} lines. Want 1000 repeats? Good luck.
          </div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ WITH A LOOP</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: "0 0 10px 0" }}>{`count = 1\nwhile count <= ${n}:\n    print("Hello")\n    count = count + 1`}</pre>
          <div style={{ color: C.green, fontSize: 12, fontWeight: 600 }}>4 lines — always</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8, lineHeight: 1.6 }}>
            10 repeats or 10 million — the code never grows. Change one number, done.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.accent }}>This is WHY loops exist.</strong> Computers are brilliant at
        repeating boring work — loops are how you hand that boring work over instead of doing the
        copy-pasting yourself.
      </div>
    </div>
  );
}

// ── Anatomy Of While ─────────────────────────────────────────────────────────
function WhileAnatomy() {
  const [part, setPart] = useState(null);

  const parts = [
    { key: "kw", code: "while", color: C.purple, title: "The keyword", desc: "Tells Python: 'keep repeating the block below as long as my condition stays True.'" },
    { key: "cond", code: "count <= 3", color: C.accent, title: "The condition", desc: "A normal boolean expression — exactly like the ones you wrote for if in Module 5. It is re-checked before EVERY repetition." },
    { key: "colon", code: ":", color: C.yellow, title: "The colon", desc: "Same rule as if — the colon says 'an indented block starts here.'" },
    { key: "body", code: 'print(count) …', color: C.green, title: "The body", desc: "The indented lines that get repeated. Same indentation rule you learned in Unit 5.2 — the indent IS the syntax." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Good news: you already know almost all of this. A <code style={{ color: C.accent }}>while</code> looks
        exactly like an <code style={{ color: C.accent }}>if</code> — same condition, same colon, same indented
        block. The ONLY difference: after the block finishes, Python <strong style={{ color: C.accent }}>jumps
        back up and checks the condition again</strong>. Click each part of the code below.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, fontFamily: "monospace", fontSize: 15, lineHeight: 2 }}>
        <div>
          {[parts[0], parts[1], parts[2]].map((p, i) => (
            <span key={p.key} onClick={() => setPart(p.key)} style={{
              cursor: "pointer", padding: "3px 4px", borderRadius: 5,
              background: part === p.key ? p.color + "33" : "transparent",
              border: `1.5px solid ${part === p.key ? p.color : "transparent"}`,
              color: p.color, marginRight: i === 0 ? 8 : 0,
            }}>{p.code}</span>
          ))}
        </div>
        <div onClick={() => setPart("body")} style={{
          cursor: "pointer", marginLeft: 30, padding: "3px 4px", borderRadius: 5, width: "fit-content",
          background: part === "body" ? C.green + "33" : "transparent",
          border: `1.5px solid ${part === "body" ? C.green : "transparent"}`,
          color: C.green,
        }}>print(count)<br />count = count + 1</div>
      </div>

      {part && (() => {
        const p = parts.find((x) => x.key === part);
        return (
          <div style={{ marginTop: 12, background: p.color + "18", border: `1px solid ${p.color}44`, borderRadius: 8, padding: "12px 16px" }}>
            <div style={{ color: p.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{p.title}</div>
            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{p.desc}</div>
          </div>
        );
      })()}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>⚙️ C</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0 }}>{`while (count <= 3) {\n    printf("%d", count);\n    count = count + 1;\n}`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>Brackets around the condition, braces around the body, semicolons everywhere.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🐍 Python</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0 }}>{`while count <= 3:\n    print(count)\n    count = count + 1`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>Colon + indentation — the exact same block rule as if. Nothing new to memorise.</div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>One sentence to remember:</strong> a while loop is just an if
        statement that runs its block, then goes back up to ask the question again — and again — until the
        answer is finally False.
      </div>
    </div>
  );
}

// ── Loop Trace ───────────────────────────────────────────────────────────────
const TRACE_CODE = ["count = 1", "while count <= 3:", "    print(count)", "    count = count + 1", 'print("Done!")'];

function buildTraceSteps() {
  const steps = [{ line: 0, count: 1, cond: null, out: [], desc: "A memory slot named count is created and stores 1." }];
  let out = [];
  for (let v = 1; v <= 3; v++) {
    steps.push({ line: 1, count: v, cond: true, out: [...out], desc: `Check the condition: is ${v} <= 3? True → run the body.` });
    out = [...out, String(v)];
    steps.push({ line: 2, count: v, cond: null, out: [...out], desc: `print(count) prints ${v}.` });
    steps.push({ line: 3, count: v + 1, cond: null, out: [...out], desc: `count = count + 1 → the slot is overwritten: ${v} becomes ${v + 1}.` });
  }
  steps.push({ line: 1, count: 4, cond: false, out: [...out], desc: "Check again: is 4 <= 3? False → Python skips the indented block. The loop is over." });
  steps.push({ line: 4, count: 4, cond: null, out: [...out, "Done!"], desc: "Execution continues on the first line AFTER the loop." });
  return steps;
}
const TRACE_STEPS = buildTraceSteps();

function LoopTrace() {
  const [step, setStep] = useState(0);
  const s = TRACE_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The best way to understand a loop is to BE the computer. Step through this program one action at a
        time and watch the highlighted line, the memory slot, and the output.
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
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>MEMORY</div>
            <div style={{ display: "inline-block", background: C.bg, border: `2px solid ${C.teal}`, borderRadius: 8, padding: "8px 18px" }}>
              <div style={{ color: C.teal, fontSize: 11, fontFamily: "monospace" }}>count</div>
              <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{s.count}</div>
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>CONDITION CHECK</div>
            <div style={{
              fontFamily: "monospace", fontWeight: 700, fontSize: 15,
              color: s.cond === null ? C.muted : s.cond ? C.green : C.red,
            }}>{s.cond === null ? "—" : s.cond ? "True ✓" : "False ✗"}</div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, flex: 1 }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: C.green, minHeight: 40 }}>
              {s.out.map((o, i) => <div key={i}>&gt; {o}</div>)}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.desc}
      </div>
    </div>
  );
}

// ── Infinite Loop Danger ─────────────────────────────────────────────────────
function InfiniteLoopDemo() {
  const [broken, setBroken] = useState(false);
  const [running, setRunning] = useState(false);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (!running || !broken || lines.length >= 24) return;
    const t = setTimeout(() => setLines((p) => [...p, "1"]), 70);
    return () => clearTimeout(t);
  }, [running, broken, lines]);

  const run = () => {
    setLines(broken ? [] : ["1", "2", "3", "Done!"]);
    setRunning(true);
  };
  const pick = (b) => { setBroken(b); setRunning(false); setLines([]); };
  const stuck = broken && running && lines.length >= 24;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A while loop only ends when its condition becomes False. So something INSIDE the body must move the
        loop towards the finish line. Delete that one line and... see for yourself. Pick a version and run it.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        {[false, true].map((b) => (
          <div key={String(b)} onClick={() => pick(b)} style={{
            background: C.card, borderRadius: 10, padding: 14, cursor: "pointer",
            border: `2px solid ${broken === b ? (b ? C.red : C.green) : C.border}`, transition: "all 0.2s",
          }}>
            <div style={{ color: b ? C.red : C.green, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>
              {b ? "☠️ UPDATE LINE DELETED" : "✅ CORRECT LOOP"}
            </div>
            <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0 }}>
              {b ? `count = 1\nwhile count <= 3:\n    print(count)` : `count = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1`}
            </pre>
          </div>
        ))}
      </div>

      <button onClick={run} style={{
        width: "100%", padding: "10px", borderRadius: 8, background: C.accentGlow, border: "none",
        color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 14,
      }}>▶ Run this version</button>

      <div style={{ background: C.bg, border: `1.5px solid ${stuck ? C.red : C.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 13, maxHeight: 180, overflowY: "auto" }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>TERMINAL</div>
        {lines.map((l, i) => <div key={i} style={{ color: l === "Done!" ? C.accent : C.green }}>&gt; {l}</div>)}
        {stuck && <div style={{ color: C.red, marginTop: 6 }}>... still printing 1, forever ⚠️</div>}
      </div>

      {stuck && (
        <div style={{ marginTop: 12, background: C.red + "18", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
          ☠️ <strong style={{ color: C.red }}>Infinite loop!</strong> count stays 1 forever, so "is 1 &lt;= 3?"
          is True forever. In real Python your program just hangs — press{" "}
          <code style={{ color: C.red }}>Ctrl+C</code> in the terminal to kill it. Every programmer writes one
          of these eventually; now you'll know exactly what happened.
        </div>
      )}

      <div style={{ marginTop: 16, background: C.yellow + "15", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.yellow }}>The while-loop checklist:</strong> ① start the counter variable
        BEFORE the loop, ② check it in the condition, ③ UPDATE it inside the body. Miss step ③ and the loop
        never ends.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What does a while loop do just before EVERY repetition of its body?",
      options: ["Nothing — it checks the condition only once, at the start", "Re-checks its condition, and runs the body only if it's still True", "Asks the user whether to continue", "Increments the loop variable automatically"],
      answer: 1,
      explain: "The condition is re-evaluated before every single round. The moment it's False, Python skips past the indented block. Nothing is automatic — updating the variable is YOUR job.",
    },
    {
      q: "What does this print?\ncount = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1",
      options: ["1 2 3", "1 2 3 4", "0 1 2 3", "It loops forever"],
      answer: 0,
      explain: "count is printed at 1, 2 and 3. When count becomes 4, the check 4 <= 3 is False and the loop ends — 4 is never printed.",
    },
    {
      q: "You forget the line count = count + 1 inside the loop body. What happens?",
      options: ["Python raises a SyntaxError", "The loop runs exactly once", "The condition never becomes False — the loop runs forever", "Python adds the line for you"],
      answer: 2,
      explain: "The code is perfectly legal Python — it just never makes progress. count stays 1, the condition stays True, and the loop spins forever until you press Ctrl+C.",
    },
    {
      q: "What if the condition is already False the FIRST time Python reaches the while line?",
      options: ["The body runs once anyway, then stops", "Python raises an error", "The body never runs — zero repetitions", "Python waits until the condition becomes True"],
      answer: 2,
      explain: "while checks BEFORE running the body. If the very first check is False, the body is skipped entirely — a while loop can legitimately run zero times.",
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
          {score === 4 ? "Perfect! You can read, trace and debug while loops already." :
            score >= 2 ? "Good work — run through the Trace It section once more to lock it in." :
              "Revisit Trace It and Infinite Loops, then try the quiz again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 6.1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Your programs can finally repeat themselves — the second of the four superpowers (decide, repeat,
            organise, modularise).<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 6.2 — The for Loop & range().</strong>{" "}
            A shortcut that creates, checks AND updates the counter for you — in one line.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16, whiteSpace: "pre-wrap", fontFamily: q.q.includes("\n") ? "monospace" : "inherit" }}>{q.q}</div>
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
export default function Unit6_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Why Repeat?" },
    { id: "anatomy", label: "Anatomy of while" },
    { id: "trace", label: "Trace It" },
    { id: "infinite", label: "Infinite Loops" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Why Programs Need to Repeat</h3>
      <NeedForRepetition />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>The while Loop — an if That Comes Back</h3>
      <WhileAnatomy />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Trace It: Be the Computer</h3>
      <LoopTrace />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>The Infinite Loop — Every Beginner's Rite of Passage</h3>
      <InfiniteLoopDemo />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        4 questions to check your understanding of Unit 6.1.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 6 › UNIT 6.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>The while Loop</div>
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
