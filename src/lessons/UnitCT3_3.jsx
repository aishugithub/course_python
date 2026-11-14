// Unit CT3.3 — Tower of Hanoi (rebuilt, typing-first)
// The puzzle (playable) → the insight: move n-1, move the biggest, move n-1
// → print the moves → count them (2^n - 1) → staircase ways → all binary
// strings of length n (branching recursion) make-task.

import { useState } from "react";
import LessonShell, { P, KeyIdea } from "../kit/Lesson.jsx";
import { T, CODE_FONT, tint } from "../kit/theme.js";

const comments = (min) => ({ text: "#", min, msg: `Name the base case and the recursive case in at least ${min} # comment lines.` });
const hanoiMoves = (n, a = "A", c = "C", b = "B", out = []) => { if (n === 0) return out; hanoiMoves(n - 1, a, b, c, out); out.push(`Move disk ${n} from ${a} to ${c}`); hanoiMoves(n - 1, b, c, a, out); return out; };
const ways = (n) => { const w = [1, 1]; for (let i = 2; i <= n; i++) w.push(w[i - 1] + w[i - 2]); return w[n]; };
const bins = (n) => Array.from({ length: 2 ** n }, (_, i) => i.toString(2).padStart(n, "0"));

// ── Widget: play Hanoi with 3 disks ──
function Play() {
  const start = { A: [3, 2, 1], B: [], C: [] };
  const [pegs, setPegs] = useState(start);
  const [from, setFrom] = useState(null);
  const [moves, setMoves] = useState(0);
  const [msg, setMsg] = useState("Click a peg to pick up its top disk, then another peg to drop it.");
  const click = (p) => {
    if (from === null) { if (!pegs[p].length) return; setFrom(p); setMsg(`Picked disk ${pegs[p][pegs[p].length - 1]} from ${p}.`); return; }
    if (p === from) { setFrom(null); setMsg("Put it back."); return; }
    const d = pegs[from][pegs[from].length - 1], top = pegs[p][pegs[p].length - 1];
    if (top !== undefined && top < d) { setMsg(`Not allowed: disk ${d} can't go on the smaller disk ${top}.`); setFrom(null); return; }
    const next = { ...pegs, [from]: pegs[from].slice(0, -1), [p]: [...pegs[p], d] };
    setPegs(next); setFrom(null); setMoves(moves + 1);
    setMsg(next.C.length === 3 ? `Solved in ${moves + 1} moves${moves + 1 === 7 ? " — the minimum!" : " (the minimum is 7)."}` : `Moved disk ${d} from ${from} to ${p}.`);
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 14 }}>
        {["A", "B", "C"].map((p) => (
          <button key={p} onClick={() => click(p)} style={{ flex: 1, minHeight: 150, borderRadius: 12, cursor: "pointer", border: `2px solid ${from === p ? T.amber : T.border}`, background: T.card, display: "flex", flexDirection: "column-reverse", alignItems: "center", gap: 4, padding: 10, fontFamily: "inherit" }}>
            <div style={{ fontFamily: CODE_FONT, fontWeight: 700, color: T.slate }}>{p}</div>
            {pegs[p].map((d) => <div key={d} style={{ height: 22, width: 30 + d * 26, borderRadius: 6, background: [T.teal, T.blue, T.purple][d - 1], color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{d}</div>)}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 8, fontSize: 14.5, color: T.slate }}>{msg} <button onClick={() => { setPegs(start); setFrom(null); setMoves(0); setMsg("Reset."); }} style={{ marginLeft: 8, padding: "4px 10px", borderRadius: 6, border: `1px solid ${T.border}`, background: T.surface, cursor: "pointer" }}>↺ reset</button></div>
    </div>
  );
}

const EX = {
  moves: {
    id: "moves", kind: "write", title: "Print the moves",
    task: <>The insight: to move n disks from A to C, (1) move n − 1 disks out of the way to B, (2) move disk n to C, (3) move the n − 1 disks from B onto it. Write <code>hanoi(n, source, target, spare)</code> that prints <code>Move disk 1 from A to C</code> for every move. Ask <code>Disks: </code> and call <code>hanoi(n, "A", "C", "B")</code>.</>,
    minLines: 10,
    tests: [{ inputs: ["2"], expect: "Disks: 2\n" + hanoiMoves(2).join("\n") }, { inputs: ["3"], expect: "Disks: 3\n" + hanoiMoves(3).join("\n"), hidden: true }],
    requires: [comments(3), { node: "FunctionDef" }],
    hints: ["Base case: n == 0 → nothing to move, just return.", "hanoi(n - 1, source, spare, target); print the move of disk n; hanoi(n - 1, spare, target, source)"],
    solution: '# base case: 0 disks -> nothing to do\n# recursive case: move n-1 to the spare, move disk n, move n-1 onto it\n# trust the smaller calls to do their job\ndef hanoi(n, source, target, spare):\n    if n == 0:\n        return\n    hanoi(n - 1, source, spare, target)\n    print(f"Move disk {n} from {source} to {target}")\n    hanoi(n - 1, spare, target, source)\n\nn = int(input("Disks: "))\nhanoi(n, "A", "C", "B")',
  },
  count: {
    id: "count", kind: "write", title: "How many moves?",
    task: <>Write <code>count_moves(n)</code> — recursively, without printing: 0 disks need 0 moves; n disks need count_moves(n − 1) + 1 + count_moves(n − 1). Print a table for n = 1 to 10: <code>1 disks: 1 moves</code>… Then look at the numbers: each is 2<sup>n</sup> − 1.</>,
    tests: [{ expect: Array.from({ length: 10 }, (_, k) => `${k + 1} disks: ${2 ** (k + 1) - 1} moves`).join("\n") }],
    post: "assert count_moves(20) == 2 ** 20 - 1",
    requires: [comments(2), { node: "FunctionDef" }],
    forbids: [{ text: "**", msg: "Count recursively — don't use the formula." }],
    hints: ["return 2 * count_moves(n - 1) + 1 is the same thing, written shorter."],
    solution: '# base case: 0 disks -> 0 moves\n# recursive case: two moves of n-1 disks, plus one\ndef count_moves(n):\n    if n == 0:\n        return 0\n    return 2 * count_moves(n - 1) + 1\n\nfor n in range(1, 11):\n    print(f"{n} disks: {count_moves(n)} moves")',
  },
  stairs: {
    id: "stairs", kind: "write", title: "Climbing stairs",
    task: <>You climb a staircase 1 or 2 steps at a time. In how many different ways can you reach step n? To be on step n, your last move came from step n − 1 or step n − 2: ways(n) = ways(n − 1) + ways(n − 2), with ways(0) = ways(1) = 1. Ask <code>Steps: </code> and print <code>Ways: 8</code>. (Look familiar?)</>,
    tests: [{ inputs: ["5"], expect: `Steps: 5\nWays: ${ways(5)}` }, { inputs: ["1"], expect: "Steps: 1\nWays: 1", hidden: true }, { inputs: ["20"], expect: `Steps: 20\nWays: ${ways(20)}`, hidden: true }],
    post: "assert ways(10) == 89",
    requires: [comments(2), { node: "FunctionDef" }],
    hints: ["if n < 2: return 1", "return ways(n - 1) + ways(n - 2) — it's Fibonacci in disguise."],
    solution: '# base cases: 0 or 1 steps -> 1 way\n# recursive case: ways(n-1) + ways(n-2)\ndef ways(n):\n    if n < 2:\n        return 1\n    return ways(n - 1) + ways(n - 2)\n\nn = int(input("Steps: "))\nprint(f"Ways: {ways(n)}")',
  },
  binary: {
    id: "binary", kind: "make", title: "All binary strings",
    task: <>Write <code>generate(prefix, n)</code> that prints every string of 0s and 1s of length n, in order: if the prefix is already n long, print it (base case); otherwise call itself twice — once with <code>prefix + "0"</code>, once with <code>prefix + "1"</code>. Ask <code>Length: </code> and call <code>generate("", n)</code>, then print <code>Total: 8</code>. This branching shape — try every choice — is called <strong>backtracking</strong>.</>,
    minLines: 12,
    tests: [{ inputs: ["3"], expect: "Length: 3\n" + bins(3).join("\n") + "\nTotal: 8" }, { inputs: ["1"], expect: "Length: 1\n0\n1\nTotal: 2", hidden: true }],
    requires: [comments(3), { node: "FunctionDef" }],
    forbids: [{ call: "bin" }, { call: "format" }],
    hints: ["if len(prefix) == n: print(prefix); return", "generate(prefix + \"0\", n) then generate(prefix + \"1\", n)", "Total is 2 ** n — or count with a returned number."],
    solution: '# base case: prefix has length n -> print it\n# recursive case: extend with "0", then with "1"\n# total strings = 2 ** n\ndef generate(prefix, n):\n    if len(prefix) == n:\n        print(prefix)\n        return\n    generate(prefix + "0", n)\n    generate(prefix + "1", n)\n\nn = int(input("Length: "))\ngenerate("", n)\nprint(f"Total: {2 ** n}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "To move 4 disks, Hanoi first…", options: ["Moves disk 4", "Moves 3 disks to the spare peg", "Moves disk 1 to the target", "Moves all to B"], answer: 1, explain: "Clear the way for the biggest disk using a smaller Hanoi." },
  { q: "How many moves for 10 disks?", options: ["10", "100", "1023", "512"], answer: 2, explain: "2¹⁰ − 1 = 1023." },
  { q: "The stairs problem is the same recursion as…", options: ["Factorial", "Fibonacci", "GCD", "Binary search"], answer: 1, explain: "ways(n) = ways(n−1) + ways(n−2)." },
  { q: "generate(\"\", 4) prints how many strings?", options: ["4", "8", "16", "32"], answer: 2, explain: "Two choices per position: 2⁴ = 16." },
];

export default function UnitCT3_3(props) {
  const sections = [
    { label: "The Puzzle", kicker: "TRY IT", title: "Tower of Hanoi", blocks: [<P>Move all three disks from A to C. Rules: one disk at a time, and never a bigger disk on a smaller one. Try it:</P>, <Play />, EX.moves] },
    { label: "The Cost", kicker: "2ⁿ − 1", title: "How many moves?", blocks: [EX.count, <KeyIdea>Each extra disk doubles the work. Legend says monks are moving 64 disks — 2⁶⁴ − 1 moves, about 585 billion years at one move per second.</KeyIdea>] },
    { label: "Same Shape", kicker: "COUNTING CHOICES", title: "Recursion counts possibilities", blocks: [EX.stairs] },
    { label: "Make It", kicker: "BACKTRACKING", title: "Your program: all binary strings", blocks: [EX.binary] },
  ];
  return (
    <LessonShell {...props} unitId="UnitCT3_3" crumb="COMPUTATIONAL THINKING III › 3" title="Tower of Hanoi" sections={sections} quiz={QUIZ}
      next={{ title: "Module 9 — When Things Go Wrong", text: "CT III complete! Next: errors and files. (Optional first: CT III's Crucible.)" }} />
  );
}
