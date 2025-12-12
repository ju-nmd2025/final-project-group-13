import { MainCharacter } from "./MainCharacter";
import { Plataform } from "./OurPlataforms";
import { Obstacle } from "./Obstacles";

// BACKGROUND!
function setup() {
  createCanvas(400, 500);
}
let x = 100;
let y = 100;
let d = 100;
let floor = 436;
let xspeed = 5;
let yspeed = 0;
let gravity = 0.4;
let vy = 0;
//let canJump = true;
let mainCharacter = new MainCharacter(x + 100, y, d - 60);
let plataform1 = [
  new Plataform(x + 50, y + 260, 100, 20),
  new Plataform(x - 40, y + 90, 100, 20),
  new Plataform(x + 50, y - 60, 100, 20),
];
let obstacle1 = new Obstacle(x - 55, y + 180, d - 80);
let obstacle2 = new Obstacle(x + 55, y + 20, d - 80);

function draw() {
  background(240);
  vy += gravity;
  mainCharacter.y += vy;
  if (mainCharacter.y > height - 100) {
    vy = -10; //--> esto permite saltar!
  }
  mainCharacter.draw();

  for (const plataform of plataform1) {
    plataform.draw();
    plataform.x -= 1;
    if (plataform.x + plataform.h < 0) { //--> esto muestra las plataformas
      plataform.x = 400;
    }
  }
  //OBSTACLE 1!
  obstacle1.draw();
  obstacle1.x += 6;
  if (obstacle1.x + obstacle1.y > 800) {
    //--> WHY DOES IT NEED TO BE 800?
    obstacle1.x = 0;
  }
  //OBSTACLE 2!
  obstacle2.draw();
  obstacle2.x -= 5;
  if (obstacle2.x + obstacle2.y < 0) {
    obstacle2.x = 400;
  }

  // if (
  //   mainCharacter.y + mainCharacter.d < 450 &&
  //   !mainCharacter.isOnPlat(mainCharacter, plataform1)
  // ) {
  //   mainCharacter.y += 15;
  // }

  //FLOOR
  line(0, floor, 400, floor);
}

function keyPressed() {
  // if (keyCode === UP_ARROW) {
  //   mainCharacter.y = y - 10;
  // } else if (keyCode === DOWN_ARROW) {
  //   mainCharacter.y = y + 10;
  // }
  if (keyCode === LEFT_ARROW) {
    mainCharacter.x -= 10;
  } else if (keyCode === RIGHT_ARROW) { //--> esto hace que puedas manejas la pelota
    mainCharacter.x += 10;
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
if (mainCharacter.isOnPlat(mainCharacter, plataform1)) {
  mainCharacter.y = plataform1.y - mainCharacter.d;
  yspeed = 0;
  //canJump = true;
}
mainCharacter.draw();
// mainCharacter.draw();
// if (
//   mainCharacter.y + mainCharacter.d >= floor ||
//   mainCharacter.isOnPlat(mainCharacter, platform)
// ) {
//   canJump = true;
// } else {
//   canJump = false;
// }
//}
/* we need: 
  - make the ball to jump
  -make plataforms that moves
  - make plataforms that desapear
  - Start and Lose button/screen
  -obstacules that kill us YAY!
  */
