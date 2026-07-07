// Unit 9.2 — Catching & Raising (specific exceptions, else/finally, raise your own)
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

// ── Widget 1: A Zoo of Errors — each bad move has its own named type ──
function ErrorZooWidget() {
  const [sel, setSel] = useState(0);
  const rows = [
    { code: 'int("abc")', type: "ValueError", msg: "invalid literal for int() with base 10: 'abc'", when: "Right type of thing (text) but the wrong value — 'abc' just isn't a number." },
    { code: "10 / 0", type: "ZeroDivisionError", msg: "division by zero", when: "Maths that has no answer. Dividing by zero is undefined, so Python refuses." },
    { code: 'prices["mango"]', type: "KeyError", msg: "'mango'", when: "Asking a dictionary for a key it doesn't have (Unit 7.4). The key name is the whole message." },
    { code: "nums[99]", type: "IndexError", msg: "list index out of range", when: "Reaching past the end of a list (Unit 7.2). nums only has a few slots — 99 doesn't exist." },
    { code: '"score: " + 5', type: "TypeError", msg: 'can only concatenate str (not "int") to str', when: "Mixing incompatible types — you can't glue a number onto text with +. (int() or str() fixes it.)" },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Last unit you caught a <code style={{ color: C.accent }}>ValueError</code>. But that's just one animal
        in the zoo — every kind of failure raises its own <em>named</em> exception. Click each broken line to
        meet the exception it throws.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 6, marginBottom: 14 }}>
        {rows.map((r, i) => (
          <div key={i} onClick={() => setSel(i)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "9px 14px", borderRadius: 8, cursor: "pointer",
            background: sel === i ? C.red + "18" : C.card,
            border: `1.5px solid ${sel === i ? C.red : C.border}`, transition: "all 0.2s",
          }}>
            <code style={{ fontFamily: "monospace", fontSize: 13, color: sel === i ? C.text : C.muted, flex: 1 }}>{r.code}</code>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: C.red }}>💥 {r.type}</span>
          </div>
        ))}
      </div>

      <div style={{ background: C.surface, border: `1.5px solid ${C.red}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ color: C.red, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{rows[sel].type}: {rows[sel].msg}</div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{rows[sel].when}</div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>You catch exceptions by name.</strong> <code style={{ color: C.teal }}>except
        ValueError</code> catches ONLY value errors — a ZeroDivisionError would sail straight past it and still
        crash. Naming the right type is how you catch the problem you expect and let real bugs surface loudly.
      </>)}
    </div>
  );
}

// ── Widget 2: Multi-catch + else + finally anatomy ──
function AnatomyWidget() {
  const [sel, setSel] = useState(0);
  const parts = [
    { text: "try:\n    n = int(raw)\n    result = 100 / n", color: C.accent, title: "try — the risky block", body: "Two things that could fail: int(raw) might raise ValueError, and 100 / n might raise ZeroDivisionError if n is 0." },
    { text: "\nexcept ValueError:\n    print(\"Not a number\")", color: C.purple, title: "except ValueError", body: "Handles ONLY the bad-text case. If int(raw) fails, Python jumps here and skips everything else in the try." },
    { text: "\nexcept ZeroDivisionError:\n    print(\"Can't divide by zero\")", color: C.orange, title: "a second except", body: "You can stack as many except blocks as you like. Python runs the FIRST one whose type matches the exception raised." },
    { text: "\nelse:\n    print(\"Answer:\", result)", color: C.green, title: "else — only if NO error", body: "The else block runs only when the try finished with no exception at all. A clean place for 'everything worked' code." },
    { text: "\nfinally:\n    print(\"Done checking.\")", color: C.teal, title: "finally — ALWAYS runs", body: "Runs no matter what — error or no error, caught or not. Perfect for cleanup like closing a file (next unit!)." },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A full try statement has four possible parts. Click each to see when it fires. The mental model:
        <strong style={{ color: C.text }}> try, then either an except OR else, and finally always</strong>.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 14 }}>
        <pre style={{ ...mono, fontSize: 13 }}>
          {parts.map((p, i) => (
            <span key={i} onClick={() => setSel(i)} style={{
              color: p.color, cursor: "pointer", fontWeight: sel === i ? 800 : 600,
              background: sel === i ? p.color + "22" : "transparent",
              borderRadius: 4, transition: "all 0.2s",
            }}>{p.text}</span>
          ))}
        </pre>
      </div>

      <div style={{ background: C.surface, border: `1.5px solid ${parts[sel].color}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ color: parts[sel].color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{parts[sel].title}</div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{parts[sel].body}</div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>except = plan B, else = "all clear", finally = "no matter what".</strong> Most
        of the time you just need try + except. Reach for else when you want success-only code kept out of the
        risky zone, and finally when something must happen either way.
      </>)}
    </div>
  );
}

// ── Widget 3: Trace It — else/finally across three inputs ──
function TraceWidget() {
  const [mode, setMode] = useState(0); // 0=good, 1=zero, 2=text
  const [idx, setIdx] = useState(0);
  const raws = ['"5"', '"0"', '"abc"'];
  const lines = [
    `raw = ${raws[mode]}`,
    "try:",
    "    n = int(raw)",
    "    result = 100 / n",
    "except ValueError:",
    '    print("Not a number")',
    "except ZeroDivisionError:",
    '    print("Cannot divide by zero")',
    "else:",
    '    print("Answer:", result)',
    "finally:",
    '    print("Done.")',
  ];

  const good = [
    [0, "run", "", "raw = \"5\"."],
    [2, "run", "", "int(\"5\") → n = 5. Fine."],
    [3, "run", "", "100 / 5 → result = 20. No exception."],
    [8, "run", "", "No error was raised, so the else block runs."],
    [9, "run", "Answer: 20", "else prints the success message."],
    [10, "run", "Answer: 20", "finally always runs..."],
    [11, "run", "Answer: 20\nDone.", "...and prints 'Done.' Program ends cleanly."],
  ];
  const zero = [
    [0, "run", "", "raw = \"0\"."],
    [2, "run", "", "int(\"0\") → n = 0. Fine so far."],
    [3, "err", "", "💥 100 / 0 raises ZeroDivisionError! The rest of try is abandoned."],
    [6, "err", "", "except ValueError doesn't match — skip it. except ZeroDivisionError matches → jump here."],
    [7, "caught", "Cannot divide by zero", "The handler runs."],
    [10, "caught", "Cannot divide by zero", "else is SKIPPED (there was an error). But finally still runs..."],
    [11, "caught", "Cannot divide by zero\nDone.", "...printing 'Done.' Even a caught error still gets finally."],
  ];
  const text = [
    [0, "run", "", "raw = \"abc\"."],
    [2, "err", "", "💥 int(\"abc\") raises ValueError immediately — line 4 never even runs."],
    [4, "err", "", "except ValueError matches → jump here (the second except is skipped)."],
    [5, "caught", "Not a number", "The handler runs."],
    [10, "caught", "Not a number", "else skipped (error happened). finally runs regardless..."],
    [11, "caught", "Not a number\nDone.", "...printing 'Done.' Notice finally fires in ALL three inputs."],
  ];
  const steps = [good, zero, text][mode];
  const [line, status, output, narr] = steps[Math.min(idx, steps.length - 1)];

  const switchTo = (m) => { setMode(m); setIdx(0); };
  const statusMap = {
    run: { label: "running", color: C.accent },
    err: { label: "💥 exception raised", color: C.red },
    caught: { label: "✅ caught & recovering", color: C.green },
  };
  const btns = [{ t: 'raw="5"', c: C.green }, { t: 'raw="0"', c: C.orange }, { t: 'raw="abc"', c: C.red }];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        One try/except/else/finally, three different inputs. Step each and watch <em>which</em> except fires,
        when <code style={{ color: C.green }}>else</code> is skipped, and how <code style={{ color: C.teal }}>finally</code> runs
        every single time.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {btns.map((b, m) => (
          <button key={m} onClick={() => switchTo(m)} style={{
            flex: 1, padding: "8px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 12,
            background: mode === m ? b.c + "22" : C.card, border: `1.5px solid ${mode === m ? b.c : C.border}`,
            color: mode === m ? b.c : C.muted,
          }}>{b.t}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: 12, lineHeight: 1.85, padding: "0px 8px", borderRadius: 6,
              background: i === line ? (status === "err" ? C.red + "22" : C.accent + "22") : "transparent",
              borderLeft: `3px solid ${i === line ? (status === "err" ? C.red : C.accent) : "transparent"}`,
              color: i === line ? C.text : C.muted, whiteSpace: "pre", minHeight: 22,
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

      {insight(C.teal, <>
        <strong style={{ color: C.teal }}>else runs only on success; finally runs always.</strong> Across all
        three inputs, "Done." printed every time — that's what makes finally the home for cleanup that must not
        be skipped, like closing a file even when something went wrong.
      </>)}
    </div>
  );
}

// ── Widget 4: Raise your own — enforce a rule ──
function RaiseWidget() {
  const [mark, setMark] = useState(85);
  const ok = mark >= 0 && mark <= 100;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        So far Python raised the errors. Now <em>you</em> raise one — on purpose — to stop bad data early. A
        mark of 150 or −10 isn't a Python error, but it IS wrong for your program. Drag the mark and watch
        <code style={{ color: C.accent }}> raise</code> reject the impossible values.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>mark = <strong style={{ color: ok ? C.green : C.red }}>{mark}</strong></label>
        <input type="range" min={-10} max={110} value={mark} onChange={(e) => setMark(Number(e.target.value))} style={{ width: "100%", accentColor: ok ? C.green : C.red }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE RULE</div>
          <pre style={mono}>{`def set_mark(mark):
    if mark < 0 or mark > 100:
        raise ValueError(
            "Mark must be 0-100")
    return mark

try:
    set_mark(${mark})
    print("Accepted:", ${mark})
except ValueError as e:
    print("Rejected:", e)`}</pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${ok ? C.green : C.red}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: ok ? C.green : C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          {ok ? (
            <pre style={{ ...mono, color: C.green }}>{`Accepted: ${mark}`}</pre>
          ) : (
            <pre style={{ ...mono, color: C.red }}>{`Rejected: Mark must be 0-100`}</pre>
          )}
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 10, lineHeight: 1.6 }}>
            {ok
              ? "In range → no raise → set_mark returns the value normally."
              : "Out of range → raise fires → set_mark stops instantly and the except catches it. as e grabs the message text."}
          </div>
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>raise lets you throw an exception yourself</strong> to enforce
        your program's rules — "fail fast" instead of storing nonsense. And <code style={{ color: C.teal }}>except
        ValueError as e</code> captures the exception object so you can print its message. You are now on both
        sides: raising AND catching.
        <br /><br />
        <span style={{ color: C.teal }}>Coming up:</span> here you're raising Python's <em>built-in</em> errors. Once
        you learn classes, you'll define your <strong style={{ color: C.text }}>own</strong> error types (e.g.{" "}
        <code style={{ color: C.teal }}>class MarksError(Exception)</code>) — that's <strong style={{ color: C.text }}>Unit 10.6, User-Defined Exceptions</strong>.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: 'prices = {"apple": 40}\nprint(prices["banana"])\n\nWhich exception does this raise?',
      options: ["ValueError", "KeyError", "IndexError", "TypeError"],
      answer: 1,
      explain: "Asking a dictionary for a key it doesn't have raises KeyError. The message is just the missing key name: 'banana'.",
    },
    {
      q: "You write `except ValueError:` but the code actually raises a ZeroDivisionError. What happens?",
      options: ["It's caught anyway — except catches everything", "The ZeroDivisionError is NOT caught; the program still crashes", "Python changes it into a ValueError", "Nothing runs at all"],
      answer: 1,
      explain: "except catches only the type you name. A ZeroDivisionError doesn't match `except ValueError`, so it stays uncaught and crashes. Catch the type you actually expect.",
    },
    {
      q: "Which block runs no matter what — whether or not an exception was raised?",
      options: ["except", "else", "finally", "try"],
      answer: 2,
      explain: "finally always runs: success, caught error, even uncaught error. That's why it's used for cleanup like closing a file.",
    },
    {
      q: 'def set_age(a):\n    if a < 0:\n        raise ValueError("no negatives")\n    return a\n\nWhat does `raise` do here?',
      options: ["Prints an error message and continues", "Throws an exception on purpose to reject bad input", "Returns a from the function", "Ends the whole program permanently"],
      answer: 1,
      explain: "raise deliberately throws an exception so callers can catch it. It stops the function immediately — 'fail fast' rather than accepting a negative age.",
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
          {score === 4 ? "Excellent! You can catch the right exception by name and raise your own." :
            score >= 2 ? "Good work! If else/finally ordering is fuzzy, replay 'Trace It' across all three inputs." :
              "Worth a replay: the Error Zoo (types) and Trace It (else vs finally). Catch by name; finally always runs."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 9.2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now catch specific exceptions by name, stack multiple excepts, use else and finally, and
            raise your own errors to enforce rules.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 9.3 — Files: Making Data Survive.</strong> Every
            program you've built forgets everything when it closes. Time to write data to a file so it lives on
            — and finally will help us close that file safely.
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
export default function Unit9_2({ student, onUnitComplete }) {
  const sections = [
    { id: "zoo", label: "Error Zoo" },
    { id: "anatomy", label: "except / else / finally" },
    { id: "trace", label: "Trace It" },
    { id: "raise", label: "Raise Your Own" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>A Zoo of Named Errors</h3><ErrorZooWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>except, else &amp; finally</h3><AnatomyWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Trace It: Three Inputs</h3><TraceWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Raise Your Own Error</h3><RaiseWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 9.2.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 9 › UNIT 9.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Catching &amp; Raising</div>
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
