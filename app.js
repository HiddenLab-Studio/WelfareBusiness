

const config = {
    height: 680,
    width: 1200,
    type: Phaser.AUTO,
    backgroundColor: '#DAD1CF',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config)
var chaise, menu, music;
var open = false
function preload() {
    this.load.image('button_play', './img/bouton_play.png');
    this.load.image('chaise', './img/chaise_bureau.png')
    this.load.image('button_settings', './img/settings.png');
    this.load.image('menu', './img/menu.png');
    this.load.image('volume', './img/volume.png');
    this.load.audio('accueil', ['./audio/test.mp3', './audio/test.ogg'])
    this.load.image('theo', '../img/a-theo_emote.png')
    this.load.image('mute', '../img/mute.png')

}
function create() {
    let game = this
    
}

var start = 0
function update() {
    let game = this;
    if (start == 0) {
        var sprite = game.add.sprite(config.width * 0.5, 300, 'button_play').setInteractive();
        sprite.on('pointerdown', function (pointer) {

            this.setTint(0xff0000);
            console.log('click play')
            sprite.destroy()

            let theo = game.add.sprite(400, 100, 'theo').setOrigin(0, 0).setInteractive();
            theo.on('pointerdown', function () {
                console.log("clickthéo");
            });

            //Hauteur de la barre de menu du haut
            let topbarHeight = 71;


            //progressbar
            let progressbarStyle = game.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, config.width, 10);
            progressbarStyle.generateTexture('progressbar', config.width, 10);
            let progressbar = game.add.image(0, 0, 'progressbar').setOrigin(0, 0);

            //avatarDisplay
            let avatardisplayStyle = game.make.graphics().fillStyle(0x0000ff).fillRect(0, 0, 1.5 * topbarHeight, 1.5 * topbarHeight);
            avatardisplayStyle.generateTexture('avatarDisplay', 1.5 * topbarHeight, 1.5 * topbarHeight);
            let avatarDisplay = game.add.image(30, 30, 'avatarDisplay').setOrigin(0, 0);

            //Barre d'info (argent, bonheur, date et vitesse de jeu)
            let infobarStyle = game.make.graphics().fillStyle(0x00ffff).fillRect(0, 0, 4 * topbarHeight, 1.2 * topbarHeight);
            infobarStyle.generateTexture('infobar', 4 * topbarHeight, 1.2 * topbarHeight);
            let infobar = game.add.image(136, 40, 'infobar').setOrigin(0, 0);

            let moneyIcon = game.add.image(150, 50, 'theo').setScale(0.04).setOrigin(0, 0).setInteractive();
            let moneyString = "Valeur d'argent";
            let moneyText = game.add.text(170, 50, moneyString, { font: "14px Arial", fill: "#000000" });


            let happinessIcon = game.add.image(150, 70, 'theo').setScale(0.04).setOrigin(0, 0).setInteractive();
            let happinessString = "Valeur de bonheur";
            let happinessText = game.add.text(170, 70, happinessString, { font: "14px Arial", fill: "#000000" });

            //Date
            let dateString = "4 septembre 2002";
            let dateText = game.add.text(160, 95, dateString, { font: "14px Arial", fill: "#000000" });


            //Bouton de config
            let configStyle = game.make.graphics().fillStyle(0xff0000).fillRect(0, 0, topbarHeight, topbarHeight);
            configStyle.generateTexture('config', topbarHeight, topbarHeight);
            let configbtn = game.add.sprite(config.width - topbarHeight - 30, config.height - topbarHeight - 30, 'config').setOrigin(0, 0).setInteractive();

            configbtn.on('pointerdown', function () {
                console.log("clickconfig")
            });

            //Bouton de shop
            let shopStyle = game.make.graphics().fillStyle(0xffff00).fillRect(0, 0, topbarHeight, topbarHeight);
            shopStyle.generateTexture('shop', topbarHeight, topbarHeight);
            let shopbtn = game.add.sprite(30, config.height - topbarHeight - 30, 'shop').setOrigin(0, 0).setInteractive();

            shopbtn.on('pointerdown', function () {
                console.log("clickshop")
            });

        });
        start = 1
    }
    var spriteSettings = this.add.sprite(config.width - 100, config.height - 70, 'button_settings').setInteractive().setScale(0.2);

    if (open == false) {
        spriteSettings.on('pointerdown', function (pointer) {

            console.log('click settings ouvert')

            menu = game.add.image(config.width * 0.5, 300, 'menu').setScale(0.6)
            volume = game.add.image(config.width * 0.5 - 125, 200, 'volume').setScale(0.15).setInteractive()
            music = game.sound.add('accueil')

            music.loop = true
            music.play()

            var mute = game.add.sprite(config.width * 0.5 - 75, 200, 'mute').setScale(0.04)
            mute.on('pointerdown', function (pointer) {
                music.destroy()
                console.log('clickmotherfucker')
            });
            open = true

        });
    }
    else {
        spriteSettings.on('pointerdown', function (pointer) {

            console.log('click settings ferme')
            menu.destroy()
            volume.destroy()
            mute.destroy()
            open = false
        });
    }
    

}

