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
  ],
};

export default COURSE_CONFIG;
