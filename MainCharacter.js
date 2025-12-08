/* We are going to create the character's features here.
 Then we are going to put this info in the "TheGame" file 
 so we won't need to have MAAAAAANY functions and we can just call what we need*/

//our character is a circle: it has x, y and diameter (x, y d)//
export default class MainCharacter{
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
  }
    draw(){
      fill("orange");
      circle(this.x, this.y, this.d);
    }
    isOnPlat(mainCharacter, plataform) {
      if (mainCharacter.x < plataform.x && mainCharacter.y === plataform.y) {
        return true;
      } //hopefully the character should be able to stand over the plataforms
      else {
        return false;
      }
    }
  }

