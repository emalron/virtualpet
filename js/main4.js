var gWid = 360;
var gHig = 640;

var game = new Phaser.Game(gWid, gHig, Phaser.Auto);

var state = {init: init, preload:preload, create:create};

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
    game.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1);
}

function create() {
    var g = game;
    
    g.background = g.add.sprite(0,0,'bg');
    g.background.inputEnabled = true;
    g.background.events.onInputDown.add(placeItem, this);
    
    g.apple = g.add.sprite(0.2*game.world.width, 0.9*game.world.height, 'apple');
    g.apple.anchor.setTo(.5);
    g.apple.inputEnabled = true;
    g.apple.events.onInputDown.add(pickItem, this);
    g.apple.params = {health: 20};
    
    g.candy = g.add.sprite(0.4*game.world.width, 0.9*game.world.height, 'candy');
    g.candy.anchor.setTo(.5);
    g.candy.inputEnabled = true;
    g.candy.events.onInputDown.add(pickItem, this);
    g.candy.params = {health: -10, fun: 20};
    
    g.toy = g.add.sprite(0.6*game.world.width, 0.9*game.world.height, 'toy');
    g.toy.anchor.setTo(.5);
    g.toy.inputEnabled = true;
    g.toy.events.onInputDown.add(pickItem, this);
    g.toy.params = {fun: 20};
    
    g.rotate = g.add.sprite(0.8*game.world.width, 0.9*game.world.height, 'rotate');
    g.rotate.anchor.setTo(.5);
    g.rotate.inputEnabled = true;
    g.rotate.events.onInputDown.add(rotatePet, this);
    g.rotate.params = {health: 30, fun: 40};
    
    
    g.buttons = [g.apple, g.candy, g.toy, g.rotate];
    
    g.pet = g.add.sprite(0.4*g.world.width, 0.6*g.world.height, 'pet', 0);
    g.pet.anchor.setTo(.5);
    g.pet.inputEnabled = true;
    g.pet.input.enableDrag(true);
    g.pet.params = {health: 100, fun: 100};
    
    g.pet.animations.add('yum', [1, 2, 3, 2, 1], 7, false);
    
    
    // ui
    var style = {font: '20px Arial', fill: '#000'};
    g.add.text(10, 20, 'Health:', style);
    g.add.text(140, 20, 'Fun:', style);
    
    g.healthDisplay = g.add.text(80,20, '', style);
    g.funDisplay = g.add.text(185,20, '', style);
    
    updateStat();
}

var uiBlocked = false;
var selectedItem = null;

function pickItem(sprite, event) {
    if(!uiBlocked) {
        clearSelection();
        sprite.alpha = .4;
        selectedItem = sprite;
        
        console.log('pick item..');
    }
}

function clearSelection() {
    game.buttons.forEach(function(element, index) {
        element.alpha = 1.0;
    });
    selectedItem = null;
}

function rotatePet(sprite, event) {
    if(!uiBlocked) {
        uiBlocked = true;
        clearSelection();
        sprite.alpha = .4;
        
        var rotating = game.add.tween(game.pet).to({angle: 720}, 1000);
        rotating.onComplete.add(function() {
            uiBlocked = false;
            console.log(sprite.params);
            sprite.alpha = 1.0;
            selectedItem = null;
            
            changeStat(sprite);
        })
        
        rotating.start();
    }
}

function placeItem(sprite, event) {
    if(selectedItem && !uiBlocked) {
        uiBlocked = true;
        
        var x = event.position.x;
        var y = event.position.y;
        
        var newItem = game.add.sprite(x, y, selectedItem.key);
        newItem.anchor.setTo(.5);
        newItem.params = selectedItem.params;
                
        var assult = game.add.tween(game.pet).to({x: x, y: y}, 700);
        assult.onComplete.add(function() {
            uiBlocked = false;
            
            game.pet.animations.play('yum');
            
            changeStat(newItem);
            
            console.log(game.pet.params);
            
            newItem.destroy();
        });
        
        assult.start();
    }
}

function changeStat(item) {
    var g = game;
    g.pet.params.health += item.params.health || 0;
    g.pet.params.fun += item.params.fun || 0;
    
    updateStat();
}

function updateStat() {
    var g = game;
    g.healthDisplay.text = g.pet.params.health;
    g.funDisplay.text = g.pet.params.fun;
}