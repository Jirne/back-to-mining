import Game from "../reusable/Game.js"
import Scene from "../reusable/Scene.js"

export default class MainMenu extends Scene {

    constructor(tilesize, assetsToLoad) {
        super(tilesize, assetsToLoad)
        this.mainMenuLocation = 0
        this.menuHeights = [0, 0, 0]
        this.arrowLocation = 0
        this.arrowHeight = 0
        this.
    }

    init() {
        const ctx = Game.contexts.get("playground")
        var width_menu = 0

        ctx.font = "48px serif"

        const textsToPrint = ["NEW", "LOAD", "OPTIONS"]

        var actualHeight = 0
        for (let index = 0; index < textsToPrint.length; index++) {
            var text = textsToPrint[index]
            var textMetrics = ctx.measureText(text)
            actualHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent

            var actualWidth = textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight
            if (actualWidth > width_menu)
                width_menu = actualWidth

            ctx.fillText(text, (Game.width - actualWidth) / 2, Game.height - 2 * (textsToPrint.length + 1) * actualHeight + 2 * actualHeight * (1 + index))
            this.menuHeights[index] = Game.height - 2 * (textsToPrint.length + 1) * actualHeight + 2 * actualHeight * (1 + index)
        }
        width_menu += 2 * actualHeight

        this.drawLeftMenuArrow(this.menuHeights[this.mainMenuLocation], actualHeight, actualWidth)
        this.drawRightMenuArrow(this.menuHeights[this.mainMenuLocation], actualHeight, actualWidth)
        this.arrowLocation = this.menuHeights[this.mainMenuLocation]

        ctx.strokeRect((Game.width - width_menu) / 2 - actualHeight, Game.height - 8 * actualHeight, width_menu + 2 * actualHeight, 7 * actualHeight)

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "z":
                    if (this.mainMenuLocation > 0) {
                        this.mainMenuLocation--
                    }
                    break

                case "s":
                    if (this.mainMenuLocation < textsToPrint.length - 1) {
                        this.mainMenuLocation++
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
        console.log(this.arrowLocation + ';' + this.menuHeights[this.mainMenuLocation])
        if (this.arrowLocation < this.menuHeights[this.mainMenuLocation]) {
            this.arrowLocation++
        }

    }


    drawLeftMenuArrow(yoffset, arrowHeight, maxFontWidth) {
        const ctx = Game.contexts.get("UI")

        var xoffset = (Game.width - maxFontWidth) / 2 - arrowHeight - 20

        ctx.beginPath()
        ctx.moveTo(xoffset, yoffset)
        ctx.lineTo(xoffset, yoffset - arrowHeight)
        ctx.lineTo(xoffset + arrowHeight * Math.cos(Math.PI / 6), yoffset - arrowHeight + arrowHeight * Math.sin(Math.PI / 6))
        ctx.closePath()

        ctx.fill()
    }

    drawRightMenuArrow(yoffset, arrowHeight, maxFontWidth) {
        const ctx = Game.contexts.get("UI")

        var xoffset = (Game.width + maxFontWidth) / 2 + arrowHeight + 20

        ctx.beginPath()
        ctx.moveTo(xoffset, yoffset)
        ctx.lineTo(xoffset, yoffset - arrowHeight)
        ctx.lineTo(xoffset - arrowHeight * Math.cos(Math.PI / 6), yoffset - arrowHeight + arrowHeight * Math.sin(Math.PI / 6))
        ctx.closePath()

        ctx.fill()
    }
}