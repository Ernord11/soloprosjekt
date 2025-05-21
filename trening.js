const canvas = document.getElementById("spillbrett2")
const ctx = canvas.getContext('2d')

const paddleWidth = 20
const paddleHeight = 120


let yv = 5
let xv = 7

const aiSpeed = 2.9;
const fart = 11

let leftPaddleY = canvas.height / 2 - paddleHeight / 2
let rightPaddleY = canvas.height / 2 - paddleHeight / 2

let venstrePoeng = 0
let høyrePoeng = 0

let ballHeight = 20
let ballWidth = 20

let wPressed = false
let sPressed = false

const lyd = document.getElementById("pongLyd")
const lyd2 = document.getElementById("popLyd")

let ballY = canvas.height / 2 - ballHeight / 2
let ballX = canvas.width / 7 - ballWidth / 2


function tegnRekkert() {
    ctx.fillStyle = "white";


    ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);


    
}

function tegnBall() {

    ctx.fillStyle = "white"

    ctx.fillRect(ballX, ballY, ballWidth, ballHeight)


}



document.addEventListener("keydown", function (e) {
    if (e.key === "w") wPressed = true;
    if (e.key === "s") sPressed = true;
});

document.addEventListener("keyup", function (e) {
    if (e.key === "w") wPressed = false;
    if (e.key === "s") sPressed = false;
});

function flyttSpiller() {
    if (wPressed) leftPaddleY -= fart / 2;
    if (sPressed) leftPaddleY += fart / 2;

    
    leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
}

function flyttBall() {





    ballX += xv;
    ballY += yv;

   
    if (ballY <= 0 || ballY + ballHeight >= canvas.height) {
        yv *= -1;

       
    }


    if (ballX <= 0 || ballX + ballWidth >= canvas.width) {
        xv *= -1;

    }

    if (
        ballX <= 10 + paddleWidth &&
        ballY + ballHeight >= leftPaddleY &&
        ballY <= leftPaddleY + paddleHeight
    ) {
        xv *= -1;
        ballX = 10 + paddleWidth; 
        
        lyd.currentTime = 0.7;     
        lyd.play();              

        setTimeout(() => {
            lyd.pause();         
            lyd.currentTime = 0;
        }, 500);

    }

   
   


}








function draw() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    tegnRekkert()
    tegnBall()
    flyttBall()
    
    flyttSpiller()


    requestAnimationFrame(draw)
}


draw();



