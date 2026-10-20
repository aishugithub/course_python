// ============================================================
//  ANALYZER — runs analyzer.py (Python's own parser) on the
//  student's code in the browser with Pyodide, and checks the
//  lines they tagged against what it found. Shares the Pyodide
//  instance the Crucible lessons already load
//  (window.__crucible_pyodide), so it is downloaded once.
//
//  Checks only ever warn: a student can keep a tag that isn't
//  confirmed, and the report then says "not confirmed by Foothold".
// ============================================================

import ANALYZER_PY from './analyzer.py?raw';
import { CONCEPT, taggedLines, toRanges, rangeText } from './concepts.js';

const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';

async function getPyodide() {
  if (window.__crucible_pyodide) return window.__crucible_pyodide;
  if (!window.loadPyodide) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = PYODIDE_URL + 'pyodide.js';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  const py = await window.loadPyodide({ indexURL: PYODIDE_URL });
  window.__crucible_pyodide = py;
  return py;
}

// files: [{ id, name, code }] -> { found, errors, classes, customExceptions }
export async function analyseCode(files) {
  const py = await getPyodide();
  const ns = py.globals.get('dict')();
  try {
    ns.set('FILES', py.toPy(files.map(f => ({ id: f.id, name: f.name, code: f.code || '' }))));
    py.runPython(ANALYZER_PY, { globals: ns });
    return JSON.parse(ns.get('RESULT'));
  } finally {
    ns.destroy();
  }
}

// Things the parser found for one concept: [{ fileId, line, end, label }]
export function foundFor(analysis, conceptId) {
  if (!analysis) return [];
  const out = [];
  for (const [fileId, byConcept] of Object.entries(analysis.found || {})) {
    for (const [line, end, label] of byConcept[conceptId] || []) out.push({ fileId, line, end, label });
  }
  return out;
}

const fileFailed = (analysis, fileId) => (analysis?.errors || []).some(e => e.file === fileId);

// Checks one concept's tags.
// Returns { state: 'ok' | 'warn' | 'none', message, parts? }.
//   ok   - the parser (or the fallback pattern) confirms the tagged lines
//   warn - tags exist but don't seem to contain the concept
//   none - nothing tagged
export function checkConcept(d, conceptId, analysis) {
  const tl = taggedLines(d, conceptId);
  const tagged = Object.entries(tl).filter(([, lines]) => lines && lines.length);
  if (!tagged.length) return { state: 'none' };
  const concept = CONCEPT[conceptId];
  const fileOf = (id) => d.files.find(f => f.id === id);
  const inTags = (fileId, line, end) => (tl[fileId] || []).some(n => n >= line && n <= (end || line));

  // Files Python could not read (or analysis not ready): match the fallback pattern on the tagged lines.
  const patternHits = tagged.filter(([fileId, lines]) => {
    if (analysis && !fileFailed(analysis, fileId)) return false;
    const code = (fileOf(fileId)?.code || '').split('\n');
    const text = lines.map(n => code[n - 1] || '').join('\n');
    if (conceptId === 'multi_except') return (text.match(/^\s*except\s+\(?\w/gm) || []).length >= 2 || /except\s*\(\s*\w+\s*,/.test(text);
    return lines.some(n => concept.pattern.test(code[n - 1] || ''));
  });

  const hits = foundFor(analysis, conceptId).filter(h => inTags(h.fileId, h.line, h.end));
  if (conceptId === 'custom_exc') return checkCustomException(hits, patternHits.length > 0);
  if (conceptId === 'override_poly') {
    if (!hits.length && !patternHits.length) return { state: 'warn', message: 'We couldn’t confirm an overriding method or a polymorphic call in these lines.' };
    const kinds = new Set(hits.map(h => (h.label.includes(' overrides ') ? 'override' : 'poly')));
    return { state: 'ok', message: hits.length ? `Checked by Foothold: ${hits[0].label}.` : 'Checked by Foothold (simple check).', variant: kinds.has('override') ? 'override' : kinds.has('poly') ? 'poly' : undefined, both: kinds.size === 2 };
  }
  if (hits.length) return { state: 'ok', message: `Checked by Foothold: ${describe(conceptId, hits)}.` };
  if (patternHits.length) return { state: 'ok', message: analysis ? 'Checked by Foothold (simple check, because Python couldn’t read this file).' : 'Checked by Foothold (simple check).' };
  return { state: 'warn', message: `We couldn’t confirm ${concept.label.toLowerCase()} in these lines.` };
}

function describe(conceptId, hits) {
  const labels = [...new Set(hits.map(h => h.label).filter(Boolean))];
  if (conceptId === 'class' || conceptId === 'subclass' || conceptId === 'function' || conceptId === 'object') return labels.slice(0, 3).join(', ');
  if (labels.length) return labels.slice(0, 2).join(', ');
  return CONCEPT[conceptId].label.toLowerCase();
}

function checkCustomException(hits, patternOk) {
  const parts = {
    defined: hits.some(h => h.label.startsWith('defines')),
    raised: hits.some(h => h.label.startsWith('raises')),
    caught: hits.some(h => h.label.startsWith('catches')),
  };
  if (!parts.defined && !parts.raised && !parts.caught) {
    return patternOk
      ? { state: 'ok', message: analysis ? 'Checked by Foothold (simple check, because Python couldn’t read this file).' : 'Checked by Foothold (simple check).', parts }
      : { state: 'warn', message: 'We couldn’t find your own exception class, or where it is raised or caught, in these lines.', parts };
  }
  const have = Object.entries(parts).filter(([, v]) => v).map(([k]) => k);
  const missing = Object.entries(parts).filter(([, v]) => !v).map(([k]) => k);
  return {
    state: 'ok',
    message: `Checked by Foothold: ${have.join(', ')}.` + (missing.length ? ` Also tag where it is ${missing.join(' and ')}, if your program does that.` : ''),
    parts,
  };
}

// Things the parser found that the student hasn't tagged (for "did you miss one?" hints).
export function untaggedFound(d, conceptId, analysis) {
  const tl = taggedLines(d, conceptId);
  return foundFor(analysis, conceptId).filter(h => !(tl[h.fileId] || []).some(n => n >= h.line && n <= h.end));
}

// "We found it in main.py line 14" for the not-used nudge.
export function foundHint(d, conceptId, analysis) {
  const found = foundFor(analysis, conceptId);
  if (!found.length) return '';
  const f = found[0];
  const file = d.files.find(x => x.id === f.fileId);
  return `${file?.name || 'your code'} line ${f.line}${found.length > 1 ? ` (and ${found.length - 1} more)` : ''}`;
}

// Short summary of lines for messages.
export function linesText(lines) {
  return toRanges(lines).map(rangeText).join(', ');
}
