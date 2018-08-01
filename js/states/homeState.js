var homeState = {init: init, create: create};

function init(message) {
    game.message = message;
}

function create() {
    let g = game;
    
    // draw background
    let background = g.add.sprite(0,0,'bg');
    
    // write enter message
    let style = {font: '30px Arial', fill:'#fff'};
    let msg = g.add.text(g.world.centerX,g.world.height*0.8, 'TOUCH TO START', style);
    msg.anchor.setTo(.5);
    
    // start game
    background.inputEnabled = true;
    background.events.onInputDown.add(function() {
        g.state.start('gameState');
    }, this);
    
    // write message
    if(game.message) {
        let style2 = {font:'40px Arial', fill:'#f00'};
        let msg2 = game.add.text(g.world.centerX, g.world.centerY - 100, game.message, style2);
        msg2.anchor.setTo(.5);
    }
}