var e = sel => document.querySelector(sel)

var log = console.log.bind(console)
// var log = function(s) {
//     e('#id-text-log').value += '\n' + s
// }

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}

var rectIntersects = function(a, b) {
    if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
        if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
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

var randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return  Math.floor(n) + start
}
