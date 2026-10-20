// ============================================================
//  CONCEPTS — the 25 course concepts a student points out in
//  their own code, grouped into one screen per experiment
//  (Experiments 5 and 6 share one). Taken from the MED23CL202
//  lab manual's aims and programs.
//
//  `code` is the short letter code printed beside tagged lines in
//  the PDF, so tags still read on a black-and-white printout.
//  `pattern` is the fallback check used only when Python can't
//  parse a file (a syntax error); normally analyzer.js checks tags
//  with Python's own parser.
// ============================================================

export const GROUP_COLORS = {
  e1: '#378ADD', e2: '#1D9E75', e3: '#7F77DD', e4: '#D4537E', e56: '#BA7517',
  e7: '#D85A30', e8: '#C2413F', e9: '#5E9A24', e10: '#3E7CA8',
};

export const SCREENS = [
  { id: 'e1', exp: 'Experiment 1', title: 'Data types, operators and decisions', concepts: ['input_conv', 'arith', 'compare', 'decision'] },
  { id: 'e2', exp: 'Experiment 2', title: 'Loops, collections and functions', concepts: ['for_loop', 'while_loop', 'list', 'dict', 'function', 'module'] },
  { id: 'e3', exp: 'Experiment 3', title: 'Classes, objects and encapsulation', concepts: ['class', 'object', 'private'] },
  { id: 'e4', exp: 'Experiment 4', title: 'Inheritance and polymorphism', concepts: ['subclass', 'override_poly'] },
  { id: 'e56', exp: 'Experiments 5 and 6', title: 'File handling', concepts: ['file'] },
  { id: 'e7', exp: 'Experiment 7', title: 'Handling errors with try / except', concepts: ['try', 'multi_except'] },
  { id: 'e8', exp: 'Experiment 8', title: 'raise, finally and your own exception', concepts: ['raise', 'finally', 'custom_exc'] },
  { id: 'e9', exp: 'Experiment 9', title: 'Data analysis with pandas', concepts: ['dataframe', 'select_filter'] },
  { id: 'e10', exp: 'Experiment 10', title: 'Charts', concepts: ['matplotlib', 'seaborn'] },
];

const C = (id, screen, code, label, what, example, pattern) => ({ id, screen, code, label, what, example, pattern });

export const CONCEPTS = [
  C('input_conv', 'e1', 'IN', 'Input with type conversion', 'A line that reads input and converts it to a number.', 'temp = float(input("Temperature: "))', /\b(int|float)\s*\(\s*input\s*\(/),
  C('arith', 'e1', 'AR', 'Arithmetic operators', 'A calculation using + - * / // % or **.', 'bmi = weight / (height ** 2)', /[\w)\]]\s*(\*\*|\/\/|[-+*/%])=?\s*[\w(.]/),
  C('compare', 'e1', 'CO', 'Comparison and logical operators', 'A comparison (== != < > <= >=), or and / or / not.', 'if temp >= 100.4 and pulse > 100:', /(==|!=|<=|>=|<|>|\band\b|\bor\b|\bnot\b)/),
  C('decision', 'e1', 'IF', 'Decisions (if / elif / else)', 'An if statement, from the if line to the end of its last branch.', 'if bmi < 18.5:\n    band = "Under"\nelif bmi < 25:\n    band = "Normal"\nelse:\n    band = "Over"', /^\s*(if|elif|else)\b|\bif\b.*\belse\b/),

  C('for_loop', 'e2', 'FO', 'for loop', 'A for loop, from its first line to the end of its body.', 'for p in patients:\n    print(p.name)', /^\s*for\b|\bfor\b.+\bin\b/),
  C('while_loop', 'e2', 'WH', 'while loop', 'A while loop, from its first line to the end of its body.', 'while choice != "0":\n    choice = input("Option: ")', /^\s*while\b/),
  C('list', 'e2', 'LI', 'List', 'Where you make a list or add to it.', 'readings = []\nreadings.append(temp)', /\[|\blist\s*\(|\.(append|extend|insert|pop|remove|sort)\s*\(/),
  C('dict', 'e2', 'DI', 'Dictionary', 'Where you make a dictionary or use its keys and values.', 'stock = {"Paracetamol": 120}\nstock["Paracetamol"] -= 10', /\{[^}]*:|\bdict\s*\(|\.(items|keys|values|get)\s*\(/),
  C('function', 'e2', 'FN', 'Function that returns a value', 'A def … with a return.', 'def bmi_band(bmi):\n    if bmi < 25:\n        return "Normal"\n    return "Over"', /^\s*def\b|\breturn\b/),
  C('module', 'e2', 'MO', 'Module (import)', 'An import line.', 'import statistics', /^\s*(import|from)\s+\w/),

  C('class', 'e3', 'CL', 'Class', 'The class line and its body.', 'class Patient:\n    def __init__(self, name):\n        self.name = name', /^\s*class\s+\w+/),
  C('object', 'e3', 'OB', 'Objects created', 'A line that creates an object from your class.', 'p1 = Patient("Ravi")', /\b[A-Z]\w*\s*\(/),
  C('private', 'e3', 'PR', 'Private attribute with getter / setter', 'A private attribute (self.__name) and the methods that read or change it.', 'self.__temp = 0.0\ndef set_temp(self, value): ...\ndef get_temp(self): ...', /self\.__[A-Za-z]\w*|def\s+(get|set)_\w+|@property|\.setter/),

  C('subclass', 'e4', 'SU', 'Inheritance (subclass)', 'The line where a class extends another class.', 'class ICUPatient(Patient):', /^\s*class\s+\w+\s*\(\s*[\w.]+/),
  C('override_poly', 'e4', 'OV', 'Overriding or polymorphism', 'Show either one (or both): a method you redefined in a subclass, OR one line where the same method call meets different kinds of objects.', 'def status(self, temp):   # in ICUPatient, overrides Patient.status\n\nfor p in patients:\n    print(p.status(t))       # one call, different versions', /^\s*def\s+\w+|\.\w+\s*\(/),

  C('file', 'e56', 'FI', 'File handling', 'Any line that writes, appends to or reads a file: any kind of file, any mode.', 'with open(DATA_FILE, "a") as f:\n    f.write(name + "," + str(temp) + "\\n")', /\bopen\s*\(|\bcsv\.|\bjson\.(load|dump)|read_(csv|excel|json)\s*\(|to_(csv|excel|json)\s*\(|\.(write|read|readlines|readline|writelines)\s*\(/),

  C('try', 'e7', 'TR', 'try / except', 'A try block and its except block(s).', 'try:\n    temp = float(input("Temp: "))\nexcept ValueError:\n    print("Please enter a number")', /^\s*(try|except)\b/),
  C('multi_except', 'e7', 'ME', 'More than one specific exception', 'Two or more except blocks that each name an error type.', 'except ValueError:\n    ...\nexcept ZeroDivisionError:\n    ...', /^\s*except\s+\(?\w/),

  C('raise', 'e8', 'RA', 'raise', 'A line that raises an exception.', 'raise ValueError("Age cannot be negative")', /\braise\b/),
  C('finally', 'e8', 'FY', 'finally', 'A finally block.', 'finally:\n    print("Done")', /^\s*finally\s*:/),
  C('custom_exc', 'e8', 'EX', 'Your own (user-defined) exception', 'Where your exception class is defined. Also tag where you raise it and where you catch it.', 'class InvalidReadingError(Exception):\n    pass', /class\s+\w+\s*\(\s*\w*(Exception|Error)\s*\)|\braise\s+\w+|\bexcept\s+\w+/),

  C('dataframe', 'e9', 'PD', 'pandas DataFrame', 'Where you build or load a DataFrame.', 'df = pd.read_csv(DATA_FILE)', /DataFrame\s*\(|read_(csv|excel|json)\s*\(/),
  C('select_filter', 'e9', 'FL', 'Select and filter data', 'Choosing columns or rows, e.g. df["temp"], a filter, head(), shape or groupby.', 'fever = df[df["temp"] >= 100.4]\nprint(fever.head())', /\[\s*["']|\.(head|tail|describe|groupby|sort_values|query|value_counts)\s*\(|\.(shape|loc|iloc|columns)\b|\]\s*(==|!=|>=|<=|>|<)/),

  C('matplotlib', 'e10', 'PL', 'Matplotlib chart with labels', 'The lines that draw, label and show a chart.', 'plt.plot(hours, temps)\nplt.xlabel("Hour")\nplt.title("Temperature")\nplt.show()', /\bplt\.|\.plot\s*\(|pyplot/),
  C('seaborn', 'e10', 'SB', 'Seaborn chart', 'A chart drawn with seaborn.', 'sns.histplot(data=df, x="temp")', /\bsns\.|seaborn/),
];

export const CONCEPT = Object.fromEntries(CONCEPTS.map(c => [c.id, c]));
export const colorOf = (conceptId) => GROUP_COLORS[CONCEPT[conceptId]?.screen] || '#888';

// Line numbers a concept is tagged on, per file id.
export function taggedLines(d, conceptId) {
  return d.concepts?.[conceptId]?.lines || {};
}
// Only files that still exist count (a student may delete a file after tagging).
export function hasTags(d, conceptId) {
  const ids = new Set((d.files || []).map(f => f.id));
  return Object.entries(taggedLines(d, conceptId)).some(([fid, a]) => ids.has(fid) && a && a.length);
}

// 'used' | 'notused' | 'pending'
export function conceptState(d, conceptId) {
  if (hasTags(d, conceptId)) return 'used';
  if (d.concepts?.[conceptId]?.notUsed) return 'notused';
  return 'pending';
}

export function usedCount(d) {
  return CONCEPTS.filter(c => conceptState(d, c.id) === 'used').length;
}

// Consecutive line numbers merged into ranges: [3,4,5,9] -> [[3,5],[9,9]]
export function toRanges(lines) {
  const s = [...new Set(lines || [])].sort((a, b) => a - b);
  const out = [];
  for (const n of s) {
    const last = out[out.length - 1];
    if (last && n === last[1] + 1) last[1] = n;
    else out.push([n, n]);
  }
  return out;
}
export const rangeText = (r) => (r[0] === r[1] ? `${r[0]}` : `${r[0]}–${r[1]}`);

// "main.py lines 3–5, 9 · patient.py line 2"
export function whereText(d, conceptId) {
  const tl = taggedLines(d, conceptId);
  return d.files
    .filter(f => tl[f.id]?.length)
    .map(f => {
      const rs = toRanges(tl[f.id]);
      const many = rs.length > 1 || rs[0][0] !== rs[0][1];
      return `${f.name || 'file'} line${many ? 's' : ''} ${rs.map(rangeText).join(', ')}`;
    })
    .join(' · ');
}

export const FILE_PLACES = ['Colab folder (temporary)', 'Google Drive', 'My own computer'];
