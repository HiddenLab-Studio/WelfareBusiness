class hudObject {
    constructor(game, config) {
        //Hauteur de la barre de menu du haut
        this.arbitraryUnit = 71;

        this.game = game;
        this.config = config;
        this.open = false
        this.window = new windowObject(game, config);
        this.player = undefined
        //Initialisation de l'interface utilisateur
        this.initializeUI();
    }

    //Initialisation de l'interface utilisateur
    initializeUI() {
        let hud = this;
        this.maps = new mapLayer(this.game, this.config)
        //this.music()
        //Bouton play
        this.playbtn = this.game.add.sprite(this.config.width * 0.5, 300, 'button_play').setInteractive().setScrollFactor(0);
        this.playbtn.on('pointerdown', function () {
            if (hud.window.isOpened() == false) {
                this.destroy();//Suppression du bouton play

                //Création de la map
                hud.maps.createmap();
                hud.maps.BoolCreateMap()
                //Création de l'hud du jeu
                hud.createHud();
                hud.createListeners();
                hud.window.closeWindow()
                const coordXPlayer = ['60', '210', '370', '530', '690','850', '210', '370', '530', '690','850']
                const coordYPlayer = ['320','320','320','320','320','320','480','480','480','480','480','480',]
                hud.player = new Array(11)
                for(let i = 0; i < 11; i++){
                    hud.player[i] = hud.game.add.sprite(coordXPlayer[i], coordYPlayer[i], 'character').setScale(0.75)
                }
                //hud.player1 = hud.game.add.sprite(500, 350, 'character')
            }
        });

        //Bouton de settings
        this.settingsbtn = this.game.add.sprite(config.width - this.arbitraryUnit - 30, config.height - this.arbitraryUnit - 30, 'button_settings').setOrigin(0, 0).setInteractive().setScale(0.5).setScrollFactor(0);

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
    getPlayer() {
        return this.player;
    }

    createHud() {
        const test = this

        //Style des barres d'info (argent, bonheur, date et vitesse de jeu)
        this.infobarStyle = this.game.make.graphics().fillStyle(0x00ffff).fillRect(0, 0, 2 * this.arbitraryUnit, 0.5 * this.arbitraryUnit);
        this.infobarStyle.generateTexture('infobar', 2 * this.arbitraryUnit, 0.5 * this.arbitraryUnit);

        //Barre d'argent
        this.moneyInfoBar = this.game.add.image(0, 0, 'argent_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.moneyString = "44 444 $";
        this.moneyText = this.game.add.text(60, 30, this.moneyString, { font: "18px Arial", fill: "#FFFFFF" }).setScrollFactor(0);

        //Barre de bonheur
        this.happinessInfoBar = this.game.add.image(175, 0, 'bonheur_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.happinessString = "Valeur bonheur";
        this.happinessText = this.game.add.text(2 * (this.arbitraryUnit + 20) + 35, 30, this.happinessString, { font: "14px Arial", fill: "#FFFFFF" }).setScrollFactor(0);

        //Barre de la date
        this.dateInfoBar = this.game.add.image(4 * this.arbitraryUnit + 3 * 20, 0, 'date_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.dateString = "04/09/02";
        this.dateText = this.game.add.text(4 * this.arbitraryUnit + 3 * 20 + 60, 30, this.dateString, { font: "14px Arial", fill: "#ffffff" }).setScrollFactor(0);

        //Icones gestion du temps
        this.pausebtn = this.game.add.image(500, 20, 'pause').setOrigin(0, 0).setScale(0.25).setInteractive().setScrollFactor(0);

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


        this.playbtn = this.game.add.image(540, 20, 'play').setOrigin(0, 0).setScale(0.25).setInteractive().setScrollFactor(0);

        this.playbtn.on("pointerdown", function () {
            if (hud.window.isOpened()) {
                hud.window.closeWindow()
            }
            else {
                hud.window.createBackWindow();
                hud.window.beProjectChoiceWindow();
            }
        });

        this.avancerapidebtn = this.game.add.image(580, 20, 'avance_rapide').setOrigin(0, 0).setScale(0.25).setScrollFactor(0);


        //Bouton du shop
        //this.shopStyle = this.game.make.graphics().fillStyle(0xffff00).fillRect(0, 0, this.arbitraryUnit, this.arbitraryUnit);
        this.shopbtn = this.game.add.sprite(30, config.height - this.arbitraryUnit - 30, 'button_shop').setOrigin(0, 0).setInteractive().setScale(0.5).setScrollFactor(0);

        //Barre de progression du projet en cours
        this.progressbarStyle = this.game.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, this.config.width, 10);
        this.progressbarStyle.generateTexture('progressbar', this.config.width, 10);
        this.progressbar = displayProgressBar(this.game, 100, this.config.width).setScrollFactor(0);

        //Boutton settings 
        this.settingsbtn = this.game.add.sprite(config.width - this.arbitraryUnit - 30, config.height - this.arbitraryUnit - 30, 'button_settings').setOrigin(0, 0).setInteractive().setScale(0.5).setScrollFactor(0);

    }

    getmap() {
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
            console.log('shop btn')

            if (hud.window.isOpened()) {


                hud.window.closeWindow()
            }
            else {
                hud.window.createShopWindow();

            }
        });
    }
}

//Fonction d'affichage de la barre de progression en fonction du poucentage de progression du projet
function displayProgressBar(game, percent, gameWidth) {
    let progressbar = game.add.image(0, 0, 'progressbar').setOrigin(0, 0);
    progressbar.setDisplaySize(percent / 100 * gameWidth, 10);

    return progressbar;
}




