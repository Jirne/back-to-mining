import Entity from "../reusable/Entity.js"
import Game from "../reusable/Game.js"

export default class Player extends Entity {


    constructor({ coordinates, orientation, image, backgroundColor, layer, frame, groundSpeed, jumpHeight, jumpLength }) {
        super({ coordinates: coordinates, orientation: orientation, image: image, backgroundColor: backgroundColor, layer: layer, frame: frame })

        this.groundSpeed = groundSpeed
        this.jumpHeight = jumpHeight
        this.jumpLength = jumpLength

        this.gravity = 2 * jumpHeight * Math.pow(groundSpeed, 2) / Math.pow(jumpLength, 2)
        this.jumpSpeed = - 2 * jumpHeight * groundSpeed / jumpLength


        this.attacking = 0
        this.weapon = new Entity({
            coordinates: {
                x: this.coordinates.x + this.coordinates.w,
                y: this.coordinates.y,
                w: this.coordinates.w / 2,
                h: this.coordinates.h
            },
            orientation: Entity.Direction.DOWN,
            backgroundColor: "red",
            layer: "playground",
            image: null,
            frame: null
        })
    }


    update() {
        if (this.attacking > 0) {
            this.attacking--
            this.weapon.coordinates.y = this.coordinates.y
            if (this.coordinates.vx >= 0) {
                this.weapon.coordinates.x = this.coordinates.x + this.coordinates.w
            }
            else {
                this.weapon.coordinates.x = this.coordinates.x - this.weapon.coordinates.w
            }
        }
    }


    calculateMove(colliders) {
        const dt = Game.msPerFrame / 1000

        //Calculate hypotetical movements
        const dx = this.coordinates.vx * dt
        const dy = this.gravity * Math.pow(dt, 2) + this.coordinates.vy * dt
        const dvy = this.gravity * dt

        let movement = {
            x: dx,
            y: dy,
            vx: 0,
            vy: dvy
        }

        let collided = this.isCollidingWithList({
            ...this, coordinates: {
                x: this.coordinates.x + dx,
                y: this.coordinates.y,
                w: this.coordinates.w,
                h: this.coordinates.h
            }
        }, colliders)


        if (collided != false) {
            movement.x = 0
            if (dx > 0)
                movement.x = dx - (this.coordinates.x + this.coordinates.w + dx - collided.coordinates.x)
            else
                movement.x = dx - (this.coordinates.x + dx - collided.coordinates.x - collided.coordinates.w)

        }


        collided = this.isCollidingWithList({
            ...this, coordinates: {
                x: this.coordinates.x,
                y: this.coordinates.y + dy,
                w: this.coordinates.w,
                h: this.coordinates.h
            }
        }, colliders)
        if (collided != false) {
            movement.vy = 0
            this.coordinates.vy = 0
            if (dy > 0)
                movement.y = dy - (this.coordinates.y + this.coordinates.h + dy - collided.coordinates.y)
            else
                movement.y = dy - (this.coordinates.y + dy - collided.coordinates.y - collided.coordinates.h)
        }


        return movement
    }

    attack() {
        if (this.attacking == 0) {
            this.attacking = 60
        }
    }

    draw() {
        this.update()
        super.draw()
        if (this.attacking > 0) {
            this.weapon.draw()
        }
    }
}