const canvas = document.getElementById('muraCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Eye position and movement
let eyeX = canvas.width / 2;
let eyeY = canvas.height / 2;
let velocity = 0.3;
let direction = Math.random() * Math.PI * 2;

// Eye state
let blinkTimer = 0;
let blinkDuration = 0;
let isBlinking = false;

// Cursor tracking
let cursorX = eyeX;
let cursorY = eyeY;

// Blink logic
function handleBlinking() {
  if (isBlinking) {
    blinkDuration--;
    if (blinkDuration <= 0) {
      isBlinking = false;
      blinkTimer = Math.random() * 400 + 200;
    }
  } else {
    blinkTimer--;
    if (blinkTimer <= 0) {
      isBlinking = true;
      blinkDuration = 10;
    }
  }
}

// Eye drawing
function drawMuraEye(x, y) {
  const irisRadius = 60;
  const pupilRadius = 20;
  const glowSize = 10;

  // Outer eye
  ctx.beginPath();
  ctx.arc(x, y, irisRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#111';
  ctx.fill();

  // Eye glow ring
  const gradient = ctx.createRadialGradient(x, y, irisRadius - 10, x, y, irisRadius + glowSize);
  gradient.addColorStop(0, 'rgba(255,0,0,0.3)');
  gradient.addColorStop(1, 'rgba(255,0,0,0)');
  ctx.beginPath();
  ctx.arc(x, y, irisRadius + glowSize, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Blinking lid
  if (isBlinking) {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y, irisRadius + 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  // Pupil tracking
  const dx = cursorX - x;
  const dy = cursorY - y;
  const dist = Math.min(15, Math.hypot(dx, dy));
  const angle = Math.atan2(dy, dx);
  const pupilX = x + Math.cos(angle) * dist;
  const pupilY = y + Math.sin(angle) * dist;

  // Pupil (diamond-like)
  ctx.save();
  ctx.translate(pupilX, pupilY);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(0, -pupilRadius);
  ctx.lineTo(pupilRadius, 0);
  ctx.lineTo(0, pupilRadius);
  ctx.lineTo(-pupilRadius, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Move Mura Eye slowly
function updateEyePosition() {
  eyeX += Math.cos(direction) * velocity;
  eyeY += Math
