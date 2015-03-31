(function() {
    var game = new Phaser.Game(800 , 600 , Phaser.AUTO , '');
    game.state.add('main' , main)
        
    game.state.start('main'); 
})();

