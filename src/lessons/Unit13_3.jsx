import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const NAMES = ["Asha", "Ravi", "Meera", "Karan"];
const MARKS = [88, 45, 72, 91];

// ── Section 1: The Need ──────────────────────────────────────────────────────
function TheNeed() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Matplotlib and Seaborn charts are <em>pictures</em> — flat images. You can't hover a bar to read its exact
        value, zoom into a busy region, or drop the chart into a webpage. <strong style={{ color: C.teal }}>Plotly</strong>{" "}
        makes charts <strong style={{ color: C.text }}>interactive</strong> and web-ready.
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "stretch", justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 200, background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.yellow, letterSpacing: 1, marginBottom: 8 }}>STATIC · a flat image</div>
          <svg width="100%" height="80" viewBox="0 0 180 80" role="img">
            {MARKS.map((m, i) => <rect key={i} x={12 + i * 42} y={72 - (m / 100) * 64} width={28} height={(m / 100) * 64} fill={C.muted} rx="1" />)}
          </svg>
          <div style={{ fontSize: 10.5, color: C.muted, marginTop: 6 }}>hover does nothing 😐</div>
        </div>
        <div style={{ flex: 1, minWidth: 200, background: "#0A0E14", border: `1px solid ${C.teal}44`, borderRadius: 10, padding: 14, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: C.teal, letterSpacing: 1, marginBottom: 8 }}>PLOTLY · alive</div>
          <svg width="100%" height="80" viewBox="0 0 180 80" role="img">
            {MARKS.map((m, i) => <rect key={i} x={12 + i * 42} y={72 - (m / 100) * 64} width={28} height={(m / 100) * 64} fill={i === 3 ? C.teal : C.teal} opacity={i === 3 ? 1 : 0.55} rx="1" />)}
            <rect x="118" y="4" width="56" height="20" rx="4" fill={C.card} stroke={C.teal} />
            <text x="146" y="17" fontSize="9" fill={C.text} textAnchor="middle">Karan: 91</text>
          </svg>
          <div style={{ fontSize: 10.5, color: C.teal, marginTop: 6 }}>hover → live tooltip ✨</div>
        </div>
      </div>

      <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.purple }}>import plotly.express as px.</strong> Same data, but the output is a
        live chart you can hover, zoom, and save as an HTML file that works in any browser.
      </div>
    </div>
  );
}

// ── Section 2: The recipe (returns a fig) ────────────────────────────────────
function Recipe() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Plotly Express reads a DataFrame just like Seaborn — but instead of drawing straight to the screen, it{" "}
        <strong style={{ color: C.text }}>returns a figure object</strong> you then show or save.
      </p>

      <pre style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, fontFamily: "monospace", fontSize: 12, color: C.text, lineHeight: 1.9, margin: "0 0 14px", whiteSpace: "pre" }}>{`import plotly.express as px

fig = px.bar(df, x="Name", y="Marks",   # 1. build a figure
             title="Class Marks")

fig.show()                # 2. open it (interactive!) in the browser
fig.write_html("marks.html")   # 3. or save it for a webpage`}</pre>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.7 }}>
          The key difference: <code style={{ color: C.teal }}>fig = px.bar(...)</code> gives you an object. Matplotlib
          and Seaborn draw immediately; Plotly hands you a <code style={{ color: C.teal }}>fig</code> you can{" "}
          <code style={{ color: C.teal }}>.show()</code>, <code style={{ color: C.teal }}>.write_html()</code>, or tweak
          before displaying.
        </div>
      </div>

      <div style={{ background: C.teal + "15", border: `1px solid ${C.teal}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.teal }}>Build a fig, then show or save it.</strong> Because a Plotly figure is
        just data, <code style={{ color: C.teal }}>write_html</code> turns it into a standalone interactive page —
        that's how these charts end up on websites and dashboards.
      </div>
    </div>
  );
}

// ── Section 3: Chart types with LIVE hover ───────────────────────────────────
function ChartTypes() {
  const [type, setType] = useState("bar");
  const [hover, setHover] = useState(null); // hovered data index

  const tip = (x, y, label) => (
    <g style={{ pointerEvents: "none" }}>
      <rect x={x - 34} y={y - 26} width={68} height={20} rx="4" fill={C.card} stroke={C.teal} />
      <text x={x} y={y - 12} fontSize="9.5" fill={C.text} textAnchor="middle">{label}</text>
    </g>
  );

  const bar = (
    <svg width="280" height="160" viewBox="0 0 280 160" role="img">
      <line x1="20" y1="135" x2="270" y2="135" stroke={C.border} />
      {MARKS.map((m, i) => {
        const x = 35 + i * 58, h = (m / 100) * 115, y = 135 - h;
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
            <rect x={x} y={y} width={40} height={h} fill={C.teal} opacity={hover === null || hover === i ? 1 : 0.4} rx="2" />
            <text x={x + 20} y={149} fontSize="9" fill={C.muted} textAnchor="middle">{NAMES[i].slice(0, 4)}</text>
            {hover === i && tip(x + 20, y, `${NAMES[i]}: ${m}`)}
          </g>
        );
      })}
    </svg>
  );

  const line = (
    <svg width="280" height="160" viewBox="0 0 280 160" role="img">
      <line x1="20" y1="135" x2="270" y2="135" stroke={C.border} />
      <polyline fill="none" stroke={C.orange} strokeWidth="2.5"
        points={MARKS.map((m, i) => `${40 + i * 66},${135 - (m / 100) * 115}`).join(" ")} />
      {MARKS.map((m, i) => {
        const x = 40 + i * 66, y = 135 - (m / 100) * 115;
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
            <circle cx={x} cy={y} r={hover === i ? 7 : 4.5} fill={C.orange} />
            {hover === i && tip(x, y, `${NAMES[i]}: ${m}`)}
          </g>
        );
      })}
    </svg>
  );

  const scatter = (() => {
    const pts = [[40, 62, "3h → 62"], [95, 45, "2h → 45"], [150, 78, "5h → 78"], [205, 91, "6h → 91"], [120, 70, "4h → 70"], [175, 55, "4h → 55"]];
    return (
      <svg width="280" height="160" viewBox="0 0 280 160" role="img">
        <line x1="20" y1="135" x2="270" y2="135" stroke={C.border} />
        {pts.map(([x, m, lbl], i) => {
          const y = 135 - (m / 100) * 115;
          return (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
              <circle cx={x} cy={y} r={hover === i ? 8 : 5.5} fill={C.purple} opacity="0.85" />
              {hover === i && tip(x, y, lbl)}
            </g>
          );
        })}
      </svg>
    );
  })();

  const pie = (() => {
    const total = MARKS.reduce((a, b) => a + b, 0);
    let start = 0;
    const cx = 90, cy = 80, r = 62;
    const cols = [C.teal, C.orange, C.purple, C.green];
    return (
      <svg width="280" height="160" viewBox="0 0 280 160" role="img">
        {MARKS.map((m, i) => {
          const frac = m / total;
          const end = start + frac * 2 * Math.PI;
          const x1 = cx + r * Math.sin(start), y1 = cy - r * Math.cos(start);
          const x2 = cx + r * Math.sin(end), y2 = cy - r * Math.cos(end);
          const large = frac > 0.5 ? 1 : 0;
          const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
          const mid = start + (end - start) / 2;
          start = end;
          return (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: "pointer" }}>
              <path d={path} fill={cols[i]} stroke={C.bg} strokeWidth="1.5"
                transform={hover === i ? `translate(${6 * Math.sin(mid)},${-6 * Math.cos(mid)})` : ""} />
            </g>
          );
        })}
        {NAMES.map((n, i) => (
          <g key={i}>
            <rect x={190} y={26 + i * 26} width={12} height={12} fill={cols[i]} rx="2" />
            <text x={208} y={36 + i * 26} fontSize="10.5" fill={hover === i ? C.text : C.muted}>{n} ({Math.round((MARKS[i] / total) * 100)}%)</text>
          </g>
        ))}
      </svg>
    );
  })();

  const types = {
    bar: { label: "px.bar", color: C.teal, code: 'fig = px.bar(df, x="Name", y="Marks")', svg: bar },
    line: { label: "px.line", color: C.orange, code: 'fig = px.line(df, x="Name", y="Marks")', svg: line },
    scatter: { label: "px.scatter", color: C.purple, code: 'fig = px.scatter(df, x="Hours", y="Marks")', svg: scatter },
    pie: { label: "px.pie", color: C.green, code: 'fig = px.pie(df, names="Name", values="Marks")', svg: pie },
  };
  const t = types[type];

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Same family of charts as Matplotlib — but <strong style={{ color: C.teal }}>hover over the shapes below</strong>.
        A real Plotly chart does exactly this in your browser.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {Object.entries(types).map(([k, tv]) => (
          <button key={k} onClick={() => { setType(k); setHover(null); }} style={{
            flex: 1, minWidth: 76, padding: "9px 6px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: type === k ? tv.color + "22" : C.card,
            border: `1.5px solid ${type === k ? tv.color : C.border}`, color: type === k ? tv.color : C.muted,
          }}>{tv.label}</button>
        ))}
      </div>

      <div style={{ background: "#0A0E14", border: `1.5px solid ${t.color}44`, borderRadius: 10, padding: 16, marginBottom: 12, display: "flex", justifyContent: "center", minHeight: 176 }}>
        {t.svg}
      </div>

      <pre style={{ background: C.card, border: `1px solid ${t.color}44`, borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 11.5, color: C.text, margin: "0 0 10px", whiteSpace: "pre-wrap" }}>{t.code}
fig.show()</pre>

      <div style={{ background: t.color + "14", border: `1px solid ${t.color}44`, borderRadius: 8, padding: "10px 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
        Notice the pattern: <code style={{ color: t.color }}>px.&lt;type&gt;(df, ...)</code> → a <code style={{ color: t.color }}>fig</code> → hover for values. Swap the chart type, keep everything else.
      </div>
    </div>
  );
}

// ── Section 4: Interactivity + the web ───────────────────────────────────────
function WebReady() {
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Three things you get for free once a chart is a Plotly figure:
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {[
          ["🖱️", "Hover & zoom", "Every point shows its exact value on hover; drag to zoom into a crowded region, double-click to reset. No extra code."],
          ["🎨", 'color="Subject"', "Just like Seaborn's hue — one keyword splits the chart into coloured, clickable groups with a legend you can toggle."],
          ["🌐", 'fig.write_html("chart.html")', "Saves a self-contained interactive page. Open it in any browser or embed it in a website or dashboard — this is what backs your visualization lab."],
        ].map(([icon, title, body], i) => (
          <div key={i} style={{ display: "flex", gap: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 20 }}>{icon}</div>
            <div>
              <div style={{ color: C.teal, fontWeight: 600, fontSize: 13, fontFamily: "monospace", marginBottom: 3 }}>{title}</div>
              <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#0A0E14", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, marginBottom: 8 }}>THE THREE LIBRARIES, ONE PICTURE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5 }}>
          <div style={{ color: C.muted }}><strong style={{ color: C.accent }}>Matplotlib</strong> — the foundation: draw anything, full manual control.</div>
          <div style={{ color: C.muted }}><strong style={{ color: C.teal }}>Seaborn</strong> — statistics + style in one line, on top of Matplotlib.</div>
          <div style={{ color: C.muted }}><strong style={{ color: C.orange }}>Plotly</strong> — interactive + web-ready, when a picture isn't enough.</div>
        </div>
      </div>

      <div style={{ background: C.green + "15", border: `1px solid ${C.green}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
        🔑 <strong style={{ color: C.green }}>Pick the tool for the job.</strong> Static report → Matplotlib/Seaborn.
        Something people explore in a browser → Plotly. All three read the same Pandas DataFrame, so switching is cheap.
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What makes Plotly different from Matplotlib and Seaborn?",
      options: [
        "It's faster to import",
        "Its charts are interactive (hover, zoom) and web-ready",
        "It can't read DataFrames",
        "It only makes pie charts",
      ],
      answer: 1,
      explain: "Plotly produces interactive charts you can hover and zoom, and save as HTML for the web — Matplotlib and Seaborn output static images.",
    },
    {
      q: "What does  fig = px.bar(df, x=\"Name\", y=\"Marks\")  return?",
      options: [
        "Nothing — it draws immediately",
        "A figure object you then .show() or .write_html()",
        "A DataFrame",
        "A CSV file",
      ],
      answer: 1,
      explain: "Plotly Express returns a figure object. Unlike Matplotlib (which draws right away), you get a fig to show, save, or modify first.",
    },
    {
      q: "How do you save a Plotly chart as a standalone interactive webpage?",
      options: [
        "plt.show()",
        'fig.write_html("chart.html")',
        "print(fig)",
        "You can't",
      ],
      answer: 1,
      explain: 'fig.write_html("chart.html") writes a self-contained interactive HTML file — open it in any browser or embed it in a site.',
    },
    {
      q: "You need a static chart for a printed report. Best choice?",
      options: [
        "Plotly — always",
        "Matplotlib or Seaborn — interactivity is wasted on paper",
        "No library can do that",
        "Only a spreadsheet",
      ],
      answer: 1,
      explain: "Interactivity does nothing on paper, so a clean static Matplotlib/Seaborn image is the right tool. Match the library to how the chart will be used.",
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
          {score === 4 ? "You can pick the right plotting library for any job." :
            score >= 2 ? "Good — replay Interactivity & the Web to lock in when to use Plotly." :
              "Revisit The Recipe and the three-libraries summary, then try again."}
        </div>
        <div style={{
          padding: "20px", borderRadius: 12,
          background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`,
          border: `1px solid ${C.accent}55`,
        }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏆 Module 13 Complete — You Can Visualize Data!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            Matplotlib for anything, Seaborn for statistics in one line, Plotly for interactive web charts — all from a
            Pandas DataFrame.<br /><br />
            That closes the data-visualization strand of your lab. From here the course branches into its applied
            tracks — AI/ML, cybersecurity, and IoT — all built on the data skills you now have.
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
export default function Unit13_3({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "The Need" },
    { id: "recipe", label: "The Recipe" },
    { id: "types", label: "Hover the Charts" },
    { id: "web", label: "Interactive & Web" },
    { id: "quiz", label: "Quiz & Wrap-up" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>When a Picture Isn't Enough</h3><TheNeed /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build a Figure, Show or Save It</h3><Recipe /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Charts That Respond</h3><ChartTypes /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Interactivity & the Web</h3><WebReady /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quick Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on interactive plotting with Plotly.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🖱️</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 13 › UNIT 13.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Interactive Charts with Plotly</div>
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
