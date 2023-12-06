import { MyGame } from "./classes/MyGame.ts"

const myGame = new MyGame(1280, 60, 16, [
    '/back-to-mining/assets/TileSet.png'
], [
    { "name": "background", "zIndex": 0 },
    { "name": "playground", "zIndex": 1 }
])