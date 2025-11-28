/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
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
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function menuDraw() {
    //background(0)
    imageMode(CENTER)
    image(shepherdImg, 450, 350, 900, 700)

    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont("Courier New")
    text(menuText, width / 2, height / 2);
    pop();
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