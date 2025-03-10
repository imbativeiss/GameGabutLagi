const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 300;

let players = [
    { x: 100, y: 100, width: 10, height: 60, dy: 0 }, // Player 1
    { x: 500, y: 100, width: 10, height: 60, dy: 0 }  // Player 2
];

let ball = { x: 300, y: 150, radius: 10, dx: 3, dy: 2 };

function drawPlayers() {
    ctx.fillStyle = "blue";
    players.forEach(p => {
        ctx.fillRect(p.x, p.y, p.width, p.height);
    });
}

function drawBall() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
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

    if (ball.x <= 0 || ball.x >= canvas.width) {
        ball.x = 300;
        ball.y = 150;
        ball.dx *= -1;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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