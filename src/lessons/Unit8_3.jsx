// Unit 8.3 — Scope & the Call Stack (local vs global, stack frames)
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

// ── Widget 1: Predict First — the scope mystery ──
function PredictWidget() {
  const [guess, setGuess] = useState(null);
  const options = ["10", "99", "NameError"];
  const answer = 0;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Last unit, grade() was called four times — and each call had its OWN <code style={{ color: C.teal }}>mark</code> locker.
        Four lockers, one name, no collision. How? Before we explain, test your instinct on this puzzle.
        <strong style={{ color: C.text }}> Predict the output, then click your guess.</strong>
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <pre style={mono}>
          {`x = 10\n\ndef change():\n    x = 99\n\nchange()\nprint(x)`}
        </pre>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {options.map((opt, i) => {
          let bg = C.card, border = C.border, col = C.text;
          if (guess !== null) {
            if (i === answer) { bg = C.green + "22"; border = C.green; col = C.green; }
            else if (i === guess) { bg = C.red + "22"; border = C.red; col = C.red; }
          }
          return (
            <button key={i} onClick={() => guess === null && setGuess(i)} style={{
              padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 700, fontFamily: "monospace",
              background: bg, border: `1.5px solid ${border}`, color: col,
              cursor: guess === null ? "pointer" : "default", transition: "all 0.25s",
            }}>{opt}</button>
          );
        })}
      </div>

      {guess !== null && (
        <div style={{ background: guess === answer ? C.green + "14" : C.yellow + "14", border: `1px solid ${guess === answer ? C.green : C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
          {guess === answer
            ? <><strong style={{ color: C.green }}>Sharp instinct — it prints 10!</strong> The x inside change() is a completely different locker from the x outside. </>
            : <><strong style={{ color: C.yellow }}>It prints 10 — and most people guess wrong here.</strong> The assignment inside change() did NOT touch the outer x. </>}
          Two lockers, both labelled x, in two different <em>rooms</em>. The function's room — and its
          x — was demolished the moment the call ended. This unit is about those rooms.
        </div>
      )}

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Where a variable lives matters as much as its value.</strong> Assigning
        inside a function creates a <em>local</em> variable — born at the call, gone at the return, invisible
        outside. The outer x never even noticed.
      </>)}
    </div>
  );
}

// ── Widget 2: Two Rooms — local vs global, during and after ──
function RoomsWidget() {
  const [during, setDuring] = useState(true);

  const box = (label, value, alive, color) => (
    <div style={{ textAlign: "center", opacity: alive ? 1 : 0.35, transition: "opacity 0.4s" }}>
      <div style={{ fontSize: 10, color, fontWeight: 700 }}>{label}</div>
      <div style={{ border: `2px ${alive ? "solid" : "dashed"} ${color}`, borderRadius: 8, padding: "8px 16px", fontFamily: "monospace", fontSize: 14, color: alive ? C.text : C.muted, background: alive ? color + "10" : "transparent", minWidth: 56 }}>
        {alive ? value : "✕"}
      </div>
    </div>
  );

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Here's the same puzzle in the memory-slot picture from Unit 4.2 — upgraded. Variables don't float in
        one big space: they live in <strong style={{ color: C.text }}>rooms</strong> (Python calls them
        <em> scopes</em>). Toggle between during and after the call.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setDuring(true)} style={{
          padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          background: during ? C.accentGlow : C.card, color: during ? "#fff" : C.muted,
          border: `1.5px solid ${during ? C.accent : C.border}`,
        }}>⏱ DURING change()</button>
        <button onClick={() => setDuring(false)} style={{
          padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          background: !during ? C.accentGlow : C.card, color: !during ? "#fff" : C.muted,
          border: `1.5px solid ${!during ? C.accent : C.border}`,
        }}>✔ AFTER the call</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.teal}66`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, marginBottom: 12 }}>🌍 GLOBAL ROOM — the main program</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {box("x", "10", true, C.teal)}
            {box("change", "📦 fn", true, C.teal)}
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 10, textAlign: "center" }}>exists for the whole program</div>
        </div>
        <div style={{ background: C.card, border: `1.5px ${during ? "solid" : "dashed"} ${during ? C.purple : C.border}`, borderRadius: 10, padding: 16, transition: "all 0.4s" }}>
          <div style={{ color: during ? C.purple : C.muted, fontWeight: 700, fontSize: 12, marginBottom: 12 }}>
            🚪 change()'S ROOM — {during ? "OPEN" : "DEMOLISHED"}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {box("x (local!)", "99", during, C.purple)}
          </div>
          <div style={{ fontSize: 11, color: during ? C.purple : C.muted, marginTop: 10, textAlign: "center" }}>
            {during ? "a brand-new locker — same name, different room" : "room and locker gone — the global x never changed"}
          </div>
        </div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.8 }}>
        One-way glass: code inside a function can <em>read</em> the global room
        (handy for constants like <code style={{ color: C.teal }}>GST_RATE = 0.18</code>), but plain
        assignment inside always creates a local. The global room can't see into function rooms at all.
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Same name ≠ same variable.</strong> Every function call opens a
        fresh private room. That's why grade() could run four times with four different marks — and why
        your function's variables can never accidentally trample the rest of the program. Isolation is a feature!
      </>)}
    </div>
  );
}

// ── Widget 3: Trace — the call stack with real frames ──
function StackTrace() {
  const lines = [
    'def add_gst(price):',
    '    tax = price * 0.18',
    '    return price + tax',
    '',
    'def bill_line(cost):',
    '    total = add_gst(cost)',
    '    print("Pay:", total)',
    '',
    'bill_line(200)',
  ];
  // steps: [lineIdx, frames, output, narration]
  // frames: array bottom→top of {name, vars: [[k, v]...], returning}
  const G = { name: "GLOBAL", vars: [["add_gst", "📦"], ["bill_line", "📦"]] };
  const steps = [
    [0, [{ name: "GLOBAL", vars: [["add_gst", "📦"]] }], "", "def stores add_gst in the global room — body skipped (Unit 8.1!)."],
    [4, [G], "", "def stores bill_line too. Two recipes ready, nothing cooked yet."],
    [8, [G], "", "The call! Python is about to open a room for bill_line..."],
    [5, [G, { name: "bill_line", vars: [["cost", "200"], ["total", "—"]] }], "", "A FRAME stacks on top: bill_line's room, cost = 200. Now line 5 needs add_gst(cost)..."],
    [1, [G, { name: "bill_line", vars: [["cost", "200"], ["total", "—"]] }, { name: "add_gst", vars: [["price", "200"], ["tax", "—"]] }], "", "ANOTHER frame stacks on top! add_gst's room: price = 200. bill_line waits below, frozen."],
    [1, [G, { name: "bill_line", vars: [["cost", "200"], ["total", "—"]] }, { name: "add_gst", vars: [["price", "200"], ["tax", "36.0"]] }], "", "tax = 200 × 0.18 = 36.0, written in add_gst's own room."],
    [2, [G, { name: "bill_line", vars: [["cost", "200"], ["total", "—"]] }, { name: "add_gst", vars: [["price", "200"], ["tax", "36.0"]], returning: "236.0" }], "", "return 236.0 — the answer is handed DOWN to whoever called..."],
    [5, [G, { name: "bill_line", vars: [["cost", "200"], ["total", "236.0"]] }], "", "add_gst's frame POPS — price and tax are gone forever. total catches 236.0."],
    [6, [G, { name: "bill_line", vars: [["cost", "200"], ["total", "236.0"]] }], "Pay: 236.0", "bill_line prints, using its own total."],
    [8, [G], "Pay: 236.0", "bill_line's frame pops too. Only the global room remains — tidy, like plates cleared after lunch."],
  ];
  const [idx, setIdx] = useState(0);
  const [line, frames, output, narr] = steps[idx];

  const frameColors = { GLOBAL: C.teal, bill_line: C.accent, add_gst: C.purple };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        What if a function calls a function? Python keeps the rooms in a <strong style={{ color: C.text }}>stack</strong> —
        like canteen plates: the newest frame goes on top, and only the top one is active. Step through a
        two-level call and watch frames stack and pop.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: 12, lineHeight: 1.85, padding: "1px 8px", borderRadius: 6,
              background: i === line ? C.accent + "22" : "transparent",
              borderLeft: `3px solid ${i === line ? C.accent : "transparent"}`,
              color: i === line ? C.text : C.muted, whiteSpace: "pre", minHeight: 23,
            }}>{i === line ? "▶ " : "  "}{l}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, flex: 1 }}>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>THE CALL STACK (top = running)</div>
            <div style={{ display: "flex", flexDirection: "column-reverse", gap: 6 }}>
              {frames.map((f, i) => {
                const col = frameColors[f.name] || C.orange;
                const isTop = i === frames.length - 1;
                return (
                  <div key={f.name + i} style={{
                    border: `2px solid ${col}${isTop ? "" : "55"}`, borderRadius: 8, padding: "8px 10px",
                    background: isTop ? col + "14" : "transparent", transition: "all 0.3s",
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: col, letterSpacing: 1 }}>
                      {f.name}{isTop && frames.length > 1 ? "  ← active" : ""}{f.returning ? `  ⤵ returning ${f.returning}` : ""}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                      {f.vars.map(([k, v]) => (
                        <div key={k} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: col, fontWeight: 700 }}>{k}</div>
                          <div style={{ border: `1.5px solid ${col}88`, borderRadius: 6, padding: "3px 8px", fontFamily: "monospace", fontSize: 11.5, color: v === "—" ? C.muted : C.text, background: C.surface }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 12.5, color: C.green, minHeight: 18 }}>{output || " "}</div>
          </div>
        </div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.6 }}>
        {narr}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setIdx((i) => Math.min(steps.length - 1, i + 1))} disabled={idx === steps.length - 1} style={{
          padding: "10px 20px", borderRadius: 8, background: idx === steps.length - 1 ? C.card : C.accentGlow,
          border: "none", color: idx === steps.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: idx === steps.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({idx + 1} / {steps.length})</button>
        <button onClick={() => setIdx(0)} style={{
          padding: "10px 16px", borderRadius: 8, background: C.card, border: `1px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Last in, first out.</strong> bill_line called add_gst, so
        add_gst must FINISH first — its frame sits on top and pops first, exactly like the last plate
        stacked is the first one lifted. This structure is literally called <em>the stack</em> — you'll
        meet it again in every language, and in how recursion works.
      </>)}
    </div>
  );
}

// ── Widget 4: Gotcha — the vanished local ──
function GotchaWidget() {
  const [tried, setTried] = useState(false);
  const [fixed, setFixed] = useState(false);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The classic scope trap: a function computes a beautiful answer, stores it in a local variable...
        and the caller tries to use that variable directly. You know enough now to predict this — run it
        and see.
      </p>

      <div style={{ background: C.card, border: `1.5px solid ${tried ? C.red : C.border}`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
        <pre style={mono}>
          {`def calc_average():\n    result = (72 + 85 + 91) / 3\n\ncalc_average()\nprint(result)`}
        </pre>
        {tried && (
          <pre style={{ ...mono, color: C.red, marginTop: 10 }}>
            {`Traceback (most recent call last):\n  File "avg.py", line 5\nNameError: name 'result' is not defined`}
          </pre>
        )}
      </div>

      {!tried && (
        <button onClick={() => setTried(true)} style={{
          padding: "10px 20px", borderRadius: 8, background: C.red + "22", border: `1.5px solid ${C.red}`,
          color: C.red, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>▶ Run it</button>
      )}

      {tried && (
        <>
          <div style={{ background: C.yellow + "14", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
            ⚠️ <code style={{ color: C.yellow }}>result</code> was born in calc_average()'s room — and that
            room was demolished the instant the function ended. By line 5, <code style={{ color: C.yellow }}>result</code> has
            never existed in the global room. So how does the caller GET the answer?
          </div>

          {!fixed ? (
            <button onClick={() => setFixed(true)} style={{
              padding: "10px 20px", borderRadius: 8, background: C.green + "22", border: `1.5px solid ${C.green}`,
              color: C.green, fontWeight: 600, fontSize: 13, cursor: "pointer",
            }}>✓ Show the right way</button>
          ) : (
            <div style={{ background: C.card, border: `1.5px solid ${C.green}`, borderRadius: 10, padding: 16 }}>
              <pre style={mono}>
                {`def calc_average():\n    result = (72 + 85 + 91) / 3\n    `}<span style={{ color: C.green, fontWeight: 700 }}>return result</span>
                {`\n\navg = calc_average()   `}<span style={{ color: C.green }}># the answer crosses over!</span>
                {`\nprint(avg)             `}<span style={{ color: C.green }}># 82.666...</span>
              </pre>
              <div style={{ color: C.muted, fontSize: 12.5, marginTop: 10, lineHeight: 1.7 }}>
                <code style={{ color: C.green }}>return</code> is the ONLY doorway out of the room —
                exactly what Unit 8.2 promised. The local dies, but its <em>value</em> is handed to the
                caller before the demolition.
              </div>
            </div>
          )}
        </>
      )}

      {fixed && insight(C.purple, <>
        <strong style={{ color: C.purple }}>Locals die; returned values live on.</strong> Never expect a
        function's inner variables outside it — send answers out with return, catch them in a variable of
        your own. This one rule prevents the most common beginner NameError.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: 'x = 10\n\ndef change():\n    x = 99\n\nchange()\nprint(x)\n\nWhat does this print?',
      options: ["10", "99", "NameError", "None"],
      answer: 0,
      explain: "Assignment inside a function creates a LOCAL x in the function's own room. The global x = 10 is untouched.",
    },
    {
      q: 'def calc():\n    secret = 42\n\ncalc()\nprint(secret)\n\nWhat happens?',
      options: ["Prints 42", "Prints None", "NameError — secret doesn't exist here", "Prints 'secret'"],
      answer: 2,
      explain: "secret lived only in calc()'s room, which was demolished at return. Outside, the name was never defined → NameError.",
    },
    {
      q: "Function A calls function B. Which one FINISHES first, and why?",
      options: ["A — it started first", "B — its frame is on top of the stack and must pop first", "Both finish together", "Whichever is defined first in the file"],
      answer: 1,
      explain: "Last in, first out: B's frame stacks on top of A's, so B must complete and pop before A can continue — like the top plate coming off first.",
    },
    {
      q: 'RATE = 0.18\n\ndef gst(price):\n    return price * RATE\n\nprint(gst(100))\n\nWhat does this print?',
      options: ["NameError — RATE is outside", "18.0 — functions can READ globals", "0.18", "None"],
      answer: 1,
      explain: "Reading a global from inside a function is allowed (one-way glass) — only plain assignment creates a new local. 100 × 0.18 = 18.0.",
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
          {score === 4 ? "Perfect! You can see the invisible rooms now." :
            score >= 2 ? "Good work! If frames felt abstract, replay 'The Call Stack' — watching add_gst pop off is the picture to keep." :
              "Worth a replay: 'Two Rooms' for local vs global, then 'The Call Stack' step by step."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 8.3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Local vs global, frames stacking and popping, locals dying and returns escaping — you now see
            what Python sees when code calls code. The memory picture that began with one locker in
            Unit 4.2 is complete.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 8.4 — The Grand Capstone.</strong> Everything
            from Modules 5, 6, 7 AND 8: your Marks Manager reborn as a clean, modular program — the way
            real software is actually written.
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
export default function Unit8_3({ student, onUnitComplete }) {
  const sections = [
    { id: "predict", label: "The Mystery" },
    { id: "rooms", label: "Two Rooms" },
    { id: "stack", label: "The Call Stack" },
    { id: "gotcha", label: "The Gotcha" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>A Mystery: Predict the Output</h3><PredictWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Two Rooms: Local vs Global</h3><RoomsWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Call Stack: Frames Up, Frames Down</h3><StackTrace /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Gotcha: The Vanished Local</h3><GotchaWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 8.3.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 8 › UNIT 8.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Scope & the Call Stack</div>
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
