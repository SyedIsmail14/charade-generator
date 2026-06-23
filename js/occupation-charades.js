// ============================================================
//  occupation-charades.js  –  Occupation Charades Generator
// ============================================================

const charadesData = {
  kids: [
    "Firefighter spraying a hose",
    "Police officer directing traffic",
    "Postman delivering letters",
    "Teacher writing on the board",
    "Librarian stamping a book",
    "Bus driver steering carefully",
    "Crossing guard stopping traffic",
    "Garbage collector lifting bins",
    "Lifeguard watching the pool",
    "Farmer milking a cow",
    "Chef cooking in a big pot",
    "Hairdresser cutting hair carefully",
    "Waiter carrying a tray of food",
    "Cashier scanning groceries",
    "Construction worker wearing hard hat",
    "Baker kneading bread dough",
    "Vet checking a puppy's paw",
    "Pilot flying a toy plane",
    "Astronaut floating in space",
    "Zookeeper feeding the animals"
  ],
  medical: [
    "Doctor checking heartbeat with stethoscope",
    "Nurse taking blood pressure",
    "Dentist looking inside a mouth",
    "Surgeon performing careful operation",
    "Veterinarian examining a dog",
    "Paramedic rushing with a stretcher",
    "Pharmacist counting out pills",
    "Optician testing eyesight",
    "Physiotherapist stretching a leg",
    "X-ray technician positioning patient",
    "Midwife helping deliver a baby",
    "Psychiatrist listening attentively",
    "Radiologist examining a scan",
    "Anaesthesiologist administering medicine",
    "Dermatologist examining skin closely",
    "Orthodontist fitting braces",
    "Speech therapist guiding pronunciation",
    "Occupational therapist helping recovery",
    "Lab technician examining samples",
    "Ambulance driver rushing to scene"
  ],
  creative: [
    "Painter creating a masterpiece",
    "Musician playing the violin",
    "Photographer adjusting camera lens",
    "Writer typing furiously at desk",
    "Dancer performing graceful leap",
    "Fashion designer sketching outfit",
    "Sculptor chiselling marble carefully",
    "Film director shouting action",
    "Architect drawing building plans",
    "Chef plating food artistically",
    "Singer performing on stage",
    "Animator drawing frame by frame",
    "Graphic designer working on computer",
    "Poet reciting verses passionately",
    "Comedian telling jokes on stage",
    "Tattoo artist drawing carefully",
    "Interior designer arranging furniture",
    "Jewellery maker crafting a ring",
    "Make-up artist applying foundation",
    "Voice actor recording in studio"
  ],
  trades: [
    "Electrician fixing a wire",
    "Plumber unclogging a pipe",
    "Carpenter sawing a plank",
    "Mechanic fixing a car engine",
    "Builder laying bricks",
    "Welder joining metal pieces",
    "Painter decorating a wall",
    "Roofer climbing onto a roof",
    "Locksmith picking a lock",
    "Tailor measuring fabric",
    "Blacksmith hammering hot metal",
    "Glazier installing a window",
    "Bricklayer mixing cement",
    "HVAC technician fixing air conditioning",
    "Landscaper mowing the lawn",
    "Mason cutting stone carefully",
    "Upholsterer reupholstering a sofa",
    "Shoemaker repairing a shoe",
    "Cobbler hammering a heel",
    "Auto body repairer fixing a dent"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.medical,
  ...charadesData.creative,
  ...charadesData.trades
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
    card.innerHTML = `<span class="card-emoji">👨‍⚕️</span><p>${p}</p>`;
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
