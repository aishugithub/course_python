// Unit 10.1 — Why Objects? (rebuilt, typing-first)
// Parallel lists drift apart → a class is a blueprint, an object bundles its
// own data → attributes → objects are independent; b = a still aliases (7.2)
// → the attribute-typo silent bug → a contacts book of objects.

import { useState } from "react";
import LessonShell, { P, KeyIdea, CodeBlock } from "../kit/Lesson.jsx";
import { T, CODE_FONT, MONO, tint } from "../kit/theme.js";

// ── Widget: parallel lists drift, objects don't ──
function Drift() {
  const [broken, setBroken] = useState(false);
  const names = broken ? ["PRIYA", "MEENA"] : ["PRIYA", "ARUN", "MEENA"];
  const marks = [87, 62, 91];
  return (
    <div className="fh-two">
      <div>
        <CodeBlock title="three parallel lists" code={'names = ["PRIYA", "ARUN", "MEENA"]\nmarks = [87, 62, 91]\n' + (broken ? 'names.remove("ARUN")   # forgot marks!' : "")} />
        <button onClick={() => setBroken(!broken)} style={{ marginTop: 8, padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${broken ? T.red : T.border}`, background: broken ? tint(T.red, "12") : T.card, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, color: broken ? T.red : T.text }}>{broken ? "↺ undo" : "Remove ARUN from names only ▶"}</button>
      </div>
      <div>
        <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.2, color: T.bronze, marginBottom: 6 }}>WHO HAS WHICH MARK?</div>
        {marks.map((m, i) => (
          <div key={i} style={{ fontFamily: CODE_FONT, fontSize: 15, padding: "4px 0", color: broken && i >= 1 ? T.red : T.text }}>
            {names[i] ?? "???"} → {m} {broken && i === 1 && "  ← MEENA now has ARUN's mark!"}
          </div>
        ))}
        <div style={{ fontSize: 14, color: T.slate, marginTop: 8 }}>Separate lists only stay correct if every change hits every list. An <strong>object</strong> keeps a student's name and mark together, so they can't drift apart.</div>
      </div>
    </div>
  );
}

const EX = {
  first: {
    id: "first", kind: "type", title: "A class and two objects",
    task: <><code>class Student:</code> defines a new type — a blueprint. <code>Student()</code> builds one object from it. <code>s1.name = …</code> gives that object an attribute (its own variable).</>,
    show: 'class Student:\n    pass\n\ns1 = Student()\ns1.name = "Priya"\ns1.mark = 87\ns2 = Student()\ns2.name = "Arun"\ns2.mark = 62\nprint(s1.name, s1.mark)\nprint(s2.name, s2.mark)\nprint(type(s1))',
    minLines: 12,
    tests: [{ expect: "Priya 87\nArun 62\n<class '__main__.Student'>" }],
    requires: [{ node: "ClassDef" }],
    hints: ["pass means “empty for now”. Next unit, __init__ fills the attributes in automatically."],
    solution: 'class Student:\n    pass\n\ns1 = Student()\ns1.name = "Priya"\ns1.mark = 87\ns2 = Student()\ns2.name = "Arun"\ns2.mark = 62\nprint(s1.name, s1.mark)\nprint(s2.name, s2.mark)\nprint(type(s1))',
  },
  books: {
    id: "books", kind: "write", title: "A list of objects",
    task: <>Define an empty class <code>Book</code>. Ask <code>Books: </code> (how many), then for each ask <code>Title: </code> and <code>Pages: </code>, make a Book object with <code>.title</code> and <code>.pages</code>, and append it to a list. Print each as <code>Wings of Fire (180 pages)</code>, then <code>Total pages: 560</code>.</>,
    tests: [
      { inputs: ["2", "Wings of Fire", "180", "Ignited Minds", "380"], expect: "Books: 2\nTitle: Wings of Fire\nPages: 180\nTitle: Ignited Minds\nPages: 380\nWings of Fire (180 pages)\nIgnited Minds (380 pages)\nTotal pages: 560" },
      { inputs: ["1", "Godan", "312"], expect: "Books: 1\nTitle: Godan\nPages: 312\nGodan (312 pages)\nTotal pages: 312", hidden: true },
    ],
    requires: [{ node: "ClassDef" }],
    hints: ["b = Book(); b.title = input(\"Title: \"); b.pages = int(input(\"Pages: \")); books.append(b)", "for b in books: print(f\"{b.title} ({b.pages} pages)\")"],
    solution: 'class Book:\n    pass\n\nbooks = []\nn = int(input("Books: "))\nfor i in range(n):\n    b = Book()\n    b.title = input("Title: ")\n    b.pages = int(input("Pages: "))\n    books.append(b)\ntotal = 0\nfor b in books:\n    print(f"{b.title} ({b.pages} pages)")\n    total += b.pages\nprint(f"Total pages: {total}")',
  },
  alias: {
    id: "alias", kind: "type", title: "Two names, one object",
    task: <>Objects follow the name-tag rules of Unit 4.2 and 7.2: <code>b = a</code> doesn't copy an object, it adds a second tag. Predict before running.</>,
    show: 'class Student:\n    pass\n\na = Student()\na.name = "Priya"\nb = a\nb.name = "Arun"\nc = Student()\nc.name = "Meena"\nprint(a.name, b.name, c.name)',
    tests: [{ expect: "Arun Arun Meena" }],
    hints: ["a and b are the same object; c is a separate one."],
    solution: 'class Student:\n    pass\n\na = Student()\na.name = "Priya"\nb = a\nb.name = "Arun"\nc = Student()\nc.name = "Meena"\nprint(a.name, b.name, c.name)',
  },
  typo: {
    id: "typo", kind: "fix", title: "The mark that didn't change",
    task: <>Priya's re-evaluated mark is 91, but the report still says 87. No error — run it and look closely at line 7.</>,
    starter: 'class Student:\n    pass\n\ns = Student()\ns.name = "Priya"\ns.mark = 87\ns.mrak = 91\nprint(s.name, s.mark)',
    tests: [{ expect: "Priya 91" }],
    hints: ["Assigning to a misspelt attribute silently creates a NEW attribute. Python can't know you meant mark."],
    solution: 'class Student:\n    pass\n\ns = Student()\ns.name = "Priya"\ns.mark = 87\ns.mark = 91\nprint(s.name, s.mark)',
  },
  contacts: {
    id: "contacts", kind: "make", title: "Contacts book",
    task: <>Make an empty class <code>Contact</code>. Keep asking <code>Add (name phone): </code> until <code>done</code>; each line becomes a Contact with <code>.name</code> and <code>.phone</code> in a list. Then ask <code>Search: </code> and print <code>Arun: 91234 56789</code> or <code>Not found</code> (match names ignoring capitals). Finally <code>Contacts: 3</code>.</>,
    minLines: 16,
    tests: [
      { inputs: ["Priya 98765", "Arun 91234", "Meena 99887", "done", "arun"], expect: "Add (name phone): Priya 98765\nAdd (name phone): Arun 91234\nAdd (name phone): Meena 99887\nAdd (name phone): done\nSearch: arun\nArun: 91234\nContacts: 3" },
      { inputs: ["Ravi 1", "done", "kavya"], expect: "Add (name phone): Ravi 1\nAdd (name phone): done\nSearch: kavya\nNot found\nContacts: 1", hidden: true },
    ],
    requires: [{ node: "ClassDef" }],
    hints: ["c = Contact(); c.name, c.phone = line.split()", "Search with a flag: compare c.name.lower() == wanted.lower()."],
    solution: 'class Contact:\n    pass\n\ncontacts = []\nline = input("Add (name phone): ")\nwhile line != "done":\n    c = Contact()\n    c.name, c.phone = line.split()\n    contacts.append(c)\n    line = input("Add (name phone): ")\nwanted = input("Search: ")\nfound = False\nfor c in contacts:\n    if c.name.lower() == wanted.lower():\n        print(f"{c.name}: {c.phone}")\n        found = True\n        break\nif not found:\n    print("Not found")\nprint(f"Contacts: {len(contacts)}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "What's the difference between a class and an object?", options: ["None", "A class is the blueprint; an object is one thing built from it", "An object is the blueprint", "Classes hold numbers, objects hold text"], answer: 1, explain: "Student is the class; s1 and s2 are objects (instances)." },
  { q: "Why are objects better than parallel lists for records?", options: ["Faster", "Each object keeps its own data together, so fields can't drift out of line", "Less typing", "They sort themselves"], answer: 1, explain: "One change can't accidentally break the pairing." },
  { q: "After b = a and b.name = \"Arun\", what is a.name?", options: ["Unchanged", "\"Arun\" — a and b are the same object", "Error", "None"], answer: 1, explain: "= adds a tag; it doesn't copy the object." },
  { q: "s.mrak = 91 (a typo) does what?", options: ["Raises AttributeError", "Silently creates a new attribute called mrak", "Updates mark", "Nothing"], answer: 1, explain: "Assignment always works; it's reading a missing attribute that errors." },
];

export default function Unit10_1(props) {
  const sections = [
    {
      label: "Why Objects?", kicker: "THE NEED", title: "Keep each record's data together",
      blocks: [<P>Since Module 7 you've stored students as parallel lists or dictionaries. Watch what happens when one change misses one list:</P>, <Drift />, EX.first],
    },
    { label: "Many Objects", kicker: "A LIST OF OBJECTS", title: "Objects in a list", blocks: [EX.books] },
    { label: "Tags Again", kicker: "SAME OBJECT OR NEW?", title: "Objects follow the name-tag rules", blocks: [EX.alias, EX.typo, <KeyIdea>Every object is its own value in memory. Names are tags on objects; <code>b = a</code> shares one. A misspelt attribute name silently creates a new attribute.</KeyIdea>] },
    { label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: contacts book", blocks: [EX.contacts] },
  ];
  return (
    <LessonShell {...props} unitId="Unit10_1" crumb="MODULE 10 › UNIT 10.1" title="Why Objects?" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 10.2 — __init__ & self", text: "Build complete objects in one line — and meet self." }} />
  );
}
