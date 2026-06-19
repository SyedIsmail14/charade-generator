// ============================================================
//  thanksgiving-charades.js  –  Thanksgiving Charades Generator
// ============================================================

const charadesData = {
  kids: [
    "Turkey gobbling proudly",
    "Picking the perfect pumpkin",
    "Tracing hand to make turkey art",
    "Helping set the dinner table",
    "Watching parade balloons float by",
    "Making a paper Pilgrim hat",
    "Counting how many cousins arrived",
    "Squirrel gathering acorns for winter",
    "Raking autumn leaves into big piles",
    "Saying one thing you are thankful for",
    "Jumping into a pile of leaves",
    "Drawing a turkey using your hand",
    "Helping carry dishes to the table",
    "Playing with cousins before dinner",
    "Smelling the turkey cooking happily",
    "Wearing a paper turkey headband",
    "Watching grandma cook in the kitchen",
    "Setting out the name cards",
    "Pointing excitedly at parade floats",
    "Waiting impatiently for dinner to start"
  ],
  family: [
    "Whole family going around table sharing thanks",
    "Watching the Macy's parade on TV",
    "Grandma's secret recipe being guarded closely",
    "Family football game in the backyard",
    "Setting up the kids table separately",
    "Saying grace before the big meal",
    "Extended family arriving all at once",
    "Taking the annual family photo",
    "Watching football game after dinner",
    "Lighting the centrepiece candles",
    "Helping grandma carry dishes from kitchen",
    "Catching up with relatives you rarely see",
    "Setting the table with the good china",
    "Everyone fighting for the recliner",
    "Dad carving turkey with great ceremony",
    "Mom coordinating the entire kitchen",
    "Cousins catching up in the living room",
    "Grandpa telling the same story again",
    "Family dog begging under the table",
    "Three generations cooking together"
  ],
  food: [
    "Carving the turkey at the table",
    "Basting the turkey in the oven",
    "Mashing potatoes vigorously",
    "Stuffing the turkey carefully",
    "Pouring gravy over everything",
    "Slicing the pumpkin pie",
    "Passing the cranberry sauce around",
    "Whipping the cream for dessert",
    "Setting out the green bean casserole",
    "Fighting over the last dinner roll",
    "Testing turkey temperature nervously",
    "Making cornbread stuffing from scratch",
    "Candying the sweet potatoes",
    "Setting out the relish tray",
    "Carrying the heavy turkey to table",
    "Tasting the gravy to check seasoning",
    "Buttering rolls fresh from the oven",
    "Scooping mac and cheese for the kids",
    "Decorating pie with whipped cream",
    "Wrapping leftovers for everyone to take home"
  ],
  funny: [
    "Turkey coming out completely dry",
    "Gravy boat tipping over dramatically",
    "Uncle falling asleep during dinner",
    "Someone bringing a controversial dish",
    "Smoke alarm going off from the oven",
    "Family political debate at the table",
    "Trying to fit through door with too much food",
    "Pretending to like the same gift every year",
    "Black Friday door buster sprint",
    "Falling asleep on couch after dinner",
    "Forgetting to thaw the turkey in time",
    "Pants getting tighter after second plate",
    "Spilling cranberry sauce on white tablecloth",
    "Arguing about how to make stuffing correctly",
    "Dog stealing food off unattended plate",
    "Someone arriving extremely late to dinner",
    "Awkward silence after political comment",
    "Trying to find room in fridge for leftovers",
    "Kids table getting louder than adults table",
    "Turkey timer going off at the worst moment"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.family,
  ...charadesData.food,
  ...charadesData.funny
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
    card.innerHTML = `<span class="card-emoji">🦃</span><p>${p}</p>`;
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
