export default class Entity {

    static Direction = Object.freeze({
        UP: {
            x:0,
            y:-1
        },
        DOWN:{
            x:0,
            y:1
        },
        LEFT:{
            x:-1,
            y:0
        },
        RIGHT:{
            x:1,
            y:0
        }
    })




    constructor({coordinates, orientation, image, layer}){
        this.coordinates = coordinates
        this.orientation = orientation
        this.layer = layer
        
        let img = new Image()
        if(image != null){
            img.src = image
        }

        img.style.backgroundColor = 'red'
        this.image = img
    }


    draw(){
        c = document.getElementById(layer).getContext("2d")
        if (this.image.src == null){
            c.fillStyle = this.image.backgroundColor
            c.fillRect(this.coordinates.x, this.coordinates.y, this.coordinates.w, this.coordinates.h)
        }
        else{
            c.drawImage(this.image, this.coordinates.x, this.coordinates.y)
        }
    }
}