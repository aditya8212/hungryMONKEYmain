
var mon, monkey_running
var banana ,bananaImage, ob, obstacleImage
var foode, obse,monke,ba
var score = 0;
var PLAY = 1;
var OVER = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  fin = loadAnimation("gameover.png");

  banan = loadImage("banana.png");
  obstac = loadImage("obstacle.png");
  gru = loadImage("ground2.png");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  gama = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600,300);
  
  ground = createSprite(0,250,1200,10);
  ground.addImage(gru);
  ground.velocityX = -6;
  ground.x = ground.width/2;
  //ground.lifetime = -1;
  
  monke = createGroup();
   
   mon = createSprite(40,240,10,10);
  mon.addAnimation("running",monkey_running);
  mon.scale = 0.1;
  monke.add(mon);
  
 invi = createSprite(300,255,600,5);
 invi.visible = false;

  obse = createGroup();
  foode = createGroup();
  
}

function draw() {
  background("lightskyblue");
  
  if(monke.isTouching(obse)){
      gameState = OVER;
  
  }

  var survivalTime = 0;
  stroke("darkblue");
  textSize(20);
  fill("red");
  text("score: " + score,400,50);
  
  
  stroke("white");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survival Time: " + survivalTime,400,30);
  
  if(gameState === PLAY){
     bana();
     obsta();
    
     if(ground.x < 0){
         ground.x = ground.width/2;
       }
     
     mon.velocityY = mon.velocityY + 0.8
  
    if(keyDown("space") && mon.y > 200){
        mon.velocityY = -13;
        jump.play();
    }
  
   if(foode.isTouching(monke)){
       foode.destroyEach();
       score = score+1;
       die.play();
   }
    
  mon.collide(invi);
  //monke.collide(obse);
    
  }
  
  if(gameState === OVER){
     mon.x = 300;
     mon.y = 150;
     //background("green");
     mon.addAnimation("running",fin);
     mon.scale = 0.9;
     obse.destroyEach();
     foode.destroyEach();
     //ground.visible = false;
     ground.velocityX = 0;
     gama.play();
  }
  
  
  drawSprites();
}


function bana(){
  if(frameCount%200 === 0){
     ba = createSprite(600,Math.round(random(80,150)));
     ba.addImage(banan);
     ba.scale = 0.1;
     ba.velocityX = -3;
     ba.lifetime = 200;
     foode.add(ba);
  }
}



function obsta(){
  if(frameCount%200 === 0){
     ob = createSprite(600,230,10,10);
     ob.addImage(obstac);
     ob.velocityX = -6;
     ob.scale = 0.1;
     obse.add(ob);
  }
}
