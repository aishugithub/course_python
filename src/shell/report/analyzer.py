# Reads a student's mini-project code with Python's own parser (ast) and lists
# where each course concept appears. Runs in the browser with Pyodide
# (analyzer.js); the report uses it only to CHECK the lines a student tagged and
# to hint at things they may have missed. It never tags anything for them.
#
# Input: FILES = [{"id": ..., "name": ..., "code": ...}, ...]
# Output (JSON): {"found": {fileId: {conceptId: [[line, endLine, label], ...]}},
#                 "errors": [{"file", "line", "msg"}], "classes": {...}, "customExceptions": [...]}
import ast
import json

ARITH = (ast.Add, ast.Sub, ast.Mult, ast.Div, ast.FloorDiv, ast.Mod, ast.Pow)
LIST_METHODS = {"append", "extend", "insert", "pop", "remove", "sort", "reverse", "index", "count"}
DICT_METHODS = {"items", "keys", "values", "get", "setdefault", "update"}
FILE_METHODS = {"write", "read", "readlines", "readline", "writelines"}
PD_READERS = {"read_csv", "read_excel", "read_json", "read_table"}
PD_WRITERS = {"to_csv", "to_excel", "to_json"}
FRAME_METHODS = {"head", "tail", "describe", "groupby", "sort_values", "query", "value_counts",
                 "mean", "max", "min", "sum", "count", "median", "info", "drop", "dropna", "agg", "filter", "nlargest", "nsmallest"}
FRAME_ATTRS = {"shape", "loc", "iloc", "columns", "dtypes", "index"}
BUILTIN_EXC_HINT = ("Exception", "Error", "BaseException")


def base_name(node):
    if isinstance(node, ast.Name):
        return node.id
    if isinstance(node, ast.Attribute):
        return node.attr
    return None


def call_name(node):
    """'open', 'pd.read_csv' -> ('pd', 'read_csv'), etc."""
    f = node.func
    if isinstance(f, ast.Name):
        return None, f.id
    if isinstance(f, ast.Attribute):
        v = f.value
        owner = v.id if isinstance(v, ast.Name) else None
        return owner, f.attr
    return None, None


def clean_source(code):
    # Colab lines like "!pip install x" or "%matplotlib inline" aren't Python;
    # blank them out but keep the line count so line numbers still match.
    out = []
    for ln in code.split("\n"):
        s = ln.lstrip()
        out.append("" if s.startswith("!") or s.startswith("%") else ln)
    return "\n".join(out)


def analyse(files):
    trees, errors, sources = {}, [], {}
    for f in files:
        src = clean_source(f.get("code") or "")
        sources[f["id"]] = src.split("\n")
        if not src.strip():
            continue
        try:
            trees[f["id"]] = ast.parse(src)
        except SyntaxError as e:
            errors.append({"file": f["id"], "line": e.lineno or 0, "msg": e.msg or "syntax error"})

    # Pass 1: classes, their bases and methods; import aliases.
    classes = {}
    aliases = {"pandas": set(), "plt": set(), "sns": set(), "csv": set(), "json": set()}
    for fid, tree in trees.items():
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                classes[node.name] = {
                    "file": fid, "line": node.lineno,
                    "bases": [b for b in (base_name(x) for x in node.bases) if b],
                    "methods": [n.name for n in node.body if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef))],
                }
            elif isinstance(node, ast.Import):
                for a in node.names:
                    name, asname = a.name, a.asname or a.name
                    if name == "pandas":
                        aliases["pandas"].add(asname)
                    elif name == "matplotlib.pyplot":
                        aliases["plt"].add(a.asname or "matplotlib")
                    elif name == "seaborn":
                        aliases["sns"].add(asname)
                    elif name in ("csv", "json"):
                        aliases[name].add(asname)
            elif isinstance(node, ast.ImportFrom):
                if node.module == "matplotlib":
                    for a in node.names:
                        if a.name == "pyplot":
                            aliases["plt"].add(a.asname or "pyplot")

    # Which classes are exceptions (directly or through another project class)?
    custom_exc = set()
    changed = True
    while changed:
        changed = False
        for name, info in classes.items():
            if name in custom_exc:
                continue
            if any(b in custom_exc or b.endswith(BUILTIN_EXC_HINT) for b in info["bases"]):
                custom_exc.add(name)
                changed = True

    def ancestors(name, seen=None):
        seen = seen or set()
        for b in classes.get(name, {}).get("bases", []):
            if b in classes and b not in seen:
                seen.add(b)
                ancestors(b, seen)
        return seen

    method_owners = {}
    for name, info in classes.items():
        for m in info["methods"]:
            method_owners.setdefault(m, set()).add(name)

    pandas_on = bool(aliases["pandas"])
    found = {}

    def add(fid, cid, node, label="", end=None):
        line = getattr(node, "lineno", None)
        if line is None:
            return
        last = end or getattr(node, "end_lineno", None) or line
        found.setdefault(fid, {}).setdefault(cid, []).append([line, last, label])

    # Pass 2: every concept, file by file.
    for fid, tree in trees.items():
        src_lines = sources[fid]
        for parent in ast.walk(tree):
            for child in ast.iter_child_nodes(parent):
                child._parent = parent

        for node in ast.walk(tree):
            # Exp 1
            if isinstance(node, ast.Call):
                owner, name = call_name(node)
                if owner is None and name in ("int", "float") and node.args and isinstance(node.args[0], ast.Call) \
                        and call_name(node.args[0]) == (None, "input"):
                    add(fid, "input_conv", node, name + "(input(...))")
            if isinstance(node, ast.BinOp) and isinstance(node.op, ARITH):
                add(fid, "arith", node)
            if isinstance(node, ast.AugAssign) and isinstance(node.op, ARITH):
                add(fid, "arith", node)
            if isinstance(node, (ast.Compare, ast.BoolOp)) or (isinstance(node, ast.UnaryOp) and isinstance(node.op, ast.Not)):
                add(fid, "compare", node)
            if isinstance(node, ast.If) and not (isinstance(getattr(node, "_parent", None), ast.If) and node in getattr(node._parent, "orelse", [])):
                add(fid, "decision", node, "if")
            if isinstance(node, ast.IfExp):
                add(fid, "decision", node, "if ... else")

            # Exp 2
            if isinstance(node, (ast.For, ast.AsyncFor)):
                add(fid, "for_loop", node, "for")
            if isinstance(node, ast.comprehension):
                holder = getattr(node, "_parent", None)
                if holder is not None:
                    add(fid, "for_loop", holder, "for in a comprehension")
            if isinstance(node, ast.While):
                add(fid, "while_loop", node, "while")
            if isinstance(node, (ast.List, ast.ListComp)):
                add(fid, "list", node)
            if isinstance(node, (ast.Dict, ast.DictComp)):
                add(fid, "dict", node)
            if isinstance(node, ast.Call):
                owner, name = call_name(node)
                if owner is None and name == "list":
                    add(fid, "list", node)
                if owner is None and name == "dict":
                    add(fid, "dict", node)
                if isinstance(node.func, ast.Attribute) and node.func.attr in LIST_METHODS:
                    add(fid, "list", node, node.func.attr)
                if isinstance(node.func, ast.Attribute) and node.func.attr in DICT_METHODS:
                    add(fid, "dict", node, node.func.attr)
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                if any(isinstance(n, ast.Return) and n.value is not None for n in ast.walk(node)):
                    add(fid, "function", node, node.name)
            if isinstance(node, (ast.Import, ast.ImportFrom)):
                add(fid, "module", node, ", ".join(a.name for a in node.names))

            # Exp 3 and 4
            if isinstance(node, ast.ClassDef):
                info = classes.get(node.name, {})
                project_bases = [b for b in info.get("bases", []) if b != "object"]
                if node.name in custom_exc:
                    add(fid, "custom_exc", node, "defines " + node.name, end=node.lineno)
                else:
                    add(fid, "class", node, node.name)
                    if project_bases:
                        add(fid, "subclass", node, node.name + "(" + ", ".join(project_bases) + ")", end=node.lineno)
                    for item in node.body:
                        if isinstance(item, (ast.FunctionDef, ast.AsyncFunctionDef)):
                            owners = [a for a in ancestors(node.name) if item.name in classes[a]["methods"]]
                            if owners:
                                add(fid, "override_poly", item, node.name + "." + item.name + " overrides " + owners[0] + "." + item.name)
            if isinstance(node, ast.Call):
                owner, name = call_name(node)
                if owner is None and name in classes and name not in custom_exc:
                    add(fid, "object", node, name + "(...)")
                if isinstance(node.func, ast.Attribute):
                    m = node.func.attr
                    owners = method_owners.get(m, set())
                    made_here = isinstance(node.func.value, ast.Call)
                    if len(owners) >= 2 and not made_here and not m.startswith("__"):
                        add(fid, "override_poly", node, m + "() is defined in " + ", ".join(sorted(owners)))
            if isinstance(node, ast.Attribute) and node.attr.startswith("__") and not node.attr.endswith("__"):
                add(fid, "private", node, node.attr)
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                decos = [base_name(d) for d in node.decorator_list] + [getattr(d, "attr", None) for d in node.decorator_list]
                if node.name.startswith(("get_", "set_")) or "property" in decos or "setter" in decos:
                    add(fid, "private", node, node.name)

            # Exp 5 and 6
            if isinstance(node, ast.Call):
                owner, name = call_name(node)
                if owner is None and name == "open":
                    add(fid, "file", node, "open")
                elif owner in aliases["csv"] or (owner == "csv"):
                    add(fid, "file", node, "csv." + str(name))
                elif (owner in aliases["json"] or owner == "json") and name in ("load", "dump"):
                    add(fid, "file", node, "json." + name)
                elif name in PD_READERS or name in PD_WRITERS:
                    add(fid, "file", node, name)
                elif isinstance(node.func, ast.Attribute) and name in FILE_METHODS:
                    add(fid, "file", node, name)
                elif name in ("write_text", "read_text"):
                    add(fid, "file", node, name)
            if isinstance(node, (ast.With, ast.AsyncWith)):
                for item in node.items:
                    e = item.context_expr
                    if isinstance(e, ast.Call) and call_name(e) == (None, "open"):
                        add(fid, "file", node, "with open")

            # Exp 7 and 8
            if isinstance(node, ast.Try) or type(node).__name__ == "TryStar":
                add(fid, "try", node, "try")
                typed = 0
                for h in node.handlers:
                    if isinstance(h.type, ast.Tuple):
                        typed += len(h.type.elts)
                    elif h.type is not None:
                        typed += 1
                if typed >= 2:
                    first = node.handlers[0]
                    add(fid, "multi_except", first, str(typed) + " exception types", end=node.handlers[-1].end_lineno)
                if node.finalbody:
                    start = node.finalbody[0].lineno
                    for ln in range(start - 1, max(0, node.lineno) - 1, -1):
                        if src_lines[ln - 1].strip().startswith("finally"):
                            start = ln
                            break
                    add(fid, "finally", node.finalbody[0], "finally", end=node.finalbody[-1].end_lineno)
                    found[fid]["finally"][-1][0] = start
                for h in node.handlers:
                    names = []
                    if isinstance(h.type, ast.Tuple):
                        names = [base_name(x) for x in h.type.elts]
                    elif h.type is not None:
                        names = [base_name(h.type)]
                    for n in names:
                        if n in custom_exc:
                            add(fid, "custom_exc", h, "catches " + n)
            if isinstance(node, ast.Raise):
                add(fid, "raise", node, "raise")
                exc = node.exc
                target = base_name(exc.func) if isinstance(exc, ast.Call) else base_name(exc) if exc is not None else None
                if target in custom_exc:
                    add(fid, "custom_exc", node, "raises " + target)

            # Exp 9 and 10
            if isinstance(node, ast.Call):
                owner, name = call_name(node)
                if owner in aliases["pandas"] and (name in ("DataFrame", "Series") or name in PD_READERS):
                    add(fid, "dataframe", node, owner + "." + name)
                if pandas_on and isinstance(node.func, ast.Attribute) and name in FRAME_METHODS and owner not in aliases["pandas"]:
                    add(fid, "select_filter", node, name + "()")
                if owner in aliases["plt"]:
                    add(fid, "matplotlib", node, owner + "." + name)
                elif isinstance(node.func, ast.Attribute) and name == "plot" and pandas_on:
                    add(fid, "matplotlib", node, ".plot()")
                if owner in aliases["sns"]:
                    add(fid, "seaborn", node, owner + "." + name)
            if pandas_on and isinstance(node, ast.Subscript):
                sl = node.slice
                if (isinstance(sl, ast.Constant) and isinstance(sl.value, str)) or isinstance(sl, (ast.Compare, ast.BoolOp)) \
                        or (isinstance(sl, ast.BinOp) and isinstance(sl.op, (ast.BitAnd, ast.BitOr))) \
                        or (isinstance(sl, ast.List) and all(isinstance(e, ast.Constant) and isinstance(e.value, str) for e in sl.elts)):
                    add(fid, "select_filter", node, "selects data")
            if pandas_on and isinstance(node, ast.Attribute) and node.attr in FRAME_ATTRS:
                add(fid, "select_filter", node, "." + node.attr)

    return {
        "found": found,
        "errors": errors,
        "classes": {k: {"file": v["file"], "line": v["line"], "bases": v["bases"]} for k, v in classes.items()},
        "customExceptions": sorted(custom_exc),
    }


RESULT = json.dumps(analyse(FILES))
