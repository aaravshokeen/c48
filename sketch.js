var bg,bgImage;
var player,playerImage;
var boatSound;
var fish,fishImage1,fishImage2;
var leftfence,rightfence;
var leftimg,rightimg;
var gamestate="play";
var gameover,gameoverImage
var fishGroup;
var litter,litterImage1,litterImage2,litterImage3,litterGroup;
var score=0;
var count=0;
var life=3;
var lifeImage;
var hitsound,scoresound;
var gameoversound;





function preload(){
  bgImage=loadImage("bg1.png");
  playerImage=loadImage("boat.png")
  fishImage1=loadAnimation("fish1.png","fish2.png");
  fishImage2=loadAnimation("tile000.png","tile001.png","tile002.png");
  leftimg=loadImage("leftfence.png");
  gameoverImage=loadImage("gameover.png");
  rightimg=loadImage("rightfence.png");
  boatSound=loadSound("boatsound.mp3");
  litterImage1=loadImage("litter1.png");
  litterImage2=loadImage("litter2.png");
  litterImage3=loadImage("litter3.png");
  lifeImage=loadImage("life.png");
  hitsound=loadSound("hitsound.wav");
  scoresound=loadSound("scoresound.wav");
  gameoversound=loadSound("gameover.mp3")
}

function setup() {
  createCanvas(1000,700);


  bg=createSprite(500,300,1000,600);
  bg.addImage(bgImage);
  bg.scale=1.5;
 
  
  player=createSprite(500,600,50,50);
  player.addImage(playerImage);
  player.scale=0.65;
  

  leftfence=createSprite(970,350,30,1000);
  leftfence.addImage(rightimg);
  rightfence=createSprite(30,350,30,1000);
  rightfence.addImage(leftimg);

  //leftfence.debug=true;
  //rightfence.debug=true;
  //player.debug=true;

  leftfence.setCollider("rectangle",0,0,80,1000)
  rightfence.setCollider("rectangle",0,0,80,1000)
  player.setCollider("rectangle",0,0,90,player.height)
  
  
  gameover=createSprite(500,300,100,100);
  gameover.addImage(gameoverImage);

  fishGroup=new Group();
  litterGroup=new Group();

}

function draw() {
  background(0);
  drawSprites();

  player.collide(leftfence);
  player.collide(rightfence);


  if(gamestate==="play"){
    gameover.visible=false

    fill("white");
    textSize(30);
    text("Score : "+score,450,50)

    if(player.isTouching(litterGroup)){
      scoresound.play();
      litterGroup.destroyEach();
      score=score+5;
    }
    count=count+1;
    bg.velocityY=5+count/100;
    if(bg.y>600){
      bg.y=300;
  
    }  
  
    if(keyDown("left")){
      player.x=player.x-5
    }
  
    if(keyDown("right")){
      player.x=player.x+5
    }
    if(keyDown("up")){
      //boatSound.play();
      player.y=player.y-5
    }
    if(keyDown("down")){
      player.y=player.y+5
    }
    var num=Math.round(random(1,2));
    if(num===1){
      spawnFish();
    }
    if(num===2){
      spawnLitter();
    }
    if(player.isTouching(fishGroup)){
      hitsound.play();
      fishGroup.destroyEach();
      life=life-1
    }
    if(life===3){
      image(lifeImage,110,20,40,40);
      image(lifeImage,155,20,40,40);
      image(lifeImage,200,20,40,40);
    }
    if(life===2){
      image(lifeImage,110,20,40,40);
      image(lifeImage,155,20,40,40);
     
    }
    if(life===1){
      image(lifeImage,110,20,40,40);
      
     
    }
    if(life===0){
      gameoversound.play();
      gamestate="end";
    }
    }
    
  else if(gamestate==="end"){
    bg.velocityY=0;
    fishGroup.setVelocityYEach(0);
    gameover.visible=true;


  }
  
  
  
}

  function spawnFish(){
    if(frameCount%150===0){
      fish=createSprite(500,0,10,40);
      var num=Math.round(random(1,2));
      if(num===1){
        fish.addAnimation("1",fishImage1);
        fish.scale=0.25;
      }
      if(num===2){
        fish.addAnimation("2",fishImage2);
        fish.scale=0.8;
      }
      
      fish.x=random(50,950)
      fish.velocityY=5+count/100;
      fishGroup.add(fish)
    }
  }

  function spawnLitter(){
    if(frameCount%150===0){
      litter=createSprite(500,0,10,40);
      var num=Math.round(random(1,3));
      litter.scale=0.15;
      switch(num){
        case 1:litter.addImage(litterImage1);
        litter.scale=0.2;
        break;
        case 2:litter.addImage(litterImage2);
        break;
        case 3:litter.addImage(litterImage3);
        break;
      }
      litter.x=random(50,950)
      litter.velocityY=5+count/100;
      litterGroup.add(litter)

    }
  }