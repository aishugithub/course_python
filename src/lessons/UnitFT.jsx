// ============================================================
//  UnitFT.jsx — "The Final Ascent": far-transfer synthesis assessment.
//
//  WHY THIS FILE EXISTS (research angle, not just a lesson):
//  Every other unit's quiz tests recall of THAT unit's single concept.
//  This unit is deliberately different -- it is the paper's evidence for
//  the computational-thinking claim specifically. A brand-new scenario
//  (a library late-fee calculator) that was never used as a worked
//  example anywhere else in the course forces the learner to recombine
//  loops + conditionals + dictionaries + functions on their own, the way
//  a real problem would, instead of pattern-matching a familiar example.
//  Whether that recombination succeeds -- not per-unit recall -- is
//  what this unit's score measures.
//
//  Follows the standard Foothold lesson template (see lesson-template.jsx):
//  same palette, same tab-strip/quiz structure, same
//  "quiz's onComplete is the only caller of onUnitComplete" rule. The one
//  deliberate addition is that onUnitComplete is called WITH a small
//  payload ({ score, total, tag }) instead of no arguments -- App.jsx's
//  handleUnitComplete now accepts an optional payload and forwards it to
//  analytics as-is, so this is the first unit whose quiz result is
//  actually visible in the Events sheet, not just a completion timestamp.
// ============================================================
import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// The one program every section of this unit revolves around. Deliberately
// NOT the marks-manager scenario used repeatedly across the course (M5.4,
// M6.4, M7.6, M8.4, M9.4, M10.5) -- a fresh domain is what makes this a
// transfer test rather than "one more marks-manager variant."
const PROGRAM = `def late_fee(days_late):
    if days_late <= 0:
        return 0
    elif days_late <= 7:
        return days_late * 5      # Rs 5/day, first week
    else:
        return 7 * 5 + (days_late - 7) * 10   # Rs 10/day after

borrowers = [
    ("Asha",  3),
    ("Ravi",  10),
    ("Asha",  0),
    ("Meera", 12),
    ("Ravi",  1),
]

fees = {}
for name, days in borrowers:
    fee = late_fee(days)
    if name in fees:
        fees[name] = fees[name] + fee
    else:
        fees[name] = fee

for name in fees:
    print(name, "owes Rs", fees[name])`;

// ── Section 1: The Challenge — read a brand-new, never-seen program ──
function ChallengeWidget() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        This program has never appeared in any lesson so far. It's a small library system:
        <code style={{ color: C.teal }}> late_fee()</code> turns a number of overdue days into
        a fee, and the loop below it totals fees per borrower across several book returns.
        Read it once, slowly, before moving to the next tab -- nobody is going to walk you
        through it line by line this time.
      </p>
      <pre style={{
        background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
        padding: 16, fontFamily: "monospace", fontSize: 12.5, color: C.text,
        overflowX: "auto", lineHeight: 1.6,
      }}>{PROGRAM}</pre>
      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>Notice what's combined here:</strong> a function
        with its own <em>if/elif/else</em> (Module 5), a loop building up a dictionary
        (Modules 6/7), and a second loop reading that dictionary back out. None of that
        combination was ever shown to you together, on purpose.
      </div>
    </div>
  );
}

// ── Section 2: Trace It — step through the accumulator building, borrower by borrower ──
function TraceWidget() {
  const rows = [
    { name: "Asha", days: 3, fee: 15, note: "3 days late, week-1 rate: 3 × 5 = 15" },
    { name: "Ravi", days: 10, fee: 65, note: "10 days late: 7×5 + 3×10 = 35 + 30 = 65" },
    { name: "Asha", days: 0, fee: 0, note: "0 days late -> the days_late <= 0 branch -> 0" },
    { name: "Meera", days: 12, fee: 85, note: "12 days late: 7×5 + 5×10 = 35 + 50 = 85" },
    { name: "Ravi", days: 1, fee: 5, note: "1 day late, week-1 rate: 1 × 5 = 5" },
  ];
  const [step, setStep] = useState(0);

  const feesSoFar = {};
  for (let i = 0; i <= step; i++) {
    const r = rows[i];
    feesSoFar[r.name] = (feesSoFar[r.name] || 0) + r.fee;
  }

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Step through the first loop one borrower at a time and watch the{" "}
        <code style={{ color: C.teal }}>fees</code> dictionary grow. This is the exact
        "accumulator inside a loop" idea from Computational Thinking I -- just aimed at a
        dictionary instead of a single running total.
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {rows.map((r, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "6px 10px", borderRadius: 7, fontSize: 12, cursor: "pointer",
            background: i === step ? C.accentGlow : C.card,
            border: `1px solid ${i === step ? C.accentGlow : C.border}`,
            color: i === step ? "#fff" : C.muted,
          }}>
            {i + 1}. {r.name} ({r.days}d)
          </button>
        ))}
      </div>
      <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>
          THIS ITERATION: name = "{rows[step].name}", days = {rows[step].days}
        </div>
        <div style={{ color: C.muted, fontSize: 12.5 }}>{rows[step].note}</div>
      </div>
      <div style={{ background: C.teal + "14", border: `1.5px solid ${C.teal}44`, borderRadius: 10, padding: 16 }}>
        <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>fees = {"{"}</div>
        {Object.entries(feesSoFar).map(([k, v]) => (
          <div key={k} style={{ fontFamily: "monospace", fontSize: 13, color: C.text, paddingLeft: 16 }}>
            "{k}": {v},
          </div>
        ))}
        <div style={{ color: C.teal, fontWeight: 700, fontSize: 12 }}>{"}"}</div>
      </div>
      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.accent }}>Key insight.</strong> "Asha" appears twice in{" "}
        <code style={{ color: C.teal }}>borrowers</code> -- the <code style={{ color: C.teal }}>if name in fees</code>{" "}
        check is what lets the second visit ADD to her existing total instead of overwriting it.
      </div>
    </div>
  );
}

// ── Section 3: Spot the Twist — predict output on a deliberately edited variant ──
function TwistWidget() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Suppose the dictionary-building loop were rewritten slightly, by someone who forgot
        the "have we seen this name before?" check:
      </p>
      <pre style={{
        background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10,
        padding: 16, fontFamily: "monospace", fontSize: 12.5, color: C.text, marginBottom: 16,
      }}>{`fees = {}
for name, days in borrowers:
    fees[name] = late_fee(days)   # <- no "if name in fees" check`}</pre>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16 }}>
        Before revealing the answer: what would <code style={{ color: C.teal }}>fees["Asha"]</code>{" "}
        be after this loop finishes, and why? Decide for yourself, then check.
      </p>
      <button onClick={() => setRevealed(true)} style={{
        padding: "10px 18px", borderRadius: 8, background: C.accentGlow, border: "none",
        color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 13, marginBottom: 14,
      }}>Reveal what actually happens</button>
      {revealed && (
        <div style={{ background: C.red + "14", border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
            fees["Asha"] ends up as 0, not 15.
          </div>
          <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.7 }}>
            Without the check, every assignment to <code style={{ color: C.teal }}>fees[name]</code>{" "}
            REPLACES whatever was there. Asha's first visit (3 days late) sets it to 15 -- then her
            second visit (0 days late) overwrites it straight to 0. The bug doesn't crash the
            program or throw an error; it silently produces a wrong total, which is exactly why
            this class of mistake is dangerous.
          </div>
        </div>
      )}
      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>Key insight.</strong> "Accumulate into a dictionary"
        looks like "accumulate into a variable" but has one extra failure mode a plain running
        total never has: overwriting instead of adding.
      </div>
    </div>
  );
}

// ── Quiz: 4 synthesis-level questions. None are answerable from a single module alone. ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "Using the ORIGINAL program (with the \"if name in fees\" check), what does it print for Ravi?",
      options: ["Ravi owes Rs 65", "Ravi owes Rs 70", "Ravi owes Rs 5", "Ravi owes Rs 75"],
      answer: 1,
      explain: "Ravi appears twice: 10 days late -> 65, then 1 day late -> 5. Because the check lets fees add up instead of overwrite, his total is 65 + 5 = 70.",
    },
    {
      q: "A librarian says: \"days_late is never negative in real life, so the 'days_late <= 0' branch is pointless.\" What's the best response?",
      options: [
        "They're right — delete that branch to simplify the function.",
        "The branch also correctly handles days_late == 0 (returned on time), which is a real, expected input, not just a defensive guard against impossible negatives.",
        "The branch is needed only to avoid a Python syntax error.",
        "The branch is dead code because the loop never calls late_fee with 0.",
      ],
      answer: 1,
      explain: "Look at the data: (\"Asha\", 0) is a real row in borrowers. The <= 0 check isn't just paranoia about negative numbers — it's the branch that makes \"returned on time\" charge nothing at all.",
    },
    {
      q: "If the \"if name in fees / else\" check were replaced with fees[name] = fees.get(name, 0) + fee, what would change?",
      options: [
        "Nothing observable — same totals, just a shorter way to write the same accumulate-or-initialize logic.",
        "It would now overwrite instead of add, same bug as the Twist section.",
        "It would throw a KeyError the first time a new name appears.",
        "It would only work for names that appear exactly once.",
      ],
      answer: 0,
      explain: "fees.get(name, 0) returns 0 the first time a name is seen (instead of crashing or needing an if/else), so adding fee to it does exactly what the explicit if/else version does — just in one line. Same behavior, different syntax.",
    },
    {
      q: "Suppose late_fee() used print(...) to show the fee INSTEAD OF return ...  What breaks first, and why?",
      options: [
        "Nothing breaks — print() and return both make the value available to the caller.",
        "fee = late_fee(days) would store None (what a function returns by default when it has no return), so every entry in fees would end up 0, even though correct-looking numbers were printed to the screen during the run.",
        "The program would raise a SyntaxError immediately.",
        "The loop would simply skip that borrower.",
      ],
      answer: 1,
      explain: "print() only displays a value — it does NOT hand it back to whoever called the function. fee = late_fee(days) would silently become fee = None, and None + a number errors out, or if guarded, everything collapses to 0. This is the core function-contract idea from Module 8: printing is not the same as returning.",
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
    else {
      setDone(true);
      // The one call in the whole course (so far) that passes onComplete a
      // payload. App.jsx's handleUnitComplete forwards this straight to
      // analytics as JSON in the new "detail" column -- see Code.gs/analytics.js.
      onComplete && onComplete({ score, total: questions.length, tag: "far_transfer" });
    }
  };

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{score === 4 ? "🏔️" : score >= 2 ? "🧗" : "🪜"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {score} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {score === 4
            ? "You recombined conditionals, loops, dictionaries and function contracts on a scenario you'd never seen before — that's exactly what computational thinking looks like in practice."
            : score >= 2
              ? "Solid transfer. Revisit whichever question tripped you up: it points at exactly one module worth another look (5, 6/7, or 8)."
              : "This unit is deliberately hard — it's testing combination, not recall. Re-read the Trace It and Spot the Twist tabs once more, then retry."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏔️ The Final Ascent — Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You've reached the end of Foothold Python. Every concept from "what is a computer"
            to functions, dictionaries and computational thinking just got tested together, in
            one unfamiliar problem — not as separate boxes to tick.
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

// ── Main — same header/tab-strip/content-card shell as every other lesson ──
export default function UnitFT({ student, onUnitComplete }) {
  const sections = [
    { id: "challenge", label: "The Challenge" },
    { id: "trace", label: "Trace It" },
    { id: "twist", label: "Spot the Twist" },
    { id: "quiz", label: "The Final Ascent" }, // quiz is ALWAYS the last tab
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>A New Problem — Nobody's Walked You Through This One</h3><ChallengeWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Trace the Accumulator, Borrower by Borrower</h3><TraceWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>One Missing Check Changes Everything</h3><TwistWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>The Final Ascent</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        4 questions. Every one of them needs at least two modules' worth of ideas working
        together — this is the synthesis check for everything you've learned.
      </p>
      <Quiz onComplete={(payload) => { markComplete(3); onUnitComplete && onUnitComplete(payload); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏔️</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>FINAL ASSESSMENT</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>The Final Ascent — A Synthesis Challenge</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{completed.length} / {sections.length} done</div>
      </div>

      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(completed.length / sections.length) * 100}%`, background: C.green, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ background: C.accent + "14", border: `1px solid ${C.accent}44`, borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 12.5, color: C.muted }}>
          This optional unit doesn't count toward your regular completion percentage — it's a
          final, ungraded-for-marks challenge that combines ideas from across the whole course.
        </div>
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
