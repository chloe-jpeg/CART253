/**
 * third and last game, time to see how brave you are. wolves are coming from all sides, use the mouse to push them away. you only need to last through the night without losing your whole flock. 
 */

"use strict";

let protectGameState = "instruction"

let pbgImg, flockImg;

let positionStartWolf = Math.random();

let protectScore = 10;

let pTimerStarted = false;
let pTimeLeft = 30;
let pTimer;

const pUser = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 15,
    fill: "#000000"
};

const pile = {
    x: 450,
    y: 350,
    size: 100,
    fill: 'rgba(255, 255, 255, 0)'
};

const wolves = [];

// const wolf = {
//     x: 300,
//     y: 300,
//     size: 60,
//     fill: "#202232ff"
// };

function protectPreload() {
    pbgImg = loadImage('./assets/images/3_newbg.png')
    flockImg = loadImage('./assets/images/3_flock.png');
}

function protectSetup() {
    protectGameState = 'instruction'
    pTimerStarted = false;
    protectScore = 10;
    pTimeLeft = 30;

    prepareWolves()
    protectPreload()
}

/**
 * This will be called every frame when the blue variation is active
 */
function protectDraw() {
    if (protectGameState === "instruction") {
        protectInstructionScreen();
    }

    else if (protectGameState === "play") {
        // background("blue");
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
 * 
 */
function protectKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
    else if (event.keyCode === 32) {
        protectGameState = "play";
    }
}

function protectCheckScore() {
    if (protectScore >= 1) {
        protectGameState = "winning"
    } else if (feedScore <= 0) {
        protectGameState = "gameOver"
    }
}

function protectScoreDraw() {
    fill('#2e3766ff');
    textAlign(RIGHT, TOP);
    textFont("Courier New")
    textSize(20);
    stroke('#2e3766ff')
    strokeWeight(1);
    text(protectScore, 850, 30);
}

function protectTimer() {
    push();
    fill('#2e3766ff');
    textAlign(LEFT, TOP);
    textFont("Courier New")
    textSize(20);
    stroke('#2e3766ff')
    strokeWeight(1);
    text(pTimeLeft, 30, 30);
    pop();

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

function drawProtectpUser() {
    push();
    noStroke();
    fill(pUser.fill);
    ellipse(pUser.x, pUser.y, pUser.size);
    pop();
};

function moveProtectpUser() {
    pUser.x = mouseX;
    pUser.y = mouseY;
}

function drawPile() {
    push();
    noStroke();
    fill(pile.fill);
    ellipse(pile.x, pile.y, pile.size);
    // const d = dist(pile.x, pile.y, wolves.x, wolves.y);
    pop();
}

// function drawWolf() {
//     push();
//     noStroke();
//     fill(wolf.fill);
//     ellipse(wolf.x, wolf.y, wolf.size);
//     pop();
// };


// function moveWolf() {
//     // Calcuate distance between mouse and wolves
//     const d = dist(pUser.x, pUser.y, wolf.x, wolf.y);
//     if (d < pUser.size / 2 + wolf.size / 2) {
//         if (wolf.x > pUser.x) {
//             wolf.x += 1
//         }
//         if (wolf.x < pUser.x)
//             wolf.x -= 1
//         if (wolf.y > pUser.y) {
//             wolf.y += 1
//         }
//         if (wolf.y < pUser.y) {
//             wolf.y -= 1
//         }
//     }
// };

function drawWolf() {
    for (let i = 0; i < wolves.length; i++) {
        let wolf = wolves[i];

        if (wolf.x < 900 && wolf.x > 0 && wolf.y < 700 && wolf.y > 0) {
            push();
            noStroke();
            fill(wolf.fill);
            ellipse(wolf.x, wolf.y, wolf.size);
            pop();

            // dx = dist(pile.x, wolves.x, wolves.y);
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
            //     if (pointgagne === false) {
            //         protectScore = protectScore + 1
            //         pointgagne = true


            // }

            // wolf.x = wolf.x + (d / 1000)
            // wolf.y = wolf.y + (d / 1000)

        }
        // else {
        //     // ne s<affiche pas
        //     if (wolf.x < 550 && wolf.x > 350 && wolf.y < 700 && wolf.y > 700) {
        //         score = score + 1;
        //     }
        // }

    };
}


function moveWolf() {
    for (let i = 0; i < wolves.length; i++) {
        let wolf = wolves[i];
        // Calcuate distance between mouse and wolf
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