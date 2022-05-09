class hudObject {
    constructor(phaser, config, welfareGame) {
        //Hauteur de la barre de menu du haut
        this.arbitraryUnit = 71;

        this.welfareGame = welfareGame;
        this.phaser = phaser;
        this.config = config;

        this.window = new windowObject(phaser, config);

        //Initialisation de l'interface utilisateur
        this.initializeUI();

    }

    //Initialisation de l'interface utilisateur
    initializeUI() {
        let hud = this;
        this.maps = new mapLayer(this.phaser, this.config)
        //Bouton play
        this.playbtn = this.phaser.add.sprite(this.config.width * 0.5, 300, 'button_play').setInteractive().setScrollFactor(0);
        this.playbtn.on('pointerdown', function () {

            this.destroy();//Suppression du bouton play


            //Création de la map
            hud.maps.createmap();
            hud.maps.BoolCreateMap()
            //Création de l'hud du jeu
            hud.createHud();
            hud.createListeners();
            hud.window.closeWindow()
            hud.welfareGame.startGame();


        });

        //Bouton de settings
        this.settingsbtn = this.phaser.add.sprite(config.width - this.arbitraryUnit - 30, config.height - this.arbitraryUnit - 30, 'button_settings').setOrigin(0, 0).setInteractive().setScale(0.5).setScrollFactor(0);

        this.settingsbtn.on('pointerdown', function () {
            if (hud.window.isOpened()) {
                hud.window.closeWindow()
            }
            else {
                hud.window.createBackWindow();
                hud.window.beSettingsWindow();
            }
        });
    }

    createHud() {


        //Style des barres d'info (argent, bonheur, date et vitesse de jeu)
        this.infobarStyle = this.phaser.make.graphics().fillStyle(0x00ffff).fillRect(0, 0, 2 * this.arbitraryUnit, 0.5 * this.arbitraryUnit);
        this.infobarStyle.generateTexture('infobar', 2 * this.arbitraryUnit, 0.5 * this.arbitraryUnit);

        //Barre d'argent
        this.moneyInfoBar = this.phaser.add.image(0, 0, 'argent_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.moneyString = "44 444 $";
        this.moneyText = this.phaser.add.text(60, 30, this.moneyString, { font: "18px Arial", fill: "#FFFFFF" }).setScrollFactor(0);

        //Barre de bonheur
        this.happinessInfoBar = this.phaser.add.image(175, 0, 'bonheur_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.happinessString = "Valeur bonheur";
        this.happinessText = this.phaser.add.text(2 * (this.arbitraryUnit + 20) + 35, 30, this.happinessString, { font: "14px Arial", fill: "#FFFFFF" }).setScrollFactor(0);

        //Barre de la date
        this.dateInfoBar = this.phaser.add.image(4 * this.arbitraryUnit + 3 * 20, 0, 'date_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.dateString = "04/09/02";
        this.dateText = this.phaser.add.text(4 * this.arbitraryUnit + 3 * 20 + 60, 30, this.dateString, { font: "14px Arial", fill: "#ffffff" }).setScrollFactor(0);

        //Icones gestion du temps
        this.pausebtn = this.phaser.add.image(500, 20, 'pause').setOrigin(0, 0).setScale(0.25).setInteractive().setScrollFactor(0);

        // A MODIFIER
        this.pausebtn.on("pointerdown", function () {
            if (hud.window.isOpened()) {
                hud.window.closeWindow()
            }
            else {
                hud.window.createBackWindow();
                hud.window.beEmployeeWindow();
            }
        });


        this.playbtn = this.phaser.add.image(540, 20, 'play').setOrigin(0, 0).setScale(0.25).setInteractive().setScrollFactor(0);

        this.playbtn.on("pointerdown", function () {
            if (hud.window.isOpened()) {
                hud.window.closeWindow()
            }
            else {
                hud.window.createBackWindow();
                hud.window.beProjectChoiceWindow();
            }

        });

        this.avancerapidebtn = this.phaser.add.image(580, 20, 'avance_rapide').setOrigin(0, 0).setScale(0.25).setScrollFactor(0);


        //Bouton du shop
        //this.shopStyle = this.phaser.make.graphics().fillStyle(0xffff00).fillRect(0, 0, this.arbitraryUnit, this.arbitraryUnit);
        this.shopbtn = this.phaser.add.sprite(30, config.height - this.arbitraryUnit - 30, 'button_shop').setOrigin(0, 0).setInteractive().setScale(0.5).setScrollFactor(0);

        //Barre de progression du projet en cours
        this.progressbarStyle = this.phaser.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, this.config.width, 10);
        this.progressbarStyle.generateTexture('progressbar', this.config.width, 10);
        this.progressbar = displayProgressBar(this.phaser, 100, this.config.width).setScrollFactor(0);

        //Boutton settings 
        this.settingsbtn = this.phaser.add.sprite(config.width - this.arbitraryUnit - 30, config.height - this.arbitraryUnit - 30, 'button_settings').setOrigin(0, 0).setInteractive().setScale(0.5).setScrollFactor(0);

    }

    getmap(){
        return this.maps
    }

    //Création des listeners des boutons
    createListeners() {
        let hud = this;
        this.settingsbtn.on('pointerdown', function () {
            if (hud.window.isOpened()) {
                hud.window.closeWindow()
            }
            else {
                hud.window.createBackWindow();
                hud.window.beSettingsWindow();
            }
        });


        this.shopbtn.on('pointerdown', function () {
            hud.progressbar.destroy();
            hud.progressbar = displayProgressBar(hud.game, 50, hud.config.width);

        });
    }

    updateProgressBar(percent){
        this.progressbar.destroy();
        this.progressbar = displayProgressBar(this.phaser, percent, this.config.width);
    }
}

//Fonction d'affichage de la barre de progression en fonction du poucentage de progression du projet
function displayProgressBar(game, percent, gameWidth) {
    let progressbar = game.add.image(0, 0, 'progressbar').setOrigin(0, 0);
    progressbar.setDisplaySize(percent / 100 * gameWidth, 10);

    return progressbar;
}




