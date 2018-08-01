var gWid = 360;
var gHig = 640;

var game = new Phaser.Game(gWid, gHig, Phaser.Auto);

game.state.add('preloadState', preloadState);
game.state.add('homeState', homeState);
game.state.add('gameState', gameState);
game.state.start('preloadState');