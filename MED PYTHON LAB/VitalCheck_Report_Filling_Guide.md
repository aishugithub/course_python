# What to enter in the mini-project report: VitalCheck sample

A worked example of every step of the Foothold report builder (9 steps), using the sample project **VitalCheck** (Track A, Patient Vitals Monitor).

It works with either sample notebook:
- **One-cell version** `VitalCheck_Sample_OneCell_TrackA.ipynb`: paste the whole cell as one file named `vitalcheck.py`.
- **10-cell version** `VitalCheck_Sample_MiniProject_TrackA.ipynb`: paste each code cell as its own file, named `cell1.py` … `cell10.py` (in order).

Line numbers count from the first line of what you paste (the first comment line is line 1). Every tag below was checked with the report's own code checker and comes back "✓ Checked by Foothold".

The answers are written the way a student might write them. If you show this to students as a model, tell them their own report must be about their own project.

---

## Step 1 · Project title
> VitalCheck: a ward vitals monitor that flags abnormal readings

## Step 2 · The problem
- **Who will use it:** Nurse
- **Where:** Hospital ward

| Problem today | How my program helps |
|---|---|
| Vital signs are written on a paper chart, so an abnormal reading is noticed only when someone reads the chart. | VitalCheck labels every reading NORMAL, CHECK or URGENT the moment it is entered. |
| ICU patients need closer watching, but one set of limits is used for everyone. | ICU patients get stricter limits, so a smaller change is flagged sooner. |
| Typing mistakes such as 160 °F end up in the record. | Impossible values are refused with a clear message, and nothing is saved. |

- **What my program does:**
> VitalCheck lets a ward nurse record each patient's temperature, pulse and blood pressure. It flags abnormal readings at once, uses stricter limits for ICU patients, saves every reading in a file in Google Drive, and shows a summary and charts.

## Step 3 · Objectives
1. To store each patient's readings in a class, so they can only be added through a method that checks them.
2. To flag abnormal readings at once, with stricter limits for ICU patients.
3. To refuse impossible values and wrong input with a clear message instead of crashing.
4. To save every reading in a file so it is not lost when the program closes.
5. To summarise the readings with pandas and show them in charts.

## Step 4 · Your code
- **One-cell version:** one file, name it `vitalcheck.py`, paste the whole code cell.
- **10-cell version:** ten files, `cell1.py` … `cell10.py`, one code cell each.

## Step 5 · Python concepts (tag these lines)

| Exp | Concept | One-cell `vitalcheck.py` | 10-cell version |
|---|---|---|---|
| 1 | Input with type conversion | lines 122–123 | cell4.py lines 8–9 |
| 1 | Arithmetic operators | line 140 | cell4.py line 26 |
| 1 | Comparison and logical operators | line 57 | cell2.py line 23 |
| 1 | Decisions (if / elif / else) | lines 98–101 | cell3.py line 37 (to 40) |
| 2 | for loop | lines 96–101 | cell3.py line 35 (to 40) |
| 2 | while loop | lines 119–125 | cell4.py line 5 (to 11) |
| 2 | List | line 95 | cell3.py line 34 |
| 2 | Dictionary | line 38 | cell2.py line 4 |
| 2 | Function that returns a value | lines 128–135 | cell4.py line 14 (to 21) |
| 2 | Module (import) | lines 13–20 | cell1.py lines 2–9 |
| 3 | Class | lines 64–102 | cell3.py line 3 (to 40) |
| 3 | Objects created | line 294 | cell10.py line 15 |
| 3 | Private attribute with getter / setter | lines 70, 82, 84 | cell3.py lines 9 and 21 |
| 4 | Inheritance (subclass) | line 105 | cell3.py line 44 |
| 4 | Overriding or polymorphism | lines 111–112 | cell3.py line 50 (to 51) |
| 5–6 | File handling | lines 152–157 | cell5.py line 10 (to 15) |
| 7 | try / except | lines 120–125 | cell4.py line 6 (to 11) |
| 7 | More than one specific exception | lines 180–181 | cell5.py line 38 (to 39) |
| 8 | raise | line 58 | cell2.py line 24 |
| 8 | finally | lines 160–162 | cell5.py line 18 (to 20) |
| 8 | Your own exception: defined, raised, caught | lines 49, 58, 309 | cell2.py lines 15 and 24; cell10.py line 30 |
| 9 | pandas DataFrame | line 192 | cell6.py line 8 |
| 9 | Select and filter data | lines 195–197 | cell6.py lines 11–13 |
| 10 | Matplotlib chart with labels | lines 213–222 | cell7.py line 10 (to 19) |
| 10 | Seaborn chart | line 228 | cell7.py line 24 |

All 25 are used, so nothing is marked "I didn't use this". To see the warnings working, try one wrong tag (e.g. Arithmetic on an `import` line) and one "I didn't use this" on something that is there.

For Experiments 5 and 6 there is one tap: **where does your program save its file?** Choose **Google Drive**. Nothing else is written on this step.

## Step 6 · Program running (screenshots)
The page lists five ideas; add **at least two**. For each screenshot, tap what it shows (the caption fills itself in; typing your own is optional). Keep the notebook title (with the register number) in each screenshot.

| Idea to tap | What to screenshot (one-cell version) |
|---|---|
| My program running normally | Menu option 6, then 3 (the ward round) |
| Wrong input handled with a message (no crash) | Option 2, type `abc` for the temperature, then `160` |
| Data saved in the file | `vitals.csv` opened from Google Drive or the Files panel |
| pandas summary of the data | Option 4 |
| A chart | Option 5 |

Optional: link a screenshot to a concept (e.g. the wrong-input one to "Your own exception") and it appears beside that concept in the PDF.

## Step 7 · Testing
The page shows seven test ideas; do **at least two**. Each test is: which idea (optional), what I tried, what happened, Pass / Fail. These were run and give exactly these results; any two are enough.

| Idea | What I tried | What happened | Result |
|---|---|---|---|
| Wrong type | Typed `abc` for the temperature | It said "Please type a number" and asked again | Pass |
| Impossible value | Temperature 160 °F | "temp 160.0 °F is not possible (allowed 85.0–115.0)", not saved | Pass |
| Boundary value | Ward patient, 100.4 °F | CHECK: temp HIGH (100.4 °F) | Pass |
| Boundary value | ICU patient, 99.5 °F | CHECK: temp HIGH (99.5 °F), stricter ICU limit | Pass |
| Normal value | Ward patient, 97.9 °F, pulse 70, BP 112 | NORMAL | Pass |
| Missing or empty file | First run, before any reading is saved | "0 patient(s) loaded"; summary says "No readings saved yet." | Pass |
| Menu or choice | Added a reading for an unknown patient | "No such patient. Add them first (option 1)." | Pass |

## Step 8 · Reflection
Everything here is optional except one tap: **Did you use any AI tool?** Write as much or as little as you like.

*The bug below is an invented example of the kind of answer expected; a student writes about a bug they really met.*

- **What went wrong:** The chart for "ravi" said there were no readings, although Ravi's readings were in the file.
- **How I found the cause:** I printed the names column and saw the names were saved exactly as typed, "Ravi" and "ravi".
- **How I fixed it:** I used .strip().title() on every name the user types, so "ravi" and "Ravi" become the same patient.
- **Limitations:** One set of adult limits is used for every ward patient, whatever their age. Anyone with the notebook can read the data file. The limits are simplified teaching values, not clinical guidelines.
- **Conclusion:** VitalCheck records temperature, pulse and blood pressure, flags abnormal readings at once with stricter ICU limits, refuses impossible values, and keeps every reading in a file for the summary and charts. All five objectives were met. I learned how classes, my own exception and file handling work together in one program.
- **Future scope:** Add a time chart for pulse and BP too. · Warn when a patient's temperature rises in three readings in a row.
- **AI tools:** for this sample, **Yes**: "This sample was written with help from Claude, an AI assistant." (A student writes their own honest answer.)

## Step 9 · References and acknowledgement (both needed)
1. Python Software Foundation, "The Python Tutorial," docs.python.org/3/tutorial.
2. pandas development team, "pandas documentation," pandas.pydata.org.
3. Matplotlib and seaborn documentation, matplotlib.org and seaborn.pydata.org.
4. MED23CL202 Python Lab Manual and the Foothold Python course (Experiments 1–10).

**Acknowledgement:** I thank my faculty in-charge and the lab staff for their guidance, and my classmates for testing VitalCheck.
