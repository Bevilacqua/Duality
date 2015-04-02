var Bullet = function(x , y , angle , velocity , game , key) {
    this.velX = velocity * Math.cos(angle); //X velocity 
    this.velY = velocity * Math.sin(angle); //Y velocity
    this.game = game;
    this.key = key;
    
    this.sprite = game.add.sprite(x , y , key);
    this.sprite.anchor.set(.5);
    this.sprite.scale.set(.5);
    
    game.physics.enable(this.sprite , Phaser.Physics.ARCADE);
    this.sprite.body.velocity.x = this.velX;
    this.sprite.body.velocity.y = this.velY;
    
};

Bullet.prototype.selfDestroy = function() {
    if(this.sprite.x < 0 || this.sprite.x > this.game.width || this.sprite.y < 0 || this.sprite.y > this.game.height) {        
        this.sprite.destroy(); //Destroy sprite
        delete this; //Destroy object
    }
}

Bullet.prototype.Destroy = function() {
    this.sprite.destroy(); //Destroy sprite
    delete this; //Destroy object
}