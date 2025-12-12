//our character is a circle: it has x, y and diameter (x, y d)//
export default class MainCharacter {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
  }
  draw() {
    fill("orange");
    circle(this.x, this.y, this.d);
  }
  isOnPlat(mainCharacter, plataform) {
    if (
      mainCharacter.x >= plataform.x &&
      mainCharacter.x <= plataform.x + plataform.w &&
      mainCharacter.y >= plataform.y - 25 &&
      mainCharacter.y <= plataform.y + 25
    ) {
      mainCharacter.y === plataform.y;
      return true;
    
    } //hopefully the character should be able to stand over the plataforms
    else {
      return false;
    }
  }
}
