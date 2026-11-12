// Premium demo pages rendered inside the iframe on the project details page.

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------------------------- Shared base ---------------------------- */

const BASE_CSS = `
:root{--ink:#1d1a19;--cream:#fdf8ee;--terra:#c96f4a;--terra2:#b05a3a;--ease:cubic-bezier(.22,1,.36,1)}
@property --ang{syntax:"<angle>";inherits:false;initial-value:0deg}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Segoe UI",Inter,Roboto,sans-serif;color:var(--ink);line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased}
h1,h2,h3{letter-spacing:-.035em;line-height:1.05;font-weight:700}
a{color:inherit;text-decoration:none}button{font:inherit;cursor:pointer;border:0;background:none;color:inherit}
::-webkit-scrollbar{width:8px}::-webkit-scrollbar-thumb{background:rgba(128,128,128,.35);border-radius:9px}
section{padding:110px 6vw;scroll-margin-top:70px;position:relative}
.wrap{max-width:1160px;margin:0 auto}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;margin-bottom:14px}
.center{text-align:center}.sub{max-width:560px;margin:14px auto 0;opacity:.68;font-size:18px}
.reveal{opacity:0;transform:translateY(36px);filter:blur(6px);transition:opacity .9s var(--ease),transform .9s var(--ease),filter .9s var(--ease)}
.reveal.in{opacity:1;transform:none;filter:none}
.btn{position:relative;display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:14px 28px;font-weight:600;font-size:15px;transition:transform .35s var(--ease),box-shadow .35s,background .35s}
.btn:hover{transform:translateY(-3px)}
.gt{background-size:200% 200%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;animation:shift 8s ease infinite}
.spot{position:relative;overflow:hidden}
.spot:after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .35s;background:radial-gradient(360px circle at var(--mx,50%) var(--my,50%),var(--spot,rgba(201,111,74,.16)),transparent 60%)}
.spot:hover:after{opacity:1}
@keyframes shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
@keyframes float{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-24px,0)}}
@keyframes drift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.1)}66%{transform:translate(-30px,30px) scale(.95)}}
@keyframes scroll{to{transform:translateX(-50%)}}
@keyframes spin{to{--ang:360deg}}
@keyframes pulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.reveal{opacity:1;transform:none;filter:none}}
`;

const BASE_JS = `
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}})});
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
document.querySelectorAll('.spot').forEach(function(el){el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})});
var co=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;var el=en.target,t=parseFloat(el.getAttribute('data-count')),d=parseInt(el.getAttribute('data-dec')||'0',10),s=performance.now();(function f(n){var p=Math.min((n-s)/1600,1),v=t*(1-Math.pow(1-p,3));el.textContent=v.toFixed(d)+(el.getAttribute('data-suf')||'');if(p<1)requestAnimationFrame(f)})(s);co.unobserve(el)})},{threshold:.6});
document.querySelectorAll('[data-count]').forEach(function(el){co.observe(el)});
`;

const wrap = (name, css, body, js = "") => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${name}</title>
<style>${BASE_CSS}${css}</style>
</head>
<body>
${body}
<script>${BASE_JS}${js}</script>
</body>
</html>`;

/* ------------------------------- SaaS ------------------------------- */

const saas = (n, l, c) =>
  wrap(
    n,
    `
body{background:#fffaf5}
.nav{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:50;width:min(940px,calc(100% - 28px));display:flex;align-items:center;justify-content:space-between;padding:10px 12px 10px 20px;border-radius:999px;background:rgba(255,255,255,.72);backdrop-filter:saturate(180%) blur(18px);-webkit-backdrop-filter:saturate(180%) blur(18px);border:1px solid rgba(29,26,25,.07);box-shadow:0 8px 30px -12px rgba(29,26,25,.18)}
.brand{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:-.02em}
.brand i{font-style:normal;width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(135deg,#fde8ea,#fad1d6)}
.nl{display:flex;gap:26px;font-size:14px;font-weight:500}.nl a{opacity:.62;transition:opacity .25s}.nl a:hover{opacity:1}
.nav .btn{padding:9px 18px;font-size:13px;background:var(--ink);color:#fff}
@media(max-width:700px){.nl{display:none}}
.hero{min-height:100vh;display:grid;place-items:center;text-align:center;padding:130px 6vw 90px;overflow:hidden}
.mesh{position:absolute;inset:0;z-index:0}
.orb{position:absolute;border-radius:50%;filter:blur(70px);opacity:.7;animation:drift 18s ease-in-out infinite}
.o1{width:520px;height:520px;background:#fad1d6;left:-120px;top:-80px}.o2{width:460px;height:460px;background:#cddbc4;right:-100px;top:10%;animation-delay:-6s}.o3{width:420px;height:420px;background:#f5c9b3;left:35%;bottom:-180px;animation-delay:-12s}.o4{width:300px;height:300px;background:#d9d3ff;right:18%;bottom:6%;animation-delay:-3s;opacity:.5}
.hi{position:relative;z-index:2;max-width:900px}
.badge{display:inline-flex;align-items:center;gap:9px;padding:7px 16px;border-radius:999px;background:rgba(255,255,255,.7);border:1px solid rgba(29,26,25,.08);font-size:13px;font-weight:600;backdrop-filter:blur(8px);animation:fadeUp .9s both}
.badge b{width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 4px rgba(74,222,128,.25);animation:pulse 2s infinite}
.hero h1{font-size:clamp(42px,8vw,92px);margin:26px 0 22px;animation:fadeUp .9s .1s both}
.hero h1 .gt{background-image:linear-gradient(100deg,#c96f4a,#e46f82,#8b7cf6,#6b8a5c,#c96f4a)}
.hero p{font-size:clamp(16px,2vw,20px);opacity:.68;max-width:560px;margin:0 auto 34px;animation:fadeUp .9s .2s both}
.cta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;animation:fadeUp .9s .3s both}
.glow{background:linear-gradient(135deg,#c96f4a,#e46f82);color:#fff;box-shadow:0 12px 40px -10px rgba(201,111,74,.7),inset 0 1px 0 rgba(255,255,255,.35)}
.glow:hover{box-shadow:0 20px 60px -10px rgba(228,111,130,.85),inset 0 1px 0 rgba(255,255,255,.4)}
.ghost{background:rgba(255,255,255,.8);border:1px solid rgba(29,26,25,.1)}
.show{padding-top:0;margin-top:-50px}
.stage{position:relative;max-width:1000px;margin:0 auto;perspective:1600px}
.dash{background:rgba(255,255,255,.92);border:1px solid rgba(29,26,25,.08);border-radius:22px;box-shadow:0 60px 120px -40px rgba(29,26,25,.35),0 0 0 8px rgba(255,255,255,.45);overflow:hidden}
.dash.reveal{transform:rotateX(14deg) scale(.95);transform-origin:top;transition-duration:1.3s}
.dash.reveal.in{transform:none}
.dtop{display:flex;align-items:center;gap:7px;padding:14px 18px;border-bottom:1px solid rgba(29,26,25,.06);font-size:12px;font-weight:600}
.dtop i{width:10px;height:10px;border-radius:50%;background:#fad1d6}.dtop i:nth-child(2){background:#f0e3c6}.dtop i:nth-child(3){background:#cddbc4}.dtop span{margin-left:10px;opacity:.55}
.dbody{display:flex;min-height:340px}
.side{width:64px;padding:18px 0;display:flex;flex-direction:column;align-items:center;gap:14px;border-right:1px solid rgba(29,26,25,.06);background:#fdfaf6}
.side b{width:28px;height:28px;border-radius:9px;background:rgba(29,26,25,.07)}.side b.on{background:linear-gradient(135deg,#c96f4a,#e46f82)}
.main{flex:1;padding:22px;display:grid;gap:18px;align-content:start}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.kpi{background:#fff;border:1px solid rgba(29,26,25,.07);border-radius:16px;padding:16px}
.kpi small{display:block;font-size:12px;opacity:.55}.kpi strong{font-size:clamp(20px,3vw,30px);letter-spacing:-.03em}.kpi em{display:block;font-style:normal;font-size:12px;color:#3f9b5c;font-weight:600}
.chartbox{background:#fff;border:1px solid rgba(29,26,25,.07);border-radius:16px;padding:16px}.chartbox svg{display:block;width:100%;height:150px}
.dash .line{stroke-dasharray:1400;stroke-dashoffset:1400}.dash.in .line{animation:draw 2.6s ease .6s forwards}
@keyframes draw{to{stroke-dashoffset:0}}
.fl{position:absolute;z-index:3;padding:12px 18px;border-radius:18px;background:rgba(255,255,255,.85);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(29,26,25,.07);box-shadow:0 24px 50px -20px rgba(29,26,25,.3);font-size:13px;font-weight:600;animation:float 7s ease-in-out infinite}
.fl1{left:-4%;top:22%}.fl2{right:-3%;bottom:14%;animation-delay:-3s}
@media(max-width:860px){.fl,.side{display:none}.kpis{grid-template-columns:1fr}}
.logos{padding:70px 0 40px;overflow:hidden}.logos p{text-align:center;font-size:12px;opacity:.5;margin-bottom:22px;letter-spacing:.14em;text-transform:uppercase;font-weight:600}
.ltrack{display:flex;gap:70px;width:max-content;animation:scroll 30s linear infinite;font-size:22px;font-weight:700;letter-spacing:-.03em;opacity:.3;white-space:nowrap}
.bento{display:grid;grid-template-columns:repeat(6,1fr);gap:20px;margin-top:56px}
.bc{background:#fff;border:1px solid rgba(29,26,25,.07);border-radius:28px;padding:32px;min-height:250px;display:flex;flex-direction:column;justify-content:flex-end;transition:transform .45s var(--ease),box-shadow .45s}
.bc:hover{transform:translateY(-6px);box-shadow:0 30px 60px -30px rgba(29,26,25,.25)}
.bc h3{font-size:22px;margin-bottom:8px}.bc p{opacity:.65;font-size:15px}
.s4{grid-column:span 4}.s2{grid-column:span 2}@media(max-width:800px){.s4,.s2{grid-column:span 6}}
.ico{position:absolute;top:28px;left:32px;font-size:36px}
.viz{position:absolute;top:28px;left:32px;right:32px;display:flex;gap:10px;flex-wrap:wrap}
.node{padding:9px 16px;border-radius:999px;background:#fff7f2;border:1px solid rgba(201,111,74,.25);font-size:13px;font-weight:600;animation:float 6s ease-in-out infinite}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:30px;text-align:center;margin-top:56px}
.stats strong{display:block;font-size:clamp(50px,8vw,92px);letter-spacing:-.05em;line-height:1;background-image:linear-gradient(100deg,#c96f4a,#e46f82,#8b7cf6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.stats span{opacity:.6;font-weight:500}
.plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;margin-top:56px;align-items:stretch}
.plan{background:#fff;border:1px solid rgba(29,26,25,.08);border-radius:28px;padding:36px;transition:transform .4s var(--ease),box-shadow .4s}
.plan:hover{transform:translateY(-8px);box-shadow:0 30px 60px -30px rgba(29,26,25,.3)}
.plan h3{font-size:20px}.pr{font-size:50px;font-weight:700;letter-spacing:-.04em;margin:14px 0 4px}.pr small{font-size:15px;font-weight:500;opacity:.5}
.plan ul{list-style:none;margin:24px 0 30px;display:grid;gap:12px;font-size:15px;opacity:.8}.plan li:before{content:"✓";margin-right:10px;color:var(--terra);font-weight:700}
.plan .btn{width:100%;justify-content:center}
.pro{position:relative;isolation:isolate;border:0;transform:translateY(-10px)}
.pro:before{content:"";position:absolute;inset:-2px;border-radius:30px;background:conic-gradient(from var(--ang),#c96f4a,#e46f82,#8b7cf6,#6b8a5c,#c96f4a);animation:spin 5s linear infinite;z-index:-2}
.pro:after{content:"";position:absolute;inset:0;border-radius:28px;background:#fff;z-index:-1}
.pro:hover{transform:translateY(-16px)}
.band{border-radius:36px;padding:90px 6vw;text-align:center;color:#fff;background:linear-gradient(120deg,#c96f4a,#e46f82,#8b7cf6,#c96f4a);background-size:300% 300%;animation:shift 12s ease infinite}
.band h2{font-size:clamp(34px,6vw,68px);margin-bottom:18px}.band p{opacity:.85;margin-bottom:30px;font-size:18px}.band .btn{background:#fff;color:var(--ink)}
footer{padding:50px 6vw;display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;font-size:14px;opacity:.55;border-top:1px solid rgba(29,26,25,.08)}
`,
    `
<nav class="nav"><a class="brand" href="#top"><i>${l}</i>${n}</a><div class="nl"><a href="#features">Product</a><a href="#stats">Results</a><a href="#pricing">Pricing</a></div><a class="btn" href="#pricing">Get started</a></nav>

<header class="hero" id="top">
  <div class="mesh"><span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span><span class="orb o4"></span></div>
  <div class="hi">
    <span class="badge"><b></b>${c} · Live preview</span>
    <h1>The smarter way to <span class="gt">run your business</span></h1>
    <p>One beautifully simple workspace to plan, automate and grow, designed so your team actually enjoys using it.</p>
    <div class="cta"><a class="btn glow" href="#pricing">Start free →</a><a class="btn ghost" href="#features">See how it works</a></div>
  </div>
</header>

<section class="show">
  <div class="stage">
    <div class="fl fl1">✓ Automation complete</div>
    <div class="fl fl2">🔔 3 new insights</div>
    <div class="dash reveal">
      <div class="dtop"><i></i><i></i><i></i><span>${n} · Dashboard</span></div>
      <div class="dbody">
        <aside class="side"><b></b><b class="on"></b><b></b><b></b><b></b></aside>
        <div class="main">
          <div class="kpis">
            <div class="kpi"><small>Active users</small><strong data-count="12480">0</strong><em>▲ 12%</em></div>
            <div class="kpi"><small>Revenue</small><strong data-count="48.2" data-dec="1" data-suf="k">0</strong><em>▲ 8%</em></div>
            <div class="kpi"><small>Satisfaction</small><strong data-count="98.6" data-dec="1" data-suf="%">0</strong><em>▲ 3%</em></div>
          </div>
          <div class="chartbox">
            <svg viewBox="0 0 600 160" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c96f4a" stop-opacity=".32"/><stop offset="1" stop-color="#c96f4a" stop-opacity="0"/></linearGradient></defs><path d="M0 120 C60 100 90 130 150 90 S250 40 300 70 S400 120 450 60 S550 20 600 30 L600 160 L0 160Z" fill="url(#g)"/><path class="line" d="M0 120 C60 100 90 130 150 90 S250 40 300 70 S400 120 450 60 S550 20 600 30" fill="none" stroke="#c96f4a" stroke-width="3" stroke-linecap="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="logos"><p>Connects with the tools you already use</p>
  <div class="ltrack">
    <span>Calendar</span><span>Email</span><span>Chat</span><span>Payments</span><span>Storage</span><span>Analytics</span><span>Forms</span>
    <span>Calendar</span><span>Email</span><span>Chat</span><span>Payments</span><span>Storage</span><span>Analytics</span><span>Forms</span>
  </div>
</div>

<section id="features"><div class="wrap">
  <div class="center reveal"><p class="eyebrow" style="color:var(--terra)">Product</p><h2 style="font-size:clamp(34px,5vw,60px)">Everything in one calm place</h2><p class="sub">Powerful tools that stay out of your way.</p></div>
  <div class="bento reveal">
    <div class="bc s4 spot"><div class="viz"><span class="node">⚡ Trigger</span><span class="node" style="animation-delay:-1.5s">🔍 Filter</span><span class="node" style="animation-delay:-3s">✉️ Notify</span><span class="node" style="animation-delay:-4.5s">✅ Done</span></div><h3>Automate the busywork</h3><p>Build flows in minutes and let your workspace handle the repetitive tasks.</p></div>
    <div class="bc s2 spot"><div class="ico">📊</div><h3>Live insights</h3><p>See what matters, the moment it changes.</p></div>
    <div class="bc s2 spot"><div class="ico">🔒</div><h3>Secure by default</h3><p>Privacy and permissions built in from day one.</p></div>
    <div class="bc s2 spot"><div class="ico">👥</div><h3>Made for teams</h3><p>Share, comment and collaborate in real time.</p></div>
    <div class="bc s2 spot"><div class="ico">🔌</div><h3>Connects everywhere</h3><p>Plug into the tools your team already loves.</p></div>
  </div>
</div></section>

<section id="stats"><div class="wrap">
  <div class="center reveal"><p class="eyebrow" style="color:var(--terra)">Results</p><h2 style="font-size:clamp(34px,5vw,60px)">Built to perform</h2></div>
  <div class="stats reveal">
    <div><strong data-count="50" data-suf="+">0</strong><span>Integrations</span></div>
    <div><strong data-count="99.9" data-dec="1" data-suf="%">0</strong><span>Uptime</span></div>
    <div><strong data-count="24" data-suf="/7">0</strong><span>Support</span></div>
  </div>
</div></section>

<section id="pricing"><div class="wrap">
  <div class="center reveal"><p class="eyebrow" style="color:var(--terra)">Pricing</p><h2 style="font-size:clamp(34px,5vw,60px)">Simple, honest pricing</h2><p class="sub">Start free. Upgrade when you're ready.</p></div>
  <div class="plans reveal">
    <div class="plan"><h3>Starter</h3><div class="pr">$0<small> /mo</small></div><p style="opacity:.6">For individuals getting started.</p><ul><li>Up to 3 projects</li><li>Basic analytics</li><li>Community support</li></ul><a class="btn ghost" href="#top">Get started</a></div>
    <div class="plan pro"><h3>Pro</h3><div class="pr">$24<small> /mo</small></div><p style="opacity:.6">For growing teams that need more.</p><ul><li>Unlimited projects</li><li>Advanced automations</li><li>Priority support</li></ul><a class="btn glow" href="#top">Start free trial</a></div>
    <div class="plan"><h3>Team</h3><div class="pr">$79<small> /mo</small></div><p style="opacity:.6">For organisations at scale.</p><ul><li>Everything in Pro</li><li>Roles and permissions</li><li>Dedicated manager</li></ul><a class="btn ghost" href="#top">Contact sales</a></div>
  </div>
</div></section>

<section style="padding-top:20px"><div class="wrap"><div class="band reveal"><h2>Ready to work smarter?</h2><p>Join in minutes. No credit card required.</p><a class="btn" href="#top">Get started free →</a></div></div></section>

<footer><span>© ${n}</span><span>${c} demo · Made with care</span></footer>
`
  );

/* ------------------------------- Store ------------------------------- */

const store = (n, l, c) =>
  wrap(
    n,
    `
body{background:#f6f1e9}
.top{background:var(--ink);color:#f6f1e9;text-align:center;font-size:12px;letter-spacing:.06em;padding:9px 12px;font-weight:500}
.nav{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;padding:14px 6vw;background:rgba(246,241,233,.72);backdrop-filter:saturate(180%) blur(20px);-webkit-backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid rgba(29,26,25,.07)}
.brand{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:-.02em;font-size:18px}.brand i{font-style:normal;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:#fad1d6}
.nl{display:flex;gap:28px;font-size:14px;font-weight:500}.nl a{opacity:.62;transition:opacity .25s}.nl a:hover{opacity:1}
.icons{display:flex;gap:10px}.ib{position:relative;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#fff;border:1px solid rgba(29,26,25,.08);transition:transform .3s var(--ease)}.ib:hover{transform:translateY(-2px)}
.cnt{position:absolute;top:-4px;right:-4px;min-width:19px;height:19px;border-radius:99px;background:var(--terra);color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center}
.pop{animation:pop .45s}@keyframes pop{50%{transform:scale(1.5)}}
@media(max-width:700px){.nl{display:none}}
.hero{text-align:center;padding:90px 6vw 20px;overflow:hidden;position:relative}
.hero .eyebrow{color:var(--terra);animation:fadeUp .9s both}
.hero h1{font-size:clamp(46px,9.5vw,112px);margin:14px 0 22px;animation:fadeUp .9s .1s both}
.hero h1 .gt{background-image:linear-gradient(100deg,#c96f4a,#e46f82,#e0a58c,#6b8a5c,#c96f4a)}
.hero .sub{animation:fadeUp .9s .2s both}
.cta{display:flex;gap:18px;justify-content:center;align-items:center;margin-top:30px;flex-wrap:wrap;animation:fadeUp .9s .3s both}
.dark{background:var(--ink);color:#fff;box-shadow:0 14px 36px -12px rgba(29,26,25,.55)}.dark:hover{background:#000}
.lnk{font-weight:600;color:var(--terra2)}.lnk:hover{text-decoration:underline}
.stage{position:relative;height:clamp(330px,52vw,520px);display:grid;place-items:center;perspective:1100px}
.halo{position:absolute;width:min(560px,86vw);aspect-ratio:1;border-radius:50%;background:conic-gradient(from var(--ang),#fad1d6,#f0e3c6,#cddbc4,#f5c9b3,#fad1d6);filter:blur(36px);opacity:.85;animation:spin 12s linear infinite}
.sphere{position:absolute;width:min(420px,68vw);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 32% 26%,#fff 0,#fde8ea 30%,#f5c9b3 70%,#e0a58c 100%);box-shadow:0 60px 100px -30px rgba(201,111,74,.5),inset 0 -20px 60px rgba(201,111,74,.25)}
.tw{position:relative;transition:transform .25s ease-out;transform-style:preserve-3d}
.prod{font-size:clamp(120px,24vw,230px);line-height:1;display:block;filter:drop-shadow(0 40px 30px rgba(29,26,25,.28));animation:float 6s ease-in-out infinite}
.chip{position:absolute;z-index:3;padding:12px 18px;border-radius:18px;background:rgba(255,255,255,.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.7);box-shadow:0 24px 50px -20px rgba(29,26,25,.3);font-size:13px;font-weight:600;animation:float 7s ease-in-out infinite}
.chip small{display:block;opacity:.55;font-weight:500}.c1{left:6%;top:24%}.c2{right:6%;bottom:20%;animation-delay:-3s}@media(max-width:700px){.chip{display:none}}
.strip{overflow:hidden;background:var(--ink);color:#f6f1e9;padding:16px 0}
.st{display:flex;gap:56px;width:max-content;animation:scroll 26s linear infinite;font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:50px}
.tile{border-radius:32px;padding:34px;min-height:380px;display:flex;flex-direction:column;justify-content:flex-end;transition:transform .5s var(--ease),box-shadow .5s}
.tile:hover{transform:translateY(-8px);box-shadow:0 40px 70px -34px rgba(29,26,25,.4)}
.tile em{position:absolute;right:26px;top:20px;font-style:normal;font-size:110px;transition:transform .7s var(--ease)}.tile:hover em{transform:scale(1.18) rotate(-8deg)}
.tile h3{font-size:30px}.tile span{margin-top:8px;font-weight:600;color:var(--terra2)}
.fh{display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap;margin-bottom:34px}.fh h2{font-size:clamp(32px,5vw,56px)}
.chips{display:flex;gap:8px;flex-wrap:wrap}.fc{padding:9px 20px;border-radius:999px;border:1px solid rgba(29,26,25,.12);font-size:13px;font-weight:600;transition:.3s}.fc.on,.fc:hover{background:var(--ink);color:#fff;border-color:var(--ink)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:22px}
.pc{background:#fff;border-radius:28px;padding:14px;transition:transform .5s var(--ease),box-shadow .5s}.pc:hover{transform:translateY(-8px);box-shadow:0 40px 70px -34px rgba(29,26,25,.4)}.pc.hide{display:none}
.pi{position:relative;aspect-ratio:1;border-radius:20px;display:grid;place-items:center;font-size:76px;overflow:hidden}.pi span{transition:transform .6s var(--ease)}.pc:hover .pi span{transform:scale(1.2) rotate(-6deg)}
.bd{position:absolute;left:12px;top:12px;padding:4px 11px;border-radius:99px;background:#fff;font-size:11px;font-weight:700;color:var(--terra2)}
.hr{position:absolute;right:12px;top:12px;width:36px;height:36px;border-radius:50%;background:#fff;color:#c4b8ae;font-size:16px;transition:.3s}.hr.on{color:#e46f82;transform:scale(1.15)}
.qa{position:absolute;left:12px;right:12px;bottom:12px;padding:12px;border-radius:14px;background:var(--ink);color:#fff;font-weight:600;font-size:14px;transform:translateY(130%);transition:transform .5s var(--ease)}.pc:hover .qa{transform:none}
.pn{padding:14px 6px 6px;display:flex;justify-content:space-between;align-items:center;gap:8px}.pn b{font-weight:600}.pn small{display:block;opacity:.5;font-size:12px}.pn s{opacity:.4;margin-right:6px;font-size:13px}
.news{border-radius:40px;padding:90px 6vw;text-align:center;color:#fff;background:linear-gradient(120deg,#1d1a19,#3d2f2a,#5a3a2e,#1d1a19);background-size:300% 300%;animation:shift 14s ease infinite}
.news h2{font-size:clamp(34px,6vw,64px);margin-bottom:14px}.news p{opacity:.7;margin-bottom:28px}
.nf{display:flex;gap:10px;max-width:460px;margin:0 auto;flex-wrap:wrap;justify-content:center}.nf input{flex:1;min-width:200px;padding:15px 22px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);color:#fff;font:inherit;outline:0}.nf input::placeholder{color:rgba(255,255,255,.5)}.nf input:focus{border-color:#f5c9b3}
.nf .btn{background:#fff;color:var(--ink)}
footer{padding:50px 6vw;display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;font-size:14px;opacity:.55}
.toast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,140px);background:var(--ink);color:#fff;padding:12px 22px;border-radius:99px;font-size:14px;font-weight:600;z-index:60;transition:transform .5s var(--ease)}.toast.show{transform:translate(-50%,0)}
`,
    `
<div class="top">✦ New season arrivals are here · Free shipping on orders over $50 ✦</div>
<nav class="nav"><a class="brand" href="#top"><i>${l}</i>${n}</a><div class="nl"><a href="#shop">Shop</a><a href="#collections">Collections</a><a href="#club">Newsletter</a></div>
<div class="icons"><button class="ib" aria-label="Search">🔍</button><button class="ib" aria-label="Bag">🛍️<span class="cnt" id="cnt">0</span></button></div></nav>

<header class="hero" id="top">
  <p class="eyebrow">${c} · New collection</p>
  <h1>Considered design, <span class="gt">every day.</span></h1>
  <p class="sub">Thoughtfully made essentials in soft, seasonal colours, designed to be loved for years.</p>
  <div class="cta"><a class="btn dark" href="#shop">Shop now</a><a class="lnk" href="#collections">Explore collections ›</a></div>
  <div class="stage" id="stage">
    <div class="halo"></div><div class="sphere"></div>
    <div class="chip c1">✨ New in<small>Fresh this week</small></div>
    <div class="chip c2">🌿 Made to last<small>Quality essentials</small></div>
    <div class="tw" id="tw"><span class="prod">${l}</span></div>
  </div>
</header>

<div class="strip"><div class="st">
  <span>✦ Free shipping over $50</span><span>✦ 30-day returns</span><span>✦ Secure checkout</span><span>✦ Gift wrapping</span><span>✦ New every week</span>
  <span>✦ Free shipping over $50</span><span>✦ 30-day returns</span><span>✦ Secure checkout</span><span>✦ Gift wrapping</span><span>✦ New every week</span>
</div></div>

<section id="collections"><div class="wrap">
  <div class="center reveal"><p class="eyebrow" style="color:var(--terra)">Collections</p><h2 style="font-size:clamp(34px,5vw,60px)">Shop by mood</h2></div>
  <div class="tiles reveal">
    <a href="#shop" class="tile spot" style="background:linear-gradient(160deg,#fde8ea,#fad1d6)"><em>🧣</em><h3>Cozy</h3><span>Shop now ›</span></a>
    <a href="#shop" class="tile spot" style="background:linear-gradient(160deg,#e6ede1,#cddbc4)"><em>🌿</em><h3>Fresh</h3><span>Shop now ›</span></a>
    <a href="#shop" class="tile spot" style="background:linear-gradient(160deg,#f8efdc,#f5c9b3)"><em>☀️</em><h3>Sunny</h3><span>Shop now ›</span></a>
  </div>
</div></section>

<section id="shop" style="padding-top:20px"><div class="wrap">
  <div class="fh reveal"><h2>Our favourites</h2>
    <div class="chips"><button class="fc on" data-f="all">All</button><button class="fc" data-f="new">New</button><button class="fc" data-f="popular">Popular</button><button class="fc" data-f="sale">Sale</button></div></div>
  <div class="grid reveal">
    <div class="pc spot" data-cat="new"><div class="pi" style="background:linear-gradient(145deg,#fde8ea,#fad1d6)"><span>👕</span><i class="bd" style="font-style:normal">New</i><button class="hr">♥</button><button class="qa">Add to bag</button></div><div class="pn"><div><b>Linen Shirt</b><small>Relaxed fit</small></div><b>$42</b></div></div>
    <div class="pc spot" data-cat="popular"><div class="pi" style="background:linear-gradient(145deg,#e6ede1,#cddbc4)"><span>🧣</span><i class="bd" style="font-style:normal">Popular</i><button class="hr">♥</button><button class="qa">Add to bag</button></div><div class="pn"><div><b>Wool Scarf</b><small>Soft merino</small></div><b>$28</b></div></div>
    <div class="pc spot" data-cat="sale"><div class="pi" style="background:linear-gradient(145deg,#f8efdc,#f0e3c6)"><span>☕</span><i class="bd" style="font-style:normal">Sale</i><button class="hr">♥</button><button class="qa">Add to bag</button></div><div class="pn"><div><b>Ceramic Mug</b><small>Hand glazed</small></div><div><s>$24</s><b>$18</b></div></div></div>
    <div class="pc spot" data-cat="popular"><div class="pi" style="background:linear-gradient(145deg,#fad1d6,#f5c9b3)"><span>👜</span><i class="bd" style="font-style:normal">Popular</i><button class="hr">♥</button><button class="qa">Add to bag</button></div><div class="pn"><div><b>Canvas Tote</b><small>Everyday carry</small></div><b>$32</b></div></div>
    <div class="pc spot" data-cat="new"><div class="pi" style="background:linear-gradient(145deg,#cddbc4,#e6ede1)"><span>👗</span><i class="bd" style="font-style:normal">New</i><button class="hr">♥</button><button class="qa">Add to bag</button></div><div class="pn"><div><b>Floral Dress</b><small>Light cotton</small></div><b>$64</b></div></div>
    <div class="pc spot" data-cat="sale"><div class="pi" style="background:linear-gradient(145deg,#f0e3c6,#fde8ea)"><span>🕯️</span><i class="bd" style="font-style:normal">Sale</i><button class="hr">♥</button><button class="qa">Add to bag</button></div><div class="pn"><div><b>Scented Candle</b><small>Soy wax</small></div><div><s>$30</s><b>$22</b></div></div></div>
    <div class="pc spot" data-cat="new popular"><div class="pi" style="background:linear-gradient(145deg,#f5c9b3,#f8efdc)"><span>👒</span><i class="bd" style="font-style:normal">New</i><button class="hr">♥</button><button class="qa">Add to bag</button></div><div class="pn"><div><b>Sun Hat</b><small>Wide brim</small></div><b>$26</b></div></div>
    <div class="pc spot" data-cat="popular"><div class="pi" style="background:linear-gradient(145deg,#e6ede1,#fad1d6)"><span>👟</span><i class="bd" style="font-style:normal">Popular</i><button class="hr">♥</button><button class="qa">Add to bag</button></div><div class="pn"><div><b>Everyday Sneakers</b><small>Light and flexible</small></div><b>$58</b></div></div>
  </div>
</div></section>

<section id="club" style="padding-top:10px"><div class="wrap"><div class="news reveal"><h2>Join the club</h2><p>Be the first to hear about new arrivals and private sales.</p>
  <form class="nf" id="nf"><input type="email" placeholder="Your email address" required><button class="btn">Subscribe</button></form></div></div></section>

<footer><span>© ${n}</span><span>${c} demo · Made with care</span></footer>
<div class="toast" id="toast">Added to bag ✓</div>
`,
    `
var st=document.getElementById('stage'),tw=document.getElementById('tw');
if(st&&tw){st.addEventListener('pointermove',function(e){var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tw.style.transform='rotateY('+(x*24)+'deg) rotateX('+(-y*24)+'deg)'});st.addEventListener('pointerleave',function(){tw.style.transform=''})}
var fcs=document.querySelectorAll('.fc');
fcs.forEach(function(b){b.addEventListener('click',function(){fcs.forEach(function(x){x.classList.remove('on')});b.classList.add('on');var f=b.getAttribute('data-f');document.querySelectorAll('.pc').forEach(function(p){p.classList.toggle('hide',!(f==='all'||p.getAttribute('data-cat').indexOf(f)>-1))})})});
var n=0,cnt=document.getElementById('cnt'),toast=document.getElementById('toast'),tt;
document.querySelectorAll('.qa').forEach(function(b){b.addEventListener('click',function(){n++;cnt.textContent=n;cnt.classList.remove('pop');void cnt.offsetWidth;cnt.classList.add('pop');toast.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('show')},1600)})});
document.querySelectorAll('.hr').forEach(function(h){h.addEventListener('click',function(){h.classList.toggle('on')})});
document.getElementById('nf').addEventListener('submit',function(e){e.preventDefault();e.target.innerHTML='<p style="font-weight:600">Thank you! You are on the list ✓</p>'});
`
  );

/* -------------------------------- AI -------------------------------- */

const ai = (n, l, c) =>
  wrap(
    n,
    `
body{background:#07060d;color:#eeeaff}
.nav{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:50;width:min(940px,calc(100% - 28px));display:flex;align-items:center;justify-content:space-between;padding:10px 12px 10px 20px;border-radius:999px;background:rgba(18,15,32,.65);backdrop-filter:saturate(180%) blur(18px);-webkit-backdrop-filter:saturate(180%) blur(18px);border:1px solid rgba(255,255,255,.09)}
.brand{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:-.02em}.brand i{font-style:normal;width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(135deg,#8b5cf6,#38bdf8)}
.nl{display:flex;gap:26px;font-size:14px;font-weight:500}.nl a{opacity:.6;transition:opacity .25s}.nl a:hover{opacity:1}
.nav .btn{padding:9px 18px;font-size:13px;background:#fff;color:#07060d}
@media(max-width:700px){.nl{display:none}}
.hero{min-height:100vh;display:grid;place-items:center;text-align:center;padding:140px 6vw 80px;overflow:hidden}
.hero:before{content:"";position:absolute;inset:-20%;background:radial-gradient(40% 40% at 20% 25%,rgba(139,92,246,.5),transparent 70%),radial-gradient(35% 35% at 82% 30%,rgba(56,189,248,.38),transparent 70%),radial-gradient(40% 40% at 50% 95%,rgba(244,114,182,.34),transparent 70%);animation:drift 22s ease-in-out infinite}
.hero:after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:58px 58px;-webkit-mask-image:radial-gradient(ellipse at 50% 40%,#000 15%,transparent 70%);mask-image:radial-gradient(ellipse at 50% 40%,#000 15%,transparent 70%)}
.hi{position:relative;z-index:2;max-width:900px}
.badge{display:inline-flex;align-items:center;gap:9px;padding:7px 16px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);font-size:13px;font-weight:600;animation:fadeUp .9s both}
.badge b{width:8px;height:8px;border-radius:50%;background:#a78bfa;box-shadow:0 0 0 4px rgba(167,139,250,.25);animation:pulse 2s infinite}
.hero h1{font-size:clamp(42px,8vw,92px);margin:26px 0 22px;animation:fadeUp .9s .1s both}
.hero h1 .gt{background-image:linear-gradient(100deg,#a78bfa,#38bdf8,#f472b6,#a78bfa)}
.hero p{font-size:clamp(16px,2vw,20px);opacity:.62;max-width:560px;margin:0 auto 34px;animation:fadeUp .9s .2s both}
.cta{display:flex;gap:16px;justify-content:center;align-items:center;flex-wrap:wrap;animation:fadeUp .9s .3s both}
.gb{display:inline-block;padding:2px;border-radius:999px;background:conic-gradient(from var(--ang),#8b5cf6,#38bdf8,#f472b6,#8b5cf6);animation:spin 4s linear infinite;box-shadow:0 0 40px -6px rgba(139,92,246,.7);transition:box-shadow .4s}
.gb:hover{box-shadow:0 0 70px -4px rgba(56,189,248,.8)}.gb .btn{background:#0d0a1c;color:#fff}
.ghost{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14)}
.demo{padding-top:0;margin-top:-30px}
.cb{max-width:780px;margin:0 auto;padding:1px;border-radius:25px;background:conic-gradient(from var(--ang),#8b5cf6,#38bdf8,#f472b6,#8b5cf6);animation:spin 6s linear infinite;box-shadow:0 40px 120px -30px rgba(139,92,246,.55)}
.chat{background:#0c0a18;border-radius:24px;overflow:hidden}
.ct{display:flex;align-items:center;gap:8px;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.07);font-size:13px;font-weight:600}.ct i{width:10px;height:10px;border-radius:50%;background:#3a3358}.ct span{margin-left:8px;opacity:.55}
.ms{padding:26px;display:grid;gap:14px;min-height:340px;align-content:start}
.m{max-width:82%;padding:13px 18px;border-radius:18px;font-size:15px;opacity:0}
.m.u{justify-self:end;background:linear-gradient(135deg,#8b5cf6,#6366f1);color:#fff;border-bottom-right-radius:6px}
.m.a{justify-self:start;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);border-bottom-left-radius:6px}
.m.a b{color:#a78bfa}
.cb.in .m{animation:mpop .6s var(--ease) forwards;animation-delay:var(--d)}
.cb.in .m.t{animation:mpop .5s var(--ease) var(--d) forwards,gone .4s ease var(--g) forwards}
@keyframes mpop{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}
@keyframes gone{to{opacity:0;transform:scale(.8)}}
.dots{display:flex;gap:5px;padding:4px 2px}.dots i{width:7px;height:7px;border-radius:50%;background:#a78bfa;animation:bounce 1s infinite}.dots i:nth-child(2){animation-delay:.15s}.dots i:nth-child(3){animation-delay:.3s}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.cur{display:inline-block;width:8px;height:16px;background:#a78bfa;margin-left:4px;vertical-align:-3px;animation:blink 1s steps(2) infinite}@keyframes blink{50%{opacity:0}}
.bento{display:grid;grid-template-columns:repeat(6,1fr);gap:20px;margin-top:56px}
.bc{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:28px;padding:32px;min-height:250px;display:flex;flex-direction:column;justify-content:flex-end;--spot:rgba(139,92,246,.28);transition:transform .45s var(--ease),border-color .45s}
.bc:hover{transform:translateY(-6px);border-color:rgba(167,139,250,.5)}
.bc h3{font-size:22px;margin-bottom:8px}.bc p{opacity:.6;font-size:15px}
.s4{grid-column:span 4}.s2{grid-column:span 2}@media(max-width:800px){.s4,.s2{grid-column:span 6}}
.ico{position:absolute;top:28px;left:32px;font-size:36px}
.wave{position:absolute;top:34px;left:32px;right:32px;height:90px;display:flex;align-items:center;gap:6px}
.wave i{flex:1;border-radius:99px;background:linear-gradient(180deg,#a78bfa,#38bdf8);height:20%;animation:eq 1.6s ease-in-out infinite;animation-delay:calc(var(--i)*-.14s)}
@keyframes eq{0%,100%{height:15%}50%{height:90%}}
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;margin-top:56px;position:relative}
.step{padding:34px;border-radius:28px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}
.step b{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;margin-bottom:20px;background:linear-gradient(135deg,#8b5cf6,#38bdf8);box-shadow:0 0 30px rgba(139,92,246,.6);animation:pulse 3s infinite}
.step h3{font-size:22px;margin-bottom:8px}.step p{opacity:.6;font-size:15px}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:30px;text-align:center;margin-top:56px}
.stats strong{display:block;font-size:clamp(50px,8vw,92px);letter-spacing:-.05em;line-height:1;background-image:linear-gradient(100deg,#a78bfa,#38bdf8,#f472b6);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.stats span{opacity:.55;font-weight:500}
.band{border-radius:36px;padding:100px 6vw;text-align:center;background:radial-gradient(60% 80% at 50% 0%,rgba(139,92,246,.45),transparent 70%),#0f0c20;border:1px solid rgba(255,255,255,.1)}
.band h2{font-size:clamp(34px,6vw,68px);margin-bottom:18px}.band p{opacity:.65;margin-bottom:30px;font-size:18px}
footer{padding:50px 6vw;display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;font-size:14px;opacity:.5;border-top:1px solid rgba(255,255,255,.08)}
`,
    `
<nav class="nav"><a class="brand" href="#top"><i>${l}</i>${n}</a><div class="nl"><a href="#features">Capabilities</a><a href="#how">How it works</a><a href="#stats">Results</a></div><a class="btn" href="#cta">Try it free</a></nav>

<header class="hero" id="top"><div class="hi">
  <span class="badge"><b></b>${c} · Live preview</span>
  <h1>Meet the AI that <span class="gt">works while you sleep</span></h1>
  <p>An intelligent assistant that understands your business, answers your customers and gets smarter with every conversation.</p>
  <div class="cta"><span class="gb"><a class="btn" href="#cta">Start building →</a></span><a class="btn ghost" href="#features">Explore capabilities</a></div>
</div></header>

<section class="demo"><div class="cb reveal"><div class="chat">
  <div class="ct"><i></i><i></i><i></i><span>${n} · Assistant</span></div>
  <div class="ms">
    <div class="m u" style="--d:.4s;grid-row:1">Summarise this week's customer feedback</div>
    <div class="m a t" style="--d:1.2s;--g:2.7s;grid-row:2"><span class="dots"><i></i><i></i><i></i></span></div>
    <div class="m a" style="--d:2.9s;grid-row:2"><b>Here's your weekly summary</b><br>• Most feedback is positive<br>• Top request: dark mode<br>• 3 issues flagged for follow-up</div>
    <div class="m u" style="--d:4.8s;grid-row:3">Draft replies for those three issues</div>
    <div class="m a t" style="--d:5.6s;--g:6.9s;grid-row:4"><span class="dots"><i></i><i></i><i></i></span></div>
    <div class="m a" style="--d:7s;grid-row:4">Done. Three friendly replies are ready for your review<span class="cur"></span></div>
  </div>
</div></div></section>

<section id="features"><div class="wrap">
  <div class="center reveal"><p class="eyebrow" style="color:#a78bfa">Capabilities</p><h2 style="font-size:clamp(34px,5vw,60px)">Intelligence that fits your workflow</h2><p class="sub">Powerful models wrapped in a calm, simple experience.</p></div>
  <div class="bento reveal">
    <div class="bc s4 spot"><div class="wave"><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i><i style="--i:6"></i><i style="--i:7"></i><i style="--i:8"></i><i style="--i:9"></i><i style="--i:10"></i><i style="--i:11"></i><i style="--i:12"></i><i style="--i:13"></i><i style="--i:14"></i></div><h3>Understands context</h3><p>Reads the full conversation and your knowledge base so every answer feels informed.</p></div>
    <div class="bc s2 spot"><div class="ico">🔌</div><h3>Connects to your tools</h3><p>Plug into the apps your team already uses.</p></div>
    <div class="bc s2 spot"><div class="ico">🔒</div><h3>Private by design</h3><p>Your data stays yours, always.</p></div>
    <div class="bc s2 spot"><div class="ico">✨</div><h3>Learns your voice</h3><p>Matches your brand tone automatically.</p></div>
    <div class="bc s2 spot"><div class="ico">📈</div><h3>Always improving</h3><p>Gets better with every conversation.</p></div>
  </div>
</div></section>

<section id="how"><div class="wrap">
  <div class="center reveal"><p class="eyebrow" style="color:#a78bfa">How it works</p><h2 style="font-size:clamp(34px,5vw,60px)">Live in three steps</h2></div>
  <div class="steps reveal">
    <div class="step"><b>1</b><h3>Connect your data</h3><p>Add your docs, FAQs and tools in a few clicks.</p></div>
    <div class="step"><b>2</b><h3>Customise the voice</h3><p>Choose the tone, style and boundaries you want.</p></div>
    <div class="step"><b>3</b><h3>Go live</h3><p>Launch on your website and watch conversations flow.</p></div>
  </div>
</div></section>

<section id="stats"><div class="wrap">
  <div class="stats reveal">
    <div><strong data-count="50" data-suf="+">0</strong><span>Integrations</span></div>
    <div><strong data-count="99.9" data-dec="1" data-suf="%">0</strong><span>Uptime</span></div>
    <div><strong data-count="24" data-suf="/7">0</strong><span>Always on</span></div>
  </div>
</div></section>

<section id="cta" style="padding-top:20px"><div class="wrap"><div class="band reveal"><h2>Put AI to work <span class="gt" style="background-image:linear-gradient(100deg,#a78bfa,#38bdf8,#f472b6,#a78bfa)">today</span></h2><p>Set up in minutes. No credit card needed.</p><span class="gb"><a class="btn" href="#top">Get started free →</a></span></div></div></section>

<footer><span>© ${n}</span><span>${c} demo · Made with care</span></footer>
`
  );

/* ------------------------------ Agency ------------------------------ */

const agency = (n, l, c) =>
  wrap(
    n,
    `
body{background:#0e0c0b;color:#f6f1e9}
.nav{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:50;width:min(940px,calc(100% - 28px));display:flex;align-items:center;justify-content:space-between;padding:10px 12px 10px 20px;border-radius:999px;background:rgba(20,17,16,.65);backdrop-filter:saturate(180%) blur(18px);-webkit-backdrop-filter:saturate(180%) blur(18px);border:1px solid rgba(255,255,255,.09)}
.brand{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:-.02em}.brand i{font-style:normal;width:30px;height:30px;border-radius:10px;display:grid;place-items:center;background:var(--terra)}
.nl{display:flex;gap:26px;font-size:14px;font-weight:500}.nl a{opacity:.6;transition:opacity .25s}.nl a:hover{opacity:1}
.nav .btn{padding:9px 18px;font-size:13px;background:#f6f1e9;color:var(--ink)}
@media(max-width:700px){.nl{display:none}}
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:150px 6vw 90px;overflow:hidden}
.orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:.5;animation:drift 20s ease-in-out infinite}
.o1{width:480px;height:480px;background:#c96f4a;left:-120px;top:40px}.o2{width:380px;height:380px;background:#f5b5bd;right:-80px;top:25%;animation-delay:-7s}.o3{width:340px;height:340px;background:#89a67a;left:40%;bottom:-160px;animation-delay:-12s}
.hi{position:relative;z-index:2;max-width:1100px}
.hero h1{font-size:clamp(46px,9vw,118px);line-height:1;animation:fadeUp .9s .1s both}
.rot{display:inline-block;height:1.05em;overflow:hidden;vertical-align:bottom}
.ri{display:block;animation:rot 9s cubic-bezier(.7,0,.3,1) infinite}
.ri i{display:block;height:1.05em;line-height:1.05;font-style:italic;background:linear-gradient(100deg,#e0a58c,#fad1d6,#cddbc4);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
@keyframes rot{0%,25%{transform:translateY(0)}33%,58%{transform:translateY(-1.05em)}66%,91%{transform:translateY(-2.1em)}100%{transform:translateY(-3.15em)}}
.hero p{font-size:clamp(16px,2vw,20px);opacity:.62;max-width:520px;margin:28px 0 34px;animation:fadeUp .9s .25s both}
.cta{display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp .9s .35s both}
.light{background:#f6f1e9;color:var(--ink)}.light:hover{background:#fff;box-shadow:0 0 40px rgba(245,201,179,.45)}
.line{border:1px solid rgba(246,241,233,.3)}.line:hover{background:rgba(246,241,233,.08)}
.mq{overflow:hidden;border-top:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1);padding:26px 0}
.mt{display:flex;gap:60px;width:max-content;animation:scroll 30s linear infinite;font-size:clamp(34px,6vw,70px);font-weight:700;letter-spacing:-.04em;white-space:nowrap}
.mt span{color:transparent;-webkit-text-stroke:1px rgba(246,241,233,.55)}.mt span:nth-child(even){color:#f5b5bd;-webkit-text-stroke:0}
.work{background:#f6f1e9;color:var(--ink)}
.wh{display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap;margin-bottom:46px}.wh h2{font-size:clamp(36px,6vw,72px)}
.wg{display:grid;grid-template-columns:repeat(2,1fr);gap:28px}@media(max-width:760px){.wg{grid-template-columns:1fr}}
.wc{display:block}
.wt{position:relative;aspect-ratio:4/3;border-radius:30px;display:grid;place-items:center;font-size:84px;transition:transform .6s var(--ease)}
.wc:hover .wt{transform:scale(.97)}.wt span{transition:transform .7s var(--ease)}.wc:hover .wt span{transform:scale(1.2) rotate(-8deg)}
.wt:before{content:attr(data-n);position:absolute;left:22px;top:18px;font-size:14px;font-weight:700;opacity:.55}
.ar{position:absolute;right:20px;bottom:20px;width:50px;height:50px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:20px;opacity:0;transform:translate(10px,10px) scale(.6);transition:.5s var(--ease)}.wc:hover .ar{opacity:1;transform:none}
.wm{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:18px 4px 0}.wm h3{font-size:24px}.wm small{font-weight:600;opacity:.55;letter-spacing:.04em}
.sv{border-top:1px solid rgba(255,255,255,.14);margin-top:46px}
.sr{display:grid;grid-template-columns:70px 1fr 1.2fr;gap:20px;align-items:center;padding:34px 12px;border-bottom:1px solid rgba(255,255,255,.14);transition:background .4s,padding .4s var(--ease)}
.sr:hover{background:rgba(255,255,255,.05);padding-left:28px}.sr b{color:#f5b5bd;font-size:18px}.sr h3{font-size:clamp(24px,3.4vw,40px)}.sr p{opacity:.6}
@media(max-width:720px){.sr{grid-template-columns:44px 1fr}.sr p{grid-column:2}}
.band{border-radius:36px;padding:100px 6vw;text-align:center;color:#fff;background:linear-gradient(120deg,#c96f4a,#e0a58c,#f5b5bd,#c96f4a);background-size:300% 300%;animation:shift 12s ease infinite}
.band h2{font-size:clamp(38px,7vw,86px);margin-bottom:26px}.band a.mail{display:inline-block;font-size:clamp(18px,3vw,30px);font-weight:600;border-bottom:2px solid rgba(255,255,255,.7);padding-bottom:4px;transition:letter-spacing .4s var(--ease)}.band a.mail:hover{letter-spacing:.02em}
footer{padding:50px 6vw;display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;font-size:14px;opacity:.5}
`,
    `
<nav class="nav"><a class="brand" href="#top"><i>${l}</i>${n}</a><div class="nl"><a href="#work">Work</a><a href="#services">Services</a><a href="#contact">Contact</a></div><a class="btn" href="#contact">Let's talk</a></nav>

<header class="hero" id="top">
  <span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span>
  <div class="hi">
    <p class="eyebrow" style="color:#f5b5bd;margin-bottom:22px">${c} · Live preview</p>
    <h1>We craft <span class="rot"><span class="ri"><i>brands</i><i>products</i><i>stories</i><i>brands</i></span></span><br>people remember.</h1>
    <p>An independent design studio shaping thoughtful identities and digital experiences for ambitious teams.</p>
    <div class="cta"><a class="btn light" href="#work">View our work</a><a class="btn line" href="#contact">Start a project</a></div>
  </div>
</header>

<div class="mq"><div class="mt">
  <span>Branding</span><span>UI/UX</span><span>Web design</span><span>Motion</span><span>Strategy</span>
  <span>Branding</span><span>UI/UX</span><span>Web design</span><span>Motion</span><span>Strategy</span>
</div></div>

<section id="work" class="work"><div class="wrap">
  <div class="wh reveal"><h2>Selected work</h2><p style="opacity:.6;max-width:320px">A few recent identities and interfaces we're proud of.</p></div>
  <div class="wg reveal">
    <a class="wc" href="#contact"><div class="wt spot" data-n="01" style="background:linear-gradient(145deg,#fde8ea,#fad1d6);--spot:rgba(201,111,74,.2)"><span>🌸</span><i class="ar" style="font-style:normal">↗</i></div><div class="wm"><h3>Bloom Rebrand</h3><small>BRANDING</small></div></a>
    <a class="wc" href="#contact"><div class="wt spot" data-n="02" style="background:linear-gradient(145deg,#e6ede1,#cddbc4)"><span>📱</span><i class="ar" style="font-style:normal">↗</i></div><div class="wm"><h3>Nimbus App</h3><small>UI/UX</small></div></a>
    <a class="wc" href="#contact"><div class="wt spot" data-n="03" style="background:linear-gradient(145deg,#f8efdc,#f5c9b3)"><span>🏛️</span><i class="ar" style="font-style:normal">↗</i></div><div class="wm"><h3>Terra Studio</h3><small>WEB DESIGN</small></div></a>
    <a class="wc" href="#contact"><div class="wt spot" data-n="04" style="background:linear-gradient(145deg,#d9d3ff,#fad1d6)"><span>🪐</span><i class="ar" style="font-style:normal">↗</i></div><div class="wm"><h3>Orbit Dashboard</h3><small>PRODUCT</small></div></a>
  </div>
</div></section>

<section id="services"><div class="wrap">
  <div class="reveal"><p class="eyebrow" style="color:#f5b5bd">Services</p><h2 style="font-size:clamp(36px,6vw,72px)">What we do best</h2></div>
  <div class="sv reveal">
    <div class="sr"><b>01</b><h3>Brand identity</h3><p>Logos, colour and type systems that make you instantly recognisable.</p></div>
    <div class="sr"><b>02</b><h3>UI/UX design</h3><p>Research-led interfaces that feel effortless on every screen.</p></div>
    <div class="sr"><b>03</b><h3>Web design &amp; build</h3><p>Fast, responsive websites crafted with care and clean code.</p></div>
    <div class="sr"><b>04</b><h3>Art direction</h3><p>A consistent visual voice across every channel and campaign.</p></div>
  </div>
</div></section>

<section id="contact" style="padding-top:20px"><div class="wrap"><div class="band reveal"><h2>Have a project in mind?</h2><a class="mail" href="#top">hello@example.com</a></div></div></section>

<footer><span>© ${n}</span><span>${c} demo · Made with care</span></footer>
`
  );

/* ----------------------------- Selection ----------------------------- */

const has = (text, words) => words.some((w) => new RegExp("\\b" + w, "i").test(text));

function pickTemplate({ title = "", desc = "", category = "", template } = {}) {
  if (["saas", "store", "ai", "agency"].includes(template)) return template;

  const cat = String(category).trim().toLowerCase();
  if (cat === "ai") return "ai";
  if (cat === "landing page") return "saas";
  if (cat === "e-commerce") return "store";
  if (cat === "ui/ux" || cat === "branding") return "agency";

  // Fallback for other categories: look at the title and description
  const text = title + " " + desc;
  if (/\bai\b/i.test(text) || has(text, ["chatbot", "assistant", "machine learning", "artificial"])) return "ai";
  if (has(text, ["e-commerce", "ecommerce", "store", "shop", "fashion"])) return "store";
  if (has(text, ["portfolio", "photograph", "agency", "branding", "identity"])) return "agency";
  return "saas";
}

export function buildDemoPage(project = {}) {
  const n = esc(project.title || "Demo");
  const l = esc(project.icon || "✨");
  const c = esc(project.category || "Website");
  const builders = { saas, store, ai, agency };
  return builders[pickTemplate(project)](n, l, c);
}

export default buildDemoPage;