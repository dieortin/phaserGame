Bird = function(game) {
	this.game = game;
	this.sprite = null;
};

Bird.prototype = {
	preload: function () {
    	this.game.load.spritesheet('bird', 'assets/bird.png', 240, 314);
	},
	create: function () {
		this.sprite = this.game.add.sprite(180, this.game.world.height / 2, 'bird'); //Add background bird sprite & animations
		this.sprite.scale.setTo(0.2, 0.2);
		this.sprite.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 50, true);
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.velocity.x = -75;
		this.sprite.checkWorldBounds = true; //Check if it's out of the world
		this.sprite.anchor.setTo(.5, 1); //To flip around its middle
		this.sprite.events.onOutOfBounds.add(this.horizFlip, this);
	},
	horizFlip: function () {
		this.sprite.scale.x = this.sprite.scale.x * -1;
		this.sprite.body.velocity.x = this.sprite.body.velocity.x * -1;
		if (Math.random() > .5) {
		    this.sprite.body.velocity.y = Math.random() * 10;
		} else {
		    this.sprite.body.velocity.y = Math.random() * -10;
		}
	},
	update: function() {
		this.sprite.animations.play('fly');
	    if (this.sprite.y > 400) { //If bird exiting by the bottom
	        this.sprite.body.velocity.y = Math.random() * -10;
	    } else if (this.sprite.y < 0) { //If bird exiting by the top
	       this.sprite.body.velocity.y = Math.random() * 10;
	    }
	}
};