/**
 * Satrlight
 * Chloé Guérin
 * 
 * This is a self portrait of, well, me! i haven't fully decided what i want to do yet (lie, i just need to see if i can actually make it)
 * lets see if i come back to fill this or forget!
 * 
 */

"use strict";

/**
 * this is my function setup, i know i need it to create my canvas by what else?
*/
function setup() {
    createCanvas(600, 600);

}


/**
 * my function draw, for background and draw organisation 
*/
function draw() {
    //bg color, i know i want blue and something desaturated    
    background(91, 107, 138);

    drawFace()
    drawNose()
    drawMouth()

}
//is this what i'm supposed to do? apparently not. update 2! check your spelling and maybe next time you won't spend 30 min trying to make an 'ellispe' appear.
function drawFace() {
    noStroke()
    fill(209, 171, 134)
    ellipse(300, 300, 200, 250)
}