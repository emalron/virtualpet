var gWidth = 360;
var gHeight = 640;

var game = new Phaser.Game(gWidth, gHeight, Phaser.AUTO);
var state = {init: init, preload: preload, create: create, update: update};

game.state.add('state', state);
game.state.start('state');

function init() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageHorizontally = true;
    game.scale.pageVertically = true;
}

function preload() {
    // load backyard
    game.load.image('bg', 'assets/images/backyard.png');
    
    // load menu
    game.load.image('apple', 'assets/images/apple.png');
    game.load.image('candy', 'assets/images/candy.png');
    game.load.image('toy', 'assets/images/rubber_duck.png');
    game.load.image('rotate', 'assets/images/rotate.png');
    
    // load pet spritesheet
    game.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1);
}

function create() {    
    this.background = game.add.sprite(0,0,'bg');
    
    this.apple = game.add.sprite(0.2*gWidth, 0.9*gHeight, 'apple')
    this.apple.anchor.setTo(.5);
    
    this.candy = game.add.sprite(0.4*gWidth, 0.9*gHeight, 'candy')
    this.candy.anchor.setTo(.5);
    
    this.toy = game.add.sprite(0.6*gWidth, 0.9*gHeight, 'toy')
    this.toy.anchor.setTo(.5);
    
    this.rotate = game.add.sprite(0.8*gWidth, 0.9*gHeight, 'rotate')
    this.rotate.anchor.setTo(.5);
    
}

var test = true

function update() {
    if(test) {
        console.log(this.background);
        test = false;
    }
}