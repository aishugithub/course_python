import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8", pink: "#FF7B9C",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── The Book Translation Analogy ───────────────────────────────────────────
function BookAnalogy() {
  const [step, setStep] = useState(0);

  const story = [
    {
      icon: "📖",
      color: C.accent,
      title: "Imagine a Tamil Novel",
      content: "You've written a brilliant novel in Tamil. You want people in Japan to read it. They don't understand Tamil — so what do you do?",
      visual: { left: { label: "Tamil Novel", icon: "📖", color: C.purple }, right: { label: "Japanese Reader", icon: "🇯🇵", color: C.red }, arrow: "✗", arrowColor: C.red },
    },
    {
      icon: "🔄",
      color: C.yellow,
      title: "You Hire a Translator",
      content: "You hand the entire book to a professional translator. They read every page, understand the full meaning, and produce a complete Japanese edition. This translation process takes time — but once done, the Japanese book exists permanently.",
      visual: { left: { label: "Tamil Novel", icon: "📖", color: C.purple }, middle: { label: "Translator", icon: "🔄", color: C.yellow }, right: { label: "Japanese Book", icon: "📗", color: C.green }, arrow: "→" },
    },
    {
      icon: "📗",
      color: C.green,
      title: "Anyone Can Now Read It — Fast",
      content: "The Japanese book is ready. Anyone in Japan can now read it directly — quickly, with no translator needed each time. This is exactly how a compiler works. It translates your entire source code once, producing an executable file anyone can run instantly.",
      visual: { left: { label: "Source Code (C++)", icon: "💻", color: C.accent }, middle: { label: "Compiler", icon: "⚙️", color: C.yellow }, right: { label: "Executable (.exe)", icon: "🚀", color: C.green }, arrow: "→" },
    },
  ];

  const s = story[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Compilation can feel abstract. Let's start with a real-world analogy before we look at the technical process.
      </p>

      <div style={{
        background: s.color + "18", border: `1.5px solid ${s.color}55`,
        borderRadius: 12, padding: "18px 16px", marginBottom: 16, transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 32 }}>{s.icon}</span>
          <div style={{ color: s.color, fontWeight: 700, fontSize: 15 }}>{s.title}</div>
        </div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>{s.content}</div>

        {/* Visual */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{
            background: s.visual.left.color + "22", border: `1.5px solid ${s.visual.left.color}55`,
            borderRadius: 10, padding: "12px 16px", textAlign: "center", minWidth: 90,
          }}>
            <div style={{ fontSize: 28 }}>{s.visual.left.icon}</div>
            <div style={{ color: s.visual.left.color, fontSize: 11, fontWeight: 600, marginTop: 4 }}>{s.visual.left.label}</div>
          </div>

          {s.visual.middle ? (
            <>
              <div style={{ color: C.muted, fontSize: 20 }}>→</div>
              <div style={{
                background: s.visual.middle.color + "22", border: `1.5px solid ${s.visual.middle.color}55`,
                borderRadius: 10, padding: "12px 16px", textAlign: "center", minWidth: 90,
              }}>
                <div style={{ fontSize: 28 }}>{s.visual.middle.icon}</div>
                <div style={{ color: s.visual.middle.color, fontSize: 11, fontWeight: 600, marginTop: 4 }}>{s.visual.middle.label}</div>
              </div>
            </>
          ) : (
            <div style={{ color: s.arrowColor || C.muted, fontSize: 24, fontWeight: 700 }}>{s.visual.arrow}</div>
          )}

          <div style={{ color: C.muted, fontSize: 20 }}>→</div>
          <div style={{
            background: s.visual.right.color + "22", border: `1.5px solid ${s.visual.right.color}55`,
            borderRadius: 10, padding: "12px 16px", textAlign: "center", minWidth: 90,
          }}>
            <div style={{ fontSize: 28 }}>{s.visual.right.icon}</div>
            <div style={{ color: s.visual.right.color, fontSize: 11, fontWeight: 600, marginTop: 4 }}>{s.visual.right.label}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{
          padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: step === 0 ? C.border : C.text,
          cursor: step === 0 ? "not-allowed" : "pointer", fontSize: 13,
        }}>← Back</button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {story.map((_, i) => (
            <div key={i} onClick={() => setStep(i)} style={{
              width: i === step ? 20 : 8, height: 8, borderRadius: 4,
              background: i === step ? s.color : C.border,
              cursor: "pointer", transition: "all 0.25s",
            }} />
          ))}
        </div>
        <button onClick={() => setStep(s => Math.min(story.length - 1, s + 1))} disabled={step === story.length - 1} style={{
          padding: "9px 20px", borderRadius: 8, border: "none",
          background: step === story.length - 1 ? C.border : C.accentGlow,
          color: "#fff", cursor: step === story.length - 1 ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600,
        }}>Next →</button>
      </div>
    </div>
  );
}

// ── Compilation Pipeline Animation ─────────────────────────────────────────
function CompilationPipeline() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);

  const stages = [
    {
      name: "Source Code",
      icon: "📝",
      color: C.accent,
      input: null,
      output: `#include <stdio.h>\nint main() {\n  int a = 5;\n  int b = 3;\n  printf("%d", a+b);\n}`,
      desc: "You write human-readable C code in a text file (main.c). This is what you create.",
      badge: "YOU WRITE THIS",
    },
    {
      name: "Preprocessor",
      icon: "🔍",
      color: C.teal,
      input: "main.c",
      output: `// #include expanded to actual code\n// Macros substituted\n// Comments removed\nint main() {\n  int a = 5;\n  int b = 3;\n  printf("%d", a+b);\n}`,
      desc: "Handles #include and #define — expands macros, removes comments, pulls in header files. Output is still readable C code.",
      badge: "STAGE 1",
    },
    {
      name: "Compiler",
      icon: "⚙️",
      color: C.purple,
      input: "Preprocessed C",
      output: `; Assembly output\nmain:\n  push  rbp\n  mov   eax, 5\n  mov   ebx, 3\n  add   eax, ebx\n  call  printf`,
      desc: "The core stage. Translates C code into Assembly instructions for the target CPU. Checks syntax, types, and logic.",
      badge: "STAGE 2",
    },
    {
      name: "Assembler",
      icon: "🔧",
      color: C.yellow,
      input: "Assembly (.s file)",
      output: `Binary object file (.o)\n\n10001001 11101101\n10111000 00000101\n10111011 00000011\n00000001 11000011\n11101000 xxxxxxxx`,
      desc: "Converts Assembly mnemonics to binary machine code. Output is an object file — not yet runnable because it may reference external libraries.",
      badge: "STAGE 3",
    },
    {
      name: "Linker",
      icon: "🔗",
      color: C.orange,
      input: "Object file(s) + Libraries",
      output: `Final Executable: main.exe\n\nCombines:\n• main.o (your code)\n• printf from stdio.h\n• System startup code\n\nResult: Standalone binary`,
      desc: "Combines your object file with any libraries used (like printf from stdio). Produces the final standalone executable.",
      badge: "STAGE 4",
    },
    {
      name: "Executable",
      icon: "🚀",
      color: C.green,
      input: "main.exe / main (Linux)",
      output: `$ ./main\n8`,
      desc: "The finished product. A self-contained binary file the OS can run directly. No compiler needed — just double-click or run from terminal.",
      badge: "RUN ANYTIME",
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
      }, i * 900);
    });
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Compilation is not a single step — it's a <strong style={{ color: C.accent }}>pipeline of 4 stages</strong>.
        Click Run to watch your C code transform into a running program.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
        {stages.map((s, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 14px",
            borderRadius: 10,
            background: step === i ? s.color + "22" : step > i ? C.green + "12" : C.card,
            border: `1.5px solid ${step === i ? s.color : step > i ? C.green + "44" : C.border}`,
            transition: "all 0.4s",
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
              background: step >= i ? s.color + "33" : C.bg,
              border: `2px solid ${step >= i ? s.color : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, transition: "all 0.4s",
            }}>{step > i ? "✅" : s.icon}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
                <span style={{ color: step >= i ? s.color : C.muted, fontWeight: 700, fontSize: 13 }}>{s.name}</span>
                <span style={{
                  background: s.color + "22", color: s.color, fontSize: 9,
                  padding: "2px 7px", borderRadius: 20, fontWeight: 700, letterSpacing: 1,
                }}>{s.badge}</span>
              </div>
              {step >= i && (
                <>
                  <div style={{ color: C.muted, fontSize: 12, marginBottom: 6 }}>{s.desc}</div>
                  <pre style={{
                    fontFamily: "monospace", fontSize: 11, color: step === i ? s.color : C.muted,
                    background: C.bg, borderRadius: 6, padding: "8px 10px",
                    margin: 0, overflowX: "auto", lineHeight: 1.7,
                  }}>{s.output}</pre>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={run} disabled={running} style={{
          flex: 1, padding: "11px", borderRadius: 8, border: "none",
          background: running ? C.border : C.accentGlow,
          color: "#fff", fontWeight: 600, fontSize: 13,
          cursor: running ? "not-allowed" : "pointer",
        }}>{running ? "Compiling…" : "▶ Run Compilation Pipeline"}</button>
        <button onClick={() => { setStep(-1); setRunning(false); }} style={{
          padding: "11px 16px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.muted, cursor: "pointer", fontSize: 13,
        }}>↺</button>
      </div>
    </div>
  );
}

// ── Key Properties of Compilation ─────────────────────────────────────────
function CompilationProperties() {
  const [active, setActive] = useState(null);

  const props = [
    {
      icon: "⚡", title: "Fast at Runtime", color: C.green,
      detail: "The translation work is done once, ahead of time. When you run the program, the CPU executes native machine code directly — no translation overhead. Games, operating systems, and browsers use compiled code for this reason.",
      example: { label: "Chrome browser startup", value: "~300ms (compiled C++)" },
    },
    {
      icon: "🔒", title: "Source Code is Hidden", color: C.accent,
      detail: "When you distribute a compiled executable (.exe), users receive binary machine code — not your original source code. This is how commercial software protects its logic. You can't easily reverse-engineer it back to readable C.",
      example: { label: "Microsoft Word .exe", value: "Users get binary — not the C++ source" },
    },
    {
      icon: "🎯", title: "Errors Caught Before Running", color: C.purple,
      detail: "The compiler reads your entire program before running it. Syntax errors, type mismatches, undeclared variables — all caught at compile time. You can't even produce an executable if errors exist.",
      example: { label: "int x = \"hello\";", value: "Compiler error: cannot assign string to int" },
    },
    {
      icon: "📦", title: "Platform Specific", color: C.yellow,
      detail: "A compiled .exe for Windows won't run on Linux or a Mac. The binary is tied to the CPU architecture and operating system. To support multiple platforms, you must compile separately for each.",
      example: { label: "Windows .exe", value: "Won't run on macOS without recompiling" },
    },
    {
      icon: "🕐", title: "Compile Time vs Run Time", color: C.orange,
      detail: "Compilation happens once before distribution. Running happens many times by many users. This trade-off — invest time compiling once, to get fast execution forever — is the key insight behind compiled languages.",
      example: { label: "gcc main.c → 2 seconds compile", value: "main.exe → runs in milliseconds forever" },
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Compilation has distinct characteristics that make it ideal for some situations and less ideal for others.
        Tap each property to understand the trade-offs.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {props.map((p, i) => (
          <div key={i} onClick={() => setActive(active === i ? null : i)} style={{
            background: active === i ? p.color + "18" : C.card,
            border: `1.5px solid ${active === i ? p.color : C.border}`,
            borderRadius: 10, padding: "12px 14px", cursor: "pointer", transition: "all 0.25s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{p.icon}</span>
              <span style={{ color: p.color, fontWeight: 700, fontSize: 14 }}>{p.title}</span>
              <span style={{ marginLeft: "auto", color: C.muted, fontSize: 13 }}>{active === i ? "▲" : "▼"}</span>
            </div>
            {active === i && (
              <div style={{ marginTop: 10 }}>
                <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 10 }}>{p.detail}</div>
                <div style={{ background: C.bg, borderRadius: 8, padding: "9px 12px", border: `1px solid ${C.border}` }}>
                  <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>EXAMPLE</div>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: p.color }}>{p.example.label}</div>
                  <div style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>{p.example.value}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Spot the Error ─────────────────────────────────────────────────────────
function SpotTheError() {
  const programs = [
    {
      title: "Program 1 — Add two numbers",
      code: `#include <stdio.h>\nint main() {\n  int a = 5\n  int b = 3;\n  printf("%d", a + b);\n  return 0;\n}`,
      errorLine: 3,
      errorDesc: "Missing semicolon after int a = 5",
      fix: "int a = 5;",
      color: C.red,
    },
    {
      title: "Program 2 — Print a name",
      code: `#include <stdio.h>\nint main() {\n  int name = "Aishu";\n  printf("%s", name);\n  return 0;\n}`,
      errorLine: 3,
      errorDesc: "Wrong type — 'name' is declared as int but assigned a string",
      fix: "char name[] = \"Aishu\";",
      color: C.orange,
    },
    {
      title: "Program 3 — Calculate area",
      code: `#include <stdio.h>\nint main() {\n  int length = 10;\n  int width = 5;\n  int area = lenght * width;\n  printf("%d", area);\n}`,
      errorLine: 5,
      errorDesc: "Typo — 'lenght' is not declared. Did you mean 'length'?",
      fix: "int area = length * width;",
      color: C.yellow,
    },
  ];

  const [prog, setProg] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const p = programs[prog];
  const lines = p.code.split("\n");

  const next = () => {
    setProg(p => (p + 1) % programs.length);
    setSelected(null);
    setRevealed(false);
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A compiler catches errors <strong style={{ color: C.accent }}>before the program runs</strong>. Can you spot the bug the compiler would catch?
        Click the line you think is wrong.
      </p>

      <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 14, overflow: "hidden" }}>
        <div style={{ background: C.surface, padding: "10px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: C.muted, fontSize: 12 }}>{p.title}</span>
          <span style={{ color: C.muted, fontSize: 11 }}>Click a line to flag it as the error</span>
        </div>
        {lines.map((line, i) => (
          <div key={i} onClick={() => { setSelected(i + 1); setRevealed(false); }} style={{
            display: "flex", gap: 12, alignItems: "center", padding: "7px 14px",
            cursor: "pointer",
            background: selected === i + 1
              ? (i + 1 === p.errorLine ? C.red + "22" : C.orange + "18")
              : revealed && i + 1 === p.errorLine ? C.red + "18" : "transparent",
            borderLeft: selected === i + 1
              ? `3px solid ${i + 1 === p.errorLine ? C.red : C.orange}`
              : revealed && i + 1 === p.errorLine ? `3px solid ${C.red}` : "3px solid transparent",
            transition: "all 0.2s",
          }}>
            <span style={{ color: C.muted, fontSize: 11, minWidth: 18, userSelect: "none" }}>{i + 1}</span>
            <span style={{ fontFamily: "monospace", fontSize: 12, color: C.text }}>{line}</span>
            {selected === i + 1 && i + 1 === p.errorLine && <span style={{ marginLeft: "auto", color: C.red, fontSize: 12 }}>✗ Error here</span>}
            {selected === i + 1 && i + 1 !== p.errorLine && <span style={{ marginLeft: "auto", color: C.orange, fontSize: 12 }}>Not here — try again</span>}
          </div>
        ))}
      </div>

      {selected === p.errorLine && (
        <div style={{ background: C.green + "18", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>✓ Correct! Compiler error found:</div>
          <div style={{ color: C.muted, fontSize: 13, marginBottom: 6 }}>{p.errorDesc}</div>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: C.green }}>Fix: {p.fix}</div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setRevealed(true)} style={{
          flex: 1, padding: "9px", borderRadius: 8,
          border: `1px solid ${C.yellow}`, background: "transparent",
          color: C.yellow, cursor: "pointer", fontSize: 13,
        }}>💡 Reveal Answer</button>
        <button onClick={next} style={{
          flex: 1, padding: "9px", borderRadius: 8, border: "none",
          background: C.accentGlow, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 13,
        }}>Next Program →</button>
      </div>

      {revealed && selected !== p.errorLine && (
        <div style={{ marginTop: 10, background: C.red + "18", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "10px 14px" }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Line {p.errorLine} had the bug:</div>
          <div style={{ color: C.muted, fontSize: 13 }}>{p.errorDesc}</div>
        </div>
      )}
    </div>
  );
}

// ── Quiz ───────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What does a compiler do?",
      options: [
        "Runs your code line by line as you type it",
        "Translates your entire source code into machine code before running",
        "Checks your code for spelling mistakes only",
        "Converts machine code back to human-readable code",
      ],
      answer: 1,
      explain: "A compiler reads the entire source code, translates it all into machine code, and produces an executable file — before any part of the program runs.",
    },
    {
      q: "Which of the following is an advantage of compiled programs?",
      options: [
        "They are easier to write than interpreted programs",
        "They run on any operating system without changes",
        "They execute very fast because they run native machine code directly",
        "They show errors while you are typing",
      ],
      answer: 2,
      explain: "Compiled programs run as native machine code — no translation at runtime. This makes them extremely fast, which is why games, browsers, and OS kernels are compiled.",
    },
    {
      q: "What is the correct order of the compilation pipeline?",
      options: [
        "Linker → Compiler → Assembler → Executable",
        "Source Code → Preprocessor → Compiler → Assembler → Linker → Executable",
        "Source Code → Executable → Assembler → Linker",
        "Compiler → Source Code → Preprocessor → Linker",
      ],
      answer: 1,
      explain: "The full pipeline is: Source Code → Preprocessor → Compiler → Assembler → Linker → Executable. Each stage transforms the code one step closer to machine instructions.",
    },
    {
      q: "If a compiled C++ program has a type error (e.g., assigning a string to an int), when is the error caught?",
      options: [
        "While the user is running the program",
        "At compile time — the executable is never even produced",
        "Only when the specific line with the error is reached at runtime",
        "It is never caught — it just produces wrong output silently",
      ],
      answer: 1,
      explain: "Compiled languages catch type errors, syntax errors, and undeclared variables at compile time. If there are errors, the compiler refuses to produce an executable.",
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
          {final === 4 ? "Perfect! You understand compilation deeply." :
            final >= 2 ? "Good — revisit the pipeline animation once more." :
              "Try walking through the Compilation Pipeline section again carefully."}
        </div>
        <div style={{ marginTop: 16, padding: "12px 20px", borderRadius: 8, background: C.green + "22", border: `1px solid ${C.green}`, color: C.green, fontWeight: 600 }}>
          Unit 3.1 Complete ✓
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
export default function Unit3_1({ student, onUnitComplete }) {
  const sections = [
    { id: "analogy", label: "The Analogy" },
    { id: "pipeline", label: "Pipeline" },
    { id: "properties", label: "Key Properties" },
    { id: "spot", label: "Spot the Error" },
    { id: "quiz", label: "Quick Quiz" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <BookAnalogy />,
    <CompilationPipeline />,
    <CompilationProperties />,
    <SpotTheError />,
    <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 3 › UNIT 3.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>What is Compilation?</div>
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
