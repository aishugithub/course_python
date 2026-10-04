// UnitLAB10_5 — 🔥 Checkpoint: Mini-Project Crucible (Experiments 9 & 10)
// ─────────────────────────────────────────────────────────────────────
// A gated, CRUCIBLE-STYLE assessment (same Spark → Flame → Forge → Temper
// arc as UnitLAB2_5), restructured around the lab manual's FOUR
// mini-project tracks. It tests the two paired experiments (
// encapsulation) and Experiment 4 (inheritance & polymorphism) ENTIRELY
// through the student's chosen project — every stage is real data analysis.
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
//                          (e.g. "UnitLAB10_5@A_spark") to the Events/Progress
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
// this one forges the ANALYSIS half of each track: filtering records and
// summarising them (Exp 9) ready to turn into a chart (Exp 10). The data is
// analysed in plain Python so it runs reliably in the browser.
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

const UNIT_ID = "UnitLAB10_5";
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
//  All code is drawn from Experiments 9 & 10 applied to THAT track.
//  Every program here was verified in real CPython (visible + hidden).
// ═════════════════════════════════════════════════════════════════════
const TRACKS = [
  {
    key: "A", icon: "🅰", title: "Patient Vitals Monitor",
    blurb: "Filter and summarise a list of temperature (°F) values — count what matters and average the rest. The analysis core behind every pandas table and chart.",
    spark: {
      questions: [
        { kind: "mcq", code: "temps = [98.6, 101.2, 99.5, 97.9]\nprint(len([x for x in temps if x >= 100.4]))", options: ["1", "4", "0", "Error"], answer: 0, hints: ["The comprehension keeps only the values that pass the condition.", "len(...) then counts how many were kept."], why: "The comprehension filters the readings, and len() counts those with a fever (≥ 100.4), giving 1." },
        { kind: "mcq", code: "vals = [10, 20, 30]\nprint(sum(vals) / len(vals))", options: ["20.0", "60", "20", "Error"], answer: 0, hints: ["The mean is the total divided by the count.", "sum(vals) / len(vals); division always yields a float."], why: "sum(vals) is 60 and len(vals) is 3, so the mean is 20.0." },
        { kind: "trace", code: "temps = [100.5, 101.0, 99.0]\nhits = 0\nfor x in temps:\n    if x >= 100.4:\n        hits = hits + 1\nprint(hits)", expect: "2", prompt: "Trace the filter loop: how many readings are with a fever (≥ 100.4)? Type the number.", hints: ["Check each reading against the threshold.", "Count only the ones that pass."], why: "The loop counts readings with a fever (≥ 100.4), giving 2." },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should print the mean temperature (°F) — but a plain list has no such method, so Python crashes (AttributeError). Click the buggy line.",
          lines: ["data = [98.6, 101.2, 99.5, 97.9]", "print(data.mean())"],
          buggyLine: 1,
          lineHints: { 0: "Building the list is fine." },
          fixes: ["print(sum(data) / len(data))", "print(sum(data) / data.count())", "print(mean(data))"],
          fixAnswer: 0,
          fixHints: ["A plain Python list has no .mean() method — that's a pandas Series/DataFrame feature.", "Compute the mean yourself with sum(data) / len(data)."],
          why: "A plain list has no .mean(); compute it with sum(data) / len(data) (or load the data into a pandas DataFrame first).",
        },
        {
          intro: "This should print the average temperature (°F) — it runs fine but the number is too BIG. Click the faulty line.",
          lines: ["vals = [98.0, 99.0, 100.0]", "avg = sum(vals) / (len(vals) - 1)", "print(avg)"],
          buggyLine: 1,
          lineHints: { 0: "Building the list is fine.", 2: "print just shows whatever avg holds." },
          fixes: ["avg = sum(vals) / len(vals)", "avg = sum(vals) / (len(vals) + 1)", "avg = sum(vals) // len(vals)"],
          fixAnswer: 0,
          fixHints: ["The mean divides by the FULL count of values, not one less.", "len(vals) - 1 divides by too few, inflating the average."],
          why: "Dividing by len(vals) - 1 uses too small a denominator and overstates the mean; divide by the full len(vals).",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-9 analysis: count the readings with a fever (≥ 100.4) and print the mean of ALL the readings. Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "temps = [98.6, 101.2, 99.5, 97.9]", defines: "t0", needs: [] },
        { code: "hits = [x for x in temps if x >= 100.4]", defines: "t1", needs: ["t0"] },
        { code: "print(\"count:\", len(hits))", defines: "t2", needs: ["t1"] },
        { code: "print(\"mean:\", round(sum(temps) / len(temps), 1))", defines: null, needs: ["t2"] }
      ],
      MSG: {
        t0: "“temps = [98.6, 101.2, 99.5, 97.9]” has to be placed before it",
        t1: "“hits = [x for x in temps if x >= 100.4]” has to be placed before it",
        t2: "“print(\"count:\", len(hits))” has to be placed before it"
      },
      shuffled: [2, 3, 0, 1],
      success: "Filter, count, average — the analysis reads cleanly from top to bottom. ⚒️",
    },
    temper: {
      task: "A list \"readings\" of temperature (°F) values is pre-set. Print TWO lines: first how many readings are with a fever (≥ 100.4), then the average of ALL readings rounded to 1 decimal place.",
      varNote: "readings = [98.6, 101.2, 99.5, 97.9] (re-run with hidden readings)",
      tests: [
        { pre: "readings = [98.6, 101.2, 99.5, 97.9]", expect: "1\n99.3", label: "count then mean" },
        { pre: "readings = [100.5, 101.0, 99.0]", expect: "2\n100.2", label: "hidden: different readings", hidden: true }
      ],
      hints: ["Loop (or comprehend) to count the ones past the threshold; the mean is sum(readings) / len(readings).", "count = len([x for x in readings if x >= 100.4]) ; then print(count) and print(round(sum(readings)/len(readings), 1))."],
      fbTarget: [
        { code: "data = readings", defines: "t0", needs: [] },
        { code: "count = 0", defines: "t1", needs: ["t0"] },
        { code: "for x in data:", defines: "t2", needs: ["t1"] },
        { code: "    if x >= 100.4:", defines: "t3", needs: ["t2"] },
        { code: "        count = count + 1", defines: "t4", needs: ["t3"] },
        { code: "avg = round(sum(data) / len(data), 1)", defines: "t5", needs: ["t4"] },
        { code: "print(count)", defines: "t6", needs: ["t5"] },
        { code: "print(avg)", defines: null, needs: ["t6"] }
      ],
      fbOrder: [3, 4, 5, 6, 7, 0, 1, 2],
    },
  },

  {
    key: "B", icon: "🅱", title: "Pharmacy Stock Manager",
    blurb: "Filter and summarise a list of stock quantity values — count what matters and average the rest. The analysis core behind every pandas table and chart.",
    spark: {
      questions: [
        { kind: "mcq", code: "qtys = [12, 5, 20, 3]\nprint(len([x for x in qtys if x < 10]))", options: ["2", "4", "0", "Error"], answer: 0, hints: ["The comprehension keeps only the values that pass the condition.", "len(...) then counts how many were kept."], why: "The comprehension filters the readings, and len() counts those below the reorder level (< 10), giving 2." },
        { kind: "mcq", code: "vals = [4, 8, 12]\nprint(sum(vals) / len(vals))", options: ["8.0", "24", "8", "Error"], answer: 0, hints: ["The mean is the total divided by the count.", "sum(vals) / len(vals); division always yields a float."], why: "sum(vals) is 24 and len(vals) is 3, so the mean is 8.0." },
        { kind: "trace", code: "qtys = [12, 5, 20]\nhits = 0\nfor x in qtys:\n    if x < 10:\n        hits = hits + 1\nprint(hits)", expect: "1", prompt: "Trace the filter loop: how many readings are below the reorder level (< 10)? Type the number.", hints: ["Check each reading against the threshold.", "Count only the ones that pass."], why: "The loop counts readings below the reorder level (< 10), giving 1." },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should print the mean stock quantity — but a plain list has no such method, so Python crashes (AttributeError). Click the buggy line.",
          lines: ["data = [12, 5, 20, 3]", "print(data.mean())"],
          buggyLine: 1,
          lineHints: { 0: "Building the list is fine." },
          fixes: ["print(sum(data) / len(data))", "print(sum(data) / data.count())", "print(mean(data))"],
          fixAnswer: 0,
          fixHints: ["A plain Python list has no .mean() method — that's a pandas Series/DataFrame feature.", "Compute the mean yourself with sum(data) / len(data)."],
          why: "A plain list has no .mean(); compute it with sum(data) / len(data) (or load the data into a pandas DataFrame first).",
        },
        {
          intro: "This should print the average stock quantity — it runs fine but the number is too BIG. Click the faulty line.",
          lines: ["vals = [4, 8, 12]", "avg = sum(vals) / (len(vals) - 1)", "print(avg)"],
          buggyLine: 1,
          lineHints: { 0: "Building the list is fine.", 2: "print just shows whatever avg holds." },
          fixes: ["avg = sum(vals) / len(vals)", "avg = sum(vals) / (len(vals) + 1)", "avg = sum(vals) // len(vals)"],
          fixAnswer: 0,
          fixHints: ["The mean divides by the FULL count of values, not one less.", "len(vals) - 1 divides by too few, inflating the average."],
          why: "Dividing by len(vals) - 1 uses too small a denominator and overstates the mean; divide by the full len(vals).",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-9 analysis: count the readings below the reorder level (< 10) and print the mean of ALL the readings. Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "qtys = [12, 5, 20, 3]", defines: "t0", needs: [] },
        { code: "hits = [x for x in qtys if x < 10]", defines: "t1", needs: ["t0"] },
        { code: "print(\"count:\", len(hits))", defines: "t2", needs: ["t1"] },
        { code: "print(\"mean:\", round(sum(qtys) / len(qtys), 1))", defines: null, needs: ["t2"] }
      ],
      MSG: {
        t0: "“qtys = [12, 5, 20, 3]” has to be placed before it",
        t1: "“hits = [x for x in qtys if x < 10]” has to be placed before it",
        t2: "“print(\"count:\", len(hits))” has to be placed before it"
      },
      shuffled: [2, 3, 0, 1],
      success: "Filter, count, average — the analysis reads cleanly from top to bottom. ⚒️",
    },
    temper: {
      task: "A list \"readings\" of stock quantity values is pre-set. Print TWO lines: first how many readings are below the reorder level (< 10), then the average of ALL readings rounded to 1 decimal place.",
      varNote: "readings = [12, 5, 20, 3] (re-run with hidden readings)",
      tests: [
        { pre: "readings = [12, 5, 20, 3]", expect: "2\n10.0", label: "count then mean" },
        { pre: "readings = [50, 40, 8]", expect: "1\n32.7", label: "hidden: different readings", hidden: true }
      ],
      hints: ["Loop (or comprehend) to count the ones past the threshold; the mean is sum(readings) / len(readings).", "count = len([x for x in readings if x < 10]) ; then print(count) and print(round(sum(readings)/len(readings), 1))."],
      fbTarget: [
        { code: "data = readings", defines: "t0", needs: [] },
        { code: "count = 0", defines: "t1", needs: ["t0"] },
        { code: "for x in data:", defines: "t2", needs: ["t1"] },
        { code: "    if x < 10:", defines: "t3", needs: ["t2"] },
        { code: "        count = count + 1", defines: "t4", needs: ["t3"] },
        { code: "avg = round(sum(data) / len(data), 1)", defines: "t5", needs: ["t4"] },
        { code: "print(count)", defines: "t6", needs: ["t5"] },
        { code: "print(avg)", defines: null, needs: ["t6"] }
      ],
      fbOrder: [3, 4, 5, 6, 7, 0, 1, 2],
    },
  },

  {
    key: "C", icon: "🅲", title: "Clinic Appointment Book",
    blurb: "Filter and summarise a list of patient wait (min) values — count what matters and average the rest. The analysis core behind every pandas table and chart.",
    spark: {
      questions: [
        { kind: "mcq", code: "waits = [10, 35, 40, 5]\nprint(len([x for x in waits if x >= 30]))", options: ["2", "4", "0", "Error"], answer: 0, hints: ["The comprehension keeps only the values that pass the condition.", "len(...) then counts how many were kept."], why: "The comprehension filters the readings, and len() counts those over the 30-minute target (≥ 30), giving 2." },
        { kind: "mcq", code: "vals = [10, 20, 30]\nprint(sum(vals) / len(vals))", options: ["20.0", "60", "20", "Error"], answer: 0, hints: ["The mean is the total divided by the count.", "sum(vals) / len(vals); division always yields a float."], why: "sum(vals) is 60 and len(vals) is 3, so the mean is 20.0." },
        { kind: "trace", code: "waits = [10, 35, 40]\nhits = 0\nfor x in waits:\n    if x >= 30:\n        hits = hits + 1\nprint(hits)", expect: "2", prompt: "Trace the filter loop: how many readings are over the 30-minute target (≥ 30)? Type the number.", hints: ["Check each reading against the threshold.", "Count only the ones that pass."], why: "The loop counts readings over the 30-minute target (≥ 30), giving 2." },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should print the mean patient wait (min) — but a plain list has no such method, so Python crashes (AttributeError). Click the buggy line.",
          lines: ["data = [10, 35, 40, 5]", "print(data.mean())"],
          buggyLine: 1,
          lineHints: { 0: "Building the list is fine." },
          fixes: ["print(sum(data) / len(data))", "print(sum(data) / data.count())", "print(mean(data))"],
          fixAnswer: 0,
          fixHints: ["A plain Python list has no .mean() method — that's a pandas Series/DataFrame feature.", "Compute the mean yourself with sum(data) / len(data)."],
          why: "A plain list has no .mean(); compute it with sum(data) / len(data) (or load the data into a pandas DataFrame first).",
        },
        {
          intro: "This should print the average patient wait (min) — it runs fine but the number is too BIG. Click the faulty line.",
          lines: ["vals = [10, 35, 40, 5]", "avg = sum(vals) / (len(vals) - 1)", "print(avg)"],
          buggyLine: 1,
          lineHints: { 0: "Building the list is fine.", 2: "print just shows whatever avg holds." },
          fixes: ["avg = sum(vals) / len(vals)", "avg = sum(vals) / (len(vals) + 1)", "avg = sum(vals) // len(vals)"],
          fixAnswer: 0,
          fixHints: ["The mean divides by the FULL count of values, not one less.", "len(vals) - 1 divides by too few, inflating the average."],
          why: "Dividing by len(vals) - 1 uses too small a denominator and overstates the mean; divide by the full len(vals).",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-9 analysis: count the readings over the 30-minute target (≥ 30) and print the mean of ALL the readings. Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "waits = [10, 35, 40, 5]", defines: "t0", needs: [] },
        { code: "hits = [x for x in waits if x >= 30]", defines: "t1", needs: ["t0"] },
        { code: "print(\"count:\", len(hits))", defines: "t2", needs: ["t1"] },
        { code: "print(\"mean:\", round(sum(waits) / len(waits), 1))", defines: null, needs: ["t2"] }
      ],
      MSG: {
        t0: "“waits = [10, 35, 40, 5]” has to be placed before it",
        t1: "“hits = [x for x in waits if x >= 30]” has to be placed before it",
        t2: "“print(\"count:\", len(hits))” has to be placed before it"
      },
      shuffled: [2, 3, 0, 1],
      success: "Filter, count, average — the analysis reads cleanly from top to bottom. ⚒️",
    },
    temper: {
      task: "A list \"readings\" of patient wait (min) values is pre-set. Print TWO lines: first how many readings are over the 30-minute target (≥ 30), then the average of ALL readings rounded to 1 decimal place.",
      varNote: "readings = [10, 35, 40, 5] (re-run with hidden readings)",
      tests: [
        { pre: "readings = [10, 35, 40, 5]", expect: "2\n22.5", label: "count then mean" },
        { pre: "readings = [45, 50, 20]", expect: "2\n38.3", label: "hidden: different readings", hidden: true }
      ],
      hints: ["Loop (or comprehend) to count the ones past the threshold; the mean is sum(readings) / len(readings).", "count = len([x for x in readings if x >= 30]) ; then print(count) and print(round(sum(readings)/len(readings), 1))."],
      fbTarget: [
        { code: "data = readings", defines: "t0", needs: [] },
        { code: "count = 0", defines: "t1", needs: ["t0"] },
        { code: "for x in data:", defines: "t2", needs: ["t1"] },
        { code: "    if x >= 30:", defines: "t3", needs: ["t2"] },
        { code: "        count = count + 1", defines: "t4", needs: ["t3"] },
        { code: "avg = round(sum(data) / len(data), 1)", defines: "t5", needs: ["t4"] },
        { code: "print(count)", defines: "t6", needs: ["t5"] },
        { code: "print(avg)", defines: null, needs: ["t6"] }
      ],
      fbOrder: [3, 4, 5, 6, 7, 0, 1, 2],
    },
  },

  {
    key: "D", icon: "🅳", title: "Health-Camp Screening Analyzer",
    blurb: "Filter and summarise a list of visitor BMI values — count what matters and average the rest. The analysis core behind every pandas table and chart.",
    spark: {
      questions: [
        { kind: "mcq", code: "bmis = [22.0, 27.5, 24.9, 30.0]\nprint(len([x for x in bmis if x >= 25]))", options: ["2", "4", "0", "Error"], answer: 0, hints: ["The comprehension keeps only the values that pass the condition.", "len(...) then counts how many were kept."], why: "The comprehension filters the readings, and len() counts those overweight (≥ 25), giving 2." },
        { kind: "mcq", code: "vals = [20, 30, 40]\nprint(sum(vals) / len(vals))", options: ["30.0", "90", "30", "Error"], answer: 0, hints: ["The mean is the total divided by the count.", "sum(vals) / len(vals); division always yields a float."], why: "sum(vals) is 90 and len(vals) is 3, so the mean is 30.0." },
        { kind: "trace", code: "bmis = [22.0, 27.5, 30.0]\nhits = 0\nfor x in bmis:\n    if x >= 25:\n        hits = hits + 1\nprint(hits)", expect: "2", prompt: "Trace the filter loop: how many readings are overweight (≥ 25)? Type the number.", hints: ["Check each reading against the threshold.", "Count only the ones that pass."], why: "The loop counts readings overweight (≥ 25), giving 2." },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should print the mean visitor BMI — but a plain list has no such method, so Python crashes (AttributeError). Click the buggy line.",
          lines: ["data = [22.0, 27.5, 24.9, 30.0]", "print(data.mean())"],
          buggyLine: 1,
          lineHints: { 0: "Building the list is fine." },
          fixes: ["print(sum(data) / len(data))", "print(sum(data) / data.count())", "print(mean(data))"],
          fixAnswer: 0,
          fixHints: ["A plain Python list has no .mean() method — that's a pandas Series/DataFrame feature.", "Compute the mean yourself with sum(data) / len(data)."],
          why: "A plain list has no .mean(); compute it with sum(data) / len(data) (or load the data into a pandas DataFrame first).",
        },
        {
          intro: "This should print the average visitor BMI — it runs fine but the number is too BIG. Click the faulty line.",
          lines: ["vals = [22.0, 27.5, 24.9, 30.0]", "avg = sum(vals) / (len(vals) - 1)", "print(avg)"],
          buggyLine: 1,
          lineHints: { 0: "Building the list is fine.", 2: "print just shows whatever avg holds." },
          fixes: ["avg = sum(vals) / len(vals)", "avg = sum(vals) / (len(vals) + 1)", "avg = sum(vals) // len(vals)"],
          fixAnswer: 0,
          fixHints: ["The mean divides by the FULL count of values, not one less.", "len(vals) - 1 divides by too few, inflating the average."],
          why: "Dividing by len(vals) - 1 uses too small a denominator and overstates the mean; divide by the full len(vals).",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-9 analysis: count the readings overweight (≥ 25) and print the mean of ALL the readings. Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "bmis = [22.0, 27.5, 24.9, 30.0]", defines: "t0", needs: [] },
        { code: "hits = [x for x in bmis if x >= 25]", defines: "t1", needs: ["t0"] },
        { code: "print(\"count:\", len(hits))", defines: "t2", needs: ["t1"] },
        { code: "print(\"mean:\", round(sum(bmis) / len(bmis), 1))", defines: null, needs: ["t2"] }
      ],
      MSG: {
        t0: "“bmis = [22.0, 27.5, 24.9, 30.0]” has to be placed before it",
        t1: "“hits = [x for x in bmis if x >= 25]” has to be placed before it",
        t2: "“print(\"count:\", len(hits))” has to be placed before it"
      },
      shuffled: [2, 3, 0, 1],
      success: "Filter, count, average — the analysis reads cleanly from top to bottom. ⚒️",
    },
    temper: {
      task: "A list \"readings\" of visitor BMI values is pre-set. Print TWO lines: first how many readings are overweight (≥ 25), then the average of ALL readings rounded to 1 decimal place.",
      varNote: "readings = [22.0, 27.5, 24.9, 30.0] (re-run with hidden readings)",
      tests: [
        { pre: "readings = [22.0, 27.5, 24.9, 30.0]", expect: "2\n26.1", label: "count then mean" },
        { pre: "readings = [18.0, 19.0, 20.0]", expect: "0\n19.0", label: "hidden: different readings", hidden: true }
      ],
      hints: ["Loop (or comprehend) to count the ones past the threshold; the mean is sum(readings) / len(readings).", "count = len([x for x in readings if x >= 25]) ; then print(count) and print(round(sum(readings)/len(readings), 1))."],
      fbTarget: [
        { code: "data = readings", defines: "t0", needs: [] },
        { code: "count = 0", defines: "t1", needs: ["t0"] },
        { code: "for x in data:", defines: "t2", needs: ["t1"] },
        { code: "    if x >= 25:", defines: "t3", needs: ["t2"] },
        { code: "        count = count + 1", defines: "t4", needs: ["t3"] },
        { code: "avg = round(sum(data) / len(data), 1)", defines: "t5", needs: ["t4"] },
        { code: "print(count)", defines: "t6", needs: ["t5"] },
        { code: "print(avg)", defines: null, needs: ["t6"] }
      ],
      fbOrder: [3, 4, 5, 6, 7, 0, 1, 2],
    },
  },
];

// ── Hint box: reveals one nudge at a time, never the whole answer ──
// Display order for a question's options. A fixed shuffle seeded by the question's
// own text, so the right answer is not always first, yet the order never jumps
// between renders or between visits.
function optionOrder(n, seedText) {
  let h = 2166136261;
  for (let i = 0; i < seedText.length; i++) h = Math.imul(h ^ seedText.charCodeAt(i), 16777619) >>> 0;
  const idx = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1597334677) >>> 0;
    const j = h % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

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
        Warm-up on YOUR project's data: read each snippet <em>as Python would</em>. Two are multiple choice —
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
                {optionOrder(q.options.length, q.code).map((oi) => {
                  const opt = q.options[oi];
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
              {optionOrder(b.fixes.length, b.intro).map((i) => {
                const f = b.fixes[i];
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
          // A fresh namespace per test, so names left over from an earlier run
          // (or another lesson) can never make incomplete code pass.
          const ns = py.globals.get("dict")();
          try { py.runPython(t.pre + "\n" + code, { globals: ns }); } finally { ns.destroy(); }
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
      setMessage("All tests passed — including the hidden ones. Your project filters and summarises its data for real.");
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
        and it runs, for real, right here. This is the analysis heart of your mini-project. 🗡️
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
//  each stage as "UnitLAB10_5@<key>_<stageId>"; when all four are done it
//  shows the completion panel (which claims the whole checkpoint).
// ═════════════════════════════════════════════════════════════════════
function TrackRunner({ track, challengeProgress, onStageComplete, claimed, onClaim, onBack, labCertStatus, onOpenLabCertificate }) {
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
          ? <TrackDonePanel track={track} claimed={claimed} onClaim={onClaim} labCertStatus={labCertStatus} onOpenLabCertificate={onOpenLabCertificate} />
          : isUnlocked(active)
            ? renderStage(active)
            : <div style={{ textAlign: "center", color: C.muted, padding: 40 }}>🔒 Locked — pass the previous stage first.</div>}
      </div>
    </div>
  );
}

// ── Completion panel for a finished track. Claiming records the whole
//    checkpoint (onUnitComplete), so it must be SEEN and clicked. This is the
//    LAST mini-project crucible, so it also shows where the student stands on
//    the e-Lab certificate (all ten experiments + all five crucibles). When
//    everything is done, submitting opens the certificate (App.jsx does that). ──
function TrackDonePanel({ track, claimed, onClaim, labCertStatus, onOpenLabCertificate }) {
  const lab = labCertStatus;
  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <div style={{ fontSize: 60 }}>🔥</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: C.orange, marginTop: 8 }}>TRACK CRACKED</div>
      <div style={{ fontSize: 16, color: C.text, fontWeight: 700, marginTop: 4 }}>{track.icon} {track.title}</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 500, margin: "10px auto 0" }}>
        Predicted filtered counts, hunted analysis bugs, rebuilt your summary program, and wrote the real
        count-and-average code — all four stages, on YOUR chosen track. Experiments 9 & 10 aren't just learned;
        your project can now turn its records into numbers worth charting.
      </div>
      <div style={{ marginTop: 20, padding: 18, borderRadius: 12, display: "inline-block", background: `linear-gradient(135deg, ${C.orange}22, ${C.red}22)`, border: `1px solid ${C.orange}66` }}>
        <div style={{ fontSize: 30 }}>🏅</div>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginTop: 6 }}>Mini-Project Checkpoint · Exp 9 & 10</div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Spark ✓ · Flame ✓ · Forge ✓ · Temper ✓</div>
      </div>
      {!claimed ? (
        <div style={{ marginTop: 20 }}>
          <button onClick={onClaim} style={{
            padding: "12px 28px", borderRadius: 10, border: "none",
            background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
            color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
          }}>{lab && lab.eligible && onOpenLabCertificate ? "🎓 Submit & get my e-Lab certificate" : "🏅 Submit checkpoint to my record"}</button>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 10 }}>One track per crucible is all you need — you can still come back and try the others.</div>
        </div>
      ) : (
        <div style={{ marginTop: 18 }}>
          <div style={{ color: C.green, fontWeight: 700, fontSize: 14 }}>✓ Checkpoint recorded.</div>
          {lab && lab.eligible && onOpenLabCertificate && (
            <button onClick={onOpenLabCertificate} style={{
              marginTop: 12, padding: "12px 28px", borderRadius: 10, border: "none",
              background: C.accent, color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
            }}>🎓 Open my e-Lab certificate</button>
          )}
        </div>
      )}
      {lab && !lab.eligible && (
        <div style={{ marginTop: 20, padding: "12px 16px", borderRadius: 10, background: C.card, border: `1px solid ${C.border}`, textAlign: "left", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 13.5 }}>🎓 e-Lab certificate</div>
          <div style={{ color: C.muted, fontSize: 12.5, marginTop: 6, lineHeight: 1.7 }}>
            Experiments {lab.experimentsDone}/{lab.experimentsTotal} · Mini-project crucibles {lab.cruciblesDone}/{lab.cruciblesTotal} · Feedback {lab.feedbackDone ? "✓" : "pending"}.
            Still to do: {lab.missing.join(" · ")}. Finish these and the certificate unlocks from your dashboard.
          </div>
        </div>
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
        ⚔️ <strong style={{ color: C.orange }}>Same track, next forging.</strong> This checkpoint proves Experiments 9 & 10 —
        filtering and summarising data (the core of pandas and charts) — entirely through your mini-project. Stay on the track you
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
export default function UnitLAB10_5({ student, onUnitComplete, challengeProgress = [], onStageComplete, labCertStatus, onOpenLabCertificate }) {
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
          <div style={{ fontSize: 12, color: C.orange, letterSpacing: 1, fontWeight: 700 }}>PYTHON LAB › CHECKPOINT · EXP 9 & 10</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Mini-Project Crucible — Analysis & Charts</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: claimed ? C.green : C.muted }}>{claimed ? "✓ recorded" : "required"}</div>
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
              labCertStatus={labCertStatus}
              onOpenLabCertificate={student ? onOpenLabCertificate : null}
            />
          : <TrackChooser challengeProgress={challengeProgress} onPick={setSelected} />}
      </div>
    </div>
  );
}
