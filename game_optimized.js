

var game = new Phaser.Game(360, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var character = null;
var level = null
var bird = null;

function preload() {
    level = new Level(game);
    level.preload();
    character = new Character(game);
    character.preload();
    bird = new Bird(game);
    bird.preload();

    //game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
}


function create() {
    level.create();
    bird.create();
    character.create();
}

function update() {
    character.update();
    bird.update();
}