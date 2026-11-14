// ── Author self-test ──
// For every exercise in a unit: the model solution must PASS, and the
// starter (or an empty editor) must FAIL. Run from the browser console on
// the dev server:
//   const { selfTest } = await import("/course_python/src/kit/selfTest.js");
//   await selfTest("Unit4_1");

import { grade } from "./grade.js";

export async function selfTest(unitId) {
  const mod = await import(/* @vite-ignore */ `/course_python/src/lessons/${unitId}.jsx?t=${Date.now()}`);
  const specs = Object.values(mod.EXERCISES || {});
  const rows = [];
  for (const spec of specs) {
    const sol = spec.solution ? await grade(spec, spec.solution) : null;
    const start = await grade(spec, spec.starter ?? "");
    rows.push({
      id: spec.id,
      solutionPasses: sol ? sol.ok : "no solution",
      starterFails: !start.ok,
      problem: sol && !sol.ok ? sol.items.filter((i) => !i.ok).map((i) => `${i.label}: ${i.msg}`).join(" | ") || sol.coach?.raw : "",
    });
  }
  const bad = rows.filter((r) => r.solutionPasses !== true || !r.starterFails);
  return { total: rows.length, bad: bad.length, rows };
}

// Render check: mount each unit off-screen, open every section tab, and
// collect any React errors. Usage (browser console on the dev server):
//   const { renderCheck } = await import("/course_python/src/kit/selfTest.js");
//   await renderCheck(["Unit11_1", "Unit11_2"]);
export async function renderCheck(ids) {
  const React = await import("react");
  const { createRoot } = await import("react-dom/client");
  const out = {};
  for (const id of ids) {
    const errs = [];
    const oe = console.error;
    console.error = (...a) => errs.push(String(a[0]).slice(0, 200));
    const div = document.createElement("div");
    document.body.appendChild(div);
    try {
      const mod = await import(/* @vite-ignore */ `/course_python/src/lessons/${id}.jsx?t=${Date.now()}`);
      const root = createRoot(div);
      root.render(React.createElement(mod.default, { student: {}, onStageComplete() {}, onUnitComplete() {}, challengeProgress: [] }));
      await new Promise((r) => setTimeout(r, 500));
      out[id] = { chars: div.innerText.length, editors: div.querySelectorAll("textarea").length, errs };
      root.unmount();
    } catch (e) {
      out[id] = { crash: String(e) };
    }
    console.error = oe;
    div.remove();
  }
  return out;
}
