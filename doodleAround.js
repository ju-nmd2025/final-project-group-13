import { MainCharacter } from "./Ball";
import { Plataform } from "./platforms";

let x = 100;
let y = 100;
let r = 50;
let canvasWidth = 400;
let canvasHeight = 500;
let floor = 450;
let score;
let gap;
let gameOver = false;
let gameStarted = false;
let gravity = 0.5;
let vy = 0;
let whichscreen = "start";

let mainCharacter = new MainCharacter(x + 100, y + 100, r, r);
let platforms = [
  new Plataform(x + 50, y + 260, 100, 20),
  new Plataform(x - 40, y + 90, 100, 20),
];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
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

  fill("white");
  textSize(30);
  textAlign(CENTER);
  text("GAME OVER", x + 90, y);
  textSize(20);
  text("SCORE", x + 90, y + 100);
  text("press to restart", x + 90, y + 150);
}
function logic() {
  vy += gravity;
  mainCharacter.y += vy;

  if (gameOver) {
    endScreen();
    return;
  }
  for (let p of platforms) {
    p.update();
    if (
      mainCharacter.x > p.x &&
      mainCharacter.x < p.x + p.w &&
      mainCharacter.y + mainCharacter.r > p.y &&
      mainCharacter.y + mainCharacter.y < p.y + 10 &&
      vy > 0
    ) {
      vy = -20;
      score++;
      if (p.type === "breaking") {
        p.broken = true;
      }
    }
  }

  //MOVING BACKGROUND
  if (mainCharacter.y < 200) {
    const dy = 200 - mainCharacter.y;
    mainCharacter.y = 200;
    for (let p of platforms) p.y += dy;
    //for (let o of obstacles) o.y+=dy
  }
  updatePlat();

  mainCharacter.draw();
  for (let p of platforms) {
    p.draw();
  }
  drawScore();
  youDie(mainCharacter);
}

function youDie(mainCharacter) {
  if (mainCharacter.y - mainCharacter.r > height) {
    gameOver = true;
  }
}

function updatePlat() {
  for (let p of platforms) {
    if (p.y > height) {
      let highest = platforms.reduce((a, b) => (a.y < a.y ? a : b));
      p.generatePlat(highest, width);
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

function drawScore() {
  fill("black");
  textSize(18);
  text("SCORE: " + score, x + 100, y - 50);
}
