// UnitLAB4_5 — 🔥 Checkpoint: Mini-Project Crucible (Experiments 3 & 4)
// ─────────────────────────────────────────────────────────────────────
// A gated, CRUCIBLE-STYLE assessment (same Spark → Flame → Forge → Temper
// arc as UnitLAB2_5), restructured around the lab manual's FOUR
// mini-project tracks. It tests Experiment 3 (classes, objects,
// encapsulation) and Experiment 4 (inheritance & polymorphism) ENTIRELY
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
//                          (e.g. "UnitLAB4_5@A_spark") to the Events/Progress
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
// this one forges the OOP half of each track: a class with encapsulation
// (Exp 3) and a subclass that overrides a method — polymorphism (Exp 4).
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

const UNIT_ID = "UnitLAB4_5";
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
//  All code is drawn from Experiments 3 & 4 applied to THAT track.
//  Every program here was verified in real CPython (visible + hidden).
// ═════════════════════════════════════════════════════════════════════
const TRACKS = [
  // ─────────────────────────── TRACK A ───────────────────────────
  {
    key: "A", icon: "🅰", title: "Patient Vitals Monitor",
    blurb: "Model a reading as an object, then give temperature and pulse their own overridden classify() — one call, many behaviours.",
    spark: {
      questions: [
        {
          kind: "mcq",
          code: "class Patient:\n    def __init__(self, name, temp):\n        self.name = name\n        self.temp = temp\n    def is_fever(self):\n        return self.temp >= 38.0\np = Patient(\"Ravi\", 39.0)\nprint(p.is_fever())",
          options: ["True", "False", "39.0", "Error"],
          answer: 0,
          hints: ["is_fever reads the object's own self.temp, stored by __init__.", "Is 39.0 >= 38.0?"],
          why: "__init__ stored self.temp = 39.0, and the method returns self.temp >= 38.0, which is True.",
        },
        {
          kind: "mcq",
          code: "class Reading:\n    def label(self):\n        return \"reading\"\nclass TempReading(Reading):\n    def label(self):\n        return \"temperature\"\nr = TempReading()\nprint(r.label())",
          options: ["temperature", "reading", "reading temperature", "Error"],
          answer: 0,
          hints: ["TempReading inherits from Reading but defines its OWN label().", "When a child redefines a method, the child's version wins — that's overriding."],
          why: "TempReading overrides label(), so the child's version runs and prints \"temperature\" — the parent's is shadowed.",
        },
        {
          kind: "trace",
          code: "class Patient:\n    def __init__(self, temp):\n        self.temp = temp\npatients = [Patient(36.5), Patient(39.0), Patient(38.2)]\nfever = 0\nfor p in patients:\n    if p.temp >= 38.0:\n        fever = fever + 1\nprint(fever)",
          expect: "2",
          prompt: "Trace the loop over the list of objects: what number prints? Type it below.",
          hints: ["Each Patient carries its own self.temp. Check each against 38.0.", "36.5 no, 39.0 yes (fever→1), 38.2 yes (fever→2)."],
          why: "Two patient objects have temp at or above 38.0 (39.0 and 38.2), so fever ends at 2.",
        },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "This Patient should report a fever — but Python crashes before it can (TypeError). Click the buggy line.",
          lines: ["class Patient:", "    def __init__(self, temp):", "        self.temp = temp", "    def is_fever():", "        return self.temp >= 38.0", "p = Patient(39.0)", "print(p.is_fever())"],
          buggyLine: 3,
          lineHints: { 0: "The class header is fine.", 1: "__init__ takes self correctly.", 2: "Storing self.temp — fine.", 4: "The body is correct; the error is in the method's header above.", 5: "Creating the object is fine.", 6: "The call never runs — Python stopped earlier." },
          fixes: ["def is_fever(self):", "def is_fever(temp):", "def is_fever(self, temp):"],
          fixAnswer: 0,
          fixHints: ["Every method's first parameter is the object itself — self.", "p.is_fever() secretly passes p as that first argument, so the method MUST accept self."],
          why: "A method called as p.is_fever() automatically receives the object as its first argument, so it must be declared def is_fever(self):.",
        },
        {
          intro: "TempReading should report FEVER — but this prints NORMAL. No crash, just the wrong answer. Click the faulty line.",
          lines: ["class Reading:", "    def status(self):", "        return \"NORMAL\"", "class TempReading(Reading):", "    def temp_status(self):", "        return \"FEVER\"", "r = TempReading()", "print(r.status())"],
          buggyLine: 4,
          lineHints: { 0: "The base class is fine.", 1: "The base status() method is fine.", 2: "Returns NORMAL — fine.", 3: "The inheritance header is correct.", 5: "The body is right, but it lives in a method nobody calls.", 6: "Creating the object is fine.", 7: "This calls status(), not temp_status()." },
          fixes: ["def status(self):", "def status():", "def temp_status(self, status):"],
          fixAnswer: 0,
          fixHints: ["To OVERRIDE a method, the child must use the SAME name as the parent.", "status() is called, but the child defined temp_status() — a different name — so the parent's NORMAL runs instead."],
          why: "Overriding needs the same method name. Named temp_status(), it never overrides status(), so the inherited NORMAL runs. Rename it to status().",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-3 Patient class: store the name and temperature, then expose an is_fever() method. Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "class Patient:", defines: "cls", needs: [] },
        { code: "    def __init__(self, name, temp):", defines: "init", needs: ["cls"] },
        { code: "        self.name = name", defines: "fname", needs: ["init"] },
        { code: "        self.temp = temp", defines: "ftemp", needs: ["fname"] },
        { code: "    def is_fever(self):", defines: "mdef", needs: ["ftemp"] },
        { code: "        return self.temp >= 38.0", defines: "mbody", needs: ["mdef"] },
        { code: "p = Patient(\"Ravi\", 39.0)", defines: "obj", needs: ["mbody"] },
        { code: "print(p.is_fever())", defines: null, needs: ["obj"] },
      ],
      MSG: {
        cls: "the class Patient: header has to come first — everything else lives inside or after it",
        init: "define __init__ before the lines that store attributes in it",
        fname: "self.name is set inside __init__, so __init__ must appear above it",
        ftemp: "set self.temp after self.name, still inside __init__",
        mdef: "finish __init__ before starting the is_fever method",
        mbody: "the return line belongs inside is_fever, so its def must be above it",
        obj: "you can only create a Patient after the whole class is defined",
      },
      shuffled: [3, 4, 5, 6, 7, 0, 1, 2],
      success: "Attributes stored, method exposed, object used — the Patient class reads cleanly top to bottom. ⚒️",
    },
    temper: {
      task: "Write a base class Reading with __init__(self, value) and a method classify() returning \"NORMAL\". Then write TWO subclasses of Reading, each overriding classify(): TempReading returns \"FEVER\" when self.value >= 38.0 else \"NORMAL\"; PulseReading returns \"HIGH\" when self.value > 100 else \"NORMAL\". Finally print TempReading(temp).classify() and PulseReading(pulse).classify().",
      varNote: "temp = 39.0, pulse = 88 (re-run with hidden values)",
      tests: [
        { pre: "temp = 39.0\npulse = 88\n", expect: "FEVER\nNORMAL", label: "fever + normal pulse" },
        { pre: "temp = 37.0\npulse = 120\n", expect: "NORMAL\nHIGH", label: "hidden: normal temp + high pulse" },
      ],
      hints: [
        "One base class holds __init__ + a default classify(); each subclass redefines classify() with its own rule. Same method name = overriding.",
        "class Reading: def __init__(self, value): self.value = value / def classify(self): return \"NORMAL\". Then class TempReading(Reading): def classify(self): return \"FEVER\" if self.value >= 38.0 else \"NORMAL\" — and similarly PulseReading. Print each object's classify().",
      ],
      fbTarget: [
        { code: "class Reading:", defines: "rcls", needs: [] },
        { code: "    def __init__(self, value):", defines: "rinit", needs: ["rcls"] },
        { code: "        self.value = value", defines: "rval", needs: ["rinit"] },
        { code: "    def classify(self):", defines: "rclf", needs: ["rval"] },
        { code: "        return \"NORMAL\"", defines: "rbody", needs: ["rclf"] },
        { code: "class TempReading(Reading):", defines: "tcls", needs: ["rbody"] },
        { code: "    def classify(self):", defines: "tclf", needs: ["tcls"] },
        { code: "        return \"FEVER\" if self.value >= 38.0 else \"NORMAL\"", defines: "tbody", needs: ["tclf"] },
        { code: "class PulseReading(Reading):", defines: "pcls", needs: ["tbody"] },
        { code: "    def classify(self):", defines: "pclf", needs: ["pcls"] },
        { code: "        return \"HIGH\" if self.value > 100 else \"NORMAL\"", defines: "pbody", needs: ["pclf"] },
        { code: "print(TempReading(temp).classify())", defines: "pr1", needs: ["pbody"] },
        { code: "print(PulseReading(pulse).classify())", defines: null, needs: ["pr1"] },
      ],
      fbOrder: [5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4],
    },
  },

  // ─────────────────────────── TRACK B ───────────────────────────
  {
    key: "B", icon: "🅱", title: "Pharmacy Stock Manager",
    blurb: "Wrap a stock item in a class, then let a Medicine subclass override status() — a generic shelf item and a medicine answer the same call differently.",
    spark: {
      questions: [
        {
          kind: "mcq",
          code: "class Medicine:\n    def __init__(self, name, qty):\n        self.name = name\n        self.qty = qty\n    def low(self, level):\n        return self.qty < level\nm = Medicine(\"aspirin\", 3)\nprint(m.low(10))",
          options: ["True", "False", "3", "Error"],
          answer: 0,
          hints: ["low() compares the object's own self.qty against the level you pass in.", "Is 3 < 10?"],
          why: "self.qty is 3 and the method returns self.qty < level, i.e. 3 < 10, which is True.",
        },
        {
          kind: "mcq",
          code: "class Item:\n    def __init__(self, name):\n        self.name = name\nclass Medicine(Item):\n    def tag(self):\n        return \"MED-\" + self.name\nm = Medicine(\"aspirin\")\nprint(m.tag())",
          options: ["MED-aspirin", "aspirin", "MED-", "MED-self.name"],
          answer: 0,
          hints: ["Medicine has no __init__ of its own, so it inherits Item's.", "self.name was set by the inherited __init__; tag() just prepends \"MED-\"."],
          why: "Medicine inherits Item's __init__, so self.name = \"aspirin\"; tag() returns \"MED-\" + self.name = \"MED-aspirin\".",
        },
        {
          kind: "trace",
          code: "class Medicine:\n    def __init__(self, qty):\n        self.qty = qty\nstock = [Medicine(4), Medicine(20), Medicine(8)]\nlow = 0\nfor m in stock:\n    if m.qty < 10:\n        low = low + 1\nprint(low)",
          expect: "2",
          prompt: "Trace the loop over the list of Medicine objects: what prints? Type the number.",
          hints: ["Each object carries its own self.qty: 4, 20, 8.", "Count how many are below 10: 4 yes, 20 no, 8 yes."],
          why: "Two medicines have qty below 10 (4 and 8), so low ends at 2.",
        },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "Creating this Medicine then calling is_low() crashes (AttributeError). Click the line that causes it.",
          lines: ["class Medicine:", "    def __init__(self, qty):", "        qty = qty", "    def is_low(self):", "        return self.qty < 10", "m = Medicine(3)", "print(m.is_low())"],
          buggyLine: 2,
          lineHints: { 0: "The class header is fine.", 1: "__init__ takes self and qty correctly.", 3: "The method header is fine.", 4: "This reads self.qty — but was self.qty ever set?", 5: "Creating the object is fine.", 6: "The call fails because the attribute is missing." },
          fixes: ["self.qty = qty", "self = qty", "qty = self.qty"],
          fixAnswer: 0,
          fixHints: ["qty = qty just reassigns a LOCAL variable that vanishes when __init__ ends — the object keeps nothing.", "To store a value ON the object, assign it to self.something."],
          why: "qty = qty only touches a local variable; the object never gets a qty attribute, so self.qty later raises AttributeError. Store it with self.qty = qty.",
        },
        {
          intro: "With stock 10 and level 10 this wrongly says it needs a reorder. No crash — just wrong. Click the faulty line.",
          lines: ["class Medicine:", "    def __init__(self, qty, level):", "        self.qty = qty", "        self.level = level", "    def needs_reorder(self):", "        return self.qty <= self.level", "m = Medicine(10, 10)", "print(m.needs_reorder())"],
          buggyLine: 5,
          lineHints: { 0: "The class header is fine.", 1: "__init__ is fine.", 2: "Storing self.qty — fine.", 3: "Storing self.level — fine.", 4: "The method header is fine.", 6: "10 and 10 are exactly the values we're testing.", 7: "The call just reports what the method returns." },
          fixes: ["return self.qty < self.level", "return self.qty > self.level", "return self.qty == self.level"],
          fixAnswer: 0,
          fixHints: ["At exactly the reorder level you still have enough — only reorder when strictly BELOW it.", "<= includes the boundary; you want < ."],
          why: "<= treats qty == level as needing a reorder, but at exactly the level stock is still fine. Use strictly-below: self.qty < self.level.",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-3 Medicine class: store the name and quantity, then expose an is_low(level) method. Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "class Medicine:", defines: "cls", needs: [] },
        { code: "    def __init__(self, name, qty):", defines: "init", needs: ["cls"] },
        { code: "        self.name = name", defines: "fname", needs: ["init"] },
        { code: "        self.qty = qty", defines: "fqty", needs: ["fname"] },
        { code: "    def is_low(self, level):", defines: "mdef", needs: ["fqty"] },
        { code: "        return self.qty < level", defines: "mbody", needs: ["mdef"] },
        { code: "m = Medicine(\"aspirin\", 3)", defines: "obj", needs: ["mbody"] },
        { code: "print(m.is_low(10))", defines: null, needs: ["obj"] },
      ],
      MSG: {
        cls: "the class Medicine: header has to come first",
        init: "define __init__ before the lines that store attributes in it",
        fname: "self.name is set inside __init__, so __init__ must appear above it",
        fqty: "set self.qty after self.name, still inside __init__",
        mdef: "finish __init__ before starting the is_low method",
        mbody: "the return line belongs inside is_low, so its def must be above it",
        obj: "you can only create a Medicine after the whole class is defined",
      },
      shuffled: [5, 6, 7, 0, 1, 2, 3, 4],
      success: "Name and quantity stored, the low-stock check exposed — the Medicine class is forged. ⚒️",
    },
    temper: {
      task: "Write a base class StockItem with __init__(self, qty) and a method status() returning \"OK\". Then write a subclass Medicine(StockItem) that overrides status() to return \"REORDER\" when self.qty < 10 else \"OK\". Finally print StockItem(shelf_qty).status() and Medicine(med_qty).status().",
      varNote: "shelf_qty = 5, med_qty = 5 (re-run with hidden values)",
      tests: [
        { pre: "shelf_qty = 5\nmed_qty = 5\n", expect: "OK\nREORDER", label: "plain shelf item vs low medicine" },
        { pre: "shelf_qty = 5\nmed_qty = 50\n", expect: "OK\nOK", label: "hidden: medicine well stocked" },
      ],
      hints: [
        "The base StockItem.status() always returns \"OK\". The Medicine subclass redefines status() with a real rule — same method name, so it overrides.",
        "class StockItem: def __init__(self, qty): self.qty = qty / def status(self): return \"OK\". Then class Medicine(StockItem): def status(self): return \"REORDER\" if self.qty < 10 else \"OK\". Print both objects' status().",
      ],
      fbTarget: [
        { code: "class StockItem:", defines: "scls", needs: [] },
        { code: "    def __init__(self, qty):", defines: "sinit", needs: ["scls"] },
        { code: "        self.qty = qty", defines: "sqty", needs: ["sinit"] },
        { code: "    def status(self):", defines: "sdef", needs: ["sqty"] },
        { code: "        return \"OK\"", defines: "sbody", needs: ["sdef"] },
        { code: "class Medicine(StockItem):", defines: "mcls", needs: ["sbody"] },
        { code: "    def status(self):", defines: "mdef", needs: ["mcls"] },
        { code: "        return \"REORDER\" if self.qty < 10 else \"OK\"", defines: "mbody", needs: ["mdef"] },
        { code: "print(StockItem(shelf_qty).status())", defines: "pr1", needs: ["mbody"] },
        { code: "print(Medicine(med_qty).status())", defines: null, needs: ["pr1"] },
      ],
      fbOrder: [3, 4, 5, 6, 7, 8, 9, 0, 1, 2],
    },
  },

  // ─────────────────────────── TRACK C ───────────────────────────
  {
    key: "C", icon: "🅲", title: "Clinic Appointment Book",
    blurb: "Model a slot as an object, then let a SmartSlot subclass override status() so a plain slot and a smart slot answer the same call differently.",
    spark: {
      questions: [
        {
          kind: "mcq",
          code: "class Slot:\n    def __init__(self, time, patient):\n        self.time = time\n        self.patient = patient\n    def is_free(self):\n        return self.patient is None\ns = Slot(\"09:00\", None)\nprint(s.is_free())",
          options: ["True", "False", "None", "Error"],
          answer: 0,
          hints: ["A slot is free when its patient is None.", "self.patient was set to None, and the method returns self.patient is None."],
          why: "self.patient is None, and is_free() returns self.patient is None, which is True.",
        },
        {
          kind: "mcq",
          code: "class Appointment:\n    def __init__(self, time):\n        self.time = time\nclass OPDAppointment(Appointment):\n    def describe(self):\n        return \"OPD at \" + self.time\na = OPDAppointment(\"10:00\")\nprint(a.describe())",
          options: ["OPD at 10:00", "10:00", "OPD at ", "OPD at self.time"],
          answer: 0,
          hints: ["OPDAppointment has no __init__, so it inherits Appointment's.", "self.time came from the inherited __init__; describe() just builds a string with it."],
          why: "OPDAppointment inherits Appointment's __init__, so self.time = \"10:00\"; describe() returns \"OPD at \" + self.time.",
        },
        {
          kind: "trace",
          code: "class Slot:\n    def __init__(self, patient):\n        self.patient = patient\nday = [Slot(\"Ravi\"), Slot(None), Slot(None)]\nfree = 0\nfor s in day:\n    if s.patient is None:\n        free = free + 1\nprint(free)",
          expect: "2",
          prompt: "Trace the loop over the Slot objects: how many free slots? Type the number.",
          hints: ["Each Slot carries its own self.patient.", "Count the ones holding None: \"Ravi\" no, None yes, None yes."],
          why: "Two slot objects hold None, so free ends at 2.",
        },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "Calling is_free() on this Slot crashes (AttributeError). Click the buggy line.",
          lines: ["class Slot:", "    def __init__(self, patient):", "        self.patient = patient", "    def is_free(self):", "        return self.patients is None", "s = Slot(None)", "print(s.is_free())"],
          buggyLine: 4,
          lineHints: { 0: "The class header is fine.", 1: "__init__ is fine.", 2: "Storing self.patient — fine.", 3: "The method header is fine.", 5: "Creating the object is fine.", 6: "The call fails because the method reads an attribute that doesn't exist." },
          fixes: ["return self.patient is None", "return self.patient is not None", "return patients is None"],
          fixAnswer: 0,
          fixHints: ["__init__ stored self.patient (singular) — but the method reads self.patients (plural).", "The attribute names must match exactly, character for character."],
          why: "The object has self.patient, but the method reads self.patients — a name that was never set — so Python raises AttributeError. Match the name: self.patient.",
        },
        {
          intro: "An empty slot (patient None) should be free — but this says it's NOT free. No crash, just inverted. Click the faulty line.",
          lines: ["class Slot:", "    def __init__(self, patient):", "        self.patient = patient", "    def is_free(self):", "        return self.patient is not None", "s = Slot(None)", "print(s.is_free())"],
          buggyLine: 4,
          lineHints: { 0: "The class header is fine.", 1: "__init__ is fine.", 2: "Storing self.patient — fine.", 3: "The method header is fine.", 5: "Slot(None) is exactly the empty case we're testing.", 6: "The call just reports what the method returns." },
          fixes: ["return self.patient is None", "return self.patient == None", "return not self.patient is None"],
          fixAnswer: 0,
          fixHints: ["\"free\" means there is NO patient — i.e. patient IS None.", "is not None asks the opposite question; drop the \"not\"."],
          why: "is not None is the opposite test: it is True only when a slot IS booked. Free means self.patient is None.",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-3 Slot class: store the time and patient, then expose an is_free() method. Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "class Slot:", defines: "cls", needs: [] },
        { code: "    def __init__(self, time, patient):", defines: "init", needs: ["cls"] },
        { code: "        self.time = time", defines: "ftime", needs: ["init"] },
        { code: "        self.patient = patient", defines: "fpat", needs: ["ftime"] },
        { code: "    def is_free(self):", defines: "mdef", needs: ["fpat"] },
        { code: "        return self.patient is None", defines: "mbody", needs: ["mdef"] },
        { code: "s = Slot(\"09:00\", None)", defines: "obj", needs: ["mbody"] },
        { code: "print(s.is_free())", defines: null, needs: ["obj"] },
      ],
      MSG: {
        cls: "the class Slot: header has to come first",
        init: "define __init__ before the lines that store attributes in it",
        ftime: "self.time is set inside __init__, so __init__ must appear above it",
        fpat: "set self.patient after self.time, still inside __init__",
        mdef: "finish __init__ before starting the is_free method",
        mbody: "the return line belongs inside is_free, so its def must be above it",
        obj: "you can only create a Slot after the whole class is defined",
      },
      shuffled: [3, 4, 5, 6, 7, 0, 1, 2],
      success: "Time and patient stored, the free-check exposed — the Slot class is forged. ⚒️",
    },
    temper: {
      task: "Write a base class Slot with __init__(self, patient) and a method status() returning \"BOOKED\". Then write a subclass SmartSlot(Slot) that overrides status() to return \"FREE\" when self.patient is None else \"BOOKED\". A patient value is pre-set (a name, or None for an empty slot). Finally print Slot(patient).status() and SmartSlot(patient).status().",
      varNote: "patient = None (re-run with a hidden value)",
      tests: [
        { pre: "patient = None\n", expect: "BOOKED\nFREE", label: "plain slot ignores emptiness; smart slot sees it" },
        { pre: "patient = \"Ravi\"\n", expect: "BOOKED\nBOOKED", label: "hidden: slot is actually booked" },
      ],
      hints: [
        "The base Slot.status() always says \"BOOKED\". SmartSlot overrides status() with a rule that actually checks self.patient — same method name, so it overrides.",
        "class Slot: def __init__(self, patient): self.patient = patient / def status(self): return \"BOOKED\". Then class SmartSlot(Slot): def status(self): return \"FREE\" if self.patient is None else \"BOOKED\". Print both objects' status().",
      ],
      fbTarget: [
        { code: "class Slot:", defines: "scls", needs: [] },
        { code: "    def __init__(self, patient):", defines: "sinit", needs: ["scls"] },
        { code: "        self.patient = patient", defines: "spat", needs: ["sinit"] },
        { code: "    def status(self):", defines: "sdef", needs: ["spat"] },
        { code: "        return \"BOOKED\"", defines: "sbody", needs: ["sdef"] },
        { code: "class SmartSlot(Slot):", defines: "mcls", needs: ["sbody"] },
        { code: "    def status(self):", defines: "mdef", needs: ["mcls"] },
        { code: "        return \"FREE\" if self.patient is None else \"BOOKED\"", defines: "mbody", needs: ["mdef"] },
        { code: "print(Slot(patient).status())", defines: "pr1", needs: ["mbody"] },
        { code: "print(SmartSlot(patient).status())", defines: null, needs: ["pr1"] },
      ],
      fbOrder: [7, 8, 9, 0, 1, 2, 3, 4, 5, 6],
    },
  },

  // ─────────────────────────── TRACK D ───────────────────────────
  {
    key: "D", icon: "🅳", title: "Health-Camp Screening Analyzer",
    blurb: "Model a visitor as an object, then let a Screened subclass override risk() so a generic visitor and a screened one answer the same call differently.",
    spark: {
      questions: [
        {
          kind: "mcq",
          code: "class Visitor:\n    def __init__(self, name, bmi):\n        self.name = name\n        self.bmi = bmi\n    def is_normal(self):\n        return self.bmi < 25\nv = Visitor(\"Ravi\", 22.0)\nprint(v.is_normal())",
          options: ["True", "False", "22.0", "Error"],
          answer: 0,
          hints: ["is_normal reads the object's own self.bmi.", "Is 22.0 < 25?"],
          why: "self.bmi is 22.0 and the method returns self.bmi < 25, i.e. 22.0 < 25, which is True.",
        },
        {
          kind: "mcq",
          code: "class Person:\n    def __init__(self, weight, height):\n        self.weight = weight\n        self.height = height\nclass Visitor(Person):\n    def bmi(self):\n        return self.weight / (self.height ** 2)\nv = Visitor(60, 2.0)\nprint(v.bmi())",
          options: ["15.0", "30.0", "120.0", "Error"],
          answer: 0,
          hints: ["Visitor inherits Person's __init__, so self.weight = 60 and self.height = 2.0.", "60 / (2.0 ** 2) = 60 / 4.0."],
          why: "self.height ** 2 is 4.0, and 60 / 4.0 is 15.0 (division gives a float).",
        },
        {
          kind: "trace",
          code: "class Visitor:\n    def __init__(self, bmi):\n        self.bmi = bmi\npeople = [Visitor(22.0), Visitor(27.5), Visitor(24.9)]\nnormal = 0\nfor v in people:\n    if v.bmi < 25:\n        normal = normal + 1\nprint(normal)",
          expect: "2",
          prompt: "Trace the loop over the Visitor objects: what prints? Type the number.",
          hints: ["Each Visitor carries its own self.bmi: 22.0, 27.5, 24.9.", "Count how many are below 25: 22.0 yes, 27.5 no, 24.9 yes."],
          why: "Two visitors have BMI below 25 (22.0 and 24.9), so normal ends at 2.",
        },
      ],
    },
    flame: {
      bugs: [
        {
          intro: "Calling bmi() on this Visitor crashes (NameError). Click the buggy line.",
          lines: ["class Visitor:", "    def __init__(self, weight, height):", "        self.weight = weight", "        self.height = height", "    def bmi(self):", "        return weight / (self.height ** 2)", "v = Visitor(60, 1.7)", "print(v.bmi())"],
          buggyLine: 5,
          lineHints: { 0: "The class header is fine.", 1: "__init__ is fine.", 2: "Storing self.weight — fine.", 3: "Storing self.height — fine.", 4: "The method header is fine.", 6: "Creating the object is fine.", 7: "The call fails inside the method, on the line above." },
          fixes: ["return self.weight / (self.height ** 2)", "return self.weight / (height ** 2)", "return self.weight // (self.height ** 2)"],
          fixAnswer: 0,
          fixHints: ["Inside a method, the object's data lives on self — bare weight is not defined there.", "You wrote self.height correctly; do the same for weight."],
          why: "weight is not a local variable inside bmi(); the object's value is self.weight. Bare weight raises NameError — use self.weight.",
        },
        {
          intro: "A BMI of 27 should count as overweight — but this says it is NOT. No crash, just inverted. Click the faulty line.",
          lines: ["class Visitor:", "    def __init__(self, bmi):", "        self.bmi = bmi", "    def is_overweight(self):", "        return self.bmi < 25", "v = Visitor(27.0)", "print(v.is_overweight())"],
          buggyLine: 4,
          lineHints: { 0: "The class header is fine.", 1: "__init__ is fine.", 2: "Storing self.bmi — fine.", 3: "The method header is fine.", 5: "Visitor(27.0) is exactly the value we're testing.", 6: "The call just reports what the method returns." },
          fixes: ["return self.bmi >= 25", "return self.bmi <= 25", "return self.bmi == 25"],
          fixAnswer: 0,
          fixHints: ["Overweight means the BMI is AT or ABOVE 25, not below it.", "< 25 is the test for NORMAL; flip it to >= 25 for overweight."],
          why: "< 25 is the normal-weight test; overweight is the opposite. Use self.bmi >= 25.",
        },
      ],
    },
    forge: {
      intro: "Rebuild the Experiment-3 Visitor class: store the name and BMI, then expose an is_normal() method. Use ↑↓ to order the scrambled lines.",
      target: [
        { code: "class Visitor:", defines: "cls", needs: [] },
        { code: "    def __init__(self, name, bmi):", defines: "init", needs: ["cls"] },
        { code: "        self.name = name", defines: "fname", needs: ["init"] },
        { code: "        self.bmi = bmi", defines: "fbmi", needs: ["fname"] },
        { code: "    def is_normal(self):", defines: "mdef", needs: ["fbmi"] },
        { code: "        return self.bmi < 25", defines: "mbody", needs: ["mdef"] },
        { code: "v = Visitor(\"Ravi\", 22.0)", defines: "obj", needs: ["mbody"] },
        { code: "print(v.is_normal())", defines: null, needs: ["obj"] },
      ],
      MSG: {
        cls: "the class Visitor: header has to come first",
        init: "define __init__ before the lines that store attributes in it",
        fname: "self.name is set inside __init__, so __init__ must appear above it",
        fbmi: "set self.bmi after self.name, still inside __init__",
        mdef: "finish __init__ before starting the is_normal method",
        mbody: "the return line belongs inside is_normal, so its def must be above it",
        obj: "you can only create a Visitor after the whole class is defined",
      },
      shuffled: [5, 6, 7, 0, 1, 2, 3, 4],
      success: "Name and BMI stored, the normal-check exposed — the Visitor class is forged. ⚒️",
    },
    temper: {
      task: "Write a base class Visitor with __init__(self, bmi) and a method risk() returning \"LOW\". Then write a subclass Screened(Visitor) that overrides risk() to return \"HIGH\" when self.bmi >= 25 else \"LOW\". A bmi value is pre-set. Finally print Visitor(bmi).risk() and Screened(bmi).risk().",
      varNote: "bmi = 27.0 (re-run with a hidden value)",
      tests: [
        { pre: "bmi = 27.0\n", expect: "LOW\nHIGH", label: "plain visitor vs screened (overweight)" },
        { pre: "bmi = 22.0\n", expect: "LOW\nLOW", label: "hidden: BMI in the normal range" },
      ],
      hints: [
        "The base Visitor.risk() always returns \"LOW\". Screened overrides risk() with a rule that checks self.bmi — same method name, so it overrides.",
        "class Visitor: def __init__(self, bmi): self.bmi = bmi / def risk(self): return \"LOW\". Then class Screened(Visitor): def risk(self): return \"HIGH\" if self.bmi >= 25 else \"LOW\". Print both objects' risk().",
      ],
      fbTarget: [
        { code: "class Visitor:", defines: "scls", needs: [] },
        { code: "    def __init__(self, bmi):", defines: "sinit", needs: ["scls"] },
        { code: "        self.bmi = bmi", defines: "sbmi", needs: ["sinit"] },
        { code: "    def risk(self):", defines: "sdef", needs: ["sbmi"] },
        { code: "        return \"LOW\"", defines: "sbody", needs: ["sdef"] },
        { code: "class Screened(Visitor):", defines: "mcls", needs: ["sbody"] },
        { code: "    def risk(self):", defines: "mdef", needs: ["mcls"] },
        { code: "        return \"HIGH\" if self.bmi >= 25 else \"LOW\"", defines: "mbody", needs: ["mdef"] },
        { code: "print(Visitor(bmi).risk())", defines: "pr1", needs: ["mbody"] },
        { code: "print(Screened(bmi).risk())", defines: null, needs: ["pr1"] },
      ],
      fbOrder: [3, 4, 5, 6, 7, 8, 9, 0, 1, 2],
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
        {intro} Indented lines belong to the <em>class</em>, the <em>method</em>, or <em>__init__</em> above them, so structure matters as much as order. ⚒️
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
      setMessage("All tests passed — including the hidden ones. Your project's OOP core works for real.");
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
        and it runs, for real, right here. This is the OOP heart of your mini-project. 🗡️
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
//  each stage as "UnitLAB4_5@<key>_<stageId>"; when all four are done it
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
        Predicted object behaviour, hunted OOP bugs, rebuilt your Experiment-3 class, and wrote the real subclass
        that overrides a method — all four stages, on YOUR chosen track. Experiments 3 & 4 aren't just learned;
        the classes at the heart of your capstone now exist.
      </div>
      <div style={{ marginTop: 20, padding: 18, borderRadius: 12, display: "inline-block", background: `linear-gradient(135deg, ${C.orange}22, ${C.red}22)`, border: `1px solid ${C.orange}66` }}>
        <div style={{ fontSize: 30 }}>🏅</div>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginTop: 6 }}>Mini-Project Checkpoint · Exp 3 & 4</div>
        <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Spark ✓ · Flame ✓ · Forge ✓ · Temper ✓</div>
      </div>
      {!claimed ? (
        <div style={{ marginTop: 20 }}>
          <button onClick={onClaim} style={{
            padding: "12px 28px", borderRadius: 10, border: "none",
            background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
            color: "#0D1117", fontWeight: 800, fontSize: 15, cursor: "pointer",
          }}>🏅 Submit checkpoint to my record</button>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 10 }}>One track per crucible is all you need — you can still come back and try the others.</div>
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
        ⚔️ <strong style={{ color: C.orange }}>Same track, next forging.</strong> This checkpoint proves Experiments 3 & 4 —
        classes, encapsulation, inheritance and polymorphism — entirely through your mini-project. Stay on the track you
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
export default function UnitLAB4_5({ student, onUnitComplete, challengeProgress = [], onStageComplete }) {
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
          <div style={{ fontSize: 12, color: C.orange, letterSpacing: 1, fontWeight: 700 }}>PYTHON LAB › CHECKPOINT · EXP 3 & 4</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Mini-Project Crucible — Objects & Inheritance</div>
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
            />
          : <TrackChooser challengeProgress={challengeProgress} onPick={setSelected} />}
      </div>
    </div>
  );
}
