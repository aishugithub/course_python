// Unit9_C — 🔥 The Crucible: Module 9 (When Things Go Wrong)
// Exceptions + files. Temper asks students to DEFINE a safe function that
// catches an error and RETURNS a fallback; hidden tests call it (t.post).
import { useState, useRef } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const UNIT_ID = "Unit9_C";
const STAGES = [
  { id: "spark", label: "Spark", icon: "✨", tag: "Predict, Trace & Spot" },
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

// ── Stage 1: Spark — predict / trace-the-state / spot-the-lie ──
function SparkStage({ onPass }) {
  const questions = [
    {
      kind: "mcq",
      code: 'try:\n    print(int("12"))\n    print(int("oops"))\n    print("done")\nexcept ValueError:\n    print("caught")',
      options: ["12\ncaught", "12\noops\ndone", "caught", "12\ncaught\ndone"],
      answer: 0,
      hints: ["int(\"12\") works and prints 12. What does int(\"oops\") do next?", "The exception on line 3 abandons the rest of try — 'done' never prints. Python jumps to except."],
      why: "Line 2 prints 12; line 3 raises ValueError, so the rest of the try (including \"done\") is skipped and except prints \"caught\". Output: 12, caught.",
    },
    {
      kind: "trace",
      code: "def safe_div(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return -1\n\nprint(safe_div(10, 2) + safe_div(9, 0))",
      expect: "4.0",
      prompt: "Trace both calls and the maths: what number is printed? Type it below.",
      hints: ["safe_div(10, 2) returns a normal division result (a float).", "safe_div(9, 0) hits ZeroDivisionError → the except returns -1. Now add the two."],
      why: "safe_div(10, 2) → 5.0; safe_div(9, 0) raises ZeroDivisionError, caught, returns -1. 5.0 + (-1) = 4.0.",
    },
    {
      kind: "lie",
      code: 'with open("data.txt", "w") as f:\n    f.write("hi")',
      claims: [
        "After this block ends, the file is automatically closed.",
        'If data.txt already existed, mode "w" erased its old contents first.',
        'The text "hi" was written with a newline at the end automatically.',
      ],
      lieIndex: 2,
      hints: ["Two of these are things you saw in Unit 9.3. Which one is about what write() does for you?", "write() writes EXACTLY the string you give it — no extra newline. You add \\n yourself."],
      why: "Claims 1 and 2 are true (with auto-closes; \"w\" overwrites). The lie: write() adds NO newline — \"hi\" is written with nothing after it unless you include \\n.",
    },
  ];
  const [solved, setSolved] = useState([]);
  const [picked, setPicked] = useState({});
  const [typed, setTyped] = useState({});
  const [typedWrong, setTypedWrong] = useState({});
  const [hintCount, setHintCount] = useState({});

  const bumpHint = (qi) =>
    setHintCount((h) => ({ ...h, [qi]: Math.min((h[qi] || 0) + 1, questions[qi].hints.length) }));

  const pick = (qi, oi) => {
    if (solved.includes(qi)) return;
    const q = questions[qi];
    const correct = q.kind === "lie" ? oi === q.lieIndex : oi === q.answer;
    if (correct) {
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
  const tagFor = (q) => (q.kind === "trace" ? " · TRACE IT" : q.kind === "lie" ? " · SPOT THE LIE" : "");

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Warm up: predict what a try/except prints, trace an error through a function's return, and spot the
        false claim about files. ✨
      </p>

      {questions.map((q, qi) => {
        const isSolved = solved.includes(qi);
        return (
          <div key={qi} style={{ background: C.card, border: `1.5px solid ${isSolved ? C.green : C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
                CHALLENGE {qi + 1} OF 3{tagFor(q)}
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
                      padding: "8px 16px", borderRadius: 8, fontFamily: "monospace", fontSize: 12.5,
                      background: bg, border: `1.5px solid ${border}`, color: col, whiteSpace: "pre-wrap", textAlign: "left",
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
      intro: "This should print a friendly message when the user types letters — instead it still crashes with ValueError. Click the line where the bug LIVES.",
      lines: ['raw = "abc"', "try:", "    n = int(raw)", "except ZeroDivisionError:", '    print("Please type a number")'],
      buggyLine: 3,
      lineHints: {
        0: "The input line is fine — bad data is exactly what we're testing.",
        1: "try: is correct — it's guarding the risky line below.",
        2: "This is the line that RAISES the error, but the raising is expected. The question is whether it gets caught.",
        4: "The message is fine — the problem is it never runs, because the except above never matches.",
      },
      fixes: ["except ValueError:", "except:  # catch everything", "try ZeroDivisionError instead"],
      fixAnswer: 0,
      fixHints: ["int(\"abc\") raises ValueError — but the except names a DIFFERENT type.", "You catch by exact type. except ZeroDivisionError can't catch a ValueError, so it sails past uncaught. Name the type you actually expect."],
      why: "int(\"abc\") raises ValueError, but the handler catches ZeroDivisionError — a mismatch, so nothing is caught and it crashes. except ValueError catches the real error.",
    },
    {
      intro: "This should ADD a new line to a log that already has old entries — instead every run leaves the file with only the newest line. Click the buggy line.",
      lines: ['entry = "login ok"', 'with open("log.txt", "w") as f:', '    f.write(entry + "\\n")'],
      buggyLine: 1,
      lineHints: {
        0: "Building the entry string is fine.",
        2: "The write itself is correct — including the \\n so entries stay on separate lines.",
      },
      fixes: ['with open("log.txt", "a") as f:', 'with open("log.txt", "r") as f:', "remove the newline"],
      fixAnswer: 0,
      fixHints: ["Mode \"w\" does something drastic to an existing file the instant it opens.", "\"w\" erases the file every run, so only the last write survives. To keep old lines and add to the end, use \"a\" (append)."],
      why: 'Mode "w" wipes the file on open, so each run starts blank and keeps only the newest line. Mode "a" appends — old entries stay and the new one is added at the end.',
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
        Two classic Module 9 bugs: catching the wrong exception type, and the file mode that silently eats your
        data. Bug {Math.min(fixedCount + 1, bugs.length)} of {bugs.length}. 🔥
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

// ── Stage 3: Forge — Parsons: assemble a robust file-saving program ──
function ForgeStage({ onPass }) {
  const target = [
    { code: "def save(filename, marks):", defines: "def_open", needs: [] },
    { code: '    with open(filename, "w") as f:', defines: "withopen", needs: ["def_open"] },
    { code: "        for name in marks:", defines: "loop", needs: ["withopen"] },
    { code: '            f.write(name + "," + str(marks[name]) + "\\n")', defines: "def_done", needs: ["loop"] },
    { code: 'scores = {"Asha": 85, "Ravi": 72}', defines: "scores", needs: [] },
    { code: 'save("marks.csv", scores)', defines: null, needs: ["def_done", "scores"] },
  ];
  const MSG = {
    def_open: "there's no def above it to belong to — indented lines need their function header first",
    withopen: "you can't loop and write inside a file that hasn't been opened yet",
    loop: "the write line walks each name — but the for loop must come first",
    def_done: "you can't CALL save before its def (and full body) exists",
    scores: "the dict scores doesn't exist yet — build it before you pass it to save()",
  };
  const shuffled = [3, 5, 0, 2, 4, 1]; // fixed shuffle so the puzzle is stable
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
      if (missing) {
        setVerdict({ ok: false, msg: `“${line.code.trim()}” can't go there — ${MSG[missing]}.` });
        return;
      }
      if (line.defines) defined.add(line.defines);
    }
    setVerdict({ ok: true, msg: "Define the saver, build the data, then call — the class is written to disk! (The scores dict may legally sit before the def too; Python only needs def to run before the CALL.)" });
    setSolved(true);
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Hammer these scrambled lines into a working file-saver: open the file, loop the dict, write each row
        as CSV — then build the data and call it. Use ↑↓ to reorder. The body lines belong to their def, and
        the <em>def must run before the call</em>. ⚒️
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
            <pre style={{ ...mono, fontSize: 12 }}>{target[li].code}</pre>
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

// ── Stage 4: Temper — DEFINE a safe function; tests call it from outside ──
function TemperStage({ onPass }) {
  const TESTS = [
    { pre: "", post: "\nprint(safe_divide(10, 2))", expect: "5.0", label: "safe_divide(10, 2) → 5.0" },
    { pre: "", post: "\nprint(safe_divide(7, 0))", expect: "-1", label: "hidden: divide by ZERO → -1 (no crash!)" },
    { pre: "", post: "\nresult = safe_divide(20, 4)\nprint(result + 1)", expect: "6.0", label: "hidden: your RETURN value is used in math" },
  ];
  const [code, setCode] = useState("# define safe_divide(a, b) here\n");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const pyRef = useRef(null);
  const hints = [
    "def safe_divide(a, b): with a try block that does return a / b.",
    "In except ZeroDivisionError: return -1 — RETURN the fallback, don't print it (the third test does math with your return value, and None + 1 crashes).",
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
          py.runPython(t.pre + code + t.post);
        } catch (e) {
          const lines = String(e.message || e).trim().split("\n");
          setStatus("error");
          setMessage(`Test "${t.label}" — Python error:\n` + lines[lines.length - 1]);
          setHintCount((h) => Math.min(h + 1, hints.length));
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
      setMessage("All three tests passed. A divide-by-zero that would have crashed became a clean -1 — and unseen test code used your return value in maths. That's a robust function.");
    } catch (e) {
      setStatus("error"); setMessage("Unexpected error: " + String(e));
    }
  }

  // Fallback mini-Parsons (used only if Pyodide can't load)
  const fbTarget = [
    { code: "def safe_divide(a, b):", defines: "def_open", needs: [] },
    { code: "    try:", defines: "tryblk", needs: ["def_open"] },
    { code: "        return a / b", defines: "body", needs: ["tryblk"] },
    { code: "    except ZeroDivisionError:", defines: "exc", needs: ["tryblk"] },
    { code: "        return -1", defines: "def_done", needs: ["exc"] },
    { code: "print(safe_divide(10, 2))", defines: null, needs: ["def_done"] },
  ];
  const [fbOrder, setFbOrder] = useState([4, 1, 5, 0, 3, 2]);
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
        The final tempering: write a function that <strong style={{ color: C.text }}>catches its own error</strong>
        {" "}and returns a safe fallback. The hidden tests will call it — including one that divides by zero. 🗡️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.orange}55`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>📜 YOUR TASK</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
          Define <code style={{ color: C.teal }}>safe_divide(a, b)</code> that <strong style={{ color: C.text }}>returns</strong>{" "}
          <code style={{ color: C.teal }}>a / b</code> — but if b is 0, catch the <code style={{ color: C.teal }}>ZeroDivisionError</code>{" "}
          and <strong style={{ color: C.text }}>return -1</strong> instead of crashing. One hidden test does math
          with your return value, so you must return, not print.
        </div>
      </div>

      {status !== "fallback" && (
        <>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} rows={8} style={{
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
function BadgeScreen({ claimed, onClaim }) {
  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <div style={{ fontSize: 64 }}>🔥</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.orange, marginTop: 8 }}>TEMPERED IN THE M9 CRUCIBLE</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 480, margin: "10px auto 0" }}>
        Predicted a jump to except. Caught the wrong-type bug and the file-mode that ate the data. Assembled a
        CSV saver from scrap. Then wrote a function that turned a divide-by-zero into a clean −1 — while unseen
        test code did maths on its return value. Robustness, <em>forged into skill</em>.
      </div>
      <div style={{
        marginTop: 20, padding: 20, borderRadius: 12, display: "inline-block",
        background: `linear-gradient(135deg, ${C.orange}22, ${C.red}22)`,
        border: `1px solid ${C.orange}66`,
      }}>
        <div style={{ fontSize: 32 }}>🏅</div>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginTop: 6 }}>Crucible Badge · Module 9</div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Spark ✓ · Flame ✓ · Forge ✓ · Temper ✓</div>
      </div>
      <div style={{ color: C.muted, fontSize: 13, marginTop: 18, lineHeight: 1.7 }}>
        Your programs now survive bad input and remember their data between runs. Next, the forge reshapes the
        data itself: <strong style={{ color: C.orange }}>Module 10 — Object-Oriented Programming</strong>, where a
        student becomes one object that carries its own name, marks, and behaviour. 🔥
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
export default function Unit9_C({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
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
          <div style={{ fontSize: 12, color: C.orange, letterSpacing: 1, fontWeight: 700 }}>MODULE 9 › THE CRUCIBLE</div>
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
          earn the badge. Forge your Module 9 skills. Ready?
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
