// ============================================================
//  emoji-charades.js  –  Emoji Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  easy: [
    "😂 Crying laughing uncontrollably",
    "😭 Sobbing dramatically and loudly",
    "😱 Screaming in absolute horror",
    "🤔 Deep thinking with chin rub",
    "😴 Sleeping peacefully and snoring",
    "🤤 Drooling over amazing food",
    "😍 Heart eyes completely in love",
    "🤢 Feeling very sick and nauseous",
    "😡 Furiously angry red face",
    "🥳 Party celebration explosion of joy",
    "😎 Cool and confident sunglasses face",
    "🥺 Puppy dog eyes begging please",
    "😤 Steaming with frustration",
    "🤩 Star-struck dazzled by something",
    "😬 Grimacing awkward nervous face",
    "🫠 Slowly melting away completely",
    "🙃 Upside down sarcastic smile",
    "😶 Completely speechless and silent",
    "🥴 Woozy and dizzy spinning face",
    "😏 Smug knowing smirk face"
  ],
  action: [
    "💪 Flexing the biggest possible muscles",
    "🤦 Slow and dramatic facepalm",
    "🤷 Total clueless shrug both hands",
    "👋 Very enthusiastic waving goodbye",
    "🙌 Celebrating with both hands raised",
    "🤞 Fingers crossed hoping desperately",
    "👏 Slow sarcastic clapping",
    "🧘 Meditating in perfect peaceful calm",
    "🕺 Confident disco dancing",
    "💃 Elegant salsa dancing",
    "🤸 Doing a cartwheel energetically",
    "🏋️ Lifting very heavy weights",
    "🤾 Throwing ball in sport",
    "🧗 Rock climbing carefully",
    "🤼 Wrestling someone dramatically",
    "👊 Punching the air in victory",
    "🫶 Heart hands gesture",
    "🤌 Italian chef's kiss perfection",
    "🫵 Pointing directly at someone",
    "🙏 Hands together in prayer or thanks"
  ],
  combo: [
    "😴💤 Falling asleep mid-conversation",
    "😂💀 Dying of laughter completely",
    "🤔💡 Thinking hard then sudden idea",
    "😱🏃 Screaming then running away fast",
    "🍕❤️ Deeply in love with pizza",
    "😭📱 Crying over completely broken phone",
    "💪🪞 Flexing proudly in front of mirror",
    "🤦😤 Facepalm then frustration building",
    "🎉🥳 Party explosion of total joy",
    "😴☕ Waking up desperately needing coffee",
    "🤩👀 Star-struck then wide-eyed staring",
    "😤🚪 Frustrated then storming out door",
    "🧘😤 Trying to meditate then getting angry",
    "😎🕶️ Being cool then posing with sunglasses",
    "🤢😷 Feeling sick then putting on mask",
    "😍🍔 Heart eyes seeing a perfect burger",
    "😱💸 Shocked at the price of something",
    "🥳🎂 Party face then cutting birthday cake",
    "😶🫠 Speechless then melting away",
    "🤞🙏 Fingers crossed then praying hopefully"
  ],
  story: [
    "🚶🌧️😱 Walking, caught in rain, totally shocked",
    "😴⏰😤 Sleeping, alarm rings, waking up furious",
    "🏃🍕😂 Running for last pizza, getting there laughing",
    "📚😴💤 Studying hard, getting drowsy, falling asleep",
    "🎂🕯️😄 Birthday cake arrives, candles lit, pure joy",
    "📱😡💥 Phone dies at 1 percent, furious, smashes it",
    "🏋️💪🪞 Working out hard, flexing muscles, mirror pose",
    "🌮🤤😋 Seeing tacos, drooling, eating deliciously",
    "👻😱🏃 Ghost appears suddenly, scream, run away fast",
    "☕😴😊 Make coffee, drink it, wake up happily",
    "🎁😭😍 Open gift, disappointed, then heart eyes",
    "🐝💪🤕 Bee stings you, try to be brave, it really hurts",
    "🌧️🌈😍 Rain falls, rainbow appears, fall in love with it",
    "📸😳🙈 Take selfie, see result, hide in embarrassment",
    "🛒😎💸 Shopping confidently, buying everything, broke",
    "🎤😱😂 Take microphone, terrified, then laughing",
    "🏖️😎🦈 Beach day, relaxing, then shark spotted",
    "💤😤☕ Deep sleep, rude awakening, need coffee now",
    "🤸😬💥 Try a cartwheel, nervous, then crash landing",
    "🎯😤💪 Aim at target, focused, then hit it perfectly"
  ]
};

charadesData.all = [
  ...charadesData.easy,
  ...charadesData.action,
  ...charadesData.combo,
  ...charadesData.story
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
    card.innerHTML = `<span class="card-emoji">😀</span><p>${p}</p>`;
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
