// components/GameCanvas.js
import { useEffect, useRef } from 'react';

const VoidEyeImage = '/void-eye.png';

export default function GameCanvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;

    const img = new Image();
    img.src = VoidEyeImage;

    const enemy = {
      x: 0,
      y: 100,
      speed: 1,
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Void Eye
      ctx.drawImage(img, enemy.x, enemy.y, 64, 64);

      // Move enemy
      enemy.x += enemy.speed;
      if (enemy.x > canvas.width) enemy.x = -64;

      requestAnimationFrame(draw);
    };

    img.onload = () => {
      draw();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ border: '1px solid red' }} />;
}
