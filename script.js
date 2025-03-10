const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 300;

let score = { red: 0, blue: 0 };

let players = [
    { x: 100, y: 100, width: 10, height: 60, dy: 0, color: "red" },  // Tim Merah
    { x: 500, y: 100, width: 10, height: 60, dy: 0, color: "blue" }  // Tim Biru
];

let ball = { x: 300, y: 150, radius: 10, dx: 3, dy: 2 };

function drawPlayers() {
    players.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.width, p.height);
    });
}

function drawBall() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawText() {
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("Dev:@imbativeiss", canvas.width / 2 - 50, 20);
}

function updateScore() {
    document.getElementById("score1").innerText = score.red;
    document.getElementById("score2").innerText = score.blue;
}

function updateGame() {
    players.forEach(p => {
        p.y += p.dy;
        if (p.y < 0) p.y = 0;
        if (p.y + p.height > canvas.height) p.y = canvas.height - p.height;
    });

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y <= 0 || ball.y >= canvas.height) ball.dy *= -1;

    players.forEach(p => {
        if (
            ball.x - ball.radius < p.x + p.width &&
            ball.x + ball.radius > p.x &&
            ball.y > p.y && ball.y < p.y + p.height
        ) {
            ball.dx *= -1;
        }
    });

    if (ball.x <= 0) {
        score.blue++;  
        resetBall();
    } else if (ball.x >= canvas.width) {
        score.red++;  
        resetBall();
    }

    updateScore();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = Math.random() > 0.5 ? 3 : -3;
    ball.dy = Math.random() > 0.5 ? 2 : -2;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawText();
    drawPlayers();
    drawBall();
    updateGame();
    requestAnimationFrame(gameLoop);
}

document.getElementById("up1").addEventListener("touchstart", () => players[0].dy = -5);
document.getElementById("down1").addEventListener("touchstart", () => players[0].dy = 5);
document.getElementById("up2").addEventListener("touchstart", () => players[1].dy = -5);
document.getElementById("down2").addEventListener("touchstart", () => players[1].dy = 5);

document.getElementById("up1").addEventListener("touchend", () => players[0].dy = 0);
document.getElementById("down1").addEventListener("touchend", () => players[0].dy = 0);
document.getElementById("up2").addEventListener("touchend", () => players[1].dy = 0);
document.getElementById("down2").addEventListener("touchend", () => players[1].dy = 0);

gameLoop();
