// ============================================================
//  islamic-charades.js  –  Islamic Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

/* =====================================================
   ISLAMIC CHARADES – HALAL, ACTION-BASED
   No prophets, no divine beings, no mockery
   ===================================================== */

/* ACTIONS (PERMISSIBLE) */
const ACTIONS = [
"Making","Reading","Giving","Helping","Sharing","Greeting","Learning","Teaching","Cleaning","Waiting","Walking","Visiting","Listening","Preparing","Breaking","Opening","Closing","Carrying","Respecting","Smiling","Praying","Fasting","Worshipping","Bowing","Prostrating","Kneeling","Standing","Reciting","Memorizing","Studying","Contemplating","Reflecting","Meditating","Supplicating","Praising","Glorifying","Thanking","Seeking","Asking","Repenting","Forgiving","Pardoning","Apologizing","Accepting","Embracing","Welcoming","Hosting","Inviting","Serving","Feeding","Cooking","Baking","Preparing","Washing","Purifying","Cleansing","Bathing","Performing","Ablution","Rinsing","Wiping","Drying","Dressing","Covering","Wearing","Veiling","Wrapping","Adjusting","Tying","Fastening","Removing","Folding","Arranging","Organizing","Tidying","Sweeping","Mopping","Dusting","Polishing","Decorating","Adorning","Beautifying","Illuminating","Lighting","Hanging","Displaying","Spreading","Rolling","Unrolling","Placing","Positioning","Orienting","Facing","Turning","Directing","Guiding","Leading","Following","Accompanying","Escorting","Supporting","Assisting","Aiding","Comforting","Consoling","Encouraging","Motivating","Inspiring","Advising","Counseling","Recommending","Suggesting","Reminding","Informing","Notifying","Announcing","Declaring","Proclaiming","Testifying","Witnessing","Confirming","Affirming","Acknowledging","Recognizing","Honoring","Respecting","Revering","Venerating","Obeying","Submitting","Surrendering","Trusting","Believing","Having Faith","Hoping","Wishing","Desiring","Intending","Planning","Deciding","Choosing","Selecting","Preferring","Prioritizing","Focusing","Concentrating","Pondering","Thinking","Considering","Evaluating","Judging","Discerning","Understanding","Comprehending","Grasping","Absorbing","Retaining","Remembering","Recalling","Reviewing","Revising","Practicing","Rehearsing","Repeating","Chanting","Singing","Humming","Whispering","Speaking","Talking","Conversing","Discussing","Debating","Arguing","Agreeing","Disagreeing","Nodding","Shaking Head","Gesturing","Pointing","Indicating","Showing","Demonstrating","Explaining","Clarifying","Illustrating","Describing","Narrating","Relating","Telling","Sharing Stories","Conveying","Communicating","Expressing","Articulating","Pronouncing","Enunciating","Proclaiming","Broadcasting","Spreading","Distributing","Dispensing","Allocating","Dividing","Separating","Sorting","Categorizing","Classifying","Grouping","Gathering","Collecting","Assembling","Congregating","Meeting","Joining","Uniting","Connecting","Linking","Bonding","Befriending","Socializing","Interacting","Engaging","Participating","Contributing","Donating","Offering","Presenting","Bestowing","Granting","Providing","Supplying","Furnishing","Equipping","Preparing","Arranging","Coordinating","Managing","Organizing","Administering","Overseeing","Supervising","Monitoring","Observing","Watching","Noticing","Perceiving","Sensing","Feeling","Experiencing","Undergoing","Enduring","Persevering","Persisting","Continuing","Maintaining","Sustaining","Preserving","Protecting","Safeguarding","Defending","Shielding","Guarding","Securing","Locking","Storing","Keeping","Holding","Grasping","Clutching","Gripping","Releasing","Letting Go","Surrendering","Yielding","Submitting","Accepting","Receiving","Taking","Obtaining","Acquiring","Gaining","Earning","Achieving","Accomplishing","Completing","Finishing","Concluding","Ending","Terminating","Stopping","Pausing","Resting","Relaxing","Recuperating","Recovering","Healing","Curing","Treating","Caring","Nurturing","Tending","Attending","Serving","Ministering","Devoting","Dedicating","Committing","Pledging","Vowing","Promising","Assuring","Guaranteeing","Certifying","Validating","Verifying","Confirming","Checking","Inspecting","Examining","Investigating","Researching","Exploring","Discovering","Finding","Locating","Identifying","Naming","Labeling","Marking","Signing","Sealing","Stamping","Imprinting","Engraving","Inscribing","Writing","Recording","Documenting","Noting","Jotting","Scribing","Transcribing","Copying","Duplicating","Reproducing","Replicating","Imitating","Emulating","Mimicking","Modeling","Exemplifying","Demonstrating","Manifesting","Exhibiting","Displaying","Revealing","Disclosing","Uncovering","Exposing","Publishing","Announcing","Proclaiming"];

/* ISLAMIC CONTEXTS (NON-PERSONIFICATION) */
const CONTEXTS = [
  "Wudu",
  "Salah",
  "Quran",
  "Dua",
  "Charity",
  "Mosque",
  "Ramadan",
  "Iftar",
  "Suhoor",
  "Prayer Mat",
  "Tasbih",
  "Islamic Book",
  "Helping Parents",
  "Greeting Salam",
  "Giving Zakat",
  "Sharing Food",
  "Visiting Mosque",
  "Breaking Fast",
  "Learning Islam",
  "Teaching Kids"
];

/* BUILD CHARADES */
let allCharades = [];
for (let a of ACTIONS) {
  for (let c of CONTEXTS) {
    allCharades.push(`${a} ${c}`);
  }
}

// ── GAME STATE ────────────────────────────────────────────
let currentMode  = 'default';
let roundCount   = 1;
let currentCount = 1;

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

// ── MODE FILTER LOGIC ─────────────────────────────────────
function getFilteredCharades() {
  let filtered = allCharades;

  if (currentMode === 'kids') {
    filtered = allCharades.filter(c => 
      c.includes('Wudu') || 
      c.includes('Salah') || 
      c.includes('Dua') || 
      c.includes('Quran') ||
      c.includes('Salam')
    );
  } else if (currentMode === 'family') {
    filtered = allCharades.filter(c => 
      c.includes('Charity') || 
      c.includes('Mosque') || 
      c.includes('Helping') || 
      c.includes('Greeting') ||
      c.includes('Sharing')
    );
  } else if (currentMode === 'ramadan') {
    filtered = allCharades.filter(c => 
      c.includes('Ramadan') || 
      c.includes('Iftar') || 
      c.includes('Suhoor') || 
      c.includes('Breaking Fast')
    );
  } else if (currentMode === 'madrasa') {
    filtered = allCharades.filter(c => 
      c.includes('Quran') || 
      c.includes('Learning') || 
      c.includes('Islamic Book') ||
      c.includes('Teaching') ||
      c.includes('Tasbih')
    );
  }

  return filtered;
}

// ── ROUND PICKER ──────────────────────────────────────────
function setRound(n) {
  roundCount = n;
  currentCount = n;
  document.querySelectorAll('.round-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-round="${n}"]`);
  if (btn) btn.classList.add('active');
  generate();
}

// ── COUNT FUNCTIONS ───────────────────────────────────────
function setCount(n) {
  currentCount = n;
  roundCount = n;
  document.querySelectorAll('.round-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-round="${n}"]`);
  if (btn) btn.classList.add('active');
  generate();
}

function showCustom() {
  document.getElementById('customBox').classList.remove('hidden');
}

function applyCustom() {
  const input = document.getElementById('customInput');
  let n = parseInt(input.value, 10);
  if (isNaN(n) || n < 1) n = 1;
  if (n > 12) n = 12;
  currentCount = n;
  roundCount = n;
  input.value = n;
  document.getElementById('customBox').classList.add('hidden');
  generate();
}

// ── GENERATE ──────────────────────────────────────────────
function generate() {
  const box = document.getElementById('cards');
  const status = document.getElementById('statusText');
  if (!box) return;

  box.innerHTML = '';

  const pool = getFilteredCharades();

  for (let i = 0; i < currentCount; i++) {
    const charade = pool[Math.floor(Math.random() * pool.length)];
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<span class="card-emoji">🕌</span><p>${charade}</p>`;
    box.appendChild(div);
  }

  if (status) {
    status.textContent = `${currentCount} ${currentMode} charades ready 🕌`;
  }

  resetTimer(true);
}

// ── MODE SWITCH ────────────────────────────────────────────
function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-mode="${mode}"]`);
  if (btn) btn.classList.add('active');
  generate();
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

// ── FULL SCREEN ────────────────────────────────────────────
function toggleFullScreen() {
  const elem = document.getElementById('gameArea');
  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// ── MENU ───────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('navMobile').classList.toggle('open');
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setMode('default');
  setRound(1);
  drawTimer(TIMER_TOTAL);
});
