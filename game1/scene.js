var scene = function(game) {
    var s = {
        game: game,
    }
    // 初始化
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

    s.draw = function() {
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
        game.context.fillText("分数: " + score, 10, 290)
    }
    s.update = function() {
        if (window.paused) {
            log('暂停')
            return
        }
        ball.move()
        if (ball.y > paddle.y) {
            var s = sceneEnd(game)
            game.replaceScene(s)
        }
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
    //
    return s
}
