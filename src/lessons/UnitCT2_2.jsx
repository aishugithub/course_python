import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const SORTED = [12, 23, 45, 67, 89, 91, 103];

// ── Section 1: The Need — membership & position ──────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Scanning gave you a <em>summary</em> (max, sum…). Searching answers a different question:{" "}
        <strong style={{ color: C.text }}>"is this value in the list — and where?"</strong> Think roll-number lookup,
        a patient ID in a register, a name in a contact list.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Two honest answers a search must give:</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, background: C.green + "14", border: `1px solid ${C.green}44`, borderRadius: 8, padding: 12 }}>
            <div style={{ color: C.green, fontWeight: 700, fontSize: 12.5 }}>✅ Found → its index</div>
            <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>"67 is at position 3."</div>
          </div>
          <div style={{ flex: 1, minWidth: 200, background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: 12 }}>
            <div style={{ color: C.red, fontWeight: 700, fontSize: 12.5 }}>❌ Absent → a sentinel, -1</div>
            <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>"50 isn't here" → return -1, a value no real index can be.</div>
          </div>
        </div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Two strategies, huge difference.</strong> Linear search works on{" "}
        <em>any</em> list. Binary search is dramatically faster — but demands a <strong style={{ color: C.text }}>sorted</strong> list.
        You'll build both.
      </div>
    </div>
  );
}

// ── Section 2: Linear search anatomy ─────────────────────────────────────────
function LinearAnatomy() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The obvious way: check each slot in turn. It's the flag/verdict pattern (Unit CT-I.3) with a twist —{" "}
        <code style={{ color: C.orange }}>break</code> the moment you find it, so you don't waste time.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, fontFamily: "monospace", fontSize: 12.5, lineHeight: 2, whiteSpace: "pre" }}>
        target = 67{"\n"}
        <span style={{ color: C.teal }}>found = -1</span>{"                     # assume absent\n"}
        for i in range(len(data)):{"\n"}
        {"    "}<span style={{ color: C.orange }}>if data[i] == target:</span>{"\n"}
        {"        "}found = i{"              # remember WHERE\n"}
        {"        "}<span style={{ color: C.purple }}>break</span>{"                  # stop — no need to look further\n"}
        print(found){"                   # index, or -1 if never set"}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.teal}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Why found = -1?</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>Indices are 0, 1, 2… -1 can never be a real position, so it cleanly means "not here."</div>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.purple}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.purple, fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Why break?</div>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>Once found, more looking is wasted work. Worst case (absent), linear search still touches all N items.</div>
        </div>
      </div>

      <div style={{ marginTop: 14, background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>Linear search: up to N checks.</strong> A million-row register could
        cost a million comparisons. That's the price we'll cut next.
      </div>
    </div>
  );
}

// ── Section 3: Binary search step-through ────────────────────────────────────
const BIN_STEPS = (() => {
  const target = 67;
  const steps = [];
  let low = 0, high = SORTED.length - 1, found = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (SORTED[mid] === target) {
      found = mid;
      steps.push({ low, high, mid, found, desc: `data[${mid}] = ${SORTED[mid]} == target → FOUND at index ${mid}.` });
      break;
    } else if (SORTED[mid] < target) {
      steps.push({ low, high, mid, found: -1, desc: `data[${mid}] = ${SORTED[mid]} < 67 → target is to the RIGHT. low = ${mid + 1}.` });
      low = mid + 1;
    } else {
      steps.push({ low, high, mid, found: -1, desc: `data[${mid}] = ${SORTED[mid]} > 67 → target is to the LEFT. high = ${mid - 1}.` });
      high = mid - 1;
    }
  }
  return steps;
})();

function BinaryStepper() {
  const [step, setStep] = useState(0);
  const s = BIN_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Binary search on a <strong style={{ color: C.text }}>sorted</strong> list. Look at the middle: too small?
        throw away the left half. Too big? throw away the right. Each step <strong>halves</strong> what's left.
        Searching for <code style={{ color: C.accent }}>67</code>.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(BIN_STEPS.length - 1, x + 1))} disabled={step === BIN_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === BIN_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === BIN_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === BIN_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {BIN_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 8, flexWrap: "wrap" }}>
        {SORTED.map((v, i) => {
          const inRange = i >= s.low && i <= s.high;
          const isMid = i === s.mid;
          const isFound = s.found === i;
          let bg = C.surface, border = C.border, col = C.muted;
          if (inRange) { col = C.text; border = C.border; }
          if (isMid) { bg = C.accent + "22"; border = C.accent; col = C.accent; }
          if (isFound) { bg = C.green + "22"; border = C.green; col = C.green; }
          return (
            <div key={i} style={{ textAlign: "center", opacity: inRange ? 1 : 0.3 }}>
              <div style={{ minWidth: 40, borderRadius: 8, padding: "8px 4px", background: bg, border: `1.5px solid ${border}` }}>
                <div style={{ color: col, fontFamily: "monospace", fontSize: 15, fontWeight: 700 }}>{v}</div>
              </div>
              <div style={{ color: isMid ? C.accent : C.muted, fontSize: 9, marginTop: 2 }}>{isMid ? "mid" : i}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 12 }}>
        {[["low", s.low, C.teal], ["mid", s.mid, C.accent], ["high", s.high, C.orange]].map(([lbl, val, clr]) => (
          <div key={lbl} style={{ background: C.card, border: `2px solid ${clr}`, borderRadius: 8, padding: "6px 16px", textAlign: "center" }}>
            <div style={{ color: clr, fontSize: 10, letterSpacing: 1 }}>{lbl}</div>
            <div style={{ color: C.text, fontSize: 18, fontWeight: 700, fontFamily: "monospace" }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{ background: C.accent + "12", border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Halving is powerful.</strong> 7 items → at most 3 checks. A million
        items → only ~20. That's the payoff for keeping the list sorted.
      </div>
    </div>
  );
}

// ── Section 4: Compare — linear vs binary ────────────────────────────────────
function Compare() {
  const [n, setN] = useState(1000);
  const linear = n;
  const binary = Math.ceil(Math.log2(n + 1));

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Worst-case comparisons to search a list of <strong style={{ color: C.text }}>N</strong> items. Drag N and
        watch the gap explode.
      </p>

      <div style={{ marginBottom: 18 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>N = <strong style={{ color: C.accent }}>{n.toLocaleString()}</strong> items</label>
        <input type="range" min={10} max={1000000} step={10} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `2px solid ${C.orange}`, borderRadius: 10, padding: 16, textAlign: "center" }}>
          <div style={{ color: C.orange, fontSize: 12, letterSpacing: 1, marginBottom: 6 }}>LINEAR (any list)</div>
          <div style={{ color: C.text, fontSize: 30, fontWeight: 800, fontFamily: "monospace" }}>{linear.toLocaleString()}</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>checks — one per item</div>
        </div>
        <div style={{ background: C.card, border: `2px solid ${C.green}`, borderRadius: 10, padding: 16, textAlign: "center" }}>
          <div style={{ color: C.green, fontSize: 12, letterSpacing: 1, marginBottom: 6 }}>BINARY (sorted list)</div>
          <div style={{ color: C.text, fontSize: 30, fontWeight: 800, fontFamily: "monospace" }}>{binary}</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>checks — about log₂(N)</div>
        </div>
      </div>

      <pre style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, fontFamily: "monospace", fontSize: 11.5, color: C.text, lineHeight: 1.7, margin: 0, whiteSpace: "pre" }}>{`low = 0\nhigh = len(data) - 1\nfound = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if data[mid] == target:\n        found = mid\n        break\n    elif data[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1`}</pre>

      <div style={{ marginTop: 16, background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        ⚠️ <strong style={{ color: C.red }}>Binary's catch:</strong> it only works if the list is already sorted.
        On an unsorted list it gives wrong answers. So sorting — the next unit — is what unlocks fast search.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "Why start  found = -1  in linear search?",
      options: [
        "It's the first index",
        "-1 can never be a real index, so it cleanly signals 'not found'",
        "To make the loop stop",
        "Python requires it",
      ],
      answer: 1,
      explain: "Real indices are 0, 1, 2… A sentinel of -1 is unmistakably 'absent', and if the loop never overwrites it, the caller knows the target wasn't there.",
    },
    {
      q: "What MUST be true of a list before binary search works?",
      options: ["It must be short", "It must be sorted", "It must contain the target", "It must have no duplicates"],
      answer: 1,
      explain: "Binary search decides which half to discard by comparing to the middle — that logic is only valid if the data is in order.",
    },
    {
      q: "Roughly how many checks does binary search need for 1,000,000 sorted items?",
      options: ["1,000,000", "1,000", "About 20", "About 100,000"],
      answer: 2,
      explain: "Each step halves the range: log₂(1,000,000) ≈ 20. Linear search would need up to a million. That's the power of halving.",
    },
    {
      q: "On a small UNSORTED list, which search is the safe choice?",
      options: ["Binary — it's always faster", "Linear — it makes no ordering assumption", "Neither works", "Both give the same wrong answer"],
      answer: 1,
      explain: "Binary search would misbehave on unsorted data. Linear search checks every item and works regardless of order — the right tool when you can't guarantee sorting.",
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
          {score === 4 ? "You know when to scan and when to halve." :
            score >= 2 ? "Good — replay the Binary Stepper to feel the halving." :
              "Revisit Linear Anatomy and the Binary Stepper, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 CT II · Unit 2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Linear search works anywhere; binary search halves a sorted list.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 3 — Sorting.</strong> The very thing binary search
            depends on. You'll watch bubble, selection and insertion sort put a list in order, step by step.
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
export default function UnitCT2_2({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "linear", label: "Linear Search" },
    { id: "binary", label: "Binary Stepper" },
    { id: "compare", label: "Linear vs Binary" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Is It Here — and Where?</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Linear Search</h3><LinearAnatomy /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Binary Search, Step by Step</h3><BinaryStepper /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Linear vs Binary</h3><Compare /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on searching.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING II › UNIT 2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Searching: Linear &amp; Binary</div>
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
