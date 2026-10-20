// ============================================================
//  CODE.GS — paste into Google Apps Script editor
//  Deploy as Web App → Anyone → Execute as Me
// ============================================================

function doGet(e) {
  return handleRequest(e.parameter);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    let body;
    try { body = JSON.parse(e.postData.contents); } catch { body = e.parameter; }
    body.__post = true; // report actions are refused unless they arrive as a POST (keeps tokens out of URLs)
    const result = routeAction(body);
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function handleRequest(params) {
  try {
    return ContentService.createTextOutput(JSON.stringify(routeAction(params))).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function routeAction(body) {
  switch (body.action) {
    case 'login':        return handleLogin(body);
    case 'register':     return handleRegister(body);
    case 'saveProgress': return handleSaveProgress(body);
    case 'getProgress':  return handleGetProgress(body);
    case 'logEvent':     return handleLogEvent(body);
    case 'feedback':     return handleFeedback(body);
    case 'reportLoad':        return withSession(body, handleReportLoad);
    case 'reportSave':        return withSession(body, handleReportSave);
    case 'reportUploadImage': return withSession(body, handleReportUploadImage);
    case 'reportGetImage':    return withSession(body, handleReportGetImage);
    case 'reportDeleteImage': return withSession(body, handleReportDeleteImage);
    case 'reportSubmit':      return withSession(body, handleReportSubmit);
    case 'progressDates':     return withSession(body, handleProgressDates);
    default:             return { success: false, message: 'Unknown action' };
  }
}

// ------------------------------------------------------------
// Usage analytics. One row per event: a page/session started,
// a lesson was opened, a lesson was completed, or someone signed
// up. AnonId identifies a browser even for guests who never log
// in; UserId is filled in only once someone is signed in. Creates
// the Events tab itself on first call, so no manual sheet setup
// is required beyond redeploying this script.
//
// 2026-09-14 addition: a 7th column, "Detail", for richer per-event
// data (right now: the far-transfer unit's quiz score/total, sent as a
// small JSON string by analytics.js -- see the "detail" param there).
// This is intentionally additive and backward-compatible:
//   - An existing Events sheet (created before this change) has only
//     6 header columns. We add the "Detail" header once, in place,
//     without touching a single existing row, so every export/analysis
//     already done against columns A-F keeps working unchanged.
//   - body.detail is optional. Every event logged by the app today
//     (session_start, lesson_open, lesson_complete, challenge_stage_complete,
//     signup) simply omits it and gets an empty 7th cell, exactly as
//     before this change existed.
//   - This is intentionally a generic free-text/JSON column rather than
//     dedicated Score/Hints/Duration columns, so future instrumentation
//     (Crucible hint-tier counts, section dwell time, etc.) can start
//     sending detail on existing event types without ANOTHER schema
//     change or another redeploy of this file.
// ------------------------------------------------------------
function handleLogEvent(body) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Events');
  if (!sheet) {
    sheet = ss.insertSheet('Events');
    sheet.appendRow(['Timestamp', 'AnonId', 'UserId', 'EventType', 'CourseId', 'UnitId', 'Detail']);
  } else {
    const lastCol = Math.max(sheet.getLastColumn(), 7);
    const header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    if (header[6] !== 'Detail') {
      sheet.getRange(1, 7).setValue('Detail');
    }
  }
  sheet.appendRow([
    new Date().toISOString(),
    body.anonId || '',
    body.userId || '',
    body.eventType || '',
    body.courseId || '',
    body.unitId || '',
    body.detail || '',
  ]);
  return { success: true };
}

// ------------------------------------------------------------
// End-of-course feedback + testimonial (from the UnitFB unit).
// One row per submission in its own "Feedback" sheet, created on
// first call so no manual sheet setup is needed beyond redeploying
// this script. The seven Likert answers arrive as body.ratings (a
// JSON array from the POST body, already parsed by doPost); each
// gets its own column L1..L7 so the sheet is analysis-ready. This
// is separate from the Events sheet on purpose: feedback is
// structured survey data, not a fire-and-forget usage event.
// ------------------------------------------------------------
function handleFeedback(body) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Feedback');
  if (!sheet) {
    sheet = ss.insertSheet('Feedback');
    sheet.appendRow([
      'Timestamp', 'CourseId', 'UserId', 'Name', 'PriorExp', 'PriorLangs',
      'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7',
      'Compare', 'MostLeast', 'Change', 'Testimonial', 'Consent',
    ]);
  }
  // ratings may arrive as a real array (JSON POST) or, defensively, as a
  // comma string; normalise to 7 cells either way.
  let r = body.ratings;
  if (typeof r === 'string') { try { r = JSON.parse(r); } catch { r = String(r).split(','); } }
  if (!Array.isArray(r)) r = [];
  const cell = (i) => (r[i] === undefined || r[i] === null ? '' : r[i]);

  sheet.appendRow([
    new Date().toISOString(),
    body.courseId || '',
    body.userId || '',
    body.name || '',
    body.priorExp || '',
    body.priorLangs || '',
    cell(0), cell(1), cell(2), cell(3), cell(4), cell(5), cell(6),
    body.compare || '',
    body.mostLeast || '',
    body.change || '',
    body.testimonial || '',
    body.consent ? 'yes' : 'no',
  ]);
  return { success: true };
}

function handleLogin(body) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Students');
  const data  = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const [rollNo, password, name, batch, email] = data[i];
    if (String(rollNo).trim() === String(body.rollNo).trim() &&
        String(password).trim() === String(body.password).trim()) {
      return { success: true, student: { rollNo: String(rollNo), name, batch, email, token: createSession(rollNo) } };
    }
  }
  return { success: false, message: 'Invalid roll number or password.' };
}

// ------------------------------------------------------------
// Self-registration for the public, worldwide version of the
// course (as opposed to professor-provisioned SRFET students,
// who are added to the Students sheet by hand and use handleLogin
// above). Here the "username" a learner logs in with IS their
// email address, and the password is one they invent for this
// site only -- it is never their real email account password.
// The same Students sheet holds both kinds of rows; column 0
// (historically "RollNo") just becomes the login handle, whether
// that's a roll number or an email address. Column layout stays
// identical so handleLogin/handleGetProgress/handleSaveProgress
// don't need to change at all.
// ------------------------------------------------------------
function handleRegister(body) {
  const email = String(body.username || '').trim().toLowerCase();
  const password = String(body.password || '').trim();
  const name = String(body.name || '').trim();

  if (!email || !password || !name) {
    return { success: false, message: 'Name, email, and password are all required.' };
  }
  // Very light email shape check -- the real validation (does this
  // inbox exist) isn't something Apps Script can do, so we don't try.
  if (email.indexOf('@') === -1) {
    return { success: false, message: 'Please enter a valid email address.' };
  }
  if (password.length < 6) {
    return { success: false, message: 'Please choose a password with at least 6 characters.' };
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Students');
  const data  = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim().toLowerCase() === email) {
      return { success: false, message: 'An account with this email already exists. Please sign in instead.' };
    }
  }

  // Row shape matches handleLogin's [rollNo, password, name, batch, email]:
  // rollNo slot = the email (that's what they'll type in to sign back in),
  // batch slot marks this as a self-registered public account (not a batch year).
  sheet.appendRow([email, password, name, 'Self-registered', email]);
  return { success: true, student: { rollNo: email, name, batch: 'Self-registered', email, token: createSession(email) } };
}

function handleSaveProgress(body) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Progress');
  const data  = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(body.rollNo) &&
        String(data[i][1]) === String(body.courseId) &&
        String(data[i][2]) === String(body.unitId)) {
      return { success: true, message: 'Already recorded.' };
    }
  }
  sheet.appendRow([body.rollNo, body.courseId, body.unitId, new Date().toISOString()]);
  return { success: true };
}

function handleGetProgress(body) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Progress');
  const data  = sheet.getDataRange().getValues();
  const units = [];
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(body.rollNo) &&
        String(data[i][1]) === String(body.courseId)) {
      units.push(String(data[i][2]));
    }
  }
  return { success: true, completedUnits: units };
}

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let students = ss.getSheetByName('Students');
  if (!students) students = ss.insertSheet('Students');
  students.clearContents();
  students.appendRow(['RollNo', 'Password', 'Name', 'Batch', 'Email']);
  students.appendRow(['2024CS001', 'pass123', 'Sample Student', '2024-2028', 'student@example.com']);
  let progress = ss.getSheetByName('Progress');
  if (!progress) progress = ss.insertSheet('Progress');
  progress.clearContents();
  progress.appendRow(['RollNo', 'CourseId', 'UnitId', 'CompletedAt']);
  return 'Sheets created successfully!';
}

// ------------------------------------------------------------
// Mini-project report builder (MED23CL202). Added 2026-10-17.
//
// Sign-in now also hands out a session token (Sessions sheet). Every
// report action needs that token and must arrive as a POST, so one
// student can't load or overwrite another student's report by typing
// a roll number. The older actions above are unchanged.
//
// Storage lives in Google Drive, not in Sheet cells (a cell holds at
// most 50,000 characters, and a report with its code is bigger):
//   Foothold Mini-Project Reports/<rollNo>/draft.json   the whole draft
//   Foothold Mini-Project Reports/<rollNo>/img/         screenshots
// The Reports sheet keeps one index row per student, and ReportSummary
// gets one row per PDF download (the teacher's viva sheet).
// Needs Drive permission: after pasting this, run any function once
// from the editor and accept the new permission, then redeploy.
// ------------------------------------------------------------

const SESSION_DAYS = 30;
const REPORT_FOLDER_NAME = 'Foothold Mini-Project Reports';
const MAX_DRAFT_CHARS = 2000000;
const MAX_IMAGE_BYTES = 1500000;
const MAX_IMAGES = 40;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function sheetWithHeader(name, header) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(header);
  }
  return sheet;
}

function createSession(rollNo) {
  const sheet = sheetWithHeader('Sessions', ['Token', 'RollNo', 'CreatedAt']);
  const token = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
  sheet.appendRow([token, String(rollNo), new Date().toISOString()]);
  return token;
}

// Returns the roll number a valid, unexpired token belongs to, or null.
function sessionRollNo(token) {
  if (!token) return null;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sessions');
  if (!sheet) return null;
  const data = sheet.getDataRange().getValues();
  const oldest = Date.now() - SESSION_DAYS * 24 * 3600 * 1000;
  for (let i = data.length - 1; i >= 1; i--) {
    if (String(data[i][0]) === String(token)) {
      return new Date(data[i][2]).getTime() >= oldest ? String(data[i][1]) : null;
    }
  }
  return null;
}

function withSession(body, handler) {
  if (!body.__post) return { success: false, message: 'Use POST for report actions.' };
  const rollNo = sessionRollNo(body.token);
  if (!rollNo) return { success: false, code: 'SESSION', message: 'Your sign-in has expired. Please sign in again.' };
  return handler(body, rollNo);
}

function reportRootFolder() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('REPORT_FOLDER_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) { /* deleted: make a new one */ }
  }
  const folder = DriveApp.createFolder(REPORT_FOLDER_NAME);
  props.setProperty('REPORT_FOLDER_ID', folder.getId());
  return folder;
}

function childFolder(parent, name) {
  const it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}

// Roll numbers can be email addresses for self-registered accounts.
function studentFolder(rollNo) {
  return childFolder(reportRootFolder(), String(rollNo).replace(/[^A-Za-z0-9@._-]/g, '_'));
}

function readDraftFile(folder) {
  const it = folder.getFilesByName('draft.json');
  if (!it.hasNext()) return { file: null, stored: null };
  const file = it.next();
  try { return { file, stored: JSON.parse(file.getBlob().getDataAsString()) }; }
  catch (e) { return { file, stored: null }; }
}

function handleReportLoad(body, rollNo) {
  const { stored } = readDraftFile(studentFolder(rollNo));
  if (!stored) return { success: true, draft: null, version: 0 };
  return { success: true, draft: stored.data, version: stored.version, savedAt: stored.savedAt };
}

// Saves only if the browser started from the latest saved version, so a
// second device can't silently wipe newer work. body.force overrides that
// after the student has been told.
function handleReportSave(body, rollNo) {
  let draft = body.draft;
  if (typeof draft === 'string') { try { draft = JSON.parse(draft); } catch (e) { draft = null; } }
  if (!draft || typeof draft !== 'object') return { success: false, message: 'Nothing to save.' };
  const text = JSON.stringify(draft);
  if (text.length > MAX_DRAFT_CHARS) return { success: false, message: 'This report is too large to save. Please shorten the pasted code or text.' };

  const folder = studentFolder(rollNo);
  const { file, stored } = readDraftFile(folder);
  const current = stored ? Number(stored.version) || 0 : 0;
  if (!body.force && Number(body.baseVersion || 0) !== current) {
    return { success: false, conflict: true, serverVersion: current, savedAt: stored && stored.savedAt };
  }
  const savedAt = new Date().toISOString();
  const content = JSON.stringify({ version: current + 1, savedAt, data: draft });
  if (file) file.setContent(content);
  else folder.createFile('draft.json', content, MimeType.PLAIN_TEXT);

  const index = sheetWithHeader('Reports', ['RollNo', 'Title', 'Step', 'Version', 'UpdatedAt']);
  const rows = index.getDataRange().getValues();
  const values = [String(rollNo), String(draft.title || ''), String(draft.step || ''), current + 1, savedAt];
  let found = false;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(rollNo)) {
      index.getRange(i + 1, 1, 1, values.length).setValues([values]);
      found = true;
      break;
    }
  }
  if (!found) index.appendRow(values);
  return { success: true, version: current + 1, savedAt };
}

function handleReportUploadImage(body, rollNo) {
  const match = /^data:([a-z/]+);base64,(.+)$/.exec(String(body.dataUrl || ''));
  if (!match || IMAGE_TYPES.indexOf(match[1]) === -1) return { success: false, message: 'Please upload a JPEG, PNG or WebP image.' };
  const bytes = Utilities.base64Decode(match[2]);
  if (bytes.length > MAX_IMAGE_BYTES) return { success: false, message: 'This image is too large, even after shrinking.' };

  const imgFolder = childFolder(studentFolder(rollNo), 'img');
  let count = 0;
  const all = imgFolder.getFiles();
  while (all.hasNext()) { if (!all.next().isTrashed()) count++; }
  if (count >= MAX_IMAGES) return { success: false, message: 'You have uploaded the maximum of ' + MAX_IMAGES + ' images. Delete one first.' };

  const name = String(body.name || 'screenshot').replace(/[^A-Za-z0-9._ -]/g, '_').slice(0, 80);
  const file = imgFolder.createFile(Utilities.newBlob(bytes, match[1], name));
  return { success: true, fileId: file.getId() };
}

// The file must sit in this student's own img folder.
function ownImage(rollNo, fileId) {
  let file;
  try { file = DriveApp.getFileById(String(fileId)); } catch (e) { return null; }
  const imgFolderId = childFolder(studentFolder(rollNo), 'img').getId();
  const parents = file.getParents();
  while (parents.hasNext()) { if (parents.next().getId() === imgFolderId) return file; }
  return null;
}

function handleReportGetImage(body, rollNo) {
  const file = ownImage(rollNo, body.fileId);
  if (!file || file.isTrashed()) return { success: false, message: 'Image not found.' };
  const blob = file.getBlob();
  return { success: true, dataUrl: 'data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes()) };
}

function handleReportDeleteImage(body, rollNo) {
  const file = ownImage(rollNo, body.fileId);
  if (!file) return { success: false, message: 'Image not found.' };
  file.setTrashed(true);
  return { success: true };
}

// Completion dates for the "How it grew" step and the certificate. Uses the
// signed-in student's roll number, never one sent by the browser.
function handleProgressDates(body, rollNo) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Progress');
  const data = sheet.getDataRange().getValues();
  const units = [];
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === rollNo && String(data[i][1]) === String(body.courseId)) {
      units.push({ unitId: String(data[i][2]), completedAt: String(data[i][3]) });
    }
  }
  return { success: true, units };
}

// One row per PDF download: the teacher's viva sheet.
function handleReportSubmit(body, rollNo) {
  let s = body.summary;
  if (typeof s === 'string') { try { s = JSON.parse(s); } catch (e) { s = {}; } }
  s = s || {};
  const cell = (v) => String(v === undefined || v === null ? '' : v).slice(0, 5000);
  const sheet = sheetWithHeader('ReportSummary', [
    'Timestamp', 'RollNo', 'Name', 'Title', 'ConceptsUsed', 'ConceptsTotal', 'NotUsed',
    'NotConfirmed', 'KeyLines', 'HardestBug', 'Tests', 'Certificate', 'MinutesPerStep', 'PastedShare',
  ]);
  sheet.appendRow([
    new Date().toISOString(), rollNo, cell(s.name), cell(s.title), cell(s.conceptsUsed), cell(s.conceptsTotal),
    cell(s.notUsed), cell(s.notConfirmed), cell(s.keyLines), cell(s.hardestBug), cell(s.tests),
    cell(s.certificate), cell(s.minutesPerStep), cell(s.pastedShare),
  ]);
  return { success: true };
}
