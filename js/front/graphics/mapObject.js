class mapLayer {
    constructor(game, config) {
        this.map = undefined
        this.game = game;
        this.config = config;
        this.start = false
        this.groundLayer = undefined
        this.marker = undefined
        
    }

    createmap() {
        console.log("creation de la map")
        this.map = this.game.make.tilemap({ key: "map" });

        const tileset = this.map.addTilesetImage("tileset_1", "tiles");

        this.groundLayer = this.map.createLayer("sol1", tileset, 0, 0);
        const mur1 = this.map.createLayer("mur1", tileset, 0, 0);
        const zone1 = this.map.createLayer("zone1", tileset, 0, 0);
        const zone2 = this.map.createLayer("zone2", tileset, 0, 0);


        this.marker = this.game.add.graphics();
        this.marker.lineStyle(5, 0xffffff, 1);
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight)

    }
    returnmap(){
        return this.map
    }
    BoolCreateMap() {
        this.start = true
    }
    isStarted() {
        return this.start
    }
}

