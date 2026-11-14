# Foothold Redesign — "Type real Python in every section"

Started 2026-11-06. Companion skill: `.claude/skills/foothold-code-lesson/SKILL.md`.

## Why

The final assessment showed students could not write basic Python. The course trained
**recognition** (predict, click, step through, Parsons) and only asked for **production**
(typing code from a blank editor) in the Crucible's last stage. The redesign keeps the
visualisations but makes every section end with programs the learner types, runs and gets
checked — the PRIMM ladder: see → type → fix → complete → modify → write → make.

## What is built

- `src/kit/` — shared engine: in-browser Python (Pyodide in a Web Worker, 5 s kill switch for
  infinite loops, `input()` fed by tests, matplotlib/pandas auto-load), exercise component
  with tests + hidden tests + AST rules, beginner error coach, escalating hints, solution
  only after repeated failures, paste blocked, exercise passes saved via the existing
  progress plumbing (`UnitX_Y@ex:<id>`) with attempts/errors logged to the Events sheet.
- Light theme everywhere (shell tokens hold cream brand values; a separate session also
  converted every legacy lesson's palette to light on 2026-11-10).
- Full-screen lessons; the desktop 1.25× zoom in App.jsx applies only to legacy lessons.
- Self-test, run in the dev-server console:
  `await (await import("/course_python/src/kit/selfTest.js")).selfTest("Unit4_2")`

## Fundamentals audit (2026-11-10)

Method: a checklist of what a strong first Python course must teach, searched against the
Python code inside every trunk lesson (M4–M13, CT strands), then each "missing" re-checked
by hand. ✅ taught · ⚠️ only used / glimpsed, never taught · ❌ absent.

| Area | Topic | Now | Goes to |
|---|---|---|---|
| Output | `print`, comments, quotes | ✅ 4.1 | — |
| | `sep=`, `end=` | ❌ (end= used once in CT1.4, never taught) | **4.5 new** |
| | f-strings, `:.2f` formatting | ❌ | **4.5 new** |
| | escape `\n` `\t`, multi-line `"""` strings | ❌ | 4.5 |
| Variables | assignment, update, swap with temp, naming rules, NameError | ✅ 4.2 (rebuilt) | — |
| | `+=` `-=` `*=` | ⚠️ used from 7.6 on, never taught | 4.4 |
| | multiple assignment / unpacking `a, b = 1, 2` | ⚠️ used in 9.3, 9.4, 10.7 without being taught | Tuples unit |
| | `None` | ⚠️ appears 5.1, 8.2 | 8.2 (return-less functions) |
| Types | int, float, str, bool, `type()` | ✅ 4.2 | — |
| | `int()` `float()` `str()` conversion, ValueError | ✅ 4.3 | — |
| Operators | `+ - * / // % **` | ✅ 4.4 | — |
| | precedence (BODMAS), `abs()`, `round()`, `import math` (sqrt, pi, ceil, floor) | ❌ / ⚠️ (math only in 11.1) | 4.4 |
| Decisions | if / elif / else, nesting, and / or / not, truthy | ✅ M5 | — |
| | chained comparison `0 <= m <= 100`, conditional expression | ❌ | 5.3 |
| Loops | while, for + range, break, continue, nested | ✅ M6 | — |
| | `for … else`, `enumerate()`, `zip()` | ❌ | enumerate/zip → 7.3; for-else → 6.3 bonus |
| Strings | indexing, slicing, `len`, immutability | ✅ 7.1 | — |
| | methods: `upper lower title strip split join replace find count startswith isdigit` | ❌ (strip/split only used in M9 files) | **7.1** |
| | `in` for substrings, reversing `[::-1]` | ❌ | 7.1 |
| Lists | create, index, mutate, append, remove, pop, sort, for-each | ✅ 7.2–7.3 | — |
| | `insert extend index count reverse`, list slicing | ❌ | 7.2 |
| | `sorted()` vs `.sort()`, `sum min max` on lists | ❌ | 7.3 |
| | **aliasing vs copy** (`b = a` shares one list) | ❌ — essential, follows from 4.2's name-tag model | **7.2** |
| | 2-D lists | ⚠️ CT2.4 only | 7.2 + CT2.4 |
| | list comprehensions | ❌ | 7.3 bonus |
| **Tuples** | immutability | ✅ one tab in 7.4 | — |
| | creating, single item `(5,)`, packing/unpacking, swap `a, b = b, a`, returning several values, tuple vs list, `count`/`index` | ❌ (unpacking a "bonus peek" in 8.4) | **own unit** |
| Dicts | create, lookup, add/overwrite, KeyError, `in`, loop keys | ✅ 7.4 | — |
| | `.get()`, `.items() .keys() .values()`, `del` / `.pop()`, counting with a dict, list of dicts | ❌ | **Dictionaries unit** |
| Sets | create, add, union, intersection | ✅ 7.5 | — |
| Functions | def, parameters, return, scope, call stack, recursion | ✅ M8, CT3 | — |
| | default parameters, keyword arguments, docstrings | ❌ | 8.2 |
| | `lambda` | ❌ | optional, M11 |
| Modules | `import random` | ⚠️ peek in 6.4 | 4.4 / 11.1 |
| | `from x import y` | ❌ | 4.4 (from math import sqrt) |
| Errors | try / except / finally / raise / custom exceptions | ✅ M9, 10.6 | — |
| Files | open, with, read, write, append | ✅ 9.3; csv ⚠️ 9.4 | — |
| OOP | class, `__init__`, self, methods, inheritance, `super()`, `__str__`, polymorphism | ✅ M10 | — |

**Bottom line:** the four pillars are present, but a beginner leaves without the everyday
tools: f-strings, string methods, dict methods, tuple unpacking, `sorted`/`enumerate`,
default arguments, and list aliasing. Most are added *inside* existing units during their
rebuild; two new units are needed (4.5 Formatted Output; Tuples split from Dictionaries).

## Content audit — correctness

| Unit | Finding | Fixed in rebuild |
|---|---|---|
| 4.1 | No factual errors. Assumes the learner knows C (see decision 1). | n/a |
| 4.2 | **Wrong memory model.** Said `score = score + 1` writes the new value into the *same* slot (true for C, false for Python); quiz Q2 marked that as correct; the unit contradicted itself later ("re-pointed to a new slot"). | ✅ Name-tag model: `=` computes a new value and moves the name; `best = score` shares a value; reassigning one name never changes another. |
| 4.2 | "int is exactly 4 bytes"; "C compiler refuses" text in an int — platform/compiler-dependent. | ✅ "usually 4 bytes" |
| 7.2, 8.3 (legacy) | Likely use the old box model for lists and stack frames — check and align with the name-tag model when rebuilt. | pending |

## Fundamentals placement plan (proposed 2026-11-10 — confirm before building)

Rule used: a topic goes in the **first unit where every prerequisite already exists**, and
each unit gets at most 2–3 additions (otherwise it splits). Every addition gets its own
typed exercises, like everything else in the redesign.

| Unit | Already teaches | **Add** | Why here |
|---|---|---|---|
| 4.1 print ✅ | print, comments, text vs calculation | — | done |
| 4.2 Variables ✅ | name-tag model, update, swap, naming, types | — | done |
| 4.3 Input & Conversion ✅ | input, int(), float() | `str()`; ValueError; two inputs; the silent string-join bug | done |
| 4.4 Operators ✅ | + − * / // % ** | `+= -= *=`; precedence (BODMAS, brackets); `abs()`, `round(x, 2)`; **first import**: `import math` → `math.sqrt`, `math.pi`, `math.ceil/floor`; `from math import sqrt` | all are "doing maths"; import introduced on a friendly case |
| **4.5 Formatted Output (new)** ✅ | — | f-strings `f"Total: {t}"`; `{x:.2f}`; `print(sep=, end=)`; escape `\n` `\t`; multi-line `"""` strings | needs variables + numbers; every later unit prints with f-strings |
| 5.1 Booleans | True/False, comparisons, truthy | — | — |
| 5.3 Boolean logic ✅ | and / or / not, nesting | chained comparison `0 <= m <= 100`; conditional expression `"Pass" if m >= 40 else "Fail"` (short, optional exercise) | both are about writing conditions |
| 6.1–6.3 Loops | while, for/range, break, continue, nested | `+=` reused in every counter; `for … else` as a bonus box in 6.3 | reinforcement, not new load |
| 7.1 Strings ✅ | index, slice, len, immutability | `upper lower title strip replace find count startswith endswith isdigit isalpha`; `in` for substrings; reverse with `[::-1]`; method-call syntax `s.upper()` explained once | strings come before lists, so no split/join yet |
| 7.2 Lists ✅ | create, index, mutate, append, remove, pop | `insert extend index count`; list slicing; `in`; **aliasing vs copy** (`b = a` vs `a.copy()`) shown with 4.2's name tags; 2-D list intro | aliasing follows directly from the 4.2 model |
| 7.3 List patterns ✅ | count, best-so-far, sort | `sorted()` vs `.sort()`, `reverse()`, `sum min max`; **`split()` / `join()`** (text ↔ list); list comprehension as a bonus | split/join need lists to exist |
| **7.4 Tuples (own unit, keeps id `Unit7_4`)** ✅ | immutability only | create, `(5,)`, packing / unpacking, swap `a, b = b, a` (callback to the 4.2 cups exercise), tuple vs list, `count`/`index`, tuples as records; **`enumerate()` and `zip()`** — they produce tuples, so they're taught where unpacking is | unpacking is the prerequisite for enumerate, zip and dict.items() |
| **7.5 Dictionaries (new id `Unit7_4D`)** ✅ | create, lookup, KeyError, `in`, loop keys | `.get(key, default)`; `.items()` with unpacking, `.keys()`, `.values()`; `del` / `.pop()`; **counting with a dict** (word / grade counts); list of dicts as a table | needs tuples for `.items()` |
| 7.6 Sets, 7.7 Capstone ✅ | — | capstone uses f-strings, `.get()`, `sorted()` | applies the new tools |
| 8.2 Parameters & Return ✅ | def, params, return, print-vs-return | default parameters; keyword arguments; docstrings; `None` from a function with no return | all about calling conventions |
| 8.4 Capstone ✅ | returns a tuple by index | return several values and **unpack** them `low, high = stats(m)` (no longer a "bonus peek") | Tuples now come first |
| 11.x Pythonic Python | modules | `lambda` with `sorted(key=…)`; comprehensions in depth; `if __name__ == "__main__"` | advanced, optional for beginners |

Resulting module shape:
- **M4**: 4.0 Setup · 4.1 ✅ · 4.2 ✅ · 4.3 · 4.4 · **4.5 Formatted Output** · Crucible
- **M5**, **M6**, **CT I**: same units, small additions above
- **M7**: 7.1 Strings · 7.2 Lists · 7.3 List Patterns · **7.4 Tuples** · **7.5 Dictionaries** · 7.6 Sets · 7.7 Capstone · Crucible
- **M8** (+ defaults, keyword args, docstrings) · M9 · M10 · CT II · CT III · M11–M13

Progress safety: no existing `unitId` is renamed. `Unit7_4` keeps its id and becomes Tuples;
Dictionaries gets the new id `Unit7_4D`; Formatted Output is the new `Unit4_5`. Only titles
and order change in the course settings file.

Build order: 4.3 → 4.4 → 4.5 → M5 → M6 → 7.1 → 7.2 → 7.3 → 7.4 Tuples → 7.5 Dictionaries → …
(one unit at a time, each shown to the professor).

## Course restructure plan (proposed 2026-11-10)

**Done 2026-11-12:** steps 1, 2, 4 and 5 below. LAB module `hidden: true`;
`labCertificate.show: false` (App.jsx hides the e-Lab card and skips the e-Lab redirect);
`miniProjectReport.open: false`; Finish Line moved to the end; Finish Line wording now
refers only to the course certificate. **Done 2026-11-13:** step 3 — the four tracks are
built (`UnitMP_GEN`, `UnitMP_SHOP`, `UnitMP_SEAT`, `UnitMP_LEAGUE`) and the MP module
("Mini-Projects — Pick a Track") is visible again, just before the Finish Line.

The MED23CL202 batch has finished its lab. From now on there is **no lab completion** —
only **course completion**, open to anyone in the world.

1. **Hide, don't delete, everything medical-engineering-specific.** In `config/course.config.js`:
   the `LAB` module (10 experiments + 5 medical mini-project crucibles) gets `hidden: true`.
   Files, students' saved progress and lab certificates already issued are untouched;
   deleting one line brings it all back.
2. **Hide the two medical dashboard cards.** The e-Lab Certificate card is currently always
   shown (Dashboard.jsx), so it needs a small switch: a new `labCertificate.show: false`
   setting. The Mini-Project Report card (MED23CL202 cover page, faculty names) is turned
   off with the existing `miniProjectReport.open: false`.
3. **Four generic mini-project tracks** for every branch, in the "Applied Mini-Projects"
   module (currently hidden, holds `UnitMP_GEN` — Personal Expense Tracker). Built in the
   typing-first format. **Approved 2026-11-12** — see "Mini-project tracks" below.
4. **Finish Line last.** Order on the dashboard: trunk modules → CT strands → … → M13 →
   Mini-Projects → **Finish Line (feedback + course certificate)**.
5. **Certificate rule — decided 2026-11-12: keep the current rule.** All 10 Crucibles +
   the Finish Line feedback earn the course certificate (`src/shell/completion.js`,
   unchanged). Mini-project tracks are not required for the certificate.

## Mini-project tracks (approved 2026-11-12)

Four tracks anyone can relate to. Each re-themes one program pattern of the old medical
tracks, so the same teaching spine (and much of the code skeleton) carries over.

| Track | What the finished program does | Pattern (old medical track) | Twists students can choose |
|---|---|---|---|
| **A · Personal Expense Tracker** (exists: `UnitMP_GEN`) | log spending by category, warn when the monthly budget is crossed | record entries, flag over a limit (Patient Vitals Monitor) | mess-bill splitter, shared trip budget, phone-data log |
| **B · Shop Inventory Manager** | canteen / stationery shop: sell, restock, print a bill, low-stock warnings | stock that goes up and down, with alerts (Pharmacy Stock Manager) | library lending desk, lab equipment store, sports-room kit register |
| **C · Event Seat Booking** | book / cancel seats for a fest, cinema or bus; no double booking; seat map; waitlist | reservations with a clash check (Clinic Appointment Book) — seat map practises 2-D lists | lab-slot booking, court timetable, hostel room allotment |
| **D · Sports League Tracker** | match results → points table, top scorer, teams sorted by points, form chart | classify, summarise, rank (Health-Camp Screening Analyzer) | weather-station log, fitness/step tracker, game leaderboard |
| Your own idea | anything of similar size | — | — |

A class-marks analyser was deliberately avoided: the Marks Manager is already built in four
capstones (7.6, 8.4, 9.4, 10.7).

**Five checkpoints, shared by all tracks** (tied to course modules, not lab experiments).
Each checkpoint is a new version of the learner's own program, typed and test-checked:

| Checkpoint | After | The program gains | Example (C · Seat Booking) |
|---|---|---|---|
| 1 · Core logic | M4–M6 | input, decisions, loops, a menu | book one seat, refuse if taken |
| 2 · Organise it | M7–M8 | lists, tuples, dicts, functions | seat map as a 2-D list; `book()`, `cancel()` |
| 3 · Make it survive | M9 | files, try/except, own exceptions | bookings saved to a file; bad seat numbers handled |
| 4 · Model it | M10 | classes | `Event` and `Booking` classes |
| 5 · Analyse & chart | M12–M13 | pandas, matplotlib | occupancy per show as a bar chart |

The final program in every track must use the fundamentals added in this redesign
(f-strings, string methods, `.get()`, tuple unpacking, `sorted()`), so the mini-project is
where a learner proves all of it in one piece of work.

What the search for the earlier track discussion found: the plan for "generic 4-branch
mini-project tracks (`UnitMP_*` beyond the existing `UnitMP_GEN`)" is recorded in
`BUILD_REPORT_LAB_FULL.md` (2026-10-03) as deliberately deferred, and the config comment
describes it as one capstone spine re-skinned per engineering branch. The four track names
themselves are not in any Cowork or Claude Code transcript stored on this computer.

## Effort estimate

About 52 units in the trunk (M4–M10 + CT strands + the 2 new units) × 8–14 exercises.
Roughly one unit per working session, including the correctness audit, the self-test and
review. Priority: M4 → M5 → M6 → M7.

## Decisions needed from the professor

1. **C contrast.** Keep the "compared with C" sections, or make them an optional aside?
2. **Splitting 7.4.** Keep `Unit7_4` as *Tuples* and add `Unit7_4D` for *Dictionaries*, so no
   saved progress is lost.
3. ~~Legacy dark lessons~~ — done by the 2026-11-10 light-theme session.
4. **Paste blocking.** On by default for every exercise. Keep it?

## Status

| Unit | Rebuilt | Programs | Self-test | Correctness notes |
|---|---|---|---|---|
| 4.1 Your First Program | ✅ 2026-11-06 | 12 | 12/12 | No errors. Assumes C (decision 1). |
| 4.2 Variables & Memory | ✅ 2026-11-10 | 12 | 12/12 | Memory model corrected; naming rules, swap, NameError, types added. |
| CT II · 1–5 (`UnitCT2_1`…`UnitCT2_5`) | ✅ 2026-11-15 | 5 + 4 + 5 + 4 + 6 | 24/24 | No factual errors. No functions (CT II precedes M8). Scanning (min + position, second highest, bands, streaks, rainfall report); linear search with −1 sentinel, all positions, binary search with a step counter, directory lookup; bubble (early exit, swap count), selection, insertion — each printed pass by pass and checked against an independent simulation — plus an off-by-one fix and record ranking; matrices (row/col sums, transpose, diagonals, magic square); strings (two-pointer palindrome, word order, frequencies, anagrams, ord/chr, Caesar cipher). |
| CT III · 1–3 (`UnitCT3_1`…`UnitCT3_3`) | ✅ 2026-11-15 | 5 + 6 + 4 | 15/15 | No factual errors. Recursion: countdown, factorial with a stack stepper, missing-base-case fix, list sum, power + fast power; Fibonacci, call counting, **memoisation fixes a timeout**, recursive digit sum / reverse / binary search, Euclid GCD; playable Hanoi, printed moves, 2ⁿ−1, staircase ways, all binary strings (backtracking). |
| 10.1–10.7 OOP (`Unit10_1`…`Unit10_7`) | ✅ 2026-11-15 | 5 + 6 + 6 + 5 + 5 + 5 + 4 | 36/36 | No factual errors; all watch-only before. Added: parallel-list drift, objects as name tags, attribute-typo silent bug, `__init__` step-through, both forget-`self` bugs (coached), defaults/derived attributes, methods, `__str__`, method-without-`()`, encapsulation with validated setters, BankAccount, Cart (Track B seed), inheritance with `super()`, missing-`super()` bug (coached), overriding/extending, toll plaza, polymorphism without if/elif, abstract parents with NotImplementedError (coached), payroll, custom exceptions and exception families, library lending; capstone: Student + Classroom with save/load. Hidden checks call the learner's classes directly. |
| 11.1 Modules & the Ecosystem (`Unit11_1`) | ✅ 2026-11-13 | 11 | 11/11 | Legacy was watch-only (import forms, pip/venv steps). Now typed: `import` / `from … import` / `import … as`, standard library (dice with random — counts checked statistically, `statistics` mean/median/mode incl. even-count median, `Counter.most_common`, `datetime` gaps + weekday incl. leap year), **own module** written into the browser FS by each test's setup (hidden test changes the module's TAX), `__name__` guard, `importlib` + `ModuleNotFoundError` with a pip hint, class report. Engine: `random` is reloaded before each run (a 6.4 setup patch used to leak), `sys.dont_write_bytecode`. |
| 11.2 Pythonic Python (`Unit11_2`, new) | ✅ 2026-11-13 | 11 | 11/11 | Fills the audit gaps: comprehensions in depth (filter / transform / if-else inside, loop → comprehension rewrite), dict and set comprehensions, `.items()` transforms, `sorted(key=…)` and `lambda` (stable ties), `any` / `all`, star unpacking and swaps, judges' score, word-frequency report. |
| 12.1 Meet Pandas (`Unit12_1`) | ✅ 2026-11-13 | 8 | 8/8 | Series, DataFrame from a dict, `read_csv` (setup writes the CSV; hidden tests use another file), shape/head, column stats, column lists + boolean masks with `&`, department filter with `.empty`, new columns with arithmetic and `.apply(lambda)`, `sort_values`, top performers with `to_string(index=False)`. Expected tables are real pandas output captured from the solutions and checked by hand. |
| 12.2 Analysing Real Data (`Unit12_2`, new) | ✅ 2026-11-13 | 7 | 7/7 | A shop's sales.csv: computed Revenue, split–apply–combine widget, `groupby` + `value_counts`, group-by-a-typed-column, named `.agg`, missing data (`isna` / `dropna(subset)` / `fillna`, starter crashes on NaN), `to_csv(index=False)` checked by reading the saved file, monthly report (JS simulator). |
| 13.1 Matplotlib (`Unit13_1`) | ✅ 2026-11-13 | 8 | 8/8 | Charts are graded by inspecting the figure (titles, labels, bar heights, tick labels, line data, wedges, legend, colours). Line, bar, scatter, pie, two lines + legend, CSV → groupby → bar (hidden CSV), subplots, two-chart sales dashboard. |
| 13.2 Seaborn (`Unit13_2`) | ✅ 2026-11-13 | 6 | 6/6 | seaborn installed via micropip. barplot (mean + error bar), histplot bins, boxplot + pandas medians, scatterplot with hue, correlation heatmap (annot, cmap), make-task: strongest link by abs(r) with regplot — the hidden class has a different (negative) strongest factor. |
| 13.3 Plotly (`Unit13_3`) | ✅ 2026-11-13 | 6 | 6/6 | plotly installed via micropip; `fig.show()` captured and rendered live in a sandboxed iframe (verified: chart draws). Checks read `fig.data` / `fig.layout` and `_fh_shown()`. px.bar, px.line from grouped sales, px.scatter with color + hover_data, donut pie, update_layout / update_traces, class explorer (histogram + sized scatter). |
| Track A · Personal Expense Tracker (`UnitMP_GEN`, rebuilt) | ✅ 2026-11-13 | 5 | 5/5 | Five typed checkpoints: budget menu with over-budget warning (`>` not `>=` tested) → categories as tuples + `totals_by_category` dict + sort key with ties → expenses.txt load/save, broken lines skipped, `NegativeAmountError` → `Expense` / `Tracker` classes (post checks call them) → pandas category + month totals and a bar chart (hidden CSV). Shared helpers in `src/kit/project.jsx`. |
| Track B · Shop Inventory Manager (`UnitMP_SHOP`, new) | ✅ 2026-11-13 | 5 | 5/5 | One item sell/restock/low-stock menu → whole shop in dicts with an aligned bill from `bill_line()` (format specs) → stock.csv load/save + `OutOfStockError` → `Product` / `Shop` classes → inventory value by category, reorder list, chart. |
| Track C · Event Seat Booking (`UnitMP_SEAT`, new) | ✅ 2026-11-13 | 5 | 5/5 | Seat counts with a waitlist (`min`) → 4×6 seat map as a 2-D list built with a comprehension, `parse_seat` → (row, col) tuple, map printing → bookings.txt with `SeatTakenError`, duplicates in the file caught by the same `book()` → `Show` / `BookingOffice` classes → occupancy %, revenue, student share, chart. |
| Track D · Sports League Tracker (`UnitMP_LEAGUE`, new) | ✅ 2026-11-13 | 5 | 5/5 | W/D/L season with best winning run → points table via `record()`, four-level sort key, aligned with `{gd:>+5}` → results.txt in, table.csv out, `InvalidScoreError` → `Team` / `League` classes → goals per team (`add(fill_value=0)`), biggest win, chart. |
| The 10 Crucibles (`Unit4_C`…`Unit10_C`, `UnitCT1_C`…`UnitCT3_C`, rebuilt) | ✅ 2026-11-13 | 6 each = 60 | 60/60 | Were MCQ + drag-to-assemble with one small typed task at the end (the professor's original complaint). Now `src/kit/Crucible.jsx`: four stages that unlock in order (`lockAhead`), all typed — ✨ Spark = two **TRACE IT** (`kind: "predict"`: type the exact output, Python checks it, feedback names the first wrong line without revealing it), 🔥 Flame = two bug hunts (logic bugs that run, not just crashes), ⚒️ Forge = complete, 🗡️ Temper = a make task with hidden tests (CT strands: algorithm as # comments). Finishing records the bare unitId, so the certificate rule (`completion.js`) and learners' earlier Crucible completions are unaffected; partial progress in the old stages (`UnitX_C@spark`…) is not carried over. |
| 9.1–9.4 Errors & Files (`Unit9_1`…`Unit9_4`) | ✅ 2026-11-14 | 7 + 6 + 7 + 4 | 24/24 | No factual errors; all watch-only before. Added: reading tracebacks, try/except, retry loops, the **bare-except-hides-bugs** fix-it, several excepts, `as e`, else/finally, `raise` in functions, except ordering, ATM; files with `with`, `"w"` vs `"a"`, missing-`
` bug, records with strip/split, FileNotFoundError, expense log (Track A seed); capstone: load/save, crash-proof input, corrupted-file recovery, merge two files. Tests prepare files via `setup`; hidden checks open the file the learner's program saved (new per-test `post`). |
| CT I · 1–5 (`UnitCT1_1`…`UnitCT1_5`) | ✅ 2026-11-14 | 6 + 6 + 5 + 6 + 4 | 27/27 | No factual errors; but several programs now duplicated Module 6, so all problems are **new** (sum of squares, harmonic series, savings, fuel log; even digits, palindrome, Armstrong, power, binary, digital root; all-odd / any-zero flags, perfect numbers, GCD/LCM, leap years; inverted / right / Floyd / hollow / pyramid patterns, aligned tables with `{x:4}`; primes capstone with a **measured** √n speed-up, twin primes). Every program must start with its algorithm as `#` comments (the four moves). New shared widget `src/kit/FourMoves.jsx`. Self-test caught two bugs in my own specs (twin-prime "0 & 2", a wrong rule count) — fixed. |
| 8.4 Grand Capstone: Marks Manager 2.0 | ✅ 2026-11-14 | 4 | 4/4 | Watch-only before, pass mark 50 — fixed to 40. Now typed: `grade()` + `class_stats()` returning a tuple → menu of function calls (`add_student` mutates the dict passed in) → `read_int()` validation helper; make-task: number toolkit (`is_prime`, `digit_sum`, `reverse_number`) checked by hidden function calls. |
| 8.3 Scope & the Call Stack | ✅ 2026-11-13 | 7 | 7/7 | No factual errors. Added: lists passed in can change (aliasing), UnboundLocalError fix-it (pass in, return out; `global` discouraged), weather functions make-task. Coach now explains UnboundLocalError and "local used outside its function". |
| 8.2 Parameters & Return Values | ✅ 2026-11-13 | 10 | 10/10 | No factual errors. Added **default parameters, keyword arguments, docstrings**, missing-argument TypeError, early return / None, bill splitter. Hidden checks call the learner's functions directly. |
| 8.1 Why Functions? | ✅ 2026-11-13 | 7 | 7/7 | No factual errors. Added the three “nothing happened” bugs (never called, no brackets, called before def), functions calling functions, refactor make-task. |
| 7.7 Capstone: Marks Manager (`Unit7_6`) | ✅ 2026-11-13 | 4 | 4/4 | Watch-only before; used pass mark **50** (rest of course uses 40) — fixed. Now typed: report from two input lines → menu loop (Add/Report/Exit) → Search + merit list via sorted `(mark, name)` tuples; make-task: top-3 words with `(-count, word)`. Expected outputs come from JS simulators that the Python solutions independently match. |
| 7.6 Sets (`Unit7_5`) | ✅ 2026-11-13 | 7 | 7/7 | No factual errors. Added: `{}` vs `set()` fix-it, distinct words, seen-set first-duplicate, attendance checker with `- & |`. |
| 7.5 Dictionaries (`Unit7_4D`, **new**) | ✅ 2026-11-13 | 9 | 9/9 | Split out of old 7.4. Added `.get()`, `.items()/.keys()/.values()`, counting pattern (`counts.get(x, 0) + 1`), election winner, `del`, list of dicts, canteen billing. Registered in config after Unit7_4. |
| 7.4 Tuples (`Unit7_4`, retitled) | ✅ 2026-11-13 | 10 | 10/10 | Was one tab of "Tuples & Dictionaries". Now a full unit: `(5,)`, immutability fix-it, packing/unpacking, `a, b = b, a`, ValueError on unpacking, `divmod`, lists of tuples, `enumerate`, `zip`, merit list. |
| 7.3 List Methods & Loop Patterns | ✅ 2026-11-13 | 9 (1 optional) | 9/9 | No factual errors. Added `sum/min/max`, `sorted()` vs `.sort()` (None bug), best-so-far without max, `split()/join()`, reading a line of numbers, filtering, list comprehension (optional bonus), class report. |
| 7.2 Lists | ✅ 2026-11-13 | 9 | 9/9 | No factual errors, but **aliasing was missing** (`b = a` shares one list). Added: name-tag aliasing stepper, `.copy()`, backup bug, `insert/extend/index/count`, `x = x.append()` → None bug, 2-D lists, seat booking. |
| 7.1 Strings in Depth | ✅ 2026-11-13 | 11 | 11/11 | No factual errors, but **no string methods at all**. Added: `strip lower upper title replace find count startswith isdigit`, `in`, `[::-1]` and step slices, looping over text, IndexError, the `name.upper()` not-saved bug, username generator. |
| 6.4 Capstone: Number-Guessing Game | ✅ 2026-11-13 | 4 | 4/4 | Correct but watch-only. Now typed in 3 versions (one guess → while True + break → for + flag, 7-try limit) plus a multiplication-quiz make-task. Tests fix `random.randint` via the new `setup`; a hidden test catches re-picking the secret inside the loop. |
| 6.3 break, continue & Nested Loops | ✅ 2026-11-13 | 8 | 8/8 | No factual errors. Added the flag pattern (3-attempt login), `continue` for absentees, nested triangles, prime checker (1 is not prime). |
| 6.2 for & range() | ✅ 2026-11-13 | 8 | 8/8 | No factual errors. Added countdown ranges (negative step), the 3 loop patterns (add / count / multiply — factorial starts at 1), while→for rewrite, FizzBuzz. |
| 6.1 The while Loop | ✅ 2026-11-13 | 9 | 9/9 | No factual errors. Added accumulator, input-validation loop, sentinel loop, digit count/sum with % and //. |
| 5.4 Capstone: Decision Maker | ✅ 2026-11-12 | 4 | 4/4 | Logic was correct, but students only watched it. Now typed in 3 versions (pass/grade → scholarship with `and` → nested Honor Roll + input validation), plus the slab-rate electricity bill from a blank editor. |
| 5.3 Combining Conditions (was "Nested Conditions & Boolean Logic") | ✅ 2026-11-12 | 9 | 9/9 | `or`/`not` were barely taught (unit was all `and`; truth table was in old 4.4). Referred to a non-existent "weather example". Added: truth table, the `day == "Saturday" or "Sunday"` bug, chained ranges `0 <= m <= 100`, conditional expression, short-circuit as a safety fix, scholarship make-task. |
| 5.2 if / elif / else | ✅ 2026-11-12 | 9 | 9/9 | Ticket program used tuple unpacking before Module 7 — removed. Added: if without else, missing colon/indent, `=` in a condition, separate `if`s vs `elif` (95 → A, B and C), `if name:`. Coach now recognises `=` in conditions and `else <condition>:`. |
| 5.1 Comparisons & Booleans (was "Booleans & Truthy/Falsy") | ✅ 2026-11-12 | 8 | 8/8 | Claimed comparisons were taught in 4.4 (now moved here); used `if` before 5.2 and lists/dicts before M7. Added: all six comparisons with boundary tests, `=` vs `==` silent bug, text comparison (`"10" < "9"`), `None`, the float trap `0.1 + 0.2 == 0.3`. |
| 4.5 Formatted Output (**new**) | ✅ 2026-11-12 | 10 | 10/10 | f-strings, expressions in `{ }`, `:.2f`, `sep=`, `end=`, `\n` `\t`, triple quotes; canteen-receipt make-task. Registered in config as `Unit4_5`. |
| 4.4 Operators & Expressions | ✅ 2026-11-12 | 11 | 11/11 | **Calculator widget was wrong for negatives**: `%` used JavaScript's rule (`-17 % 5` showed -2; Python gives 3); `//` described as "throws away the decimal" (it floors: `-17 // 5` is -4); `/` results cut to 4 decimals. Fixed. Comparisons/and/or/not moved out (taught in 5.1/5.3). Added `+=`, `"=" * 26`, `round` incl. banker's rounding `round(2.5) → 2`, `abs`, `import math` (`sqrt`, `pi`, `ceil`, `floor`), Simple Interest make-task. Hidden-test failures now show the input that failed. |
| 4.3 Input & Type Conversion | ✅ 2026-11-12 | 10 | 10/10 | No factual errors. Added: the silent `"40" + "35" = "4035"` bug, `int(3.9) → 3` (cuts off, doesn't round), `str()` for joining, ValueError vs TypeError. Coach now tells "forgot int() on input" apart from "text + number glue". |
