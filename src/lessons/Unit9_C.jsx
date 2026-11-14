// Unit9_C — The Crucible: Module 9 (rebuilt, typing-first)
// Spark: try / except / else / finally with return inside; write, append,
// readlines and the missing newline. Flame: a bare except that hides which
// line was bad; return instead of raise for a custom exception. Forge: read
// marks.txt, write report.txt. Temper: a bank-transactions file processor
// with InsufficientFunds and a statement file.

import CrucibleShell from "../kit/Crucible.jsx";
import { files, fileIs } from "../kit/project.jsx";

const SCORES = "45\n78\nabsent\n90\n\n63\n";
function bank(text) {
  if (text === null) return { out: "No transactions file", lines: null };
  const out = []; let bal = 0;
  text.split("\n").forEach((raw, i) => {
    const line = raw.trim(); if (!line) return;
    const p = line.split(/\s+/);
    if (p.length !== 2 || !["deposit", "withdraw"].includes(p[0]) || !/^\d+$/.test(p[1]) || +p[1] <= 0) { out.push(`Line ${i + 1}: bad entry`); return; }
    const amt = +p[1];
    if (p[0] === "deposit") bal += amt;
    else if (amt > bal) out.push(`Line ${i + 1}: refused withdraw of ${amt}`);
    else bal -= amt;
  });
  out.push(`Balance: ${bal}`);
  return { out: out.join("\n"), lines: [`Final balance: ${bal}`] };
}
const TX = "deposit 500\nwithdraw 200\nwithdraw 1000\ndeposit abc\ntransfer 50\n\ndeposit 150\n";
const TX2 = "withdraw 10\ndeposit -5\ndeposit 0\nwithdraw 0\n";
const TX3 = "deposit 1000\nwithdraw 1000\nwithdraw 1\n";

const EX = {
  spark1: {
    id: "spark1", kind: "predict", title: "try, except, else, finally",
    code: 'def check(x):\n    try:\n        print("start", x)\n        r = 10 / x\n        n = int("7" if x > 0 else "seven")\n    except ZeroDivisionError:\n        print("zero!")\n        return "Z"\n    except ValueError:\n        print("bad number")\n        return "V"\n    else:\n        print("ok", r + n)\n        return "OK"\n    finally:\n        print("end", x)\n\nprint(check(2))\nprint(check(0))\nprint(check(-5))',
    task: <>Three calls, three different paths. Remember: <code>finally</code> runs even when the block before it says <code>return</code>.</>,
    hints: ["else runs only if the try block raised nothing.", "finally prints BEFORE the returned value reaches the outer print.", "For -5: 10 / -5 works fine (-2.0); int(\"seven\") is what fails."],
    solution: "start 2\nok 12.0\nend 2\nOK\nstart 0\nzero!\nend 0\nZ\nstart -5\nbad number\nend -5\nV",
  },
  spark2: {
    id: "spark2", kind: "predict", title: "Write, append, read",
    code: 'with open("log.txt", "w") as f:\n    f.write("one\\n")\n    f.write("two")\nwith open("log.txt", "a") as f:\n    f.write("three\\n")\nwith open("log.txt") as f:\n    lines = f.readlines()\nprint(len(lines))\nprint(lines)\nwith open("log.txt") as f:\n    for line in f:\n        print(line.strip().upper())',
    task: <><code>write</code> adds no newline of its own. Printing a list shows each line's <code>\n</code> as the two characters <code>\</code> and <code>n</code>.</>,
    hints: ["After the first block the file holds one⏎two (no newline after two).", "Appending three⏎ joins it onto the end of two.", "readlines() keeps the \\n at the end of each line; strip() removes it."],
    solution: "2\n['one\\n', 'twothree\\n']\nONE\nTWOTHREE",
  },
  scores: {
    id: "scores", kind: "fix", title: "The except that hides everything",
    task: <>Average the numbers in <code>scores.txt</code>. A bare <code>except:</code> around the whole loop means one bad line (<code>absent</code>) throws away everything after it. Instead: skip blank lines silently, skip lines that aren't numbers and count them (<code>Skipped 1 bad line(s)</code>, only if any), print <code>Average of 4 scores: 69.0</code> — or <code>No valid scores</code> — and if the file is missing print <code>No scores file</code> and nothing else. Catch only the exceptions you expect.</>,
    starter: 'total = 0\ncount = 0\ntry:\n    with open("scores.txt") as f:\n        for line in f:\n            total += int(line)\n            count += 1\nexcept:\n    print("Something went wrong")\nprint(f"Average of {count} scores: {total / count:.1f}")',
    tests: [
      { setup: files({ "scores.txt": SCORES }), expect: "Skipped 1 bad line(s)\nAverage of 4 scores: 69.0" },
      { setup: files({ "scores.txt": null }), expect: "No scores file", hidden: true, why: "A missing file: catch FileNotFoundError and stop." },
      { setup: files({ "scores.txt": "10\n20\n" }), expect: "Average of 2 scores: 15.0", hidden: true },
      { setup: files({ "scores.txt": "x\n" }), expect: "Skipped 1 bad line(s)\nNo valid scores", hidden: true, why: "No numbers at all — don't divide by zero." },
    ],
    forbids: [{ text: "except:", msg: "No bare except: name the exceptions you expect (ValueError, FileNotFoundError)." }],
    requires: [{ node: "Try", min: 2 }],
    hints: ["Put a small try / except ValueError around int(line) inside the loop.", "if not line.strip(): continue — skips blank lines.", "Wrap the file part in try / except FileNotFoundError; do the printing in else."],
    solution: 'total = 0\ncount = 0\nbad = 0\ntry:\n    with open("scores.txt") as f:\n        for line in f:\n            if not line.strip():\n                continue\n            try:\n                total += int(line)\n                count += 1\n            except ValueError:\n                bad += 1\nexcept FileNotFoundError:\n    print("No scores file")\nelse:\n    if bad:\n        print(f"Skipped {bad} bad line(s)")\n    if count == 0:\n        print("No valid scores")\n    else:\n        print(f"Average of {count} scores: {total / count:.1f}")',
  },
  withdraw: {
    id: "withdraw", kind: "fix", title: "return is not raise",
    task: <><code>withdraw</code> should <strong>raise</strong> InsufficientFunds when there isn't enough money, so the <code>except</code> can refuse it. Run it: the error object sneaks into <code>balance</code> instead, and the next round crashes.</>,
    starter: 'class InsufficientFunds(Exception):\n    pass\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        return InsufficientFunds("Not enough money")\n    return balance - amount\n\nbalance = 500\nfor amount in [200, 400, 100]:\n    try:\n        balance = withdraw(balance, amount)\n        print("Withdrew", amount, "- balance", balance)\n    except InsufficientFunds as e:\n        print("Refused", amount, "-", e)',
    tests: [{ expect: "Withdrew 200 - balance 300\nRefused 400 - Not enough money\nWithdrew 100 - balance 200" }],
    post: "try:\n    withdraw(10, 20)\n    raise AssertionError('withdraw(10, 20) should raise InsufficientFunds.')\nexcept InsufficientFunds:\n    pass",
    hints: ["Returning an exception just hands back an object. Which keyword makes it fly?"],
    solution: 'class InsufficientFunds(Exception):\n    pass\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFunds("Not enough money")\n    return balance - amount\n\nbalance = 500\nfor amount in [200, 400, 100]:\n    try:\n        balance = withdraw(balance, amount)\n        print("Withdrew", amount, "- balance", balance)\n    except InsufficientFunds as e:\n        print("Refused", amount, "-", e)',
  },
  report: {
    id: "report", kind: "complete", title: "Read one file, write another",
    task: <><code>marks.txt</code> holds <code>name,mark</code> lines. Fill the blanks to write <code>report.txt</code>: the number passed (40+), the number failed, and each failed name on its own line after <code>- </code>. The checker opens your report.txt.</>,
    starter: 'passed = []\nfailed = []\nwith open("marks.txt") as f:\n    for line in f:\n        name, mark = line.strip().split(___)\n        if int(mark) >= 40:\n            passed.append(name)\n        else:\n            failed.append(name)\n\nwith open("report.txt", ___) as out:\n    out.write(f"Passed: {len(passed)}\\n")\n    out.write(f"Failed: {___}\\n")\n    for name in failed:\n        out.write(f"- {name}\\n")\nprint("Report written")',
    tests: [
      { setup: files({ "marks.txt": "Asha,82\nBen,35\nChen,91\n", "report.txt": null }), expect: "Report written", post: fileIs("report.txt", ["Passed: 2", "Failed: 1", "- Ben"]) },
      { setup: files({ "marks.txt": "Dev,12\nEla,39\n", "report.txt": "old report\n" }), expect: "Report written", post: fileIs("report.txt", ["Passed: 0", "Failed: 2", "- Dev", "- Ela"], "report.txt should be replaced, not added to — open it with \"w\"."), hidden: true },
    ],
    hints: ['split(",")', 'open("report.txt", "w")', "len(failed)"],
    solution: 'passed = []\nfailed = []\nwith open("marks.txt") as f:\n    for line in f:\n        name, mark = line.strip().split(",")\n        if int(mark) >= 40:\n            passed.append(name)\n        else:\n            failed.append(name)\n\nwith open("report.txt", "w") as out:\n    out.write(f"Passed: {len(passed)}\\n")\n    out.write(f"Failed: {len(failed)}\\n")\n    for name in failed:\n        out.write(f"- {name}\\n")\nprint("Report written")',
  },
  bank: (() => {
    const a = bank(TX), b = bank(null), c = bank(TX2), d = bank(TX3);
    return {
      id: "bank", kind: "make", title: "Bank statement",
      task: <><code>transactions.txt</code> has one <code>deposit 500</code> or <code>withdraw 200</code> per line; the balance starts at 0. Write your own <code>InsufficientFunds</code> exception and an <code>apply(balance, kind, amount)</code> function that returns the new balance and raises it for a withdrawal larger than the balance. Process the file line by line (number the lines from 1, counting blank ones, but skip blanks): a line that isn't exactly <code>deposit</code>/<code>withdraw</code> plus a whole amount above 0 → <code>Line 4: bad entry</code>; a refused withdrawal → <code>Line 3: refused withdraw of 1000</code>. Print <code>Balance: 450</code> and write <code>Final balance: 450</code> to <code>statement.txt</code>. No file → just <code>No transactions file</code>.</>,
      minLines: 30,
      tests: [
        { setup: files({ "transactions.txt": TX, "statement.txt": null }), expect: a.out, post: fileIs("statement.txt", a.lines) },
        { setup: files({ "transactions.txt": null }), expect: b.out, hidden: true },
        { setup: files({ "transactions.txt": TX2, "statement.txt": null }), expect: c.out, post: fileIs("statement.txt", c.lines), hidden: true, why: "Amounts of 0 or below are bad entries; a withdrawal from 0 is refused." },
        { setup: files({ "transactions.txt": TX3, "statement.txt": null }), expect: d.out, post: fileIs("statement.txt", d.lines), hidden: true, why: "Withdrawing exactly the balance is allowed." },
      ],
      post: "try:\n    apply(10, 'withdraw', 20)\n    raise AssertionError('apply(10, \"withdraw\", 20) should raise InsufficientFunds.')\nexcept InsufficientFunds:\n    pass\nassert apply(10, 'deposit', 5) == 15 and apply(10, 'withdraw', 10) == 0, 'apply() should return the new balance.'",
      requires: [{ node: "ClassDef" }, { node: "Raise" }, { node: "Try", min: 2 }, { node: "With", min: 2 }],
      hints: ["for number, line in enumerate(f, start=1): — then skip blank lines with continue", "Validate: parts = line.split(); len(parts) == 2, parts[0] in (\"deposit\", \"withdraw\"), parts[1].isdigit() and int(parts[1]) > 0", "try: balance = apply(balance, kind, amount) except InsufficientFunds: print the refusal"],
      solution: 'class InsufficientFunds(Exception):\n    pass\n\ndef apply(balance, kind, amount):\n    if kind == "deposit":\n        return balance + amount\n    if amount > balance:\n        raise InsufficientFunds(amount)\n    return balance - amount\n\ntry:\n    with open("transactions.txt") as f:\n        lines = f.readlines()\nexcept FileNotFoundError:\n    print("No transactions file")\nelse:\n    balance = 0\n    for number, line in enumerate(lines, start=1):\n        if not line.strip():\n            continue\n        parts = line.split()\n        if len(parts) != 2 or parts[0] not in ("deposit", "withdraw") or not parts[1].isdigit() or int(parts[1]) <= 0:\n            print(f"Line {number}: bad entry")\n            continue\n        try:\n            balance = apply(balance, parts[0], int(parts[1]))\n        except InsufficientFunds:\n            print(f"Line {number}: refused withdraw of {parts[1]}")\n    print(f"Balance: {balance}")\n    with open("statement.txt", "w") as out:\n        out.write(f"Final balance: {balance}\\n")',
    };
  })(),
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "When does an else block after try run?", options: ["Always", "Only if the try block raised no exception", "Only after an exception", "Never with finally"], answer: 1, explain: "else is the 'it worked' path." },
  { q: "Why avoid a bare except:?", options: ["It's slower", "It also hides bugs you never expected, like typos (NameError)", "It's not valid Python", "It only catches one error"], answer: 1, explain: "Catch the exceptions you expect, by name." },
  { q: "open(\"log.txt\", \"w\") on an existing file…", options: ["Adds to the end", "Empties it first", "Crashes", "Reads it"], answer: 1, explain: "\"w\" replaces, \"a\" appends." },
];

export default function Unit9_C(props) {
  return <CrucibleShell {...props} unitId="Unit9_C" module="Module 9" title="The Crucible: Errors & Files" spark={[EX.spark1, EX.spark2]} flame={[EX.scores, EX.withdraw]} forge={[EX.report]} temper={[EX.bank]} quiz={QUIZ} />;
}
