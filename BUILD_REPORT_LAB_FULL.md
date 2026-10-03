# Build Report — MED23CL202 Python Lab: full build (Exp 6–10, OOP + 3 more crucibles, Lab certificate)

**Course:** MED23CL202 Python Programming Laboratory (Foothold) · **Module:** `LAB` (e-observation record)
**Build date:** 2026-10-03 · Autonomous scheduled run. **No git commands were run** — review, commit & push are yours.
**Authoritative brief:** Cowork project doc `claude/LAB-med-build-spec-2026-10-03.md` (read in full), plus
`MED PYTHON LAB/LAB_SANDBOX_HANDOFF.md`, `BUILD_REPORT_LAB345.md`, and the lab manual
`Python_Lab_Manual_MED23CL202_1Credit.ipynb - Colab.pdf` (Exp 6–10 read with pdfplumber, matched byte-for-byte).

---

## Files created (all written straight into the repo)

| File | What it is | approx. lines |
|------|-----------|------:|
| `src/lessons/UnitLAB4_5.jsx` | **Mini-Project Crucible — Exp 3 & 4** (OOP: classes/encapsulation, inheritance/polymorphism). 4 tracks × Spark→Flame→Forge→Temper. | ~1050 |
| `src/lessons/UnitLAB6.jsx` | **Experiment 6** — File Operations & CSV Records (2 programs × 3 gated stages). | ~560 |
| `src/lessons/UnitLAB7.jsx` | **Experiment 7** — Exception Handling: try/except. | ~560 |
| `src/lessons/UnitLAB8.jsx` | **Experiment 8** — raise, finally & User-defined Exceptions. | ~560 |
| `src/lessons/UnitLAB9.jsx` | **Experiment 9** — Data Analysis with Pandas (run stage = self-check, see judgment calls). | ~560 |
| `src/lessons/UnitLAB10.jsx` | **Experiment 10** — Visualization: Matplotlib & Seaborn (run stage = self-check). | ~560 |
| `src/lessons/UnitLAB6_5.jsx` | **Mini-Project Crucible — Exp 5 & 6** (text files & CSV). 4 tracks × 4 stages. | ~1000 |
| `src/lessons/UnitLAB8_5.jsx` | **Mini-Project Crucible — Exp 7 & 8** (try/except, raise, custom exceptions). | ~1000 |
| `src/lessons/UnitLAB10_5.jsx` | **Mini-Project Crucible — Exp 9 & 10** (analysis & charts; analysed in plain Python). | ~1000 |
| `src/shell/labCompletion.js` | Lab-certificate gate helper — reads ONLY existing Progress rows (no Code.gs change). | ~75 |
| `src/shell/LabCertificate.jsx` | The **separate** Lab certificate (sign-in only, server-verified, print-to-PDF, no time). | ~180 |

## Files edited (minimal shell wiring + config — the allowed exceptions)

- `config/course.config.js` — registered all nine new units in the `LAB` module (all `optional: true`, each
  with a catchy blurb). **Final order (confirmed programmatically):**
  `LAB1, LAB2, LAB2_5, LAB3, LAB4, LAB4_5, LAB5, LAB6, LAB6_5, LAB7, LAB8, LAB8_5, LAB9, LAB10, LAB10_5`.
  Config was committed **only after** every referenced `.jsx` existed in `src/lessons/` — the app never
  references a missing unit.
- `src/shell/App.jsx` — added the LAB-certificate entry point (import, `handleOpenLabCertificate`, a
  `view === 'labCertificate'` branch, and two props passed to `Dashboard`). Minimal, mirroring the generic
  cert hook. The generic `Certificate.jsx` / `completion.js` behaviour is untouched.
- `src/shell/Dashboard.jsx` — added a **separate, blue-accented** Lab-certificate banner beneath the course
  certificate banner (guest → sign-in nudge; signed-in → live track/crucible progress or the download button).

**Not touched (deferred / out of scope, as instructed):** the generic 4-branch mini-project tracks
(`UnitMP_*` beyond the existing `UnitMP_GEN`), the generic feedback unit `UnitFB`, and the generic
`Certificate.jsx` / `completion.js`.

---

## Architecture respected (from LAB_SANDBOX_HANDOFF)

- Experiment units cloned from `UnitLAB5.jsx`: 2 programs × 3 gated stages (Algorithm reorder → Flowchart
  reorder → Program fill-blanks + Pyodide run against a visible + a hidden anti-hard-coding test). The
  Pyodide harness (lazy-load v0.26.4 from jsDelivr, shared `window.__lab_pyodide`, `input()` shim that echoes
  `prompt+value+"\n"`, per-test `setup`/`transform`) is reused verbatim.
- Crucibles cloned from `UnitLAB2_5.jsx`: track chooser (same 4 tracks 🅰 Patient Vitals Monitor · 🅱 Pharmacy
  Stock Manager · 🅲 Clinic Appointment Book · 🅳 Health-Camp Screening Analyzer), each track gated
  Spark→Flame→Forge→Temper. Pseudo-ids `UnitLAB{N}_5@{A|B|C|D}_{spark|flame|forge|temper}`. Completing the
  CHOSEN track calls `onUnitComplete()` behind a "Submit checkpoint" button (never auto-fired).
- Self-contained lessons (no cross-lesson imports; shared widgets copied into each file), dark palette
  verbatim, light comments only.

---

## Verification gate — PASS

Every Python program was executed in **real CPython** before being embedded, reproducing the exact harness
each stage uses (feeder with `input()` echo; per-test `setup`/`transform`; first-occurrence `.replace`;
`stdout.strip() == expect.strip()`). Three suites:

```
verify_lab4_5.py        32/32  (OOP crucible: Spark predictions, Flame crash/logic, Forge runs, Temper visible+hidden)
verify_lab_exp678.py    14/14  (Exp 6/7/8 programs: each visible + hidden anti-hard-coding test;
                                 incl. proof the custom-exception base must be Exception)
verify_cruc.py          42/42  (crucibles 6_5 / 8_5 / 10_5: Spark, Flame behaviour, Forge runs, Temper visible+hidden)
```

**Hidden-test mechanisms (anti-hard-coding), by file:**
- **LAB6 P1** append: hidden `transform` appends a *different* record (`John`→`Zoya`) — only a real append reproduces it.
- **LAB6 P2** CSV: hidden `transform` seeds a *different* first row (`Ravi,45`→`Kiran,60`) — a true reader prints it.
- **LAB7 P1/P2**: hidden tests take the *other* branch (valid number; valid BMI; bad-text ValueError) to prove every path.
- **LAB8 P1/P2**: hidden `transform` changes the raised message — proves `e` / the custom exception really carry it; and that an `object` base raises `TypeError` (so the blank must be `Exception`).
- **Crucible Tempers**: every hidden test changes the pre-set data (seeded file contents / the validated value /
  the readings list) so a hard-coded print fails. The `injectedVars` guard still blocks re-declaring the given data.
- Round-tripped three crucible Tempers by decoding the embedded `pre` strings as the browser would (JSON/JS
  escape rules) and executing `pre + "\n" + reference-solution` — all produced the exact expected output, so the
  `\n` vs `\\n` escaping in the generated files is correct.

**JSX syntax check:** every new/edited `.jsx` + `labCompletion.js` parsed clean with a freshly installed
`esbuild-wasm@0.21.5` (loader `jsx`, `jsx: automatic`) — the repo's bundled win32 `esbuild` can't run in the
Linux sandbox, so nothing in `node_modules` was touched. **Aishu runs the real `npm run dev` / `npm run build`
locally.** 11 files checked, all PASS.

**Shuffle / dependency sanity:** every `algoShuffle` / `flowShuffle` and every Forge/Temper-fallback order is a
rotation derangement (a valid permutation with no element left in place), so each puzzle is scrambled and solvable.

**Lab-certificate gate:** unit-tested `labCertificateStatus()` against 5 scenarios (full-track via tempers;
all-bare-claims + tempers; partial; empty; mixed tracks) — all correct. The gate reads ONLY existing Progress
data (bare unit ids + `UnitLABX_5@{L}_temper` pseudo-ids), so **no Code.gs change is required** — confirmed.

---

## Judgment calls (made autonomously)

1. **Exp 9 & 10 run stage = SELF-CHECK, not in-browser execution.** These programs need pandas / matplotlib /
   seaborn. Loading pandas in Pyodide is possible, but the stages print `df` / draw charts, and matching their
   output *character-for-character* against a hand-typed `expect` is fragile across pandas/matplotlib versions
   (and seaborn isn't in Pyodide's default package set). Per the brief's explicit guidance, rather than ship a
   run stage that can break, UnitLAB9/10 use a **self-check** path: the learner fills the exact manual blanks,
   sees the manual's expected output (generated here from a real pandas/matplotlib run so it is accurate), runs
   it in Colab, and confirms. The **Algorithm and Flowchart stages stay fully auto-graded**, so each experiment
   still records real work. Implemented as a tiny `prog.selfCheck` branch added to the shared `ProgramStage`
   (harmless/unused for LAB6/7/8, exactly as LAB3/4/5 share one `ProgramStage` with unused `setup`/`transform`).

2. **UnitLAB10_5 (Exp 9 & 10 crucible) Temper is analysed in PLAIN Python.** To keep the Temper stage genuinely
   auto-graded in-browser (its whole point), the data-analysis task is "count the readings past a threshold and
   print their mean, rounded" — the analytical core of pandas filtering/aggregation, written in plain Python so
   Pyodide runs it reliably with a hidden test. (Spark still shows real DataFrame/mask ideas; Flame's bug is
   calling `.mean()` on a plain list — a real pandas-vs-list trap.)

3. **Given setup blocks shown as real code.** For Exp 6 (recreating `patients.txt`, writing `patients.csv`), the
   manual's "(given)" setup is shown as real, runnable lines exactly as printed, so each program is
   self-contained on Pyodide's fresh in-memory filesystem — matching the manual byte-for-byte.

4. **Certificate wording** taken from the syllabus PDF: **MED23CL202 · Python Programming Laboratory · 1 Credit ·
   B.Tech (Medical Engineering) · Semester III**. The certificate shows congratulations, Registration number
   (rollNo), Name, Mini-Project Track, and this course line — and **no date or time of any kind**, as required.
   The chosen track is inferred from the student's `@{L}_temper` pseudo-ids (the track they tempered most); a
   crucible counts done for that track if its bare unitId OR that track's `@{L}_temper` is present (the same
   belt-and-braces rule the generic cert uses).

5. **Lab certificate is a separate component**, blue-accented and surfaced by its own Dashboard banner, so the
   generic course certificate's look, gate and behaviour are completely unchanged.

---

## What remains for you

1. **Review, commit & push** (no git was run here):
   ```
   git add src/lessons/UnitLAB4_5.jsx src/lessons/UnitLAB6.jsx src/lessons/UnitLAB7.jsx \
           src/lessons/UnitLAB8.jsx src/lessons/UnitLAB9.jsx src/lessons/UnitLAB10.jsx \
           src/lessons/UnitLAB6_5.jsx src/lessons/UnitLAB8_5.jsx src/lessons/UnitLAB10_5.jsx \
           src/shell/labCompletion.js src/shell/LabCertificate.jsx \
           src/shell/App.jsx src/shell/Dashboard.jsx config/course.config.js BUILD_REPORT_LAB_FULL.md
   git commit -m "Add Lab Exp 6-10, OOP + 3 more crucibles, and the MED23CL202 Lab certificate"
   git push origin main
   ```
2. **`npm run dev` locally** to click through the new units (especially a full track across all five crucibles to
   watch the Lab-certificate banner unlock). **No Code.gs redeploy is needed.**
3. If you'd like Exp 9/10 to run pandas live in-browser instead of self-check, that's a focused follow-up
   (pin a pandas build, relax exact-output matching to computed values) — flagged, not done.
