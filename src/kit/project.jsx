// ── Mini-project kit ──
// Shared by the four generic tracks (UnitMP_*): a roadmap of the five
// checkpoints, file-setup and figure-check builders for tests, and a tiny
// "console" helper for writing reference simulators.

import { T, CODE_FONT, tint } from "./theme.js";

// Test setup: write (string) or delete (null) files before the program runs.
export const files = (map) =>
  "import os\n" + Object.entries(map).map(([n, c]) => (c === null
    ? `if os.path.exists(${JSON.stringify(n)}): os.remove(${JSON.stringify(n)})`
    : `with open(${JSON.stringify(n)}, "w") as _f:\n    _f.write(${JSON.stringify(c)})`)).join("\n");

// Post check: the file's non-empty lines must equal `lines`.
export const fileIs = (name, lines, msg) =>
  `import os as _os\nassert _os.path.exists(${JSON.stringify(name)}), "${name} was not saved."\n_got = [l.strip() for l in open(${JSON.stringify(name)}) if l.strip()]\nassert _got == ${JSON.stringify(lines)}, ${JSON.stringify(msg || `${name} doesn't contain the right lines.`)} + " Found: " + str(_got)\n`;

// Post check preamble for matplotlib figures.
export const FIG = (n = 1) => `import matplotlib.pyplot as _plt
assert _plt.get_fignums(), "No chart was drawn."
_fig = _plt.gcf()
_fig.canvas.draw()
assert len(_fig.axes) >= ${n}, "Expected ${n} chart(s) in the figure."
_ax = _fig.axes[0]
_ticks = lambda a: [t.get_text() for t in a.get_xticklabels()]
_heights = lambda a: [round(p.get_height(), 2) for p in a.patches]
`;
export const titleIs = (t, ax = "_ax") =>
  `assert ${ax}.get_title().strip().lower() == ${JSON.stringify(t.toLowerCase())}, "Title the chart: ${t} — it is '" + ${ax}.get_title() + "'."\n`;
export const barsAre = (pairs, ax = "_ax", what = "bars") =>
  `assert _ticks(${ax}) == ${JSON.stringify(pairs.map((p) => p[0]))}, "The ${what} should be, in order: ${pairs.map((p) => p[0]).join(", ")} — got " + str(_ticks(${ax}))\nassert _heights(${ax}) == ${JSON.stringify(pairs.map((p) => p[1]))}, "The ${what} have the wrong heights."\n`;

// A scripted console for reference simulators: ask() consumes the next input
// and echoes "prompt + value" exactly like the runner does.
export function Console(inputs) {
  const q = [...inputs], out = [];
  return {
    ask: (prompt) => { const v = q.shift(); out.push(prompt + v); return v; },
    say: (...lines) => out.push(...lines),
    text: () => out.join("\n"),
  };
}

// CSV helpers for simulators
export const parseCsv = (csv) => { const [head, ...rows] = csv.trim().split("\n"); const k = head.split(","); return rows.map((r) => Object.fromEntries(r.split(",").map((v, i) => [k[i], v !== "" && !isNaN(+v) ? +v : v]))); };
export const sumBy = (rows, key, val) => { const m = new Map(); rows.forEach((r) => { const k = typeof key === "function" ? key(r) : r[key]; m.set(k, (m.get(k) || 0) + val(r)); }); return [...m]; };
export const byKey = (pairs) => [...pairs].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
export const byValueDesc = (pairs) => [...pairs].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));

// ── The roadmap shown at the top of every track ──
export function Roadmap({ color = T.blue, rows }) {
  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", maxWidth: 980 }}>
      {rows.map(([cp, after, gains], i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(150px, 1fr) 110px 2fr", gap: 12, padding: "10px 14px", background: i % 2 ? T.surface : T.card, fontSize: 14.5, alignItems: "center" }}>
          <span style={{ fontWeight: 700, color }}>{cp}</span>
          <span style={{ fontFamily: CODE_FONT, fontSize: 12.5, color: T.bronze, background: tint(T.amber, "14"), borderRadius: 6, padding: "2px 8px", justifySelf: "start" }}>{after}</span>
          <span style={{ color: T.slate }}>{gains}</span>
        </div>
      ))}
    </div>
  );
}
