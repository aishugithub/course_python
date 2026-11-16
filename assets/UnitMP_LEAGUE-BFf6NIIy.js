import{j as e}from"./index-B7nVsXSH.js";import{P as E,T as k,K as W,N as C,L as M}from"./Lesson-TE-z-zj8.js";import{R as H,a as p,f as L,p as P,b as N,F as O,t as $,d as F,C as u}from"./project-CVPaOm-M.js";function g(r){const s=u(r),t=s.ask("Team: ");let i=0,n=0,o=0,l=0,a=0;for(;;){const f=s.ask("Result (W/D/L, or end): ").trim().toUpperCase();if(f==="END")break;f==="W"?(i++,l++,a=Math.max(a,l)):f==="D"?(n++,l=0):f==="L"?(o++,l=0):s.say("Type W, D, L or end")}const d=i+n+o;return d?(s.say(`${t}: P${d} W${i} D${n} L${o}`,`Points: ${3*i+n}`,`Best winning run: ${a}`),o||s.say("Unbeaten!")):s.say("No matches played"),s.text()}const j="Match (home goals away goals, or end): ";function b(){return new Map}function h(r,s,t,i){const n=r.get(s)||[0,0,0,0,0,0,0];n[0]++,t>i?(n[1]++,n[6]+=3):t===i?(n[2]++,n[6]+=1):n[3]++,n[4]+=t,n[5]+=i,r.set(s,n)}const x=r=>[...r].sort((s,t)=>t[1][6]-s[1][6]||t[1][4]-t[1][5]-(s[1][4]-s[1][5])||t[1][4]-s[1][4]||(s[0]<t[0]?-1:1)),v=r=>r>=0?"+"+r:String(r),G=()=>"Team".padEnd(10)+["P","W","D","L"].map(r=>r.padStart(3)).join("")+"GD".padStart(5)+"Pts".padStart(5),D=([r,s])=>r.padEnd(10)+[s[0],s[1],s[2],s[3]].map(t=>String(t).padStart(3)).join("")+v(s[4]-s[5]).padStart(5)+String(s[6]).padStart(5);function m(r){const s=u(r),t=b();for(;;){const i=s.ask(j);if(i.trim().toLowerCase()==="end")break;const n=i.split(/\s+/).filter(Boolean);if(n.length!==4||!/^\d+$/.test(n[1])||!/^\d+$/.test(n[3])){s.say("Format: Home 2 Away 1");continue}if(n[0]===n[2]){s.say("A team can't play itself");continue}h(t,n[0],+n[1],+n[3]),h(t,n[2],+n[3],+n[1])}if(!t.size)s.say("No matches yet");else{const i=x(t);s.say(G(),...i.map(D),`Leader: ${i[0][0]}`)}return s.text()}function w(r){const s=u([]);if(r===null)return s.say("No results file"),{out:s.text(),lines:null};const t=b();let i=0,n=0;r.split(`
`).filter(l=>l.trim()).forEach(l=>{const a=l.trim().split(",");if(a.length!==4||!/^-?\d+$/.test(a[1])||!/^-?\d+$/.test(a[3])||+a[1]<0||+a[3]<0||a[0]===a[2]){n++;return}h(t,a[0],+a[1],+a[3]),h(t,a[2],+a[3],+a[1]),i++}),s.say(`Loaded ${i} matches`),n&&s.say(`Skipped ${n} bad line(s)`);const o=x(t);return s.say(G(),...o.map(D),`Leader: ${o[0][0]}`,"Table saved"),{out:s.text(),lines:["Team,P,W,D,L,GF,GA,Pts",...o.map(([l,a])=>[l,...a].join(","))]}}function A(r){const s=u(r),t=b();for(;;){const n=s.ask(j);if(n.trim().toLowerCase()==="end")break;const o=n.split(/\s+/).filter(Boolean);if(o.length!==4||!/^-?\d+$/.test(o[1])||!/^-?\d+$/.test(o[3])||o[0]===o[2]||+o[1]<0||+o[3]<0){s.say(`Invalid match: ${n}`);continue}h(t,o[0],+o[1],+o[3]),h(t,o[2],+o[3],+o[1])}const i=x(t);return i.forEach(([n,o],l)=>s.say(`${l+1}. ${n}: ${o[6]} pts, GD ${v(o[4]-o[5])}`)),s.say(i.length?`Leader: ${i[0][0]}`:"No matches yet"),s.text()}const S=`_a = Team("A")
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
        pass`,y=`Date,Home,HG,Away,AG
2026-08-01,Lions,2,Tigers,1
2026-08-01,Owls,0,Hawks,1
2026-08-08,Tigers,4,Owls,0
2026-08-08,Hawks,2,Lions,2
2026-08-15,Lions,3,Owls,1
2026-08-15,Hawks,0,Tigers,1
`,T=`Date,Home,HG,Away,AG
2026-09-01,Bees,3,Ants,0
2026-09-01,Crows,1,Doves,1
2026-09-08,Ants,2,Crows,5
2026-09-08,Doves,0,Bees,1
`;function _(r){const s=P(r),t=new Map;s.forEach(a=>{t.set(a.Home,(t.get(a.Home)||0)+a.HG),t.set(a.Away,(t.get(a.Away)||0)+a.AG)});const i=N([...t]),n=s.reduce((a,d)=>a+d.HG+d.AG,0),o=s.reduce((a,d)=>Math.abs(d.HG-d.AG)>Math.abs(a.HG-a.AG)?d:a);return{out:[`Matches: ${s.length}`,`Goals per match: ${(n/s.length).toFixed(2)}`,"Goals scored:",...i.map(([a,d])=>`${a}: ${d}`),`Top scorers: ${i[0][0]}`,`Biggest win: ${o.Home} ${o.HG}-${o.AG} ${o.Away}`].join(`
`),post:O()+$("Goals scored")+F(i,"_ax","bars (teams, most goals first)")}}const c={cp1:{id:"cp1",kind:"make",title:"Checkpoint 1 — one team's season",task:e.jsxs(e.Fragment,{children:["Ask ",e.jsx("code",{children:"Team: "}),", then read results with ",e.jsx("code",{children:"Result (W/D/L, or end): "})," until ",e.jsx("code",{children:"end"})," (any capitals). Anything else → ",e.jsx("code",{children:"Type W, D, L or end"}),". Count wins, draws and losses, and track the ",e.jsx("strong",{children:"longest run of wins in a row"}),". Then print ",e.jsx("code",{children:"Lions: P7 W5 D1 L1"}),", ",e.jsx("code",{children:"Points: 16"})," (3 per win, 1 per draw), ",e.jsx("code",{children:"Best winning run: 3"}),", and ",e.jsx("code",{children:"Unbeaten!"})," if there were no losses. With no matches: ",e.jsx("code",{children:"No matches played"}),"."]}),minLines:22,tests:[{inputs:["Lions","W","w","D","L","W","W","W","end"],expect:g(["Lions","W","w","D","L","W","W","W","end"])},{inputs:["Tigers","D","x","W","W","END"],expect:g(["Tigers","D","x","W","W","END"]),hidden:!0,why:"A bad result is refused, END in capitals still ends, and no losses means Unbeaten!"},{inputs:["Owls","end"],expect:g(["Owls","end"]),hidden:!0,why:"No results at all: print only No matches played."}],requires:[{node:"While"},{call:"upper"}],hints:["run counts the current streak: +1 on a win, back to 0 on a draw or loss","best = max(best, run) after every win",'result = input("Result (W/D/L, or end): ").strip().upper()'],solution:`team = input("Team: ")
wins = draws = losses = 0
run = best = 0
while True:
    result = input("Result (W/D/L, or end): ").strip().upper()
    if result == "END":
        break
    if result == "W":
        wins += 1
        run += 1
        best = max(best, run)
    elif result == "D":
        draws += 1
        run = 0
    elif result == "L":
        losses += 1
        run = 0
    else:
        print("Type W, D, L or end")

played = wins + draws + losses
if played == 0:
    print("No matches played")
else:
    print(f"{team}: P{played} W{wins} D{draws} L{losses}")
    print(f"Points: {3 * wins + draws}")
    print(f"Best winning run: {best}")
    if losses == 0:
        print("Unbeaten!")`},cp2:{id:"cp2",kind:"make",title:"Checkpoint 2 — the points table",task:e.jsxs(e.Fragment,{children:["Read match lines like ",e.jsx("code",{children:"Lions 2 Tigers 1"})," with ",e.jsx("code",{children:"Match (home goals away goals, or end): "})," until ",e.jsx("code",{children:"end"}),". Not four parts with whole-number goals → ",e.jsx("code",{children:"Format: Home 2 Away 1"}),"; a team against itself → ",e.jsx("code",{children:"A team can't play itself"}),". Keep a dict ",e.jsx("code",{children:"team → [P, W, D, L, GF, GA, Pts]"}),", updated by your function ",e.jsx("code",{children:"record(table, team, scored, conceded)"})," (called twice per match). Rank by points, then goal difference, then goals scored, then name — one ",e.jsx("code",{children:"sorted"})," with a key function. Print the aligned table — ",e.jsx("code",{children:"Team"})," left in 10, P/W/D/L right in 3, GD with a sign right in 5 (",e.jsx("code",{children:"{gd:>+5}"}),"), Pts right in 5 — then ",e.jsx("code",{children:"Leader: Lions"}),". With no valid matches: ",e.jsx("code",{children:"No matches yet"}),"."]}),minLines:30,tests:[{inputs:["Lions 2 Tigers 1","Owls 0 Lions 0","Tigers 3 Owls 1","end"],expect:m(["Lions 2 Tigers 1","Owls 0 Lions 0","Tigers 3 Owls 1","end"])},{inputs:["A 1 B 0","C 3 D 0","B 2 C 2","x y","A 1 A 0","end"],expect:m(["A 1 B 0","C 3 D 0","B 2 C 2","x y","A 1 A 0","end"]),hidden:!0,why:"Bad lines and a team playing itself are refused; C ranks above A on points."},{inputs:["Bees 1 Ants 1","end"],expect:m(["Bees 1 Ants 1","end"]),hidden:!0,why:"Level on everything → alphabetical. A goal difference of 0 prints as +0 with {gd:>+5}."},{inputs:["end"],expect:m(["end"]),hidden:!0}],post:`_t = {}
record(_t, "A", 2, 1)
record(_t, "A", 0, 0)
record(_t, "A", 1, 3)
assert _t["A"] == [3, 1, 1, 1, 3, 4, 4], "record(table, team, scored, conceded) should keep [P, W, D, L, GF, GA, Pts] — got " + str(_t["A"])`,requires:[{node:"FunctionDef",min:2},{call:"sorted"},{node:"JoinedStr"}],hints:["record: row = table.setdefault(team, [0, 0, 0, 0, 0, 0, 0]) — then update by index","def rank_key(item): name, r = item; return (-r[6], -(r[4] - r[5]), -r[4], name)",'print(f"{name:<10}{r[0]:>3}{r[1]:>3}{r[2]:>3}{r[3]:>3}{r[4] - r[5]:>+5}{r[6]:>5}")'],solution:`def record(table, team, scored, conceded):
    row = table.setdefault(team, [0, 0, 0, 0, 0, 0, 0])
    row[0] += 1
    if scored > conceded:
        row[1] += 1
        row[6] += 3
    elif scored == conceded:
        row[2] += 1
        row[6] += 1
    else:
        row[3] += 1
    row[4] += scored
    row[5] += conceded

def rank_key(item):
    name, r = item
    return (-r[6], -(r[4] - r[5]), -r[4], name)

table = {}
while True:
    line = input("Match (home goals away goals, or end): ")
    if line.strip().lower() == "end":
        break
    parts = line.split()
    if len(parts) != 4 or not parts[1].isdigit() or not parts[3].isdigit():
        print("Format: Home 2 Away 1")
        continue
    home, hg, away, ag = parts[0], int(parts[1]), parts[2], int(parts[3])
    if home == away:
        print("A team can't play itself")
        continue
    record(table, home, hg, ag)
    record(table, away, ag, hg)

if not table:
    print("No matches yet")
else:
    ranking = sorted(table.items(), key=rank_key)
    print(f"{'Team':<10}{'P':>3}{'W':>3}{'D':>3}{'L':>3}{'GD':>5}{'Pts':>5}")
    for name, r in ranking:
        print(f"{name:<10}{r[0]:>3}{r[1]:>3}{r[2]:>3}{r[3]:>3}{r[4] - r[5]:>+5}{r[6]:>5}")
    print(f"Leader: {ranking[0][0]}")`},cp3:(()=>{const r=w(`Lions,2,Tigers,1
Owls,0,Lions,0
Tigers,3,Owls,1
`),s=w(null),t=w(`A,1,B,0
bad line
C,x,D,1
C,-1,D,0
B,2,A,2
`);return{id:"cp3",kind:"make",title:"Checkpoint 3 — results in, table out",task:e.jsxs(e.Fragment,{children:["Results now arrive in ",e.jsx("code",{children:"results.txt"}),", one ",e.jsx("code",{children:"Home,HG,Away,AG"})," per line. Write your own ",e.jsx("code",{children:"InvalidScoreError"}),", raised by a ",e.jsx("code",{children:"parse_result(line)"})," function for negative goals or a team playing itself; a line that won't split into four parts or whose goals aren't numbers is a ",e.jsx("code",{children:"ValueError"}),". Skip every bad line and report ",e.jsx("code",{children:"Loaded 3 matches"})," and (if any) ",e.jsx("code",{children:"Skipped 3 bad line(s)"}),"; a missing file → ",e.jsx("code",{children:"No results file"})," and nothing else. Print the table exactly as in checkpoint 2 with ",e.jsx("code",{children:"Leader: …"}),", then save it to ",e.jsx("code",{children:"table.csv"})," — header ",e.jsx("code",{children:"Team,P,W,D,L,GF,GA,Pts"}),", then one ranked row per team — and print ",e.jsx("code",{children:"Table saved"}),"."]}),minLines:44,tests:[{setup:p({"results.txt":`Lions,2,Tigers,1
Owls,0,Lions,0
Tigers,3,Owls,1
`,"table.csv":null}),expect:r.out,post:L("table.csv",r.lines,"table.csv should have the header line, then one ranked row per team: Team,P,W,D,L,GF,GA,Pts.")},{setup:p({"results.txt":null}),expect:s.out,hidden:!0,why:"No results.txt: print No results file and stop."},{setup:p({"results.txt":`A,1,B,0
bad line
C,x,D,1
C,-1,D,0
B,2,A,2
`,"table.csv":null}),expect:t.out,post:L("table.csv",t.lines),hidden:!0,why:"Three bad lines: wrong shape, a non-number and a negative score (InvalidScoreError)."}],requires:[{node:"ClassDef",msg:"Define class InvalidScoreError(Exception)."},{node:"Raise"},{node:"Try",min:2},{node:"With",min:2}],hints:['parse_result: home, hg, away, ag = line.strip().split(",") then int(...) — both can raise ValueError by themselves',"if hg < 0 or ag < 0 or home == away: raise InvalidScoreError(line)","except (ValueError, InvalidScoreError): bad += 1",'f.write(",".join([name] + [str(x) for x in r]) + "\\n")'],solution:`class InvalidScoreError(Exception):
    pass

def parse_result(line):
    home, hg, away, ag = line.strip().split(",")
    hg, ag = int(hg), int(ag)
    if hg < 0 or ag < 0 or home == away:
        raise InvalidScoreError(line)
    return home, hg, away, ag

def record(table, team, scored, conceded):
    row = table.setdefault(team, [0, 0, 0, 0, 0, 0, 0])
    row[0] += 1
    if scored > conceded:
        row[1] += 1
        row[6] += 3
    elif scored == conceded:
        row[2] += 1
        row[6] += 1
    else:
        row[3] += 1
    row[4] += scored
    row[5] += conceded

def rank_key(item):
    name, r = item
    return (-r[6], -(r[4] - r[5]), -r[4], name)

try:
    with open("results.txt") as f:
        lines = [l for l in f if l.strip()]
except FileNotFoundError:
    print("No results file")
else:
    table, loaded, bad = {}, 0, 0
    for line in lines:
        try:
            home, hg, away, ag = parse_result(line)
        except (ValueError, InvalidScoreError):
            bad += 1
            continue
        record(table, home, hg, ag)
        record(table, away, ag, hg)
        loaded += 1
    print(f"Loaded {loaded} matches")
    if bad:
        print(f"Skipped {bad} bad line(s)")
    ranking = sorted(table.items(), key=rank_key)
    print(f"{'Team':<10}{'P':>3}{'W':>3}{'D':>3}{'L':>3}{'GD':>5}{'Pts':>5}")
    for name, r in ranking:
        print(f"{name:<10}{r[0]:>3}{r[1]:>3}{r[2]:>3}{r[3]:>3}{r[4] - r[5]:>+5}{r[6]:>5}")
    print(f"Leader: {ranking[0][0]}")
    with open("table.csv", "w") as f:
        f.write("Team,P,W,D,L,GF,GA,Pts\\n")
        for name, r in ranking:
            f.write(",".join([name] + [str(x) for x in r]) + "\\n")
    print("Table saved")`}})(),cp4:{id:"cp4",kind:"make",title:"Checkpoint 4 — Team and League classes",task:e.jsxs(e.Fragment,{children:["Write two classes. ",e.jsx("code",{children:"Team(name)"})," with attributes ",e.jsx("code",{children:"played, won, drawn, lost, gf, ga"}),"; ",e.jsx("code",{children:"record(scored, conceded)"}),"; ",e.jsx("code",{children:"points()"}),"; ",e.jsx("code",{children:"goal_diff()"}),"; and ",e.jsx("code",{children:"__str__"})," → ",e.jsx("code",{children:"Lions: 4 pts, GD +1"}),". ",e.jsx("code",{children:"League()"})," with a dict ",e.jsx("code",{children:"self.teams"}),"; ",e.jsx("code",{children:"add_result(home, hg, away, ag)"})," — raises ",e.jsx("code",{children:"ValueError"})," for negative goals or a team playing itself, creates teams as needed; ",e.jsx("code",{children:"standings()"})," (Team objects, ranked as in checkpoint 2); ",e.jsx("code",{children:"leader()"}),". Main: read match lines like checkpoint 2, but any bad line (wrong shape, non-number, negative, same team) prints ",e.jsx("code",{children:"Invalid match: …"})," with the line. Then print the standings numbered — ",e.jsx("code",{children:"1. Lions: 4 pts, GD +1"})," — and ",e.jsx("code",{children:"Leader: Lions"})," (or ",e.jsx("code",{children:"No matches yet"}),"). Hidden checks use your classes directly."]}),minLines:44,tests:[{inputs:["Lions 2 Tigers 1","Owls 0 Lions 0","Tigers 3 Owls 1","Owls -1 Lions 0","end"],expect:A(["Lions 2 Tigers 1","Owls 0 Lions 0","Tigers 3 Owls 1","Owls -1 Lions 0","end"])},{inputs:["X 1 X 0","Y two Z 1","end"],expect:A(["X 1 X 0","Y two Z 1","end"]),hidden:!0}],post:S,requires:[{node:"ClassDef",min:2}],hints:["League.add_result: check first, then self.teams.setdefault(home, Team(home)).record(hg, ag) — same for away","standings(): sorted(self.teams.values(), key=lambda t: (-t.points(), -t.goal_diff(), -t.gf, t.name)) — or a def key",'Main: try: league.add_result(home, int(hg), away, int(ag)) except ValueError: print(f"Invalid match: {line}")'],solution:`class Team:
    def __init__(self, name):
        self.name = name
        self.played = self.won = self.drawn = self.lost = 0
        self.gf = self.ga = 0

    def record(self, scored, conceded):
        self.played += 1
        self.gf += scored
        self.ga += conceded
        if scored > conceded:
            self.won += 1
        elif scored == conceded:
            self.drawn += 1
        else:
            self.lost += 1

    def points(self):
        return 3 * self.won + self.drawn

    def goal_diff(self):
        return self.gf - self.ga

    def __str__(self):
        return f"{self.name}: {self.points()} pts, GD {self.goal_diff():+d}"

class League:
    def __init__(self):
        self.teams = {}

    def add_result(self, home, hg, away, ag):
        if hg < 0 or ag < 0 or home == away:
            raise ValueError("invalid match")
        self.teams.setdefault(home, Team(home)).record(hg, ag)
        self.teams.setdefault(away, Team(away)).record(ag, hg)

    def standings(self):
        return sorted(self.teams.values(), key=lambda t: (-t.points(), -t.goal_diff(), -t.gf, t.name))

    def leader(self):
        return self.standings()[0]

league = League()
while True:
    line = input("Match (home goals away goals, or end): ")
    if line.strip().lower() == "end":
        break
    parts = line.split()
    try:
        if len(parts) != 4:
            raise ValueError("format")
        league.add_result(parts[0], int(parts[1]), parts[2], int(parts[3]))
    except ValueError:
        print(f"Invalid match: {line}")

if not league.teams:
    print("No matches yet")
else:
    for i, team in enumerate(league.standings(), start=1):
        print(f"{i}. {team}")
    print(f"Leader: {league.leader().name}")`},cp5:(()=>{const r=_(y),s=_(T);return{id:"cp5",kind:"make",title:"Checkpoint 5 — the season in numbers",timeoutMs:3e4,task:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"matches.csv"})," holds a season: Date, Home, HG (home goals), Away, AG. With pandas print ",e.jsx("code",{children:"Matches: 6"})," and ",e.jsx("code",{children:"Goals per match: 2.83"}),"; then ",e.jsx("code",{children:"Goals scored:"})," and each team's goals (home goals + away goals), most first — ",e.jsx("code",{children:"int(…)"})," them; then ",e.jsx("code",{children:"Top scorers: Lions"})," and the ",e.jsx("code",{children:"Biggest win: Tigers 4-0 Owls"})," (largest goal difference, the first one if tied). Draw goals per team as a bar chart, most first, titled ",e.jsx("code",{children:"Goals scored"}),". Hidden tests use another league."]}),show:y,showLabel:"matches.csv — ALREADY IN THE FOLDER",minLines:16,tests:[{setup:p({"matches.csv":y}),expect:r.out,post:r.post},{setup:p({"matches.csv":T}),expect:s.out,post:s.post,hidden:!0,why:"Another league: every number and the chart must come from the DataFrame."}],requires:[{call:"read_csv"},{call:"groupby",min:2},{call:"bar"}],hints:['home = df.groupby("Home")["HG"].sum(); away = df.groupby("Away")["AG"].sum()',"goals = home.add(away, fill_value=0).sort_values(ascending=False)",'diff = (df["HG"] - df["AG"]).abs(); row = df.loc[diff.idxmax()]'],solution:`import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("matches.csv")
print(f"Matches: {len(df)}")
print(f"Goals per match: {(df['HG'] + df['AG']).mean():.2f}")

home = df.groupby("Home")["HG"].sum()
away = df.groupby("Away")["AG"].sum()
goals = home.add(away, fill_value=0).sort_values(ascending=False)
print("Goals scored:")
for team, g in goals.items():
    print(f"{team}: {int(g)}")
print(f"Top scorers: {goals.index[0]}")

diff = (df["HG"] - df["AG"]).abs()
row = df.loc[diff.idxmax()]
print(f"Biggest win: {row['Home']} {row['HG']}-{row['AG']} {row['Away']}")

plt.bar(goals.index, goals.values, color="teal")
plt.title("Goals scored")
plt.ylabel("Goals")
plt.show()`}})()},X=c,I=[{q:"W W D W W W L — the best winning run is…",options:["2","3","5","6"],answer:1,explain:"A draw or loss resets the run to 0; the longest is W W W."},{q:"Why one sort key returning (-points, -gd, -gf, name)?",options:["Tuples sort item by item — later items only break ties","It's faster","Names must come first","sorted needs four values"],answer:0,explain:"Minus signs turn 'highest first' into Python's smallest-first order."},{q:'f"{3:>+5}" gives…',options:['"3"','"   +3"','"+3   "','"00003"'],answer:1,explain:"+ shows the sign; >5 right-aligns in 5 characters."},{q:"home.add(away, fill_value=0) is needed because…",options:["add is faster than +","A team that never played away would otherwise get NaN","Goals are strings","It sorts the result"],answer:1,explain:"Missing labels count as 0 instead of NaN."}];function q(r){const s=[{label:"1 · Core",kicker:"CHECKPOINT 1 · AFTER M4–M6",title:"One team's season",blocks:[e.jsx(E,{children:"Cricket, football, kabaddi, an esports bracket — every league runs on the same arithmetic: results in, table out. You'll build a league tracker in five checkpoints, each a complete program."}),e.jsx(H,{color:k.green,rows:[["1 · Core logic","M4–M6","one team's W/D/L: points, record, best winning run"],["2 · Organise it","M7–M8","a points table in a dict, ranked with a sort key, aligned"],["3 · Make it survive","M9","results file in, table file out; InvalidScoreError"],["4 · Model it","M10","Team and League classes"],["5 · Analyse & chart","M12–M13","goals per team, biggest win, chart"]]}),c.cp1]},{label:"2 · Organise",kicker:"CHECKPOINT 2 · AFTER M7–M8",title:"The points table",blocks:[c.cp2,e.jsx(W,{children:"Tie-breakers are just more items in the sort key. Real leagues differ only in which items, and in what order."})]},{label:"3 · Survive",kicker:"CHECKPOINT 3 · AFTER M9",title:"Results in, table out",blocks:[c.cp3]},{label:"4 · Model",kicker:"CHECKPOINT 4 · AFTER M10",title:"Team and League classes",blocks:[c.cp4]},{label:"5 · Analyse",kicker:"CHECKPOINT 5 · AFTER M12–M13",title:"The season in numbers",blocks:[c.cp5,e.jsx(C,{color:k.blue,icon:"🎨",children:"Make it yours: a weather-station log, a fitness step tracker or a game leaderboard follow the same five steps. Or bring your own idea of similar size to your teacher."})]}];return e.jsx(M,{...r,unitId:"UnitMP_LEAGUE",crumb:"MINI-PROJECT › TRACK D",title:"Sports League Tracker",sections:s,quiz:I,next:{title:"Track complete!",text:"From W/D/L to a whole season's analysis. Try another track, or head to the Finish Line."}})}export{X as EXERCISES,q as default};
