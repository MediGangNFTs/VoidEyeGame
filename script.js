
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playing = false;
let score = 0;
let time = 45;

const eye = { x: canvas.width / 2, y: canvas.height / 2, radius: 20, color: 'red' };

document.getElementById('playButton').addEventListener('click', () => {
  playing = true;
  document.getElementById('playButton').style.display = 'none';
  startGame();
});

function drawEye() {
  ctx.beginPath();
  ctx.arc(eye.x, eye.y, eye.radius, 0, Math.PI * 2);
  ctx.fillStyle = eye.color;
  ctx.fill();
}

function update() {
  if (!playing) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Eye
  drawEye();
}

function startGame() {
  const timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval);
      playing = false;
      alert("Time's up! Score: " + score);
    } else {
      time--;
      document.getElementById('timer').innerText = "Time: " + time;
    }
  }, 1000);

  function gameLoop() {
    if (!playing) return;
    update();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
