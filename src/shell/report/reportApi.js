// ============================================================
//  REPORT API — the mini-project report's calls to Code.gs.
//  Every call is a POST carrying the session token from sign-in
//  (student.token); Code.gs refuses report actions without it.
//  Sent as a plain-text JSON body, like submitFeedback in api.js,
//  so the browser makes a "simple" request with no CORS preflight.
// ============================================================

import GAS_URL from '../../../config/gas.config.js';

async function post(action, token, payload = {}, ms = 30000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({ action, token, ...payload }),
      signal: controller.signal,
    });
    return await res.json();
  } catch (err) {
    return { success: false, network: true, message: 'Could not reach the server. Your work is kept on this device and will be saved when the connection is back.' };
  } finally {
    clearTimeout(timer);
  }
}

export const loadReport = (token) => post('reportLoad', token);
export const saveReport = (token, draft, baseVersion, force = false) => post('reportSave', token, { draft, baseVersion, force });
export const uploadReportImage = (token, dataUrl, name) => post('reportUploadImage', token, { dataUrl, name }, 60000);
export const getReportImage = (token, fileId) => post('reportGetImage', token, { fileId }, 60000);
export const deleteReportImage = (token, fileId) => post('reportDeleteImage', token, { fileId });
export const getProgressDates = (token, courseId) => post('progressDates', token, { courseId });
export const submitReportSummary = (token, summary) => post('reportSubmit', token, { summary });
