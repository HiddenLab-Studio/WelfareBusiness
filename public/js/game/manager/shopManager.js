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

    let waterLayer = undefined;
    let maxWaterLevel = 2;
    let upgradeWaterTexture = [424, 452];

    let coffeeLayer = undefined;
    let maxCoffeeLevel = 1;
    let upgradeCoffeeTexture = [421, 449, 422, 450];

    // Sport - Kitchen - Sleep - Ping
    let sportLayer = undefined;
    let kitchenLayer = undefined;
    let sleepLayer = undefined;
    let pingLayer = undefined;

    function loadObj(str, variable){
        let level = variable.level;
        let pos = variable.pos;
        let layer = undefined;
        let upgradeTexture = undefined;
        switch (str){
            case "plant":
                layer = plantLayer;
                upgradeTexture = upgradePlantTexture;
                break;
            case "water":
                layer = waterLayer;
                upgradeTexture = upgradeWaterTexture;
                break;
            case "coffee":
                layer = coffeeLayer;
                upgradeTexture = upgradeCoffeeTexture;
                break;
            default:
                return;
        }

        for (const po of pos) {
            for (let j = 0; j < po.length - 1; j++) {
                if (po[po.length - 1] <= level) {
                    layer.putTileAt(upgradeTexture[j], po[j][0], po[j][1]);
                }
            }
        }

    }

    return {
        init(layer, phaser, cfg){
            if(!init){
                init = true;
                instance = phaser;
                config = cfg;
                plantLayer = layer[0];
                sportLayer = layer[1]
                kitchenLayer = [layer[2], layer[3]];
                sleepLayer = [layer[4], layer[5]];
                waterLayer = layer[6];
                coffeeLayer = layer[7];
                pingLayer = layer[8];
                data = dataManager.getData();

                plantLayer.forEachTile((tile) => {
                    tile.index = 0;
                })

                waterLayer.forEachTile((tile) => {
                    tile.index = 0;
                })

                coffeeLayer.forEachTile((tile) => {
                    tile.index = 0;
                })

                if(data.shop.plant.level !== 0) loadObj("plant", data.shop.plant);
                if(data.shop.water.level !== 0) loadObj("water", data.shop.water);
                if(data.shop.coffee.level !== 0) loadObj("coffee", data.shop.coffee);

            }
        },

        upgradeObject(str){
            let level = undefined;
            let maxLevel = undefined;
            let elementPos = undefined;
            let upgradeTexture = undefined;
            switch (str){
                case "plant":
                    level = data.shop.plant.level;
                    maxLevel = maxPlantLevel;
                    elementPos = data.shop.plant.pos;
                    upgradeTexture = upgradePlantTexture;
                    break;
                case "water":
                    level = data.shop.water.level;
                    maxLevel = maxWaterLevel;
                    elementPos = data.shop.water.pos;
                    upgradeTexture = upgradeWaterTexture;
                    break;
                case "coffee":
                    level = data.shop.coffee.level;
                    maxLevel = maxCoffeeLevel;
                    elementPos = data.shop.coffee.pos;
                    upgradeTexture = upgradeCoffeeTexture;
                    break;
                default:
                    break;
            }

            if(level <= maxLevel){
                for (const elementPo of elementPos) {
                    console.log(elementPo[elementPo.length - 1])
                    if (level === elementPo[elementPo.length - 1]) {
                        for (let i = 0; i < elementPo.length - 1; i++) {
                            console.log(elementPo[i])
                            console.log("here")
                            plantLayer.putTileAt(upgradeTexture[i], elementPo[i][0], elementPo[i][1]);
                        }
                    }
                }
                switch (str){
                    case "plant":
                        data.shop.plant.level += 1;
                        break;
                    case "water":
                        data.shop.water.level += 1;
                        break;
                    case "coffee":
                        data.shop.coffee.level += 1;
                        break;
                    default:
                        break;
                }
                dataManager.save(token, data);
            } else {
                console.log("MAX LEVEL")
            }

        },


        buySport(){
            let isActive = data.shop.sport.active;
            if(!isActive){
                data.shop.sport.active = true;
                sportLayer.visible = true;
                console.log("Sport purchased")
                dataManager.save(token, data);
            } else {
                console.log("MAX LEVEL")
            }
        },

        buyKitchen(){
            let isActive = data.shop.kitchen.active;
            if(!isActive){
                data.shop.kitchen.active = true;
                kitchenLayer[0].visible = true;
                kitchenLayer[1].visible = true;
                console.log("Kitchen purchased")
                dataManager.save(token, data);
            } else {
                console.log("MAX LEVEL")
            }
        },

        buySleep(){
            let isActive = data.shop.sleep.active;
            if(!isActive){
                data.shop.sleep.active = true;
                sleepLayer[0].visible = true;
                sleepLayer[1].visible = true;
                console.log("Sleep purchased")
                dataManager.save(token, data);
            } else {
                console.log("MAX LEVEL")
            }
        },

        buyPing(){
            let isActive = data.shop.ping.active;
            if(!isActive){
                data.shop.ping.active = true;
                pingLayer.visible = true;
                console.log("Ping purchased")
                dataManager.save(token, data);
            } else {
                console.log("MAX LEVEL")
            }
        }

    }
})();