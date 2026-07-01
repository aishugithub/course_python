// ============================================================================
//  UNIT 4.1 — "Your First Program"
// ----------------------------------------------------------------------------
//  WHERE THIS FILE FITS IN THE APP
//  --------------------------------
//  This file lives at  src/lessons/Unit4_1.jsx  in the course_python project.
//  It is never imported by hand anywhere — instead, src/shell/App.jsx builds
//  a map of every file in src/lessons/ using Vite's `import.meta.glob`, and
//  when the student clicks the "Your First Program" card on the Dashboard
//  (rendered from the unit list in config/course.config.js), App.jsx looks up
//  this exact file, dynamically imports it, and renders the default export
//  below — passing it two props:
//    • student        -> { name, rollNo }  (who is logged in right now)
//    • onUnitComplete  -> a callback that MUST be called once, when the
//                         learner finishes the unit. Calling it tells
//                         App.jsx to save progress (via src/shell/api.js,
//                         which talks to the Google Apps Script backend) and
//                         return the student to the Dashboard, where this
//                         unit's card will now show a green "done" tick.
//  Because every lesson file is fully self-contained (its own colours, its
//  own widgets, no shared imports), this file defines its OWN copy of the
//  colour palette (the `C` object below) instead of importing one — that is
//  the established convention in this codebase, and we follow it here too.
// ============================================================================

import { useState } from "react";

// ----------------------------------------------------------------------------
// COLOUR PALETTE
// A single object holding every colour used in this lesson. Keeping colours
// as named values (instead of hard-coded hex codes scattered everywhere)
// means the whole lesson's theme can be changed by editing this one block.
// These exact hex values match every other lesson file in the course, so the
// app feels visually consistent no matter which unit the student opens.
// ----------------------------------------------------------------------------
const C = {
  bg: "#0D1117",       // page background — near-black
  surface: "#161B22",  // header / section-background one shade lighter than bg
  card: "#1C2333",     // individual card background (buttons, boxes)
  accent: "#58A6FF",   // primary blue — used for highlights and links
  accentGlow: "#1F6FEB", // slightly deeper blue — used for solid buttons
  green: "#3FB950",    // "correct" / "success" / "completed" colour
  yellow: "#D29922",   // warnings / things to pay attention to
  purple: "#BC8CFF",   // secondary accent — used for "key insight" boxes
  red: "#F85149",       // errors / "incorrect" colour
  orange: "#F0883E",   // tertiary accent for variety in cards
  teal: "#39D0D8",     // used for terminal / output-related visuals
  text: "#E6EDF3",     // main readable text colour (near-white)
  muted: "#8B949E",    // secondary / de-emphasised text colour
  border: "#30363D",   // subtle border colour used almost everywhere
};

// ============================================================================
// WIDGET 1 — CodeRunner
// A simulated "editor + terminal" so the learner can press a Run button and
// watch Python execute their program line by line, exactly like it would in
// a real IDE — without needing an actual Python interpreter in the browser.
// This mirrors the step-reveal animation pattern already used in Unit 3.3's
// BytecodeDive widget, so returning students recognise the interaction.
// ============================================================================
function CodeRunner() {
  // The "source code" the student is looking at, shown in the editor pane.
  // Each entry is one line of Python exactly as it would appear in a .py file.
  const codeLines = [
    'print("Hello, Aishu!")',
    'print("Welcome to Python.")',
    "print(2 + 3)",
  ];

  // The terminal output that each line of code above produces when it runs.
  // Index-matched to codeLines: codeLines[i] produces outputLines[i].
  const outputLines = ["Hello, Aishu!", "Welcome to Python.", "5"];

  // How many output lines have been "printed" to the terminal so far.
  // Starts at 0 (nothing printed yet); climbs to outputLines.length once the
  // whole program has finished running.
  const [shown, setShown] = useState(0);

  // Whether the program is currently "executing" — used to disable the Run
  // button and show a "Running…" label while the reveal animation plays.
  const [running, setRunning] = useState(false);

  // run() simulates executing the program from top to bottom. Real Python
  // would do this in microseconds; we deliberately slow it down with
  // setTimeout so the learner can SEE each print() statement fire in order —
  // that's the whole teaching point of this widget.
  const run = () => {
    if (running) return; // ignore repeat clicks while already running
    setRunning(true);
    setShown(0); // reset the terminal to empty before the "re-run"
    outputLines.forEach((_, i) => {
      // Each line appears (i+1) * 700ms after the button was clicked, so
      // line 0 appears first, line 1 shortly after, and so on.
      setTimeout(() => {
        setShown((s) => s + 1);
        // Once the last line has appeared, wait a moment then unlock the
        // Run button again so the student can replay the animation.
        if (i === outputLines.length - 1) {
          setTimeout(() => setRunning(false), 500);
        }
      }, (i + 1) * 700);
    });
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Below is a real, tiny Python program. In Module 3 you learned WHY the
        Python Virtual Machine can run this. Now let's actually run it —
        click <strong style={{ color: C.accent }}>▶ Run</strong> and watch the
        output appear in the terminal, one <code style={{ color: C.accent }}>print()</code> at a time.
      </p>

      {/* Two-column layout: code editor on the left, terminal output on the right. */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {/* --- Editor pane --- */}
        <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "8px 12px", background: C.surface, borderBottom: `1px solid ${C.border}`, fontSize: 11, color: C.muted, letterSpacing: 1 }}>
            hello.py
          </div>
          <div style={{ padding: "12px 14px" }}>
            {/* One row per line of source code, numbered like a real editor. */}
            {codeLines.map((line, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontFamily: "monospace", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: C.border, minWidth: 14, textAlign: "right" }}>{i + 1}</span>
                <span style={{ color: shown > i ? C.green : C.text }}>{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- Terminal pane --- */}
        <div style={{ background: "#010409", borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "8px 12px", background: C.surface, borderBottom: `1px solid ${C.border}`, fontSize: 11, color: C.muted, letterSpacing: 1 }}>
            TERMINAL
          </div>
          <div style={{ padding: "12px 14px", minHeight: 88 }}>
            {/* Only render as many output lines as have "printed" so far. */}
            {outputLines.slice(0, shown).map((line, i) => (
              <div key={i} style={{ fontFamily: "monospace", fontSize: 12, color: C.teal, marginBottom: 4 }}>
                &gt; {line}
              </div>
            ))}
            {/* A blinking-style cursor placeholder while nothing has run yet. */}
            {shown === 0 && <div style={{ color: C.border, fontFamily: "monospace", fontSize: 12 }}>$ _</div>}
          </div>
        </div>
      </div>

      {/* Run button — triggers the run() function defined above. */}
      <button onClick={run} disabled={running} style={{
        width: "100%", padding: "11px", borderRadius: 8, border: "none",
        background: running ? C.border : C.accentGlow, color: "#fff",
        fontWeight: 600, fontSize: 14, cursor: running ? "not-allowed" : "pointer",
      }}>
        {running ? "Running…" : "▶ Run hello.py"}
      </button>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>Key idea:</strong> <code style={{ color: C.accent }}>print()</code> is a
        built-in Python <em>function</em> — a ready-made instruction that displays whatever you place
        inside its parentheses on the screen. Every single line runs top to bottom, in order.
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 2 — SyntaxChallenge ("Will it run, or will it error?")
// A short guessing game: the learner is shown a print() statement and must
// predict whether Python will run it successfully or throw an error, THEN
// see the real result plus a plain-English explanation. This targets the
// most common first-week mistakes: missing quotes, unmatched brackets, and
// Python's case sensitivity.
// ============================================================================
function SyntaxChallenge() {
  // Each snippet: the code shown to the student, whether it is valid Python,
  // and the explanation revealed after they guess.
  const snippets = [
    { code: 'print("Good morning")', valid: true, reason: "Text is wrapped in quotes, so Python treats it as a literal string. The parentheses are matched. This runs perfectly." },
    { code: "print(Good morning)", valid: false, reason: 'Without quotes, Python assumes "Good" and "morning" are variable names it should already know about. Since neither exists, this raises a NameError.' },
    { code: 'print("Good morning"', valid: false, reason: "The closing parenthesis ) is missing. Python cannot tell where the instruction ends, so this raises a SyntaxError." },
    { code: 'Print("Good morning")', valid: false, reason: "Python is case-sensitive. print (lowercase) is the built-in function; Print (capital P) does not exist, so this raises a NameError." },
    { code: "print(10 + 5)", valid: true, reason: "print() can display the RESULT of a calculation, not just text. Python computes 10 + 5 first, then prints 15." },
  ];

  // Which snippet (0-based index) the student is currently looking at.
  const [current, setCurrent] = useState(0);
  // The student's guess for the current snippet: null (no guess yet), true, or false.
  const [guess, setGuess] = useState(null);
  // Running tally of correct guesses, shown at the end.
  const [score, setScore] = useState(0);

  // Called when the student clicks "Will Run" or "Will Error".
  const choose = (guessValid) => {
    if (guess !== null) return; // one guess per snippet
    setGuess(guessValid);
    if (guessValid === snippets[current].valid) setScore((s) => s + 1);
  };

  // Move to the next snippet and reset the guess state for it.
  const next = () => {
    setCurrent((c) => Math.min(c + 1, snippets.length - 1));
    setGuess(null);
  };

  const s = snippets[current];
  const isLast = current === snippets.length - 1;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Python is strict about small details. For each line below, predict:
        will it run successfully, or will Python raise an error?
      </p>

      <div style={{ color: C.muted, fontSize: 11, marginBottom: 8 }}>
        Snippet {current + 1} of {snippets.length} · Score so far: {score}
      </div>

      {/* The code snippet under test, shown in a monospace "code" box. */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px", marginBottom: 14, fontFamily: "monospace", fontSize: 14, color: C.text }}>
        {s.code}
      </div>

      {/* Two guess buttons — disabled after a guess has been made for this snippet. */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button onClick={() => choose(true)} disabled={guess !== null} style={{
          flex: 1, padding: "10px", borderRadius: 8, cursor: guess !== null ? "default" : "pointer",
          background: guess !== null ? (s.valid ? C.green + "22" : C.card) : C.card,
          border: `1.5px solid ${guess !== null && s.valid ? C.green : C.border}`,
          color: guess !== null && s.valid ? C.green : C.text, fontWeight: 600, fontSize: 13,
        }}>✅ Will Run</button>
        <button onClick={() => choose(false)} disabled={guess !== null} style={{
          flex: 1, padding: "10px", borderRadius: 8, cursor: guess !== null ? "default" : "pointer",
          background: guess !== null ? (!s.valid ? C.red + "22" : C.card) : C.card,
          border: `1.5px solid ${guess !== null && !s.valid ? C.red : C.border}`,
          color: guess !== null && !s.valid ? C.red : C.text, fontWeight: 600, fontSize: 13,
        }}>❌ Will Error</button>
      </div>

      {/* Explanation box, only shown once the student has guessed. */}
      {guess !== null && (
        <div style={{
          background: (guess === s.valid ? C.green : C.red) + "18",
          border: `1px solid ${(guess === s.valid ? C.green : C.red)}44`,
          borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted, marginBottom: 12,
        }}>
          {guess === s.valid ? "✓ Correct! " : "✗ Not quite. "}
          💡 {s.reason}
        </div>
      )}

      {/* Next button, only shown after guessing, hidden once we're on the last snippet. */}
      {guess !== null && !isLast && (
        <button onClick={next} style={{
          width: "100%", padding: "10px", borderRadius: 8, background: C.accentGlow,
          border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>Next Snippet →</button>
      )}

      {/* Final tally, shown once the student has guessed on the last snippet. */}
      {guess !== null && isLast && (
        <div style={{ textAlign: "center", padding: "12px 20px", borderRadius: 8, background: C.green + "22", border: `1px solid ${C.green}`, color: C.green, fontWeight: 600 }}>
          You got {score} / {snippets.length} right — nice eye for detail!
        </div>
      )}
    </div>
  );
}

// ============================================================================
// WIDGET 3 — CommentDemo
// Demonstrates that Python completely ignores anything after a `#` on a
// line. The toggle switches between "your view" (comments visible, in a
// muted colour) and "Python's view" (comments physically removed) so the
// learner sees, very concretely, that comments never affect execution.
// ============================================================================
function CommentDemo() {
  // Whether we are currently showing "what Python actually sees" (comments
  // stripped out) versus the normal editor view (comments visible in green).
  const [pythonView, setPythonView] = useState(false);

  // Each line of the little demo program, tagged with whether it's a full
  // comment line, or ordinary code that happens to have a trailing comment.
  const lines = [
    { code: "# This program says hello", isComment: true },
    { code: 'print("Hello!")', trailing: "  # greets the user", isComment: false },
    { code: "# print(\"This never runs\")", isComment: true },
    { code: 'print("Goodbye!")', isComment: false },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A <strong style={{ color: C.accent }}>comment</strong> starts with a{" "}
        <code style={{ color: C.yellow }}>#</code> symbol. It's a note written for humans —
        Python skips it completely when running the program. Toggle the switch below to see it.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 14, fontFamily: "monospace", fontSize: 13 }}>
        {lines.map((l, i) => {
          // In "Python's view", full comment lines are struck-through and
          // faded to show they are effectively erased before running.
          const hide = pythonView && l.isComment;
          return (
            <div key={i} style={{
              marginBottom: 6,
              color: l.isComment ? C.green : C.text,
              opacity: hide ? 0.3 : 1,
              textDecoration: hide ? "line-through" : "none",
              transition: "all 0.3s",
            }}>
              {l.code}
              {l.trailing && (
                <span style={{ color: C.green, opacity: pythonView ? 0.3 : 1, textDecoration: pythonView ? "line-through" : "none" }}>{l.trailing}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Toggle button that flips the pythonView boolean state. */}
      <button onClick={() => setPythonView((v) => !v)} style={{
        width: "100%", padding: "10px", borderRadius: 8,
        background: pythonView ? C.purple + "22" : C.card,
        border: `1.5px solid ${pythonView ? C.purple : C.border}`,
        color: pythonView ? C.purple : C.text, fontWeight: 600, fontSize: 13, cursor: "pointer",
      }}>
        {pythonView ? "◀ Show My View (with comments)" : "▶ Show What Python Actually Sees"}
      </button>

      <div style={{ marginTop: 14, background: C.yellow + "18", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.yellow }}>Key idea:</strong> Comments cost nothing to Python — they exist purely
        to help YOU (and your teammates) understand the code later. Good programmers comment generously.
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 4 — Quiz
// The standard closing quiz used in every unit of this course. Only THIS
// component's onComplete callback is wired to onUnitComplete (see the main
// export below) — finishing the quiz is what marks the whole unit as done.
// ============================================================================
function Quiz({ onComplete }) {
  const questions = [
    {
      q: 'What does print("Hi there") do?',
      options: [
        "Saves the text to a file named Hi there",
        "Displays the text Hi there on the screen",
        "Deletes the text Hi there",
        "Asks the user to type Hi there",
      ],
      answer: 1,
      explain: "print() is Python's built-in function for displaying output. Whatever is inside the parentheses (here, the text in quotes) appears on the screen.",
    },
    {
      q: "Why does print(Hello) (no quotes) usually cause an error?",
      options: [
        "Python thinks Hello is the name of a variable, and no such variable exists",
        "print() only accepts numbers",
        "Hello is a reserved Python keyword",
        "print() must always be written in capital letters",
      ],
      answer: 0,
      explain: "Without quotes, Python assumes you're referring to something already defined — a variable. Since Hello was never created, Python raises a NameError.",
    },
    {
      q: "What happens when Python runs a line starting with #?",
      options: [
        "It prints the line exactly as written",
        "It runs the line twice",
        "It skips the entire line — comments are ignored completely",
        "It causes a SyntaxError",
      ],
      answer: 2,
      explain: "Lines (or parts of lines) starting with # are comments. Python's interpreter ignores them entirely; they exist only for humans reading the code.",
    },
    {
      q: 'Is Print("Hi") (capital P) valid Python?',
      options: [
        "Yes, Python doesn't care about capitalisation",
        "No — Python is case-sensitive, and the real function is print (lowercase)",
        "Yes, but only inside comments",
        "No, because Hi should not be in quotes",
      ],
      answer: 1,
      explain: "Python is case-sensitive. print and Print are treated as two completely different names, and only the lowercase print is the built-in function.",
    },
  ];

  // current: which question (0-based) is on screen.
  // selected: index of the option the student clicked for THIS question (null = not yet answered).
  // score: running count of correct answers across the whole quiz.
  // done: true once the student has answered the final question.
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  // Record the student's answer choice and update the score if correct.
  const choose = (i) => {
    if (selected !== null) return; // lock in only the first click
    setSelected(i);
    if (i === questions[current].answer) setScore((s) => s + 1);
  };

  // Advance to the next question, or — on the last question — mark the quiz
  // done and call onComplete(), which the parent Unit4_1 component uses to
  // fire onUnitComplete and persist progress for this student.
  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setDone(true);
      onComplete && onComplete();
    }
  };

  if (done) {
    // final score also accounts for the very last answer just chosen.
    const final = score + (selected === questions[current].answer ? 1 : 0);
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{final >= 3 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>
          You scored {final} / {questions.length}
        </div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {final === 4
            ? "Perfect! You can now read and predict simple Python programs with confidence."
            : final >= 2
            ? "Good work — revisit the Spot the Bug section to sharpen your eye for syntax."
            : "No worries — go through the Run and Comment sections again, then retry."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 4.1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You've written and mentally run your first Python programs.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 4.2 — Variables & Memory.</strong> We'll open up the
            computer's memory itself and see exactly where your data lives.
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
          // Colour logic: once answered, correct option turns green, the
          // student's (wrong) pick turns red, everything else stays neutral.
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
// MAIN EXPORT — Unit4_1
// This is the component App.jsx dynamically loads and renders. It owns the
// "shell" every unit shares: header, progress bar, section tabs, content
// card, and the "Mark Complete & Continue" navigation button.
// ============================================================================
export default function Unit4_1({ student, onUnitComplete }) {
  // The list of tabs across the top of the lesson. `label` is what's shown;
  // the array's ORDER also defines which widget renders for which index —
  // see the `content` array further down, which must stay in the same order.
  const sections = [
    { id: "intro", label: "From Concept to Code" },
    { id: "run", label: "print() — Run It" },
    { id: "bugs", label: "Spot the Bug" },
    { id: "comments", label: "Comments" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  // Which tab/section index is currently visible.
  const [activeSection, setActiveSection] = useState(0);
  // Which section indices the student has visited/finished — drives both the
  // ✓ ticks on the tabs and the "X / Y done" counter in the header.
  const [completed, setCompleted] = useState([]);

  // Mark a section index as completed (only adds it once, even if re-visited).
  const markComplete = (idx) => {
    if (!completed.includes(idx)) setCompleted((p) => [...p, idx]);
  };

  // "Mark Complete & Continue" button handler: marks the CURRENT section
  // done, then advances to the next tab (capped so it never overflows).
  const goNext = () => {
    markComplete(activeSection);
    setActiveSection((s) => Math.min(sections.length - 1, s + 1));
  };

  // The actual JSX rendered for each tab, in the SAME order as `sections`
  // above. Index 0 is written inline (mostly static intro copy); indices
  // 1-3 delegate to the interactive widgets defined earlier in this file;
  // index 4 is the closing Quiz, whose onComplete both marks this last
  // section done AND calls the onUnitComplete prop passed in from App.jsx —
  // this is the one line in the whole file that actually saves progress.
  const content = [
    // 0 — Intro: bridges from Module 3's ending ("Next up: Module 4...") into
    // this unit, and sets expectations for what "your first program" means.
    <div>
      <div style={{
        background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
        border: `1px solid ${C.accent}44`, borderRadius: 12, padding: "24px 20px",
        marginBottom: 20, textAlign: "center",
      }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>🐍</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 8 }}>
          From Concept to Code
        </div>
        <div style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
          In Module 3 you learned WHY Python can run on any computer — bytecode, the PVM,
          the whole hybrid pipeline. Now it's time to actually use it. In this unit you'll
          write your very first real Python instructions and watch them run.
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { icon: "📝", title: "Source File", desc: "You'll type Python instructions into a plain text file ending in .py" },
          { icon: "▶️", title: "Run It", desc: "The PVM (from Module 3!) reads your file and executes it, line by line" },
          { icon: "🖥️", title: "See Output", desc: "Whatever your program prints appears in a terminal window" },
          { icon: "🐞", title: "Fix Mistakes", desc: "Typos and small errors are completely normal — even experts make them daily" },
        ].map((c, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 12px" }}>
            <div style={{ fontSize: 24 }}>{c.icon}</div>
            <div style={{ color: C.accent, fontWeight: 600, fontSize: 13, marginTop: 6 }}>{c.title}</div>
            <div style={{ color: C.muted, fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{c.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ background: C.yellow + "18", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.yellow }}>Key idea:</strong> Every large Python program — even one with
        millions of lines — is built the same way: one small, correct instruction at a time. Today, your
        program will have just one job: talk back to you on the screen.
      </div>
    </div>,

    // 1 — the CodeRunner widget: simulated editor + terminal.
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>print() — Your First Instruction</h3>
      <CodeRunner />
    </div>,

    // 2 — the SyntaxChallenge widget: predict run vs error.
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Spot the Bug</h3>
      <SyntaxChallenge />
    </div>,

    // 3 — the CommentDemo widget: comments are ignored by Python.
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Comments — Notes Python Ignores</h3>
      <CommentDemo />
    </div>,

    // 4 — the closing Quiz. Note the onComplete callback: it marks THIS
    // section (index 4) as done for the progress bar, and separately calls
    // the onUnitComplete prop, which is what actually persists completion
    // of Unit 4.1 back in App.jsx / the Google Apps Script backend.
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        4 questions to check your understanding of Unit 4.1.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    // Full-page dark background matching every other lesson in the course.
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>

      {/* ---------- Header: module/unit breadcrumb + live progress count ---------- */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 4 › UNIT 4.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Your First Program</div>
        </div>
        {/* completed.length updates live as the student works through the tabs */}
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{completed.length} / {sections.length} done</div>
      </div>

      {/* ---------- Thin animated progress bar under the header ---------- */}
      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(completed.length / sections.length) * 100}%`, background: C.green, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>

        {/* ---------- Tab strip: click any tab to jump straight to that section ---------- */}
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
              {/* Green tick shown once a section has been visited/completed */}
              {completed.includes(i) && <span style={{ color: C.green }}>✓</span>}
              {s.label}
            </button>
          ))}
        </div>

        {/* ---------- Main content card: renders whichever widget matches activeSection ---------- */}
        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
          {content[activeSection]}
        </div>

        {/* ---------- "Mark Complete & Continue" button ----------
             Hidden on the very last tab (the quiz), because the quiz itself
             provides its own progression buttons ("Next Question" / "See
             Results") and calls onUnitComplete when finished. */}
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
