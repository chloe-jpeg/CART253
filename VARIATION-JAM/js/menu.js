/**
 * the menu work (which was horrible to figure out btw, i don't even know why)
 * illustration and the variation keys
 */
"use strict";

const menuText = `
(C) Catch
(F) Feed
(P) Protect`

let shepherdImg;

function preload() {
    shepherdImg = loadImage('./assets/images/sheepkeeper.png')
}


/**
 * background, buttons and name of the games
*/
function menuDraw() {
    //background(0)
    imageMode(CENTER)
    image(shepherdImg, 450, 350, 900, 700)

    // push();
    // fill(255);
    // textSize(32);
    // textAlign(CENTER, CENTER);
    // textFont("Courier New")
    // text(menuText, width / 2, height / 2);
    // pop();

    push()
    noStroke()
    fill('#477043ff')
    rect(650, 100, 150, 40, 15)
    pop()

    push()
    noStroke()
    fill('#477043ff')
    rect(650, 150, 150, 40, 15)
    pop()

    push()
    noStroke()
    fill('#477043ff')
    rect(650, 200, 150, 40, 15)
    pop()

    textFont("Courier /new")
    textSize(20)
    fill('#c3dfc0ff')
    noStroke()
    text('(C) CATCH', 675, 127)

    textFont("Courier /new")
    textSize(20)
    fill('#c3dfc0ff')
    noStroke()
    text('(F) FEED', 685, 177)

    textFont("Courier /new")
    textSize(20)
    fill('#c3dfc0ff')
    noStroke()
    text('(P) PROTECT', 668, 227)

}

function menuKeyPressed(event) {
    switch (event.keyCode) {
        case 67:
            state = "catch-variation";
            catchSetup();
            break;

        case 70:
            state = "feed-variation";
            feedSetup();
            break;

        case 80:
            state = "protect-variation";
            protectSetup();
            break;
    }
}