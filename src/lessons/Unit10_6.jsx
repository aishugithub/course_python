// Unit 10.6 — User-Defined Exceptions (rebuilt, typing-first)
// class InvalidMarkError(Exception) → raise and catch your own type →
// why it beats ValueError (no false catches) → a family of exceptions with a
// shared parent → library lending make-task.

import LessonShell, { P, KeyIdea, CodeBlock } from "../kit/Lesson.jsx";
import { T } from "../kit/theme.js";

const lib = (lines) => {
  const avail = { python101: true, "wings-of-fire": true, godan: false };
  const loans = {}; const out = [];
  for (const l of lines) {
    out.push(`Borrow (member book): ${l}`); if (l === "done") break;
    const [m, b] = l.split(" ");
    if (!(b in avail)) out.push(`Refused: no book called ${b}`);
    else if (!avail[b]) out.push(`Refused: ${b} is already lent out`);
    else if ((loans[m] || 0) >= 2) out.push(`Refused: ${m} already has 2 books`);
    else { avail[b] = false; loans[m] = (loans[m] || 0) + 1; out.push(`${m} borrowed ${b}`); }
  }
  return out.join("\n");
};

const EX = {
  define: {
    id: "define", kind: "type", title: "Your own exception type",
    task: <>An exception is a class. Inherit from <code>Exception</code> and you have a new error type with a name that explains your problem. <code>pass</code> is enough — the parent does the rest.</>,
    show: 'class InvalidMarkError(Exception):\n    pass\n\ndef set_mark(mark):\n    if not 0 <= mark <= 100:\n        raise InvalidMarkError(f"{mark} is not between 0 and 100")\n    return mark\n\nfor m in [87, 150]:\n    try:\n        print("Saved", set_mark(m))\n    except InvalidMarkError as e:\n        print("Rejected:", e)',
    minLines: 14,
    tests: [{ expect: "Saved 87\nRejected: 150 is not between 0 and 100" }],
    requires: [{ node: "ClassDef" }, { node: "Raise" }],
    hints: ["The message you pass when raising is what print(e) shows."],
    solution: 'class InvalidMarkError(Exception):\n    pass\n\ndef set_mark(mark):\n    if not 0 <= mark <= 100:\n        raise InvalidMarkError(f"{mark} is not between 0 and 100")\n    return mark\n\nfor m in [87, 150]:\n    try:\n        print("Saved", set_mark(m))\n    except InvalidMarkError as e:\n        print("Rejected:", e)',
  },
  precise: {
    id: "precise", kind: "fix", title: "Catching the wrong problem",
    task: <>Typing <code>eighty</code> should say <code>Not a number</code>, but it says <code>Mark out of range</code> — both problems raise ValueError, so one except can't tell them apart. Define <code>InvalidMarkError(Exception)</code>, raise <em>it</em> for the range check, and give each problem its own except.</>,
    starter: 'def read_mark(text):\n    mark = int(text)\n    if not 0 <= mark <= 100:\n        raise ValueError("out of range")\n    return mark\n\ntry:\n    print("Saved", read_mark(input("Mark: ")))\nexcept ValueError:\n    print("Mark out of range")',
    tests: [
      { inputs: ["eighty"], expect: "Mark: eighty\nNot a number" },
      { inputs: ["150"], expect: "Mark: 150\nMark out of range", hidden: true },
      { inputs: ["75"], expect: "Mark: 75\nSaved 75", hidden: true },
    ],
    requires: [{ node: "ClassDef" }, { node: "ExceptHandler", min: 2 }],
    hints: ["except InvalidMarkError: print(\"Mark out of range\") — then except ValueError: print(\"Not a number\")", "InvalidMarkError inherits from Exception, not from ValueError, so the two never get confused."],
    solution: 'class InvalidMarkError(Exception):\n    pass\n\ndef read_mark(text):\n    mark = int(text)\n    if not 0 <= mark <= 100:\n        raise InvalidMarkError("out of range")\n    return mark\n\ntry:\n    print("Saved", read_mark(input("Mark: ")))\nexcept InvalidMarkError:\n    print("Mark out of range")\nexcept ValueError:\n    print("Not a number")',
  },
  funds: {
    id: "funds", kind: "write", title: "InsufficientFundsError",
    task: <>Write <code>InsufficientFundsError(Exception)</code> and a <code>Wallet(balance)</code> class whose <code>spend(amount)</code> raises it with the message <code>need Rs 500, have Rs 300</code> when there isn't enough. Main code: a wallet with 300, try to spend 120 and print <code>Left: Rs 180</code>; then try to spend 500 and print <code>Declined: need Rs 500, have Rs 180</code>.</>,
    minLines: 16,
    tests: [{ expect: "Left: Rs 180\nDeclined: need Rs 500, have Rs 180" }],
    post: "_w = Wallet(10)\ntry:\n    _w.spend(11)\n    raise AssertionError('spend should raise InsufficientFundsError')\nexcept InsufficientFundsError:\n    pass\nassert _w.balance == 10",
    requires: [{ node: "ClassDef", min: 2 }, { node: "Raise" }],
    hints: ['raise InsufficientFundsError(f"need Rs {amount}, have Rs {self.balance}")', "Only subtract after the check passes."],
    solution: 'class InsufficientFundsError(Exception):\n    pass\n\nclass Wallet:\n    def __init__(self, balance):\n        self.balance = balance\n    def spend(self, amount):\n        if amount > self.balance:\n            raise InsufficientFundsError(f"need Rs {amount}, have Rs {self.balance}")\n        self.balance -= amount\n\nw = Wallet(300)\nfor amount in [120, 500]:\n    try:\n        w.spend(amount)\n        print(f"Left: Rs {w.balance}")\n    except InsufficientFundsError as e:\n        print(f"Declined: {e}")',
  },
  family: {
    id: "family", kind: "write", title: "A family of errors",
    task: <>Make a parent <code>BookingError(Exception)</code> and two children: <code>SeatTakenError(BookingError)</code> and <code>NoSuchSeatError(BookingError)</code>. Write <code>book(seats, n)</code> (seats is a list of 10 bools) raising the right one. Book seats 3, 3 and 12 — each in its own try with a <strong>single</strong> <code>except BookingError as e</code> — printing <code>Booked 3</code>, <code>Problem: seat 3 is taken</code>, <code>Problem: there is no seat 12</code>.</>,
    minLines: 20,
    tests: [{ expect: "Booked 3\nProblem: seat 3 is taken\nProblem: there is no seat 12" }],
    post: "assert issubclass(SeatTakenError, BookingError) and issubclass(NoSuchSeatError, BookingError)",
    requires: [{ node: "ClassDef", min: 3 }],
    hints: ["class SeatTakenError(BookingError): pass", "One except BookingError catches both children — that's what the shared parent is for."],
    solution: 'class BookingError(Exception):\n    pass\n\nclass SeatTakenError(BookingError):\n    pass\n\nclass NoSuchSeatError(BookingError):\n    pass\n\ndef book(seats, n):\n    if n < 1 or n > len(seats):\n        raise NoSuchSeatError(f"there is no seat {n}")\n    if seats[n - 1]:\n        raise SeatTakenError(f"seat {n} is taken")\n    seats[n - 1] = True\n\nseats = [False] * 10\nfor n in [3, 3, 12]:\n    try:\n        book(seats, n)\n        print(f"Booked {n}")\n    except BookingError as e:\n        print(f"Problem: {e}")',
  },
  library: {
    id: "library", kind: "make", title: "Library lending",
    task: <>Books: <code>python101</code> and <code>wings-of-fire</code> are available, <code>godan</code> is already lent out. A member may hold at most 2 books. Define <code>LibraryError</code> and three children — <code>NoSuchBookError</code>, <code>NotAvailableError</code>, <code>LimitReachedError</code> — and a <code>Library</code> class with <code>borrow(member, book)</code> that raises them with messages <code>no book called X</code>, <code>X is already lent out</code>, <code>M already has 2 books</code>. Read <code>Borrow (member book): </code> lines until <code>done</code>; print <code>Priya borrowed python101</code> or <code>Refused: …</code>.</>,
    minLines: 32,
    tests: [
      { inputs: ["Priya python101", "Arun godan", "Arun gita", "Priya wings-of-fire", "Priya python101", "done"], expect: lib(["Priya python101", "Arun godan", "Arun gita", "Priya wings-of-fire", "Priya python101", "done"]) },
      { inputs: ["Ravi python101", "Meena python101", "done"], expect: lib(["Ravi python101", "Meena python101", "done"]), hidden: true },
    ],
    requires: [{ node: "ClassDef", min: 5 }, { node: "Raise", min: 3 }],
    hints: ["self.available = {\"python101\": True, \"wings-of-fire\": True, \"godan\": False}; self.loans = {} (member → count).", "Check in order: unknown book, not available, member limit.", "The main loop catches LibraryError as e and prints f\"Refused: {e}\"."],
    solution: 'class LibraryError(Exception):\n    pass\n\nclass NoSuchBookError(LibraryError):\n    pass\n\nclass NotAvailableError(LibraryError):\n    pass\n\nclass LimitReachedError(LibraryError):\n    pass\n\nclass Library:\n    def __init__(self):\n        self.available = {"python101": True, "wings-of-fire": True, "godan": False}\n        self.loans = {}\n\n    def borrow(self, member, book):\n        if book not in self.available:\n            raise NoSuchBookError(f"no book called {book}")\n        if not self.available[book]:\n            raise NotAvailableError(f"{book} is already lent out")\n        if self.loans.get(member, 0) >= 2:\n            raise LimitReachedError(f"{member} already has 2 books")\n        self.available[book] = False\n        self.loans[member] = self.loans.get(member, 0) + 1\n\nlib = Library()\nline = input("Borrow (member book): ")\nwhile line != "done":\n    member, book = line.split()\n    try:\n        lib.borrow(member, book)\n        print(f"{member} borrowed {book}")\n    except LibraryError as e:\n        print(f"Refused: {e}")\n    line = input("Borrow (member book): ")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "How do you create your own exception type?", options: ["def MyError():", "class MyError(Exception): pass", "raise MyError", "import MyError"], answer: 1, explain: "Exceptions are classes; inherit from Exception." },
  { q: "Why is InvalidMarkError better than reusing ValueError?", options: ["It's shorter", "Its name explains the problem, and you can catch it without accidentally catching unrelated ValueErrors", "It's faster", "No difference"], answer: 1, explain: "Precise catches, readable tracebacks." },
  { q: "except BookingError catches…", options: ["Only BookingError itself", "BookingError and every class that inherits from it", "All exceptions", "Nothing"], answer: 1, explain: "One handler for the whole family." },
  { q: "What does print(e) show for raise MyError(\"seat 3 is taken\")?", options: ["MyError", "seat 3 is taken", "Nothing", "e"], answer: 1, explain: "The message you passed when raising." },
];

export default function Unit10_6(props) {
  const sections = [
    { label: "Your Own Errors", kicker: "EXCEPTIONS × CLASSES", title: "An exception is just a class", blocks: [<P>Module 9 raised built-in errors like ValueError. Module 10 taught classes. Put them together: your own error types, named after your own problems.</P>, EX.define] },
    { label: "Precise Catches", kicker: "WHY BOTHER", title: "Catch exactly what you mean", blocks: [EX.precise, EX.funds] },
    {
      label: "Families", kicker: "INHERITANCE AGAIN", title: "A family of related errors",
      blocks: [<div style={{ maxWidth: 640 }}><CodeBlock title="the shape" code={"class BookingError(Exception): pass         # the family\nclass SeatTakenError(BookingError): pass    # one member\nclass NoSuchSeatError(BookingError): pass   # another\n\nexcept BookingError:     # catches any of them"} /></div>, EX.family, <KeyIdea>A shared parent lets callers choose: catch one specific error, or the whole family at once.</KeyIdea>],
    },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: library lending", blocks: [EX.library] },
  ];
  return (
    <LessonShell {...props} unitId="Unit10_6" crumb="MODULE 10 › UNIT 10.6" title="User-Defined Exceptions" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 10.7 — Capstone: Marks Manager 3.0", text: "Student and Classroom classes — the Marks Manager's final form." }} />
  );
}
