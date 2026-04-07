const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 768;

const numStars = 150;
const stars = [];

// create stars with color, drift, and twinkle
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    baseRadius: Math.random() * 2 + 1,
    radius: 0,
    color: `hsl(${Math.random() * 360}, 80%, 80%)`,
    dx: (Math.random() - 0.5) * 0.1, // horizontal drift
    dy: (Math.random() - 0.5) * 0.1, // vertical drift
    angle: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.1 + 0.02
  });
};

function drawStar(star) {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  ctx.fillStyle = star.color;
  ctx.fill();
}

function animate() {
  // fill background black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    // twinkle
    star.radius = star.baseRadius + Math.sin(star.angle) * 1.5;
    star.angle += star.twinkleSpeed;

    // drift
    star.x += star.dx;
    star.y += star.dy;

    // wrap around edges
    if (star.x > canvas.width) star.x = 0;
    if (star.x < 0) star.x = canvas.width;
    if (star.y > canvas.height) star.y = 0;
    if (star.y < 0) star.y = canvas.height;

    drawStar(star);
  }

  requestAnimationFrame(animate);
}

// start animation
animate();