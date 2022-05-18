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
        this.menu = this.game.add.image(this.config.width * 0.5, 270, /*'hud_employed'*/'windowBack').setScale(0.6, 0.8).setScrollFactor(0);
        this.closewindowbtn = this.game.add.image(670, 40, 'closeWindowBtn').setScale(0.5).setInteractive().setScrollFactor(0);

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
                background: this.game.add.image(350, 90 + i * 130, getRandomProjectChoiceBackground()).setOrigin(0, 0).setScale(0.6).setScrollFactor(0).setInteractive(),
                title: this.game.add.text(370, 130 + i * 130, projectTitleString, { font: "14px Arial", fill: "#ffffff" }).setScrollFactor(0),
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
    beEmployeeWindow(employee, desk) {
        let window = this;

        this.windowType = "employee";

        //Si le bureau appartient à un employé
        if (employee !== undefined) {
            employee.getDesk();

            this.employeeName = this.game.add.text(this.config.width / 2 - 150, 55, employee.getName(), { font: "18px Arial", fill: "#000000" }).setScrollFactor(0).setOrigin(0, 0);


            //Jauge de salaire et temps de travail ajustable + bouton d'upgrade du bureau

            this.employeeParameterGauge = new Array(2);

            //Salaire
            this.employeeParameterGauge[0] = {
                bar: this.game.add.image(418, 125, 'barre').setOrigin(0, 0).setScale(0.7, 1).setScrollFactor(0),
                //percentage: this.game.add.text(620, 130, "100%", { font: "14px Arial", fill: "#000000" }).setScrollFactor(0),
                icon: this.game.add.image(335, 119, 'logo_money').setOrigin(0, 0).setScale(0.30).setScrollFactor(0),
                plusBtn: this.game.add.image(620, 119, 'plus').setOrigin(0, 0).setScrollFactor(0).setInteractive(),
                minusBtn: this.game.add.image(380, 119, 'minus').setOrigin(0, 0).setScrollFactor(0).setInteractive(),
            }

            this.employeeParameterGauge[0].plusBtn.on("pointerdown", () => {
                increaseButton('wage', employee);
            })

            this.employeeParameterGauge[0].minusBtn.on("pointerdown", () => {
                decreaseButton('wage', employee);
            })


            //Temps de travail
            this.employeeParameterGauge[1] = {
                bar: this.game.add.image(418, 185, 'barre').setOrigin(0, 0).setScale(0.7, 1).setScrollFactor(0),
                //percentage: this.game.add.text(620, 150, "100%", { font: "14px Arial", fill: "#000000" }).setScrollFactor(0),
                icon: this.game.add.image(340, 179, 'logo_time').setOrigin(0, 0).setScale(0.05).setScrollFactor(0),
                plusBtn: this.game.add.image(620, 179, 'plus').setOrigin(0, 0).setScrollFactor(0).setInteractive(),
                minusBtn: this.game.add.image(380, 179, 'minus').setOrigin(0, 0).setScrollFactor(0).setInteractive(),
            }

            this.employeeParameterGauge[1].plusBtn.on("pointerdown", () => {
                increaseButton('workTime', employee);
            })

            this.employeeParameterGauge[1].minusBtn.on("pointerdown", () => {
                decreaseButton('workTime', employee);
            })


            this.upgradeBtn = this.game.add.image(480, 230, 'upgrade').setOrigin(0, 0).setScale(0.9, 1.1).setScrollFactor(0).setInteractive({ cursor: "pointer" });
            this.deskImg = this.game.add.image(340, 238, 'bureau').setOrigin(0, 0).setScale(1).setScrollFactor(0);


            let stringLvlTmp = "Level " + desk.level;;
            /*if (desk.level < 5) {
                stringLvlTmp
            }
            else {
                stringLvlTmp = "Level MAX";
            }*/

            let debugNextUpgrade = desk.level + 1;
            this.deskLevelText = this.game.add.text(415, 240, stringLvlTmp, { color: "black", fontFamily: "Arial" }).setScrollFactor(0);

            this.upgradeBtn.on("pointerdown", () => {
                console.log("click upgrade")
                deskManager.upgradeDesk(desk);
                this.closeWindow();
            })

            let stringUpgradePrice = '500€'
            this.upgradeBtnText = this.game.add.text(554, 240, stringUpgradePrice, { color: "black", fontFamily: "Arial" }).setScrollFactor(0);
            /*if (desk.level < 5) {
                stringLvlTmp
            }
            else {
                stringLvlTmp = "Level MAX";
            }*/

            /*//Jauge d'information du bien être de l'employé
            this.employeeWelfareGauge = new Array(3);

            for (let i = 0; i < 3; i++) {
                this.employeeWelfareGauge[i] = {
                    icon: this.game.add.image(350, 225 + i * 50, 'infobar').setOrigin(0, 0).setScale(0.25, 1).setScrollFactor(0),
                    bar: this.game.add.image(400, 242 + i * 50, 'infobar').setOrigin(0, 0).setScale(1.4, 0.1).setScrollFactor(0),
                }
            }
*/
            //Textes de conseil pour le joueur
            this.employeeTips = new Array(3);

            for (let i = 0; i < 3; i++) {
                this.employeeTips[i] = this.game.add.text(350, 375 + i * 40, "• " + determineTextAdvice(employee)[0], { font: "14px Arial", fill: "#000000" }).setScrollFactor(0);
            }
        }

        //Si aucun employé ne possède ce bureau
        else {
            this.upgradeBtn = this.game.add.image(this.config.width / 2, 255, 'infobar').setScale(1.2, 1.5).setScrollFactor(0).setInteractive({ cursor: "pointer" });

            this.employeeName = this.game.add.text(400, 55, "Hire someone to unlock", { font: "18px Arial", fill: "#000000" }).setScrollFactor(0);
            this.upgradeBtnText = this.game.add.text(this.config.width / 2 - 66, 245, "HIRE EMPLOYEE", { cursor: "pointer", color: "black", fontFamily: "Arial" }).setScrollFactor(0);


            this.upgradeBtn.on("pointerdown", () => {
                //desk.level += 1;
                //desk.active = true;
                deskManager.buyDesk(desk);
                mapManager.getWelfareBusinessGame().addEmployee(desk);
                window.closeWindow();
            })

        }

    }

    //Supprime les éléments de la fenêtre d'un employé
    closeEmployeeWindow() {
        this.employeeName.destroy();
        for (let i = 0; i < 2; i++) {
            if (this.employeeParameterGauge !== undefined) {
                this.employeeParameterGauge[i].bar.destroy();
                //this.employeeParameterGauge[i].percentage.destroy();
                this.employeeParameterGauge[i].icon.destroy();
                this.employeeParameterGauge[i].plusBtn.destroy();
                this.employeeParameterGauge[i].minusBtn.destroy();
            }

        }

        this.upgradeBtn.destroy();
        this.upgradeBtnText.destroy();

        /*for (let i = 0; i < 3; i++) {
            if (this.employeeWelfareGauge !== undefined) {
                this.employeeWelfareGauge[i].icon.destroy();
                this.employeeWelfareGauge[i].bar.destroy();
            }

        }*/


        for (let i = 0; i < 3; i++) {
            if (this.employeeTips != undefined && this.employeeTips[0] != undefined) {
                this.employeeTips[i].destroy();
            }
        }
    }

}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomProjectChoiceBackground() {
    let tmpRandom = random(0, 6);
    return 'projet_hud' + tmpRandom.toString();
}

function determineTextAdvice(employee) {
    let adviceArray = new Array();

    let adviceString = ""

    //Partie conseils sur le bureau
    if (employee.getDesk().level === 1) {
        adviceString = "I can't work properly with such a desk !"
    }

    if (employee.getDesk().level > 1 && employee.getDesk().level <= 3) {
        adviceString = "I would like a better desk !"
    }

    if (employee.getDesk().level == 4) {
        adviceString = "I love my desk !"
    }

    if (employee.getDesk().level == 5) {
        adviceString = "MY DESK IS PERFECT"
    }

    adviceArray.push(adviceString);


    //Partie conseil équipements de l'entreprise
    /*if (lePlusGrave) {

    }
    else {
        if (UnPeuMoinsGrave) {

        }
        else {
            if (etc) {

            }
        }
    }
    */

    return adviceArray;
}


function decreaseButton(actionWanted, employee) {
    switch (actionWanted) {
        case 'wage':
            employee.decreaseWage();

            break;

        case 'workTime':
            employee.decreaseWorkTime();

            break;
    }
}

function increaseButton(actionWanted, employee) {

    switch (actionWanted) {
        case 'wage':
            employee.increaseWage()

            break;

        case 'workTime':
            employee.increaseWorkTime();

            break;
    }

}