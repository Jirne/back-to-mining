export default class Game{
    constructor(widthResolution, fps, tilesize, assets){
        this.width = widthResolution
        this.height = widthResolution * 9 /16
        this.fps = fps
        this.tilesize = tilesize
        this.msPerFrame = 1000 / fps
        this.msPrev = window.performance.now()
        this.assets = []

        const arrayCanvas = Array.prototype.slice.call(document.getElementsByTagName('canvas'))
        arrayCanvas.forEach(canvas => {
            canvas.width = this.width
            canvas.height = this.height
        });

        const assetsLoaded = assets.map(url =>
            new Promise(resolve => {
              const img = new Image();
              img.onerror = e => console.log(`${url} failed to load`);
              img.onload = e => {
                console.log(`${url} loaded`)
                resolve(img)};
              img.src = '/assets/'+url;
              this.assets[url.slice(0,url.length - 4)] = img
            })
          );


        Promise
        .all(assetsLoaded)
        .then(() => {this.init()})
        .then(() => {this.init(window.requestAnimationFrame(()=>this.frameUpdate()))})
        .catch(err => console.error(err));        
    }

    frameUpdate() {
        window.requestAnimationFrame(()=>this.frameUpdate())

        this.main()
    
        const msNow = window.performance.now()
        const msPassed = msNow - this.msPrev
      
        if (msPassed < this.msPerFrame) return
      
        const excessTime = msPassed % this.msPerFrame
        this.msPrev = msNow - excessTime
    }

    main(){
        //A override dans une fonction main d'une classe "non reusable"
    }

    init(){
        
    }
}