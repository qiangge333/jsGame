var GuaGame = function(images) {
    // images是一个对象， 里面包含引用名和图片路径
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    var o = {
        canvas: canvas,
        context: context,
        keydowns: {},
        actions: {},
        images: {},
    }
    o.drawImage = function(img) {
        context.drawImage(img.img, img.x, img.y)
    }
    //
    window.addEventListener('keydown', function(event){
            // log(event)
            var k = event.key
            o.keydowns[k] = true
    })
    window.addEventListener('keyup', function(event){
            // log(event)
            var k = event.key
            o.keydowns[k] = false
    })
    //
    o.registerAction = function(key, callback) {
        o.actions[key] = callback
    }

    window.fps = 30
    var runloop = function() {
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
        context.clearRect(0, 0, canvas.width, canvas.height)
        //drwaImage
        o.draw()
        //递归调用setTimeout
        setTimeout(function() {
            runloop()
        }, 1000/window.fps)
    }

    //载入图片
    var loads = []
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
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

    o.imageByName = function(name) {
        var img = o.images[name]
        var image = {
            img: img,
            w: img.width,
            h: img.height,
        }
        return image
    }
    
    o.run = function() {
        //开始运行程序
        setTimeout(function() {
            runloop()
        }, 1000/window.fps)
    }

    return o
}
