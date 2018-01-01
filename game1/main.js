blocks = []

var enableDebugMode = function(enable) {
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
            blocks = loadLevers(k)
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __mian = function() {
    //debug模式
    var enable = true
    enableDebugMode(enable)

    var game = GuaGame()

    var paddle = Paddle()
    var ball = Ball()

    blocks = loadLevers(1)

    var score = 0

    //注册事件
    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRigth()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    game.update = function() {
        if (window.paused) {
            log('暂停')
            return
        }
        ball.move()
        if (paddle.collide(ball)) {
            ball.speedy *= -1
        }
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if (b.alive) {
                if (b.collide(ball)) {
                    log('block and ball 相撞')
                    ball.rebound()
                    b.kill()
                    score += 100
                }
            }
        }
    }

    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
        // drwa block
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if (b.alive) {
                game.drawImage(b)
            }
        }
        // draw text
        game.context.fillText("分数: " + score, 10, 290);
    }
}

__mian()
