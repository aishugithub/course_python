// Mini-Project Track D — Sports League Tracker (new, typing-first)
// Five checkpoints: 1 one team's season from W/D/L, best winning run (M4–6)
// → 2 a points table from match scores, ranked with a sort key, aligned
// (M7–8) → 3 results file in, table file out, InvalidScoreError (M9) →
// 4 Team and League classes (M10) → 5 goals analysis + chart (M12–13).

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";
import { files, fileIs, FIG, titleIs, barsAre, Console, parseCsv, byValueDesc, Roadmap } from "../kit/project.jsx";

// ── CP1: one team's season ──
function cp1(inputs) {
  const c = Console(inputs);
  const team = c.ask("Team: ");
  let w = 0, d = 0, l = 0, run = 0, best = 0;
  for (;;) {
    const r = c.ask("Result (W/D/L, or end): ").trim().toUpperCase();
    if (r === "END") break;
    if (r === "W") { w++; run++; best = Math.max(best, run); }
    else if (r === "D") { d++; run = 0; }
    else if (r === "L") { l++; run = 0; }
    else c.say("Type W, D, L or end");
  }
  const p = w + d + l;
  if (!p) c.say("No matches played");
  else { c.say(`${team}: P${p} W${w} D${d} L${l}`, `Points: ${3 * w + d}`, `Best winning run: ${best}`); if (!l) c.say("Unbeaten!"); }
  return c.text();
}

// ── Shared table logic (CP2–CP4) ──
const MATCH = "Match (home goals away goals, or end): ";
function newTable() { return new Map(); }
function record(t, team, s, cn) {
  const r = t.get(team) || [0, 0, 0, 0, 0, 0, 0];
  r[0]++; if (s > cn) { r[1]++; r[6] += 3; } else if (s === cn) { r[2]++; r[6] += 1; } else r[3]++;
  r[4] += s; r[5] += cn; t.set(team, r);
}
const ranked = (t) => [...t].sort((a, b) => b[1][6] - a[1][6] || (b[1][4] - b[1][5]) - (a[1][4] - a[1][5]) || b[1][4] - a[1][4] || (a[0] < b[0] ? -1 : 1));
const sgn = (n) => (n >= 0 ? "+" + n : String(n));
const header = () => "Team".padEnd(10) + ["P", "W", "D", "L"].map((x) => x.padStart(3)).join("") + "GD".padStart(5) + "Pts".padStart(5);
const rowLine = ([n, r]) => n.padEnd(10) + [r[0], r[1], r[2], r[3]].map((x) => String(x).padStart(3)).join("") + sgn(r[4] - r[5]).padStart(5) + String(r[6]).padStart(5);
function cp2(inputs) {
  const c = Console(inputs), t = newTable();
  for (;;) {
    const line = c.ask(MATCH);
    if (line.trim().toLowerCase() === "end") break;
    const p = line.split(/\s+/).filter(Boolean);
    if (p.length !== 4 || !/^\d+$/.test(p[1]) || !/^\d+$/.test(p[3])) { c.say("Format: Home 2 Away 1"); continue; }
    if (p[0] === p[2]) { c.say("A team can't play itself"); continue; }
    record(t, p[0], +p[1], +p[3]); record(t, p[2], +p[3], +p[1]);
  }
  if (!t.size) c.say("No matches yet");
  else { const rk = ranked(t); c.say(header(), ...rk.map(rowLine), `Leader: ${rk[0][0]}`); }
  return c.text();
}

// ── CP3: results file → table file ──
function cp3(fileText) {
  const c = Console([]);
  if (fileText === null) { c.say("No results file"); return { out: c.text(), lines: null }; }
  const t = newTable(); let n = 0, bad = 0;
  fileText.split("\n").filter((l) => l.trim()).forEach((l) => {
    const p = l.trim().split(",");
    if (p.length !== 4 || !/^-?\d+$/.test(p[1]) || !/^-?\d+$/.test(p[3]) || +p[1] < 0 || +p[3] < 0 || p[0] === p[2]) { bad++; return; }
    record(t, p[0], +p[1], +p[3]); record(t, p[2], +p[3], +p[1]); n++;
  });
  c.say(`Loaded ${n} matches`); if (bad) c.say(`Skipped ${bad} bad line(s)`);
  const rk = ranked(t);
  c.say(header(), ...rk.map(rowLine), `Leader: ${rk[0][0]}`, "Table saved");
  return { out: c.text(), lines: ["Team,P,W,D,L,GF,GA,Pts", ...rk.map(([nm, r]) => [nm, ...r].join(","))] };
}

// ── CP4: classes ──
function cp4(inputs) {
  const c = Console(inputs), t = newTable();
  for (;;) {
    const line = c.ask(MATCH);
    if (line.trim().toLowerCase() === "end") break;
    const p = line.split(/\s+/).filter(Boolean);
    if (p.length !== 4 || !/^-?\d+$/.test(p[1]) || !/^-?\d+$/.test(p[3]) || p[0] === p[2] || +p[1] < 0 || +p[3] < 0) { c.say(`Invalid match: ${line}`); continue; }
    record(t, p[0], +p[1], +p[3]); record(t, p[2], +p[3], +p[1]);
  }
  const rk = ranked(t);
  rk.forEach(([n, r], i) => c.say(`${i + 1}. ${n}: ${r[6]} pts, GD ${sgn(r[4] - r[5])}`));
  c.say(rk.length ? `Leader: ${rk[0][0]}` : "No matches yet");
  return c.text();
}
const CP4_POST = `_a = Team("A")
_a.record(2, 1)
_a.record(0, 0)
_a.record(1, 3)
assert (_a.played, _a.won, _a.drawn, _a.lost, _a.gf, _a.ga) == (3, 1, 1, 1, 3, 4), "Team.record(scored, conceded) should update played, won, drawn, lost, gf and ga."
assert _a.points() == 4 and _a.goal_diff() == -1, "points(): 3 per win, 1 per draw; goal_diff(): gf - ga."
assert str(_a) == "A: 4 pts, GD -1", "str(Team) should look like A: 4 pts, GD -1 — got " + str(_a)
_L = League()
_L.add_result("X", 1, "Y", 1)
_L.add_result("Z", 2, "X", 0)
assert [t.name for t in _L.standings()] == ["Z", "Y", "X"], "standings(): most points, then goal difference, then goals scored, then name."
assert _L.leader().name == "Z", "leader() is the first team in the standings."
for _bad in [("X", 1, "X", 0), ("X", -1, "Y", 0)]:
    try:
        _L.add_result(*_bad)
        raise AssertionError(f"add_result{_bad} should raise ValueError.")
    except ValueError:
        pass`;

// ── CP5: goals analysis ──
const GAMES = "Date,Home,HG,Away,AG\n2026-08-01,Lions,2,Tigers,1\n2026-08-01,Owls,0,Hawks,1\n2026-08-08,Tigers,4,Owls,0\n2026-08-08,Hawks,2,Lions,2\n2026-08-15,Lions,3,Owls,1\n2026-08-15,Hawks,0,Tigers,1\n";
const GAMES2 = "Date,Home,HG,Away,AG\n2026-09-01,Bees,3,Ants,0\n2026-09-01,Crows,1,Doves,1\n2026-09-08,Ants,2,Crows,5\n2026-09-08,Doves,0,Bees,1\n";
function cp5(csv) {
  const rows = parseCsv(csv);
  const goals = new Map();
  rows.forEach((r) => { goals.set(r.Home, (goals.get(r.Home) || 0) + r.HG); goals.set(r.Away, (goals.get(r.Away) || 0) + r.AG); });
  const g = byValueDesc([...goals]);
  const total = rows.reduce((s, r) => s + r.HG + r.AG, 0);
  const big = rows.reduce((a, b) => (Math.abs(b.HG - b.AG) > Math.abs(a.HG - a.AG) ? b : a));
  const out = [`Matches: ${rows.length}`, `Goals per match: ${(total / rows.length).toFixed(2)}`, "Goals scored:", ...g.map(([k, v]) => `${k}: ${v}`), `Top scorers: ${g[0][0]}`, `Biggest win: ${big.Home} ${big.HG}-${big.AG} ${big.Away}`].join("\n");
  return { out, post: FIG() + titleIs("Goals scored") + barsAre(g, "_ax", "bars (teams, most goals first)") };
}

const EX = {
  cp1: {
    id: "cp1", kind: "make", title: "Checkpoint 1 — one team's season",
    task: <>Ask <code>Team: </code>, then read results with <code>Result (W/D/L, or end): </code> until <code>end</code> (any capitals). Anything else → <code>Type W, D, L or end</code>. Count wins, draws and losses, and track the <strong>longest run of wins in a row</strong>. Then print <code>Lions: P7 W5 D1 L1</code>, <code>Points: 16</code> (3 per win, 1 per draw), <code>Best winning run: 3</code>, and <code>Unbeaten!</code> if there were no losses. With no matches: <code>No matches played</code>.</>,
    minLines: 22,
    tests: [
      { inputs: ["Lions", "W", "w", "D", "L", "W", "W", "W", "end"], expect: cp1(["Lions", "W", "w", "D", "L", "W", "W", "W", "end"]) },
      { inputs: ["Tigers", "D", "x", "W", "W", "END"], expect: cp1(["Tigers", "D", "x", "W", "W", "END"]), hidden: true, why: "A bad result is refused, END in capitals still ends, and no losses means Unbeaten!" },
      { inputs: ["Owls", "end"], expect: cp1(["Owls", "end"]), hidden: true, why: "No results at all: print only No matches played." },
    ],
    requires: [{ node: "While" }, { call: "upper" }],
    hints: ["run counts the current streak: +1 on a win, back to 0 on a draw or loss", "best = max(best, run) after every win", 'result = input("Result (W/D/L, or end): ").strip().upper()'],
    solution: 'team = input("Team: ")\nwins = draws = losses = 0\nrun = best = 0\nwhile True:\n    result = input("Result (W/D/L, or end): ").strip().upper()\n    if result == "END":\n        break\n    if result == "W":\n        wins += 1\n        run += 1\n        best = max(best, run)\n    elif result == "D":\n        draws += 1\n        run = 0\n    elif result == "L":\n        losses += 1\n        run = 0\n    else:\n        print("Type W, D, L or end")\n\nplayed = wins + draws + losses\nif played == 0:\n    print("No matches played")\nelse:\n    print(f"{team}: P{played} W{wins} D{draws} L{losses}")\n    print(f"Points: {3 * wins + draws}")\n    print(f"Best winning run: {best}")\n    if losses == 0:\n        print("Unbeaten!")',
  },
  cp2: {
    id: "cp2", kind: "make", title: "Checkpoint 2 — the points table",
    task: <>Read match lines like <code>Lions 2 Tigers 1</code> with <code>Match (home goals away goals, or end): </code> until <code>end</code>. Not four parts with whole-number goals → <code>Format: Home 2 Away 1</code>; a team against itself → <code>A team can't play itself</code>. Keep a dict <code>team → [P, W, D, L, GF, GA, Pts]</code>, updated by your function <code>record(table, team, scored, conceded)</code> (called twice per match). Rank by points, then goal difference, then goals scored, then name — one <code>sorted</code> with a key function. Print the aligned table — <code>Team</code> left in 10, P/W/D/L right in 3, GD with a sign right in 5 (<code>{"{gd:>+5}"}</code>), Pts right in 5 — then <code>Leader: Lions</code>. With no valid matches: <code>No matches yet</code>.</>,
    minLines: 30,
    tests: [
      { inputs: ["Lions 2 Tigers 1", "Owls 0 Lions 0", "Tigers 3 Owls 1", "end"], expect: cp2(["Lions 2 Tigers 1", "Owls 0 Lions 0", "Tigers 3 Owls 1", "end"]) },
      { inputs: ["A 1 B 0", "C 3 D 0", "B 2 C 2", "x y", "A 1 A 0", "end"], expect: cp2(["A 1 B 0", "C 3 D 0", "B 2 C 2", "x y", "A 1 A 0", "end"]), hidden: true, why: "Bad lines and a team playing itself are refused; C ranks above A on points." },
      { inputs: ["Bees 1 Ants 1", "end"], expect: cp2(["Bees 1 Ants 1", "end"]), hidden: true, why: "Level on everything → alphabetical. A goal difference of 0 prints as +0 with {gd:>+5}." },
      { inputs: ["end"], expect: cp2(["end"]), hidden: true },
    ],
    post: '_t = {}\nrecord(_t, "A", 2, 1)\nrecord(_t, "A", 0, 0)\nrecord(_t, "A", 1, 3)\nassert _t["A"] == [3, 1, 1, 1, 3, 4, 4], "record(table, team, scored, conceded) should keep [P, W, D, L, GF, GA, Pts] — got " + str(_t["A"])',
    requires: [{ node: "FunctionDef", min: 2 }, { call: "sorted" }, { node: "JoinedStr" }],
    hints: ["record: row = table.setdefault(team, [0, 0, 0, 0, 0, 0, 0]) — then update by index", "def rank_key(item): name, r = item; return (-r[6], -(r[4] - r[5]), -r[4], name)", 'print(f"{name:<10}{r[0]:>3}{r[1]:>3}{r[2]:>3}{r[3]:>3}{r[4] - r[5]:>+5}{r[6]:>5}")'],
    solution: 'def record(table, team, scored, conceded):\n    row = table.setdefault(team, [0, 0, 0, 0, 0, 0, 0])\n    row[0] += 1\n    if scored > conceded:\n        row[1] += 1\n        row[6] += 3\n    elif scored == conceded:\n        row[2] += 1\n        row[6] += 1\n    else:\n        row[3] += 1\n    row[4] += scored\n    row[5] += conceded\n\ndef rank_key(item):\n    name, r = item\n    return (-r[6], -(r[4] - r[5]), -r[4], name)\n\ntable = {}\nwhile True:\n    line = input("Match (home goals away goals, or end): ")\n    if line.strip().lower() == "end":\n        break\n    parts = line.split()\n    if len(parts) != 4 or not parts[1].isdigit() or not parts[3].isdigit():\n        print("Format: Home 2 Away 1")\n        continue\n    home, hg, away, ag = parts[0], int(parts[1]), parts[2], int(parts[3])\n    if home == away:\n        print("A team can\'t play itself")\n        continue\n    record(table, home, hg, ag)\n    record(table, away, ag, hg)\n\nif not table:\n    print("No matches yet")\nelse:\n    ranking = sorted(table.items(), key=rank_key)\n    print(f"{\'Team\':<10}{\'P\':>3}{\'W\':>3}{\'D\':>3}{\'L\':>3}{\'GD\':>5}{\'Pts\':>5}")\n    for name, r in ranking:\n        print(f"{name:<10}{r[0]:>3}{r[1]:>3}{r[2]:>3}{r[3]:>3}{r[4] - r[5]:>+5}{r[6]:>5}")\n    print(f"Leader: {ranking[0][0]}")',
  },
  cp3: (() => {
    const v = cp3("Lions,2,Tigers,1\nOwls,0,Lions,0\nTigers,3,Owls,1\n");
    const h1 = cp3(null);
    const h2 = cp3("A,1,B,0\nbad line\nC,x,D,1\nC,-1,D,0\nB,2,A,2\n");
    return {
      id: "cp3", kind: "make", title: "Checkpoint 3 — results in, table out",
      task: <>Results now arrive in <code>results.txt</code>, one <code>Home,HG,Away,AG</code> per line. Write your own <code>InvalidScoreError</code>, raised by a <code>parse_result(line)</code> function for negative goals or a team playing itself; a line that won't split into four parts or whose goals aren't numbers is a <code>ValueError</code>. Skip every bad line and report <code>Loaded 3 matches</code> and (if any) <code>Skipped 3 bad line(s)</code>; a missing file → <code>No results file</code> and nothing else. Print the table exactly as in checkpoint 2 with <code>Leader: …</code>, then save it to <code>table.csv</code> — header <code>Team,P,W,D,L,GF,GA,Pts</code>, then one ranked row per team — and print <code>Table saved</code>.</>,
      minLines: 44,
      tests: [
        { setup: files({ "results.txt": "Lions,2,Tigers,1\nOwls,0,Lions,0\nTigers,3,Owls,1\n", "table.csv": null }), expect: v.out, post: fileIs("table.csv", v.lines, "table.csv should have the header line, then one ranked row per team: Team,P,W,D,L,GF,GA,Pts.") },
        { setup: files({ "results.txt": null }), expect: h1.out, hidden: true, why: "No results.txt: print No results file and stop." },
        { setup: files({ "results.txt": "A,1,B,0\nbad line\nC,x,D,1\nC,-1,D,0\nB,2,A,2\n", "table.csv": null }), expect: h2.out, post: fileIs("table.csv", h2.lines), hidden: true, why: "Three bad lines: wrong shape, a non-number and a negative score (InvalidScoreError)." },
      ],
      requires: [{ node: "ClassDef", msg: "Define class InvalidScoreError(Exception)." }, { node: "Raise" }, { node: "Try", min: 2 }, { node: "With", min: 2 }],
      hints: ["parse_result: home, hg, away, ag = line.strip().split(\",\") then int(...) — both can raise ValueError by themselves", "if hg < 0 or ag < 0 or home == away: raise InvalidScoreError(line)", "except (ValueError, InvalidScoreError): bad += 1", 'f.write(",".join([name] + [str(x) for x in r]) + "\\n")'],
      solution: 'class InvalidScoreError(Exception):\n    pass\n\ndef parse_result(line):\n    home, hg, away, ag = line.strip().split(",")\n    hg, ag = int(hg), int(ag)\n    if hg < 0 or ag < 0 or home == away:\n        raise InvalidScoreError(line)\n    return home, hg, away, ag\n\ndef record(table, team, scored, conceded):\n    row = table.setdefault(team, [0, 0, 0, 0, 0, 0, 0])\n    row[0] += 1\n    if scored > conceded:\n        row[1] += 1\n        row[6] += 3\n    elif scored == conceded:\n        row[2] += 1\n        row[6] += 1\n    else:\n        row[3] += 1\n    row[4] += scored\n    row[5] += conceded\n\ndef rank_key(item):\n    name, r = item\n    return (-r[6], -(r[4] - r[5]), -r[4], name)\n\ntry:\n    with open("results.txt") as f:\n        lines = [l for l in f if l.strip()]\nexcept FileNotFoundError:\n    print("No results file")\nelse:\n    table, loaded, bad = {}, 0, 0\n    for line in lines:\n        try:\n            home, hg, away, ag = parse_result(line)\n        except (ValueError, InvalidScoreError):\n            bad += 1\n            continue\n        record(table, home, hg, ag)\n        record(table, away, ag, hg)\n        loaded += 1\n    print(f"Loaded {loaded} matches")\n    if bad:\n        print(f"Skipped {bad} bad line(s)")\n    ranking = sorted(table.items(), key=rank_key)\n    print(f"{\'Team\':<10}{\'P\':>3}{\'W\':>3}{\'D\':>3}{\'L\':>3}{\'GD\':>5}{\'Pts\':>5}")\n    for name, r in ranking:\n        print(f"{name:<10}{r[0]:>3}{r[1]:>3}{r[2]:>3}{r[3]:>3}{r[4] - r[5]:>+5}{r[6]:>5}")\n    print(f"Leader: {ranking[0][0]}")\n    with open("table.csv", "w") as f:\n        f.write("Team,P,W,D,L,GF,GA,Pts\\n")\n        for name, r in ranking:\n            f.write(",".join([name] + [str(x) for x in r]) + "\\n")\n    print("Table saved")',
    };
  })(),
  cp4: {
    id: "cp4", kind: "make", title: "Checkpoint 4 — Team and League classes",
    task: <>Write two classes. <code>Team(name)</code> with attributes <code>played, won, drawn, lost, gf, ga</code>; <code>record(scored, conceded)</code>; <code>points()</code>; <code>goal_diff()</code>; and <code>__str__</code> → <code>Lions: 4 pts, GD +1</code>. <code>League()</code> with a dict <code>self.teams</code>; <code>add_result(home, hg, away, ag)</code> — raises <code>ValueError</code> for negative goals or a team playing itself, creates teams as needed; <code>standings()</code> (Team objects, ranked as in checkpoint 2); <code>leader()</code>. Main: read match lines like checkpoint 2, but any bad line (wrong shape, non-number, negative, same team) prints <code>Invalid match: …</code> with the line. Then print the standings numbered — <code>1. Lions: 4 pts, GD +1</code> — and <code>Leader: Lions</code> (or <code>No matches yet</code>). Hidden checks use your classes directly.</>,
    minLines: 44,
    tests: [
      { inputs: ["Lions 2 Tigers 1", "Owls 0 Lions 0", "Tigers 3 Owls 1", "Owls -1 Lions 0", "end"], expect: cp4(["Lions 2 Tigers 1", "Owls 0 Lions 0", "Tigers 3 Owls 1", "Owls -1 Lions 0", "end"]) },
      { inputs: ["X 1 X 0", "Y two Z 1", "end"], expect: cp4(["X 1 X 0", "Y two Z 1", "end"]), hidden: true },
    ],
    post: CP4_POST,
    requires: [{ node: "ClassDef", min: 2 }],
    hints: ["League.add_result: check first, then self.teams.setdefault(home, Team(home)).record(hg, ag) — same for away", "standings(): sorted(self.teams.values(), key=lambda t: (-t.points(), -t.goal_diff(), -t.gf, t.name)) — or a def key", 'Main: try: league.add_result(home, int(hg), away, int(ag)) except ValueError: print(f"Invalid match: {line}")'],
    solution: 'class Team:\n    def __init__(self, name):\n        self.name = name\n        self.played = self.won = self.drawn = self.lost = 0\n        self.gf = self.ga = 0\n\n    def record(self, scored, conceded):\n        self.played += 1\n        self.gf += scored\n        self.ga += conceded\n        if scored > conceded:\n            self.won += 1\n        elif scored == conceded:\n            self.drawn += 1\n        else:\n            self.lost += 1\n\n    def points(self):\n        return 3 * self.won + self.drawn\n\n    def goal_diff(self):\n        return self.gf - self.ga\n\n    def __str__(self):\n        return f"{self.name}: {self.points()} pts, GD {self.goal_diff():+d}"\n\nclass League:\n    def __init__(self):\n        self.teams = {}\n\n    def add_result(self, home, hg, away, ag):\n        if hg < 0 or ag < 0 or home == away:\n            raise ValueError("invalid match")\n        self.teams.setdefault(home, Team(home)).record(hg, ag)\n        self.teams.setdefault(away, Team(away)).record(ag, hg)\n\n    def standings(self):\n        return sorted(self.teams.values(), key=lambda t: (-t.points(), -t.goal_diff(), -t.gf, t.name))\n\n    def leader(self):\n        return self.standings()[0]\n\nleague = League()\nwhile True:\n    line = input("Match (home goals away goals, or end): ")\n    if line.strip().lower() == "end":\n        break\n    parts = line.split()\n    try:\n        if len(parts) != 4:\n            raise ValueError("format")\n        league.add_result(parts[0], int(parts[1]), parts[2], int(parts[3]))\n    except ValueError:\n        print(f"Invalid match: {line}")\n\nif not league.teams:\n    print("No matches yet")\nelse:\n    for i, team in enumerate(league.standings(), start=1):\n        print(f"{i}. {team}")\n    print(f"Leader: {league.leader().name}")',
  },
  cp5: (() => {
    const a = cp5(GAMES), b = cp5(GAMES2);
    return {
      id: "cp5", kind: "make", title: "Checkpoint 5 — the season in numbers",
      timeoutMs: 30000,
      task: <><code>matches.csv</code> holds a season: Date, Home, HG (home goals), Away, AG. With pandas print <code>Matches: 6</code> and <code>Goals per match: 2.83</code>; then <code>Goals scored:</code> and each team's goals (home goals + away goals), most first — <code>int(…)</code> them; then <code>Top scorers: Lions</code> and the <code>Biggest win: Tigers 4-0 Owls</code> (largest goal difference, the first one if tied). Draw goals per team as a bar chart, most first, titled <code>Goals scored</code>. Hidden tests use another league.</>,
      show: GAMES, showLabel: "matches.csv — ALREADY IN THE FOLDER",
      minLines: 16,
      tests: [
        { setup: files({ "matches.csv": GAMES }), expect: a.out, post: a.post },
        { setup: files({ "matches.csv": GAMES2 }), expect: b.out, post: b.post, hidden: true, why: "Another league: every number and the chart must come from the DataFrame." },
      ],
      requires: [{ call: "read_csv" }, { call: "groupby", min: 2 }, { call: "bar" }],
      hints: ['home = df.groupby("Home")["HG"].sum(); away = df.groupby("Away")["AG"].sum()', "goals = home.add(away, fill_value=0).sort_values(ascending=False)", 'diff = (df["HG"] - df["AG"]).abs(); row = df.loc[diff.idxmax()]'],
      solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("matches.csv")\nprint(f"Matches: {len(df)}")\nprint(f"Goals per match: {(df[\'HG\'] + df[\'AG\']).mean():.2f}")\n\nhome = df.groupby("Home")["HG"].sum()\naway = df.groupby("Away")["AG"].sum()\ngoals = home.add(away, fill_value=0).sort_values(ascending=False)\nprint("Goals scored:")\nfor team, g in goals.items():\n    print(f"{team}: {int(g)}")\nprint(f"Top scorers: {goals.index[0]}")\n\ndiff = (df["HG"] - df["AG"]).abs()\nrow = df.loc[diff.idxmax()]\nprint(f"Biggest win: {row[\'Home\']} {row[\'HG\']}-{row[\'AG\']} {row[\'Away\']}")\n\nplt.bar(goals.index, goals.values, color="teal")\nplt.title("Goals scored")\nplt.ylabel("Goals")\nplt.show()',
    };
  })(),
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "W W D W W W L — the best winning run is…", options: ["2", "3", "5", "6"], answer: 1, explain: "A draw or loss resets the run to 0; the longest is W W W." },
  { q: "Why one sort key returning (-points, -gd, -gf, name)?", options: ["Tuples sort item by item — later items only break ties", "It's faster", "Names must come first", "sorted needs four values"], answer: 0, explain: "Minus signs turn 'highest first' into Python's smallest-first order." },
  { q: "f\"{3:>+5}\" gives…", options: ["\"3\"", "\"   +3\"", "\"+3   \"", "\"00003\""], answer: 1, explain: "+ shows the sign; >5 right-aligns in 5 characters." },
  { q: "home.add(away, fill_value=0) is needed because…", options: ["add is faster than +", "A team that never played away would otherwise get NaN", "Goals are strings", "It sorts the result"], answer: 1, explain: "Missing labels count as 0 instead of NaN." },
];

export default function UnitMP_LEAGUE(props) {
  const sections = [
    { label: "1 · Core", kicker: "CHECKPOINT 1 · AFTER M4–M6", title: "One team's season", blocks: [
      <P>Cricket, football, kabaddi, an esports bracket — every league runs on the same arithmetic: results in, table out. You'll build a league tracker in five checkpoints, each a complete program.</P>,
      <Roadmap color={T.green} rows={[["1 · Core logic", "M4–M6", "one team's W/D/L: points, record, best winning run"], ["2 · Organise it", "M7–M8", "a points table in a dict, ranked with a sort key, aligned"], ["3 · Make it survive", "M9", "results file in, table file out; InvalidScoreError"], ["4 · Model it", "M10", "Team and League classes"], ["5 · Analyse & chart", "M12–M13", "goals per team, biggest win, chart"]]} />,
      EX.cp1,
    ] },
    { label: "2 · Organise", kicker: "CHECKPOINT 2 · AFTER M7–M8", title: "The points table", blocks: [EX.cp2, <KeyIdea>Tie-breakers are just more items in the sort key. Real leagues differ only in which items, and in what order.</KeyIdea>] },
    { label: "3 · Survive", kicker: "CHECKPOINT 3 · AFTER M9", title: "Results in, table out", blocks: [EX.cp3] },
    { label: "4 · Model", kicker: "CHECKPOINT 4 · AFTER M10", title: "Team and League classes", blocks: [EX.cp4] },
    { label: "5 · Analyse", kicker: "CHECKPOINT 5 · AFTER M12–M13", title: "The season in numbers", blocks: [
      EX.cp5,
      <Note color={T.blue} icon="🎨">Make it yours: a weather-station log, a fitness step tracker or a game leaderboard follow the same five steps. Or bring your own idea of similar size to your teacher.</Note>,
    ] },
  ];
  return (
    <LessonShell {...props} unitId="UnitMP_LEAGUE" crumb="MINI-PROJECT › TRACK D" title="Sports League Tracker" sections={sections} quiz={QUIZ}
      next={{ title: "Track complete!", text: "From W/D/L to a whole season's analysis. Try another track, or head to the Finish Line." }} />
  );
}
