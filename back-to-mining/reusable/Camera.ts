import { Game } from "./Game.ts";

export class Camera {

    coordinates: { x: number; y: number; w: number; h: number; }

    constructor({ coordinates }) {
        this.coordinates = coordinates
    }

    draw() {
        const c = Game.context["playground"]
        c.fillStyle = "black"
        c.rect(this.coordinates.x, this.coordinates.y, this.coordinates.w, this.coordinates.h);
        c.stroke();
    }

    isPlayerInside(coordinates: { x: number; y: number; w: number; h: number; }) {
        return (coordinates.x > this.coordinates.x &&
            coordinates.x + coordinates.w < this.coordinates.x + this.coordinates.w &&
            coordinates.y > this.coordinates.y &&
            coordinates.y + coordinates.h < this.coordinates.y + this.coordinates.h)
    }
}