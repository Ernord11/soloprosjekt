const canvas = document.getElementById("spillbrett")
const ctx = canvas.getContext('2d')

const paddleWidth = 5;
const paddleHeight = 30;

let yv = 1
let xv = 1

const aiSpeed = 1;

let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;



let ballHeight = 5
let ballWidth = 5

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
    const fart = 5

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



