var Ball = function() {
    var img = imageFromPath('ball.png')
    var o = {
        img: img,
        x: 100,
        y: 150,
        speedx: 5,
        speedy: 5,
    }
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

    return o
}
