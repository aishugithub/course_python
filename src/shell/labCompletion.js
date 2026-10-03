// ============================================================
//  LAB-COMPLETION.JS — shell helper for the SEPARATE Lab
//  certificate (MED23CL202 Python Programming Laboratory).
//
//  Kept apart from completion.js (the generic Foothold-course
//  certificate) on purpose: this one gates on the LAB track, not
//  the ten course Crucibles. App.jsx, Dashboard.jsx and
//  LabCertificate.jsx share it; lesson files never import it.
//
//  HOW THE GATE WORKS (reads ONLY the existing Progress data — no
//  Code.gs change). The lab mini-project runs across FIVE crucible
//  checkpoints, each covering an experiment pair:
//     UnitLAB2_5 (Exp 1&2) · UnitLAB4_5 (Exp 3&4) ·
//     UnitLAB6_5 (Exp 5&6) · UnitLAB8_5 (Exp 7&8) ·
//     UnitLAB10_5 (Exp 9&10)
//  A student picks ONE of four tracks (A/B/C/D) in week 1 and
//  completes it in every crucible. Each crucible persists, through
//  the existing onStageComplete/onUnitComplete plumbing:
//     • its bare unitId            — when the checkpoint is claimed
//     • "UnitLABX_5@<L>_temper"     — when track L's final stage passes
//  The certificate is earned when the student's CHOSEN track L is
//  done in ALL FIVE crucibles. "Done" for a crucible = its bare
//  unitId is present OR that track's "@<L>_temper" pseudo-id is —
//  exactly the belt-and-braces rule the generic certificate uses.
// ============================================================

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

const TRACK_LETTERS = ['A', 'B', 'C', 'D'];

// A crucible counts as done for track L if the checkpoint was claimed (bare
// unitId present) OR that track's final "temper" stage was recorded.
function crucibleDoneForTrack(cid, L, set) {
  return set.has(cid) || set.has(`${cid}@${L}_temper`);
}

// Full lab-certificate snapshot computed from a completed-unit list (the list
// mixes real unit ids and crucible stage pseudo-ids, so we wrap it in a Set).
// The chosen track is inferred from the "@<L>_temper" pseudo-ids the student
// actually produced — the letter they tempered in the most crucibles.
export function labCertificateStatus(completedUnits) {
  const set = new Set(completedUnits || []);

  // Tally tempered crucibles per track letter to find the student's track.
  const tally = { A: 0, B: 0, C: 0, D: 0 };
  for (const cid of LAB_CRUCIBLE_IDS) {
    for (const L of TRACK_LETTERS) {
      if (set.has(`${cid}@${L}_temper`)) tally[L]++;
    }
  }
  let chosen = null, best = -1;
  for (const L of TRACK_LETTERS) {
    if (tally[L] > best) { best = tally[L]; chosen = L; }
  }
  const hasTrack = best > 0; // at least one tempered track stage exists

  const cruciblesTotal = LAB_CRUCIBLE_IDS.length;
  const cruciblesDone = hasTrack
    ? LAB_CRUCIBLE_IDS.filter((c) => crucibleDoneForTrack(c, chosen, set)).length
    : 0;
  const eligible = hasTrack && cruciblesDone === cruciblesTotal;

  return {
    eligible,
    trackLetter: hasTrack ? chosen : null,
    trackName: hasTrack ? LAB_TRACKS[chosen] : null,
    cruciblesDone,
    cruciblesTotal,
  };
}
