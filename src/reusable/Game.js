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
        this.init()
      })
      .then(() => {
        window.requestAnimationFrame(() => this.frameUpdate())
      })
      .catch(err => console.error(err));
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