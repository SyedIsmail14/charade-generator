// ============================================================
//  emoji-charades.js  –  Emoji Charades Generator
// ============================================================

const charadesData = {
  easy: [
    "😂 Crying laughing uncontrollably",
    "😭 Sobbing dramatically and loudly",
    "😱 Screaming in absolute horror",
    "🤔 Deep thinking with chin rub",
    "😴 Sleeping peacefully and snoring",
    "🤤 Drooling over amazing food",
    "😍 Heart eyes completely in love",
    "🤢 Feeling very sick and nauseous",
    "😡 Furiously angry red face",
    "🥳 Party celebration explosion of joy",
    "😎 Cool and confident sunglasses face",
    "🥺 Puppy dog eyes begging please",
    "😤 Steaming with frustration",
    "🤩 Star-struck dazzled by something",
    "😬 Grimacing awkward nervous face",
    "🫠 Slowly melting away completely",
    "🙃 Upside down sarcastic smile",
    "😶 Completely speechless and silent",
    "🥴 Woozy and dizzy spinning face",
    "😏 Smug knowing smirk face"
  ],
  action: [
    "💪 Flexing the biggest possible muscles",
    "🤦 Slow and dramatic facepalm",
    "🤷 Total clueless shrug both hands",
    "👋 Very enthusiastic waving goodbye",
    "🙌 Celebrating with both hands raised",
    "🤞 Fingers crossed hoping desperately",
    "👏 Slow sarcastic clapping",
    "🧘 Meditating in perfect peaceful calm",
    "🕺 Confident disco dancing",
    "💃 Elegant salsa dancing",
    "🤸 Doing a cartwheel energetically",
    "🏋️ Lifting very heavy weights",
    "🤾 Throwing ball in sport",
    "🧗 Rock climbing carefully",
    "🤼 Wrestling someone dramatically",
    "👊 Punching the air in victory",
    "🫶 Heart hands gesture",
    "🤌 Italian chef's kiss perfection",
    "🫵 Pointing directly at someone",
    "🙏 Hands together in prayer or thanks"
  ],
  combo: [
    "😴💤 Falling asleep mid-conversation",
    "😂💀 Dying of laughter completely",
    "🤔💡 Thinking hard then sudden idea",
    "😱🏃 Screaming then running away fast",
    "🍕❤️ Deeply in love with pizza",
    "😭📱 Crying over completely broken phone",
    "💪🪞 Flexing proudly in front of mirror",
    "🤦😤 Facepalm then frustration building",
    "🎉🥳 Party explosion of total joy",
    "😴☕ Waking up desperately needing coffee",
    "🤩👀 Star-struck then wide-eyed staring",
    "😤🚪 Frustrated then storming out door",
    "🧘😤 Trying to meditate then getting angry",
    "😎🕶️ Being cool then posing with sunglasses",
    "🤢😷 Feeling sick then putting on mask",
    "😍🍔 Heart eyes seeing a perfect burger",
    "😱💸 Shocked at the price of something",
    "🥳🎂 Party face then cutting birthday cake",
    "😶🫠 Speechless then melting away",
    "🤞🙏 Fingers crossed then praying hopefully"
  ],
  story: [
    "🚶🌧️😱 Walking, caught in rain, totally shocked",
    "😴⏰😤 Sleeping, alarm rings, waking up furious",
    "🏃🍕😂 Running for last pizza, getting there laughing",
    "📚😴💤 Studying hard, getting drowsy, falling asleep",
    "🎂🕯️😄 Birthday cake arrives, candles lit, pure joy",
    "📱😡💥 Phone dies at 1 percent, furious, smashes it",
    "🏋️💪🪞 Working out hard, flexing muscles, mirror pose",
    "🌮🤤😋 Seeing tacos, drooling, eating deliciously",
    "👻😱🏃 Ghost appears suddenly, scream, run away fast",
    "☕😴😊 Make coffee, drink it, wake up happily",
    "🎁😭😍 Open gift, disappointed, then heart eyes",
    "🐝💪🤕 Bee stings you, try to be brave, it really hurts",
    "🌧️🌈😍 Rain falls, rainbow appears, fall in love with it",
    "📸😳🙈 Take selfie, see result, hide in embarrassment",
    "🛒😎💸 Shopping confidently, buying everything, broke",
    "🎤😱😂 Take microphone, terrified, then laughing",
    "🏖️😎🦈 Beach day, relaxing, then shark spotted",
    "💤😤☕ Deep sleep, rude awakening, need coffee now",
    "🤸😬💥 Try a cartwheel, nervous, then crash landing",
    "🎯😤💪 Aim at target, focused, then hit it perfectly"
  ]
};

charadesData.all = [
  ...charadesData.easy,
  ...charadesData.action,
  ...charadesData.combo,
  ...charadesData.story
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
    card.innerHTML = `<span class="card-emoji">😀</span><p>${p}</p>`;
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
