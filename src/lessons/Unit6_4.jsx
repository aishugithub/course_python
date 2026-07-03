import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── The Mission ──────────────────────────────────────────────────────────────
function Mission() {
  const tools = [
    { name: "if / elif / else", from: "Module 5", use: "Give the hint: too high, too low, or correct", color: C.accent },
    { name: "while loop", from: "Unit 6.1", use: "Keep the game going until the player wins", color: C.teal },
    { name: "break", from: "Unit 6.3", use: "End the game the moment the guess is right", color: C.red },
    { name: "counter variable", from: "Unit 6.1", use: "Count how many attempts the player needed", color: C.yellow },
    { name: "input() + int()", from: "Unit 4.3", use: "Read the player's guess from the keyboard", color: C.purple },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Time to build a REAL program — a game people can actually play. The computer picks a secret number
        from 1 to 50. The player keeps guessing; after every guess the program says "too high" or "too low",
        until the player nails it — then it reveals how many attempts they took.
      </p>

      <div style={{ background: C.card, border: `1.5px solid ${C.accent}44`, borderRadius: 10, padding: 16, marginBottom: 16, fontFamily: "monospace", fontSize: 13, color: C.text, lineHeight: 1.9 }}>
        <span style={{ color: C.muted }}># A sample game:</span><br />
        Your guess: <span style={{ color: C.accent }}>25</span> → Too low!<br />
        Your guess: <span style={{ color: C.accent }}>40</span> → Too high!<br />
        Your guess: <span style={{ color: C.accent }}>33</span> → Too low!<br />
        Your guess: <span style={{ color: C.accent }}>36</span> → <span style={{ color: C.green }}>Correct in 4 tries! 🎉</span>
      </div>

      <div style={{ color: C.muted, fontSize: 12, letterSpacing: 1, marginBottom: 10 }}>EVERY TOOL YOU NEED — YOU ALREADY HAVE:</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tools.map((t) => (
          <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px" }}>
            <code style={{ color: t.color, fontSize: 13, fontWeight: 700, minWidth: 150 }}>{t.name}</code>
            <span style={{ color: C.muted, fontSize: 11, minWidth: 70 }}>{t.from}</span>
            <span style={{ color: C.text, fontSize: 12 }}>{t.use}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.purple }}>Plus one sneak peek:</strong>{" "}
        <code style={{ color: C.purple }}>random.randint(1, 50)</code> — a one-line borrow from Python's random
        module so the computer can pick a secret number. We'll explore modules properly in Module 8.
      </div>
    </div>
  );
}

// ── Build In Steps ───────────────────────────────────────────────────────────
function BuildSteps() {
  const [step, setStep] = useState(0);

  const versions = [
    {
      title: "v1 — One guess only (Module 5 skills)",
      code: `import random\nsecret = random.randint(1, 50)\n\nguess = int(input("Your guess: "))\nif guess < secret:\n    print("Too low!")\nelif guess > secret:\n    print("Too high!")\nelse:\n    print("Correct!")`,
      note: "With ONLY Module 5 tools, the player gets a single guess and the program ends. A game with one turn is barely a game — this is exactly the wall that loops break down.",
      color: C.yellow,
    },
    {
      title: "v2 — Loop until correct (add while + break)",
      code: `import random\nsecret = random.randint(1, 50)\n\nwhile True:\n    guess = int(input("Your guess: "))\n    if guess < secret:\n        print("Too low!")\n    elif guess > secret:\n        print("Too high!")\n    else:\n        print("Correct!")\n        break`,
      note: "while True is a loop whose condition is ALWAYS True — deliberately infinite. The only exit is break, which fires exactly when the guess is right. This 'loop forever, break on success' pattern is everywhere in real software: menus, login prompts, game loops.",
      color: C.teal,
    },
    {
      title: "v3 — Count the attempts (add a counter)",
      code: `import random\nsecret = random.randint(1, 50)\nattempts = 0\n\nwhile True:\n    guess = int(input("Your guess: "))\n    attempts = attempts + 1\n    if guess < secret:\n        print("Too low!")\n    elif guess > secret:\n        print("Too high!")\n    else:\n        print("Correct in", attempts, "tries!")\n        break`,
      note: "The counter starts at 0 BEFORE the loop and ticks up once per guess, inside the loop — the same create-before / update-inside pattern from Unit 6.1. Fourteen lines, and it's a complete, playable game.",
      color: C.green,
    },
  ];
  const v = versions[step];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Real programmers never write the final program in one go — they build a tiny version, test it, and
        grow it. Walk through the three versions.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {versions.map((ver, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            flex: 1, padding: "8px 6px", borderRadius: 8,
            background: step === i ? ver.color + "26" : C.card,
            border: `1.5px solid ${step === i ? ver.color : C.border}`,
            color: step === i ? ver.color : C.muted, fontWeight: 600, fontSize: 12, cursor: "pointer",
            transition: "all 0.2s",
          }}>v{i + 1}</button>
        ))}
      </div>

      <div style={{ color: v.color, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>{v.title}</div>
      <pre style={{ background: C.card, border: `1.5px solid ${v.color}44`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.8, margin: 0 }}>{v.code}</pre>

      <div style={{ marginTop: 12, background: v.color + "12", border: `1px solid ${v.color}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        {v.note}
      </div>
    </div>
  );
}

// ── Play It ──────────────────────────────────────────────────────────────────
function PlayIt() {
  const newSecret = () => Math.floor(Math.random() * 50) + 1;
  const [secret, setSecret] = useState(newSecret);
  const [guess, setGuess] = useState("");
  const [log, setLog] = useState([]);
  const [won, setWon] = useState(false);

  const submit = () => {
    const g = Number(guess);
    if (!guess || Number.isNaN(g) || g < 1 || g > 50) return;
    if (g < secret) setLog((p) => [...p, { g, hint: "Too low!", color: C.yellow }]);
    else if (g > secret) setLog((p) => [...p, { g, hint: "Too high!", color: C.orange }]);
    else { setLog((p) => [...p, { g, hint: `Correct in ${log.length + 1} tries! 🎉`, color: C.green }]); setWon(true); }
    setGuess("");
  };
  const reset = () => { setSecret(newSecret()); setLog([]); setWon(false); setGuess(""); };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        This widget runs the exact logic of the Python program you just built. The secret is between 1 and 50 —
        play a round, and notice how the "too high / too low" hints let you close in FAST.
      </p>

      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 13, maxHeight: 220, overflowY: "auto", marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 1, marginBottom: 8 }}>GAME</div>
        {log.length === 0 && <div style={{ color: C.muted }}>&gt; I'm thinking of a number from 1 to 50...</div>}
        {log.map((l, i) => (
          <div key={i} style={{ marginBottom: 4 }}>
            <span style={{ color: C.muted }}>Your guess: </span>
            <span style={{ color: C.accent }}>{l.g}</span>
            <span style={{ color: l.color }}> → {l.hint}</span>
          </div>
        ))}
      </div>

      {!won ? (
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="number" min={1} max={50} value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="1 – 50"
            style={{
              flex: 1, padding: "10px 14px", borderRadius: 8, background: C.card,
              border: `1.5px solid ${C.border}`, color: C.text, fontSize: 14, fontFamily: "monospace", outline: "none",
            }}
          />
          <button onClick={submit} style={{
            padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none",
            color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>Guess</button>
        </div>
      ) : (
        <button onClick={reset} style={{
          width: "100%", padding: "12px", borderRadius: 8, background: C.green + "22",
          border: `1.5px solid ${C.green}`, color: C.green, fontWeight: 700, fontSize: 14, cursor: "pointer",
        }}>🎉 You won in {log.length} tries — Play Again?</button>
      )}

      <div style={{ marginTop: 16, background: C.accent + "18", border: `1px solid ${C.accent}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.accent }}>Strategy secret:</strong> if you always guess the MIDDLE of what's
        left, 50 numbers never need more than 6 guesses. That idea — halve the problem each round — is called{" "}
        <strong style={{ color: C.accent }}>binary search</strong>, one of the most famous algorithms in
        computer science. You just discovered it by playing.
      </div>
    </div>
  );
}

// ── Full Code ────────────────────────────────────────────────────────────────
function FullCode() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Here's the complete program — type it into a real Python file (guess.py) and run it in your terminal
        with <code style={{ color: C.accent }}>python guess.py</code>. This is no longer an exercise; it's
        software you wrote.
      </p>

      <pre style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, fontFamily: "monospace", fontSize: 13, lineHeight: 2, margin: 0 }}>
        <span style={{ color: C.purple }}>import random</span>{"                          "}<span style={{ color: C.muted }}># borrow the random module</span>{"\n\n"}
        <span style={{ color: C.text }}>secret = random.randint(1, 50)</span>{"         "}<span style={{ color: C.muted }}># 1 and 50 BOTH included</span>{"\n"}
        <span style={{ color: C.text }}>attempts = 0</span>{"\n\n"}
        <span style={{ color: C.teal }}>while True:</span>{"\n"}
        {"    "}<span style={{ color: C.text }}>guess = int(input("Your guess: "))</span>{"\n"}
        {"    "}<span style={{ color: C.text }}>attempts = attempts + 1</span>{"\n"}
        {"    "}<span style={{ color: C.accent }}>if guess &lt; secret:</span>{"\n"}
        {"        "}<span style={{ color: C.text }}>print("Too low!")</span>{"\n"}
        {"    "}<span style={{ color: C.accent }}>elif guess &gt; secret:</span>{"\n"}
        {"        "}<span style={{ color: C.text }}>print("Too high!")</span>{"\n"}
        {"    "}<span style={{ color: C.accent }}>else:</span>{"\n"}
        {"        "}<span style={{ color: C.text }}>print("Correct in", attempts, "tries!")</span>{"\n"}
        {"        "}<span style={{ color: C.red }}>break</span>
      </pre>

      <div style={{ marginTop: 14, background: C.yellow + "15", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        ⚠️ <strong style={{ color: C.yellow }}>One subtle detail:</strong>{" "}
        <code style={{ color: C.yellow }}>random.randint(1, 50)</code> includes BOTH ends — it can return 50.
        But <code style={{ color: C.yellow }}>range(1, 50)</code> stops at 49. Python's two "give me numbers"
        tools disagree about the endpoint — a classic gotcha worth remembering.
      </div>

      <div style={{ marginTop: 12, background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        💪 <strong style={{ color: C.green }}>Challenge upgrades</strong> (try them for real!): ① limit the
        player to 7 attempts using the counter and break, ② after each game ask "play again? (y/n)" — that's a
        loop AROUND the game loop, ③ scold guesses outside 1–50 with continue.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "Why does the game use while True instead of for i in range(...)?",
      options: ["while True runs faster", "The number of guesses can't be known in advance — the loop must run 'until correct'", "for loops can't contain if statements", "range() can't produce numbers up to 50"],
      answer: 1,
      explain: "You can't predict how many guesses a player needs, so a count-based for loop doesn't fit. 'Repeat until something happens' is exactly the while shape — with break as the exit.",
    },
    {
      q: "In the finished game, what exactly triggers break?",
      options: ["The player typing 'quit'", "The guess being equal to the secret — the else branch", "attempts reaching 50", "It runs after every guess"],
      answer: 1,
      explain: "The if/elif handle wrong guesses. Only when neither fires — guess == secret — does the else run, print the win message, and break out of the otherwise-infinite loop.",
    },
    {
      q: "Why is attempts = 0 written BEFORE the loop, but attempts = attempts + 1 INSIDE it?",
      options: ["Both could go anywhere", "Create once before, update every round inside — otherwise it would reset to 0 on every guess", "Python requires counters to be defined twice", "To make the code longer"],
      answer: 1,
      explain: "If attempts = 0 were inside the loop, every guess would reset the count back to zero. Create-before, update-inside — the counter pattern from Unit 6.1, now in a real program.",
    },
    {
      q: "random.randint(1, 50) vs range(1, 50) — what's the difference at the top end?",
      options: ["No difference", "randint can return 50; range stops at 49", "range can produce 50; randint stops at 49", "Both stop at 49"],
      answer: 1,
      explain: "randint includes both endpoints (1 and 50). range excludes its stop value (last value 49). Two number tools, two endpoint rules — a favourite source of off-by-one bugs.",
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
        <div style={{ fontSize: 52 }}>🏆</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {score} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {score === 4 ? "Perfect capstone finish!" :
            score >= 2 ? "Solid — skim the Build-in-Steps section once more to cement the patterns." :
              "Walk through the three versions again — each one adds a single idea."}
        </div>
        <div style={{
          padding: "24px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.green}22, ${C.accentGlow}22)`,
          border: `1px solid ${C.green}55`,
        }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>🎓 Module 6 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.8 }}>
            Your programs can now decide (Module 5) AND repeat (Module 6) — and you've shipped a real game to
            prove it. Two of the four superpowers down.<br /><br />
            <strong style={{ color: C.accent }}>Next: Module 7 — Organizing Data.</strong>{" "}
            One score is a variable. Sixty students' scores? For that you need strings, lists, tuples and
            dictionaries — data that lives in collections, and loops that walk through them.
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
export default function Unit6_4({ student, onUnitComplete }) {
  const sections = [
    { id: "mission", label: "The Mission" },
    { id: "build", label: "Build in Steps" },
    { id: "play", label: "Play It" },
    { id: "code", label: "Full Code" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Capstone Mission: The Number-Guessing Game</h3>
      <Mission />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Build It in Three Versions</h3>
      <BuildSteps />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Play Your Program</h3>
      <PlayIt />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>The Complete Program</h3>
      <FullCode />
    </div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Final Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>
        4 questions on the capstone — and on everything Module 6 taught you.
      </p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 6 › UNIT 6.4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Capstone: Number-Guessing Game</div>
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
