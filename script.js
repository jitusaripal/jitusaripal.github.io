const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gaussians = [];

// Generate Gaussian parameters
for (let i = 0; i < 50; i++) { // 50 Gaussian bells
  gaussians.push({
    x: Math.random() * canvas.width, // Center x-position
    y: Math.random() * canvas.height, // Center y-position
    amplitude: Math.random() * 50 + 50, // Amplitude (height)
    sigma: Math.random() * 30 + 20, // Spread (width)
    speed: Math.random() * 1 + 0.5, // Speed of motion
  });
}

// Gaussian function for rendering
function gaussian(x, mu, sigma, amplitude) {
  const exponent = -Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2));
  return amplitude * Math.exp(exponent);
}

// Draw a single Gaussian bell
function drawGaussian(gaussian) {
  const { x, y, amplitude, sigma } = gaussian;

  // Draw the bell curve using vertical slices
  for (let i = x - 2 * sigma; i <= x + 2 * sigma; i += 1) {
    const height = gaussian(i, x, sigma, amplitude); // Gaussian value
    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * height / amplitude})`; // Opacity varies
    ctx.fillRect(i, y - height, 2, height); // Draw each slice
  }
}

function animate() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear and fill background

  gaussians.forEach(gaussian => {
    drawGaussian(gaussian); // Draw Gaussian
    gaussian.y += gaussian.speed; // Move the bell downward
    if (gaussian.y > canvas.height) gaussian.y = 0; // Reset position when out of view
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
