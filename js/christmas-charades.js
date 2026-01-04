/* =====================================================
   CHRISTMAS CHARADES – FESTIVE & FAMILY FRIENDLY
   ===================================================== */

const CHARADES = [
"Decorating Tree","Wrapping Gifts","Opening Presents","Hanging Stockings","Building Snowman","Throwing Snowballs","Singing Carols","Baking Cookies","Drinking Hot Chocolate","Wearing Santa Hat","Ringing Bells","Lighting Candles","Posting Letters","Waiting for Santa","Climbing Chimney","Shaking Snow Globe","Opening Advent Calendar","Watching Christmas Movie","Exchanging Gifts","Laughing Elf","Flying Reindeer","Pulling Sleigh","Decorating House","Setting Dinner Table","Unpacking Decorations","Trimming Branches","Stringing Lights","Placing Star","Hanging Ornaments","Wrapping Garland","Tying Ribbons","Making Bows","Stuffing Stockings","Hanging Wreaths","Decorating Mantel","Placing Nativity","Arranging Figures","Lighting Fireplace","Roasting Chestnuts","Making Eggnog","Stirring Cider","Frosting Cookies","Cutting Shapes","Decorating Gingerbread","Building House","Icing Roof","Adding Candies","Making Fudge","Stirring Pudding","Preparing Turkey","Basting Bird","Carving Ham","Mashing Potatoes","Making Gravy","Baking Pie","Rolling Dough","Crimping Edges","Whipping Cream","Serving Dessert","Pouring Wine","Toasting Glasses","Cracking Nuts","Peeling Oranges","Eating Candy Canes","Sucking Peppermint","Licking Lollipop","Unwrapping Chocolates","Opening Crackers","Wearing Sweater","Putting Scarf","Wearing Mittens","Bundling Up","Sledding Down","Ice Skating","Making Angels","Catching Snowflakes","Building Fort","Having Snowball Fight","Rolling Snowball","Stacking Snowballs","Adding Carrot Nose","Placing Coal Eyes","Wrapping Scarf","Adding Hat","Making Ice Castle","Decorating Yard","Inflating Santa","Setting Reindeer","Plugging Lights","Testing Bulbs","Replacing Fuse","Untangling Lights","Climbing Ladder","Hanging Icicles","Draping Garland","Placing Figurines","Arranging Village","Setting Train","Winding Track","Starting Engine","Blowing Whistle","Watching Parade","Waving Float","Catching Candy","Cheering Santa","Meeting Elves","Taking Photos","Sitting Lap","Whispering Wishes","Pulling Beard","Hugging Santa","Feeding Reindeer","Leaving Carrots","Setting Cookies","Pouring Milk","Writing Letter","Sealing Envelope","Mailing Wish","Checking List","Marking Calendar","Counting Days","Shaking Presents","Guessing Gifts","Peeking Tags","Rattling Boxes","Measuring Ribbon","Cutting Paper","Folding Corners","Taping Edges","Sticking Bow","Labeling Gifts","Hiding Presents","Sneaking Peek","Finding Hiding Spot","Decorating Cookies","Sprinkling Sugar","Adding Sprinkles","Piping Frosting","Making Snowflakes","Cutting Paper","Folding Design","Hanging Window","Decorating Door","Making Garland","Stringing Popcorn","Threading Cranberries","Hanging Chains","Making Centerpiece","Arranging Pinecones","Adding Berries","Placing Candles","Lighting Menorah","Spinning Dreidel","Opening Crackers","Wearing Crown","Reading Joke","Pulling Cracker","Snapping Sound","Finding Prize","Wearing Hat","Telling Joke","Laughing Together","Clinking Glasses","Making Toast","Singing Songs","Holding Hands","Saying Grace","Carving Turkey","Passing Dishes","Serving Plates","Refilling Drinks","Clearing Table","Washing Dishes","Drying Plates","Storing Leftovers","Brewing Coffee","Serving Tea","Opening Chocolates","Watching Parade","Changing Channel","Napping Couch","Playing Games","Building Puzzle","Playing Charades","Singing Karaoke","Dancing Party","Wearing Costume","Taking Selfie","Video Calling","Waving Screen","Sending Wishes","Opening Card","Reading Message","Hanging Card","Displaying Photos","Remembering Memories","Hugging Family","Kissing Mistletoe","Hanging Mistletoe","Standing Under","Catching Kiss","Blushing Cheeks","Holding Hands","Walking Snow","Admiring Lights","Window Shopping","Browsing Store","Trying Clothes","Buying Gifts","Carrying Bags","Wrapping Station","Adding Tag","Giving Gift","Receiving Present","Thanking Giver","Hugging Thanks","Smiling Joy","Crying Happy","Celebrating Together"
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
