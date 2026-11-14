// ── Python runner client ──
// One shared worker for the whole app. runPython() resolves with the result,
// or with a Timeout error after `timeoutMs` of actual execution (package
// loading is not counted) — the stuck worker is killed and a fresh one starts.

let worker = null;
let status = "idle"; // idle | loading | ready | failed
let nextId = 1;
const pending = new Map();
const listeners = new Set();

function setStatus(s) {
  status = s;
  listeners.forEach((fn) => fn(s));
}

function spawn() {
  worker = new Worker(new URL("./python.worker.js", import.meta.url));
  setStatus("loading");
  worker.onmessage = (e) => {
    const m = e.data;
    if (m.type === "ready") return setStatus("ready");
    if (m.type === "loadError") return setStatus("failed");
    const job = pending.get(m.id);
    if (!job) return;
    if (m.type === "loadingPackages") job.onPhase?.("packages");
    else if (m.type === "started") {
      job.onPhase?.("running");
      job.timer = setTimeout(() => kill(m.id), job.timeoutMs);
    } else if (m.type === "result") {
      clearTimeout(job.timer);
      pending.delete(m.id);
      job.resolve(m);
    }
  };
  worker.onerror = () => setStatus("failed");
}

function kill(id) {
  const job = pending.get(id);
  worker?.terminate();
  worker = null;
  pending.forEach((j, jid) => {
    clearTimeout(j.timer);
    j.resolve({
      stdout: "",
      error: jid === id
        ? { type: "Timeout", msg: "The program ran too long and was stopped", line: null }
        : { type: "RunnerError", msg: "Runner restarted", line: null },
      static: [], post: [], vars: {}, images: [],
    });
  });
  pending.clear();
  if (job) spawn();
}

export function warmUp() {
  if (!worker) spawn();
}

export function onStatus(fn) {
  listeners.add(fn);
  fn(status);
  return () => listeners.delete(fn);
}

export function runPython(code, { inputs = [], post = "", requires = [], forbids = [], setup = "", timeoutMs = 5000, onPhase } = {}) {
  if (!worker) spawn();
  const id = nextId++;
  return new Promise((resolve) => {
    pending.set(id, { resolve, timeoutMs, onPhase, timer: null });
    worker.postMessage({ id, code, inputs, post, requires, forbids, setup });
  });
}
