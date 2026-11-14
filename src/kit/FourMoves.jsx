// ── FourMoves: the computational-thinking checklist, applied to one problem ──
// Shared by the CT strand units. Pass the four answers for the problem at hand.

import { useState } from "react";
import { T, CODE_FONT, MONO, tint } from "./theme.js";

const MOVES = [
  { k: "decompose", n: "1 · Decompose", c: T.blue, q: "What smaller jobs make up this task?" },
  { k: "pattern", n: "2 · Spot the pattern", c: T.purple, q: "What repeats? (Repetition means a loop.)" },
  { k: "abstract", n: "3 · Abstract", c: T.teal, q: "Strip the story: what's the bare rule?" },
  { k: "algorithm", n: "4 · Algorithm", c: T.orange, q: "The exact steps, in order, before any code." },
];

export default function FourMoves({ problem, answers }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {problem && <div style={{ fontSize: 15, color: T.text, marginBottom: 10 }}><strong>Problem:</strong> {problem}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 8 }}>
        {MOVES.map((m, i) => (
          <button key={m.k} onClick={() => setOpen(i)} style={{ textAlign: "left", cursor: "pointer", fontFamily: "inherit", borderRadius: 12, padding: "10px 12px",
            border: `1.5px solid ${open === i ? m.c : T.border}`, background: open === i ? tint(m.c, "12") : T.card }}>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.2, color: m.c, fontWeight: 700 }}>{m.n}</div>
            <div style={{ fontSize: 13, color: T.slate, marginTop: 2 }}>{m.q}</div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 10, border: `1.5px solid ${MOVES[open].c}`, borderRadius: 12, padding: "12px 14px", background: T.card, fontSize: 14.5, color: T.slate, lineHeight: 1.65, whiteSpace: "pre-wrap", fontFamily: open === 3 ? CODE_FONT : "inherit" }}>
        {answers[MOVES[open].k]}
      </div>
    </div>
  );
}
