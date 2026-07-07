import COURSE_CONFIG from '../../config/course.config.js';

// ─────────────────────────────────────────────────────────────────────────────
// Foothold Landing page — CREAM BRAND EDITION
//
// How this fits in the app: App.jsx renders <Landing/> as the very first view
// (view === 'landing'). The two callbacks are the only wiring to the rest of
// the app: onExploreGuest → guest Dashboard, onGoToLogin → Login screen.
//
// Design source: "Foothold python_branding/brand" (README.html, v1 handoff).
// This page deliberately uses the LIGHT brand palette (cream/navy/amber) so it
// feels like the course's front cover; the Dashboard and lessons inside keep
// their dark GitHub-style theme. Fonts (Space Grotesk / Space Mono) are loaded
// once in index.html.
// ─────────────────────────────────────────────────────────────────────────────

// Brand palette, straight from the handoff README.
const B = {
  cream: '#F1EEE6',    // page background
  card: '#FFFFFF',     // card surfaces
  creamDeep: '#EDE8DC',// inline-code chips
  border: '#E7E0D2',   // hairline borders
  navy: '#16294A',     // primary text, solid buttons, dark panel
  slate: '#40506A',    // secondary body text
  mist: '#8A97AB',     // muted small print
  amber: '#E7A13E',    // the accent step / highlights
  bronze: '#B08343',   // kicker (small uppercase mono) text
  codeBrown: '#B0651F',// code text on cream chips
  panelText: '#E7EAF0',// light text on the navy panel
};

const FONT = "'Space Grotesk', system-ui, sans-serif";
const MONO = "'Space Mono', monospace";

// ── Brand mark: the three climbing steps (navy, navy, amber), same geometry
//    as brand/svg/foothold-mark-color.svg, inlined so it needs no asset fetch
//    and can scale with the hero. ──
function FootholdMark({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }} aria-hidden="true">
      <rect x="8" y="60" width="26" height="26" rx="7" fill={B.navy} />
      <rect x="37" y="37" width="26" height="26" rx="7" fill={B.navy} />
      <rect x="66" y="14" width="26" height="26" rx="7" fill={B.amber} />
    </svg>
  );
}

// ── Small reusable pieces so every section stays visually consistent ──

// Kicker: the tiny uppercase Space Mono label the brand sheet uses above headings.
function Kicker({ children }) {
  return (
    <div style={{
      fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em',
      textTransform: 'uppercase', color: B.bronze, marginBottom: 8,
    }}>
      {children}
    </div>
  );
}

// White rounded card, brand-sheet style.
function Card({ children, style }) {
  return (
    <div style={{
      background: B.card, border: `1px solid ${B.border}`, borderRadius: 16,
      padding: '26px 30px', ...style,
    }}>
      {children}
    </div>
  );
}

export default function Landing({ onExploreGuest, onGoToLogin }) {
  const totalUnits = COURSE_CONFIG.modules.reduce((acc, m) => acc + m.units.length, 0);

  // Shared button styles: solid navy = primary action, outlined = secondary.
  const primaryBtn = {
    background: B.navy, color: '#fff', border: 'none', borderRadius: 12,
    padding: '14px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
    fontFamily: FONT,
  };
  const outlineBtn = {
    background: 'transparent', color: B.navy, border: `1.5px solid ${B.navy}`,
    borderRadius: 12, padding: '14px 28px', fontSize: 16, fontWeight: 600,
    cursor: 'pointer', fontFamily: FONT,
  };

  return (
    <div style={{ minHeight: '100vh', background: B.cream, fontFamily: FONT, color: B.navy }}>

      {/* ── Hero: mark, wordmark, motto, tagline, the two entry buttons ── */}
      <div style={{ padding: '64px 24px 48px', textAlign: 'center', maxWidth: 780, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <FootholdMark size={96} />
        </div>

        <Kicker>Free · Self-paced · No account needed</Kicker>

        {/* clamp() keeps the wordmark big on desktop but sane on a phone. */}
        <h1 style={{
          fontSize: 'clamp(40px, 9vw, 56px)', fontWeight: 700, margin: 0,
          letterSpacing: '-0.02em', color: B.navy,
        }}>
          Foothold
        </h1>
        <p style={{ color: B.bronze, fontFamily: MONO, fontSize: 'clamp(14px, 3.5vw, 17px)', fontWeight: 700, margin: '10px 0 0' }}>
          Get your footing. Keep climbing.
        </p>

        <p style={{ color: B.slate, fontSize: 17, lineHeight: 1.65, margin: '22px auto 0', maxWidth: 580 }}>
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
        <p style={{ color: B.mist, fontSize: 13, marginTop: 14 }}>
          Browsing is always free — signing in just lets you keep your progress across devices.
        </p>
      </div>

      {/* ── Navy code panel: a taste of the destination. Mirrors the brand
             sheet's dark <pre> styling and adds instant "this is Python" flavour. ── */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px 52px' }}>
        <div style={{
          background: B.navy, color: B.panelText, borderRadius: 14,
          padding: '20px 24px', fontFamily: MONO, fontSize: 14, lineHeight: 1.8,
          overflowX: 'auto', textAlign: 'left',
        }}>
          <div><span style={{ color: B.amber }}>&gt;&gt;&gt;</span> print(<span style={{ color: B.amber }}>"Hello, climber."</span>)</div>
          <div>Hello, climber.</div>
          <div style={{ color: B.mist }}># {totalUnits}+ interactive lessons between you and the summit.</div>
        </div>
      </div>

      {/* ── Who it's for ── */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px 28px' }}>
        <Card>
          <Kicker>Who this is for</Kicker>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: B.navy }}>
            Never written a line of code? Perfect.
          </h2>
          <p style={{ color: B.slate, fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
            Foothold is for anyone starting Python from the very beginning — students,
            career-switchers, curious minds, wherever you are. {totalUnits}+ interactive
            lessons, each built around a single idea you can click, drag, or step through
            rather than just read.
          </p>
        </Card>
      </div>

      {/* ── How you'll learn: the ZPD / scaffolding story, amber-accented since
             it is the heart of the course's identity ── */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px 28px' }}>
        <Card style={{ borderLeft: `4px solid ${B.amber}` }}>
          <Kicker>How you'll learn</Kicker>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: B.navy }}>
            One reachable step at a time
          </h2>
          <p style={{ color: B.slate, fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
            Foothold is built on a well-studied idea from learning science: Lev Vygotsky's{' '}
            <strong style={{ color: B.navy }}>Zone of Proximal Development</strong>. We learn
            best not from what we already know, and not from what's far beyond us, but from
            the narrow band just past our current ability — reachable with the right support.
            That support is called <strong style={{ color: B.navy }}>scaffolding</strong>:
            temporary structure that holds you up while a skill is new, and is gradually
            removed as you build your own footing. Every lesson here follows that idea —
            a new concept arrives only once you have exactly what you need to understand it,
            with just enough support to carry you the rest of the way on your own.
          </p>
          <p style={{
            color: B.slate, fontSize: 14.5, lineHeight: 1.7, margin: '18px 0 0',
            paddingTop: 16, borderTop: `1px solid ${B.border}`,
          }}>
            <strong style={{ color: B.navy }}>The research behind this course:</strong> I'm{' '}
            <strong style={{ color: B.navy }}>Aishwarya</strong>, a professor of engineering,
            and Foothold is my action research in education — a study of whether active
            learning through interactive content helps beginners learn programming better
            than reading or watching alone. That's why every single lesson here is something
            you <em>do</em>, not something you sit through. Your anonymous progress through
            the lessons quietly contributes to this research and helps make the course better
            for the next learner.
          </p>
        </Card>
      </div>

      {/* ── Learn your way + closing call to action ── */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px 64px' }}>
        <Card>
          <Kicker>Learn your way</Kicker>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: B.navy }}>
            Every module is open. No locks, no gates.
          </h2>
          <p style={{ color: B.slate, fontSize: 15.5, lineHeight: 1.7, margin: 0 }}>
            Once you're in the Dashboard, click whichever module interests you, in any order.
            That said, since each unit builds on the ones before it, we{' '}
            <strong style={{ color: B.navy }}>recommend going step by step</strong> the first
            time through — it makes for the smoothest climb.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <button onClick={onExploreGuest} style={{ ...primaryBtn, padding: '12px 24px', fontSize: 15 }}>
              Take me to the Dashboard →
            </button>
          </div>
        </Card>
      </div>

      {/* ── Footer ── */}
      <div style={{ textAlign: 'center', color: B.mist, fontSize: 12.5, paddingBottom: 44, fontFamily: MONO }}>
        Your progress is saved on this device automatically. Sign in anytime to keep it across devices.
      </div>
    </div>
  );
}
