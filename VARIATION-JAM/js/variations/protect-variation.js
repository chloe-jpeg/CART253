/**
 * third and last game, time to see how brave you are. wolves are coming from all sides, use the mouse to push them away. you only need to last through the night without losing your whole flock. 
 */

"use strict";
/**
 * all my let
 */
//start state of the game
let protectGameState = "instruction"
//setup for image 
let pbgImg, flockImg;
//info for random wolves
let positionStartWolf = Math.random();
//base info fro score and timer
let protectScore = 10;
let pTimerStarted = false;
let pTimeLeft = 30;
let pTimer;

/**
 * all my const
 */
//info for the mousse circle
const pUser = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 15,
    fill: "#000000"
};
//information under the flock of sheep
const pile = {
    x: 450,
    y: 350,
    size: 100,
    fill: 'rgba(255, 255, 255, 0)'
};
// wolf tableau
const wolves = [];

// const wolf = {
//     x: 300,
//     y: 300,
//     size: 60,
//     fill: "#202232ff"
// };

/**
 * preload for my images
 */
function protectPreload() {
    pbgImg = loadImage('./assets/images/3_newbg.png')
    flockImg = loadImage('./assets/images/3_flock.png');
}

/**
 * setup with timer reload and functions call
 */
function protectSetup() {
    protectGameState = 'instruction'
    pTimerStarted = false;
    protectScore = 10;
    pTimeLeft = 30;
    prepareWolves()
    protectPreload()
}

/**
 * all my game state, most of where the functions are called, bg image
 */
function protectDraw() {
    if (protectGameState === "instruction") {
        protectInstructionScreen();
    }

    else if (protectGameState === "play") {
        imageMode(CENTER, CENTER)
        image(pbgImg, 450, 350, 900, 700)
        image(flockImg, 450, 350, 178, 153)


        drawProtectpUser()
        moveProtectpUser()
        drawPile()
        drawWolf()
        moveWolf()
        protectScoreDraw();
        protectTimer();
    }

    else if (protectGameState === "gameOver") {
        protectGameover();
    }

    else if (protectGameState === "winning") {
        protectWin();
    }

}

/**
 * key press!
 */
function protectKeyPressed(event) {
    //to go back to the menu (is not working well yet??)
    if (event.keyCode === 27) {
        state = "menu";
    }
    //to go from instruction to play
    else if (event.keyCode === 32) {
        protectGameState = "play";
    }
}

/**
 * all the score functions
 */
//check the score to know if its a winner or loser 
function protectCheckScore() {
    if (protectScore >= 1) {
        protectGameState = "winning"
    } else if (feedScore <= 0) {
        protectGameState = "gameOver"
    }
}
//make the score visible on the edge of the screen
function protectScoreDraw() {
    fill('#2e3766ff');
    textAlign(RIGHT, TOP);
    textFont("Courier New")
    textSize(20);
    stroke('#2e3766ff')
    strokeWeight(1);
    text(protectScore, 850, 30);
}

/**
 * timer function, essential to your survival 
 */
function protectTimer() {
    //make the time visible on the edge of the screen
    push();
    fill('#2e3766ff');
    textAlign(LEFT, TOP);
    textFont("Courier New")
    textSize(20);
    stroke('#2e3766ff')
    strokeWeight(1);
    text(pTimeLeft, 30, 30);
    pop();
    //make the time tick down and check with the score to know the gamestate 
    if (!pTimerStarted) {
        pTimerStarted = true;

        pTimer = setInterval(() => {
            pTimeLeft--;

            if (pTimeLeft <= 0) {
                clearInterval(pTimer);
                protectCheckScore();


            }
        }, 1000);
    }
}

/**
 * all the user functions
 */
//draw the black mousse circle
function drawProtectpUser() {
    push();
    noStroke();
    fill(pUser.fill);
    ellipse(pUser.x, pUser.y, pUser.size);
    pop();
};
//connects to the mousse
function moveProtectpUser() {
    pUser.x = mouseX;
    pUser.y = mouseY;
}

//under the flock of sheep, to protect
function drawPile() {
    push();
    noStroke();
    fill(pile.fill);
    ellipse(pile.x, pile.y, pile.size);
    pop();
}

/**
 * all the wolf functions
 */

//create wolf and connects to the score
function drawWolf() {
    for (let i = 0; i < wolves.length; i++) {
        let wolf = wolves[i];

        if (wolf.x < 900 && wolf.x > 0 && wolf.y < 700 && wolf.y > 0) {
            push();
            noStroke();
            fill(wolf.fill);
            ellipse(wolf.x, wolf.y, wolf.size);
            pop();
            if (wolf.x < pile.x) {
                wolf.x += 1
            }
            if (wolf.x > pile.x)
                wolf.x -= 1
            if (wolf.y < pile.y) {
                wolf.y += 1
            }
            if (wolf.y > pile.y) {
                wolf.y -= 1
            }
            let d = dist(wolf.x, wolf.y, pile.x, pile.y);
            if (d < (wolf.size / 2 + pile.size / 2)) {
                wolf.pointgagne = false
                if (wolf.pointperdu === false) {
                    protectScore = protectScore - 1
                    wolf.pointperdu = true
                }
            }

            else {
                wolf.pointperdu = false
            }
        }
    };
}


// Calcuate distance between mouse and wolf, make sure they move
function moveWolf() {
    for (let i = 0; i < wolves.length; i++) {
        let wolf = wolves[i];
        const d = dist(pUser.x, pUser.y, wolf.x, wolf.y);
        if (d < pUser.size * 2 + wolf.size) {
            if (wolf.x > pUser.x) {
                wolf.x += 3
            }
            if (wolf.x < pUser.x)
                wolf.x -= 3
            if (wolf.y > pUser.y) {
                wolf.y += 3
            }
            if (wolf.y < pUser.y) {
                wolf.y -= 3
            }
        }
    }
};

//make the wolves appear randomly and base of the point system 
function prepareWolves() {
    for (let i = 0; i < 3; i++) {
        let wolf = {
            x: Math.floor(Math.random() * 900),
            y: Math.floor(Math.random() * 700),
            size: 60,
            fill: "#202232ff",
            pointgagne: false,
            pointperdu: false
        };
        wolves.push(wolf);
    }

}

/**
 * Other gameStates, colours and text
 */

//Instruction screen, draw and text 
function protectInstructionScreen() {
    background('#eae6cfff')

    push()
    rectMode(CENTER)
    noStroke()
    fill('#2e3766ff')
    rect(450, 490, 380, 80, 50)
    pop()

    push()
    rectMode(CENTER)
    stroke('#2e3766ff')
    strokeWeight(30)
    noFill()
    rect(450, 350, 900, 700, 30)
    pop()


    textAlign(CENTER)
    textFont("Courier New")
    textSize(20)
    fill('#2e3766ff')
    // noStroke()
    textWrap(WORD)
    stroke('#2e3766ff')
    strokeWeight(1);
    text('Winter is coming… or only night, and you can see eyes glowing in the darkness… they look starved and your flock looks sooo appetizing after all the food you gave them… so soft and squishy, easy to drag in the dark never to be seen again. But you are not soft and squishy, there is a fierce desire to protect in you! Fear not, you only need to push back the assailants long enough for day to come. ', 200, 140, 500)

    // textAlign(CENTER)
    textFont("Courier /new")
    textSize(25)
    fill('#eae6cfff')
    noStroke()
    // stroke('#4c8bc7ff')
    // strokeWeight(1);
    text('PRESS SPACEBAR TO PLAY', 450, 500)
}

//game over screen, draw and text 
function protectGameover() {
    background('#eae6cfff')

    push()
    rectMode(CENTER)
    noStroke()
    fill('#2e3766ff')
    rect(450, 490, 380, 80, 50)
    pop()

    push()
    rectMode(CENTER)
    stroke('#2e3766ff')
    strokeWeight(30)
    noFill()
    rect(450, 350, 900, 700, 30)
    pop()


    textAlign(CENTER)
    textFont("Courier New")
    textSize(20)
    fill('#2e3766ff')
    // noStroke()
    textWrap(WORD)
    stroke('#2e3766ff')
    strokeWeight(1);
    text('The blood… oh God… everywhere… I do not know if I can ever forget The Horror of this night. Guess it was just too much to ask. There are two choices in front of you, walk in the mountain in shame, never to be seen again, or go back and catch yourself a new flock. Hope you do not lose this one to the dark…', 200, 150, 500)

    // textAlign(CENTER)
    textFont("Courier /new")
    textSize(25)
    fill('#eae6cfff')
    noStroke()
    // stroke('#4c8bc7ff')
    // strokeWeight(1);
    text('PRESS ESC TO GO BACK', 450, 480)
}

//Winner screen, draw and text 
function protectWin() {
    background('#eae6cfff')

    push()
    rectMode(CENTER)
    noStroke()
    fill('#2e3766ff')
    rect(450, 490, 380, 80, 50)
    pop()

    push()
    rectMode(CENTER)
    stroke('#2e3766ff')
    strokeWeight(30)
    noFill()
    rect(450, 350, 900, 700, 30)
    pop()


    textAlign(CENTER)
    textFont("Courier New")
    textSize(20)
    fill('#2e3766ff')
    // noStroke()
    textWrap(WORD)
    stroke('#2e3766ff')
    strokeWeight(1);
    text('Yippee! Hooray! Your flock is safe! Hard work does pay off, you now have at least a little bit of experience with sheep, time to use that on the real thing! Next, the World!', 200, 230, 500)

    // textAlign(CENTER)
    textFont("Courier /new")
    textSize(25)
    fill('#eae6cfff')
    noStroke()
    // stroke('#4c8bc7ff')
    // strokeWeight(1);
    text('PRESS ESC TO GO BACK', 450, 480)
}