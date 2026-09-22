// ============================================================
//  ANALYTICS.JS — minimal, fire-and-forget usage tracking.
//  Logs to the same Google Sheets backend as everything else
//  (see Code.gs: handleLogEvent -> 'Events' tab, auto-created).
//
//  IMPORTANT: logEvent() is never awaited by its callers. A slow
//  or failed analytics call must NEVER stall or break the actual
//  learning experience -- that's more important than not losing
//  the odd event.
// ============================================================

import GAS_URL from '../../config/gas.config.js';
import COURSE_CONFIG from '../../config/course.config.js';

const ANON_ID_KEY = 'foothold_anon_id';

// One random ID per browser, persisted forever (or until the
// person clears site data). This is what lets us count unique
// guests, not just registered students.
function getAnonId() {
  try {
    let id = localStorage.getItem(ANON_ID_KEY);
    if (!id) {
      id = (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : `anon-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      localStorage.setItem(ANON_ID_KEY, id);
    }
    return id;
  } catch {
    return 'unknown'; // e.g. localStorage blocked in private browsing
  }
}

// eventType: 'session_start' | 'lesson_open' | 'lesson_complete' | 'signup'
//
// `detail` (added 2026-09-14): optional free-text/JSON extra payload for an
// event, stored in the Events sheet's 7th column (see Code.gs handleLogEvent).
// Every existing call site omits it and behaves exactly as before -- this is
// additive, not a breaking change. Right now the only caller that passes it
// is App.jsx's handleUnitComplete, when a lesson's onUnitComplete supplies a
// payload (currently just UnitFT, the far-transfer assessment, passing
// { score, total, tag }). Kept as a generic string (not named score/total
// fields) so future instrumentation -- Crucible hint-tier counts, per-section
// dwell time -- can reuse this same param without another analytics.js edit.
export function logEvent(eventType, { unitId = '', userId = '', detail = '' } = {}) {
  try {
    const url = `${GAS_URL}?action=logEvent`
      + `&anonId=${encodeURIComponent(getAnonId())}`
      + `&userId=${encodeURIComponent(userId)}`
      + `&eventType=${encodeURIComponent(eventType)}`
      + `&courseId=${encodeURIComponent(COURSE_CONFIG.courseId)}`
      + `&unitId=${encodeURIComponent(unitId)}`
      + `&detail=${encodeURIComponent(detail)}`;
    // No await, no .then() the caller waits on -- fire and forget.
    fetch(url).catch(() => {});
  } catch {
    // Never let analytics break the app.
  }
}
