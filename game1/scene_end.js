var sceneEnd = function(game) {
    var s = {
        game: game,
    }
    // draw
    s.draw = function() {
        game.context.fillText("游戏结束", 170, 180)
    }
    // update
    s.update = function() {
    }
    return s
}
