/* =====================================================
   KIDS CHARADES – TWO WORD, SAFE & FUN
   Examples: "Jumping Frog", "Sleeping Baby"
   ===================================================== */

/* KID ACTIONS */
const ACTIONS = [
"Jumping","Running","Dancing","Clapping","Waving","Hopping","Skipping","Crawling","Marching","Spinning","Stretching","Yawning","Laughing","Sleeping","Tiptoeing","Balancing","Flying","Swimming","Rolling","Playing","Walking","Sitting","Standing","Kneeling","Bending","Twisting","Shaking","Nodding","Pointing","Throwing","Catching","Kicking","Pulling","Pushing","Lifting","Carrying","Hugging","Kissing","Whispering","Shouting","Singing","Humming","Whistling","Blowing","Breathing","Coughing","Sneezing","Eating","Drinking","Chewing","Swallowing","Smiling","Frowning","Crying","Blinking","Winking","Staring","Peeking","Hiding","Seeking","Finding","Climbing","Sliding","Swinging","Bouncing","Leaping","Tumbling","Cartwheeling","Somersaulting","Handstanding","Backflipping","Jogging","Sprinting","Dashing","Racing","Chasing","Escaping","Dodging","Ducking","Crouching","Squatting","Lunging","Stepping","Stomping","Tapping","Shuffling","Gliding","Floating","Drifting","Sinking","Diving","Splashing","Paddling","Rowing","Sailing","Surfing","Skiing","Skating","Sledding","Biking","Riding","Driving","Steering","Turning","Stopping","Starting","Pausing","Resting","Relaxing","Meditating","Thinking","Dreaming","Imagining","Creating","Building","Drawing","Painting","Writing","Reading","Studying","Learning","Teaching","Helping","Sharing","Giving","Receiving","Taking","Holding","Grabbing","Releasing","Dropping","Picking","Choosing","Deciding","Planning","Organizing","Arranging","Sorting","Counting","Measuring","Weighing","Comparing","Matching","Separating","Combining","Mixing","Stirring","Shaking","Pouring","Filling","Emptying","Opening","Closing","Locking","Unlocking"];

/* KID NOUNS */
const NOUNS = [
"Baby","Puppy","Kitten","Frog","Monkey","Elephant","Lion","Penguin","Bird","Butterfly","Dinosaur","Robot","Superhero","Princess","Pirate","Clown","Bear","Cat","Dog","Duck","Bunny","Tiger","Giraffe","Zebra","Panda","Koala","Kangaroo","Horse","Cow","Pig","Sheep","Goat","Chicken","Rooster","Turkey","Fish","Shark","Whale","Dolphin","Octopus","Crab","Turtle","Snail","Ladybug","Bee","Ant","Spider","Dragonfly","Owl","Eagle","Parrot","Swan","Peacock","Flamingo","Mouse","Rat","Squirrel","Hedgehog","Raccoon","Fox","Wolf","Deer","Moose","Camel","Hippo","Rhino","Crocodile","Alligator","Snake","Lizard","Dragon","Unicorn","Fairy","Wizard","Witch","Ghost","Monster","Alien","Astronaut","Cowboy","Knight","Ballerina","Doctor","Firefighter","Police","Teacher","Chef","Farmer","Builder","Artist","Musician","Dancer","Singer","Athlete","Soldier","Sailor","Pilot","Driver","Gardener","Baker","Nurse","Scientist","Explorer","Detective","Judge","King","Queen","Prince","Joker","Snowman","Scarecrow","Mermaid","Giant","Elf","Troll","Goblin","Ogre","Yeti","Vampire","Zombie","Skeleton","Mummy","Werewolf","Angel","Devil","Genie","Leprechaun","Gnome","Dwarf","Hobbit","Ninja","Samurai","Viking","Spartan","Gladiator","Pharaoh","Emperor","Sultan","Chief","Warrior","Hero","Villain","Champion","Legend","Titan","Colossus","Cyclops","Minotaur","Centaur","Pegasus","Phoenix","Sphinx","Chimera","Hydra","Cerberus","Medusa","Siren","Nymph"];

let currentCount = 1;
let currentCategory = "all";
let usedCharades = [];

/* CATEGORY FILTER */
function getFilteredNouns() {
  if (currentCategory === "animals") {
    return NOUNS.filter(n =>
      ["Dog","Cat","Lion","Tiger","Elephant","Monkey","Bird","Fish","Horse"].some(a => n.includes(a))
    );
  }

  if (currentCategory === "people") {
    return NOUNS.filter(n =>
      ["Doctor","Teacher","Chef","Farmer","Police","Firefighter","Artist"].some(p => n.includes(p))
    );
  }

  if (currentCategory === "fantasy") {
    return NOUNS.filter(n =>
      ["Dragon","Unicorn","Wizard","Ghost","Monster","Zombie"].some(f => n.includes(f))
    );
  }

  return NOUNS;
}

/* RANDOM */
function getRandomCharade() {
  const nouns = getFilteredNouns();

  let charade;
  let attempts = 0;

  do {
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    charade = `${action} ${noun}`;
    attempts++;
  } while (usedCharades.includes(charade) && attempts < 20);

  usedCharades.push(charade);
  return charade;
}

/* GENERATE */
function generate() {
  const box = document.getElementById("cards");
  const status = document.getElementById("statusText");

  if (!box) return;

  box.innerHTML = "";

  for (let i = 0; i < currentCount; i++) {
    const div = document.createElement("div");
    div.className = "card fade-in";
    div.textContent = getRandomCharade();
    box.appendChild(div);
  }

  if (status) {
    status.innerText = `${currentCount} ${currentCategory} charades ready 🎉`;
  }
}

/* CATEGORY */
function setCategory(cat) {
  currentCategory = cat;

  document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
  if (event && event.target) event.target.classList.add("active");

  usedCharades = [];
  generate();
}

/* COUNT */
function setCount(n) {
  currentCount = n;
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

/* AUTO RUN */
document.addEventListener("DOMContentLoaded", () => {
  generate();
});
