class windowObject {
    constructor(game, config) {

        this.game = game;
        this.config = config;
        //this.createBackWindow();
        this.windowType = undefined;

    }

    createBackWindow() {
        let window = this;
        this.opened = true;
<<<<<<< Updated upstream
        this.menu = this.game.add.image(this.config.width * 0.5, 300, 'windowBack').setScale(0.6, 0.8)
        this.volume = this.game.add.image(this.config.width * 0.5 - 125, 200, 'volume').setScale(0.15).setInteractive();
        this.closewindowbtn = this.game.add.image(640, 97, 'closeWindowBtn').setScale(2);

        console.log(this.closewindowbtn);
        this.closewindowbtn.on('pointerdown', function(){
            console.log("clickwindow");
=======
        this.menu = this.game.add.image(this.config.width * 0.5, 300, 'windowBack').setScale(0.6, 0.8);
        this.closewindowbtn = this.game.add.image(640, 97, 'closeWindowBtn').setScale().setInteractive();

        this.closewindowbtn.on('pointerdown', function () {
>>>>>>> Stashed changes
            window.closeWindow();
        });

        //this.music = this.game.sound.add('accueil');
        //this.music.loop = true;
        //this.music.play();
    }

    closeWindow() {
        this.opened = false;
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

    isOpened() {
        return this.opened;
    }

    beOptionWindow() {
        this.windowType = "option";

        this.volume = this.game.add.image(this.config.width * 0.5 - 125, 200, 'volumeHigh').setScale(0.35).setInteractive();
    }

    closeOptionWindow() {
        this.volume.destroy();
    }

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

    closeProjectChoiceWindow() {

        for (let i = 0; i < 3; i++) {
            this.projectChoice[i].background.destroy();
            this.projectChoice[i].title.destroy();
        }
    }

    //A MODIFIER QUAND ON AURA LE SYSTEME D EMPLOYES SUR LE JEU
    beEmployeeWindow(employee) {
        this.windowType = "employee";

        this.employeeParameterGauge = new Array(3);
        this.employeeName = this.game.add.text(400, 95, "Employee name", { font: "14px Arial", fill: "#000000" });

        for (let i = 0; i < 3; i++) {
            this.employeeParameterGauge[i] = {
                bar: this.game.add.image(350, 150 + i*30, 'infobar').setOrigin(0, 0).setScale(1, 0.1),
            }

        }
    }

    closeEmployeeWindow() {
        this.employeeName.destroy();
        for(let i = 0; i < 3; i++){
            this.employeeParameterGauge[i].bar.destroy();
        }
    }




}
