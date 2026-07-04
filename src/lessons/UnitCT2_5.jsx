import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Section 1: The Need ──────────────────────────────────────────────────────
function TheNeed() {
  const word = "PYTHON";
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Text is data too — names, roll numbers, DNA, messages. Back in Unit 7.1 you saw a string is a{" "}
        <strong style={{ color: C.text }}>sequence of characters</strong>, each at an index. That means every list
        trick you just learned works on text: loop it, index it, count things in it.
      </p>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <pre style={{ fontFamily: "monospace", fontSize: 13, color: C.accent, margin: "0 0 12px" }}>word = "PYTHON"</pre>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {word.split("").map((ch, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ minWidth: 34, background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 6, padding: "8px 4px", fontFamily: "monospace", fontWeight: 700, fontSize: 16, color: C.text }}>{ch}</div>
              <div style={{ color: C.muted, fontSize: 9, marginTop: 2 }}>{i}</div>
            </div>
          ))}
        </div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 10 }}>
          <code style={{ color: C.teal }}>word[0]</code> → "P" &nbsp;·&nbsp; <code style={{ color: C.teal }}>len(word)</code> → 6 &nbsp;·&nbsp;{" "}
          <code style={{ color: C.teal }}>for ch in word:</code> visits each letter
        </div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>A string is a read-only list of characters.</strong> You can't change
        a letter in place (Unit 7.1's immutability), but you can loop it, index it, and build a NEW string from it.
      </div>
    </div>
  );
}

// ── Section 2: Looping characters ────────────────────────────────────────────
function CharAnatomy() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Two ways to walk a string, and the classic "reverse a word" as an accumulator that grows a{" "}
        <em>new</em> string.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1px solid ${C.teal}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.teal, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>By character</div>
          <pre style={{ fontFamily: "monospace", fontSize: 11.5, color: C.text, margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>{`for ch in word:\n    print(ch)`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>When you only need the letters.</div>
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.orange}44`, borderRadius: 10, padding: 14 }}>
          <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>By index</div>
          <pre style={{ fontFamily: "monospace", fontSize: 11.5, color: C.text, margin: 0, lineHeight: 1.7, whiteSpace: "pre" }}>{`for i in range(len(word)):\n    print(word[i])`}</pre>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>When you need the position too.</div>
        </div>
      </div>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.green, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Reverse a word — accumulate a new string</div>
        <pre style={{ fontFamily: "monospace", fontSize: 12, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre" }}>{`rev = ""\nfor ch in word:\n    rev = ch + rev      # each new letter goes in FRONT\nprint(rev)`}</pre>
      </div>

      <div style={{ background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>rev = ch + rev</strong> puts each letter before what's built so far, so
        the string comes out backwards. Same accumulator idea as summing — just with strings.
      </div>
    </div>
  );
}

// ── Section 3: Palindrome stepper (two-pointer) ──────────────────────────────
const WORD = "MADAM";
const PAL_STEPS = (() => {
  const w = WORD;
  const steps = [];
  let left = 0, right = w.length - 1;
  while (left < right) {
    const match = w[left] === w[right];
    steps.push({ left, right, match, desc: `Compare word[${left}]='${w[left]}' with word[${right}]='${w[right]}' → ${match ? "match ✓" : "mismatch ✗ → NOT a palindrome"}.` });
    if (!match) break;
    left++; right--;
  }
  steps.push({ left, right, done: true, match: true, desc: "Pointers met in the middle with no mismatch → it IS a palindrome." });
  return steps;
})();

function PalindromeStepper() {
  const [step, setStep] = useState(0);
  const s = PAL_STEPS[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 12, lineHeight: 1.7 }}>
        A <strong style={{ color: C.text }}>palindrome</strong> reads the same forwards and backwards. Check it with
        two pointers: one from each end, walking inward, comparing as they go. Word: <code style={{ color: C.accent }}>"MADAM"</code>.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button onClick={() => setStep((x) => Math.min(PAL_STEPS.length - 1, x + 1))} disabled={step === PAL_STEPS.length - 1} style={{
          flex: 1, padding: "10px", borderRadius: 8, background: step === PAL_STEPS.length - 1 ? C.card : C.accentGlow,
          border: "none", color: step === PAL_STEPS.length - 1 ? C.muted : "#fff", fontWeight: 600, fontSize: 13,
          cursor: step === PAL_STEPS.length - 1 ? "default" : "pointer",
        }}>Step ▶ ({step + 1} / {PAL_STEPS.length})</button>
        <button onClick={() => setStep(0)} style={{
          padding: "10px 18px", borderRadius: 8, background: C.card, border: `1.5px solid ${C.border}`,
          color: C.muted, fontWeight: 600, fontSize: 13, cursor: "pointer",
        }}>↺ Reset</button>
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 14 }}>
        {WORD.split("").map((ch, i) => {
          const isL = i === s.left, isR = i === s.right;
          const active = (isL || isR) && !s.done;
          let bg = C.card, border = C.border, col = C.text;
          if (active) { bg = (s.match ? C.green : C.red) + "22"; border = s.match ? C.green : C.red; col = s.match ? C.green : C.red; }
          return (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ minWidth: 44, borderRadius: 8, padding: "12px 6px", background: bg, border: `2px solid ${border}`, fontFamily: "monospace", fontWeight: 700, fontSize: 20, color: col }}>{ch}</div>
              <div style={{ color: C.muted, fontSize: 10, marginTop: 2, height: 12 }}>{!s.done && isL ? "left" : !s.done && isR ? "right" : ""}</div>
            </div>
          );
        })}
      </div>

      <div style={{ background: (s.match ? C.green : C.red) + "12", border: `1px solid ${(s.match ? C.green : C.red)}33`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.text, minHeight: 44 }}>
        {s.done ? "✅ " : ""}{s.desc}
      </div>

      <div style={{ marginTop: 14, background: C.purple + "15", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>Two pointers beat reversing-and-comparing:</strong> you can stop at
        the first mismatch, and you never build a second string. Same trick sorts, searches and merges use.
      </div>
    </div>
  );
}

// ── Section 4: Text toolkit ──────────────────────────────────────────────────
function TextToolkit() {
  const [mode, setMode] = useState("reverse");
  const sample = "banana";
  const sentence = "the cat sat";
  const modes = {
    reverse: {
      label: "Reverse", color: C.green, out: `"ananab"`,
      code: 'rev = ""\nfor ch in word:\n    rev = ch + rev\nprint(rev)',
      note: 'Grow a new string, each letter in front. "banana" → "ananab".',
    },
    vowels: {
      label: "Count vowels", color: C.teal, out: "3",
      code: 'vowels = "aeiou"\ncount = 0\nfor ch in word:\n    if ch in vowels:\n        count = count + 1\nprint(count)',
      note: 'A conditional accumulator: +1 only when the letter is in "aeiou". "banana" has 3.',
    },
    words: {
      label: "Word count", color: C.orange, out: "3",
      code: 'parts = text.split()\nprint(len(parts))',
      note: 'split() breaks text on spaces into a list of words; len() counts them. "the cat sat" → 3.',
    },
    freq: {
      label: "Char frequency", color: C.purple, out: "{'b':1, 'a':3, 'n':2}",
      code: 'freq = {}\nfor ch in word:\n    if ch in freq:\n        freq[ch] = freq[ch] + 1\n    else:\n        freq[ch] = 1\nprint(freq)',
      note: "A dictionary (Unit 7.4) as a tally: first sighting sets 1, repeats add 1.",
    },
  };
  const m = modes[mode];
  const shown = mode === "words" ? sentence : sample;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Four classic string programs. Input:{" "}
        <code style={{ color: C.accent }}>{mode === "words" ? `"${sentence}"` : `"${sample}"`}</code>.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(modes).map(([k, mv]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, minWidth: 90, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: mode === k ? mv.color + "22" : C.card,
            border: `1.5px solid ${mode === k ? mv.color : C.border}`, color: mode === k ? mv.color : C.muted,
          }}>{mv.label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14 }}>
        <pre style={{ background: C.card, border: `1px solid ${m.color}55`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 11.5, color: C.text, lineHeight: 1.75, margin: 0, whiteSpace: "pre" }}>{m.code}</pre>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 8 }}>OUTPUT</div>
            <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 700, color: m.color, wordBreak: "break-all" }}>{m.out}</div>
          </div>
          <div style={{ background: m.color + "14", border: `1px solid ${m.color}44`, borderRadius: 10, padding: "10px 12px", fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>
            {m.note}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Text = a sequence you loop.</strong> Reverse is an accumulator, vowel
        count is a conditional accumulator, frequency is a dictionary tally. All patterns you already own.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "How does  rev = ch + rev  reverse a string?",
      options: [
        "It sorts the letters",
        "Each new character is placed in FRONT of what's built so far, flipping the order",
        "It removes duplicates",
        "It only works on numbers",
      ],
      answer: 1,
      explain: 'Putting ch before rev each round means the last letter read ends up first. "cat" → "c" → "ac" → "tac".',
    },
    {
      q: "The palindrome check uses two pointers walking inward. What lets it stop early?",
      options: [
        "It never stops early",
        "The first time two compared characters differ, it's already not a palindrome — break",
        "It reverses the string first",
        "It counts vowels",
      ],
      answer: 1,
      explain: "One mismatch is enough to disprove a palindrome, so the loop breaks immediately — no need to check the rest.",
    },
    {
      q: "For counting vowels, why  if ch in vowels?",
      options: [
        "To sort the vowels",
        'It tests membership — is this character one of "aeiou"? — and only then does count += 1',
        "It reverses the word",
        "It splits the word",
      ],
      answer: 1,
      explain: '`in` checks whether ch appears in the string "aeiou". It turns the vowel test into one clean condition on a conditional accumulator.',
    },
    {
      q: "Character frequency stores counts in a dictionary. Why check  if ch in freq  first?",
      options: [
        "To sort the dictionary",
        "To decide: seen before → add 1 to its count; brand new → start it at 1",
        "Dictionaries need sorting",
        "To reverse the key",
      ],
      answer: 1,
      explain: "A new character has no entry yet, so freq[ch] would error if you added to it. The `in` check picks between 'start at 1' and 'increment' — the tally pattern from Unit 7.4.",
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
          {score === 4 ? "You can treat any text as a loopable sequence of characters." :
            score >= 2 ? "Good — replay the Palindrome Stepper to lock in two-pointers." :
              "Revisit Looping Characters and the Palindrome Stepper, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 CT II · Content Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Scan, search, sort, matrices, and now string algorithms — the whole toolkit of algorithms on data.<br /><br />
            <strong style={{ color: C.orange }}>Next up (optional): 🔥 The Crucible.</strong> Predict, hunt bugs,
            assemble and write real Python across searching, sorting and strings.
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
export default function UnitCT2_5({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "chars", label: "Looping Characters" },
    { id: "pal", label: "Palindrome Stepper" },
    { id: "toolkit", label: "Text Toolkit" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Text Is a Sequence Too</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Looping Characters</h3><CharAnatomy /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>See It: Palindrome Check</h3><PalindromeStepper /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Text Toolkit</h3><TextToolkit /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on string algorithms.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>COMPUTATIONAL THINKING II › UNIT 5</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>String Algorithms</div>
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
