"use strict";



function protectSetup() {

}

/**
 * This will be called every frame when the blue variation is active
 */
function protectDraw() {
    background("blue");
}

/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function protectKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}