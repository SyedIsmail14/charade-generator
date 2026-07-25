// ============================================================
//  hard-charades.js  –  Hard Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  medium: [
    "Solar eclipse",
    "Photosynthesis",
    "Stock market crash",
    "Moon landing",
    "Industrial Revolution",
    "Archaeological excavation",
    "Virtual reality",
    "Artificial intelligence",
    "Cold War standoff",
    "Déjà vu",
    "Karma",
    "Serendipity",
    "Epiphany",
    "Satire",
    "Film noir",
    "Jazz improvisation",
    "Impressionism painting",
    "Method acting",
    "Blockchain",
    "Cloud storage"
  ],
  hard: [
    "Cognitive dissonance",
    "Existential crisis",
    "Bioluminescence",
    "Tectonic plate movement",
    "Gravitational wave",
    "Nuclear fission",
    "Magnetic field",
    "Entropy",
    "Zeitgeist",
    "Schadenfreude",
    "Ambivalence",
    "Osmosis",
    "Berlin Wall falling",
    "French Revolution guillotine",
    "Treaty signing ceremony",
    "Economic sanctions",
    "Constitutional amendment",
    "Surrealism dream",
    "Literary symbolism",
    "Renaissance sculpture",
    "Greek tragedy",
    "Propaganda poster",
    "Neural network learning",
    "Cybersecurity breach",
    "Data encryption",
    "Autonomous vehicle",
    "Nihilism",
    "Utilitarianism",
    "Stoicism under pressure",
    "Absurdism"
  ],
  expert: [
    "Quantum entanglement",
    "Black hole event horizon",
    "Electromagnetic spectrum",
    "Mitosis cell division",
    "Parallel computing",
    "Machine learning model",
    "Quantum computing",
    "Plato's cave allegory",
    "Socratic method",
    "Moral relativism",
    "Solipsism",
    "Dialectical thinking",
    "Epistemology",
    "Consciousness",
    "Abstract expressionism",
    "Avant-garde performance",
    "Siege warfare",
    "Colonisation",
    "Subconscious mind",
    "Paradox"
  ],
  genius: [
    "Quantum superposition",
    "Schrödinger's cat thought experiment",
    "Heisenberg uncertainty principle",
    "String theory vibrating dimensions",
    "Dark matter gravitational pull",
    "Higgs boson particle discovery",
    "Butterfly effect in chaos theory",
    "Gödel's incompleteness theorem",
    "Ship of Theseus philosophical paradox",
    "Trolley problem moral dilemma",
    "Prisoner's dilemma game theory",
    "Pascal's wager on belief",
    "Zeno's paradox of motion",
    "Existential phenomenology",
    "Transcendental idealism",
    "Dialectical materialism",
    "Panopticon surveillance theory",
    "Dunning-Kruger effect",
    "Cognitive behavioural loop",
    "Metacognition thinking about thinking"
  ]
};

charadesData.all = [
  ...charadesData.medium,
  ...charadesData.hard,
  ...charadesData.expert,
  ...charadesData.genius
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
    card.innerHTML = `<span class="card-emoji">🧠</span><p>${p}</p>`;
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
