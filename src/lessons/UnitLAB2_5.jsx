// UnitLAB2_5 — 🔥 Checkpoint: Mini-Project Crucible (Experiments 1 & 2)
// ─────────────────────────────────────────────────────────────────────
// A gated, CRUCIBLE-STYLE assessment (same Spark → Flame → Forge → Temper
// arc as Unit5_C), but restructured around the lab manual's FOUR
// mini-project tracks. It tests Experiment 1 (data types, operators,
// conditionals) and Experiment 2 (loops, collections, functions) ENTIRELY
// through the student's chosen project — there are no random questions.
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
//                          (e.g. "UnitLAB2_5@A_spark") to the Events/Progress
//                          sheet — the teacher's e-observation record.
//
// TRACKS ARE INDEPENDENT, NOT CROSS-GATED. The manual says: choose ONE
// track in week 1 and stay on it. So the unit opens with a track chooser;
// the student picks their track and works only inside it. Gating lives
// INSIDE each track — its own Spark → Flame → Forge → Temper unlock in
// sequence. Completing the chosen track marks the checkpoint done (the
// student claims it, which calls onUnitComplete). A student MAY return and
// attempt other tracks, but is never required to.
//
// GROWING CHECKPOINT. Every stage is a literal brick of the student's
// capstone (the Temper stage literally writes check_vitals / needs_reorder
// / is_free / bmi_band — the Exp-2 heart of their project). Later
// experiments will add further steps, so each track's data is kept
// self-contained here and easy to extend.
import { useState, useRef } from "react";

// ── Brand palette — the Crucible's fire tones (orange/red) ──
const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const UNIT_ID = "UnitLAB2_5";
const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };

// The four crucible stages, shared by every track (same names/icons as Unit5_C).
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
//    forge{...}         → a Parsons problem (reorder the Exp-1 program)
//    temper{...}        → write-real-Python (the Exp-2 function) + fallback
//  All code is drawn from Experiments 1 & 2 applied to THAT track.
// ═════════════════════════════════════════════════════════════════════
const TRACKS = [
  // ─────────────────────────── TRACK A ───────────────────────────
  {
    key: "A", icon: "🅰", title: "Patient Vitals Monitor",
    blurb: "Read a patient's vitals, flag abnormal readings, and check many readings with a function.",
    spark: {
      questions: [
        {
          kind: "mcq",
          code: "temp = 38.5\nif temp >= 38.0:\n    print(\"Fever\")\nelif temp >= 37.5:\n    print(\"Mild\")\nelse:\n    print(\"Normal\")",
          options: ["Fever", "Mild", "Normal", "Error"],
          answer: 0,
          hints: ["Python checks the branches top to bottom and stops at the FIRST True one.", "Is 38.5 >= 38.0? If so, the later branches never run."],
          why: "38.5 >= 38.0 is True, so \"Fever\" prints and the elif/else are skipped — an if/elif/else runs exactly one branch.",
        },
        {
          kind: "mcq",
          code: "pulse = 110\nprint(pulse < 60 or pulse > 100)",
          options: ["True", "False", "110", "Error"],
          answer: 0,
          hints: ["Evaluate each side: is 110 < 60? is 110 > 100?", "or is True if EITHER side is True."],
          why: "110 < 60 is False, but 110 > 100 is True, and False or True → True.",
        },
        {
          kind: "trace",
          code: "temps = [36.5, 39.0, 38.2]\ncount = 0\nfor t in temps:\n    if t >= 38.0:\n        count = count + 1\nprint(count)",
          expect: "2",
          prompt: "Trace the accumulator: what number does this print? Type it below.",
          hints: ["Walk the list one reading at a time, checking t >= 38.0 each pass.", "36.5 no, 39.0 yes (count→1), 38.2 yes (count→2)."],
          why: "The loop counts readings at or above 38.0: 39.0 and 38.2 both qualify, so count ends at 2.",
        },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should flag a fever at 38°C or above — but Python won't even START it (SyntaxError). Click the buggy line.",
          lines: ["temp = 38.5", "if temp = 38.0:", "    print(\"Fever\")"],
          buggyLine: 1,
          lineHints: { 0: "A normal assignment — this line is fine.", 2: "The print never runs; Python stopped earlier." },
          fixes: ["if temp >= 38.0:", "if temp = 38.5:", "if temp == 38.0:"],
          fixAnswer: 0,
          fixHints: ["One = STORES, two == COMPARES — an if needs a comparison.", "And the goal is '38 or above', which is >= 38.0 (== would miss 38.5)."],
          why: "= assigns, == compares — an if needs a comparison. Since the goal is \"38 or above\", the right test is temp >= 38.0.",
        },
        {
          intro: "A pulse of 110 should print 'High' — but this prints 'Normal'. No crash, just a WRONG answer. Click the line that causes it.",
          lines: ["pulse = 110", "if pulse >= 60:", "    status = \"Normal\"", "elif pulse > 100:", "    status = \"High\"", "else:", "    status = \"Low\"", "print(status)"],
          buggyLine: 1,
          lineHints: { 0: "pulse = 110 is exactly the value we're testing.", 3: "This condition is correct, but it never gets a chance to run.", 4: "Innocent — the branch above steals the show.", 5: "else is fine.", 6: "Innocent.", 7: "The print just reports whatever status holds." },
          fixes: ["if pulse > 100:  (check the HIGHER band first, then elif pulse >= 60)", "if pulse > 60:", "if pulse == \"High\":"],
          fixAnswer: 0,
          fixHints: ["An elif chain stops at the FIRST True condition — 110 >= 60 is True, so it never looks further.", "Order the bands from highest to lowest: test > 100 first."],
          why: "Logic bug, not a crash: 110 >= 60 is True, so the chain stops at 'Normal'. Order elif bands from highest to lowest.",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-1 vitals checker: read a temperature and print a status. Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "temp = float(input(\"Temp? \"))", defines: "temp", needs: [] },
        { code: "if temp >= 38.0:", defines: "if_open", needs: ["temp"] },
        { code: "    print(\"Fever\")", defines: "if_body", needs: ["if_open"] },
        { code: "else:", defines: "else_open", needs: ["if_body"] },
        { code: "    print(\"Normal\")", defines: null, needs: ["else_open"] },
      ],
      MSG: {
        temp: "the variable temp doesn't exist yet — read it first",
        if_open: "there's no if above it for this branch to belong to",
        if_body: "the if needs its body in place before else can appear",
        else_open: "there's no else: above it to belong to",
      },
      shuffled: [3, 0, 4, 1, 2],
      success: "Read → decide → report: the vitals checker reads cleanly from top to bottom. ⚒️",
    },
    temper: {
      task: "Vitals are pre-set for you: temp, pulse, bp. Write check_vitals(temp, pulse, bp) that returns \"ABNORMAL\" if temp >= 38.0 OR pulse > 100 OR bp >= 140, otherwise \"NORMAL\" — then print the result.",
      varNote: "temp = 39.0, pulse = 88, bp = 120 (re-run with hidden values)",
      tests: [
        { pre: "temp = 39.0\npulse = 88\nbp = 120\n", expect: "ABNORMAL", label: "fever → ABNORMAL" },
        { pre: "temp = 36.8\npulse = 76\nbp = 118\n", expect: "NORMAL", label: "hidden normal → NORMAL" },
        { pre: "temp = 37.0\npulse = 120\nbp = 130\n", expect: "ABNORMAL", label: "hidden high pulse → ABNORMAL" },
      ],
      hints: [
        "Abnormal if ANY reading is out of range — join the three checks with or.",
        "def check_vitals(temp, pulse, bp): return \"ABNORMAL\" if temp >= 38.0 or pulse > 100 or bp >= 140 else \"NORMAL\" — then print the call.",
      ],
      fbTarget: [
        { code: "def check_vitals(temp, pulse, bp):", defines: "def", needs: [] },
        { code: "    if temp >= 38.0 or pulse > 100 or bp >= 140:", defines: "if", needs: ["def"] },
        { code: "        return \"ABNORMAL\"", defines: "abn", needs: ["if"] },
        { code: "    else:", defines: "else", needs: ["abn"] },
        { code: "        return \"NORMAL\"", defines: "norm", needs: ["else"] },
        { code: "print(check_vitals(temp, pulse, bp))", defines: null, needs: ["norm"] },
      ],
      fbOrder: [2, 5, 0, 3, 1, 4],
    },
  },

  // ─────────────────────────── TRACK B ───────────────────────────
  {
    key: "B", icon: "🅱", title: "Pharmacy Stock Manager",
    blurb: "Compare stock to a reorder level, then scan a whole dictionary of medicines with a function.",
    spark: {
      questions: [
        {
          kind: "mcq",
          code: "stock = 5\nlevel = 10\nif stock < level:\n    print(\"REORDER\")\nelse:\n    print(\"OK\")",
          options: ["REORDER", "OK", "5", "Error"],
          answer: 0,
          hints: ["Is 5 < 10?", "If the condition is True, the if branch runs, not the else."],
          why: "5 < 10 is True, so the if branch prints \"REORDER\".",
        },
        {
          kind: "mcq",
          code: "stock = {\"paracetamol\": 12, \"aspirin\": 3}\nprint(stock[\"aspirin\"])",
          options: ["3", "12", "aspirin", "Error"],
          answer: 0,
          hints: ["stock[key] looks up the value stored under that key.", "What value is stored under \"aspirin\"?"],
          why: "stock[\"aspirin\"] returns the value mapped to that key, which is 3.",
        },
        {
          kind: "trace",
          code: "stock = {\"a\": 4, \"b\": 20, \"c\": 8}\nlevel = 10\nlow = 0\nfor qty in stock.values():\n    if qty < level:\n        low = low + 1\nprint(low)",
          expect: "2",
          prompt: "Trace the loop over the dictionary's values: what prints? Type it below.",
          hints: [".values() gives 4, then 20, then 8.", "Count how many are below 10: 4 yes, 20 no, 8 yes."],
          why: "Two quantities (4 and 8) are below the level of 10, so low ends at 2.",
        },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should flag a reorder when stock is below the level — but Python won't START (SyntaxError). Click the buggy line.",
          lines: ["stock = 5", "level = 10", "if stock < level", "    print(\"REORDER\")"],
          buggyLine: 2,
          lineHints: { 0: "A plain assignment — fine.", 1: "Also fine.", 3: "The print never ran; Python stopped on the line above." },
          fixes: ["if stock < level:", "if stock < level;", "if (stock < level)"],
          fixAnswer: 0,
          fixHints: ["Every if header must end with something. What punctuation opens its block?", "Python blocks begin after a colon :."],
          why: "An if header must end with a colon (:) — that's what opens the indented block beneath it.",
        },
        {
          intro: "REORDER should appear only when stock is BELOW the level — but with stock 10 and level 10 it wrongly prints REORDER. Click the faulty line.",
          lines: ["stock = 10", "level = 10", "if stock <= level:", "    print(\"REORDER\")", "else:", "    print(\"OK\")"],
          buggyLine: 2,
          lineHints: { 0: "stock = 10 is the value we're testing.", 1: "level = 10 too.", 3: "The print just reports the branch that was taken.", 4: "else is fine.", 5: "Innocent." },
          fixes: ["if stock < level:", "if stock > level:", "if stock == \"REORDER\":"],
          fixAnswer: 0,
          fixHints: ["At exactly the level you still have enough — reorder only when strictly below.", "So the comparison should be < , not <=."],
          why: "<= includes the boundary, so stock == level triggers a needless reorder. Reorder only when strictly below: stock < level.",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-1 stock checker: read the stock and reorder level, then print REORDER or OK. Use ↑↓ to order the lines.",
      target: [
        { code: "stock = int(input(\"Stock? \"))", defines: "stock", needs: [] },
        { code: "level = int(input(\"Reorder level? \"))", defines: "level", needs: [] },
        { code: "if stock < level:", defines: "if_open", needs: ["stock", "level"] },
        { code: "    print(\"REORDER\")", defines: "if_body", needs: ["if_open"] },
        { code: "else:", defines: "else_open", needs: ["if_body"] },
        { code: "    print(\"OK\")", defines: null, needs: ["else_open"] },
      ],
      MSG: {
        stock: "the variable stock doesn't exist yet — read it first",
        level: "the variable level doesn't exist yet — read it first",
        if_open: "there's no if above it for this branch to belong to",
        if_body: "the if needs its body in place before else can appear",
        else_open: "there's no else: above it to belong to",
      },
      shuffled: [4, 0, 2, 5, 1, 3],
      success: "Read both numbers, compare, report — the reorder checker is assembled. ⚒️",
    },
    temper: {
      task: "A stock dict and a reorder level are pre-set. Write needs_reorder(qty, level) that returns True when qty < level, then loop over the stock and print the name of each medicine that needs reordering (one per line).",
      varNote: "stock = {\"paracetamol\": 5, \"aspirin\": 20, \"insulin\": 3}, level = 10 (re-run with hidden stock)",
      tests: [
        { pre: "stock = {\"paracetamol\": 5, \"aspirin\": 20, \"insulin\": 3}\nlevel = 10\n", expect: "paracetamol\ninsulin", label: "two low → both names" },
        { pre: "stock = {\"amoxicillin\": 15, \"ibuprofen\": 8}\nlevel = 10\n", expect: "ibuprofen", label: "hidden stock → one name" },
        { pre: "stock = {\"vitaminC\": 50, \"zinc\": 4}\nlevel = 10\n", expect: "zinc", label: "hidden stock → one name" },
      ],
      hints: [
        "needs_reorder is a one-liner: return qty < level. Then loop stock.items() and print the medicine when it returns True.",
        "def needs_reorder(qty, level): return qty < level — then for medicine, qty in stock.items(): if needs_reorder(qty, level): print(medicine).",
      ],
      fbTarget: [
        { code: "def needs_reorder(qty, level):", defines: "def", needs: [] },
        { code: "    return qty < level", defines: "ret", needs: ["def"] },
        { code: "for medicine, qty in stock.items():", defines: "for", needs: ["ret"] },
        { code: "    if needs_reorder(qty, level):", defines: "if", needs: ["for"] },
        { code: "        print(medicine)", defines: null, needs: ["if"] },
      ],
      fbOrder: [2, 0, 4, 1, 3],
    },
  },

  // ─────────────────────────── TRACK C ───────────────────────────
  {
    key: "C", icon: "🅲", title: "Clinic Appointment Book",
    blurb: "Decide clinic status by the hour, then walk a schedule dictionary with a function.",
    spark: {
      questions: [
        {
          kind: "mcq",
          code: "hour = 13\nif hour == 13:\n    print(\"LUNCH BREAK\")\nelif 9 <= hour <= 16:\n    print(\"OPEN\")\nelse:\n    print(\"CLOSED\")",
          options: ["LUNCH BREAK", "OPEN", "CLOSED", "Error"],
          answer: 0,
          hints: ["The first branch is checked first: is hour == 13?", "If it matches, the elif never runs."],
          why: "hour == 13 is True, so \"LUNCH BREAK\" prints — the first matching branch wins.",
        },
        {
          kind: "mcq",
          code: "hour = 20\nprint(9 <= hour <= 16)",
          options: ["False", "True", "20", "Error"],
          answer: 0,
          hints: ["This chained comparison means: is hour between 9 and 16 inclusive?", "Is 20 <= 16?"],
          why: "9 <= 20 is True but 20 <= 16 is False, so the whole chained comparison is False.",
        },
        {
          kind: "trace",
          code: "day = {\"09:00\": \"Ravi\", \"10:00\": None, \"11:00\": None}\nfree = 0\nfor patient in day.values():\n    if patient is None:\n        free = free + 1\nprint(free)",
          expect: "2",
          prompt: "Trace the loop: how many free slots? Type the number below.",
          hints: ["A slot is free when its value is None.", "Values are \"Ravi\", None, None — count the Nones."],
          why: "Two slots hold None (10:00 and 11:00), so free ends at 2.",
        },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should announce the lunch break at 1 PM — but Python won't START (SyntaxError). Click the buggy line.",
          lines: ["hour = 13", "if hour == 13", "    print(\"LUNCH BREAK\")"],
          buggyLine: 1,
          lineHints: { 0: "A plain assignment — fine.", 2: "The print never ran; the error is above it." },
          fixes: ["if hour == 13:", "if hour = 13:", "if hour == 13;"],
          fixAnswer: 0,
          fixHints: ["The comparison == is correct; something at the END of the line is missing.", "Every if header ends with a colon :."],
          why: "The comparison == is right — the header was just missing its colon (:), which opens the block.",
        },
        {
          intro: "At 20:00 the clinic is CLOSED — but this prints OPEN. No crash, just wrong. Click the faulty line.",
          lines: ["hour = 20", "if hour >= 9:", "    print(\"OPEN\")", "elif hour == 13:", "    print(\"LUNCH BREAK\")", "else:", "    print(\"CLOSED\")"],
          buggyLine: 1,
          lineHints: { 0: "hour = 20 is the value we're testing.", 2: "The print just reports the branch taken.", 3: "This branch is fine but never reached.", 4: "Innocent.", 5: "else is fine.", 6: "Innocent." },
          fixes: ["if 9 <= hour <= 16:  (bound BOTH ends of the open hours)", "if hour > 9:", "if hour == \"OPEN\":"],
          fixAnswer: 0,
          fixHints: ["hour >= 9 is True for 20 as well, so it wrongly counts as OPEN.", "Open hours have an upper bound too — clamp both ends: 9 <= hour <= 16."],
          why: "hour >= 9 has no upper bound, so 20 matches OPEN. Bound both ends with 9 <= hour <= 16.",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-1 clinic-status program: read the hour, then print LUNCH BREAK / OPEN / CLOSED. Use ↑↓ to order the lines.",
      target: [
        { code: "hour = int(input(\"Hour (0-23)? \"))", defines: "hour", needs: [] },
        { code: "if hour == 13:", defines: "if_open", needs: ["hour"] },
        { code: "    print(\"LUNCH BREAK\")", defines: "if_body", needs: ["if_open"] },
        { code: "elif 9 <= hour <= 16:", defines: "elif_open", needs: ["if_body"] },
        { code: "    print(\"OPEN\")", defines: "elif_body", needs: ["elif_open"] },
        { code: "else:", defines: "else_open", needs: ["elif_body"] },
        { code: "    print(\"CLOSED\")", defines: null, needs: ["else_open"] },
      ],
      MSG: {
        hour: "the variable hour doesn't exist yet — read it first",
        if_open: "there's no if above it for this branch to belong to",
        if_body: "the if needs its body before elif can appear",
        elif_open: "there's no elif above it for this branch to belong to",
        elif_body: "the elif needs its body before else can appear",
        else_open: "there's no else: above it to belong to",
      },
      shuffled: [3, 0, 6, 1, 4, 2, 5],
      success: "Lunch first, then the open window, then closed — the status program flows correctly. ⚒️",
    },
    temper: {
      task: "A day's schedule dict is pre-set (slot → patient name, or None if empty). Write is_free(slot) that returns True when that slot's value is None, then loop the slots and print each as 'slot FREE' or 'slot BOOKED'.",
      varNote: "day = {\"09:00\": \"Ravi\", \"10:00\": None} (re-run with a hidden schedule)",
      tests: [
        { pre: "day = {\"09:00\": \"Ravi\", \"10:00\": None}\n", expect: "09:00 BOOKED\n10:00 FREE", label: "one booked, one free" },
        { pre: "day = {\"11:00\": None, \"12:00\": \"Meena\"}\n", expect: "11:00 FREE\n12:00 BOOKED", label: "hidden schedule" },
      ],
      hints: [
        "is_free checks for None: return day[slot] is None. Then loop the slots and print FREE or BOOKED.",
        "def is_free(slot): return day[slot] is None — then for slot in day: print(slot, \"FREE\") when is_free(slot) else print(slot, \"BOOKED\").",
      ],
      fbTarget: [
        { code: "def is_free(slot):", defines: "def", needs: [] },
        { code: "    return day[slot] is None", defines: "ret", needs: ["def"] },
        { code: "for slot in day:", defines: "for", needs: ["ret"] },
        { code: "    if is_free(slot):", defines: "if", needs: ["for"] },
        { code: "        print(slot, \"FREE\")", defines: "ifb", needs: ["if"] },
        { code: "    else:", defines: "else", needs: ["ifb"] },
        { code: "        print(slot, \"BOOKED\")", defines: null, needs: ["else"] },
      ],
      fbOrder: [3, 0, 6, 1, 4, 2, 5],
    },
  },

  // ─────────────────────────── TRACK D ───────────────────────────
  {
    key: "D", icon: "🅳", title: "Health-Camp Screening Analyzer",
    blurb: "Compute a BMI and classify it, then band a whole list of visitors with a function.",
    spark: {
      questions: [
        {
          kind: "mcq",
          code: "bmi = 27.0\nif bmi < 18.5:\n    print(\"Underweight\")\nelif bmi < 25:\n    print(\"Normal\")\nelse:\n    print(\"Overweight/Obese\")",
          options: ["Overweight/Obese", "Normal", "Underweight", "Error"],
          answer: 0,
          hints: ["Check the branches top to bottom: is 27.0 < 18.5? is 27.0 < 25?", "If neither is True, the else runs."],
          why: "27.0 is not < 18.5 nor < 25, so the else branch prints \"Overweight/Obese\".",
        },
        {
          kind: "mcq",
          code: "weight = 60\nheight = 2.0\nprint(weight / (height ** 2))",
          options: ["15.0", "30.0", "120.0", "Error"],
          answer: 0,
          hints: ["** is power: height ** 2 is 2.0 squared.", "60 / (2.0 * 2.0) = 60 / 4.0."],
          why: "height ** 2 is 4.0, and 60 / 4.0 is 15.0 (division always gives a float).",
        },
        {
          kind: "trace",
          code: "records = [(\"Ravi\", 22.0), (\"Meena\", 27.5), (\"Sara\", 24.9)]\nnormal = 0\nfor name, bmi in records:\n    if bmi < 25:\n        normal = normal + 1\nprint(normal)",
          expect: "2",
          prompt: "Trace the loop over the list of tuples: what prints? Type it below.",
          hints: ["Unpack each tuple into name, bmi and test bmi < 25.", "22.0 yes, 27.5 no, 24.9 yes."],
          why: "Two BMIs are below 25 (22.0 and 24.9), so normal ends at 2.",
        },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This should compute a BMI then classify it — but Python won't START (SyntaxError). Click the buggy line.",
          lines: ["weight = 60", "height = 1.7", "bmi = weight / (height ** 2)", "if bmi < 18.5", "    print(\"Underweight\")"],
          buggyLine: 3,
          lineHints: { 0: "A plain assignment — fine.", 1: "Also fine.", 2: "The BMI formula is correct.", 4: "The print never ran; the error is on the line above." },
          fixes: ["if bmi < 18.5:", "if bmi < 18.5;", "if (bmi < 18.5)"],
          fixAnswer: 0,
          fixHints: ["The comparison is fine; the END of the header is missing something.", "if headers end with a colon :."],
          why: "The if header was missing its colon (:) — that's what opens the indented block below it.",
        },
        {
          intro: "A BMI of 27 should be 'Overweight/Obese' — but this prints 'Underweight'. No crash, wrong band. Click the faulty line.",
          lines: ["bmi = 27.0", "if bmi > 18.5:", "    print(\"Underweight\")", "elif bmi > 25:", "    print(\"Overweight/Obese\")", "else:", "    print(\"Normal\")"],
          buggyLine: 1,
          lineHints: { 0: "bmi = 27.0 is the value we're testing.", 2: "The print reports the branch taken.", 3: "This branch is fine but never reached.", 4: "Innocent.", 5: "else is fine.", 6: "Innocent." },
          fixes: ["if bmi < 18.5:  (underweight is BELOW 18.5; order bands low→high with <)", "if bmi >= 18.5:", "if bmi == \"Underweight\":"],
          fixAnswer: 0,
          fixHints: ["Underweight means BELOW 18.5, so the test flips to bmi < 18.5.", "Order the bands lowest-first using < so each value lands in the right one."],
          why: "Underweight is below 18.5, so the comparison must be bmi < 18.5; bands should be ordered lowest-first with <.",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-1 BMI classifier: read weight and height, compute BMI, then print the WHO band. Use ↑↓ to order the lines.",
      target: [
        { code: "weight = float(input(\"Weight kg? \"))", defines: "weight", needs: [] },
        { code: "height = float(input(\"Height m? \"))", defines: "height", needs: [] },
        { code: "bmi = weight / (height ** 2)", defines: "bmi", needs: ["weight", "height"] },
        { code: "if bmi < 18.5:", defines: "if_open", needs: ["bmi"] },
        { code: "    print(\"Underweight\")", defines: "if_body", needs: ["if_open"] },
        { code: "elif bmi < 25:", defines: "elif_open", needs: ["if_body"] },
        { code: "    print(\"Normal\")", defines: "elif_body", needs: ["elif_open"] },
        { code: "else:", defines: "else_open", needs: ["elif_body"] },
        { code: "    print(\"Overweight/Obese\")", defines: null, needs: ["else_open"] },
      ],
      MSG: {
        weight: "the variable weight doesn't exist yet — read it first",
        height: "the variable height doesn't exist yet — read it first",
        bmi: "bmi can't be computed until weight and height are read",
        if_open: "there's no if above it for this branch to belong to",
        if_body: "the if needs its body before elif can appear",
        elif_open: "there's no elif above it for this branch to belong to",
        elif_body: "the elif needs its body before else can appear",
        else_open: "there's no else: above it to belong to",
      },
      shuffled: [3, 0, 8, 2, 5, 1, 6, 4, 7],
      success: "Read → compute → classify: the BMI analyzer reads cleanly from top to bottom. ⚒️",
    },
    temper: {
      task: "A list of (name, bmi) records is pre-set. Write bmi_band(bmi) returning \"Underweight\" (<18.5), \"Normal\" (<25) or \"Overweight/Obese\" (else), then loop the records and print each visitor as 'name: band'.",
      varNote: "records = [(\"Ravi\", 22.0), (\"Meena\", 27.5)] (re-run with hidden records)",
      tests: [
        { pre: "records = [(\"Ravi\", 22.0), (\"Meena\", 27.5)]\n", expect: "Ravi: Normal\nMeena: Overweight/Obese", label: "two visitors → their bands" },
        { pre: "records = [(\"Sara\", 17.0), (\"John\", 24.9)]\n", expect: "Sara: Underweight\nJohn: Normal", label: "hidden records → their bands" },
      ],
      hints: [
        "bmi_band is an if/elif/else ladder from low to high: <18.5 Underweight, <25 Normal, else Overweight/Obese.",
        "def bmi_band(bmi): ... return the three bands; then for name, bmi in records: print(name + \":\", bmi_band(bmi)).",
      ],
      fbTarget: [
        { code: "def bmi_band(bmi):", defines: "def", needs: [] },
        { code: "    if bmi < 18.5:", defines: "if", needs: ["def"] },
        { code: "        return \"Underweight\"", defines: "uw", needs: ["if"] },
        { code: "    elif bmi < 25:", defines: "elif", needs: ["uw"] },
        { code: "        return \"Normal\"", defines: "nm", needs: ["elif"] },
        { code: "    else:", defines: "else", needs: ["nm"] },
        { code: "        return \"Overweight/Obese\"", defines: "ov", needs: ["else"] },
        { code: "for name, bmi in records:", defines: "for", needs: ["ov"] },
        { code: "    print(name + \":\", bmi_band(bmi))", defines: null, needs: ["for"] },
      ],
      fbOrder: [3, 0, 8, 2, 5, 1, 6, 4, 7],
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
//  Data-driven: `data.questions` supplies each snippet, options and answer.
// ═════════════════════════════════════════════════════════════════════
function SparkStage({ data, onPass }) {
  const questions = data.questions;
  const [solved, setSolved] = useState([]);
  const [picked, setPicked] = useState({});   // qIdx -> last wrong pick
  const [typed, setTyped] = useState({});      // qIdx -> current typed text
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
        Warm-up on YOUR project's code: read each snippet <em>as Python would</em>. Two are multiple choice —
        the third has no options: trace the variable in your head and TYPE the answer. Wrong tries just light hints. ✨
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
//  Data-driven: `data.bugs` supplies each buggy snippet + its fixes.
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
//  track's Experiment-1 program. `needs`/`defines` tokens model both data
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
    // Walk the current order; each line's `needs` must already be `defined`.
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
        {intro} Indented lines belong to the <em>if / elif / else</em> above them, so structure matters as much as order. ⚒️
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
//  STAGE 4 — TEMPER: write real Python (the Exp-2 function), run via
//  Pyodide against visible + hidden tests. A Parsons fallback covers the
//  case where Pyodide can't load. Data-driven from `data` (temper block).
// ═════════════════════════════════════════════════════════════════════
function TemperStage({ data, onPass }) {
  const TESTS = data.tests;
  const hints = data.hints;
  const [code, setCode] = useState("# your code here\n");
  const [status, setStatus] = useState("idle"); // idle|loading|running|passed|failed|error|fallback
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
    // it, so every test silently uses the same data — giving confusing
    // "expected / your output" mismatches. Pull the injected names out of the test's
    // `pre` and stop early if the code reassigns any of them.
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
        // Redirect stdout, then run the pre-set variables + the student's code.
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
      setMessage("All tests passed — including the hidden ones. Your project's core function works for real.");
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
        and it runs, for real, right here. This is the heart of your mini-project. 🗡️
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.orange}55`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
        <div style={{ color: C.orange, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>📜 YOUR TASK</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{data.task}</div>
        <div style={{ fontSize: 11.5, color: C.teal, marginTop: 8, fontFamily: "monospace" }}>Given: {data.varNote}</div>
      </div>

      {status !== "fallback" && (
        <>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} rows={8} style={{
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
//  each stage as "UnitLAB2_5@<key>_<stageId>"; when all four are done it
//  shows the completion panel (which claims the whole checkpoint).
// ═════════════════════════════════════════════════════════════════════
function TrackRunner({ track, challengeProgress, onStageComplete, claimed, onClaim, onBack }) {
  const persisted = STAGE_DEFS.filter((s) => challengeProgress.includes(`${UNIT_ID}@${track.key}_${s.id}`)).map((s) => s.id);
  const [doneStages, setDoneStages] = useState(persisted);
  const [active, setActive] = useState(() => {
    const firstOpen = STAGE_DEFS.findIndex((s) => !persisted.includes(s.id));
    return firstOpen === -1 ? STAGE_DEFS.length : firstOpen; // length = completion panel
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
      {/* Back to the chooser — a track can be left and resumed any time. */}
      <button onClick={onBack} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", marginBottom: 14 }}>
        ← choose another track
      </button>

      {/* Which track am I on? */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ fontSize: 26 }}>{track.icon}</div>
        <div>
          <div style={{ color: C.orange, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>YOUR TRACK</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{track.title}</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{doneStages.length} / {STAGE_DEFS.length} stages</div>
      </div>

      {/* Stage strip — gated in order. */}
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
//    checkpoint (onUnitComplete), so — like the Crucible badge — it must be
//    SEEN and clicked, never auto-fired. ──
function TrackDonePanel({ track, claimed, onClaim }) {
  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <div style={{ fontSize: 60 }}>🔥</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: C.orange, marginTop: 8 }}>TRACK CRACKED</div>
      <div style={{ fontSize: 16, color: C.text, fontWeight: 700, marginTop: 4 }}>{track.icon} {track.title}</div>
      <div style={{ color: C.muted, fontSize: 14, marginTop: 10, lineHeight: 1.8, maxWidth: 500, margin: "10px auto 0" }}>
        Predicted output, hunted bugs, rebuilt your Experiment-1 program, and wrote the real Python function at
        the heart of your project — all four stages, on YOUR chosen track. Experiments 1 & 2 aren't just
        learned; they're a working brick of your capstone.
      </div>
      <div style={{ marginTop: 20, padding: 18, borderRadius: 12, display: "inline-block", background: `linear-gradient(135deg, ${C.orange}22, ${C.red}22)`, border: `1px solid ${C.orange}66` }}>
        <div style={{ fontSize: 30 }}>🏅</div>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginTop: 6 }}>Mini-Project Checkpoint · Exp 1 & 2</div>
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

// ── Track chooser — the entry screen. Shows all four tracks; picking one
//    opens its independent Spark→Flame→Forge→Temper arc. ──
function TrackChooser({ challengeProgress, onPick }) {
  const trackDone = (t) => STAGE_DEFS.every((s) => challengeProgress.includes(`${UNIT_ID}@${t.key}_${s.id}`));
  return (
    <div>
      <div style={{ background: C.orange + "10", border: `1px solid ${C.orange}33`, borderRadius: 10, padding: "12px 16px", marginBottom: 18, fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
        ⚔️ <strong style={{ color: C.orange }}>Pick ONE track.</strong> This checkpoint proves Experiments 1 & 2 entirely
        through your mini-project. As the manual says: choose one track in week 1 and stay on it. You only need to
        crack your own track to complete the checkpoint — the others are always here if you want them later.
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
//  MAIN — track chooser ⇄ track runner. Completing the CHOSEN track (and
//  clicking claim) fires onUnitComplete once, filing the whole checkpoint.
// ═════════════════════════════════════════════════════════════════════
export default function UnitLAB2_5({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
  const [selected, setSelected] = useState(null); // track key, or null = chooser
  // The whole checkpoint is "claimed" once UnitLAB2_5 itself is in progress.
  const [claimed, setClaimed] = useState(challengeProgress.includes(UNIT_ID));

  const claimCheckpoint = () => {
    setClaimed(true);
    onUnitComplete && onUnitComplete(); // files it against the roll number (and unloads the lesson)
  };

  const track = TRACKS.find((t) => t.key === selected);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      {/* Header — the Crucible's fire identity. */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.orange}44`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${C.orange}, ${C.red})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔥</div>
        <div>
          <div style={{ fontSize: 12, color: C.orange, letterSpacing: 1, fontWeight: 700 }}>PYTHON LAB › CHECKPOINT · EXP 1 & 2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Mini-Project Crucible</div>
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
