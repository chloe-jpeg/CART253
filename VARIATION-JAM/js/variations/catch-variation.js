
"use strict";

let cbgImg, chillImg, covImg, cwoodImg;


const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 15,
    fill: "#000000"
};

const sheeps = [];

function preload() {
    cbgImg = loadImage('./assets/images/1_bg.png')
    chillImg = loadImage('./assets/images/1_hill.png')
    covImg = loadImage('./assets/images/1_ov.png')
    cwoodImg = loadImage('./assets/images/1_cl.png')
}

function catchSetup() {

}

/**
 * This will be called every frame when the red variation is active
 */
function catchDraw() {
    imageMode(CENTER, CENTER)
    image(cbgImg, 450, 350, 900, 700)

    image(chillImg, 450, 450, 900, 600)
    image(cwoodImg, 450, 350, 900, 700)
    image(covImg, 450, 350, 900, 700)

    strokeWeight(8)
    stroke('white')
    line(350, 700, 550, 700)


}

function catchKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
}
function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
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

function checkScore() {
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
        const d = dist(user.x, user.y, sheep.x, sheep.y);
        if (d < user.size * 2 + sheep.size) {
            if (sheep.x > user.x) {
                sheep.x += 1
            }
            if (sheep.x < user.x)
                sheep.x -= 1
            if (sheep.y > user.y) {
                sheep.y += 1
            }
            if (sheep.y < user.y) {
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




