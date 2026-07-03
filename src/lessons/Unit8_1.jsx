// Unit 8.1 — Why Functions? (def, calling, reuse)
import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };
const insight = (color, children) => (
  <div style={{ marginTop: 16, background: color + "18", border: `1px solid ${color}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
    🔑 {children}
  </div>
);

// ── Widget 1: Need Comparison — copy-paste vs def ──
function NeedWidget() {
  const [n, setN] = useState(2);
  const block = `    total = 0\n    for name in marks:\n        total = total + marks[name]\n    print("Average:", total / len(marks))\n    # ...16 more report lines...`;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Remember your Marks Manager capstone? Its report block was 20 lines inside one elif. Now the teacher
        wants the report printed in MORE places — after adding a student, before exiting, on demand. Drag
        the slider: how many places need the report?
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>places needing the report = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={1} max={6} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ COPY-PASTE THE BLOCK</div>
          <pre style={mono}>
            {Array.from({ length: Math.min(n, 2) }, (_, i) => `# copy ${i + 1}\n${block}`).join("\n\n")}
            {n > 2 ? `\n\n# ... ${n - 2} more cop${n - 2 > 1 ? "ies" : "y"} ...` : ""}
          </pre>
          <div style={{ color: C.red, fontSize: 11.5, marginTop: 10, lineHeight: 1.6 }}>
            ≈ {n * 20} lines. Find a bug in the report? Fix it {n} time{n > 1 ? "s" : ""} — miss one copy
            and the bug lives on. 🐛
          </div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ DEFINE ONCE, CALL ANYWHERE</div>
          <pre style={mono}>
            {`def print_report():\n${block}\n\n`}
            {Array.from({ length: n }, () => `print_report()`).join("\n")}
          </pre>
          <div style={{ color: C.green, fontSize: 11.5, marginTop: 10, lineHeight: 1.6 }}>
            The block lives in ONE place. Fix a bug there, and every call is fixed instantly.
          </div>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>A function gives a block of code a NAME.</strong> Write it once,
        call it by name anywhere — the same jump you made when 100 print lines collapsed into a 4-line loop
        (Unit 6.2). Loops collapse repetition in <em>time</em>; functions collapse repetition in <em>code</em>.
      </>)}
    </div>
  );
}

// ── Widget 2: Anatomy of def — click-to-reveal + C contrast ──
function AnatomyWidget() {
  const [sel, setSel] = useState(0);
  const parts = [
    { text: "def", color: C.accent, title: "def — the keyword", body: "Short for 'define'. Tells Python: I'm CREATING a function here, don't run it yet — just remember it." },
    { text: " print_report", color: C.teal, title: "the name", body: "You choose it — same rules as variable names. This is the label you'll call it by later. Pick verbs that say what it does." },
    { text: "()", color: C.orange, title: "the parentheses", body: "Empty for now — next unit they'll carry inputs (parameters) into the function. But even empty, they're compulsory." },
    { text: ":", color: C.purple, title: "the colon", body: "The same 'a block follows' promise you know from if (Unit 5.2) and loops (Module 6). Python's most consistent rule." },
    { text: "\n    print(\"Report...\")\n    print(\"Average: 84.2\")", color: C.green, title: "the body — indented", body: "Everything indented under def belongs to the function. Same indentation rule as if and for. This code sleeps until the function is called." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Meet the <code style={{ color: C.accent }}>def</code> statement. Every part below is clickable —
        and notice how much of it you already know from if and for.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
        <pre style={{ ...mono, fontSize: 15 }}>
          {parts.map((p, i) => (
            <span key={i} onClick={() => setSel(i)} style={{
              color: p.color, cursor: "pointer", fontWeight: sel === i ? 800 : 600,
              background: sel === i ? p.color + "26" : "transparent",
              borderBottom: `2px solid ${sel === i ? p.color : "transparent"}`,
              borderRadius: 4, transition: "all 0.2s",
            }}>{p.text}</span>
          ))}
        </pre>
      </div>

      <div style={{ background: C.surface, border: `1.5px solid ${parts[sel].color}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ color: parts[sel].color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{parts[sel].title}</div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{parts[sel].body}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>⚙️ IN C</div>
          <pre style={mono}>{`void print_report(void) {\n    printf("Report...\\n");\n}\n/* declare the return type,\n   the braces, the semicolons —\n   and often a prototype above */`}</pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.accent}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 IN PYTHON</div>
          <pre style={mono}>{`def print_report():\n    print("Report...")\n\n# def + colon + indent.\n# no types, no braces,\n# no prototypes`}</pre>
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>def CREATES, it does not RUN.</strong> When Python reads a def,
        it stores the function like a saved recipe and moves on — not one line of the body executes. The
        body runs only when you <em>call</em> the function: <code style={{ color: C.teal }}>print_report()</code>.
      </>)}
    </div>
  );
}

// ── Widget 3: Trace — define, call, jump, return ──
function TraceWidget() {
  const lines = [
    'def cheer():',
    '    print("Hip hip")',
    '    print("Hurray!")',
    '',
    'print("Match won!")',
    'cheer()',
    'cheer()',
  ];
  // [lineIdx, funcExists, output, narration]
  const steps = [
    [0, false, "", "Python reads def — and just REMEMBERS the recipe. Lines 2-3 do NOT run now."],
    [4, true, "Match won!", "Skipped straight past the body to the first real statement. cheer exists in memory, unused so far."],
    [5, true, "Match won!", "A CALL! Python jumps INTO the function body..."],
    [1, true, "Match won!\nHip hip", "...and runs its first line."],
    [2, true, "Match won!\nHip hip\nHurray!", "...and its second."],
    [5, true, "Match won!\nHip hip\nHurray!", "Body finished — Python returns to the call site and moves on."],
    [6, true, "Match won!\nHip hip\nHurray!", "A second call! Jump in again..."],
    [1, true, "Match won!\nHip hip\nHurray!\nHip hip", "...same body, run afresh."],
    [2, true, "Match won!\nHip hip\nHurray!\nHip hip\nHurray!", "...to the end again."],
    [6, true, "Match won!\nHip hip\nHurray!\nHip hip\nHurray!", "Back at the call site. Program over — 2 calls, 4 cheer lines, from a body written once."],
  ];
  const [idx, setIdx] = useState(0);
  const [line, funcExists, output, narr] = steps[idx];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The single most important thing about functions: <em>when</em> the body runs. Step through and watch
        the ▶ marker — it will surprise you at step 1.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: 12.5, lineHeight: 1.9, padding: "1px 8px", borderRadius: 6,
              background: i === line ? C.accent + "22" : "transparent",
              borderLeft: `3px solid ${i === line ? C.accent : "transparent"}`,
              color: i === line ? C.text : C.muted, whiteSpace: "pre", minHeight: 24,
            }}>{i === line ? "▶ " : "  "}{l}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `1px solid ${C.teal}55`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: C.teal, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>MEMORY</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>cheer</div>
              <div style={{
                border: `2px solid ${funcExists ? C.teal : C.border}`, borderRadius: 8, padding: "8px 6px",
                fontFamily: "monospace", fontSize: 13, color: funcExists ? C.text : C.muted, background: C.surface,
              }}>{funcExists ? "📦 function" : "—"}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>
                {funcExists ? "the recipe, stored & ready" : "nothing yet"}
              </div>
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, flex: 1 }}>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <pre style={{ ...mono, color: C.green, fontSize: 12.5 }}>{output || " "}</pre>
          </div>
        </div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.6 }}>
        {narr}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setIdx((i) => Math.min(steps.length - 1, i + 1))} disabled={idx === steps.length - 1} style={{
          padding: "10px 20px", borderRadius: 8, background: idx === steps.length - 1 ? C.card : C.accentGlow,
          border: "none", color: idx === steps.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: idx === steps.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({idx + 1} / {steps.length})</button>
        <button onClick={() => setIdx(0)} style={{
          padding: "10px 16px", borderRadius: 8, background: C.card, border: `1px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Call = jump in, run the body, jump back.</strong> Execution
        leaves the main flow, works through the function, and returns to exactly where it left off — every
        single call. def is writing the recipe; calling is cooking it.
      </>)}
    </div>
  );
}

// ── Widget 4: Build It — assembly announcements ──
function BuildWidget() {
  const [times, setTimes] = useState(3);
  const slots = ["MORNING", "LUNCH", "GAMES", "EVENING", "CLOSING"];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A real mini-program: the school PA system plays the same 3-line announcement at several points in
        the day. One <code style={{ color: C.accent }}>def</code>, called from a loop — functions and
        Module 6 loops working together. Drag to change how many slots.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>announcement slots = <strong style={{ color: C.accent }}>{times}</strong></label>
        <input type="range" min={1} max={5} value={times} onChange={(e) => setTimes(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE PROGRAM</div>
          <pre style={mono}>
            {`def announce():\n    print("=" * 20)\n    print("Silence please!")\n    print("=" * 20)\n\nslots = [${slots.slice(0, times).map((s) => `"${s}"`).join(", ")}]\nfor slot in slots:\n    print(slot, "assembly:")\n    announce()`}
          </pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          <pre style={{ ...mono, fontSize: 11.5, maxHeight: 260, overflowY: "auto" }}>
            {slots.slice(0, times).map((s) => (
              <span key={s}>
                <span style={{ color: C.text }}>{s} assembly:{"\n"}</span>
                <span style={{ color: C.green }}>{"====================\nSilence please!\n====================\n"}</span>
              </span>
            ))}
          </pre>
          <div style={{ marginTop: 10, fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
            {times} call{times > 1 ? "s" : ""} × 3 lines = {times * 3} announcement lines — the body
            written exactly once.
          </div>
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>Functions + loops multiply each other.</strong> The loop decides
        WHEN to announce; the function knows HOW. Notice one itch though: every announcement says the same
        thing. What if morning and lunch need <em>different</em> messages? That needs a way to pass
        information IN — next unit.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: 'def greet():\n    print("Hello!")\n\nAfter Python reads these two lines, what has been printed?',
      options: ["Hello!", "Nothing — def only stores the function", "greet", "An error"],
      answer: 1,
      explain: "def CREATES the function and moves on — the body sleeps until greet() is actually called.",
    },
    {
      q: 'def cheer():\n    print("Hip")\n    print("Hurray")\n\ncheer()\ncheer()\ncheer()\n\nHow many lines does this program print?',
      options: ["2", "3", "6", "9"],
      answer: 2,
      explain: "Each call runs the whole 2-line body: 3 calls × 2 lines = 6 lines printed.",
    },
    {
      q: "Why are functions better than copy-pasting the same 20-line block into 4 places?",
      options: ["Functions run faster than pasted code", "The program file becomes encrypted", "A bug is fixed ONCE, in one place, for every call", "Python forbids pasting code twice"],
      answer: 2,
      explain: "One definition = one place to fix, test, and improve. Copy-paste means every copy is a separate chance for bugs to hide.",
    },
    {
      q: 'print("A")\n\ndef show():\n    print("B")\n\nprint("C")\nshow()\n\nWhat is the output order?',
      options: ["A B C", "A C B", "B A C", "A B C B"],
      answer: 1,
      explain: "A prints, def stores show WITHOUT running it, C prints, then the call show() finally runs B. Definition order ≠ execution order!",
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
          {score === 4 ? "Perfect! def holds no more secrets." :
            score >= 2 ? "Good work! If define-vs-call tripped you up, replay 'Trace It' — watching the ▶ skip the body is the aha moment." :
              "Worth a replay: 'Trace It' step by step. The key idea: def stores, the CALL runs."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 8.1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now name a block of code with def, call it from anywhere, and you know the golden rule:
            definition stores, calling runs.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 8.2 — Parameters & Return Values.</strong> Your
            announce() says the same thing every time. Parameters carry information IN; return sends answers
            OUT — that's when functions become truly powerful machines.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 16, whiteSpace: "pre-wrap", fontFamily: q.q.includes("\n") ? "monospace" : "inherit" }}>{q.q}</div>
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
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: C.purple + "18", border: `1px solid ${C.purple}44`, color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
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

// ── Main ──
export default function Unit8_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Why?" },
    { id: "anatomy", label: "Anatomy of def" },
    { id: "trace", label: "Trace It" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Copy-Paste Trap</h3><NeedWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Anatomy of def</h3><AnatomyWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Trace It: Define vs Call</h3><TraceWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build It: The PA System</h3><BuildWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 8.1.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 8 › UNIT 8.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Why Functions?</div>
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
