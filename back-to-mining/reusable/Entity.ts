import { Game } from "./Game"

export class Entity {

    coordinates: { x: number; y: number; w: number; h: number; vx: number | undefined; vy: number | undefined }
    orientation: { x: number; y: number }
    layer: string
    frame: number | null
    image: HTMLImageElement

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
        this.coordinates.vy = 0
        this.coordinates.vx = 0
        if (orientation != null)
            this.orientation = orientation
        else
            this.orientation = Entity.Direction.DOWN
        this.layer = layer
        this.frame = frame

        if (image != null) {
            this.image = image
        }
        else {
            let img = new Image
            img.style.backgroundColor = backgroundColor
            this.image = img
        }
    }


    draw(game: this) {
        this.update(game)
        const c = Game.context[this.layer]
        if (this.image.src == "") {
            c.fillStyle = this.image.style.backgroundColor
            c.fillRect(this.coordinates.x, this.coordinates.y, this.coordinates.w, this.coordinates.h)
        }
        else {
            if (this.frame == null)
                c.drawImage(this.image, this.coordinates.x, this.coordinates.y)
            else
                c.drawImage(this.image, this.frame * this.coordinates.w, 0, this.coordinates.w, this.coordinates.h, this.coordinates.x, this.coordinates.y, this.coordinates.w, this.coordinates.h)
        }
    }

    update(game: any) {
        //by default: do nothing
    }

    isCollidingWithList(object1: (this & { coordinates: { x: any; y: any; w: any; h: any } }), objects) {
        for (let index = 0; index < objects.length; index++) {
            const object2 = objects[index];
            if (this.isCollidingWith(object1, object2))
                return object2
        }
        return false
    }


    isCollidingWith(object1: this, object2: { coordinates: { x: number; w: any; y: number; h: any } }) {
        if (object1.coordinates.x + object1.coordinates.w > object2.coordinates.x &&
            object1.coordinates.x < object2.coordinates.x + object2.coordinates.w &&
            object1.coordinates.y + object1.coordinates.h > object2.coordinates.y &&
            object1.coordinates.y < object2.coordinates.y + object2.coordinates.h) {
            return object2
        }
        else
            false
    }
}