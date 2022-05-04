class windowObject {
    constructor(game, config) {

        this.game = game;
        this.config = config;
        //this.createWindow();

    }

    createWindow() {
        let window = this;
        this.opened = true;
        this.menu = this.game.add.image(this.config.width * 0.5, 300, 'windowBack').setScale(0.6, 0.8)
        this.volume = this.game.add.image(this.config.width * 0.5 - 125, 200, 'volume').setScale(0.15).setInteractive();
        this.closewindowbtn = this.game.add.image(640, 97, 'closeWindowBtn').setScale(2);

        console.log(this.closewindowbtn);
        this.closewindowbtn.on('pointerdown', function(){
            console.log("clickwindow");
            window.closeWindow();
        })

        //this.music = this.game.sound.add('accueil');
        //this.music.loop = true;
        //this.music.play();
    }

    closeWindow(){
        this.opened = false;
        this.menu.destroy();
        this.volume.destroy();
        this.closewindowbtn.destroy();
    }

    isOpened() {
        return this.opened;
    }
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