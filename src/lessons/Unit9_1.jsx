// Unit 9.1 — Errors Aren't Failures (syntax vs runtime, tracebacks, the try/except idea)
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

// ── Widget 1: The Crash — perfect-input assumption breaks ──
function CrashWidget() {
  const [bad, setBad] = useState(false);
  const raw = bad ? "abc" : "85";

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Every program you've built so far quietly assumes the user types <em>exactly</em> what you expect.
        Real users fat-finger. Here's a tiny marks-entry program — flip what the user types and watch what
        happens to <code style={{ color: C.accent }}>int(raw)</code>.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setBad(false)} style={{
          flex: 1, padding: "10px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13,
          background: !bad ? C.green + "22" : C.card, border: `1.5px solid ${!bad ? C.green : C.border}`,
          color: !bad ? C.green : C.muted,
        }}>user types "85" ✓</button>
        <button onClick={() => setBad(true)} style={{
          flex: 1, padding: "10px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13,
          background: bad ? C.red + "22" : C.card, border: `1.5px solid ${bad ? C.red : C.border}`,
          color: bad ? C.red : C.muted,
        }}>user types "abc"</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE PROGRAM</div>
          <pre style={mono}>{`raw = "${raw}"        # what the user typed
mark = int(raw)     # the risky line
print("Recorded:", mark)
print("Saved. Bye!")`}</pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${bad ? C.red : C.green}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: bad ? C.red : C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          {!bad ? (
            <pre style={{ ...mono, color: C.green }}>{`Recorded: 85\nSaved. Bye!`}</pre>
          ) : (
            <div>
              <pre style={{ ...mono, color: C.red, fontSize: 11.5 }}>{`Traceback (most recent call last):
  File "marks.py", line 2, in <module>
    mark = int(raw)
ValueError: invalid literal for
int() with base 10: 'abc'`}</pre>
              <div style={{ color: C.red, fontSize: 11.5, marginTop: 10, lineHeight: 1.6 }}>
                💥 Crashed on line 2. Lines 3 and 4 <strong>never ran</strong>. If 30 marks were entered
                before this, all of it is gone.
              </div>
            </div>
          )}
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>A crash is not a bug in your logic — it's an unhandled <em>exception</em>.</strong> Your
        code is fine; <code style={{ color: C.teal }}>int("abc")</code> genuinely cannot become a number, so
        Python <em>raises</em> an exception. Ignore it and the whole program dies. This unit is about catching
        it instead.
      </>)}
    </div>
  );
}

// ── Widget 2: Reading a Traceback — click-to-reveal + syntax vs runtime ──
function TracebackWidget() {
  const [sel, setSel] = useState(3);
  const lines = [
    { text: "Traceback (most recent call last):", color: C.muted, title: "The header", body: "Just a label. The useful part is at the BOTTOM — Python literally tells you to read it 'most recent call last'. Always read a traceback bottom-up." },
    { text: '  File "marks.py", line 2, in <module>', color: C.teal, title: "WHERE it happened", body: "The file name and the exact line number. This is the first place you look — go straight to line 2 of marks.py." },
    { text: "    mark = int(raw)", color: C.yellow, title: "The offending line", body: "Python reprints the actual line of code that blew up, so you don't even have to open the file to see it." },
    { text: "ValueError: invalid literal for int() with base 10: 'abc'", color: C.red, title: "WHAT went wrong", body: "The most important line. Two parts: the error TYPE (ValueError) and a plain-English reason ('abc' is not a valid whole number). This is your search term when you're stuck." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        That red wall of text is not Python shouting at you — it's a precise bug report. Click each line to
        decode it. The trick: <strong style={{ color: C.text }}>read it from the bottom up</strong>.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        {lines.map((l, i) => (
          <div key={i} onClick={() => setSel(i)} style={{
            fontFamily: "monospace", fontSize: 12, lineHeight: 1.7, padding: "3px 8px", borderRadius: 6, cursor: "pointer",
            color: l.color, fontWeight: sel === i ? 800 : 500,
            background: sel === i ? l.color + "22" : "transparent",
            borderLeft: `3px solid ${sel === i ? l.color : "transparent"}`,
            whiteSpace: "pre-wrap", transition: "all 0.2s",
          }}>{l.text}</div>
        ))}
      </div>

      <div style={{ background: C.surface, border: `1.5px solid ${lines[sel].color}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ color: lines[sel].color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{lines[sel].title}</div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{lines[sel].body}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🧱 SYNTAX ERROR</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`if x = 5:      # typo: = not ==
    print(x)

# SyntaxError: invalid syntax`}</pre>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 8, lineHeight: 1.6 }}>
            Caught <em>before</em> the program runs. Python won't start at all — like a sentence with broken
            grammar.
          </div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>💥 RUNTIME ERROR</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`mark = int("abc")

# ValueError: invalid literal...`}</pre>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 8, lineHeight: 1.6 }}>
            The code is grammatically fine, so it runs — then trips <em>while</em> running, on bad data. These
            are the ones you catch.
          </div>
        </div>
      </div>

      {insight(C.orange, <>
        <strong style={{ color: C.orange }}>In C, this bad conversion would silently give garbage</strong> (or
        segfault with no explanation). Python instead hands you a <em>named, located, described</em> error —
        <code style={{ color: C.teal }}> ValueError</code> at <code style={{ color: C.teal }}>line 2</code>.
        The traceback is a gift, not a punishment.
      </>)}
    </div>
  );
}

// ── Widget 3: try / except anatomy ──
function TryExceptWidget() {
  const [sel, setSel] = useState(0);
  const parts = [
    { text: "try:", color: C.accent, title: "try — the risky zone", body: "Everything indented under try is 'code that might blow up'. Python attempts it. Same colon-and-indent block rule you've used since if (Unit 5.2)." },
    { text: "\n    mark = int(raw)", color: C.yellow, title: "the risky line", body: "The line you're worried about lives inside try. If it raises an exception, Python immediately abandons the rest of the try block — it does NOT keep going." },
    { text: "\nexcept ValueError:", color: C.purple, title: "except — the safety net", body: "'If a ValueError happens up there, come here instead of crashing.' You name which error type you're catching — here, the ValueError int() throws on bad text." },
    { text: "\n    print(\"Please type a number.\")", color: C.green, title: "the handler", body: "Your plan B. This runs ONLY when the matching error was raised. Recover, warn the user, use a default — anything but crash." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The fix is one new statement: <code style={{ color: C.accent }}>try / except</code>. The mental model
        is a tightrope walker with a safety net — <strong style={{ color: C.text }}>try the risky move; if you
        fall, the net catches you</strong> instead of hitting the ground. Click each part.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
        <pre style={{ ...mono, fontSize: 14 }}>
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
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ NO NET</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`mark = int(raw)
print("Rest of program...")`}</pre>
          <div style={{ color: C.red, fontSize: 11.5, marginTop: 8 }}>Bad input → 💥 crash. Line 2 never runs.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ WITH NET</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`try:
    mark = int(raw)
except ValueError:
    print("Type a number.")
print("Rest of program...")`}</pre>
          <div style={{ color: C.green, fontSize: 11.5, marginTop: 8 }}>Bad input → caught → program lives on.</div>
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>try = attempt; except = plan B.</strong> If the try block
        succeeds, the except is skipped entirely. If it raises the named error, Python jumps to except and
        keeps the program alive. You've turned a fatal crash into a handled hiccup.
      </>)}
    </div>
  );
}

// ── Widget 4: Trace It — normal path vs crash path ──
function TraceWidget() {
  const [bad, setBad] = useState(false);
  const [idx, setIdx] = useState(0);
  const raw = bad ? '"abc"' : '"85"';
  const lines = [
    `raw = ${raw}`,
    "try:",
    "    mark = int(raw)",
    '    print("OK:", mark)',
    "except ValueError:",
    '    print("Bad input!")',
    'print("Program continues...")',
  ];

  // [lineIdx, status, output, narration]
  const goodSteps = [
    [0, "run", "", "raw is set to \"85\"."],
    [1, "run", "", "Enter the try block — Python will attempt the risky lines."],
    [2, "run", "", "int(\"85\") works → mark becomes 85. No exception raised."],
    [3, "run", "OK: 85", "Still inside try, so this line runs normally."],
    [6, "run", "OK: 85", "try finished with NO error, so except is skipped entirely. Program continues."],
  ];
  const badSteps = [
    [0, "run", "", "raw is set to \"abc\"."],
    [1, "run", "", "Enter the try block — Python will attempt the risky lines."],
    [2, "err", "", "💥 int(\"abc\") raises ValueError! Python ABANDONS the rest of try — line 4 is skipped."],
    [4, "err", "", "Python looks for an except that matches ValueError. Found it — jump here."],
    [5, "caught", "Bad input!", "The handler runs. The crash is now a controlled message."],
    [6, "caught", "Bad input!\nProgram continues...", "Caught and recovered — line 7 STILL runs. Without the net, we'd never have reached it."],
  ];
  const steps = bad ? badSteps : goodSteps;
  const [line, status, output, narr] = steps[Math.min(idx, steps.length - 1)];

  const switchTo = (b) => { setBad(b); setIdx(0); };
  const statusMap = {
    run: { label: "running", color: C.accent },
    err: { label: "💥 exception raised", color: C.red },
    caught: { label: "✅ caught & recovered", color: C.green },
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Same code, two inputs. Step through both and watch the ▶ marker <em>jump</em> when the exception hits
        — and notice that the last line runs either way.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => switchTo(false)} style={{
          flex: 1, padding: "8px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 12.5,
          background: !bad ? C.green + "22" : C.card, border: `1.5px solid ${!bad ? C.green : C.border}`, color: !bad ? C.green : C.muted,
        }}>raw = "85" (good)</button>
        <button onClick={() => switchTo(true)} style={{
          flex: 1, padding: "8px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 12.5,
          background: bad ? C.red + "22" : C.card, border: `1.5px solid ${bad ? C.red : C.border}`, color: bad ? C.red : C.muted,
        }}>raw = "abc" (bad)</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: 12.5, lineHeight: 1.9, padding: "1px 8px", borderRadius: 6,
              background: i === line ? (status === "err" ? C.red + "22" : C.accent + "22") : "transparent",
              borderLeft: `3px solid ${i === line ? (status === "err" ? C.red : C.accent) : "transparent"}`,
              color: i === line ? C.text : C.muted, whiteSpace: "pre", minHeight: 24,
            }}>{i === line ? "▶ " : "  "}{l}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `1px solid ${statusMap[status].color}55`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>STATUS</div>
            <div style={{ color: statusMap[status].color, fontWeight: 700, fontSize: 13 }}>{statusMap[status].label}</div>
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
        <button onClick={() => setIdx((i) => Math.min(steps.length - 1, i + 1))} disabled={idx >= steps.length - 1} style={{
          padding: "10px 20px", borderRadius: 8, background: idx >= steps.length - 1 ? C.card : C.accentGlow,
          border: "none", color: idx >= steps.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: idx >= steps.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({Math.min(idx + 1, steps.length)} / {steps.length})</button>
        <button onClick={() => setIdx(0)} style={{
          padding: "10px 16px", borderRadius: 8, background: C.card, border: `1px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>An exception makes Python jump, not die.</strong> On bad input it
        leaps out of try, into the matching except, and then <em>carries on</em> with the rest of the program.
        The good path skips except; the bad path uses it. Either way, "Program continues..." runs.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "You run a program and Python refuses to start, pointing at a missing colon. What kind of error is this?",
      options: ["A runtime error you can catch with except", "A syntax error — the code is grammatically broken", "A ValueError", "A traceback"],
      answer: 1,
      explain: "A missing colon is a SyntaxError: Python can't even understand the code, so it never runs. try/except only helps with errors that happen WHILE running.",
    },
    {
      q: "When reading a traceback, which line tells you the error TYPE and reason?",
      options: ["The first line ('Traceback...')", "The 'File ... line N' line", "The very LAST line", "There is no such line"],
      answer: 2,
      explain: "Read tracebacks bottom-up. The last line is the error type + plain-English reason, e.g. 'ValueError: invalid literal...'. That's your best clue.",
    },
    {
      q: 'try:\n    x = int("50")\n    print("A")\nexcept ValueError:\n    print("B")\nprint("C")\n\nWhat is printed?',
      options: ["A then C", "B then C", "A B C", "Just C"],
      answer: 0,
      explain: 'int("50") succeeds, so the try block finishes and prints A. No error means except is SKIPPED, so no B. Then C runs. Output: A, C.',
    },
    {
      q: 'try:\n    x = int("oops")\n    print("A")\nexcept ValueError:\n    print("B")\nprint("C")\n\nWhat is printed?',
      options: ["A then C", "B then C", "A B C", "Just C — it crashed"],
      answer: 1,
      explain: 'int("oops") raises ValueError, so Python abandons try (no A), jumps to except and prints B, then continues to C. Output: B, C — no crash.',
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
          {score === 4 ? "Perfect! You can read a traceback and know exactly what try/except does." :
            score >= 2 ? "Good work! If the A/B/C questions tripped you, replay 'Trace It' — the ▶ jump is the whole idea." :
              "Worth a replay: step through 'Trace It' on both inputs. Remember: no error → except skipped; error → except runs, program lives."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 9.1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now tell syntax errors from runtime errors, read a traceback bottom-up, and you've met the
            safety net: try attempts, except catches.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 9.2 — Catching &amp; Raising.</strong> Which
            errors can you catch (ValueError, KeyError, ZeroDivisionError...)? And how do you <em>raise</em>
            your own error to enforce a rule like "a mark can't be negative"?
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
              whiteSpace: "pre-wrap", fontFamily: opt.includes("(") || opt.includes('"') ? "monospace" : "inherit",
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
export default function Unit9_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Crash" },
    { id: "traceback", label: "Read a Traceback" },
    { id: "try", label: "try / except" },
    { id: "trace", label: "Trace It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>When One Keystroke Kills Everything</h3><CrashWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Reading a Traceback</h3><TracebackWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Safety Net: try / except</h3><TryExceptWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Trace It: Two Paths</h3><TraceWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 9.1.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 9 › UNIT 9.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Errors Aren't Failures</div>
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
