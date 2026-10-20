// ============================================================
//  PDF — builds the mini-project report as a real PDF download,
//  on the student's own device, with pdfmake. pdfmake and the
//  fonts (DejaVu Serif Condensed for text, DejaVu Sans Mono for
//  code; public/fonts/report/) load only when a report is
//  downloaded, so the rest of Foothold stays light.
// ============================================================

import COURSE_CONFIG from '../../../config/course.config.js';
import { CONCEPTS, CONCEPT, SCREENS, colorOf, conceptState, taggedLines, toRanges, rangeText, whereText, questionFor, usedCount } from './concepts.js';
import { checkConcept } from './analyzer.js';
import { filled, testDone } from './reportModel.js';
import { imageData } from './images.js';
import { fmtDate } from './MoreSteps.jsx';

const BASE = import.meta.env.BASE_URL;
const FONT_FILES = {
  'serif.ttf': 'DejaVuSerifCondensed.ttf', 'serif-b.ttf': 'DejaVuSerifCondensed-Bold.ttf',
  'serif-i.ttf': 'DejaVuSerifCondensed-Italic.ttf', 'serif-bi.ttf': 'DejaVuSerifCondensed-BoldItalic.ttf',
  'mono.ttf': 'DejaVuSansMono.ttf', 'mono-b.ttf': 'DejaVuSansMono-Bold.ttf',
};
const NAVY = '#1F3864', GREY = '#666666', LIGHT = '#D9E2F3', RULE = '#8EAADB';
const EXCERPT_MAX = 30;      // lines shown per excerpt in section 3 (the full code is in Appendix A)

function toBase64(buf) {
  const bytes = new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
// Only real images: a missing file may come back as an HTML page with status 200.
async function fetchImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('missing ' + url);
  const blob = await res.blob();
  if (!/^image\/(png|jpe?g)$/.test(blob.type)) throw new Error('not an image: ' + url);
  return new Promise((resolve) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(blob); });
}

let pdfMakePromise = null;
async function getPdfMake() {
  if (!pdfMakePromise) {
    pdfMakePromise = (async () => {
      const mod = await import('pdfmake/build/pdfmake');
      const pdfMake = mod.default || mod;
      const vfs = {};
      await Promise.all(Object.entries(FONT_FILES).map(async ([key, file]) => {
        const res = await fetch(`${BASE}fonts/report/${file}`);
        if (!res.ok) throw new Error('Could not load the report fonts.');
        vfs[key] = toBase64(await res.arrayBuffer());
      }));
      pdfMake.vfs = vfs;
      pdfMake.fonts = {
        Serif: { normal: 'serif.ttf', bold: 'serif-b.ttf', italics: 'serif-i.ttf', bolditalics: 'serif-bi.ttf' },
        Mono: { normal: 'mono.ttf', bold: 'mono-b.ttf', italics: 'mono.ttf', bolditalics: 'mono-b.ttf' },
      };
      return pdfMake;
    })().catch((e) => { pdfMakePromise = null; throw e; });
  }
  return pdfMakePromise;
}

// ── small builders ──
const H1 = (text) => ({ text, style: 'h1', tocItem: true, tocStyle: 'tocH1' });
const H2 = (text) => ({ text, style: 'h2', tocItem: true, tocStyle: 'tocH2', tocMargin: [14, 0, 0, 0] });
const P = (text, extra = {}) => ({ text: text || '', style: 'body', ...extra });
const clean = (s) => String(s || '').replace(/\t/g, '    ').replace(/\r/g, '');
const tableLayout = {
  hLineWidth: () => 0.5, vLineWidth: () => 0.5, hLineColor: () => RULE, vLineColor: () => RULE,
  paddingLeft: () => 5, paddingRight: () => 5, paddingTop: () => 3, paddingBottom: () => 3,
};
function table(headers, rows, widths) {
  return {
    table: { headerRows: 1, widths, body: [headers.map(h => ({ text: h, bold: true, fillColor: LIGHT, fontSize: 9.5 })), ...rows.map(r => r.map(c => (typeof c === 'object' ? c : { text: String(c ?? ''), fontSize: 9.5 })))] },
    layout: tableLayout, margin: [0, 4, 0, 10],
  };
}

function kvTable(rows) {
  return {
    table: { widths: [130, '*'], body: rows.map(([k, v]) => [{ text: k, bold: true, fontSize: 9.5, fillColor: LIGHT }, { text: v || '—', fontSize: 9.5 }]) },
    layout: tableLayout, margin: [0, 4, 0, 10],
  };
}

// Code lines with line numbers, a colour bar and letter codes for tagged concepts.
function codeRows(code, fileId, d, from = 1, to = Infinity, only = null) {
  const lines = clean(code).replace(/\n+$/, '').split('\n');
  const tagMap = {};
  for (const c of CONCEPTS) {
    if (only && !only.includes(c.id)) continue;
    for (const n of taggedLines(d, c.id)[fileId] || []) (tagMap[n] = tagMap[n] || []).push(c);
  }
  const rows = [];
  for (let n = Math.max(1, from); n <= Math.min(lines.length, to); n++) {
    const tags = tagMap[n] || [];
    rows.push([
      { text: String(n), color: GREY, alignment: 'right', fontSize: 7.5, font: 'Mono' },
      { text: '', fillColor: tags.length ? colorOf(tags[0].id) : null },
      { text: tags.map(t => t.code).join(' '), fontSize: 6.5, font: 'Mono', color: tags.length ? colorOf(tags[0].id) : GREY, bold: true },
      { text: lines[n - 1] || ' ', font: 'Mono', fontSize: 7.5, preserveLeadingSpaces: true },
    ]);
  }
  return rows;
}
function codeTable(rows) {
  return {
    table: { widths: [20, 2.5, 26, '*'], body: rows, dontBreakRows: true },
    layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 2, paddingRight: () => 2, paddingTop: () => 0.6, paddingBottom: () => 0.6, fillColor: (i) => (i % 2 ? '#FAFAFA' : null) },
    margin: [0, 2, 0, 6],
  };
}

// ── the report ──
export async function buildReportPdf({ draft: d, student, analysis, lab, token, onProgress = () => {} }) {
  onProgress('Preparing the PDF…');
  const pdfMake = await getPdfMake();
  const cfg = COURSE_CONFIG.miniProjectReport || {};
  const logo = await fetchImage(`${BASE}brand/sriher-logo.png`).catch(() => null);
  const signature = await fetchImage(`${BASE}brand/signature.png`).catch(() => null);

  onProgress('Adding your screenshots…');
  const shotImages = {};
  for (const s of d.shots) {
    try {
      const url = await imageData(token, s.fileId);
      shotImages[s.fileId] = /^data:image\/(png|jpe?g);base64,/.test(url) ? url : null;
    } catch { shotImages[s.fileId] = null; }
  }

  const title = filled(d.title) ? d.title.trim() : 'Untitled project';
  const regNo = student.rollNo;
  const today = new Date();
  const monthYear = today.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  let figNo = 0;
  const figure = (shot) => {
    const img = shotImages[shot.fileId];
    figNo += 1;
    return {
      stack: [
        img ? { image: img, fit: [440, 300], alignment: 'center' } : { text: '[screenshot could not be loaded]', italics: true, color: GREY, alignment: 'center' },
        { text: `Figure ${figNo}: ${clean(shot.caption) || 'Screenshot'}`, italics: true, fontSize: 9.5, alignment: 'center', margin: [0, 4, 0, 0] },
      ],
      margin: [0, 6, 0, 12], unbreakable: true,
    };
  };

  const content = [];

  // Cover
  content.push(
    logo ? { image: logo, width: 380, alignment: 'center', margin: [0, 10, 0, 34] } : { text: 'SRI RAMACHANDRA INSTITUTE OF HIGHER EDUCATION AND RESEARCH', alignment: 'center', bold: true, margin: [0, 10, 0, 34] },
    { text: 'MED23CL202 · PYTHON PROGRAMMING LABORATORY', alignment: 'center', bold: true, fontSize: 13 },
    { text: cfg.programme || 'B.Tech Computer Science and Medical Engineering (Artificial Intelligence and Data Analytics) · Semester III', alignment: 'center', fontSize: 10.5, margin: [30, 4, 30, 40], color: '#333333' },
    { text: 'MINI-PROJECT REPORT', alignment: 'center', bold: true, fontSize: 20, color: NAVY },
    { text: title, alignment: 'center', bold: true, fontSize: 16, margin: [20, 16, 20, 50] },
    { text: 'Submitted by', alignment: 'center', italics: true, margin: [0, 0, 0, 10] },
    {
      table: { widths: [150, '*'], body: [
        ['Name', student.name || ''], ['Register number', regNo], ['Batch', student.batch || ''],
        ['Academic year', cfg.academicYear || ''], ['Faculty in-charge', cfg.faculty || ''],
      ].map(([k, v]) => [{ text: k, bold: true }, { text: String(v) }]) },
      layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingTop: () => 5, paddingBottom: () => 5 }, margin: [60, 0, 40, 0],
    },
    { text: '', pageBreak: 'after' },
  );

  // Bonafide certificate
  const line = '______________________';
  content.push(
    logo ? { image: logo, width: 320, alignment: 'center', margin: [0, 0, 0, 26] } : { text: ' ' },
    { text: 'BONAFIDE CERTIFICATE', alignment: 'center', bold: true, fontSize: 16, color: NAVY, margin: [0, 0, 0, 24] },
    {
      table: { widths: [130, '*'], body: [['Name', student.name || ''], ['Register number', regNo], ['Batch', student.batch || ''], ['Academic year', cfg.academicYear || '']].map(([k, v]) => [{ text: k, bold: true }, { text: ': ' + v }]) },
      layout: 'noBorders', margin: [0, 0, 0, 18],
    },
    P(['Certified that this is the bonafide record of the mini-project titled “', { text: title, bold: true }, '” carried out by the above student in the course ', { text: 'MED23CL202 – Python Programming Laboratory', bold: true }, ` during the academic year ${cfg.academicYear || '________'}.`], { alignment: 'justify', lineHeight: 1.5 }),
    { columns: [
      { stack: [line, { text: 'Faculty in-charge', bold: true }, { text: cfg.faculty || 'Name & designation', fontSize: 9.5 }] },
      { stack: [line, { text: 'Head of the Department', bold: true }, { text: 'Name & seal', fontSize: 9.5 }], alignment: 'right' },
    ], margin: [0, 70, 0, 0] },
    { text: 'Submitted for the Practical Examination held on ______________________', margin: [0, 40, 0, 0] },
    { columns: [
      { stack: [line, { text: 'Internal Examiner', bold: true }] },
      { stack: [line, { text: 'External Examiner', bold: true }], alignment: 'right' },
    ], margin: [0, 70, 0, 0] },
    { text: '', pageBreak: 'after' },
  );

  // Declaration + acknowledgement
  const aiLine = d.reflect.aiUsed === 'yes'
    ? ` I used an AI tool as described in Section 7.5, and I understand and can explain all the code in this report.`
    : d.reflect.aiUsed === 'no' ? ' I did not use any AI tool to write this project.' : '';
  content.push(
    { text: 'DECLARATION', alignment: 'center', bold: true, fontSize: 15, color: NAVY, margin: [0, 0, 0, 16] },
    P(`I, ${student.name || '________'} (Reg. No. ${regNo}), declare that this mini-project report titled “${title}” is my own work, done as part of MED23CL202 – Python Programming Laboratory under the guidance of ${cfg.faculty || 'my faculty in-charge'}. The program code and results in this report were written, run and tested by me. Any code, data or idea taken from another source is credited in the References.${aiLine}`, { alignment: 'justify', lineHeight: 1.5 }),
    { columns: [{ text: 'Place: Chennai\nDate: ______________' }, { text: '\n______________________\nSignature of the student', alignment: 'right' }], margin: [0, 30, 0, 0] },
  );
  if (filled(d.ack)) {
    content.push(
      { text: 'ACKNOWLEDGEMENT', alignment: 'center', bold: true, fontSize: 15, color: NAVY, margin: [0, 50, 0, 16] },
      P(clean(d.ack), { alignment: 'justify', lineHeight: 1.4 }),
    );
  }
  content.push({ text: '', pageBreak: 'after' });

  // e-Lab certificate (completion, or progress with the real count)
  content.push(certificatePage(lab, student, logo, signature, monthYear, cfg), { text: '', pageBreak: 'after' });

  // Contents
  content.push({ toc: { title: { text: 'CONTENTS', style: 'h1', alignment: 'center' } } }, { text: '', pageBreak: 'after' });

  // 1. Introduction
  content.push(
    H1('1. INTRODUCTION'),
    H2('1.1 Who uses it, and where'),
    P([{ text: 'Users: ', bold: true }, clean(d.problem.users) || '—', '      ', { text: 'Place: ', bold: true }, clean(d.problem.place) || '—']),
    H2('1.2 What my program does'),
    P(clean(d.problem.summary)),
    H2('1.3 The problem'),
    table(['Problem today', 'How my program helps'], d.problem.items.filter(it => filled(it.problem) || filled(it.fix)).map(it => [clean(it.problem), clean(it.fix)]), ['*', '*']),
  );

  // 2. Objectives
  content.push(H1('2. OBJECTIVES'), { ol: d.objectives.filter(filled).map(o => ({ text: clean(o), style: 'body' })), margin: [10, 0, 0, 8] });

  // 3. Concepts
  onProgress('Writing the concepts section…');
  const checks = Object.fromEntries(CONCEPTS.map(c => [c.id, checkConcept(d, c.id, analysis)]));
  content.push(
    H1('3. PYTHON CONCEPTS IN MY PROGRAM'),
    P(`My program uses ${usedCount(d)} of the ${CONCEPTS.length} course concepts. Each one is shown below with its lines from my code. Lines marked “Checked by Foothold” were confirmed by Python’s own parser when this report was made; the full code, with every tagged line marked, is in Appendix A.`),
    table(['Exp', 'Code', 'Concept', 'Where in my code', 'Used'], CONCEPTS.map(c => {
      const used = conceptState(d, c.id) === 'used';
      return [
        SCREENS.find(s => s.id === c.screen).exp.replace('Experiments ', '').replace('Experiment ', '').replace(' and ', '–'),
        { text: c.code, color: colorOf(c.id), bold: true, font: 'Mono', fontSize: 8.5 },
        c.label,
        { text: used ? whereText(d, c.id) : '—', fontSize: 8.5 },
        { text: used ? (checks[c.id].state === 'ok' ? 'Yes' : 'Yes (not confirmed)') : 'Not used', color: used ? '#1F6B3A' : GREY },
      ];
    }), [24, 26, 120, '*', 58]),
  );
  let sub = 0;
  for (const s of SCREENS) {
    const usedHere = s.concepts.filter(id => conceptState(d, id) === 'used');
    if (!usedHere.length) continue;
    sub += 1;
    content.push(H2(`3.${sub} ${s.exp}: ${s.title}`));
    for (const id of usedHere) {
      const c = CONCEPT[id];
      const ck = checks[id];
      content.push({ text: [{ text: c.code + '  ', color: colorOf(id), font: 'Mono', bold: true, fontSize: 9 }, { text: c.label, bold: true }], margin: [0, 6, 0, 2] });
      const tl = taggedLines(d, id);
      for (const f of d.files) {
        for (const [a, b] of toRanges(tl[f.id])) {
          const end = Math.min(b, a + EXCERPT_MAX - 1);
          content.push({ text: `${f.name}, line${a === b ? '' : 's'} ${rangeText([a, b])}${end < b ? ` (first ${EXCERPT_MAX} lines shown)` : ''}`, fontSize: 8.5, italics: true, color: GREY, margin: [0, 2, 0, 0] });
          content.push(codeTable(codeRows(f.code, f.id, d, a, end, [id])));
        }
      }
      content.push(ck.state === 'ok'
        ? { text: ck.message, fontSize: 9, color: '#1F6B3A', margin: [0, 0, 0, 4] }
        : { text: `Not confirmed by Foothold: Python’s check could not find ${c.label.toLowerCase()} in these lines.${d.concepts[id]?.keep ? ' The student kept the tag.' : ''}`, fontSize: 9, italics: true, color: GREY, margin: [0, 0, 0, 4] });
      for (const shot of d.shots.filter(sh => sh.concepts.includes(id))) content.push(figure(shot));
    }
    const ans = d.answers[s.id] || {};
    const q = [];
    if (s.id === 'e56' && ans.place) q.push({ text: [{ text: 'My program saves its file in: ', bold: true }, ans.place], style: 'body' });
    if (filled(ans.text)) q.push({ text: [{ text: questionFor(s.id, d) + ' ', italics: true }, clean(ans.text)], style: 'body' });
    if (q.length) content.push({ stack: q, margin: [8, 4, 0, 8] });
    for (const id of s.concepts.filter(x => conceptState(d, x) === 'notused' && filled(d.concepts[x]?.note))) {
      content.push(P([{ text: `${CONCEPT[id].label} (not used): `, bold: true }, clean(d.concepts[id].note)]));
    }
  }
  const notUsed = CONCEPTS.filter(c => conceptState(d, c.id) !== 'used');
  if (notUsed.length) {
    content.push(H2(`3.${sub + 1} Concepts not used in this project`), table(['Concept', 'Where it could have fitted'], notUsed.map(c => [c.label, clean(d.concepts[c.id]?.note) || '—']), [170, '*']));
  }

  // 4. Program running
  content.push(H1('4. PROGRAM RUNNING'));
  const loose = d.shots.filter(s => !s.concepts.length);
  if (!d.shots.length) content.push(P('No screenshots were added.', { italics: true, color: GREY }));
  else if (!loose.length) content.push(P('All screenshots appear in Section 3, beside the concepts they show.'));
  else loose.forEach(s => content.push(figure(s)));

  // 5. Testing
  const tests = d.tests.filter(t => filled(t.input) || filled(t.expected) || filled(t.actual));
  content.push(H1('5. TESTING'), tests.length
    ? table(['No.', 'Type', 'Input / action', 'Expected', 'What happened', 'Result'], tests.map((t, i) => [String(i + 1), t.kind || '', clean(t.input), clean(t.expected), clean(t.actual), { text: t.result || '', bold: true, color: t.result === 'Fail' ? '#A32D2D' : '#1F6B3A' }]), [20, 62, '*', '*', '*', 36])
    : P('No tests were recorded.', { italics: true, color: GREY }));
  if (tests.length) content.push(P(`${tests.filter(testDone).length} tests recorded; ${tests.filter(t => t.result === 'Pass').length} passed, ${tests.filter(t => t.result === 'Fail').length} failed.`, { fontSize: 9.5, color: GREY }));

  // 6. How it grew
  content.push(H1('6. HOW THE PROJECT GREW'), table(['Exp', 'Completed in Foothold', 'What I added to my project'],
    Array.from({ length: 10 }, (_, i) => [String(i + 1), lab?.expDates?.[i + 1] ? fmtDate(lab.expDates[i + 1]) : '—', clean(d.grew[i + 1]) || '—']), [26, 90, '*']));

  // 7. Reflection
  const r = d.reflect;
  content.push(
    H1('7. REFLECTION'),
    H2('7.1 The hardest bug'),
    kvTable([['What went wrong', clean(r.saw)], ['How I found the cause', clean(r.found)], ['How I fixed it', clean(r.fixed)]]),
    H2('7.2 Limitations and safety'),
    P(clean(r.limits)),
    P('This program is a student learning project. It is not a medical device and must not be used to make decisions about real patients.', { italics: true }),
    H2('7.3 Conclusion'),
    P(clean(r.conclusion)),
    H2('7.4 Future scope'),
    r.future.some(filled) ? { ul: r.future.filter(filled).map(x => ({ text: clean(x), style: 'body' })), margin: [10, 0, 0, 8] } : P('—'),
    H2('7.5 Use of AI tools'),
    P(r.aiUsed === 'yes' ? clean(r.aiWhat) : r.aiUsed === 'no' ? 'I did not use any AI tool.' : '—'),
  );

  // 8. References
  content.push(H1('8. REFERENCES'), ...d.refs.filter(filled).map((x, i) => ({ text: `[${i + 1}]  ${clean(x)}`, style: 'body', margin: [0, 0, 0, 4] })));

  // Appendix A
  onProgress('Adding your code…');
  content.push(
    { ...H1('APPENDIX A: FULL PROGRAM CODE'), pageBreak: 'before' },
    P('Every line I tagged is marked with a coloured bar and the concept’s letter code:', { fontSize: 9.5 }),
    { text: CONCEPTS.filter(c => conceptState(d, c.id) === 'used').map(c => [{ text: c.code, color: colorOf(c.id), bold: true, font: 'Mono' }, ` ${c.label}    `]).flat(), fontSize: 8, margin: [0, 0, 0, 10], lineHeight: 1.4 },
  );
  for (const f of d.files.filter(x => filled(x.code))) {
    content.push({ text: f.name || 'file', bold: true, font: 'Mono', fontSize: 10, margin: [0, 8, 0, 2] }, codeTable(codeRows(f.code, f.id, d)));
  }

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [64, 56, 52, 60],
    info: { title: `${title} – Mini-Project Report`, author: `${student.name || ''} (${regNo})`, subject: 'MED23CL202 Python Programming Laboratory' },
    defaultStyle: { font: 'Serif', fontSize: 11, lineHeight: 1.25 },
    styles: {
      h1: { fontSize: 14, bold: true, color: NAVY, margin: [0, 16, 0, 8] },
      h2: { fontSize: 11.5, bold: true, color: NAVY, margin: [0, 10, 0, 4] },
      body: { fontSize: 11, margin: [0, 0, 0, 6], lineHeight: 1.3 },
      tocH1: { fontSize: 11, bold: true },
      tocH2: { fontSize: 10 },
    },
    background: (page, size) => (page <= 2 ? {
      canvas: [
        { type: 'rect', x: 24, y: 24, w: size.width - 48, h: size.height - 48, lineWidth: 1.6, lineColor: NAVY },
        { type: 'rect', x: 29, y: 29, w: size.width - 58, h: size.height - 58, lineWidth: 0.6, lineColor: NAVY },
      ],
    } : null),
    footer: (page, count) => (page <= 2 ? null : {
      columns: [
        { text: `MED23CL202 Mini-Project Report · ${regNo}`, fontSize: 8, color: GREY },
        { text: `Page ${page} of ${count}`, alignment: 'right', fontSize: 8, color: GREY },
      ],
      margin: [64, 22, 52, 0],
    }),
    content,
  };

  onProgress('Creating the file…');
  const filename = `${regNo}_MiniProject_Report.pdf`.replace(/[^A-Za-z0-9@._-]/g, '_');
  const blob = await new Promise((resolve, reject) => {
    // pdfmake reports some errors outside this call; a time limit turns a silent hang into a message.
    const timer = setTimeout(() => reject(new Error('the PDF took too long to make')), 120000);
    try {
      pdfMake.createPdf(docDefinition).getBlob((b) => { clearTimeout(timer); resolve(b); });
    } catch (e) {
      clearTimeout(timer);
      reject(e);
    }
  });
  return { blob, filename, figures: figNo };
}

function certificatePage(lab, student, logo, signature, monthYear, cfg) {
  const s = lab?.status;
  const blue = '#1B5E93';
  if (!s) {
    return { text: 'Your e-Lab certificate could not be loaded when this report was made. Download the report again when you are online.', italics: true, color: GREY };
  }
  const pct = Math.round((s.itemsDone / s.itemsTotal) * 100);
  const body = s.eligible
    ? ['has successfully completed all ', { text: 'ten experiments', bold: true }, ' and the ', { text: 'mini-project checkpoints', bold: true }, ' of the e-Lab Record, as per the requirements of the ', { text: 'Python Programming Laboratory (MED23CL202)', bold: true }, '.']
    : ['has completed ', { text: `${s.experimentsDone} of the ten experiments`, bold: true }, ' and ', { text: `${s.cruciblesDone} of the five mini-project checkpoints`, bold: true }, ` of the e-Lab Record (${s.itemsDone} of ${s.itemsTotal} activities, ${pct}%), as part of the `, { text: 'Python Programming Laboratory (MED23CL202)', bold: true }, '.', s.feedbackDone ? '' : ' The course feedback is still pending.'];
  return {
    table: {
      widths: ['*'],
      body: [[{
        stack: [
          logo ? { image: logo, width: 300, alignment: 'center', margin: [0, 10, 0, 26] } : { text: ' ' },
          { text: 'PYTHON PROGRAMMING LABORATORY', alignment: 'center', bold: true, fontSize: 16 },
          { text: 'MED23CL202 · Semester III', alignment: 'center', color: GREY, margin: [0, 4, 0, 22] },
          { text: s.eligible ? 'CERTIFICATE OF COMPLETION' : 'CERTIFICATE OF PROGRESS', alignment: 'center', bold: true, fontSize: 15 },
          { text: 'e-Lab Record (Foothold)', alignment: 'center', italics: true, color: GREY, margin: [0, 2, 0, 22] },
          { text: 'This is to certify that', alignment: 'center', italics: true, color: GREY },
          { text: student.name || '', alignment: 'center', bold: true, fontSize: 18, margin: [0, 6, 0, 4] },
          { text: `Register number: ${student.rollNo}`, alignment: 'center' },
          { text: body, alignment: 'center', lineHeight: 1.45, margin: [24, 16, 24, 14] },
          { text: `ACADEMIC YEAR ${cfg.academicYear || ''}`, alignment: 'center', bold: true, margin: [0, 6, 0, 0] },
          { columns: [
            { text: [`Date: `, { text: monthYear, bold: true }], margin: [0, 40, 0, 0] },
            { stack: [
              signature ? { image: signature, fit: [150, 44], alignment: 'center' } : { text: ' ', margin: [0, 30, 0, 0] },
              { text: cfg.faculty || '', bold: true, alignment: 'center' },
              { text: 'Faculty in-charge', alignment: 'center', color: GREY, fontSize: 9.5 },
            ], width: 180 },
          ], margin: [10, 20, 10, 6] },
          { text: 'Issued from the student’s saved progress in Foothold when this report was downloaded.', alignment: 'center', fontSize: 7.5, color: GREY, margin: [0, 18, 0, 0] },
        ],
        margin: [14, 14, 14, 14],
      }]],
    },
    layout: { hLineWidth: () => 2, vLineWidth: () => 2, hLineColor: () => blue, vLineColor: () => blue },
  };
}

// The teacher's viva-sheet row (Code.gs reportSubmit).
export function vivaSummary(d, student, analysis, lab) {
  const checks = Object.fromEntries(CONCEPTS.map(c => [c.id, checkConcept(d, c.id, analysis)]));
  const used = CONCEPTS.filter(c => conceptState(d, c.id) === 'used');
  const typed = Object.values(d.meta.typed || {}).reduce((a, b) => a + b, 0);
  const pasted = Object.values(d.meta.pasted || {}).reduce((a, b) => a + b, 0);
  const s = lab?.status;
  return {
    name: student.name, title: d.title,
    conceptsUsed: used.length, conceptsTotal: CONCEPTS.length,
    notUsed: CONCEPTS.filter(c => conceptState(d, c.id) !== 'used').map(c => c.code).join(' '),
    notConfirmed: used.filter(c => checks[c.id].state !== 'ok').map(c => `${c.code} (${whereText(d, c.id)})`).join('; '),
    keyLines: used.map(c => `${c.code}: ${whereText(d, c.id)}`).join('\n'),
    hardestBug: [d.reflect.saw, d.reflect.fixed].filter(filled).join(' → '),
    tests: `${d.tests.filter(testDone).length} recorded, ${d.tests.filter(t => t.result === 'Pass').length} pass, ${d.tests.filter(t => t.result === 'Fail').length} fail`,
    certificate: s ? `${s.eligible ? 'completion' : 'progress'} ${s.itemsDone}/${s.itemsTotal}${s.feedbackDone ? '' : ' (feedback pending)'}` : 'not loaded',
    minutesPerStep: Object.entries(d.meta.seconds || {}).map(([k, v]) => `${k} ${Math.round(v / 60)}`).join(', '),
    pastedShare: typed + pasted ? `${Math.round((pasted / (typed + pasted)) * 100)}% of ${typed + pasted} characters pasted` : '',
  };
}

