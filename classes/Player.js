import Entity from "../reusable/Entity.js"

export default class Player extends Entity {


    constructor({ coordinates, orientation, image, backgroundColor, layer, groundSpeed, jumpHeight, jumpLength }) {
        super({ coordinates: coordinates, orientation: orientation, image: image, backgroundColor: backgroundColor, layer: layer })

        this.groundSpeed = groundSpeed
        this.jumpHeight = jumpHeight
        this.jumpLength = jumpLength

        this.gravity = 2 * jumpHeight * Math.pow(groundSpeed, 2) / Math.pow(jumpLength, 2)
        this.jumpSpeed = - 2 * jumpHeight * groundSpeed / jumpLength
    }


    update(game) {
        
/*         let m = this.calculateMove(game)
        this.coordinates.x += m.x
        this.coordinates.y += m.y    
        this.coordinates.vy += m.vy
        //this.coordinates.vx += m.vx
 */
    }


    calculateMove(game){
        const dt = game.msPerFrame / 1000

        //Calculate hypotetical movements
        const dx = this.coordinates.vx * dt
        const dy = this.gravity * Math.pow(dt, 2) + this.coordinates.vy * dt
        const dvy = this.gravity * dt

        let movement =  {
            x: dx,
            y: dy,
            vx: 0,
            vy: dvy
        }

        if (this.isCollidingWithList({
            ...this, coordinates: {
                x: this.coordinates.x + dx,
                y: this.coordinates.y,
                w: this.coordinates.w,
                h: this.coordinates.h
            }
        }, game.colliders)) {
            movement.x = 0
        }

        if (this.isCollidingWithList({
            ...this, coordinates: {
                x: this.coordinates.x,
                y: this.coordinates.y + dy,
                w: this.coordinates.w,
                h: this.coordinates.h
            }
        }, game.colliders)) {
            this.coordinates.vy = 0
            movement.vy = 0
            movement.y = 0
        }
        else{
            movement.y = dy
            movement.vy = dvy
        }


        return movement
    }


    isGrounded(colliders, dy) {
        for (let i = 0; i < colliders.length; i++) {
            const element = colliders[i];
            if (colliders[i].coordinates.y < this.coordinates.y + this.coordinates.h + dy)
                return true
            else
                return false
        }
    }
}