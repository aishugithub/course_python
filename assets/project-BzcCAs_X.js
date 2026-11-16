import{j as n}from"./index-5ju0ARcj.js";import{T as a,a as l,t as f}from"./Lesson-B4adq15Q.js";const d=t=>`import os
`+Object.entries(t).map(([s,i])=>i===null?`if os.path.exists(${JSON.stringify(s)}): os.remove(${JSON.stringify(s)})`:`with open(${JSON.stringify(s)}, "w") as _f:
    _f.write(${JSON.stringify(i)})`).join(`
`),h=(t,s,i)=>`import os as _os
assert _os.path.exists(${JSON.stringify(t)}), "${t} was not saved."
_got = [l.strip() for l in open(${JSON.stringify(t)}) if l.strip()]
assert _got == ${JSON.stringify(s)}, ${JSON.stringify(i||`${t} doesn't contain the right lines.`)} + " Found: " + str(_got)
`,m=(t=1)=>`import matplotlib.pyplot as _plt
assert _plt.get_fignums(), "No chart was drawn."
_fig = _plt.gcf()
_fig.canvas.draw()
assert len(_fig.axes) >= ${t}, "Expected ${t} chart(s) in the figure."
_ax = _fig.axes[0]
_ticks = lambda a: [t.get_text() for t in a.get_xticklabels()]
_heights = lambda a: [round(p.get_height(), 2) for p in a.patches]
`,_=(t,s="_ax")=>`assert ${s}.get_title().strip().lower() == ${JSON.stringify(t.toLowerCase())}, "Title the chart: ${t} — it is '" + ${s}.get_title() + "'."
`,u=(t,s="_ax",i="bars")=>`assert _ticks(${s}) == ${JSON.stringify(t.map(e=>e[0]))}, "The ${i} should be, in order: ${t.map(e=>e[0]).join(", ")} — got " + str(_ticks(${s}))
assert _heights(${s}) == ${JSON.stringify(t.map(e=>e[1]))}, "The ${i} have the wrong heights."
`;function x(t){const s=[...t],i=[];return{ask:e=>{const r=s.shift();return i.push(e+r),r},say:(...e)=>i.push(...e),text:()=>i.join(`
`)}}const $=t=>{const[s,...i]=t.trim().split(`
`),e=s.split(",");return i.map(r=>Object.fromEntries(r.split(",").map((o,p)=>[e[p],o!==""&&!isNaN(+o)?+o:o])))},y=(t,s,i)=>{const e=new Map;return t.forEach(r=>{const o=typeof s=="function"?s(r):r[s];e.set(o,(e.get(o)||0)+i(r))}),[...e]},b=t=>[...t].sort((s,i)=>s[0]<i[0]?-1:s[0]>i[0]?1:0),N=t=>[...t].sort((s,i)=>i[1]-s[1]||(s[0]<i[0]?-1:1));function O({color:t=a.blue,rows:s}){return n.jsx("div",{style:{border:`1px solid ${a.border}`,borderRadius:12,overflow:"hidden",maxWidth:980},children:s.map(([i,e,r],o)=>n.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(150px, 1fr) 110px 2fr",gap:12,padding:"10px 14px",background:o%2?a.surface:a.card,fontSize:14.5,alignItems:"center"},children:[n.jsx("span",{style:{fontWeight:700,color:t},children:i}),n.jsx("span",{style:{fontFamily:l,fontSize:12.5,color:a.bronze,background:f(a.amber,"14"),borderRadius:6,padding:"2px 8px",justifySelf:"start"},children:e}),n.jsx("span",{style:{color:a.slate},children:r})]},o))})}export{x as C,m as F,O as R,d as a,N as b,b as c,u as d,h as f,$ as p,y as s,_ as t};
