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
    this.load.image('windowBack', './img/HUD/fenetre.png');
    this.load.image('volumeMute', './img/HUD/son_coupe.png');
    this.load.image('volumeLow', './img/HUD/son_min.png');
    this.load.image('volumeHigh', './img/HUD/son_max.png');
    this.load.audio('accueil', ['./audio/test.mp3', './audio/test.ogg']);
    this.load.image("tiles", "./map/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "./map/tuxemon-town.json");
    this.load.image('button_settings', './img/HUD/settings.png');
    this.load.image('button_shop', './img/HUD/logo_shop.png');
    this.load.image('argent_hud', './img/HUD/argent_hud.png');
    this.load.image('bonheur_hud', './img/HUD/humeur_hud.png');
    this.load.image('date_hud', './img/HUD/date_hud.png');
    this.load.image('pause', './img/HUD/bouton_pause.png');
    this.load.image('play', './img/HUD/bouton_play.png');
    this.load.image('avance_rapide', './img/HUD/bouton_acc.png');
    this.load.image('closeWindowBtn', './img/HUD/croix.png');
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
