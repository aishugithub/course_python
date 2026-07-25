# Teacher Dashboard — Setup Checklist

A read-only dashboard that reads your Foothold course sheets (Python + COA) and
your marks workbook, and displays progress, lab completion, defaulters, and
auto-calculated marks. It writes nothing, so the links are safe to share.

## Files in this folder
- **Dashboard.gs** — the server logic (paste into Apps Script).
- **General.html** — the "all students / course progress" page (Python + COA).
- **Med.html** — the "MED ENGG LAB" page (lab matrix, defaulters, marks).
- **Marks_template.csv** — import into the *Marks* tab of your marks workbook.
- **DueDates_template.csv** — import into the *DueDates* tab of your marks workbook.
- *Index.html* — obsolete, ignore.

## One-time setup

1. **Create the Apps Script project.** Go to script.google.com → New project.
   - Paste `Dashboard.gs` into the default `Code.gs`.
   - Add an HTML file named exactly **`General`** → paste `General.html`.
   - Add an HTML file named exactly **`Med`** → paste `Med.html`.

2. **Set up the marks workbook** (sheet id already wired in Dashboard.gs:
   `1ZbQ…7Dg0`). In that workbook:
   - Create a tab named **`Marks`** → File ▸ Import ▸ Upload `Marks_template.csv`
     ▸ *Replace current sheet*. Leave marks blank normally; type a number in a
     cell ONLY to override that student's auto mark.
   - Create a tab named **`DueDates`** → import `DueDates_template.csv`. Fill the
     **DueDate** column as `YYYY-MM-DD` (e.g. `2026-08-15`) for each experiment.
     Blank = no late penalty for that experiment yet.

3. **Check the config** at the top of `Dashboard.gs` (already filled for you):
   - `PYTHON_SHEET_ID` = `1XDU…UuaE`
   - `COA_SHEET_ID`    = `1adL…DbFk`
   - `MARKS_SPREADSHEET_ID` = `1ZbQ…7Dg0`

4. **Test before deploying.** In the editor, pick `testData` from the function
   dropdown → **Run**. Grant permissions when asked. Check the Execution log:
   it should show Python & COA student counts, `MED roster: 59`, and
   `marks linked: true`.

5. **Deploy.** Deploy ▸ New deployment ▸ **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone with the link** (or "Only myself" for private).
   - Copy the web-app URL. Your two pages are:
     - General: `…/exec?view=general`
     - MED lab: `…/exec?view=med`

6. **Turn on nightly marks writing.** In the editor, run **`createNightlyTrigger`**
   once (grant permission). From then on the script runs **`writeMarks`** every
   night (~1 AM): it computes each student's mark and writes it into the `Marks`
   tab of your workbook. It also creates a hidden `_AutoMarks` tab — leave that
   alone; it is how the script remembers its own values.
   - To update the sheet immediately (not wait for night), just run `writeMarks`.
   - **Overrides:** type a number over any cell in the `Marks` tab and it is kept;
     leave a cell as written and it keeps refreshing as the student does more work.
     (You no longer need the separate blank Marks_template import once the nightly
     job has run — it fills the tab itself. Importing it first is still fine.)

## Marks rule (for reference)
- Each experiment is out of **10** = weighted completion of the 6 subdivisions:
  per program → Algorithm **1**, Flowchart **1.5**, Program **2.5** (×2 = 10).
- **Late penalty:** −10% of the earned mark per day past the due date, down to 0.
- A number typed in the `Marks` tab overrides the auto mark (shown with ✎).

## Everyday use
- Open the MED link to see lab progress, defaulters (per experiment), and marks.
- Hover any mark to see its breakdown (base, late penalty, override, date done).
- Use the search box to find a student; use **Export (CSV)** for your records.
- Click **Reload** in the page header after students submit new work.

## When you build experiments 2–10
In `Dashboard.gs`, in `LAB_EXPERIMENTS`, set that experiment's `built: true` and
give it a `stages` array (copy `LAB_STAGE_TEMPLATE`). Everything else updates
automatically — matrix column, completion bar, defaulters, and marks.
