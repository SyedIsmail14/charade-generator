// ============================================================
//  bible-charades.js  –  Bible Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  kids: [
    "Noah building the ark",
    "Animals entering the ark two by two",
    "David playing harp for King Saul",
    "Jonah being swallowed by a big fish",
    "Baby Moses in a basket on the river",
    "Daniel praying calmly in lion's den",
    "Joseph's coat of many colours",
    "Jesus calming the stormy sea",
    "Shepherds visiting baby Jesus",
    "Zacchaeus climbing the tree to see Jesus",
    "Noah sending out the dove",
    "David anointed as future king",
    "Joseph being sold by his brothers",
    "Baby Jesus born in a manger",
    "Wise men following the bright star",
    "Jesus blessing the little children",
    "Samuel hearing God's voice at night",
    "Moses and the burning bush",
    "Jesus calling his first disciples",
    "Noah's ark resting on the mountain"
  ],
  old: [
    "God creating light on the first day",
    "Adam and Eve in the garden of Eden",
    "Moses parting the Red Sea",
    "David defeating Goliath with a sling",
    "Samson pushing down the temple pillars",
    "Elijah calling down fire from heaven",
    "Jacob wrestling with the angel",
    "Joseph interpreting Pharaoh's dreams",
    "Esther approaching the king bravely",
    "Ruth gleaning in Boaz's field",
    "Abraham looking up at countless stars",
    "Moses receiving the Ten Commandments",
    "King Solomon's wise judgment",
    "Gideon with his small mighty army",
    "Job remaining faithful through suffering",
    "Deborah leading Israelites to victory",
    "Jonah preaching to the city of Nineveh",
    "Isaac being bound on the altar",
    "Joshua and the walls of Jericho falling",
    "Elijah taken up in a chariot of fire"
  ],
  new: [
    "Jesus walking on water",
    "Feeding the 5000 with bread and fish",
    "Jesus healing the blind man",
    "Lazarus raised from the dead",
    "Jesus turning water into wine",
    "Peter denying Jesus three times",
    "Paul converted on the road to Damascus",
    "Jesus washing the disciples' feet",
    "Doubting Thomas touching the wounds",
    "Pentecost tongues of fire descending",
    "Jesus calling Peter to walk on water",
    "Mary anointing Jesus's feet with oil",
    "Jesus casting out demons",
    "Ten lepers healed and giving thanks",
    "Jesus's transfiguration on the mountain",
    "Stephen being stoned for his faith",
    "Philip baptising the Ethiopian official",
    "Jesus appearing to Mary at the tomb",
    "Paul shipwrecked on his journey",
    "Jesus ascending into the clouds"
  ],
  parables: [
    "Good Samaritan helping injured man",
    "Prodigal Son returning home to father",
    "Lost sheep found by the shepherd",
    "Sower scattering seeds on different soil",
    "Mustard seed growing into a great tree",
    "Wise and foolish builders on rock and sand",
    "Talents being multiplied or buried",
    "Persistent widow seeking justice",
    "Rich man and Lazarus at the gate",
    "Workers in the vineyard receiving wages",
    "Unforgiving servant refusing mercy",
    "Ten virgins waiting with their lamps",
    "Pharisee and tax collector praying",
    "Lost coin found and celebrated",
    "Good shepherd leaving the ninety-nine",
    "Wheat and weeds growing together",
    "Yeast hidden in the dough rising",
    "Wedding banquet invitation rejected",
    "Faithful and wise steward managing house",
    "Two debtors and the forgiving moneylender"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.old,
  ...charadesData.new,
  ...charadesData.parables
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
    card.innerHTML = `<span class="card-emoji">📖</span><p>${p}</p>`;
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
