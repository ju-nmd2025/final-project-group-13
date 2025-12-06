/* We are going to create the character's features here.
 Then we are going to put this info in the "TheGame" file 
 so we won't need to have MAAAAAANY functions and we can just call what we need*/

//our character is a circle: it has x, y and diameter (x, y d)//
export default function Character() {
  function Character(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    function drawBall() {
      fill("blue");
      circle(this.x, this.y, this.d);
    }
    function isOnPlat(Character, plataform) {
      if (Character.x >= plataform.x && Character.y === plataform.y) {
        return true;
      } //hopefully the character should be able to stand over the plataforms
      else {
        return false;
      }
    }
  }
}
