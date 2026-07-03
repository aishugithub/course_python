// Unit 7.2 — Lists (creating, indexing, mutating, looping)
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

// shared slot-row renderer for list visualizations
function SlotRow({ items, highlight = -1, appended = -1, onClickSlot }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
      {items.map((v, i) => (
        <div key={i} onClick={onClickSlot ? () => onClickSlot(i) : undefined} style={{ textAlign: "center", cursor: onClickSlot ? "pointer" : "default" }}>
          <div style={{ fontSize: 10, color: i === highlight ? C.accent : C.muted, fontWeight: 700, marginBottom: 3 }}>{i}</div>
          <div style={{
            minWidth: 46, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 8, fontFamily: "monospace", fontSize: 15, fontWeight: 700, padding: "0 8px",
            background: i === highlight ? C.accent + "26" : i === appended ? C.green + "1c" : C.surface,
            color: i === highlight ? C.accent : i === appended ? C.green : C.text,
            border: `2px solid ${i === highlight ? C.accent : i === appended ? C.green : C.teal + "66"}`,
            transition: "all 0.25s",
          }}>{String(v)}</div>
        </div>
      ))}
    </div>
  );
}

// ── Widget 1: Need Comparison — 60 students, one variable each? ──
function NeedWidget() {
  const [n, setN] = useState(6);
  const base = [72, 85, 91, 64, 78, 88, 69, 93, 57, 81];
  const shown = Math.min(n, 4);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Unit 6.4 ended with a promise: one score is a variable — but a whole class? Say you must store the
        marks of every student and find the topper. Drag the slider to grow the class and watch the
        variable-per-student plan collapse.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>students = <strong style={{ color: C.accent }}>{n}</strong></label>
        <input type="range" min={3} max={60} value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ ONE VARIABLE EACH</div>
          <pre style={mono}>
            {Array.from({ length: shown }, (_, i) => `mark${i + 1} = ${base[i % base.length]}`).join("\n")}
            {n > shown ? `\n# ... ${n - shown} more lines 😬` : ""}
            {`\n\n# find the topper?\n# compare ${n} variables BY HAND`}
          </pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ ONE LIST FOR ALL</div>
          <pre style={mono}>
            {`marks = [${base.slice(0, Math.min(n, 4)).join(", ")}${n > 4 ? ", ..." : ""}]`}
            {`\n\nprint(len(marks)) `}<span style={{ color: C.green }}>{`# ${n}`}</span>
            {`\n# one variable, ${n} values\n# and a loop can visit them all`}
          </pre>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>A list is one variable that holds many values.</strong> Strings
        taught you the idea of a collection — but they only hold characters. A list holds numbers, strings,
        anything — and it teams up perfectly with the loops you mastered in Module 6.
      </>)}
    </div>
  );
}

// ── Widget 2: Anatomy — list slots, indexing carries over, C contrast ──
function AnatomyWidget() {
  const marks = [72, 85, 91, 64, 78];
  const [sel, setSel] = useState(2);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Square brackets, values separated by commas — and in memory, the same picture as Unit 7.1's strings:
        a row of numbered slots. Everything you learned there carries over. Click a slot.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 12px", marginBottom: 14 }}>
        <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>
          marks = [72, 85, 91, 64, 78] &nbsp;·&nbsp; len(marks) → 5
        </div>
        <SlotRow items={marks} highlight={sel} onClickSlot={setSel} />
      </div>

      <div style={{ background: C.surface, border: `1.5px solid ${C.accent}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <pre style={mono}>
          {`marks[${sel}]   `}<span style={{ color: C.green }}>{`→ ${marks[sel]}`}</span>
          {`     marks[${sel - marks.length}]   `}<span style={{ color: C.green }}>{`→ ${marks[sel]}`}</span>
          {`\nmarks[1:3] `}<span style={{ color: C.green }}>→ [85, 91]</span>
          <span style={{ color: C.muted }}>   # slicing works too — same stop-excluded rule!</span>
        </pre>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.purple}44`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ color: C.purple, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>💜 AND IT HOLDS ANYTHING</div>
        <pre style={mono}>
          {`student = ["Priya", 19, 87.5, True]\n#           str    int  float  bool — all in ONE list`}
        </pre>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>⚙️ IN C</div>
          <pre style={mono}>{`int marks[60];\n/* size 60 forever —\n   61st student? too bad.\n   only ints allowed */`}</pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.accent}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 IN PYTHON</div>
          <pre style={mono}>{`marks = []\n# grows as you add,\n# shrinks as you remove,\n# holds any mix of types`}</pre>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>Indexing and slicing are universal.</strong> <code style={{ color: C.teal }}>s[0]</code>,
        <code style={{ color: C.teal }}> s[-1]</code>, <code style={{ color: C.teal }}>s[1:3]</code>, <code style={{ color: C.teal }}>len(s)</code> —
        one set of rules for strings, lists, and (next unit) tuples. Learn once, use everywhere.
      </>)}
    </div>
  );
}

// ── Widget 3: Mutability — change a slot in place, append, contrast with strings ──
function MutateWidget() {
  const initial = [72, 85, 91, 64, 78];
  const [items, setItems] = useState(initial);
  const [log, setLog] = useState([]);
  const [highlight, setHighlight] = useState(-1);
  const [appended, setAppended] = useState(-1);

  const changed = items[2] === 95;
  const grew = items.length > 5;

  const fix = () => {
    if (changed) return;
    const next = [...items]; next[2] = 95;
    setItems(next); setHighlight(2); setAppended(-1);
    setLog((l) => [...l, "marks[2] = 95      # re-totalled after correction ✔"]);
  };
  const add = () => {
    if (grew) return;
    setItems((p) => [...p, 88]); setAppended(items.length); setHighlight(-1);
    setLog((l) => [...l, "marks.append(88)   # new admission joins the list ✔"]);
  };
  const reset = () => { setItems(initial); setLog([]); setHighlight(-1); setAppended(-1); };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Here's the superpower strings don't have. A student's mark was totalled wrongly — it should be 95,
        not 91. And a new admission just joined the class. With a string you'd rebuild from scratch
        (Unit 7.1's gotcha). With a list? Just do it.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 12px", marginBottom: 14 }}>
        <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>
          marks &nbsp;·&nbsp; SAME list the whole time — no copy made
        </div>
        <SlotRow items={items} highlight={highlight} appended={appended} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <button onClick={fix} disabled={changed} style={{
          padding: "9px 16px", borderRadius: 8, fontSize: 12.5, fontFamily: "monospace", fontWeight: 600,
          background: changed ? C.card : C.accent + "22", color: changed ? C.muted : C.accent,
          border: `1.5px solid ${changed ? C.border : C.accent}`, cursor: changed ? "default" : "pointer",
        }}>marks[2] = 95</button>
        <button onClick={add} disabled={grew} style={{
          padding: "9px 16px", borderRadius: 8, fontSize: 12.5, fontFamily: "monospace", fontWeight: 600,
          background: grew ? C.card : C.green + "22", color: grew ? C.muted : C.green,
          border: `1.5px solid ${grew ? C.border : C.green}`, cursor: grew ? "default" : "pointer",
        }}>marks.append(88)</button>
        <button onClick={reset} style={{
          padding: "9px 16px", borderRadius: 8, fontSize: 12.5, fontWeight: 600,
          background: C.card, color: C.muted, border: `1.5px solid ${C.border}`, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      {log.length > 0 && (
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, marginBottom: 14 }}>
          <pre style={{ ...mono, color: C.green }}>{log.join("\n")}</pre>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>STRING (Unit 7.1)</div>
          <pre style={mono}>{`word[0] = "H"`}{`\n`}<span style={{ color: C.red }}>TypeError ❌</span></pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>LIST (now!)</div>
          <pre style={mono}>{`marks[2] = 95`}{`\n`}<span style={{ color: C.green }}>works ✅ — changed in place</span></pre>
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Lists are mutable — strings are not.</strong> A list is changed
        <em> in place</em>: same slots in memory, values overwritten or added at the end. No new list is
        built, no relabelling — which is exactly what you want for data that keeps changing.
      </>)}
    </div>
  );
}

// ── Widget 4: Build It — class average with a for loop over the list ──
function BuildWidget() {
  const [m2, setM2] = useState(91);
  const marks = [72, 85, m2, 64, 78];
  const total = marks.reduce((a, b) => a + b, 0);
  const avg = total / marks.length;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Now the payoff: Module 6's loops + a list. One new trick — <code style={{ color: C.accent }}>for m in marks</code> hands
        you each value directly, no <code style={{ color: C.teal }}>range()</code> needed. This is the accumulate
        pattern from Unit 6.2, walking a list. Drag the third student's mark.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>marks[2] = <strong style={{ color: C.accent }}>{m2}</strong></label>
        <input type="range" min={0} max={100} value={m2} onChange={(e) => setM2(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 THE PROGRAM</div>
          <pre style={mono}>
            {`marks = [${marks.join(", ")}]\n\ntotal = 0\nfor m in marks:\n    total = total + m\n\naverage = total / len(marks)\nprint("Total:", total)\nprint("Average:", average)`}
          </pre>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>▶ OUTPUT</div>
          <pre style={{ ...mono, color: C.green }}>
            {`Total: ${total}\nAverage: ${avg}`}
          </pre>
          <div style={{ marginTop: 14, fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
            The loop visits {marks.length} slots, adding each mark into <code style={{ color: C.teal }}>total</code> —
            create-before, update-inside, exactly like your Unit 6 counters.
          </div>
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>for item in list — the pattern you'll use daily.</strong> Marks,
        prices, names, sensor readings: store them in a list, walk them with a for loop, accumulate an
        answer. Next unit turns this into a full toolkit: searching, sorting, finding the topper.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: 'marks = [10, 20, 30]\nprint(marks[1])\n\nWhat does this print?',
      options: ["10", "20", "30", "IndexError"],
      answer: 1,
      explain: "Lists index from 0, just like strings: marks[0] is 10, marks[1] is 20.",
    },
    {
      q: 'marks = [10, 20, 30]\nmarks[0] = 99\n\nWhat happens?',
      options: ["TypeError — like strings", "marks becomes [99, 20, 30]", "A brand-new list is created", "Nothing changes"],
      answer: 1,
      explain: "Lists are MUTABLE — the value in slot 0 is overwritten in place. This is exactly where lists differ from strings.",
    },
    {
      q: 'nums = [5, 10, 15, 20]\nprint(nums[1:3])\n\nWhat does this print?',
      options: ["[10, 15, 20]", "[5, 10, 15]", "[10, 15]", "[15, 20]"],
      answer: 2,
      explain: "Same slice rule as strings and range(): start 1 included, stop 3 excluded → slots 1 and 2 → [10, 15].",
    },
    {
      q: 'total = 0\nfor m in [2, 4, 6]:\n    total = total + m\nprint(total)\n\nWhat does this print?',
      options: ["6", "12", "246", "3"],
      answer: 1,
      explain: "The loop hands m each value in turn: 2, then 4, then 6. total accumulates 0+2+4+6 = 12.",
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
          {score === 4 ? "Perfect! Lists are officially in your toolkit." :
            score >= 2 ? "Good work! If mutability tripped you up, replay 'Change It' — clicking the buttons makes it stick." :
              "Worth a replay: 'List Anatomy' for indexing and 'Change It' for how lists differ from strings."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 7.2 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now store a whole class in one variable, reach any value by index, change values in
            place, grow the list with append, and walk it with a for loop.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 7.3 — List Methods & Loop Patterns.</strong> Sort
            the marks, find the topper, count the passes — the three loop patterns every programmer runs on
            lists every single day.
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
export default function Unit7_2({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Why?" },
    { id: "anatomy", label: "List Anatomy" },
    { id: "mutate", label: "Change It" },
    { id: "build", label: "Build It" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Sixty Students, Sixty Variables?</h3><NeedWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>A List is a Row of Slots — For Anything</h3><AnatomyWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Change It In Place</h3><MutateWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build It: Class Average</h3><BuildWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 7.2.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 7 › UNIT 7.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Lists</div>
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
