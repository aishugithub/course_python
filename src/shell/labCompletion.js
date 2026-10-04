// ============================================================
//  LAB-COMPLETION.JS — shell helper for the SEPARATE e-Lab
//  certificate (MED23CL202 Python Programming Laboratory).
//
//  Kept apart from completion.js (the generic Foothold-course
//  certificate) on purpose: this one gates on the e-Lab Record,
//  not the ten course Crucibles. App.jsx, Dashboard.jsx and
//  LabCertificate.jsx share it; lesson files never import it.
//
//  HOW THE GATE WORKS (reads ONLY the existing Progress data — no
//  Code.gs change). The certificate needs ALL of:
//   • the end-of-course feedback (UnitFB, the Finish Line unit),
//   • all TEN experiments  (UnitLAB1 … UnitLAB10), and
//   • all FIVE mini-project crucibles
//       UnitLAB2_5 (Exp 1&2) · UnitLAB4_5 (Exp 3&4) ·
//       UnitLAB6_5 (Exp 5&6) · UnitLAB8_5 (Exp 7&8) ·
//       UnitLAB10_5 (Exp 9&10)
//  An experiment counts as done when its record was submitted (bare
//  unitId) OR all six of its stages were recorded ("UnitLAB1@p1_algo" …).
//  A crucible counts as done when it was claimed (bare unitId) OR any
//  track's final stage was recorded ("UnitLAB2_5@B_temper"). Students may
//  switch tracks between crucibles — any track counts.
//
//  PARTICIPATION (partial) certificate: a student who is not fully done but
//  has finished at least `participationMinPct` % of the 15 items (experiments +
//  mini projects, any mix) AND the feedback qualifies for a Certificate of
//  Participation — only while course.config.js labCertificate.participationOpen
//  is true. While it is false, students see nothing about it.
// ============================================================

import COURSE_CONFIG from '../../config/course.config.js';

const CERT_CFG = COURSE_CONFIG.labCertificate || {};
export const PARTICIPATION_OPEN = !!CERT_CFG.participationOpen;
export const PARTICIPATION_MIN_PCT = CERT_CFG.participationMinPct ?? 60;

export const LAB_EXPERIMENT_IDS = [
  'UnitLAB1', 'UnitLAB2', 'UnitLAB3', 'UnitLAB4', 'UnitLAB5',
  'UnitLAB6', 'UnitLAB7', 'UnitLAB8', 'UnitLAB9', 'UnitLAB10',
];

// The five mini-project crucibles, in course order.
export const LAB_CRUCIBLE_IDS = [
  'UnitLAB2_5', 'UnitLAB4_5', 'UnitLAB6_5', 'UnitLAB8_5', 'UnitLAB10_5',
];

// The four mini-project tracks (letter → display name), matching the lab manual.
export const LAB_TRACKS = {
  A: 'Patient Vitals Monitor',
  B: 'Pharmacy Stock Manager',
  C: 'Clinic Appointment Book',
  D: 'Health-Camp Screening Analyzer',
};

// The end-of-course feedback unit — submitting it records "UnitFB".
export const LAB_FEEDBACK_ID = 'UnitFB';

const TRACK_LETTERS = ['A', 'B', 'C', 'D'];
const EXP_STAGES = ['p1_algo', 'p1_flow', 'p1_prog', 'p2_algo', 'p2_flow', 'p2_prog'];

function experimentDone(id, set) {
  return set.has(id) || EXP_STAGES.every((s) => set.has(`${id}@${s}`));
}

function crucibleDone(id, set) {
  return set.has(id) || TRACK_LETTERS.some((L) => set.has(`${id}@${L}_temper`));
}

// One e-Lab Record unit's done-ness by the same rule as the certificate, so
// the Dashboard's ticks and counts always agree with the certificate gate.
export function labUnitDone(id, completedUnits) {
  const set = completedUnits instanceof Set ? completedUnits : new Set(completedUnits || []);
  if (LAB_CRUCIBLE_IDS.includes(id)) return crucibleDone(id, set);
  if (LAB_EXPERIMENT_IDS.includes(id)) return experimentDone(id, set);
  return set.has(id);
}

// Short names for the "what's left" lists.
const expLabel = (id) => `Experiment ${id.replace('UnitLAB', '')}`;
const CRUCIBLE_LABEL = {
  UnitLAB2_5: 'Mini-project crucible (Exp 1 & 2)',
  UnitLAB4_5: 'Mini-project crucible (Exp 3 & 4)',
  UnitLAB6_5: 'Mini-project crucible (Exp 5 & 6)',
  UnitLAB8_5: 'Mini-project crucible (Exp 7 & 8)',
  UnitLAB10_5: 'Mini-project crucible (Exp 9 & 10)',
};

// Full e-Lab certificate snapshot computed from a completed-unit list (the list
// mixes real unit ids and stage pseudo-ids, so we wrap it in a Set).
export function labCertificateStatus(completedUnits) {
  const set = new Set(completedUnits || []);

  const expMissing = LAB_EXPERIMENT_IDS.filter((id) => !experimentDone(id, set));
  const crucMissing = LAB_CRUCIBLE_IDS.filter((id) => !crucibleDone(id, set));
  const feedbackDone = set.has(LAB_FEEDBACK_ID);

  // The tracks the student actually finished, most-used first (for the certificate).
  const tally = { A: 0, B: 0, C: 0, D: 0 };
  for (const cid of LAB_CRUCIBLE_IDS) {
    for (const L of TRACK_LETTERS) if (set.has(`${cid}@${L}_temper`)) tally[L]++;
  }
  const trackLetters = TRACK_LETTERS.filter((L) => tally[L] > 0).sort((a, b) => tally[b] - tally[a]);

  const itemsTotal = LAB_EXPERIMENT_IDS.length + LAB_CRUCIBLE_IDS.length;
  const itemsDone = itemsTotal - expMissing.length - crucMissing.length;
  const eligible = expMissing.length === 0 && crucMissing.length === 0 && feedbackDone;
  // Compared on whole counts (no rounding): 60% of 15 = 9 items.
  const participationQualifies = !eligible && feedbackDone && itemsDone * 100 >= PARTICIPATION_MIN_PCT * itemsTotal;

  return {
    eligible,
    // Which certificate the student can download right now, if any.
    certificate: eligible ? 'completion' : (PARTICIPATION_OPEN && participationQualifies ? 'participation' : null),
    itemsDone,
    itemsTotal,
    experimentsDone: LAB_EXPERIMENT_IDS.length - expMissing.length,
    experimentsTotal: LAB_EXPERIMENT_IDS.length,
    cruciblesDone: LAB_CRUCIBLE_IDS.length - crucMissing.length,
    cruciblesTotal: LAB_CRUCIBLE_IDS.length,
    feedbackDone,
    missing: [
      ...expMissing.map(expLabel),
      ...crucMissing.map((id) => CRUCIBLE_LABEL[id]),
      ...(feedbackDone ? [] : ['Feedback (Finish Line)']),
    ],
    trackNames: trackLetters.map((L) => LAB_TRACKS[L]),
  };
}
