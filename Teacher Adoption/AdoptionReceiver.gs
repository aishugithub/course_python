// ============================================================
//  ADOPTION RECEIVER — collects the usage signal from teachers' copies
//
//  This is the author's own script. It never goes into the adopters' copy.
//
//  One-time setup (about 5 minutes):
//    1. Create a NEW Google Sheet, e.g. "Foothold Adopters".
//    2. Extensions → Apps Script. Paste this whole file. Save.
//    3. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone.
//    4. Copy the Web app URL into  adopters/signal-url.txt  in the course repo,
//       then run the export again (node scripts/make-adopter-copy.mjs).
//  Later changes: Deploy → Manage deployments → Edit → New version (same URL).
//
//  What arrives (and nothing else is stored):
//    Deploys tab — each time a copy is published: repository, site address, course title.
//    Weekly tab  — once a week per copy: install id, site address, students registered,
//                  students active that week, units completed that week.
//  No student data is sent by the copies, and anything unexpected is dropped here.
// ============================================================

function doPost(e) {
  let body = {};
  try { body = JSON.parse(e.postData.contents); } catch (err) { return reply(false); }
  const text = function (v) { return String(v == null ? '' : v).replace(/[\r\n\t]/g, ' ').slice(0, 200); };
  const count = function (v) { const n = Math.floor(Number(v)); return isFinite(n) && n >= 0 && n < 1e7 ? n : ''; };
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    if (body.type === 'deploy') {
      tab('Deploys', ['Received', 'Repository', 'Site', 'CourseTitle'])
        .appendRow([new Date(), text(body.repo), text(body.site), text(body.title)]);
      return reply(true);
    }
    if (body.type === 'weekly') {
      tab('Weekly', ['Received', 'InstallId', 'Site', 'Registered', 'ActiveThisWeek', 'UnitsThisWeek'])
        .appendRow([new Date(), text(body.install), text(body.site),
                    count(body.registered), count(body.activeThisWeek), count(body.unitsThisWeek)]);
      return reply(true);
    }
    return reply(false);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('Foothold adoption receiver is running.');
}

function tab(name, header) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(header);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function reply(ok) {
  return ContentService.createTextOutput(JSON.stringify({ success: ok })).setMimeType(ContentService.MimeType.JSON);
}
