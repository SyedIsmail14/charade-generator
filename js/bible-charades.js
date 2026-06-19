// ============================================================
//  bible-charades.js  –  Bible Charades Generator
// ============================================================

const charadesData = {
  kids: [
    "Noah building the ark",
    "Animals entering the ark two by two",
    "David playing harp for King Saul",
    "Jonah being swallowed by a big fish",
    "Baby Moses in a basket on the river",
    "Daniel praying calmly in lion's den",
    "Joseph's coat of many colours",
    "Jesus calming the stormy sea",
    "Shepherds visiting baby Jesus",
    "Zacchaeus climbing the tree to see Jesus",
    "Noah sending out the dove",
    "David anointed as future king",
    "Joseph being sold by his brothers",
    "Baby Jesus born in a manger",
    "Wise men following the bright star",
    "Jesus blessing the little children",
    "Samuel hearing God's voice at night",
    "Moses and the burning bush",
    "Jesus calling his first disciples",
    "Noah's ark resting on the mountain"
  ],
  old: [
    "God creating light on the first day",
    "Adam and Eve in the garden of Eden",
    "Moses parting the Red Sea",
    "David defeating Goliath with a sling",
    "Samson pushing down the temple pillars",
    "Elijah calling down fire from heaven",
    "Jacob wrestling with the angel",
    "Joseph interpreting Pharaoh's dreams",
    "Esther approaching the king bravely",
    "Ruth gleaning in Boaz's field",
    "Abraham looking up at countless stars",
    "Moses receiving the Ten Commandments",
    "King Solomon's wise judgment",
    "Gideon with his small mighty army",
    "Job remaining faithful through suffering",
    "Deborah leading Israelites to victory",
    "Jonah preaching to the city of Nineveh",
    "Isaac being bound on the altar",
    "Joshua and the walls of Jericho falling",
    "Elijah taken up in a chariot of fire"
  ],
  new: [
    "Jesus walking on water",
    "Feeding the 5000 with bread and fish",
    "Jesus healing the blind man",
    "Lazarus raised from the dead",
    "Jesus turning water into wine",
    "Peter denying Jesus three times",
    "Paul converted on the road to Damascus",
    "Jesus washing the disciples' feet",
    "Doubting Thomas touching the wounds",
    "Pentecost tongues of fire descending",
    "Jesus calling Peter to walk on water",
    "Mary anointing Jesus's feet with oil",
    "Jesus casting out demons",
    "Ten lepers healed and giving thanks",
    "Jesus's transfiguration on the mountain",
    "Stephen being stoned for his faith",
    "Philip baptising the Ethiopian official",
    "Jesus appearing to Mary at the tomb",
    "Paul shipwrecked on his journey",
    "Jesus ascending into the clouds"
  ],
  parables: [
    "Good Samaritan helping injured man",
    "Prodigal Son returning home to father",
    "Lost sheep found by the shepherd",
    "Sower scattering seeds on different soil",
    "Mustard seed growing into a great tree",
    "Wise and foolish builders on rock and sand",
    "Talents being multiplied or buried",
    "Persistent widow seeking justice",
    "Rich man and Lazarus at the gate",
    "Workers in the vineyard receiving wages",
    "Unforgiving servant refusing mercy",
    "Ten virgins waiting with their lamps",
    "Pharisee and tax collector praying",
    "Lost coin found and celebrated",
    "Good shepherd leaving the ninety-nine",
    "Wheat and weeds growing together",
    "Yeast hidden in the dough rising",
    "Wedding banquet invitation rejected",
    "Faithful and wise steward managing house",
    "Two debtors and the forgiving moneylender"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.old,
  ...charadesData.new,
  ...charadesData.parables
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
    card.innerHTML = `<span class="card-emoji">📖</span><p>${p}</p>`;
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
