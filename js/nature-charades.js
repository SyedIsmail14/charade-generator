// ============================================================
//  nature-charades.js  –  Nature Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  kids: [
    "Rain falling gently from clouds",
    "Flower blooming slowly open",
    "Butterfly flying from flower to flower",
    "Sun rising over the hills",
    "Wind blowing through the trees",
    "Snowflake falling and landing softly",
    "Seed being planted in soil",
    "Bird building a nest carefully",
    "Leaf falling slowly from a tree",
    "Rainbow appearing after the rain",
    "Bee buzzing from flower to flower",
    "Caterpillar crawling along a leaf",
    "Acorn falling from an oak tree",
    "Squirrel burying nuts for winter",
    "Cloud drifting slowly across sky",
    "Puddle forming after the rain",
    "Frog hopping between lily pads",
    "Worm wriggling through the soil",
    "Snail moving very slowly along",
    "Sunflower turning to face the sun"
  ],
  weather: [
    "Thunderstorm rolling in with lightning",
    "Heavy snow falling and piling up",
    "Strong wind blowing umbrella inside out",
    "Fog rolling slowly across a field",
    "Hailstones bouncing off the ground",
    "Heatwave making everyone fan themselves",
    "Drizzle turning into heavy downpour",
    "Frost forming on a window overnight",
    "Dust storm reducing visibility",
    "Double rainbow appearing after storm",
    "Sun breaking through storm clouds",
    "Gentle breeze rustling autumn leaves",
    "Hurricane winds bending palm trees",
    "Morning dew on the grass",
    "Lightning splitting the dark sky",
    "Blizzard making walking difficult",
    "Humid air making everyone sweat",
    "Gusty wind flipping an umbrella",
    "Misty morning over a quiet lake",
    "Rain pattering on a tin roof"
  ],
  plants: [
    "Seed sprouting into a tiny shoot",
    "Tree growing tall over many years",
    "Sunflower turning to follow the sun",
    "Roots growing deep into soil",
    "Vine climbing slowly up a wall",
    "Cactus storing water in dry desert",
    "Mushroom popping up overnight",
    "Autumn leaves changing colour",
    "Apple ripening on a tree branch",
    "Carnivorous plant catching an insect",
    "Bamboo growing rapidly upward",
    "Tulip bulb pushing through soil",
    "Tree losing leaves for winter",
    "Moss spreading across a damp rock",
    "Cherry blossom petals falling",
    "Vegetable garden growing in rows",
    "Tree rings forming over decades",
    "Fern uncurling its new leaves",
    "Pinecone dropping seeds to ground",
    "Photosynthesis converting sunlight to energy"
  ],
  phenomena: [
    "Volcano erupting with lava flow",
    "Earthquake shaking the ground",
    "Tornado spinning across a field",
    "Northern lights dancing in the sky",
    "Tidal wave rising and crashing",
    "Lightning striking a tall tree",
    "Avalanche sliding down a mountain",
    "Solar eclipse darkening the sky",
    "Sandstorm sweeping across desert",
    "Tsunami warning siren sounding",
    "Geyser erupting with hot water",
    "Glacier slowly cracking and shifting",
    "Meteor shower streaking across night sky",
    "Quicksand slowly pulling something down",
    "Bioluminescent waves glowing at night",
    "Sinkhole opening up suddenly",
    "Waterspout forming over the ocean",
    "Lunar eclipse turning moon red",
    "Wildfire spreading through dry forest",
    "Iceberg calving off a glacier"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.weather,
  ...charadesData.plants,
  ...charadesData.phenomena
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
    card.innerHTML = `<span class="card-emoji">🌿</span><p>${p}</p>`;
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
