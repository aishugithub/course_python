import COURSE_CONFIG from '../../config/course.config.js';
import { LIGHT as D, FONT, MONO } from './brand.js';

// ─────────────────────────────────────────────────────────────────────────────
// Foothold Landing page — DARK BRAND EDITION
//
// How this fits in the app: App.jsx renders <Landing/> as the very first view
// (view === 'landing'). The two callbacks are the only wiring to the rest of
// the app: onExploreGuest → guest Dashboard, onGoToLogin → Login screen.
//
// All colours/fonts come from ./brand.js — the DARK token block is the single
// source shared with the Dashboard, chosen to match the lessons' dark canvas so
// the whole app feels like one place. Amber stays the hero accent (on-brand);
// the greys are the same the lessons use. Fonts are loaded once in index.html.
// ─────────────────────────────────────────────────────────────────────────────

// ── Brand mark: the three climbing steps. On the dark canvas the two lower
//    steps go light (inkSoft) so they read against the background, and the top
//    step keeps the brand amber — the summit is always the accent. ──
function FootholdMark({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }} aria-hidden="true">
      <rect x="8" y="60" width="26" height="26" rx="7" fill={D.ink} />
      <rect x="37" y="37" width="26" height="26" rx="7" fill={D.ink} />
      <rect x="66" y="14" width="26" height="26" rx="7" fill={D.amber} />
    </svg>
  );
}

// ── Small reusable pieces so every section stays visually consistent ──

// Kicker: the tiny uppercase Space Mono label the brand sheet uses above headings.
function Kicker({ children }) {
  return (
    <div style={{
      fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em',
      textTransform: 'uppercase', color: D.bronze, marginBottom: 8,
    }}>
      {children}
    </div>
  );
}

// Dark rounded card: a raised surface with a hairline border, the dark-theme
// analogue of the old white brand card.
function Card({ children, style }) {
  return (
    <div style={{
      background: D.surface, border: `1px solid ${D.border}`, borderRadius: 16,
      padding: '26px 30px', ...style,
    }}>
      {children}
    </div>
  );
}

export default function Landing({ onExploreGuest, onGoToLogin }) {
  const totalUnits = COURSE_CONFIG.modules.filter(m => !m.hidden).reduce((acc, m) => acc + m.units.length, 0);

  // Shared button styles. On dark, the solid AMBER button is the loudest thing
  // on the page, so it becomes the primary action (the "fire"); the outlined
  // light button is the quieter secondary.
  const primaryBtn = {
    background: D.amber, color: '#111A2E', border: 'none', borderRadius: 12,
    padding: '14px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
    fontFamily: FONT,
  };
  const outlineBtn = {
    background: 'transparent', color: D.ink, border: `1.5px solid ${D.border}`,
    borderRadius: 12, padding: '14px 28px', fontSize: 16, fontWeight: 600,
    cursor: 'pointer', fontFamily: FONT,
  };

  return (
    <div style={{ minHeight: '100vh', background: D.bgDeep, fontFamily: FONT, color: D.ink }}>

      {/* ── Hero: mark, wordmark, motto, tagline, the two entry buttons ── */}
      <div style={{ padding: '64px 24px 48px', textAlign: 'center', maxWidth: 780, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <FootholdMark size={96} />
        </div>

        <Kicker>Free · Self-paced · No account needed</Kicker>

        {/* clamp() keeps the wordmark big on desktop but sane on a phone. */}
        <h1 style={{
          fontSize: 'clamp(40px, 9vw, 56px)', fontWeight: 700, margin: 0,
          letterSpacing: '-0.02em', color: D.ink,
        }}>
          Foothold
        </h1>
        <p style={{ color: D.amberSoft, fontFamily: MONO, fontSize: 'clamp(14px, 3.5vw, 17px)', fontWeight: 700, margin: '10px 0 0' }}>
          Get your footing. Keep climbing.
        </p>

        <p style={{ color: D.inkSoft, fontSize: 17, lineHeight: 1.65, margin: '22px auto 0', maxWidth: 580 }}>
          Have you got your foothold on Python yet? A free, self-paced course for absolute
          beginners — anywhere in the world. No prior coding experience, no cost, and no
          account required to start.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 34, flexWrap: 'wrap' }}>
          <button onClick={onExploreGuest} style={primaryBtn}>
            Explore the Dashboard →
          </button>
          <button onClick={onGoToLogin} style={outlineBtn}>
            Sign In / Register
          </button>
        </div>
        <p style={{ color: D.inkMuted, fontSize: 13, marginTop: 14 }}>
          Browsing is always free — signing in just lets you keep your progress across devices.
        </p>
      </div>

      {/* ── Code panel: a taste of the destination. A deep-navy terminal that
             sits a shade below the page, so it still reads as "a screen within
             a screen" on the dark canvas. ── */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px 52px' }}>
        <div style={{
          background: D.navyPanel, color: D.panelText, borderRadius: 14,
          border: `1px solid ${D.border}`,
          padding: '20px 24px', fontFamily: MONO, fontSize: 14, lineHeight: 1.8,
          overflowX: 'auto', textAlign: 'left',
        }}>
          <div><span style={{ color: D.amber }}>&gt;&gt;&gt;</span> print(<span style={{ color: D.amber }}>"Hello, climber."</span>)</div>
          <div>Hello, climber.</div>
          <div style={{ color: '#8A97AB' }}># {totalUnits}+ interactive lessons between you and the summit.</div>
        </div>
      </div>

      {/* ── Who it's for ── */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px 28px' }}>
        <Card>
          <Kicker>Who this is for</Kicker>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: D.ink }}>
            Never written a line of code? Perfect.
          </h2>
          <p style={{ color: D.inkSoft, fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
            Foothold is for anyone starting Python from the very beginning — students,
            career-switchers, curious minds, wherever you are. {totalUnits}+ interactive
            lessons, each built around a single idea: first you watch it work, then you
            type it, run it and fix it yourself — real Python, in your browser, checked
            the moment you press Run.
          </p>
        </Card>
      </div>

      {/* ── How you'll learn: the ZPD / scaffolding story, amber-accented since
             it is the heart of the course's identity ── */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px 28px' }}>
        <Card style={{ borderLeft: `4px solid ${D.amber}` }}>
          <Kicker>How you'll learn</Kicker>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: D.ink }}>
            One reachable step at a time
          </h2>
          <p style={{ color: D.inkSoft, fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
            Foothold is built on a well-studied idea from learning science: Lev Vygotsky's{' '}
            <strong style={{ color: D.ink }}>Zone of Proximal Development</strong>. We learn
            best not from what we already know, and not from what's far beyond us, but from
            the narrow band just past our current ability — reachable with the right support.
            That support is called <strong style={{ color: D.ink }}>scaffolding</strong>:
            temporary structure that holds you up while a skill is new, and is gradually
            removed as you build your own footing. Every lesson here follows that idea —
            a new concept arrives only once you have exactly what you need to understand it,
            with just enough support to carry you the rest of the way on your own.
          </p>
          {COURSE_CONFIG.edition === 'copy' ? (
          <p style={{
            color: D.inkSoft, fontSize: 14.5, lineHeight: 1.7, margin: '18px 0 0',
            paddingTop: 16, borderTop: `1px solid ${D.border}`,
          }}>
            <strong style={{ color: D.ink }}>About this site:</strong> this copy of the course is run
            by your teacher. Your sign-in and progress are kept in your teacher's own records and are
            not sent to anyone else.
          </p>
          ) : (
          <p style={{
            color: D.inkSoft, fontSize: 14.5, lineHeight: 1.7, margin: '18px 0 0',
            paddingTop: 16, borderTop: `1px solid ${D.border}`,
          }}>
            <strong style={{ color: D.ink }}>The research behind this course:</strong> I'm{' '}
            <strong style={{ color: D.ink }}>Aishwarya</strong>, an assistant professor of
            engineering who believes nobody learns to swim by watching. Foothold is my action
            research in education — a study of whether active learning through interactive
            content helps beginners learn programming better than reading or watching
            alone. That's why every single lesson here is something
            you <em>do</em>, not something you sit through. How learners move through the
            lessons (which ones are opened, finished or skipped) is recorded and studied to
            make the course better for the next learner; results are only ever reported
            for groups, never for a named person.
          </p>
          )}
        </Card>
      </div>

      {/* ── Learn your way + closing call to action ── */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px 64px' }}>
        <Card>
          <Kicker>Learn your way</Kicker>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: D.ink }}>
            Every module is open. Go at your own pace.
          </h2>
          <p style={{ color: D.inkSoft, fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
            Once you're in the Dashboard, click whichever module interests you, in any order.
            That said, since each unit builds on the ones before it, we{' '}
            <strong style={{ color: D.ink }}>recommend going step by step</strong> the first
            time through — it makes for the smoothest climb. Already know a topic? Skip ahead
            inside any lesson. Only the Crucibles — the ten challenges that earn your
            certificate — open one stage at a time.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <button onClick={onExploreGuest} style={{ ...primaryBtn, padding: '12px 24px', fontSize: 15 }}>
              Take me to the Dashboard →
            </button>
          </div>
        </Card>
      </div>

      {/* ── For teachers: run your own copy. Shown only when the registration
             form link is set in course.config.js (adoption.formUrl). ── */}
      {COURSE_CONFIG.adoption?.formUrl && (
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px 64px' }}>
          <Card style={{ borderLeft: `4px solid ${D.blue}` }}>
            <Kicker>For teachers</Kicker>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: D.ink }}>
              Teach with Foothold — on your own site, with your own students
            </h2>
            <p style={{ color: D.inkSoft, fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
              You can run your own copy of this course, free: your web address, your class
              list, your students' progress in your own Google Sheet. Hide the modules you
              don't need, add lessons of your own, and follow your class in a ready-made dashboard.
              Setting it up takes about 30 minutes and needs no programming: you just follow the steps.
            </p>
            <ul style={{ color: D.inkSoft, fontSize: 15, lineHeight: 1.8, margin: '14px 0 0', paddingLeft: 20 }}>
              <li><strong style={{ color: D.ink }}>1. Register</strong> with the short form below.</li>
              <li><strong style={{ color: D.ink }}>2. Check your inbox.</strong> The step-by-step guide is emailed to you within a few minutes.</li>
              <li><strong style={{ color: D.ink }}>3. Follow the guide</strong> — and write to us if you get stuck. We help you set it up.</li>
            </ul>
            <p style={{ color: D.inkMuted, fontSize: 13.5, lineHeight: 1.6, margin: '14px 0 0' }}>
              All we ask in return: keep the line “{COURSE_CONFIG.credit.text}” on your site.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 22 }}>
              <a href={COURSE_CONFIG.adoption.formUrl} target="_blank" rel="noopener noreferrer"
                style={{ ...outlineBtn, padding: '12px 24px', fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>
                Register as a teacher →
              </a>
            </div>
          </Card>
        </div>
      )}

      {/* ── Footer ── */}
      <div style={{ textAlign: 'center', color: D.inkMuted, fontSize: 12.5, paddingBottom: 44, fontFamily: MONO }}>
        Your progress is saved on this device automatically. Sign in anytime to keep it across devices.
        {/* Licence condition: a teacher's copy keeps this credit line, linked to the original. */}
        <div style={{ marginTop: 10 }}>
          <a href={COURSE_CONFIG.credit.url} target="_blank" rel="noopener noreferrer"
            style={{ color: D.inkMuted, textDecoration: 'underline' }}>
            {COURSE_CONFIG.credit.text}
          </a>
        </div>
      </div>
    </div>
  );
}
