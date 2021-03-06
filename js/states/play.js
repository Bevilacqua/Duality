var play = function(game) {  
};

var player; //The player sprite

var bullet_velocity; //Speed of bullets
var difficulty_level;
var target_velocity;

var bullets; //Array of bullet objects
var white_bullets , black_bullets; //Group of bullet sprites
var left_targets , right_targets; //Group of target sprites
var textGroup;
var backGroup; //Group that goes behind targets and bullets

var score_text;

var elapsedTime;
var delayTime;

play.prototype = {
    
    init: function() {
        bullets = [];
        elapsedTime = 0.0;
        delayTime = 5000.0;
        
        bullet_velocity = 150; //Speed of bullets
        difficulty_level = .5;
        target_velocity = 25;
        
        this.game.global.score = 0;
    },
    
    preload: function() {
        //Debug/Console logging
        
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
        
        textGroup = this.game.add.group();
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
        score_text = this.game.add.text(this.game.width / 2 , this.game.height / 10 , "Score: " + this.game.global.score , {fill: "grey"});
        score_text.anchor.set(.5);
        score_text.scale.set(1.25);
        
        //Initial target
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
        score_text.text = "Score: " + this.game.global.score;
        
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
           if(target.y > target.game.height) {
                target.game.state.start('post_game', true , false);
           }
        });
        
        right_targets.forEach(function(target) {
           if(target.y < 0) {
                target.game.state.start('post_game', true , false);
           }
        });
        
        //Collision
        this.game.physics.arcade.collide(left_targets , white_bullets , function(target , bullet , context) {
            target.kill();
            bullet.kill();
            target.game.state.start('post_game', true , false);
        }); //Lose
        this.game.physics.arcade.collide(right_targets , black_bullets , function(target , bullet) {
            target.kill();
            bullet.kill();
            target.game.state.start('post_game' , true , false);
        }); //Lose
        
        this.game.physics.arcade.collide(right_targets , white_bullets , function(target , bullet) {
            target.kill();
            bullet.kill();
            difficulty_level += .1;
            target.game.global.score++;
        }); //+1 Point
        this.game.physics.arcade.collide(left_targets , black_bullets , function(target , bullet) {
            target.kill();
            bullet.kill();
            difficulty_level += .1;
            target.game.global.score++;
        }); //+1 Point
        
    }
    
}
