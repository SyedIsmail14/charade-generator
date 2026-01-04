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
