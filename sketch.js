var mario,bullet,coin,cloud,ground,gameover,restart,cloud,enemy,obstacles,instructions;
var marioImg,backgroundImg,cloudImg,coinImg,gameoverImg,restartImg,obstaclesImg,groundImg,enemyImg,bulletImg,instructionsImg,marioDeadImg;
  var PLAY=1,END=0,gameState=PLAY;
  var score =0;


function preload() {
 marioImg=loadAnimation("images/mario2.png","images/mario1.png")
coinImg=loadImage("images/coin.png");
backgroundImg=loadImage("images/bg.png")
cloudImg=loadImage("images/cloud.png")
gameoverImg=loadImage("images/gameOver.png")
restartImg=loadImage("images/restart.png")
obstaclesImg=loadImage("images/pipes.png")
enemyImg=loadAnimation("images/enemy1.png","images/enemy2.png")
groundImg=loadImage("images/ground.png")
bulletImg=loadImage("images/bullet.png")
instructionsImg=loadImage("images/text.png")
marioDeadImg=loadImage("images/mario_dead.png")
}
function setup() {
createCanvas(800,400);



  
ground = createSprite(0,400,1200,20);
ground.x = ground.width /2;
ground.velocityX = -4;
ground.addImage(groundImg);
ground.scale=1.5

invisibleGround = createSprite(0,390,1200,20);
invisibleGround.visible = false;

mario = createSprite(100,240,20,50);
mario.addAnimation("running",marioImg);
mario.scale=0.5
mario.collide(invisibleGround)

instructions=createSprite(400,200,50,10);
instructions.addImage(instructionsImg)

enemyGroup=new Group();
obstaclesGroup=new Group();
coinGroup=new Group();
cloudGroup=new Group();
bulletGroup=new Group();
}

function draw() {
  background(backgroundImg);  
  text("Score :"+ score, 550,50);

  if (gameState===PLAY){
  
  
    
    if(keyDown ("up")&& mario.y>=330) {
      mario.velocityY = -20;
    instructions.visible=false;
    }
    
    mario.velocityY = mario.velocityY + 0.8
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
    spawnCoins();
  spawnObstacles();
  spawnEnemy();
  spawnClouds();
  spawnBullets();
  if (coinGroup.isTouching(mario)) {
    score=score +1
    coinGroup.destroyEach()
  }
    if(obstaclesGroup.isTouching(mario)||bulletGroup.isTouching(mario)){
      gameState=END;
    }
  if (bulletGroup.isTouching(enemyGroup)) {
    enemyGroup.destroyEach()
    bulletGroup.destroyEach()
  }
    else if (gameState===END){
      mario.changeImage("dead",marioDeadImg);
    ground.velocityX=0;
    mario.velocityY=0;
    obstaclesGroup.setVelocityEach(0)
    coinGroup.setVelocityEach(0)
    enemyGroup.setVelocityEach(0)
    cloudGroup.setVelocityEach(0)
    bulletGroup.setVelocityEach(0)

    obstaclesGroup.setLifetimeEach(-1)
    coinGroup.setLifetimeEach(-1)
    enemyGroup.setLifetimeEach(-1)
    cloudGroup,setLifetimeEach(-1)
    bulletGroup.setLifetimeEach(-1)
    }
  
    mario.collide(invisibleGround)

  drawSprites();
}
function spawnCoins() {
  if (frameCount % 38=== 0) {
    coin = createSprite(600,120,40,10);
    coin.addImage(coinImg);
    coin.velocityX = -3;
    coin.lifetime =600;
    coinGroup.add(coin);
  }
  
}

function spawnEnemy() {
  if(frameCount % 80 === 0) {
   enemy = createSprite(600,320,10,40);
   enemy.addAnimation("running",enemyImg);
    enemy.velocityX = -4;      
    enemy.scale = 0.2;
    enemy.lifetime = 300;
    enemy.depth=mario.depth;
    enemyGroup.add(enemy);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
  obstacles = createSprite(600,305,10,40);
  obstacles.addImage(obstaclesImg);
  obstacles.velocityX = -5;      
    obstacles.scale = 0.5;
    obstacles.lifetime = 300;
    obstaclesGroup.add(obstacles);
  }
}
function spawnClouds() {
  if(frameCount % 80 === 0) {
  cloud = createSprite(800,390,10,40);
  cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.lifetime = 300;
    cloudGroup.add(cloud);
  }
}

function spawnBullets() {
  if(keyDown("space")) {
  bullet= createSprite(200,305,20,50);
  bullet.addImage(bulletImg);
  bullet.velocityX = 6;
    bullet.lifetime = 300;
   bulletGroup.add(bullet);
  }
}
}