<!DOCTYPE html><html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mura Eye: Void Watcher</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: black;
    }canvas {
  display: block;
}

  </style>
</head>
<body>
  <canvas id="gameCanvas"></canvas>  <script>
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Resize canvas on window change
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    // Mura Eye properties
    const eye = {
      x: width / 2,
      y: height / 2,
      radius: 60,
      pupilSize: 20,
      pupilOffset: 15,
      blinkTimer: 0,
      blinkDuration: 10,
      isBlinking: false,
      lookAngle: 0,
      lookTimer: 0,
      lookDirX: 0,
      lookDirY: 0,
      speed: 0.5
    };

    function drawMuraEye() {
      // Eye base
      ctx.beginPath();
      ctx.arc(eye.x, eye.y, eye.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#111";
      ctx.fill();

      // Glow ring
      const gradient = ctx.createRadialGradient(
        eye.x,
        eye.y,
        eye.radius * 0.9,
        eye.x,
        eye.y,
        eye.radius * 1.3
      );
      gradient.addColorStop(0, "rgba(255, 0, 0, 0.6)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(eye.x, eye.y, eye.radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Pupil position
      const pupilX = eye.x + eye.lookDirX * eye.pupilOffset;
      const pupilY = eye.y + eye.lookDirY * eye.pupilOffset;

      // Pupil diamond
      if (!eye.isBlinking) {
        ctx.save();
        ctx.translate(pupilX, pupilY);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.rect(-eye.pupilSize / 2, -eye.pupilSize / 2, eye.pupilSize, eye.pupilSize);
        ctx.fill();
        ctx.restore();
      }
    }

    function updateEye(deltaTime) {
      eye.blinkTimer += deltaTime;
      eye.lookTimer += deltaTime;

      // Blink logic
      if (eye.blinkTimer > 4000) {
        eye.isBlinking = true;
        if (eye.blinkTimer > 4100) {
          eye.isBlinking = false;
          eye.blinkTimer = 0;
        }
      }

      // Change direction
      if (eye.lookTimer > 3000) {
        eye.lookDirX = Math.random() * 2 - 1;
        eye.lookDirY = Math.random() * 2 - 1;
        const mag = Math.sqrt(eye.lookDirX ** 2 + eye.lookDirY ** 2);
        eye.lookDirX /= mag;
        eye.lookDirY /= mag;
        eye.lookTimer = 0;
      }
    }

    let lastTime = performance.now();

    function animate(time) {
      const deltaTime = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      updateEye(deltaTime);
      drawMuraEye();
      requestAnimationFrame(animate);
    }

    animate(lastTime);
  </script></body>
</html>
