import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// Shared decision logic used by every widget in this unit, so the whole
// capstone stays consistent: average marks + attendance % decide pass/fail,
// letter grade, scholarship eligibility, and honor roll.
function evaluate(average, attendance) {
  const pass = average >= 40;
  let grade;
  if (average >= 90) grade = "A";
  else if (average >= 75) grade = "B";
  else if (average >= 60) grade = "C";
  else if (average >= 40) grade = "D";
  else grade = "F";
  const scholarship = pass && average >= 85 && attendance >= 75;
  const honorRoll = scholarship && attendance === 100;
  return { pass, grade, scholarship, honorRoll };
}

// ── Intro ─────────────────────────────────────────────────────────────────────
function CapstoneIntro() {
  return (
    <div>
      <div style={{
        background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
        border: `1px solid ${C.accent}44`, borderRadius: 12, padding: "24px 20px",
        marginBottom: 20, textAlign: "center",
      }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>📋</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 8 }}>
          One Program, Many Decisions
        </div>
        <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
          Real programs rarely make just one decision. Let's build an Exam Result Analyzer that decides four
          things from the same two inputs — using everything from Module 5 at once.
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { icon: "✅", title: "Pass / Fail", desc: "A simple truthy comparison: average >= 40" },
          { icon: "🎯", title: "Letter Grade", desc: "An if / elif / else chain (Unit 5.2)" },
          { icon: "🎓", title: "Scholarship", desc: "A combined condition with and (Unit 5.3)" },
          { icon: "🏅", title: "Honor Roll", desc: "A nested condition that depends on Scholarship" },
        ].map((c, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 12px" }}>
            <div style={{ fontSize: 24 }}>{c.icon}</div>
            <div style={{ color: C.accent, fontWeight: 600, fontSize: 13, marginTop: 6 }}>{c.title}</div>
            <div style={{ color: C.muted, fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Build It ─────────────────────────────────────────────────────────────────
function CapstoneBuilder() {
  const [average, setAverage] = useState(88);
  const [attendance, setAttendance] = useState(92);
  const r = evaluate(average, attendance);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Drag both sliders and watch all four decisions update live from the same two numbers.
      </p>

      <div style={{ marginBottom: 10 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>average marks = <strong style={{ color: C.accent }}>{average}</strong></label>
        <input type="range" min={0} max={100} value={average} onChange={(e) => setAverage(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>attendance = <strong style={{ color: C.accent }}>{attendance}%</strong></label>
        <input type="range" min={0} max={100} value={attendance} onChange={(e) => setAttendance(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.85, marginBottom: 14 }}>
{`pass_result = average >= 40

if average >= 90:
    grade = "A"
elif average >= 75:
    grade = "B"
elif average >= 60:
    grade = "C"
elif average >= 40:
    grade = "D"
else:
    grade = "F"

scholarship = pass_result and average >= 85 and attendance >= 75

if scholarship:
    honor_roll = attendance == 100
else:
    honor_roll = False`}
      </pre>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { label: "Pass / Fail", value: r.pass ? "Pass" : "Fail", ok: r.pass },
          { label: "Grade", value: r.grade, ok: r.grade !== "F" },
          { label: "Scholarship", value: r.scholarship ? "Eligible" : "Not eligible", ok: r.scholarship },
          { label: "Honor Roll", value: r.honorRoll ? "Yes" : "No", ok: r.honorRoll },
        ].map((row, i) => (
          <div key={i} style={{ background: (row.ok ? C.green : C.red) + "18", border: `1px solid ${(row.ok ? C.green : C.red)}44`, borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.muted }}>{row.label}</div>
            <div style={{ color: row.ok ? C.green : C.red, fontWeight: 700, fontFamily: "monospace" }}>{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Trace The Logic ───────────────────────────────────────────────────────────
function LogicTrace() {
  const example = { average: 92, attendance: 100 };
  const r = evaluate(example.average, example.attendance);

  const steps = [
    { title: "Step 1 — Pass or Fail?", code: "pass_result = average >= 40", result: `pass_result = ${r.pass}`, note: "The simplest check runs first: is 92 at least 40? Yes." },
    { title: "Step 2 — Which Grade?", code: "if average >= 90: grade = \"A\"\n...", result: `grade = "${r.grade}"`, note: "The elif chain runs top to bottom. 92 >= 90 is True, so grade is set to \"A\" immediately — the rest of the chain is skipped." },
    { title: "Step 3 — Scholarship?", code: "scholarship = pass_result and average >= 85 and attendance >= 75", result: `scholarship = ${r.scholarship}`, note: "All three conditions must be True together: passed (yes), average >= 85 (92, yes), attendance >= 75 (100, yes)." },
    { title: "Step 4 — Honor Roll? (nested)", code: "if scholarship:\n    honor_roll = attendance == 100", result: `honor_roll = ${r.honorRoll}`, note: "This check is NESTED inside the scholarship check — it only even runs because scholarship was already True. Then it additionally requires perfect attendance." },
  ];

  const [step, setStep] = useState(0);
  const s = steps[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Using a fixed example — average = {example.average}, attendance = {example.attendance}% — step through
        exactly how the program reaches its four decisions, one at a time.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.accent, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{s.title}</div>
        <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, background: C.bg, borderRadius: 6, padding: "10px 12px", margin: "0 0 10px 0", whiteSpace: "pre-wrap" }}>{s.code}</pre>
        <div style={{ fontFamily: "monospace", fontSize: 14, color: C.green, marginBottom: 10 }}>&gt; {s.result}</div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{s.note}</div>
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
    </div>
  );
}

// ── Challenge: Match the Profile ──────────────────────────────────────────────
function MatchProfile() {
  const [average, setAverage] = useState(50);
  const [attendance, setAttendance] = useState(50);
  const r = evaluate(average, attendance);

  // Target: Grade A, but NOT on the Honor Roll — tests whether the student
  // understands that Honor Roll needs scholarship AND perfect attendance.
  const targetMet = r.grade === "A" && !r.honorRoll;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        <strong style={{ color: C.accent }}>Your challenge:</strong> adjust the sliders to create a student who
        earns <strong style={{ color: C.green }}>Grade A</strong> but does <strong style={{ color: C.red }}>NOT</strong> make
        the Honor Roll. Think carefully about which condition you need to break.
      </p>

      <div style={{ marginBottom: 10 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>average marks = <strong style={{ color: C.accent }}>{average}</strong></label>
        <input type="range" min={0} max={100} value={average} onChange={(e) => setAverage(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>attendance = <strong style={{ color: C.accent }}>{attendance}%</strong></label>
        <input type="range" min={0} max={100} value={attendance} onChange={(e) => setAttendance(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        <div style={{ background: (r.grade === "A" ? C.green : C.red) + "18", border: `1px solid ${(r.grade === "A" ? C.green : C.red)}44`, borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.muted }}>Grade</div>
          <div style={{ color: r.grade === "A" ? C.green : C.red, fontWeight: 700, fontFamily: "monospace" }}>{r.grade}</div>
        </div>
        <div style={{ background: (!r.honorRoll ? C.green : C.red) + "18", border: `1px solid ${(!r.honorRoll ? C.green : C.red)}44`, borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.muted }}>Honor Roll</div>
          <div style={{ color: !r.honorRoll ? C.green : C.red, fontWeight: 700, fontFamily: "monospace" }}>{r.honorRoll ? "Yes" : "No"}</div>
        </div>
      </div>

      <div style={{
        textAlign: "center", padding: "14px 20px", borderRadius: 10,
        background: (targetMet ? C.green : C.card) + (targetMet ? "22" : ""),
        border: `1.5px solid ${targetMet ? C.green : C.border}`,
        color: targetMet ? C.green : C.muted, fontWeight: 600,
      }}>
        {targetMet ? "🎉 Challenge solved! Grade A, but Honor Roll requires perfect attendance too." : "Keep adjusting…"}
      </div>

      {targetMet && (
        <div style={{ marginTop: 14, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
          💡 You just proved you understand nested conditions: Honor Roll isn't just "Grade A" — it's{" "}
          <code style={{ color: C.purple }}>scholarship and attendance == 100</code>, and scholarship itself needs
          average &gt;= 85. Dropping attendance below 100 (while keeping average high) breaks only the innermost check.
        </div>
      )}
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "In the Exam Result Analyzer, why is honor_roll checked INSIDE the scholarship check rather than as its own independent if?",
      options: [
        "It doesn't need to be — the placement is arbitrary",
        "Because Honor Roll should only even be considered once Scholarship is already True — it's a stricter sub-case",
        "Because Python requires all checks to be nested",
        "Because nesting makes the code run faster",
      ],
      answer: 1,
      explain: "Nesting expresses a real relationship: Honor Roll only makes sense as an extra-strict version of Scholarship, so checking it inside that block is the correct logic, not just a style choice.",
    },
    {
      q: "A student has average = 95 and attendance = 80. What is their Honor Roll status?",
      options: ["Yes, honor roll", "No — honor roll requires attendance == 100 exactly", "Depends on their grade", "Error, undefined"],
      answer: 1,
      explain: "Even though 95 easily qualifies for Scholarship (>=85 average, >=75 attendance), Honor Roll additionally requires attendance to be exactly 100 — 80% attendance doesn't meet that.",
    },
    {
      q: "If average = 30, what will grade and pass_result be?",
      options: ['grade = "F", pass_result = True', 'grade = "F", pass_result = False', 'grade = "D", pass_result = False', 'grade = "A", pass_result = False'],
      answer: 1,
      explain: "30 is below every elif threshold, so it falls to the final else (grade = \"F\"), and 30 >= 40 is False, so pass_result is False too.",
    },
    {
      q: "What's the benefit of building one program that makes four related decisions from the same two inputs, instead of four separate unrelated programs?",
      options: [
        "There's no benefit — it's just for practice",
        "It mirrors how real decisions actually work: one situation, several related outcomes that build on each other",
        "It makes the program run in less memory",
        "Python requires all decisions to be in one program",
      ],
      answer: 1,
      explain: "Real-world logic is rarely isolated — a single set of facts (marks, attendance) naturally implies several connected outcomes, which is exactly what if/elif/else, combined conditions, and nesting are designed to express together.",
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
          {final === 4 ? "Outstanding! You've mastered decision-making in Python." :
            final >= 2 ? "Good work — revisit the Trace the Logic section once more." :
              "Go back through the Build It and Trace sections, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.purple}22, ${C.green}22)`,
          border: `1px solid ${C.green}`,
        }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Module 5 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now write programs that make decisions: booleans, truthy/falsy values, if / elif / else,
            combined and nested conditions, and short-circuit evaluation.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Module 6 — Repetition (Loops).</strong> You'll learn to
            repeat actions with while and for, combining loops with the if statements you just mastered.
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
export default function Unit5_4({ student, onUnitComplete }) {
  const sections = [
    { id: "intro", label: "The Challenge" },
    { id: "build", label: "Build It" },
    { id: "trace", label: "Trace the Logic" },
    { id: "challenge", label: "Match the Profile" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div>
      <CapstoneIntro />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Build It: Exam Result Analyzer</h3>
      <CapstoneBuilder />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Trace the Logic</h3>
      <LogicTrace />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Challenge: Match the Profile</h3>
      <MatchProfile />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        4 questions to check your understanding of Unit 5.4 — and Module 5 as a whole.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 5 › UNIT 5.4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Capstone: Decision Maker</div>
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
