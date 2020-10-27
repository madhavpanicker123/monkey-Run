//creating the variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup,ground
var score=0,jungleImage,jungle,song,gameover
var PLAY=1
var END=0
var gameState=PLAY
function preload(){
  
  //loading all images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
jungleImage = loadImage("jumgle.jpg")
  song=loadSound("sound.mp3")

}



function setup() {
  
createCanvas(600,600)
//creating the background
   jungle=createSprite(300,400,10,20)
          jungle.addImage(jungleImage)
  jungle.scale=0.98
  jungle.x=jungle.width/2
  //creating the new groups
  bananaGroup=new Group();
    
obstacleGroup=new Group();
 //creating the monkey sprite
       monkey=createSprite(50,550,10,20)
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.2;
monkey.debug=false
  //giving a song to play
   if(gameState===PLAY){
     song.play()
   }

}


function draw() {
//an infinite game world
 jungle.velocityX=-4
  if(jungle.x<0){
    jungle.x=jungle.width/2
  }
  //the gameStates
   if(gameState===PLAY){
     background("darkgreen")
    if(monkey.isTouching(bananaGroup)){
    score=score+2
    bananaGroup.destroyEach(); }  
  food();
  rocks();
  
    console.log(monkey.y)
     //providing monkey with velocity
   if(keyDown("space") &&monkey.y>=503) { monkey.velocityY = -20 ; }
   monkey.velocityY = monkey.velocityY + 0.5;


 
  ground=createSprite(400,570,900,10)
  ground.visible=false
  monkey.collide(ground)
    //enidng hte game if monkey touches rock
        if(monkey.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach();
          gameState=END  }
     
   }
  else if(gameState===END){
monkey.visible=false
    banana.visible=false
    //reset the game
if(keyDown("r")){
  reset()
}
   //stoping the background from moving
jungle.velocityX=0
   
  }

    
   
drawSprites();
  //the scoring system
  fill("yellow")
  textSize(25)
  textFont("algerian")
text("score: "+score,490,100)
  if(monkey.isTouching(bananaGroup)){
    score=score+2
    bananaGroup.destroyEach(); }  
    if(gameState===END){
      fill("yellow")
      textSize("25")
      text("GAME OVER; press r to restart",50,300)
  }
}
//creating the banana  sprite 
function food(){
  if(frameCount%130===0){
  banana=createSprite(600,random(200,300),10,20)
  banana.addImage(bananaImage)
  banana.velocityX=-4
  banana.scale=0.2
  bananaGroup.add(banana)
}}
//creating the obstacle sysytem
function rocks(){
  if(frameCount%200===0){
  obstacle=createSprite(600,570,20,30)
obstacle.addImage(obstacleImage)  ;
  obstacle.velocityX=-4
  obstacle.scale=0.2
    obstacle.collide(ground);
    obstacleGroup.add(obstacle)
}}
//creating a seperate group for reset
function reset(){
  gameState=PLAY
  obstacleGroup.destroyEach()
  bananaGroup.destroyEach()
       monkey=createSprite(50,550,10,20)
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.2;
  score=0
}


