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
    },
    audio: {
        disableWebAudio: true
    }
}
const bgStarcount = 100; // Sier hvor mange sjener er i bakgrunnen. Tilpass antallet hvis du føler for det
var stars;
var otherStars;

var shootSound;
var bgMusic;

var timeEvent;
var game = new Phaser.Game(config);
var countStars = 0;

var gameover = false;

var elimination = 0;

var delay = 15000;

function preload() {
    this.load.image('background','./assets/bg_placeholder.png');
    this.load.spritesheet("star", "./assets/obj_stars.png", {frameWidth: 66, frameHeight: 65})
    this.load.spritesheet("bgStars", "./assets/bg_stars.png", {frameWidth: 6, frameHeight: 6});
    this.load.audio("shoot", "./assets/blast.mp3");
    this.load.audio("bgMusic", "./assets/bg_music.mp3");
}

function create() {
    //setting the background of the star shooting
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    stars = this.physics.add.staticGroup();    //Gruppe som er de små stjernene
    otherStars = [];
    //setting up backfround stars
    backgroundStars(this);


    text = this.add.text(32,32);
    score = this.add.text(32, 45);
    amount = this.add.text(32, 58);
    gameoverTxt = this.add.text(150,250);

    gameoverTxt.setFontSize(100);

    this.physics.world.setBounds(0, 0, 800, 600);

    // The game need to put out a new star everytime is 0 stars left.
    // we need to know if it is any star on the board and how many it is

    addStar(this);
    countStars++;
    timeEvent = this.time.addEvent({delay: delay, callback: onEvent, callbackScope: this});

    shootSound = this.sound.add("shoot");
    bgMusic = this.sound.add("bgMusic");
    bgMusic.loop = true;
    bgMusic.play();

    this.input.on("pointerdown", function(pointer){
        shootSound.play();
    });

}
function update(time, delta) {
    //looping through all in the group
    if(!gameover) {
    Phaser.Actions.Call(stars.getChildren(), child =>{
            child.anims.play("star", true);
         });

    var tid = ((delay/1000) - (timeEvent.getProgress()*delay/1000))
    text.setText('Timer: ' + tid);
    score.setText('Eliminations:' + elimination);
    amount.setText('Stars on board: ' + countStars);
    if (countStars == 0) {
        addStar(this);
        countStars++;
        if(delay > 3000) {
            delay = delay - 1000;
        }
        timeEvent.reset({delay: delay, callback: onEvent, callbackScope: this});
    } else if (countStars > 10) {
        timeEvent.destroy();
        gameoverTxt.setText("GAME OVER");
        gameover = true; 
        for(var i = 0; i < otherStars.length; i++) {
            otherStars[i].setVisible(false);
            otherStars[i].off('pointerdown');
        }    
    }

    if(timeEvent.getProgress() == 1) {
        if(delay > 3000) {
            delay = delay - 1000;
        }
        if(!gameover) {
        timeEvent= this.time.addEvent({delay: delay, callback: onEvent, callbackScope: this});
        }
    }

}

}

function onEvent() {
    addStar(this);
    countStars++;
    console.log(timeEvent.repeatCount);
}

var velocityX = 200;
var velocityY = 200;

function addStar(phy) {
        if(delay <= 3000) {
            velocityX += 20;
            velocityY += 20;
        }
        console.log("x:" + velocityX + " y:"+ velocityY);
    var star = phy.physics.add.sprite(Phaser.Math.Between(50, 750), 0, 'star');
        star.setVelocity(velocityX,velocityY);
        star.setBounce(1).setCollideWorldBounds(true);
        star.anims.play("bigStar", true)
        otherStars.push(star);

        if(Math.random() > 0.5) {
            star.body.velocity.x *= -1;
        } else {
            star.body.velocity.y *= -1;
        }

        star.setInteractive();

        star.on('pointerdown', function (pointer) {
            countStars--;
            elimination++;
            this.off(this, 'pointerdown');
            this.input.enabled = false;
            this.setVisible(false);
          //  otherStars.splice(otherStars.indexOf(this));
        });
}

function backgroundStars(context) {
     //Tilfeldig posisjoner av blinkende stjerner
    let positions = [];    //Array som holder styr på hvilken plasser en har bestemt
    let maxX = 780;        //Max og Min posisjoner for x og y
    let minX = 20;
    let minY = 20;
    let maxY = 580;
    
    //Genrerer posisjoner
    for(let i = 0; i < bgStarcount; i++){
       let posX = randomPos(minX, maxX);
       let posY = randomPos(minY, maxY);
       let pos = {x: posX, y: posY};
       if(checkPos(pos, positions)){
           positions.push(pos);
       }
       else{
           while(!checkPos(pos, positions)){
                pos.x = randomPos(minX, maxX);
                pos.y = randomPos(minY, maxY);
           }
           positions.push(pos);
       }
    }
    
    //Legger stjerner til i skjermen
    for(let i = 0; i < positions.length; i++){
       stars.create(positions[i].x, positions[i].y, "bgStars");
    }
    
    //Lager blinke animasjon
    context.anims.create({
       key: "star",
       frames: context.anims.generateFrameNumbers("bgStars", {start: 0, end: 5}),
       frameRate: 5,
       repeat: -1
    });

    context.anims.create({
           key: "bigStar",
           frames: context.anims.generateFrameNumbers("star", {start: 0, end: 2}),
           frameRate: 15,
           repeat: -1
         });

}

    function randomPos(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max-min+1))+min;
     }
     
     function checkPos(pos, list){
        let ok = true;
        for(let i = 0; i < list.length; i++){
            let xCheck = ((pos.x > list[i].x-3) && (pos.x < list[i].x+3));
            let yCheck = ((pos.y < list[i].y-3) && (pos.y > list[i].y+3));
            ok = (!xCheck || !yCheck);
        }
        return ok;
     }
