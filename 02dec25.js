// diseñar los diferentes componentes del juego y entender como hacer que se muevan

// BACKGROUND!
function setup() {
  createCanvas(500, 600);
  background(240);
}

//FLOOR
function draw() {
  fill("black");
  line(0, 500, 20, 500);
}

//MAIN CHARACTER
function draw() {
  fill("blue");
  circle(50, 50, 30);
}
