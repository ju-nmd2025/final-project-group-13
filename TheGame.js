import { MainCharacter } from "./MainCharacter";
import { Plataform } from "./OurPlataforms";

let x = 100;
let y = 100;
let r = 50;
let canvasWidth = 400;
let canvasHeight = 500;
let yspeed = 0;
let floor = 450;
let score;
let gap;
let gameOver = false;
let gameStarted = false;
let gravity = 0.5;
let vy = 0;
let whichscreen = "start";
let jumpForce = -15;

let mainCharacter = new MainCharacter(x + 100, y + 100, r, r);
let platforms = [
  new Plataform(x + 50, y + 260, 100, 20),
  new Plataform(x - 40, y + 90, 100, 20),
];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  score = 0;
}

function draw() {
  background(240);
  drawStart();
}

function fallBall(mainCharacter, platforms) {
  for (const plataform of platforms) {
    if (mainCharacter.isOnPlat(mainCharacter, plataform)) {
      return false;
    }
    if (mainCharacter.y + mainCharacter.h < floor) {
      return true;
    }
    return false;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    mainCharacter.x -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    mainCharacter.x += 10;
  }
  if (gameOver && keyCode === "r") {
    gameOver = false;
    resetGame();
    loop();
  }
}
function drawStart() {
  if (whichscreen === "start") {
    startScreen();
  } else if (whichscreen === "logic") {
    logic();
  } else {
    endScreen();
  }
}
function startScreen() {
  fill("orange");
  textSize(30);
  textAlign(CENTER);
  text("Just Doodling Around ", x + 100, y + 40);
  textSize(20);
  text("use arrows keys to move", x + 100, y + 100);
  if (keyIsPressed) {
    whichscreen = "logic";
  }

  //Button
  fill("orange");
  rect(x, y + 145, 200, 50);
  fill("white");
  textSize(30);
  text("START", 400 / 2, 500 / 2 + 30);
}
function endScreen() {
  background("orange");
  // fill("white");
  // rect(x - 10, y - 35, 200, 50);
  fill("white");
  textSize(30);
  textAlign(CENTER);
  text("GAME OVER", x + 90, y);
  textSize(20);
  text("SCORE", x + 90, y + 100);
  text("press to restart", x + 90, y + 150);
}
// function drawGameOver() {
//   fill("black");
//   textSize(40);
//   textAlign(CENTER);
//   text("FAILED", 400 / 2, 500 / 2 - 60);
// }
function logic() {
  vy += gravity;
  mainCharacter.y += vy;

  if (gameOver) {
    endScreen();
    return;
  }

  for (let p of platforms) {
    if (
      mainCharacter.x > p.x &&
      mainCharacter.x < p.x + p.w &&
      mainCharacter.y + mainCharacter.r > p.y &&
      mainCharacter.y + mainCharacter.r < p.y + 10 &&
      vy < 0
    ) {
      vy = jumpForce;
    }
  }

  mainCharacter.draw();
  mainCharacter.y += yspeed;

  for (const plataform of platforms) {
    plataform.draw();
    // plataform.x -= 1;
    // if (plataform.x + plataform.h < 0) {
    //   plataform.x = 400;
    // }

    if (plataform.y + plataform.h < 0) {
      plataform.generatePlat();
    }
  }

  for (let p of platforms) {
    if (
      mainCharacter.x > p.x &&
      mainCharacter.x < p.x + p.w &&
      mainCharacter.y + mainCharacter.r > p.y &&
      mainCharacter.y + mainCharacter.r < p.y + 10 && //p.h en vez de +10?
      vy > 0
    ) {
      vy = -20;
    }
  }
  updatePlat();

  //MOVING BACKGROUND
  if (mainCharacter.y < 200) {
    const dy = 200 - mainCharacter.y;
    mainCharacter.y = 200;
    for (let p of platforms) p.y += dy;
    //for (let o of obstacles) o.y+=dy
  }
  youDie(mainCharacter);
}

function youDie(mainCharacter) {
  if (mainCharacter.y - mainCharacter.r > height) {
    gameOver = true;
  }
}

function updatePlat() {
  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];
    p.draw();
    if (p.y > height) {
      let highest = platforms[0];
      for (let j = 1; j < platforms.length; j++) {
        if (platforms[j].y < highest.y) {
          highest = platforms[j];
        }
      }
      p.generatePlat(highest);
    }
  }
}

function mousePressed() {
  if (gameOver) {
    resetGame();
  }
}

function resetGame() {
  score = 0;
  gameOver = false;
  mainCharacter.x = width / 2;
  mainCharacter.y = height / 2;
  vy = 0;

  platforms = [];
  for (let i = 0; i < 5; i++) {
    platforms.push(
      new Plataform(random(0, width - 80), height - i * 100, 80, 20)
    );
  }
}

/* we need:  
  
  -make plataforms that moves 
  - make plataforms that desapear
  -obstacles that kill us YAY!
  */
