var Target = function(x , y , left , velocity , game , key) {
    this.left = left; //If true the ball is on the left side
    this.game = game;
    
    this.sprite = game.add.sprite(x , y , key);
    this.sprite.anchor.set(.5);
    this.sprite.scale.set(1);
    
    game.physics.enable(this.sprite , Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;
    
    if(left) {
        this.sprite.body.velocity.y = -velocity;
    } else {
        this.sprite.body.velocity.y = velocity;
    }
    
    return this.sprite;
};

Target.prototype.selfDestroy = function() {
    if(this.sprite.x < 0 || this.sprite.x > this.game.width || this.sprite.y < -5 || this.sprite.y > this.game.height + 5) {        
        this.sprite.destroy(); //Destroy sprite
        delete this; //Destroy object
    }
}

Target.prototype.Destroy = function() {
    this.sprite.destroy(); //Destroy sprite
    delete this; //Destroy object
}