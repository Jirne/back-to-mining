import Entity from "/back-to-mining/reusable/Entity.js"

export default class Mineral extends Entity {

    static Type = Object.freeze({
        COPPER: {
            hp: 1,
            color: 'BA763C'
        },
        IRON: {
            hp: 2,
            color: '434341'
        }
    })

    constructor({ coordinates, image, backgroundColor, layer, frame, depth }) {
        super({ coordinates: coordinates, orientation: null, image: image, backgroundColor: backgroundColor, layer: layer, frame: null })
        if (depth == 0) {
            this.type = Mineral.Type.IRON
        }
        else {

        }

        this.backgroundColor = '#' + this.type.color
        this.hp = this.type.hp
    }

    
    draw(player){
        this.update(player)
        super.draw()
    }

    update(player) {
        if (player.attacking > 0 && this.isCollidingWith(this, player.weapon) && this.hp > 0) {
            this.hp--
            if (this.hp < 0)
                this.hp = 0
            if (!this.hp) {
                this.img.opacity = 0
                this.dropOre(player)
            }
        }
    }

    dropOre(player) {
        player.inventory.add(this.type, 1);
    }
}