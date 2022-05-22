let shopManager = (function () {

    // Variables ultra méga giga importantes
    let instance = undefined;
    let config = undefined;
    let init = false;
    let token = "1";

    // Contient toutes les informations de notre joueur
    // Cette variable ne doit en aucun cas être accessible
    let data = undefined;

    // Plant - Water - Coffee
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

    // Game
    let welfareGame = undefined;

    /**
     * Permet de load les objets que le joueur a achetés dans le shop
     * @param str type de l'objet
     * @param variable data de l'objet
     */
    function loadObj(str, variable) {
        let level = variable.level;
        let pos = variable.pos;
        let layer = undefined;
        let upgradeTexture = undefined;
        switch (str) {
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
        /**
         *
         * @param layer array qui contient toutes les layers importantes (pour chaque objet)
         * @param phaser instance (phaser)
         * @param cfg config (phaser)
         */
        init(layer, phaser, cfg) {
            if (!init) {
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

                plantLayer.forEachTile((tile) => tile.index = 0);
                waterLayer.forEachTile((tile) => tile.index = 0);
                coffeeLayer.forEachTile((tile) => tile.index = 0);
                if (data.shop.plant.level !== 0) loadObj("plant", data.shop.plant);
                if (data.shop.water.level !== 0) loadObj("water", data.shop.water);
                if (data.shop.coffee.level !== 0) loadObj("coffee", data.shop.coffee);

                welfareGame = mapManager.getWelfareBusinessGame();
            }
        },

        /**
         * Permet d'améliorer un objet contre de l'argent
         * @param str type de l'objet (string)
         */
        upgradeObject(str) {
            let level = undefined;
            let maxLevel = undefined;
            let elementPos = undefined;
            let upgradeTexture = undefined;
            switch (str) {
                case "plant":
                    level = data.shop.plant.level;
                    maxLevel = maxPlantLevel;
                    elementPos = data.shop.plant.pos;
                    upgradeTexture = upgradePlantTexture;
                    if (welfareGame.getPlayerMoney() < 300 || level > maxLevel) return;
                    welfareGame.payAmount(300);
                    break;
                case "water":
                    level = data.shop.water.level;
                    maxLevel = maxWaterLevel;
                    elementPos = data.shop.water.pos;
                    upgradeTexture = upgradeWaterTexture;
                    if (welfareGame.getPlayerMoney() < 150 || level > maxLevel) return;
                    welfareGame.payAmount(150);
                    break;
                case "coffee":
                    level = data.shop.coffee.level;
                    maxLevel = maxCoffeeLevel;
                    elementPos = data.shop.coffee.pos;
                    upgradeTexture = upgradeCoffeeTexture;
                    if (welfareGame.getPlayerMoney() < 400 || level >= maxLevel) return;
                    welfareGame.payAmount(400);
                    break;
                default:
                    return;
            }

            if (level <= maxLevel) {
                for (const elementPo of elementPos) {
                    if (level === elementPo[elementPo.length - 1]) {
                        for (let i = 0; i < elementPo.length - 1; i++) {

                            plantLayer.putTileAt(upgradeTexture[i], elementPo[i][0], elementPo[i][1]);
                        }
                    }
                }
                switch (str) {
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
            }
        },

        // Achat de la salle de sport
        buySport() {
            let isActive = data.shop.sport.active;
            if (!isActive) {
                if (welfareGame.getPlayerMoney() > 2000) {
                    mapManager.getHud().getWindow().bePopupSport();


                    welfareGame.payAmount(2000);
                    data.shop.sport.active = true;
                    sportLayer.visible = true;
                    dataManager.save(token, data);
                }
            }
        },

        // Achat de la cuisine
        buyKitchen() {
            let isActive = data.shop.kitchen.active;
            if (!isActive) {
                if (welfareGame.getPlayerMoney() > 3500) {
                    welfareGame.payAmount(3500);
                    mapManager.getHud().getWindow().BePopupCafet()

                    data.shop.kitchen.active = true;
                    kitchenLayer[0].visible = true;
                    kitchenLayer[1].visible = true;
                    dataManager.save(token, data);
                }
            }
        },

        // Achat de la salle de repos
        buySleep() {
            let isActive = data.shop.sleep.active;
            if (!isActive) {
                if (welfareGame.getPlayerMoney() > 2500) {
                    welfareGame.payAmount(2500);
                    mapManager.getHud().getWindow().bePopupNap()


                    data.shop.sleep.active = true;
                    sleepLayer[0].visible = true;
                    sleepLayer[1].visible = true;
                    dataManager.save(token, data);
                }
            }
        },

        // Achat de la table de ping-pong
        buyPing() {
            let isActive = data.shop.ping.active;
            if (!isActive) {
                if (welfareGame.getPlayerMoney() > 500) {
                    data.shop.ping.active = true;
                    pingLayer.visible = true;
                    dataManager.save(token, data);
                }
            }
        }
    }
})();