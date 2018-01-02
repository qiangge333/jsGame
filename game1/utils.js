var e = sel => document.querySelector(sel)

// var log = console.log.bind(console)
var log = function(s) {
    e('#id-text-log').value += '\n' + s
}

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.img.height) {
        if (b.x > o.x && b.x < o.x + o.img.width) {
            return true
        }
    }
    return false
}

var loadLevers = function(game, n) {
    var blocks = []
    n = n -1
    level = levels[n]
    log('level is ', level)
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        blocks.push(Block(game, p))
    }
    return blocks
}
