const canvas = document.getElementById('visualizationCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 300; // Matches CSS height

let time = 0; // Time variable for animation

// Generate Gaussian function values
function gaussian(x, mu, sigma) {
  const exponent = -Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2));
  return Math.exp(exponent);
}

// Generate Bayesian curves
function bayesian(x) {
  return 1 / (1 + Math.exp(-x));
}

// Render functions
function renderFunctions() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Moving Gaussian
  ctx.beginPath();
  ctx.strokeStyle = '#ffcc00'; // Gaussian curve color
  ctx.lineWidth = 2;

  const movingMu = 0.5 + Math.sin(time) * 0.2; // Move the Gaussian center over time
  for (let x = 0; x < canvas.width; x++) {
    const value = gaussian(x / canvas.width, movingMu, 0.1);
    const y = canvas.height - value * 200; // Scale and invert
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Moving Bayesian curve
  ctx.beginPath();
  ctx.strokeStyle = '#00ccff'; // Bayesian curve color
  ctx.lineWidth = 2;

  const waveOffset = Math.sin(time) * 3; // Add wave-like movement to the Bayesian input
  for (let x = 0; x < canvas.width; x++) {
    const normalizedX = (x / canvas.width - 0.5) * 6 + waveOffset; // Offset over time
    const value = bayesian(normalizedX);
    const y = canvas.height - value * 200; // Scale and invert
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
}

// Animation loop
function animate() {
  time += 0.02; // Increment time for animation
  renderFunctions();
  requestAnimationFrame(animate);
}

// Handle canvas resizing
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = 300;
  renderFunctions();
});

// Start animation
animate();
