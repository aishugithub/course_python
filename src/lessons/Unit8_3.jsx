// Unit 8.3 — Scope & the Call Stack (rebuilt on the typing-first lesson kit)
// The x = 10 / x = 99 mystery → two rooms (local vs global) → reading globals
// is fine, assigning makes a local (UnboundLocalError) → pass in, return out →
// lists passed in CAN be changed (aliasing, 7.2) → the call stack → make-task.

import { useState } from "react";
import LessonShell, { P, KeyIdea, Note } from "../kit/Lesson.jsx";
import { T, CODE_FONT, MONO, tint } from "../kit/theme.js";

// ── Widget: two rooms ──
function TwoRooms() {
  const STEPS = [
    { l: 0, g: { x: 10 }, f: null, d: "x = 10 lives in the global room (the main program)." },
    { l: 3, g: { x: 10 }, f: {}, d: "Calling change() builds a NEW room just for this call." },
    { l: 1, g: { x: 10 }, f: { x: 99 }, d: "Assignment inside a function creates a LOCAL x in the function's room. Same name, different variable." },
    { l: 4, g: { x: 10 }, f: null, d: "The function returned: its room is demolished, local x with it. The global x was never touched." },
  ];
  const SRC = ["x = 10", "def change():", "    x = 99", "change()", "print(x)   # 10"];
  const map = [0, 3, 2, 4];
  const [i, setI] = useState(0);
  const s = STEPS[i];
  const room = (title, vars, c) => (
    <div style={{ border: `2px solid ${c}`, borderRadius: 12, padding: 10, minWidth: 160, background: tint(c, "0C") }}>
      <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1.2, color: c, marginBottom: 6 }}>{title}</div>
      {Object.entries(vars).map(([k, v]) => <div key={k} style={{ fontFamily: CODE_FONT, fontSize: 16 }}>🏷 {k} → <strong>{v}</strong></div>)}
      {!Object.keys(vars).length && <div style={{ fontSize: 13, color: T.muted }}>(empty)</div>}
    </div>
  );
  return (
    <div className="fh-two">
      <div>
        <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 14.5, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: 6 }}>
          {SRC.map((l, k) => <div key={k} style={{ padding: "1px 8px", borderRadius: 5, background: map[i] === k ? tint(T.blue, "22") : "transparent", fontWeight: map[i] === k ? 700 : 400 }}>{l}</div>)}
        </pre>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={() => setI(Math.max(0, i - 1))} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, cursor: "pointer" }}>◀</button>
          <button onClick={() => setI(Math.min(STEPS.length - 1, i + 1))} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: T.navy, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Next ▶</button>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {room("GLOBAL ROOM", s.g, T.blue)}
          {s.f && room("change()'s ROOM", s.f, T.purple)}
        </div>
        <div style={{ fontSize: 14.5, color: T.slate, marginTop: 10 }}>{s.d}</div>
      </div>
    </div>
  );
}

// ── Widget: the call stack ──
function CallStack() {
  const STEPS = [
    { stack: [["main", "price = 1000"]], d: "The program starts with one frame: the main program." },
    { stack: [["main", "price = 1000"], ["total_bill", "amount = 1000"]], d: "main calls total_bill(1000): a new frame is pushed on top." },
    { stack: [["main", "price = 1000"], ["total_bill", "amount = 1000"], ["add_gst", "amount = 1000, rate = 0.18"]], d: "total_bill calls add_gst: another frame on top. Only the top frame is running." },
    { stack: [["main", "price = 1000"], ["total_bill", "amount = 1000, gst = 180.0"]], d: "add_gst returns 180.0 and its frame is popped. total_bill continues where it left off." },
    { stack: [["main", "price = 1000, final = 1180.0"]], d: "total_bill returns 1180.0 and pops. Last in, first out — like a stack of plates." },
  ];
  const [i, setI] = useState(0);
  const s = STEPS[i];
  return (
    <div className="fh-two">
      <div>
        <pre style={{ margin: 0, fontFamily: CODE_FONT, fontSize: 14, lineHeight: 1.7, background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 14px" }}>{"def add_gst(amount, rate=0.18):\n    return amount * rate\n\ndef total_bill(amount):\n    gst = add_gst(amount)\n    return amount + gst\n\nprice = 1000\nfinal = total_bill(price)"}</pre>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={() => setI(Math.max(0, i - 1))} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, cursor: "pointer" }}>◀</button>
          <button onClick={() => setI(Math.min(STEPS.length - 1, i + 1))} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: T.navy, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Next ▶</button>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", flexDirection: "column-reverse", gap: 4, minHeight: 170, justifyContent: "flex-start" }}>
          {s.stack.map(([name, vars], k) => (
            <div key={k} style={{ border: `2px solid ${k === s.stack.length - 1 ? T.green : T.border}`, borderRadius: 10, padding: "8px 12px", background: k === s.stack.length - 1 ? tint(T.green, "10") : T.card }}>
              <div style={{ fontFamily: CODE_FONT, fontWeight: 700 }}>{name}{k === s.stack.length - 1 ? "   ◀ running" : ""}</div>
              <div style={{ fontFamily: CODE_FONT, fontSize: 13, color: T.slate }}>{vars}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 14.5, color: T.slate, marginTop: 8 }}>{s.d}</div>
      </div>
    </div>
  );
}

// ── Exercise specs ──
const temps = (line) => {
  const n = line.split(" ").map(Number);
  const avg = n.reduce((a, b) => a + b, 0) / n.length;
  return `Temps: ${line}\nAverage: ${avg.toFixed(1)}\nSpread: ${(Math.max(...n) - Math.min(...n)).toFixed(1)}\nHot days: ${n.filter((x) => x > avg).length}`;
};
const EX = {
  mystery: {
    id: "mystery", kind: "type", title: "The mystery",
    task: <>Predict the last line before running. Then step through the two rooms above.</>,
    show: 'x = 10\n\ndef change():\n    x = 99\n    print("inside:", x)\n\nchange()\nprint("outside:", x)',
    tests: [{ expect: "inside: 99\noutside: 10" }],
    hints: ["The x inside change() is a different variable from the global x."],
    solution: 'x = 10\n\ndef change():\n    x = 99\n    print("inside:", x)\n\nchange()\nprint("outside:", x)',
  },
  local: {
    id: "local", kind: "fix", title: "Locals don't escape",
    task: <>Run it and read the coach. A local variable disappears when its function returns. Fix it by <strong>returning</strong> the value and storing the result.</>,
    starter: 'def make_code():\n    code = "FH" + "2026"\n\nmake_code()\nprint(code)',
    tests: [{ expect: "FH2026" }],
    requires: [{ node: "Return" }],
    hints: ["return code inside the function, then code = make_code() outside."],
    solution: 'def make_code():\n    code = "FH" + "2026"\n    return code\n\ncode = make_code()\nprint(code)',
  },
  readglobal: {
    id: "readglobal", kind: "type", title: "Reading a global is fine",
    task: <>A function can <em>read</em> a global variable. (It's only <em>assigning</em> that makes a new local.)</>,
    show: 'GST_RATE = 0.18\n\ndef with_gst(amount):\n    return amount + amount * GST_RATE\n\nprint(with_gst(100))\nprint(with_gst(250))',
    tests: [{ expect: "118.0\n295.0" }],
    hints: ["CAPITAL names are a convention for values that never change (constants)."],
    solution: 'GST_RATE = 0.18\n\ndef with_gst(amount):\n    return amount + amount * GST_RATE\n\nprint(with_gst(100))\nprint(with_gst(250))',
  },
  unbound: {
    id: "unbound", kind: "fix", title: "Updating an outside variable",
    task: <>Run it and read the coach. Fix it the clean way: give the function a parameter, <strong>return</strong> the new count, and store it — <code>count = add_visitor(count)</code>.</>,
    starter: 'count = 0\n\ndef add_visitor():\n    count = count + 1\n\nadd_visitor()\nadd_visitor()\nprint("Visitors:", count)',
    tests: [{ expect: "Visitors: 2" }],
    forbids: [{ node: "Global", msg: "global works, but it makes code hard to follow. Pass the count in and return it." }],
    hints: ["def add_visitor(count): return count + 1", "count = add_visitor(count) — twice."],
    solution: 'count = 0\n\ndef add_visitor(count):\n    return count + 1\n\ncount = add_visitor(count)\ncount = add_visitor(count)\nprint("Visitors:", count)',
  },
  mutate: {
    id: "mutate", kind: "type", title: "But lists passed in can change",
    task: <>Remember aliasing (Unit 7.2)? The parameter is a second name tag on the <strong>same</strong> list. Changing the list inside the function changes it for the caller too. Predict, then run.</>,
    show: 'def add_mark(marks, m):\n    marks.append(m)\n\ndef reset(marks):\n    marks = []\n\nclass_marks = [70, 80]\nadd_mark(class_marks, 90)\nreset(class_marks)\nprint(class_marks)',
    tests: [{ expect: "[70, 80, 90]" }],
    hints: ["append changes the shared list. marks = [] only moves the local tag — the caller's list is untouched."],
    solution: 'def add_mark(marks, m):\n    marks.append(m)\n\ndef reset(marks):\n    marks = []\n\nclass_marks = [70, 80]\nadd_mark(class_marks, 90)\nreset(class_marks)\nprint(class_marks)',
  },
  stack: {
    id: "stack", kind: "type", title: "Watch the stack",
    task: <>The prints show the order frames are pushed and popped. Predict all six lines first.</>,
    show: 'def add_gst(amount):\n    print("  start add_gst")\n    gst = amount * 0.18\n    print("  end add_gst")\n    return gst\n\ndef total_bill(amount):\n    print("start total_bill")\n    total = amount + add_gst(amount)\n    print("end total_bill")\n    return total\n\nprint(total_bill(1000))',
    minLines: 14,
    tests: [{ expect: "start total_bill\n  start add_gst\n  end add_gst\nend total_bill\n1180.0" }],
    hints: ["add_gst must finish (pop) before total_bill can carry on."],
    solution: 'def add_gst(amount):\n    print("  start add_gst")\n    gst = amount * 0.18\n    print("  end add_gst")\n    return gst\n\ndef total_bill(amount):\n    print("start total_bill")\n    total = amount + add_gst(amount)\n    print("end total_bill")\n    return total\n\nprint(total_bill(1000))',
  },
  weather: {
    id: "weather", kind: "make", title: "Weather report with functions",
    task: <>Write three functions that take parameters and <strong>return</strong> (no globals, no printing inside them): <code>average(nums)</code>, <code>spread(nums)</code> (max − min) and <code>count_above(nums, limit)</code>. Main code: ask <code>Temps: </code> (one line of decimals), then print <code>Average: 31.5</code>, <code>Spread: 6.0</code> (1 decimal each) and <code>Hot days: 3</code> (days above the average).</>,
    minLines: 16,
    tests: [
      { inputs: ["30 28.5 34.5 33 29 34"], expect: temps("30 28.5 34.5 33 29 34") },
      { inputs: ["20 20 20"], expect: temps("20 20 20"), hidden: true },
      { inputs: ["10 40"], expect: temps("10 40"), hidden: true },
    ],
    post: "assert average([1, 2, 3]) == 2\nassert spread([5, 1, 9]) == 8\nassert count_above([1, 5, 9], 4) == 2",
    requires: [{ node: "FunctionDef", min: 3 }, { node: "Return", min: 3 }],
    forbids: [{ node: "Global", msg: "Pass values in as parameters instead of using global." }],
    hints: ["def average(nums): return sum(nums) / len(nums)", "count_above loops and counts n > limit.", "Main: nums = [float(x) for x in …] or a loop with append; avg = average(nums); then count_above(nums, avg)."],
    solution: 'def average(nums):\n    return sum(nums) / len(nums)\n\ndef spread(nums):\n    return max(nums) - min(nums)\n\ndef count_above(nums, limit):\n    count = 0\n    for n in nums:\n        if n > limit:\n            count += 1\n    return count\n\nnums = []\nfor p in input("Temps: ").split():\n    nums.append(float(p))\navg = average(nums)\nprint(f"Average: {avg:.1f}")\nprint(f"Spread: {spread(nums):.1f}")\nprint(f"Hot days: {count_above(nums, avg)}")',
  },
};

export const EXERCISES = EX; // for src/kit/selfTest.js

const QUIZ = [
  { q: "A variable created inside a function is…", options: ["Global", "Local to that call — gone when it returns", "Shared by all functions", "Saved forever"], answer: 1, explain: "Each call gets its own room; it's demolished at return." },
  { q: "What does this print?", code: "x = 5\ndef f():\n    x = 1\nf()\nprint(x)", options: ["1", "5", "None", "Error"], answer: 1, explain: "x = 1 inside f creates a local x; the global x stays 5." },
  { q: "Why does count = count + 1 inside a function raise UnboundLocalError?", options: ["count is a keyword", "The assignment makes count local, so the read on the right has no local value yet", "Globals are read-only", "Missing brackets"], answer: 1, explain: "Pass count in and return the new value instead." },
  { q: "def f(lst): lst.append(1). After nums = []; f(nums), what is nums?", options: ["[]", "[1]", "None", "Error"], answer: 1, explain: "lst and nums are tags on the same list; append changes that list." },
  { q: "A calls B, B calls C. Which finishes first?", options: ["A", "B", "C", "All at once"], answer: 2, explain: "Last in, first out: C's frame is on top and pops first." },
];

export default function Unit8_3(props) {
  const sections = [
    {
      label: "The Mystery", kicker: "PREDICT FIRST", title: "Same name, different variable",
      blocks: [<P>A function sets <code>x = 99</code>. Afterwards, the program prints <code>x</code>. What appears? Step through, then run it for real:</P>, <TwoRooms />, EX.mystery],
    },
    {
      label: "Local vs Global", kicker: "TWO ROOMS", title: "What a function can see",
      blocks: [
        <P>Each call gets a private room. It can <strong>read</strong> names from the global room, but anything it <strong>assigns</strong> lives in its own room and disappears at return. To get something out: <code>return</code> it.</P>,
        EX.local,
        EX.readglobal,
        EX.unbound,
        <Note color={T.blue} icon="🐍">Python does have a <code>global</code> keyword that lets a function assign to a global variable. Professionals avoid it: functions that take parameters and return results are easier to test, reuse and trust.</Note>,
      ],
    },
    {
      label: "Lists Passed In", kicker: "ALIASING AGAIN", title: "When a function changes your list",
      blocks: [EX.mutate, <KeyIdea>Changing a list's contents (<code>append</code>, <code>marks[0] = …</code>) inside a function affects the caller's list. Assigning a new list to the parameter (<code>marks = []</code>) only moves the local tag.</KeyIdea>],
    },
    {
      label: "Call Stack", kicker: "FRAMES", title: "The call stack",
      blocks: [<P>Every call pushes a <strong>frame</strong> — its room — on top of a stack; every return pops one. Step through a function calling a function:</P>, <CallStack />, EX.stack],
    },
    {
      label: "Make It", kicker: "PUT IT TOGETHER", title: "Your program: weather report",
      blocks: [<P>Three small functions, each taking parameters and returning a result; the main code does the input and printing.</P>, EX.weather],
    },
  ];
  return (
    <LessonShell {...props} unitId="Unit8_3" crumb="MODULE 8 › UNIT 8.3" title="Scope & the Call Stack" sections={sections} quiz={QUIZ}
      next={{ title: "Unit 8.4 — Grand Capstone: Marks Manager 2.0", text: "Rebuild the Marks Manager the professional way: small functions that return." }} />
  );
}
