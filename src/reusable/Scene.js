import Game from "./Game.js"

export default class Scene {

    constructor(tilesize, assetsToLoad) {
        this.tilesize = tilesize

        this.assetsToLoad = assetsToLoad
        this.assets = new Map()
    }

    frameUpdate() {
        window.requestAnimationFrame(() => this.frameUpdate())

        this.main()

        const msNow = window.performance.now()
        const msPassed = msNow - this.msPrev

        if (msPassed < Game.msPerFrame) return

        const excessTime = msPassed % Game.msPerFrame
        this.msPrev = msNow - excessTime
    }


    load() {
        if (this.assetsToLoad != null) {
            const assetsLoaded = this.assetsToLoad.map(url =>
                new Promise(resolve => {
                    const img = new Image()
                    img.onerror = e => console.log(`${url} failed to load`)
                    img.onload = e => {
                        console.log(`${url} loaded`)
                        resolve(img)
                    }
                    img.src = './assets/' + this.constructor.name + '/' + url
                    this.assets.set(url.slice(url.lastIndexOf("/") + 1, url.length - 4), img)
                })
            );

            Promise
                .all(assetsLoaded)
                .then(() => this.init())
                .then(() => this.frameUpdate())
                .catch(err => console.error(err))
        }
        else {
            this.init()
            this.main()
        }
    }


    init() {
        //A override dans une fonction main d'une classe "non reusable"
    }

    main() {
        //A override dans une fonction main d'une classe "non reusable"
    }
}