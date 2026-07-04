// ============================================================
//  COURSE CONFIG — the ONLY file you edit per course
//  Change courseId, courseTitle, subtitle, batch
//  Then update modules and units to match your course
// ============================================================

const COURSE_CONFIG = {

  courseId:    "course_python",          // e.g. "python101"
  courseTitle: "Python Programming",    // e.g. "Python Programming 101"
  subtitle:    "From zero to Pythonista", // e.g. "From zero to Pythonista"
  batch:       "2025",

  modules: [
    {
      moduleId:    "M1",
      moduleTitle: "Computing",
      icon:        "",
      units: [
        { unitId: "Unit1_1", title: "What is a Computer?" },
        { unitId: "Unit1_2", title: "Algorithms" },
		{ unitId: "Unit1_3", title: "Konjam History" },
      ],
    },
    {
      moduleId:    "M2",
      moduleTitle: "Computing Languages",
      icon:        "",
      units: [
        { unitId: "Unit2_1", title: "Human Vs Machine Lang" },
        { unitId: "Unit2_2", title: "Machine code" },
		{ unitId: "Unit2_3", title: "Assembly Lang" },
		{ unitId: "Unit2_4", title: "High level Lang" },
      ],
    },
	{
      moduleId:    "M3",
      moduleTitle: "The Conversion",
      icon:        "",
      units: [
        { unitId: "Unit3_1", title: "Compilation" },
        { unitId: "Unit3_2", title: "Interpretation" },
		{ unitId: "Unit3_3", title: "Python" },
      ],
    },
	{
      moduleId:    "M4",
      moduleTitle: "Your First Python Program",
      icon:        "",
      units: [
        { unitId: "Unit4_0", title: "Running Python on Your Own Machine" },
        { unitId: "Unit4_1", title: "Your First Program" },
        { unitId: "Unit4_2", title: "Variables & Memory" },
		{ unitId: "Unit4_3", title: "Input & Type Conversion" },
		{ unitId: "Unit4_4", title: "Operators & Expressions" },
		{ unitId: "Unit4_C", title: "The Crucible", optional: true },
      ],
    },
	{
      moduleId:    "M5",
      moduleTitle: "Making Decisions",
      icon:        "",
      units: [
        { unitId: "Unit5_1", title: "Booleans & Truthy/Falsy Values" },
        { unitId: "Unit5_2", title: "if / elif / else" },
		{ unitId: "Unit5_3", title: "Nested Conditions & Boolean Logic" },
		{ unitId: "Unit5_4", title: "Capstone: Decision Maker" },
		{ unitId: "Unit5_C", title: "The Crucible", optional: true },
      ],
    },
	{
      moduleId:    "M6",
      moduleTitle: "Repetition",
      icon:        "",
      units: [
        { unitId: "Unit6_1", title: "The while Loop" },
        { unitId: "Unit6_2", title: "The for Loop & range()" },
        { unitId: "Unit6_3", title: "break, continue & Nested Loops" },
        { unitId: "Unit6_4", title: "Capstone: Number-Guessing Game" },
        { unitId: "Unit6_C", title: "The Crucible", optional: true },
      ],
    },
	{
      moduleId:    "M6.5",
      moduleTitle: "Computational Thinking I — Thinking in Algorithms",
      icon:        "",
      units: [
        { unitId: "UnitCT1_1", title: "The Four Moves & the Accumulator" },
        { unitId: "UnitCT1_2", title: "Counting & Building with Loops" },
        { unitId: "UnitCT1_3", title: "Deciding Inside a Loop" },
        { unitId: "UnitCT1_4", title: "Patterns & Nested Loops" },
        { unitId: "UnitCT1_5", title: "Capstone: Crack It Yourself" },
        { unitId: "UnitCT1_C", title: "The Crucible", optional: true },
      ],
    },
	{
      moduleId:    "M7",
      moduleTitle: "Organizing Data",
      icon:        "",
      units: [
        { unitId: "Unit7_1", title: "Strings in Depth" },
        { unitId: "Unit7_2", title: "Lists" },
        { unitId: "Unit7_3", title: "List Methods & Loop Patterns" },
        { unitId: "Unit7_4", title: "Tuples & Dictionaries" },
        { unitId: "Unit7_5", title: "Capstone: Student Marks Manager" },
        { unitId: "Unit7_C", title: "The Crucible", optional: true },
      ],
    },
	{
      moduleId:    "M7.5",
      moduleTitle: "Computational Thinking II — Algorithms on Data",
      icon:        "",
      units: [
        { unitId: "UnitCT2_1", title: "Scanning a List" },
        { unitId: "UnitCT2_2", title: "Searching: Linear & Binary" },
        { unitId: "UnitCT2_3", title: "Sorting: Bubble, Selection & Insertion" },
        { unitId: "UnitCT2_4", title: "Matrices: Grids of Data" },
        { unitId: "UnitCT2_5", title: "String Algorithms" },
        { unitId: "UnitCT2_C", title: "The Crucible", optional: true },
      ],
    },
	{
      moduleId:    "M8",
      moduleTitle: "Functions & Modular Thinking",
      icon:        "",
      units: [
        { unitId: "Unit8_1", title: "Why Functions?" },
        { unitId: "Unit8_2", title: "Parameters & Return Values" },
        { unitId: "Unit8_3", title: "Scope & the Call Stack" },
        { unitId: "Unit8_4", title: "Grand Capstone: Marks Manager 2.0" },
        { unitId: "Unit8_C", title: "The Crucible", optional: true },
      ],
    },
	{
      moduleId:    "M8.5",
      moduleTitle: "Computational Thinking III — Thinking Recursively",
      icon:        "",
      units: [
        { unitId: "UnitCT3_1", title: "The Recursive Idea" },
      ],
    },
	{
      moduleId:    "M9",
      moduleTitle: "When Things Go Wrong",
      icon:        "",
      units: [
        { unitId: "Unit9_1", title: "Errors Aren't Failures" },
        { unitId: "Unit9_2", title: "Catching & Raising" },
        { unitId: "Unit9_3", title: "Files: Making Data Survive" },
        { unitId: "Unit9_4", title: "Capstone: The Persistent Marks Manager" },
        { unitId: "Unit9_C", title: "The Crucible", optional: true },
      ],
    },
	{
      moduleId:    "M10",
      moduleTitle: "Object-Oriented Programming",
      icon:        "",
      units: [
        { unitId: "Unit10_1", title: "Why Objects?" },
        { unitId: "Unit10_2", title: "__init__ & self" },
        { unitId: "Unit10_3", title: "Methods & Encapsulation" },
        { unitId: "Unit10_4", title: "Inheritance" },
        { unitId: "Unit10_5", title: "Capstone: Marks Manager 3.0" },
        { unitId: "Unit10_C", title: "The Crucible", optional: true },
      ],
    },
  ],
};

export default COURSE_CONFIG;
