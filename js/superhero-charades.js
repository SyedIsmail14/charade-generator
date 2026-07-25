// ============================================================
//  superhero-charades.js  –  Superhero Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  kids: [
    "Spider-Man shooting web from wrist",
    "Superman flying with cape behind",
    "Batman gliding down from rooftop",
    "Wonder Woman with golden lasso",
    "Iron Man flying in metal suit",
    "Hulk smashing through a wall",
    "Captain America throwing his shield",
    "The Flash running impossibly fast",
    "Black Panther crouching ready to pounce",
    "Elastigirl stretching arms very far",
    "Spider-Man climbing a wall",
    "Superman lifting a heavy object",
    "Batman throwing a batarang",
    "Wonder Woman deflecting bullets",
    "Iron Man's repulsor blast pose",
    "Hulk angry roaring and stomping",
    "Captain America shield bashing",
    "Flash spinning arms to speed up",
    "Black Panther doing Wakanda salute",
    "Spider-Man swinging between buildings"
  ],
  marvel: [
    "Thor swinging his mighty hammer",
    "Doctor Strange opening a portal",
    "Black Widow doing acrobatic flip",
    "Hawkeye drawing back his bow",
    "Wolverine extending metal claws",
    "Star-Lord dancing while fighting",
    "Groot saying I am Groot slowly",
    "Ant-Man shrinking down small",
    "Scarlet Witch using red energy hands",
    "Captain Marvel glowing with power",
    "Vision phasing through a wall",
    "Falcon flying with wings out",
    "War Machine firing shoulder cannon",
    "Spider-Man's web-slinging pose",
    "Daredevil listening for heartbeats",
    "Deadpool breaking fourth wall",
    "Rocket Raccoon shooting guns",
    "Gamora knife fighting stance",
    "Drax doing invisible pushups",
    "Mantis feeling emotions"
  ],
  dc: [
    "Aquaman commanding ocean creatures",
    "Green Lantern creating light constructs",
    "Cyborg scanning with mechanical eye",
    "Shazam transforming with lightning",
    "Batgirl swinging from a rooftop",
    "Green Arrow drawing back his bow",
    "Supergirl flying protectively",
    "The Flash vibrating through a wall",
    "Martian Manhunter shapeshifting",
    "Robin doing acrobatic somersault",
    "Wonder Woman with bracelets clashing",
    "Superman heat vision firing",
    "Batman disappearing into shadows",
    "Aquaman swimming underwater",
    "Green Lantern flying with ring",
    "Cyborg arm cannon firing",
    "Shazam flying with lightning trail",
    "Green Arrow trick shot with arrow",
    "Nightwing flipping through the air",
    "Zatanna casting magic spell"
  ],
  powers: [
    "Flying through the sky freely",
    "Turning completely invisible",
    "Super strength lifting a car",
    "Reading someone's mind telepathically",
    "Shapeshifting into another person",
    "Time travelling to the past",
    "Teleporting instantly to new place",
    "Super speed running in a blur",
    "X-ray vision seeing through walls",
    "Healing factor regenerating wounds",
    "Controlling fire with mind",
    "Creating ice with fingertips",
    "Magnetic manipulation of metals",
    "Plant control growing vines",
    "Water bending from the ocean",
    "Earth bending moving rocks",
    "Air bending creating tornados",
    "Energy blasts from hands",
    "Duplicating yourself multiple times",
    "Size changing from giant to tiny"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.marvel,
  ...charadesData.dc,
  ...charadesData.powers
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
    card.innerHTML = `<span class="card-emoji">🦸‍♂️</span><p>${p}</p>`;
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
