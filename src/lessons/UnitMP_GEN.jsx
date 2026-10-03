// UnitMP_GEN — Applied Mini-Project (General track): Personal Expense Tracker.
// Capstone-style APPLIED unit: the learner builds one real program that recruits
// the whole trunk (M4 variables → M10 classes → M13 chart). Self-contained, dark
// "focus mode" palette, standard Foothold shell (header, progress, tabs, card).
// optional:true in the config, so it never affects the course %.
import { useState } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

const box = { background: C.card, border: `1px solid ${C.border}`, borderRadius: 10 };
const pre = { fontFamily: "monospace", fontSize: 12.5, color: C.text, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.65 };
function KeyInsight({ color = C.accent, children }) {
  return (
    <div style={{ marginTop: 16, background: color + "18", border: `1px solid ${color}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
      🔑 {children}
    </div>
  );
}

// ── Section 1: The Mission — spec + a checklist tying each tool to its trunk unit ──
function Mission() {
  const rows = [
    ["Record an expense: amount + category", "Variables & input", "Unit 4.2–4.3"],
    ["Warn when you cross your budget", "if / else", "Unit 5.2"],
    ["Handle a whole month of expenses", "Loops", "Module 6"],
    ["Group spending by category", "Lists & dictionaries", "Unit 7.2–7.4"],
    ["Find the biggest category, sort the list", "max / sort patterns", "Unit 7.3 / 7.5"],
    ["Keep the code tidy and reusable", "Functions", "Module 8"],
    ["Remember expenses after you close it", "Files", "Unit 9.3"],
    ["Model an account cleanly", "Classes (OOP)", "Module 10"],
    ["Show a spending bar chart", "Matplotlib", "Unit 13.1"],
  ];
  const [open, setOpen] = useState(null);
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Your mission: build a <strong style={{ color: C.text }}>Personal Expense Tracker</strong> — the little
        app everyone actually needs. It records what you spend, groups it by category, shouts when you blow your
        budget, and remembers everything for next time. You already own every tool. Tap a row to see where you learned it.
      </p>
      <div style={box}>
        {rows.map((r, i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)}
            style={{ padding: "11px 14px", borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: C.green }}>✓</span>
              <span style={{ color: C.text, fontSize: 13.5, flex: 1 }}>{r[0]}</span>
              <span style={{ color: C.accent, fontSize: 11.5, fontFamily: "monospace" }}>{r[1]}</span>
            </div>
            {open === i && (
              <div style={{ color: C.muted, fontSize: 12.5, marginTop: 8, paddingLeft: 24 }}>
                You already learned this in <strong style={{ color: C.teal }}>{r[2]}</strong>. Nothing new to learn — just to <em>combine</em>.
              </div>
            )}
          </div>
        ))}
      </div>
      <KeyInsight color={C.purple}>
        A big program is never one big idea — it's a stack of small ones you already know, snapped together.
        This mini-project is proof that Modules 4–13 add up to something real.
      </KeyInsight>
    </div>
  );
}

// ── Section 2: Build in Steps — v1/v2/v3 tabs, each adding ONE idea ──
function BuildSteps() {
  const versions = [
    {
      tag: "v1", title: "One expense, one budget check",
      note: "This works for a single expense — but a month has dozens. One variable can't hold them all. That's the wall a list + loop breaks.",
      color: C.red,
      code:
`budget = 5000
spent  = 1200            # a single expense

if spent > budget:
    print("Over budget!")
else:
    print("Remaining:", budget - spent)`,
    },
    {
      tag: "v2", title: "Many expenses in a list + a loop",
      note: "Now we handle a whole month and total it. But we still can't answer 'where is my money going?' — we need to group by category. That's a dictionary.",
      color: C.yellow,
      code:
`budget   = 5000
expenses = [1200, 300, 850, 120, 600]   # a list (Unit 7.2)

total = 0
for amount in expenses:                 # loop (Module 6)
    total += amount                     # accumulator (Unit 7.3)

print("Total spent:", total)
if total > budget:
    print("Over budget by", total - budget)`,
    },
    {
      tag: "v3", title: "Group by category with a dict + functions",
      note: "A dictionary maps each category to its running total, and a function keeps it tidy. Add files (next tab) and it survives closing — that's the finished tracker.",
      color: C.green,
      code:
`budget   = 5000
expenses = [("Food", 1200), ("Travel", 300), ("Food", 850)]

def summarise(expenses):
    by_cat = {}                         # dict (Unit 7.4)
    for category, amount in expenses:   # tuple unpacking (Unit 8.4)
        by_cat[category] = by_cat.get(category, 0) + amount
    return by_cat

by_cat = summarise(expenses)
total  = sum(by_cat.values())
biggest = max(by_cat, key=by_cat.get)   # biggest category (Unit 7.5)

print("By category:", by_cat)
print("Biggest drain:", biggest)
print("Total:", total, "/", budget)`,
    },
  ];
  const [v, setV] = useState(0);
  const cur = versions[v];
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        Real programs grow one idea at a time. Step through the three versions — each fixes a wall the last one hit.
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {versions.map((ver, i) => (
          <button key={i} onClick={() => setV(i)} style={{
            padding: "6px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700,
            background: v === i ? ver.color : C.card, border: `1.5px solid ${v === i ? ver.color : C.border}`,
            color: v === i ? "#0D1117" : C.muted,
          }}>{ver.tag}</button>
        ))}
      </div>
      <div style={{ color: C.text, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{cur.title}</div>
      <div style={{ ...box, padding: 16 }}><pre style={pre}>{cur.code}</pre></div>
      <div style={{ marginTop: 12, background: cur.color + "18", border: `1px solid ${cur.color}44`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
        <strong style={{ color: cur.color }}>{cur.tag} →</strong> {cur.note}
      </div>
    </div>
  );
}

// ── Section 3: Play It — the finished tracker as a working widget ──
const CATS = ["Food", "Travel", "Books", "Fun", "Other"];
const CAT_COLORS = { Food: C.orange, Travel: C.teal, Books: C.accent, Fun: C.purple, Other: C.muted };
function PlayIt() {
  const [budget, setBudget] = useState(5000);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([
    { amount: 1200, category: "Food" }, { amount: 300, category: "Travel" },
  ]);

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const over = total > budget;
  const byCat = {};
  expenses.forEach(e => { byCat[e.category] = (byCat[e.category] || 0) + e.amount; });
  const biggest = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a])[0];
  const pctWidth = Math.min(100, budget > 0 ? (total / budget) * 100 : 0);

  const add = () => {
    const n = Number(amount);
    if (!n || n <= 0) return;
    setExpenses(prev => [...prev, { amount: n, category }]);
    setAmount("");
  };
  const reset = () => setExpenses([]);

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        The finished thing. Add a few expenses and watch the budget bar, the total and the biggest-category react —
        exactly what the Python below does.
      </p>

      {/* Budget + add row */}
      <div style={{ ...box, padding: 16, marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div>
            <label style={{ color: C.muted, fontSize: 11 }}>Monthly budget (₹)</label>
            <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value) || 0)}
              style={{ display: "block", width: 110, background: C.bg, border: `1px solid ${C.border}`, color: C.text, borderRadius: 8, padding: "8px 10px", fontSize: 13 }} />
          </div>
          <div>
            <label style={{ color: C.muted, fontSize: 11 }}>Amount (₹)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 250"
              style={{ display: "block", width: 100, background: C.bg, border: `1px solid ${C.border}`, color: C.text, borderRadius: 8, padding: "8px 10px", fontSize: 13 }} />
          </div>
          <div>
            <label style={{ color: C.muted, fontSize: 11 }}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ display: "block", background: C.bg, border: `1px solid ${C.border}`, color: C.text, borderRadius: 8, padding: "8px 10px", fontSize: 13 }}>
              {CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={add} style={{ background: C.accentGlow, border: "none", color: "#fff", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Add</button>
          <button onClick={reset} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 8, padding: "9px 14px", fontSize: 13, cursor: "pointer" }}>↺ Reset</button>
        </div>
      </div>

      {/* Budget bar */}
      <div style={{ marginBottom: 6, display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
        <span style={{ color: C.muted }}>Spent: <strong style={{ color: over ? C.red : C.green }}>₹{total}</strong> / ₹{budget}</span>
        <span style={{ color: over ? C.red : C.green, fontWeight: 700 }}>{over ? `OVER by ₹${total - budget}` : `₹${budget - total} left`}</span>
      </div>
      <div style={{ height: 12, background: C.card, borderRadius: 6, overflow: "hidden", border: `1px solid ${C.border}` }}>
        <div style={{ height: "100%", width: `${pctWidth}%`, background: over ? C.red : C.green, transition: "width 0.3s" }} />
      </div>

      {/* By-category mini bars */}
      <div style={{ marginTop: 16 }}>
        {Object.keys(byCat).length === 0 && <div style={{ color: C.muted, fontSize: 13 }}>No expenses yet — add one above.</div>}
        {Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a]).map(cat => (
          <div key={cat} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ width: 60, color: CAT_COLORS[cat] || C.muted, fontSize: 12.5, fontWeight: 600 }}>{cat}</span>
            <div style={{ flex: 1, height: 10, background: C.card, borderRadius: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(byCat[cat] / total) * 100}%`, background: CAT_COLORS[cat] || C.muted }} />
            </div>
            <span style={{ width: 60, textAlign: "right", color: C.text, fontSize: 12.5 }}>₹{byCat[cat]}
              {cat === biggest && <span style={{ color: C.yellow }}> ▲</span>}
            </span>
          </div>
        ))}
      </div>
      {biggest && <KeyInsight color={C.teal}>Your biggest drain is <strong style={{ color: C.text }}>{biggest}</strong> (₹{byCat[biggest]}). That “▲” is just <code style={{ color: C.codeBrown || C.orange }}>max(by_cat, key=by_cat.get)</code> — the exact line from v3.</KeyInsight>}
    </div>
  );
}

// ── Section 4: Full Code — the honest, runnable program + upgrades ──
function FullCode() {
  const code =
`import json

BUDGET_FILE = "budget.json"

def load_expenses():
    """Files (Unit 9.3): remember expenses across runs."""
    try:
        with open(BUDGET_FILE) as f:
            return json.load(f)
    except FileNotFoundError:
        return []                       # first run — start empty

def save_expenses(expenses):
    with open(BUDGET_FILE, "w") as f:
        json.dump(expenses, f)

def summarise(expenses):
    by_cat = {}                         # dict (Unit 7.4)
    for e in expenses:
        by_cat[e["category"]] = by_cat.get(e["category"], 0) + e["amount"]
    return by_cat

def report(expenses, budget):
    by_cat = summarise(expenses)
    total  = sum(by_cat.values())
    print("\\n--- Spending report ---")
    for cat, amt in sorted(by_cat.items(), key=lambda x: -x[1]):   # sort (7.5)
        print(f"  {cat:8} : {amt}")
    print("Total:", total, "/", budget)
    if total > budget:
        print("⚠  OVER budget by", total - budget)
    else:
        print("Remaining:", budget - total)
    if by_cat:
        print("Biggest drain:", max(by_cat, key=by_cat.get))

def main():
    budget   = 5000
    expenses = load_expenses()
    while True:                         # menu loop (Module 6)
        choice = input("\\n[a]dd  [r]eport  [q]uit: ").strip().lower()
        if choice == "a":
            cat = input("Category: ")
            amt = int(input("Amount: "))      # int() (Unit 4.3)
            expenses.append({"category": cat, "amount": amt})
            save_expenses(expenses)
        elif choice == "r":
            report(expenses, budget)
        elif choice == "q":
            break

main()`;
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
        The whole tracker as real Python — copy it into a <code style={{ color: C.orange }}>.py</code> file and run it.
        Every block is labelled with the unit that taught it.
      </p>
      <div style={{ ...box, padding: 16 }}><pre style={pre}>{code}</pre></div>
      <KeyInsight color={C.green}>
        <strong style={{ color: C.text }}>Upgrade challenges:</strong> add a date to each expense; add a
        <code style={{ color: C.orange }}> Account</code> class (Module 10) that owns the list and the budget;
        draw a bar chart of <code style={{ color: C.orange }}>by_cat</code> with matplotlib (Unit 13.1).
      </KeyInsight>
    </div>
  );
}

// ── Section 5: Quiz ──
function Quiz({ onComplete }) {
  const questions = [
    { q: "Why store spending in a dictionary keyed by category, instead of separate variables like food_total, travel_total?",
      options: ["Dicts run faster than variables", "Categories can be added at runtime without new variable names", "You can't add numbers without a dict", "Variables can't hold money"],
      answer: 1, explain: "A dict grows to fit whatever categories appear — you never have to know them in advance or write a new variable for each." },
    { q: "What does max(by_cat, key=by_cat.get) return?",
      options: ["The largest amount", "The category with the largest amount", "The number of categories", "The last category added"],
      answer: 1, explain: "max over the keys, ranked by each key's value — so it returns the KEY (category name) whose total is biggest." },
    { q: "In open(BUDGET_FILE, \"w\"), what does \"w\" do on an existing file?",
      options: ["Appends to the end", "Reads it", "Overwrites it from scratch", "Raises an error"],
      answer: 2, explain: "\"w\" truncates and rewrites. Here that's fine — we dump the whole current list each time. Use \"a\" only when you want to append." },
    { q: "load_expenses() catches FileNotFoundError and returns []. Why?",
      options: ["To hide bugs", "So the very first run (no file yet) starts with an empty list instead of crashing", "Because JSON is slow", "To delete the file"],
      answer: 1, explain: "On first run the save file doesn't exist yet. Catching the error and returning [] is graceful first-run handling (Unit 9.1–9.2)." },
  ];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (i) => { if (selected !== null) return; setSelected(i); if (i === questions[current].answer) setScore(s => s + 1); };
  const next = () => { if (current < questions.length - 1) { setCurrent(c => c + 1); setSelected(null); } else { setDone(true); onComplete && onComplete(); } };

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{score >= 3 ? "🏆" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {score} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8, marginBottom: 20 }}>
          {score === 4 ? "Flawless — you didn't just learn Python, you can build with it."
            : score >= 2 ? "Solid. Skim the Full Code once more and you've got it."
              : "Replay Build in Steps — watch how each version fixes the last one's wall."}
        </div>
        <div style={{ padding: 20, borderRadius: 12, background: `linear-gradient(135deg, ${C.accentGlow}22, ${C.green}22)`, border: `1px solid ${C.accent}55` }}>
          <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🎓 Mini-Project Complete!</div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            You built a full application from nothing but the trunk. That's the whole point of Foothold.<br /><br />
            <strong style={{ color: C.accent }}>Other tracks await:</strong> pick your branch — Mechanical/Civil, CS &amp; AI-ML, or ECE/IoT — and build the one that's yours.
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16, lineHeight: 1.5 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((opt, i) => {
          let bg = C.card, border = C.border, col = C.text;
          if (selected !== null) {
            if (i === q.answer) { bg = C.green + "22"; border = C.green; col = C.green; }
            else if (i === selected) { bg = C.red + "22"; border = C.red; col = C.red; }
          }
          return (
            <button key={i} onClick={() => choose(i)} style={{ textAlign: "left", padding: "10px 14px", borderRadius: 8, background: bg, border: `1.5px solid ${border}`, color: col, cursor: selected !== null ? "default" : "pointer", fontSize: 13 }}>
              {i === q.answer && selected !== null ? "✓ " : i === selected && selected !== q.answer ? "✗ " : ""}{opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: C.purple + "18", border: `1px solid ${C.purple}44`, color: C.muted, fontSize: 13 }}>💡 {q.explain}</div>
      )}
      {selected !== null && (
        <button onClick={next} style={{ marginTop: 14, padding: "10px 24px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
          {current < questions.length - 1 ? "Next Question →" : "See Results"}
        </button>
      )}
    </div>
  );
}

// ── Main ──
export default function UnitMP_GEN({ student, onUnitComplete }) {
  const sections = [
    { id: "mission", label: "The Mission" },
    { id: "steps", label: "Build in Steps" },
    { id: "play", label: "Play It" },
    { id: "code", label: "Full Code" },
    { id: "quiz", label: "Quiz" },
  ];
  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);
  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Mission — Personal Expense Tracker</h3><Mission /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Build in Steps</h3><BuildSteps /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>Play It</h3><PlayIt /></div>,
    <div><h3 style={{ color: C.text, marginBottom: 6 }}>The Full Program</h3><FullCode /></div>,
    <div>
      <h3 style={{ color: C.text, marginBottom: 6 }}>Quiz</h3>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>4 questions on the ideas you just wired together.</p>
      <Quiz onComplete={() => { markComplete(4); onUnitComplete && onUnitComplete(); }} />
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧰</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MINI-PROJECT › GENERAL</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Build for Your Branch: Personal Expense Tracker</div>
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
              flex: 1, minWidth: 80, padding: "8px 6px", borderRadius: 7,
              background: activeSection === i ? C.accentGlow : "transparent",
              border: "none", color: activeSection === i ? "#fff" : C.muted,
              cursor: "pointer", fontSize: 11, fontWeight: activeSection === i ? 600 : 400,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            }}>
              {completed.includes(i) && <span style={{ color: C.green }}>✓</span>}{s.label}
            </button>
          ))}
        </div>

        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 320 }}>
          {content[activeSection]}
        </div>

        {activeSection < sections.length - 1 && (
          <button onClick={goNext} style={{ marginTop: 16, width: "100%", padding: "12px", borderRadius: 8, background: C.accentGlow, border: "none", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            Mark Complete & Continue →
          </button>
        )}
      </div>
    </div>
  );
}
