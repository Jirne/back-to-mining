export default class Entity {

    static Direction = Object.freeze({
        UP: {
            x: 0,
            y: -1
        },
        DOWN: {
            x: 0,
            y: 1
        },
        LEFT: {
            x: -1,
            y: 0
        },
        RIGHT: {
            x: 1,
            y: 0
        }
    })

    constructor({ coordinates, orientation, image, backgroundColor, layer, frame }) {
        this.coordinates = coordinates
        this.coordinates.vx = 0
        this.coordinates.vy = 0
        this.orientation = orientation
        this.layer = layer
        this.frame = frame

        if (image != null) {
            this.image = image
        }
        else{
            let img = new Image
            img.style.backgroundColor = backgroundColor
            this.image = img
        }
    }


    draw() {
        this.update()
        const c = document.getElementById(this.layer).getContext("2d")
        if (this.image.src == "") {
            c.fillStyle = this.image.style.backgroundColor
            c.fillRect(this.coordinates.x, this.coordinates.y, this.coordinates.w, this.coordinates.h)
        }
        else {
                if (this.frame == null)
                    c.drawImage(this.image, this.coordinates.x, this.coordinates.y)
                else
                    c.drawImage(this.image, this.frame*this.coordinates.w, 0, this.coordinates.w, this.coordinates.h, this.coordinates.x, this.coordinates.y, this.coordinates.w, this.coordinates.h)
        }
    }

    update(game) {
        //by default: do nothing
    }

    isCollidingWithList(object1, objects) {
        for (let index = 0; index < objects.length; index++) {
            const object2 = objects[index];
            if (this.isCollidingWith(object1, object2))
                return object2
        }
        return false
    }


    isCollidingWith(object1, object2) {
        if (object1.coordinates.x + object1.coordinates.w > object2.coordinates.x &&
            object1.coordinates.x < object2.coordinates.x + object2.coordinates.w &&
            object1.coordinates.y + object1.coordinates.h > object2.coordinates.y &&
            object1.coordinates.y < object2.coordinates.y + object2.coordinates.h){
                return object2
            }
            else
                false
    }
}