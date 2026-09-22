// Unit 10.3 — Methods & Encapsulation
// One Student class grows tab by tab (v1 → v5), then the whole program is traced,
// compared with C / C++ / Java, and transferred to a real banking class.
import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const mono = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap" };
const lead = { color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 };
const cardBox = (col) => ({ background: C.card, border: `1.5px solid ${col || C.border}`, borderRadius: 10, padding: 16 });
const tag = (col) => ({ color: col, fontWeight: 700, fontSize: 12, marginBottom: 10, letterSpacing: 0.3 });
const twoCol = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 };
const btn = (col, on) => ({
  padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 12.5,
  background: on ? col + "26" : C.card, border: `1.5px solid ${on ? col : C.border}`, color: on ? col : C.text,
  fontFamily: "monospace",
});
const insight = (color, children) => (
  <div style={{ marginTop: 16, background: color + "18", border: `1px solid ${color}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
    🔑 {children}
  </div>
);
const gradeOf = (m) => (m >= 90 ? "A" : m >= 75 ? "B" : m >= 50 ? "C" : "F");

// ── The growing Student class (single source of truth for every tab) ──
// v1 = end of 10.2, v2 + grade(), v3 + __str__, v4 + set_mark guard, v5 _mark + get_mark
const CLASS_LINES = [
  { t: "class Student:", v: 1 },
  { t: "    def __init__(self, name, mark):", v: 1 },
  { t: "        self.name = name", v: 1 },
  { t: "        self.mark = mark", v: 1, to: 3 },
  { t: "        self.set_mark(mark)", v: 4, chg: true },
  { t: "", v: 2 },
  { t: "    def grade(self):", v: 2 },
  { t: "        if self.mark >= 90:", v: 2 },
  { t: '            return "A"', v: 2 },
  { t: "        elif self.mark >= 75:", v: 2 },
  { t: '            return "B"', v: 2 },
  { t: "        elif self.mark >= 50:", v: 2 },
  { t: '            return "C"', v: 2 },
  { t: '        return "F"', v: 2 },
  { t: "", v: 3 },
  { t: "    def __str__(self):", v: 3 },
  { t: '        return self.name + ": " + str(self.mark) + " (" + self.grade() + ")"', v: 3 },
  { t: "", v: 4 },
  { t: "    def set_mark(self, m):", v: 4 },
  { t: "        if m < 0 or m > 100:", v: 4 },
  { t: '            raise ValueError("mark must be 0-100")', v: 4 },
  { t: "        self.mark = m", v: 4 },
  { t: "", v: 5 },
  { t: "    def get_mark(self):", v: 5 },
  { t: "        return self.mark", v: 5 },
];

const classAt = (ver) =>
  CLASS_LINES.filter((l) => l.v <= ver && (!l.to || ver <= l.to)).map((l) => {
    let t = l.t;
    let state = l.v === ver ? (l.chg ? "chg" : "new") : "old";
    if (ver >= 5 && t.includes("self.mark")) {
      t = t.split("self.mark").join("self._mark");
      if (state === "old") state = "chg";
    }
    return { t, state, v: l.v };
  });

const USAGE = {
  1: { code: 'asha = Student("Asha", 85)\nprint(asha.name, asha.mark)', out: "Asha 85" },
  2: { code: 'asha = Student("Asha", 85)\nprint(asha.grade())', out: "B" },
  3: { code: 'asha = Student("Asha", 85)\nprint(asha)', out: "Asha: 85 (B)" },
  4: { code: 'asha = Student("Asha", 85)\nasha.set_mark(150)', out: "Traceback (most recent call last):\n  ...\nValueError: mark must be 0-100", err: true },
  5: { code: 'asha = Student("Asha", 85)\nprint(asha.get_mark())', out: "85" },
};

const VERSION_NOTE = {
  1: "v1 — where Unit 10.2 left us: data only.",
  2: "v2 — + grade(): the object can now DO something with its data.",
  3: "v3 — + __str__: the object can describe itself (and it reuses grade()).",
  4: "v4 — + set_mark: every change to mark goes through a guard. __init__ uses it too.",
  5: "v5 — mark becomes _mark (private by convention) + get_mark() to read it.",
};

function GrowingClass({ version, title }) {
  const [open, setOpen] = useState(true);
  const lines = classAt(version);
  const u = USAGE[version];
  return (
    <div style={{ ...cardBox(C.accent + "55"), marginBottom: 16 }}>
      <div onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <span style={{ background: C.accentGlow, color: "#fff", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>v{version}</span>
        <span style={{ color: C.accent, fontWeight: 700, fontSize: 12.5 }}>{title || "📜 Our Student class so far"}</span>
        <span style={{ marginLeft: "auto", color: C.muted, fontSize: 11 }}>{open ? "▲ hide" : "▼ show"}</span>
      </div>
      {open && (
        <>
          <div style={{ color: C.muted, fontSize: 11.5, margin: "8px 0 10px" }}>{VERSION_NOTE[version]}</div>
          <div style={{ overflowX: "auto" }}>
            {lines.map((l, i) => (
              <div key={i} style={{
                display: "flex", fontFamily: "monospace", fontSize: 12, lineHeight: 1.75, whiteSpace: "pre",
                background: l.state === "new" ? C.green + "1c" : l.state === "chg" ? C.yellow + "1c" : "transparent",
                borderLeft: `3px solid ${l.state === "new" ? C.green : l.state === "chg" ? C.yellow : "transparent"}`,
              }}>
                <span style={{ width: 18, textAlign: "center", color: l.state === "new" ? C.green : C.yellow, flexShrink: 0 }}>
                  {l.state === "new" ? "+" : l.state === "chg" ? "~" : ""}
                </span>
                <span style={{ color: l.state === "old" ? C.muted : C.text }}>{l.t || " "}</span>
              </div>
            ))}
          </div>
          <div style={{ ...twoCol, marginTop: 10 }}>
            <pre style={{ ...mono, fontSize: 12, background: C.surface, borderRadius: 8, padding: 10 }}>{u.code}</pre>
            <pre style={{ ...mono, fontSize: 12, background: C.surface, borderRadius: 8, padding: 10, color: u.err ? C.red : C.green }}>{u.out}</pre>
          </div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 8 }}>
            <span style={{ color: C.green }}>+ new line</span> &nbsp; <span style={{ color: C.yellow }}>~ changed line</span> &nbsp; grey = already built
          </div>
        </>
      )}
    </div>
  );
}

// ── Widget 1: Need — free function vs method ──
function NeedWidget() {
  const [mark, setMark] = useState(85);
  const [wrong, setWrong] = useState(false);

  return (
    <div>
      <p style={lead}>
        At the end of Unit 10.2 our Student holds data but can't <em>do</em> anything. To get a grade you'd write a
        separate function (Unit 8.2 style) and hand it the mark. Drag the mark, then try passing the wrong field.
      </p>

      <div style={{ marginBottom: 14 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>asha.mark = <strong style={{ color: C.accent }}>{mark}</strong></label>
        <input type="range" min={0} max={100} value={mark} onChange={(e) => setMark(Number(e.target.value))} style={{ width: "100%", accentColor: C.accent }} />
      </div>
      <button onClick={() => setWrong((w) => !w)} style={{ ...btn(C.red, wrong), marginBottom: 14 }}>
        {wrong ? "◀ Pass the right field" : "▶ What if someone passes asha.name by mistake?"}
      </button>

      <div style={twoCol}>
        <div style={cardBox(C.orange + "55")}>
          <div style={tag(C.orange)}>🔧 SEPARATE FUNCTION (v1 + a def)</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

def grade(mark):
    if mark >= 90:
        return "A"
    elif mark >= 75:
        return "B"
    elif mark >= 50:
        return "C"
    return "F"

asha = Student("Asha", ${mark})
print(grade(asha.${wrong ? "name" : "mark"}))`}</pre>
          <pre style={{ ...mono, fontSize: 11.5, marginTop: 8, color: wrong ? C.red : C.green }}>
            {wrong ? "TypeError: '>=' not supported between\ninstances of 'str' and 'int'" : "→ " + gradeOf(mark)}
          </pre>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 6 }}>The caller must fetch the right data and pass it in. Get it wrong → crash.</div>
        </div>
        <div style={cardBox(C.green + "55")}>
          <div style={tag(C.green)}>🧩 A METHOD (v2)</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{`class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def grade(self):
        if self.mark >= 90:
            return "A"
        elif self.mark >= 75:
            return "B"
        elif self.mark >= 50:
            return "C"
        return "F"

asha = Student("Asha", ${mark})
print(asha.grade())`}</pre>
          <pre style={{ ...mono, fontSize: 11.5, marginTop: 8, color: C.green }}>{"→ " + gradeOf(mark)}</pre>
          <div style={{ color: C.green, fontSize: 11.5, marginTop: 6 }}>The method fetches self.mark itself. Nothing to pass, nothing to get wrong.</div>
        </div>
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>A method is a function that lives inside a class</strong> and works on the
        object's own data through self. <code style={{ color: C.teal }}>asha.grade()</code> reads like "Asha, grade
        yourself." The behaviour now travels with the data it needs.
      </>)}
    </div>
  );
}

// ── Widget 2: Anatomy + which object is self? + C contrast ──
function AnatomyWidget() {
  const [sel, setSel] = useState(0);
  const [who, setWho] = useState(null);
  const [showC, setShowC] = useState(false);
  const objs = { asha: { name: "Asha", mark: 85 }, ravi: { name: "Ravi", mark: 62 } };

  const parts = [
    { text: "    def grade(self):", color: C.accent, title: "def ...(self)", body: "A method is a def written INSIDE the class (indented under it). Its first parameter is always self — the object it will work on. Exactly like __init__ in 10.2." },
    { text: "\n        if self.mark >= 90:\n            return \"A\"\n        elif self.mark >= 75:\n            return \"B\"\n        elif self.mark >= 50:\n            return \"C\"", color: C.teal, title: "self.mark — this object's own data", body: "self.mark reads the mark slot of whichever object the method was called on. It's the same if/elif chain from Unit 5.2 — only the data source changed." },
    { text: "\n        return \"F\"", color: C.green, title: "return the result", body: "A method returns a value like any function (Unit 8.2). The caller receives the letter." },
    { text: "\n\nasha.grade()", color: C.purple, title: "calling it: obj.method()", body: "Empty brackets, yet self gets filled. Python rewrites asha.grade() as Student.grade(asha) — the object before the dot becomes self. (You can literally type Student.grade(asha) and it works.)" },
  ];

  return (
    <div>
      <GrowingClass version={2} />
      <p style={lead}>Click each part of the new method. Then call it on two different objects and watch who self becomes.</p>

      <div style={{ ...cardBox(), marginBottom: 12 }}>
        <pre style={{ ...mono, fontSize: 13 }}>
          <span style={{ color: C.muted }}>{"class Student:\n    def __init__(self, name, mark):\n        self.name = name\n        self.mark = mark\n\n"}</span>
          {parts.map((p, i) => (
            <span key={i} onClick={() => setSel(i)} style={{
              color: p.color, cursor: "pointer", fontWeight: sel === i ? 800 : 500,
              background: sel === i ? p.color + "26" : "transparent", borderRadius: 4,
            }}>{p.text}</span>
          ))}
        </pre>
      </div>
      <div style={{ background: C.surface, border: `1.5px solid ${parts[sel].color}55`, borderRadius: 10, padding: 14, marginBottom: 18 }}>
        <div style={{ color: parts[sel].color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{parts[sel].title}</div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{parts[sel].body}</div>
      </div>

      <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Which object is self?</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <button onClick={() => setWho("asha")} style={btn(C.purple, who === "asha")}>asha.grade()</button>
        <button onClick={() => setWho("ravi")} style={btn(C.purple, who === "ravi")}>ravi.grade()</button>
      </div>
      <div style={twoCol}>
        {Object.keys(objs).map((k) => (
          <div key={k} style={{ ...cardBox(who === k ? C.teal : C.border), opacity: who && who !== k ? 0.45 : 1, transition: "all 0.25s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: C.teal, fontWeight: 700, fontSize: 12, fontFamily: "monospace" }}>{k}</span>
              {who === k && <span style={{ color: C.purple, fontSize: 11, fontWeight: 700 }}>◀ self</span>}
            </div>
            {["name", "mark"].map((f) => (
              <div key={f} style={{ display: "flex", justifyContent: "space-between", border: `1.5px solid ${C.teal}66`, borderRadius: 6, padding: "4px 10px", marginBottom: 6, fontFamily: "monospace", fontSize: 12.5 }}>
                <span style={{ color: C.muted }}>.{f}</span><span style={{ color: C.text }}>{f === "name" ? '"' + objs[k][f] + '"' : objs[k][f]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {who && (
        <pre style={{ ...mono, marginTop: 10, background: C.surface, borderRadius: 8, padding: 10 }}>
          <span style={{ color: C.muted }}>{who}.grade()  →  Python runs  </span><span style={{ color: C.purple }}>{"Student.grade(" + who + ")"}</span>
          <span style={{ color: C.muted }}>{"\nself.mark is " + objs[who].mark + "  →  returns "}</span><span style={{ color: C.green }}>{'"' + gradeOf(objs[who].mark) + '"'}</span>
        </pre>
      )}

      <button onClick={() => setShowC((s) => !s)} style={{ ...btn(C.orange, showC), marginTop: 16 }}>
        {showC ? "◀ Hide C" : "⚙️ How would C do this?"}
      </button>
      {showC && (
        <div style={{ ...twoCol, marginTop: 12 }}>
          <div style={cardBox(C.orange + "55")}>
            <div style={tag(C.orange)}>⚙️ C — you pass the object yourself</div>
            <pre style={{ ...mono, fontSize: 11.5 }}>{`struct Student { char name[20]; int mark; };

char grade(struct Student *s) {
    if (s->mark >= 90) return 'A';
    if (s->mark >= 75) return 'B';
    if (s->mark >= 50) return 'C';
    return 'F';
}

grade(&asha);   /* hand over a pointer */`}</pre>
          </div>
          <div style={cardBox(C.accent + "55")}>
            <div style={tag(C.accent)}>🐍 Python — the dot does it for you</div>
            <pre style={{ ...mono, fontSize: 11.5 }}>{`class Student:
    def grade(self):
        if self.mark >= 90:
            return "A"
        ...

asha.grade()    # self = asha, automatically`}</pre>
          </div>
        </div>
      )}

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>obj.method() is method(obj) in disguise.</strong> C programmers pass a pointer
        to the struct by hand (<code>s-&gt;mark</code>); Python passes the object in as self for you. One method, many
        objects — each call works on whichever object is before the dot.
      </>)}
    </div>
  );
}

// ── Widget 3: __str__ ──
function StrWidget() {
  const [nice, setNice] = useState(true);
  const [where, setWhere] = useState(0);
  const [broken, setBroken] = useState(false);

  const uses = [
    { code: "print(asha)", out: "Asha: 85 (B)", note: "print() needs text, so it calls asha.__str__() for you." },
    { code: "s = str(asha)\nprint(len(s))", out: "12", note: "str(asha) also calls __str__. Now it's an ordinary string: \"Asha: 85 (B)\" has 12 characters." },
    { code: 'print("Topper: " + str(asha))', out: "Topper: Asha: 85 (B)", note: "Joining with + needs a string (Unit 4.4), so wrap the object in str()." },
  ];

  return (
    <div>
      <GrowingClass version={3} />
      <p style={lead}>
        <code style={{ color: C.accent }}>__str__</code> is a special method — like __init__, Python calls it for you.
        Its one job: <strong style={{ color: C.text }}>return a string</strong> describing the object. Toggle it off to see
        what print shows without it.
      </p>

      <button onClick={() => setNice((b) => !b)} style={{ ...btn(C.green, nice), marginBottom: 12 }}>
        {nice ? "◀ Remove __str__" : "▶ Add __str__ back"}
      </button>
      <div style={twoCol}>
        <div style={cardBox()}>
          <div style={tag(C.accent)}>🐍 CODE</div>
          <pre style={{ ...mono, fontSize: 11.5 }}>{nice
            ? `    def __str__(self):
        return self.name + ": " + str(self.mark) + " (" + self.grade() + ")"

asha = Student("Asha", 85)
print(asha)`
            : `    # (no __str__ defined)

asha = Student("Asha", 85)
print(asha)`}</pre>
        </div>
        <div style={cardBox(nice ? C.green + "55" : C.red + "55")}>
          <div style={tag(nice ? C.green : C.red)}>▶ OUTPUT</div>
          <pre style={{ ...mono, color: nice ? C.green : C.red }}>{nice ? "Asha: 85 (B)" : "<__main__.Student object\n at 0x7f3a9c1e2050>"}</pre>
          <div style={{ color: C.muted, fontSize: 11.5, marginTop: 8, lineHeight: 1.6 }}>
            {nice ? "Notice self.grade() inside __str__ — a method calling another method on the same object."
              : "The default: the class name and a memory address. True, but useless to a human."}
          </div>
        </div>
      </div>

      <div style={{ color: C.text, fontWeight: 600, fontSize: 13, margin: "18px 0 10px" }}>Where does Python call __str__?</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {uses.map((u, i) => (
          <button key={i} onClick={() => setWhere(i)} style={btn(C.teal, where === i)}>{u.code.split("\n")[0]}</button>
        ))}
      </div>
      <div style={twoCol}>
        <pre style={{ ...mono, background: C.surface, borderRadius: 8, padding: 10 }}>{uses[where].code}</pre>
        <pre style={{ ...mono, background: C.surface, borderRadius: 8, padding: 10, color: C.green }}>{uses[where].out}</pre>
      </div>
      <div style={{ color: C.muted, fontSize: 12, marginTop: 6 }}>{uses[where].note}</div>

      <button onClick={() => setBroken((b) => !b)} style={{ ...btn(C.red, broken), marginTop: 18 }}>
        {broken ? "◀ Fix it" : "▶ Gotcha: what if __str__ returns the number?"}
      </button>
      <div style={{ ...twoCol, marginTop: 10 }}>
        <pre style={{ ...mono, fontSize: 11.5, background: C.surface, borderRadius: 8, padding: 10, border: `1px solid ${broken ? C.red : C.green}55` }}>{broken
          ? `    def __str__(self):
        return self.mark      # an int!`
          : `    def __str__(self):
        return str(self.mark)  # a string ✓`}</pre>
        <pre style={{ ...mono, fontSize: 11.5, background: C.surface, borderRadius: 8, padding: 10, color: broken ? C.red : C.green }}>{broken
          ? "print(asha)\nTypeError: __str__ returned\nnon-string (type int)"
          : "print(asha)\n85"}</pre>
      </div>

      {insight(C.teal, <>
        <strong style={{ color: C.teal }}>__str__ decides what print() and str() show — and it must return a string.</strong>{" "}
        Build it with + and str() exactly as you built output lines in Module 4. It's the same idea as Java's
        toString(), which you'll meet two tabs from now.
      </>)}
    </div>
  );
}

// ── Widget 4: Encapsulation — the guard method ──
function EncapsulationWidget() {
  const [val, setVal] = useState(120);
  const [stored, setStored] = useState(85);
  const [log, setLog] = useState([]);

  const bad = val < 0 || val > 100;
  const corrupted = stored < 0 || stored > 100;

  const direct = () => {
    setStored(val);
    setLog((l) => [{ code: "asha.mark = " + val, res: bad ? "runs silently — no check at all" : "runs", ok: !bad }, ...l].slice(0, 4));
  };
  const guarded = () => {
    if (bad) setLog((l) => [{ code: "asha.set_mark(" + val + ")", res: "ValueError: mark must be 0-100", ok: false, guard: true }, ...l].slice(0, 4));
    else {
      setStored(val);
      setLog((l) => [{ code: "asha.set_mark(" + val + ")", res: "accepted", ok: true }, ...l].slice(0, 4));
    }
  };
  const reset = () => { setStored(85); setLog([]); };

  return (
    <div>
      <GrowingClass version={4} />
      <p style={lead}>
        v4 adds a <strong style={{ color: C.text }}>guard method</strong>: set_mark checks the value and raises a
        ValueError (Unit 9.2) if it's impossible. Even __init__ now uses it, so a Student can never be <em>born</em> with
        a bad mark. But the old door is still open. Pick a value and try both doors.
      </p>

      <div style={{ marginBottom: 12 }}>
        <label style={{ color: C.muted, fontSize: 12 }}>value = <strong style={{ color: bad ? C.red : C.green }}>{val}</strong></label>
        <input type="range" min={-20} max={150} value={val} onChange={(e) => setVal(Number(e.target.value))} style={{ width: "100%", accentColor: bad ? C.red : C.green }} />
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <button onClick={direct} style={btn(C.orange, true)}>🚪 asha.mark = {val}</button>
        <button onClick={guarded} style={btn(C.green, true)}>🛡️ asha.set_mark({val})</button>
        <button onClick={reset} style={btn(C.muted, false)}>↺ Reset</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
        <div style={cardBox(corrupted ? C.red : C.teal)}>
          <div style={tag(C.teal)}>OBJECT STATE</div>
          <div style={{ fontSize: 10, color: C.muted }}>asha.mark</div>
          <div style={{ border: `2px solid ${corrupted ? C.red : C.teal}`, borderRadius: 8, padding: 8, fontFamily: "monospace", fontSize: 18, background: C.surface, color: corrupted ? C.red : C.text, fontWeight: 700, textAlign: "center" }}>{stored}</div>
          <div style={{ fontFamily: "monospace", fontSize: 12.5, marginTop: 10, color: corrupted ? C.red : C.green }}>
            print(asha) → Asha: {stored} ({gradeOf(stored)})
          </div>
          {corrupted && <div style={{ color: C.red, fontSize: 11.5, marginTop: 6 }}>⚠️ Corrupted! {stored > 100 ? "More than full marks — and it earns an A." : "A negative mark."}</div>}
        </div>
        <div style={cardBox()}>
          <div style={tag(C.accent)}>▶ WHAT HAPPENED</div>
          {log.length === 0 && <div style={{ color: C.muted, fontSize: 12 }}>Try a door…</div>}
          {log.map((e, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 11.5, marginBottom: 8, opacity: i === 0 ? 1 : 0.55 }}>
              <div style={{ color: C.text }}>{e.code}</div>
              <div style={{ color: e.ok ? C.green : e.guard ? C.yellow : C.red }}>{e.ok ? "✓ " : e.guard ? "🛡️ " : "✗ "}{e.res}</div>
            </div>
          ))}
        </div>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Encapsulation = the object controls how its own data changes.</strong> The
        rule "0 to 100" lives inside the class, next to the data it protects. But a guard only works if everyone uses the
        guarded door — so how do we tell other programmers to stay away from <code>.mark</code>? Next tab.
      </>)}
    </div>
  );
}

// ── Widget 5: Private by convention ──
function PrivateWidget() {
  const [pick, setPick] = useState(1);
  const opts = [
    {
      name: "mark", color: C.red, label: "Public",
      def: "self.mark = m",
      tries: [["asha.mark = 999", "✓ runs — guard bypassed, nobody warned"], ["print(asha.mark)", "999"]],
      verdict: "Nothing signals that .mark is off-limits. Every programmer who touches it can skip set_mark.",
    },
    {
      name: "_mark", color: C.yellow, label: "Private by convention",
      def: "self._mark = m",
      tries: [["asha._mark = 999", "⚠ still runs — but editors and linters flag it,\n  and every Python reader knows a rule was broken"], ["print(asha.get_mark())", "85  ← the polite way to read it"]],
      verdict: "One leading underscore means \"internal — use the methods\". Python's style guide (PEP 8) defines this meaning, and the whole community honours it. This is what our v5 uses.",
    },
    {
      name: "__mark", color: C.purple, label: "Name-mangled",
      def: "self.__mark = m",
      tries: [["print(asha.__mark)", "AttributeError: 'Student' object\n  has no attribute '__mark'"], ["print(asha._Student__mark)", "85  ← Python renamed it; still reachable"]],
      verdict: "Two underscores make Python quietly rename the attribute to _Student__mark. It's designed to stop name clashes in child classes (Unit 10.4), not to be a lock.",
    },
  ];
  const o = opts[pick];

  return (
    <div>
      <GrowingClass version={5} />
      <p style={lead}>
        Java and C++ have a <code>private</code> keyword that the compiler enforces. Python doesn't. Instead it uses a
        naming signal. Pick a naming style and see what an outsider can do.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        {opts.map((x, i) => (
          <button key={i} onClick={() => setPick(i)} style={btn(x.color, pick === i)}>{x.name} · {x.label}</button>
        ))}
      </div>
      <div style={twoCol}>
        <div style={cardBox(o.color + "55")}>
          <div style={tag(o.color)}>INSIDE THE CLASS</div>
          <pre style={{ ...mono, fontSize: 12 }}>{"    def set_mark(self, m):\n        ...\n        " + o.def}</pre>
        </div>
        <div style={cardBox(o.color + "55")}>
          <div style={tag(o.color)}>OUTSIDE CODE TRIES…</div>
          {o.tries.map(([c, r], i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 11.5, marginBottom: 8, whiteSpace: "pre-wrap" }}>
              <div style={{ color: C.text }}>{c}</div>
              <div style={{ color: o.color }}>{r}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ color: C.muted, fontSize: 12.5, marginTop: 10, lineHeight: 1.7 }}>{o.verdict}</div>

      <div style={{ ...cardBox(C.green + "44"), marginTop: 16 }}>
        <div style={tag(C.green)}>THE PUBLIC INTERFACE OF v5</div>
        <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 1.9, color: C.text }}>
          Student("Asha", 85) &nbsp;·&nbsp; asha.set_mark(m) &nbsp;·&nbsp; asha.get_mark() &nbsp;·&nbsp; asha.grade() &nbsp;·&nbsp; print(asha)
        </div>
        <div style={{ color: C.muted, fontSize: 11.5, marginTop: 6 }}>Outsiders use these five things. How the mark is stored inside is the class's own business — and can change without breaking anyone.</div>
      </div>

      {insight(C.yellow, <>
        <strong style={{ color: C.yellow }}>Java and C++ lock the door; Python puts up a sign.</strong> A saying in the
        Python community sums it up: "we're all consenting adults here." Encapsulation is first a design discipline —
        the keyword is just one way to enforce it. (Module 11 shows a neater getter trick, @property.)
      </>)}
    </div>
  );
}

// ── Widget 6: The Whole Thing — full program trace ──
const ORIGIN = {
  1: { label: "10.2 __init__", color: C.teal },
  2: { label: "grade()", color: C.accent },
  3: { label: "__str__", color: C.green },
  4: { label: "set_mark guard", color: C.purple },
  5: { label: "_mark + getter", color: C.orange },
  9: { label: "try/except (M9)", color: C.yellow },
};
const FINAL = classAt(5).map((l) => ({ t: l.t, v: l.v })).concat([
  { t: "", v: 1 },
  { t: 'asha = Student("Asha", 85)', v: 1 },
  { t: 'ravi = Student("Ravi", 62)', v: 1 },
  { t: "print(asha)", v: 3 },
  { t: "ravi.set_mark(78)", v: 4 },
  { t: "print(ravi)", v: 3 },
  { t: "try:", v: 9 },
  { t: "    asha.set_mark(150)", v: 4 },
  { t: "except ValueError as e:", v: 9 },
  { t: '    print("Rejected:", e)', v: 9 },
  { t: "print(asha.get_mark())", v: 5 },
]);
const L = (s) => FINAL.findIndex((l) => l.t.trim() === s);

const TRACE = [
  { line: 'asha = Student("Asha", 85)', self: "asha", a: ["—", "—"], r: null, say: 'Student("Asha", 85): Python builds a blank object and calls __init__ with self = that new object.' },
  { line: "self.name = name", self: "asha", a: ['"Asha"', "—"], r: null, say: 'self is asha, so asha\'s name slot gets "Asha".' },
  { line: "self.set_mark(mark)", self: "asha", a: ['"Asha"', "—"], r: null, say: "__init__ doesn't store the mark directly — it calls self.set_mark(85). Even the constructor goes through the guard." },
  { line: "if m < 0 or m > 100:", self: "asha", a: ['"Asha"', "—"], r: null, check: false, say: "Is 85 < 0 or 85 > 100? False — a legal mark." },
  { line: "self._mark = m", self: "asha", a: ['"Asha"', "85"], r: null, say: "asha._mark = 85. Back in __init__ there's nothing left to do: asha is born." },
  { line: 'ravi = Student("Ravi", 62)', self: "ravi", a: ['"Asha"', "85"], r: ['"Ravi"', "62"], say: "Same journey for ravi (condensed): name stored, set_mark(62) checks and stores. A second, separate cluster of slots." },
  { line: "print(asha)", self: "asha", a: ['"Asha"', "85"], r: ['"Ravi"', "62"], say: "print needs text, so Python calls asha.__str__() — self is asha." },
  { line: 'return self.name + ": " + str(self._mark) + " (" + self.grade() + ")"', self: "asha", a: ['"Asha"', "85"], r: ['"Ravi"', "62"], say: "__str__ starts building the string and needs self.grade() — one method calling another on the same object." },
  { line: "elif self._mark >= 75:", self: "asha", a: ['"Asha"', "85"], r: ['"Ravi"', "62"], check: true, say: 'Inside grade(): 85 >= 90? No. 85 >= 75? Yes → return "B".' },
  { line: 'return self.name + ": " + str(self._mark) + " (" + self.grade() + ")"', self: "asha", a: ['"Asha"', "85"], r: ['"Ravi"', "62"], out: "Asha: 85 (B)", say: 'grade() hands back "B"; __str__ returns "Asha: 85 (B)" and print shows it.' },
  { line: "ravi.set_mark(78)", self: "ravi", a: ['"Asha"', "85"], r: ['"Ravi"', "62"], say: "ravi.set_mark(78) is Student.set_mark(ravi, 78) — this time self is ravi." },
  { line: "if m < 0 or m > 100:", self: "ravi", a: ['"Asha"', "85"], r: ['"Ravi"', "62"], check: false, say: "Is 78 out of range? False." },
  { line: "self._mark = m", self: "ravi", a: ['"Asha"', "85"], r: ['"Ravi"', "78"], say: "ravi's _mark is overwritten: 62 → 78. asha's slots are untouched." },
  { line: "print(ravi)", self: "ravi", a: ['"Asha"', "85"], r: ['"Ravi"', "78"], out: "Ravi: 78 (B)", say: '__str__ and grade() run again with self = ravi → "Ravi: 78 (B)".' },
  { line: "asha.set_mark(150)", self: "asha", a: ['"Asha"', "85"], r: ['"Ravi"', "78"], say: "Inside a try block (Module 9): asha.set_mark(150)." },
  { line: "if m < 0 or m > 100:", self: "asha", a: ['"Asha"', "85"], r: ['"Ravi"', "78"], check: true, say: "150 > 100 → True. Trouble." },
  { line: 'raise ValueError("mark must be 0-100")', self: "asha", a: ['"Asha"', "85"], r: ['"Ravi"', "78"], say: "raise stops set_mark instantly. self._mark = m never runs — asha still holds 85." },
  { line: 'print("Rejected:", e)', self: null, a: ['"Asha"', "85"], r: ['"Ravi"', "78"], out: "Rejected: mark must be 0-100", say: "except ValueError catches it; e carries the message. The program keeps running." },
  { line: "print(asha.get_mark())", self: "asha", a: ['"Asha"', "85"], r: ['"Ravi"', "78"], out: "85", say: "Outsiders read through the getter. The guard held: 85, not 150." },
];

function WholeWidget() {
  const [step, setStep] = useState(-1);
  const [byOrigin, setByOrigin] = useState(false);
  const cur = step >= 0 ? TRACE[step] : null;
  const curLine = cur ? L(cur.line) : -1;
  const out = TRACE.slice(0, step + 1).filter((s) => s.out).map((s) => s.out);

  const Obj = ({ name, vals }) => (
    <div style={{ border: `1.5px solid ${cur && cur.self === name ? C.purple : C.teal + "66"}`, borderRadius: 8, padding: 8, marginBottom: 8, background: cur && cur.self === name ? C.purple + "12" : "transparent" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "monospace", marginBottom: 4 }}>
        <span style={{ color: C.teal, fontWeight: 700 }}>{name}</span>
        {cur && cur.self === name && <span style={{ color: C.purple, fontWeight: 700 }}>◀ self</span>}
      </div>
      {vals ? ["name", "_mark"].map((f, i) => (
        <div key={f} style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 11.5, border: `1px solid ${C.teal}55`, borderRadius: 5, padding: "2px 8px", marginBottom: 4 }}>
          <span style={{ color: C.muted }}>.{f}</span><span style={{ color: C.text }}>{vals[i]}</span>
        </div>
      )) : <div style={{ color: C.muted, fontSize: 11 }}>not created yet</div>}
    </div>
  );

  return (
    <div>
      <p style={lead}>
        Here is everything from this unit in one runnable program — the v5 class plus code that uses every part of it.
        Step through it and watch self jump between objects. Toggle colours to see which tab each line came from.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <button onClick={() => setStep((s) => Math.min(TRACE.length - 1, s + 1))} style={btn(C.accent, true)}>Step ▶ ({step + 1} / {TRACE.length})</button>
        <button onClick={() => setStep(-1)} style={btn(C.muted, false)}>↺ Reset</button>
        <button onClick={() => setByOrigin((b) => !b)} style={btn(C.yellow, byOrigin)}>{byOrigin ? "🎨 Colour by origin: ON" : "🎨 Colour by origin"}</button>
      </div>
      {byOrigin && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          {Object.keys(ORIGIN).map((k) => (
            <span key={k} style={{ fontSize: 11, color: ORIGIN[k].color, border: `1px solid ${ORIGIN[k].color}66`, borderRadius: 5, padding: "1px 7px" }}>■ {ORIGIN[k].label}</span>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
        <div style={{ ...cardBox(), overflowX: "auto", padding: 10 }}>
          {FINAL.map((l, i) => (
            <div key={i} style={{
              display: "flex", fontFamily: "monospace", fontSize: 11.5, lineHeight: 1.7, whiteSpace: "pre",
              background: i === curLine ? C.accent + "26" : "transparent",
              borderLeft: `3px solid ${i === curLine ? C.accent : byOrigin && l.t ? ORIGIN[l.v].color : "transparent"}`,
            }}>
              <span style={{ width: 22, textAlign: "right", color: C.muted, marginRight: 8, flexShrink: 0 }}>{i === curLine ? "▶" : i + 1}</span>
              <span style={{ color: byOrigin && l.t ? ORIGIN[l.v].color : i === curLine ? C.text : C.muted }}>{l.t || " "}</span>
            </div>
          ))}
        </div>

        <div>
          <div style={{ ...cardBox(), marginBottom: 10, padding: 12 }}>
            <div style={tag(C.teal)}>MEMORY — two objects</div>
            <Obj name="asha" vals={cur ? cur.a : null} />
            <Obj name="ravi" vals={cur ? cur.r : null} />
          </div>
          <div style={{ ...cardBox(), marginBottom: 10, padding: 12 }}>
            <div style={tag(C.yellow)}>CONDITION CHECK</div>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: cur && cur.check === true ? C.green : cur && cur.check === false ? C.red : C.muted }}>
              {cur && cur.check === true ? "True ✓" : cur && cur.check === false ? "False ✗" : "—"}
            </div>
          </div>
          <div style={{ ...cardBox(), padding: 12 }}>
            <div style={tag(C.green)}>OUTPUT</div>
            <pre style={{ ...mono, color: C.green, fontSize: 12 }}>{out.join("\n") || " "}</pre>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", color: C.text, fontSize: 13, lineHeight: 1.6, minHeight: 44 }}>
        {cur ? cur.say : "Press Step ▶ to run the program line by line."}
      </div>

      {insight(C.accent, <>
        <strong style={{ color: C.accent }}>One class, five tools, two independent objects.</strong> __init__ builds,
        set_mark guards, get_mark reads, grade computes, __str__ describes. The code outside the class never touches
        _mark directly — that's encapsulation doing its job.
      </>)}
    </div>
  );
}

// ── Widget 7: Python vs C vs C++ vs Java ──
const LANG_CODE = {
  C: { color: C.orange, code: `struct Student {
    char name[20];
    int mark;
};

void set_mark(struct Student *s, int m) {
    if (m >= 0 && m <= 100)
        s->mark = m;
}

/* ...but nothing stops this: */
asha.mark = 999;        /* compiles fine! */`, note: "Data (struct) and functions are separate. No way to hide mark." },
  "C++": { color: C.purple, code: `class Student {
private:
    string name;
    int mark;
public:
    Student(string n, int m) { name = n; setMark(m); }
    void setMark(int m) {
        if (m < 0 || m > 100)
            throw invalid_argument("mark must be 0-100");
        mark = m;
    }
    int getMark() { return mark; }
};

asha.mark = 999;   // ✗ compile error: 'mark' is private`, note: "private: is enforced by the compiler — the bad line never even builds." },
  Java: { color: C.red, code: `public class Student {
    private String name;
    private int mark;

    public Student(String name, int mark) {
        this.name = name;
        setMark(mark);
    }
    public void setMark(int m) {
        if (m < 0 || m > 100)
            throw new IllegalArgumentException("mark must be 0-100");
        this.mark = m;
    }
    public int getMark() { return mark; }

    public String toString() { return name + ": " + mark; }
}

asha.mark = 999;  // ✗ error: mark has private access`, note: "Everything lives in a class. this = self, toString() = __str__." },
  Python: { color: C.accent, code: `class Student:
    def __init__(self, name, mark):
        self.name = name
        self.set_mark(mark)

    def set_mark(self, m):
        if m < 0 or m > 100:
            raise ValueError("mark must be 0-100")
        self._mark = m

    def get_mark(self):
        return self._mark

    def __str__(self):
        return self.name + ": " + str(self._mark)

asha._mark = 999   # runs — but the _ says "don't"`, note: "Shortest of the four. Privacy is a convention, not a compiler rule." },
};

const TIMELINE = [
  { y: "1967", t: "Simula 67", who: "Ole-Johan Dahl & Kristen Nygaard, Norway", d: "Built to simulate ships and queues. Introduced classes, objects and inheritance — the first object-oriented language." },
  { y: "1972", t: "Information hiding", who: "David Parnas", d: "His paper \"On the Criteria to Be Used in Decomposing Systems into Modules\" argued each module should hide its internal decisions behind an interface. That idea is encapsulation." },
  { y: "1972–80", t: "Smalltalk", who: "Alan Kay and team, Xerox PARC", d: "Everything is an object; objects talk by sending messages. Kay coined the term \"object-oriented\"." },
  { y: "1985", t: "C++", who: "Bjarne Stroustrup, Bell Labs", d: "Began in 1979 as \"C with Classes\". Added classes and compiler-enforced public/private to C's speed." },
  { y: "1991", t: "Python", who: "Guido van Rossum", d: "Had classes from its first public release. Chose readability and conventions (_name) over strict access keywords." },
  { y: "1995", t: "Java", who: "James Gosling, Sun Microsystems", d: "Every piece of code lives inside a class. private/protected/public everywhere; became the language of enterprise and banking systems." },
];

function LanguagesWidget() {
  const [lang, setLang] = useState("C");
  const [yr, setYr] = useState(0);
  const L2 = LANG_CODE[lang];
  const rows = [
    ["Bundle data + functions", "struct + separate functions", "class", "class", "class"],
    ["Constructor", "none — write your own init", "Student(...)", "Student(...)", "__init__"],
    ["The current object", "pointer you pass: s->", "this", "this", "self (explicit)"],
    ["Printable text", "write your own print fn", "operator<<", "toString()", "__str__"],
    ["Hiding data", "✗ impossible", "private: (compiler)", "private (compiler)", "_mark (convention)"],
  ];

  return (
    <div>
      <p style={lead}>
        OOP wasn't invented for Python. Click through its history, then see our exact Student class — guard and all — in
        four languages.
      </p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {TIMELINE.map((e, i) => (
          <button key={i} onClick={() => setYr(i)} style={{ ...btn(C.teal, yr === i), fontSize: 11.5 }}>{e.y} · {e.t}</button>
        ))}
      </div>
      <div style={{ ...cardBox(C.teal + "55"), marginBottom: 18 }}>
        <div style={{ color: C.teal, fontWeight: 700, fontSize: 13 }}>{TIMELINE[yr].y} — {TIMELINE[yr].t}</div>
        <div style={{ color: C.muted, fontSize: 11.5, marginBottom: 6 }}>{TIMELINE[yr].who}</div>
        <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7 }}>{TIMELINE[yr].d}</div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {Object.keys(LANG_CODE).map((k) => (
          <button key={k} onClick={() => setLang(k)} style={btn(LANG_CODE[k].color, lang === k)}>{k}</button>
        ))}
      </div>
      <div style={{ ...cardBox(L2.color + "55"), overflowX: "auto" }}>
        <pre style={{ ...mono, fontSize: 11.5, whiteSpace: "pre" }}>{L2.code}</pre>
      </div>
      <div style={{ color: L2.color, fontSize: 12.5, marginTop: 8 }}>{L2.note}</div>

      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 560, fontSize: 12 }}>
          <thead>
            <tr>
              {["", "C", "C++", "Java", "Python"].map((h, i) => (
                <th key={i} style={{ textAlign: "left", padding: "6px 8px", color: i === 0 ? C.muted : LANG_CODE[h].color, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j} style={{ padding: "6px 8px", borderBottom: `1px solid ${C.border}`, color: j === 0 ? C.text : C.muted, fontFamily: j === 0 ? "inherit" : "monospace", fontWeight: j === 0 ? 600 : 400 }}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {insight(C.purple, <>
        <strong style={{ color: C.purple }}>Same idea, different enforcement.</strong> Every modern OOP language bundles
        data with the methods that guard it — Parnas's information hiding. C++ and Java make the compiler police it;
        Python trusts programmers and a naming convention. Learn it once here and you can read a Java or C++ class
        tomorrow: self ↔ this, __init__ ↔ constructor, __str__ ↔ toString().
      </>)}
    </div>
  );
}

// ── Widget 8: Real world — banking + other domains ──
function BankWidget() {
  const [bal, setBal] = useState(3000);
  const [amt, setAmt] = useState(1000);
  const [hist, setHist] = useState([]);
  const [log, setLog] = useState([]);
  const [app, setApp] = useState(0);

  const push = (code, res, ok) => setLog((l) => [{ code, res, ok }, ...l].slice(0, 5));
  const deposit = () => {
    if (amt <= 0) return push("acc.deposit(" + amt + ")", "ValueError: amount must be positive", false);
    setBal((b) => b + amt); setHist((h) => [...h, "+" + amt]);
    push("acc.deposit(" + amt + ")", "✓ balance is now " + (bal + amt), true);
  };
  const withdraw = () => {
    if (amt <= 0) return push("acc.withdraw(" + amt + ")", "ValueError: amount must be positive", false);
    if (amt > bal) return push("acc.withdraw(" + amt + ")", "ValueError: insufficient funds", false);
    setBal((b) => b - amt); setHist((h) => [...h, "-" + amt]);
    push("acc.withdraw(" + amt + ")", "✓ balance is now " + (bal - amt), true);
  };
  const hack = () => push("acc._balance = 1000000", "⚠ Python would run it — but no history entry, no check,\n  no audit. In Java this line wouldn't compile; in a bank's\n  code review it wouldn't survive.", false);
  const reset = () => { setBal(3000); setHist([]); setLog([]); };

  const apps = [
    { icon: "🏥", t: "Hospital patient record", code: `class Patient:
    def __init__(self, name):
        self.name = name
        self._readings = []

    def add_heart_rate(self, bpm):
        if bpm < 20 or bpm > 250:
            raise ValueError("impossible reading")
        self._readings.append(bpm)`, why: "A mistyped reading (720 instead of 72) could trigger a wrong treatment. The object refuses impossible values." },
    { icon: "🛒", t: "Shopping cart", code: `class Cart:
    def __init__(self):
        self._items = {}

    def add(self, item, qty):
        if qty <= 0:
            raise ValueError("qty must be positive")
        self._items[item] = qty

    def total(self, prices):
        ...`, why: "No negative quantities, so no negative bills. Every e-commerce site has a class like this." },
    { icon: "🌡️", t: "IoT temperature sensor", code: `class Sensor:
    def __init__(self, device_id):
        self.device_id = device_id
        self._temp = None

    def update(self, value):
        if value < -40 or value > 125:
            raise ValueError("sensor glitch")
        self._temp = value`, why: "Cheap sensors glitch. A smart thermostat must ignore a spike to 500°C instead of switching the AC off." },
    { icon: "🎮", t: "Game character", code: `class Player:
    def __init__(self, name):
        self.name = name
        self._health = 100

    def take_damage(self, d):
        self._health = self._health - d
        if self._health < 0:
            self._health = 0`, why: "Health never goes below 0, whoever attacks. The rule lives in one place, not in every attack's code." },
  ];

  return (
    <div>
      <p style={lead}>
        Banking is the textbook case for encapsulation: your balance must only change through a deposit or withdrawal
        that is checked and recorded. The ATM software never writes to the balance directly — it can only call methods.
        Same pattern as our Student, new domain.
      </p>

      <div style={twoCol}>
        <div style={{ ...cardBox(C.accent + "55"), overflowX: "auto" }}>
          <div style={tag(C.accent)}>🐍 class BankAccount</div>
          <pre style={{ ...mono, fontSize: 11, whiteSpace: "pre" }}>{`class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance
        self._history = []

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self._balance = self._balance + amount
        self._history.append("+" + str(amount))

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        if amount > self._balance:
            raise ValueError("insufficient funds")
        self._balance = self._balance - amount
        self._history.append("-" + str(amount))

    def get_balance(self):
        return self._balance

    def __str__(self):
        return self.owner + ": Rs." + str(self._balance)

acc = BankAccount("Meena", 3000)`}</pre>
        </div>

        <div style={cardBox(C.green + "55")}>
          <div style={tag(C.green)}>🏧 ATM — you are the outside code</div>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: C.text, marginBottom: 4 }}>print(acc)</div>
          <div style={{ fontFamily: "monospace", fontSize: 17, color: C.green, fontWeight: 700, marginBottom: 12 }}>Meena: Rs.{bal}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {[500, 1000, 2000, 5000, -500].map((a) => (
              <button key={a} onClick={() => setAmt(a)} style={{ ...btn(a < 0 ? C.red : C.teal, amt === a), fontSize: 11.5, padding: "5px 9px" }}>₹{a}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            <button onClick={deposit} style={btn(C.green, true)}>deposit</button>
            <button onClick={withdraw} style={btn(C.orange, true)}>withdraw</button>
            <button onClick={hack} style={btn(C.red, false)}>😈 set _balance</button>
            <button onClick={reset} style={btn(C.muted, false)}>↺</button>
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>acc._history = [{hist.map((h) => '"' + h + '"').join(", ")}]</div>
          {log.map((e, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 11, marginTop: 6, opacity: i === 0 ? 1 : 0.5, whiteSpace: "pre-wrap" }}>
              <div style={{ color: C.text }}>{e.code}</div>
              <div style={{ color: e.ok ? C.green : C.red }}>{e.res}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ color: C.text, fontWeight: 600, fontSize: 13, margin: "20px 0 10px" }}>The same pattern, everywhere</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {apps.map((a, i) => (
          <button key={i} onClick={() => setApp(i)} style={{ ...btn(C.purple, app === i), fontFamily: "inherit" }}>{a.icon} {a.t}</button>
        ))}
      </div>
      <div style={twoCol}>
        <div style={{ ...cardBox(), overflowX: "auto" }}>
          <pre style={{ ...mono, fontSize: 11.5, whiteSpace: "pre" }}>{apps[app].code}</pre>
        </div>
        <div style={{ ...cardBox(C.purple + "44"), color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
          <div style={tag(C.purple)}>WHY IT MATTERS</div>
          {apps[app].why}
        </div>
      </div>

      {insight(C.green, <>
        <strong style={{ color: C.green }}>Real systems are built from objects that guard themselves.</strong> Private
        data (_balance, _readings, _temp), public methods with rules (deposit, add_heart_rate, update), and a readable
        __str__. When a bug corrupts data, there's only one place to look: the method that was allowed to change it.
      </>)}
    </div>
  );
}

// ── Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "asha.grade() has empty brackets, yet the method is def grade(self). How does self get a value?",
      options: ["self stays empty", "Python runs it as Student.grade(asha) — the object before the dot becomes self", "You must write asha.grade(asha)", "self is always the class"],
      answer: 1,
      explain: "obj.method() is shorthand for Class.method(obj). The object before the dot is passed in as self automatically — just as C code passes a pointer by hand.",
    },
    {
      q: "Your __str__ is `return self.mark` and self.mark is 85. What does print(asha) do?",
      options: ["Prints 85", "Prints Asha: 85", "TypeError: __str__ returned non-string (type int)", "Prints the memory address"],
      answer: 2,
      explain: "__str__ must return a string. Returning an int raises TypeError. Fix it with return str(self.mark), or build a full description with + and str().",
    },
    {
      q: "v4 has set_mark with a 0-100 guard. Someone writes asha.mark = 150. What happens?",
      options: ["set_mark runs automatically and rejects it", "It runs silently — direct assignment skips the guard", "SyntaxError", "Python rounds it to 100"],
      answer: 1,
      explain: "A guard only protects the door it's on. Direct assignment bypasses set_mark entirely — which is why we renamed mark to _mark to warn everyone to use the method.",
    },
    {
      q: "What does the leading underscore in self._mark mean in Python?",
      options: ["Python blocks all outside access", "It's a convention: internal — use the methods instead", "It makes the value read-only", "It deletes the attribute after __init__"],
      answer: 1,
      explain: "A single underscore is a signal defined by PEP 8, not a lock. Python still runs asha._mark = 999, but every Python programmer knows that breaks the class's rules.",
    },
    {
      q: "The same Student class in Java has `private int mark;`. What happens to asha.mark = 999 there?",
      options: ["It runs, like Python", "It's a compile-time error: mark has private access", "It raises ValueError at runtime", "Java ignores the line"],
      answer: 1,
      explain: "Java and C++ enforce private in the compiler, so the program won't even build. Python chose conventions instead — same design idea, different enforcement.",
    },
    {
      q: "In BankAccount, why is the balance changed only through deposit() and withdraw()?",
      options: ["Methods run faster than assignment", "So every change is checked (no overdraft, no negatives) and recorded in the history", "Python doesn't allow + on attributes", "So the balance can be printed"],
      answer: 1,
      explain: "That's encapsulation in the real world: rules and record-keeping live in the methods, so no outside code can create an invalid or unrecorded balance.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const total = questions.length;

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[current].answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (current < total - 1) { setCurrent((c) => c + 1); setSelected(null); }
    else setDone(true);
  };

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{score >= total - 1 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {score} / {total}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {score === total ? "Perfect! Your objects can act, describe themselves and protect their data." :
            score >= total - 2 ? "Good work! Replay 'The Whole Thing' once more to see every piece run together." :
              "Worth a replay: 'Method Anatomy', 'Encapsulation' and 'The Whole Thing'."}
        </div>
        <div style={{ padding: 20, borderRadius: 12, background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.purple}22)`, border: `1px solid ${C.accent}55` }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Unit 10.3 Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You grew one Student class from plain data to a self-guarding object, traced it end to end, read it in C++
            and Java, and saw the same pattern run a bank account.<br /><br />
            <strong style={{ color: C.accent }}>Next up: Unit 10.4 — Inheritance.</strong> A Student and a Teacher share a
            name and email but differ in the rest — and a savings account is a bank account with extras. Inheritance lets
            one class build ON another instead of copy-pasting.
          </div>
          <button onClick={() => onComplete && onComplete()} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
            Finish Unit →
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {total}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((opt, i) => {
          let bg = C.card, border = C.border, col = C.text;
          if (selected !== null) {
            if (i === q.answer) { bg = C.green + "22"; border = C.green; col = C.green; }
            else if (i === selected) { bg = C.red + "22"; border = C.red; col = C.red; }
          }
          return (
            <button key={i} onClick={() => choose(i)} style={{
              textAlign: "left", padding: "10px 14px", borderRadius: 8, background: bg, border: `1.5px solid ${border}`, color: col,
              cursor: selected !== null ? "default" : "pointer", fontSize: 13, transition: "all 0.25s",
            }}>
              {i === q.answer && selected !== null ? "✓ " : i === selected && selected !== q.answer ? "✗ " : ""}{opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: C.purple + "18", border: `1px solid ${C.purple}44`, color: C.muted, fontSize: 13, lineHeight: 1.6 }}>
          💡 {q.explain}
        </div>
      )}
      {selected !== null && (
        <button onClick={next} style={{ marginTop: 14, padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
          {current < total - 1 ? "Next Question →" : "See Results"}
        </button>
      )}
    </div>
  );
}

// ── Main ──
export default function Unit10_3({ student, onUnitComplete }) {
  const sections = [
    { id: "need", label: "Data + Behaviour", title: "Let Objects Act", el: <NeedWidget /> },
    { id: "anatomy", label: "Method Anatomy", title: "Anatomy of a Method", el: <AnatomyWidget /> },
    { id: "str", label: "__str__", title: "__str__: Teach It to Describe Itself", el: <StrWidget /> },
    { id: "encap", label: "Encapsulation", title: "Encapsulation: Guard the Data", el: <EncapsulationWidget /> },
    { id: "private", label: "_private", title: "Private by Convention", el: <PrivateWidget /> },
    { id: "whole", label: "The Whole Thing", title: "The Whole Program, Line by Line", el: <WholeWidget /> },
    { id: "langs", label: "vs C++ / Java", title: "Where OOP Came From — and How Other Languages Do It", el: <LanguagesWidget /> },
    { id: "bank", label: "Real World", title: "Where It's Used: Banking and Beyond", el: <BankWidget /> },
    { id: "quiz", label: "Quiz & Wrap-up", title: "Quick Quiz", el: null },
  ];
  const quizIdx = sections.length - 1;

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted((p) => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection((s) => Math.min(quizIdx, s + 1)); };

  const s = sections[activeSection];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 10 › UNIT 10.3</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Methods &amp; Encapsulation</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{completed.length} / {sections.length} done</div>
      </div>

      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(completed.length / sections.length) * 100}%`, background: C.green, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {sections.map((sec, i) => (
            <button key={sec.id} onClick={() => setActiveSection(i)} style={{
              flex: 1, minWidth: 88, padding: "8px 6px", borderRadius: 7,
              background: activeSection === i ? C.accentGlow : "transparent",
              border: "none", color: activeSection === i ? "#fff" : C.muted,
              cursor: "pointer", fontSize: 11, fontWeight: activeSection === i ? 600 : 400,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4, transition: "all 0.2s",
            }}>
              {completed.includes(i) && <span style={{ color: C.green }}>✓</span>}
              {sec.label}
            </button>
          ))}
        </div>

        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
          <h3 style={{ color: C.text, marginTop: 0, marginBottom: 12 }}>{s.title}</h3>
          {activeSection === quizIdx ? (
            <>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>6 questions to check your understanding of Unit 10.3.</p>
              <Quiz onComplete={() => { markComplete(quizIdx); onUnitComplete && onUnitComplete(); }} />
            </>
          ) : s.el}
        </div>

        {activeSection < quizIdx && (
          <button onClick={goNext} style={{
            marginTop: 16, width: "100%", padding: "12px", borderRadius: 8,
            background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>Mark Complete & Continue →</button>
        )}
      </div>
    </div>
  );
}
