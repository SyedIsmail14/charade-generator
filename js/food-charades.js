/* Food Charades Generator — game engine */

const FOOD_WORDS = {
  easy: [
    { emoji: "🍌", text: "Peeling and eating a banana" },
    { emoji: "🍎", text: "Biting into a juicy apple" },
    { emoji: "🍜", text: "Slurping a bowl of noodles" },
    { emoji: "🍦", text: "Eating a big scoop of ice cream" },
    { emoji: "🍿", text: "Munching on crunchy popcorn" },
    { emoji: "🥛", text: "Drinking a glass of milk" },
    { emoji: "🍭", text: "Licking a melting lollipop" },
    { emoji: "🍞", text: "Buttering a slice of toast" },
    { emoji: "🍉", text: "Eating a slice of watermelon" },
    { emoji: "🍪", text: "Dunking a cookie in milk" }
  ],
  popular: [
    { emoji: "🍕", text: "Eating a cheesy slice of pizza" },
    { emoji: "🍝", text: "Twirling spaghetti on a fork" },
    { emoji: "🍔", text: "Biting into a juicy burger" },
    { emoji: "🌮", text: "Rolling and eating a taco" },
    { emoji: "🍣", text: "Picking up sushi with chopsticks" },
    { emoji: "🍿", text: "Eating hot buttery popcorn at the movies" },
    { emoji: "🍟", text: "Dipping fries in ketchup" },
    { emoji: "🌭", text: "Biting into a hot dog" },
    { emoji: "🥚", text: "Peeling a boiled egg" },
    { emoji: "🥞", text: "Eating a stack of pancakes" }
  ],
  desserts: [
    { emoji: "🎂", text: "Blowing out candles on a birthday cake" },
    { emoji: "🍫", text: "Licking chocolate off your fingers" },
    { emoji: "🍦", text: "Scooping ice cream into a cone" },
    { emoji: "🍬", text: "Unwrapping and eating candy" },
    { emoji: "🍩", text: "Biting into a giant donut" },
    { emoji: "🔥", text: "Roasting marshmallows over a fire" },
    { emoji: "🥧", text: "Eating a slice of pie" },
    { emoji: "🍨", text: "Squeezing whipped cream onto a dessert" },
    { emoji: "🍬", text: "Popping bubblegum with a bubble" },
    { emoji: "🥠", text: "Cracking open a fortune cookie" }
  ],
  cooking: [
    { emoji: "🍲", text: "Stirring a big pot of soup" },
    { emoji: "🥞", text: "Flipping a pancake in a pan" },
    { emoji: "🔪", text: "Chopping vegetables quickly" },
    { emoji: "🍞", text: "Kneading bread dough" },
    { emoji: "🥣", text: "Whisking eggs in a bowl" },
    { emoji: "🧂", text: "Sprinkling salt over food" },
    { emoji: "🍖", text: "Grilling burgers on a barbecue" },
    { emoji: "🍕", text: "Rolling out pizza dough" },
    { emoji: "🥗", text: "Tossing a salad in a bowl" },
    { emoji: "🥄", text: "Tasting soup with a spoon" }
  ],
  international: [
    { emoji: "🍣", text: "Rolling sushi with a bamboo mat" },
    { emoji: "🍝", text: "Twirling Italian spaghetti" },
    { emoji: "🥞", text: "Folding a French crepe" },
    { emoji: "🍛", text: "Eating Indian curry with naan" },
    { emoji: "🍖", text: "Grilling Korean barbecue" },
    { emoji: "🌮", text: "Making Mexican tacos" },
    { emoji: "🍜", text: "Stir-frying Chinese noodles" },
    { emoji: "🧀", text: "Dipping Swiss cheese fondue" },
    { emoji: "🥨", text: "Eating German pretzels" },
    { emoji: "🥙", text: "Serving Middle Eastern hummus" }
  ],
  restaurant: [
    { emoji: "🍽️", text: "Waiter carrying a tray of food" },
    { emoji: "📋", text: "Reading a menu and pointing to a dish" },
    { emoji: "👨‍🍳", text: "Chef tasting a sauce and adjusting seasoning" },
    { emoji: "🌶️", text: "Sending food back because it's too spicy" },
    { emoji: "🥵", text: "Blowing on food that's too hot" },
    { emoji: "🧾", text: "Splitting a bill among friends" },
    { emoji: "🍰", text: "Ordering dessert after a big meal" },
    { emoji: "🥡", text: "Wrapping up leftovers to take home" },
    { emoji: "☕", text: "Barista frothing milk for coffee" },
    { emoji: "🍷", text: "Sommelier tasting and swirling wine" }
  ]
};

const MODE_CATEGORIES = {
  all: ["easy", "popular", "desserts", "cooking", "international", "restaurant"],
  easy: ["easy"],
  popular: ["popular", "international"],
  desserts: ["desserts"],
  cooking: ["cooking", "restaurant"]
};

let currentMode = "all";
let currentRound = 1;
let recentWords = [];
let currentCards = [];

// ── Timer state ──────────────────────────────────────
const TIMER_TOTAL = 30;
let timerSeconds = TIMER_TOTAL;
let timerRunning = false;
let timerInterval = null;
const RING_RADIUS = 42;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

function renderRing() {
  const ring = document.getElementById("timerRing");
  if (!ring) return;
  const pct = timerSeconds / TIMER_TOTAL;
  const offset = RING_CIRC * (1 - pct);
  const color = timerSeconds <= 5 ? "#e03131" : "#e8590c";
  ring.innerHTML = `
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="${RING_RADIUS}" fill="none" stroke="#ffe8cc" stroke-width="8"/>
      <circle cx="50" cy="50" r="${RING_RADIUS}" fill="none" stroke="${color}" stroke-width="8"
        stroke-linecap="round" stroke-dasharray="${RING_CIRC}" stroke-dashoffset="${offset}"
        transform="rotate(-90 50 50)" style="transition:stroke-dashoffset .3s linear,stroke .3s;"/>
      <text x="50" y="57" text-anchor="middle" font-size="24" font-weight="700" fill="#333">${timerSeconds}</text>
    </svg>`;
}

function startTimer() {
  timerRunning = true;
  document.getElementById("timerToggleBtn").textContent = "⏸ Pause";
  timerInterval = setInterval(() => {
    timerSeconds--;
    renderRing();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      document.getElementById("timerToggleBtn").textContent = "▶ Start";
      document.getElementById("timeOverOverlay").style.display = "flex";
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById("timerToggleBtn").textContent = "▶ Start";
}

function resetTimer(autoStart) {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = TIMER_TOTAL;
  document.getElementById("timerToggleBtn").textContent = "▶ Start";
  document.getElementById("timeOverOverlay").style.display = "none";
  renderRing();
  if (autoStart) startTimer();
}

// ── Mode & round selection ───────────────────────────
function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });
}

function setRound(round) {
  currentRound = round;
  document.querySelectorAll(".round-btn").forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.round) === round);
  });
}

// ── Card generation ──────────────────────────────────
function pickWord() {
  const cats = MODE_CATEGORIES[currentMode] || MODE_CATEGORIES.all;
  const pool = cats.flatMap(cat => FOOD_WORDS[cat]);
  let available = pool.filter(w => !recentWords.includes(w.text));
  if (available.length === 0) {
    recentWords = [];
    available = pool;
  }
  const word = available[Math.floor(Math.random() * available.length)];
  recentWords.push(word.text);
  if (recentWords.length > 15) recentWords.shift();
  return word;
}

function generate() {
  document.getElementById("timeOverOverlay").style.display = "none";
  const count = currentRound;
  currentCards = Array.from({ length: count }, () => pickWord());

  const cardsEl = document.getElementById("cards");
  cardsEl.innerHTML = currentCards
    .map(w => `<div class="card"><span class="card-emoji">${w.emoji}</span><p>${w.text}</p></div>`)
    .join("");

  document.getElementById("statusText").textContent =
    count === 1 ? "Act it out! 🍽️" : `Act out all ${count} — go! 🍽️`;

  resetTimer(false);
}

// ── Copy / fullscreen ────────────────────────────────
function copyCharades() {
  if (!currentCards.length) return;
  const text = currentCards.map(w => `${w.emoji} ${w.text}`).join("\n");
  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById("copyMsg");
    msg.style.display = "inline";
    setTimeout(() => (msg.style.display = "none"), 1500);
  });
}

function toggleFullScreen() {
  const el = document.getElementById("gameArea");
  if (!document.fullscreenElement) {
    el.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

function toggleMenu() {
  const nav = document.getElementById("navMobile");
  if (nav) nav.classList.toggle("open");
}

// ── Init ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderRing();
});
