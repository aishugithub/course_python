// ============================================================
//  CLASSDASHBOARD.GS — the teacher's view of the class.
//
//  Where this goes: the SAME Apps Script project as Code.gs (the one bound to
//  the course Sheet). Add a new script file, paste this in, save, then reload
//  the Sheet. A menu appears:  Foothold → Open class dashboard.
//
//  Nothing here is public: it runs only for people who can open the Sheet.
//  It reads the Students, Progress and Events tabs and changes nothing, except
//  when you press "Export" (which writes a tab named "Class export").
//
//  The list of units and programs comes from the course site itself
//  (course-manifest.json, rebuilt on every publish), so the dashboard always
//  matches the lessons your students see.
// ============================================================

// Adds the Foothold menu to the Sheet each time the Sheet is opened.
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Foothold')
    .addItem('Open class dashboard', 'openClassDashboard')
    .addToUi();
  console.log("The Foothold menu is now in your Google Sheet. Go to the Sheet's browser tab "
    + '(reload it if the menu is not there) and choose  Foothold → Open class dashboard.');
}

// The menu item: the Sheet is already in front of the teacher, so just open it.
function openClassDashboard() {
  const html = HtmlService.createHtmlOutput(CLASS_DASHBOARD_HTML).setWidth(1280).setHeight(760);
  SpreadsheetApp.getUi().showModalDialog(html, 'Foothold — class dashboard');
}

// For pressing Run in the Apps Script editor. Google always shows the dashboard
// inside the SHEET's browser tab, never in the editor, so this also says where
// to look: a message in the editor's log and a pop-up note on the Sheet.
function showClassDashboard() {
  const where = "👉 Switch to your Google Sheet's browser tab: the class dashboard is open there, not in this editor. "
    + 'Next time, open it straight from the Sheet: menu  Foothold → Open class dashboard.';
  try {
    openClassDashboard();
    SpreadsheetApp.getActiveSpreadsheet().toast('Your class dashboard is open. Next time use the menu Foothold → Open class dashboard.', 'Foothold', 15);
    console.log('✅ The class dashboard has opened. ' + where);
  } catch (e) {
    console.log('The dashboard opens inside your Google Sheet, and the Sheet is not open right now. '
      + 'Open the Sheet in another browser tab, reload it, and choose  Foothold → Open class dashboard.');
  }
}

function rowsOf(name) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  return sh ? sh.getDataRange().getValues().slice(1) : [];
}

// Everything the page needs, already condensed (the Events tab can be long).
function classDashboardData() {
  const idOf = function (v) { return String(v == null ? '' : v).trim().toLowerCase(); };
  const iso = function (v) { try { return v ? new Date(v).toISOString() : ''; } catch (e) { return ''; } };

  const students = rowsOf('Students')
    .filter(function (r) { return String(r[0]).trim(); })
    .map(function (r) { return { id: idOf(r[0]), login: String(r[0]).trim(), name: String(r[2] || '').trim(), batch: String(r[3] || '').trim() }; });

  const progress = rowsOf('Progress')
    .filter(function (r) { return r[0] && r[2]; })
    .map(function (r) { return [idOf(r[0]), String(r[2]), iso(r[3])]; });

  let siteUrl = PropertiesService.getScriptProperties().getProperty('FOOTHOLD_SITE_URL') || '';
  const lastSeen = {}, time = {}, skips = {}, programs = {};
  rowsOf('Events').forEach(function (r) {
    const when = iso(r[0]), user = idOf(r[2]), type = String(r[3]), unit = String(r[5] || ''), detail = String(r[6] || '');
    if (type === 'session_start' && /^https?:\/\//.test(detail) && !/localhost|127\.0\.0\.1/.test(detail)) siteUrl = detail;
    if (!user) return;
    if (when > (lastSeen[user] || '')) lastSeen[user] = when;
    let d = null;
    if (detail.charAt(0) === '{') { try { d = JSON.parse(detail); } catch (e) { d = null; } }
    if (type === 'lesson_time' && d && d.seconds > 0) {
      time[user] = time[user] || {};
      time[user][unit] = (time[user][unit] || 0) + Number(d.seconds);
    } else if (type === 'section_skip') {
      skips[unit] = (skips[unit] || 0) + 1;
    } else if (type === 'challenge_stage_complete' && d && unit.indexOf('@ex:') !== -1) {
      const p = programs[unit] = programs[unit] || { n: 0, attempts: 0, errors: {} };
      p.n += 1;
      p.attempts += Number(d.attempts) || 1;
      (d.errors || []).forEach(function (e) { p.errors[e] = (p.errors[e] || 0) + 1; });
    }
  });

  return JSON.stringify({ siteUrl: siteUrl, students: students, progress: progress, lastSeen: lastSeen, time: time, skips: skips, programs: programs, now: new Date().toISOString() });
}

function saveSiteUrl(url) {
  url = String(url || '').trim();
  if (!/^https:\/\/.+/.test(url)) throw new Error('That does not look like a web address (it should start with https://).');
  if (url.charAt(url.length - 1) !== '/') url += '/';
  PropertiesService.getScriptProperties().setProperty('FOOTHOLD_SITE_URL', url);
  return url;
}

// Writes the student table shown on screen to a tab, for marks or records.
function exportClassTable(rows) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Class export');
  if (!sh) sh = ss.insertSheet('Class export');
  sh.clearContents();
  if (rows && rows.length) sh.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  return 'Saved ' + Math.max(0, rows.length - 1) + ' students to the "Class export" tab.';
}

// ------------------------------------------------------------
//  The page. Plain HTML + JavaScript, no outside libraries.
// ------------------------------------------------------------
const CLASS_DASHBOARD_HTML = String.raw`<!doctype html>
<html><head><meta charset="utf-8"><base target="_top">
<style>
  :root { --bg:#F1EEE6; --card:#FFFFFF; --border:#E7E0D2; --ink:#16294A; --soft:#40506A; --muted:#8A97AB;
          --good:#1F7A4D; --warn:#B0651F; --bad:#B0322F; --track:#EDE8DC; --accent:#16294A; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font:14px/1.5 system-ui,-apple-system,"Segoe UI",Arial,sans-serif; }
  .wrap { padding:18px 22px 40px; }
  h1 { font-size:19px; margin:0; } h2 { font-size:15px; margin:0 0 8px; }
  .sub { color:var(--soft); font-size:13px; }
  .tiles { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin:16px 0; }
  .tile { background:var(--card); border:1px solid var(--border); border-radius:10px; padding:12px 14px; }
  .tile .n { font-size:26px; font-weight:700; line-height:1.2; } .tile .l { color:var(--soft); font-size:12.5px; }
  .tabs { display:flex; gap:6px; margin:6px 0 12px; flex-wrap:wrap; align-items:center; }
  .tab { padding:7px 14px; border-radius:999px; border:1.5px solid var(--border); background:var(--card); color:var(--soft); cursor:pointer; font:inherit; }
  .tab.on { background:var(--accent); border-color:var(--accent); color:#fff; font-weight:700; }
  .spacer { flex:1; }
  input[type=search], input[type=text] { font:inherit; padding:7px 10px; border:1px solid var(--border); border-radius:8px; background:var(--card); color:var(--ink); min-width:220px; }
  button.act { font:inherit; padding:7px 14px; border-radius:8px; border:1px solid var(--border); background:var(--card); color:var(--ink); cursor:pointer; font-weight:600; }
  .card { background:var(--card); border:1px solid var(--border); border-radius:10px; overflow:auto; }
  table { border-collapse:collapse; width:100%; }
  th, td { padding:8px 12px; text-align:left; border-bottom:1px solid var(--border); white-space:nowrap; }
  th { position:sticky; top:0; background:var(--card); font-size:12px; color:var(--soft); cursor:pointer; user-select:none; z-index:1; }
  th.num, td.num { text-align:right; font-variant-numeric:tabular-nums; }
  tbody tr:hover { background:#FAF8F3; } tbody tr.pick { cursor:pointer; }
  td.wrapok { white-space:normal; min-width:200px; }
  .meter { display:inline-block; width:96px; height:7px; border-radius:4px; background:var(--track); vertical-align:middle; margin-right:8px; overflow:hidden; }
  .meter i { display:block; height:100%; border-radius:4px; }
  .pill { display:inline-block; padding:1px 8px; border-radius:999px; font-size:12px; border:1px solid var(--border); color:var(--soft); }
  .pill.good { border-color:var(--good); color:var(--good); } .pill.warn { border-color:var(--warn); color:var(--warn); } .pill.bad { border-color:var(--bad); color:var(--bad); }
  .muted { color:var(--muted); } .small { font-size:12.5px; }
  .detail { margin-top:14px; padding:14px 16px; }
  .ugrid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:8px 18px; margin-top:8px; }
  .urow { display:flex; align-items:center; gap:8px; font-size:13px; } .urow .t { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .missing { color:var(--soft); font-size:12.5px; margin:2px 0 6px 0; white-space:normal; }
  .note { background:var(--card); border:1px dashed var(--border); border-radius:10px; padding:12px 14px; color:var(--soft); margin-top:12px; font-size:13px; }
  .err { background:#FBEDEC; border:1px solid var(--bad); color:var(--bad); border-radius:10px; padding:12px 14px; margin:12px 0; }
  ul.plain { margin:6px 0 0; padding-left:18px; } ul.plain li { margin:2px 0; }
  .cols { display:grid; grid-template-columns:1fr 1fr; gap:14px; } .pad { padding:14px 16px; }
  @media (max-width:900px) { .tiles { grid-template-columns:repeat(2,1fr); } .cols { grid-template-columns:1fr; } }
</style></head>
<body><div class="wrap">
  <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap">
    <h1 id="title">Class dashboard</h1><span class="sub" id="stamp">Loading…</span>
  </div>
  <div id="problem"></div>
  <div id="app" style="display:none">
    <div class="tiles" id="tiles"></div>
    <div class="tabs">
      <button class="tab on" data-view="students">Students</button>
      <button class="tab" data-view="units">Units</button>
      <button class="tab" data-view="attention">Needs attention</button>
      <span class="spacer"></span>
      <select id="batch" class="act" title="Show one batch"></select>
      <input type="search" id="q" placeholder="Find a student…">
      <button class="act" id="export">Export table to a tab</button>
    </div>
    <div id="view"></div>
    <div class="note">
      <strong>Reading these numbers.</strong> "Programs" are the typed exercises a student got past the tests.
      A unit counts as <em>covered</em> at 80% of its programs. <em>Active time</em> counts only minutes when the student was
      typing, clicking or scrolling; it is recorded from the day this feature was switched on.
      Progress is checked in the student's browser, so treat it as evidence of practice. The Crucibles are the stronger evidence of skill.
    </div>
  </div>
</div>
<script>
var GOOD = 0.8, DAY = 86400000;
var S = { data:null, manifest:null, view:'students', sort:{ key:'pct', dir:-1 }, usort:{ key:'order', dir:1 }, q:'', batch:'', open:null };
function $(id) { return document.getElementById(id); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
function pctTxt(f) { return Math.round(f * 100) + '%'; }
function meter(f) { var c = f >= GOOD ? 'var(--good)' : f > 0 ? 'var(--warn)' : 'transparent'; return '<span class="meter"><i style="width:' + Math.round(f * 100) + '%;background:' + c + '"></i></span>'; }
function mins(sec) { if (!sec) return '<span class="muted">–</span>'; var m = Math.round(sec / 60); return m < 60 ? m + ' min' : Math.floor(m / 60) + ' h ' + (m % 60) + ' min'; }
function ago(iso, now) { if (!iso) return 'never'; var d = Math.floor((now - new Date(iso).getTime()) / DAY); return d <= 0 ? 'today' : d === 1 ? 'yesterday' : d + ' days ago'; }

function problem(html) { $('problem').innerHTML = html; }

function start(json) {
  S.data = JSON.parse(json);
  S.now = new Date(S.data.now).getTime();
  if (!S.data.siteUrl) return askSite('');
  loadManifest(S.data.siteUrl);
}
function askSite(why) {
  problem('<div class="err">' + (why ? esc(why) + '<br>' : '') + 'Paste the web address of your course site (for example https://yourname.github.io/python-course/):<br><br>'
    + '<input type="text" id="site" style="min-width:420px"> <button class="act" id="saveSite">Save</button></div>');
  $('saveSite').onclick = function () {
    google.script.run.withSuccessHandler(function (u) { problem(''); loadManifest(u); })
      .withFailureHandler(function (e) { askSite(e.message); }).saveSiteUrl($('site').value);
  };
}
function loadManifest(site) {
  fetch(site + 'course-manifest.json', { cache:'no-store' }).then(function (r) { if (!r.ok) throw new Error('not found'); return r.json(); })
    .then(function (m) { S.manifest = m; build(); })
    .catch(function () { askSite('Could not read the course list from ' + site + ' . Is the address right, and has the site been published since this feature was added?'); });
}

// ── turn raw rows into per-student and per-unit figures ──
function build() {
  var m = S.manifest, d = S.data;
  var units = []; m.modules.forEach(function (mod) { mod.units.forEach(function (u) { units.push({ id:u.unitId, title:u.title, module:mod.title, optional:u.optional, programs:u.programs, order:units.length, crucible:/_C$/.test(u.unitId) }); }); });
  var required = units.filter(function (u) { return !u.optional; });
  var crucibles = units.filter(function (u) { return u.crucible; });
  var done = {};   // student id -> { unitId or unit@ex:id : iso }
  d.progress.forEach(function (r) { (done[r[0]] = done[r[0]] || {})[r[1]] = r[2]; });

  function unitState(have, u) {
    var solved = u.programs.filter(function (p) { return have[u.id + '@ex:' + p.id]; });
    var finished = !!have[u.id] || (u.programs.length > 0 && solved.length === u.programs.length);
    var frac = finished ? 1 : u.programs.length ? solved.length / u.programs.length : 0;
    var missing = finished ? [] : u.programs.filter(function (p) { return !have[u.id + '@ex:' + p.id]; });
    var make = u.programs.filter(function (p) { return p.kind === 'make'; })[0];
    return { frac:frac, solved:solved.length, total:u.programs.length, finished:finished, missing:missing, makeDone: !make || finished || !!have[u.id + '@ex:' + make.id] };
  }

  // Students who have progress but are not in the Students tab still appear.
  var known = {}; d.students.forEach(function (s) { known[s.id] = 1; });
  var people = d.students.slice();
  Object.keys(done).forEach(function (id) { if (!known[id]) people.push({ id:id, login:id, name:'', batch:'' }); });

  S.students = people.map(function (s) {
    var have = done[s.id] || {}, states = {}, sum = 0, programs = 0, last = d.lastSeen[s.id] || '';
    units.forEach(function (u) { states[u.id] = unitState(have, u); });
    required.forEach(function (u) { sum += states[u.id].frac; });
    Object.keys(have).forEach(function (k) { if (k.indexOf('@ex:') !== -1) programs++; if (have[k] > last) last = have[k]; });
    var t = 0, tm = d.time[s.id] || {}; Object.keys(tm).forEach(function (k) { t += tm[k]; });
    var cr = crucibles.filter(function (u) { return states[u.id].finished; }).length;
    var pct = required.length ? sum / required.length : 0;
    var idle = last ? Math.floor((S.now - new Date(last).getTime()) / DAY) : null;
    var status = !last && !programs && !Object.keys(have).length ? 'Not started' : pct >= 0.995 ? 'Finished' : idle !== null && idle >= 7 ? 'Inactive' : 'Active';
    return { id:s.id, login:s.login, name:s.name || s.login, batch:s.batch, states:states, pct:pct, programs:programs, covered: required.filter(function (u) { return states[u.id].frac >= GOOD; }).length,
      crucibles:cr, feedback: !!have.UnitFB, time:t, last:last, idle:idle, status:status };
  });

  S.units = units.filter(function (u) { return u.programs.length || !u.optional; }).map(function (u) {
    var started = 0, covered = 0, sum = 0, att = 0, n = 0, errs = {}, tsum = 0, tn = 0;
    S.students.forEach(function (s) { var st = s.states[u.id]; if (st.frac > 0) started++; if (st.frac >= GOOD) covered++; sum += st.frac; var t = (d.time[s.id] || {})[u.id]; if (t) { tsum += t; tn++; } });
    var hard = null;
    u.programs.forEach(function (p) { var e = d.programs[u.id + '@ex:' + p.id]; if (!e) return; att += e.attempts; n += e.n; Object.keys(e.errors).forEach(function (k) { errs[k] = (errs[k] || 0) + e.errors[k]; });
      var avg = e.attempts / e.n; if (e.n >= 3 && (!hard || avg > hard.avg)) hard = { title:p.title, avg:avg, n:e.n }; });
    var top = Object.keys(errs).sort(function (a, b) { return errs[b] - errs[a]; })[0];
    return { id:u.id, title:u.title, module:u.module, order:u.order, optional:u.optional, total:u.programs.length, started:started, covered:covered,
      avg: S.students.length ? sum / S.students.length : 0, attempts: n ? att / n : 0, topErr: top || '', skips: d.skips[u.id] || 0, time: tn ? tsum / tn : 0, hard:hard };
  });
  S.required = required; S.crucibles = crucibles; S.unitList = units;

  var batches = {}; S.students.forEach(function (s) { if (s.batch) batches[s.batch] = 1; });
  $('batch').innerHTML = '<option value="">All batches</option>' + Object.keys(batches).sort().map(function (b) { return '<option>' + esc(b) + '</option>'; }).join('');
  $('batch').style.display = Object.keys(batches).length > 1 ? '' : 'none';
  $('title').textContent = (m.courseTitle || 'Course') + ' — class dashboard';
  $('stamp').textContent = 'Figures as of ' + new Date(S.data.now).toLocaleString();
  $('app').style.display = '';
  render();
}

function shown() {
  var q = S.q.toLowerCase();
  return S.students.filter(function (s) { return (!S.batch || s.batch === S.batch) && (!q || (s.name + ' ' + s.login).toLowerCase().indexOf(q) !== -1); });
}

function render() {
  var list = shown(), n = list.length || 1;
  var active = list.filter(function (s) { return s.idle !== null && s.idle < 7; }).length;
  var avg = list.reduce(function (a, s) { return a + s.pct; }, 0) / n;
  var ready = list.filter(function (s) { return s.crucibles === S.crucibles.length && s.feedback; }).length;
  $('tiles').innerHTML = [
    [list.length, 'students'], [active, 'active in the last 7 days'], [pctTxt(avg), 'average course progress'], [ready, 'have earned the certificate']
  ].map(function (t) { return '<div class="tile"><div class="n">' + t[0] + '</div><div class="l">' + t[1] + '</div></div>'; }).join('');
  if (S.view === 'students') renderStudents(list); else if (S.view === 'units') renderUnits(); else renderAttention(list);
}

function head(cols, sort) {
  return '<tr>' + cols.map(function (c) { return '<th class="' + (c[2] ? 'num' : '') + '" data-key="' + c[0] + '">' + c[1] + (sort.key === c[0] ? (sort.dir > 0 ? ' ▲' : ' ▼') : '') + '</th>'; }).join('') + '</tr>';
}
function sortBy(list, sort) {
  return list.slice().sort(function (a, b) { var x = a[sort.key], y = b[sort.key]; if (typeof x === 'string') return sort.dir * x.localeCompare(y); return sort.dir * ((x || 0) - (y || 0)); });
}
function statusPill(s) { var c = s.status === 'Finished' ? 'good' : s.status === 'Inactive' ? 'warn' : s.status === 'Not started' ? 'bad' : ''; return '<span class="pill ' + c + '">' + s.status + '</span>'; }

function renderStudents(list) {
  var cols = [['name','Student'],['pct','Course progress'],['covered','Units covered',1],['programs','Programs',1],['crucibles','Crucibles',1],['time','Active time',1],['last','Last active'],['status','Status']];
  var rows = sortBy(list, S.sort).map(function (s) {
    return '<tr class="pick" data-id="' + esc(s.id) + '"><td><strong>' + esc(s.name) + '</strong>' + (s.name !== s.login ? ' <span class="muted small">' + esc(s.login) + '</span>' : '') + '</td>'
      + '<td>' + meter(s.pct) + pctTxt(s.pct) + '</td><td class="num">' + s.covered + ' / ' + S.required.length + '</td><td class="num">' + s.programs + '</td>'
      + '<td class="num">' + s.crucibles + ' / ' + S.crucibles.length + '</td><td class="num">' + mins(s.time) + '</td><td>' + ago(s.last, S.now) + '</td><td>' + statusPill(s) + '</td></tr>';
  }).join('');
  $('view').innerHTML = '<div class="card" style="max-height:420px"><table><thead>' + head(cols, S.sort) + '</thead><tbody>' + (rows || '<tr><td colspan="8" class="muted">No students match.</td></tr>') + '</tbody></table></div>'
    + '<div id="detail"></div><div class="sub" style="margin-top:6px">Click a student to see every unit and the programs still to write. Click a column heading to sort.</div>';
  bindSort(S.sort);
  Array.prototype.forEach.call(document.querySelectorAll('tr.pick'), function (tr) { tr.onclick = function () { S.open = tr.getAttribute('data-id'); renderDetail(); }; });
  renderDetail();
}

function renderDetail() {
  var s = S.students.filter(function (x) { return x.id === S.open; })[0];
  if (!s || !$('detail')) return;
  var html = '<div class="card detail"><h2>' + esc(s.name) + ' <span class="muted small">' + pctTxt(s.pct) + ' of the course · ' + s.programs + ' programs · last active ' + ago(s.last, S.now) + '</span></h2>';
  var mod = '';
  S.unitList.forEach(function (u) {
    var st = s.states[u.id]; if (!u.programs.length && u.optional) return;
    if (u.module !== mod) { if (mod) html += '</div>'; mod = u.module; html += '<div class="small" style="margin-top:10px;font-weight:700">' + esc(mod) + '</div><div class="ugrid">'; }
    var label = st.total ? (st.finished && st.solved < st.total ? 'finished' : st.solved + ' / ' + st.total) : (st.finished ? 'finished' : 'not opened');
    html += '<div><div class="urow"><span class="t">' + esc(u.title) + '</span>' + meter(st.frac) + '<span class="muted" style="min-width:64px;text-align:right">' + label + '</span></div>'
      + (st.frac > 0 && st.missing.length ? '<div class="missing">Still to write: ' + st.missing.map(function (p) { return esc(p.title) + (p.kind === 'make' ? ' <strong>(the Make It task)</strong>' : ''); }).join(' · ') + '</div>' : '') + '</div>';
  });
  html += (mod ? '</div>' : '') + '</div>';
  $('detail').innerHTML = html;
}

function renderUnits() {
  var n = S.students.length || 1;
  var cols = [['order','Unit'],['started','Started',1],['coveredPct','Class at 80%+'],['avg','Average progress'],['attempts','Tries per program',1],['topErr','Most common error'],['skips','Sections skipped',1],['time','Avg active time',1]];
  var list = S.units.map(function (u) { u.coveredPct = u.covered / n; return u; });
  var rows = sortBy(list, S.usort).map(function (u) {
    return '<tr><td><strong>' + esc(u.title) + '</strong> <span class="muted small">' + esc(u.module) + (u.optional ? ' · optional' : '') + '</span></td><td class="num">' + u.started + '</td>'
      + '<td>' + meter(u.coveredPct) + u.covered + ' of ' + S.students.length + '</td><td>' + meter(u.avg) + pctTxt(u.avg) + '</td>'
      + '<td class="num">' + (u.attempts ? u.attempts.toFixed(1) : '<span class="muted">–</span>') + '</td><td>' + (u.topErr ? esc(u.topErr) : '<span class="muted">–</span>') + '</td>'
      + '<td class="num">' + (u.skips || '<span class="muted">–</span>') + '</td><td class="num">' + mins(u.time) + '</td></tr>';
  }).join('');
  $('view').innerHTML = '<div class="card" style="max-height:520px"><table><thead>' + head(cols, S.usort) + '</thead><tbody>' + rows + '</tbody></table></div>'
    + '<div class="sub" style="margin-top:6px">"Tries per program" is the average number of checks a student needed before the tests passed. Above 3 means the class found it hard.</div>';
  bindSort(S.usort);
}

function renderAttention(list) {
  var never = list.filter(function (s) { return s.status === 'Not started'; });
  var quiet = list.filter(function (s) { return s.status === 'Inactive'; }).sort(function (a, b) { return b.idle - a.idle; });
  var noMake = list.map(function (s) { var c = S.unitList.filter(function (u) { var st = s.states[u.id]; return st.frac >= GOOD && !st.makeDone; }).length; return { s:s, c:c }; }).filter(function (x) { return x.c >= 2; }).sort(function (a, b) { return b.c - a.c; });
  var hard = S.units.filter(function (u) { return u.hard && u.hard.avg >= 3; }).sort(function (a, b) { return b.hard.avg - a.hard.avg; }).slice(0, 12);
  function block(title, items, empty) { return '<div class="card pad"><h2>' + title + ' <span class="muted small">' + items.length + '</span></h2>' + (items.length ? '<ul class="plain">' + items.join('') + '</ul>' : '<div class="muted">' + empty + '</div>') + '</div>'; }
  $('view').innerHTML = '<div class="cols">'
    + block('Gone quiet (7 days or more)', quiet.map(function (s) { return '<li><strong>' + esc(s.name) + '</strong> — ' + pctTxt(s.pct) + ' done, last active ' + ago(s.last, S.now) + '</li>'; }), 'Nobody. Everyone who started has been active this week.')
    + block('Have not started', never.map(function (s) { return '<li><strong>' + esc(s.name) + '</strong>' + (s.name !== s.login ? ' <span class="muted small">' + esc(s.login) + '</span>' : '') + '</li>'; }), 'Everyone has started.')
    + block('Skipping the Make It tasks', noMake.map(function (x) { return '<li><strong>' + esc(x.s.name) + '</strong> — covered ' + x.c + ' units without writing the final program</li>'; }), 'Nobody is leaving out the final programs.')
    + block('Programs the class finds hard', hard.map(function (u) { return '<li><strong>' + esc(u.hard.title) + '</strong> <span class="muted small">' + esc(u.title) + ' · ' + esc(u.module) + '</span> — ' + u.hard.avg.toFixed(1) + ' tries on average (' + u.hard.n + ' students)</li>'; }), 'No program has needed 3 or more tries on average yet.')
    + '</div>';
}

function bindSort(sort) {
  Array.prototype.forEach.call(document.querySelectorAll('th[data-key]'), function (th) {
    th.onclick = function () { var k = th.getAttribute('data-key'); if (sort.key === k) sort.dir = -sort.dir; else { sort.key = k; sort.dir = (k === 'name' || k === 'order' || k === 'topErr' || k === 'status') ? 1 : -1; } render(); };
  });
}

Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (b) {
  b.onclick = function () { S.view = b.getAttribute('data-view'); Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (x) { x.className = 'tab' + (x === b ? ' on' : ''); }); render(); };
});
$('q').oninput = function () { S.q = this.value; render(); };
$('batch').onchange = function () { S.batch = this.value; render(); };
$('export').onclick = function () {
  var rows = [['Login','Name','Batch','Course progress %','Units covered (80%+)','Programs written','Crucibles','Feedback','Active minutes','Last active','Status']];
  sortBy(shown(), { key:'name', dir:1 }).forEach(function (s) { rows.push([s.login, s.name, s.batch, Math.round(s.pct * 100), s.covered, s.programs, s.crucibles, s.feedback ? 'yes' : 'no', Math.round(s.time / 60), s.last ? s.last.slice(0, 10) : '', s.status]); });
  var btn = this; btn.disabled = true; btn.textContent = 'Saving…';
  google.script.run.withSuccessHandler(function (msg) { btn.disabled = false; btn.textContent = 'Export table to a tab'; $('stamp').textContent = msg; })
    .withFailureHandler(function (e) { btn.disabled = false; btn.textContent = 'Export table to a tab'; problem('<div class="err">' + esc(e.message) + '</div>'); }).exportClassTable(rows);
};

google.script.run.withSuccessHandler(start).withFailureHandler(function (e) { problem('<div class="err">Could not read the Sheet: ' + esc(e.message) + '</div>'); }).classDashboardData();
</script></body></html>`;
