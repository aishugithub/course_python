# Mini-Project Report builder (inside Foothold): plan

**Lightened (2026-10-20, owner):** no sentences after tagging concepts (only the one-tap "where is the file saved" for Exp 5–6 remains); screenshots: 5 ideas shown, at least 2, each tagged by tapping an idea (caption optional); testing: 7 ideas shown, at least 2, each = what I tried + what happened + Pass/Fail; "How it grew" removed (9 steps now); reflection all optional except the AI yes/no tap; references and acknowledgement both required. The sections below describe the original design; where they differ, this note wins.

**Status (2026-10-17): BUILT and tested locally; hidden from students until switched on (see "Switching it on" at the end).**
Code: `src/shell/report/` (ReportBuilder, steps, concepts.js, analyzer.py/.js, pdf.js), backend in `Code.gs` (report actions at the end), fonts in `public/fonts/report/`.

Agreed with the course owner, 2026-10-17. Course: MED23CL202 Python Programming Laboratory (1 credit). Students work **alone**.

## Why
Students should build their report stage by stage from their own working code, so they learn while writing it and cannot simply print a ChatGPT report. The steps make them find and explain each course concept in their own program; the viva uses the same report.

## Where it lives
- Inside the Foothold Python course (`course_python`), as a new **Mini-Project Report** card on the dashboard. Students use their existing Foothold login.
- Students come to it once their project works and they have done as much of the e-Lab Record as they will do.

## Decisions
| Topic | Decision |
|---|---|
| Who | One student per report. No pairs, no work-split appendix. |
| Tracks | Not on the cover. The four tracks are only suggestions; any project is allowed. |
| Typed by student | Only the **project title**. Name, register number, batch come from the login; academic year and faculty in-charge are fixed in config. |
| Output | **PDF only** (a real download, built on the student's device). No Word file. |
| Saving | Drafts save to the Google Sheet backend after each step, so students can continue later on another device. Screenshots go to a Google Drive folder (shrunk in the browser first). Report endpoints need a session token issued at login (today `saveProgress` trusts the roll number alone). |
| Menu loop | Not required. Students may show their program running in bits and pieces. |
| Must-haves | Not enforced. Each concept can be marked "I didn't use this"; the report says "Not used". |
| Data-fields table | Dropped (too tedious). |
| Screenshots | Colab notebook named with the register number (e.g. `E0125001_miniproject.ipynb`); the Colab title bar must be visible in each screenshot. No banner line required. |
| Certificate | Built **at download time** from the Progress sheet (not from anything the student types). All 15 items (10 experiments + 5 mini-project crucibles) + feedback → the normal completion certificate. Otherwise a progress certificate with **no "completion" wording**, e.g. "has completed 9 of the 15 e-Lab activities (60%): 7 experiments and 2 mini-project checkpoints". No minimum, no cut-off date. |

## Steps the student goes through
1. **Title**: project title only.
2. **The problem**: who uses it and where; 2–4 problems, each with "how my program fixes it".
3. **Objectives**: 3–5 points.
4. **Code**: paste every file or Colab cell (+ Add file). Shown with line numbers.
5. **Highlight passes: 10 screens, one per experiment (Exp 5 and 6 share one), 25 concepts in all** (taken from the lab manual's aims and programs, checked 2026-10-17). On each screen the student tags each concept by clicking lines (shift-click for a range) in that concept's colour, or marks it "I didn't use this". Then one light question (below).

   | Exp | Concepts (what the student tags) |
   |---|---|
   | 1 | Input with type conversion (`int(input())`, `float(input())`) · arithmetic operators · relational and logical operators · decisions (`if/elif/else`) |
   | 2 | `for` loop · `while` loop · list · dictionary · function with `return` · module (`import math` / `statistics` / own file) |
   | 3 | class · objects created · private attribute with getter/setter |
   | 4 | inheritance (subclass) · **overriding / polymorphism** (one item, see below) |
   | 5–6 | **File handling: one item, any file, any mode.** Any file the program writes, appends to or reads (text, CSV, JSON, a pandas `read_csv`/`to_csv`, anything). CSV is not required; `with open(...)` is welcome but not required. |
   | 7 | `try / except` · more than one specific exception |
   | 8 | `raise` · `finally` · user-defined exception (defined, raised, caught) |
   | 9 | pandas DataFrame (`pd.DataFrame` / `pd.read_csv`) · select and filter (`df["col"]`, boolean filter, `head`, `shape`) |
   | 10 | Matplotlib chart with labels (`plot`/`bar`, `xlabel`, `title`, `show`) · Seaborn chart |

   Plotly is left out (the manual shows it but does not practise it).

   **Overriding / polymorphism (Exp 4) is one item with two ways to show it; either counts as used, both welcome:**
   - A. Method overriding: tag the method redefined in a subclass (check: the parent has a method of the same name).
   - B. Polymorphism: tag one line where the same method call meets different kinds of objects, e.g. `s.area()` in a loop (check: the method exists in two or more classes, with or without a common parent, so duck typing counts).
   - If only A is tagged, show a tip using their own method name ("your `status()` becomes polymorphism when one line calls it on different kinds of patients, e.g. `for p in patients: print(p.status(t))`"). Read-only, nothing to do.
   - Note for the lab manual: Exp 4 Program 2 calls `d.role()` and `n.role()` on separate lines, which shows overriding but not polymorphism; `for s in [d, n]: print(s.role())` would show both.

   **Light questions: one per experiment screen, a sentence to complete, one line**, with the student's own names filled in. No word minimum (a gentle hint under 3 words), no right/wrong shown. Asked only if something in that experiment was used.

   | Exp | Sentence to complete |
   |---|---|
   | 1 | My `if` on line N checks whether ___ |
   | 2 | This loop repeats ___ |
   | 3 | I kept `__attr` private so that ___ |
   | 4 | `Sub` is different from `Parent` because ___ / This one line runs the version from ___ |
   | 5–6 | My program saves its file in: (tap) Colab folder / Google Drive / my computer · My program uses the file to ___ (Colab folder → explain it is lost when the runtime resets) |
   | 7 | Without this `try / except`, my program would ___ |
   | 8 | `MyError` is raised when ___ |
   | 9 | This pandas code tells me ___ |
   | 10 | My chart shows ___ |

   **Concepts not used** (never blocks the PDF):
   - While building: "That's fine. Your report will list `finally` as not used." Optional one line: "Where could it have fitted in your project?"
   - If the parser finds the concept anyway: "We found a while loop in main.py line 14. Did you mean to tag it?"
   - A meter stays visible: "Concepts used: 19 of 25", plus a count per experiment screen; the final check lists the unused ones again.
   - In the report: summary table with Used / Not used, "Used 19 of the 25 course concepts", and a subsection "Concepts not used in this project" with the optional notes.

   **Checks warn, never block.** A failed check says e.g. "We couldn't confirm a loop in these lines"; the student can fix the tag or press "Keep my tag". A kept tag appears in the report marked "not confirmed by Foothold" and is flagged on the viva sheet.

6. **Program running**: upload screenshots, each tagged with the concept it shows, with a caption. For file handling, one screenshot of the program saving something to a file (and reading it back, if the project does that) is enough; no restart test is required.
7. **Testing**: at least 5 tests (lightened from 8), each with an optional type (normal, boundary, wrong type, impossible value, missing file, own exception, other) and Pass / Fail.
8. **How it grew**: Experiments 1–10 with completion dates from the Progress sheet; one line each on what they added to their project.
9. **Reflection**: hardest bug (what you saw → how you found it → the fix) · limitations and safety ("not a medical device") · conclusion · future scope · AI tools used and for what.
10. **References**, optional acknowledgement → missing-items check → **Download PDF**.

## Checking the student's code (works for any project)
- Python's own parser (`ast`, run in the browser with Pyodide, which Foothold already uses) finds every class and its parent, overridden methods, loops, try/except/raise/finally, user-defined exceptions, file, csv, pandas and chart calls.
- Used only to **check and hint**, never to tag for the student: e.g. "ICUPatient extends Patient, which you haven't tagged yet", "We found 3 classes; you've tagged 2", "Line 12 is a comment, not a loop".
- Lines starting with `!` or `%` (Colab) are set aside before parsing. A parent from a library (e.g. `tk.Frame`, `Exception`) is accepted. If the code has a syntax error, the page shows where and falls back to simple line-pattern checks.
- It checks structure, not whether the design is sensible; the one-line questions and the viva cover that.

## The PDF
Cover → bonafide certificate → declaration → Foothold certificate (completion or progress) → contents → sections → Appendix A.
- **Section "Python concepts in my program"**: a summary table (Exp, concept with colour key, file and lines, Used / Not used), then one short section per concept: the tagged lines with file name and line numbers, a "Checked by Foothold" line from the parser, the student's answer, and any screenshot tagged with that concept as a numbered figure. A user-defined exception shows where it is defined, raised and caught.
- **Appendix A**: the full code, every file, with line numbers; each tagged line has a coloured bar **and a letter** (D, L, C, S, E, F …) so it still reads in black and white; a line in two concepts gets both.
- Footer: course code, register number, page number.

## For the teacher
On download, a summary row goes to the Sheet (a viva sheet): title, concepts used / not used, key line ranges, hardest bug, test list, plus time per step and how much text was pasted (hints for the viva only, never marks on their own).

## Build order
1. Backend (Code.gs): session token at login; save/load report draft; screenshot upload to a Drive folder; return Progress completion dates; viva-sheet row. Owner redeploys the Apps Script.
2. Report screen: steps 1–4 (title, problem, objectives, code), with saving and resuming. Show the owner.
3. Highlight passes with the parser checks.
4. Screenshots, testing, how it grew, reflection, references.
5. PDF (certificate, concept sections, coloured code appendix). Show the owner a sample report.

## Also suggested
A short "Where do my files go in Colab?" box for Experiment 5 of the lab manual: files go to `/content` (Files panel), survive Restart session, and are deleted when the runtime disconnects; use `drive.mount('/content/drive')` and `/content/drive/MyDrive/...` to keep them.

## Switching it on (owner)
1. **Apps Script:** open the Foothold Google Sheet → Extensions → Apps Script. Replace the code with the new `Code.gs` and save. In the function menu at the top choose **`reportRootFolder`** and press **Run** once. Google asks for Drive permission; allow it. This creates the "Foothold Mini-Project Reports" folder in your Drive. (Never run `setupSheets`: it clears the Students and Progress sheets.) Then Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy. The web-app URL stays the same.
2. **Open the report:** in `config/course.config.js`, set `miniProjectReport.open: true`.
3. **Publish:** commit, push, and `npm run deploy`.
4. **Try it yourself** with your own account before telling students: write a few steps, open it on your phone to check it continues there, download the PDF.

New sheets appear by themselves: `Sessions` (sign-in tokens), `Reports` (one row per student: title, step, last saved), `ReportSummary` (one row per PDF download: the viva sheet). Drafts and screenshots are in Drive under "Foothold Mini-Project Reports/<roll number>/".

## Local testing (Claude)
`.claude/mock_gas/` (gitignored): `dev.cjs` runs the real `Code.gs` against in-memory Sheets/Drive on port 8787 plus Vite on 5175 with `VITE_REPORT_OPEN=1`; test student E0125001 / test1 (9 of 15 e-Lab items done). `sink.cjs` receives a generated PDF for inspection.
