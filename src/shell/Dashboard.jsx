import { useState } from 'react';
import COURSE_CONFIG from '../../config/course.config.js';
import { DARK as D, FONT, MONO } from './brand.js';

// ─────────────────────────────────────────────────────────────────────────────
// Foothold Dashboard — ACCORDION EDITION, DARK BRAND
//
// How this fits in the app: App.jsx renders <Dashboard/> whenever no lesson is
// open. Props: student (null = guest), completedUnits, onSelectUnit(unitId),
// onRequestLogin, onSignOff — unchanged, so App.jsx needs no edits.
//
// Modules are collapsible rows (an accordion). Each shows its catchy one-liner;
// expanding reveals unit links with their own hook lines (all copy lives in
// `blurb` fields in course.config.js — edit copy there, never here). The module
// containing the learner's next incomplete unit starts expanded and that unit
// carries a "START HERE" chip, so returning learners resume in one click.
//
// All colours/fonts come from ./brand.js — the DARK token block, the same one
// the Landing page and the lessons share, so the dashboard, the landing and any
// lesson feel like one continuous dark product. Amber stays the hero accent.
// ─────────────────────────────────────────────────────────────────────────────

// Module accent rotation: amber (the hero), blue (the lessons' secondary
// accent), and bronze — three brand-adjacent tones that read on the dark canvas
// and let each module have its own colour without fighting the amber hooks.
const MODULE_COLORS = [D.amber, D.blue, D.bronze];
const FIRE_BG = 'rgba(231,161,62,0.10)'; // warm amber wash behind Crucible rows

// Brand mark: three climbing steps. On dark, the two lower steps go light and
// the summit step keeps the amber — same colourway as the Landing hero.
function FootholdMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <rect x="8" y="60" width="26" height="26" rx="7" fill={D.inkSoft} />
      <rect x="37" y="37" width="26" height="26" rx="7" fill={D.inkSoft} />
      <rect x="66" y="14" width="26" height="26" rx="7" fill={D.amber} />
    </svg>
  );
}

export default function Dashboard({ student, completedUnits, onSelectUnit, onRequestLogin, onSignOff, certStatus, onOpenCertificate, labCertStatus, onOpenLabCertificate }) {
  // Optional units (Crucibles) are bonus: excluded from the % so skipping
  // challenges never blocks 100%. completedUnits may also hold stage
  // pseudo-ids like "Unit4_C@spark"; counting only required ids filters those.
  const requiredIds = new Set(
    COURSE_CONFIG.modules.flatMap(m => m.units.filter(u => !u.optional).map(u => u.unitId))
  );
  const totalUnits = requiredIds.size;
  const doneSet = new Set(completedUnits);
  const doneCount = completedUnits.filter(id => requiredIds.has(id)).length;
  const pct = Math.round((doneCount / totalUnits) * 100);
  const isGuest = !student;

  // "Next up" = first required unit (in course order) not yet completed.
  // Drives the auto-expanded module and the START HERE chip.
  let nextUnitId = null, nextModuleId = null;
  outer:
  for (const mod of COURSE_CONFIG.modules) {
    for (const unit of mod.units) {
      if (!unit.optional && !doneSet.has(unit.unitId)) {
        nextUnitId = unit.unitId; nextModuleId = mod.moduleId;
        break outer;
      }
    }
  }

  // ---- Remembering where the learner was -------------------------------
  // App.jsx unmounts the Dashboard while a lesson is open and mounts a FRESH
  // one when the learner comes back, so any accordion state held only in
  // useState is wiped on every return trip. That is why the dashboard used to
  // snap back to Module 1: the "next up" module is computed from COMPLETED
  // units, and someone browsing ahead into Module 4 without having ticked off
  // Module 1 still has M1 as their next-up.
  // Fix: whenever a unit is opened we stash its moduleId in localStorage, and
  // on mount we prefer that remembered module over the computed next-up one.
  // localStorage (not useState) is what survives the unmount.
  const LAST_MODULE_KEY = 'foothold_last_module';

  const readLastModule = () => {
    try {
      const saved = localStorage.getItem(LAST_MODULE_KEY);
      // Guard against a stale id left over from an older course config.
      return COURSE_CONFIG.modules.some(m => m.moduleId === saved) ? saved : null;
    } catch {
      return null; // private-browsing / storage disabled — fall through silently
    }
  };

  // Which module should be open on this mount, in priority order:
  //   1. the module of the unit they were last inside (returning learner)
  //   2. the module holding their next incomplete unit (fresh session)
  //   3. the very first module (brand-new or fully-finished learner)
  const initialOpenModule =
    readLastModule() || nextModuleId || COURSE_CONFIG.modules[0].moduleId;

  // Accordion state: a Set of open moduleIds.
  const [openModules, setOpenModules] = useState(() => new Set([initialOpenModule]));

  // Wraps the onSelectUnit prop so opening any unit also records its module.
  // App.jsx is untouched — the remembering happens entirely on this side.
  const selectUnit = (unitId, moduleId) => {
    try { localStorage.setItem(LAST_MODULE_KEY, moduleId); } catch { /* ignore */ }
    onSelectUnit(unitId);
  };
  function toggleModule(moduleId) {
    setOpenModules(prev => {
      const next = new Set(prev);
      next.has(moduleId) ? next.delete(moduleId) : next.add(moduleId);
      return next;
    });
  }

  return (
    <div style={{ minHeight: '100vh', background: D.bgDeep, fontFamily: FONT }}>

      {/* Hover/expand styling lives in real CSS (inline styles can't do
          :hover or transitions on grid rows). Class names are local. On dark,
          hover lifts a row to the raised surface instead of the old cream. */}
      <style>{`
        .fh-mod { transition: border-color 0.2s, box-shadow 0.2s; }
        .fh-mod-head { cursor: pointer; user-select: none; }
        .fh-mod-head:hover { background: ${D.surfaceRaised}; }
        .fh-chev { transition: transform 0.25s ease; color: ${D.inkMuted}; font-size: 13px; }
        .fh-open .fh-chev { transform: rotate(90deg); }
        .fh-units { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; }
        .fh-open .fh-units { grid-template-rows: 1fr; }
        .fh-units-inner { overflow: hidden; }
        .fh-unit { cursor: pointer; border-left: 2px solid transparent;
                   transition: background 0.15s, border-color 0.15s, transform 0.15s; }
        .fh-unit:hover { background: ${D.surfaceRaised}; transform: translateX(4px); }
      `}</style>

      {/* ── Header: brand mark + wordmark left, guest/student box right ── */}
      <div style={{ background: D.surface, borderBottom: `1px solid ${D.border}`, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <FootholdMark />
          <div>
            <div style={{ color: D.ink, fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em' }}>
              Foothold
              <span style={{ color: D.inkMuted, fontWeight: 400, fontSize: 14 }}> · {COURSE_CONFIG.courseTitle}</span>
            </div>
            <div style={{ color: D.amber, fontFamily: MONO, fontSize: 11.5 }}>Get your footing. Keep climbing.</div>
          </div>
        </div>
        {isGuest ? (
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: D.ink, fontWeight: 600, fontSize: 14 }}>👋 Browsing as Guest</div>
            <button onClick={onRequestLogin} style={{ marginTop: 4, background: 'transparent', border: `1px solid ${D.border}`, color: D.ink, borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', fontFamily: FONT }}>
              Sign in to save progress
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: D.ink, fontWeight: 600 }}>{student.name}</div>
            <div style={{ color: D.inkMuted, fontSize: 12, fontFamily: MONO }}>{student.rollNo}</div>
            <button onClick={onSignOff} style={{ marginTop: 4, background: 'transparent', border: `1px solid ${D.border}`, color: D.inkSoft, borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', fontFamily: FONT }}>
              Sign Off
            </button>
          </div>
        )}
      </div>

      {/* ── Course progress bar (navy → amber: the climb) on a dark track ── */}
      <div style={{ height: 4, background: D.border }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${D.blue}, ${D.amber})`, transition: 'width 0.6s' }} />
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 20px 60px' }}>

        {/* ── The hook: why this course is different ── */}
        <div style={{ padding: '4px 4px 20px' }}>
          <div style={{ color: D.ink, fontSize: 'clamp(19px, 4.5vw, 24px)', fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.01em' }}>
            {COURSE_CONFIG.hook?.line1}
          </div>
          <div style={{ color: D.inkSoft, fontSize: 14.5, marginTop: 6 }}>
            {COURSE_CONFIG.hook?.line2}
          </div>
        </div>

        {/* ── Progress summary ── */}
        <div style={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 18, marginBottom: 26 }}>
          <div style={{ fontSize: 26 }}>🎯</div>
          <div>
            <div style={{ color: D.ink, fontWeight: 600, fontSize: 14.5 }}>{doneCount} of {totalUnits} units completed · {pct}%</div>
            <div style={{ color: D.inkSoft, fontSize: 13 }}>
              {doneCount === 0 ? 'Your climb starts with one click. Pick a foothold below.'
                : pct === 100 ? 'Summit reached. The Crucibles still burn, if you dare. 🔥'
                : 'Keep climbing — your next foothold is marked below.'}
            </div>
          </div>
        </div>

        {/* ── Certificate banner ──
            Shows the path to the certificate: for guests, a nudge to sign in
            (the certificate is issued from server progress, so it needs an
            account); for signed-in learners, either a live progress line
            (Crucibles + feedback) or, once eligible, the download button.
            certStatus comes from App.jsx (certificateStatus over completedUnits);
            the Certificate view itself re-checks against the Sheet before issuing. */}
        {certStatus && (
          <div style={{
            background: certStatus.eligible ? 'rgba(231,161,62,0.12)' : D.surface,
            border: `1px solid ${certStatus.eligible ? D.amber : D.border}`,
            borderRadius: 12, padding: '16px 20px', marginBottom: 26,
            display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: 26 }}>🎓</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ color: D.ink, fontWeight: 700, fontSize: 15 }}>Course Certificate</div>
              {isGuest ? (
                <div style={{ color: D.inkSoft, fontSize: 13, marginTop: 2 }}>
                  Sign in to earn a verifiable certificate — it’s issued from your saved progress.
                </div>
              ) : certStatus.eligible ? (
                <div style={{ color: D.inkSoft, fontSize: 13, marginTop: 2 }}>
                  Unlocked! All {certStatus.cruciblesTotal} Crucibles cleared and feedback submitted. 🔥
                </div>
              ) : (
                <div style={{ color: D.inkSoft, fontSize: 13, marginTop: 2 }}>
                  🔥 Crucibles {certStatus.cruciblesDone}/{certStatus.cruciblesTotal} · 📝 Feedback {certStatus.feedbackDone ? '✓' : 'pending'} — finish both to unlock.
                </div>
              )}
            </div>
            {isGuest ? (
              <button onClick={onRequestLogin} style={{ background: 'transparent', border: `1px solid ${D.border}`, color: D.ink, borderRadius: 8, padding: '9px 16px', fontSize: 13.5, cursor: 'pointer', fontFamily: FONT }}>
                Sign in
              </button>
            ) : (
              <button onClick={onOpenCertificate} disabled={!certStatus.eligible} style={{
                background: certStatus.eligible ? D.amber : D.border,
                color: certStatus.eligible ? '#111A2E' : D.inkMuted,
                border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13.5, fontWeight: 700,
                cursor: certStatus.eligible ? 'pointer' : 'not-allowed', fontFamily: FONT,
              }}>
                {certStatus.eligible ? '⬇ Get certificate' : 'Locked'}
              </button>
            )}
          </div>
        )}

        {/* ── Lab certificate banner (SEPARATE from the course certificate) ──
            Only for the MED23CL202 Python Lab track. Blue-accented to set it apart
            from the amber course certificate above. For guests: a sign-in nudge
            (it's issued from server progress). For signed-in learners: a live line
            (track + crucibles cleared) or, once eligible, the download button.
            labCertStatus comes from App.jsx (labCertificateStatus over completedUnits);
            LabCertificate re-checks against the Sheet before issuing. */}
        {labCertStatus && (
          <div style={{
            background: labCertStatus.eligible ? 'rgba(88,166,255,0.12)' : D.surface,
            border: `1px solid ${labCertStatus.eligible ? D.blue : D.border}`,
            borderRadius: 12, padding: '16px 20px', marginBottom: 26,
            display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: 26 }}>🧪</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ color: D.ink, fontWeight: 700, fontSize: 15 }}>Python Lab Certificate · MED23CL202</div>
              {isGuest ? (
                <div style={{ color: D.inkSoft, fontSize: 13, marginTop: 2 }}>
                  Sign in with your roll number to earn the lab certificate — it’s issued from your saved lab record.
                </div>
              ) : labCertStatus.eligible ? (
                <div style={{ color: D.inkSoft, fontSize: 13, marginTop: 2 }}>
                  Unlocked! Your {labCertStatus.trackName} track is complete across all {labCertStatus.cruciblesTotal} lab crucibles. 🧪
                </div>
              ) : (
                <div style={{ color: D.inkSoft, fontSize: 13, marginTop: 2 }}>
                  🔥 Lab crucibles on your track {labCertStatus.cruciblesDone}/{labCertStatus.cruciblesTotal}
                  {labCertStatus.trackName ? ` · ${labCertStatus.trackName}` : ''} — finish your track in all five to unlock.
                </div>
              )}
            </div>
            {isGuest ? (
              <button onClick={onRequestLogin} style={{ background: 'transparent', border: `1px solid ${D.border}`, color: D.ink, borderRadius: 8, padding: '9px 16px', fontSize: 13.5, cursor: 'pointer', fontFamily: FONT }}>
                Sign in
              </button>
            ) : (
              <button onClick={onOpenLabCertificate} disabled={!labCertStatus.eligible} style={{
                background: labCertStatus.eligible ? D.blue : D.border,
                color: labCertStatus.eligible ? '#071018' : D.inkMuted,
                border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13.5, fontWeight: 700,
                cursor: labCertStatus.eligible ? 'pointer' : 'not-allowed', fontFamily: FONT,
              }}>
                {labCertStatus.eligible ? '⬇ Get lab certificate' : 'Locked'}
              </button>
            )}
          </div>
        )}

        {/* ── The accordion ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {COURSE_CONFIG.modules.map((mod, mIdx) => {
            const accent = MODULE_COLORS[mIdx % MODULE_COLORS.length];
            const required = mod.units.filter(u => !u.optional);
            const modDone = required.filter(u => doneSet.has(u.unitId)).length;
            const modComplete = required.length > 0 && modDone === required.length;
            const isOpen = openModules.has(mod.moduleId);
            const isNextModule = mod.moduleId === nextModuleId;

            return (
              <div key={mod.moduleId} className={`fh-mod ${isOpen ? 'fh-open' : ''}`}
                style={{
                  background: D.surface,
                  border: `1px solid ${isOpen ? accent + '88' : D.border}`,
                  borderRadius: 12, overflow: 'hidden',
                  boxShadow: isOpen ? '0 2px 12px rgba(0,0,0,0.35)' : 'none',
                }}>

                {/* Module header row: click anywhere to expand/collapse */}
                <div className="fh-mod-head" onClick={() => toggleModule(mod.moduleId)}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px' }}>
                  <span className="fh-chev">▶</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ color: accent, fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', fontWeight: 700 }}>
                        {mod.moduleId.replace('M', 'MODULE ')}
                      </span>
                      <span style={{ color: D.ink, fontSize: 15.5, fontWeight: 700 }}>{mod.moduleTitle}</span>
                      {isNextModule && !modComplete && (
                        <span style={{ color: D.amber, fontFamily: MONO, fontSize: 10, border: `1px solid ${D.amber}`, background: FIRE_BG, borderRadius: 999, padding: '2px 8px' }}>
                          CONTINUE HERE
                        </span>
                      )}
                    </div>
                    {/* The module's hook line — the reason to click */}
                    <div style={{ color: D.inkSoft, fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>{mod.blurb}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ color: modComplete ? D.green : D.inkSoft, fontFamily: MONO, fontSize: 12 }}>
                      {modComplete ? '✓ done' : `${modDone}/${required.length}`}
                    </div>
                  </div>
                </div>

                {/* Unit links (animated expand via grid-rows trick) */}
                <div className="fh-units">
                  <div className="fh-units-inner">
                    <div style={{ borderTop: `1px solid ${D.border}`, padding: '6px 0' }}>
                      {mod.units.map(unit => {
                        const done = doneSet.has(unit.unitId);
                        const isBonus = !!unit.optional;
                        const isNext = unit.unitId === nextUnitId;
                        return (
                          <div key={unit.unitId} className="fh-unit"
                            onClick={() => selectUnit(unit.unitId, mod.moduleId)}
                            style={{
                              display: 'flex', alignItems: 'flex-start', gap: 12,
                              padding: '10px 18px 10px 46px',
                              background: isBonus ? FIRE_BG : 'transparent',
                              borderLeftColor: isNext ? D.amber : 'transparent',
                            }}>
                            <span style={{ fontSize: 15, lineHeight: '20px', flexShrink: 0 }}>
                              {done ? '✅' : isBonus ? '🔥' : '▶️'}
                            </span>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                                <span style={{ color: isBonus ? D.amber : done ? D.green : D.ink, fontSize: 14, fontWeight: 600 }}>
                                  {unit.title}
                                </span>
                                <span style={{ color: isBonus ? D.bronze : D.inkMuted, fontFamily: MONO, fontSize: 10.5 }}>
                                  {isBonus ? 'BONUS · CHALLENGE' : unit.unitId.replace('Unit', '').replace('_', '.')}
                                </span>
                                {isNext && (
                                  <span style={{ color: '#111A2E', background: D.amber, fontFamily: MONO, fontSize: 10, fontWeight: 700, borderRadius: 999, padding: '2px 8px' }}>
                                    START HERE →
                                  </span>
                                )}
                              </div>
                              {/* The unit's hook line — two seconds of temptation */}
                              {unit.blurb && (
                                <div style={{ color: D.inkSoft, fontSize: 12.5, marginTop: 2, lineHeight: 1.5 }}>{unit.blurb}</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
