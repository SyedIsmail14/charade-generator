/* =====================================================
   REVERSE CHARADES
   Group acts, one person guesses
   ===================================================== */

const CHARADES = [
"Making Sandwich","Brushing Teeth","Playing Football","Opening Umbrella","Washing Hands","Riding Bicycle","Flying Kite","Catching Ball","Cooking Dinner","Cleaning Room","Taking Selfie","Dancing Together","Celebrating Birthday","Packing Bag","Searching Phone","Watching Movie","Building Tower","Reading Book","Painting Wall","Shopping Groceries","Washing Dishes","Folding Laundry","Ironing Clothes","Vacuuming Floor","Mopping Floor","Sweeping Floor","Dusting Furniture","Making Bed","Changing Diaper","Feeding Baby","Bathing Dog","Walking Dog","Training Dog","Grooming Cat","Planting Flowers","Watering Plants","Mowing Lawn","Raking Leaves","Shoveling Snow","Building Snowman","Making Snowball","Throwing Snowball","Decorating Tree","Wrapping Gifts","Opening Presents","Blowing Candles","Cutting Cake","Serving Food","Setting Table","Pouring Drinks","Washing Car","Pumping Gas","Checking Tire","Changing Oil","Fixing Engine","Painting Fence","Hammering Nail","Sawing Wood","Drilling Hole","Screwing Bolt","Measuring Length","Cutting Fabric","Sewing Button","Knitting Scarf","Crocheting Blanket","Embroidering Pattern","Quilting Bedspread","Weaving Basket","Spinning Yarn","Dying Fabric","Ironing Shirt","Polishing Shoes","Tying Shoelaces","Buttoning Coat","Zipping Jacket","Putting Hat","Wearing Gloves","Adjusting Tie","Combing Hair","Braiding Hair","Curling Hair","Straightening Hair","Applying Makeup","Removing Makeup","Shaving Face","Trimming Beard","Cutting Nails","Filing Nails","Painting Nails","Massaging Feet","Stretching Muscles","Doing Pushups","Doing Situps","Doing Squats","Lifting Weights","Running Marathon","Jumping Rope","Playing Tennis","Playing Basketball","Playing Baseball","Playing Cricket","Playing Hockey","Playing Soccer","Playing Volleyball","Playing Badminton","Playing Golf","Bowling Strike","Throwing Dart","Shooting Arrow","Fishing Rod","Casting Line","Reeling Fish","Paddling Canoe","Rowing Boat","Sailing Yacht","Surfing Wave","Diving Deep","Snorkeling Reef","Swimming Laps","Treading Water","Floating Back","Jumping Pool","Sliding Slide","Swinging Swing","Climbing Rope","Balancing Beam","Riding Skateboard","Riding Scooter","Riding Motorcycle","Driving Car","Parking Car","Reversing Car","Honking Horn","Signaling Turn","Checking Mirror","Fastening Seatbelt","Starting Engine","Shifting Gear","Pressing Brake","Turning Wheel","Opening Window","Closing Door","Locking Door","Unlocking Door","Ringing Doorbell","Knocking Door","Answering Phone","Dialing Number","Texting Message","Scrolling Feed","Taking Photo","Recording Video","Editing Picture","Posting Update","Liking Post","Sharing Content","Typing Email","Printing Document","Scanning Paper","Photocopying Page","Stapling Papers","Filing Documents","Shredding Paper","Signing Contract","Stamping Document","Mailing Letter","Opening Mail","Packaging Box","Sealing Envelope","Writing Letter","Drawing Picture","Coloring Page","Sketching Portrait","Sculpting Clay","Carving Wood","Molding Pottery","Glazing Ceramic","Firing Kiln","Mixing Paint","Applying Varnish","Framing Picture","Hanging Picture","Tuning Guitar","Playing Piano","Drumming Beat","Blowing Trumpet","Playing Violin","Conducting Orchestra","Singing Song","Recording Music","Mixing Track","Playing Record","Adjusting Volume","Changing Channel","Programming Remote","Charging Battery","Plugging Cable","Connecting Wifi","Installing Software","Updating System","Backing Data","Restarting Computer","Closing Window","Deleting File"];

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
