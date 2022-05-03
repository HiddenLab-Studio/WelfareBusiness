class hudObject {
    constructor(game, config) {
        //Hauteur de la barre de menu du haut
        this.arbitraryUnit = 71;

        this.game = game;
        this.config = config;

        //Initialisation de l'interface utilisateur
        this.initializeUI();

    }

    //Initialisation de l'interface utilisateur
    initializeUI() {
        let hud = this;
        //Bouton play
        this.playbtn = this.game.add.sprite(this.config.width * 0.5, 300, 'button_play').setInteractive();
        this.playbtn.on('pointerdown', function () {

            console.log('click play');
            this.destroy();//Suppression du bouton play

            //Création de l'hud du jeu
            hud.createHud();
            hud.createListeners();


        });

        //Bouton de settings
        this.settingsbtn = this.game.add.sprite(config.width - this.arbitraryUnit - 30, config.height - this.arbitraryUnit - 30, 'button_settings').setOrigin(0, 0).setInteractive().setScale(0.5);

    }

    createHud() {
        //Style des barres d'info (argent, bonheur, date et vitesse de jeu)
        this.infobarStyle = this.game.make.graphics().fillStyle(0x00ffff).fillRect(0, 0, 2 * this.arbitraryUnit, 0.5 * this.arbitraryUnit);
        this.infobarStyle.generateTexture('infobar', 2 * this.arbitraryUnit, 0.5 * this.arbitraryUnit);

        //Barre d'argent
        this.moneyInfoBar = this.game.add.image(20, 20, 'infobar').setOrigin(0, 0);
        this.moneyIcon = this.game.add.image(32, 30, 'theo').setScale(0.04).setOrigin(0, 0).setInteractive();
        this.moneyString = "Valeur d'argent";
        this.moneyText = this.game.add.text(55, 30, this.moneyString, { font: "14px Arial", fill: "#000000" });

        //Barre de bonheur
        this.happinessInfoBar = this.game.add.image(2 * (this.arbitraryUnit + 20), 20, 'infobar').setOrigin(0, 0);
        this.happinessIcon = this.game.add.image(2 * (this.arbitraryUnit + 20) + 12, 30, 'theo').setScale(0.04).setOrigin(0, 0).setInteractive();
        this.happinessString = "Valeur bonheur";
        this.happinessText = this.game.add.text(2 * (this.arbitraryUnit + 20) + 35, 30, this.happinessString, { font: "14px Arial", fill: "#000000" });

        //Barre de la date
        this.dateInfoBar = this.game.add.image(4 * this.arbitraryUnit + 3 * 20, 20, 'infobar').setOrigin(0, 0);
        this.dateString = "4 septembre 2002";
        this.dateText = this.game.add.text(4 * this.arbitraryUnit + 3 * 20 + 15, 30, this.dateString, { font: "14px Arial", fill: "#000000" });


        //Bouton du shop
        this.shopStyle = this.game.make.graphics().fillStyle(0xffff00).fillRect(0, 0, this.arbitraryUnit, this.arbitraryUnit);
        this.shopStyle.generateTexture('shop', this.arbitraryUnit, this.arbitraryUnit);
        this.shopbtn = this.game.add.sprite(30, config.height - this.arbitraryUnit - 30, 'shop').setOrigin(0, 0).setInteractive();

        //Barre de progression du projet en cours
        this.progressbarStyle = this.game.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, this.config.width, 10);
        this.progressbarStyle.generateTexture('progressbar', this.config.width, 10);
        this.progressbar = displayProgressBar(this.game, 100, this.config.width);


    }

    //Création des listeners des boutons
    createListeners() {
        let hud = this;
        this.settingsbtn.on('pointerdown', function () {
            console.log("clicksettings")
        });


        this.shopbtn.on('pointerdown', function () {
            console.log("clickshop");
            hud.progressbar.destroy();
            hud.progressbar = displayProgressBar(hud.game, 50, 1000);

        });
    }
}

//Fonction d'affichage de la barre de progression en fonction du poucentage de progression du projet
function displayProgressBar(game, percent, gameWidth) {
    let progressbar = game.add.image(0, 0, 'progressbar').setOrigin(0, 0);
    progressbar.setDisplaySize(percent / 100 * gameWidth, 10);

    return progressbar;
}




//CODE DU BOUTON SETTINGS A REFAIRE
/*if (open == false) {
        spriteSettings.on('pointerdown', function (pointer) {

            console.log('click settings ouvert')

            menu = game.add.image(config.width * 0.5, 300, 'menu').setScale(0.6, 0.8)
            volume = game.add.image(config.width * 0.5 - 125, 200, 'volume').setScale(0.15).setInteractive();
            music = game.sound.add('accueil');

            music.loop = true;
            music.play();

            open = true

        });
    }
    else {
        spriteSettings.on('pointerdown', function (pointer) {

            console.log('click settings ferme')
            menu.destroy()
            volume.destroy()
            open = false
        });
    }
    */