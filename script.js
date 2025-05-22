const canvas = document.getElementById("spillbrett");
const ctx = canvas.getContext('2d');
const pauseBtn = document.getElementById("Pause")

pauseBtn.addEventListener("click", pauseFunc)

const paddleWidth = 20;
const paddleHeight = 120;

let xv = 8;
let yv = 4.8;

const aiSpeed = 4.79;
const fart = 30;

let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

let venstrePoeng = 0;
let høyrePoeng = 0;

let ballHeight = 20;
let ballWidth = 20;

let wPressed = false;
let sPressed = false;

const lyd = document.getElementById("pongLyd");
const lyd2 = document.getElementById("popLyd");

let ballY = canvas.height / 2 - ballHeight / 2;
let ballX = canvas.width / 7 - ballWidth / 2;

let ballPaused = false;

function tegnRekkert() {
    ctx.fillStyle = "white";
    ctx.fillRect(10, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth - 10, rightPaddleY, paddleWidth, paddleHeight);
}

function tegnBall() {
    ctx.fillStyle = "white";
    ctx.fillRect(ballX, ballY, ballWidth, ballHeight);
}

function resetBall() {
    ballPaused = true;

    ballX = canvas.width / 2 - ballWidth / 2;
    ballY = canvas.height / 2 - ballHeight / 2;
    xv = 0;
    yv = 0;

    setTimeout(() => {
        const directionX = Math.random() < 0.5 ? -1 : 1;
        const directionY = Math.random() < 0.5 ? -1 : 1;

        const speedX = 6 + Math.random() * 4;
        let speedY;

        do {
            speedY = 3 + Math.random() * 3;
        } while (speedY < aiSpeed);

        xv = directionX * speedX;
        yv = directionY * speedY;
        ballPaused = false;
    }, 1000);
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

    if(ballPaused)return


    if (wPressed) leftPaddleY -= fart / 2;
    if (sPressed) leftPaddleY += fart / 2;

    leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
}

function flyttBall() {
    if (ballPaused) return;

    ballX += xv;
    ballY += yv;

    if (ballX + ballWidth >= canvas.width) {
        venstrePoeng++;
        resetBall();
        return;
    }

    if (ballX <= 0) {
        høyrePoeng++;
        resetBall();
        return;
    }

    if (ballY <= 0 || ballY + ballHeight >= canvas.height) {
        yv *= -1;
    }

    // Kollisjon med venstre racket
    if (
        ballX <= 10 + paddleWidth &&
        ballY + ballHeight >= leftPaddleY &&
        ballY <= leftPaddleY + paddleHeight
    ) {
        xv *= -1.1;
        yv *= 1.02;
        
        ballX = 10 + paddleWidth;

        lyd.currentTime = 0.7;
        lyd.play();
        setTimeout(() => {
            lyd.pause();
            lyd.currentTime = 0;
        }, 500);
    }

    // Kollisjon med høyre racket
    if (
        ballX + ballWidth >= canvas.width - paddleWidth - 10 &&
        ballY + ballHeight >= rightPaddleY &&
        ballY <= rightPaddleY + paddleHeight
    ) {
        xv *= -1.1;
        yv *= 1.02;
        if (Math.abs(yv) < aiSpeed) {
            yv = aiSpeed * Math.sign(yv);
        }
        ballX = canvas.width - paddleWidth - 10 - ballWidth;

        lyd.currentTime = 0;
        lyd2.play();
        setTimeout(() => {
            lyd2.pause();
            lyd2.currentTime = 0;
        }, 500);
    }
}

function tegnScore() {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(venstrePoeng, canvas.width / 4, 50);
    ctx.fillText(høyrePoeng, (canvas.width / 4) * 3, 50);
}

function AI() {
    if(ballPaused)return
    if (rightPaddleY + paddleHeight / 2 < ballY + ballHeight / 2) {
        rightPaddleY += aiSpeed;
    } else {
        rightPaddleY -= aiSpeed;
    }

    rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));
}

function pauseFunc(){

    ballPaused = !ballPaused

}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    tegnRekkert();
    tegnBall();
    flyttBall();
    AI();
    tegnScore();
    flyttSpiller();

    requestAnimationFrame(draw);
}

draw();
