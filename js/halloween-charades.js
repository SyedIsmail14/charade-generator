// ============================================================
//  halloween-charades.js  –  Halloween Charades Generator
// ============================================================

const charadesData = {
  kids: [
    "Carving a jack-o-lantern",
    "Trick-or-treating door to door",
    "Dressing up as a friendly ghost",
    "Making a spider web with string",
    "Bobbing for apples in a barrel",
    "Friendly witch flying on broomstick",
    "Black cat arching its back",
    "Opening a big bag of Halloween sweets",
    "Scarecrow standing perfectly still in field",
    "Owl hooting on a branch at night",
    "Painting a pumpkin orange",
    "Putting on a Halloween costume",
    "Drawing a spooky spider",
    "Skeleton doing a funny dance",
    "Ghost saying boo to scare someone",
    "Candy corn being sorted by colour",
    "Wearing a witch hat too big",
    "Friendly Frankenstein waving hello",
    "Making a paper bat decoration",
    "Running between houses trick-or-treating"
  ],
  spooky: [
    "Zombie walking very slowly",
    "Ghost floating through walls",
    "Vampire turning into a bat",
    "Witch stirring a bubbling cauldron",
    "Frankenstein walking stiffly with arms out",
    "Werewolf howling at the full moon",
    "Mummy unwrapping itself slowly",
    "Skeleton rattling its bones",
    "Dracula sleeping in his coffin",
    "Invisible man bumping into furniture",
    "Casting a powerful hex spell",
    "Flying on broomstick through night sky",
    "Potion turning person into a frog",
    "Crystal ball revealing the dark future",
    "Magic spell going badly wrong",
    "Witch coven dancing around bonfire",
    "Black cat familiar warning the witch",
    "Wand shooting sparks wildly",
    "Turning someone into a pumpkin",
    "Spell book pages turning by themselves"
  ],
  scary: [
    "Walking through a haunted house alone",
    "Spider dropping suddenly from ceiling",
    "Bat swooping through dark cave",
    "Shadow creeping slowly along the wall",
    "Door creaking open by itself slowly",
    "Candle flame flickering and suddenly dying",
    "Footsteps heard in completely empty house",
    "Mirror showing the wrong reflection",
    "Jack-o-lantern face slowly coming to life",
    "Ghost appearing through the floor",
    "Rocking chair moving with nobody in it",
    "Portrait eyes following you around room",
    "Writing appearing on the wall by itself",
    "Chandelier swinging dangerously",
    "Secret passage behind the bookcase",
    "Basement door that must stay shut opening",
    "Piano playing with nobody at keys",
    "Clown appearing in dark basement",
    "Dumbwaiter moving completely by itself",
    "Chandelier crashing at midnight"
  ],
  horror: [
    "Running upstairs instead of outside",
    "Checking if the killer is still there",
    "Phone with zero signal in a crisis",
    "Car that will not start while monster approaches",
    "Tripping while running from the monster",
    "Splitting up from the group — terrible idea",
    "Reading the cursed book out loud",
    "Opening the door you were told never to open",
    "Final girl turning to face the monster",
    "Saying I will be right back",
    "Following the strange noise into the dark",
    "Dropping torch at the worst moment",
    "Monster that is not dead getting back up",
    "Basement where the power just cut out",
    "Looking behind shower curtain slowly",
    "Slowly turning around when breathing heard",
    "Realising you are not alone in the house",
    "Running through forest in complete darkness",
    "Finding the phone line has been cut",
    "Making friends with the monster by mistake"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.spooky,
  ...charadesData.scary,
  ...charadesData.horror
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
    card.innerHTML = `<span class="card-emoji">🎃</span><p>${p}</p>`;
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
