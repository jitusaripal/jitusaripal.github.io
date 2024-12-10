// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

const canvas = document.getElementById('visualizationCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 300; // Matches CSS height

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

  // Draw Gaussian curves
  ctx.beginPath();
  ctx.strokeStyle = '#ffcc00'; // Gaussian curve color
  ctx.lineWidth = 2;

  for (let x = 0; x < canvas.width; x++) {
    const value = gaussian(x / canvas.width, 0.5, 0.1);
    const y = canvas.height - value * 200; // Scale and invert
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Draw Bayesian curve
  ctx.beginPath();
  ctx.strokeStyle = '#00ccff'; // Bayesian curve color
  ctx.lineWidth = 2;

  for (let x = 0; x < canvas.width; x++) {
    const normalizedX = (x / canvas.width - 0.5) * 6; // Scale x to range -3 to 3
    const value = bayesian(normalizedX);
    const y = canvas.height - value * 200; // Scale and invert
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
}

// Animation loop
function animate() {
  renderFunctions();
  requestAnimationFrame(animate);
}

// Handle canvas resizing
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = 300;
  renderFunctions();
});

animate();
