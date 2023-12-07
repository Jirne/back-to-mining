import { MyGame } from "./classes/MyGame.js"

const myGame = new MyGame(1280, 60, 16, [
    '/src/assets/TileSet.png'
], [
    { "name": "background", "zIndex": 0 },
    { "name": "playground", "zIndex": 1 }
])