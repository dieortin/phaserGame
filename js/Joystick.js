var Joystick = function(game, xpos, ypos) {
	this.game = game;
	this.base = null; // Base of the joystick
	this.top = null; // Movable part of the joystick
	this.joystickPos = { // Position for the center of the joystick sprites
		x: xpos,
		y: ypos
	};
	this.scaleFactor = 0.75; // Factor to scale down the joystick sprites
	this.joystickRadius = (115 * this.scaleFactor / 2) / 1.4 // Calculates the radius - half of the scaled diameter (halved again to make it smaller)
	this.topPointer = null; // Pointer being used to move the top joystick element
	this.basePos = null;
	this.topPos = null;
}

Joystick.prototype = {
	preload: function() {
		this.game.load.image('joystick_base', '/assets/current/joystick/joystick_base.png');
		this.game.load.image('joystick_top', '/assets/current/joystick/joystick_top.png');
	},
	create: function() {
		basePos = this.getPos(115, 115, this.joystickPos.x, this.joystickPos.y); // Calculate coordinates for base sprite and store them
		this.base = this.game.add.sprite(basePos.x, basePos.y, 'joystick_base'); // the coordinates given (115 is sprite height and width)
		topPos = this.getPos(75, 75, this.joystickPos.x, this.joystickPos.y);
		this.top = this.game.add.sprite(topPos.x, topPos.y, 'joystick_top'); // The same as above but with a width of 75
		this.base.scale.setTo(this.scaleFactor, this.scaleFactor);
		this.top.scale.setTo(this.scaleFactor, this.scaleFactor);
		this.base.fixedToCamera = true; // Fix joystick elements to camera to prevent them from moving with the background
		this.top.fixedToCamera = true;
		this.top.inputEnabled = true; // Enable input for the movable part of the joystick
		this.top.events.onInputDown.add(this.joystickPressed, this); // Add event listener for taps in the joystick
	},
	update: function() {
		if (this.topPointer !== null && this.topPointer.isDown) {
			if (Math.pow(this.topPointer.x - this.joystickPos.x, 2) + Math.pow(this.topPointer.y - this.joystickPos.y, 2) > this.joystickRadius) {
				//this.game.physics.arcade.angleToPointer(sprite)
				console.log("BEGIN UPDATE---------------------------");
				console.log("joystickPos.x = " + this.joystickPos.x);
				console.log("joystickPos.y = " + this.joystickPos.y);


				console.log("tg: " + (this.topPointer.y - this.joystickPos.y) + " / " + (this.topPointer.x - this.joystickPos.x) + " = " + ((this.topPointer.y - this.joystickPos.y) / (this.topPointer.x - this.joystickPos.x)));
				
				var oppositeSide = this.topPointer.y - this.joystickPos.y;
				var nextSide = this.topPointer.x - this.joystickPos.x;
				var angle = Math.atan(oppositeSide / nextSide); // Get the angle fromthe center of the base to the pointer
				if (nextSide < 0 && oppositeSide > 0) { // 2nd quadrant
					angle += Math.PI;
				} else if (nextSide < 0 && oppositeSide < 0) { // 3rd quadrant
					angle += Math.PI;
				} else if (nextSide > 0 && oppositeSide < 0) { //4th quadrant
					angle += Math.PI * 2;
				}
				console.log(angle * 180 / Math.PI + " degrees");
				console.log("x to get: " + Math.cos(angle) * this.joystickRadius);
				console.log("y to get: " + Math.sin(angle) * this.joystickRadius);
				topPos = this.getPos(75, 75, Math.cos(angle) * this.joystickRadius + this.joystickPos.x, Math.sin(angle) * this.joystickRadius + this.joystickPos.y);
				console.log(topPos);
				this.top.cameraOffset.x = topPos.x;
				this.top.cameraOffset.y = topPos.y;
			} else {
				topPos = this.getPos(75, 75, this.topPointer.x, this.topPointer.y);
				this.top.cameraOffset.x = topPos.x;
				this.top.cameraOffset.y = topPos.y;
			}
		} else {
			topPos = this.getPos(75, 75, this.joystickPos.x, this.joystickPos.y);
			this.top.cameraOffset.x = topPos.x;
			this.top.cameraOffset.y = topPos.y;
		}
	},
	joystickPressed: function (sprite, pointer) {
		this.topPointer = pointer;
	},
	getPos: function (width, height, x, y) { // Gets x and y position for the sprites based on the position their center must have
		var resultX = x - (width * this.scaleFactor / 2);
		var resultY = y - (height * this.scaleFactor / 2);
		var result = {
			x: resultX,
			y: resultY
		};
		return result
	}
}