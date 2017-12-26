var log = console.log.bind(console)

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

var loadLevers = function(n) {
    var blocks = []
    n = n -1
    level = levels[n]
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        blocks.push(Block(p))
    }
    return blocks
}
