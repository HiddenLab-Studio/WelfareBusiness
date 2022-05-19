let shopManager = (function() {

    // Variables ultra méga giga importantes
    let instance = undefined;
    let config = undefined;
    let init = false;
    let token = "1";

    // Contient toutes les informations de notre joueur
    // Cette variable ne doit en aucun cas être accessible
    let data = undefined;

    // Plant
    let plantLayer = undefined;
    let maxPlantLevel = 5;
    let upgradePlantTexture = [423, 451]

    return {
        init(layer, phaser, cfg){
            if(!init){
                init = true;
                instance = phaser;
                config = cfg;
                plantLayer = layer;
                data = dataManager.getData();

                plantLayer.forEachTile((tile) => {
                    tile.index = 0;
                })
            }
        },

        openShop(){
            shopManager.upgradePlant();
        },

        upgradePlant(){
            let plantLevel = data.shop.plant.level;
            if(plantLevel <= maxPlantLevel){
                let plantPos = data.shop.plant.pos;
                for (const plant of plantPos) {
                    if(plantLevel === plant[2]){
                        for (let i = 0; i < plant.length - 1; i++) {
                            console.log(plant[i])
                            plantLayer.putTileAt(upgradePlantTexture[i], plant[i][0], plant[i][1]);
                        }
                    }
                }
                data.shop.plant.level += 1;
                dataManager.save(token, data);
            } else {
                console.log("MAX LEVEL")
            }
        }

    }
})();