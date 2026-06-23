import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8", pink: "#FF7B9C",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Python is Neither Pure ─────────────────────────────────────────────────
function HybridExplainer() {
  const [active, setActive] = useState(null);

  const langs = [
    {
      name: "Pure Compiler (C/C++)",
      icon: "⚙️", color: C.orange,
      flow: ["Source Code (.c)", "→ Compiler", "→ Machine Code (.exe)", "→ CPU runs directly"],
      verdict: "Compiled",
      pro: "Fastest possible execution",
      con: "Must recompile for each platform",
    },
    {
      name: "Pure Interpreter (old BASIC)",
      icon: "📜", color: C.yellow,
      flow: ["Source Code", "→ Interpreter reads line 1", "→ Executes line 1", "→ Reads line 2…"],
      verdict: "Interpreted",
      pro: "Instant — no compilation step",
      con: "Slowest — translates same lines every run",
    },
    {
      name: "Python (Hybrid!)",
      icon: "🐍", color: C.purple,
      flow: ["Source Code (.py)", "→ Compile to Bytecode (.pyc)", "→ PVM interprets bytecode", "→ Machine Code executes"],
      verdict: "Both!",
      pro: "Portable + reasonably fast",
      con: "Slower than pure C, faster than pure interpretation",
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Python doesn't fit neatly into either category. It uses a <strong style={{ color: C.purple }}>hybrid approach</strong> — a little bit of both compilation and interpretation. Tap each language to see the difference.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {langs.map((l, i) => (
          <div key={i} onClick={() => setActive(active === i ? null : i)} style={{
            background: active === i ? l.color + "18" : C.card,
            border: `1.5px solid ${active === i ? l.color : C.border}`,
            borderRadius: 10, padding: "12px 14px", cursor: "pointer", transition: "all 0.25s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>{l.icon}</span>
              <span style={{ color: l.color, fontWeight: 700, fontSize: 14 }}>{l.name}</span>
              <span style={{
                marginLeft: "auto", background: l.color + "33", color: l.color,
                borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700,
              }}>{l.verdict}</span>
            </div>

            {active === i && (
              <div style={{ marginTop: 12 }}>
                {/* Flow */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
                  {l.flow.map((step, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {j > 0 && step.startsWith("→") ? null : null}
                      <div style={{
                        background: step.startsWith("→") ? "transparent" : l.color + "22",
                        border: step.startsWith("→") ? "none" : `1px solid ${l.color}55`,
                        borderRadius: 6, padding: step.startsWith("→") ? "0" : "4px 10px",
                        fontSize: 11, color: step.startsWith("→") ? C.muted : l.color,
                        fontWeight: step.startsWith("→") ? 400 : 600,
                      }}>{step}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ background: C.green + "18", border: `1px solid ${C.green}33`, borderRadius: 6, padding: "7px 10px", fontSize: 11 }}>
                    <span style={{ color: C.green }}>✓ </span><span style={{ color: C.muted }}>{l.pro}</span>
                  </div>
                  <div style={{ background: C.red + "18", border: `1px solid ${C.red}33`, borderRadius: 6, padding: "7px 10px", fontSize: 11 }}>
                    <span style={{ color: C.red }}>✗ </span><span style={{ color: C.muted }}>{l.con}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>Key insight:</strong> Python compiles your code to an intermediate form called <strong style={{ color: C.accent }}>bytecode</strong>, then interprets that bytecode using the <strong style={{ color: C.teal }}>Python Virtual Machine (PVM)</strong>. You get portability AND reasonable speed.
      </div>
    </div>
  );
}

// ── Bytecode Deep Dive ─────────────────────────────────────────────────────
function BytecodeDive() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);

  const stages = [
    {
      icon: "📝", color: C.accent, name: "Your Python Code",
      file: "hello.py",
      content: `name = "Aishu"\ngreeting = "Hello, " + name\nprint(greeting)`,
      desc: "You write clean, readable Python. This is your source file — .py extension.",
    },
    {
      icon: "⚙️", color: C.yellow, name: "Python Compiles to Bytecode",
      file: "hello.pyc (inside __pycache__)",
      content: `LOAD_CONST     "Aishu"\nSTORE_NAME     name\nLOAD_CONST     "Hello, "\nLOAD_NAME      name\nBINARY_ADD\nSTORE_NAME     greeting\nLOAD_NAME      greeting\nPRINT_ITEM\nPRINT_NEWLINE`,
      desc: "Python secretly compiles your code to bytecode — a simplified, platform-neutral instruction set. This is stored in __pycache__/hello.cpython-312.pyc. You rarely see this file.",
    },
    {
      icon: "🖥️", color: C.purple, name: "PVM Reads Bytecode",
      file: "Python Virtual Machine",
      content: `PVM reads bytecode instructions:\n\n1. LOAD_CONST "Aishu"  → push to stack\n2. STORE_NAME name      → store in memory\n3. LOAD_CONST "Hello, " → push to stack\n4. LOAD_NAME name       → push "Aishu"\n5. BINARY_ADD           → "Hello, Aishu"\n6. STORE_NAME greeting  → store result\n7. LOAD_NAME greeting   → fetch it\n8. PRINT_ITEM           → send to output`,
      desc: "The Python Virtual Machine (PVM) reads each bytecode instruction and translates it to native machine code on the fly — for whatever CPU and OS you're running on.",
    },
    {
      icon: "✅", color: C.green, name: "Output",
      file: "Terminal",
      content: `Hello, Aishu`,
      desc: "The result appears instantly. The entire pipeline — compile to bytecode → PVM interpret → execute — happens in milliseconds every time you run your script.",
    },
  ];

  const run = () => {
    if (running) return;
    setRunning(true);
    setStep(-1);
    stages.forEach((_, i) => {
      setTimeout(() => {
        setStep(i);
        if (i === stages.length - 1) setTimeout(() => setRunning(false), 600);
      }, i * 1000);
    });
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        When you type <code style={{ color: C.accent, background: C.bg, padding: "1px 6px", borderRadius: 4 }}>python hello.py</code>, a 4-stage pipeline runs silently in milliseconds. Click Run to see each stage unfold.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {stages.map((s, i) => (
          <div key={i} style={{
            borderRadius: 10, padding: "12px 14px",
            background: step === i ? s.color + "22" : step > i ? C.green + "12" : C.card,
            border: `1.5px solid ${step === i ? s.color : step > i ? C.green + "44" : C.border}`,
            transition: "all 0.4s",
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                background: step >= i ? s.color + "33" : C.bg,
                border: `2px solid ${step >= i ? s.color : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, transition: "all 0.4s",
              }}>{step > i ? "✅" : s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: step >= i ? s.color : C.muted, fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                <div style={{ color: C.muted, fontSize: 10 }}>{s.file}</div>
              </div>
            </div>
            {step >= i && (
              <div style={{ marginTop: 10 }}>
                <pre style={{
                  fontFamily: "monospace", fontSize: 11, color: step === i ? s.color : C.muted,
                  background: C.bg, borderRadius: 6, padding: "10px 12px",
                  margin: "0 0 8px 0", overflowX: "auto", lineHeight: 1.7,
                }}>{s.content}</pre>
                <div style={{ color: C.muted, fontSize: 12 }}>{s.desc}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={run} disabled={running} style={{
          flex: 1, padding: "11px", borderRadius: 8, border: "none",
          background: running ? C.border : C.accentGlow,
          color: "#fff", fontWeight: 600, fontSize: 13,
          cursor: running ? "not-allowed" : "pointer",
        }}>{running ? "Running pipeline…" : "▶ Run python hello.py"}</button>
        <button onClick={() => { setStep(-1); setRunning(false); }} style={{
          padding: "11px 16px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.muted, cursor: "pointer", fontSize: 13,
        }}>↺</button>
      </div>
    </div>
  );
}

// ── PVM Explained ──────────────────────────────────────────────────────────
function PVMExplained() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "What is the PVM?",
      color: C.purple,
      content: (
        <div>
          <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>
            The <strong style={{ color: C.purple }}>Python Virtual Machine</strong> is a program that runs on your computer and executes Python bytecode.
            It's called "virtual" because it acts like a CPU — but it's software, not hardware.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: "🖥️", label: "Real CPU", desc: "Hardware. Runs machine code (binary). Tied to one architecture — x86, ARM, etc." },
              { icon: "🐍", label: "Python VM", desc: "Software. Runs bytecode. Works the same on ANY hardware. That's why Python is portable." },
            ].map((item, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 10, padding: "14px 12px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: C.teal + "18", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted }}>
            💡 The PVM is installed when you install Python. When you run <code style={{ color: C.teal }}>python script.py</code>, you're launching the PVM and telling it to execute your script.
          </div>
        </div>
      ),
    },
    {
      label: "Why Bytecode?",
      color: C.yellow,
      content: (
        <div>
          <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>
            Why not just interpret the .py source directly, one line at a time? Because bytecode is <strong style={{ color: C.yellow }}>faster and more efficient</strong> to process.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: "📖", label: "Source code", issue: "Parsing text is slow — the PVM would waste time re-reading English-like syntax on every run" },
              { icon: "🔢", label: "Bytecode", issue: "Simple numbered instructions — the PVM processes these much faster than parsing raw text" },
              { icon: "💾", label: "Cached .pyc", issue: "Python saves the bytecode to disk. If your code hasn't changed, it skips recompilation entirely on the next run" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, background: C.card, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ color: C.yellow, fontWeight: 600, fontSize: 13 }}>{item.label}</div>
                  <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6, marginTop: 2 }}>{item.issue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "Portability Magic",
      color: C.teal,
      content: (
        <div>
          <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>
            The bytecode is <strong style={{ color: C.teal }}>platform-neutral</strong>. The same .pyc file can run on Windows, Mac, and Linux — as long as each has a PVM installed.
          </p>
          <div style={{ background: C.card, borderRadius: 10, padding: "14px", border: `1px solid ${C.border}`, marginBottom: 12 }}>
            <div style={{ color: C.muted, fontSize: 11, letterSpacing: 2, marginBottom: 12 }}>ONE SCRIPT → RUNS EVERYWHERE</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ background: C.purple + "22", border: `1px solid ${C.purple}55`, borderRadius: 8, padding: "8px 20px", fontFamily: "monospace", fontSize: 12, color: C.purple }}>
                hello.pyc (bytecode)
              </div>
              <div style={{ color: C.muted, fontSize: 20 }}>↓</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { os: "🪟 Windows", pvm: "PVM for Windows" },
                  { os: "🍎 macOS", pvm: "PVM for macOS" },
                  { os: "🐧 Linux", pvm: "PVM for Linux" },
                  { os: "🍓 Raspberry Pi", pvm: "PVM for ARM" },
                ].map((item, i) => (
                  <div key={i} style={{ background: C.teal + "18", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "8px 12px", textAlign: "center", fontSize: 11 }}>
                    <div style={{ fontSize: 18 }}>{item.os.split(" ")[0]}</div>
                    <div style={{ color: C.teal, fontWeight: 600, marginTop: 4 }}>{item.os.split(" ").slice(1).join(" ")}</div>
                    <div style={{ color: C.muted, marginTop: 2 }}>{item.pvm}</div>
                    <div style={{ color: C.green, marginTop: 2 }}>✓ Works!</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: C.orange + "18", border: `1px solid ${C.orange}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.muted }}>
            Compare this with C: a Windows .exe won't run on Linux. You'd have to recompile. Python's bytecode approach solves this entirely.
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The <strong style={{ color: C.purple }}>Python Virtual Machine</strong> is the engine that makes Python work. Explore the three things you need to understand about it.
      </p>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActiveTab(i)} style={{
            flex: 1, padding: "8px 6px", borderRadius: 8,
            background: activeTab === i ? t.color + "33" : C.card,
            border: `1.5px solid ${activeTab === i ? t.color : C.border}`,
            color: activeTab === i ? t.color : C.muted,
            cursor: "pointer", fontSize: 11, fontWeight: activeTab === i ? 700 : 400,
            transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>
      {tabs[activeTab].content}
    </div>
  );
}

// ── The Full Picture: Where Python Fits ───────────────────────────────────
function FullPicture() {
  const [revealed, setRevealed] = useState(false);

  const languages = [
    { name: "Machine Code", level: 0, color: C.red, icon: "🔌", speed: 10, ease: 1, portable: 1, example: "10110000 00000101" },
    { name: "Assembly", level: 1, color: C.orange, icon: "⚙️", speed: 9, ease: 2, portable: 2, example: "MOV AX, 5" },
    { name: "C / C++", level: 2, color: C.yellow, icon: "🔧", speed: 8, ease: 4, portable: 4, example: "int x = 5;" },
    { name: "Java / C#", level: 3, color: C.accent, icon: "☕", speed: 6, ease: 6, portable: 8, example: "int x = 5;" },
    { name: "Python", level: 4, color: C.purple, icon: "🐍", speed: 5, ease: 9, portable: 9, example: "x = 5" },
    { name: "JavaScript", level: 4, color: C.green, icon: "🌐", speed: 6, ease: 8, portable: 10, example: "let x = 5;" },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Now that you understand compilation, interpretation, and bytecode — here is the complete picture of where Python sits among all programming approaches.
      </p>

      <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ padding: "10px 14px", background: C.surface, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 60px 60px 60px", gap: 8, fontSize: 10, color: C.muted, letterSpacing: 1 }}>
            <span>LANGUAGE</span>
            <span>APPROACH</span>
            <span style={{ textAlign: "center" }}>SPEED</span>
            <span style={{ textAlign: "center" }}>EASE</span>
            <span style={{ textAlign: "center" }}>PORTABLE</span>
          </div>
        </div>
        {languages.map((lang, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "120px 1fr 60px 60px 60px",
            gap: 8, padding: "10px 14px", alignItems: "center",
            background: lang.name === "Python" ? C.purple + "12" : i % 2 === 0 ? "transparent" : C.bg + "88",
            borderBottom: `1px solid ${C.border}22`,
            border: lang.name === "Python" ? `1px solid ${C.purple}44` : "none",
          }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span>{lang.icon}</span>
              <span style={{ color: lang.name === "Python" ? lang.color : C.text, fontWeight: lang.name === "Python" ? 700 : 400, fontSize: 12 }}>{lang.name}</span>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: lang.color }}>{lang.example}</div>
            <div style={{ display: "flex", gap: 1, justifyContent: "center" }}>
              {Array.from({ length: 5 }, (_, j) => (
                <div key={j} style={{ width: 6, height: 6, borderRadius: 1, background: j < Math.round(lang.speed / 2) ? lang.color : C.border }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 1, justifyContent: "center" }}>
              {Array.from({ length: 5 }, (_, j) => (
                <div key={j} style={{ width: 6, height: 6, borderRadius: 1, background: j < Math.round(lang.ease / 2) ? lang.color : C.border }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 1, justifyContent: "center" }}>
              {Array.from({ length: 5 }, (_, j) => (
                <div key={j} style={{ width: 6, height: 6, borderRadius: 1, background: j < Math.round(lang.portable / 2) ? lang.color : C.border }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setRevealed(r => !r)} style={{
        width: "100%", padding: "10px", borderRadius: 8,
        border: `1px solid ${C.purple}`, background: revealed ? C.purple + "22" : "transparent",
        color: C.purple, cursor: "pointer", fontWeight: 600, fontSize: 13, marginBottom: 12,
      }}>{revealed ? "▲ Hide Summary" : "▼ Why Python is the Best Starting Point"}</button>

      {revealed && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { icon: "📖", color: C.green, text: "Most readable syntax of any language — code reads like English" },
            { icon: "🚀", color: C.accent, text: "Fastest to learn — beginners can build real programs in days" },
            { icon: "🌍", color: C.teal, text: "Runs on every platform without recompiling" },
            { icon: "🤖", color: C.purple, text: "#1 language for AI, machine learning, and data science" },
            { icon: "📚", color: C.yellow, text: "Largest ecosystem of libraries — almost anything you need already exists" },
            { icon: "💼", color: C.orange, text: "Consistently top 3 in industry demand worldwide" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", background: C.card, borderRadius: 8, padding: "10px 12px", border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ color: C.muted, fontSize: 13 }}>{item.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Quiz ───────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What is Python bytecode?",
      options: [
        "The same as machine code — binary 0s and 1s",
        "An intermediate, platform-neutral instruction set that Python compiles your code to before running",
        "The original .py source code stored differently",
        "A type of Python error",
      ],
      answer: 1,
      explain: "Bytecode is a simplified, intermediate set of instructions — neither human-readable source code nor CPU machine code. It's stored in .pyc files inside __pycache__.",
    },
    {
      q: "What does the Python Virtual Machine (PVM) do?",
      options: [
        "It converts Python code directly to Assembly",
        "It reads and executes bytecode instructions, translating them to native machine code on the fly",
        "It compiles Python to a standalone .exe file",
        "It checks your Python code for style errors",
      ],
      answer: 1,
      explain: "The PVM reads bytecode and executes it by translating each instruction to the native machine code of whatever CPU and OS you're running on.",
    },
    {
      q: "Why is Python considered 'portable'?",
      options: [
        "Python files are small and easy to carry on a USB drive",
        "Python code compiles to machine code specific to each CPU",
        "Python bytecode is platform-neutral — the same .pyc runs on Windows, Mac, and Linux via their local PVM",
        "Python is installed on every computer by default",
      ],
      answer: 2,
      explain: "Bytecode is not tied to any specific CPU or OS. Each platform has its own PVM that can read the same bytecode — so the same Python script runs everywhere.",
    },
    {
      q: "Python is best described as:",
      options: [
        "A purely compiled language like C",
        "A purely interpreted language like old BASIC",
        "A hybrid — it compiles to bytecode, then the PVM interprets that bytecode",
        "A machine code language",
      ],
      answer: 2,
      explain: "Python uses both: it compiles source code to bytecode (compilation step), then the PVM interprets that bytecode at runtime (interpretation step). It's genuinely a hybrid.",
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
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {final === 4 ? "Perfect! You now understand exactly where Python fits." :
            final >= 2 ? "Good — revisit the Bytecode Deep Dive section." :
              "Go through the PVM Explained section once more."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.purple}22, ${C.green}22)`,
          border: `1px solid ${C.purple}55`,
        }}>
          <div style={{ color: C.purple, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Module 3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You now understand the complete journey — from binary to Assembly to high-level languages, from compilation to interpretation to Python's hybrid approach.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Module 4 — Your First Python Program.</strong> Time to write real code!
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

// ── Main ───────────────────────────────────────────────────────────────────
export default function Unit3_3() {
  const sections = [
    { id: "hybrid", label: "Python is Hybrid" },
    { id: "bytecode", label: "Bytecode Pipeline" },
    { id: "pvm", label: "The PVM" },
    { id: "picture", label: "Full Picture" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <HybridExplainer />,
    <BytecodeDive />,
    <PVMExplained />,
    <FullPicture />,
    <Quiz onComplete={() => markComplete(4)} />,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 3 › UNIT 3.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Where Does Python Fit?</div>
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
