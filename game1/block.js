var Block = function(position) {
    var p = position
    var img = imageFromPath('block.png')
    var o = {
        img: img,
        x: p[0],
        y: p[1],
        w: 50,
        h: 20,
        lifes: p[2] || 1,
        alive: true,
    }
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
