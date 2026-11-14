import { useEffect } from 'react';
import { logEvent } from './analytics.js';

// ── ActiveTimer ──
// Measures how long a learner actually WORKS in a lesson, not how long the tab
// stays open. A second counts only if the tab is visible and the learner typed,
// clicked, scrolled or moved the pointer within the last 60 seconds.
// One "lesson_time" event is sent when the lesson is left (or the tab is hidden
// or closed), carrying the seconds since the last report. Nothing is sent for
// visits shorter than 15 seconds. Fire-and-forget, like every other event.
const IDLE_AFTER_MS = 60000;
const MIN_SECONDS = 15;

export default function ActiveTimer({ unitId, userId }) {
  useEffect(() => {
    let seconds = 0;
    let lastActive = Date.now();
    const touch = () => { lastActive = Date.now(); };
    const tick = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastActive < IDLE_AFTER_MS) seconds += 1;
    }, 1000);
    const report = () => {
      if (seconds < MIN_SECONDS) return;
      logEvent('lesson_time', { unitId, userId: userId || '', detail: JSON.stringify({ seconds }) });
      seconds = 0;
    };
    const onHide = () => { if (document.visibilityState === 'hidden') report(); };
    const events = ['keydown', 'pointerdown', 'pointermove', 'wheel', 'touchstart', 'scroll'];
    events.forEach(ev => window.addEventListener(ev, touch, { passive: true, capture: true }));
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', report);
    return () => {
      clearInterval(tick);
      events.forEach(ev => window.removeEventListener(ev, touch, { capture: true }));
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', report);
      report();
    };
  }, [unitId, userId]);
  return null;
}
