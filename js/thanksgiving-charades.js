// ============================================================
//  thanksgiving-charades.js  –  Thanksgiving Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  kids: [
    "Turkey gobbling proudly",
    "Picking the perfect pumpkin",
    "Tracing hand to make turkey art",
    "Helping set the dinner table",
    "Watching parade balloons float by",
    "Making a paper Pilgrim hat",
    "Counting how many cousins arrived",
    "Squirrel gathering acorns for winter",
    "Raking autumn leaves into big piles",
    "Saying one thing you are thankful for",
    "Jumping into a pile of leaves",
    "Drawing a turkey using your hand",
    "Helping carry dishes to the table",
    "Playing with cousins before dinner",
    "Smelling the turkey cooking happily",
    "Wearing a paper turkey headband",
    "Watching grandma cook in the kitchen",
    "Setting out the name cards",
    "Pointing excitedly at parade floats",
    "Waiting impatiently for dinner to start"
  ],
  family: [
    "Whole family going around table sharing thanks",
    "Watching the Macy's parade on TV",
    "Grandma's secret recipe being guarded closely",
    "Family football game in the backyard",
    "Setting up the kids table separately",
    "Saying grace before the big meal",
    "Extended family arriving all at once",
    "Taking the annual family photo",
    "Watching football game after dinner",
    "Lighting the centrepiece candles",
    "Helping grandma carry dishes from kitchen",
    "Catching up with relatives you rarely see",
    "Setting the table with the good china",
    "Everyone fighting for the recliner",
    "Dad carving turkey with great ceremony",
    "Mom coordinating the entire kitchen",
    "Cousins catching up in the living room",
    "Grandpa telling the same story again",
    "Family dog begging under the table",
    "Three generations cooking together"
  ],
  food: [
    "Carving the turkey at the table",
    "Basting the turkey in the oven",
    "Mashing potatoes vigorously",
    "Stuffing the turkey carefully",
    "Pouring gravy over everything",
    "Slicing the pumpkin pie",
    "Passing the cranberry sauce around",
    "Whipping the cream for dessert",
    "Setting out the green bean casserole",
    "Fighting over the last dinner roll",
    "Testing turkey temperature nervously",
    "Making cornbread stuffing from scratch",
    "Candying the sweet potatoes",
    "Setting out the relish tray",
    "Carrying the heavy turkey to table",
    "Tasting the gravy to check seasoning",
    "Buttering rolls fresh from the oven",
    "Scooping mac and cheese for the kids",
    "Decorating pie with whipped cream",
    "Wrapping leftovers for everyone to take home"
  ],
  funny: [
    "Turkey coming out completely dry",
    "Gravy boat tipping over dramatically",
    "Uncle falling asleep during dinner",
    "Someone bringing a controversial dish",
    "Smoke alarm going off from the oven",
    "Family political debate at the table",
    "Trying to fit through door with too much food",
    "Pretending to like the same gift every year",
    "Black Friday door buster sprint",
    "Falling asleep on couch after dinner",
    "Forgetting to thaw the turkey in time",
    "Pants getting tighter after second plate",
    "Spilling cranberry sauce on white tablecloth",
    "Arguing about how to make stuffing correctly",
    "Dog stealing food off unattended plate",
    "Someone arriving extremely late to dinner",
    "Awkward silence after political comment",
    "Trying to find room in fridge for leftovers",
    "Kids table getting louder than adults table",
    "Turkey timer going off at the worst moment"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.family,
  ...charadesData.food,
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
    card.innerHTML = `<span class="card-emoji">🦃</span><p>${p}</p>`;
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
