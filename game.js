

var game = new Phaser.Game(360, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/scroller/grassV2_0.png');
    game.load.image('platform', 'assets/platform2.png');
    game.load.image('spikes', 'assets/scroller/trapsnspikes.png');
    game.load.image('house', 'assets/scroller/HouseHayRoof.png')
    game.load.spritesheet('dude', 'assets/dude.png', 27, 42);
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
    game.load.spritesheet('bird', 'assets/bird.png', 240, 314);

}

var character;
var bird;
var house;
var cursors;
var floor;
var spikes;
var spikesScaleFactor = 0.2;
var houseScaleFactor = 0.5;
var dead = false;

function create() {
    /*------------------BASIC WORLD APPEARANCE & SETTINGS-------------------*/
    game.world.setBounds(0, 0, 3000, 500); //Define the world size
    game.physics.startSystem(Phaser.Physics.ARCADE); //Start arcade physics
    sky = game.add.sprite(0, 0, 'sky').scale.setTo(game.world.width / 800, 1); //Horizontally scale the sky to fill all the world
    house = game.add.sprite(15, game.world.height - ((394 * houseScaleFactor) + 50 - 15), 'house');
    house.scale.setTo(houseScaleFactor, houseScaleFactor);
    bird = game.add.sprite(180, game.world.height / 2, 'bird'); //Add background bird sprite & animations
    bird.scale.setTo(0.2, 0.2);
    bird.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 50, true);
    game.physics.arcade.enable(bird);
    bird.body.velocity.x = -75;
    bird.checkWorldBounds = true; //Check if it's out of the world
    bird.anchor.setTo(.5, 1); //To flip around its middle
    bird.events.onOutOfBounds.add(horizFlip, this);

    /*--------------------------FLOOR------------------------------------*/
    floor = game.add.tileSprite(0, game.world.height - 50, game.world.width, 50, "ground"); //Fill ground with sprite
    game.physics.enable(floor, Phaser.Physics.ARCADE); //Enable physics for the floor
    floor.body.setSize(game.world.width, 50, 0, 25); //Set collision zone
    floor.body.immovable = true; //Make the floor immovable

    /*--------------------------SPIKES------------------------------------*/
    spikes = game.add.group();
    spikes.enableBody = true;
    for (var i = 0; i < game.world.width / 600 - 1; i++) { //Number of sections minus one to have a "safe" start section
        var x = Math.random() * 600 + 600 * i + 600; //Generate random position inside a 600px section
        var spike = spikes.create(x, game.world.height - (50 + (167 * spikesScaleFactor) - 25), "spikes"); // 'y' position is the world height minus the floor and the spikes height (and plus the grass height)
        spike.body.immovable = true;
        spike.scale.setTo(spikesScaleFactor, spikesScaleFactor); //Scale the spikes to make them smaller
    }

    /*--------------------------CHARACTER------------------------------------*/
    character = game.add.sprite(100, game.world.height - 150, 'dude'); //Add character sprite
    game.physics.arcade.enable(character); //Enable physics for the character
    character.body.collideWorldBounds = true; //Prevent the character from going out of the world's boundaries
    character.animations.add('left', [0, 1, 2, 3], 10, true);
    character.animations.add('right', [5, 6, 7, 8], 10, true);
    character.body.gravity.y = 900; //Set gravity for the player


    /*--------------------------PLATFORMS------------------------------------*/
    /*platforms = game.add.group();
    platforms.enableBody = true;
    var ledge = platforms.create(100, 400, 'platform');
    ledge.scale.setTo(0.5, 0.5);
    ledge.body.immovable = true;*/

    
    game.camera.follow(character); //Make the camera follow the character
    cursors = game.input.keyboard.createCursorKeys(); //Get cursor keys for control
}

function update() {
    game.physics.arcade.collide(character, spikes);
    game.physics.arcade.collide(character, floor);

    character.body.velocity.x = 0;
    bird.animations.play('fly');
    if (bird.y > 400) { //If bird exiting by the bottom
        bird.body.velocity.y = Math.random() * -10;
    } else if (bird.y < 0) { //If bird exiting by the top
        bird.body.velocity.y = Math.random() * 10;
    }
    if (!dead) {
        if (cursors.left.isDown) {
        //  Move to the left
        character.body.velocity.x = -150;

        character.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            character.body.velocity.x = 150;

            character.animations.play('right');
        }
        else {
            //  Stand still
            character.animations.stop();
            character.frame = 4;
        } if (cursors.up.isDown && character.body.touching.down) {
            character.body.velocity.y = -400;
        }
    } else {
        character.frame = 4;
        character.body.velocity.y = 400;
    }
}
var die = function () {
    alert("dead!");
    dead = true;
}
var horizFlip = function () {
    bird.scale.x = bird.scale.x * -1;
    bird.body.velocity.x = bird.body.velocity.x * -1;
    if (Math.random() > .5) {
        bird.body.velocity.y = Math.random() * 10;
    } else {
        bird.body.velocity.y = Math.random() * -10;
    }
}