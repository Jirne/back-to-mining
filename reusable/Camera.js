export default class Camera {

    constructor({coordinates}){
        this.coordinates = coordinates
    }

    draw(){
        /* const c = document.getElementById("playground").getContext("2d")
        c.fillStyle = "black"
        c.rect(this.coordinates.x, this.coordinates.y, this.coordinates.w, this.coordinates.h);
        c.stroke(); */
    }

    isPlayerInside(coordinates){
        return (coordinates.x > this.coordinates.x &&
            coordinates.x + coordinates.w < this.coordinates.x + this.coordinates.w &&
            coordinates.y  > this.coordinates.y &&
            coordinates.y + coordinates.h < this.coordinates.y + this.coordinates.h)
    }
}