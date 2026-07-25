// ============================================================
//  sports-charades.js  –  Sports Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  easy: [
    "Kicking a football into goal",
    "Hitting a cricket six over boundary",
    "Shooting a basketball into hoop",
    "Swimming freestyle in a pool",
    "Running a sprint race",
    "Serving a tennis ball",
    "Jumping rope very fast",
    "Doing a forward roll",
    "Riding a bicycle uphill",
    "Throwing a javelin",
    "Catching a cricket ball",
    "Heading a football",
    "Doing a cartwheel",
    "High five after scoring",
    "Warming up by stretching",
    "Dribbling a basketball",
    "Batting in cricket",
    "Doing star jumps",
    "Throwing a ball underarm",
    "Skipping across finish line"
  ],
  team: [
    "Goalkeeper diving for penalty",
    "Cricket bowler full run-up",
    "Rugby player breaking through tackles",
    "Basketball slam dunk celebration",
    "Volleyball spike at the net",
    "Hockey player dribbling fast",
    "American football quarterback throw",
    "Water polo player treading water",
    "Rowing team in perfect sync",
    "Tug of war team pulling hard",
    "Cricket fielder taking a catch",
    "Football free kick curling round wall",
    "Basketball player triple threat stance",
    "Rugby lineout throw and lift",
    "Football team celebrating a goal",
    "Cricket wicketkeeper taking stumping",
    "Basketball fast break play",
    "Kabaddi player raiding and retreating",
    "Hockey penalty corner drag flick",
    "Handball player shooting at goal"
  ],
  solo: [
    "Boxer skipping rope fast",
    "Gymnast on balance beam wobbling",
    "Golfer watching ball roll into bunker",
    "Tennis player disputing a line call",
    "Long jump athlete landing in sand pit",
    "Weightlifter failing to lift bar",
    "Swimmer diving off starting block",
    "Pole vaulter clearing the bar",
    "Cyclist climbing a steep mountain",
    "Marathon runner hitting the wall",
    "Diver entering water with no splash",
    "High jumper doing Fosbury flop",
    "Discus thrower spinning and releasing",
    "Triple jumper hop step and jump",
    "Sprinter crossing finish line",
    "Wrestler going for a submission hold",
    "Fencer lunging with épée",
    "Archer drawing bow and releasing",
    "Judo throw lifting opponent overhead",
    "Boxer throwing combination punches"
  ],
  extreme: [
    "Skydiver free falling from plane",
    "Surfer riding a giant wave",
    "Skateboarder landing a big trick",
    "Rock climber reaching the summit",
    "Bungee jumper at the edge hesitating",
    "Snowboarder hitting a half pipe",
    "Parkour athlete jumping between rooftops",
    "Base jumper leaping off a cliff",
    "Motocross rider catching big air",
    "Kitesurfer pulled hard by the wind",
    "BMX rider doing backflip",
    "Wingsuit flyer gliding through mountains",
    "Ice climber hammering ice axe",
    "Whitewater kayaker in rapids",
    "Cliff diver leaping from high rock",
    "Free solo climber with no rope",
    "Zorbing rolling down a hill",
    "Slacklining between two trees",
    "Wakeboarding behind a speedboat",
    "Paraglider launching off mountain"
  ]
};

charadesData.all = [
  ...charadesData.easy,
  ...charadesData.team,
  ...charadesData.solo,
  ...charadesData.extreme
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
    card.innerHTML = `<span class="card-emoji">⚽</span><p>${p}</p>`;
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
