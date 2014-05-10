Character = function(game) {
	this.game = game;
	this.sprite = null;
	this.cursors = null;
};

Character.prototype = {
	preload: function () {
    	this.game.load.spritesheet('character', 'assets/dude.png', 27, 42);
	},
	create: function () {
		this.sprite = this.game.add.sprite(100, this.game.world.height - 150, 'character'); //Add character sprite
		this.game.physics.arcade.enable(this.sprite); //Enable physics for the character
		this.sprite.body.collideWorldBounds = true; //Prevent the character from going out of the world's boundaries
		this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
		this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
		this.sprite.body.gravity.y = 900; //Set gravity for the player
		this.game.camera.follow(this.sprite); //Make the camera follow the character
		this.cursors = this.game.input.keyboard.createCursorKeys(); //Get cursor keys for control
	},
	update: function() {
		this.game.physics.arcade.collide(this.sprite, level.spikes);
		this.game.physics.arcade.collide(this.sprite, level.floor);
		this.sprite.body.velocity.x = 0;
		if (this.cursors.left.isDown) {
		    this.sprite.body.velocity.x = -150; //  Move to the left
		    this.sprite.animations.play('left');
		}
		else if (this.cursors.right.isDown) {
		        this.sprite.body.velocity.x = 150; //  Move to the right
		        this.sprite.animations.play('right');
		}
		else {
		    	this.sprite.animations.stop();
		        this.sprite.frame = 4; //  Stand still
		} if (this.cursors.up.isDown && this.sprite.body.touching.down) {
		    	this.sprite.body.velocity.y = -400; // Jump
		}
	}
};