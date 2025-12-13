export default class Plataform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    fill("white");
    rect(this.x, this.y, this.w, this.h);
  }

  reset() {
    this.x = width + random(50, 200);
    this.y = random(200, 350);
  }
}
