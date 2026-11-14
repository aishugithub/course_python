// ============================================================
//  API.JS — shell only. Lesson files never import this.
//
//  2026-11-14: every call is now a POST with a JSON body (sent as
//  plain text, so the browser makes a "simple" request with no CORS
//  preflight — the Apps Script endpoint would not answer one).
//  Nothing sensitive travels in a web address any more:
//    - sign-in / sign-up send the password in the body;
//    - progress calls send the session token from sign-in
//      (student.token). Code.gs works out WHOSE progress it is from
//      that token, so a roll number alone can no longer be used to
//      read or write someone else's progress.
// ============================================================

import GAS_URL from '../../config/gas.config.js';

// The Google Apps Script backend is a free deployment and can occasionally be
// slow or hang. fetch() has no built-in timeout, so a hung request would leave
// the app stuck (e.g. frozen on the "Saving progress…" screen). This aborts any
// request that runs past `ms`, turning a hang into a normal network error.
async function post(action, payload = {}, ms = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({ action, ...payload }),
      signal: controller.signal,
    });
    return await res.json();
  } catch (err) {
    console.error(action + ' failed:', err);
    return { success: false, network: true, message: 'Network error. Please try again.' };
  } finally {
    clearTimeout(timer);
  }
}

export const loginStudent = (rollNo, password) => post('login', { rollNo, password });

export const registerStudent = (email, password, name) => post('register', { username: email, password, name });

// `student` is the object sign-in returned ({ rollNo, token, … }). rollNo is
// still sent so a backend that has not been updated yet keeps working.
export const saveProgress = (student, courseId, unitId) =>
  post('saveProgress', { token: student.token, rollNo: student.rollNo, courseId, unitId });

// Several units in one request — a guest's progress moving into a new account.
export const saveProgressMany = (student, courseId, unitIds) =>
  post('saveProgress', { token: student.token, rollNo: student.rollNo, courseId, unitIds }, 30000);

// Resolves to { ok, units, expired }:
//   ok: false      → the server could not be reached (do NOT treat as "no progress")
//   expired: true  → the sign-in is too old; ask the learner to sign in again
export async function fetchProgress(student, courseId) {
  const data = await post('getProgress', { token: student.token, rollNo: student.rollNo, courseId });
  if (data && data.code === 'SESSION') return { ok: false, expired: true, units: [] };
  if (!data || !Array.isArray(data.completedUnits)) return { ok: false, expired: false, units: [] };
  return { ok: true, expired: false, units: data.completedUnits };
}

// Kept for the certificate screens: just the list (empty when unreachable).
export async function getProgress(student, courseId) {
  return (await fetchProgress(student, courseId)).units;
}

// End-of-course feedback + testimonial (from the UnitFB lesson).
// `payload` already carries courseId/userId (assembled in App.jsx).
export const submitFeedback = (payload) => post('feedback', payload);
