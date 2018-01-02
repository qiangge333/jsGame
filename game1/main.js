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
    var game = GuaGame(images, function(game) {
        //debug模式
        var enable = true
        enableDebugMode(game, enable)
        var paddle = Paddle(game)
        var ball = Ball(game)

        blocks = loadLevers(game, 1)

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

        // 鼠标移动事件
        var enableDraw = false
        game.canvas.addEventListener('mousedown', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, event)
            if (ball.hasPoint(x, y)) {
                log('鼠标移动事件', x, y, event)
                enableDraw = true
            }
        })
        game.canvas.addEventListener('mousemove', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDraw) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function(event) {
            var x = event.offsetX
            var y = event.offsetY
            enableDraw = false
        })
        game.draw = function() {
            // draw 背景
            game.context.fillStyle = "#554"
            game.context.fillRect(0, 0, 400, 300)
            // draw图片
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
    })
}

__mian()
