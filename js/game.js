(function() {
    var game = new Phaser.Game(960  , 540 , Phaser.AUTO , 'game_container'); //Preliminary size. May change later so enusre all locations are relative
    game.state.add('setup' , setup);
    game.state.add('play' , play);
    
    game.state.start('setup');
})();

