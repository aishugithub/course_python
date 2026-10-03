// ============================================================
//  API.JS — shell only. Lesson files never import this.
// ============================================================

import GAS_URL from '../../config/gas.config.js';

// The Google Apps Script backend is a free deployment and can occasionally be
// slow or hang. fetch() has no built-in timeout, so a hung request would leave
// the app stuck (e.g. frozen on the "Saving progress…" screen). This wrapper
// aborts any request that runs past `ms`, turning an indefinite hang into a
// normal, catchable network error that each function below already handles.
async function fetchWithTimeout(url, ms = 15000, opts = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function loginStudent(rollNo, password) {
  try {
    const url = `${GAS_URL}?action=login&rollNo=${encodeURIComponent(rollNo)}&password=${encodeURIComponent(password)}`;
    const res  = await fetchWithTimeout(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('login failed:', err);
    return { success: false, message: 'Network error. Please try again.' };
  }
}

export async function registerStudent(email, password, name) {
  try {
    const url = `${GAS_URL}?action=register&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&name=${encodeURIComponent(name)}`;
    const res  = await fetchWithTimeout(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('register failed:', err);
    return { success: false, message: 'Network error. Please try again.' };
  }
}

export async function saveProgress(rollNo, courseId, unitId) {
  try {
    const url = `${GAS_URL}?action=saveProgress&rollNo=${encodeURIComponent(rollNo)}&courseId=${encodeURIComponent(courseId)}&unitId=${encodeURIComponent(unitId)}`;
    const res  = await fetchWithTimeout(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('saveProgress failed:', err);
    return { success: false };
  }
}

export async function getProgress(rollNo, courseId) {
  try {
    const url = `${GAS_URL}?action=getProgress&rollNo=${encodeURIComponent(rollNo)}&courseId=${encodeURIComponent(courseId)}`;
    const res  = await fetchWithTimeout(url);
    const data = await res.json();
    return data.completedUnits || [];
  } catch (err) {
    console.error('getProgress failed:', err);
    return [];
  }
}

// End-of-course feedback + testimonial (from the UnitFB lesson). Sent as a POST
// so long open-ended answers aren't capped by URL length. The body is a plain
// JSON string with no custom Content-Type header, which keeps it a "simple"
// request and avoids a CORS preflight the Apps Script endpoint wouldn't answer.
// `payload` already carries action/courseId/userId (assembled in App.jsx).
export async function submitFeedback(payload) {
  try {
    const res  = await fetchWithTimeout(GAS_URL, 15000, {
      method: 'POST',
      body: JSON.stringify({ action: 'feedback', ...payload }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('submitFeedback failed:', err);
    return { success: false };
  }
}
