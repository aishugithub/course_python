import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Need For Branching ───────────────────────────────────────────────────────
function NeedForBranching() {
  const [num, setNum] = useState(7);
  const isEven = num % 2 === 0;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Every program you've written so far runs the exact same lines, in the exact same order, no matter what
        the data is. That's fine for simple maths — but what about "is this number even or odd?" Drag the
        slider and compare a program WITHOUT branching to one WITH it.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>number = <strong style={{ color: C.accent }}>{num}</strong></label>
        <input type="range" min={-10} max={10} value={num} onChange={(e) => setNum(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ WITHOUT BRANCHING</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: "0 0 10px 0" }}>print("Even")</pre>
          <div style={{ fontFamily: "monospace", fontSize: 15, color: C.muted }}>&gt; Even</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 10, lineHeight: 1.6 }}>
            This line always prints "Even" — it has no way to look at the number and respond differently.
            {!isEven && <span style={{ color: C.red }}> Wrong right now — {num} is odd!</span>}
          </div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ WITH BRANCHING</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: "0 0 10px 0" }}>{`if number % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")`}</pre>
          <div style={{ fontFamily: "monospace", fontSize: 15, color: C.green }}>&gt; {isEven ? "Even" : "Odd"}</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 10, lineHeight: 1.6 }}>
            This version checks the number FIRST (using % from Unit 4.4!) and picks the correct branch every time.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.accent }}>This is WHY branching exists.</strong> A program needs to be able
        to CHOOSE which lines to run, based on the data it has right now. That's exactly what{" "}
        <code style={{ color: C.accent }}>if</code> gives you.
      </div>
    </div>
  );
}

// ── If Statements & Indentation ──────────────────────────────────────────────
function IndentationDemo() {
  const [broken, setBroken] = useState(false);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Python needs to know exactly which lines belong "inside" an <code style={{ color: C.accent }}>if</code>.
        Instead of curly braces like C, Python uses a colon <code style={{ color: C.accent }}>:</code> plus{" "}
        <strong style={{ color: C.accent }}>indentation</strong> (usually 4 spaces) to mark a block.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>⚙️ C</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0 }}>{`if (age >= 18) {\n    printf("Adult");\n}`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>Braces { } mark where the block starts and ends. Indentation is just for readability — C doesn't care.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🐍 Python</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0 }}>{`if age >= 18:\n    print("Adult")`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>The colon : starts the block; indentation IS the syntax. No braces at all.</div>
        </div>
      </div>

      <button onClick={() => setBroken((v) => !v)} style={{
        width: "100%", padding: "10px", borderRadius: 8,
        background: broken ? C.red + "22" : C.card,
        border: `1.5px solid ${broken ? C.red : C.border}`,
        color: broken ? C.red : C.text, fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 14,
      }}>
        {broken ? "◀ Fix the indentation" : "▶ What if I forget to indent?"}
      </button>

      <pre style={{
        background: C.card, border: `1.5px solid ${broken ? C.red : C.border}`, borderRadius: 8,
        padding: "14px 16px", fontFamily: "monospace", fontSize: 13, color: broken ? C.red : C.text,
      }}>{broken ? `if age >= 18:\nprint("Adult")` : `if age >= 18:\n    print("Adult")`}</pre>

      {broken && (
        <div style={{ marginTop: 10, background: C.red + "18", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
          ⚠️ <code style={{ color: C.red }}>IndentationError: expected an indented block</code> — Python has no
          other way to know that print(...) belongs to the if, so an un-indented line right after a colon is
          simply broken code.
        </div>
      )}
    </div>
  );
}

// ── If / Elif / Else Flow ────────────────────────────────────────────────────
function GradeFlow() {
  const [score, setScore] = useState(75);

  const branches = [
    { test: (s) => s >= 90, label: 'score >= 90', grade: "A", color: C.green },
    { test: (s) => s >= 75, label: 'score >= 75', grade: "B", color: C.accent },
    { test: (s) => s >= 60, label: 'score >= 60', grade: "C", color: C.yellow },
    { test: (s) => true, label: "else", grade: "F", color: C.red },
  ];
  const activeIdx = branches.findIndex((b) => b.test(score));

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        <code style={{ color: C.accent }}>elif</code> lets you check MULTIPLE conditions in order. Python tests
        each one top to bottom and runs the FIRST one that's True — the rest are skipped entirely. Drag the
        slider to see which branch "lights up."
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>score = <strong style={{ color: C.accent }}>{score}</strong></label>
        <input type="range" min={0} max={100} value={score} onChange={(e) => setScore(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 13 }}>
        {branches.map((b, i) => (
          <div key={i} style={{
            padding: "8px 10px", borderRadius: 6, marginBottom: 4,
            background: activeIdx === i ? b.color + "22" : "transparent",
            border: `1.5px solid ${activeIdx === i ? b.color : "transparent"}`,
            color: activeIdx === i ? b.color : C.muted,
            transition: "all 0.3s",
          }}>
            {i === 0 ? "if " : i === branches.length - 1 ? "else:" : "elif "}{i < branches.length - 1 ? `${b.label}:` : ""}
            <br />
            <span style={{ marginLeft: 20 }}>print("Grade: {b.grade}")</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, background: branches[activeIdx].color + "18", border: `1.5px solid ${branches[activeIdx].color}55`, borderRadius: 10, padding: 16, textAlign: "center", fontFamily: "monospace", fontSize: 16, color: branches[activeIdx].color, fontWeight: 700 }}>
        &gt; Grade: {branches[activeIdx].grade}
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>Key idea:</strong> order matters! If you wrote{" "}
        <code style={{ color: C.purple }}>score &gt;= 60</code> BEFORE <code style={{ color: C.purple }}>score &gt;= 90</code>,
        a 95 would incorrectly stop at the first True condition and get a C instead of an A.
      </div>
    </div>
  );
}

// ── Build It: Ticket Price ───────────────────────────────────────────────────
function TicketPriceBuilder() {
  const [age, setAge] = useState(25);

  let category, price;
  if (age < 5) { category = "Infant"; price = 0; }
  else if (age < 18) { category = "Child"; price = 100; }
  else if (age < 60) { category = "Adult"; price = 250; }
  else { category = "Senior Citizen"; price = 120; }

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Let's build a real program: a cinema ticket price calculator with four age categories. Drag the slider
        and watch the code decide the price live.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>age = <strong style={{ color: C.accent }}>{age}</strong></label>
        <input type="range" min={0} max={90} value={age} onChange={(e) => setAge(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.9 }}>{`age = int(input("Age: "))

if age < 5:
    category, price = "Infant", 0
elif age < 18:
    category, price = "Child", 100
elif age < 60:
    category, price = "Adult", 250
else:
    category, price = "Senior Citizen", 120

print(category, price)`}</pre>

      <div style={{ marginTop: 14, background: C.green + "18", border: `1.5px solid ${C.green}55`, borderRadius: 10, padding: 16, textAlign: "center" }}>
        <div style={{ color: C.muted, fontSize: 11 }}>Category</div>
        <div style={{ color: C.green, fontWeight: 700, fontSize: 18, fontFamily: "monospace", marginBottom: 8 }}>{category}</div>
        <div style={{ color: C.muted, fontSize: 11 }}>Ticket Price</div>
        <div style={{ color: C.green, fontWeight: 700, fontSize: 18, fontFamily: "monospace" }}>₹{price}</div>
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What does Python use instead of curly braces { } to mark a block of code?",
      options: ["Semicolons", "A colon and consistent indentation", "Round brackets", "Nothing — blocks aren't marked at all"],
      answer: 1,
      explain: "Python uses a colon after the condition, then indents every line that belongs inside the block. Indentation isn't just style — it's the actual syntax.",
    },
    {
      q: "In an if / elif / else chain, how many branches actually run?",
      options: ["All branches whose condition is True", "Only the FIRST branch whose condition is True — the rest are skipped", "Only the last one, else", "It depends on the order of the branches"],
      answer: 1,
      explain: "Python checks each condition top to bottom and stops at the first True one — later elif/else branches are never even checked once one matches.",
    },
    {
      q: "Why does branch ORDER matter in an elif chain checking score >= 90, then >= 75, then >= 60?",
      options: [
        "It doesn't matter at all",
        "Because only the first matching condition runs — checking the loosest condition first would wrongly catch high scores too",
        "Because Python requires conditions in alphabetical order",
        "Because elif only works with exactly 3 branches",
      ],
      answer: 1,
      explain: "If >= 60 were checked first, a score of 95 would match it immediately and stop — never reaching the >= 90 check for an A. Always check the most specific/strict condition first.",
    },
    {
      q: 'What error does this cause?\nif age >= 18:\nprint("Adult")',
      options: ["No error — this is valid", "IndentationError, because print() isn't indented under the if", "SyntaxError, because of the colon", "NameError, because age is undefined"],
      answer: 1,
      explain: "Without indenting print(\"Adult\"), Python has no way to know it belongs inside the if block — this raises an IndentationError.",
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
          {final === 4 ? "Perfect! You understand branching and Python's indentation rule cold." :
            final >= 2 ? "Good work — revisit the Grade Flow section once more." :
              "Go back through the Indentation and Grade Flow sections, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 5.2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now write real branching logic with if / elif / else.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 5.3 — Nested Conditions & Boolean Logic.</strong>{" "}
            We'll combine conditions with and / or / not, and put ifs inside ifs.
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
export default function Unit5_2({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Why Branch?" },
    { id: "indent", label: "if & Indentation" },
    { id: "elif", label: "if / elif / else" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Why Programs Need to Branch</h3>
      <NeedForBranching />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>if Statements & Python's Indentation Rule</h3>
      <IndentationDemo />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>if / elif / else — Multiple Paths</h3>
      <GradeFlow />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Build It: Ticket Price Calculator</h3>
      <TicketPriceBuilder />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        4 questions to check your understanding of Unit 5.2.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 5 › UNIT 5.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>if / elif / else</div>
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
