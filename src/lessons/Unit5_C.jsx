// Unit5_C — 🔥 The Crucible: Module 5 (Making Decisions)
// Same gated 4-stage arc as the Unit4_C pilot, with the new
// trace-the-state (typed answer) challenge type added to Spark.
import { useState, useRef } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const UNIT_ID = "Unit5_C";
const STAGES = [
  { id: "spark", label: "Spark", icon: "✨", tag: "Predict & Trace" },
  { id: "flame", label: "Flame", icon: "🔥", tag: "Bug Hunt" },
  { id: "forge", label: "Forge", icon: "⚒️", tag: "Assemble the Program" },
  { id: "temper", label: "Temper", icon: "🗡️", tag: "Write Real Python" },
];

const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };

// ── Hint box: reveals one nudge at a time, never the answer ──
function Hints({ hints, shown, onMore }) {
  return (
    <div style={{ marginTop: 10 }}>
      {hints.slice(0, shown).map((h, i) => (
        <div key={i} style={{ background: C.yellow + "14", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: C.muted, lineHeight: 1.6, marginBottom: 6 }}>
          💡 Hint {i + 1}: {h}
        </div>
      ))}
      {shown < hints.length && (
        <button onClick={onMore} style={{
          padding: "6px 12px", borderRadius: 7, fontSize: 12, cursor: "pointer",
          background: C.card, color: C.yellow, border: `1px solid ${C.yellow}55`,
        }}>💡 Need a nudge? ({shown}/{hints.length} hints used)</button>
      )}
    </div>
  );
}

// ── Stage 1: Spark — predict-the-output MCQs + one trace-the-state (typed) ──
function SparkStage({ onPass }) {
  const questions = [
    {
      kind: "mcq",
      code: "x = 7\nprint(x > 5 and x < 10)",
      options: ["True", "False", "7", "Error"],
      answer: 0,
      hints: ["Evaluate each side separately first: is x > 5? Is x < 10?", "and needs BOTH sides True — are they?"],
      why: "x > 5 → True, x < 10 → True, and True and True → True. Comparisons produce booleans.",
    },
    {
      kind: "mcq",
      code: 'marks = 85\nif marks >= 90:\n    print("A")\nelif marks >= 80:\n    print("B")\nelse:\n    print("C")',
      options: ["A", "B", "C", "A and B"],
      answer: 1,
      hints: ["Python checks the conditions top to bottom and stops at the FIRST True one.", "85 >= 90 is False, so Python moves on. Is 85 >= 80?"],
      why: "The elif chain runs exactly ONE branch — the first condition that's True. 85 >= 80 → \"B\", and the rest is skipped.",
    },
    {
      kind: "trace",
      code: "a = 5\nb = 2\nif a > b:\n    a = a - b\nif a > b:\n    a = a - b\nprint(a)",
      expect: "1",
      prompt: "Trace the state: what number does this print? Type it below.",
      hints: ["These are two SEPARATE ifs — each one checks the CURRENT value of a.", "First if: 5 > 2, so a becomes 3. Second if: is 3 > 2? Then a changes again."],
      why: "a: 5 → 3 (first if fires) → 1 (second if fires too, because 3 > 2). Each if re-checks the freshest value.",
    },
  ];
  const [solved, setSolved] = useState([]);
  const [picked, setPicked] = useState({});   // qIdx -> last wrong pick
  const [typed, setTyped] = useState({});     // qIdx -> current typed text
  const [typedWrong, setTypedWrong] = useState({});
  const [hintCount, setHintCount] = useState({});

  const bumpHint = (qi) =>
    setHintCount((h) => ({ ...h, [qi]: Math.min((h[qi] || 0) + 1, questions[qi].hints.length) }));

  const pick = (qi, oi) => {
    if (solved.includes(qi)) return;
    if (oi === questions[qi].answer) {
      setSolved((s) => [...s, qi]);
      setPicked((p) => ({ ...p, [qi]: null }));
    } else {
      setPicked((p) => ({ ...p, [qi]: oi }));
      bumpHint(qi);
    }
  };

  const checkTyped = (qi) => {
    if (solved.includes(qi)) return;
    if ((typed[qi] || "").trim() === questions[qi].expect) {
      setSolved((s) => [...s, qi]);
      setTypedWrong((w) => ({ ...w, [qi]: false }));
    } else {
      setTypedWrong((w) => ({ ...w, [qi]: true }));
      bumpHint(qi);
    }
  };

  const allDone = solved.length === questions.length;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Warm-up: read each snippet <em>as Python would</em>. Two are multiple choice — the third has no
        options at all: you trace the variable in your head and TYPE the answer. Wrong tries just light
        hints. ✨
      </p>

      {questions.map((q, qi) => {
        const isSolved = solved.includes(qi);
        return (
          <div key={qi} style={{ background: C.card, border: `1.5px solid ${isSolved ? C.green : C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
                CHALLENGE {qi + 1} OF 3{q.kind === "trace" ? " · TRACE THE STATE" : ""}
              </span>
              {isSolved && <span style={{ color: C.green, fontSize: 12, fontWeight: 700 }}>✓ solved</span>}
            </div>
            <pre style={{ ...mono, background: C.surface, borderRadius: 8, padding: 12, border: `1px solid ${C.border}`, marginBottom: 10 }}>{q.code}</pre>

            {q.kind === "mcq" && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {q.options.map((opt, oi) => {
                  let bg = C.surface, border = C.border, col = C.text;
                  if (isSolved && oi === q.answer) { bg = C.green + "22"; border = C.green; col = C.green; }
                  else if (picked[qi] === oi) { bg = C.red + "22"; border = C.red; col = C.red; }
                  return (
                    <button key={oi} onClick={() => pick(qi, oi)} style={{
                      padding: "8px 16px", borderRadius: 8, fontFamily: "monospace", fontSize: 13,
                      background: bg, border: `1.5px solid ${border}`, color: col,
                      cursor: isSolved ? "default" : "pointer", transition: "all 0.2s",
                    }}>{opt}</button>
                  );
                })}
              </div>
            )}

            {q.kind === "trace" && (
              <div>
                <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 8 }}>{q.prompt}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    value={typed[qi] || ""}
                    onChange={(e) => setTyped((t) => ({ ...t, [qi]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && checkTyped(qi)}
                    disabled={isSolved}
                    spellCheck={false}
                    style={{
                      width: 120, padding: "8px 12px", borderRadius: 8, fontFamily: "monospace", fontSize: 14,
                      background: "#010409", color: isSolved ? C.green : C.text, outline: "none",
                      border: `1.5px solid ${isSolved ? C.green : typedWrong[qi] ? C.red : C.border}`,
                    }} />
                  {!isSolved && (
                    <button onClick={() => checkTyped(qi)} style={{
                      padding: "8px 18px", borderRadius: 8, background: C.accentGlow, border: "none",
                      color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer",
                    }}>Check</button>
                  )}
                </div>
              </div>
            )}

            {isSolved
              ? <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: C.green + "12", border: `1px solid ${C.green}44`, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>✓ {q.why}</div>
              : (hintCount[qi] || 0) > 0 && <Hints hints={q.hints} shown={hintCount[qi] || 0} onMore={() => bumpHint(qi)} />}
          </div>
        );
      })}

      {allDone && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
        }}>✨ Spark caught! Light the Flame →</button>
      )}
    </div>
  );
}

// ── Stage 2: Flame — bug hunts (click the line, pick the fix) ──
function FlameStage({ onPass }) {
  const bugs = [
    {
      intro: "This should congratulate scores of 90 or more — but Python refuses to even START it (SyntaxError). Click the buggy line.",
      lines: ["marks = 95", "if marks = 90:", '    print("Top score!")'],
      buggyLine: 1,
      lineHints: {
        0: "This line is fine — a normal assignment into the locker marks.",
        2: "The print is innocent — Python never even got this far.",
      },
      fixes: ["if marks >= 90:", "if marks = 95:", "if marks == 90:"],
      fixAnswer: 0,
      fixHints: ["One = STORES, two == COMPARES. An if needs a question, not an assignment.", "And re-read the goal: '90 or more' — which comparison covers 95 too?"],
      why: "= assigns, == compares — if needs a comparison. And since the goal is \"90 or more\", the right question is marks >= 90 (== 90 would ignore 95!).",
    },
    {
      intro: "A grading program: 80+ should earn \"Distinction\" — but a score of 85 prints \"Pass\". No crash, just a WRONG answer. Click the line that causes it.",
      lines: ["score = 85", "if score >= 60:", '    grade = "Pass"', "elif score >= 80:", '    grade = "Distinction"', "else:", '    grade = "Fail"', "print(grade)"],
      buggyLine: 1,
      lineHints: {
        0: "score = 85 is exactly what we want to test with.",
        3: "This condition is correct — the problem is it never gets a CHANCE to run. Why not?",
        4: "Innocent. Something above it steals the show first.",
        5: "else is fine.",
        6: "Innocent.",
        7: "The print just reports whatever grade holds.",
      },
      fixes: ["if score >= 80:  (check the HIGHER band first, then elif score >= 60)", "if score > 60:", 'if score == "Pass":'],
      fixAnswer: 0,
      fixHints: ["An elif chain stops at the FIRST True condition — 85 >= 60 is True, so Python never looks further.", "Order matters: test the narrowest / highest band first, then work downwards."],
      why: "Logic bug, not a crash: 85 >= 60 is True, so the chain stops there. Always order elif bands from highest to lowest.",
    },
  ];
  const [cur, setCur] = useState(0);
  const [foundLine, setFoundLine] = useState(false);
  const [wrongLine, setWrongLine] = useState(null);
  const [fixPicked, setFixPicked] = useState(null);
  const [fixedCount, setFixedCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const b = bugs[cur];
  const solvedThis = fixPicked === b.fixAnswer;

  const clickLine = (i) => {
    if (foundLine) return;
    if (i === b.buggyLine) { setFoundLine(true); setWrongLine(null); }
    else setWrongLine(i);
  };
  const pickFix = (i) => {
    if (solvedThis) return;
    setFixPicked(i);
    if (i !== b.fixAnswer) setHintCount((h) => Math.min(h + 1, b.fixHints.length));
  };
  const nextBug = () => {
    setFixedCount((n) => n + 1);
    if (cur < bugs.length - 1) {
      setCur(cur + 1); setFoundLine(false); setWrongLine(null); setFixPicked(null); setHintCount(0);
    }
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Real debugging, two rounds: first find WHERE the bug lives, then choose HOW to fix it. One bug
        crashes — the other is sneakier: it runs fine and lies to you. Bug {Math.min(fixedCount + 1, bugs.length)} of {bugs.length}. 🔥
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.orange, fontSize: 12, fontWeight: 600, marginBottom: 10, lineHeight: 1.6 }}>{b.intro}</div>
        <div style={{ background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, padding: 8 }}>
          {b.lines.map((l, i) => {
            let border = "transparent", bg = "transparent";
            if (foundLine && i === b.buggyLine) { border = C.green; bg = C.green + "18"; }
            else if (wrongLine === i) { border = C.red; bg = C.red + "12"; }
            return (
              <div key={i} onClick={() => clickLine(i)} style={{
                fontFamily: "monospace", fontSize: 12.5, lineHeight: 2, padding: "2px 10px",
                borderRadius: 6, cursor: foundLine ? "default" : "pointer",
                borderLeft: `3px solid ${border}`, background: bg, color: C.text, whiteSpace: "pre",
              }}>{i + 1}  {l}</div>
            );
          })}
        </div>
        {wrongLine !== null && !foundLine && (
          <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: C.yellow + "14", border: `1px solid ${C.yellow}44`, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
            💡 {b.lineHints[wrongLine]}
          </div>
        )}

        {foundLine && (
          <div style={{ marginTop: 14 }}>
            <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>✓ Bug located! Now pick the fix:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {b.fixes.map((f, i) => {
                let bg = C.surface, border = C.border, col = C.text;
                if (solvedThis && i === b.fixAnswer) { bg = C.green + "22"; border = C.green; col = C.green; }
                else if (fixPicked === i && i !== b.fixAnswer) { bg = C.red + "22"; border = C.red; col = C.red; }
                return (
                  <button key={i} onClick={() => pickFix(i)} style={{
                    textAlign: "left", padding: "9px 14px", borderRadius: 8, fontFamily: "monospace", fontSize: 12.5,
                    background: bg, border: `1.5px solid ${border}`, color: col,
                    cursor: solvedThis ? "default" : "pointer",
                  }}>{f}</button>
                );
              })}
            </div>
            {!solvedThis && hintCount > 0 && (
              <Hints hints={b.fixHints} shown={hintCount} onMore={() => setHintCount((h) => Math.min(h + 1, b.fixHints.length))} />
            )}
            {solvedThis && (
              <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: C.green + "12", border: `1px solid ${C.green}44`, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>✓ {b.why}</div>
            )}
          </div>
        )}
      </div>

      {solvedThis && cur < bugs.length - 1 && (
        <button onClick={nextBug} style={{
          padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none",
          color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>Next bug →</button>
      )}
      {solvedThis && cur === bugs.length - 1 && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
        }}>🔥 Both bugs extinguished! To the Forge →</button>
      )}
    </div>
  );
}

// ── Stage 3: Forge — Parsons problem; deps now include block structure ──
function ForgeStage({ onPass }) {
  // needs/defines tokens cover both lockers AND if/else structure,
  // so the checker can explain misplaced block lines too.
  const target = [
    { code: 'age = int(input("Your age? "))', defines: "age", needs: [] },
    { code: "if age >= 18:", defines: "if_open", needs: ["age"] },
    { code: '    print("You can vote!")', defines: "if_body", needs: ["if_open"] },
    { code: "else:", defines: "else_open", needs: ["if_body"] },
    { code: '    print("Come back in", 18 - age, "years")', defines: null, needs: ["else_open"] },
  ];
  const MSG = {
    age: "the locker age doesn't exist yet — the input line must come first",
    if_open: "there's no if above it to belong to",
    if_body: "the if needs its body in place before else can appear",
    else_open: "there's no else: above it to belong to",
  };
  const shuffled = [3, 0, 4, 1, 2]; // fixed shuffle so the puzzle is stable
  const [order, setOrder] = useState(shuffled);
  const [verdict, setVerdict] = useState(null); // {ok, msg}
  const [solved, setSolved] = useState(false);

  const move = (idx, dir) => {
    if (solved) return;
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[idx], next[j]] = [next[j], next[idx]];
    setOrder(next); setVerdict(null);
  };

  const check = () => {
    const defined = new Set();
    for (const li of order) {
      const line = target[li];
      const missing = line.needs.find((n) => !defined.has(n));
      if (missing) {
        setVerdict({ ok: false, msg: `“${line.code.trim()}” can't go there — ${MSG[missing]}.` });
        return;
      }
      if (line.defines) defined.add(line.defines);
    }
    setVerdict({ ok: true, msg: "Both roads paved — whichever way the condition falls, the program knows what to say. The voting checker works!" });
    setSolved(true);
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The forge takes scattered metal and hammers it into shape. Below is a working voting-eligibility
        checker — with its lines scrambled. Use ↑↓ to rebuild it. New law this module: indented lines
        belong to the <em>if</em> or <em>else</em> above them, so structure matters as much as lockers. ⚒️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
        {order.map((li, idx) => (
          <div key={li} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "4px 6px", borderRadius: 8,
            background: solved ? C.green + "10" : C.surface, border: `1px solid ${solved ? C.green + "55" : C.border}`,
            marginBottom: 6,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <button onClick={() => move(idx, -1)} disabled={solved || idx === 0} style={{
                border: "none", background: "transparent", color: idx === 0 ? C.border : C.orange,
                cursor: idx === 0 || solved ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: 2,
              }}>▲</button>
              <button onClick={() => move(idx, 1)} disabled={solved || idx === order.length - 1} style={{
                border: "none", background: "transparent", color: idx === order.length - 1 ? C.border : C.orange,
                cursor: idx === order.length - 1 || solved ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: 2,
              }}>▼</button>
            </div>
            <pre style={{ ...mono, fontSize: 12.5 }}>{target[li].code}</pre>
          </div>
        ))}
      </div>

      {!solved && (
        <button onClick={check} style={{
          padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none",
          color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>⚒️ Strike! (check my order)</button>
      )}

      {verdict && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 12.5, lineHeight: 1.6, background: verdict.ok ? C.green + "14" : C.yellow + "14", border: `1px solid ${verdict.ok ? C.green : C.yellow}44`, color: verdict.ok ? C.green : C.muted }}>
          {verdict.ok ? "✓ " : "💡 "}{verdict.msg}
        </div>
      )}

      {solved && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12,
        }}>⚒️ Forged! Now temper the blade →</button>
      )}
    </div>
  );
}

// ── Stage 4: Temper — write real Python, run via Pyodide ──
function TemperStage({ onPass }) {
  const TESTS = [
    { pre: "n = 7\n", expect: "positive", label: "n = 7 → positive" },
    { pre: "n = -3\n", expect: "negative", label: "hidden n → negative" },
    { pre: "n = 0\n", expect: "zero", label: "hidden n → zero" },
  ];
  const [code, setCode] = useState("# your code here\n");
  const [status, setStatus] = useState("idle"); // idle | loading | running | passed | failed | error | fallback
  const [message, setMessage] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const pyRef = useRef(null);
  const hints = [
    "Three possible answers means three branches: if … elif … else.",
    "if n > 0: print(\"positive\") — then elif n < 0 for negative, and else covers zero. Print ONLY the word.",
  ];

  async function getPyodide() {
    if (pyRef.current) return pyRef.current;
    if (window.__crucible_pyodide) { pyRef.current = window.__crucible_pyodide; return pyRef.current; }
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    const py = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
    window.__crucible_pyodide = py; pyRef.current = py;
    return py;
  }

  async function run() {
    setStatus("loading");
    setMessage("Heating the forge… (first run downloads real Python, ~6 MB — be patient!)");
    let py;
    try { py = await getPyodide(); }
    catch {
      setStatus("fallback");
      setMessage("Couldn't load the Python engine (slow connection?). No problem — pass the fallback puzzle below instead.");
      return;
    }
    setStatus("running"); setMessage("Running your code against the tests…");
    try {
      for (const t of TESTS) {
        py.runPython("import sys, io\nsys.stdout = io.StringIO()");
        try {
          py.runPython(t.pre + "\n" + code);
        } catch (e) {
          const lines = String(e.message || e).trim().split("\n");
          setStatus("error");
          setMessage("Python error:\n" + lines[lines.length - 1]);
          return;
        }
        const out = py.runPython("sys.stdout.getvalue()");
        if (String(out).trim() !== t.expect) {
          setStatus("failed");
          setMessage(`Test "${t.label}" — expected exactly:\n${t.expect}\nyour output:\n${String(out).trim() || "(nothing printed)"}`);
          setHintCount((h) => Math.min(h + 1, hints.length));
          return;
        }
      }
      setStatus("passed");
      setMessage("All three tests passed — including the hidden ones. Your branches cover every road.");
    } catch (e) {
      setStatus("error"); setMessage("Unexpected error: " + String(e));
    }
  }

  // Fallback mini-Parsons (used only if Pyodide can't load)
  const fbTarget = [
    { code: "if n > 0:", defines: "if_open", needs: [] },
    { code: '    print("positive")', defines: "if_body", needs: ["if_open"] },
    { code: "elif n < 0:", defines: "elif_open", needs: ["if_body"] },
    { code: '    print("negative")', defines: "elif_body", needs: ["elif_open"] },
    { code: "else:", defines: "else_open", needs: ["elif_body"] },
    { code: '    print("zero")', defines: null, needs: ["else_open"] },
  ];
  const [fbOrder, setFbOrder] = useState([2, 5, 0, 3, 1, 4]);
  const [fbSolved, setFbSolved] = useState(false);
  const fbMove = (idx, dir) => {
    const j = idx + dir;
    if (j < 0 || j >= fbOrder.length || fbSolved) return;
    const next = [...fbOrder];
    [next[idx], next[j]] = [next[j], next[idx]];
    setFbOrder(next);
  };
  const fbCheck = () => {
    const defined = new Set();
    for (const li of fbOrder) {
      if (fbTarget[li].needs.find((n) => !defined.has(n))) return;
      if (fbTarget[li].defines) defined.add(fbTarget[li].defines);
    }
    setFbSolved(true);
  };

  const passed = status === "passed" || fbSolved;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The final tempering: no options, no scaffolding — <strong style={{ color: C.text }}>write real
        Python</strong>, and it runs, for real, right here. 🗡️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.orange}55`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>📜 YOUR TASK</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
          A variable is already set for you: <code style={{ color: C.teal }}>n = 7</code>. Write code that
          prints exactly <code style={{ color: C.teal }}>positive</code> if n is greater than 0,{" "}
          <code style={{ color: C.teal }}>negative</code> if it's less than 0, and{" "}
          <code style={{ color: C.teal }}>zero</code> otherwise. Your code is then re-run with different
          hidden values of n — so every branch must actually work!
        </div>
      </div>

      {status !== "fallback" && (
        <>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} rows={7} style={{
            width: "100%", boxSizing: "border-box", background: "#010409", color: C.text,
            border: `1.5px solid ${C.border}`, borderRadius: 10, padding: 12,
            fontFamily: "monospace", fontSize: 13.5, lineHeight: 1.7, outline: "none", resize: "vertical",
          }} />
          <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
            <button onClick={run} disabled={status === "loading" || status === "running"} style={{
              padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 14,
              background: status === "loading" || status === "running" ? C.card : C.green,
              color: status === "loading" || status === "running" ? C.muted : "#0D1117",
              cursor: status === "loading" || status === "running" ? "default" : "pointer",
            }}>{status === "loading" || status === "running" ? "⏳ Working…" : "▶ Run the tests"}</button>
            {status === "passed" && <span style={{ color: C.green, fontWeight: 700, fontSize: 13 }}>✓ 3/3 tests passed</span>}
          </div>
        </>
      )}

      {message && (
        <pre style={{
          ...mono, marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 12.5,
          background: status === "passed" ? C.green + "14" : status === "failed" || status === "error" ? C.red + "10" : C.card,
          border: `1px solid ${status === "passed" ? C.green : status === "failed" || status === "error" ? C.red + "66" : C.border}`,
          color: status === "passed" ? C.green : C.muted,
        }}>{message}</pre>
      )}

      {(status === "failed" || status === "error") && hintCount > 0 && (
        <Hints hints={hints} shown={hintCount} onMore={() => setHintCount((h) => Math.min(h + 1, hints.length))} />
      )}

      {status === "fallback" && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginTop: 4 }}>
          {fbOrder.map((li, idx) => (
            <div key={li} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 6px", borderRadius: 8, background: C.surface, border: `1px solid ${fbSolved ? C.green + "55" : C.border}`, marginBottom: 6 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <button onClick={() => fbMove(idx, -1)} style={{ border: "none", background: "transparent", color: C.orange, cursor: "pointer", fontSize: 12, padding: 2 }}>▲</button>
                <button onClick={() => fbMove(idx, 1)} style={{ border: "none", background: "transparent", color: C.orange, cursor: "pointer", fontSize: 12, padding: 2 }}>▼</button>
              </div>
              <pre style={{ ...mono, fontSize: 12.5 }}>{fbTarget[li].code}</pre>
            </div>
          ))}
          {!fbSolved && <button onClick={fbCheck} style={{ padding: "8px 18px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Check order</button>}
          {fbSolved && <div style={{ color: C.green, fontWeight: 700, fontSize: 13, marginTop: 6 }}>✓ Correct order — tempered the old-fashioned way!</div>}
        </div>
      )}

      {passed && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12,
        }}>🗡️ Tempered! Claim your badge →</button>
      )}
    </div>
  );
}

// ── Badge screen ──
// onUnitComplete unloads the lesson, so the badge must be SEEN first
// and claimed with a button — never auto-fired.
function BadgeScreen({ claimed, onClaim }) {
  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 64 }}>🔥</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.orange, marginTop: 8 }}>TEMPERED IN THE M5 CRUCIBLE</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 480, margin: "10px auto 0" }}>
        Traced state like a debugger. Caught a bug that never even crashed. Rebuilt an if/else from
        scattered lines. And wrote branching Python that survived hidden tests. Module 5's decisions
        aren't just learned — they're <em>forged into skill</em>.
      </div>
      <div style={{
        marginTop: 20, padding: 20, borderRadius: 12, display: "inline-block",
        background: `linear-gradient(135deg, ${C.orange}22, ${C.red}22)`,
        border: `1px solid ${C.orange}66`,
      }}>
        <div style={{ fontSize: 32 }}>🏅</div>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginTop: 6 }}>Crucible Badge · Module 5</div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Spark ✓ · Flame ✓ · Forge ✓ · Temper ✓</div>
      </div>
      <div style={{ color: C.muted, fontSize: 13, marginTop: 18 }}>
        The <strong style={{ color: C.orange }}>M6 Crucible</strong> waits at the end of Repetition. 🔥
      </div>
      {!claimed && (
        <button onClick={onClaim} style={{
          marginTop: 20, padding: "12px 28px", borderRadius: 10, border: "none",
          background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
        }}>🏅 Claim the badge (records completion)</button>
      )}
    </div>
  );
}

// ── Main ──
export default function Unit5_C({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
  const persisted = STAGES.filter((s) => challengeProgress.includes(`${UNIT_ID}@${s.id}`)).map((s) => s.id);
  const [doneStages, setDoneStages] = useState(persisted);
  const [active, setActive] = useState(() => {
    const firstOpen = STAGES.findIndex((s) => !persisted.includes(s.id));
    return firstOpen === -1 ? STAGES.length : firstOpen; // length = badge view
  });

  const isUnlocked = (idx) => idx === 0 || doneStages.includes(STAGES[idx - 1].id);

  const [claimed, setClaimed] = useState(challengeProgress.includes(UNIT_ID));

  const passStage = (idx) => {
    const stage = STAGES[idx];
    if (!doneStages.includes(stage.id)) {
      setDoneStages((p) => [...p, stage.id]);
      onStageComplete && onStageComplete(`${UNIT_ID}@${stage.id}`);
    }
    setActive(idx + 1);
  };

  const claimBadge = () => {
    setClaimed(true);
    onUnitComplete && onUnitComplete();
  };

  const stageBody = [
    <SparkStage key="s" onPass={() => passStage(0)} />,
    <FlameStage key="f" onPass={() => passStage(1)} />,
    <ForgeStage key="g" onPass={() => passStage(2)} />,
    <TemperStage key="t" onPass={() => passStage(3)} />,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.orange}44`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.orange}, ${C.red})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔥</div>
        <div>
          <div style={{ fontSize: 12, color: C.orange, letterSpacing: 1, fontWeight: 700 }}>MODULE 5 › THE CRUCIBLE</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Where knowledge is forged into skill</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{doneStages.length} / {STAGES.length} stages</div>
      </div>

      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(doneStages.length / STAGES.length) * 100}%`, background: `linear-gradient(90deg, ${C.orange}, ${C.red})`, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ background: C.orange + "10", border: `1px solid ${C.orange}33`, borderRadius: 10, padding: "10px 16px", marginBottom: 18, fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
          ⚔️ <strong style={{ color: C.orange }}>Bonus challenge — completely optional.</strong> Your lesson
          progress is already safe. But stages unlock one by one, hints replace answers, and only the
          worthy earn the badge. Ready?
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {STAGES.map((s, i) => {
            const done = doneStages.includes(s.id);
            const unlocked = isUnlocked(i);
            const isActive = active === i;
            return (
              <button key={s.id} onClick={() => unlocked && setActive(i)} disabled={!unlocked} style={{
                flex: 1, minWidth: 100, padding: "10px 6px", borderRadius: 7,
                background: isActive ? `linear-gradient(135deg, ${C.orange}, ${C.red})` : "transparent",
                border: "none", color: isActive ? "#0D1117" : unlocked ? C.text : C.muted,
                cursor: unlocked ? "pointer" : "not-allowed", fontSize: 12,
                fontWeight: isActive ? 800 : 500, opacity: unlocked ? 1 : 0.5,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2, transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 15 }}>{done ? "✅" : unlocked ? s.icon : "🔒"}</span>
                <span>{s.label}</span>
                <span style={{ fontSize: 9.5, opacity: 0.8 }}>{s.tag}</span>
              </button>
            );
          })}
        </div>

        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
          {active >= STAGES.length
            ? <BadgeScreen claimed={claimed} onClaim={claimBadge} />
            : isUnlocked(active)
              ? stageBody[active]
              : <div style={{ textAlign: "center", color: C.muted, padding: 40 }}>🔒 Locked — pass the previous stage first.</div>}
        </div>
      </div>
    </div>
  );
}
