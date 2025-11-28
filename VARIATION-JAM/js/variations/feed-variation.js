"use strict";


function feedSetup() {

}

/**
 * This will be called every frame when the green variation is active
 */
function feedDraw() {
    background("green");
}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function feedKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}
