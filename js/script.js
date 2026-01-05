/* =====================================================
   FUNNY REAL-LIFE CHARADES
   Example: "Walk like an Egyptian"
   ===================================================== */

/* VERBS */
const VERBS = [
  // Basic Actions (1-30)
  "Walk","Run","Dance","Eat","Sleep","Laugh","Cry","Jump","Clap","Wave",
  "Tiptoe","Crawl","March","Stretch","Yawn","Sneak","Hide","Search","Think","Celebrate",
  "Panic","Freeze","Shake","Balance","Listen","Wait","Play","Spin","Hop","Skip",
  
  // Sports & Activities (31-80)
  "Swim","Surf","Ski","Skate","Dive","Bowl","Golf","Box","Wrestle","Fence",
  "Juggle","Cartwheel","Backflip","Somersault","Climb","Parachute","Bungee jump","Skateboard","Rollerblade","Snowboard",
  "Kayak","Canoe","Row","Sail","Windsurf","Parasail","Zipline","Rappel","Abseil","Hike",
  "Jog","Sprint","Hurdle","Pole vault","High jump","Long jump","Shot put","Javelin throw","Discus throw","Hammer throw",
  "Weightlift","Bench press","Squat","Deadlift","Curl","Push up","Pull up","Sit up","Burpee","Plank",
  
  // Daily Activities (81-130)
  "Brush teeth","Comb hair","Shave","Apply makeup","Tie shoes","Button shirt","Zip jacket","Put on socks","Iron clothes","Fold laundry",
  "Vacuum","Sweep","Mop","Dust","Scrub","Wash dishes","Dry dishes","Load dishwasher","Take out trash","Recycle",
  "Cook","Chop","Slice","Dice","Stir","Flip","Whisk","Knead","Roll dough","Frost cake",
  "Shop","Pay","Scan items","Bag groceries","Push cart","Carry bags","Window shop","Try on clothes","Check price tag","Return items",
  "Drive","Park","Reverse","Signal","Honk","Pump gas","Check oil","Change tire","Wash car","Polish car",
  
  // Work & Office (131-170)
  "Type","Click mouse","Scroll","Print","Staple","Hole punch","Photocopy","Fax","Shred","File",
  "Answer phone","Take notes","Highlight","Underline","Erase","Sharpen pencil","Open envelope","Seal envelope","Stamp","Mail",
  "Present","Point at screen","Draw diagram","Write on board","Erase board","Pass handout","Shuffle papers","Sign document","Read contract","Shake hands",
  "Interview","Take meeting","Conference call","Video chat","Screen share","Brainstorm","Debate","Negotiate","Close deal","Celebrate success",
  
  // Entertainment & Hobbies (171-220)
  "Paint","Draw","Sketch","Sculpt","Carve","Mold clay","Spray paint","Stencil","Doodle","Color",
  "Knit","Crochet","Sew","Embroider","Weave","Quilt","Cross stitch","Needlepoint","Macrame","Tie-dye",
  "Play guitar","Strum","Pluck strings","Play piano","Play drums","Play violin","Play flute","Play trumpet","Play saxophone","Conduct orchestra",
  "Sing","Hum","Whistle","Beatbox","Rap","Yodel","Opera sing","Harmonize","Lip sync","Karaoke",
  "Take photo","Zoom in","Zoom out","Focus camera","Flash photo","Selfie","Group photo","Panorama","Time lapse","Develop film",
  
  // Animals & Nature (221-260)
  "Milk cow","Feed chickens","Groom horse","Saddle horse","Ride horse","Shear sheep","Herd cattle","Lasso","Brand cattle","Pitch hay",
  "Plant seeds","Water plants","Weed garden","Harvest","Prune","Rake leaves","Mow lawn","Trim hedges","Plant tree","Dig hole",
  "Fish","Cast line","Reel in","Bait hook","Catch fish","Clean fish","Gut fish","Scale fish","Fillet fish","Grill fish",
  "Camp","Pitch tent","Start fire","Roast marshmallow","Tell ghost story","Sleep in sleeping bag","Hike trail","Read map","Use compass","Build shelter",
  
  // Food & Dining (261-300)
  "Bite","Chew","Swallow","Sip","Slurp","Gulp","Drink","Toast","Clink glasses","Pour drink",
  "Cut food","Spear food","Twirl pasta","Blow on hot food","Taste test","Season","Salt","Pepper","Add sugar","Squeeze lemon",
  "Crack egg","Beat egg","Scramble","Fry","Boil","Steam","Bake","Roast","Grill","Barbecue",
  "Order food","Read menu","Call waiter","Pay bill","Leave tip","Doggy bag","Fast food drive-thru","Unwrap burger","Dip fries","Slurp milkshake",
  
  // Music & Performance (301-340)
  "Tap dance","Ballroom dance","Hip hop dance","Break dance","Ballet","Tango","Waltz","Salsa","Moonwalk","Robot dance",
  "Air guitar","Air drums","Head bang","Mosh pit","Crowd surf","Stage dive","Sing into mic","Bow","Encore","Curtain call",
  "Magic trick","Pull rabbit from hat","Saw person in half","Card trick","Disappear","Reappear","Levitate","Escape handcuffs","Sword swallow","Fire breathe",
  "Juggle fire","Walk tightrope","Unicycle","Trapeze","Clown around","Mime","Invisible wall","Invisible box","Pulling rope","Walking down stairs",
  
  // Technology & Gaming (341-370)
  "Swipe screen","Pinch zoom","Scroll","Double tap","Long press","Shake phone","Take screenshot","Charge phone","Plug in headphones","Adjust volume",
  "Play video game","Press buttons","Move joystick","Aim","Shoot","Reload","Throw grenade","Drive racing game","Fight combo","Victory dance",
  "Stream","Record video","Edit video","Upload","Post","Like","Comment","Share","Subscribe","Unbox",
  
  // Medical & Health (371-400)
  "Take temperature","Check pulse","Listen with stethoscope","Give injection","Take blood pressure","X-ray","CT scan","MRI","Ultrasound","Surgery",
  "Swallow pill","Apply bandage","Put on cast","Use crutches","Wheelchair","Physical therapy","Stretch injury","Ice injury","Heat therapy","Massage",
  "Sneeze","Cough","Blow nose","Check throat","Take medicine","Gargle","Use inhaler","Put in eye drops","Swab test","Get vaccine",
  
  // Random Silly Actions (401-450)
  "Floss dance","Dab","Whip","Nae nae","Twerk","Shuffle","Sprinkler dance","Shopping cart dance","Running man","Carlton dance",
  "Chicken dance","Macarena","YMCA","Cha cha slide","Electric slide","Thriller dance","Gangnam style","Harlem shake","Mannequin challenge","Bottle flip",
  "Dab on haters","Flex muscles","Strike pose","Voguing","Catwalk","Model turn","Blue steel look","Smize","Hair flip","Strut",
  "Photobomb","Planking","Owling","Batmanning","Teapot pose","Scarecrow pose","Flamingo stand","Tree pose","Warrior pose","Downward dog",
  "Zombie walk","Frankenstein walk","Mummy walk","Vampire bite","Werewolf howl","Ghost float","Witch cackle","Monster stomp","Alien probe","Bigfoot stomp",
  
  // More Specific Actions (451-500)
  "Text message","Emoji reaction","Video call","Take boomerang","TikTok dance","Instagram story","Snapchat filter","Twitter rant","Facebook stalk","Google search",
  "Binge watch","Pause","Rewind","Fast forward","Skip intro","Change channel","Adjust antenna","DVD menu","Eject disc","Buffer wait",
  "Microwave food","Set timer","Open fridge","Close drawer","Lock door","Unlock door","Ring doorbell","Knock","Peek through keyhole","Open package",
  "Pop bubble wrap","Crack knuckles","Bite nails","Pick teeth","Floss teeth","Gargle mouthwash","Apply deodorant","Spray perfume","Put on chapstick","Moisturize",
  "Hail taxi","Ride subway","Wait for bus","Check watch","Set alarm","Hit snooze","Oversleep","Rush out door","Tie tie","Adjust collar"
];

/* STYLES */
const STYLES = [
  "like a Grandpa","like a sleepy baby","like a scared cat","like a happy dog","like a monkey",
  "like a penguin","like an old person","like a confused man","like a dancing chicken","like a proud peacock",
  "like a slithering snake","like a hopping kangaroo","like a waddling duck","like a prowling tiger","like a charging rhino",
  "like a lazy sloth","like a hyper chipmunk","like a grumpy bear","like a elegant swan","like a silly goose",
  "like a scratching chicken","like a bucking bronco","like a galloping horse","like a sneaky fox","like a wise owl",
  "like a bouncing rabbit","like a slippery fish","like a flying eagle","like a buzzing bee","like a crawling caterpillar",
  "like a leaping frog","like a stretching giraffe","like a stampeding elephant","like a spinning flamingo","like a pecking bird",
  "like a howling wolf","like a roaring lion","like a scurrying mouse","like a sleepy koala","like a playful otter",
  "like a majestic deer","like a stubborn mule","like a curious raccoon","like a waddling tortoise","like a hopping bunny",
  "like a slinking panther","like a flapping seagull","like a diving dolphin","like a splashing whale","like a snapping crocodile",
  
  // Conditions & States (51-100)
  "like you are late","like it is too hot","like it is too cold","like a robot","like you won a prize",
  "like you lost something","like you're drunk","like you're dizzy","like you're sleepwalking","like you're blindfolded",
  "like you're in slow motion","like you're in fast forward","like you're underwater","like you're on the moon","like you're in zero gravity",
  "like you're stuck in mud","like you're on ice","like you're on a tightrope","like you're in quicksand","like you're magnetic",
  "like you're a puppet","like you're invisible","like you're melting","like you're freezing solid","like you're elastic",
  "like you're made of jello","like you're a balloon deflating","like you're inflating","like you're on fire","like you're electric shocked",
  "like you're ticklish everywhere","like you have hiccups","like you're holding in pee","like you stubbed your toe","like you smell something bad",
  "like you smell something amazing","like you're trying to be quiet","like you're trying to be loud","like you're exhausted","like you're super energized",
  "like you drank 10 coffees","like you haven't slept in 3 days","like you just woke up","like you're half asleep","like you're daydreaming",
  "like you're spacing out","like you forgot what you're doing","like you just remembered","like you're having déjà vu","like you're confused about reality",
  
  // Professions & Characters (101-150)
  "like a mime","like a clown","like a superhero","like a villain","like a spy",
  "like a ninja","like a samurai","like a knight","like a pirate","like a cowboy",
  "like a ballerina","like a bodybuilder","like a fashion model","like a drill sergeant","like a librarian",
  "like a mad scientist","like a vampire","like a zombie","like Frankenstein","like a mummy",
  "like an astronaut","like a deep sea diver","like a firefighter","like a police officer","like a detective",
  "like a chef","like a waiter","like a bartender","like a janitor","like a construction worker",
  "like a teacher","like a principal","like a student taking test","like a politician","like a news anchor",
  "like a game show host","like a street performer","like a statue performer","like a mime artist","like a breakdancer",
  "like a opera singer","like a rapper","like a rock star","like a DJ","like a conductor",
  "like a referee","like a coach","like an athlete celebrating","like a cheerleader","like a mascot",
  
  // Movies & Pop Culture (151-200)
  "like Frankenstein's monster","like Dracula","like a werewolf transforming","like King Kong","like Godzilla",
  "like T-Rex","like a velociraptor","like Indiana Jones","like James Bond","like Mission Impossible",
  "like The Terminator","like RoboCop","like Iron Man","like Spider-Man","like Batman",
  "like Superman flying","like Wonder Woman","like The Flash","like Hulk smashing","like Thor with hammer",
  "like Yoda","like Darth Vader","like a Stormtrooper","like Chewbacca","like R2-D2",
  "like C-3PO","like E.T.","like an Alien xenomorph","like Predator","like Gollum",
  "like a Hobbit","like Gandalf","like an Elf","like a Dwarf","like an Orc",
  "like Harry Potter casting spell","like Hermione","like Dumbledore","like Voldemort","like Dobby",
  "like Karate Kid","like Rocky Balboa","like Forrest Gump","like Jack Sparrow","like The Joker",
  "like Tarzan","like Jane","like George of the Jungle","like Shrek","like Donkey from Shrek",
  
  // Ages & Eras (201-240)
  "like a newborn baby","like a toddler learning to walk","like a bratty kid","like a moody teenager","like a college student",
  "like someone in their 20s at club","like tired parent","like midlife crisis","like a senior citizen","like someone 100 years old",
  "like a caveman","like ancient Egyptian","like Roman gladiator","like medieval peasant","like Renaissance artist",
  "like Victorian gentleman","like Victorian lady","like 1920s flapper","like 1950s greaser","like 1960s hippie",
  "like 1970s disco dancer","like 1980s aerobics instructor","like 1990s grunge kid","like early 2000s emo kid","like modern influencer",
  "like Stone Age human","like Bronze Age warrior","like Iron Age farmer","like Wild West outlaw","like Gold Rush miner",
  "like Roaring Twenties gangster","like WWII soldier","like 1950s housewife","like 1960s go-go dancer","like 1970s funk dancer",
  "like 1980s breakdancer","like 1990s raver","like Y2K tech bro","like 2010s hipster","like Gen Z TikToker",
  
  // Weather & Elements (241-270)
  "like you're in a hurricane","like you're in a tornado","like you're in an earthquake","like you're in a tsunami","like you're in a blizzard",
  "like you're in desert heat","like you're in arctic cold","like you're in thick fog","like you're being blown by wind","like you're in a thunderstorm",
  "like you're dodging lightning","like you're dancing in rain","like you're splashing in puddles","like you're building snowman","like you're having snowball fight",
  "like you're shoveling snow","like you're slipping on ice","like you're sunbathing","like you're getting sunburned","like you're sweating profusely",
  "like you're shivering cold","like you're teeth chattering","like you're warming by fire","like you're fanning yourself","like you're seeking shade",
  "like you're caught in hail","like you're in sandstorm","like you're in dust storm","like you're in heat wave","like you're in cold snap",
  
  // Transportation (271-300)
  "like you're riding bicycle","like you're riding motorcycle","like you're driving race car","like you're driving tractor","like you're driving tank",
  "like you're flying airplane","like you're helicopter pilot","like you're riding rocket ship","like you're on magic carpet","like you're riding broomstick",
  "like you're on skateboard","like you're on roller skates","like you're on hoverboard","like you're on pogo stick","like you're on unicycle",
  "like you're rowing boat","like you're sailing ship","like you're steering yacht","like you're driving submarine","like you're surfing",
  "like you're riding train","like you're on roller coaster","like you're on merry-go-round","like you're on swing","like you're on seesaw",
  "like you're parachuting","like you're hang gliding","like you're parasailing","like you're bungee jumping","like you're zip lining",
  
  // Food States (301-330)
  "like you ate too much","like you're starving","like you're thirsty in desert","like you ate something spicy","like you ate something sour",
  "like you ate something bitter","like you're tasting something gross","like you're savoring delicious food","like you're at buffet","like you're on diet",
  "like you're eating invisibly","like you're competitive eater","like you're food critic","like you're cooking show host","like you're at fancy restaurant",
  "like you're at fast food","like you're having picnic","like you're at barbecue","like you're eating spaghetti","like you're eating corn on cob",
  "like you're eating soup","like you're eating ice cream","like you're brain freeze","like you're chewing gum","like you're sucking lollipop",
  "like you're cracking nuts","like you're peeling banana","like you're eating watermelon","like you're spitting seeds","like you're licking finger",
  
  // Sports Scenarios (331-360)
  "like Olympic champion","like sore loser","like celebrating victory","like defeated athlete","like training montage",
  "like warming up","like stretching before game","like psyching up","like in slow-mo replay","like instant replay",
  "like sports commentator","like doing victory lap","like on podium","like breaking world record","like photo finish",
  "like clutch moment","like game-winning shot","like striking out","like fumbling ball","like dropping catch",
  "like penalty kick","like free throw","like hole in one","like strike in bowling","like gutter ball",
  "like home run","like grand slam","like touchdown dance","like spike celebration","like goalie save",
  
  // Emotional Extremes (361-400)
  "like you're laughing hysterically","like you can't stop crying","like you're ugly crying","like you're trying not to laugh","like you're holding back tears",
  "like you're furiously angry","like you're passively aggressive","like you're awkwardly uncomfortable","like you're embarrassed","like you're mortified",
  "like you're anxious","like you're panicking","like you're paranoid","like you're suspicious","like you're jealous",
  "like you're in love","like you're heartbroken","like you're crushing hard","like you're friendzoned","like you're ghosted",
  "like you're excited kid on Christmas","like you're disappointed","like you're shocked","like you're amazed","like you're disgusted",
  "like you're bored out of mind","like you're entertained","like you're frightened","like you're terrified","like you're brave",
  "like you're confident","like you're insecure","like you're showing off","like you're humble","like you're proud parent",
  "like you're annoyed","like you're irritated","like you're frustrated","like you're relieved","like you're satisfied",
  
  // Supernatural & Fantasy (401-430)
  "like ghost floating","like poltergeist haunting","like demon possessed","like angel descending","like fairy flying",
  "like wizard casting spell","like witch brewing potion","like warlock summoning","like sorcerer","like enchanted",
  "like cursed","like blessed","like shapeshifter transforming","like werewolf howling","like vampire feeding",
  "like zombie apocalypse","like surviving zombie","like mummy awakening","like pharaoh","like genie granting wish",
  "like dragon breathing fire","like unicorn prancing","like phoenix rising","like griffon flying","like centaur galloping",
  "like mermaid swimming","like kraken attacking","like Medusa turning to stone","like cyclops","like minotaur",
  
  // Tech & Modern (431-460)
  "like addicted to phone","like phone died","like wifi dropped","like password forgot","like loading buffering",
  "like video game lag","like rage quitting","like streaming","like going viral","like getting canceled",
  "like reading mean comments","like deleting browser history","like incognito mode","like clearing cache","like updating software",
  "like computer crashing","like blue screen of death","like printer jamming","like tech support","like turning it off and on",
  "like typing frantically","like caps lock yelling","like autocorrect fail","like butt dial","like pocket texting",
  "like zoom meeting","like muted on call","like virtual background fail","like cat video watching","like doom scrolling",
  
  // Occupational Hazards (461-490)
  "like barista making coffee","like server balancing plates","like cashier scanning","like retail worker fake smile","like customer service voice",
  "like telemarketer calling","like door-to-door salesman","like used car salesman","like infomercial host","like motivational speaker",
  "like life coach","like yoga instructor","like personal trainer","like drill instructor yelling","like crossing guard",
  "like traffic cop","like security guard","like bouncer","like bodyguard","like secret service",
  "like paparazzi","like photographer","like journalist","like interviewer","like talk show host",
  "like stand-up comedian","like heckler","like audience member","like talent show contestant","like talent show judge",
  
  // Final Batch (491-500)
  "like synchronized swimmer","like figure skater","like gymnast","like tightrope walker","like contortionist",
  "like escape artist","like stunt double","like daredevil","like thrill seeker","like adrenaline junkie"
];
let currentCount = 3; // DEFAULT charades on page load

/* BUILD CHARADES */
function getRandomCharade() {
  const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
  const style = STYLES[Math.floor(Math.random() * STYLES.length)];
  return `${verb} ${style}`;
}

/* MENU */
function toggleMenu() {
  document.getElementById("navMobile").classList.toggle("open");
}

/* QUICK COUNT BUTTONS */
function setCount(n) {
  currentCount = n;
  generate();
}

/* CUSTOM INPUT */
function showCustom() {
  document.getElementById("customBox").classList.remove("hidden");
}

function applyCustom() {
  const input = document.getElementById("customInput");
  let n = parseInt(input.value, 10);

  // HARD LIMIT LOGIC
  if (isNaN(n) || n < 1) {
    n = 1;
  } else if (n > 12) {
    n = 12; // 👈 CUT OFF ABOVE 12
  }

  input.value = n;
  currentCount = n;

  document.getElementById("customBox").classList.add("hidden");
  generate();
}

/* GENERATE */
function generate() {
  const box = document.getElementById("cards");
  const status = document.getElementById("statusText");

  box.innerHTML = "";

  for (let i = 0; i < currentCount; i++) {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = getRandomCharade();
    box.appendChild(div);
  }

  status.textContent =
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

