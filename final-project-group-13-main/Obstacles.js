export default class Obstacle {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
  }
  draw() {
    fill("blue");
    circle(this.x, this.y, this.d);
  }
}
