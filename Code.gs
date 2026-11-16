// ============================================================
//  CODE.GS — paste into Google Apps Script editor
//  Deploy as Web App → Anyone → Execute as Me
// ============================================================

function doGet(e) {
  return handleRequest(e.parameter);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  const locked = lock.tryLock(10000);
  try {
    let body;
    try { body = JSON.parse(e.postData.contents); } catch { body = e.parameter; }
    body.__post = true; // report actions are refused unless they arrive as a POST (keeps tokens out of URLs)
    // A report save reads, compares and rewrites the student's draft, so it must
    // never run beside another request. The browser tries again a little later.
    const result = !locked && body.action === 'reportSave'
      ? { success: false, busy: true, message: 'The server is busy. Your work is kept on this device and will be saved in a moment.' }
      : routeAction(body);
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (locked) lock.releaseLock();
  }
}

function handleRequest(params) {
  try {
    return ContentService.createTextOutput(JSON.stringify(routeAction(params))).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

const USE_POST = { success: false, code: 'OLD_PAGE', message: 'This page is out of date. Please refresh it (Ctrl+F5) and try again.' };

function routeAction(body) {
  switch (body.action) {
    // Sign-in and sign-up arrive as a POST, so a password is never part of a web address.
    case 'login':        return body.__post ? handleLogin(body) : USE_POST;
    case 'register':     return body.__post ? handleRegister(body) : USE_POST;
    case 'saveProgress': return handleSaveProgress(body);
    case 'getProgress':  return handleGetProgress(body);
    case 'logEvent':     return handleLogEvent(body);
    case 'feedback':     return handleFeedback(body);
    case 'reportLoad':        return withSession(body, handleReportLoad);   // @adopters:strip-line
    case 'reportSave':        return withSession(body, handleReportSave);   // @adopters:strip-line
    case 'reportUploadImage': return withSession(body, handleReportUploadImage);   // @adopters:strip-line
    case 'reportGetImage':    return withSession(body, handleReportGetImage);   // @adopters:strip-line
    case 'reportDeleteImage': return withSession(body, handleReportDeleteImage);   // @adopters:strip-line
    case 'reportSubmit':      return withSession(body, handleReportSubmit);   // @adopters:strip-line
    case 'progressDates':     return withSession(body, handleProgressDates);   // @adopters:strip-line
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

// ------------------------------------------------------------
// Passwords (2026-11-14). The Password column no longer holds the
// password itself but a salted hash: "sha256$<salt>$<hex>".
//   - A cell that is still plain text (older rows, or a password the
//     teacher types in by hand to reset one) keeps working: it is checked
//     as-is and replaced by its hash at that student's next sign-in.
//   - To RESET a password: type the new one into the student's Password
//     cell. It turns into a hash the first time they sign in with it.
// ------------------------------------------------------------
const HASH_PREFIX = 'sha256$';
const HASH_ROUNDS = 200;

function hexOf(bytes) {
  return bytes.map(function (b) { return ((b + 256) % 256).toString(16).padStart(2, '0'); }).join('');
}

function hashPassword(password, salt) {
  let h = salt + ':' + password;
  for (let i = 0; i < HASH_ROUNDS; i++) {
    h = hexOf(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + h, Utilities.Charset.UTF_8));
  }
  return HASH_PREFIX + salt + '$' + h;
}

function newPasswordHash(password) {
  return hashPassword(password, Utilities.getUuid().replace(/-/g, '').slice(0, 16));
}

function passwordMatches(stored, given) {
  stored = String(stored);
  if (stored.indexOf(HASH_PREFIX) !== 0) return stored.trim() === given;   // not hashed yet
  const salt = stored.split('$')[1];
  return hashPassword(given, salt) === stored;
}

function handleLogin(body) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Students');
  const data  = sheet.getDataRange().getValues();
  const who   = String(body.rollNo || '').trim().toLowerCase();
  const given = String(body.password || '').trim();
  if (!who || !given) return { success: false, message: 'Invalid roll number or password.' };
  for (let i = 1; i < data.length; i++) {
    const [rollNo, password, name, batch, email] = data[i];
    if (String(rollNo).trim().toLowerCase() !== who) continue;
    if (!passwordMatches(password, given)) break;
    if (String(password).indexOf(HASH_PREFIX) !== 0) {
      sheet.getRange(i + 1, 2).setValue(newPasswordHash(given));   // upgrade a plain-text cell
    }
    return { success: true, student: { rollNo: String(rollNo), name, batch, email, token: createSession(rollNo) } };
  }
  return { success: false, message: 'Invalid roll number or password.' };
}

// ------------------------------------------------------------
// Self-registration for the public, worldwide version of the
// course (as opposed to teacher-provisioned students,
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
  sheet.appendRow([email, newPasswordHash(password), name, 'Self-registered', email]);
  return { success: true, student: { rollNo: email, name, batch: 'Self-registered', email, token: createSession(email) } };
}

// ------------------------------------------------------------
// Progress (2026-11-14: now tied to the sign-in).
// Whose progress is read or written comes from the session token, not
// from a roll number typed into the request, so nobody can mark units
// (or Crucibles, which earn the certificate) complete for someone else.
// REQUIRE_SESSION = false brings back the old behaviour (roll number
// trusted as sent) -- only for the few days when learners may still have
// an old copy of the site open in a tab.
// ------------------------------------------------------------
const REQUIRE_SESSION = true;
const SESSION_EXPIRED = { success: false, code: 'SESSION', message: 'Your sign-in has expired. Please sign in again.' };

function progressOwner(body) {
  const fromToken = sessionRollNo(body.token);
  if (fromToken) return fromToken;
  if (!REQUIRE_SESSION && body.rollNo) return String(body.rollNo);
  return null;
}

function handleSaveProgress(body) {
  const rollNo = progressOwner(body);
  if (!rollNo) return SESSION_EXPIRED;
  // One unit (unitId) or several at once (unitIds: a guest's progress being
  // moved into a brand-new account).
  let wanted = body.unitIds || [body.unitId];
  if (typeof wanted === 'string') { try { wanted = JSON.parse(wanted); } catch (e) { wanted = [wanted]; } }
  wanted = wanted.map(String).filter(function (u) { return u && u !== 'undefined' && u.length < 80; }).slice(0, 800);
  if (!wanted.length) return { success: false, message: 'No unit given.' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Progress');
  const data  = sheet.getDataRange().getValues();
  const have  = {};
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === rollNo && String(data[i][1]) === String(body.courseId)) have[String(data[i][2])] = true;
  }
  const now = new Date().toISOString();
  const rows = [];
  wanted.forEach(function (u) { if (!have[u]) { have[u] = true; rows.push([rollNo, body.courseId, u, now]); } });
  if (!rows.length) return { success: true, message: 'Already recorded.' };
  if (rows.length === 1) sheet.appendRow(rows[0]);
  else sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 4).setValues(rows);
  return { success: true, added: rows.length };
}

function handleGetProgress(body) {
  const rollNo = progressOwner(body);
  if (!rollNo) return SESSION_EXPIRED;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Progress');
  const data  = sheet.getDataRange().getValues();
  const units = [];
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === rollNo &&
        String(data[i][1]) === String(body.courseId)) {
      units.push(String(data[i][2]));
    }
  }
  return { success: true, completedUnits: units };
}

// Run ONCE, on a new, empty Sheet. It refuses to run on a Sheet that already
// holds students or progress, so it can never wipe a class by accident.
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hasRows = (name, allowed) => { const sh = ss.getSheetByName(name); return sh && sh.getLastRow() > allowed; };
  if (hasRows('Students', 2) || hasRows('Progress', 1)) {
    throw new Error('setupSheets stopped: this Sheet already has students or progress, and running it would erase them. Nothing was changed.');
  }
  let students = ss.getSheetByName('Students');
  if (!students) students = ss.insertSheet('Students');
  students.clearContents();
  students.appendRow(['RollNo', 'Password', 'Name', 'Batch', 'Email']);
  students.appendRow(['2024CS001', 'pass123', 'Sample Student', '2024-2028', 'student@example.com']);
  let progress = ss.getSheetByName('Progress');
  if (!progress) progress = ss.insertSheet('Progress');
  progress.clearContents();
  progress.appendRow(['RollNo', 'CourseId', 'UnitId', 'CompletedAt']);
  installWeeklySignal();
  return 'Sheets created successfully!';
}

// @adopters:strip-start (institution-only: mini-project report builder)
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
//   Foothold Mini-Project Reports/<rollNo>/draft.prev.json   the draft before the last save (backup)
//   Foothold Mini-Project Reports/<rollNo>/img/         screenshots
// The Reports sheet keeps one index row per student, and ReportSummary
// gets one row per PDF download (the teacher's viva sheet).
// Needs Drive permission: after pasting this, run any function once
// from the editor and accept the new permission, then redeploy.
// ------------------------------------------------------------

const REPORT_FOLDER_NAME = 'Foothold Mini-Project Reports';
const MAX_DRAFT_CHARS = 2000000;
const MAX_IMAGE_BYTES = 1500000;
const MAX_IMAGES = 40;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
// @adopters:strip-end

// ------------------------------------------------------------
// Sign-in sessions. Sign-in hands out a session token (Sessions sheet);
// progress is read and written for the token's owner only.
// ------------------------------------------------------------
const SESSION_DAYS = 30;

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
// A token that checks out is remembered for 6 hours (CacheService), so the
// Sessions sheet is not re-read on every saved exercise.
function sessionRollNo(token) {
  if (!token) return null;
  token = String(token);
  const cache = CacheService.getScriptCache();
  const hit = cache.get('s:' + token);
  if (hit) return hit;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sessions');
  if (!sheet) return null;
  const data = sheet.getDataRange().getValues();
  const oldest = Date.now() - SESSION_DAYS * 24 * 3600 * 1000;
  for (let i = data.length - 1; i >= 1; i--) {
    if (String(data[i][0]) === token) {
      if (new Date(data[i][2]).getTime() < oldest) return null;
      cache.put('s:' + token, String(data[i][1]), 21600);
      return String(data[i][1]);
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

// @adopters:strip-start (institution-only: mini-project report builder)
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

const DRAFT_FILE = 'draft.json';
const BACKUP_FILE = 'draft.prev.json';
const UNREADABLE_MESSAGE = 'Your saved report could not be read. Please tell your faculty, who can restore it. Nothing has been changed.';

// DriveApp's name lookups include files in the trash, so skip those.
function liveFile(folder, name) {
  const it = folder.getFilesByName(name);
  while (it.hasNext()) {
    const file = it.next();
    if (!file.isTrashed()) return file;
  }
  return null;
}

function readDraftFile(folder, name) {
  const file = liveFile(folder, name);
  if (!file) return { file: null, text: '', stored: null };
  const text = file.getBlob().getDataAsString();
  let stored = null;
  try { stored = JSON.parse(text); } catch (e) { /* empty, or cut short by a failed write */ }
  return { file, text, stored: stored && typeof stored === 'object' && stored.data ? stored : null };
}

// The latest readable draft: draft.json, or the backup made before the last
// save when draft.json can't be read. `unreadable` means draft.json exists but
// neither copy can be read, so it must be kept for the faculty to restore from
// Drive's version history.
function readDraft(folder) {
  const main = readDraftFile(folder, DRAFT_FILE);
  const backup = main.stored ? null : readDraftFile(folder, BACKUP_FILE);
  const stored = main.stored || (backup && backup.stored) || null;
  return { main, stored, unreadable: !!main.file && !stored };
}

function writeTextFile(folder, name, content) {
  const file = liveFile(folder, name);
  if (file) file.setContent(content);
  else folder.createFile(name, content, MimeType.PLAIN_TEXT);
}

function handleReportLoad(body, rollNo) {
  const { stored, unreadable } = readDraft(studentFolder(rollNo));
  if (unreadable) return { success: false, code: 'UNREADABLE', message: UNREADABLE_MESSAGE };
  if (!stored) return { success: true, draft: null, version: 0 };
  return { success: true, draft: stored.data, version: stored.version, savedAt: stored.savedAt };
}

// Saves only if the browser started from the latest saved version, so a
// second device can't silently wipe newer work. body.force overrides that
// after the student has been told, and lets this device's copy replace a
// draft.json that can't be read.
function handleReportSave(body, rollNo) {
  let draft = body.draft;
  if (typeof draft === 'string') { try { draft = JSON.parse(draft); } catch (e) { draft = null; } }
  if (!draft || typeof draft !== 'object') return { success: false, message: 'Nothing to save.' };
  const text = JSON.stringify(draft);
  if (text.length > MAX_DRAFT_CHARS) return { success: false, message: 'This report is too large to save. Please shorten the pasted code or text.' };

  const folder = studentFolder(rollNo);
  const { main, stored, unreadable } = readDraft(folder);
  if (unreadable && !body.force) return { success: false, code: 'UNREADABLE', message: UNREADABLE_MESSAGE };
  const current = stored ? Number(stored.version) || 0 : 0;
  if (!body.force && Number(body.baseVersion || 0) !== current) {
    return { success: false, conflict: true, serverVersion: current, savedAt: stored && stored.savedAt };
  }
  const savedAt = new Date().toISOString();
  const content = JSON.stringify({ version: current + 1, savedAt, data: draft });
  // Copy the last good draft aside first, so a write that fails halfway can't
  // lose the report. A draft.json that can't be read is renamed, never
  // overwritten, so its Drive version history stays available.
  if (main.stored) {
    writeTextFile(folder, BACKUP_FILE, main.text);
    main.file.setContent(content);
  } else {
    if (main.file) main.file.setName('draft.unreadable-' + savedAt.replace(/[:.]/g, '-') + '.json');
    folder.createFile(DRAFT_FILE, content, MimeType.PLAIN_TEXT);
  }

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
// @adopters:strip-end

// ------------------------------------------------------------
// Usage signal (licence section 4). Once a week this copy sends the course
// author three counts, so the author knows how many classes use the course:
//   students registered · students active this week · units completed this week
// plus this copy's random install id and its site address (if the class
// dashboard knows it). NO student data is ever sent: no names, emails, roll
// numbers, passwords, code or answers. Read sendWeeklySignal() below to check.
// setupSheets() switches it on; installWeeklySignal() does it on its own.
// ------------------------------------------------------------
const ADOPTION_SIGNAL_URL = '';   // @adopters:replace-with const ADOPTION_SIGNAL_URL = '{{SIGNAL_URL}}';

function installWeeklySignal() {
  if (!ADOPTION_SIGNAL_URL) return 'No signal address set: nothing installed.';
  ScriptApp.getProjectTriggers()
    .filter(function (t) { return t.getHandlerFunction() === 'sendWeeklySignal'; })
    .forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('sendWeeklySignal').timeBased().everyWeeks(1).onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(6).create();
  sendWeeklySignal();
  return 'Weekly usage signal switched on.';
}

function weeklyCounts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rows = function (name) { const sh = ss.getSheetByName(name); return sh ? sh.getDataRange().getValues().slice(1) : []; };
  const since = Date.now() - 7 * 24 * 3600 * 1000;
  const recent = function (v) { const t = new Date(v).getTime(); return !isNaN(t) && t >= since; };
  const registered = rows('Students').filter(function (r) { return String(r[0]).trim() && String(r[0]) !== '2024CS001'; }).length;
  const active = {};
  rows('Events').forEach(function (r) { if (r[2] && recent(r[0])) active[String(r[2])] = true; });
  const units = rows('Progress').filter(function (r) { return recent(r[3]) && String(r[2]).indexOf('@') < 0; }).length;
  return { registered: registered, activeThisWeek: Object.keys(active).length, unitsThisWeek: units };
}

function sendWeeklySignal() {
  if (!ADOPTION_SIGNAL_URL) return;
  const props = PropertiesService.getScriptProperties();
  let install = props.getProperty('INSTALL_ID');
  if (!install) { install = Utilities.getUuid(); props.setProperty('INSTALL_ID', install); }
  const c = weeklyCounts();
  const payload = {
    type: 'weekly', install: install, site: props.getProperty('FOOTHOLD_SITE_URL') || '',
    registered: c.registered, activeThisWeek: c.activeThisWeek, unitsThisWeek: c.unitsThisWeek,
  };
  try {
    UrlFetchApp.fetch(ADOPTION_SIGNAL_URL, { method: 'post', contentType: 'application/json', payload: JSON.stringify(payload), muteHttpExceptions: true, followRedirects: false });
  } catch (e) { /* never let the signal disturb the course */ }
}
