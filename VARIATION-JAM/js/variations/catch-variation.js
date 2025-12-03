/**
 * first mini-game, the catch variation. wild sheeps everywhere, they are skittish but with care  use the mouse to herd them in the fence.
 */
"use strict";

let catchGameState = "instruction";
let cbgImg, chillImg, covImg, cwoodImg;

let positionStartSheep = Math.random()
let catchScore = 0
let cTimerStarted = false;
let cTimeLeft = 30;
let cTimer;

const cUser = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 15,
    fill: "#000000"
};

const line = {
    x: 450,
    y: 780,
    size: 200,
    fill: "#ffffffff"
}

const sheeps = [];

function catchPreload() {
    cbgImg = loadImage('./assets/images/1_bg.png');
    chillImg = loadImage('./assets/images/1_hill.png');
    covImg = loadImage('./assets/images/1_ov.png');
    cwoodImg = loadImage('./assets/images/1_cl.png')
}

function catchSetup() {
    catchGameState = 'instruction'
    cTimerStarted = false;
    catchScore = 0;
    cTimeLeft = 30;
    prepareSheeps()
    catchPreload()
}


function catchDraw() {
    if (catchGameState === "instruction") {
        catchInstructionScreen();
    }
    else if (catchGameState === "play") {
        imageMode(CENTER, CENTER)
        image(cbgImg, 450, 350, 900, 700)
        image(chillImg, 450, 450, 900, 600)
        image(cwoodImg, 450, 350, 900, 700)
        image(covImg, 450, 350, 900, 700)

        drawCatchUser()
        moveCatchUser()
        drawSheep()
        moveSheep()
        drawLine()
        catchScoredraw();
        catchTimer()

        // strokeWeight(8)
        // stroke('white')
        // line(350, 700, 550, 700)
    }

    else if (catchGameState === "gameOver") {
        catchGameover();
    }

    else if (catchGameState === "winning") {
        catchWin();
    }

}

function catchKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
    else if (event.keyCode === 32) {
        catchGameState = "play";

    }
}

function catchCheckScore() {
    if (catchScore >= 8) {
        catchGameState = "winning"
    } else if (catchScore <= 7) {
        catchGameState = "gameOver"
    }
}

function catchScoredraw() {
    fill('#2e3766ff');
    textAlign(RIGHT, TOP);
    textFont("Courier New")
    textSize(20);
    stroke('#2e3766ff')
    strokeWeight(1);
    text(catchScore, 850, 30);
}

function catchTimer() {
    push();
    fill('#2e3766ff');
    textAlign(LEFT, TOP);
    textFont("Courier New")
    textSize(20);
    stroke('#2e3766ff')
    strokeWeight(1);
    text(cTimeLeft, 30, 30);
    pop();

    if (!cTimerStarted) {
        cTimerStarted = true;

        cTimer = setInterval(() => {
            cTimeLeft--;

            if (cTimeLeft <= 0) {
                clearInterval(cTimer);
                catchCheckScore();


            }
        }, 1000);
    }
}

function drawCatchUser() {
    push();
    noStroke();
    fill(cUser.fill);
    ellipse(cUser.x, cUser.y, cUser.size);
    pop();
};

function moveCatchUser() {
    cUser.x = mouseX;
    cUser.y = mouseY;
}

function drawLine() {
    push();
    noStroke();
    fill(line.fill);
    rect(line.x, line.y, line.size);
    pop();
}

function drawSheep() {
    for (let i = 0; i < sheeps.length; i++) {
        let sheep = sheeps[i];

        if (sheep.x < 900 && sheep.x > 0 && sheep.y < 700 && sheep.y > 200) {
            push();
            noStroke();
            fill(sheep.fill);
            ellipse(sheep.x, sheep.y, sheep.size);
            pop();
        }
        let d = dist(sheep.x, sheep.y, line.x, line.y);
        if (d < (sheep.size / 2 + line.size / 2)) {
            sheep.cpointgagne = false
            if (sheep.cpointperdu === false) {
                catchScore = catchScore + 1
                sheep.cpointperdu = true
            }
        }

        else {
            sheep.cpointperdu = false
        }

        // let d = dist(sheep.x, sheep.y, line.x, line.y);
        // if (d < (sheep.size / 2 + line.size / 2))
        //     catchScore = catchScore + 1
        // else {
        //     // ne s<affiche pas
        //     if (sheep.x < 550 && sheep.x > 350 && sheep.y < 700 && sheep.y > 700) {
        //         score = score + 1;
        //     }
        // }

    };
}


function moveSheep() {
    for (let i = 0; i < sheeps.length; i++) {
        let sheep = sheeps[i];
        // Calcuate distance between mouse and sheep
        const d = dist(cUser.x, cUser.y, sheep.x, sheep.y);
        if (d < cUser.size * 2 + sheep.size) {
            if (sheep.x > cUser.x) {
                sheep.x += 2
            }
            if (sheep.x < cUser.x)
                sheep.x -= 2
            if (sheep.y > cUser.y) {
                sheep.y += 2
            }
            if (sheep.y < cUser.y) {
                sheep.y -= 2
            }
        }
    }
};

function prepareSheeps() {
    for (let i = 0; i < 15; i++) {
        let sheep = {
            x: Math.floor(Math.random() * 900),
            y: Math.floor(Math.random() * 500) + 200,
            size: 60,
            fill: "#ebe9c8ff",
            cpointgagne: false,
            cpointperdu: false
        };
        sheeps.push(sheep);
    }

}

function catchInstructionScreen() {
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
    text('What is a shepherd without sheep? Good question, hope you never find the answer! Gather as many sheep as you can and do not let too many escape! You need a good size flock to be respected in the sheepkeeper community. Wild sheep are skittish, take your time to herd them between the fence but if they go over the hill then you have lost them forever.', 200, 150, 500)

    // textAlign(CENTER)
    textFont("Courier /new")
    textSize(25)
    fill('#eae6cfff')
    noStroke()
    // stroke('#4c8bc7ff')
    // strokeWeight(1);
    text('PRESS SPACEBAR TO PLAY', 450, 500)
}


function catchGameover() {
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
    text('This… is not what I would call a bountiful herd… better luck next time I guess… I would recommend going back to the menu to try again, maybe you can hone your skills and become a master at your craft (sheep)', 200, 180, 500)

    // textAlign(CENTER)
    textFont("Courier /new")
    textSize(25)
    fill('#eae6cfff')
    noStroke()
    // stroke('#4c8bc7ff')
    // strokeWeight(1);
    text('PRESS ESC TO GO BACK', 450, 480)
}


function catchWin() {
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
    text('Bravo! You have gathered enough sheep to have a respectable flock! But this was only step one, you can now go back to the menu to take care of your precious animals. Feed them! Get your herd strong and powerful and one day you might become King of the sheep', 200, 160, 500)

    // textAlign(CENTER)
    textFont("Courier /new")
    textSize(25)
    fill('#eae6cfff')
    noStroke()
    // stroke('#4c8bc7ff')
    // strokeWeight(1);
    text('PRESS ESC TO GO BACK', 450, 480)
}


