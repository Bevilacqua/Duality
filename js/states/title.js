var title = function(game) {   
};

var highScore;

title.prototype = {
    
    init: function() {
        highScore = localStorage.getItem("high_score");    
        this.game.stage.backgroundColor = '#ffffff';
    },
    
    preload: function() {
        this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(function () { //Note make sure this is not in update (fps problems)
            this.exit();
        }, this);
    },
    
    create: function() {
        var title_Text = this.game.add.text(this.game.width / 2 , this.game.height / 10 , "Duality" , {fill: "black"});
        title_Text.anchor.set(.5);
        title_Text.scale.set(1.25);
        
        var credit_Text = this.game.add.text(this.game.width / 2 , this.game.height / 6 , "Created by Jacob Bevilacqua" , {fill: "grey"});
        credit_Text.anchor.set(.5);
        credit_Text.scale.set(.75);
        credit_Text.alpha = 0;
        
        this.game.add.tween(credit_Text)
            .to({alpha: 1} , 3000)
            .start();
        
        var topScore_Text = this.game.add.text(this.game.width / 2 , this.game.height - (this.game.height / 4) , "Top score: " + highScore , {fill: "grey"});
        topScore_Text.anchor.set(.5);
        topScore_Text.scale.set(.75);
        topScore_Text.alpha = 0;
        
        this.game.add.tween(topScore_Text)
            .to({alpha: 1} , 3500)
            .start();
        
        var start_Text = this.game.add.text(this.game.width / 2 , this.game.height / 2 , "Press ENTER to start." , {fill: "black"});
        start_Text.anchor.set(.5);
        start_Text.alpha = 0;
        
         this.game.add.tween(start_Text)
            .to({alpha: 1} , 500)
            .start();
        
    },
    
    update: function() {
        
    }
}

title.prototype.exit = function() {
    this.game.state.start('play');
}