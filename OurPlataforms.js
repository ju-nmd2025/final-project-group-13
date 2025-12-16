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

  generatePlat(lastPlat) {
    this.x = random(0, canvasWidth - this.w);
    this.y = lastPlat.y - random(60, 120);
  }
}
