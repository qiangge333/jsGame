var Ball = function(game) {
    var o = {
        img: img,
        x: 100,
        y: 150,
        speedx: 5,
        speedy: 5,
    }
    var img = game.imageByName('ball')
    o.img = img.img
    o.w = img.w
    o.h = img.h
    o.fire = function() {
        o.fired = true
        log('o.fired is ', o.fired)
    }
    o.move = function() {
        if (o.fired) {
            if (o.x >= 400 || o.x <= 0) {
                o.speedx *= -1
            }
            if (o.y >= 300 || o.y <= 0) {
                o.speedy *= -1
            }
            o.x += o.speedx
            o.y += o.speedy
        }
    }

    o.rebound = function() {
        o.speedy = -o.speedy
    }
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}
