// ============================================================
//  dumb-charades.js  –  Dumb Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const MOVIES = [
  // Classics
  "Sholay","Mughal-e-Azam","Mother India","Deewar","Amar Akbar Anthony",
  "Pyaasa","Guide","Anand","Kabhi Kabhie","Trishul",
  "Silsila","Bobby","Sangam","Waqt","Kismet",
  // 90s Hits
  "DDLJ","Hum Aapke Hain Koun","Dil To Pagal Hai","Kuch Kuch Hota Hai",
  "Raja Hindustani","Judwaa","Biwi No.1","Pardes","Jeans","Chandramukhi",
  "Hum Saath Saath Hain","Kaho Naa Pyaar Hai","Mohabbatein","Devdas","Lagaan",
  // 2000s Hits
  "Kabhi Khushi Kabhie Gham","Dil Chahta Hai","Kal Ho Naa Ho","Taare Zameen Par",
  "Chak De India","Om Shanti Om","Rab Ne Bana Di Jodi","3 Idiots","Rockstar",
  "Barfi","Yeh Jawaani Hai Deewani","Wake Up Sid","Queen","Gully Boy",
  // Blockbusters
  "Dangal","Bajrangi Bhaijaan","PK","Padmaavat","Sanju","War","Kabir Singh",
  "Article 15","Uri","Gulabo Sitabo","Ludo","Mimi","Shershaah","Bhool Bhulaiyaa",
  // Musical Hits
  "Bajirao Mastani","Hum Dil De Chuke Sanam","Saajan","Aashiqui 2","Devdas",
  "Rockstar","Yeh Jawaani Hai Deewani","Barfi","Queen","Andhadhun",
  // Comedy Hits
  "Andaz Apna Apna","Hera Pheri","Phir Hera Pheri","Golmaal","Dhamaal",
  "Welcome","Singh Is Kinng","Housefull","Total Dhamaal","Golmaal Again",
  // Romantic Hits
  "Jab We Met","Ishq","Dhadak","Rang De Basanti","Jodhaa Akbar",
  "Yeh Jawaani Hai Deewani","Hum Tum","Saathiya","Fanaa","Kabhie Alvida Naa Kehna",
  // Thriller/Action
  "Don","Don 2","Race","Race 2","Singham","Singham Returns","Simmba",
  "Dabangg","Dabangg 2","Ek Tha Tiger","Tiger Zinda Hai","War","Pathaan",
  // Family Dramas
  "Kabhi Khushi Kabhie Gham","Dil Dhadakne Do","Kapoor & Sons","October","Piku",
  "Sultan","Dangal","Chhichhore","Badhaai Ho","Shubh Mangal Saavdhan"
];

// ── GAME STATE ────────────────────────────────────────────
let currentMode  = 'all';
let roundCount   = 1;
let usedIndices  = {};

// ── TIMER STATE ───────────────────────────────────────────
const TIMER_TOTAL = 30;
let timeLeft      = TIMER_TOTAL;
let timerInterval = null;
let timerRunning  = false;

// ── MODE FILTER ────────────────────────────────────────────
function getFilteredMovies() {
  let filtered = MOVIES;

  if (currentMode === 'easy') {
    filtered = MOVIES.filter(m => 
      ['Sholay','DDLJ','3 Idiots','Dangal','Kabhi Khushi Kabhie Gham','Hum Aapke Hain Koun','Kuch Kuch Hota Hai','Andaz Apna Apna','Hera Pheri','Lagaan'].includes(m)
    );
  } else if (currentMode === 'medium') {
    filtered = MOVIES.filter(m => 
      ['Devdas','Dil Chahta Hai','Taare Zameen Par','Chak De India','Om Shanti Om','Rab Ne Bana Di Jodi','Rockstar','Barfi','Yeh Jawaani Hai Deewani','Queen'].includes(m)
    );
  } else if (currentMode === 'hard') {
    filtered = MOVIES.filter(m => 
      ['Mughal-e-Azam','Pyaasa','Guide','Anand','Silsila','Sangam','Waqt','Kismet','Jeans','Chandramukhi','Ludo','Gulabo Sitabo','Mimi','Andhadhun'].includes(m)
    );
  }

  return filtered;
}

// ── TIMER FUNCTIONS ───────────────────────────────────────
function drawTimer(seconds) {
  const radius = 44;
  const circ   = 2 * Math.PI * radius;
  const dash   = (seconds / TIMER_TOTAL) * circ;
  const colour = seconds > 15 ? '#40c057' : seconds > 8 ? '#f59f00' : '#fa5252';
  const el = document.getElementById('timerRing');
  if (!el) return;
  el.innerHTML = `
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r="${radius}" fill="none" stroke="#e9ecef" stroke-width="8"/>
      <circle cx="55" cy="55" r="${radius}" fill="none" stroke="${colour}" stroke-width="8"
        stroke-linecap="round"
        stroke-dasharray="${dash} ${circ}"
        stroke-dashoffset="0"
        transform="rotate(-90 55 55)"
        style="transition:stroke-dasharray .35s ease,stroke .35s"/>
      <text x="55" y="50" text-anchor="middle" font-size="26" font-weight="700"
        fill="${colour}" font-family="system-ui,sans-serif">${seconds}</text>
      <text x="55" y="68" text-anchor="middle" font-size="11" fill="#868e96"
        font-family="system-ui,sans-serif">sec</text>
    </svg>`;
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  updateTimerBtn();
  timerInterval = setInterval(() => {
    timeLeft--;
    drawTimer(timeLeft);
    if (timeLeft <= 0) timeUp();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  updateTimerBtn();
}

function resetTimer(autoStart) {
  clearInterval(timerInterval);
  timerRunning = false;
  timeLeft = TIMER_TOTAL;
  drawTimer(timeLeft);
  hideTimeOver();
  updateTimerBtn();
  if (autoStart) startTimer();
}

function timeUp() {
  pauseTimer();
  showTimeOver();
}

function updateTimerBtn() {
  const btn = document.getElementById('timerToggleBtn');
  if (btn) btn.textContent = timerRunning ? '⏸ Pause' : '▶ Start';
}

function showTimeOver() {
  const el = document.getElementById('timeOverOverlay');
  if (el) el.style.display = 'flex';
}

function hideTimeOver() {
  const el = document.getElementById('timeOverOverlay');
  if (el) el.style.display = 'none';
}

// ── MODE & ROUND ──────────────────────────────────────────
function setMode(mode) {
  currentMode = mode;
  usedIndices[mode] = usedIndices[mode] || [];
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-mode="${mode}"]`);
  if (btn) btn.classList.add('active');
  generate();
}

function setRound(n) {
  roundCount = n;
  document.querySelectorAll('.round-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-round="${n}"]`);
  if (btn) btn.classList.add('active');
  generate();
}

// ── PROMPT ENGINE ─────────────────────────────────────────
function getPrompts(n) {
  const pool = getFilteredMovies();
  if (!usedIndices[currentMode]) usedIndices[currentMode] = [];
  if (usedIndices[currentMode].length >= pool.length) usedIndices[currentMode] = [];
  const available = pool.map((_, i) => i).filter(i => !usedIndices[currentMode].includes(i));
  const shuffled  = available.sort(() => Math.random() - 0.5);
  const selected  = shuffled.slice(0, Math.min(n, available.length));
  usedIndices[currentMode].push(...selected);
  return selected.map(i => pool[i]);
}

// ── GENERATE ──────────────────────────────────────────────
function generate() {
  const prompts = getPrompts(roundCount);
  const container = document.getElementById('cards');
  if (!container) return;
  container.innerHTML = '';
  prompts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<span class="card-emoji">🎬</span><p>${p}</p>`;
    container.appendChild(card);
  });
  resetTimer(true);
}

// ── COPY ──────────────────────────────────────────────────
function copyCharades() {
  const cards = document.querySelectorAll('#cards .card p');
  if (!cards.length) return;
  const text = Array.from(cards).map(c => c.textContent).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById('copyMsg');
    if (msg) { msg.style.display = 'inline'; setTimeout(() => msg.style.display = 'none', 2000); }
  });
}

// ── FULLSCREEN ────────────────────────────────────────────
function toggleFullScreen() {
  const area = document.getElementById('gameArea');
  if (!area) return;
  if (!document.fullscreenElement) area.requestFullscreen && area.requestFullscreen();
  else document.exitFullscreen && document.exitFullscreen();
}

// ── NAV ───────────────────────────────────────────────────
function toggleMenu() {
  const nav = document.getElementById('navMobile');
  if (nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setMode('all');
  setRound(1);
  drawTimer(TIMER_TOTAL);
});
