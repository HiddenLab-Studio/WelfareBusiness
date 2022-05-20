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
        this.menu = this.game.add.image(this.config.width * 0.5, 270, /*'hud_employed'*/'windowBack').setScale(0.6, 0.8).setScrollFactor(0).setDepth(20);
        this.closewindowbtn = this.game.add.image(670, 40, 'closeWindowBtn').setScale(0.5).setInteractive({ cursor: "pointer" }).setScrollFactor(0).setDepth(21);

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
                    this.closeSettingsWindow();
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

    isSettingsWindow() {
        if (this.windowType === "option") {
            return true;
        }
        return false;
    }

    //Fenêtre des settings
    beSettingsWindow() {
        this.windowType = "option";

        //Titre
        this.settingsTitle = this.game.add.text(this.config.width / 2, 55, "General settings", { font: "bold 18px Arial", fill: "#000000" }).setOrigin().setScrollFactor(0).setDepth(21);

        //Salaire
        this.generalSalary = {
            title: this.game.add.text(460, 100, "Average salary", { font: "bold 15px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21),
            bar: this.game.add.image(423, 140, 'barre').setOrigin(0, 0).setScale(0.7, 1).setScrollFactor(0).setDepth(21),
            textBar: this.game.add.text(500, 120, (isNaN(this.welfareGame.getAverageSalary()) ? 0 : this.welfareGame.getAverageSalary().toString()) + '€', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(25),
            icon: this.game.add.image(335, 125, 'logo_money').setOrigin(0, 0).setScale(0.40).setScrollFactor(0).setDepth(21),
            plusBtn: this.game.add.image(625, 134, 'plus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21),
            minusBtn: this.game.add.image(389, 134, 'minus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21),
            progressbar: displayWindowProgressBar(this.game, 429, 140, this.welfareGame.getAverageSalaryPercent()).setDepth(21), //this.game.add.image(429, 125, 'infobar').setOrigin(0, 0).setScale(1.36,0.22).setScrollFactor(0),
        }

        this.generalSalary.plusBtn.on("pointerdown", () => {
            increaseButton('generalWage');
        })

        this.generalSalary.minusBtn.on("pointerdown", () => {
            decreaseButton('generalWage');
        })

        //Temps de travail
        this.generalWorkTime = {
            title: this.game.add.text(450, 165, "Average work time", { font: "bold 15px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21),
            bar: this.game.add.image(423, 205, 'barre').setOrigin(0, 0).setScale(0.7, 1).setScrollFactor(0).setDepth(21),
            textBar: this.game.add.text(510, 185, this.welfareGame.getAverageWorkTime().toString() + 'H', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21),
            icon: this.game.add.image(340, 184, 'logo_time').setOrigin(0, 0).setScale(0.08).setScrollFactor(0).setDepth(21),
            plusBtn: this.game.add.image(625, 199, 'plus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21),
            minusBtn: this.game.add.image(389, 199, 'minus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21),
            progressbar: displayWindowProgressBar(this.game, 429, 205, this.welfareGame.getAverageWorkTimePercent()).setDepth(21),
        }

        this.generalWorkTime.plusBtn.on("pointerdown", () => {
            increaseButton('generalWorkTime');
        })

        this.generalWorkTime.minusBtn.on("pointerdown", () => {
            decreaseButton('generalWorkTime');
        })


        //Indicateur de production moyenne de la boite
        this.averageProduction = {
            title: this.game.add.text(400, 240, "Average production per second", { font: "bold 15px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21),
            icon: this.game.add.image(348, 250, 'production').setOrigin(0, 0).setScale(1).setScrollFactor(0).setDepth(21),
            bar: this.game.add.image(385, 280, 'barre').setOrigin(0, 0).setScale(0.9, 1).setScrollFactor(0).setDepth(21),
            progressBar: displayWindowProductionProgressBar(this.game, 393, 280, roundToTwo(this.welfareGame.getTotalProduction() * this.welfareGame.getAverageWorkTime() / 4)).setDepth(21),
            barText: this.game.add.text(500, 260, roundToTwo(this.welfareGame.getTotalProduction() * this.welfareGame.getAverageWorkTime() / 4), { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21),
        }

    }

    //Supprime les éléments de la fenêtre des settings
    closeSettingsWindow() {

        //Titre
        this.settingsTitle.destroy();

        //Salaire moyen
        this.generalSalary.title.destroy()
        this.generalSalary.bar.destroy();
        this.generalSalary.icon.destroy();
        this.generalSalary.minusBtn.destroy();
        this.generalSalary.plusBtn.destroy();
        this.generalSalary.textBar.destroy();
        this.generalSalary.progressbar.destroy();

        //Temps de travail moyen
        this.generalWorkTime.title.destroy()
        this.generalWorkTime.bar.destroy();
        this.generalWorkTime.icon.destroy();
        this.generalWorkTime.minusBtn.destroy();
        this.generalWorkTime.plusBtn.destroy();
        this.generalWorkTime.textBar.destroy();
        this.generalWorkTime.progressbar.destroy();

        //Production moyenne
        this.averageProduction.title.destroy();
        this.averageProduction.icon.destroy();
        this.averageProduction.bar.destroy();
        this.averageProduction.progressBar.destroy();
        this.averageProduction.barText.destroy();
    }

    updateSettingsWindow() {
        this.generalSalary.textBar.destroy();
        this.generalSalary.textBar = this.game.add.text(500, 120, (isNaN(this.welfareGame.getAverageSalary()) ? 0 : roundToTwo(this.welfareGame.getAverageSalary()).toString()) + '€', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(25);

        this.generalSalary.progressbar.destroy();
        this.generalSalary.progressbar = displayWindowProgressBar(this.game, 429, 140, this.welfareGame.getAverageSalaryPercent()).setDepth(21);

        this.generalWorkTime.textBar.destroy();
        this.generalWorkTime.textBar = this.game.add.text(510, 185, (isNaN(this.welfareGame.getAverageWorkTime()) ? 0 : roundToTwo(this.welfareGame.getAverageWorkTime()).toString()) + 'H', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);

        this.generalWorkTime.progressbar.destroy();
        this.generalWorkTime.progressbar = displayWindowProgressBar(this.game, 429, 205, this.welfareGame.getAverageWorkTimePercent()).setDepth(21);


        this.averageProduction.progressBar.destroy();
        this.averageProduction.progressBar = displayWindowProductionProgressBar(this.game, 393, 280, roundToTwo(this.welfareGame.getTotalProduction() * this.welfareGame.getAverageWorkTime() / 4 / this.welfareGame.getNbOfEmployees())).setDepth(21);

        this.averageProduction.barText.destroy();
        this.averageProduction.barText = this.game.add.text(500, 260, roundToTwo(this.welfareGame.getTotalProduction() * this.welfareGame.getAverageWorkTime() / 4), { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);
    }


    beShopWindow() {
        let window = this
        let hud = mapManager.getHud();

        this.shopOpened = true;
        this.windowType = "shop_hud";
        this.shop_hud = this.game.add.image(1000 / 2, 510, "shop_hud").setScrollFactor(0).setInteractive().setDepth(10);

        // Left
        this.plant_button = this.game.add.image(1000 / 2 - 100, 515, "bouton_plante").setInteractive({ cursor: "pointer" }).setScrollFactor(0).setScale(1.4).setDepth(11);
        this.plant_priceTag = this.game.add.text(1000 / 2 - 115, 530, getShopPriceString().plant, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);

        this.water_fountain_button = this.game.add.image(1000 / 2 - 200, 515, "bouton_eau").setInteractive({ cursor: "pointer" }).setScrollFactor(0).setScale(1.4).setDepth(11);
        this.water_priceTag = this.game.add.text(1000 / 2 - 215, 530, getShopPriceString().water, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);

        this.distributeur_button = this.game.add.image(1000 / 2 - 300, 515, "bouton_cafe").setInteractive({ cursor: "pointer" }).setScrollFactor(0).setScale(1.4).setDepth(11);
        this.distributeur_priceTag = this.game.add.text(1000 / 2 - 315, 530, getShopPriceString().coffee, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);

        // Center
        this.ping_button = this.game.add.image(1000 / 2, 515, "ping").setInteractive({ cursor: "pointer" }).setScrollFactor(0).setScale(1.4).setDepth(11);
        this.ping_priceTag = this.game.add.text(1000 / 2 - 15, 530, getShopPriceString().ping, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);

        // Right
        this.sleep = this.game.add.image(1000 / 2 + 100, 515, "sleep").setInteractive({ cursor: "pointer" }).setScrollFactor(0).setScale(1.4).setDepth(11);
        this.sleep_priceTag = this.game.add.text(1000 / 2 + 80, 530, getShopPriceString().sleep, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);

        this.sport = this.game.add.image(1000 / 2 + 200, 515, "sport").setInteractive({ cursor: "pointer" }).setScrollFactor(0).setScale(1.4).setDepth(11);
        this.sport_priceTag = this.game.add.text(1000 / 2 + 183, 530, getShopPriceString().sport, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);

        this.kitchen = this.game.add.image(1000 / 2 + 300, 515, "cuisine").setInteractive({ cursor: "pointer" }).setScrollFactor(0).setScale(1.4).setDepth(11);
        this.kitchen_priceTag = this.game.add.text(1000 / 2 + 280, 530, getShopPriceString().kitchen, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);

        // Listeners
        this.plant_button.on("pointerdown", () => shopManager.upgradeObject("plant"));
        this.sleep.on("pointerdown", () => shopManager.buySleep())
        this.kitchen.on("pointerdown", () => shopManager.buyKitchen())
        this.sport.on("pointerdown", () => shopManager.buySport())
        this.ping_button.on("pointerdown", () => shopManager.buyPing())
        this.distributeur_button.on("pointerdown", () => shopManager.upgradeObject("coffee"))
        this.water_fountain_button.on("pointerdown", () => shopManager.upgradeObject("water"))

        hud.closeshopdowbtn = hud.phaser.add.image(885, 470, "closeWindowBtn").setScale(0.5).setInteractive({ cursor: "pointer" }).setScrollFactor(0).setDepth(11);
        hud.closeshopdowbtn.on("pointerdown", function () {
            hud.window.closeShopWindow()
            hud.closeshopdowbtn.destroy()
            hud.shopbtn.setInteractive()
            hud.pausebtn.setInteractive()
            hud.playbtn.setInteractive()
            hud.avancerapidebtn.setInteractive()
        })

    }

    shopDestroy() {
        this.shop_hud.destroy();
        this.water_fountain_button.destroy();
        this.plant_button.destroy();
        this.distributeur_button.destroy();
        this.sleep.destroy();
        this.sport.destroy();
        this.ping_button.destroy()
        this.kitchen.destroy();
        this.plant_priceTag.destroy()
        this.water_priceTag.destroy()
        this.kitchen_priceTag.destroy()
        this.sport_priceTag.destroy()
        this.sleep_priceTag.destroy()
        this.ping_priceTag.destroy()
        this.distributeur_priceTag.destroy()



    }

    updateShopWindow() {
        this.plant_priceTag.destroy()
        this.plant_priceTag = this.game.add.text(1000 / 2 - 115, 530, getShopPriceString().plant, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);
        this.water_priceTag.destroy()
        this.water_priceTag = this.game.add.text(1000 / 2 - 215, 530, getShopPriceString().water, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);
        this.kitchen_priceTag.destroy()
        this.kitchen_priceTag = this.game.add.text(1000 / 2 + 280, 530, getShopPriceString().kitchen, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);
        this.sport_priceTag.destroy()
        this.sport_priceTag = this.game.add.text(1000 / 2 + 183, 530, getShopPriceString().sport, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);
        this.sleep_priceTag.destroy()
        this.sleep_priceTag = this.game.add.text(1000 / 2 + 80, 530, getShopPriceString().sleep, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);
        this.ping_priceTag.destroy()
        this.ping_priceTag = this.game.add.text(1000 / 2 - 15, 530, getShopPriceString().ping, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);
        this.distributeur_priceTag.destroy()
        this.distributeur_priceTag = this.game.add.text(1000 / 2 - 315, 530, getShopPriceString().coffee, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(12);

    }

    isShopOpened() { return this.shopOpened; }

    closeShopWindow() {
        if (this.shopOpened) {
            switch (this.windowType) {
                case "shop_hud":
                    this.shopDestroy();
                    break;
            }
            this.shop_hud.destroy();
        }
        this.shopOpened = false;
    }



    //Fenêtre de choix de projet
    beProjectChoiceWindow(proposals) {
        this.windowType = "projectChoice";
        let welfareGame = this.welfareGame;
        let window = this;
        let hud = this.hud;


        this.projectChoiceTitle = this.game.add.text(410, 50, "Choose a new project", { font: "bold 18px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21)

        this.projectChoice = new Array(3);

        for (let i = 0; i < 3; i++) {
            let projectTitleString = proposals[i].getTitle() + "\nAmount to produce :" + Math.floor(proposals[i].getAmountToProduce()) + "\nRevenue :" + (proposals[i].getRevenue()) + "\nHappiness impact :" + (proposals[i].getHappinessImpact() > 0 ? '+' + proposals[i].getHappinessImpact() : proposals[i].getHappinessImpact()) + '%';
            this.projectChoice[i] = {
                background: this.game.add.image(350, 90 + i * 130, getRandomProjectChoiceBackground()).setOrigin(0, 0).setScale(0.6).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21),
                title: this.game.add.text(370, 115 + i * 130, projectTitleString, { font: "14px Arial", fill: "#ffffff" }).setScrollFactor(0).setDepth(21),
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


    //Fenêtre d'un employé
    beEmployeeWindow(employee, desk) {
        let window = this;
        this.windowType = "employee";
        mapManager.getHud().shopbtn.disableInteractive()

        //Si le bureau appartient à un employé
        if (employee !== undefined) {
            this.currentEmployeeWindow = employee;
            employee.getDesk();

            this.employeeName = this.game.add.text(this.config.width / 2 - 150, 55, employee.getName(), { font: "bold 18px Arial", fill: "#000000" }).setScrollFactor(0).setOrigin(0, 0).setDepth(21);

            //Jauge de salaire et temps de travail ajustable + bouton d'upgrade du bureau
            this.employeeParameterGauge = new Array(2);

            //Salaire
            this.employeeParameterGauge[0] = {
                bar: this.game.add.image(423, 125, 'barre').setOrigin(0, 0).setScale(0.7, 1).setScrollFactor(0).setDepth(21),
                textBar: this.game.add.text(500, 105, this.currentEmployeeWindow.getSalary().toString() + '€', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(25),
                icon: this.game.add.image(335, 110, 'logo_money').setOrigin(0, 0).setScale(0.40).setScrollFactor(0).setDepth(21),
                plusBtn: this.game.add.image(625, 119, 'plus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21),
                minusBtn: this.game.add.image(389, 119, 'minus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21),
                progressbar: displayWindowProgressBar(this.game, 429, 125, employee.getSalaryPercent()).setDepth(21),
            }

            this.employeeParameterGauge[0].plusBtn.on("pointerdown", () => {
                increaseButton('wage', employee);
            })

            this.employeeParameterGauge[0].minusBtn.on("pointerdown", () => {
                decreaseButton('wage', employee);
            })

            //Temps de travail
            this.employeeParameterGauge[1] = {
                bar: this.game.add.image(423, 185, 'barre').setOrigin(0, 0).setScale(0.7, 1).setScrollFactor(0).setDepth(21),
                textBar: this.game.add.text(510, 165, this.currentEmployeeWindow.getWorkTime().toString() + 'H', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21),
                icon: this.game.add.image(340, 164, 'logo_time').setOrigin(0, 0).setScale(0.08).setScrollFactor(0).setDepth(21),
                plusBtn: this.game.add.image(625, 179, 'plus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21),
                minusBtn: this.game.add.image(389, 179, 'minus').setOrigin(0, 0).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21),
                progressbar: displayWindowProgressBar(this.game, 429, 185, employee.getWorkTimePercent()).setDepth(21),
            }

            this.employeeParameterGauge[1].plusBtn.on("pointerdown", () => {
                increaseButton('workTime', employee);
            })

            this.employeeParameterGauge[1].minusBtn.on("pointerdown", () => {
                decreaseButton('workTime', employee);
            })


            this.upgradeBtn = this.game.add.image(480, 230, 'upgrade').setOrigin(0, 0).setScale(0.9, 1.1).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21);
            this.deskImg = this.game.add.image(340, 238, 'bureau').setOrigin(0, 0).setScale(1).setScrollFactor(0).setDepth(21);


            this.deskLevelText = this.game.add.text(415, 240, "Level " + desk.level, { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);

            this.upgradeBtn.on("pointerdown", () => {
                if (this.welfareGame.getPlayerMoney() >= getNextDeskPrice(employee.getDesk().level)) {
                    this.welfareGame.payAmount(getNextDeskPrice(employee.getDesk().level))
                    deskManager.upgradeDesk(desk);
                    mapManager.getHud().shopbtn.setInteractive()
                    this.closeWindow();
                }
            })

            this.upgradeBtnText = this.game.add.text(554, 240, employee.getDesk().level < 5 ? getNextDeskPrice(employee.getDesk().level) + '€' : 'MAX', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);


            this.happinessIcon = this.game.add.image(340, 300, 'emote_heureux_window').setOrigin(0, 0).setScale(1).setScrollFactor(0).setDepth(21);
            this.happinessBar = this.game.add.image(385, 310, 'barre').setOrigin(0, 0).setScale(0.9, 1).setScrollFactor(0).setDepth(21);
            this.happinessProgressBar = displayWindowHappinessProgressBar(this.game, 393, 310, this.currentEmployeeWindow.getHappiness()).setDepth(21)
            this.happinessBarText = this.game.add.text(495, 290, roundToTwo(this.currentEmployeeWindow.getHappiness()) + ' %', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);


            this.productionIcon = this.game.add.image(348, 350, 'production').setOrigin(0, 0).setScale(1).setScrollFactor(0).setDepth(21);
            this.productionBar = this.game.add.image(385, 360, 'barre').setOrigin(0, 0).setScale(0.9, 1).setScrollFactor(0).setDepth(21);
            this.productionProgressBar = displayWindowProductionProgressBar(this.game, 393, 360, roundToTwo(this.currentEmployeeWindow.getProduction() * this.currentEmployeeWindow.getWorkTime() / 4)).setDepth(21)
            this.productionBarText = this.game.add.text(500, 340, roundToTwo(this.currentEmployeeWindow.getProduction() * this.currentEmployeeWindow.getWorkTime() / 4), { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);


            //Textes de conseil pour le joueur
            this.employeeTips = new Array(3);

            for (let i = 0; i < 3; i++) {
                this.employeeTips[i] = this.game.add.text(350, 390 + i * 40, "• " + determineTextAdvice(employee)[0], { font: "14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);
            }
        }

        //Si aucun employé ne possède ce bureau
        else {
            this.currentEmployeeWindow = undefined;
            this.upgradeBtn = this.game.add.image(this.config.width / 2, 255, 'hirebtn').setScale(0.75).setScrollFactor(0).setInteractive({ cursor: "pointer" }).setDepth(21);

            this.employeeName = this.game.add.text(400, 55, "Hire someone to unlock", { font: "bold 18px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);


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
                this.employeeParameterGauge[0].textBar = this.game.add.text(500, 105, this.currentEmployeeWindow.getSalary().toString() + '€', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);
                this.employeeParameterGauge[1].textBar.destroy();
                this.employeeParameterGauge[1].textBar = this.game.add.text(510, 165, this.currentEmployeeWindow.getWorkTime().toString() + 'H', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);
                this.employeeParameterGauge[0].progressbar.destroy();
                this.employeeParameterGauge[0].progressbar = displayWindowProgressBar(this.game, 429, 125, this.currentEmployeeWindow.getSalaryPercent());
                this.employeeParameterGauge[1].progressbar.destroy();
                this.employeeParameterGauge[1].progressbar = displayWindowProgressBar(this.game, 429, 185, this.currentEmployeeWindow.getWorkTimePercent());


                this.happinessProgressBar.destroy();
                this.happinessProgressBar = displayWindowHappinessProgressBar(this.game, 393, 310, this.currentEmployeeWindow.getHappiness())
                this.happinessBarText.destroy();
                this.happinessBarText = this.game.add.text(495, 290, roundToTwo(this.currentEmployeeWindow.getHappiness()) + ' %', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);

                //Calcul production par seconde : un jour = 12 ticks et journée max = 12 ticks, de plus une journée = 4 secondes
                //Donc pour avoir la prod par seconde, on regarde sa prod journalière * nombre d'heures de taff / 4
                this.productionProgressBar.destroy();
                this.productionProgressBar = displayWindowProductionProgressBar(this.game, 393, 360, roundToTwo(this.currentEmployeeWindow.getProduction() * this.currentEmployeeWindow.getWorkTime() / 4))
                this.productionBarText.destroy();
                this.productionBarText = this.game.add.text(490, 340, roundToTwo(this.currentEmployeeWindow.getProduction() * this.currentEmployeeWindow.getWorkTime() / 4) + ' /s', { font: "bold 14px Arial", fill: "#000000" }).setScrollFactor(0).setDepth(21);;
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

        case 'generalWage':
            mapManager.getWelfareBusinessGame().decreaseAverageSalary();
            break;

        case 'generalWorkTime':
            mapManager.getWelfareBusinessGame().decreaseAverageWorkTime();
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

        case 'generalWage':
            mapManager.getWelfareBusinessGame().increaseAverageSalary();
            break;

        case 'generalWorkTime':
            mapManager.getWelfareBusinessGame().increaseAverageWorkTime();
            break;
    }


}


function displayWindowProgressBar(game, x, y, percentSize) {
    let progressbar = game.add.image(x, y, 'infobar').setOrigin(0, 0).setScale(1.35 * percentSize / 100, 0.22).setScrollFactor(0).setDepth(21)

    return progressbar;
}

function displayWindowHappinessProgressBar(game, x, y, percentSize) {
    let progressbar = game.add.image(x, y, 'happinessbar').setOrigin(0, 0).setScale(1.73 * percentSize / 100, 0.22).setScrollFactor(0).setDepth(21)

    return progressbar;
}

function displayWindowProductionProgressBar(game, x, y, percentSize) {
    let progressbar = game.add.image(x, y, 'productionbar').setOrigin(0, 0).setScale(1.73 * (percentSize > 200 ? 200 : percentSize) / 200, 0.22).setScrollFactor(0).setDepth(21)

    return progressbar;
}

function getNextDeskPrice(level) {
    switch (level) {
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

function getShopPriceString() {
    let data = dataManager.getData();

    let coffee = 0;
    let water = 0;
    let plant = 0;
    let ping = 0;
    let sleep = 0;
    let sport = 0;
    let kitchen = 0;

    if (data.shop.coffee.level < 1) {
        coffee = '400€'
    }
    else {
        coffee = 'MAX'
    }

    if (data.shop.water.level < 3) {
        water = '150€'
    }
    else {
        water = 'MAX'
    }

    if (data.shop.plant.level < 6) {
        plant = '300€'
    }
    else {
        plant = 'MAX'
    }

    if (!data.shop.ping.active) {
        ping = '500€'
    }
    else {
        ping = 'MAX'
    }

    if (!data.shop.sleep.active) {
        sleep = '2500€'
    }
    else {
        sleep = ' MAX'
    }

    if (!data.shop.sport.active) {
        sport = '2000€'
    }
    else {
        sport = 'MAX'
    }

    if (!data.shop.kitchen.active) {
        kitchen = '3500€'
    }
    else {
        kitchen = ' MAX'
    }

    return {
        coffee,
        water,
        plant,
        ping,
        sleep,
        sport,
        kitchen
    }
}
