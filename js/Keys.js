var Keys = function(game) {
	this.game = game;
	this.birdNum = 0;
	this.birds = null;
};

Keys.prototype = {
	preload: function () {
	},
	create: function () {
		this.birds = this.game.add.group();
		this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(function(){
	        this.birds[this.birdNum] = new Bird(this.game);
	        preload += this.birds[this.birdNum].preload();
	        create += this.birds[this.birdNum].create();
	        update += this.birds[this.birdNum].update();
	        this.birdNum ++;
	    }, this);
	    this.game.input.onDown.add(function() {
        	//character.shoot();
        	if (this.game.input.activePointer.msSinceLastClick < 200 && this.game.input.activePointer.msSinceLastClick > 35) {
				this.game.scale.startFullScreen();
			}
	    }, this);
	},
	update: function () {
    	
	}
};