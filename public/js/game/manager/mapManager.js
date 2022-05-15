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

        // Methods
        async createMap(instance){
            if(!isMapCreated){
                isMapCreated = true;
                map = instance.make.tilemap({key: "map"});
                const tileSet = map.addTilesetImage("tileset_1", "tiles");
                map.createLayer("sol1", tileSet);
                map.createLayer("mur1", tileSet);
                let desk = map.createLayer("bureau_lvl1_1", tileSet);
                map.createLayer("bureau_lvl2_1", tileSet);

                // On initialise le module qui gère les données
                dataManager.init(map);
                await dataManager.load(token).then((response) => {data = response}).then(async () => {
                    // On initialise les bureaux
                    await deskManager.init(desk, instance, config);
                })
            }
        }
    }

})();