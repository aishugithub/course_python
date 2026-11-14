// ============================================================
//  FOOTHOLD — teacher registration: automatic welcome email
//
//  Where this goes: open the Google FORM's response Sheet →
//  Extensions → Apps Script → paste this whole file → Save.
//  Then choose the function `installTrigger` and press Run ONCE
//  (accept the permission request). From then on, every new form
//  response gets the welcome email within about a minute.
//
//  The form needs three questions, with exactly these titles:
//      Name   ·   Email   ·   Institution
//  (other questions are fine; they are simply not used here).
//
//  The response Sheet doubles as your list of adopters. This script
//  adds one column, "Welcome email", saying when the mail went out
//  (or why it could not).
//
//  Limit: a free Google account can send about 100 emails a day.
// ============================================================

const GUIDE_URL  = 'https://github.com/aishugithub/course_python/blob/main/TEACHERS_GUIDE.md';
const COURSE_URL = 'https://aishugithub.github.io/course_python/';
const SENDER_NAME = 'Aishwarya S · Foothold';
const STATUS_HEADER = 'Welcome email';

// Run once from the editor.
function installTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'onTeacherRegistered') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onTeacherRegistered').forSpreadsheet(ss).onFormSubmit().create();
  return 'Done. New registrations will now receive the welcome email.';
}

function onTeacherRegistered(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  const answers = e.namedValues || {};
  const pick = function (title) { return String((answers[title] || [''])[0]).trim(); };
  const name = pick('Name') || 'Teacher';
  const email = pick('Email');
  const institution = pick('Institution');

  let status;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    status = 'NOT SENT: no valid email in the response';
  } else {
    try {
      MailApp.sendEmail({
        to: email,
        name: SENDER_NAME,
        subject: 'Your Foothold setup guide',
        body: welcomeText(name, institution),
        htmlBody: welcomeHtml(name, institution),
      });
      status = 'Sent ' + new Date().toISOString();
    } catch (err) {
      status = 'NOT SENT: ' + err;
    }
  }
  sheet.getRange(row, statusColumn(sheet)).setValue(status);
}

// Finds (or adds) the "Welcome email" column.
function statusColumn(sheet) {
  const last = Math.max(sheet.getLastColumn(), 1);
  const header = sheet.getRange(1, 1, 1, last).getValues()[0];
  const at = header.indexOf(STATUS_HEADER);
  if (at !== -1) return at + 1;
  sheet.getRange(1, last + 1).setValue(STATUS_HEADER);
  return last + 1;
}

function welcomeText(name, institution) {
  return [
    'Dear ' + name + ',',
    '',
    'Thank you for registering to teach with Foothold' + (institution ? ' at ' + institution : '') + '.',
    '',
    'Here is the step-by-step guide to setting up your own copy of the course:',
    GUIDE_URL,
    '',
    'What you need: a GitHub account, a Google account and about 45 minutes.',
    'What you get: the full course on your own web address, with your students\' sign-ins',
    'and progress in your own Google Sheet. Nobody else can see your students\' data.',
    '',
    'You can see the course as a learner here: ' + COURSE_URL,
    '',
    'If any step does not work, just reply to this email and I will help you through it.',
    '',
    'One request: please keep the line "Built on Foothold" on your site.',
    '',
    'Warm regards,',
    'Aishwarya S',
    'Foothold',
  ].join('\n');
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function welcomeHtml(name, institution) {
  return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#16294A;max-width:560px">'
    + '<p>Dear ' + esc(name) + ',</p>'
    + '<p>Thank you for registering to teach with <strong>Foothold</strong>' + (institution ? ' at ' + esc(institution) : '') + '.</p>'
    + '<p><a href="' + GUIDE_URL + '" style="display:inline-block;background:#E7A13E;color:#111A2E;font-weight:bold;text-decoration:none;padding:11px 20px;border-radius:8px">Open the setup guide</a></p>'
    + '<p><strong>What you need:</strong> a GitHub account, a Google account and about 45 minutes.<br>'
    + '<strong>What you get:</strong> the full course on your own web address, with your students\' sign-ins and progress in your own Google Sheet. Nobody else can see your students\' data.</p>'
    + '<p>You can see the course as a learner here: <a href="' + COURSE_URL + '">' + COURSE_URL + '</a></p>'
    + '<p>If any step does not work, just reply to this email and I will help you through it.</p>'
    + '<p>One request: please keep the line &ldquo;Built on Foothold&rdquo; on your site.</p>'
    + '<p>Warm regards,<br>Aishwarya S<br>Foothold</p>'
    + '</div>';
}

// To see the email before any teacher does: put your own address here, then Run.
function sendTestToMyself() {
  const me = Session.getActiveUser().getEmail();
  MailApp.sendEmail({ to: me, name: SENDER_NAME, subject: 'TEST · Your Foothold setup guide',
    body: welcomeText('Test Teacher', 'Test College'), htmlBody: welcomeHtml('Test Teacher', 'Test College') });
  return 'Test email sent to ' + me;
}
