var gWid = 360;
var gHig = 640;

var game = new Phaser.Game(gWid, gHig, Phaser.AUTO);

var state = {init: init, preload: preload, create: create};

game.state.add('state', state);
game.state.start('state');

function init() {
    // initial setting
    // screen setting
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageHorizontally = true;
    game.scale.pageVertically = true;
}

function preload() {
    game.load.image('bg', 'assets/images/backyard.png');
    game.load.image('apple', 'assets/images/apple.png');
    game.load.image('candy', 'assets/images/candy.png');
    game.load.image('toy', 'assets/images/rubber_duck.png');
    game.load.image('rotate', 'assets/images/rotate.png');
    game.load.image('arrow', 'assets/images/arrow.png');
    
    game.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1);
}

function create() {
    game.background = game.add.sprite(0,0,'bg');
    
    game.apple = game.add.sprite(0.2*gWid, 0.9*gHig, 'apple');
    game.apple.anchor.setTo(0.5);
    game.apple.inputEnabled = true;
    game.apple.events.onInputDown.add(pickItem, this);
    game.apple.params = {health: 20};
    
    game.candy = game.add.sprite(0.4*gWid, 0.9*gHig, 'candy');
    game.candy.anchor.setTo(0.5);
    game.candy.inputEnabled = true;
    game.candy.events.onInputDown.add(pickItem, this);
    game.candy.params = {health: -10, fun: 10};
    
    
    game.toy = game.add.sprite(0.6*gWid, 0.9*gHig, 'toy');
    game.toy.anchor.setTo(0.5);
    game.toy.inputEnabled = true;
    game.toy.events.onInputDown.add(pickItem, this);
    game.toy.params = {fun: 20};
    
    game.rotate = game.add.sprite(0.8*gWid, 0.9*gHig, 'rotate');
    game.rotate.anchor.setTo(0.5);
    game.rotate.inputEnabled = true;
    game.rotate.events.onInputDown.add(rotatingPet, this);
    game.rotate.params = {health: 20};

    game.buttons = [game.apple, game.candy, game.toy, game.rotate];
    
    game.pet = game.add.sprite(0.4*gWid, 0.6*gHig, 'pet');
    game.pet.anchor.setTo(.5);
    // draggable pet
    game.pet.inputEnabled = true;
    game.pet.input.enableDrag();
    // make properties
    game.pet.params = {health: 100, fun: 100};
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

function rotatingPet(sprite, event) {
    if(!uiBlocked) {
        console.log('rotating pet...');
        uiBlocked = true;
        
        clearSelection();
        
        sprite.alpha = .4;
        
        selectedItem = sprite;
    }
}


function clearSelection() {
    game.buttons.forEach(function(element, index) {
        element.alpha = 1.0;
    });
    selectedItem = null;
}