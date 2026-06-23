import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8", pink: "#FF7B9C",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── The Big Picture: Language Ladder ──────────────────────────────────────
function LanguageLadder() {
  const [hovered, setHovered] = useState(null);

  const rungs = [
    {
      level: "Human Thought",
      icon: "🧠", color: C.teal,
      desc: "Natural language, vague, flexible, full of context",
      example: "\"Add my scores and show the total\"",
      closeness: "Closest to humans",
    },
    {
      level: "Python / JavaScript / Java",
      icon: "🐍", color: C.purple,
      desc: "Readable, English-like, handles memory & details for you",
      example: "print(sum(scores))",
      closeness: "High-level",
    },
    {
      level: "C / C++",
      icon: "⚙️", color: C.accent,
      desc: "Powerful, fast, but you manage memory yourself",
      example: "printf(\"%d\", total);",
      closeness: "Mid-level",
    },
    {
      level: "Assembly",
      icon: "📋", color: C.yellow,
      desc: "One instruction = one CPU operation. Very tedious.",
      example: "MOV AX, scores\nADD AX, BX\nINT 21h",
      closeness: "Low-level",
    },
    {
      level: "Machine Code (Binary)",
      icon: "🔌", color: C.red,
      desc: "Raw 0s and 1s. Only the CPU understands this.",
      example: "10110000 00000101\n00000101 00000011",
      closeness: "Closest to machine",
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Think of programming languages as a <strong style={{ color: C.accent }}>ladder</strong> between human thought and machine instructions.
        The higher up, the more human-friendly. The lower down, the closer to the CPU.
        Hover or tap any rung to explore it.
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
        {/* Ladder visual */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, paddingTop: 4 }}>
          <div style={{ color: C.teal, fontSize: 10, writing: "vertical-rl", marginBottom: 4 }}>👤</div>
          <div style={{ width: 2, flex: 1, background: `linear-gradient(to bottom, ${C.teal}, ${C.red})` }} />
          <div style={{ color: C.red, fontSize: 10, marginTop: 4 }}>🖥️</div>
        </div>

        {/* Rungs */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          {rungs.map((r, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setHovered(hovered === i ? null : i)}
              style={{
                background: hovered === i ? r.color + "22" : C.card,
                border: `1.5px solid ${hovered === i ? r.color : C.border}`,
                borderRadius: 10, padding: "10px 14px", cursor: "pointer",
                transition: "all 0.25s",
                boxShadow: hovered === i ? `0 0 12px ${r.color}33` : "none",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{r.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: r.color, fontWeight: 700, fontSize: 13 }}>{r.level}</div>
                  <div style={{ color: C.muted, fontSize: 11 }}>{r.closeness}</div>
                </div>
                <div style={{ color: C.muted, fontSize: 11 }}>{hovered === i ? "▲" : "▼"}</div>
              </div>
              {hovered === i && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>{r.desc}</div>
                  <pre style={{
                    fontFamily: "monospace", fontSize: 11, color: r.color,
                    background: C.bg, borderRadius: 6, padding: "8px 10px", margin: 0,
                  }}>{r.example}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 14, background: C.accent + "18", border: `1px solid ${C.accent}44`,
        borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted,
      }}>
        🔑 <strong style={{ color: C.accent }}>Key rule:</strong> The higher the language, the more the computer does for you — but the less direct control you have over performance.
      </div>
    </div>
  );
}

// ── What High-Level Languages Handle for You ───────────────────────────────
function AutomaticFeatures() {
  const [active, setActive] = useState(null);

  const features = [
    {
      icon: "🗑️", name: "Memory Management", color: C.green,
      problem: "In C/Assembly, you must manually allocate and free memory. Forget to free it → memory leak. Free it twice → crash.",
      solution: "Python automatically tracks which memory is in use and cleans it up when you're done. You never think about it.",
      analogy: "Like a restaurant that clears your table without you asking — vs one where you must return your own plate to the kitchen.",
    },
    {
      icon: "🛡️", name: "Type Safety", color: C.accent,
      problem: "In machine code, a number and a letter are just bytes. Add them incorrectly and you get garbage — or a security hole.",
      solution: "Python knows that 5 is a number and \"hello\" is text. It warns you before you do something that doesn't make sense.",
      analogy: "Like a smart calculator that says \"I can't add apples to dollars\" instead of giving a nonsense answer.",
    },
    {
      icon: "📦", name: "Built-in Data Structures", color: C.purple,
      problem: "In Assembly, storing a list of 10 numbers requires manually managing 10 memory addresses.",
      solution: "Python gives you lists, dictionaries, sets — ready to use in one line. scores = [85, 90, 78] just works.",
      analogy: "Like moving into a furnished apartment vs building your own furniture from wood and nails.",
    },
    {
      icon: "🔁", name: "Loops & Conditions", color: C.yellow,
      problem: "In Assembly, a loop requires: a counter register, a CMP instruction, a JL (jump if less) instruction, and a label.",
      solution: "Python: for i in range(10): — that's the entire loop. One readable line.",
      analogy: "Giving someone directions as 'turn left at the mosque' vs GPS coordinates in degrees, minutes, seconds.",
    },
    {
      icon: "📚", name: "Standard Library", color: C.orange,
      problem: "In Assembly, even reading a file requires dozens of system calls and byte-level manipulation.",
      solution: "Python: open('file.txt').read() — done. Thousands of functions for maths, files, web, images, AI are included.",
      analogy: "A Swiss Army knife vs having to forge your own tools every time you need them.",
    },
    {
      icon: "🌍", name: "Portability", color: C.teal,
      problem: "Assembly code written for an Intel CPU won't run on an ARM chip (your phone). You'd rewrite everything.",
      solution: "Python runs on Windows, Mac, Linux, Raspberry Pi, Android — the same code, unchanged.",
      analogy: "A universal power adapter vs carrying country-specific plugs for every device.",
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        High-level languages don't just make code shorter — they <strong style={{ color: C.accent }}>handle entire categories of problems</strong> automatically.
        Tap each feature to see what it does and why it matters.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {features.map((f, i) => (
          <div key={i} onClick={() => setActive(active === i ? null : i)} style={{
            background: active === i ? f.color + "18" : C.card,
            border: `1.5px solid ${active === i ? f.color : C.border}`,
            borderRadius: 10, padding: "12px", cursor: "pointer", transition: "all 0.25s",
          }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>{f.icon}</span>
              <span style={{ color: f.color, fontWeight: 700, fontSize: 12 }}>{f.name}</span>
            </div>
            {active === i && (
              <div style={{ marginTop: 10 }}>
                <div style={{ background: C.red + "18", border: `1px solid ${C.red}33`, borderRadius: 6, padding: "7px 10px", fontSize: 11, color: C.muted, marginBottom: 7 }}>
                  <strong style={{ color: C.red }}>Without it:</strong> {f.problem}
                </div>
                <div style={{ background: C.green + "18", border: `1px solid ${C.green}33`, borderRadius: 6, padding: "7px 10px", fontSize: 11, color: C.muted, marginBottom: 7 }}>
                  <strong style={{ color: C.green }}>Python handles it:</strong> {f.solution}
                </div>
                <div style={{ background: C.yellow + "18", border: `1px solid ${C.yellow}33`, borderRadius: 6, padding: "7px 10px", fontSize: 11, color: C.muted }}>
                  🎯 {f.analogy}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Language Family Explorer ───────────────────────────────────────────────
function LanguageFamilies() {
  const [active, setActive] = useState(0);

  const families = [
    {
      name: "General Purpose",
      color: C.purple,
      icon: "🔧",
      desc: "Can build almost anything — web apps, games, AI, tools. The Swiss Army knives of programming.",
      langs: [
        { name: "Python", use: "AI, data science, web, automation", level: "Beginner friendly" },
        { name: "Java", use: "Android apps, enterprise software", level: "Intermediate" },
        { name: "C++", use: "Games, system software, performance", level: "Advanced" },
        { name: "JavaScript", use: "Web browsers, web apps", level: "Beginner friendly" },
      ],
    },
    {
      name: "Web Specific",
      color: C.accent,
      icon: "🌐",
      desc: "Designed specifically for building websites and web applications.",
      langs: [
        { name: "HTML", use: "Structure of web pages", level: "Not a programming language — markup" },
        { name: "CSS", use: "Visual styling of web pages", level: "Not a programming language — styling" },
        { name: "PHP", use: "Server-side web pages", level: "Intermediate" },
        { name: "TypeScript", use: "Safer version of JavaScript", level: "Intermediate" },
      ],
    },
    {
      name: "Data & AI",
      color: C.green,
      icon: "🤖",
      desc: "Languages and tools built for crunching numbers, training AI models, and working with data.",
      langs: [
        { name: "Python", use: "Machine learning, data analysis", level: "Beginner friendly" },
        { name: "R", use: "Statistical computing, graphs", level: "Intermediate" },
        { name: "Julia", use: "High-performance maths", level: "Advanced" },
        { name: "SQL", use: "Querying databases", level: "Beginner friendly" },
      ],
    },
    {
      name: "Systems & Embedded",
      color: C.orange,
      icon: "⚡",
      desc: "Used where speed, control, and direct hardware access matter — like operating systems and microcontrollers.",
      langs: [
        { name: "C", use: "Operating systems, device drivers", level: "Advanced" },
        { name: "Rust", use: "Safe systems programming", level: "Advanced" },
        { name: "Assembly", use: "Direct CPU programming", level: "Expert" },
        { name: "MicroPython", use: "Python for microcontrollers", level: "Intermediate" },
      ],
    },
  ];

  const f = families[active];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Not all high-level languages are the same — they're designed for different jobs.
        Explore the four main families.
      </p>

      {/* Family tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {families.map((fam, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: "7px 14px", borderRadius: 20,
            background: active === i ? fam.color + "33" : C.card,
            border: `1.5px solid ${active === i ? fam.color : C.border}`,
            color: active === i ? fam.color : C.muted,
            cursor: "pointer", fontSize: 12, fontWeight: active === i ? 700 : 400,
            display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
          }}>
            {fam.icon} {fam.name}
          </button>
        ))}
      </div>

      {/* Detail */}
      <div style={{
        background: f.color + "14", border: `1.5px solid ${f.color}55`,
        borderRadius: 12, padding: "16px", marginBottom: 0,
      }}>
        <div style={{ color: f.color, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
          {f.icon} {f.name} Languages
        </div>
        <div style={{ color: C.muted, fontSize: 13, marginBottom: 14 }}>{f.desc}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {f.langs.map((lang, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: C.bg, borderRadius: 8, padding: "10px 12px",
              border: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: f.color + "22", border: `1px solid ${f.color}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: f.color, fontWeight: 700, fontSize: 10, textAlign: "center",
              }}>{lang.name.slice(0, 2)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>{lang.name}</div>
                <div style={{ color: C.muted, fontSize: 11 }}>{lang.use}</div>
              </div>
              <div style={{
                background: f.color + "22", borderRadius: 20, padding: "3px 10px",
                fontSize: 10, color: f.color, flexShrink: 0,
              }}>{lang.level}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Match the Language ─────────────────────────────────────────────────────
function MatchChallenge() {
  const scenarios = [
    {
      task: "You want to build an AI chatbot that learns from text",
      answer: "Python",
      options: ["Assembly", "Python", "HTML", "Machine Code"],
      reason: "Python dominates AI and machine learning with libraries like TensorFlow, PyTorch, and scikit-learn.",
    },
    {
      task: "You're designing the visual layout of a webpage — colours, fonts, spacing",
      answer: "CSS",
      options: ["C++", "Python", "CSS", "Assembly"],
      reason: "CSS (Cascading Style Sheets) is specifically designed for controlling the appearance of web pages.",
    },
    {
      task: "You're writing the operating system kernel that controls hardware directly",
      answer: "C",
      options: ["C", "JavaScript", "Python", "SQL"],
      reason: "C gives direct hardware access and maximum performance — Linux, Windows, and macOS kernels are all written in C.",
    },
    {
      task: "You need to query a database to find all students who scored above 80",
      answer: "SQL",
      options: ["HTML", "Assembly", "SQL", "Java"],
      reason: "SQL (Structured Query Language) is purpose-built for querying and managing databases.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === scenarios[current].answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current < scenarios.length - 1) { setCurrent(c => c + 1); setSelected(null); }
    else setDone(true);
  };

  if (done) {
    const final = score + (selected === scenarios[current].answer ? 1 : 0);
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{final >= 3 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>
          You matched {final} / {scenarios.length} correctly!
        </div>
        <div style={{ color: C.muted, marginTop: 8 }}>
          {final === 4 ? "Perfect — you know which language fits which job!" :
            "Good attempt — revisit the Language Families section to strengthen this."}
        </div>
        <div style={{
          marginTop: 16, padding: "12px 20px", borderRadius: 8,
          background: C.green + "22", border: `1px solid ${C.green}`,
          color: C.green, fontWeight: 600,
        }}>Challenge Complete ✓</div>
      </div>
    );
  }

  const sc = scenarios[current];
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Which language would you choose? Pick the best tool for each job.
      </p>
      <div style={{
        background: C.card, borderRadius: 10, padding: "16px", marginBottom: 16,
        border: `1px solid ${C.border}`,
      }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>
          SCENARIO {current + 1} OF {scenarios.length}
        </div>
        <div style={{ color: C.text, fontSize: 14, fontWeight: 600, lineHeight: 1.6 }}>
          {sc.task}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {sc.options.map((opt, i) => {
          let bg = C.card, border = C.border, col = C.text;
          if (selected !== null) {
            if (opt === sc.answer) { bg = C.green + "22"; border = C.green; col = C.green; }
            else if (opt === selected) { bg = C.red + "22"; border = C.red; col = C.red; }
          }
          return (
            <button key={i} onClick={() => choose(opt)} style={{
              padding: "14px", borderRadius: 10,
              background: bg, border: `1.5px solid ${border}`, color: col,
              cursor: selected !== null ? "default" : "pointer",
              fontWeight: 600, fontSize: 14, fontFamily: "monospace",
              transition: "all 0.25s",
            }}>
              {selected !== null && opt === sc.answer ? "✓ " : selected === opt && opt !== sc.answer ? "✗ " : ""}{opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <>
          <div style={{
            background: C.purple + "18", border: `1px solid ${C.purple}44`,
            borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted, marginBottom: 10,
          }}>💡 {sc.reason}</div>
          <button onClick={next} style={{
            width: "100%", padding: "10px", borderRadius: 8,
            background: C.accentGlow, border: "none", color: "#fff",
            fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>{current < scenarios.length - 1 ? "Next Scenario →" : "See Results"}</button>
        </>
      )}
    </div>
  );
}

// ── Module 2 Wrap-up Quiz ──────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What is the main reason high-level languages were invented?",
      options: [
        "To make programs run faster than machine code",
        "To let humans write readable, productive code without managing CPU details",
        "Because machine code was too expensive to run",
        "To replace the need for computers entirely",
      ],
      answer: 1,
      explain: "High-level languages exist to make programmers more productive. The language handles low-level details so you can focus on solving the actual problem.",
    },
    {
      q: "Python automatically handles memory for you. What is this feature called?",
      options: ["Manual allocation", "Garbage collection", "Memory assembly", "Stack overflow"],
      answer: 1,
      explain: "Python's garbage collector automatically finds and frees memory that is no longer in use. In C, programmers must do this manually — a common source of bugs.",
    },
    {
      q: "Which of the following is the HIGHEST level — closest to human thought?",
      options: ["Assembly", "Machine Code", "Python", "C"],
      answer: 2,
      explain: "Python is the highest-level language listed — it reads almost like English and handles the most details automatically. Machine code is the lowest.",
    },
    {
      q: "You want to build a mobile game with high performance graphics. Which language fits best?",
      options: ["HTML", "SQL", "C++ or C", "Assembly"],
      answer: 2,
      explain: "High-performance games need direct control over hardware resources. C++ gives high-level structure while being fast enough for real-time graphics — it's the standard for game engines like Unreal.",
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
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>
          You scored {final} / {questions.length}
        </div>
        <div style={{ color: C.muted, marginTop: 8 }}>
          {final === 4 ? "Outstanding! Module 2 is fully mastered." :
            final >= 2 ? "Good — review the Language Ladder and Families sections once more." :
              "Go back through the unit and try again — you'll get it!"}
        </div>
        <div style={{
          marginTop: 16, padding: "16px 20px", borderRadius: 10,
          background: `linear-gradient(135deg, ${C.purple}22, ${C.green}22)`,
          border: `1px solid ${C.green}`,
        }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
            🎓 Module 2 Complete!
          </div>
          <div style={{ color: C.muted, fontSize: 13 }}>
            You now understand the full stack — from binary to Python. Next up: <strong style={{ color: C.accent }}>Module 3 — How Code Runs</strong>. We'll explore compilation vs interpretation and exactly where Python fits.
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
export default function Unit2_4({ student, onUnitComplete }) {
  const sections = [
    { id: "ladder", label: "Language Ladder" },
    { id: "features", label: "What They Handle" },
    { id: "families", label: "Language Families" },
    { id: "match", label: "Match Challenge" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <LanguageLadder />,
    <AutomaticFeatures />,
    <LanguageFamilies />,
    <MatchChallenge />,
    <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 2 › UNIT 2.4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>High-Level Languages — Why They Exist</div>
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
