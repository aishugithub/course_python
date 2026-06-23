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
    case 'saveProgress': return handleSaveProgress(body);
    case 'getProgress':  return handleGetProgress(body);
    default:             return { success: false, message: 'Unknown action' };
  }
}

function handleLogin(body) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Students');
  const data  = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const [rollNo, password, name, batch, email] = data[i];
    if (String(rollNo).trim() === String(body.rollNo).trim() &&
        String(password).trim() === String(body.password).trim()) {
      return { success: true, student: { rollNo: String(rollNo), name, batch, email } };
    }
  }
  return { success: false, message: 'Invalid roll number or password.' };
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
