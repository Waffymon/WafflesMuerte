var tower,tower_image;
var fantasma,fantasma_image;
var gamestates ="start";
var puertaimg;
var balconimg;
var falsosgrup;
var falsogrup;
var puertasgrup;
var balcongrup;

function preload(){  
  tower_image=loadImage("tower.png");
  fantasma_image=loadAnimation("ghost-standing.png");
  puertaimg=loadImage("door.png");
  balconimg=loadImage("climber.png");
  
}

function setup(){
  createCanvas(600,800);
  tower=createSprite(300,400);
  tower.addImage(tower_image);
  
  
  fantasma=createSprite(300,600);
  fantasma.addAnimation("fantasma",fantasma_image);
  fantasma.scale=0.4;
  fantasma.debug=false;
  fantasma.setCollider("rectangle",-20,40,200,250);
  
  falsosgrup=new Group();
  falsogrup=new Group();
  puertasgrup=new Group();
  balcongrup=new Group();
}

function draw() {
  background("black");
  
  drawSprites();
  console.log(tower.y);
              
  if(gamestates==="start"&&keyDown ("w")){
       gamestates="plai";
  }
  if(gamestates==="plai"){
    tower.velocityY=5;
    if(tower.y>400){
      tower.y=tower.height/4;
    }
         
      if(keyDown("w")) {
        fantasma.velocityY=-10}
    puertas();
   fantasma.velocityY = fantasma.velocityY + 0.7;
    
    if(keyDown("a")){
    fantasma.x=fantasma.x-5;
  }
  if(keyDown("d")){
    fantasma.x=fantasma.x+5;
    
  }
    if(fantasma.isTouching(falsosgrup)){
      fantasma.velocityY=0;
    }
    if(fantasma.isTouching(falsogrup)){
      gamestates="end";
    }
  }
  
 

  if(gamestates==="end"){
  tower.velocityY=0;
  fantasma.velocityY=5;
  falsogrup.setVelocityYEach(0);
  falsosgrup.setVelocityYEach(0);
  puertasgrup.setVelocityYEach(0);
  balcongrup.setVelocityYEach(0);
  textSize(32);
  fill(0,0,0);
  text("You killed the muerte",150,400);
  text("Press W to restart",150,450);
  if(keyDown("w")){
    restart();
  }
  
  
  }
  
}
function puertas(){
  if(frameCount%100===0){
   var puerta=createSprite(random(70,500),0,20,20);
   puerta.addImage(puertaimg);
    puerta.velocityY=5;
    puertasgrup.add(puerta);
    var balcon=createSprite(puerta.x,60,20,20);
    balcon.addImage(balconimg);
    balcon.velocityY=5;
    balcon.scale=0.75;
    balcon.depth=fantasma.depth;
    puerta.depth=fantasma.depth;
    fantasma.depth=fantasma.depth+1;
    balcongrup.add(balcon);
    var spritefalso=createSprite(balcon.x,50,70,10);
    spritefalso.velocityY=5;
    falsosgrup.add(spritefalso);
    var spritefalso2=createSprite(balcon.x,70,70,10);
    spritefalso2.shapeColor="red";
    spritefalso2.velocityY=5;
    falsogrup.add(spritefalso2);
    
    spritefalso2.visible=false;
    spritefalso.visible=false;
    
  }
}
function restart(){
  gamestates="start";
  falsogrup.destroyEach();
  falsosgrup.destroyEach();
  puertasgrup.destroyEach();
  balcongrup.destroyEach();
  fantasma.velocityY=0;
  fantasma.x=300;
  fantasma.y=600;
  ////////////////////////
}
