import { useState, useEffect, useRef } from "react";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://nqynffqckqxuwinaknil.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xeW5mZnFja3F4dXdpbmFrbmlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2OTM1MjQsImV4cCI6MjA5NTI2OTUyNH0.iID2r_HL1SCkrVWLxrwebhB-m2VrlLqnazfy3uJ-oWQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg:"#07070E", surface:"#0F0F1A", card:"#141420", cardHover:"#191928",
  border:"#222236", accent:"#E8A020", gold:"#F5C842", red:"#E84040",
  teal:"#1ABFB4", purple:"#9B59F5", blue:"#3B82F6", green:"#22C55E",
  p:"#F0EEE8", s:"#9B9AAA", m:"#4A4A62",
};

const CATEGORIES = [
  {id:"artists",    icon:"🎭", label:"Artists",           color:T.accent, tagline:"Showcase Your Talent"},
  {id:"directors",  icon:"🎬", label:"Directors",         color:T.purple, tagline:"Fund Your Vision"},
  {id:"producers",  icon:"💼", label:"Producers",         color:T.teal,   tagline:"Co-Produce Together"},
  {id:"technicians",icon:"🎞", label:"24 Crafts",         color:T.blue,   tagline:"Find Your Next Gig"},
  {id:"education",  icon:"🎓", label:"Learn & Distribute",color:T.green,  tagline:"Grow & Release"},
];

const CRAFTS = [
  "Direction","Screenplay","Cinematography","Editing","Art Direction",
  "Costume Design","Make-Up","Sound Design","Background Score","Playback",
  "Stunts","VFX","Production Design","Casting","Line Production",
  "Still Photography","Publicity","Distribution","Subtitles","Dubbing",
  "Color Grading","Foley","Choreography","Lighting",
];

const DIST_DATA = [
  {region:"Maharashtra",   theaters:48, dist:"Reliance Ent.",    cost:"₹2.5L–5L",   comm:"35%"},
  {region:"Tamil Nadu",    theaters:62, dist:"Sun Pictures",     cost:"₹1.8L–4L",   comm:"30%"},
  {region:"Karnataka",     theaters:35, dist:"KRG Studios",      cost:"₹1.5L–3.5L", comm:"32%"},
  {region:"Delhi NCR",     theaters:55, dist:"PVR Cinemas",      cost:"₹3L–6L",     comm:"38%"},
  {region:"West Bengal",   theaters:28, dist:"Eskay Movies",     cost:"₹1L–2.5L",   comm:"28%"},
  {region:"Andhra Pradesh",theaters:71, dist:"Sri Venkateswara", cost:"₹1.2L–3L",   comm:"29%"},
  {region:"Telangana",     theaters:58, dist:"Suresh Prods.",    cost:"₹1.5L–3.5L", comm:"31%"},
];

const OTT_DATA = [
  {name:"Netflix India",      type:"SVOD",      genres:"Drama, Thriller", wks:"8–14", email:"acquisitions@netflix.com"},
  {name:"Amazon Prime Video", type:"SVOD",      genres:"All genres",      wks:"6–12", email:"primevideo.in"},
  {name:"Zee5",               type:"AVOD/SVOD", genres:"Regional, Hindi", wks:"4–8",  email:"content@zee5.com"},
  {name:"SonyLIV",            type:"SVOD",      genres:"Sports, Drama",   wks:"6–10", email:"acquisitions@sonyliv.com"},
  {name:"Disney+ Hotstar",    type:"SVOD",      genres:"All genres",      wks:"8–16", email:"hotstar.com"},
  {name:"Aha",                type:"SVOD",      genres:"Telugu, Tamil",   wks:"4–6",  email:"content@ahaott.com"},
];

const MERCH = [
  {name:"Clap Board Premium",     price:"₹1,299", plat:"Amazon",   e:"🎬", url:"https://amazon.in"},
  {name:"Director's Chair",       price:"₹3,499", plat:"Flipkart", e:"🪑", url:"https://flipkart.com"},
  {name:"Film Script Notebook",   price:"₹449",   plat:"Amazon",   e:"📓", url:"https://amazon.in"},
  {name:"Lens Cleaning Kit Pro",  price:"₹799",   plat:"Amazon",   e:"🔭", url:"https://amazon.in"},
  {name:"Boom Mic Stand Compact", price:"₹2,199", plat:"Flipkart", e:"🎤", url:"https://flipkart.com"},
  {name:"LED Ring Light 18\"",    price:"₹1,899", plat:"Amazon",   e:"💡", url:"https://amazon.in"},
  {name:"Camera Strap Leather",   price:"₹649",   plat:"Amazon",   e:"📸", url:"https://amazon.in"},
  {name:"Colour Grading LUTs USB",price:"₹999",   plat:"Flipkart", e:"🎨", url:"https://flipkart.com"},
];

// ─── ATOMS ────────────────────────────────────────────────────────────────────
const inp = {
  background:T.surface, border:`1px solid ${T.border}`, borderRadius:9,
  padding:"10px 14px", color:T.p, fontSize:13, fontFamily:"inherit",
  outline:"none", width:"100%", boxSizing:"border-box",
};

function Badge({c, col=T.accent}) {
  return (
    <span style={{display:"inline-block", padding:"2px 10px", borderRadius:20, fontSize:11,
      fontWeight:700, background:col+"22", color:col, border:`1px solid ${col}44`}}>{c}</span>
  );
}

function Btn({children, onClick, col=T.accent, full, sm, disabled, style:sx={}}) {
  const [h,sh] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
      style={{padding:sm?"6px 14px":"9px 20px", borderRadius:8, border:`1.5px solid ${disabled?T.m:col}`,
        background:disabled?T.m+"22":h?col:"transparent",
        color:disabled?T.m:h?"#07070E":col, fontFamily:"inherit", fontWeight:700,
        fontSize:sm?12:13, cursor:disabled?"not-allowed":"pointer", transition:"all .18s",
        boxShadow:h&&!disabled?`0 0 14px ${col}55`:"none",
        width:full?"100%":"auto", opacity:disabled?0.6:1, ...sx}}>{children}</button>
  );
}

function Hdr({title, sub, col=T.accent}) {
  return (
    <div style={{marginBottom:24}}>
      <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:4}}>
        <div style={{width:4, height:24, borderRadius:2, background:col}}/>
        <h2 style={{margin:0, fontSize:21, fontWeight:800, color:T.p,
          fontFamily:"'Playfair Display',serif"}}>{title}</h2>
      </div>
      {sub && <p style={{margin:"0 0 0 14px", fontSize:13, color:T.s}}>{sub}</p>}
    </div>
  );
}

function Cd({children, sx={}, nohov}) {
  const [h,sh] = useState(false);
  return (
    <div onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
      style={{background:h&&!nohov?T.cardHover:T.card, border:`1px solid ${T.border}`,
        borderRadius:14, padding:20, transition:"all .18s",
        transform:h&&!nohov?"translateY(-2px)":"none",
        boxShadow:h&&!nohov?"0 8px 28px #00000060":"none", ...sx}}>{children}</div>
  );
}

function Chip({label, val, col}) {
  return (
    <div style={{background:T.bg, borderRadius:8, padding:"7px 10px"}}>
      <div style={{fontSize:10, color:T.m, marginBottom:1}}>{label}</div>
      <div style={{fontSize:13, fontWeight:800, color:col}}>{val}</div>
    </div>
  );
}

function Toast({msg, type="success"}) {
  if (!msg) return null;
  const col = type==="error" ? T.red : T.green;
  return (
    <div style={{position:"fixed", bottom:24, right:24, zIndex:999,
      background:T.card, border:`1.5px solid ${col}`, borderRadius:12,
      padding:"12px 20px", color:col, fontWeight:700, fontSize:14,
      boxShadow:"0 8px 32px #00000080", maxWidth:320}}>
      {type==="success"?"✅":"❌"} {msg}
    </div>
  );
}

function Spinner() {
  return (
    <div style={{display:"flex", justifyContent:"center", padding:40}}>
      <div style={{width:36, height:36, borderRadius:"50%",
        border:`3px solid ${T.border}`, borderTopColor:T.accent,
        animation:"spin 0.8s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function EmptyState({icon, msg}) {
  return (
    <div style={{textAlign:"center", padding:"48px 24px", color:T.m}}>
      <div style={{fontSize:40, marginBottom:12}}>{icon}</div>
      <div style={{fontSize:14}}>{msg}</div>
    </div>
  );
}

function StatBox({icon, label, val, col}) {
  return (
    <Cd sx={{textAlign:"center", padding:"18px 12px"}} nohov>
      <div style={{fontSize:26, marginBottom:4}}>{icon}</div>
      <div style={{fontSize:21, fontWeight:900, color:col}}>{val}</div>
      <div style={{fontSize:11, color:T.s, marginTop:2}}>{label}</div>
    </Cd>
  );
}

function Merch({col}) {
  return (
    <div style={{marginTop:36, paddingTop:24, borderTop:`1px solid ${T.border}`}}>
      <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:16}}>
        <span style={{fontSize:16}}>🛍</span>
        <span style={{fontSize:14, fontWeight:700, color:T.s}}>Film Merchandise</span>
        <span style={{fontSize:11, color:T.m}}>— Affiliate links via Amazon & Flipkart</span>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))", gap:10}}>
        {MERCH.map((m,i) => (
          <a key={i} href={m.url} target="_blank" rel="noopener noreferrer"
            style={{textDecoration:"none", display:"block", background:T.surface, borderRadius:10,
              padding:14, border:`1px solid ${T.border}`, cursor:"pointer", transition:"all .18s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=col; e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border; e.currentTarget.style.transform="none";}}>
            <div style={{fontSize:22, marginBottom:6}}>{m.e}</div>
            <div style={{fontSize:12, fontWeight:700, color:T.p, lineHeight:1.3, marginBottom:4}}>{m.name}</div>
            <div style={{fontSize:13, fontWeight:800, color:col}}>{m.price}</div>
            <div style={{fontSize:10, color:T.m}}>{m.plat}</div>
            <div style={{marginTop:8, padding:"5px", textAlign:"center", borderRadius:6,
              background:col+"22", color:col, fontSize:11, fontWeight:700}}>Buy Now →</div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
function AuthModal({onClose, onAuth}) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setLoading(true); setError("");
    try {
      if (mode === "login") {
        const {data, error} = await supabase.auth.signInWithPassword({email, password});
        if (error) throw error;
        onAuth(data.user);
      } else {
        const {data, error} = await supabase.auth.signUp({email, password});
        if (error) throw error;
        if (data.user) {
          await supabase.from("profiles").insert({id:data.user.id, full_name:name, role:"member"});
          onAuth(data.user);
        }
      }
    } catch(e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <div style={{position:"fixed", inset:0, background:"#000000CC", zIndex:500,
      display:"flex", alignItems:"center", justifyContent:"center", padding:20}}>
      <div style={{background:T.card, border:`1px solid ${T.border}`, borderRadius:18,
        padding:32, width:"100%", maxWidth:400}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
          <h2 style={{margin:0, color:T.accent, fontFamily:"'Playfair Display',serif", fontSize:22}}>
            {mode==="login"?"Welcome Back":"Join FilmConnect"}
          </h2>
          <button onClick={onClose} style={{background:"none", border:"none", color:T.s,
            fontSize:20, cursor:"pointer"}}>✕</button>
        </div>
        {mode==="register" && (
          <input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)}
            style={{...inp, marginBottom:12}}/>
        )}
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)}
          style={{...inp, marginBottom:12}}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}
          style={{...inp, marginBottom:16}}/>
        {error && <div style={{color:T.red, fontSize:12, marginBottom:12}}>❌ {error}</div>}
        <Btn col={T.accent} full disabled={loading} onClick={handleSubmit}>
          {loading?"Please wait...":(mode==="login"?"Sign In":"Create Account")}
        </Btn>
        <div style={{textAlign:"center", marginTop:14, fontSize:13, color:T.s}}>
          {mode==="login"?"Don't have an account? ":"Already have an account? "}
          <span onClick={()=>setMode(mode==="login"?"register":"login")}
            style={{color:T.accent, cursor:"pointer", fontWeight:700}}>
            {mode==="login"?"Sign Up":"Sign In"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── ARTISTS PANEL ────────────────────────────────────────────────────────────
function ArtistsPanel({user, showAuth}) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fields, setFields] = useState({
    full_name:"", stage_name:"", specialisation:"", city:"",
    experience:"", languages:"", reel_url:"", bio:""
  });

  useEffect(()=>{ fetchArtists(); }, []);

  async function fetchArtists() {
    setLoading(true);
    const {data} = await supabase.from("artists").select("*").order("created_at", {ascending:false});
    setArtists(data || []);
    setLoading(false);
  }

  async function handleSubmit() {
    if (!user) { showAuth(); return; }
    if (!fields.full_name || !fields.specialisation) {
      showToast("Please fill Full Name and Role at minimum", "error"); return;
    }
    setSubmitting(true);
    const {error} = await supabase.from("artists").insert({
      user_id: user.id, ...fields
    });
    if (error) { showToast("Error submitting: "+error.message, "error"); }
    else { showToast("Profile submitted successfully!"); setForm(false); fetchArtists(); }
    setSubmitting(false);
  }

  function showToast(msg, type="success") {
    setToast({msg, type});
    setTimeout(()=>setToast(null), 3500);
  }

  const filtered = artists.filter(a =>
    a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    a.specialisation?.toLowerCase().includes(search.toLowerCase()) ||
    a.city?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type}/>}
      <Hdr title="Artist Profiles" sub="Discover talent · Upload your profile & video reel · Connect with productions" col={T.accent}/>
      <div style={{display:"flex", gap:10, marginBottom:24, flexWrap:"wrap"}}>
        <input placeholder="🔍  Search by name, role, city…"
          value={search} onChange={e=>setSearch(e.target.value)}
          style={{...inp, flex:1, minWidth:200}}/>
        <Btn onClick={()=>{ if(!user){showAuth();return;} setForm(!form);}}>+ Upload Profile</Btn>
      </div>

      {form && (
        <Cd sx={{marginBottom:24, borderColor:T.accent+"55"}}>
          <h3 style={{margin:"0 0 16px", color:T.accent, fontFamily:"'Playfair Display',serif"}}>New Artist Profile</h3>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            {[
              ["full_name","Full Name *"],["stage_name","Stage Name"],
              ["specialisation","Role / Specialisation *"],["city","City"],
              ["experience","Years of Experience"],["languages","Languages Known"],
            ].map(([k,ph])=>(
              <input key={k} placeholder={ph} value={fields[k]} onChange={e=>setFields({...fields,[k]:e.target.value})} style={inp}/>
            ))}
          </div>
          <input placeholder="YouTube / Vimeo Reel Link" value={fields.reel_url}
            onChange={e=>setFields({...fields,reel_url:e.target.value})} style={{...inp, marginTop:10}}/>
          <textarea placeholder="Short bio (2–3 lines)" rows={3} value={fields.bio}
            onChange={e=>setFields({...fields,bio:e.target.value})}
            style={{...inp, marginTop:10, resize:"vertical"}}/>
          <div style={{display:"flex", gap:10, marginTop:16}}>
            <Btn col={T.accent} disabled={submitting} onClick={handleSubmit}>
              {submitting?"Submitting...":"Submit Profile"}
            </Btn>
            <Btn col={T.m} onClick={()=>setForm(false)}>Cancel</Btn>
          </div>
        </Cd>
      )}

      {loading ? <Spinner/> : filtered.length===0 ? (
        <EmptyState icon="🎭" msg="No artists yet. Be the first to upload your profile!"/>
      ) : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:16}}>
          {filtered.map((a,i)=>(
            <Cd key={i}>
              <div style={{display:"flex", gap:14, alignItems:"flex-start"}}>
                <div style={{width:52, height:52, borderRadius:12, background:T.accent+"22",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0}}>🎭</div>
                <div>
                  <div style={{fontWeight:800, fontSize:15, color:T.p}}>{a.full_name}</div>
                  <div style={{color:T.accent, fontSize:12, fontWeight:600, marginBottom:3}}>{a.specialisation}</div>
                  <div style={{fontSize:11, color:T.s}}>{a.city}{a.experience ? ` · ${a.experience}` : ""}</div>
                </div>
              </div>
              {a.languages && <div style={{marginTop:10}}><Badge c={a.languages} col={T.accent}/></div>}
              {a.bio && <div style={{marginTop:8, fontSize:12, color:T.s, lineHeight:1.5}}>{a.bio}</div>}
              <div style={{display:"flex", gap:8, marginTop:12}}>
                {a.reel_url ? (
                  <a href={a.reel_url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                    <Btn sm col={T.accent}>▶ View Reel</Btn>
                  </a>
                ) : <Btn sm col={T.m} disabled>No Reel</Btn>}
              </div>
            </Cd>
          ))}
        </div>
      )}
      <Merch col={T.accent}/>
    </div>
  );
}

// ─── DIRECTORS PANEL ──────────────────────────────────────────────────────────
function DirectorsPanel({user, showAuth}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fields, setFields] = useState({
    title:"", genre:"", synopsis:"", budget:"",
    funding_required:"", status:"Seeking Funding",
    poster_url:"", trailer_url:"", location:""
  });

  useEffect(()=>{ fetchProjects(); }, []);

  async function fetchProjects() {
    setLoading(true);
    const {data} = await supabase.from("projects").select("*").order("created_at", {ascending:false});
    setProjects(data || []);
    setLoading(false);
  }

  async function handleSubmit() {
    if (!user) { showAuth(); return; }
    if (!fields.title || !fields.genre) {
      showToast("Please fill Title and Genre", "error"); return;
    }
    setSubmitting(true);
    const {error} = await supabase.from("projects").insert({user_id:user.id, ...fields});
    if (error) showToast("Error: "+error.message, "error");
    else { showToast("Project submitted!"); setForm(false); fetchProjects(); }
    setSubmitting(false);
  }

  function showToast(msg, type="success") {
    setToast({msg,type}); setTimeout(()=>setToast(null), 3500);
  }

  const GENRES = ["Drama","Thriller","Romance","Action","Comedy","Horror","Documentary","Biopic"];
  const STATUSES = ["Seeking Funding","Pre-Production","In Production","Post-Production","Trailer Ready","Completed"];

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type}/>}
      <Hdr title="Director Projects" sub="Submit your project · Attract investors · Showcase your trailer" col={T.purple}/>
      <div style={{display:"flex", gap:10, marginBottom:24, flexWrap:"wrap"}}>
        <input placeholder="🔍  Search projects…" style={{...inp, flex:1, minWidth:200}}/>
        <Btn col={T.purple} onClick={()=>{ if(!user){showAuth();return;} setForm(!form);}}>+ Submit Project</Btn>
      </div>

      {form && (
        <Cd sx={{marginBottom:24, borderColor:T.purple+"55"}}>
          <h3 style={{margin:"0 0 16px", color:T.purple, fontFamily:"'Playfair Display',serif"}}>New Project Submission</h3>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            <input placeholder="Project Title *" value={fields.title} onChange={e=>setFields({...fields,title:e.target.value})} style={inp}/>
            <select value={fields.genre} onChange={e=>setFields({...fields,genre:e.target.value})} style={{...inp,cursor:"pointer"}}>
              <option value="">Select Genre *</option>
              {GENRES.map(g=><option key={g}>{g}</option>)}
            </select>
            <input placeholder="Total Budget (₹)" value={fields.budget} onChange={e=>setFields({...fields,budget:e.target.value})} style={inp}/>
            <input placeholder="Funding Required (₹)" value={fields.funding_required} onChange={e=>setFields({...fields,funding_required:e.target.value})} style={inp}/>
            <input placeholder="Shooting Location" value={fields.location} onChange={e=>setFields({...fields,location:e.target.value})} style={inp}/>
            <select value={fields.status} onChange={e=>setFields({...fields,status:e.target.value})} style={{...inp,cursor:"pointer"}}>
              {STATUSES.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <textarea placeholder="One-line synopsis *" rows={2} value={fields.synopsis}
            onChange={e=>setFields({...fields,synopsis:e.target.value})}
            style={{...inp, marginTop:10, resize:"vertical"}}/>
          <input placeholder="Movie Poster URL (Google Drive / Dropbox link)" value={fields.poster_url}
            onChange={e=>setFields({...fields,poster_url:e.target.value})} style={{...inp, marginTop:10}}/>
          <input placeholder="Trailer YouTube Link" value={fields.trailer_url}
            onChange={e=>setFields({...fields,trailer_url:e.target.value})} style={{...inp, marginTop:10}}/>
          <div style={{display:"flex", gap:10, marginTop:16}}>
            <Btn col={T.purple} disabled={submitting} onClick={handleSubmit}>
              {submitting?"Submitting...":"Submit Project"}
            </Btn>
            <Btn col={T.m} onClick={()=>setForm(false)}>Cancel</Btn>
          </div>
        </Cd>
      )}

      {loading ? <Spinner/> : projects.length===0 ? (
        <EmptyState icon="🎬" msg="No projects yet. Submit your first project!"/>
      ) : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(275px,1fr))", gap:16}}>
          {projects.map((p,i)=>(
            <Cd key={i}>
              <div style={{display:"flex", gap:14, alignItems:"flex-start", marginBottom:12}}>
                <div style={{width:56, height:76, borderRadius:8, background:T.purple+"22",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0}}>
                  {p.poster_url ? <img src={p.poster_url} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:8}} onError={e=>e.target.style.display="none"}/> : "🎬"}
                </div>
                <div>
                  <div style={{fontWeight:800, fontSize:15, color:T.p, lineHeight:1.2}}>{p.title}</div>
                  <div style={{color:T.s, fontSize:12, marginTop:3}}>{p.genre}</div>
                  <div style={{marginTop:5}}><Badge c={p.status} col={p.status==="Trailer Ready"?T.green:T.accent}/></div>
                </div>
              </div>
              {p.synopsis && <div style={{fontSize:12, color:T.s, marginBottom:10, lineHeight:1.5}}>{p.synopsis}</div>}
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12}}>
                {p.budget && <Chip label="Budget" val={p.budget} col={T.gold}/>}
                {p.location && <Chip label="Location" val={p.location} col={T.teal}/>}
              </div>
              {p.trailer_url ? (
                <a href={p.trailer_url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <Btn col={T.purple} full>▶ Watch Trailer</Btn>
                </a>
              ) : (
                <Btn col={T.purple} full>💰 Fund This Project</Btn>
              )}
            </Cd>
          ))}
        </div>
      )}
      <Merch col={T.purple}/>
    </div>
  );
}

// ─── PRODUCERS PANEL ─────────────────────────────────────────────────────────
function ProducersPanel({user, showAuth}) {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fields, setFields] = useState({
    title:"", target_budget:"", slots:"", genre:"", description:""
  });

  useEffect(()=>{ fetchPools(); }, []);

  async function fetchPools() {
    setLoading(true);
    const {data} = await supabase.from("pools").select("*").order("created_at", {ascending:false});
    setPools(data || []);
    setLoading(false);
  }

  async function handleSubmit() {
    if (!user) { showAuth(); return; }
    if (!fields.title || !fields.target_budget) {
      showToast("Please fill Pool Name and Target Budget", "error"); return;
    }
    setSubmitting(true);
    const {error} = await supabase.from("pools").insert({user_id:user.id, ...fields, backers:0, raised:"₹0"});
    if (error) showToast("Error: "+error.message, "error");
    else { showToast("Pool created!"); setForm(false); fetchPools(); }
    setSubmitting(false);
  }

  function showToast(msg, type="success") {
    setToast({msg,type}); setTimeout(()=>setToast(null), 3500);
  }

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type}/>}
      <Hdr title="Co-Production Hub" sub="Pool budgets · Back new directors & artists · Build films together" col={T.teal}/>
      <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28}}>
        <StatBox icon="🤝" label="Active Pools"     val={pools.length}  col={T.teal}/>
        <StatBox icon="💰" label="Total Pooled"     val="₹0"            col={T.gold}/>
        <StatBox icon="🎬" label="Projects Backed"  val="0"             col={T.purple}/>
        <StatBox icon="🎯" label="Avg Pool Size"    val="—"             col={T.green}/>
      </div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:10}}>
        <Hdr title="Active Investment Pools" col={T.teal}/>
        <Btn col={T.teal} onClick={()=>{ if(!user){showAuth();return;} setForm(!form);}}>+ Create Pool</Btn>
      </div>

      {form && (
        <Cd sx={{marginBottom:24, borderColor:T.teal+"55"}}>
          <h3 style={{margin:"0 0 16px", color:T.teal, fontFamily:"'Playfair Display',serif"}}>New Co-Production Pool</h3>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            <input placeholder="Pool Name *" value={fields.title} onChange={e=>setFields({...fields,title:e.target.value})} style={inp}/>
            <input placeholder="Target Budget (₹) *" value={fields.target_budget} onChange={e=>setFields({...fields,target_budget:e.target.value})} style={inp}/>
            <input placeholder="Open Slots (number)" value={fields.slots} onChange={e=>setFields({...fields,slots:e.target.value})} style={inp}/>
            <input placeholder="Genre Focus" value={fields.genre} onChange={e=>setFields({...fields,genre:e.target.value})} style={inp}/>
          </div>
          <textarea placeholder="Pool description — what kind of projects are you backing?" rows={3}
            value={fields.description} onChange={e=>setFields({...fields,description:e.target.value})}
            style={{...inp, marginTop:10, resize:"vertical"}}/>
          <div style={{display:"flex", gap:10, marginTop:16}}>
            <Btn col={T.teal} disabled={submitting} onClick={handleSubmit}>
              {submitting?"Creating...":"Create Pool"}
            </Btn>
            <Btn col={T.m} onClick={()=>setForm(false)}>Cancel</Btn>
          </div>
        </Cd>
      )}

      {loading ? <Spinner/> : pools.length===0 ? (
        <EmptyState icon="💼" msg="No pools yet. Create the first co-production pool!"/>
      ) : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(265px,1fr))", gap:16}}>
          {pools.map((pool,i)=>(
            <Cd key={i}>
              <div style={{fontWeight:800, fontSize:15, color:T.p, marginBottom:8}}>{pool.title}</div>
              {pool.genre && <div style={{marginBottom:10}}><Badge c={pool.genre} col={T.teal}/></div>}
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10}}>
                <Chip label="Target"     val={pool.target_budget} col={T.gold}/>
                <Chip label="Raised"     val={pool.raised||"₹0"}  col={T.teal}/>
                <Chip label="Backers"    val={pool.backers||0}     col={T.purple}/>
                <Chip label="Open Slots" val={pool.slots||"—"}     col={T.green}/>
              </div>
              {pool.description && <div style={{fontSize:12, color:T.s, marginBottom:12, lineHeight:1.5}}>{pool.description}</div>}
              <Btn col={T.teal} full>Join This Pool</Btn>
            </Cd>
          ))}
        </div>
      )}

      <div style={{marginTop:32}}>
        <Hdr title="How Co-Production Works" col={T.teal}/>
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16}}>
          {[
            {n:"01", t:"Create or Join a Pool",  d:"Start your own pool or browse active ones. Set your budget and terms.", col:T.teal},
            {n:"02", t:"Choose a Project",        d:"Browse director submissions. Vote as a pool on which projects to back.", col:T.gold},
            {n:"03", t:"Track & Earn",             d:"Monitor milestones, receive updates, and share distribution revenues.", col:T.green},
          ].map(s=>(
            <Cd key={s.n} nohov>
              <div style={{fontSize:36, fontWeight:900, color:s.col+"44",
                fontFamily:"'Playfair Display',serif", marginBottom:8}}>{s.n}</div>
              <div style={{fontWeight:800, fontSize:15, color:T.p, marginBottom:6}}>{s.t}</div>
              <div style={{fontSize:13, color:T.s, lineHeight:1.5}}>{s.d}</div>
            </Cd>
          ))}
        </div>
      </div>
      <Merch col={T.teal}/>
    </div>
  );
}

// ─── TECHNICIANS PANEL ────────────────────────────────────────────────────────
function TechniciansPanel({user, showAuth}) {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [craft, setCraft] = useState("Cinematography");
  const [form, setForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [fields, setFields] = useState({
    full_name:"", craft:"", experience:"", city:"",
    daily_rate:"", showreel_url:"", available:true
  });

  useEffect(()=>{ fetchTechs(); }, [craft]);

  async function fetchTechs() {
    setLoading(true);
    const {data} = await supabase.from("technicians").select("*")
      .eq("craft", craft).order("created_at", {ascending:false});
    setTechs(data || []);
    setLoading(false);
  }

  async function handleSubmit() {
    if (!user) { showAuth(); return; }
    if (!fields.full_name || !fields.craft) {
      showToast("Please fill Name and Craft", "error"); return;
    }
    setSubmitting(true);
    const {error} = await supabase.from("technicians").insert({user_id:user.id, ...fields});
    if (error) showToast("Error: "+error.message, "error");
    else { showToast("Portfolio submitted!"); setForm(false); fetchTechs(); }
    setSubmitting(false);
  }

  function showToast(msg, type="success") {
    setToast({msg,type}); setTimeout(()=>setToast(null),3500);
  }

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type}/>}
      <Hdr title="24 Crafts of Filmmaking" sub="Upload portfolio · Find work · Hire crew for your production" col={T.blue}/>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:12, color:T.s, marginBottom:10}}>Select a craft:</div>
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          {CRAFTS.map(c=>(
            <button key={c} onClick={()=>setCraft(c)}
              style={{padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer",
                border:`1px solid ${craft===c?T.blue:T.border}`,
                background:craft===c?T.blue+"22":"transparent",
                color:craft===c?T.blue:T.s, transition:"all .15s", fontFamily:"inherit"}}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10}}>
        <h3 style={{margin:0, color:T.blue, fontFamily:"'Playfair Display',serif"}}>{craft} Professionals</h3>
        <Btn col={T.blue} onClick={()=>{ if(!user){showAuth();return;} setForm(!form);}}>+ Upload Portfolio</Btn>
      </div>

      {form && (
        <Cd sx={{marginBottom:24, borderColor:T.blue+"55"}}>
          <h3 style={{margin:"0 0 16px", color:T.blue, fontFamily:"'Playfair Display',serif"}}>Upload Your Portfolio</h3>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            <input placeholder="Full Name *" value={fields.full_name} onChange={e=>setFields({...fields,full_name:e.target.value})} style={inp}/>
            <select value={fields.craft} onChange={e=>setFields({...fields,craft:e.target.value})} style={{...inp,cursor:"pointer"}}>
              <option value="">Select Craft *</option>
              {CRAFTS.map(c=><option key={c}>{c}</option>)}
            </select>
            <input placeholder="Years of Experience" value={fields.experience} onChange={e=>setFields({...fields,experience:e.target.value})} style={inp}/>
            <input placeholder="City" value={fields.city} onChange={e=>setFields({...fields,city:e.target.value})} style={inp}/>
            <input placeholder="Daily Rate (₹)" value={fields.daily_rate} onChange={e=>setFields({...fields,daily_rate:e.target.value})} style={inp}/>
            <input placeholder="Showreel / Portfolio Link" value={fields.showreel_url} onChange={e=>setFields({...fields,showreel_url:e.target.value})} style={inp}/>
          </div>
          <div style={{marginTop:12, display:"flex", alignItems:"center", gap:10}}>
            <input type="checkbox" id="avail" checked={fields.available} onChange={e=>setFields({...fields,available:e.target.checked})}/>
            <label htmlFor="avail" style={{fontSize:13, color:T.s, cursor:"pointer"}}>Currently available for work</label>
          </div>
          <div style={{display:"flex", gap:10, marginTop:16}}>
            <Btn col={T.blue} disabled={submitting} onClick={handleSubmit}>
              {submitting?"Submitting...":"Submit Portfolio"}
            </Btn>
            <Btn col={T.m} onClick={()=>setForm(false)}>Cancel</Btn>
          </div>
        </Cd>
      )}

      {loading ? <Spinner/> : techs.length===0 ? (
        <EmptyState icon="🎞" msg={`No ${craft} professionals yet. Be the first!`}/>
      ) : (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14}}>
          {techs.map((t,i)=>(
            <Cd key={i}>
              <div style={{fontWeight:700, fontSize:15, color:T.p, marginBottom:3}}>{t.full_name}</div>
              <div style={{color:T.blue, fontSize:12, marginBottom:6}}>{t.craft}</div>
              <div style={{fontSize:11, color:T.s, marginBottom:8}}>
                {t.city}{t.experience?` · ${t.experience}`:""}{t.daily_rate?` · ${t.daily_rate}/day`:""}
              </div>
              <Badge c={t.available?"✓ Available":"Busy"} col={t.available?T.green:T.red}/>
              {t.showreel_url && (
                <a href={t.showreel_url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                  <Btn col={T.blue} full sm style={{marginTop:10}}>View Portfolio</Btn>
                </a>
              )}
            </Cd>
          ))}
        </div>
      )}
      <Merch col={T.blue}/>
    </div>
  );
}

// ─── EDUCATION PANEL ──────────────────────────────────────────────────────────
function EducationPanel({user, showAuth}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("courses");

  useEffect(()=>{ if(tab==="courses") fetchCourses(); }, [tab]);

  async function fetchCourses() {
    setLoading(true);
    const {data} = await supabase.from("courses").select("*").order("created_at",{ascending:false});
    setCourses(data || []);
    setLoading(false);
  }

  return (
    <div>
      <Hdr title="Learn · Grow · Distribute" sub="Courses, live classes, distribution listings & OTT pitching" col={T.green}/>
      <div style={{display:"flex", gap:8, marginBottom:28, flexWrap:"wrap"}}>
        {[
          {id:"courses", label:"📚 Courses & Classes"},
          {id:"dist",    label:"🎟 Theater Distribution"},
          {id:"ott",     label:"📺 OTT Pitching"},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:700,
              border:`1.5px solid ${tab===t.id?T.green:T.border}`,
              background:tab===t.id?T.green+"22":"transparent",
              color:tab===t.id?T.green:T.s, cursor:"pointer", fontFamily:"inherit", transition:"all .18s"}}>
            {t.label}
          </button>
        ))}
      </div>

      {tab==="courses" && (
        <div>
          {loading ? <Spinner/> : courses.length===0 ? (
            <EmptyState icon="🎓" msg="No courses yet. Check back soon!"/>
          ) : (
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(275px,1fr))", gap:16, marginBottom:28}}>
              {courses.map((c,i)=>(
                <Cd key={i}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10}}>
                    <Badge c={c.type||"Course"} col={c.type==="Live Batch"?T.red:T.green}/>
                    <span style={{fontWeight:800, color:T.green, fontSize:15}}>{c.price}</span>
                  </div>
                  <div style={{fontWeight:800, fontSize:15, color:T.p, marginBottom:4, lineHeight:1.3}}>{c.title}</div>
                  <div style={{fontSize:12, color:T.s, marginBottom:6}}>by {c.instructor} · {c.duration}</div>
                  <div style={{fontSize:11, color:T.m, marginBottom:14}}>👥 {(c.enrolled||0).toLocaleString()} enrolled</div>
                  <Btn col={T.green} full>Enroll Now</Btn>
                </Cd>
              ))}
            </div>
          )}
          <Cd nohov sx={{background:T.green+"0E", borderColor:T.green+"44"}}>
            <h3 style={{margin:"0 0 8px", color:T.green, fontFamily:"'Playfair Display',serif"}}>Teach on FilmConnect</h3>
            <p style={{margin:"0 0 14px", fontSize:13, color:T.s}}>Are you a film professional? Host pre-recorded courses or live batches and earn from your expertise.</p>
            <Btn col={T.green}>Apply as Instructor</Btn>
          </Cd>
        </div>
      )}

      {tab==="dist" && (
        <div>
          <div style={{display:"flex", gap:10, marginBottom:20, flexWrap:"wrap"}}>
            <input placeholder="🔍  Filter by region…" style={{...inp, flex:1, minWidth:200}}/>
            <Btn col={T.green}>+ Submit Your Film</Btn>
          </div>
          <div style={{overflowX:"auto", borderRadius:12, border:`1px solid ${T.border}`, marginBottom:24}}>
            <table style={{width:"100%", borderCollapse:"collapse", fontSize:13}}>
              <thead>
                <tr style={{background:T.surface}}>
                  {["Region","Theaters","Distributor","Booking Cost","Commission","Action"].map(h=>(
                    <th key={h} style={{padding:"12px 16px", textAlign:"left", color:T.m,
                      fontWeight:700, fontSize:11, letterSpacing:".08em", textTransform:"uppercase",
                      borderBottom:`1px solid ${T.border}`}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DIST_DATA.map((r,i)=>(
                  <tr key={i} style={{borderBottom:`1px solid ${T.border}22`}}
                    onMouseEnter={e=>e.currentTarget.style.background=T.card}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{padding:"13px 16px", color:T.p, fontWeight:700}}>{r.region}</td>
                    <td style={{padding:"13px 16px", color:T.green, fontWeight:700}}>{r.theaters}</td>
                    <td style={{padding:"13px 16px", color:T.s}}>{r.dist}</td>
                    <td style={{padding:"13px 16px", color:T.gold}}>{r.cost}</td>
                    <td style={{padding:"13px 16px"}}><Badge c={r.comm} col={T.teal}/></td>
                    <td style={{padding:"13px 16px"}}><Btn sm col={T.green}>Enquire</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14}}>
            <StatBox icon="🎭" label="Partner Theaters"    val="357+" col={T.green}/>
            <StatBox icon="🤝" label="Active Distributors" val="42"   col={T.teal}/>
            <StatBox icon="🎬" label="Films Released"      val="180+" col={T.purple}/>
          </div>
        </div>
      )}

      {tab==="ott" && (
        <div>
          <div style={{background:T.green+"11", borderRadius:12, padding:"16px 20px",
            border:`1px solid ${T.green}33`, marginBottom:24}}>
            <div style={{fontSize:14, color:T.green, fontWeight:700, marginBottom:4}}>📋 How to Submit Your Film to OTT</div>
            <div style={{fontSize:13, color:T.s, lineHeight:1.6}}>
              Prepare: full master file (DCP/ProRes), subtitles, 4K poster art, trailer, chain-of-title documents, and a one-page synopsis. Then click Submit Film on any platform below.
            </div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(248px,1fr))", gap:16}}>
            {OTT_DATA.map((o,i)=>(
              <Cd key={i}>
                <div style={{fontWeight:800, fontSize:16, color:T.p, marginBottom:6}}>{o.name}</div>
                <Badge c={o.type} col={T.green}/>
                <div style={{marginTop:14, display:"flex", flexDirection:"column", gap:8}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:T.m}}>Accepts</span><span style={{fontSize:11,color:T.s}}>{o.genres}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:T.m}}>Timeline</span><span style={{fontSize:11,color:T.s}}>{o.wks} weeks</span></div>
                  <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:T.m}}>Contact</span><span style={{fontSize:11,color:T.s}}>{o.email}</span></div>
                </div>
                <Btn col={T.green} full style={{marginTop:14}}>Submit Film →</Btn>
              </Cd>
            ))}
          </div>
        </div>
      )}
      <Merch col={T.green}/>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("artists");
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(()=>{
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;700;800&display=swap";
    document.head.appendChild(link);

    supabase.auth.getSession().then(({data:{session}})=>{
      if (session) setUser(session.user);
    });
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_,session)=>{
      setUser(session?.user || null);
    });
    return ()=> subscription.unsubscribe();
  },[]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  const cur = CATEGORIES.find(c=>c.id===active);
  const panelProps = {user, showAuth:()=>setShowAuthModal(true)};

  return (
    <div style={{minHeight:"100vh", background:T.bg, fontFamily:"'DM Sans',sans-serif", color:T.p}}>

      {showAuthModal && (
        <AuthModal
          onClose={()=>setShowAuthModal(false)}
          onAuth={(u)=>{ setUser(u); setShowAuthModal(false); }}
        />
      )}

      {/* ── Header ── */}
      <div style={{position:"sticky", top:0, zIndex:200, background:T.surface+"EE",
        backdropFilter:"blur(12px)", borderBottom:`1px solid ${T.border}`}}>
        <div style={{maxWidth:1280, margin:"0 auto", padding:"0 24px",
          display:"flex", alignItems:"center", justifyContent:"space-between", height:58}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <div style={{width:34, height:34, borderRadius:9, background:T.accent,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:18}}>🎬</div>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:18, color:T.accent}}>FilmConnect</div>
              <div style={{fontSize:9, color:T.m, letterSpacing:".12em", marginTop:-2}}>INDIA</div>
            </div>
          </div>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <Badge c="🟢 Live" col={T.green}/>
            {user ? (
              <div style={{display:"flex", alignItems:"center", gap:10}}>
                <span style={{fontSize:12, color:T.s}}>👤 {user.email?.split("@")[0]}</span>
                <Btn col={T.m} sm onClick={handleSignOut}>Sign Out</Btn>
              </div>
            ) : (
              <Btn col={T.accent} onClick={()=>setShowAuthModal(true)}>Sign Up Free</Btn>
            )}
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <div style={{background:`radial-gradient(ellipse at 20% 50%,${T.accent}08 0%,transparent 60%),radial-gradient(ellipse at 80% 50%,${T.purple}08 0%,transparent 60%),${T.bg}`,
        padding:"44px 24px 32px", borderBottom:`1px solid ${T.border}`}}>
        <div style={{maxWidth:1280, margin:"0 auto"}}>
          <div style={{textAlign:"center", marginBottom:32}}>
            <h1 style={{fontFamily:"'Playfair Display',serif", fontWeight:900, margin:"0 0 10px",
              fontSize:"clamp(24px,4.5vw,46px)", lineHeight:1.15}}>
              India's Film Industry{" "}
              <span style={{background:`linear-gradient(135deg,${T.accent},${T.gold})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>Superplatform</span>
            </h1>
            <p style={{color:T.s, fontSize:15, maxWidth:560, margin:"0 auto", lineHeight:1.6}}>
              Artists · Directors · Producers · 24 Crafts · Education & Distribution
            </p>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10}}>
            {CATEGORIES.map(cat=>(
              <button key={cat.id} onClick={()=>setActive(cat.id)}
                style={{background:active===cat.id?cat.color+"18":T.card,
                  border:`1.5px solid ${active===cat.id?cat.color:T.border}`,
                  borderRadius:14, padding:"16px 10px", cursor:"pointer", transition:"all .2s",
                  textAlign:"center", fontFamily:"inherit",
                  boxShadow:active===cat.id?`0 0 20px ${cat.color}30`:"none",
                  transform:active===cat.id?"translateY(-3px)":"none"}}>
                <div style={{fontSize:24, marginBottom:5}}>{cat.icon}</div>
                <div style={{fontWeight:800, fontSize:13, color:active===cat.id?cat.color:T.p}}>{cat.label}</div>
                <div style={{fontSize:10, color:T.m, marginTop:3, lineHeight:1.4}}>{cat.tagline}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div style={{background:cur.color+"0D", borderBottom:`1px solid ${cur.color}2A`, padding:"9px 24px"}}>
        <div style={{maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", gap:10}}>
          <span style={{fontSize:16}}>{cur.icon}</span>
          <span style={{fontWeight:700, color:cur.color, fontSize:13}}>{cur.label}</span>
          <span style={{color:T.m, fontSize:12}}>—</span>
          <span style={{color:T.s, fontSize:12}}>{cur.tagline}</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{maxWidth:1280, margin:"0 auto", padding:"36px 24px"}}>
        {active==="artists"     && <ArtistsPanel     {...panelProps}/>}
        {active==="directors"   && <DirectorsPanel   {...panelProps}/>}
        {active==="producers"   && <ProducersPanel   {...panelProps}/>}
        {active==="technicians" && <TechniciansPanel {...panelProps}/>}
        {active==="education"   && <EducationPanel   {...panelProps}/>}
      </div>

      {/* ── Footer ── */}
      <div style={{background:T.surface, borderTop:`1px solid ${T.border}`, padding:"28px 24px", textAlign:"center"}}>
        <div style={{fontFamily:"'Playfair Display',serif", color:T.accent, fontWeight:900, fontSize:18, marginBottom:6}}>FilmConnect India</div>
        <div style={{fontSize:12, color:T.m, maxWidth:600, margin:"0 auto", lineHeight:1.6}}>
          Affiliate merchandise links powered by Amazon Associates & Flipkart Partner Program.
          Revenue supports platform maintenance and community features.
        </div>
        <div style={{display:"flex", justifyContent:"center", gap:20, marginTop:14, flexWrap:"wrap"}}>
          {["Privacy Policy","Terms of Use","Contact Us","Advertise","Help / FAQ"].map(l=>(
            <span key={l} style={{fontSize:12, color:T.m, cursor:"pointer"}}
              onMouseEnter={e=>e.target.style.color=T.s}
              onMouseLeave={e=>e.target.style.color=T.m}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
