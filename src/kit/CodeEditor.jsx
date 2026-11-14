// ── CodeEditor ──
// A plain textarea with a highlighted <pre> behind it (no autocomplete, no
// AI): Tab = 4 spaces, Enter keeps indentation (+4 after a colon),
// Shift+Tab dedents, Ctrl/Cmd+Enter runs. Paste can be blocked so learners
// build the typing habit.

import { useRef, useState } from "react";
import { T, CODE_FONT } from "./theme.js";

const KW = new Set("False None True and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(" "));
const BI = new Set("print input int float str len range type list dict tuple set max min sum abs round sorted bool open enumerate zip".split(" "));

function highlight(code) {
  const re = /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|f?"(?:[^"\\\n]|\\.)*"?|f?'(?:[^'\\\n]|\\.)*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|(\s+|.)/g;
  const parts = [];
  let m, k = 0;
  while ((m = re.exec(code))) {
    const [t, com, str, num, word] = m;
    let color = T.text, style = {};
    if (com) { color = T.com; style.fontStyle = "italic"; }
    else if (str) color = T.str;
    else if (num) color = T.num;
    else if (word && KW.has(word)) { color = T.kw; style.fontWeight = 600; }
    else if (word && BI.has(word)) color = T.fn;
    parts.push(<span key={k++} style={{ color, ...style }}>{t}</span>);
  }
  return parts;
}

const LINE_H = 22;

export default function CodeEditor({ value, onChange, onRun, allowPaste = false, minLines = 6, readOnly = false, label = "main.py" }) {
  const ta = useRef(null);
  const pre = useRef(null);
  const gut = useRef(null);
  const [toast, setToast] = useState("");
  const lines = Math.max(minLines, value.split("\n").length);

  const edit = (next, selStart, selEnd = selStart) => {
    onChange(next);
    requestAnimationFrame(() => { if (ta.current) { ta.current.selectionStart = selStart; ta.current.selectionEnd = selEnd; } });
  };

  const onKeyDown = (e) => {
    const el = e.target, s = el.selectionStart, en = el.selectionEnd;
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); onRun?.(); return; }
    if (e.key === "Tab") {
      e.preventDefault();
      const ls = value.lastIndexOf("\n", s - 1) + 1;
      if (e.shiftKey) {
        const lead = value.slice(ls).match(/^ {1,4}/);
        if (lead) edit(value.slice(0, ls) + value.slice(ls + lead[0].length), Math.max(ls, s - lead[0].length));
      } else if (s !== en) {
        const block = value.slice(ls, en).replace(/^/gm, "    ");
        edit(value.slice(0, ls) + block + value.slice(en), s + 4, ls + block.length);
      } else edit(value.slice(0, s) + "    " + value.slice(en), s + 4);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const ls = value.lastIndexOf("\n", s - 1) + 1;
      const cur = value.slice(ls, s);
      let ind = cur.match(/^ */)[0];
      if (/:\s*(#.*)?$/.test(cur)) ind += "    ";
      const ins = "\n" + ind;
      edit(value.slice(0, s) + ins + value.slice(en), s + ins.length);
      return;
    }
    if (e.key === "Backspace" && s === en && s > 0) {
      const ls = value.lastIndexOf("\n", s - 1) + 1;
      const before = value.slice(ls, s);
      if (before.length && /^ +$/.test(before) && before.length % 4 === 0) {
        e.preventDefault();
        edit(value.slice(0, s - 4) + value.slice(s), s - 4);
      }
    }
  };

  const block = (e) => {
    if (allowPaste) return;
    e.preventDefault();
    setToast("Type it in yourself — that's how your fingers learn Python. ✍️");
    setTimeout(() => setToast(""), 2600);
  };

  const sync = () => {
    if (pre.current && ta.current) {
      pre.current.scrollTop = ta.current.scrollTop;
      pre.current.scrollLeft = ta.current.scrollLeft;
      gut.current.scrollTop = ta.current.scrollTop;
    }
  };

  const box = {
    margin: 0, padding: "10px 12px", fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: `${LINE_H}px`,
    whiteSpace: "pre", overflow: "auto", tabSize: 4, border: "none", letterSpacing: 0,
  };
  const height = Math.min(lines, 22) * LINE_H + 20;

  return (
    <div style={{ border: `1.5px solid ${T.borderStrong}`, borderRadius: 10, overflow: "hidden", background: T.codeBg, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", background: T.deep, borderBottom: `1px solid ${T.border}`, fontSize: 12, color: T.slate }}>
        <span style={{ width: 9, height: 9, borderRadius: 5, background: T.amber }} />
        <span style={{ fontFamily: CODE_FONT }}>{label}</span>
        <span style={{ marginLeft: "auto", color: T.muted, fontSize: 11 }}>{readOnly ? "read only" : "Tab = indent · Ctrl+Enter = run"}</span>
      </div>
      <div style={{ display: "flex", height }}>
        <div ref={gut} style={{ ...box, overflow: "hidden", padding: "10px 8px", minWidth: 40, textAlign: "right", color: T.muted, background: T.gutter, borderRight: `1px solid ${T.border}`, userSelect: "none" }}>
          {Array.from({ length: Math.max(lines, value.split("\n").length) }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
          <pre ref={pre} aria-hidden style={{ ...box, position: "absolute", inset: 0, color: T.text, pointerEvents: "none", overflow: "hidden" }}>
            {highlight(value)}{"\n"}
          </pre>
          <textarea
            ref={ta} value={value} readOnly={readOnly}
            onChange={(e) => onChange(e.target.value)} onKeyDown={readOnly ? undefined : onKeyDown}
            onScroll={sync} onPaste={block} onDrop={block}
            spellCheck={false} autoCorrect="off" autoCapitalize="off" autoComplete="off" data-gramm="false"
            aria-label="Python code editor"
            style={{ ...box, position: "absolute", inset: 0, width: "100%", height: "100%", resize: "none", outline: "none",
              background: "transparent", color: "transparent", caretColor: T.text }}
          />
        </div>
      </div>
      {toast && (
        <div style={{ position: "absolute", left: "50%", bottom: 12, transform: "translateX(-50%)", background: T.navy, color: "#fff", padding: "8px 14px", borderRadius: 8, fontSize: 13, boxShadow: "0 4px 14px rgba(0,0,0,.18)", whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
