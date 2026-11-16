// ============================================================
//  MAKE-ADOPTER-COPY — builds the clean copy that teachers start from
//
//    node scripts/make-adopter-copy.mjs [destination] [--no-build]
//
//  destination defaults to ../foothold-courses-python (its own git repository,
//  pushed to github.com/foothold-courses/python, marked as a template).
//
//  What it does:
//    1. Takes ONLY files tracked by git (so local student data, backups and
//       working notes can never leak), minus the institution-only paths below.
//    2. Applies the markers in the source files:
//         @adopters:strip-start … @adopters:strip-end   drop those lines
//         @adopters:strip-line                          drop this line
//         @adopters:replace-with <text>                 put <text> in its place
//       {{SIGNAL_URL}} in a replacement becomes the address in adopters/signal-url.txt.
//    3. Refuses to finish if anything institution-specific is left, or if the
//       copy does not build.
//  Re-run it whenever lessons change, then commit and push the destination:
//  that is how lesson updates reach adopters.
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const args = process.argv.slice(2);
const DEST = path.resolve(args.find(a => !a.startsWith('--')) || path.join(ROOT, '..', 'foothold-courses-python'));
const BUILD = !args.includes('--no-build');
const DRAFT = args.includes('--draft');   // local check only: allows a missing signal address

// Removes a link (junction) itself, never what it points to.
function removeLink(p) {
  let st; try { st = fs.lstatSync(p); } catch { return false; }
  if (!st.isSymbolicLink()) return false;
  try { fs.rmdirSync(p); } catch { fs.unlinkSync(p); }
  return true;
}

// Never copied to adopters.
const EXCLUDE = [
  /^MED PYTHON LAB\//, /^Claude outputs\//, /^Teacher Dashboard\//, /^Teacher Adoption\//,
  /^Foothold python_branding\//, /^adopters\//, /^scripts\/make-adopter-copy\.mjs$/,
  /^src\/shell\/report\//, /^src\/shell\/LabCertificate\.jsx$/, /^src\/shell\/labCompletion\.js$/,
  /^src\/lessons\/UnitLAB/, /^src\/lessons_legacy\//,
  /^public\/miniproject-guide\.html$/, /^public\/fonts\/report\//, /^public\/brand\/sriher-logo\.png$/,
  /^public\/sitemap\.xml$/, /^SETUP_CHECKLIST\.md$/, /^README\.md$/,
];

// Must not appear anywhere in the copy.
const FORBIDDEN = [/SRIHER/i, /Sri Ramachandra/i, /SRFET/, /MED23CL202/i, /Nandakumar/i, /AKfycb/, /sriher-logo/i, /@adopters:/];
// The original site's address may appear only where it is the credit link.
const ORIGINAL_URL = /aishugithub\.github\.io\/course_python/;
const ORIGINAL_URL_OK = new Set(['config/course.config.js', 'LICENSE.md', 'README.md', 'TEACHERS_GUIDE.md']);

const TEXT = /\.(jsx?|mjs|cjs|gs|ya?ml|json|html?|md|css|txt|xml|svg)$/i;

function fail(msg) { console.error('\n✖ ' + msg + '\n'); process.exit(1); }

const signalFile = path.join(ROOT, 'adopters', 'signal-url.txt');
const SIGNAL_URL = fs.existsSync(signalFile) ? fs.readFileSync(signalFile, 'utf8').trim() : '';
if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(SIGNAL_URL)) {
  if (DRAFT) console.warn('! --draft: no signal address, so the usage signal is OFF in this copy. Do not publish it.');
  else fail('adopters/signal-url.txt must hold the Web app URL of the adoption receiver (see Teacher Adoption/AdoptionReceiver.gs). The usage signal is a licence condition, so the copy is not made without it.');
}

function transform(rel, text) {
  const out = [];
  let stripping = 0;
  text.split('\n').forEach((line, i) => {
    const where = `${rel}:${i + 1}`;
    if (line.includes('@adopters:strip-start')) { if (stripping) fail(`nested strip-start at ${where}`); stripping = i + 1; return; }
    if (line.includes('@adopters:strip-end')) { if (!stripping) fail(`strip-end without strip-start at ${where}`); stripping = 0; return; }
    if (stripping) return;
    if (line.includes('@adopters:strip-line')) return;
    const r = line.indexOf('@adopters:replace-with ');
    if (r >= 0) {
      const indent = line.match(/^\s*/)[0];
      const cr = line.endsWith('\r') ? '\r' : '';
      const repl = line.slice(r + '@adopters:replace-with '.length).replace(/\s*(\*\/\}?|-->)\s*$/, '').trim();
      out.push(indent + repl.replaceAll('{{SIGNAL_URL}}', SIGNAL_URL) + cr);
      return;
    }
    out.push(line);
  });
  if (stripping) fail(`strip-start at ${rel}:${stripping} is never closed`);
  return out.join('\n');
}

// 1. Files: tracked by git, minus the exclusions.
const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' }).split('\0').filter(Boolean);
const files = tracked.filter(f => !EXCLUDE.some(rx => rx.test(f)) && fs.existsSync(path.join(ROOT, f)));

// 2. Fresh destination (its .git folder, if any, is kept).
if (path.resolve(DEST) === ROOT) fail('destination is the course repository itself');
fs.mkdirSync(DEST, { recursive: true });
for (const entry of fs.readdirSync(DEST)) {
  if (entry === '.git') continue;
  if (removeLink(path.join(DEST, entry))) continue;
  fs.rmSync(path.join(DEST, entry), { recursive: true, force: true });
}

const problems = [];
const write = (rel, data) => {
  const to = path.join(DEST, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, data);
};
for (const rel of files) {
  const from = path.join(ROOT, rel);
  if (!TEXT.test(rel)) { write(rel, fs.readFileSync(from)); continue; }
  let text = transform(rel, fs.readFileSync(from, 'utf8'));
  if (rel === 'package.json') {
    const pkg = JSON.parse(text);
    delete pkg.homepage;
    pkg.name = 'foothold-python';
    text = JSON.stringify(pkg, null, 2) + '\n';
  }
  write(rel, text);
}
write('README.md', fs.readFileSync(path.join(ROOT, 'adopters', 'README.md'), 'utf8'));

// 3. Checks.
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(d =>
  d.name === '.git' || d.name === 'node_modules' || d.name === 'dist' ? [] :
  d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]);
for (const abs of walk(DEST)) {
  const rel = path.relative(DEST, abs).replace(/\\/g, '/');
  if (!TEXT.test(rel)) continue;
  const text = fs.readFileSync(abs, 'utf8');
  for (const rx of FORBIDDEN) if (rx.test(text)) problems.push(`${rel}: contains ${rx}`);
  if (ORIGINAL_URL.test(text) && !ORIGINAL_URL_OK.has(rel)) problems.push(`${rel}: contains the original site's address`);
  if (/from\s+['"][^'"]*(labCompletion|LabCertificate|\/report\/)/.test(text)) problems.push(`${rel}: imports a removed file`);
}
if (problems.length) fail('The copy still has institution-specific content:\n  ' + problems.join('\n  '));

let built = 'build skipped (--no-build)';
if (BUILD) {
  const link = path.join(DEST, 'node_modules');
  const madeLink = !fs.existsSync(link);
  if (madeLink) fs.symlinkSync(path.join(ROOT, 'node_modules'), link, 'junction');
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js'), 'build', '--outDir', path.join(DEST, 'dist'), '--emptyOutDir', '--logLevel', 'warn'],
      { cwd: DEST, stdio: 'inherit', env: { ...process.env, SITE_BASE: '/python/' } });
    built = 'site builds';
  } catch (e) {
    fail('the copy does not build (see the errors above)');
  } finally {
    if (madeLink) removeLink(link);
    fs.rmSync(path.join(DEST, 'dist'), { recursive: true, force: true });
  }
}

console.log(`✔ Adopters' copy written to ${DEST}`);
console.log(`  ${files.length + 1} files · no institution-specific content found · ${built}`);
console.log('  Next: review it, then commit and push that folder.');
