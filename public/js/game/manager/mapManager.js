let mapManager = (function(){

    // init function used?
    let init = false;
    // createMap function used? Création de la map une seule et unique fois
    let isMapCreated = false;
    // Token loadData
    let token = "1";

    // Variables importantes
    let map = undefined;
    let config = undefined;
    let welfareBusinessGame = undefined
    let hud = undefined;
    // userData
    let data = undefined;

    return {
        // Initialisation de la map
        init(phaser, cfg, instance){
            if(!init){
                init = true;
                config = cfg;
                welfareBusinessGame = new welfareBusiness();
                hud = new hudObject(instance, config, welfareBusinessGame)
            }
        },

        // Getters (security risk)
        getWelfareBusinessGame: () => welfareBusinessGame,
        getHud: () => hud,
        getMap: () => map,
        isMapCreated: () => isMapCreated,

        // Methods
        async createMap(instance){
            if(!isMapCreated){
                isMapCreated = true;
                map = instance.make.tilemap({key: "map"});
                const tileSet = map.addTilesetImage("tileset_wb", "tiles");
                map.createLayer("sol1", tileSet);
                map.createLayer("mur1", tileSet);
                map.createLayer("jardin", tileSet);
                map.createLayer("arbre", tileSet);
                let desk = map.createLayer("bureau_lvl1", tileSet);
                let plant = map.createLayer("plante", tileSet);
                let sport = map.createLayer("sport", tileSet);
                let sleep = map.createLayer("detente", tileSet);
                let kitchen = map.createLayer("cuisine", tileSet);
                let kitchenObj = map.createLayer("cuisine2", tileSet);
                let water = map.createLayer("eau", tileSet);
                let coffee = map.createLayer("cafe", tileSet);
                map.createLayer("toilettes", tileSet);
                let ping = map.createLayer("ping", tileSet);

                /*instance.input.on("pointerdown", (pos) => {
                    let tile = coffee.getTileAtWorldXY(pos.worldX, pos.worldY);
                    if(tile !== null){
                        console.log(tile.x, tile.y);
                    }
                })*/

                // On initialise le module qui gère les données
                dataManager.init(map);
                await dataManager.load(token).then((response) => {data = response}).then(() => {
                    // Amélioration
                    if(!data.shop.sport.active) sport.visible = false;
                    if(!data.shop.sleep.active) sleep.visible = false;
                    if(!data.shop.ping.active) ping.visible = false;
                    if(!data.shop.kitchen.active) {
                        kitchen.visible = false;
                        kitchenObj.visible = false;
                    }

                    // On initialise les bureaux
                    deskManager.init(desk, instance, config);
                    // On initialise le shop
                    shopManager.init([plant, sport, kitchen, kitchenObj, sleep, water, coffee, ping], instance, config);
                })
            }
        }
    }

})();