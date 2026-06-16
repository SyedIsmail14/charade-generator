// ============================================================
//  bollywood-charades.js  –  Bollywood Charades Generator
// ============================================================

const charadesData = {
  classic: [
    "Sholay – Gabbar Singh asking kitne aadmi the",
    "DDLJ – train running through mustard fields",
    "Mughal-e-Azam – royal court drama",
    "Mother India – farming woman carrying heavy load",
    "Awaara – Charlie Chaplin style wandering hero",
    "Pyaasa – suffering poet reciting anguished verse",
    "Deewar – angry young man of the streets",
    "Sholay – Jai and Veeru riding motorcycle together",
    "Kuch Kuch Hota Hai – heartbreak at college",
    "Hum Aapke Hain Koun – family wedding celebrations",
    "Dilwale Dulhania Le Jayenge – Raj extending hand from train",
    "Raja Hindustani – poor taxi driver falling in love",
    "Kabhi Khushi Kabhie Gham – airport reunion scene",
    "Border – soldiers defending country at Longewala",
    "Lagaan – Bhuvan challenging British to cricket",
    "Devdas – heartbroken man drinking in pain",
    "Naya Daur – tonga race against motorcar",
    "Do Bigha Zameen – farmer walking to city for work",
    "Seeta Aur Geeta – twin sisters switch lives",
    "Amar Akbar Anthony – three brothers reuniting"
  ],
  modern: [
    "3 Idiots – Aal Izz Well chest tapping gesture",
    "Dangal – Geeta Phogat winning gold medal wrestling",
    "PK – alien confused by all Earth customs",
    "Dil Chahta Hai – three friends road trip to Goa",
    "Taare Zameen Par – dyslexic child painting masterpiece",
    "Zindagi Na Milegi Dobara – friends skydiving in Spain",
    "Bajrangi Bhaijaan – crossing India-Pakistan border secretly",
    "Pathaan – SRK action spy hero comeback",
    "RRR – massive river rescue action sequence",
    "KGF Chapter 2 – Rocky's powerful villain entry",
    "Gully Boy – Mumbai rapper rising from slum",
    "Udta Punjab – rock star addiction crisis",
    "Andhadhun – blind pianist hiding dark secret",
    "Article 15 – IPS officer fighting caste discrimination",
    "Super 30 – mathematician teaching poor students IIT",
    "Mission Mangal – ISRO scientists launching Mars mission",
    "Shershaah – Kargil War hero Captain Vikram Batra",
    "83 – Kapil Dev lifting World Cup trophy 1983",
    "The Kashmir Files – emotional historical drama",
    "Brahmastra – superhero couple with cosmic powers"
  ],
  dance: [
    "Hrithik Roshan – robotic snake arm wave move",
    "Shah Rukh Khan – signature wide arms open romantic pose",
    "Madhuri Dixit – Dola Re graceful expression and footwork",
    "Govinda – rapid nonstop hip shimmy dance",
    "Prabhu Deva – super fast intricate footwork",
    "Katrina Kaif – Sheila Ki Jawani shimmy sequence",
    "Ranveer Singh – wild energetic freestyle performance",
    "Deepika Padukone – Nagada Sang Dhol spinning",
    "Salman Khan – Jumme Ki Raat hip moves",
    "Alia Bhatt – Ghagra dance steps flowing",
    "Shamshera – Ranbir Kapoor tribal battle dance",
    "Balam Pichkari – Holi dance celebration",
    "Chaiyya Chaiyya – train roof dance iconic",
    "Dola Re Dola – classical expression contest",
    "Dhoom Taana – energetic group number",
    "Nagada Sang Dhol – Ram Leela festive dance",
    "Deewani Mastani – royal court performance",
    "Ghoomar – Padmaavat traditional Rajasthani dance",
    "Kalank Nahi – devotional dance performance",
    "Srivalli – Pushpa flower song dance"
  ],
  scene: [
    "DDLJ – Raj hand from moving train to Simran",
    "Sholay – Gabbar Singh villain dramatic entry",
    "3 Idiots – Rancho graduation speech revelation",
    "Mughal-e-Azam – Salim and Anarkali tragic love",
    "Lagaan – Bhuvan hitting final six to win match",
    "Dangal – Geeta Phogat gold medal on podium",
    "Bahubali – Amarendra Bahubali grand entry Mahishmati",
    "KGF – Rocky first power entry mines",
    "Taare Zameen Par – Nikumbh recognising Ishaan's talent",
    "PK – final revelation on live television",
    "Kuch Kuch Hota Hai – Anjali running to find Rahul",
    "Dil Chahta Hai – Akash realising he loves Shalini",
    "Zindagi Na Milegi Dobara – Arjun choosing life over fear",
    "Bajrangi Bhaijaan – Munni crossing into Pakistan",
    "Mother India – mother shooting her own son",
    "Devdas – final collapse outside Paro's door",
    "3 Idiots – Raju jumping from building scene",
    "Dangal – Mahavir telling daughters they are his sons",
    "Sholay – Thakur confronting Gabbar final scene",
    "RRR – Bheem and Ram reunion best friends embrace"
  ]
};

charadesData.all = [
  ...charadesData.classic,
  ...charadesData.modern,
  ...charadesData.dance,
  ...charadesData.scene
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
    card.innerHTML = `<span class="card-emoji">🎥</span><p>${p}</p>`;
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
