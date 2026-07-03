// Unit 8.2 — Parameters & Return Values (data in, answers out)
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

// ── Widget 1: Need — one function per message vs one parameter ──
function NeedWidget() {
  const [n, setN] = useState(2);
  const msgs = ["Silence please!", "Lunch break!", "Games period!", "School over!"];
  const names = ["morning", "lunch", "games", "closing"];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Unit 8.1's <code style={{ color: C.teal }}>announce()</code> says the same thing every time. But
        morning needs "Silence please!" and lunch needs "Lunch break!". Without a way to pass information
        in, you're back to copy-paste — one function per message. Drag the slider.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>different messages = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={1} max={4} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ ONE FUNCTION EACH</div>
          <pre style={mono}>
            {Array.from({ length: n }, (_, i) => `def announce_${names[i]}():\n    print("${msgs[i]}")`).join("\n\n")}
            {`\n\n# ${n} function${n > 1 ? "s" : ""}, ${n > 1 ? "all nearly identical" : "so far so good..."} 😬`}
          </pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ ONE FUNCTION + A PARAMETER</div>
          <pre style={mono}>
            {`def announce(message):\n    print(message)\n\n`}
            {Array.from({ length: n }, (_, i) => `announce("${msgs[i]}")`).join("\n")}
          </pre>
          <div style={{ color: C.green, fontSize: 11.5, marginTop: 10 }}>One definition handles all {n} — and any future message too.</div>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>A parameter is a slot for information the caller sends in.</strong> The
        function becomes a machine: same mechanism, different inputs, different results — like a mixer that
        grinds whatever you put in, not just one fixed chutney.
      </>)}
    </div>
  );
}

// ── Widget 2: Arguments flow into parameter slots ──
function ParamWidget() {
  const students = [["PRIYA", 87], ["ARUN", 62], ["MEENA", 91]];
  const [sel, setSel] = useState(0);
  const [name, mark] = students[sel];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Two words that sound alike but sit on opposite sides: the <strong style={{ color: C.teal }}>parameter</strong> is
        the empty locker in the def; the <strong style={{ color: C.orange }}>argument</strong> is the value the
        call sends. Click a student and watch the values fly into the slots.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {students.map(([n], i) => (
          <button key={n} onClick={() => setSel(i)} style={{
            padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: sel === i ? C.accentGlow : C.card, color: sel === i ? "#fff" : C.muted,
            border: `1.5px solid ${sel === i ? C.accent : C.border}`,
          }}>{n}</button>
        ))}
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <pre style={mono}>
          {`def welcome(`}<span style={{ color: C.teal, fontWeight: 700 }}>name</span>{`, `}<span style={{ color: C.teal, fontWeight: 700 }}>mark</span>{`):    # parameters — empty lockers\n    print(name, "scored", mark)\n\nwelcome(`}<span style={{ color: C.orange, fontWeight: 700 }}>"{name}"</span>{`, `}<span style={{ color: C.orange, fontWeight: 700 }}>{mark}</span>{`)      # arguments — the values sent`}
        </pre>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.teal}44`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>INSIDE THE CALL — the parameter lockers fill up</div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.orange, fontFamily: "monospace", marginBottom: 6 }}>"{name}" ⬇</div>
            <div style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>name</div>
            <div style={{ border: `2px solid ${C.teal}`, borderRadius: 8, padding: "8px 16px", fontFamily: "monospace", fontSize: 14, color: C.text, background: C.teal + "12" }}>"{name}"</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.orange, fontFamily: "monospace", marginBottom: 6 }}>{mark} ⬇</div>
            <div style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>mark</div>
            <div style={{ border: `2px solid ${C.teal}`, borderRadius: 8, padding: "8px 16px", fontFamily: "monospace", fontSize: 14, color: C.text, background: C.teal + "12" }}>{mark}</div>
          </div>
          <div style={{ fontSize: 22, color: C.muted }}>→</div>
          <div>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: C.green }}>{name} scored {mark}</div>
          </div>
        </div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.8 }}>
        Order matters: the 1st argument fills the 1st parameter, 2nd fills 2nd.
        <code style={{ color: C.red }}> welcome(87, "PRIYA")</code> would happily print
        <code style={{ color: C.red }}> 87 scored PRIYA</code> — Python trusts your ordering.
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Each call fills the lockers fresh.</strong> Parameters are
        brand-new variables created at the moment of the call, loaded with that call's arguments — which is
        why one function can serve every student in the class.
      </>)}
    </div>
  );
}

// ── Widget 3: return vs print — the vending machine ──
function ReturnWidget() {
  const [mode, setMode] = useState("print");
  const isPrint = mode === "print";

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A GST calculator for the canteen: bill = price + 18% tax. Below, the same function written two
        ways. One only <em>shows</em> the answer; one <em>hands it back</em> so the program can keep
        working with it. Toggle and compare what lands in <code style={{ color: C.teal }}>bill</code>.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button onClick={() => setMode("print")} style={{
          padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          background: isPrint ? C.accentGlow : C.card, color: isPrint ? "#fff" : C.muted,
          border: `1.5px solid ${isPrint ? C.accent : C.border}`,
        }}>with print</button>
        <button onClick={() => setMode("return")} style={{
          padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          background: !isPrint ? C.accentGlow : C.card, color: !isPrint ? "#fff" : C.muted,
          border: `1.5px solid ${!isPrint ? C.accent : C.border}`,
        }}>with return</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${isPrint ? C.red : C.green}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: isPrint ? C.red : C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>
            {isPrint ? "❌ SHOWS, BUT KEEPS NOTHING" : "✅ HANDS THE ANSWER BACK"}
          </div>
          <pre style={mono}>
            {isPrint
              ? `def add_gst(price):\n    print(price * 1.18)\n\nbill = add_gst(200)\nprint(bill)`
              : `def add_gst(price):\n    return price * 1.18\n\nbill = add_gst(200)\nprint(bill)`}
          </pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          {isPrint ? (
            <>
              <pre style={mono}>
                <span style={{ color: C.green }}>236.0</span>
                {"\n"}<span style={{ color: C.red, fontWeight: 700 }}>None</span>
              </pre>
              <div style={{ color: C.red, fontSize: 12, marginTop: 10, lineHeight: 1.7 }}>
                236.0 flashed on screen — but the function handed back nothing, so
                <code style={{ color: C.red }}> bill</code> caught <code style={{ color: C.red }}>None</code>.
                The answer is gone. 😱
              </div>
            </>
          ) : (
            <>
              <pre style={mono}><span style={{ color: C.green }}>236.0</span></pre>
              <div style={{ color: C.green, fontSize: 12, marginTop: 10, lineHeight: 1.7 }}>
                <code style={{ color: C.green }}>bill</code> holds 236.0 — a real value the program can
                keep using:
              </div>
              <pre style={{ ...mono, marginTop: 8 }}>
                {`total = add_gst(200) + add_gst(150)\n`}<span style={{ color: C.green }}># 236.0 + 177.0 = 413.0 ✨</span>
              </pre>
            </>
          )}
        </div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.8 }}>
        Think vending machine: <code style={{ color: C.orange }}>price</code> goes in the coin slot,
        <code style={{ color: C.teal }}> return</code> drops the item into your hand. A machine that only
        <em> displays</em> "here's your juice!" on its screen but never dispenses it — that's print without return.
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>print talks to humans; return talks to your program.</strong> And
        one more superpower: <code style={{ color: C.teal }}>return</code> ends the function <em>immediately</em> —
        the moment it fires, execution jumps back to the caller with the value.
      </>)}
    </div>
  );
}

// ── Widget 4: Build It — grade() machine over the class dict ──
function BuildWidget() {
  const [arun, setArun] = useState(62);
  const entries = [["PRIYA", 87], ["ARUN", arun], ["MEENA", 91], ["DIVYA", 45]];
  const grade = (m) => (m >= 90 ? "A" : m >= 75 ? "B" : m >= 50 ? "C" : "F");
  const gcolor = { A: C.green, B: C.accent, C: C.yellow, F: C.red };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The full machine: mark in → grade out. One <code style={{ color: C.accent }}>grade()</code> function,
        called once per student by the Module 7 dict loop. Notice how each <code style={{ color: C.teal }}>return</code> exits
        instantly — no elif even needed after it (we keep them for readability). Drag Arun across the boundaries.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>marks["ARUN"] = <strong style={{ color: C.accent }}>{arun}</strong></label>
        <input type="range" min={0} max={100} value={arun} onChange={(e) => setArun(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE PROGRAM</div>
          <pre style={mono}>
            {`def grade(mark):\n    if mark >= 90:\n        return "A"\n    elif mark >= 75:\n        return "B"\n    elif mark >= 50:\n        return "C"\n    else:\n        return "F"\n\nmarks = {"PRIYA": 87, "ARUN": ${arun},\n         "MEENA": 91, "DIVYA": 45}\nfor name in marks:\n    print(name, grade(marks[name]))`}
          </pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          <pre style={mono}>
            {entries.map(([n, m]) => (
              <span key={n}>
                <span style={{ color: C.text }}>{n} </span>
                <span style={{ color: gcolor[grade(m)], fontWeight: 700 }}>{grade(m)}{"\n"}</span>
              </span>
            ))}
          </pre>
          <div style={{ marginTop: 12, fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
            4 calls, 4 fresh <code style={{ color: C.teal }}>mark</code> lockers, 4 returned grades.
            The grading rule lives in ONE place — change 90 to 85 once, every student re-grades.
          </div>
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>Functions turn rules into reusable machines.</strong> Modules 5-7
        gave you decisions, loops and collections; parameters and return let you package them into named
        tools. One question left: while grade() runs, WHERE does its <code style={{ color: C.teal }}>mark</code> locker
        live? Next unit opens the call stack.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: 'def double(x):\n    return x * 2\n\nprint(double(5))\n\nWhat does this print?',
      options: ["5", "10", "x * 2", "None"],
      answer: 1,
      explain: "The argument 5 fills the parameter x; return hands back 10, which print displays.",
    },
    {
      q: 'def welcome(name, mark):\n    print(name, "scored", mark)\n\nwelcome("RAJ", 78)\n\nIn this code, what is 78?',
      options: ["A parameter", "An argument", "A return value", "A keyword"],
      answer: 1,
      explain: "Values sent in the CALL are arguments; the empty slots in the def (name, mark) are parameters. 78 fills the parameter mark.",
    },
    {
      q: 'def show_total(a, b):\n    print(a + b)\n\nresult = show_total(2, 3)\nprint(result)\n\nWhat does the last line print?',
      options: ["5", "None", "2 3", "An error"],
      answer: 1,
      explain: "show_total PRINTS 5 but returns nothing — so result catches None. To keep the answer, the function must RETURN it.",
    },
    {
      q: 'def f(a, b):\n    return a - b\n\nprint(f(10, 3))\n\nWhat does this print?',
      options: ["7", "-7", "13", "None"],
      answer: 0,
      explain: "Order matters: the 1st argument 10 fills a, the 2nd argument 3 fills b. a - b = 7. f(3, 10) would give -7.",
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
          {score === 4 ? "Perfect! Data in, answers out — mastered." :
            score >= 2 ? "Good work! If print-vs-return caught you, replay 'return vs print' — the None surprise is the lesson." :
              "Worth a replay: 'Arguments In' for parameter vs argument, and 'return vs print' for why None appears."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 8.2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Your functions now take inputs through parameters and hand answers back with return — true
            reusable machines.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 8.3 — Scope & the Call Stack.</strong> When
            grade() runs, where does its mark locker actually live? And why does it vanish afterwards?
            Time to extend Unit 4.2's memory picture into its final form: the stack.
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
export default function Unit8_2({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Why?" },
    { id: "params", label: "Arguments In" },
    { id: "return", label: "return vs print" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>One Machine, Many Inputs</h3><NeedWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Arguments Fill Parameter Lockers</h3><ParamWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>return vs print: The Vending Machine</h3><ReturnWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build It: The grade() Machine</h3><BuildWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 8.2.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 8 › UNIT 8.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Parameters & Return Values</div>
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
