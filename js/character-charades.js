/* =====================================================
   CHARACTER CHARADES
   Famous fictional & cartoon characters
   ===================================================== */

const CHARADES = [
"Luke Skywalker","Darth Vader","Princess Leia","Han Solo","Yoda","Obi Wan Kenobi","Anakin Skywalker","Rey","Kylo Ren","Finn","Poe Dameron","Chewbacca","R2 D2","C 3PO","BB 8","Lando Calrissian","Padme Amidala","Mace Windu","Qui Gon Jinn","Count Dooku","General Grievous","Boba Fett","Jango Fett","Ahsoka Tano","Emperor Palpatine","Tony Stark","Steve Rogers","Thor Odinson","Bruce Banner","Natasha Romanoff","Clint Barton","Peter Parker","Stephen Strange","Wanda Maximoff","Vision","Sam Wilson","Bucky Barnes","T Challa","Shuri","Okoye","Nick Fury","Phil Coulson","Pepper Potts","James Rhodes","Scott Lang","Hope Van Dyne","Carol Danvers","Peter Quill","Gamora","Drax","Rocket Raccoon","Groot","Mantis","Nebula","Thanos","Loki","Hela","Ultron","Red Skull","Winter Soldier","Falcon","War Machine","Hawkeye","Black Widow","Scarlet Witch","Quicksilver","Agent Carter","Sharon Carter","Maria Hill","Heimdall","Valkyrie","Korg","Wong","Ancient One","Mordo","Christine Palmer","Jane Foster","Darcy Lewis","Erik Selvig","Happy Hogan","Aunt May","Uncle Ben","Mary Jane","Gwen Stacy","Green Goblin","Doctor Octopus","Venom","Sandman","Electro","Vulture","Mysterio","Thaddeus Ross","Betty Ross","Abomination","Red Hulk","She Hulk","Moon Knight","Daredevil","Punisher","Jessica Jones","Luke Cage","Iron Fist","Elektra Natchios","Foggy Nelson","Karen Page","Wilson Fisk","Bullseye","Bruce Wayne","Clark Kent","Diana Prince","Barry Allen","Arthur Curry","Hal Jordan","Oliver Queen","Kara Zor El","Victor Stone","Billy Batson","John Constantine","Alfred Pennyworth","Commissioner Gordon","Robin","Nightwing","Red Hood","Batgirl","Catwoman","Harley Quinn","Joker","Riddler","Penguin","Two Face","Scarecrow","Bane","Ra's al Ghul","Poison Ivy","Mr Freeze","Clayface","Killer Croc","Lex Luthor","Brainiac","Doomsday","General Zod","Darkseid","Steppenwolf","Ares","Cheetah","Black Manta","Ocean Master","Sinestro","Atrocitus","Reverse Flash","Zoom","Captain Cold","Heat Wave","Deathstroke","Amanda Waller","Rick Flag","Deadshot","El Diablo","Killer Croc","Enchantress","Katana","Boomerang","King Shark","Polka Dot Man","Peacemaker","Bloodsport","Ratcatcher","John Wick","Ethan Hunt","James Bond","Jason Bourne","John McClane","Martin Riggs","Roger Murtaff","Axel Foley","Maverick","Goose","Iceman","Viper","Rooster","Hangman","Phoenix","Bob","Dominic Toretto","Brian O'Conner","Letty Ortiz","Mia Toretto","Roman Pearce","Tej Parker","Ramsey","Luke Hobbs","Deckard Shaw","Owen Shaw","Cipher","Jakob Toretto","Han Seoul Oh","Gisele Yashar","Leon","Vince","Jesse","Suki","Sean Boswell","Twinkie"
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
