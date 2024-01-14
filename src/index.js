import MainMenu from "./classes/MainMenu.js";
import Game from "./reusable/Game.js";

const myGame = new Game(1280, 60, [
    { "name": "background", "zIndex": 0 },
    { "name": "playground", "zIndex": 1 },
    { "name": "UI", "zIndex": 2 }
], 16)

myGame.scenes.set(0, new MainMenu(Game.defaultTileSize, null))
myGame.loadScene(0)