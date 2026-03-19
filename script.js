// Конфигурация — замените ссылки и логотип здесь
const CONFIG = {
  tournamentName: "GLuck SixSeven",
  logoPath: "logo.png",
  rulesUrl: "https://example.com/rules.pdf",
  registerUrl: "https://forms.gle/9JXuXTXPVzs4Ew3S8",
  teamsUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMDQmzIQJ75duIP6UM-NohDdaZ0a-PMlGbQcNq1BpYCf2DczoAJWR883Qmtdlvmm279fWXy0JFD0M5/pubhtml?gid=190520418&single=true",
  twitchUrl: "https://twitch.tv/gluck_esports",
  hltvUrl: "https://www.hltv.org/event/your-event",
  tgUrl: "https://t.me/+96MfsKYpHrIxNWEy"
};

document.addEventListener('DOMContentLoaded', () => {
  // logo
  const logo = document.getElementById('tournament-logo');
  if (logo) logo.src = CONFIG.logoPath;

  // year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // links
  const map = [
    ['link-rules', CONFIG.rulesUrl],
    ['link-register', CONFIG.registerUrl],
    ['btn-register', CONFIG.registerUrl],
    ['btn-teams', CONFIG.teamsUrl],
    ['btn-twitch', CONFIG.twitchUrl],
    ['btn-hltv', CONFIG.hltvUrl],
    ['btn-tg', CONFIG.tgUrl],
    ['footer-twitch', CONFIG.twitchUrl],
    ['footer-hltv', CONFIG.hltvUrl],
    ['footer-tg', CONFIG.tgUrl]
  ];
  map.forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  });

  // auto-open section by hash (e.g., #qualifiers or #prize)
  const hash = window.location.hash.replace('#','');
  if (hash) {
    const el = document.getElementById(hash);
    if (el && el.tagName === 'DETAILS') {
      el.open = true;
      setTimeout(()=> el.scrollIntoView({behavior:'smooth', block:'center'}), 200);
    }
  }

  initParticles();
});

// Лёгкая анимация точек на фоне (умеренная яркость, не затемняет низ)
function initParticles(){
  const container = document.getElementById('bg-canvas');
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w = canvas.width, h = canvas.height;
  window.addEventListener('resize', () => {
    w = canvas.width = container.clientWidth;
    h = canvas.height = container.clientHeight;
  });

  const particles = Array.from({length: 26}).map(()=>({
    x: Math.random()*w,
    y: Math.random()*h,
    r: 0.6 + Math.random()*2.2,
    vx: (Math.random()-0.5)*0.25,
    vy: (Math.random()-0.5)*0.25,
    hue: 200 + Math.random()*60,
    alpha: 0.06 + Math.random()*0.08
  }));

  function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w+20;
      if (p.x > w+20) p.x = -20;
      if (p.y < -20) p.y = h+20;
      if (p.y > h+20) p.y = -20;
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*10);
      g.addColorStop(0, `hsla(${p.hue},90%,60%,${p.alpha})`);
      g.addColorStop(1, `hsla(${p.hue},90%,60%,0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r*8,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}
