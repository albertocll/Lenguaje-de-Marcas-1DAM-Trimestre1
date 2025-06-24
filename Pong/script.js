// Selecciona elementos del DOM
const gameBoard = document.getElementById("gameBoard");
const playerPaddle = document.getElementById("playerPaddle");
const player2Paddle = document.getElementById("computerPaddle");
const ball = document.getElementById("ball");

// Configuración inicial
let boardHeight = gameBoard.clientHeight;
let boardWidth = gameBoard.clientWidth;
let paddleHeight = playerPaddle.clientHeight;

// Posiciones iniciales
let playerPaddleY = (boardHeight - paddleHeight) / 2;
let player2PaddleY = (boardHeight - paddleHeight) / 2;
let ballX = boardWidth / 2;
let ballY = boardHeight / 2;

// Velocidades de la pelota
let ballSpeedX = 2;
let ballSpeedY = 2;
let playerPaddleSpeed = 12;
let player2PaddleSpeed = 12;

// Evento de movimiento para el jugador 1 (W y S)
window.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "W") {
        playerPaddleY -= playerPaddleSpeed;
    } else if (e.key === "s" || e.key === "S") {
        playerPaddleY += playerPaddleSpeed;
    }

    if (playerPaddleY < 0) playerPaddleY = 0;
    if (playerPaddleY > boardHeight - paddleHeight) playerPaddleY = boardHeight - paddleHeight;

    playerPaddle.style.top = `${playerPaddleY}px`;
});

// Evento de movimiento para el jugador 2 (flechas)
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        player2PaddleY -= player2PaddleSpeed;
    } else if (e.key === "ArrowDown") {
        player2PaddleY += player2PaddleSpeed;
    }

    if (player2PaddleY < 0) player2PaddleY = 0;
    if (player2PaddleY > boardHeight - paddleHeight) player2PaddleY = boardHeight - paddleHeight;

    player2Paddle.style.top = `${player2PaddleY}px`;
});

// Actualiza la posición de la pelota y las paletas
function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= boardHeight - ball.clientHeight) {
        ballSpeedY *= -1;
    }

    if (ballX <= playerPaddle.clientWidth &&
        ballY + ball.clientHeight > playerPaddleY &&
        ballY < playerPaddleY + paddleHeight) {
        ballSpeedX *= -1;
    }

    if (ballX >= boardWidth - player2Paddle.clientWidth - ball.clientWidth &&
        ballY + ball.clientHeight > player2PaddleY &&
        ballY < player2PaddleY + paddleHeight) {
        ballSpeedX *= -1;
    }

    if (ballX <= 0 || ballX >= boardWidth - ball.clientWidth) {
        ballX = boardWidth / 2;
        ballY = boardHeight / 2;
        ballSpeedX *= -1;
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(update);
}

update();
