import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: Two Ways to Run Python ────────────────────────────────────────
function TwoWays() {
  const [pick, setPick] = useState("browser");

  const ways = {
    browser: {
      color: C.green, icon: "🌐", title: "Right here, in your browser",
      points: [
        "Nothing to install — every lesson runs on this site.",
        "Works on any laptop, phone, or lab computer.",
        "Perfect for learning the ideas, one interaction at a time.",
      ],
      foot: "You can complete this entire course without installing anything. This path is always open.",
    },
    machine: {
      color: C.accent, icon: "💻", title: "On your own machine",
      points: [
        "Install real Python once, then write and run your own programs.",
        "Use IDLE (the simple built-in editor) or VS Code (the professional one).",
        "This is what you'll do in a lab, an internship, or a real project.",
      ],
      foot: "Optional — but if you want to feel like a real programmer, this is the door. This unit shows you how.",
    },
  };
  const w = ways[pick];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        In Module 3 you learned what the <strong style={{ color: C.text }}>interpreter</strong> is — the program
        that reads Python and runs it. There are two places you can meet it. Neither is "better"; they're for
        different moments. Click each to see what it's for.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {Object.entries(ways).map(([k, v]) => (
          <button key={k} onClick={() => setPick(k)} style={{
            flex: 1, padding: "11px 8px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: pick === k ? v.color + "22" : C.card,
            border: `1.5px solid ${pick === k ? v.color : C.border}`,
            color: pick === k ? v.color : C.muted, transition: "all 0.2s",
          }}>{v.icon} {k === "browser" ? "This Site" : "Your Machine"}</button>
        ))}
      </div>

      <div style={{ background: C.card, border: `1.5px solid ${w.color}`, borderRadius: 10, padding: 18 }}>
        <div style={{ color: w.color, fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{w.icon} {w.title}</div>
        {w.points.map((p, i) => (
          <div key={i} style={{ color: C.text, fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>
            <span style={{ color: w.color, marginRight: 8 }}>▸</span>{p}
          </div>
        ))}
        <div style={{ marginTop: 12, background: w.color + "14", border: `1px solid ${w.color}44`, borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
          {w.foot}
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>You're free to keep learning right here.</strong> But this unit is
        your map to running Python on your own computer — installing it, and using IDLE or VS Code — whenever
        you're ready to step out of the browser.
      </div>
    </div>
  );
}

// ── Section 2: Install Python + the REPL ─────────────────────────────────────
const INSTALL_STEPS = [
  { n: "1", t: "Go to python.org", d: "Open python.org → Downloads. The site offers the right version for your OS (Windows / Mac / Linux)." },
  { n: "2", t: "Run the installer", d: "Open the downloaded file. On Windows, TICK the box \"Add Python to PATH\" — this one checkbox saves a lot of pain later." },
  { n: "3", t: "Check it worked", d: "Open a terminal (Command Prompt / Terminal) and type  python --version . Seeing a version number means Python is ready." },
];

function InstallAndRepl() {
  const [line, setLine] = useState("");
  const [log, setLog] = useState([
    { cmd: null, out: "Python 3.x  —  the >>> prompt is waiting. Type something below." },
  ]);

  // Tiny simulated REPL: handles print("...") and one simple arithmetic operation.
  const run = () => {
    const src = line.trim();
    if (!src) return;
    let out;
    const printMatch = src.match(/^print\((["'])(.*)\1\)$/);
    const mathMatch = src.match(/^(-?\d+)\s*(\*\*|\/\/|[+\-*/%])\s*(-?\d+)$/);
    if (printMatch) {
      out = printMatch[2];
    } else if (mathMatch) {
      const a = Number(mathMatch[1]), op = mathMatch[2], b = Number(mathMatch[3]);
      if ((op === "/" || op === "//" || op === "%") && b === 0) {
        out = "ZeroDivisionError: division by zero";
      } else if (op === "+") out = String(a + b);
      else if (op === "-") out = String(a - b);
      else if (op === "*") out = String(a * b);
      else if (op === "**") out = String(Math.pow(a, b));
      else if (op === "//") out = String(Math.floor(a / b));
      else if (op === "%") out = String(((a % b) + b) % b);
      else { // plain division is a float in Python
        const r = a / b;
        out = Number.isInteger(r) ? r + ".0" : String(r);
      }
    } else {
      out = "Try  print(\"Hello!\")  or a little math like  2 + 3";
    }
    setLog((L) => [...L, { cmd: src, out }]);
    setLine("");
  };

  const chips = ['print("Hello, Python!")', "2 + 3", "10 // 3", "2 ** 5"];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Installing Python takes three steps. Then you get the <strong style={{ color: C.teal }}>REPL</strong> — the{" "}
        <code style={{ color: C.teal }}>&gt;&gt;&gt;</code> prompt where you type one line and instantly see the
        result, like a calculator that speaks Python.
      </p>

      <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
        {INSTALL_STEPS.map((s) => (
          <div key={s.n} style={{ display: "flex", gap: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ minWidth: 26, height: 26, borderRadius: "50%", background: C.accentGlow, color: "#fff", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.n}</div>
            <div>
              <div style={{ color: C.accent, fontWeight: 600, fontSize: 13 }}>{s.t}</div>
              <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6, marginTop: 2 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>▸ Try the REPL yourself (a mini simulation):</div>
      <div style={{ background: "#0A0E14", border: `1px solid ${C.teal}55`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 13 }}>
        {log.map((entry, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            {entry.cmd !== null && <div style={{ color: C.text }}><span style={{ color: C.teal }}>&gt;&gt;&gt; </span>{entry.cmd}</div>}
            <div style={{ color: entry.out.includes("Error") ? C.red : C.green }}>{entry.out}</div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <span style={{ color: C.teal }}>&gt;&gt;&gt;</span>
          <input
            value={line}
            onChange={(e) => setLine(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") run(); }}
            placeholder="type here, then press Enter"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontFamily: "monospace", fontSize: 13 }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
        {chips.map((c) => (
          <button key={c} onClick={() => setLine(c)} style={{
            padding: "5px 10px", borderRadius: 6, background: C.card, border: `1px solid ${C.border}`,
            color: C.teal, fontFamily: "monospace", fontSize: 11.5, cursor: "pointer",
          }}>{c}</button>
        ))}
      </div>

      <div style={{ marginTop: 16, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>The REPL is instant and throwaway.</strong> Type a line, get an answer.
        It's perfect for quick experiments — "what does 2 ** 10 give?" — but it forgets everything the moment you
        close it. For programs you want to keep, you need a <em>file</em>. That's next.
      </div>
    </div>
  );
}

// ── Section 3: Interactive vs Script Mode ────────────────────────────────────
function InteractiveVsScript() {
  const [mode, setMode] = useState("repl");

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Two ways to talk to the interpreter. The REPL is a live conversation, line by line. A{" "}
        <strong style={{ color: C.accent }}>script</strong> is a written recipe — a saved{" "}
        <code style={{ color: C.accent }}>.py</code> file that runs top to bottom, the same way every time. Toggle
        and compare.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setMode("repl")} style={{
          flex: 1, padding: "9px 8px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
          background: mode === "repl" ? C.teal + "22" : C.card,
          border: `1.5px solid ${mode === "repl" ? C.teal : C.border}`, color: mode === "repl" ? C.teal : C.muted,
        }}>💬 Interactive (REPL)</button>
        <button onClick={() => setMode("script")} style={{
          flex: 1, padding: "9px 8px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
          background: mode === "script" ? C.accent + "22" : C.card,
          border: `1.5px solid ${mode === "script" ? C.accent : C.border}`, color: mode === "script" ? C.accent : C.muted,
        }}>📄 Script (hello.py)</button>
      </div>

      {mode === "repl" ? (
        <div style={{ background: "#0A0E14", border: `1px solid ${C.teal}55`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 13, lineHeight: 1.9 }}>
          <div><span style={{ color: C.teal }}>&gt;&gt;&gt; </span>2 + 3</div>
          <div style={{ color: C.green }}>5</div>
          <div><span style={{ color: C.teal }}>&gt;&gt;&gt; </span>print("hi")</div>
          <div style={{ color: C.green }}>hi</div>
          <div style={{ color: C.muted, marginTop: 8, fontFamily: "'Segoe UI', sans-serif", fontSize: 12 }}>Close the window → all of this is gone. Great for trying things, bad for keeping them.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: C.card, border: `1px solid ${C.accent}55`, borderRadius: 10, padding: 14 }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 8 }}>📄 hello.py (saved file)</div>
            <pre style={{ fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`print("Hello!")\nprint(2 + 3)`}</pre>
          </div>
          <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 8 }}>▶ python hello.py</div>
            <pre style={{ fontFamily: "monospace", fontSize: 12.5, color: C.green, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`Hello!\n5`}</pre>
            <div style={{ color: C.muted, marginTop: 8, fontSize: 12 }}>Saved forever. Run it again tomorrow, share it, improve it.</div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 16, background: C.accent + "15", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.accent }}>REPL for experiments, scripts for programs.</strong> Everything you
        build from Unit 4.1 onwards is really a script — a <code style={{ color: C.accent }}>.py</code> file you
        save and run. The editor you save it in is the last piece.
      </div>
    </div>
  );
}

// ── Section 4: IDLE & VS Code ────────────────────────────────────────────────
function Editors() {
  const [ed, setEd] = useState("idle");

  const editors = {
    idle: {
      color: C.green, icon: "🐍", name: "IDLE",
      tag: "Comes free with Python · simplest start",
      steps: [
        "It's already installed — you got it with Python. Search your computer for \"IDLE\".",
        "It opens a REPL shell. For a program: File → New File.",
        "Type your code, save as  hello.py  (Ctrl+S).",
        "Press F5 (Run → Run Module). Output appears in the shell window.",
      ],
      foot: "Zero extra setup — the reason most college labs start here.",
    },
    vscode: {
      color: C.accent, icon: "🧩", name: "VS Code",
      tag: "A professional editor · what you'll use long-term",
      steps: [
        "Download VS Code (code.visualstudio.com) and install it.",
        "Install the \"Python\" extension (from Microsoft) inside VS Code.",
        "Open your folder, create  hello.py , and pick your Python interpreter if asked.",
        "Click the ▶ Run button, or type  python hello.py  in the built-in terminal.",
      ],
      foot: "More to set up, but it grows with you — projects, debugging, Git, everything.",
    },
  };
  const e = editors[ed];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A script is just a text file — you need an editor to write it in. Two great choices, both teaching the same
        Python. Start with <strong style={{ color: C.green }}>IDLE</strong> (nothing to install); move to{" "}
        <strong style={{ color: C.accent }}>VS Code</strong> when you want the pro tools.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {Object.entries(editors).map(([k, v]) => (
          <button key={k} onClick={() => setEd(k)} style={{
            flex: 1, padding: "11px 8px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: ed === k ? v.color + "22" : C.card,
            border: `1.5px solid ${ed === k ? v.color : C.border}`, color: ed === k ? v.color : C.muted,
          }}>{v.icon} {v.name}</button>
        ))}
      </div>

      <div style={{ background: C.card, border: `1.5px solid ${e.color}`, borderRadius: 10, padding: 18 }}>
        <div style={{ color: e.color, fontWeight: 700, fontSize: 15 }}>{e.icon} {e.name}</div>
        <div style={{ color: C.muted, fontSize: 12, marginBottom: 14 }}>{e.tag}</div>
        {e.steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 9 }}>
            <div style={{ minWidth: 22, height: 22, borderRadius: "50%", background: e.color + "22", border: `1px solid ${e.color}`, color: e.color, fontWeight: 700, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
            <div style={{ color: C.text, fontSize: 12.5, lineHeight: 1.6, fontFamily: /[A-Za-z]\.py|python |Ctrl|F5/.test(s) ? "inherit" : "inherit" }}>{s}</div>
          </div>
        ))}
        <div style={{ marginTop: 10, background: e.color + "14", border: `1px solid ${e.color}44`, borderRadius: 8, padding: "10px 12px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
          {e.foot}
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Same Python, different desk.</strong> IDLE and VS Code both run the
        exact interpreter you installed — they just give you nicer places to write and run your{" "}
        <code style={{ color: C.green }}>.py</code> files. Pick one and you're ready for Unit 4.1.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What is the REPL (the >>> prompt)?",
      options: [
        "A place to install Python",
        "An interactive prompt where you type one line and immediately see its result",
        "A website that runs Python for you",
        "The name of Python's error messages",
      ],
      answer: 1,
      explain: "REPL = Read-Eval-Print Loop: it reads your line, runs it, prints the answer, and waits for the next — like a calculator that speaks Python. Great for quick experiments.",
    },
    {
      q: "On Windows, why tick \"Add Python to PATH\" during install?",
      options: [
        "It makes Python run faster",
        "So you can type  python  in any terminal and the computer finds it",
        "It installs IDLE",
        "It's required or Python won't install at all",
      ],
      answer: 1,
      explain: "PATH is the list of places your terminal searches for programs. Adding Python to it means  python --version  and  python hello.py  work from any folder — skipping it is the #1 beginner headache.",
    },
    {
      q: "You write code in the REPL, then close the window. What happens to it?",
      options: [
        "It's saved automatically",
        "It's gone — the REPL doesn't keep your code; only a saved .py file does",
        "It moves to IDLE",
        "It turns into a script",
      ],
      answer: 1,
      explain: "The REPL is throwaway by design. To keep a program, write it in a file (hello.py) and save it — that's script mode, which runs the same way every time.",
    },
    {
      q: "What's the main difference between IDLE and VS Code for a beginner?",
      options: [
        "IDLE runs a different Python than VS Code",
        "IDLE comes free with Python and needs no setup; VS Code is more powerful but needs installing and a Python extension",
        "VS Code can't run .py files",
        "IDLE is only for experts",
      ],
      answer: 1,
      explain: "Both run the exact same interpreter. IDLE is the zero-setup starting point (bundled with Python); VS Code is the professional editor you grow into. Same Python, nicer desk.",
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
          {score === 4 ? "You know how to run Python for real — the door is open whenever you want it." :
            score >= 2 ? "Nice — skim the Interactive vs Script section once more to lock it in." :
              "Revisit the REPL and the IDLE/VS Code steps, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 4.0 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Whether you stay in the browser or open IDLE / VS Code, you now know how to run Python.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 4.1 — Your First Program.</strong>{" "}
            Time to actually write one: print, comments, and the anatomy of a line of Python.
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
export default function Unit4_0({ student, onUnitComplete }) {
  const sections = [
    { id: "ways", label: "Two Ways" },
    { id: "install", label: "Install & REPL" },
    { id: "script", label: "REPL vs Script" },
    { id: "editors", label: "IDLE & VS Code" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Two Ways to Run Python</h3><TwoWays /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Install Python &amp; Meet the REPL</h3><InstallAndRepl /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Interactive vs Script Mode</h3><InteractiveVsScript /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Your Editor: IDLE &amp; VS Code</h3><Editors /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on running Python yourself.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💻</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 4 › UNIT 4.0</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Running Python on Your Own Machine</div>
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
