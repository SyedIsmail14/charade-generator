/* =====================================================
   MOVIE CHARADES – MOVIE NAME BASED
   ===================================================== */

/* MOVIE LIST (SAFE, TEXT ONLY) */
const CHARADES = [
  "Titanic","Avatar","Inception","The Lion King","Jurassic Park","The Avengers","Spider Man","Batman Begins","Harry Potter","Home Alone","Frozen","Toy Story","Finding Nemo","Jumanji","Kung Fu Panda","Pirates of the Caribbean","The Matrix","Iron Man","Black Panther","Jurassic World","Minions","Coco","Up","Aladdin","The Jungle Book","Zootopia","Shrek","Madagascar","Despicable Me","Doctor Strange","Star Wars","E.T.","Jaws","The Godfather","Forrest Gump","The Dark Knight","Gladiator","The Wizard of Oz","Gone with the Wind","Casablanca","Citizen Kane","Pulp Fiction","Schindler's List","The Shawshank Redemption","Fight Club","Goodfellas","The Silence of the Lambs","Saving Private Ryan","Braveheart","The Green Mile","Rocky","Raiders of the Lost Ark","Back to the Future","Ghostbusters","Terminator","Alien","Predator","Die Hard","Lethal Weapon","Beverly Hills Cop","Top Gun","Mission Impossible","James Bond","Indiana Jones","Transformers","Fast and Furious","Jurassic Park III","King Kong","Godzilla","Pacific Rim","Independence Day","Men in Black","Interstellar","Gravity","The Martian","Apollo 13","Armageddon","Deep Impact","2012","The Day After Tomorrow","Twister","Volcano","Dante's Peak","Earthquake","San Andreas","Pompeii","Troy","300","Ben Hur","Cleopatra","Spartacus","Alexander","The Ten Commandments","The Prince of Egypt","Noah","Exodus","Moses","The Passion of the Christ","The Chronicles of Narnia","Lord of the Rings","The Hobbit","Percy Jackson","Clash of the Titans","Wrath of the Titans","Immortals","Hercules","Thor","Wonder Woman","Superman","Man of Steel","Justice League","Suicide Squad","Aquaman","Shazam","Captain Marvel","Captain America","Guardians of the Galaxy","Ant Man","Deadpool","Wolverine","X Men","Fantastic Four","The Incredible Hulk","Venom","Morbius","Ghost Rider","Daredevil","Elektra","The Punisher","Blade","Hellboy","Constantine","V for Vendetta","Watchmen","Sin City","300 Rise of an Empire","Immortals","The Expendables","Rambo","Commando","Predator 2","Alien vs Predator","Total Recall","RoboCop","Judge Dredd","Demolition Man","The Fifth Element","Blade Runner","Mad Max","Waterworld","The Postman","I Am Legend","World War Z","Zombieland","The Walking Dead","28 Days Later","Dawn of the Dead","Night of the Living Dead","Resident Evil","Silent Hill","The Ring","The Grudge","The Exorcist","The Omen","Rosemary's Baby","Carrie","The Shining","Poltergeist","A Nightmare on Elm Street","Friday the 13th","Halloween","Scream","Saw","The Conjuring","Insidious","Sinister","Paranormal Activity","The Blair Witch Project","Cloverfield","Get Out","Us","A Quiet Place","Bird Box","Don't Breathe","The Purge","Escape Room","Ready or Not","Midsommar","Hereditary","It","It Chapter Two","Pet Sematary","The Mist","Carrie","Misery"];

/* SHUFFLE */
CHARADES.sort(() => Math.random() - 0.5);

/* STATE */
let currentCount = 3;
let usedMovies = [];

/* UNIQUE GENERATION */
function getRandomMovie() {
  let movie;
  let attempts = 0;

  do {
    movie = MOVIES[Math.floor(Math.random() * MOVIES.length)];
    attempts++;
  } while (usedMovies.includes(movie) && attempts < 10);

  usedMovies.push(movie);
  return movie;
}

/* GENERATE */
function generate() {
  const box = document.getElementById("cards");
  const status = document.getElementById("statusText");

  box.innerHTML = "";

  for (let i = 0; i < currentCount; i++) {
    const div = document.createElement("div");
    div.className = "card fade-in";
    div.textContent = getRandomMovie();
    box.appendChild(div);
  }

  status.innerText = `${currentCount} movie charades ready 🎬`;
}

/* COUNT */
function setCount(n) {
  currentCount = n;
  usedMovies = [];
  generate();
}

/* CUSTOM */
function showCustom() {
  document.getElementById("customBox").classList.remove("hidden");
}

function applyCustom() {
  let n = parseInt(document.getElementById("customInput").value);

  if (isNaN(n) || n < 1) n = 1;
  if (n > 12) n = 12;

  currentCount = n;
  usedMovies = [];
  generate();
}

/* COPY */
function copyCharades() {
  const text = [...document.querySelectorAll(".card")]
    .map(c => c.textContent)
    .join(", ");

  navigator.clipboard.writeText(text);

  const msg = document.getElementById("copyMsg");
  if (msg) {
    msg.style.display = "inline";
    setTimeout(() => msg.style.display = "none", 1500);
  }
}

/* FULLSCREEN */
function toggleFullScreen() {
  const elem = document.getElementById("gameArea");

  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

/* MENU */
function toggleMenu() {
  document.getElementById("navMobile").classList.toggle("open");
}

/* INIT */
document.addEventListener("DOMContentLoaded", generate);
💥
