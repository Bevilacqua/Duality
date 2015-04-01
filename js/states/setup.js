var setup = function(game) {
    
};

setup.prototype = {
    preload: function() {
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.refresh();
        
        this.game.stage.backgroundColor = '#FFFFF0';
        
        this.game.state.start('play');

  },
    
    create: function() {
    
    },
    
    update: function() {
        
    }
}