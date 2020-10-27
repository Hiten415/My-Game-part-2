//Race to Fortune Code

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var doctor;
var bg, ybiker, obiker, doctordriver, horsey, police, tree;
var bg;
var count;
var gameOver, restart;
//create Obstacle and Cloud Groups
var ObstaclesGroup;

function preload() {
  bgimg = loadImage("images/bgr.png");
  yBiker = loadImage("images/BikeYoung.png");
  oBiker = loadImage("images/BikeOld.png");
  doctordriver = loadImage("images/Driver.png");
  horsey = loadImage("images/Horseeman.png");
  cycler = loadImage("images/PlayerCycle.png");
  police = loadImage("images/Police.png");
  tree = loadImage("images/Tree.png");
}

function setup() {
  createCanvas(1550, 750);

  bg = createSprite(700, 400);
  bg.addImage("bgimage", bgimg);
  bg.scale = 2.36;
  bg.y = height / 2;

  doctor = createSprite(400, 700, 50, 50);
  doctor.shapeColor = "red";
  //set collision radius for the doctor
  doctor.setCollider("circle", 0, 0, 30);

  //create Obstacle Group
  ObstaclesGroup = createGroup();

  //score
  count = 0;
}

function draw() {
  background(0);

  

  if (gameState === PLAY) {
    //move the bg
    bg.velocityY = (6 + 3 * count / 100);
    //scoring
    count = Math.round(World.frameCount / 4)
    //spawn obstacles
    spawnObstacles();
    //End the game when doctor is touching the obstacle
    if (ObstaclesGroup.isTouching(doctor)) {

      gameState = END;

    }

    bg.velocityY = 4;



    if (bg.y > 600) {
      bg.y = height / 2;
    }
  }

  else if (gameState === END) {


    //set velocity of each game object to 0

    doctor.velocityY = 0;
    doctor.velocityX = 0;
    //ObstaclesGroup.setVelocityXEach(0);

    bg.velocityY = 0;

    //place gameOver and restart icon on the screen
    gameOver = createButton("gameOver");
    restart = createButton("restart");
    gameOver.position(725, 375);
    restart.position(525, 375);

    //set lifetime of the game objects so that they are never destroyed
    //ObstaclesGroup.setLifetimeEach(-1);

  }





  //display score



  doctor.x = mouseX;

  drawSprites();

  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
  fill(250);

 

  text("Score: " + count, 1400, 40);

  text(mouseX + ", " + mouseY, 30,30);
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(random(130,1300),0,10,40);
    obstacle.shapeColor = "blue";
    obstacle.velocityY = (6 + 3*count/100);

    //generate random obstacles
    ///var rand = Math.round(random(1,6));


    //assign scale and lifetime to the obstacle
    //obstacle.scale = 0.5;
   // obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}