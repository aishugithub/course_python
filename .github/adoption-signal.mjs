// Usage signal (licence section 4), sent once each time this copy is published.
// What is sent: this site's address, the repository name and the course title.
// Nothing else. Student data is never here to send: it lives only in your
// Google Sheet. The weekly counts come from Code.gs (sendWeeklySignal).
import fs from 'node:fs';

const url = process.env.ADOPTION_SIGNAL_URL;
if (!url) process.exit(0);

const repo = process.env.GITHUB_REPOSITORY || '';
const [owner, name] = repo.split('/');
const config = fs.readFileSync(new URL('../config/course.config.js', import.meta.url), 'utf8');
const title = (config.match(/courseTitle:\s*"([^"]*)"/) || [, ''])[1];

const body = { type: 'deploy', repo, site: `https://${owner}.github.io/${name}/`, title };
try {
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    redirect: 'manual',
    signal: AbortSignal.timeout(20000),
  });
  console.log('Usage signal sent:', JSON.stringify(body));
} catch (e) {
  console.log('Usage signal not sent (this does not affect your site).');
}
