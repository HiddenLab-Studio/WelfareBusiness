let mapManager = (function(){

    // init function used?
    let init = false;
    // createMap function used?
    let isMapCreated = false;

    let map = undefined;
    let config = undefined;
    let welfareBusinessGame = undefined
    let hud = undefined;

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

        // Getters
        getWelfareBusinessGame: () => welfareBusinessGame,
        getHud: () => hud,
        getMap: () => map,

        async createMap(instance){
            if(!isMapCreated){
                isMapCreated = true;
                map = instance.make.tilemap({key: "map"});
                const tileSet = map.addTilesetImage("tileset_1", "tiles");
                let sol = map.createLayer("sol1", tileSet);
                let mur = map.createLayer("mur1", tileSet);
                let desk = map.createLayer("bureau_lvl1_1", tileSet);
                let deskLvl2 = map.createLayer("bureau_lvl2_1", tileSet);

                dataManager.init(map);
                await deskManager.init(instance, init);
                deskManager.registerEvent(desk, instance)
            }
        }
    }

})();