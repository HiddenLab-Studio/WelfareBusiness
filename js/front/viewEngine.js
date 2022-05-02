var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 563,
    backgroundColor : '#DAD1CF',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('theo', 'img/a-theo_emote.png/')
}

function create() {
    //Créer un objet avec un event on click
    /*let theo = this.add.sprite(400, 100, 'theo').setOrigin(0, 0).setInteractive();

    theo.on('pointerdown', function () {
        console.log("clickthéo");
    });*/

    //Hauteur de la barre de menu du haut
    let topbarHeight = 71;




    //progressbar
    let progressbarStyle = this.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, config.width, 10);
    progressbarStyle.generateTexture('progressbar', config.width, 10);
    let progressbar = this.add.image(0, 0, 'progressbar').setOrigin(0, 0);

    //avatarDisplay
    let avatardisplayStyle = this.make.graphics().fillStyle(0x0000ff).fillRect(0, 0, 1.5*topbarHeight, 1.5*topbarHeight);
    avatardisplayStyle.generateTexture('avatarDisplay', 1.5*topbarHeight, 1.5*topbarHeight);
    let avatarDisplay = this.add.image(30, 30, 'avatarDisplay').setOrigin(0, 0);

    //Barre d'info (argent, bonheur, date et vitesse de jeu)
    let infobarStyle = this.make.graphics().fillStyle(0x00ffff).fillRect(0, 0, 4 * topbarHeight, 1.2*topbarHeight);
    infobarStyle.generateTexture('infobar', 4 * topbarHeight, 1.2*topbarHeight);
    let infobar = this.add.image(136, 40, 'infobar').setOrigin(0, 0);

    let moneyIcon = this.add.image(150, 50, 'theo').setScale(0.04).setOrigin(0, 0).setInteractive();
    let moneyString = "Valeur d'argent";
    let moneyText = this.add.text(170, 50, moneyString, { font: "14px Arial", fill: "#000000" });

    
    let happinessIcon = this.add.image(150, 70, 'theo').setScale(0.04).setOrigin(0, 0).setInteractive();
    let happinessString = "Valeur de bonheur";
    let happinessText = this.add.text(170, 70, happinessString, { font: "14px Arial", fill: "#000000" });

    //Date
    let dateString = "4 septembre 2002";
    let dateText = this.add.text(160, 95, dateString, { font: "14px Arial", fill: "#000000" });


    //Bouton de config
    let configStyle = this.make.graphics().fillStyle(0xff0000).fillRect(0, 0, topbarHeight, topbarHeight);
    configStyle.generateTexture('config', topbarHeight, topbarHeight);
    let configbtn = this.add.sprite(config.width - topbarHeight - 30, config.height - topbarHeight - 30, 'config').setOrigin(0, 0).setInteractive();

    configbtn.on('pointerdown', function () {
        console.log("clickconfig")
    });

    //Bouton de shop
    let shopStyle = this.make.graphics().fillStyle(0xffff00).fillRect(0, 0, topbarHeight, topbarHeight);
    shopStyle.generateTexture('shop', topbarHeight, topbarHeight);
    let shopbtn = this.add.sprite(30, config.height - topbarHeight - 30, 'shop').setOrigin(0, 0).setInteractive();

    shopbtn.on('pointerdown', function () {
        console.log("clickshop")
    });

}

function update() {

}