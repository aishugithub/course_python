// UnitLAB6_5 — 🔥 Checkpoint: Mini-Project Crucible (Experiments 5 & 6)
// ─────────────────────────────────────────────────────────────────────
// A gated, CRUCIBLE-STYLE assessment (same Spark → Flame → Forge → Temper
// arc as UnitLAB2_5), restructured around the lab manual's FOUR
// mini-project tracks. It tests the two paired experiments (
// encapsulation) and Experiment 4 (inheritance & polymorphism) ENTIRELY
// through the student's chosen project — every stage is real file I/O.
//
// HOW IT FITS THE WHOLE APP ───────────────────────────────────────────
// The shell (src/shell/App.jsx) lazy-loads this file by unitId via
// import.meta.glob('../lessons/*.jsx') and passes four props:
//   • student            — { rollNo, name, batch }
//   • onUnitComplete()   — call ONCE, from the "claim" button, to file the
//                          whole checkpoint against the student's roll no.
//                          (It also unloads the lesson back to the dashboard,
//                          so — like the Crucible badge — it must be SEEN and
//                          clicked, never auto-fired.)
//   • challengeProgress  — array of completed pseudo-unitIds, used to resume
//   • onStageComplete(id)— call after each gated stage to persist that brick
//                          (e.g. "UnitLAB6_5@A_spark") to the Events/Progress
//                          sheet — the teacher's e-observation record.
//
// TRACKS ARE INDEPENDENT, NOT CROSS-GATED. The manual says: choose ONE
// track in week 1 and stay on it. So the unit opens with a track chooser;
// the student picks their track and works only inside it. Gating lives
// INSIDE each track — its own Spark → Flame → Forge → Temper unlock in
// sequence. Completing the chosen track marks the checkpoint done.
//
// GROWING CHECKPOINT. This is the SECOND crucible (after UnitLAB2_5).
// Where that one forged Experiments 1 & 2 (conditionals, loops, functions),
// this one forges the FILE half of each track: saving records to a text file
// (Exp 5) and reading them back to count what matters (Exp 6).
// Each track's data is self-contained here and easy to extend later.
import { useState, useRef } from "react";

// ── Brand palette — the Crucible's fire tones (orange/red) ──
const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const UNIT_ID = "UnitLAB6_5";
const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };

// The four crucible stages, shared by every track (same names/icons as UnitLAB2_5).
const STAGE_DEFS = [
  { id: "spark", label: "Spark", icon: "✨", tag: "Predict & Trace" },
  { id: "flame", label: "Flame", icon: "🔥", tag: "Bug Hunt" },
  { id: "forge", label: "Forge", icon: "⚒️", tag: "Assemble" },
  { id: "temper", label: "Temper", icon: "🗡️", tag: "Write Real Python" },
];

// ═════════════════════════════════════════════════════════════════════
//  TRACK DATA — the entire assessment content for all four projects.
//  Each track supplies data for its four stages:
//    spark.questions[]  → predict-the-output MCQs + one trace-the-state
//    flame.bugs[]       → click-the-line then pick-the-fix bug hunts
//    forge{...}         → a Parsons problem (reorder the Exp-3 class)
//    temper{...}        → write-real-Python (the Exp-4 subclass) + fallback
//  All code is drawn from Experiments 5 & 6 applied to THAT track.
//  Every program here was verified in real CPython (visible + hidden).
// ═════════════════════════════════════════════════════════════════════
const TRACKS = [
  {
    key: "A", icon: "🅰", title: "Patient Vitals Monitor",
    blurb: "Save your temperature readings to a file, then read them back and tally the ones that matter — real file I/O, your project's memory.",
    spark: {
      questions: [
        { kind: "mcq", code: "line = \"Ravi - Fever\\n\"\nprint(line.strip())", options: ["Ravi - Fever", "Ravi - Fever\\n", "Ravi-Fever", "Error"], answer: 0, hints: ["strip() removes whitespace (including the trailing newline) from both ends.", "It does NOT remove spaces INSIDE the text — only the ends."], why: "strip() trims the trailing newline but leaves the inner text untouched, so it prints \"Ravi - Fever\"." },
        { kind: "mcq", code: "row = \"Ravi,45,98.6\".split(\",\")\nprint(row[1])", options: ["45", "Ravi", "98.6", "Error"], answer: 0, hints: ["split(\",\") breaks the line into a list of fields at each comma.", "row[1] is the SECOND field (indexing starts at 0)."], why: "split(\",\") gives a list of fields; row[1] is the second one, \"45\"." },
        { kind: "trace", code: "temps = [\"36.5\", \"39.0\", \"38.2\"]\nhits = 0\nfor t in temps:\n    if float(t) >= 38.0:\n        hits = hits + 1\nprint(hits)", expect: "2", prompt: "Trace the loop that reads the records: how many at or above 38.0 (fever)? Type the number.", hints: ["Walk the list one item at a time, checking the condition each pass.", "Count only the ones that satisfy it."], why: "The loop counts the records at or above 38.0 (fever), giving 2." },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should read temperature readings back from vitals.txt — but Python crashes (the file was opened the wrong way). Click the buggy line.",
          lines: ["f = open(\"vitals.txt\", \"w\")", "data = f.read()", "print(data)"],
          buggyLine: 0,
          lineHints: { 1: "read() is correct — but the file was opened in a mode that forbids reading.", 2: "The print never runs; the error is above." },
          fixes: ["f = open(\"vitals.txt\", \"r\")", "f = open(\"vitals.txt\", \"w+\")", "data = f.write()"],
          fixAnswer: 0,
          fixHints: ["Mode \"w\" opens a file for WRITING only — you cannot read from it.", "To read, open it in \"r\" mode."],
          why: "Mode \"w\" is write-only (and it also erases the file); reading needs \"r\".",
        },
        {
          intro: "This should save every temperature reading to vitals.txt — but only the LAST one ends up in the file. No crash, just lost data. Click the faulty line.",
          lines: ["for r in records:", "    with open(\"vitals.txt\", \"w\") as f:", "        f.write(r + \"\\n\")"],
          buggyLine: 1,
          lineHints: { 0: "Looping over the records is fine.", 2: "Writing one record is fine — the problem is the mode on the line above." },
          fixes: ["    with open(\"vitals.txt\", \"a\") as f:", "    with open(\"vitals.txt\", \"r\") as f:", "    with open(\"vitals.txt\", \"x\") as f:"],
          fixAnswer: 0,
          fixHints: ["Opening in \"w\" ERASES the file — and it happens on every pass of the loop.", "Use \"a\" (append) so each record is added, not overwritten."],
          why: "Opening in \"w\" inside the loop erases the file each pass, leaving only the last record; \"a\" appends so all of them survive (or open the file once before the loop).",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-5 program that SAVES the records to vitals.txt (one per line). Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "records = [\"36.5\", \"39.0\", \"38.2\"]", defines: "t0", needs: [] },
        { code: "with open(\"vitals.txt\", \"w\") as f:", defines: "t1", needs: ["t0"] },
        { code: "    for r in records:", defines: "t2", needs: ["t1"] },
        { code: "        f.write(r + \"\\n\")", defines: "t3", needs: ["t2"] },
        { code: "print(\"saved\", len(records), \"records\")", defines: null, needs: ["t3"] }
      ],
      MSG: {
        t0: "“records = [\"36.5\", \"39.0\", \"38.2\"]” has to be placed before it",
        t1: "“with open(\"vitals.txt\", \"w\") as f:” has to be placed before it",
        t2: "“for r in records:” has to be placed before it",
        t3: "“f.write(r + \"\\n\")” has to be placed before it"
      },
      shuffled: [3, 4, 0, 1, 2],
      success: "Records built, file opened, every line written — vitals.txt now holds your data. ⚒️",
    },
    temper: {
      task: "The file vitals.txt has been written for you — one temperature reading per line. Open it, read the lines, and print how many records are at or above 38.0 (the fever count).",
      varNote: "vitals.txt is seeded for you (re-run with hidden records)",
      tests: [
        { pre: "with open(\"vitals.txt\", \"w\") as f:\n    f.write(\"36.5\\n\")\n    f.write(\"39.0\\n\")\n    f.write(\"38.2\\n\")", expect: "2", label: "the seeded records" },
        { pre: "with open(\"vitals.txt\", \"w\") as f:\n    f.write(\"39.0\\n\")\n    f.write(\"39.5\\n\")\n    f.write(\"40.0\\n\")", expect: "3", label: "hidden: reads whatever the file holds", hidden: true }
      ],
      hints: ["Open the file, loop its lines, strip each one, and count the ones that match the condition.", "count = 0 ; for line in open(\"vitals.txt\"): if float(line.strip()) >= 38.0: count += 1 ; print(count)."],
      fbTarget: [
        { code: "count = 0", defines: "t0", needs: [] },
        { code: "with open(\"vitals.txt\") as f:", defines: "t1", needs: ["t0"] },
        { code: "    for line in f:", defines: "t2", needs: ["t1"] },
        { code: "        if float(line.strip()) >= 38.0:", defines: "t3", needs: ["t2"] },
        { code: "            count = count + 1", defines: "t4", needs: ["t3"] },
        { code: "print(count)", defines: null, needs: ["t4"] }
      ],
      fbOrder: [3, 4, 5, 0, 1, 2],
    },
  },

  {
    key: "B", icon: "🅱", title: "Pharmacy Stock Manager",
    blurb: "Save your stock lines to a file, then read them back and tally the ones that matter — real file I/O, your project's memory.",
    spark: {
      questions: [
        { kind: "mcq", code: "line = \"aspirin - 5 left\\n\"\nprint(line.strip())", options: ["aspirin - 5 left", "aspirin - 5 left\\n", "aspirin-5left", "Error"], answer: 0, hints: ["strip() removes whitespace (including the trailing newline) from both ends.", "It does NOT remove spaces INSIDE the text — only the ends."], why: "strip() trims the trailing newline but leaves the inner text untouched, so it prints \"aspirin - 5 left\"." },
        { kind: "mcq", code: "row = \"aspirin,5,10\".split(\",\")\nprint(row[1])", options: ["5", "aspirin", "10", "Error"], answer: 0, hints: ["split(\",\") breaks the line into a list of fields at each comma.", "row[1] is the SECOND field (indexing starts at 0)."], why: "split(\",\") gives a list of fields; row[1] is the second one, \"5\"." },
        { kind: "trace", code: "qtys = [\"12\", \"5\", \"20\"]\nhits = 0\nfor q in qtys:\n    if int(q) < 10:\n        hits = hits + 1\nprint(hits)", expect: "1", prompt: "Trace the loop that reads the records: how many below the reorder level of 10? Type the number.", hints: ["Walk the list one item at a time, checking the condition each pass.", "Count only the ones that satisfy it."], why: "The loop counts the records below the reorder level of 10, giving 1." },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should read stock lines back from stock.txt — but Python crashes (the file was opened the wrong way). Click the buggy line.",
          lines: ["f = open(\"stock.txt\", \"w\")", "data = f.read()", "print(data)"],
          buggyLine: 0,
          lineHints: { 1: "read() is correct — but the file was opened in a mode that forbids reading.", 2: "The print never runs; the error is above." },
          fixes: ["f = open(\"stock.txt\", \"r\")", "f = open(\"stock.txt\", \"w+\")", "data = f.write()"],
          fixAnswer: 0,
          fixHints: ["Mode \"w\" opens a file for WRITING only — you cannot read from it.", "To read, open it in \"r\" mode."],
          why: "Mode \"w\" is write-only (and it also erases the file); reading needs \"r\".",
        },
        {
          intro: "This should save every stock line to stock.txt — but only the LAST one ends up in the file. No crash, just lost data. Click the faulty line.",
          lines: ["for r in records:", "    with open(\"stock.txt\", \"w\") as f:", "        f.write(r + \"\\n\")"],
          buggyLine: 1,
          lineHints: { 0: "Looping over the records is fine.", 2: "Writing one record is fine — the problem is the mode on the line above." },
          fixes: ["    with open(\"stock.txt\", \"a\") as f:", "    with open(\"stock.txt\", \"r\") as f:", "    with open(\"stock.txt\", \"x\") as f:"],
          fixAnswer: 0,
          fixHints: ["Opening in \"w\" ERASES the file — and it happens on every pass of the loop.", "Use \"a\" (append) so each record is added, not overwritten."],
          why: "Opening in \"w\" inside the loop erases the file each pass, leaving only the last record; \"a\" appends so all of them survive (or open the file once before the loop).",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-5 program that SAVES the records to stock.txt (one per line). Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "records = [\"12\", \"5\", \"20\"]", defines: "t0", needs: [] },
        { code: "with open(\"stock.txt\", \"w\") as f:", defines: "t1", needs: ["t0"] },
        { code: "    for r in records:", defines: "t2", needs: ["t1"] },
        { code: "        f.write(r + \"\\n\")", defines: "t3", needs: ["t2"] },
        { code: "print(\"saved\", len(records), \"records\")", defines: null, needs: ["t3"] }
      ],
      MSG: {
        t0: "“records = [\"12\", \"5\", \"20\"]” has to be placed before it",
        t1: "“with open(\"stock.txt\", \"w\") as f:” has to be placed before it",
        t2: "“for r in records:” has to be placed before it",
        t3: "“f.write(r + \"\\n\")” has to be placed before it"
      },
      shuffled: [3, 4, 0, 1, 2],
      success: "Records built, file opened, every line written — stock.txt now holds your data. ⚒️",
    },
    temper: {
      task: "The file stock.txt has been written for you — one stock line per line. Open it, read the lines, and print how many records are below the reorder level of 10.",
      varNote: "stock.txt is seeded for you (re-run with hidden records)",
      tests: [
        { pre: "with open(\"stock.txt\", \"w\") as f:\n    f.write(\"12\\n\")\n    f.write(\"5\\n\")\n    f.write(\"20\\n\")", expect: "1", label: "the seeded records" },
        { pre: "with open(\"stock.txt\", \"w\") as f:\n    f.write(\"3\\n\")\n    f.write(\"8\\n\")\n    f.write(\"50\\n\")", expect: "2", label: "hidden: reads whatever the file holds", hidden: true }
      ],
      hints: ["Open the file, loop its lines, strip each one, and count the ones that match the condition.", "count = 0 ; for line in open(\"stock.txt\"): if int(line.strip()) < 10: count += 1 ; print(count)."],
      fbTarget: [
        { code: "count = 0", defines: "t0", needs: [] },
        { code: "with open(\"stock.txt\") as f:", defines: "t1", needs: ["t0"] },
        { code: "    for line in f:", defines: "t2", needs: ["t1"] },
        { code: "        if int(line.strip()) < 10:", defines: "t3", needs: ["t2"] },
        { code: "            count = count + 1", defines: "t4", needs: ["t3"] },
        { code: "print(count)", defines: null, needs: ["t4"] }
      ],
      fbOrder: [3, 4, 5, 0, 1, 2],
    },
  },

  {
    key: "C", icon: "🅲", title: "Clinic Appointment Book",
    blurb: "Save your slot lines to a file, then read them back and tally the ones that matter — real file I/O, your project's memory.",
    spark: {
      questions: [
        { kind: "mcq", code: "line = \"09:00 Ravi\\n\"\nprint(line.strip())", options: ["09:00 Ravi", "09:00 Ravi\\n", "09:00Ravi", "Error"], answer: 0, hints: ["strip() removes whitespace (including the trailing newline) from both ends.", "It does NOT remove spaces INSIDE the text — only the ends."], why: "strip() trims the trailing newline but leaves the inner text untouched, so it prints \"09:00 Ravi\"." },
        { kind: "mcq", code: "row = \"09:00,Ravi,Dr Rao\".split(\",\")\nprint(row[1])", options: ["Ravi", "09:00", "Dr Rao", "Error"], answer: 0, hints: ["split(\",\") breaks the line into a list of fields at each comma.", "row[1] is the SECOND field (indexing starts at 0)."], why: "split(\",\") gives a list of fields; row[1] is the second one, \"Ravi\"." },
        { kind: "trace", code: "slots = [\"BOOKED\", \"FREE\", \"FREE\"]\nhits = 0\nfor s in slots:\n    if s == \"FREE\":\n        hits = hits + 1\nprint(hits)", expect: "2", prompt: "Trace the loop that reads the records: how many marked \"FREE\"? Type the number.", hints: ["Walk the list one item at a time, checking the condition each pass.", "Count only the ones that satisfy it."], why: "The loop counts the records marked \"FREE\", giving 2." },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should read slot lines back from day.txt — but Python crashes (the file was opened the wrong way). Click the buggy line.",
          lines: ["f = open(\"day.txt\", \"w\")", "data = f.read()", "print(data)"],
          buggyLine: 0,
          lineHints: { 1: "read() is correct — but the file was opened in a mode that forbids reading.", 2: "The print never runs; the error is above." },
          fixes: ["f = open(\"day.txt\", \"r\")", "f = open(\"day.txt\", \"w+\")", "data = f.write()"],
          fixAnswer: 0,
          fixHints: ["Mode \"w\" opens a file for WRITING only — you cannot read from it.", "To read, open it in \"r\" mode."],
          why: "Mode \"w\" is write-only (and it also erases the file); reading needs \"r\".",
        },
        {
          intro: "This should save every slot line to day.txt — but only the LAST one ends up in the file. No crash, just lost data. Click the faulty line.",
          lines: ["for r in records:", "    with open(\"day.txt\", \"w\") as f:", "        f.write(r + \"\\n\")"],
          buggyLine: 1,
          lineHints: { 0: "Looping over the records is fine.", 2: "Writing one record is fine — the problem is the mode on the line above." },
          fixes: ["    with open(\"day.txt\", \"a\") as f:", "    with open(\"day.txt\", \"r\") as f:", "    with open(\"day.txt\", \"x\") as f:"],
          fixAnswer: 0,
          fixHints: ["Opening in \"w\" ERASES the file — and it happens on every pass of the loop.", "Use \"a\" (append) so each record is added, not overwritten."],
          why: "Opening in \"w\" inside the loop erases the file each pass, leaving only the last record; \"a\" appends so all of them survive (or open the file once before the loop).",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-5 program that SAVES the records to day.txt (one per line). Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "records = [\"BOOKED\", \"FREE\", \"FREE\"]", defines: "t0", needs: [] },
        { code: "with open(\"day.txt\", \"w\") as f:", defines: "t1", needs: ["t0"] },
        { code: "    for r in records:", defines: "t2", needs: ["t1"] },
        { code: "        f.write(r + \"\\n\")", defines: "t3", needs: ["t2"] },
        { code: "print(\"saved\", len(records), \"records\")", defines: null, needs: ["t3"] }
      ],
      MSG: {
        t0: "“records = [\"BOOKED\", \"FREE\", \"FREE\"]” has to be placed before it",
        t1: "“with open(\"day.txt\", \"w\") as f:” has to be placed before it",
        t2: "“for r in records:” has to be placed before it",
        t3: "“f.write(r + \"\\n\")” has to be placed before it"
      },
      shuffled: [3, 4, 0, 1, 2],
      success: "Records built, file opened, every line written — day.txt now holds your data. ⚒️",
    },
    temper: {
      task: "The file day.txt has been written for you — one slot line per line. Open it, read the lines, and print how many records are marked \"FREE\".",
      varNote: "day.txt is seeded for you (re-run with hidden records)",
      tests: [
        { pre: "with open(\"day.txt\", \"w\") as f:\n    f.write(\"BOOKED\\n\")\n    f.write(\"FREE\\n\")\n    f.write(\"FREE\\n\")", expect: "2", label: "the seeded records" },
        { pre: "with open(\"day.txt\", \"w\") as f:\n    f.write(\"FREE\\n\")\n    f.write(\"BOOKED\\n\")\n    f.write(\"BOOKED\\n\")", expect: "1", label: "hidden: reads whatever the file holds", hidden: true }
      ],
      hints: ["Open the file, loop its lines, strip each one, and count the ones that match the condition.", "count = 0 ; for line in open(\"day.txt\"): if line.strip() == \"FREE\": count += 1 ; print(count)."],
      fbTarget: [
        { code: "count = 0", defines: "t0", needs: [] },
        { code: "with open(\"day.txt\") as f:", defines: "t1", needs: ["t0"] },
        { code: "    for line in f:", defines: "t2", needs: ["t1"] },
        { code: "        if line.strip() == \"FREE\":", defines: "t3", needs: ["t2"] },
        { code: "            count = count + 1", defines: "t4", needs: ["t3"] },
        { code: "print(count)", defines: null, needs: ["t4"] }
      ],
      fbOrder: [3, 4, 5, 0, 1, 2],
    },
  },

  {
    key: "D", icon: "🅳", title: "Health-Camp Screening Analyzer",
    blurb: "Save your screening records to a file, then read them back and tally the ones that matter — real file I/O, your project's memory.",
    spark: {
      questions: [
        { kind: "mcq", code: "line = \"Ravi 22.0\\n\"\nprint(line.strip())", options: ["Ravi 22.0", "Ravi 22.0\\n", "Ravi22.0", "Error"], answer: 0, hints: ["strip() removes whitespace (including the trailing newline) from both ends.", "It does NOT remove spaces INSIDE the text — only the ends."], why: "strip() trims the trailing newline but leaves the inner text untouched, so it prints \"Ravi 22.0\"." },
        { kind: "mcq", code: "row = \"Ravi,45,22.0\".split(\",\")\nprint(row[1])", options: ["45", "Ravi", "22.0", "Error"], answer: 0, hints: ["split(\",\") breaks the line into a list of fields at each comma.", "row[1] is the SECOND field (indexing starts at 0)."], why: "split(\",\") gives a list of fields; row[1] is the second one, \"45\"." },
        { kind: "trace", code: "bmis = [\"22.0\", \"27.5\", \"24.9\"]\nhits = 0\nfor b in bmis:\n    if float(b) < 25:\n        hits = hits + 1\nprint(hits)", expect: "2", prompt: "Trace the loop that reads the records: how many below 25 (normal BMI)? Type the number.", hints: ["Walk the list one item at a time, checking the condition each pass.", "Count only the ones that satisfy it."], why: "The loop counts the records below 25 (normal BMI), giving 2." },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should read screening records back from camp.txt — but Python crashes (the file was opened the wrong way). Click the buggy line.",
          lines: ["f = open(\"camp.txt\", \"w\")", "data = f.read()", "print(data)"],
          buggyLine: 0,
          lineHints: { 1: "read() is correct — but the file was opened in a mode that forbids reading.", 2: "The print never runs; the error is above." },
          fixes: ["f = open(\"camp.txt\", \"r\")", "f = open(\"camp.txt\", \"w+\")", "data = f.write()"],
          fixAnswer: 0,
          fixHints: ["Mode \"w\" opens a file for WRITING only — you cannot read from it.", "To read, open it in \"r\" mode."],
          why: "Mode \"w\" is write-only (and it also erases the file); reading needs \"r\".",
        },
        {
          intro: "This should save every screening record to camp.txt — but only the LAST one ends up in the file. No crash, just lost data. Click the faulty line.",
          lines: ["for r in records:", "    with open(\"camp.txt\", \"w\") as f:", "        f.write(r + \"\\n\")"],
          buggyLine: 1,
          lineHints: { 0: "Looping over the records is fine.", 2: "Writing one record is fine — the problem is the mode on the line above." },
          fixes: ["    with open(\"camp.txt\", \"a\") as f:", "    with open(\"camp.txt\", \"r\") as f:", "    with open(\"camp.txt\", \"x\") as f:"],
          fixAnswer: 0,
          fixHints: ["Opening in \"w\" ERASES the file — and it happens on every pass of the loop.", "Use \"a\" (append) so each record is added, not overwritten."],
          why: "Opening in \"w\" inside the loop erases the file each pass, leaving only the last record; \"a\" appends so all of them survive (or open the file once before the loop).",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-5 program that SAVES the records to camp.txt (one per line). Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "records = [\"22.0\", \"27.5\", \"24.9\"]", defines: "t0", needs: [] },
        { code: "with open(\"camp.txt\", \"w\") as f:", defines: "t1", needs: ["t0"] },
        { code: "    for r in records:", defines: "t2", needs: ["t1"] },
        { code: "        f.write(r + \"\\n\")", defines: "t3", needs: ["t2"] },
        { code: "print(\"saved\", len(records), \"records\")", defines: null, needs: ["t3"] }
      ],
      MSG: {
        t0: "“records = [\"22.0\", \"27.5\", \"24.9\"]” has to be placed before it",
        t1: "“with open(\"camp.txt\", \"w\") as f:” has to be placed before it",
        t2: "“for r in records:” has to be placed before it",
        t3: "“f.write(r + \"\\n\")” has to be placed before it"
      },
      shuffled: [3, 4, 0, 1, 2],
      success: "Records built, file opened, every line written — camp.txt now holds your data. ⚒️",
    },
    temper: {
      task: "The file camp.txt has been written for you — one screening record per line. Open it, read the lines, and print how many records are below 25 (normal BMI).",
      varNote: "camp.txt is seeded for you (re-run with hidden records)",
      tests: [
        { pre: "with open(\"camp.txt\", \"w\") as f:\n    f.write(\"22.0\\n\")\n    f.write(\"27.5\\n\")\n    f.write(\"24.9\\n\")", expect: "2", label: "the seeded records" },
        { pre: "with open(\"camp.txt\", \"w\") as f:\n    f.write(\"30.0\\n\")\n    f.write(\"31.0\\n\")\n    f.write(\"18.5\\n\")", expect: "1", label: "hidden: reads whatever the file holds", hidden: true }
      ],
      hints: ["Open the file, loop its lines, strip each one, and count the ones that match the condition.", "count = 0 ; for line in open(\"camp.txt\"): if float(line.strip()) < 25: count += 1 ; print(count)."],
      fbTarget: [
        { code: "count = 0", defines: "t0", needs: [] },
        { code: "with open(\"camp.txt\") as f:", defines: "t1", needs: ["t0"] },
        { code: "    for line in f:", defines: "t2", needs: ["t1"] },
        { code: "        if float(line.strip()) < 25:", defines: "t3", needs: ["t2"] },
        { code: "            count = count + 1", defines: "t4", needs: ["t3"] },
        { code: "print(count)", defines: null, needs: ["t4"] }
      ],
      fbOrder: [3, 4, 5, 0, 1, 2],
    },
  },
];

// ── Hint box: reveals one nudge at a time, never the whole answer ──
function Hints({ hints, shown, onMore }) {
  return (
    <div style={{ marginTop: 10 }}>
      {hints.slice(0, shown).map((h, i) => (
        <div key={i} style={{ background: C.yellow + "14", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "8px 12px", fontSize: 12.5, color: C.muted, lineHeight: 1.6, marginBottom: 6 }}>
          💡 Hint {i + 1}: {h}
        </div>
      ))}
      {shown < hints.length && (
        <button onClick={onMore} style={{ padding: "6px 12px", borderRadius: 7, fontSize: 12, cursor: "pointer", background: C.card, color: C.yellow, border: `1px solid ${C.yellow}55` }}>
          💡 Need a nudge? ({shown}/{hints.length} hints used)
        </button>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  STAGE 1 — SPARK: predict-the-output MCQs + one trace-the-state (typed).
// ═════════════════════════════════════════════════════════════════════
function SparkStage({ data, onPass }) {
  const questions = data.questions;
  const [solved, setSolved] = useState([]);
  const [picked, setPicked] = useState({});
  const [typed, setTyped] = useState({});
  const [typedWrong, setTypedWrong] = useState({});
  const [hintCount, setHintCount] = useState({});

  const bumpHint = (qi) =>
    setHintCount((h) => ({ ...h, [qi]: Math.min((h[qi] || 0) + 1, questions[qi].hints.length) }));

  const pick = (qi, oi) => {
    if (solved.includes(qi)) return;
    if (oi === questions[qi].answer) {
      setSolved((s) => [...s, qi]);
      setPicked((p) => ({ ...p, [qi]: null }));
    } else {
      setPicked((p) => ({ ...p, [qi]: oi }));
      bumpHint(qi);
    }
  };

  const checkTyped = (qi) => {
    if (solved.includes(qi)) return;
    if ((typed[qi] || "").trim() === questions[qi].expect) {
      setSolved((s) => [...s, qi]);
      setTypedWrong((w) => ({ ...w, [qi]: false }));
    } else {
      setTypedWrong((w) => ({ ...w, [qi]: true }));
      bumpHint(qi);
    }
  };

  const allDone = solved.length === questions.length;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Warm-up on YOUR project's objects: read each snippet <em>as Python would</em>. Two are multiple choice —
        the third has no options: trace the loop in your head and TYPE the answer. Wrong tries just light hints. ✨
      </p>

      {questions.map((q, qi) => {
        const isSolved = solved.includes(qi);
        return (
          <div key={qi} style={{ background: C.card, border: `1.5px solid ${isSolved ? C.green : C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
                CHALLENGE {qi + 1} OF {questions.length}{q.kind === "trace" ? " · TRACE THE STATE" : ""}
              </span>
              {isSolved && <span style={{ color: C.green, fontSize: 12, fontWeight: 700 }}>✓ solved</span>}
            </div>
            <pre style={{ ...mono, background: C.surface, borderRadius: 8, padding: 12, border: `1px solid ${C.border}`, marginBottom: 10 }}>{q.code}</pre>

            {q.kind === "mcq" && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {q.options.map((opt, oi) => {
                  let bg = C.surface, border = C.border, col = C.text;
                  if (isSolved && oi === q.answer) { bg = C.green + "22"; border = C.green; col = C.green; }
                  else if (picked[qi] === oi) { bg = C.red + "22"; border = C.red; col = C.red; }
                  return (
                    <button key={oi} onClick={() => pick(qi, oi)} style={{
                      padding: "8px 16px", borderRadius: 8, fontFamily: "monospace", fontSize: 13,
                      background: bg, border: `1.5px solid ${border}`, color: col,
                      cursor: isSolved ? "default" : "pointer", transition: "all 0.2s",
                    }}>{opt}</button>
                  );
                })}
              </div>
            )}

            {q.kind === "trace" && (
              <div>
                <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 8 }}>{q.prompt}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    value={typed[qi] || ""}
                    onChange={(e) => setTyped((t) => ({ ...t, [qi]: e.target.value }))}
                    onKeyDown={(e) => e.key === "Enter" && checkTyped(qi)}
                    disabled={isSolved}
                    spellCheck={false}
                    style={{
                      width: 120, padding: "8px 12px", borderRadius: 8, fontFamily: "monospace", fontSize: 14,
                      background: "#010409", color: isSolved ? C.green : C.text, outline: "none",
                      border: `1.5px solid ${isSolved ? C.green : typedWrong[qi] ? C.red : C.border}`,
                    }} />
                  {!isSolved && (
                    <button onClick={() => checkTyped(qi)} style={{
                      padding: "8px 18px", borderRadius: 8, background: C.accentGlow, border: "none",
                      color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer",
                    }}>Check</button>
                  )}
                </div>
              </div>
            )}

            {isSolved
              ? <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: C.green + "12", border: `1px solid ${C.green}44`, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>✓ {q.why}</div>
              : (hintCount[qi] || 0) > 0 && <Hints hints={q.hints} shown={hintCount[qi] || 0} onMore={() => bumpHint(qi)} />}
          </div>
        );
      })}

      {allDone && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
        }}>✨ Spark caught! Light the Flame →</button>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  STAGE 2 — FLAME: bug hunts. Click WHERE the bug is, then pick the FIX.
// ═════════════════════════════════════════════════════════════════════
function FlameStage({ data, onPass }) {
  const bugs = data.bugs;
  const [cur, setCur] = useState(0);
  const [foundLine, setFoundLine] = useState(false);
  const [wrongLine, setWrongLine] = useState(null);
  const [fixPicked, setFixPicked] = useState(null);
  const [fixedCount, setFixedCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const b = bugs[cur];
  const solvedThis = fixPicked === b.fixAnswer;

  const clickLine = (i) => {
    if (foundLine) return;
    if (i === b.buggyLine) { setFoundLine(true); setWrongLine(null); }
    else setWrongLine(i);
  };
  const pickFix = (i) => {
    if (solvedThis) return;
    setFixPicked(i);
    if (i !== b.fixAnswer) setHintCount((h) => Math.min(h + 1, b.fixHints.length));
  };
  const nextBug = () => {
    setFixedCount((n) => n + 1);
    if (cur < bugs.length - 1) {
      setCur(cur + 1); setFoundLine(false); setWrongLine(null); setFixPicked(null); setHintCount(0);
    }
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Real debugging, two rounds: first find WHERE the bug lives, then choose HOW to fix it. One bug crashes —
        the other is sneakier: it runs fine and lies to you. Bug {Math.min(fixedCount + 1, bugs.length)} of {bugs.length}. 🔥
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ color: C.orange, fontSize: 12, fontWeight: 600, marginBottom: 10, lineHeight: 1.6 }}>{b.intro}</div>
        <div style={{ background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, padding: 8 }}>
          {b.lines.map((l, i) => {
            let border = "transparent", bg = "transparent";
            if (foundLine && i === b.buggyLine) { border = C.green; bg = C.green + "18"; }
            else if (wrongLine === i) { border = C.red; bg = C.red + "12"; }
            return (
              <div key={i} onClick={() => clickLine(i)} style={{
                fontFamily: "monospace", fontSize: 12.5, lineHeight: 2, padding: "2px 10px",
                borderRadius: 6, cursor: foundLine ? "default" : "pointer",
                borderLeft: `3px solid ${border}`, background: bg, color: C.text, whiteSpace: "pre",
              }}>{i + 1}  {l}</div>
            );
          })}
        </div>
        {wrongLine !== null && !foundLine && (
          <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: C.yellow + "14", border: `1px solid ${C.yellow}44`, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>
            💡 {b.lineHints[wrongLine]}
          </div>
        )}

        {foundLine && (
          <div style={{ marginTop: 14 }}>
            <div style={{ color: C.green, fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>✓ Bug located! Now pick the fix:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {b.fixes.map((f, i) => {
                let bg = C.surface, border = C.border, col = C.text;
                if (solvedThis && i === b.fixAnswer) { bg = C.green + "22"; border = C.green; col = C.green; }
                else if (fixPicked === i && i !== b.fixAnswer) { bg = C.red + "22"; border = C.red; col = C.red; }
                return (
                  <button key={i} onClick={() => pickFix(i)} style={{
                    textAlign: "left", padding: "9px 14px", borderRadius: 8, fontFamily: "monospace", fontSize: 12.5,
                    background: bg, border: `1.5px solid ${border}`, color: col,
                    cursor: solvedThis ? "default" : "pointer",
                  }}>{f}</button>
                );
              })}
            </div>
            {!solvedThis && hintCount > 0 && (
              <Hints hints={b.fixHints} shown={hintCount} onMore={() => setHintCount((h) => Math.min(h + 1, b.fixHints.length))} />
            )}
            {solvedThis && (
              <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 8, background: C.green + "12", border: `1px solid ${C.green}44`, fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>✓ {b.why}</div>
            )}
          </div>
        )}
      </div>

      {solvedThis && cur < bugs.length - 1 && (
        <button onClick={nextBug} style={{
          padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none",
          color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>Next bug →</button>
      )}
      {solvedThis && cur === bugs.length - 1 && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
        }}>🔥 Bugs extinguished! To the Forge →</button>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  STAGE 3 — FORGE: a Parsons problem. Reorder the scrambled lines of the
//  track's Experiment-3 class. `needs`/`defines` tokens model both data
//  dependencies AND block structure, so the checker explains misplacements.
// ═════════════════════════════════════════════════════════════════════
function ForgeStage({ data, onPass }) {
  const { target, MSG, intro, success } = data;
  const [order, setOrder] = useState(data.shuffled);
  const [verdict, setVerdict] = useState(null);
  const [solved, setSolved] = useState(false);

  const move = (idx, dir) => {
    if (solved) return;
    const j = idx + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[idx], next[j]] = [next[j], next[idx]];
    setOrder(next); setVerdict(null);
  };

  const check = () => {
    const defined = new Set();
    for (const li of order) {
      const line = target[li];
      const missing = line.needs.find((n) => !defined.has(n));
      if (missing) {
        setVerdict({ ok: false, msg: `“${line.code.trim()}” can't go there — ${MSG[missing]}.` });
        return;
      }
      if (line.defines) defined.add(line.defines);
    }
    setVerdict({ ok: true, msg: success });
    setSolved(true);
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        {intro} Indented lines belong to the block above them, so structure matters as much as order. ⚒️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
        {order.map((li, idx) => (
          <div key={li} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "4px 6px", borderRadius: 8,
            background: solved ? C.green + "10" : C.surface, border: `1px solid ${solved ? C.green + "55" : C.border}`, marginBottom: 6,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <button onClick={() => move(idx, -1)} disabled={solved || idx === 0} style={{
                border: "none", background: "transparent", color: idx === 0 ? C.border : C.orange,
                cursor: idx === 0 || solved ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: 2,
              }}>▲</button>
              <button onClick={() => move(idx, 1)} disabled={solved || idx === order.length - 1} style={{
                border: "none", background: "transparent", color: idx === order.length - 1 ? C.border : C.orange,
                cursor: idx === order.length - 1 || solved ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: 2,
              }}>▼</button>
            </div>
            <pre style={{ ...mono, fontSize: 12.5 }}>{target[li].code}</pre>
          </div>
        ))}
      </div>

      {!solved && (
        <button onClick={check} style={{
          padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none",
          color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
        }}>⚒️ Strike! (check my order)</button>
      )}

      {verdict && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 12.5, lineHeight: 1.6, background: verdict.ok ? C.green + "14" : C.yellow + "14", border: `1px solid ${verdict.ok ? C.green : C.yellow}44`, color: verdict.ok ? C.green : C.muted }}>
          {verdict.ok ? "✓ " : "💡 "}{verdict.msg}
        </div>
      )}

      {solved && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12,
        }}>⚒️ Forged! Now temper the blade →</button>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  STAGE 4 — TEMPER: write real Python (the Exp-4 subclass), run via
//  Pyodide against visible + hidden tests. A Parsons fallback covers the
//  case where Pyodide can't load.
// ═════════════════════════════════════════════════════════════════════
function TemperStage({ data, onPass }) {
  const TESTS = data.tests;
  const hints = data.hints;
  const [code, setCode] = useState("# your code here\n");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const pyRef = useRef(null);

  // Share ONE Pyodide instance across the whole lab (same key the LAB units use).
  async function getPyodide() {
    if (pyRef.current) return pyRef.current;
    if (window.__lab_pyodide) { pyRef.current = window.__lab_pyodide; return pyRef.current; }
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    const py = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
    window.__lab_pyodide = py; pyRef.current = py;
    return py;
  }

  async function run() {
    setStatus("loading");
    setMessage("Heating the forge… (first run downloads real Python, ~6 MB — be patient!)");
    let py;
    try { py = await getPyodide(); }
    catch {
      setStatus("fallback");
      setMessage("Couldn't load the Python engine (slow connection?). No problem — pass the fallback puzzle below instead.");
      return;
    }
    setStatus("running"); setMessage("Running your code against the tests…");
    // The hidden tests supply the input variables themselves (different values each
    // run). If the learner re-declares one, their line runs after ours and clobbers
    // it — so guard against it.
    const injectedVars = ((TESTS[0] && TESTS[0].pre) || "")
      .match(/^\s*(\w+)\s*=(?!=)/gm)?.map((s) => s.match(/^\s*(\w+)/)[1]) || [];
    const clobbered = injectedVars.find((v) => new RegExp(`(^|\\n)\\s*${v}\\s*=(?!=)`).test(code));
    if (clobbered) {
      setStatus("failed");
      setMessage(`Remove the line that sets  ${clobbered} = ...  from your code.\nThat value is provided automatically and changes on each hidden test — if you redefine it, your code always runs on the same data.`);
      return;
    }
    try {
      for (const t of TESTS) {
        py.runPython("import sys, io\nsys.stdout = io.StringIO()");
        try {
          py.runPython(t.pre + "\n" + code);
        } catch (e) {
          const lines = String(e.message || e).trim().split("\n");
          setStatus("error");
          setMessage("Python error:\n" + lines[lines.length - 1]);
          return;
        }
        const out = py.runPython("sys.stdout.getvalue()");
        if (String(out).trim() !== t.expect.trim()) {
          setStatus("failed");
          setMessage(`Test "${t.label}" — expected exactly:\n${t.expect}\nyour output:\n${String(out).trim() || "(nothing printed)"}`);
          setHintCount((h) => Math.min(h + 1, hints.length));
          return;
        }
      }
      setStatus("passed");
      setMessage("All tests passed — including the hidden ones. Your project reads its own records back for real.");
    } catch (e) {
      setStatus("error"); setMessage("Unexpected error: " + String(e));
    }
  }

  // Fallback Parsons puzzle (used only if Pyodide can't load).
  const fbTarget = data.fbTarget;
  const [fbOrder, setFbOrder] = useState(data.fbOrder);
  const [fbSolved, setFbSolved] = useState(false);
  const fbMove = (idx, dir) => {
    const j = idx + dir;
    if (j < 0 || j >= fbOrder.length || fbSolved) return;
    const next = [...fbOrder];
    [next[idx], next[j]] = [next[j], next[idx]];
    setFbOrder(next);
  };
  const fbCheck = () => {
    const defined = new Set();
    for (const li of fbOrder) {
      if (fbTarget[li].needs.find((n) => !defined.has(n))) return;
      if (fbTarget[li].defines) defined.add(fbTarget[li].defines);
    }
    setFbSolved(true);
  };

  const passed = status === "passed" || fbSolved;

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The final tempering: no options, no scaffolding — <strong style={{ color: C.text }}>write real Python</strong>,
        and it runs, for real, right here. This is the storage heart of your mini-project. 🗡️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.orange}55`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>📜 YOUR TASK</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{data.task}</div>
        <div style={{ fontSize: 11.5, color: C.teal, marginTop: 8, fontFamily: "monospace" }}>Given: {data.varNote}</div>
      </div>

      {status !== "fallback" && (
        <>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} rows={10} style={{
            width: "100%", boxSizing: "border-box", background: "#010409", color: C.text,
            border: `1.5px solid ${C.border}`, borderRadius: 10, padding: 12,
            fontFamily: "monospace", fontSize: 13.5, lineHeight: 1.7, outline: "none", resize: "vertical",
          }} />
          <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
            <button onClick={run} disabled={status === "loading" || status === "running"} style={{
              padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 14,
              background: status === "loading" || status === "running" ? C.card : C.green,
              color: status === "loading" || status === "running" ? C.muted : "#0D1117",
              cursor: status === "loading" || status === "running" ? "default" : "pointer",
            }}>{status === "loading" || status === "running" ? "⏳ Working…" : "▶ Run the tests"}</button>
            {status === "passed" && <span style={{ color: C.green, fontWeight: 700, fontSize: 13 }}>✓ {TESTS.length}/{TESTS.length} tests passed</span>}
          </div>
        </>
      )}

      {message && (
        <pre style={{
          ...mono, marginTop: 12, padding: "10px 14px", borderRadius: 8, fontSize: 12.5,
          background: status === "passed" ? C.green + "14" : status === "failed" || status === "error" ? C.red + "10" : C.card,
          border: `1px solid ${status === "passed" ? C.green : status === "failed" || status === "error" ? C.red + "66" : C.border}`,
          color: status === "passed" ? C.green : C.muted,
        }}>{message}</pre>
      )}

      {(status === "failed" || status === "error") && hintCount > 0 && (
        <Hints hints={hints} shown={hintCount} onMore={() => setHintCount((h) => Math.min(h + 1, hints.length))} />
      )}

      {status === "fallback" && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginTop: 4 }}>
          {fbOrder.map((li, idx) => (
            <div key={li} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 6px", borderRadius: 8, background: C.surface, border: `1px solid ${fbSolved ? C.green + "55" : C.border}`, marginBottom: 6 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <button onClick={() => fbMove(idx, -1)} style={{ border: "none", background: "transparent", color: C.orange, cursor: "pointer", fontSize: 12, padding: 2 }}>▲</button>
                <button onClick={() => fbMove(idx, 1)} style={{ border: "none", background: "transparent", color: C.orange, cursor: "pointer", fontSize: 12, padding: 2 }}>▼</button>
              </div>
              <pre style={{ ...mono, fontSize: 12.5 }}>{fbTarget[li].code}</pre>
            </div>
          ))}
          {!fbSolved && <button onClick={fbCheck} style={{ padding: "8px 18px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Check order</button>}
          {fbSolved && <div style={{ color: C.green, fontWeight: 700, fontSize: 13, marginTop: 6 }}>✓ Correct order — tempered the old-fashioned way!</div>}
        </div>
      )}

      {passed && (
        <button onClick={onPass} style={{
          width: "100%", padding: 14, borderRadius: 10, background: C.orange, border: "none",
          color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 12,
        }}>🗡️ Tempered! Finish this track →</button>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  TRACK RUNNER — the gated 4-stage arc for ONE chosen track. Persists
//  each stage as "UnitLAB6_5@<key>_<stageId>"; when all four are done it
//  shows the completion panel (which claims the whole checkpoint).
// ═════════════════════════════════════════════════════════════════════
function TrackRunner({ track, challengeProgress, onStageComplete, claimed, onClaim, onBack }) {
  const persisted = STAGE_DEFS.filter((s) => challengeProgress.includes(`${UNIT_ID}@${track.key}_${s.id}`)).map((s) => s.id);
  const [doneStages, setDoneStages] = useState(persisted);
  const [active, setActive] = useState(() => {
    const firstOpen = STAGE_DEFS.findIndex((s) => !persisted.includes(s.id));
    return firstOpen === -1 ? STAGE_DEFS.length : firstOpen;
  });

  const isUnlocked = (idx) => idx === 0 || doneStages.includes(STAGE_DEFS[idx - 1].id);

  const passStage = (idx) => {
    const stage = STAGE_DEFS[idx];
    if (!doneStages.includes(stage.id)) {
      setDoneStages((p) => [...p, stage.id]);
      onStageComplete && onStageComplete(`${UNIT_ID}@${track.key}_${stage.id}`);
    }
    setActive(idx + 1);
  };

  const renderStage = (idx) => {
    const s = STAGE_DEFS[idx];
    if (s.id === "spark") return <SparkStage key={s.id} data={track.spark} onPass={() => passStage(idx)} />;
    if (s.id === "flame") return <FlameStage key={s.id} data={track.flame} onPass={() => passStage(idx)} />;
    if (s.id === "forge") return <ForgeStage key={s.id} data={track.forge} onPass={() => passStage(idx)} />;
    return <TemperStage key={s.id} data={track.temper} onPass={() => passStage(idx)} />;
  };

  return (
    <div>
      <button onClick={onBack} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", marginBottom: 14 }}>
        ← choose another track
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ fontSize: 26 }}>{track.icon}</div>
        <div>
          <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>YOUR TRACK</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{track.title}</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{doneStages.length} / {STAGE_DEFS.length} stages</div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 22, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
        {STAGE_DEFS.map((s, i) => {
          const done = doneStages.includes(s.id);
          const unlocked = isUnlocked(i);
          const isActive = active === i;
          return (
            <button key={s.id} onClick={() => unlocked && setActive(i)} disabled={!unlocked} style={{
              flex: 1, minWidth: 100, padding: "10px 6px", borderRadius: 7,
              background: isActive ? `linear-gradient(135deg, ${C.orange}, ${C.red})` : "transparent",
              border: "none", color: isActive ? "#0D1117" : unlocked ? C.text : C.muted,
              cursor: unlocked ? "pointer" : "not-allowed", fontSize: 12,
              fontWeight: isActive ? 800 : 500, opacity: unlocked ? 1 : 0.5,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2, transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 15 }}>{done ? "✅" : unlocked ? s.icon : "🔒"}</span>
              <span>{s.label}</span>
              <span style={{ fontSize: 9.5, opacity: 0.8 }}>{s.tag}</span>
            </button>
          );
        })}
      </div>

      <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
        {active >= STAGE_DEFS.length
          ? <TrackDonePanel track={track} claimed={claimed} onClaim={onClaim} />
          : isUnlocked(active)
            ? renderStage(active)
            : <div style={{ textAlign: "center", color: C.muted, padding: 40 }}>🔒 Locked — pass the previous stage first.</div>}
      </div>
    </div>
  );
}

// ── Completion panel for a finished track. Claiming records the whole
//    checkpoint (onUnitComplete), so it must be SEEN and clicked. ──
function TrackDonePanel({ track, claimed, onClaim }) {
  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <div style={{ fontSize: 60 }}>🔥</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: C.orange, marginTop: 8 }}>TRACK CRACKED</div>
      <div style={{ fontSize: 16, color: C.text, fontWeight: 700, marginTop: 4 }}>{track.icon} {track.title}</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 500, margin: "10px auto 0" }}>
        Predicted file output, hunted I/O bugs, rebuilt your save-to-file program, and wrote the real
        read-and-count code — all four stages, on YOUR chosen track. Experiments 5 & 6 aren't just learned;
        your project's data now lives on disk and can be read back.
      </div>
      <div style={{ marginTop: 20, padding: 18, borderRadius: 12, display: "inline-block", background: `linear-gradient(135deg, ${C.orange}22, ${C.red}22)`, border: `1px solid ${C.orange}66` }}>
        <div style={{ fontSize: 30 }}>🏅</div>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginTop: 6 }}>Mini-Project Checkpoint · Exp 5 & 6</div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Spark ✓ · Flame ✓ · Forge ✓ · Temper ✓</div>
      </div>
      {!claimed ? (
        <div style={{ marginTop: 20 }}>
          <button onClick={onClaim} style={{
            padding: "12px 28px", borderRadius: 10, border: "none",
            background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
            color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
          }}>🏅 Submit checkpoint to my record</button>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 10 }}>You can still return and try the other tracks afterwards — they're optional.</div>
        </div>
      ) : (
        <div style={{ marginTop: 18, color: C.green, fontWeight: 700, fontSize: 14 }}>✓ Checkpoint recorded. Explore the other tracks any time, or close this.</div>
      )}
    </div>
  );
}

// ── Track chooser — the entry screen. ──
function TrackChooser({ challengeProgress, onPick }) {
  const trackDone = (t) => STAGE_DEFS.every((s) => challengeProgress.includes(`${UNIT_ID}@${t.key}_${s.id}`));
  return (
    <div>
      <div style={{ background: C.orange + "10", border: `1px solid ${C.orange}33`, borderRadius: 10, padding: "12px 16px", marginBottom: 18, fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
        ⚔️ <strong style={{ color: C.orange }}>Same track, next forging.</strong> This checkpoint proves Experiments 5 & 6 —
        reading and writing text files, and CSV records — entirely through your mini-project. Stay on the track you
        chose in week 1: crack it to complete the checkpoint. The others are always here if you want them later.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {TRACKS.map((t) => {
          const done = trackDone(t);
          return (
            <button key={t.key} onClick={() => onPick(t.key)} style={{
              textAlign: "left", background: C.surface, border: `1.5px solid ${done ? C.green : C.border}`,
              borderRadius: 12, padding: 16, cursor: "pointer", color: C.text, transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 24 }}>{t.icon}</span>
                <span style={{ fontWeight: 800, fontSize: 14 }}>{t.title}</span>
                {done && <span style={{ marginLeft: "auto", color: C.green, fontSize: 12, fontWeight: 700 }}>✓ done</span>}
              </div>
              <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6, marginTop: 8 }}>{t.blurb}</div>
              <div style={{ marginTop: 10, color: C.orange, fontSize: 11.5, fontWeight: 700 }}>
                {done ? "Revisit this track →" : "Start this track →"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  MAIN — track chooser ⇄ track runner.
// ═════════════════════════════════════════════════════════════════════
export default function UnitLAB6_5({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
  const [selected, setSelected] = useState(null);
  const [claimed, setClaimed] = useState(challengeProgress.includes(UNIT_ID));

  const claimCheckpoint = () => {
    setClaimed(true);
    onUnitComplete && onUnitComplete();
  };

  const track = TRACKS.find((t) => t.key === selected);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.orange}44`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.orange}, ${C.red})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔥</div>
        <div>
          <div style={{ fontSize: 12, color: C.orange, letterSpacing: 1, fontWeight: 700 }}>PYTHON LAB › CHECKPOINT · EXP 5 & 6</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Mini-Project Crucible — Files & Records</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: claimed ? C.green : C.muted }}>{claimed ? "✓ recorded" : "optional"}</div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>
        {track
          ? <TrackRunner
              track={track}
              challengeProgress={challengeProgress}
              onStageComplete={onStageComplete}
              claimed={claimed}
              onClaim={claimCheckpoint}
              onBack={() => setSelected(null)}
            />
          : <TrackChooser challengeProgress={challengeProgress} onPick={setSelected} />}
      </div>
    </div>
  );
}
