Level = function(game) {

	this.game = game;
	this.sky = null;
	this.house = null;
	this.floor = null;
	this.houseScaleFactor = 0.5;
};

Level.prototype = {

	preload: function() {
		this.game.load.image('sky', 'assets/current/background/sky.png');
		this.game.load.image('ground', 'assets/current/background/grassV2_0.png');
		this.game.load.image('house', 'assets/current/background/HouseHayRoof.png')
	},

	create: function() {
		this.game.world.setBounds(0, 0, 3000, dimensions.height); //Define the world size
	    this.game.physics.startSystem(Phaser.Physics.ARCADE); //Start arcade physics
	    this.sky = this.game.add.sprite(0, 0, 'sky').scale.setTo(this.game.world.width / 800, 1); //Horizontally scale the sky to fill all the world
	    this.house = this.game.add.sprite(15, this.game.world.height - ((394 * this.houseScaleFactor) + 50 - 15), 'house');
	    this.house.scale.setTo(this.houseScaleFactor, this.houseScaleFactor);
	    /*--------------------------FLOOR------------------------------------*/
	    this.floor = this.game.add.tileSprite(0, this.game.world.height - 50, this.game.world.width, 50, "ground"); //Fill ground with sprite
	    this.game.physics.enable(this.floor, Phaser.Physics.ARCADE); //Enable physics for the floor
	    this.floor.body.setSize(this.game.world.width, 50, 0, 25); //Set collision zone
	    this.floor.body.immovable = true; //Make the floor immovable
	}

};