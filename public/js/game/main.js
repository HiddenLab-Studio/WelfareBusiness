const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 563,
    backgroundColor: "#DAD1CF",
    parent: "phaser",
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    fps: {
        target: 100,
        forceSetTimeOut: true
    },
};

const phaser = new Phaser.Game(config);
function preload() {
    this.load.image('button_play', './public/assets/img/game/hud/bouton_play.png');
    this.load.image('chaise', './public/assets/img/game/chaise_bureau.png');
    this.load.image('windowBack', './public/assets/img/game/HUD/fenetre.png');
    this.load.image('volumeMute', './public/assets/img/game/HUD/son_coupe.png');
    this.load.image('volumeLow', './public/assets/img/game/HUD/son_min.png');
    this.load.image('volumeHigh', './public/assets/img/game/HUD/son_max.png');
    this.load.image('button_settings', './public/assets/img/game/HUD/settings.png');
    this.load.image('button_shop', './public/assets/img/game/HUD/logo_shop.png');
    this.load.image('argent_hud', './public/assets/img/game/HUD/argent_hud.png');
    this.load.image('barre_hud', './public/assets/img/game/HUD/barre_hud.png');
    this.load.image('date_hud', './public/assets/img/game/HUD/date_hud.png');
    this.load.image('pause', './public/assets/img/game/HUD/bouton_pause.png');
    this.load.image('pause_actif', './public/assets/img/game/HUD/bouton_pause_actif.png');
    this.load.image('play_actif', './public/assets/img/game/HUD/bouton_play_actif.png');
    this.load.image('play', './public/assets/img/game/HUD/bouton_play.png');
    this.load.image('avance_rapide_actif', './public/assets/img/game/HUD/bouton_acc_actif.png');
    this.load.image('avance_rapide', './public/assets/img/game/HUD/bouton_acc.png');
    this.load.image('closeWindowBtn', './public/assets/img/game/HUD/croix.png');
    this.load.image('emote_neutre', './public/assets/img/game/HUD/neutre.png')
    this.load.image('emote_colere', './public/assets/img/game/HUD/colere.png')
    this.load.image('emote_heureux', './public/assets/img/game/HUD/bonheur.png')
    this.load.image('emote_heureux_window', './public/assets/img/game/HUD/bonheur_window.png')
    this.load.image('projet_hud', './public/assets/img/game/HUD/projet_hud.png');
    this.load.image('projet_hud0', './public/assets/img/game/HUD/projet_hud0.png');
    this.load.image('projet_hud1', './public/assets/img/game/HUD/projet_hud1.png');
    this.load.image('projet_hud2', './public/assets/img/game/HUD/projet_hud2.png');
    this.load.image('projet_hud3', './public/assets/img/game/HUD/projet_hud3.png');
    this.load.image('projet_hud4', './public/assets/img/game/HUD/projet_hud4.png');
    this.load.image('projet_hud5', './public/assets/img/game/HUD/projet_hud5.png');
    this.load.image('menu_hud', './public/assets/img/game/HUD/menu_hud.png');
    this.load.image('bouton_projet', './public/assets/img/game/HUD/bouton_projet.png');
    this.load.image('progress_bar', './public/assets/img/game/hud/progress_bar.png');
    this.load.image('logo_money', './public/assets/img/game/hud/logo_money.png');
    this.load.image('logo_time', './public/assets/img/game/hud/time_logo.png');
    this.load.image('plus', './public/assets/img/game/hud/plus.png');
    this.load.image('minus', './public/assets/img/game/hud/moins.png');
    this.load.image('barre', './public/assets/img/game/hud/barre.png');
    this.load.image('upgrade', './public/assets/img/game/hud/upgrade.png');
    this.load.image('bureau', './public/assets/img/game/hud/bureau.png');
    this.load.image('boutique_hud', './public/assets/img/game/hud/boutique_hud.png');
    this.load.image('bouton_plante', './public/assets/img/game/hud/bouton_plante.png');
    this.load.image('bouton_cafe', './public/assets/img/game/hud/bouton_cafe.png');
    this.load.image('bouton_eau', './public/assets/img/game/hud/bouton_eau.png');
    this.load.image('shop_hud', './public/assets/img/game/hud/boutique_hud.png');
    this.load.image('hirebtn', './public/assets/img/game/hud/hireButton.png');
    this.load.image('restartbtn', './public/assets/img/game/hud/restartButton.png');
    this.load.image('production', './public/assets/img/game/hud/production.png');

    this.load.image('sleep', './public/assets/img/game/hud/bouton_detente.png');
    this.load.image('cuisine', './public/assets/img/game/hud/bouton_cuisine.png');
    this.load.image('ping', './public/assets/img/game/hud/bouton_PING.png');
    this.load.image('sport', './public/assets/img/game/hud/bouton_sport.png');

    this.load.image('hud_employed', './public/assets/img/game/hud/hud_employed.png');
    this.load.video('intro', './public/assets/img/game/video.mp4');

    this.load.spritesheet('characterL', './public/assets/img/game/hud/perso_test.png', { frameWidth: 61, frameHeight: 50 });
    this.load.spritesheet('characterB', './public/assets/img/game/hud/perso_test.png', { frameWidth: 63, frameHeight: 50 });
    this.load.spritesheet('characterR', './public/assets/img/game/hud/perso_test.png', { frameWidth: 63.5, frameHeight: 50 });
    this.load.spritesheet('characterF', './public/assets/img/game/hud/perso_test.png', { frameWidth: 63, frameHeight: 50 });


    this.load.image("tiles", "./public/js/game/map/tileset_wb.png");
    this.load.tilemapTiledJSON("map", "./public/js/game/map/wb_map.json");
}

function create() {
    mapManager.init(phaser, config, this)

    this.anims.create({
        key: 'back_to_me',
        frames: this.game.anims.generateFrameNumbers('characterB', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'left',
        frames: this.game.anims.generateFrameNumbers('characterL', { start: 3, end: 5 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.game.anims.generateFrameNumbers('characterR', { start: 6, end: 8 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'front_of_me',
        frames: this.game.anims.generateFrameNumbers('characterF', { start: 9, end: 11 }),
        frameRate: 5,
        repeat: -1
    });
}

let limitRefreshRateCounter = 0;
function update(time, delta) {
    //Jeu
    let phaser = this;
    let welfareBusinessGame = mapManager.getWelfareBusinessGame();
    let hud = mapManager.getHud();

    if (welfareBusinessGame.isGameStarted()) {
        //Limiter l'update du projet à 2 fois par seconde :
        if (welfareBusinessGame.getGameSpeed() > 0) {
            //Limiter l'update du projet à 2 fois par seconde :
            limitRefreshRateCounter++

            if (limitRefreshRateCounter >= (20 / welfareBusinessGame.getGameSpeed())) {
                limitRefreshRateCounter = 0;
                welfareBusinessGame.updateGame();
                if (welfareBusinessGame.isRealProject()) {
                    hud.updateProgressBar(welfareBusinessGame.getCurrentProjectPercentage());
                }
                hud.temporaryMessageWageLoop();
                hud.temporaryMessageEndOfProjectLoop();

            }


        }
        hud.updateMoneyCounter(welfareBusinessGame.getPlayerMoney());
        hud.updateHappinessCounter(welfareBusinessGame.getGlobalHappiness());
        hud.updateDate(welfareBusinessGame.getDate());
        hud.updateEmployeeWindow();
        hud.updateShopWindow();
        hud.updateSettingsWindow();
        welfareBusinessGame.isGameLost();

        if (hud.playerB.length > 0) {
            for (let i = 0; i < hud.playerB.length; i++) {
                hud.playerB[i][0].anims.play("back_to_me", true);
                if (welfareBusinessGame.getGameSpeed() == 2) {
                    hud.playerB[i][0].anims.msPerFrame = 75
                }
                if (welfareBusinessGame.getGameSpeed() == 1) {
                    hud.playerB[i][0].anims.msPerFrame = 300
                }
                if (welfareBusinessGame.getGameSpeed() == 0) {
                    hud.playerB[i][0].anims.pause()
                }
            }
        }

        if (hud.playerL.length > 0) {
            for (let i = 0; i < hud.playerL.length; i++) {
                hud.playerL[i][0].anims.play("left", true);
                if (welfareBusinessGame.getGameSpeed() == 2) {
                    hud.playerL[i][0].anims.msPerFrame = 75
                }
                if (welfareBusinessGame.getGameSpeed() == 1) {
                    hud.playerL[i][0].anims.msPerFrame = 300
                }
                if (welfareBusinessGame.getGameSpeed() == 0) {
                    hud.playerL[i][0].anims.pause()
                }
            }
        }

        if (hud.playerR.length > 0) {
            for (let i = 0; i < hud.playerR.length; i++) {
                hud.playerR[i][0].anims.play("right", true);
                if (welfareBusinessGame.getGameSpeed() == 2) {
                    hud.playerR[i][0].anims.msPerFrame = 75
                }
                if (welfareBusinessGame.getGameSpeed() == 1) {
                    hud.playerR[i][0].anims.msPerFrame = 300
                }
                if (welfareBusinessGame.getGameSpeed() == 0) {
                    hud.playerR[i][0].anims.pause()
                }
            }
        }

        if (hud.playerF.length > 0) {
            for (let i = 0; i < hud.playerF.length; i++) {
                hud.playerF[i][0].anims.play("front_of_me", true);
                if (welfareBusinessGame.getGameSpeed() == 2) {
                    hud.playerF[i][0].anims.msPerFrame = 75
                }
                if (welfareBusinessGame.getGameSpeed() == 1) {
                    hud.playerF[i][0].anims.msPerFrame = 300
                }
                if (welfareBusinessGame.getGameSpeed() == 0) {
                    hud.playerF[i][0].anims.pause()
                }
            }
        }
    }

    //Caméra
    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    let controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5,
    });

    controls.update(delta);
    if (mapManager.isMapCreated()) {
        camera.setBounds(0, 0, mapManager.getMap().widthInPixels, mapManager.getMap().heightInPixels);
    }
}