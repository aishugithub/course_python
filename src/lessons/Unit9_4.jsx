// Unit 9.4 — Capstone: The Persistent Marks Manager (Module 9 finale)
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
    { tool: "try / except", from: "Unit 9.1", why: "int('eighty') no longer kills the app — catch it and ask again" },
    { tool: "specific errors + range check", from: "Unit 9.2", why: "reject marks below 0 or above 100 before they poison the data" },
    { tool: "FileNotFoundError", from: "new here", why: "first run has no save file — handle it gracefully, don't crash" },
    { tool: "with open(...) — read & write", from: "Unit 9.3", why: "load the class on start, save it on exit" },
    { tool: "CSV split(',')", from: "Unit 9.3", why: "one line per student: NAME,MARK — parsed back into the dict" },
    { tool: "functions + dict + menu", from: "Module 8", why: "the whole modular Marks Manager you already built" },
  ];
  const [checked, setChecked] = useState([]);
  const toggle = (i) => setChecked((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Your Module 8 Marks Manager was elegant — but it had two fatal flaws it even confessed to: type
        "eighty" and it <strong style={{ color: C.red }}>crashes</strong>, and when it closes every student is
        <strong style={{ color: C.red }}> forgotten</strong>. This capstone fixes both, using only Module 9
        tools. Tick your toolkit.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 12 }}>📋 THE SPEC — Persistent Marks Manager</div>
        <pre style={mono}>
          {`load_marks(file)     → read CSV into a dict on startup (or start empty)
ask_mark()           → loop until a valid 0-100 number is typed
save_marks(file, m)  → write the dict back to CSV on exit
main menu            → Add / Report / Save & Exit — never crashes`}
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
          🎯 Robust AND permanent. Let's harden the app!
        </div>
      )}

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Robustness = surviving the unexpected.</strong> A program isn't
        "done" when it works on perfect input — it's done when a real, careless user can't break it and their
        data is safe on disk. That's the leap from a script to an <em>application</em>.
      </>)}
    </div>
  );
}

// ── Section 2: Build in Steps ──
function StepsWidget() {
  const [v, setV] = useState(0);
  const versions = [
    {
      label: "v1 — the fragile app (8.4)",
      color: C.red,
      note: "Where Module 8 left off: clean functions, but the input is naked and the data is temporary.",
      warn: "Type \"eighty\" for a mark → int() raises ValueError → the whole app crashes, losing the session. And even a perfect run forgets every student the moment you exit.",
      code: `marks = {}
while True:
    choice = input("Choose: ")
    if choice == "1":
        name = input("Name: ")
        mark = int(input("Mark: "))   # 💥 crashes on "eighty"
        marks[name] = mark
    elif choice == "2":
        print_report(marks)
    elif choice == "3":
        break                          # data vanishes here`,
    },
    {
      label: "v2 — guard the input",
      color: C.yellow,
      note: "Unit 9.1 + 9.2: wrap the risky int() in try/except and loop until the number is valid AND in range.",
      warn: "Now bad input is impossible to crash on — the user just gets asked again. But close the app and the class is STILL gone. We've made it robust, not permanent.",
      code: `def ask_mark():
    while True:
        raw = input("Mark (0-100): ")
        try:
            mark = int(raw)
        except ValueError:
            print("  Not a whole number — try again.")
            continue
        if mark < 0 or mark > 100:
            print("  Must be 0-100 — try again.")
            continue
        return mark          # only valid values escape the loop`,
    },
    {
      label: "v3 — make it persist",
      color: C.green,
      note: "Unit 9.3: load_marks() reads the CSV on startup, save_marks() writes it on exit. FileNotFoundError handles the very first run.",
      warn: null,
      code: `def load_marks(filename):
    marks = {}
    try:
        with open(filename, "r") as f:
            for line in f:
                line = line.strip()
                if line == "":
                    continue
                name, mark = line.split(",")
                marks[name] = int(mark)
    except FileNotFoundError:
        print("No save yet — starting fresh.")
    return marks

def save_marks(filename, marks):
    with open(filename, "w") as f:
        for name in marks:
            f.write(name + "," + str(marks[name]) + "\\n")

marks = load_marks("marks.csv")   # ← startup
# ... menu ...
# on Exit:  save_marks("marks.csv", marks)`,
    },
  ];
  const cur = versions[v];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Three passes, each closing one gap: fragile → robust → permanent. Notice we never rewrite the whole
        app — we harden it piece by piece.
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
        <pre style={{ ...mono, maxHeight: 340, overflowY: "auto" }}>{cur.code}</pre>
      </div>

      {cur.warn ? (
        <div style={{ background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
          ⛔ <strong style={{ color: C.red }}>Why we keep going:</strong> {cur.warn}
        </div>
      ) : (
        <div style={{ background: C.green + "12", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
          ✅ <strong style={{ color: C.green }}>Now it's a real app:</strong> unbreakable input AND a memory
          that survives restarts. Add students today, close your laptop, reopen tomorrow — they're all still
          there.
        </div>
      )}

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Load at the start, save at the end.</strong> This "read the file
        into memory → work in memory → write memory back to the file" cycle is the skeleton of almost every
        data app you'll ever use, from a notes app to a database.
      </>)}
    </div>
  );
}

// ── Section 3: Play It — robust, persistent manager ──
function PlayWidget() {
  const [students, setStudents] = useState({ ASHA: 85, RAVI: 72 });
  const [disk, setDisk] = useState({ ASHA: 85, RAVI: 72 });
  const [name, setName] = useState("");
  const [markText, setMarkText] = useState("");
  const [log, setLog] = useState([{ t: "sys", s: "Loaded 2 students from marks.csv" }]);

  const push = (lines) => setLog((l) => [...l.slice(-10), ...lines]);

  const add = () => {
    const n = name.trim().toUpperCase();
    if (!n) { push([{ t: "err", s: "Name cannot be empty!" }]); return; }
    // ── validate the mark: try int(), then range check (Units 9.1 + 9.2) ──
    let mark;
    try {
      if (!/^-?\d+$/.test(markText.trim())) throw new Error("ValueError");
      mark = parseInt(markText.trim(), 10);
    } catch {
      push([{ t: "in", s: `> add ${n}, "${markText}"` }, { t: "err", s: "  ✗ ValueError caught — that's not a whole number. Not added." }]);
      return;
    }
    if (mark < 0 || mark > 100) {
      push([{ t: "in", s: `> add ${n}, ${mark}` }, { t: "err", s: "  ✗ Rejected — mark must be 0-100. Not added." }]);
      return;
    }
    setStudents((p) => ({ ...p, [n]: mark }));
    push([{ t: "in", s: `> add ${n}, ${mark}` }, { t: "ok", s: `  ✓ ${n} recorded (grade ${gradeOf(mark)}). [in memory — not saved yet]` }]);
    setName(""); setMarkText("");
  };

  const save = () => {
    setDisk({ ...students });
    push([{ t: "in", s: "> save" }, { t: "ok", s: `  💾 Saved ${Object.keys(students).length} students to marks.csv` }]);
  };
  const reopen = () => {
    setStudents({ ...disk });
    push([{ t: "sys", s: "— app closed —" }, { t: "sys", s: `Reopened. Loaded ${Object.keys(disk).length} students from marks.csv` }]);
  };
  const freshDisk = () => {
    setStudents({}); setDisk({});
    push([{ t: "sys", s: "🗑 Deleted marks.csv. Everything empty." }]);
  };

  const colors = { sys: C.muted, in: C.accent, ok: C.green, err: C.red };
  const diskText = Object.keys(disk).length
    ? Object.keys(disk).map((n) => `${n},${disk[n]}`).join("\n") + "\n"
    : "(file empty / not created)";
  const unsaved = JSON.stringify(students) !== JSON.stringify(disk);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The finished app. Try to break it — type <code style={{ color: C.red }}>"eighty"</code> or
        <code style={{ color: C.red }}> 150</code> as a mark. Then <strong style={{ color: C.text }}>Save</strong>,
        hit <strong style={{ color: C.text }}>Close &amp; reopen</strong>, and watch your class survive.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div>
          <label style={{ color: C.muted, fontSize: 11, display: "block", marginBottom: 4 }}>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="PRIYA" style={{
            padding: "9px 12px", borderRadius: 8, background: C.card, color: C.text, fontSize: 13,
            border: `1.5px solid ${C.border}`, outline: "none", width: 110, fontFamily: "monospace",
          }} />
        </div>
        <div>
          <label style={{ color: C.muted, fontSize: 11, display: "block", marginBottom: 4 }}>Mark (try "eighty"!)</label>
          <input value={markText} onChange={(e) => setMarkText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="85" style={{
            padding: "9px 12px", borderRadius: 8, background: C.card, color: C.text, fontSize: 13,
            border: `1.5px solid ${C.border}`, outline: "none", width: 120, fontFamily: "monospace",
          }} />
        </div>
        <button onClick={add} style={{
          padding: "9px 14px", borderRadius: 8, background: C.green + "22", color: C.green,
          border: `1.5px solid ${C.green}`, fontWeight: 600, fontSize: 12.5, cursor: "pointer",
        }}>+ Add</button>
        <button onClick={save} style={{
          padding: "9px 14px", borderRadius: 8, background: unsaved ? C.orange + "22" : C.card, color: unsaved ? C.orange : C.muted,
          border: `1.5px solid ${unsaved ? C.orange : C.border}`, fontWeight: 600, fontSize: 12.5, cursor: "pointer",
        }}>💾 Save{unsaved ? " *" : ""}</button>
        <button onClick={reopen} style={{
          padding: "9px 14px", borderRadius: 8, background: C.accentGlow, color: "#fff",
          border: "none", fontWeight: 600, fontSize: 12.5, cursor: "pointer",
        }}>🔄 Close &amp; reopen</button>
        <button onClick={freshDisk} style={{
          padding: "9px 12px", borderRadius: 8, background: C.card, color: C.muted,
          border: `1.5px solid ${C.border}`, fontWeight: 600, fontSize: 12.5, cursor: "pointer",
        }}>🗑</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 12 }}>
        <div style={{ background: "#010409", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, minHeight: 190 }}>
          <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>CONSOLE</div>
          {log.map((e, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 11.5, lineHeight: 1.75, color: colors[e.t], whiteSpace: "pre-wrap" }}>{e.s}</div>
          ))}
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.teal}44`, borderRadius: 10, padding: 14, minHeight: 190 }}>
          <div style={{ color: C.teal, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>📄 marks.csv (on disk)</div>
          <pre style={{ ...mono, color: C.text, fontSize: 12 }}>{diskText}</pre>
          {unsaved && <div style={{ color: C.orange, fontSize: 11, marginTop: 8 }}>⚠ In-memory changes not yet saved — hit 💾 Save.</div>}
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>Notice the gap between memory and disk.</strong> Adding a student
        changes memory only; until you Save, the CSV is unchanged — so "Close &amp; reopen" would lose the
        unsaved ones. That's why real apps save before exit (and why "unsaved changes" warnings exist!).
      </>)}
    </div>
  );
}

// ── Section 4: Full Code ──
function FullCodeWidget() {
  const code = `# Persistent Marks Manager — Foothold Module 9 Capstone
# Robust (never crashes on bad input) + Permanent (saves to CSV)

FILENAME = "marks.csv"

def grade(mark):
    if mark >= 90:
        return "A"
    elif mark >= 75:
        return "B"
    elif mark >= 50:
        return "C"
    else:
        return "F"

def load_marks(filename):
    marks = {}
    try:
        with open(filename, "r") as f:
            for line in f:
                line = line.strip()
                if line == "":
                    continue                 # skip blank lines
                name, mark = line.split(",")
                marks[name] = int(mark)
    except FileNotFoundError:
        print("No saved file yet — starting fresh.")
    return marks

def save_marks(filename, marks):
    with open(filename, "w") as f:
        for name in marks:
            f.write(name + "," + str(marks[name]) + "\\n")
    print("Saved", len(marks), "students to", filename)

def ask_mark():
    while True:                              # loop until valid
        raw = input("Mark (0-100): ")
        try:
            mark = int(raw)
        except ValueError:
            print("  That's not a whole number — try again.")
            continue
        if mark < 0 or mark > 100:
            print("  Mark must be between 0 and 100.")
            continue
        return mark

def print_report(marks):
    if len(marks) == 0:
        print("No students yet!")
        return
    for name in marks:
        print(" ", name, "->", marks[name], grade(marks[name]))

# ── main program ──
marks = load_marks(FILENAME)                 # startup: read the file
while True:
    print()
    print("1. Add student  2. Report  3. Save & Exit")
    choice = input("Choose: ")

    if choice == "1":
        name = input("Name: ")
        marks[name] = ask_mark()             # can't crash now
        print(name, "recorded.")
    elif choice == "2":
        print_report(marks)
    elif choice == "3":
        save_marks(FILENAME, marks)          # exit: write the file
        print("Goodbye!")
        break
    else:
        print("Please choose 1, 2 or 3.")`;

  const challenges = [
    { icon: "🥉", text: "Add a 'delete student' menu option — check the name is in marks first (Unit 7.4), else print a friendly message instead of a KeyError." },
    { icon: "🥈", text: "Auto-save after every add (call save_marks inside option 1) so a power cut never loses data — then discuss the trade-off vs saving only on exit." },
    { icon: "🥇", text: "Swap the hand-rolled CSV for Python's csv module (import csv; csv.reader / csv.writer). Then add a header row 'name,mark' and skip it on load." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The complete, unbreakable, persistent program. Run it, add students, exit, run it again — your class
        is loaded from <code style={{ color: C.teal }}>marks.csv</code> automatically. This is a real
        application.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, maxHeight: 440, overflowY: "auto" }}>
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
        <strong style={{ color: C.purple }}>You've built a complete data application.</strong> It handles
        errors, validates input, and remembers everything between runs — the same three responsibilities a
        banking app or a game save-file has. The next module gives your data a shape of its own: objects.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "The v1 app worked in demos but crashed on 'eighty'. What made v2 robust?",
      options: ["It runs faster", "int() is wrapped in try/except inside a loop, so bad input is re-asked, not fatal", "It stops accepting text input", "It saves to a file"],
      answer: 1,
      explain: "v2 catches the ValueError from int() and loops until a valid number is given. Robustness = the user cannot crash it, no matter what they type.",
    },
    {
      q: "On the VERY FIRST run there is no marks.csv. Why doesn't load_marks() crash?",
      options: ["Python creates the file automatically", "except FileNotFoundError handles it and returns an empty dict", "It's impossible to run without the file", "It uses mode 'w'"],
      answer: 1,
      explain: "Opening a missing file in 'r' raises FileNotFoundError. load_marks catches it and simply starts with an empty dict — a graceful first run.",
    },
    {
      q: "In the Play It app, you add PRIYA but DON'T click Save, then Close & reopen. What happens to PRIYA?",
      options: ["She's still there", "She's gone — she was only in memory, never written to disk", "The app crashes", "She's saved with grade F"],
      answer: 1,
      explain: "Adding changes memory only. Reopening reloads from the CSV on disk, which never received PRIYA. Save writes memory to disk — that's the whole point of persistence.",
    },
    {
      q: 'save_marks writes: f.write(name + "," + str(marks[name]) + "\\n"). Why the str(...) and the "\\n"?',
      options: ['Just style; neither is needed', "str() turns the number into text so it can join the line; \\n puts each student on its own line", "str() rounds the mark; \\n adds a space", "They prevent the file from being deleted"],
      answer: 1,
      explain: "write() only accepts text, so the integer mark must become str(...). And write adds no newline itself, so \\n separates the rows — exactly the format split(',') reads back.",
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
          {score === 4 ? "Perfect! You can build software that survives real users and real restarts." :
            score >= 2 ? "Good work! Replay 'Play It' — the memory-vs-disk gap is the key mental model." :
              "Worth a replay: 'Build in Steps' (fragile→robust→permanent) and 'Play It'. Load at start, save at exit."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.green}22, ${C.purple}22)`,
          border: `1px solid ${C.green}55`,
        }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏆 Module 9 Complete — Robust &amp; Permanent!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Your programs no longer crash on bad input and no longer forget everything on exit. You can catch
            exceptions, raise your own, and read/write files and CSV.<br /><br />
            <strong style={{ color: C.accent }}>Next: Module 10 — Object-Oriented Programming.</strong> Your
            "student" is currently a name in one dict and a mark in another. What if a student could be ONE
            thing that carries its own name, marks, and grade logic together? That's an object.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 16, whiteSpace: "pre-wrap", fontFamily: q.q.includes('"') || q.q.includes("\\n") ? "monospace" : "inherit" }}>{q.q}</div>
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
export default function Unit9_4({ student, onUnitComplete }) {
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
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Mission: Robust &amp; Permanent</h3><MissionWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Harden It in Three Versions</h3><StepsWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Play It: Try to Break It</h3><PlayWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Full Code — Run It For Real</h3><FullCodeWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to close out Module 9.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 9 › UNIT 9.4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Capstone: The Persistent Marks Manager</div>
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
