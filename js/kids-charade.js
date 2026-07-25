// ============================================================
//  kids-charade.js  –  Kids Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

/* =====================================================
   KIDS CHARADES – TWO WORD, SAFE & FUN
   Examples: "Jumping Frog", "Sleeping Baby"
   ===================================================== */

/* KID ACTIONS */
const ACTIONS = [
"Jumping","Running","Dancing","Clapping","Waving","Hopping","Skipping","Crawling","Marching","Spinning","Stretching","Yawning","Laughing","Sleeping","Tiptoeing","Balancing","Flying","Swimming","Rolling","Playing","Walking","Sitting","Standing","Kneeling","Bending","Twisting","Shaking","Nodding","Pointing","Throwing","Catching","Kicking","Pulling","Pushing","Lifting","Carrying","Hugging","Kissing","Whispering","Shouting","Singing","Humming","Whistling","Blowing","Breathing","Coughing","Sneezing","Eating","Drinking","Chewing","Swallowing","Smiling","Frowning","Crying","Blinking","Winking","Staring","Peeking","Hiding","Seeking","Finding","Climbing","Sliding","Swinging","Bouncing","Leaping","Tumbling","Cartwheeling","Somersaulting","Handstanding","Backflipping","Jogging","Sprinting","Dashing","Racing","Chasing","Escaping","Dodging","Ducking","Crouching","Squatting","Lunging","Stepping","Stomping","Tapping","Shuffling","Gliding","Floating","Drifting","Sinking","Diving","Splashing","Paddling","Rowing","Sailing","Surfing","Skiing","Skating","Sledding","Biking","Riding","Driving","Steering","Turning","Stopping","Starting","Pausing","Resting","Relaxing","Meditating","Thinking","Dreaming","Imagining","Creating","Building","Drawing","Painting","Writing","Reading","Studying","Learning","Teaching","Helping","Sharing","Giving","Receiving","Taking","Holding","Grabbing","Releasing","Dropping","Picking","Choosing","Deciding","Planning","Organizing","Arranging","Sorting","Counting","Measuring","Weighing","Comparing","Matching","Separating","Combining","Mixing","Stirring","Shaking","Pouring","Filling","Emptying","Opening","Closing","Locking","Unlocking"];

/* KID NOUNS */
const NOUNS = [
"Baby","Puppy","Kitten","Frog","Monkey","Elephant","Lion","Penguin","Bird","Butterfly","Dinosaur","Robot","Superhero","Princess","Pirate","Clown","Bear","Cat","Dog","Duck","Bunny","Tiger","Giraffe","Zebra","Panda","Koala","Kangaroo","Horse","Cow","Pig","Sheep","Goat","Chicken","Rooster","Turkey","Fish","Shark","Whale","Dolphin","Octopus","Crab","Turtle","Snail","Ladybug","Bee","Ant","Spider","Dragonfly","Owl","Eagle","Parrot","Swan","Peacock","Flamingo","Mouse","Rat","Squirrel","Hedgehog","Raccoon","Fox","Wolf","Deer","Moose","Camel","Hippo","Rhino","Crocodile","Alligator","Snake","Lizard","Dragon","Unicorn","Fairy","Wizard","Witch","Ghost","Monster","Alien","Astronaut","Cowboy","Knight","Ballerina","Doctor","Firefighter","Police","Teacher","Chef","Farmer","Builder","Artist","Musician","Dancer","Singer","Athlete","Soldier","Sailor","Pilot","Driver","Gardener","Baker","Nurse","Scientist","Explorer","Detective","Judge","King","Queen","Prince","Joker","Snowman","Scarecrow","Mermaid","Giant","Elf","Troll","Goblin","Ogre","Yeti","Vampire","Zombie","Skeleton","Mummy","Werewolf","Angel","Devil","Genie","Leprechaun","Gnome","Dwarf","Hobbit","Ninja","Samurai","Viking","Spartan","Gladiator","Pharaoh","Emperor","Sultan","Chief","Warrior","Hero","Villain","Champion","Legend","Titan","Colossus","Cyclops","Minotaur","Centaur","Pegasus","Phoenix","Sphinx","Chimera","Hydra","Cerberus","Medusa","Siren","Nymph"];

// ── GAME STATE ────────────────────────────────────────────
let currentCategory = "all";
let currentCount = 1;
let roundCount = 1;
let usedCharades = [];

// ── TIMER STATE ───────────────────────────────────────────
const TIMER_TOTAL = 30;
let timeLeft = TIMER_TOTAL;
let timerInterval = null;
let timerRunning = false;

// ── TIMER FUNCTIONS ───────────────────────────────────────
function drawTimer(seconds) {
  const radius = 44;
  const circ = 2 * Math.PI * radius;
  const dash = (seconds / TIMER_TOTAL) * circ;
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

// ── CATEGORY FILTER ───────────────────────────────────────
function getFilteredNouns() {
  if (currentCategory === "animals") {
    return NOUNS.filter(n =>
      ["Dog","Cat","Lion","Tiger","Elephant","Monkey","Bird","Fish","Horse","Frog","Penguin","Bear","Wolf","Fox","Deer"].some(a => n.includes(a))
    );
  }

  if (currentCategory === "people") {
    return NOUNS.filter(n =>
      ["Doctor","Teacher","Chef","Farmer","Police","Firefighter","Artist","Pilot","Builder","Nurse"].some(p => n.includes(p))
    );
  }

  if (currentCategory === "fantasy") {
    return NOUNS.filter(n =>
      ["Dragon","Unicorn","Wizard","Ghost","Monster","Zombie","Fairy","Giant","Mermaid","Robot","Knight","Pirate","Superhero"].some(f => n.includes(f))
    );
  }

  return NOUNS;
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

// ── RANDOM CHARADE ────────────────────────────────────────
function getRandomCharade() {
  const nouns = getFilteredNouns();
  let charade;
  let attempts = 0;

  do {
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    charade = `${action} ${noun}`;
    attempts++;
  } while (usedCharades.includes(charade) && attempts < 20);

  usedCharades.push(charade);
  return charade;
}

// ── GENERATE ──────────────────────────────────────────────
function generate() {
  const box = document.getElementById("cards");
  const status = document.getElementById("statusText");

  if (!box) return;

  box.innerHTML = "";

  for (let i = 0; i < currentCount; i++) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<span class="card-emoji">🎉</span><p>${getRandomCharade()}</p>`;
    box.appendChild(div);
  }

  if (status) {
    status.textContent = `${currentCount} ${currentCategory} charades ready 🎉`;
  }

  resetTimer(true);
}

// ── CATEGORY ───────────────────────────────────────────────
function setCategory(cat) {
  currentCategory = cat;

  document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
  const btn = document.querySelector(`[data-mode="${cat}"]`);
  if (btn) btn.classList.add("active");

  usedCharades = [];
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
  document.getElementById("customBox").classList.remove("hidden");
}

function applyCustom() {
  let n = parseInt(document.getElementById("customInput").value);

  if (isNaN(n) || n < 1) n = 1;
  if (n > 12) n = 12;

  currentCount = n;
  roundCount = n;
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
  setCategory('all');
  setRound(1);
  drawTimer(TIMER_TOTAL);
});
