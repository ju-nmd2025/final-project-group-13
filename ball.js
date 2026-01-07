export class MainCharacter {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  draw() {
    fill("orange");

    ellipse(this.x, this.y, this.r, this.r);
  }
  // isOnPlat(mainCharacter, plataform) {
  //   if (
  //     mainCharacter.x >= plataform.x &&
  //     mainCharacter.x <= plataform.x + plataform.w &&
  //     mainCharacter.y >= plataform.y - 25 &&
  //     mainCharacter.y <= plataform.y + 25
  //   ) {
  //     mainCharacter.y === plataform.y;
  //     return true;
  //   } //hopefully the character should be able to stand over the plataforms
  //   else {
  //     return false;
  //   }
  // }
}
