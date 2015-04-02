var play = function(game) {  
};

var player; //The player sprite

var bullet_velocity = 150; //Speed of bullets
var difficulty_level = .5;
var target_velocity = 25;

var bullets = []; //Array of bullet objects
var white_bullets , black_bullets; //Group of bullet sprites
var left_targets , right_targets; //Group of target sprites
var backGroup; //Group that goes behind targets and bullets

var elapsedTime = 0.0;
var delayTime = 5000.0;

play.prototype = {
    preload: function() {
        //Debug/Console logging
        console.log("Game start.");
        
        //Image loading
        this.game.load.image('player' , "res/ball.png");
        this.game.load.image('black_bullet' , "res/black_bullet.png");
        this.game.load.image('white_bullet' , "res/white_bullet.png");
        this.game.load.image('target' , "res/target.png");
        this.game.load.image('background' , "res/back.png");
        
        //Other loading
        backGroup = this.game.add.group(); //Must be declared before other groups
        
        white_bullets = this.game.add.group();
        black_bullets = this.game.add.group();
        
        left_targets = this.game.add.group();
        right_targets = this.game.add.group();
        
        //Key Listeners
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function () { //Note make sure this is not in update (fps problems)
            var bullet = new Bullet(player.x , player.y , player.rotation - Math.PI , bullet_velocity , this.game , 'white_bullet');
            white_bullets.add(bullet.sprite);
            bullets.push(bullet);
        }, this);
        
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function () { //Note make sure this is not in update (fps problems)
            var bullet = new Bullet(player.x , player.y , player.rotation , bullet_velocity , this.game , 'black_bullet');
            black_bullets.add(bullet.sprite);
            bullets.push(bullet);
        }, this);
        
    },
    
    create: function() {
        
        var background = this.game.add.sprite(this.game.width / 2 , this.game.height / 2 , 'background');
        background.anchor.set(.5);
        backGroup.add(background);
        
        //Player
        player = this.game.add.sprite(this.game.width / 2 , this.game.height / 2 , 'player');
        player.anchor.set(.5);
        player.scale.set(.5);
        this.game.physics.enable(player , Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        
        //Misc.
        
        //DEBUG
        left_targets.add(new Target(this.game.width / 5,0,false,25,this.game,'target'));

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
        
        if(elapsedTime > delayTime) {
            if(this.game.rnd.integerInRange(0, 1) == 0)
                left_targets.add(new Target(this.game.width / 5,0,false,target_velocity,this.game,'target'));
            else 
                right_targets.add(new Target((this.game.width - (this.game.width / 5)),this.game.height,true,target_velocity,this.game,'target'));
            target_velocity += .05;
            if(delayTime > 100)
                delayTime -= 50;
            
            console.log("TargetVel: " + target_velocity + " | delayTime: " + delayTime);

            
            elapsedTime = 0.0;
        } else {
            elapsedTime += this.game.time.elapsedMS;   
        }
        
        player.angle += difficulty_level;
        
        bullets.forEach(function(bullet) {
            bullet.sprite.angle++;
            bullet.selfDestroy(); //Determine if bullet is outside of screen and should be destroyed
        });
        
        left_targets.forEach(function(target) {
           if(target.y > this.game.height) {
               target.destroy(); 
               console.log("lose");
           }
        });
        
        right_targets.forEach(function(target) {
           if(target.y < 0) {
               target.destroy(); 
               console.log("lose");
           }
        });
        
        //Collision
        this.game.physics.arcade.collide(left_targets , white_bullets , function(target , bullet) {
            target.kill();
            bullet.kill();
            console.log("lose");
        }); //Lose
        this.game.physics.arcade.collide(right_targets , black_bullets , function(target , bullet) {
            target.kill();
            bullet.kill();
            console.log("lose");
        }); //Lose
        
        this.game.physics.arcade.collide(right_targets , white_bullets , function(target , bullet) {
            target.kill();
            bullet.kill();
            difficulty_level += .1;
            console.log("+1(a)");
        }); //+1 Point
        this.game.physics.arcade.collide(left_targets , black_bullets , function(target , bullet) {
            target.kill();
            bullet.kill();
            difficulty_level += .1;
            console.log("+1(b)");
        }); //+1 Point
        
    }
}