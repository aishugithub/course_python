// ============================================================
//  GAS CONFIG — paste your GAS Web App URL here after Step 11
//  Never paste this URL anywhere else in the project
// ============================================================

const GAS_URL = "https://script.google.com/macros/s/AKfycbz0MRvmvi1FYHH1B_1hm29v_RjwY4mrDGlWLGRhAivfy4tZ9kDJrJnzUPNYZg21WMQh/exec";

// Local testing only: `VITE_GAS_URL=http://localhost:8787 npx vite` points the
// app at a stand-in backend instead. Builds for GitHub Pages never set it.
export default import.meta.env.VITE_GAS_URL || GAS_URL;
