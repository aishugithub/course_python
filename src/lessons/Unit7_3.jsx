// Unit 7.3 — List Methods & Loop Patterns (toolbox, count, find-max, sort)
import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };
const insight = (color, children) => (
  <div style={{ marginTop: 16, background: color + "18", border: `1px solid ${color}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
    🔑 {children}
  </div>
);

function SlotRow({ items, highlight = -1 }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
      {items.map((v, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: i === highlight ? C.accent : C.muted, fontWeight: 700, marginBottom: 3 }}>{i}</div>
          <div style={{
            minWidth: 46, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 8, fontFamily: "monospace", fontSize: 15, fontWeight: 700, padding: "0 8px",
            background: i === highlight ? C.accent + "26" : C.surface,
            color: i === highlight ? C.accent : C.text,
            border: `2px solid ${i === highlight ? C.accent : C.teal + "66"}`, transition: "all 0.25s",
          }}>{String(v)}</div>
        </div>
      ))}
    </div>
  );
}

// ── Widget 1: Method Toolbox — live list surgery ──
function ToolboxWidget() {
  const initial = [72, 85, 91, 64];
  const [items, setItems] = useState(initial);
  const [log, setLog] = useState([]);

  const act = (label, fn, note) => {
    setItems((prev) => fn([...prev]));
    setLog((l) => [...l, { label, note }]);
  };
  const reset = () => { setItems(initial); setLog([]); };

  const buttons = [
    { code: "marks.append(88)", note: "adds at the END — the list grows", fn: (a) => { a.push(88); return a; }, color: C.green },
    { code: "marks.remove(64)", note: "deletes the first 64 it finds", fn: (a) => { const i = a.indexOf(64); if (i > -1) a.splice(i, 1); return a; }, color: C.red },
    { code: "marks.pop()", note: "removes the LAST item (and hands it to you)", fn: (a) => { a.pop(); return a; }, color: C.orange },
    { code: "marks.sort()", note: "rearranges in place, smallest first", fn: (a) => a.sort((x, y) => x - y), color: C.accent },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A student left mid-year. A new one joined. The principal wants marks in order. Last unit you changed
        slots by index — but Python lists come with built-in <strong style={{ color: C.text }}>methods</strong>:
        verbs you call with a dot. Try each one and watch the slots react.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 12px", marginBottom: 14 }}>
        <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>
          marks &nbsp;·&nbsp; len(marks) → {items.length}
        </div>
        {items.length > 0 ? <SlotRow items={items} /> :
          <div style={{ textAlign: "center", color: C.muted, fontSize: 13, padding: 10 }}>[ ] — empty list!</div>}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {buttons.map((b) => (
          <button key={b.code} onClick={() => act(b.code, b.fn, b.note)} style={{
            padding: "9px 14px", borderRadius: 8, fontSize: 12, fontFamily: "monospace", fontWeight: 600,
            background: b.color + "1c", color: b.color, border: `1.5px solid ${b.color}66`, cursor: "pointer",
          }}>{b.code}</button>
        ))}
        <button onClick={reset} style={{
          padding: "9px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
          background: C.card, color: C.muted, border: `1.5px solid ${C.border}`, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      {log.length > 0 && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 12 }}>
          {log.slice(-5).map((e, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 1.9 }}>
              <span style={{ color: C.text }}>{e.label}</span>
              <span style={{ color: C.muted }}>{"   # " + e.note}</span>
            </div>
          ))}
        </div>
      )}

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Methods are verbs attached to the list.</strong> <code style={{ color: C.teal }}>marks.append(x)</code>,
        <code style={{ color: C.teal }}> marks.remove(x)</code>, <code style={{ color: C.teal }}>marks.pop()</code>,
        <code style={{ color: C.teal }}> marks.sort()</code> — all change the list <em>in place</em>, no new list,
        no re-assignment. (Try <code style={{ color: C.red }}>word.append("!")</code> on a string — TypeError. Immutability again!)
      </>)}
    </div>
  );
}

// ── Widget 2: Trace — count the passes (accumulate/count pattern) ──
function CountTrace() {
  const lines = [
    'marks = [72, 45, 91, 30, 78]',
    'passed = 0',
    'for m in marks:',
    '    if m >= 50:',
    '        passed = passed + 1',
    'print(passed, "students passed")',
  ];
  // precomputed steps: [lineIdx, m, passed, condition, output, narration]
  const steps = [
    [0, null, null, null, "", "The class marks go into one list."],
    [1, null, 0, null, "", "Create the counter BEFORE the loop — passed starts at 0."],
    [2, 72, 0, null, "", "The for loop hands m the first mark: 72."],
    [3, 72, 0, true, "", "Is 72 >= 50? True ✓ — this student passed."],
    [4, 72, 1, null, "", "Count it! passed becomes 1."],
    [2, 45, 1, null, "", "Next mark: m = 45."],
    [3, 45, 1, false, "", "Is 45 >= 50? False ✗ — skip the counting line."],
    [2, 91, 1, null, "", "Next mark: m = 91."],
    [3, 91, 1, true, "", "Is 91 >= 50? True ✓."],
    [4, 91, 2, null, "", "passed becomes 2."],
    [2, 30, 2, null, "", "Next mark: m = 30."],
    [3, 30, 2, false, "", "Is 30 >= 50? False ✗ — skip."],
    [2, 78, 2, null, "", "Last mark: m = 78."],
    [3, 78, 2, true, "", "Is 78 >= 50? True ✓."],
    [4, 78, 3, null, "", "passed becomes 3."],
    [5, 78, 3, null, "3 students passed", "List finished — print the count. 3 out of 5 passed."],
  ];
  const [idx, setIdx] = useState(0);
  const [line, m, passed, cond, output, narr] = steps[idx];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Pattern #1: <strong style={{ color: C.text }}>counting</strong>. "How many students passed?" is Unit 6's
        counter pattern (create-before, update-inside) walking a list, with an <code style={{ color: C.teal }}>if</code> from
        Module 5 deciding what counts. Step through and watch <code style={{ color: C.teal }}>passed</code> climb.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: 12.5, lineHeight: 1.9, padding: "1px 8px", borderRadius: 6,
              background: i === line ? C.accent + "22" : "transparent",
              borderLeft: `3px solid ${i === line ? C.accent : "transparent"}`,
              color: i === line ? C.text : C.muted, whiteSpace: "pre",
            }}>{i === line ? "▶ " : "  "}{l}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `1px solid ${C.teal}55`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: C.teal, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>MEMORY</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[["m", m], ["passed", passed]].map(([name, val]) => (
                <div key={name} style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>{name}</div>
                  <div style={{ border: `2px solid ${C.teal}`, borderRadius: 8, padding: "6px 4px", fontFamily: "monospace", fontSize: 14, color: val === null ? C.muted : C.text, background: C.surface }}>
                    {val === null ? "—" : val}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${cond === true ? C.green : cond === false ? C.red : C.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>CONDITION CHECK</div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: cond === true ? C.green : cond === false ? C.red : C.muted }}>
              {cond === true ? `${m} >= 50 → True ✓` : cond === false ? `${m} >= 50 → False ✗` : "—"}
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, flex: 1 }}>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: C.green, minHeight: 18 }}>{output || " "}</div>
          </div>
        </div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.6 }}>
        {narr}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setIdx((i) => Math.min(steps.length - 1, i + 1))} disabled={idx === steps.length - 1} style={{
          padding: "10px 20px", borderRadius: 8, background: idx === steps.length - 1 ? C.card : C.accentGlow,
          border: "none", color: idx === steps.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: idx === steps.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({idx + 1} / {steps.length})</button>
        <button onClick={() => setIdx(0)} style={{
          padding: "10px 16px", borderRadius: 8, background: C.card, border: `1px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>The counting pattern:</strong> counter = 0 before the loop, walk
        the list, <code style={{ color: C.teal }}>if</code> decides, counter += 1 inside. Swap the condition and
        the same skeleton counts fails, distinctions, absentees — anything.
      </>)}
    </div>
  );
}

// ── Widget 3: Trace — find the topper (best-so-far / max pattern) ──
function TopperTrace() {
  const lines = [
    'marks = [72, 85, 91, 64, 78]',
    'topper = marks[0]',
    'for m in marks:',
    '    if m > topper:',
    '        topper = m',
    'print("Topper scored", topper)',
  ];
  const steps = [
    [0, null, null, null, "", "Five students' marks, one list."],
    [1, null, 72, null, "", "Assume the FIRST mark is the best... until proven otherwise."],
    [2, 72, 72, null, "", "m = 72."],
    [3, 72, 72, false, "", "Is 72 > 72? False ✗ — can't beat itself."],
    [2, 85, 72, null, "", "m = 85."],
    [3, 85, 72, true, "", "Is 85 > 72? True ✓ — we found someone better!"],
    [4, 85, 85, null, "", "New champion: topper becomes 85."],
    [2, 91, 85, null, "", "m = 91."],
    [3, 91, 85, true, "", "Is 91 > 85? True ✓ — better again!"],
    [4, 91, 91, null, "", "topper becomes 91."],
    [2, 64, 91, null, "", "m = 64."],
    [3, 64, 91, false, "", "Is 64 > 91? False ✗ — 91 keeps the crown."],
    [2, 78, 91, null, "", "m = 78."],
    [3, 78, 91, false, "", "Is 78 > 91? False ✗."],
    [5, 78, 91, null, "Topper scored 91", "Every mark checked — 91 survived every challenge."],
  ];
  const [idx, setIdx] = useState(0);
  const [line, m, topper, cond, output, narr] = steps[idx];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Pattern #2: <strong style={{ color: C.text }}>best-so-far</strong>. Finding the topper is a tournament:
        the current champion (<code style={{ color: C.teal }}>topper</code>) faces every mark in turn, and only a
        higher one takes the title. Step through the tournament.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14, marginBottom: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: 12.5, lineHeight: 1.9, padding: "1px 8px", borderRadius: 6,
              background: i === line ? C.accent + "22" : "transparent",
              borderLeft: `3px solid ${i === line ? C.accent : "transparent"}`,
              color: i === line ? C.text : C.muted, whiteSpace: "pre",
            }}>{i === line ? "▶ " : "  "}{l}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.card, border: `1px solid ${C.teal}55`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: C.teal, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>MEMORY</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[["m", m], ["topper 👑", topper]].map(([name, val]) => (
                <div key={name} style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>{name}</div>
                  <div style={{ border: `2px solid ${C.teal}`, borderRadius: 8, padding: "6px 4px", fontFamily: "monospace", fontSize: 14, color: val === null ? C.muted : C.text, background: C.surface }}>
                    {val === null ? "—" : val}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${cond === true ? C.green : cond === false ? C.red : C.border}`, borderRadius: 10, padding: 12 }}>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>CONDITION CHECK</div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: cond === true ? C.green : cond === false ? C.red : C.muted }}>
              {cond === true ? `${m} > ${topper} → True ✓` : cond === false ? `${m} > ${topper} → False ✗` : "—"}
            </div>
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, flex: 1 }}>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: C.green, minHeight: 18 }}>{output || " "}</div>
          </div>
        </div>
      </div>

      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.6 }}>
        {narr}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setIdx((i) => Math.min(steps.length - 1, i + 1))} disabled={idx === steps.length - 1} style={{
          padding: "10px 20px", borderRadius: 8, background: idx === steps.length - 1 ? C.card : C.accentGlow,
          border: "none", color: idx === steps.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: idx === steps.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({idx + 1} / {steps.length})</button>
        <button onClick={() => setIdx(0)} style={{
          padding: "10px 16px", borderRadius: 8, background: C.card, border: `1px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>The best-so-far pattern:</strong> start with the first item as
        champion, challenge it with every item, replace when beaten. Flip <code style={{ color: C.teal }}>&gt;</code> to
        <code style={{ color: C.teal }}> &lt;</code> and the same skeleton finds the LOWEST mark, cheapest ticket, shortest name.
      </>)}
    </div>
  );
}

// ── Widget 4: Build It — merit list (sort + slice) ──
function MeritWidget() {
  const [m2, setM2] = useState(91);
  const marks = [72, 85, m2, 64, 78];
  const sorted = [...marks].sort((a, b) => b - a);
  const top3 = sorted.slice(0, 3);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The notice board needs a merit list: top 3 marks, highest first. Watch three units of this module
        work as one team — <code style={{ color: C.teal }}>sort()</code> (this unit) rearranges,
        slicing (Unit 7.1!) cuts the top 3. Drag a mark and watch the merit list re-rank itself.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>marks[2] = <strong style={{ color: C.accent }}>{m2}</strong></label>
        <input type="range" min={0} max={100} value={m2} onChange={(e) => setM2(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE PROGRAM</div>
          <pre style={mono}>
            {`marks = [${marks.join(", ")}]\n\nmarks.sort(reverse=True)\n# highest first\n\ntop3 = marks[:3]\nprint("Merit list:", top3)`}
          </pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          <pre style={{ ...mono, color: C.green }}>{`Merit list: [${top3.join(", ")}]`}</pre>
          <div style={{ marginTop: 14 }}>
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>AFTER sort(reverse=True)</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {sorted.map((v, i) => (
                <div key={i} style={{
                  padding: "6px 10px", borderRadius: 7, fontFamily: "monospace", fontSize: 13, fontWeight: 700,
                  background: i < 3 ? C.green + "1c" : C.surface,
                  color: i < 3 ? C.green : C.muted,
                  border: `1.5px solid ${i < 3 ? C.green : C.border}`,
                }}>{i < 3 ? "🏅" : ""}{v}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>
              first 3 = <code style={{ color: C.green }}>marks[:3]</code> — stop excluded, as always!
            </div>
          </div>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Real programs are patterns snapped together.</strong> sort() +
        slice = merit list. Loop + if + counter = pass count. You now own the three list patterns —
        <em> accumulate, search, sort</em> — that power everything from report cards to search engines.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: 'nums = [3, 1, 2]\nnums.sort()\nprint(nums)\n\nWhat does this print?',
      options: ["[3, 1, 2]", "[1, 2, 3]", "[3, 2, 1]", "None — sort() makes a new list"],
      answer: 1,
      explain: "sort() rearranges the SAME list in place, smallest first: [1, 2, 3]. No new list is created.",
    },
    {
      q: 'nums = [1, 2, 3]\nnums.append(4)\nnums.pop()\nprint(nums)\n\nWhat does this print?',
      options: ["[1, 2, 3, 4]", "[2, 3, 4]", "[1, 2, 3]", "[1, 2]"],
      answer: 2,
      explain: "append(4) adds 4 at the end; pop() removes the LAST item — that same 4. Back to [1, 2, 3].",
    },
    {
      q: 'count = 0\nfor n in [5, 12, 8, 20]:\n    if n > 10:\n        count = count + 1\nprint(count)\n\nWhat does this print?',
      options: ["0", "1", "2", "4"],
      answer: 2,
      explain: "The counting pattern: only 12 and 20 are > 10, so count ends at 2.",
    },
    {
      q: 'best = 4\nfor n in [4, 9, 7]:\n    if n > best:\n        best = n\nprint(best)\n\nWhat does this print?',
      options: ["4", "7", "9", "20"],
      answer: 2,
      explain: "Best-so-far: 4 can't beat 4; 9 beats 4 (new champion); 7 can't beat 9. Final answer: 9.",
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
          {score === 4 ? "Perfect! The three loop patterns are yours." :
            score >= 2 ? "Good work! If the traces felt fast, replay 'Count the Passes' and 'Find the Topper' step by step." :
              "Worth a replay: step through both traces slowly — watching the counter and the champion update is what makes patterns stick."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 7.3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now reshape lists with methods and run the big three patterns — count/accumulate,
            best-so-far, and sort — the daily bread of real programs.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 7.4 — Tuples & Dictionaries.</strong> A list
            that must NEVER change, and a collection where you look things up by <em>name</em> instead of
            slot number — "what did PRIYA score?" instead of "what's in slot 3?"
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 16, whiteSpace: "pre-wrap", fontFamily: q.q.includes("\n") ? "monospace" : "inherit" }}>{q.q}</div>
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
              cursor: selected !== null ? "default" : "pointer", fontSize: 13, transition: "all 0.25s", fontFamily: "monospace",
            }}>
              {i === q.answer && selected !== null ? "✓ " : i === selected && selected !== q.answer ? "✗ " : ""}{opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: C.purple + "18", border: `1px solid ${C.purple}44`, color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
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

// ── Main ──
export default function Unit7_3({ student, onUnitComplete }) {
  const sections = [
    { id: "toolbox", label: "The Toolbox" },
    { id: "count", label: "Count the Passes" },
    { id: "topper", label: "Find the Topper" },
    { id: "merit", label: "Merit List" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The List Toolbox</h3><ToolboxWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Pattern 1: Count the Passes</h3><CountTrace /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Pattern 2: Find the Topper</h3><TopperTrace /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Pattern 3: Sort → Merit List</h3><MeritWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 7.3.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 7 › UNIT 7.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>List Methods & Loop Patterns</div>
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
