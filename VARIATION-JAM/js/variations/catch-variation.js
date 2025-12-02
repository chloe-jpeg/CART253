
"use strict";

// let catchGameState = "instruction";
let cbgImg, chillImg, covImg, cwoodImg;

let positionStartSheep = Math.random()
let score = 0

const cUser = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 15,
    fill: "#000000"
};

const sheeps = [];

function catchPreload() {
    cbgImg = loadImage('./assets/images/1_bg.png');
    chillImg = loadImage('./assets/images/1_hill.png');
    covImg = loadImage('./assets/images/1_ov.png');
    cwoodImg = loadImage('./assets/images/1_cl.png')
}

function catchSetup() {
    prepareSheeps()
    catchPreload()
}


function catchDraw() {
    imageMode(CENTER, CENTER)
    console.log(cbgImg)
    image(cbgImg, 450, 350, 900, 700)


    image(chillImg, 450, 450, 900, 600)
    image(cwoodImg, 450, 350, 900, 700)
    image(covImg, 450, 350, 900, 700)



    drawSheep()
    drawCatchUser()
    moveCatchUser()
    moveSheep()
    catchScore()

    strokeWeight(8)
    stroke('white')
    line(350, 700, 550, 700)




}

function catchKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

function moveCatchUser() {
    cUser.x = mouseX;
    cUser.y = mouseY;
}
function drawCatchUser() {
    push();
    noStroke();
    fill(cUser.fill);
    ellipse(cUser.x, cUser.y, cUser.size);
    pop();
};

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
        else {
            // ne s<affiche pas
            if (sheep.x < 550 && sheep.x > 350 && sheep.y < 700 && sheep.y > 700) {
                score = score + 1;
            }
        }

    };
}

function catchScore() {
    if (score === 8) {
        gameState = "menu"
    } else if (score === 7) {
        gameState = "protect"
    }
}

function moveSheep() {
    for (let i = 0; i < sheeps.length; i++) {
        let sheep = sheeps[i];
        // Calcuate distance between mouse and sheep
        const d = dist(cUser.x, cUser.y, sheep.x, sheep.y);
        if (d < cUser.size * 2 + sheep.size) {
            if (sheep.x > cUser.x) {
                sheep.x += 1
            }
            if (sheep.x < cUser.x)
                sheep.x -= 1
            if (sheep.y > cUser.y) {
                sheep.y += 1
            }
            if (sheep.y < cUser.y) {
                sheep.y -= 1
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
            fill: "#ebe9c8ff"
        };
        sheeps.push(sheep);
    }

}




