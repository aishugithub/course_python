// ── Grading: run a spec's tests against some code ──
// Shared by CodeExercise (the learner's Check button) and selfTest (the
// author's check that every model solution passes and every starter fails).

import { runPython } from "./pyRunner.js";
import { coach, diffHint, norm } from "./errorCoach.js";

// A hidden test failed: reveal the input it used and the first wrong line, so
// the learner can reproduce it — but say plainly that the example alone passed.
function hiddenHint(t, got) {
  const gl = norm(got).split("\n"), el = norm(t.expect).split("\n");
  const i = el.findIndex((l, k) => l !== gl[k]);
  const when = t.inputs?.length ? `when the user types ${t.inputs.map((x) => `"${x}"`).join(", ")}` : "with different values";
  const line = i >= 0 ? ` Expected "${el[i]}" but got "${gl[i] ?? "(nothing)"}".` : "";
  return `Works for the example, but not ${when}.${line} ${t.why || "Check edge cases — or is something hard-coded?"}`;
}

// kind "predict": the learner types the OUTPUT they expect from spec.code
// (no running allowed). Python runs spec.code; the prediction must match it.
// The verdict says where the prediction first goes wrong, never what's right.
async function gradePrediction(spec, text, onPhase) {
  const res = await runPython(spec.code, { inputs: spec.inputs || [], setup: spec.setup || "", timeoutMs: spec.timeoutMs || 5000, onPhase });
  const want = norm(res.stdout + (res.error ? `${res.stdout && !res.stdout.endsWith("\n") ? "\n" : ""}${res.error.type}: ${res.error.msg}` : ""));
  const got = norm(text || "");
  if (got === want) return { ok: true, items: [{ ok: true, label: "Prediction" }], coach: null, first: res, errors: [] };
  const w = want.split("\n"), g = got ? got.split("\n") : [];
  const i = w.findIndex((l, k) => l !== g[k]);
  const upTo = (n) => (n === 1 ? "Line 1 is" : `Lines 1–${n} are`);
  const squash = (l) => l.replace(/\s+/g, " ").trim();
  let msg;
  if (!got) msg = "Type the output you predict — every line, exactly as Python would print it.";
  else if (i === -1) msg = `Your first ${w.length} line${w.length > 1 ? "s are" : " is"} right, but Python stops there — you predicted ${g.length} lines.`;
  else if (g[i] === undefined) msg = `${upTo(i)} right, but Python prints more: ${w.length} lines in all.`;
  else if (squash(g[i]) === squash(w[i])) msg = `Line ${i + 1} has the right values but the wrong spacing.`;
  else msg = `Line ${i + 1} isn't what Python prints.${i > 0 ? ` (${upTo(i)} right.)` : ""} Python prints ${w.length} line${w.length > 1 ? "s" : ""} in all.`;
  return { ok: false, items: [{ ok: false, label: "Prediction", msg }], coach: null, first: null, errors: [] };
}

export async function grade(spec, code, { onPhase } = {}) {
  if (spec.kind === "predict") return gradePrediction(spec, code, onPhase);
  const tests = spec.tests?.length ? spec.tests : [{ inputs: [] }];
  const items = [];
  const errors = [];
  let first = null, errCoach = null, visibleFailed = false;
  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    // Hidden tests only matter once the visible ones pass — otherwise their
    // "did you hard-code?" message is noise on top of the real problem.
    if (t.hidden && visibleFailed) continue;
    const res = await runPython(code, {
      inputs: t.inputs || [], post: t.post ?? spec.post ?? "", requires: spec.requires || [], forbids: spec.forbids || [],
      setup: t.setup ?? spec.setup ?? "",
      timeoutMs: spec.timeoutMs || 5000, onPhase,
    });
    if (i === 0) first = res;
    const label = t.label || (t.hidden ? `Hidden test ${i + 1}` : tests.length > 1 ? `Test ${i + 1}` : "Output");
    if (res.error) {
      errors.push(res.error.type);
      errCoach = coach(res.error, code);
      items.push({ ok: false, label, msg: `Crashed with ${res.error.type}.${t.hidden && t.why ? " " + t.why : ""}` });
      break;
    }
    let msg = null;
    if (t.expect !== undefined && norm(res.stdout) !== norm(t.expect)) {
      msg = t.hidden ? hiddenHint(t, res.stdout) : diffHint(res.stdout, t.expect);
    }
    if (!msg && t.check) msg = t.check(res.stdout, res, code);
    items.push({ ok: !msg, label, msg });
    if (msg && !t.hidden) visibleFailed = true;
    if (i === 0) (res.static || []).forEach((m) => items.push({ ok: false, label: "Rule", msg: m }));
    // post checks can differ per test (e.g. the file a program saved), so report each test's
    if (i === 0 || t.post) (res.post || []).forEach((m) => { if (!items.some((x) => x.msg === m)) items.push({ ok: false, label: t.hidden ? `Hidden check ${i + 1}` : "Check", msg: m }); });
  }
  if (spec.validate && first && !first.error) {
    const m = spec.validate(code, first);
    if (m) items.push({ ok: false, label: "Rule", msg: m });
  }
  return { ok: items.length > 0 && items.every((x) => x.ok), items, coach: errCoach, first, errors };
}
