// ============================================================
//  character-charades.js  –  Character Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

// ── PROMPT DATA ───────────────────────────────────────────
const charadesData = {
  superheroes: [
    "Spider-Man shooting web",
    "Batman throwing batarang",
    "Superman flying with cape",
    "Iron Man flying in suit",
    "Wonder Woman with lasso",
    "Thor swinging hammer",
    "Hulk smashing table",
    "Black Panther in stance",
    "Captain America with shield",
    "Flash running super fast",
    "Aquaman riding sea creature",
    "Green Lantern making construct",
    "Doctor Strange casting spell",
    "Ant-Man shrinking down",
    "Wasp flying with wings",
    "Captain Marvel glowing energy",
    "Daredevil listening carefully",
    "Wolverine extending claws",
    "Deadpool breaking the fourth wall",
    "Cyclops firing optic blast"
  ],
  kids: [
    "SpongeBob laughing",
    "Peppa Pig jumping in puddle",
    "Dora exploring with map",
    "Pikachu using thunder",
    "Mickey Mouse waving ears",
    "Winnie the Pooh eating honey",
    "Tom chasing Jerry",
    "Scooby-Doo sniffing trail",
    "Elmo hugging everyone",
    "Bluey playing charades",
    "Paw Patrol Chase on mission",
    "Peppa Pig in muddy puddle",
    "Shrek ogre walking swamp",
    "Moana sailing ocean",
    "Buzz Lightyear pose",
    "Olaf melting from warmth",
    "Simba on Pride Rock",
    "Winnie the Pooh stuck in honey jar",
    "Woody pulling string",
    "Zootopia Judy Hopps solving case"
  ],
  movies: [
    "Harry Potter casting spell",
    "Elsa freezing with palms",
    "Simba on Pride Rock",
    "Woody pulling string",
    "Jack Sparrow staggering",
    "Hermione raising hand",
    "Gollum holding precious ring",
    "Shrek ogre walking swamp",
    "Moana sailing ocean",
    "Buzz Lightyear pose",
    "Indiana Jones with whip",
    "Forrest Gump running",
    "Neo dodging bullets",
    "Marty McFly time traveling",
    "Luke Skywalker swinging lightsaber",
    "Darth Vader breathing heavily",
    "Yoda lifting with force",
    "Tony Stark snapping fingers",
    "Thor calling lightning",
    "Black Panther doing Wakanda salute"
  ],
  fairy: [
    "Cinderella losing glass slipper",
    "Snow White eating apple",
    "Rapunzel letting hair down",
    "Red Riding Hood in forest",
    "Pinocchio nose growing",
    "Sleeping Beauty pricking finger",
    "Aladdin riding magic carpet",
    "Beauty and Beast dancing",
    "Three Little Pigs building",
    "Goldilocks tasting porridge",
    "Fairy Godmother waving wand",
    "Puss in Boots in boots",
    "Prince Charming searching",
    "Mermaid Ariel signing",
    "Princess Jasmine flying magic carpet",
    "Peter Pan flying to Neverland",
    "Tinker Bell glowing",
    "Mulan training with sword",
    "Pocahontas exploring",
    "Merida shooting arrow"
  ],
  games: [
    "Mario jumping on Goomba",
    "Link drawing sword",
    "Pikachu using Thunderbolt",
    "Pac-Man eating dots",
    "Sonic running super fast",
    "Donkey Kong beating chest",
    "Yoshi eating enemy",
    "Kirby inhaling everything",
    "Princess Peach waving",
    "Bowser breathing fire",
    "Zelda doing magic",
    "Samus morph ball",
    "Cloud swinging sword",
    "Mega Man shooting",
    "Sora wielding keyblade",
    "Toad doing his run",
    "Luigi jumps high",
    "Wario laughing",
    "Mewtwo using psychic powers",
    "Ash throwing pokeball"
  ],
  tv: [
    "Mr Bean in trouble",
    "Homer Simpson eating donut",
    "Sherlock Holmes deducing",
    "Phoebe Buffay singing badly",
    "Chandler Bing being sarcastic",
    "Barney Fife overreacting",
    "Rowan Atkinson face pull",
    "Kramer sliding through door",
    "Sheldon knocking three times",
    "Ned Flanders neighbourly wave",
    "Dwight Schrute being competitive",
    "Michael Scott being inappropriate",
    "Joey Tribbiani eating sandwich",
    "Monica Geller cleaning",
    "Ross Geller being a paleontologist",
    "Rachel Green being fashionable",
    "Walter White cooking science",
    "Jesse Pinkman saying science",
    "Rick Sanchez burping",
    "Morty being terrified"
  ]
};

charadesData.all = [
  ...charadesData.superheroes,
  ...charadesData.kids,
  ...charadesData.movies,
  ...charadesData.fairy,
  ...charadesData.games,
  ...charadesData.tv
];

// ── GAME STATE ────────────────────────────────────────────
let currentMode  = 'default';
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
    card.innerHTML = `<span class="card-emoji">🦸</span><p>${p}</p>`;
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
  setMode('default');
  setRound(1);
  drawTimer(TIMER_TOTAL);
});
