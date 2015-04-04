var post_game = function(game) {
    
};

var return_Text , enter_Text;
var tweenStarted;

var elapsedTime , delay , step;
var displayScore;

post_game.prototype = {
    
    init: function() {
        tweenStarted = false;
        elapsedTime = 0;
        delay = 100;
        step = this.game.global.score / 20; //20 steps
        displayScore = 0;
        
        if(this.game.global.score > localStorage.getItem("high_score")) {
            localStorage.setItem("high_score" , this.game.global.score);   
        }
    },
    
    preload: function() {
         this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(function () { //Note make sure this is not in update (fps problems)
           this.game.state.start('play');
        }, this);
        
          this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(function () { //Note make sure this is not in update (fps problems)
           this.game.state.start('title');
        }, this);
    },
    
    create: function() {
        this.game.stage.backgroundColor = 'black';
        
        score_text = this.game.add.text(this.game.width / 2 , this.game.height / 10 , "Score: " + displayScore , {fill: "white"});
        score_text.anchor.set(.5);
        
        enter_Text = this.game.add.text(this.game.width / 2 , this.game.height / 4 , "Press enter to restart." , {fill: "white"});
        enter_Text.anchor.set(.5);
        enter_Text.alpha = 0;
        
        this.game.add.tween(enter_Text)
            .to({alpha: 1} , 1000)
            .start();
        
        return_Text = this.game.add.text(this.game.width / 2 , this.game.height / 3 , "Press esc to return to main menu." , {fill: "white"});
        return_Text.anchor.set(.5);
        return_Text.alpha = 0;
    },
    
    update: function() {
        if(enter_Text.alpha == 1 && !tweenStarted) {
            tweenStarted = true;
            this.game.add.tween(return_Text)
                .to({alpha: 1} , 1000)
                .start();
        }
        
        if(displayScore != this.game.global.score) {
            if(elapsedTime > delay) {
                elapsedTime = 0;
                displayScore += step;
            } else {
                elapsedTime += this.game.time.elapsedMS;   
            }
        }
        
        if(displayScore > this.game.global.score) displayScore = this.game.global.score;
        
        score_text.text = ("Score: " + Math.round(displayScore));
    }
}