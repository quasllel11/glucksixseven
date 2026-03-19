// Конфигурация — замените ссылки и логотип здесь
const CONFIG = {
  tournamentName: "GLuck SixSeven",
  logoPath: "logo.png",
  rulesUrl: "https://example.com/rules.pdf",
  registerUrl: "https://forms.gle/9JXuXTXPVzs4Ew3S8",
  teamsUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMDQmzIQJ75duIP6UM-NohDdaZ0a-PMlGbQcNq1BpYCf2DczoAJWR883Qmtdlvmm279fWXy0JFD0M5/pubhtml?gid=190520418&single=true",
  twitchUrl: "https://twitch.tv/gluck_esports",
  hltvUrl: "https://www.hltv.org/event/your-event",
  tgUrl: "https://t.me/gluck_es"
};

// Применяем конфиг к элементам
document.addEventListener('DOMContentLoaded', () => {
  // logo
  const logo = document.getElementById('tournament-logo');
  if (logo) logo.src = CONFIG.logoPath;

  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // links
  const map = [
    ['link-rules', CONFIG.rulesUrl],
    ['link-rules-2', CONFIG.rulesUrl],
    ['link-register', CONFIG.registerUrl],
    ['link-register-2', CONFIG.registerUrl],
    ['btn-register', CONFIG.registerUrl],
    ['btn-teams', CONFIG.teamsUrl],
    ['link-teams-2', CONFIG.teamsUrl],
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

  // optional: open twitch in new window with focus
  const twitchBtn = document.getElementById('btn-twitch');
  if (twitchBtn) twitchBtn.addEventListener('click', (e) => {
    // hook for analytics if needed
  });

  // auto-open section by hash (e.g., #qualifiers)
  const hash = window.location.hash.replace('#','');
  if (hash) {
    const el = document.getElementById(hash);
    if (el && el.tagName === 'DETAILS') {
      el.open = true;
      el.scrollIntoView({behavior:'smooth', block:'center'});
    }
  }

  // simple animated particles background (lightweight)
  initParticles();
});

// Лёгкая анимация точек на фоне (тот же код, что был)
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

  const particles = Array.from({length: 28}).map(()=>({
    x: Math.random()*w,
    y: Math.random()*h,
    r: 0.6 + Math.random()*2.4,
    vx: (Math.random()-0.5)*0.2,
    vy: (Math.random()-0.5)*0.2,
    hue: 200 + Math.random()*60
  }));

  function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w+10;
      if (p.x > w+10) p.x = -10;
      if (p.y < -10) p.y = h+10;
      if (p.y > h+10) p.y = -10;
      ctx.beginPath();
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
      g.addColorStop(0, `hsla(${p.hue},90%,60%,0.12)`);
      g.addColorStop(1, `hsla(${p.hue},90%,60%,0)`);
      ctx.fillStyle = g;
      ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}
