
import { useEffect, useRef } from 'react';

export default function GameCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.75;

    const enemyImg = new Image();
    enemyImg.src = '/void-eye.png';

    const enemy = {
      x: 0,
      y: 100,
      speed: 2,
      size: 64,
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.size, enemy.size);
      enemy.x += enemy.speed;
      if (enemy.x > canvas.width) enemy.x = -enemy.size;
      requestAnimationFrame(draw);
    };

    enemyImg.onload = () => draw();
  }, []);

  return <canvas ref={canvasRef} style={{ border: '2px solid white', backgroundColor: '#000' }} />;
}
