import { MyGame } from "./classes/MyGame.js"

const myGame = new MyGame(1280, 60, 16, [
    'TileSet.png'
], [
    { "name": "background", "zIndex": 0 },
    { "name": "playground", "zIndex": 1 },
    { "name": "UI", "zIndex": 2 }
])