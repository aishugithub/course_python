import { useState } from "react";

const C = {
  bg: "#0D1117",
  surface: "#161B22",
  card: "#1C2333",
  accent: "#58A6FF",
  accentGlow: "#1F6FEB",
  green: "#3FB950",
  yellow: "#D29922",
  purple: "#BC8CFF",
  red: "#F85149",
  orange: "#F0883E",
  text: "#E6EDF3",
  muted: "#8B949E",
  border: "#30363D",
};

// ── Everyday Algorithm Builder ─────────────────────────────────────────────
function TeaCupAlgo() {
  const steps = [
    { id: 1, icon: "🫖", text: "Boil water", detail: "Heat water to 100°C" },
    { id: 2, icon: "🍵", text: "Place tea bag in cup", detail: "One bag per cup" },
    { id: 3, icon: "💧", text: "Pour hot water into cup", detail: "Fill 3/4 of the cup" },
    { id: 4, icon: "⏱️", text: "Wait 3 minutes", detail: "Let it steep" },
    { id: 5, icon: "🥄", text: "Remove tea bag", detail: "Squeeze gently" },
    { id: 6, icon: "🍬", text: "Add sugar if needed", detail: "Optional step" },
    { id: 7, icon: "☕", text: "Tea is ready!", detail: "Enjoy!" },
  ];

  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [done, setDone] = useState(false);

  const run = () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setCurrent(-1);
    steps.forEach((_, i) => {
      setTimeout(() => {
        setCurrent(i);
        if (i === steps.length - 1) {
          setTimeout(() => { setRunning(false); setDone(true); }, 700);
        }
      }, i * 600);
    });
  };

  const reset = () => { setCurrent(-1); setDone(false); setRunning(false); };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Before you can program anything, you need to think like a computer — breaking every task into
        <strong style={{ color: C.accent }}> exact, ordered steps</strong>. This is called an <strong style={{ color: C.purple }}>algorithm</strong>.
      </p>
      <div style={{ background: C.card, borderRadius: 10, padding: 16, border: `1px solid ${C.border}`, marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 11, letterSpacing: 2, marginBottom: 12 }}>ALGORITHM: How to make tea ☕</div>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "8px 10px",
            borderRadius: 7, marginBottom: 4,
            background: current === i ? C.accentGlow + "33" : current > i ? C.green + "18" : "transparent",
            border: current === i ? `1px solid ${C.accent}55` : current > i ? `1px solid ${C.green}44` : "1px solid transparent",
            transition: "all 0.3s",
          }}>
            <span style={{ fontSize: 20, minWidth: 28 }}>{current > i ? "✅" : s.icon}</span>
            <span style={{ flex: 1, fontSize: 13, color: current >= i ? C.text : C.muted }}>{s.text}</span>
            {current === i && <span style={{ fontSize: 11, color: C.accent }}>{s.detail}</span>}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={run} disabled={running} style={{
          flex: 1, padding: "10px", borderRadius: 8, border: "none",
          background: running ? C.border : C.accentGlow,
          color: "#fff", cursor: running ? "not-allowed" : "pointer", fontWeight: 600, fontSize: 13,
        }}>{running ? "Running algorithm…" : "▶ Run Algorithm"}</button>
        {done && <button onClick={reset} style={{
          padding: "10px 16px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.muted, cursor: "pointer", fontSize: 13,
        }}>↺ Reset</button>}
      </div>
      {done && <div style={{
        marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 13,
        background: C.green + "18", border: `1px solid ${C.green}44`, color: C.green,
      }}>✓ Algorithm complete! Every step ran in exact order — that's how a computer thinks.</div>}
    </div>
  );
}

// ── What Makes a Good Algorithm ────────────────────────────────────────────
function AlgoProperties() {
  const [active, setActive] = useState(null);
  const props = [
    {
      icon: "📋", name: "Precise", color: C.accent,
      good: "Add exactly 200ml of water", bad: "Add some water",
      why: "Computers cannot guess. Every instruction must be unambiguous.",
    },
    {
      icon: "🔢", name: "Ordered", color: C.purple,
      good: "Boil water → pour → steep", bad: "Steep → pour → boil water",
      why: "Sequence matters. Wrong order = wrong result.",
    },
    {
      icon: "🏁", name: "Has an End", color: C.green,
      good: "Repeat until the bag is removed", bad: "Keep waiting forever",
      why: "An algorithm must stop. An infinite loop is a bug.",
    },
    {
      icon: "📥", name: "Has Input/Output", color: C.yellow,
      good: "Input: cold water → Output: hot tea", bad: "Just... doing stuff",
      why: "Every useful algorithm takes something in and produces something out.",
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Not just any list of steps is an algorithm. A proper algorithm has four key properties.
        <strong style={{ color: C.accent }}> Tap each property</strong> to see good vs bad examples.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        {props.map((p, i) => (
          <div key={i} onClick={() => setActive(active === i ? null : i)} style={{
            background: active === i ? p.color + "22" : C.card,
            border: `1.5px solid ${active === i ? p.color : C.border}`,
            borderRadius: 10, padding: "14px 12px", cursor: "pointer",
            transition: "all 0.25s",
          }}>
            <div style={{ fontSize: 26 }}>{p.icon}</div>
            <div style={{ color: p.color, fontWeight: 700, fontSize: 13, marginTop: 6 }}>{p.name}</div>
            {active === i && (
              <div style={{ marginTop: 10 }}>
                <div style={{ background: C.green + "22", borderRadius: 6, padding: "6px 8px", fontSize: 11, color: C.green, marginBottom: 5 }}>
                  ✓ {p.good}
                </div>
                <div style={{ background: C.red + "22", borderRadius: 6, padding: "6px 8px", fontSize: 11, color: C.red, marginBottom: 5 }}>
                  ✗ {p.bad}
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{p.why}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Flowchart Builder ──────────────────────────────────────────────────────
function Flowchart() {
  const [show, setShow] = useState(false);

  const nodes = [
    { type: "oval", text: "START", color: C.green },
    { type: "rect", text: "Is the water boiled?", color: C.accent },
    { type: "diamond", text: "YES / NO", color: C.yellow, isDecision: true },
    { type: "rect", text: "Boil the water", color: C.orange, isLoop: true },
    { type: "rect", text: "Pour into cup with tea bag", color: C.accent },
    { type: "rect", text: "Wait 3 minutes", color: C.purple },
    { type: "oval", text: "END — Tea Ready ☕", color: C.green },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Algorithms are often drawn as <strong style={{ color: C.accent }}>flowcharts</strong> — diagrams that show steps,
        decisions, and loops visually. This is how programmers plan before they write code.
      </p>
      <button onClick={() => setShow(s => !s)} style={{
        width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${C.accent}`,
        background: show ? C.accentGlow + "22" : "transparent",
        color: C.accent, cursor: "pointer", fontWeight: 600, fontSize: 13, marginBottom: 16,
      }}>{show ? "▲ Hide Flowchart" : "▼ Show Flowchart: Making Tea"}</button>

      {show && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          {/* Start */}
          <Shape type="oval" text="START" color={C.green} />
          <Arrow />
          <Shape type="diamond" text="Is water\nboiled?" color={C.yellow} />
          {/* Decision branches */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 0, width: "100%" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ color: C.red, fontSize: 11, marginBottom: 4 }}>NO</div>
              <Shape type="rect" text="Boil the water" color={C.orange} />
              <Arrow curved />
            </div>
            <div style={{ width: 40, textAlign: "center", paddingTop: 10, color: C.green, fontSize: 11 }}>YES ↓</div>
            <div style={{ flex: 1 }} />
          </div>
          <Arrow />
          <Shape type="rect" text="Pour into cup with tea bag" color={C.accent} />
          <Arrow />
          <Shape type="rect" text="Wait 3 minutes" color={C.purple} />
          <Arrow />
          <Shape type="oval" text="END — Tea Ready ☕" color={C.green} />
        </div>
      )}

      <div style={{
        marginTop: 16, background: C.card, borderRadius: 8, padding: "12px 14px",
        border: `1px solid ${C.border}`, fontSize: 13,
      }}>
        <div style={{ color: C.muted, fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>FLOWCHART SHAPES LEGEND</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[
            ["⬭ Oval", "Start / End", C.green],
            ["▭ Rectangle", "Action step", C.accent],
            ["◇ Diamond", "Decision (Yes/No)", C.yellow],
            ["→ Arrow", "Flow direction", C.muted],
          ].map(([shape, meaning, color], i) => (
            <div key={i} style={{ fontSize: 12 }}>
              <span style={{ color }}>{shape}</span>
              <span style={{ color: C.muted }}> — {meaning}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Shape({ type, text, color }) {
  const base = {
    display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
    fontSize: 12, fontWeight: 600, padding: "10px 16px", margin: "2px 0",
    border: `2px solid ${color}`, color: C.text, background: color + "22",
    whiteSpace: "pre-line", minWidth: 160,
  };
  if (type === "oval") return <div style={{ ...base, borderRadius: 40 }}>{text}</div>;
  if (type === "diamond") return (
    <div style={{ width: 120, height: 60, position: "relative", margin: "8px 0" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%) rotate(45deg)",
        width: 60, height: 60, background: color + "22", border: `2px solid ${color}`,
      }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.text, fontWeight: 600 }}>{text}</div>
    </div>
  );
  return <div style={{ ...base, borderRadius: 6 }}>{text}</div>;
}

function Arrow() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "2px 0" }}>
      <div style={{ width: 2, height: 16, background: C.border }} />
      <div style={{ color: C.muted, fontSize: 12, marginTop: -4 }}>▼</div>
    </div>
  );
}

// ── Algorithm vs Program ───────────────────────────────────────────────────
function AlgoVsProgram() {
  const [flipped, setFlipped] = useState([false, false]);
  const cards = [
    {
      front: { icon: "🧠", title: "Algorithm", sub: "The IDEA" },
      back: { color: C.purple, text: "A step-by-step plan in plain language. Language-independent. Can be written in English, Tamil, or drawn as a flowchart. Humans write this first." },
    },
    {
      front: { icon: "💻", title: "Program", sub: "The CODE" },
      back: { color: C.accent, text: "The same plan written in a programming language (like Python) that the computer can actually run. The algorithm becomes the program." },
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        People often confuse these two. They're related, but not the same. <strong style={{ color: C.accent }}>Tap the cards</strong> to reveal the difference.
      </p>
      <div style={{ display: "flex", gap: 16, marginBottom: 16, justifyContent: "center" }}>
        {cards.map((card, i) => (
          <div key={i} onClick={() => setFlipped(f => f.map((v, j) => j === i ? !v : v))}
            style={{
              width: 160, minHeight: 160, borderRadius: 12, cursor: "pointer",
              border: `2px solid ${flipped[i] ? cards[i].back.color : C.border}`,
              background: flipped[i] ? cards[i].back.color + "22" : C.card,
              padding: 16, transition: "all 0.35s", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", textAlign: "center",
            }}>
            {!flipped[i] ? (
              <>
                <div style={{ fontSize: 36 }}>{card.front.icon}</div>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 15, marginTop: 10 }}>{card.front.title}</div>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>{card.front.sub}</div>
                <div style={{ color: C.muted, fontSize: 10, marginTop: 12 }}>tap to reveal →</div>
              </>
            ) : (
              <div style={{ color: C.text, fontSize: 12, lineHeight: 1.6 }}>{card.back.text}</div>
            )}
          </div>
        ))}
      </div>
      {flipped[0] && flipped[1] && (
        <div style={{
          background: C.green + "18", border: `1px solid ${C.green}44`, borderRadius: 8,
          padding: "12px 14px", fontSize: 13, color: C.muted, textAlign: "center",
        }}>
          💡 You always write the <strong style={{ color: C.purple }}>algorithm first</strong>, then translate it into a <strong style={{ color: C.accent }}>program</strong>.
          In this course, you'll learn to do both!
        </div>
      )}
    </div>
  );
}

// ── Mini Quiz ──────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What is an algorithm?",
      options: [
        "A type of computer chip",
        "A precise, ordered set of steps to solve a problem",
        "A programming language like Python",
        "A random list of ideas",
      ],
      answer: 1,
      explain: "An algorithm is a step-by-step, precise plan for solving a problem — before any code is written.",
    },
    {
      q: "Which of these is NOT a property of a good algorithm?",
      options: ["It must be precise", "It must have a clear end", "It must be written in Python", "It must have input and output"],
      answer: 2,
      explain: "Algorithms are language-independent. You can write one in English, Tamil, or draw it as a flowchart!",
    },
    {
      q: "In a flowchart, what shape represents a DECISION (yes/no)?",
      options: ["Rectangle", "Oval", "Diamond", "Arrow"],
      answer: 2,
      explain: "A diamond (◇) represents a decision point — the flow splits into YES or NO paths.",
    },
    {
      q: "What comes first — the algorithm or the program?",
      options: [
        "The program — you start coding right away",
        "They are written at the same time",
        "The algorithm — you plan before you code",
        "Neither — computers figure it out",
      ],
      answer: 2,
      explain: "Always plan your algorithm first. Jumping straight to code without a plan is a common beginner mistake!",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[current].answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current < questions.length - 1) { setCurrent(c => c + 1); setSelected(null); }
    else { setDone(true); onComplete && onComplete(score + (selected === questions[current].answer ? 1 : 0)); }
  };

  if (done) {
    const final = score + (selected === questions[current].answer ? 1 : 0);
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{final >= 3 ? "🎉" : final === 2 ? "👍" : "🤔"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {final} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8 }}>
          {final === 4 ? "Excellent! You understand algorithms perfectly." :
            final >= 2 ? "Good effort! Review the flowchart section once more." :
              "Go back through the lesson and try again — you've got this!"}
        </div>
        <div style={{
          marginTop: 16, padding: "12px 20px", borderRadius: 8,
          background: C.green + "22", border: `1px solid ${C.green}`,
          color: C.green, fontWeight: 600,
        }}>Unit 1.2 Complete ✓</div>
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
        <div style={{
          marginTop: 12, padding: "10px 14px", borderRadius: 8,
          background: C.purple + "18", border: `1px solid ${C.purple}44`,
          color: C.muted, fontSize: 13,
        }}>💡 {q.explain}</div>
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

// ── Main ───────────────────────────────────────────────────────────────────
export default function Unit1_2() {
  const sections = [
    { id: "intro", label: "What is an Algorithm?" },
    { id: "properties", label: "4 Properties" },
    { id: "flowchart", label: "Flowcharts" },
    { id: "vs", label: "Algorithm vs Program" },
    { id: "quiz", label: "Quick Quiz" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <TeaCupAlgo />,
    <AlgoProperties />,
    <Flowchart />,
    <AlgoVsProgram />,
    <Quiz onComplete={() => markComplete(4)} />,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 1 › UNIT 1.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Instructions & Algorithms</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{completed.length} / {sections.length} done</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(completed.length / sections.length) * 100}%`, background: C.green, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap", background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}` }}>
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

        {/* Content */}
        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
          <div style={{ marginBottom: 16 }}>
            {activeSection === 0 && <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
              <div style={{ background: C.purple + "33", border: `1px solid ${C.purple}`, borderRadius: 6, padding: "3px 10px", fontSize: 11, color: C.purple }}>Unit 1.2</div>
              <div style={{ color: C.muted, fontSize: 12 }}>~8 min read + interact</div>
            </div>}
          </div>
          {content[activeSection]}
        </div>

        {/* Next button */}
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
