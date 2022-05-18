let playmusic = 0
class windowObject {
    constructor(game, config) {

        this.game = game;
        this.config = config;
        //this.createBackWindow();
        this.windowType = undefined;//Garde en mémoire quel type de fenêtre est ouvert
        this.opened = false
    }

    //Créé le background de la fenêtre
    createBackWindow() {
        let window = this;
        this.opened = true;
        this.menu = this.game.add.image(this.config.width * 0.5, 300, 'windowBack').setScale(0.6, 0.8).setScrollFactor(0);
        this.closewindowbtn = this.game.add.image(640, 97, 'closeWindowBtn').setScale().setInteractive().setScrollFactor(0);

        this.closewindowbtn.on('pointerdown', function () {
            window.closeWindow();
        });

        //this.music = this.game.sound.add('accueil');
        //this.music.loop = true;
        //this.music.play();
    }

    createShopWindow() {
        this.windowType = "shop"
        let window = this
        this.opened = true
        this.menu = this.game.add.image(this.config.width * 0.5, 475, 'shop_window').setScrollFactor(0)
        this.btn_coffee = this.game.add.image(200, 480, 'btn_machine-cafe').setScale(0.75).setInteractive().setScrollFactor(0)
        this.btn_water = this.game.add.image(500, 480, 'btn_machine-eau').setScale(0.75).setInteractive().setScrollFactor(0)
        this.btn_plant = this.game.add.image(800, 480, 'btn_plante').setScale(0.75).setInteractive().setScrollFactor(0)
        this.closewindowbtn = this.game.add.image(950, 395, 'closeWindowBtn').setScale().setInteractive().setScrollFactor(0);

        this.btn_water.on('pointerdown', function () {
            window.spawnwater();
        })
        this.btn_plant.on('pointerdown', function () {
            window.spawnplant();
        })
        this.btn_coffee.on('pointerdown', function () {
            window.spawncoffee();
        })
        this.closewindowbtn.on('pointerdown', function () {
            window.closeWindow();
        });

    }

    spawncoffee() {
        console.log('spawn coffee')
        this.btn_coffee.destroy()
        this.btn_coffee = this.game.add.image(200, 480, 'btn_machine-cafe_selec').setScale(0.75).setScrollFactor(0)
    }

    spawnwater() {
        console.log('spawn water')
        this.btn_water.destroy()
        this.btn_water = this.game.add.image(500, 480, 'btn_machine-eau_selec').setScale(0.75).setScrollFactor(0)

    }

    spawnplant() {
        console.log('spawn plants')
        this.btn_plant.destroy()
        this.btn_plant = this.game.add.image(800, 480, 'btn_plante_selec').setScale(0.75).setScrollFactor(0)
    }

    closeShop() {
        this.btn_coffee.destroy();
        this.btn_water.destroy();
        this.btn_plant.destroy();
    }

    //Ferme la fenêtre
    closeWindow() {
        if (this.opened) {
            switch (this.windowType) {
                case "option":
                    this.closeSettingsWindow()

                    break;

                case "projectChoice":
                    this.closeProjectChoiceWindow();
                    break;

                case "employee":
                    this.closeEmployeeWindow();
                    break;
                case "shop":
                    this.closeShop();
                    break
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
        const song = this
        let mutesong = true
        if (playmusic == 0) {
            song.accueilSound = song.game.sound.add('Sound')
            playmusic = 1
        }
        
        let musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        song.accueilSound.play(musicConfig)
        let vol = 10
        this.printvol = this.game.add.text(475, 150, vol, {fill: "white", font: "30px calibri" })
        this.volume = this.game.add.text(350,150, 'Volume : ', {fill: "white", font: "30px calibri"})
        this.plus = this.game.add.image(575, 165, 'increaseVolume').setInteractive().setScale(0.35).setScrollFactor(0);
        this.moins = this.game.add.image(535, 165, 'lowerVolume').setInteractive().setScale(0.35).setScrollFactor(0);
        this.mute = this.game.add.image(625, 165, 'volumeMute').setInteractive().setScale(0.35).setScrollFactor(0);
        this.mute.on('pointerdown', function () {
            if (mutesong) {
                mutesong = false
                song.game.sound.stopAll()
            }
            else {
                mutesong = true
                song.accueilSound.play()
            }

        })
        this.moins.on('pointerdown', function () {
            musicConfig.volume -= 0.05
            vol -= 1
            song.printvol.destroy()
            song.printvol = song.game.add.text(475, 150, vol, {fill: "white", font: "30px calibri" })
            console.log(musicConfig)
            song.accueilSound.pause()
            song.accueilSound.play(musicConfig)
        })
        this.plus.on('pointerdown', function () {
            musicConfig.volume += 0.05
            vol += 1
            song.printvol.destroy()
            song.printvol = song.game.add.text(475, 150, vol, {fill: "white", font: "30px calibri" })
            console.log(musicConfig)
            song.accueilSound.pause()
            song.accueilSound.play(musicConfig)

        })






    }

    //Supprime les éléments de la fenêtre des settings
    closeSettingsWindow() {
        this.volume.destroy();
        this.plus.destroy()
        this.moins.destroy()
        this.mute.destroy()
        this.printvol.destroy()
    }

    //Fenêtre de choix de projet
    beProjectChoiceWindow(choice1, choice2, choice3) {
        this.windowType = "projectChoice";

        this.projectChoice = new Array(3);

        for (let i = 0; i < 3; i++) {
            this.projectChoice[i] = {
                background: this.game.add.image(350, 150 + i * 100, 'infobar').setOrigin(0, 0).setScale(2, 2.4),
                title: this.game.add.text(360, 160 + i * 100, "project title", { font: "14px Arial", fill: "#ff4000" }),
            }
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
        this.employeeName = this.game.add.text(400, 95, "Employee name", { font: "14px Arial", fill: "#000000" });

        //Jauge de salaire et temps de travail ajustable + bouton d'upgrade du bureau
        for (let i = 0; i < 2; i++) {
            this.employeeParameterGauge[i] = {
                bar: this.game.add.image(350, 135 + i * 30, 'infobar').setOrigin(0, 0).setScale(1.8, 0.1),
                percentage: this.game.add.text(620, 130 + i * 30, "100%", { font: "14px Arial", fill: "#000000" }),
                upgradeBtn: this.game.add.image(360, 185, 'infobar').setOrigin(0, 0).setScale(1, 1.5),
                upgradeBtnText: this.game.add.text(395, 203, "Level MAX", { font: "14px Arial", fill: "#000000" }).setOrigin(0, 0),
            }

        }

        //Jauge d'information du bien être de l'employé
        this.employeeWelfareGauge = new Array(3);

        for (let i = 0; i < 3; i++) {
            this.employeeWelfareGauge[i] = {
                icon: this.game.add.image(350, 255 + i * 50, 'infobar').setOrigin(0, 0).setScale(0.25, 1),
                bar: this.game.add.image(400, 272 + i * 50, 'infobar').setOrigin(0, 0).setScale(1.4, 0.1),
            }
        }

        //Textes de conseil pour le joueur
        this.employeeTips = new Array(3);

        for (let i = 0; i < 3; i++) {
            this.employeeTips[i] = this.game.add.text(350, 405 + i * 40, "• Texte de conseil", { font: "14px Arial", fill: "#000000" });

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
