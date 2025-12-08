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
let floor = y + 340;
let xspeed = 5;
let yspeed = 5;
let mainCharacter = new MainCharacter(x + 100, y, d - 60);
let plataform1 = new Plataform(x + 200, y + 260, 100, 20);
// let plataform2 = new Plataform(x - 100, y + 100, 100, 20);
// let plataform3 = new Plataform(x + 60, y - 60, 100, 20);
// let obstacle1 = new Obstacle(x - 55, y + 200, d - 80);
// let obstacle2 = new Obstacle(x + 55, y + 50, d - 80);

function draw() {
  background(240);

  mainCharacter.draw();
  if (mainCharacter.y === floor) {
    yspeed = -5;
  }

  //PLATFORM 1!
  plataform1.draw();
  plataform1.x -= 10;
  if (plataform1.x + plataform1.h < 0) {
    plataform1.x = 400;
  }
  //PLATFORM 2! --> maybe we can make thisone to dissapear
  plataform2.draw();
  plataform2.x += 10;
  if (plataform2.x + plataform2.h > 400) {
    plataform2.x = 0;
  }

  //PLATFORM 3!
  plataform3.draw();
  plataform3.x -= 10;
  if (plataform3.x + plataform3.h < 0) {
    plataform3.x = 400;
  }
  //OBSTACLE 1!
  obstacle1.draw();
  obstacle1.x += 8;
  if (obstacle1.x + obstacle1.y > 800) {
    //--> WHY DOES IT NEED TO BE 800?
    obstacle1.x = 0;
  }
  //OBSTACLE 2!
  obstacle2.draw();
  obstacle2.x -= 8;
  if (obstacle2.x + obstacle2.y < 0) {
    obstacle2.x = 400;
  }

  if (
    mainCharacter.y + mainCharacter.d < 450 &&
    !mainCharacter.isOnPlat(mainCharacter, plataform1)
  ) {
    mainCharacter.y += 15;
  }

  //FLOOR
  line(0, floor, 400, floor);
}

function keyPressed() {
  if (mainCharacter.y + mainCharacter.d >= 450) {
    mainCharacter.y = mainCharacter.y - 200;
  }
}

/* we need: 
  - make the ball to jump
  -make plataforms that moves
  - make plataforms that desapear
  - Start and Lose button/screen
  -obstacules that kill us YAY!
  */
