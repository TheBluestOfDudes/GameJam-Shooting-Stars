var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload, 
        create: create,
        update: update
    }
}
var timeEvent;
var game = new Phaser.Game(config);
var countStars = 0;

function preload() {
    this.load.image('background','/assets/bg_placeholder.png');
    this.load.image('star', '/assets/star_placeholder.png');
}

function create() {
    //setting the background of the star shooting
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    text = this.add.text(32,32);

    this.physics.world.setBounds(0, 0, 800, 600);

    // The game need to put out a new star everytime is 0 stars left.
    // we need to know if it is any star on the board and how many it is


    timeEvent = this.time.addEvent({delay: 10000, callback: onEvent, callbackScope: this, loop: true});

}
function update() {
    text.setText('Timer: ' + timeEvent.getProgress().toString()*10);

    if (countStars == 0 && timeEvent.getRepeatCount() > 1) {
        
    }
}
function clickHandler (star) {
    star.off('clicked', clickHandler);
    star.input.enabled = false;
    star.setVisible(false);

    console.log("click")
}

function onEvent() {
    addStar(this);
    countStars++;
    console.log(timeEvent.repeatCount);
}

function addStar(phy) {
    var star = phy.physics.add.sprite(Phaser.Math.Between(50, 750), 0, 'star');
    console.log(timeEvent.getProgress().toString()*10);
        star.setVelocity(Phaser.Math.Between(200, 400), Phaser. Math.Between(200,400));
        star.setBounce(1).setCollideWorldBounds(true);

        if(Math.random() > 0.5) {
            star.body.velocity.x *= -1;
        } else {
            star.body.velocity.y *= -1;
        }

        star.setInteractive();

        star.on('pointerdown', function (pointer) {
            this.off(this, 'pointerdown');
            this.input.enabled = false;
            this.setVisible(false);
        });
}
