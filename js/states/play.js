var play = function(game) {  
};

var player; //The player sprite

var bullet_velocity = 150; //Speed of bullets
var difficulty_level = 1.5;

var bullets = []; //Array of bullet objects

play.prototype = {
    preload: function() {
        //Debug/Console logging
        console.log("Game start.");
        
        //Image loading
        this.game.load.image('player' , "res/ball.png");
        this.game.load.image('black_bullet' , "res/black_bullet.png");
        this.game.load.image('white_bullet' , "res/white_bullet.png");
        this.game.load.image('background' , "res/back.png");
        
        //Other loading
        
        //Key Listeners
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function () { //Note make sure this is not in update (fps problems)
            bullets.push(new Bullet(player.x , player.y , player.rotation - Math.PI , bullet_velocity , this.game , 'white_bullet'));
        }, this);
        
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function () { //Note make sure this is not in update (fps problems)
            bullets.push(new Bullet(player.x , player.y , player.rotation , bullet_velocity , this.game , 'black_bullet'));
        }, this);
        
    },
    
    create: function() {
        
        var background = this.game.add.sprite(this.game.width / 2 , this.game.height / 2 , 'background');
        background.anchor.set(.5);
        
        //Player
        player = this.game.add.sprite(this.game.width / 2 , this.game.height / 2 , 'player');
        player.anchor.set(.5);
        player.scale.set(.5);
        this.game.physics.enable(player , Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        
        //Misc.

    },
    
    update: function() {
                
        //Input
        cursors = this.game.input.keyboard.createCursorKeys();
        
        if(cursors.up.isDown) {
            player.body.velocity.y = -150;
        } else if(cursors.down.isDown) {
            player.body.velocity.y = 150;   
        } else {
            player.body.velocity.y = 0;   
        }
        
        //Misc.
        player.angle += difficulty_level;
        
        bullets.forEach(function(bullet) {
            bullet.selfDestroy(); //Determine if bullet is outside of screen and should be destroyed
        });
        
    }
}