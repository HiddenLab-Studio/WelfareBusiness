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
    this.load.tilemapTiledJSON("map", "./public/js/game/map/map_pres.json");
}

let id = 0;
let desk = [];
let allowedIndex = ["1", "2", "3", "29", "30", "31"];
function create(){
    const map = this.make.tilemap({key: "map"});
    const tileSet = map.addTilesetImage("tileset_1", "tiles");
    let sol = map.createLayer("sol1", tileSet);
    let desk1 = map.createLayer("bureau_lvl1_1", tileSet);

    let tmp = [];
    desk1.forEachTile((element) => {
        let elementIndex = element.index;
        if(allowedIndex.includes(elementIndex.toString())){
            if(tmp.length === 5){
                console.log("here");
                let posConcat = [];
                for (let i = 0; i < 5; i++) { posConcat[i] = tmp[i].pos; }
                let obj = {
                    id: id,
                    pos: posConcat,
                    level: 1
                }
                id++;
                tmp = [];
                desk.push(obj);
            } else {
                tmp.push({
                    materialId: elementIndex,
                    pos: [element.x, element.y]
                });
            }
        }
    })
    console.log(desk);

    this.input.on("pointerdown", (pos) => {
        try {
            let target = desk1.getTileAtWorldXY(pos.x, pos.y);
            console.log("Click detected position: x:" + target.x + " y:" + target.y);
            console.log("Index of the clicked case is " + target.index)
            if(allowedIndex.includes(target.index.toString())){
                target.index = 0;
            }
        } catch (ignored) {}
    })





    /*const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset_1", "tiles");
    const sol1 = map.createLayer("sol1", tileset, 0, 0);
    // -1 = mur / 38 sol /
    zone1.findTile((tile) => {
        console.log(tile.index)
        let index = tile.index;
        if(index === 15){
            tile.index = 38;
        }
    })
    console.log(tileset.tileData);
    this.input.on("pointerdown", (pos) => {
        console.log(map.getTileAt(parseInt(pos.x), parseInt(pos.y)));
    })*/

}

function update(){

}