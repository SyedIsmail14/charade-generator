// ============================================================
//  bollywood-charades.js  –  Bollywood Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

/* ── PROMPT DATA ─────────────────────────────────────────── */
const charadesData = {
  classic: [
    "Sholay — Gabbar Singh asking kitne aadmi the",
    "DDLJ — running through mustard field towards train",
    "Mother India — sacrificing everything for values",
    "Mughal-e-Azam — royal court confrontation scene",
    "Deewar — mere paas maa hai dialogue emotion",
    "Sholay — Veeru on water tank threatening to jump",
    "Amar Akbar Anthony — three brothers reuniting",
    "Pyaasa — rejected poet finding recognition",
    "Don — don ko pakadna mushkil hai swagger",
    "Hum — angry father confronting family",
    "Shree 420 — innocent man arriving in big city",
    "Guide — dancer finding freedom and identity",
    "Anand — terminally ill man spreading joy",
    "Kabhi Kabhie — poet reciting heartfelt verses",
    "Trishul — business empire family rivalry",
    "Silsila — complicated love triangle drama",
    "Bobby — young lovers eloping dramatically",
    "Sangam — best friends in love triangle",
    "Waqt — family separated then reunited",
    "Kismet — fate bringing characters together"
  ],
  modern: [
    "3 Idiots — All is Well calming chant",
    "Dangal — wrestling training with daughters",
    "PK — alien confused by Indian customs",
    "Bajrangi Bhaijaan — crossing India Pakistan border",
    "Lagaan — village cricket team celebrating victory",
    "Taare Zameen Par — dyslexic child drawing beautifully",
    "Dil Chahta Hai — three friends on road trip",
    "Kabhi Khushi Kabhie Gham — emotional airport reunion",
    "Kuch Kuch Hota Hai — college friendship triangle",
    "Devdas — heartbroken man drinking dramatically",
    "Zindagi Na Milegi Dobara — friends skydiving together",
    "Queen — woman finding herself solo honeymoon",
    "Barfi — deaf mute man falling in love",
    "Swades — NRI returning to help his village",
    "Rang De Basanti — youth fighting for justice",
    "Chak De India — coach training women hockey team",
    "My Name Is Khan — man with autism seeking president",
    "Andhadhun — blind pianist witnessing crime",
    "Gully Boy — street rapper chasing his dreams",
    "Article 15 — officer fighting caste discrimination"
  ],
  songs: [
    "Mere Sapno Ki Rani — running after car on hill road",
    "Chaiyya Chaiyya — dancing on top of moving train",
    "Jai Ho — big celebration dance finale",
    "Dhoom Machale — motorcycle stunt riding fast",
    "Dola Re Dola — two heroines dancing together",
    "Kuch Kuch Hota Hai — basketball court romance dance",
    "Bole Chudiyan — big family wedding song dance",
    "Kajra Re — flirtatious eye contact dance",
    "Senorita — hiding a secret love confession",
    "Gallan Goodiyaan — whole family celebration dance",
    "Tujhe Dekha To — running through fields in love",
    "Pehla Nasha — first love butterflies feeling",
    "London Thumakda — wedding sangeet dance energy",
    "Malhari — energetic victory celebration dance",
    "Badtameez Dil — carefree happy dancing crowd",
    "Channa Mereya — heartbroken emotional ballad",
    "Kala Chashma — confident sunglasses pose dance",
    "Tum Hi Ho — romantic devotion love song",
    "Nagada Sang Dhol — festive Navratri garba dance",
    "Sheila Ki Jawani — confident glamorous dance number"
  ],
  scenes: [
    "DDLJ — Raj extending hand at the train door",
    "3 Idiots — graduation ceremony heartfelt speech",
    "Sholay — Jai and Veeru coin toss friendship ritual",
    "Devdas — drinking alone by candlelight",
    "Lagaan — final over of tense cricket match",
    "Dangal — Geeta winning gold at Commonwealth Games",
    "Taare Zameen Par — teacher recognising hidden talent",
    "PK — questioning religious middlemen in confusion",
    "Bajrangi Bhaijaan — mute girl finding her voice",
    "Koi Mil Gaya — Hrithik meeting alien Jadoo",
    "Veer-Zaara — decades-long separated lovers reunion",
    "Border — soldiers holding the line at night",
    "Black — teacher helping blind deaf girl learn",
    "Rockstar — musician performing emotional concert",
    "Gangs of Wasseypur — gang rivalry tension scene",
    "Pink — woman standing up against injustice",
    "Article 15 — confronting village caste system",
    "Uri — soldiers planning surgical strike",
    "Padmaavat — queen's fierce royal procession",
    "Bajirao Mastani — epic sword fight battle scene"
  ]
};

charadesData.all = [
  ...charadesData.classic,
  ...charadesData.modern,
  ...charadesData.songs,
  ...charadesData.scenes
];

/* ── GAME STATE ──────────────────────────────────────────── */
let currentMode  = 'all';
let roundCount   = 1;
let usedIndices  = {};

/* ── TIMER STATE ─────────────────────────────────────────── */
const TIMER_TOTAL = 30;
let timeLeft      = TIMER_TOTAL;
let timerInterval = null;
let timerRunning  = false;

/* ── TIMER FUNCTIONS ─────────────────────────────────────── */
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

/* ── MODE & ROUND ────────────────────────────────────────── */
function setMode(mode) {
  currentMode = mode;
  usedIndices[mode] = usedIndices[mode] || [];
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-mode="${mode}"]`);
  if (btn) btn.classList.add('active');
}

function setRound(n) {
  roundCount = n;
  document.querySelectorAll('.round-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-round="${n}"]`);
  if (btn) btn.classList.add('active');
}

/* ── PROMPT ENGINE ───────────────────────────────────────── */
function getPrompts(mode, n) {
  const pool = charadesData[mode] || charadesData.all;
  if (!usedIndices[mode]) usedIndices[mode] = [];
  if (usedIndices[mode].length >= pool.length) usedIndices[mode] = [];
  const available = pool.map((_, i) => i).filter(i => !usedIndices[mode].includes(i));
  const shuffled  = available.sort(() => Math.random() - 0.5);
  const selected  = shuffled.slice(0, Math.min(n, available.length));
  usedIndices[mode].push(...selected);
  return selected.map(i => pool[i]);
}

/* ── GENERATE ────────────────────────────────────────────── */
function generate() {
  const prompts = getPrompts(currentMode, roundCount);
  const container = document.getElementById('cards');
  if (!container) return;
  container.innerHTML = '';
  prompts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<span class="card-emoji">🎥</span><p>${p}</p>`;
    container.appendChild(card);
  });
  resetTimer(true);
}

/* ── COPY ────────────────────────────────────────────────── */
function copyCharades() {
  const cards = document.querySelectorAll('#cards .card p');
  if (!cards.length) return;
  const text = Array.from(cards).map(c => c.textContent).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById('copyMsg');
    if (msg) { msg.style.display = 'inline'; setTimeout(() => msg.style.display = 'none', 2000); }
  });
}

/* ── FULLSCREEN ──────────────────────────────────────────── */
function toggleFullScreen() {
  const area = document.getElementById('gameArea');
  if (!area) return;
  if (!document.fullscreenElement) area.requestFullscreen && area.requestFullscreen();
  else document.exitFullscreen && document.exitFullscreen();
}

/* ── NAV ─────────────────────────────────────────────────── */
function toggleMenu() {
  const nav = document.getElementById('navMobile');
  if (nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setMode('all');
  setRound(1);
  drawTimer(TIMER_TOTAL);
});
