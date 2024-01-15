import MyGame from "./classes/MyGame.js";
import MainMenu from "./classes/MainMenu.js";
import Game from "./reusable/Game.js";

Game.init(1280, 60, [
    { "name": "background", "zIndex": 0 },
    { "name": "playground", "zIndex": 1 },
    { "name": "UI", "zIndex": 2 }
], 16)

Game.scenes.set(0, new MainMenu(Game.defaultTileSize, null))
Game.scenes.set("Game", new MyGame(Game.defaultTileSize, [
    'TileSet.png'
]))
Game.loadScene(0)