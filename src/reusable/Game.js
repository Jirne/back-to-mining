export default class Game {
  static context
  static assets
  static tilesize

  constructor(widthResolution, fps, tilesize, assets, arrayCanvas) {
    this.width = widthResolution
    this.height = widthResolution * 9 / 16
    this.fps = fps
    this.tilesize = tilesize
    this.msPerFrame = 1000 / fps
    this.msPrev = window.performance.now()
    this.assets = new Map()
    this.context = new Map()
    this.mainMenuLocation = 0;

    arrayCanvas.forEach(canvas => {
      let newCanvas = document.createElement('canvas')
      newCanvas.width = this.width
      newCanvas.height = this.height
      newCanvas.id = canvas.name
      newCanvas.style.zIndex = canvas.zIndex.toString()
      let context = newCanvas.getContext('2d');

      if (!context || !(context instanceof CanvasRenderingContext2D)) {
        throw new Error('Failed to get 2D context');
      }

      this.context.set(canvas.name, context)

      document.getElementsByTagName("body")[0].appendChild(newCanvas);
    });

    const assetsLoaded = assets.map(url =>
      new Promise(resolve => {
        const img = new Image();
        img.onerror = e => console.log(`${url} failed to load`);
        img.onload = e => {
          console.log(`${url} loaded`)
          resolve(img)
        };
        img.src = './assets/' + url;
        this.assets.set(url.slice(url.lastIndexOf("/") + 1, url.length - 4), img)
      })
    );


    Promise
      .all(assetsLoaded)
      .then(() => {
        this.loadMainMenu()
      })
      .catch(err => console.error(err));
  }

  loadMainMenu() {
    const ctx = this.context.get("playground")
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

      ctx.fillText(text, (this.width - actualWidth) / 2, this.height - actualHeight * index - actualHeight);
    }
    height_menu += actualHeight / 2

    var yoffset = this.height - actualHeight * textsToPrint.length - actualHeight / 2.5

    this.drawLeftMenuArrow(yoffset, actualHeight / 2.5, actualWidth, this.mainMenuLocation, width_menu)
    this.drawRightMenuArrow(yoffset, actualHeight / 2.5, actualWidth, this.mainMenuLocation, width_menu)

    ctx.strokeRect((this.width - width_menu) / 2 - actualHeight, this.height - height_menu - actualHeight / 2, width_menu + 2 * actualHeight, height_menu)

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
            const ctx = this.context.get("UI")
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)


            this.init()
            window.requestAnimationFrame(() => this.frameUpdate())
          }
          break
      }
    })
  }

  updateMenu() {

  }

  drawLeftMenuArrow(yoffset, arrowHeight, delta, index, maxFontWidth) {
    const ctx = this.context.get("UI")

    var xoffset = (this.width - maxFontWidth) / 2 - arrowHeight - 20
    yoffset += index * delta

    ctx.beginPath()
    ctx.moveTo(xoffset, yoffset)
    ctx.lineTo(xoffset, yoffset + arrowHeight)
    ctx.lineTo(xoffset + arrowHeight * Math.cos(Math.PI / 6), yoffset + arrowHeight - arrowHeight * Math.sin(Math.PI / 6))
    ctx.closePath()

    ctx.fill();

  }

  drawRightMenuArrow(yoffset, arrowHeight, delta, index, maxFontWidth) {
    const ctx = this.context.get("UI")

    var xoffset = (this.width + maxFontWidth) / 2 + arrowHeight + 20
    yoffset += index * delta

    ctx.beginPath()
    ctx.moveTo(xoffset, yoffset)
    ctx.lineTo(xoffset, yoffset + arrowHeight)
    ctx.lineTo(xoffset - arrowHeight * Math.cos(Math.PI / 6), yoffset + arrowHeight - arrowHeight * Math.sin(Math.PI / 6))
    ctx.closePath()

    ctx.fill();
  }


  frameUpdate() {
    window.requestAnimationFrame(() => this.frameUpdate())

    this.main()

    const msNow = window.performance.now()
    const msPassed = msNow - this.msPrev

    if (msPassed < this.msPerFrame) return

    const excessTime = msPassed % this.msPerFrame
    this.msPrev = msNow - excessTime
  }

  main() {
    //A override dans une fonction main d'une classe "non reusable"
  }

  init() {

  }
}