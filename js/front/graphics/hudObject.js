class hudObject {
    constructor(phaser, config, welfareGame) {
        //Hauteur de la barre de menu du haut
        this.arbitraryUnit = 71;

        this.welfareGame = welfareGame;
        this.phaser = phaser;
        this.config = config;

        this.window = new windowObject(phaser, config, welfareGame, this);

        this.tmpMsgCounter = -1;

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
        this.moneyString = "0 $";
        this.moneyText = this.phaser.add.text(60, 30, this.moneyString, { font: "18px Arial", fill: "#FFFFFF" }).setScrollFactor(0);

        //Barre de bonheur
        this.happinessInfoBar = this.phaser.add.image(175, 0, 'barre_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.happinessIcon = this.phaser.add.image(180, 20, 'emote_neutre').setOrigin(0, 0).setScale(0.75).setScrollFactor(0);
        this.happinessString = "100 %";
        this.happinessText = this.phaser.add.text(2 * (this.arbitraryUnit + 20) + 55, 30, this.happinessString, { font: "18px Arial", fill: "#FFFFFF" }).setScrollFactor(0);

        //Barre de la date
        this.dateInfoBar = this.phaser.add.image(4 * this.arbitraryUnit + 3 * 20, 0, 'date_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.dateString = "04/09/02";
        this.dateText = this.phaser.add.text(4 * this.arbitraryUnit + 3 * 20 + 50, 30, this.dateString, { font: "18px Arial", fill: "#ffffff" }).setScrollFactor(0);

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
            console.log("Click play button");

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
            hud.progressbar.destroy();
            hud.progressbar = displayProgressBar(hud.game, 50, hud.config.width);

        });
    }

    updateProgressBar(percent) {
        let welfareGame = this.welfareGame;

        this.progressbar.destroy();
        this.progressbar = displayProgressBar(this.phaser, percent, this.config.width);
        if (percent >= 100) {//Si le projet est fini, on affiche un bouton pour choisir un nouveau projet


            this.projectChoicebtn = this.phaser.add.image(850, 20, 'infobar').setOrigin(0, 0).setScale(1, 1).setInteractive().setScrollFactor(0);
            this.projectChoiceText = this.phaser.add.text(853, 29, 'Choose a new project', { font: "14px Arial", fill: "#000000" }).setScrollFactor(0);

            this.projectChoicebtn.on("pointerdown", function () {
                if (hud.window.isOpened()) {
                    hud.window.closeWindow()
                }
                else {
                    hud.window.createBackWindow();
                    hud.window.beProjectChoiceWindow(welfareGame.getProjectChoices());
                }

            });
        }
    }

    deleteProjectChoiceBtn() {
        this.projectChoiceText.destroy();
        this.projectChoicebtn.destroy();
    }

    updateMoneyCounter(money) {
        this.moneyString = money.toString() + "$";
        this.moneyText.destroy();
        this.moneyText = this.phaser.add.text(60, 30, this.moneyString, { font: "18px Arial", fill: "#FFFFFF" }).setScrollFactor(0);
    }

    updateHappinessCounter(happiness) {
        this.happinessString = happiness.toString() + "%";
        this.happinessText.destroy();
        this.happinessText = this.phaser.add.text(2 * (this.arbitraryUnit + 20) + 55, 30, this.happinessString, { font: "18px Arial", fill: "#FFFFFF" }).setScrollFactor(0);

        if (happiness >= 75) {
            this.happinessIcon.destroy();
            this.happinessIcon = this.phaser.add.image(180, 20, 'emote_heureux').setOrigin(0, 0).setScale(0.75).setScrollFactor(0);

        }
        else {
            if (happiness < 75 && happiness >= 25) {
                this.happinessIcon = this.phaser.add.image(180, 20, 'emote_neutre').setOrigin(0, 0).setScale(0.75).setScrollFactor(0);

            }
            else {
                this.happinessIcon = this.phaser.add.image(180, 20, 'emote_colere').setOrigin(0, 0).setScale(0.75).setScrollFactor(0);

            }
        }
    }


    updateDate(date) {
        this.dateString = date.day.toString() + "/" + date.month.toString() + "/" + date.year.toString();
        this.dateText.destroy();
        this.dateText = this.phaser.add.text(4 * this.arbitraryUnit + 3 * 20 + 50, 30, this.dateString, { font: "18px Arial", fill: "#ffffff" }).setScrollFactor(0);
    }


    temporaryMessageWageLoop() {
        this.tmpMsgCounter--;
        if (this.tmpMsgCounter == 0) {
            //this.tmpMsgBackground.destroy();
            this.tmpMsgText.destroy();
        }
        if (this.welfareGame.isNewMonth()) {
            this.tmpMsgCounter = 4;
            if (this.tmpMsgCounter == 4) {
                //this.tmpMsgBackground = this.phaser.add.image(50, 50, 'infobar').setOrigin(0, 0).setScale(0.9, 1).setInteractive().setScrollFactor(0);
                this.tmpMsgText = this.phaser.add.text(55, 55, "-" + this.welfareGame.getTotalEmployeesCost() + "$", { font: "18px Arial", fill: "#FF0000" }).setScrollFactor(0);
            }
        }
    }
}

//Fonction d'affichage de la barre de progression en fonction du poucentage de progression du projet
function displayProgressBar(game, percent, gameWidth) {
    let progressbar = game.add.image(0, 0, 'progressbar').setOrigin(0, 0).setScrollFactor(0);
    progressbar.setDisplaySize(percent / 100 * gameWidth, 10);

    return progressbar;
}




