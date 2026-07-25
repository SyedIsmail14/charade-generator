// ============================================================
//  ramadan-charades.js  –  Ramadan Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  kids: [
    "Waking up sleepily for Suhoor",
    "Helping set the Iftar table",
    "Counting down minutes to Maghrib",
    "Decorating the house for Ramadan",
    "Giving sweets to a neighbour",
    "Drawing a crescent moon and star",
    "Helping mum cook for Iftar",
    "Learning a new short Surah",
    "Putting up Ramadan lanterns",
    "Excitedly checking the moon sighting",
    "Helping pour water for Iftar",
    "Practising counting prayers on fingers",
    "Wrapping a small Eid gift",
    "Reciting Bismillah before eating",
    "Helping arrange dates on a plate",
    "Drawing a mosque for Ramadan art",
    "Asking when Iftar time is",
    "Helping fold prayer mats neatly",
    "Listening to Ramadan stories",
    "Practising saying Ramadan Mubarak"
  ],
  fasting: [
    "Waking up for Suhoor before dawn",
    "Resisting food while very hungry",
    "Drinking water before Fajr time",
    "Feeling thirsty in the afternoon heat",
    "Checking the clock for Iftar time",
    "Breaking fast with a date",
    "Drinking water after a long fast",
    "Working through the day while fasting",
    "Smelling Iftar food cooking nearby",
    "Feeling grateful after breaking the fast",
    "Brushing teeth carefully during fast",
    "Avoiding the urge to taste food while cooking",
    "Feeling weak in the last hour of fasting",
    "Watching the sun slowly set",
    "Setting an alarm for Suhoor time",
    "Patiently waiting through a long day",
    "Reciting dua before breaking the fast",
    "Feeling energised after Suhoor meal",
    "Avoiding arguments while fasting",
    "Smiling through hunger with patience"
  ],
  tarawih: [
    "Praying Tarawih standing in rows",
    "Reciting Quran with concentration",
    "Making dua with raised hands",
    "Listening to the Imam's recitation",
    "Bowing in Ruku during prayer",
    "Sitting quietly after Tarawih",
    "Searching for Laylatul Qadr blessing",
    "Staying up late in Itikaf",
    "Reading Quran translation carefully",
    "Praying Qiyam in the last third of night",
    "Walking to the mosque for Tarawih",
    "Following the Imam's long Surah",
    "Sitting in Tashahhud during prayer",
    "Performing Sujood with devotion",
    "Counting Tarawih rounds carefully",
    "Reciting tasbih after prayer",
    "Reading Quran by torch light at night",
    "Sitting cross-legged listening to a lecture",
    "Making sincere dua for forgiveness",
    "Quietly reflecting after night prayer"
  ],
  eid: [
    "Spotting the Eid moon excitedly",
    "Wearing brand new Eid clothes",
    "Praying Eid prayer in large congregation",
    "Giving Eidi money to children",
    "Hugging family and saying Eid Mubarak",
    "Cooking special Eid breakfast",
    "Visiting relatives on Eid morning",
    "Applying henna before Eid",
    "Setting up an Eid celebration feast",
    "Taking a big family Eid photo",
    "Giving Zakat ul-Fitr before Eid prayer",
    "Children opening Eid gifts excitedly",
    "Preparing Eid sweets and desserts",
    "Wearing perfume before Eid prayer",
    "Greeting neighbours with Eid wishes",
    "Setting up balloons for Eid party",
    "Family gathering for Eid lunch",
    "Children showing off new Eid outfits",
    "Sharing Eid cake with the family",
    "Saying goodbye to Ramadan with gratitude"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.fasting,
  ...charadesData.tarawih,
  ...charadesData.eid
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
    card.innerHTML = `<span class="card-emoji">🌙</span><p>${p}</p>`;
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
