export default class Game{
    constructor(widthResolution, fps, tilesize){
        this.width = widthResolution
        this.height = widthResolution * 9 /16
        this.fps = fps
        this.tilesize = tilesize
        this.msPerFrame = 1000 / fps
        this.msPrev = window.performance.now()

        const arrayCanvas = Array.prototype.slice.call(document.getElementsByTagName('canvas'))
        arrayCanvas.forEach(canvas => {
            canvas.width = this.width
            canvas.height = this.height
        });

        this.init()

        requestAnimationFrame(()=>this.frameUpdate());
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