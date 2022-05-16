class windowObject {
    constructor(game, config, welfareGame, hud) {
        this.game = game;
        this.config = config;
        this.welfareGame = welfareGame;
        this.hud = hud;
        //this.createBackWindow();
        this.windowType = undefined;//Garde en mémoire quel type de fenêtre est ouvert
    }

    //Créé le background de la fenêtre
    createBackWindow() {
        let window = this;
        this.opened = true;
        this.menu = this.game.add.image(this.config.width * 0.5, 300, 'windowBack').setScale(0.6, 0.8).setScrollFactor(0);
        this.closewindowbtn = this.game.add.image(670, 70, 'closeWindowBtn').setScale(0.5).setInteractive().setScrollFactor(0);

        this.closewindowbtn.on('pointerdown', function () {
            window.closeWindow();
        });

        //this.music = this.game.sound.add('accueil');
        //this.music.loop = true;
        //this.music.play();
    }

    //Ferme la fenêtre
    closeWindow() {
        if (this.opened) {
            switch (this.windowType) {
                case "option":
                    this.volume.destroy();
                    break;

                case "projectChoice":
                    this.closeProjectChoiceWindow();
                    break;

                case "employee":
                    this.closeEmployeeWindow();
                    break;
            }
            this.menu.destroy();
            this.closewindowbtn.destroy();
        }
        this.opened = false;
    }

    //Est ce qu'une fenêtre est ouverte ?
    isOpened() {
        return this.opened;
    }

    //Fenêtre des settings
    beSettingsWindow() {
        this.windowType = "option";

        this.volume = this.game.add.image(this.config.width * 0.5 - 125, 200, 'volumeHigh').setScale(0.35).setInteractive().setScrollFactor(0);
    }

    //Supprime les éléments de la fenêtre des settings
    closeSettingsWindow() {
        this.volume.destroy();
    }

    //Fenêtre de choix de projet
    beProjectChoiceWindow(proposals) {
        this.windowType = "projectChoice";
        let welfareGame = this.welfareGame;
        let window = this;
        let hud = this.hud;


        this.projectChoice = new Array(3);

        for (let i = 0; i < 3; i++) {
            let projectTitleString = "Project " + (i + 1) + "\nAmount to produce :" + Math.floor(proposals[i].getAmountToProduce()) + "\nRevenue :" + (proposals[i].getRevenue());
            this.projectChoice[i] = {
                background: this.game.add.image(350, 120 + i * 130, 'projet_hud').setOrigin(0, 0).setScale(0.6).setScrollFactor(0).setInteractive(),
                title: this.game.add.text(370, 160 + i * 130, projectTitleString, { font: "14px Arial", fill: "#ffffff" }).setScrollFactor(0),
            }

            this.projectChoice[i].background.on('pointerdown', function () {
                welfareGame.chooseNewProject(proposals[i]);
                window.closeWindow();
                hud.deleteProjectChoiceBtn();
            });
        }
    }

    //Supprime les éléments de la fenêtre de choix de projet
    closeProjectChoiceWindow() {

        for (let i = 0; i < 3; i++) {
            this.projectChoice[i].background.destroy();
            this.projectChoice[i].title.destroy();
        }
    }

    //A MODIFIER QUAND ON AURA LE SYSTEME D EMPLOYES SUR LE JEU
    //Fenêtre d'un employé
    beEmployeeWindow(employee) {
        this.windowType = "employee";

        this.employeeParameterGauge = new Array(2);
        //Titre de la fenêtre
        this.employeeName = this.game.add.text(400, 95, "Employee name", { font: "14px Arial", fill: "#000000" }).setScrollFactor(0);

        //Jauge de salaire et temps de travail ajustable + bouton d'upgrade du bureau
        for (let i = 0; i < 2; i++) {
            this.employeeParameterGauge[i] = {
                bar: this.game.add.image(350, 135 + i * 30, 'infobar').setOrigin(0, 0).setScale(1.8, 0.1).setScrollFactor(0),
                percentage: this.game.add.text(620, 130 + i * 30, "100%", { font: "14px Arial", fill: "#000000" }).setScrollFactor(0),
                upgradeBtn: this.game.add.image(360, 185, 'infobar').setOrigin(0, 0).setScale(1, 1.5).setScrollFactor(0),
                upgradeBtnText: this.game.add.text(395, 203, "Level MAX", { font: "14px Arial", fill: "#000000" }).setOrigin(0, 0).setScrollFactor(0),
            }

        }

        //Jauge d'information du bien être de l'employé
        this.employeeWelfareGauge = new Array(3);

        for (let i = 0; i < 3; i++) {
            this.employeeWelfareGauge[i] = {
                icon: this.game.add.image(350, 255 + i * 50, 'infobar').setOrigin(0, 0).setScale(0.25, 1).setScrollFactor(0),
                bar: this.game.add.image(400, 272 + i * 50, 'infobar').setOrigin(0, 0).setScale(1.4, 0.1).setScrollFactor(0),
            }
        }

        //Textes de conseil pour le joueur
        this.employeeTips = new Array(3);

        for (let i = 0; i < 3; i++) {
            this.employeeTips[i] = this.game.add.text(350, 405 + i * 40, "• Texte de conseil", { font: "14px Arial", fill: "#000000" }).setScrollFactor(0);

        }


    }

    //Supprime les éléments de la fenêtre d'un employé
    closeEmployeeWindow() {
        this.employeeName.destroy();
        for (let i = 0; i < 2; i++) {
            this.employeeParameterGauge[i].bar.destroy();
            this.employeeParameterGauge[i].percentage.destroy();
            this.employeeParameterGauge[i].upgradeBtn.destroy();
            this.employeeParameterGauge[i].upgradeBtnText.destroy();
        }

        for (let i = 0; i < 3; i++) {
            this.employeeWelfareGauge[i].icon.destroy();
            this.employeeWelfareGauge[i].bar.destroy();
        }

        for (let i = 0; i < 3; i++) {
            this.employeeTips[i].destroy();
        }
    }

}
