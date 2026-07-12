import { useState } from 'react';
import COURSE_CONFIG from '../../config/course.config.js';
import { BRAND as B, FONT, MONO } from './brand.js';

// ─────────────────────────────────────────────────────────────────────────────
// Foothold Dashboard — ACCORDION EDITION, cream brand
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
// All colors/fonts come from ./brand.js — the single brand source. Lessons
// themselves stay dark (focus mode); the dashboard is the cream campus.
// ─────────────────────────────────────────────────────────────────────────────

// Module accent rotation: brand tones only (calm, lets the amber hooks pop).
const MODULE_COLORS = [B.navy, B.amber, B.bronze];
const FIRE_BG = '#F7EDDC'; // warm amber-tinted cream behind Crucible rows

// Brand mark: three climbing steps, standard colorway for light backgrounds.
function FootholdMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <rect x="8" y="60" width="26" height="26" rx="7" fill={B.navy} />
      <rect x="37" y="37" width="26" height="26" rx="7" fill={B.navy} />
      <rect x="66" y="14" width="26" height="26" rx="7" fill={B.amber} />
    </svg>
  );
}

export default function Dashboard({ student, completedUnits, onSelectUnit, onRequestLogin, onSignOff }) {
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

  // Accordion state: a Set of open moduleIds. Starts with only the next-up
  // module open (or the first module for a brand-new / fully-done learner).
  const [openModules, setOpenModules] = useState(
    () => new Set([nextModuleId || COURSE_CONFIG.modules[0].moduleId])
  );
  function toggleModule(moduleId) {
    setOpenModules(prev => {
      const next = new Set(prev);
      next.has(moduleId) ? next.delete(moduleId) : next.add(moduleId);
      return next;
    });
  }

  return (
    <div style={{ minHeight: '100vh', background: B.cream, fontFamily: FONT }}>

      {/* Hover/expand styling lives in real CSS (inline styles can't do
          :hover or transitions on grid rows). Class names are local. */}
      <style>{`
        .fh-mod { transition: border-color 0.2s, box-shadow 0.2s; }
        .fh-mod-head { cursor: pointer; user-select: none; }
        .fh-mod-head:hover { background: ${B.creamDeep}; }
        .fh-chev { transition: transform 0.25s ease; color: ${B.mist}; font-size: 13px; }
        .fh-open .fh-chev { transform: rotate(90deg); }
        .fh-units { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; }
        .fh-open .fh-units { grid-template-rows: 1fr; }
        .fh-units-inner { overflow: hidden; }
        .fh-unit { cursor: pointer; border-left: 2px solid transparent;
                   transition: background 0.15s, border-color 0.15s, transform 0.15s; }
        .fh-unit:hover { background: ${B.creamDeep}; transform: translateX(4px); }
      `}</style>

      {/* ── Header: brand mark + wordmark left, guest/student box right ── */}
      <div style={{ background: B.card, borderBottom: `1px solid ${B.border}`, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <FootholdMark />
          <div>
            <div style={{ color: B.navy, fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em' }}>
              Foothold
              <span style={{ color: B.mist, fontWeight: 400, fontSize: 14 }}> · {COURSE_CONFIG.courseTitle}</span>
            </div>
            <div style={{ color: B.bronze, fontFamily: MONO, fontSize: 11.5 }}>Get your footing. Keep climbing.</div>
          </div>
        </div>
        {isGuest ? (
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: B.navy, fontWeight: 600, fontSize: 14 }}>👋 Browsing as Guest</div>
            <button onClick={onRequestLogin} style={{ marginTop: 4, background: 'transparent', border: `1px solid ${B.navy}`, color: B.navy, borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', fontFamily: FONT }}>
              Sign in to save progress
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: B.navy, fontWeight: 600 }}>{student.name}</div>
            <div style={{ color: B.mist, fontSize: 12, fontFamily: MONO }}>{student.rollNo}</div>
            <button onClick={onSignOff} style={{ marginTop: 4, background: 'transparent', border: `1px solid ${B.border}`, color: B.slate, borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', fontFamily: FONT }}>
              Sign Off
            </button>
          </div>
        )}
      </div>

      {/* ── Course progress bar (navy → amber: the climb) ── */}
      <div style={{ height: 4, background: B.border }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${B.navy}, ${B.amber})`, transition: 'width 0.6s' }} />
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 20px 60px' }}>

        {/* ── The hook: why this course is different ── */}
        <div style={{ padding: '4px 4px 20px' }}>
          <div style={{ color: B.navy, fontSize: 'clamp(19px, 4.5vw, 24px)', fontWeight: 700, lineHeight: 1.35, letterSpacing: '-0.01em' }}>
            {COURSE_CONFIG.hook?.line1}
          </div>
          <div style={{ color: B.slate, fontSize: 14.5, marginTop: 6 }}>
            {COURSE_CONFIG.hook?.line2}
          </div>
        </div>

        {/* ── Progress summary ── */}
        <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 18, marginBottom: 26 }}>
          <div style={{ fontSize: 26 }}>🎯</div>
          <div>
            <div style={{ color: B.navy, fontWeight: 600, fontSize: 14.5 }}>{doneCount} of {totalUnits} units completed · {pct}%</div>
            <div style={{ color: B.slate, fontSize: 13 }}>
              {doneCount === 0 ? 'Your climb starts with one click. Pick a foothold below.'
                : pct === 100 ? 'Summit reached. The Crucibles still burn, if you dare. 🔥'
                : 'Keep climbing — your next foothold is marked below.'}
            </div>
          </div>
        </div>

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
                  background: B.card,
                  border: `1px solid ${isOpen ? accent + '88' : B.border}`,
                  borderRadius: 12, overflow: 'hidden',
                  boxShadow: isOpen ? '0 2px 10px rgba(22,41,74,0.07)' : 'none',
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
                      <span style={{ color: B.navy, fontSize: 15.5, fontWeight: 700 }}>{mod.moduleTitle}</span>
                      {isNextModule && !modComplete && (
                        <span style={{ color: B.codeBrown, fontFamily: MONO, fontSize: 10, border: `1px solid ${B.amber}`, background: FIRE_BG, borderRadius: 999, padding: '2px 8px' }}>
                          CONTINUE HERE
                        </span>
                      )}
                    </div>
                    {/* The module's hook line — the reason to click */}
                    <div style={{ color: B.slate, fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>{mod.blurb}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ color: modComplete ? B.green : B.slate, fontFamily: MONO, fontSize: 12 }}>
                      {modComplete ? '✓ done' : `${modDone}/${required.length}`}
                    </div>
                  </div>
                </div>

                {/* Unit links (animated expand via grid-rows trick) */}
                <div className="fh-units">
                  <div className="fh-units-inner">
                    <div style={{ borderTop: `1px solid ${B.border}`, padding: '6px 0' }}>
                      {mod.units.map(unit => {
                        const done = doneSet.has(unit.unitId);
                        const isBonus = !!unit.optional;
                        const isNext = unit.unitId === nextUnitId;
                        return (
                          <div key={unit.unitId} className="fh-unit"
                            onClick={() => onSelectUnit(unit.unitId)}
                            style={{
                              display: 'flex', alignItems: 'flex-start', gap: 12,
                              padding: '10px 18px 10px 46px',
                              background: isBonus ? FIRE_BG : 'transparent',
                              borderLeftColor: isNext ? B.amber : 'transparent',
                            }}>
                            <span style={{ fontSize: 15, lineHeight: '20px', flexShrink: 0 }}>
                              {done ? '✅' : isBonus ? '🔥' : '▶️'}
                            </span>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                                <span style={{ color: isBonus ? B.codeBrown : done ? B.green : B.navy, fontSize: 14, fontWeight: 600 }}>
                                  {unit.title}
                                </span>
                                <span style={{ color: isBonus ? B.bronze : B.mist, fontFamily: MONO, fontSize: 10.5 }}>
                                  {isBonus ? 'BONUS · CHALLENGE' : unit.unitId.replace('Unit', '').replace('_', '.')}
                                </span>
                                {isNext && (
                                  <span style={{ color: '#FFFFFF', background: B.navy, fontFamily: MONO, fontSize: 10, fontWeight: 700, borderRadius: 999, padding: '2px 8px' }}>
                                    START HERE →
                                  </span>
                                )}
                              </div>
                              {/* The unit's hook line — two seconds of temptation */}
                              {unit.blurb && (
                                <div style={{ color: B.slate, fontSize: 12.5, marginTop: 2, lineHeight: 1.5 }}>{unit.blurb}</div>
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
