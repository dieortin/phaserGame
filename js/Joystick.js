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
	this.joystickPointer = null; // Pointer being used to move the top joystick element
	this.basePos = null; // Position for the joystick base image
	this.topPos = null; // Position for the joystick top image
}

Joystick.prototype = {
	preload: function() {
		this.game.load.image('joystick_base', '/assets/current/joystick/joystick_base.png');
		this.game.load.image('joystick_top', '/assets/current/joystick/joystick_top.png');
	},
	create: function() {
		basePos = this.getPos(115, 115, this.joystickPos.x, this.joystickPos.y); // Calculate coordinates for base sprite and store them
		this.base = this.game.add.sprite(basePos.x, basePos.y, 'joystick_base'); // the coordinates given (115 is sprite height and width)
		topPos = this.getPos(75, 75, this.joystickPos.x, this.joystickPos.y); // Set joystick top position to the coordinates needed so that the center is in the original position coordinates
		this.top = this.game.add.sprite(topPos.x, topPos.y, 'joystick_top'); // The same as above but with a width of 75
		this.base.scale.setTo(this.scaleFactor, this.scaleFactor);
		this.top.scale.setTo(this.scaleFactor, this.scaleFactor);
		this.base.fixedToCamera = true; // Fix joystick elements to camera to prevent them from moving with the background
		this.top.fixedToCamera = true;
		this.top.inputEnabled = true; // Enable input for the movable part of the joystick
		this.top.events.onInputDown.add(this.joystickPressed, this); // Add event listener for taps in the joystick
	},
	update: function() {
		if (this.joystickPointer !== null && this.joystickPointer.isDown) { // If pointer used to move the joystick exists and is down
			if (Math.pow(this.joystickPointer.x - this.joystickPos.x, 2) + Math.pow(this.joystickPointer.y - this.joystickPos.y, 2) > this.joystickRadius) { // If the distance from the center of the joystick to the pointer is grater to the radius (Pythagoras theorem)
				var oppositeSide = this.joystickPointer.y - this.joystickPos.y; // The side opposite to the angle (as 'y' increases as it goes down the operation is reversed)
				var nextSide = this.joystickPointer.x - this.joystickPos.x; // The side that's next to the angle (and isn't the hypotenuse)
				var angle = Math.atan(oppositeSide / nextSide); // Get the angle from the center of the base to the pointer
				if ((nextSide < 0 && oppositeSide > 0) || (nextSide < 0 && oppositeSide < 0)) { // 2nd quadrant or 3rd quadrant
					angle += Math.PI; // Add 180 degrees to get the real angle
				} else if (nextSide > 0 && oppositeSide < 0) { // 4th quadrant
					angle += Math.PI * 2; // Add 360 degrees to get the real angle
				}

				/* Get position knowing that the x is the cosine of the angle multiplied by the radius 
				and the y the sine multiplied by the radius, adding the original joystick position to both*/
				topPos = this.getPos(75, 75, Math.cos(angle) * this.joystickRadius + this.joystickPos.x, Math.sin(angle) * this.joystickRadius + this.joystickPos.y); 
				this.top.cameraOffset.x = topPos.x; // Set the obtained coordinates as absolute position
				this.top.cameraOffset.y = topPos.y;
			} else {
				topPos = this.getPos(75, 75, this.joystickPointer.x, this.joystickPointer.y); // Get the coordinates to move the joystick top center to the pointer position
				this.top.cameraOffset.x = topPos.x; // Set the obtained coordinates as absolute position
				this.top.cameraOffset.y = topPos.y;
			}
		} else {
			topPos = this.getPos(75, 75, this.joystickPos.x, this.joystickPos.y); // Get coordinates to move the top of the joystick to its original position
			this.top.cameraOffset.x = topPos.x; // Set the obtained coordinates as absolute position
			this.top.cameraOffset.y = topPos.y;
		}
	},
	joystickPressed: function (sprite, pointer) { // Sets the pointer that touched the joystick top as the pointer that will control it
		this.joystickPointer = pointer;
	},
	getPos: function (width, height, x, y) { // Gets x and y position for the sprites based on the position their center must have and their width
		var resultX = x - (width * this.scaleFactor / 2);
		var resultY = y - (height * this.scaleFactor / 2);
		var result = {
			x: resultX,
			y: resultY
		};
		return result
	}
}