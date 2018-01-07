class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        var game = this.game
        this.sky = GuaImage.new(game, 'sky')
        this.cloud = GuaImage.new(game, 'cloud')
        this.player = GuaImage.new(game, 'player')
        this.player.x = 100
        this.player.y = 150
        
        this.addElement(this.sky)
        this.addElement(this.cloud)
        this.addElement(this.player)
    }
    update() {
        this.cloud.y += 1
    }
}
