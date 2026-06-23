import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Why Assembly Exists ────────────────────────────────────────────────────
function WhyAssembly() {
  const [step, setStep] = useState(0);

  const story = [
    {
      icon: "😰",
      title: "The Problem: Pure Binary is Impossible to Read",
      content: "Early programmers had to write programs as raw binary — streams of 0s and 1s. To add two numbers, you'd write something like 10110000 00000101 00000101 00000011. One wrong bit and the entire program crashes. There was no way to tell what you had written without decoding it mentally.",
      code: "10110000 00000101\n00000101 00000011\n10100011 00100000",
      codeLabel: "Program to add 5+3 in raw binary — can you tell what it does?",
      color: C.red,
    },
    {
      icon: "💡",
      title: "The Insight: Give Each Instruction a Name",
      content: "In the early 1950s, programmers realised: what if each binary pattern had a short memorable name? Instead of memorising 10110000, you write MOV. Instead of 00000101, you write the number 5. A program called the Assembler would then translate these names back to binary.",
      code: "MOV AX, 5\nADD AX, 3\nMOV [result], AX",
      codeLabel: "Same program in Assembly — now readable!",
      color: C.yellow,
    },
    {
      icon: "🎉",
      title: "The Result: Assembly Language",
      content: "Assembly language was born. It's a thin layer over machine code — almost a 1:1 mapping. Each Assembly instruction becomes exactly one machine instruction. It's still very low-level and CPU-specific, but it's something a human can actually read, write, and debug.",
      code: "; Assembly and its binary equivalent\nMOV AX, 5   → 10111000 00000101\nADD AX, 3   → 00000101 00000011\nMOV result  → 10100011 00100000",
      codeLabel: "Assembly maps directly to binary — one instruction each",
      color: C.green,
    },
  ];

  const s = story[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Before Python, before C, before any modern language — programmers faced a brutal reality.
        Walk through the story of how Assembly language was invented.
      </p>

      <div style={{
        background: s.color + "18", border: `1.5px solid ${s.color}55`,
        borderRadius: 12, padding: "18px 16px", marginBottom: 14, transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
          <span style={{ fontSize: 32 }}>{s.icon}</span>
          <div>
            <div style={{ color: s.color, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Step {step + 1} of {story.length}</div>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{s.title}</div>
          </div>
        </div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>{s.content}</div>
        <div style={{ background: C.bg, borderRadius: 8, padding: "12px 14px", border: `1px solid ${C.border}` }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 6 }}>{s.codeLabel.toUpperCase()}</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: s.color, margin: 0, lineHeight: 1.8 }}>{s.code}</pre>
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

// ── Assembly Instruction Decoder ───────────────────────────────────────────
function InstructionDecoder() {
  const [selected, setSelected] = useState(null);

  const instructions = [
    {
      mnemonic: "MOV",
      full: "MOVE",
      color: C.accent,
      icon: "📦",
      syntax: "MOV destination, source",
      what: "Copies a value from one place to another. Like picking up a book and placing it on a shelf.",
      examples: [
        { code: "MOV AX, 5", means: "Put the number 5 into register AX" },
        { code: "MOV BX, AX", means: "Copy whatever is in AX into BX" },
      ],
    },
    {
      mnemonic: "ADD",
      full: "ADD",
      color: C.green,
      icon: "➕",
      syntax: "ADD destination, value",
      what: "Adds a value to the destination register. The result is stored in destination.",
      examples: [
        { code: "ADD AX, 3", means: "Add 3 to whatever is currently in AX" },
        { code: "ADD AX, BX", means: "Add value in BX to value in AX, store in AX" },
      ],
    },
    {
      mnemonic: "SUB",
      full: "SUBTRACT",
      color: C.red,
      icon: "➖",
      syntax: "SUB destination, value",
      what: "Subtracts a value from the destination register.",
      examples: [
        { code: "SUB AX, 2", means: "Subtract 2 from whatever is in AX" },
        { code: "SUB BX, AX", means: "Subtract AX from BX, store result in BX" },
      ],
    },
    {
      mnemonic: "CMP",
      full: "COMPARE",
      color: C.yellow,
      icon: "⚖️",
      syntax: "CMP value1, value2",
      what: "Compares two values and sets internal flags — but does NOT store the result. Used before a jump.",
      examples: [
        { code: "CMP AX, 10", means: "Compare AX to 10 — is it equal, less, or greater?" },
        { code: "CMP AX, BX", means: "Compare value in AX with value in BX" },
      ],
    },
    {
      mnemonic: "JMP",
      full: "JUMP",
      color: C.purple,
      icon: "↪️",
      syntax: "JMP label",
      what: "Unconditionally jumps to another part of the program. The foundation of loops and branching.",
      examples: [
        { code: "JMP start", means: "Go back to the label called 'start'" },
        { code: "JE equal_case", means: "Jump to 'equal_case' only if previous CMP was equal (JE = Jump if Equal)" },
      ],
    },
    {
      mnemonic: "INT",
      full: "INTERRUPT",
      color: C.orange,
      icon: "📢",
      syntax: "INT number",
      what: "Calls a system interrupt — requests a service from the operating system, like printing text or reading a key.",
      examples: [
        { code: "INT 21h", means: "Call DOS service (e.g., print a character to screen)" },
        { code: "INT 80h", means: "Call Linux kernel service" },
      ],
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Assembly uses short <strong style={{ color: C.accent }}>mnemonics</strong> — memory aids — for each CPU instruction.
        Tap any instruction to see what it does and how to use it.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
        {instructions.map((ins, i) => (
          <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
            background: selected === i ? ins.color + "22" : C.card,
            border: `1.5px solid ${selected === i ? ins.color : C.border}`,
            borderRadius: 10, padding: "12px 10px", cursor: "pointer",
            textAlign: "center", transition: "all 0.25s",
            boxShadow: selected === i ? `0 0 12px ${ins.color}33` : "none",
          }}>
            <div style={{ fontSize: 22 }}>{ins.icon}</div>
            <div style={{ color: ins.color, fontWeight: 700, fontSize: 16, fontFamily: "monospace", marginTop: 6 }}>{ins.mnemonic}</div>
            <div style={{ color: C.muted, fontSize: 10, marginTop: 2 }}>{ins.full}</div>
          </div>
        ))}
      </div>

      {selected !== null && (() => {
        const ins = instructions[selected];
        return (
          <div style={{
            background: ins.color + "14", border: `1.5px solid ${ins.color}55`,
            borderRadius: 12, padding: "16px", transition: "all 0.3s",
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 28 }}>{ins.icon}</span>
              <div>
                <span style={{ color: ins.color, fontWeight: 700, fontSize: 18, fontFamily: "monospace" }}>{ins.mnemonic}</span>
                <span style={{ color: C.muted, fontSize: 12, marginLeft: 8 }}>({ins.full})</span>
              </div>
            </div>
            <div style={{ fontFamily: "monospace", color: C.yellow, fontSize: 12, marginBottom: 10, background: C.bg, padding: "6px 10px", borderRadius: 6 }}>
              {ins.syntax}
            </div>
            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{ins.what}</div>
            <div style={{ color: C.muted, fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>EXAMPLES</div>
            {ins.examples.map((ex, j) => (
              <div key={j} style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 6 }}>
                <code style={{ color: ins.color, fontFamily: "monospace", fontSize: 13, flexShrink: 0 }}>{ex.code}</code>
                <span style={{ color: C.muted, fontSize: 12 }}>→ {ex.means}</span>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

// ── Assembly Program Walkthrough ───────────────────────────────────────────
function ProgramWalkthrough() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);

  const registers = { AX: 0, BX: 0, CX: 0 };
  const stateAfter = [
    { AX: 10, BX: 0, CX: 0 },
    { AX: 10, BX: 3, CX: 0 },
    { AX: 7, BX: 3, CX: 0 },
    { AX: 7, BX: 3, CX: 7 },
    { AX: 7, BX: 3, CX: 7 },
  ];

  const program = [
    { code: "MOV AX, 10", color: C.accent, desc: "Load the number 10 into register AX", output: null },
    { code: "MOV BX, 3", color: C.accent, desc: "Load the number 3 into register BX", output: null },
    { code: "SUB AX, BX", color: C.red, desc: "Subtract BX (3) from AX (10), store result in AX", output: null },
    { code: "MOV CX, AX", color: C.purple, desc: "Copy the result from AX into CX", output: null },
    { code: "INT 21h", color: C.orange, desc: "Call the OS to print the value in CX to screen", output: "OUTPUT: 7" },
  ];

  const run = () => {
    if (running) return;
    setRunning(true);
    setStep(-1);
    program.forEach((_, i) => {
      setTimeout(() => {
        setStep(i);
        if (i === program.length - 1) setTimeout(() => setRunning(false), 600);
      }, i * 900);
    });
  };

  const currentState = step >= 0 ? stateAfter[step] : registers;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Watch a real Assembly program run step by step. This program calculates <strong style={{ color: C.accent }}>10 − 3</strong> and prints the answer.
        Notice how <strong style={{ color: C.yellow }}>registers</strong> (AX, BX, CX) hold values temporarily — like the CPU's scratchpad.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginBottom: 14 }}>
        {/* Program listing */}
        <div style={{ background: C.card, borderRadius: 10, padding: "14px", border: `1px solid ${C.border}` }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 10 }}>ASSEMBLY PROGRAM</div>
          {program.map((line, i) => (
            <div key={i} style={{
              display: "flex", gap: 10, alignItems: "center", padding: "7px 8px",
              borderRadius: 6, marginBottom: 4,
              background: step === i ? line.color + "22" : step > i ? C.green + "12" : "transparent",
              border: step === i ? `1px solid ${line.color}55` : "1px solid transparent",
              transition: "all 0.35s",
            }}>
              <span style={{ color: C.muted, fontSize: 10, minWidth: 14 }}>{i + 1}</span>
              <span style={{
                fontFamily: "monospace", fontSize: 13, flex: 1,
                color: step >= i ? line.color : C.muted,
              }}>{line.code}</span>
              {step === i && <span style={{ fontSize: 14 }}>◀</span>}
              {step > i && <span style={{ color: C.green, fontSize: 12 }}>✓</span>}
            </div>
          ))}
        </div>

        {/* Register state */}
        <div style={{ background: C.card, borderRadius: 10, padding: "14px", border: `1px solid ${C.border}`, minWidth: 120 }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 10 }}>REGISTERS</div>
          {Object.entries(currentState).map(([reg, val]) => (
            <div key={reg} style={{
              marginBottom: 10, padding: "8px", borderRadius: 6,
              background: C.bg, border: `1px solid ${C.border}`,
              textAlign: "center",
            }}>
              <div style={{ color: C.muted, fontSize: 10 }}>{reg}</div>
              <div style={{ color: C.yellow, fontWeight: 700, fontSize: 20, fontFamily: "monospace" }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Output */}
      <div style={{
        background: C.bg, border: `1px solid ${step >= 4 ? C.green : C.border}`,
        borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontFamily: "monospace",
        fontSize: 14, color: step >= 4 ? C.green : C.muted, transition: "all 0.4s",
        minHeight: 40, display: "flex", alignItems: "center",
      }}>
        {step >= 4 ? "$ OUTPUT: 7" : "$ — waiting for program to run —"}
      </div>

      {step >= 0 && step < program.length && (
        <div style={{
          background: program[step].color + "18", border: `1px solid ${program[step].color}44`,
          borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: C.muted,
        }}>
          ▶ <strong style={{ color: program[step].color }}>{program[step].code}</strong> — {program[step].desc}
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={run} disabled={running} style={{
          flex: 1, padding: "10px", borderRadius: 8, border: "none",
          background: running ? C.border : C.accentGlow,
          color: "#fff", fontWeight: 600, fontSize: 13, cursor: running ? "not-allowed" : "pointer",
        }}>{running ? "Running…" : "▶ Run Program"}</button>
        <button onClick={() => { setStep(-1); setRunning(false); }} style={{
          padding: "10px 16px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.muted, cursor: "pointer", fontSize: 13,
        }}>↺ Reset</button>
      </div>
    </div>
  );
}

// ── Assembly vs Python ─────────────────────────────────────────────────────
function AssemblyVsPython() {
  const [active, setActive] = useState(0);

  const comparisons = [
    {
      task: "Add two numbers",
      python: "result = 5 + 3\nprint(result)",
      assembly: "MOV AX, 5\nADD AX, 3\nMOV [result], AX\nINT 21h",
    },
    {
      task: "Print 'Hello'",
      python: 'print("Hello")',
      assembly: "section .data\n  msg db 'Hello',0\nsection .text\n  MOV AH, 9\n  MOV DX, msg\n  INT 21h",
    },
    {
      task: "Count from 1 to 5",
      python: "for i in range(1, 6):\n    print(i)",
      assembly: "MOV CX, 1\nloop_start:\n  MOV AX, CX\n  INT 21h\n  INC CX\n  CMP CX, 6\n  JL loop_start",
    },
  ];

  const c = comparisons[active];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The same task takes far more lines in Assembly than in Python. This is why we use high-level languages for almost everything today. Select a task to compare.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {comparisons.map((comp, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: "7px 14px", borderRadius: 20,
            background: active === i ? C.accentGlow + "33" : C.card,
            border: `1.5px solid ${active === i ? C.accent : C.border}`,
            color: active === i ? C.accent : C.muted,
            cursor: "pointer", fontSize: 12, fontWeight: active === i ? 600 : 400,
          }}>{comp.task}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 10, padding: "14px" }}>
          <div style={{ color: C.purple, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 PYTHON</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{c.python}</pre>
          <div style={{ marginTop: 10, color: C.muted, fontSize: 11 }}>
            {c.python.split("\n").length} line{c.python.split("\n").length > 1 ? "s" : ""}
          </div>
        </div>
        <div style={{ background: C.yellow + "18", border: `1px solid ${C.yellow}44`, borderRadius: 10, padding: "14px" }}>
          <div style={{ color: C.yellow, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>⚙️ ASSEMBLY</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{c.assembly}</pre>
          <div style={{ marginTop: 10, color: C.muted, fontSize: 11 }}>
            {c.assembly.split("\n").length} lines
          </div>
        </div>
      </div>

      <div style={{
        background: C.green + "18", border: `1px solid ${C.green}44`,
        borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted,
      }}>
        💡 Python handles all the low-level details for you. You focus on <strong style={{ color: C.green }}>what</strong> to do — Python figures out <strong style={{ color: C.green }}>how</strong>.
      </div>
    </div>
  );
}

// ── Quiz ───────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What does a mnemonic like 'MOV' or 'ADD' represent in Assembly?",
      options: [
        "A Python function",
        "A human-readable name for a binary CPU instruction",
        "A variable name",
        "A file on the hard drive",
      ],
      answer: 1,
      explain: "Mnemonics are short, memorable names for binary machine instructions. MOV = 10110000, ADD = 00000101, etc. An assembler converts them back to binary.",
    },
    {
      q: "What is a CPU register?",
      options: [
        "A type of memory on the hard drive",
        "A list of all Assembly instructions",
        "A tiny, ultra-fast storage location inside the CPU for temporary values",
        "The same thing as RAM",
      ],
      answer: 2,
      explain: "Registers (AX, BX, CX…) are tiny storage slots built directly into the CPU. They hold values the CPU is currently working with — much faster than RAM.",
    },
    {
      q: "How many machine code instructions does one Assembly instruction become?",
      options: ["Many instructions", "Exactly one", "Zero", "It depends — could be hundreds"],
      answer: 1,
      explain: "Assembly has a near 1:1 mapping with machine code. Each mnemonic translates to exactly one binary instruction. This is what makes it 'low-level'.",
    },
    {
      q: "Why do we NOT write programs in Assembly today (mostly)?",
      options: [
        "Assembly is too new — it hasn't been tested enough",
        "Assembly can't do maths",
        "Assembly is tedious, error-prone, and CPU-specific — high-level languages are far more productive",
        "Assembly is illegal in most countries",
      ],
      answer: 2,
      explain: "Assembly is still used for device drivers and embedded systems where speed is critical — but for most software, high-level languages are vastly more productive and portable.",
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
          {final === 4 ? "Excellent! You understand Assembly language clearly." :
            final >= 2 ? "Good work — revisit the instruction decoder to fill gaps." :
              "Try going through the Program Walkthrough again carefully."}
        </div>
        <div style={{ marginTop: 16, padding: "12px 20px", borderRadius: 8, background: C.green + "22", border: `1px solid ${C.green}`, color: C.green, fontWeight: 600 }}>
          Unit 2.3 Complete ✓
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
export default function Unit2_3({ student, onUnitComplete }) {
  const sections = [
    { id: "why", label: "Why Assembly?" },
    { id: "decoder", label: "Instruction Decoder" },
    { id: "walkthrough", label: "Program Walkthrough" },
    { id: "vs", label: "Assembly vs Python" },
    { id: "quiz", label: "Quick Quiz" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <WhyAssembly />,
    <InstructionDecoder />,
    <ProgramWalkthrough />,
    <AssemblyVsPython />,
    <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 2 › UNIT 2.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Assembly Language — One Step Up</div>
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
