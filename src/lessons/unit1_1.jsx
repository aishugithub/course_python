import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0D1117",
  surface: "#161B22",
  card: "#1C2333",
  accent: "#58A6FF",
  accentGlow: "#1F6FEB",
  green: "#3FB950",
  yellow: "#D29922",
  purple: "#BC8CFF",
  red: "#F85149",
  text: "#E6EDF3",
  muted: "#8B949E",
  border: "#30363D",
};

// ── Animated instruction flow ──────────────────────────────────────────────
function InstructionFlow() {
  const steps = [
    { icon: "📥", label: "INPUT", desc: "You press a key", color: COLORS.accent },
    { icon: "⚙️", label: "PROCESS", desc: "CPU runs instructions", color: COLORS.purple },
    { icon: "📤", label: "OUTPUT", desc: "Letter appears on screen", color: COLORS.green },
  ];
  const [active, setActive] = useState(-1);
  const [running, setRunning] = useState(false);

  const run = () => {
    if (running) return;
    setRunning(true);
    setActive(-1);
    steps.forEach((_, i) => {
      setTimeout(() => {
        setActive(i);
        if (i === steps.length - 1) setTimeout(() => { setRunning(false); setActive(-1); }, 1200);
      }, i * 900);
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              width: 120, padding: "18px 10px", borderRadius: 12,
              background: active === i ? s.color + "22" : COLORS.card,
              border: `2px solid ${active === i ? s.color : COLORS.border}`,
              transition: "all 0.4s ease",
              transform: active === i ? "scale(1.08)" : "scale(1)",
              boxShadow: active === i ? `0 0 20px ${s.color}44` : "none",
            }}>
              <div style={{ fontSize: 32 }}>{s.icon}</div>
              <div style={{ color: s.color, fontWeight: 700, fontSize: 11, letterSpacing: 2, marginTop: 6 }}>{s.label}</div>
              <div style={{ color: COLORS.muted, fontSize: 11, marginTop: 4 }}>{s.desc}</div>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: 40, height: 2,
                background: active > i ? COLORS.green : COLORS.border,
                transition: "background 0.4s ease",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", right: -6, top: -5,
                  color: active > i ? COLORS.green : COLORS.border,
                  fontSize: 14, transition: "color 0.4s"
                }}>▶</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={run} disabled={running} style={{
        marginTop: 20, padding: "10px 28px", borderRadius: 8,
        background: running ? COLORS.border : COLORS.accentGlow,
        color: "#fff", border: "none", cursor: running ? "not-allowed" : "pointer",
        fontWeight: 600, fontSize: 14, transition: "background 0.3s",
      }}>
        {running ? "Running…" : "▶ Run Animation"}
      </button>
    </div>
  );
}

// ── Binary Counter ─────────────────────────────────────────────────────────
function BinaryDemo() {
  const [num, setNum] = useState(0);
  const binary = num.toString(2).padStart(8, "0");

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
        Every number, letter, image, and sound in a computer is stored as <strong style={{ color: COLORS.accent }}>0s and 1s</strong>.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 16 }}>
        {binary.split("").map((bit, i) => (
          <div key={i} style={{
            width: 36, height: 44, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
            background: bit === "1" ? COLORS.accentGlow : COLORS.card,
            border: `1px solid ${bit === "1" ? COLORS.accent : COLORS.border}`,
            color: bit === "1" ? "#fff" : COLORS.muted,
            fontFamily: "monospace", fontWeight: 700, fontSize: 18,
            transition: "all 0.25s ease",
            boxShadow: bit === "1" ? `0 0 10px ${COLORS.accent}66` : "none",
          }}>{bit}</div>
        ))}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.text, marginBottom: 14 }}>
        = <span style={{ color: COLORS.yellow }}>{num}</span>
        {num >= 65 && num <= 90 && <span style={{ color: COLORS.green, marginLeft: 12 }}>= '{String.fromCharCode(num)}'</span>}
        {num >= 97 && num <= 122 && <span style={{ color: COLORS.green, marginLeft: 12 }}>= '{String.fromCharCode(num)}'</span>}
      </div>
      <input type="range" min={0} max={127} value={num}
        onChange={e => setNum(Number(e.target.value))}
        style={{ width: "80%", accentColor: COLORS.accent }} />
      <p style={{ color: COLORS.muted, fontSize: 12, marginTop: 6 }}>
        Drag to change the number. Try 65–90 to see letters!
      </p>
    </div>
  );
}

// ── Recipe Analogy ─────────────────────────────────────────────────────────
function RecipeAnalogy() {
  const [step, setStep] = useState(0);
  const recipe = [
    { code: "FETCH  flour, bowl", real: "Get flour from the shelf", icon: "🌾" },
    { code: "FETCH  eggs, bowl", real: "Get 2 eggs from the fridge", icon: "🥚" },
    { code: "MIX    bowl", real: "Mix everything together", icon: "🥣" },
    { code: "HEAT   oven, 180°C", real: "Preheat oven", icon: "🔥" },
    { code: "BAKE   bowl, 30min", real: "Put in oven for 30 minutes", icon: "⏱️" },
    { code: "OUTPUT cake", real: "Cake is ready!", icon: "🎂" },
  ];

  return (
    <div>
      <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 14, textAlign: "center" }}>
        A program is like a recipe. The computer follows instructions <em>one by one, in order</em>.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ background: COLORS.card, borderRadius: 8, padding: 12, border: `1px solid ${COLORS.border}` }}>
          <div style={{ color: COLORS.muted, fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>PROGRAM (code)</div>
          {recipe.map((r, i) => (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: 12, padding: "5px 8px", borderRadius: 4, marginBottom: 3,
              background: step === i ? COLORS.accentGlow + "33" : "transparent",
              color: step === i ? COLORS.accent : COLORS.muted,
              border: step === i ? `1px solid ${COLORS.accent}44` : "1px solid transparent",
              transition: "all 0.3s",
            }}>{r.code}</div>
          ))}
        </div>
        <div style={{ background: COLORS.card, borderRadius: 8, padding: 12, border: `1px solid ${COLORS.border}` }}>
          <div style={{ color: COLORS.muted, fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>WHAT HAPPENS</div>
          <div style={{
            minHeight: 120, display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", textAlign: "center",
          }}>
            <div style={{ fontSize: 42, marginBottom: 8 }}>{recipe[step].icon}</div>
            <div style={{ color: COLORS.text, fontSize: 13 }}>{recipe[step].real}</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 14 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ padding: "8px 18px", borderRadius: 6, background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text, cursor: step === 0 ? "not-allowed" : "pointer" }}>
          ← Back
        </button>
        <span style={{ color: COLORS.muted, fontSize: 12, alignSelf: "center" }}>Step {step + 1} / {recipe.length}</span>
        <button onClick={() => setStep(s => Math.min(recipe.length - 1, s + 1))} disabled={step === recipe.length - 1}
          style={{ padding: "8px 18px", borderRadius: 6, background: COLORS.accentGlow, border: "none", color: "#fff", cursor: step === recipe.length - 1 ? "not-allowed" : "pointer" }}>
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Mini Quiz ──────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What are the three basic things every computer does?",
      options: ["Think, Dream, Sleep", "Input, Process, Output", "Read, Write, Delete", "Start, Run, Stop"],
      answer: 1,
      explain: "Every computer takes Input, Processes it, and gives Output — even your phone!",
    },
    {
      q: "How does a computer store ALL its information — numbers, letters, images?",
      options: ["As coloured pixels", "As 0s and 1s (binary)", "As words in English", "As electrical sounds"],
      answer: 1,
      explain: "Binary (0s and 1s) is the only language electricity understands — ON or OFF.",
    },
    {
      q: "A program is most similar to which of these?",
      options: ["A photograph", "A recipe with step-by-step instructions", "A random wish", "A calculator button"],
      answer: 1,
      explain: "A program is a precise list of instructions the computer follows in order — just like a recipe.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    setShowExplain(true);
    if (i === questions[current].answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplain(false);
    } else {
      setDone(true);
      onComplete && onComplete(score + (selected === questions[current].answer ? 1 : 0));
    }
  };

  if (done) {
    const final = score + (selected === questions[current].answer ? 1 : 0);
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{final === 3 ? "🎉" : final === 2 ? "👍" : "🤔"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.text, marginTop: 10 }}>
          You scored {final} / {questions.length}
        </div>
        <div style={{ color: COLORS.muted, marginTop: 8 }}>
          {final === 3 ? "Perfect! You've got the foundation of computing down." :
            final === 2 ? "Good work! Review the binary demo once more." :
              "No worries — go back through the lesson and try again!"}
        </div>
        <div style={{
          marginTop: 16, padding: "12px 20px", borderRadius: 8,
          background: COLORS.green + "22", border: `1px solid ${COLORS.green}`,
          color: COLORS.green, fontWeight: 600,
        }}>Unit 1.1 Complete ✓</div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>
        Question {current + 1} of {questions.length}
      </div>
      <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 15, marginBottom: 16 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((opt, i) => {
          let bg = COLORS.card, border = COLORS.border, col = COLORS.text;
          if (selected !== null) {
            if (i === q.answer) { bg = COLORS.green + "22"; border = COLORS.green; col = COLORS.green; }
            else if (i === selected && selected !== q.answer) { bg = COLORS.red + "22"; border = COLORS.red; col = COLORS.red; }
          }
          return (
            <button key={i} onClick={() => choose(i)} style={{
              textAlign: "left", padding: "10px 14px", borderRadius: 8,
              background: bg, border: `1.5px solid ${border}`, color: col,
              cursor: selected !== null ? "default" : "pointer", fontSize: 13,
              transition: "all 0.25s",
            }}>
              {i === q.answer && selected !== null ? "✓ " : i === selected && selected !== q.answer ? "✗ " : ""}{opt}
            </button>
          );
        })}
      </div>
      {showExplain && (
        <div style={{
          marginTop: 12, padding: "10px 14px", borderRadius: 8,
          background: COLORS.purple + "18", border: `1px solid ${COLORS.purple}44`,
          color: COLORS.muted, fontSize: 13,
        }}>
          💡 {q.explain}
        </div>
      )}
      {selected !== null && (
        <button onClick={next} style={{
          marginTop: 14, padding: "10px 24px", borderRadius: 8,
          background: COLORS.accentGlow, border: "none", color: "#fff",
          fontWeight: 600, cursor: "pointer", fontSize: 14,
        }}>
          {current < questions.length - 1 ? "Next Question →" : "See Results"}
        </button>
      )}
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function Unit1_1({ student, onUnitComplete }) {
  const sections = [
    { id: "intro", label: "Overview" },
    { id: "ipu", label: "Input → Process → Output" },
    { id: "binary", label: "The Language of 0s & 1s" },
    { id: "recipe", label: "Programs as Recipes" },
    { id: "quiz", label: "Quick Quiz" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [quizScore, setQuizScore] = useState(null);

  const markComplete = (idx) => {
    if (!completed.includes(idx)) setCompleted(p => [...p, idx]);
  };

  const goNext = () => {
    markComplete(activeSection);
    setActiveSection(s => Math.min(sections.length - 1, s + 1));
  };

  const content = [
    // 0 — Intro
    <div>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.accentGlow}22, ${COLORS.purple}22)`,
        border: `1px solid ${COLORS.accent}44`, borderRadius: 12, padding: "24px 20px",
        marginBottom: 20, textAlign: "center",
      }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>🖥️</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>
          What Does a Computer Actually Do?
        </div>
        <div style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
          Before we write a single line of Python, we need to understand what we're talking to.
          A computer is a surprisingly simple machine — it just follows instructions, very, very fast.
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { icon: "⚡", title: "Speed", desc: "A modern CPU executes billions of instructions per second" },
          { icon: "🎯", title: "Precision", desc: "It does exactly what you tell it — no more, no less" },
          { icon: "🔁", title: "Repetition", desc: "It never gets bored repeating the same task a million times" },
          { icon: "🧠", title: "Memory", desc: "It can remember and retrieve vast amounts of information instantly" },
        ].map((c, i) => (
          <div key={i} style={{
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: 10, padding: "14px 12px",
          }}>
            <div style={{ fontSize: 24 }}>{c.icon}</div>
            <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 13, marginTop: 6 }}>{c.title}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{c.desc}</div>
          </div>
        ))}
      </div>
      <div style={{
        background: COLORS.yellow + "18", border: `1px solid ${COLORS.yellow}44`,
        borderRadius: 8, padding: "12px 16px", fontSize: 13, color: COLORS.muted,
      }}>
        🔑 <strong style={{ color: COLORS.yellow }}>Key idea:</strong> A computer has no intelligence of its own.
        It only becomes powerful when <em>you</em> give it the right instructions. That's what programming is.
      </div>
    </div>,

    // 1 — IPU
    <div>
      <h3 style={{ color: COLORS.text, marginBottom: 6 }}>The IPU Cycle</h3>
      <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
        Every interaction with a computer — typing, clicking, watching a video — follows the same three-step cycle.
        Click <strong style={{ color: COLORS.accent }}>Run Animation</strong> to see it in action.
      </p>
      <InstructionFlow />
      <div style={{ marginTop: 20, background: COLORS.card, borderRadius: 8, padding: "14px 16px", border: `1px solid ${COLORS.border}` }}>
        <div style={{ color: COLORS.muted, fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>REAL EXAMPLES</div>
        {[
          ["🎹 Piano app", "Press key", "Match key to note frequency", "Play sound"],
          ["📸 Camera", "Tap shutter", "Compress image data", "Save photo file"],
          ["🔍 Google Search", "Type query", "Match keywords to index", "Show results"],
        ].map(([app, i, p, o], idx) => (
          <div key={idx} style={{
            display: "grid", gridTemplateColumns: "100px 1fr 1fr 1fr", gap: 6,
            fontSize: 12, marginBottom: 6, color: COLORS.muted,
          }}>
            <span style={{ color: COLORS.text }}>{app}</span>
            <span style={{ color: COLORS.accent }}>{i}</span>
            <span style={{ color: COLORS.purple }}>{p}</span>
            <span style={{ color: COLORS.green }}>{o}</span>
          </div>
        ))}
      </div>
    </div>,

    // 2 — Binary
    <div>
      <h3 style={{ color: COLORS.text, marginBottom: 6 }}>The Language of 0s and 1s</h3>
      <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
        A computer's CPU is made of billions of tiny switches called <strong style={{ color: COLORS.accent }}>transistors</strong>.
        Each can be ON (1) or OFF (0). Everything — your photos, messages, videos — is stored using just these two states.
      </p>
      <BinaryDemo />
      <div style={{
        marginTop: 20, background: COLORS.card, borderRadius: 8, padding: "14px 16px",
        border: `1px solid ${COLORS.border}`, fontSize: 13,
      }}>
        <span style={{ color: COLORS.muted }}>The letter </span>
        <span style={{ color: COLORS.accent, fontFamily: "monospace" }}>'A'</span>
        <span style={{ color: COLORS.muted }}> is stored as </span>
        <span style={{ color: COLORS.yellow, fontFamily: "monospace" }}>01000001</span>
        <span style={{ color: COLORS.muted }}> — just 8 switches. A 4K image has over </span>
        <span style={{ color: COLORS.green }}>25 million</span>
        <span style={{ color: COLORS.muted }}> such groups!</span>
      </div>
    </div>,

    // 3 — Recipe
    <div>
      <h3 style={{ color: COLORS.text, marginBottom: 6 }}>A Program is a Recipe</h3>
      <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
        The most important thing to understand about programs: they are a <em>precise, ordered list of instructions</em>.
        The computer reads them one by one and executes them faithfully.
      </p>
      <RecipeAnalogy />
      <div style={{
        marginTop: 16, background: COLORS.red + "18", border: `1px solid ${COLORS.red}44`,
        borderRadius: 8, padding: "12px 16px", fontSize: 13, color: COLORS.muted,
      }}>
        ⚠️ <strong style={{ color: COLORS.red }}>Unlike a chef</strong>, the computer has no common sense.
        If you say "add salt" without specifying how much, it will be confused. <em>Precision matters.</em>
      </div>
    </div>,

    // 4 — Quiz
    <div>
      <h3 style={{ color: COLORS.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>
        3 questions to check your understanding of Unit 1.1.
      </p>
      <Quiz onComplete={(s) => { setQuizScore(s); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{
      background: COLORS.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: COLORS.text, padding: "0 0 40px",
    }}>
      {/* Header */}
      <div style={{
        background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`,
        padding: "14px 24px", display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: COLORS.accentGlow,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: COLORS.muted, letterSpacing: 1 }}>MODULE 1 › UNIT 1.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>What Does a Computer Actually Do?</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: COLORS.muted }}>
          {completed.length} / {sections.length} done
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: COLORS.border }}>
        <div style={{
          height: "100%", width: `${(completed.length / sections.length) * 100}%`,
          background: COLORS.green, transition: "width 0.4s ease",
        }} />
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
        {/* Tab nav */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap",
          background: COLORS.surface, borderRadius: 10, padding: 4,
          border: `1px solid ${COLORS.border}`,
        }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => setActiveSection(i)} style={{
              flex: 1, minWidth: 80, padding: "8px 6px", borderRadius: 7,
              background: activeSection === i ? COLORS.accentGlow : "transparent",
              border: "none", color: activeSection === i ? "#fff" : COLORS.muted,
              cursor: "pointer", fontSize: 11, fontWeight: activeSection === i ? 600 : 400,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              transition: "all 0.2s",
            }}>
              {completed.includes(i) && <span style={{ color: COLORS.green }}>✓</span>}
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          background: COLORS.surface, borderRadius: 12, padding: "24px 20px",
          border: `1px solid ${COLORS.border}`, minHeight: 300,
        }}>
          {content[activeSection]}
        </div>

        {/* Navigation */}
        {activeSection < sections.length - 1 && (
          <button onClick={goNext} style={{
            marginTop: 16, width: "100%", padding: "12px", borderRadius: 8,
            background: COLORS.accentGlow, border: "none", color: "#fff",
            fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>
            Mark Complete & Continue →
          </button>
        )}
      </div>
    </div>
  );
}
