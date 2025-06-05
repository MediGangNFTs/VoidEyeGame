
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let score = 0;
let timeLeft = 45;
let gameActive = false;
let scanRadius = 50;
let scanMaxRadius = 120;
let scanSpeed = 0.8;
let scanGrowing = true;

const eye = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20
};

document.getElementById("start-button").onclick = () => {
  document.getElementById("start-button").classList.add("hidden");
  document.getElementById("game-area").classList.remove("hidden");
  score = 0;
  timeLeft = 45;
  gameActive = true;
  setInterval(() => {
    if (timeLeft > 0 && gameActive) {
      timeLeft--;
      document.getElementById("timer").textContent = "Time: " + timeLeft;
    } else {
      gameActive = false;
    }
  }, 1000);
  gameLoop();
};

function drawMuraEye() {
  // Eye body
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(eye.x, eye.y, eye.radius, 0, Math.PI * 2);
  ctx.fill();

  // Diamond pupil
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(eye.x, eye.y - 6);
  ctx.lineTo(eye.x + 6, eye.y);
  ctx.lineTo(eye.x, eye.y + 6);
  ctx.lineTo(eye.x - 6, eye.y);
  ctx.closePath();
  ctx.fill();

  // Scan ring
  ctx.strokeStyle = "rgba(0, 255, 0, 0.3)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(eye.x, eye.y, scanRadius, 0, Math.PI * 2);
  ctx.stroke();

  if (scanGrowing) {
    scanRadius += scanSpeed;
    if (scanRadius >= scanMaxRadius) scanGrowing = false;
  } else {
    scanRadius -= scanSpeed;
    if (scanRadius <= 50) scanGrowing = true;
  }
}

function gameLoop() {
  if (!gameActive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMuraEye();

  document.getElementById("score").textContent = "Score: " + score;

  requestAnimationFrame(gameLoop);
}
