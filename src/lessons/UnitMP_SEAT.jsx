// Mini-Project Track C — Event Seat Booking (new, typing-first)
// A fest / cinema / bus booking desk, five checkpoints: 1 seat counts with a
// waitlist (M4–6) → 2 a seat map as a 2-D list, seat codes as tuples (M7–8)
// → 3 bookings file + SeatTakenError (M9) → 4 Show and BookingOffice classes
// (M10) → 5 occupancy analysis + chart (M12–13). Simulators produce output.

import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";
import { files, fileIs, FIG, titleIs, barsAre, Console, parseCsv, sumBy, byKey, Roadmap } from "../kit/project.jsx";

// ── CP1: counts and a waitlist ──
function cp1(inputs) {
  const c = Console(inputs);
  const show = c.ask("Show: "), cap = +c.ask("Seats: ");
  c.say("1 Book  2 Cancel  3 Status  4 Quit");
  let booked = 0, wait = 0;
  for (;;) {
    const ch = c.ask("Choice: ");
    if (ch === "1") {
      const n = +c.ask("Tickets: "), free = cap - booked;
      if (n <= 0) c.say("Tickets must be positive");
      else if (n <= free) { booked += n; c.say(`Booked ${n}. ${cap - booked} seats left`); }
      else { c.say(`Only ${free} seats left`); if (c.ask("Join waitlist? (y/n): ").toLowerCase() === "y") { wait += n; c.say(`Added ${n} to the waitlist`); } }
    } else if (ch === "2") {
      const n = +c.ask("Tickets: ");
      if (n <= 0) c.say("Tickets must be positive");
      else if (n > booked) c.say(`Only ${booked} seats are booked`);
      else {
        booked -= n; c.say(`Cancelled ${n}`);
        if (wait > 0) { const m = Math.min(wait, cap - booked); booked += m; wait -= m; c.say(`${m} moved from the waitlist`); }
      }
    } else if (ch === "3") c.say(`${show}: ${booked}/${cap} booked, waitlist ${wait}`);
    else if (ch === "4") { c.say(`Final: ${booked} booked, ${wait} still waiting`); break; }
    else c.say("Unknown choice");
  }
  return c.text();
}

// ── CP2: the seat map ──
const ROWS = "ABCD", COLS = 6;
const parse = (code) => { const r = ROWS.indexOf(code[0]?.toUpperCase()); const n = /^\d+$/.test(code.slice(1)) ? +code.slice(1) : 0; return code.length >= 2 && r >= 0 && n >= 1 && n <= COLS ? [r, n - 1] : null; };
const HELP = "Commands: book A1, cancel A1, map, done";
function mapLines(seats) { return ["  " + Array.from({ length: COLS }, (_, i) => i + 1).join(" "), ...seats.map((row, r) => ROWS[r] + " " + row.join(" "))]; }
function cp2(inputs) {
  const c = Console(inputs);
  const seats = Array.from({ length: 4 }, () => Array(COLS).fill("."));
  for (;;) {
    const line = c.ask("Command: ");
    const p = line.split(/\s+/).filter(Boolean);
    if (p.length === 1 && p[0] === "done") break;
    if (p.length === 1 && p[0] === "map") { c.say(...mapLines(seats)); continue; }
    if (p.length !== 2 || !["book", "cancel"].includes(p[0])) { c.say(HELP); continue; }
    const code = p[1].toUpperCase(), rc = parse(p[1]);
    if (!rc) { c.say(`Invalid seat ${code}`); continue; }
    const [r, k] = rc;
    if (p[0] === "book") { if (seats[r][k] === "X") c.say(`${code} is already taken`); else { seats[r][k] = "X"; c.say(`Booked ${code}`); } }
    else if (seats[r][k] !== "X") c.say(`${code} is not booked`); else { seats[r][k] = "."; c.say(`Cancelled ${code}`); }
  }
  c.say(`Booked: ${seats.flat().filter((s) => s === "X").length}/24`);
  return c.text();
}

// ── CP3: the bookings file ──
function cp3(fileText, inputs) {
  const c = Console(inputs);
  const seats = Array.from({ length: 4 }, () => Array(COLS).fill("."));
  if (fileText === null) c.say("No bookings yet");
  else {
    let ok = 0, bad = 0;
    fileText.split("\n").filter((l) => l.trim()).forEach((l) => { const rc = parse(l.trim()); if (!rc || seats[rc[0]][rc[1]] === "X") bad++; else { seats[rc[0]][rc[1]] = "X"; ok++; } });
    c.say(`Loaded ${ok} booking(s)`); if (bad) c.say(`Skipped ${bad} bad line(s)`);
  }
  for (;;) {
    const p = c.ask("Command: ").split(/\s+/).filter(Boolean);
    if (p.length === 1 && p[0] === "done") break;
    if (p.length !== 2 || !["book", "cancel"].includes(p[0])) { c.say("Commands: book A1, cancel A1, done"); continue; }
    const code = p[1].toUpperCase(), rc = parse(p[1]);
    if (!rc) { c.say(`Invalid seat ${code}`); continue; }
    const [r, k] = rc;
    if (p[0] === "book") { if (seats[r][k] === "X") c.say(`${code} is already taken`); else { seats[r][k] = "X"; c.say(`Booked ${code}`); } }
    else if (seats[r][k] !== "X") c.say(`${code} is not booked`); else { seats[r][k] = "."; c.say(`Cancelled ${code}`); }
  }
  const lines = []; seats.forEach((row, r) => row.forEach((s, k) => { if (s === "X") lines.push(ROWS[r] + (k + 1)); }));
  c.say(`Saved ${lines.length} booking(s)`);
  return { out: c.text(), lines };
}

// ── CP4: classes ──
function cp4(inputs) {
  const c = Console(inputs);
  const shows = { Morning: new Set(), Evening: new Set() };
  for (;;) {
    const p = c.ask("Command: ").split(/\s+/).filter(Boolean);
    if (p.length === 1 && p[0] === "done") break;
    if (p.length !== 3 || !["book", "cancel"].includes(p[0])) { c.say("Commands: book Morning A1, cancel Morning A1, done"); continue; }
    const [cmd, name, raw] = p, code = raw.toUpperCase();
    if (!(name in shows)) { c.say(`No show called ${name}`); continue; }
    if (!parse(raw)) { c.say(`Invalid seat ${code}`); continue; }
    const s = shows[name];
    if (cmd === "book") { if (s.has(code)) c.say(`${code} is already taken`); else { s.add(code); c.say(`Booked ${code} for ${name}`); } }
    else if (!s.has(code)) c.say(`${code} is not booked`); else { s.delete(code); c.say(`Cancelled ${code} for ${name}`); }
  }
  Object.entries(shows).forEach(([n, s]) => c.say(`${n}: ${s.size}/24 booked`));
  return c.text();
}
const CP4_POST = `_s = Show("Test")
assert str(_s) == "Test: 0/24 booked", "str(Show) should look like Test: 0/24 booked — got " + str(_s)
_s.book("b4")
_s.book("A1")
assert _s.free_count() == 22, "free_count() should be 22 after two bookings."
assert _s.booked_seats() == ["A1", "B4"], "booked_seats() lists codes row by row: ['A1', 'B4'] — got " + str(_s.booked_seats())
try:
    _s.book("A1")
    raise AssertionError("Booking a taken seat should raise SeatTakenError.")
except SeatTakenError:
    pass
for _bad in ["E1", "A0", "A7", "1A", "A"]:
    try:
        _s.book(_bad)
        raise AssertionError(f"book('{_bad}') should raise ValueError.")
    except ValueError:
        pass
assert _s.cancel("A1") is True and _s.cancel("A1") is False, "cancel() returns True if it freed the seat, False if it wasn't booked."
_o = BookingOffice()
_o.add_show(Show("X"))
_o.book("X", "C3")
assert _o.shows["X"].booked_seats() == ["C3"], "BookingOffice.book(show, code) books on that show."
try:
    _o.book("Nope", "A1")
    raise AssertionError("An unknown show should raise KeyError.")
except KeyError:
    pass`;

// ── CP5: occupancy ──
const BOOK = "Show,Seat,Type,Price\nMorning,A1,student,100\nMorning,A2,student,100\nMorning,B4,regular,150\nEvening,A1,regular,150\nEvening,A2,regular,150\nEvening,A3,student,100\nEvening,B1,regular,150\nEvening,B2,regular,150\nEvening,C5,student,100\nMatinee,D6,regular,150\n";
const BOOK2 = "Show,Seat,Type,Price\nDay1,A1,regular,200\nDay1,A2,student,120\nDay2,B1,regular,200\nDay2,B2,regular,200\nDay2,B3,regular,200\nDay2,C1,student,120\nDay2,C2,student,120\n";
function cp5(csv) {
  const rows = parseCsv(csv);
  const sold = byKey(sumBy(rows, "Show", () => 1)), rev = new Map(sumBy(rows, "Show", (r) => r.Price));
  const best = sold.reduce((a, b) => (b[1] > a[1] ? b : a));
  const students = rows.filter((r) => r.Type === "student").length;
  const out = [...sold.map(([s, n]) => `${s}: ${n} sold, ${(n / 24 * 100).toFixed(1)}% full, revenue ${rev.get(s)}`), `Most popular: ${best[0]}`, `Student tickets: ${(students / rows.length * 100).toFixed(1)}%`].join("\n");
  const occ = sold.map(([s, n]) => [s, Math.round(n / 24 * 100 * 100) / 100]);
  return { out, post: FIG() + titleIs("Occupancy by show") + barsAre(occ, "_ax", "bars (shows in groupby order, height = % full)") };
}

const EX = {
  cp1: {
    id: "cp1", kind: "make", title: "Checkpoint 1 — the booking desk",
    task: <>Ask <code>Show: </code> and <code>Seats: </code>, print <code>1 Book  2 Cancel  3 Status  4 Quit</code> once, then loop on <code>Choice: </code>. <strong>1 Book</strong>: ask <code>Tickets: </code>; 0 or less → <code>Tickets must be positive</code>; if they fit, <code>Booked 8. 2 seats left</code>; if not, <code>Only 2 seats left</code> and ask <code>Join waitlist? (y/n): </code> — <code>y</code> or <code>Y</code> adds them: <code>Added 4 to the waitlist</code>. <strong>2 Cancel</strong>: ask <code>Tickets: </code>; refuse 0 or less, or more than are booked (<code>Only 5 seats are booked</code>); otherwise <code>Cancelled 3</code>, then move as many waiting people as now fit: <code>4 moved from the waitlist</code> (only if someone was waiting). <strong>3</strong>: <code>Fest Night: 9/10 booked, waitlist 0</code>. <strong>4</strong>: <code>Final: 9 booked, 0 still waiting</code> and stop. Otherwise <code>Unknown choice</code>.</>,
    minLines: 30,
    tests: [
      { inputs: ["Fest Night", "10", "1", "8", "1", "4", "y", "3", "2", "3", "3", "4"], expect: cp1(["Fest Night", "10", "1", "8", "1", "4", "y", "3", "2", "3", "3", "4"]) },
      { inputs: ["Bus", "4", "1", "4", "1", "1", "n", "2", "5", "2", "1", "4"], expect: cp1(["Bus", "4", "1", "4", "1", "1", "n", "2", "5", "2", "1", "4"]), hidden: true, why: "A full show, a 'no' to the waitlist, and cancelling more than are booked." },
      { inputs: ["Cinema", "5", "0", "1", "-2", "1", "6", "Y", "2", "1", "4"], expect: cp1(["Cinema", "5", "0", "1", "-2", "1", "6", "Y", "2", "1", "4"]), hidden: true, why: "Unknown choice, negative tickets, a capital Y, and cancelling when nothing is booked." },
    ],
    requires: [{ node: "While" }, { node: "If" }, { call: "min" }],
    hints: ["free = seats - booked, worked out when you need it", "After a cancel: moved = min(waitlist, seats - booked)", 'answer = input("Join waitlist? (y/n): ").lower()'],
    solution: 'show = input("Show: ")\nseats = int(input("Seats: "))\nprint("1 Book  2 Cancel  3 Status  4 Quit")\nbooked = 0\nwaitlist = 0\nwhile True:\n    choice = input("Choice: ")\n    if choice == "1":\n        n = int(input("Tickets: "))\n        free = seats - booked\n        if n <= 0:\n            print("Tickets must be positive")\n        elif n <= free:\n            booked += n\n            print(f"Booked {n}. {seats - booked} seats left")\n        else:\n            print(f"Only {free} seats left")\n            if input("Join waitlist? (y/n): ").lower() == "y":\n                waitlist += n\n                print(f"Added {n} to the waitlist")\n    elif choice == "2":\n        n = int(input("Tickets: "))\n        if n <= 0:\n            print("Tickets must be positive")\n        elif n > booked:\n            print(f"Only {booked} seats are booked")\n        else:\n            booked -= n\n            print(f"Cancelled {n}")\n            if waitlist > 0:\n                moved = min(waitlist, seats - booked)\n                booked += moved\n                waitlist -= moved\n                print(f"{moved} moved from the waitlist")\n    elif choice == "3":\n        print(f"{show}: {booked}/{seats} booked, waitlist {waitlist}")\n    elif choice == "4":\n        print(f"Final: {booked} booked, {waitlist} still waiting")\n        break\n    else:\n        print("Unknown choice")',
  },
  cp2: {
    id: "cp2", kind: "make", title: "Checkpoint 2 — the seat map",
    task: <>Now every seat is real: rows A–D, seats 1–6, a <strong>2-D list</strong> of <code>"."</code> (free) and <code>"X"</code> (booked). Write <code>parse_seat(code)</code> returning a <code>(row, col)</code> tuple of indexes — <code>"C5"</code> → <code>(2, 4)</code>, lowercase allowed — or <code>None</code> for anything invalid. Loop on <code>Command: </code>: <code>book B4</code> → <code>Booked B4</code> / <code>B4 is already taken</code>; <code>cancel B4</code> → <code>Cancelled B4</code> / <code>B4 is not booked</code>; an invalid seat → <code>Invalid seat E1</code>; <code>map</code> prints the map (below); <code>done</code> ends with <code>Booked: 1/24</code>; anything else → <code>Commands: book A1, cancel A1, map, done</code>. Seat codes are shown in capitals.</>,
    minLines: 34,
    tests: [
      { inputs: ["book B4", "book b4", "book A1", "map", "cancel A1", "done"], expect: cp2(["book B4", "book b4", "book A1", "map", "cancel A1", "done"]) },
      { inputs: ["book E1", "book A0", "book A10", "cancel C3", "sing", "book D6", "map", "done"], expect: cp2(["book E1", "book A0", "book A10", "cancel C3", "sing", "book D6", "map", "done"]), hidden: true, why: "Row E, seat 0 and seat 10 don't exist — parse_seat returns None for them." },
      { inputs: ["done"], expect: cp2(["done"]), hidden: true },
    ],
    post: 'assert parse_seat("C5") == (2, 4) and parse_seat("a1") == (0, 0), "parse_seat should return (row index, column index) — C5 is (2, 4)."\nfor _bad in ["E1", "A0", "A7", "A10", "1A", "A", ""]:\n    assert parse_seat(_bad) is None, f"parse_seat(\'{_bad}\') should be None."',
    requires: [{ node: "FunctionDef", min: 2 }, { node: "ListComp", msg: "Build the 2-D list with a comprehension: [[\".\"] * 6 for _ in range(4)]" }],
    hints: ['seats = [["."] * 6 for _ in range(4)] — not [["."] * 6] * 4 (that is one row, four times!)', 'parse_seat: row = "ABCD".find(code[0].upper()); number = code[1:] must be digits, 1–6', 'Map: print("  1 2 3 4 5 6"), then for i, row in enumerate(seats): print("ABCD"[i], " ".join(row))'],
    solution: 'ROWS = "ABCD"\n\ndef parse_seat(code):\n    if len(code) < 2 or not code[1:].isdigit():\n        return None\n    row = ROWS.find(code[0].upper())\n    col = int(code[1:]) - 1\n    if row == -1 or not 0 <= col < 6:\n        return None\n    return (row, col)\n\ndef show_map(seats):\n    print("  1 2 3 4 5 6")\n    for i, row in enumerate(seats):\n        print(ROWS[i], " ".join(row))\n\nseats = [["."] * 6 for _ in range(4)]\nwhile True:\n    parts = input("Command: ").split()\n    if parts == ["done"]:\n        break\n    if parts == ["map"]:\n        show_map(seats)\n        continue\n    if len(parts) != 2 or parts[0] not in ("book", "cancel"):\n        print("Commands: book A1, cancel A1, map, done")\n        continue\n    command, code = parts[0], parts[1].upper()\n    seat = parse_seat(code)\n    if seat is None:\n        print(f"Invalid seat {code}")\n        continue\n    r, c = seat\n    if command == "book":\n        if seats[r][c] == "X":\n            print(f"{code} is already taken")\n        else:\n            seats[r][c] = "X"\n            print(f"Booked {code}")\n    elif seats[r][c] != "X":\n        print(f"{code} is not booked")\n    else:\n        seats[r][c] = "."\n        print(f"Cancelled {code}")\n\ntotal = sum(row.count("X") for row in seats)\nprint(f"Booked: {total}/24")',
  },
  cp3: (() => {
    const v = cp3("A1\nB4\n", ["book A1", "book C2", "cancel B4", "done"]);
    const h1 = cp3(null, ["book D6", "done"]);
    const h2 = cp3("A1\nZ9\nA1\nb2\n\n", ["book x", "cancel A2", "hello", "done"]);
    return {
      id: "cp3", kind: "make", title: "Checkpoint 3 — bookings that survive",
      task: <>Bookings are kept in <code>bookings.txt</code>, one seat code per line. At the start load them: <code>Loaded 2 booking(s)</code> — or <code>No bookings yet</code> if the file is missing; invalid codes and repeats count as <code>Skipped 2 bad line(s)</code>. Change <code>parse_seat</code> to <strong>raise</strong> <code>ValueError</code> for an invalid code, and write your own <code>SeatTakenError</code>, raised by <code>book(seats, code)</code>. Commands as in checkpoint 2, without <code>map</code> (the help line becomes <code>Commands: book A1, cancel A1, done</code>). At <code>done</code>, save every booked seat, row by row (A1, A2 … D6), and print <code>Saved 2 booking(s)</code>.</>,
      minLines: 40,
      tests: [
        { setup: files({ "bookings.txt": "A1\nB4\n" }), inputs: ["book A1", "book C2", "cancel B4", "done"], expect: v.out, post: fileIs("bookings.txt", v.lines, "bookings.txt should list every booked seat, row by row.") },
        { setup: files({ "bookings.txt": null }), inputs: ["book D6", "done"], expect: h1.out, post: fileIs("bookings.txt", h1.lines), hidden: true, why: "No bookings.txt yet: print No bookings yet and start with an empty hall." },
        { setup: files({ "bookings.txt": "A1\nZ9\nA1\nb2\n\n" }), inputs: ["book x", "cancel A2", "hello", "done"], expect: h2.out, post: fileIs("bookings.txt", h2.lines), hidden: true, why: "An invalid code and a repeated seat in the file are both bad lines; b2 is fine (save it as B2)." },
      ],
      requires: [{ node: "ClassDef", msg: "Define class SeatTakenError(Exception)." }, { node: "Raise", min: 2 }, { node: "Try", min: 2 }, { node: "With", min: 2 }],
      hints: ["parse_seat: … raise ValueError(code) instead of return None", "def book(seats, code): r, c = parse_seat(code); if seats[r][c] == \"X\": raise SeatTakenError(code)", "Loading: for each line, try: book(seats, line.strip()) except (ValueError, SeatTakenError): bad += 1"],
      solution: 'ROWS = "ABCD"\n\nclass SeatTakenError(Exception):\n    pass\n\ndef parse_seat(code):\n    if len(code) < 2 or not code[1:].isdigit():\n        raise ValueError(code)\n    row = ROWS.find(code[0].upper())\n    col = int(code[1:]) - 1\n    if row == -1 or not 0 <= col < 6:\n        raise ValueError(code)\n    return (row, col)\n\ndef book(seats, code):\n    r, c = parse_seat(code)\n    if seats[r][c] == "X":\n        raise SeatTakenError(code)\n    seats[r][c] = "X"\n\nseats = [["."] * 6 for _ in range(4)]\ntry:\n    with open("bookings.txt") as f:\n        loaded, bad = 0, 0\n        for line in f:\n            if not line.strip():\n                continue\n            try:\n                book(seats, line.strip())\n                loaded += 1\n            except (ValueError, SeatTakenError):\n                bad += 1\n    print(f"Loaded {loaded} booking(s)")\n    if bad:\n        print(f"Skipped {bad} bad line(s)")\nexcept FileNotFoundError:\n    print("No bookings yet")\n\nwhile True:\n    parts = input("Command: ").split()\n    if parts == ["done"]:\n        break\n    if len(parts) != 2 or parts[0] not in ("book", "cancel"):\n        print("Commands: book A1, cancel A1, done")\n        continue\n    command, code = parts[0], parts[1].upper()\n    try:\n        if command == "book":\n            book(seats, code)\n            print(f"Booked {code}")\n        else:\n            r, c = parse_seat(code)\n            if seats[r][c] != "X":\n                print(f"{code} is not booked")\n            else:\n                seats[r][c] = "."\n                print(f"Cancelled {code}")\n    except ValueError:\n        print(f"Invalid seat {code}")\n    except SeatTakenError:\n        print(f"{code} is already taken")\n\nsaved = []\nfor r in range(4):\n    for c in range(6):\n        if seats[r][c] == "X":\n            saved.append(f"{ROWS[r]}{c + 1}")\nwith open("bookings.txt", "w") as f:\n    for code in saved:\n        f.write(code + "\\n")\nprint(f"Saved {len(saved)} booking(s)")',
    };
  })(),
  cp4: {
    id: "cp4", kind: "make", title: "Checkpoint 4 — Show and BookingOffice classes",
    task: <>Write <code>SeatTakenError</code> and two classes. <code>Show(name)</code> holds its own 4 × 6 seat grid: <code>book(code)</code> (raises <code>ValueError</code> for an invalid code, <code>SeatTakenError</code> if taken), <code>cancel(code)</code> (returns True if it freed the seat, False if it wasn't booked; ValueError if invalid), <code>free_count()</code>, <code>booked_seats()</code> (codes row by row) and <code>__str__</code> → <code>Morning: 2/24 booked</code>. <code>BookingOffice()</code> keeps a dict <code>self.shows</code>: <code>add_show(show)</code>, and <code>book(show_name, code)</code> / <code>cancel(show_name, code)</code> that raise <code>KeyError</code> for an unknown show. Main: an office with shows <code>Morning</code> and <code>Evening</code>; commands like <code>book Morning B4</code> and <code>cancel Evening A1</code> → <code>Booked B4 for Morning</code>, <code>Cancelled A1 for Evening</code>, <code>No show called Night</code>, <code>Invalid seat E9</code>, <code>B4 is already taken</code>, <code>A1 is not booked</code>; anything else → <code>Commands: book Morning A1, cancel Morning A1, done</code>. At <code>done</code>, print every show. Hidden checks use your classes directly.</>,
    minLines: 50,
    tests: [
      { inputs: ["book Morning B4", "book Morning b4", "book Evening A1", "cancel Evening A1", "cancel Evening A1", "done"], expect: cp4(["book Morning B4", "book Morning b4", "book Evening A1", "cancel Evening A1", "cancel Evening A1", "done"]) },
      { inputs: ["book Night A1", "book Morning E9", "hello", "book Evening D6", "done"], expect: cp4(["book Night A1", "book Morning E9", "hello", "book Evening D6", "done"]), hidden: true },
    ],
    post: CP4_POST,
    requires: [{ node: "ClassDef", min: 3 }],
    hints: ["Show.__init__: self.name = name; self.seats = [[\".\"] * 6 for _ in range(4)] — reuse parse_seat as a method", "booked_seats(): loop rows then columns, collect f\"{ROWS[r]}{c + 1}\" where the seat is X", "BookingOffice.book(name, code): self.shows[name].book(code) — a missing name raises KeyError by itself"],
    solution: 'ROWS = "ABCD"\n\nclass SeatTakenError(Exception):\n    pass\n\nclass Show:\n    def __init__(self, name):\n        self.name = name\n        self.seats = [["."] * 6 for _ in range(4)]\n\n    def _parse(self, code):\n        if len(code) < 2 or not code[1:].isdigit():\n            raise ValueError(code)\n        row = ROWS.find(code[0].upper())\n        col = int(code[1:]) - 1\n        if row == -1 or not 0 <= col < 6:\n            raise ValueError(code)\n        return row, col\n\n    def book(self, code):\n        r, c = self._parse(code)\n        if self.seats[r][c] == "X":\n            raise SeatTakenError(code)\n        self.seats[r][c] = "X"\n\n    def cancel(self, code):\n        r, c = self._parse(code)\n        if self.seats[r][c] != "X":\n            return False\n        self.seats[r][c] = "."\n        return True\n\n    def booked_seats(self):\n        return [f"{ROWS[r]}{c + 1}" for r in range(4) for c in range(6) if self.seats[r][c] == "X"]\n\n    def free_count(self):\n        return 24 - len(self.booked_seats())\n\n    def __str__(self):\n        return f"{self.name}: {len(self.booked_seats())}/24 booked"\n\nclass BookingOffice:\n    def __init__(self):\n        self.shows = {}\n\n    def add_show(self, show):\n        self.shows[show.name] = show\n\n    def book(self, name, code):\n        self.shows[name].book(code)\n\n    def cancel(self, name, code):\n        return self.shows[name].cancel(code)\n\noffice = BookingOffice()\noffice.add_show(Show("Morning"))\noffice.add_show(Show("Evening"))\n\nwhile True:\n    parts = input("Command: ").split()\n    if parts == ["done"]:\n        break\n    if len(parts) != 3 or parts[0] not in ("book", "cancel"):\n        print("Commands: book Morning A1, cancel Morning A1, done")\n        continue\n    command, name, code = parts[0], parts[1], parts[2].upper()\n    try:\n        if command == "book":\n            office.book(name, code)\n            print(f"Booked {code} for {name}")\n        elif office.cancel(name, code):\n            print(f"Cancelled {code} for {name}")\n        else:\n            print(f"{code} is not booked")\n    except KeyError:\n        print(f"No show called {name}")\n    except ValueError:\n        print(f"Invalid seat {code}")\n    except SeatTakenError:\n        print(f"{code} is already taken")\n\nfor show in office.shows.values():\n    print(show)',
  },
  cp5: (() => {
    const a = cp5(BOOK), b = cp5(BOOK2);
    return {
      id: "cp5", kind: "make", title: "Checkpoint 5 — how full were the shows?",
      timeoutMs: 30000,
      task: <>The festival's <code>bookings.csv</code> has one row per ticket: Show, Seat, Type (student / regular) and Price. Every show has 24 seats. With pandas, for each show (in groupby order) print <code>Evening: 6 sold, 25.0% full, revenue 800</code>; then <code>Most popular: Evening</code> and <code>Student tickets: 40.0%</code> (share of all tickets). Draw each show's occupancy (sold ÷ 24 × 100) as a bar chart in the same order, titled <code>Occupancy by show</code>. Hidden tests use another festival.</>,
      show: BOOK, showLabel: "bookings.csv — ALREADY IN THE FOLDER",
      minLines: 14,
      tests: [
        { setup: files({ "bookings.csv": BOOK }), expect: a.out, post: a.post },
        { setup: files({ "bookings.csv": BOOK2 }), expect: b.out, post: b.post, hidden: true, why: "Another festival: compute everything from the DataFrame." },
      ],
      requires: [{ call: "read_csv" }, { call: "groupby" }, { call: "bar" }],
      hints: ['sold = df.groupby("Show")["Seat"].count(); revenue = df.groupby("Show")["Price"].sum()', 'occupancy = sold / 24 * 100 — a whole Series at once', 'share = (df["Type"] == "student").mean() * 100'],
      solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv("bookings.csv")\nsold = df.groupby("Show")["Seat"].count()\nrevenue = df.groupby("Show")["Price"].sum()\noccupancy = sold / 24 * 100\nfor show in sold.index:\n    print(f"{show}: {sold[show]} sold, {occupancy[show]:.1f}% full, revenue {revenue[show]}")\nprint(f"Most popular: {sold.idxmax()}")\nshare = (df["Type"] == "student").mean() * 100\nprint(f"Student tickets: {share:.1f}%")\n\nplt.bar(occupancy.index, occupancy.values, color="teal")\nplt.title("Occupancy by show")\nplt.ylabel("% full")\nplt.show()',
    };
  })(),
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "Why is [[\".\"] * 6] * 4 a bad seat map?", options: ["It's too small", "It's the same row list four times — booking A1 also 'books' B1, C1 and D1", "Strings can't be in lists", "It is fine"], answer: 1, explain: "Four name tags on one list (Unit 4.2's model). Use a comprehension." },
  { q: "parse_seat(\"C5\") returns (2, 4) because…", options: ["C is the 3rd letter, seat 5 is index 4 — both counted from 0", "It's random", "Rows start at 1", "C = 2 in hex"], answer: 0, explain: "Humans count from 1, list indexes from 0." },
  { q: "Booking a taken seat raises SeatTakenError. Who prints the message?", options: ["book() itself", "The code that called book(), in its except block", "Python", "Nobody"], answer: 1, explain: "Detect in the function, handle in the caller." },
  { q: "Occupancy for 6 tickets out of 24 seats is…", options: ["6%", "24%", "25%", "40%"], answer: 2, explain: "6 / 24 × 100 = 25.0" },
];

export default function UnitMP_SEAT(props) {
  const sections = [
    { label: "1 · Core", kicker: "CHECKPOINT 1 · AFTER M4–M6", title: "The booking desk", blocks: [
      <P>A college fest, a cinema, a bus: seats, bookings, cancellations — and never two people in one seat. You'll build the booking system in five checkpoints, each a complete program.</P>,
      <Roadmap color={T.purple} rows={[["1 · Core logic", "M4–M6", "seat counts, bookings, cancellations, a waitlist"], ["2 · Organise it", "M7–M8", "a real seat map as a 2-D list; seat codes → tuples"], ["3 · Make it survive", "M9", "bookings file; SeatTakenError; bad codes handled"], ["4 · Model it", "M10", "Show and BookingOffice classes"], ["5 · Analyse & chart", "M12–M13", "occupancy and revenue per show; chart"]]} />,
      EX.cp1,
    ] },
    { label: "2 · Organise", kicker: "CHECKPOINT 2 · AFTER M7–M8", title: "The seat map", blocks: [EX.cp2] },
    { label: "3 · Survive", kicker: "CHECKPOINT 3 · AFTER M9", title: "Bookings that survive", blocks: [EX.cp3, <KeyIdea>Loading the file reuses book() — so a duplicate in the file is caught by the very same SeatTakenError as a duplicate typed at the desk.</KeyIdea>] },
    { label: "4 · Model", kicker: "CHECKPOINT 4 · AFTER M10", title: "Show and BookingOffice classes", blocks: [EX.cp4] },
    { label: "5 · Analyse", kicker: "CHECKPOINT 5 · AFTER M12–M13", title: "How full were the shows?", blocks: [
      EX.cp5,
      <Note color={T.blue} icon="🎨">Make it yours: lab-slot booking, a badminton-court timetable or hostel room allotment follow the same five steps. Or bring your own idea of similar size to your teacher.</Note>,
    ] },
  ];
  return (
    <LessonShell {...props} unitId="UnitMP_SEAT" crumb="MINI-PROJECT › TRACK C" title="Event Seat Booking" sections={sections} quiz={QUIZ}
      next={{ title: "Track complete!", text: "Counts, a seat map, a file, classes and a chart. Try another track, or head to the Finish Line." }} />
  );
}
