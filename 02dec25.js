// diseñar los diferentes componentes del juego y entender como hacer que se muevan

// BACKGROUND!
function setup() {
  createCanvas(500, 600);
  background(240);
}

function draw() {
  //MAIN CHARACTER
  fill("blue");
  circle(260, 485, 30);
  //FLOOR
  line(0, 500, 500, 500);
}
