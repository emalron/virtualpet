var preloadState = {init: init, preload: preload, create: create};

function init() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
}

function preload() {
    let g = game;
    
    g.load.image('bg', 'assets/images/backyard.png');
    g.load.image('apple', 'assets/images/apple.png');
    g.load.image('candy', 'assets/images/candy.png');
    g.load.image('toy', 'assets/images/rubber_duck.png');
    g.load.image('rotate', 'assets/images/rotate.png');
    g.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1);
    
    g.load.image('logo', 'assets/images/logo.png')
    g.load.image('bar', 'assets/images/bar.png')
}

function create() {
    let g = game;
    
    g.stage.backgroundColor = '#fff';
    
    let logo = g.add.sprite(0.5*gWid, 0.5*gHig, 'logo');
    logo.anchor.setTo(.5);
    
    let bar = g.add.sprite(0.5*gWid, 0.7*gHig, 'bar');
    bar.anchor.setTo(.5);
    game.load.setPreloadSprite(bar);
    
    game.state.start('homeState');
}