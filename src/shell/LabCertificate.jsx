import { useState, useEffect } from 'react';
import { BRAND as B, DARK as D, FONT, MONO } from './brand.js';
import { getProgress } from './api.js';
import { labCertificateStatus } from './labCompletion.js';
import COURSE_CONFIG from '../../config/course.config.js';

// ─────────────────────────────────────────────────────────────────────────────
// LabCertificate — the earned, verifiable proof of finishing the MED23CL202
// Python Programming Laboratory mini-project. SEPARATE from the generic
// course Certificate.jsx (which gates on the ten course Crucibles); this one
// gates on the lab track across the five lab crucibles (see labCompletion.js).
//
// How it fits in: App.jsx renders <LabCertificate/> when view === 'labCertificate'
// (reached from the Dashboard's lab-certificate banner). Eligibility is read from
// the GOOGLE SHEET, not local state: on open we re-fetch the signed-in learner's
// progress from the server and only issue the certificate if the sheet itself
// confirms their chosen track is complete in all five lab crucibles. That server
// check is what makes the certificate trustworthy — local/guest progress can't
// mint one. No Code.gs change is needed: it reads the existing Progress rows.
//
// The card is the light "campus" brand look (cream + navy + amber). Download needs
// zero libraries: a print stylesheet isolates the card and window.print() lets the
// learner Save as PDF (A4 landscape). There is NO date or time anywhere on it.
// ─────────────────────────────────────────────────────────────────────────────

// Deterministic id from the roll number + track, so the same student always gets
// the same id and the professor can spot-check one. Carries no time information.
function labCertId(rollNo, trackLetter) {
  const seed = `${rollNo}|${trackLetter}|MED23CL202`;
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hex = h.toString(16).toUpperCase().padStart(8, '0');
  return `LAB-${hex.slice(0, 4)}-${hex.slice(4, 8)}`;
}

function FootholdMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ display: 'block' }}>
      <rect x="8" y="60" width="26" height="26" rx="7" fill={B.navy} />
      <rect x="37" y="37" width="26" height="26" rx="7" fill={B.navy} />
      <rect x="66" y="14" width="26" height="26" rx="7" fill={B.amber} />
    </svg>
  );
}

// A small dark-framed message card for the not-yet-eligible / guest / loading states.
function Notice({ children, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: D.bgDeep, fontFamily: FONT, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: 24, textAlign: 'center' }}>
      <div style={{ maxWidth: 480, color: D.inkSoft, fontSize: 15, lineHeight: 1.7 }}>{children}</div>
      {onBack && (
        <button onClick={onBack} style={{ background: D.amber, border: 'none', color: '#111A2E', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>
          ← Back to Dashboard
        </button>
      )}
    </div>
  );
}

export default function LabCertificate({ student, onBack }) {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'guest' | 'ready'
  const [status, setStatus] = useState(null);      // labCertificateStatus() from SERVER progress
  const [name, setName] = useState(student?.name || '');

  // Verify against the sheet on open. Guests can't be verified (their progress
  // never reaches the server), so they're told to sign in.
  useEffect(() => {
    let alive = true;
    if (!student) { setPhase('guest'); return; }
    (async () => {
      const serverUnits = await getProgress(student.rollNo, COURSE_CONFIG.courseId);
      if (!alive) return;
      setStatus(labCertificateStatus(serverUnits));
      setPhase('ready');
    })();
    return () => { alive = false; };
  }, [student]);

  if (phase === 'loading') return <Notice>Verifying your lab record with the server…</Notice>;

  if (phase === 'guest') {
    return (
      <Notice onBack={onBack}>
        🔒 The lab certificate is issued from your saved progress on the server, so it’s only
        available when you’re <b style={{ color: D.amber }}>signed in</b> with your roll number.
        Sign in and finish your track in all five lab crucibles to earn it.
      </Notice>
    );
  }

  // Signed in, but the sheet says the track isn't complete yet — spell out what's left.
  if (!status?.eligible) {
    return (
      <Notice onBack={onBack}>
        You’re almost there. The server shows:
        <div style={{ marginTop: 14, display: 'inline-block', textAlign: 'left', color: D.ink }}>
          <div>{status.trackName ? '🧪' : '🔎'} Mini-project track: <b style={{ color: D.amber }}>{status.trackName || 'not detected yet'}</b></div>
          <div style={{ marginTop: 6 }}>🔥 Crucibles cleared on your track: <b style={{ color: D.amber }}>{status.cruciblesDone}/{status.cruciblesTotal}</b></div>
        </div>
        <div style={{ marginTop: 14, color: D.inkSoft }}>
          Finish your chosen track in all five lab crucibles (Exp 1&2, 3&4, 5&6, 7&8, 9&10) and your
          certificate unlocks automatically.
        </div>
      </Notice>
    );
  }

  // Eligible — show the certificate. No date/time anywhere.
  const id = labCertId(student.rollNo, status.trackLetter);
  const canDownload = name.trim().length > 0;

  return (
    <div style={{ minHeight: '100vh', background: D.bgDeep, fontFamily: FONT, padding: '28px 16px 60px' }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          html, body { background: #ffffff !important; }
          .no-print { display: none !important; }
          .cert-frame { background: #ffffff !important; padding: 0 !important; min-height: 0 !important; }
          .cert-card { box-shadow: none !important; margin: 0 !important; width: 100% !important; max-width: none !important; }
        }
      `}</style>

      <div className="cert-frame">
        {/* ── Controls (never printed) ── */}
        <div className="no-print" style={{ maxWidth: 960, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${D.border}`, color: D.ink, borderRadius: 8, padding: '8px 14px', fontSize: 14, cursor: 'pointer', fontFamily: FONT }}>
            ← Back to Dashboard
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <label style={{ color: D.inkSoft, fontSize: 13 }}>Name on certificate:</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name"
              style={{ background: D.surface, border: `1px solid ${D.border}`, color: D.ink, borderRadius: 8, padding: '8px 12px', fontSize: 14, fontFamily: FONT, minWidth: 220 }} />
            <button onClick={() => window.print()} disabled={!canDownload}
              style={{ background: canDownload ? D.amber : D.border, color: canDownload ? '#111A2E' : D.inkMuted, border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 14, fontWeight: 700, cursor: canDownload ? 'pointer' : 'not-allowed', fontFamily: FONT }}>
              ⬇ Download / Print
            </button>
          </div>
        </div>

        {/* ── The certificate card (the only thing that prints) ── */}
        <div className="cert-card" style={{ maxWidth: 960, margin: '0 auto', background: B.cream, color: B.navy, border: `1px solid ${B.border}`, borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.45)', padding: 'clamp(28px, 5vw, 56px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 10, background: `linear-gradient(180deg, ${B.navy}, ${B.amber})` }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <FootholdMark />
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em' }}>Foothold</div>
              <div style={{ color: B.bronze, fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em' }}>PYTHON PROGRAMMING LABORATORY</div>
            </div>
          </div>

          <div style={{ color: B.bronze, fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.2em', marginTop: 22 }}>CERTIFICATE OF LABORATORY COMPLETION</div>

          <div style={{ color: B.slate, fontSize: 15, marginTop: 18 }}>This certifies that</div>
          <div style={{ fontSize: 'clamp(28px, 5.4vw, 42px)', fontWeight: 700, lineHeight: 1.15, margin: '6px 0 4px', borderBottom: `2px solid ${B.amber}`, display: 'inline-block', paddingBottom: 6 }}>
            {name.trim() || 'Your Name'}
          </div>

          <div style={{ color: B.slate, fontSize: 15.5, lineHeight: 1.7, marginTop: 18, maxWidth: 700 }}>
            has completed all <b style={{ color: B.navy }}>five Mini-Project Crucibles</b> of the Python
            Programming Laboratory on the <b style={{ color: B.navy }}>{status.trackName}</b> track —
            forging every experiment, from data types and classes to files, exceptions and data analysis,
            into one working application.
          </div>

          {/* Registration number · Track — the two identity facts, no time anywhere */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', marginTop: 24 }}>
            <div>
              <div style={{ color: B.bronze, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.12em' }}>REGISTRATION NUMBER</div>
              <div style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, marginTop: 2 }}>{student.rollNo}</div>
            </div>
            <div>
              <div style={{ color: B.bronze, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.12em' }}>MINI-PROJECT TRACK</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{status.trackName}</div>
            </div>
          </div>

          {/* Course identity block — exact wording from the MED23CL202 syllabus */}
          <div style={{ marginTop: 22, padding: '12px 16px', background: B.creamDeep, border: `1px solid ${B.border}`, borderRadius: 10, display: 'inline-block' }}>
            <div style={{ fontSize: 14.5, fontWeight: 700 }}>MED23CL202 · Python Programming Laboratory</div>
            <div style={{ color: B.slate, fontSize: 13, marginTop: 2 }}>1 Credit · B.Tech (Medical Engineering) · Semester III</div>
          </div>

          <div style={{ fontStyle: 'italic', color: B.bronze, fontSize: 14, marginTop: 18 }}>“Get your footing. Keep climbing.”</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 18, marginTop: 28, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Aishwarya S.</div>
              <div style={{ color: B.slate, fontSize: 12.5, marginTop: 2, maxWidth: 360 }}>Course faculty · Sri Ramachandra Faculty of Engineering and Technology</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: B.bronze, fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.12em' }}>CERTIFICATE ID</div>
              <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700 }}>{id}</div>
            </div>
          </div>
        </div>

        <div className="no-print" style={{ maxWidth: 960, margin: '14px auto 0', color: D.inkMuted, fontSize: 12, textAlign: 'center' }}>
          Tip: in the print dialog choose “Save as PDF”, layout <b>Landscape</b>, and turn on “Background graphics”.
        </div>
      </div>
    </div>
  );
}
