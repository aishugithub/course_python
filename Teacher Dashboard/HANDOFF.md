# Teacher Dashboard — Handoff

A read-only web dashboard (Google Apps Script) that reports student progress and
lab marks for Prof. Aishu's Foothold courses. Built to sit *beside* the live
courses — it reads their sheets and never modifies course data.

---

## 1. What it does

Two shareable pages, served from one Apps Script project:

| URL | Page | Shows |
|-----|------|-------|
| `…/exec?view=general` | **General** | Course completion % for **every** registered student, across **two** courses (Python + COA), sorted by progress (nearing-completion first). Search + CSV export. |
| `…/exec?view=med` | **MED ENGG LAB** | Only the **59 MED23CL202 students** (fixed roster), reg-no order. Two sub-tabs: **Lab Progress** (per-experiment 6-stage split, completion date/time, marks, per-experiment completion bars, due-date-aware defaulters) and **Marks** (auto-computed /10 with your overrides, dated & colour-coded). Search + CSV export. |

The shared pages are **100% read-only**. Separately, an **owner-only nightly job**
computes marks and writes them into a separate marks workbook (never a course
backend).

---

## 2. Files (in this folder)

| File | Role |
|------|------|
| `Dashboard.gs` | All server logic. The only file you normally edit. |
| `General.html` | The general (course progress) page. Add to Apps Script as an HTML file named **`General`**. |
| `Med.html` | The MED lab page. Add as an HTML file named **`Med`**. |
| `Marks_template.csv` | Import into the `Marks` tab of the marks workbook (wide: RollNo, Name, Exp1…Exp10, MiniProject). |
| `DueDates_template.csv` | Import into the `DueDates` tab (Experiment, DueDate, Title). |
| `SETUP_CHECKLIST.md` | Step-by-step deployment guide. |
| `Index.html` | **Obsolete** — ignore/do not add to the project. |

---

## 3. The three spreadsheets it reads

| Purpose | Sheet ID | Tabs used |
|---------|----------|-----------|
| Python course backend | `1XDUgokksXkRRJzA6-3ZwE-TJDEllm7jEUp19KQ6UuaE` | `Students`, `Progress` |
| COA course backend | `1adLuz2mnGdeBQtcZWiicW1E9Djtfjs5mR4QepdwDbfk` | `Students`, `Progress` |
| Marks workbook (separate) | `1ZbQhvnjrjKQ_ZkE0PhzeiWbzIYZmtUmlGZn5tlS7Dg0` | `Marks` (overrides + nightly output), `DueDates`, hidden `_AutoMarks` |

All three IDs are set at the top of `Dashboard.gs` (Section 1).

---

## 4. Data model (how completion is recorded)

Every Foothold course logs to a `Progress` tab: `RollNo | CourseId | UnitId | CompletedAt`.
`UnitId` is disambiguated by an `@`:

- plain `Unit5_2` → a full **course** unit completed (drives the course %).
- `UnitLAB1@p1_algo` → one **stage** of a lab experiment.
- plain `UnitLAB1` → the whole experiment **record was submitted**.

Each lab experiment = **2 programs × 3 stages** (algorithm → flowchart → program),
i.e. stage IDs `p1_algo, p1_flow, p1_prog, p2_algo, p2_flow, p2_prog`, saved as
`UnitLABn@<stageId>`.

### Identity normalisation (important!)
Students log in with an **email**, so the sheet stores `e0525052@sriher.edu.in`,
NOT `E0525052`. `normalizeId()` strips the domain and upper-cases, mapping logins
to reg-nos so the roster matches. Students who used a **personal** email have no
reg-no in it — map them in **`ROLL_ALIASES`** (Section 6 of `Dashboard.gs`).
Currently mapped: `adhiseshan747@gmail.com → E0525045`.

---

## 5. Marks calculation (per experiment, out of 10)

- **Weighted completion:** per program → Algorithm **1.0**, Flowchart **1.5**,
  Program **2.5** (×2 programs = 10). Weights live on `LAB_STAGE_TEMPLATE`.
- **Late penalty:** −10% of the earned mark **per day** past that experiment's due
  date (from the `DueDates` tab), down to **0** (`LATE_PCT_PER_DAY`, `LATE_FLOOR`).
- **Override:** any number you type over a cell in the `Marks` tab wins; leave a
  cell and the calculation stands and keeps refreshing. A hidden `_AutoMarks` tab
  lets the nightly job tell your edits from its own values.

Worked example: Program 1 fully done + Program 2 algorithm & flowchart (5/6),
2 days late → base 7.5 → **6.0**.

---

## 6. Behaviours that are automatic

- **Auto-detect of experiments** (`resolveExperiments`): an experiment becomes
  "built" the instant any `UnitLABn` row appears in the data, defaulting to the
  6-stage shape. **No code change / redeploy needed** for future experiments —
  *unless* an experiment uses a different shape (then give it an explicit
  `stages` array in `LAB_EXPERIMENTS`).
- **Due-date-aware defaulters:** before an experiment's due date, non-completers
  show as "yet to complete (not overdue)" in amber; after the deadline they
  become "⚠ Defaulters (overdue)" in red; with no due date set, nobody is flagged.
- **Nightly marks writing:** `writeMarks()` runs on a time trigger (~1 AM) via
  `createNightlyTrigger()`, computing + writing marks while preserving overrides.

---

## 7. Current state (as of this handoff)

- **Experiments built:** Exp 1 and Exp 2 (both `built: true`; others auto-detect
  on first submission). All 11 experiments (10 + Mini-Project) are titled per the
  MED23CL202 record.
- **Due dates entered so far:** Exp 1 = 2026-07-26, Exp 2 = 2026-08-02.
- **Roster:** 59 students, `E0525001`–`E0525060` (E0525047 not in class).
- Course divisors: Python **62** mandatory units, COA **38**.

---

## 8. Deploying / updating (the one gotcha)

Editing `Dashboard.gs` or the HTML and **saving** only updates the test (`/dev`)
URL. To push changes to the **live `/exec` URL** you must:
**Deploy ▸ Manage deployments ▸ ✏️ Edit ▸ Version: New version ▸ Deploy.**

First deploy: Execute as **Me**, Access **Anyone with the link** (or "Only myself").
See `SETUP_CHECKLIST.md` for the full first-time setup, incl. importing the two
CSVs and running `createNightlyTrigger` once.

---

## 9. How to extend

- **New experiment built in the course** → nothing to do; it appears on first
  completion. Just add its due date (`Experiment` = `3`…`10` or `MP`) in the
  `DueDates` tab for late penalties.
- **A student used a personal email** → add `'their@email': 'E0525xxx'` to
  `ROLL_ALIASES`, redeploy.
- **Add another course to the General view** → add an entry to the `COURSES`
  array (sheet id, courseId, module→unit lists).
- **Change the mark weights or penalty** → edit `LAB_STAGE_TEMPLATE` weights and
  `LATE_PCT_PER_DAY` / `LATE_FLOOR`.

---

## 10. Troubleshooting

- **MED page shows nobody / wrong counts** → run **`diagnoseLab`** in the editor,
  read the Execution log. It reports the CourseId values, the real lab UnitIds,
  sample rows, and how many roster reg-nos matched after normalising emails
  (and names any still-unmatched student to add to `ROLL_ALIASES`).
- **Marks tab empty** → check `MARKS_SPREADSHEET_ID` is set and the tabs are named
  `Marks` / `DueDates`; run `writeMarks` once.
- **Changes not showing on the live URL** → you deployed a save, not a *New
  version* (see §8).

---

## 11. Open item (decision pending)

A student's auto mark currently reflects **completion so far**, even before the
due date (an unstarted student shows 0; 3/6 shows a partial mark). Prof. Aishu was
asked whether marks should instead stay **blank until the due date passes** so an
in-progress student isn't shown a low mark prematurely. **Not yet decided / not
implemented.** If "yes," gate `finalMark`/`autoMark` in `experimentMark()` (and the
displayed cell) on `duePassed` for that experiment.

---

## 12. Related

The course itself (lessons, config, its own `Code.gs`) is a separate project in
`course_python/` — see that folder's `HANDOFF.md`. New lab experiments are built
there with the `foothold-lesson-builder` methodology; this dashboard just reports
on the data they produce.
