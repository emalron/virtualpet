var gameState = {create: create, update: update};

function create() {
    let g = game;
    // draw entities
    g.background = g.add.sprite(0,0,'bg')
    g.apple = g.add.sprite(0.2*gWid, 0.9*gHig, 'apple');
    g.apple.anchor.setTo(.5);
    g.candy = g.add.sprite(0.4*gWid, 0.9*gHig, 'candy');
    g.candy.anchor.setTo(.5);
    g.toy = g.add.sprite(0.6*gWid, 0.9*gHig, 'toy');
    g.toy.anchor.setTo(.5);
    g.rotate = g.add.sprite(0.8*gWid, 0.9*gHig, 'rotate');
    g.rotate.anchor.setTo(.5);
    g.pet = g.add.sprite(0.4*gWid, 0.6*gHig, 'pet');
    g.pet.anchor.setTo(.5);
    
    // input setting
    g.apple.inputEnabled = true;
    g.apple.events.onInputDown.add(pickItem, this);
    g.candy.inputEnabled = true;
    g.candy.events.onInputDown.add(pickItem, this);
    g.toy.inputEnabled = true;
    g.toy.events.onInputDown.add(pickItem, this);
    g.rotate.inputEnabled = true;
    g.rotate.events.onInputDown.add(rotatePet, this);
    g.background.inputEnabled = true;
    g.background.events.onInputDown.add(placeItem, this);
    g.pet.inputEnabled = true;
    g.pet.input.enableDrag(true);
    
    // make icon arrays
    g.icons = [g.apple, g.candy, g.toy, g.rotate];
    
    // make eating animation
    g.pet.animations.add('yum', [1, 2, 3, 2, 0], 10);
    
    // set stats
    g.pet.params = {health: 100, fun: 100};
    g.apple.params = {health: 20};
    g.candy.params = {health: -10, fun: 10};
    g.toy.params = {health: -20, fun: 20};
    g.rotate.params = {fun: 40};
    
    // make pet stat ui
    let style = {font: '20px Arial', fill:'#000'};
    g.add.text(10, 20, 'Health: ', style);
    g.add.text(130, 20, 'Fun: ', style);
    
    g.healthDisplay = g.add.text(75, 20, '', style);
    g.funDisplay = g.add.text(170, 20, '', style);
    refreshUI();
    
    // decaying through time every 5 seconds
    g.time.events.loop(4000, decayStat, this);
}

function update() {
    let p = game.pet;
    
    if(p.params.health <= 0 || p.params.fun <= 0) {
        uiBlocked = true;
        p.frame = 4;
        
        game.time.events.add(4000, function() {
            game.state.start('homeState', true, false, 'Game Over');
        })
    }
}

var selectedItem = null;
var uiBlocked = false;

function pickItem(o, e) {
    if(!uiBlocked) {
        clearSelection();
        selectedItem = o;
        o.alpha = .4;
        console.log('pick item... ' + o.key);    
    }
}

function clearSelection() {
    game.icons.forEach(function(e,i) {
        e.alpha = 1.0;
    });
    selectedItem = null;
}

function rotatePet(o, e) {
    if(!uiBlocked) {
        uiBlocked = true;
        clearSelection();
        o.alpha = .4;
        
        // tween to rotate pet for 1 second
        let rot = game.add.tween(game.pet).to({angle:720}, 1000);
        rot.onComplete.add(function() {
            uiBlocked = false;
            o.alpha = 1.0;
            updateStat(o);
        })
        rot.start();
        
        console.log('rotate pet... ' + o.key);
    }
}

function placeItem(o, e) {
    if(selectedItem && !uiBlocked) {
        uiBlocked = true;
        let x = e.position.x;
        let y = e.position.y;
        
        let newItem = game.add.sprite(x, y, selectedItem.key);
        newItem.anchor.setTo(.5);
        newItem.params = selectedItem.params;
        
        // tween to move pet for .7 seconds
        let mov = game.add.tween(game.pet).to({x:x, y:y}, 700);
        mov.onComplete.add(function() {
            updateStat(newItem);
            newItem.destroy();
            game.pet.animations.play('yum');
            uiBlocked = false;
        })
        
        mov.start();
    }
    console.log('place item at ' + e.position);
}

function refreshUI() {
    let g = game;
    
    g.healthDisplay.text = g.pet.params.health;
    g.funDisplay.text = g.pet.params.fun;
}

function updateStat(o) {
    
    // for(var i in o.params) {
    //     if(game.pet.params.hasOwnProperty(i)) {
    //         game.pet.params[i] += o.params[i];
    //     }
    // }
    
    game.pet.params.health += o.params.health || 0;
    game.pet.params.fun += o.params.fun || 0;
    
    refreshUI();
}

function decayStat(o, e) {
    let p = game.pet;
    
    p.params.health -= 10;
    p.params.fun -= 15;
    
    refreshUI();
}