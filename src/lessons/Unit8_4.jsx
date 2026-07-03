// Unit 8.4 — Grand Capstone: Marks Manager 2.0 (Modules 5-8 finale)
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

const gradeOf = (m) => (m >= 90 ? "A" : m >= 75 ? "B" : m >= 50 ? "C" : "F");

// ── Section 1: The Mission ──
function MissionWidget() {
  const tools = [
    { tool: "def + calls", from: "Unit 8.1", why: "each job gets a named function, written once" },
    { tool: "parameters & return", from: "Unit 8.2", why: "grade(mark) in → letter out; stats handed back, not just printed" },
    { tool: "clean scope", from: "Unit 8.3", why: "each function keeps its own locals — nothing leaks or clashes" },
    { tool: "dict of students", from: "Unit 7.4", why: "names → marks, the data heart of the app" },
    { tool: "accumulate / count / best-so-far", from: "Unit 7.3", why: "average, pass count, topper — inside class_stats()" },
    { tool: "while True menu + break", from: "Units 6.1 & 6.3", why: "the app runs until Exit" },
    { tool: "if / elif / else", from: "Unit 5.2", why: "menu routing and the grading scale" },
  ];
  const [checked, setChecked] = useState([]);
  const toggle = (i) => setChecked((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Your final mission: rebuild the Marks Manager <strong style={{ color: C.text }}>the way professional
        software is written</strong> — same features (add students, full report, menu), but organized into
        named, reusable, testable functions. Plus one upgrade: grades in the report. Tick off your toolkit —
        it now spans FOUR modules.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 12 }}>📋 THE SPEC — Marks Manager 2.0</div>
        <pre style={mono}>
          {`grade(mark)         → returns "A" / "B" / "C" / "F"\nclass_stats(marks)  → RETURNS (average, topper, best, passed)\nprint_report(marks) → prints stats + every student's grade\nmain menu           → add / report / exit, now ~15 clean lines`}
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
          🎯 Four modules of tools, one program. Let's refactor!
        </div>
      )}

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Refactoring = same behaviour, better structure.</strong> The
        program will do exactly what 7.5's did (plus grades) — but organized so a stranger could read it,
        test one piece, or fix one bug without touching the rest. That's the skill employers actually pay for.
      </>)}
    </div>
  );
}

// ── Section 2: Build in Steps — monolith → extracted → returning ──
function StepsWidget() {
  const [v, setV] = useState(0);
  const versions = [
    {
      label: "v1 — the monolith (7.5)",
      note: "Where we left off: everything works, but ALL the logic is squeezed inside one elif — 25 lines deep in the menu.",
      warn: "Try explaining this block to a friend, or testing JUST the average without running the whole menu. One bug anywhere means digging through everything. Readable? Barely. Reusable? Not at all.",
      color: C.red,
      code: `while True:\n    choice = input("Choose: ")\n    if choice == "1":\n        # ...add student lines...\n    elif choice == "2":\n        total = 0\n        passed = 0\n        topper = ""\n        best = -1\n        for name in marks:\n            m = marks[name]\n            total = total + m\n            if m >= 50:\n                passed = passed + 1\n            if m > best:\n                best = m\n                topper = name\n        # ...8 more print lines...\n    elif choice == "3":\n        break`,
    },
    {
      label: "v2 — extract functions",
      note: "Unit 8.1's move: name the blocks. grade() and print_report() move OUT of the menu; the main loop collapses into something you can read aloud.",
      warn: "Better! But print_report still only PRINTS. What if tomorrow's feature needs the average as a NUMBER — say, to compare two classes? Printed text can't be reused (Unit 8.2's None trap).",
      color: C.yellow,
      code: `def grade(mark):\n    ...\n\ndef print_report(marks):\n    ...all the stats logic...\n\nmarks = {}\nwhile True:\n    print("1. Add  2. Report  3. Exit")\n    choice = input("Choose: ")\n    if choice == "1":\n        name = input("Name: ")\n        mark = int(input("Mark: "))\n        marks[name] = mark\n    elif choice == "2":\n        print_report(marks)   # one line!\n    elif choice == "3":\n        break`,
    },
    {
      label: "v3 — compute, then return",
      note: "The professional split: class_stats() COMPUTES and returns a tuple (Unit 7.4!); print_report() only DISPLAYS. Calculation and presentation, separated.",
      warn: null,
      color: C.green,
      code: `def class_stats(marks):\n    total = 0\n    passed = 0\n    topper = ""\n    best = -1\n    for name in marks:\n        m = marks[name]\n        total = total + m\n        if m >= 50:\n            passed = passed + 1\n        if m > best:\n            best = m\n            topper = name\n    average = total / len(marks)\n    return (average, topper, best, passed)\n\ndef print_report(marks):\n    stats = class_stats(marks)\n    print("Average:", stats[0])\n    print("Topper:", stats[1], "with", stats[2])\n    print("Passed:", stats[3], "of", len(marks))\n    for name in marks:\n        print(" ", name, "→", grade(marks[name]))`,
    },
  ];
  const cur = versions[v];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        We're not writing from scratch — we're <em>improving</em> working code in three passes, each fixing
        one specific pain.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
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
        <pre style={{ ...mono, maxHeight: 320, overflowY: "auto" }}>{cur.code}</pre>
      </div>

      {cur.warn && (
        <div style={{ background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
          ⛔ <strong style={{ color: C.red }}>Why we keep going:</strong> {cur.warn}
        </div>
      )}
      {!cur.warn && (
        <div style={{ background: C.green + "12", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
          ✅ <strong style={{ color: C.green }}>Why this is the pro pattern:</strong> class_stats() can now
          serve the report, a future compare-two-classes feature, a file export — anything. Compute once,
          reuse everywhere. And note the tuple: one return carrying four answers.
        </div>
      )}

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Separate computing from displaying.</strong> Functions that
        RETURN data can feed anything; functions that only print can feed only eyeballs. When in doubt,
        return — the caller can always print it.
      </>)}
    </div>
  );
}

// ── Section 3: Play It — modular manager with live call log ──
function PlayWidget() {
  const [students, setStudents] = useState({});
  const [name, setName] = useState("");
  const [mark, setMark] = useState(75);
  const [log, setLog] = useState([{ t: "sys", s: "Marks Manager 2.0 — watch the CALL LOG show which function does each job!" }]);
  const [calls, setCalls] = useState([]);

  const push = (lines) => setLog((l) => [...l.slice(-12), ...lines]);
  const pushCalls = (cs) => setCalls((p) => [...p.slice(-5), ...cs]);

  const add = () => {
    const n = name.trim().toUpperCase();
    if (!n) { push([{ t: "err", s: "Name cannot be empty!" }]); return; }
    setStudents((p) => ({ ...p, [n]: mark }));
    pushCalls([`grade(${mark}) → "${gradeOf(mark)}"`]);
    push([{ t: "in", s: `> add ${n}, ${mark}` }, { t: "ok", s: `${n} recorded with grade ${gradeOf(mark)}.` }]);
    setName("");
  };

  const report = () => {
    const entries = Object.entries(students);
    push([{ t: "in", s: "> report" }]);
    pushCalls([`print_report(marks)`]);
    if (entries.length === 0) {
      push([{ t: "err", s: "No students yet!  (early return — Unit 8.2!)" }]);
      return;
    }
    let total = 0, passed = 0, best = -1, topper = "";
    entries.forEach(([n, m]) => {
      total += m;
      if (m >= 50) passed += 1;
      if (m > best) { best = m; topper = n; }
    });
    const avg = (total / entries.length).toFixed(1);
    pushCalls([`class_stats(marks) → (${avg}, "${topper}", ${best}, ${passed})`]);
    push([
      { t: "out", s: `Average: ${avg}   Topper: ${topper} (${best})   Passed: ${passed}/${entries.length}` },
      ...entries.map(([n, m]) => ({ t: "out", s: `  ${n} → ${gradeOf(m)}` })),
    ]);
    pushCalls(entries.map(([, m]) => `grade(${m}) → "${gradeOf(m)}"`).slice(0, 3));
  };

  const reset = () => { setStudents({}); setName(""); setMark(75); setCalls([]); setLog([{ t: "sys", s: "Fresh start." }]); };

  const colors = { sys: C.muted, in: C.accent, ok: C.green, out: C.text, err: C.red };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        v3, alive — and this time you can see the machinery. Every button press routes work to a function;
        the call log shows each call and what it returned.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div>
          <label style={{ color: C.muted, fontSize: 11, display: "block", marginBottom: 4 }}>Student name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="e.g. PRIYA" style={{
              padding: "9px 12px", borderRadius: 8, background: C.card, color: C.text, fontSize: 13,
              border: `1.5px solid ${C.border}`, outline: "none", width: 130, fontFamily: "monospace",
            }} />
        </div>
        <div style={{ minWidth: 140 }}>
          <label style={{ color: C.muted, fontSize: 11, display: "block", marginBottom: 4 }}>Mark: <strong style={{ color: C.accent }}>{mark}</strong></label>
          <input type="range" min={0} max={100} value={mark} onChange={(e) => setMark(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
        </div>
        <button onClick={add} style={{
          padding: "9px 14px", borderRadius: 8, background: C.green + "22", color: C.green,
          border: `1.5px solid ${C.green}`, fontWeight: 600, fontSize: 12.5, cursor: "pointer",
        }}>+ Add</button>
        <button onClick={report} style={{
          padding: "9px 14px", borderRadius: 8, background: C.accentGlow, color: "#fff",
          border: "none", fontWeight: 600, fontSize: 12.5, cursor: "pointer",
        }}>📋 Report</button>
        <button onClick={reset} style={{
          padding: "9px 12px", borderRadius: 8, background: C.card, color: C.muted,
          border: `1.5px solid ${C.border}`, fontWeight: 600, fontSize: 12.5, cursor: "pointer",
        }}>↺</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 12 }}>
        <div style={{ background: "#010409", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, minHeight: 170 }}>
          <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>CONSOLE</div>
          {log.map((e, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 1.75, color: colors[e.t], whiteSpace: "pre-wrap" }}>{e.s}</div>
          ))}
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.purple}44`, borderRadius: 10, padding: 14, minHeight: 170 }}>
          <div style={{ color: C.purple, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>CALL LOG — functions at work</div>
          {calls.length === 0
            ? <div style={{ color: C.muted, fontSize: 12 }}>No calls yet — add a student!</div>
            : calls.map((c, i) => (
              <div key={i} style={{ fontFamily: "monospace", fontSize: 11.5, lineHeight: 1.8, color: C.purple }}>{c}</div>
            ))}
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>Each frame opens, works, returns, and vanishes</strong> (Unit 8.3) —
        yet the program feels seamless. That's modular software: small machines, cleanly connected, each
        doing one job well.
      </>)}
    </div>
  );
}

// ── Section 4: Full Code + challenges ──
function FullCodeWidget() {
  const code = `# Student Marks Manager 2.0 — modular edition
# Foothold Module 8 Grand Capstone (Modules 5-8)

def grade(mark):
    if mark >= 90:
        return "A"
    elif mark >= 75:
        return "B"
    elif mark >= 50:
        return "C"
    else:
        return "F"

def class_stats(marks):
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
    average = total / len(marks)
    return (average, topper, best, passed)

def print_report(marks):
    if len(marks) == 0:
        print("No students yet!")
        return              # early exit — nothing to report
    stats = class_stats(marks)
    print("Class average:", stats[0])
    print("Topper:", stats[1], "with", stats[2])
    print("Passed:", stats[3], "of", len(marks))
    for name in marks:
        print(" ", name, "→", grade(marks[name]))

# ── main program ──
marks = {}
while True:
    print()
    print("1. Add student  2. Class report  3. Exit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Student name: ")
        mark = int(input("Mark (0-100): "))
        marks[name] = mark
        print(name, "recorded with grade", grade(mark))
    elif choice == "2":
        print_report(marks)
    elif choice == "3":
        print("Goodbye!")
        break
    else:
        print("Please choose 1, 2 or 3.")`;

  const challenges = [
    { icon: "🥉", text: "Add remove_student(marks): ask for a name, check it with in first (Unit 7.4), then del marks[name]. Wire it in as menu option 4." },
    { icon: "🥈", text: "Write merit_list(marks) that RETURNS a list of the top-3 marks (sort + slice, Unit 7.3) — then let print_report call it." },
    { icon: "🥇", text: "The graduation challenge: go back to Unit 6.4's Number-Guessing Game and rebuild IT with functions — get_guess(), give_hint(guess, secret), play(). You'll feel the difference." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The complete program — compare it, line by line, with Unit 7.5's version. Same features, plus
        grades, and every piece has a name and a home. Type it into real Python and run it.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, maxHeight: 420, overflowY: "auto" }}>
        <pre style={mono}>{code}</pre>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.8, marginBottom: 16 }}>
        Bonus peek: pythonistas often unpack a returned tuple in one line —
        <code style={{ color: C.teal }}> avg, topper, best, passed = class_stats(marks)</code>. Four lockers
        filled at once. Try it after the challenges!
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
        <strong style={{ color: C.purple }}>One thing this program still can't survive:</strong> type
        "eighty" as a mark and <code style={{ color: C.red }}>int()</code> crashes the whole app. And when
        it closes, every student is forgotten. Handling bad input and remembering data — that's exactly
        what comes after Module 8.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "v1 (monolith) and v3 (functions) behave identically for the user. Why is v3 still better?",
      options: ["v3 runs measurably faster", "Each job is named, testable alone, and fixable in one place", "Python limits how long a while block can be", "v3 uses less memory"],
      answer: 1,
      explain: "Refactoring doesn't change behaviour — it changes structure. Named pieces can be read, tested, reused and fixed independently. Speed is not the point.",
    },
    {
      q: 'stats = class_stats(marks)\n# class_stats returns (average, topper, best, passed)\n\nHow do you get the topper\'s name?',
      options: ["stats[0]", "stats[1]", "stats[topper]", 'stats["topper"]'],
      answer: 1,
      explain: "The returned tuple is indexed like any sequence (Unit 7.4 + 7.1): position 0 is average, position 1 is topper.",
    },
    {
      q: 'def print_report(marks):\n    if len(marks) == 0:\n        print("No students yet!")\n        return\n    ...20 more lines...\n\nWith an empty dict, what runs after the return?',
      options: ["The 20 lines, but skipping prints", "Nothing — return exits the function immediately", "Python raises an error", "The function restarts"],
      answer: 1,
      explain: "return — even with no value — ends the function on the spot. The 'early return' guard is a beloved real-world pattern for handling edge cases first.",
    },
    {
      q: "While grade(87) is running, where does its mark variable (holding 87) live?",
      options: ["In the global room, next to marks", "In grade()'s own stack frame, destroyed when it returns", "Inside the marks dict", "In the print_report frame"],
      answer: 1,
      explain: "Unit 8.3's picture: every call gets its own frame; mark = 87 lives there and vanishes when grade returns its letter.",
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
          {score === 4 ? "Perfect! You think in functions now." :
            score >= 2 ? "Good work! Revisit 'Build in Steps' — the v1→v3 journey is the heart of this unit." :
              "Worth a replay: walk 'Build in Steps' again and ask at each version: what pain does the next one fix?"}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.green}22, ${C.purple}22)`,
          border: `1px solid ${C.green}55`,
        }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏆 Module 8 Complete — ALL FOUR PILLARS! 🎉</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            <strong style={{ color: C.text }}>Decide. Repeat. Organize. Modularize.</strong> From your first
            print() in Module 4 to a modular application in Module 8 — you now hold the complete foundation
            of programming, in any language, for life.<br /><br />
            <strong style={{ color: C.accent }}>Next: making programs tough and permanent.</strong> Exceptions —
            surviving "eighty" typed as a mark — and files, so your data outlives the program. The
            foundation is done; now we build up.
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
export default function Unit8_4({ student, onUnitComplete }) {
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
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Mission: Marks Manager 2.0</h3><MissionWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Refactor in Three Versions</h3><StepsWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Play It: Watch the Functions Work</h3><PlayWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Full Code — Run It For Real</h3><FullCodeWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on modular thinking — your final quiz of the four pillars.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 8 › UNIT 8.4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Grand Capstone: Marks Manager 2.0</div>
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
