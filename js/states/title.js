var title = function(game) {
    
}

title.prototype = {
    preload: function() {
        this.game.load.image('background' , "res/back.png");
        this.exit();
    },
    
    create: function() {
        
    },
    
    update: function() {
        
    }
}

title.prototype.exit = function() {
    this.game.state.start('play');
}