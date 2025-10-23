/**
 * Bog Eater
 * Chloé Guérin
 * 
 * A game of catching flies with your frog-tongue
 *
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 *
 * Made with p5
 * https://p5js.org/
 */

"use strict";

/**
 * all my let (hopefully)
 */
//let for img and sounds
// let mySound;
let titleImg
let grassImg

//4 options, start screen, playing, game over & winner
let gameState = "start";
//this one is for the flies
let onMoveForward = true;
//let for score
let score = 2;

/**
 * the const section 
 */
// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly, Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};


//addind sounds & images
function preload() {

    // mySound = loadSound('./assets/sounds/nature-sounds.mp3')
    titleImg = loadImage('./assets/images/title-frog.png')
    grassImg = loadImage('./assets/images/quenouille-frog.png')
}


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFlyForward();
}

/**
 * funtion draw and my gameState
 */
function draw() {
    // yeah i'll be back for you
    background("#87ceeb");

    if (gameState === "start") {
        startscreen();
    }

    else if (gameState === "play") {
        moveFly()
        drawFly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkTongueFlyOverlap();
        drawElements();
        checkScore();
    }

    else if (gameState === "gameOver") {
        gameOver();
    }

    else if (gameState === "winning") {
        winning();
    }

}

function checkScore() {
    if (score === 4) {
        gameState = "winning"
    }
}



// //sound, just a placeholder for now
// function mousePressed() {
//     if (mySound.isPlaying()) {
//         mySound.stop()
//     } else {
//         mySound.loop()
//     }
// }


/**
 * big fly section
 */
//to make the flies move either from left to right or right to left
function moveFly() {
    if (onMoveForward) {
        // resetFlyForward();
        moveFlyForward();
    } else {
        // resetFlyBackward();
        moveFlyBackward();
    }
}

//Moves the fly according to its speed
//Resets the fly if it gets all the way to the right
function moveFlyForward() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        onMoveForward = random([true, false]);
        resetFly();
    }
}

//same as the other one but resets the fly if it gets all the way to the left
function moveFlyBackward() {
    // Move the fly
    fly.x -= fly.speed;
    // Handle the fly going off the canvas
    if (fly.x < 0) {
        onMoveForward = random([true, false]);
        resetFly();
    }
}

//makes sure the reset is random
function resetFly() {
    if (onMoveForward) {
        resetFlyForward()
    } else {
        resetFlyBackward();
    }
}

// Resets the fly to the left with a random y
function resetFlyForward() {
    fly.x = 0;
    fly.y = random(0, 300);
}
// Resets the fly to the right with a random y
function resetFlyBackward() {
    fly.x = 640;
    fly.y = random(0, 300);
}

//Draws the fly as a black circle and wings!
function drawFly() {
    push();
    noStroke();
    fill("#ffffffff")
    ellipse(fly.x - 3, fly.y - 5, fly.size / 2);
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    fill("#ffffffff")
    ellipse(fly.x + 1, fly.y - 6, fly.size / 2);
    pop();
}


/**
 * frog section
 */
//Moves the frog to the mouse position on x
function moveFrog() {
    frog.body.x = mouseX;
}

// Handles moving the tongue based on its state
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

//draw frog, displays the tongue (tip and line connection) and the frog (body)
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#e42243ff");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#e42243ff");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#1b5d2bff");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    //eyes try 2
    push()
    fill("#ffffffff")
    noStroke()
    ellipse(frog.body.x - 45, frog.body.y - 65, frog.body.size / 4)
    pop()

    push()
    fill("#ffffffff")
    noStroke()
    ellipse(frog.body.x + 45, frog.body.y - 65, frog.body.size / 4)
    pop()

    //pupils
    push()
    fill("#000000ff")
    noStroke()
    ellipse(frog.body.x - 45, frog.body.y - 65, frog.body.size / 6)
    pop()

    push()
    fill("#000000ff")
    noStroke()
    ellipse(frog.body.x + 45, frog.body.y - 65, frog.body.size / 6)
    pop()

}

//Handles the tongue overlapping the fly
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        score = score + 1
        //random reset when fly is eaten 
        onMoveForward = random([true, false]);
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

//Launch the tongue on click (if it's not launched yet)
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}


/**
 * background for the playing part, just to add something
 */
function drawElements() {
    //quenouille
    line(50, 380, 50, 500)
    strokeWeight(5)
    stroke("#14381fff")

    push()
    noStroke()
    fill("#6c4720ff")
    rect(44, 375, 12, 25, 60)
    pop()

    line(70, 370, 70, 500)
    strokeWeight(5)
    stroke("#14381fff")

    push()
    noStroke()
    fill("#6c4720ff")
    rect(64, 365, 12, 25, 60)
    pop()

    line(600, 375, 600, 500)
    strokeWeight(5)
    stroke("#14381fff")

    push()
    noStroke()
    fill("#6c4720ff")
    rect(594, 370, 12, 25, 60)
    pop()

    line(50, 380, 50, 500)
    strokeWeight(5)
    stroke("#14381fff")

    push()
    noStroke()
    fill("#6c4720ff")
    rect(44, 375, 12, 25, 60)
    pop()
}


/**
 * start of the game part!
 */
function startscreen() {
    //how it looks
    background('#afed96ff')

    imageMode(CENTER)
    image(titleImg, 320, 170, 380, 180)

    imageMode(CENTER)
    image(grassImg, 320, 170, 370, 170)

    push()
    rectMode(CENTER)
    stroke('#185511ff')
    strokeWeight(10)
    noFill()
    rect(320, 170, 400, 200, 50)
    pop()

    push()
    rectMode(CENTER)
    stroke('#28781fff')
    strokeWeight(10)
    noFill()
    rect(320, 170, 381, 180, 40)
    pop()

    //trying some text, what is going on with the font????? ok i'm good now
    textAlign(CENTER)
    textFont("Courier /new")
    textSize(18)
    fill('#28781fff')
    stroke('#28781fff')
    strokeWeight(1);
    text('PRESS SPACEBAR TO PLAY', 320, 220)

    textAlign(CENTER)
    textFont("Courier New")
    textSize(16)
    fill('#28781fff')
    stroke('#28781fff')
    strokeWeight(1);
    text('You are hungry...', 320, 310)
    text('Click and move the mouse to eat flies', 320, 340)
    text('The Bog is also hungry...', 320, 380)
    text('Let too many pass and Die.', 320, 410)
}

//makes the spacebar start the game
function keyTyped() {
    // Check for the "c" character using key.
    if (keyCode === 32) {
        gameState = "play"
    }
}


/**
 * game over part!
 */
function gameOver() {
    background('#185511ff')

    imageMode(CENTER)
    image(grassImg, 320, 170, 370, 170)

    push()
    rectMode(CENTER)
    stroke('#afed96ff')
    strokeWeight(10)
    noFill()
    rect(320, 170, 400, 200, 50)
    pop()

    push()
    rectMode(CENTER)
    stroke('#D7F1CD')
    strokeWeight(10)
    noFill()
    rect(320, 170, 381, 180, 40)
    pop()

    textAlign(CENTER)
    textFont("Courier New")
    textSize(16)
    fill('#D7F1CD')
    stroke('#D7F1CD')
    strokeWeight(1);
    text('The Bog ate you', 320, 340)
}



/**
 * winner part!
 */
function winning() {
    background('#D7F1CD')

    imageMode(CENTER)
    image(grassImg, 320, 170, 370, 170)

    push()
    rectMode(CENTER)
    stroke('#185511ff')
    strokeWeight(10)
    noFill()
    rect(320, 170, 400, 200, 50)
    pop()

    push()
    rectMode(CENTER)
    stroke('#28781fff')
    strokeWeight(10)
    noFill()
    rect(320, 170, 381, 180, 40)
    pop()

    textAlign(CENTER)
    textFont("Courier New")
    textSize(16)
    fill('#185511ff')
    stroke('#185511ff')
    strokeWeight(1);
    text('You ate the Bog!', 320, 340)
}