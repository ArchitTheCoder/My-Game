// var Engine = Matter.Engine;
// var World = Matter.World;
// var Bodies = Matter.Bodies;
// var Body = Matter.Body;
// var Render = Matter.Render;


// var engine, world;

var player, playerNormal, playerAttack, playerDead, playerJump, playerFalling, playerBow, playerAttackS;

var lockIMG, keyIMG, lock, key, gamearrow, gaIMG;

var background1, bg1, background2, bg2;

var guard1, guard2, gIMG, gIMG2;

var invis1, invis2;
var s2invis1;

var life = 3;

let health = 100;

var gameState = 'stage1';

function preload() {
  playerNormal = loadAnimation(
    "images/player/playerIdle1.png",
    "images/player/playerIdle2.png",
    "images/player/playerIdle3.png",
    "images/player/playerIdle4.png",
    "images/player/playerIdle5.png")

  playerAttack = loadAnimation(
    "images/player/playerAttack1.png",
    "images/player/playerAttack2.png",
    "images/player/playerAttack3.png")


  playerFalling = loadImage("images/player/playerFalling.png")

  playerJump = loadImage("images/player/playerJump.png")

  //Utilites
  lockIMG = loadImage("images/utilities/lock.png")
  keyIMG = loadImage("images/utilities/key.png")
  gaIMG = loadImage("images/utilities/gameArrow.png")


  //Guards
  gIMG = loadImage("images/npcs/guardLeft.png")
  gIMG2 = loadImage("images/npcs/guardRight.png")


  //Background for stage 1
  background1 = loadImage("images/backgrounds/bg1.png")

  //For Stage 2
  background2 = loadImage("images/backgrounds/bg2.jpg")



}



function setup() {
  var canvas = createCanvas(800, 800);

  // engine = Engine.create()


  // world = engine.world;

  bg1 = createSprite(400, 400, 800, 800)
  bg1.addImage('background', background1)
  bg1.scale = 1.5


  bg2 = createSprite(400, 350, 800, 800)
  bg2.visible = false;
  bg2.addImage("backgroun", background2)


  gamearrow = createSprite(470, -560, 50, 50)
  gamearrow.addImage(gaIMG)
  gamearrow.scale = 0.3

  guard1 = createSprite(520, -550, 50, 50)
  guard1.addImage(gIMG)
  guard1.scale = 0.2;
  guard1.velocityX = -3
  guard1.setCollider('rectangle', 0, 0, 50, 50)

  guard2 = createSprite(420, -550, 50, 50)
  guard2.addImage(gIMG2)
  guard2.scale = 0.2;
  guard2.velocityX = 3
  guard2.setCollider('rectangle', 0, 0, 50, 50)


  lock = createSprite(-340, 300, 50, 50)
  lock.addImage(lockIMG)
  lock.scale = 0.3

  player = createSprite(400, 400, 100, 100)
  player.addAnimation("idling", playerNormal)
  player.scale = 1.5;

  playerAttackS = createSprite(player.x, player.y, 100, 100)
  playerAttackS.visible = false
  playerAttackS.scale = 1.5;
  playerAttackS.addAnimation("attacking", playerAttack)


  invis1 = createSprite(235, -560, 10, 70)
  invis1.visible = false;
  invis2 = createSprite(705, -560, 10, 70)
  invis2.visible = false;



  s2invis1 = createSprite(60, 285, 100, 20)
  s2invis2 = createSprite(150, 305, 100, 20)
  s2invis3 = createSprite(240, 325, 100, 20)
  s2invis4 = createSprite(330, 345, 100, 20)
  s2invis5 = createSprite(930, 395, 100, 20)




}

function draw() {
  background(0);


  console.log(gameState)

  if (gameState === 'stage1') {
    //Player Movement
    if (keyDown("w")) {
      player.y = player.y - 15
    }
    if (keyDown("s")) {
      player.y = player.y + 15
    }
    if (keyDown("a")) {
      player.x = player.x - 15
    }
    if (keyDown("d")) {
      player.x = player.x + 15
    }


    //Attacking
    if (keyDown("h")) {

      playerAttackS.visible = true
      player.visible = false;
      playerAttackS.x = player.x
      playerAttackS.y = player.y

    } else {
      player.visible = true;
      playerAttackS.visible = false;
    }
  }


  //Camera borders

  if (gameState === 'stage1') {
    if (player.y <= -190) {
      camera.position.x = player.x

    } else if (player.y >= 980) {
      camera.position.x = player.x

    } else if (player.x <= 0) {
      camera.position.y = player.y

    } else if (player.x >= 795) {
      camera.position.y = player.y

    } else {
      camera.position.x = player.x
      camera.position.y = player.y
    }

    s2invis1.visible = false;
    s2invis2.visible = false;
    s2invis3.visible = false;
    s2invis4.visible = false;
    s2invis5.visible = false;

  }


  //Guard Random Movement

  if (guard1.isTouching(invis1)) {
    guard1.velocityX = 4;
    guard1.addImage(gIMG2)
  }
  if (guard1.isTouching(gamearrow)) {
    guard1.velocityX = -4;
    guard1.addImage(gIMG)
  }

  if (guard2.isTouching(invis2)) {
    guard2.velocityX = -4;
    guard2.addImage(gIMG)
  }
  if (guard2.isTouching(gamearrow)) {
    guard2.velocityX = 4;
    guard2.addImage(gIMG2)
  }



  if (gameState === 'stage2') {

    createCanvas(1000, 650)
    background(0)

    player.collide(s2invis1)
    player.collide(s2invis2)
    player.collide(s2invis3)
    player.collide(s2invis4)
    player.collide(s2invis5)


    camera.position.x = 400;
    camera.position.y = 400;

    if (keyDown("a")) {
      player.x = player.x - 10
    }
    if (keyDown("d")) {
      player.x = player.x + 10
    }


    if (player.y < 100) {

    } else if (keyDown("space")) {
      player.velocityY = -8
    }

    player.velocityY = player.velocityY + 0.8

    s2invis1.visible = false;
    s2invis2.visible = false;
    s2invis3.visible = false;
    s2invis4.visible = false;

    s2invis5.visible = false;

    
    if (player.y > 366) {
      player.x = 40
      player.y = 235
      life = life - 1
    }

    if (life === 0) {
      gameState = 'end'
    }

    if (player.x === 930 && player.y === 395) {
      gameState = 'done'
    }
  }

  


  drawSprites();

  if (gameState === 'end') {
    bg1.visible = false;
    bg2.visible = false;
    player.visible = false;

    camera.position.x = 400;
    camera.position.y = 400;


    textSize(15)
    fill("white")
    text("You failed", 400, 400)
  }


  if (gameState === 'done') {
    bg1.visible = false;
    bg2.visible = false;
    player.visible = false;

    camera.position.x = 400;
    camera.position.y = 400;


    textSize(35)
    fill("white")
    text("Great Job You Finished The Game", 400, 400)
  }


  if (player.isTouching(gamearrow)) {
    bg2.visible = true;
    bg2.scale = 1.3;

    gameState = 'stage2';

    bg1.visible = false;
    lock.visible = false;

    player.x = 40
    player.y = 235


  }

  textSize(15)
  fill("white")
  text("Health:" + health, player.x - 30, player.y + 50)
  text("Life(s):" + life, player.x - 30, player.y + 70)


  if (keyDown("h") && player.isTouching(guard1)) {
    guard1.x = 13193
    guard1.y = 234234

  } else if (player.isTouching(guard1)) {
    health = health - 10
    player.y = player.y + 60
    textSize(15)
    fill("red")
    text("Health:" + health, player.x - 30, player.y + 50)
  }


  if (keyDown("h") && player.isTouching(guard2)) {
    guard2.x = 13193
    guard2.y = 234234

  } else if (player.isTouching(guard1)) {
    health = health - 10
    player.y = player.y + 60
    textSize(15)
    fill("red")
    text("Health:" + health, player.x - 30, player.y + 50)
  }





}

