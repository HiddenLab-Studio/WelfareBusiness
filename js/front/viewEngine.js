var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 563,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload (){
    this.load.image('theo', 'img/a-theo_emote.png/')
}

function create (){
    this.add.image(400, 250, 'theo');
}

function update (){

}