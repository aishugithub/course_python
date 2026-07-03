// Unit 7.4 — Tuples & Dictionaries (immutability as a feature, lookup by name)
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

// ── Widget 1: Tuples — the list with a lock ──
function TupleWidget() {
  const [mode, setMode] = useState("list");
  const [ran, setRan] = useState(false);

  const switchMode = (m) => { setMode(m); setRan(false); };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Some data must NEVER change: a date of birth, a PIN code's coordinates, the RGB values of a colour.
        Store a birthday in a list, and any line of code — even a typo — can silently corrupt it. Run the
        same "accident" on both versions.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => switchMode("list")} style={{
          padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          background: mode === "list" ? C.accentGlow : C.card, color: mode === "list" ? "#fff" : C.muted,
          border: `1.5px solid ${mode === "list" ? C.accent : C.border}`,
        }}>as a list [ ]</button>
        <button onClick={() => switchMode("tuple")} style={{
          padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          background: mode === "tuple" ? C.accentGlow : C.card, color: mode === "tuple" ? "#fff" : C.muted,
          border: `1.5px solid ${mode === "tuple" ? C.accent : C.border}`,
        }}>as a tuple ( )</button>
      </div>

      <div style={{ background: C.card, border: `1.5px solid ${ran ? (mode === "list" ? C.red : C.green) : C.border}`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
        <pre style={mono}>
          {mode === "list"
            ? `dob = [14, 11, 2006]   # birthday as a LIST\ndob[0] = 25            # oops — a bug elsewhere in the code`
            : `dob = (14, 11, 2006)   # birthday as a TUPLE\ndob[0] = 25            # same buggy line`}
        </pre>
        {ran && (mode === "list" ? (
          <>
            <pre style={{ ...mono, color: C.yellow, marginTop: 10 }}>{`print(dob)  →  [25, 11, 2006]`}</pre>
            <div style={{ color: C.red, fontSize: 12.5, marginTop: 8, lineHeight: 1.6 }}>
              ⚠️ No error, no warning — the birthday is now the 25th, silently wrong forever.
              You'd only discover it months later on the wrong cake day. 🎂
            </div>
          </>
        ) : (
          <>
            <pre style={{ ...mono, color: C.red, marginTop: 10 }}>{`TypeError: 'tuple' object does not\nsupport item assignment`}</pre>
            <div style={{ color: C.green, fontSize: 12.5, marginTop: 8, lineHeight: 1.6 }}>
              ✓ Python slams the door AT the buggy line. The bad code crashes loudly instead of
              corrupting quietly — you find the bug the moment it runs.
            </div>
          </>
        ))}
      </div>

      {!ran && (
        <button onClick={() => setRan(true)} style={{
          padding: "10px 20px", borderRadius: 8, background: C.accentGlow, border: "none",
          color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 4,
        }}>▶ Run the buggy line</button>
      )}

      <div style={{ marginTop: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.9 }}>
        Everything else works exactly like a list: <code style={{ color: C.teal }}>dob[0]</code> → 14,
        <code style={{ color: C.teal }}> dob[-1]</code> → 2006, <code style={{ color: C.teal }}>len(dob)</code> → 3,
        looping — all fine. Only <em>changing</em> is forbidden. Sound familiar? Strings taught you this
        in Unit 7.1: a tuple is immutable on purpose.
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>A tuple is a list with a lock — and the lock is the feature.</strong> Use
        a list for data that grows and changes (marks being entered), a tuple for data that must stay
        fixed (a date, a coordinate). Round brackets instead of square — that's the whole syntax.
      </>)}
    </div>
  );
}

// ── Widget 2: Need — look up by name, not by slot number ──
function DictNeedWidget() {
  const names = ["PRIYA", "ARUN", "MEENA", "DIVYA"];
  const marks = [87, 62, 91, 78];
  const [sel, setSel] = useState(2);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Your list skills have one blind spot. "What did MEENA score?" — with lists you must first hunt for
        <em> where</em> Meena is. Two parallel lists, kept in perfect step, searched by loop. Click a student
        and compare the work.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {names.map((n, i) => (
          <button key={n} onClick={() => setSel(i)} style={{
            padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: sel === i ? C.accentGlow : C.card, color: sel === i ? "#fff" : C.muted,
            border: `1.5px solid ${sel === i ? C.accent : C.border}`,
          }}>{n}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ TWO PARALLEL LISTS</div>
          <pre style={mono}>
            {`names = [${names.map((n) => `"${n}"`).join(", ")}]\nmarks = [${marks.join(", ")}]\n\n`}
            {names.map((n, i) => {
              const visited = i <= sel;
              const found = i === sel;
              return (
                <span key={n} style={{ color: found ? C.green : visited ? C.yellow : C.muted }}>
                  {`# slot ${i}: ${n}${found ? " ← found! marks[" + i + "] = " + marks[i] : " ? no"}\n`}
                </span>
              );
            })}
            <span style={{ color: C.red }}>{`# ${sel + 1} slot${sel > 0 ? "s" : ""} checked — and if the\n# lists ever drift apart... 💥`}</span>
          </pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ ONE DICTIONARY</div>
          <pre style={mono}>
            {`marks = {\n${names.map((n, i) => `  "${n}": ${marks[i]},`).join("\n")}\n}\n\nmarks["${names[sel]}"]`}
            <span style={{ color: C.green }}>{`  → ${marks[sel]}`}</span>
            {`\n`}<span style={{ color: C.muted }}># one step. no hunting.</span>
          </pre>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>A dictionary stores pairs: key → value.</strong> Instead of
        "what's in slot 3?" you ask "what did MEENA score?" — the question you actually wanted to ask.
        Curly braces, a colon between each key and value.
      </>)}
    </div>
  );
}

// ── Widget 3: Dict anatomy — lockers with names + KeyError gotcha ──
function LockerWidget() {
  const initial = { PRIYA: 87, ARUN: 62, MEENA: 91 };
  const [d, setD] = useState(initial);
  const [log, setLog] = useState([]);
  const [flash, setFlash] = useState(null);

  const run = (code, fn, note, flashKey) => {
    setD((prev) => fn({ ...prev }));
    setLog((l) => [...l, { code, note, err: false }]);
    setFlash(flashKey);
  };
  const keyError = () => {
    setLog((l) => [...l, { code: 'marks["RAJ"]', note: "KeyError: 'RAJ' — no such locker!", err: true }]);
    setFlash(null);
  };
  const reset = () => { setD(initial); setLog([]); setFlash(null); };

  const hasDivya = "DIVYA" in d;
  const arunUpdated = d.ARUN === 65;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Unit 4.2 called a variable "a labelled locker". A dictionary is a whole <em>row</em> of lockers —
        but labelled with names YOU choose, not slot numbers. Press each operation and watch the lockers.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 12px", marginBottom: 14 }}>
        <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>
          marks &nbsp;·&nbsp; {Object.keys(d).length} lockers
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {Object.entries(d).map(([k, v]) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: flash === k ? C.accent : C.teal, fontWeight: 700, marginBottom: 3 }}>"{k}"</div>
              <div style={{
                minWidth: 62, height: 46, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8, fontFamily: "monospace", fontSize: 16, fontWeight: 700,
                background: flash === k ? C.accent + "26" : C.surface,
                color: flash === k ? C.accent : C.text,
                border: `2px solid ${flash === k ? C.accent : C.teal + "66"}`, transition: "all 0.25s",
              }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 10.5, color: C.muted }}>
          key (the label) → value (what's inside)
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <button onClick={() => run('marks["DIVYA"] = 78', (x) => ({ ...x, DIVYA: 78 }), "NEW key → a locker appears", "DIVYA")}
          disabled={hasDivya} style={{
            padding: "9px 14px", borderRadius: 8, fontSize: 12, fontFamily: "monospace", fontWeight: 600,
            background: hasDivya ? C.card : C.green + "1c", color: hasDivya ? C.muted : C.green,
            border: `1.5px solid ${hasDivya ? C.border : C.green}66`, cursor: hasDivya ? "default" : "pointer",
          }}>marks["DIVYA"] = 78</button>
        <button onClick={() => run('marks["ARUN"] = 65', (x) => ({ ...x, ARUN: 65 }), "EXISTING key → value overwritten, same locker", "ARUN")}
          disabled={arunUpdated} style={{
            padding: "9px 14px", borderRadius: 8, fontSize: 12, fontFamily: "monospace", fontWeight: 600,
            background: arunUpdated ? C.card : C.accent + "1c", color: arunUpdated ? C.muted : C.accent,
            border: `1.5px solid ${arunUpdated ? C.border : C.accent}66`, cursor: arunUpdated ? "default" : "pointer",
          }}>marks["ARUN"] = 65</button>
        <button onClick={keyError} style={{
          padding: "9px 14px", borderRadius: 8, fontSize: 12, fontFamily: "monospace", fontWeight: 600,
          background: C.red + "1c", color: C.red, border: `1.5px solid ${C.red}66`, cursor: "pointer",
        }}>marks["RAJ"]</button>
        <button onClick={reset} style={{
          padding: "9px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
          background: C.card, color: C.muted, border: `1.5px solid ${C.border}`, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      {log.length > 0 && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, marginBottom: 4 }}>
          {log.slice(-4).map((e, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 1.9 }}>
              <span style={{ color: e.err ? C.red : C.text }}>{e.code}</span>
              <span style={{ color: e.err ? C.red : C.muted }}>{"   # " + e.note}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.8 }}>
        Safety check before opening a locker: <code style={{ color: C.teal }}>"RAJ" in marks</code> →
        <code style={{ color: C.red }}> False</code> — the <code style={{ color: C.teal }}>in</code> keyword
        checks the <em>keys</em>, and pairs beautifully with Module 5's <code style={{ color: C.teal }}>if</code>.
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>One key, one locker.</strong> Assigning to a new key creates a
        locker; assigning to an existing key overwrites its value; <em>reading</em> a missing key raises
        a <code style={{ color: C.red }}>KeyError</code>. Check with <code style={{ color: C.teal }}>in</code> first when unsure.
      </>)}
    </div>
  );
}

// ── Widget 4: Build It — grade report (dict + loop + if) ──
function BuildWidget() {
  const [arun, setArun] = useState(62);
  const entries = [["PRIYA", 87], ["ARUN", arun], ["MEENA", 91]];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The full Module 5 + 6 + 7 team-up: loop over a dictionary (<code style={{ color: C.accent }}>for name in marks</code> hands
        you each <em>key</em>), look up the value, and let an <code style={{ color: C.teal }}>if</code> assign
        the grade. Drag Arun's mark across the 75 boundary.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>marks["ARUN"] = <strong style={{ color: C.accent }}>{arun}</strong></label>
        <input type="range" min={0} max={100} value={arun} onChange={(e) => setArun(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE PROGRAM</div>
          <pre style={mono}>
            {`marks = {\n  "PRIYA": 87,\n  "ARUN": ${arun},\n  "MEENA": 91,\n}\n\nfor name in marks:\n    if marks[name] >= 75:\n        print(name, "→ Distinction")\n    else:\n        print(name, "→ Pass")`}
          </pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          <pre style={mono}>
            {entries.map(([n, m]) => (
              <span key={n} style={{ color: m >= 75 ? C.green : C.yellow }}>
                {`${n} → ${m >= 75 ? "Distinction" : "Pass"}\n`}
              </span>
            ))}
          </pre>
          <div style={{ marginTop: 12, fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
            The loop visits each <em>key</em> ("PRIYA", "ARUN", "MEENA");
            <code style={{ color: C.teal }}> marks[name]</code> opens that locker for the if-check.
          </div>
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>Everything you've learned works on dictionaries too.</strong> Loops
        walk them, ifs judge them, len() counts them. You now hold all four collection tools: string, list,
        tuple, dict — time to build something real with them.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: 't = (10, 20, 30)\nt[0] = 99\n\nWhat happens?',
      options: ["t becomes (99, 20, 30)", "TypeError — tuples are immutable", "t becomes (99, 10, 20, 30)", "Nothing"],
      answer: 1,
      explain: "Tuples are locked: reading t[0] is fine, but assigning raises TypeError. That loud error is the tuple doing its job — protecting fixed data.",
    },
    {
      q: 'd = {"a": 1, "b": 2}\nprint(d["b"])\n\nWhat does this print?',
      options: ["1", "2", "b", "KeyError"],
      answer: 1,
      explain: 'd["b"] opens the locker labelled "b" and hands you its value: 2.',
    },
    {
      q: 'd = {"a": 1}\nd["b"] = 5\nd["a"] = 9\nprint(d)\n\nWhat does this print?',
      options: ['{"a": 1, "b": 5}', '{"a": 9, "b": 5}', '{"a": 9}', "KeyError"],
      answer: 1,
      explain: 'New key "b" creates a pair; existing key "a" gets its value overwritten. Result: {"a": 9, "b": 5}.',
    },
    {
      q: 'marks = {"PRIYA": 87, "ARUN": 62}\nprint("ARUN" in marks)\nprint(87 in marks)\n\nWhat does this print?',
      options: ["True, True", "True, False", "False, True", "False, False"],
      answer: 1,
      explain: "The in keyword checks KEYS only. \"ARUN\" is a key → True. 87 is a value, not a key → False.",
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
          {score === 4 ? "Perfect! All four collections are in your toolkit." :
            score >= 2 ? "Good work! If keys vs values tripped you up, replay 'Lockers With Names' — pressing the buttons makes it stick." :
              "Worth a replay: 'The Locked List' for tuples and 'Lockers With Names' for how dictionaries behave."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 7.4 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Strings, lists, tuples, dictionaries — you can now pick the right container for any data:
            changeable or locked, numbered or named.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 7.5 — Capstone: Student Marks Manager.</strong> Every
            tool from Modules 5, 6 and 7 in one real program: enter marks, compute the average, crown the
            topper, print the grade report. Your biggest build yet.
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
              cursor: selected !== null ? "default" : "pointer", fontSize: 13, transition: "all 0.25s", fontFamily: "monospace",
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
export default function Unit7_4({ student, onUnitComplete }) {
  const sections = [
    { id: "tuple", label: "The Locked List" },
    { id: "why-dict", label: "Look Up By Name" },
    { id: "lockers", label: "Lockers With Names" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Tuples: The List With a Lock</h3><TupleWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Dictionaries: Look Up By Name</h3><DictNeedWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Lockers With Names</h3><LockerWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build It: Grade Report</h3><BuildWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 7.4.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 7 › UNIT 7.4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Tuples & Dictionaries</div>
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
