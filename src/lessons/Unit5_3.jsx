import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Combining Conditions ──────────────────────────────────────────────────────
function LoanEligibility() {
  const [age, setAge] = useState(22);
  const [income, setIncome] = useState(15000);

  const ageOk = age >= 18;
  const incomeOk = income >= 20000;
  const eligible = ageOk && incomeOk;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Real decisions usually depend on MORE than one condition. A bank might approve a loan only if the
        applicant is an adult AND earns enough. Adjust the sliders and watch each condition evaluate
        separately before combining.
      </p>

      <div style={{ marginBottom: 10 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>age = <strong style={{ color: C.accent }}>{age}</strong></label>
        <input type="range" min={0} max={80} value={age} onChange={(e) => setAge(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>income = ₹<strong style={{ color: C.accent }}>{income}</strong>/month</label>
        <input type="range" min={0} max={50000} step={1000} value={income} onChange={(e) => setIncome(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 13, color: C.text, marginBottom: 14 }}>
        {`if age >= 18 and income >= 20000:\n    print("Eligible")\nelse:\n    print("Not eligible")`}
      </pre>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1, background: (ageOk ? C.green : C.red) + "18", border: `1px solid ${(ageOk ? C.green : C.red)}44`, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.muted }}>age &gt;= 18</div>
          <div style={{ color: ageOk ? C.green : C.red, fontWeight: 700, fontFamily: "monospace" }}>{String(ageOk)}</div>
        </div>
        <div style={{ alignSelf: "center", color: C.muted, fontFamily: "monospace" }}>and</div>
        <div style={{ flex: 1, background: (incomeOk ? C.green : C.red) + "18", border: `1px solid ${(incomeOk ? C.green : C.red)}44`, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.muted }}>income &gt;= 20000</div>
          <div style={{ color: incomeOk ? C.green : C.red, fontWeight: 700, fontFamily: "monospace" }}>{String(incomeOk)}</div>
        </div>
      </div>

      <div style={{ background: (eligible ? C.green : C.red) + "18", border: `1.5px solid ${(eligible ? C.green : C.red)}55`, borderRadius: 10, padding: 14, textAlign: "center", fontFamily: "monospace", fontSize: 15, fontWeight: 700, color: eligible ? C.green : C.red }}>
        &gt; {eligible ? "Eligible" : "Not eligible"}
      </div>

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.accent }}>Key idea:</strong> <code style={{ color: C.accent }}>and</code>{" "}
        needs BOTH sides True; if either check fails, the whole condition is False, no matter how good the other one is.
      </div>
    </div>
  );
}

// ── Nested If ────────────────────────────────────────────────────────────────
function NestedWeather() {
  const [raining, setRaining] = useState(true);
  const [temp, setTemp] = useState(8);

  let message;
  if (raining) {
    if (temp < 10) message = "Heavy coat + umbrella";
    else message = "Just an umbrella";
  } else {
    if (temp < 10) message = "Heavy coat, no umbrella needed";
    else message = "Light clothing, enjoy!";
  }

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        An <code style={{ color: C.accent }}>if</code> can contain ANOTHER <code style={{ color: C.accent }}>if</code> inside it —
        this is called nesting. Each level of nesting gets its own extra indentation.
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <button onClick={() => setRaining((v) => !v)} style={{
          flex: 1, padding: 12, borderRadius: 8, cursor: "pointer",
          background: raining ? C.teal + "22" : C.card, border: `1.5px solid ${raining ? C.teal : C.border}`,
          color: raining ? C.teal : C.text, fontWeight: 600,
        }}>{raining ? "🌧️ Raining" : "☀️ Not Raining"}</button>
        <div style={{ flex: 1 }}>
          <label style={{ color: C.muted, fontSize: 11 }}>temp = {temp}°C</label>
          <input type="range" min={-5} max={35} value={temp} onChange={(e) => setTemp(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
        </div>
      </div>

      <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.8 }}>
{`if raining:
    if temp < 10:
        print("Heavy coat + umbrella")
    else:
        print("Just an umbrella")
else:
    if temp < 10:
        print("Heavy coat, no umbrella needed")
    else:
        print("Light clothing, enjoy!")`}
      </pre>

      <div style={{ marginTop: 14, background: C.green + "18", border: `1.5px solid ${C.green}55`, borderRadius: 10, padding: 14, textAlign: "center", fontFamily: "monospace", fontSize: 14, color: C.green }}>
        &gt; {message}
      </div>

      <div style={{ marginTop: 16, background: C.yellow + "18", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.yellow }}>Key idea:</strong> the inner if only even gets CHECKED if the
        outer if's condition was True — nesting means "this decision only matters in this specific situation."
      </div>
    </div>
  );
}

// ── Short-Circuit Evaluation ──────────────────────────────────────────────────
function ShortCircuitDemo() {
  const [x, setX] = useState(5);
  const willDivide = x !== 0;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Python evaluates <code style={{ color: C.accent }}>and</code> / <code style={{ color: C.accent }}>or</code> left
        to right, and STOPS as soon as the final answer is already certain — this is called{" "}
        <strong style={{ color: C.accent }}>short-circuit evaluation</strong>, and it can protect your program from crashing.
      </p>

      <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 13, color: C.text, marginBottom: 14 }}>
        {`if x != 0 and 10 / x > 1:\n    print("big enough")`}
      </pre>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>x = <strong style={{ color: C.accent }}>{x}</strong></label>
        <input type="range" min={-5} max={5} value={x} onChange={(e) => setX(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{
          background: (willDivide ? C.green : C.red) + "18", border: `1.5px solid ${(willDivide ? C.green : C.red)}55`,
          borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 13, color: willDivide ? C.green : C.red,
        }}>
          Step 1: x != 0 &nbsp;→&nbsp; {String(willDivide)}
        </div>
        <div style={{
          background: (willDivide ? C.accent : C.border) + "18", border: `1.5px solid ${(willDivide ? C.accent : C.border)}55`,
          borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 13, color: willDivide ? C.accent : C.muted,
        }}>
          Step 2: 10 / x &gt; 1 &nbsp;→&nbsp; {willDivide ? String(10 / x > 1) : "NEVER EVALUATED — Python already knows the answer is False"}
        </div>
      </div>

      <div style={{ marginTop: 16, background: (willDivide ? C.accent : C.green) + "18", border: `1px solid ${(willDivide ? C.accent : C.green)}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        {willDivide
          ? <>Since x isn't 0, Python goes on to check the second condition normally.</>
          : <>🛡️ <strong style={{ color: C.green }}>This is the safety benefit:</strong> because x == 0 already makes the whole{" "}
              <code style={{ color: C.green }}>and</code> False, Python never even TRIES to compute{" "}
              <code style={{ color: C.green }}>10 / x</code> — avoiding a ZeroDivisionError entirely. If the order
              were reversed, this program would crash when x is 0.</>}
      </div>
    </div>
  );
}

// ── Nested vs Combined ────────────────────────────────────────────────────────
function NestedVsCombined() {
  const [combined, setCombined] = useState(false);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The loan check from earlier could be written as two nested ifs, OR as one combined condition using{" "}
        <code style={{ color: C.accent }}>and</code>. Both do exactly the same thing — but one is easier to read.
      </p>

      <button onClick={() => setCombined((v) => !v)} style={{
        width: "100%", padding: "10px", borderRadius: 8,
        background: combined ? C.purple + "22" : C.card,
        border: `1.5px solid ${combined ? C.purple : C.border}`,
        color: combined ? C.purple : C.text, fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 14,
      }}>
        {combined ? "◀ Show nested version" : "▶ Show combined version"}
      </button>

      <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 13, color: C.text, lineHeight: 1.8 }}>
{combined
  ? `if age >= 18 and income >= 20000:
    print("Eligible")
else:
    print("Not eligible")`
  : `if age >= 18:
    if income >= 20000:
        print("Eligible")
    else:
        print("Not eligible")
else:
    print("Not eligible")`}
      </pre>

      <div style={{ marginTop: 14, background: C.yellow + "18", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        {combined
          ? <>💡 The combined version is shorter and avoids repeating <code style={{ color: C.yellow }}>print("Not eligible")</code> twice — generally preferred when both conditions must ALWAYS be checked together.</>
          : <>💡 The nested version works too, but notice "Not eligible" had to be written twice — once for each way of failing. Nesting is more useful when the inner check should ONLY happen in certain outer situations (like the weather example).</>}
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "In age >= 18 and income >= 20000, what happens if age is 16?",
      options: [
        "Python still checks income before deciding",
        "The whole expression is immediately False — income is never even checked",
        "It raises an error",
        "It depends on income's value",
      ],
      answer: 1,
      explain: "and short-circuits: once the left side is False, the overall result MUST be False, so Python skips checking the right side entirely.",
    },
    {
      q: "What is a nested if?",
      options: [
        "An if statement written entirely on one line",
        "An if statement placed inside the block of another if (or else)",
        "Two if statements joined with and",
        "An if statement with no else",
      ],
      answer: 1,
      explain: "Nesting means putting one if/else structure inside another — the inner check only happens when the outer condition already led us into that branch.",
    },
    {
      q: "Why does short-circuit evaluation make x != 0 and 10 / x > 1 safe even when x is 0?",
      options: [
        "Python automatically fixes division by zero",
        "Because x != 0 is False, Python never evaluates 10 / x at all, avoiding the crash",
        "Because 10 / 0 equals 0 in Python",
        "It isn't actually safe — this code still crashes",
      ],
      answer: 1,
      explain: "and stops evaluating as soon as it finds a False — so putting the safety check (x != 0) FIRST prevents the risky operation from ever running when it would fail.",
    },
    {
      q: "When is a combined condition (using and) generally preferred over nested ifs?",
      options: [
        "Never — nested ifs are always better",
        "When both conditions must always be checked together and the same outcome applies either way",
        "Only when there are more than 3 conditions",
        "Only inside functions",
      ],
      answer: 1,
      explain: "Combining with and/or reads more cleanly when the logic is 'both must hold' — nesting is better reserved for cases where the inner check only matters in a specific outer situation.",
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
        <div style={{ fontSize: 52 }}>{final >= 3 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {final} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {final === 4 ? "Perfect! Nested logic and short-circuiting are second nature to you now." :
            final >= 2 ? "Good work — revisit the Short-Circuit section once more." :
              "Go back through the Nested If and Short-Circuit sections, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 5.3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now combine conditions with and/or, nest ifs inside each other, and understand
            short-circuit evaluation.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 5.4 — Capstone: Decision Maker.</strong> We'll bring
            all of Module 5 together into one real project.
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

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Unit5_3({ student, onUnitComplete }) {
  const sections = [
    { id: "combine", label: "Combining Conditions" },
    { id: "nested", label: "Nested if" },
    { id: "shortcircuit", label: "Short-Circuit" },
    { id: "compare", label: "Nested vs Combined" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Combining Conditions with and / or</h3>
      <LoanEligibility />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Nested if Statements</h3>
      <NestedWeather />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Short-Circuit Evaluation</h3>
      <ShortCircuitDemo />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Nested vs Combined — Which to Use?</h3>
      <NestedVsCombined />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        4 questions to check your understanding of Unit 5.3.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 5 › UNIT 5.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Nested Conditions & Boolean Logic</div>
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
