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
        You've written a lot from scratch — even square roots and random numbers by hand. But Python ships with a
        huge <strong style={{ color: C.text }}>standard library</strong> of ready-made code, and millions more
        packages are a command away. A <strong style={{ color: C.teal }}>module</strong> is just a file of code you
        can <code style={{ color: C.teal }}>import</code> and reuse.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>❌ Reinvent it</div>
          <pre style={{ fontFamily: "monospace", fontSize: 11, color: C.text, margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>{`# square root by hand?\nguess = n / 2\nfor i in range(20):\n    guess = (guess + n/guess)/2`}</pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>✅ Import it</div>
          <pre style={{ fontFamily: "monospace", fontSize: 11, color: C.text, margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>{`import math\nprint(math.sqrt(n))`}</pre>
        </div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>"Batteries included."</strong> Python's standard library has modules
        for maths, randomness, dates, files, the web and more — all free, already installed. Don't rebuild; import.
      </div>
    </div>
  );
}

// ── Section 2: import forms ──────────────────────────────────────────────────
function ImportForms() {
  const [mode, setMode] = useState("plain");
  const modes = {
    plain: {
      label: "import math", color: C.teal,
      code: "import math\n\nprint(math.sqrt(16))   # 4.0\nprint(math.pi)         # 3.14159...",
      note: "Import the whole module; reach inside with the dot: math.sqrt, math.pi. The name stays clearly labelled.",
    },
    from: {
      label: "from … import", color: C.orange,
      code: "from random import randint\n\nprint(randint(1, 6))   # a dice roll, no 'random.' prefix",
      note: "Pull specific names in directly, so you can use randint() without the module prefix. Handy for a few frequent tools.",
    },
    alias: {
      label: "import … as", color: C.purple,
      code: "import statistics as st\n\nprint(st.mean([80, 90, 100]))   # 90",
      note: "Give a module a short nickname. You'll see this constantly later: import numpy as np, import pandas as pd.",
    },
  };
  const m = modes[mode];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Three ways to bring code in. All put an <code style={{ color: C.teal }}>import</code> line at the top of your
        file.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(modes).map(([k, mv]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, minWidth: 120, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "monospace",
            background: mode === k ? mv.color + "22" : C.card,
            border: `1.5px solid ${mode === k ? mv.color : C.border}`, color: mode === k ? mv.color : C.muted,
          }}>{mv.label}</button>
        ))}
      </div>

      <pre style={{ background: "#0A0E14", border: `1px solid ${m.color}44`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.8, margin: 0, whiteSpace: "pre" }}>{m.code}</pre>

      <div style={{ marginTop: 14, background: m.color + "14", border: `1px solid ${m.color}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
        {m.note}
      </div>

      <div style={{ marginTop: 14, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>A few standard modules worth knowing:</strong>{" "}
        <code style={{ color: C.text }}>math</code>, <code style={{ color: C.text }}>random</code>,{" "}
        <code style={{ color: C.text }}>statistics</code>, <code style={{ color: C.text }}>datetime</code>,{" "}
        <code style={{ color: C.text }}>json</code>. You'll meet datetime and json in Module 12.
      </div>
    </div>
  );
}

// ── Section 3: your own modules ──────────────────────────────────────────────
function OwnModule() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Here's the neat part: <strong style={{ color: C.text }}>any .py file you write is a module.</strong> Put
        reusable functions in one file and import them into another — exactly how big programs stay organised.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div style={{ background: "#0A0E14", border: `1px solid ${C.teal}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, marginBottom: 8, fontFamily: "monospace" }}>marks_tools.py</div>
          <pre style={{ fontFamily: "monospace", fontSize: 11, color: C.text, margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>{`def average(nums):\n    return sum(nums) / len(nums)\n\ndef passed(mark):\n    return mark >= 50`}</pre>
        </div>
        <div style={{ background: "#0A0E14", border: `1px solid ${C.orange}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, marginBottom: 8, fontFamily: "monospace" }}>main.py</div>
          <pre style={{ fontFamily: "monospace", fontSize: 11, color: C.text, margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>{`from marks_tools import average\n\nscores = [80, 90, 100]\nprint(average(scores))   # 90.0`}</pre>
        </div>
      </div>

      <div style={{ background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>The import name is the filename without .py.</strong>{" "}
        <code style={{ color: C.purple }}>marks_tools.py</code> becomes <code style={{ color: C.purple }}>import marks_tools</code>.
        This is how you break a big project into tidy, reusable files.
      </div>
    </div>
  );
}

// ── Section 4: pip & venv ────────────────────────────────────────────────────
function PipVenv() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Beyond the standard library is <strong style={{ color: C.text }}>PyPI</strong> — hundreds of thousands of
        community packages. You install them with <code style={{ color: C.green }}>pip</code>, Python's package
        manager, from your terminal (not inside a .py file).
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 11, marginBottom: 8 }}>in the terminal:</div>
        <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.green, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`pip install requests      # download a package
# then, in your .py file:
import requests`}</pre>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.teal}44`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
        <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>🧪 Virtual environments (venv)</div>
        <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.7, marginBottom: 8 }}>
          Different projects need different package versions. A <strong style={{ color: C.text }}>virtual
          environment</strong> is a private, isolated box of packages for one project — so Project A's libraries
          never clash with Project B's.
        </div>
        <pre style={{ fontFamily: "monospace", fontSize: 11.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`python -m venv env      # create an isolated environment
# activate it, then pip install inside it`}</pre>
      </div>

      <div style={{ background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>The ecosystem is Python's superpower.</strong> pip + venv are how
        you'll soon install NumPy, Pandas and Matplotlib for the data modules — each project in its own clean box.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What is a module in Python?",
      options: [
        "A special kind of loop",
        "A file of Python code you can import and reuse",
        "A type of variable",
        "A built-in error",
      ],
      answer: 1,
      explain: "A module is just a .py file. Python's standard library is a big collection of them, and any file you write is one too.",
    },
    {
      q: "After  from random import randint,  how do you call it?",
      options: ["random.randint(1, 6)", "randint(1, 6)", "import.randint(1, 6)", "randint.random(1, 6)"],
      answer: 1,
      explain: "'from random import randint' pulls randint directly into your namespace, so you call it without the random. prefix.",
    },
    {
      q: "You wrote  marks_tools.py.  How do you import its  average  function?",
      options: [
        "import average from marks_tools",
        "from marks_tools import average",
        "import marks_tools.py",
        "from marks_tools.py import average",
      ],
      answer: 1,
      explain: "Use the filename WITHOUT .py: from marks_tools import average. Your own files are modules just like the standard library.",
    },
    {
      q: "What are pip and venv for?",
      options: [
        "pip runs your code; venv debugs it",
        "pip installs third-party packages from PyPI; venv gives each project its own isolated package box",
        "They're the same tool",
        "They replace import",
      ],
      answer: 1,
      explain: "pip downloads packages the standard library doesn't include; a venv keeps each project's packages separate so versions don't clash.",
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
          {score === 4 ? "You can stand on the shoulders of the whole Python ecosystem." :
            score >= 2 ? "Good — replay Import Forms to lock in the three styles." :
              "Revisit Import Forms and Your Own Modules, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 11.2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            import, your own modules, and pip + venv for the wider ecosystem.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Module 12 — Working with Real Data.</strong> Dates, JSON,
            and your first taste of NumPy and Pandas — the on-ramp to data science.
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
export default function Unit11_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "import", label: "import Forms" },
    { id: "own", label: "Your Own Modules" },
    { id: "pip", label: "pip & venv" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Don't Reinvent — Import</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Three Ways to import</h3><ImportForms /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Your Own Modules</h3><OwnModule /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>pip &amp; Virtual Environments</h3><PipVenv /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on modules and the ecosystem.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📦</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 11 › UNIT 11.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Modules &amp; the Ecosystem</div>
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
