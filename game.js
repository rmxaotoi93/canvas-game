/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/


let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady, thiefReady, thiefReady2;
let bgImage, heroImage, monsterImage, thiefImage, thiefImage2;

let startTime = Date.now();
let SECONDS_PER_ROUND = 30;
let elapsedTime = 0;
let score = 0;
let stage = 1;
let gameOver = true;
let history = []
let name = ''
function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background.png";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/pet.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/pet-food.png";

  thiefImage = new Image();
  thiefImage.onload = function () {
    // show the monster image
    thiefReady = true;
  };
  thiefImage.src = "images/people.png";

  thiefImage2 = new Image();
  thiefImage2.onload = function () {
    // show the monster image
    thiefReady2 = true;
  };
  thiefImage2.src = "images/monster.png";

  gameOver = false
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

let heroX = canvas.width / 2;
let heroY = canvas.height / 2;

let monsterX = Math.floor(Math.random()*(canvas.width-32)) 
let monsterY = Math.floor(Math.random()*(canvas.height-32))

let thiefX = Math.floor(Math.random()*(canvas.width-32)) 
let thiefY = Math.floor(Math.random()*(canvas.height-32))

let thiefDirectionX = 1;
let thiefDirectionY = 1;

let thiefX2 = Math.floor(Math.random()*(canvas.width-32)) 
let thiefY2 = Math.floor(Math.random()*(canvas.height-32))

let thiefDirectionX2 = 1;
let thiefDirectionY2 = 1;
/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */

let update = function () {
  // Update the time.
  if(gameOver){
    return
  }
  if(elapsedTime >= SECONDS_PER_ROUND){  
    
    return
    
  }
  if (
    heroX <= (thiefX + 20)
    && thiefX <= (heroX + 20)
    && heroY <= (thiefY + 25)
    && thiefY <= (heroY + 25)
  ){
    gameOver = true;

    
  }
  if (
    heroX <= (thiefX2 + 20)
    && thiefX2 <= (heroX + 20)
    && heroY <= (thiefY2 + 25)
    && thiefY2 <= (heroY + 25)
  ){
    gameOver = true;

    
  }

  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  
  if (38 in keysDown) { // Player is holding up key
    heroY -= 5;
  }
  if (40 in keysDown) { // Player is holding down key
    heroY += 5;
  }
  if (37 in keysDown) { // Player is holding left key
    heroX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    heroX += 5;
  }
  thiefX += thiefDirectionX * 2;
  thiefY += thiefDirectionY * 2;

  if (thiefX > canvas.width - 30 || thiefX < 0) {
    thiefDirectionX = -thiefDirectionX;
  }

  if (thiefY > canvas.height - 30 || thiefY < 0) {
    thiefDirectionY = -thiefDirectionY;
  }
  
  thiefX2 += thiefDirectionX2 * 4;
    thiefY2 += thiefDirectionY2 * 4;

  if (thiefX2 > canvas.width - 30 || thiefX2 < 0) {
    thiefDirectionX2 = -thiefDirectionX2;
  }

  if (thiefY2 > canvas.height - 30 || thiefY2 < 0) {
    thiefDirectionY2 = -thiefDirectionY2;
  }

  if(heroX < 0){
    heroX=0
  }else if (heroX > canvas.width-32){
    heroX = canvas.width-32
  }
  if(heroY < 0){
    heroY=0
  }else if (heroY > canvas.height-32){
    heroY = canvas.height-32
  }

  
  // Check if player and monster collided. Our images
  // are about 32 pixels big.
  if (
    heroX <= (monsterX + 32)
    && monsterX <= (heroX + 32)
    && heroY <= (monsterY + 32)
    && monsterY <= (heroY + 32)
  ) {
    score++;
    SECONDS_PER_ROUND += 1;
    if(score % 3 == 0){
      stage++;
      console.log('stage: '+ stage)
    }
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
     monsterX = Math.floor(Math.random()*(canvas.width-32)) 
     monsterY = Math.floor(Math.random()*(canvas.height-32)) 
  } 
  
};

function reset(){
  
  heroX = canvas.width / 2;
  heroY = canvas.height / 2;
  
  if(name == "" && score == ""){
    document.getElementById("showName","high-score").innerHTML = ``
  }
  else{
    document.getElementById("showName","high-score").innerHTML = `Player: ${name}, High score: ${score}`

  }
  startTime = Date.now();
  //SECONDS_PER_ROUND = 10; // error happen cz its define with const 

  score = 0;
  stage = 1;
  gameOver=false;

  thiefX = Math.floor(Math.random()*(canvas.width-32)) 
  thiefY = Math.floor(Math.random()*(canvas.height-32))

  thiefX2 = Math.floor(Math.random()*(canvas.width-32)) 
  thiefY2 = Math.floor(Math.random()*(canvas.height-32))
  
  history.unshift(name)
  document.getElementById("history").innerHTML = `Last player: ${history}`

  if(history.length == 4){
    history.pop();
    
  }
  document.getElementById("history").innerHTML = `Last player: ${history}`
}


/**
 * This function, render, runs as often as possible.
 */
thiefReady2 = false
var render = function () {

  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }
  if (thiefReady) {
    ctx.drawImage(thiefImage, thiefX, thiefY);
  }
  if(score >=5){
    ctx.drawImage(thiefImage2, thiefX2, thiefY2);
    thiefReady2 = true;
  }
  
  ctx.font = "18px Verdana";
  ctx.fillText(`Time Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 50);
  ctx.fillText(`Score: ${score}`, 20, 80);
  ctx.fillText(`Level: ${stage}`, 20, 110);
  ctx.fillStyle = "white"
};
function namePlayer(){
  name = document.getElementById("namePlayer").value;
  document.getElementById("showName").innerHTML = `Your name: ${name}`
  document.getElementById("namePlayer").value = ""
  
}

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */

var main = function () {
  update(); 
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};


// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
  setupKeyboardListeners();
  main();



