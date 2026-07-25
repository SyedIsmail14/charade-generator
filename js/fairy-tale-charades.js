// ============================================================
//  fairy-tale-charades.js  –  Fairy Tale Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  kids: [
    "Three little pigs building houses",
    "Big bad wolf huffing and puffing",
    "Goldilocks tasting three bowls of porridge",
    "Three bears coming home surprised",
    "Little Red Riding Hood skipping to grandma's",
    "Wolf disguised under a blanket",
    "Tortoise and hare racing slowly",
    "Ugly duckling becoming a swan",
    "Boy who cried wolf running",
    "Gingerbread man running away",
    "Three blind mice running around",
    "Little mermaid swimming to surface",
    "Puss in Boots wearing fancy boots",
    "Tin soldier standing at attention",
    "Town mouse visiting country mouse",
    "Ant working hard all summer",
    "Grasshopper playing music all day",
    "Crow dropping pebbles in a jug",
    "Fox trying to reach high grapes",
    "Hare napping during the big race"
  ],
  classic: [
    "Cinderella losing her glass slipper",
    "Snow White eating the poisoned apple",
    "Sleeping Beauty pricking her finger",
    "Rapunzel letting her hair down",
    "Jack climbing the giant beanstalk",
    "Hansel and Gretel finding candy house",
    "Pinocchio's nose growing longer",
    "Beauty taming the Beast's temper",
    "The Frog Prince getting kissed",
    "Aladdin rubbing the magic lamp",
    "Cinderella's carriage turning to pumpkin",
    "Snow White sleeping in glass coffin",
    "Sleeping Beauty's hundred year sleep",
    "Rapunzel locked in her tower",
    "Jack stealing golden eggs from giant",
    "Hansel pushing witch into oven",
    "Pinocchio wishing to be a real boy",
    "Belle dancing in the grand ballroom",
    "Frog Prince hopping toward princess",
    "Aladdin riding the magic carpet"
  ],
  characters: [
    "Wicked stepmother giving evil orders",
    "Fairy godmother granting a wish",
    "Prince searching for true love",
    "Evil queen looking in magic mirror",
    "Brave knight slaying a dragon",
    "Wise old wizard giving advice",
    "Mischievous goblin causing trouble",
    "Kind woodcutter rescuing someone",
    "Jealous sister plotting revenge",
    "Loyal talking animal sidekick helping",
    "Cunning fox tricking another animal",
    "Gentle giant befriending a child",
    "Scheming witch casting a curse",
    "Brave princess rescuing herself",
    "Loyal servant warning the hero",
    "Greedy merchant refusing to share",
    "Wise grandmother giving a warning",
    "Trickster jester fooling the king",
    "Stern royal advisor giving counsel",
    "Humble servant revealed as royalty"
  ],
  magic: [
    "Casting a spell with a magic wand",
    "Pumpkin transforming into a carriage",
    "Mirror revealing the truth",
    "True love's kiss breaking a curse",
    "Magic beans growing overnight",
    "Enchanted rose slowly wilting",
    "Genie granting three wishes",
    "Witch's curse turning prince to beast",
    "Fairy dust making things fly",
    "Clock striking midnight dramatically",
    "Dragon guarding a golden treasure",
    "Unicorn galloping through enchanted forest",
    "Mermaid swimming and singing",
    "Troll guarding a bridge fiercely",
    "Giant stomping through the village",
    "Talking mirror answering questions",
    "Flying carpet soaring through sky",
    "Seven dwarfs marching to work",
    "Fairy sprinkling magic dust",
    "Phoenix rising from the ashes"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.classic,
  ...charadesData.characters,
  ...charadesData.magic
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
    card.innerHTML = `<span class="card-emoji">🧚</span><p>${p}</p>`;
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
