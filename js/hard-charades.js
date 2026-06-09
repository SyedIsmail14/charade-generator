// ============================================================
//  hard-charades.js  –  Hard Charades Generator
// ============================================================

const charadesData = {
  medium: [
    "Solar eclipse",
    "Photosynthesis",
    "Stock market crash",
    "Moon landing",
    "Industrial Revolution",
    "Archaeological excavation",
    "Virtual reality",
    "Artificial intelligence",
    "Cold War standoff",
    "Déjà vu",
    "Karma",
    "Serendipity",
    "Epiphany",
    "Satire",
    "Film noir",
    "Jazz improvisation",
    "Impressionism painting",
    "Method acting",
    "Blockchain",
    "Cloud storage"
  ],
  hard: [
    "Cognitive dissonance",
    "Existential crisis",
    "Bioluminescence",
    "Tectonic plate movement",
    "Gravitational wave",
    "Nuclear fission",
    "Magnetic field",
    "Entropy",
    "Zeitgeist",
    "Schadenfreude",
    "Ambivalence",
    "Osmosis",
    "Berlin Wall falling",
    "French Revolution guillotine",
    "Treaty signing ceremony",
    "Economic sanctions",
    "Constitutional amendment",
    "Surrealism dream",
    "Literary symbolism",
    "Renaissance sculpture",
    "Greek tragedy",
    "Propaganda poster",
    "Neural network learning",
    "Cybersecurity breach",
    "Data encryption",
    "Autonomous vehicle",
    "Nihilism",
    "Utilitarianism",
    "Stoicism under pressure",
    "Absurdism"
  ],
  expert: [
    "Quantum entanglement",
    "Black hole event horizon",
    "Electromagnetic spectrum",
    "Mitosis cell division",
    "Parallel computing",
    "Machine learning model",
    "Quantum computing",
    "Plato's cave allegory",
    "Socratic method",
    "Moral relativism",
    "Solipsism",
    "Dialectical thinking",
    "Epistemology",
    "Consciousness",
    "Abstract expressionism",
    "Avant-garde performance",
    "Siege warfare",
    "Colonisation",
    "Subconscious mind",
    "Paradox"
  ],
  genius: [
    "Quantum superposition",
    "Schrödinger's cat thought experiment",
    "Heisenberg uncertainty principle",
    "String theory vibrating dimensions",
    "Dark matter gravitational pull",
    "Higgs boson particle discovery",
    "Butterfly effect in chaos theory",
    "Gödel's incompleteness theorem",
    "Ship of Theseus philosophical paradox",
    "Trolley problem moral dilemma",
    "Prisoner's dilemma game theory",
    "Pascal's wager on belief",
    "Zeno's paradox of motion",
    "Existential phenomenology",
    "Transcendental idealism",
    "Dialectical materialism",
    "Panopticon surveillance theory",
    "Dunning-Kruger effect",
    "Cognitive behavioural loop",
    "Metacognition thinking about thinking"
  ]
};

charadesData.all = [
  ...charadesData.medium,
  ...charadesData.hard,
  ...charadesData.expert,
  ...charadesData.genius
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
    card.innerHTML = `<span class="card-emoji">🧠</span><p>${p}</p>`;
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
