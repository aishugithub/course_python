// ============================================================
//  PROGRESS — the student's e-Lab Record, read from the Progress
//  sheet (Code.gs progressDates, signed-in student only), turned
//  into the certificate status and a completion date per experiment.
//  Uses the same rules as the e-Lab certificate (labCompletion.js).
// ============================================================

import COURSE_CONFIG from '../../../config/course.config.js';
import { getProgressDates } from './reportApi.js';
import { labCertificateStatus, labUnitDone, LAB_EXPERIMENT_IDS } from '../labCompletion.js';

export async function loadLabProgress(token) {
  const r = await getProgressDates(token, COURSE_CONFIG.courseId);
  if (!r.success) throw new Error(r.message || 'Could not load your e-Lab Record.');
  const units = r.units || [];
  const ids = units.map(u => u.unitId);
  const latest = (pred) => units.filter(u => pred(u.unitId)).map(u => u.completedAt).sort().pop();

  // Experiment n is done on its submission date, or on the date its last required stage was recorded.
  const expDates = {};
  LAB_EXPERIMENT_IDS.forEach((id, i) => {
    if (!labUnitDone(id, ids)) return;
    expDates[i + 1] = latest(u => u === id) || latest(u => u.startsWith(id + '@'));
  });
  return { status: labCertificateStatus(ids), expDates };
}
