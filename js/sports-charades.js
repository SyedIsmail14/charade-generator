// ============================================================
//  sports-charades.js  –  Sports Charades Generator
// ============================================================

const charadesData = {
  easy: [
    "Kicking a football into goal",
    "Hitting a cricket six over boundary",
    "Shooting a basketball into hoop",
    "Swimming freestyle in a pool",
    "Running a sprint race",
    "Serving a tennis ball",
    "Jumping rope very fast",
    "Doing a forward roll",
    "Riding a bicycle uphill",
    "Throwing a javelin",
    "Catching a cricket ball",
    "Heading a football",
    "Doing a cartwheel",
    "High five after scoring",
    "Warming up by stretching",
    "Dribbling a basketball",
    "Batting in cricket",
    "Doing star jumps",
    "Throwing a ball underarm",
    "Skipping across finish line"
  ],
  team: [
    "Goalkeeper diving for penalty",
    "Cricket bowler full run-up",
    "Rugby player breaking through tackles",
    "Basketball slam dunk celebration",
    "Volleyball spike at the net",
    "Hockey player dribbling fast",
    "American football quarterback throw",
    "Water polo player treading water",
    "Rowing team in perfect sync",
    "Tug of war team pulling hard",
    "Cricket fielder taking a catch",
    "Football free kick curling round wall",
    "Basketball player triple threat stance",
    "Rugby lineout throw and lift",
    "Football team celebrating a goal",
    "Cricket wicketkeeper taking stumping",
    "Basketball fast break play",
    "Kabaddi player raiding and retreating",
    "Hockey penalty corner drag flick",
    "Handball player shooting at goal"
  ],
  solo: [
    "Boxer skipping rope fast",
    "Gymnast on balance beam wobbling",
    "Golfer watching ball roll into bunker",
    "Tennis player disputing a line call",
    "Long jump athlete landing in sand pit",
    "Weightlifter failing to lift bar",
    "Swimmer diving off starting block",
    "Pole vaulter clearing the bar",
    "Cyclist climbing a steep mountain",
    "Marathon runner hitting the wall",
    "Diver entering water with no splash",
    "High jumper doing Fosbury flop",
    "Discus thrower spinning and releasing",
    "Triple jumper hop step and jump",
    "Sprinter crossing finish line",
    "Wrestler going for a submission hold",
    "Fencer lunging with épée",
    "Archer drawing bow and releasing",
    "Judo throw lifting opponent overhead",
    "Boxer throwing combination punches"
  ],
  extreme: [
    "Skydiver free falling from plane",
    "Surfer riding a giant wave",
    "Skateboarder landing a big trick",
    "Rock climber reaching the summit",
    "Bungee jumper at the edge hesitating",
    "Snowboarder hitting a half pipe",
    "Parkour athlete jumping between rooftops",
    "Base jumper leaping off a cliff",
    "Motocross rider catching big air",
    "Kitesurfer pulled hard by the wind",
    "BMX rider doing backflip",
    "Wingsuit flyer gliding through mountains",
    "Ice climber hammering ice axe",
    "Whitewater kayaker in rapids",
    "Cliff diver leaping from high rock",
    "Free solo climber with no rope",
    "Zorbing rolling down a hill",
    "Slacklining between two trees",
    "Wakeboarding behind a speedboat",
    "Paraglider launching off mountain"
  ]
};

charadesData.all = [
  ...charadesData.easy,
  ...charadesData.team,
  ...charadesData.solo,
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
    card.innerHTML = `<span class="card-emoji">⚽</span><p>${p}</p>`;
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
