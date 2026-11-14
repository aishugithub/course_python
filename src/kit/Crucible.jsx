// ── CrucibleShell ──
// The ten Crucibles (UnitX_C) in the typing-first format. Four stages that
// unlock one by one, every one of them typed:
//   ✨ Spark  — trace programs and type their exact output (kind "predict")
//   🔥 Flame  — bug hunt: programs that crash or quietly give wrong answers
//   ⚒️ Forge  — finish a program (complete / modify)
//   🗡️ Temper — write a whole program from a blank editor, hidden tests
// Finishing records the bare unitId through onUnitComplete, which is what the
// certificate rule in src/shell/completion.js counts.

import LessonShell, { P, Note } from "./Lesson.jsx";
import { T } from "./theme.js";

export default function CrucibleShell({ unitId, module, title, spark, flame, forge, temper, quiz, next, ...props }) {
  const sections = [
    { label: "✨ Spark", kicker: "STAGE 1 · TRACE IT", title: "Read it the way Python does", blocks: [
      <P>No new content here: this is where {module} has to work without a lesson beside you. Every stage is typed. Stages unlock one by one; hints still appear when you're stuck, and a worked answer only after several tries.</P>,
      <Note color={T.orange} icon="🔥">Spark: don't run anything — trace each program in your head (or on paper) and type exactly what it prints, line by line.</Note>,
      ...spark,
    ] },
    { label: "🔥 Flame", kicker: "STAGE 2 · BUG HUNT", title: "Find what's wrong", blocks: [<P>These programs run — or almost. Each one hides at least one bug. Run it, compare with what it should do, and fix it. Hidden tests try other inputs.</P>, ...flame] },
    { label: "⚒️ Forge", kicker: "STAGE 3 · FINISH IT", title: "Finish the program", blocks: forge },
    { label: "🗡️ Temper", kicker: "STAGE 4 · WRITE IT", title: "Write it yourself", blocks: [<P>A blank editor and a real problem. Read the whole task first, plan the steps, then build it a piece at a time — run often.</P>, ...temper] },
  ];
  return (
    <LessonShell {...props} unitId={unitId} crumb={`THE CRUCIBLE › ${module.toUpperCase()}`} title={title} sections={sections} quiz={quiz} lockAhead
      next={next || { title: "Crucible cleared!", text: "One more toward your course certificate (all ten Crucibles + the Finish Line feedback)." }} />
  );
}
