import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Break Demo ───────────────────────────────────────────────────────────────
function BreakDemo() {
  const [target, setTarget] = useState(4);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Imagine checking 10 lockers for your keys. Once you FIND them, do you keep opening the remaining
        lockers? Of course not. <code style={{ color: C.accent }}>break</code> is how a loop stops the moment
        its job is done. Move the slider to choose where the keys are.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>keys are in locker <strong style={{ color: C.accent }}>{target}</strong></label>
        <input type="range" min={1} max={10} value={target} onChange={(e) => setTarget(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.9, marginBottom: 14 }}>{`for locker in range(1, 11):
    print("Checking locker", locker)
    if locker == ${target}:
        print("Found the keys!")
        break        # exit the loop RIGHT NOW`}</pre>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 10 }}>THE 10 ROUNDS</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Array.from({ length: 10 }, (_, k) => {
            const n = k + 1;
            const ran = n <= target;
            const found = n === target;
            return (
              <div key={n} style={{
                width: 52, borderRadius: 8, padding: "6px 0", textAlign: "center",
                background: found ? C.green + "26" : ran ? C.accent + "15" : "transparent",
                border: `1.5px solid ${found ? C.green : ran ? C.accent + "66" : C.border}`,
                color: found ? C.green : ran ? C.accent : C.muted,
                opacity: ran ? 1 : 0.45, transition: "all 0.2s",
              }}>
                <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: 9 }}>{found ? "found ✓" : ran ? "checked" : "never runs"}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 12, fontFamily: "monospace", fontSize: 13 }}>
          <span style={{ color: C.green }}>{target} check{target > 1 ? "s" : ""}</span>
          <span style={{ color: C.muted }}> instead of 10 — break skipped {10 - target} pointless round{10 - target === 1 ? "" : "s"}.</span>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.accent }}>break = emergency exit.</strong> The loop ends instantly —
        Python jumps straight to the first line AFTER the loop, even if range had values left. It's almost
        always written inside an <code style={{ color: C.accent }}>if</code>, because you break on a condition.
      </div>
    </div>
  );
}

// ── Continue Demo ────────────────────────────────────────────────────────────
function ContinueDemo() {
  const [skipEvens, setSkipEvens] = useState(true);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        <code style={{ color: C.orange }}>continue</code> is break's gentler sibling: it doesn't END the loop,
        it just abandons the CURRENT round and jumps back to the top for the next one. Toggle it on and off.
      </p>

      <button onClick={() => setSkipEvens((v) => !v)} style={{
        width: "100%", padding: "10px", borderRadius: 8,
        background: skipEvens ? C.orange + "22" : C.card,
        border: `1.5px solid ${skipEvens ? C.orange : C.border}`,
        color: skipEvens ? C.orange : C.text, fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 14,
      }}>
        {skipEvens ? "continue is IN the code — click to remove it" : "continue was removed — click to put it back"}
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.9, margin: 0 }}>
          {skipEvens
            ? `for num in range(1, 9):\n    if num % 2 == 0:\n        continue\n    print(num)`
            : `for num in range(1, 9):\n\n\n    print(num)`}
        </pre>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 10 }}>THE 8 ROUNDS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {Array.from({ length: 8 }, (_, k) => {
              const n = k + 1;
              const skipped = skipEvens && n % 2 === 0;
              return (
                <div key={n} style={{
                  width: 46, borderRadius: 8, padding: "5px 0", textAlign: "center",
                  background: skipped ? C.orange + "18" : C.green + "18",
                  border: `1.5px solid ${skipped ? C.orange + "88" : C.green + "88"}`,
                  color: skipped ? C.orange : C.green, transition: "all 0.2s",
                }}>
                  <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>{n}</div>
                  <div style={{ fontSize: 9 }}>{skipped ? "skipped" : "printed"}</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, fontFamily: "monospace", fontSize: 13, color: C.green }}>
            &gt; {Array.from({ length: 8 }, (_, k) => k + 1).filter((n) => !(skipEvens && n % 2 === 0)).join("  ")}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <div style={{ background: C.red + "12", border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>break</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.7 }}>
            "We're DONE." Ends the whole loop. No more rounds, ever. Jump past the loop.
          </div>
        </div>
        <div style={{ background: C.orange + "12", border: `1.5px solid ${C.orange}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>continue</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.7 }}>
            "Not THIS one." Abandons the current round only. The loop itself keeps going with the next value.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Nested Loops ─────────────────────────────────────────────────────────────
function NestedLoops() {
  const ROWS = 3, COLS = 4;
  const total = ROWS * COLS;
  const [step, setStep] = useState(0);

  const idx = step - 1;
  const row = idx >= 0 ? Math.floor(idx / COLS) : null;
  const col = idx >= 0 ? idx % COLS : null;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A loop's body can contain ANY code — including another loop. Think of a clock: the minute hand does a
        FULL circle for every single tick of the hour hand. Same here: the inner loop runs completely for each
        round of the outer loop. Step through and watch the order.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(total, x + 1))} disabled={step === total} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === total ? C.card : C.accentGlow,
          border: "none", color: step === total ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === total ? "default" : "pointer",
        }}>Step ▶ ({step} / {total})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, lineHeight: 2, margin: 0 }}>
            <span style={{ color: C.teal }}>for row in range({ROWS}):</span>{"\n"}
            {"    "}<span style={{ color: C.purple }}>for col in range({COLS}):</span>{"\n"}
            {"        "}<span style={{ color: C.text }}>print(row, col)</span>
          </pre>
          <div style={{ marginTop: 10, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, display: "flex", gap: 16, justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: C.teal, fontSize: 11, fontFamily: "monospace" }}>row</div>
              <div style={{ color: C.text, fontSize: 20, fontWeight: 700, fontFamily: "monospace" }}>{row === null ? "—" : row}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: C.purple, fontSize: 11, fontFamily: "monospace" }}>col</div>
              <div style={{ color: C.text, fontSize: 20, fontWeight: 700, fontFamily: "monospace" }}>{col === null ? "—" : col}</div>
            </div>
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 10 }}>EVERY (row, col) PAIR — IN ORDER</div>
          {Array.from({ length: ROWS }, (_, r) => (
            <div key={r} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              {Array.from({ length: COLS }, (_, c) => {
                const cellIdx = r * COLS + c;
                const visited = cellIdx < step;
                const current = cellIdx === step - 1;
                return (
                  <div key={c} style={{
                    flex: 1, borderRadius: 7, padding: "7px 0", textAlign: "center",
                    fontFamily: "monospace", fontSize: 11, fontWeight: current ? 700 : 400,
                    background: current ? C.accent + "33" : visited ? C.green + "15" : "transparent",
                    border: `1.5px solid ${current ? C.accent : visited ? C.green + "55" : C.border}`,
                    color: current ? C.accent : visited ? C.green : C.muted,
                    transition: "all 0.2s",
                  }}>{r},{c}</div>
                );
              })}
            </div>
          ))}
          <div style={{ color: C.muted, fontSize: 11, marginTop: 4, lineHeight: 1.6 }}>
            {step === 0 ? "Press Step to begin." :
              step === total ? `Done — the body ran ${ROWS} × ${COLS} = ${total} times.` :
                col === COLS - 1 ? "Inner loop finished this row — the OUTER loop ticks to the next row." :
                  "The inner loop moves along the row; row stays frozen."}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>The multiplication rule:</strong> outer runs {ROWS} times, inner
        runs {COLS} times per outer round → the innermost body runs {ROWS} × {COLS} = {total} times. Nested
        loops are how programs handle anything grid-shaped: tables, game boards, images (a photo is just a
        grid of pixels!).
      </div>
    </div>
  );
}

// ── Build It: Pattern Printer ────────────────────────────────────────────────
function PatternBuilder() {
  const [h, setH] = useState(5);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The classic lab exercise: print a star triangle. The outer loop picks the row; the inner loop prints
        that many stars. Drag to change the height.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>height = <strong style={{ color: C.accent }}>{h}</strong></label>
        <input type="range" min={2} max={9} value={h} onChange={(e) => setH(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.9, margin: 0 }}>{`height = ${h}
for row in range(1, height + 1):
    line = ""
    for star in range(row):
        line = line + "*"
    print(line)`}</pre>
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 14, color: C.yellow, lineHeight: 1.6 }}>
          {Array.from({ length: h }, (_, r) => <div key={r}>{"*".repeat(r + 1)}</div>)}
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 Row 1 gets 1 star, row 2 gets 2 ... because the INNER range depends on the OUTER variable —{" "}
        <code style={{ color: C.green }}>range(row)</code>. That link between the two loops is what shapes the
        triangle. (Python bonus: <code style={{ color: C.green }}>print("*" * row)</code> does the inner loop
        in one line — string repetition from Unit 4.4!)
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What does break do inside a loop?",
      options: ["Pauses the loop until the user presses a key", "Ends the whole loop immediately and jumps past it", "Skips just the current round", "Restarts the loop from the first value"],
      answer: 1,
      explain: "break is the emergency exit: the loop is over instantly, even if there were values left, and execution continues after the loop.",
    },
    {
      q: "What does continue do inside a loop?",
      options: ["Ends the whole loop", "Repeats the current round one more time", "Abandons the current round and jumps to the next one", "Does nothing — it's just documentation"],
      answer: 2,
      explain: "continue skips the REST of the body for this round only, then the loop carries on with the next value. The loop itself survives.",
    },
    {
      q: "How many times does print run?\nfor i in range(2):\n    for j in range(3):\n        print(i, j)",
      options: ["2 times", "3 times", "5 times", "6 times"],
      answer: 3,
      explain: "The inner loop runs 3 times for EACH of the outer loop's 2 rounds: 2 × 3 = 6. Multiply, don't add — that's the nested-loop rule.",
    },
    {
      q: "What does this print?\nfor i in range(1, 6):\n    if i == 3:\n        break\n    print(i)",
      options: ["1 2 3 4 5", "1 2 3", "1 2", "Nothing — it's an infinite loop"],
      answer: 2,
      explain: "Rounds 1 and 2 print normally. In round 3, the if fires BEFORE print, break kills the loop, and 3 is never printed — neither are 4 and 5.",
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
          {score === 4 ? "Perfect! You have full control over your loops now." :
            score >= 2 ? "Good work — replay the break and nested-loop steppers once more." :
              "Revisit break vs continue, then step through the nested grid again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 6.3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            while, for, break, continue, nested loops — the complete repetition toolkit.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 6.4 — Capstone: The Number-Guessing Game.</strong>{" "}
            Everything from Modules 5 and 6 combined into one real, playable program.
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
export default function Unit6_3({ student, onUnitComplete }) {
  const sections = [
    { id: "break", label: "break" },
    { id: "continue", label: "continue" },
    { id: "nested", label: "Nested Loops" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>break — The Emergency Exit</h3>
      <BreakDemo />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>continue — Skip This One, Keep Going</h3>
      <ContinueDemo />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Loops Inside Loops</h3>
      <NestedLoops />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Build It: The Star Triangle</h3>
      <PatternBuilder />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        4 questions to check your understanding of Unit 6.3.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 6 › UNIT 6.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>break, continue & Nested Loops</div>
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
