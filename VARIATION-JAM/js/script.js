/**
 * Keeper of Sheep
 * Chloé Guérin
 * 
 *3 games that follows the path of a young soon-to-be sheepkeeper. use keys to work the menu and mouse to catch, feed and protect your future flock.
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//original state when you open the game
let state = "menu";

//and the canvas, size of the whole thing
function setup() {
    createCanvas(900, 700)
}

//connects the menu draw to the games draw
function draw() {
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "catch-variation":
            catchDraw();
            break
        case "feed-variation":
            feedDraw();
            break;
        case "protect-variation":
            protectDraw();
            break;
    }
}

//connects the menu key press to the games key press
function keyPressed(event) {
    switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
        case "catch-variation":
            catchKeyPressed(event);
            break
        case "feed-variation":
            feedKeyPressed(event);
            break;
        case "protect-variation":
            protectKeyPressed(event);
            break;
    }
}
//creates the comeback from the game to the menu (is that what's goign wrong??)
function KeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}