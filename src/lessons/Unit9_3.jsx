// Unit 9.3 — Files: Making Data Survive (open/write/read, with, CSV)
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

// ── Widget 1: The Amnesia Problem — RAM forgets, disk remembers ──
function AmnesiaWidget() {
  const pool = ["Buy milk", "Call Ravi", "Submit lab record", "Pay fees"];
  const [ram, setRam] = useState([]);
  const [fileMem, setFileMem] = useState([]);
  const [disk, setDisk] = useState([]);
  const [n, setN] = useState(0);

  const add = () => {
    const note = pool[n % pool.length];
    setRam((p) => [...p, note]);
    setFileMem((p) => [...p, note]);
    setDisk((p) => [...p, note]);      // the file program also wrote to disk
    setN((k) => k + 1);
  };
  const restart = () => {
    setRam([]);                        // RAM is wiped on exit
    setFileMem([...disk]);             // file program re-loads from disk
  };

  const panel = (title, notes, color, sub) => (
    <div style={{ background: C.card, border: `1.5px solid ${color}55`, borderRadius: 10, padding: 16 }}>
      <div style={{ color, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{title}</div>
      <div style={{ color: C.muted, fontSize: 10.5, marginBottom: 10 }}>{sub}</div>
      {notes.length === 0
        ? <div style={{ color: C.muted, fontSize: 12, fontStyle: "italic" }}>(empty)</div>
        : notes.map((t, i) => <div key={i} style={{ fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.7 }}>• {t}</div>)}
    </div>
  );

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Every program you've written stores data in <strong style={{ color: C.text }}>variables</strong> — the
        memory slots from Unit 4.2. Those live in RAM, and RAM is wiped the moment the program ends. Add a few
        notes, then hit <em>Close &amp; reopen</em> and watch the difference.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={add} style={{
          flex: 1, padding: "10px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13,
          background: C.accentGlow, border: "none", color: "#fff",
        }}>➕ Add a note</button>
        <button onClick={restart} style={{
          flex: 1, padding: "10px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13,
          background: C.card, border: `1px solid ${C.border}`, color: C.text,
        }}>🔄 Close &amp; reopen program</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {panel("❌ NOTES IN A VARIABLE (RAM)", ram, C.red, "notes = []  → lost on exit")}
        {panel("✅ NOTES IN A FILE (disk)", fileMem, C.green, 'open("notes.txt") → survives')}
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Variables live in RAM; files live on disk.</strong> RAM is fast
        but forgetful — it clears when your program stops. A file on disk is the program's long-term memory.
        To make data <em>persist</em>, you write it to a file.
      </>)}
    </div>
  );
}

// ── Widget 2: with / open / modes anatomy ──
function WithWidget() {
  const [sel, setSel] = useState(0);
  const parts = [
    { text: "with ", color: C.purple, title: "with — the safe wrapper", body: "Opens the file and guarantees it gets closed afterwards — even if an error happens inside. It's the finally you met in Unit 9.2, built in for you." },
    { text: 'open("notes.txt", "w")', color: C.accent, title: 'open(name, mode)', body: "Opens (or creates) the file. First arg is the filename; second is the MODE — here \"w\" for write. This hands back a file object." },
    { text: " as f", color: C.teal, title: "as f — the handle", body: "Names the open file f so you can use it inside the block. f is your connection to the file on disk." },
    { text: ":\n    f.write(\"Buy milk\\n\")", color: C.green, title: "f.write(...)", body: "Writes text into the file. Note the \\n — write does NOT add a new line for you, so you add it yourself to keep entries on separate lines." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The modern way to touch a file is <code style={{ color: C.purple }}>with open(...) as f:</code>. Click
        each part. The old way needed a manual <code>f.close()</code> that people forgot — <code style={{ color: C.purple }}>with</code> closes
        it for you.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
        <pre style={{ ...mono, fontSize: 14 }}>
          {parts.map((p, i) => (
            <span key={i} onClick={() => setSel(i)} style={{
              color: p.color, cursor: "pointer", fontWeight: sel === i ? 800 : 600,
              background: sel === i ? p.color + "26" : "transparent",
              borderRadius: 4, transition: "all 0.2s",
            }}>{p.text}</span>
          ))}
        </pre>
      </div>

      <div style={{ background: C.surface, border: `1.5px solid ${parts[sel].color}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ color: parts[sel].color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{parts[sel].title}</div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{parts[sel].body}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[
          { m: '"w"', label: "WRITE", color: C.orange, body: "Creates the file (or ERASES it if it exists) and writes fresh. Start-from-scratch." },
          { m: '"a"', label: "APPEND", color: C.teal, body: "Adds to the END of the file, keeping what's already there. Great for logs." },
          { m: '"r"', label: "READ", color: C.green, body: "Opens for reading only. The default mode. Errors if the file doesn't exist." },
        ].map((x) => (
          <div key={x.m} style={{ background: C.card, border: `1.5px solid ${x.color}55`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: x.color, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>{x.m} — {x.label}</div>
            <div style={{ color: C.muted, fontSize: 11.5, lineHeight: 1.6 }}>{x.body}</div>
          </div>
        ))}
      </div>

      {insight(C.orange, <>
        <strong style={{ color: C.orange }}>Mode "w" overwrites — be careful.</strong> Opening an existing
        file in "w" wipes it instantly, before you write a thing. Use "a" to add without losing old data. And
        <code style={{ color: C.purple }}> with</code> always closes the file, so your writes are safely saved.
      </>)}
    </div>
  );
}

// ── Widget 3: Round trip — write, then read it back ──
function RoundTripWidget() {
  const pool = ["Asha", "Ravi", "Meena", "Karthik"];
  const [names, setNames] = useState(["Asha", "Ravi"]);
  const [showRead, setShowRead] = useState(false);

  const toggle = (nm) => {
    setShowRead(false);
    setNames((p) => p.includes(nm) ? p.filter((x) => x !== nm) : [...p, nm]);
  };
  const fileText = names.map((nm) => nm).join("\n") + (names.length ? "\n" : "");

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The full round trip: <strong style={{ color: C.text }}>write</strong> lines to a file, then later
        <strong style={{ color: C.text }}> read</strong> them back with a <code style={{ color: C.accent }}>for</code> loop
        (your Module 6 loop, now walking a file line by line). Toggle names, then run the reader.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {pool.map((nm) => (
          <button key={nm} onClick={() => toggle(nm)} style={{
            padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: names.includes(nm) ? C.green + "22" : C.card,
            border: `1.5px solid ${names.includes(nm) ? C.green : C.border}`,
            color: names.includes(nm) ? C.green : C.muted,
          }}>{names.includes(nm) ? "✓ " : "+ "}{nm}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✍️ WRITE</div>
          <pre style={mono}>{`names = [${names.map((n) => `"${n}"`).join(", ")}]
with open("names.txt", "w") as f:
    for name in names:
        f.write(name + "\\n")`}</pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.teal}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>📄 names.txt (on disk)</div>
          <pre style={{ ...mono, color: C.text }}>{fileText || "(empty)"}</pre>
        </div>
      </div>

      <button onClick={() => setShowRead(true)} style={{
        padding: "10px 20px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff",
        fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 14,
      }}>▶ Run the reader</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>📖 READ</div>
          <pre style={mono}>{`with open("names.txt", "r") as f:
    for line in f:
        print("Hello,", line.strip())`}</pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.muted, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          <pre style={{ ...mono, color: C.green }}>
            {showRead ? (names.map((n) => `Hello, ${n}`).join("\n") || "(nothing to read)") : " "}
          </pre>
        </div>
      </div>

      {insight(C.teal, <>
        <strong style={{ color: C.teal }}>for line in f</strong> walks the file one line at a time — no need to
        know how many lines there are. <code style={{ color: C.accent }}>line.strip()</code> trims the trailing
        <code> \n</code> so "Asha\n" becomes clean "Asha". Write adds the \n; read strips it back off.
      </>)}
    </div>
  );
}

// ── Widget 4: CSV — rows and columns ──
function CsvWidget() {
  const [marks, setMarks] = useState({ Asha: 85, Ravi: 72, Meena: 91 });
  const names = Object.keys(marks);
  const csvText = names.map((nm) => nm + "," + marks[nm]).join("\n") + "\n";

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Real data usually has columns — a name AND a mark. The simplest format is <strong style={{ color: C.text }}>CSV</strong> (comma-separated
        values): one row per line, fields split by commas. Drag a mark and watch the file text change, then see
        it parsed back into rows.
      </p>

      {names.map((nm) => (
        <div key={nm} style={{ marginBottom: 10 }}>
          <label style={{ color: C.muted, fontSize: 12 }}>{nm} = <strong style={{ color: C.accent }}>{marks[nm]}</strong></label>
          <input type="range" min={0} max={100} value={marks[nm]}
            onChange={(e) => setMarks((p) => ({ ...p, [nm]: Number(e.target.value) }))}
            style={{ width: "100%", accentColor: C.accent }} />
        </div>
      ))}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 8 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>📄 marks.csv (on disk)</div>
          <pre style={{ ...mono, color: C.text }}>{csvText}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 6 }}>plain text — open it in Excel and it's a table!</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.teal}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>📖 READ &amp; SPLIT</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`with open("marks.csv") as f:
    for line in f:
        name, mark = line.strip().split(",")
        print(name, "scored", mark)`}</pre>
          <pre style={{ ...mono, color: C.green, fontSize: 11.5, marginTop: 8 }}>
            {names.map((nm) => `${nm} scored ${marks[nm]}`).join("\n")}
          </pre>
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>split(",") turns one text line into fields.</strong> "Asha,85"
        becomes ["Asha", "85"] — then you unpack into name and mark (a tuple trick from Unit 7.4). Python also
        has a built-in <code style={{ color: C.teal }}>csv</code> module for when data itself contains commas or
        quotes, but the idea is exactly this.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "You store data in a normal variable (a list). What happens to it when the program ends?",
      options: ["It's saved to disk automatically", "It's lost — variables live in RAM", "It becomes a file called data.txt", "Python asks you where to save it"],
      answer: 1,
      explain: "Variables live in RAM, which clears when the program stops. To keep data between runs you must write it to a file on disk.",
    },
    {
      q: 'You open an existing file that already has data with open("log.txt", "w"). What happens to the old contents?',
      options: ["They're kept; new text is added at the end", "They're ERASED — \"w\" overwrites", "Python raises an error to protect them", "They move to a backup file"],
      answer: 1,
      explain: 'Mode "w" wipes the file the instant it opens. To add to the end without losing old data, use "a" (append).',
    },
    {
      q: "Why prefer `with open(...) as f:` over a plain open() call?",
      options: ["It runs faster", "It automatically closes the file, even if an error occurs", "It encrypts the file", "It's the only way to read files"],
      answer: 1,
      explain: "with guarantees the file is closed afterwards (like a built-in finally), so you never forget f.close() and your writes are safely flushed to disk.",
    },
    {
      q: 'A CSV line is "Meena,91". What does line.strip().split(",") give you?',
      options: ['"Meena,91"', '["Meena", "91"]', '["Meena,91"]', '91'],
      answer: 1,
      explain: 'strip() removes the trailing newline, then split(",") breaks the line at the comma into a list of two strings: ["Meena", "91"]. Note "91" is still text!',
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
          {score === 4 ? "Superb! You can persist data to files and read it back — a huge upgrade." :
            score >= 2 ? "Good work! If modes tripped you, remember: w overwrites, a appends, r reads." :
              "Worth a replay: the Round Trip (write then read) and the CSV widget. Files = your program's long-term memory."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 9.3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now write text and CSV to disk, read it back with a loop, and you know why <code style={{ color: C.teal }}>with</code> is
            the safe way to open files.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 9.4 — Capstone: The Persistent Marks Manager.</strong> Time
            to combine everything in Module 9: rebuild the Marks Manager so it loads from a CSV, saves on exit,
            and never crashes on bad input.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 16, whiteSpace: "pre-wrap", fontFamily: q.q.includes('"') ? "monospace" : "inherit" }}>{q.q}</div>
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
export default function Unit9_3({ student, onUnitComplete }) {
  const sections = [
    { id: "amnesia", label: "The Amnesia Problem" },
    { id: "with", label: "open / with / modes" },
    { id: "roundtrip", label: "Write & Read" },
    { id: "csv", label: "CSV" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Why Programs Forget Everything</h3><AmnesiaWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Opening a File Safely</h3><WithWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Round Trip: Write then Read</h3><RoundTripWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>CSV: Rows and Columns</h3><CsvWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 9.3.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 9 › UNIT 9.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Files: Making Data Survive</div>
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
