class windowObject {
    constructor(game, config, welfareGame, hud) {
        this.game = game;
        this.config = config;
        this.welfareGame = welfareGame;
        this.hud = hud;
        //this.createBackWindow();
        this.windowType = undefined;//Garde en mémoire quel type de fenêtre est ouvert
        this.currentEmployeeWindow = undefined;
    }

    //Créé le background de la fenêtre
    createBackWindow() {
        let window = this;
        this.opened = true;
        this.menu = this.game.add.image(this.config.width * 0.5, 270, /*'hud_employed'*/'windowBack').setScale(0.6, 0.8).setScrollFactor(0);
        this.closewindowbtn = this.game.add.image(670, 40, 'closeWindowBtn').setScale(0.5).setInteractive({ cursor: "pointer" }).setScrollFactor(0);

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
            mapManager.getHud().shopbtn.setInteractive()
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
        this.windowType = undefined
        this.opened = false;
    }

    //Est ce qu'une fenêtre est ouverte ?
    isOpened() {
        return this.opened;
    }

    isEmployeeWindow() {
        if (this.windowType === "employee") {
            return true;
        }
        return false;
    }

    //Fenêtre des settings
    beSettingsWindow() {
        this.windowType = "option";
        this.volume = this.game.add.image(this.config.width * 0.5 - 125, 200, 'volumeHigh').setScale(0.35).setInteractive({ cursor: "pointer" }).setScrollFactor(0);
    }

    beShopWindow() {
        let window = this
        this.shopopened = true;
        this.windowType = "shop_hud";
        this.shop_hud = this.game.add.image(1000 / 2, 433, 'shop_hud').setScale(1, 1.2).setScrollFactor(0).setInteractive().setDepth(10);
        this.water_fountain_button = this.game.add.image(1000 / 2 - 150, 520, 'bouton_eau').setInteractive().setScrollFactor(0).setScale(1.2).setDepth(11);
        this.plant_button = this.game.add.image(1000 / 2, 520, 'bouton_plante').setInteractive().setScrollFactor(0).setScale(1.2).setDepth(11);
        this.distributer_button = this.game.add.image(1000 / 2 + 150, 520, 'bouton_cafe').setInteractive().setScrollFactor(0).setScale(1.2).setDepth(11);

        this.plant_button.on("pointerdown", () => {
            shopManager.upgradePlant();
        })

    }

    shopdestroy() {
        let hud = this
        this.shop_hud.destroy();
        this.water_fountain_button.destroy();
        this.plant_button.destroy();
        this.distributer_button.destroy();
    }

    isShopOpened() {
        return this.shopopened
    }

    closeShopWindow() {
        if (this.shopopened) {
            switch (this.windowType) {
                case "shop_hud":
                    this.shopdestroy();
                    break;
            }
            this.shop_hud.destroy();
        }

        this.shopopened = false;
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


        this.projectChoiceTitle = this.game.add.text(410, 50, "Choose a new project", { font: "bold 18px Arial", fill: "#000000" }).setScrollFactor(0)

        this.projectChoice = new Array(3);

        for (let i = 0; i < 3; i++) {
            let projectTitleString = proposals[i].getTitle() + "\nAmount to produce :" + Math.floor(proposals[i].getAmountToProduce()) + "\nRevenue :" + (proposals[i].getRevenue()) + "\nHappiness impact :" + (proposals[i].getHappinessImpact());
            this.projectChoice[i] = {
                background: this.game.add.image(350, 90 + i * 130, getRandomProjectChoiceBackground()).setOrigin(0, 0).setScale(0.6).setScrollFactor(0).setInteractive({ cursor: "pointer" }),
                title: this.game.add.text(370, 115 + i * 130, projectTitleString, { font: "14px Arial", fill: "#ffffff" }).setScrollFactor(0),
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

        this.projectChoiceTitle.destroy();
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
        mapManager.getHud().shopbtn.disableInteractive()

        //Si le bureau appartient à un employé
        if (employee !== undefined) {
            this.currentEmployeeWindow = employee;
            employee.getDesk();

            this.employeeName = this.game.add.text(this.config.width / 2 - 150, 55, employee.getName(), { font: "bold 18px Arial", fill: "#000000" }).setScrollFactor(0).setOrigin(0, 0);

            //Jauge de salaire et temps de travail ajustable + bouton d'upgrade du bureau
            this.employeeParameterGauge = new Array(2);

            //Salaire
            this.employeeParameterGauge[0] = {
                bar: this.game.add.image(423, 125, 'barre').setOrigin(0, 0).setScale(0.7, 1).setScrollFactor(0),
                textBar: this.game.add.text(500, 105, this.currentEmployeeWindow.getSalary().toString() + '€', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0),
                icon: this.game.add.image(335, 110, 'logo_money').setOrigin(0, 0).setScale(0.40).setScrollFactor(0),
                plusBtn: this.game.add.image(625, 119, 'plus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }),
                minusBtn: this.game.add.image(389, 119, 'minus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }),
                progressbar: displayWindowProgressBar(this.game, 429, 125, employee.getSalaryPercent()), //this.game.add.image(429, 125, 'infobar').setOrigin(0, 0).setScale(1.36,0.22).setScrollFactor(0),
            }

            this.employeeParameterGauge[0].plusBtn.on("pointerdown", () => {
                increaseButton('wage', employee);
            })

            this.employeeParameterGauge[0].minusBtn.on("pointerdown", () => {
                decreaseButton('wage', employee);
            })

            //Temps de travail
            this.employeeParameterGauge[1] = {
                bar: this.game.add.image(423, 185, 'barre').setOrigin(0, 0).setScale(0.7, 1).setScrollFactor(0),
                textBar: this.game.add.text(510, 165, this.currentEmployeeWindow.getWorkTime().toString() + 'H', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0),
                icon: this.game.add.image(340, 164, 'logo_time').setOrigin(0, 0).setScale(0.08).setScrollFactor(0),
                plusBtn: this.game.add.image(625, 179, 'plus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }),
                minusBtn: this.game.add.image(389, 179, 'minus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }),
                progressbar: displayWindowProgressBar(this.game, 429, 185, employee.getWorkTimePercent()),
            }

            this.employeeParameterGauge[1].plusBtn.on("pointerdown", () => {
                increaseButton('workTime', employee);
            })

            this.employeeParameterGauge[1].minusBtn.on("pointerdown", () => {
                decreaseButton('workTime', employee);
            })


            this.upgradeBtn = this.game.add.image(480, 230, 'upgrade').setOrigin(0, 0).setScale(0.9, 1.1).setScrollFactor(0).setInteractive({ cursor: "pointer" });
            this.deskImg = this.game.add.image(340, 238, 'bureau').setOrigin(0, 0).setScale(1).setScrollFactor(0);


            this.deskLevelText = this.game.add.text(415, 240, "Level " + desk.level, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0);

            this.upgradeBtn.on("pointerdown", () => {
                console.log("click upgrade")
                if(this.welfareGame.getPlayerMoney() >= getNextDeskPrice(employee.getDesk().level)){
                    this.welfareGame.payAmount(getNextDeskPrice(employee.getDesk().level))
                    deskManager.upgradeDesk(desk);
                    mapManager.getHud().shopbtn.setInteractive()
                    this.closeWindow();
                }
            })

            this.upgradeBtnText = this.game.add.text(554, 240, employee.getDesk().level < 5 ? getNextDeskPrice(employee.getDesk().level) + '€' : 'MAX', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0);


            this.happinessIcon = this.game.add.image(340, 300, 'emote_heureux_window').setOrigin(0, 0).setScale(1).setScrollFactor(0);
            this.happinessBar = this.game.add.image(385, 310, 'barre').setOrigin(0, 0).setScale(0.9, 1).setScrollFactor(0);
            this.happinessProgressBar = displayWindowHappinessProgressBar(this.game, 393, 310, this.currentEmployeeWindow.getHappiness())
            this.happinessBarText = this.game.add.text(495, 290, roundToTwo(this.currentEmployeeWindow.getHappiness()) + ' %', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0);


            this.productionIcon = this.game.add.image(348, 350, 'production').setOrigin(0, 0).setScale(1).setScrollFactor(0);
            this.productionBar = this.game.add.image(385, 360, 'barre').setOrigin(0, 0).setScale(0.9, 1).setScrollFactor(0);
            this.productionProgressBar = displayWindowProductionProgressBar(this.game, 393, 360, this.currentEmployeeWindow.getProduction())
            this.productionBarText = this.game.add.text(500, 340, roundToTwo(this.currentEmployeeWindow.getProduction()), { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0);


            //Textes de conseil pour le joueur
            this.employeeTips = new Array(3);

            for (let i = 0; i < 3; i++) {
                this.employeeTips[i] = this.game.add.text(350, 390 + i * 40, "• " + determineTextAdvice(employee)[0], { font: "14px Arial", fill: "#000000" }).setScrollFactor(0);
            }
        }

        //Si aucun employé ne possède ce bureau
        else {
            this.currentEmployeeWindow = undefined;
            this.upgradeBtn = this.game.add.image(this.config.width / 2, 255, 'hirebtn').setScale(0.75).setScrollFactor(0).setInteractive({ cursor: "pointer" });

            this.employeeName = this.game.add.text(400, 55, "Hire someone to unlock", { font: "bold 18px Arial", fill: "#000000" }).setScrollFactor(0);


            this.upgradeBtn.on("pointerdown", () => {
                deskManager.buyDesk(desk);
                mapManager.getWelfareBusinessGame().addEmployee(desk);
                mapManager.getHud().shopbtn.setInteractive()
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
                this.employeeParameterGauge[i].textBar.destroy();
                this.employeeParameterGauge[i].icon.destroy();
                this.employeeParameterGauge[i].plusBtn.destroy();
                this.employeeParameterGauge[i].minusBtn.destroy();
                this.employeeParameterGauge[i].progressbar.destroy();
            }

        }

        this.upgradeBtn.destroy();
        if (this.happinessBar != undefined) {
            this.deskLevelText.destroy();
            this.deskImg.destroy();
            this.upgradeBtnText.destroy();


            this.happinessIcon.destroy();
            this.happinessBar.destroy();
            this.happinessProgressBar.destroy()
            this.happinessBarText.destroy();

            this.productionIcon.destroy()
            this.productionBar.destroy()
            this.productionProgressBar.destroy()
            this.productionBarText.destroy()
        }




        for (let i = 0; i < 3; i++) {
            if (this.employeeTips != undefined && this.employeeTips[0] != undefined) {
                this.employeeTips[i].destroy();
            }
        }
    }

    updateEmployeeWindow(employee) {
        if (this.windowType == "employee") {
            if (this.employeeParameterGauge != undefined && this.currentEmployeeWindow != undefined) {
                this.employeeParameterGauge[0].textBar.destroy();
                this.employeeParameterGauge[0].textBar = this.game.add.text(500, 105, this.currentEmployeeWindow.getSalary().toString() + '€', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0);
                this.employeeParameterGauge[1].textBar.destroy();
                this.employeeParameterGauge[1].textBar = this.game.add.text(510, 165, this.currentEmployeeWindow.getWorkTime().toString() + 'H', { font: "bold 14px Arial", fill: "#000000"  }).setScrollFactor(0);
                this.employeeParameterGauge[0].progressbar.destroy();
                this.employeeParameterGauge[0].progressbar = displayWindowProgressBar(this.game, 429, 125, this.currentEmployeeWindow.getSalaryPercent());
                this.employeeParameterGauge[1].progressbar.destroy();
                this.employeeParameterGauge[1].progressbar = displayWindowProgressBar(this.game, 429, 185, this.currentEmployeeWindow.getWorkTimePercent());


                this.happinessProgressBar.destroy();
                this.happinessProgressBar = displayWindowHappinessProgressBar(this.game, 393, 310, this.currentEmployeeWindow.getHappiness())
                this.happinessBarText.destroy();
                this.happinessBarText = this.game.add.text(495, 290, roundToTwo(this.currentEmployeeWindow.getHappiness()) + ' %', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0);

                this.productionProgressBar.destroy();
                this.productionProgressBar = displayWindowProductionProgressBar(this.game, 393, 360, this.currentEmployeeWindow.getProduction())
                this.productionBarText.destroy();
                this.productionBarText = this.game.add.text(500, 340, roundToTwo(this.currentEmployeeWindow.getProduction()), { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0);
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


function displayWindowProgressBar(game, x, y, percentSize) {
    let progressbar = game.add.image(x, y, 'infobar').setOrigin(0, 0).setScale(1.35 * percentSize / 100, 0.22).setScrollFactor(0)

    return progressbar;
}

function displayWindowHappinessProgressBar(game, x, y, percentSize) {
    let progressbar = game.add.image(x, y, 'happinessbar').setOrigin(0, 0).setScale(1.73 * percentSize / 100, 0.22).setScrollFactor(0)

    return progressbar;
}

function displayWindowProductionProgressBar(game, x, y, percentSize) {
    let progressbar = game.add.image(x, y, 'productionbar').setOrigin(0, 0).setScale(1.73 * percentSize / 100, 0.22).setScrollFactor(0)

    return progressbar;
}

function getNextDeskPrice(level){
    switch(level){
        case 1:
            return 100;

        case 2:
            return 700;

        case 3:
            return 500;

        case 4:
            return 1500;
    }
}