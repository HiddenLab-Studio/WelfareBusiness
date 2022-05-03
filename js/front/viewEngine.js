var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 563,
    backgroundColor: '#DAD1CF',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var gamePhaser = new Phaser.Game(config);
var chaise, menu, music;
var open = false;

function preload() {
    this.load.image('button_play', './img/bouton_play.png');
    this.load.image('chaise', './img/chaise_bureau.png');
    this.load.image('button_settings', './img/settings.png');
    this.load.image('menu', './img/menu.png');
    this.load.image('volume', './img/volume.png');
    this.load.audio('accueil', ['./audio/test.mp3', './audio/test.ogg']);
    this.load.image('theo', '../img/a-theo_emote.png');
}

let hud;
function create() {
    let game = this;
    hud = new hudObject(game, config);

}


var start = 0
function update() {
    let game = this;


}
