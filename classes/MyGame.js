import Game from '/reusable/Game.js'
import Player from './Player.js'

export default class MyGame extends Game{

    main(){

        const player = new Player({
            coordinates :{
                x:0,
                y:0,
                w:50,
                h:50
            },
            orientation: Player.Direction.DOWN,
            image: null,
            layer: "playground"
        })
        console.log(player)


        player.draw()
    }
}