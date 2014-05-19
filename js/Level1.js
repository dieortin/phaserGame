var Level1 = function(game) {
	this.game = game;
	this.level = null;
	this.character = null;
	this.bird = null;
	this.keys = null;
	this.joystick = null;
	this.spikes = null;
	this.spikesScaleFactor = 0.2;
	this.spikesMinDistance = 100; // Minimum distance in pixels that a spikes sprite can be from another spikes sprite
	this.spikesPos = [3, 5, 7, 8.5, 10, 12, 16, 19.5, 22, 26]; // Sets the x position for the different spikes, used in the spikes creation loop
}

Level1.prototype = {
	preload: function() {
		this.game.load.image('spikes', 'assets/current/background/trapsnspikes.png');

	    this.level = new Level(this.game);
	    this.character = new Character(this.game, 100, dimensions.height - 100, 150, 500);
	    this.bird = new Bird(this.game);
	    this.keys = new Keys(this.game);
	    this.joystick = new Joystick(this.game, 60, dimensions.height - 60, this.character);
	    this.level.preload();
	    this.character.preload();
	    this.bird.preload();
	    this.joystick.preload();

	    this.game.scale.refresh();
		this.game.scale.setShowAll();
    //game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
	},
	create: function() {
	    this.keys.create();
	    this.level.create();
	    this.character.create();
	    this.bird.create();

	    /* Spikes */
	    this.spikes = this.game.add.group();
	    this.spikes.enableBody = true;
	    for (var i = 0; i < this.spikesPos.length; i++) { // Iterate over the position list and create spikes in each position
	        var spike = this.spikes.create(this.spikesPos[i] * this.spikesMinDistance, this.game.world.height - (50 + (167 * this.spikesScaleFactor) - 25), "spikes"); // 'y' position is the world height minus the floor and the spikes height (and plus the grass height)
	        spike.body.immovable = true;
	        spike.scale.setTo(this.spikesScaleFactor, this.spikesScaleFactor); //Scale the spikes to make them smaller
	    }
	    this.joystick.create();
	    //game.input.onDown.add(goFull, this);
	},
	update: function() {
    	this.joystick.update();
    	this.character.update();
    	this.bird.update();
	}
}