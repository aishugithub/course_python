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

// ============================================================
//  DARK — the shell's dark-and-on-brand palette.
//
//  Why this exists: the lessons (src/lessons/*.jsx) live on a
//  GitHub-style dark canvas. To make the whole app feel like one
//  continuous place, the shell pages (Landing, Dashboard) now use
//  THESE tokens instead of the cream ones above. The surfaces are
//  deliberately the same greys the lessons use, so the shell and
//  a lesson feel like the same product — but the brand amber stays
//  the hero accent and bronze stays the kicker colour, which is
//  what keeps this "on-brand" rather than a generic dark theme.
//
//  The cream tokens above are kept intact: Login.jsx and any other
//  page can still opt into the campus look. Dark = the classroom,
//  now extended to the whole climbing route.
// ============================================================
export const DARK = {
  // 2026-11 redesign: the whole app (shell AND lessons) is now LIGHT, on the
  // cream Foothold brand. The token names are kept (every shell page imports
  // them) but the values are the light brand values.
  // Surfaces
  bgDeep:       '#F1EEE6',  // page background (brand cream)
  surface:      '#FFFFFF',  // cards / rows / header bar
  surfaceRaised:'#FBF9F4',  // hover + elevated panels
  border:       '#E7E0D2',  // hairline borders
  borderSoft:   '#EFE9DD',  // even subtler dividers

  // Ink
  ink:          '#16294A',  // primary text (brand navy)
  inkSoft:      '#40506A',  // secondary body text (slate)
  inkMuted:     '#7A879B',  // muted small print

  // Accents
  amber:        '#E7A13E',  // THE accent (fills, badges, buttons)
  amberSoft:    '#D38E2A',  // deeper amber for hover
  bronze:       '#B08343',  // kickers
  blue:         '#2B5FB3',  // secondary accent (module rotation)

  // Feedback (readable on cream)
  green:        '#1F7A4D',
  red:          '#B0322F',

  // Navy panel (the landing code terminal) — text on it uses panelText
  navyPanel:    '#16294A',
  panelText:    '#E7EAF0',
};

export const FONT = "'Space Grotesk', system-ui, sans-serif"; // headings & UI
export const MONO = "'Space Mono', monospace";                // code & kickers

// ============================================================
//  LIGHT — the shell's CURRENT palette (Nov 2026 revamp).
//
//  Built straight from the logo: cream page, white cards, navy
//  ink (the two navy steps), amber accent (the top step).
//  Same keys as DARK so a page can swap `DARK as D` for
//  `LIGHT as D` and nothing else changes. DARK is kept above in
//  case we ever want a dark mode toggle.
// ============================================================
export const LIGHT = {
  // Surfaces
  bgDeep:       '#F1EEE6',  // page background — brand cream
  surface:      '#FFFFFF',  // cards / rows / header bar
  surfaceRaised:'#FAF8F3',  // hover + elevated panels
  border:       '#E7E0D2',  // hairline borders
  borderSoft:   '#EFEAE0',  // even subtler dividers

  // Ink
  ink:          '#16294A',  // primary text — logo navy
  inkSoft:      '#40506A',  // secondary body text
  inkMuted:     '#6B7A90',  // muted small print / mono captions

  // Accents
  amber:        '#E7A13E',  // THE accent (fills, bars, highlights)
  amberSoft:    '#C9852A',  // deeper amber for hover / amber TEXT on cream
  bronze:       '#B08343',  // kickers
  blue:         '#1F5FAD',  // secondary accent (module rotation)

  // Feedback
  green:        '#1F7A4D',  // success / completed
  red:          '#B0322F',  // errors

  // Navy panel (the landing code terminal stays dark, like the logo steps)
  navyPanel:    '#16294A',
  panelText:    '#E7EAF0',  // text that sits ON navyPanel
};
