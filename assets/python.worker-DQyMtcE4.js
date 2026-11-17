(function(){"use strict";const i="https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";importScripts(i+"pyodide.js");const l=String.raw`
import sys, io, ast, json, traceback, base64, warnings
warnings.filterwarnings("ignore")   # e.g. pandas' pyarrow notice would pollute output checks
sys.dont_write_bytecode = True      # modules written by a test's setup must never load from a stale .pyc
_fh_html = []

class _FhOut(io.StringIO):
    LIMIT = 20000
    def write(self, s):
        if self.tell() + len(s) > self.LIMIT:
            super().write(s[: max(0, self.LIMIT - self.tell())])
            raise RuntimeError("__FH_TOO_MUCH_OUTPUT__")
        return super().write(s)

class _FhNoInput(Exception):
    pass

def _fh_snapshot(g):
    snap = {}
    for k, v in g.items():
        if k.startswith("_") or k in ("input",):
            continue
        if isinstance(v, (int, float, str, bool, list, tuple, dict, set, type(None))):
            try:
                snap[k] = {"type": type(v).__name__, "repr": repr(v)[:300]}
            except Exception:
                pass
    return snap

def _fh_static(src, requires, forbids):
    # requires / forbids: list of {"node": "For"} | {"call": "print", "min": 2} | {"text": "#"} | {"msg": ...}
    problems = []
    try:
        tree = ast.parse(src)
    except SyntaxError:
        return problems
    nodes = list(ast.walk(tree))
    def count(rule):
        if "node" in rule:
            return sum(1 for n in nodes if type(n).__name__ == rule["node"])
        if "call" in rule:
            c = 0
            for n in nodes:
                if isinstance(n, ast.Call):
                    f = n.func
                    name = f.id if isinstance(f, ast.Name) else (f.attr if isinstance(f, ast.Attribute) else None)
                    if name == rule["call"]:
                        c += 1
            return c
        if "name" in rule:
            return sum(1 for n in nodes if isinstance(n, ast.Name) and n.id == rule["name"])
        if "text" in rule:
            return src.count(rule["text"])
        if "constant" in rule:
            return sum(1 for n in nodes if isinstance(n, ast.Constant) and repr(n.value) == rule["constant"])
        return 0
    NAMES = {"For": "a for loop", "While": "a while loop", "If": "an if statement", "Break": "break",
             "Continue": "continue", "FunctionDef": "a function (def)", "Return": "return",
             "BoolOp": "and / or", "Compare": "a comparison", "BinOp": "a calculation",
             "AugAssign": "+= / -=", "JoinedStr": "an f-string", "IfExp": "the one-line if/else",
             "ClassDef": "a class", "Try": "try / except", "With": "with", "ListComp": "a list comprehension"}
    def describe(r):
        n = r.get("min", 1)
        if "node" in r:
            what = NAMES.get(r["node"], r["node"])
        elif "call" in r:
            what = r["call"] + "( )"
        elif "name" in r:
            what = "the variable " + r["name"]
        else:
            what = repr(r.get("text", r.get("constant", "")))
        return f"This exercise needs {what}" + (f" (at least {n} times)." if n > 1 else ".")
    for r in requires or []:
        if count(r) < r.get("min", 1):
            problems.append(r.get("msg") or describe(r))
    for r in forbids or []:
        if count(r) > r.get("max", 0):
            problems.append(r.get("msg", "Uses something this exercise does not allow."))
    return problems

def _fh_run(src, inputs, post, requires, forbids, setup="", seed=None):
    out = _FhOut()
    feed = list(inputs or [])
    used = [0]
    echo = []   # [start, end] positions in the output of each input typed in for the learner
    def fake_input(prompt=""):
        out.write(str(prompt))
        if not feed:
            raise _FhNoInput()
        v = feed.pop(0)
        used[0] += 1
        a = out.tell()
        out.write(str(v) + "\n")
        echo.append([a, a + len(str(v))])
        return str(v)
    # _fh_shown(): how many plotly figures the program displayed (for post checks)
    g = {"__name__": "__main__", "input": fake_input, "_fh_shown": lambda: len(_fh_html)}
    err = None
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout = sys.stderr = out
    try:
        if "random" in sys.modules:
            # a previous test's setup may have patched random.randint — start clean
            import importlib
            importlib.reload(sys.modules["random"])
        if seed is not None:
            # Run is interactive: the program is run again from the top each time the
            # learner answers an input(). A fixed seed keeps its random numbers the
            # same across those re-runs (the secret number must not change mid-game).
            import random as _fh_random
            _fh_random.seed(seed)
            if "numpy" in sys.modules:
                sys.modules["numpy"].random.seed(seed)
        if setup:
            # e.g. fix random.randint so a test knows the "secret" number
            exec(setup, {"__name__": "__fh_setup__"})
        _fh_html.clear()
        if "plotly" in src:
            try:
                import plotly.basedatatypes as _pb
                _pb.BaseFigure.show = lambda self, *a, **k: _fh_html.append(self.to_html(include_plotlyjs="cdn", full_html=True))
            except Exception:
                pass
        code = compile(src, "main.py", "exec")
        exec(code, g)
    except SyntaxError as e:
        err = {"type": type(e).__name__, "msg": e.msg, "line": e.lineno, "col": e.offset,
               "text": (e.text or "").rstrip("\n")}
    except _FhNoInput:
        err = {"type": "NeedsInput", "msg": "input() was called but no more input was provided", "line": None}
    except BaseException as e:
        line = None
        for fr in traceback.extract_tb(e.__traceback__):
            if fr.filename == "main.py":
                line = fr.lineno
        msg = str(e)
        if msg == "__FH_TOO_MUCH_OUTPUT__":
            err = {"type": "TooMuchOutput", "msg": "Output limit reached", "line": line}
        else:
            err = {"type": type(e).__name__, "msg": msg, "line": line}
    finally:
        sys.stdout, sys.stderr = old_out, old_err

    post_problems = []
    if post and err is None:
        try:
            exec(post, g)
        except AssertionError as e:
            post_problems.append(str(e) or "A check on your variables failed.")
        except Exception as e:
            post_problems.append(type(e).__name__ + ": " + str(e))

    images = []
    if "matplotlib.pyplot" in sys.modules:
        plt = sys.modules["matplotlib.pyplot"]
        for num in plt.get_fignums():
            buf = io.BytesIO()
            plt.figure(num).savefig(buf, format="png", dpi=90, bbox_inches="tight")
            images.append(base64.b64encode(buf.getvalue()).decode())
        plt.close("all")

    return json.dumps({
        "stdout": out.getvalue(),
        "echo": echo,
        "error": err,
        "unusedInputs": len(feed),
        "static": _fh_static(src, requires, forbids),
        "post": post_problems,
        "vars": _fh_snapshot(g),
        "images": images,
        "html": list(_fh_html),
    })
`;let e=null;const u=(async()=>{e=await loadPyodide({indexURL:i}),e.runPython(l),postMessage({type:"ready"})})().catch(n=>postMessage({type:"loadError",message:String(n)}));self.onmessage=async n=>{const{id:s,code:t,inputs:m=[],post:d="",requires:f=[],forbids:c=[],setup:_="",seed:h=null}=n.data;try{if(await u,!e)throw new Error("Python failed to load");if(/^\s*(import|from)\s+(numpy|pandas|matplotlib|seaborn|plotly)/m.test(t)){postMessage({id:s,type:"loadingPackages"}),await e.loadPackagesFromImports(t);const a=["seaborn","plotly"].filter(o=>new RegExp(`^\\s*(import|from)\\s+${o}`,"m").test(t));if(a.length){await e.loadPackage(["micropip","pandas","matplotlib"]);const o=e.pyimport("micropip");for(const p of a)try{e.pyimport(p)}catch{await o.install(p)}}/matplotlib|seaborn/.test(t)&&e.runPython(`import matplotlib
matplotlib.use('Agg')`)}postMessage({id:s,type:"started"});const r=e.globals.get("_fh_run"),y=r(t,e.toPy(m),d,e.toPy(f),e.toPy(c),_,h);r.destroy(),postMessage({id:s,type:"result",...JSON.parse(y)})}catch(r){postMessage({id:s,type:"result",stdout:"",error:{type:"RunnerError",msg:String(r)},static:[],post:[],vars:{},images:[]})}}})();
