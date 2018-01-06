var Paddle = function(game) {
    var o = {
        img: img,
        x: 100,
        y: 200,
        speed: 10,
    }
    var img = game.imageByName('paddle')
    o.img = img.img
    o.w = img.w
    o.h = img.h
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
        var a = o
        var b = ball
        return rectIntersects(a, b)
    }
    return o
}
