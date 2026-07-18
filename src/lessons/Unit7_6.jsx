// Unit 7.5 — Capstone: Student Marks Manager (Module 7 finale)
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

// ── Section 1: The Mission — spec + tool checklist ──
function MissionWidget() {
  const tools = [
    { tool: "dict — names → marks", from: "Unit 7.4", why: "one locker per student, looked up by name" },
    { tool: "while True + break menu", from: "Units 6.1 & 6.3", why: "the program runs until the user chooses Exit" },
    { tool: "input() + int()", from: "Unit 4.3", why: "read names and marks from the keyboard" },
    { tool: "accumulate pattern", from: "Unit 7.3", why: "total → class average" },
    { tool: "best-so-far pattern", from: "Unit 7.3", why: "crown the topper" },
    { tool: "count pattern + if", from: "Units 7.3 & 5.2", why: "how many passed?" },
    { tool: "sort() + slicing", from: "Units 7.3 & 7.1", why: "top-3 merit list" },
  ];
  const [checked, setChecked] = useState([]);
  const toggle = (i) => setChecked((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Your class teacher needs a program. It must let her <strong style={{ color: C.text }}>add students and
        marks</strong>, then print a <strong style={{ color: C.text }}>class report</strong>: average, topper,
        pass count, and a top-3 merit list — running until she chooses Exit. Sounds big? Tick off each tool
        below — you already own every single one.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 12 }}>📋 THE SPEC</div>
        <pre style={mono}>
          {`1. Add student   → name + mark, stored together\n2. Class report  → average · topper · passed · merit top-3\n3. Exit          → menu repeats until this is chosen`}
        </pre>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tools.map((t, i) => (
          <div key={i} onClick={() => toggle(i)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8,
            background: checked.includes(i) ? C.green + "14" : C.card,
            border: `1.5px solid ${checked.includes(i) ? C.green : C.border}`,
            cursor: "pointer", transition: "all 0.2s",
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              border: `2px solid ${checked.includes(i) ? C.green : C.muted}`,
              background: checked.includes(i) ? C.green : "transparent", color: "#fff", fontSize: 13, fontWeight: 700,
            }}>{checked.includes(i) ? "✓" : ""}</div>
            <div>
              <span style={{ fontFamily: "monospace", fontSize: 12.5, color: checked.includes(i) ? C.green : C.text, fontWeight: 600 }}>{t.tool}</span>
              <span style={{ fontSize: 11.5, color: C.accent, marginLeft: 8 }}>({t.from})</span>
              <div style={{ fontSize: 11.5, color: C.muted, marginTop: 2 }}>{t.why}</div>
            </div>
          </div>
        ))}
      </div>

      {checked.length === tools.length && (
        <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 8, background: C.green + "18", border: `1px solid ${C.green}55`, color: C.green, fontSize: 13, fontWeight: 600, textAlign: "center" }}>
          🎯 All 7 tools ready — nothing new to learn. Just assembly!
        </div>
      )}

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Big programs are small patterns assembled.</strong> Not one line
        of this capstone is new — the skill you're practising is <em>composition</em>: choosing the right
        tool from the right unit and snapping them together.
      </>)}
    </div>
  );
}

// ── Section 2: Build in Steps — v1 / v2 / v3 ──
function StepsWidget() {
  const [v, setV] = useState(0);
  const versions = [
    {
      label: "v1 — the report core",
      note: "Start with the heart: a fixed dict and the average. No menu, no input — prove the calculation works first.",
      warn: "But the teacher can't add HER students — the data is frozen in the code. That's the wall input and a menu will break.",
      color: C.yellow,
      code: `marks = {"PRIYA": 87, "ARUN": 62, "MEENA": 91}\n\ntotal = 0\nfor name in marks:\n    total = total + marks[name]\n\nprint("Average:", total / len(marks))`,
    },
    {
      label: "v2 — menu + add",
      note: "Wrap it in the while True menu from Unit 6.3 and let her add students with input(). The dict grows at runtime!",
      warn: "Works — but the report only knows the average. No topper, no pass count, no merit list. Thin.",
      color: C.orange,
      code: `marks = {}\n\nwhile True:\n    print("1. Add  2. Report  3. Exit")\n    choice = input("Choose: ")\n\n    if choice == "1":\n        name = input("Name: ")\n        mark = int(input("Mark: "))\n        marks[name] = mark\n\n    elif choice == "2":\n        total = 0\n        for name in marks:\n            total = total + marks[name]\n        print("Average:", total / len(marks))\n\n    elif choice == "3":\n        break`,
    },
    {
      label: "v3 — the full report",
      note: "Now pour in Unit 7.3's patterns: best-so-far for the topper, count for passes, sort + slice for the merit list. One loop can carry all three!",
      warn: null,
      color: C.green,
      code: `elif choice == "2":\n    total = 0\n    passed = 0\n    topper = ""\n    best = -1\n    for name in marks:\n        m = marks[name]\n        total = total + m          # accumulate\n        if m >= 50:\n            passed = passed + 1    # count\n        if m > best:\n            best = m               # best-so-far\n            topper = name\n\n    all_marks = []\n    for name in marks:\n        all_marks.append(marks[name])\n    all_marks.sort(reverse=True)   # sort + slice\n\n    print("Average:", total / len(marks))\n    print("Topper:", topper, "with", best)\n    print("Passed:", passed, "of", len(marks))\n    print("Merit top-3:", all_marks[:3])`,
    },
  ];
  const cur = versions[v];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Real programmers never write the whole program in one go — they grow it in working versions, each
        adding ONE idea. Walk through the three stages.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {versions.map((ver, i) => (
          <button key={i} onClick={() => setV(i)} style={{
            padding: "8px 14px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
            background: v === i ? ver.color + "22" : C.card, color: v === i ? ver.color : C.muted,
            border: `1.5px solid ${v === i ? ver.color : C.border}`,
          }}>{ver.label}</button>
        ))}
      </div>

      <div style={{ background: C.card, border: `1.5px solid ${cur.color}55`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 12.5, color: cur.color, fontWeight: 600, marginBottom: 10, lineHeight: 1.6 }}>{cur.note}</div>
        <pre style={mono}>{cur.code}</pre>
      </div>

      {cur.warn && (
        <div style={{ background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
          ⛔ <strong style={{ color: C.red }}>Why we can't stop here:</strong> {cur.warn}
        </div>
      )}

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>v1 → v2 → v3: each version RUNS.</strong> Grow a program in
        working steps and bugs stay small and findable. Write it all at once and you debug everything
        everywhere, all at the same time.
      </>)}
    </div>
  );
}

// ── Section 3: Play It — the working Marks Manager ──
function PlayWidget() {
  const [students, setStudents] = useState({});
  const [name, setName] = useState("");
  const [mark, setMark] = useState(75);
  const [log, setLog] = useState([{ t: "sys", s: "Student Marks Manager — add a few students, then print the report!" }]);

  const push = (lines) => setLog((l) => [...l.slice(-14), ...lines]);

  const add = () => {
    const n = name.trim().toUpperCase();
    if (!n) { push([{ t: "err", s: "Name cannot be empty!" }]); return; }
    const existed = n in students;
    setStudents((p) => ({ ...p, [n]: mark }));
    push([{ t: "in", s: `> add ${n}, ${mark}` }, { t: "ok", s: existed ? `${n} updated to ${mark}.` : `${n} recorded with ${mark}.` }]);
    setName("");
  };

  const report = () => {
    const entries = Object.entries(students);
    if (entries.length === 0) { push([{ t: "in", s: "> report" }, { t: "err", s: "No students yet!" }]); return; }
    let total = 0, passed = 0, best = -1, topper = "";
    entries.forEach(([n, m]) => {
      total += m;
      if (m >= 50) passed += 1;
      if (m > best) { best = m; topper = n; }
    });
    const sorted = entries.map(([, m]) => m).sort((a, b) => b - a);
    const avg = (total / entries.length).toFixed(1);
    push([
      { t: "in", s: "> report" },
      { t: "out", s: `Class average : ${avg}` },
      { t: "out", s: `Topper        : ${topper} with ${best}` },
      { t: "out", s: `Passed        : ${passed} of ${entries.length}` },
      { t: "out", s: `Merit top-3   : [${sorted.slice(0, 3).join(", ")}]` },
    ]);
  };

  const reset = () => { setStudents({}); setName(""); setMark(75); setLog([{ t: "sys", s: "Fresh start — the dict is empty again." }]); };

  const colors = { sys: C.muted, in: C.accent, ok: C.green, out: C.text, err: C.red };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Here's v3, alive. You're the teacher: enter a few students (try some marks below 50 too), then hit
        Class Report and check the patterns did their job.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div>
          <label style={{ color: C.muted, fontSize: 11, display: "block", marginBottom: 4 }}>Student name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="e.g. PRIYA" style={{
              padding: "9px 12px", borderRadius: 8, background: C.card, color: C.text, fontSize: 13,
              border: `1.5px solid ${C.border}`, outline: "none", width: 140, fontFamily: "monospace",
            }} />
        </div>
        <div style={{ minWidth: 150 }}>
          <label style={{ color: C.muted, fontSize: 11, display: "block", marginBottom: 4 }}>Mark: <strong style={{ color: C.accent }}>{mark}</strong></label>
          <input type="range" min={0} max={100} value={mark} onChange={(e) => setMark(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
        </div>
        <button onClick={add} style={{
          padding: "9px 16px", borderRadius: 8, background: C.green + "22", color: C.green,
          border: `1.5px solid ${C.green}`, fontWeight: 600, fontSize: 12.5, cursor: "pointer",
        }}>+ Add student</button>
        <button onClick={report} style={{
          padding: "9px 16px", borderRadius: 8, background: C.accentGlow, color: "#fff",
          border: "none", fontWeight: 600, fontSize: 12.5, cursor: "pointer",
        }}>📋 Class Report</button>
        <button onClick={reset} style={{
          padding: "9px 14px", borderRadius: 8, background: C.card, color: C.muted,
          border: `1.5px solid ${C.border}`, fontWeight: 600, fontSize: 12.5, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      {Object.keys(students).length > 0 && (
        <div style={{ background: C.card, border: `1px solid ${C.teal}44`, borderRadius: 10, padding: "12px", marginBottom: 12 }}>
          <div style={{ color: C.teal, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>marks (the dict, live)</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(students).map(([n, m]) => (
              <div key={n} style={{
                padding: "5px 10px", borderRadius: 7, fontFamily: "monospace", fontSize: 12,
                background: C.surface, border: `1.5px solid ${m >= 50 ? C.teal + "66" : C.red + "66"}`,
                color: m >= 50 ? C.text : C.red,
              }}>"{n}": {m}</div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: "#010409", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, minHeight: 150 }}>
        <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>CONSOLE</div>
        {log.map((e, i) => (
          <div key={i} style={{ fontFamily: "monospace", fontSize: 12.5, lineHeight: 1.8, color: colors[e.t], whiteSpace: "pre-wrap" }}>{e.s}</div>
        ))}
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>You just used a program you know every line of.</strong> The dict
        grows as you add, and one loop computes average, topper, and pass count in a single pass — three
        patterns sharing one walk through the data.
      </>)}
    </div>
  );
}

// ── Section 4: Full Code — run it for real + challenges ──
function FullCodeWidget() {
  const code = `# Student Marks Manager — Foothold Module 7 Capstone
marks = {}

while True:
    print()
    print("1. Add student  2. Class report  3. Exit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Student name: ")
        mark = int(input("Mark (0-100): "))
        marks[name] = mark
        print(name, "recorded.")

    elif choice == "2":
        if len(marks) == 0:
            print("No students yet!")
            continue

        total = 0
        passed = 0
        topper = ""
        best = -1
        for name in marks:
            m = marks[name]
            total = total + m
            if m >= 50:
                passed = passed + 1
            if m > best:
                best = m
                topper = name

        all_marks = []
        for name in marks:
            all_marks.append(marks[name])
        all_marks.sort(reverse=True)

        print("Class average:", total / len(marks))
        print("Topper:", topper, "with", best)
        print("Passed:", passed, "of", len(marks))
        print("Merit top-3:", all_marks[:3])

    elif choice == "3":
        print("Goodbye!")
        break

    else:
        print("Please choose 1, 2 or 3.")`;

  const challenges = [
    { icon: "🥉", text: "Add option 4: remove a student — you'll want del marks[name], and an in check first (Unit 7.4!)." },
    { icon: "🥈", text: "Print a grade next to each student in the report: A for 90+, B for 75+, C for 50+, F below — an if/elif chain per student (Unit 5.2)." },
    { icon: "🥇", text: "Show the merit list with NAMES, not just marks — hint: loop over the dict once per merit mark and find who scored it." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The complete program — type it into your own Python (IDLE, VS Code, or replit.com) and run it for
        real. Every line traces back to a unit you've completed.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, maxHeight: 420, overflowY: "auto" }}>
        <pre style={mono}>{code}</pre>
      </div>

      <div style={{ color: C.orange, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>⚡ CHALLENGE UPGRADES</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {challenges.map((ch, i) => (
          <div key={i} style={{ display: "flex", gap: 10, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
            <span style={{ fontSize: 16 }}>{ch.icon}</span><span>{ch.text}</span>
          </div>
        ))}
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Notice the program getting crowded?</strong> The report block is
        20+ lines inside one elif. Wouldn't it be cleaner to say <code style={{ color: C.accent }}>print_report(marks)</code> and
        define that step ONCE, elsewhere? That itch is exactly what Module 8 scratches: <em>functions</em>.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "In the Marks Manager, why is a dict better than two parallel lists (names and marks)?",
      options: ["Dicts use less memory", "Each name stays glued to its mark — look up by name in one step", "Lists can't hold numbers and strings", "Dicts are automatically sorted"],
      answer: 1,
      explain: "The key→value pair keeps each student's name and mark together, and marks[name] finds it without hunting through slots.",
    },
    {
      q: 'best = -1\nfor name in marks:\n    if marks[name] > best:\n        best = marks[name]\n        topper = name\n\nWhich pattern is this?',
      options: ["Accumulate", "Count", "Best-so-far (find max)", "Sort"],
      answer: 2,
      explain: "The current champion (best) faces every mark; only a higher one replaces it — Unit 7.3's best-so-far pattern.",
    },
    {
      q: "Why does the whole menu live inside while True?",
      options: ["To make the program faster", "Python requires menus to use while", "So the menu repeats forever — until break fires on Exit", "To avoid using if/elif"],
      answer: 2,
      explain: "while True repeats the menu endlessly; choosing Exit hits break, the one door out — Unit 6.3's pattern.",
    },
    {
      q: 'all_marks = [62, 91, 87, 45]\nall_marks.sort(reverse=True)\nprint(all_marks[:3])\n\nWhat does this print?',
      options: ["[45, 62, 87]", "[91, 87, 62]", "[91, 87, 62, 45]", "[62, 91, 87]"],
      answer: 1,
      explain: "sort(reverse=True) gives [91, 87, 62, 45]; the slice [:3] keeps the first three — the merit list.",
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
        <div style={{ fontSize: 52 }}>{score >= 3 ? "🏆" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {score} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {score === 4 ? "Perfect! You didn't just learn Module 7 — you built with it." :
            score >= 2 ? "Good work! Revisit 'Build in Steps' to see how the patterns slot into the program." :
              "Worth a replay: 'The Mission' maps every tool to its unit — retrace the checklist, then re-run the program."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.green}22, ${C.accentGlow}22)`,
          border: `1px solid ${C.green}55`,
        }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏆 Module 7 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Decide (M5), repeat (M6), and now <strong style={{ color: C.text }}>organize data</strong> (M7) —
            strings, lists, tuples and dictionaries, plus the loop patterns that bring them to life. Three of
            the four superpowers down.<br /><br />
            <strong style={{ color: C.accent }}>Next: Module 8 — Functions & Modular Thinking.</strong> Your
            capstone's report block was 20 lines inside one elif. Functions let you name that block, reuse
            it anywhere, and finally answer: where do variables LIVE when code calls code?
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
export default function Unit7_6({ student, onUnitComplete }) {
  const sections = [
    { id: "mission", label: "The Mission" },
    { id: "steps", label: "Build in Steps" },
    { id: "play", label: "Play It" },
    { id: "code", label: "Full Code" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Mission: Student Marks Manager</h3><MissionWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build It in Three Versions</h3><StepsWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Play It: Be the Teacher</h3><PlayWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Full Code — Run It For Real</h3><FullCodeWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on how the capstone fits together.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 7 › UNIT 7.6</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Capstone: Student Marks Manager</div>
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
