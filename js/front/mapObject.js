class map {
    constructor(game, config) {

        this.game = game;
        this.config = config;


    }

    createmap() {
        const map = this.game.make.tilemap({ key: "map" });

        const tileset = map.addTilesetImage("tileset_1", "tiles");

        const sol1 = map.createLayer("sol1", tileset, 0, 0);
        const mur1 = map.createLayer("mur1", tileset, 0, 0);
        const zone1 = map.createLayer("zone1", tileset, 0, 0);
        const zone2 = map.createLayer("zone2", tileset, 0, 0);
        //const worldLayer = map.createLayer("mur1", tileset, 0, 0);
        //const aboveLayer = map.createLayer("racine_chaise1", tileset, 0, 0);



    }
}