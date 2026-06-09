// ============================================================
//  funny-charades.js  –  Funny Charades Generator
// ============================================================

const charadesData = {
  easy: [
    "Cat knocking everything off the table",
    "Dog meeting its own reflection",
    "Penguin trying to fly south",
    "Sloth arriving four hours late",
    "Goat eating someone's homework",
    "Parrot repeating everything you say",
    "Hamster running on wheel going nowhere",
    "Panda refusing to move",
    "Seagull stealing fish and chips",
    "Dog chasing its own tail forever",
    "Slipping on a banana peel",
    "Chair collapsing mid-sit",
    "Tripping up a single stair",
    "Walking into a glass door",
    "Dropping phone face down in slow motion",
    "Sneezing at exactly the wrong moment",
    "Carrying too many grocery bags at once",
    "Jacket sleeve stuck inside out",
    "Person who stepped on a Lego",
    "Getting foot stuck in a bucket"
  ],
  medium: [
    "Putting on sunscreen in a tornado",
    "Trying to sneeze quietly in a library",
    "Running late but moving in slow motion",
    "Parallel parking a massive lorry",
    "Assembling IKEA furniture alone at midnight",
    "Trying to open a crisp packet quietly in a cinema",
    "Texting while walking into a lamppost",
    "Pretending to understand directions you have no idea about",
    "Waving back at someone waving at the person behind you",
    "Trying to stay awake in a very boring meeting",
    "Forgetting the name of someone you know really well",
    "Wrong video call background causing a disaster",
    "Autocorrect completely ruining an important message",
    "Joining the wrong Zoom meeting and realising too late",
    "Spilling coffee all over a white shirt",
    "Laugh suddenly turning into a very loud snort in public",
    "Sitting on a wet park bench in good trousers",
    "Phone dying at exactly 1% at the worst possible moment",
    "Alarm failing to go off on exam day",
    "Reaching for someone else's hand by mistake"
  ],
  hard: [
    "Overconfident terrible chef presenting awful food with pride",
    "Person who completely forgot their important speech mid-way",
    "Tourist utterly lost abroad refusing to admit it",
    "Person pretending to understand modern art they hate",
    "Gym person grunting too loudly on every single rep",
    "Person trapped in a revolving door for the third time",
    "Driver who absolutely refuses to ask for directions",
    "Person singing opera at the top of their lungs in the shower",
    "Nervous best man giving speech while forgetting everything",
    "Sitting on a whoopee cushion at an extremely formal wedding",
    "Person who laughed at their own joke before finishing it",
    "Someone who took the last biscuit and is trying to hide it",
    "Person pretending to laugh at a joke they did not understand",
    "Someone who accidentally liked a very old photo while stalking",
    "Person aggressively agreeing with everyone to avoid conflict",
    "Someone who brought the wrong dish to a potluck dinner",
    "Person who said goodbye then walked in the same direction",
    "Someone who replied all on an email they definitely should not have",
    "Person narrating their own life like a wildlife documentary",
    "Someone who got hiccups during a silent examination"
  ],
  extreme: [
    "T-Rex trying to do pushups",
    "Gollum using a self-checkout machine and losing his mind",
    "Penguin competing in a hot dog eating contest and winning",
    "Grandma learning TikTok dances from a teenager",
    "Dracula applying for a job at a blood bank",
    "Ghost trying to use a revolving door unsuccessfully",
    "Robot having an existential crisis about its purpose",
    "Caveman discovering a smartphone for the first time",
    "Astronaut trying to eat soup in zero gravity",
    "Viking ordering a very complicated coffee at Starbucks",
    "Zombie trying to remember what they did before they died",
    "Dinosaur trying to fit into a modern office chair",
    "Pirate trying to use Google Maps to find treasure",
    "Witch trying to order a takeaway on a broomstick",
    "Mummy trying to unwrap itself while running late",
    "Dracula getting stuck in a tanning salon",
    "Superman stuck in traffic just like everyone else",
    "Frankenstein trying to be inconspicuous on public transport",
    "Time traveller trying to explain WiFi to a medieval peasant",
    "Werewolf trying to act normal at a business meeting"
  ]
};

// Build flat pool for "all" mode
charadesData.all = [
  ...charadesData.easy,
  ...charadesData.medium,
  ...charadesData.hard,
  ...charadesData.extreme
];

let currentMode = 'all';
let count = 1;
let usedIndices = {};

function setMode(mode) {
  currentMode = mode;
  usedIndices[mode] = usedIndices[mode] || [];
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-mode="${mode}"]`);
  if (btn) btn.classList.add('active');
}

function setCount(n) {
  count = n;
  document.getElementById('customBox').classList.add('hidden');
}

function showCustom() {
  document.getElementById('customBox').classList.toggle('hidden');
}

function applyCustom() {
  const val = parseInt(document.getElementById('customInput').value);
  if (val >= 1 && val <= 12) { count = val; document.getElementById('customBox').classList.add('hidden'); }
}

function getPrompts(mode, n) {
  const pool = charadesData[mode] || charadesData.all;
  if (!usedIndices[mode]) usedIndices[mode] = [];
  if (usedIndices[mode].length >= pool.length) usedIndices[mode] = [];
  const available = pool.map((_, i) => i).filter(i => !usedIndices[mode].includes(i));
  const shuffled = available.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(n, available.length));
  usedIndices[mode].push(...selected);
  return selected.map(i => pool[i]);
}

function generate() {
  const prompts = getPrompts(currentMode, count);
  const container = document.getElementById('cards');
  container.innerHTML = '';
  prompts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<span class="card-emoji">😂</span><p>${p}</p>`;
    container.appendChild(card);
  });
}

function copyCharades() {
  const cards = document.querySelectorAll('#cards .card p');
  if (!cards.length) return;
  const text = Array.from(cards).map(c => c.textContent).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById('copyMsg');
    msg.style.display = 'inline';
    setTimeout(() => { msg.style.display = 'none'; }, 2000);
  });
}

function toggleFullScreen() {
  const area = document.getElementById('gameArea');
  if (!document.fullscreenElement) {
    area.requestFullscreen && area.requestFullscreen();
  } else {
    document.exitFullscreen && document.exitFullscreen();
  }
}

function toggleMenu() {
  const nav = document.getElementById('navMobile');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// Init
setMode('all');
