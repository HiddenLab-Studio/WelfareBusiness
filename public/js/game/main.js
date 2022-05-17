const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 563,
    backgroundColor: '#DAD1CF',
    parent: "phaser",
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    fps: {
        target: 30,
        forceSetTimeOut: true
    },
};

const phaser = new Phaser.Game(config);
function preload(){
    this.load.image('button_play', './public/assets/img/game/bouton_play.png');
    this.load.image('chaise', './public/assets/img/game/chaise_bureau.png');
    this.load.image('windowBack', './public/assets/img/game/HUD/fenetre.png');
    this.load.image('volumeMute', './public/assets/img/game/HUD/son_coupe.png');
    this.load.image('volumeLow', './public/assets/img/game/HUD/son_min.png');
    this.load.image('volumeHigh', './public/assets/img/game/HUD/son_max.png');
    this.load.audio('accueil', ['./audio/getmap.mp3', './audio/getmap.ogg']);
    this.load.image('button_settings', './public/assets/img/game/HUD/settings.png');
    this.load.image('button_shop', './public/assets/img/game/HUD/logo_shop.png');
    this.load.image('argent_hud', './public/assets/img/game/HUD/argent_hud.png');
    this.load.image('barre_hud', './public/assets/img/game/HUD/barre_hud.png');
    this.load.image('date_hud', './public/assets/img/game/HUD/date_hud.png');
    this.load.image('pause', './public/assets/img/game/HUD/bouton_pause.png');
    this.load.image('play', './public/assets/img/game/HUD/bouton_play.png');
    this.load.image('avance_rapide', './public/assets/img/game/HUD/bouton_acc.png');
    this.load.image('closeWindowBtn', './public/assets/img/game/HUD/croix.png');
    this.load.image('emote_neutre', './public/assets/img/game/HUD/neutre.png')
    this.load.image('emote_colere', './public/assets/img/game/HUD/colere.png')
    this.load.image('emote_heureux', './public/assets/img/game/HUD/bonheur.png')
    this.load.image('projet_hud', './public/assets/img/game/HUD/projet_hud.png');
    this.load.image('menu_hud', './public/assets/img/game/HUD/menu_hud.png');
    this.load.image('bouton_projet', './public/assets/img/game/HUD/bouton_projet.png');
    this.load.image('progress_bar', './public/assets/img/game/hud/progress_bar.png')

    //this.load.tilemapTiledJSON("map", "./map/map_pres.json");
    //this.load.image("tiles", "./map/tileset_1.png");
    
    
    this.load.image("tiles", "./public/js/game/map/tileset_1.png");
    this.load.tilemapTiledJSON("map", "./public/js/game/map/map_pres.json");
}

function create(){
    /*const map = this.make.tilemap({key: "map"});
    const tileSet = map.addTilesetImage("tileset_1", "tiles");
    let sol = map.createLayer("sol1", tileSet);
    let mur = map.createLayer("mur1", tileSet);
    let desk = map.createLayer("bureau_lvl1_1", tileSet);
    let deskLvl2 = map.createLayer("bureau_lvl2_1", tileSet);*/

    //welfareBusinessGame = new welfareBusiness();
    //hud = new hudObject(this, config, welfareBusinessGame);

    mapManager.init(phaser, config, this)
    /*dataManager.init(map);
    deskManager.init(config);
    deskManager.registerEvent(desk, this);*/
}

let limitRefreshRateCounter = 0;
function update(time, delta) {
    //Jeu
    let phaser = this;
    let welfareBusinessGame = mapManager.getWelfareBusinessGame();
    let hud = mapManager.getHud();

    if (welfareBusinessGame.isGameStarted()) {
        //Limiter l'update du projet à 2 fois par seconde :
        limitRefreshRateCounter++
        if (limitRefreshRateCounter === 15) {
            limitRefreshRateCounter = 0;
            welfareBusinessGame.updateProject();
            if (welfareBusinessGame.isRealProject()) {
                hud.updateProgressBar(welfareBusinessGame.getCurrentProjectPercentage());
            }
            else {

            }
            hud.updateMoneyCounter(welfareBusinessGame.getPlayerMoney());
            hud.updateHappinessCounter(welfareBusinessGame.getGlobalHappiness());
            hud.updateDate(welfareBusinessGame.getDate());
            hud.temporaryMessageWageLoop();
        }
    }

    //Caméra
    const getmap = hud.getmap()

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5,
    });

    controls.update(delta);
    /*if (getmap.isStarted()) {
        camera.setBounds(0, 0, getmap.returnmap().widthInPixels, getmap.returnmap().heightInPixels); //fixe les bords à FIXE MARCHE PAS

    }*/
}