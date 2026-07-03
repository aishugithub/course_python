import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Why For ──────────────────────────────────────────────────────────────────
function WhyFor() {
  const [n, setN] = useState(5);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        In Unit 6.1 every while loop needed the same three-part ritual: create the counter, check it, update
        it. Forget one part and things break. When you already KNOW how many repeats you want, Python has a
        shortcut that does all three jobs for you.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>repeats = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={1} max={10} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.yellow}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.yellow, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>😮‍💨 WHILE — 3 JOBS, YOUR PROBLEM</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.9 }}>
            <span style={{ color: C.yellow }}>i = 0</span>{"              "}<span style={{ color: C.muted }}># ① create</span>{"\n"}
            while <span style={{ color: C.yellow }}>i &lt; {n}</span>:{"       "}<span style={{ color: C.muted }}># ② check</span>{"\n"}
            {"    "}print(i){"\n"}
            {"    "}<span style={{ color: C.yellow }}>i = i + 1</span>{"    "}<span style={{ color: C.muted }}># ③ update</span>
          </pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ FOR — ALL 3 JOBS, AUTOMATIC</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.9 }}>
            for <span style={{ color: C.green }}>i</span> in <span style={{ color: C.green }}>range({n})</span>:{"\n"}
            {"    "}print(i)
          </pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 10, lineHeight: 1.6 }}>
            range({n}) hands i the values 0, 1, ... {n - 1}, one per round, and stops by itself. No counter to
            create, check, or update — no way to write an infinite loop by accident.
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>⚙️ C</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0 }}>{`for (i = 0; i < ${n}; i++) {\n    printf("%d", i);\n}`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>C's for still makes YOU write all three parts — they're just squeezed onto one line.</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🐍 Python</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0 }}>{`for i in range(${n}):\n    print(i)`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>Python hides the machinery entirely. You say WHAT to repeat; range handles HOW.</div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>Rule of thumb:</strong> know the number of repeats in advance →{" "}
        <code style={{ color: C.purple }}>for</code>. Repeating until something happens (user types "quit",
        password is correct) → <code style={{ color: C.purple }}>while</code>. Both loops stay useful forever.
      </div>
    </div>
  );
}

// ── Range Playground ─────────────────────────────────────────────────────────
function RangePlayground() {
  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(8);
  const [step, setStep] = useState(1);

  const values = [];
  for (let v = start; v < stop && values.length < 30; v += step) values.push(v);

  const sliders = [
    { label: "start", val: start, set: setStart, min: 0, max: 14, color: C.teal },
    { label: "stop", val: stop, set: setStop, min: 0, max: 15, color: C.accent },
    { label: "step", val: step, set: setStep, min: 1, max: 4, color: C.purple },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        range() takes up to three numbers: <code style={{ color: C.teal }}>start</code> (where to begin),{" "}
        <code style={{ color: C.accent }}>stop</code> (where to end — <strong style={{ color: C.accent }}>never
        included!</strong>), and <code style={{ color: C.purple }}>step</code> (how much to jump). Play with
        all three and watch the number line.
      </p>

      {sliders.map((s) => (
        <div key={s.label} style={{ marginBottom: 10 }}>
          <label style={{ color: C.muted, fontSize: 12 }}>{s.label} = <strong style={{ color: s.color }}>{s.val}</strong></label>
          <input type="range" min={s.min} max={s.max} value={s.val} onChange={(e) => s.set(Number(e.target.value))} style={{ width: "100%", accentColor: s.color }} />
        </div>
      ))}

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", fontFamily: "monospace", fontSize: 14, textAlign: "center", marginBottom: 14 }}>
        range(<span style={{ color: C.teal }}>{start}</span>, <span style={{ color: C.accent }}>{stop}</span>, <span style={{ color: C.purple }}>{step}</span>)
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 10 }}>NUMBER LINE</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Array.from({ length: 16 }, (_, i) => {
            const produced = values.includes(i);
            const isStop = i === stop;
            return (
              <div key={i} style={{
                width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "monospace", fontSize: 13, fontWeight: produced ? 700 : 400,
                background: produced ? C.green + "26" : "transparent",
                border: `1.5px solid ${produced ? C.green : isStop ? C.red : C.border}`,
                color: produced ? C.green : isStop ? C.red : C.muted,
                transition: "all 0.2s",
              }}>{i}</div>
            );
          })}
        </div>
        <div style={{ marginTop: 12, fontFamily: "monospace", fontSize: 13, color: values.length ? C.green : C.red }}>
          {values.length ? `→ produces: ${values.join(", ")}` : "→ produces NOTHING (start is already past stop — the loop body runs zero times)"}
        </div>
        {values.length > 0 && (
          <div style={{ marginTop: 6, fontSize: 12, color: C.muted }}>
            Notice: <span style={{ color: C.red }}>{stop}</span> itself is {values.includes(stop) ? "" : "NOT "}in the list — stop is where range halts, not the last value.
          </div>
        )}
      </div>

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.accent }}>Shortcuts:</strong> <code style={{ color: C.accent }}>range(5)</code>{" "}
        means range(0, 5, 1) → 0,1,2,3,4. <code style={{ color: C.accent }}>range(2, 6)</code> means step 1 →
        2,3,4,5. And a negative step counts DOWN: <code style={{ color: C.accent }}>range(5, 0, -1)</code> →
        5,4,3,2,1 — perfect for countdowns.
      </div>
    </div>
  );
}

// ── For Trace ────────────────────────────────────────────────────────────────
const TRACE_CODE = ["for i in range(3):", '    print("Hi", i)', 'print("Done!")'];

const TRACE_STEPS = (() => {
  const steps = [{ line: 0, i: null, left: [0, 1, 2], out: [], desc: "range(3) prepares the values 0, 1, 2. The for loop asks: any values left? Yes → i gets 0." }];
  let out = [];
  for (let v = 0; v <= 2; v++) {
    if (v > 0) steps.push({ line: 0, i: v, left: [v + 1, v + 2].filter((x) => x <= 2), out: [...out], desc: `Back to the for line: any values left? Yes → i gets ${v}.` });
    out = [...out, `Hi ${v}`];
    steps.push({ line: 1, i: v, left: [v + 1, v + 2].filter((x) => x <= 2), out: [...out], desc: `The body runs with i = ${v}.` });
  }
  steps.push({ line: 0, i: 2, left: [], out: [...out], desc: "Back to the for line: any values left? NO → the loop ends. No condition, no counter update — range just ran out." });
  steps.push({ line: 2, i: 2, left: [], out: [...out, "Done!"], desc: "Execution continues after the loop." });
  return steps;
})();

function ForTrace() {
  const [step, setStep] = useState(0);
  const s = TRACE_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Step through a for loop and notice what's DIFFERENT from the while trace in Unit 6.1: no condition
        check, no manual update — the loop simply feeds i the next value until range runs dry.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(TRACE_STEPS.length - 1, x + 1))} disabled={step === TRACE_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === TRACE_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === TRACE_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === TRACE_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {TRACE_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 13 }}>
          {TRACE_CODE.map((line, i) => (
            <div key={i} style={{
              padding: "5px 8px", borderRadius: 6, whiteSpace: "pre",
              background: s.line === i ? C.accent + "26" : "transparent",
              border: `1.5px solid ${s.line === i ? C.accent : "transparent"}`,
              color: s.line === i ? C.accent : C.muted, transition: "all 0.25s",
            }}>{s.line === i ? "▶ " : "  "}{line}</div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>MEMORY</div>
            <div style={{ display: "inline-block", background: C.bg, border: `2px solid ${C.teal}`, borderRadius: 8, padding: "8px 18px" }}>
              <div style={{ color: C.teal, fontSize: 11, fontFamily: "monospace" }}>i</div>
              <div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: "monospace" }}>{s.i === null ? "—" : s.i}</div>
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>RANGE — VALUES LEFT</div>
            <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: s.left.length ? C.green : C.red }}>
              {s.left.length ? s.left.join(", ") : "empty"}
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, flex: 1 }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: C.green, minHeight: 40 }}>
              {s.out.map((o, i) => <div key={i}>&gt; {o}</div>)}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.desc}
      </div>
    </div>
  );
}

// ── Build It: Multiplication Table ───────────────────────────────────────────
function TableBuilder() {
  const [n, setN] = useState(7);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The classic school assignment, automated: a multiplication table generator. In Module 5 you'd have
        needed 10 print lines — now it's a 2-line for loop. Pick a number.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>n = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={2} max={19} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.9, margin: 0 }}>{`n = ${n}\nfor i in range(1, 11):\n    print(n, "x", i, "=", n * i)`}</pre>
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 12, color: C.green, lineHeight: 1.75 }}>
          {Array.from({ length: 10 }, (_, k) => (
            <div key={k}>&gt; {n} x {k + 1} = {n * (k + 1)}</div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 Notice <code style={{ color: C.green }}>range(1, 11)</code> — we START at 1 (nobody writes "n × 0")
        and STOP at 11 so that 10 is the last value produced. Off-by-one thinking like this becomes second
        nature very quickly.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What values does range(5) produce?",
      options: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "0, 1, 2, 3, 4, 5", "5, 4, 3, 2, 1"],
      answer: 1,
      explain: "range starts at 0 by default and STOPS BEFORE the stop value — so range(5) gives 0 through 4. Five values, but never 5 itself.",
    },
    {
      q: "What does range(2, 10, 3) produce?",
      options: ["2, 5, 8", "2, 5, 8, 11", "3, 6, 9", "2, 4, 6, 8, 10"],
      answer: 0,
      explain: "Start at 2, jump by 3: 2 → 5 → 8. The next jump would be 11, which is past the stop of 10, so range halts at 8.",
    },
    {
      q: "You want to keep asking the user for a password until they get it right. Which loop fits best?",
      options: ["for — you always know the count in advance", "while — the number of repeats is unknown until it happens", "Either works equally naturally", "Neither — you'd need 100 if statements"],
      answer: 1,
      explain: "You can't know in advance how many attempts the user needs — that's exactly the 'repeat until something happens' shape while is made for. for shines when the count is known.",
    },
    {
      q: "Compared to a while loop, which THREE jobs does for i in range(n) handle automatically?",
      options: ["Printing, adding, and subtracting", "Creating the counter, checking when to stop, and updating the counter", "Only checking the condition", "Nothing — it's just shorter to type"],
      answer: 1,
      explain: "That's the whole point of for: create i, feed it each value, stop when range runs out. All three manual jobs of the while ritual disappear — along with accidental infinite loops.",
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
          {score === 4 ? "Perfect! for and range() are officially in your toolkit." :
            score >= 2 ? "Good work — replay the range() Playground to nail the stop-is-excluded rule." :
              "Revisit the range() Playground and Trace It sections, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 6.2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You now have both loops: while for "repeat until", for for "repeat n times".<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 6.3 — break, continue & Nested Loops.</strong>{" "}
            How to escape a loop early, skip a round, and put loops inside loops.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16, whiteSpace: "pre-wrap" }}>{q.q}</div>
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

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Unit6_2({ student, onUnitComplete }) {
  const sections = [
    { id: "why", label: "Why for?" },
    { id: "range", label: "range() Playground" },
    { id: "trace", label: "Trace It" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>The Loop That Counts For You</h3>
      <WhyFor />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>range() Decoded — start, stop, step</h3>
      <RangePlayground />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Trace It: How for Really Runs</h3>
      <ForTrace />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Build It: Multiplication Table Generator</h3>
      <TableBuilder />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        4 questions to check your understanding of Unit 6.2.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 6 › UNIT 6.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>The for Loop & range()</div>
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
