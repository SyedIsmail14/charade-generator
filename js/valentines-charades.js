// ============================================================
//  valentines-charades.js  –  Valentine's Charades Generator
// ============================================================

const charadesData = {
  kids: [
    "Making a Valentine's card",
    "Giving a heart-shaped sticker",
    "Sharing candy hearts with a friend",
    "Drawing a big red heart",
    "Decorating a Valentine's box",
    "Handing out Valentine's cards in class",
    "Wrapping a small Valentine's gift",
    "Cupid with bow and arrow",
    "Writing Be My Valentine on a card",
    "Cutting out paper hearts",
    "Painting hearts on a poster",
    "Putting stickers on Valentine's cards",
    "Sorting candy hearts by colour",
    "Making a friendship bracelet",
    "Giving a teacher a thank you card",
    "Decorating cupcakes with hearts",
    "Folding a paper heart card",
    "Choosing a card for best friend",
    "Tying a ribbon on a gift bag",
    "Drawing Cupid's wings"
  ],
  couples: [
    "Sharing one milkshake with two straws",
    "Couple finishing each other's sentences",
    "Remembering your anniversary just in time",
    "Slow dancing in the kitchen",
    "Couple arguing over the thermostat",
    "Falling asleep during a movie together",
    "Couple's inside joke nobody else gets",
    "Sharing earphones on a walk",
    "Couple matching outfits accidentally",
    "Holding hands across the table",
    "Cooking dinner together in the kitchen",
    "Couple doing a couples workout",
    "Texting goodnight every single night",
    "Couple planning a trip together",
    "Sharing dessert with one fork",
    "Couple laughing at an old photo",
    "Doing a jigsaw puzzle together",
    "Couple binge watching a show together",
    "Couple taking turns picking the playlist",
    "Couple cuddling on the sofa"
  ],
  romantic: [
    "Proposing on one knee with a ring",
    "Writing a heartfelt love letter",
    "Giving a bouquet of roses",
    "First date butterflies in stomach",
    "Romantic candlelit dinner",
    "Walking on the beach at sunset",
    "First kiss under the stars",
    "Serenading someone with a guitar",
    "Love at first sight across a room",
    "Long distance video call goodnight",
    "Writing initials inside a heart",
    "Slow dancing at a wedding",
    "Catching the bouquet at a wedding",
    "Whispering sweet nothings",
    "Star gazing together at night",
    "Surprising someone at the airport",
    "Writing a poem for someone special",
    "Sharing an umbrella in the rain",
    "Giving a promise ring",
    "Toasting with champagne glasses"
  ],
  funny: [
    "Awkward silence on a first date",
    "Accidentally calling partner wrong name",
    "Valentine's gift received with fake smile",
    "Proposal interrupted by something silly",
    "Swiping through a dating app nervously",
    "Texting then deleting then retexting",
    "Bad blind date small talk struggle",
    "Forgetting Valentine's Day completely",
    "Overthinking a text message reply",
    "Third wheeling on a couple's date",
    "Romeo and Juliet balcony scene",
    "Titanic ship bow scene pose",
    "The Notebook rain kiss scene",
    "Casablanca airport farewell scene",
    "Bringing flowers to the wrong house",
    "Spilling wine on a first date",
    "Getting caught talking about your ex",
    "Realising you both wore the same outfit",
    "Running late to your own proposal",
    "Forgetting your reservation at restaurant"
  ]
};

charadesData.all = [
  ...charadesData.kids,
  ...charadesData.couples,
  ...charadesData.romantic,
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
    card.innerHTML = `<span class="card-emoji">❤️</span><p>${p}</p>`;
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
