// ── Foothold lesson theme (light) ──
// Lessons built on src/kit share this palette with the shell's cream brand.
// Semantics: green = correct, red = wrong, orange = the C / lower-level side,
// purple = key idea, teal = memory / variables, blue = the concept taught,
// amber = the brand accent (hooks, highlights, challenge fire).

export const T = {
  bg: "#F1EEE6", surface: "#FBF9F4", card: "#FFFFFF", deep: "#EDE8DC",
  border: "#E7E0D2", borderStrong: "#D6CCB8",
  text: "#16294A", slate: "#40506A", muted: "#7A879B",
  navy: "#16294A", amber: "#E7A13E", bronze: "#B08343",
  blue: "#2B5FB3", green: "#1F7A4D", red: "#B0322F", orange: "#B0651F",
  purple: "#6B4FA8", teal: "#0E7C86", yellow: "#9A6B00",
  // code editor
  codeBg: "#FFFDF8", gutter: "#F5F1E8",
  kw: "#7A3E9D", str: "#1F7A4D", num: "#B0651F", com: "#8A97AB", fn: "#2B5FB3",
  // terminal (brand navy panel)
  termBg: "#16294A", termText: "#E7EAF0", termErr: "#FFA195", termIn: "#F0B860",
};

export const FONT = "'Space Grotesk', system-ui, sans-serif";
export const MONO = "'Space Mono', ui-monospace, Consolas, monospace";
export const CODE_FONT = "ui-monospace, 'Cascadia Code', Consolas, 'Space Mono', monospace";

export const tint = (hex, a = "18") => hex + a;
