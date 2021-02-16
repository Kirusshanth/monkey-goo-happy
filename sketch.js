var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground, invisibleGround;
var GameState;
var PLAY, END;

function preload() {
  monkey_running = 
    loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(600, 600);

  PLAY = 1;
  END = 0;
  GameState = PLAY;
  //Creating groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  //Creating sprites
  monkey = createSprite(170, 470, 50, 50);
  monkey.addAnimation("runningMonkey", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(350, 505, 800, 10);
  ground.x = ground.width / 2;
  
  invisibleGround = createSprite(350, 510, 800, 10);
  invisibleGround.x = ground.width / 2;
}


function draw() {
  background("white");

  if (GameState === PLAY) {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space")&&monkey.y>100) {
      monkey.velocityY = -20;
    }  
    //Adding score
    score = Math.round(frameCount / 3);
    
    if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
  }
   //Calling the functions here
   food();
   obstacle();
    //If monkey hits the rock, gamestate should change to end
    if (monkey.isTouching(obstacleGroup)) {
      GameState = END;
    }
} 
  
  if (GameState === END) {
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }


  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(invisibleGround);
  //Displaying the score
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:" + score, 500, 150);
  
  drawSprites();
}

function food() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 110, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -5;
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 400, 400);

  }

}

function obstacle() {

  if (frameCount % 160 === 0) {
    var obstacle = createSprite(600, 465, 23, 32);
    obstacle.velocityX = -6
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle", 0, 0, 200)
  }

}