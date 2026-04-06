import { useState, useEffect, useRef } from "react";

/* ── Inline SVG icons (SF Pro for main, Lucide for user) ── */
const ic = {
  brain: (c) => <svg width="14.5" height="14.5" viewBox="0 0 14.05 24.3" fill={c||"#888"} style={{flexShrink:0,display:"block"}}><path d="M0 6.33c0 3.65 2.12 4.92 2.66 11.04.05.64.47 1.04 1.12 1.04h6.12c.66 0 1.08-.4 1.13-1.04.53-6.12 2.66-7.12 2.66-11.04C13.69 2.72 10.62 0 6.84 0 3.07 0 0 2.72 0 6.33zm2.12 0c0-2.48 2.17-4.21 4.72-4.21s4.73 1.73 4.73 4.21c0 2.43-1.7 3.19-2.48 9.96H4.6c-.78-6.77-2.48-7.53-2.48-9.96zM3.63 20.94h6.42c.41 0 .73-.34.73-.72 0-.39-.32-.72-.73-.72H3.63c-.41 0-.73.33-.73.72 0 .39.32.72.73.72zM6.84 23.96c1.6 0 2.82-.77 2.93-1.92H3.88c.09 1.16 1.35 1.92 2.96 1.92z"/></svg>,
  sync: (c) => <svg width="12" height="12" viewBox="0 0 19.38 15.75" fill={c||"#888"} style={{flexShrink:0,display:"block"}}><path d="M11.23 15.68c.35 0 .69-.15.99-.44l6.37-6.35c.27-.26.43-.66.43-1.04 0-.39-.16-.78-.43-1.05L12.23.45C11.92.15 11.58 0 11.23 0c-.83 0-1.39.58-1.39 1.34 0 .43.18.75.44 1.01l2.19 2.2 3.55 3.29-3.55 3.29-2.19 2.19c-.26.25-.44.59-.44 1.01 0 .77.56 1.34 1.39 1.34zM1.46 9.26h11.04l3.79-.21c.76-.04 1.27-.49 1.27-1.21 0-.72-.51-1.17-1.27-1.21l-3.79-.21H1.46C.59 6.43 0 7 0 7.84c0 .85.59 1.42 1.46 1.42z"/></svg>,
  ticket: (c) => <svg width="13" height="13" viewBox="0 0 23.65 20.28" fill={c||"#888"} style={{flexShrink:0,display:"block"}}><path d="M12.41 16.98h9.72c.64 0 1.16-.54 1.16-1.17 0-.65-.51-1.18-1.16-1.18h-9.72c-.65 0-1.15.54-1.15 1.18 0 .63.5 1.17 1.15 1.17z"/><path d="M4.47 20.28c2.45 0 4.47-2.02 4.47-4.47 0-2.45-2.02-4.47-4.47-4.47-2.46 0-4.47 2.02-4.47 4.47 0 2.45 2.02 4.47 4.47 4.47zm-.54-2.06c-.24 0-.42-.13-.58-.3l-1.09-1.3c-.12-.15-.17-.26-.17-.43 0-.35.26-.6.59-.6.22 0 .35.08.5.26l.74.88 1.73-2.76c.14-.23.32-.34.54-.34.34 0 .63.25.63.57 0 .15-.04.27-.14.44l-2.16 3.28a.58.58 0 01-.59.3z"/><path d="M12.41 5.67h9.72c.64 0 1.16-.55 1.16-1.18 0-.64-.51-1.17-1.16-1.17h-9.72c-.65 0-1.15.53-1.15 1.17 0 .63.5 1.18 1.15 1.18z"/><path d="M4.47 8.97c2.45 0 4.47-2.03 4.47-4.48C8.94 2.04 6.92.03 4.47.03 2.01.03 0 2.04 0 4.49c0 2.45 2.02 4.48 4.47 4.48zm-.54-2.06c-.24 0-.42-.12-.58-.31L2.27 5.3a.66.66 0 01-.17-.43c0-.35.26-.6.59-.6.21 0 .35.08.5.26l.74.88 1.73-2.77c.14-.22.32-.33.54-.33.34 0 .63.25.63.57 0 .14-.04.27-.14.44L4.47 6.58a.58.58 0 01-.54.33z"/></svg>,
  spark: (c) => <svg width="14.5" height="14.5" viewBox="0 0 22.12 24.58" fill={c||"#888"} style={{flexShrink:0,display:"block"}}><path d="M4.51 15.59c-.27 0-.47.19-.5.48-.36 2.95-.48 3.05-3.5 3.52-.33.04-.51.23-.51.5 0 .27.18.46.45.5 3.08.57 3.2.58 3.56 3.51.02.3.22.48.5.48.28 0 .48-.18.51-.46.38-3.02.47-3.1 3.55-3.53.26-.03.45-.23.45-.5 0-.27-.19-.46-.44-.5-3.1-.56-3.17-.6-3.56-3.55-.03-.26-.21-.46-.5-.46z"/><path d="M12.58 3.04c-.42 0-.78.32-.85.77-.93 5.99-1.69 6.75-7.52 7.54-.47.06-.81.42-.81.86 0 .46.34.83.81.87 5.84.65 6.69 1.55 7.52 7.53.07.45.42.78.85.78.43 0 .78-.33.86-.78.92-5.99 1.68-6.81 7.53-7.53.47-.05.8-.37.8-.87 0-.45-.33-.8-.81-.86-5.86-.66-6.7-1.55-7.53-7.54-.07-.45-.41-.77-.86-.77z"/></svg>,
  edit: (c) => <svg width="15" height="15" viewBox="0 0 23.37 19.72" fill={c||"#888"} style={{flexShrink:0,display:"block"}}><path d="M21.504 17.106c0 .597-.488 1.085-1.086 1.085H5.701l2.182-2.178h12.535c.597 0 1.086.495 1.086 1.093z"/><path d="M4.505 17.271L15.728 6.055l-2.007-2.007L2.504 15.264l-.971 2.382c-.125.337.219.679.531.556zm12.213-12.196l1.107-1.094c.551-.555.581-1.17.069-1.678l-.412-.422c-.502-.502-1.126-.456-1.664.079l-1.117 1.097z"/></svg>,
  sun: (c) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c||"#888"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>,
  moon: (c) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c||"#888"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>,
  user: (c) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c||"#888"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  spin: (c) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{animation:"_spin 800ms linear infinite"}}><circle cx="12" cy="12" r="10" stroke={c||"#888"} strokeWidth="2.5" strokeDasharray="50 20" strokeLinecap="round" opacity=".7"/></svg>,
};

const ICON_KEY = { brain:"brain", sync:"sync", ticket:"ticket", edit:"edit", sparkle:"spark" };

const AVATARS = [
  "data:image/jpeg;base64,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",
  "data:image/jpeg;base64,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",
  "data:image/jpeg;base64,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",
  "data:image/jpeg;base64,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",
  "data:image/jpeg;base64,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"
];

/* ── Data ── */
const ITEMS = [
  {id:1,icon:"brain",label:"Reasoning",cat:"think",sum:"Analyzing contact enrichment pipeline for Stripe account…",time:"2.1s",
    body:"The user asked to sync Stripe contacts. I need to:\n1. Fetch contacts from the HubSpot CRM API\n2. Cross-reference with existing Hints contacts\n3. Identify new contacts and update enriched fields\n4. Create tasks for the sales team for high-value contacts"},
  {id:2,icon:"sync",label:"Synced",cat:"action",sum:<span style={{display:"inline-flex",alignItems:"center",gap:4,minWidth:0}}>10 contacts from<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",borderRadius:8,background:"rgba(255,108,53,0.12)",fontSize:12,lineHeight:"16px",marginLeft:4}}><svg width="12" height="12" viewBox="0 0 24 24" fill="#FF6C35"><path d="M18.16 7.93V5.09a2.2 2.2 0 001.27-1.98V3.04A2.2 2.2 0 0017.24.85h-.07a2.2 2.2 0 00-2.19 2.19v.07c0 .87.51 1.62 1.25 1.97v2.85a6.22 6.22 0 00-2.97 1.31l-7.83-6.1a2.5 2.5 0 10-1.16 1.52l7.7 5.99a6.18 6.18 0 00-1.04 3.45c0 1.34.43 2.59 1.15 3.6l-2.34 2.35a1.97 1.97 0 00-.58-.1 2.03 2.03 0 102.03 2.04 1.98 1.98 0 00-.1-.6l2.32-2.32a6.25 6.25 0 104.75-11.13zm-.96 9.38a3.21 3.21 0 110-6.41 3.21 3.21 0 010 6.41z"/></svg><span style={{fontSize:12,fontWeight:500,color:"#FF6C35"}}>HubSpot</span></span><svg width="10" height="10" viewBox="0 0 19.38 15.75" fill="currentColor" style={{flexShrink:0,opacity:0.4,margin:"0 4px"}}><path d="M11.23 15.68c.35 0 .69-.15.99-.44l6.37-6.35c.27-.26.43-.66.43-1.04 0-.39-.16-.78-.43-1.05L12.23.45C11.92.15 11.58 0 11.23 0c-.83 0-1.39.58-1.39 1.34 0 .43.18.75.44 1.01l2.19 2.2 3.55 3.29-3.55 3.29-2.19 2.19c-.26.25-.44.59-.44 1.01 0 .77.56 1.34 1.39 1.34zM1.46 9.26h11.04l3.79-.21c.76-.04 1.27-.49 1.27-1.21 0-.72-.51-1.17-1.27-1.21l-3.79-.21H1.46C.59 6.43 0 7 0 7.84c0 .85.59 1.42 1.46 1.42z"/></svg><span className="hints-chip" style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",borderRadius:8,fontSize:12,lineHeight:"16px"}}><span style={{fontSize:12,fontWeight:500}}>Hints CRM</span></span></span>,time:"3.4s",reversible:true,
    body:"GET /api/v3/contacts?limit=100\nStatus: 200 OK\nFetched: 10 contacts\nNew: 4 created\nUpdated: 5 enriched\nSkipped: 1 duplicate"},
  {id:3,icon:"brain",label:"Reasoning",cat:"think",sum:"Found 3 high-value contacts from Verizon — creating tasks…",time:"1.8s",
    body:"Contacts with enterprise-tier potential:\n— Sarah Chen (VP Eng) — score: 92\n— Marcus Webb (Procurement) — score: 87\n— Diana Flores (CTO) — score: 95\n\nAll three exceed the 85-point threshold for immediate outreach."},
  {id:4,icon:"ticket",label:"Created task",cat:"action",sum:"Follow up with Diana Flores (CTO, Verizon)",time:"0.4s",type:"rich",reversible:true,initOpen:true},
  {id:5,icon:"edit",label:"Updated",cat:"action",sum:<span style={{display:"inline-flex",alignItems:"center"}}>Deal stage: Verizon Enterprise<svg width="10" height="10" viewBox="0 0 19.38 15.75" fill="currentColor" style={{flexShrink:0,opacity:0.4,margin:"0 8px"}}><path d="M11.23 15.68c.35 0 .69-.15.99-.44l6.37-6.35c.27-.26.43-.66.43-1.04 0-.39-.16-.78-.43-1.05L12.23.45C11.92.15 11.58 0 11.23 0c-.83 0-1.39.58-1.39 1.34 0 .43.18.75.44 1.01l2.19 2.2 3.55 3.29-3.55 3.29-2.19 2.19c-.26.25-.44.59-.44 1.01 0 .77.56 1.34 1.39 1.34zM1.46 9.26h11.04l3.79-.21c.76-.04 1.27-.49 1.27-1.21 0-.72-.51-1.17-1.27-1.21l-3.79-.21H1.46C.59 6.43 0 7 0 7.84c0 .85.59 1.42 1.46 1.42z"/></svg>Negotiation</span>,time:"0.3s",reversible:true,
    body:'PATCH /api/v1/deals/vz-enterprise-2024\n{\n  "stage": "negotiation",\n  "expected_value": 420000\n}\nStatus: 200 OK'},
  {id:6,icon:"sparkle",label:"Summary",cat:"think",sum:"Agent run complete — 10 synced, 3 tasks, 1 deal updated",time:"8.0s",type:"stats",initOpen:true},
];

/* ── Themes ── */
const TH = {
  dark:{bg:"#1E1E1E",sf:"#282828",code:"rgba(255,255,255,0.03)",codeSolid:"#2C2C2C",codeSelected:"#383838",tx:"#EBEBEB",sub:"rgba(235,235,245,0.6)",mt:"#929199",bd:"rgba(84,84,88,0.25)",ac:"#D47958",gn:"#4ade80",gnBg:"rgba(74,222,128,0.1)",am:"#fbbf24",pOn:"#EBEBEB",pOT:"#1a1a1a",pOf:"rgba(235,235,245,0.45)",tb:"rgba(255,255,255,0.06)",sh:"rgba(0,0,0,0.3)"},
  light:{bg:"#f4f3ef",sf:"#fff",code:"#f5f5f2",codeSolid:"#f5f5f2",codeSelected:"#eae9e5",tx:"#1a1a1a",sub:"#6b6b6b",mt:"#999",bd:"rgba(0,0,0,0.06)",ac:"#D47958",gn:"#16a34a",gnBg:"rgba(22,163,74,0.12)",am:"#b49309",pOn:"#1a1a1a",pOT:"#fff",pOf:"#888",tb:"rgba(0,0,0,0.04)",sh:"rgba(0,0,0,0.04)"},
};

function itemColor(item, t) {
  if (!item) return t.sub;
  if (item.icon === "sync" || item.icon === "sparkle") return t.ac;
  if (item.icon === "ticket") return t.am;
  if (item.icon === "edit") return t.gn;
  return t.sub;
}

function itemBg(item, dk) {
  if (!item) return "transparent";
  if (item.icon === "sync" || item.icon === "sparkle") return dk ? "rgba(212,121,88,0.12)" : "rgba(180,90,50,0.12)";
  if (item.icon === "ticket") return dk ? "rgba(251,191,36,0.1)" : "rgba(180,147,9,0.13)";
  if (item.icon === "edit") return dk ? "rgba(74,222,128,0.1)" : "rgba(22,163,74,0.12)";
  if (item.icon === "mail") return dk ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.1)";
  if (item.icon === "brain") return dk ? "rgba(235,235,245,0.06)" : "rgba(0,0,0,0.04)";
  return "transparent";
}

/* ── Sample data for drill-down ── */
const CONTACTS = [
  { name: "Diana Flores", role: "CTO", company: "Verizon", score: 95, ava: 0 },
  { name: "Sarah Chen", role: "VP Engineering", company: "Verizon", score: 92, ava: 1 },
  { name: "Marcus Webb", role: "Head of Procurement", company: "Verizon", score: 87, ava: 2 },
  { name: "James Liu", role: "Director Ops", company: "Stripe", score: 78, ava: 3 },
  { name: "Nina Patel", role: "Product Lead", company: "Stripe", score: 74, ava: 4 },
  { name: "Tom Bradley", role: "CFO", company: "Costco", score: 71, ava: 2 },
  { name: "Lena Kovac", role: "Head of Sales", company: "Verizon", score: 68, ava: 1 },
  { name: "Ryan Torres", role: "Solutions Architect", company: "Stripe", score: 65, ava: 3 },
  { name: "Priya Sharma", role: "VP Product", company: "Costco", score: 62, ava: 0 },
  { name: "Alex Petrov", role: "Engineering Lead", company: "Stripe", score: 59, ava: 4 },
];
const TASKS = [
  { title: "Follow up with Diana Flores", assignee: "alex", due: "Today", priority: "High" },
  { title: "Send proposal to Sarah Chen", assignee: "maria", due: "Tomorrow", priority: "Medium" },
  { title: "Schedule demo for Marcus Webb", assignee: "alex", due: "Apr 3", priority: "High" },
];
const DEAL = { name: "Verizon Enterprise", company: "Verizon Corp", value: 420000, contact: "Diana Flores", stage: "negotiation", closeDate: "Apr 15", priority: "High" };
const STAGES = { prospecting: { color: "#3B82F6", label: "Prospecting" }, qualification: { color: "#EAB308", label: "Qualification" }, proposal: { color: "#A855F7", label: "Proposal" }, negotiation: { color: "#F97316", label: "Negotiation" }, "closed-won": { color: "#22C55E", label: "Closed Won" } };
const PRI_C = { Critical: { bg: "rgba(239,68,68,0.2)", c: "#F87171" }, High: { bg: "rgba(59,130,246,0.2)", c: "#60A5FA" }, Medium: { bg: "rgba(202,138,4,0.15)", c: "#ca8a04" }, Low: { bg: "rgba(255,255,255,0.06)", c: "rgba(235,235,245,0.4)" } };

function StatsPanel({ t, dk }) {
  const [expanded, setExpanded] = useState(null);
  const [checked, setChecked] = useState({});
  const toggle = (key) => setExpanded(expanded === key ? null : key);
  const toggleCheck = (title) => setChecked(prev => ({ ...prev, [title]: !prev[title] }));

  /* Consistent chip style */
  const chip = (bg, color) => ({ fontSize: 12, fontWeight: 500, padding: "5px 9px", borderRadius: 8, background: bg, color, lineHeight: "16px" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Stats row */}
      <div className="hfa-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[{ k: "contacts", n: "10", l: "Contacts synced", icon: "sync", c: t.ac, bg: dk ? "rgba(212,121,88,0.12)" : "rgba(180,90,50,0.12)" }, { k: "tasks", n: "3", l: "Tasks created", icon: "ticket", c: t.am, bg: dk ? "rgba(251,191,36,0.1)" : "rgba(180,147,9,0.13)" }, { k: "deal", n: "1", l: "Deal updated", icon: "edit", c: t.gn, bg: dk ? "rgba(74,222,128,0.1)" : "rgba(22,163,74,0.12)" }].map((s, i) => (
          <button key={s.k} aria-label={`${s.n} ${s.l}`} aria-expanded={expanded === s.k} onClick={() => toggle(s.k)} className={`hfa-si ${expanded === s.k ? "" : "hfa-hover"}`} style={{
            padding: 16, borderRadius: 12,
            background: expanded === s.k ? t.codeSelected : t.codeSolid,
            cursor: "pointer", border: "none", textAlign: "left", fontFamily: "inherit",
            width: "100%", transition: "background-color 150ms ease",
            animationDelay: `${i * 30}ms`,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 10, background: s.bg }}>{ic[ICON_KEY[s.icon]](s.c)}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: t.tx, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.07em", lineHeight: "28px", marginTop: 34 }}>{s.n}</div>
            <div style={{ fontSize: 13, color: t.sub, marginTop: 6 }}>{s.l}</div>
          </button>
        ))}
      </div>

      {/* Contacts */}
      {expanded === "contacts" && (
        <div className="hx" style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 290, overflowY: "auto", marginRight: -16, paddingRight: 16 }}>
          {CONTACTS.map(c => (
            <div key={c.name} className="hfa-hover" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 12, background: t.code, cursor: "pointer", transition: "background-color 150ms ease" }}>
              <img src={AVATARS[c.ava]} alt={c.name} style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, objectFit: "cover" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: t.tx, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                <div style={{ fontSize: 13, fontWeight: 450, lineHeight: 1.6, color: t.mt, marginTop: 1 }}>{c.role} · {c.company}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.score >= 90 ? t.gn : c.score >= 80 ? t.am : t.sub, fontVariantNumeric: "tabular-nums" }}>{c.score}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tasks */}
      {expanded === "tasks" && (
        <div className="hx" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TASKS.map(tk => {
            const pc = PRI_C[tk.priority] || PRI_C.Low;
            const isDone = checked[tk.title];
            return (
              <label key={tk.title} className="hfa-hover" style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                borderRadius: 12, background: t.code, cursor: "pointer",
                transition: "background-color 150ms ease",
              }}>
                {/* Hidden real checkbox for a11y */}
                <input type="checkbox" checked={isDone || false} onChange={() => toggleCheck(tk.title)}
                  style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }} />
                {/* Visual checkbox */}
                <div style={{
                  width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                  border: isDone ? "none" : `1px solid ${t.mt}`,
                  background: isDone ? t.ac : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background-color 150ms ease, border-color 150ms ease",
                }}>
                  {isDone && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 500, color: isDone ? t.mt : t.tx,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    textDecoration: isDone ? "line-through" : "none",
                    transition: "color 150ms ease",
                  }}>{tk.title}</div>
                  <div style={{ fontSize: 13, fontWeight: 450, lineHeight: 1.6, color: t.mt, marginTop: 1 }}>@{tk.assignee} · {tk.due}</div>
                </div>
                <span style={chip(pc.bg, pc.c)}>{tk.priority}</span>
              </label>
            );
          })}
        </div>
      )}

      {/* Deal */}
      {expanded === "deal" && (
        <div className="hx" style={{ padding: 16, borderRadius: 12, background: t.code, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: t.tx }}>{DEAL.name}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: t.tx, fontVariantNumeric: "tabular-nums" }}>$420K</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 450, lineHeight: 1.6, color: t.mt }}>{DEAL.company}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: STAGES[DEAL.stage].color, flexShrink: 0, position: "relative", top: 0.5 }} />
              <span style={{ fontSize: 13, fontWeight: 450, lineHeight: 1.6, color: t.mt, letterSpacing: "0.01em" }}>{STAGES[DEAL.stage].label}</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
            <img src={AVATARS[0]} alt="Diana Flores" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} />
            <span style={{ fontSize: 13, fontWeight: 450, lineHeight: 1.6, color: t.mt }}>{DEAL.contact}</span>
            <span style={{ fontSize: 13, fontWeight: 450, lineHeight: 1.6, color: t.mt, opacity: 0.4 }}>·</span>
            <span style={{ fontSize: 13, fontWeight: 450, lineHeight: 1.6, color: t.mt, fontVariantNumeric: "tabular-nums" }}>{DEAL.closeDate}</span>
            <span style={{ marginLeft: "auto", ...chip(PRI_C[DEAL.priority].bg, PRI_C[DEAL.priority].c) }}>{DEAL.priority}</span>
          </div>
        </div>
      )}

    </div>
  );
}

/* ── Revert affordance for action cards ── */
function RevertLink({ t }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <button className="hfa-btn-ghost" style={{
        background:t.codeSolid,border:"none",cursor:"pointer",
        padding:"8px 10px",borderRadius:10,
        fontSize:13,fontWeight:500,letterSpacing:"0.01em",
        color:t.sub,fontFamily:"inherit",
        boxShadow:`inset 0 0 0 0.5px ${t.bd}`,
        transition:"background-color 150ms ease",
      }}>Revert this action</button>
    </div>
  );
}

/* ── Streaming thinking trace ── */
function StreamingText({ text, active, t }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [hasStreamed, setHasStreamed] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!active || hasStreamed) return;
    let i = 0;
    let timer;
    setDisplayed("");
    setDone(false);
    setShowCursor(true);
    const tick = () => {
      if (i < text.length) {
        i++;
        setDisplayed(text.slice(0, i));
        const ch = text[i - 1];
        let delay = 35 + Math.random() * 25;
        if (ch === '\n') delay = 280;
        else if ('.!?'.includes(ch)) delay = 420;
        else if (',;:—'.includes(ch)) delay = 200;
        else if (ch === ' ' && Math.random() > 0.78) delay = 120;
        timer = setTimeout(tick, delay);
      } else {
        setDone(true);
        setHasStreamed(true);
      }
    };
    timer = setTimeout(tick, 250);
    return () => clearTimeout(timer);
  }, [active, text, hasStreamed]);

  useEffect(() => {
    if (!done) return;
    let count = 0;
    const blink = setInterval(() => {
      setShowCursor(v => !v);
      count++;
      if (count >= 5) { clearInterval(blink); setShowCursor(false); }
    }, 350);
    return () => clearInterval(blink);
  }, [done]);

  const content = hasStreamed && !active ? text : displayed;
  const cursorOn = active && (!done || showCursor);

  return (
    <pre style={{fontFamily:"monospace",fontSize:13,lineHeight:1.6,background:t.code,color:t.sub,padding:16,borderRadius:12,margin:0,whiteSpace:"pre-wrap",overflowWrap:"break-word",maxHeight:200,overflowY:"auto",boxShadow:`inset 0 0 0 0.5px ${t.bd}`}}>
      {content}{cursorOn && <span className="_cursor" style={{color:t.ac,marginLeft:2,fontWeight:500,fontSize:13,lineHeight:0,animation:done ? "none" : "_blink 900ms step-end infinite"}}>▍</span>}
    </pre>
  );
}

/* ── Card ── */
function Card({ item, t, initOpen, dk }) {
  const [open, setOpen] = useState(initOpen || false);
  if (!item) return null;
  const col = itemColor(item, t);
  const iconFn = ic[ICON_KEY[item.icon]];

  return (
    <div className="hfa-card-wrap" style={{background:t.sf,borderRadius:12,overflow:"hidden"}}>
      <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="hfa-card-btn" style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"14px 16px",border:"none",background:"transparent",cursor:"pointer",textAlign:"left",fontSize:13,color:t.tx,minHeight:52,fontFamily:"inherit",transition:"background-color 150ms ease",overflow:"hidden"}}>
        <span style={{display:"inline-flex",alignItems:"center",gap:10,flexShrink:0}}>
          <span style={{display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,borderRadius:10,background:itemBg(item,dk)}}>{iconFn ? iconFn(col) : ic.spark(col)}</span>
          <span style={{color:t.tx,fontWeight:500,whiteSpace:"nowrap"}}>{item.label}</span>
        </span>
        <span style={{fontWeight:500,color:t.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",minWidth:0,flex:1}}>{item.sum}</span>
      </button>
      <div style={{display:"grid",gridTemplateRows:open ? "1fr" : "0fr",transition:"grid-template-rows 250ms cubic-bezier(0.165,0.84,0.44,1)"}}>
        <div style={{overflow:"hidden"}}>
          <div style={{padding:16,fontSize:13,lineHeight:1.5,color:t.sub,opacity:open ? 1 : 0,transition:"opacity 150ms cubic-bezier(0.165,0.84,0.44,1)"}}>
          {item.type === "rich" ? (
            <div style={{display:"flex",flexDirection:"column",gap:0}}>
              <div style={{fontSize:14,fontWeight:600,color:t.tx,lineHeight:1.4}}>Enterprise outreach: Verizon CTO — Diana Flores</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
                <span style={{padding:"5px 9px",borderRadius:8,fontSize:12,fontWeight:500,background:"rgba(59,130,246,0.2)",color:"#60A5FA",lineHeight:"16px"}}>High-priority</span>
                <span style={{padding:"5px 9px",borderRadius:8,fontSize:12,fontWeight:500,boxShadow:`0 0 0 1px ${t.bd}`,color:t.sub,lineHeight:"16px"}}>Enterprise</span>
              </div>
              <p style={{margin:0,marginTop:16,fontSize:13,fontWeight:450,lineHeight:1.6,color:t.mt}}>Lead score 95. Engaged with enterprise pricing 3× this week. Schedule demo on AI workflow automation for telecom. Assigned to <strong style={{color:t.sub,fontWeight:600}}>@alex</strong>.</p>
              {item.reversible && <div style={{marginTop:16}}><RevertLink t={t} /></div>}
            </div>
          ) : item.type === "stats" ? (
            <StatsPanel t={t} dk={dk} />
          ) : item.cat === "think" && item.body ? (
            <StreamingText text={item.body} active={open} t={t} />
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <pre style={{fontFamily:"monospace",fontSize:13,lineHeight:1.6,background:t.code,color:t.sub,padding:16,borderRadius:12,margin:0,whiteSpace:"pre-wrap",overflowWrap:"break-word",maxHeight:200,overflowY:"auto",boxShadow:`inset 0 0 0 0.5px ${t.bd}`}}>{item.body}</pre>
              {item.reversible && <RevertLink t={t} />}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── App ── */
export default function Prototype() {
  const dk = true;
  const [fl, setFl] = useState("all");
  const [vis, setVis] = useState([]);
  const [done, setDone] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const scrollRef = useRef(null);
  const cancelled = useRef(false);

  const t = dk ? TH.dark : TH.light;

  /* Staggered real-time loading — safe for Strict Mode */
  useEffect(() => {
    cancelled.current = false;
    setVis([]);
    setDone(false);

    const delays = [900, 900, 800, 500, 400, 700];
    let timers = [];

    ITEMS.forEach((item, i) => {
      const total = delays.slice(0, i + 1).reduce((a, b) => a + b, 0);
      const tid = setTimeout(() => {
        if (!cancelled.current) {
          setVis(prev => {
            if (prev.find(p => p.id === item.id)) return prev;
            return [...prev, item];
          });
        }
      }, total);
      timers.push(tid);
    });

    const endTimer = setTimeout(() => {
      if (!cancelled.current) setDone(true);
    }, delays.reduce((a, b) => a + b, 0) + 500);
    timers.push(endTimer);

    return () => {
      cancelled.current = true;
      timers.forEach(clearTimeout);
    };
  }, [runKey]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [vis.length]);

  const filtered = fl === "all" ? vis : vis.filter(item => item && item.cat === fl);
  const elapsed = done ? "8.0s" : (vis.length * 1.3).toFixed(1) + "s";
  const counts = {
    all: vis.length,
    action: vis.filter(x => x && x.cat === "action").length,
    think: vis.filter(x => x && x.cat === "think").length,
  };

  return (
    <div data-theme={dk ? "dark" : "light"} style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif",background:t.bg,minHeight:"100vh",color:t.tx,fontSize:14,transition:"background-color 350ms ease, color 250ms ease",WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"74px 16px"}}>
      <style>{`
        html,body{background:#1E1E1E;margin:0}
        .hc{animation:_ci 320ms cubic-bezier(.165,.84,.44,1) both}
        .hx{animation:_ex 280ms cubic-bezier(0.34,1.56,0.64,1) both}
        .hf{animation:_ex 300ms cubic-bezier(.23,1,.32,1) 200ms both}
        .hfa-si{animation:_si 350ms cubic-bezier(0.34,1.56,0.64,1) both}
        @keyframes _ci{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes _ex{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes _si{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
        @keyframes _dot{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-4px)}}
        @keyframes _spin{to{transform:rotate(360deg)}}
        @keyframes _blink{0%,100%{opacity:1}50%{opacity:0}}
        @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
        @media(max-width:480px){
          .hfa-responsive{padding-left:14px!important;padding-right:14px!important}
          .hfa-stats-grid{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:360px){
          .hfa-stats-grid{grid-template-columns:1fr!important}
          .hfa-responsive{padding-left:12px!important;padding-right:12px!important}
        }

        /* Focus ring — keyboard Tab only (#7D7471) */
        button:focus-visible:not(:hover){outline:1px solid #7D7471;outline-offset:2px;border-radius:8px;box-shadow:0 0 0 4px rgba(125,116,113,0.1)}
        button:focus-visible:hover{outline:none;box-shadow:none}
        /* Task rows: no focus ring on click — only keyboard Tab */
        label{outline:none!important}

        /* Hints CRM chip — lighter purple in dark, deeper in light */
        [data-theme="dark"] .hints-chip{background:rgba(167,139,250,0.12);color:#C4B5FD}
        [data-theme="light"] .hints-chip{background:rgba(139,92,246,0.12);color:#8B5CF6}

        /* Button press scale — ACTION buttons only */
        .hfa-btn-primary:active:not(:disabled),
        .hfa-btn-ghost:active,
        .hfa-pill:active{transform:scale(0.97)}

        /* Disclosure controls: pressed bg tint, NO scale */
        .hfa-card-btn:active{background:rgba(128,128,128,0.1)!important}

        /* Hover gated behind pointer:fine */
        /* Hover/color transitions → ease, 150ms */
        @media(hover:hover) and (pointer:fine){
          .hfa-btn-primary:hover{opacity:0.85!important}
          .hfa-btn-ghost:hover{background:rgba(128,128,128,0.12)!important}
          .hfa-pill:hover{background:rgba(128,128,128,0.08)!important}
          .hfa-card-wrap{transition:box-shadow 150ms ease}
          [data-theme="dark"] .hfa-hover:hover{background:rgba(255,255,255,0.06)!important}
          [data-theme="light"] .hfa-hover:hover{background:#EAE9E5!important}
          [data-theme="dark"] .hfa-card-btn:hover{background:#393939!important}
          [data-theme="light"] .hfa-card-btn:hover{background:rgba(0,0,0,0.02)!important}
        }
      `}</style>

      {/* ── Top nav ── */}
      <div style={{position:"fixed",top:16,right:16,zIndex:100}}>
        <button
          onClick={() => setRunKey(k => k + 1)}
          disabled={!done && vis.length > 0}
          aria-label="Re-run agent"
          className="hfa-btn-primary"
          style={{
            display:"flex",alignItems:"center",justifyContent:"center",
            padding:"12px 16px",borderRadius:12,border:"none",
            background:done || vis.length === 0 ? t.pOn : t.sf,
            color:done || vis.length === 0 ? t.pOT : t.mt,
            fontSize:13,fontWeight:600,fontFamily:"inherit",
            cursor:done || vis.length === 0 ? "pointer" : "default",
            opacity:!done && vis.length > 0 ? 0.4 : 1,
            boxShadow:`0 0 0 0.5px ${t.bd}, 0 2px 8px ${t.sh}`,
            transition:"opacity 150ms ease, background 150ms ease, color 150ms ease, box-shadow 150ms ease",
            letterSpacing:"-0.01em",
          }}
        >
          Re-run
        </button>
      </div>

      {/* ── Panel ── */}
      <div style={{width:"100%",maxWidth:520,background:t.bg,borderRadius:16,boxShadow:`0 0 0 0.5px ${t.bd}, 0 4px 24px rgba(0,0,0,0.2)`,overflow:"hidden",transition:"background-color 300ms ease,box-shadow 300ms ease"}}>

      {/* ── Header ── */}
      <div style={{zIndex:50,background:t.bg,borderBottom:`0.5px solid ${t.bd}`,transition:"background-color 300ms ease"}}>
        <div className="hfa-responsive" style={{padding:"20px 20px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 11px",borderRadius:8,fontSize:12,fontWeight:500,background:done?t.gnBg:"rgba(255,108,53,0.12)",color:done?t.gn:"#FF6C35"}}>
              {done ? <span style={{width:6,height:6,borderRadius:"50%",background:t.gn}}/> : ic.spin("#FF6C35")}
              {done ? "Completed" : "Running…"}
            </span>
            <span style={{fontSize:12,color:t.mt,fontVariantNumeric:"tabular-nums",fontFamily:"monospace",minWidth:38,textAlign:"right"}}>{elapsed}</span>
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="hfa-responsive" style={{padding:"18px 20px 0"}}>
        <div style={{display:"flex",gap:4}} role="tablist" aria-label="Filter agent activity">
          {[{k:"all",l:"All"},{k:"action",l:"Actions"},{k:"think",l:"Reasoning"}].map(f => (
            <button key={f.k} role="tab" aria-selected={fl===f.k} onClick={() => setFl(f.k)} className={fl===f.k ? "" : "hfa-pill"} style={{padding:"7px 7px 7px 11px",borderRadius:12,border:"none",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit",background:fl===f.k?t.pOn:"transparent",color:fl===f.k?t.pOT:t.pOf,transition:"background-color 150ms ease,color 150ms ease",display:"flex",alignItems:"center",gap:8}}>
              {f.l}
              <span style={{
                fontSize:12,fontVariantNumeric:"tabular-nums",fontWeight:500,
                padding:"2px 7px",borderRadius:6,lineHeight:"16px",
                background:fl===f.k ? (dk ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)") : (dk ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
                color:fl===f.k ? t.pOT : t.pOf,
                transition:"background-color 150ms ease,color 150ms ease",
              }}>{counts[f.k]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Feed ── */}
      <div ref={scrollRef} className="hfa-responsive" style={{padding:"18px 20px",display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map(item => (
          <div key={item.id} className={done ? "" : "hc"}>
            <Card item={item} t={t} dk={dk} initOpen={item.initOpen} />
          </div>
        ))}
        {!done && (
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"20px 0"}}>
            {[0,1,2].map(i => (
              <div key={i} style={{width:4,height:4,borderRadius:"50%",background:t.mt,animation:`_dot 0.7s ease-in-out ${i * 0.12}s infinite`}} />
            ))}
          </div>
        )}
      </div>

      {/* ── Approval checkpoint ── */}
      {done && (
        <div className="hf hfa-responsive" style={{padding:"2px 20px 20px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
            <div style={{fontSize:12,color:t.mt}}>
              3 actions completed for <span style={{color:t.tx}}>@maria</span> · via Slack · 2 min ago
            </div>
          </div>
        </div>
      )}

      </div>{/* end panel */}
    </div>
  );
}
