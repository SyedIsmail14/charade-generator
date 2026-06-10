// ============================================================
//  food-charades.js  –  Food Charades Generator
// ============================================================

const charadesData = {
  easy: [
    "Eating ice cream fast before it melts",
    "Blowing birthday cake candles out",
    "Peeling a banana carefully",
    "Drinking through a very long straw",
    "Eating spaghetti very messily",
    "Cracking open a boiled egg",
    "Biting into a very sour lemon",
    "Eating popcorn watching a movie",
    "Blowing on very hot soup",
    "Shaking a bottle of ketchup",
    "Eating corn on the cob",
    "Opening a jar that will not open",
    "Eating a dripping ice lolly outside",
    "Squeezing too much toothpaste then eating",
    "Trying to eat noodles with a spoon",
    "Biting into something extremely spicy",
    "Eating a giant slice of watermelon",
    "Cracking a nut with bare hands",
    "Squeezing a juice box too hard",
    "Eating grapes one by one dramatically"
  ],
  cooking: [
    "Chopping onions and crying",
    "Kneading bread dough firmly",
    "Flipping pancakes in a pan",
    "Stirring a giant pot of soup",
    "Rolling out pizza dough",
    "Cracking eggs one-handed like a pro",
    "Whisking eggs very vigorously",
    "Grating cheese over pasta",
    "Frosting a layered birthday cake",
    "Flambéing a Christmas pudding",
    "Tasting and adding too much salt",
    "Sieving flour into a bowl",
    "Deseeding a chilli carefully",
    "Julienning vegetables perfectly",
    "Piping cream roses on a cake",
    "Tempering chocolate on a marble slab",
    "Lighting a crème brûlée torch",
    "Deglazing a pan with wine",
    "Folding egg whites into batter",
    "Separating egg yolk from white"
  ],
  hard: [
    "Eating sushi with chopsticks for first time",
    "Twirling spaghetti endlessly on a fork",
    "Cracking a whole crab at table",
    "Dipping bread in fondue and losing it",
    "Stacking a giant gourmet burger",
    "Unwrapping a massive burrito",
    "Slurping ramen noodles loudly",
    "Eating a whole lobster awkwardly",
    "Building a towering club sandwich",
    "Waiter balancing three plates perfectly",
    "Chef tasting dish and adding salt again",
    "Customer sending food back rudely",
    "Sommelier smelling wine cork seriously",
    "Splitting a bill and arguing loudly",
    "Chef presenting tiny dish dramatically",
    "Customer photographing food 15 times",
    "Soufflé rising then completely collapsing",
    "Stacking a croquembouche tower carefully",
    "Pulling spun sugar with both hands",
    "Dipping strawberries in melted chocolate"
  ],
  worldfood: [
    "Making biryani and stirring fragrant rice",
    "Rolling a tight sushi mat carefully",
    "Flipping a French crêpe perfectly",
    "Wrapping a doner kebab tightly",
    "Serving dim sum from bamboo steamer",
    "Making tortillas by hand slapping",
    "Stirring a slow tagine in clay pot",
    "Rolling grape leaves carefully",
    "Serving jollof rice from giant pot",
    "Making fresh pasta sheets by hand",
    "Grinding spices in a stone mortar",
    "Stretching Turkish pide bread",
    "Making Ethiopian injera on flat pan",
    "Serving paella from giant outdoor pan",
    "Making Korean kimchi by hand",
    "Assembling Vietnamese spring rolls",
    "Making Indian chapati on tawa",
    "Serving Brazilian churrasco on sword",
    "Making Moroccan mint tea ceremony",
    "Stirring a big pot of jollof rice"
  ]
};

charadesData.all = [
  ...charadesData.easy,
  ...charadesData.cooking,
  ...charadesData.hard,
  ...charadesData.worldfood
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
    card.innerHTML = `<span class="card-emoji">🍕</span><p>${p}</p>`;
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

setMode('all');
