// ============================================================
//  birthday-charades.js  –  Birthday Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  kids: [
    "Blowing out birthday candles",
    "Opening a surprise present excitedly",
    "Playing musical chairs",
    "Pinning the tail on the donkey blindfolded",
    "Popping balloons with your bottom",
    "Eating birthday cake very messily",
    "Pass the parcel unwrapping fast",
    "Wearing a paper party hat proudly",
    "Blowing up balloons until dizzy",
    "Singing happy birthday very shyly",
    "Musical statues freezing mid-dance",
    "Sack race hopping to finish line",
    "Treasure hunt finding the final clue",
    "Magician pulling rabbit from hat",
    "Balloon modelling going completely wrong",
    "Clown making funny balloon animals",
    "Pin the tail on donkey going wrong",
    "Birthday cake with sparkler candles",
    "Bouncy castle jumping too high",
    "Face painting at birthday party"
  ],
  party: [
    "Doing the limbo very low",
    "Piñata blindfolded swinging wildly",
    "Three-legged race falling with partner",
    "Egg and spoon race concentrating hard",
    "Tug of war losing at last second",
    "Surprise party jumping out together",
    "Carrying towering stack of presents",
    "Dancing to favourite birthday song",
    "Cutting first slice of birthday cake",
    "Throwing confetti dramatically in air",
    "Group photo everyone squeezing in",
    "Making a secret birthday wish",
    "Doing the worm on the dance floor",
    "Toasting with a birthday speech",
    "Clapping happy birthday completely off-beat",
    "Popping champagne and celebrating",
    "Birthday girl arriving at surprise party",
    "Party games going hilariously wrong",
    "Everyone doing the conga line",
    "Karaoke birthday performance"
  ],
  adult: [
    "Turning 40 and pretending to be completely fine",
    "Counting candles on an enormous cake",
    "Milestone birthday photo booth poses",
    "Planning a surprise party in total secret",
    "Birthday speech going on far too long",
    "Cake with too many candles to blow out",
    "Receiving anti-ageing cream as a gift",
    "Milestone birthday banner embarrassment",
    "Formal dinner birthday reservation",
    "Pretending the birthday is not happening",
    "Nostalgic birthday slideshow watching",
    "Booking a birthday trip surprise reveal",
    "Reading out heartfelt birthday cards",
    "Birthday party bus arriving at venue",
    "Hiding age on birthday cake diplomatically",
    "Renewing wedding vows as birthday surprise",
    "Midnight birthday countdown celebration",
    "Office surprise birthday party reaction",
    "Retirement birthday party speech",
    "Birthday spa day full relaxation"
  ],
  funny: [
    "Cake collapsing before candles lit",
    "Balloons deflating sadly overnight",
    "Forgetting your own birthday entirely",
    "Wrong name on birthday cake from bakery",
    "Trick candles relighting every single time",
    "Birthday song sung completely in wrong key",
    "Piñata refusing to break no matter what",
    "Party popper hitting someone in the face",
    "Birthday crown falling off all evening",
    "Cake delivery arriving completely wrong",
    "Surprise party everyone arriving on wrong day",
    "Birthday present wrapping tape stuck everywhere",
    "Candles setting off smoke alarm",
    "Birthday cake dropped on the floor",
    "Everyone forgot to bring a gift",
    "Birthday banner with spelling mistake",
    "Helium balloon voice when opening gifts",
    "Confetti cannon going off indoors",
    "Birthday video call with frozen screen",
    "Sitting on birthday cake accidentally"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.party,
  ...charadesData.adult,
  ...charadesData.funny
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
}

function setRound(n) {
  roundCount = n;
  document.querySelectorAll('.round-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-round="${n}"]`);
  if (btn) btn.classList.add('active');
}

// ── PROMPT ENGINE ─────────────────────────────────────────
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

// ── GENERATE ──────────────────────────────────────────────
function generate() {
  const prompts = getPrompts(currentMode, roundCount);
  const container = document.getElementById('cards');
  if (!container) return;
  container.innerHTML = '';
  prompts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<span class="card-emoji">🎂</span><p>${p}</p>`;
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
