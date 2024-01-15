import Game from "../reusable/Game.js";
import Scene from "../reusable/Scene.js";

export default class MainMenu extends Scene {

    constructor(tilesize, assetsToLoad) {
        super(tilesize, assetsToLoad)
        this.mainMenuLocation = 0
    }

    init() {
        const ctx = Game.contexts.get("playground")
        var height_menu = 0;
        var width_menu = 0


        ctx.font = "48px serif";

        const textsToPrint = ["OPTIONS", "LOAD", "NEW"]

        var actualHeight = 0
        for (let index = 0; index < textsToPrint.length; index++) {
            var text = textsToPrint[index]
            var textMetrics = ctx.measureText(text);
            actualHeight = (textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent) * 2.5;
            height_menu += actualHeight

            var actualWidth = textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight;
            if (actualWidth > width_menu)
                width_menu = actualWidth

            ctx.fillText(text, (Game.width - actualWidth) / 2, Game.height - actualHeight * index - actualHeight);
        }
        height_menu += actualHeight / 2

        var yoffset = Game.height - actualHeight * textsToPrint.length - actualHeight / 2.5

        this.drawLeftMenuArrow(yoffset, actualHeight / 2.5, actualWidth, this.mainMenuLocation, width_menu)
        this.drawRightMenuArrow(yoffset, actualHeight / 2.5, actualWidth, this.mainMenuLocation, width_menu)

        ctx.strokeRect((Game.width - width_menu) / 2 - actualHeight, Game.height - height_menu - actualHeight / 2, width_menu + 2 * actualHeight, height_menu)

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "z":
                    if (this.mainMenuLocation > 0) {
                        this.mainMenuLocation--
                        this.updateMenu();
                    }
                    break

                case "s":
                    if (this.mainMenuLocation < 2) {
                        this.mainMenuLocation++
                        this.updateMenu();
                    }
                    break

                case "Enter":
                    if (this.mainMenuLocation == 0) {
                        Game.loadScene("Game")
                    }
                    break
            }
        })

    }

    main() {

    }



    updateMenu() {

    }


    drawLeftMenuArrow(yoffset, arrowHeight, delta, index, maxFontWidth) {
        const ctx = Game.contexts.get("UI")

        var xoffset = (Game.width - maxFontWidth) / 2 - arrowHeight - 20
        yoffset += index * delta

        ctx.beginPath()
        ctx.moveTo(xoffset, yoffset)
        ctx.lineTo(xoffset, yoffset + arrowHeight)
        ctx.lineTo(xoffset + arrowHeight * Math.cos(Math.PI / 6), yoffset + arrowHeight - arrowHeight * Math.sin(Math.PI / 6))
        ctx.closePath()

        ctx.fill();

    }

    drawRightMenuArrow(yoffset, arrowHeight, delta, index, maxFontWidth) {
        const ctx = Game.contexts.get("UI")

        var xoffset = (Game.width + maxFontWidth) / 2 + arrowHeight + 20
        yoffset += index * delta

        ctx.beginPath()
        ctx.moveTo(xoffset, yoffset)
        ctx.lineTo(xoffset, yoffset + arrowHeight)
        ctx.lineTo(xoffset - arrowHeight * Math.cos(Math.PI / 6), yoffset + arrowHeight - arrowHeight * Math.sin(Math.PI / 6))
        ctx.closePath()

        ctx.fill();
    }
}