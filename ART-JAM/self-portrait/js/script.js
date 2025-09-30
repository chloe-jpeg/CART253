/**
 * Starlight
 * Chloé Guérin
 * 
 * This is a self portrait of, well, me! I like blue, stars and the sea. Cool music, animation and a bit of mouse interaction.
 * 
 */

"use strict";


/**function preload for image!! this took me 2 days to figure out, so pls appreciate it. now with audio!*/
//random necessary stuff
var a = 0;
var opacity = 0

let bottomImg, topImg, bgImg;

let mySound;

function preload() {

    bottomImg = loadImage('/assets/images/glow_real.png') //glow image
    topImg = loadImage('/assets/images/star_real.png') //star image
    bgImg = loadImage('/assets/images/normandie_lena.png')//bg sea

    mySound = loadSound('/assets/sounds/videoclub_roi.mp3')//song
}


/**this is my function setup for canvas!*/
function setup() {

    createCanvas(600, 600);
}


/** my function draw, for background, draw organization and image work */
function draw() {

    //bg color, i know i want blue and something desaturated. or orange. or sea.  
    //background('#5B6B8A');
    //background('#c9622bff');
    image(bgImg, 300, 300, 600, 600) //oof thats pretty good


    //glow work
    tint(255, opacity)
    imageMode(CENTER)
    image(bottomImg, 300, 300, 600, 600)

    //all my function draw elements
    drawHair()
    drawNeck()
    drawEars()
    drawFace()
    drawPiercings()
    drawBangs()
    drawHoodie()
    drawNose()
    drawMouth()

    //star rotation work, drove me crazy
    translate(300, 300)
    imageMode(CENTER)
    noTint()
    rotate(a)
    image(topImg, 0, 0, 230, 230)
    a = a + 0.02
}


//can't believe that worked
//sound with mouse! roi-Videoclub (i really like 'mai' from them too)
function mousePressed() {
    if (mySound.isPlaying()) {
        mySound.stop()
    } else {
        mySound.loop()
    }
}


//ok now i'm good, opacity play with the glow!
function mouseMoved() {
    if (mouseX <= 300) {
        opacity = map(mouseX, 0, 300, 0, 255)
    } else {
        opacity = map(mouseX, 300, 600, 255, 0)
    }
    return false
}


//alright challenge:try to make the hair in less than an hour(i was doing something sooo complicated for nothing)
function drawHair() {
    //brown back part of my hair. figured out how to round the corners.
    rectMode(CENTER)
    noStroke()
    fill('#452f2bff')
    rect(300, 315, 235, 305, 80)

    //might delete this, the blond part of my hair - officially keeping this.
    rectMode(CENTER)
    noStroke()
    fill('#c2bfa1ff')
    rect(300, 370, 235, 180, 65)

    //space buns!
    noStroke()
    fill('#452f2bff')
    ellipse(220, 190, 100) //right one
    noStroke()
    fill('#452f2bff')
    ellipse(380, 190, 100) //left one
}


//neck i need a win. eeeeh i'll take it. nostroke is not necessary! (lie) is the order of things important? i guess for style and understanding but rn i'm feeling chaotic. cleanup time!
function drawNeck() {
    //back part of the hood, has to be behind the neck
    noStroke()
    fill('#2b5284ff')
    triangle(215, 430, 390, 430, 300, 500)

    //neck part
    rectMode(CENTER)
    noStroke()
    fill('#D1AB86')
    rect(300, 450, 80, 90)
}


//ears to listen to La Femme, my favorite band of the moment 
function drawEars() {
    //right ear or so i'm trying
    fill('#D1AB86')
    ellipse(215, 310, 70)

    //ok that worked now left ear!
    fill('#D1AB86')
    ellipse(385, 310, 70)
}


//is this what i'm supposed to do? apparently not. update 2! check your spelling and maybe next time you won't spend 30 min trying to make an 'ellispe' appear.
function drawFace() {
    noStroke()
    fill('#D1AB86')
    ellipse(300, 300, 200, 250)
}


//earrings?right? why is this not working?? ok its fine now
function drawPiercings() {
    //right gold
    fill('#af9125ff')
    ellipse(200, 335, 8)

    //left gold
    fill('#af9125ff')
    ellipse(400, 335, 8)

    //right silver
    stroke('#878783ff')
    strokeWeight(3)
    line(194, 328, 190, 335)

    //left silver
    stroke('#878783ff')
    strokeWeight(3)
    line(405, 328, 410, 335)

    //septum
    stroke('#878783ff')
    strokeWeight(3)
    noFill()
    ellipse(300, 360, 13)
}


//second try at bangs, have a genius idea
function drawBangs() {
    rectMode(CENTER)
    noStroke()
    fill('#452f2bff')
    rect(300, 220, 230, 100, 450)

    //trying my first triangle, wish me luck!
    noStroke()
    fill('#D1AB86')
    triangle(300, 220, 280, 280, 320, 280)
}


//ok i'm not gonna lie, i'm following a p5 tuto for that one, i'll credit in read me. also is the no stroke necessary? answer unconclusive, sometimes yes?
function drawHoodie() {
    //body of the hoodie
    rectMode(CENTER)
    noStroke()
    fill('#2b5284ff')
    rect(300, 550, 300, 200, 60)

    //front parts of the hood
    noStroke()
    fill('#386197ff')
    triangle(215, 430, 200, 460, 310, 450)
    triangle(390, 430, 405, 460, 290, 450)

    //strings of the hood
    noStroke()
    fill('#878783ff')
    ellipse(270, 450, 8)
    ellipse(330, 450, 8)
    stroke(255)
    strokeWeight(4)
    line(270, 451, 270, 500)
    line(330, 451, 330, 500)

}


//nose time! if i feel fancy, i'll try adding a septum
function drawNose() {
    noStroke()
    fill('#d59163ff')
    triangle(300, 325, 315, 360, 285, 360)
}


//mouth is for eating 
function drawMouth() {
    noStroke()
    fill('#c15f49ff')
    ellipse(300, 391, 35, 17)

    noStroke()
    fill('#D1AB86')
    rect(300, 397, 36, 15)
}

