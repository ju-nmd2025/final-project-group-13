export default class Plataform {
  constructor(x, y, w, h, type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.type = type;

    this.broken = false;

    this.dx = random([-1, 1]) * random(0.5, 1.5);
  }

  update() {
    if (this.type === "moving") {
      this.x += this.dx;
      if (this.x <= 0 || this.x + this.w >= width) {
        this.dx *= -1;
      }
    }
  }
  draw() {
    if (this.broken) {
      return;
    }
    if (this.type === "breaking") {
      fill("red");
    } else if (this.type === "moving") {
      fill("gray");
    } else {
      fill("white");
    }
    rect(this.x, this.y, this.w, this.h);
  }

  breakPlat() {
    if (this.type === "breaking") {
      this.broken = true;
    }
  }

  generatePlat(lastPlat, canvasWidth, gap) {
    this.x = random(0, canvasWidth - this.w);
    this.y = lastPlat.y - gap;

    this.broken = false;
    let r = random();
    if (r < 0.6) {
      this.type = "normal";
    } else if (r < 0.8) {
      this.type = "breaking";
    } else {
      this.type = "moving";
    }
  }
}
