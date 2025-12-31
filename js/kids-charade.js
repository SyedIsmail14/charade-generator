/* =====================================================
   KIDS CHARADES – TWO WORD, SAFE & FUN
   Examples: "Jumping Frog", "Sleeping Baby"
   ===================================================== */

/* KID ACTIONS */
const ACTIONS = [
  "Jumping","Running","Dancing","Clapping","Waving","Hopping",
  "Skipping","Crawling","Marching","Spinning","Stretching",
  "Yawning","Laughing","Sleeping","Tiptoeing","Balancing",
  "Flying","Swimming","Rolling","Playing"
];

/* KID NOUNS */
const NOUNS = [
  "Baby","Puppy","Kitten","Frog","Monkey","Elephant","Lion",
  "Penguin","Bird","Butterfly","Dinosaur","Robot","Superhero",
  "Princess","Pirate","Clown","Bear","Cat","Dog","Duck"
];

/* BUILD CHARADES */
let CHARADES = [];
for (let a of ACTIONS) {
  for (let n of NOUNS) {
    CHARADES.push(`${a} ${n}`);
  }
}

/* SHUFFLE */
CHARADES.sort(() => Math.random() - 0.5);

/* STATE */
let currentCount = 1;

/* MOBILE MENU */
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
