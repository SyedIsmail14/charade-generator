// ============================================================
//  reverse-charades.js  –  Reverse Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

/* =====================================================
   REVERSE CHARADES
   Group acts, one person guesses
   ===================================================== */

const CHARADES = [
"Making Sandwich","Brushing Teeth","Playing Football","Opening Umbrella","Washing Hands","Riding Bicycle","Flying Kite","Catching Ball","Cooking Dinner","Cleaning Room","Taking Selfie","Dancing Together","Celebrating Birthday","Packing Bag","Searching Phone","Watching Movie","Building Tower","Reading Book","Painting Wall","Shopping Groceries","Washing Dishes","Folding Laundry","Ironing Clothes","Vacuuming Floor","Mopping Floor","Sweeping Floor","Dusting Furniture","Making Bed","Changing Diaper","Feeding Baby","Bathing Dog","Walking Dog","Training Dog","Grooming Cat","Planting Flowers","Watering Plants","Mowing Lawn","Raking Leaves","Shoveling Snow","Building Snowman","Making Snowball","Throwing Snowball","Decorating Tree","Wrapping Gifts","Opening Presents","Blowing Candles","Cutting Cake","Serving Food","Setting Table","Pouring Drinks","Washing Car","Pumping Gas","Checking Tire","Changing Oil","Fixing Engine","Painting Fence","Hammering Nail","Sawing Wood","Drilling Hole","Screwing Bolt","Measuring Length","Cutting Fabric","Sewing Button","Knitting Scarf","Crocheting Blanket","Embroidering Pattern","Quilting Bedspread","Weaving Basket","Spinning Yarn","Dying Fabric","Ironing Shirt","Polishing Shoes","Tying Shoelaces","Buttoning Coat","Zipping Jacket","Putting Hat","Wearing Gloves","Adjusting Tie","Combing Hair","Braiding Hair","Curling Hair","Straightening Hair","Applying Makeup","Removing Makeup","Shaving Face","Trimming Beard","Cutting Nails","Filing Nails","Painting Nails","Massaging Feet","Stretching Muscles","Doing Pushups","Doing Situps","Doing Squats","Lifting Weights","Running Marathon","Jumping Rope","Playing Tennis","Playing Basketball","Playing Baseball","Playing Cricket","Playing Hockey","Playing Soccer","Playing Volleyball","Playing Badminton","Playing Golf","Bowling Strike","Throwing Dart","Shooting Arrow","Fishing Rod","Casting Line","Reeling Fish","Paddling Canoe","Rowing Boat","Sailing Yacht","Surfing Wave","Diving Deep","Snorkeling Reef","Swimming Laps","Treading Water","Floating Back","Jumping Pool","Sliding Slide","Swinging Swing","Climbing Rope","Balancing Beam","Riding Skateboard","Riding Scooter","Riding Motorcycle","Driving Car","Parking Car","Reversing Car","Honking Horn","Signaling Turn","Checking Mirror","Fastening Seatbelt","Starting Engine","Shifting Gear","Pressing Brake","Turning Wheel","Opening Window","Closing Door","Locking Door","Unlocking Door","Ringing Doorbell","Knocking Door","Answering Phone","Dialing Number","Texting Message","Scrolling Feed","Taking Photo","Recording Video","Editing Picture","Posting Update","Liking Post","Sharing Content","Typing Email","Printing Document","Scanning Paper","Photocopying Page","Stapling Papers","Filing Documents","Shredding Paper","Signing Contract","Stamping Document","Mailing Letter","Opening Mail","Packaging Box","Sealing Envelope","Writing Letter","Drawing Picture","Coloring Page","Sketching Portrait","Sculpting Clay","Carving Wood","Molding Pottery","Glazing Ceramic","Firing Kiln","Mixing Paint","Applying Varnish","Framing Picture","Hanging Picture","Tuning Guitar","Playing Piano","Drumming Beat","Blowing Trumpet","Playing Violin","Conducting Orchestra","Singing Song","Recording Music","Mixing Track","Playing Record","Adjusting Volume","Changing Channel","Programming Remote","Charging Battery","Plugging Cable","Connecting Wifi","Installing Software","Updating System","Backing Data","Restarting Computer","Closing Window","Deleting File"];

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

// ── MODE FILTER ────────────────────────────────────────────
function getFilteredCharades() {
  let filtered = CHARADES;

  if (currentMode === 'easy') {
    filtered = CHARADES.filter(c => 
      ['Making Sandwich','Brushing Teeth','Playing Football','Opening Umbrella','Washing Hands','Riding Bicycle','Flying Kite','Catching Ball','Cooking Dinner','Cleaning Room','Taking Selfie','Dancing Together','Celebrating Birthday','Packing Bag','Watching Movie','Reading Book','Painting Wall','Shopping Groceries','Washing Dishes','Folding Laundry','Ironing Clothes','Vacuuming Floor','Mopping Floor','Sweeping Floor','Dusting Furniture','Making Bed','Planting Flowers','Watering Plants','Mowing Lawn','Raking Leaves'].includes(c)
    );
  } else if (currentMode === 'funny') {
    filtered = CHARADES.filter(c => 
      ['Taking Selfie','Dancing Together','Watching Movie','Flying Kite','Making Sandwich','Building Snowman','Making Snowball','Decorating Tree','Wrapping Gifts','Opening Presents','Blowing Candles','Cutting Cake','Serving Food','Setting Table','Pouring Drinks','Washing Car','Pumping Gas','Checking Tire','Changing Oil','Fixing Engine','Painting Fence','Hammering Nail','Sawing Wood','Drilling Hole','Screwing Bolt'].includes(c)
    );
  } else if (currentMode === 'party') {
    filtered = CHARADES.filter(c => 
      ['Dancing Together','Celebrating Birthday','Taking Selfie','Watching Movie','Playing Football','Playing Basketball','Playing Baseball','Playing Cricket','Playing Soccer','Playing Volleyball','Bowling Strike','Throwing Dart','Surfing Wave','Diving Deep','Swimming Laps','Sliding Slide','Swinging Swing','Riding Motorcycle','Driving Car','Parking Car','Reversing Car','Honking Horn','Washing Car','Decorating Tree','Wrapping Gifts','Opening Presents','Blowing Candles'].includes(c)
    );
  } else if (currentMode === 'hard') {
    filtered = CHARADES.filter(c => 
      ['Sculpting Clay','Carving Wood','Molding Pottery','Glazing Ceramic','Firing Kiln','Mixing Paint','Applying Varnish','Framing Picture','Hanging Picture','Tuning Guitar','Playing Piano','Drumming Beat','Blowing Trumpet','Playing Violin','Conducting Orchestra','Singing Song','Recording Music','Mixing Track','Playing Record','Adjusting Volume','Changing Channel','Programming Remote','Charging Battery','Plugging Cable','Connecting Wifi','Installing Software','Updating System','Backing Data','Restarting Computer'].includes(c)
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

// ── GENERATE ──────────────────────────────────────────────
function generate() {
  const box = document.getElementById("cards");
  const status = document.getElementById("statusText");
  if (!box) return;

  const pool = getFilteredCharades();

  box.innerHTML = "";

  for (let i = 0; i < currentCount; i++) {
    const charade = pool[Math.floor(Math.random() * pool.length)];
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<span class="card-emoji">🔄</span><p>${charade}</p>`;
    box.appendChild(div);
  }

  if (status) {
    status.textContent = `${currentCount} reverse charades ready 🔄`;
  }

  resetTimer(true);
}

// ── MODE ───────────────────────────────────────────────────
function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-mode="${mode}"]`);
  if (btn) btn.classList.add('active');
  generate();
}

// ── COUNT ──────────────────────────────────────────────────
function setCount(n) {
  currentCount = n;
  roundCount = n;
  document.querySelectorAll('.round-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-round="${n}"]`);
  if (btn) btn.classList.add('active');
  generate();
}

// ── CUSTOM ─────────────────────────────────────────────────
function showCustom() {
  document.getElementById('customBox').classList.remove('hidden');
}

function applyCustom() {
  let n = parseInt(document.getElementById('customInput').value);
  if (isNaN(n) || n < 1) n = 1;
  if (n > 12) n = 12;
  currentCount = n;
  roundCount = n;
  document.getElementById('customBox').classList.add('hidden');
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

// ── FULLSCREEN ────────────────────────────────────────────
function toggleFullScreen() {
  const elem = document.getElementById("gameArea");
  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// ── MENU ───────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById("navMobile").classList.toggle("open");
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  setMode('default');
  setRound(1);
  drawTimer(TIMER_TOTAL);
});
