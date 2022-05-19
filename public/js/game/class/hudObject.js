class hudObject {
    constructor(phaser, config, welfareGame) {
        //Hauteur de la barre de menu du haut
        this.arbitraryUnit = 71;
        this.welfareGame = welfareGame;
        this.phaser = phaser;
        this.config = config;
        this.window = new windowObject(phaser, config, welfareGame, this);
        this.tmpMsgCounter = -1;
        this.isNewProjectButtonGenerated = false;


        //Initialisation de l'interface utilisateur
        this.initializeUI();
        
    }

    //Initialisation de l'interface utilisateur
    initializeUI() {
        let hud = this;
        //Bouton play
        this.startbtn = this.phaser.add.sprite(this.config.width * 0.5, 300, "button_play").setInteractive().setScrollFactor(0);
        this.startbtn.on("pointerdown", async function () {
            this.destroy(); // Suppression du bouton start
            // Création de la map
            await mapManager.createMap(hud.phaser).then(() => {
                // Création du HUD du jeu
                hud.createHud();
                hud.createListeners();
                hud.window.closeWindow()
                hud.welfareGame.startGame();
                hud.changeActiveSpeed(1)
            });
        });

        //Bouton de settings
        this.settingsbtn = this.phaser.add.sprite(config.width - 397, config.height - 110, 'button_settings').setOrigin(0, 0).setInteractive().setScale(0.55).setScrollFactor(0);
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

        //Barre de menu du bas
        this.menubar = this.phaser.add.sprite(config.width / 2, config.height - 100, 'menu_hud').setScrollFactor(0);

        //Style des barres d'info (argent, bonheur, date et vitesse de jeu) A SUPPRIMER
        this.infobarStyle = this.phaser.make.graphics().fillStyle(0x1089f2).fillRect(0, 0, 2 * this.arbitraryUnit, 0.5 * this.arbitraryUnit);
        this.infobarStyle.generateTexture('infobar', 2 * this.arbitraryUnit, 0.5 * this.arbitraryUnit);

        this.happinessBarStyle = this.phaser.make.graphics().fillStyle(0x5ed23b).fillRect(0, 0, 2 * this.arbitraryUnit, 0.5 * this.arbitraryUnit);
        this.happinessBarStyle.generateTexture('happinessbar', 2 * this.arbitraryUnit, 0.5 * this.arbitraryUnit);

        //Barre d'argent
        this.moneyInfoBar = this.phaser.add.image(8, -8, 'argent_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.moneyString = "0 €";
        this.moneyText = this.phaser.add.text(68, 20, this.moneyString, {
            font: "18px Arial",
            fill: "#000000"
        }).setScrollFactor(0);

        //Barre de bonheur
        this.happinessInfoBar = this.phaser.add.image(169, -8, 'barre_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.happinessIcon = this.phaser.add.image(170, 10, 'emote_neutre').setOrigin(0, 0).setScale(0.64).setScrollFactor(0);
        this.happinessString = "100 %";
        this.happinessText = this.phaser.add.text(237, 20, this.happinessString, {
            font: "18px Arial",
            fill: "#000000"
        }).setScrollFactor(0);

        //Barre de la date
        this.dateInfoBar = this.phaser.add.image(330, -10, 'date_hud').setOrigin(0, 0).setScale(0.5).setScrollFactor(0);
        this.dateString = "04/09/02";
        this.dateText = this.phaser.add.text(378, 20, this.dateString, {
            font: "18px Arial",
            fill: "#000000"
        }).setScrollFactor(0);

        //Icones gestion du temps
        this.pausebtn = this.phaser.add.image(this.config.width / 2 - 30, this.config.height - 20, 'pause').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);

        this.playbtn = this.phaser.add.image(this.config.width / 2, this.config.height - 20, 'play').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);

        this.avancerapidebtn = this.phaser.add.image(this.config.width / 2 + 30, this.config.height - 20, 'avance_rapide').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);


        this.generateTimeSpeedListeners();

        //Bouton du shop
        //this.shopStyle = this.phaser.make.graphics().fillStyle(0xffff00).fillRect(0, 0, this.arbitraryUnit, this.arbitraryUnit);
        this.shopbtn = this.phaser.add.sprite(298, config.height - 110, 'button_shop').setOrigin(0, 0).setInteractive({ cursor: "pointer" }).setScale(0.55).setScrollFactor(0);

        //Barre de progression du projet en cours
        this.progressbar = displayProgressBar(this.phaser, 100, this.config).setScrollFactor(0);

        //Boutton settings 
        this.settingsbtn = this.phaser.add.sprite(config.width - 397, config.height - 110, 'button_settings').setOrigin(0, 0).setInteractive({ cursor: "pointer" }).setScale(0.55).setScrollFactor(0);

        this.pseudoText = this.phaser.add.text(this.config.width / 2 - 25, this.config.height - 87, dataManager.getUsername(), {
            font: "14px Arial",
            fill: "#000000",
            fontStyle: 'bold',
        }).setScrollFactor(0);
    }

    getmap() {
        return mapManager.getMap();
    }

    //0 = pause, 1 = play, 2 = rapide
    changeActiveSpeed(speedActivated) {
        switch (speedActivated) {
            case 0:
                this.pausebtn.destroy();
                this.playbtn.destroy();
                this.avancerapidebtn.destroy();
                this.pausebtn = this.phaser.add.image(this.config.width / 2 - 30, this.config.height - 20, 'pause_actif').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);
                this.playbtn = this.phaser.add.image(this.config.width / 2, this.config.height - 20, 'play').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);
                this.avancerapidebtn = this.phaser.add.image(this.config.width / 2 + 30, this.config.height - 20, 'avance_rapide').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);
                this.generateTimeSpeedListeners()
                break;

            case 1:
                this.pausebtn.destroy();
                this.playbtn.destroy();
                this.avancerapidebtn.destroy();
                this.pausebtn = this.phaser.add.image(this.config.width / 2 - 30, this.config.height - 20, 'pause').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);
                this.playbtn = this.phaser.add.image(this.config.width / 2, this.config.height - 20, 'play_actif').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);
                this.avancerapidebtn = this.phaser.add.image(this.config.width / 2 + 30, this.config.height - 20, 'avance_rapide').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);
                this.generateTimeSpeedListeners()
                break;

            case 2:
                this.pausebtn.destroy();
                this.playbtn.destroy();
                this.avancerapidebtn.destroy();
                this.pausebtn = this.phaser.add.image(this.config.width / 2 - 30, this.config.height - 20, 'pause').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);
                this.playbtn = this.phaser.add.image(this.config.width / 2, this.config.height - 20, 'play').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);
                this.avancerapidebtn = this.phaser.add.image(this.config.width / 2 + 30, this.config.height - 20, 'avance_rapide_actif').setScale(1).setInteractive({ cursor: "pointer" }).setScrollFactor(0);
                this.generateTimeSpeedListeners()
                break;

        }
    }



    //Listeners de la vitesse du jeu
    generateTimeSpeedListeners() {
        let hud = this;
        let welfareGame = this.welfareGame;

        this.pausebtn.on("pointerdown", function () {
            welfareGame.setPause();
            hud.changeActiveSpeed(0);
        });

        this.playbtn.on("pointerdown", function () {
            console.log("Click play button");
            welfareGame.setNormalSpeed();
            hud.changeActiveSpeed(1);
        });

        this.avancerapidebtn.on("pointerdown", function () {
            console.log("Click play button");
            welfareGame.setFastSpeed();
            hud.changeActiveSpeed(2);
        });
    }

    //Création des listeners des boutons
    createListeners() {
        let hud = this;
        this.settingsbtn.on('pointerdown', function () {
            if (hud.window.isOpened()) {
                hud.window.closeWindow()
            } else {
                hud.window.createBackWindow();
                hud.window.beSettingsWindow();
            }
        });

        this.shopbtn = this.phaser.add.sprite(298, config.height - 110, 'button_shop').setOrigin(0, 0).setInteractive({ cursor: "pointer" }).setScale(0.55).setScrollFactor(0);
        this.shopbtn.on("pointerdown", function () {
            if (!hud.window.isShopOpened()) {
                // Désactive les boutons du HUD
                hud.shopbtn.disableInteractive()
                hud.pausebtn.disableInteractive()
                hud.playbtn.disableInteractive()
                hud.avancerapidebtn.disableInteractive()
                hud.settingsbtn.disableInteractive()
                hud.progressbar.destroy();

                // On créé la fenêtre
                hud.window.beShopWindow()
                hud.closeshopdowbtn = hud.phaser.add.image(720, 470, 'closeWindowBtn').setScale(0.5).setInteractive().setScrollFactor(0).setDepth(11);
                hud.closeshopdowbtn.on("pointerdown", function () {
                    hud.window.closeShopWindow()
                    hud.closeshopdowbtn.destroy()
                    hud.shopbtn.setInteractive()
                    hud.pausebtn.setInteractive()
                    hud.playbtn.setInteractive()
                    hud.avancerapidebtn.setInteractive()
                })
            }
        });
    }

    updateProgressBar(percent) {
        let welfareGame = this.welfareGame;
        let hud = this;

        this.progressbar.destroy();
        this.progressbar = displayProgressBar(this.phaser, percent, this.config);
        if (percent >= 100) {//Si le projet est fini, on affiche un bouton pour choisir un nouveau projet
            if (this.isNewProjectButtonGenerated === false) {
                this.projectChoicebtn = this.phaser.add.image(this.config.width / 2 + 5, this.config.height - 50, 'bouton_projet').setInteractive().setScrollFactor(0);
                this.isNewProjectButtonGenerated = true;
            }

            this.projectChoicebtn.on("pointerdown", function () {
                if (hud.window.isOpened()) {
                    hud.window.closeWindow()
                } else {
                    hud.window.createBackWindow();
                    hud.window.beProjectChoiceWindow(welfareGame.getProjectChoices());
                }
            });
        }
    }

    deleteProjectChoiceBtn() {
        this.projectChoicebtn.destroy();
        this.isNewProjectButtonGenerated = false;
    }

    updateMoneyCounter(money) {
        this.moneyString = money.toString() + "€";
        this.moneyText.destroy();
        this.moneyText = this.phaser.add.text(68, 20, this.moneyString, { font: "18px Arial", fill: "#000000" }).setScrollFactor(0);
    }

    updateHappinessCounter(happiness) {
        this.happinessString = roundToTwo(happiness).toString() + "%";
        this.happinessText.destroy();
        this.happinessText = this.phaser.add.text(237, 20, this.happinessString, { font: "18px Arial", fill: "#000000" }).setScrollFactor(0);
        this.happinessIcon.destroy();
        if (happiness >= 75) {
            this.happinessIcon = this.phaser.add.image(170, 10, 'emote_heureux').setOrigin(0, 0).setScale(0.64).setScrollFactor(0);
        } else {
            if (happiness < 75 && happiness >= 25) {
                this.happinessIcon = this.phaser.add.image(170, 10, 'emote_neutre').setOrigin(0, 0).setScale(0.64).setScrollFactor(0);
            } else {
                this.happinessIcon = this.phaser.add.image(170, 10, 'emote_colere').setOrigin(0, 0).setScale(0.64).setScrollFactor(0);
            }
        }
    }


    updateDate(date) {
        this.dateString = date.day.toString() + "/" + date.month.toString() + "/" + date.year.toString();
        this.dateText.destroy();
        this.dateText = this.phaser.add.text(378, 20, this.dateString, { font: "18px Arial", fill: "#000000" }).setScrollFactor(0);
    }

    updateEmployeeWindow(){
        if(this.window.isOpened() && this.window.isEmployeeWindow()){
            this.window.updateEmployeeWindow();
        }
    }


    temporaryMessageWageLoop() {
        this.tmpMsgCounter--;
        if (this.tmpMsgCounter == 0) {
            this.tmpMsgText.destroy();
        }
        if (this.welfareGame.isNewMonth()) {
            this.tmpMsgCounter = 7;

            this.tmpMsgText = this.phaser.add.text(55, 55, "-" + this.welfareGame.getTotalEmployeesCost() + "€", { font: "18px Arial", fill: "#FF0000" }).setScrollFactor(0);

        }
    }

    getWindow() {
        return this.window;
    }
}

//Fonction d'affichage de la barre de progression en fonction du pourcentage de progression du projet
function displayProgressBar(game, percent, config) {
    let progressbar = game.add.image(config.width / 2 - 87, config.height - 61, 'progress_bar').setOrigin(0, 0).setScrollFactor(0);
    progressbar.setDisplaySize(percent * 184 / 100, 18);

    return progressbar;
}


function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}
console.log(roundToTwo(2.005));




