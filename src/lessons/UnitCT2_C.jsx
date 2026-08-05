// UnitCT2_C — 🔥 The Crucible: Computational Thinking II (algorithms on data)
// Drills scanning, searching, sorting and string algorithms. Temper asks the
// student to WRITE a straight-line conditional accumulator; hidden tests set the
// list before their code and check the printed count.
import { useState, useRef } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const UNIT_ID = "UnitCT2_C";
const STAGES = [
  { id: "spark", label: "Spark", icon: "✨", tag: "Predict, Trace & Spot" },
  { id: "flame", label: "Flame", icon: "🔥", tag: "Data-Algorithm Bugs" },
  { id: "forge", label: "Forge", icon: "⚒️", tag: "Assemble the Search" },
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
      code: "data = [4, 9, 2, 7]\nbiggest = data[0]\nfor m in data:\n    if m > biggest:\n        biggest = m\nprint(biggest)",
      options: ["4", "7", "9", "2"],
      answer: 2,
      hints: ["Seed biggest = 4, then keep whatever is larger.", "The largest value in the list is..."],
      why: "Best-so-far starts at 4, gets beaten by 9, and 9 is never beaten. Prints 9.",
    },
    {
      kind: "trace",
      code: 'word = "banana"\nvowels = "aeiou"\nc = 0\nfor ch in word:\n    if ch in vowels:\n        c = c + 1\nprint(c)',
      expect: "3",
      prompt: 'Count the vowels the loop tallies for "banana". Type the number.',
      hints: ['Only a, e, i, o, u count. Look at b-a-n-a-n-a.', "There are three a's and nothing else that's a vowel."],
      why: '"banana" has three a\'s (all vowels) and no other vowels, so the conditional accumulator reaches 3.',
    },
    {
      kind: "lie",
      code: "# binary search on a list called data",
      claims: [
        "Binary search needs the list to be sorted.",
        "Binary search halves the remaining range each step.",
        "Binary search also works correctly on an unsorted list.",
      ],
      lieIndex: 2,
      hints: ["What does binary search assume when it discards a whole half?", "If the data isn't ordered, 'the target must be in the right half' is no longer true."],
      why: "Claims 1 and 2 are true. The lie: on an unsorted list, discarding a half is invalid — binary search can miss the target entirely. It requires sorted data.",
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
        Warm up: predict a best-so-far scan, trace a vowel count, and spot the false claim about binary search. ✨
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
                  {!isSolved && (
                    <button onClick={() => checkTyped(qi)} style={{ padding: "8px 18px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Check</button>
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
        <button onClick={onPass} style={{ width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none", color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>✨ Spark caught! Light the Flame →</button>
      )}
    </div>
  );
}

// ── Stage 2: Flame ──
function FlameStage({ onPass }) {
  const bugs = [
    {
      intro: "This should print the largest value (-2) but prints 0. Click the buggy line.",
      lines: ["data = [-5, -2, -9]", "biggest = 0", "for m in data:", "    if m > biggest:", "        biggest = m", "print(biggest)"],
      buggyLine: 1,
      lineHints: {
        0: "The list is fine — all negative, which is exactly the trap.",
        2: "Looping over the data is correct.",
        3: "The comparison m > biggest is right for a maximum.",
        4: "Updating biggest is correct.",
        5: "The print is fine — the seed value is the problem.",
      },
      fixes: ["biggest = data[0]  (seed with a real element)", "biggest = -100", "change > to <"],
      fixAnswer: 0,
      fixHints: ["Seeding at 0 assumes some value beats 0 — but every mark here is below 0.", "Start from an actual member of the list, data[0], and it's always beatable-or-correct."],
      why: "biggest = 0 is never beaten by negative numbers, so 0 is falsely reported. Seed with data[0] and the scan works for any values.",
    },
    {
      intro: "This should swap the two values to [2, 5], but prints [2, 2]. Click the buggy line.",
      lines: ["data = [5, 2]", "data[0] = data[1]", "data[1] = data[0]", "print(data)"],
      buggyLine: 1,
      lineHints: {
        0: "The starting list is fine.",
        2: "By the time this runs, data[0] has already been overwritten — the damage was done above.",
        3: "The print just shows the wrecked list.",
      },
      fixes: ["Save data[0] in a temp FIRST, then do the two assignments", "Delete the print line", "Use a for loop"],
      fixAnswer: 0,
      fixHints: ["data[0] = data[1] destroys the old 5 before line 3 can rescue it.", "temp = data[0] first preserves 5; then data[0] = data[1]; data[1] = temp."],
      why: "Overwriting data[0] loses the 5, so both slots end up 2. A swap needs a temp to hold the first value before it's clobbered.",
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
        Two classic data bugs: seeding a maximum with 0, and swapping without a temp. Bug
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

// ── Stage 3: Forge — assemble a linear search ──
function ForgeStage({ onPass }) {
  const target = [
    { code: "target = 7", defines: "target_set", needs: [] },
    { code: "found = -1", defines: "found_set", needs: [] },
    { code: "for i in range(len(data)):", defines: "loop", needs: ["target_set", "found_set"] },
    { code: "    if data[i] == target:", defines: "if_open", needs: ["loop"] },
    { code: "        found = i", defines: "assign", needs: ["if_open"] },
    { code: "        break", defines: "brk", needs: ["assign"] },
    { code: "print(found)", defines: null, needs: ["brk"] },
  ];
  const MSG = {
    target_set: "you're searching for target — set what you're looking for first",
    found_set: "found is the 'not seen yet' sentinel (-1); create it before the loop can set it",
    loop: "these indented lines are the loop body — the for header must open above them",
    if_open: "found = i and break only make sense inside the if that matched — open it first",
    assign: "you can't break out on a match before recording the match with found = i",
    brk: "print the result after the loop, once break has stopped the search",
  };
  const shuffled = [4, 0, 6, 2, 5, 1, 3];
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
    setVerdict({ ok: true, msg: "set target → seed found = -1 → scan → on a match record the index and break → print it. A linear search, forged." });
    setSolved(true);
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Assemble a linear search that finds the index of <code style={{ color: C.teal }}>target</code> in{" "}
        <code style={{ color: C.teal }}>data</code>, or leaves -1 if absent. Use ↑↓. Body lines belong under
        their header. ⚒️
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

// ── Stage 4: Temper — write a conditional accumulator over a list ──
function TemperStage({ onPass }) {
  const TESTS = [
    { pre: "marks = [45, 67, 89, 12]\n", post: "", expect: "2", label: "[45,67,89,12] → 2 pass" },
    { pre: "marks = [100, 100, 100]\n", post: "", expect: "3", label: "hidden: all pass → 3" },
    { pre: "marks = [10, 20, 30]\n", post: "", expect: "0", label: "hidden: none pass → 0" },
  ];
  const [code, setCode] = useState("# marks is already set for you.\n# print how many are >= 50.\n");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const pyRef = useRef(null);
  const hints = [
    "Start count = 0 before the loop. Then walk the list.",
    "for m in marks: if m >= 50: count = count + 1 — then print(count). If none pass, count stays 0.",
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
    // The hidden tests supply `marks` themselves (a different list each time).
    // If the learner also writes `marks = [...]`, their line runs after ours and
    // clobbers it, so every test silently counts over the same list — producing
    // confusing "expected 3 / your output 2" mismatches. Catch that up front.
    if (/(^|\n)\s*marks\s*=(?!=)/.test(code)) {
      setStatus("failed");
      setMessage("Remove the line that sets  marks = [...]  from your code.\nThe list is provided automatically and changes on each hidden test — if you redefine it, your code always runs on the same list.");
      return;
    }
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
      setMessage("All three tests passed — including the all-fail list, which only stays 0 if you seeded count before the loop. A conditional accumulator, tempered.");
    } catch (e) { setStatus("error"); setMessage("Unexpected error: " + String(e)); }
  }

  const fbTarget = [
    { code: "count = 0", defines: "init", needs: [] },
    { code: "for m in marks:", defines: "loop", needs: ["init"] },
    { code: "    if m >= 50:", defines: "iff", needs: ["loop"] },
    { code: "        count = count + 1", defines: "body", needs: ["iff"] },
    { code: "print(count)", defines: null, needs: ["body"] },
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
        The final tempering: write a <strong style={{ color: C.text }}>conditional accumulator</strong>. The list{" "}
        <code style={{ color: C.teal }}>marks</code> is already set; print how many are ≥ 50. 🗡️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.orange}55`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>📜 YOUR TASK</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
          Count how many values in <code style={{ color: C.teal }}>marks</code> are <strong style={{ color: C.text }}>≥ 50</strong>{" "}
          and print that count. One hidden test has zero passing — so seed your counter before the loop.
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
      <div style={{ fontSize: 26, fontWeight: 800, color: C.orange, marginTop: 8 }}>TEMPERED IN THE CT-II CRUCIBLE</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 480, margin: "10px auto 0" }}>
        Predicted a scan, traced a vowel count, spotted the sorted-list assumption of binary search. Caught the
        seed-with-0 and swap-without-temp bugs. Assembled a linear search, then wrote a conditional accumulator
        that held even when nothing passed. Algorithms on data, <em>forged into skill</em>.
      </div>
      <div style={{ marginTop: 20, padding: 20, borderRadius: 12, display: "inline-block", background: `linear-gradient(135deg, ${C.orange}22, ${C.red}22)`, border: `1px solid ${C.orange}66` }}>
        <div style={{ fontSize: 32 }}>🏅</div>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginTop: 6 }}>Crucible Badge · Computational Thinking II</div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Spark ✓ · Flame ✓ · Forge ✓ · Temper ✓</div>
      </div>
      <div style={{ color: C.muted, fontSize: 13, marginTop: 18, lineHeight: 1.7 }}>
        You can command lists, grids and text. Next, you learn to package these algorithms into reusable{" "}
        <strong style={{ color: C.orange }}>functions</strong> — Module 8. 🔥
      </div>
      {!claimed && (
        <button onClick={onClaim} style={{ marginTop: 20, padding: "12px 28px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${C.orange}, ${C.red})`, color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>🏅 Claim the badge (records completion)</button>
      )}
    </div>
  );
}

// ── Main ──
export default function UnitCT2_C({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
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
          <div style={{ fontSize: 12, color: C.orange, letterSpacing: 1, fontWeight: 700 }}>COMPUTATIONAL THINKING II › THE CRUCIBLE</div>
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
          earn the badge. Forge your algorithms-on-data skills. Ready?
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
