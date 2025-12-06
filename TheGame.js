// diseñar los diferentes componentes del juego y entender como hacer que se muevan
import Character from "./MainCharacter"; //--> we should be able to call our main character like a constructor

// BACKGROUND!
function setup() {
  createCanvas(500, 600);
  background(240);
}

function draw() {
  //FLOOR
  line(0, 500, 500, 500);
  //Plataforms
  fill("white)");
  rect(190, 430, 50, 20);
}

/* we need: 
  - make the ball to jump
  -make plataforms that moves
  - make plataforms that desapear
  - Start and Lose screen/button
  */
