// ============================================================
//  summer-charades.js  –  Summer Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  kids: [
    "Building a sandcastle carefully",
    "Eating a dripping ice cream cone",
    "Splashing in a paddling pool",
    "Running through a garden sprinkler",
    "Catching fireflies at dusk",
    "Riding a bike with no hands",
    "Blowing bubbles in the garden",
    "Eating a popsicle before it melts",
    "Jumping in puddles after summer rain",
    "Flying a kite on a windy day",
    "Drawing with chalk on the pavement",
    "Playing hopscotch on a hot day",
    "Drinking from a garden hose",
    "Making a daisy chain crown",
    "Chasing butterflies in the garden",
    "Skipping rope in the sunshine",
    "Climbing a tree in the backyard",
    "Picking berries from a bush",
    "Splashing through sprinkler in swimsuit",
    "Eating watermelon and spitting seeds"
  ],
  beach: [
    "Surfing a big ocean wave",
    "Applying sunscreen all over",
    "Building an elaborate sandcastle",
    "Snorkelling among colourful fish",
    "Burying a friend in the sand",
    "Playing beach volleyball",
    "Floating on an inflatable in the sea",
    "Collecting seashells along shore",
    "Doing a cannonball into the pool",
    "Getting knocked over by a wave",
    "Digging a deep hole in the sand",
    "Lying on a beach towel relaxing",
    "Reading a book under a beach umbrella",
    "Paddleboarding across calm water",
    "Building a sand sculpture competition",
    "Diving deep underwater holding breath",
    "Walking along the shore at sunset",
    "Skipping stones across the water",
    "Getting sand stuck between toes",
    "Riding a jet ski across waves"
  ],
  camp: [
    "Roasting marshmallows over campfire",
    "Pitching a tent in the wind",
    "Telling a scary campfire story",
    "Hiking up a steep mountain trail",
    "Canoeing across a calm lake",
    "Singing camp songs around the fire",
    "Zip-lining through the trees",
    "Making a friendship bracelet",
    "Spotting wildlife on a nature walk",
    "Sleeping in a sleeping bag",
    "Catching fish at the lake",
    "Setting up a campfire carefully",
    "Using a compass to find the way",
    "Identifying stars in the night sky",
    "Cooking food over an open flame",
    "Crossing a river on stepping stones",
    "Spotting a bear from a distance nervously",
    "Rock climbing up a steep wall",
    "Packing a backpack for a hike",
    "Swimming in a cold mountain lake"
  ],
  funny: [
    "Forgetting sunscreen and turning red",
    "Stepping on something sharp at the beach",
    "Ice cream melting all over your hand",
    "Getting sand in every possible place",
    "Bee chasing you at a picnic",
    "Pool float deflating while you float",
    "Car air conditioning breaking in the heat",
    "Sunburn making sitting very uncomfortable",
    "Mosquito bites itching all night long",
    "Losing flip flop in the ocean waves",
    "Slipping on wet pool deck dramatically",
    "Getting splashed unexpectedly by a wave",
    "Sand getting everywhere in the car",
    "Trying to put up a beach umbrella in wind",
    "Realising sunglasses are upside down",
    "Jellyfish sting surprise in the ocean",
    "Running across hot sand barefoot",
    "Spilling a cold drink on yourself",
    "Getting stuck in a pool inflatable ring",
    "Watermelon juice dripping everywhere"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.beach,
  ...charadesData.camp,
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
    card.innerHTML = `<span class="card-emoji">☀️</span><p>${p}</p>`;
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
