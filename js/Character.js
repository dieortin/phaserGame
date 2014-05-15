Character = function(game, xpos, ypos, xvel, yvel) {
	this.game = game;
	this.sprite = null;
	this.cursors = null;
	this.properties = {
		position: {
			xpos: xpos,
			ypos: ypos
		},
		velocity: {
			xvel: xvel,
			yvel: yvel
		}
	}
};

Character.prototype = {
	preload: function () {
    	this.game.load.spritesheet('character', 'assets/current/spritesheets/dude.png', 27, 42);
	},
	create: function () {
		this.sprite = this.game.add.sprite(this.properties.position.xpos, this.properties.position.ypos, 'character'); //Add character sprite
		this.game.physics.arcade.enable(this.sprite); //Enable physics for the character
		this.sprite.body.collideWorldBounds = true; //Prevent the character from going out of the world's boundaries
		this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
		this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
		this.sprite.body.gravity.y = 900; //Set gravity for the player
		this.game.camera.follow(this.sprite); //Make the camera follow the character
		this.cursors = this.game.input.keyboard.createCursorKeys(); //Get cursor keys for control
	},
	update: function() {
		this.game.physics.arcade.collide(this.sprite, level.spikes, this.die, null, this);
		this.game.physics.arcade.collide(this.sprite, level.floor);
		this.sprite.body.velocity.x = 0;
		if (this.cursors.left.isDown) {
		    this.run(0);
		} else if (this.cursors.right.isDown) {
		    this.run(1);
		} else {
		  	this.sprite.animations.stop();
		    this.sprite.frame = 4; //  Stand still
		}
		if (this.cursors.up.isDown && this.sprite.body.touching.down) {
		   	this.jump();
		}
	},
	jump: function() { // Jump
		this.sprite.body.velocity.y = -this.properties.velocity.yvel;
	},
	run: function(direction) { // Run to the left or to the right
		if (direction) { // Direction positive = run to the right
			this.sprite.body.velocity.x = this.properties.velocity.xvel;
		    this.sprite.animations.play('right');
		} else if (!direction) { // Direction negative = run to the left
			this.sprite.body.velocity.x = -this.properties.velocity.xvel;
			this.sprite.animations.play('left');
		}
	},
	die: function(char, spikes) {
		this.game.state.start('dead');
		this.sprite.body.collideWorldBounds = false;
	},
	deadUpdate: function() { // Function to substitute update when the game state is 'dead'
		this.sprite.y -= 10;
	}
};