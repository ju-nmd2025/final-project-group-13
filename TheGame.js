import { MainCharacter } from "./MainCharacter";
import { Plataform } from "./OurPlataforms";
// import { Obstacle } from "./Obstacles";

let x = 100;
let y = 100;
let r = 50;
let yspeed = 0;
let floor = 436;
let score;
let gap;
let gameStarted = false;
let gravity = 0.4;
let vy = 0;
let whichscreen = "start";
let jumpForce = -15;
//let canJump = true;
let mainCharacter = new MainCharacter(x + 100, y + 280, r, r);
let plataform1 = [
  new Plataform(x + 50, y + 260, 100, 20),
  // new Plataform(x - 40, y + 90, 100, 20), // move
  // new Plataform(x + 50, y - 60, 100, 20),
];
// let obstacles = [
//   new Obstacle(x - 55, y + 100, d - 80),
//   // new Obstacle(x + 55, y + 20, d - 80),
// ];

function setup() { 
  createCanvas(400, 500);
  score = 0;
}

function draw() {
  background(240);
  drawStart();

  // aqui hay que agregar un else para cuando uno pierda

  // if (
  //   mainCharacter.y + mainCharacter.d < 450 &&
  //   !mainCharacter.isOnPlat(mainCharacter, plataform1)
  // ) {
  //   mainCharacter.y += 15;
  // }
}

function fallBall(mainCharaxcter, plata) {
  for (const plataform of plataform1) {
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
  // if (keyCode === UP_ARROW) {
  //   mainCharacter.y = y - 10;
  // } else if (keyCode === DOWN_ARROW) {
  //   mainCharacter.y = y + 10;
  // }
  if (keyCode === LEFT_ARROW) {
    mainCharacter.x -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    mainCharacter.x += 10;
  }
  if (keyCode === 66) {
    score = score + 1;
  }
}
function drawStart() {
  if (whichscreen === "start") {
    startScreen();
  } else if (whichscreen === "magic") {
    magic();
  } else {
    endScreen();
  }
}
function startScreen() {
  //pantalla
  fill("orange");
  textSize(30);
  textAlign(CENTER);
  text("Just Doodling Around ", x + 100, y + 40);
  textSize(18);
  text("use arrows keys to move", x + 100, y + 90); //---> ESTA ES LA PLATILLA DE LA PANTALLA DE INICIO
  if (keyIsPressed) {
    whichscreen = "magic";
  }

  //Button
  fill("orange");
  rect(x, y + 110, 200, 100);
  fill("white");
  textSize(60);
  text("START", 400 / 2, 500 / 2 + 30);
}
function endScreen() {
  background("blue");
  fill("white");
  rect(x - 10, y - 35, 200, 50);
  fill("black");
  textSize(30);
  textAlign(CENTER);
  text("GAME OVER", x + 90, y);
  textSize(20);
  text("SCORE", x + 90, y + 100);
  text("press SPACE to restart", x + 90, y + 150);
}
function drawGameOver() {
  fill("black");
  textSize(40);
  textAlign(CENTER);
  text("FAILED", 400 / 2, 500 / 2 - 60);
}
function magic() {
  vy += gravity;
  mainCharacter.y += vy;

  for (let p of plataform1) {
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

  if (mainCharacter.y > height - 20) {
    vy = -15; //--> esto permite saltar!
  }
  mainCharacter.draw();
  mainCharacter.y += yspeed;
  if (mainCharacter.y > 450 - r || y < r) {
    yspeed = -yspeed;
  }
  if (mainCharacter.y + mainCharacter.r < 0) {
    mainCharacter.y = 50;
  }
  //plataform1[0].draw();

  for (const plataform of plataform1) {
    plataform.draw();
    plataform.x -= 1;
    if (plataform.x + plataform.h < 0) {
      //--> esto muestra las plataformas
      plataform.x = 400;
    }

    //PARA PLATAFORMAS RANDOM
    if (plataform1.y + plataform1.h < 300) {
      plataform.reset();
    }
    for (let p of plataform1) {
      if (
        mainCharacter.x > p.x &&
        mainCharacter.x < p.x + p.w &&
        mainCharacter.y + mainCharacter.r > p.y &&
        mainCharacter.y + mainCharacter.r < p.y + 10 &&
        vy > 0
      ) {
        vy = -20;
      }

      // if (mainCharacter.isOnPlat(mainCharacter, plataform)) {
      //   mainCharacter.y = plataform.y - mainCharacter.d;
      //   yspeed = 0;
      //   //canJump = true;
      // }
    }
  }
  if (score === 3) {
    whichscreen = "endscreen";
  }
  //MOVING BACKGROUND
  if (mainCharacter.y < 200) {
    const dy = 200 - mainCharacter.y;
    mainCharacter.y = 200;
    for (let p of plataform1) p.y += dy;
    //for (let o of obstacles) o.y+=dy
  }
}

//function update() {
// yspeed += gravity;
//mainCharacter.y += yspeed;
// if (mainCharacter.y + mainCharacter.d >floor) {
//   mainCharacter.y = floor - mainCharacter.d;
//   yspeed = 0;
//   //canJump = true;
// }

//MOVER BACKGROUND

/* we need: 
  - make the ball to jump ---> done
  -make plataforms that moves 
  - make plataforms that desapear
  - Start and Lose button/screen --> done!
  -obstacules that kill us YAY!
  */
