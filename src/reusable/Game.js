export default class Game {
  static contexts
  static msPerFrame
  static fps
  static defaultTileSize
  static width
  static height
  static scenes = new Map()

  static init(widthResolution, fps, arrayCanvas, defaultTileSize) {
    this.width = widthResolution
    this.height = widthResolution * 9 / 16
    this.fps = fps
    this.msPerFrame = 1000 / fps
    this.msPrev = window.performance.now()
    this.defaultTileSize = defaultTileSize
    this.contexts = new Map()
    this.scenes = new Map()

    arrayCanvas.forEach(canvas => {
      let newCanvas = document.createElement('canvas')
      newCanvas.width = this.width
      newCanvas.height = this.height
      newCanvas.id = canvas.name
      newCanvas.style.zIndex = canvas.zIndex.toString()
      let context = newCanvas.getContext('2d')

      if (!context || !(context instanceof CanvasRenderingContext2D)) {
        throw new Error('Failed to get 2D context')
      }

      this.contexts.set(canvas.name, context)

      document.getElementsByTagName("body")[0].appendChild(newCanvas)
    })
  }

  static loadScene(index) {
    this.scenes.get(index).load()
  }
}