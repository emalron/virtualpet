var gWid = 360;
var gHig = 640;

var game = new Phaser.Game(gWid, gHig, Phaser.Auto);
var state = {init:init, preload:preload, create:create};

game.state.add('state', state);
game.state.start('state');

function init() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
}

function preload() {
    game.load.image('bg', 'assets/images/backyard.png');
    game.load.image('apple', 'assets/images/apple.png');
    game.load.image('candy', 'assets/images/candy.png');
    game.load.image('toy', 'assets/images/rubber_duck.png');
    game.load.image('rotate', 'assets/images/rotate.png');
    
    game.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1);
}

function create() {
    var g = game;
    g.background = game.add.sprite(0,0,'bg');
    g.background.inputEnabled = true;
    g.background.events.onInputDown.add(placeItem, this);
    
    g.apple = game.add.sprite(0.2*g.world.width, 0.9*g.world.height, 'apple');
    g.apple.anchor.setTo(.5);
    g.apple.inputEnabled = true;
    g.apple.events.onInputDown.add(pickItem, this);
    
    g.candy = game.add.sprite(0.4*g.world.width, 0.9*g.world.height, 'candy');
    g.candy.anchor.setTo(.5);
    g.candy.inputEnabled = true;
    g.candy.events.onInputDown.add(pickItem, this);
    
    g.toy = game.add.sprite(0.6*g.world.width, 0.9*g.world.height, 'toy');
    g.toy.anchor.setTo(.5);
    g.toy.inputEnabled = true;
    g.toy.events.onInputDown.add(pickItem, this);
    
    g.rotate = game.add.sprite(0.8*g.world.width, 0.9*g.world.height, 'rotate');
    g.rotate.anchor.setTo(.5);
    g.rotate.inputEnabled = true;
    g.rotate.events.onInputDown.add(rotatePet, this);
    
    g.buttons = [g.apple, g.candy, g.toy, g.rotate];
    
    g.pet = game.add.sprite(0.4*g.world.width, 0.6*g.world.height, 'pet');
    g.pet.anchor.setTo(.5);
    g.pet.inputEnabled = true;
    g.pet.input.enableDrag(true);
}

var selectedItem = null;
var uiBlocked = false;

function pickItem(sprite, event) {
    if(!uiBlocked) {
        console.log('pick item');
        
        clearSelection();
        
        sprite.alpha = .4;
        
        selectedItem = sprite;
    }
}

function clearSelection() {
    game.buttons.forEach(function(e, i) {
        e.alpha = 1.0;
    })
    selectedItem = null;
}

function rotatePet(sprite, event) {
    if(!uiBlocked) {
        uiBlocked = true;
        clearSelection();
        
        sprite.alpha = .4;
        
        var rotating = game.add.tween(game.pet).to({angle:720}, 1000);
        rotating.onComplete.add(function() {
            uiBlocked = false;
            sprite.alpha = 1.0;
        })
        
        rotating.start();
    }
}

function placeItem(sprite, event) {
    if(selectedItem) {
        var x = event.position.x;
        var y = event.position.y;
    
        game.add.sprite(x,y,selectedItem.key);
    }
}