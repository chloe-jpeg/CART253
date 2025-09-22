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

    drawHair()
    drawNeck()
    drawFace()
    drawHoodie()
    drawNose()
    drawMouth()

}
//is this what i'm supposed to do? apparently not. update 2! check your spelling and maybe next time you won't spend 30 min trying to make an 'ellispe' appear.
function drawFace() {
    noStroke()
    fill(209, 171, 134)
    ellipse(300, 300, 200, 250)
}

//alright challenge:try to make the hair in less than an hour
function drawHair() {
    noStroke()
    fill(0)
    ellipse(300, 300, 250, 300)
}

//ok i'm not gonna lie, i'm following a p5 tuto for that one, i'll credit in read me. also is the no stroke necessary?
function drawHoodie() {
    rectMode(CENTER)
    fill(0)
    rect(300, 550, 300, 200)
}

//neck i need a win. eeeeh i'll take it. nostroke is not necessary! is the order of things important? i guess for style and understanding but rn i'm feeling chaotic. i'll clean up later. also editing these is gonna be a bitch, but at least it's fun!
function drawNeck() {
    rectMode(CENTER)
    fill(209, 171, 134)
    rect(300, 450, 80, 90)
}

