var GuaGame = function() {
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    var o = {
        canvas: canvas,
        context: context,
        keydowns: {},
        actions: {},
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
    setTimeout(function() {
        runloop()
    }, 1000/window.fps)

    return o
}
