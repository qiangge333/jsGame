var Paddle = function() {
    var img = imageFromPath('paddle.png')
    var o = {
        img: img,
        x: 100,
        y: 200,
        speed: 10,
    }
    o.move = function(x) {
        if (x < 0) {
            x = 0
        } else if (x + o.img.width > 400) {
            x = 400 - o.img.width
        }
        o.x  = x
    }
    o.moveLeft = function() {
        o.move(o.x -= o.speed)
    }
    o.moveRigth = function() {
        o.move(o.x += o.speed)
    }
    o.collide = function(ball) {
        if (ball.y + ball.img.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.img.width) {
                // log('相撞')
                return true
            }
        }
        return false
    }
    return o
}
