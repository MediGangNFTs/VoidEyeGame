
import { useEffect, useRef } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.75;

    const enemy = {
      x: 0,
      y: 100,
      speed: 2,
      size: 64,
      blinkTimer: 0,
      blinkState: 'diamond',
    };

    const drawEye = (ctx, x, y, size, blinkState) => {
      const r = size / 2;
      const cx = x + r;
      const cy = y + r;

      const glow = ctx.createRadialGradient(cx, cy, r / 2, cx, cy, r);
      glow.addColorStop(0, 'rgba(255,0,0,0.5)');
      glow.addColorStop(1, 'rgba(255,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'red';
      ctx.beginPath();
      if (blinkState === 'diamond') {
        ctx.moveTo(cx, cy - r / 3);
        ctx.lineTo(cx + r / 3, cy);
        ctx.lineTo(cx, cy + r / 3);
        ctx.lineTo(cx - r / 3, cy);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(cx - r / 6, cy - 2, r / 3, 4);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      enemy.blinkTimer += 1;
      if (enemy.blinkTimer % 120 === 0) {
        enemy.blinkState = 'line';
      } else if (enemy.blinkTimer % 120 === 10) {
        enemy.blinkState = 'diamond';
      }

      enemy.x += enemy.speed;
      if (enemy.x > canvas.width) enemy.x = -enemy.size;

      drawEye(ctx, enemy.x, enemy.y, enemy.size, enemy.blinkState);

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} style={{ border: '2px solid white', backgroundColor: '#000' }} />;
}
