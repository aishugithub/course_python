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
        In Module 9 you caught Python's built-in errors — <code style={{ color: C.orange }}>ValueError</code>,{" "}
        <code style={{ color: C.orange }}>KeyError</code>. But some problems are yours, not Python's. A mark of 150
        isn't a syntax or type error — it's <em>your</em> rule being broken. You want an error that says exactly that.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.yellow}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.yellow, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>🙂 Built-in errors</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>Great for generic problems — bad conversion, missing key. But "mark out of range" isn't any of them.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>🎯 Your own error</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>InvalidMarkError names the problem precisely, and callers can catch just that.</div>
        </div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>A custom exception is just a class</strong> that inherits from{" "}
        <code style={{ color: C.purple }}>Exception</code>. This is Module 10's inheritance meeting Module 9's
        raise/except — the two ideas click together here.
      </div>
    </div>
  );
}

// ── Section 2: Defining one ──────────────────────────────────────────────────
function Defining() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Defining a custom exception is often a one-liner: a class that inherits from{" "}
        <code style={{ color: C.teal }}>Exception</code> and adds nothing new. That's enough to give it a name and a
        type you can raise and catch.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14, fontFamily: "monospace", fontSize: 12, lineHeight: 1.85, whiteSpace: "pre" }}>
        <span style={{ color: C.teal }}>class InvalidMarkError(Exception):</span>{"   "}<span style={{ color: C.muted }}># inherits everything from Exception</span>{"\n"}
        {"    "}pass{"                             "}<span style={{ color: C.muted }}># nothing extra needed</span>{"\n\n"}
        def set_mark(mark):{"\n"}
        {"    "}if mark &lt; 0 or mark &gt; 100:{"\n"}
        {"        "}<span style={{ color: C.orange }}>raise InvalidMarkError</span>({'"mark must be 0..100, got " + str(mark)'}){"\n"}
        {"    "}return mark
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: C.card, border: `1px solid ${C.teal}44`, borderRadius: 8, padding: 12 }}>
          <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>(Exception)</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>Inheriting from Exception makes it a real, raisable error — Python treats it like its own.</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.orange}44`, borderRadius: 8, padding: 12 }}>
          <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>raise</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>You throw it yourself when your rule is broken — the message explains what went wrong.</div>
        </div>
      </div>

      <div style={{ marginTop: 14, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>The name IS the documentation.</strong> A stack trace ending in{" "}
        <code style={{ color: C.teal }}>InvalidMarkError</code> tells you far more than a generic ValueError ever could.
      </div>
    </div>
  );
}

// ── Section 3: Try it — raise & catch ────────────────────────────────────────
function TryIt() {
  const [mark, setMark] = useState(85);
  const valid = mark >= 0 && mark <= 100;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The caller wraps <code style={{ color: C.accent }}>set_mark()</code> in a try/except that catches{" "}
        <em>only</em> your error type. Drag the mark to see it accept or reject.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14, fontFamily: "monospace", fontSize: 12, lineHeight: 1.8, whiteSpace: "pre" }}>{`try:
    m = set_mark(${mark})
    print("Accepted:", m)
except InvalidMarkError as e:
    print("Rejected:", e)`}</div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>mark = <strong style={{ color: valid ? C.green : C.red }}>{mark}</strong></label>
        <input type="range" min={-20} max={150} value={mark} onChange={(e) => setMark(Number(e.target.value))} style={{ width: "100%", accentColor: valid ? C.green : C.red }} />
      </div>

      <div style={{ background: (valid ? C.green : C.red) + "12", border: `1.5px solid ${(valid ? C.green : C.red)}55`, borderRadius: 10, padding: 16 }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 8 }}>CONSOLE OUTPUT</div>
        <div style={{ fontFamily: "monospace", fontSize: 13.5, color: valid ? C.green : C.red }}>
          {valid
            ? `Accepted: ${mark}`
            : `Rejected: mark must be 0..100, got ${mark}`}
        </div>
        <div style={{ color: C.muted, fontSize: 11.5, marginTop: 10, lineHeight: 1.6 }}>
          {valid
            ? "The mark passed the check, so set_mark returned it and the try block finished normally."
            : "set_mark raised InvalidMarkError; the except caught that specific type and reported it — no crash."}
        </div>
      </div>

      <div style={{ marginTop: 14, background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Catching by type is the payoff.</strong> Because it's its own class,
        you can catch <code style={{ color: C.purple }}>InvalidMarkError</code> separately from a{" "}
        <code>ValueError</code> or a <code>KeyError</code> and handle each differently.
      </div>
    </div>
  );
}

// ── Section 4: Why bother ────────────────────────────────────────────────────
function WhyBother() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Three concrete wins from defining your own exception types:
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {[
          ["🎯", "Precise catching", "except InvalidMarkError catches only your rule-breaks, not unrelated ValueErrors that might hide real bugs."],
          ["📖", "Self-documenting", "The error name explains the domain problem. Anyone reading the traceback instantly knows what went wrong."],
          ["🌳", "Grouping with a base", "Make a base like class MarksError(Exception), then InvalidMarkError(MarksError) and DuplicateStudentError(MarksError) — one except MarksError catches the whole family."],
        ].map(([icon, title, body], i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, display: "flex", gap: 12 }}>
            <div style={{ fontSize: 20 }}>{icon}</div>
            <div>
              <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{title}</div>
              <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 11, marginBottom: 8 }}>An exception hierarchy — a family tree of your errors:</div>
        <pre style={{ fontFamily: "monospace", fontSize: 11.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`class MarksError(Exception):
    pass

class InvalidMarkError(MarksError):
    pass

class DuplicateStudentError(MarksError):
    pass

# one except catches the whole family:
except MarksError as e:
    print("Marks problem:", e)`}</pre>
      </div>

      <div style={{ background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>This is the same inheritance tree idea from Unit 10.4</strong> — just
        applied to errors. Because Python's own exceptions are a hierarchy too, catching a parent catches all its
        children.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "How do you define a custom exception in Python?",
      options: [
        "def InvalidMarkError():",
        "class InvalidMarkError(Exception): pass",
        "raise InvalidMarkError",
        "import InvalidMarkError",
      ],
      answer: 1,
      explain: "A custom exception is a class that inherits from Exception. Often the body is just  pass  — inheriting is enough to make it raisable and catchable.",
    },
    {
      q: "Why prefer InvalidMarkError over a plain ValueError for an out-of-range mark?",
      options: [
        "It runs faster",
        "It names the exact domain problem and can be caught separately from unrelated ValueErrors",
        "ValueError doesn't exist",
        "Custom errors can't have messages",
      ],
      answer: 1,
      explain: "A specific type makes tracebacks self-documenting and lets you catch your rule-breaks precisely, without also swallowing unrelated ValueErrors that could be real bugs.",
    },
    {
      q: "What does  raise InvalidMarkError(\"...\")  do?",
      options: [
        "Defines the exception",
        "Throws the exception, interrupting normal flow so an except can handle it",
        "Catches the exception",
        "Prints a warning and continues",
      ],
      answer: 1,
      explain: "raise throws the exception (just like Python's built-ins). Execution jumps to the nearest matching except block, or crashes if none catches it.",
    },
    {
      q: "If InvalidMarkError inherits from MarksError, what does  except MarksError  catch?",
      options: [
        "Only MarksError, not its children",
        "MarksError and any exception that inherits from it, including InvalidMarkError",
        "Every exception in Python",
        "Nothing",
      ],
      answer: 1,
      explain: "Catching a parent type catches all its subclasses — the same inheritance rule from Unit 10.4, applied to errors. One except handles the whole family.",
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
          {score === 4 ? "You can design your own error types like a pro." :
            score >= 2 ? "Good — replay Try It to watch raise and except in action." :
              "Revisit Defining and Try It, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 10.6 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can raise and catch your own named error types — Module 9's exceptions plus Module 10's classes,
            working together.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 10.7 — Capstone: Marks Manager 3.0.</strong> Every OOP idea
            from this module comes together in one working app.
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
export default function Unit10_6({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "define", label: "Defining One" },
    { id: "try", label: "Raise & Catch" },
    { id: "why", label: "Why Bother" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>When Built-in Errors Aren't Enough</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Defining Your Own Exception</h3><Defining /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Raise It, Catch It</h3><TryIt /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Why Bother — and Hierarchies</h3><WhyBother /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on user-defined exceptions.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🚨</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 10 › UNIT 10.6</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>User-Defined Exceptions</div>
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
