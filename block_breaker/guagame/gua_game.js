class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.keydowns = {}
        this.actions = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        var self = this
        window.addEventListener('keydown', function(event){
                // log(event)
                var k = event.key
                self.keydowns[k] = true
        })
        window.addEventListener('keyup', function(event){
                // log(event)
                var k = event.key
                self.keydowns[k] = false
        })
        this.init()
    }
    static instance(...arg) {
        this.i = this.i || new this(...arg)
        return this.i
    }
    drawImage(img) {
        this.context.drawImage(img.img, img.x, img.y)
    }
    draw() {
        this.scene.draw()
    }
    update() {
        this.scene.update()
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        var o = this
        var actions = Object.keys(o.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (o.keydowns[key]) {
                // 如果按键被按下，调用对应的注册事件
                o.actions[key]()
            }
        }
        // update x
        o.update()
        //clear
        o.context.clearRect(0, 0, o.canvas.width, o.canvas.height)
        //drwaImage
        o.draw()
        //递归调用setTimeout
        setTimeout(function() {
            o.runloop()
        }, 1000/window.fps)
    }
    imageByName(name) {
        var o =this
        var img = o.images[name]
        var image = {
            img: img,
            w: img.width,
            h: img.height,
        }
        return image
    }
    runWithScene(scene) {
        var o =this
        o.scene = scene
        //开始运行程序
        setTimeout(function() {
            o.runloop()
        }, 1000/window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    run() {
        this.runCallback(this)
    }

    init() {
        var o = this
        var loads = []
        var names = Object.keys(o.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = o.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 o.images 中
                o.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                if (loads.length == names.length) {
                    o.run()
                }
            }
        }
    }
}
