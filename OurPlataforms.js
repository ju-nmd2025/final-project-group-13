/*we are going to create the plataforms here.
the we are going to call them inside the game. */

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
}
