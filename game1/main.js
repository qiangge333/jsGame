blocks = []

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    log('开启debug模式')
    window.paused = false
    window.addEventListener('keydown', function(event){
        // log(event)
        var k = event.key
        log('key = ', k)
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        }
        if ('1234567'.includes(k)) {
            blocks = loadLevers(game, k)
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __mian = function() {
    var images = {
        paddle: 'paddle.png',
        ball: 'ball.png',
        block: 'block.png',
    }
    var game = GuaGame(images, function(g) {
        var s = scene(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__mian()
