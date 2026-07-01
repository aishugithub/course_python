import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Bool Basics ─────────────────────────────────────────────────────────────
function BoolBasics() {
  const [demo, setDemo] = useState("5 > 3");
  const demos = {
    "5 > 3": { result: true },
    "5 < 3": { result: false },
    "10 == 10": { result: true },
    '"cat" == "dog"': { result: false },
  };
  const [showFunFact, setShowFunFact] = useState(false);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Back in Unit 4.4, comparisons like <code style={{ color: C.accent }}>5 &gt; 3</code> gave you either{" "}
        <span style={{ color: C.green }}>True</span> or <span style={{ color: C.red }}>False</span>. Those two
        values belong to a real Python type called <strong style={{ color: C.accent }}>bool</strong>. Click a
        comparison below to confirm it.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.keys(demos).map((d) => (
          <button key={d} onClick={() => setDemo(d)} style={{
            padding: "8px 14px", borderRadius: 8, fontFamily: "monospace", fontSize: 13,
            background: demo === d ? C.accentGlow : C.card,
            border: `1.5px solid ${demo === d ? C.accent : C.border}`,
            color: demo === d ? "#fff" : C.text, cursor: "pointer",
          }}>{d}</button>
        ))}
      </div>

      <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 10, padding: 16 }}>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: C.muted, marginBottom: 6 }}>&gt;&gt;&gt; {demo}</div>
        <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: demos[demo].result ? C.green : C.red, marginBottom: 10 }}>
          {String(demos[demo].result)}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: C.muted, marginBottom: 6 }}>&gt;&gt;&gt; type({demo})</div>
        <div style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 700, color: C.accent }}>&lt;class 'bool'&gt;</div>
      </div>

      <button onClick={() => setShowFunFact((v) => !v)} style={{
        marginTop: 14, width: "100%", padding: "10px", borderRadius: 8,
        background: showFunFact ? C.purple + "22" : C.card,
        border: `1.5px solid ${showFunFact ? C.purple : C.border}`,
        color: showFunFact ? C.purple : C.text, fontWeight: 600, fontSize: 13, cursor: "pointer",
      }}>
        {showFunFact ? "▲ Hide fun fact" : "▼ Fun fact: what IS True and False, really?"}
      </button>

      {showFunFact && (
        <div style={{ marginTop: 10, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
          Under the hood, Python treats <code style={{ color: C.purple }}>True</code> as equal to{" "}
          <code style={{ color: C.purple }}>1</code> and <code style={{ color: C.purple }}>False</code> as equal
          to <code style={{ color: C.purple }}>0</code> — so <code style={{ color: C.purple }}>True + True</code>{" "}
          really does evaluate to <code style={{ color: C.purple }}>2</code>. That's part of why the number{" "}
          <code style={{ color: C.purple }}>0</code> specifically turns out to be "falsy" next.
        </div>
      )}
    </div>
  );
}

// ── Truthiness Tester ───────────────────────────────────────────────────────
function TruthinessTester() {
  const values = [
    { label: "0", falsy: true, group: "Numbers", rule: "The number zero is the ONLY falsy number." },
    { label: "1", falsy: false, group: "Numbers", rule: "Any non-zero number, positive or negative, is truthy." },
    { label: "-5", falsy: false, group: "Numbers", rule: "Even negative numbers are truthy — only exactly 0 (or 0.0) is falsy." },
    { label: "0.0", falsy: true, group: "Numbers", rule: "Zero is falsy in any numeric type, including floats." },
    { label: '""', falsy: true, group: "Text", rule: "The EMPTY string is the only falsy string." },
    { label: '"0"', falsy: false, group: "Text", rule: 'Careful! "0" is a non-empty string (one character), so it is truthy — even though it LOOKS like the falsy number 0.' },
    { label: '"False"', falsy: false, group: "Text", rule: 'The text "False" is still a non-empty string, so it is truthy. Only the real bool value False is falsy.' },
    { label: "[]", falsy: true, group: "Collections", rule: "The EMPTY list is falsy." },
    { label: "[0]", falsy: false, group: "Collections", rule: "A list containing one falsy item is still a non-empty list, so the LIST itself is truthy." },
    { label: "{}", falsy: true, group: "Collections", rule: "The empty dictionary is falsy — same rule as empty lists." },
    { label: "None", falsy: true, group: "Special", rule: "None represents 'nothing at all' and is always falsy." },
    { label: "False", falsy: true, group: "Special", rule: "The bool value False is, unsurprisingly, falsy." },
  ];

  const [selected, setSelected] = useState(null);
  const groups = ["Numbers", "Text", "Collections", "Special"];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Python can test ANY value for truthiness — not just True/False. Click any value below to see what{" "}
        <code style={{ color: C.accent }}>bool(value)</code> actually returns, and why.
      </p>

      {groups.map((g) => (
        <div key={g} style={{ marginBottom: 14 }}>
          <div style={{ color: C.muted, fontSize: 11, letterSpacing: 1, marginBottom: 6 }}>{g.toUpperCase()}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {values.filter((v) => v.group === g).map((v) => {
              const i = values.indexOf(v);
              const isSel = selected === i;
              return (
                <button key={v.label} onClick={() => setSelected(i)} style={{
                  padding: "8px 14px", borderRadius: 8, fontFamily: "monospace", fontSize: 13, fontWeight: 700,
                  background: isSel ? (v.falsy ? C.red + "22" : C.green + "22") : C.card,
                  border: `1.5px solid ${isSel ? (v.falsy ? C.red : C.green) : C.border}`,
                  color: isSel ? (v.falsy ? C.red : C.green) : C.text, cursor: "pointer", transition: "all 0.2s",
                }}>{v.label}</button>
              );
            })}
          </div>
        </div>
      ))}

      {selected !== null && (
        <div style={{
          background: C.card, border: `1.5px solid ${values[selected].falsy ? C.red : C.green}55`,
          borderRadius: 10, padding: 16, marginTop: 6,
        }}>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: C.muted, marginBottom: 8 }}>
            &gt;&gt;&gt; bool({values[selected].label})
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: values[selected].falsy ? C.red : C.green, marginBottom: 10 }}>
            {values[selected].falsy ? "False" : "True"}
            <span style={{ fontSize: 12, color: C.muted, marginLeft: 10 }}>
              ({values[selected].falsy ? "falsy" : "truthy"})
            </span>
          </div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{values[selected].rule}</div>
        </div>
      )}

      {selected === null && (
        <div style={{ color: C.muted, fontSize: 12, textAlign: "center", padding: 16 }}>👆 Click a value above to test it.</div>
      )}

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.accent }}>The whole rule in one line:</strong> every type has exactly one
        "empty" or "zero" value that is falsy (0, 0.0, "", [], (), {}, None, and False itself) — everything
        else, no matter how small or unusual, is truthy.
      </div>
    </div>
  );
}

// ── Pitfall Challenge ───────────────────────────────────────────────────────
function PitfallChallenge() {
  const snippets = [
    { code: 'if 0:\n    print("yes")\nelse:\n    print("no")', prediction: "no", reason: "0 is falsy, so the if branch is skipped and the else branch runs." },
    { code: 'if "0":\n    print("yes")\nelse:\n    print("no")', prediction: "yes", reason: 'The string "0" is NOT empty — it has one character in it — so it is truthy, even though it looks like the falsy number 0.' },
    { code: 'if []:\n    print("yes")\nelse:\n    print("no")', prediction: "no", reason: "An empty list is falsy." },
    { code: 'if [0]:\n    print("yes")\nelse:\n    print("no")', prediction: "yes", reason: "This list is NOT empty — it contains one item (which happens to be the falsy number 0) — so the LIST itself is truthy." },
    { code: 'if None:\n    print("yes")\nelse:\n    print("no")', prediction: "no", reason: "None is always falsy, in every context." },
  ];

  const [current, setCurrent] = useState(0);
  const [guess, setGuess] = useState(null);
  const [score, setScore] = useState(0);

  const choose = (val) => {
    if (guess !== null) return;
    setGuess(val);
    if (val === snippets[current].prediction) setScore((s) => s + 1);
  };
  const next = () => { setCurrent((c) => Math.min(c + 1, snippets.length - 1)); setGuess(null); };
  const s = snippets[current];
  const isLast = current === snippets.length - 1;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        For each snippet below, predict what gets printed — <code style={{ color: C.accent }}>"yes"</code> or{" "}
        <code style={{ color: C.accent }}>"no"</code> — before revealing the answer.
      </p>

      <div style={{ color: C.muted, fontSize: 11, marginBottom: 8 }}>Snippet {current + 1} of {snippets.length} · Score: {score}</div>

      <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px", marginBottom: 14, fontFamily: "monospace", fontSize: 13, color: C.text, whiteSpace: "pre-wrap" }}>{s.code}</pre>

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button onClick={() => choose("yes")} disabled={guess !== null} style={{
          flex: 1, padding: "10px", borderRadius: 8, cursor: guess !== null ? "default" : "pointer",
          background: guess !== null && s.prediction === "yes" ? C.green + "22" : C.card,
          border: `1.5px solid ${guess !== null && s.prediction === "yes" ? C.green : C.border}`,
          color: guess !== null && s.prediction === "yes" ? C.green : C.text, fontWeight: 600, fontSize: 13,
        }}>Prints "yes"</button>
        <button onClick={() => choose("no")} disabled={guess !== null} style={{
          flex: 1, padding: "10px", borderRadius: 8, cursor: guess !== null ? "default" : "pointer",
          background: guess !== null && s.prediction === "no" ? C.green + "22" : C.card,
          border: `1.5px solid ${guess !== null && s.prediction === "no" ? C.green : C.border}`,
          color: guess !== null && s.prediction === "no" ? C.green : C.text, fontWeight: 600, fontSize: 13,
        }}>Prints "no"</button>
      </div>

      {guess !== null && (
        <div style={{
          background: (guess === s.prediction ? C.green : C.red) + "18",
          border: `1px solid ${(guess === s.prediction ? C.green : C.red)}44`,
          borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted, marginBottom: 12,
        }}>
          {guess === s.prediction ? "✓ Correct! " : "✗ Not quite. "}💡 {s.reason}
        </div>
      )}

      {guess !== null && !isLast && (
        <button onClick={next} style={{
          width: "100%", padding: "10px", borderRadius: 8, background: C.accentGlow,
          border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>Next Snippet →</button>
      )}

      {guess !== null && isLast && (
        <div style={{ textAlign: "center", padding: "12px 20px", borderRadius: 8, background: C.green + "22", border: `1px solid ${C.green}`, color: C.green, fontWeight: 600 }}>
          You got {score} / {snippets.length} right!
        </div>
      )}
    </div>
  );
}

// ── Pythonic Idioms ─────────────────────────────────────────────────────────
function PythonicIdioms() {
  const [active, setActive] = useState(0);
  const idioms = [
    {
      title: "Checking if a list has items",
      verbose: "if len(my_list) > 0:\n    print(\"has items\")",
      pythonic: "if my_list:\n    print(\"has items\")",
      note: "An empty list is falsy, so simply testing the list itself already tells you whether it's empty — no need to measure its length first.",
    },
    {
      title: "Checking if a string is empty",
      verbose: 'if name == "":\n    print("no name given")',
      pythonic: 'if not name:\n    print("no name given")',
      note: 'An empty string is falsy, so "not name" is True exactly when name is empty — and it also catches None, which the == "" version would miss.',
    },
    {
      title: "Checking a variable exists / was set",
      verbose: "if result != None:\n    print(result)",
      pythonic: "if result:\n    print(result)",
      note: "This shortcut treats None, 0, and empty values all as \"nothing to show\" — convenient, but be careful: it also skips a genuinely meaningful 0 or empty string if that's a valid result in your program!",
    },
  ];
  const idiom = idioms[active];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Because Python understands truthiness, experienced programmers write shorter, more readable
        conditions. Tap each example to compare the verbose version against the idiomatic Python version.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {idioms.map((it, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: "7px 12px", borderRadius: 20,
            background: active === i ? C.accentGlow : C.card,
            border: `1.5px solid ${active === i ? C.accent : C.border}`,
            color: active === i ? "#fff" : C.muted, cursor: "pointer", fontSize: 12,
          }}>{it.title}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.muted, fontSize: 11, letterSpacing: 1, marginBottom: 8 }}>MORE EXPLICIT</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, whiteSpace: "pre-wrap" }}>{idiom.verbose}</pre>
        </div>
        <div style={{ background: C.green + "12", border: `1px solid ${C.green}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.green, fontSize: 11, letterSpacing: 1, marginBottom: 8 }}>PYTHONIC</div>
          <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, whiteSpace: "pre-wrap" }}>{idiom.pythonic}</pre>
        </div>
      </div>

      <div style={{ background: C.yellow + "18", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
        💡 {idiom.note}
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "Which of these is the ONLY falsy string?",
      options: ['"0"', '"" (the empty string)', '"False"', '" " (a single space)'],
      answer: 1,
      explain: 'Only the empty string "" is falsy. Any string with at least one character — even "0", "False", or a single space — is truthy.',
    },
    {
      q: "Why is the list [0] truthy, even though it contains a falsy value?",
      options: [
        "It isn't truthy — [0] is falsy",
        "Truthiness of a list depends on whether the LIST is empty, not on the truthiness of its contents",
        "Lists are always truthy no matter what",
        "Because 0 becomes 1 inside a list",
      ],
      answer: 1,
      explain: "A list's truthiness only depends on whether the list itself is empty. [0] has one item, so it's a non-empty (truthy) list — what's inside doesn't matter.",
    },
    {
      q: "What does bool(None) return?",
      options: ["True", "False", "None", "Error — None cannot be converted to bool"],
      answer: 1,
      explain: "None always evaluates to False in a boolean context — it represents the absence of a value.",
    },
    {
      q: 'Why might if result: be risky if result could legitimately be 0?',
      options: [
        "It isn't risky — 0 is always ignored safely",
        "Because 0 is falsy, so a legitimately meaningful result of 0 would incorrectly skip the if block",
        "Because Python doesn't allow numbers in if statements",
        "Because result would need to be cast to bool first, or it always errors",
      ],
      answer: 1,
      explain: "The truthy/falsy shortcut is convenient, but if 0 (or an empty string) is a valid, meaningful result in your program, this shortcut will incorrectly treat it the same as 'nothing happened.'",
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
        <div style={{ fontSize: 52 }}>{final >= 3 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {final} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {final === 4 ? "Perfect! Truthy/falsy will never trip you up." :
            final >= 2 ? "Good work — revisit the Truthiness Tester once more." :
              "Go back through the Truthiness Tester and Pitfall Challenge, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 5.1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You now understand bool as a real type, and exactly which values Python treats as truthy or
            falsy.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 5.2 — if / elif / else.</strong> This is exactly
            where truthiness gets put to work — deciding which block of code actually runs.
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

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Unit5_1({ student, onUnitComplete }) {
  const sections = [
    { id: "basics", label: "From Comparisons to Bools" },
    { id: "truthiness", label: "Every Value Has a Truth Value" },
    { id: "pitfalls", label: "Spot the Bug" },
    { id: "idioms", label: "Pythonic Idioms" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>From Comparisons to Decisions</h3>
      <BoolBasics />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Every Value Has a Truth Value</h3>
      <TruthinessTester />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Spot the Truthy/Falsy Bug</h3>
      <PitfallChallenge />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Writing Pythonic Conditions</h3>
      <PythonicIdioms />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        4 questions to check your understanding of Unit 5.1.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 5 › UNIT 5.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Booleans & Truthy/Falsy Values</div>
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
