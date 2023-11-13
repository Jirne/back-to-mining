import Entity from "/reusable/Entity.js";

export default class Player extends Entity {

    GROUND_SPEED = 300 //pixel/sec
    GRAVITY = 200
    update(game) {
        const dt = game.msPerFrame

        //Calculate hypotetical movements
        const dx = this.coordinates.vx * dt / 1000
        const dy = this.GRAVITY * dt / 1000

        if (!this.isCollidingWithList({
            ...this, coordinates: {
                x: this.coordinates.x + dx,
                y: this.coordinates.y,
                w: this.coordinates.w,
                h: this.coordinates.h
            }
        }, game.colliders)) {
            this.coordinates.x += dx
        }

        if (!this.isGrounded(game.colliders, dy))
            this.coordinates.y += dy

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