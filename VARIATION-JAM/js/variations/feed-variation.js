"use strict";
// let gameState = "feed";

let fbgImg, lambImg;
// let score = 0

const fUser = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 15,
    fill: "#000000"
};

const mouth = {
    x: 310,
    y: 290,
    size: 100,
    fill: 'rgba(255, 255, 255, 0)',
}

const food = {
    x: undefined,
    y: undefined,
    size: 80,
    fill: "#e56407ff"
};

function feedPreload() {
    fbgImg = loadImage('./assets/images/2_bg.png')
    lambImg = loadImage('./assets/images/2_lamb.png');
}

function feedSetup() {
    feedPreload()

    food.x = random(0, width);
    food.y = random(0, height);
}

/**
 * This will be called every frame when the green variation is active
*/
function feedDraw() {
    imageMode(CENTER, CENTER)
    image(fbgImg, 450, 350, 900, 700)

    image(lambImg, 450, 370, 535, 451)

    // push()
    // noStroke()
    // fill('#282187ff')
    // ellipse(310, 290, 100)
    // pop()

    drawMouth()
    drawFood()
    moveFood()
    drawFeeduser()
    moveFeeduser()
}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function feedKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

function moveFeeduser() {
    fUser.x = mouseX;
    fUser.y = mouseY;
}
function drawFeeduser() {
    push();
    noStroke();
    fill(fUser.fill);
    ellipse(fUser.x, fUser.y, fUser.size);
    pop();
};


function drawMouth() {
    push();
    noStroke();
    fill(mouth.fill);
    ellipse(mouth.x, mouth.y, mouth.size,);
    const d = dist(mouth.x, mouth.y, food.x, food.y);
    pop();
}

function drawFood() {
    push();
    noStroke();
    fill(food.fill);
    ellipse(food.x, food.y, food.size);

    let d = dist(food.x, food.y, mouth.x, mouth.y);
    if (d < (food.size / 2 + mouth.size / 2)) {
        food.fill = food.fill
        // score++;
        food.x = random(0, width);
        food.y = random(0, height);
        d = dist(food.x, food.y, mouth.x, mouth.y);
    }
    pop();
};


function moveFood() {
    // Calcuate distance between mouse and food
    const d = dist(fUser.x, fUser.y, food.x, food.y);
    if (d < fUser.size / 2 + food.size / 2) {
        if (food.x > fUser.x) {
            food.x += 3
        }
        if (food.x < fUser.x)
            food.x -= 3
        if (food.y > fUser.y) {
            food.y += 3
        }
        if (food.y < fUser.y) {
            food.y -= 3
        }
    }
};
