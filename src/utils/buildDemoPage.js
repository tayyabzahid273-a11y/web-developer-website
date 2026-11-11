const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Base Styles
const baseStyles = `
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;line-height:1.6;overflow-x:hidden;background:#0f172a;color:#e2e8f0}
h1,h2,h3{font-family:'Space Grotesk',system-ui,sans-serif;letter-spacing:-0.02em;line-height:1.12;font-weight:700}
a{color:inherit;text-decoration:none}
.container{max-width:1100px;margin:0 auto;padding:0 5vw}
.btn{display:inline-block;border-radius:8px;padding:14px 28px;font-weight:600;font-size:15px;border:0;cursor:pointer;transition:all .3s ease;position:relative;overflow:hidden}
.btn-primary{background:#3b82f6;color:#fff;box-shadow:0 4px 15px rgba(59,130,246,.4)}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(59,130,246,.6);background:#2563eb}
.btn-outline{background:transparent;color:#3b82f6;border:2px solid #3b82f6}
.btn-outline:hover{background:#3b82f6;color:#fff}

/* Navbar */
.nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:16px 5vw;background:rgba(15,23,42,.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.05)}
.brand{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk';font-weight:700;font-size:18px;color:#fff}
.brand .logo{width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:grid;place-items:center;font-size:20px}
.links{display:flex;gap:30px;font-size:14px;font-weight:500;color:#94a3b8}
.links a{transition:color .2s}
.links a:hover{color:#fff}
@media(max-width:768px){.links{display:none}}

/* Animations */
@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes glow { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.reveal { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }

/* Background Mesh */
.bg-mesh { position: fixed; inset: 0; z-index: -1; background: radial-gradient(circle at 15% 50%, rgba(59,130,246,0.15), transparent 25%), radial-gradient(circle at 85% 30%, rgba(139,92,246,0.15), transparent 25%); pointer-events: none; }
`;

// 1. SaaS / Dev Tool Template (Dark Mode + Glow)
const saasTemplate = (name, logo, cat) => `
<div class="bg-mesh"></div>
<nav class="nav">
  <a class="brand" href="#top"><span class="logo">${logo}</span>${name}</a>
  <div class="links"><a href="#features">Features</a><a href="#docs">Docs</a><a href="#pricing">Pricing</a></div>
  <a class="btn btn-primary" href="#features">Get Started</a>
</nav>
<header class="container" style="padding-top:160px;padding-bottom:80px;text-align:center">
  <div class="reveal" style="display:inline-block;padding:6px 16px;border-radius:999px;background:rgba(59,130,246,0.1);color:#60a5fa;font-size:13px;font-weight:600;margin-bottom:24px;border:1px solid rgba(59,130,246,0.2)">
    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#60a5fa;margin-right:8px;animation:glow 2s infinite"></span>
    ${cat} · Live Demo
  </div>
  <h1 class="reveal delay-1" style="font-size:clamp(40px,7vw,72px);margin-bottom:24px;background:linear-gradient(180deg,#fff,#94a3b8);-webkit-background-clip:text;-webkit-text-fill-color:transparent">
    Build faster with ${name}
  </h1>
  <p class="reveal delay-2" style="font-size:18px;color:#94a3b8;max-width:600px;margin:0 auto 40px">
    The developer-first platform for building, deploying, and scaling modern web applications.
  </p>
  <div class="reveal delay-3" style="display:flex;gap:16px;justify-content:center">
    <a class="btn btn-primary" href="#">Deploy Now</a>
    <a class="btn btn-outline" href="#">Read Docs</a>
  </div>
</header>
<div class="container" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;padding-bottom:100px">
  <div class="reveal delay-1" style="background:rgba(30,41,59,0.5);border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:30px;transition:transform .3s" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
    <div style="font-size:32px;margin-bottom:16px">⚡</div>
    <h3 style="font-size:20px;color:#fff;margin-bottom:10px">Instant Deploys</h3>
    <p style="color:#94a3b8;font-size:15px">Push to Git and we handle the rest. Zero config.</p>
  </div>
  <div class="reveal delay-2" style="background:rgba(30,41,59,0.5);border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:30px;transition:transform .3s" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
    <div style="font-size:32px;margin-bottom:16px">🔒</div>
    <h3 style="font-size:20px;color:#fff;margin-bottom:10px">Secure by Default</h3>
    <p style="color:#94a3b8;font-size:15px">Enterprise-grade security out of the box.</p>
  </div>
  <div class="reveal delay-3" style="background:rgba(30,41,59,0.5);border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:30px;transition:transform .3s" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
    <div style="font-size:32px;margin-bottom:16px">📈</div>
    <h3 style="font-size:20px;color:#fff;margin-bottom:10px">Global Edge</h3>
    <p style="color:#94a3b8;font-size:15px">Deploy to 30+ regions with one click.</p>
  </div>
</div>
<footer style="padding:40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);color:#64748b">© ${name} · ${cat} demo page</footer>
`;

// 2. E-commerce / Store Template (Modern + Trust)
const ecommerceTemplate = (name, logo, cat) => `
<style>
:root{--bg:#ffffff;--text:#111827;--accent:#ec4899;--accent-hover:#db2777;--card:#ffffff;--nav:rgba(255,255,255,.9);--border:#f3f4f6}
body{background:var(--bg);color:var(--text)}
.nav{background:var(--nav);border-bottom:1px solid var(--border)}
.brand .logo{background:#fce7f3;color:#be185d}
.links{color:#6b7280}
.links a:hover{color:#ec4899}
.btn-primary{background:var(--accent);color:#fff;box-shadow:0 4px 14px rgba(236,72,153,.3)}
.btn-primary:hover{background:var(--accent-hover)}
.hero{background:linear-gradient(135deg,#fdf2f8 0%,#fff 100%);padding:140px 5vw 80px;text-align:center}
.hero h1{color:#111827;font-size:clamp(36px,5vw,56px)}
.hero p{color:#4b5563}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:30px;max-width:1100px;margin:0 auto;padding:0 5vw 80px}
.card{background:var(--card);border-radius:20px;overflow:hidden;border:1px solid var(--border);box-shadow:0 4px 20px rgba(0,0,0,0.03);transition:all .3s}
.card:hover{transform:translateY(-5px);box-shadow:0 12px 30px rgba(0,0,0,0.08);border-color:#fbcfe8}
.p-img{height:240px;display:grid;place-items:center;font-size:60px;background:#fdf2f8}
.p-info{padding:24px}
.p-price{color:var(--accent);font-weight:700;font-size:20px;margin:10px 0}
.btn-add{display:block;text-align:center;background:#fdf2f8;color:var(--accent);padding:12px;border-radius:12px;font-weight:600;transition:background .2s}
.btn-add:hover{background:#fce7f3}
</style>
<nav class="nav"><a class="brand" href="#top"><span class="logo">${logo}</span>${name}</a>
<div class="links"><a href="#shop">Shop</a><a href="#about">About</a></div>
<a class="btn btn-primary" href="#shop">Cart (0)</a></nav>
<header class="hero" id="top">
  <h1 class="reveal">Discover our latest collection</h1>
  <p class="reveal delay-1" style="margin-top:20px;margin-bottom:30px;font-size:18px">Hand-picked products designed to elevate your everyday.</p>
</header>
<div class="grid" id="shop">
  <div class="card reveal"><div class="p-img">👕</div><div class="p-info"><h3 style="color:#111827">Premium T-Shirt</h3><div class="p-price">$29.99</div><a href="#" class="btn-add">Add to Cart</a></div></div>
  <div class="card reveal delay-1"><div class="p-img">👟</div><div class="p-info"><h3 style="color:#111827">Running Shoes</h3><div class="p-price">$89.99</div><a href="#" class="btn-add">Add to Cart</a></div></div>
  <div class="card reveal delay-2"><div class="p-img">🎒</div><div class="p-info"><h3 style="color:#111827">Travel Backpack</h3><div class="p-price">$59.99</div><a href="#" class="btn-add">Add to Cart</a></div></div>
</div>
<footer style="padding:40px;text-align:center;border-top:1px solid var(--border);color:#9ca3af">© ${name} · ${cat} demo page</footer>
`;

// 3. Agency / Branding Template (Premium Dark + Gold)
const agencyTemplate = (name, logo, cat) => `
<style>
:root{--bg:#0a0a0a;--text:#f5f5f5;--accent:#d4af37;--accent-hover:#fbbf24;--card:#141414;--nav:rgba(10,10,10,.9);--border:#262626}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif}
.nav{background:var(--nav);border-bottom:1px solid var(--border)}
.brand .logo{background:#262626;color:var(--accent)}
.links{color:#a3a3a3}
.links a:hover{color:var(--accent)}
.btn-primary{background:var(--accent);color:#000;box-shadow:0 4px 14px rgba(212,175,55,.2)}
.btn-primary:hover{background:var(--accent-hover)}
.hero{padding:180px 5vw 100px;max-width:900px;margin:0 auto}
.hero h1{font-size:clamp(48px,8vw,90px);margin-bottom:30px;color:#fff;line-height:1.1}
.hero h1 span{color:var(--accent);font-style:italic}
.hero p{font-size:20px;color:#a3a3a3;max-width:600px}
.section{background:var(--card);border-radius:30px;padding:80px;margin:0 5vw;border:1px solid var(--border);position:relative;overflow:hidden}
.flex{display:flex;gap:60px;align-items:center;justify-content:space-between;flex-wrap:wrap;position:relative;z-index:2}
.flex h2{font-size:42px;margin-bottom:24px;color:#fff}
.list{list-style:none;display:grid;gap:20px}
.list li{display:flex;gap:16px;font-size:18px;color:#d4d4d4;align-items:center}
.list li span{color:var(--accent);font-size:24px}
.glow-box{position:absolute;right:-100px;top:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(212,175,55,0.15),transparent 70%);border-radius:50%}
</style>
<nav class="nav"><a class="brand" href="#top"><span class="logo">${logo}</span>${name}</a>
<div class="links"><a href="#work">Work</a><a href="#services">Services</a></div>
<a class="btn btn-primary" href="#contact">Contact Us</a></nav>
<header class="hero" id="top">
  <h1 class="reveal">We craft <span>digital</span> experiences that matter.</h1>
  <p class="reveal delay-1">Award-winning design studio specializing in branding, UI/UX, and web development for ambitious brands.</p>
</header>
<section class="section reveal delay-2">
  <div class="glow-box"></div>
  <div class="flex">
    <div style="flex:1;min-width:300px">
      <h2>Our Process</h2>
      <ul class="list">
        <li><span>✦</span> Discover & Research</li>
        <li><span>✦</span> Wireframe & Prototype</li>
        <li><span>✦</span> Design & Develop</li>
        <li><span>✦</span> Launch & Support</li>
      </ul>
    </div>
    <div style="flex:1;min-width:300px;height:350px;background:linear-gradient(135deg,#141414,#262626);border-radius:24px;border:1px solid #333;display:grid;place-items:center;font-size:80px;box-shadow:inset 0 0 50px rgba(0,0,0,0.5)">${logo}</div>
  </div>
</section>
<footer style="padding:40px;text-align:center;color:#525252;margin-top:60px">© ${name} · ${cat} demo page</footer>
`;

// 4. Full-Stack Template (Code Editor Vibe)
const fullStackTemplate = (name, logo, cat) => `
<style>
:root{--bg:#1e1e1e;--text:#d4d4d4;--accent:#007acc;--accent-hover:#0098ff;--card:#252526;--nav:rgba(30,30,30,.95);--border:#333}
body{background:var(--bg);color:var(--text);font-family:'Consolas','Courier New',monospace}
.nav{background:var(--nav);border-bottom:1px solid var(--border)}
.brand .logo{background:var(--card);color:var(--accent);font-family:sans-serif}
.links{color:#858585}
.links a:hover{color:#fff}
.btn-primary{background:var(--accent);color:#fff;font-family:inherit}
.btn-primary:hover{background:var(--accent-hover)}
.hero{padding:140px 5vw 60px;max-width:900px;margin:0 auto}
.hero h1{font-size:clamp(36px,6vw,60px);margin-bottom:20px;color:#fff;font-family:sans-serif}
.hero p{font-size:18px;color:#858585;max-width:600px;font-family:sans-serif}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:1000px;margin:0 auto;padding:0 5vw 80px}
@media(max-width:768px){.grid{grid-template-columns:1fr}}
.panel{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:30px}
.panel h3{color:#fff;font-family:sans-serif;font-size:20px;margin-bottom:10px}
.panel p{color:#858585;font-family:sans-serif;font-size:15px}
.code{background:#1e1e1e;border:1px solid var(--border);border-radius:8px;padding:30px;font-size:15px;line-height:1.8;overflow-x:auto;box-shadow:0 20px 40px rgba(0,0,0,0.3)}
.kw{color:#569cd6}.str{color:#ce9178}.fn{color:#dcdcaa}.var{color:#9cdcfe}.com{color:#6a9955}
</style>
<nav class="nav"><a class="brand" href="#top"><span class="logo">${logo}</span>${name}</a>
<div class="links"><a href="#api">API</a><a href="#docs">Docs</a></div>
<a class="btn btn-primary" href="#api">Deploy Now</a></nav>
<header class="hero" id="top">
  <h1 class="reveal">Scalable backends.<br/>Beautiful frontends.</h1>
  <p class="reveal delay-1">We build full-stack applications that are secure, fast, and ready to scale. Powered by Node.js, React, and Prisma.</p>
</header>
<div class="grid">
  <div class="code reveal delay-2">
    <span class="com">// server.js</span><br/>
    <span class="kw">import</span> express <span class="kw">from</span> <span class="str">'express'</span>;<br/>
    <span class="kw">import</span> { PrismaClient } <span class="kw">from</span> <span class="str">'@prisma/client'</span>;<br/><br/>
    <span class="kw">const</span> <span class="var">app</span> = <span class="fn">express</span>();<br/>
    <span class="kw">const</span> <span class="var">prisma</span> = <span class="kw">new</span> <span class="fn">PrismaClient</span>();<br/><br/>
    <span class="var">app</span>.<span class="fn">get</span>(<span class="str">'/api/users'</span>, <span class="kw">async</span> (req, res) => {<br/>
    &nbsp;&nbsp;<span class="kw">const</span> <span class="var">users</span> = <span class="kw">await</span> <span class="var">prisma</span>.<span class="var">user</span>.<span class="fn">findMany</span>();<br/>
    &nbsp;&nbsp;<span class="var">res</span>.<span class="fn">json</span>(<span class="var">users</span>);<br/>
    });
  </div>
  <div style="display:flex;flex-direction:column;gap:24px">
    <div class="panel reveal"><h3>RESTful API</h3><p>Robust Express backend with Prisma ORM and PostgreSQL.</p></div>
    <div class="panel reveal delay-1"><h3>React Frontend</h3><p>Interactive UI built with React, Tailwind CSS, and Framer Motion.</p></div>
    <div class="panel reveal delay-2"><h3>Database Ready</h3><p>PostgreSQL and Supabase integration for reliable data storage.</p></div>
  </div>
</div>
<footer style="padding:40px;text-align:center;border-top:1px solid var(--border);color:#858585">© ${name} · ${cat} demo page</footer>
`;

// 5. Portfolio Template (Creative & Clean)
const portfolioTemplate = (name, logo, cat) => `
<style>
:root{--bg:#fafaf9;--text:#1c1917;--accent:#ea580c;--accent-hover:#c2410c;--card:#ffffff;--nav:rgba(250,250,249,.9);--border:#e7e5e4}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif}
.nav{background:var(--nav);border-bottom:1px solid var(--border)}
.brand .logo{background:#ffedd5;color:#c2410c}
.links{color:#78716c}
.links a:hover{color:var(--accent)}
.hero{padding:160px 5vw 80px;max-width:900px;margin:0 auto;text-align:center}
.hero h1{font-size:clamp(48px,8vw,80px);margin-bottom:24px;line-height:1.1}
.hero h1 span{color:var(--accent)}
.hero p{font-size:20px;color:#78716c;max-width:600px;margin:0 auto 40px}
.projects{max-width:900px;margin:0 auto;padding:0 5vw 100px;display:grid;gap:40px}
.project{background:var(--card);border-radius:30px;padding:40px;display:flex;gap:40px;align-items:center;border:1px solid var(--border);transition:all .3s}
.project:hover{transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,0,0,0.05);border-color:#fed7aa}
.p-icon{width:140px;height:140px;border-radius:30px;background:linear-gradient(135deg,#fff7ed,#ffedd5);display:grid;place-items:center;font-size:60px;flex-shrink:0;border:1px solid #fed7aa}
@media(max-width:640px){.project{flex-direction:column;text-align:center;padding:30px}}
</style>
<nav class="nav"><a class="brand" href="#top"><span class="logo">${logo}</span>${name}</a>
<div class="links"><a href="#work">Work</a><a href="#about">About</a></div>
<a class="btn btn-primary" href="#contact">Hire Me</a></nav>
<header class="hero" id="top">
  <h1 class="reveal">Hi, I'm a <span>Web Developer</span></h1>
  <p class="reveal delay-1">I create beautiful, interactive, and responsive websites that help businesses grow.</p>
</header>
<div class="projects" id="work">
  <div class="project reveal"><div class="p-icon">${logo}</div><div><h3 style="font-size:32px;margin-bottom:12px;font-family:'Space Grotesk'">${name}</h3><p style="color:#78716c;font-size:18px">A custom project built with care and attention to detail. Fully responsive and highly animated.</p></div></div>
  <div class="project reveal delay-1"><div class="p-icon">✨</div><div><h3 style="font-size:32px;margin-bottom:12px;font-family:'Space Grotesk'">Previous Work</h3><p style="color:#78716c;font-size:18px">See how I've helped other clients achieve their goals with clean code and stunning designs.</p></div></div>
</div>
<footer style="padding:40px;text-align:center;border-top:1px solid var(--border);color:#a8a29e">© ${name} · ${cat} demo page</footer>
`;


export function buildDemoPage({ title, icon, category }) {
  const name = esc(title);
  const logo = esc(icon);
  const cat = esc(category);
  
  const c = cat.toLowerCase();
  let specificHtml = "";
  
  if (c.includes("e-commerce") || c.includes("shop") || c.includes("restaurant")) {
    specificHtml = ecommerceTemplate(name, logo, cat);
  } else if (c.includes("ui/ux") || c.includes("branding") || c.includes("agency")) {
    specificHtml = agencyTemplate(name, logo, cat);
  } else if (c.includes("full-stack") || c.includes("developer") || c.includes("app")) {
    specificHtml = fullStackTemplate(name, logo, cat);
  } else if (c.includes("portfolio") || c.includes("personal") || c.includes("photography")) {
    specificHtml = portfolioTemplate(name, logo, cat);
  } else {
    specificHtml = saasTemplate(name, logo, cat);
  }

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${name}</title>
<style>${baseStyles}</style>
</head>
<body>
${specificHtml}
</body>
</html>`;
}