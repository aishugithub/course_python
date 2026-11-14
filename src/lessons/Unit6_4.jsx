// Unit 6.4 — Capstone: Number-Guessing Game (rebuilt on the typing-first lesson kit)
// The Mission → Version 1 (one guess) → Version 2 (loop until right) →
// Version 3 (count attempts, limit 7) → Play It → Make It (multiplication quiz).
// Tests fix random.randint through `setup`, so every secret is known to the checker.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const secretIs = (n) => `import random\nrandom.randint = lambda a, b: ${n}`;
const sequence = (arr) => `import random\n_seq = iter(${JSON.stringify(arr)})\nrandom.randint = lambda a, b: next(_seq)`;

// ── Widget: tools for the mission ──
function Mission() {
  const rows = [
    ["Pick a secret number 1–50", "import random, random.randint(1, 50)", "new (like import math, 4.4)"],
    ["Read the player's guess", "int(input(...))", "4.3"],
    ["Say too low / too high / correct", "if / elif / else", "5.2"],
    ["Keep going until they get it", "while True + break", "6.1, 6.3"],
    ["Count the attempts", "counter: attempts += 1", "6.1"],
    ["Give up after 7 tries", "for … range(7) + a flag", "6.2, 6.3"],
  ];
  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", maxWidth: 940 }}>
      {rows.map(([need, tool, unit], i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 1.8fr 1fr", gap: 10, padding: "10px 14px", background: i % 2 ? T.surface : T.card, fontSize: 14.5, alignItems: "center" }}>
          <span>{need}</span><code style={{ justifySelf: "start" }}>{tool}</code><span style={{ color: T.bronze, fontWeight: 700 }}>{unit}</span>
        </div>
      ))}
    </div>
  );
}

// ── Widget: play the finished game ──
function PlayIt() {
  const fresh = () => ({ secret: 1 + Math.floor(Math.random() * 50), log: [], over: false });
  const [g, setG] = useState(fresh);
  const [val, setVal] = useState("");
  const guess = () => {
    const n = parseInt(val, 10);
    if (Number.isNaN(n) || g.over) return;
    const tries = g.log.length + 1;
    let msg = n < g.secret ? "Too low" : n > g.secret ? "Too high" : `Correct! You took ${tries} attempts.`;
    let over = n === g.secret;
    if (!over && tries === 7) { msg += `\nOut of attempts! The number was ${g.secret}`; over = true; }
    setG({ ...g, log: [...g.log, `Your guess: ${n}\n${msg}`], over });
    setVal("");
  };
  return (
    <div className="fh-two">
      <div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && guess()} disabled={g.over} placeholder="1–50"
            style={{ width: 110, padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.borderStrong}`, fontFamily: CODE_FONT, fontSize: 16 }} />
          <button onClick={guess} disabled={g.over} style={{ padding: "9px 16px", borderRadius: 8, border: "none", background: g.over ? T.borderStrong : T.navy, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Guess</button>
          <button onClick={() => { setG(fresh()); setVal(""); }} style={{ padding: "9px 14px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, cursor: "pointer", fontFamily: "inherit" }}>New game</button>
        </div>
        <div style={{ fontSize: 13.5, color: T.slate, marginTop: 10, lineHeight: 1.6 }}>Best strategy? Always guess the middle of what's left: 25, then 12 or 37… You can always win in 6 guesses. That idea is called <strong>binary search</strong> — you'll meet it in Computational Thinking II.</div>
      </div>
      <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.6, background: T.termBg, color: T.termText, borderRadius: 10, padding: "12px 14px", minHeight: 150, maxHeight: 300, overflow: "auto" }}>{g.log.join("\n") || "I'm thinking of a number between 1 and 50..."}</pre>
    </div>
  );
}

// ── Exercise specs ──
const V1 = 'import random\nsecret = random.randint(1, 50)\nguess = int(input("Your guess: "))\nif guess == secret:\n    print("Correct!")\nelif guess < secret:\n    print("Too low")\nelse:\n    print("Too high")';
const V2 = 'import random\nsecret = random.randint(1, 50)\nwhile True:\n    guess = int(input("Your guess: "))\n    if guess == secret:\n        print("Correct!")\n        break\n    elif guess < secret:\n        print("Too low")\n    else:\n        print("Too high")';
const V3 = 'import random\nsecret = random.randint(1, 50)\nwon = False\nfor attempt in range(1, 8):\n    guess = int(input("Your guess: "))\n    if guess == secret:\n        print(f"Correct! You took {attempt} attempts.")\n        won = True\n        break\n    elif guess < secret:\n        print("Too low")\n    else:\n        print("Too high")\nif not won:\n    print(f"Out of attempts! The number was {secret}")';
const play = (secret, guesses, limit = Infinity, counted = false) => {
  const out = [];
  for (let k = 0; k < guesses.length; k++) {
    const g = guesses[k];
    out.push(`Your guess: ${g}`);
    if (g === secret) { out.push(counted ? `Correct! You took ${k + 1} attempts.` : "Correct!"); return out.join("\n"); }
    out.push(g < secret ? "Too low" : "Too high");
    if (k + 1 === limit) { out.push(`Out of attempts! The number was ${secret}`); return out.join("\n"); }
  }
  return out.join("\n");
};
const quiz = (pairs, answers) => {
  const out = []; let score = 0;
  pairs.forEach(([a, b], i) => {
    out.push(`${a} x ${b} = ${answers[i]}`);
    if (Number(answers[i]) === a * b) { out.push("Correct!"); score++; } else out.push(`Wrong, it is ${a * b}`);
  });
  out.push(`Score: ${score}/${pairs.length}`);
  return out.join("\n");
};
const P1 = [[3, 4], [6, 7], [8, 9], [2, 5], [7, 7]];
const P2 = [[9, 9], [4, 6], [5, 5], [8, 3], [6, 6]];

const EX = {
  v1: {
    id: "v1", kind: "write", title: "Version 1 — one guess",
    task: <>Write <code>import random</code> and pick the secret with <code>random.randint(1, 50)</code> — unlike range, <strong>both ends are included</strong>. Ask <code>Your guess: </code> once and print <code>Correct!</code>, <code>Too low</code> or <code>Too high</code>. (The checker secretly fixes the “random” number, so it can test you.)</>,
    minLines: 9,
    tests: [
      { setup: secretIs(37), inputs: ["20"], expect: "Your guess: 20\nToo low" },
      { setup: secretIs(12), inputs: ["12"], expect: "Your guess: 12\nCorrect!", hidden: true },
      { setup: secretIs(5), inputs: ["40"], expect: "Your guess: 40\nToo high", hidden: true },
    ],
    requires: [{ call: "randint", msg: "Pick the secret with random.randint(1, 50)." }],
    hints: ["import random on the first line, then secret = random.randint(1, 50)", "if guess == secret: … elif guess < secret: … else: …"],
    solution: V1,
  },
  v2: {
    id: "v2", kind: "modify", title: "Version 2 — keep guessing",
    task: <>One guess isn't a game. Wrap the guessing in <code>while True:</code> so the player keeps going, and <code>break</code> when they're right. Everything that repeats goes inside the loop — but the secret must be picked only once, before it.</>,
    starter: V1,
    minLines: 12,
    tests: [
      { setup: secretIs(37), inputs: ["20", "45", "37"], expect: play(37, [20, 45, 37]) },
      { setup: secretIs(8), inputs: ["8"], expect: play(8, [8]), hidden: true },
      { setup: sequence([50, ...Array(30).fill(7)]), inputs: ["25", "40", "49", "50"], expect: play(50, [25, 40, 49, 50]), hidden: true,
        why: "Is random.randint called inside the loop? Then the secret changes after every guess — pick it once, before the loop." },
    ],
    requires: [{ node: "While" }, { node: "Break" }],
    hints: ["Select the input line and the if/elif/else, press Tab to indent them under while True:", "Add break right after print(\"Correct!\")."],
    solution: V2,
  },
  v3: {
    id: "v3", kind: "modify", title: "Version 3 — count, and a limit of 7",
    task: <>Give the player at most <strong>7</strong> attempts. Switch to <code>for attempt in range(1, 8):</code>. When they win, print <code>Correct! You took 3 attempts.</code> If all 7 miss, print <code>Out of attempts! The number was 37</code> after the loop. You'll need the flag pattern from Unit 6.3.</>,
    starter: V2,
    minLines: 16,
    tests: [
      { setup: secretIs(37), inputs: ["20", "45", "37"], expect: play(37, [20, 45, 37], 7, true) },
      { setup: secretIs(37), inputs: ["1", "2", "3", "4", "5", "6", "7"], expect: play(37, [1, 2, 3, 4, 5, 6, 7], 7, true), hidden: true },
      { setup: sequence([9, ...Array(30).fill(44)]), inputs: ["50", "40", "30", "20", "10", "8", "9"], expect: play(9, [50, 40, 30, 20, 10, 8, 9], 7, true), hidden: true,
        why: "Is random.randint called inside the loop? Pick the secret once, before the loop." },
    ],
    requires: [{ node: "For", msg: "Use for attempt in range(1, 8) to limit the attempts." }, { node: "Break" }],
    forbids: [{ node: "While", msg: "Replace while True with the for loop." }],
    hints: ["won = False before the loop; won = True just before break.", "range(1, 8) makes attempt count 1 to 7 — use it in the f-string.", "After the loop (no indent): if not won: print(f\"Out of attempts! The number was {secret}\")"],
    solution: V3,
  },
  mathquiz: {
    id: "mathquiz", kind: "make", title: "Multiplication quiz",
    task: <>Ask 5 questions. For each, pick <code>a</code> and <code>b</code> with <code>random.randint(2, 9)</code> (first a, then b), ask <code>3 x 4 = </code> (an f-string prompt), and print <code>Correct!</code> or <code>Wrong, it is 12</code>. At the end print <code>Score: 4/5</code>.</>,
    minLines: 12,
    tests: [
      { setup: sequence(P1.flat()), inputs: ["12", "42", "71", "10", "49"], expect: quiz(P1, ["12", "42", "71", "10", "49"]) },
      { setup: sequence(P2.flat()), inputs: ["81", "24", "25", "24", "36"], expect: quiz(P2, ["81", "24", "25", "24", "36"]), hidden: true },
      { setup: sequence(P1.flat()), inputs: ["0", "0", "0", "0", "0"], expect: quiz(P1, ["0", "0", "0", "0", "0"]), hidden: true },
    ],
    requires: [{ node: "For" }, { call: "randint", min: 2, msg: "Pick a and b with random.randint(2, 9)." }],
    hints: ["score = 0 before the loop; for q in range(5): …", 'answer = int(input(f"{a} x {b} = "))', "if answer == a * b: score += 1 …"],
    solution: 'import random\nscore = 0\nfor q in range(5):\n    a = random.randint(2, 9)\n    b = random.randint(2, 9)\n    answer = int(input(f"{a} x {b} = "))\n    if answer == a * b:\n        print("Correct!")\n        score += 1\n    else:\n        print(f"Wrong, it is {a * b}")\nprint(f"Score: {score}/5")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "random.randint(1, 50) vs range(1, 50): what's different at the top?", options: ["Nothing", "randint can return 50; range stops at 49", "range includes 50; randint doesn't", "Both exclude 50"], answer: 1, explain: "randint includes both ends. range never includes its stop value." },
  { q: "Why is secret = random.randint(1, 50) written BEFORE the loop?", options: ["Style", "Inside the loop the secret would change after every guess", "random needs it", "No reason"], answer: 1, explain: "Anything inside the loop runs every round. Pick the secret once." },
  { q: "In Version 2, what ends while True?", options: ["The condition becoming False", "break, when the guess is correct", "7 guesses", "Nothing"], answer: 1, explain: "while True never becomes False; only break can leave it." },
  { q: "In Version 3, why is the flag won needed?", options: ["To count attempts", "After the loop, to tell a win (break) from running out of attempts", "Python requires it", "To pick the secret"], answer: 1, explain: "Both endings leave the loop; the flag records which one happened." },
  { q: "What's the most guesses binary search needs for 1–50?", options: ["50", "25", "6", "1"], answer: 2, explain: "Halving each time: 50 → 25 → 12 → 6 → 3 → 1 … 2⁶ = 64 ≥ 50, so 6 guesses always suffice." },
];

export default function Unit6_4(props) {
  const sections = [
    {
      label: "The Mission", kicker: "CAPSTONE", title: "Number-Guessing Game",
      blocks: [
        <P>The computer secretly picks a number from 1 to 50; the player hunts it down with “too low / too high” clues. You'll build it in three versions, each adding one idea. Every tool you need:</P>,
        <Mission />,
        <Note color={T.blue} icon="🎲">Random numbers make testing hard — the answer changes every run. The checker quietly replaces <code>random.randint</code> with a known number for each test (a different one for each hidden test), so your game can be checked fairly.</Note>,
      ],
    },
    { label: "Version 1", kicker: "BUILD IN STEPS", title: "Version 1: one guess", blocks: [EX.v1] },
    { label: "Version 2", kicker: "ADD ONE IDEA", title: "Version 2: loop until it's right", blocks: [EX.v2] },
    {
      label: "Version 3", kicker: "ADD ONE MORE", title: "Version 3: attempts and a limit",
      blocks: [EX.v3, <KeyIdea>Notice the journey: Module 5 gave one guess, <code>while True</code> made it a game, <code>for</code> + a flag made it fair. Each version stayed working while it grew — that's how real programs are built.</KeyIdea>],
    },
    { label: "Play It", kicker: "EXPLORE", title: "Play the finished game", blocks: [<PlayIt />] },
    {
      label: "Make It", kicker: "ON YOUR OWN", title: "Your program: multiplication quiz",
      blocks: [<P>random, a for loop, an f-string prompt, if/else and a score counter — from a blank editor.</P>, EX.mathquiz],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit6_4" crumb="MODULE 6 › UNIT 6.4" title="Capstone: Number-Guessing Game" sections={sections} quiz={QUIZ}
      next={{ title: "Computational Thinking I", text: "Module 6 complete! Next: turning problems into algorithms — the four moves behind every program. (Optional first: Module 6's Crucible.)" }} />
  );
}
