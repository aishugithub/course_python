// ============================================================================
//  DASHBOARD.GS  —  TEACHER PROGRESS DASHBOARD (server side)
//  Course: Python Programming (Foothold)  +  Python Lab MED23CL202 e-Record
//  ----------------------------------------------------------------------------
//  WHAT THIS FILE IS
//  This is a SEPARATE, STANDALONE Apps Script project. It is NOT your course's
//  Code.gs. It only READS your Foothold backend spreadsheet and renders a
//  read-only dashboard for you (the teacher). It never writes to the sheet and
//  never touches the live course code, so it can never break the student app.
//
//  WHY SEPARATE (the one-doGet rule)
//  An Apps Script project may have only ONE doGet(). Your Foothold Code.gs
//  already uses its doGet() to serve the student course. If we added a second
//  doGet() there they would collide. Keeping the dashboard in its own project
//  gives it its own doGet(), its own deployment URL, and full isolation.
//
//  HOW THE PIECES FIT TOGETHER (the whole app in one glance)
//    1. You open the dashboard's Web-App URL in a browser.
//    2. doGet() (bottom of this file) serves Index.html.
//    3. Index.html, once loaded, calls google.script.run.getDashboardData().
//    4. getDashboardData() (this file) opens your sheet, reads the Students
//       and Progress tabs, crunches every student's numbers, and returns one
//       tidy JSON object.
//    5. Index.html renders that object into two sections: Course Progress and
//       Lab e-Record.
//
//  THE DATA MODEL WE ARE READING (discovered from your real code)
//  Everything a student does is logged into ONE tab, `Progress`, whose columns
//  are:  RollNo | CourseId | UnitId | CompletedAt
//  The UnitId column carries TWO different kinds of value, told apart by "@":
//    • A PLAIN id  (e.g. "Unit5_2")        = a full course unit was completed.
//    • An "@" id   (e.g. "UnitLAB1@p1_algo") = one *stage* of the lab e-record.
//  Also, a plain "UnitLAB1" row (no "@") is written when the student SUBMITS
//  the whole experiment record. Your App.jsx comment says it directly:
//  "The Dashboard filters these out of counts via the '@' marker." We honour
//  exactly that convention here.
// ============================================================================


// ----------------------------------------------------------------------------
//  SECTION 1 — CONFIGURATION  (the only block you normally edit)
// ----------------------------------------------------------------------------

//  The ID of your Foothold backend spreadsheet — the same sheet your Code.gs
//  writes to. To find it, open the sheet and copy the long code from its URL:
//    https://docs.google.com/spreadsheets/d/THIS_LONG_ID_HERE/edit
//  Paste that id between the quotes below.
const SPREADSHEET_ID = 'PASTE_YOUR_FOOTHOLD_SHEET_ID_HERE';

//  Tab names, exactly as they appear in your spreadsheet (case-sensitive).
const STUDENTS_SHEET = 'Students';   // roster + login: RollNo | Password | Name | Batch | Email
const PROGRESS_SHEET = 'Progress';   // event ledger:   RollNo | CourseId | UnitId | CompletedAt

//  The CourseId your app records against (from config/course.config.js).
const COURSE_ID = 'course_python';


// ----------------------------------------------------------------------------
//  SECTION 2 — COURSE MAP (mirror of course.config.js, MANDATORY units only)
//  ----------------------------------------------------------------------------
//  Apps Script cannot import your React course.config.js, so we embed a trimmed
//  copy here: every module and its MANDATORY units. We deliberately EXCLUDE the
//  optional "Crucible" units (…_C) and the LAB module, because those do not
//  count toward the Python-course percentage — mirroring the `optional:true`
//  flags in your real config. Total mandatory units below = 62 (the % divisor).
//
//  If you add/remove a real lesson, mirror the change here so the % stays true.
// ----------------------------------------------------------------------------
const COURSE_MODULES = [
  { id: 'M1',   title: 'Computing',                         units: ['Unit1_1','Unit1_2','Unit1_3'] },
  { id: 'M2',   title: 'Computing Languages',               units: ['Unit2_1','Unit2_2','Unit2_3','Unit2_4'] },
  { id: 'M3',   title: 'The Conversion',                    units: ['Unit3_1','Unit3_2','Unit3_3'] },
  { id: 'M4',   title: 'Your First Python Program',         units: ['Unit4_0','Unit4_1','Unit4_2','Unit4_3','Unit4_4'] },
  { id: 'M5',   title: 'Making Decisions',                  units: ['Unit5_1','Unit5_2','Unit5_3','Unit5_4'] },
  { id: 'M6',   title: 'Repetition',                        units: ['Unit6_1','Unit6_2','Unit6_3','Unit6_4'] },
  { id: 'M6.5', title: 'Computational Thinking I',          units: ['UnitCT1_1','UnitCT1_2','UnitCT1_3','UnitCT1_4','UnitCT1_5'] },
  { id: 'M7',   title: 'Organizing Data',                   units: ['Unit7_1','Unit7_2','Unit7_3','Unit7_4','Unit7_5','Unit7_6'] },
  { id: 'M7.5', title: 'Computational Thinking II',         units: ['UnitCT2_1','UnitCT2_2','UnitCT2_3','UnitCT2_4','UnitCT2_5'] },
  { id: 'M8',   title: 'Functions & Modular Thinking',      units: ['Unit8_1','Unit8_2','Unit8_3','Unit8_4'] },
  { id: 'M8.5', title: 'Computational Thinking III',        units: ['UnitCT3_1','UnitCT3_2','UnitCT3_3'] },
  { id: 'M9',   title: 'When Things Go Wrong',              units: ['Unit9_1','Unit9_2','Unit9_3','Unit9_4'] },
  { id: 'M10',  title: 'Object-Oriented Programming',       units: ['Unit10_1','Unit10_2','Unit10_3','Unit10_4','Unit10_6','Unit10_7','Unit10_5'] },
  { id: 'M11',  title: 'Pythonic Python & the Ecosystem',   units: ['Unit11_1'] },
  { id: 'M12',  title: 'Working with Real Data',            units: ['Unit12_1'] },
  { id: 'M13',  title: 'Data Visualization',                units: ['Unit13_1','Unit13_2','Unit13_3'] },
];

//  Flatten every mandatory unit into one lookup Set. Using a Set makes the
//  "is this unitId a mandatory course unit?" test O(1) instead of scanning an
//  array for every progress row of every student.
const MANDATORY_UNITS = (function buildMandatorySet() {
  const set = {};                              // plain object used as a hash-set
  COURSE_MODULES.forEach(function (m) {
    m.units.forEach(function (u) { set[u] = true; });
  });
  return set;                                  // e.g. { Unit1_1:true, Unit1_2:true, ... }
})();

//  The % divisor: how many mandatory units the whole course has (expected: 62).
const COURSE_TOTAL_UNITS = Object.keys(MANDATORY_UNITS).length;


// ----------------------------------------------------------------------------
//  SECTION 3 — LAB MAP (10 experiments of MED23CL202, stage-level)
//  ----------------------------------------------------------------------------
//  Each experiment is recorded under a unitId prefix ("UnitLAB1", "UnitLAB2"…).
//  Each STAGE is logged as  `${expId}@${stageId}`  (e.g. "UnitLAB1@p1_algo").
//  Submitting the whole experiment writes the PLAIN id (e.g. "UnitLAB1").
//
//  Experiment 1 is BUILT — its six real stages are listed (2 programs × the
//  three stages algorithm→flowchart→program, matching UnitLAB1.jsx STAGES).
//  Experiments 2–10 are placeholders (built:false, no stages yet) so the
//  dashboard shows your full roadmap. As you build each one, set built:true
//  and fill in its `stages` array; the dashboard updates automatically.
//  Rename the titles to your actual experiment names whenever you like.
// ----------------------------------------------------------------------------
const LAB_STAGE_TEMPLATE = [   // the standard 6 stages a two-program experiment has
  { id: 'p1_algo', label: 'P1 · Algorithm' },
  { id: 'p1_flow', label: 'P1 · Flowchart' },
  { id: 'p1_prog', label: 'P1 · Program'   },
  { id: 'p2_algo', label: 'P2 · Algorithm' },
  { id: 'p2_flow', label: 'P2 · Flowchart' },
  { id: 'p2_prog', label: 'P2 · Program'   },
];

const LAB_EXPERIMENTS = [
  { expId: 'UnitLAB1',  title: 'Exp 1 — Data Types, Operators & Conditionals (CO1)', built: true,  stages: LAB_STAGE_TEMPLATE },
  { expId: 'UnitLAB2',  title: 'Exp 2 — Fundamentals of Python (CO1)',               built: false, stages: [] },
  { expId: 'UnitLAB3',  title: 'Exp 3 — OOPs Paradigm I (CO2)',                       built: false, stages: [] },
  { expId: 'UnitLAB4',  title: 'Exp 4 — OOPs Paradigm II (CO2)',                      built: false, stages: [] },
  { expId: 'UnitLAB5',  title: 'Exp 5 — File Handling I (CO3)',                        built: false, stages: [] },
  { expId: 'UnitLAB6',  title: 'Exp 6 — File Handling II (CO3)',                       built: false, stages: [] },
  { expId: 'UnitLAB7',  title: 'Exp 7 — Exception Handling I (CO4)',                   built: false, stages: [] },
  { expId: 'UnitLAB8',  title: 'Exp 8 — Exception Handling II (CO4)',                  built: false, stages: [] },
  { expId: 'UnitLAB9',  title: 'Exp 9 — Data Analysis & Visualization I (CO5)',        built: false, stages: [] },
  { expId: 'UnitLAB10', title: 'Exp 10 — Data Analysis & Visualization II (CO5)',      built: false, stages: [] },
];


// ----------------------------------------------------------------------------
//  SECTION 4 — WEB-APP ENTRY POINT
//  ----------------------------------------------------------------------------
//  doGet() runs when someone visits the deployed web-app URL. It simply serves
//  the HTML page. All the heavy lifting happens later, when that page calls
//  getDashboardData() back into this file.
//  `.setTitle`  — browser tab title.
//  `XFrameOptionsMode.ALLOWALL` — lets the page embed cleanly if you ever put
//  it inside an <iframe> (e.g. a college portal); harmless otherwise.
// ----------------------------------------------------------------------------
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Foothold — Class Progress Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


// ----------------------------------------------------------------------------
//  SECTION 5 — THE CORE: getDashboardData()
//  ----------------------------------------------------------------------------
//  This is the function the web page calls. It returns ONE object shaped for
//  easy rendering:
//    {
//      generatedAt, courseTotalUnits, labExperiments:[{expId,title,built,stages}],
//      students: [ {
//         rollNo, name, batch, email,
//         course: { done, total, pct, modules:[{id,title,done,total}] },
//         lab:    { experiments:[{ expId, submitted, stagesDone, stagesTotal,
//                                  stages:[{id,label,done}] }] }
//      }, ... ]  // sorted by RollNo (your reg-no order)
//    }
//
//  PERFORMANCE NOTE: we read each tab ONCE with getValues() (one bulk call is
//  far cheaper than many small ones), build a lookup of each student's completed
//  ids, then do a single pass. This stays fast well beyond your current data
//  size; see the scalability notes we discussed.
// ----------------------------------------------------------------------------
function getDashboardData() {

  // --- 5a. Open the spreadsheet by its ID (read-only use). -------------------
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // --- 5b. Read the Students tab into memory. --------------------------------
  //  getDataRange() = the whole used area; getValues() = a 2-D JS array.
  //  Row 0 is the header (RollNo | Password | Name | Batch | Email); real
  //  students start at row 1.
  const studentRows = ss.getSheetByName(STUDENTS_SHEET).getDataRange().getValues();

  // --- 5c. Read the Progress tab into memory. --------------------------------
  //  Columns: RollNo(0) | CourseId(1) | UnitId(2) | CompletedAt(3).
  const progressRows = ss.getSheetByName(PROGRESS_SHEET).getDataRange().getValues();

  // --- 5d. Index every completed id by student. ------------------------------
  //  completedByStudent["2024CS001"] = { "Unit5_2":true, "UnitLAB1@p1_algo":true, ... }
  //  A per-student hash-set lets us answer "did they finish X?" instantly below.
  const completedByStudent = {};
  for (let i = 1; i < progressRows.length; i++) {          // skip header row 0
    const roll   = String(progressRows[i][0]).trim();      // RollNo
    const course = String(progressRows[i][1]).trim();      // CourseId
    const unitId = String(progressRows[i][2]).trim();      // UnitId (plain OR "@")

    if (course !== COURSE_ID) continue;                    // ignore other courses
    if (!roll) continue;                                   // skip blank rows

    if (!completedByStudent[roll]) completedByStudent[roll] = {};
    completedByStudent[roll][unitId] = true;
  }

  // --- 5e. Walk the roster and compute each student's two tracks. ------------
  const students = [];
  for (let r = 1; r < studentRows.length; r++) {           // skip header row 0
    const rollNo = String(studentRows[r][0]).trim();       // RollNo
    if (!rollNo) continue;                                  // skip blank rows
    const name  = studentRows[r][2];                       // Name
    const batch = studentRows[r][3];                       // Batch
    const email = studentRows[r][4];                       // Email

    //  This student's set of completed ids (or empty if they've done nothing).
    const done = completedByStudent[rollNo] || {};

    // ---- TRACK A: Foothold course completion --------------------------------
    //  For each module, count how many of its mandatory units this student has
    //  a PLAIN completion row for. Summing modules gives the overall course %.
    let courseDone = 0;
    const moduleStats = COURSE_MODULES.map(function (m) {
      let d = 0;
      m.units.forEach(function (u) { if (done[u]) d++; });  // plain id present?
      courseDone += d;
      return { id: m.id, title: m.title, done: d, total: m.units.length };
    });
    const coursePct = COURSE_TOTAL_UNITS
      ? Math.round((courseDone / COURSE_TOTAL_UNITS) * 100)
      : 0;

    // ---- TRACK B: Lab e-record (stage level) --------------------------------
    //  For each experiment, check every stage's `${expId}@${stageId}` flag, and
    //  whether the plain `${expId}` (record submitted) flag is present.
    const labExps = LAB_EXPERIMENTS.map(function (exp) {
      const stageStates = exp.stages.map(function (s) {
        return { id: s.id, label: s.label, done: !!done[exp.expId + '@' + s.id] };
      });
      const stagesDone = stageStates.filter(function (s) { return s.done; }).length;
      return {
        expId:       exp.expId,
        title:       exp.title,
        built:       exp.built,
        submitted:   !!done[exp.expId],           // plain id = whole record submitted
        stagesDone:  stagesDone,
        stagesTotal: exp.stages.length,
        stages:      stageStates,
      };
    });

    //  Assemble this student's record.
    students.push({
      rollNo: rollNo,
      name:   name,
      batch:  batch,
      email:  email,
      course: { done: courseDone, total: COURSE_TOTAL_UNITS, pct: coursePct, modules: moduleStats },
      lab:    { experiments: labExps },
    });
  }

  // --- 5f. Sort by RollNo so the table matches your reg-no ordered name list.-
  //  localeCompare with numeric:true sorts "…CS2" before "…CS10" (natural order).
  students.sort(function (a, b) {
    return String(a.rollNo).localeCompare(String(b.rollNo), undefined, { numeric: true });
  });

  // --- 5g. Return everything the page needs in one payload. ------------------
  return {
    generatedAt:      new Date().toLocaleString(),
    courseTotalUnits: COURSE_TOTAL_UNITS,
    labExperiments:   LAB_EXPERIMENTS,   // lets the UI print the experiment list/headers
    students:         students,
  };
}


// ----------------------------------------------------------------------------
//  SECTION 6 — OPTIONAL SELF-TEST (run manually from the editor)
//  ----------------------------------------------------------------------------
//  Select `testData` in the Apps Script editor's function dropdown and click
//  Run once. It logs a quick summary to the Execution log so you can confirm
//  the sheet ID and tab names are correct BEFORE deploying — without opening a
//  browser. Purely a developer convenience; the web app never calls it.
// ----------------------------------------------------------------------------
function testData() {
  const d = getDashboardData();
  Logger.log('Students found: ' + d.students.length);
  Logger.log('Course divisor (mandatory units): ' + d.courseTotalUnits);
  if (d.students.length) {
    const s = d.students[0];
    Logger.log('First student: ' + s.rollNo + ' — ' + s.name +
               ' — course ' + s.course.done + '/' + s.course.total + ' (' + s.course.pct + '%)');
    Logger.log('  Exp1 stages done: ' + s.lab.experiments[0].stagesDone + '/' + s.lab.experiments[0].stagesTotal);
  }
}
