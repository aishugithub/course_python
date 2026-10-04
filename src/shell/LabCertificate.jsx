import { useState, useEffect } from 'react';
import { DARK as D, FONT } from './brand.js';
import { getProgress } from './api.js';
import { labCertificateStatus } from './labCompletion.js';
import COURSE_CONFIG from '../../config/course.config.js';

// ─────────────────────────────────────────────────────────────────────────────
// LabCertificate — the earned, verifiable proof of finishing the MED23CL202
// Python Programming Laboratory mini-project. SEPARATE from the generic
// course Certificate.jsx (which gates on the ten course Crucibles); this one
// gates on the e-Lab Record: all ten experiments + all five mini-project crucibles (see labCompletion.js).
//
// How it fits in: App.jsx renders <LabCertificate/> when view === 'labCertificate'
// (reached from the Dashboard's lab-certificate banner). Eligibility is read from
// the GOOGLE SHEET, not local state: on open we re-fetch the signed-in learner's
// progress from the server and only issue the certificate if the sheet itself
// confirms all ten experiments and all five mini-project crucibles are done. That server
// check is what makes the certificate trustworthy — local/guest progress can't
// mint one. No Code.gs change is needed: it reads the existing Progress rows.
//
// The card is the light "campus" brand look (cream + navy + amber). Download needs
// zero libraries: a print stylesheet isolates the card and window.print() lets the
// learner Save as PDF (A4 portrait). It shows the month and year (CERT_MONTH), no exact date.
// ─────────────────────────────────────────────────────────────────────────────

// The card follows the cover page of the MED23CL202 lab manual: the university
// logo, centred plain type, no Foothold branding. Its own palette and font so it
// prints like the manual, independent of the app's dark theme.
const CERT = {
  ink: '#1F1F1F',
  soft: '#4A4A4A',
  blue: '#1B5E93',   // the logo's blue, for the frame
  font: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};
const LOGO_SRC = `${import.meta.env.BASE_URL}brand/sriher-logo.png`;
// Faculty signature: drop a scanned signature (transparent PNG) at
// public/brand/signature.png and it appears above the signature line;
// until then the line is left blank.
const SIGNATURE_SRC = `${import.meta.env.BASE_URL}brand/signature.png`;
// Month and year printed on every certificate of this batch.
const CERT_MONTH = 'October 2026';

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
        Sign in, then finish all ten experiments, all five mini-project crucibles and the feedback to earn it.
      </Notice>
    );
  }

  // Signed in, but the sheet says the track isn't complete yet — spell out what's left.
  // No certificate available (participation is also off until the teacher opens it).
  if (!status?.certificate) {
    return (
      <Notice onBack={onBack}>
        You’re almost there. The server shows:
        <div style={{ marginTop: 14, display: 'inline-block', textAlign: 'left', color: D.ink }}>
          <div>🧪 Experiments completed: <b style={{ color: D.amber }}>{status.experimentsDone}/{status.experimentsTotal}</b></div>
          <div style={{ marginTop: 6 }}>🔥 Mini-project crucibles completed: <b style={{ color: D.amber }}>{status.cruciblesDone}/{status.cruciblesTotal}</b></div>
          <div style={{ marginTop: 6 }}>📝 Feedback: <b style={{ color: D.amber }}>{status.feedbackDone ? 'submitted' : 'pending'}</b></div>
          {status.missing.length > 0 && (
            <div style={{ marginTop: 10, color: D.inkSoft, fontSize: 13.5 }}>
              Still to do: {status.missing.join(' · ')}
            </div>
          )}
        </div>
        <div style={{ marginTop: 14, color: D.inkSoft }}>
          Finish every experiment, every mini-project crucible (any track) and the feedback
          (Finish Line), and your certificate unlocks automatically.
        </div>
      </Notice>
    );
  }

  // Show the certificate (month + year only, no ID).
  const isParticipation = status.certificate === 'participation';
  const canDownload = name.trim().length > 0;

  return (
    <div style={{ minHeight: '100vh', background: D.bgDeep, fontFamily: FONT, padding: '28px 16px 60px' }}>
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
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
        <div className="cert-card" style={{ maxWidth: 760, margin: '0 auto', background: '#FFFFFF', color: CERT.ink, fontFamily: CERT.font, borderRadius: 4, boxShadow: '0 10px 40px rgba(0,0,0,0.45)', padding: 'clamp(14px, 3vw, 22px)', textAlign: 'center', boxSizing: 'border-box' }}>
          <div style={{ border: `2px solid ${CERT.blue}`, outline: `1px solid ${CERT.blue}`, outlineOffset: 4, padding: 'clamp(22px, 5vw, 48px) clamp(16px, 5vw, 48px)' }}>
            <img src={LOGO_SRC} alt="Sri Ramachandra Institute of Higher Education and Research — Sri Ramachandra Faculty of Engineering and Technology" style={{ width: '100%', maxWidth: 520, height: 'auto', display: 'block', margin: '0 auto' }} />

            <div style={{ fontSize: 'clamp(20px, 4.2vw, 30px)', fontWeight: 700, letterSpacing: '0.01em', marginTop: 'clamp(26px, 5vw, 44px)' }}>PYTHON PROGRAMMING LABORATORY</div>
            <div style={{ fontSize: 15, color: CERT.soft, marginTop: 10 }}>MED23CL202 · Semester III</div>

            <div style={{ fontSize: 'clamp(18px, 3.4vw, 24px)', fontWeight: 700, marginTop: 'clamp(22px, 4vw, 34px)' }}>
              {isParticipation ? 'CERTIFICATE OF PARTICIPATION' : 'CERTIFICATE OF COMPLETION'}
            </div>
            <div style={{ fontSize: 15, fontStyle: 'italic', color: CERT.soft, marginTop: 6 }}>e-Lab Record</div>

            <div style={{ fontSize: 15, fontStyle: 'italic', color: CERT.soft, marginTop: 'clamp(22px, 4vw, 32px)' }}>This is to certify that</div>
            <div style={{ fontSize: 'clamp(22px, 4.6vw, 32px)', fontWeight: 700, marginTop: 8 }}>{name.trim() || 'Your Name'}</div>
            <div style={{ fontSize: 15, marginTop: 8 }}>Register number : <b>{student.rollNo}</b></div>

            <div style={{ fontSize: 15.5, lineHeight: 1.7, marginTop: 18, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              {isParticipation ? (
                <>
                  has completed <b>{status.experimentsDone} of the ten experiments</b> and <b>{status.cruciblesDone} of the
                  five mini projects</b> of the e-Lab Record, as per the requirements of the
                  <b> Python Programming Laboratory (MED23CL202)</b>, for the
                </>
              ) : (
                <>
                  has successfully completed all <b>ten experiments</b> and the <b>final mini project</b>, as per
                  the requirements of the <b>Python Programming Laboratory (MED23CL202)</b>, for the
                </>
              )}
            </div>

            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 14 }}>BACHELOR OF TECHNOLOGY</div>
            <div style={{ fontSize: 15, fontStyle: 'italic', marginTop: 4 }}>in</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>COMPUTER SCIENCE AND MEDICAL ENGINEERING</div>
            <div style={{ fontSize: 15, marginTop: 4 }}>(Artificial Intelligence and Data Analytics)</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 16 }}>ACADEMIC YEAR 2026 – 27</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 18, marginTop: 'clamp(30px, 6vw, 52px)', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'left', fontSize: 15 }}>
                Date : <b>{CERT_MONTH}</b>
              </div>
              <div style={{ textAlign: 'center', minWidth: 200 }}>
                <div style={{ height: 56, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <img src={SIGNATURE_SRC} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    style={{ maxHeight: 56, maxWidth: 200, objectFit: 'contain' }} />
                </div>
                <div style={{ marginTop: 4, fontSize: 15, fontWeight: 700 }}>Aishwarya S</div>
                <div style={{ fontSize: 13.5, color: CERT.soft, marginTop: 2 }}>Faculty in-charge</div>
              </div>
            </div>
          </div>
        </div>

        <div className="no-print" style={{ maxWidth: 960, margin: '14px auto 0', color: D.inkMuted, fontSize: 12, textAlign: 'center' }}>
          Tip: in the print dialog choose “Save as PDF”, layout <b>Portrait</b>, and turn on “Background graphics”.
        </div>
      </div>
    </div>
  );
}
