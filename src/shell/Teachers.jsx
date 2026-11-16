import { useState, useEffect } from 'react';
import COURSE_CONFIG from '../../config/course.config.js';
import { LIGHT as D, FONT, MONO } from './brand.js';

// ─────────────────────────────────────────────────────────────────────────────
// For teachers — everything that invites a teacher to run their own copy.
//
//   TeacherStrip  the one-line strip on top of the landing page and the dashboard.
//   Teachers      the full page (address ends #/teachers): what a teacher gets,
//                 how it works, what is asked in return, and the registration form.
//
// The invitation shows on EVERY copy of the course, so that anyone who meets
// Foothold anywhere learns they can run it too. The page and its form live on the
// original site only; on a teacher's copy the strip and the landing-page card
// open the original's page in a new tab.
//
//   TEACHERS_PAGE_ON  this site has the page (original site, registration address set)
//   TEACHERS_LINK     where the strip and the card lead ('' = show nothing)
//   TEACHERS_EXTERNAL the link leaves this site (a teacher's copy)
//
// The form posts to Teacher Adoption/AdoptionReceiver.gs, which adds a row to the
// Registrations tab of the author's "Foothold Adopters" Sheet and emails the guide.
// ─────────────────────────────────────────────────────────────────────────────

const A = COURSE_CONFIG.adoption || {};
// Local testing only: VITE_REGISTER_URL points the form at a stand-in receiver.
const REGISTER_URL = import.meta.env.VITE_REGISTER_URL || A.registerUrl || '';
const IS_ORIGINAL = COURSE_CONFIG.edition === 'original';
export const TEACHERS_HASH = '#/teachers';
export const TEACHERS_PAGE_ON = IS_ORIGINAL && !!REGISTER_URL;
// On a copy, the original's address comes from the credit line (a licence condition).
const ORIGINAL_SITE = (COURSE_CONFIG.credit?.url || '').replace(/\/+$/, '');
export const TEACHERS_EXTERNAL = !IS_ORIGINAL && !!ORIGINAL_SITE;
export const TEACHERS_LINK = TEACHERS_PAGE_ON ? TEACHERS_HASH : TEACHERS_EXTERNAL ? `${ORIGINAL_SITE}/teachers/` : '';
// Spread on a link to the page: on a copy it opens the original in a new tab.
export const TEACHERS_LINK_PROPS = TEACHERS_EXTERNAL
  ? { href: TEACHERS_LINK, target: '_blank', rel: 'noopener noreferrer' }
  : { href: TEACHERS_LINK };

const STRIP_HIDDEN_KEY = 'foothold_teacher_strip_hidden';

// `dismissible`: on the dashboard a learner sees the strip on every visit, so it
// can be closed for good on that device. On the landing page it always shows.
export function TeacherStrip({ dismissible = false }) {
  const [hidden, setHidden] = useState(() => {
    if (!dismissible) return false;
    try { return localStorage.getItem(STRIP_HIDDEN_KEY) === '1'; } catch { return false; }
  });
  if (!TEACHERS_LINK || hidden) return null;
  const close = () => {
    setHidden(true);
    try { localStorage.setItem(STRIP_HIDDEN_KEY, '1'); } catch { /* ignore */ }
  };
  return (
    <div style={{
      background: D.navyPanel, color: D.panelText, fontFamily: FONT, fontSize: 14,
      padding: '9px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    }}>
      <div style={{ textAlign: 'center', lineHeight: 1.5 }}>
        <strong style={{ color: D.amber }}>Teaching Python?</strong>{' '}
        Make Foothold your own: your site, your students, your class dashboard. Free.{' '}
        <a {...TEACHERS_LINK_PROPS} style={{ color: D.amber, fontWeight: 700, whiteSpace: 'nowrap' }}>
          See how →
        </a>
      </div>
      {dismissible && (
        <button onClick={close} title="Hide this" aria-label="Hide this message"
          style={{ background: 'transparent', border: 'none', color: D.panelText, opacity: 0.7, fontSize: 18, lineHeight: 1, cursor: 'pointer', padding: '0 4px' }}>
          ×
        </button>
      )}
    </div>
  );
}

function Kicker({ children }) {
  return (
    <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: D.bronze, marginBottom: 8 }}>
      {children}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 16, padding: '26px 30px', ...style }}>
      {children}
    </div>
  );
}

const GETS = [
  ['Your own course site', 'The whole course on your own web address, with your course title on it. Hosting is free.'],
  ['Your own record book', 'Sign-ins and progress are saved in your own Google Sheet. Your students’ data stays with you; nobody else can see it, including the author.'],
  ['A class dashboard', 'See who is progressing, who has gone quiet for a week, which programs the class finds hard, and the most common Python errors in each unit.'],
  ['A course you can shape', 'Hide the modules you do not need, reorder them, or add lessons of your own. The settings are in one file.'],
  ['A certificate with your name', 'Students who clear all ten Crucibles earn a course certificate that carries your name as the teacher.'],
  ['Help with the set-up', 'Follow the written guide, or let Claude take you through it one step at a time. Stuck? Write to us and we help.'],
];

const STEPS = [
  ['Register', 'Fill in the short form below. It takes about two minutes.'],
  ['Check your inbox', 'The set-up guide is emailed to you within a few minutes.'],
  ['Set it up', 'About 30 minutes, with a free GitHub account and a Google account. No programming: you only follow the steps.'],
  ['Share your link', 'Give your students the address of your site. They register and start typing Python.'],
];

const LEVELS = ['School students', 'College or university students', 'Working professionals or others'];
const PURPOSES = ['Part of a course I teach', 'Lab or practice companion', 'Bridge or add-on course', 'Club, workshop or bootcamp', 'Something else'];
const CERT = ['Yes, very much', 'Somewhat', 'Not really', 'Not sure yet'];

const EMPTY = {
  name: '', email: '', phone: '', institution: '', place: '', role: '',
  level: '', year: '', branch: '', purpose: '', students: '', start: '',
  certificate: '', heard: '', github: '', message: '', website: '',
};

export default function Teachers({ onBack }) {
  const [f, setF] = useState(EMPTY);
  const [agree, setAgree] = useState(false);
  const [state, setState] = useState('idle');   // idle | sending | done | error
  const [error, setError] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const totalUnits = COURSE_CONFIG.modules.filter(m => !m.hidden).reduce((n, m) => n + m.units.length, 0);
  const set = (key) => (e) => setF(prev => ({ ...prev, [key]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending'); setError('');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    try {
      // Sent as plain text so the browser makes a simple request (the Apps Script
      // address does not answer a CORS preflight), exactly like api.js does.
      const res = await fetch(REGISTER_URL, {
        method: 'POST',
        body: JSON.stringify({ type: 'register', ...f }),
        signal: controller.signal,
      });
      const r = await res.json();
      if (r && r.success) { setState('done'); window.scrollTo(0, 0); }
      else { setState('error'); setError((r && r.message) || 'The registration could not be saved.'); }
    } catch {
      setState('error'); setError('The registration could not be sent. Please check your connection and try again.');
    } finally {
      clearTimeout(timer);
    }
  }

  const input = {
    width: '100%', boxSizing: 'border-box', padding: '10px 12px', fontSize: 15, fontFamily: FONT,
    color: D.ink, background: D.surface, border: `1.5px solid ${D.border}`, borderRadius: 10,
  };
  const label = { display: 'block', color: D.ink, fontSize: 14, fontWeight: 600, marginBottom: 6 };
  const optional = <span style={{ color: D.inkMuted, fontWeight: 400 }}> (optional)</span>;
  const primaryBtn = {
    background: D.amber, color: '#111A2E', border: 'none', borderRadius: 12,
    padding: '14px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: FONT,
  };
  const h2 = { fontSize: 20, fontWeight: 700, margin: '0 0 10px', color: D.ink };
  const body = { color: D.inkSoft, fontSize: 15.5, lineHeight: 1.7, margin: 0 };
  const wrap = { maxWidth: 780, margin: '0 auto', padding: '0 24px 28px' };
  const mail = <a href={`mailto:${A.contactEmail}`} style={{ color: D.blue }}>{A.contactEmail}</a>;

  return (
    <div style={{ minHeight: '100vh', background: D.bgDeep, fontFamily: FONT, color: D.ink }}>
      <style>{`
        .fh-t-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px; }
        .fh-t-wide { grid-column: 1 / -1; }
        .fh-t-gets { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .fh-t-field:focus { outline: none; border-color: ${D.amber} !important; box-shadow: 0 0 0 3px rgba(231,161,62,.25); }
        @media (max-width: 640px) {
          .fh-t-grid, .fh-t-gets { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '18px 24px 0' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: D.inkSoft, fontSize: 14, cursor: 'pointer', fontFamily: FONT, padding: 0 }}>
          ← Back to the course
        </button>
      </div>

      {state === 'done' ? (
        <div style={{ ...wrap, paddingTop: 48, paddingBottom: 64 }}>
          <Card style={{ borderLeft: `4px solid ${D.green}` }}>
            <Kicker>Registered</Kicker>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 12px', color: D.ink }}>
              Thank you, {f.name.trim().split(/\s+/)[0]}. Your guide is on its way.
            </h1>
            <p style={body}>
              We have emailed the set-up guide to <strong style={{ color: D.ink }}>{f.email.trim()}</strong>.
              It usually arrives within a few minutes. If you do not see it, look in your spam
              folder, or write to {mail}.
            </p>
            <p style={{ ...body, marginTop: 14 }}>
              The set-up takes about 30 minutes. You need a free GitHub account and a Google
              account, so this is a good moment to create them if you do not have them yet.
            </p>
            <div style={{ marginTop: 22 }}>
              <button onClick={onBack} style={{ ...primaryBtn, padding: '12px 24px', fontSize: 15 }}>
                Back to the course →
              </button>
            </div>
          </Card>
        </div>
      ) : (
        <>
          {/* ── Hero ── */}
          <div style={{ padding: '40px 24px 36px', textAlign: 'center', maxWidth: 780, margin: '0 auto' }}>
            <Kicker>For teachers · Free</Kicker>
            <h1 style={{ fontSize: 'clamp(28px, 6vw, 40px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2, color: D.ink }}>
              Make Foothold your own course, for your own students
            </h1>
            <p style={{ color: D.inkSoft, fontSize: 17, lineHeight: 1.65, margin: '18px auto 0', maxWidth: 600 }}>
              Foothold is a free Python course for absolute beginners, with {totalUnits}+ interactive
              lessons. Students type real Python in the browser from the first lesson, and every
              program is checked the moment they press Run. You can run your own copy of it: your
              web address, your students, your class dashboard.
            </p>
            <div style={{ marginTop: 26 }}>
              <a href="#register" onClick={(e) => { e.preventDefault(); document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{ ...primaryBtn, textDecoration: 'none', display: 'inline-block' }}>
                Register and get the guide →
              </a>
            </div>
            <p style={{ color: D.inkMuted, fontSize: 13, marginTop: 14 }}>
              Free to use and adapt for teaching. About 30 minutes to set up. No programming needed.
            </p>
          </div>

          {/* ── What you get ── */}
          <div style={wrap}>
            <Kicker>What you get</Kicker>
            <div className="fh-t-gets">
              {GETS.map(([title, text]) => (
                <Card key={title} style={{ padding: '20px 22px' }}>
                  <div style={{ color: D.ink, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{title}</div>
                  <div style={{ color: D.inkSoft, fontSize: 14.5, lineHeight: 1.65 }}>{text}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* ── How it works ── */}
          <div style={wrap}>
            <Card style={{ borderLeft: `4px solid ${D.amber}` }}>
              <Kicker>How it works</Kicker>
              <h2 style={h2}>Four steps, about half an hour</h2>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {STEPS.map(([title, text], i) => (
                  <li key={title} style={{ display: 'flex', gap: 14, marginTop: i ? 14 : 4 }}>
                    <div style={{ flex: '0 0 30px', height: 30, borderRadius: '50%', background: D.navyPanel, color: D.panelText, fontFamily: MONO, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {i + 1}
                    </div>
                    <div style={{ color: D.inkSoft, fontSize: 15.5, lineHeight: 1.6 }}>
                      <strong style={{ color: D.ink }}>{title}.</strong> {text}
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          {/* ── What is asked in return ── */}
          <div style={wrap}>
            <Card>
              <Kicker>What we ask in return</Kicker>
              <h2 style={h2}>Two small things</h2>
              <ul style={{ ...body, paddingLeft: 20 }}>
                <li>
                  <strong style={{ color: D.ink }}>Keep the credit line</strong> “{COURSE_CONFIG.credit.text}”
                  on your site. It is already at the bottom of your landing page.
                </li>
                <li style={{ marginTop: 8 }}>
                  <strong style={{ color: D.ink }}>Keep the usage signal switched on.</strong> Once a week
                  your copy sends the author three counts: students registered, students active that
                  week and units completed that week. No student data is ever sent: no names, emails,
                  passwords, code or answers.
                </li>
              </ul>
              <p style={{ ...body, fontSize: 14.5, marginTop: 14 }}>
                The course is free to use, change and share for teaching, and is not to be sold.
                The full terms are in the{' '}
                <a href={A.licenceUrl} target="_blank" rel="noopener noreferrer" style={{ color: D.blue }}>licence</a>.
              </p>
            </Card>
          </div>

          {/* ── Registration form ── */}
          <div id="register" style={{ ...wrap, paddingBottom: 64 }}>
            <Card style={{ borderLeft: `4px solid ${D.blue}` }}>
              <Kicker>Register</Kicker>
              <h2 style={h2}>Tell us about your class</h2>
              <p style={{ ...body, marginBottom: 22 }}>
                Submit this form and the set-up guide is emailed to you straight away.
                Your answers help us support you and understand who is teaching with Foothold.
              </p>

              <form onSubmit={submit}>
                <div className="fh-t-grid">
                  <div>
                    <label style={label} htmlFor="t-name">Your name</label>
                    <input id="t-name" className="fh-t-field" style={input} required maxLength={100} autoComplete="name" value={f.name} onChange={set('name')} />
                  </div>
                  <div>
                    <label style={label} htmlFor="t-email">Email</label>
                    <input id="t-email" className="fh-t-field" style={input} type="email" required maxLength={150} autoComplete="email" value={f.email} onChange={set('email')} />
                  </div>
                  <div>
                    <label style={label} htmlFor="t-inst">School, college or organisation</label>
                    <input id="t-inst" className="fh-t-field" style={input} required maxLength={200} autoComplete="organization" value={f.institution} onChange={set('institution')} />
                  </div>
                  <div>
                    <label style={label} htmlFor="t-place">City and country{optional}</label>
                    <input id="t-place" className="fh-t-field" style={input} maxLength={100} value={f.place} onChange={set('place')} />
                  </div>
                  <div>
                    <label style={label} htmlFor="t-role">Your role{optional}</label>
                    <input id="t-role" className="fh-t-field" style={input} maxLength={100} placeholder="e.g. Assistant professor, CS teacher" value={f.role} onChange={set('role')} />
                  </div>
                  <div>
                    <label style={label} htmlFor="t-phone">Phone or WhatsApp{optional}</label>
                    <input id="t-phone" className="fh-t-field" style={input} type="tel" maxLength={30} autoComplete="tel" placeholder="Only if you would like a call for help" value={f.phone} onChange={set('phone')} />
                  </div>

                  <div>
                    <label style={label} htmlFor="t-level">Who will you teach?</label>
                    <select id="t-level" className="fh-t-field" style={input} required value={f.level} onChange={set('level')}>
                      <option value="">Choose…</option>
                      {LEVELS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={label} htmlFor="t-students">About how many students?</label>
                    <input id="t-students" className="fh-t-field" style={input} type="number" min="1" max="100000" required placeholder="e.g. 60" value={f.students} onChange={set('students')} />
                  </div>
                  <div>
                    <label style={label} htmlFor="t-year">Year or class{optional}</label>
                    <input id="t-year" className="fh-t-field" style={input} maxLength={100} placeholder="e.g. First year, Class 11" value={f.year} onChange={set('year')} />
                  </div>
                  <div>
                    <label style={label} htmlFor="t-branch">Branch or subject{optional}</label>
                    <input id="t-branch" className="fh-t-field" style={input} maxLength={100} placeholder="e.g. Computer Science, Biomedical" value={f.branch} onChange={set('branch')} />
                  </div>
                  <div>
                    <label style={label} htmlFor="t-purpose">How will you use it?{optional}</label>
                    <select id="t-purpose" className="fh-t-field" style={input} value={f.purpose} onChange={set('purpose')}>
                      <option value="">Choose…</option>
                      {PURPOSES.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={label} htmlFor="t-start">When do you plan to start?{optional}</label>
                    <input id="t-start" className="fh-t-field" style={input} maxLength={60} placeholder="e.g. January 2027" value={f.start} onChange={set('start')} />
                  </div>

                  <div className="fh-t-wide">
                    <label style={label} htmlFor="t-cert">
                      Would a course certificate signed by you, under the Foothold name, matter to your students?{optional}
                    </label>
                    <select id="t-cert" className="fh-t-field" style={{ ...input, maxWidth: 340 }} value={f.certificate} onChange={set('certificate')}>
                      <option value="">Choose…</option>
                      {CERT.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={label} htmlFor="t-heard">How did you hear about Foothold?{optional}</label>
                    <input id="t-heard" className="fh-t-field" style={input} maxLength={200} value={f.heard} onChange={set('heard')} />
                  </div>
                  <div>
                    <label style={label} htmlFor="t-github">GitHub username{optional}</label>
                    <input id="t-github" className="fh-t-field" style={input} maxLength={40} autoCapitalize="none" placeholder="If you already have one" value={f.github} onChange={set('github')} />
                  </div>
                  <div className="fh-t-wide">
                    <label style={label} htmlFor="t-msg">Anything you would like to ask or tell us?{optional}</label>
                    <textarea id="t-msg" className="fh-t-field" style={{ ...input, minHeight: 90, resize: 'vertical' }} maxLength={1000} value={f.message} onChange={set('message')} />
                  </div>
                </div>

                {/* Not for people: hidden from sight and from screen readers. Only
                    automated form-fillers complete it, and the receiver then drops the entry. */}
                <div aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
                  <label>Website <input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></label>
                </div>

                <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 20, color: D.inkSoft, fontSize: 14.5, lineHeight: 1.6, cursor: 'pointer' }}>
                  <input type="checkbox" required checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 4, width: 16, height: 16, flex: '0 0 auto' }} />
                  <span>
                    I agree that Foothold may keep these details and email me about the course.
                    They go only to the course author and are never shared or sold.
                  </span>
                </label>

                {state === 'error' && (
                  <div role="alert" style={{ marginTop: 16, padding: '12px 14px', borderRadius: 10, background: '#FBECEB', border: `1px solid ${D.red}`, color: D.red, fontSize: 14.5, lineHeight: 1.6 }}>
                    {error} If it keeps happening, write to {mail} and we will send you the guide.
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                  <button type="submit" disabled={state === 'sending'} style={{ ...primaryBtn, opacity: state === 'sending' ? 0.6 : 1, cursor: state === 'sending' ? 'wait' : 'pointer' }}>
                    {state === 'sending' ? 'Sending…' : 'Register and email me the guide →'}
                  </button>
                </div>
              </form>
            </Card>

            <p style={{ textAlign: 'center', color: D.inkMuted, fontSize: 13.5, marginTop: 18 }}>
              Questions before you register? Write to {mail}.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
