// Конфигурация — замените ссылки и логотип здесь
const CONFIG = {
  tournamentName: "GLuck SixSeven",
  logoPath: "assets/logo.png",
  rulesUrl: "https://example.com/rules.pdf",
  registerUrl: "https://example.com/register",
  teamsUrl: "https://example.com/teams",
  twitchUrl: "https://twitch.tv/yourchannel",
  hltvUrl: "https://www.hltv.org/event/your-event",
  tgUrl: "https://t.me/yourchannel"
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
    // default behavior is fine; this is just a hook for analytics
  });

  // simple animated particles background (lightweight)
  initParticles();
});

// Лёгкая анимация точек на фоне
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
