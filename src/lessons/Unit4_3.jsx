// ============================================================================
//  UNIT 4.3 — "Input & Type Conversion"
// ----------------------------------------------------------------------------
//  WHERE THIS FILE FITS IN THE APP
//  --------------------------------
//  Lives at src/lessons/Unit4_3.jsx. App.jsx dynamically imports this file
//  (via import.meta.glob) when the "Input & Type Conversion" card is clicked
//  on the Dashboard — that card exists because config/course.config.js lists
//  { unitId: "Unit4_3", ... } under Module 4. Same contract as every other
//  lesson: props are `student` (whoever is logged in) and `onUnitComplete`
//  (called once, from inside the closing Quiz, to persist progress via
//  src/shell/api.js and send the learner back to a Dashboard where this
//  unit's card is now ticked ✅).
//
//  TEACHING APPROACH FOR THIS UNIT:
//    Unit 4.2 taught that every variable has a TYPE, decided by Python from
//    the value assigned to it. This unit uses that foundation to explain a
//    fact that trips up almost every beginner: input() ALWAYS hands back a
//    string, even if the user typed a number. We first let the student HIT
//    the resulting bug themselves (str + int -> TypeError), THEN introduce
//    int()/float()/str() as the fix, THEN let them build a tiny real program
//    that ties input -> casting -> arithmetic -> print together end to end.
// ============================================================================

import { useState } from "react";

// ----------------------------------------------------------------------------
// COLOUR PALETTE — same convention as every other lesson: local and
// self-contained, no cross-file imports.
// ----------------------------------------------------------------------------
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
  teal: "#39D0D8",
  text: "#E6EDF3",
  muted: "#8B949E",
  border: "#30363D",
};

// ============================================================================
// WIDGET 1 — InputBasics
// A live, typeable simulation of Python's input() function. The student
// types their own name into a "terminal" text box; clicking Submit shows
// exactly what input() handed back to the program — always text (str),
// confirmed with a type() check, even though nothing about a name LOOKS
// unusual as a string. This sets up the trap explored in the next widget.
// ============================================================================
function InputBasics() {
  // What the student has typed into the simulated terminal prompt.
  const [typed, setTyped] = useState("");
  // Whether they've clicked Submit yet — controls when we reveal the result.
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (typed.trim().length === 0) return; // ignore empty submissions
    setSubmitted(true);
  };

  const reset = () => { setSubmitted(false); setTyped(""); };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        <code style={{ color: C.accent }}>input()</code> pauses your program, waits for the user to type
        something and press Enter, and hands that text back to you. Try it — type your name below, exactly
        like you would in a real terminal.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 16px", marginBottom: 14, fontFamily: "monospace", fontSize: 13, color: C.text }}>
        name = input("What's your name? ")
      </div>

      {/* Simulated terminal prompt + text field + submit button */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <div style={{ flex: 1, background: "#010409", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: C.teal, fontFamily: "monospace", fontSize: 13 }}>What's your name? </span>
          <input
            value={typed}
            disabled={submitted}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="type here…"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontFamily: "monospace", fontSize: 13 }}
          />
        </div>
        {!submitted ? (
          <button onClick={submit} style={{ padding: "0 18px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Enter ↵</button>
        ) : (
          <button onClick={reset} style={{ padding: "0 18px", borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.muted, cursor: "pointer" }}>↺ Reset</button>
        )}
      </div>

      {/* Result revealed only after submission */}
      {submitted && (
        <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: C.muted, marginBottom: 8 }}>
            &gt;&gt;&gt; print(name)
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 15, color: C.text, marginBottom: 12 }}>{typed}</div>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: C.muted, marginBottom: 8 }}>
            &gt;&gt;&gt; type(name)
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 700, color: C.accent }}>&lt;class 'str'&gt;</div>
        </div>
      )}

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.accent }}>Key idea:</strong> no matter WHAT the user types — a name, a
        number, even nothing — <code style={{ color: C.accent }}>input()</code> always hands it back as a{" "}
        <strong style={{ color: C.accent }}>string</strong>. That's about to matter a lot.
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 2 — StrIntTrap
// Lets the student type a NUMBER (like an age) into the same kind of
// simulated input() prompt, then try to use it in arithmetic directly. This
// deliberately reproduces Python's real TypeError, because seeing the bug
// happen is far more memorable than being told about it in advance.
// ============================================================================
function StrIntTrap() {
  const [typed, setTyped] = useState("");
  const [stage, setStage] = useState(0); // 0 = typing, 1 = shown the crash, 2 = shown the fix

  const submit = () => {
    if (typed.trim().length === 0) return;
    setStage(1);
  };

  const reset = () => { setStage(0); setTyped(""); };

  // Whether whatever the student typed can even be parsed as a whole number
  // — used only to keep the "fixed" output realistic if they type something
  // like "twenty" instead of "20".
  const parsedAge = parseInt(typed, 10);
  const isNumeric = !Number.isNaN(parsedAge) && String(parsedAge) === typed.trim();

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Now type your AGE (just the number) into the prompt below, and we'll try to use it in a calculation —
        exactly the way a beginner naturally would.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 16px", marginBottom: 14, fontFamily: "monospace", fontSize: 13, color: C.text }}>
        age = input("How old are you? ")<br />
        print(age + 5)
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <div style={{ flex: 1, background: "#010409", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: C.teal, fontFamily: "monospace", fontSize: 13 }}>How old are you? </span>
          <input
            value={typed}
            disabled={stage > 0}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="e.g. 20"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontFamily: "monospace", fontSize: 13 }}
          />
        </div>
        {stage === 0 ? (
          <button onClick={submit} style={{ padding: "0 18px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Enter ↵</button>
        ) : (
          <button onClick={reset} style={{ padding: "0 18px", borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.muted, cursor: "pointer" }}>↺ Reset</button>
        )}
      </div>

      {/* Stage 1: the crash */}
      {stage >= 1 && (
        <div style={{ background: C.red + "18", border: `1.5px solid ${C.red}55`, borderRadius: 10, padding: 16, marginBottom: 14, fontFamily: "monospace", fontSize: 12, color: C.red, lineHeight: 1.7 }}>
          Traceback (most recent call last):<br />
          &nbsp;&nbsp;print(age + 5)<br />
          TypeError: can only concatenate str (not "int") to str
        </div>
      )}

      {stage >= 1 && (
        <div style={{ background: C.yellow + "18", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, marginBottom: 14 }}>
          ⚠️ Even though <code style={{ color: C.yellow }}>{typed || "20"}</code> LOOKS like a number, input() stored
          it as the string <code style={{ color: C.yellow }}>"{typed || "20"}"</code>. Python refuses to add a
          number (5) to text — it has no idea whether you meant "join them" or "add them," so it stops and
          raises an error instead of guessing.
        </div>
      )}

      {/* Offer the fix once the crash has been shown */}
      {stage === 1 && (
        <button onClick={() => setStage(2)} style={{
          width: "100%", padding: "10px", borderRadius: 8, background: C.accentGlow,
          border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>Show me the fix →</button>
      )}

      {/* Stage 2: the fix, using int() */}
      {stage >= 2 && (
        <div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 16px", marginBottom: 10, fontFamily: "monospace", fontSize: 13, color: C.text }}>
            age = input("How old are you? ")<br />
            <span style={{ color: C.green }}>age = int(age)</span> &nbsp;<span style={{ color: C.muted }}># convert text → whole number</span><br />
            print(age + 5)
          </div>
          <div style={{ background: C.green + "18", border: `1.5px solid ${C.green}55`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 14, color: C.green }}>
            &gt; {isNumeric ? parsedAge + 5 : "25"}
          </div>
          <div style={{ marginTop: 10, color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
            <code style={{ color: C.green }}>int(age)</code> reads the text in the age slot, and — if it looks like
            a whole number — creates a brand-new int value from it. Now <code style={{ color: C.green }}>age + 5</code>{" "}
            is a number plus a number, which Python happily adds.
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// WIDGET 3 — CastPipeline
// A reference-style widget: the three most common casting functions
// (int, float, str) shown as small "conversion machines" with example
// inputs/outputs, plus a demonstration that casting can itself fail
// (int("hello") raises ValueError) — casting is not magic, it still has
// rules.
// ============================================================================
function CastPipeline() {
  const machines = [
    {
      name: "int()", color: C.accent,
      examples: [
        { input: '"25"', output: "25", ok: true },
        { input: '"3.9"', output: "ValueError", ok: false },
        { input: '"hello"', output: "ValueError", ok: false },
      ],
      desc: "Converts text (or a float) into a whole number. Fails if the text isn't a clean whole number.",
    },
    {
      name: "float()", color: C.teal,
      examples: [
        { input: '"3.14"', output: "3.14", ok: true },
        { input: '"25"', output: "25.0", ok: true },
        { input: '"abc"', output: "ValueError", ok: false },
      ],
      desc: "Converts text (or an int) into a decimal number. More forgiving than int() — whole numbers are fine too.",
    },
    {
      name: "str()", color: C.purple,
      examples: [
        { input: "25", output: '"25"', ok: true },
        { input: "3.14", output: '"3.14"', ok: true },
        { input: "True", output: '"True"', ok: true },
      ],
      desc: "Converts almost anything into text. This basically never fails — everything can be described as text.",
    },
  ];

  // Which conversion machine's card is expanded, or null if none.
  const [active, setActive] = useState(null);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Python gives you three small "conversion machines" for switching a value between types. Tap each one to
        see example conversions — including cases where the conversion is impossible.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {machines.map((m, i) => (
          <div key={i} onClick={() => setActive(active === i ? null : i)} style={{
            background: active === i ? m.color + "18" : C.card,
            border: `1.5px solid ${active === i ? m.color : C.border}`,
            borderRadius: 10, padding: "12px 14px", cursor: "pointer", transition: "all 0.25s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: m.color }}>{m.name}</span>
              <span style={{ color: C.muted, fontSize: 12 }}>{m.desc}</span>
            </div>
            {active === i && (
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                {m.examples.map((ex, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "monospace", fontSize: 12, background: C.bg, borderRadius: 6, padding: "6px 10px" }}>
                    <span style={{ color: C.text }}>{m.name.replace("()", "")}({ex.input})</span>
                    <span style={{ color: C.muted }}>→</span>
                    <span style={{ color: ex.ok ? C.green : C.red, fontWeight: 700 }}>{ex.output}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>Key idea:</strong> casting doesn't change the ORIGINAL variable —
        it creates a new value of the requested type, which you then usually store back into the same
        variable (like <code style={{ color: C.purple }}>age = int(age)</code>).
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 4 — BuildAProgram
// A small capstone for this unit: the learner enters their OWN current age
// through a real, live control (a number input), and we walk through the
// exact program — input (conceptually), cast, add 1, print — using their
// real number, tying input + casting + arithmetic + print together end to
// end. This previews the operators covered fully in Unit 4.4.
// ============================================================================
function BuildAProgram() {
  // The learner's own age, entered as a real number input (defaults to 18,
  // a plausible age for a first-year B.Tech student).
  const [age, setAge] = useState(18);
  const nextYearAge = age + 1;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Let's put everything in this unit together in one tiny real program: ask for your age, convert it to a
        number, add 1, and print how old you'll be next year. Drag the slider to change your age and watch
        every step update live.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>Your age: <strong style={{ color: C.accent }}>{age}</strong></label>
        <input type="range" min={10} max={80} value={age} onChange={(e) => setAge(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 13, lineHeight: 2 }}>
        <div><span style={{ color: C.muted }}>1</span> &nbsp; age_text = input("How old are you? ") &nbsp;<span style={{ color: C.muted }}># age_text = "{age}"</span></div>
        <div><span style={{ color: C.muted }}>2</span> &nbsp; age = <span style={{ color: C.green }}>int(age_text)</span> &nbsp;<span style={{ color: C.muted }}># age = {age} (a real number now)</span></div>
        <div><span style={{ color: C.muted }}>3</span> &nbsp; next_year = age + 1 &nbsp;<span style={{ color: C.muted }}># next_year = {nextYearAge}</span></div>
        <div><span style={{ color: C.muted }}>4</span> &nbsp; print(next_year)</div>
      </div>

      <div style={{ marginTop: 14, background: C.green + "18", border: `1.5px solid ${C.green}55`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 15, color: C.green, textAlign: "center" }}>
        &gt; {nextYearAge}
      </div>

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.accent }}>Key idea:</strong> almost every useful Python program follows this
        same shape — get input, convert it to the right type, compute something, show the result.
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 5 — Quiz
// Standard closing quiz; only its onComplete triggers onUnitComplete.
// ============================================================================
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What type of value does input() ALWAYS return?",
      options: ["Whatever type looks correct for what was typed", "Always a string (str), no matter what was typed", "Always an integer", "Always a boolean"],
      answer: 1,
      explain: "input() always returns text (str). Even if the user types digits, Python stores them as characters, not as a number, until you explicitly convert it.",
    },
    {
      q: 'Why does age + 5 crash with a TypeError if age = input("Age: ")?',
      options: [
        "Because 5 is too large a number",
        "Because age is a string and Python won't automatically add a string and a number together",
        "Because input() cannot be used with numbers",
        "Because + is not a valid Python operator",
      ],
      answer: 1,
      explain: "age holds a string (even if it looks like a number). Python refuses to silently guess whether + means \"join text\" or \"add numbers,\" so it raises a TypeError instead.",
    },
    {
      q: "Which function converts text into a whole number?",
      options: ["str()", "float()", "int()", "input()"],
      answer: 2,
      explain: "int() converts a value (commonly a string) into a whole number, as long as the text represents a valid whole number.",
    },
    {
      q: 'What happens when you run int("hello")?',
      options: [
        "It returns 0",
        "It raises a ValueError, because \"hello\" isn't a valid whole number",
        "It silently converts to the number 8 (the word's length)",
        "It works fine and returns \"hello\" unchanged",
      ],
      answer: 1,
      explain: '"hello" cannot be interpreted as a number in any base, so int() raises a ValueError. Casting still has rules — it isn\'t magic.',
    },
    {
      q: "What is the correct order of steps in a typical input-driven program?",
      options: [
        "Print result → get input → convert type → compute",
        "Get input → convert type → compute → print result",
        "Convert type → get input → print result → compute",
        "Compute → get input → print result → convert type",
      ],
      answer: 1,
      explain: "The natural flow is: gather input from the user, convert it to the correct type, perform the computation, then show the result with print().",
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
    const final = score + (selected === questions[current].answer ? 1 : 0);
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{final >= 4 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {final} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {final === 5 ? "Perfect! You'll never be surprised by a str + int TypeError again." :
            final >= 3 ? "Good work — revisit the str/int trap section once more." :
              "Go back through the casting pipeline and try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accent}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 4.3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now take input from a user, convert it to the correct type, and use it safely in
            calculations.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 4.4 — Operators & Expressions.</strong> We'll cover
            every operator Python offers, then build a small calculator project using everything from Module 4.
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

// ============================================================================
// MAIN EXPORT — Unit4_3
// Shared shell: header, progress bar, section tabs, content card, "Mark
// Complete & Continue" navigation — identical structure to every other unit.
// ============================================================================
export default function Unit4_3({ student, onUnitComplete }) {
  // Tab order here MUST match the order of the `content` array below.
  const sections = [
    { id: "basics", label: "Getting Input" },
    { id: "trap", label: "The str + int Trap" },
    { id: "cast", label: "Type Casting" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    // 0 — input() basics, always returns str
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Getting Input From the User</h3>
      <InputBasics />
    </div>,

    // 1 — the str + int trap, reproducing the real TypeError
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>The str + int Trap</h3>
      <StrIntTrap />
    </div>,

    // 2 — casting functions reference
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Type Casting: int(), float(), str()</h3>
      <CastPipeline />
    </div>,

    // 3 — capstone mini-program tying it all together
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Build It: Age Next Year</h3>
      <BuildAProgram />
    </div>,

    // 4 — Quiz. onComplete marks this section done AND calls onUnitComplete,
    // which is the single line that actually persists Unit 4.3's completion.
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        5 questions to check your understanding of Unit 4.3.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 4 › UNIT 4.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Input & Type Conversion</div>
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
