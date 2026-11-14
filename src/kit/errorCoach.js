// ── Error coach ──
// Turns a Python error into a beginner-friendly explanation: what Python
// is complaining about, where, and what to try. Written for first-week
// learners — no jargon beyond the error's own name.

const BUILTINS = ["print", "input", "int", "float", "str", "len", "range", "type", "list", "dict",
  "tuple", "set", "max", "min", "sum", "abs", "round", "sorted", "bool", "open"];

// name → first line where it is assigned (x = ..., for x in ..., def x)
function assignedNames(code) {
  const made = {};
  code.split("\n").forEach((l, i) => {
    const m = l.match(/^\s*([A-Za-z_]\w*)\s*(?:[+\-*/%]|\/\/|\*\*)?=(?!=)/) || l.match(/^\s*for\s+([A-Za-z_]\w*)\s+in\b/) || l.match(/^\s*def\s+([A-Za-z_]\w*)/);
    if (m && !(m[1] in made)) made[m[1]] = i + 1;
  });
  return made;
}

function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

function lineOf(code, n) {
  if (!n) return "";
  return (code.split("\n")[n - 1] || "").trim();
}

export function coach(err, code = "") {
  if (!err) return null;
  const { type, msg = "", line } = err;
  const src = lineOf(code, line);
  const at = line ? ` on line ${line}` : "";
  const out = (title, body, tip) => ({ title, body, tip, line, src, raw: `${type}: ${msg}` });

  switch (type) {
    case "NameError": {
      const m = msg.match(/name '([^']+)' is not defined/);
      const name = m ? m[1] : "that name";
      const lower = name.toLowerCase();
      const C_HABITS = { printf: "print", puts: "print", cout: "print", println: "print", scanf: "input", gets: "input", cin: "input", strlen: "len", true: "True", false: "False", null: "None", NULL: "None" };
      if (C_HABITS[name])
        return out(`"${name}" is from C, not Python`,
          `Python's version is ${C_HABITS[name]}. A lot of C habits sneak in during the first weeks — that's normal.`,
          `Use ${C_HABITS[name]} instead of ${name}.`);
      if (/^_+$/.test(name))
        return out("There's still a blank to fill in", `Replace ${name} with your answer.`, `Type your value where the ${name} is.`);
      if (name !== lower && BUILTINS.includes(lower))
        return out(`Python doesn't know "${name}"`,
          `Python is case-sensitive: ${name} and ${lower} are different names. The built-in function is spelled in lowercase.`,
          `Write ${lower} instead of ${name}.`);
      const lines = code.split("\n");
      const assignRe = new RegExp(`^(\\s*)${name}\\s*(?:[+\\-*/%]|//|\\*\\*)?=(?!=)`);
      const assigns = lines.map((l) => l.match(assignRe)).filter(Boolean);
      const usedAtTop = line && !/^\s/.test(lines[line - 1] || "");
      if (assigns.length && assigns.every((m) => m[1].length > 0) && usedAtTop)
        return out(`${name} only exists inside the function`,
          `${name} is created inside a function, so it's a LOCAL variable: it disappears when the function returns. Line ${line} is outside the function, where no ${name} exists.`,
          `return ${name} from the function, and store the result: ${name} = the_function()`);
      const made = assignedNames(code);
      const caseTwin = Object.keys(made).find((n) => n !== name && n.toLowerCase() === name.toLowerCase());
      if (caseTwin)
        return out(`"${name}" and "${caseTwin}" are different names`,
          `You created ${caseTwin} (line ${made[caseTwin]}) but used ${name}${at}. Python is case-sensitive — one capital letter makes it a different variable.`,
          `Spell it exactly the same everywhere.`);
      if (made[name] && line && made[name] > line)
        return out(`"${name}" is used before it exists`,
          `You use ${name} on line ${line}, but it is only created on line ${made[name]}. Python runs top to bottom, so on line ${line} there is no ${name} yet.`,
          `Move the line that creates ${name} above the line that uses it.`);
      const typoOf = Object.keys(made).find((n) => n.length >= 3 && editDistance(n, name) <= 2);
      if (typoOf)
        return out(`Python doesn't know "${name}"`, `You created ${typoOf} (line ${made[typoOf]}). Did you mean that? A one-letter typo makes a completely different name.`, `Check the spelling: ${typoOf}`);
      const close = BUILTINS.find((b) => b !== lower && Math.abs(b.length - lower.length) <= 1 && [...b].filter((c, i) => lower[i] === c).length >= b.length - 1);
      if (close)
        return out(`Python doesn't know "${name}"`, `It looks like a typo of ${close}.`, `Check the spelling: ${close}`);
      if (/^[A-Z]/.test(name) || /["']/.test(src) === false && /print\(\s*[A-Za-z]/.test(src))
        return out(`Python doesn't know "${name}"`,
          `Without quotes, Python reads ${name} as the name of a variable — and no variable called ${name} exists. If you meant the text "${name}", it needs quotes around it.`,
          `Text goes inside quotes: "like this". Names without quotes must be created first (name = ...).`);
      return out(`Python doesn't know "${name}"`,
        `You used ${name}${at}, but nothing with that name has been created yet. Either it is misspelt (compare it letter by letter with where you created it), or you used it before the line that creates it.`,
        `Python reads top to bottom — create a variable before you use it.`);
    }

    case "SyntaxError": {
      const spaced = src.match(/^([A-Za-z_]\w*(?:\s+[A-Za-z_]\w*)+)\s*=[^=]/);
      if (spaced && !/^(if|elif|while|for|def|return|print)\b/.test(spaced[1]))
        return out("A variable name can't contain spaces",
          `On line ${line}, "${spaced[1]}" has a space in it, so Python sees two separate words. Names must be one word.`,
          `Join the words with an underscore: ${spaced[1].trim().split(/\s+/).join("_")}`);
      if (/Maybe you meant '==' /.test(msg) || /^\s*(if|elif|while)\b[^=!<>]*[^=!<>]=[^=]/.test(src))
        return out("= stores, == compares",
          `Line ${line} uses a single = inside a condition. One = means “store this value”; a condition needs == to ask “are these equal?”.`,
          `Change = to == on line ${line}.`);
      if (/^\s*else\s*[^:\s]/.test(src))
        return out("else doesn't take a condition",
          `else means “in every other case”, so nothing goes between else and the colon. If you need another condition, that's elif.`,
          `Write else: on its own — or change it to elif <condition>:`);
      if (/^\s*elif\b/.test(src) && /invalid syntax/.test(msg) && !/:\s*$/.test(src))
        return out("Missing colon :", `Line ${line} needs a colon at the end.`, `Add : at the end of line ${line}.`);
      if (/unterminated string|EOL while scanning/.test(msg))
        return out("A quote was opened but never closed",
          `Line ${line} starts some text with a quote mark but doesn't finish it. Every " needs a matching " (and every ' a matching ').`,
          `Find the opening quote and add its partner at the end of the text.`);
      if (/unterminated triple-quoted/.test(msg))
        return out("A triple-quoted string never ends", `A """ was opened but not closed.`, `Close it with another """.`);
      const neverClosed = msg.match(/'(\(|\[|\{)' was never closed/);
      if (neverClosed)
        return out(`A "${neverClosed[1]}" was never closed`,
          `On line ${line} you opened ${neverClosed[1]} but didn't close it. Python reached the end and was still waiting.`,
          `Count the brackets: every ( needs a ), every [ a ], every { a }.`);
      const unmatched = msg.match(/unmatched '(\)|\]|\})'/) || msg.match(/closing parenthesis '(.)' does not match/);
      if (unmatched)
        return out("Brackets don't match up", `Line ${line} has a closing bracket with no opening partner, or the wrong kind.`, `Pair them up from the inside out.`);
      if (/expected ':'/.test(msg))
        return out("Missing colon :", `Lines starting with if, elif, else, for, while, def or class must end with a colon. Line ${line} doesn't.`, `Add : at the end of line ${line}.`);
      if (/Perhaps you forgot a comma/.test(msg))
        return out("Two things are side by side with nothing between them",
          `On line ${line}, Python found two values next to each other. Inside print( ) separate items with a comma — or, if it was meant to be one piece of text, check the quotes.`,
          `print("Total:", total) — the comma separates the two items.`);
      if (/invalid character/.test(msg))
        return out("A character Python can't read", `Line ${line} has a character like “ ” ‘ ’ (curly quotes) or – (a long dash). These often sneak in when code is typed in Word or WhatsApp.`, `Retype the quotes and dashes directly in the editor.`);
      if (/'(.+)' is an illegal expression|cannot assign to/.test(msg))
        return out("The left side of = must be a name", `On line ${line}, the left of = is not a variable name. Assignment always goes name = value.`, `Did you mean == (compare) instead of = (store)?`);
      if (/Missing parentheses in call to 'print'/.test(msg))
        return out("print needs brackets", `In Python 3, print is a function: print("hi"), not print "hi".`, `Wrap what you print in ( ).`);
      if (/unexpected EOF|incomplete input/.test(msg))
        return out("The program ended too early", `Python reached the end while something was still open — a bracket, a quote, or a block after a colon.`, `Check the last few lines for something left unfinished.`);
      if (/invalid decimal literal/.test(msg))
        return out("A name can't start with a number", `On line ${line}, something like 2nd or 1st_mark is used as a name. Variable names may contain digits but cannot start with one.`, `Rename it — e.g. second, mark_1.`);
      if (/'return' outside function/.test(msg))
        return out("return outside a function", `return only makes sense inside a def.`, `Indent it into the function, or use print instead.`);
      return out("Python can't read this line", `Line ${line} isn't valid Python grammar (Python's message: "${msg}"). Look for a missing bracket, quote, comma or colon — or a stray character.`, `Compare the line carefully with the example.`);
    }

    case "IndentationError":
    case "TabError":
      if (/unexpected indent/.test(msg))
        return out("This line is pushed in for no reason", `Line ${line} starts with spaces, but it isn't inside a block. In Python, spaces at the start of a line mean "this belongs to the block above" — so they must only appear after a line ending in :.`, `Remove the spaces at the start of line ${line}.`);
      if (/expected an indented block/.test(msg))
        return out("The block after the colon is empty", `A line ending in : must be followed by at least one indented line (4 spaces in).`, `Indent the next line by pressing Tab.`);
      if (/unindent does not match/.test(msg))
        return out("Indentation doesn't line up", `Line ${line} is indented by a different amount than the lines around it. Lines in the same block must start at exactly the same column.`, `Use 4 spaces per level, consistently.`);
      return out("Indentation problem", `Line ${line}: ${msg}.`, `Line up the block with 4 spaces per level.`);

    case "TypeError": {
      if (/can only concatenate str \(not "(\w+)"\) to str/.test(msg)) {
        const t = msg.match(/not "(\w+)"/)[1];
        const quotedNearPlus = /["']\s*\+|\+\s*["']/.test(src);
        if (!quotedNearPlus && /\binput\s*\(/.test(code))
          return out("This value is still text from input()",
            `On line ${line}, + is used for maths, but one side is text — input() always returns text, even when the user types digits. Text + ${t} makes no sense to Python.`,
            `Convert the answer when you read it: int(input(...)) for whole numbers, float(input(...)) for decimals.`);
        return out("Text + number can't be glued", `On line ${line}, you used + between text and a ${t}. + joins text to text, or adds numbers to numbers — never a mix.`, `Use a comma inside print("Total:", x), or convert: str(x).`);
      }
      if (/unsupported operand type\(s\) for ([^:]+): '(\w+)' and '(\w+)'/.test(msg)) {
        const [, op, a, b] = msg.match(/for ([^:]+): '(\w+)' and '(\w+)'/);
        const strHint = a === "str" || b === "str"
          ? " Remember: input() ALWAYS gives text, even if the user types digits. Convert it with int() or float() first." : "";
        const an = (w) => (/^[aeiou]/.test(w) ? `an ${w}` : `a ${w}`);
        return out(`Can't use ${op.trim()} on ${an(a)} and ${an(b)}`, `Line ${line} tries ${a} ${op.trim()} ${b}, which Python doesn't allow.${strHint}`, `Check the type of each side — print(type(x)) helps.`);
      }
      if (/'(\w+)' object is not callable/.test(msg)) {
        const t = msg.match(/'(\w+)' object/)[1];
        return out("Something is being called like a function, but isn't one", `On line ${line}, ( ) follows a ${t} value. Often this means a variable has the same name as a function (e.g. you wrote print = 5 or max = 10 earlier).`, `Rename your variable so it doesn't hide the function.`);
      }
      if (/'(\w+)' object does not support item assignment/.test(msg)) {
        const t = msg.match(/'(\w+)' object/)[1];
        return out(`A ${t} can't be changed in place`, `${t === "str" ? "Strings" : "Tuples"} are immutable: once made, their items can't be replaced. Line ${line} tries to.`, t === "str" ? `Build a new string instead (slicing + joining).` : `Use a list if the data must change.`);
      }
      if (/missing (\d+) required positional argument/.test(msg))
        return out("A function was called with too few values", `${msg}. The call on line ${line} must pass one value for every parameter in the def.`, `Match the call to the def line.`);
      const meth = msg.match(/(\w+)\.(\w+)\(\) takes (\d+) positional arguments? but (\d+) (were|was) given/);
      if (meth && Number(meth[4]) === Number(meth[3]) + 1)
        return out(`Did ${meth[2]} forget self?`,
          `When you call a method on an object, Python passes the object itself as the FIRST argument. ${meth[1]}.${meth[2]} has no parameter to receive it, so there is one argument too many.`,
          `Make self the first parameter: def ${meth[2]}(self, …):`);
      if (/takes (\d+) positional arguments? but (\d+) (were|was) given/.test(msg))
        return out("A function was called with the wrong number of values", `${msg}.`, `Count the parameters in the def and the values in the call.`);
      if (/'(\w+)' object is not subscriptable/.test(msg))
        return out("Using [ ] on something that has no items", `Line ${line} uses [ ] on a value that isn't a string, list, tuple or dict.`, `Check what the variable actually holds.`);
      if (/'(\w+)' object is not iterable/.test(msg))
        return out("Looping over something that isn't a collection", `A for loop (line ${line}) needs a string, list, range(...) etc. — not a single number.`, `Did you mean range(n)?`);
      return out("Wrong type of value", `Line ${line}: ${msg}.`, `Check what type each value is.`);
    }

    case "ValueError":
      if (/invalid literal for int\(\) with base 10: '(.*)'/.test(msg)) {
        const v = msg.match(/: '(.*)'/)[1];
        return out(`int() can't turn "${v}" into a whole number`, `int() only understands text made of digits, like "42". "${v}" ${v.includes(".") ? "has a decimal point — use float() for decimals" : v.trim() === "" ? "is empty" : "isn't a whole number"}.`, v.includes(".") ? `Use float() instead of int().` : `Check what was typed as input.`);
      }
      if (/could not convert string to float/.test(msg))
        return out("float() can't read that text as a number", msg, `Only text like "3.5" or "12" can become a float.`);
      if (/not enough values to unpack|too many values to unpack/.test(msg))
        return out("Unpacking count doesn't match", `On line ${line}, the number of names on the left of = doesn't match the number of values on the right. ${msg}.`, `a, b = (1, 2) needs exactly 2 names for 2 values.`);
      return out("A value of the right type but wrong content", `Line ${line}: ${msg}.`, `Check the value being passed in.`);

    case "UnboundLocalError": {
      const v = (msg.match(/variable '(\w+)'/) || msg.match(/'(\w+)'/) || [])[1] || "it";
      return out(`${v} is local here — but has no value yet`,
        `Inside this function you assign to ${v}, so Python treats ${v} as the function's OWN local variable everywhere in that function. Line ${line} reads it before the function has given it a value. The outside ${v} is not used.`,
        `Pass the value in as a parameter and return the new value: ${v} = update(${v}).`);
    }
    case "NotImplementedError":
      return out("A required method was never written",
        `The parent class only promises this method (it raises NotImplementedError on purpose). The child class you used must provide its own version — it doesn't yet. ${msg}`,
        `Add the missing method to the child class, with the same name.`);
    case "FileNotFoundError": {
      const f = (msg.match(/'([^']+)'/) || [])[1] || "the file";
      return out(`There's no file called ${f}`,
        `Line ${line} tries to open ${f} for reading, but it doesn't exist (yet). This always happens the first time a program runs, before it has saved anything — or the name is misspelt.`,
        `Catch it: try: … except FileNotFoundError: start with empty data.`);
    }
    case "ZeroDivisionError":
      return out("Division by zero", `Line ${line} divides by something that is 0. Maths doesn't allow it, and neither does Python.`, `Check the divisor before dividing (if count > 0: ...).`);
    case "IndexError":
      return out("Index out of range", `Line ${line} asks for a position that doesn't exist. A collection of length n has positions 0 to n-1 — the last item is at n-1, not n.`, `Print len(...) to see how many items there really are.`);
    case "KeyError":
      if (/\[[^\]]+\]\s*\+=/.test(src))
        return out(`No key ${msg} yet — the first time you count it`,
          `Line ${line} adds 1 to ${msg}'s count, but the first time a key appears it isn't in the dictionary yet, so there's nothing to add to.`,
          `Use counts[key] = counts.get(key, 0) + 1 — get gives 0 for a new key.`);
      return out(`No key ${msg} in the dictionary`, `Line ${line} looks up ${msg}, but the dictionary has no such key. Keys must match exactly — including capitals and spaces.`, `Check with: if key in my_dict:`);
    case "AttributeError": {
      const m = msg.match(/'(\w+)' object has no attribute '(\w+)'/);
      if (m && /class\s+\w+/.test(code) && /^[A-Z]/.test(m[1]) && !/^(str|int|float|list|dict|tuple|set|bool|NoneType)$/.test(m[1])) {
        const attr = m[2];
        if (new RegExp(`^\\s+${attr}\\s*=`, "m").test(code) && !new RegExp(`self\\.${attr}\\s*=`).test(code))
          return out(`${m[1]} objects never got a .${attr}`,
            `Inside a method, ${attr} = … only makes a local variable that vanishes when the method ends. To store it ON the object, write self.${attr} = …`,
            `Change ${attr} = … to self.${attr} = … in __init__.`);
        if (/super\(\)/.test(code) === false && /class\s+\w+\(\s*\w+\s*\)/.test(code))
          return out(`${m[1]} objects never got a .${attr}`,
            `The parent class's __init__ sets .${attr}, but this child class has its own __init__ that never calls it.`,
            `Call super().__init__(…) at the start of the child's __init__.`);
        return out(`${m[1]} objects have no .${attr}`, `Nothing ever set .${attr} on this object. Check the spelling, and that __init__ sets self.${attr}.`, `Look for self.${attr} = … in the class.`);
      }
      return out("That method doesn't exist for this type", m ? `A ${m[1]} has no .${m[2]}(). Check the spelling, or whether you have the type you think you have.` : msg, `print(type(x)) shows what you really have.`);
    }
    case "RecursionError":
      return out("The function called itself forever", `There is no base case that stops the recursion, or it is never reached.`, `Make sure every call moves closer to the base case.`);
    case "NeedsInput":
      return out("Your program asked for more input than this test gives",
        `input() was called more times than expected. Check that you only ask for the inputs the task describes.`, `Count your input() calls.`);
    case "Timeout":
      return out("Your program never finished",
        `It ran for over 5 seconds, so it was stopped. The usual cause is an infinite loop: a while condition that never becomes False because the variable inside it never changes.`,
        `Check that the loop variable is updated inside the loop.`);
    case "TooMuchOutput":
      return out("Way too much output", `Your program printed more than 20,000 characters — almost always a loop that never stops.`, `Check the loop's condition and update.`);
    case "ModuleNotFoundError":
      return out("Module not available here", msg, `Check the spelling of the import.`);
    case "RunnerError":
      return out("The Python runner had a problem", `This isn't your code's fault: ${msg}. Check your internet connection (Python is downloaded the first time) and try again.`, `Reload the page if it persists.`);
    default:
      return out(type, `Line ${line ?? "?"}: ${msg}`, `Read the last line of the message — it names the problem.`);
  }
}

// ── Output comparison: explain HOW the output differs ──
export function norm(s) {
  return s.replace(/\r/g, "").split("\n").map((l) => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");
}

export function diffHint(got, expected) {
  const g = norm(got), e = norm(expected);
  if (g === e) return null;
  if (g === "") return "Your program printed nothing. Did you use print( )?";
  if (g.toLowerCase() === e.toLowerCase()) return "So close — the letters match but the capitals don't. Output must match exactly, including capital letters.";
  if (g.replace(/\s+/g, "") === e.replace(/\s+/g, "")) return "The characters are right but the spacing differs — check spaces between words and blank lines.";
  if (g.replace(/[^\w\s]/g, "") === e.replace(/[^\w\s]/g, "")) return "The words are right, but punctuation differs (a comma, full stop, colon or !).";
  const gl = g.split("\n"), el = e.split("\n");
  if (gl.length !== el.length) return `Your output has ${gl.length} line${gl.length === 1 ? "" : "s"}; the expected output has ${el.length}. Each print( ) makes one line.`;
  const i = el.findIndex((l, k) => l !== gl[k]);
  return `Line ${i + 1} differs. Expected "${el[i]}" but got "${gl[i]}".`;
}
