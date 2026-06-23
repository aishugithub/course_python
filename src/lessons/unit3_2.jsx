import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0D1117", surface: "#161B22", card: "#1C2333",
  accent: "#58A6FF", accentGlow: "#1F6FEB",
  green: "#3FB950", yellow: "#D29922", purple: "#BC8CFF",
  red: "#F85149", orange: "#F0883E", teal: "#39D0D8", pink: "#FF7B9C",
  text: "#E6EDF3", muted: "#8B949E", border: "#30363D",
};

// ── Live Interpreter Analogy ───────────────────────────────────────────────
function LiveInterpreterAnalogy() {
  const [step, setStep] = useState(0);

  const story = [
    {
      icon: "🎤",
      color: C.accent,
      title: "Imagine a UN Conference",
      content: "A Tamil politician is giving a speech at the United Nations. The audience speaks English. Instead of translating the whole speech beforehand into a booklet, a live interpreter sits in a booth — listening and translating each sentence in real time as the speaker talks.",
      left: { icon: "🎤", label: "Tamil Speaker", color: C.purple },
      middle: { icon: "🎧", label: "Live Interpreter", color: C.yellow },
      right: { icon: "👂", label: "English Audience", color: C.accent },
    },
    {
      icon: "⚡",
      color: C.yellow,
      title: "Sentence by Sentence",
      content: "The interpreter doesn't wait for the full speech to finish. Each sentence is translated immediately as it's spoken. The audience hears it almost simultaneously. But if the speaker makes an error mid-sentence, it stops right there.",
      left: { icon: "🗣️", label: "Statement 1", color: C.accent },
      middle: { icon: "🔄", label: "Translate NOW", color: C.yellow },
      right: { icon: "✅", label: "Execute NOW", color: C.green },
    },
    {
      icon: "🐍",
      color: C.green,
      title: "This is Exactly How Python Works",
      content: "Python's interpreter reads your code one line at a time. It translates that line to machine instructions and executes it immediately — before reading the next line. No waiting. No separate compilation step. Just write and run.",
      left: { icon: "📝", label: "Python Code", color: C.purple },
      middle: { icon: "🐍", label: "Python Interpreter", color: C.green },
      right: { icon: "⚡", label: "Immediate Output", color: C.teal },
    },
  ];

  const s = story[step];
  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Interpretation is the opposite approach from compilation. Instead of translating everything first, the interpreter translates and executes <strong style={{ color: C.accent }}>one line at a time</strong>, live.
      </p>

      <div style={{
        background: s.color + "18", border: `1.5px solid ${s.color}55`,
        borderRadius: 12, padding: "18px 16px", marginBottom: 16, transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 32 }}>{s.icon}</span>
          <div style={{ color: s.color, fontWeight: 700, fontSize: 15 }}>{s.title}</div>
        </div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>{s.content}</div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          {[s.left, s.middle, s.right].map((node, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                background: node.color + "22", border: `1.5px solid ${node.color}55`,
                borderRadius: 10, padding: "12px 16px", textAlign: "center", minWidth: 90,
              }}>
                <div style={{ fontSize: 28 }}>{node.icon}</div>
                <div style={{ color: node.color, fontSize: 11, fontWeight: 600, marginTop: 4 }}>{node.label}</div>
              </div>
              {i < 2 && <div style={{ color: C.muted, fontSize: 20 }}>→</div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{
          padding: "9px 20px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: step === 0 ? C.border : C.text,
          cursor: step === 0 ? "not-allowed" : "pointer", fontSize: 13,
        }}>← Back</button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {story.map((_, i) => (
            <div key={i} onClick={() => setStep(i)} style={{
              width: i === step ? 20 : 8, height: 8, borderRadius: 4,
              background: i === step ? s.color : C.border,
              cursor: "pointer", transition: "all 0.25s",
            }} />
          ))}
        </div>
        <button onClick={() => setStep(s => Math.min(story.length - 1, s + 1))} disabled={step === story.length - 1} style={{
          padding: "9px 20px", borderRadius: 8, border: "none",
          background: step === story.length - 1 ? C.border : C.accentGlow,
          color: "#fff", cursor: step === story.length - 1 ? "not-allowed" : "pointer",
          fontSize: 13, fontWeight: 600,
        }}>Next →</button>
      </div>
    </div>
  );
}

// ── Live Python REPL Simulator ─────────────────────────────────────────────
function REPLSimulator() {
  const [history, setHistory] = useState([
    { type: "info", text: "Python 3.12 Interpreter — type a command and press Enter" },
  ]);
  const [input, setInput] = useState("");
  const [variables, setVariables] = useState({});
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const suggestions = [
    'print("Hello, World!")',
    'x = 10',
    'y = 5',
    'print(x + y)',
    'print("Python" * 3)',
    'name = "Aishu"',
    'print("Hello, " + name)',
  ];

  const evaluate = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: "input", text: `>>> ${trimmed}` }];

    try {
      // Simple safe evaluations
      // Assignment
      const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
      if (assignMatch && !trimmed.startsWith("print")) {
        const [, varName, valExpr] = assignMatch;
        let val = evalExpr(valExpr, variables);
        const newVars = { ...variables, [varName]: val };
        setVariables(newVars);
        newHistory.push({ type: "output", text: `✓ ${varName} = ${JSON.stringify(val)}` });
        setHistory(newHistory);
        setInput("");
        return;
      }

      // print()
      const printMatch = trimmed.match(/^print\((.+)\)$/);
      if (printMatch) {
        const inner = printMatch[1].trim();
        let result = evalExpr(inner, variables);
        newHistory.push({ type: "output", text: String(result) });
        setHistory(newHistory);
        setInput("");
        return;
      }

      // Expression
      let result = evalExpr(trimmed, variables);
      if (result !== undefined) {
        newHistory.push({ type: "output", text: String(result) });
      }
    } catch (e) {
      newHistory.push({ type: "error", text: `SyntaxError: ${e.message || "invalid syntax"}` });
    }

    setHistory(newHistory);
    setInput("");
  };

  const evalExpr = (expr, vars) => {
    // String literals
    const strMatch = expr.match(/^["'](.*)["']$/);
    if (strMatch) return strMatch[1];

    // String repetition: "x" * n
    const strRepeat = expr.match(/^(["'].+["'])\s*\*\s*(\d+)$/);
    if (strRepeat) {
      const str = strRepeat[1].replace(/^["']|["']$/g, "");
      return str.repeat(parseInt(strRepeat[2]));
    }

    // String concat with variable: "..." + varName
    const strConcat = expr.match(/^(["'].+["'])\s*\+\s*([a-zA-Z_]\w*)$/);
    if (strConcat) {
      const str = strConcat[1].replace(/^["']|["']$/g, "");
      const varVal = vars[strConcat[2]];
      if (varVal === undefined) throw new Error(`name '${strConcat[2]}' is not defined`);
      return str + varVal;
    }

    // Number
    if (!isNaN(expr)) return Number(expr);

    // Variable lookup
    if (/^[a-zA-Z_]\w*$/.test(expr)) {
      if (vars[expr] !== undefined) return vars[expr];
      throw new Error(`name '${expr}' is not defined`);
    }

    // Arithmetic: handle a + b, a - b, a * b, a / b
    const arithMatch = expr.match(/^(.+?)\s*([+\-*/])\s*(.+)$/);
    if (arithMatch) {
      const left = evalExpr(arithMatch[1].trim(), vars);
      const op = arithMatch[2];
      const right = evalExpr(arithMatch[3].trim(), vars);
      if (typeof left === "number" && typeof right === "number") {
        if (op === "+") return left + right;
        if (op === "-") return left - right;
        if (op === "*") return left * right;
        if (op === "/") return left / right;
      }
      if (op === "+" && typeof left === "string") return left + right;
    }

    throw new Error("invalid syntax");
  };

  const clear = () => {
    setHistory([{ type: "info", text: "Python 3.12 Interpreter — cleared. Start fresh!" }]);
    setVariables({});
    setInput("");
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 8, lineHeight: 1.7 }}>
        The Python <strong style={{ color: C.accent }}>REPL</strong> (Read-Eval-Print-Loop) is the purest form of interpretation — type a line, press Enter, see the result <em>immediately</em>. Try it below!
      </p>

      {/* Suggestions */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => setInput(s)} style={{
            padding: "4px 10px", borderRadius: 20, fontSize: 11,
            background: C.card, border: `1px solid ${C.border}`,
            color: C.accent, cursor: "pointer", fontFamily: "monospace",
          }}>{s}</button>
        ))}
      </div>

      {/* Terminal */}
      <div style={{
        background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10,
        overflow: "hidden", marginBottom: 10,
      }}>
        <div style={{ background: C.surface, padding: "8px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.red }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.yellow }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.green }} />
          <span style={{ color: C.muted, fontSize: 11, marginLeft: 6 }}>Python REPL</span>
          <button onClick={clear} style={{ marginLeft: "auto", background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: 11 }}>Clear</button>
        </div>
        <div style={{ padding: "12px 14px", minHeight: 180, maxHeight: 260, overflowY: "auto" }}>
          {history.map((h, i) => (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: 12, marginBottom: 4, lineHeight: 1.6,
              color: h.type === "input" ? C.accent : h.type === "error" ? C.red : h.type === "info" ? C.muted : C.green,
            }}>{h.text}</div>
          ))}
          <div ref={endRef} />
        </div>
        <div style={{ display: "flex", gap: 0, borderTop: `1px solid ${C.border}` }}>
          <span style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 13, color: C.accent }}>{">>>"}</span>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && evaluate(input)}
            placeholder="type Python code and press Enter…"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontFamily: "monospace", fontSize: 13, color: C.text, padding: "10px 0",
            }}
          />
          <button onClick={() => evaluate(input)} style={{
            padding: "10px 16px", background: C.accentGlow, border: "none",
            color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 12,
          }}>Run</button>
        </div>
      </div>

      {Object.keys(variables).length > 0 && (
        <div style={{ background: C.card, borderRadius: 8, padding: "10px 14px", border: `1px solid ${C.border}`, fontSize: 12 }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 6 }}>MEMORY (current variables)</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(variables).map(([k, v]) => (
              <div key={k} style={{
                background: C.purple + "22", border: `1px solid ${C.purple}44`,
                borderRadius: 6, padding: "4px 10px",
              }}>
                <span style={{ color: C.purple, fontWeight: 700 }}>{k}</span>
                <span style={{ color: C.muted }}> = </span>
                <span style={{ color: C.yellow }}>{JSON.stringify(v)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Compiler vs Interpreter Side by Side ──────────────────────────────────
function CompileVsInterpret() {
  const [running, setRunning] = useState(null); // null | "compile" | "interpret"
  const [compileStep, setCompileStep] = useState(-1);
  const [interpStep, setInterpStep] = useState(-1);

  const code = [
    'x = 10',
    'y = 5',
    'result = x + y',
    'print(result)',  // error on next line to show difference
    'print("Done")',
  ];

  const runCompile = () => {
    setRunning("compile");
    setCompileStep(-1);
    setInterpStep(-1);
    // Simulate: read all, then execute all
    setTimeout(() => setCompileStep(0), 300);
    setTimeout(() => setCompileStep(1), 600);
    setTimeout(() => setCompileStep(2), 900);
    setTimeout(() => setCompileStep(3), 1200);
    setTimeout(() => setCompileStep(4), 1500);
    setTimeout(() => setCompileStep(5), 2200); // "compile done, now execute"
    setTimeout(() => setRunning(null), 2800);
  };

  const runInterpret = () => {
    setRunning("interpret");
    setCompileStep(-1);
    setInterpStep(-1);
    code.forEach((_, i) => {
      setTimeout(() => setInterpStep(i), i * 700 + 300);
    });
    setTimeout(() => setRunning(null), code.length * 700 + 600);
  };

  const reset = () => {
    setCompileStep(-1);
    setInterpStep(-1);
    setRunning(null);
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Watch the same program processed by a <strong style={{ color: C.orange }}>compiler</strong> vs an <strong style={{ color: C.purple }}>interpreter</strong>. Notice the fundamental difference in <em>when</em> each line is read and executed.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        {/* Compiler side */}
        <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ background: C.orange + "22", padding: "10px 14px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ color: C.orange, fontWeight: 700, fontSize: 13 }}>⚙️ Compiler</div>
            <div style={{ color: C.muted, fontSize: 10 }}>Reads ALL first, then runs</div>
          </div>
          <div style={{ padding: "10px" }}>
            <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 6 }}>PASS 1 — READ ALL</div>
            {code.map((line, i) => (
              <div key={i} style={{
                fontFamily: "monospace", fontSize: 11, padding: "4px 8px", borderRadius: 4, marginBottom: 3,
                background: compileStep >= i && compileStep < 5 ? C.orange + "22" : "transparent",
                color: compileStep >= i && compileStep < 5 ? C.orange : C.muted,
                border: compileStep === i ? `1px solid ${C.orange}55` : "1px solid transparent",
                transition: "all 0.3s",
              }}>{line}</div>
            ))}
            {compileStep >= 5 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, marginBottom: 6 }}>PASS 2 — EXECUTE ALL</div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: C.green, lineHeight: 1.8 }}>
                  {"> 15\n> Done"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interpreter side */}
        <div style={{ background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ background: C.purple + "22", padding: "10px 14px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ color: C.purple, fontWeight: 700, fontSize: 13 }}>🐍 Interpreter</div>
            <div style={{ color: C.muted, fontSize: 10 }}>Read one line → run it → repeat</div>
          </div>
          <div style={{ padding: "10px" }}>
            {code.map((line, i) => (
              <div key={i} style={{
                fontFamily: "monospace", fontSize: 11, padding: "4px 8px", borderRadius: 4, marginBottom: 3,
                background: interpStep === i ? C.purple + "33" : interpStep > i ? C.green + "12" : "transparent",
                color: interpStep === i ? C.purple : interpStep > i ? C.green : C.muted,
                border: interpStep === i ? `1px solid ${C.purple}55` : "1px solid transparent",
                transition: "all 0.3s",
              }}>
                {interpStep > i && "✓ "}{line}
                {interpStep === i && <span style={{ color: C.teal, marginLeft: 8 }}>← executing now</span>}
              </div>
            ))}
            {interpStep >= 3 && (
              <div style={{ marginTop: 6, fontFamily: "monospace", fontSize: 11, color: C.green }}>
                {interpStep >= 3 && "> 15\n"}{interpStep >= 4 && "> Done"}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={runCompile} disabled={running !== null} style={{
          flex: 1, padding: "10px", borderRadius: 8, border: "none",
          background: running ? C.border : C.orange,
          color: running ? C.muted : C.bg, fontWeight: 700, fontSize: 13,
          cursor: running ? "not-allowed" : "pointer",
        }}>▶ Run as Compiler</button>
        <button onClick={runInterpret} disabled={running !== null} style={{
          flex: 1, padding: "10px", borderRadius: 8, border: "none",
          background: running ? C.border : C.purple,
          color: "#fff", fontWeight: 700, fontSize: 13,
          cursor: running ? "not-allowed" : "pointer",
        }}>▶ Run as Interpreter</button>
        <button onClick={reset} style={{
          padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
          background: "transparent", color: C.muted, cursor: "pointer", fontSize: 13,
        }}>↺</button>
      </div>

      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: C.orange + "18", border: `1px solid ${C.orange}44`, borderRadius: 8, padding: "10px 12px", fontSize: 12 }}>
          <div style={{ color: C.orange, fontWeight: 700, marginBottom: 4 }}>Compiler strategy</div>
          <div style={{ color: C.muted }}>Read everything → translate all → produce .exe → run .exe</div>
        </div>
        <div style={{ background: C.purple + "18", border: `1px solid ${C.purple}44`, borderRadius: 8, padding: "10px 12px", fontSize: 12 }}>
          <div style={{ color: C.purple, fontWeight: 700, marginBottom: 4 }}>Interpreter strategy</div>
          <div style={{ color: C.muted }}>Read line 1 → translate → execute → read line 2 → repeat</div>
        </div>
      </div>
    </div>
  );
}

// ── Pros and Cons ──────────────────────────────────────────────────────────
function ProsAndCons() {
  const [view, setView] = useState("both");

  const data = {
    interpreter: {
      color: C.purple,
      icon: "🐍",
      label: "Interpreted (Python)",
      pros: [
        { icon: "⚡", text: "Instant feedback — run code immediately, no waiting for compilation" },
        { icon: "🐛", text: "Easier debugging — errors pinpoint the exact line that failed" },
        { icon: "🌍", text: "Highly portable — same .py file runs on any machine with Python installed" },
        { icon: "🔄", text: "Interactive — REPL lets you experiment line by line" },
        { icon: "🚀", text: "Faster to develop and prototype new ideas" },
      ],
      cons: [
        { icon: "🐌", text: "Slower at runtime — translation happens every single run" },
        { icon: "📦", text: "Requires the interpreter to be installed on the target machine" },
        { icon: "🔓", text: "Source code is visible — not ideal for proprietary software" },
      ],
    },
    compiler: {
      color: C.orange,
      icon: "⚙️",
      label: "Compiled (C / C++)",
      pros: [
        { icon: "🏎️", text: "Extremely fast at runtime — native machine code, no translation overhead" },
        { icon: "🔒", text: "Source code protected — users receive binary, not your source" },
        { icon: "📦", text: "Standalone — .exe runs without any runtime environment installed" },
        { icon: "🎯", text: "Full control over CPU and memory for performance-critical code" },
      ],
      cons: [
        { icon: "⏱️", text: "Compilation takes time before you can run and test" },
        { icon: "🖥️", text: "Platform specific — must recompile for each OS/CPU" },
        { icon: "🐛", text: "Harder to debug — errors in compiled code can be cryptic" },
        { icon: "📚", text: "Steeper learning curve — must manage memory manually" },
      ],
    },
  };

  return (
    <div>
      <p style={{ color: C.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.7 }}>
        Neither approach is universally better — each has strengths. Understanding the trade-offs helps you choose the right language for the right job.
      </p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {["both", "interpreter", "compiler"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            flex: 1, padding: "8px", borderRadius: 8,
            background: view === v ? C.accentGlow : C.card,
            border: `1px solid ${view === v ? C.accent : C.border}`,
            color: view === v ? "#fff" : C.muted,
            cursor: "pointer", fontSize: 12, fontWeight: view === v ? 600 : 400,
          }}>{v === "both" ? "Compare Both" : v === "interpreter" ? "🐍 Python" : "⚙️ Compiled"}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: view === "both" ? "1fr 1fr" : "1fr", gap: 12 }}>
        {(view === "both" || view === "interpreter") && (
          <div>
            <div style={{ color: data.interpreter.color, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
              {data.interpreter.icon} {data.interpreter.label}
            </div>
            <div style={{ marginBottom: 8 }}>
              {data.interpreter.pros.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: C.green }}>{p.icon}</span>
                  <span style={{ color: C.muted }}>{p.text}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
              {data.interpreter.cons.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: C.red }}>{p.icon}</span>
                  <span style={{ color: C.muted }}>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {(view === "both" || view === "compiler") && (
          <div>
            <div style={{ color: data.compiler.color, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
              {data.compiler.icon} {data.compiler.label}
            </div>
            <div style={{ marginBottom: 8 }}>
              {data.compiler.pros.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: C.green }}>{p.icon}</span>
                  <span style={{ color: C.muted }}>{p.text}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
              {data.compiler.cons.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: C.red }}>{p.icon}</span>
                  <span style={{ color: C.muted }}>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 14, background: C.yellow + "18", border: `1px solid ${C.yellow}44`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.muted }}>
        🔑 <strong style={{ color: C.yellow }}>Rule of thumb:</strong> Use interpreted languages (Python) for rapid development, AI, and scripting. Use compiled languages (C, C++) when maximum speed and hardware control matter.
      </div>
    </div>
  );
}

// ── Quiz ───────────────────────────────────────────────────────────────────
function Quiz({ onComplete }) {
  const questions = [
    {
      q: "How does an interpreter process code, compared to a compiler?",
      options: [
        "It reads all the code first, then runs it all at once",
        "It reads and executes one line at a time, immediately",
        "It converts code to Assembly before running",
        "It only works with machine code",
      ],
      answer: 1,
      explain: "An interpreter reads one line, translates it, executes it, then moves to the next line. No separate compilation step — the output is immediate.",
    },
    {
      q: "What is the Python REPL?",
      options: [
        "A compiled Python executable",
        "A text editor for Python files",
        "An interactive environment where Python executes each line you type immediately",
        "A Python library for building websites",
      ],
      answer: 2,
      explain: "REPL stands for Read-Eval-Print-Loop. You type a line, Python reads it, evaluates it, prints the result, and waits for the next line. It's the purest form of interpretation.",
    },
    {
      q: "Which is a key advantage of interpreted languages like Python over compiled ones?",
      options: [
        "They run much faster",
        "The source code is hidden from users",
        "No compilation step — you get instant feedback as you write code",
        "They produce standalone .exe files",
      ],
      answer: 2,
      explain: "The biggest practical advantage of interpretation is speed of development. You write a line, run it, see the result immediately — no compile-wait cycle.",
    },
    {
      q: "If your Python program has an error on line 7, when will you discover it?",
      options: [
        "Before the program starts — during a compilation phase",
        "When Python tries to execute line 7, after lines 1–6 have already run",
        "Python will skip line 7 and continue",
        "You will never know — Python silently ignores errors",
      ],
      answer: 1,
      explain: "Because Python interprets line by line, lines 1–6 execute successfully before hitting the error on line 7. A compiler would have caught it before running anything.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[current].answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current < questions.length - 1) { setCurrent(c => c + 1); setSelected(null); }
    else { setDone(true); onComplete && onComplete(); }
  };

  if (done) {
    const final = score + (selected === questions[current].answer ? 1 : 0);
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 52 }}>{final >= 3 ? "🎉" : "👍"}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginTop: 10 }}>You scored {final} / {questions.length}</div>
        <div style={{ color: C.muted, marginTop: 8 }}>
          {final === 4 ? "Perfect! You understand interpretation clearly." :
            final >= 2 ? "Good — try the REPL simulator again to feel the difference." :
              "Revisit the side-by-side comparison and try again."}
        </div>
        <div style={{ marginTop: 16, padding: "12px 20px", borderRadius: 8, background: C.green + "22", border: `1px solid ${C.green}`, color: C.green, fontWeight: 600 }}>
          Unit 3.2 Complete ✓
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Question {current + 1} of {questions.length}</div>
      <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 16 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.options.map((opt, i) => {
          let bg = C.card, border = C.border, col = C.text;
          if (selected !== null) {
            if (i === q.answer) { bg = C.green + "22"; border = C.green; col = C.green; }
            else if (i === selected) { bg = C.red + "22"; border = C.red; col = C.red; }
          }
          return (
            <button key={i} onClick={() => choose(i)} style={{
              textAlign: "left", padding: "10px 14px", borderRadius: 8,
              background: bg, border: `1.5px solid ${border}`, color: col,
              cursor: selected !== null ? "default" : "pointer", fontSize: 13, transition: "all 0.25s",
            }}>
              {i === q.answer && selected !== null ? "✓ " : i === selected && selected !== q.answer ? "✗ " : ""}{opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: C.purple + "18", border: `1px solid ${C.purple}44`, color: C.muted, fontSize: 13 }}>
          💡 {q.explain}
        </div>
      )}
      {selected !== null && (
        <button onClick={next} style={{
          marginTop: 14, padding: "10px 24px", borderRadius: 8,
          background: C.accentGlow, border: "none", color: "#fff",
          fontWeight: 600, cursor: "pointer", fontSize: 14,
        }}>{current < questions.length - 1 ? "Next Question →" : "See Results"}</button>
      )}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function Unit3_2() {
  const sections = [
    { id: "analogy", label: "Live Interpreter" },
    { id: "repl", label: "Try the REPL" },
    { id: "sidebyside", label: "Side by Side" },
    { id: "proscons", label: "Pros & Cons" },
    { id: "quiz", label: "Quick Quiz" },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState([]);

  const markComplete = (idx) => { if (!completed.includes(idx)) setCompleted(p => [...p, idx]); };
  const goNext = () => { markComplete(activeSection); setActiveSection(s => Math.min(sections.length - 1, s + 1)); };

  const content = [
    <LiveInterpreterAnalogy />,
    <REPLSimulator />,
    <CompileVsInterpret />,
    <ProsAndCons />,
    <Quiz onComplete={() => markComplete(4)} />,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text, paddingBottom: 40 }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐍</div>
        <div>
          <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>MODULE 3 › UNIT 3.2</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>What is Interpretation?</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.muted }}>{completed.length} / {sections.length} done</div>
      </div>

      <div style={{ height: 3, background: C.border }}>
        <div style={{ height: "100%", width: `${(completed.length / sections.length) * 100}%`, background: C.green, transition: "width 0.4s ease" }} />
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: C.surface, borderRadius: 10, padding: 4, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => setActiveSection(i)} style={{
              flex: 1, minWidth: 80, padding: "8px 6px", borderRadius: 7,
              background: activeSection === i ? C.accentGlow : "transparent",
              border: "none", color: activeSection === i ? "#fff" : C.muted,
              cursor: "pointer", fontSize: 11, fontWeight: activeSection === i ? 600 : 400,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              transition: "all 0.2s",
            }}>
              {completed.includes(i) && <span style={{ color: C.green }}>✓</span>}
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: C.surface, borderRadius: 12, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 300 }}>
          {content[activeSection]}
        </div>

        {activeSection < sections.length - 1 && (
          <button onClick={goNext} style={{
            marginTop: 16, width: "100%", padding: "12px", borderRadius: 8,
            background: C.accentGlow, border: "none", color: "#fff",
            fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>Mark Complete & Continue →</button>
        )}
      </div>
    </div>
  );
}
