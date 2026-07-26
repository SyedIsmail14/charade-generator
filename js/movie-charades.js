// ============================================================
//  movie-charades.js  –  Movie Charades Generator
//  Includes: 30-sec game timer, round picker (1/2/3),
//            TIME'S UP overlay, auto-start on generate
// ============================================================

/* =====================================================
   MOVIE CHARADES – MOVIE NAME BASED
   ===================================================== */

/* MOVIE LIST (SAFE, TEXT ONLY) */
const MOVIES = [
  "Titanic","Avatar","Inception","The Lion King","Jurassic Park","The Avengers","Spider Man","Batman Begins","Harry Potter","Home Alone","Frozen","Toy Story","Finding Nemo","Jumanji","Kung Fu Panda","Pirates of the Caribbean","The Matrix","Iron Man","Black Panther","Jurassic World","Minions","Coco","Up","Aladdin","The Jungle Book","Zootopia","Shrek","Madagascar","Despicable Me","Doctor Strange","Star Wars","E.T.","Jaws","The Godfather","Forrest Gump","The Dark Knight","Gladiator","The Wizard of Oz","Gone with the Wind","Casablanca","Citizen Kane","Pulp Fiction","Schindler's List","The Shawshank Redemption","Fight Club","Goodfellas","The Silence of the Lambs","Saving Private Ryan","Braveheart","The Green Mile","Rocky","Raiders of the Lost Ark","Back to the Future","Ghostbusters","Terminator","Alien","Predator","Die Hard","Lethal Weapon","Beverly Hills Cop","Top Gun","Mission Impossible","James Bond","Indiana Jones","Transformers","Fast and Furious","Jurassic Park III","King Kong","Godzilla","Pacific Rim","Independence Day","Men in Black","Interstellar","Gravity","The Martian","Apollo 13","Armageddon","Deep Impact","2012","The Day After Tomorrow","Twister","Volcano","Dante's Peak","Earthquake","San Andreas","Pompeii","Troy","300","Ben Hur","Cleopatra","Spartacus","Alexander","The Ten Commandments","The Prince of Egypt","Noah","Exodus","Moses","The Passion of the Christ","The Chronicles of Narnia","Lord of the Rings","The Hobbit","Percy Jackson","Clash of the Titans","Wrath of the Titans","Immortals","Hercules","Thor","Wonder Woman","Superman","Man of Steel","Justice League","Suicide Squad","Aquaman","Shazam","Captain Marvel","Captain America","Guardians of the Galaxy","Ant Man","Deadpool","Wolverine","X Men","Fantastic Four","The Incredible Hulk","Venom","Morbius","Ghost Rider","Daredevil","Elektra","The Punisher","Blade","Hellboy","Constantine","V for Vendetta","Watchmen","Sin City","300 Rise of an Empire","The Expendables","Rambo","Commando","Predator 2","Alien vs Predator","Total Recall","RoboCop","Judge Dredd","Demolition Man","The Fifth Element","Blade Runner","Mad Max","Waterworld","The Postman","I Am Legend","World War Z","Zombieland","The Walking Dead","28 Days Later","Dawn of the Dead","Night of the Living Dead","Resident Evil","Silent Hill","The Ring","The Grudge","The Exorcist","The Omen","Rosemary's Baby","Carrie","The Shining","Poltergeist","A Nightmare on Elm Street","Friday the 13th","Halloween","Scream","Saw","The Conjuring","Insidious","Sinister","Paranormal Activity","The Blair Witch Project","Cloverfield","Get Out","Us","A Quiet Place","Bird Box","Don't Breathe","The Purge","Escape Room","Ready or Not","Midsommar","Hereditary","It","It Chapter Two","Pet Sematary","The Mist","Misery"
];

// ── GAME STATE ────────────────────────────────────────────
let currentMode  = 'default';
let roundCount   = 1;
let currentCount = 1;
let usedMovies   = [];

// ── TIMER STATE ───────────────────────────────────────────
const TIMER_TOTAL = 30;
let timeLeft      = TIMER_TOTAL;
let timerInterval = null;
let timerRunning  = false;

// ── TIMER FUNCTIONS ───────────────────────────────────────
function drawTimer(seconds) {
  const radius = 44;
  const circ   = 2 * Math.PI * radius;
  const dash   = (seconds / TIMER_TOTAL) * circ;
  const colour = seconds > 15 ? '#40c057' : seconds > 8 ? '#f59f00' : '#fa5252';
  const el = document.getElementById('timerRing');
  if (!el) return;
  el.innerHTML = `
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r="${radius}" fill="none" stroke="#e9ecef" stroke-width="8"/>
      <circle cx="55" cy="55" r="${radius}" fill="none" stroke="${colour}" stroke-width="8"
        stroke-linecap="round"
        stroke-dasharray="${dash} ${circ}"
        stroke-dashoffset="0"
        transform="rotate(-90 55 55)"
        style="transition:stroke-dasharray .35s ease,stroke .35s"/>
      <text x="55" y="50" text-anchor="middle" font-size="26" font-weight="700"
        fill="${colour}" font-family="system-ui,sans-serif">${seconds}</text>
      <text x="55" y="68" text-anchor="middle" font-size="11" fill="#868e96"
        font-family="system-ui,sans-serif">sec</text>
    </svg>`;
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  updateTimerBtn();
  timerInterval = setInterval(() => {
    timeLeft--;
    drawTimer(timeLeft);
    if (timeLeft <= 0) timeUp();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  updateTimerBtn();
}

function resetTimer(autoStart) {
  clearInterval(timerInterval);
  timerRunning = false;
  timeLeft = TIMER_TOTAL;
  drawTimer(timeLeft);
  hideTimeOver();
  updateTimerBtn();
  if (autoStart) startTimer();
}

function timeUp() {
  pauseTimer();
  showTimeOver();
}

function updateTimerBtn() {
  const btn = document.getElementById('timerToggleBtn');
  if (btn) btn.textContent = timerRunning ? '⏸ Pause' : '▶ Start';
}

function showTimeOver() {
  const el = document.getElementById('timeOverOverlay');
  if (el) el.style.display = 'flex';
}

function hideTimeOver() {
  const el = document.getElementById('timeOverOverlay');
  if (el) el.style.display = 'none';
}

// ── MODE FILTER ────────────────────────────────────────────
function getFilteredMovies() {
  // Default mode returns ALL movies
  let filtered = MOVIES;

  if (currentMode === 'easy') {
    filtered = MOVIES.filter(m => 
      ['The Lion King','Titanic','Frozen','Home Alone','Toy Story','Shrek','Jurassic Park','The Avengers','Spider Man','Star Wars','E.T.','Jaws','Forrest Gump','The Godfather','Rocky','Back to the Future','Ghostbusters','Men in Black','Indiana Jones','Pirates of the Caribbean'].includes(m)
    );
  } else if (currentMode === 'kids') {
    filtered = MOVIES.filter(m => 
      ['The Lion King','Frozen','Toy Story','Finding Nemo','Jumanji','Kung Fu Panda','Minions','Coco','Up','Aladdin','The Jungle Book','Zootopia','Shrek','Madagascar','Despicable Me','The Incredibles','Moana','Encanto','Brave','Ratatouille'].includes(m)
    );
  } else if (currentMode === 'medium') {
    filtered = MOVIES.filter(m => 
      ['Inception','The Dark Knight','The Matrix','Gladiator','Pulp Fiction','Fight Club','The Shawshank Redemption','Goodfellas','The Silence of the Lambs','Saving Private Ryan','Braveheart','The Green Mile','Interstellar','Gravity','The Martian','Apollo 13','The Godfather','Casablanca'].includes(m)
    );
  } else if (currentMode === 'hard') {
    filtered = MOVIES.filter(m => 
      ['Citizen Kane','Gone with the Wind','Schindler\'s List','Rear Window','Some Like It Hot','Lawrence of Arabia','Ben-Hur','Sunset Boulevard','12 Angry Men','The Seventh Seal','8½','The Bicycle Thief','Rashomon','Seven Samurai','Tokyo Story','The Rules of the Game','The 400 Blows','Breathless','Persona','Stalker'].includes(m)
    );
  }
  // 'default' mode returns all movies (no filter)

  return filtered;
}

// ── ROUND PICKER ──────────────────────────────────────────
function setRound(n) {
  roundCount = n;
  currentCount = n;
  document.querySelectorAll('.round-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-round="${n}"]`);
  if (btn) btn.classList.add('active');
  generate();
}

// ── UNIQUE GENERATION ─────────────────────────────────────
function getRandomMovie() {
  const pool = getFilteredMovies();
  
  // If pool is empty, reset usedMovies and try again
  if (pool.length === 0) {
    usedMovies = [];
    return getRandomMovie();
  }
  
  // If all movies have been used, reset
  if (usedMovies.length >= pool.length) {
    usedMovies = [];
  }
  
  let movie;
  let attempts = 0;
  const maxAttempts = 50;

  do {
    movie = pool[Math.floor(Math.random() * pool.length)];
    attempts++;
  } while (usedMovies.includes(movie) && attempts < maxAttempts);

  usedMovies.push(movie);
  return movie;
}

// ── GENERATE ──────────────────────────────────────────────
function generate() {
  const box = document.getElementById("cards");
  const status = document.getElementById("statusText");
  if (!box) return;

  box.innerHTML = "";

  for (let i = 0; i < currentCount; i++) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<span class="card-emoji">🎬</span><p>${getRandomMovie()}</p>`;
    box.appendChild(div);
  }

  if (status) {
    status.textContent = `${currentCount} movie charades ready 🎬`;
  }

  resetTimer(true);
}

// ── MODE ───────────────────────────────────────────────────
function setMode(mode) {
  currentMode = mode;
  usedMovies = [];
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-mode="${mode}"]`);
  if (btn) btn.classList.add('active');
  generate();
}

// ── COUNT ──────────────────────────────────────────────────
function setCount(n) {
  currentCount = n;
  roundCount = n;
  document.querySelectorAll('.round-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-round="${n}"]`);
  if (btn) btn.classList.add('active');
  generate();
}

// ── CUSTOM ─────────────────────────────────────────────────
function showCustom() {
  document.getElementById('customBox').classList.remove('hidden');
}

function applyCustom() {
  let n = parseInt(document.getElementById('customInput').value);
  if (isNaN(n) || n < 1) n = 1;
  if (n > 12) n = 12;
  currentCount = n;
  roundCount = n;
  document.getElementById('customBox').classList.add('hidden');
  generate();
}

// ── COPY ──────────────────────────────────────────────────
function copyCharades() {
  const cards = document.querySelectorAll('#cards .card p');
  if (!cards.length) return;
  const text = Array.from(cards).map(c => c.textContent).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById('copyMsg');
    if (msg) { msg.style.display = 'inline'; setTimeout(() => msg.style.display = 'none', 2000); }
  });
}

// ── FULLSCREEN ────────────────────────────────────────────
function toggleFullScreen() {
  const elem = document.getElementById("gameArea");
  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// ── MENU ───────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById("navMobile").classList.toggle("open");
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  // Set default mode and round
  currentMode = 'default';
  roundCount = 1;
  currentCount = 1;
  
  // Activate the default mode button
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const defaultBtn = document.querySelector(`[data-mode="default"]`);
  if (defaultBtn) defaultBtn.classList.add('active');
  
  // Activate the round 1 button
  document.querySelectorAll('.round-btn').forEach(b => b.classList.remove('active'));
  const roundBtn = document.querySelector(`[data-round="1"]`);
  if (roundBtn) roundBtn.classList.add('active');
  
  drawTimer(TIMER_TOTAL);
  
  // Generate initial charades
  generate();
});
