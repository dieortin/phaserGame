var Dead = function(game) {
	this.game = game;
	this.deadText = null;
};

Dead.prototype = {
  create:  function() {
   this.deadText = this.game.add.text(100, this.game.world.height / 2, "You are dead", { font: "65px Arial", fill: "#ff0044", align: "center" });
   this.game.input.onDown.add(function() {
   		this.game.state.start("level1", false);
   }, this);
  }
}