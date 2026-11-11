const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function buildDemoPage({ title, icon, category }) {
  const name = esc(title);
  const logo = esc(icon);
  const cat = esc(category);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${name}</title>
<style>
:root{--blush:#fde8ea;--blush2:#fad1d6;--cream:#fdf8ee;--cream2:#f8efdc;--sage:#acc29f;--sage2:#cddbc4;--terra:#c96f4a;--terra2:#b05a3a;--ink:#3d3330}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--ink);background:var(--cream);line-height:1.6;overflow-x:hidden}
h1,h2,h3{font-family:Georgia,"Times New Roman",serif;letter-spacing:-0.02em;line-height:1.12}
a{color:inherit;text-decoration:none}

/* Navbar */
.nav{position:fixed;top:0;left:0;right:0;z-index:30;display:flex;align-items:center;justify-content:space-between;padding:14px 5vw;background:rgba(253,248,238,.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(61,51,48,.06)}
.brand{display:flex;align-items:center;gap:10px;font-family:Georgia,serif;font-weight:700;font-size:17px}
.brand .logo{width:32px;height:32px;border-radius:10px;background:var(--blush);display:grid;place-items:center;font-size:17px}
.links{display:flex;gap:26px;font-size:14px;font-weight:500}
.links a{opacity:.7;transition:opacity .2s,color .2s}
.links a:hover{opacity:1;color:var(--terra)}
.btn{display:inline-block;border-radius:999px;padding:12px 24px;font-weight:600;font-size:15px;border:0;cursor:pointer;transition:transform .25s,box-shadow .25s,background .25s}
.btn-primary{background:var(--terra);color:#fffdf8;box-shadow:0 10px 30px -12px rgba(176,90,58,.6)}
.btn-primary:hover{transform:translateY(-3px);background:var(--terra2)}
.btn-ghost{background:#fffdf8;color:var(--ink);border:1px solid var(--blush2)}
.btn-ghost:hover{transform:translateY(-3px)}
.nav .btn{padding:9px 18px;font-size:13px}
@media(max-width:640px){.links{display:none}}

/* Hero */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;padding:110px 5vw 80px;background:linear-gradient(160deg,#fff5f6 0%,#fdf8ee 55%,#e6ede1 100%);overflow:hidden}
.hero-inner{position:relative;z-index:2;max-width:620px}
.pill{display:inline-block;background:var(--sage2);color:#546d48;font-size:13px;font-weight:600;padding:6px 14px;border-radius:999px;margin-bottom:22px;animation:fadeUp .8s both}
.hero h1{font-size:clamp(36px,6vw,64px);margin-bottom:20px;animation:fadeUp .8s .1s both}
.hero h1 em{color:var(--terra)}
.lead{font-size:clamp(15px,1.8vw,18px);opacity:.72;max-width:480px;margin-bottom:30px;animation:fadeUp .8s .2s both}
.cta{display:flex;gap:14px;flex-wrap:wrap;animation:fadeUp .8s .3s both}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}

.blob{position:absolute;border-radius:50%;animation:float 9s ease-in-out infinite}
.b1{width:260px;height:260px;background:rgba(250,209,214,.7);left:-70px;top:90px}
.b2{width:150px;height:150px;border-radius:42% 58% 63% 37%/45% 40% 60% 55%;background:rgba(205,219,196,.85);right:12%;top:110px;animation-duration:7s;animation-delay:.4s}
.b3{width:56px;height:56px;background:rgba(224,165,140,.7);left:46%;bottom:80px;animation-duration:6s}
.b4{width:300px;height:300px;border-radius:60% 40% 30% 70%/60% 30% 70% 40%;background:rgba(245,181,189,.45);right:-80px;bottom:-90px;animation-duration:11s}
@keyframes float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-26px) rotate(8deg)}}

.float-card{position:absolute;z-index:3;display:flex;align-items:center;gap:12px;background:#fffdf8;border-radius:20px;padding:14px 18px;box-shadow:0 18px 40px -16px rgba(61,51,48,.25);font-size:13px;line-height:1.35;animation:bob 6s ease-in-out infinite}
.float-card b{display:block;font-size:14px}
.float-card .ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;font-size:18px}
.fc1{right:7%;top:28%}
.fc2{right:15%;bottom:18%;animation-delay:1.3s}
.fc3{right:30%;top:16%;animation-delay:.6s}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@media(max-width:860px){.float-card{display:none}}

/* Marquee */
.marquee{overflow:hidden;background:var(--ink);color:var(--cream);padding:16px 0}
.track{display:flex;gap:48px;width:max-content;animation:scroll 24s linear infinite;font-size:14px;font-weight:600;letter-spacing:.05em;white-space:nowrap}
@keyframes scroll{to{transform:translateX(-50%)}}

/* Sections */
section{padding:90px 5vw;scroll-margin-top:60px}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--terra);margin-bottom:12px}
.head{text-align:center;max-width:620px;margin:0 auto 54px}
.head h2{font-size:clamp(28px,4vw,42px);margin-bottom:12px}
.head p{opacity:.7}

.reveal{opacity:0;transform:translateY(32px);transition:opacity .8s ease,transform .8s ease}
.reveal.in{opacity:1;transform:none}

/* Features */
#features{background:var(--cream)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px;max-width:1080px;margin:0 auto}
.fcard{background:#fffdf8;border-radius:28px;padding:28px;box-shadow:0 4px 20px -4px rgba(61,51,48,.08);transition:transform .35s,box-shadow .35s,opacity .8s}
.fcard:hover{transform:translateY(-8px);box-shadow:0 18px 40px -16px rgba(176,90,58,.35)}
.fcard .ic{width:52px;height:52px;border-radius:16px;display:grid;place-items:center;font-size:24px;margin-bottom:18px;transition:transform .35s}
.fcard:hover .ic{transform:scale(1.12) rotate(8deg)}
.fcard h3{font-size:20px;margin-bottom:8px}
.fcard p{font-size:14px;opacity:.7}

/* Showcase */
#showcase{background:linear-gradient(180deg,#fff5f6,#fdf8ee)}
.split{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;max-width:1080px;margin:0 auto}
@media(max-width:820px){.split{grid-template-columns:1fr;gap:36px}}
.split h2{font-size:clamp(28px,4vw,40px);margin-bottom:16px}
.split p{opacity:.72;margin-bottom:22px}
.checks{list-style:none;display:grid;gap:12px}
.checks li{display:flex;align-items:center;gap:12px;font-weight:500}
.checks li:before{content:"✓";flex:none;width:26px;height:26px;border-radius:50%;background:var(--sage2);color:#546d48;display:grid;place-items:center;font-size:13px}
.window{background:#fffdf8;border-radius:24px;box-shadow:0 30px 60px -24px rgba(61,51,48,.3);overflow:hidden;animation:bob 7s ease-in-out infinite}
.wbar{display:flex;gap:7px;padding:14px 18px;border-bottom:1px solid var(--blush)}
.wbar i{width:10px;height:10px;border-radius:50%;background:var(--blush2)}
.wbar i:nth-child(2){background:var(--cream2)}
.wbar i:nth-child(3){background:var(--sage2)}
.wbody{padding:22px}
.chart{height:150px;display:flex;align-items:flex-end;gap:12px;padding-bottom:6px}
.bar{flex:1;height:var(--h);border-radius:10px 10px 4px 4px;background:linear-gradient(180deg,var(--terra),#e0a58c);transform-origin:bottom;animation:grow 2.6s ease-in-out infinite alternate}
.bar:nth-child(2n){background:linear-gradient(180deg,var(--sage),var(--sage2))}
.bar:nth-child(2){animation-delay:.2s}.bar:nth-child(3){animation-delay:.4s}.bar:nth-child(4){animation-delay:.6s}.bar:nth-child(5){animation-delay:.8s}.bar:nth-child(6){animation-delay:1s}.bar:nth-child(7){animation-delay:1.2s}
@keyframes grow{from{transform:scaleY(.45)}to{transform:scaleY(1)}}
.rows{margin-top:18px;display:grid;gap:12px}
.row{display:flex;align-items:center;gap:12px}
.dot{width:28px;height:28px;border-radius:50%;background:var(--blush)}
.line{height:9px;border-radius:99px;background:rgba(61,51,48,.1)}
.w1{width:60%}.w2{width:45%}.w3{width:70%}

/* CTA */
.cta-band{position:relative;overflow:hidden;max-width:1080px;margin:0 auto;border-radius:36px;padding:70px 6vw;text-align:center;color:#fffdf8;background:linear-gradient(135deg,var(--terra),#d58a6b)}
.cta-band h2{font-size:clamp(28px,4vw,42px);margin-bottom:14px;position:relative}
.cta-band p{opacity:.85;margin-bottom:28px;position:relative}
.cta-band .btn{background:#fffdf8;color:var(--terra2);position:relative}
.cta-band .btn:hover{background:var(--cream)}
.cta-band .c1,.cta-band .c2{position:absolute;border-radius:50%;background:rgba(255,253,248,.12);animation:float 10s ease-in-out infinite}
.cta-band .c1{width:200px;height:200px;left:-50px;top:-60px}
.cta-band .c2{width:260px;height:260px;right:-70px;bottom:-100px;animation-delay:1s}

footer{padding:40px 5vw;text-align:center;font-size:13px;opacity:.6}
</style>
</head>
<body>

<nav class="nav">
  <a class="brand" href="#top"><span class="logo">${logo}</span>${name}</a>
  <div class="links">
    <a href="#features">Features</a>
    <a href="#showcase">Showcase</a>
    <a href="#contact">Contact</a>
  </div>
  <a class="btn btn-primary" href="#contact">Get started</a>
</nav>

<header class="hero" id="top">
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>
  <div class="blob b4"></div>

  <div class="float-card fc3"><span class="ic" style="background:#fde8ea">⚡</span><div><b>Lightning fast</b>Optimised for speed</div></div>
  <div class="float-card fc1"><span class="ic" style="background:#e6ede1">🎨</span><div><b>Beautiful design</b>Pixel perfect details</div></div>
  <div class="float-card fc2"><span class="ic" style="background:#f8efdc">📱</span><div><b>Fully responsive</b>Every screen size</div></div>

  <div class="hero-inner">
    <span class="pill">${cat} · Live preview</span>
    <h1>Websites that feel <em>effortless</em> to use</h1>
    <p class="lead">A modern, fast and fully responsive experience, designed with care and built with clean, modern code.</p>
    <div class="cta">
      <a class="btn btn-primary" href="#features">Explore features</a>
      <a class="btn btn-ghost" href="#showcase">See it in action</a>
    </div>
  </div>
</header>

<div class="marquee">
  <div class="track">
    <span>✦ Responsive</span><span>✦ Accessible</span><span>✦ Animated</span><span>✦ Fast</span><span>✦ Modern</span><span>✦ Clean code</span>
    <span>✦ Responsive</span><span>✦ Accessible</span><span>✦ Animated</span><span>✦ Fast</span><span>✦ Modern</span><span>✦ Clean code</span>
  </div>
</div>

<section id="features">
  <div class="head reveal">
    <p class="eyebrow">Features</p>
    <h2>Everything you need, nothing you don't</h2>
    <p>Thoughtful details that make every page a pleasure to use.</p>
  </div>
  <div class="grid">
    <div class="fcard reveal"><div class="ic" style="background:#fde8ea">⚡</div><h3>Blazing fast</h3><p>Lightweight pages that load in a blink and stay smooth on every device.</p></div>
    <div class="fcard reveal" style="transition-delay:.1s"><div class="ic" style="background:#e6ede1">📱</div><h3>Fully responsive</h3><p>Layouts that adapt beautifully from small phones to large desktop screens.</p></div>
    <div class="fcard reveal" style="transition-delay:.2s"><div class="ic" style="background:#f8efdc">🎨</div><h3>Thoughtful design</h3><p>A consistent system of colour, type and spacing ties every section together.</p></div>
    <div class="fcard reveal"><div class="ic" style="background:#fad1d6">✨</div><h3>Smooth animations</h3><p>Subtle motion guides attention without ever getting in the way.</p></div>
    <div class="fcard reveal" style="transition-delay:.1s"><div class="ic" style="background:#cddbc4">♿</div><h3>Accessible</h3><p>Readable contrast, clear structure and keyboard-friendly navigation.</p></div>
    <div class="fcard reveal" style="transition-delay:.2s"><div class="ic" style="background:#f0e3c6">🧩</div><h3>Reusable components</h3><p>Clean, modular building blocks make every page easy to extend.</p></div>
  </div>
</section>

<section id="showcase">
  <div class="split">
    <div class="reveal">
      <p class="eyebrow">Showcase</p>
      <h2>Designed to look great and work even better</h2>
      <p>Every interaction is polished, from the first scroll to the final click, so visitors feel at home straight away.</p>
      <ul class="checks">
        <li>Clear visual hierarchy</li>
        <li>Smooth, purposeful motion</li>
        <li>Consistent pastel theme</li>
      </ul>
    </div>
    <div class="window reveal">
      <div class="wbar"><i></i><i></i><i></i></div>
      <div class="wbody">
        <div class="chart">
          <div class="bar" style="--h:45%"></div>
          <div class="bar" style="--h:70%"></div>
          <div class="bar" style="--h:55%"></div>
          <div class="bar" style="--h:85%"></div>
          <div class="bar" style="--h:60%"></div>
          <div class="bar" style="--h:95%"></div>
          <div class="bar" style="--h:75%"></div>
        </div>
        <div class="rows">
          <div class="row"><span class="dot"></span><span class="line w1"></span></div>
          <div class="row"><span class="dot" style="background:#cddbc4"></span><span class="line w2"></span></div>
          <div class="row"><span class="dot" style="background:#f0e3c6"></span><span class="line w3"></span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="contact">
  <div class="cta-band reveal">
    <span class="c1"></span><span class="c2"></span>
    <h2>Ready to get started?</h2>
    <p>Join in and see how good a modern website can feel.</p>
    <a class="btn" href="#top">Back to top ↑</a>
  </div>
</section>

<footer>© ${name} · ${cat} demo page</footer>

<script>
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var el = document.querySelector(a.getAttribute('href'));
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  });
});
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
</script>
</body>
</html>`;
}