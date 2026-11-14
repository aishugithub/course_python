// ── CodeExercise ──
// The heart of the redesign: the learner TYPES real Python, runs it in the
// browser, and is checked against tests (incl. hidden ones). Errors are
// explained by the error coach; hints unlock one per failed check; a model
// solution appears only after repeated failures — and must still be typed.
//
// Spec fields (see .claude/skills/foothold-code-lesson/SKILL.md):
//   id, kind ("type"|"write"|"fix"|"complete"|"modify"|"make"), title, task (JSX)
//   show (reference code for type-along; showLabel renames its header, e.g. a file the program reads), starter, solution, hints[]
//   tests[]: { inputs[], expect?, check?(stdout, res) => msg|null, hidden?, label? }
//   requires[] / forbids[]: AST rules → { node|call|name|text|constant, min|max, msg }
//   post: Python asserts run after the code (variables are in scope)
//   allowPaste (default false), minLines, timeoutMs
//   kind "predict": code (the program to trace), inputs[] (what the user types);
//   the editor holds the predicted OUTPUT; solution = the exact output.

import { useEffect, useMemo, useRef, useState } from "react";
import CodeEditor from "./CodeEditor.jsx";
import { runPython, onStatus, warmUp } from "./pyRunner.js";
import { coach, norm } from "./errorCoach.js";
import { grade } from "./grade.js";
import { T, CODE_FONT, MONO, tint } from "./theme.js";

const KIND = {
  type: { label: "TYPE IT", color: T.blue, verb: "Type this program yourself, then run it." },
  write: { label: "WRITE IT", color: T.green, verb: "Write the program from scratch." },
  fix: { label: "FIX IT", color: T.red, verb: "This code is broken. Run it, read the error, fix it." },
  complete: { label: "COMPLETE IT", color: T.purple, verb: "Fill in the missing part." },
  modify: { label: "MODIFY IT", color: T.orange, verb: "Change the working program to do something new." },
  make: { label: "MAKE IT", color: T.amber, verb: "Your own program, start to finish." },
  predict: { label: "TRACE IT", color: T.teal, verb: "Don't run it — read it the way Python would, then type exactly what it prints." },
};

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};

function Terminal({ run }) {
  if (!run) return (
    <div style={{ color: "#8EA0BF", fontFamily: CODE_FONT, fontSize: 13 }}>Output appears here when you press ▶ Run.</div>
  );
  return (
    <>
      {run.stdout && <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 13.5, lineHeight: 1.55, whiteSpace: "pre-wrap", color: T.termText }}>{run.stdout}</pre>}
      {!run.stdout && !run.error && !run.images?.length && !run.html?.length && (
        <div style={{ color: "#8EA0BF", fontFamily: CODE_FONT, fontSize: 13 }}>(the program ran but printed nothing)</div>
      )}
      {run.images?.map((b64, i) => (
        <img key={i} alt={`plot ${i + 1}`} src={`data:image/png;base64,${b64}`} style={{ maxWidth: "100%", background: "#fff", borderRadius: 6, marginTop: 8 }} />
      ))}
      {run.html?.map((h, i) => (
        <iframe key={`h${i}`} title={`interactive chart ${i + 1}`} srcDoc={h} sandbox="allow-scripts" style={{ width: "100%", height: 420, border: 0, background: "#fff", borderRadius: 6, marginTop: 8 }} />
      ))}
      {run.error && (
        <pre style={{ margin: run.stdout ? "8px 0 0" : 0, fontFamily: CODE_FONT, fontSize: 13, whiteSpace: "pre-wrap", color: T.termErr }}>
          {run.error.line ? `  File "main.py", line ${run.error.line}\n` : ""}{run.error.type}: {run.error.msg}
        </pre>
      )}
    </>
  );
}

function CoachCard({ c }) {
  return (
    <div style={{ background: tint(T.red, "10"), border: `1px solid ${tint(T.red, "44")}`, borderRadius: 10, padding: "12px 14px" }}>
      <div style={{ color: T.red, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>🩺 {c.title}</div>
      {c.src && (
        <div style={{ fontFamily: CODE_FONT, fontSize: 13, background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, padding: "4px 8px", margin: "6px 0", color: T.text }}>
          <span style={{ color: T.muted }}>line {c.line}: </span>{c.src}
        </div>
      )}
      <div style={{ color: T.slate, fontSize: 13.5, lineHeight: 1.6 }}>{c.body}</div>
      {c.tip && <div style={{ color: T.text, fontSize: 13.5, marginTop: 6 }}>👉 {c.tip}</div>}
    </div>
  );
}

export default function CodeExercise({ spec, solved = false, onPass, storageKey }) {
  const kind = KIND[spec.kind] || KIND.write;
  const key = `fh-code:${storageKey || spec.id}`;
  const [code, setCode] = useState(() => store.get(key) ?? spec.starter ?? "");
  const [pyStatus, setPyStatus] = useState("idle");
  const [busy, setBusy] = useState(null); // null | "run" | "check"
  const [phase, setPhase] = useState("");
  const [lastRun, setLastRun] = useState(null);
  const [verdict, setVerdict] = useState(null); // { ok, items[], coach }
  const [fails, setFails] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [passed, setPassed] = useState(solved);
  const errorsSeen = useRef([]);
  const runs = useRef(0);

  useEffect(() => { warmUp(); return onStatus(setPyStatus); }, []);
  useEffect(() => { setPassed((p) => p || solved); }, [solved]);
  useEffect(() => { store.set(key, code); }, [key, code]);

  const tests = spec.tests || [];
  const sampleInputs = tests[0]?.inputs || [];
  const hints = spec.hints || [];
  const canSolution = spec.solution && fails >= Math.max(2, hints.length + 1);
  const predict = spec.kind === "predict";

  const exec = (inputs) => runPython(code, {
    inputs, post: spec.post || "", requires: spec.requires || [], forbids: spec.forbids || [],
    setup: tests[0]?.setup ?? spec.setup ?? "",
    timeoutMs: spec.timeoutMs || 5000, onPhase: setPhase,
  });

  const run = async () => {
    if (busy) return;
    setBusy("run"); setVerdict(null); runs.current++;
    const res = await exec(sampleInputs);
    if (res.error) errorsSeen.current.push(res.error.type);
    setLastRun(res); setBusy(null); setPhase("");
  };

  const check = async () => {
    if (busy) return;
    setBusy("check"); runs.current++;
    const { ok, items, coach: errCoach, first, errors } = await grade(spec, code, { onPhase: setPhase });
    errorsSeen.current.push(...errors);
    setLastRun(first); setVerdict({ ok, items, coach: errCoach }); setBusy(null); setPhase("");
    if (ok) {
      if (!passed) {
        setPassed(true);
        onPass?.({ attempts: fails + 1, runs: runs.current, errors: [...new Set(errorsSeen.current)].slice(0, 8) });
      }
    } else {
      setFails((f) => f + 1);
      // 1st failed check: the coach/diff is enough. From the 2nd on, auto-reveal one hint each time.
      setHintsShown((h) => Math.min(hints.length, Math.max(h, fails)));
    }
  };

  const runCoach = useMemo(() => (lastRun?.error && !verdict ? coach(lastRun.error, code) : null), [lastRun, verdict]); // eslint-disable-line

  const btn = (bg, fg = "#fff", disabled = false) => ({
    padding: "10px 18px", borderRadius: 8, border: "none", background: disabled ? T.borderStrong : bg, color: fg,
    fontWeight: 700, fontSize: 14, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit",
  });

  return (
    <div style={{ background: T.card, border: `1.5px solid ${passed ? tint(T.green, "66") : T.border}`, borderRadius: 14, padding: 18, marginTop: 18, boxShadow: "0 1px 0 rgba(22,41,74,.04)" }}>
      <div className="fh-ex">
        {/* ── left: the task ── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.2, fontWeight: 700, color: "#fff", background: kind.color, padding: "3px 8px", borderRadius: 5 }}>{kind.label}</span>
            {passed && <span style={{ fontSize: 12, fontWeight: 700, color: T.green }}>✓ Solved</span>}
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: T.text, marginBottom: 6 }}>{spec.title}</div>
          <div style={{ fontSize: 13, color: T.muted, marginBottom: 10 }}>{kind.verb}</div>
          <div style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.65 }}>{spec.task}</div>

          {(spec.show || predict) && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: 1.2, color: T.bronze, marginBottom: 4 }}>
                {predict ? `TRACE THIS PROGRAM${spec.inputs?.length ? ` — THE USER TYPES ${spec.inputs.map((x) => `"${x}"`).join(", ")}` : ""}` : spec.showLabel || "TYPE THIS — DON'T COPY"}
              </div>
              <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 14, lineHeight: 1.6, background: T.surface, border: `1px dashed ${T.borderStrong}`, borderRadius: 8, padding: "10px 12px", color: T.text, userSelect: "none", whiteSpace: "pre-wrap" }}>{predict ? spec.code : spec.show}</pre>
            </div>
          )}

          {tests[0]?.expect !== undefined && !tests[0]?.hidden && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: 1.2, color: T.bronze, marginBottom: 4 }}>
                EXPECTED OUTPUT{sampleInputs.length ? ` (when the user types ${sampleInputs.map((x) => `"${x}"`).join(", ")})` : ""}
              </div>
              <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 13.5, lineHeight: 1.55, background: T.termBg, color: T.termText, borderRadius: 8, padding: "10px 12px", whiteSpace: "pre-wrap" }}>{norm(tests[0].expect) || " "}</pre>
            </div>
          )}

          {/* hints */}
          {hints.length > 0 && (
            <div style={{ marginTop: 14 }}>
              {hints.slice(0, hintsShown).map((h, i) => (
                <div key={i} style={{ background: tint(T.amber, "1A"), border: `1px solid ${tint(T.amber, "66")}`, borderRadius: 8, padding: "8px 12px", fontSize: 13.5, color: T.text, marginBottom: 6, lineHeight: 1.55 }}>
                  💡 <strong>Hint {i + 1}:</strong> {h}
                </div>
              ))}
              {hintsShown < hints.length && (
                <button onClick={() => setHintsShown((h) => h + 1)} disabled={fails === 0 && runs.current === 0}
                  style={{ background: "none", border: "none", color: fails === 0 && runs.current === 0 ? T.muted : T.bronze, fontWeight: 700, fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                  {fails === 0 && runs.current === 0 ? "💡 Hints unlock after your first try" : `💡 I'm stuck — show hint ${hintsShown + 1}`}
                </button>
              )}
            </div>
          )}
          {canSolution && !passed && (
            <div style={{ marginTop: 10 }}>
              {!showSolution ? (
                <button onClick={() => setShowSolution(true)} style={{ background: "none", border: "none", color: T.slate, fontSize: 13, cursor: "pointer", textDecoration: "underline", padding: 0, fontFamily: "inherit" }}>
                  Still stuck? Show one correct solution (you'll still type it)
                </button>
              ) : (
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: 1.2, color: T.bronze, margin: "6px 0 4px" }}>{predict ? "WHAT PYTHON PRINTS — FIND WHERE YOUR TRACE WENT WRONG, THEN TYPE IT" : "ONE CORRECT SOLUTION — STUDY IT, THEN TYPE IT"}</div>
                  <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 13.5, lineHeight: 1.6, background: T.surface, border: `1px dashed ${T.borderStrong}`, borderRadius: 8, padding: "10px 12px", userSelect: "none", whiteSpace: "pre-wrap", color: T.text }}>{spec.solution}</pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── right: editor + terminal ── */}
        <div style={{ minWidth: 0 }}>
          {predict && <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: 1.2, color: T.bronze, marginBottom: 4 }}>YOUR PREDICTION — TYPE THE OUTPUT, LINE BY LINE</div>}
          <CodeEditor value={code} onChange={setCode} onRun={predict ? check : run} allowPaste={spec.allowPaste} minLines={spec.minLines || (predict ? 4 : 6)} />
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
            {!predict && <button onClick={run} disabled={!!busy || pyStatus === "failed"} style={btn(T.navy, "#fff", !!busy)}>{busy === "run" ? "Running…" : "▶ Run"}</button>}
            <button onClick={check} disabled={!!busy || pyStatus === "failed"} style={btn(T.green, "#fff", !!busy)}>{busy === "check" ? "Checking…" : predict ? "✓ Check my prediction" : "✓ Check my answer"}</button>
            {spec.starter !== undefined && code !== (spec.starter || "") && (
              <button onClick={() => { setCode(spec.starter || ""); setLastRun(null); setVerdict(null); }} style={{ ...btn("transparent", T.slate), border: `1px solid ${T.border}`, fontWeight: 600 }}>↺ Reset</button>
            )}
            <span style={{ fontSize: 12, color: T.muted, marginLeft: "auto" }}>
              {pyStatus === "loading" && !busy && "⏳ Loading Python (first time takes ~10 s)…"}
              {busy && phase === "packages" && "⏳ Loading libraries…"}
              {pyStatus === "failed" && <span style={{ color: T.red }}>Python couldn't load — check your internet and reload.</span>}
            </span>
          </div>

          <div style={{ marginTop: 10, background: T.termBg, borderRadius: 10, padding: "10px 14px", minHeight: 70, maxHeight: 340, overflow: "auto" }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 1.4, color: "#8EA0BF", marginBottom: 6 }}>
              {predict ? "PYTHON'S OUTPUT" : `OUTPUT${sampleInputs.length ? ` · test input: ${sampleInputs.join(", ")}` : ""}`}
            </div>
            {predict && !lastRun
              ? <div style={{ color: "#8EA0BF", fontFamily: CODE_FONT, fontSize: 13 }}>Python's real output appears here once your prediction is right.</div>
              : <Terminal run={lastRun} />}
          </div>

          {runCoach && <div style={{ marginTop: 10 }}><CoachCard c={runCoach} /></div>}

          {verdict && (
            <div style={{ marginTop: 10 }}>
              {verdict.ok ? (
                <div style={{ background: tint(T.green, "14"), border: `1.5px solid ${T.green}`, borderRadius: 10, padding: "12px 14px", color: T.green, fontWeight: 700, fontSize: 14.5 }}>
                  🎉 Correct! {spec.success || (predict ? "Your trace matches Python exactly." : "Every test passed.")}
                </div>
              ) : (
                <>
                  {verdict.coach && <CoachCard c={verdict.coach} />}
                  <div style={{ marginTop: verdict.coach ? 8 : 0, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 14px" }}>
                    {verdict.items.map((it, i) => (
                      <div key={i} style={{ fontSize: 13.5, color: it.ok ? T.green : T.red, padding: "3px 0", lineHeight: 1.55 }}>
                        {it.ok ? "✓" : "✗"} <strong>{it.label}</strong>{it.msg ? <span style={{ color: T.slate }}> — {it.msg}</span> : ""}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
