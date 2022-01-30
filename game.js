let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  resolution: window.devicePixelRatio,
  parent: "phaser-div",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {},
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let player2;
let player3;
let stars;
let coins;
let slowers;
let boosters;
let bombs;
let platforms;
let cursors;
let score = 0;
let score_player2 = 0;
let gameOver = false;
let scoreText;
let scoreText_2;
let names = [];
let controllers = [];
let playersArray = [];
let speed = 3;
let game;

let container;

let counter = 1;

let counterInterval;

let keyA;
let keyS;
let keyD;
let keyW;

let keyJ;
let keyK;
let keyL;
let keyI;

let keyAU;
let keyAL;
let keyAD;
let keyAR;

let keysP1;
let keysP2;
let keysP3;
let keys;


const MAXITEMS = 2;
const MAXCOINS = 10;
let gametime = 1000 * 60 * 2; // 2 minutes
//let gametime = 10000 ; // 2 sec

let styleFollowText = {
  fontFamily: 'Bangers',
  fill: "#000000",
  boundsAlignH: "center",
  boundsAlignV: "center",
  align: "center"
};

let playerIcons = ["maxi", "mathias", "jakob"];
const player1spawn = [100, 320];
const player2spawn = [700, 320];
const player3spawn = [400, 80];
const playerSpawns = [player1spawn, player2spawn, player3spawn];

let playerBoostElement = ["counter1-p1", "counter1-p2", "counter1-p3"];
let playerSlowElement = ["counter2-p1", "counter2-p2", "counter2-p3"];
let playerCollElement = ["counter3-p1", "counter3-p2", "counter3-p3"];

let cx;
let cy;
let cid = 1;

const SPAWNARRAY= [1,3,4];

let objectsArray = [];
$("document").ready(function () {
  updateScoreboard();
  
  // document.getElementById("save-game-btn").onclick = function () {
  //   console.log("clicked button");
  //   // document.getElementById("jsontxt").value += `{"id": ${cid},"x": ${cx},"y": ${cy}},`;
  //   // cid++;
  //   // spawnCoin({"x": cx, "y": cy});
  // }
});

function initGame(name1, name2, name3) {
  names.push(name1);
  names.push(name2);
  if (name3 != null || name3 != undefined) {
    names.push(name3);
  }
  startGame();
}


function preload() {
  this.load.image("sky", "assets/white.png");
  this.load.image("star", "assets/star.png");
  this.load.image("coin", "assets/coin.png")
  this.load.image("feather", "assets/speed.png");
  this.load.image("poison", "assets/poison.png");

  this.load.image("block", "assets/blocks/block.png");
  this.load.image("corner1", "assets/blocks/corner1.png");
  this.load.image("corner1_2", "assets/blocks/corner1_2.png");
  this.load.image("corner2", "assets/blocks/corner2.png");
  this.load.image("corner2_2", "assets/blocks/corner2_2.png");
  this.load.image("corner3", "assets/blocks/corner3.png");
  this.load.image("corner3_2", "assets/blocks/corner3_2.png");
  this.load.image("corner4", "assets/blocks/corner4.png");
  this.load.image("corner4_2", "assets/blocks/corner4_2.png");

  this.load.image("t1", "assets/blocks/t1.png");
  this.load.image("t1_2", "assets/blocks/t1_2.png");
  this.load.image("t2", "assets/blocks/t2.png");
  this.load.image("t2_2", "assets/blocks/t2_2.png");

  this.load.spritesheet('dude', 
        'assets/spritesheets/default.png',
        { frameWidth: 26.28, frameHeight: 50 }
    );
    this.load.spritesheet('dude_speed', 
        'assets/spritesheets/speedman.png',
        { frameWidth: 26.28, frameHeight: 50 }
    );
    this.load.spritesheet('dude_slow', 
        'assets/spritesheets/slowman.png',
        { frameWidth: 26.28, frameHeight: 50 }
    );
    this.load.spritesheet('dude_star', 
        'assets/spritesheets/starman.png',
        { frameWidth: 26.28, frameHeight: 50 }
    );
}

function startGame() {
  game = new Phaser.Game(config);
  startTimer();
}
class Controller {
  constructor(keys, name, player, id) {
    this.keyUp = keys[0];
    this.keyLeft = keys[1];
    this.keyDown = keys[2];
    this.keyRight = keys[3];
    this.name = name;
    this.player = player;
    this.id = id;
  }
  run() {
    //Move Player Logic
    // if(this.player.id == 0){
      

    //   document.getElementById("x").innerHTML = Math.floor(this.player.x);
    //   document.getElementById("y").innerHTML = Math.floor(this.player.y);
    //   cx = Math.floor(this.player.x);
    //   cy = Math.floor(this.player.y);
    // }
    let speed = 100 * this.player.speed;
    if (this.keyLeft.isDown && this.keyRight.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play(this.player.animturn);
    } else if (this.keyUp.isDown && this.keyDown.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play(this.player.animturn);
    } else if (this.keyLeft.isDown && (!this.keyUp.isDown && !this.keyDown.isDown)) {
      this.player.setVelocityX(-speed);
      this.player.setVelocityY(0);
      this.player.anims.play(this.player.animleft, true);
      //console.log("left");
    } else if (this.keyRight.isDown && (!this.keyUp.isDown && !this.keyDown.isDown)) {
      this.player.setVelocityX(speed);
      this.player.setVelocityY(0);
      this.player.anims.play(this.player.animright, true);
      //console.log("right");
    } else if (this.keyUp.isDown && (!this.keyLeft.isDown && !this.keyRight.isDown)) {
      this.player.setVelocityY(-speed);
      this.player.setVelocityX(0);
      //console.log("up");
    } else if (this.keyDown.isDown && (!this.keyLeft.isDown && !this.keyRight.isDown)) {
      this.player.setVelocityY(speed);
      this.player.setVelocityX(0);
      //console.log("down");
    } else if (this.keyLeft.isDown && this.keyUp.isDown) {
      this.player.setVelocityX(-speed);
      this.player.setVelocityY(-speed);
      this.player.anims.play(this.player.animleft, true);
      //console.log("left down");
    } else if (this.keyRight.isDown && this.keyUp.isDown) {
      this.player.setVelocityX(speed);
      this.player.setVelocityY(-speed);
      this.player.anims.play(this.player.animright, true);
      //console.log("rigth down");
    } else if (this.keyLeft.isDown && this.keyDown.isDown) {
      this.player.setVelocityX(-speed);
      this.player.setVelocityY(speed);
      this.player.anims.play(this.player.animleft, true);
      //console.log("left down");
    } else if (this.keyRight.isDown && this.keyDown.isDown) {
      this.player.setVelocityX(speed);
      this.player.setVelocityY(speed);
      this.player.anims.play(this.player.animright, true);
      //console.log("rigth down");
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play(this.player.animturn);
    }
  }
}

function create() {
  //Define Keys
  setInterval(spawnItems, 10000);
  setInterval(spawnCoins, 3000);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
  keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
  keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
  keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

  keyAU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  keyAL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  keyAD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  keyAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

  keysP1 = [keyW, keyA, keyS, keyD];
  keysP2 = [keyAU, keyAL, keyAD, keyAR];
  keysP3 = [keyI, keyJ, keyK, keyL];

  keys = [keysP1, keysP2, keysP3];

  //  A simple background for our game
  this.add.image(400, 300, "sky").setScale(4);

  platforms = this.physics.add.staticGroup();


  //Create Corner Piece
  platforms.create(650, 100, "corner1_2").setScale(0.15).refreshBody();
  platforms.create(699, 187, "corner1").setScale(0.15).refreshBody();

  platforms.create(150, 510, "corner2_2").setScale(0.15).refreshBody();
  platforms.create(101, 424, "corner2").setScale(0.15).refreshBody();

  platforms.create(650, 510, "corner3_2").setScale(0.15).refreshBody();
  platforms.create(699, 423, "corner3").setScale(0.15).refreshBody();

  platforms.create(150, 100, "corner4_2").setScale(0.15).refreshBody();
  platforms.create(101, 187, "corner4").setScale(0.15).refreshBody();
  

  //Create T piece
  platforms.create(240,305, "t1").setScale(0.1).refreshBody();
  platforms.create(240 + 85, 305 - 1, "t1_2").setScale(0.1).refreshBody();

  platforms.create(560,305, "t2").setScale(0.1).refreshBody();
  platforms.create(560 - 85, 305 + 1, "t2_2").setScale(0.1).refreshBody();

  //Create Block
  // platforms.create(300, 400, "block").setScale(0.1).refreshBody();
  platforms.create(400, 155, "block").setScale(0.1).refreshBody();
  platforms.create(400, 450, "block").setScale(0.1).refreshBody();


  
  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group();
  coins = this.physics.add.group();
  boosters = this.physics.add.group();
  slowers = this.physics.add.group();
  

//Functions for spawning Items
  spawnCoin = (data) => {
    let c = this.add.sprite(data.x, data.y, "coin").setScale(0.03).setSize(20, 20);
    c.setData("spawnID", data.id);
    //console.log(c);
    playersArray.forEach(e => {
      this.physics.add.overlap(e, coins, collectCoin, null, this);
    });
    coins.add(c);
    counter++;
  }
  spawnBooster = (data) => {
    let c = this.add.sprite(data.x, data.y, "feather").setScale(0.03).setSize(20, 20);
    c.setData("spawnID", data.id);
    //console.log(c);
    playersArray.forEach(e => {
      this.physics.add.overlap(e, boosters, collectBooster, null, this);
    });
    boosters.add(c);
    counter++;
  }
  spawnStar = (data) => {
    let c = this.add.sprite(data.x, data.y, "star").setScale(0.1).setSize(20, 20);
    c.setData("spawnID", data.id);
    //console.log(c);
    playersArray.forEach(e => {
      this.physics.add.overlap(e, stars, collectStar, null, this);
    });
    stars.add(c);
    counter++;
  }
  spawnSlower = (data) => {
    let c = this.add.sprite(data.x, data.y, "poison").setScale(0.03).setSize(20, 20);
    c.setData("spawnID", data.id);
    //console.log(c);
    playersArray.forEach(e => {
      this.physics.add.overlap(e, slowers, collectSlower, null, this);
    });
    slowers.add(c);
    counter++;
  }


//Create Players
//Normal
this.anims.create({
  key: 'left',
  frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: -1
});

this.anims.create({
  key: 'turn',
  frames: [ { key: 'dude', frame: 3 } ],
  frameRate: 10
});

this.anims.create({
  key: 'right',
  frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
  frameRate: 10,
  repeat: -1
});
 //Speed
this.anims.create({
  key: 'left_speed',
  frames: this.anims.generateFrameNumbers('dude_speed', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: -1
});

this.anims.create({
  key: 'turn_speed',
  frames: [ { key: 'dude_speed', frame: 3 } ],
  frameRate: 10
});

this.anims.create({
  key: 'right_speed',
  frames: this.anims.generateFrameNumbers('dude_speed', { start: 4, end: 6 }),
  frameRate: 10,
  repeat: -1
});
//Star
this.anims.create({
  key: 'left_star',
  frames: this.anims.generateFrameNumbers('dude_star', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: -1
});

this.anims.create({
  key: 'turn_star',
  frames: [ { key: 'dude_star', frame: 3 } ],
  frameRate: 10
});

this.anims.create({
  key: 'right_star',
  frames: this.anims.generateFrameNumbers('dude_star', { start: 4, end: 6 }),
  frameRate: 10,
  repeat: -1
});
//Slow
this.anims.create({
  key: 'left_slow',
  frames: this.anims.generateFrameNumbers('dude_slow', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: -1
});

this.anims.create({
  key: 'turn_slow',
  frames: [ { key: 'dude_slow', frame: 3 } ],
  frameRate: 10
});

this.anims.create({
  key: 'right_slow',
  frames: this.anims.generateFrameNumbers('dude_slow', { start: 4, end: 6 }),
  frameRate: 10,
  repeat: -1
});


  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    //console.log(names);
    if (name !== null) {
      let player = this.physics.add
        .sprite(playerSpawns[i][0], playerSpawns[i][1], "dude")
        .setScale(0.7);
      player.id = i;
      player.name = name;
      player.score = 0;

      player.setCollideWorldBounds(true);
      this.physics.add.overlap(player, stars, collectStar, null, this);
      this.physics.add.overlap(player, coins, collectCoin, null, this);
      this.physics.add.overlap(player, boosters, collectBooster, null, this);
      this.physics.add.overlap(player, slowers, collectSlower, null, this);
      player.platformCollider = this.physics.add.collider(player, platforms);
      player.containerCollider = this.physics.add.collider(player, container);


      playersArray.forEach(p => {
        if (player.id != p.id) {
          player.containerCollider = this.physics.add.collider(player, p);
        }

      });

      let followText = this.add.text(0, 0, player.name + "\n" + player.score, styleFollowText);
      player.followTextY = followText.displayWidth / 2;
      followText.setPosition(player.x, player.y);
      player.followText = followText;

      player.speed = 1;

      player.boostElement = playerBoostElement[i];
      player.slowElement = playerSlowElement[i];
      player.collElement = playerCollElement[i];
      player.animturn = "turn";
      player.animleft ="left";
      player.animright ="right";
      playersArray.push(player);
   
      let controller = new Controller(keys[i], name, player, i);
      controllers.push(controller);

    }
  }
}

function update() {
  if (gameOver) {
    return;
  }
  controllers.forEach((e) => {
    e.run();
  });
  playersArray.forEach(e => {
    e.followText.setPosition(e.x - e.followTextY, e.y - 50);

  });

}
//Timer 
function startTimer() {
  
  setInterval(changeTimer, 1000);
  
}
function changeTimer(){
  if(gametime >= 0) {
  let timerEL = document.getElementById("timer");
  let minutes = Math.floor((gametime / 1000) / 60);
  let seconds = (gametime / 1000) - minutes * 60;
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  if(seconds < 10){
    seconds = "0" + seconds;
  }
  let timeString = minutes + ":" + seconds;
  timerEL.innerHTML = timeString;
  gametime -= 1000;
  }
  else{
    endGame()
  }
}
function endGame(){
  gameOver = true;
  hideGame();

}
//Boosters
function collectBooster(player, booster) {
  objectsArray = objectsArray.filter((el) => el.id != booster.data.values.spawnID);
  booster.destroy();
  boostPlayer(player);
}
function boostPlayer(player) {
  clearInterval(player.boostInterval);
  clearTimeout(player.boostTimeout);
  setAnimSpeed(player);
  player.speed = 2;
  player.boostTimeout = setTimeout(resetPlayerSpeed, 10000, player);
  startCounterBoost(player);
}

function startCounterBoost(player) {
  player.boostCount = 10000;
  player.boostInterval = setInterval(changeCountdownBoost, 1000, player);
}

function changeCountdownBoost(player) {
  player.boostCount -= 1000;
  let ele = document.getElementById(player.boostElement);
  ele.innerHTML = (player.boostCount / 1000);
  if (player.boostCount == 0) {
    clearInterval(player.boostInterval);
  }
  checkPowerups();
}

function resetPlayerSpeed(player) {
  player.speed = 1;
  resetAnim(player);
}

//Slowers
function collectSlower(player, slower) {
  objectsArray = objectsArray.filter((el) => el.id != slower.data.values.spawnID);
  slower.destroy();
  slowOtherPlayers(player);
}

function slowOtherPlayers(player) {
  let otherPlayers = getOtherPlayers(player.id);
  otherPlayers.forEach(player => {
    clearInterval(player.slowInterval);
    clearTimeout(player.slowTimeout);
    setAnimSlow(player);
    player.speed = 0.5;
    player.slowTimeout = setTimeout(resetPlayerSpeed, 10000, player);
    startCounterSlow(player);
  });
}

function startCounterSlow(player) {
  player.slowCount = 10000;
  player.slowInterval = setInterval(changeCountdownSlow, 1000, player);
}

function changeCountdownSlow(player) {
  player.slowCount -= 1000;
  let element = document.getElementById(player.slowElement);
  element.innerHTML = (player.slowCount / 1000);
  if (player.slowCount == 0) {
    clearInterval(player.slowInterval);
  }
  checkPowerups();
}
//Coins
function collectCoin(player, coin) {
  //console.log(coin);
  objectsArray = objectsArray.filter((el) => el.id != coin.data.values.spawnID);
  // console.log("spawnID: " + coin.data.values.spawnID);
  // console.log(JSON.stringify(objectsArray));
  coin.destroy();
  playCoinSound();
  player.score += 10;
  updateScores()
  player.followText.setText(player.name + "\n" + player.score);
}

//Stars
function collectStar(player, star) {
  objectsArray = objectsArray.filter((el) => el.id != star.data.values.spawnID);
  star.destroy();
  playStarSound();
  collPlayer(player);
}

function collPlayer(player) {
  clearInterval(player.collInterval);
  clearTimeout(player.collTimeout);
  player.platformCollider.active = false;
  setAnimStar(player);
  player.collTimeout = setTimeout(resetPlayerColl, 10000, player);
  startCounterColl(player);
}

function startCounterColl(player) {
  player.collCount = 10000;
  player.collInterval = setInterval(changeCountdownColl, 1000, player);
}

function changeCountdownColl(player) {
  player.collCount -= 1000;
  let element = document.getElementById(player.collElement);
  element.innerHTML = (player.collCount / 1000);
  if (player.collCount == 0) {
    clearInterval(player.collInterval);
  }
  checkPowerups();
}

function resetPlayerColl(player) {
  player.platformCollider.active = true;
  resetAnim(player);
}

// Other functions for Items
function updateScores() {
  updateScoreboard(playersArray);
}

async function spawnItems() {
  let data = await getCoords();
  let i = getRandomNumber(0, data.length);
  let countObjects = slowers.countActive(true) + boosters.countActive() + stars.countActive(true);
  if (countObjects < data.length && countObjects < MAXITEMS) {
    if (objectsArray.some(c => c.id == data[i].id)) {
      //console.log(data[i] + "exists!");
      spawnItems();
    } else {
      spawnItem(data[i]);
      objectsArray.push(data[i]);
      //console.log(JSON.stringify(data[i]) + "spawned");
    }
  }
  else{
    console.log("All coords used");
  }
}

function spawnItem(data) {
  let i = SPAWNARRAY[Math.floor(Math.random()*SPAWNARRAY.length)];
  switch(i){
    case 1:
      spawnBooster(data);
      break;
    case 3: 
      spawnSlower(data);
      break;
    case 4: 
      spawnStar(data);
      break;
    default:
      console.error();
  }
}
async function spawnCoins() {
  let data = await getCoords();
  let i = getRandomNumber(0, data.length);
  let countObjects = coins.countActive(true);
  //console.log(countObjects);
  if (countObjects < data.length && countObjects < MAXCOINS) {
    if (objectsArray.some(c => c.id == data[i].id)) {
      //console.log(data[i] + "exists!");
      spawnCoins();
    } else {
      spawnCoin(data[i]);
      objectsArray.push(data[i]);
      //console.log(JSON.stringify(data[i]) + "spawned");
    }
  }
  else{
    console.log("All coords used");
  }
}


function getCoords() {
  return fetch('/assets/coords.json')
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    });
}


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getOtherPlayers(id) {
  let otherPlayers = [];
  playersArray.forEach(e => {
    if (e.id != id) {
      otherPlayers.push(e);
    }
  });
  return otherPlayers;
}
function resetAnim(player){
  if(player.speed == 1 && player.platformCollider.active == true)
  {
      player.animturn = "turn";
      player.animleft ="left";
      player.animright ="right";
  }
}
function setAnimSpeed(player){
  player.animturn = "turn_speed";
  player.animleft ="left_speed";
  player.animright ="right_speed";
}
function setAnimSlow(player){
  player.animturn = "turn_slow";
  player.animleft ="left_slow";
  player.animright ="right_slow";
}
function setAnimStar(player){
  player.animturn = "turn_star";
  player.animleft ="left_star";
  player.animright ="right_star";
}
// function hitBomb(player, bomb) {
//   this.physics.pause();

//   player.setTint(0xff0000);

//   //player.anims.play('turn');

//   gameOver = true;
// }


