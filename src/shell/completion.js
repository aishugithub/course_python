// ============================================================
//  COMPLETION.JS — shell helper: certificate-eligibility rules,
//  defined once and shared by App.jsx, Dashboard.jsx and
//  Certificate.jsx. Lesson files never import this.
//
//  The certificate is earned by clearing ALL Crucibles AND
//  submitting the end-of-course feedback. Both facts are read
//  from the Google Sheet (server truth) at certificate time, so
//  the rule here operates on whatever completed-unit list it is
//  given — for a signed-in learner that list is the sheet's.
// ============================================================

import COURSE_CONFIG from '../../config/course.config.js';

// The end-of-course feedback unit. Completing it (onUnitComplete) records
// "UnitFB" in the same Progress sheet as every other unit, so the certificate
// gate can check for it exactly like a Crucible.
export const FEEDBACK_UNIT_ID = 'UnitFB';

// The Crucibles are the optional challenge units whose id ends in "_C"
// (Unit4_C … Unit10_C, UnitCT1_C…CT3_C). Derived from the config so adding or
// removing a Crucible later needs no change here.
export const CRUCIBLE_UNIT_IDS = COURSE_CONFIG.modules
  .flatMap(m => m.units)
  .filter(u => /_C$/.test(u.unitId))
  .map(u => u.unitId);

const STAGES = ['spark', 'flame', 'forge', 'temper'];

// A Crucible counts as cleared if EITHER the badge was claimed (its bare unitId
// is present — what the "Claim badge" button records) OR all four gated stages
// were completed (the pseudo-ids "UnitX_C@spark" …). The stage path is a safety
// net for a learner who finished every stage but closed before claiming.
function isCrucibleDone(unitId, set) {
  if (set.has(unitId)) return true;
  return STAGES.every(s => set.has(`${unitId}@${s}`));
}

// Full certificate-eligibility snapshot computed from a completed-unit list.
// `completedUnits` mixes real unit ids and Crucible stage pseudo-ids, so we
// wrap it in a Set once and test against it.
export function certificateStatus(completedUnits) {
  const set = new Set(completedUnits || []);
  const doneIds = CRUCIBLE_UNIT_IDS.filter(id => isCrucibleDone(id, set));
  const cruciblesDone = doneIds.length;
  const cruciblesTotal = CRUCIBLE_UNIT_IDS.length;
  const allCrucibles = cruciblesTotal > 0 && cruciblesDone === cruciblesTotal;
  const feedbackDone = set.has(FEEDBACK_UNIT_ID);
  return {
    cruciblesDone,
    cruciblesTotal,
    allCrucibles,
    feedbackDone,
    eligible: allCrucibles && feedbackDone,
  };
}
