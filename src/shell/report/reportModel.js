// ============================================================
//  REPORT MODEL — the shape of a mini-project report draft and
//  the list of steps. The whole draft is one plain object that is
//  saved as draft.json in the student's Drive folder (Code.gs).
//  `schema` lets a later version upgrade older drafts.
// ============================================================

import { CONCEPTS, SCREENS, conceptState } from './concepts.js';

export const SCHEMA = 2;

export const STEPS = [
  { id: 'title',      label: 'Project title' },
  { id: 'problem',    label: 'The problem' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'code',       label: 'Your code' },
  { id: 'concepts',   label: 'Python concepts' },
  { id: 'running',    label: 'Program running' },
  { id: 'testing',    label: 'Testing' },
  { id: 'grew',       label: 'How it grew' },
  { id: 'reflect',    label: 'Reflection' },
  { id: 'finish',     label: 'References & download' },
];

export const MIN_TESTS = 5;
export const TEST_KINDS = ['Normal value', 'Boundary value', 'Wrong type (e.g. text for a number)', 'Impossible value', 'Missing or empty file', 'My own exception', 'Other'];

const fileId = () => 'f' + Math.random().toString(36).slice(2, 9);
export const newFile = (name = 'main.py') => ({ id: fileId(), name, code: '' });
export const newTest = () => ({ kind: '', input: '', expected: '', actual: '', result: '' });

export function newDraft() {
  return {
    schema: SCHEMA,
    step: 'title',
    title: '',
    problem: { users: '', place: '', summary: '', items: [{ problem: '', fix: '' }] },
    objectives: ['', ''],
    files: [newFile('main.py')],
    // concepts[id] = { lines: { fileId: [lineNo, ...] }, notUsed, note, keep, sig: { fileId: hash }, variant }
    concepts: {},
    // answers[screenId] = { text, place }
    answers: {},
    conceptScreen: SCREENS[0].id,
    // shots: uploaded screenshots { fileId, caption, concepts: [conceptId] }
    shots: [],
    tests: [newTest(), newTest(), newTest(), newTest(), newTest()],
    grew: {},          // grew[exp] = what I added that week
    reflect: { saw: '', found: '', fixed: '', limits: '', conclusion: '', future: ['', ''], aiUsed: '', aiWhat: '' },
    refs: [''],
    ack: '',
    // For the teacher's viva sheet only: seconds spent per step, and
    // how many characters were typed vs pasted into the written answers.
    meta: { seconds: {}, typed: {}, pasted: {} },
  };
}

// Fills in anything an older or partial draft is missing.
export function upgradeDraft(d) {
  const base = newDraft();
  if (!d || typeof d !== 'object') return base;
  const files = Array.isArray(d.files) && d.files.length ? d.files.map(f => ({ ...f, id: f.id || fileId() })) : base.files;
  return {
    ...base,
    ...d,
    schema: SCHEMA,
    files,
    problem: { ...base.problem, ...(d.problem || {}) },
    reflect: { ...base.reflect, ...(d.reflect || {}) },
    meta: { ...base.meta, ...(d.meta || {}) },
    objectives: Array.isArray(d.objectives) && d.objectives.length ? d.objectives : base.objectives,
    tests: Array.isArray(d.tests) && d.tests.length ? d.tests : base.tests,
    refs: Array.isArray(d.refs) && d.refs.length ? d.refs : base.refs,
    shots: Array.isArray(d.shots) ? d.shots : [],
    concepts: d.concepts && typeof d.concepts === 'object' ? d.concepts : {},
    answers: d.answers && typeof d.answers === 'object' ? d.answers : {},
    grew: d.grew && typeof d.grew === 'object' ? d.grew : {},
  };
}

export const filled = (s) => String(s || '').trim().length > 0;
const words = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;

export const testDone = (t) => filled(t.input) && filled(t.expected) && filled(t.actual) && filled(t.result);

// What is still missing on each step, as short friendly notes.
// Missing items never block moving on; they are listed again before the download.
export function missingFor(stepId, d) {
  switch (stepId) {
    case 'title':
      if (!filled(d.title)) return ['Type your project title.'];
      if (words(d.title) < 2) return ['Make the title a little more descriptive.'];
      return [];
    case 'problem': {
      const m = [];
      if (!filled(d.problem.users)) m.push('Say who will use your program.');
      if (!filled(d.problem.place)) m.push('Say where they will use it.');
      if (!d.problem.items.some(it => filled(it.problem) && filled(it.fix))) m.push('Describe at least one problem and how your program helps.');
      if (!filled(d.problem.summary)) m.push('Write one or two sentences on what your program does.');
      return m;
    }
    case 'objectives':
      return d.objectives.filter(filled).length >= 2 ? [] : ['Write at least two objectives.'];
    case 'code':
      return d.files.some(f => filled(f.code)) ? [] : ['Paste your program code.'];
    case 'concepts': {
      const undecided = CONCEPTS.filter(c => conceptState(d, c.id) === 'pending').length;
      const unanswered = SCREENS.filter(s => s.concepts.some(id => conceptState(d, id) === 'used') && !filled(d.answers[s.id]?.text)).length;
      const m = [];
      if (undecided) m.push(`${undecided} concept${undecided === 1 ? ' is' : 's are'} not tagged or marked “not used” yet.`);
      if (unanswered) m.push(`${unanswered} short question${unanswered === 1 ? ' is' : 's are'} not answered yet.`);
      return m;
    }
    case 'running': {
      if (!d.shots.length) return ['Add at least one screenshot of your program running.'];
      const noCap = d.shots.filter(s => !filled(s.caption)).length;
      return noCap ? [`Write a caption for ${noCap} screenshot${noCap === 1 ? '' : 's'}.`] : [];
    }
    case 'testing': {
      const n = d.tests.filter(testDone).length;
      return n >= MIN_TESTS ? [] : [`Fill in at least ${MIN_TESTS} tests (${n} done).`];
    }
    case 'grew': {
      const n = Object.values(d.grew).filter(filled).length;
      return n >= 3 ? [] : ['Write what you added to your project in at least three experiments.'];
    }
    case 'reflect': {
      const r = d.reflect, m = [];
      if (!filled(r.saw) || !filled(r.fixed)) m.push('Describe the hardest bug and how you fixed it.');
      if (!filled(r.limits)) m.push('Write one limitation of your program.');
      if (!filled(r.conclusion)) m.push('Write your conclusion.');
      if (!r.aiUsed) m.push('Say whether you used any AI tool.');
      else if (r.aiUsed === 'yes' && !filled(r.aiWhat)) m.push('Say which AI tool you used and what for.');
      return m;
    }
    case 'finish':
      return d.refs.some(filled) ? [] : ['Add at least one reference.'];
    default:
      return [];
  }
}

function touched(stepId, d) {
  switch (stepId) {
    case 'title': return filled(d.title);
    case 'problem': return filled(d.problem.users) || filled(d.problem.place) || filled(d.problem.summary) || d.problem.items.some(it => filled(it.problem) || filled(it.fix));
    case 'objectives': return d.objectives.some(filled);
    case 'code': return d.files.some(f => filled(f.code));
    case 'concepts': return CONCEPTS.some(c => conceptState(d, c.id) !== 'pending');
    case 'running': return d.shots.length > 0;
    case 'testing': return d.tests.some(t => filled(t.input) || filled(t.expected));
    case 'grew': return Object.values(d.grew).some(filled);
    case 'reflect': return Object.values(d.reflect).some(v => (Array.isArray(v) ? v.some(filled) : filled(v)));
    case 'finish': return d.refs.some(filled) || filled(d.ack);
    default: return false;
  }
}

// 'done' | 'partial' | 'empty' for the step list.
export function stepStatus(stepId, d) {
  if (missingFor(stepId, d).length === 0) return 'done';
  return touched(stepId, d) ? 'partial' : 'empty';
}

export function codeStats(files) {
  const nonEmpty = files.filter(f => filled(f.code));
  const lines = nonEmpty.reduce((n, f) => n + f.code.replace(/\n+$/, '').split('\n').length, 0);
  return { files: nonEmpty.length, lines };
}

// A short fingerprint of a file's code, to notice when it changed after tagging.
export function codeHash(s) {
  let h = 5381;
  const str = String(s || '');
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}
