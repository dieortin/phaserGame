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
		},
		joystickSpeedFactor: null
	};
	this.usingJoystick = false;
	this.jumpOnNext = false; // Used by the joystick to make the character jump on the next update
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
		this.game.physics.arcade.collide(this.sprite, level.level.spikes, this.die, null, this);
		this.game.physics.arcade.collide(this.sprite, level.level.floor);
		this.sprite.body.velocity.x = 0;
		if (this.usingJoystick) {
			this.run(this.properties.joystickSpeedFactor);
			if (this.jumpOnNext) {
				this.jump();
			}
			return
		}
		if (this.cursors.left.isDown) {
		    this.run(-1);
		} else if (this.cursors.right.isDown) {
		    this.run(1);
		} else {
		  	this.run(0); //  Stand still
		}
		if (this.cursors.up.isDown && this.sprite.body.touching.down) {
		   	this.jump();
		}
	},
	jump: function() { // Jump
		if (this.usingJoystick) { // Add aditional check for touching down if using joystick, as it's not checked
			if (this.sprite.body.touching.down) {
				this.sprite.body.velocity.y = -this.properties.velocity.yvel;
			}
			return
		}
		this.sprite.body.velocity.y = -this.properties.velocity.yvel;
	},
	run: function(factor) { // Run to the left or to the right, and with a speed depending on the factor passed
		if (factor === 0) {
			this.sprite.animations.stop();
			this.sprite.frame = 4;
		}
		if (factor > 0) { // Direction positive = run to the right
			this.sprite.body.velocity.x = this.properties.velocity.xvel * factor;
		    this.sprite.animations.play('right');
		} else if (factor < 0) { // Direction negative = run to the left
			this.sprite.body.velocity.x = this.properties.velocity.xvel * factor;
			this.sprite.animations.play('left');
		}
	},
	die: function(char, spikes) {
		this.game.state.start('dead');
		this.sprite.body.collideWorldBounds = false;
	}
};