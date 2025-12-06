/*we are going to create the plataforms here.
the we are going to call them inside the game. */

function Plataform(x,y,w,h){
    this.x
this.y=y
this.w=w
this.h=h
function drawPlat1(){
    push() //this plataforms are the regular ones
    fill("white")
rect(this.x,this.y,this.w,this.h)
pop()
}
}