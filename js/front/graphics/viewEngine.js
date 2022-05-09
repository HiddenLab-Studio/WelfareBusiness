const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 563,
    backgroundColor: '#DAD1CF',
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

let gamePhaser = new Phaser.Game(config);
let chaise, menu, music;
let open = false;

function preload() {
    this.load.image('button_play', './img/bouton_play.png');
    this.load.image('chaise', './img/chaise_bureau.png');
    this.load.image('windowBack', './img/HUD/fenetre.png');
    this.load.image('volumeMute', './img/HUD/son_coupe.png');
    this.load.image('volumeLow', './img/HUD/son_min.png');
    this.load.image('volumeHigh', './img/HUD/son_max.png');
    this.load.audio('accueil', ['./audio/getmap.mp3', './audio/getmap.ogg']);
    this.load.image("tiles", "./map/tileset_1.png");
    this.load.tilemapTiledJSON("map", "./map/map_pres.json");
    this.load.image('button_settings', './img/HUD/settings.png');
    this.load.image('button_shop', './img/HUD/logo_shop.png');
    this.load.image('argent_hud', './img/HUD/argent_hud.png');
    this.load.image('bonheur_hud', './img/HUD/humeur_hud.png');
    this.load.image('date_hud', './img/HUD/date_hud.png');
    this.load.image('pause', './img/HUD/bouton_pause.png');
    this.load.image('play', './img/HUD/bouton_play.png');
    this.load.image('avance_rapide', './img/HUD/bouton_acc.png');
    this.load.image('closeWindowBtn', './img/HUD/croix.png');
}

let hud;
function create() {
    let phaser = this;
    welfareBusinessGame = new welfareBusiness();
    hud = new hudObject(phaser, config, welfareBusinessGame);

}


let limitRefreshRateCounter = 0;
function update(time, delta) {
    //Jeu
    let phaser = this;
    console.log("test");
    if (welfareBusinessGame.isGameStarted()) {
        //Limiter l'update du projet à 2 fois par seconde :
        limitRefreshRateCounter++
        if (limitRefreshRateCounter == 15) {
            limitRefreshRateCounter = 0;
            welfareBusinessGame.updateProject();
            hud.updateProgressBar(welfareBusinessGame.getCurrentProjectPercentage());
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
    if (getmap.isStarted()) {
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        const pointerTileXY = getmap.groundLayer.worldToTileXY(worldPoint.x, worldPoint.y);
        const snappedWorldPoint = getmap.groundLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
        getmap.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
        camera.setBounds(0, 0, getmap.returnmap().widthInPixels, getmap.returnmap().heightInPixels); //fixe les bords à FIXE MARCHE PAS

        if (this.input.manager.activePointer.isDown) {

            //console.log('coord: x', worldPoint.x) //Bordel de fou furieux dans la console mais fonctionne
            //console.log('coord: y', worldPoint.y)

        }
    }

}


