// Unit 7.1 — Strings in Depth (indexing, slicing, immutability)
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

// ── Widget 1: Need Comparison — one variable, many letters ──
function NeedWidget() {
  const names = ["RAJ", "PRIYA", "CHENNAI"];
  const ordinals = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];
  const [name, setName] = useState("PRIYA");

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Since Unit 4.2 you've stored a whole name in ONE variable — but the letters inside were locked away.
        Say your program must greet people by their first initial, and also tell them how long their name is.
        Pick a name and compare the two approaches.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {names.map((n) => (
          <button key={n} onClick={() => setName(n)} style={{
            padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: name === n ? C.accentGlow : C.card, color: name === n ? "#fff" : C.muted,
            border: `1.5px solid ${name === n ? C.accent : C.border}`,
          }}>{n}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.red}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.red, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>❌ WITHOUT INDEXING</div>
          <pre style={mono}>
            {name.split("").map((ch, i) => `${ordinals[i]} = "${ch}"`).join("\n")}
            {`\n# ${name.length} separate variables 😬\n# user types a longer name?\n# rewrite the whole program!`}
          </pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.green}44`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>✅ WITH INDEXING</div>
          <pre style={mono}>
            {`name = "${name}"\nprint(name[0])   `}<span style={{ color: C.green }}>{`# ${name[0]}`}</span>
            {`\nprint(name[-1])  `}<span style={{ color: C.green }}>{`# ${name[name.length - 1]}`}</span>
            {`\nprint(len(name)) `}<span style={{ color: C.green }}>{`# ${name.length}`}</span>
          </pre>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 10 }}>Three lines. Works for ANY name, any length.</div>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>A string was a collection all along.</strong> One variable,
        many characters inside — and indexing is the key that unlocks them. This is your first taste of
        Module 7's big idea: <em>data that lives in collections</em>.
      </>)}
    </div>
  );
}

// ── Widget 2: Anatomy — clickable character slots + C contrast ──
function SlotsWidget() {
  const s = "CHENNAI";
  const [sel, setSel] = useState(3);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Remember the memory-slot picture from Unit 4.2? A string is a <em>row</em> of slots, one character
        each, numbered from <strong style={{ color: C.accent }}>0</strong>. Click any slot below.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 12px", marginBottom: 14 }}>
        <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>
          city = "CHENNAI" &nbsp;·&nbsp; len(city) → {s.length}
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {s.split("").map((ch, i) => (
            <div key={i} onClick={() => setSel(i)} style={{ cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: sel === i ? C.accent : C.muted, fontWeight: 700, marginBottom: 3 }}>{i}</div>
              <div style={{
                width: 40, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8, fontFamily: "monospace", fontSize: 18, fontWeight: 700,
                background: sel === i ? C.accent + "26" : C.surface, color: sel === i ? C.accent : C.text,
                border: `2px solid ${sel === i ? C.accent : C.teal + "66"}`, transition: "all 0.2s",
              }}>{ch}</div>
              <div style={{ fontSize: 10, color: sel === i ? C.orange : C.muted, fontWeight: 700, marginTop: 3 }}>{i - s.length}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 10, fontSize: 10.5, color: C.muted }}>
          <span><span style={{ color: C.accent, fontWeight: 700 }}>top row</span>: index from the front (starts at 0)</span>
          <span><span style={{ color: C.orange, fontWeight: 700 }}>bottom row</span>: negative index from the back</span>
        </div>
      </div>

      <div style={{ background: C.surface, border: `1.5px solid ${C.accent}55`, borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <pre style={mono}>
          {`city[${sel}]  `}<span style={{ color: C.green }}>{`→ '${s[sel]}'`}</span>
          {`     city[${sel - s.length}]  `}<span style={{ color: C.green }}>{`→ '${s[sel]}'`}</span>
        </pre>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 8 }}>
          Same letter, two addresses: <strong style={{ color: C.accent }}>{sel}</strong> counting from the
          front, <strong style={{ color: C.orange }}>{sel - s.length}</strong> counting from the back.
          <code style={{ color: C.orange }}> city[-1]</code> is always the LAST character — no need to know the length.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.orange}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>⚙️ IN C</div>
          <pre style={mono}>{`char city[8] = "CHENNAI";\n/* 8 slots: 7 letters + '\\0'\n   size fixed forever,\n   YOU count the letters */`}</pre>
        </div>
        <div style={{ background: C.card, border: `1.5px solid ${C.accent}55`, borderRadius: 10, padding: 16 }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 12, marginBottom: 10 }}>🐍 IN PYTHON</div>
          <pre style={mono}>{`city = "CHENNAI"\n# no size, no end-marker,\n# len(city) → 7\n# Python counts for you`}</pre>
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Indexing starts at 0, not 1.</strong> The first character is
        <code style={{ color: C.accent }}> s[0]</code>, the last is <code style={{ color: C.accent }}>s[len(s)-1]</code> —
        or simply <code style={{ color: C.orange }}>s[-1]</code>. Going past the end raises an <code style={{ color: C.red }}>IndexError</code>.
      </>)}
    </div>
  );
}

// ── Widget 3: Slicing playground on a roll number ──
function SliceWidget() {
  const s = "22CS1042";
  const [start, setStart] = useState(2);
  const [stop, setStop] = useState(4);
  const result = s.slice(start, stop);

  const presets = [
    { label: "year", a: 0, b: 2 },
    { label: "branch", a: 2, b: 4 },
    { label: "number", a: 4, b: 8 },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        One character at a time is nice — but a college roll number like <code style={{ color: C.teal }}>"22CS1042"</code> packs
        three facts into one string: join year, branch, and serial number. <strong style={{ color: C.text }}>Slicing</strong> cuts
        out a whole piece: <code style={{ color: C.accent }}>s[start:stop]</code>. Drag the sliders.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={{ color: C.accent, fontSize: 12, fontWeight: 700 }}>start = {start} (included)</label>
          <input type="range" min={0} max={8} value={start} onChange={(e) => setStart(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
        </div>
        <div>
          <label style={{ color: C.red, fontSize: 12, fontWeight: 700 }}>stop = {stop} (excluded!)</label>
          <input type="range" min={0} max={8} value={stop} onChange={(e) => setStop(Number(e.target.value))} style={{ width: "100%", accentColor: C.red }} />
        </div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 12px", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          {s.split("").map((ch, i) => {
            const inSlice = i >= start && i < stop;
            const isStop = i === stop;
            return (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: inSlice ? C.green : isStop ? C.red : C.muted, fontWeight: 700, marginBottom: 3 }}>{i}</div>
                <div style={{
                  width: 38, height: 42, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: 8, fontFamily: "monospace", fontSize: 17, fontWeight: 700, transition: "all 0.2s",
                  background: inSlice ? C.green + "22" : C.surface,
                  color: inSlice ? C.green : C.text,
                  border: `2px solid ${inSlice ? C.green : isStop ? C.red : C.border}`,
                  opacity: inSlice || isStop ? 1 : 0.45,
                }}>{ch}</div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: C.muted }}>
          <span style={{ color: C.green, fontWeight: 700 }}>green</span> = kept · <span style={{ color: C.red, fontWeight: 700 }}>red border</span> = stop, always left out
        </div>
      </div>

      <div style={{ background: C.surface, border: `1.5px solid ${C.accent}55`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
        <pre style={mono}>
          {`roll = "22CS1042"\nroll[${start}:${stop}]  `}
          <span style={{ color: result ? C.green : C.red }}>
            {result ? `→ "${result}"` : `→ ""   # empty! start must come before stop`}
          </span>
        </pre>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 4, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ color: C.muted, fontSize: 12 }}>Try:</span>
        {presets.map((p) => (
          <button key={p.label} onClick={() => { setStart(p.a); setStop(p.b); }} style={{
            padding: "6px 12px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "monospace",
            background: start === p.a && stop === p.b ? C.accentGlow : C.card,
            color: start === p.a && stop === p.b ? "#fff" : C.muted, border: `1px solid ${C.border}`,
          }}>roll[{p.a}:{p.b}] · {p.label}</button>
        ))}
      </div>

      <div style={{ marginTop: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.muted, lineHeight: 1.8 }}>
        Shortcuts: leave a side empty and Python fills it in — <code style={{ color: C.teal }}>roll[:2]</code> means
        "from the beginning", <code style={{ color: C.teal }}>roll[4:]</code> means "to the very end".
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>start included, stop excluded</strong> — the exact same rule
        as <code style={{ color: C.teal }}>range(start, stop)</code> from Unit 6.2! Python is consistent:
        wherever you give a start and stop, the stop is never part of the result.
      </>)}
    </div>
  );
}

// ── Widget 4: Immutability gotcha — TypeError, then the fix ──
function GotchaWidget() {
  const [tried, setTried] = useState(false);
  const [fixed, setFixed] = useState(false);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        You typed <code style={{ color: C.teal }}>word = "JELLO"</code> but meant <code style={{ color: C.green }}>"HELLO"</code>.
        Easy — indexing tells us the wrong letter is at slot 0, so just assign a new one there... right?
      </p>

      <div style={{ background: C.card, border: `1.5px solid ${tried ? C.red : C.border}`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
        <pre style={mono}>
          {`word = "JELLO"\nword[0] = "H"   # fix the typo?`}
        </pre>
        {tried && (
          <pre style={{ ...mono, color: C.red, marginTop: 10 }}>
            {`Traceback (most recent call last):\n  File "fix.py", line 2\nTypeError: 'str' object does not\nsupport item assignment`}
          </pre>
        )}
      </div>

      {!tried && (
        <button onClick={() => setTried(true)} style={{
          padding: "10px 20px", borderRadius: 8, background: C.red + "22", border: `1.5px solid ${C.red}`,
          color: C.red, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>▶ Run it — surely this works?</button>
      )}

      {tried && (
        <>
          <div style={{ background: C.yellow + "14", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
            ⚠️ Python refuses! Strings are <strong style={{ color: C.yellow }}>immutable</strong> — once created,
            the characters inside can NEVER be changed. You can <em>read</em> any slot, but you can't <em>write</em> into one.
          </div>

          {!fixed ? (
            <button onClick={() => setFixed(true)} style={{
              padding: "10px 20px", borderRadius: 8, background: C.green + "22", border: `1.5px solid ${C.green}`,
              color: C.green, fontWeight: 600, fontSize: 13, cursor: "pointer",
            }}>✓ So how DO we fix the typo?</button>
          ) : (
            <>
              <div style={{ background: C.card, border: `1.5px solid ${C.green}`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
                <pre style={mono}>
                  {`word = "JELLO"\nword = "H" + word[1:]   `}<span style={{ color: C.green }}># slicing to the rescue!</span>
                  {`\nprint(word)             `}<span style={{ color: C.green }}># HELLO</span>
                </pre>
              </div>

              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 4 }}>
                <div style={{ color: C.teal, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>WHAT HAPPENED IN MEMORY</div>
                <div style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center", opacity: 0.4 }}>
                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>old string</div>
                    <div style={{ padding: "10px 18px", borderRadius: 8, border: `2px dashed ${C.muted}`, fontFamily: "monospace", fontSize: 15, color: C.muted }}>"JELLO"</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>abandoned, cleaned up</div>
                  </div>
                  <div style={{ fontSize: 22, color: C.muted }}>→</div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, marginBottom: 4 }}>word</div>
                    <div style={{ padding: "10px 18px", borderRadius: 8, border: `2px solid ${C.teal}`, fontFamily: "monospace", fontSize: 15, color: C.text, background: C.teal + "14" }}>"HELLO"</div>
                    <div style={{ fontSize: 10, color: C.green, marginTop: 4 }}>brand-new string ✨</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {fixed && insight(C.purple, <>
        <strong style={{ color: C.purple }}>You never edit a string — you build a new one.</strong> The
        variable label simply moves to point at the new string; the old one is thrown away. Next unit you'll
        meet <strong style={{ color: C.accent }}>lists</strong>, Python's collection that CAN be changed in place.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: 's = "MADRAS"\nprint(s[1])\n\nWhat does this print?',
      options: ["M", "A", "D", "It causes an error"],
      answer: 1,
      explain: "Indexing starts at 0, so s[0] is 'M' and s[1] is 'A'. Slot numbers are always one behind the counting you do on your fingers!",
    },
    {
      q: 's = "FOOTHOLD"\nprint(s[2:5])\n\nWhat does this print?',
      options: ["OTH", "OTHO", "OT", "THO"],
      answer: 0,
      explain: "Slicing keeps start (2 → 'O') and stops BEFORE stop (5) — same rule as range(). Slots 2, 3, 4 give 'OTH'.",
    },
    {
      q: 's = "CHENNAI"\nprint(s[-1])\n\nWhat does this print?',
      options: ["C", "A", "I", "IndexError"],
      answer: 2,
      explain: "Negative indices count from the back: s[-1] is always the LAST character — here 'I'. s[-2] would be 'A'.",
    },
    {
      q: 'word = "COLD"\nword[0] = "G"\n\nWhat happens?',
      options: ["word becomes \"GOLD\"", "word becomes \"GCOLD\"", "Nothing — the line is ignored", "TypeError — strings are immutable"],
      answer: 3,
      explain: "Strings can't be changed in place. To get \"GOLD\" you build a new string: word = \"G\" + word[1:].",
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
          {score === 4 ? "Perfect! You can pick apart any string Python throws at you." :
            score >= 2 ? "Good work! If slicing tripped you up, replay 'Slice It' — the sliders make the stop rule stick." :
              "Worth a replay: 'Indexed Slots' for the 0-start rule and 'Slice It' for start-included / stop-excluded."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 7.1 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You can now reach inside a string: pick any character with an index, cut out pieces with a slice,
            measure it with len() — and you know why "editing" a string really means building a new one.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 7.2 — Lists.</strong> A string only holds
            characters. Sixty students' marks need a collection that holds anything — and unlike strings,
            one you can change.
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
export default function Unit7_1({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Why?" },
    { id: "slots", label: "Indexed Slots" },
    { id: "slice", label: "Slice It" },
    { id: "gotcha", label: "The Gotcha" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>One Variable, Many Letters</h3><NeedWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>A String is a Row of Slots</h3><SlotsWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Slicing: Cut Out a Piece</h3><SliceWidget /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Gotcha: Strings Never Change</h3><GotchaWidget /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions to check your understanding of Unit 7.1.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 7 › UNIT 7.1</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Strings in Depth</div>
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
