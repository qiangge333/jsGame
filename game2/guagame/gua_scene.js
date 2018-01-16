class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.dubugModleEnable = false
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img) {
        this.elements.push(img)
        img.scene = this
    }
    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            this.game.drawTexture(e)
        }
    }
    update() {
        if (this.dubugModleEnable) {
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
