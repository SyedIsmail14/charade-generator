// ── Animal Charades – js/animal-charades.js ─────────────────────────────────

// ── Data ─────────────────────────────────────────────────────────────────────
const animalPools = {
  farm: [
    "Milk a cow", "Ride a horse", "Feed chickens", "Shear a sheep",
    "Saddle a donkey", "Herd cattle", "Chase a pig", "Collect eggs",
    "Groom a horse", "Walk a goat on a leash", "Duck waddling",
    "Rooster crowing at dawn", "Dog herding sheep", "Rabbit hopping",
    "Turkey puffing up feathers", "Pig rolling in mud",
    "Horse galloping across a field", "Cow chewing cud slowly",
    "Farmer chasing runaway chickens", "Goat butting heads"
  ],
  wild: [
    "Lion roaring", "Elephant spraying water with trunk",
    "Giraffe eating leaves from a tall tree", "Cheetah sprinting",
    "Gorilla beating chest", "Zebra running from a lion",
    "Meerkat standing guard", "Monkey swinging from branch to branch",
    "Hippo yawning wide open", "Bear fishing in a river",
    "Wolf howling at the moon", "Snake slithering silently",
    "Crocodile snapping jaws", "Rhino charging",
    "Chimpanzee grooming another", "Fox sneaking through grass",
    "Hyena laughing", "Gazelle leaping over obstacles",
    "Panda eating bamboo", "Kangaroo boxing"
  ],
  ocean: [
    "Dolphin leaping out of water", "Octopus squirting ink and escaping",
    "Shark circling prey", "Crab walking sideways",
    "Jellyfish floating in current", "Seahorse drifting upright",
    "Whale breaching", "Lobster snapping claws",
    "Seal clapping flippers", "Starfish slowly moving",
    "Turtle swimming gracefully", "Clownfish darting into anemone",
    "Penguin waddling then diving", "Manta ray gliding through water",
    "Sea otter cracking a shell on its belly",
    "Anglerfish luring with bioluminescent light",
    "Blowfish puffing up defensively", "Flying fish leaping over waves",
    "Hermit crab switching shells", "Narwhal showing off its tusk"
  ],
  birds: [
    "Peacock spreading tail feathers", "Flamingo standing on one leg",
    "Owl rotating head almost all the way around",
    "Penguin waddling with wings out", "Eagle diving to catch fish",
    "Toucan showing off oversized beak",
    "Hummingbird hovering to drink nectar",
    "Parrot mimicking speech", "Woodpecker drilling into tree",
    "Pelican scooping fish with giant bill",
    "Swan gliding elegantly across water",
    "Chicken pecking at grain on the ground",
    "Ostrich running with tiny wings flapping",
    "Robin pulling a worm from the ground",
    "Crow using a stick as a tool",
    "Pigeon bobbing head while walking",
    "Stork delivering a baby", "Bat flying erratically at night",
    "Kiwi sniffing the ground with long bill",
    "Albatross soaring without flapping wings"
  ],
  reptiles: [
    "Chameleon changing colour slowly",
    "Gecko climbing straight up a wall",
    "Komodo dragon tasting air with forked tongue",
    "Crocodile floating motionless then snapping",
    "Turtle retreating into shell",
    "Lizard doing push-ups to show dominance",
    "Snake unhinging jaw to swallow large prey",
    "Iguana nodding head repeatedly",
    "Tortoise moving extremely slowly",
    "Frilled lizard spreading neck frill to scare predator",
    "Cobra rising and spreading hood",
    "Anaconda squeezing prey tightly",
    "Skink shedding its tail to escape",
    "Monitor lizard forking its tongue rapidly",
    "Alligator death rolling in water"
  ],
  insects: [
    "Bee waggle dancing to share flower location",
    "Butterfly emerging from cocoon",
    "Praying mantis striking lightning fast",
    "Caterpillar slowly inching forward",
    "Firefly blinking in the dark",
    "Ant carrying food many times its size",
    "Dragonfly hovering then darting sideways",
    "Cricket rubbing legs together to chirp",
    "Grasshopper leaping huge distances",
    "Stick insect pretending to be a twig",
    "Dung beetle rolling a giant ball",
    "Mosquito buzzing and landing on arm",
    "Spider spinning a web",
    "Bombardier beetle shooting spray",
    "Ladybird opening wings and flying away"
  ]
};

// Merge all into one pool for "All" mode
const allAnimals = Object.values(animalPools).flat();

// Funny/party/hard variants
const funnyAnimals = [
  "Doing the worm dance as an actual worm",
  "Penguin trying to fly and failing",
  "Dog chasing its own tail forever",
  "Cat knocking everything off a table",
  "Goat fainting dramatically",
  "Sloth doing everything in extreme slow motion",
  "Dog meeting another dog and going crazy",
  "Parrot repeating everything you say",
  "Meerkat popping up from underground suddenly",
  "Crab trying to walk in a straight line",
  "Flamingo losing balance and falling over",
  "Monkey stealing someone's food and running",
  "Pigeon strutting and bobbing like it owns the place",
  "Cat ignoring everything and everyone",
  "Hippo being surprisingly fast in water",
  "Elephant afraid of a tiny mouse",
  "Dog hearing the word 'walkies'",
  "Peacock showing off but nobody cares",
  "Bear waking up grumpy from hibernation",
  "Duck slipping on ice"
];

const hardAnimals = [
  "Axolotl regenerating a lost limb",
  "Mantis shrimp punching through glass",
  "Lyrebird mimicking a chainsaw",
  "Narwhal using tusk as sensory organ",
  "Pangolin curling into a perfect ball",
  "Platypus detecting prey with electroreceptors",
  "Bombardier beetle firing boiling chemical spray",
  "Dung beetle navigating by the Milky Way",
  "Mimic octopus impersonating a flatfish",
  "Archerfish shooting water jet at insect on branch",
  "Pistol shrimp snapping claw to stun prey with shockwave",
  "Tardigrade surviving in outer space",
  "Pistol shrimp creating a flash of light with its snap",
  "Cuttlefish hypnotising prey with rippling colour waves",
  "Bowerbird arranging decorations to impress a mate",
  "Horned lizard squirting blood from its eyes",
  "Electric eel discharging 600 volts",
  "Hagfish secreting a cloud of slime",
  "Immortal jellyfish reverting back to juvenile stage"
];

const partyAnimals = [
  "Conga line of penguins",
  "Gorilla doing the moonwalk",
  "Flamingo as a party statue that topples",
  "Bear DJ scratching records",
  "Peacock showing feathers on the dance floor",
  "Parrot hosting a karaoke night",
  "Dog photobombing every picture",
  "Cat judging everyone at the party",
  "Octopus playing eight instruments at once",
  "Elephant doing the limbo",
  "Monkey stealing the birthday cake",
  "Horse galloping to the dancefloor",
  "Seal balancing a party hat on its nose",
  "Crab doing a sideways breakdance",
  "Meerkat being the designated lookout",
  "Wolf howling the birthday song",
  "Penguin in a tuxedo who is already dressed for the party",
  "Lion trying to act cool but roaring mid-sentence",
  "Hyena laughing at every joke even when it is not funny",
  "Sloth arriving four hours late"
];

// ── State ─────────────────────────────────────────────────────────────────────
let currentCount = 1;
let currentMode  = "default";
let usedSet      = new Set();

// ── Helpers ───────────────────────────────────────────────────────────────────
function getPool() {
  switch (currentMode) {
    case "kids":  return animalPools.farm.concat(animalPools.birds, animalPools.insects);
    case "funny": return funnyAnimals;
    case "hard":  return hardAnimals;
    case "party": return partyAnimals;
    default:      return allAnimals;
  }
}

function pickItems(pool, count) {
  // Reset used set if pool would be exhausted
  let available = pool.filter(i => !usedSet.has(i));
  if (available.length < count) {
    usedSet.clear();
    available = [...pool];
  }
  const picked = [];
  while (picked.length < count && available.length > 0) {
    const idx = Math.floor(Math.random() * available.length);
    picked.push(available[idx]);
    usedSet.add(available[idx]);
    available.splice(idx, 1);
  }
  return picked;
}

// ── UI Controls ───────────────────────────────────────────────────────────────
function setCount(n) {
  currentCount = n;
  document.querySelectorAll('.quick-pick button').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === String(n));
  });
  document.getElementById('customBox').classList.add('hidden');
}

function showCustom() {
  document.getElementById('customBox').classList.toggle('hidden');
}

function applyCustom() {
  const val = parseInt(document.getElementById('customInput').value, 10);
  if (val >= 1 && val <= 12) {
    currentCount = val;
    document.getElementById('customBox').classList.add('hidden');
    generate();
  } else {
    alert('Please enter a number between 1 and 12.');
  }
}

function setMode(mode) {
  currentMode = mode;
  usedSet.clear();
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

// ── Generate ──────────────────────────────────────────────────────────────────
function generate() {
  const pool  = getPool();
  const items = pickItems(pool, currentCount);
  const container = document.getElementById('cards');
  container.innerHTML = '';

  items.forEach(text => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<span class="card-icon">🐾</span><p>${text}</p>`;
    container.appendChild(card);
  });

  // Scroll to cards smoothly
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Copy ──────────────────────────────────────────────────────────────────────
function copyCharades() {
  const cards = document.querySelectorAll('#cards .card p');
  if (!cards.length) { alert('Generate some charades first!'); return; }
  const text = Array.from(cards).map((c, i) => `${i + 1}. ${c.textContent}`).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById('copyMsg');
    msg.style.display = 'inline';
    setTimeout(() => msg.style.display = 'none', 2000);
  });
}

// ── Full Screen ───────────────────────────────────────────────────────────────
function toggleFullScreen() {
  const el = document.getElementById('gameArea');
  if (!document.fullscreenElement) {
    el.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────
function toggleMenu() {
  const nav = document.getElementById('navMobile');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setCount(1);
});
