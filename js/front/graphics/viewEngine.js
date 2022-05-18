const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 563,
    backgroundColor: '#DAD1CF',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let gamePhaser = new Phaser.Game(config);
let chaise, menu, music;
let open = false;

function preload() {

    this.load.image('btn_plante', './img/HUD/icon_plante.png')
    this.load.image('btn_machine-eau', './img/HUD/icon_eau.png')
    this.load.image('btn_machine-cafe', './img/HUD/icon_cafe.png')
    this.load.image('btn_plante_selec', './img/HUD/icon_plante_selec.png')
    this.load.image('btn_machine-eau_selec', './img/HUD/icon_eau_selec.png')
    this.load.image('btn_machine-cafe_selec', './img/HUD/icon_cafe_selec.png')
    this.load.image('button_play', './img/bouton_play.png');
    this.load.image('chaise', './img/chaise_bureau.png');
    this.load.image('windowBack', './img/HUD/fenetre.png');
    this.load.image('shop_window', './img/HUD/shop_fenetre.png')
    this.load.image('increaseVolume', './img/HUD/plus.png')
    this.load.image('lowerVolume', './img/HUD/moins.png')
    this.load.image('volumeMute', './img/HUD/son_coupe.png');
    this.load.image('volumeLow', './img/HUD/son_min.png');
    this.load.image('volumeHigh', './img/HUD/son_max.png');
    this.load.audio('Sound', ['./audio/musique.mp3', './audio/musique.ogg']);
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
    this.load.spritesheet('character',
        './img/HUD/character.png',
        { frameWidth: 150, frameHeight: 117 });
}

let hud;
function create() {
    let game = this;

    hud = new hudObject(game, config)

    this.anims.create({
        key: 'leftwalk',
        frames: this.game.anims.generateFrameNumbers('character', { start: 10, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
}



function update(time, delta) {
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

        for (let i = 0; i < 11; i++) {
            hud.player[i].anims.play('leftwalk', true);
        }
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


