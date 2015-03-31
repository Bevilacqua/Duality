var main = function(game) {
};

var ball;
var vel = 250;
var bullets = new Array();

main.prototype = {
    preload: function() { 
        this.game.time.advancedTiming = true; //Debug
        console.log("Entering main.")
        console.log("Setting up game...");
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.refresh();
        
        this.game.load.image('ball' , "res/ball.png");
        
        this.game.stage.backgroundColor = '#FFFFF0';
        
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function () { //Note make sure this is not in update (fps problems)
            console.log("create");
            bullets.push(new Bullet(ball.x , ball.y , ball.rotation - Math.PI , vel , this.game));
        }, this);
        
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function () { //Note make sure this is not in update (fps problems)
            console.log("create");
            bullets.push(new Bullet(ball.x , ball.y , ball.rotation , vel , this.game));
        }, this);
    },
    
    create: function() {
        ball = this.game.add.sprite(this.game.width / 2 , this.game.height / 2 , 'ball');
        ball.anchor.set(.5);
        ball.scale.set(.5);
        this.game.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.collideWorldBounds = true;

        
    },
    
    update: function() {
        ball.angle++;
                
//        console.log(bullets.length , this.game.time.fps);
        
        bullets.forEach(function(bullet) {
               bullet.selfDestroy();
        });
        
        cursors = this.game.input.keyboard.createCursorKeys();

        if(cursors.up.isDown) {
            ball.body.velocity.y = -150;
        } else if(cursors.down.isDown) {
            ball.body.velocity.y = 150;   
        } else {
            ball.body.velocity.y = 0;   
        }
        
    }
}

var Bullet = function(x, y , angle , velocity , game) {
    this.velX = velocity * Math.cos(angle);
    this.velY = velocity * Math.sin(angle);
    this.game = game;
    
    this.sprite = game.add.sprite(x , y , 'ball');
    this.sprite.anchor.set(.5);
    this.sprite.scale.set(.25);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.velocity.x = this.velX;
    this.sprite.body.velocity.y = this.velY;
};

Bullet.prototype.selfDestroy = function(){
    
    if(this.sprite.x < 0 || this.sprite.x > this.game.width) {
        this.sprite.destroy();
        delete this;
    }
}


