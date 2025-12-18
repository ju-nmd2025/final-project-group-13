import { MainCharacter } from "./ball";
import { Plataform } from "./platforms";

let x = 100;
let y = 100;
let r = 50;
let canvasWidth = 400;
let canvasHeight = 500;
let floor = 450;
let score = 0;
let gap = 120;
let gameOver = false;
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
  background("Red");
  drawStart();
}

function keyPressed() {
  if (gameOver) {
    //&& youWon) {
    resetGame();
    return;
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
  fill("Black");
  textSize(30);
  textAlign(CENTER);
  text("Let's help Dean", x + 100, y + 40);
  text("escape hell!", x + 100, y + 70);
  textSize(20);
  text("use arrows keys to move", x + 100, y + 120);
  if (keyIsPressed) {
    whichscreen = "logic";
  }

  //Button
  fill("Black");
  rect(x, y + 145, 200, 50);
  fill("white");
  textSize(30);
  text("START", 400 / 2, 500 / 2 + 30);
}
function endScreen() {
  background("Red");
  // fill("white");
  // rect(x - 10, y - 35, 200, 50);
  fill("Black");
  textSize(30);
  textAlign(CENTER);
  text("Oopsie! You died!", x + 90, y);
  text("Better luck next time))", x + 90, y + 100);
  textSize(20);
  text("SCORE: " + score, x + 90, y + 130);
  text("press to restart", x + 90, y + 150);
}

function logic() {
  if (keyIsDown(LEFT_ARROW)) {
    mainCharacter.x -= 15;
  } else if (keyIsDown(RIGHT_ARROW)) {
    mainCharacter.x += 15;
  }

  vy += gravity;
  mainCharacter.y += vy;

  if (score >= 20) {
    youWon();
    return;
  }

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
      mainCharacter.y + mainCharacter.r < p.y + 10 &&
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
    for (let p of platforms) {
      p.y += dy;
    }
  }

  updatePlat();

  mainCharacter.draw();
  if (mainCharacter.x < 0) {
    mainCharacter.x = 400;
  } else if (mainCharacter.x > 400) {
    mainCharacter.x = 0;
  }
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
      let highest = platforms.reduce((a, b) => (a.y < b.y ? a : b));
      p.generatePlat(highest, width, gap);
    }
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
  text("score: " + score, x + 100, y - 50);
}

function youWon() {
  fill("black");
  textSize(18);
  text("Yippie!! You escaped hell!!", x + 90, y + 70);
  text("press to play again", x + 90, y + 150);
  if (keyIsPressed) {
    //drawStart();
    resetGame();
    ///whichscreen = "start";
  }
}
