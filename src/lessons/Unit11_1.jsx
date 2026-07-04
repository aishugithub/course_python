import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: The Need ──────────────────────────────────────────────────────
function TheNeed() {
  const raw = ["Math", "Physics", "Math", "CS", "Physics", "Math"];
  const unique = [...new Set(raw)];
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A list keeps every item, in order, duplicates and all. But sometimes you only care about the{" "}
        <strong style={{ color: C.text }}>distinct</strong> items — the unique subjects a student took, the set of
        IPs that hit a server. That's a <strong style={{ color: C.teal }}>set</strong>: an unordered collection with
        <strong> no duplicates</strong>.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ color: C.muted, fontSize: 11, marginBottom: 6 }}>LIST (with repeats)</div>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: C.text, marginBottom: 12 }}>[{raw.map((x) => `"${x}"`).join(", ")}]</div>
        <div style={{ textAlign: "center", color: C.accent, fontSize: 13, marginBottom: 12 }}>↓ set(subjects) — dedup in one step ↓</div>
        <div style={{ color: C.muted, fontSize: 11, marginBottom: 6 }}>SET (unique only)</div>
        <div style={{ fontFamily: "monospace", fontSize: 13, color: C.green }}>{"{"}{unique.map((x) => `"${x}"`).join(", ")}{"}"}</div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Two superpowers:</strong> a set automatically drops duplicates, and
        checking <code style={{ color: C.purple }}>"CS" in myset</code> is <em>very</em> fast — much faster than
        scanning a long list.
      </div>
    </div>
  );
}

// ── Section 2: Set basics ────────────────────────────────────────────────────
function Basics() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Create a set with curly braces or <code style={{ color: C.teal }}>set()</code>, add with{" "}
        <code style={{ color: C.teal }}>.add()</code>. Adding a duplicate simply does nothing.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14, fontFamily: "monospace", fontSize: 12, lineHeight: 1.85, whiteSpace: "pre" }}>
        subjects = {"{"}"Math", "CS"{"}"}{"        "}<span style={{ color: C.muted }}># a set literal</span>{"\n"}
        subjects.add("Physics"){"       "}<span style={{ color: C.muted }}># {"{"}Math, CS, Physics{"}"}</span>{"\n"}
        subjects.add("Math"){"          "}<span style={{ color: C.muted }}># ignored — already there</span>{"\n"}
        print(len(subjects)){"          "}<span style={{ color: C.muted }}># 3</span>{"\n"}
        print("CS" in subjects){"       "}<span style={{ color: C.muted }}># True — fast check</span>
      </div>

      <div style={{ background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "12px 16px", fontSize: 12.5, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>
        ⚠️ <strong style={{ color: C.red }}>The empty-set trap:</strong> <code style={{ color: C.red }}>{"{}"}</code> is
        an empty <em>dictionary</em>, not a set! For an empty set you must write{" "}
        <code style={{ color: C.green }}>set()</code>.
      </div>

      <div style={{ background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>Sets are unordered.</strong> There's no set[0] — items have no
        position. You loop over a set or test membership, but you don't index it.
      </div>
    </div>
  );
}

// ── Section 3: Set operations ────────────────────────────────────────────────
function Operations() {
  const [op, setOp] = useState("union");
  const A = ["Math", "Physics", "CS"];
  const B = ["Physics", "CS", "Biology"];
  const results = {
    union: { label: "Union  A | B", color: C.green, out: ["Math", "Physics", "CS", "Biology"], note: "Everything in either set — all subjects taken by either student.", sym: "|" },
    inter: { label: "Intersection  A & B", color: C.teal, out: ["Physics", "CS"], note: "Only items in BOTH — subjects they share.", sym: "&" },
    diff: { label: "Difference  A - B", color: C.orange, out: ["Math"], note: "In A but not B — what the first student takes that the second doesn't.", sym: "-" },
  };
  const r = results[op];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Sets do math. Given two students' subjects, combine or compare them with single operators.
      </p>

      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.accent}55`, borderRadius: 10, padding: 12, minWidth: 130 }}>
          <div style={{ color: C.accent, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>A = student 1</div>
          {A.map((x) => <div key={x} style={{ fontFamily: "monospace", fontSize: 12, color: C.text }}>{x}</div>)}
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.purple}55`, borderRadius: 10, padding: 12, minWidth: 130 }}>
          <div style={{ color: C.purple, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>B = student 2</div>
          {B.map((x) => <div key={x} style={{ fontFamily: "monospace", fontSize: 12, color: C.text }}>{x}</div>)}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(results).map(([k, rv]) => (
          <button key={k} onClick={() => setOp(k)} style={{
            flex: 1, minWidth: 120, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "monospace",
            background: op === k ? rv.color + "22" : C.card,
            border: `1.5px solid ${op === k ? rv.color : C.border}`, color: op === k ? rv.color : C.muted,
          }}>A {rv.sym} B</button>
        ))}
      </div>

      <div style={{ background: "#0A0E14", border: `1.5px solid ${r.color}55`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
        <div style={{ color: r.color, fontSize: 12, fontWeight: 700, marginBottom: 8, fontFamily: "monospace" }}>{r.label}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {r.out.map((x) => <div key={x} style={{ fontFamily: "monospace", fontSize: 13, background: r.color + "18", border: `1px solid ${r.color}55`, borderRadius: 6, padding: "4px 10px", color: r.color }}>{x}</div>)}
        </div>
      </div>

      <div style={{ background: r.color + "14", border: `1px solid ${r.color}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
        {r.note}
      </div>

      <div style={{ marginTop: 14, background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>One operator replaces a whole loop.</strong> Finding common
        subjects with lists would need a nested loop; with sets it's just <code style={{ color: C.purple }}>A &amp; B</code>.
      </div>
    </div>
  );
}

// ── Section 4: When to use ───────────────────────────────────────────────────
function WhenToUse() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Reach for a set when order doesn't matter and one of these is true:
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {[
          ["🧹", "Remove duplicates", "unique = set(items) — the fastest dedup in Python. Wrap in list() if you need a list back."],
          ["⚡", "Fast membership tests", '"x" in myset is near-instant even for millions of items; "x" in mylist scans one by one.'],
          ["🔗", "Compare collections", "Common tags (A & B), all tags (A | B), missing tags (A - B) — set math, no loops."],
        ].map(([icon, title, body], i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, display: "flex", gap: 12 }}>
            <div style={{ fontSize: 20 }}>{icon}</div>
            <div>
              <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{title}</div>
              <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 11, marginBottom: 8 }}>list vs set — pick by the job:</div>
        <pre style={{ fontFamily: "monospace", fontSize: 11.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`marks   = [88, 90, 88]   # LIST: order & repeats matter
tags    = {"py", "ai"}   # SET: unique, unordered, fast "in"`}</pre>
      </div>

      <div style={{ background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Set completes your collection toolkit:</strong> list (ordered,
        repeats), tuple (fixed), dict (key→value), and now set (unique, unordered). Four containers, four jobs.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What happens when you add a duplicate item to a set?",
      options: ["It raises an error", "It's silently ignored — the set keeps only unique items", "It's added twice", "The set is cleared"],
      answer: 1,
      explain: "Sets store each value at most once. Adding something already present simply has no effect — that's what makes set() a one-step dedup.",
    },
    {
      q: "Which creates an EMPTY set?",
      options: ["{}", "set()", "[]", "()"],
      answer: 1,
      explain: "{} is an empty dictionary! You must use set() for an empty set. {1, 2} works for a non-empty set literal.",
    },
    {
      q: "To get the subjects TWO students have in common, you'd use…",
      options: ["A | B (union)", "A & B (intersection)", "A - B (difference)", "len(A)"],
      answer: 1,
      explain: "Intersection (A & B) returns items present in both sets — exactly the shared subjects. One operator instead of a nested loop.",
    },
    {
      q: "Why is  \"x\" in myset  faster than  \"x\" in mylist  for large collections?",
      options: [
        "Sets are always small",
        "A set is built for instant lookup, while a list must be scanned item by item",
        "Lists can't be searched",
        "They're the same speed",
      ],
      answer: 1,
      explain: "Sets use hashing for near-instant membership tests. A list has to walk from the front until it finds the item (or reaches the end).",
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
          {score === 4 ? "Sets are now part of your toolkit." :
            score >= 2 ? "Good — replay Operations to lock in union/intersection/difference." :
              "Revisit Basics and Operations, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 11.1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Unique collections, fast membership, and set math.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 11.2 — Modules & the Ecosystem.</strong> Stop
            rewriting code: import Python's built-in libraries and install others with pip.
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
export default function Unit11_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "basics", label: "Set Basics" },
    { id: "ops", label: "Set Operations" },
    { id: "when", label: "When to Use" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Unique Things, No Order</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Set Basics</h3><Basics /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Set Operations</h3><Operations /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>When to Use a Set</h3><WhenToUse /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on sets.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎛️</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 11 › UNIT 11.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Sets: Unique Collections</div>
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
