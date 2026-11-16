// ============================================================
//  ADOPTION RECEIVER — the author's own script, in the "Foothold Adopters" Sheet
//  (foothold.aishwarya@gmail.com). It never goes into the adopters' copy.
//
//  It does three jobs:
//    A. Teacher registrations from the course site's "For teachers" page:
//       one row per teacher in the Registrations tab, and a welcome email with
//       the set-up guide sent to the teacher within a minute.
//    B. The usage signal from teachers' copies (counts only).
//    C. One follow-up email per teacher, about a month in: "Do you need any
//       support? What should be better? Would you share a few words?"
//       (see "C. Follow-up" below for exactly when it goes out).
//
//  First-time setup (about 5 minutes):
//    1. Create a NEW Google Sheet, e.g. "Foothold Adopters".
//    2. Extensions → Apps Script. Paste this whole file. Save.
//    3. Pick the function  setUpAndSendTests  and press Run (allow the permissions).
//    4. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone.
//    5. Copy the Web app URL into  adopters/signal-url.txt  in the course repo,
//       then run the export again (node scripts/make-adopter-copy.mjs).
//
//  UPDATING an existing deployment (this is what you do after this file changes):
//    1. Paste this whole file over the old one. Save.
//    2. Pick the function  setUpAndSendTests  and press Run. Google asks for new
//       permissions (send email as you; run once a day): allow them. Two test
//       emails arrive in this account's inbox: the welcome email and the follow-up,
//       exactly as a teacher will get them.
//    3. Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy.
//       The address stays the same.
//
//  What is stored (and nothing else):
//    Registrations tab — what a teacher typed into the form, whether the welcome
//                        email and the follow-up went out, and the teacher's site
//                        (filled in by this script when it can, or by you).
//    Deploys tab — each time a copy is published: repository, site address, course title.
//    Weekly tab  — once a week per copy: install id, site address, students registered,
//                  students active that week, units completed that week.
//  No student data is sent by the copies, and anything unexpected is dropped here.
//
//  Limit: a free Google account sends about 100 emails a day. This script stops at
//  MAIL_CAP_PER_DAY emails to teachers a day; later registrations are still saved,
//  marked "NOT SENT: daily limit", and you can write to those teachers yourself.
// ============================================================

const GUIDE_URL    = 'https://github.com/foothold-courses/python/blob/main/TEACHERS_GUIDE.md';
const START_URL    = 'https://github.com/foothold-courses/python/generate';
const CLAUDE_URL   = 'https://github.com/foothold-courses/python/blob/main/SETUP_WITH_CLAUDE.md';
const LICENCE_URL  = 'https://github.com/foothold-courses/python/blob/main/LICENSE.md';
const COURSE_URL   = 'https://aishugithub.github.io/course_python/';
const CREDIT_LINE  = 'Foothold Python course by Aishwarya S.';
const SENDER_NAME  = 'Aishwarya S · Foothold';
const NOTIFY_OWNER = true;      // a short "new registration" note to this account's own inbox
const MAIL_CAP_PER_DAY = 40;

// Follow-up timing (see "C. Follow-up").
const ACTIVE_WEEKS_FOR_FOLLOW_UP = 4;   // weeks in which the teacher's copy had active students
const FOLLOW_UP_FALLBACK_DAYS = 42;     // if the copy is not known or not active: days after registering

// The Registrations tab: column title → the field the form sends.
const REG_COLUMNS = [
  ['Received', null],
  ['Name', 'name'], ['Email', 'email'], ['Phone', 'phone'],
  ['Institution', 'institution'], ['City / Country', 'place'], ['Role', 'role'],
  ['Teaching', 'level'], ['Year / Class', 'year'], ['Branch / Subject', 'branch'],
  ['Purpose', 'purpose'], ['Expected students', 'students'], ['Planned start', 'start'],
  ['Certificate signed by teacher', 'certificate'], ['Heard from', 'heard'],
  ['GitHub username', 'github'], ['Message', 'message'],
  ['Welcome email', null], ['Site', null], ['Follow-up', null],
];
// Column number (1-based) of a Registrations column, by its title.
function col(title) {
  for (let i = 0; i < REG_COLUMNS.length; i++) if (REG_COLUMNS[i][0] === title) return i + 1;
  throw new Error('No such column: ' + title);
}

function doPost(e) {
  let body = {};
  try { body = JSON.parse(e.postData.contents); } catch (err) { return reply(false); }
  const text = function (v) { return String(v == null ? '' : v).replace(/[\r\n\t]/g, ' ').slice(0, 200); };
  const count = function (v) { const n = Math.floor(Number(v)); return isFinite(n) && n >= 0 && n < 1e7 ? n : ''; };
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    if (body.type === 'register') return register(body);
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

// ── A. Teacher registration ─────────────────────────────────────────────────

function register(body) {
  // `website` is a field people never see; only automated form-fillers complete it.
  // They get a normal-looking answer and nothing is stored or sent.
  if (body.website) return reply(true);

  // One line of plain text per answer.
  const clean = function (v, max) {
    return String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max || 200);
  };
  // In the Sheet, a leading = + - @ would be read as a formula: write it as text instead.
  const cell = function (s) { return /^[=+\-@]/.test(s) ? "'" + s : s; };
  const name = clean(body.name, 100);
  const email = String(body.email == null ? '' : body.email).trim().slice(0, 150);
  const institution = clean(body.institution, 200);
  if (!name || !institution || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return reply(false, 'Please fill in your name, email and institution.');
  }

  const sheet = tab('Registrations', REG_COLUMNS.map(function (c) { return c[0]; }));

  // The same address registering again within a day is saved, but not emailed twice.
  let alreadyMailed = false;
  const last = sheet.getLastRow();
  if (last > 1) {
    const from = Math.max(2, last - 199);
    const rows = sheet.getRange(from, 1, last - from + 1, REG_COLUMNS.length).getValues();
    const dayAgo = Date.now() - 24 * 3600 * 1000;
    alreadyMailed = rows.some(function (r) {
      return String(r[col('Email') - 1]).toLowerCase() === email.toLowerCase()
        && r[0] instanceof Date && r[0].getTime() > dayAgo
        && /^Sent/.test(String(r[col('Welcome email') - 1]));
    });
  }

  let status;
  if (alreadyMailed) {
    status = 'Not sent again: already sent to this address today';
  } else if (!mailBudgetLeft()) {
    status = 'NOT SENT: daily limit reached. Write to this teacher yourself.';
  } else {
    try {
      MailApp.sendEmail({
        to: email, name: SENDER_NAME, subject: 'Your Foothold set-up guide',
        body: welcomeText(name, institution), htmlBody: welcomeHtml(name, institution),
      });
      status = 'Sent ' + new Date().toISOString();
    } catch (err) {
      status = 'NOT SENT: ' + err;
    }
  }

  const row = REG_COLUMNS.map(function (c) {
    if (c[0] === 'Received') return new Date();
    if (c[0] === 'Welcome email') return status;
    if (!c[1]) return '';
    if (c[1] === 'email') return cell(email);
    if (c[1] === 'message') return cell(clean(body.message, 1000));
    if (c[1] === 'github') return cell(clean(body.github, 40).replace(/^@/, ''));
    return cell(clean(body[c[1]], c[1] === 'name' ? 100 : 200));
  });
  sheet.appendRow(row);

  if (NOTIFY_OWNER) {
    try {
      MailApp.sendEmail({
        to: Session.getEffectiveUser().getEmail(), name: 'Foothold registrations',
        subject: 'New Foothold teacher: ' + name + ', ' + institution,
        body: REG_COLUMNS.filter(function (c) { return c[1] || c[0] === 'Received' || c[0] === 'Welcome email'; })
          .map(function (c) { return c[0] + ': ' + row[col(c[0]) - 1]; }).join('\n')
          + '\n\nAll registrations: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      });
    } catch (err) { /* the registration is saved either way */ }
  }
  return reply(true);
}

// Counts emails to teachers per day, so a flood of fake registrations cannot use
// up the account's sending allowance.
function mailBudgetLeft() {
  const props = PropertiesService.getScriptProperties();
  const key = 'mail_' + Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM-dd');
  const used = Number(props.getProperty(key) || 0);
  if (used >= MAIL_CAP_PER_DAY) return false;
  props.setProperty(key, String(used + 1));
  return true;
}

function welcomeText(name, institution) {
  return [
    'Dear ' + name + ',',
    '',
    'Thank you for registering to teach with Foothold' + (institution ? ' at ' + institution : '') + '.',
    'Here is everything you need to put your own copy of the course online.',
    '',
    'THE SET-UP GUIDE (about 30 minutes, no programming):',
    GUIDE_URL,
    '',
    'You need a GitHub account and a Google account. Both are free.',
    'Step 1 of the guide starts here: ' + START_URL,
    '',
    'PREFER TO BE GUIDED?',
    'Open a new chat at claude.ai (a free account is fine), attach the file below and type "start".',
    'Claude takes you through the same steps one at a time.',
    CLAUDE_URL,
    '',
    'WHAT YOU GET',
    '- The whole course on your own web address.',
    '- Your own record book (a Google Sheet): your students\' sign-ins and progress stay with you.',
    '  Nobody else can see them, including me.',
    '- A class dashboard: who is progressing, who has gone quiet, which programs the class finds hard.',
    '- A course certificate that carries your name as the teacher.',
    '',
    'WHAT I ASK IN RETURN',
    '- Keep the credit line "' + CREDIT_LINE + '" on your site (it is already there).',
    '- Keep the usage signal switched on. Once a week your copy sends me three counts',
    '  (students registered, students active, units completed). No student data is ever sent.',
    'The full terms are in the licence: ' + LICENCE_URL,
    '',
    'You can try the course as a learner here: ' + COURSE_URL,
    '',
    'If any step does not work, just reply to this email and I will help you through it.',
    '',
    'Warm regards,',
    'Aishwarya S',
    'Foothold',
  ].join('\n');
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const MAIL_STYLE = 'font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#16294A;max-width:580px';

function welcomeHtml(name, institution) {
  const h = function (t) { return '<p style="margin:22px 0 6px;font-weight:bold;color:#16294A">' + t + '</p>'; };
  const a = function (url, label) { return '<a href="' + url + '" style="color:#1F5FAD">' + (label || url) + '</a>'; };
  return '<div style="' + MAIL_STYLE + '">'
    + '<p>Dear ' + esc(name) + ',</p>'
    + '<p>Thank you for registering to teach with <strong>Foothold</strong>' + (institution ? ' at ' + esc(institution) : '') + '. '
    + 'Here is everything you need to put your own copy of the course online.</p>'
    + '<p><a href="' + GUIDE_URL + '" style="display:inline-block;background:#E7A13E;color:#111A2E;font-weight:bold;text-decoration:none;padding:11px 20px;border-radius:8px">Open the set-up guide</a></p>'
    + '<p>It takes about 30 minutes and needs no programming. You need a GitHub account and a Google account; both are free. '
    + 'Step 1 of the guide starts ' + a(START_URL, 'here') + '.</p>'
    + h('Prefer to be guided?')
    + '<p style="margin:0">Open a new chat at claude.ai (a free account is fine), attach ' + a(CLAUDE_URL, 'this file') + ' and type <em>start</em>. '
    + 'Claude takes you through the same steps one at a time.</p>'
    + h('What you get')
    + '<ul style="margin:0;padding-left:20px">'
    + '<li>The whole course on your own web address.</li>'
    + '<li>Your own record book (a Google Sheet): your students\' sign-ins and progress stay with you. Nobody else can see them, including me.</li>'
    + '<li>A class dashboard: who is progressing, who has gone quiet, which programs the class finds hard.</li>'
    + '<li>A course certificate that carries your name as the teacher.</li>'
    + '</ul>'
    + h('What I ask in return')
    + '<ul style="margin:0;padding-left:20px">'
    + '<li>Keep the credit line &ldquo;' + esc(CREDIT_LINE) + '&rdquo; on your site (it is already there).</li>'
    + '<li>Keep the usage signal switched on. Once a week your copy sends me three counts: students registered, students active and units completed. No student data is ever sent.</li>'
    + '</ul>'
    + '<p>The full terms are in the ' + a(LICENCE_URL, 'licence') + '. You can try the course as a learner at ' + a(COURSE_URL) + '.</p>'
    + '<p>If any step does not work, just reply to this email and I will help you through it.</p>'
    + '<p>Warm regards,<br>Aishwarya S<br>Foothold</p>'
    + '</div>';
}

// ── C. Follow-up: support, feedback and a testimonial ───────────────────────
//
//  Runs once a day (the trigger is created by setUpAndSendTests). Each teacher
//  gets ONE follow-up email, when the first of these becomes true:
//    • their copy has had active students in ACTIVE_WEEKS_FOR_FOLLOW_UP weekly
//      signals (about a month of real use), or
//    • FOLLOW_UP_FALLBACK_DAYS days have passed since they registered (their copy
//      is not known, not set up yet, or quiet: they may need help).
//
//  How a teacher is linked to a copy: the Site column of Registrations. This script
//  fills it in when the teacher gave a GitHub username and a copy has been published
//  from that GitHub account (Deploys tab). Otherwise you can paste the site address
//  into the Site column yourself when you recognise a copy.
//
//  To stop a follow-up for one teacher, type anything (for example "skip") in that
//  row's Follow-up cell. To send again, clear the cell.

function sendFollowUps() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const reg = ss.getSheetByName('Registrations');
  if (!reg || reg.getLastRow() < 2) return 'No registrations yet.';
  const values = function (name) {
    const sh = ss.getSheetByName(name);
    return sh && sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues() : [];
  };
  const norm = function (site) { return String(site).trim().toLowerCase().replace(/\/+$/, ''); };

  // Weeks with at least one active student, per site.
  const activeWeeks = {};
  values('Weekly').forEach(function (r) {
    const s = norm(r[2]);
    if (s && Number(r[4]) > 0) activeWeeks[s] = (activeWeeks[s] || 0) + 1;
  });
  // Latest published site per GitHub account ("owner/repository" → owner).
  const siteOfOwner = {};
  values('Deploys').forEach(function (r) {
    const owner = String(r[1]).split('/')[0].trim().toLowerCase();
    if (owner && r[2]) siteOfOwner[owner] = String(r[2]);
  });

  const rows = reg.getRange(2, 1, reg.getLastRow() - 1, REG_COLUMNS.length).getValues();
  const followed = {};   // addresses that already had a follow-up
  rows.forEach(function (r) {
    if (/^Sent/.test(String(r[col('Follow-up') - 1]))) followed[String(r[col('Email') - 1]).toLowerCase()] = true;
  });

  let sent = 0;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i], rowNo = i + 2;
    const email = String(r[col('Email') - 1]).trim();
    if (String(r[col('Follow-up') - 1]).trim()) continue;                   // done, or switched off by hand
    if (!/^Sent/.test(String(r[col('Welcome email') - 1]))) continue;       // repeats and unsent rows
    if (followed[email.toLowerCase()]) { reg.getRange(rowNo, col('Follow-up')).setValue('Not sent: this address already had one'); continue; }

    let site = String(r[col('Site') - 1]).trim();
    const github = String(r[col('GitHub username') - 1]).trim().toLowerCase();
    if (!site && github && siteOfOwner[github]) {
      site = siteOfOwner[github];
      reg.getRange(rowNo, col('Site')).setValue(site);
    }

    const weeks = site ? (activeWeeks[norm(site)] || 0) : 0;
    const days = r[0] instanceof Date ? (Date.now() - r[0].getTime()) / (24 * 3600 * 1000) : 0;
    const active = weeks >= ACTIVE_WEEKS_FOR_FOLLOW_UP;
    if (!active && days < FOLLOW_UP_FALLBACK_DAYS) continue;

    if (!mailBudgetLeft()) break;   // the rest go out tomorrow
    const name = String(r[col('Name') - 1]).replace(/^'/, '') || 'Teacher';
    let status;
    try {
      MailApp.sendEmail({
        to: email, name: SENDER_NAME, subject: 'How is Foothold going? Can I help?',
        body: followUpText(name, active), htmlBody: followUpHtml(name, active),
      });
      status = 'Sent ' + new Date().toISOString() + (active ? ' (active class)' : ' (' + Math.floor(days) + ' days after registering)');
      followed[email.toLowerCase()] = true;
      sent++;
    } catch (err) {
      status = 'NOT SENT: ' + err;
    }
    reg.getRange(rowNo, col('Follow-up')).setValue(status);
  }
  return sent + ' follow-up email(s) sent.';
}

// The three things the follow-up asks, shared by the plain and the HTML version.
function followUpParts(active) {
  return {
    opening: active
      ? 'Your students have been working through Foothold for about a month now. Thank you for teaching with it. I am writing to ask how it is going.'
      : 'It is a few weeks since you registered to teach with Foothold. I am writing to ask how it is going.',
    items: [
      ['Do you need any support?',
       'If anything is not working, or you would like to change something (hide a module, add a lesson of your own, read the class dashboard), tell me and I will help. If you have not set up your copy yet and something is in the way, tell me that too.'],
      ['What should be better?',
       'Anything you or your students found confusing, missing or too hard. Even one line helps the next class.'],
      ['Would you share a few words?',
       'If Foothold has been useful to your class, two or three sentences from you would mean a lot. With your permission I would show them on the Foothold site with your name and institution. Say so if you would rather not be named.'],
    ],
    closing: 'Just reply to this email. I read every reply myself.',
  };
}

function followUpText(name, active) {
  const p = followUpParts(active);
  const lines = ['Dear ' + name + ',', '', p.opening, ''];
  p.items.forEach(function (it, i) { lines.push((i + 1) + '. ' + it[0].toUpperCase(), it[1], ''); });
  lines.push(p.closing, '', 'Warm regards,', 'Aishwarya S', 'Foothold');
  return lines.join('\n');
}

function followUpHtml(name, active) {
  const p = followUpParts(active);
  return '<div style="' + MAIL_STYLE + '">'
    + '<p>Dear ' + esc(name) + ',</p>'
    + '<p>' + esc(p.opening) + '</p>'
    + p.items.map(function (it, i) {
        return '<p style="margin:18px 0 4px;font-weight:bold">' + (i + 1) + '. ' + esc(it[0]) + '</p><p style="margin:0">' + esc(it[1]) + '</p>';
      }).join('')
    + '<p style="margin-top:18px">' + esc(p.closing) + '</p>'
    + '<p>Warm regards,<br>Aishwarya S<br>Foothold</p>'
    + '</div>';
}

// ── Run once from the editor after pasting this file ────────────────────────
// It asks for the permissions (send email; run once a day), switches on the daily
// follow-up check, and sends you both emails exactly as a teacher will get them.
function setUpAndSendTests() {
  ScriptApp.getProjectTriggers()
    .filter(function (t) { return t.getHandlerFunction() === 'sendFollowUps'; })
    .forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('sendFollowUps').timeBased().everyDays(1).atHour(9).create();

  const me = Session.getEffectiveUser().getEmail();
  MailApp.sendEmail({ to: me, name: SENDER_NAME, subject: 'TEST · Your Foothold set-up guide',
    body: welcomeText('Test Teacher', 'Test College'), htmlBody: welcomeHtml('Test Teacher', 'Test College') });
  MailApp.sendEmail({ to: me, name: SENDER_NAME, subject: 'TEST · How is Foothold going? Can I help?',
    body: followUpText('Test Teacher', true), htmlBody: followUpHtml('Test Teacher', true) });
  return 'Daily follow-up check switched on. Two test emails sent to ' + me;
}

// ── Shared ──────────────────────────────────────────────────────────────────

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

function reply(ok, message) {
  const out = { success: ok };
  if (message) out.message = message;
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
