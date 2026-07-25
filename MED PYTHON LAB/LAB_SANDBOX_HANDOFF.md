# Python Lab e-Record — Hand-off (build Experiment 2 from here)

**Last updated:** 2026-07-25. Experiment 1 vertical slice is **built, integrated, and verified**.
Paste this whole file (or point Claude at it) at the start of a new conversation to continue with
Experiment 2 without losing context. Read the main course hand-off too:
`C:\aishu\courses\course_python\HANDOFF.md` (the repo's overall source of truth).

---

## What this sub-project is

A **sandbox / e-observation record** bolted onto the existing Foothold Python course (`course_python`),
for the **MED23CL202 Python Programming Laboratory** (B.Tech CSE — Medical Engineering, AI & Data
Analytics, Sem III). Students do each lab experiment inside the web app; the teacher (Aishu) keeps the
observation record automatically instead of collecting handwritten notebooks.

**Per experiment there are TWO programs. Per program, THREE gated stages:**
1. **Algorithm** — the manual's numbered steps, jumbled; student reorders them (Parsons-style).
2. **Flowchart** — flowchart boxes (proper shapes), jumbled; student assembles them top→bottom.
3. **Program** — the manual's fill-in-the-blank code; student fills the `____` blanks and **runs real
   Python in-browser (Pyodide)** against 2 tests (one hidden, to defeat hard-coding); output is matched
   to the manual's "Expected output".

Finishing all 6 steps submits the experiment to the student's record.

**Source material:** `C:\aishu\courses\course_python\MED PYTHON LAB\`
- `Python_Lab_Manual_MED23CL202_1Credit.ipynb - Colab.pdf` (37 pages) — the lab manual with, per
  experiment: Aim, concept guidance, **Program 1 & 2** each with an **Aim, numbered Algorithm,
  fill-in-the-blank code, and Expected output**, viva questions (Bloom-tagged K1–K4), Result, and a
  mini-project "grow" step.
- `4. Python Programming Syllabus MED23CL202.pdf` — 5 CO areas.
- 10 experiments total (index below).

**The 10 experiments (from the manual's INDEX):**
1. Data Types, Operators & Conditional Statements (CO1) ← **DONE**
2. Loops, Collections & Functions (CO1) ← **BUILD THIS NEXT**
3. Classes, Objects & Encapsulation (CO2)
4. Inheritance & Polymorphism (CO2)
5. Reading & Writing Text Files (CO3)
6. File Operations & CSV Records (CO3)
7. Exception Handling: try / except (CO4)
8. raise, finally & User-defined Exceptions (CO4)
9. Data Analysis with Pandas (CO5)
10. Visualization: Matplotlib & Seaborn (CO5)

---

## What was decided (with Aishu)

- **Execution model = Pyodide, in-browser** — exactly how the course's Crucible "Temper" stage already
  runs Python. No server, no sandbox-escape risk.
- **Purpose = both completion-tracking AND grading.** The run-stage grades correctness (hidden test);
  algorithm/flowchart stages verify the student actually did the work.
- **Form = integrated into `course_python`** (not a standalone demo), following Foothold conventions.
- **Slice ordering = one experiment end-to-end first** (Exp 1), then scale to the rest.
- The lab is a **separate supplementary track**, linked from the dashboard — NOT counted in the Python
  course %. Achieved by marking each lab unit `optional: true` (same trick as the Crucible bonus units).

---

## What already exists (Experiment 1) — the template to copy

- **`src/lessons/UnitLAB1.jsx`** — the whole Experiment 1 lesson, fully self-contained (own palette, own
  widgets, zero imports from other lessons — the Foothold rule). **This is the file to copy for Exp 2.**
- **`config/course.config.js`** — a new module was appended at the very end (last module before the
  closing `],\n};`):

  ```js
  {
    moduleId:    "LAB",
    moduleTitle: "Python Lab — e-Record (MED23CL202)",
    icon:        "",
    blurb: "Your lab observation notebook, online. ...",
    units: [
      { unitId: "UnitLAB1", title: "Experiment 1 — Data Types, Operators & Conditionals", optional: true,
        blurb: "..." },
      // ADD:  { unitId: "UnitLAB2", title: "Experiment 2 — Loops, Collections & Functions", optional: true, blurb: "..." },
    ],
  },
  ```

Nothing else was changed. **No shell files and no `Code.gs` were touched** — so no Apps Script redeploy
is needed. The lab plugs into the existing machinery (see below).

---

## How it plugs in (architecture you must respect)

Same rules as every Foothold lesson:
- `App.jsx` auto-discovers `src/lessons/*.jsx` via `import.meta.glob`. Adding a lesson = drop the file in
  + add one `{ unitId, title, optional: true }` line to `course.config.js`. `unitId` MUST equal the
  filename without `.jsx` (`UnitLAB2` ↔ `UnitLAB2.jsx`).
- Every lesson receives 4 props: `student`, `onUnitComplete`, `challengeProgress`, `onStageComplete`.
- **Per-stage persistence (record keeping) reuses the Crucible plumbing, zero backend change:**
  each stage is saved as a **pseudo-unitId** through `onStageComplete("UnitLAB2@p1_algo")`. For a
  signed-in student this writes to the Progress sheet AND fires a `challenge_stage_complete` analytics
  event to the **Events tab** (columns: Timestamp, AnonId, UserId, EventType, CourseId, UnitId) with
  `UserId = roll number`. **That Events tab IS the teacher's e-observation notebook** — filter rows where
  UnitId starts with `UnitLAB` to see each roll number's algorithm/flowchart/program completions.
- The finale calls `onUnitComplete()` once → marks the whole experiment done. (Like the Crucible badge,
  it must be shown FIRST behind a button, because `onUnitComplete` unloads the lesson back to the
  Dashboard.)

**Pseudo-id scheme for Experiment N:** `UnitLAB{N}@p1_algo`, `@p1_flow`, `@p1_prog`, `@p2_algo`,
`@p2_flow`, `@p2_prog`. Keep this exact pattern so a future teacher-dashboard can parse it uniformly.

---

## Anatomy of `UnitLAB1.jsx` (so you can clone it fast for Exp 2)

Top-to-bottom:
- `C` palette (copied verbatim from every Foothold lesson — do not invent colours).
- `UNIT_ID = "UnitLAB1"` and `mono` text style.
- **`PROGRAMS` array** — the ONLY part that changes per experiment. Two objects (p1, p2), each with:
  - `title`, `aim`.
  - `algo: [steps in CORRECT order]` + `algoShuffle: [index scramble]` + `algoHint`.
  - `flow: [{type, text}...]` in correct order + `flowShuffle` + `flowHint` (+ optional `flowNote`).
    `type` ∈ `terminator | io | output | process | decision`.
  - `codeLines`: array of lines; each line is an array of segments — `{text}`, `{blank:i}` (renders an
    input box), `{cmt}` (an italic `# comment`, NOT part of runnable source).
  - `blankWidth: [px,...]` (one per blank).
  - `tests: [{inputs:[...], expect:"...", label, hidden?}]` — `expect` is the trimmed stdout.
  - `progHints: [escalating hints]`.
- `STAGES` — 6 entries mapping to program+kind (algo/flow/prog); gated sequentially.
- Reusable widgets: `Hints`, `ProgHeader`, `AlgorithmStage`, `FlowNode` + `TONE` map, `FlowchartStage`,
  `ProgramStage`, `RecordScreen`, and the default-export `UnitLAB1` shell (gated tab strip + progress
  bar + record screen). **All of these are experiment-agnostic** — for Exp 2 you mostly just rewrite the
  `PROGRAMS` data and rename `UNIT_ID`/the component/header text.

**The Pyodide run harness** (in `ProgramStage`): lazy-loads pyodide v0.26.4 from jsDelivr (cached on
`window.__lab_pyodide`), overrides `input()` with a feeder that echoes `prompt+value+"\n"` to stdout so
the console matches the manual's Expected-output block exactly, runs the assembled source per test, and
compares `sys.stdout.getvalue().trim()` to `expect.trim()`. Graceful fallback to a self-check button if
Pyodide can't load. **Reuse as-is.**

---

## How to build Experiment 2 (recipe)

Exp 2 = **Loops, Collections & Functions (CO1)**. From the manual (pages ~7–10):
- **Program 1 — Average Heart Rate (for loop).** Reads n readings, accumulates total, prints average.
  Blanks in the manual: `range` (in `for i in ____(n):`) and `+` (in `total = total ____ hr`).
  Expected output for n=3, readings 72/80/76 → `Average heart rate = 76.0`.
- **Program 2 — Reusable BMI-Category Function.** `def bmi_category(weight, height)` returns the WHO
  band; called for two patients. Blanks: `"Normal"` (the returned label for the normal branch) and
  `bmi_category` (the second call). Expected: `Patient A: Normal` / `Patient B: Overweight/Obese`.

Steps:
1. **Read the manual pages for Exp 2** to get exact Aim, Algorithm steps, code, blanks, and Expected
   output (open the PDF with pdfplumber; Exp 2 starts around page 7). Don't trust memory — copy exact
   strings.
2. **Verify outputs in real Python first** (as was done for Exp 1): reproduce each program, feed the
   test inputs through an `input()` shim that echoes `prompt+value+"\n"`, and capture the exact stdout
   string to paste into `tests[].expect`. Add a **hidden second test** with different values that
   defeats hard-coding (e.g. different heart-rate readings; a different pair of patients).
   - ⚠️ For Program 2 (a `def` that's *called*, not driven by `input()`), there's nothing to type — the
     test just runs the code and checks the two printed lines. A good hidden test swaps the two patients'
     numbers so a hard-coded print fails.
3. **Copy `UnitLAB1.jsx` → `UnitLAB2.jsx`.** Change `UNIT_ID` to `"UnitLAB2"`, rename the default export
   to `UnitLAB2`, update the header text (`EXPERIMENT 2 · CO1`, the title, the Aim banner), and replace
   the `PROGRAMS` array with Exp 2's two programs. Everything else stays.
4. **Flowcharts:** design the correct shape sequence for each program. Prog 1 has a **loop** — represent
   it with a decision diamond `i < n ?` and a back-arrow note, OR keep the simplified linear view and add
   a `flowNote` (as Exp 1's Program 2 did for its decision). Keep it honest about the simplification.
5. **Register** in `config/course.config.js`: add the `UnitLAB2` line inside the `LAB` module's `units`.
6. **Syntax-check** (the repo's node_modules is Windows-only, so the repo's esbuild won't run in a Linux
   sandbox). Working method used for Exp 1: `npm i esbuild-wasm@0.21.5` in a temp dir and
   `transform(code, {loader:'jsx', jsx:'automatic'})`. (Aishu runs the real `npm run build` locally.)
7. **Present** `UnitLAB2.jsx` + the config to Aishu. Remind her: `npm run dev` locally to view; no
   `Code.gs` redeploy needed.

---

## Conventions & gotchas (don't relearn these the hard way)

- **Light comments only** in lesson files (section-divider `// ── … ──` + a note where non-obvious).
  This is the standing rule from Module 5 onward and overrides the global "comment every line"
  instruction *for lesson files*.
- **Self-contained lessons:** no imports between lesson files, ever. Copy shared widgets into each file.
- **Never touch shell files** (`App.jsx`, `Dashboard.jsx`, etc.) for lab work — the lab rides on the
  existing props. The two follow-ups below are the only reasons you'd touch the shell, and only with
  Aishu's OK.
- **Sandbox staleness gotcha:** after a file is host-edited, a Linux-sandbox re-read can be stale/
  truncated. Verify edited files with the host `Read` tool, not a sandbox `cat`. Newly *created* files
  read fine on first sandbox access.
- **Windows node_modules:** cannot run the repo's `vite`/`esbuild` from a Linux sandbox. Use a freshly
  installed standalone `esbuild-wasm` for syntax checks; Aishu does the real build/deploy locally
  (`npm run dev` / `npm run build` / `npm run deploy`).
- **Match the manual byte-for-byte:** the whole point of the run stage is that the student's output
  equals the manual's Expected output. Always capture `expect` from a real Python run, including the
  echoed prompts.

---

## Open follow-ups (flagged, NOT built — confirm with Aishu before doing)

1. **Mandatory login for the lab.** Today guests can complete a lab unit but their progress only saves to
   localStorage — a real record needs a forced roll-number sign-in on lab units. This touches the shell
   (gate lab units behind `student != null`).
2. **Teacher's-eye dashboard.** A roll-number × experiment grid reading the Events/Progress rows
   (`UnitLAB*` pseudo-ids) — the actual e-observation-notebook view for the teacher. Could be built on the
   already-agreed Looker Studio layer over the Events tab, or as an in-app admin view.
3. **Full Yes/No branching flowcharts.** Exp 1's flowchart widget assembles a linear sequence with a
   decision diamond but doesn't draw the true two-way branches. A richer branching flowchart widget is
   the biggest *net-new* (and most publishable) piece — Parsons-style flowchart assembly with branches is
   thin in the literature.

## Research framing (for if Aishu writes this up)

The three-stage scaffold is grounded: the algorithm/flowchart reorder is a **Parsons Problem** (Parsons &
Haden, 2006; strong evidence of comparable learning at lower cognitive load — Ericson et al., 2017+).
Flowchart-based intro environments exist (RAPTOR, Flowgorithm) but auto-assessed *student-constructed*
flowcharts are under-explored. Closest existing product to the whole idea: **Runestone Academy** (open
source: Parsons + runnable Python + progress tracking). The distinctive, defensible contribution here is
the integrated algorithm→flowchart→execution **e-observation record replacing the handwritten lab
notebook**, embedded in the professor's own course — no commercial product targets that Indian
engineering-lab workflow.
