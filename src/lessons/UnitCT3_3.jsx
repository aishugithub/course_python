import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const DISK_COLORS = { 1: C.teal, 2: C.green, 3: C.orange, 4: C.purple };

// ── Section 1: The Need ──────────────────────────────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The <strong style={{ color: C.text }}>Tower of Hanoi</strong>: move a stack of disks from peg A to peg C,
        using peg B as a spare. Two rules — move one disk at a time, and never place a bigger disk on a smaller one.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: 90 }}>
          {["A", "B", "C"].map((peg) => (
            <div key={peg} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
              {peg === "A" && [3, 2, 1].map((d) => (
                <div key={d} style={{ width: 24 + d * 14, height: 14, background: DISK_COLORS[d], borderRadius: 3, marginBottom: 2 }} />
              ))}
              <div style={{ width: 40, borderTop: `2px solid ${C.border}`, color: C.muted, fontSize: 12, textAlign: "center", paddingTop: 4 }}>{peg}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: C.red + "12", border: `1px solid ${C.red}44`, borderRadius: 8, padding: "12px 16px", fontSize: 12.5, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>
        😵 <strong style={{ color: C.red }}>Try writing this with plain loops.</strong> The move order for even 4
        disks is a maze. But recursion turns it into three short lines — this is where recursion truly earns its keep.
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>The trick:</strong> if you could magically move a stack of n−1 disks,
        the whole puzzle becomes easy. Recursion IS that magic — it assumes the smaller problem is already solved.
      </div>
    </div>
  );
}

// ── Section 2: The recursive insight ─────────────────────────────────────────
function Insight() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        To move <strong style={{ color: C.text }}>n</strong> disks from source to target, break it into three steps
        — two of them are just <em>smaller Hanoi problems</em>.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <ol style={{ margin: 0, paddingLeft: 20, color: C.muted, fontSize: 13, lineHeight: 1.9 }}>
          <li>Move the top <strong style={{ color: C.teal }}>n − 1</strong> disks from source → spare <span style={{ color: C.muted }}>(recursion)</span></li>
          <li>Move the <strong style={{ color: C.orange }}>biggest</strong> disk from source → target <span style={{ color: C.muted }}>(one move)</span></li>
          <li>Move those <strong style={{ color: C.teal }}>n − 1</strong> disks from spare → target <span style={{ color: C.muted }}>(recursion)</span></li>
        </ol>
      </div>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16, fontFamily: "monospace", fontSize: 12, lineHeight: 1.9, whiteSpace: "pre" }}>
        def hanoi(n, source, target, spare):{"\n"}
        {"    "}<span style={{ color: C.green }}>if n == 1:</span>{"\n"}
        {"        "}print("Move disk 1 from", source, "to", target){"\n"}
        {"        "}return{"\n"}
        {"    "}<span style={{ color: C.teal }}>hanoi(n - 1, source, spare, target)</span>{"   # step 1\n"}
        {"    "}print("Move disk", n, "from", source, "to", target){"  # step 2\n"}
        {"    "}<span style={{ color: C.teal }}>hanoi(n - 1, spare, target, source)</span>{"   # step 3"}
      </div>

      <div style={{ background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Base case: one disk just moves.</strong> Notice the spare and target
        pegs swap roles in the two recursive calls — that's the whole cleverness, and recursion handles the
        bookkeeping for you.
      </div>
    </div>
  );
}

// ── Section 3: Hanoi stepper ─────────────────────────────────────────────────
const HANOI = (() => {
  const moves = [];
  (function gen(n, s, t, sp) {
    if (n === 1) { moves.push([1, s, t]); return; }
    gen(n - 1, s, sp, t);
    moves.push([n, s, t]);
    gen(n - 1, sp, t, s);
  })(3, "A", "C", "B");

  const pegs = { A: [3, 2, 1], B: [], C: [] };
  const steps = [{ pegs: { A: [3, 2, 1], B: [], C: [] }, desc: "Start: all 3 disks stacked on peg A. Goal: get them all onto peg C.", move: null }];
  for (const [disk, from, to] of moves) {
    pegs[from] = pegs[from].slice(0, -1);
    pegs[to] = [...pegs[to], disk];
    steps.push({
      pegs: { A: [...pegs.A], B: [...pegs.B], C: [...pegs.C] },
      desc: `Move disk ${disk} from ${from} → ${to}.`, move: [disk, from, to],
    });
  }
  steps.push({ pegs: { A: [], B: [], C: [3, 2, 1] }, desc: "Done! All 3 disks are on peg C in 7 moves — and the code never once tracked the sequence by hand.", move: null, done: true });
  return steps;
})();

function Peg({ name, disks, highlight }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: 110 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
        {disks.map((d, i) => (
          <div key={i} style={{
            width: 22 + d * 16, height: 16, background: DISK_COLORS[d], borderRadius: 3, marginBottom: 2,
            boxShadow: highlight === d ? `0 0 0 2px ${C.text}` : "none",
          }} />
        ))}
      </div>
      <div style={{ width: 60, borderTop: `2px solid ${C.border}`, color: C.muted, fontSize: 12, textAlign: "center", paddingTop: 4 }}>{name}</div>
    </div>
  );
}

function HanoiStepper() {
  const [step, setStep] = useState(0);
  const s = HANOI[step];
  const moved = s.move ? s.move[0] : null;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        Step through the 7 moves the recursion produces for 3 disks. You never told it the order — it worked it out
        from three lines.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(HANOI.length - 1, x + 1))} disabled={step === HANOI.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === HANOI.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === HANOI.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === HANOI.length - 1 ? "default" : "pointer",
        }}>Move ▶ ({step} / {HANOI.length - 1})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ background: "#0A0E14", border: `1px solid ${s.done ? C.green : C.border}`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end" }}>
          {["A", "B", "C"].map((p) => <Peg key={p} name={p} disks={s.pegs[p]} highlight={moved} />)}
        </div>
      </div>

      <div style={{ background: (s.done ? C.green : C.accent) + "12", border: `1px solid ${(s.done ? C.green : C.accent)}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.done ? "✅ " : ""}{s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Three lines produced seven perfectly-ordered moves.</strong> That's
        the power: describe the self-similar structure once, and recursion generates the whole intricate sequence.
      </div>
    </div>
  );
}

// ── Section 4: The cost ──────────────────────────────────────────────────────
function Cost() {
  const [n, setN] = useState(3);
  const moves = Math.pow(2, n) - 1;
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Elegant, but not cheap. Moving n disks always takes exactly <strong style={{ color: C.text }}>2ⁿ − 1</strong>{" "}
        moves — because each extra disk roughly doubles the work (two smaller towers plus one move).
      </p>

      <div style={{ marginBottom: 18 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>disks n = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={1} max={20} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ background: C.card, border: `2px solid ${C.orange}`, borderRadius: 10, padding: 18, textAlign: "center", marginBottom: 16 }}>
        <div style={{ color: C.orange, fontSize: 12, letterSpacing: 1, marginBottom: 6 }}>MOVES REQUIRED (2ⁿ − 1)</div>
        <div style={{ color: C.text, fontSize: 32, fontWeight: 800, fontFamily: "monospace" }}>{moves.toLocaleString()}</div>
      </div>

      <div style={{ background: C.yellow + "12", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
        🕰️ The legendary 64-disk temple version needs 2⁶⁴ − 1 moves — more than 18 quintillion. At one move a
        second, longer than the age of the universe. Recursion makes it easy to <em>describe</em>, not fast to <em>run</em>.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "The recursive Hanoi solution breaks 'move n disks' into how many steps?",
      options: [
        "One giant loop",
        "Three: move n−1 to spare, move the biggest, move n−1 to target",
        "Two: move all, then check",
        "It can't be broken down",
      ],
      answer: 1,
      explain: "Two of those three steps are themselves smaller Hanoi problems (n−1 disks), which is exactly why recursion fits so naturally.",
    },
    {
      q: "What is the base case of hanoi(n, ...)?",
      options: ["n == 0", "n == 1 → move the single disk directly", "n == 3", "There isn't one"],
      answer: 1,
      explain: "A single disk just moves from source to target with no sub-problems — that's the base case that stops the recursion.",
    },
    {
      q: "Why is Hanoi a poor fit for plain loops but a great fit for recursion?",
      options: [
        "Loops can't print",
        "The move sequence is deeply self-similar; recursion describes it in 3 lines while a loop must track it by hand",
        "Recursion is always shorter",
        "Loops don't work with pegs",
      ],
      answer: 1,
      explain: "The structure is recursive by nature. Recursion lets you state the pattern once; reproducing the exact move order with loops is painful and error-prone.",
    },
    {
      q: "How many moves does 4-disk Hanoi need?",
      options: ["4", "8", "15", "16"],
      answer: 2,
      explain: "2⁴ − 1 = 15. Each added disk roughly doubles the previous count (3 disks = 7, 4 disks = 15).",
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
          {score === 4 ? "You've seen recursion at its most powerful." :
            score >= 2 ? "Good — replay the Hanoi Stepper to watch 3 lines make 7 moves." :
              "Revisit The Recursive Insight and the Stepper, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 CT III · Content Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            The recursive idea, recursion in action, and Tower of Hanoi — the full computational-thinking arc.<br /><br />
            <strong style={{ color: C.orange }}>Next up (optional): 🔥 The Crucible.</strong> Predict recursive
            output, hunt a missing-base-case bug, assemble a recursive function, and write one from scratch.
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
export default function UnitCT3_3({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Puzzle" },
    { id: "insight", label: "The Insight" },
    { id: "step", label: "Hanoi Stepper" },
    { id: "cost", label: "The Cost" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Tower of Hanoi</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Recursive Insight</h3><Insight /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>See It: 3 Lines, 7 Moves</h3><HanoiStepper /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Cost of Elegance</h3><Cost /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on Tower of Hanoi.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING III › UNIT 3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Tower of Hanoi</div>
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
