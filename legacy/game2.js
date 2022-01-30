let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
  let bombs;
  let platforms;
  let cursors;
  let score = 0;
  let score_player2 = 0;
  let gameOver = false;
  let scoreText;
  let scoreText_2;
  let speed = 1;
  let names = [];
  let controllers = [];
  let playersArray = [];
  
  let game;
  
  let counter = 1;
  
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
  
  let playerIcons = ["maxi", "mathias" , "jakob"];
  
  // $("document").ready(function () {
  //   document.getElementById("start-game-btn").onclick = function () {
  //     names.push("mathias");
  //     names.push("jakob");
  //     names.push("max");
  //     startGame();
  //   };
  //   document.getElementById("save-game-btn").onclick = function () {
  //     spawnCoins();
  //   }
  // });
  function initGame () {
    names.push("mathias");
    names.push("jakob");
    names.push("max");
    startGame();
  }
  
  function preload() {
    let image = getImagePlayer1() ?? "assets/jakob.png";
    let image2 = getImagePlayer2() ?? "assets/mathias.png";
    let image3 = getImagePlayer3() ?? "assets/maxi.png";

    this.load.image("sky", "assets/gras.png");
    this.load.image("stone", "assets/stone.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.image("jakob", image3);
    this.load.image("mathias", image);
    this.load.image("maxi", image2);
    this.load.image("player", "assets/jakob.png");
    this.load.image("coin", "assets/coin2.png")
  }
  
  function startGame() {
    game = new Phaser.Game(config);
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
      if (this.keyLeft.isDown) {
        this.player.setVelocityX(-160 * this.player.speed);
      } else if (this.keyRight.isDown) {
        this.player.setVelocityX(160 * this.player.speed);
      } else if (this.keyUp.isDown) {
        this.player.setVelocityY(-160 * this.player.speed);
      } else if (this.keyDown.isDown) {
        this.player.setVelocityY(160 * this.player.speed);
      } else {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
      }
    }
  }
  
  function create() {
    
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
    keysP2 = [keyI, keyJ, keyK, keyL];
    keysP3 = [keyAU, keyAL, keyAD, keyAR];
    keys = [keysP1, keysP2, keysP3];
  
    //  A simple background for our game
    this.add.image(400, 300, "sky");
  
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  
    //  Now let's create some ledges
    platforms.create(600, 400, "stone").setScale(0.5).refreshBody();
    platforms.create(250, 250, "stone").setScale(0.5).refreshBody();
    platforms.create(750, 220, "stone").setScale(0.5).refreshBody();
  
    // The player and its settings
  
    // player = this.physics.add.sprite(500, 450, 'jakob').setScale(0.15);
    // player2 = this.physics.add.sprite(200, 400, 'mathias').setScale(0.15);
    // player3 = this.physics.add.sprite(150, 300, 'maxi').setScale(0.1);
  
    //  Player physics properties. Give the little guy a slight bounce.
    // player.setBounce(0.2);
    // player.setCollideWorldBounds(true);
  
    // player2.setBounce(0.2);
    // player2.setCollideWorldBounds(true);
  
    //  Our player animations, turning, walking left and walking right.
  
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    
    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
      key: "star",
      repeat: 2,
      setXY: { x: 150, y: 150, stepX: 266 },
    });
  
    coins = this.physics.add.group({
      key: "coin",
      repeat: 2,
      setXY: { x: 150, y: 450, stepX: 266 },
    });
    // stars.children.iterate(function (child) {
    //   //  Give each star a slightly different bounce
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });
    
    bombs = this.physics.add.group();
    
    this.physics.add.collider(stars, platforms);
    
    this.physics.add.collider(bombs, platforms);
    
  
    spawnCoin = () => {
      coins = this.physics.add.sprite(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), "coin");
      playersArray.forEach(e => {
        this.physics.add.overlap(e, coins, collectCoin, null, this);
      });
      counter++;
      }
  
      
  
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (name !== null) {
        let player = this.physics.add
          .sprite(500 - i * 50, 450, playerIcons[i])
          .setScale(0.1);
          player.setCollideWorldBounds(true);
          this.physics.add.overlap(player, stars, collectStar, null, this);
          this.physics.add.overlap(player, coins, collectStar, null, this);
          this.physics.add.collider(player, platforms);
          player.speed = 5;
          player.score = 0;
          player.id = i;
          playersArray.push(player);
          //alert(JSON.stringify(player));
          //alert(JSON.stringify(player.origin));
          
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
  }
  function getOtherPlayers(id){
    let otherPlayers = [];
    playersArray.forEach(e => {
      //alert(id + " + " + e.id);
      if(e.id != id) {
        otherPlayers.push(e);
      }
    });
    return otherPlayers;
  }
  function spawnCoins(){
   
    // coins = this.physics.add.group({
    //   key: "star",
    //   repeat: 2,
    //   setXY: { x: 450, y: 150, stepX: 266 },
    // });
    spawnCoin();
    //var coin = this.physics.add.sprite(200, 450, "star");
  }
  function collectCoin(player, coin){
    coin.disableBody(true, true);
    player.score += 10;
  }
  function collectStar(player, star) {
    //alert(player.type);
    star.disableBody(true, true);
  
    //  Add and update the score
    speed = 3;
    slowOtherPlayers(player.id);
    // scoreText.setText('Score: ' + score);
    if (stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 100, true, true);
      });
      
      // let x =
      //   player.x < 400
      //     ? Phaser.Math.Between(400, 800)
      //     : Phaser.Math.Between(0, 400);
  
      // let bomb = bombs.create(x, 16, "bomb");
      // bomb.setBounce(1);
      // bomb.setCollideWorldBounds(true);
      // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      // bomb.allowGravity = false;
    }
  }
  function slowOtherPlayers(id){
    
    let otherPlayers = getOtherPlayers(id);
    otherPlayers.forEach(e=> {
      e.speed = 0.5;
    });
  }
  function hitBomb(player, bomb) {
    this.physics.pause();
  
    player.setTint(0xff0000);
  
    //player.anims.play('turn');
  
    gameOver = true;
  }
  