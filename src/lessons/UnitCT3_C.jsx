// UnitCT3_C — 🔥 The Crucible: Computational Thinking III (recursion)
// Drills base/recursive cases, the call stack, and self-similar problems.
// Temper asks the student to DEFINE a recursive function; hidden tests call it.
import { useState, useRef } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const UNIT_ID = "UnitCT3_C";
const STAGES = [
  { id: "spark", label: "Spark", icon: "✨", tag: "Predict, Trace & Spot" },
  { id: "flame", label: "Flame", icon: "🔥", tag: "Recursion Bugs" },
  { id: "forge", label: "Forge", icon: "⚒️", tag: "Assemble the Recursion" },
  { id: "temper", label: "Temper", icon: "🗡️", tag: "Write Real Python" },
];

const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };

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

// ── Stage 1: Spark ──
function SparkStage({ onPass }) {
  const questions = [
    {
      kind: "mcq",
      code: "def power(b, e):\n    if e == 0:\n        return 1\n    return b * power(b, e - 1)\n\nprint(power(2, 3))",
      options: ["6", "8", "9", "1"],
      answer: 1,
      hints: ["power(2,3) = 2 * power(2,2) = 2 * 2 * power(2,1)...", "It multiplies three 2's together."],
      why: "power(2,3) unwinds to 2 * 2 * 2 * 1 = 8. The base case power(2,0) returns 1, then the frames multiply back up.",
    },
    {
      kind: "trace",
      code: "def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(123))",
      expect: "6",
      prompt: "Trace the recursion: what does digit_sum(123) print?",
      hints: ["It peels 3, then 2, then 1 with n % 10, adding each.", "1 + 2 + 3."],
      why: "digit_sum peels 3 + digit_sum(12) → 3 + 2 + digit_sum(1) → 3 + 2 + 1 + digit_sum(0)=0 → 6.",
    },
    {
      kind: "lie",
      code: "# general facts about recursion",
      claims: [
        "Every recursive function needs a base case, or it never stops.",
        "In factorial, the multiplications happen as the stack unwinds on the way back up.",
        "Recursion doesn't use the call stack — it avoids it entirely.",
      ],
      lieIndex: 2,
      hints: ["How does Python remember all the paused calls?", "Each recursive call pushes a NEW frame onto the call stack (Unit 8.3)."],
      why: "Claims 1 and 2 are true. The lie: recursion depends ENTIRELY on the call stack — each call adds a frame, which is why deep recursion can overflow it.",
    },
  ];
  const [solved, setSolved] = useState([]);
  const [picked, setPicked] = useState({});
  const [typed, setTyped] = useState({});
  const [typedWrong, setTypedWrong] = useState({});
  const [hintCount, setHintCount] = useState({});

  const bumpHint = (qi) => setHintCount((h) => ({ ...h, [qi]: Math.min((h[qi] || 0) + 1, questions[qi].hints.length) }));

  const pick = (qi, oi) => {
    if (solved.includes(qi)) return;
    const q = questions[qi];
    const correct = q.kind === "lie" ? oi === q.lieIndex : oi === q.answer;
    if (correct) { setSolved((s) => [...s, qi]); setPicked((p) => ({ ...p, [qi]: null })); }
    else { setPicked((p) => ({ ...p, [qi]: oi })); bumpHint(qi); }
  };
  const checkTyped = (qi) => {
    if (solved.includes(qi)) return;
    if ((typed[qi] || "").trim() === questions[qi].expect) { setSolved((s) => [...s, qi]); setTypedWrong((w) => ({ ...w, [qi]: false })); }
    else { setTypedWrong((w) => ({ ...w, [qi]: true })); bumpHint(qi); }
  };

  const allDone = solved.length === questions.length;
  const tagFor = (q) => (q.kind === "trace" ? " · TRACE IT" : q.kind === "lie" ? " · SPOT THE LIE" : "");

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Warm up: predict a recursive power, trace a digit-sum, and spot the false claim about the call stack. ✨
      </p>

      {questions.map((q, qi) => {
        const isSolved = solved.includes(qi);
        return (
          <div key={qi} style={{ background: C.card, border: `1.5px solid ${isSolved ? C.green : C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>CHALLENGE {qi + 1} OF 3{tagFor(q)}</span>
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
                      padding: "8px 16px", borderRadius: 8, fontFamily: "monospace", fontSize: 12.5,
                      background: bg, border: `1.5px solid ${border}`, color: col, textAlign: "left",
                      cursor: isSolved ? "default" : "pointer", transition: "all 0.2s",
                    }}>{opt}</button>
                  );
                })}
              </div>
            )}

            {q.kind === "lie" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.claims.map((cl, oi) => {
                  let bg = C.surface, border = C.border, col = C.text;
                  if (isSolved && oi === q.lieIndex) { bg = C.red + "18"; border = C.red; col = C.red; }
                  else if (isSolved) { bg = C.green + "10"; border = C.green + "55"; col = C.muted; }
                  else if (picked[qi] === oi) { bg = C.yellow + "14"; border = C.yellow; col = C.yellow; }
                  return (
                    <button key={oi} onClick={() => pick(qi, oi)} style={{
                      textAlign: "left", padding: "9px 14px", borderRadius: 8, fontSize: 13, lineHeight: 1.5,
                      background: bg, border: `1.5px solid ${border}`, color: col,
                      cursor: isSolved ? "default" : "pointer",
                    }}>{isSolved && oi === q.lieIndex ? "🤥 " : isSolved ? "✓ " : ""}{cl}</button>
                  );
                })}
              </div>
            )}

            {q.kind === "trace" && (
              <div>
                <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 8 }}>{q.prompt}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input value={typed[qi] || ""} onChange={(e) => setTyped((t) => ({ ...t, [qi]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && checkTyped(qi)} disabled={isSolved} spellCheck={false}
                    style={{ width: 120, padding: "8px 12px", borderRadius: 8, fontFamily: "monospace", fontSize: 14, background: "#010409", color: isSolved ? C.green : C.text, outline: "none", border: `1.5px solid ${isSolved ? C.green : typedWrong[qi] ? C.red : C.border}` }} />
                  {!isSolved && <button onClick={() => checkTyped(qi)} style={{ padding: "8px 18px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Check</button>}
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
        <button onClick={onPass} style={{ width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none", color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>✨ Spark caught! Light the Flame →</button>
      )}
    </div>
  );
}

// ── Stage 2: Flame ──
function FlameStage({ onPass }) {
  const bugs = [
    {
      intro: "This should print 3, 2, 1 and stop — instead it crashes with RecursionError. Click the buggy line.",
      lines: ["def countdown(n):", "    print(n)", "    countdown(n - 1)", "", "countdown(3)"],
      buggyLine: 2,
      lineHints: {
        0: "The header is fine.",
        1: "Printing n is correct.",
        4: "Calling countdown(3) is fine — the crash is inside the function.",
      },
      fixes: ["Add  if n == 0: return  before the recursive call (a base case)", "Change print(n) to print(n + 1)", "Call countdown(3) only once"],
      fixAnswer: 0,
      fixHints: ["Nothing ever stops the recursion — n goes 3, 2, 1, 0, -1, -2… forever.", "Every recursion needs a base case. Add  if n == 0: return  so it halts."],
      why: "There's no base case, so countdown keeps calling itself past 0 forever until the stack overflows. Adding  if n == 0: return  gives it a stopping point.",
    },
    {
      intro: "This factorial should give 24 but crashes with RecursionError. Click the buggy line.",
      lines: ["def fact(n):", "    if n == 0:", "        return 1", "    return n * fact(n)", "", "print(fact(4))"],
      buggyLine: 3,
      lineHints: {
        1: "The base-case check is correct.",
        2: "Returning 1 for n == 0 is right.",
        5: "Calling fact(4) is fine.",
      },
      fixes: ["return n * fact(n - 1)  (shrink toward the base case)", "return n * fact(n + 1)", "change n == 0 to n == 1"],
      fixAnswer: 0,
      fixHints: ["fact(n) calls fact(n) again with the SAME n — it never gets closer to 0.", "The recursive call must shrink the input: fact(n - 1)."],
      why: "fact(n) recurses on the same n, so the base case is never reached. It must call fact(n - 1) to march toward n == 0.",
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
    if (i === b.buggyLine) { setFoundLine(true); setWrongLine(null); } else setWrongLine(i);
  };
  const pickFix = (i) => { if (solvedThis) return; setFixPicked(i); if (i !== b.fixAnswer) setHintCount((h) => Math.min(h + 1, b.fixHints.length)); };
  const nextBug = () => {
    setFixedCount((n) => n + 1);
    if (cur < bugs.length - 1) { setCur(cur + 1); setFoundLine(false); setWrongLine(null); setFixPicked(null); setHintCount(0); }
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Two recursion killers: no base case, and a call that never shrinks. Bug
        {" "}{Math.min(fixedCount + 1, bugs.length)} of {bugs.length}. 🔥
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
                minHeight: l === "" ? 14 : undefined,
              }}>{i + 1}  {l}</div>
            );
          })}
        </div>
        {wrongLine !== null && !foundLine && (
          <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: C.yellow + "14", border: `1px solid ${C.yellow}44`, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
            💡 {b.lineHints[wrongLine] || "Not that one — keep hunting!"}
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
                    background: bg, border: `1.5px solid ${border}`, color: col, cursor: solvedThis ? "default" : "pointer",
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
        <button onClick={nextBug} style={{ padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Next bug →</button>
      )}
      {solvedThis && cur === bugs.length - 1 && (
        <button onClick={onPass} style={{ width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none", color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>🔥 Both bugs extinguished! To the Forge →</button>
      )}
    </div>
  );
}

// ── Stage 3: Forge — assemble a recursive sum ──
function ForgeStage({ onPass }) {
  const target = [
    { code: "def sum_to(n):", defines: "def_open", needs: [] },
    { code: "    if n == 0:", defines: "base_open", needs: ["def_open"] },
    { code: "        return 0", defines: "base_ret", needs: ["base_open"] },
    { code: "    return n + sum_to(n - 1)", defines: "rec", needs: ["base_ret"] },
    { code: "print(sum_to(4))", defines: null, needs: ["rec"] },
  ];
  const MSG = {
    def_open: "the body lines have no function to belong to — the def header must come first",
    base_open: "return 0 is the base case's body — its  if n == 0:  must open above it",
    base_ret: "the recursive line and the base case share the function; write the base case's return first",
    rec: "you can't call sum_to and print before the function is fully defined",
  };
  const shuffled = [3, 0, 4, 1, 2];
  const [order, setOrder] = useState(shuffled);
  const [verdict, setVerdict] = useState(null);
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
      if (missing) { setVerdict({ ok: false, msg: `“${line.code.trim()}” can't go there — ${MSG[missing]}.` }); return; }
      if (line.defines) defined.add(line.defines);
    }
    setVerdict({ ok: true, msg: "def → base case (if n==0: return 0) → recursive case (n + sum_to(n-1)) → call it. sum_to(4) = 4+3+2+1+0 = 10. A recursion, forged." });
    setSolved(true);
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Assemble a recursive <code style={{ color: C.teal }}>sum_to(n)</code> that adds 0 + 1 + … + n. Use ↑↓. The
        base case comes before the recursive case, and the body belongs under the def. ⚒️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
        {order.map((li, idx) => (
          <div key={li} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 6px", borderRadius: 8, background: solved ? C.green + "10" : C.surface, border: `1px solid ${solved ? C.green + "55" : C.border}`, marginBottom: 6 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <button onClick={() => move(idx, -1)} disabled={solved || idx === 0} style={{ border: "none", background: "transparent", color: idx === 0 ? C.border : C.orange, cursor: idx === 0 || solved ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: 2 }}>▲</button>
              <button onClick={() => move(idx, 1)} disabled={solved || idx === order.length - 1} style={{ border: "none", background: "transparent", color: idx === order.length - 1 ? C.border : C.orange, cursor: idx === order.length - 1 || solved ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: 2 }}>▼</button>
            </div>
            <pre style={{ ...mono, fontSize: 12.5 }}>{target[li].code}</pre>
          </div>
        ))}
      </div>

      {!solved && (
        <button onClick={check} style={{ padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>⚒️ Strike! (check my order)</button>
      )}

      {verdict && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 12.5, lineHeight: 1.6, background: verdict.ok ? C.green + "14" : C.yellow + "14", border: `1px solid ${verdict.ok ? C.green : C.yellow}44`, color: verdict.ok ? C.green : C.muted }}>
          {verdict.ok ? "✓ " : "💡 "}{verdict.msg}
        </div>
      )}

      {solved && (
        <button onClick={onPass} style={{ width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none", color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12 }}>⚒️ Forged! Now temper the blade →</button>
      )}
    </div>
  );
}

// ── Stage 4: Temper — DEFINE a recursive function; tests call it ──
function TemperStage({ onPass }) {
  const TESTS = [
    { pre: "", post: "\nprint(sum_to(5))", expect: "15", label: "sum_to(5) → 15" },
    { pre: "", post: "\nprint(sum_to(1))", expect: "1", label: "hidden: sum_to(1) → 1 (near the base case)" },
    { pre: "", post: "\nprint(sum_to(3) + 10)", expect: "16", label: "hidden: your RETURN value is used in math" },
  ];
  const [code, setCode] = useState("# define a recursive sum_to(n)\n# it returns 0 + 1 + ... + n\n");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const pyRef = useRef(null);
  const hints = [
    "def sum_to(n): with a base case  if n == 0: return 0.",
    "return n + sum_to(n - 1) — RETURN it (the third test does math with your return value), and shrink n by 1 each call.",
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
    catch { setStatus("fallback"); setMessage("Couldn't load the Python engine (slow connection?). No problem — pass the fallback puzzle below instead."); return; }
    setStatus("running"); setMessage("Running your code against the tests…");
    try {
      for (const t of TESTS) {
        py.runPython("import sys, io\nsys.stdout = io.StringIO()");
        try { py.runPython(t.pre + code + t.post); }
        catch (e) {
          const lines = String(e.message || e).trim().split("\n");
          setStatus("error"); setMessage(`Test "${t.label}" — Python error:\n` + lines[lines.length - 1]);
          setHintCount((h) => Math.min(h + 1, hints.length)); return;
        }
        const out = py.runPython("sys.stdout.getvalue()");
        if (String(out).trim() !== t.expect) {
          setStatus("failed");
          setMessage(`Test "${t.label}" — expected exactly:\n${t.expect}\nyour output:\n${String(out).trim() || "(nothing printed)"}`);
          setHintCount((h) => Math.min(h + 1, hints.length)); return;
        }
      }
      setStatus("passed");
      setMessage("All three tests passed. Unseen code called your recursive sum_to and even did math with its return — a recursion that holds.");
    } catch (e) { setStatus("error"); setMessage("Unexpected error: " + String(e)); }
  }

  const fbTarget = [
    { code: "def sum_to(n):", defines: "def_open", needs: [] },
    { code: "    if n == 0:", defines: "base_open", needs: ["def_open"] },
    { code: "        return 0", defines: "base_ret", needs: ["base_open"] },
    { code: "    return n + sum_to(n - 1)", defines: "rec", needs: ["base_ret"] },
    { code: "print(sum_to(5))", defines: null, needs: ["rec"] },
  ];
  const [fbOrder, setFbOrder] = useState([3, 0, 4, 1, 2]);
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
        The final tempering: write a whole <strong style={{ color: C.text }}>recursive function</strong> from
        scratch. The hidden tests will call it and do math with its return. 🗡️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.orange}55`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>📜 YOUR TASK</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
          Define a recursive function <code style={{ color: C.teal }}>sum_to(n)</code> that <strong style={{ color: C.text }}>returns</strong>{" "}
          0 + 1 + 2 + … + n. Give it a base case (n == 0 → 0) and a recursive case that shrinks n. Return, don't print.
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
        <button onClick={onPass} style={{ width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none", color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12 }}>🗡️ Tempered! Claim your badge →</button>
      )}
    </div>
  );
}

// ── Badge screen ──
function BadgeScreen({ claimed, onClaim }) {
  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 64 }}>🔥</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.orange, marginTop: 8 }}>TEMPERED IN THE CT-III CRUCIBLE</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 480, margin: "10px auto 0" }}>
        Predicted a recursive power, traced a digit-sum, saw that recursion lives on the call stack. Caught the
        missing-base-case and never-shrinks bugs. Assembled a recursion, then wrote one from scratch that unseen
        code called and computed with. Recursive thinking, <em>forged into skill</em>.
      </div>
      <div style={{ marginTop: 20, padding: 20, borderRadius: 12, display: "inline-block", background: `linear-gradient(135deg, ${C.orange}22, ${C.red}22)`, border: `1px solid ${C.orange}66` }}>
        <div style={{ fontSize: 32 }}>🏅</div>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginTop: 6 }}>Crucible Badge · Computational Thinking III</div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Spark ✓ · Flame ✓ · Forge ✓ · Temper ✓</div>
      </div>
      <div style={{ color: C.muted, fontSize: 13, marginTop: 18, lineHeight: 1.7 }}>
        You can now think in loops AND in recursion. The whole computational-thinking arc is complete — next, back
        to the language: <strong style={{ color: C.orange }}>Module 9 — When Things Go Wrong</strong> (exceptions &amp; files). 🔥
      </div>
      {!claimed && (
        <button onClick={onClaim} style={{ marginTop: 20, padding: "12px 28px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${C.orange}, ${C.red})`, color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>🏅 Claim the badge (records completion)</button>
      )}
    </div>
  );
}

// ── Main ──
export default function UnitCT3_C({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
  const persisted = STAGES.filter((s) => challengeProgress.includes(`${UNIT_ID}@${s.id}`)).map((s) => s.id);
  const [doneStages, setDoneStages] = useState(persisted);
  const [active, setActive] = useState(() => {
    const firstOpen = STAGES.findIndex((s) => !persisted.includes(s.id));
    return firstOpen === -1 ? STAGES.length : firstOpen;
  });

  const isUnlocked = (idx) => idx === 0 || doneStages.includes(STAGES[idx - 1].id);
  const [claimed, setClaimed] = useState(challengeProgress.includes(UNIT_ID));

  const passStage = (idx) => {
    const stage = STAGES[idx];
    if (!doneStages.includes(stage.id)) { setDoneStages((p) => [...p, stage.id]); onStageComplete && onStageComplete(`${UNIT_ID}@${stage.id}`); }
    setActive(idx + 1);
  };
  const claimBadge = () => { setClaimed(true); onUnitComplete && onUnitComplete(); };

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
          <div style={{ fontSize: 12, color: C.orange, letterSpacing: 1, fontWeight: 700 }}>COMPUTATIONAL THINKING III › THE CRUCIBLE</div>
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
          progress is already safe. But stages unlock one by one, hints replace answers, and only the worthy
          earn the badge. Forge your recursion skills. Ready?
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
