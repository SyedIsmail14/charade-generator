// ============================================================
//  christmas-charades.js  –  Christmas Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  santa: [
    "Santa sliding down chimney",
    "Santa checking naughty list",
    "Elf wrapping presents fast",
    "Rudolph guiding the sleigh",
    "Elf testing toys in workshop",
    "Reindeer taking off runway",
    "Santa eating milk and cookies",
    "Mrs Claus knitting by fire",
    "Elf on the shelf spying",
    "Santa ho-ho-ho laughing",
    "Santa getting stuck in chimney",
    "Rudolph with glowing red nose",
    "Elves making toys in workshop",
    "Santa climbing down chimney",
    "Reindeer flying in formation"
  ],
  traditions: [
    "Decorating Christmas tree",
    "Hanging stockings by fireplace",
    "Opening presents at dawn",
    "Kissing under mistletoe",
    "Carollers singing in snow",
    "Putting star on tree top",
    "Writing letter to Santa",
    "Leaving cookies for Santa",
    "Wrapping presents with ribbon",
    "Lighting advent calendar candle",
    "Drinking hot chocolate",
    "Building a snowman",
    "Making snow angels",
    "Having snowball fight",
    "Sledging down steep hill"
  ],
  movies: [
    "Home Alone booby trap",
    "Kevin screaming face mirror",
    "Buddy the Elf eating cotton balls",
    "Jack Skellington stealing Christmas",
    "Grinch stealing Christmas tree",
    "Scrooge counting gold coins",
    "Elf tasting all candy",
    "Die Hard running barefoot glass",
    "Polar Express train whistle",
    "Christmas Story leg lamp",
    "Grinch heart growing three sizes",
    "Rudolph saving Christmas",
    "Charlie Brown Christmas tree",
    "Frosty the Snowman melting",
    "Muppet Christmas Carol"
  ],
  winter: [
    "Building a snowman",
    "Ice skating gracefully",
    "Having snowball fight",
    "Making snow angel",
    "Sledging down steep hill",
    "Slipping on black ice",
    "Warming hands by fire",
    "Skiing down slope",
    "Catching snowflakes tongue",
    "Scraping ice off car",
    "Walking through deep snow",
    "Throwing snowballs",
    "Making snow forts",
    "Catching snowflakes",
    "Shivering in cold"
  ],
  food: [
    "Baking gingerbread cookies",
    "Decorating Christmas cake",
    "Pulling Christmas cracker",
    "Carving Christmas turkey",
    "Stirring Christmas pudding",
    "Drinking hot chocolate",
    "Eating candy cane slowly",
    "Rolling mince pie dough",
    "Popping Christmas popcorn",
    "Tasting mulled wine",
    "Mixing eggnog",
    "Roasting chestnuts",
    "Frosting cookies",
    "Making gingerbread house",
    "Whipping cream"
  ],
  carols: [
    "Jingle Bells horse sleigh",
    "12 Days of Christmas gifts",
    "Frosty the Snowman melting",
    "Rudolph red nose glowing",
    "Silent Night candle prayer",
    "We Wish You Merry Carol",
    "Little Drummer Boy drumming",
    "Deck the Halls holly branch",
    "Good King Wenceslas marching",
    "Away in a Manger cradle rock",
    "Hark the Herald Angels singing",
    "O Holy Night kneeling",
    "Joy to the World celebration",
    "O Come All Ye Faithful",
    "While Shepherds Watched"
  ]
};

charadesData.all = [
  ...charadesData.santa,
  ...charadesData.traditions,
  ...charadesData.movies,
  ...charadesData.winter,
  ...charadesData.food,
  ...charadesData.carols
];

// ── GAME STATE ────────────────────────────────────────────
let currentMode  = 'default';
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
    card.innerHTML = `<span class="card-emoji">🎄</span><p>${p}</p>`;
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
  setMode('default');
  setRound(1);
  drawTimer(TIMER_TOTAL);
});
