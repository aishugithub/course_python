// ============================================================================
//  UNIT 4.2 — "Variables & Memory"
// ----------------------------------------------------------------------------
//  WHERE THIS FILE FITS IN THE APP
//  --------------------------------
//  Lives at src/lessons/Unit4_2.jsx. Loaded dynamically by src/shell/App.jsx
//  (via import.meta.glob) the moment a student clicks the "Variables &
//  Memory" card on the Dashboard — that card exists because config/
//  course.config.js lists { unitId: "Unit4_2", ... } inside Module 4.
//  Same contract as every other lesson: receives `student` (who's logged in)
//  and `onUnitComplete` (call it once, at the very end, to persist progress
//  through src/shell/api.js -> the Google Apps Script backend, and send the
//  student back to the Dashboard with this unit now ticked ✅).
//
//  TEACHING APPROACH FOR THIS UNIT (deliberately different from just
//  showing syntax):
//    1) First, PROVE why a variable has to exist at all — using a tiny
//       "score counter" that visibly breaks without one.
//    2) Then, open up the computer's memory itself: a long row of numbered
//       slots. Show, step by step, that `score = 0` reserves ONE slot,
//       `score = score + 1` reuses that SAME slot (it does not create a new
//       one), and a second variable always gets its OWN separate slot that
//       the first variable can never touch.
//    3) Only after the need + the memory model are solid do we contrast
//       Python's `score = 0` against C's `int score = 0;` — framing dynamic
//       typing as a genuine, memory-level advantage, not just "different
//       syntax."
//    4) Finally, name the data types (int/float/str/bool) and give students
//       a hands-on `type()` explorer.
// ============================================================================

import { useState } from "react";

// ----------------------------------------------------------------------------
// COLOUR PALETTE — same convention as every other lesson file: local, fully
// self-contained, no imports shared across lessons.
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
// WIDGET 1 — NeedForVariable
// Before naming "variables," we PROVE why a program needs modifiable storage
// at all. Two mini score-counters sit side by side: one has no memory of
// past clicks (every click computes "1" from scratch and forgets it
// instantly); the other keeps a running total. This is the concrete problem
// a variable solves: "a working space where you can modify something, and
// it stays modified until you change it again."
// ============================================================================
function NeedForVariable() {
  // withoutMemoryDisplay is NEVER accumulated — every click just recomputes
  // "one goal happened" in isolation and shows 1. It has nowhere to
  // remember earlier clicks, which is exactly the point we're demonstrating.
  const [withoutMemoryDisplay, setWithoutMemoryDisplay] = useState(0);
  const [withoutFlash, setWithoutFlash] = useState(false);

  // score IS a real variable (React state, but conceptually exactly what
  // we're about to formalise) — it accumulates because each click reads the
  // CURRENT value and adds 1 to it, then stores the result back.
  const [score, setScore] = useState(0);

  const scoreWithoutMemory = () => {
    // No matter how many times this runs, there is no stored total to add
    // to — so we can only ever show that "a goal just happened" (1).
    setWithoutMemoryDisplay(1);
    setWithoutFlash(true);
    setTimeout(() => setWithoutFlash(false), 300);
  };

  const scoreWithMemory = () => {
    // score => score + 1 : read the current value out of storage, add 1,
    // write the new value back into that SAME storage. This is the exact
    // behaviour we'll see happen inside real memory in the next section.
    setScore((s) => s + 1);
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Imagine you're building a football score-tracker. Every time a goal is scored, someone clicks a button.
        Try both trackers below and click their buttons several times.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* --- LEFT: no variable / no memory --- */}
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: "16px" }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ WITHOUT A VARIABLE</div>
          <div style={{
            fontSize: 40, fontWeight: 700, textAlign: "center", marginBottom: 14, color: C.text,
            transform: withoutFlash ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s",
          }}>{withoutMemoryDisplay}</div>
          <button onClick={scoreWithoutMemory} style={{
            width: "100%", padding: "10px", borderRadius: 8, background: C.red + "22",
            border: `1px solid ${C.red}`, color: C.red, fontWeight: 600, cursor: "pointer", fontSize: 13,
          }}>⚽ Score a Goal!</button>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 10, lineHeight: 1.6 }}>
            Click it 5 times. Notice it never goes past 1 — there's nowhere to remember the last score,
            so every click starts from nothing.
          </div>
        </div>

        {/* --- RIGHT: with a variable --- */}
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: "16px" }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ WITH A VARIABLE</div>
          <div style={{ fontSize: 40, fontWeight: 700, textAlign: "center", marginBottom: 14, color: C.green }}>{score}</div>
          <button onClick={scoreWithMemory} style={{
            width: "100%", padding: "10px", borderRadius: 8, background: C.green + "22",
            border: `1px solid ${C.green}`, color: C.green, fontWeight: 600, cursor: "pointer", fontSize: 13,
          }}>⚽ Score a Goal!</button>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 10, lineHeight: 1.6 }}>
            Click it 5 times. It correctly counts up, because a variable named <code style={{ color: C.green }}>score</code>{" "}
            is holding the running total between clicks.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.accent }}>This is WHY variables exist.</strong> A program needs a working space that
        it can read from and write back to, over and over, while it runs — a place to remember "where things
        currently stand." That working space is a <strong style={{ color: C.accent }}>variable</strong>.
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 2 — MemoryStrip
// The centrepiece of this unit: an actual visualisation of computer memory
// as a long row of numbered, serially-organised slots. A step-through demo
// shows, very literally: (a) memory starts empty, (b) `score = 0` reserves
// exactly one slot for `score`, (c) `score = score + 1` re-uses that SAME
// slot rather than creating a new one, (d) a second variable `name` gets
// its OWN slot that `score` can never overwrite, and (e) trying to read a
// variable that was never assigned fails, because no slot has ever been
// reserved for it. This directly demonstrates variable = a piece of memory
// that is allocated to you, modifiable by you, and off-limits to everyone
// (and everything) else.
// ============================================================================
function MemoryStrip() {
  // Ten pretend memory addresses. Real RAM addresses are huge hex numbers;
  // we use small round numbers (1000-1009) so the CONCEPT — a long, ordered
  // row of numbered slots — is what stands out, not the notation.
  const ADDRESSES = Array.from({ length: 10 }, (_, i) => 1000 + i);

  // Each step of the walkthrough: the Python line being "run", which
  // addresses are occupied and by what (name/value/colour) AFTER that line
  // runs, which address to highlight, whether this step is an ERROR, and a
  // plain-English note explaining what just happened in memory.
  const steps = [
    {
      code: "# memory is empty — nothing has been created yet",
      occupied: {},
      highlight: null,
      error: false,
      note: "Before your program runs any assignment, memory is just a long row of free, numbered slots — like a hallway of empty lockers, all unlocked.",
    },
    {
      code: "score = 0",
      occupied: { 1003: { name: "score", value: "0", color: C.accent } },
      highlight: 1003,
      error: false,
      note: 'score = 0 tells Python: "reserve one slot, label it score, and store the value 0 inside." Python chose slot 1003 for it — you never had to pick the address yourself.',
    },
    {
      code: "score = score + 1",
      occupied: { 1003: { name: "score", value: "1", color: C.accent } },
      highlight: 1003,
      error: false,
      note: "Look carefully: NO new slot was created. Python read the old value out of slot 1003 (which was 0), added 1, and wrote 1 back into that SAME slot. This is what \"modifying a variable\" really means at the memory level.",
    },
    {
      code: 'name = "Aishu"',
      occupied: {
        1003: { name: "score", value: "1", color: C.accent },
        1007: { name: "name", value: '"Aishu"', color: C.purple },
      },
      highlight: 1007,
      error: false,
      note: "A brand-new variable always gets its OWN slot — here, 1007. Slot 1003 (score) is completely untouched. Every variable owns its private space; nothing that happens to name can accidentally change score.",
    },
    {
      code: "print(age)",
      occupied: {
        1003: { name: "score", value: "1", color: C.accent },
        1007: { name: "name", value: '"Aishu"', color: C.purple },
      },
      highlight: null,
      error: true,
      note: 'age was never assigned to any slot, so there is nothing for Python to look up — result: NameError. You can only read or modify memory that YOU reserved with an assignment. You can never touch a slot that isn\'t yours (and Python won\'t let you touch one that doesn\'t exist).',
    },
  ];

  // Which step of the walkthrough is currently on screen.
  const [step, setStep] = useState(0);
  const s = steps[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Every running program is given access to computer memory (RAM) — imagine it as a very long row of
        numbered storage slots. Step through the code on the left and watch exactly what happens inside
        memory on the right.
      </p>

      {/* Code line currently being "executed" for this step. */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontFamily: "monospace", fontSize: 14, color: s.error ? C.red : C.text }}>
        &gt;&gt;&gt; {s.code}
      </div>

      {/* The memory strip itself — one box per pretend address. */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 6 }}>
        {ADDRESSES.map((addr) => {
          const cell = s.occupied[addr]; // undefined if this address is still empty
          const isHighlighted = s.highlight === addr;
          return (
            <div key={addr} style={{
              minWidth: 62, borderRadius: 8, textAlign: "center", flexShrink: 0,
              background: cell ? cell.color + "22" : C.card,
              border: `1.5px solid ${isHighlighted ? (s.error ? C.red : cell.color) : cell ? cell.color + "66" : C.border}`,
              padding: "8px 4px",
              boxShadow: isHighlighted ? `0 0 14px ${(s.error ? C.red : cell.color)}55` : "none",
              transition: "all 0.35s ease",
            }}>
              <div style={{ fontSize: 9, color: C.muted, fontFamily: "monospace" }}>{addr}</div>
              <div style={{ height: 34, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {cell ? (
                  <>
                    <div style={{ fontSize: 10, color: cell.color, fontWeight: 700 }}>{cell.name}</div>
                    <div style={{ fontSize: 11, color: C.text, fontFamily: "monospace" }}>{cell.value}</div>
                  </>
                ) : (
                  <div style={{ fontSize: 14, color: C.border }}>·</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanation for the current step — this is the actual teaching text. */}
      <div style={{
        background: (s.error ? C.red : C.purple) + "18",
        border: `1px solid ${(s.error ? C.red : C.purple)}44`,
        borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.6,
      }}>
        {s.error ? "⚠️ " : "💡 "}{s.note}
      </div>

      {/* Step navigation — Back / Next, same pattern as Unit1_1's RecipeAnalogy. */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => setStep((v) => Math.max(0, v - 1))} disabled={step === 0} style={{
          padding: "8px 18px", borderRadius: 6, background: C.card, border: `1px solid ${C.border}`,
          color: C.text, cursor: step === 0 ? "not-allowed" : "pointer",
        }}>← Back</button>
        <span style={{ color: C.muted, fontSize: 12, alignSelf: "center" }}>Step {step + 1} / {steps.length}</span>
        <button onClick={() => setStep((v) => Math.min(steps.length - 1, v + 1))} disabled={step === steps.length - 1} style={{
          padding: "8px 18px", borderRadius: 6, background: C.accentGlow, border: "none",
          color: "#fff", cursor: step === steps.length - 1 ? "not-allowed" : "pointer",
        }}>Next →</button>
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 3 — PythonVsC
// Now that memory itself is understood, contrast HOW you reserve a slot in
// C versus Python. This is framed explicitly as a Python ADVANTAGE (less to
// think about, no manual bookkeeping), not merely "different syntax" — per
// the direct feedback that shaped this unit.
// ============================================================================
function PythonVsC() {
  // Toggling this shows what happens when the SAME variable is later
  // reassigned to a value of a different type — the sharpest contrast
  // between the two languages.
  const [showRetype, setShowRetype] = useState(false);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        You just saw Python reserve a memory slot for <code style={{ color: C.accent }}>score</code> with nothing
        more than <code style={{ color: C.accent }}>score = 0</code>. In a language like{" "}
        <strong style={{ color: C.orange }}>C</strong>, you can't do that — you must tell the computer, up front,
        exactly what TYPE of data (and therefore how many bytes) to reserve.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        {/* --- C column --- */}
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>⚙️ C</div>
          <pre style={{ fontFamily: "monospace", fontSize: 13, color: C.text, background: C.bg, borderRadius: 6, padding: "10px 12px", margin: "0 0 10px 0" }}>
{showRetype ? `int score = 0;\nscore = "high";  // ERROR` : `int score = 0;`}
          </pre>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>
            <code style={{ color: C.orange }}>int</code> tells the compiler, before the program even runs,
            "reserve exactly 4 bytes, and this slot will ONLY ever hold whole numbers."
            {showRetype && (
              <div style={{ marginTop: 8, color: C.red }}>
                ✗ score can never be reassigned to text — the compiler refuses to build the program at all.
              </div>
            )}
          </div>
        </div>

        {/* --- Python column --- */}
        <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🐍 Python</div>
          <pre style={{ fontFamily: "monospace", fontSize: 13, color: C.text, background: C.bg, borderRadius: 6, padding: "10px 12px", margin: "0 0 10px 0" }}>
{showRetype ? `score = 0\nscore = "high"  # works fine!` : `score = 0`}
          </pre>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>
            Python looks at the VALUE (<code style={{ color: C.accent }}>0</code>) and figures out the type and
            required size itself — you never declare it.
            {showRetype && (
              <div style={{ marginTop: 8, color: C.green }}>
                ✓ Reassigning score to a string simply points the score label at a brand-new slot holding text.
                The old integer slot is abandoned; no error at all.
              </div>
            )}
          </div>
        </div>
      </div>

      <button onClick={() => setShowRetype((v) => !v)} style={{
        width: "100%", padding: "10px", borderRadius: 8,
        background: showRetype ? C.purple + "22" : C.card,
        border: `1.5px solid ${showRetype ? C.purple : C.border}`,
        color: showRetype ? C.purple : C.text, fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 14,
      }}>
        {showRetype ? "◀ Hide the reassignment example" : "▶ What happens if we later try score = \"high\"?"}
      </button>

      <div style={{ background: C.green + "18", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, marginBottom: 10 }}>
        ✅ <strong style={{ color: C.green }}>Why this is a real advantage:</strong> Beginners can focus on solving
        the problem instead of managing bytes and types by hand. Python's variables are labels that can be
        re-pointed to any slot at any time — this is called <strong style={{ color: C.green }}>dynamic typing</strong>.
      </div>
      <div style={{ background: C.yellow + "18", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        ⚖️ <strong style={{ color: C.yellow }}>The trade-off:</strong> that flexibility isn't free — Python has to
        check the type of every value while your program runs, which is part of why (as you saw back in
        Module 3) Python trades some raw speed for ease of use compared to C.
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 4 — DataTypeExplorer
// A hands-on `type()` detector. Clicking any preset value shows it dropping
// into a memory slot (reusing the visual language from MemoryStrip above)
// tagged with its type, plus a one-line description of that type.
// ============================================================================
function DataTypeExplorer() {
  const values = [
    { value: "5", label: "5", type: "int", color: C.accent, desc: "A whole number — no decimal point. Used for counting, indexing, whole quantities." },
    { value: "3.14", label: "3.14", type: "float", color: C.teal, desc: "A number WITH a decimal point. Used for measurements, prices, averages, anything fractional." },
    { value: '"Aishu"', label: '"Aishu"', type: "str", color: C.purple, desc: "Text, always wrapped in quotes. Short for 'string' — a string of characters." },
    { value: "True", label: "True", type: "bool", color: C.green, desc: "Either True or False — nothing else. Used for yes/no, on/off, pass/fail decisions." },
  ];

  // Which value (index into `values`) is currently selected/shown, or null.
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Python automatically works out a value's <strong style={{ color: C.accent }}>data type</strong> the moment
        you assign it — that's exactly what filled in each memory slot's colour earlier. Click a value below
        to inspect its type, the same way Python's built-in <code style={{ color: C.accent }}>type()</code> function
        would tell you.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
        {values.map((v, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            padding: "14px 6px", borderRadius: 10, fontFamily: "monospace", fontSize: 14, fontWeight: 700,
            background: selected === i ? v.color + "22" : C.card,
            border: `1.5px solid ${selected === i ? v.color : C.border}`,
            color: selected === i ? v.color : C.text, cursor: "pointer", transition: "all 0.2s",
          }}>{v.label}</button>
        ))}
      </div>

      {selected !== null && (
        <div style={{ background: C.card, border: `1.5px solid ${values[selected].color}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: C.muted, marginBottom: 8 }}>
            &gt;&gt;&gt; type({values[selected].value})
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: values[selected].color, marginBottom: 10 }}>
            &lt;class '{values[selected].type}'&gt;
          </div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{values[selected].desc}</div>
        </div>
      )}

      {selected === null && (
        <div style={{ color: C.muted, fontSize: 12, textAlign: "center", padding: 20 }}>👆 Click a value above to inspect it.</div>
      )}

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.accent }}>Key idea:</strong> the TYPE decides what a memory slot's contents mean and
        what you're allowed to do with them — you can add two ints, but adding an int to a str needs a
        conversion first (you'll see exactly why in Unit 4.3).
      </div>
    </div>
  );
}

// ============================================================================
// WIDGET 5 — Quiz
// Standard closing quiz. Its onComplete callback is the ONLY thing in this
// file that calls onUnitComplete, matching every other unit in the course.
// ============================================================================
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "Why does a program need variables in the first place?",
      options: [
        "To make the code file larger",
        "To provide a working space that can be read from and written to while the program runs",
        "Variables are only needed for decoration",
        "To slow the program down on purpose",
      ],
      answer: 1,
      explain: "Programs need somewhere to remember and update values as they run — that modifiable working space is exactly what a variable provides.",
    },
    {
      q: "What actually happens in memory when Python runs score = score + 1?",
      options: [
        "A brand-new memory slot is created for the new value",
        "The existing slot for score is read, 1 is added, and the result is written back into that SAME slot",
        "Nothing happens in memory — only the screen updates",
        "Python deletes score and asks the user to type it in again",
      ],
      answer: 1,
      explain: "Modifying a variable re-uses its existing memory slot — Python doesn't create a new slot each time you update the same variable.",
    },
    {
      q: 'In C, why must you write int score = 0; instead of just score = 0;?',
      options: [
        "C requires the type up front so it knows exactly how many bytes to reserve for that slot",
        "C doesn't support variables at all",
        "int is just a naming convention with no real effect",
        "C requires every variable name to start with a type keyword for style reasons only",
      ],
      answer: 0,
      explain: "C is a statically-typed language — the compiler must know a variable's type (and therefore its size in memory) before the program runs.",
    },
    {
      q: "What is Python's 'dynamic typing' actually describing?",
      options: [
        "Python variables can never change value once set",
        "Python figures out a value's type automatically, and a variable can be reassigned to a completely different type later",
        "Python only works with numbers, never text",
        "Python requires you to declare types just like C does",
      ],
      answer: 1,
      explain: "Dynamic typing means the type is determined from the value at assignment time, and a name can be re-pointed to a different type of value later — unlike C's fixed types.",
    },
    {
      q: 'What does type(3.14) return in Python?',
      options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'bool'>"],
      answer: 2,
      explain: "3.14 has a decimal point, so Python classifies it as a float — a number that can represent fractions, not just whole values.",
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
          {final === 5 ? "Outstanding — you understand variables at the memory level, not just the syntax." :
            final >= 3 ? "Good work — revisit the memory-strip walkthrough once more to lock it in." :
              "Go back through the memory strip and the Python vs C comparison, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accent}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 4.2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You now know WHY variables exist, WHERE they live in memory, and how Python's dynamic typing
            differs from C.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 4.3 — Input & Type Conversion.</strong> We'll learn how
            to get information FROM the user, and why it always arrives as text first.
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
// MAIN EXPORT — Unit4_2
// Shell shared with every unit: header, progress bar, section tabs, content
// card, "Mark Complete & Continue" navigation.
// ============================================================================
export default function Unit4_2({ student, onUnitComplete }) {
  // Order here MUST match the order of the `content` array below — index i
  // of `sections` is the tab label for index i of `content`.
  const sections = [
    { id: "need", label: "Why a Variable?" },
    { id: "memory", label: "Inside Memory" },
    { id: "vsC", label: "Python vs C" },
    { id: "types", label: "Data Types" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    // 0 — Why a Variable?
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Why Do We Need a Variable?</h3>
      <NeedForVariable />
    </div>,

    // 1 — Inside Memory (the memory-strip walkthrough)
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Inside the Computer's Memory</h3>
      <MemoryStrip />
    </div>,

    // 2 — Python vs C
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Python vs C: Declaring a Variable</h3>
      <PythonVsC />
    </div>,

    // 3 — Data types + type()
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Data Types</h3>
      <DataTypeExplorer />
    </div>,

    // 4 — Quiz. onComplete both marks this section done for the progress
    // bar AND fires onUnitComplete, which is what actually persists Unit
    // 4.2's completion back through App.jsx / the Apps Script backend.
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        5 questions to check your understanding of Unit 4.2.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 4 › UNIT 4.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Variables & Memory</div>
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
