const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "phaser",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const phaser = new Phaser.Game(config);
function preload(){
    this.load.image("tiles", "./public/js/game/map/tileset_1.png");
    this.load.image("closeBtn", "./public/assets/img/game/closeBtn.png");
    this.load.image("background", "./public/assets/img/game/background.png");
    this.load.tilemapTiledJSON("map", "./public/js/game/map/map_pres.json");
}

function create(){
    const map = this.make.tilemap({key: "map"});
    const tileSet = map.addTilesetImage("tileset_1", "tiles");
    let sol = map.createLayer("sol1", tileSet);
    let desk = map.createLayer("bureau_lvl1_1", tileSet);

    deskManager.init(desk, phaser, config);
    deskManager.registerEvent(desk, this);

}

function update(){

}