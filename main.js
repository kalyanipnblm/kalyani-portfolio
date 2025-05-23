const waterHighlights = document.querySelector('.water-highlights');
const particleContainer = document.querySelector('.particle-container');
const waterBackground = document.querySelector('.water-background');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function updateHighlightPosition() {
    const targetX = (mouseX / window.innerWidth) * 100;
    const targetY = (mouseY / window.innerHeight) * 100;

    const currentX = parseFloat(waterHighlights.style.getPropertyValue('--highlight-x') || 50);
    const currentY = parseFloat(waterHighlights.style.getPropertyValue('--highlight-y') || 50);

    const lerpFactor = 0.05;
    const newX = currentX + (targetX - currentX) * lerpFactor;
    const newY = currentY + (targetY - currentY) * lerpFactor;

    waterHighlights.style.setProperty('--highlight-x', `${newX}%`);
    waterHighlights.style.setProperty('--highlight-y', `${newY}%`);

    waterHighlights.style.setProperty('--highlight-opacity', '0.8'); 
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const endX = (Math.random() - 0.5) * 100;
    const endY = (Math.random() - 0.5) * 100;
    particle.style.setProperty('--particle-end-x', `${endX}px`);
    particle.style.setProperty('--particle-end-y', `${endY}px`);

    particleContainer.appendChild(particle);

    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

let lastParticleTime = 0;
const particleInterval = 100;

window.addEventListener('mousemove', (event) => {
  const currentTime = Date.now();
  if (currentTime - lastParticleTime > particleInterval) {
    createParticle(
      event.clientX + (Math.random() - 0.5) * 10,
      event.clientY + (Math.random() - 0.5) * 10
    );
    lastParticleTime = currentTime;
  }
});

function animate() {
    updateHighlightPosition();
    requestAnimationFrame(animate);
}

animate();

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.section-spy a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.section-spy a[href="#${id}"]`);
      
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50% 0px',
    threshold: 0.1
  });

  sections.forEach(section => observer.observe(section));

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
});