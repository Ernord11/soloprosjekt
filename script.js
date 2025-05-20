const canvas = document.getElementById("spillbrett")
const ctx = canvas.getContext('2d')

const paddleWidth = 20;
const paddleHeight = 120;

let yv = 10
let xv = 10

const aiSpeed = 2;
const fart = 20

let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

let venstrePoeng = 0
let høyrePoeng = 0

let ballHeight = 20
let ballWidth = 20

let ballY = canvas.height / 2 - ballHeight / 2;
let ballX = canvas.width / 2 - ballWidth / 2;


function tegnRekkert() {
    ctx.fillStyle = "white";


    ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);


    ctx.fillRect(canvas.width - paddleWidth - 10, rightPaddleY, paddleWidth, paddleHeight)
}

function tegnBall() {

    ctx.fillStyle = "white"

    ctx.fillRect(ballX, ballY, ballWidth, ballHeight)


}





document.addEventListener("keydown", function (e) {
    

    if (e.key === "w") leftPaddleY -= fart;
    if (e.key === "s") leftPaddleY += fart;


})



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
        xv *= -1; // Endre retning på X
        ballX = 10 + paddleWidth; // Flytt ballen ut av rekkerten for å unngå å sette seg fast
    }
    
    // Kollisjon med høyre rekkert
    if (
        ballX + ballWidth >= canvas.width - paddleWidth - 10 &&
        ballY + ballHeight >= rightPaddleY &&
        ballY <= rightPaddleY + paddleHeight
    ) {
        xv *= -1;
        ballX = canvas.width - paddleWidth - 10 - ballWidth;
    }

    
}

function AI() {
   
    if (rightPaddleY + paddleHeight / 2 < ballY + ballHeight / 2) {
        rightPaddleY += aiSpeed;
    } else {
        rightPaddleY -= aiSpeed;
    }
   
    rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));
}


function draw() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    tegnRekkert()
    tegnBall()
    flyttBall()
    AI()


    requestAnimationFrame(draw)
}


draw();



