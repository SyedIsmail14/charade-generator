/* =====================================================
   ISLAMIC CHARADES – HALAL, ACTION-BASED
   No prophets, no divine beings, no mockery
   ===================================================== */

/* ACTIONS (PERMISSIBLE) */
const ACTIONS = [
"Making","Reading","Giving","Helping","Sharing","Greeting","Learning","Teaching","Cleaning","Waiting","Walking","Visiting","Listening","Preparing","Breaking","Opening","Closing","Carrying","Respecting","Smiling","Praying","Fasting","Worshipping","Bowing","Prostrating","Kneeling","Standing","Reciting","Memorizing","Studying","Contemplating","Reflecting","Meditating","Supplicating","Praising","Glorifying","Thanking","Seeking","Asking","Repenting","Forgiving","Pardoning","Apologizing","Accepting","Embracing","Welcoming","Hosting","Inviting","Serving","Feeding","Cooking","Baking","Preparing","Washing","Purifying","Cleansing","Bathing","Performing","Ablution","Rinsing","Wiping","Drying","Dressing","Covering","Wearing","Veiling","Wrapping","Adjusting","Tying","Fastening","Removing","Folding","Arranging","Organizing","Tidying","Sweeping","Mopping","Dusting","Polishing","Decorating","Adorning","Beautifying","Illuminating","Lighting","Hanging","Displaying","Spreading","Rolling","Unrolling","Placing","Positioning","Orienting","Facing","Turning","Directing","Guiding","Leading","Following","Accompanying","Escorting","Supporting","Assisting","Aiding","Comforting","Consoling","Encouraging","Motivating","Inspiring","Advising","Counseling","Recommending","Suggesting","Reminding","Informing","Notifying","Announcing","Declaring","Proclaiming","Testifying","Witnessing","Confirming","Affirming","Acknowledging","Recognizing","Honoring","Respecting","Revering","Venerating","Obeying","Submitting","Surrendering","Trusting","Believing","Having Faith","Hoping","Wishing","Desiring","Intending","Planning","Deciding","Choosing","Selecting","Preferring","Prioritizing","Focusing","Concentrating","Pondering","Thinking","Considering","Evaluating","Judging","Discerning","Understanding","Comprehending","Grasping","Absorbing","Retaining","Remembering","Recalling","Reviewing","Revising","Practicing","Rehearsing","Repeating","Chanting","Singing","Humming","Whispering","Speaking","Talking","Conversing","Discussing","Debating","Arguing","Agreeing","Disagreeing","Nodding","Shaking Head","Gesturing","Pointing","Indicating","Showing","Demonstrating","Explaining","Clarifying","Illustrating","Describing","Narrating","Relating","Telling","Sharing Stories","Conveying","Communicating","Expressing","Articulating","Pronouncing","Enunciating","Proclaiming","Broadcasting","Spreading","Distributing","Dispensing","Allocating","Dividing","Separating","Sorting","Categorizing","Classifying","Grouping","Gathering","Collecting","Assembling","Congregating","Meeting","Joining","Uniting","Connecting","Linking","Bonding","Befriending","Socializing","Interacting","Engaging","Participating","Contributing","Donating","Offering","Presenting","Bestowing","Granting","Providing","Supplying","Furnishing","Equipping","Preparing","Arranging","Coordinating","Managing","Organizing","Administering","Overseeing","Supervising","Monitoring","Observing","Watching","Noticing","Perceiving","Sensing","Feeling","Experiencing","Undergoing","Enduring","Persevering","Persisting","Continuing","Maintaining","Sustaining","Preserving","Protecting","Safeguarding","Defending","Shielding","Guarding","Securing","Locking","Storing","Keeping","Holding","Grasping","Clutching","Gripping","Releasing","Letting Go","Surrendering","Yielding","Submitting","Accepting","Receiving","Taking","Obtaining","Acquiring","Gaining","Earning","Achieving","Accomplishing","Completing","Finishing","Concluding","Ending","Terminating","Stopping","Pausing","Resting","Relaxing","Recuperating","Recovering","Healing","Curing","Treating","Caring","Nurturing","Tending","Attending","Serving","Ministering","Devoting","Dedicating","Committing","Pledging","Vowing","Promising","Assuring","Guaranteeing","Certifying","Validating","Verifying","Confirming","Checking","Inspecting","Examining","Investigating","Researching","Exploring","Discovering","Finding","Locating","Identifying","Naming","Labeling","Marking","Signing","Sealing","Stamping","Imprinting","Engraving","Inscribing","Writing","Recording","Documenting","Noting","Jotting","Scribing","Transcribing","Copying","Duplicating","Reproducing","Replicating","Imitating","Emulating","Mimicking","Modeling","Exemplifying","Demonstrating","Manifesting","Exhibiting","Displaying","Revealing","Disclosing","Uncovering","Exposing","Publishing","Announcing","Proclaiming"];

/* ISLAMIC CONTEXTS (NON-PERSONIFICATION) */
const CONTEXTS = [
  "Wudu",
  "Salah",
  "Quran",
  "Dua",
  "Charity",
  "Mosque",
  "Ramadan",
  "Iftar",
  "Suhoor",
  "Prayer Mat",
  "Tasbih",
  "Islamic Book",
  "Helping Parents",
  "Greeting Salam",
  "Giving Zakat",
  "Sharing Food",
  "Visiting Mosque",
  "Breaking Fast",
  "Learning Islam",
  "Teaching Kids"
];

/* BUILD CHARADES */
let CHARADES = [];
for (let a of ACTIONS) {
  for (let c of CONTEXTS) {
    CHARADES.push(`${a} ${c}`);
  }
}

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
