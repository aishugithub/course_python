// ============================================================
//  FOOTHOLD BRAND — the single source of truth for brand colors
//  and fonts, used by every shell page (Landing, Dashboard,
//  Login, loading screens) and by every future Foothold course.
//
//  Palette source: "Foothold python_branding/brand/README.html"
//  (v1 logo handoff). If the brand ever changes, edit THIS file
//  and every page follows. Never hardcode these hex values in
//  shell components.
//
//  Note: lesson files (src/lessons/*.jsx) deliberately keep
//  their own dark "focus mode" theme — code reads best on dark.
//  The cream brand look is the campus; dark is the classroom.
// ============================================================

export const BRAND = {
  // Surfaces
  cream:     '#F1EEE6',  // page background
  card:      '#FFFFFF',  // card / row surfaces
  creamDeep: '#EDE8DC',  // inline-code chips, subtle fills
  border:    '#E7E0D2',  // hairline borders

  // Ink
  navy:      '#16294A',  // primary text, solid buttons, dark panels
  slate:     '#40506A',  // secondary body text
  mist:      '#8A97AB',  // muted small print

  // Accents
  amber:     '#E7A13E',  // THE accent — highlights, hooks, Crucible fire
  bronze:    '#B08343',  // kickers (small uppercase mono labels)
  codeBrown: '#B0651F',  // code text on cream chips

  // Feedback
  green:     '#1F7A4D',  // success / completed (readable on cream)
  red:       '#B0322F',  // errors

  // On-navy (for dark panels like the landing terminal)
  panelText: '#E7EAF0',
};

export const FONT = "'Space Grotesk', system-ui, sans-serif"; // headings & UI
export const MONO = "'Space Mono', monospace";                // code & kickers
