// ============================================================
//  SESSION.JS — shell helper: what the browser remembers about a
//  signed-in learner between page loads. Lesson files never import this.
//
//  - The sign-in itself ({ rollNo, name, batch, email, token }): kept in
//    localStorage ("keep me signed in", the default) or in sessionStorage
//    (forgotten when the browser closes — for shared lab computers).
//    The password is never stored; the token is what Code.gs checks.
//  - A copy of the learner's progress, so a slow or unreachable server
//    shows their last known progress instead of an empty dashboard.
//  - Units that could not be saved (no network, expired sign-in). They
//    are sent again the next time the server answers.
// ============================================================

const SESSION_KEY = 'foothold_session_v1';
const CACHE_KEY   = 'foothold_progress_cache_v1:';
const UNSENT_KEY  = 'foothold_unsent_v1:';

const read = (store, key) => { try { return JSON.parse(store.getItem(key) || 'null'); } catch { return null; } };
const write = (store, key, value) => { try { store.setItem(key, JSON.stringify(value)); } catch { /* storage blocked */ } };
const drop = (store, key) => { try { store.removeItem(key); } catch { /* storage blocked */ } };

export function loadSession() {
  const s = read(sessionStorage, SESSION_KEY) || read(localStorage, SESSION_KEY);
  return s && s.rollNo && s.token ? s : null;
}

export function storeSession(student, keep = true) {
  drop(localStorage, SESSION_KEY);
  drop(sessionStorage, SESSION_KEY);
  write(keep ? localStorage : sessionStorage, SESSION_KEY, student);
}

export function clearSession() {
  drop(localStorage, SESSION_KEY);
  drop(sessionStorage, SESSION_KEY);
}

export const cachedProgress = (rollNo) => read(localStorage, CACHE_KEY + rollNo) || [];
export const cacheProgress = (rollNo, units) => write(localStorage, CACHE_KEY + rollNo, units);

export const unsentUnits = (rollNo) => read(localStorage, UNSENT_KEY + rollNo) || [];
export function addUnsent(rollNo, unitId) {
  write(localStorage, UNSENT_KEY + rollNo, [...new Set([...unsentUnits(rollNo), unitId])]);
}
export const clearUnsent = (rollNo) => drop(localStorage, UNSENT_KEY + rollNo);
