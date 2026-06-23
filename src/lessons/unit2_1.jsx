import { useState, useEffect } from "react";

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
  pink: "#FF7B9C",
  teal: "#39D0D8",
  text: "#E6EDF3",
  muted: "#8B949E",
  border: "#30363D",
};

// ── Side by Side Language Comparison ──────────────────────────────────────
function LanguageLevels() {
  const [active, setActive] = useState(null);

  const levels = [
    {
      id: "human",
      label: "Human Language",
      sublabel: "What YOU think",
      icon: "🧠",
      color: C.green,
      code: `Add 5 and 3,
then store the result,
then show it on screen.`,
      note: "Natural, vague, flexible. Computers cannot understand this directly.",
    },
    {
      id: "python",
      label: "Python (High-Level)",
      sublabel: "What you TYPE",
      icon: "🐍",
      color: C.purple,
      code: `result = 5 + 3
print(result)`,
      note: "Readable code close to English. Python translates this for the computer.",
    },
    {
      id: "assembly",
      label: "Assembly (Low-Level)",
      sublabel: "What the CPU almost sees",
      icon: "⚙️",
      color: C.yellow,
      code: `MOV AX, 5
ADD AX, 3
MOV [result], AX
CALL print`,
      note: "Human-readable but very close to machine instructions. One step above binary.",
    },
    {
      id: "machine",
      label: "Machine Code (Binary)",
      sublabel: "What the CPU ACTUALLY runs",
      icon: "🔌",
      color: C.red,
      code: `10111000 00000101
00000101 00000011
10100011 00000000
11101000 00000000`,
      note: "Pure 0s and 1s. The only language the CPU truly understands.",
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The same instruction — "add 5 and 3" — looks completely different at each level.
        <strong style={{ color: C.accent }}> Tap any card</strong> to zoom in and read more.
      </p>

      {/* Arrow flow */}
      <div style={{ display: "flex", alignItems: "stretch", gap: 0, marginBottom: 20, overflowX: "auto" }}>
        {levels.map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "stretch", flex: 1, minWidth: 130 }}>
            <div onClick={() => setActive(active === i ? null : i)} style={{
              flex: 1, padding: "14px 10px", borderRadius: 10, cursor: "pointer",
              background: active === i ? l.color + "22" : C.card,
              border: `2px solid ${active === i ? l.color : C.border}`,
              transition: "all 0.25s",
              boxShadow: active === i ? `0 0 16px ${l.color}44` : "none",
            }}>
              <div style={{ fontSize: 24, textAlign: "center" }}>{l.icon}</div>
              <div style={{ color: l.color, fontWeight: 700, fontSize: 11, textAlign: "center", marginTop: 6 }}>{l.label}</div>
              <div style={{ color: C.muted, fontSize: 10, textAlign: "center", marginTop: 2 }}>{l.sublabel}</div>
              <div style={{
                fontFamily: "monospace", fontSize: 10, color: active === i ? C.text : C.muted,
                background: C.bg, borderRadius: 6, padding: "8px", marginTop: 10,
                lineHeight: 1.6, whiteSpace: "pre",
              }}>{l.code}</div>
            </div>
            {i < levels.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", padding: "0 4px" }}>
                <div style={{ color: C.muted, fontSize: 18 }}>→</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {active !== null && (
        <div style={{
          background: levels[active].color + "18",
          border: `1px solid ${levels[active].color}55`,
          borderRadius: 10, padding: "14px 16px",
          transition: "all 0.3s",
        }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>{levels[active].icon}</span>
            <span style={{ color: levels[active].color, fontWeight: 700, fontSize: 14 }}>{levels[active].label}</span>
          </div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{levels[active].note}</div>
        </div>
      )}

      <div style={{
        marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`,
        borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted,
      }}>
        🔑 <strong style={{ color: C.accent }}>Key insight:</strong> Python sits at the top — closest to how humans think.
        The computer handles all the translation down to machine code automatically.
      </div>
    </div>
  );
}

// ── Translation Simulator ──────────────────────────────────────────────────
function TranslationSim() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);

  const pipeline = [
    {
      stage: "You write Python",
      icon: "✍️",
      color: C.purple,
      content: `result = 5 + 3\nprint(result)`,
      desc: "You type readable code. Python understands plain English-like syntax.",
    },
    {
      stage: "Python → Bytecode",
      icon: "🔄",
      color: C.accent,
      content: `LOAD_CONST  5\nLOAD_CONST  3\nBINARY_ADD\nSTORE_NAME  result\nLOAD_NAME   result\nCALL_FUNCTION print`,
      desc: "Python first compiles your code to an intermediate bytecode — a simplified instruction set.",
    },
    {
      stage: "Bytecode → Machine Code",
      icon: "⚙️",
      color: C.yellow,
      content: `10111000 00000101\n00000101 00000011\n10100011 00000000\n11101000 00000000`,
      desc: "The Python Virtual Machine translates bytecode into the actual binary the CPU can execute.",
    },
    {
      stage: "CPU Executes",
      icon: "⚡",
      color: C.green,
      content: `OUTPUT: 8`,
      desc: "The CPU reads the binary, performs the addition, and sends the result to your screen. Done!",
    },
  ];

  const run = () => {
    if (running) return;
    setRunning(true);
    setStep(-1);
    pipeline.forEach((_, i) => {
      setTimeout(() => {
        setStep(i);
        if (i === pipeline.length - 1) setTimeout(() => setRunning(false), 600);
      }, i * 800);
    });
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        When you run a Python program, it goes through several translation stages before the CPU can execute it.
        Watch what happens when you run <code style={{ color: C.purple, background: C.bg, padding: "1px 6px", borderRadius: 4 }}>result = 5 + 3</code>.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {pipeline.map((p, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px",
            borderRadius: 10,
            background: step === i ? p.color + "22" : step > i ? C.green + "12" : C.card,
            border: `1.5px solid ${step === i ? p.color : step > i ? C.green + "44" : C.border}`,
            transition: "all 0.4s",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
              background: step >= i ? p.color + "33" : C.bg,
              border: `2px solid ${step >= i ? p.color : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              transition: "all 0.4s",
            }}>{step > i ? "✅" : p.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: step >= i ? p.color : C.muted, fontWeight: 600, fontSize: 13 }}>{p.stage}</div>
              {step >= i && (
                <>
                  <pre style={{
                    fontFamily: "monospace", fontSize: 11, color: C.text,
                    background: C.bg, borderRadius: 6, padding: "8px 10px",
                    margin: "6px 0", overflowX: "auto",
                  }}>{p.content}</pre>
                  <div style={{ color: C.muted, fontSize: 12 }}>{p.desc}</div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={run} disabled={running} style={{
        width: "100%", padding: "11px", borderRadius: 8, border: "none",
        background: running ? C.border : C.accentGlow,
        color: "#fff", fontWeight: 600, fontSize: 13, cursor: running ? "not-allowed" : "pointer",
      }}>{running ? "Translating…" : "▶ Run Translation Pipeline"}</button>
    </div>
  );
}

// ── Why High-Level Languages ───────────────────────────────────────────────
function WhyHighLevel() {
  const [revealed, setRevealed] = useState([]);

  const toggle = (i) => setRevealed(r => r.includes(i) ? r.filter(x => x !== i) : [...r, i]);

  const reasons = [
    {
      icon: "📖",
      title: "Readability",
      color: C.green,
      body: "Python code reads almost like English. `print(\"Hello\")` is self-explanatory. Machine code like `10110000 01100001` means nothing to a human at a glance.",
      example: { good: 'print("Hello World")', bad: "10110000 01100001 11001101 00100001" },
    },
    {
      icon: "⚡",
      title: "Productivity",
      color: C.accent,
      body: "What takes 50 lines in Assembly can often be written in 5 lines of Python. Programmers build software faster, with fewer mistakes.",
      example: { good: "result = sum([1,2,3,4,5])", bad: "MOV CX, 5\nMOV SI, array\nXOR AX, AX\nloop: ADD AX,[SI]\nADD SI,2\nLOOP loop" },
    },
    {
      icon: "🔁",
      title: "Portability",
      color: C.purple,
      body: "Machine code is tied to one specific CPU. Python runs on Windows, Mac, Linux, Raspberry Pi — write once, run anywhere.",
      example: { good: "Same Python file runs on any machine", bad: "x86 binary won't run on ARM chip" },
    },
    {
      icon: "🛡️",
      title: "Safety",
      color: C.yellow,
      body: "High-level languages catch many errors before they crash your system. Low-level mistakes can corrupt memory, crash hardware, or expose security holes.",
      example: { good: "Python: IndexError caught automatically", bad: "C: buffer overflow → security vulnerability" },
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        If machine code is what the computer actually runs, why do we bother with high-level languages?
        Tap each reason to find out.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {reasons.map((r, i) => (
          <div key={i} onClick={() => toggle(i)} style={{
            background: revealed.includes(i) ? r.color + "18" : C.card,
            border: `1.5px solid ${revealed.includes(i) ? r.color : C.border}`,
            borderRadius: 10, padding: "12px 14px", cursor: "pointer", transition: "all 0.25s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{r.icon}</span>
              <span style={{ color: r.color, fontWeight: 700, fontSize: 14 }}>{r.title}</span>
              <span style={{ marginLeft: "auto", color: C.muted, fontSize: 12 }}>{revealed.includes(i) ? "▲" : "▼"}</span>
            </div>
            {revealed.includes(i) && (
              <div style={{ marginTop: 10 }}>
                <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>{r.body}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ background: C.green + "18", border: `1px solid ${C.green}44`, borderRadius: 6, padding: "8px 10px" }}>
                    <div style={{ color: C.green, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>✓ HIGH-LEVEL</div>
                    <pre style={{ fontFamily: "monospace", fontSize: 11, color: C.text, margin: 0, whiteSpace: "pre-wrap" }}>{r.example.good}</pre>
                  </div>
                  <div style={{ background: C.red + "18", border: `1px solid ${C.red}44`, borderRadius: 6, padding: "8px 10px" }}>
                    <div style={{ color: C.red, fontSize: 10, fontWeight: 700, marginBottom: 4 }}>✗ LOW-LEVEL</div>
                    <pre style={{ fontFamily: "monospace", fontSize: 11, color: C.text, margin: 0, whiteSpace: "pre-wrap" }}>{r.example.bad}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Decode Challenge ───────────────────────────────────────────────────────
function DecodeChallenge() {
  const challenges = [
    {
      binary: "01001000 01100101 01101100 01101100 01101111",
      answer: "Hello",
      hint: "It's a greeting!",
    },
    {
      binary: "01000001 01000100 01000001",
      answer: "ADA",
      hint: "A famous programmer's name!",
    },
    {
      binary: "01001000 01001001",
      answer: "HI",
      hint: "A short greeting.",
    },
  ];

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null); // null | "correct" | "wrong"
  const [showHint, setShowHint] = useState(false);

  const check = () => {
    if (input.trim().toUpperCase() === challenges[idx].answer.toUpperCase()) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  const next = () => {
    setIdx(i => (i + 1) % challenges.length);
    setInput("");
    setStatus(null);
    setShowHint(false);
  };

  const c = challenges[idx];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Each letter is stored as 8 bits (one byte). Can you figure out what this binary spells?
        Use the table below to help decode it!
      </p>

      {/* Mini ASCII table */}
      <div style={{ background: C.card, borderRadius: 8, padding: "10px 12px", marginBottom: 16, border: `1px solid ${C.border}` }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>QUICK REFERENCE — A=65, B=66 … Z=90 in binary</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["A", "D", "E", "H", "I", "L", "O"].map(ch => (
            <div key={ch} style={{ textAlign: "center", background: C.bg, borderRadius: 6, padding: "4px 8px", border: `1px solid ${C.border}` }}>
              <div style={{ color: C.accent, fontWeight: 700, fontSize: 13 }}>{ch}</div>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: C.muted }}>{ch.charCodeAt(0).toString(2).padStart(8, "0")}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: C.card, borderRadius: 10, padding: "16px", border: `1px solid ${C.border}`, marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>DECODE THIS BINARY ({idx + 1}/{challenges.length})</div>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: C.yellow, lineHeight: 2, wordBreak: "break-all", marginBottom: 14 }}>
          {c.binary}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={e => { setInput(e.target.value); setStatus(null); }}
            onKeyDown={e => e.key === "Enter" && check()}
            placeholder="Type your answer…"
            style={{
              flex: 1, padding: "9px 12px", borderRadius: 8,
              background: C.bg, border: `1.5px solid ${status === "correct" ? C.green : status === "wrong" ? C.red : C.border}`,
              color: C.text, fontSize: 13, outline: "none",
            }}
          />
          <button onClick={check} style={{
            padding: "9px 18px", borderRadius: 8, border: "none",
            background: C.accentGlow, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>Check</button>
        </div>

        {status === "correct" && (
          <div style={{ marginTop: 10, color: C.green, fontSize: 13 }}>
            🎉 Correct! <strong>"{c.answer}"</strong> — you decoded binary to text!
          </div>
        )}
        {status === "wrong" && (
          <div style={{ marginTop: 10, color: C.red, fontSize: 13 }}>
            Not quite — try again, or reveal the hint below.
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setShowHint(h => !h)} style={{
          flex: 1, padding: "9px", borderRadius: 8,
          border: `1px solid ${C.yellow}`, background: "transparent",
          color: C.yellow, cursor: "pointer", fontSize: 13,
        }}>{showHint ? "Hide Hint" : "💡 Show Hint"}</button>
        {status === "correct" && (
          <button onClick={next} style={{
            flex: 1, padding: "9px", borderRadius: 8, border: "none",
            background: C.green, color: C.bg, fontWeight: 700, cursor: "pointer", fontSize: 13,
          }}>Next Challenge →</button>
        )}
      </div>
      {showHint && (
        <div style={{ marginTop: 10, color: C.muted, fontSize: 13, padding: "10px 14px", background: C.yellow + "18", borderRadius: 8, border: `1px solid ${C.yellow}44` }}>
          💡 Hint: {c.hint}
        </div>
      )}
    </div>
  );
}

// ── Quiz ───────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "Which language does the CPU directly understand and execute?",
      options: ["Python", "Assembly", "Machine code (binary)", "C++"],
      answer: 2,
      explain: "CPUs only understand binary (0s and 1s). All other languages are eventually translated down to machine code.",
    },
    {
      q: "What happens when you run a Python program?",
      options: [
        "Python sends English text directly to the CPU",
        "Python translates your code through bytecode down to machine code",
        "The CPU learns Python and reads it directly",
        "Nothing — Python is not a real language",
      ],
      answer: 1,
      explain: "Python compiles to bytecode first, then the Python Virtual Machine converts that to machine code the CPU can run.",
    },
    {
      q: "What is the biggest advantage of high-level languages like Python over machine code?",
      options: [
        "They run faster than machine code",
        "They use less memory",
        "They are readable, portable, and much faster to write",
        "They are older and more tested",
      ],
      answer: 2,
      explain: "High-level languages sacrifice a tiny bit of raw speed for massive gains in readability, safety, and developer productivity.",
    },
    {
      q: "Assembly language is:",
      options: [
        "The same as machine code — pure binary",
        "One step above machine code — uses short words like MOV and ADD",
        "The same as Python",
        "A language for designing buildings",
      ],
      answer: 1,
      explain: "Assembly uses short human-readable mnemonics (MOV, ADD, CALL) but maps almost directly to machine instructions — one step above pure binary.",
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
    else { setDone(true); onComplete && onComplete(); }
  };

  if (done) {
    const final = score + (selected === questions[current].answer ? 1 : 0);
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{final >= 3 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {final} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8 }}>
          {final === 4 ? "Perfect! You understand language levels deeply." :
            final >= 2 ? "Good — revisit the translation pipeline section." :
              "Go back through the lesson, especially the comparison cards."}
        </div>
        <div style={{ marginTop: 16, padding: "12px 20px", borderRadius: 8, background: C.green + "22", border: `1px solid ${C.green}`, color: C.green, fontWeight: 600 }}>
          Unit 2.1 Complete ✓
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

// ── Main ───────────────────────────────────────────────────────────────────
export default function Unit2_1() {
  const sections = [
    { id: "levels", label: "Language Levels" },
    { id: "pipeline", label: "Translation Pipeline" },
    { id: "why", label: "Why High-Level?" },
    { id: "decode", label: "Decode Challenge" },
    { id: "quiz", label: "Quick Quiz" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <LanguageLevels />,
    <TranslationSim />,
    <WhyHighLevel />,
    <DecodeChallenge />,
    <Quiz onComplete={() => markComplete(4)} />,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 2 › UNIT 2.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Human Language vs Machine Language</div>
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
