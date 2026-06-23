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
  pink: "#FF7B9C",
  teal: "#39D0D8",
  text: "#E6EDF3",
  muted: "#8B949E",
  border: "#30363D",
};

const ERA_DATA = [
  {
    year: "1843",
    era: "The First Programmer",
    icon: "👩‍💻",
    color: C.pink,
    person: "Ada Lovelace",
    invention: "First Algorithm",
    country: "🇬🇧 England",
    detail:
      "Ada Lovelace wrote the world's first algorithm — intended for Charles Babbage's mechanical Analytical Engine. She imagined that machines could go beyond pure calculation and compose music or solve any logical problem. She is considered the world's first computer programmer, over a century before the first real computer existed.",
    impact: "Proved that machines could follow symbolic instructions, not just crunch numbers.",
    funFact: "The programming language 'Ada' (used in aircraft and military systems) is named after her.",
  },
  {
    year: "1936",
    era: "The Idea of a Computer",
    icon: "📜",
    color: C.accent,
    person: "Alan Turing",
    invention: "Turing Machine",
    country: "🇬🇧 England",
    detail:
      "Alan Turing described a theoretical machine that could simulate any computation — the Turing Machine. This was a mathematical model, not a real device, but it proved that a single machine with the right instructions could solve any solvable problem. This became the blueprint for every computer ever built.",
    impact: "Defined what computation IS. Every computer today is essentially a Turing Machine.",
    funFact: "Turing also broke the Nazi Enigma cipher in WWII, arguably shortening the war by years.",
  },
  {
    year: "1945",
    era: "The First Real Computers",
    icon: "🏭",
    color: C.orange,
    person: "Von Neumann & Team",
    invention: "ENIAC / Stored-Program Model",
    country: "🇺🇸 USA",
    detail:
      "ENIAC was the first general-purpose electronic computer — filling an entire room, weighing 30 tons, and using 18,000 vacuum tubes. It was programmed by physically rewiring cables and flipping switches. John von Neumann then proposed the stored-program concept: store instructions in memory just like data. This changed everything.",
    impact: "Programs could now be changed in software, not by rewiring hardware.",
    funFact: "ENIAC used as much electricity as 150 homes. It ran at 5,000 operations per second — your phone does 3 billion.",
  },
  {
    year: "1957",
    era: "High-Level Languages",
    icon: "📝",
    color: C.green,
    person: "Grace Hopper",
    invention: "FORTRAN & COBOL",
    country: "🇺🇸 USA",
    detail:
      "Grace Hopper invented the first compiler — a program that translates human-readable code into machine code. She believed programming should be done in something close to English. This led to FORTRAN (for scientific computing) and COBOL (for business). For the first time, programmers wrote code that looked like math and sentences, not 0s and 1s.",
    impact: "Programming became accessible to scientists and business people, not just engineers.",
    funFact: "Grace Hopper popularized the term 'bug' after finding an actual moth stuck in a relay of the Mark II computer.",
  },
  {
    year: "1970s",
    era: "C and Unix",
    icon: "⚙️",
    color: C.yellow,
    person: "Dennis Ritchie & Ken Thompson",
    invention: "C Language + Unix OS",
    country: "🇺🇸 USA (Bell Labs)",
    detail:
      "Dennis Ritchie created the C programming language and, with Ken Thompson, built the Unix operating system in C. C gave programmers fine control over hardware while still being readable. Unix became the foundation for nearly every modern operating system — Linux, macOS, Android, and even Windows share Unix ideas.",
    impact: "C and Unix became the bedrock of all modern software and operating systems.",
    funFact: "Linux (which powers Android, most web servers, and supercomputers) is written almost entirely in C.",
  },
  {
    year: "1991",
    era: "Python is Born",
    icon: "🐍",
    color: C.purple,
    person: "Guido van Rossum",
    invention: "Python",
    country: "🇳🇱 Netherlands",
    detail:
      "Guido van Rossum released Python on Christmas Day 1991. He wanted a language that was readable, clean, and fun to use. Python's philosophy: code should be so clear that anyone — not just computer scientists — could read and understand it. It used indentation (whitespace) to define structure instead of brackets.",
    impact: "Python is now the #1 language for AI, data science, automation, and teaching beginners.",
    funFact: "Python is named after Monty Python's Flying Circus, not the snake! Guido wanted something 'short, unique, and slightly mysterious'.",
  },
  {
    year: "2000s–Now",
    era: "The Modern Era",
    icon: "🌐",
    color: C.teal,
    person: "Everyone",
    invention: "Open Source + AI + Cloud",
    country: "🌍 Global",
    detail:
      "The internet democratised programming. GitHub made code sharing global. JavaScript runs in every browser. Python became the language of AI and machine learning. Today, programming is a superpower accessible to anyone — from a student in Chennai to a developer in Tokyo. AI tools now help write code, making programming faster than ever.",
    impact: "Programming is no longer just for experts — it is a 21st-century literacy skill.",
    funFact: "There are over 700 programming languages today. Python, JavaScript, and C consistently rank in the top 3 worldwide.",
  },
];

// ── Timeline Component ─────────────────────────────────────────────────────
function Timeline({ selected, onSelect }) {
  return (
    <div style={{ position: "relative", padding: "8px 0" }}>
      {/* Vertical line */}
      <div style={{
        position: "absolute", left: 28, top: 0, bottom: 0,
        width: 2, background: C.border,
      }} />
      {ERA_DATA.map((era, i) => (
        <div key={i} onClick={() => onSelect(i)}
          style={{
            display: "flex", alignItems: "flex-start", gap: 16,
            marginBottom: 8, cursor: "pointer", position: "relative",
          }}>
          {/* Node */}
          <div style={{
            width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
            background: selected === i ? era.color : C.card,
            border: `2px solid ${selected === i ? era.color : C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, zIndex: 1,
            boxShadow: selected === i ? `0 0 14px ${era.color}66` : "none",
            transition: "all 0.25s",
          }}>{era.icon}</div>

          {/* Label */}
          <div style={{
            flex: 1, padding: "6px 12px", borderRadius: 8,
            background: selected === i ? era.color + "18" : "transparent",
            border: `1px solid ${selected === i ? era.color + "55" : "transparent"}`,
            transition: "all 0.25s",
          }}>
            <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
              <span style={{ color: era.color, fontWeight: 700, fontSize: 13 }}>{era.year}</span>
              <span style={{ color: selected === i ? C.text : C.muted, fontSize: 12 }}>{era.era}</span>
            </div>
            {selected === i && (
              <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>
                {era.country} · {era.person}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Detail Panel ───────────────────────────────────────────────────────────
function DetailPanel({ era }) {
  if (!era) return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      color: C.muted, padding: 24,
    }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>👈</div>
      <div style={{ fontSize: 14 }}>Select an era from the timeline to explore its story</div>
    </div>
  );

  return (
    <div>
      {/* Era Header */}
      <div style={{
        background: era.color + "22", border: `1px solid ${era.color}55`,
        borderRadius: 10, padding: "16px", marginBottom: 14,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>{era.icon}</span>
          <div>
            <div style={{ color: era.color, fontWeight: 700, fontSize: 18 }}>{era.year}</div>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 14 }}>{era.era}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag label={era.person} color={era.color} />
          <Tag label={era.invention} color={C.muted} />
          <Tag label={era.country} color={C.muted} />
        </div>
      </div>

      {/* Story */}
      <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>
        {era.detail}
      </div>

      {/* Impact */}
      <div style={{
        background: C.green + "18", border: `1px solid ${C.green}44`,
        borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 10,
      }}>
        <span style={{ color: C.green, fontWeight: 600 }}>💡 Why it mattered: </span>
        <span style={{ color: C.muted }}>{era.impact}</span>
      </div>

      {/* Fun Fact */}
      <div style={{
        background: C.yellow + "18", border: `1px solid ${C.yellow}44`,
        borderRadius: 8, padding: "10px 14px", fontSize: 13,
      }}>
        <span style={{ color: C.yellow, fontWeight: 600 }}>🎉 Fun fact: </span>
        <span style={{ color: C.muted }}>{era.funFact}</span>
      </div>
    </div>
  );
}

function Tag({ label, color }) {
  return (
    <span style={{
      background: color + "22", border: `1px solid ${color}55`,
      borderRadius: 20, padding: "2px 10px", fontSize: 11, color,
    }}>{label}</span>
  );
}

// ── Then vs Now comparison ─────────────────────────────────────────────────
function ThenVsNow() {
  const rows = [
    ["Programming a computer", "Rewiring physical cables", "Typing readable code in seconds"],
    ["Writing 'Hello World'", "Days of machine code setup", "print('Hello World') — done"],
    ["Who could program?", "Only trained engineers", "Anyone with a laptop"],
    ["Speed of a computer", "5,000 ops/second (ENIAC)", "3 billion ops/second (your phone)"],
    ["Sharing code", "Punched paper tape by post", "GitHub — instant, global, free"],
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Programming has changed more in 80 years than any other field. Here's a quick look at just how far we've come.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ padding: "10px 12px", textAlign: "left", color: C.muted, borderBottom: `1px solid ${C.border}`, fontWeight: 600 }}>Task</th>
              <th style={{ padding: "10px 12px", textAlign: "left", color: C.red, borderBottom: `1px solid ${C.border}`, fontWeight: 600 }}>1940s–50s</th>
              <th style={{ padding: "10px 12px", textAlign: "left", color: C.green, borderBottom: `1px solid ${C.border}`, fontWeight: 600 }}>Today</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([task, then, now], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.card : "transparent" }}>
                <td style={{ padding: "10px 12px", color: C.text, borderBottom: `1px solid ${C.border}22` }}>{task}</td>
                <td style={{ padding: "10px 12px", color: C.muted, borderBottom: `1px solid ${C.border}22` }}>{then}</td>
                <td style={{ padding: "10px 12px", color: C.green, borderBottom: `1px solid ${C.border}22` }}>{now}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Language Family Tree ───────────────────────────────────────────────────
function LangTree() {
  const langs = [
    { name: "Machine Code", year: "1940s", color: C.red, x: 50, children: ["Assembly"] },
    { name: "Assembly", year: "1950s", color: C.orange, parent: "Machine Code", children: ["FORTRAN", "COBOL"] },
    { name: "FORTRAN", year: "1957", color: C.yellow, parent: "Assembly", children: ["C"] },
    { name: "COBOL", year: "1959", color: C.yellow, parent: "Assembly", children: [] },
    { name: "C", year: "1972", color: C.green, parent: "FORTRAN", children: ["C++", "Python", "Java"] },
    { name: "C++", year: "1983", color: C.teal, parent: "C", children: [] },
    { name: "Python", year: "1991", color: C.purple, parent: "C", children: [] },
    { name: "Java", year: "1995", color: C.accent, parent: "C", children: ["JavaScript"] },
    { name: "JavaScript", year: "1995", color: C.pink, parent: "Java", children: [] },
  ];

  const rows = [
    [{ name: "Machine Code", year: "1940s", color: C.red }],
    [{ name: "Assembly", year: "1950s", color: C.orange }],
    [{ name: "FORTRAN", year: "1957", color: C.yellow }, { name: "COBOL", year: "1959", color: C.yellow }],
    [{ name: "C", year: "1972", color: C.green }],
    [{ name: "C++", year: "1983", color: C.teal }, { name: "Python", year: "1991", color: C.purple }, { name: "Java", year: "1995", color: C.accent }],
    [{ name: "JavaScript", year: "1995", color: C.pink }],
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>
        Programming languages didn't appear out of nowhere — each one was built on ideas from the last.
        Here's the family tree that led to Python.
      </p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            {ri > 0 && (
              <div style={{ width: 2, height: 14, background: C.border, margin: "0 auto" }} />
            )}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {row.map((lang, li) => (
                <div key={li} style={{
                  padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  background: lang.color + "22", border: `1.5px solid ${lang.color}`,
                  color: lang.color, textAlign: "center", minWidth: 90,
                }}>
                  <div>{lang.name}</div>
                  <div style={{ fontSize: 10, fontWeight: 400, color: C.muted, marginTop: 2 }}>{lang.year}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`,
        borderRadius: 8, padding: "10px 14px", fontSize: 13, textAlign: "center",
      }}>
        <span style={{ color: C.purple, fontWeight: 600 }}>🐍 Python</span>
        <span style={{ color: C.muted }}> sits at the top of this lineage — inheriting 50 years of human learning about how to make code readable and powerful.</span>
      </div>
    </div>
  );
}

// ── Quiz ───────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "Who is considered the world's first computer programmer?",
      options: ["Alan Turing", "Grace Hopper", "Ada Lovelace", "Guido van Rossum"],
      answer: 2,
      explain: "Ada Lovelace wrote the first algorithm in 1843 — for a machine that hadn't even been built yet!",
    },
    {
      q: "What did Grace Hopper invent that changed programming forever?",
      options: ["The internet", "The first compiler — translating human code to machine code", "The Python language", "The mouse and keyboard"],
      answer: 1,
      explain: "Hopper's compiler meant programmers could write code in readable English-like text instead of raw binary.",
    },
    {
      q: "Python was named after:",
      options: ["The snake species", "Monty Python's Flying Circus (a comedy show)", "A Greek letter", "Its creator's pet"],
      answer: 1,
      explain: "Guido van Rossum was a fan of Monty Python's Flying Circus. The snake logo came later!",
    },
    {
      q: "What was the main limitation of programming in the 1940s?",
      options: [
        "Computers were too slow",
        "There were no monitors to see output",
        "Programs were written by physically rewiring cables and switches",
        "Python wasn't invented yet",
      ],
      answer: 2,
      explain: "Early computers like ENIAC had to be reprogrammed by physically rewiring connections — no keyboards or screens.",
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
          {final === 4 ? "Perfect! You know your programming history." : "Good effort — revisit the timeline to fill any gaps."}
        </div>
        <div style={{ marginTop: 16, padding: "12px 20px", borderRadius: 8, background: C.green + "22", border: `1px solid ${C.green}`, color: C.green, fontWeight: 600 }}>
          Unit 1.3 Complete ✓ — Module 1 Done! 🚀
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
export default function Unit1_3({ student, onUnitComplete }) {
  const sections = [
    { id: "timeline", label: "Timeline" },
    { id: "thenvsnow", label: "Then vs Now" },
    { id: "tree", label: "Language Tree" },
    { id: "quiz", label: "Quick Quiz" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [selectedEra, setSelectedEra] = useState(0);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };

  const content = [
    // Timeline
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Programming didn't start with Python — or even computers. Tap each milestone on the left to read its story.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, minHeight: 400 }}>
        <Timeline selected={selectedEra} onSelect={setSelectedEra} />
        <div style={{ background: C.card, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
          <DetailPanel era={ERA_DATA[selectedEra]} />
        </div>
      </div>
    </div>,

    <ThenVsNow />,
    <LangTree />,
    <Quiz onComplete={() => { markComplete(3); onUnitComplete && onUnitComplete(); }} />,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 1 › UNIT 1.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>A Brief History of Programming</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{completed.length} / {sections.length} done</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(completed.length / sections.length) * 100}%`, background: C.green, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}` }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => setActiveSection(i)} style={{
              flex: 1, padding: "8px 6px", borderRadius: 7,
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
