/* =====================================================
   REVERSE CHARADES
   Group acts, one person guesses
   ===================================================== */

const CHARADES = [
  "Making Sandwich",
  "Brushing Teeth",
  "Playing Football",
  "Opening Umbrella",
  "Washing Hands",
  "Riding Bicycle",
  "Flying Kite",
  "Catching Ball",
  "Cooking Dinner",
  "Cleaning Room",
  "Taking Selfie",
  "Dancing Together",
  "Celebrating Birthday",
  "Packing Bag",
  "Searching Phone",
  "Watching Movie",
  "Building Tower",
  "Reading Book",
  "Painting Wall",
  "Shopping Groceries"
];

/* SHUFFLE */
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
