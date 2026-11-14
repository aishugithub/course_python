// ── Lesson kit: the shared full-screen, light lesson frame ──
// A unit file supplies content only: sections (each a list of blocks —
// JSX or exercise specs) and quiz questions. This frame handles the header,
// tabs, progress, exercise persistence and the completion gate:
// a unit can only be finished once EVERY exercise in it has been solved.

import { createContext, useContext, useMemo, useState } from "react";
import CodeExercise from "./CodeExercise.jsx";
import { T, FONT, MONO, CODE_FONT, tint } from "./theme.js";

const Ctx = createContext(null);
const isSpec = (b) => b && typeof b === "object" && !b.$$typeof && b.kind && b.id;

const GLOBAL_CSS = `
  .fh-lesson { --pad: clamp(16px, 3.2vw, 44px); }
  .fh-ex { display: grid; grid-template-columns: minmax(260px, 5fr) minmax(0, 7fr); gap: 22px; align-items: start; }
  .fh-two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .fh-tabs::-webkit-scrollbar { display: none; }
  .fh-lesson code { font-family: ${CODE_FONT}; font-size: .92em; background: ${T.deep}; color: ${T.orange}; padding: 1px 6px; border-radius: 4px; }
  .fh-lesson button:focus-visible, .fh-lesson textarea:focus-visible { outline: 2px solid ${T.amber}; outline-offset: 2px; }
  @media (max-width: 920px) { .fh-ex, .fh-two { grid-template-columns: 1fr; } }
`;

// ── Small building blocks for unit files ──
export function P({ children }) {
  return <p style={{ color: T.slate, fontSize: 15.5, lineHeight: 1.75, margin: "0 0 14px", maxWidth: "78ch" }}>{children}</p>;
}

export function H({ children, kicker }) {
  return (
    <div style={{ margin: "4px 0 12px" }}>
      {kicker && <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.6, color: T.bronze, marginBottom: 4 }}>{kicker}</div>}
      <h2 style={{ fontSize: "clamp(22px, 2.4vw, 30px)", color: T.text, margin: 0, fontWeight: 700, letterSpacing: -0.3 }}>{children}</h2>
    </div>
  );
}

export function KeyIdea({ children, title = "Key idea" }) {
  return (
    <div style={{ marginTop: 18, background: tint(T.purple, "10"), border: `1px solid ${tint(T.purple, "44")}`, borderLeft: `4px solid ${T.purple}`, borderRadius: 10, padding: "12px 16px", fontSize: 14.5, color: T.slate, lineHeight: 1.65, maxWidth: "90ch" }}>
      🔑 <strong style={{ color: T.purple }}>{title}:</strong> {children}
    </div>
  );
}

export function Note({ children, color = T.yellow, icon = "⚠️" }) {
  return (
    <div style={{ marginTop: 14, background: tint(color, "12"), border: `1px solid ${tint(color, "44")}`, borderRadius: 10, padding: "12px 16px", fontSize: 14.5, color: T.slate, lineHeight: 1.65, maxWidth: "90ch" }}>
      {icon} {children}
    </div>
  );
}

export function CodeBlock({ code, title }) {
  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden", background: T.codeBg }}>
      {title && <div style={{ padding: "6px 12px", background: T.deep, fontSize: 12, color: T.slate, fontFamily: CODE_FONT }}>{title}</div>}
      <pre style={{ margin: 0, padding: "10px 14px", fontFamily: CODE_FONT, fontSize: 14, lineHeight: 1.6, color: T.text, whiteSpace: "pre-wrap" }}>{code}</pre>
    </div>
  );
}

export function Ex({ spec }) {
  const ctx = useContext(Ctx);
  return (
    <CodeExercise
      spec={spec}
      storageKey={`${ctx.unitId}:${spec.id}`}
      solved={ctx.solved.has(spec.id)}
      onPass={(payload) => ctx.pass(spec.id, payload)}
    />
  );
}

export const btnStyle = (bg = T.navy, fg = "#fff", disabled = false) => ({
  padding: "11px 20px", borderRadius: 9, border: "none", background: disabled ? T.borderStrong : bg, color: fg,
  fontWeight: 700, fontSize: 14.5, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit",
});

// ── Quiz (MCQ with an explanation after every answer) ──
function Quiz({ questions, onFinish }) {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const q = questions[cur];
  const choose = (i) => { if (sel !== null) return; setSel(i); if (i === q.answer) setScore((s) => s + 1); };
  const next = () => { if (cur < questions.length - 1) { setCur(cur + 1); setSel(null); } else onFinish(score, questions.length); };
  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ fontFamily: MONO, fontSize: 11, color: T.bronze, letterSpacing: 1.4, marginBottom: 8 }}>QUESTION {cur + 1} OF {questions.length}</div>
      <div style={{ color: T.text, fontWeight: 700, fontSize: 17, marginBottom: 12, lineHeight: 1.5 }}>{q.q}</div>
      {q.code && <div style={{ marginBottom: 12 }}><CodeBlock code={q.code} /></div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((o, i) => {
          let bg = T.card, bd = T.border, col = T.text;
          if (sel !== null && i === q.answer) { bg = tint(T.green, "14"); bd = T.green; col = T.green; }
          else if (sel === i) { bg = tint(T.red, "12"); bd = T.red; col = T.red; }
          return (
            <button key={i} onClick={() => choose(i)} style={{ textAlign: "left", padding: "11px 14px", borderRadius: 9, background: bg, border: `1.5px solid ${bd}`, color: col, fontSize: 14.5, cursor: sel === null ? "pointer" : "default", fontFamily: "inherit" }}>
              {sel !== null && i === q.answer ? "✓ " : sel === i ? "✗ " : ""}{o}
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <>
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 9, background: tint(T.purple, "10"), border: `1px solid ${tint(T.purple, "44")}`, color: T.slate, fontSize: 14, lineHeight: 1.6 }}>💡 {q.explain}</div>
          <button onClick={next} style={{ ...btnStyle(), marginTop: 12 }}>{cur < questions.length - 1 ? "Next question →" : "See results"}</button>
        </>
      )}
    </div>
  );
}

function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <rect x="1" y="19" width="9" height="9" rx="2.5" fill={T.navy} />
      <rect x="10.5" y="10" width="9" height="9" rx="2.5" fill={T.navy} />
      <rect x="20" y="1" width="9" height="9" rx="2.5" fill={T.amber} />
    </svg>
  );
}

// ── LessonShell ──
// lockAhead (Crucibles): a tab opens only when every earlier section is done.
export default function LessonShell({ unitId, crumb, title, sections, quiz, next, challengeProgress = [], onStageComplete, onUnitComplete, lockAhead = false }) {
  const allSpecs = useMemo(() => sections.flatMap((s, si) => (s.blocks || []).filter(isSpec).map((spec) => ({ spec, si }))), [sections]);
  const prefix = `${unitId}@ex:`;
  const [solved, setSolved] = useState(() => new Set(challengeProgress.filter((p) => p.startsWith(prefix)).map((p) => p.slice(prefix.length))));
  const [active, setActive] = useState(0);
  const [quizResult, setQuizResult] = useState(null);

  const pass = (id, payload) => {
    if (solved.has(id)) return;
    setSolved((s) => new Set([...s, id]));
    onStageComplete?.(prefix + id, payload);
  };

  const tabs = [...sections.map((s) => s.label), "Quiz & Finish"];
  const isQuiz = active === sections.length;
  const sectionSpecs = (si) => allSpecs.filter((x) => x.si === si && !x.spec.optional);
  const sectionDone = (si) => sectionSpecs(si).every((x) => solved.has(x.spec.id));
  const required = allSpecs.filter((x) => !x.spec.optional);
  const solvedCount = required.filter((x) => solved.has(x.spec.id)).length;
  const missing = required.filter((x) => !solved.has(x.spec.id));
  const pct = (solvedCount + (quizResult ? 1 : 0)) / (required.length + 1);

  const firstOpen = sections.findIndex((_, i) => !sectionDone(i));
  const isLocked = (i) => lockAhead && firstOpen !== -1 && i > firstOpen;
  const sec = sections[active];
  const curSpecs = isQuiz ? [] : sectionSpecs(active);
  const curLeft = curSpecs.filter((x) => !solved.has(x.spec.id)).length;

  return (
    <Ctx.Provider value={{ unitId, solved, pass }}>
      <div className="fh-lesson" style={{ background: T.bg, minHeight: "100vh", fontFamily: FONT, color: T.text, paddingBottom: 60 }}>
        <style>{GLOBAL_CSS}</style>

        {/* header */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,.96)", backdropFilter: "blur(6px)", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px var(--pad) 10px calc(var(--pad) + 44px)" }}>
            <Logo />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.4, color: T.bronze }}>{crumb}</div>
              <div style={{ fontSize: 17, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right", fontSize: 12.5, color: T.slate, whiteSpace: "nowrap" }}>
              <strong style={{ color: T.text }}>{solvedCount}</strong> / {required.length} programs written
            </div>
          </div>
          <div style={{ height: 3, background: T.deep }}>
            <div style={{ height: "100%", width: `${pct * 100}%`, background: T.green, transition: "width .4s" }} />
          </div>
          {/* tabs */}
          <div className="fh-tabs" style={{ display: "flex", gap: 6, overflowX: "auto", padding: "8px var(--pad)", scrollbarWidth: "none" }}>
            {tabs.map((t, i) => {
              const on = i === active;
              const done = i < sections.length ? sectionSpecs(i).length > 0 && sectionDone(i) : !!quizResult;
              return (
                <button key={i} disabled={isLocked(i)} title={isLocked(i) ? "Locked — finish the earlier stages first" : undefined} onClick={() => { setActive(i); window.scrollTo({ top: 0 }); }} style={{
                  flex: "0 0 auto", padding: "8px 14px", borderRadius: 999, border: `1.5px solid ${on ? T.navy : T.border}`,
                  background: on ? T.navy : T.card, color: on ? "#fff" : T.slate, fontSize: 13, fontWeight: on ? 700 : 500,
                  cursor: isLocked(i) ? "not-allowed" : "pointer", opacity: isLocked(i) ? 0.5 : 1, fontFamily: "inherit", whiteSpace: "nowrap",
                }}>
                  {isLocked(i) && <span style={{ marginRight: 4 }}>🔒</span>}
                  {done && <span style={{ color: on ? "#9BE3BC" : T.green, marginRight: 4 }}>✓</span>}
                  <span style={{ opacity: 0.6, marginRight: 4 }}>{i + 1}</span>{t}
                </button>
              );
            })}
          </div>
        </div>

        {/* body — full width */}
        <div style={{ padding: "26px var(--pad) 0" }}>
          {!isQuiz && (
            <>
              {sec.title && <H kicker={sec.kicker}>{sec.title}</H>}
              {(sec.blocks || []).map((b, i) => (isSpec(b) ? <Ex key={b.id} spec={b} /> : <div key={i}>{b}</div>))}

              <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <button disabled={curLeft > 0} onClick={() => { setActive(active + 1); window.scrollTo({ top: 0 }); }} style={btnStyle(T.navy, "#fff", curLeft > 0)}>
                  Continue → {tabs[active + 1]}
                </button>
                {curLeft > 0 && (
                  <span style={{ fontSize: 13.5, color: T.slate }}>
                    ✍️ Write {curLeft === 1 ? "the program" : `the ${curLeft} programs`} above to continue ({curSpecs.length - curLeft}/{curSpecs.length} done)
                  </span>
                )}
              </div>
            </>
          )}

          {isQuiz && (
            <>
              <H kicker="CHECK YOURSELF">Quiz & Finish</H>
              {!quizResult ? (
                <Quiz questions={quiz} onFinish={(score, total) => setQuizResult({ score, total })} />
              ) : (
                <div style={{ maxWidth: 820 }}>
                  <div style={{ fontSize: 46 }}>{quizResult.score === quizResult.total ? "🎉" : quizResult.score >= quizResult.total / 2 ? "👍" : "💪"}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, margin: "6px 0" }}>Quiz: {quizResult.score} / {quizResult.total}</div>
                  <P>{quizResult.score === quizResult.total ? "Perfect score — and you wrote every program yourself." : quizResult.score >= quizResult.total / 2 ? "Good work. Re-read the explanations above for the ones you missed." : "Worth another look: revisit the sections, re-run your programs, then retake the quiz."}</P>
                  <button onClick={() => setQuizResult(null)} style={{ ...btnStyle(T.card, T.text), border: `1px solid ${T.border}`, marginBottom: 18 }}>↺ Retake quiz</button>

                  {missing.length > 0 ? (
                    <div style={{ background: tint(T.amber, "14"), border: `1.5px solid ${T.amber}`, borderRadius: 12, padding: "16px 18px" }}>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>✍️ {missing.length} program{missing.length > 1 ? "s" : ""} still to write</div>
                      <div style={{ fontSize: 14, color: T.slate, marginBottom: 10 }}>This unit is complete only when you've written every program yourself.</div>
                      {missing.map((x) => (
                        <button key={x.spec.id} onClick={() => { setActive(x.si); window.scrollTo({ top: 0 }); }} style={{ display: "block", background: "none", border: "none", color: T.blue, fontSize: 14, cursor: "pointer", padding: "3px 0", fontFamily: "inherit", textAlign: "left" }}>
                          → {sections[x.si].label}: {x.spec.title}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div style={{ background: `linear-gradient(135deg, ${tint(T.amber, "22")}, ${tint(T.green, "18")})`, border: `1.5px solid ${T.amber}`, borderRadius: 14, padding: "20px 22px" }}>
                      <div style={{ fontWeight: 700, fontSize: 19, marginBottom: 6 }}>🎓 {crumb.split("›").pop().trim().replace("UNIT", "Unit")} complete!</div>
                      <div style={{ fontSize: 14.5, color: T.slate, lineHeight: 1.65, marginBottom: 14 }}>
                        You wrote {required.length} real Python programs in this unit.
                        {next && <><br /><strong style={{ color: T.text }}>Next up: {next.title}.</strong> {next.text}</>}
                      </div>
                      <button onClick={() => onUnitComplete?.({ quiz: quizResult.score, of: quizResult.total, programs: required.length })} style={btnStyle(T.green)}>
                        Finish unit & save progress ✓
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Ctx.Provider>
  );
}
