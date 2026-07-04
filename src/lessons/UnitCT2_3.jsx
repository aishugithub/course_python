import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: The Need — order unlocks things ───────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Last unit, binary search needed a <strong style={{ color: C.text }}>sorted</strong> list. Merit lists,
        leaderboards, "top 3 patients by risk" — all need order too. But how does a computer <em>put</em> a jumbled
        list in order? It can only ever compare and swap two items at a time.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ color: C.red, fontSize: 11, marginBottom: 6 }}>JUMBLED</div>
            <div style={{ display: "flex", gap: 4 }}>{[5, 2, 8, 1].map((v, i) => <div key={i} style={{ minWidth: 34, textAlign: "center", background: C.card, border: `1.5px solid ${C.red}55`, borderRadius: 6, padding: "6px 4px", fontFamily: "monospace", fontWeight: 700, color: C.text }}>{v}</div>)}</div>
          </div>
          <div style={{ color: C.accent, fontSize: 22 }}>→</div>
          <div>
            <div style={{ color: C.green, fontSize: 11, marginBottom: 6 }}>SORTED</div>
            <div style={{ display: "flex", gap: 4 }}>{[1, 2, 5, 8].map((v, i) => <div key={i} style={{ minWidth: 34, textAlign: "center", background: C.card, border: `1.5px solid ${C.green}55`, borderRadius: 6, padding: "6px 4px", fontFamily: "monospace", fontWeight: 700, color: C.text }}>{v}</div>)}</div>
          </div>
        </div>
      </div>

      <div style={{ background: C.yellow + "14", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 12.5, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>
        🔁 <strong style={{ color: C.yellow }}>First, the swap.</strong> To exchange two slots you need a{" "}
        <strong style={{ color: C.text }}>temporary</strong> box — or the first value gets overwritten before you
        can save it:
        <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: "8px 0 0", lineHeight: 1.7, whiteSpace: "pre" }}>{`temp = data[j]\ndata[j] = data[j + 1]\ndata[j + 1] = temp`}</pre>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>All sorting is just compare-and-swap, repeated.</strong> The three
        classic algorithms differ only in <em>which</em> pairs they compare and in what order.
      </div>
    </div>
  );
}

// ── Section 2: Bubble sort anatomy ───────────────────────────────────────────
function BubbleAnatomy() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        <strong style={{ color: C.teal }}>Bubble sort</strong> walks the list comparing each adjacent pair,
        swapping any that are out of order. After one full pass the biggest value has "bubbled" to the end. Repeat,
        and the list falls into order. It's a nested loop (Unit CT-I.4).
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, fontFamily: "monospace", fontSize: 12, lineHeight: 1.95, whiteSpace: "pre" }}>
        n = len(data){"\n"}
        <span style={{ color: C.teal }}>for i in range(n):</span>{"              # one pass per round\n"}
        {"    "}<span style={{ color: C.orange }}>for j in range(n - 1 - i):</span>{"  # compare adjacent pairs\n"}
        {"        "}<span style={{ color: C.purple }}>if data[j] &gt; data[j + 1]:</span>{"\n"}
        {"            "}temp = data[j]{"\n"}
        {"            "}data[j] = data[j + 1]{"\n"}
        {"            "}data[j + 1] = temp{"   # swap the out-of-order pair"}
      </div>

      <div style={{ background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>Why  n - 1 - i?</strong> After pass i, the last i items are already the
        largest and in place — no need to re-check them. The sorted zone grows from the right each pass.
      </div>
    </div>
  );
}

// ── Section 3: Bubble stepper ────────────────────────────────────────────────
const BUBBLE_STEPS = (() => {
  const a = [5, 2, 8, 1];
  const n = a.length;
  const steps = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      const swap = a[j] > a[j + 1];
      if (swap) { const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; }
      steps.push({
        snap: [...a], j, sortedFrom: n - i, swapped: swap,
        desc: swap
          ? `Compare ${[...a][j + 1] !== undefined ? "" : ""}positions ${j} & ${j + 1}: out of order → swap.`
          : `Compare positions ${j} & ${j + 1}: already in order → leave them.`,
      });
    }
  }
  steps.push({ snap: [...a], j: -1, sortedFrom: 0, done: true, desc: "Sorted! Every pair is now in order." });
  return steps;
})();

function BubbleStepper() {
  const [step, setStep] = useState(0);
  const s = BUBBLE_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Watch bubble sort order <code style={{ color: C.accent }}>[5, 2, 8, 1]</code>. The two boxed cells are the
        pair being compared; green cells on the right are already locked in place.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(BUBBLE_STEPS.length - 1, x + 1))} disabled={step === BUBBLE_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === BUBBLE_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === BUBBLE_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === BUBBLE_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {BUBBLE_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14 }}>
        {s.snap.map((v, i) => {
          const comparing = !s.done && (i === s.j || i === s.j + 1);
          const sorted = i >= s.sortedFrom;
          let bg = C.card, border = C.border, col = C.text;
          if (sorted) { bg = C.green + "18"; border = C.green; col = C.green; }
          if (comparing) { bg = s.swapped ? C.orange + "22" : C.accent + "18"; border = s.swapped ? C.orange : C.accent; col = s.swapped ? C.orange : C.accent; }
          return (
            <div key={i} style={{ minWidth: 50, textAlign: "center", borderRadius: 8, padding: "12px 6px", background: bg, border: `2px solid ${border}`, transition: "all 0.2s" }}>
              <div style={{ color: col, fontFamily: "monospace", fontSize: 20, fontWeight: 700 }}>{v}</div>
              <div style={{ color: C.muted, fontSize: 9, marginTop: 2 }}>[{i}]</div>
            </div>
          );
        })}
      </div>

      <div style={{ background: (s.swapped ? C.orange : C.accent) + "12", border: `1px solid ${(s.swapped ? C.orange : C.accent)}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.done ? "✅ " : s.swapped ? "🔁 " : ""}{s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>The green zone grows every pass.</strong> Once a value bubbles to its
        final spot, it never moves again — that's why later passes get shorter.
      </div>
    </div>
  );
}

// ── Section 4: Three sorts ───────────────────────────────────────────────────
function ThreeSorts() {
  const [mode, setMode] = useState("bubble");
  const modes = {
    bubble: {
      label: "Bubble", color: C.teal,
      idea: "Compare each adjacent pair, swap if out of order. Big values bubble to the end.",
      code: "for i in range(n):\n    for j in range(n - 1 - i):\n        if data[j] > data[j + 1]:\n            temp = data[j]\n            data[j] = data[j + 1]\n            data[j + 1] = temp",
    },
    selection: {
      label: "Selection", color: C.orange,
      idea: "Each pass, find the smallest of what's left and swap it to the front. The front grows sorted.",
      code: "for i in range(n):\n    smallest = i\n    for j in range(i + 1, n):\n        if data[j] < data[smallest]:\n            smallest = j\n    temp = data[i]\n    data[i] = data[smallest]\n    data[smallest] = temp",
    },
    insertion: {
      label: "Insertion", color: C.purple,
      idea: "Take the next item and slide it back into its correct place among the already-sorted items. Like sorting a hand of cards.",
      code: "for i in range(1, n):\n    key = data[i]\n    j = i - 1\n    while j >= 0 and data[j] > key:\n        data[j + 1] = data[j]\n        j = j - 1\n    data[j + 1] = key",
    },
  };
  const m = modes[mode];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Three classic sorts, three different orders of comparing — but all compare-and-swap underneath. Tap each.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(modes).map(([k, mv]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, minWidth: 100, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
            background: mode === k ? mv.color + "22" : C.card,
            border: `1.5px solid ${mode === k ? mv.color : C.border}`, color: mode === k ? mv.color : C.muted,
          }}>{mv.label}</button>
        ))}
      </div>

      <div style={{ background: m.color + "14", border: `1px solid ${m.color}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>
        <strong style={{ color: m.color }}>{m.label} sort:</strong> {m.idea}
      </div>

      <pre style={{ background: "#0A0E14", border: `1px solid ${m.color}44`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 11.5, color: C.text, lineHeight: 1.8, margin: 0, whiteSpace: "pre" }}>{m.code}</pre>

      <div style={{ marginTop: 16, background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>All three are "slow" sorts (about N² work).</strong> Real Python
        uses <code style={{ color: C.text }}>data.sort()</code> (a fast built-in). But writing these by hand is how
        you learn to think in algorithms — and they're classic exam/lab questions.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "Why do you need a  temp  variable to swap data[j] and data[j+1]?",
      options: [
        "You don't — it's optional",
        "Without it, the first assignment overwrites one value before you can save it",
        "temp makes it faster",
        "Python can't index lists otherwise",
      ],
      answer: 1,
      explain: "data[j] = data[j+1] destroys the old data[j]. Saving it in temp first preserves it so it can go into data[j+1].",
    },
    {
      q: "In bubble sort, why does the inner loop use  range(n - 1 - i)  instead of  range(n - 1)?",
      options: [
        "To save a variable",
        "After pass i the last i items are already sorted, so re-checking them is wasted work",
        "It's required syntax",
        "To make the list longer",
      ],
      answer: 1,
      explain: "Each pass bubbles one more large value into its final place at the end. Shrinking the inner range skips that growing sorted tail.",
    },
    {
      q: "What single operation do bubble, selection, and insertion sort all rely on?",
      options: ["Division", "Compare two items and possibly swap", "Binary search", "Recursion"],
      answer: 1,
      explain: "All three only ever compare two values and rearrange them. They differ only in which pairs they compare and when.",
    },
    {
      q: "Why bother learning these when  data.sort()  exists?",
      options: [
        "You shouldn't — always use .sort()",
        "They teach algorithmic thinking and are classic lab/exam problems; .sort() is the practical tool",
        "The built-in is slower",
        "They only work on numbers",
      ],
      answer: 1,
      explain: "In production you'd call .sort(). But hand-writing a sort builds the compare-swap-loop intuition behind every algorithm — exactly the lab-manual skill this set trains.",
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
          {score === 4 ? "You can put a list in order three different ways." :
            score >= 2 ? "Good — replay the Bubble Stepper to watch the sorted zone grow." :
              "Revisit Bubble Anatomy and the Stepper, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 CT II · Unit 3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Bubble, selection, insertion — compare and swap until ordered.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 4 — Matrices.</strong> Lists of lists: a grid you walk
            with two indices. Add, transpose, and multiply them with nested loops.
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
export default function UnitCT2_3({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "bubble", label: "Bubble Sort" },
    { id: "step", label: "Bubble Stepper" },
    { id: "three", label: "Three Sorts" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Putting a List in Order</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Bubble Sort</h3><BubbleAnatomy /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>See It: Bubble Sort a List</h3><BubbleStepper /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Three Ways to Sort</h3><ThreeSorts /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on sorting.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING II › UNIT 3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Sorting: Bubble, Selection &amp; Insertion</div>
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
