/* =====================================================
   FUNNY REAL-LIFE CHARADES
   Example: "Walk like an Egyptian"
   ===================================================== */

/* VERBS */
const VERBS = [
  "Walk","Run","Dance","Eat","Sleep","Laugh","Cry","Jump",
  "Clap","Wave","Tiptoe","Crawl","March","Stretch","Yawn",
  "Sneak","Hide","Search","Think","Celebrate","Panic",
  "Freeze","Shake","Balance","Listen","Wait","Play"
];

/* STYLES */
const STYLES = [
  "like an Grandpaa",
  "like a sleepy baby",
  "like a scared cat",
  "like a happy dog",
  "like you are late",
  "like it is too hot",
  "like it is too cold",
  "like a robot",
  "like a monkey",
  "like a penguin",
  "like an old person",
  "like a confused man",
  "like you won a prize",
  "like you lost something",
  "like a dancing chicken",
  "like a proud winner"
];

/* BUILD CHARADES */
let CHARADES = [];
for (let v of VERBS) {
  for (let s of STYLES) {
    CHARADES.push(`${v} ${s}`);
  }
}

/* SHUFFLE ONCE */
CHARADES.sort(() => Math.random() - 0.5);

/* STATE */
let currentCount = 1;

/* MENU */
function toggleMenu() {
  document.getElementById("navMobile").classList.toggle("open");
}

/* COUNT */
function setCount(n) {
  currentCount = n;
  generate();
}

function showCustom() {
  document.getElementById("customBox").classList.remove("hidden");
}

function applyCustom() {
  let n = parseInt(document.getElementById("customInput").value);
  if (isNaN(n) || n < 1) return;
  if (n > 12) n = 12;
  currentCount = n;
  generate();
}

/* GENERATE */
function generate() {
  const box = document.getElementById("cards");
  const status = document.getElementById("statusText");

  box.innerHTML = "";

  for (let i = 0; i < currentCount; i++) {
    const charade = CHARADES[Math.floor(Math.random() * CHARADES.length)];
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = charade;
    box.appendChild(div);
  }

  status.innerText =
    currentCount === 1
      ? "Ready to play! New charade"
      : `Ready to play! ${currentCount} new charades`;
}

/* COPY */
function copyCharades() {
  const btn = document.getElementById("copyBtn");
  const text = [...document.querySelectorAll(".card")]
    .map(c => c.textContent)
    .join(", ");

  navigator.clipboard.writeText(text);
  btn.innerText = "Copied";

  setTimeout(() => {
    btn.innerText = "Copy charades";
  }, 4000);
}

/* FULL SCREEN */
function toggleFullScreen() {
  const elem = document.getElementById("gameArea");

  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

/* INIT */
generate();

