var Block = function(game, position) {
    var p = position
    var o = {
        img: img,
        x: p[0],
        y: p[1],
        lifes: p[2] || 1,
        alive: true,
    }
    var img = game.imageByName('block')
    o.img = img.img
    o.w = img.w
    o.h = img.h

    o.kill = function() {
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }

    o.collide = function(b) {
        // log('block', o.alive, b)
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}
