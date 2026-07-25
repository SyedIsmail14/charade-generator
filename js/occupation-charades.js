// ============================================================
//  occupation-charades.js  –  Occupation Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  kids: [
    "Firefighter spraying a hose",
    "Police officer directing traffic",
    "Postman delivering letters",
    "Teacher writing on the board",
    "Librarian stamping a book",
    "Bus driver steering carefully",
    "Crossing guard stopping traffic",
    "Garbage collector lifting bins",
    "Lifeguard watching the pool",
    "Farmer milking a cow",
    "Chef cooking in a big pot",
    "Hairdresser cutting hair carefully",
    "Waiter carrying a tray of food",
    "Cashier scanning groceries",
    "Construction worker wearing hard hat",
    "Baker kneading bread dough",
    "Vet checking a puppy's paw",
    "Pilot flying a toy plane",
    "Astronaut floating in space",
    "Zookeeper feeding the animals"
  ],
  medical: [
    "Doctor checking heartbeat with stethoscope",
    "Nurse taking blood pressure",
    "Dentist looking inside a mouth",
    "Surgeon performing careful operation",
    "Veterinarian examining a dog",
    "Paramedic rushing with a stretcher",
    "Pharmacist counting out pills",
    "Optician testing eyesight",
    "Physiotherapist stretching a leg",
    "X-ray technician positioning patient",
    "Midwife helping deliver a baby",
    "Psychiatrist listening attentively",
    "Radiologist examining a scan",
    "Anaesthesiologist administering medicine",
    "Dermatologist examining skin closely",
    "Orthodontist fitting braces",
    "Speech therapist guiding pronunciation",
    "Occupational therapist helping recovery",
    "Lab technician examining samples",
    "Ambulance driver rushing to scene"
  ],
  creative: [
    "Painter creating a masterpiece",
    "Musician playing the violin",
    "Photographer adjusting camera lens",
    "Writer typing furiously at desk",
    "Dancer performing graceful leap",
    "Fashion designer sketching outfit",
    "Sculptor chiselling marble carefully",
    "Film director shouting action",
    "Architect drawing building plans",
    "Chef plating food artistically",
    "Singer performing on stage",
    "Animator drawing frame by frame",
    "Graphic designer working on computer",
    "Poet reciting verses passionately",
    "Comedian telling jokes on stage",
    "Tattoo artist drawing carefully",
    "Interior designer arranging furniture",
    "Jewellery maker crafting a ring",
    "Make-up artist applying foundation",
    "Voice actor recording in studio"
  ],
  trades: [
    "Electrician fixing a wire",
    "Plumber unclogging a pipe",
    "Carpenter sawing a plank",
    "Mechanic fixing a car engine",
    "Builder laying bricks",
    "Welder joining metal pieces",
    "Painter decorating a wall",
    "Roofer climbing onto a roof",
    "Locksmith picking a lock",
    "Tailor measuring fabric",
    "Blacksmith hammering hot metal",
    "Glazier installing a window",
    "Bricklayer mixing cement",
    "HVAC technician fixing air conditioning",
    "Landscaper mowing the lawn",
    "Mason cutting stone carefully",
    "Upholsterer reupholstering a sofa",
    "Shoemaker repairing a shoe",
    "Cobbler hammering a heel",
    "Auto body repairer fixing a dent"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.medical,
  ...charadesData.creative,
  ...charadesData.trades
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
    card.innerHTML = `<span class="card-emoji">👨‍⚕️</span><p>${p}</p>`;
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
