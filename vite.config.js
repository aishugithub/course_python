import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// ── Course manifest ──
// Reads every lesson file and lists the programs a learner has to write in it
// (id, title, kind, optional). Two uses:
//   1. `virtual:foothold-manifest` — imported by the Dashboard, so it can show
//      "7 of 9 programs" per unit without loading the lessons themselves.
//   2. `course-manifest.json` — written next to the built site, so the teacher's
//      class dashboard (ClassDashboard.gs) knows the course's units and programs.
// It is rebuilt on every build, so it can never fall out of step with the lessons.
const LESSON_DIR = path.resolve('src/lessons')

function readExercises() {
  const out = {}
  for (const file of fs.readdirSync(LESSON_DIR).filter(f => f.endsWith('.jsx'))) {
    const src = fs.readFileSync(path.join(LESSON_DIR, file), 'utf8')
    if (!src.includes('kit/')) continue            // older click-through lessons have no typed programs
    const starts = [...src.matchAll(/\bid:\s*"([^"]+)",\s*kind:\s*"([a-z]+)"/g)]
    const list = starts.map((m, i) => {
      const body = src.slice(m.index, i + 1 < starts.length ? starts[i + 1].index : m.index + 4000)
      const title = body.match(/title:\s*"((?:[^"\\]|\\.)*)"/)
      return { id: m[1], kind: m[2], title: title ? title[1].replace(/\\(.)/g, '$1') : m[1], optional: /\boptional:\s*true\b/.test(body.slice(0, 400).split('task:')[0]) }
    })
    if (list.length) out[file.replace('.jsx', '')] = list
  }
  return out
}

function footholdManifest() {
  const ID = 'virtual:foothold-manifest'
  return {
    name: 'foothold-manifest',
    resolveId(id) { if (id === ID) return '\0' + ID },
    load(id) { if (id === '\0' + ID) return `export default ${JSON.stringify(readExercises())};` },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(LESSON_DIR.replace(/\\/g, '/')) || file.startsWith(LESSON_DIR)) {
        const mod = server.moduleGraph.getModuleById('\0' + ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
      }
    },
    async generateBundle() {
      const cfg = (await import(pathToFileURL(path.resolve('config/course.config.js')).href)).default
      const exercises = readExercises()
      const manifest = {
        courseId: cfg.courseId,
        courseTitle: cfg.courseTitle,
        modules: cfg.modules.filter(m => !m.hidden).map(m => ({
          moduleId: m.moduleId,
          title: m.moduleTitle,
          units: m.units.map(u => ({
            unitId: u.unitId,
            title: u.title,
            optional: !!u.optional,
            programs: (exercises[u.unitId] || []).filter(x => !x.optional).map(x => ({ id: x.id, title: x.title, kind: x.kind })),
          })),
        })),
      }
      this.emitFile({ type: 'asset', fileName: 'course-manifest.json', source: JSON.stringify(manifest) })
    },
  }
}

// The site's path on GitHub Pages is the repository's name. The deploy workflow
// passes it in (SITE_BASE), so a teacher who names their copy anything at all
// needs no change here. The fallback is used only for local builds.
export default defineConfig({
  plugins: [react(), footholdManifest()],
  base: process.env.SITE_BASE || '/course_python/',   // @adopters:replace-with base: process.env.SITE_BASE || '/foothold-python/',
})
