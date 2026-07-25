// ============================================================
//  school-charades.js  –  School Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  primary: [
    "Teacher writing on blackboard",
    "Student raising hand to answer",
    "Reading a big book aloud",
    "Painting a picture carefully",
    "Lining up quietly for assembly",
    "Counting on fingers in maths",
    "Singing in school choir",
    "Playing at break time",
    "Putting on PE kit quickly",
    "Show and tell presentation",
    "Eating lunch from packed box",
    "Sharpening a pencil noisily",
    "Walking in a straight line",
    "Playing musical chairs",
    "Sitting cross-legged on carpet",
    "Drawing a rainbow picture",
    "Spelling words out loud",
    "Doing a group project together",
    "Cleaning the classroom floor",
    "Practising handwriting carefully"
  ],
  secondary: [
    "Dissecting a frog in science",
    "Performing a Shakespeare play",
    "Presenting a history project",
    "Doing a geography fieldwork survey",
    "Playing in school orchestra",
    "Running a science experiment",
    "Doing long division on board",
    "Debating in English class",
    "Making pottery in art class",
    "Coding first computer programme",
    "Solving a physics equation",
    "Writing a chemistry report",
    "Doing a Spanish conversation",
    "Acting in a school play",
    "Conducting a psychology study",
    "Performing a music recital",
    "Building a model volcano",
    "Writing a persuasive essay",
    "Studying for a history test",
    "Presenting a business pitch"
  ],
  teacher: [
    "Marking a huge pile of homework",
    "Explaining concept three different ways",
    "Calling on student who is not listening",
    "Writing report cards late at night",
    "Parent evening difficult conversation",
    "Projector not working before lesson",
    "Whole class silent reading",
    "Taking register at start of day",
    "Breaking up playground argument",
    "Staying after school for detention",
    "Preparing lesson plan at 6am",
    "Carrying a pile of books to class",
    "Setting up a science demonstration",
    "Waiting for the bell to ring",
    "Handing back marked test papers",
    "Calming a nervous student before exam",
    "Managing a chaotic classroom",
    "Having a coffee in the staffroom",
    "Dealing with a parent complaint",
    "Running an after-school sports team"
  ],
  funny: [
    "Falling asleep in class",
    "Autocorrect ruining school project",
    "Printer jamming before deadline",
    "Wrong classroom for ten minutes",
    "Lunch box opening exploding",
    "Pen exploding all over face",
    "Chair scraping in silent exam",
    "Tripping on stage at assembly",
    "Forgetting PE kit on sports day",
    "Getting name wrong by teacher all year",
    "Teacher saying your name wrong all year",
    "Spilling water all over project",
    "Laptop freezing during presentation",
    "Zipper stuck on school bag",
    "Trousers ripping in PE lesson",
    "Paper jamming in photocopier",
    "Message in wrong group chat",
    "Meeting cancelled after arriving",
    "Phone ringing in silent library",
    "Wearing uniform inside out all day"
  ]
};

charadesData.all = [
  ...charadesData.primary,
  ...charadesData.secondary,
  ...charadesData.teacher,
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
    card.innerHTML = `<span class="card-emoji">🏫</span><p>${p}</p>`;
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
