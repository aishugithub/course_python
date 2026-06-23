import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Bit Flipper ────────────────────────────────────────────────────────────
function BitFlipper() {
  const [bits, setBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const decimal = bits.reduce((acc, b, i) => acc + b * Math.pow(2, 7 - i), 0);
  const letter = decimal >= 32 && decimal <= 126 ? String.fromCharCode(decimal) : null;

  const flip = (i) => setBits(b => b.map((v, j) => j === i ? 1 - v : v));
  const reset = () => setBits([0, 0, 0, 0, 0, 0, 0, 0]);
  const setLetter = (ch) => {
    const code = ch.charCodeAt(0);
    setBits(Array.from({ length: 8 }, (_, i) => (code >> (7 - i)) & 1));
  };

  const weights = [128, 64, 32, 16, 8, 4, 2, 1];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        A <strong style={{ color: C.accent }}>bit</strong> is a single switch — ON (1) or OFF (0).
        Eight bits make a <strong style={{ color: C.purple }}>byte</strong>. Click the switches below to flip them and watch the value change!
      </p>

      {/* Bit switches */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
        {bits.map((b, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ color: C.muted, fontSize: 9 }}>{weights[i]}</div>
            <div onClick={() => flip(i)} style={{
              width: 44, height: 52, borderRadius: 8, cursor: "pointer",
              background: b === 1 ? C.accentGlow : C.card,
              border: `2px solid ${b === 1 ? C.accent : C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 700, color: b === 1 ? "#fff" : C.muted,
              boxShadow: b === 1 ? `0 0 14px ${C.accent}66` : "none",
              transition: "all 0.2s", userSelect: "none",
            }}>{b}</div>
            <div style={{ color: b === 1 ? C.accent : C.muted, fontSize: 9 }}>2^{7 - i}</div>
          </div>
        ))}
      </div>

      {/* Value display */}
      <div style={{
        textAlign: "center", marginBottom: 16, padding: "14px",
        background: C.card, borderRadius: 10, border: `1px solid ${C.border}`,
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2 }}>DECIMAL</div>
            <div style={{ color: C.yellow, fontSize: 32, fontWeight: 700 }}>{decimal}</div>
          </div>
          <div>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2 }}>CHARACTER</div>
            <div style={{ color: C.green, fontSize: 32, fontWeight: 700 }}>{letter || "—"}</div>
          </div>
          <div>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2 }}>HEX</div>
            <div style={{ color: C.purple, fontSize: 32, fontWeight: 700 }}>0x{decimal.toString(16).toUpperCase().padStart(2, "0")}</div>
          </div>
        </div>
      </div>

      {/* Quick set buttons */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 10 }}>
        {["A", "B", "Z", "a", "0", " "].map(ch => (
          <button key={ch} onClick={() => setLetter(ch)} style={{
            padding: "6px 14px", borderRadius: 6, border: `1px solid ${C.border}`,
            background: C.card, color: C.accent, cursor: "pointer", fontSize: 13, fontWeight: 600,
          }}>'{ch === " " ? "space" : ch}'</button>
        ))}
        <button onClick={reset} style={{
          padding: "6px 14px", borderRadius: 6, border: `1px solid ${C.border}`,
          background: C.card, color: C.muted, cursor: "pointer", fontSize: 13,
        }}>Reset</button>
      </div>
      <p style={{ color: C.muted, fontSize: 11, textAlign: "center" }}>
        Try setting specific letters using the buttons, or flip switches manually!
      </p>
    </div>
  );
}

// ── Bits Bytes Explainer ───────────────────────────────────────────────────
function BitsAndBytes() {
  const [selected, setSelected] = useState(0);

  const units = [
    {
      name: "Bit", symbol: "b", color: C.accent,
      size: "1 switch", icon: "💡",
      visual: ["0"],
      desc: "The smallest unit of information. One binary digit — either 0 or 1.",
      example: "One light switch: ON or OFF",
    },
    {
      name: "Byte", symbol: "B", color: C.purple,
      size: "8 bits", icon: "🔠",
      visual: ["0", "1", "0", "0", "0", "0", "0", "1"],
      desc: "8 bits grouped together. Can store any number from 0 to 255 — enough for one character.",
      example: "The letter 'A' = 01000001 = one byte",
    },
    {
      name: "Kilobyte", symbol: "KB", color: C.green,
      size: "1,024 bytes", icon: "📄",
      visual: null,
      desc: "About 1,000 characters of text. A short paragraph of writing.",
      example: "A plain text file with ~170 words",
    },
    {
      name: "Megabyte", symbol: "MB", color: C.yellow,
      size: "1,024 KB", icon: "🖼️",
      visual: null,
      desc: "About 1 million characters. Enough for a high-quality photo.",
      example: "One JPEG photo ≈ 2–5 MB",
    },
    {
      name: "Gigabyte", symbol: "GB", color: C.orange,
      size: "1,024 MB", icon: "🎬",
      visual: null,
      desc: "About 1 billion characters. A full HD movie.",
      example: "One 1080p movie ≈ 1–4 GB",
    },
    {
      name: "Terabyte", symbol: "TB", color: C.red,
      size: "1,024 GB", icon: "💾",
      visual: null,
      desc: "About 1 trillion characters. A typical laptop hard drive.",
      example: "500,000 photos or 250,000 songs",
    },
  ];

  const u = units[selected];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Storage is measured in units that scale by powers of 1,024. Tap each unit to understand what it can hold.
      </p>

      {/* Unit selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {units.map((unit, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            padding: "6px 14px", borderRadius: 20,
            background: selected === i ? unit.color + "33" : C.card,
            border: `1.5px solid ${selected === i ? unit.color : C.border}`,
            color: selected === i ? unit.color : C.muted,
            cursor: "pointer", fontSize: 12, fontWeight: selected === i ? 700 : 400,
            transition: "all 0.2s",
          }}>{unit.symbol}</button>
        ))}
      </div>

      {/* Detail */}
      <div style={{
        background: u.color + "18", border: `1.5px solid ${u.color}55`,
        borderRadius: 12, padding: "18px 16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: 36 }}>{u.icon}</span>
          <div>
            <div style={{ color: u.color, fontWeight: 700, fontSize: 20 }}>{u.name} <span style={{ fontSize: 13 }}>({u.symbol})</span></div>
            <div style={{ color: C.muted, fontSize: 13 }}>{u.size}</div>
          </div>
        </div>

        {u.visual && (
          <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
            {u.visual.map((b, i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: 6,
                background: b === "1" ? u.color + "33" : C.bg,
                border: `1px solid ${b === "1" ? u.color : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "monospace", fontSize: 14, fontWeight: 700,
                color: b === "1" ? u.color : C.muted,
              }}>{b}</div>
            ))}
          </div>
        )}

        <div style={{ color: C.text, fontSize: 13, marginBottom: 8, lineHeight: 1.6 }}>{u.desc}</div>
        <div style={{
          background: C.bg, borderRadius: 8, padding: "8px 12px",
          fontSize: 12, color: C.muted, fontStyle: "italic",
        }}>📌 {u.example}</div>
      </div>

      {/* Scale bar */}
      <div style={{ marginTop: 16, background: C.card, borderRadius: 8, padding: "10px 14px", border: `1px solid ${C.border}` }}>
        <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>SCALE</div>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {units.map((unit, i) => (
            <div key={i} style={{ flex: i + 1, height: 10, background: unit.color, opacity: selected === i ? 1 : 0.3, transition: "opacity 0.25s" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {units.map((unit, i) => (
            <div key={i} style={{ color: selected === i ? unit.color : C.muted, fontSize: 9, fontWeight: selected === i ? 700 : 400 }}>{unit.symbol}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── How Everything is Binary ───────────────────────────────────────────────
function EverythingIsBinary() {
  const [active, setActive] = useState(null);

  const things = [
    {
      icon: "🔢", name: "Numbers", color: C.accent,
      how: "Stored directly in binary. The number 42 = 00101010.",
      detail: "Integers use 2 or 4 bytes. Decimals (called floats) use a special format with sign, exponent, and fraction bits — all binary.",
      example: { label: "42 in binary", value: "00101010" },
    },
    {
      icon: "🔤", name: "Text", color: C.green,
      how: "Each character is assigned a number (ASCII/Unicode), stored as binary.",
      detail: "ASCII maps A=65, B=66 … Z=90. Unicode extends this to cover every language including Tamil — அ = U+0B85 = 11001110 10000101 in UTF-8.",
      example: { label: "'Hi' in binary", value: "01001000 01101001" },
    },
    {
      icon: "🖼️", name: "Images", color: C.purple,
      how: "Each pixel is a colour. Each colour = 3 numbers (Red, Green, Blue) each 0–255.",
      detail: "A single red pixel = R:255, G:0, B:0 = 11111111 00000000 00000000. A 1080p photo has 2 million pixels — that's 6 million bytes of colour data!",
      example: { label: "Pure red pixel (RGB)", value: "11111111 00000000 00000000" },
    },
    {
      icon: "🔊", name: "Sound", color: C.yellow,
      how: "Sound waves are sampled thousands of times per second, each sample stored as a number.",
      detail: "CD quality audio: 44,100 samples per second, each stored as a 16-bit number. One minute of stereo audio = ~10 MB of binary data.",
      example: { label: "1 audio sample (16-bit)", value: "0011010110101100" },
    },
    {
      icon: "⚙️", name: "Instructions", color: C.orange,
      how: "CPU instructions are encoded as binary operation codes (opcodes).",
      detail: "The x86 instruction to move the number 5 into a register is: 10111000 00000101. The CPU reads this pattern and knows exactly what to do.",
      example: { label: "MOV AX, 5 (x86)", value: "10111000 00000101" },
    },
  ];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 4, lineHeight: 1.7 }}>
        Numbers, text, images, sound, instructions — they are all stored as 0s and 1s.
        The only difference is <strong style={{ color: C.accent }}>how the binary is interpreted</strong>.
        Tap each type to see how.
      </p>
      <div style={{
        background: C.card, borderRadius: 8, padding: "8px 14px", marginBottom: 16,
        border: `1px solid ${C.border}`, fontSize: 12, color: C.muted,
      }}>
        🔑 The same byte <code style={{ color: C.yellow }}>01000001</code> could mean the number <strong style={{ color: C.accent }}>65</strong>, the letter <strong style={{ color: C.green }}>'A'</strong>, or part of a colour — it depends entirely on context.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {things.map((t, i) => (
          <div key={i} onClick={() => setActive(active === i ? null : i)} style={{
            background: active === i ? t.color + "18" : C.card,
            border: `1.5px solid ${active === i ? t.color : C.border}`,
            borderRadius: 10, padding: "12px 14px", cursor: "pointer", transition: "all 0.25s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <span style={{ color: t.color, fontWeight: 700, fontSize: 14 }}>{t.name}</span>
              <span style={{ color: C.muted, fontSize: 12, flex: 1 }}>{t.how}</span>
              <span style={{ color: C.muted, fontSize: 12 }}>{active === i ? "▲" : "▼"}</span>
            </div>
            {active === i && (
              <div style={{ marginTop: 10 }}>
                <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>{t.detail}</div>
                <div style={{ background: C.bg, borderRadius: 8, padding: "10px 14px", border: `1px solid ${C.border}` }}>
                  <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>{t.example.label.toUpperCase()}</div>
                  <div style={{ fontFamily: "monospace", color: t.color, fontSize: 14, fontWeight: 700 }}>{t.example.value}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Build a Message ────────────────────────────────────────────────────────
function BuildMessage() {
  const charMap = {};
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split("").forEach(ch => {
    charMap[ch] = ch === " " ? "00100000" : ch.charCodeAt(0).toString(2).padStart(8, "0");
  });

  const [input, setInput] = useState("HI");
  const display = input.toUpperCase().replace(/[^A-Z ]/g, "").slice(0, 8);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Type a short word (letters only, max 8 characters) and watch it convert to binary in real time.
        This is exactly how your computer stores text in memory.
      </p>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        maxLength={8}
        placeholder="Type a word…"
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 8, marginBottom: 16,
          background: C.bg, border: `1.5px solid ${C.accent}`,
          color: C.text, fontSize: 16, fontWeight: 600, outline: "none",
          boxSizing: "border-box",
        }}
      />
      {display.length === 0 && (
        <div style={{ color: C.muted, fontSize: 13, textAlign: "center" }}>Start typing above ↑</div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {display.split("").map((ch, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: C.card, borderRadius: 8, padding: "10px 14px",
            border: `1px solid ${C.border}`,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: C.accentGlow + "33", border: `1px solid ${C.accent}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.accent, fontWeight: 700, fontSize: 18,
            }}>{ch === " " ? "·" : ch}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "monospace", color: C.yellow, fontSize: 14, letterSpacing: 2 }}>
                {(charMap[ch] || "????????").split("").map((bit, j) => (
                  <span key={j} style={{ color: bit === "1" ? C.accent : C.muted }}>{bit}</span>
                ))}
              </div>
            </div>
            <div style={{ color: C.muted, fontSize: 11, flexShrink: 0 }}>= {ch === " " ? 32 : ch.charCodeAt(0)}</div>
          </div>
        ))}
      </div>
      {display.length > 0 && (
        <div style={{
          marginTop: 12, background: C.green + "18", border: `1px solid ${C.green}44`,
          borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.muted,
        }}>
          📦 "{display}" uses <strong style={{ color: C.green }}>{display.length} byte{display.length > 1 ? "s" : ""}</strong> of memory ({display.length * 8} bits)
        </div>
      )}
    </div>
  );
}

// ── Quiz ───────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "How many bits are in one byte?",
      options: ["4", "8", "16", "1024"],
      answer: 1,
      explain: "One byte = 8 bits. This is the standard unit for storing one character of text.",
    },
    {
      q: "What is the maximum decimal value you can store in one byte (8 bits)?",
      options: ["128", "255", "256", "512"],
      answer: 1,
      explain: "8 bits can represent 2^8 = 256 values: 0 through 255.",
    },
    {
      q: "The letter 'A' is stored in a computer as:",
      options: ["The shape of the letter drawn in pixels", "The number 65 encoded in binary (01000001)", "A special symbol code only computers know", "Nothing — text is stored as text"],
      answer: 1,
      explain: "ASCII maps 'A' to 65. The computer stores 65 in binary as 01000001 — one byte.",
    },
    {
      q: "A 4K image has roughly 8 million pixels. Each pixel needs 3 bytes (RGB). How large is the raw image?",
      options: ["8 KB", "24 MB", "8 GB", "3 bytes"],
      answer: 1,
      explain: "8,000,000 pixels × 3 bytes = 24,000,000 bytes ≈ 24 MB. This is why images are compressed before storing!",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[current].answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current < questions.length - 1) { setCurrent(c => c + 1); setSelected(null); }
    else { setDone(true); onComplete && onComplete(); }
  };

  if (done) {
    const final = score + (selected === questions[current].answer ? 1 : 0);
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{final >= 3 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {final} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8 }}>
          {final === 4 ? "Perfect! Bits and bytes are no longer a mystery to you." :
            final >= 2 ? "Good — revisit the Bits & Bytes section to solidify your understanding." :
              "Try again after going through the Bit Flipper and Build a Message sections."}
        </div>
        <div style={{ marginTop: 16, padding: "12px 20px", borderRadius: 8, background: C.green + "22", border: `1px solid ${C.green}`, color: C.green, fontWeight: 600 }}>
          Unit 2.2 Complete ✓
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16 }}>{q.q}</div>
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

// ── Main ───────────────────────────────────────────────────────────────────
export default function Unit2_2() {
  const sections = [
    { id: "flipper", label: "Bit Flipper" },
    { id: "bytes", label: "Bits & Bytes" },
    { id: "everything", label: "Everything is Binary" },
    { id: "build", label: "Build a Message" },
    { id: "quiz", label: "Quick Quiz" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };

  const content = [<BitFlipper />, <BitsAndBytes />, <EverythingIsBinary />, <BuildMessage />, <Quiz onComplete={() => markComplete(4)} />];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 2 › UNIT 2.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>What is Machine Code / Binary?</div>
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
