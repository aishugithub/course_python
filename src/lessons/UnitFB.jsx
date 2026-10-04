// UnitFB — End-of-course feedback, review & testimonial (optional finish-line unit).
// Not a teaching lesson: it collects the learner's verdict and sends it to the
// Google Sheet, then marks itself complete so the certificate can unlock.
// Shell wiring: receives `onSubmitFeedback(payload)` (App.jsx → api.js → Feedback
// sheet) in addition to the usual `onUnitComplete`. Follows the standard Foothold
// lesson shell (dark palette, header, progress bar, tab strip, content card).
import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// The seven agreement statements — each maps to one claimed design mechanism
// (C-contrast, memory visualization, need-first ordering, the Crucible,
// scaffolding/ZPD, in-browser practice, the CT strand). 1 = strongly disagree,
// 5 = strongly agree.
const LIKERT = [
  "Comparing Python to lower-level code (e.g., C) helped me understand what Python was really doing underneath.",
  "Seeing the visualizations — variables as memory slots, the function call stack — helped me picture what my code does.",
  "I usually understood WHY a concept was useful (the problem it solves) before I had to learn its syntax.",
  "The Crucible challenges helped me feel confident applying what I had learned.",
  "As the material got harder, I felt supported — neither lost nor bored.",
  "Being able to write and run code in the browser, with instant feedback, helped my learning.",
  "The Computational Thinking modules helped me approach new problems more systematically.",
];

const PRIOR_OPTIONS = [
  "None — Foothold was my first",
  "A little at school",
  "Self-taught (YouTube / apps / websites)",
  "Yes, a formal course/class",
];

// ── A 1–5 rating row ──
function Likert({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} onClick={() => onChange(n)} style={{
          width: 44, height: 44, borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 700,
          background: value === n ? C.accentGlow : C.card,
          border: `1.5px solid ${value === n ? C.accent : C.border}`,
          color: value === n ? "#fff" : C.muted, transition: "all 0.15s",
        }}>{n}</button>
      ))}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ color: C.text, fontSize: 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.5 }}>{label}</div>
      {children}
    </div>
  );
}

const textareaStyle = {
  width: "100%", background: C.card, border: `1px solid ${C.border}`, color: C.text,
  borderRadius: 8, padding: "10px 12px", fontSize: 13.5, fontFamily: "inherit",
  minHeight: 80, resize: "vertical", boxSizing: "border-box",
};

export default function UnitFB({ student, onUnitComplete, onSubmitFeedback }) {
  const sections = [
    { id: "before", label: "Before" },
    { id: "exp", label: "Your Experience" },
    { id: "words", label: "In Your Words" },
    { id: "submit", label: "Submit & Finish" },
  ];
  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  // ── Answers ──
  const [priorExp, setPriorExp] = useState("");
  const [priorLangs, setPriorLangs] = useState("");
  const [ratings, setRatings] = useState(Array(LIKERT.length).fill(0));
  const [compare, setCompare] = useState("");
  const [mostLeast, setMostLeast] = useState("");
  const [change, setChange] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [consent, setConsent] = useState(false);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };
  const setRating = (i, n) => setRatings(prev => prev.map((v, idx) => idx === i ? n : v));

  async function handleSubmit() {
    setSending(true);
    const payload = {
      name: student?.name || "",
      priorExp, priorLangs,
      ratings,                       // array of 7 numbers (0 = unanswered)
      compare, mostLeast, change,
      testimonial,
      consent,
    };
    // Best-effort: even if the network hiccups, we let the learner finish so
    // they're never blocked from the certificate by a flaky save.
    try { await (onSubmitFeedback ? onSubmitFeedback(payload) : Promise.resolve()); } catch { /* ignore */ }
    setSending(false);
    setSent(true);
    markComplete(3);
  }

  // ── Section content ──
  const content = [
    // 0 — Before
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Before this course</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 18, lineHeight: 1.7 }}>
        Quick context first — there are no wrong answers, and this is anonymous to other learners.
      </p>
      <Field label="How much programming had you done before Foothold?">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PRIOR_OPTIONS.map(opt => (
            <button key={opt} onClick={() => setPriorExp(opt)} style={{
              textAlign: "left", padding: "10px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13.5,
              background: priorExp === opt ? C.accentGlow + "33" : C.card,
              border: `1.5px solid ${priorExp === opt ? C.accent : C.border}`,
              color: priorExp === opt ? C.text : C.muted,
            }}>{priorExp === opt ? "◉ " : "○ "}{opt}</button>
          ))}
        </div>
      </Field>
      <Field label="Which languages, if any, had you tried before? (write “none” if none)">
        <input value={priorLangs} onChange={e => setPriorLangs(e.target.value)} placeholder="e.g. a bit of C at school"
          style={{ ...textareaStyle, minHeight: 0, height: 42 }} />
      </Field>
    </div>,

    // 1 — Your Experience (Likert)
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Your experience of the course</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 18, lineHeight: 1.7 }}>
        For each statement, tap a number: <b style={{ color: C.text }}>1 = strongly disagree</b>, <b style={{ color: C.text }}>5 = strongly agree</b>.
      </p>
      {LIKERT.map((q, i) => (
        <div key={i} style={{ marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ color: C.text, fontSize: 13.5, lineHeight: 1.6 }}>{i + 1}. {q}</div>
          <Likert value={ratings[i]} onChange={n => setRating(i, n)} />
        </div>
      ))}
    </div>,

    // 2 — In Your Words
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>In your own words</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 18, lineHeight: 1.7 }}>
        This is the most useful part — take a minute if you can.
      </p>
      <Field label="How does learning with Foothold compare to other ways you've tried to learn programming (school, YouTube, other apps), if any?">
        <textarea value={compare} onChange={e => setCompare(e.target.value)} style={textareaStyle} />
      </Field>
      <Field label="What was MOST helpful about Foothold? What was LEAST helpful?">
        <textarea value={mostLeast} onChange={e => setMostLeast(e.target.value)} style={textareaStyle} />
      </Field>
      <Field label="If you could change one thing, what would it be?">
        <textarea value={change} onChange={e => setChange(e.target.value)} style={textareaStyle} />
      </Field>
      <Field label="✍️ Leave a testimonial (optional) — a line or two we could share to encourage other learners">
        <textarea value={testimonial} onChange={e => setTestimonial(e.target.value)} style={textareaStyle} />
      </Field>
    </div>,

    // 3 — Submit & Finish
    <div>
      {!sent ? (
        <div>
          <h3 style={{ color: C.text, marginBottom: 6 }}>One last step</h3>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 18, lineHeight: 1.7 }}>
            Submitting your feedback is the final foothold — it is required for your e-Lab certificate
            (with all ten experiments and five mini-project crucibles), and it also counts toward the course certificate.
          </p>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", marginBottom: 18 }}>
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: 3, accentColor: C.accent }} />
            <span style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6 }}>
              I agree that my anonymous, aggregated answers may be used to improve the course and may appear,
              without any identifying information, in academic research about the teaching method. (Optional; your
              feedback is saved either way.)
            </span>
          </label>
          <button onClick={handleSubmit} disabled={sending} style={{
            width: "100%", padding: "13px", borderRadius: 8, border: "none", cursor: sending ? "default" : "pointer",
            background: sending ? C.border : C.green, color: sending ? C.muted : "#0D1117", fontWeight: 700, fontSize: 14.5,
          }}>{sending ? "Sending…" : "Submit feedback →"}</button>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "12px 6px" }}>
          <div style={{ fontSize: 52 }}>🎉</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginTop: 10 }}>Thank you!</div>
          <div style={{ color: C.muted, marginTop: 8, marginBottom: 20, lineHeight: 1.7 }}>
            Your feedback is in — it genuinely shapes the next version of Foothold.
          </div>
          <div style={{ padding: 20, borderRadius: 12, background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`, border: `1px solid ${C.accent}55` }}>
            <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Course Complete!</div>
            <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
              If your e-Lab Record is complete (all ten experiments and five mini-project crucibles), your
              <b style={{ color: C.accent }}> e-Lab certificate</b> opens when you tap Finish — it is also on the Dashboard.
            </div>
          </div>
          {/* Like the Crucible badge: never auto-fire onUnitComplete (it unloads
              the lesson). Show the thank-you first, then let them click Finish. */}
          <button onClick={() => onUnitComplete && onUnitComplete()} style={{
            marginTop: 18, width: "100%", padding: "12px", borderRadius: 8, border: "none",
            background: C.accentGlow, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}>Finish & return to Dashboard →</button>
        </div>
      )}
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💬</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>FINISH LINE › FEEDBACK</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Your Verdict — Feedback, Review & Testimonial</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{completed.length} / {sections.length} done</div>
      </div>

      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(completed.length / sections.length) * 100}%`, background: C.green, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => setActiveSection(i)} style={{
              flex: 1, minWidth: 90, padding: "8px 6px", borderRadius: 7,
              background: activeSection === i ? C.accentGlow : "transparent",
              border: "none", color: activeSection === i ? "#fff" : C.muted,
              cursor: "pointer", fontSize: 11, fontWeight: activeSection === i ? 600 : 400,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            }}>
              {completed.includes(i) && <span style={{ color: C.green }}>✓</span>}
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
          {content[activeSection]}
        </div>

        {activeSection < sections.length - 1 && (
          <button onClick={goNext} style={{
            marginTop: 16, width: "100%", padding: "12px", borderRadius: 8,
            background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>Continue →</button>
        )}
      </div>
    </div>
  );
}
