/**
 * second game, feed your sheep. food can be treacherous, use the mouse to push as many as possible in the sheep's mouth. make it quick or it'll starve to death! 
 */

"use strict";
/**
 * all my let
 */
//start state of the game
let feedGameState = "instruction";
//setup for image 
let fbgImg, lambImg;
//base info fro score and timer
let feedScore = 0
let fTimerStarted = false;
let fTimeLeft = 30;
let fTimer;

/**
 * all my const
 */
//info for the mousse circle
const fUser = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 15,
    fill: "#000000"
};
//information in behind the sheep head
const mouth = {
    x: 310,
    y: 290,
    size: 100,
    fill: 'rgba(255, 255, 255, 0)',
}
//information for the food circle (carrot)
const food = {
    x: undefined,
    y: undefined,
    size: 80,
    fill: "#e56407ff"
};

/**
 * preload for my images
 */
function feedPreload() {
    fbgImg = loadImage('./assets/images/2_bg.png')
    lambImg = loadImage('./assets/images/2_lamb.png');
}

/**
 * setup with timer reload and functions call
 */
function feedSetup() {
    feedGameState = 'instruction'
    fTimerStarted = false;
    feedScore = 0;
    fTimeLeft = 30;
    feedPreload();
    //making the food appear everywhere in the canvas
    food.x = random(0, width);
    food.y = random(0, height);
}

/**
 * all my game state, most of where the functions are called, bg image
*/
function feedDraw() {
    if (feedGameState === "instruction") {
        feedInstructionScreen();
    }
    else if (feedGameState === "play") {
        imageMode(CENTER, CENTER)
        image(fbgImg, 450, 350, 900, 700)
        image(lambImg, 450, 370, 535, 451)

        drawMouth();
        drawFood();
        moveFood();
        drawFeedUser();
        moveFeedUser();
        feedScoredraw();
        feedTimer();
    }

    else if (feedGameState === "gameOver") {
        feedGameover();
    }

    else if (feedGameState === "winning") {
        feedWin();
    }

}

/**
 * key press!
 */
function feedKeyPressed(event) {
    //to go back to the menu (is not working well yet??)
    if (event.keyCode === 27) {
        state = "menu";
    }
    //to go from instruction to play
    else if (event.keyCode === 32) {
        feedGameState = "play";

    }
}

// function feedKeyTyped() {
//     if (keyCode === 32) {
//         feedGameState = "play"
//         // mySound.loop()
//     }
// }

/**
 * all the score functions
 */
//check the score to know if its a winner or loser 
function feedCheckScore() {
    if (feedScore >= 5) {
        feedGameState = "winning"
    } else if (feedScore <= 4) {
        feedGameState = "gameOver"
    }
}
//make the score visible on the edge of the screen
function feedScoredraw() {
    fill('#2e3766ff');
    textAlign(RIGHT, TOP);
    textFont("Courier New")
    textSize(20);
    stroke('#2e3766ff')
    strokeWeight(1);
    text(feedScore, 850, 30);
}

/**
 * all the timer function, makes the feeding stressful (good)
 */
function feedTimer() {
    //make the time visible on the edge of the screen
    push();
    fill('#2e3766ff');
    textAlign(LEFT, TOP);
    textFont("Courier New")
    textSize(20);
    stroke('#2e3766ff')
    strokeWeight(1);
    text(fTimeLeft, 30, 30);
    pop();
    //make the time tick down and check with the score to know the gamestate 
    if (!fTimerStarted) {
        fTimerStarted = true;

        fTimer = setInterval(() => {
            fTimeLeft--;

            if (fTimeLeft <= 0) {
                clearInterval(fTimer);
                feedCheckScore();


            }
        }, 1000);
    }
}

/**
 * all the user functions
 */
//draw the black mousse circle
function drawFeedUser() {
    push();
    noStroke();
    fill(fUser.fill);
    ellipse(fUser.x, fUser.y, fUser.size);
    pop();
};
//connets to the mousse
function moveFeedUser() {
    fUser.x = mouseX;
    fUser.y = mouseY;
}

//create mouth and connects to the food
function drawMouth() {
    push();
    noStroke();
    fill(mouth.fill);
    ellipse(mouth.x, mouth.y, mouth.size);
    const d = dist(mouth.x, mouth.y, food.x, food.y);
    pop();
}

/**
 * all the food functions
 */
//create food and connects to the score
function drawFood() {
    push();
    noStroke();
    fill(food.fill);
    ellipse(food.x, food.y, food.size);

    let d = dist(food.x, food.y, mouth.x, mouth.y);
    if (d < (food.size / 2 + mouth.size / 2)) {
        feedScore = feedScore + 1
        food.x = random(0, width);
        food.y = random(0, height);
        d = dist(food.x, food.y, mouth.x, mouth.y);
    }
    pop();
};


// Calcuate distance between mouse and food
function moveFood() {
    const d = dist(fUser.x, fUser.y, food.x, food.y);
    if (d < fUser.size * 1 + food.size * 1) {
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

/**
 * Other gameStates, colours and text
 */

function feedInstructionScreen() {
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
    text('Look at how precious your animals are, now is the time to care for them! Feed the sheep, quickly! After all your hard work catching them, you would not let them starve, would you? Being a responsible sheep owner can sometimes be demanding, but I believe in you! Go get em champ!', 200, 160, 500)

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
function feedGameover() {
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
    text('YOUR SHEEP STARVED TO DEATH! Shame on you, irresponsible sheepkeeper. Go back, think on it and train to fix the error of your way…', 200, 250, 500)

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
function feedWin() {
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
    text('I can only see happy, well-fed, fat and plump little sheep! Now that is how a good herd is supposed to look. But your job is not over, night is coming and your flock looks delicious. Go back to the menu, get your warrior spirit out and protect the ones that put their trust in you!', 200, 160, 500)

    // textAlign(CENTER)
    textFont("Courier /new")
    textSize(25)
    fill('#eae6cfff')
    noStroke()
    // stroke('#4c8bc7ff')
    // strokeWeight(1);
    text('PRESS ESC TO GO BACK', 450, 480)
}