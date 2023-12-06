import { Entity } from "./Entity.ts";
import { Game } from "./Game.ts";

export class Tile extends Entity {

    draw(game) {
        super.draw(game)

        const c = Game.context[this.layer]
        c.fillStyle = "black"
        c.rect(this.coordinates.x, this.coordinates.y, this.coordinates.w, this.coordinates.h);
        c.stroke();
    }

}