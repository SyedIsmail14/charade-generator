// ============================================================
//  valentines-charades.js  –  Valentine's Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  kids: [
    "Making a Valentine's card",
    "Giving a heart-shaped sticker",
    "Sharing candy hearts with a friend",
    "Drawing a big red heart",
    "Decorating a Valentine's box",
    "Handing out Valentine's cards in class",
    "Wrapping a small Valentine's gift",
    "Cupid with bow and arrow",
    "Writing Be My Valentine on a card",
    "Cutting out paper hearts",
    "Painting hearts on a poster",
    "Putting stickers on Valentine's cards",
    "Sorting candy hearts by colour",
    "Making a friendship bracelet",
    "Giving a teacher a thank you card",
    "Decorating cupcakes with hearts",
    "Folding a paper heart card",
    "Choosing a card for best friend",
    "Tying a ribbon on a gift bag",
    "Drawing Cupid's wings"
  ],
  couples: [
    "Sharing one milkshake with two straws",
    "Couple finishing each other's sentences",
    "Remembering your anniversary just in time",
    "Slow dancing in the kitchen",
    "Couple arguing over the thermostat",
    "Falling asleep during a movie together",
    "Couple's inside joke nobody else gets",
    "Sharing earphones on a walk",
    "Couple matching outfits accidentally",
    "Holding hands across the table",
    "Cooking dinner together in the kitchen",
    "Couple doing a couples workout",
    "Texting goodnight every single night",
    "Couple planning a trip together",
    "Sharing dessert with one fork",
    "Couple laughing at an old photo",
    "Doing a jigsaw puzzle together",
    "Couple binge watching a show together",
    "Couple taking turns picking the playlist",
    "Couple cuddling on the sofa"
  ],
  romantic: [
    "Proposing on one knee with a ring",
    "Writing a heartfelt love letter",
    "Giving a bouquet of roses",
    "First date butterflies in stomach",
    "Romantic candlelit dinner",
    "Walking on the beach at sunset",
    "First kiss under the stars",
    "Serenading someone with a guitar",
    "Love at first sight across a room",
    "Long distance video call goodnight",
    "Writing initials inside a heart",
    "Slow dancing at a wedding",
    "Catching the bouquet at a wedding",
    "Whispering sweet nothings",
    "Star gazing together at night",
    "Surprising someone at the airport",
    "Writing a poem for someone special",
    "Sharing an umbrella in the rain",
    "Giving a promise ring",
    "Toasting with champagne glasses"
  ],
  funny: [
    "Awkward silence on a first date",
    "Accidentally calling partner wrong name",
    "Valentine's gift received with fake smile",
    "Proposal interrupted by something silly",
    "Swiping through a dating app nervously",
    "Texting then deleting then retexting",
    "Bad blind date small talk struggle",
    "Forgetting Valentine's Day completely",
    "Overthinking a text message reply",
    "Third wheeling on a couple's date",
    "Romeo and Juliet balcony scene",
    "Titanic ship bow scene pose",
    "The Notebook rain kiss scene",
    "Casablanca airport farewell scene",
    "Bringing flowers to the wrong house",
    "Spilling wine on a first date",
    "Getting caught talking about your ex",
    "Realising you both wore the same outfit",
    "Running late to your own proposal",
    "Forgetting your reservation at restaurant"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.couples,
  ...charadesData.romantic,
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
    card.innerHTML = `<span class="card-emoji">❤️</span><p>${p}</p>`;
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
