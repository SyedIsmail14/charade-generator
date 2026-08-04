// ============================================================
//  food-charades.js  –  Food Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const FOOD_DATA = {
  easy: [
    { emoji: "🍌", text: "Peeling and eating a banana" },
    { emoji: "🍎", text: "Biting into a juicy apple" },
    { emoji: "🍜", text: "Slurping a bowl of noodles" },
    { emoji: "🍦", text: "Eating a big scoop of ice cream" },
    { emoji: "🍿", text: "Munching on crunchy popcorn" },
    { emoji: "🥛", text: "Drinking a glass of milk" },
    { emoji: "🍭", text: "Licking a melting lollipop" },
    { emoji: "🍞", text: "Buttering a slice of toast" },
    { emoji: "🍉", text: "Eating a slice of watermelon" },
    { emoji: "🍪", text: "Dunking a cookie in milk" }
  ],
  popular: [
    { emoji: "🍕", text: "Eating a cheesy slice of pizza" },
    { emoji: "🍝", text: "Twirling spaghetti on a fork" },
    { emoji: "🍔", text: "Biting into a juicy burger" },
    { emoji: "🌮", text: "Rolling and eating a taco" },
    { emoji: "🍣", text: "Picking up sushi with chopsticks" },
    { emoji: "🍿", text: "Eating hot buttery popcorn at the movies" },
    { emoji: "🍟", text: "Dipping fries in ketchup" },
    { emoji: "🌭", text: "Biting into a hot dog" },
    { emoji: "🥚", text: "Peeling a boiled egg" },
    { emoji: "🥞", text: "Eating a stack of pancakes" }
  ],
  desserts: [
    { emoji: "🎂", text: "Blowing out candles on a birthday cake" },
    { emoji: "🍫", text: "Licking chocolate off your fingers" },
    { emoji: "🍦", text: "Scooping ice cream into a cone" },
    { emoji: "🍬", text: "Unwrapping and eating candy" },
    { emoji: "🍩", text: "Biting into a giant donut" },
    { emoji: "🔥", text: "Roasting marshmallows over a fire" },
    { emoji: "🥧", text: "Eating a slice of pie" },
    { emoji: "🍨", text: "Squeezing whipped cream onto a dessert" },
    { emoji: "🍬", text: "Popping bubblegum with a bubble" },
    { emoji: "🥠", text: "Cracking open a fortune cookie" }
  ],
  cooking: [
    { emoji: "🍲", text: "Stirring a big pot of soup" },
    { emoji: "🥞", text: "Flipping a pancake in a pan" },
    { emoji: "🔪", text: "Chopping vegetables quickly" },
    { emoji: "🍞", text: "Kneading bread dough" },
    { emoji: "🥣", text: "Whisking eggs in a bowl" },
    { emoji: "🧂", text: "Sprinkling salt over food" },
    { emoji: "🍖", text: "Grilling burgers on a barbecue" },
    { emoji: "🍕", text: "Rolling out pizza dough" },
    { emoji: "🥗", text: "Tossing a salad in a bowl" },
    { emoji: "🥄", text: "Tasting soup with a spoon" }
  ],
  international: [
    { emoji: "🍣", text: "Rolling sushi with a bamboo mat" },
    { emoji: "🍝", text: "Twirling Italian spaghetti" },
    { emoji: "🥞", text: "Folding a French crepe" },
    { emoji: "🍛", text: "Eating Indian curry with naan" },
    { emoji: "🍖", text: "Grilling Korean barbecue" },
    { emoji: "🌮", text: "Making Mexican tacos" },
    { emoji: "🍜", text: "Stir-frying Chinese noodles" },
    { emoji: "🧀", text: "Dipping Swiss cheese fondue" },
    { emoji: "🥨", text: "Eating German pretzels" },
    { emoji: "🥙", text: "Serving Middle Eastern hummus" }
  ],
  restaurant: [
    { emoji: "🍽️", text: "Waiter carrying a tray of food" },
    { emoji: "📋", text: "Reading a menu and pointing to a dish" },
    { emoji: "👨‍🍳", text: "Chef tasting a sauce and adjusting seasoning" },
    { emoji: "🌶️", text: "Sending food back because it's too spicy" },
    { emoji: "🥵", text: "Blowing on food that's too hot" },
    { emoji: "🧾", text: "Splitting a bill among friends" },
    { emoji: "🍰", text: "Ordering dessert after a big meal" },
    { emoji: "🥡", text: "Wrapping up leftovers to take home" },
    { emoji: "☕", text: "Barista frothing milk for coffee" },
    { emoji: "🍷", text: "Sommelier tasting and swirling wine" }
  ]
};

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
function getFilteredFoods() {
  if (currentMode === 'easy')     return FOOD_DATA.easy;
  if (currentMode === 'popular')  return [...FOOD_DATA.popular, ...FOOD_DATA.international];
  if (currentMode === 'desserts') return FOOD_DATA.desserts;
  if (currentMode === 'cooking')  return [...FOOD_DATA.cooking, ...FOOD_DATA.restaurant];

  // 'all'
  return [
    ...FOOD_DATA.easy, ...FOOD_DATA.popular, ...FOOD_DATA.desserts,
    ...FOOD_DATA.cooking, ...FOOD_DATA.international, ...FOOD_DATA.restaurant
  ];
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
      <circle cx="55" cy="55" r="${radius}" fill="none" stroke="#ffe8cc" stroke-width="8"/>
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
  const pool = getFilteredFoods();
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
    card.innerHTML = `<span class="card-emoji">${p.emoji}</span><p>${p.text}</p>`;
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
