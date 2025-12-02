/**
 * third and last game, time to see how brave you are. wolves are coming from all sides, use the mouse to push them away. you only need to last through the night without losing your whole flock. 
 */

"use strict";

let pbgImg, flockImg;

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

const wolf = {
    x: 300,
    y: 300,
    size: 60,
    fill: "#202232ff"
};

function protectPreload() {
    pbgImg = loadImage('./assets/images/3_newbg.png')
    flockImg = loadImage('./assets/images/3_flock.png');
}

function protectSetup() {
    protectPreload()
}

/**
 * This will be called every frame when the blue variation is active
 */
function protectDraw() {
    // background("blue");
    imageMode(CENTER, CENTER)
    image(pbgImg, 450, 350, 900, 700)

    image(flockImg, 450, 350, 178, 153)


    drawProtectpUser()
    moveProtectpUser()
    drawPile()
    drawWolf()
    moveWolf()
}

/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function protectKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

function moveProtectpUser() {
    pUser.x = mouseX;
    pUser.y = mouseY;
}
function drawProtectpUser() {
    push();
    noStroke();
    fill(pUser.fill);
    ellipse(pUser.x, pUser.y, pUser.size);
    pop();
};

function drawPile() {
    push();
    noStroke();
    fill(pile.fill);
    ellipse(pile.x, pile.y, pile.size);
    const d = dist(pile.x, pile.y, wolf.x, wolf.y);
    pop();
}

function drawWolf() {
    push();
    noStroke();
    fill(wolf.fill);
    ellipse(wolf.x, wolf.y, wolf.size);
    pop();
};


function moveWolf() {
    // Calcuate distance between mouse and wolves
    const d = dist(pUser.x, pUser.y, wolf.x, wolf.y);
    if (d < pUser.size / 2 + wolf.size / 2) {
        if (wolf.x > pUser.x) {
            wolf.x += 1
        }
        if (wolf.x < pUser.x)
            wolf.x -= 1
        if (wolf.y > pUser.y) {
            wolf.y += 1
        }
        if (wolf.y < pUser.y) {
            wolf.y -= 1
        }
    }
};
