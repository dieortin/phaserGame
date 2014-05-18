var Level1 = function(game) {
	this.game = game;
	this.level = null;
	this.character = null;
	this.bird = null;
	this.keys = null;
	this.joystick = null;
}

Level1.prototype = {
	preload: function() {
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
	    this.joystick.create();
	    //game.input.onDown.add(goFull, this);
	},
	update: function() {
    	this.joystick.update();
    	this.character.update();
    	this.bird.update();
	}
}