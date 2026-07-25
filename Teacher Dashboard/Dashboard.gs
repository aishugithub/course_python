// ============================================================================
//  DASHBOARD.GS  —  TEACHER PROGRESS DASHBOARD  (server side)
//  Foothold courses: Python Programming + Computer Organization & Architecture
//  Plus the Python Lab MED23CL202 e-Record for one specific med class.
//  ----------------------------------------------------------------------------
//  WHAT THIS PROJECT IS
//  A SEPARATE, STANDALONE Apps Script web app (NOT any course's Code.gs).
//  The SHARED web pages are READ-ONLY: they read progress from your Foothold
//  backend sheets and the marks from your SEPARATE marks workbook, and only
//  DISPLAY them. No student page can write anything — safe to share.
//  In addition, an OWNER-ONLY nightly job, writeMarks() (Section 11), computes
//  each student's mark and WRITES it into your marks workbook (never a course
//  backend). If you type a mark over a cell it keeps your value; if you leave a
//  cell it refreshes with the calculation. This runs as you, on a time trigger
//  — it is NOT reachable from the shared URLs.
//
//  TWO SEPARATE VIEWS, TWO URLs (routed by doGet from this ONE project)
//    • .../exec?view=general  -> General.html
//         Course completion for EVERY student, with a switcher between your two
//         Foothold courses (Python and COA). Each list is sorted by progress
//         (highest first) so you instantly see who is nearing completion.
//    • .../exec?view=med      -> Med.html
//         ONLY your 59 med students (roster below), reg-no order. Two sub-views:
//         (1) Lab progress — a wide matrix of the 11 experiments, each cell a
//         completion tick + date/time, plus per-experiment defaulters;
//         (2) Marks — the /10 you award, read from the separate marks sheet.
//
//  HOW THE PIECES FIT TOGETHER
//    • doGet(e) reads ?view= and serves General.html or Med.html.
//    • General.html calls getGeneralData(); Med.html calls getMedData().
//    • Both are pure reads — there is no write path anywhere in this file.
//
//  THE DATA MODEL WE READ (identical Foothold template in every course sheet)
//  Tab `Progress` : RollNo | CourseId | UnitId | CompletedAt
//  UnitId, told apart by "@":
//    • plain "Unit5_2"           = a full COURSE unit completed.
//    • "UnitLAB1@p1_algo"         = one STAGE of a lab experiment (Python only).
//    • plain "UnitLAB1"           = the whole experiment RECORD submitted.
//  CompletedAt = the ISO timestamp -> the date-under-the-tick in the MED matrix.
// ============================================================================


// ----------------------------------------------------------------------------
//  SECTION 1 — CONFIGURATION
// ----------------------------------------------------------------------------
//  Backend spreadsheet IDs (the long code in each sheet URL between /d/ and /edit).
const PYTHON_SHEET_ID = '1XDUgokksXkRRJzA6-3ZwE-TJDEllm7jEUp19KQ6UuaE';   // course_python backend
const COA_SHEET_ID    = '1adLuz2mnGdeBQtcZWiicW1E9Djtfjs5mR4QepdwDbfk';   // course_COA backend

const STUDENTS_SHEET = 'Students';   // RollNo | Password | Name | Batch | Email
const PROGRESS_SHEET = 'Progress';   // RollNo | CourseId | UnitId | CompletedAt
const TIMEZONE       = 'Asia/Kolkata';

//  MARKS live in a BRAND NEW, SEPARATE Google Sheet (never a course backend).
//  Create it, import Marks_template.csv into a tab named `Marks`, paste its ID
//  here, and type marks in it by hand each week. The dashboard only READS it.
const MARKS_SPREADSHEET_ID = '1ZbQhvnjrjKQ_ZkE0PhzeiWbzIYZmtUmlGZn5tlS7Dg0';  // your marks workbook
const MARKS_TAB    = 'Marks';      // OVERRIDES (wide): RollNo | Name | Exp1 … Exp10 | MiniProject  (blank = use auto)
const DUEDATES_TAB = 'DueDates';   // two columns: Experiment | DueDate  (Experiment = 1..10 or MP; date YYYY-MM-DD)

//  --- MARKS CALCULATION POLICY (from your choices) --------------------------
//  A student's auto mark for an experiment = weighted completion (out of 10),
//  then a lateness penalty. The Program stage carries the most weight — the
//  per-stage weights live on LAB_STAGE_TEMPLATE below and sum to 10. Lateness
//  removes LATE_PCT_PER_DAY of the earned mark for each day past that
//  experiment's due date, and it can fall all the way to zero (LATE_FLOOR=0).
//  Any non-blank value you type in the Marks tab OVERRIDES the auto mark.
const LATE_PCT_PER_DAY = 0.10;   // 10% of the earned mark, per day late
const LATE_FLOOR       = 0.00;   // lowest multiplier (0 => mark can reach zero)


// ----------------------------------------------------------------------------
//  SECTION 2 — COURSE REGISTRY  (mirrors each course.config.js, MANDATORY units)
//  ----------------------------------------------------------------------------
//  Add a course by adding an entry here: its backend sheet id, its courseId (as
//  recorded in that sheet's Progress tab), and its modules → unit lists. Python
//  excludes optional Crucibles (…_C) and the LAB module (they are optional in
//  its config). COA has NO optional flags, so ALL its units count (incl. the
//  5 Capstones) — 38 in total. Update these lists if you edit a real config.
// ----------------------------------------------------------------------------
const COURSES = [
  {
    key: 'python', courseId: 'course_python',
    title: 'Python Programming', sheetId: PYTHON_SHEET_ID,
    modules: [
      { id: 'M1',   title: 'Computing',                       units: ['Unit1_1','Unit1_2','Unit1_3'] },
      { id: 'M2',   title: 'Computing Languages',             units: ['Unit2_1','Unit2_2','Unit2_3','Unit2_4'] },
      { id: 'M3',   title: 'The Conversion',                  units: ['Unit3_1','Unit3_2','Unit3_3'] },
      { id: 'M4',   title: 'Your First Python Program',       units: ['Unit4_0','Unit4_1','Unit4_2','Unit4_3','Unit4_4'] },
      { id: 'M5',   title: 'Making Decisions',                units: ['Unit5_1','Unit5_2','Unit5_3','Unit5_4'] },
      { id: 'M6',   title: 'Repetition',                      units: ['Unit6_1','Unit6_2','Unit6_3','Unit6_4'] },
      { id: 'M6.5', title: 'Computational Thinking I',        units: ['UnitCT1_1','UnitCT1_2','UnitCT1_3','UnitCT1_4','UnitCT1_5'] },
      { id: 'M7',   title: 'Organizing Data',                 units: ['Unit7_1','Unit7_2','Unit7_3','Unit7_4','Unit7_5','Unit7_6'] },
      { id: 'M7.5', title: 'Computational Thinking II',       units: ['UnitCT2_1','UnitCT2_2','UnitCT2_3','UnitCT2_4','UnitCT2_5'] },
      { id: 'M8',   title: 'Functions & Modular Thinking',    units: ['Unit8_1','Unit8_2','Unit8_3','Unit8_4'] },
      { id: 'M8.5', title: 'Computational Thinking III',      units: ['UnitCT3_1','UnitCT3_2','UnitCT3_3'] },
      { id: 'M9',   title: 'When Things Go Wrong',            units: ['Unit9_1','Unit9_2','Unit9_3','Unit9_4'] },
      { id: 'M10',  title: 'Object-Oriented Programming',     units: ['Unit10_1','Unit10_2','Unit10_3','Unit10_4','Unit10_6','Unit10_7','Unit10_5'] },
      { id: 'M11',  title: 'Pythonic Python & the Ecosystem', units: ['Unit11_1'] },
      { id: 'M12',  title: 'Working with Real Data',          units: ['Unit12_1'] },
      { id: 'M13',  title: 'Data Visualization',              units: ['Unit13_1','Unit13_2','Unit13_3'] },
    ],
  },
  {
    key: 'coa', courseId: 'course_COA',
    title: 'Computer Organization & Architecture', sheetId: COA_SHEET_ID,
    modules: [
      { id: 'M0', title: 'Before the Machine',            units: ['Unit0_1','Unit0_2','Unit0_3'] },
      { id: 'M1', title: 'Basic Structure of Computers',  units: ['Unit1_1','Unit1_2','Unit1_3','Unit1_4','Unit1_5','Unit1_6','Unit1_C'] },
      { id: 'M2', title: 'Inside the Processor',          units: ['Unit2_1','Unit2_2','Unit2_3','Unit2_4','Unit2_5','Unit2_6','Unit2_7','Unit2_C'] },
      { id: 'M3', title: 'Pipelining',                    units: ['Unit3_1','Unit3_2','Unit3_3','Unit3_4','Unit3_5','Unit3_C'] },
      { id: 'M4', title: 'Memory Organization',           units: ['Unit4_1','Unit4_2','Unit4_3','Unit4_4','Unit4_5','Unit4_6','Unit4_C'] },
      { id: 'M5', title: 'Input / Output Organization',   units: ['Unit5_1','Unit5_2','Unit5_3','Unit5_4','Unit5_5','Unit5_6','Unit5_C'] },
    ],
  },
];

//  Precompute each course's flat unit set and total (the % divisor).
COURSES.forEach(function (c) {
  c.unitSet = {};
  c.modules.forEach(function (m) { m.units.forEach(function (u) { c.unitSet[u] = true; }); });
  c.totalUnits = Object.keys(c.unitSet).length;   // Python = 62, COA = 38
});


// ----------------------------------------------------------------------------
//  SECTION 3 — LAB EXPERIMENTS (Python Lab MED23CL202: 10 + Mini-Project)
//  Each stage logged "expId@stageId"; a submitted record is the plain expId.
//  Only Exp 1 is built; set built:true and add a `stages` array as you build
//  the rest. 6-stage template = 2 programs × (algorithm→flowchart→program).
// ----------------------------------------------------------------------------
//  `weight` = marks each subdivision is worth (Algo 1 · Flow 1.5 · Program 2.5
//  per program), summing to 10 across both programs. The Program stage is
//  weighted most, per your choice. If a future experiment uses a different
//  shape, give its stages their own weights; the maths normalises to /10.
const LAB_STAGE_TEMPLATE = [
  { id: 'p1_algo', label: 'P1 · Algorithm', weight: 1.0 },
  { id: 'p1_flow', label: 'P1 · Flowchart', weight: 1.5 },
  { id: 'p1_prog', label: 'P1 · Program',   weight: 2.5 },
  { id: 'p2_algo', label: 'P2 · Algorithm', weight: 1.0 },
  { id: 'p2_flow', label: 'P2 · Flowchart', weight: 1.5 },
  { id: 'p2_prog', label: 'P2 · Program',   weight: 2.5 },
];
const LAB_EXPERIMENTS = [
  { expId: 'UnitLAB1',  no: '1',  co: 'CO1',     short: 'Exp 1',  title: 'Data Types, Operators & Conditional Statements', built: true,  stages: LAB_STAGE_TEMPLATE },
  { expId: 'UnitLAB2',  no: '2',  co: 'CO1',     short: 'Exp 2',  title: 'Loops, Collections & Functions',                 built: false, stages: [] },
  { expId: 'UnitLAB3',  no: '3',  co: 'CO2',     short: 'Exp 3',  title: 'Classes, Objects & Encapsulation',               built: false, stages: [] },
  { expId: 'UnitLAB4',  no: '4',  co: 'CO2',     short: 'Exp 4',  title: 'Inheritance & Polymorphism',                     built: false, stages: [] },
  { expId: 'UnitLAB5',  no: '5',  co: 'CO3',     short: 'Exp 5',  title: 'Reading & Writing Text Files',                   built: false, stages: [] },
  { expId: 'UnitLAB6',  no: '6',  co: 'CO3',     short: 'Exp 6',  title: 'File Operations & CSV Records',                  built: false, stages: [] },
  { expId: 'UnitLAB7',  no: '7',  co: 'CO4',     short: 'Exp 7',  title: 'Exception Handling: try / except',               built: false, stages: [] },
  { expId: 'UnitLAB8',  no: '8',  co: 'CO4',     short: 'Exp 8',  title: 'raise, finally & User-defined Exceptions',       built: false, stages: [] },
  { expId: 'UnitLAB9',  no: '9',  co: 'CO5',     short: 'Exp 9',  title: 'Data Analysis with Pandas',                      built: false, stages: [] },
  { expId: 'UnitLAB10', no: '10', co: 'CO5',     short: 'Exp 10', title: 'Visualization: Matplotlib & Seaborn',            built: false, stages: [] },
  { expId: 'UnitLABMP', no: '—',  co: 'CO1–CO5', short: 'Mini',   title: 'Mini-Project — Final Assembly',                  built: false, stages: [] },
];


// ----------------------------------------------------------------------------
//  SECTION 4 — MED CLASS ROSTER (the whitelist we track to completion)
//  We drive the MED views from THIS list (not the Students tab) so a student who
//  has not logged in yet still appears — and correctly shows as a defaulter.
//  (E0525047 is intentionally absent — not in this class.)
// ----------------------------------------------------------------------------
const MED_ROSTER = [
  { rollNo: 'E0525001', name: 'KAVIYA K' },
  { rollNo: 'E0525002', name: 'AKSHAYA S' },
  { rollNo: 'E0525003', name: 'SUBA SAKTHIVEL V S' },
  { rollNo: 'E0525004', name: 'DHARANIDHARAN S' },
  { rollNo: 'E0525005', name: 'TEJASREE V' },
  { rollNo: 'E0525006', name: 'R A MITHRAN' },
  { rollNo: 'E0525007', name: 'RUVANTHIKA J' },
  { rollNo: 'E0525008', name: 'YUVAN KRISHNAN M D' },
  { rollNo: 'E0525009', name: 'JOANNA SUSAN SANU' },
  { rollNo: 'E0525010', name: 'MADHUMITHA R' },
  { rollNo: 'E0525011', name: 'S SANJANA' },
  { rollNo: 'E0525012', name: 'MADHUMITHA V' },
  { rollNo: 'E0525013', name: 'SHEIK HANA G' },
  { rollNo: 'E0525014', name: 'LOHITHA I H' },
  { rollNo: 'E0525015', name: 'JAYALAKSHMI J' },
  { rollNo: 'E0525016', name: 'KAVIN S' },
  { rollNo: 'E0525017', name: 'SHASHWATH CHELLAM C J' },
  { rollNo: 'E0525018', name: 'SIVATHEKA MANIMUTHU' },
  { rollNo: 'E0525019', name: 'MARIO RALPH BAXTER' },
  { rollNo: 'E0525020', name: 'MANOJ PANDIAN M D' },
  { rollNo: 'E0525021', name: 'PAVAN V' },
  { rollNo: 'E0525022', name: 'AKHILASH B S' },
  { rollNo: 'E0525023', name: 'HAMSINI J' },
  { rollNo: 'E0525024', name: 'N SAAHITYAA' },
  { rollNo: 'E0525025', name: 'NETHRA A' },
  { rollNo: 'E0525026', name: 'MITHRASRI P' },
  { rollNo: 'E0525027', name: 'J SHRADHA' },
  { rollNo: 'E0525028', name: 'HASIKA V' },
  { rollNo: 'E0525029', name: 'K RAMANI PRIYAA' },
  { rollNo: 'E0525030', name: 'A UDHAYA' },
  { rollNo: 'E0525031', name: 'KAUSHIK S' },
  { rollNo: 'E0525032', name: 'HARINI SRI S' },
  { rollNo: 'E0525033', name: 'E POOJASHREE' },
  { rollNo: 'E0525034', name: 'MERCINE MARIA F' },
  { rollNo: 'E0525035', name: 'LAJWANTHI SARAVANAKUMAR' },
  { rollNo: 'E0525036', name: 'HEMAVATHI V' },
  { rollNo: 'E0525037', name: 'AKSHAYA SRI K' },
  { rollNo: 'E0525038', name: 'SUMAIYA B' },
  { rollNo: 'E0525039', name: 'SANTOSH RAGHAVENDRA YS' },
  { rollNo: 'E0525040', name: 'NITHYAJEYASRI L G' },
  { rollNo: 'E0525041', name: 'GOPINATH S' },
  { rollNo: 'E0525042', name: 'MONICA G' },
  { rollNo: 'E0525043', name: 'MADHU SHREE V' },
  { rollNo: 'E0525044', name: 'RITHI VELMURUGAN' },
  { rollNo: 'E0525045', name: 'ADHISESHAN V' },
  { rollNo: 'E0525046', name: 'M MAHDIYA RIFQUA' },
  { rollNo: 'E0525048', name: 'THARUNIYA S' },
  { rollNo: 'E0525049', name: 'DASWANTH T' },
  { rollNo: 'E0525050', name: 'VARSHITHA SHRI R' },
  { rollNo: 'E0525051', name: 'RAKSHANA R' },
  { rollNo: 'E0525052', name: 'RANI ILAYA NACHIYAR I' },
  { rollNo: 'E0525053', name: 'LOGESH V' },
  { rollNo: 'E0525054', name: 'DHIVYA SHREE G' },
  { rollNo: 'E0525055', name: 'RAKSHAN R S' },
  { rollNo: 'E0525056', name: 'OVIYA V M' },
  { rollNo: 'E0525057', name: 'SAMRAJ KAR' },
  { rollNo: 'E0525058', name: 'T KALPNA' },
  { rollNo: 'E0525059', name: 'A S THEJASHWINI' },
  { rollNo: 'E0525060', name: 'SANJJANA R' },
];


// ----------------------------------------------------------------------------
//  SECTION 5 — WEB-APP ROUTER
// ----------------------------------------------------------------------------
function doGet(e) {
  const view = (e && e.parameter && e.parameter.view || 'general').toString().toLowerCase();
  const isMed = (view === 'med');
  return HtmlService.createHtmlOutputFromFile(isMed ? 'Med' : 'General')
    .setTitle(isMed ? 'MED ENGG LAB — Progress & Marks' : 'Foothold — Course Progress')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


// ----------------------------------------------------------------------------
//  SECTION 6 — SHARED HELPERS
// ----------------------------------------------------------------------------

//  IDENTITY NORMALISATION.
//  Students sign in with an EMAIL, so the sheet stores identifiers like
//  "e0525052@sriher.edu.in" — NOT the bare reg-no "E0525052". This function
//  converts any identifier to a canonical reg-no so the roster matches:
//    "e0525052@sriher.edu.in" -> "E0525052"      (institutional: strip domain, upper-case)
//    "E0525052"               -> "E0525052"
//  A student who registered with a PERSONAL email has no reg-no in it, so map
//  them here (lower-case email -> reg-no). Add more as you spot them.
const ROLL_ALIASES = {
  'adhiseshan747@gmail.com': 'E0525045',   // ADHISESHAN V — registered with a personal email
  // 'someone@gmail.com': 'E0525xxx',
};
function normalizeId(raw) {
  const s = String(raw == null ? '' : raw).trim();
  if (!s) return '';
  const alias = ROLL_ALIASES[s.toLowerCase()];
  if (alias) return alias;
  const at = s.indexOf('@');
  return (at >= 0 ? s.substring(0, at) : s).toUpperCase();
}

//  Read one course's Progress tab ONCE: progress[REG_NO][unitId] = CompletedAt.
//  Keys are NORMALISED (see normalizeId) so email logins match the reg-no roster.
//  courseId filters out stray rows; keeping the timestamp powers date-under-tick.
function buildProgressIndex(ss, courseId) {
  const rows = ss.getSheetByName(PROGRESS_SHEET).getDataRange().getValues();
  const idx = {};
  for (let i = 1; i < rows.length; i++) {
    const roll   = normalizeId(rows[i][0]);                // email -> reg-no
    const course = String(rows[i][1]).trim();
    const unitId = String(rows[i][2]).trim();
    const when   = rows[i][3];
    if (course !== courseId || !roll || !unitId) continue;
    if (!idx[roll]) idx[roll] = {};
    if (!idx[roll][unitId]) idx[roll][unitId] = when;      // keep earliest
  }
  return idx;
}

//  Format a timestamp to a short readable string; '' if missing/bad.
function fmtWhen(raw) {
  if (!raw) return '';
  try {
    const d = (raw instanceof Date) ? raw : new Date(raw);
    if (isNaN(d.getTime())) return String(raw);
    return Utilities.formatDate(d, TIMEZONE, 'dd-MMM-yy HH:mm');
  } catch (e) { return String(raw); }
}

//  One experiment's status for a student, from their {unitId:when} map.
//  Also totals the WEIGHT completed (for marks) and picks the completion
//  timestamp (for the lateness check): the record-submit time if submitted,
//  else the latest stage time.
function labStatusFor(exp, done) {
  const submittedWhen = done[exp.expId];                   // plain id => submitted
  const stagesTotal = exp.stages.length;
  let stagesDone = 0, lastStageWhen = '', totalWeight = 0, earnedWeight = 0;
  exp.stages.forEach(function (s) {
    const w = (s.weight != null) ? s.weight : 1;
    totalWeight += w;
    const t = done[exp.expId + '@' + s.id];
    if (t) { stagesDone++; earnedWeight += w; if (!lastStageWhen || t > lastStageWhen) lastStageWhen = t; }
  });
  if (submittedWhen)                                       // submitting requires all stages => full credit
    return { status: 'done',    when: submittedWhen, stagesDone: stagesTotal, stagesTotal: stagesTotal, earnedWeight: totalWeight, totalWeight: totalWeight };
  if (stagesDone)
    return { status: 'partial', when: lastStageWhen, stagesDone: stagesDone, stagesTotal: stagesTotal, earnedWeight: earnedWeight, totalWeight: totalWeight };
  return   { status: 'none',    when: '',            stagesDone: 0,          stagesTotal: stagesTotal, earnedWeight: 0,           totalWeight: totalWeight };
}

//  Resolve a DueDates "Experiment" cell (e.g. "1", "10", "MP", "Exp 3") to an
//  expId. Returns null if it matches nothing.
function resolveExpId(key) {
  key = String(key).trim().toUpperCase();
  if (key === 'MP' || key === 'MINI' || key === 'MINIPROJECT' || key === '—') return 'UnitLABMP';
  let hit = LAB_EXPERIMENTS.filter(function (e) { return e.no === key; })[0];          // "1".."10"
  if (hit) return hit.expId;
  hit = LAB_EXPERIMENTS.filter(function (e) { return e.expId.toUpperCase() === key; })[0];
  if (hit) return hit.expId;
  const m = key.match(/(\d+)/);                            // "Exp 3" -> 3
  if (m) { hit = LAB_EXPERIMENTS.filter(function (e) { return e.no === m[1]; })[0]; if (hit) return hit.expId; }
  return null;
}

//  Compute the AUTO mark for one experiment (before any manual override).
//  base10   = weighted completion scaled to /10.
//  daysLate = whole days the completion timestamp is past the due date.
//  autoMark = base10 reduced by LATE_PCT_PER_DAY per late day (floored).
function experimentMark(exp, done, dueDate) {
  const st = labStatusFor(exp, done);
  if (!exp.built || !st.totalWeight) {                     // can't grade an unbuilt experiment
    return { built: false, status: st.status, whenDisplay: '', stagesDone: st.stagesDone,
             stagesTotal: st.stagesTotal, base10: '', daysLate: 0, autoMark: '' };
  }
  const base10 = Math.round((st.earnedWeight / st.totalWeight) * 10 * 10) / 10;   // 1 decimal

  //  Lateness: treat the due date as end-of-day; count whole days beyond it.
  let daysLate = 0;
  if (dueDate && st.when) {
    const sub = (st.when instanceof Date) ? st.when : new Date(st.when);
    if (!isNaN(sub.getTime())) {
      const dueEnd = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate(), 23, 59, 59);
      if (sub.getTime() > dueEnd.getTime())
        daysLate = Math.ceil((sub.getTime() - dueEnd.getTime()) / 86400000);
    }
  }
  const factor   = Math.max(LATE_FLOOR, 1 - LATE_PCT_PER_DAY * daysLate);
  const autoMark = Math.round(base10 * factor * 10) / 10;

  return { built: true, status: st.status, whenDisplay: fmtWhen(st.when), stagesDone: st.stagesDone,
           stagesTotal: st.stagesTotal, base10: base10, daysLate: daysLate, autoMark: autoMark };
}


// ----------------------------------------------------------------------------
//  SECTION 7 — READ #1: getGeneralData()  (called by General.html)
//  Every student in EACH course, that course's completion %, sorted DESC.
// ----------------------------------------------------------------------------
function getGeneralData() {
  const courses = COURSES.map(function (c) {
    const ss = SpreadsheetApp.openById(c.sheetId);
    const progress = buildProgressIndex(ss, c.courseId);
    const rows = ss.getSheetByName(STUDENTS_SHEET).getDataRange().getValues();

    const students = [];
    for (let r = 1; r < rows.length; r++) {
      const rollNo = String(rows[r][0]).trim();
      if (!rollNo) continue;
      const done = progress[normalizeId(rollNo)] || {};   // match via normalised reg-no
      let courseDone = 0;
      const modules = c.modules.map(function (m) {
        let d = 0;
        m.units.forEach(function (u) { if (done[u]) d++; });
        courseDone += d;
        return { id: m.id, title: m.title, done: d, total: m.units.length };
      });
      students.push({
        rollNo: rollNo, name: rows[r][2], batch: rows[r][3],
        done: courseDone, total: c.totalUnits,
        pct: c.totalUnits ? Math.round((courseDone / c.totalUnits) * 100) : 0,
        modules: modules,
      });
    }
    students.sort(function (a, b) {
      if (b.pct !== a.pct) return b.pct - a.pct;           // nearing completion first
      return String(a.rollNo).localeCompare(String(b.rollNo), undefined, { numeric: true });
    });

    return {
      key: c.key, title: c.title, courseId: c.courseId,
      totalUnits: c.totalUnits,
      modules: c.modules.map(function (m) { return { id: m.id, title: m.title }; }),
      students: students,
    };
  });

  return {
    generatedAt: Utilities.formatDate(new Date(), TIMEZONE, 'dd-MMM-yy HH:mm'),
    courses: courses,
  };
}


// ----------------------------------------------------------------------------
//  SECTION 8 — READ #2: getMedData()  (called by Med.html)
//  The 59 roster students (reg-no order): per-experiment status + timestamp,
//  plus marks from the separate marks sheet. Reads the PYTHON backend.
// ----------------------------------------------------------------------------
function getMedData() {
  const ss = SpreadsheetApp.openById(PYTHON_SHEET_ID);
  const progress  = buildProgressIndex(ss, 'course_python');
  const overrides = readMarks();        // manual overrides from the Marks tab (wide)
  const dueDates  = readDueDates();     // expId -> Date, from the DueDates tab

  const students = MED_ROSTER.map(function (stu) {
    const done = progress[normalizeId(stu.rollNo)] || {};        // match via normalised reg-no
    const experiments = LAB_EXPERIMENTS.map(function (exp) {
      const em = experimentMark(exp, done, dueDates[exp.expId]);  // auto mark + lateness
      const cellRaw  = overrides[stu.rollNo] ? overrides[stu.rollNo][exp.expId] : '';
      const cellNum  = (cellRaw !== '' && cellRaw != null && !isNaN(Number(cellRaw))) ? Number(cellRaw) : '';
      const finalMark   = (cellNum !== '') ? cellNum : (em.built ? em.autoMark : '');
      const hasOverride = (cellNum !== '' && em.built && cellNum !== em.autoMark);
      //  Per-subdivision split (for the expanded Experiment view): each stage's
      //  done-state and, if done, when it was finished.
      const stages = exp.stages.map(function (s) {
        const w = done[exp.expId + '@' + s.id];
        return { label: s.label, done: !!w, when: fmtWhen(w) };
      });
      return {
        status: em.status, whenDisplay: em.whenDisplay,
        stagesDone: em.stagesDone, stagesTotal: em.stagesTotal,
        built: em.built, base10: em.base10, daysLate: em.daysLate,
        autoMark: em.autoMark, override: hasOverride ? cellNum : '',
        finalMark: finalMark, dueSet: !!dueDates[exp.expId], stages: stages,
      };
    });
    return { rollNo: stu.rollNo, name: stu.name,
             signedUp: !!progress[normalizeId(stu.rollNo)], experiments: experiments };
  });
  students.sort(function (a, b) {
    return String(a.rollNo).localeCompare(String(b.rollNo), undefined, { numeric: true });
  });

  return {
    generatedAt:  Utilities.formatDate(new Date(), TIMEZONE, 'dd-MMM-yy HH:mm'),
    labExperiments: LAB_EXPERIMENTS,
    students:     students,
    marksLinked:  marksSheetConfigured(),
    dueDatesCount: Object.keys(dueDates).length,
  };
}


// ----------------------------------------------------------------------------
//  SECTION 9 — THE MARKS WORKBOOK (READ-ONLY: overrides + due dates)
//  ----------------------------------------------------------------------------
//  Everything here reads your SEPARATE marks workbook. Nothing is written, which
//  is what keeps the dashboard safe to share. The workbook has two tabs:
//    • Marks    (wide) : RollNo | Name | Exp1 … Exp10 | MiniProject
//                        You normally leave these blank and let the auto mark
//                        stand; type a number ONLY to OVERRIDE a specific mark.
//    • DueDates        : Experiment | DueDate  (Experiment = 1..10 or MP).
// ----------------------------------------------------------------------------

//  True once you've pasted a real marks-sheet id (not the placeholder).
function marksSheetConfigured() {
  return !!MARKS_SPREADSHEET_ID && MARKS_SPREADSHEET_ID.indexOf('PASTE_') !== 0;
}

//  Fetch a tab by any of several acceptable names (so small naming differences
//  like "Due Dates" vs "DueDates" still work). Returns null if none match.
function getSheetByAnyName(ss, names) {
  for (let i = 0; i < names.length; i++) {
    const sh = ss.getSheetByName(names[i]);
    if (sh) return sh;
  }
  return null;
}

//  Read the Marks tab into overrides[rollNo][expId] = number or '' (blank).
function readMarks() {
  const map = {};
  if (!marksSheetConfigured()) return map;
  let sh;
  try {
    sh = getSheetByAnyName(SpreadsheetApp.openById(MARKS_SPREADSHEET_ID), [MARKS_TAB, 'Marks', 'marks']);
  } catch (e) { return map; }
  if (!sh) return map;
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    const roll = String(rows[i][0]).trim();
    if (!roll) continue;
    map[roll] = {};
    LAB_EXPERIMENTS.forEach(function (exp, k) {
      const cell = rows[i][2 + k];                         // col C = Exp 1 … col M = Mini
      map[roll][exp.expId] = (cell === '' || cell === null || cell === undefined) ? '' : cell;
    });
  }
  return map;
}

//  Read the DueDates tab into dueDates[expId] = Date.
function readDueDates() {
  const map = {};
  if (!marksSheetConfigured()) return map;
  let sh;
  try {
    sh = getSheetByAnyName(SpreadsheetApp.openById(MARKS_SPREADSHEET_ID),
                           [DUEDATES_TAB, 'Due Dates', 'DueDate', 'Due Date', 'duedates']);
  } catch (e) { return map; }
  if (!sh) return map;
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    const key = rows[i][0];
    const raw = rows[i][1];
    if (key === '' || key === null || raw === '' || raw === null) continue;
    const expId = resolveExpId(key);
    if (!expId) continue;
    const d = (raw instanceof Date) ? raw : new Date(raw);
    if (!isNaN(d.getTime())) map[expId] = d;
  }
  return map;
}


// ----------------------------------------------------------------------------
//  SECTION 10 — NIGHTLY MARKS WRITER  (owner-only; NOT on the shared pages)
//  ----------------------------------------------------------------------------
//  writeMarks() computes every roster student's mark and writes it into the
//  Marks tab of your marks workbook. Your rule, implemented exactly:
//    • You type a number over a cell  -> that value is kept (your override).
//    • You leave a cell as calculated -> it refreshes as students do more work.
//  To tell the two apart it keeps a hidden `_AutoMarks` tab holding the last
//  value IT wrote. On each run, per cell:
//    - if the cell is blank OR equals the last auto value  -> write new auto,
//    - otherwise (you changed it)                          -> keep your value.
//  Run it nightly via a trigger (see createNightlyTrigger) or by hand anytime.
//  It writes ONLY to the marks workbook — never a course backend.
// ----------------------------------------------------------------------------

//  Numeric-aware equality: blanks match blanks; numbers compared as numbers.
function numEq(a, b) {
  const ab = (a === '' || a == null), bb = (b === '' || b == null);
  if (ab || bb) return ab && bb;
  const na = Number(a), nb = Number(b);
  if (!isNaN(na) && !isNaN(nb)) return na === nb;
  return String(a) === String(b);
}

//  Read a grid tab into rollNo -> [expMark0, expMark1, …] (experiment columns).
function readGridByRoll(book, names) {
  const sh = getSheetByAnyName(book, names);
  const map = {};
  if (!sh) return map;
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    const roll = String(rows[i][0]).trim();
    if (!roll) continue;
    const arr = [];
    for (let k = 0; k < LAB_EXPERIMENTS.length; k++) arr.push(rows[i][2 + k]);
    map[roll] = arr;
  }
  return map;
}

//  Overwrite a tab (creating/ hiding as needed) with a full 2-D grid.
function writeGrid(book, name, grid, hidden) {
  let sh = book.getSheetByName(name);
  if (!sh) sh = book.insertSheet(name);
  sh.clearContents();
  sh.getRange(1, 1, grid.length, grid[0].length).setValues(grid);
  sh.setFrozenRows(1);
  if (hidden) { try { sh.hideSheet(); } catch (e) {} }
}

//  THE JOB: recompute + write marks, preserving your manual overrides.
function writeMarks() {
  const lock = LockService.getScriptLock();
  lock.tryLock(30000);
  try {
    if (!marksSheetConfigured()) return 'Marks workbook not configured.';
    const pss      = SpreadsheetApp.openById(PYTHON_SHEET_ID);
    const progress = buildProgressIndex(pss, 'course_python');
    const dueDates = readDueDates();
    const book     = SpreadsheetApp.openById(MARKS_SPREADSHEET_ID);

    //  Current visible marks + last auto baseline, keyed by roll number.
    const curByRoll  = readGridByRoll(book, [MARKS_TAB, 'Marks']);
    const autoByRoll = readGridByRoll(book, ['_AutoMarks']);

    const header   = ['RollNo', 'Name'].concat(LAB_EXPERIMENTS.map(function (e) { return e.short; }));
    const marksOut = [header.slice()];
    const autoOut  = [header.slice()];

    MED_ROSTER.forEach(function (stu) {
      const done  = progress[normalizeId(stu.rollNo)] || {};   // match via normalised reg-no
      const mRow  = [stu.rollNo, stu.name];
      const aRow  = [stu.rollNo, stu.name];
      LAB_EXPERIMENTS.forEach(function (exp, k) {
        const em = experimentMark(exp, done, dueDates[exp.expId]);
        if (!em.built) { mRow.push(''); aRow.push(''); return; }   // can't grade unbuilt
        const computed = em.autoMark;
        const cur  = curByRoll[stu.rollNo]  ? curByRoll[stu.rollNo][k]  : '';
        const base = autoByRoll[stu.rollNo] ? autoByRoll[stu.rollNo][k] : '';
        //  blank OR unchanged-from-last-auto => refresh; else keep your override.
        const keepOverride = (cur !== '' && cur != null && !numEq(cur, base));
        mRow.push(keepOverride ? cur : computed);
        aRow.push(computed);                                        // baseline = latest auto
      });
      marksOut.push(mRow);
      autoOut.push(aRow);
    });

    writeGrid(book, MARKS_TAB, marksOut, false);
    writeGrid(book, '_AutoMarks', autoOut, true);
    return 'Wrote marks for ' + MED_ROSTER.length + ' students at ' +
           Utilities.formatDate(new Date(), TIMEZONE, 'dd-MMM-yy HH:mm');
  } finally {
    lock.releaseLock();
  }
}

//  Run ONCE to schedule writeMarks nightly (~1 AM). Safe to re-run; it clears
//  any previous writeMarks trigger first so you never get duplicates.
function createNightlyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'writeMarks') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('writeMarks').timeBased().everyDays(1).atHour(1).create();
  return 'Nightly trigger installed: writeMarks runs daily around 1 AM.';
}


// ----------------------------------------------------------------------------
//  SECTION 11 — OPTIONAL SELF-TEST (run manually from the editor)
// ----------------------------------------------------------------------------
function testData() {
  const g = getGeneralData();
  g.courses.forEach(function (c) {
    Logger.log(c.title + ': ' + c.students.length + ' students | divisor ' + c.totalUnits);
  });
  const m = getMedData();
  Logger.log('MED roster: ' + m.students.length + ' (expect 59) | marks linked: ' + m.marksLinked);
}

// ----------------------------------------------------------------------------
//  SECTION 12 — LAB DIAGNOSTIC  (run manually; reveals why lab isn't matching)
//  ----------------------------------------------------------------------------
//  Run this from the editor and read the Execution log. It reports, from the
//  Python Progress tab: which CourseId values exist, every distinct UnitId that
//  looks lab-related, a handful of real lab rows, and how many of your 59 roster
//  reg-numbers actually appear in Progress. That tells us exactly which of the
//  three mismatches is happening, so we can correct the code or the data.
// ----------------------------------------------------------------------------
function diagnoseLab() {
  const ss = SpreadsheetApp.openById(PYTHON_SHEET_ID);
  const rows = ss.getSheetByName(PROGRESS_SHEET).getDataRange().getValues();

  const courseIds = {}, labUnits = {}, sample = [], progRolls = {};
  for (let i = 1; i < rows.length; i++) {
    const roll = String(rows[i][0]).trim();
    const course = String(rows[i][1]).trim();
    const unit = String(rows[i][2]).trim();
    if (roll) progRolls[roll] = true;
    courseIds[course] = (courseIds[course] || 0) + 1;
    if (/lab/i.test(unit)) {                              // anything with "lab" in it
      labUnits[unit] = (labUnits[unit] || 0) + 1;
      if (sample.length < 15) sample.push([roll, course, unit, rows[i][3]]);
    }
  }

  Logger.log('=== PROGRESS DIAGNOSTIC ===');
  Logger.log('CourseId values (with row counts): ' + JSON.stringify(courseIds));
  Logger.log('Distinct lab-looking UnitIds: ' + JSON.stringify(labUnits));
  Logger.log('Sample lab rows [Roll, Course, Unit, When]:');
  sample.forEach(function (r) { Logger.log('   ' + JSON.stringify(r)); });

  //  How many roster reg-nos match AFTER normalising the sheet's email logins.
  const normSet = {};
  Object.keys(progRolls).forEach(function (r) { normSet[normalizeId(r)] = true; });
  let matched = 0, missing = [];
  MED_ROSTER.forEach(function (s) { if (normSet[s.rollNo]) matched++; else missing.push(s.rollNo); });
  Logger.log('Roster reg-nos matched (after normalising emails): ' + matched + ' of ' + MED_ROSTER.length);
  Logger.log('Raw identifiers in sheet (first 8): ' + Object.keys(progRolls).slice(0, 8).join(' | '));
  Logger.log('Still-unmatched roster reg-nos (likely personal emails — add to ROLL_ALIASES): ' +
             (missing.length ? missing.join(', ') : 'none 🎉'));
}
